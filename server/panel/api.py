"""JSON API of the Sevencore panel (/api/panel/*), for admins and managers.

Who can do what (checked here, on the server):
  Super Admin  everything, including accounts and the employee passkey (accounts.py, /auth/*)
  Admin        everything about employees, marks, schedules and reports
  Manager      only employees of their department or assigned to them: view, correct marks,
               force a check-out, set shifts and shift groups, edit the schedule from today on, reports

Shift groups (Day Shift, Night Shift, ...) are a label on the employee (employees.shift_group); the list is
kept in system_settings['shift_groups'] and only admins change it. Schedule, team, journal and reports can be
split or filtered by group; group=none means "no group yet".

Every change is pushed to open panels (/api/panel/events, server-sent events) and, through the bot, to
the employee it concerns.
"""
from __future__ import annotations

import asyncio
import csv
import html
import io
import json
import logging
import re
import uuid
from datetime import date, datetime, time, timedelta

from starlette.requests import Request
from starlette.responses import JSONResponse, Response, StreamingResponse
from starlette.routing import Route

from tma import attendance as att
from tma import texts

from . import reports as rp
from . import xlsx
from .data import Data, DataError, decode_data_url, utc

log = logging.getLogger("sevencore.panel")
DEPARTMENTS = ("7CORE", "HOS", "CARGOGPT")
STATUSES = ("scheduled", "off", "sick", "vacation", "default")
HHMM = re.compile(r"^([01]\d|2[0-3]):[0-5]\d$")
MAX_RANGE_DAYS = 62
DEFAULT_GROUPS = ("Day Shift", "Night Shift", "Amazon Shift")
GROUP_NAME = re.compile(r"^[\w][\w &/.+()'-]{0,39}$")
NO_GROUP = "none"
MAX_GROUPS = 20


class ApiError(Exception):
    def __init__(self, code: str, status: int = 400, **extra):
        super().__init__(code)
        self.code, self.status, self.extra = code, status, extra


class Broker:
    """Server-sent events to every open panel: {"table", "type", "telegram_id"} - the panel refetches."""

    def __init__(self):
        self.queues: set[asyncio.Queue] = set()

    async def announce(self, table: str, event_type: str, record: dict | None) -> None:
        event = {"table": table, "type": event_type, "telegram_id": (record or {}).get("telegram_id")}
        for q in list(self.queues):
            if q.qsize() < 50:
                q.put_nowait(event)


def name_of(emp: dict | None) -> str:
    if not emp:
        return "—"
    return " ".join(p for p in (emp.get("first_name"), emp.get("last_name")) if p) or str(emp.get("telegram_id"))


def shift_label(emp: dict) -> str | None:
    if not att.is_assigned(emp):
        return None
    return f"{att.hhmm(emp['shift_start_time']).strftime('%H:%M')}–{att.hhmm(emp['shift_end_time']).strftime('%H:%M')}"


