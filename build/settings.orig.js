/* OpSector — injected Super Admin Settings panel (overlay, original kodga tegmaydi) */
(function () {
  "use strict";
  var SUPA_URL = "https://zdxkmfobwyqjbspkdzia.supabase.co";
  var SUPA_KEY = "sb_publishable_UylLo81fFeTi7rcEoer69g_QJ7ORf1r";
  var REST = SUPA_URL + "/rest/v1/admin_users";
  var H = { "apikey": SUPA_KEY, "Authorization": "Bearer " + SUPA_KEY, "Content-Type": "application/json" };

  function api(method, qs, body) {
    var opt = { method: method, headers: Object.assign({}, H) };
    if (method !== "GET") opt.headers["Prefer"] = "return=representation";
    if (body) opt.body = JSON.stringify(body);
    return fetch(REST + (qs || ""), opt).then(function (r) {
      return r.text().then(function (t) {
        if (!r.ok) throw new Error(t || r.status);
        return t ? JSON.parse(t) : [];
      });
    });
  }
  function currentAdmin() {
    try { return JSON.parse(sessionStorage.getItem("7core_admin_user") || "null"); } catch (e) { return null; }
  }
  function esc(s){ return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];}); }

  /* ---- styles ---- */
  var css = document.createElement("style");
  css.textContent = [
    "#ops-set-btn{position:fixed;right:18px;bottom:18px;z-index:99998;background:#EF4444;color:#fff;border:none;border-radius:14px;padding:12px 16px;font:700 13px 'Plus Jakarta Sans',sans-serif;box-shadow:0 8px 24px rgba(239,68,68,.4);cursor:pointer;display:none;align-items:center;gap:8px}",
    "#ops-set-btn:hover{background:#FB2C36}",
    "#ops-set-ov{position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.72);backdrop-filter:blur(4px);display:none;align-items:center;justify-content:center;padding:16px}",
    "#ops-set-ov .box{background:#151A23;border:1px solid #272E3B;border-radius:20px;width:100%;max-width:760px;max-height:90vh;overflow:auto;color:#E2E8F0;font-family:'Plus Jakarta Sans',sans-serif}",
    "#ops-set-ov .hd{display:flex;align-items:center;gap:10px;padding:18px 20px;border-bottom:1px solid #272E3B;position:sticky;top:0;background:#151A23}",
    "#ops-set-ov .hd b{font-size:16px}",
    "#ops-set-ov .badge{background:rgba(239,68,68,.15);color:#f87171;font:700 10px sans-serif;padding:3px 9px;border-radius:99px;text-transform:uppercase;letter-spacing:.05em}",
    "#ops-set-ov .x{margin-left:auto;background:none;border:none;color:#94a3b8;font-size:22px;cursor:pointer}",
    "#ops-set-ov .sec{padding:18px 20px;border-bottom:1px solid #1f2530}",
    "#ops-set-ov h4{margin:0 0 12px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#94a3b8}",
    "#ops-set-ov .row{display:flex;gap:8px;flex-wrap:wrap;align-items:center}",
    "#ops-set-ov input,#ops-set-ov select{background:#1C222D;border:1px solid #272E3B;border-radius:10px;padding:9px 11px;color:#fff;font-size:13px;outline:none}",
    "#ops-set-ov input:focus,#ops-set-ov select:focus{border-color:#EF4444}",
    "#ops-set-ov .btn{background:#EF4444;color:#fff;border:none;border-radius:10px;padding:9px 14px;font:700 13px sans-serif;cursor:pointer}",
    "#ops-set-ov .btn:hover{background:#FB2C36}",
    "#ops-set-ov .btn.g{background:#1C222D;border:1px solid #272E3B;color:#cbd5e1}",
    "#ops-set-ov .btn.d{background:#7f1d1d}",
    "#ops-set-ov table{width:100%;border-collapse:collapse;font-size:13px;margin-top:6px}",
    "#ops-set-ov th{text-align:left;color:#64748b;font-size:11px;text-transform:uppercase;padding:8px 6px;border-bottom:1px solid #272E3B}",
    "#ops-set-ov td{padding:9px 6px;border-bottom:1px solid #1f2530;vertical-align:middle}",
    "#ops-set-ov .msg{font-size:12px;margin-top:8px;min-height:16px}",
    "#ops-set-ov .ok{color:#34d399}", "#ops-set-ov .err{color:#f87171}",
    "#ops-cf{position:fixed;inset:0;z-index:100000;background:rgba(0,0,0,.65);backdrop-filter:blur(3px);display:none;align-items:center;justify-content:center;padding:16px}",
    "#ops-cf .cbox{background:#151A23;border:1px solid #272E3B;border-radius:16px;width:100%;max-width:340px;padding:24px 22px;text-align:center;color:#E2E8F0;font-family:'Plus Jakarta Sans',sans-serif;box-shadow:0 20px 50px rgba(0,0,0,.55)}",
    "#ops-cf .cicon{width:46px;height:46px;border-radius:50%;background:rgba(239,68,68,.15);color:#f87171;display:flex;align-items:center;justify-content:center;font-size:24px;margin:0 auto 14px}",
    "#ops-cf p{margin:0 0 20px;font-size:14px;line-height:1.5;color:#cbd5e1}",
    "#ops-cf .cbtns{display:flex;gap:10px}",
    "#ops-cf .cbtns button{flex:1;border:none;border-radius:10px;padding:11px;font:700 13px sans-serif;cursor:pointer}",
    "#ops-cf .c-no{background:#1C222D;border:1px solid #272E3B;color:#cbd5e1}",
    "#ops-cf .c-yes{background:#EF4444;color:#fff}", "#ops-cf .c-yes:hover{background:#FB2C36}"
  ].join("");
  document.head.appendChild(css);

  /* ---- button ---- */
  var btn = document.createElement("button");
  btn.id = "ops-set-btn"; btn.innerHTML = "&#9881; Settings";
  document.body.appendChild(btn);
  // faqat admin kirgandan keyin ko'rsatamiz
  setInterval(function () {
    var onAdmin = (location.hash || "").toLowerCase().indexOf("admin") >= 0;
    btn.style.display = (onAdmin && currentAdmin()) ? "inline-flex" : "none";
    if (!onAdmin) ov.style.display = "none";
  }, 1000);

  /* ---- overlay ---- */
  var ov = document.createElement("div"); ov.id = "ops-set-ov";
  ov.innerHTML = '<div class="box"></div>';
  document.body.appendChild(ov);
  ov.addEventListener("click", function (e) { if (e.target === ov) ov.style.display = "none"; });
  btn.addEventListener("click", open);

  /* ---- custom confirm (markaziy kichik oyna) ---- */
  var cf = document.createElement("div"); cf.id = "ops-cf";
  cf.innerHTML = '<div class="cbox"><div class="cicon">&#9888;</div><p id="cf-msg"></p><div class="cbtns"><button class="c-no">Bekor</button><button class="c-yes">O\'chirish</button></div></div>';
  document.body.appendChild(cf);
  function askConfirm(text) {
    return new Promise(function (resolve) {
      cf.querySelector("#cf-msg").textContent = text;
      cf.style.display = "flex";
      function done(v){ cf.style.display="none"; cf.querySelector(".c-no").onclick=null; cf.querySelector(".c-yes").onclick=null; resolve(v); }
      cf.querySelector(".c-no").onclick = function(){ done(false); };
      cf.querySelector(".c-yes").onclick = function(){ done(true); };
    });
  }

  var ROLES = ["Administrator", "Super Admin"];
  function msg(el, t, ok) { el.className = "msg " + (ok ? "ok" : "err"); el.textContent = t; }

  function open() {
    ov.style.display = "flex";
    render();
  }
  function render() {
    var me = currentAdmin() || {};
    var box = ov.querySelector(".box");
    box.innerHTML =
      '<div class="hd"><b>&#9881; Admin Settings</b><span class="badge">' + esc(me.role || "Admin") + '</span>' +
      '<button class="x">&times;</button></div>' +
      '<div class="sec"><h4>Create Admin User</h4>' +
        '<div class="row">' +
          '<input id="c-user" placeholder="Username" style="flex:1;min-width:120px">' +
          '<input id="c-pass" placeholder="Password" style="flex:1;min-width:120px">' +
          '<input id="c-name" placeholder="Display name" style="flex:1;min-width:140px">' +
          '<select id="c-role">' + ROLES.map(function(r){return '<option>'+r+'</option>';}).join("") + '</select>' +
          '<button class="btn" id="c-add">Create</button>' +
        '</div><div class="msg" id="c-msg"></div></div>' +
      '<div class="sec"><h4>Admin Users</h4><div id="list">Yuklanmoqda...</div></div>' +
      '<div class="sec"><h4>License</h4>' +
        '<button class="btn g" id="lic">&#128196; View Software License (PDF)</button></div>';

    box.querySelector(".x").onclick = function () { ov.style.display = "none"; };
    box.querySelector("#lic").onclick = function () {
      window.open("/assets/aistudio/Opsector_Software_License___Intellectual_Property_Notice_b2eabd21.pdf?v=2", "_blank");
    };
    box.querySelector("#c-add").onclick = function () {
      var u = box.querySelector("#c-user").value.trim().toLowerCase(),
          p = box.querySelector("#c-pass").value,
          n = box.querySelector("#c-name").value.trim(),
          r = box.querySelector("#c-role").value, m = box.querySelector("#c-msg");
      if (!u || !p) { msg(m, "Username va password kiriting", false); return; }
      api("POST", "", { id: "admin-" + Date.now(), username: u, password: p, display_name: n || u, role: r, created_at: new Date().toISOString() })
        .then(function () { msg(m, "Admin yaratildi", true); box.querySelector("#c-user").value = box.querySelector("#c-pass").value = box.querySelector("#c-name").value = ""; loadList(); })
        .catch(function (e) { msg(m, "Xato: " + e.message, false); });
    };
    loadList();
  }
  function loadList() {
    var host = ov.querySelector("#list");
    api("GET", "?select=*&order=username.asc").then(function (rows) {
      var html = '<table><thead><tr><th>Username</th><th>Role</th><th>Display</th><th>New password</th><th></th></tr></thead><tbody>';
      rows.forEach(function (a) {
        html += '<tr data-id="' + esc(a.id) + '" data-u="' + esc(a.username) + '">' +
          '<td><input class="r-user" value="' + esc(a.username) + '" style="width:110px"></td>' +
          '<td><select class="r-role">' + ROLES.map(function(r){return '<option'+(r===a.role?' selected':'')+'>'+r+'</option>';}).join("") + '</select></td>' +
          '<td><input class="r-name" value="' + esc(a.display_name) + '" style="width:150px"></td>' +
          '<td><input class="r-pass" placeholder="(o\'zgarmaydi)" style="width:110px"></td>' +
          '<td style="white-space:nowrap"><button class="btn r-save">Save</button> <button class="btn d r-del">Del</button></td></tr>';
      });
      html += '</tbody></table><div class="msg" id="l-msg"></div>';
      host.innerHTML = html;
      var m = host.querySelector("#l-msg");
      host.querySelectorAll("tr[data-id]").forEach(function (tr) {
        var id = tr.getAttribute("data-id");
        tr.querySelector(".r-save").onclick = function () {
          var uname = tr.querySelector(".r-user").value.trim().toLowerCase();
          if (!uname) { msg(m, "Username bo'sh bo'lmasin", false); return; }
          var patch = { role: tr.querySelector(".r-role").value, username: uname, display_name: tr.querySelector(".r-name").value.trim() };
          var np = tr.querySelector(".r-pass").value;
          if (np) patch.password = np;
          api("PATCH", "?id=eq." + encodeURIComponent(id), patch)
            .then(function () {
              var me = currentAdmin(), ou = tr.getAttribute("data-u");
              if (me && me.username && ou && me.username.toLowerCase() === ou.toLowerCase()) {
                me.username = uname; me.display_name = patch.display_name; me.role = patch.role;
                try { sessionStorage.setItem("7core_admin_user", JSON.stringify(me)); } catch (e) {}
              }
              msg(m, "Saqlandi: " + uname, true); loadList();
            })
            .catch(function (e) { msg(m, "Xato: " + e.message, false); });
        };
        tr.querySelector(".r-del").onclick = function () {
          askConfirm("O'chirilsinmi: " + tr.getAttribute("data-u") + "?").then(function (ok) {
            if (!ok) return;
            api("DELETE", "?id=eq." + encodeURIComponent(id))
              .then(function () { msg(m, "O'chirildi", true); loadList(); })
              .catch(function (e) { msg(m, "Xato: " + e.message, false); });
          });
        };
      });
    }).catch(function (e) { host.innerHTML = '<span class="err">Yuklab bo\'lmadi: ' + esc(e.message) + '</span>'; });
  }
})();

