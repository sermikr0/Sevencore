"""Check-in / check-out rules on top of the Sevencore tables (employees, team_schedules, attendance_logs).

The admin and manager portals read the same rows, so everything written here shows up there
unchanged: a check-in is an attendance_logs row with action_type check_in / check_out.

Rules (all decided on the server):
  * an employee needs an assigned shift (manager portal) before the first check-in;
  * the day's plan comes from the weekly schedule (team_schedules: scheduled / off / sick, custom
    hours) and falls back to the employee's default shift and working days;
  * check-in opens EARLY_MIN minutes before the shift start and closes at the shift end; night
    shifts that cross midnight belong to the day they started;
  * late = minutes after the start beyond the grace period, only for the first check-in of a shift;
  * an open check-in older than 10 h counts as closed (the portals auto-close it the same way);
  * two marks less than MIN_GAP minutes apart are refused (double taps).
"""
from __future__ import annotations

import json
import math
import uuid
from dataclasses import dataclass
from datetime import date, datetime, time as dtime, timedelta, timezone
from zoneinfo import ZoneInfo

import httpx

DAYS = ("monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday")
DAY_ALIASES = {**{d: d for d in DAYS}, **{d[:3]: d for d in DAYS},
               "0": "sunday", "7": "sunday", "1": "monday", "2": "tuesday", "3": "wednesday",
               "4": "thursday", "5": "friday", "6": "saturday"}
OPEN_LIMIT = timedelta(hours=10)          # same limit the portals use for the automatic check-out
DEPARTMENTS = ("7CORE", "HOS", "CARGOGPT")


@dataclass
class Rules:
    tz: ZoneInfo
    early_min: int = 45
    late_grace_min: int = 5
    min_gap_min: int = 2
    lat: float = 41.280101
    lng: float = 69.251403
    radius_m: int = 100
    accuracy_allowance_m: int = 40
    max_accuracy_m: int = 300
    checkout_geofence: bool = False


# ------------------------------------------------------------------ helpers

def parse_ts(value: str) -> datetime:
    dt = datetime.fromisoformat(value.replace("Z", "+00:00"))
    return dt if dt.tzinfo else dt.replace(tzinfo=timezone.utc)


def hhmm(value) -> dtime | None:
    try:
        h, m = str(value).strip().split(":")[:2]
        return dtime(int(h), int(m))
    except (ValueError, AttributeError):
        return None


def parse_days(raw) -> set[str]:
    if not raw:
        return set()
    if isinstance(raw, str):
        text = raw.strip()
        try:
            raw = json.loads(text) if text.startswith("[") else text.strip("{}").split(",")
        except ValueError:
            raw = text.strip("[]{}").split(",")
    out = set()
    for item in raw if isinstance(raw, list) else []:
        key = str(item).strip().strip('"').lower()
        if key in DAY_ALIASES:
            out.add(DAY_ALIASES[key])
    return out


def is_assigned(emp: dict) -> bool:
    name = (emp.get("shift_name") or "").lower()
    return bool(parse_days(emp.get("shift_days")) and hhmm(emp.get("shift_start_time"))
                and hhmm(emp.get("shift_end_time")) and "unassigned" not in name)


def monday(d: date) -> date:
    return d - timedelta(days=d.weekday())


