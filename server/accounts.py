"""Accounts: one login for admins and managers, signed session cookie, and the Users & Roles API.

Roles
  Super Admin  admin_users.role — admin dashboard + manages users, roles and the registration passkey
  Admin        admin_users.role — admin dashboard
  Manager      managers row     — manager portal

The server checks passwords (scrypt hashes, see passwords.py); the browser never receives them.
"""
from __future__ import annotations

import base64
import hashlib
import hmac
import json
import re
import secrets
import time
from collections import defaultdict, deque

import httpx

from passwords import hash_password, verify_password

COOKIE = "ops_session"
SESSION_TTL = 12 * 3600
ADMIN_ROLES = ("Super Admin", "Admin")
ROLES = ADMIN_ROLES + ("Manager",)
DEPARTMENTS = ("7CORE", "HOS", "CARGOGPT")
USERNAME = re.compile(r"^[a-z0-9._-]{3,32}$")
PUBLIC_ADMIN = "id,username,display_name,role,created_at"
PUBLIC_MANAGER = "id,username,full_name,department,team_name,assigned_employee_ids,shift_start_time,shift_end_time,shift_days,created_at"


class AccountError(Exception):
    def __init__(self, message: str, status: int = 400):
        super().__init__(message)
        self.status = status


class Accounts:
    def __init__(self, postgrest: str, secret: str):
        self.rest = postgrest
        self.secret = secret.encode()
        self.client: httpx.AsyncClient | None = None
        self.failures: dict[str, deque] = defaultdict(deque)

    # ---------------------------------------------------------------- tokens

    def _sign(self, body: str) -> str:
        return hmac.new(self.secret, body.encode(), hashlib.sha256).hexdigest()

    def make_token(self, kind: str, user_id: str) -> str:
        body = base64.urlsafe_b64encode(json.dumps({"k": kind, "id": user_id, "exp": int(time.time()) + SESSION_TTL,
                                                    "n": secrets.token_hex(4)}).encode()).decode().rstrip("=")
        return f"{body}.{self._sign(body)}"

    def read_token(self, token: str | None) -> tuple[str, str] | None:
        if not token or "." not in token:
            return None
        body, sig = token.rsplit(".", 1)
        if not hmac.compare_digest(self._sign(body), sig):
            return None
        try:
            data = json.loads(base64.urlsafe_b64decode(body + "=" * (-len(body) % 4)))
        except ValueError:
            return None
        if data.get("exp", 0) < time.time() or data.get("k") not in ("admin", "manager"):
            return None
        return data["k"], str(data["id"])

    # ---------------------------------------------------------------- data access (direct to PostgREST)

    async def _get(self, table: str, params: dict) -> list[dict]:
        resp = await self.client.get(f"{self.rest}/{table}", params=params)
        resp.raise_for_status()
        return resp.json()

    async def _write(self, method: str, table: str, params: dict | None, body: dict | None) -> list[dict]:
        resp = await self.client.request(method, f"{self.rest}/{table}", params=params or {}, json=body,
                                         headers={"Prefer": "return=representation"})
        if resp.status_code >= 400:
            raise AccountError(resp.json().get("message", "database error"), 500)
        return resp.json() if resp.content else []

    async def _by_username(self, username: str) -> tuple[str, dict] | None:
        rows = await self._get("admin_users", {"username": f"eq.{username}", "select": "*"})
        if rows:
            return "admin", rows[0]
        rows = await self._get("managers", {"username": f"eq.{username}", "select": "*"})
        if rows:
            return "manager", rows[0]
        return None

    async def _by_id(self, kind: str, user_id: str) -> dict | None:
        table = "admin_users" if kind == "admin" else "managers"
        rows = await self._get(table, {"id": f"eq.{user_id}", "select": "*"})
        return rows[0] if rows else None

    # ---------------------------------------------------------------- login / session

    def throttled(self, key: str, limit: int = 8) -> bool:
        window = self.failures[key]
        while window and time.time() - window[0] > 600:
            window.popleft()
        return len(window) >= limit

    async def login(self, ip: str, username: str, password: str) -> tuple[str, dict]:
        # per address, and per username too: behind a cloud proxy the address can be spoofed
        user_key = "user:" + username.strip().lower()[:64]
        if self.throttled(ip) or self.throttled(user_key, 20):
            raise AccountError("Too many attempts. Try again in 10 minutes.", 429)
        found = await self._by_username(username.strip().lower())
        if not found or not verify_password(password, found[1].get("password")):
            self.failures[ip].append(time.time())
            self.failures[user_key].append(time.time())
            raise AccountError("Invalid username or password.", 401)
        self.failures[ip].clear()
        self.failures[user_key].clear()
        kind, row = found
        if kind == "admin" and row.get("role") not in ADMIN_ROLES:
            raise AccountError("This account has no role assigned.", 403)
        return kind, row

    async def current(self, token: str | None) -> dict | None:
        """The signed-in user, re-read from the database (a deleted or demoted user is signed out)."""
        parsed = self.read_token(token)
        if not parsed:
            return None
        kind, user_id = parsed
        row = await self._by_id(kind, user_id)
        if not row:
            return None
        if kind == "admin" and row.get("role") not in ADMIN_ROLES:
            return None
        return self.public(kind, row)

    @staticmethod
    def public(kind: str, row: dict) -> dict:
        if kind == "admin":
            return {"kind": "admin", "id": row["id"], "username": row["username"],
                    "display_name": row.get("display_name") or row["username"], "role": row.get("role"),
                    "created_at": row.get("created_at")}
        ids = row.get("assigned_employee_ids") or []
        return {"kind": "manager", "id": row["id"], "username": row["username"], "role": "Manager",
                "display_name": row.get("full_name") or row["username"], "full_name": row.get("full_name") or row["username"],
                "department": row.get("department") or "7CORE", "team_name": row.get("team_name") or "",
                "assigned_employee_ids": [int(x) for x in ids if str(x).lstrip("-").isdigit()],
                "shift_start_time": row.get("shift_start_time") or "09:00", "shift_end_time": row.get("shift_end_time") or "18:00",
                "shift_days": row.get("shift_days") or ["monday", "tuesday", "wednesday", "thursday", "friday"],
                "created_at": row.get("created_at")}

    # ---------------------------------------------------------------- Users & Roles (Super Admin)

    async def list_users(self) -> list[dict]:
        admins = await self._get("admin_users", {"select": PUBLIC_ADMIN, "order": "username.asc"})
        managers = await self._get("managers", {"select": PUBLIC_MANAGER, "order": "username.asc"})
        users = [self.public("admin", a) for a in admins] + [self.public("manager", m) for m in managers]
        order = {"Super Admin": 0, "Admin": 1, "Manager": 2}
        return sorted(users, key=lambda u: (order.get(u["role"], 3), u["username"]))

    @staticmethod
    def _validate(data: dict, creating: bool) -> dict:
        clean: dict = {}
        if creating or "username" in data:
            username = str(data.get("username", "")).strip().lower()
            if not USERNAME.match(username):
                raise AccountError("Username: 3–32 characters, lowercase letters, digits, dot, dash or underscore.")
            clean["username"] = username
        if creating or data.get("password"):
            password = str(data.get("password") or "")
            if len(password) < 8:
                raise AccountError("Password must be at least 8 characters.")
            clean["password"] = password
        if creating or "display_name" in data:
            name = " ".join(str(data.get("display_name", "")).split())
            if not 1 <= len(name) <= 60:
                raise AccountError("Full name is required (up to 60 characters).")
            clean["display_name"] = name
        if creating or "role" in data:
            if data.get("role") not in ROLES:
                raise AccountError("Choose a role: Super Admin, Admin or Manager.")
            clean["role"] = data["role"]
        if "department" in data:
            if data["department"] not in DEPARTMENTS:
                raise AccountError("Department must be 7CORE, HOS or CARGOGPT.")
            clean["department"] = data["department"]
        if "team_name" in data:
            clean["team_name"] = " ".join(str(data["team_name"]).split())[:60]
        return clean

    async def _ensure_free(self, username: str, kind: str | None = None, user_id: str | None = None) -> None:
        found = await self._by_username(username)
        if found and not (found[0] == kind and str(found[1]["id"]) == str(user_id)):
            raise AccountError("This username is already taken.", 409)

    async def _super_admins(self) -> list[dict]:
        return await self._get("admin_users", {"role": "eq.Super Admin", "select": "id"})

    async def _insert(self, kind: str, data: dict, password_hash: str, keep_id: str | None = None) -> dict:
        if kind == "admin":
            row = {"username": data["username"], "password": password_hash, "display_name": data["display_name"],
                   "role": data["role"]}
            if keep_id:
                row["id"] = keep_id
            return (await self._write("POST", "admin_users", None, row))[0]
        dept = data.get("department") or "7CORE"
        row = {"username": data["username"], "password": password_hash, "full_name": data["display_name"],
               "department": dept, "team_name": data.get("team_name") or f"{dept} Team", "assigned_employee_ids": []}
        if keep_id:
            row["id"] = keep_id
        return (await self._write("POST", "managers", None, row))[0]

    async def create(self, data: dict) -> dict:
        clean = self._validate(data, creating=True)
        await self._ensure_free(clean["username"])
        kind = "manager" if clean["role"] == "Manager" else "admin"
        row = await self._insert(kind, clean, hash_password(clean["password"]))
        return self.public(kind, row)

    async def update(self, me: dict, kind: str, user_id: str, data: dict) -> dict:
        row = await self._by_id(kind, user_id)
        if not row:
            raise AccountError("User not found.", 404)
        clean = self._validate(data, creating=False)
        current_role = row.get("role") if kind == "admin" else "Manager"
        new_role = clean.get("role", current_role)
        is_me = me["kind"] == kind and str(me["id"]) == str(user_id)
        if is_me and new_role != current_role:
            raise AccountError("You cannot change your own role.", 409)
        if current_role == "Super Admin" and new_role != "Super Admin" and len(await self._super_admins()) <= 1:
            raise AccountError("There must be at least one Super Admin.", 409)
        if "username" in clean:
            await self._ensure_free(clean["username"], kind, user_id)
        password_hash = hash_password(clean["password"]) if "password" in clean else row.get("password")
        new_kind = "manager" if new_role == "Manager" else "admin"

        if new_kind != kind:      # Admin <-> Manager: the account moves to the other table
            merged = {"username": clean.get("username", row["username"]),
                      "display_name": clean.get("display_name", row.get("display_name") or row.get("full_name") or row["username"]),
                      "role": new_role, "department": clean.get("department", row.get("department") or "7CORE"),
                      "team_name": clean.get("team_name", row.get("team_name") or "")}
            table = "admin_users" if kind == "admin" else "managers"
            await self._write("DELETE", table, {"id": f"eq.{user_id}"}, None)
            new_row = await self._insert(new_kind, merged, password_hash)
            return self.public(new_kind, new_row)

        patch: dict = {}
        if "username" in clean:
            patch["username"] = clean["username"]
        if "password" in clean:
            patch["password"] = password_hash
        if kind == "admin":
            if "display_name" in clean:
                patch["display_name"] = clean["display_name"]
            if "role" in clean:
                patch["role"] = clean["role"]
            table = "admin_users"
        else:
            if "display_name" in clean:
                patch["full_name"] = clean["display_name"]
            for key in ("department", "team_name"):
                if key in clean:
                    patch[key] = clean[key]
            table = "managers"
        updated = (await self._write("PATCH", table, {"id": f"eq.{user_id}"}, patch))[0] if patch else row
        return self.public(kind, updated)

    async def delete(self, me: dict, kind: str, user_id: str) -> None:
        row = await self._by_id(kind, user_id)
        if not row:
            raise AccountError("User not found.", 404)
        if me["kind"] == kind and str(me["id"]) == str(user_id):
            raise AccountError("You cannot delete your own account.", 409)
        if kind == "admin" and row.get("role") == "Super Admin" and len(await self._super_admins()) <= 1:
            raise AccountError("There must be at least one Super Admin.", 409)
        await self._write("DELETE", "admin_users" if kind == "admin" else "managers", {"id": f"eq.{user_id}"}, None)

    async def passkey(self) -> str:
        rows = await self._get("organization_security", {"key_name": "eq.terminal_access_code", "select": "passkey"})
        return (rows[0].get("passkey") or "") if rows else ""

    async def set_passkey(self, value: str, who: str) -> str:
        code = str(value or "").strip().upper()
        if not re.fullmatch(r"[A-Z0-9-]{4,24}", code):
            raise AccountError("Passkey: 4–24 characters, letters, digits or dash.")
        resp = await self.client.post(f"{self.rest}/organization_security", params={"on_conflict": "key_name"},
                                      json={"key_name": "terminal_access_code", "passkey": code, "updated_by": who},
                                      headers={"Prefer": "resolution=merge-duplicates,return=minimal"})
        if resp.status_code >= 400:
            raise AccountError("Could not save the passkey.", 500)
        return code
