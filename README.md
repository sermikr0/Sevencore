# Sevencore Attendance

Xodimlar davomati: Telegram bot + Face ID ilova (xodimlar uchun) va boshqaruv paneli (admin va menejerlar uchun).
Hamma kod shu repoda; bitta server (Render) hammasini ishga tushiradi.

```
Telefon ──► @sevencheckin_bot ──► /tma/            Face ID Mini App (check-in / check-out)
Brauzer ──► /                     kirish sahifasi
            /app                  panel: Bosh sahifa · Davomat · Xodimlar · Jadval · Hisobotlar · Sozlamalar
            /api/panel/*          panel API (rol va bo'lim serverda tekshiriladi)
            /auth/*               kirish, akkauntlar, passkey
Server ──► PostgREST 127.0.0.1 ──► Postgres          brauzer bazaga hech qachon to'g'ridan-to'g'ri ulanmaydi
```

## Panel

To'q "boshqaruv xonasi" dizayni: qora fon, to'q sariq signal rang, oq matn; chap tomonda menyu (yig'iladi),
telefonda pastki tab paneli. Shriftlar: Geist, Geist Mono, Instrument Serif. Tillar: o'zbek, rus, ingliz.
`Ctrl+K` — istalgan xodim yoki sahifaga o'tish. Navbardagi **LIVE** — o'zgarishlar jonli keladi.

| Bo'lim | Nima bor |
|---|---|
| Jonli | Bugungi davomat halqasi (vaqtida / kechikdi / kelmadi / kutilmoqda), ko'rsatkich plitkalari, **smenalar chizig'i** (reja va haqiqiy ish soatlar bo'yicha, "hozir" chizig'i bilan), jonli oqim (yuz rasmlari bilan), kelmaganlar, 7 kunlik ustunlar |
| Jurnal | Kunlarga guruhlangan barcha belgilar; davr, bo'lim, amal, qidiruv; belgi qo'shish / tuzatish / o'chirish; CSV |
| Xodimlar | Kartochkalar (smena, ish kunlari, bugungi holat, Face ID). Xodim o'ng tomondan ochiladi: oy xaritasi, belgilar, smena berish, suratlar, profil (bo'lim, menejer, Face ID, o'chirish), smenani yopish |
| Jadval | Hafta, **smena guruhlari bo'yicha alohida** (Day Shift · Night Shift · Amazon Shift · Guruhsiz; yuqorida tablar); har kun — ish (boshqa soatlar), dam, kasal, ta'til, standart; o'tgan kunlarda haqiqiy kelish; nom ostidagi tugma — xodimni boshqa guruhga o'tkazish |
| Tahlil | Oy yoki oraliq: davomat ulushi (donut), kunlar bo'yicha ustunlar, ko'p kechikkanlar, reyting, xodim × kun xaritasi; Excel |
| Sozlamalar | Kirish huquqlari, smena guruhlari (qo'shish, nomini o'zgartirish, tartib, o'chirish), qoidalar, bot (passkey — faqat `REQUIRE_PASSKEY=1` bo'lsa) |

**Rollar** (hammasi serverda tekshiriladi):

| Rol | Huquq |
|---|---|
| Super Admin | hamma narsa + foydalanuvchilar (va passkey, agar yoqilgan bo'lsa) |
| Admin | barcha xodimlar va bo'limlar: davomat, tuzatish, smena, jadval (o'tgan kunlar ham), hisobot, xodim profili, Face ID reset, o'chirish |
| Menejer | faqat o'z bo'limidagi va unga biriktirilgan xodimlar: davomat, tuzatish, majburiy check-out, smena, jadval (bugundan boshlab), hisobot |

**Smena guruhlari**: xodimdagi yorliq (`employees.shift_group`), ro'yxat `system_settings['shift_groups']` da
(standart: Day Shift, Night Shift, Amazon Shift). Guruhni menejer yoki admin beradi (Jadval yoki Xodimlar → Smena),
ro'yxatni faqat admin o'zgartiradi. Jadval guruhlarga bo'linadi; Xodimlar, Jurnal, Tahlil va Excel guruh bo'yicha
filtrlanadi (Excel'da "Smena guruhi" ustuni). Guruh smena vaqtini o'zgartirmaydi.

Paneldagi har bir o'zgarish (belgi qo'shish/tahrirlash/o'chirish, majburiy check-out, smena, jadval) xodimga
bot orqali xabar qilinadi va uning ilovasi darhol yangi holatni ko'rsatadi.

Hisobot qoidalari Mini App bilan bir xil (`server/panel/reports.py`): check-in o'z smenasiga tegishli bo'ladi
(2 soat oldin ham), kechikish = boshlanishdan 5 daqiqadan keyin, check-in yopilgach kelmagan kun = kelmadi,
ro'yxatdan o'tishdan oldingi kunlar hisobga kirmaydi, avtomatik check-out smena oxirida yopadi.

## Telegram bot va Face ID ilova

Bot: **@sevencheckin_bot** (token faqat `BOT_TOKEN` muhit o'zgaruvchisida).

1. Xodim botni ochadi → ilova. Birinchi marta: ism, familiya, bo'lim va Face ID (kameraga bir marta qaraydi). Passkey so'ralmaydi.
2. Menejer yoki admin panelda smena beradi (Xodimlar → xodim → Smena).
3. Har kuni o'rtadagi doira bosiladi: kameraga bir qarash (Face ID) va joylashuv tekshiriladi, server check-in yoki
   check-out'ni o'zi tanlaydi.

| Qoida | Qiymat | Sozlama |
|---|---|---|
| Check-in ochiladi | smenadan 2 soat oldin | `CHECKIN_EARLY_MIN=120` |
| Check-in yopiladi | boshlangandan 15 daqiqa keyin (kechroq — menejer qo'lda qo'shadi) | `CHECKIN_LATE_MAX_MIN=15` |
| Kechikish | 5 daqiqadan keyin | `LATE_GRACE_MIN=5` |
| Check-out | smena tugaganda ochiladi, 2 soat ochiq | `CHECKOUT_EARLY_MIN=0`, `CHECKOUT_WINDOW_MIN=120` |
| Check-out qilinmasa | smena oxirida avtomatik yopiladi, xodimga xabar | `AUTO_CLOSE=1` |
| Hudud | ofis 41.279986, 69.251817 atrofida 300 m, check-in ham check-out ham | `GEOFENCE_*`, `CHECKOUT_GEOFENCE=1`, `GPS_ALLOWANCE_M=0` |
| Yuz | bitta aniq kadr, SFace ≥ 0.48, bitta yuz = bitta akkaunt; bosh burish o'chiq | `FACE_THRESHOLD`, `ENROLL_FRAMES=1`, `MATCH_FRAMES=1`, `LIVENESS=0` |
| Ro'yxatdan o'tish | passkeysiz (ism, familiya, bo'lim, Face ID) | `REQUIRE_PASSKEY=0` (1 — passkey so'raladi) |
| Ikki belgi orasida | kamida 2 daqiqa | `MIN_GAP_MIN` |
| Kim | Telegram `initData` imzosi bot tokeni bilan tekshiriladi | — |

Amaldagi qoidalar: `/tma/healthz` (`rules`) va panel → Sozlamalar.

## Render (production)

`render.yaml` (Blueprint): Render Postgres + bitta Docker web servis (`Dockerfile`, `deploy/run.py`:
jadvallar, birinchi Super Admin va passkey → PostgREST → server). Mini App manzili avtomatik
`https://<servis>.onrender.com/tma/`. `main` ga push → avtomatik deploy.

Cloud rejimi (`PUBLIC=1`): bitta port, Secure cookie, HSTS, login IP va username bo'yicha cheklanadi.

## Lokal ishga tushirish

```bash
./start.sh            # docker: Postgres + PostgREST (127.0.0.1), keyin server :8790 (panel) va :8791 (Mini App)
./stop.sh             # serverni to'xtatish; ./stop.sh --down — bazani ham
python3 db/seed.py    # bo'sh bazaga demo ma'lumot (o'ylab topilgan 3 xodim); --force — qaytadan
```

Lokal server production bilan **bir xil bot tokeni bilan ishga tushirilmasin** (Telegram bitta token uchun
bitta o'quvchiga ruxsat beradi). Lokal sinov uchun `BOT_POLLING=0`.

## Testlar

```bash
python3 tests/test_rules.py          # smena oynalari, kechikish, tungi smena, jadval, joylashuv
python3 tests/test_scan.py           # Face ID va jonlilik bosqichlari
# quyidagilar alohida test instansiyasida (asosiy serverga tegmaydi):
BOT_POLLING=0 AUTO_CLOSE=0 LIVENESS=0 APP_PORT=8890 TMA_PORT=8891 python3 server/app.py &
python3 tests/test_panel_api.py      # panel API: hisobot raqamlari, Excel, menejer cheklovi, tuzatishlar, jadval, LIVE
python3 tests/test_panel_sync.py     # panel o'zgarishi -> Mini App holati, bot xabarlari, avtomatik check-out
python3 tests/test_api.py --faces DIR   # Face ID oqimi (DIR: p1.jpg p2.jpg p3.jpg — 3 xil sun'iy yuz)
# cloud rejimi:
PUBLIC=1 PORT=18790 BOT_POLLING=0 AUTO_CLOSE=0 python3 server/app.py &
python3 tests/test_public.py --base http://127.0.0.1:18790
```

## Fayllar

```
panel/                 panel: index.html, login.html, assets/ (sevencore.css, favicon), src/ (app, dom, store, time, i18n/, ui/, pages/)
server/app.py          server: sahifalar, kirish, akkauntlar, panel API, Mini App, bot
server/panel/          panel API (api.py), hisobotlar (reports.py), Excel (xlsx.py), baza (data.py)
server/tma/            Mini App API, smena qoidalari (attendance.py), Face ID (face.py, scans.py), bot (telegram.py, texts.py)
server/accounts.py     kirish, sessiya, rollar, akkauntlar · server/passwords.py  scrypt
miniapp/               xodim ilovasi (uz / ru / en)
models/                YuNet + SFace ONNX modellari
db/01_schema.sql       sxema · db/seed.py  demo ma'lumot
deploy/run.py          konteyner kirish nuqtasi · Dockerfile · render.yaml · requirements.txt
docker-compose.yml     lokal Postgres + PostgREST · start.sh / stop.sh · tunnel.sh (lokal HTTPS sinov)
tests/                 test_rules, test_scan, test_api, test_panel_api, test_panel_sync, test_public
```
