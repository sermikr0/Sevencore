"""Shift rules (server/tma/attendance.py). Run: python3 tests/test_rules.py

Windows: check-in opens 2 h before the shift start and closes at the shift end; check-out opens at the
shift end and stays open 2 h. Location: 300 m around the office for both marks, no GPS allowance.
"""
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path
from zoneinfo import ZoneInfo

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "server"))
from tma import attendance as att  # noqa: E402

TZ = ZoneInfo("Asia/Tashkent")
R = att.Rules(tz=TZ, early_min=120, checkout_early_min=0, checkout_window_min=120)
WEEK = ["monday", "tuesday", "wednesday", "thursday", "friday"]
DAY = {"telegram_id": 1, "shift_name": "Day Shift", "shift_start_time": "09:00", "shift_end_time": "18:00", "shift_days": WEEK}
NIGHT = {**DAY, "shift_name": "Main Shift (16:00 – 02:00)", "shift_start_time": "16:00", "shift_end_time": "02:00"}
LONG = {**DAY, "shift_name": "Second Shift (02:00 – 16:00)", "shift_start_time": "02:00", "shift_end_time": "16:00"}
MON = datetime(2026, 11, 23, tzinfo=TZ)          # a Monday
fails = 0


def at(day_offset, hh, mm=0):
    return MON + timedelta(days=day_offset, hours=hh, minutes=mm)


def log(action, when, id_=None):
    return {"id": id_ or f"x{when.timestamp()}", "action_type": action, "timestamp": when.astimezone(timezone.utc).isoformat()}


def check(name, got, **want):
    global fails
    bad = {k: (got.get(k), v) for k, v in want.items() if got.get(k) != v}
    print(("ok   " if not bad else "FAIL ") + name + ("" if not bad else f"  {bad}"))
    fails += bool(bad)


def ev(emp, logs, now, sched=None):
    return att.evaluate(emp, logs, sched or {}, now, R)


def code(st):
    return (st.get("blocked") or {}).get("code")


def b(st, key):
    return (st.get("blocked") or {}).get(key)


# ---- check-in window: 2 h before the start until the end
st = ev({**DAY, "shift_days": [], "shift_name": "Shift Unassigned"}, [], at(0, 10))
check("unassigned -> no_shift", {"code": code(st), "action": st["action"]}, code="no_shift", action=None)
st = ev(DAY, [], at(0, 6, 30))
check("06:30 too early, check-in opens 07:00", {"code": code(st), "opens": b(st, "opens")}, code="too_early", opens="07:00")
st = ev(DAY, [], at(0, 7, 0))
check("07:00 check-in open (2 h before), not late", st, action="check_in", late_min=0)
st = ev(DAY, [], at(0, 9, 4))
check("09:04 inside the 5 min grace", st, action="check_in", late_min=0)
st = ev(DAY, [], at(0, 9, 12))
check("09:12 late 12", st, action="check_in", late_min=12)
st = ev(DAY, [], at(0, 17, 59))
check("17:59 still open (late)", st, action="check_in", late_min=539)
st = ev(DAY, [], at(0, 18, 5))
check("18:05 no check-in -> shift over, next check-in opens 07:00",
      {"code": code(st), "opens": b(st, "opens"), "next": (b(st, "next") or {}).get("date")},
      code="shift_over", opens="07:00", next="2026-11-24")
st = ev(DAY, [], at(5, 11))
check("saturday day off, next = monday 09:00 (opens 07:00)",
      {"code": code(st), "next": b(st, "next")["start_at"][:16], "opens": b(st, "opens")},
      code="day_off", next="2026-11-30T09:00", opens="07:00")

# ---- check-out window: opens at the shift end, open 2 h
st = ev(DAY, [log("check_in", at(0, 9, 2))], at(0, 12))
check("on shift 12:00 -> check-out locked until 18:00",
      {"action": st["action"], "code": code(st), "opens": b(st, "opens"), "worked": st.get("worked_min"), "open": bool(st["open_since"])},
      action=None, code="checkout_not_yet", opens="18:00", worked=178, open=True)
st = ev(DAY, [log("check_in", at(0, 9, 2))], at(0, 17, 59))
check("17:59 still locked", {"code": code(st)}, code="checkout_not_yet")
st = ev(DAY, [log("check_in", at(0, 9, 2))], at(0, 18, 0))
check("18:00 check-out opens, closes 20:00", st, action="check_out", closes="20:00")
st = ev(DAY, [log("check_in", at(0, 9, 2))], at(0, 19, 59))
check("19:59 check-out still open", st, action="check_out")
st = ev(DAY, [log("check_in", at(0, 9, 2))], at(0, 20, 0))
check("20:00 window closed -> missed check-out, next check-in 07:00",
      {"action": st["action"], "code": code(st), "missed": (st.get("missed_checkout") or {}).get("date"), "opens": b(st, "opens")},
      action=None, code="shift_over", missed="2026-11-23", opens="07:00")
st = ev(DAY, [log("check_in", at(0, 9, 2))], at(1, 7, 30))
check("next morning 07:30 after a missed check-out -> check-in open", st, action="check_in", late_min=0)
st = ev(DAY, [log("check_in", at(0, 8, 55)), log("check_out", at(0, 18, 10))], at(0, 18, 30))
check("checked out 18:10 -> closed until the next window", {"action": st["action"], "code": code(st)},
      action=None, code="shift_over")
