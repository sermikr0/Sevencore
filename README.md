# Sevencore Attendance — lokal nusxa (Supabase va Vercel'siz)

Saqlangan davomat ilovasi shu kompyuterda ishlaydi:
- Supabase o'rnini Docker'dagi Postgres + PostgREST bosadi;
- Vercel o'rnini kichik Python server bosadi;
- login, foydalanuvchilar va rollar server tomonida boshqariladi.

Ilovani o'rganish natijalari [STUDY.md](STUDY.md) faylida.

```
Brauzer ──► http://127.0.0.1:8790/        Login (admin va menejerlar)
            ├─ /admin                    Admin paneli      (Super Admin, Admin)
            ├─ /manager                  Menejer portali   (Manager)
            ├─ /mobile                   asl xodim ilovasi (eski, faqat lokal; yangi ilova 8791 da)
            ├─ /auth/*                   login, sessiya, Users & Roles API
            ├─ /rest/v1/*  ──► PostgREST 127.0.0.1:55441 ──► Postgres 127.0.0.1:55440
            └─ /realtime/v1/…            check-in bo'lishi bilan admin va menejer ekranlari o'zi yangilanadi

Telefon ──► Telegram @sevencheckin_bot ──► https://<public>  ──► http://127.0.0.1:8791   Face ID Mini App
                                                                  (faqat shu port tashqariga chiqariladi)
```

## Ishga tushirish

```bash
cd /home/ai/backup/opsector-local
./start.sh                # baza konteynerlari + server
./stop.sh                 # serverni to'xtatish (baza ishlayveradi); ./stop.sh --down — bazani ham
```

`http://127.0.0.1:8790/` ni oching. Login: `admin`, parolni ko'rish uchun: `grep ADMIN_PASSWORD .env`.

## Foydalanuvchilar va rollar

Bazada faqat bitta **Super Admin** (`admin`) bor. Qolgan barcha akkauntlarni o'zingiz yaratasiz:
admin panelining o'ng pastki burchagidagi **Users & Roles** tugmasi orqali.

