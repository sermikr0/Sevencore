# OpSector — o'rganish natijalari

Manba: 2026-11-06 da saqlangan production fayllar (`backup/opsector/recon/`). Ular `index-prod.js` (1.9 MB
compiled bundle), `settings.js` (keyin qo'shilgan overlay) va `index.html`. **Manba kod (React/TS) yo'q.**
Shuning uchun bu tahlil bundle'ni beautify qilib o'qish orqali qilingan.

Batafsil fayllar:
- [study/UI_MAP.md](study/UI_MAP.md): barcha ekranlar, tugmalar va oqimlar, qator raqamlari bilan.
- [study/10_datalayer.js](study/10_datalayer.js): ma'lumotlar qatlami (Supabase so'rovlari, login, geofence).
- [study/20_ui.js](study/20_ui.js): React interfeysi (beautify qilingan).

## 1. Ilova nima

Yuk tashish dispetcherlik ofisi uchun davomat va smena jadvali tizimi.
- Ilova Google AI Studio'da yaratilgan, buni `/assets/aistudio/` papka nomi ko'rsatadi.
- Vite + React 19 bilan yig'ilgan, Tailwind v4 ishlatilgan.
- Ma'lumotlar Supabase'da (Postgres + REST + Realtime) saqlanadi, sayt Vercel'da joylashgan.
- Xodimlar ilovani Telegram Mini App sifatida ochadi.

**Backend yo'q.** Brauzer to'g'ridan-to'g'ri Supabase REST API'ga ochiq (publishable) kalit bilan ulanadi.
Barcha tekshiruvlar (login, ruxsatlar, geofence) brauzerda bajariladi.

| Portal | Manzil | Kim uchun | Asosiy funksiyalar |
|---|---|---|---|
| Landing | `/` | marketing | Narxlar, kalkulyator. Portallarga havola yo'q |
| Xodim ilovasi | `#mobile` (Telegram'da avtomatik) | xodim | Passkey → ism/bo'lim → selfie + GPS (100 m) bilan check-in/out, tarix, kalendar, profil |
| Admin | `#admin` (faqat ≥1024 px desktop) | dispetcher | Jonli "kim ishda", davomat jadvali (filtr, qidiruv), qo'lda check-in, yozuvni tahrirlash/o'chirish, xodimlar, 360° dossier, haftalik matritsa, Excel eksport |
| Menejer | `#7manage` | jamoa rahbari | Haftalik smena jadvali (spreadsheet), smena sozlash, jonli check-in'lar, kunlik izohlar, Excel |
| Dasturchi | `#dev7core` | texnik | Menejer va admin akkauntlari, bo'limlar, xom ma'lumotlar bazasi ko'rinishi (o'chirish bilan), passkey |

## 2. Ma'lumotlar (9 jadval)

| Jadval | Mazmuni |
|---|---|
| `employees` | `telegram_id` (PK), ism, bo'lim (HOS / 7CORE / CARGOGPT), smena nomi, vaqti va kunlari |
| `attendance_logs` | `check_in` / `check_out`, vaqt, **selfie base64 data-URL ko'rinishida**, lat/lng, masofa, izohlar |
| `team_schedules` | Hafta × xodim, har kun uchun `{status, startTime, endTime}` |
| `attendance_day_notes` | Menejerning kunlik izohi (xodim + sana) |
| `managers`, `admin_users`, `dev_users` | Login ma'lumotlari, **parollar ochiq matnda** |
| `organization_security` | Ro'yxatdan o'tish passkey'i (`terminal_access_code`) |
| `system_settings` | Zaxira sozlamalar |

Realtime faqat `attendance_logs` va `employees` jadvallarini kuzatadi. Biror yozuv o'zgarsa, admin va
menejer ekranlari o'zi yangilanadi.

## 3. Check-in qanday ishlaydi

1. Xodim ilovani ochadi. Telegram ID olinadi; Telegram'dan tashqarida tasodifiy ID yaratiladi.
2. Birinchi marta passkey (`terminal_access_code`), ism va bo'lim so'raladi.
3. Menejer smena bermaguncha check-in bloklangan bo'ladi ("Shift Unassigned").
4. Check-in quyidagicha bajariladi:
   - selfie olinadi (kamera yoki galereya, 220 px JPEG);
   - GPS olinadi (Telegram LocationManager yoki brauzer);
   - ofisgacha masofa ≤ 100 m bo'lsa, `attendance_logs` ga yoziladi.
