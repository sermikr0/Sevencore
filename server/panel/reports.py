"""Attendance figures for the panel: sessions, day statuses and period metrics.

Uses the same rules as the Telegram Mini App (server/tma/attendance.py), so the panel, the reports and
what the employee sees always agree:
  * a check-in belongs to the shift whose check-in window contains it (owner_plan);
  * late = after the start + LATE_GRACE_MIN; the late minutes count from the start;
  * a session is a check-in and the next check-out of the same employee; the server's automatic
    check-out (auto-out-<id>, written at the shift end) closes it like any other check-out;
  * a scheduled day without a check-in is "absent" once the check-in window has closed;
  * days before the employee registered are "none" and never count as absent.
"""
from __future__ import annotations

from collections import defaultdict
from dataclasses import dataclass, field
from datetime import date, datetime, timedelta

from tma import attendance as att

WORK_DAY_STATUSES = ("present", "late")
OPEN_LIMIT = timedelta(hours=10)


@dataclass
class Session:
    telegram_id: int
    start: datetime
    in_id: str
    day: date
    plan: att.Plan | None
    late_min: int = 0
    end: datetime | None = None
    out_id: str | None = None
    auto: bool = False
    ongoing: bool = False

    def minutes(self, now: datetime) -> int:
        if self.end:
            return max(0, att.minutes(self.end - self.start))
        if self.ongoing:
            return max(0, att.minutes(now - self.start))
        return 0

    @property
    def missing_out(self) -> bool:
        return self.end is None and not self.ongoing


@dataclass
class EmployeeData:
    emp: dict
    marks: list[dict] = field(default_factory=list)          # sorted by time
    schedules: dict[date, dict] = field(default_factory=dict)  # week monday -> team_schedules row


def joined_on(emp: dict, rules: att.Rules) -> date | None:
    try:
        return att.parse_ts(emp["created_at"]).astimezone(rules.tz).date() if emp.get("created_at") else None
    except (ValueError, TypeError):
        return None


def build_sessions(ed: EmployeeData, rules: att.Rules, now: datetime) -> list[Session]:
    tz = rules.tz
    grace = timedelta(minutes=rules.late_grace_min)
    window = timedelta(minutes=rules.checkout_window_min)
    out: list[Session] = []
    cur: Session | None = None
    for m in ed.marks:
        ts = att.parse_ts(m["timestamp"]).astimezone(tz)
        if m.get("action_type") == "check_in":
            if cur:
                out.append(cur)
            plan = att.owner_plan(ed.emp, ed.schedules, ts, rules)
            late = att.minutes(ts - plan.start) if plan and ts > plan.start + grace else 0
            cur = Session(int(m["telegram_id"]), ts, str(m["id"]), plan.day if plan else ts.date(), plan, late)
        elif m.get("action_type") == "check_out" and cur:
            cur.end, cur.out_id = ts, str(m["id"])
            cur.auto = str(m["id"]).startswith("auto-out")
            out.append(cur)
            cur = None
    if cur:
        if cur.plan:
            cur.ongoing = now < cur.plan.end + window
        else:
            cur.ongoing = now - cur.start < OPEN_LIMIT
        out.append(cur)
    return out


def day_info(ed: EmployeeData, day: date, sessions: list[Session], rules: att.Rules, now: datetime) -> dict:
    """One employee, one day: status + times. Status: present | late | absent | pending | planned | off | sick |
    vacation | none."""
    plan = att.plan_for(ed.emp, ed.schedules, day, rules.tz)
    joined = joined_on(ed.emp, rules)
    info = {"date": day.isoformat(), "plan": plan.status,
            "start": plan.start.strftime("%H:%M") if plan.start else None,
            "end": plan.end.strftime("%H:%M") if plan.end else None}
    if sessions:
        first = min(sessions, key=lambda s: s.start)
        last_out = max((s.end for s in sessions if s.end), default=None)
        info.update(status="late" if first.late_min else "present", late_min=first.late_min,
                    first_in=first.start.strftime("%H:%M"), last_out=last_out.strftime("%H:%M") if last_out else None,
                    worked_min=sum(s.minutes(now) for s in sessions), ongoing=any(s.ongoing for s in sessions),
                    auto_out=any(s.auto for s in sessions), missing_out=any(s.missing_out for s in sessions),
                    extra=plan.status != "scheduled")
        return info
    if joined and day < joined:
        info["status"] = "none"
        return info
    if plan.status == "scheduled":
        closes = plan.end if rules.late_max_min < 0 else min(plan.end, plan.start + timedelta(minutes=rules.late_max_min))
        if now >= closes:
            info["status"] = "absent"
        elif day <= now.date() or now >= plan.start - timedelta(minutes=rules.early_min):
            info["status"] = "pending"
        else:
            info["status"] = "planned"
        return info
    info["status"] = plan.status if plan.status in ("off", "sick", "vacation") else "none"
    return info