class Panel:
    def __init__(self, data: Data, accounts, miniapp, broker: Broker):
        self.data, self.accounts, self.miniapp, self.broker = data, accounts, miniapp, broker
        self.rules: att.Rules = miniapp.rules
        self._groups: list[str] | None = None
        P = "/api/panel"
        self.routes = [
            Route(f"{P}/me", self.ep(self.me)),
            Route(f"{P}/overview", self.ep(self.overview)),
            Route(f"{P}/marks", self.ep(self.marks), methods=["GET"]),
            Route(f"{P}/marks", self.ep(self.mark_add), methods=["POST"]),
            Route(f"{P}/marks.csv", self.marks_csv),
            Route(f"{P}/marks/{{id}}", self.ep(self.mark_edit), methods=["PATCH"]),
            Route(f"{P}/marks/{{id}}", self.ep(self.mark_delete), methods=["DELETE"]),
            Route(f"{P}/marks/{{id}}/photo", self.mark_photo),
            Route(f"{P}/employees", self.ep(self.employees)),
            Route(f"{P}/employees/{{tg:int}}", self.ep(self.employee), methods=["GET"]),
            Route(f"{P}/employees/{{tg:int}}", self.ep(self.employee_edit), methods=["PATCH"]),
            Route(f"{P}/employees/{{tg:int}}", self.ep(self.employee_delete), methods=["DELETE"]),
            Route(f"{P}/employees/{{tg:int}}/face", self.ep(self.face_reset), methods=["DELETE"]),
            Route(f"{P}/employees/{{tg:int}}/checkout", self.ep(self.force_checkout), methods=["POST"]),
            Route(f"{P}/employees/{{tg:int}}/photo", self.employee_photo),
            Route(f"{P}/schedule", self.ep(self.schedule)),
            Route(f"{P}/schedule/{{tg:int}}/{{day}}", self.ep(self.schedule_set), methods=["PUT"]),
            Route(f"{P}/reports", self.ep(self.report)),
            Route(f"{P}/reports.xlsx", self.report_xlsx),
            Route(f"{P}/settings", self.ep(self.settings)),
            Route(f"{P}/groups", self.ep(self.groups_set), methods=["PUT"]),
            Route(f"{P}/events", self.events),
        ]

    # ------------------------------------------------------------ plumbing

    async def user(self, request: Request) -> dict:
        from accounts import COOKIE      # server/accounts.py
        try:
            user = await self.accounts.current(request.cookies.get(COOKIE))
        except Exception:
            user = None
        if not user:
            raise ApiError("signed_out", 401)
        if request.method not in ("GET", "HEAD") and request.headers.get("x-requested-with") != "sevencore":
            raise ApiError("bad_request", 403)
        return user

    def ep(self, fn):
        async def handler(request: Request) -> Response:
            try:
                user = await self.user(request)
                result = await fn(request, user)
                return result if isinstance(result, Response) else JSONResponse(result)
            except ApiError as exc:
                return JSONResponse({"ok": False, "error": exc.code, **exc.extra}, status_code=exc.status)
            except DataError as exc:
                log.error("panel data error: %s", exc)
                return JSONResponse({"ok": False, "error": "database"}, status_code=503)
            except Exception:
                log.exception("panel error on %s", request.url.path)
                return JSONResponse({"ok": False, "error": "server_error"}, status_code=500)
        return handler

    @staticmethod
    async def body(request: Request) -> dict:
        try:
            data = await request.json()
        except ValueError:
            raise ApiError("bad_json") from None
        if not isinstance(data, dict):
            raise ApiError("bad_json")
        return data

    def now(self) -> datetime:
        return datetime.now(self.rules.tz)

    @staticmethod
    def is_admin(user: dict) -> bool:
        return user["kind"] == "admin"

    def perms(self, user: dict) -> dict:
        admin, sup = self.is_admin(user), user.get("role") == "Super Admin"
        return {"marks": True, "shift": True, "schedule_past": admin, "employee_edit": admin, "employee_delete": admin,
                "face_reset": admin, "assign": admin, "accounts": sup, "passkey": sup, "all_departments": admin,
                "groups": admin}

    def in_scope(self, user: dict, emp: dict) -> bool:
        if self.is_admin(user):
            return True
        return emp.get("department") == user.get("department") or int(emp["telegram_id"]) in set(user.get("assigned_employee_ids") or [])

    async def groups(self) -> list[str]:
        """The shift groups, in display order (cached; only groups_set changes them)."""
        if self._groups is None:
            raw = await self.data.setting("shift_groups")
            try:
                names = [str(x) for x in json.loads(raw)] if raw else list(DEFAULT_GROUPS)
            except ValueError:
                names = list(DEFAULT_GROUPS)
            self._groups = names
        return list(self._groups)

    def group_of(self, emp: dict) -> str | None:
        g = emp.get("shift_group")
        return g if g and self._groups is not None and g in self._groups else None

    async def scoped(self, user: dict, dept: str | None = None, q: str | None = None,
                     group: str | None = None) -> list[dict]:
        await self.groups()
        emps = [e for e in await self.data.employees() if self.in_scope(user, e)]
        if dept and dept in DEPARTMENTS:
            emps = [e for e in emps if e.get("department") == dept]
        if group == NO_GROUP:
            emps = [e for e in emps if not self.group_of(e)]
        elif group:
            emps = [e for e in emps if self.group_of(e) == group]
        if q:
            ql = q.strip().lower().lstrip("@")
            emps = [e for e in emps if ql in name_of(e).lower() or ql in (e.get("username") or "").lower()
                    or ql in str(e["telegram_id"])]
        return emps

    async def need_employee(self, user: dict, tg: int) -> dict:
        await self.groups()
        emp = await self.data.employee(tg)
        if not emp or not self.in_scope(user, emp):
            raise ApiError("not_found", 404)
        return emp

    @staticmethod
    def parse_day(value: str | None, default: date) -> date:
        if not value:
            return default
        try:
            return date.fromisoformat(value[:10])
        except ValueError:
            raise ApiError("bad_date") from None

    def parse_local(self, value) -> datetime:
        try:
            dt = datetime.fromisoformat(str(value).replace("Z", "+00:00"))
        except ValueError:
            raise ApiError("bad_time") from None
        return dt.replace(tzinfo=self.rules.tz) if dt.tzinfo is None else dt.astimezone(self.rules.tz)

    async def load(self, emps: list[dict], first: date, last: date) -> dict[int, rp.EmployeeData]:
        """Marks + weekly schedules for these employees, covering first..last (and the nights around them)."""
        tz = self.rules.tz
        tgs = [int(e["telegram_id"]) for e in emps]
        days = [first + timedelta(days=i) for i in range((last - first).days + 1)]
        logs = await self.data.logs(datetime.combine(first - timedelta(days=1), time(), tz),
                                    datetime.combine(last + timedelta(days=2), time(), tz), tgs)
        sched = rp.group_schedules(await self.data.schedule_rows(rp.weeks_for(days), tgs))
        out = {int(e["telegram_id"]): rp.EmployeeData(e, [], sched.get(int(e["telegram_id"]), {})) for e in emps}
        for m in logs:
            ed = out.get(int(m["telegram_id"]))
            if ed:
                ed.marks.append(m)
        return out

    def emp_brief(self, emp: dict) -> dict:
        return {"telegram_id": emp["telegram_id"], "name": name_of(emp), "username": emp.get("username"),
                "department": emp.get("department"), "shift": shift_label(emp), "group": self.group_of(emp)}

    async def tell(self, tg: int, key: str, user: dict, **kw) -> None:
        """A bot message to the employee (best effort, in their language)."""
        bot = self.miniapp.bot
        if not (bot and bot.state == "polling"):
            return
        lang = texts.pick(self.miniapp.langs.get(tg))
        kw["who"] = texts.t(lang, "who_manager" if user["kind"] == "manager" else "who_admin")
        await bot.notify(tg, texts.t(lang, key, **kw), lang)

    def changed(self, user: dict, table: str, method: str, before: list[dict], body) -> None:
        asyncio.create_task(self.miniapp.panel_changed(user["kind"], table, method, before, body))

    # ------------------------------------------------------------ me / settings

    async def me(self, request: Request, user: dict) -> dict:
        r = self.rules
        return {"ok": True, "user": user, "perms": self.perms(user), "departments": list(DEPARTMENTS),
                "groups": await self.groups(), "server_time": self.now().isoformat(), "tz": r.tz.key,
                "rules": {"early_min": r.early_min, "late_max_min": r.late_max_min, "late_grace_min": r.late_grace_min,
                          "checkout_window_min": r.checkout_window_min, "radius_m": r.radius_m}}

    async def settings(self, request: Request, user: dict) -> dict:
        if not self.is_admin(user):
            raise ApiError("forbidden", 403)
        r, bot = self.rules, self.miniapp.bot
        out = {"ok": True,
               "rules": {"early_min": r.early_min, "late_max_min": r.late_max_min, "late_grace_min": r.late_grace_min,
                         "checkout_early_min": r.checkout_early_min, "checkout_window_min": r.checkout_window_min,
                         "min_gap_min": r.min_gap_min, "radius_m": r.radius_m, "checkout_geofence": r.checkout_geofence,
                         "gps_allowance_m": r.accuracy_allowance_m, "office": {"lat": r.lat, "lng": r.lng},
                         "liveness": self.miniapp.policy.liveness, "face_threshold": self.miniapp.policy.threshold},
               "bot": {"state": bot.state if bot else "no_token", "username": bot.username if bot else None,
                       "app_url": (bot.app_url + "/") if bot and bot.app_url else None},
               "managers": await self.data.managers(), "passkey_required": self.miniapp.require_passkey,
               "groups": await self.group_counts()}
        if user.get("role") == "Super Admin":
            out["passkey"] = await self.accounts.passkey()
        return out

    # ------------------------------------------------------------ overview

    async def overview(self, request: Request, user: dict) -> dict:
        now = self.now()
        today = now.date()
        first = today - timedelta(days=6)
        days = [first + timedelta(days=i) for i in range(7)]
        qp = request.query_params
        emps = await self.scoped(user, qp.get("dept"), None, qp.get("group"))
        eds = await self.load(emps, first, today)
        on_duty, today_rows, bars = [], [], {d: {"present": 0, "late": 0, "absent": 0} for d in days}
        late_by_in: dict[str, int] = {}
        auto_out = 0
        lanes: list[dict] = []
        for tg, ed in eds.items():
            p = rp.period(ed, days, self.rules, now)
            for s in p["sessions"]:
                late_by_in[s.in_id] = s.late_min
                if s.ongoing:
                    on_duty.append({**self.emp_brief(ed.emp), "since": s.start.isoformat(), "late_min": s.late_min,
                                    "ends": s.plan.end.isoformat() if s.plan else None})
            for d in p["days"]:
                b = bars.get(date.fromisoformat(d["date"]))
                if b is not None and d["status"] in b:
                    b[d["status"]] += 1
            auto_out += p["totals"]["auto_out"]
            today_rows.append({**self.emp_brief(ed.emp), **p["days"][-1]})
            # one lane per person for today's shift timeline: the plan and what really happened
            plan = att.plan_for(ed.emp, ed.schedules, today, self.rules.tz)
            mine = [x for x in p["sessions"] if x.day == today or x.ongoing]
            if plan.status == "scheduled" or mine:
                shown = plan if plan.status == "scheduled" else next((x.plan for x in mine if x.plan), None)
                lanes.append({**self.emp_brief(ed.emp), "status": p["days"][-1]["status"],
                              "plan": {"start": shown.start.isoformat(), "end": shown.end.isoformat()} if shown else None,
                              "sessions": [{"start": x.start.isoformat(), "end": x.end.isoformat() if x.end else None,
                                            "ongoing": x.ongoing, "late_min": x.late_min, "auto": x.auto} for x in mine]})
        count = {k: sum(1 for r in today_rows if r["status"] == k)
                 for k in ("present", "late", "absent", "pending", "planned", "off", "sick", "vacation")}
        feed = []
        for tg, ed in eds.items():
            for m in ed.marks:
                ts = att.parse_ts(m["timestamp"]).astimezone(self.rules.tz)
                if ts.date() == today:
                    feed.append({**self.emp_brief(ed.emp), "id": m["id"], "action": m["action_type"], "at": ts.isoformat(),
                                 "distance_m": m.get("distance_meters"), "late_min": late_by_in.get(str(m["id"]), 0),
                                 "auto": str(m["id"]).startswith("auto-out"), "manual": bool(m.get("admin_note"))})
        feed.sort(key=lambda f: f["at"], reverse=True)
        on_duty.sort(key=lambda x: x["since"])
        waiting = sorted([r for r in today_rows if r["status"] in ("absent", "pending")],
                         key=lambda r: (r["status"] != "absent", r.get("start") or ""))
        return {"ok": True, "now": now.isoformat(), "employees": len(emps),
                "kpi": {"on_duty": len(on_duty), "arrived": count["present"] + count["late"], "late": count["late"],
                        "absent": count["absent"], "expected": count["pending"] + count["planned"],
                        "away": count["off"] + count["sick"] + count["vacation"], "auto_out_7d": auto_out},
                "on_duty": on_duty, "feed": feed[:40], "waiting": waiting,
                "lanes": sorted(lanes, key=lambda x: (x["plan"] or {}).get("start") or ""),
                "week": [{"date": d.isoformat(), **bars[d]} for d in days]}

    # ------------------------------------------------------------ marks

    async def mark_rows(self, request: Request, user: dict) -> tuple[list[dict], date, date]:
        qp = request.query_params
        today = self.now().date()
        first, last = self.parse_day(qp.get("from"), today), self.parse_day(qp.get("to"), today)
        if last < first:
            first, last = last, first
        if (last - first).days > MAX_RANGE_DAYS:
            raise ApiError("range_too_long", max_days=MAX_RANGE_DAYS)
        emps = await self.scoped(user, qp.get("dept"), qp.get("q"), qp.get("group"))
        if qp.get("tg", "").isdigit():
            emps = [e for e in emps if int(e["telegram_id"]) == int(qp["tg"])]
        eds = await self.load(emps, first, last)
        action = qp.get("action")
        rows = []
        for tg, ed in eds.items():
            sessions = rp.build_sessions(ed, self.rules, self.now())
            by_in = {s.in_id: s for s in sessions}
            by_out = {s.out_id: s for s in sessions if s.out_id}
            brief = self.emp_brief(ed.emp)
            for m in ed.marks:
                ts = att.parse_ts(m["timestamp"]).astimezone(self.rules.tz)
                if not first <= ts.date() <= last or (action in ("check_in", "check_out") and m["action_type"] != action):
                    continue
                s_in, s_out = by_in.get(str(m["id"])), by_out.get(str(m["id"]))
                rows.append({**brief, "id": m["id"], "action": m["action_type"], "at": ts.isoformat(),
                             "note": m.get("note"), "admin_note": m.get("admin_note"),
                             "distance_m": m.get("distance_meters"),
                             "late_min": s_in.late_min if s_in else 0,
                             "duration_min": s_out.minutes(self.now()) if s_out else None,
                             "auto": str(m["id"]).startswith("auto-out"),
                             "face": bool(m.get("note") and "Face ID" in m["note"])})
        rows.sort(key=lambda r: r["at"], reverse=True)
        return rows, first, last

    async def marks(self, request: Request, user: dict) -> dict:
        rows, first, last = await self.mark_rows(request, user)
        return {"ok": True, "from": first.isoformat(), "to": last.isoformat(), "rows": rows[:1500],
                "total": len(rows), "check_ins": sum(1 for r in rows if r["action"] == "check_in"),
                "late": sum(1 for r in rows if r["late_min"]), "manual": sum(1 for r in rows if r["admin_note"])}

    async def marks_csv(self, request: Request) -> Response:
        try:
            user = await self.user(request)
            rows, first, last = await self.mark_rows(request, user)
        except ApiError as exc:
            return JSONResponse({"ok": False, "error": exc.code}, status_code=exc.status)
        buf = io.StringIO()
        w = csv.writer(buf)
        w.writerow(["date", "time", "employee", "telegram_id", "department", "group", "action", "late_min", "duration_min",
                    "distance_m", "note", "admin_note"])
        for r in reversed(rows):
            at = datetime.fromisoformat(r["at"])
            w.writerow([at.strftime("%Y-%m-%d"), at.strftime("%H:%M:%S"), r["name"], r["telegram_id"], r["department"] or "",
                        r["group"] or "", r["action"], r["late_min"] or "", r["duration_min"] if r["duration_min"] is not None else "",
                        r["distance_m"] if r["distance_m"] is not None else "", r["note"] or "", r["admin_note"] or ""])
        name = f"sevencore_marks_{first.isoformat()}_{last.isoformat()}.csv"
        return Response("﻿" + buf.getvalue(), media_type="text/csv; charset=utf-8",
                        headers={"Content-Disposition": f'attachment; filename="{name}"', "Cache-Control": "no-store"})

    def validate_mark(self, data: dict, partial: bool) -> dict:
        out: dict = {}
        if not partial or "action" in data:
            if data.get("action") not in ("check_in", "check_out"):
                raise ApiError("bad_action")
            out["action_type"] = data["action"]
        if not partial or "at" in data:
            at = self.parse_local(data.get("at"))
            if at > self.now() + timedelta(minutes=5):
                raise ApiError("future_time")
            out["timestamp"] = utc(at)
        if "note" in data:
            note = " ".join(str(data.get("note") or "").split())[:200]
            out["admin_note"] = note or None
        return out

    async def mark_add(self, request: Request, user: dict) -> dict:
        data = await self.body(request)
        try:
            tg = int(data.get("telegram_id"))
        except (TypeError, ValueError):
            raise ApiError("bad_employee") from None
        await self.need_employee(user, tg)
        fields = self.validate_mark(data, partial=False)
        note = fields.get("admin_note") or "Qo'lda kiritildi"
        row = {"id": str(uuid.uuid4()), "telegram_id": tg, **fields,
               "admin_note": f"{note} · {user['username']}", "note": None, "distance_meters": None}
        saved = await self.data.add_log(row)
        await self.broker.announce("attendance_logs", "INSERT", saved)
        self.changed(user, "attendance_logs", "POST", [], saved)
        return {"ok": True, "mark": saved}

    async def own_mark(self, user: dict, mark_id: str) -> dict:
        m = await self.data.log(mark_id)
        if not m:
            raise ApiError("not_found", 404)
        await self.need_employee(user, int(m["telegram_id"]))
        return m

    async def mark_edit(self, request: Request, user: dict) -> dict:
        before = await self.own_mark(user, request.path_params["id"])
        data = await self.body(request)
        patch = self.validate_mark(data, partial=True)
        if "admin_note" in patch:
            patch["admin_note"] = f"{patch['admin_note']} · {user['username']}" if patch["admin_note"] else None
        if not patch:
            raise ApiError("nothing_to_change")
        saved = await self.data.update_log(before["id"], patch)
        await self.broker.announce("attendance_logs", "UPDATE", saved)
        self.changed(user, "attendance_logs", "PATCH", [before], patch)
        return {"ok": True, "mark": saved}

    async def mark_delete(self, request: Request, user: dict) -> dict:
        before = await self.own_mark(user, request.path_params["id"])
        await self.data.delete_log(before["id"])
        await self.broker.announce("attendance_logs", "DELETE", before)
        self.changed(user, "attendance_logs", "DELETE", [before], None)
        return {"ok": True}

    async def photo_response(self, request: Request, getter) -> Response:
        try:
            await self.user(request)
            value = await getter()
        except ApiError as exc:
            return Response(status_code=exc.status)
        decoded = decode_data_url(value)
        if not decoded:
            return Response(status_code=404)
        body, media = decoded
        return Response(body, media_type=media, headers={"Cache-Control": "private, max-age=86400"})

    async def mark_photo(self, request: Request) -> Response:
        async def getter():
            user = await self.user(request)
            m = await self.own_mark(user, request.path_params["id"])
            return await self.data.log_photo(m["id"])
        return await self.photo_response(request, getter)

    async def employee_photo(self, request: Request) -> Response:
        async def getter():
            user = await self.user(request)
            emp = await self.need_employee(user, request.path_params["tg"])
            return await self.data.employee_photo(emp["telegram_id"])
        return await self.photo_response(request, getter)

    # ------------------------------------------------------------ employees

    async def employees(self, request: Request, user: dict) -> dict:
        qp = request.query_params
        now = self.now()
        emps = await self.scoped(user, qp.get("dept"), qp.get("q"), qp.get("group"))
        eds = await self.load(emps, now.date(), now.date())
        faces = await self.data.faces()
        managers = await self.data.managers() if self.is_admin(user) else []
        by_mgr = {}
        for mgr in managers:
            for tg in mgr.get("assigned_employee_ids") or []:
                by_mgr[int(tg)] = mgr.get("full_name") or mgr.get("username")
        rows = []
        for e in emps:
            tg = int(e["telegram_id"])
            p = rp.period(eds[tg], [now.date()], self.rules, now)
            day = p["days"][0]
            face = faces.get(tg)
            rows.append({**self.emp_brief(e), "days": sorted(att.parse_days(e.get("shift_days")), key=att.DAYS.index),
                         "start": e.get("shift_start_time"), "end": e.get("shift_end_time"),
                         "joined": e.get("created_at"), "face": {"enrolled_at": face["enrolled_at"], "checks": face.get("checks")}
                         if face else None, "today": day, "manager": by_mgr.get(tg)})
        return {"ok": True, "rows": rows}

    async def employee(self, request: Request, user: dict) -> dict:
        emp = await self.need_employee(user, request.path_params["tg"])
        tg = int(emp["telegram_id"])
        now = self.now()
        month = request.query_params.get("month") or now.strftime("%Y-%m")
        try:
            y, m = map(int, month.split("-"))
            days = rp.month_days(y, m)
        except ValueError:
            raise ApiError("bad_month") from None
        eds = await self.load([emp], days[0], days[-1])
        p = rp.period(eds[tg], days, self.rules, now)
        durations = {s.out_id: s.minutes(now) for s in p["sessions"] if s.out_id}
        lates = {s.in_id: s.late_min for s in p["sessions"]}
        marks = []
        for mk in reversed(eds[tg].marks):
            ts = att.parse_ts(mk["timestamp"]).astimezone(self.rules.tz)
            if days[0] <= ts.date() <= days[-1]:
                marks.append({"id": mk["id"], "action": mk["action_type"], "at": ts.isoformat(), "note": mk.get("note"),
                              "admin_note": mk.get("admin_note"), "distance_m": mk.get("distance_meters"),
                              "late_min": lates.get(str(mk["id"]), 0), "duration_min": durations.get(str(mk["id"])),
                              "auto": str(mk["id"]).startswith("auto-out")})
        photos = await self.data.get("attendance_logs", [
            ("telegram_id", f"eq.{tg}"), ("photo_url", "not.is.null"), ("order", "timestamp.desc"), ("limit", "60"),
            ("select", "id,action_type,timestamp")])
        faces = await self.data.faces()
        face = faces.get(tg)
        managers = await self.data.managers() if self.is_admin(user) else []
        manager_id = next((mg["id"] for mg in managers if tg in [int(x) for x in mg.get("assigned_employee_ids") or []]), None)
        ed_now = eds[tg] if days[0] <= now.date() <= days[-1] else (await self.load([emp], now.date(), now.date()))[tg]
        on_duty = next((s for s in rp.build_sessions(ed_now, self.rules, now) if s.ongoing), None)
        return {"ok": True, "employee": {**self.emp_brief(emp), "first_name": emp.get("first_name"),
                                         "last_name": emp.get("last_name"), "joined": emp.get("created_at"),
                                         "start": emp.get("shift_start_time"), "end": emp.get("shift_end_time"),
                                         "days": sorted(att.parse_days(emp.get("shift_days")), key=att.DAYS.index),
                                         "assigned": att.is_assigned(emp), "manager_id": manager_id},
                "face": face, "month": month, "days": p["days"], "totals": p["totals"], "marks": marks,
                "photos": [{"id": ph["id"], "action": ph["action_type"],
                            "at": att.parse_ts(ph["timestamp"]).astimezone(self.rules.tz).isoformat()} for ph in photos],
                "on_duty": {"since": on_duty.start.isoformat()} if on_duty else None,
                "managers": [{"id": mg["id"], "name": mg.get("full_name") or mg["username"], "department": mg.get("department")}
                             for mg in managers]}

    async def employee_edit(self, request: Request, user: dict) -> dict:
        emp = await self.need_employee(user, request.path_params["tg"])
        tg = int(emp["telegram_id"])
        data = await self.body(request)
        perms = self.perms(user)
        patch: dict = {}
        for key in ("first_name", "last_name"):
            if key in data:
                if not perms["employee_edit"]:
                    raise ApiError("forbidden", 403)
                value = " ".join(str(data[key] or "").split())[:40]
                if key == "first_name" and not value:
                    raise ApiError("bad_name")
                patch[key] = value or None
        if "department" in data:
            if not perms["employee_edit"]:
                raise ApiError("forbidden", 403)
            if data["department"] not in DEPARTMENTS:
                raise ApiError("bad_department")
            patch["department"] = data["department"]
        if "group" in data:
            if not perms["shift"]:
                raise ApiError("forbidden", 403)
            group = data["group"] or None
            if group is not None and group not in await self.groups():
                raise ApiError("bad_group")
            if group != self.group_of(emp):
                patch["shift_group"] = group
        shift_note = None
        if "shift" in data:
            shift_note = await self.apply_shift(emp, data["shift"], patch)
        if "manager_id" in data:
            if not perms["assign"]:
                raise ApiError("forbidden", 403)
            await self.assign_manager(tg, data["manager_id"])
        saved = emp
        if patch:
            patch["updated_at"] = utc(self.now())
            saved = await self.data.update_employee(tg, patch) or emp
            await self.broker.announce("employees", "UPDATE", {"telegram_id": tg})
            if any(k.startswith("shift_") and k != "shift_group" for k in patch):
                self.changed(user, "employees", "PATCH", [emp], patch)
            if patch.get("shift_group"):
                asyncio.create_task(self.tell_group(user, tg, patch["shift_group"]))
        return {"ok": True, "employee": self.emp_brief(saved), "shift_note": shift_note}

    async def tell_group(self, user: dict, tg: int, group: str) -> None:
        try:
            await self.tell(tg, "group_set", user, group=html.escape(group, quote=False))
        except Exception:
            log.warning("group message to %s failed", tg)

    async def apply_shift(self, emp: dict, shift, patch: dict) -> str | None:
        """Default shift + working days. Applies from today (unless today's shift is already started with a
        check-in) and rewrites today/future cells of existing week rows so the new shift really applies."""
        if not isinstance(shift, dict):
            raise ApiError("bad_shift")
        tg = int(emp["telegram_id"])
        if shift.get("clear"):
            patch.update(shift_name="Shift Unassigned", shift_start_time=None, shift_end_time=None, shift_days=[])
            days, start, end = set(), None, None
        else:
            start, end = str(shift.get("start", "")), str(shift.get("end", ""))
            days = {d for d in shift.get("days") or [] if d in att.DAYS}
            if not HHMM.match(start) or not HHMM.match(end) or start == end:
                raise ApiError("bad_time")
            if not days:
                raise ApiError("no_days")
            patch.update(shift_name=f"Smena ({start} – {end})", shift_start_time=start, shift_end_time=end,
                         shift_days=[d for d in att.DAYS if d in days])
        now = self.now()
        today = now.date()
        todays = await self.data.logs(datetime.combine(today, time(), self.rules.tz) - timedelta(hours=4), now, [tg])
        keep_today = any(m["action_type"] == "check_in" for m in todays)
        first_day = today + timedelta(days=1) if keep_today else today
        rows = rp.group_schedules(await self.data.schedule_rows_from(tg, att.monday(today))).get(tg, {})
        for week, row in rows.items():
            changed = False
            for i, d in enumerate(att.DAYS):
                if week + timedelta(days=i) < first_day:
                    continue
                row[d] = {"status": "scheduled" if d in days else "off", "startTime": "", "endTime": "", "note": ""} if days \
                    else {"status": "", "startTime": "", "endTime": "", "note": ""}
                changed = True
            if changed:
                row["updated_at"] = utc(now)
                await self.data.save_schedule_row({k: v for k, v in row.items() if k != "employee"})
        return "from_tomorrow" if keep_today else "from_today"

    async def assign_manager(self, tg: int, manager_id) -> None:
        for mg in await self.data.managers():
            ids = [int(x) for x in mg.get("assigned_employee_ids") or [] if str(x).lstrip("-").isdigit()]
            want = mg["id"] == manager_id
            if want and tg not in ids:
                await self.data.set_assigned(mg["id"], ids + [tg])
            elif not want and tg in ids:
                await self.data.set_assigned(mg["id"], [x for x in ids if x != tg])

    async def employee_delete(self, request: Request, user: dict) -> dict:
        if not self.perms(user)["employee_delete"]:
            raise ApiError("forbidden", 403)
        emp = await self.need_employee(user, request.path_params["tg"])
        await self.data.delete_employee(int(emp["telegram_id"]))
        await self.assign_manager(int(emp["telegram_id"]), None)
        await self.broker.announce("employees", "DELETE", {"telegram_id": emp["telegram_id"]})
        log.info("employee %s deleted by %s", emp["telegram_id"], user["username"])
        return {"ok": True}

    async def face_reset(self, request: Request, user: dict) -> dict:
        if not self.perms(user)["face_reset"]:
            raise ApiError("forbidden", 403)
        emp = await self.need_employee(user, request.path_params["tg"])
        await self.data.delete_face(int(emp["telegram_id"]))
        await self.broker.announce("employees", "UPDATE", {"telegram_id": emp["telegram_id"]})
        log.info("Face ID reset for %s by %s", emp["telegram_id"], user["username"])
        return {"ok": True}

    async def force_checkout(self, request: Request, user: dict) -> dict:
        emp = await self.need_employee(user, request.path_params["tg"])
        tg = int(emp["telegram_id"])
        now = self.now()
        eds = await self.load([emp], now.date() - timedelta(days=1), now.date())
        sessions = rp.build_sessions(eds[tg], self.rules, now)
        if not sessions or sessions[-1].end is not None:
            raise ApiError("not_on_shift", 409)
        row = {"id": str(uuid.uuid4()), "telegram_id": tg, "action_type": "check_out", "timestamp": utc(now),
               "note": None, "admin_note": f"Majburiy check-out · {user['username']}", "distance_meters": None}
        saved = await self.data.add_log(row)
        await self.broker.announce("attendance_logs", "INSERT", saved)
        self.changed(user, "attendance_logs", "POST", [], saved)
        return {"ok": True, "mark": saved}

    # ------------------------------------------------------------ shift groups

    async def group_counts(self) -> list[dict]:
        groups = await self.groups()
        emps = await self.data.employees()
        count = {g: 0 for g in groups}
        for e in emps:
            g = self.group_of(e)
            if g:
                count[g] += 1
        return [{"name": g, "count": count[g]} for g in groups] + \
            [{"name": None, "count": sum(1 for e in emps if not self.group_of(e))}]

    async def groups_set(self, request: Request, user: dict) -> dict:
        """Admins: the whole list in order, [{"name", "from"}]. "from" = the old name (a rename keeps the people),
        no "from" = a new group; an old group left out is removed and its people go to "no group"."""
        if not self.perms(user)["groups"]:
            raise ApiError("forbidden", 403)
        items = (await self.body(request)).get("groups")
        if not isinstance(items, list) or len(items) > MAX_GROUPS:
            raise ApiError("bad_groups")
        old = await self.groups()
        names, moves = [], {}
        for it in items:
            if not isinstance(it, dict):
                raise ApiError("bad_groups")
            name = " ".join(str(it.get("name") or "").split())
            if not GROUP_NAME.match(name) or name.lower() == NO_GROUP:
                raise ApiError("bad_group_name", name=name[:40])
            if name.lower() in (n.lower() for n in names):
                raise ApiError("group_exists", name=name)
            src = it.get("from")
            if src is not None:
                if src not in old or src in moves:
                    raise ApiError("bad_groups")
                moves[src] = name
            names.append(name)
        changed = 0
        for e in await self.data.employees():
            cur = e.get("shift_group")
            if not cur:
                continue
            new = moves.get(cur) if cur in old else None
            if new != cur:
                await self.data.update_employee(int(e["telegram_id"]), {"shift_group": new, "updated_at": utc(self.now())})
                changed += 1
        await self.data.set_setting("shift_groups", json.dumps(names, ensure_ascii=False))
        self._groups = names
        await self.broker.announce("employees", "UPDATE", None)
        log.info("shift groups set by %s: %s (%d people moved)", user["username"], names, changed)
        return {"ok": True, "groups": await self.group_counts(), "moved": changed}

    # ------------------------------------------------------------ weekly schedule

    async def schedule(self, request: Request, user: dict) -> dict:
        now = self.now()
        week = att.monday(self.parse_day(request.query_params.get("week"), now.date()))
        days = [week + timedelta(days=i) for i in range(7)]
        qp = request.query_params
        emps = await self.scoped(user, qp.get("dept"), qp.get("q"), qp.get("group"))
        eds = await self.load(emps, days[0], days[-1])
        can_past = self.perms(user)["schedule_past"]
        rows = []
        for e in emps:
            tg = int(e["telegram_id"])
            ed = eds[tg]
            p = rp.period(ed, days, self.rules, now)
            row = ed.schedules.get(week) or {}
            cells = []
            for i, d in enumerate(days):
                raw = row.get(att.DAYS[i])
                if isinstance(raw, str):
                    try:
                        raw = json.loads(raw)
                    except ValueError:
                        raw = None
                raw = raw if isinstance(raw, dict) else {}
                info = p["days"][i]
                base = att.plan_for(e, {}, d, self.rules.tz)          # what the default shift alone would give
                differs = base.status != info["plan"] or (base.start and base.start.strftime("%H:%M")) != info["start"] \
                    or (base.end and base.end.strftime("%H:%M")) != info["end"]
                cells.append({**info, "override": bool(raw.get("status")) and bool(differs), "note": raw.get("note") or "",
                              "editable": can_past or d >= now.date()})
            rows.append({**self.emp_brief(e), "assigned": att.is_assigned(e), "cells": cells,
                         "totals": {"planned_min": sum(self.plan_minutes(c) for c in cells), "worked_min": p["totals"]["worked_min"]}})
        return {"ok": True, "week": week.isoformat(), "days": [d.isoformat() for d in days], "today": now.date().isoformat(),
                "groups": await self.groups(), "rows": rows}

    @staticmethod
    def plan_minutes(cell: dict) -> int:
        if cell.get("plan") != "scheduled" or not cell.get("start"):
            return 0
        s, e = att.hhmm(cell["start"]), att.hhmm(cell["end"])
        m = (e.hour * 60 + e.minute) - (s.hour * 60 + s.minute)
        return m if m > 0 else m + 1440

    async def schedule_set(self, request: Request, user: dict) -> dict:
        emp = await self.need_employee(user, request.path_params["tg"])
        tg = int(emp["telegram_id"])
        day = self.parse_day(request.path_params["day"], self.now().date())
        if day < self.now().date() and not self.perms(user)["schedule_past"]:
            raise ApiError("day_locked", 403)
        if not att.is_assigned(emp):
            raise ApiError("no_shift", 409)
        data = await self.body(request)
        status = data.get("status")
        if status not in STATUSES:
            raise ApiError("bad_status")
        start, end = str(data.get("start") or ""), str(data.get("end") or "")
        if status == "scheduled" and (start or end):
            if not HHMM.match(start) or not HHMM.match(end) or start == end:
                raise ApiError("bad_time")
        else:
            start = end = ""
        note = " ".join(str(data.get("note") or "").split())[:120]
        week = att.monday(day)
        existing = rp.group_schedules(await self.data.schedule_rows([week], [tg])).get(tg, {}).get(week)
        row = {k: v for k, v in (existing or {}).items() if k != "employee"} or {
            "id": f"sched-{week.isoformat()}-{tg}", "week_start_date": week.isoformat(), "telegram_id": tg,
            "department": emp.get("department"), **{d: {} for d in att.DAYS}}
        key = att.DAYS[day.weekday()]
        row[key] = {"status": "" if status == "default" else status, "startTime": start, "endTime": end, "note": note}
        row.update(updated_at=utc(self.now()), updated_by=user["username"], manager_id=row.get("manager_id"))
        await self.data.save_schedule_row(row)
        await self.broker.announce("team_schedules", "UPDATE", {"telegram_id": tg})
        if day >= self.now().date():
            plan = att.plan_for(emp, {week: row}, day, self.rules.tz)
            asyncio.create_task(self.tell_schedule(user, tg, day, plan))
        return {"ok": True}

    async def tell_schedule(self, user: dict, tg: int, day: date, plan: att.Plan) -> None:
        lang = texts.pick(self.miniapp.langs.get(tg))
        what = (f"{plan.start.strftime('%H:%M')} – {plan.end.strftime('%H:%M')}" if plan.status == "scheduled"
                else texts.t(lang, f"plan_{plan.status}"))
        try:
            await self.tell(tg, "schedule_changed", user, date=day.strftime("%d.%m"), what=what)
        except Exception:
            log.warning("schedule message to %s failed", tg)

    # ------------------------------------------------------------ reports

    async def report_data(self, request: Request, user: dict) -> tuple[dict, date, date]:
        qp = request.query_params
        now = self.now()
        if qp.get("from") or qp.get("to"):
            first, last = self.parse_day(qp.get("from"), now.date()), self.parse_day(qp.get("to"), now.date())
            if last < first:
                first, last = last, first
            if (last - first).days > MAX_RANGE_DAYS:
                raise ApiError("range_too_long", max_days=MAX_RANGE_DAYS)
            days = [first + timedelta(days=i) for i in range((last - first).days + 1)]
        else:
            month = qp.get("month") or now.strftime("%Y-%m")
            try:
                y, m = map(int, month.split("-"))
                days = rp.month_days(y, m)
            except ValueError:
                raise ApiError("bad_month") from None
        emps = await self.scoped(user, qp.get("dept"), qp.get("q"), qp.get("group"))
        eds = await self.load(emps, days[0], days[-1])
        rows = []
        for e in emps:
            p = rp.period(eds[int(e["telegram_id"])], days, self.rules, now)
            rows.append({**self.emp_brief(e), "totals": p["totals"],
                         "days": [{k: d.get(k) for k in ("date", "status", "first_in", "last_out", "worked_min", "late_min",
                                                          "ongoing", "auto_out")} for d in p["days"]]})
        keys = ("work_days", "on_time", "late", "absent", "off", "sick", "vacation", "planned", "worked_min", "late_min",
                "auto_out", "missing_out")
        tot = {k: sum(r["totals"][k] for r in rows) for k in keys}
        decided = tot["work_days"] + tot["absent"]
        tot["rate"] = round(tot["work_days"] / decided, 3) if decided else None
        daily = []
        for i, d in enumerate(days):
            st = [r["days"][i]["status"] for r in rows]
            daily.append({"date": d.isoformat(), "present": st.count("present") + st.count("late"), "late": st.count("late"),
                          "absent": st.count("absent")})
        return {"ok": True, "from": days[0].isoformat(), "to": days[-1].isoformat(), "days": [d.isoformat() for d in days],
                "groups": await self.groups(), "rows": rows, "totals": tot, "daily": daily}, days[0], days[-1]

    async def report(self, request: Request, user: dict) -> dict:
        return (await self.report_data(request, user))[0]

    async def report_xlsx(self, request: Request) -> Response:
        try:
            user = await self.user(request)
            report, first, last = await self.report_data(request, user)
        except ApiError as exc:
            return JSONResponse({"ok": False, "error": exc.code}, status_code=exc.status)
        body = await asyncio.to_thread(xlsx.build, report, first, last, self.now(), request.query_params.get("lang", "uz"))
        name = f"sevencore_report_{first.isoformat()}_{last.isoformat()}.xlsx"
        return Response(body, media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                        headers={"Content-Disposition": f'attachment; filename="{name}"', "Cache-Control": "no-store"})

    # ------------------------------------------------------------ live updates

    async def events(self, request: Request) -> Response:
        try:
            await self.user(request)
        except ApiError as exc:
            return Response(status_code=exc.status)
        q: asyncio.Queue = asyncio.Queue()
        self.broker.queues.add(q)

        async def stream():
            try:
                yield "retry: 4000\n\n"
                while True:
                    if await request.is_disconnected():
                        break
                    try:
                        event = await asyncio.wait_for(q.get(), timeout=20)
                        yield f"data: {json.dumps(event)}\n\n"
                    except asyncio.TimeoutError:
                        yield ": ping\n\n"
            finally:
                self.broker.queues.discard(q)

        return StreamingResponse(stream(), media_type="text/event-stream",
                                 headers={"Cache-Control": "no-store", "X-Accel-Buffering": "no"})
