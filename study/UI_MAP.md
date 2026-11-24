# OpSector UI map — `20_ui.js`

Source: `/home/ai/backup/opsector-local/study/20_ui.js` (15,771 lines, beautified Vite/rolldown bundle).
All `Lnnnn` references are line numbers in that file. Read-only static analysis; nothing was executed.

**Scope notes**
- Leaflet 1.9.4 UMD is bundled at L7550–12763 (`jl`). Skipped.
- The file starts mid-component: L1–120 is the tail of the **Edit Attendance Record** modal `Wc`. Its head is outside this file, and so is the **admin login** component `Oc`.
- Two-letter identifiers ending in `s`/`c` (`Ts`, `Os`, `hc`, `Uc`, …) plus `Pc` (office/geofence config) and `kc` (department list) are **not defined in this file**. They come from the data layer (`10_datalayer.js`). Their meanings below are inferred from call sites (§9).
- Single-letter or `xx`-style JSX tags such as `H`, `U`, `ye` and `Be` are lucide-style icons.
- Timezone everywhere is `Asia/Tashkent` ("UZT", GMT+5).
- The bundle ships an "Intellectual Property Declaration & Operating License" PDF, shown in the admin and manager portals (L2653, §6).

## 0. Component index

| Id | Line | What it is |
|---|---|---|
| `Wc` (tail) | 1–120 | Admin: Edit Attendance Record modal |
| `Gc` | 121 | Admin: Edit Employee Profile modal |
| `Kc` | 228 | Admin: Create Manual Attendance Check In modal |
| `qc` | 370 | Selfie + geofence inspector modal (admin and manager) |
| `Jc` | 544 | Admin: Team & Users Directory drawer |
| `Yc` | 764 | Admin: Floor Presence & Shift Roster drawer |
| `Xc` | 1004 | Admin: Employee 360 Dossier |
| `Zc` | 1515 | Weekly Attendance Plan matrix (shared by admin and manager) |
| `Qc` | 2241 | Admin: full-screen weekly matrix wrapper |
| `$c` | 2341 | Admin: User Assignments & Department Control |
| `el` | 2640 | Software License PDF modal |
| `tl` | 2723 | Admin dashboard (main) |
| `nl` | 3592 | Admin wrapper: desktop gate, session, login |
| `rl` | 3644 | Manager login |
| `il`/`al` | 3760 | 30-minute time slots `00:00..23:30`; weekday list |
| `ol` | 3788 | Manager: Shift Configuration modal |
| `sl` | 4058 | Manager portal |
| `cl` | 4892 | Developer login |
| `ll` | 5005 | Developer console |
| `ul`, `dl` | 5997, 6071 | Mobile: header; metric tiles |
| `fl` | 6162 | Telegram helper namespace (`pl`…`xl`, L6172–6265) |
| `Sl`, `Cl`, `wl` | 6266, 6454, 6624 | Mobile: big check button; today's log; bottom nav |
| `Tl`, `El` | 6669, 6880 | Mobile: calendar; attendance history |
| `Ol`, `kl` | 7109, 7141 | Image → JPEG data-URL compressors |
| `Al` | 7152 | Mobile: profile and logout |
| `Ml` | 12765 | Leaflet geofence mini-map |
| `Nl` | 12858 | Mobile: check-in/out verification modal |
| `Pl` | 13568 | Mobile: Manual Remote Check-Out modal (unreachable, §10) |
| `Fl` | 13701 | Mobile: today's schedule card |
| `Il` | 13943 | Mobile: registration (passkey, then profile) |
| `Ll` | 14214 | Employee mobile app shell |
| `Rl` | 14444 | Public marketing landing page |
| `zl` | 15709 | Root router; `createRoot(#root)` at L15769 |

## 1. Entry and routing (`zl`, L15709–15771)

`e()` reads `location.hash`, `pathname` and `search`, all lower-cased. It returns the first match below. **Every check except two is a substring test.**

1. **dev** → `ll`. Matches any of: hash contains `dev7core` or `#dev`; path contains `/dev7core` or `/dev`; query contains `dev7core` or `dev` (L15714).
2. **manage** → `sl`. Matches any of: hash contains `7manage` or `#manage`; path contains `/7manage` or `/manage`; query contains `7manage` or `manage` (L15715).
3. **admin** → `nl`. Matches any of: hash is exactly `#admin`; hash contains `7core` or `#core`; path is exactly `/admin`; path contains `/7core` or `/core`; query contains `admin` or `7core` (L15716).
4. **mobile** → `Ll`. Matches any of: hash, path (`/mobile`, `/app`) or query contains `mobile` or `app` (L15717).
5. **Telegram detection**: if `window.Telegram?.WebApp.initData` is non-empty → mobile (L15718–15721).
6. Otherwise → **landing** `Rl`.

How routing behaves:
- The route is re-evaluated on `hashchange` and `popstate` (L15723–15730).
- Helpers write the canonical hashes: `""` (landing), `#mobile`, `#admin`, `#7manage`, `#dev7core` (L15732–15747).
- `#dev7core` contains `7core`, but the dev check runs first.
- Telegram normally launches Mini Apps with a `#tgWebAppData=…` hash. That hash contains "app", so it already routes to mobile at step 4.
- Substring side effects: any query such as `?x=app`, `?debug=dev` or `?admin` re-routes, and so does a path containing `/core` or `/app`.
- `Rl` is declared with no props (L14444), so **the landing page has no links into any portal**. The portals are reachable only by URL.

