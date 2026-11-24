"""OpSector — local server that stands in for Supabase + Vercel.

  /                     login page for admins and managers (site/login.html)
  /admin, /manager      the compiled app for the signed-in role (cookie-gated); /mobile = employee app
                        all pages carry a CSP that only allows this origin for data, so nothing can
                        reach the original cloud project
  /auth/*               login/logout, session bootstrap (/session.js), Users & Roles API (accounts.py)
  /rest/v1/*            proxied to PostgREST (the same REST engine Supabase uses)
  /realtime/v1/websocket  a small Phoenix-protocol stand-in for Supabase Realtime:
                        clients subscribe to postgres_changes; every write that passes through
                        /rest/v1 is announced to the matching subscriptions
  /auth/v1/*            stub (the app does not use Supabase Auth)
  /auth/faces           Face ID list / reset for admins

The same process also runs, on its own port (TMA_PORT, default 8791), the employee Mini App that
the Telegram bot opens (server/tma/), and the bot itself (BOT_TOKEN, long polling).

Run:  python3 server/app.py          (settings in .env next to this folder)
"""
from __future__ import annotations

import asyncio
import json
import logging
import os
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import parse_qsl

import httpx
import uvicorn
from starlette.applications import Starlette
from starlette.middleware import Middleware
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import FileResponse, HTMLResponse, JSONResponse, PlainTextResponse, RedirectResponse, Response
from starlette.routing import Mount, Route, WebSocketRoute
from starlette.staticfiles import StaticFiles
from starlette.websockets import WebSocket, WebSocketDisconnect

ROOT = Path(__file__).resolve().parent.parent
SITE = ROOT / "site"
sys.path.insert(0, str(Path(__file__).resolve().parent))
from accounts import COOKIE, SESSION_TTL, AccountError, Accounts  # noqa: E402
from tma.api import MiniApp  # noqa: E402

log = logging.getLogger("sevencore")


def read_env(path: Path) -> dict[str, str]:
    values: dict[str, str] = {}
    if path.exists():
        for line in path.read_text().splitlines():
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, value = line.split("=", 1)
                values[key.strip()] = value.strip()
    return values


ENV = {**read_env(ROOT / ".env"), **os.environ}
# PUBLIC=1 (cloud, e.g. Render): one port ($PORT) for everything, the Mini App under /tma/, data
# (/rest/v1, realtime) only for signed-in admins/managers, no anonymous /mobile portal, Secure cookie.
PUBLIC = ENV.get("PUBLIC", "0") == "1"
HOST = ENV.get("APP_HOST", "0.0.0.0" if PUBLIC else "127.0.0.1")
PORT = int(ENV.get("PORT") if PUBLIC and ENV.get("PORT") else ENV.get("APP_PORT", "8790"))
TMA_PREFIX = "/tma"
POSTGREST = ENV.get("POSTGREST_URL", "http://127.0.0.1:55441").rstrip("/")

# Request headers PostgREST understands; apikey/Authorization are dropped (PostgREST runs as web_anon).
FORWARD_REQ = {"accept", "content-type", "prefer", "range", "range-unit", "accept-profile", "content-profile"}
FORWARD_RESP = {"content-type", "content-range", "preference-applied", "location", "range-unit"}
TABLE = re.compile(r"^[a-z_][a-z0-9_]*$")
ACCOUNT_TABLES = {"admin_users", "dev_users", "managers"}   # passwords never leave the server
PRIVATE_TABLES = {"face_profiles"}                           # Face ID templates: server only
TMA_HOST = ENV.get("TMA_HOST", "127.0.0.1")
TMA_PORT = int(ENV.get("TMA_PORT", "8791"))
SECRET_FIELDS = ("password", "password_hash")
accounts = Accounts(POSTGREST, ENV.get("SESSION_SECRET") or os.urandom(32).hex())


