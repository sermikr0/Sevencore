#!/usr/bin/env python3
"""Container entry point for the cloud (Render): one service runs everything.

  1. prepares the database (tables, first Super Admin, employee passkey), idempotent on every deploy
  2. starts PostgREST on 127.0.0.1:3000 (the REST engine the app talks to; never exposed)
  3. starts server/app.py in PUBLIC mode on $PORT: admin/manager panel at /, Telegram Mini App at /tma/,
     and the Telegram bot (long polling) in the same process

If either process stops, the container exits and the platform restarts it.

Environment: DATABASE_URL (required), ADMIN_PASSWORD (required for the first start), BOT_TOKEN,
ADMIN_USERNAME (default admin), EMPLOYEE_PASSKEY (optional, else random; shown in Users & Roles).
"""
from __future__ import annotations

import os
import re
import secrets
import signal
import subprocess
import sys
import time
import urllib.request
from pathlib import Path
from urllib.parse import unquote, urlparse

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "server"))
from passwords import hash_password  # noqa: E402

REST_PORT = 3000


def say(msg: str) -> None:
    print(f"[run] {msg}", flush=True)


def connect(url: str):
    import psycopg
    deadline = time.time() + 90
    while True:
        try:
            return psycopg.connect(url, autocommit=True, connect_timeout=5)
        except psycopg.OperationalError as exc:
            if time.time() > deadline:
                raise
            say(f"database not ready yet ({exc.__class__.__name__}), retrying")
            time.sleep(3)


def bootstrap(url: str) -> None:
    schema = (ROOT / "db" / "01_schema.sql").read_text().split("-- PostgREST role")[0]
    with connect(url) as conn:
        conn.execute(schema)
        admins = conn.execute("SELECT count(*) FROM admin_users WHERE role = 'Super Admin'").fetchone()[0]
        if not admins:
            username = os.environ.get("ADMIN_USERNAME", "admin").strip().lower()
            password = os.environ.get("ADMIN_PASSWORD", "")
            if len(password) < 10:
                say("ADMIN_PASSWORD is missing or shorter than 10 characters: set it in the service environment")
                sys.exit(2)
            conn.execute("INSERT INTO admin_users (id, username, password, display_name, role) VALUES (%s,%s,%s,%s,%s)",
                         ("admin-owner", username, hash_password(password), "Administrator", "Super Admin"))
            say(f"created Super Admin '{username}'")
        if not conn.execute("SELECT 1 FROM organization_security WHERE key_name = 'terminal_access_code'").fetchone():
            code = os.environ.get("EMPLOYEE_PASSKEY", "").strip().upper()
            if not re.fullmatch(r"[A-Z0-9-]{4,24}", code):
                code = "SC-" + secrets.token_hex(3).upper()
            lat, lng = float(os.environ.get("GEOFENCE_LAT", "0") or 0), float(os.environ.get("GEOFENCE_LNG", "0") or 0)
            conn.execute("INSERT INTO organization_security (id, key_name, passkey, description, geofence_lat, geofence_lng,"
                         " geofence_radius_meters, updated_by) VALUES (%s,%s,%s,%s,%s,%s,%s,%s)",
                         ("sec-terminal", "terminal_access_code", code, "Employee registration code", lat, lng,
                          int(os.environ.get("GEOFENCE_RADIUS_M", "100") or 100), "deploy"))
            say("created the employee passkey (see Users & Roles in the admin panel)")
    say("database ready")


def wait_http(url: str, proc: subprocess.Popen, seconds: int) -> None:
    deadline = time.time() + seconds
    while time.time() < deadline:
        if proc.poll() is not None:
            raise SystemExit(f"[run] {url} process exited with {proc.returncode}")
        try:
            with urllib.request.urlopen(url, timeout=3) as r:
                if r.status == 200:
                    return
        except OSError:
            pass
        time.sleep(1)
    raise SystemExit(f"[run] {url} did not come up")


def main() -> None:
    url = os.environ.get("DATABASE_URL", "")
    if not url:
        raise SystemExit("[run] DATABASE_URL is not set")
    bootstrap(url)

    rest_env = {**os.environ,
                "PGRST_DB_URI": url,
                # cloud databases rarely allow CREATE ROLE: the owner role serves REST, the app gates access
                "PGRST_DB_ANON_ROLE": os.environ.get("PGRST_DB_ANON_ROLE") or unquote(urlparse(url).username or ""),
                "PGRST_DB_SCHEMAS": "public",
                "PGRST_OPENAPI_MODE": "disabled",
                "PGRST_DB_MAX_ROWS": "5000",
                "PGRST_DB_POOL": os.environ.get("PGRST_DB_POOL", "8"),
                "PGRST_SERVER_HOST": os.environ.get("PGRST_SERVER_HOST", "127.0.0.1"),
                "PGRST_SERVER_PORT": str(REST_PORT),
                "PGRST_LOG_LEVEL": "error"}
    procs: list[subprocess.Popen] = []

    def stop(*_):
        for p in procs:
            if p.poll() is None:
                p.terminate()
        for p in procs:
            try:
                p.wait(timeout=10)
            except subprocess.TimeoutExpired:
                p.kill()
        sys.exit(0)

    signal.signal(signal.SIGTERM, stop)
    signal.signal(signal.SIGINT, stop)

    rest = subprocess.Popen(["postgrest"], env=rest_env)
    procs.append(rest)
    wait_http(f"http://127.0.0.1:{REST_PORT}/system_settings?limit=1", rest, 60)
    say("PostgREST up")

    app_env = {**os.environ, "PUBLIC": "1", "POSTGREST_URL": f"http://127.0.0.1:{REST_PORT}"}
    for key in ("PGRST_DB_URI", "DATABASE_URL"):          # the app never needs the database password
        app_env.pop(key, None)
    app = subprocess.Popen([sys.executable, str(ROOT / "server" / "app.py")], env=app_env)
    procs.append(app)
    say(f"app starting on port {os.environ.get('PORT', '10000')}")

    while True:
        for p in procs:
            if p.poll() is not None:
                say(f"{'PostgREST' if p is rest else 'app'} exited with {p.returncode}; stopping")
                stop()
        time.sleep(2)


if __name__ == "__main__":
    main()