**Desktop gate** (admin only, `nl` L3605–3612):
- Allowed only when the user agent does *not* match `/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i` **and** `innerWidth >= 1024`. It is re-checked on resize.
- Otherwise the page shows "Desktop Screen Required" / "OPSECTOR Attendance Requires a Desktop Screen" (L3629–3635).
- Its "Return to Mobile View" button actually goes to the landing page (hash `""`).
- The manager portal, dev console and mobile app have no width gate. The mobile layout is capped at `max-w-[430px]`.

**Admin session** (`nl` L3597–3620):
- Read from `sessionStorage['7core_admin_user']`. If it is missing, the page renders `Oc`, which is not in this file.
- `onLoginSuccess` only sets React state. Persistence must happen inside `Oc`.
- Sign Out removes the key.

## 2. Screens per portal

### 2.1 Employee mobile app (`Ll`, L14214–14443)

**Boot** (L14235–14275):
- Calls `hl()` (Telegram `ready()`/`expand()`), then `gl()` to get the user (§3.6).
- If `localStorage['7core_logged_out_<id>']==='true'`, it shows registration.
- Otherwise it calls `gs(id)` to fetch the employee row. A row with `first_name` and `department` counts as registered: the user is cached via `_l` and `7core_registered_<id>=true` is set.
- If `gs` returns nothing, it falls back to the cached `7core_employee_<id>`. If that is also missing, it calls `ps(id)` and shows registration.
- `fleet` is normalised to `Fleet`.

**Data refresh** `D` (L14277–14288): `Promise.all([Cs(id), gs(id)])` loads the employee's logs and row. `Es(logs)` then computes the metrics `{isCheckedIn, presentToday, totalPresentUnits, totalHoursFormatted, totalMinutes}`.

Layout:
- **Header `ul`** (L5997): logo, avatar from Telegram `photo_url` (`referrerPolicy:no-referrer`, fallback initial or `7`), today's date. The avatar opens Profile.
- **Bottom nav `wl`** (L6624): `checkin` "Check-In", `mylog` "My Log", `calendar` "Calendar", `profile` "Profile".

| Screen / modal | Visible title(s) | What the user can do | Data |
|---|---|---|---|
| Registration step 1 `Il` (L13963) | "7CORE Security Gate", "Organization Passkey" | Enter the organisation passkey | `Fs(code)` verifies the passkey (L13996) |
| Registration step 2 (L14037) | "Step 2 of 2", "Employee Information" | First Name (required), Last Name (optional), department select (`kc` minus "fleet"; placeholder "Choose from HOS, 7CORE, CARGOGPT...") | Writes `localStorage['7core_employee_<id>']` and calls `_s(row)` (upsert employee, L14088). A failure there is only logged. |
| Registration step 3 (L14177) | Typewriter "Welcome to 7CORE Attendance", "Welcome aboard, X!" | Auto-continues after about 3 s | `Ll.A`: clears the logged-out flag, calls `gs`, then `D()` |
| Check-In tab: metric tiles `dl` (L6071) | "My Checked In / Status", "My Present Today", "My Total Hours Today" | View only | Metrics from `Es` |
| Check-In tab: schedule card `Fl` (L13701) | States SHIFT UNASSIGNED / ON DUTY / DAY OFF / CHECK-IN READY (≤45 min before start, L13808) / UPCOMING / CHECK-IN PENDING | View only | Employee `shift_*`; `hs()` = has shift, `ms()` = normalise days |
| Check-In tab: big button `Sl` (L6266) | "TAP TO CHECK IN / CHECK OUT" plus a status pill (L6302–6383) | Opens `Nl`. **Blocked** (warning haptic only) when not checked in and no shift is assigned (L6272–6277). A day off does *not* block. | — |
| Check-In tab: `Cl` (L6454) | "Today's Personal Log" | Lists today's logs (DATE/ACTION/TIME/DURATION); opens selfie viewer "Verified Biometric Selfie" | `durationFormatted` from the data layer |
| My Log tab `El` (L6880) | "Attendance History" | Check-in/out counts; filter All / Check In / Check Out; sort order; Refresh; view selfie | `onRefresh` = `D` |
| Calendar tab `Tl` (L6669) | Month grid; "Days Worked", "Total Hours", "Total Shift", "Attended" / "Off / Absent" | Navigate months, pick a day | `ws(id, year, month)` loads the month's logs. Durations are computed locally (§3.5). |
| Profile tab `Al` (L7152) | "Active Personnel", "Edit Profile Details", "Work Shift Schedule", "Account & Device Session" | Edit first/last name, department and photo; copy Telegram ID; view shift (read-only, "Shift schedule managed by Dispatch & Management") | `ks(user.id, {first_name,last_name,department,photo_url})` (L7177). Photo via `Ol(file,220,.7)` as a data URL. |
| Profile: logout modal (L7486) | "Security Passkey Required" | Enter passkey, then "Confirm Log Out" | `Fs(passkey)` (L7207). On success, `Ll.j`: `ps(id)`, reset state, back to registration. |
| Verification modal `Nl` (L12858) | "CHECK-IN VERIFICATION" / "CHECK-OUT VERIFICATION" | Selfie, GPS, confirm (§3) | `Lc`, `Ic`, then `Ts` via `Ll.k` |
| `Pl` (L13568) | "Manual Remote Check-Out", "100m Perimeter Bypassed" | Reason note, then check out from anywhere | `Lc` (8 s, 100 m) and `Ts(id,'check_out',"[Manual Remote Check-out] …")`. **Unreachable** (§10). |