def csp(host: str) -> str:
    return (
        "default-src 'self'; "
        "script-src 'self' https://telegram.org; "
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://unpkg.com; "
        "font-src 'self' https://fonts.gstatic.com data:; "
        "img-src 'self' data: blob: https:; "
        "media-src 'self' blob: mediastream:; "
        f"connect-src 'self' ws://{host} wss://{host}; "
        "worker-src 'self' blob:; frame-src 'self' blob:; object-src 'none'; base-uri 'self'"
    )


# ------------------------------------------------------------------ realtime stand-in

class Hub:
    """Subscriptions per socket: topic -> (join_ref, postgres_changes bindings with server ids)."""

    def __init__(self):
        self.sockets: dict[WebSocket, dict] = {}
        self.next_id = 1000

    def new_id(self) -> int:
        self.next_id += 1
        return self.next_id

    async def announce(self, table: str, event_type: str, record: dict | None) -> None:
        stamp = datetime.now(timezone.utc).isoformat()
        for ws, state in list(self.sockets.items()):
            for topic, sub in list(state["topics"].items()):
                ids = [b["id"] for b in sub["bindings"] if self._matches(b, table, event_type, record)]
                if not ids:
                    continue
                data = {"schema": "public", "table": table, "commit_timestamp": stamp, "type": event_type,
                        "columns": [], "record": record or {}, "old_record": {} if event_type != "DELETE" else (record or {}),
                        "errors": None}
                await self.send(ws, state["v2"], sub["join_ref"], None, topic, "postgres_changes", {"ids": ids, "data": data})

    @staticmethod
    def _matches(binding: dict, table: str, event_type: str, record: dict | None) -> bool:
        if binding.get("schema", "public") not in ("public", "*") or binding.get("table") not in (table, "*"):
            return False
        if binding.get("event", "*") not in ("*", event_type):
            return False
        flt = binding.get("filter")
        if flt and record:
            m = re.match(r"^(\w+)=eq\.(.+)$", flt)
            if m and m.group(1) in record and str(record[m.group(1)]) != m.group(2):
                return False
        return True

    @staticmethod
    async def send(ws: WebSocket, v2: bool, join_ref, ref, topic: str, event: str, payload: dict) -> None:
        msg = [join_ref, ref, topic, event, payload] if v2 else {"join_ref": join_ref, "ref": ref, "topic": topic,
                                                                  "event": event, "payload": payload}
        try:
            await ws.send_text(json.dumps(msg))
        except Exception:
            pass


hub = Hub()


async def realtime(ws: WebSocket) -> None:
    if PUBLIC and not await session_ok(ws.cookies.get(COOKIE)):
        await ws.close(code=1008)
        return
    await ws.accept()
    v2 = ws.query_params.get("vsn", "1.0.0").startswith("2")
    state = {"v2": v2, "topics": {}}
    hub.sockets[ws] = state
    try:
        while True:
            raw = await ws.receive_text()
            try:
                msg = json.loads(raw)
            except ValueError:
                continue
            if isinstance(msg, list) and len(msg) == 5:
                join_ref, ref, topic, event, payload = msg
            elif isinstance(msg, dict):
                join_ref, ref, topic, event, payload = (msg.get("join_ref"), msg.get("ref"), msg.get("topic"),
                                                        msg.get("event"), msg.get("payload") or {})
            else:
                continue
            ok = {"status": "ok", "response": {}}
            if event == "heartbeat":
                await hub.send(ws, v2, None, ref, "phoenix", "phx_reply", ok)
            elif event == "phx_join":
                config = (payload or {}).get("config") or {}
                bindings = []
                for b in config.get("postgres_changes") or []:
                    bindings.append({**b, "id": hub.new_id()})
                state["topics"][topic] = {"join_ref": join_ref, "bindings": bindings}
                response = {"postgres_changes": bindings} if bindings else {}
                await hub.send(ws, v2, join_ref, ref, topic, "phx_reply", {"status": "ok", "response": response})
                if bindings:
                    await hub.send(ws, v2, join_ref, None, topic, "system",
                                   {"channel": topic.split(":", 1)[-1], "extension": "postgres_changes",
                                    "message": "Subscribed to PostgreSQL", "status": "ok"})
            elif event == "phx_leave":
                state["topics"].pop(topic, None)
                await hub.send(ws, v2, join_ref, ref, topic, "phx_reply", ok)
            elif ref is not None:
                await hub.send(ws, v2, join_ref, ref, topic, "phx_reply", ok)
    except WebSocketDisconnect:
        pass
    finally:
        hub.sockets.pop(ws, None)