| Rol | Kirgandan keyin | Huquqlari |
|---|---|---|
| Super Admin | `/admin` | Admin paneli + foydalanuvchi yaratish, tahrirlash, o'chirish, rol berish, xodimlar passkey'ini o'zgartirish |
| Admin | `/admin` | Admin paneli (davomat, xodimlar, jadvallar, eksport) |
| Manager | `/manager` | Menejer portali (smena jadvali, jamoa, jonli check-in'lar); bo'lim (7CORE / HOS / CARGOGPT) va jamoa nomi bilan |

Qo'shimcha qoidalar:
- Rolni Admin ↔ Manager o'zgartirsangiz, akkaunt o'zi to'g'ri jadvalga ko'chadi.
- O'z akkauntingizni o'chira olmaysiz va o'z rolingizni o'zgartira olmaysiz.
- Oxirgi Super Admin'ni ham o'chirib yoki pasaytirib bo'lmaydi.

Login va xavfsizlik:
- Login serverda tekshiriladi. Parollar scrypt hash ko'rinishida saqlanadi va brauzerga hech qachon
  yuborilmaydi.
- Sessiya HttpOnly cookie'da, 12 soat amal qiladi.
- Login urinishlari cheklangan: 10 daqiqada 8 ta xato.
- Asl kodagi yashirin parollar (`7core2026` va boshqalar) olib tashlangan.
- Akkaunt jadvallarini faqat Users & Roles orqali o'zgartirish mumkin. REST orqali to'g'ridan-to'g'ri
  yozishga urinish 403 bilan rad etiladi.

## Telegram bot va Face ID ilova

Bot: **@sevencheckin_bot**. Token faqat `.env` dagi `BOT_TOKEN` da saqlanadi. Bot shu server ichida ishlaydi
(long polling), shuning uchun `./start.sh` uni ham ishga tushiradi.

**Xodim uchun jarayon:**
1. Botga kiradi, "📸 Davomat ilovasini ochish" tugmasini yoki pastdagi "Sevencore" menyusini bosadi.
2. **Faqat birinchi marta:**
   - ism, familiya, bo'lim va passkey kiritiladi;
   - Face ID sozlanadi: yuz doiraga to'g'rilanadi, 3 ta kadr olinadi, keyin bosh ko'rsatilgan tomonga buriladi.
   - Shundan keyin xodim admin va menejer panellarida "Shift Unassigned" holatida paydo bo'ladi.
3. Menejer yoki admin smena belgilaydi (Team Members → Shift Configuration yoki haftalik jadval orqali).
4. **Har kuni:** ilova ochiladi va o'rtadagi katta doira bosiladi. Kamera doira ichida ochiladi, Face ID
   va bosh burish tekshiriladi. Shundan keyin server check-in yoki check-out'ni o'zi tanlaydi va yozadi.
   Bot xodimga tasdiq xabarini yuboradi.

**Qoidalar (hammasi serverda tekshiriladi):**

| Tekshiruv | Qoida |
|---|---|
| Kim | Telegram `initData` imzosi bot tokeni bilan tekshiriladi, shuning uchun boshqa xodim nomidan kirib bo'lmaydi |
| Yuz | SFace moslik ≥ 0.48 (FACE_THRESHOLD) |
| Jonlilik | Rasm yoki telefon ekranini ko'rsatish o'tmaydi: bosh tasodifiy tomonga burilishi kerak (LIVENESS_TURN) |
| Bitta yuz = bitta akkaunt | Boshqa xodimda ro'yxatdan o'tgan yuz bilan yangi akkaunt ochib bo'lmaydi |
| Smena | Smena biriktirilmagan bo'lsa, check-in yopiq |
| Kun rejasi | Haftalik jadval (Day Off / Sick / boshqa soatlar) ustun turadi; bo'lmasa xodimning odatdagi smenasi olinadi |
| Vaqt | Check-in smenadan 45 daqiqa oldin ochiladi va smena tugaguncha ochiq turadi; tungi smena boshlangan kuniga tegishli |
| Kechikish | Smena boshidan 5 daqiqadan ko'p o'tsa (LATE_GRACE_MIN), kechikish yoziladi |
| Joy | Check-in faqat ofisdan 100 m ichida (GEOFENCE_*); check-out istalgan joydan (CHECKOUT_GEOFENCE=1 qilsa, faqat ofisdan) |
| Ikki marta bosish | Ikki belgi orasida kamida 2 daqiqa bo'lishi kerak (MIN_GAP_MIN) |
| 10 soat | 10 soatdan uzoq ochiq qolgan check-in yopilgan hisoblanadi (panellardagi bilan bir xil) |

Yozuvlar asl `attendance_logs` jadvaliga tushadi: izoh, yuz rasmi va ofisgacha masofa bilan. Shuning uchun admin
va menejer panellari ularni darhol, o'zgarishsiz ko'rsatadi. Face ID shablonlari `face_profiles` jadvalida
turadi va `/rest/v1` orqali o'qib bo'lmaydi. Admin panelda **Users & Roles → Employee Face ID** bo'limi bor:
kim sozlagani ko'rinadi, "Reset Face ID" bilan xodimga qayta sozlatish mumkin.

### Telefondan ochilishi uchun

Telegram Mini App faqat **HTTPS** manzil bilan ochiladi. Ilova 8791-portda ishlaydi va tashqariga faqat shu
port chiqarilishi kerak. Admin panel (8790) lokal qoladi. Ikki yo'l bor:

- **Tez sinov:** `./tunnel.sh` ni alohida terminalda ishga tushiring (Cloudflare quick tunnel). Server yangi
  manzilni ~10 soniyada o'zi topadi va bot tugmalarini o'sha manzilga yo'naltiradi. Manzil har safar
  o'zgaradi va terminal yopilsa, ilova ham to'xtaydi.
- **Doimiy:** o'z domeningiz (masalan, `https://davomat.example.uz` → 127.0.0.1:8791) ni `.env` dagi
  `TMA_PUBLIC_URL` ga yozing va `./stop.sh && ./start.sh` qiling.

Botga kirganda ilova o'zi ochilishi uchun BotFather'da bir marta sozlang: `/mybots` → @sevencheckin_bot →
**Bot Settings → Configure Mini App → Enable Mini App** → yuqoridagi HTTPS manzil. Shundan keyin chatda
"Open" tugmasi chiqadi va `https://t.me/sevencheckin_bot?startapp` havolasi ilovani to'g'ridan-to'g'ri ochadi.

Holatni tekshirish: `curl -s http://127.0.0.1:8790/healthz`. Javobda `bot`, `bot_username` va `public_url`
maydonlari bo'ladi.

### Testlar

```bash
python3 tests/test_rules.py      # smena oynalari, kechikish, tungi smena, jadval, joylashuv (38 ta)
python3 tests/test_scan.py       # Face ID va jonlilik bosqichlari (17 ta)
# API testi alohida instansiyada ishlaydi, asosiy serverga tegmaydi:
BOT_POLLING=0 LIVENESS=0 APP_PORT=8890 TMA_PORT=8891 python3 server/app.py &
python3 tests/test_api.py --faces <3 ta turli sun'iy yuz: p1.jpg p2.jpg p3.jpg>
```

## Xodimlar (asl /mobile ilovasi)

Xodimlar `/mobile` sahifasidan (Telegram Mini App) passkey bilan ro'yxatdan o'tadi. Passkey Users & Roles
oynasining pastki qismida turadi va o'sha yerdan o'zgartiriladi.

Yangi xodim menejer yoki admin smena bermaguncha check-in qila olmaydi. Check-in uchun selfie kerak va xodim
ofisdan 100 m ichida bo'lishi kerak (ofis nuqtasi `41.280101, 69.251403`). Kompyuterda sinash uchun Chrome
DevTools → Sensors → Location orqali shu koordinatani bering.

Test uchun bazada 3 ta o'ylab topilgan xodim bor (Aziz Demo, Malika Test, John Sample) va ularning 2 haftalik
yozuvlari. Real ma'lumot ishlatilmagan.

Hamma narsani boshlang'ich holatga qaytarish:
```bash
python3 db/seed.py --force
```
Bunda bitta admin, passkey va test xodimlar qayta yoziladi.

### Vaqt oynalari va hudud (2026-11-24 dan)

| Qoida | Qiymat | `.env` / Render |
|---|---|---|
| Check-in ochiladi | smena boshlanishidan 2 soat oldin, smena tugaguncha ochiq (kechiksa — kechikish yoziladi) | `CHECKIN_EARLY_MIN=120` |
| Check-out ochiladi | aynan smena tugagan vaqtda | `CHECKOUT_EARLY_MIN=0` |
| Check-out oynasi | 2 soat; o'tib ketsa — "check-out qilinmadi", keyingi check-in oynasigacha yopiq | `CHECKOUT_WINDOW_MIN=120` |
| Hudud | ofis 41.279986, 69.251817 atrofida 300 m; check-in ham, check-out ham | `GEOFENCE_*`, `CHECKOUT_GEOFENCE=1` |
| GPS chegarasi | qo'shimcha metr yo'q (aniq 300 m) | `GPS_ALLOWANCE_M=0` |

Har smenaga bitta check-in. Panelning "10 soatlik avtomatik check-out" yozuvi haqiqiy check-out
hisoblanmaydi, xodim smena oxirida baribir check-out qiladi. Joriy qoidalar `/tma/healthz` da `rules` ostida
ko'rinadi (koordinata o'rniga `office_id` xeshi chiqadi).

