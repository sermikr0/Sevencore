"""Bot texts (Uzbek, Russian, English). The Mini App has its own copy in miniapp/i18n.js."""
from __future__ import annotations

LANGS = ("uz", "ru", "en")

T: dict[str, dict[str, str]] = {
    "uz": {
        "cmd_start": "Ilovani ochish",
        "cmd_status": "Bugungi holat",
        "cmd_help": "Yordam",
        "short_description": "Sevencore davomati: Face ID bilan check-in va check-out.",
        "description": "Sevencore xodimlari uchun davomat boti.\n\nIlovani oching, o'rtadagi doirani bosing, "
                       "Face ID tekshiruvidan o'ting. Check-in yoki check-out avtomatik aniqlanadi.",
        "open_app": "📸 Davomat ilovasini ochish",
        "welcome_new": "👋 <b>Sevencore davomatiga xush kelibsiz!</b>\n\nBirinchi marta ism-familiyangizni yozasiz, "
                       "passkey kiritasiz va Face ID'ni sozlaysiz. Bu bir marta qilinadi.\n\nKeyin har kuni ilovani "
                       "ochib, o'rtadagi doirani bosasiz, shunda check-in yoki check-out qilinadi.",
        "welcome_back": "👋 Salom, <b>{name}</b>!",
        "not_registered": "Siz hali ro'yxatdan o'tmagansiz. Ilovani ochib, ro'yxatdan o'ting.",
        "need_face": "Face ID hali sozlanmagan. Ilovani ochib, uni sozlang.",
        "status_open": "🟢 Ishdasiz: {since} dan beri, {worked} ishladingiz.",
        "status_done": "✅ Bugun: {first} – {last}, jami {worked}.",
        "status_no_shift": "⏳ Smena hali biriktirilmagan. Menejeringiz smena belgilagandan keyin check-in qila olasiz.",
        "status_shift": "📅 Bugungi smena: {shift}.",
        "status_none": "Bugun check-in qilinmagan.",
        "help": "<b>Qanday ishlaydi</b>\n1. Ilovani oching (pastdagi tugma).\n2. O'rtadagi doirani bosing.\n"
                "3. Yuzingizni doiraga to'g'rilang va ko'rsatilgan tomonga sekin buriling.\n\n"
                "Check-in faqat ofis hududida (joylashuv yoqilgan holda) va smena vaqtida ishlaydi.",
        "use_button": "Check-in va check-out ilova orqali qilinadi 👇",
        "offline": "⚠️ Ilova manzili hali ulanmagan. Administratorga xabar bering.",
        "who_manager": "Menejer", "who_admin": "Admin",
        "act_check_in": "Check-in", "act_check_out": "Check-out",
        "panel_added": "📝 {who} davomatingizga yozuv qo'shdi: <b>{action}</b> {when}.",
        "panel_changed": "✏️ {who} yozuvingizni o'zgartirdi: <b>{action}</b> {old} → <b>{new}</b>.",
        "panel_deleted": "🗑 {who} yozuvingizni o'chirdi: <b>{action}</b> {when}.",
        "shift_set": "🗓 {who} smenangizni belgiladi: <b>{start} – {end}</b> · {days}.\n"
                     "Check-in: {in_open} – {in_close}. Check-out: {end} – {out_close}.\n"
                     "Bugungi kun o'zgarmaydi, yangi smena keyingi kundan amal qiladi.",
        "shift_removed": "🗓 {who} smenangizni olib tashladi. Yangi smena belgilanguncha check-in yopiq.",
        "auto_closed": "⚠️ {date} smenasida check-out qilinmadi. Yozuv smena tugagan vaqtda ({end}) avtomatik yopildi. "
                       "Xato bo'lsa, menejeringizga yozing.",
        "days_short": "Du,Se,Ch,Pa,Ju,Sh,Ya",
        "notify_in": "✅ <b>Check-in</b> {time}\n{detail}",
        "notify_out": "👋 <b>Check-out</b> {time}\n{detail}",
        "on_time": "O'z vaqtida",
        "late": "{n} kechikdingiz",
        "early": "{n} erta ketdingiz",
        "worked": "Ishlagan vaqt: {n}",
        "distance": "Ofisdan {n} m",
        "h": "{n} soat", "m": "{n} daqiqa", "hm": "{h} soat {m} daqiqa",
    },
    "ru": {
        "cmd_start": "Открыть приложение",
        "cmd_status": "Статус за сегодня",
        "cmd_help": "Помощь",
        "short_description": "Учёт рабочего времени Sevencore: вход и выход по Face ID.",
        "description": "Бот учёта рабочего времени для сотрудников Sevencore.\n\nОткройте приложение, нажмите на круг "
                       "в центре и пройдите Face ID. Вход или выход определяется автоматически.",
        "open_app": "📸 Открыть приложение",
        "welcome_new": "👋 <b>Добро пожаловать в Sevencore!</b>\n\nОдин раз укажите имя и фамилию, введите passkey "
                       "и настройте Face ID.\n\nДальше каждый день: откройте приложение и нажмите на круг в центре.",
        "welcome_back": "👋 Здравствуйте, <b>{name}</b>!",
        "not_registered": "Вы ещё не зарегистрированы. Откройте приложение, чтобы зарегистрироваться.",
        "need_face": "Face ID ещё не настроен. Откройте приложение и настройте его.",
        "status_open": "🟢 На смене с {since}, отработано {worked}.",
        "status_done": "✅ Сегодня: {first} – {last}, всего {worked}.",
        "status_no_shift": "⏳ Смена ещё не назначена. Отметиться можно после того, как менеджер назначит смену.",
        "status_shift": "📅 Смена сегодня: {shift}.",
        "status_none": "Сегодня отметок нет.",
        "help": "<b>Как это работает</b>\n1. Откройте приложение (кнопка ниже).\n2. Нажмите на круг в центре.\n"
                "3. Поместите лицо в круг и медленно поверните голову в указанную сторону.\n\n"
                "Отметка прихода работает только в офисе (с включённой геолокацией) и во время смены.",
        "use_button": "Отметки делаются через приложение 👇",
        "offline": "⚠️ Адрес приложения ещё не подключён. Сообщите администратору.",
        "who_manager": "Менеджер", "who_admin": "Админ",
        "act_check_in": "Приход", "act_check_out": "Уход",
        "panel_added": "📝 {who} добавил отметку: <b>{action}</b> {when}.",
        "panel_changed": "✏️ {who} изменил отметку: <b>{action}</b> {old} → <b>{new}</b>.",
        "panel_deleted": "🗑 {who} удалил отметку: <b>{action}</b> {when}.",
        "shift_set": "🗓 {who} назначил смену: <b>{start} – {end}</b> · {days}.\n"
                     "Приход: {in_open} – {in_close}. Уход: {end} – {out_close}.\n"
                     "Сегодняшний день не меняется, новая смена действует со следующего дня.",
        "shift_removed": "🗓 {who} снял вашу смену. Отметка закрыта, пока не назначат новую.",
        "auto_closed": "⚠️ В смену {date} уход не отмечен. Запись закрыта автоматически в конце смены ({end}). "
                       "Если это ошибка, напишите менеджеру.",
        "days_short": "Пн,Вт,Ср,Чт,Пт,Сб,Вс",
        "notify_in": "✅ <b>Приход</b> {time}\n{detail}",
        "notify_out": "👋 <b>Уход</b> {time}\n{detail}",
        "on_time": "Вовремя",
        "late": "Опоздание {n}",
        "early": "Ранний уход на {n}",
        "worked": "Отработано: {n}",
        "distance": "{n} м от офиса",
        "h": "{n} ч", "m": "{n} мин", "hm": "{h} ч {m} мин",
    },
    "en": {
        "cmd_start": "Open the app",
        "cmd_status": "Today's status",
        "cmd_help": "Help",
        "short_description": "Sevencore attendance: Face ID check-in and check-out.",
        "description": "Attendance bot for Sevencore employees.\n\nOpen the app, tap the circle in the middle and pass "
                       "Face ID. Check-in or check-out is chosen automatically.",
        "open_app": "📸 Open attendance app",
        "welcome_new": "👋 <b>Welcome to Sevencore attendance!</b>\n\nOnce, you enter your name, the passkey and set up "
                       "Face ID.\n\nAfter that, open the app every day and tap the circle in the middle.",
        "welcome_back": "👋 Hello, <b>{name}</b>!",
        "not_registered": "You are not registered yet. Open the app to register.",
        "need_face": "Face ID is not set up yet. Open the app to set it up.",
        "status_open": "🟢 On shift since {since}, {worked} so far.",
        "status_done": "✅ Today: {first} – {last}, {worked} in total.",
        "status_no_shift": "⏳ No shift assigned yet. You can check in once your manager assigns one.",
        "status_shift": "📅 Today's shift: {shift}.",
        "status_none": "No check-in today.",
        "help": "<b>How it works</b>\n1. Open the app (button below).\n2. Tap the circle in the middle.\n"
                "3. Fit your face in the circle and slowly turn your head the way shown.\n\n"
                "Check-in works only at the office (location on) and during your shift.",
        "use_button": "Check-in and check-out happen in the app 👇",
        "offline": "⚠️ The app address is not connected yet. Please tell your administrator.",
        "who_manager": "Your manager", "who_admin": "An admin",
        "act_check_in": "Check-in", "act_check_out": "Check-out",
        "panel_added": "📝 {who} added a mark: <b>{action}</b> {when}.",
        "panel_changed": "✏️ {who} changed a mark: <b>{action}</b> {old} → <b>{new}</b>.",
        "panel_deleted": "🗑 {who} deleted a mark: <b>{action}</b> {when}.",
        "shift_set": "🗓 {who} set your shift: <b>{start} – {end}</b> · {days}.\n"
                     "Check-in: {in_open} – {in_close}. Check-out: {end} – {out_close}.\n"
                     "Today stays as it was; the new shift applies from the next day.",
        "shift_removed": "🗓 {who} removed your shift. Check-in is closed until a new one is set.",
        "auto_closed": "⚠️ No check-out on {date}. The mark was closed automatically at the shift end ({end}). "
                       "If this is wrong, message your manager.",
        "days_short": "Mon,Tue,Wed,Thu,Fri,Sat,Sun",
        "notify_in": "✅ <b>Checked in</b> {time}\n{detail}",
        "notify_out": "👋 <b>Checked out</b> {time}\n{detail}",
        "on_time": "On time",
        "late": "{n} late",
        "early": "Left {n} early",
        "worked": "Worked: {n}",
        "distance": "{n} m from the office",
        "h": "{n} h", "m": "{n} min", "hm": "{h} h {m} min",
    },
}


def pick(code: str | None) -> str:
    code = (code or "").lower()[:2]
    return code if code in LANGS else "uz"


def t(lang: str, key: str, **kw) -> str:
    table = T.get(lang) or T["uz"]
    text = table.get(key) or T["en"].get(key) or key
    return text.format(**kw) if kw else text


def duration(lang: str, minutes: int | None) -> str:
    minutes = max(int(minutes or 0), 0)
    h, m = divmod(minutes, 60)
    if h and m:
        return t(lang, "hm", h=h, m=m)
    return t(lang, "h", n=h) if h else t(lang, "m", n=m)


def detail(lang: str, result: dict) -> str:
    parts = []
    if result["action"] == "check_in":
        parts.append(t(lang, "late", n=duration(lang, result["late_min"])) if result.get("late_min") else t(lang, "on_time"))
    else:
        parts.append(t(lang, "worked", n=duration(lang, result.get("worked_min"))))
        if result.get("early_min"):
            parts.append(t(lang, "early", n=duration(lang, result["early_min"])))
    if result.get("distance_m") is not None:
        parts.append(t(lang, "distance", n=result["distance_m"]))
    return " · ".join(parts)