### 2.2 Admin dashboard (`tl`, L2723–3591)

- **Header** (L2839–2925): logo, "OPSECTOR Attendance", "ADMIN TERMINAL", License button (`el`), live UZT clock, Reload (`location.reload()`), Bright/Dark toggle, Sign Out. The theme is stored in `localStorage['opsector_admin_theme']` and defaults to light.
- **Nav** (L2926–2980): "Live Dispatch Floor", "Team & Users" (count), "Floor Presence & Shift Roster" (n Active), "Weekly Attendance Matrix (Full Screen)", "User Assignments & Departments".
- **Main page**:
  - "WHO'S ON DUTY RIGHT NOW (n ACTIVE)": live HH:MM:SS timers, plus a Late/On-Time flag from `Vc(checkInHH:MM, shift_start_time||'16:00')` (L3024–3072). Clicking opens the Dossier.
  - "FLOOR DISPATCH STATS": Active In, Total Staff, Logs Loaded, Selected.
  - "Add Manual Check In" button.
  - "ATTENDANCE MASTER RECORD" table (§4).
- **Loads**: `Os({startDate,endDate,department,searchQuery})` for logs and `Ds()` for employees (L2748–2753). The date range comes from `Ys(range)` (L2744).

| Modal / drawer | Title | Actions | Data calls |
|---|---|---|---|
| `Wc` (L1–120) | Action Type / "Timestamp (Date & Time)" / "Admin Audit Note / Reason" | Edit a log; "Delete Record" → "Yes, Delete Record" | `js(id,{timestamp,action_type,admin_note})` (L1); `Ms(id)` (L75) |
| `Gc` (L121) | "Edit Employee Profile" | First/Last name, Department | `ks(telegram_id,{first_name,last_name,department})` (L151) |
| `Kc` (L228) | "Create Manual Attendance Check In" | Employee, CHECK IN/OUT, datetime, note; audit note defaults to "Manual check-in logged by dispatch admin" | `Ns({telegram_id,action_type,timestamp,note,admin_note})` (L270) |
| `qc` (L370) | "Biometric & Geofence Verification Audit" | View selfie, "Within 100m Geofence" / "Geofence Breach Alert", Office Target vs Device GPS, notes | Reads `Pc.lat/lng/radiusMeters` |
| `Jc` (L544) | "Team & Users Directory" | Search by name, username or ID; department tabs; copy ID; 360 Dossier; Edit; "Remove Employee from Roster" | `Rs(telegram_id)` deletes the employee (L580) |
| `Yc` (L764) | "Floor Presence & Shift Roster" | Live timers grouped by department; "Clock Out Employee"; "End All Active Shifts" | `Ts(id,'check_out','[Supervisor Checkout] Closed from Floor Presence Roster')` (L817); batch uses `'[Supervisor Shift Closeout] Batch clock-out for shift rotation'` (L859) |
| `Xc` (L1004) | "Employee 360 Dossier" | Stats; tabs Timeline, "Perimeter & Remote Exceptions", "Verification Selfies"; "Force Clock Out"; "Export History CSV"; Edit Profile; edit record; inspect selfie | `Ts(…'[Supervisor Dossier Override] Manual shift termination from Employee 360')` (L1074); CSV built locally (L1083–1089) |
| `Qc` (L2241) | "Team Attendance & Shift Schedule Matrix", "FULL-SCREEN AUDIT" | Department filter, Refresh; embeds `Zc` editable (`isReadOnly:false`, managerName `Admin`) | `nc(weekStart, dept)` plus logs (`Os()` if none passed) (L2251) |
| `$c` (L2341) | "User Assignments & Department Control" | Search, department tabs, "Switch Department", assign manager | `Ds()`, `hc()`; `yc(tgId, managerId|null)` (L2371); `bc(tgId, dept)` (L2387) |
| `el` (L2640) | "Opsector Software License" | View PDF in an iframe, Download, Open in new tab; Esc closes | Static asset (§6) |

### 2.3 Manager portal (`sl`, L4058–4891)

- **Login `rl`** (L3644):
  - Titles "7CORE TEAM OPERATIONS" and "Manager Command Portal"; fields Manager Username / Manager Password; button "ACCESS TEAM PORTAL".
  - Calls `mc(username,password)`, which returns `{success, manager, message}` (L3697).
  - The session is stored in `localStorage['7core_manager_session']` and re-validated with `pc(id, username)` on mount and on every refresh. A falsy result logs the manager out (L4092–4127).
  - Theme key is `7core_manager_theme` (default dark).
- **Header**: `team_name` or "<dept> Team", "Manager: <full_name> • n Members", License, UZT clock, Light/Dark, Reload, sign-out.
- **Tabs**:
  - `spreadsheet` "Shift Spreadsheet": `Zc` with the manager's department and full name; `onConfigureShift` opens `ol`.
  - `roster` "Team Members": cards showing the shift label and days, plus "Configure Shift →".
  - `livefeed` "Live Check-Ins": "Daily Check-Ins & Weekly Attendance" (§5).