/* OpSector — "Scheduler" role bridge (overlay, original kodga tegmaydi).
   Roli "Scheduler"/"Super Admin" bo'lgan admin kirgach "Scheduling" tugmasi
   chiqadi: admin'ni manager sessiyasiga bog'lab, qayta login so'ramasdan
   Manager portalga (#7manage) o'tkazadi — shu user schedule qila oladi. */
(function () {
  "use strict";
  var SUPA_URL = "https://zdxkmfobwyqjbspkdzia.supabase.co";
  var SUPA_KEY = "sb_publishable_UylLo81fFeTi7rcEoer69g_QJ7ORf1r";
  var H = { "apikey": SUPA_KEY, "Authorization": "Bearer " + SUPA_KEY, "Content-Type": "application/json" };
  var SCHED_ROLES = ["administrator"]; // faqat Administrator schedule qiladi (Super Admin'da chiqmaydi)

  function rest(path, method, body, prefer) {
    var opt = { method: method || "GET", headers: Object.assign({}, H) };
    if (prefer) opt.headers["Prefer"] = prefer;
    if (body) opt.body = JSON.stringify(body);
    return fetch(SUPA_URL + "/rest/v1/" + path, opt).then(function (r) {
      return r.text().then(function (t) {
        if (!r.ok) throw new Error(t || r.status);
        return t ? JSON.parse(t) : [];
      });
    });
  }
  function currentAdmin() {
    try { return JSON.parse(sessionStorage.getItem("7core_admin_user") || "null"); } catch (e) { return null; }
  }

  /* ---- styles + button ---- */
  var css = document.createElement("style");
  css.textContent = [
    "#ops-sch-btn{position:fixed;right:18px;bottom:70px;z-index:99998;background:#2563EB;color:#fff;border:none;border-radius:14px;padding:12px 16px;font:700 13px 'Plus Jakarta Sans',sans-serif;box-shadow:0 8px 24px rgba(37,99,235,.4);cursor:pointer;display:none;align-items:center;gap:8px}",
    "#ops-sch-btn:hover{background:#1D4ED8}",
    "#ops-sch-btn[disabled]{opacity:.6;cursor:default}"
  ].join("");
  document.head.appendChild(css);

  var btn = document.createElement("button");
  btn.id = "ops-sch-btn";
  btn.innerHTML = "&#128197; Scheduling";
  document.body.appendChild(btn);

  // joriy admin roli (DB'dan) keshlanadi — login sessiyasi rolni saqlamaydi
  var roleCache = {}; // username(lower) -> role(lower)
  function fetchRole(uname) {
    var key = uname.toLowerCase();
    if (roleCache[key] !== undefined) return Promise.resolve(roleCache[key]);
    return rest("admin_users?select=role&username=eq." + encodeURIComponent(key), "GET")
      .then(function (rows) {
        var role = (rows && rows[0] && rows[0].role ? String(rows[0].role) : "").toLowerCase();
        roleCache[key] = role;
        return role;
      }).catch(function () { return ""; });
  }

  // tugmani faqat admin sahifasida, schedule-huquqli rol uchun ko'rsatamiz
  setInterval(function () {
    var onAdmin = (location.hash || "").toLowerCase().indexOf("admin") >= 0;
    var me = currentAdmin();
    if (!onAdmin || !me || !me.username) { btn.style.display = "none"; return; }
    fetchRole(me.username).then(function (role) {
      btn.style.display = (SCHED_ROLES.indexOf(role) >= 0) ? "inline-flex" : "none";
    });
  }, 1000);

  /* ---- bosilganda: manager sessiyasini tayyorlab, Manager portalga o'tkazamiz ---- */
  btn.addEventListener("click", function () {
    var me = currentAdmin();
    if (!me || !me.username) return;
    var uname = me.username.trim().toLowerCase();
    btn.disabled = true; var old = btn.innerHTML; btn.innerHTML = "&#8987; ...";
    function go(mgr) {
      try { localStorage.setItem("7core_manager_session", JSON.stringify(mgr)); } catch (e) {}
      location.hash = "#7manage";
      location.reload();
    }
    // barcha xodim telegram_id larini oladi (hammasini biriktirish uchun)
    function allEmpIds() {
      return rest("employees?select=telegram_id", "GET").then(function (emps) {
        return (emps || []).map(function (e) { return e.telegram_id; }).filter(function (x) { return x != null; });
      });
    }
    // admin parolini olamiz (manager parolini unga tenglashtirish uchun — bitta login ishlasin)
    function adminPw() {
      return rest("admin_users?select=password&username=eq." + encodeURIComponent(uname), "GET")
        .then(function (r) { return (r && r[0] && r[0].password) ? String(r[0].password) : ""; })
        .catch(function () { return ""; });
    }
    // bu overlay yaratgan "scheduler" qatormi? (haqiqiy managerlarga tegmaymiz)
    function isOurs(row) {
      return row.department === "ALL" || row.department === "All" || row.team_name === "All Teams";
    }

    Promise.all([adminPw(), rest("managers?select=*&username=eq." + encodeURIComponent(uname), "GET")])
      .then(function (res) {
        var pw = res[0], rows = res[1];
        if (rows && rows.length) {
          var row = rows[0];
          if (!isOurs(row)) {
            // haqiqiy manager — qatorini o'zgartirmaymiz, shunchaki sessiya ochamiz
            return row;
          }
          // bizning scheduler qatorimiz — kerakli maydonlarni to'g'rilaymiz
          return allEmpIds().then(function (ids) {
            var patch = {};
            if (row.department !== "All") patch.department = "All";
            if (!(row.assigned_employee_ids && row.assigned_employee_ids.length)) patch.assigned_employee_ids = ids;
            if (pw && row.password !== pw) patch.password = pw; // o'z parolingiz bilan ham kira olasiz
            if (!Object.keys(patch).length) return row;
            return rest("managers?id=eq." + encodeURIComponent(row.id), "PATCH", patch, "return=representation")
              .then(function (up) { return (up && up[0]) ? up[0] : Object.assign({}, row, patch); })
              .catch(function () { return Object.assign({}, row, patch); }); // yozib bo'lmasa ham sessiya to'g'ri
          });
        }
        // qator yo'q — yangi scheduler manager yaratamiz
        return allEmpIds().then(function (ids) {
          var row = {
            id: "mgr-" + Date.now() + "-" + Math.random().toString(36).slice(2, 6),
            username: uname,
            password: pw || (Math.random().toString(36).slice(2) + "A1!"),
            full_name: me.display_name || me.username,
            department: "All",
            team_name: "All Teams",
            assigned_employee_ids: ids,
            shift_start_time: "09:00",
            shift_end_time: "18:00",
            shift_days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
            created_at: new Date().toISOString()
          };
          return rest("managers", "POST", row, "return=representation")
            .then(function (ins) { return (ins && ins[0]) ? ins[0] : row; })
            .catch(function () { return row; });
        });
      })
      .then(go)
      .catch(function (e) {
        btn.disabled = false; btn.innerHTML = old;
        alert("Scheduling ochib bo'lmadi: " + (e && e.message ? e.message : e));
      });
  });
})();