5. Ofis koordinatasi bundle ichiga qattiq yozilgan: `41.280101, 69.251403` ("7CORE Dispatch HQ").
   Bazadagi `geofence_*` ustunlari ishlatilmaydi.
6. Check-out istalgan masofadan mumkin, lekin GPS baribir kerak.
7. 10 soatdan oshgan ochiq smena avtomatik "check-out" qilinadi.

## 4. Xavfsizlik topilmalari (asl deploy uchun)

| # | Topilma | Ta'siri |
|---|---|---|
| 1 | Admin uchun master parol kodda: `admin` / `dispatcher` + `7core2026` (bazaga qaramaydi) | JS'ni o'qigan har kim admin bo'ladi |
| 2 | Muallifning yashirin dasturchi akkaunti: `NAJMIDDIN` / `DANTEFERRO2026!` (login maydonida oldindan yozilgan) | Bazaga to'liq kirish va qatorlarni o'chirish |
| 3 | Har qanday menejer uchun umumiy parollar: `manager2026`, `7core2026`, `DANTEFERRO2026!` | Har qanday menejer akkauntiga kirish |
| 4 | Passkey zaxirasi: `7CORE355` | Begona odam xodim bo'lib ro'yxatdan o'ta oladi |
| 5 | Login faqat brauzerda: sessiya `sessionStorage`/`localStorage` da, server tekshiruvi yo'q | Bitta qiymat qo'lda yozilsa, portal ochiladi |
| 6 | Ochiq kalit bilan barcha jadvallarni o'qish va yozish mumkin (asl Supabase'da RLS o'chiq edi) | Selfie, GPS, parollar ochiq; ma'lumotlarni o'chirib yuborish ham mumkin |
| 7 | Parollar bazada ochiq matnda | 6-band bilan birga, barcha login ma'lumotlari ochiladi |
| 8 | Telegram `initData` tekshirilmaydi, ID'ga ko'r-ko'rona ishoniladi | Boshqa xodim nomidan check-in qilish mumkin |
| 9 | Geofence faqat brauzerda tekshiriladi, galereyadan rasm yuklash ham mumkin | Uydan turib check-in qilish mumkin |

Lokal nusxada bundle'ning ichki mantig'i o'zgartirilmagan, shuning uchun 1–5-bandlar bu yerda ham ishlaydi.
Ular faqat `127.0.0.1` da, test ma'lumotlari bilan ishlaydi. Kerak bo'lsa, ularni bundle'dan olib tashlash
mumkin.

## 5. Kamchiliklar va o'lik kod

- "Manual Remote Check-Out" oynasi bor, lekin unga hech qayerdan o'tib bo'lmaydi.
- ">12h Shift" belgisi hech qachon chiqmaydi.
- Routing substring bo'yicha ishlaydi: `?debug=dev` dasturchi konsoliga, `?x=app` mobil ilovaga olib boradi.
- "Return to Mobile View" tugmasi aslida landing sahifasiga olib boradi.
- `DEPTF` / `DEPTSET` nomlari production bundle build'dan keyin qo'lda tahrirlanganini ko'rsatadi.
- Landing'da "gallery upload prevention" yozilgan, lekin galereyadan rasm yuklash ruxsat etilgan.

## 6. Lokal nusxada nima o'zgardi

Faqat to'rtta narsa o'zgardi. Hammasi [build/build_site.py](build/build_site.py) da yozilgan va qayta
bajarish mumkin.

1. Supabase manzili va kaliti → `location.origin` (lokal server). `https://` talabi `http://` ni ham qabul qiladigan qilindi.
2. `settings.js` overlay'ida ham xuddi shu almashtirish qilindi.
3. Asl CSS fayl saqlanmagan edi, u Tailwind v4 bilan bundle'dagi klasslardan qayta yig'ildi.
4. Yo'q rasmlar (`logo.png`, `logo2.png`, `logo3.png`, `favicon.png`) neytral "DEMO COMPANY" / "OPSECTOR" belgilari bilan almashtirildi.

Litsenziya PDF'i saqlanmagan, shuning uchun "License" tugmasi 404 qaytaradi.
Matnlardagi "7CORE", "SEVENCORE" va bo'lim nomlari kod ichida qattiq yozilgan, ular o'zgartirilmadi.