- **Modals**: `qc` (selfie inspector), `ol` (Shift Configuration), `el` (license).

### 2.4 Developer console (`ll`, L5005–5996)

- **Login `cl`** (L4892):
  - Titles "RESTRICTED DEVELOPER ACCESS • /dev7core" and "Developer Command Suite".
  - The username is **pre-filled with `NAJMIDDIN`** (L4896), and the footer shows "Auth: NAJMIDDIN" (L4995).
  - Calls `xc(u,p)`, which returns `{success, devUser}` (L4935).
  - Session is stored in `localStorage['7core_dev_session']`.
- **Header**: "DEVELOPER COMMAND SUITE", "/dev7core • FULL CONTROL", "• Supabase Database Connected", buttons "Manager Portal (/7manage)" and "Admin Terminal", "Refresh Data", "Sign Out Developer", "← Exit to Mobile App" (which goes to landing).
- **Load**: `Promise.all([hc(), Sc(), Is(), Ds()])` fetches managers, admin users, the current passkey and employees (L5037).
- **Tabs**: see §5.

## 3. Employee check-in / check-out flow

### 3.1 Registration and passkey

- The passkey is verified by the data-layer function `Fs(code)`, which returns a boolean. The UI holds no passkey value itself.
- Registration writes this employee row (L14069–14082): `{telegram_id, first_name, last_name|null, username|null, photo_url|null, department, is_verified:true, created_at, shift_name:'Shift Unassigned', shift_start_time:null, shift_end_time:null, shift_days:[]}`.
- A new employee therefore **cannot check in until a manager or admin assigns a shift** (`Sl` blocks, L6273).
- The same passkey is required to log out (`Al`, L7207). The dev console sets it (`Ls`).

### 3.2 Selfie capture (`Nl`)

- **The camera starts automatically** when the modal opens (L12956 → `U()`, L12893–12955). It tries `getUserMedia` in this order:
  1. `{video:{facingMode:'user'}}`
  2. `{facingMode:{ideal:'user'}}`
  3. `{video:true}`
  4. Legacy `navigator.getUserMedia`, `webkitGetUserMedia` or `mozGetUserMedia`
- Error messages: "Camera streaming is not supported by this in-app browser." and "Camera permission was blocked. Tap "Open Phone Camera"…" (L12899, L12948).
- **Fallbacks**: a hidden `<input type=file accept=image/* capture=user>` ("OPEN PHONE CAMERA", L13038–13042) and a plain gallery picker ("Or select photo from gallery", L13045–13049).
- **Snapshot** `kl(video,220,.65)` (L7141): square centre crop, horizontally mirrored, ≤220×220 px, encoded with `canvas.toDataURL('image/jpeg', 0.65)`.
- **File path** `Ol(file,220,.65)` (L7109): FileReader → Image → canvas, the same crop, then a JPEG data URL.
- **Storage**: the selfie is passed as `photoUrl` and is **a base64 `data:image/jpeg` URL**. Admin and manager views render `photo_url` directly as `<img src>`. Whether `Ts` uploads it to Storage or stores the string is decided in the data layer.

### 3.3 Geofence

- `te()` (L12871–12891) calls `Lc({timeoutMs:15000, targetAccuracyMeters:40, onProgress})`, which returns `{lat,lng,accuracy,source}`. Then `Ic(lat,lng)` returns `{isInside, distanceMeters}`.
- The UI additionally hard-requires `distance <= 100` (L12886).
- GPS starts **only on a user tap**: "Allow GPS / Refresh GPS" (L13308) or the main button. It never starts automatically.
- Office coordinates come from `Pc.lat`, `Pc.lng`, `Pc.radiusMeters` and `Pc.name`. **Their numeric values are not in this file.**
- The UI text hardcodes "100m" in many places (L13085, L13368, L13400).
- `Lc` probably uses the Telegram LocationManager helper `xl` (WebApp API 8.0+, 2.5 s timeout, L6232) before `navigator.geolocation`. That is inferred from the `source` field and the `fl` export; confirm in the data layer.
- **Map `Ml`** (L12765):
  - Centred on `Pc`, zoom 17, OSM tiles `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`.
  - A red dashed circle of radius `Pc.radiusMeters`, an office pin (`divIcon`) with popup "`<b>${Pc.name}</b><br>100m Allowed Zone`".
  - The user is a green or red `circleMarker`, and the map calls `fitBounds`.
  - An overlay shows "Office: lat, lng" and "✓/⚠ Nm away".
- Messages: "Inside Office Geofence!", "Outside Office Perimeter", "Weak GPS reception indoors…", "GPS Permission / Reception Error" (L13359–13467).

### 3.4 Submit gate and action types

- **Check-in** needs a photo, a GPS fix, and inside ≤100 m. Otherwise the button reads "OUTSIDE 100M GEOFENCE (CANNOT CHECK IN)" (L13024–13031, L13535).
- **Check-out** needs a photo, and any distance is accepted ("Remote Checkout Allowed", L13421). However, the main button calls `te()` while no fix exists (L13506), so a **successful GPS fix is still needed**.
- **Payload** (L13008–13016): `{photoUrl, latitude: a?.lat ?? Pc.lat, longitude: a?.lng ?? Pc.lng, distanceMeters: s ?? (check_in ? 0 : 999)}`. It is sent together with a 3 s artificial delay.
- **Recording** `Ll.k` (L14317–14333): `Ts(telegramId, actionType, undefined, {photoUrl, latitude, longitude, distanceMeters})`. The returned row is merged into the list and metrics are recomputed. If the error text contains `removed from database`, the user is force-logged-out.
- **Action strings**: `check_in`, `check_out`.
- **Note prefixes** in use: `[Manual Remote Check-out] …`, `[Supervisor Checkout] …`, `[Supervisor Shift Closeout] …`, `[Supervisor Dossier Override] …`.
- The Dossier counts a log as "remote" when `distance_meters > 100` or the note contains "remote" (L1040).

