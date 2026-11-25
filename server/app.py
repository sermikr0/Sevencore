"""Sevencore Attendance server.

  /                     sign-in page for admins and managers
  /app, /app/*          the panel (panel/): overview, attendance, employees, schedule, reports, settings
  /api/panel/*          the panel's JSON API, role and department checked on the server (server/panel/api.py)
  /auth/*               sign-in / sign-out and the Super Admin's accounts + passkey API (accounts.py)
  /tma/                 the employees' Telegram Mini App (PUBLIC=1; locally it has its own port, TMA_PORT)

The database (Postgres) is reached only through PostgREST on 127.0.0.1, by this process. The browser never
talks to the database. The Telegram bot runs in the same process (BOT_TOKEN, long polling).

Run:  python3 server/app.py          (settings in .env next to this folder)
"""
from __future__ import annotations

import asyncio
import logging
import os
import sys
from pathlib import Path

import httpx
import uvicorn
from starlette.applications import Starlette
from starlette.middleware import Middleware
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import FileResponse, JSONResponse, RedirectResponse, Response
from starlette.routing import Mount, Route
from starlette.staticfiles import StaticFiles

ROOT = Path(__file__).resolve().parent.parent
PANEL = ROOT / "panel"
sys.path.insert(0, str(Path(__file__).resolve().parent))
from accounts import COOKIE, SESSION_TTL, AccountError, Accounts  # noqa: E402
from panel.api import Broker, Panel  # noqa: E402
from panel.data import Data  # noqa: E402
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
# PUBLIC=1 (cloud, e.g. Render): one port ($PORT) for everything with the Mini App under /tma/, Secure cookie, HSTS.
PUBLIC = ENV.get("PUBLIC", "0") == "1"
HOST = ENV.get("APP_HOST", "0.0.0.0" if PUBLIC else "127.0.0.1")
PORT = int(ENV.get("PORT") if PUBLIC and ENV.get("PORT") else ENV.get("APP_PORT", "8790"))
POSTGREST = ENV.get("POSTGREST_URL", "http://127.0.0.1:55441").rstrip("/")
TMA_HOST = ENV.get("TMA_HOST", "127.0.0.1")
TMA_PORT = int(ENV.get("TMA_PORT", "8791"))
TMA_PREFIX = "/tma"

accounts = Accounts(POSTGREST, ENV.get("SESSION_SECRET") or os.urandom(32).hex())
broker = Broker()
miniapp = MiniApp(ENV, ROOT, POSTGREST, broker.announce)
data = Data(POSTGREST)
panel = Panel(data, accounts, miniapp, broker)

PAGE_CSP = ("default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
            "font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self'; "
            "object-src 'none'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'")


def page(path: Path) -> FileResponse:
    return FileResponse(path, headers={"Content-Security-Policy": PAGE_CSP, "Cache-Control": "no-store",
                                       "X-Frame-Options": "DENY", "Referrer-Policy": "same-origin",
                                       "X-Content-Type-Options": "nosniff"})


async def signed_in(request: Request) -> dict | None:
    try:
        return await accounts.current(request.cookies.get(COOKIE))
    except httpx.HTTPError:
        return None


def csrf_ok(request: Request) -> bool:
    return request.headers.get("x-requested-with") == "sevencore"


def client_ip(request: Request) -> str:
    return request.client.host if request.client else "?"


# ------------------------------------------------------------------ pages

async def login_page(request: Request) -> Response:
    if await signed_in(request):
        return RedirectResponse("/app", status_code=303)
    return page(PANEL / "login.html")


async def app_page(request: Request) -> Response:
    if not await signed_in(request):
        return RedirectResponse("/", status_code=303)
    return page(PANEL / "index.html")


async def to_app(request: Request) -> Response:
    return RedirectResponse("/app", status_code=301)


async def favicon(request: Request) -> Response:
    return FileResponse(PANEL / "assets" / "favicon.svg", media_type="image/svg+xml")


# ------------------------------------------------------------------ sign-in and accounts (accounts.py)

async def auth_login(request: Request) -> Response:
    if not csrf_ok(request):
        return JSONResponse({"message": "Bad request."}, status_code=403)
    try:
        body = await request.json()
        kind, row = await accounts.login(client_ip(request), str(body.get("username", "")), str(body.get("password", "")))
    except AccountError as exc:
        return JSONResponse({"message": str(exc)}, status_code=exc.status)
    except (ValueError, AttributeError):
        return JSONResponse({"message": "Bad request."}, status_code=400)
    user = accounts.public(kind, row)
    response = JSONResponse({"ok": True, "redirect": "/app", "role": user["role"]})
    response.set_cookie(COOKIE, accounts.make_token(kind, str(row["id"])), max_age=SESSION_TTL, httponly=True,
                        samesite="strict", path="/", secure=PUBLIC)
    return response


