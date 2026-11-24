"""Telegram: Mini App initData validation and the bot (long polling).

initData is signed by Telegram with a key derived from the bot token, so the server knows
which Telegram account opened the app; nothing the page sends about identity is trusted.
"""
from __future__ import annotations

import asyncio
import hashlib
import hmac
import html
import json
import logging
import time
from typing import Awaitable, Callable
from urllib.parse import parse_qsl, urlencode

import httpx

from . import texts

log = logging.getLogger("sevencore.bot")


class InitDataError(Exception):
    pass


def _secret(bot_token: str) -> bytes:
    return hmac.new(b"WebAppData", bot_token.encode(), hashlib.sha256).digest()


def _digest(fields: dict[str, str], secret: bytes) -> str:
    check = "\n".join(f"{k}={fields[k]}" for k in sorted(fields))
    return hmac.new(secret, check.encode(), hashlib.sha256).hexdigest()


def validate_init_data(init_data: str, bot_token: str, max_age: int) -> dict:
    """Verify Telegram.WebApp.initData and return the Telegram user it carries."""
    if not init_data or len(init_data) > 8192:
        raise InitDataError("missing")
    fields = dict(parse_qsl(init_data, keep_blank_values=True))
    received = fields.pop("hash", "")
    if not received:
        raise InitDataError("no hash")
    secret = _secret(bot_token)
    ok = hmac.compare_digest(_digest(fields, secret), received)
    if not ok and "signature" in fields:
        ok = hmac.compare_digest(_digest({k: v for k, v in fields.items() if k != "signature"}, secret), received)
    if not ok:
        raise InitDataError("bad hash")
    try:
        auth_date = int(fields.get("auth_date", "0"))
        user = json.loads(fields.get("user", ""))
    except ValueError as exc:
        raise InitDataError("malformed") from exc
    if max_age and time.time() - auth_date > max_age:
        raise InitDataError("expired")
    if not isinstance(user, dict) or not isinstance(user.get("id"), int) or user.get("is_bot"):
        raise InitDataError("no user")
    return user


def sign_init_data(user: dict, bot_token: str, auth_date: int | None = None) -> str:
    """initData built the way Telegram builds it. Used only by the local self-test."""
    fields = {
        "auth_date": str(auth_date or int(time.time())),
        "query_id": "AAHlocaltest",
        "user": json.dumps(user, separators=(",", ":"), ensure_ascii=False),
    }
    fields["hash"] = _digest(fields, _secret(bot_token))
    return urlencode(fields)


class TelegramError(Exception):
    pass


StatusFn = Callable[[int], Awaitable[dict | None]]