### 3.5 Duration and timing logic

- **Mobile metrics** come from `Es(logs)` in the data layer. They are recomputed every 15 s while checked in (L14308–14314).
- **Per-log `durationFormatted`** comes from the data layer.
- **Calendar `Tl`** (L6701–6711): sorts each Tashkent day, pairs `check_in`→`check_out`, caps each pair at **10 h** (`36e6` ms), and formats with `vs(min)`. A shift that crosses midnight does not pair inside a single day bucket.
- **"Active" rule** (admin, manager, matrix): the person's latest log is `check_in` and is less than 10 h old (L563, L787, L1022, L1549, L2781, L4163). Older open check-ins are treated as checked out.
- **Manager live feed**: a check-out matches a check-in when it falls within **18 h** after it (`648e5`, L4454).
- **Dossier**: pairs check-ins and check-outs with a stack, then reports total hours, regular hours (≤40) vs overtime (>40), average shift, and perimeter-compliance % (L1036–1063).
- **Schedule pills** (`Sl` L6279–6383, `Fl` L13735–13860):
  - Use Tashkent minutes-of-day.
  - Overnight shifts (start > end) count yesterday's weekday when now < end.
  - Within ≤45 min of start → "CHECK-IN READY".
  - Past start → "SHIFT STARTED … AGO" / "CHECK-IN PENDING".

### 3.6 Identity, offline and localStorage fallback

`gl()` (L6182–6210) resolves the user in this order:
1. Telegram `initDataUnsafe.user`, merged with `7core_user_<id>`
2. `7core_active_user`
3. A **random 9-digit id** persisted in `7core_fallback_id` (`1e8 + rand*9e8`), with empty names

Storage keys:
- `7core_user_<id>`, `7core_active_user`: written by `_l` on registration and profile save.
- `7core_employee_<id>`: cached employee row.
- `7core_employees`: map read as a last fallback by `Sl` and `Fl`.
- `7core_registered_<id>`, `7core_logged_out_<id>`: registration state flags.

Other notes:
- `Ll` also reloads on `window` events `7core_attendance_update` and `storage` (cross-tab). Nothing in this file dispatches `7core_attendance_update`, which suggests a local-storage mode in the data layer.
- There is no offline queue in the UI. A failed `Ts` only triggers an error haptic and a console error.

### 3.7 Telegram WebApp usage (`fl`, L6162–6265)

- `pl()` returns `window.Telegram.WebApp`. `ml()` returns whether `initData.length > 0`. Neither validates the signature: the UI trusts `initDataUnsafe.user.id`, so any validation must happen server-side.
- `hl()` calls `ready()`, `expand()`, then `headerColor &&= '#F8F9FD'` and `backgroundColor &&= '#F8F9FD'` (L6178). Those are SDK property setters, and `&&=` assigns only when a value is already present.
- `vl(kind)` triggers HapticFeedback `notificationOccurred` (success/warning/error) or `impactOccurred` (light/medium), gated on `isVersionAtLeast('6.1')`.
- `yl()` returns the LocationManager (≥8.0). `bl()` calls `openSettings()`, behind the "Telegram Settings" button, which is shown only when `ml()` (L13446). `xl()` requests the location (2.5 s default timeout).
- Not used: MainButton, BackButton, sendData, close, showPopup or CloudStorage.

## 4. Admin dashboard features

**ATTENDANCE MASTER RECORD** (L3144–3520):
- **Filters**:
  - Search ("Search employee, ID, note...") goes to the server as `searchQuery`.
  - Range buttons `today | yesterday | week | month | all` go through `Ys`.
  - Department chips come from `kc` minus fleet.
  - Each filter change re-runs `Os`.
- **Views**: `flat` table or `grouped` per employee (check-in count, duration, selfie, edit).
- **Columns**: EMPLOYEE, DEPARTMENT, ACTION, DATE & TIME, VERIFICATION, AUDIT NOTE, STATUS.
  - VERIFICATION shows a selfie thumbnail plus a distance pill that is green when ≤`Pc.radiusMeters`, or the text "Manual" when there is no distance.
  - AUDIT NOTE shows `[Admin] admin_note`, else `note`.
- **Selection**: Select All and row checkboxes only drive the "Selected" counter. **There is no bulk action.**
- **Excel**:
  - "Download Monthly (.xlsx)" calls `Uc({monthDateStr: Ks(), department, managerName: USERNAME|'Admin'})` (L2814–2824).
  - `Zc` has its own "Monthly Attendance (.xlsx)" export (L1678–1693) that also passes default shift, team logs, day notes and `allowedTelegramIds`.
  - Neither exceljs nor Excel-building code appears in this file; `Uc` lives in the data layer.
  - The only CSV export is the Dossier "Export History CSV" (a `data:text/csv` link).
