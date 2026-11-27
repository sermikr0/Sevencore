"""Database access for the admin/manager panel (server side only, through PostgREST on 127.0.0.1).

The browser never talks to the database: every read and write goes through server/panel/api.py,
which checks the signed-in user's role and department first.
"""
from __future__ import annotations

import base64
import binascii
from datetime import date, datetime, timezone

import httpx

EMP_COLS = ("telegram_id,first_name,last_name,username,department,is_verified,shift_name,shift_group,shift_start_time,"
            "shift_end_time,shift_days,created_at,updated_at")
LOG_COLS = "id,telegram_id,action_type,timestamp,note,admin_note,distance_meters,latitude,longitude"
FACE_COLS = "telegram_id,enrolled_at,checks,last_score,last_used_at"
MANAGER_COLS = "id,username,full_name,department,team_name,assigned_employee_ids"


class DataError(Exception):
    pass


def utc(dt: datetime) -> str:
    return dt.astimezone(timezone.utc).isoformat().replace("+00:00", "Z")


def decode_data_url(value: str | None) -> tuple[bytes, str] | None:
    """data:image/jpeg;base64,... -> (bytes, media type)."""
    if not value or not value.startswith("data:image/") or ";base64," not in value:
        return None
    head, b64 = value.split(";base64,", 1)
    try:
        return base64.b64decode(b64, validate=False), head[5:]
    except (binascii.Error, ValueError):
        return None


class Data:
    def __init__(self, base: str):
        self.base = base.rstrip("/")
        self.client: httpx.AsyncClient | None = None

    async def get(self, table: str, params) -> list[dict]:
        r = await self.client.get(f"{self.base}/{table}", params=params)
        if r.status_code >= 400:
            raise DataError(f"{table}: {r.status_code}")
        return r.json()

    async def write(self, method: str, table: str, params=None, body=None, prefer: str = "return=representation") -> list[dict]:
        r = await self.client.request(method, f"{self.base}/{table}", params=params or {}, json=body,
                                      headers={"Prefer": prefer})
        if r.status_code >= 400:
            raise DataError(f"{table}: {r.status_code} {r.text[:200]}")
        return r.json() if r.content and "representation" in prefer else []

    # ---------------------------------------------------------------- employees

    async def employees(self) -> list[dict]:
        return await self.get("employees", {"select": EMP_COLS, "order": "first_name.asc"})

    async def employee(self, tg: int) -> dict | None:
        rows = await self.get("employees", {"telegram_id": f"eq.{tg}", "select": EMP_COLS})
        return rows[0] if rows else None

    async def employee_photo(self, tg: int) -> str | None:
        rows = await self.get("employees", {"telegram_id": f"eq.{tg}", "select": "photo_url"})
        return rows[0].get("photo_url") if rows else None

    async def update_employee(self, tg: int, patch: dict) -> dict | None:
        rows = await self.write("PATCH", "employees", {"telegram_id": f"eq.{tg}", "select": EMP_COLS}, patch)
        return rows[0] if rows else None

    async def delete_employee(self, tg: int) -> None:
        await self.write("DELETE", "face_profiles", {"telegram_id": f"eq.{tg}"}, prefer="return=minimal")
        await self.write("DELETE", "employees", {"telegram_id": f"eq.{tg}"}, prefer="return=minimal")

    async def faces(self) -> dict[int, dict]:
        return {f["telegram_id"]: f for f in await self.get("face_profiles", {"select": FACE_COLS})}

    async def delete_face(self, tg: int) -> None:
        await self.write("DELETE", "face_profiles", {"telegram_id": f"eq.{tg}"}, prefer="return=minimal")

    # ---------------------------------------------------------------- marks

    async def logs(self, since: datetime, until: datetime, tgs: list[int] | None = None) -> list[dict]:
        params = [("timestamp", f"gte.{utc(since)}"), ("timestamp", f"lt.{utc(until)}"),
                  ("order", "timestamp.asc"), ("select", LOG_COLS)]
        if tgs is not None:
            if not tgs:
                return []
            params.append(("telegram_id", f"in.({','.join(str(t) for t in tgs)})"))
        return await self.get("attendance_logs", params)

    async def log(self, log_id: str) -> dict | None:
        rows = await self.get("attendance_logs", {"id": f"eq.{log_id}", "select": LOG_COLS})
        return rows[0] if rows else None

    async def log_photo(self, log_id: str) -> str | None:
        rows = await self.get("attendance_logs", {"id": f"eq.{log_id}", "select": "photo_url"})
        return rows[0].get("photo_url") if rows else None

    async def add_log(self, row: dict) -> dict:
        return (await self.write("POST", "attendance_logs", {"select": LOG_COLS}, row))[0]

    async def update_log(self, log_id: str, patch: dict) -> dict | None:
        rows = await self.write("PATCH", "attendance_logs", {"id": f"eq.{log_id}", "select": LOG_COLS}, patch)
        return rows[0] if rows else None

    async def delete_log(self, log_id: str) -> None:
        await self.write("DELETE", "attendance_logs", {"id": f"eq.{log_id}"}, prefer="return=minimal")

    # ---------------------------------------------------------------- weekly schedule

    async def schedule_rows(self, weeks: list[date], tgs: list[int] | None = None) -> list[dict]:
        params = [("week_start_date", f"in.({','.join(w.isoformat() for w in weeks)})"), ("order", "updated_at.desc"),
                  ("select", "*")]
        if tgs is not None:
            if not tgs:
                return []
            params.append(("telegram_id", f"in.({','.join(str(t) for t in tgs)})"))
        return await self.get("team_schedules", params)

    async def schedule_rows_from(self, tg: int, week: date) -> list[dict]:
        return await self.get("team_schedules", {"telegram_id": f"eq.{tg}", "week_start_date": f"gte.{week.isoformat()}",
                                                 "order": "updated_at.desc", "select": "*"})

    async def save_schedule_row(self, row: dict) -> None:
        await self.write("POST", "team_schedules", {"on_conflict": "id"}, row,
                         prefer="resolution=merge-duplicates,return=minimal")

    # ---------------------------------------------------------------- settings

    async def setting(self, key: str) -> str | None:
        rows = await self.get("system_settings", {"key": f"eq.{key}", "select": "value"})
        return rows[0].get("value") if rows else None

    async def set_setting(self, key: str, value: str) -> None:
        await self.write("POST", "system_settings", {"on_conflict": "key"},
                         {"key": key, "value": value, "updated_at": utc(datetime.now(timezone.utc))},
                         prefer="resolution=merge-duplicates,return=minimal")

    # ---------------------------------------------------------------- managers

    async def managers(self) -> list[dict]:
        return await self.get("managers", {"select": MANAGER_COLS, "order": "full_name.asc"})

    async def set_assigned(self, manager_id: str, ids: list[int]) -> None:
        await self.write("PATCH", "managers", {"id": f"eq.{manager_id}"}, {"assigned_employee_ids": ids},
                         prefer="return=minimal")

    async def ping(self) -> bool:
        try:
            return (await self.client.get(f"{self.base}/system_settings", params={"limit": "1"})).status_code == 200
        except httpx.HTTPError:
            return False
