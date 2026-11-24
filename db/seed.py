#!/usr/bin/env python3
"""Seed the local OpSector database with clearly fictional test data (runs only on an empty DB).

    python3 db/seed.py            # --force wipes all tables first

One Super Admin account (ADMIN_USERNAME / ADMIN_PASSWORD from .env, stored as a scrypt hash), the
employee registration passkey, three test employees, this week's schedule and two weeks of
check-ins/outs. Managers and further admins are created in the admin panel (Users & Roles).
No real names, no real photos: the "selfies" are generated initials tiles.
"""
from __future__ import annotations

import base64
import io
import json
import random
import sys
from datetime import date, datetime, time, timedelta
from pathlib import Path
from zoneinfo import ZoneInfo

import psycopg

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "server"))
from passwords import hash_password  # noqa: E402
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
TZ = ZoneInfo("Asia/Tashkent")
HQ = (41.280101, 69.251403)          # the app's built-in geofence centre (bundle constant)
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]

EMPLOYEES = [
    # telegram_id, first, last, username, department, shift name, start, end, days
    (9000001, "Aziz", "Demo", "aziz_demo", "7CORE", "Day Shift", "09:00", "18:00", DAYS[:5]),
    (9000002, "Malika", "Test", "malika_test", "HOS", "Day Shift", "09:00", "18:00", DAYS[:5]),
    (9000003, "John", "Sample", "john_sample", "7CORE", "Night Shift", "18:00", "02:00", DAYS[:5]),
]
COLORS = [(59, 130, 246), (236, 72, 153), (16, 185, 129)]


def env() -> dict[str, str]:
    out = {}
    for line in (ROOT / ".env").read_text().splitlines():
        if "=" in line and not line.startswith("#"):
            k, v = line.split("=", 1)
            out[k.strip()] = v.strip()
    return out


def avatar(initials: str, color: tuple[int, int, int]) -> str:
    """A generated initials tile, stored like the app stores selfies (data: URL)."""
    img = Image.new("RGB", (160, 160), color)
    d = ImageDraw.Draw(img)
    d.text((80, 80), initials, font=ImageFont.truetype(FONT, 64), fill=(255, 255, 255), anchor="mm")
    buf = io.BytesIO()
    img.save(buf, format="JPEG", quality=80)
    return "data:image/jpeg;base64," + base64.b64encode(buf.getvalue()).decode()


def monday_of(d: date) -> date:
    return d - timedelta(days=d.weekday())


def main() -> None:
    cfg = env()
    force = "--force" in sys.argv
    rng = random.Random(42)
    dsn = f"host=127.0.0.1 port=55440 dbname=opsector user=postgres password={cfg['POSTGRES_PASSWORD']}"
    with psycopg.connect(dsn, autocommit=False) as conn, conn.cursor() as cur:
        cur.execute("SELECT count(*) FROM employees")
        if cur.fetchone()[0] and not force:
            print("database already has employees; nothing to do (use --force to reset)")
            return
        if force:
            cur.execute("CREATE TABLE IF NOT EXISTS face_profiles (telegram_id bigint PRIMARY KEY, embedding text NOT NULL,"
                        " photo text, enrolled_at timestamptz DEFAULT now(), updated_at timestamptz DEFAULT now(),"
                        " checks integer DEFAULT 0, last_score real, last_used_at timestamptz)")
            cur.execute("GRANT SELECT, INSERT, UPDATE, DELETE ON face_profiles TO web_anon")
            cur.execute("TRUNCATE admin_users, dev_users, employees, managers, attendance_logs, attendance_day_notes,"
                        " team_schedules, organization_security, system_settings, face_profiles")

        now = datetime.now(TZ)
        created = now - timedelta(days=30)
        cur.execute("INSERT INTO admin_users (id, username, password, display_name, role, created_at) VALUES (%s,%s,%s,%s,%s,%s)",
                    ("admin-owner", cfg["ADMIN_USERNAME"].lower(), hash_password(cfg["ADMIN_PASSWORD"]), "Administrator",
                     "Super Admin", now))
        cur.execute("INSERT INTO organization_security (id, key_name, passkey, description, geofence_lat, geofence_lng,"
                    " geofence_radius_meters, enforce_geofence, enforce_selfie, updated_by) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)",
                    ("sec-terminal", "terminal_access_code", cfg["TERMINAL_CODE"], "Employee registration code",
                     HQ[0], HQ[1], 100, True, True, "seed"))

        photos = {}
        for (tg, first, last, user, dept, shift, start, end, days), color in zip(EMPLOYEES, COLORS):
            photos[tg] = avatar(first[0] + last[0], color)
            cur.execute("INSERT INTO employees (telegram_id, first_name, last_name, username, photo_url, department, is_verified,"
                        " shift_name, shift_start_time, shift_end_time, shift_days, created_at, updated_at)"
                        " VALUES (%s,%s,%s,%s,%s,%s,true,%s,%s,%s,%s,%s,%s)",
                        (tg, first, last, user, photos[tg], dept, shift, start, end, json.dumps(days), created, created))

        # this week's schedule rows (the manager portal edits these)
        week = monday_of(now.date())
        for tg, first, last, user, dept, shift, start, end, days in EMPLOYEES:
            cells = {d: {"status": "scheduled" if d in days else "off", "startTime": start if d in days else "",
                         "endTime": end if d in days else "", "note": ""} for d in DAYS}
            cur.execute("INSERT INTO team_schedules (id, week_start_date, telegram_id, department, manager_id, monday, tuesday,"
                        " wednesday, thursday, friday, saturday, sunday, updated_by) VALUES"
                        " (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)",
                        (f"sched-{week}-{tg}", week, tg, dept, None, *[json.dumps(cells[d]) for d in DAYS], "seed"))

        # two weeks of check-ins/outs on scheduled days (none in the future, today left open for the day shift)
        logs = 0
        for back in range(14, -1, -1):
            day = now.date() - timedelta(days=back)
            for tg, first, last, user, dept, shift, start, end, days in EMPLOYEES:
                if DAYS[day.weekday()] not in days or rng.random() < 0.08:
                    continue
                sh, sm = map(int, start.split(":"))
                eh, em = map(int, end.split(":"))
                t_in = datetime.combine(day, time(sh, sm), TZ) + timedelta(minutes=rng.randint(-15, 25), seconds=rng.randint(0, 59))
                t_out = datetime.combine(day, time(eh, em), TZ) + timedelta(minutes=rng.randint(-10, 30))
                if t_out <= t_in:
                    t_out += timedelta(days=1)
                for action, ts in (("check_in", t_in), ("check_out", t_out)):
                    if ts > now:
                        continue
                    lat = HQ[0] + rng.uniform(-0.0004, 0.0004)
                    lng = HQ[1] + rng.uniform(-0.0004, 0.0004)
                    cur.execute("INSERT INTO attendance_logs (id, telegram_id, action_type, \"timestamp\", photo_url, latitude,"
                                " longitude, distance_meters, note, created_at) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)",
                                (f"seed-{tg}-{day}-{action}", tg, action, ts, photos[tg], lat, lng, rng.randint(4, 60),
                                 None, ts))
                    logs += 1
        conn.commit()
        print(f"seeded: 1 Super Admin ({cfg['ADMIN_USERNAME']}), 3 test employees, {logs} attendance logs, schedule for week of {week}")


if __name__ == "__main__":
    main()