- **Maps**: none in admin. Leaflet is used only in the employee `Nl` modal. Admin and manager views show coordinates as text in `qc`.
- **Schedule editing** (`Zc`, used inside `Qc`):
  - Week navigation (Previous / Current / Next); shift-group filter All / Main / Custom / Night (grouping heuristic at L1713); department filter All/7CORE/CARGOGPT/HOS (L1829); member search.
  - Each cell has the status `scheduled` / `off` / `sick` (labelled "Scheduled (Work)", "Day Off", "Sick Leave") and optional "Custom Hours". Cells for past days and today are locked (`Zs(weekStart, day)`; "Locked (Past & Today)").
  - Live "IN HH:MM" / "Not In" markers come from the logs.
  - "Save Changes" calls `ic(rows)` (L1619).
- **Day notes**:
  - Modal "Daily Note & Dispatch Exceptions", with Quick Tags "Late Approved", "Early Departure", "Shift Swap", "Excused Absence" and "Overtime Approved" (L2178).
  - Saved with `cc(telegramId, dayDate, note, managerName)`; Clear calls `cc(...,'')`. They load via `sc(undefined, weekDates)`, keyed `<tgId>_<date>`.
- **Employee management**: edit via `Gc`/`ks`, delete via `Jc`/`Rs`, department and manager assignment via `$c` (`bc`/`yc`), manual logs via `Kc`/`Ns`, log edit/delete via `Wc` (`js`/`Ms`), forced clock-out via `Ts`.
- **Passkey and geofence settings**: none in admin. The passkey lives in the dev console; geofence settings are not editable anywhere in this UI.

## 5. Manager portal and developer console features

**Manager portal**:
- **Data scope** (`W`, L4121–4145): `pc` re-validates the session; then `Ds()` returns **all** employees minus names containing "deactivated"; then `Os()` (logs) and `nc(weekStart,'All',null)` are filtered to those IDs. **There is no team or manager scoping in the UI.** If it exists, it lives inside `Ds`/`pc`.
- **Shift Configuration `ol`** (L3788–4057):
  - Presets "Main Shift" 16:00–02:00 and "Second Shift" 02:00–16:00, or "Custom" with Start/End "(Military)" picked from 30-minute slots.
  - Working Days quick-sets Mon–Fri, Mon–Sat, All Days and Clear (Off), plus per-day toggles with past and present days locked ("Past & present days are locked forever.").
  - Saves with `As(telegram_id, {shift_name, shift_start_time, shift_end_time, shift_days}, weekStart)` (L3834). `shift_name` is one of `Shift Unassigned`, `Main Shift (a – b)`, `Second Shift (a – b)`, `Custom (a – b)`.
- **Live Check-Ins** (L4414–4870):
  - Week navigation, "Filter Day", Expand/Collapse All, and stats "Week Check-Ins", "On Duty Now", "Late Flags".
  - Per-day table columns: Member, Selfie Picture, Check-In (UZT), Check-Out (UZT), Shift & Duration, Timeliness (`Vc` Late/On-Time), Location Proximity ("Office (Nm)" / "Nm Away" / "Remote"), Notes.
  - Per-day schedule overrides come from `nc` rows (`row[dayKey].startTime/endTime`).

**Developer console tabs**:
- `managers`, "Manager Accounts & Team Access":
  - Form fields: Username, Password ("leave blank to keep current" when editing), Full Name, Department ("Strictly 3 Departments": HOS / 7CORE / CARGOGPT), Team Name.
  - Create calls `gc({...})`; edit calls `_c(id, {...})` (L5078–5084). Delete asks `confirm()` and then calls `vc(id)`.
  - The table falls back to showing shift `09:00 - 18:00` (L5456).
- `users`, "Assign Users to Managers & Switch Departments": search and department filter; `bc` and `yc` as in admin. Status shows "Assigned" or "Direct Dept".
- `admins`, "Admin Terminal Users": "Create New Dispatch Admin" with Username, Password, Display Name and Role (default `Admin`) calls `Cc({username,password,display_name,role})`. Delete calls `wc(id)`.
- `database`, "Full Database Explorer":
  - Table picker: `employees`, `attendance_logs`, `team_schedules`, `managers`, `admin_users`, `organization_security`. Rows load with `Tc(table)` (L5048).
  - Client-side search over rows.
  - "Export JSON" downloads a Blob named `supabase_<table>_export_<YYYY-MM-DD>.json`.
  - "Delete Row" calls `Ec(table, keyCol, value)`, where `keyCol` is `id`, else `telegram_id`, else `key_name` (L5137–5139).
- `security`, "Security Configuration & Passkeys": shows "Current Active Passkey" `Is()`, or the literal **`7CORE2026`** when empty (L5969). "Set New Passkey" calls `Ls(code)`, and the UI displays the value upper-cased.

## 6. Hardcoded values

**Branding**:
- "OPSECTOR" (alt, L14471, L15482); "Fleet Logistics TMS" (L14476); "OpSector Dispatch Command • 35 Trucks Live" (L14601); "© <year> OPSECTOR Fleet Technologies" (L15486).
- "OPSECTOR Attendance" / "ADMIN TERMINAL" (L2845–2848); "Sevencore Logo" (L2274, L2840); "Sevencore" (L3623).
- "SEVENCORE" alt text (L3669, L4195, L6018, L6939, L13974, L14183).
- "7CORE TEAM OPERATIONS" (L3674); "Departments: HOS • 7CORE • CARGOGPT • Fleet" (L3722); "ADMIN /7CORE" (L2440); "Welcome to 7CORE Attendance" (L13956); "7CORE Security Gate" (L13981).
- Default department `7CORE` (L128, L7160, L13961). The avatar fallback glyph is `7` (L6039).