# ------------------------------------------------------------------ REST proxy

client: httpx.AsyncClient | None = None


async def rest(request: Request) -> Response:
    if PUBLIC and not await session_ok(request.cookies.get(COOKIE)):
        return JSONResponse({"message": "Sign in required.", "code": "LOCAL401"}, status_code=401)
    path = request.path_params["path"]
    table = path.split("/", 1)[0]
    if not TABLE.match(table) or table in PRIVATE_TABLES:
        return JSONResponse({"message": "not found"}, status_code=404)
    headers = {k: v for k, v in request.headers.items() if k.lower() in FORWARD_REQ}
    body = await request.body()
    method = request.method
    if table in ACCOUNT_TABLES:
        blocked = account_rule(table, method, body, request.url.query)
        if blocked:
            return JSONResponse({"message": blocked, "code": "LOCAL403"}, status_code=403)
    watched = method in ("POST", "PATCH", "DELETE", "PUT")
    try:
        resp = await client.request(method, f"{POSTGREST}/{path}", params=list(parse_qsl(request.url.query, keep_blank_values=True)),
                                    headers=headers, content=body)
    except httpx.HTTPError as exc:
        log.error("PostgREST unreachable: %s", exc)
        return JSONResponse({"message": "database unavailable", "code": "LOCAL503"}, status_code=503)
    out_headers = {k: v for k, v in resp.headers.items() if k.lower() in FORWARD_RESP}
    if watched and resp.status_code < 300:
        await announce_write(table, method, body, request.url.query)
        if table == "employees" and method == "DELETE":       # a removed employee loses the Face ID too
            ids = [v for k, v in parse_qsl(request.url.query) if k == "telegram_id"]
            if ids:
                await client.delete(f"{POSTGREST}/face_profiles", params={"telegram_id": ids[0]})
    content = resp.content
    if table in ACCOUNT_TABLES and content:
        content = strip_secrets(content)
    return Response(content, status_code=resp.status_code, headers=out_headers)


def account_rule(table: str, method: str, body: bytes, query: str) -> str | None:
    """Accounts are managed only through /auth/users; the app may read them and update manager team data."""
    if "password" in query.lower():
        return "Password fields cannot be queried."
    if method in ("GET", "HEAD"):
        return None
    if table == "managers" and method == "PATCH":
        try:
            data = json.loads(body) if body else {}
        except ValueError:
            return "Invalid body."
        if isinstance(data, dict) and not set(data) & {"password", "password_hash", "username", "id"}:
            return None
    return "Accounts are managed in Users & Roles (admin panel)."


def strip_secrets(content: bytes) -> bytes:
    try:
        data = json.loads(content)
    except ValueError:
        return content
    rows = data if isinstance(data, list) else [data] if isinstance(data, dict) else []
    for row in rows:
        if isinstance(row, dict):
            for key in SECRET_FIELDS:
                row.pop(key, None)
    return json.dumps(data).encode()


async def announce_write(table: str, method: str, body: bytes, query: str) -> None:
    event_type = {"POST": "INSERT", "PUT": "INSERT", "PATCH": "UPDATE", "DELETE": "DELETE"}[method]
    record: dict = {}
    try:
        data = json.loads(body) if body else {}
        if isinstance(data, list):
            data = data[0] if data else {}
        if isinstance(data, dict):
            record = {k: v for k, v in data.items() if isinstance(v, (str, int, float, bool)) or v is None}
    except ValueError:
        pass
    for key, value in parse_qsl(query):           # filters such as telegram_id=eq.123 identify the row
        if value.startswith("eq.") and key not in record:
            record[key] = value[3:]
    await hub.announce(table, event_type, record)


