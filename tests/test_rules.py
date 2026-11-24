"""Shift rules (server/tma/attendance.py). Run: python3 tests/test_rules.py"""
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path
from zoneinfo import ZoneInfo

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "server"))
from tma import attendance as att  # noqa: E402

TZ = ZoneInfo("Asia/Tashkent")
R = att.Rules(tz=TZ)
WEEK = ["monday", "tuesday", "wednesday", "thursday", "friday"]
DAY = {"telegram_id": 1, "shift_name": "Day Shift", "shift_start_time": "09:00", "shift_end_time": "18:00", "shift_days": WEEK}
NIGHT = {**DAY, "shift_name": "Main Shift (16:00 – 02:00)", "shift_start_time": "16:00", "shift_end_time": "02:00"}
MON = datetime(2026, 11, 23, tzinfo=TZ)          # a Monday
fails = 0


def at(day_offset, hh, mm=0):
    return MON + timedelta(days=day_offset, hours=hh, minutes=mm)


def log(action, when):
    return {"id": f"x{when.timestamp()}", "action_type": action, "timestamp": when.astimezone(timezone.utc).isoformat()}


def check(name, got, **want):
    global fails
    bad = {k: (got.get(k), v) for k, v in want.items() if got.get(k) != v}
    print(("ok   " if not bad else "FAIL ") + name + ("" if not bad else f"  {bad}"))
    fails += bool(bad)


def ev(emp, logs, now, sched=None):
    return att.evaluate(emp, logs, sched or {}, now, R)


def code(st):
    return (st.get("blocked") or {}).get("code")


st = ev({**DAY, "shift_days": [], "shift_name": "Shift Unassigned"}, [], at(0, 10))
check("unassigned -> no_shift", {"code": code(st), "action": st["action"]}, code="no_shift", action=None)
st = ev(DAY, [], at(0, 8))
check("08:00 too early (opens 08:15)", {"code": code(st), "opens": st["blocked"]["opens"]}, code="too_early", opens="08:15")
st = ev(DAY, [], at(0, 8, 20))
check("08:20 check-in open, not late", st, action="check_in", late_min=0)
st = ev(DAY, [], at(0, 9, 4))
check("09:04 inside grace", st, action="check_in", late_min=0)
st = ev(DAY, [], at(0, 9, 12))
check("09:12 late 12", st, action="check_in", late_min=12)
st = ev(DAY, [], at(0, 18, 5))
check("18:05 shift over", {"code": code(st)}, code="shift_over")
st = ev(DAY, [], at(5, 11))
check("saturday day off, next = monday 09:00",
      {"code": code(st), "next": st["blocked"]["next"]["start_at"][:16]}, code="day_off", next="2026-11-30T09:00")
st = ev(DAY, [log("check_in", at(0, 9, 2))], at(0, 12))
check("open since 09:02 -> check-out, 6h early", st, action="check_out", early_min=360, worked_min=178)
st = ev(DAY, [log("check_in", at(0, 9)), log("check_out", at(0, 12))], at(0, 13))
check("returning after lunch", st, action="check_in", returning=True, late_min=0)
st = ev(DAY, [log("check_in", at(0, 9, 0))], at(0, 9, 1))
check("1 min after check-in -> cooldown", {"cool": bool(st.get("cooldown_s")), "action": st["action"]}, cool=True, action="check_out")
st = ev(DAY, [log("check_in", at(-3, 9))], at(0, 10))
check("open > 10 h counts as closed", st, action="check_in", late_min=60)

st = ev(NIGHT, [], at(1, 1, 0))
check("night: 01:00 belongs to yesterday's 16:00 shift", {"action": st["action"], "day": st["shift"]["date"], "late": st["late_min"]},
      action="check_in", day="2026-11-23", late=540)
st = ev(NIGHT, [log("check_in", at(0, 15, 55))], at(1, 1, 30))
check("night: open since 15:55, 01:30 -> check-out 30 min early", st, action="check_out", early_min=30)
st = ev(NIGHT, [], at(1, 2, 30))
check("night: 02:30 after the shift -> next check-in opens 15:15", {"code": code(st), "opens": st["blocked"]["opens"]},
      code="too_early", opens="15:15")
st = ev(NIGHT, [], at(4, 2, 30))
check("night: friday 02:30 -> opens 15:15 the same day", {"code": code(st)}, code="too_early")
st = ev(NIGHT, [], at(5, 1))
check("night: saturday 01:00 still friday's shift", {"action": st["action"], "day": st["shift"]["date"]}, action="check_in", day="2026-11-27")

week = att.monday(MON.date())
sched = {week: {"monday": {"status": "off"}, "tuesday": {"status": "sick"},
                "wednesday": {"status": "scheduled", "startTime": "10:00", "endTime": "19:00"},
                "saturday": {"status": "scheduled", "startTime": "", "endTime": ""}}}
check("schedule: monday off", {"code": code(ev(DAY, [], at(0, 10), sched))}, code="day_off")
check("schedule: tuesday sick", {"code": code(ev(DAY, [], at(1, 10), sched))}, code="sick")
st = ev(DAY, [], at(2, 9, 20), sched)
check("schedule: wednesday 10:00 custom, 09:20 open", {"action": st["action"], "start": st["shift"]["start"]}, action="check_in", start="10:00")
st = ev(DAY, [], at(5, 9, 30), sched)
check("schedule: extra saturday with default hours", {"action": st["action"], "late": st["late_min"]}, action="check_in", late=30)

err, d = att.check_location(R, "check_in", {"lat": 41.280101, "lng": 69.251403, "accuracy": 15})
check("location: at the office", {"err": err, "d": d}, err=None, d=0)
err, d = att.check_location(R, "check_in", {"lat": 41.2815, "lng": 69.2514, "accuracy": 20})
check("location: 155 m away refused", {"err": err}, err="too_far")
err, d = att.check_location(R, "check_in", {"lat": 41.2811, "lng": 69.2514, "accuracy": 30})
check("location: 111 m with 30 m accuracy allowed", {"err": err}, err=None)
err, d = att.check_location(R, "check_out", {"lat": 41.35, "lng": 69.30, "accuracy": 20})
check("location: check-out from far away allowed", {"err": err}, err=None)
err, d = att.check_location(R, "check_in", {"lat": 41.280101, "lng": 69.251403, "accuracy": 900})
check("location: weak gps refused", {"err": err}, err="weak_gps")
check("location: missing refused", {"err": att.check_location(R, "check_in", None)[0]}, err="no_location")

print(f"\n{'all passed' if not fails else str(fails) + ' FAILED'}")
sys.exit(1 if fails else 0)