## Render'ga joylash (bitta server)

Bitta Docker servis hamma narsani ishga tushiradi: admin/menejer paneli `/` da, xodim ilovasi `/tma/` da,
Telegram bot va PostgREST. Baza Render Postgres'da. Hammasi `render.yaml` (Blueprint) da yozilgan.

Bu rejim (`PUBLIC=1`) lokaldan quyidagicha farq qiladi:
- `/rest/v1` va realtime faqat login qilgan admin yoki menejerga ochiq; login qilmaganga 401 qaytadi.
- `/mobile` sahifasi o'chiq: xodimlar faqat bot orqali kiradi.
- Cookie `Secure` bo'ladi, HSTS yoqiladi.
- Login urinishlari IP bo'yicha ham, username bo'yicha ham cheklanadi.

Birinchi ishga tushishda jadvallar yaratiladi, bitta Super Admin (`ADMIN_USERNAME` / `ADMIN_PASSWORD`)
va xodimlar uchun passkey yoziladi. Demo ma'lumot qo'shilmaydi.

Bot manzili avtomatik `https://<servis>.onrender.com/tma/` bo'ladi (Render bergan `RENDER_EXTERNAL_URL`
dan olinadi). Shu manzil bot menyusiga ham o'rnatiladi.

Joylash tartibi:
1. Lokal serverni to'xtating: `./stop.sh`. Bitta token bilan ikki joyda bot ishlay olmaydi.
2. Shu papkani GitHub'ga **private** repo qilib yuklang. `.env` `.gitignore` da, u yuklanmaydi.
3. Render → Blueprints → New Blueprint Instance → repo'ni tanlang. So'ralganda `BOT_TOKEN` va
   `ADMIN_PASSWORD` (kamida 10 belgi) ni kiriting → Apply.