async def auth_stub(request: Request) -> Response:
    return JSONResponse({"message": "auth is not used by this app"}, status_code=404)


async def health(request: Request) -> Response:
    try:
        ok = (await client.get(f"{POSTGREST}/system_settings", params={"limit": "1"})).status_code == 200
    except httpx.HTTPError:
        ok = False
    bot = miniapp.bot
    return JSONResponse({"ok": ok, "db": "up" if ok else "down",
                         "miniapp": TMA_PREFIX + "/" if PUBLIC else f"http://{TMA_HOST}:{TMA_PORT}",
                         "bot": bot.state if bot else "no BOT_TOKEN", "bot_username": bot.username if bot else None,
                         "public_url": (bot.app_url or None) if bot else None},
                        status_code=200 if ok else 503)


def page_headers(request: Request) -> dict:
    host = request.headers.get("host", f"{HOST}:{PORT}")
    return {"Content-Security-Policy": csp(host), "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff",
            "X-Frame-Options": "DENY", "Referrer-Policy": "same-origin"}


_sessions: dict[str, float] = {}


async def session_ok(token: str | None) -> bool:
    """A valid admin/manager session (the account still exists). Cached 30 s: the app makes many calls."""
    if not token:
        return False
    now = asyncio.get_running_loop().time()
    if _sessions.get(token, 0) > now:
        return True
    try:
        user = await accounts.current(token)
    except httpx.HTTPError:
        return False
    if not user:
        return False
    if len(_sessions) > 2000:
        _sessions.clear()
    _sessions[token] = now + 30
    return True


async def signed_in(request: Request) -> dict | None:
    try:
        return await accounts.current(request.cookies.get(COOKIE))
    except httpx.HTTPError:
        return None


def home_for(user: dict) -> str:
    return "/manager" if user["kind"] == "manager" else "/admin"


def spa(request: Request, with_session: bool) -> HTMLResponse:
    html = (SITE / "index.html").read_text(encoding="utf-8")
    if with_session:
        html = html.replace('<script type="module"', '<script src="/session.js"></script>\n    <script type="module"', 1)
        html = html.replace("</body>", '  <script src="/users.js"></script>\n</body>', 1)
    return HTMLResponse(html, headers=page_headers(request))


async def login_page(request: Request) -> Response:
    user = await signed_in(request)
    if user:
        return RedirectResponse(home_for(user), status_code=303)
    return FileResponse(SITE / "login.html", headers=page_headers(request))


async def admin_page(request: Request) -> Response:
    user = await signed_in(request)
    if not user:
        return RedirectResponse("/", status_code=303)
    if user["kind"] != "admin":
        return RedirectResponse(home_for(user), status_code=303)
    return spa(request, with_session=True)


async def manager_page(request: Request) -> Response:
    user = await signed_in(request)
    if not user:
        return RedirectResponse("/", status_code=303)
    if user["kind"] != "manager":
        return RedirectResponse(home_for(user), status_code=303)
    return spa(request, with_session=True)


async def employee_page(request: Request) -> Response:
    if PUBLIC:                       # employees use the Telegram Mini App; the anonymous web portal stays off
        return RedirectResponse("/", status_code=303)
    return spa(request, with_session=False)


async def to_login(request: Request) -> Response:
    return RedirectResponse("/", status_code=303)


