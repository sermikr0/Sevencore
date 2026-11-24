"""Checks for the cloud build (PUBLIC=1, one port): data is closed without login, Mini App under /tma/.

Run against the container (see README, "Render"):
    python3 tests/test_public.py --base http://127.0.0.1:18790
Admin credentials come from .env (ADMIN_USERNAME / ADMIN_PASSWORD), same as the container was started with.
"""
from __future__ import annotations

import argparse
import asyncio
import sys
from pathlib import Path

import httpx
from websockets.asyncio.client import connect as ws_connect
from websockets.exceptions import ConnectionClosed, InvalidStatus

ROOT = Path(__file__).resolve().parent.parent
failures = 0


def check(name: str, ok: bool, detail="") -> None:
    global failures
    print(f"  {'PASS' if ok else 'FAIL'}  {name}" + ("" if ok else f"   -> {str(detail)[:200]}"))
    failures += 0 if ok else 1


def env() -> dict:
    out = {}
    for line in (ROOT / ".env").read_text().splitlines():
        if "=" in line and not line.strip().startswith("#"):
            k, v = line.split("=", 1)
            out[k.strip()] = v.strip()
    return out


async def ws_check(base: str, cookie: str | None) -> bool:
    """True when the realtime socket accepts a join."""
    url = base.replace("http://", "ws://") + "/realtime/v1/websocket?vsn=2.0.0"
    headers = {"Cookie": f"ops_session={cookie}"} if cookie else {}
    try:
        async with ws_connect(url, additional_headers=headers, open_timeout=5) as ws:
            await ws.send('["1","1","realtime:t","phx_join",{"config":{"postgres_changes":[]}}]')
            reply = await asyncio.wait_for(ws.recv(), 5)
            return "phx_reply" in reply
    except (InvalidStatus, ConnectionClosed, OSError, asyncio.TimeoutError):   # refused handshake / closed socket
        return False


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--base", default="http://127.0.0.1:18790")
    args = ap.parse_args()
    cfg = env()
    anon = httpx.Client(base_url=args.base, timeout=10, follow_redirects=False)

    print("public mode")
    r = anon.get("/healthz")
    check("healthz: database up", r.status_code == 200 and r.json().get("db") == "up", r.text)
    check("healthz: Mini App path is /tma/", r.json().get("miniapp") == "/tma/", r.text)
    check("HSTS header", "max-age" in r.headers.get("strict-transport-security", ""), dict(r.headers))
    for table in ("employees", "attendance_logs", "organization_security", "team_schedules"):
        r = anon.get(f"/rest/v1/{table}?select=*")
        check(f"/rest/v1/{table} without login -> 401", r.status_code == 401, r.status_code)
    r = anon.post("/rest/v1/employees", json={"telegram_id": 1, "first_name": "x"})
    check("REST write without login -> 401", r.status_code == 401, r.status_code)
    check("realtime without login refused", not asyncio.run(ws_check(args.base, None)))
    r = anon.get("/rest/v1/employees", cookies={"ops_session": "forged.abc"})
    check("forged session cookie -> 401", r.status_code == 401, r.status_code)
    r = anon.get("/mobile")
    check("/mobile portal off -> login", r.status_code == 303 and r.headers.get("location") == "/", r.status_code)
    r = anon.get("/admin")
    check("/admin without login -> login", r.status_code == 303, r.status_code)

    r = anon.get("/tma")
    check("/tma redirects to /tma/", r.status_code in (301, 307, 308) and r.headers.get("location", "").endswith("/tma/"),
          (r.status_code, r.headers.get("location")))
    r = anon.get("/tma/")
    check("Mini App page", r.status_code == 200 and 'src="app.js"' in r.text, r.status_code)
    check("Mini App may be framed only by Telegram", "frame-ancestors https://web.telegram.org" in r.headers.get(
        "content-security-policy", ""))
    for name in ("app.js", "app.css", "i18n.js", "favicon.png"):
        r = anon.get(f"/tma/{name}")
        check(f"/tma/{name}", r.status_code == 200, r.status_code)
    r = anon.post("/tma/api/me", json={})
    check("Mini App API without Telegram signature -> 401", r.status_code == 401, r.text)

    print("signed in")
    s = httpx.Client(base_url=args.base, timeout=10, follow_redirects=False)
    r = s.post("/auth/login", json={"username": cfg["ADMIN_USERNAME"], "password": cfg["ADMIN_PASSWORD"]},
               headers={"X-Requested-With": "sevencore"})
    check("admin login", r.status_code == 200, r.text)
    set_cookie = r.headers.get("set-cookie", "")
    check("session cookie is Secure + HttpOnly", "Secure" in set_cookie and "HttpOnly" in set_cookie, set_cookie)
    token = r.cookies.get("ops_session")
    r = s.get("/rest/v1/employees?select=telegram_id", cookies={"ops_session": token})
    check("REST with session -> 200", r.status_code == 200, r.status_code)
    r = s.get("/rest/v1/face_profiles?select=*", cookies={"ops_session": token})
    check("face templates still hidden when signed in", r.status_code == 404, r.status_code)
    r = s.get("/rest/v1/admin_users?select=*", cookies={"ops_session": token})
    check("admin_users without password field", r.status_code == 200 and all("password" not in row for row in r.json()),
          r.text)
    check("realtime with session works", asyncio.run(ws_check(args.base, token)))
    r = s.get("/admin", cookies={"ops_session": token})
    check("/admin with session", r.status_code == 200, r.status_code)
    users = s.get("/auth/users", cookies={"ops_session": token}).json()
    check("employee passkey created on first start", bool(users.get("passkey")), users.get("passkey"))
    r = s.post("/auth/logout", cookies={"ops_session": token}, headers={"X-Requested-With": "sevencore"})
    r = anon.get("/rest/v1/employees?select=telegram_id", cookies={"ops_session": "x" + token})
    check("tampered token -> 401", r.status_code == 401, r.status_code)

    print("login throttling")
    codes = []
    for i in range(22):
        r = anon.post("/auth/login", json={"username": "throttle-probe", "password": "wrong-password"},
                      headers={"X-Requested-With": "sevencore", "X-Forwarded-For": f"10.9.{i}.1"})
        codes.append(r.status_code)
    check("per-username lock even with rotating X-Forwarded-For", codes[-1] == 429, codes)

    print(f"\n{'ALL PASSED' if not failures else f'{failures} FAILED'}")
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