st = ev(DAY, [log("check_in", at(0, 9)), log("check_out", at(0, 12))], at(0, 13))
check("supervisor clock-out mid-shift -> shift done, no second check-in",
      {"action": st["action"], "code": code(st), "opens": b(st, "opens")}, action=None, code="shift_done", opens="07:00")
st = ev(DAY, [log("check_in", at(0, 9, 0))], at(0, 9, 1))
check("1 min after check-in -> cooldown", {"cool": bool(st.get("cooldown_s"))}, cool=True)
st = ev(DAY, [log("check_in", at(0, 9)), log("check_out", at(0, 19), id_="auto-out-x")], at(0, 19, 10))
check("panel's 10 h auto check-out is ignored -> real check-out still open", st, action="check_out")
st = ev(DAY, [log("check_in", at(-3, 9))], at(0, 10))
check("stale check-in from days ago -> new check-in", st, action="check_in", late_min=60)
st = ev(DAY, [log("check_in", at(5, 10))], at(5, 12))
check("check-in outside any shift (admin) -> check-out allowed", st, action="check_out")

# ---- long and night shifts
st = ev(LONG, [log("check_in", at(0, 1, 30))], at(0, 15))
check("14 h shift: still on shift after 13.5 h", {"code": code(st), "open": bool(st["open_since"])}, code="checkout_not_yet", open=True)
st = ev(LONG, [log("check_in", at(0, 1, 30))], at(0, 16, 10))
check("14 h shift: check-out at 16:10", st, action="check_out", closes="18:00")
st = ev(NIGHT, [], at(1, 1, 0))
check("night: 01:00 belongs to yesterday's 16:00 shift", {"action": st["action"], "day": st["shift"]["date"], "late": st["late_min"]},
      action="check_in", day="2026-11-23", late=540)
st = ev(NIGHT, [log("check_in", at(0, 15, 55))], at(1, 1, 30))
check("night: open since 15:55, 01:30 -> check-out opens 02:00", {"code": code(st), "opens": b(st, "opens")},
      code="checkout_not_yet", opens="02:00")
st = ev(NIGHT, [log("check_in", at(0, 15, 55))], at(1, 2, 30))
check("night: 02:30 -> check-out open until 04:00", st, action="check_out", closes="04:00")
st = ev(NIGHT, [], at(1, 4, 30))
check("night: 04:30 -> next check-in opens 14:00", {"code": code(st), "opens": b(st, "opens")}, code="too_early", opens="14:00")
st = ev(NIGHT, [], at(5, 1))
check("night: saturday 01:00 still friday's shift", {"action": st["action"], "day": st["shift"]["date"]}, action="check_in", day="2026-11-27")

# ---- weekly schedule from the manager portal
week = att.monday(MON.date())
sched = {week: {"monday": {"status": "off"}, "tuesday": {"status": "sick"},
                "wednesday": {"status": "scheduled", "startTime": "10:00", "endTime": "19:00"},
                "saturday": {"status": "scheduled", "startTime": "", "endTime": ""}}}
check("schedule: monday off", {"code": code(ev(DAY, [], at(0, 10), sched))}, code="day_off")
check("schedule: tuesday sick", {"code": code(ev(DAY, [], at(1, 10), sched))}, code="sick")
st = ev(DAY, [], at(2, 8, 20), sched)
check("schedule: wednesday 10:00 custom, 08:20 open", {"action": st["action"], "start": st["shift"]["start"]}, action="check_in", start="10:00")
st = ev(DAY, [], at(5, 9, 30), sched)
check("schedule: extra saturday with default hours", {"action": st["action"], "late": st["late_min"]}, action="check_in", late=30)

# ---- location: 300 m around the office, both marks, no GPS allowance
G = att.Rules(tz=TZ, lat=41.279986, lng=69.251817, radius_m=300, accuracy_allowance_m=0, checkout_geofence=True)
M = 1 / 111_195                       # degrees of latitude per metre


def loc(north_m, acc=15):
    return {"lat": 41.279986 + north_m * M, "lng": 69.251817, "accuracy": acc}


err, d = att.check_location(G, "check_in", loc(0))
check("location: at the office", {"err": err, "d": d}, err=None, d=0)
err, d = att.check_location(G, "check_in", loc(290, 30))
check("location: 290 m allowed", {"err": err, "d": d}, err=None, d=290)
err, d = att.check_location(G, "check_in", loc(310, 60))
check("location: 310 m refused (no GPS allowance)", {"err": err, "d": d}, err="too_far", d=310)
err, d = att.check_location(G, "check_out", loc(250))
check("location: check-out at 250 m allowed", {"err": err}, err=None)
err, d = att.check_location(G, "check_out", loc(800))
check("location: check-out from 800 m refused", {"err": err}, err="too_far")
err, d = att.check_location(G, "check_in", loc(0, 900))
check("location: weak gps refused", {"err": err}, err="weak_gps")
check("location: missing refused", {"err": att.check_location(G, "check_in", None)[0]}, err="no_location")

print(f"\n{'all passed' if not fails else str(fails) + ' FAILED'}")
sys.exit(1 if fails else 0)