SESSION_JS = """(function () {
  var U = %(user)s;
  window.__OPS = U;
  // the app routes by hash/query too: keep this page on its own portal
  if (location.hash || location.search) history.replaceState(null, "", location.pathname);
  var store = U.kind === "admin" ? sessionStorage : localStorage;
  var key = U.kind === "admin" ? "7core_admin_user" : "7core_manager_session";
  var value = U.kind === "admin"
    ? { id: U.id, username: U.username, display_name: U.display_name, role: U.role }
    : { id: U.id, username: U.username, full_name: U.full_name, department: U.department, team_name: U.team_name || (U.department + " Team"),
        assigned_employee_ids: U.assigned_employee_ids, shift_start_time: U.shift_start_time, shift_end_time: U.shift_end_time,
        shift_days: U.shift_days, created_at: U.created_at };
  try { store.setItem(key, JSON.stringify(value)); } catch (e) {}
  var leaving = false;
  function leave() {
    if (leaving) return; leaving = true;
    fetch("/auth/logout", { method: "POST", headers: { "X-Requested-With": "sevencore" } })
      .catch(function () {}).then(function () { location.replace("/"); });
  }
  // the app's own Sign Out clears its session key: end the server session too
  setInterval(function () { try { if (!store.getItem(key)) leave(); } catch (e) {} }, 600);
}());
"""


async def session_js(request: Request) -> Response:
    user = await signed_in(request)
    if not user:
        body = 'location.replace("/");'
    else:
        body = SESSION_JS % {"user": json.dumps(user).replace("</", "<\\/")}
    return Response(body, media_type="application/javascript", headers={"Cache-Control": "no-store"})


def csrf_ok(request: Request) -> bool:
    return request.headers.get("x-requested-with") == "sevencore"


def client_ip(request: Request) -> str:
    return request.client.host if request.client else "?"


async def auth_login(request: Request) -> Response:
    if not csrf_ok(request):
        return JSONResponse({"message": "Bad request."}, status_code=403)
    try:
        data = await request.json()
        kind, row = await accounts.login(client_ip(request), str(data.get("username", "")), str(data.get("password", "")))
    except AccountError as exc:
        return JSONResponse({"message": str(exc)}, status_code=exc.status)
    except (ValueError, AttributeError):
        return JSONResponse({"message": "Bad request."}, status_code=400)
    user = accounts.public(kind, row)
    response = JSONResponse({"ok": True, "redirect": home_for(user), "role": user["role"]})
    response.set_cookie(COOKIE, accounts.make_token(kind, str(row["id"])), max_age=SESSION_TTL, httponly=True,
                        samesite="strict", path="/", secure=PUBLIC)
    return response


async def auth_logout(request: Request) -> Response:
    _sessions.pop(request.cookies.get(COOKIE, ""), None)
    response = JSONResponse({"ok": True})
    response.delete_cookie(COOKIE, path="/", secure=PUBLIC)
    return response


async def auth_me(request: Request) -> Response:
    user = await signed_in(request)
    return JSONResponse(user) if user else JSONResponse({"message": "Not signed in."}, status_code=401)


async def super_admin(request: Request) -> dict:
    user = await signed_in(request)
    if not user:
        raise AccountError("Not signed in.", 401)
    if user.get("role") != "Super Admin":
        raise AccountError("Only a Super Admin can manage users.", 403)
    if request.method != "GET" and not csrf_ok(request):
        raise AccountError("Bad request.", 403)
    return user


async def users_api(request: Request) -> Response:
    try:
        me = await super_admin(request)
        if request.method == "GET":
            return JSONResponse({"users": await accounts.list_users(), "me": me, "passkey": await accounts.passkey()})
        created = await accounts.create(await request.json())
        return JSONResponse(created, status_code=201)
    except AccountError as exc:
        return JSONResponse({"message": str(exc)}, status_code=exc.status)
    except ValueError:
        return JSONResponse({"message": "Bad request."}, status_code=400)


