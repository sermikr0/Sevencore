"""End-to-end test of the employee Mini App API with real face images.

Runs against a second server instance so the user's running server is untouched:
    BOT_POLLING=0 LIVENESS=0 APP_PORT=8890 TMA_PORT=8891 python3 server/app.py &
    python3 tests/test_api.py --faces DIR        (DIR has p1.jpg, p2.jpg, p3.jpg: three different people)

It uses fake Telegram ids 777000001/777000002 and deletes everything it wrote at the end.
"""
from __future__ import annotations

import argparse
import io
import os
import sys
import time
from datetime import datetime, timedelta, timezone
from pathlib import Path
from zoneinfo import ZoneInfo

import httpx
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "server"))
from tma.telegram import sign_init_data  # noqa: E402

A, B = 777000001, 777000002
OFFICE = {"lat": 41.279986, "lng": 69.251817, "accuracy": 18}          # GEOFENCE_LAT/LNG in .env
FAR = {"lat": 41.311081, "lng": 69.240562, "accuracy": 15}          # ~3.5 km away
fails = 0


def env() -> dict:
    out = {}
    for line in (ROOT / ".env").read_text().splitlines():
        if "=" in line and not line.strip().startswith("#"):
            k, v = line.split("=", 1)
            out[k.strip()] = v.strip()
    for key in ("POSTGREST_URL", "REQUIRE_PASSKEY"):     # overrides for a test instance started with other settings
        if os.environ.get(key):
            out[key] = os.environ[key]
    return out


def check(name: str, ok: bool, detail="") -> None:
    global fails
    print(("ok   " if ok else "FAIL ") + name + ("" if ok else f"  -> {str(detail)[:400]}"))
    fails += not ok