class Bot:
    """Long-polling bot: /start opens the Mini App, /status shows today, check-ins are confirmed in chat."""

    def __init__(self, token: str, admin_chats: list[int], status: StatusFn):
        self.token = token
        self.base = f"https://api.telegram.org/bot{token}/"
        self.admin_chats = admin_chats
        self.status = status
        self.client = httpx.AsyncClient(timeout=httpx.Timeout(70.0, connect=15.0))
        self.username = ""
        self.app_url = ""
        self.state = "starting"          # shown on /healthz: starting | polling | webhook-owned | conflict | error
        self._menu_url: str | None = None

    def clean(self, exc: Exception) -> str:
        return str(exc).replace(self.token, "<token>")

    async def api(self, method: str, **params):
        for attempt in range(3):
            try:
                resp = await self.client.post(self.base + method, json=params)
            except httpx.HTTPError as exc:
                raise TelegramError(f"{method}: {type(exc).__name__} {self.clean(exc)}") from None
            data = resp.json()
            if data.get("ok"):
                return data["result"]
            retry = (data.get("parameters") or {}).get("retry_after")
            if data.get("error_code") == 429 and retry and attempt < 2:
                await asyncio.sleep(min(float(retry), 60) + 0.5)
                continue
            raise TelegramError(f"{method}: {data.get('error_code')} {data.get('description')}")
        raise TelegramError(f"{method}: gave up")

    # ------------------------------------------------------------- setup

    async def configure(self) -> None:
        me = await self.api("getMe")
        self.username = me.get("username", "")
        for lang in texts.LANGS:
            scope = {} if lang == "en" else {"language_code": lang}
            await self.api("setMyCommands", commands=[{"command": c, "description": texts.t(lang, f"cmd_{c}")}
                                                      for c in ("start", "status", "help")], **scope)
            await self.api("setMyShortDescription", short_description=texts.t(lang, "short_description"), **scope)
            await self.api("setMyDescription", description=texts.t(lang, "description"), **scope)
        await self.set_menu()

    async def set_app_url(self, url: str) -> None:
        url = url.rstrip("/")
        if url == self.app_url:
            return
        self.app_url = url
        log.info("Mini App address: %s", url or "(none)")
        await self.set_menu()

    async def set_menu(self) -> None:
        target = self.app_url or ""
        if target == self._menu_url:
            return
        menu = ({"type": "web_app", "text": "Sevencore", "web_app": {"url": target + "/"}} if target
                else {"type": "commands"})
        try:
            await self.api("setChatMenuButton", menu_button=menu)
            self._menu_url = target
        except Exception as exc:
            log.warning("menu button not set: %s", self.clean(exc))

    # ------------------------------------------------------------- polling

    async def run(self) -> None:
        while True:
            try:
                await self.configure()
                break
            except asyncio.CancelledError:
                raise
            except Exception as exc:
                self.state = "error"
                log.warning("bot setup failed (%s); retrying in 30 s", self.clean(exc))
                await asyncio.sleep(30)
        try:
            hook = await self.api("getWebhookInfo")
            if hook.get("url"):
                self.state = "webhook-owned"
                log.warning("this bot is connected to a webhook (%s); local polling stays off", hook["url"])
                return
        except Exception as exc:
            log.warning("getWebhookInfo failed: %s", self.clean(exc))
        offset = None
        backoff = 1.0
        self.state = "polling"
        log.info("bot @%s is polling", self.username)
        while True:
            try:
                updates = await self.api("getUpdates", offset=offset, timeout=50, allowed_updates=["message"])
                backoff = 1.0
                self.state = "polling"
            except asyncio.CancelledError:
                raise
            except Exception as exc:
                if "409" in str(exc):
                    self.state = "conflict"
                    log.warning("another program is reading this bot's updates (409); retrying in 60 s")
                    await asyncio.sleep(60)
                    continue
                log.warning("getUpdates failed: %s", self.clean(exc))
                await asyncio.sleep(backoff)
                backoff = min(backoff * 2, 30.0)
                continue
            for update in updates:
                offset = update["update_id"] + 1
                try:
                    await self.on_message(update.get("message") or {})
                except Exception:
                    log.exception("update handler failed")

    async def close(self) -> None:
        await self.client.aclose()

    # ------------------------------------------------------------- messages

    def open_button(self, lang: str) -> dict | None:
        if not self.app_url:
            return None
        return {"inline_keyboard": [[{"text": texts.t(lang, "open_app"), "web_app": {"url": self.app_url + "/"}}]]}

    async def send(self, chat_id: int, text: str, lang: str = "uz", button: bool = True) -> None:
        params = {"chat_id": chat_id, "text": text, "parse_mode": "HTML", "link_preview_options": {"is_disabled": True}}
        markup = self.open_button(lang) if button else None
        if markup:
            params["reply_markup"] = markup
        elif button:
            params["text"] += "\n\n" + texts.t(lang, "offline")
        await self.api("sendMessage", **params)

    async def on_message(self, msg: dict) -> None:
        chat = msg.get("chat") or {}
        if chat.get("type") != "private":
            return
        user = msg.get("from") or {}
        lang = texts.pick(user.get("language_code"))
        text = (msg.get("text") or "").strip()
        command = text.split()[0].split("@")[0].lower() if text.startswith("/") else ""
        info = await self.status(int(user.get("id", 0)))
        if command == "/start":
            if not info:
                body = texts.t(lang, "welcome_new")
            else:
                body = texts.t(lang, "welcome_back", name=html.escape(info["name"])) + "\n\n" + self.status_line(lang, info)
            await self.send(chat["id"], body, lang)
        elif command == "/status":
            await self.send(chat["id"], self.status_line(lang, info) if info else texts.t(lang, "not_registered"), lang)
        elif command == "/help":
            await self.send(chat["id"], texts.t(lang, "help"), lang)
        else:
            await self.send(chat["id"], texts.t(lang, "use_button"), lang)

    @staticmethod
    def status_line(lang: str, info: dict) -> str:
        if not info.get("enrolled"):
            return texts.t(lang, "need_face")
        if info.get("open_since"):
            return texts.t(lang, "status_open", since=info["open_since"], worked=texts.duration(lang, info["worked_min"]))
        if info.get("last_out"):
            return texts.t(lang, "status_done", first=info["first_in"], last=info["last_out"],
                           worked=texts.duration(lang, info["worked_min"]))
        if info.get("blocked") == "no_shift":
            return texts.t(lang, "status_no_shift")
        if info.get("shift"):
            return texts.t(lang, "status_shift", shift=info["shift"])
        return texts.t(lang, "status_none")

    async def notify(self, chat_id: int, text: str, lang: str) -> None:
        """Best effort: a failed message never fails the check-in that triggered it."""
        try:
            await self.send(chat_id, text, lang, button=False)
        except Exception as exc:
            log.warning("notify %s failed: %s", chat_id, self.clean(exc))

    async def notify_attendance(self, chat_id: int, lang: str, name: str, result: dict) -> None:
        key = "notify_in" if result["action"] == "check_in" else "notify_out"
        body = texts.t(lang, key, time=result["time"], detail=texts.detail(lang, result))
        await self.notify(chat_id, body, lang)
        if self.admin_chats:
            label = "check-in" if result["action"] == "check_in" else "check-out"
            line = f"<b>{html.escape(name)}</b> · {label} {result['time']}"
            if result.get("late_min"):
                line += f" · late {result['late_min']} min"
            if result.get("early_min"):
                line += f" · left {result['early_min']} min early"
            for admin in self.admin_chats:
                await self.notify(admin, line, "en")
