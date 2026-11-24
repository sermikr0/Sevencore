"""The employee Mini App server (its own port, the only part meant to be reachable from phones).

  GET  /                       the Mini App (miniapp/index.html)
  POST /api/me                 profile, today's state, week, history
  POST /api/register           first launch: name, department, passkey -> Face ID enrolment scan
  POST /api/scan               start a check-in / check-out scan (location is checked first)
  POST /api/scan/{id}/frame    one JPEG camera frame -> scan progress; the mark is written when verified
  POST /api/scan/{id}/cancel

Every /api call carries Telegram's signed initData in the X-Init-Data header.
"""
from __future__ import annotations

import asyncio
import base64
import logging
import re
import secrets
import time
from collections import defaultdict, deque
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Awaitable, Callable

import numpy as np
from starlette.applications import Starlette
from starlette.requests import Request
from starlette.responses import FileResponse, JSONResponse, Response
from starlette.routing import Route

from . import attendance as att
from .scans import Policy, Scans
from .telegram import Bot, InitDataError, validate_init_data
from .vectors import normalize, similarity

log = logging.getLogger("sevencore.tma")
NAME = re.compile(r"^[^\x00-\x1f<>{}\[\]\\/@#$%^*=+|~`\"]{2,40}$")
STATIC = {"app.js": "application/javascript", "app.css": "text/css", "i18n.js": "application/javascript",
          "logo.svg": "image/svg+xml", "favicon.png": "image/png"}


class ApiError(Exception):
    def __init__(self, code: str, status: int = 400, **extra):
        super().__init__(code)
        self.code, self.status, self.extra = code, status, extra


class Limiter:
    def __init__(self):
        self.hits: dict[str, deque] = defaultdict(deque)

    def count(self, key: str, window: float) -> int:
        now = time.monotonic()
        q = self.hits[key]
        while q and now - q[0] > window:
            q.popleft()
        return len(q)

    def allow(self, key: str, limit: int, window: float) -> bool:
        now = time.monotonic()
        q = self.hits[key]
        while q and now - q[0] > window:
            q.popleft()
        if len(q) >= limit:
            return False
        q.append(now)
        return True