4. Deploy tugagach `https://<servis>.onrender.com/healthz` da `"db":"up"` va `"bot":"polling"` chiqishi kerak.
5. BotFather → /mybots → bot → Bot Settings → Configure Mini App → `https://<servis>.onrender.com/tma/`.
6. Environment bo'limida `GEOFENCE_LAT` / `GEOFENCE_LNG` ni ofisingiz koordinatasiga almashtiring.

Tariflar: web servis `starter` bo'lishi kerak, chunki bepul servis 15 daqiqa so'rov kelmasa uxlaydi va bot
to'xtaydi. Baza `basic-256mb`: bepul baza 30 kundan keyin o'chiriladi.

Konteynerni lokalda sinash:
```bash
docker build -t sevencore-render:test .
# DATABASE_URL, BOT_TOKEN, ADMIN_PASSWORD ... bilan ishga tushiring, keyin:
python3 tests/test_public.py --base http://127.0.0.1:18790          # PUBLIC rejim xavfsizligi (30 ta)
POSTGREST_URL=http://127.0.0.1:18741 python3 tests/test_api.py --faces DIR \
    --base http://127.0.0.1:18790/tma --admin http://127.0.0.1:18790
```

## Fayllar

```
site/                 ishlaydigan sayt (build/build_site.py yaratadi; qo'lda tahrirlamang)
build/*.orig.*        asl saqlangan fayllar (o'zgarmaydi)
build/extra/          login sahifasi, Users & Roles oynasi (manba)
build/build_site.py   site/ ni yig'adi: ulanish, yashirin parollarni olib tashlash, Sevencore brendi, CSS
server/app.py         sahifalar, REST proxy, realtime; 8791 da Mini App va bot
server/tma/           Mini App API (api.py), smena qoidalari (attendance.py), Face ID skan (scans.py, face.py),
                      Telegram (telegram.py), bot matnlari (texts.py)
miniapp/              xodim ilovasi: index.html, app.js, app.css, i18n.js (uz / ru / en)
models/               YuNet (yuz topish) + SFace (yuzni tanish) ONNX modellari
tests/                test_rules.py, test_scan.py, test_api.py, test_public.py
tunnel.sh             8791 ni vaqtinchalik HTTPS manzil bilan chiqarish (siz ishga tushirasiz)
server/accounts.py    login, sessiya, rollar, Users & Roles API
server/passwords.py   scrypt parol hash
db/01_schema.sql      sxema · db/seed.py  boshlang'ich ma'lumot
docker-compose.yml    Postgres 16 + PostgREST 12 (faqat 127.0.0.1)
Dockerfile            bulut uchun bitta konteyner (panel + Mini App + bot + PostgREST)
render.yaml           Render Blueprint: Postgres + web servis
deploy/run.py         konteyner kirish nuqtasi: baza tayyorlash, PostgREST, server
requirements.txt      Python kutubxonalari
.env                  parollar va kalitlar (chmod 600)
```

Sayt fayllari o'zgargandan keyin `python3 build/build_site.py` ni ishga tushiring.
`server/` dagi kod o'zgargandan keyin esa `./stop.sh && ./start.sh` qiling.