def period(ed: EmployeeData, days: list[date], rules: att.Rules, now: datetime) -> dict:
    """Day list + totals for one employee over the given days."""
    sessions = build_sessions(ed, rules, now)
    by_day: dict[date, list[Session]] = defaultdict(list)
    for s in sessions:
        by_day[s.day].append(s)
    rows = [day_info(ed, d, by_day.get(d, []), rules, now) for d in days]
    present = [r for r in rows if r["status"] in WORK_DAY_STATUSES]
    count = defaultdict(int)
    for r in rows:
        count[r["status"]] += 1
    ins = [int(r["first_in"][:2]) * 60 + int(r["first_in"][3:]) for r in present if r.get("first_in")]
    worked = sum(r.get("worked_min", 0) for r in present)
    decided = count["present"] + count["late"] + count["absent"]
    in_period = [s for s in sessions if days and days[0] <= s.day <= days[-1]]
    totals = {
        "work_days": count["present"] + count["late"], "on_time": count["present"], "late": count["late"],
        "absent": count["absent"], "off": count["off"], "sick": count["sick"], "vacation": count["vacation"],
        "planned": count["planned"] + count["pending"],
        "worked_min": worked, "late_min": sum(r.get("late_min", 0) for r in present),
        "avg_in": f"{sum(ins) // len(ins) // 60:02d}:{sum(ins) // len(ins) % 60:02d}" if ins else None,
        "avg_day_min": worked // len(present) if present else 0,
        "rate": round((count["present"] + count["late"]) / decided, 3) if decided else None,
        "auto_out": sum(1 for s in in_period if s.auto), "missing_out": sum(1 for s in in_period if s.missing_out),
    }
    return {"days": rows, "totals": totals, "sessions": sessions}


def durations(marks: list[dict]) -> dict[str, int]:
    """Check-out id -> minutes since the same employee's previous check-in (marks sorted by time)."""
    last_in: dict[int, datetime] = {}
    out: dict[str, int] = {}
    for m in marks:
        tg, ts = int(m["telegram_id"]), att.parse_ts(m["timestamp"])
        if m.get("action_type") == "check_in":
            last_in[tg] = ts
        elif m.get("action_type") == "check_out" and tg in last_in:
            out[str(m["id"])] = max(0, att.minutes(ts - last_in.pop(tg)))
    return out


def month_days(year: int, month: int) -> list[date]:
    d = date(year, month, 1)
    out = []
    while d.month == month:
        out.append(d)
        d += timedelta(days=1)
    return out


def weeks_for(days: list[date]) -> list[date]:
    """Every week monday a plan in these days (and the evening before) can come from."""
    if not days:
        return []
    first, last = att.monday(days[0] - timedelta(days=1)), att.monday(days[-1] + timedelta(days=1))
    out, w = [], first
    while w <= last:
        out.append(w)
        w += timedelta(days=7)
    return out


def group_schedules(rows: list[dict]) -> dict[int, dict[date, dict]]:
    """team_schedules rows -> telegram_id -> week monday -> newest row."""
    out: dict[int, dict[date, dict]] = defaultdict(dict)
    for r in rows:      # newest first
        try:
            week = date.fromisoformat(str(r["week_start_date"])[:10])
            tg = int(r["telegram_id"])
        except (KeyError, TypeError, ValueError):
            continue
        out[tg].setdefault(week, r)
    return out
