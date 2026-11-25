"""The panel API (/api/panel/*): numbers, permissions, manager scope, corrections, schedule, export, live events.

Runs against a test instance (it writes its own fake employees and removes them at the end):
    BOT_POLLING=0 AUTO_CLOSE=0 APP_PORT=8890 TMA_PORT=8891 python3 server/app.py &
    python3 tests/test_panel_api.py
"""
from __future__ import annotations

import argparse
import io
import sys
import threading
import time
from datetime import date, datetime, timedelta, timezone
from pathlib import Path
from zoneinfo import ZoneInfo

import httpx
from openpyxl import load_workbook

ROOT = Path(__file__).resolve().parent.parent
TZ = ZoneInfo("Asia/Tashkent")
E1, E2 = 777000051, 777000052          # 7CORE and HOS
MGR = "test.mgr.7core"
DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday"]
fails = 0


def check(name, ok, detail=""):
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


def z(d: date, hm: str) -> str:
    h, m = map(int, hm.split(":"))
    return datetime(d.year, d.month, d.day, h, m, tzinfo=TZ).astimezone(timezone.utc).isoformat().replace("+00:00", "Z")


def login(base: str, username: str, password: str) -> httpx.Client:
    c = httpx.Client(base_url=base, timeout=30, headers={"X-Requested-With": "sevencore"})
    r = c.post("/auth/login", json={"username": username, "password": password})
    assert r.status_code == 200, r.text
    c.cookies.set("ops_session", r.cookies.get("ops_session") or "")
    return c


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--base", default="http://127.0.0.1:8890")
    args = ap.parse_args()
    cfg = env()
    db = httpx.Client(base_url=cfg.get("POSTGREST_URL", "http://127.0.0.1:55441"), timeout=10)
    admin = login(args.base, cfg["ADMIN_USERNAME"], cfg["ADMIN_PASSWORD"])

    # a past Monday-Friday week that is fully over
    today = datetime.now(TZ).date()
    mon = today - timedelta(days=today.weekday() + 7)
    wk = [mon + timedelta(days=i) for i in range(7)]

    def cleanup():
        for t in ("attendance_logs", "face_profiles", "team_schedules", "employees"):
            db.delete(f"/{t}", params={"telegram_id": f"in.({E1},{E2})"})
        for u in admin.get("/auth/users").json().get("users", []):
            if u["username"] == MGR:
                admin.delete(f"/auth/users/{u['kind']}/{u['id']}")

    cleanup()
    try:
        created = z(mon - timedelta(days=20), "00:00")
        for tg, dept in ((E1, "7CORE"), (E2, "HOS")):
            db.post("/employees", json={"telegram_id": tg, "first_name": "Panel", "last_name": f"Test{tg % 10}", "department": dept,
                                        "is_verified": True, "shift_name": "Smena (09:00 – 18:00)", "shift_start_time": "09:00",
                                        "shift_end_time": "18:00", "shift_days": DAYS, "created_at": created}).raise_for_status()
        marks = [
            ("in0", 0, "check_in", "08:50"), ("out0", 0, "check_out", "18:05"),      # on time      9:15
            ("in1", 1, "check_in", "09:12"), ("out1", 1, "check_out", "18:00"),      # late 12      8:48
            # day 2 absent
            ("in3", 3, "check_in", "07:10"), ("out3", 3, "check_out", "19:40"),      # 2 h early   12:30
            ("in4", 4, "check_in", "08:58"),                                          # closed by the server at 18:00
        ]
        rows = [{"id": f"pt-{tg}-{k}", "telegram_id": E1, "action_type": a, "timestamp": z(wk[d], hm), "note": "Face ID verified",
                 "admin_note": None}
                for tg, (k, d, a, hm) in ((E1, m) for m in marks)]
        rows.append({"id": f"auto-out-pt-{E1}-in4", "telegram_id": E1, "action_type": "check_out", "timestamp": z(wk[4], "18:00"),
                     "note": "System Auto Check-Out", "admin_note": "auto"})
        db.post("/attendance_logs", json=rows).raise_for_status()

        print("access")
        r = httpx.get(f"{args.base}/api/panel/overview")
        check("no session -> 401", r.status_code == 401, r.status_code)
        r = httpx.post(f"{args.base}/api/panel/marks", json={}, cookies=admin.cookies)
        check("write without the X-Requested-With header -> 403", r.status_code == 403, r.status_code)
        check("old database proxy is gone", httpx.get(f"{args.base}/rest/v1/employees").status_code == 404)
        check("old pages redirect to the panel", httpx.get(f"{args.base}/admin").headers.get("location") == "/app")

        print("report numbers (week " + wk[0].isoformat() + ")")
        rep = admin.get("/api/panel/reports", params={"from": wk[0].isoformat(), "to": wk[6].isoformat()}).json()
        row = next(r for r in rep["rows"] if r["telegram_id"] == E1)
        tt = row["totals"]
        check("work days 4, on time 3, late 1, absent 1", (tt["work_days"], tt["on_time"], tt["late"], tt["absent"]) == (4, 3, 1, 1), tt)
        check("worked 9:15 + 8:48 + 12:30 + 9:02 = 2375 min", tt["worked_min"] == 2375, tt["worked_min"])
        check("late minutes 12, rate 80 %, average arrival 08:32", (tt["late_min"], tt["rate"], tt["avg_in"]) == (12, 0.8, "08:32"), tt)
        check("weekend = days off, auto check-out counted", (tt["off"], tt["auto_out"]) == (2, 1), tt)
        st = [d["status"] for d in row["days"]]
        check("day statuses", st == ["present", "late", "absent", "present", "present", "off", "off"], st)
        old = admin.get("/api/panel/reports", params={"from": (mon - timedelta(days=27)).isoformat(),
                                                       "to": (mon - timedelta(days=21)).isoformat()}).json()
        orow = next(r for r in old["rows"] if r["telegram_id"] == E1)
        check("days before registration are not absent", orow["totals"]["absent"] == 0 and orow["totals"]["rate"] is None, orow["totals"])

        print("marks list")
        ml = admin.get("/api/panel/marks", params={"from": wk[0].isoformat(), "to": wk[6].isoformat(), "q": "Test1"}).json()
        by = {m["id"]: m for m in ml["rows"]}
        check("late flag on the 09:12 check-in", by[f"pt-{E1}-in1"]["late_min"] == 12, by.get(f"pt-{E1}-in1"))
        check("duration paired with the same employee (12:30)", by[f"pt-{E1}-out3"]["duration_min"] == 750, by.get(f"pt-{E1}-out3"))
        check("auto check-out marked", by[f"auto-out-pt-{E1}-in4"]["auto"] is True)
        csv = admin.get("/api/panel/marks.csv", params={"from": wk[0].isoformat(), "to": wk[6].isoformat(), "q": "Test1"})
        check("CSV export", csv.status_code == 200 and csv.text.count("\n") == 9, csv.text[:200])

        print("excel")
        x = admin.get("/api/panel/reports.xlsx", params={"from": wk[0].isoformat(), "to": wk[6].isoformat(), "q": "Test1"})
        wb = load_workbook(io.BytesIO(x.content))
        ws = wb.worksheets[0]
        line = [c.value for c in ws[5]]
        check("summary sheet row: 4 days, 1 late, 1 absent, 39.58 h, 80 %",
              line[3:7] == [4, 3, 1, 1] and line[9] == 39.58 and line[12] == 0.8, line)
        daily = [c.value for c in wb.worksheets[1][2]]
        check("daily sheet: 08:50, 09:12 +12, absent", daily[1] == "08:50" and daily[2] == "09:12 +12" and daily[3] == "Kelmadi", daily)

        print("manager scope")
        r = admin.post("/auth/users", json={"display_name": "Test Manager", "username": MGR, "password": "mgr-pass-123",
                                            "role": "Manager", "department": "7CORE"})
        check("manager account created", r.status_code == 201, r.text)
        mgr_id = r.json().get("id")
        mgr = login(args.base, MGR, "mgr-pass-123")
        me = mgr.get("/api/panel/me").json()
        check("manager permissions", me["perms"]["marks"] and not me["perms"]["employee_delete"] and not me["perms"]["accounts"], me["perms"])
        ids = {e["telegram_id"] for e in mgr.get("/api/panel/employees").json()["rows"]}
        check("manager sees 7CORE, not HOS", E1 in ids and E2 not in ids, ids)
        check("other department's employee -> 404", mgr.get(f"/api/panel/employees/{E2}").status_code == 404)
        r = mgr.post("/api/panel/marks", json={"telegram_id": E2, "action": "check_in", "at": f"{wk[2].isoformat()}T09:00"})
        check("manager cannot add marks outside the scope", r.status_code == 404, r.text)
        check("manager cannot reset Face ID", mgr.delete(f"/api/panel/employees/{E1}/face").status_code == 403)
        check("manager cannot open settings", mgr.get("/api/panel/settings").status_code == 403)
        check("manager cannot list accounts", mgr.get("/auth/users").status_code == 403)
        r = mgr.put(f"/api/panel/schedule/{E1}/{wk[2].isoformat()}", json={"status": "sick"})
        check("manager cannot change a past day", r.status_code == 403 and r.json()["error"] == "day_locked", r.text)
        r = admin.patch(f"/api/panel/employees/{E2}", json={"manager_id": mgr_id})
        check("admin assigns the HOS employee to the manager", r.status_code == 200, r.text)
        ids = {e["telegram_id"] for e in mgr.get("/api/panel/employees").json()["rows"]}
        check("assigned employee now visible to the manager", E2 in ids, ids)
        admin.patch(f"/api/panel/employees/{E2}", json={"manager_id": None})

        print("corrections")
        r = admin.put(f"/api/panel/schedule/{E1}/{wk[2].isoformat()}", json={"status": "sick", "note": "doctor"})
        check("admin marks the absent day as sick leave", r.status_code == 200, r.text)
        tt = admin.get("/api/panel/reports", params={"from": wk[0].isoformat(), "to": wk[6].isoformat(), "q": "Test1"}).json()["rows"][0]["totals"]
        check("report: absent 0, sick 1, rate 100 %", (tt["absent"], tt["sick"], tt["rate"]) == (0, 1, 1.0), tt)
        r = mgr.post("/api/panel/marks", json={"telegram_id": E1, "action": "check_in", "at": f"{wk[2].isoformat()}T09:20", "note": "phone"})
        check("manager adds a missed check-in", r.status_code == 200, r.text)
        mid = r.json()["mark"]["id"]
        check("admin note records who did it", f"phone · {MGR}" == r.json()["mark"]["admin_note"], r.json()["mark"])
        r = mgr.patch(f"/api/panel/marks/{mid}", json={"at": f"{wk[2].isoformat()}T09:02"})
        check("manager edits the time", r.status_code == 200, r.text)
        r = mgr.post("/api/panel/marks", json={"telegram_id": E1, "action": "check_in", "at": (datetime.now(TZ) + timedelta(hours=2)).strftime("%Y-%m-%dT%H:%M")})
        check("future time refused", r.status_code == 400 and r.json()["error"] == "future_time", r.text)
        r = mgr.delete(f"/api/panel/marks/{mid}")
        check("manager deletes the mark", r.status_code == 200, r.text)
        check("mark gone", db.get("/attendance_logs", params={"id": f"eq.{mid}"}).json() == [])

        print("shift and schedule")
        r = mgr.patch(f"/api/panel/employees/{E1}", json={"shift": {"start": "10:00", "end": "19:00", "days": DAYS + ["saturday"]}})
        check("manager sets a new shift", r.status_code == 200 and r.json()["shift_note"] in ("from_today", "from_tomorrow"), r.text)
        emp = db.get("/employees", params={"telegram_id": f"eq.{E1}", "select": "shift_start_time,shift_days"}).json()[0]
        check("employee row updated", emp["shift_start_time"] == "10:00" and "saturday" in emp["shift_days"], emp)
        r = mgr.patch(f"/api/panel/employees/{E1}", json={"first_name": "X"})
        check("manager cannot rename", r.status_code == 403, r.text)
        nxt = today + timedelta(days=7 - today.weekday() + 2)      # next week's Wednesday
        sch = admin.get("/api/panel/schedule", params={"week": nxt.isoformat(), "q": "Test1"}).json()
        cell = sch["rows"][0]["cells"][2]
        check("schedule shows the new default shift", cell["start"] == "10:00" and cell["plan"] == "scheduled" and not cell["override"], cell)
        r = admin.put(f"/api/panel/schedule/{E1}/{nxt.isoformat()}", json={"status": "scheduled", "start": "12:00", "end": "20:00"})
        cell = admin.get("/api/panel/schedule", params={"week": nxt.isoformat(), "q": "Test1"}).json()["rows"][0]["cells"][2]
        check("one-day custom hours", cell["start"] == "12:00" and cell["override"], cell)
        admin.put(f"/api/panel/schedule/{E1}/{nxt.isoformat()}", json={"status": "default"})
        cell = admin.get("/api/panel/schedule", params={"week": nxt.isoformat(), "q": "Test1"}).json()["rows"][0]["cells"][2]
        check("back to the default shift", cell["start"] == "10:00" and not cell["override"], cell)
        r = admin.put(f"/api/panel/schedule/{E1}/{nxt.isoformat()}", json={"status": "scheduled", "start": "25:00", "end": "20:00"})
        check("bad time refused", r.status_code == 400, r.text)

        print("force check-out and live events")
        events: list[str] = []

        def listen():
            try:
                with httpx.stream("GET", f"{args.base}/api/panel/events", cookies=admin.cookies, timeout=8) as s:
                    for line in s.iter_lines():
                        if line.startswith("data:"):
                            events.append(line)
                            return
            except httpx.HTTPError:
                pass
        th = threading.Thread(target=listen, daemon=True)
        th.start()
        time.sleep(1)
        now = datetime.now(TZ)
        # an all-day shift so "now" is inside it, then an open check-in an hour ago
        admin.patch(f"/api/panel/employees/{E1}", json={"shift": {"start": "00:30", "end": "23:59", "days": DAYS + ["saturday", "sunday"]}})
        db.post("/attendance_logs", json={"id": f"pt-{E1}-open", "telegram_id": E1, "action_type": "check_in",
                                          "timestamp": (now - timedelta(minutes=20)).astimezone(timezone.utc).isoformat()})
        ov = admin.get("/api/panel/overview", params={"dept": "7CORE"}).json()
        check("overview: employee on duty", any(r["telegram_id"] == E1 for r in ov["on_duty"]), ov["kpi"])
        lane = next((x for x in ov.get("lanes", []) if x["telegram_id"] == E1), None)
        check("overview timeline: a lane with the plan and an ongoing session",
              bool(lane and lane["plan"] and lane["sessions"] and lane["sessions"][-1]["ongoing"]), lane)
        r = mgr.post(f"/api/panel/employees/{E1}/checkout")
        check("manager closes the shift", r.status_code == 200, r.text)
        r = mgr.post(f"/api/panel/employees/{E1}/checkout")
        check("second time -> not on shift", r.status_code == 409 and r.json()["error"] == "not_on_shift", r.text)
        th.join(6)
        check("live event pushed to the open panel", bool(events) and '"telegram_id": %d' % E1 in events[0], events)

        print("admin only")
        r = admin.delete(f"/api/panel/employees/{E2}")
        check("admin deletes an employee", r.status_code == 200 and not db.get("/employees", params={"telegram_id": f"eq.{E2}"}).json(), r.text)
        x = admin.get(f"/api/panel/employees/{E1}/photo")
        check("missing photo -> 404, no crash", x.status_code == 404, x.status_code)
    finally:
        cleanup()
        left = db.get("/attendance_logs", params={"telegram_id": f"in.({E1},{E2})", "select": "id"}).json()
        print(f"cleanup: {len(left)} test rows left")
    print(f"\n{'all passed' if not fails else str(fails) + ' FAILED'}")
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
