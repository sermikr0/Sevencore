#!/usr/bin/env python3
"""Build site/ from the saved OpSector files (build/*.orig.*). Re-runnable; originals are never changed.

Changes made to the copy, and nothing else:
  1. Data connection: the hardcoded Supabase project URL/key → this server's own origin
     (location.origin), and the "must start with https://" check also accepts http://localhost.
  2. Built-in backdoors removed: admin master password, universal manager passwords, the author's
     developer account, the passkey fallback, and the in-browser password comparisons (sign-in is
     done by the server now: server/accounts.py).
  3. index.html: stylesheet → assets/app.css (rebuilt with Tailwind, see css/input.css); the old
     settings.js overlay is dropped (the server injects session.js + users.js on /admin, /manager).
  4. Missing images (logo.png, logo2.png, logo3.png, favicon.png) → SEVENCORE wordmark placeholders.
  6. Branding: every "OpSector" text (UI, page title, storage key) → "Sevencore".
  5. New pages from build/extra/: login page (/) and the Users & Roles panel (users.js).
"""
from __future__ import annotations

import hashlib
import re
import shutil
import subprocess
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent
SITE = ROOT / "site"
ORIG_URL = "https://zdxkmfobwyqjbspkdzia.supabase.co"
ORIG_KEY = "sb_publishable_UylLo81fFeTi7rcEoer69g_QJ7ORf1r"
LOCAL_KEY = "sb_publishable_opsector_local_not_a_secret"     # same prefix: supabase-js keeps the same header logic
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"


def replace_once(text: str, old: str, new: str, label: str) -> str:
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"{label}: expected 1 occurrence, found {count}")
    return text.replace(old, new)


def build_bundle() -> str:
    js = (HERE / "index-prod.orig.js").read_text(encoding="utf-8")
    js = replace_once(js, f"`{ORIG_URL}`", "(typeof location<`u`?location.origin:``)", "supabase url")
    js = replace_once(js, f"`{ORIG_KEY}`", f"`{LOCAL_KEY}`", "supabase key")
    js = replace_once(js, "n.startsWith(`https://`)&&!n.includes(`your-project-id`)",
                      "/^https?:\\/\\//.test(n)&&!n.includes(`your-project-id`)", "https check")
    if ORIG_URL.split("//")[1].split(".")[0] in js:
        raise SystemExit("original project ref still present in the bundle")
    # backdoors: every in-bundle credential check is turned off (sign-in happens on the server)
    js = replace_once(js, "(n===`admin`||n===`dispatcher`)&&r===`7core2026`", "!1", "admin master password")
    js = js.replace("r===`manager2026`||r===`7core2026`||r===`DANTEFERRO2026!`", "!1")          # 2 places
    js = replace_once(js, "n===`NAJMIDDIN`&&r===`DANTEFERRO2026!`", "!1", "developer backdoor")
    js = js.replace("e.password===r||e.password_hash===r", "!1")                                  # 3 places
    js = replace_once(js, "return t===`7CORE355`", "return!1", "passkey fallback")
    js = replace_once(js, "return`7CORE355`", "return``", "passkey display fallback")
    js = replace_once(js, "useState)(`NAJMIDDIN`)", "useState)(``)", "dev login prefill")
    js = js.replace("`NAJMIDDIN`", "``")
    js = replace_once(js, " Default master password is 7core2026.", "", "admin hint")
    js = replace_once(js, " Try password manager2026.", "", "manager hint")
    for secret in ("7core2026", "manager2026", "DANTEFERRO2026!", "7CORE355", "NAJMIDDIN"):
        if secret in js:
            raise SystemExit(f"credential still present in the bundle: {secret}")
    return rebrand(js)


def rebrand(text: str) -> str:
    """The product is shown as Sevencore everywhere; the name OpSector is not used."""
    text = text.replace("OPSECTOR", "SEVENCORE")
    text = re.sub(r"Op[sS]ector", "Sevencore", text)
    text = text.replace("opsector", "sevencore")
    if re.search(r"(?i)opsector", text):
        raise SystemExit("the OpSector name is still present")
    return text


def build_index() -> str:
    html = (HERE / "index.orig.html").read_text(encoding="utf-8")
    html = replace_once(html, '<link rel="stylesheet" crossorigin href="/assets/index-nDAUbqy3.css">',
                        '<link rel="stylesheet" href="/assets/app.css">', "stylesheet link")
    html = replace_once(html, '    <script src="/settings.js"></script>\n', "", "settings overlay")
    html = html.replace("<title>OpSector - Fleet Logistics Attendance & TMS</title>", "<title>Sevencore Attendance</title>")
    return rebrand(html)


def build_css() -> None:
    css = HERE / "css"
    for src, dst in (("index-prod.orig.js", "src-bundle.js"), ("settings.orig.js", "src-settings.js"),
                     ("index.orig.html", "src-index.html")):
        shutil.copy2(HERE / src, css / dst)
    subprocess.run(["npx", "@tailwindcss/cli", "-i", "input.css", "-o", str(SITE / "assets" / "app.css"), "--minify"],
                   cwd=css, check=True, capture_output=True)


def wordmark(path: Path, text: str, height: int = 120) -> None:
    font = ImageFont.truetype(FONT, int(height * 0.46))
    probe = ImageDraw.Draw(Image.new("RGBA", (1, 1)))
    tw = probe.textbbox((0, 0), text, font=font)[2]
    mark = height
    img = Image.new("RGBA", (mark + int(height * 0.25) + tw + 8, height), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle((4, 4, mark - 4, mark - 4), radius=int(height * 0.24), fill=(239, 68, 68, 255))
    d.rounded_rectangle((int(mark * .3), int(mark * .3), int(mark * .7), int(mark * .7)), radius=int(height * .08),
                        outline=(255, 255, 255, 255), width=max(4, height // 14))
    d.text((mark + int(height * 0.25), height / 2), text, font=font, fill=(239, 68, 68, 255), anchor="lm")
    img.save(path)


def favicon(path: Path) -> None:
    img = Image.new("RGBA", (64, 64), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle((2, 2, 62, 62), radius=16, fill=(239, 68, 68, 255))
    d.rounded_rectangle((20, 20, 44, 44), radius=5, outline=(255, 255, 255, 255), width=5)
    img.save(path)


def main() -> None:
    (SITE / "assets").mkdir(parents=True, exist_ok=True)
    (SITE / "assets" / "index-prod.js").write_text(build_bundle(), encoding="utf-8")
    (SITE / "settings.js").unlink(missing_ok=True)
    for name in ("login.html", "login.css", "login.js", "users.js"):
        (SITE / name).write_text(rebrand((HERE / "extra" / name).read_text(encoding="utf-8")), encoding="utf-8")
    (SITE / "index.html").write_text(build_index(), encoding="utf-8")
    build_css()
    for name in ("logo.png", "logo2.png", "logo3.png"):
        wordmark(SITE / name, "SEVENCORE")
    favicon(SITE / "favicon.png")
    for f in sorted(SITE.rglob("*")):
        if f.is_file():
            digest = hashlib.sha256(f.read_bytes()).hexdigest()[:12]
            print(f"  {f.relative_to(SITE)!s:24} {f.stat().st_size:>9,} B  {digest}")


if __name__ == "__main__":
    main()