def distance_m(lat1: float, lng1: float, lat2: float, lng2: float) -> float:
    r = 6371000.0
    p1, p2 = math.radians(lat1), math.radians(lat2)
    dp, dl = p2 - p1, math.radians(lng2 - lng1)
    a = math.sin(dp / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(dl / 2) ** 2
    return 2 * r * math.asin(math.sqrt(a))


def minutes(delta: timedelta) -> int:
    return int(delta.total_seconds() // 60)


@dataclass
class Plan:
    day: date
    status: str                  # scheduled | off | sick | none (no shift assigned)
    start: datetime | None = None
    end: datetime | None = None
    source: str = "default"      # default | schedule

    def public(self) -> dict:
        return {"date": self.day.isoformat(), "status": self.status, "source": self.source,
                "start": self.start.strftime("%H:%M") if self.start else None,
                "end": self.end.strftime("%H:%M") if self.end else None,
                "start_at": self.start.isoformat() if self.start else None,
                "end_at": self.end.isoformat() if self.end else None,
                "overnight": bool(self.start and self.end and self.end.date() != self.start.date())}


def plan_for(emp: dict, schedules: dict[date, dict], day: date, tz: ZoneInfo) -> Plan:
    """The plan for one calendar day: weekly schedule cell first, then the employee's default shift."""
    default_start, default_end = hhmm(emp.get("shift_start_time")), hhmm(emp.get("shift_end_time"))
    week = schedules.get(monday(day))
    cell = (week or {}).get(DAYS[day.weekday()]) if week else None
    if isinstance(cell, str):
        try:
            cell = json.loads(cell)
        except ValueError:
            cell = None
    if not is_assigned(emp):
        return Plan(day, "none")
    if isinstance(cell, dict) and cell.get("status"):
        status = str(cell["status"]).lower()
        if status in ("off", "day_off", "dayoff"):
            return Plan(day, "off", source="schedule")
        if status in ("sick", "sick_leave"):
            return Plan(day, "sick", source="schedule")
        if status == "scheduled":
            start = hhmm(cell.get("startTime")) or default_start
            end = hhmm(cell.get("endTime")) or default_end
            return _window(day, start, end, tz, "schedule")
    if DAYS[day.weekday()] in parse_days(emp.get("shift_days")):
        return _window(day, default_start, default_end, tz, "default")
    return Plan(day, "off")


def _window(day: date, start: dtime, end: dtime, tz: ZoneInfo, source: str) -> Plan:
    s = datetime.combine(day, start, tzinfo=tz)
    e = datetime.combine(day, end, tzinfo=tz)
    if e <= s:
        e += timedelta(days=1)
    return Plan(day, "scheduled", s, e, source)


# ------------------------------------------------------------------ the state machine

def evaluate(emp: dict, logs: list[dict], schedules: dict[date, dict], now: datetime, rules: Rules) -> dict:
    """What the employee can do right now. `logs` are attendance_logs rows sorted by time (oldest first)."""
    tz = rules.tz
    now = now.astimezone(tz)
    today = now.date()
    plans = {d: plan_for(emp, schedules, d, tz) for d in (today - timedelta(days=1), today, today + timedelta(days=1))}
    marks = [(parse_ts(r["timestamp"]).astimezone(tz), r) for r in logs if r.get("action_type") in ("check_in", "check_out")]
    last_ts, last = marks[-1] if marks else (None, None)
    open_since = last_ts if last and last["action_type"] == "check_in" and now - last_ts < OPEN_LIMIT else None

    def active(p: Plan) -> bool:
        return p.status == "scheduled" and p.start - timedelta(minutes=rules.early_min) <= now < p.end

    current = next((p for p in sorted(plans.values(), key=lambda p: p.start or now) if active(p)), None)
    state: dict = {"now": now.isoformat(), "today": plans[today].public(), "shift": None, "action": None,
                   "blocked": None, "open_since": open_since.isoformat() if open_since else None,
                   "assigned": is_assigned(emp)}
    if last_ts and now - last_ts < timedelta(minutes=rules.min_gap_min):
        wait = int((timedelta(minutes=rules.min_gap_min) - (now - last_ts)).total_seconds()) + 1
        state["cooldown_s"] = wait

    if open_since:
        # the shift this check-in belongs to: the one whose window contains it
        owner = next((p for p in plans.values() if p.status == "scheduled"
                      and p.start - timedelta(minutes=rules.early_min) <= open_since < p.end), None)
        state.update(action="check_out", shift=owner.public() if owner else None,
                     worked_min=minutes(now - open_since))
        if owner and now < owner.end:
            state["early_min"] = minutes(owner.end - now)
        return state

    if not is_assigned(emp):
        state["blocked"] = {"code": "no_shift"}
        return state
    if current:
        first_in = next((ts for ts, r in marks if r["action_type"] == "check_in"
                         and ts >= current.start - timedelta(minutes=rules.early_min)), None)
        late = minutes(now - current.start) if now > current.start + timedelta(minutes=rules.late_grace_min) else 0
        state.update(action="check_in", shift=current.public(), returning=bool(first_in),
                     late_min=0 if first_in else late)
        return state

    plan = plans[today]
    nxt = next_shift(emp, schedules, now, rules)
    if plan.status in ("off", "sick"):
        state["blocked"] = {"code": "day_off" if plan.status == "off" else "sick", "next": nxt}
    elif plan.status == "scheduled" and now < plan.start - timedelta(minutes=rules.early_min):
        opens = plan.start - timedelta(minutes=rules.early_min)
        state["blocked"] = {"code": "too_early", "opens": opens.strftime("%H:%M"), "opens_at": opens.isoformat(),
                            "start": plan.start.strftime("%H:%M")}
        state["shift"] = plan.public()
    else:
        state["blocked"] = {"code": "shift_over", "ended": plan.end.strftime("%H:%M") if plan.end else None, "next": nxt}
        state["shift"] = plan.public() if plan.status == "scheduled" else None
    return state


def next_shift(emp: dict, schedules: dict[date, dict], now: datetime, rules: Rules) -> dict | None:
    for offset in range(0, 8):
        p = plan_for(emp, schedules, now.date() + timedelta(days=offset), rules.tz)
        if p.status == "scheduled" and p.start > now:
            return {"date": p.day.isoformat(), "start": p.start.strftime("%H:%M"), "end": p.end.strftime("%H:%M"),
                    "start_at": p.start.isoformat()}
    return None


def check_location(rules: Rules, action: str, loc: dict | None) -> tuple[str | None, int | None]:
    """(error code or None, distance in metres)."""
    if not loc:
        return "no_location", None
    try:
        lat, lng = float(loc["lat"]), float(loc["lng"])
        acc = float(loc.get("accuracy") or 0)
    except (KeyError, TypeError, ValueError):
        return "no_location", None
    if not (-90 <= lat <= 90 and -180 <= lng <= 180) or (lat == 0 and lng == 0):
        return "no_location", None
    dist = round(distance_m(lat, lng, rules.lat, rules.lng))
    if action == "check_out" and not rules.checkout_geofence:
        return None, dist
    if acc > rules.max_accuracy_m:
        return "weak_gps", dist
    if dist > rules.radius_m + min(acc, rules.accuracy_allowance_m):
        return "too_far", dist
    return None, dist


# ------------------------------------------------------------------ summaries for the Mini App

def day_summary(marks: list[tuple[datetime, dict]], now: datetime) -> dict:
    first_in = next((ts for ts, r in marks if r["action_type"] == "check_in"), None)
    last_out = next((ts for ts, r in reversed(marks) if r["action_type"] == "check_out"), None)
    worked, since = 0, None
    for ts, r in marks:
        if r["action_type"] == "check_in":
            since = ts
        elif since is not None:
            worked += minutes(min(ts - since, OPEN_LIMIT))
            since = None
    if since is not None and now - since < OPEN_LIMIT:
        worked += minutes(now - since)
    return {"first_in": first_in.strftime("%H:%M") if first_in else None,
            "last_out": last_out.strftime("%H:%M") if last_out else None, "worked_min": worked}


def summaries(emp: dict, logs: list[dict], schedules: dict[date, dict], now: datetime, rules: Rules) -> dict:
    tz = rules.tz
    now = now.astimezone(tz)
    marks = [(parse_ts(r["timestamp"]).astimezone(tz), r) for r in logs if r.get("action_type") in ("check_in", "check_out")]
    by_day: dict[date, list] = {}
    for ts, r in marks:
        by_day.setdefault(ts.date(), []).append((ts, r))
    week = []
    start = monday(now.date())
    try:
        joined = parse_ts(emp["created_at"]).astimezone(tz).date() if emp.get("created_at") else None
    except ValueError:
        joined = None
    for i in range(7):
        d = start + timedelta(days=i)
        plan = plan_for(emp, schedules, d, tz)
        day_marks = by_day.get(d, [])
        info = day_summary(day_marks, now)
        if not day_marks and joined and d < joined:
            status = "none"                      # before the employee registered
        elif day_marks:
            status = "present"
            first = next((ts for ts, r in day_marks if r["action_type"] == "check_in"), None)
            if plan.status == "scheduled" and first and first > plan.start + timedelta(minutes=rules.late_grace_min):
                status = "late"
        elif d > now.date():
            status = {"scheduled": "planned", "off": "off", "sick": "sick"}.get(plan.status, "none")
        elif d == now.date():
            status = "today" if plan.status == "scheduled" else plan.status
        else:
            status = {"scheduled": "absent", "off": "off", "sick": "sick"}.get(plan.status, "none")
        week.append({"date": d.isoformat(), "day": DAYS[i][:3], "status": status, "plan": plan.public(), **info})
    today_marks = by_day.get(now.date(), [])
    # a night shift that started yesterday and is still open belongs to "today" for the person
    if marks and marks[-1][1]["action_type"] == "check_in" and marks[-1][0].date() < now.date() \
            and now - marks[-1][0] < OPEN_LIMIT:
        today_marks = [marks[-1]] + today_marks
    history = [{"action": r["action_type"], "at": ts.isoformat(), "date": ts.strftime("%Y-%m-%d"),
                "time": ts.strftime("%H:%M"), "note": r.get("note") or "", "auto": str(r.get("id", "")).startswith("auto-out")}
               for ts, r in reversed(marks[-30:])]
    return {"week": week, "day": day_summary(today_marks, now), "history": history[:20]}


def span(minutes_: int) -> str:
    h, m = divmod(int(minutes_), 60)
    return f"{h} h {m} min" if h and m else f"{h} h" if h else f"{m} min"


def compose_note(action: str, state: dict, live: float | None) -> str:
    parts = ["Face ID verified" + (" + liveness" if live else "")]
    if action == "check_in":
        if state.get("returning"):
            parts.append("returned")
        elif state.get("late_min"):
            parts.append(f"late {span(state['late_min'])}")
        else:
            parts.append("on time")
    elif state.get("early_min"):
        parts.append(f"left {span(state['early_min'])} early")
    return " · ".join(parts)


# ------------------------------------------------------------------ database (PostgREST)

class Store:
    def __init__(self, base: str):
        self.base = base.rstrip("/")
        self.client: httpx.AsyncClient | None = None

    async def _get(self, table: str, params: dict) -> list[dict]:
        r = await self.client.get(f"{self.base}/{table}", params=params)
        r.raise_for_status()
        return r.json()

    async def employee(self, tg: int) -> dict | None:
        rows = await self._get("employees", {"telegram_id": f"eq.{tg}", "select": "*"})
        return rows[0] if rows else None

    async def upsert_employee(self, row: dict) -> dict:
        r = await self.client.post(f"{self.base}/employees", params={"on_conflict": "telegram_id"}, json=row,
                                   headers={"Prefer": "resolution=merge-duplicates,return=representation"})
        r.raise_for_status()
        return r.json()[0]

    async def face(self, tg: int) -> dict | None:
        rows = await self._get("face_profiles", {"telegram_id": f"eq.{tg}", "select": "*"})
        return rows[0] if rows else None

    async def faces(self) -> list[dict]:
        return await self._get("face_profiles", {"select": "telegram_id,embedding"})

    async def save_face(self, tg: int, embedding: str, photo: str | None) -> None:
        now = datetime.now(timezone.utc).isoformat()
        r = await self.client.post(f"{self.base}/face_profiles", params={"on_conflict": "telegram_id"},
                                   json={"telegram_id": tg, "embedding": embedding, "photo": photo, "enrolled_at": now,
                                         "updated_at": now, "checks": 0, "last_score": None, "last_used_at": None},
                                   headers={"Prefer": "resolution=merge-duplicates,return=minimal"})
        r.raise_for_status()

    async def face_used(self, tg: int, score: float | None, checks: int) -> None:
        r = await self.client.patch(f"{self.base}/face_profiles", params={"telegram_id": f"eq.{tg}"},
                                    json={"last_score": score, "checks": checks,
                                          "last_used_at": datetime.now(timezone.utc).isoformat()},
                                    headers={"Prefer": "return=minimal"})
        r.raise_for_status()

    async def logs(self, tg: int, since: datetime) -> list[dict]:
        return await self._get("attendance_logs", {
            "telegram_id": f"eq.{tg}", "timestamp": f"gte.{since.astimezone(timezone.utc).isoformat()}",
            "order": "timestamp.asc", "select": "id,action_type,timestamp,note,distance_meters"})

    async def schedules(self, tg: int, weeks: list[date]) -> dict[date, dict]:
        rows = await self._get("team_schedules", {
            "telegram_id": f"eq.{tg}", "week_start_date": f"in.({','.join(w.isoformat() for w in weeks)})",
            "order": "updated_at.desc", "select": "*"})
        out: dict[date, dict] = {}
        for row in rows:                                   # newest row per week wins
            week = date.fromisoformat(row["week_start_date"])
            out.setdefault(week, row)
        return out

    async def add_log(self, row: dict) -> dict:
        r = await self.client.post(f"{self.base}/attendance_logs", json=row, headers={"Prefer": "return=representation"})
        r.raise_for_status()
        return r.json()[0]

    async def context(self, tg: int, emp: dict, now: datetime, days_back: int = 14) -> tuple[list[dict], dict[date, dict]]:
        logs = await self.logs(tg, now - timedelta(days=days_back))
        weeks = sorted({monday(now.date() + timedelta(days=o)) for o in (-7, -1, 0, 1, 7)})
        return logs, await self.schedules(tg, weeks)


def new_log(tg: int, action: str, at: datetime, note: str, photo: str | None, loc: dict | None, dist: int | None) -> dict:
    return {"id": str(uuid.uuid4()), "telegram_id": tg, "action_type": action,
            "timestamp": at.astimezone(timezone.utc).isoformat().replace("+00:00", "Z"), "note": note, "admin_note": None,
            "photo_url": photo, "latitude": float(loc["lat"]) if loc else None,
            "longitude": float(loc["lng"]) if loc else None, "distance_meters": dist}