**Asset paths** (absolute, so they must be served from the web root):
- `/logo.png`, the light-theme logo: L2273, L2839, L3668, L4194, L6003, L14182.
- `/logo2.png`, the dark-theme logo: same sites plus L3622, L6938, L13973.
- `/logo3.png`, the landing logo: L14471, L15481.
- `/assets/aistudio/Opsector_Software_License___Intellectual_Property_Notice_b2eabd21.pdf?v=2` (L2653). It is shown as `…#toolbar=1&navpanes=0` (L2716) and downloads as `Opsector_Software_License___Intellectual_Property_Notice.pdf` (L2687). The `aistudio` folder name suggests the app was built with Google AI Studio.
- There are no sounds or other media.

**External URLs**:
- OSM tiles `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png` (L12786).
- Leaflet marker icons `https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon{,-2x}.png` and `marker-shadow.png` (L12776–12778). They are configured but unused, because only a `divIcon` and a `circleMarker` are drawn.
- There are no `fetch` or API URLs in this file.

**Credentials and codes**:
- Dev username pre-fill `NAJMIDDIN` (L4896, L4995).
- Passkey display fallback and placeholder `7CORE2026` (L5969, L5984).
- No passwords are hardcoded here. Placeholders only: `dispatch_mgr` (L3719), `core_mgr` (L5339), `shift_lead` (L5705).

**Geo and time**:
- 100 m radius hardcoded in UI checks (L12886, L13588, L1039). Office coordinates come only from `Pc`, which is not in this file.
- `Asia/Tashkent` throughout. Default shift `16:00`–`02:00`, second shift `02:00`–`16:00`. Ready window 45 min.

**Thresholds**:
- 10 h open-shift expiry (`36e6`); 18 h check-out pairing (`648e5`).
- 15 s metrics tick; 4 s realtime throttle; 500 ms realtime debounce on mobile; 3 s minimum submit delay (L13017, L13628).
- Selfie 220 px at JPEG 0.65; profile photo 220 px at 0.7.

**Telegram**: version gates `6.1` (haptics) and `8.0` (LocationManager); colour `#F8F9FD`.

**Landing page `Rl`**:
- Prices $6.99 / $9.99 / $16.99 per user; annual ×0.833.
- ROI estimate = 18 min × fleet × 26 shifts × $22/h (L14452). Default fleet size 35.
- The contact form only flips local state and sends nothing (L14454).
- Placeholders `alex@fleetcompany.com` and `+1 (555) 019-2834`.

**Theme and session keys**: `opsector_admin_theme`, `7core_manager_theme`, `7core_manager_session`, `7core_dev_session`, `7core_admin_user` (sessionStorage), plus the mobile keys in §3.6.

## 7. Realtime

This file contains no `supabase.channel` calls. It uses two data-layer subscription helpers, each returning an unsubscribe function.

| Subscriber | Helper | Trigger action |
|---|---|---|
| Admin dashboard `tl` (L2762–2772) | `Bs(cb)` (global change feed) | Re-runs `ce()` (`Os` and `Ds`), throttled to once per 4 s |
| Assignments `$c` (L2360–2366) | `Bs(cb)` | Re-runs `Ds` and `hc`, no throttle |
| Manager `sl` (L4146–4157) | `Bs(cb)` | Re-runs `W()` (`pc`, `Ds`, `Os`, `nc`), 4 s throttle |
| Dev `ll` (L5060–5072) | `Bs(cb)` | Re-runs `Ae()` and, if the DB tab is open, `Tc(currentTable)`, 4 s throttle |
| Mobile `Ll` (L14290–14308) | `zs(telegramId, cb)` (per-employee feed) | Re-runs `D()` (`Cs` and `gs`), 500 ms debounce. Also listens to `7core_attendance_update` and `storage` window events. |

Which tables `Bs` and `zs` watch is defined in the data layer. Separately, 1 s clocks drive the live timers in `tl`, `Yc` and `sl`.

## 8. Serving from `http://127.0.0.1` on desktop, outside Telegram

- **Routing**:
  - `/` shows the marketing page. Use `#mobile` (or `#app`) for the employee app, and `#admin`, `#7manage` or `#dev7core` for the portals.
  - Serve at the web root. A sub-path containing `/app`, `/dev`, `/core` or `/manage` mis-routes. The absolute `/logo*.png` and `/assets/...pdf` paths also break under a sub-path.
- **Identity**: with no Telegram, `gl()` mints a random 9-digit `telegram_id` per browser profile (`7core_fallback_id`), with no name, username or photo. Registration then creates an employee with that ID. Clearing storage creates a new person.
- **Telegram APIs**:
  - `window.Telegram` is absent, unless `telegram-web-app.js` is included in `index.html`, which is outside this file. If it is loaded, `initData` is empty.
  - All calls are guarded: haptics become no-ops, and the "Telegram Settings" button is hidden.
  - The LocationManager is unavailable, so `Lc` must fall back to `navigator.geolocation`. Confirm this in the data layer.
