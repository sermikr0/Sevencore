"""Checks for the cloud build (PUBLIC=1, one port): panel closed without sign-in, no database proxy, Mini App under /tma/.

Run against a PUBLIC=1 instance (local or the container, see README "Render"):
    PUBLIC=1 PORT=18790 BOT_POLLING=0 AUTO_CLOSE=0 python3 server/app.py &
    python3 tests/test_public.py --base http://127.0.0.1:18790
Admin credentials come from .env (ADMIN_USERNAME / ADMIN_PASSWORD).
"""
from __future__ import annotations

import argparse
import sys
from pathlib import Path

import httpx

ROOT = Path(__file__).resolve().parent.parent
failures = 0


def check(name: str, ok: bool, detail="") -> None:
    global failures
    print(f"  {'PASS' if ok else 'FAIL'}  {name}" + ("" if ok else f"   -> {str(detail)[:200]}"))
    failures += 0 if ok else 1


def env() -> dict:
    out = {}
    for line in (ROOT / ".env").read_text().splitlines():
        if "=" in line and not line.strip().startswith("#"):
            k, v = line.split("=", 1)
            out[k.strip()] = v.strip()
    return out


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--base", default="http://127.0.0.1:18790")
    args = ap.parse_args()
    cfg = env()
    anon = httpx.Client(base_url=args.base, timeout=10, follow_redirects=False)

    print("public mode, signed out")
    r = anon.get("/healthz")
    check("healthz: database up", r.status_code == 200 and r.json().get("db") == "up", r.text)
    check("healthz: Mini App path is /tma/", r.json().get("miniapp") == "/tma/", r.text)
    check("HSTS header", "max-age" in r.headers.get("strict-transport-security", ""), dict(r.headers))
    for path in ("/api/panel/overview", "/api/panel/marks", "/api/panel/employees", "/api/panel/reports", "/api/panel/settings",
                 "/api/panel/events", "/api/panel/reports.xlsx", "/api/panel/marks.csv", "/auth/users"):
        r = anon.get(path)
        check(f"{path} without sign-in -> refused", r.status_code in (401, 403), r.status_code)
    for path in ("/rest/v1/employees?select=*", "/rest/v1/organization_security", "/realtime/v1/websocket", "/mobile", "/session.js"):
        r = anon.get(path)
        check(f"{path} does not exist", r.status_code == 404, r.status_code)
    r = anon.get("/api/panel/employees", cookies={"ops_session": "forged.abc"})
    check("forged session cookie -> 401", r.status_code == 401, r.status_code)
    r = anon.get("/app")
    check("/app without sign-in -> sign-in page", r.status_code == 303 and r.headers.get("location") == "/", r.status_code)
    r = anon.get("/admin")
    check("/admin -> /app", r.status_code == 301 and r.headers.get("location") == "/app", r.status_code)
    r = anon.get("/")
    csp = r.headers.get("content-security-policy", "")
    check("sign-in page with a strict CSP", r.status_code == 200 and "frame-ancestors 'none'" in csp and "script-src 'self'" in csp, csp)
    for path in ("/panel/app.css", "/panel/js/main.js", "/panel/js/core.js", "/panel/js/login.js", "/panel/favicon.svg"):
        check(f"{path}", anon.get(path).status_code == 200)

    r = anon.get("/tma")
    check("/tma redirects to /tma/", r.status_code in (301, 307, 308) and r.headers.get("location", "").endswith("/tma/"),
          (r.status_code, r.headers.get("location")))
    r = anon.get("/tma/")
    check("Mini App page", r.status_code == 200 and 'src="app.js"' in r.text, r.status_code)
    check("Mini App may be framed only by Telegram", "frame-ancestors https://web.telegram.org" in r.headers.get(
        "content-security-policy", ""))
    r = anon.post("/tma/api/me", json={})
    check("Mini App API without Telegram signature -> 401", r.status_code == 401, r.text)

    print("signed in")
    s = httpx.Client(base_url=args.base, timeout=20, follow_redirects=False, headers={"X-Requested-With": "sevencore"})
    r = s.post("/auth/login", json={"username": cfg["ADMIN_USERNAME"], "password": cfg["ADMIN_PASSWORD"]})
    check("admin sign-in", r.status_code == 200 and r.json().get("redirect") == "/app", r.text)
    set_cookie = r.headers.get("set-cookie", "")
    check("session cookie is Secure + HttpOnly + SameSite=strict",
          "Secure" in set_cookie and "HttpOnly" in set_cookie and "samesite=strict" in set_cookie.lower(), set_cookie)
    token = r.cookies.get("ops_session")
    jar = {"ops_session": token}
    r = s.get("/app", cookies=jar)
    check("/app with a session -> panel", r.status_code == 200 and "/panel/js/main.js" in r.text, r.status_code)
    r = s.get("/api/panel/me", cookies=jar)
    check("panel API with a session", r.status_code == 200 and r.json()["perms"]["accounts"], r.text[:200])
    r = s.get("/api/panel/settings", cookies=jar)
    check("employee passkey exists", bool(r.json().get("passkey")), r.text[:200])
    r = httpx.post(f"{args.base}/api/panel/marks", json={}, cookies=jar)
    check("write without the X-Requested-With header -> 403", r.status_code == 403, r.status_code)
    r = anon.get("/api/panel/me", cookies={"ops_session": "x" + token})
    check("tampered token -> 401", r.status_code == 401, r.status_code)

    print("login throttling")
    codes = []
    for i in range(22):
        r = anon.post("/auth/login", json={"username": "throttle-probe", "password": "wrong-password"},
                      headers={"X-Requested-With": "sevencore", "X-Forwarded-For": f"10.9.{i}.1"})
        codes.append(r.status_code)
    check("per-username lock even with rotating X-Forwarded-For", codes[-1] == 429, codes)

    print(f"\n{'ALL PASSED' if not failures else f'{failures} FAILED'}")
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