async def user_api(request: Request) -> Response:
    kind, user_id = request.path_params["kind"], request.path_params["id"]
    if kind not in ("admin", "manager"):
        return JSONResponse({"message": "Not found."}, status_code=404)
    try:
        me = await super_admin(request)
        if request.method == "DELETE":
            await accounts.delete(me, kind, user_id)
            return JSONResponse({"ok": True})
        return JSONResponse(await accounts.update(me, kind, user_id, await request.json()))
    except AccountError as exc:
        return JSONResponse({"message": str(exc)}, status_code=exc.status)
    except ValueError:
        return JSONResponse({"message": "Bad request."}, status_code=400)


async def passkey_api(request: Request) -> Response:
    try:
        me = await super_admin(request)
        code = await accounts.set_passkey((await request.json()).get("passkey"), me["username"])
        return JSONResponse({"passkey": code})
    except AccountError as exc:
        return JSONResponse({"message": str(exc)}, status_code=exc.status)
    except (ValueError, AttributeError):
        return JSONResponse({"message": "Bad request."}, status_code=400)


async def faces_api(request: Request) -> Response:
    """Face ID status per employee (admins), and reset so the employee enrols again on next launch."""
    user = await signed_in(request)
    if not user or user["kind"] != "admin":
        return JSONResponse({"message": "Admins only."}, status_code=403)
    if request.method == "DELETE":
        if not csrf_ok(request):
            return JSONResponse({"message": "Bad request."}, status_code=403)
        tg = request.path_params.get("tg", "")
        if not tg.isdigit():
            return JSONResponse({"message": "Not found."}, status_code=404)
        await client.delete(f"{POSTGREST}/face_profiles", params={"telegram_id": f"eq.{tg}"})
        log.info("Face ID reset for %s by %s", tg, user["username"])
        return JSONResponse({"ok": True})
    emps = (await client.get(f"{POSTGREST}/employees", params={
        "select": "telegram_id,first_name,last_name,department,shift_name", "order": "first_name.asc"})).json()
    faces = {f["telegram_id"]: f for f in (await client.get(f"{POSTGREST}/face_profiles", params={
        "select": "telegram_id,enrolled_at,checks,last_score,last_used_at"})).json()}
    for e in emps:
        f = faces.get(e["telegram_id"])
        e["face"] = {k: f[k] for k in ("enrolled_at", "checks", "last_score", "last_used_at")} if f else None
    return JSONResponse({"employees": emps})


async def favicon(request: Request) -> Response:
    return FileResponse(SITE / "favicon.png")


async def license_note(request: Request) -> Response:
    return PlainTextResponse("The license PDF was not part of the saved files, so this local copy does not include it.",
                             status_code=404)


async def common_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers.setdefault("X-Content-Type-Options", "nosniff")
    if PUBLIC:
        response.headers.setdefault("Strict-Transport-Security", "max-age=31536000")
    if request.url.path.startswith("/assets/") or request.url.path.endswith(".js"):
        response.headers.setdefault("Cache-Control", "no-cache")
    return response


app = Starlette(
    routes=[
        Route("/", login_page),
        Route("/index.html", to_login),
        Route("/admin", admin_page),
        Route("/manager", manager_page),
        Route("/mobile", employee_page),
        Route("/session.js", session_js),
        Route("/auth/login", auth_login, methods=["POST"]),
        Route("/auth/logout", auth_logout, methods=["POST"]),
        Route("/auth/me", auth_me),
        Route("/auth/users", users_api, methods=["GET", "POST"]),
        Route("/auth/users/{kind}/{id}", user_api, methods=["PATCH", "DELETE"]),
        Route("/auth/passkey", passkey_api, methods=["PUT"]),
        Route("/auth/faces", faces_api, methods=["GET"]),
        Route("/auth/faces/{tg}", faces_api, methods=["DELETE"]),
        Route("/healthz", health),
        Route("/favicon.ico", favicon),
        Route("/rest/v1/{path:path}", rest, methods=["GET", "HEAD", "POST", "PATCH", "PUT", "DELETE"]),
        Route("/auth/v1/{path:path}", auth_stub, methods=["GET", "POST", "PUT", "DELETE"]),
        Route("/assets/aistudio/{name:path}", license_note),
        WebSocketRoute("/realtime/v1/websocket", realtime),
        Mount("/", StaticFiles(directory=SITE, html=False), name="site"),
    ],
    middleware=[Middleware(BaseHTTPMiddleware, dispatch=common_headers)],
)
miniapp = MiniApp(ENV, ROOT, POSTGREST, hub.announce)