- **Secure context**:
  - `127.0.0.1` and `localhost` count as secure contexts, so `getUserMedia`, geolocation and `navigator.clipboard` work there.
  - A LAN IP over plain http (for example, phone testing) is not secure. There the camera fails with "Camera streaming is not supported…" and only the file-input fallbacks remain; geolocation fails too.
- **Geofence**:
  - Desktop location is Wi-Fi/IP based, and `Pc` is a fixed office point. Check-in is therefore almost always "OUTSIDE 100M GEOFENCE".
  - The UI has **no override** (the remote path `Pl` is unreachable).
  - Workarounds: Chrome DevTools → Sensors → custom location at `Pc`, or change `Pc` in the data layer.
  - Check-out also needs a successful GPS fix (§3.4).
- **Camera**: works with a desktop webcam (the chain falls back to `{video:true}`). With no webcam, use "Or select photo from gallery".
- **Admin**: needs a window at least 1024 px wide and a non-mobile user agent, which a desktop normally passes.
- **Network**: the OSM tiles need internet; offline, the mini-map is blank but the flow still works. Leaflet's CSS and the "Plus Jakarta Sans" font are loaded outside this file.
- **Dialogs**: `alert`/`confirm` in the dev console and admin work in a desktop browser. Some Telegram webviews may block them.

## 9. Data-layer identifier glossary (inferred from call sites)

- **Employees**:
  - `Ds()` lists employees; `gs(id)` gets one; `_s(row)` upserts on registration; `ks(id, patch)` updates the profile; `Rs(id)` deletes.
  - `bc(id, dept)` sets the department; `yc(id, mgrId|null)` assigns a manager; `As(id, shift, weekStart)` saves a shift.
  - `ps(id)` resets local registration.
- **Logs**:
  - `Os(filters?)` lists logs; `Cs(id)` gets one employee's logs; `ws(id, y, m)` gets a month.
  - `Ts(id, action, note?, {photoUrl,latitude,longitude,distanceMeters})` records a check-in or check-out.
  - `Ns(row)` inserts a manual log; `js(id, patch)` edits one; `Ms(id)` deletes one.
  - `Es(logs)` computes metrics.
- **Schedules and notes**: `nc(weekStart, dept, ?)` returns the weekly matrix; `ic(rows)` saves it; `sc(_, dates)` gets day notes; `cc(id, date, note, author)` saves a day note.
- **Export**: `Uc(opts)` builds the monthly .xlsx.
- **Auth**:
  - Managers: `mc(u,p)` logs in, `pc(id,u)` re-validates, `hc()` lists, `gc`/`_c`/`vc` create, update and delete.
  - Admins: `Sc()` lists, `Cc`/`wc` create and delete. The admin login itself is `Oc`, which is outside this file.
  - Dev: `xc(u,p)` logs in.
  - Passkey: `Fs(code)` verifies, `Is()` gets, `Ls(code)` sets.
- **Database explorer**: `Tc(table)` selects a whole table; `Ec(table, col, val)` deletes a row.
- **Realtime**: `Bs(cb)` and `zs(id, cb)`.
- **Geo**: `Lc(opts)` gets a position; `Ic(lat,lng)` returns distance and inside; `Pc` holds `{lat,lng,radiusMeters,name}`.
- **Time helpers**:
  - `Hs(date)` and `Ws(date)` return the week-start date; `Ks()` returns today's date string; `Ys(range)` returns `{start,end}`.
  - `Us(weekStart, dayKey)` returns a date; `Zs(weekStart, dayKey)` says whether a day is editable.
  - `Xs(ts)` formats a time; `Bc(ts)` returns HH:MM in Tashkent; `zc(ts)` returns the Tashkent date; `Vc(hhmm, start)` returns `{isLate}`.
  - `hs(emp)` says whether a shift is assigned; `ms(days)` normalises days; `vs(min)` formats "Xh Ym"; `Vs` holds the weekday keys.
- **Departments**: `kc` is the list; every picker filters out "fleet".

## 10. Quirks and dead paths

- `Pl` (Manual Remote Check-Out) is mounted, but its opener `onManualCheckout` is passed to `Sl` (L14384), and `Sl` never destructures it (L6266). The modal is unreachable.
- `Yc` marks `isOvertimeShift` at ≥10 h (L796), but it filters out shifts of 10 h or more first, so the ">12h Shift" badge (L993) never shows.
- On check-out, the label "CONFIRM & CHECK OUT" appears before any GPS fix, but clicking it only re-requests GPS (L13506).
- The un-minified names `[DEPTF, DEPTSET]` (L1695) show the production bundle was hand-edited after the build.
- `Kc`, `Qc` and `ol` call hooks after an early `return null`. This works only because their hook count drops to zero while closed; it is fragile.
- The landing copy claims "gallery upload prevention", but `Nl` offers a gallery picker (L13045–13049).
- "Return to Mobile View" (desktop gate) and "← Exit to Mobile App" (dev console) both go to the landing page, not `#mobile`.
- Only the dev console uses its cross-portal navigation props (L5193, L5201). `Ll`, `nl` (which uses only `onBackToApp`), `sl` and `Rl` ignore the `onNavigateTo*` props the router passes them.

**Embedded instructions**: none found. No string in the analysed code addresses an AI or a reader, or asks for any action. The only notice-like content is the license/IP PDF link (L2653) and its modal (L2677–2718).