def frame(path: Path) -> bytes:
    img = Image.open(path).convert("RGB").resize((470, 470))
    canvas = Image.new("RGB", (640, 480), (40, 40, 44))
    canvas.paste(img, (85, 5))
    buf = io.BytesIO()
    canvas.save(buf, "JPEG", quality=85)
    return buf.getvalue()


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--faces", required=True)
    ap.add_argument("--base", default="http://127.0.0.1:8891")
    ap.add_argument("--admin", default="http://127.0.0.1:8890")
    args = ap.parse_args()
    cfg = env()
    token, rest = cfg["BOT_TOKEN"], cfg.get("POSTGREST_URL", "http://127.0.0.1:55441")
    faces = {n: frame(Path(args.faces) / f"{n}.jpg") for n in ("p1", "p2", "p3")}
    c = httpx.Client(base_url=args.base, timeout=30)
    db = httpx.Client(base_url=rest, timeout=10)

    def hdr(tg: int, **extra) -> dict:
        user = {"id": tg, "first_name": "Test", "last_name": str(tg)[-2:], "language_code": "uz", **extra}
        return {"X-Init-Data": sign_init_data(user, token)}

    def call(tg: int, path: str, body=None, raw: bytes | None = None, headers=None):
        h = headers or hdr(tg)
        if raw is not None:
            return c.post(path, content=raw, headers={**h, "Content-Type": "image/jpeg"})
        return c.post(path, json=body or {}, headers=h)

    def run_scan(tg: int, scan: dict, face: str, limit: int = 12) -> dict:
        view = scan
        for _ in range(limit):
            r = call(tg, f"/api/scan/{view['scan_id']}/frame", raw=faces[face])
            if r.status_code != 200:
                return {"http": r.status_code, **r.json()}
            view = r.json()["scan"]
            if view["stage"] in ("done", "failed"):
                return view
        return view

    def cleanup() -> None:
        for tg in (A, B):
            for table in ("attendance_logs", "face_profiles", "team_schedules", "employees"):
                db.delete(f"/{table}", params={"telegram_id": f"eq.{tg}"})

    cleanup()
    try:
        passkey = db.get("/organization_security", params={"key_name": "eq.terminal_access_code", "select": "passkey"}).json()[0]["passkey"]

        # --- identity
        r = c.post("/api/me", json={})
        check("no initData -> 401", r.status_code == 401 and r.json()["error"] == "not_telegram", r.text)
        forged = sign_init_data({"id": A, "first_name": "X"}, "123:not-the-real-token")
        r = c.post("/api/me", json={}, headers={"X-Init-Data": forged})
        check("initData signed with another token -> 401", r.status_code == 401, r.text)
        old = sign_init_data({"id": A, "first_name": "X"}, token, auth_date=int(time.time()) - 3 * 86400)
        r = c.post("/api/me", json={}, headers={"X-Init-Data": old})
        check("3-day-old initData -> 401", r.status_code == 401, r.text)
        r = call(A, "/api/me")
        check("new user -> registered false", r.status_code == 200 and r.json()["registered"] is False, r.text)

        # --- registration
        need_pk = cfg.get("REQUIRE_PASSKEY", "0") == "1"
        check(f"app told whether a passkey is needed ({need_pk})", call(A, "/api/me").json().get("passkey") is need_pk)
        if need_pk:
            r = call(A, "/api/register", {"first_name": "Aziz", "last_name": "Testov", "department": "7CORE", "passkey": "WRONG"})
            check("wrong passkey -> 403", r.status_code == 403 and r.json()["error"] == "bad_passkey", r.text)
        r = call(A, "/api/register", {"first_name": "<b>x</b>", "last_name": "Y", "department": "7CORE"})
        check("markup in name refused", r.status_code == 400 and r.json()["error"] == "bad_name", r.text)
        r = call(A, "/api/register", {"first_name": "Aziz", "last_name": "Testov", "department": "NOPE"})
        check("unknown department refused", r.status_code == 400, r.text)
        body = {"first_name": "Aziz", "last_name": "Testov", "department": "7CORE"}
        if need_pk:
            body["passkey"] = passkey.lower()
        r = call(A, "/api/register", body)
        check("registration accepted " + ("(passkey, case-insensitive)" if need_pk else "without any passkey"), r.status_code == 200, r.text)
        check("no employee row before Face ID", db.get("/employees", params={"telegram_id": f"eq.{A}"}).json() == [])
        v = run_scan(A, r.json()["scan"], "p1")
        check("enrolment with face 1 -> done", v.get("stage") == "done" and v["result"]["kind"] == "enrolled", v)
        emp = db.get("/employees", params={"telegram_id": f"eq.{A}"}).json()
        check("employee row written (Shift Unassigned, 7CORE)",
              len(emp) == 1 and emp[0]["shift_name"] == "Shift Unassigned" and emp[0]["department"] == "7CORE"
              and emp[0]["first_name"] == "Aziz" and (emp[0]["photo_url"] or "").startswith("data:image/jpeg"), emp)
        r = httpx.get(f"{args.admin}/rest/v1/face_profiles?select=*")
        check("no database proxy on the panel (face templates unreachable)", r.status_code == 404, r.status_code)
        r = call(A, "/api/register", {"first_name": "Aziz", "last_name": "Testov", "department": "7CORE", "passkey": passkey})
        check("second registration refused", r.status_code == 409, r.text)

        # --- shift gate
        me = call(A, "/api/me").json()
        check("me: registered + enrolled, blocked no_shift",
              me["registered"] and me["enrolled"] and me["state"]["blocked"]["code"] == "no_shift", me.get("state"))
        r = call(A, "/api/scan", {"location": OFFICE})
        check("scan without a shift -> 409 blocked", r.status_code == 409 and r.json()["blocked"]["code"] == "no_shift", r.text)

        tz = ZoneInfo(cfg.get("APP_TZ", "Asia/Tashkent"))
        now = datetime.now(tz)
        start, end = (now - timedelta(minutes=10)).strftime("%H:%M"), (now + timedelta(hours=8)).strftime("%H:%M")
        days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
        db.patch("/employees", params={"telegram_id": f"eq.{A}"},
                 json={"shift_name": "Test Shift", "shift_start_time": start, "shift_end_time": end, "shift_days": days})
        me = call(A, "/api/me").json()
        check("after the manager assigns a shift -> check_in, 10 min late (closes 15 min after the start)",
              me["state"]["action"] == "check_in" and me["state"]["late_min"] in (9, 10, 11), me["state"])

        # --- location
        r = call(A, "/api/scan", {})
        check("no location -> 403", r.status_code == 403 and r.json()["error"] == "no_location", r.text)
        r = call(A, "/api/scan", {"location": FAR})
        check("3.5 km away -> 403 too_far", r.status_code == 403 and r.json()["error"] == "too_far" and r.json()["distance_m"] > 3000, r.text)

        # --- impostor
        r = call(A, "/api/scan", {"location": OFFICE})
        check("scan started at the office", r.status_code == 200 and r.json()["action"] == "check_in", r.text)
        v = run_scan(A, r.json()["scan"], "p3")
        check("another person's face -> no_match", v.get("stage") == "failed" and v["result"]["reason"] == "no_match", v)
        check("no attendance row after the impostor", db.get("/attendance_logs", params={"telegram_id": f"eq.{A}"}).json() == [])

        # --- check-in
        r = call(A, "/api/scan", {"location": OFFICE})
        v = run_scan(A, r.json()["scan"], "p1")
        res = v.get("result") or {}
        check("own face -> check-in done", v.get("stage") == "done" and res.get("action") == "check_in", v)
        check("late recorded", res.get("late_min", 0) >= 9, res)
        logs = db.get("/attendance_logs", params={"telegram_id": f"eq.{A}", "select": "*"}).json()
        check("attendance_logs row (check_in, note, photo, distance 0)",
              len(logs) == 1 and logs[0]["action_type"] == "check_in" and "late" in logs[0]["note"]
              and logs[0]["photo_url"].startswith("data:image/jpeg") and logs[0]["distance_meters"] == 0, logs)
        r = call(A, "/api/scan", {"location": OFFICE})
        check("immediate second scan -> 409 too_soon", r.status_code == 409 and r.json()["error"] == "too_soon", r.text)

        # --- check-out is locked until the shift end
        me = call(A, "/api/me").json()
        check("me: on shift, check-out locked until the shift end",
              me["state"]["action"] is None and (me["state"]["blocked"] or {}).get("code") == "checkout_not_yet"
              and me["state"]["blocked"]["opens"] == end and me["state"]["open_since"], me["state"])
        time.sleep(1)
        r = call(A, "/api/scan", {"location": OFFICE})
        check("check-out scan before the shift end -> 409", r.status_code == 409 and r.json().get("error") in ("blocked", "too_soon"), r.text)

        # --- the shift ended 5 min ago (check-in 3 h ago): the 2 h check-out window is open
        back = (datetime.now(timezone.utc) - timedelta(hours=3)).isoformat()
        db.patch("/attendance_logs", params={"id": f"eq.{logs[0]['id']}"}, json={"timestamp": back})
        db.patch("/employees", params={"telegram_id": f"eq.{A}"},
                 json={"shift_start_time": (datetime.now(tz) - timedelta(hours=3, minutes=10)).strftime("%H:%M"),
                       "shift_end_time": (datetime.now(tz) - timedelta(minutes=5)).strftime("%H:%M")})
        me = call(A, "/api/me").json()
        check("me: shift over -> check_out open for 2 h",
              me["state"]["action"] == "check_out" and me["state"].get("closes") and me["day"]["worked_min"] >= 179, me["state"])
        r = call(A, "/api/scan", {"location": FAR})
        check("check-out away from the office -> 403 too_far", r.status_code == 403 and r.json()["error"] == "too_far", r.text)
        r = call(A, "/api/scan", {"location": OFFICE})
        check("check-out scan at the office", r.status_code == 200 and r.json()["action"] == "check_out", r.text)
        v = run_scan(A, r.json()["scan"], "p1")
        res = v.get("result") or {}
        check("check-out done, ~3 h worked, not early",
              v.get("stage") == "done" and res.get("action") == "check_out" and 179 <= res.get("worked_min", 0) <= 181
              and not res.get("early_min"), res)
        me = call(A, "/api/me").json()
        check("after check-out: closed until the next check-in window", me["state"]["action"] is None, me["state"])
        me = call(A, "/api/me").json()
        check("history shows both marks", [h["action"] for h in me["history"][:2]] == ["check_out", "check_in"], me["history"][:2])

        # --- one face, one account
        r = call(B, "/api/register", {"first_name": "Malika", "last_name": "Testova", "department": "HOS", "passkey": passkey})
        v = run_scan(B, r.json()["scan"], "p1")
        check("face 1 on a second account -> face_taken", v.get("stage") == "failed" and v["result"]["reason"] == "face_taken", v)
        check("no employee row for the refused account", db.get("/employees", params={"telegram_id": f"eq.{B}"}).json() == [])
        r = call(B, "/api/register", {"first_name": "Malika", "last_name": "Testova", "department": "HOS", "passkey": passkey})
        v = run_scan(B, r.json()["scan"], "p3")
        check("second account with its own face -> enrolled", v.get("stage") == "done", v)

        # --- admin Face ID reset
        a = httpx.Client(base_url=args.admin, timeout=10)
        r = a.post("/auth/login", json={"username": cfg["ADMIN_USERNAME"], "password": cfg["ADMIN_PASSWORD"]},
                   headers={"X-Requested-With": "sevencore"})
        check("admin login", r.status_code == 200, r.text)
        a.cookies.set("ops_session", r.cookies.get("ops_session") or "")   # PUBLIC=1 marks it Secure; tests use http
        lst = a.get("/api/panel/employees").json()["rows"]
        row = next((e for e in lst if e["telegram_id"] == A), None)
        check("panel employee list shows Face ID enrolled (2 checks)", bool(row and row["face"] and row["face"]["checks"] == 2), row)
        r = a.delete(f"/api/panel/employees/{A}/face")
        check("reset without CSRF header refused", r.status_code == 403, r.text)
        r = a.delete(f"/api/panel/employees/{A}/face", headers={"X-Requested-With": "sevencore"})
        check("admin resets Face ID", r.status_code == 200, r.text)
        me = call(A, "/api/me").json()
        check("after reset: registered, not enrolled", me["registered"] and not me["enrolled"], me)
        r = call(A, "/api/register", {})
        check("re-enrolment needs no passkey", r.status_code == 200, r.text)
        v = run_scan(A, r.json()["scan"], "p1")
        check("re-enrolled with the same face", v.get("stage") == "done", v)
        r = httpx.get(f"{args.admin}/api/panel/employees")
        check("panel API needs a session", r.status_code == 401, r.status_code)
    finally:
        cleanup()
        left = sum(len(db.get(f"/{t}", params={"telegram_id": f"in.({A},{B})"}).json())
                   for t in ("attendance_logs", "face_profiles", "employees"))
        print(f"cleanup: {left} test rows left")
    print(f"\n{'all passed' if not fails else str(fails) + ' FAILED'}")
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