async def auth_logout(request: Request) -> Response:
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
        return JSONResponse(await accounts.create(await request.json()), status_code=201)
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


async def health(request: Request) -> Response:
    ok = await data.ping()
    bot = miniapp.bot
    return JSONResponse({"ok": ok, "db": "up" if ok else "down",
                         "miniapp": TMA_PREFIX + "/" if PUBLIC else f"http://{TMA_HOST}:{TMA_PORT}",
                         "bot": bot.state if bot else "no BOT_TOKEN", "bot_username": bot.username if bot else None,
                         "public_url": (bot.app_url or None) if bot else None},
                        status_code=200 if ok else 503)


async def common_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers.setdefault("X-Content-Type-Options", "nosniff")
    if request.url.path.startswith("/panel/"):
        response.headers.setdefault("Cache-Control", "no-cache")
    if PUBLIC:
        response.headers.setdefault("Strict-Transport-Security", "max-age=31536000")
    return response


app = Starlette(
    routes=[
        Route("/", login_page),
        Route("/app", app_page),
        Route("/app/{path:path}", app_page),
        Route("/admin", to_app),
        Route("/manager", to_app),
        Route("/favicon.ico", favicon),
        Route("/auth/login", auth_login, methods=["POST"]),
        Route("/auth/logout", auth_logout, methods=["POST"]),
        Route("/auth/me", auth_me),
        Route("/auth/users", users_api, methods=["GET", "POST"]),
        Route("/auth/users/{kind}/{id}", user_api, methods=["PATCH", "DELETE"]),
        Route("/auth/passkey", passkey_api, methods=["PUT"]),
        Route("/healthz", health),
        *panel.routes,
        Mount("/panel", StaticFiles(directory=PANEL), name="panel"),
    ],
    middleware=[Middleware(BaseHTTPMiddleware, dispatch=common_headers)],
)


async def watch_public_url() -> None:
    """Point the bot's buttons at the Mini App's public HTTPS address.

    TMA_PUBLIC_URL wins; on Render RENDER_EXTERNAL_URL + /tma/; otherwise a cloudflared quick tunnel started with
    ./tunnel.sh is read from its metrics endpoint (it changes on every tunnel restart)."""
    fixed = ENV.get("TMA_PUBLIC_URL", "").strip().rstrip("/")
    if not fixed and PUBLIC and ENV.get("RENDER_EXTERNAL_URL"):
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


client: httpx.AsyncClient | None = None


async def serve() -> None:
    global client
    client = httpx.AsyncClient(timeout=httpx.Timeout(20.0, connect=5.0))
    accounts.client = miniapp.store.client = data.client = client
    if PUBLIC:
        # one port behind the platform's HTTPS proxy: /tma/* is the Mini App, everything else the panel
        combined = Starlette(routes=[Route(TMA_PREFIX, lambda r: RedirectResponse(TMA_PREFIX + "/", status_code=308)),
                                     Mount(TMA_PREFIX, app=miniapp.app), Mount("/", app=app)])
        servers = [uvicorn.Server(uvicorn.Config(combined, host=HOST, port=PORT, log_level="warning", lifespan="off",
                                                 proxy_headers=True, forwarded_allow_ips="*"))]
    else:
        servers = [uvicorn.Server(uvicorn.Config(app, host=HOST, port=PORT, log_level="warning", lifespan="off")),
                   uvicorn.Server(uvicorn.Config(miniapp.app, host=TMA_HOST, port=TMA_PORT, log_level="warning",
                                                 lifespan="off", proxy_headers=True, forwarded_allow_ips="127.0.0.1"))]
    tasks = [asyncio.create_task(miniapp.warm_up())]
    if ENV.get("AUTO_CLOSE", "1") == "1":       # missed check-outs are closed at the shift end
        tasks.append(asyncio.create_task(miniapp.close_missed_loop()))
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
        print(f"\n  Sevencore Attendance (public mode) on :{PORT}   panel /app   Mini App {TMA_PREFIX}/\n", flush=True)
    else:
        print(f"\n  Sevencore Attendance   http://{HOST}:{PORT}   (panel for admins and managers)\n"
              f"  Employee Mini App      http://{TMA_HOST}:{TMA_PORT}   (opened from the Telegram bot)\n", flush=True)
    asyncio.run(serve())
