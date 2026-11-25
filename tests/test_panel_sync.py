"""Panel corrections reach the bot side.

Part A (HTTP, against a test instance, like tests/test_api.py):
    BOT_POLLING=0 AUTO_CLOSE=0 APP_PORT=8890 TMA_PORT=8891 python3 server/app.py &
    python3 tests/test_panel_sync.py
  The same REST calls the admin/manager panel makes (edit a mark, delete it, add a manual mark, force a
  clock-out, change the shift) are sent through /rest/v1 with an admin session; after each one the Mini
  App state (/api/me) must follow.
Part B (in-process): the Telegram messages the employee gets for those changes, and the automatic
  check-out of a missed mark at the shift end.
"""
from __future__ import annotations

import argparse
import asyncio
import base64
import sys
import uuid
from datetime import datetime, timedelta, timezone
from pathlib import Path
from zoneinfo import ZoneInfo

import httpx

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "server"))
from tma import attendance as att  # noqa: E402
from tma.api import MiniApp  # noqa: E402
from tma.telegram import sign_init_data  # noqa: E402

fails = 0
TZ = ZoneInfo("Asia/Tashkent")
TG = 777000031
DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]


def check(name: str, ok: bool, detail="") -> None:
    global fails
    print(("ok   " if ok else "FAIL ") + name + ("" if ok else f"  -> {str(detail)[:300]}"))
    fails += not ok


def env() -> dict:
    out = {}
    for line in (ROOT / ".env").read_text().splitlines():
        if "=" in line and not line.strip().startswith("#"):
            k, v = line.split("=", 1)
            out[k.strip()] = v.strip()
    return out


def z(dt: datetime) -> str:
    return dt.astimezone(timezone.utc).isoformat().replace("+00:00", "Z")


# ------------------------------------------------------------------ part A

def part_a(cfg: dict, admin: str, base: str, rest: str) -> None:
    print("A. panel API changes -> Mini App state")
    db = httpx.Client(base_url=rest, timeout=10)
    app = httpx.Client(base_url=base, timeout=20)
    hdr = {"X-Init-Data": sign_init_data({"id": TG, "first_name": "Panel", "last_name": "Test", "language_code": "uz"},
                                         cfg["BOT_TOKEN"])}
    panel = httpx.Client(base_url=admin, timeout=10, headers={"X-Requested-With": "sevencore"})
    r = panel.post("/auth/login", json={"username": cfg["ADMIN_USERNAME"], "password": cfg["ADMIN_PASSWORD"]})
    check("admin login", r.status_code == 200, r.text)
    panel.cookies.set("ops_session", r.cookies.get("ops_session") or "")

    def cleanup():
        for t in ("attendance_logs", "face_profiles", "employees"):
            db.delete(f"/{t}", params={"telegram_id": f"eq.{TG}"})

    def state():
        return app.post("/api/me", json={}, headers=hdr).json()["state"]

    def code(st):
        return (st.get("blocked") or {}).get("code")

    now = datetime.now(TZ)
    start, end = now - timedelta(hours=1), now + timedelta(hours=7)
    cleanup()
    try:
        db.post("/employees", json={"telegram_id": TG, "first_name": "Panel", "last_name": "Test", "department": "7CORE",
                                    "is_verified": True, "shift_name": "Custom", "shift_start_time": start.strftime("%H:%M"),
                                    "shift_end_time": end.strftime("%H:%M"), "shift_days": DAYS,
                                    "created_at": z(now - timedelta(days=2))}).raise_for_status()
        db.post("/face_profiles", json={"telegram_id": TG, "embedding": base64.b64encode(bytes(512)).decode()}).raise_for_status()
        db.post("/attendance_logs", json={"id": "ps-in", "telegram_id": TG, "action_type": "check_in",
                                          "timestamp": z(now - timedelta(minutes=50)), "note": "Face ID verified"}).raise_for_status()
        st = state()
        check("start: on shift, check-out locked until the end", code(st) == "checkout_not_yet", st)

        def local(dt):
            return dt.astimezone(TZ).strftime("%Y-%m-%dT%H:%M")

        # 1. the manager edits the check-in time
        new_in = (now - timedelta(minutes=58)).replace(second=0, microsecond=0)
        r = panel.patch("/api/panel/marks/ps-in", json={"at": local(new_in), "note": "corrected"})
        st = state()
        check("edit check-in time -> Mini App shows the new time",
              r.status_code < 300 and att.parse_ts(st["open_since"]) == new_in, (r.status_code, st.get("open_since")))

        # 2. the manager deletes the check-in
        r = panel.delete("/api/panel/marks/ps-in")
        st = state()
        check("delete check-in -> not on shift any more (check-in window already closed)",
              r.status_code < 300 and not st["open_since"] and code(st) == "checkin_closed", st)

        # 3. the manager adds the check-in by hand (excused late arrival)
        r = panel.post("/api/panel/marks", json={"telegram_id": TG, "action": "check_in", "at": local(start + timedelta(minutes=25)),
                                                 "note": "excused"})
        st = state()
        check("manual check-in -> on shift again", r.status_code < 300 and code(st) == "checkout_not_yet", st)

        # 4. force check-out from the panel
        r = panel.post(f"/api/panel/employees/{TG}/checkout")
        forced = r.json().get("mark", {}).get("id")
        st = state()
        check("force check-out -> shift closed, no second check-in", r.status_code < 300 and code(st) == "shift_done", st)

        # 5. the check-out was a mistake: deleted again
        panel.delete(f"/api/panel/marks/{forced}")
        st = state()
        check("check-out deleted -> on shift again", code(st) == "checkout_not_yet", st)

        # 6. the manager moves the shift end: the check-out window opens
        r = panel.patch(f"/api/panel/employees/{TG}", json={"shift": {"start": start.strftime("%H:%M"),
                        "end": (datetime.now(TZ) - timedelta(minutes=5)).strftime("%H:%M"), "days": DAYS}})
        st = state()
        check("shift end moved to 5 min ago -> check-out open now", r.status_code < 300 and st["action"] == "check_out", (r.text, st))

        # 7. the week schedule marks today as a day off
        db.delete("/attendance_logs", params={"telegram_id": f"eq.{TG}"})
        r = panel.put(f"/api/panel/schedule/{TG}/{now.date().isoformat()}", json={"status": "off"})
        st = state()
        check("schedule: today a day off -> day off in the Mini App", r.status_code < 300 and code(st) == "day_off", (r.text, st))
    finally:
        cleanup()
        db.delete("/team_schedules", params={"telegram_id": f"eq.{TG}"})
        left = len(db.get("/attendance_logs", params={"telegram_id": f"eq.{TG}"}).json())
        print(f"cleanup: {left} test rows left")


