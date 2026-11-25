/* Sevencore attendance Mini App.
 * Identity comes from Telegram's signed initData (checked on the server); every decision about
 * the face, liveness, shift and location is made on the server. This page only shows state,
 * streams camera frames and renders the answers. */
(function () {
  "use strict";

  var tg = window.Telegram && window.Telegram.WebApp;
  var app = document.getElementById("app");
  var S = {
    lang: "uz", data: null, initData: "", offset: 0, scan: null, scanning: false, stream: null,
    loc: null, locState: "idle", cooldownUntil: 0, reg: null, regScan: null, tickTimer: null, refreshTimer: null,
  };
  var TICKS = 72;

  // ---------------------------------------------------------------- helpers
  function esc(v) {
    return String(v == null ? "" : v).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function t(key, vars) {
    var table = window.I18N[S.lang] || window.I18N.uz;
    var s = table[key] != null ? table[key] : (window.I18N.en[key] != null ? window.I18N.en[key] : key);
    if (vars) s = String(s).replace(/\{(\w+)\}/g, function (_, k) { return vars[k] != null ? vars[k] : ""; });
    return s;
  }
  function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  function $(id) { return document.getElementById(id); }
  function haptic(kind, style) {
    try {
      if (!tg || !tg.HapticFeedback) return;
      if (kind === "impact") tg.HapticFeedback.impactOccurred(style || "medium");
      else if (kind === "notify") tg.HapticFeedback.notificationOccurred(style);
      else tg.HapticFeedback.selectionChanged();
    } catch (e) { /* older clients */ }
  }
  function nowMs() { return Date.now() + S.offset; }
  function tz() { return (S.data && S.data.tz) || "Asia/Tashkent"; }
  var fmtCache = {};
  function parts(ms) {
    var key = tz();
    if (!fmtCache[key]) {
      fmtCache[key] = new Intl.DateTimeFormat("en-GB", {
        timeZone: key, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit",
        second: "2-digit", weekday: "short", hourCycle: "h23",
      });
    }
    var o = {};
    fmtCache[key].formatToParts(new Date(ms)).forEach(function (p) { o[p.type] = p.value; });
    var wd = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(o.weekday);
    return { y: +o.year, mo: +o.month, d: +o.day, h: +o.hour % 24, mi: +o.minute, s: +o.second, wd: wd,
             date: o.year + "-" + o.month + "-" + o.day, hm: (o.hour % 24 < 10 ? "0" : "") + (+o.hour % 24) + ":" + o.minute };
  }
  function hm(ms) { return parts(ms).hm; }
  function dur(min) {
    min = Math.max(0, Math.floor(min || 0));
    var h = Math.floor(min / 60), m = min % 60;
    if (h && m) return t("hm", { h: h, m: m });
    return h ? t("h", { n: h }) : t("m", { n: m });
  }
  function dist(m) {
    if (m == null) return "";
    return m < 1000 ? t("meters", { n: Math.round(m) }) : t("km", { n: (m / 1000).toFixed(m < 10000 ? 1 : 0) });
  }
  function dayLabel(dateStr) {
    var today = parts(nowMs()).date, y = parts(nowMs() - 864e5).date, tm = parts(nowMs() + 864e5).date;
    if (dateStr === today) return t("today");
    if (dateStr === y) return t("yesterday");
    if (dateStr === tm) return t("tomorrow");
    var d = new Date(dateStr + "T12:00:00Z");
    return t("weekdays")[(d.getUTCDay() + 6) % 7];
  }
  function initials(e) {
    return ((e.first_name || "?")[0] + ((e.last_name || "")[0] || "")).toUpperCase();
  }

  // ---------------------------------------------------------------- telegram + api
  function readInitData() {
    if (tg && tg.initData) return tg.initData;
    var m = location.hash.match(/tgWebAppData=([^&]+)/);
    if (m) { try { return decodeURIComponent(m[1]); } catch (e) { /* ignore */ } }
    return "";
  }
  function telegramUser() {
    try {
      if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user) return tg.initDataUnsafe.user;
      var u = new URLSearchParams(S.initData).get("user");
      return u ? JSON.parse(u) : null;
    } catch (e) { return null; }
  }
  function pickLang() {
    var saved = null;
    try { saved = localStorage.getItem("sc_lang"); } catch (e) { /* storage blocked */ }
    if (saved && window.I18N[saved]) return saved;
    var u = telegramUser();
    var code = ((u && u.language_code) || "uz").slice(0, 2);
    return window.I18N[code] ? code : "uz";
  }
  function setupTelegram() {
    if (!tg) return;
    try {
      tg.ready();
      tg.expand();
      if (tg.isVersionAtLeast && tg.isVersionAtLeast("6.1")) { tg.setHeaderColor("#05070b"); tg.setBackgroundColor("#05070b"); }
      if (tg.isVersionAtLeast && tg.isVersionAtLeast("7.7") && tg.disableVerticalSwipes) tg.disableVerticalSwipes();
      if (tg.isVersionAtLeast && tg.isVersionAtLeast("7.10") && tg.setBottomBarColor) tg.setBottomBarColor("#05070b");
      if (tg.BackButton) tg.BackButton.onClick(onBack);
    } catch (e) { /* older clients */ }
  }
  function backButton(show) {
    try { if (tg && tg.BackButton) show ? tg.BackButton.show() : tg.BackButton.hide(); } catch (e) { /* ignore */ }
  }
  function closingConfirm(on) {
    try { if (tg) on ? tg.enableClosingConfirmation() : tg.disableClosingConfirmation(); } catch (e) { /* ignore */ }
  }

  function api(path, body, blob) {
    var opts = { method: "POST", headers: { "X-Init-Data": S.initData } };
    if (blob) { opts.headers["Content-Type"] = "image/jpeg"; opts.body = blob; }
    else { opts.headers["Content-Type"] = "application/json"; opts.body = JSON.stringify(body || {}); }
    return fetch(path, opts).then(function (res) {
      return res.json().catch(function () { return {}; }).then(function (data) {
        if (!res.ok || data.ok === false) {
          var err = Object.assign({}, data, { error: data.error || "server_error", status: res.status });
          throw err;
        }
        return data;
      });
    }, function () { throw { error: "network" }; });
  }

  function errorText(e) {
    e = e || {};
    var code = e.error || e.reason || "server_error";
    if (code === "too_far") return t("e_too_far", { d: dist(e.distance_m), r: e.radius_m || (S.data && S.data.geofence.radius_m) || 100 });
    if (code === "too_soon") return t("e_too_soon", { s: e.wait_s || 60 });
    if (code === "blocked" && e.blocked) return blockedText(e.blocked).status + ". " + blockedText(e.blocked).sub;
    var key = "e_" + code;
    var txt = t(key);
    return txt === key ? t("e_server_error") : txt;
  }

  // ---------------------------------------------------------------- icons
  var ICON = {
    face: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 21v-8a7 7 0 0 1 7-7h8M43 6h8a7 7 0 0 1 7 7v8M58 43v8a7 7 0 0 1-7 7h-8M21 58h-8a7 7 0 0 1-7-7v-8"/><path d="M23 24v5M41 24v5M33 25v11h-3M24 43c4.6 3.6 11.4 3.6 16 0"/></svg>',
    lock: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><rect x="15" y="28" width="34" height="26" rx="7"/><path d="M22 28v-7a10 10 0 0 1 20 0v7M32 38v6"/></svg>',
    clock: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="32" cy="32" r="22"/><path d="M32 20v13l8 5"/></svg>',
    check: '<svg viewBox="0 0 64 64"><path pathLength="100" d="M16 33l11 11 22-24"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    inArrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 17l5-5-5-5M15 12H3M15 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4"/></svg>',
    outArrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 17l5-5-5-5M19 12H8M9 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4"/></svg>',
    alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5v.01"/></svg>',
    next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    globe: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>',
    chev: '<svg viewBox="0 0 46 46"><path d="M27 13l-10 10 10 10"/><path d="M37 13l-10 10 10 10"/></svg>',
  };

  function ticksSvg() {
    var out = '<svg class="ticks" viewBox="0 0 200 200" aria-hidden="true">';
    for (var i = 0; i < TICKS; i++) {
      var a = (i / TICKS) * Math.PI * 2 - Math.PI / 2, c = Math.cos(a), s = Math.sin(a);
      out += '<line x1="' + (100 + 81 * c).toFixed(2) + '" y1="' + (100 + 81 * s).toFixed(2) + '" x2="' +
        (100 + 88 * c).toFixed(2) + '" y2="' + (100 + 88 * s).toFixed(2) + '"/>';
    }
    return out + "</svg>";
  }
  function orbHtml(mode, icon, title, small) {
    return '<button class="orb" id="orb" data-mode="' + mode + '" aria-label="' + esc(title) + '">' +
      '<span class="glow"></span><span class="ripple"></span><span class="ripple r2"></span><span class="halo"></span>' + ticksSvg() +
      '<span class="core"><video id="video" playsinline muted autoplay></video><img class="shot" id="shot" alt="">' +
      '<span class="face" id="orb-icon">' + icon + '</span>' +
      '<span class="label"><b id="orb-title">' + esc(title) + '</b><small id="orb-small">' + esc(small) + "</small></span>" +
      '<span class="scanline"></span><span class="check">' + ICON.check + "</span></span>" +
      '<span class="arrows left" id="arr-left">' + ICON.chev + '</span><span class="arrows right" id="arr-right">' + ICON.chev + "</span></button>";
  }
  function stageHtml(mode, icon, title, small) {
    return '<div class="stage rise d1">' + orbHtml(mode, icon, title, small) + "</div>";
  }
  function scanHeadHtml() {
    return '<div class="scan-head"><button class="x" id="scan-x" aria-label="' + esc(t("cancel")) + '">' + ICON.x + "</button>" +
      '<div class="t"><b id="scan-title"></b><small id="scan-sub"></small></div></div>';
  }

  // ---------------------------------------------------------------- screens
  function screenSplash() {
    app.innerHTML = '<div class="center-screen splash"><div><div class="mark"><i></i></div>' +
      '<div class="wordmark">SEVENCORE</div><div class="loader"></div></div></div>';
  }
  function screenPlain(title, body, retry) {
    app.innerHTML = '<div class="center-screen plain"><div><div class="mark"><i></i></div><h1>' + esc(title) + "</h1><p>" +
      esc(body) + "</p>" + (retry ? '<button class="ghost" id="retry" style="max-width:240px">' + esc(t("retry")) + "</button>" : "") +
      "</div></div>";
    if (retry) $("retry").onclick = load;
  }

  function screenRegister(errorMsg) {
    stopTimers();
    backButton(false);
    var r = S.reg || {
      first_name: (S.data.suggested && S.data.suggested.first_name) || "",
      last_name: (S.data.suggested && S.data.suggested.last_name) || "", department: "", passkey: "",
    };
    S.reg = r;
    var depts = S.data.departments || ["7CORE", "HOS", "CARGOGPT"];
    app.innerHTML =
      '<div class="reg">' +
      '<div class="steps rise"><div class="on"><i></i><small>1 · ' + esc(t("step_info")) + '</small></div><div><i></i><small>2 · ' +
      esc(t("step_face")) + "</small></div></div>" +
      '<h1 class="rise d1">' + esc(t("reg_title")) + '</h1><p class="lead rise d1">' + esc(t("reg_sub")) + "</p>" +
      (errorMsg ? '<div class="alert">' + ICON.alert + "<span>" + esc(errorMsg) + "</span></div>" : "") +
      '<form id="reg-form" class="rise d2" autocomplete="off" novalidate>' +
      '<div class="row2"><label class="field"><span>' + esc(t("first_name")) + '</span><input name="first_name" maxlength="40" placeholder="' +
      esc(t("first_ph")) + '" value="' + esc(r.first_name) + '"></label>' +
      '<label class="field"><span>' + esc(t("last_name")) + '</span><input name="last_name" maxlength="40" placeholder="' +
      esc(t("last_ph")) + '" value="' + esc(r.last_name) + '"></label></div>' +
      '<div class="field"><span>' + esc(t("department")) + '</span><div class="seg" id="seg">' +
      depts.map(function (d) { return '<button type="button" data-d="' + esc(d) + '"' + (r.department === d ? ' class="on"' : "") + ">" + esc(d) + "</button>"; }).join("") +
      "</div></div>" +
      '<label class="field"><span>' + esc(t("passkey")) + '</span><input name="passkey" class="code" maxlength="32" autocapitalize="characters" placeholder="' +
      esc(t("passkey_ph")) + '" value="' + esc(r.passkey) + '"><div class="note">' + esc(t("passkey_hint")) + "</div></label>" +
      '<button class="primary" id="reg-go" type="submit"><span>' + esc(t("continue_face")) + "</span>" + ICON.next + "</button>" +
      "</form></div>";
    var form = $("reg-form");
    $("seg").addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (!b) return;
      haptic("select");
      r.department = b.getAttribute("data-d");
      Array.prototype.forEach.call(this.children, function (c) { c.classList.toggle("on", c === b); });
    });
    form.addEventListener("input", function () {
      r.first_name = form.elements.first_name.value;
      r.last_name = form.elements.last_name.value;
      r.passkey = form.elements.passkey.value;
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var first = r.first_name.trim(), last = r.last_name.trim();
      if (first.length < 2 || last.length < 2) return screenRegister(t("e_bad_name"));
      if (!r.department) return screenRegister(t("e_bad_department"));
      if (!r.passkey.trim()) return screenRegister(t("e_bad_passkey"));
      var btn = $("reg-go");
      btn.disabled = true;
      btn.innerHTML = '<span class="spin"></span>';
      api("api/register", { first_name: first, last_name: last, department: r.department, passkey: r.passkey.trim() })
        .then(function (res) {
          S.regDone = true;
          S.regScan = { scan: res.scan, until: Date.now() + (res.scan.expires_in - 8) * 1000 };
          haptic("notify", "success");
          screenEnroll(false);
        })
        .catch(function (err) { haptic("notify", "error"); screenRegister(errorText(err)); });
    });
  }

  function screenEnroll(again) {
    stopTimers();
    backButton(!again);
    document.documentElement.style.setProperty("--accent", "var(--out)");
    document.documentElement.style.setProperty("--accent-hi", "var(--out-hi)");
    app.innerHTML =
      scanHeadHtml() +
      '<div class="enroll-wrap">' +
      (again ? "" : '<div class="steps rise"><div class="on"><i></i><small>1 · ' + esc(t("step_info")) +
        '</small></div><div class="on"><i></i><small>2 · ' + esc(t("step_face")) + "</small></div></div>") +
      '<div class="top-copy rise"><h1>' + esc(t(again ? "face_again_title" : "face_setup_title")) + "</h1><p>" +
      esc(t(again ? "face_again_sub" : "face_setup_sub")) + "</p></div>" +
      stageHtml("out", ICON.face, t("tap_setup"), t("tap")) +
      '<div class="below"><div class="hint" id="hint"></div><div class="subhint" id="subhint">' + esc(t("tap_to_start")) + "</div></div></div>";
    $("orb").onclick = function () { if (!S.scanning) startEnroll(); };
    $("scan-x").onclick = cancelScan;
  }

  // ---------------------------------------------------------------- home
  function blockedText(b) {
    b = b || {};
    var next = b.next ? dayLabel(b.next.date) + " " + b.next.start : null;
    // "Next shift: tomorrow 15:00 · check-in from 13:00"
    var nextLine = next ? t("sub_day_off", { next: next }) + (b.opens ? " · " + t("sub_in_from", { opens: b.opens }) : "") : t("sub_none");
    switch (b.code) {
      case "no_shift": return { status: t("st_no_shift"), sub: t("sub_no_shift") };
      case "day_off": return { status: t("st_day_off"), sub: nextLine };
      case "sick": return { status: t("st_sick"), sub: nextLine };
      case "vacation": return { status: t("st_vacation"), sub: nextLine };
      case "too_early": return { status: t("st_too_early"), sub: t("sub_too_early", { opens: b.opens }) };
      case "shift_over": return { status: t("st_shift_over"), sub: next ? nextLine : (b.ended ? t("sub_shift_over", { ended: b.ended }) : t("sub_none")) };
      case "shift_done": return { status: t("st_shift_done"), sub: nextLine };
      case "checkin_closed": return { status: t("st_in_closed"), sub: t("sub_in_closed", { closed: b.closed }) + " · " + nextLine };
      case "checkout_not_yet": return { status: t("st_on_shift"), sub: t("sub_out_opens", { opens: b.opens }) };
      default: return { status: t("e_blocked"), sub: "" };
    }
  }

  function homeView() {
    var st = S.data.state, now = nowMs();
    var v;
    var since = st.open_since ? Date.parse(st.open_since) : 0;
    if (st.action === "check_out") {
      v = { mode: "out", icon: ICON.face, title: t("check_out"), small: t("tap"),
            status: st.closes ? t("st_out_open") : t("st_on_shift"),
            sub: st.closes ? t("sub_out_window", { closes: st.closes, worked: dur((now - since) / 6e4) })
                           : t("sub_on_shift", { since: hm(since), worked: dur((now - since) / 6e4) }), live: true };
    } else if (st.blocked && st.blocked.code === "checkout_not_yet") {
      // on shift: check-out opens at the shift end
      v = { mode: "duty", icon: ICON.clock, title: t("check_out"), small: t("opens_small", { opens: st.blocked.opens }),
            status: t("st_on_shift"), sub: t("sub_on_shift", { since: hm(since), worked: dur((now - since) / 6e4) }) +
            " · " + t("sub_out_opens", { opens: st.blocked.opens }), live: true };
    } else if (st.action === "check_in") {
      var sh = st.shift, start = Date.parse(sh.start_at);
      var late = !st.returning && now > start + (S.data.late_grace_min || 0) * 6e4;
      v = { mode: "in", icon: ICON.face, title: t(st.returning ? "check_in_again" : "check_in"), small: t("tap"),
            status: t(late ? "st_late" : "st_ready"),
            sub: (late ? t("sub_late", { start: sh.start, late: t("late_n", { n: dur((now - start) / 6e4) }) }) : t("sub_ready", { start: sh.start })) +
                 (st.closes ? " · " + t("sub_in_until", { closes: st.closes }) : ""),
            live: true };
    } else {
      var bt = blockedText(st.blocked);
      v = { mode: "lock", icon: ICON.lock, title: t("locked"), small: st.blocked && st.blocked.opens ? t("opens_small", { opens: st.blocked.opens }) : "",
            status: bt.status, sub: (st.missed_checkout ? t("missed_out") + " · " : "") + bt.sub, live: false };
    }
    if (S.cooldownUntil > now && st.action) {
      var secs = Math.ceil((S.cooldownUntil - now) / 1000);
      v = { mode: "wait", icon: ICON.clock, title: v.title, small: t("sub_cooldown", { s: secs }), status: t("st_cooldown"),
            sub: t("sub_cooldown", { s: secs }), live: false };
    }
    return v;
  }

  function greeting() {
    var h = parts(nowMs()).h;
    return t(h >= 5 && h < 11 ? "hello_morning" : h >= 11 && h < 17 ? "hello_day" : h >= 17 && h < 22 ? "hello_evening" : "hello_night");
  }

  function shiftCardHtml() {
    var st = S.data.state, day = S.data.day;
    var sh = st.shift || (st.today && st.today.status === "scheduled" ? st.today : null);
    var body;
    if (sh && sh.start) {
      body = '<div class="shift-times mono"><span>' + esc(sh.start) + "</span><i></i><span>" + esc(sh.end) + "</span></div>" +
        '<div class="shift-name">' + esc(S.data.employee.shift_name || "") + (sh.overnight ? ' · <span class="tag">' + esc(t("overnight")) + "</span>" : "") + "</div>" +
        '<div class="bar" id="bar"><div class="fill" id="bar-fill" style="width:0"></div><div class="now" id="bar-now" hidden></div></div>' +
        '<div class="bar-legend mono"><span>' + esc(sh.start) + "</span><span>" + esc(sh.end) + "</span></div>";
    } else {
      body = '<div class="empty">' + esc(t(st.assigned ? "no_shift_today" : "st_no_shift")) + "</div>";
    }
    return '<section class="card"><div class="head"><h3>' + esc(t("today_shift")) + "</h3><span>" + esc(dateText()) + "</span></div>" + body +
      '<div class="stats"><div class="stat"><small>' + esc(t("in_label")) + '</small><b class="mono">' + esc(day.first_in || "—") + "</b></div>" +
      '<div class="stat"><small>' + esc(t("out_label")) + '</small><b class="mono">' + esc(day.last_out || "—") + "</b></div>" +
      '<div class="stat"><small>' + esc(t("worked_label")) + '</small><b id="worked">' + esc(dur(day.worked_min)) + "</b></div></div></section>";
  }

  function weekCardHtml() {
    var days = t("days");
    var today = parts(nowMs()).date;
    var cells = S.data.week.map(function (w, i) {
      var cls = "wd " + w.status + (w.date === today ? " today" : "");
      return '<div class="' + cls + '"><small>' + esc(days[i]) + "</small><b>" + (+w.date.slice(8)) + "</b><i></i></div>";
    }).join("");
    return '<section class="card"><div class="head"><h3>' + esc(t("week")) + "</h3></div>" +
      '<div class="week">' + cells + "</div>" +
      '<div class="legend"><span style="--c:var(--in)">' + esc(t("legend_present")) + '</span><span style="--c:var(--warn)">' +
      esc(t("legend_late")) + '</span><span style="--c:var(--out)">' + esc(t("legend_absent")) + "</span></div></section>";
  }

  function historyCardHtml() {
    var items = S.data.history.slice(0, 8);
    var list = items.length ? '<ul class="hist">' + items.map(function (h) {
      var isIn = h.action === "check_in";
      return '<li><span class="ic ' + (isIn ? "in" : "out") + '">' + (isIn ? ICON.inArrow : ICON.outArrow) + "</span>" +
        '<span class="txt"><b>' + esc(t(isIn ? "check_in" : "check_out")) + "</b><small>" + esc(dayLabel(h.date)) +
        (h.note ? " · " + esc(h.note) : "") + '</small></span><span class="tm mono">' + esc(h.time) + "</span></li>";
    }).join("") + "</ul>" : '<div class="empty">' + esc(t("history_empty")) + "</div>";
    return '<section class="card"><div class="head"><h3>' + esc(t("history")) + "</h3></div>" + list + "</section>";
  }

  function dateText() {
    var p = parts(nowMs());
    return t("date_fmt", { wd: t("weekdays")[p.wd], d: p.d, m: t("months")[p.mo - 1] });
  }

  function screenHome() {
    stopTimers();
    backButton(false);
    var e = S.data.employee, v = homeView();
    var avatar = e.photo ? '<img src="' + esc(e.photo) + '" alt="">' : esc(initials(e));
    app.innerHTML =
      scanHeadHtml() +
      '<header class="top rise"><div class="avatar">' + avatar + '</div><div class="who"><small>' + esc(greeting()) +
      (e.department ? '<span class="dept">' + esc(e.department) + "</span>" : "") + "</small><b>" + esc(e.first_name + " " + (e.last_name || "")) +
      '</b></div><button class="chip-btn" id="lang">' + ICON.globe + esc(S.lang.toUpperCase()) + "</button></header>" +
      '<div class="clock rise"><div class="time mono" id="clock">--:--</div><div class="date" id="date">' + esc(dateText()) + "</div>" +
      '<div class="status' + (v.live ? " live" : "") + '" id="status"><i class="dot"></i><b id="st-b">' + esc(v.status) +
      '</b><span id="st-s">' + esc(v.sub) + "</span></div></div>" +
      stageHtml(v.mode, v.icon, v.title, v.small) +
      '<div class="below rise d2"><div class="hint" id="hint" hidden></div><div class="subhint" id="subhint" hidden></div><div id="loc-slot"></div></div>' +
      '<div class="cards"><div class="rise d2">' + shiftCardHtml() + '</div><div class="rise d3">' + weekCardHtml() +
      '</div><div class="rise d4">' + historyCardHtml() + "</div></div>";
    var tone = { out: ["var(--out)", "var(--out-hi)"], lock: ["var(--lock)", "#94a3b8"], wait: ["var(--warn)", "#fcd34d"],
                 in: ["var(--in)", "var(--in-hi)"], duty: ["var(--in)", "var(--in-hi)"] }[v.mode];
    document.documentElement.style.setProperty("--accent", tone[0]);
    document.documentElement.style.setProperty("--accent-hi", tone[1]);
    $("orb").onclick = onOrb;
    $("scan-x").onclick = cancelScan;
    $("lang").onclick = function () {
      var order = ["uz", "ru", "en"];
      S.lang = order[(order.indexOf(S.lang) + 1) % order.length];
      try { localStorage.setItem("sc_lang", S.lang); } catch (err) { /* ignore */ }
      haptic("select");
      screenHome();
    };
    renderLoc();
    tick();
    S.tickTimer = setInterval(tick, 1000);
    S.refreshTimer = setInterval(function () { if (!S.scanning && document.visibilityState === "visible") refresh(); }, 60000);
    if (v.mode === "in" && S.locState === "idle") prefetchLocation();
  }

  function tick() {
    if (S.scanning || !S.data || !S.data.registered) return;
    var p = parts(nowMs());
    var clock = $("clock");
    if (!clock) return;
    clock.innerHTML = esc(p.hm) + "<small>" + (p.s < 10 ? "0" : "") + p.s + "</small>";
    var v = homeView(), orb = $("orb");
    if (orb && orb.getAttribute("data-mode") !== v.mode) return screenHome();
    $("st-b").textContent = v.status;
    $("st-s").textContent = v.sub;
    if ($("orb-small")) $("orb-small").textContent = v.small;
    var st = S.data.state;
    if (st.open_since && $("worked")) {
      var base = S.data.day.worked_min || 0, opened = Date.parse(S.data.loaded_at);
      $("worked").textContent = dur(base + (nowMs() - opened) / 6e4);
    }
    var sh = st.shift || (st.today && st.today.status === "scheduled" ? st.today : null);
    if (sh && sh.start_at && $("bar-fill")) {
      var a = Date.parse(sh.start_at), b = Date.parse(sh.end_at), now = nowMs();
      var f = Math.min(Math.max((now - a) / (b - a), 0), 1);
      $("bar-fill").style.width = (st.open_since ? f * 100 : 0) + "%";
      var mark = $("bar-now");
      mark.hidden = !(now >= a && now <= b);
      mark.style.left = "calc(" + (f * 100) + "% - 1.5px)";
    }
    // the check-in window may have opened, or the cooldown ended: refresh from the server
    if (st.blocked && st.blocked.opens_at && nowMs() >= Date.parse(st.blocked.opens_at) && !S.refreshing) refresh();
    // the check-in / check-out window closed
    else if (st.until && nowMs() >= Date.parse(st.until) && !S.refreshing) refresh();
  }

  function stopTimers() {
    clearInterval(S.tickTimer);
    clearInterval(S.refreshTimer);
    S.tickTimer = S.refreshTimer = null;
  }

  // ---------------------------------------------------------------- location
  function getLocation() {
    return new Promise(function (resolve) {
      var done = false;
      function finish(v) { if (!done) { done = true; resolve(v); } }
      setTimeout(function () { finish(null); }, 15000);
      function viaBrowser() {
        if (!navigator.geolocation) return finish(null);
        navigator.geolocation.getCurrentPosition(function (p) {
          finish({ lat: p.coords.latitude, lng: p.coords.longitude, accuracy: p.coords.accuracy });
        }, function () { finish(null); }, { enableHighAccuracy: true, timeout: 12000, maximumAge: 10000 });
      }
      var LM = tg && tg.LocationManager;
      if (LM && tg.isVersionAtLeast && tg.isVersionAtLeast("8.0")) {
        // Telegram's own location API; if the client does not answer, fall back to the browser's
        var answered = false;
        var fallback = setTimeout(function () { if (!answered) viaBrowser(); }, 3000);
        var go = function () {
          answered = true;
          clearTimeout(fallback);
          if (!LM.isLocationAvailable) return viaBrowser();
          LM.getLocation(function (d) {
            if (d) finish({ lat: d.latitude, lng: d.longitude, accuracy: d.horizontal_accuracy || 0 });
            else if (LM.isAccessRequested && !LM.isAccessGranted) finish({ denied: true });
            else viaBrowser();
          });
        };
        try { LM.isInited ? go() : LM.init(go); } catch (e) { clearTimeout(fallback); viaBrowser(); }
      } else viaBrowser();
    });
  }
  function prefetchLocation() {
    S.locState = "checking";
    renderLoc();
    getLocation().then(function (loc) {
      S.loc = loc && !loc.denied ? loc : null;
      S.locState = S.loc ? "ok" : "off";
      renderLoc();
    });
  }
  function haversine(a, b) {
    var R = 6371000, toR = Math.PI / 180;
    var dLat = (b.lat - a.lat) * toR, dLng = (b.lng - a.lng) * toR;
    var x = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(a.lat * toR) * Math.cos(b.lat * toR) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    return 2 * R * Math.asin(Math.sqrt(x));
  }
  function renderLoc() {
    var slot = $("loc-slot");
    if (!slot || !S.data || !S.data.state) return;
    var st = S.data.state, html = "";
    if (st.action === "check_out" && !S.data.geofence.checkout) {
      html = '<span class="loc">' + ICON.pin + esc(t("loc_any")) + "</span>";
    } else if (st.action === "check_in") {
      if (S.locState === "checking") html = '<span class="loc">' + ICON.pin + esc(t("loc_checking")) + "</span>";
      else if (S.locState === "off") html = '<span class="loc bad">' + ICON.pin + esc(t("loc_off")) + "</span>";
      else if (S.loc) {
        var d = haversine(S.loc, S.data.geofence);
        var inside = d <= S.data.geofence.radius_m + Math.min(S.loc.accuracy || 0, 40);
        html = '<span class="loc ' + (inside ? "ok" : "bad") + '">' + ICON.pin +
          esc(inside ? t("loc_inside", { d: Math.round(d) }) : t("loc_far", { d: dist(d) })) + "</span>";
      }
    }
    slot.innerHTML = html;
  }

  // ---------------------------------------------------------------- scanning
  function onOrb() {
    if (S.scanning) return;
    var v = homeView();
    if (v.mode === "lock" || v.mode === "wait" || v.mode === "duty") {
      haptic("notify", "warning");
      var orb = $("orb");
      orb.classList.remove("fail");
      void orb.offsetWidth;
      orb.classList.add("fail");
      setTimeout(function () { orb.classList.remove("fail"); }, 500);
      toast(v.status + (v.sub ? " · " + v.sub : ""));
      return;
    }
    startAttend();
  }

  function enterScan(title) {
    S.scanning = true;
    document.body.classList.add("scanning");
    $("scan-title").textContent = title;
    $("scan-sub").textContent = "";
    var hint = $("hint"), sub = $("subhint");
    hint.hidden = false; sub.hidden = false;
    hint.textContent = t("h_start");
    sub.textContent = "";
    var slot = $("loc-slot");
    if (slot) slot.innerHTML = "";
    $("orb").classList.add("align");
    setTicks(0);
    backButton(true);
    closingConfirm(true);
    stopTimers();
  }

  function leaveScan() {
    S.scanning = false;
    stopCamera();
    document.body.classList.remove("scanning");
    backButton(false);
    closingConfirm(false);
  }

  function setTicks(progress) {
    var lines = document.querySelectorAll("#orb .ticks line"), lit = Math.round(progress * TICKS);
    for (var i = 0; i < lines.length; i++) lines[i].classList.toggle("on", i < lit);
  }

  function openCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return Promise.reject({ error: "camera_missing" });
    return navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } }, audio: false,
    }).then(function (stream) {
      S.stream = stream;
      var video = $("video");
      video.srcObject = stream;
      return video.play().catch(function () { /* muted autoplay */ }).then(function () {
        return new Promise(function (resolve) {
          var tries = 0;
          (function wait() {
            if (video.videoWidth > 0 || tries++ > 60) { video.classList.add("on"); resolve(); }
            else setTimeout(wait, 50);
          })();
        });
      });
    }, function (e) {
      throw { error: e && (e.name === "NotAllowedError" || e.name === "SecurityError") ? "camera_denied" : "camera_missing" };
    });
  }
  function stopCamera() {
    if (S.stream) { S.stream.getTracks().forEach(function (tr) { tr.stop(); }); S.stream = null; }
    var v = $("video");
    if (v) { v.classList.remove("on"); v.srcObject = null; }
  }

  var canvas = document.createElement("canvas");
  function grab() {
    var video = $("video");
    if (!video || !video.videoWidth) return Promise.resolve(null);
    var w = 480, h = Math.round(480 * video.videoHeight / video.videoWidth);
    canvas.width = w; canvas.height = h;
    canvas.getContext("2d").drawImage(video, 0, 0, w, h);          // raw (unmirrored) frame
    return new Promise(function (resolve) { canvas.toBlob(resolve, "image/jpeg", 0.82); });
  }

  function startAttend() {
    var st = S.data.state;
    haptic("impact", "medium");
    enterScan(t(st.action === "check_out" ? "scanning_out" : "scanning_in"));
    $("hint").textContent = t("loc_checking");
    getLocation().then(function (loc) {
      if (!S.scanning) return null;
      if (!loc || loc.denied) return Promise.reject({ error: "no_location", denied: !!(loc && loc.denied) });
      S.loc = loc; S.locState = "ok";
      return api("api/scan", { location: loc });
    }).then(function (res) {
      if (!res || !S.scanning) return;
      S.scan = res.scan;
      if (res.distance_m != null) $("scan-sub").textContent = t("dist_n", { n: res.distance_m });
      $("hint").textContent = t("h_start");
      return openCamera().then(runScan);
    }).catch(fail);
  }

  function startEnroll() {
    haptic("impact", "medium");
    enterScan(t("scanning_enroll"));
    var ready = S.regScan && S.regScan.until > Date.now()
      ? Promise.resolve({ scan: S.regScan.scan })
      : api("api/register", S.reg ? { first_name: S.reg.first_name.trim(), last_name: S.reg.last_name.trim(),
          department: S.reg.department, passkey: S.reg.passkey.trim() } : {});
    S.regScan = null;
    ready.then(function (res) {
      if (!S.scanning) return;
      S.scan = res.scan;
      return openCamera().then(runScan);
    }).catch(fail);
  }

  function runScan() {
    var id = S.scan.scan_id;
    var lastHint = "";
    function step() {
      if (!S.scanning || !S.scan || S.scan.scan_id !== id) return;
      grab().then(function (blob) {
        if (!blob) return sleep(120).then(step);
        return api("api/scan/" + encodeURIComponent(id) + "/frame", null, blob).then(function (res) {
          if (!S.scanning) return;
          var v = res.scan;
          var orb = $("orb");
          orb.classList.toggle("align", v.stage === "align");
          setTicks(v.progress);
          var hint = v.hint ? t("h_" + v.hint) : v.stage === "verified" ? t("h_verifying") : t("h_start");
          if (hint !== lastHint) {
            if (v.hint && /^turn_/.test(v.hint) && lastHint.indexOf("turn") === -1) haptic("impact", "light");
            lastHint = hint;
            $("hint").textContent = hint;
            $("hint").classList.toggle("warn", /^(no_face|multiple_faces|too_dark|too_bright|not_recognized|face_changed|wrong_way)$/.test(v.hint || ""));
          }
          $("arr-left").classList.toggle("show", v.hint === "turn_left");
          $("arr-right").classList.toggle("show", v.hint === "turn_right");
          if (v.stage === "done") return success(v.result);
          if (v.stage === "failed") return fail(Object.assign({ error: (v.result && v.result.reason) || "timeout" }, v.result || {}));
          return sleep(v.stage === "turn" ? 60 : 110).then(step);
        }, function (err) {
          if (err.error === "too_fast") return sleep(500).then(step);
          throw err;
        });
      }).catch(fail);
    }
    step();
  }

  function cancelScan() {
    if (!S.scanning) { if (S.data && S.data.registered === false) screenRegister(); return; }
    var scan = S.scan;
    S.scan = null;
    leaveScan();
    if (scan) api("api/scan/" + encodeURIComponent(scan.scan_id) + "/cancel", {}).catch(function () { /* ignore */ });
    route();
  }

  function onBack() {
    var sheet = document.querySelector(".sheet.open");
    if (sheet) { closeSheet(); return; }
    if (S.scanning) return cancelScan();
    if (S.data && S.data.registered === false) { S.regDone = false; screenRegister(); }
  }

  function success(result) {
    var orb = $("orb");
    S.scan = null;
    haptic("notify", "success");
    if (result.photo) $("shot").src = result.photo;
    orb.classList.remove("align");
    orb.classList.add("success");
    setTicks(1);
    var burst = document.createElement("span");
    burst.className = "burst";
    orb.appendChild(burst);
    $("arr-left").classList.remove("show");
    $("arr-right").classList.remove("show");
    $("hint").textContent = result.kind === "enrolled" ? t("enrolled_title")
      : t(result.action === "check_out" ? "ok_out" : result.returning ? "ok_return" : "ok_in");
    stopCamera();
    closingConfirm(false);
    S.cooldownUntil = Date.now() + ((S.data && S.data.min_gap_s) || 120) * 1000;
    setTimeout(function () { showResult(result); }, 750);
  }

  function fail(err) {
    if (!S.scanning && !(err && err.error)) return;
    var wasScanning = S.scanning;
    S.scan = null;
    stopCamera();
    closingConfirm(false);
    haptic("notify", "error");
    var orb = $("orb");
    if (orb && wasScanning) { orb.classList.remove("align"); orb.classList.add("fail"); }
    if ($("hint")) $("hint").textContent = errorText(err);
    setTimeout(function () { showFailure(err); }, wasScanning ? 450 : 0);
  }

  // ---------------------------------------------------------------- result sheet
  function openSheet(html, onClose) {
    closeSheet(true);
    var bg = document.createElement("div");
    bg.className = "sheet-bg";
    var sheet = document.createElement("div");
    sheet.className = "sheet";
    sheet.innerHTML = '<div class="grab"></div>' + html;
    document.body.appendChild(bg);
    document.body.appendChild(sheet);
    S.sheetClose = onClose;
    requestAnimationFrame(function () { bg.classList.add("open"); sheet.classList.add("open"); });
    bg.onclick = function () { closeSheet(); };
    backButton(true);
    return sheet;
  }
  function closeSheet(silent) {
    var sheet = document.querySelector(".sheet"), bg = document.querySelector(".sheet-bg");
    if (!sheet) return;
    sheet.classList.remove("open");
    if (bg) bg.classList.remove("open");
    setTimeout(function () { sheet.remove(); if (bg) bg.remove(); }, 400);
    var cb = S.sheetClose;
    S.sheetClose = null;
    if (!silent && cb) cb();
  }

  function showResult(r) {
    if (r.kind === "enrolled") {
      var waiting = !S.data.registered || !(S.data.state && S.data.state.assigned);
      var s1 = openSheet(
        '<div class="big ok">' + (r.photo ? '<img src="' + esc(r.photo) + '" alt="">' : "") + '<span class="badge">' + ICON.check.replace("<path", '<path stroke="#fff" stroke-width="9" fill="none"') + "</span></div>" +
        "<h2>" + esc(t("enrolled_title")) + "</h2><p>" + esc(t("enrolled_body")) + "</p>" +
        (waiting ? "<p>" + esc(t("enrolled_wait")) + "</p>" : "") +
        '<button class="primary" id="sheet-ok">' + esc(t("go_home")) + "</button>",
        afterResult);
      s1.querySelector("#sheet-ok").onclick = function () { closeSheet(); };
      return;
    }
    var chips = [];
    if (r.action === "check_in") {
      if (r.returning) chips.push('<span class="good">' + esc(t("ok_return")) + "</span>");
      else chips.push(r.late_min ? '<span class="warn">' + esc(t("late_n", { n: dur(r.late_min) })) + "</span>"
        : '<span class="good">' + esc(t("on_time")) + "</span>");
    } else {
      chips.push('<span class="good">' + esc(t("worked_n", { n: dur(r.worked_min) })) + "</span>");
      if (r.early_min) chips.push('<span class="warn">' + esc(t("early_n", { n: dur(r.early_min) })) + "</span>");
    }
    if (r.distance_m != null) chips.push("<span>" + esc(t("dist_n", { n: r.distance_m })) + "</span>");
    if (r.score != null) chips.push("<span>" + esc(t("match_n", { n: Math.round(Math.min(1, Math.max(0, r.score)) * 100) })) + "</span>");
    var title = t(r.action === "check_out" ? "ok_out" : r.returning ? "ok_return" : "ok_in");
    var s = openSheet(
      '<div class="big ok">' + (r.photo ? '<img src="' + esc(r.photo) + '" alt="">' : "") + '<span class="badge">' +
      ICON.check.replace("<path", '<path stroke="#fff" stroke-width="9" fill="none"') + "</span></div>" +
      "<h2>" + esc(title) + '</h2><div class="when mono">' + esc(r.time) + '</div><div class="chips">' + chips.join("") + "</div>" +
      '<button class="primary" id="sheet-ok">' + esc(t("close")) + "</button>",
      afterResult);
    s.querySelector("#sheet-ok").onclick = function () { closeSheet(); };
  }

  function showFailure(err) {
    var code = (err && (err.error || err.reason)) || "server_error";
    var denied = code === "no_location" && tg && tg.LocationManager && tg.LocationManager.isAccessRequested && !tg.LocationManager.isAccessGranted;
    var retryable = !/^(blocked|not_registered|already_registered|face_taken)$/.test(code);
    var s = openSheet(
      '<div class="big bad">' + ICON.alert + "</div><h2>" + esc(t("fail_title")) + "</h2><p>" + esc(errorText(err)) + "</p>" +
      (denied ? '<button class="ghost" id="sheet-settings">' + esc(t("settings")) + "</button>" : "") +
      (retryable ? '<button class="primary" id="sheet-retry">' + esc(t("retry")) + "</button>" : "") +
      '<button class="ghost" id="sheet-close">' + esc(t("close")) + "</button>",
      afterFailure);
    if (denied) s.querySelector("#sheet-settings").onclick = function () { try { tg.LocationManager.openSettings(); } catch (e) { /* ignore */ } };
    var retry = s.querySelector("#sheet-retry");
    if (retry) retry.onclick = function () {
      S.sheetClose = null;
      closeSheet(true);
      leaveScan();
      var enrolling = S.data && (!S.data.registered || !S.data.enrolled);
      if (enrolling && code === "bad_passkey") { S.regDone = false; return screenRegister(errorText(err)); }
      if (enrolling) { screenEnroll(!!S.data.registered); return; }
      screenHome();
      setTimeout(startAttend, 250);
    };
    s.querySelector("#sheet-close").onclick = function () { closeSheet(); };
  }

  function afterResult() { leaveScan(); load(); }
  function afterFailure() {
    leaveScan();
    if (S.data && !S.data.registered) return route();
    load();
  }

  var toastTimer = null;
  function toast(text) {
    var el = document.querySelector(".toast");
    if (!el) { el = document.createElement("div"); el.className = "toast"; document.body.appendChild(el); }
    el.textContent = text;
    requestAnimationFrame(function () { el.classList.add("show"); });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove("show"); }, 3200);
  }

  // ---------------------------------------------------------------- data
  function apply(data) {
    S.offset = data.server_time ? data.server_time - Date.now() : 0;
    data.loaded_at = new Date(Date.now() + S.offset).toISOString();
    S.data = data;
    if (data.state && data.state.cooldown_s) S.cooldownUntil = Date.now() + data.state.cooldown_s * 1000;
    else if (data.state) S.cooldownUntil = 0;
  }

  function route() {
    var d = S.data;
    if (!d) return;
    if (!d.registered) return S.regDone ? screenEnroll(false) : screenRegister();
    if (!d.enrolled) return screenEnroll(true);
    screenHome();
  }

  function load() {
    return api("api/me", {}).then(function (data) {
      apply(data);
      route();
    }).catch(function (err) {
      if (err.error === "not_telegram" && !S.initData) return screenPlain(t("notg_title"), t("notg_body"));
      screenPlain(t("fail_title"), errorText(err), true);
    });
  }

  function refresh() {
    if (S.refreshing || S.scanning || document.querySelector(".sheet")) return;
    S.refreshing = true;
    api("api/me", {}).then(function (data) {
      var before = S.data && JSON.stringify([S.data.state && S.data.state.action, S.data.state && S.data.state.blocked, S.data.day, S.data.history.length]);
      apply(data);
      var after = JSON.stringify([data.state && data.state.action, data.state && data.state.blocked, data.day, data.history.length]);
      if (before !== after && data.registered && data.enrolled) screenHome();
    }).catch(function () { /* keep the current screen */ }).then(function () { S.refreshing = false; });
  }

  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible" && S.data && S.data.registered && S.data.enrolled) refresh();
  });

  // ---------------------------------------------------------------- start
  S.initData = readInitData();
  S.lang = pickLang();
  document.documentElement.lang = S.lang;
  setupTelegram();
  screenSplash();
  if (!S.initData) {
    setTimeout(function () { screenPlain(t("notg_title"), t("notg_body")); }, 400);
  } else {
    load();
  }
}());