async def watch_public_url() -> None:
    """Point the bot's buttons at the Mini App's public HTTPS address.

    TMA_PUBLIC_URL wins when set. Otherwise the address of a cloudflared quick tunnel started with
    ./tunnel.sh is read from its metrics endpoint (it changes on every tunnel restart)."""
    fixed = ENV.get("TMA_PUBLIC_URL", "").strip().rstrip("/")
    if not fixed and PUBLIC and ENV.get("RENDER_EXTERNAL_URL"):      # Render sets this to https://<name>.onrender.com
        fixed = ENV["RENDER_EXTERNAL_URL"].rstrip("/") + TMA_PREFIX + "/"
    if fixed:
        await miniapp.bot.set_app_url(fixed)
        return
    metrics = ENV.get("TUNNEL_METRICS", "127.0.0.1:20292")
    while True:
        try:
            r = await client.get(f"http://{metrics}/quicktunnel", timeout=3)
            host = (r.json() or {}).get("hostname") if r.status_code == 200 else None
            await miniapp.bot.set_app_url(f"https://{host}" if host else "")
        except (httpx.HTTPError, ValueError):
            await miniapp.bot.set_app_url("")
        await asyncio.sleep(10)


async def serve() -> None:
    global client
    client = httpx.AsyncClient(timeout=httpx.Timeout(20.0, connect=5.0))
    accounts.client = client
    miniapp.store.client = client
    if PUBLIC:
        # one port behind the platform's HTTPS proxy: /tma/* is the Mini App, everything else the panel
        combined = Starlette(routes=[Route(TMA_PREFIX, lambda r: RedirectResponse(TMA_PREFIX + "/", status_code=308)),
                                     Mount(TMA_PREFIX, app=miniapp.app), Mount("/", app=app)])
        servers = [uvicorn.Server(uvicorn.Config(combined, host=HOST, port=PORT, log_level="warning", ws="websockets",
                                                 lifespan="off", proxy_headers=True, forwarded_allow_ips="*"))]
    else:
        servers = [uvicorn.Server(uvicorn.Config(app, host=HOST, port=PORT, log_level="warning", ws="websockets", lifespan="off")),
                   uvicorn.Server(uvicorn.Config(miniapp.app, host=TMA_HOST, port=TMA_PORT, log_level="warning",
                                                 lifespan="off", proxy_headers=True, forwarded_allow_ips="127.0.0.1"))]
    tasks = [asyncio.create_task(miniapp.warm_up())]
    if miniapp.bot and ENV.get("BOT_POLLING", "1") == "1":       # BOT_POLLING=0: a second instance (tests)
        tasks += [asyncio.create_task(miniapp.bot.run()), asyncio.create_task(watch_public_url())]
    try:
        await asyncio.gather(*(s.serve() for s in servers))
    finally:
        for t in tasks:
            t.cancel()
        if miniapp.bot:
            await miniapp.bot.close()
        await client.aclose()


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s")
    logging.getLogger("httpx").setLevel(logging.WARNING)
    if PUBLIC:
        print(f"\n  Sevencore Attendance (public mode) on :{PORT}   panel /   Mini App {TMA_PREFIX}/\n", flush=True)
    else:
        print(f"\n  Sevencore Attendance   http://{HOST}:{PORT}   (login for admins and managers)\n"
              f"  Employee Mini App      http://{TMA_HOST}:{TMA_PORT}   (opened from the Telegram bot)\n", flush=True)
    asyncio.run(serve())