# ------------------------------------------------------------------ part B

class StubBot:
    state = "polling"

    def __init__(self):
        self.sent: list[tuple[int, str]] = []

    async def notify(self, chat_id, text, lang):
        self.sent.append((chat_id, text))


class FakeStore:
    def __init__(self, emp, logs):
        self.emp, self.rows = emp, logs

    async def recent_logs(self, since):
        return [r for r in self.rows if att.parse_ts(r["timestamp"]) >= since]

    async def employee(self, tg):
        return self.emp if tg == self.emp["telegram_id"] else None

    async def context(self, tg, emp, now):
        return sorted(self.rows, key=lambda r: r["timestamp"]), {}

    async def add_log(self, row):
        if any(r["id"] == row["id"] for r in self.rows):
            raise httpx.HTTPStatusError("conflict", request=None, response=None)
        self.rows.append(row)
        return row


def part_b() -> None:
    print("B. Telegram messages and the automatic check-out")

    async def noop(*a, **k):
        return None

    rules_env = {"BOT_TOKEN": "1:x", "CHECKIN_EARLY_MIN": "120", "CHECKIN_LATE_MAX_MIN": "15",
                 "CHECKOUT_WINDOW_MIN": "120", "APP_TZ": "Asia/Tashkent"}
    m = MiniApp(rules_env, ROOT, "http://127.0.0.1:1", noop)
    bot = StubBot()
    m.bot = bot
    run = asyncio.run
    ts = "2026-11-24T04:00:00Z"            # 09:00 Tashkent

    run(m.panel_changed("manager", "attendance_logs", "POST", [], {"id": "a1", "telegram_id": 5, "action_type": "check_in", "timestamp": ts}))
    check("manual mark -> 'Menejer ... yozuv qo'shdi: Check-in 24.11 09:00'",
          bot.sent and bot.sent[-1][0] == 5 and "qo'shdi" in bot.sent[-1][1] and "24.11 09:00" in bot.sent[-1][1], bot.sent)
    n = len(bot.sent)
    run(m.panel_changed("admin", "attendance_logs", "POST", [], {"id": "auto-out-a1", "telegram_id": 5, "action_type": "check_out", "timestamp": ts}))
    check("the panel's own auto check-out -> no message", len(bot.sent) == n, bot.sent[n:])
    before = [{"id": "a1", "telegram_id": 5, "action_type": "check_in", "timestamp": ts}]
    run(m.panel_changed("manager", "attendance_logs", "PATCH", before, {"timestamp": "2026-11-24T03:50:00Z", "admin_note": "ok"}))
    check("edited time -> '24.11 09:00 → 24.11 08:50'", "09:00 → <b>24.11 08:50</b>" in bot.sent[-1][1], bot.sent[-1])
    n = len(bot.sent)
    run(m.panel_changed("manager", "attendance_logs", "PATCH", before, {"timestamp": "2026-11-24T09:00:00+05:00", "admin_note": "x"}))
    check("only the note / same moment in another format -> no message", len(bot.sent) == n, bot.sent[n:])
    run(m.panel_changed("admin", "attendance_logs", "DELETE", before, None))
    check("deleted mark -> 'Admin yozuvingizni o'chirdi'", "Admin" in bot.sent[-1][1] and "o'chirdi" in bot.sent[-1][1], bot.sent[-1])
    emp_before = [{"telegram_id": 5, "shift_name": "Shift Unassigned", "shift_start_time": None, "shift_end_time": None, "shift_days": []}]
    run(m.panel_changed("manager", "employees", "PATCH", emp_before,
                        {"first_name": "A", "shift_name": "Custom (15:00 – 00:00)", "shift_start_time": "15:00",
                         "shift_end_time": "00:00", "shift_days": ["monday", "tuesday", "wednesday", "thursday", "friday"]}))
    msg = bot.sent[-1][1]
    check("shift set -> times, days and both windows",
          "15:00 – 00:00" in msg and "Du, Se, Ch, Pa, Ju" in msg and "Check-in: 13:00 – 15:15" in msg and "Check-out: 00:00 – 02:00" in msg, msg)
    n = len(bot.sent)
    run(m.panel_changed("admin", "employees", "PATCH", [{**emp_before[0], "shift_name": "Custom (15:00 – 00:00)",
                                                         "shift_start_time": "15:00", "shift_end_time": "00:00",
                                                         "shift_days": ["monday"]}], {"first_name": "B", "department": "HOS"}))
    check("name/department edit -> no message", len(bot.sent) == n, bot.sent[n:])
    m.langs[6] = "ru"
    run(m.panel_changed("manager", "attendance_logs", "DELETE", [{**before[0], "telegram_id": 6}], None))
    check("message in the employee's language (ru)", "Менеджер" in bot.sent[-1][1], bot.sent[-1])

    # automatic check-out: 09:00-18:00 shift, checked in 08:55, no check-out
    emp = {"telegram_id": 7, "shift_name": "Day", "shift_start_time": "09:00", "shift_end_time": "18:00", "shift_days": DAYS}
    day = datetime(2026, 11, 24, tzinfo=TZ)
    rows = [{"id": "in-7", "telegram_id": 7, "action_type": "check_in", "timestamp": z(day.replace(hour=8, minute=55))}]
    m.store = FakeStore(emp, rows)
    n = run(m.close_missed(day.replace(hour=19, minute=30)))
    check("19:30, check-out window still open -> nothing closed", n == 0 and len(rows) == 1, rows)
    n = run(m.close_missed(day.replace(hour=20, minute=5)))
    out = rows[-1]
    check("20:05, window closed -> closed at 18:00 as auto-out-<id>",
          n == 1 and out["id"] == "auto-out-in-7" and att.parse_ts(out["timestamp"]) == day.replace(hour=18), out)
    check("employee told about the automatic check-out", "18:00" in bot.sent[-1][1] and bot.sent[-1][0] == 7, bot.sent[-1])
    n = run(m.close_missed(day.replace(hour=20, minute=10)))
    check("next sweep -> not closed twice", n == 0 and len(rows) == 2, rows)
    st = att.evaluate(emp, rows, {}, day.replace(hour=20, minute=10), m.rules)
    check("Mini App still says the check-out was missed", (st.get("missed_checkout") or {}).get("date") == "2026-11-24", st)
    old_day = day - timedelta(days=4)
    rows2 = [{"id": "in-8", "telegram_id": 8, "action_type": "check_in", "timestamp": z(old_day.replace(hour=9, minute=1))}]
    m.store = FakeStore({**emp, "telegram_id": 8}, rows2)
    n = run(m.close_missed(day.replace(hour=11)))
    check("a check-in left open 4 days ago (server was down) -> closed at that day's 18:00",
          n == 1 and att.parse_ts(rows2[-1]["timestamp"]) == old_day.replace(hour=18), rows2)
    m.store = FakeStore(emp, rows)
    s = att.summaries(emp, rows, {}, day.replace(hour=20, minute=10), m.rules) if hasattr(att, "summaries") else None
    if s:
        today = next(d for d in s["week"] if d["date"] == "2026-11-24")
        check("day summary counts 08:55 – 18:00 = 9 h 5 min", today["worked_min"] == 545, today)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--base", default="http://127.0.0.1:8891")
    ap.add_argument("--admin", default="http://127.0.0.1:8890")
    ap.add_argument("--only-b", action="store_true")
    args = ap.parse_args()
    cfg = env()
    if not args.only_b:
        part_a(cfg, args.admin, args.base, cfg.get("POSTGREST_URL", "http://127.0.0.1:55441"))
    part_b()
    print(f"\n{'all passed' if not fails else str(fails) + ' FAILED'}")
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