class MiniApp:
    def __init__(self, env: dict[str, str], root: Path, postgrest: str,
                 announce: Callable[[str, str, dict], Awaitable[None]]):
        self.env = env
        self.root = root
        self.static = root / "miniapp"
        self.token = env.get("BOT_TOKEN", "").strip()
        self.max_age = int(env.get("INITDATA_MAX_AGE", "86400"))
        self.announce = announce
        self.rules = att.Rules(
            tz=att.ZoneInfo(env.get("APP_TZ", "Asia/Tashkent")),
            early_min=int(env.get("CHECKIN_EARLY_MIN", "45")),
            late_grace_min=int(env.get("LATE_GRACE_MIN", "5")),
            min_gap_min=int(env.get("MIN_GAP_MIN", "2")),
            lat=float(env.get("GEOFENCE_LAT", "41.280101")),
            lng=float(env.get("GEOFENCE_LNG", "69.251403")),
            radius_m=int(env.get("GEOFENCE_RADIUS_M", "100")),
            checkout_geofence=env.get("CHECKOUT_GEOFENCE", "0") == "1",
        )
        self.policy = Policy(threshold=float(env.get("FACE_THRESHOLD", "0.48")),
                             liveness=env.get("LIVENESS", "1") == "1",
                             turn_delta=float(env.get("LIVENESS_TURN", "0.14")),
                             strict_direction=env.get("LIVENESS_STRICT", "0") == "1")
        self.store = att.Store(postgrest)
        self.scans = Scans(self.engine)
        self.limiter = Limiter()
        self.locks: dict[int, asyncio.Lock] = defaultdict(asyncio.Lock)
        self._engine = None
        self._engine_lock = None
        admin_chats = [int(x) for x in re.split(r"[,\s]+", env.get("ADMIN_CHAT_IDS", "")) if x.strip().lstrip("-").isdigit()]
        self.bot = Bot(self.token, admin_chats, self.bot_status) if self.token else None
        self.app = Starlette(routes=[
            Route("/", self.index),
            Route("/healthz", self.health),
            Route("/api/me", self.me, methods=["POST"]),
            Route("/api/register", self.register, methods=["POST"]),
            Route("/api/scan", self.scan_start, methods=["POST"]),
            Route("/api/scan/{scan_id}/frame", self.scan_frame, methods=["POST"]),
            Route("/api/scan/{scan_id}/cancel", self.scan_cancel, methods=["POST"]),
            Route("/{name}", self.asset),
        ])

    # ------------------------------------------------------------ plumbing

    def engine(self):
        if self._engine is None:
            from .face import FaceEngine
            self._engine = FaceEngine(self.root / "models")
        return self._engine

    async def warm_up(self) -> None:
        """Load the face models in the background so the first scan is fast."""
        try:
            await asyncio.to_thread(self.engine)
            await asyncio.to_thread(self.engine().observe, np.zeros((240, 320, 3), dtype=np.uint8))
            log.info("face models loaded")
        except Exception:
            log.exception("face models failed to load")

    def headers(self) -> dict:
        return {
            "Content-Security-Policy": (
                "default-src 'self'; script-src 'self' https://telegram.org; "
                "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; "
                "img-src 'self' data: blob: https://t.me https://*.telegram.org; media-src 'self' blob: mediastream:; "
                "connect-src 'self'; object-src 'none'; base-uri 'none'; form-action 'none'; "
                "frame-ancestors https://web.telegram.org https://*.telegram.org"),
            "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", "Referrer-Policy": "no-referrer",
            "Permissions-Policy": "camera=(self), geolocation=(self), microphone=()",
        }

    def user(self, request: Request) -> dict:
        if not self.token:
            raise ApiError("bot_not_configured", 503)
        try:
            return validate_init_data(request.headers.get("x-init-data", ""), self.token, self.max_age)
        except InitDataError as exc:
            raise ApiError("not_telegram", 401, detail=str(exc)) from exc

    @staticmethod
    def fail(exc: ApiError) -> JSONResponse:
        return JSONResponse({"ok": False, "error": exc.code, **exc.extra}, status_code=exc.status)

    async def handle(self, request: Request, fn) -> Response:
        try:
            return JSONResponse(await fn())
        except ApiError as exc:
            return self.fail(exc)
        except Exception:
            log.exception("api error on %s", request.url.path)
            return JSONResponse({"ok": False, "error": "server_error"}, status_code=500)

    # ------------------------------------------------------------ pages

    async def index(self, request: Request) -> Response:
        return FileResponse(self.static / "index.html", headers=self.headers())

    async def asset(self, request: Request) -> Response:
        name = request.path_params["name"]
        if name not in STATIC or not (self.static / name).exists():
            return Response("not found", status_code=404)
        return FileResponse(self.static / name, media_type=STATIC[name],
                            headers={"Cache-Control": "no-cache", "X-Content-Type-Options": "nosniff"})

    async def health(self, request: Request) -> Response:
        return JSONResponse({"ok": True, "bot": self.bot.state if self.bot else "no token",
                             "bot_username": self.bot.username if self.bot else None,
                             "public_url": self.bot.app_url if self.bot else None,
                             "face_engine": "loaded" if self._engine else "lazy"})

    # ------------------------------------------------------------ state

    async def snapshot(self, tg: int, emp: dict | None = None) -> dict:
        """Everything the home screen shows, computed from the database."""
        now = datetime.now(self.rules.tz)
        emp = emp or await self.store.employee(tg)
        if not emp:
            return {"registered": False}
        logs, schedules = await self.store.context(tg, emp, now)
        state = att.evaluate(emp, logs, schedules, now, self.rules)
        face = await self.store.face(tg)
        return {
            "registered": True,
            "enrolled": bool(face),
            "employee": {"telegram_id": tg, "first_name": emp.get("first_name") or "", "last_name": emp.get("last_name") or "",
                         "department": emp.get("department"), "shift_name": emp.get("shift_name"),
                         "shift_start": emp.get("shift_start_time"), "shift_end": emp.get("shift_end_time"),
                         "shift_days": sorted(att.parse_days(emp.get("shift_days")), key=att.DAYS.index),
                         "photo": face.get("photo") if face else None},
            "state": state,
            **att.summaries(emp, logs, schedules, now, self.rules),
        }

    async def me(self, request: Request) -> Response:
        async def run():
            tg_user = self.user(request)
            snap = await self.snapshot(tg_user["id"])
            snap.update(self.public_config(), ok=True,
                        suggested={"first_name": tg_user.get("first_name", ""), "last_name": tg_user.get("last_name", "")})
            return snap
        return await self.handle(request, run)

    def public_config(self) -> dict:
        r = self.rules
        return {"server_time": int(time.time() * 1000), "tz": r.tz.key, "company": "Sevencore",
                "departments": list(att.DEPARTMENTS), "liveness": self.policy.liveness,
                "geofence": {"lat": r.lat, "lng": r.lng, "radius_m": r.radius_m, "checkout": r.checkout_geofence},
                "early_min": r.early_min, "late_grace_min": r.late_grace_min, "min_gap_s": r.min_gap_min * 60}

    async def bot_status(self, tg: int) -> dict | None:
        """Short status for the bot's /start and /status."""
        if not tg:
            return None
        snap = await self.snapshot(tg)
        if not snap.get("registered"):
            return None
        st, day = snap["state"], snap["day"]
        shift = st.get("shift") or (st["today"] if st["today"]["status"] == "scheduled" else None)
        return {"name": " ".join(p for p in (snap["employee"]["first_name"], snap["employee"]["last_name"]) if p),
                "enrolled": snap["enrolled"],
                "open_since": att.parse_ts(st["open_since"]).astimezone(self.rules.tz).strftime("%H:%M") if st.get("open_since") else None,
                "worked_min": day["worked_min"], "first_in": day["first_in"], "last_out": day["last_out"],
                "blocked": (st.get("blocked") or {}).get("code"),
                "shift": f"{shift['start']} – {shift['end']}" if shift and shift.get("start") else None}

    # ------------------------------------------------------------ registration

    async def register(self, request: Request) -> Response:
        async def run():
            tg_user = self.user(request)
            tg = tg_user["id"]
            body = await request.json()
            emp = await self.store.employee(tg)
            if emp and await self.store.face(tg):
                raise ApiError("already_registered", 409)
            if emp:          # registered before (or Face ID was reset by an admin): only the face is needed
                reg = None
            else:
                first = " ".join(str(body.get("first_name", "")).split())
                last = " ".join(str(body.get("last_name", "")).split())
                dept = str(body.get("department", ""))
                if not NAME.match(first) or (last and not NAME.match(last)):
                    raise ApiError("bad_name")
                if dept not in att.DEPARTMENTS:
                    raise ApiError("bad_department")
                if self.limiter.count(f"pk:{tg}", 900) >= 6:          # wrong passkeys per 15 min
                    raise ApiError("too_many_attempts", 429)
                passkey = await self.passkey()
                given = str(body.get("passkey", "")).strip().upper()
                if not passkey or not secrets.compare_digest(given.encode(), passkey.upper().encode()):
                    self.limiter.allow(f"pk:{tg}", 10**6, 900)
                    log.warning("wrong passkey from Telegram user %s", tg)
                    raise ApiError("bad_passkey", 403)
                reg = {"first_name": first, "last_name": last or None, "department": dept,
                       "username": tg_user.get("username")}
            scan = self.scans.start(tg, "enroll", {"reg": reg, "lang": tg_user.get("language_code")})
            return {"ok": True, "scan": self.scans.view(scan)}
        return await self.handle(request, run)

    async def passkey(self) -> str | None:
        rows = await self.store._get("organization_security", {"key_name": "eq.terminal_access_code", "select": "passkey"})
        return (rows[0].get("passkey") or "").strip() if rows else None

    # ------------------------------------------------------------ scans

    async def scan_start(self, request: Request) -> Response:
        async def run():
            tg_user = self.user(request)
            tg = tg_user["id"]
            if not self.limiter.allow(f"scan:{tg}", 15, 600):
                raise ApiError("too_many_attempts", 429)
            body = await request.json()
            emp = await self.store.employee(tg)
            if not emp:
                raise ApiError("not_registered", 403)
            if not await self.store.face(tg):
                raise ApiError("not_enrolled", 403)
            now = datetime.now(self.rules.tz)
            logs, schedules = await self.store.context(tg, emp, now)
            state = att.evaluate(emp, logs, schedules, now, self.rules)
            if state.get("cooldown_s"):
                raise ApiError("too_soon", 409, wait_s=state["cooldown_s"])
            if not state["action"]:
                raise ApiError("blocked", 409, blocked=state["blocked"])
            loc = body.get("location")
            problem, dist = att.check_location(self.rules, state["action"], loc)
            if problem:
                raise ApiError(problem, 403, distance_m=dist, radius_m=self.rules.radius_m)
            scan = self.scans.start(tg, state["action"], {
                "loc": {"lat": float(loc["lat"]), "lng": float(loc["lng"]), "accuracy": loc.get("accuracy")},
                "dist": dist, "lang": tg_user.get("language_code")})
            return {"ok": True, "action": state["action"], "distance_m": dist, "scan": self.scans.view(scan)}
        return await self.handle(request, run)

    async def scan_cancel(self, request: Request) -> Response:
        async def run():
            tg = self.user(request)["id"]
            scan = self.scans.get(request.path_params["scan_id"], tg)
            if scan:
                self.scans.drop(scan)
            return {"ok": True}
        return await self.handle(request, run)

    async def scan_frame(self, request: Request) -> Response:
        async def run():
            tg = self.user(request)["id"]
            scan = self.scans.get(request.path_params["scan_id"], tg)
            if not scan:
                raise ApiError("scan_expired", 410)
            data = await request.body()
            if not 1000 <= len(data) <= 400_000:
                raise ApiError("bad_frame")
            async with scan.lock:
                if scan.stage in ("done", "failed"):
                    return {"ok": True, "scan": self.scans.view(scan)}
                if self.scans.too_fast(scan):
                    raise ApiError("too_fast", 429)
                img = await asyncio.to_thread(self.engine().decode, data)
                if img is None:
                    raise ApiError("bad_frame")
                template = None
                if scan.purpose != "enroll":
                    face = await self.store.face(tg)
                    if not face:
                        raise ApiError("not_enrolled", 403)
                    template = np.frombuffer(base64.b64decode(face["embedding"]), dtype=np.float32)
                hint, obs = await asyncio.to_thread(self.scans.step, scan, img, template, self.policy)
                if scan.stage == "verified":
                    await self.commit(scan)
                view = self.scans.view(scan, hint, obs)
                if scan.stage in ("done", "failed"):
                    self.scans.drop(scan)
                return {"ok": True, "scan": view}
        return await self.handle(request, run)

    # ------------------------------------------------------------ commit

    async def commit(self, scan) -> None:
        tg = scan.telegram_id
        async with self.locks[tg]:
            if scan.purpose == "enroll":
                await self.commit_enroll(scan)
            else:
                await self.commit_mark(scan)

    async def commit_enroll(self, scan) -> None:
        tg = scan.telegram_id
        template = scan.template()
        live_ids = {int(r["telegram_id"]) for r in await self.store._get("employees", {"select": "telegram_id"})}
        for other in await self.store.faces():                  # one face, one account
            other_id = int(other["telegram_id"])
            if other_id == tg or other_id not in live_ids or not other.get("embedding"):
                continue
            vec = np.frombuffer(base64.b64decode(other["embedding"]), dtype=np.float32)
            if similarity(template, normalize(vec)) >= self.policy.threshold:
                log.warning("enrolment for %s refused: the face matches employee %s", tg, other["telegram_id"])
                self.scans.fail(scan, "face_taken")
                return
        photo = scan.crop_data_url()
        reg = scan.context.get("reg")
        if reg:
            if await self.store.employee(tg):
                self.scans.fail(scan, "already_registered")
                return
            row = {"telegram_id": tg, "first_name": reg["first_name"], "last_name": reg["last_name"],
                   "username": reg.get("username"), "photo_url": photo, "department": reg["department"],
                   "is_verified": True, "shift_name": "Shift Unassigned", "shift_start_time": None,
                   "shift_end_time": None, "shift_days": [],
                   "created_at": datetime.now(timezone.utc).isoformat(), "updated_at": datetime.now(timezone.utc).isoformat()}
            saved = await self.store.upsert_employee(row)
            await self.announce("employees", "INSERT", {k: v for k, v in saved.items() if k != "photo_url"})
        await self.store.save_face(tg, base64.b64encode(template.astype(np.float32).tobytes()).decode(), photo)
        scan.stage = "done"
        scan.result = {"ok": True, "kind": "enrolled", "photo": photo}
        log.info("Face ID enrolled for %s (live %.3f)", tg, scan.live or 0)

    async def commit_mark(self, scan) -> None:
        tg = scan.telegram_id
        emp = await self.store.employee(tg)
        if not emp:
            self.scans.fail(scan, "not_registered")
            return
        now = datetime.now(self.rules.tz)
        logs, schedules = await self.store.context(tg, emp, now)
        state = att.evaluate(emp, logs, schedules, now, self.rules)
        if state["action"] != scan.purpose or state.get("cooldown_s"):
            self.scans.fail(scan, "state_changed")
            return
        loc = scan.context["loc"]
        problem, dist = att.check_location(self.rules, scan.purpose, loc)
        if problem:
            self.scans.fail(scan, problem, distance_m=dist)
            return
        note = att.compose_note(scan.purpose, state, scan.live)
        photo = scan.crop_data_url()
        row = att.new_log(tg, scan.purpose, now, note, photo, loc, dist)
        saved = await self.store.add_log(row)
        await self.announce("attendance_logs", "INSERT", {k: v for k, v in saved.items() if k != "photo_url"})
        face = await self.store.face(tg)
        await self.store.face_used(tg, scan.score(), int((face or {}).get("checks") or 0) + 1)
        result = {"ok": True, "kind": "mark", "action": scan.purpose, "time": now.strftime("%H:%M"),
                  "at": now.isoformat(), "late_min": state.get("late_min", 0) if scan.purpose == "check_in" else 0,
                  "returning": bool(state.get("returning")), "early_min": state.get("early_min", 0) if scan.purpose == "check_out" else 0,
                  "worked_min": state.get("worked_min"), "distance_m": dist, "score": scan.score(), "photo": photo,
                  "shift": state.get("shift")}
        scan.stage = "done"
        scan.result = result
        log.info("%s %s at %s (score %.3f, live %s, %s m)", tg, scan.purpose, result["time"], scan.score() or 0, scan.live, dist)
        if self.bot and self.bot.state == "polling":
            from .texts import pick
            name = " ".join(p for p in (emp.get("first_name"), emp.get("last_name")) if p)
            asyncio.create_task(self.bot.notify_attendance(tg, pick(scan.context.get("lang")), name, result))
