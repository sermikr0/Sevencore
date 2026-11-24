/* Sevencore Attendance — "Users & Roles" panel for the admin dashboard.
   Shown to Super Admins only (window.__OPS comes from /session.js). Every change goes through the
   server's /auth/users API, which checks the role again and stores passwords as scrypt hashes. */
(function () {
  "use strict";
  var me = window.__OPS;
  if (!me || me.kind !== "admin" || me.role !== "Super Admin") return;

  var ROLES = ["Super Admin", "Admin", "Manager"];
  var DEPTS = ["7CORE", "HOS", "CARGOGPT"];
  var ROLE_HINT = {
    "Super Admin": "Dashboard + manages users, roles and the passkey",
    "Admin": "Dispatch dashboard",
    "Manager": "Team portal: shift spreadsheet and live check-ins"
  };
  var state = { users: [], passkey: "", editing: null };

  function api(method, path, body) {
    var opt = { method: method, headers: { "X-Requested-With": "sevencore" } };
    if (body) { opt.headers["Content-Type"] = "application/json"; opt.body = JSON.stringify(body); }
    return fetch(path, opt).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (data) {
        if (r.status === 401) { location.replace("/"); }
        if (!r.ok) throw new Error(data.message || ("HTTP " + r.status));
        return data;
      });
    });
  }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === "text") node.textContent = attrs[k];
      else if (k === "class") node.className = attrs[k];
      else if (k.indexOf("on") === 0) node.addEventListener(k.slice(2), attrs[k]);
      else node.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) node.appendChild(typeof c === "string" ? document.createTextNode(c) : c); });
    return node;
  }

  /* ---------------------------------------------------------------- styles */
  var css = el("style");
  css.textContent = [
    "#ur-btn{position:fixed;right:18px;bottom:18px;z-index:99998;background:#EF4444;color:#fff;border:0;border-radius:14px;padding:12px 16px;font:700 13px 'Plus Jakarta Sans',sans-serif;box-shadow:0 8px 24px rgba(239,68,68,.4);cursor:pointer;display:inline-flex;align-items:center;gap:8px}",
    "#ur-btn:hover{background:#F05252}#ur-btn svg,#ur-ov svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}",
    "#ur-ov{position:fixed;inset:0;z-index:99999;background:rgba(3,6,12,.72);backdrop-filter:blur(4px);display:none;align-items:center;justify-content:center;padding:16px;font-family:'Plus Jakarta Sans',sans-serif}",
    "#ur-ov .box{background:#151A23;border:1px solid #272E3B;border-radius:20px;width:100%;max-width:860px;max-height:92vh;overflow:auto;color:#E2E8F0;box-shadow:0 30px 80px rgba(0,0,0,.55)}",
    "#ur-ov .hd{display:flex;align-items:center;gap:10px;padding:18px 22px;border-bottom:1px solid #272E3B;position:sticky;top:0;background:#151A23;z-index:2}",
    "#ur-ov .hd b{font-size:16px}#ur-ov .x{margin-left:auto;background:none;border:0;color:#94A3B8;font-size:24px;line-height:1;cursor:pointer;padding:4px 8px;border-radius:8px}#ur-ov .x:hover{background:#1F2633;color:#fff}",
    "#ur-ov .sec{padding:18px 22px;border-bottom:1px solid #1F2530}#ur-ov .sec:last-child{border-bottom:0}",
    "#ur-ov h4{margin:0 0 12px;font-size:11.5px;letter-spacing:.08em;text-transform:uppercase;color:#94A3B8;display:flex;align-items:center;gap:8px}",
    "#ur-ov .grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px 12px}",
    "#ur-ov label.f{display:flex;flex-direction:column;gap:5px;font-size:12px;font-weight:600;color:#CBD5E1}",
    "#ur-ov input,#ur-ov select{height:38px;background:#1C222D;border:1px solid #272E3B;border-radius:10px;padding:0 11px;color:#fff;font:500 13px 'Plus Jakarta Sans',sans-serif;outline:none;width:100%}",
    "#ur-ov input:focus,#ur-ov select:focus{border-color:#EF4444;box-shadow:0 0 0 3px rgba(239,68,68,.15)}",
    "#ur-ov .pw{display:flex;gap:6px}#ur-ov .pw input{flex:1}",
    "#ur-ov .btn{height:38px;background:#EF4444;color:#fff;border:0;border-radius:10px;padding:0 15px;font:700 13px 'Plus Jakarta Sans',sans-serif;cursor:pointer;display:inline-flex;align-items:center;gap:7px;white-space:nowrap}",
    "#ur-ov .btn:hover{background:#F05252}#ur-ov .btn:disabled{opacity:.55;cursor:default}",
    "#ur-ov .btn.g{background:#1C222D;border:1px solid #272E3B;color:#CBD5E1}#ur-ov .btn.g:hover{background:#232A37}",
    "#ur-ov .btn.sm{height:32px;padding:0 10px;font-size:12px}#ur-ov .btn.d{background:transparent;border:1px solid #4C1D24;color:#F87171}#ur-ov .btn.d:hover{background:#2A1116}",
    "#ur-ov .row{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-top:14px}",
    "#ur-ov .hint{font-size:12px;color:#64748B;margin-top:8px}",
    "#ur-ov .msg{font-size:12.5px;font-weight:600;min-height:18px}#ur-ov .ok{color:#34D399}#ur-ov .err{color:#F87171}",
    "#ur-ov table{width:100%;border-collapse:collapse;font-size:13px}",
    "#ur-ov th{text-align:left;color:#64748B;font-size:11px;text-transform:uppercase;letter-spacing:.05em;padding:8px 8px;border-bottom:1px solid #272E3B;font-weight:700}",
    "#ur-ov td{padding:11px 8px;border-bottom:1px solid #1F2530;vertical-align:middle}#ur-ov tr:last-child td{border-bottom:0}",
    "#ur-ov .who b{display:block;font-weight:700}#ur-ov .who span{font:12px ui-monospace,SFMono-Regular,Menlo,monospace;color:#94A3B8}",
    "#ur-ov .role{display:inline-flex;align-items:center;gap:6px;height:24px;padding:0 10px;border-radius:99px;font-size:11.5px;font-weight:700;white-space:nowrap}",
    "#ur-ov .role.sa{background:rgba(239,68,68,.15);color:#F87171}#ur-ov .role.ad{background:rgba(245,158,11,.14);color:#FBBF24}#ur-ov .role.mg{background:rgba(59,130,246,.15);color:#60A5FA}",
    "#ur-ov .you{font-size:10.5px;color:#34D399;font-weight:700;margin-left:6px}",
    "#ur-ov .role.ok-badge{background:rgba(16,185,129,.14);color:#34D399}#ur-ov .role.off-badge{background:#1C222D;color:#94A3B8}",
    "#ur-ov .acts{text-align:right;white-space:nowrap}#ur-ov .acts .btn{margin-left:6px}",
    "#ur-ov .muted{color:#64748B}#ur-ov .code{font:700 15px ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.06em;background:#0E121A;border:1px dashed #334155;border-radius:10px;padding:8px 12px}",
    "#ur-ov .editing{border:1px solid rgba(239,68,68,.35);border-radius:14px;padding:14px;background:rgba(239,68,68,.04)}",
    "#ur-cf{position:fixed;inset:0;z-index:100000;background:rgba(0,0,0,.6);display:none;align-items:center;justify-content:center;padding:16px;font-family:'Plus Jakarta Sans',sans-serif}",
    "#ur-cf .c{background:#151A23;border:1px solid #272E3B;border-radius:16px;max-width:360px;width:100%;padding:24px;text-align:center;color:#E2E8F0}",
    "#ur-cf p{margin:0 0 18px;font-size:14px;line-height:1.5;color:#CBD5E1}#ur-cf .r{display:flex;gap:10px}#ur-cf .r button{flex:1;height:40px;border-radius:10px;border:0;font:700 13px sans-serif;cursor:pointer}",
    "#ur-cf .no{background:#1C222D;border:1px solid #272E3B !important;color:#CBD5E1}#ur-cf .yes{background:#EF4444;color:#fff}",
    "@media(max-width:720px){#ur-ov .grid{grid-template-columns:1fr}}"
  ].join("");
  document.head.appendChild(css);

  var ICON_USERS = '<svg viewBox="0 0 24 24"><circle cx="9" cy="8.5" r="3.2"/><path d="M3 19.5c.6-3.2 3-5 6-5s5.4 1.8 6 5M16 5.6a3 3 0 0 1 0 5.8M17.6 14.6c1.9.6 3.1 2.2 3.4 4.9"/></svg>';

  /* ---------------------------------------------------------------- shell */
  var btn = el("button", { id: "ur-btn", type: "button", "aria-haspopup": "dialog" });
  btn.innerHTML = ICON_USERS + "<span>Users &amp; Roles</span>";
  document.body.appendChild(btn);

  var ov = el("div", { id: "ur-ov", role: "dialog", "aria-modal": "true", "aria-label": "Users and roles" });
  var box = el("div", { class: "box" });
  ov.appendChild(box);
  document.body.appendChild(ov);
  ov.addEventListener("mousedown", function (e) { if (e.target === ov) close(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && ov.style.display === "flex" && cf.style.display !== "flex") close(); });
  btn.addEventListener("click", open);

  var cf = el("div", { id: "ur-cf" });
  document.body.appendChild(cf);
  function confirmBox(message, action) {
    return new Promise(function (resolve) {
      cf.textContent = "";
      var no = el("button", { class: "no", type: "button", text: "Cancel" });
      var yes = el("button", { class: "yes", type: "button", text: action || "Delete" });
      cf.appendChild(el("div", { class: "c" }, [el("p", { text: message }), el("div", { class: "r" }, [no, yes])]));
      cf.style.display = "flex";
      function done(v) { cf.style.display = "none"; resolve(v); }
      no.onclick = function () { done(false); };
      yes.onclick = function () { done(true); };
      yes.focus();
    });
  }

  function open() { ov.style.display = "flex"; state.editing = null; load(); }
  function close() { ov.style.display = "none"; }

  function load() {
    render(true);
    api("GET", "/auth/users").then(function (data) {
      state.users = data.users || []; state.passkey = data.passkey || ""; render(false);
    }).catch(function (e) { render(false, e.message); });
  }

  function roleClass(role) { return role === "Super Admin" ? "sa" : role === "Admin" ? "ad" : "mg"; }
  function msg(node, text, ok) { node.className = "msg " + (ok ? "ok" : "err"); node.textContent = text; }

  function randomPassword() {
    var chars = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    var out = "", buf = new Uint32Array(14);
    crypto.getRandomValues(buf);
    for (var i = 0; i < buf.length; i++) out += chars[buf[i] % chars.length];
    return out;
  }

  /* ---------------------------------------------------------------- render */
  function render(loading, error) {
    box.textContent = "";
    var x = el("button", { class: "x", type: "button", "aria-label": "Close", text: "×", onclick: close });
    var head = el("div", { class: "hd" }, [el("b", { text: "Users & Roles" }), el("span", { class: "role sa", text: "Super Admin" }), x]);
    box.appendChild(head);
    box.appendChild(formSection());
    var list = el("div", { class: "sec" }, [el("h4", { text: "Accounts" + (loading ? "" : " (" + state.users.length + ")") })]);
    if (loading) list.appendChild(el("div", { class: "muted", text: "Loading…" }));
    else if (error) list.appendChild(el("div", { class: "msg err", text: "Could not load: " + error }));
    else list.appendChild(table());
    box.appendChild(list);
    box.appendChild(passkeySection());
    box.appendChild(faceSection());
  }

  function formSection() {
    var editing = state.editing;
    var sec = el("div", { class: "sec" });
    var wrap = el("div", { class: editing ? "editing" : "" });
    sec.appendChild(wrap);
    wrap.appendChild(el("h4", { text: editing ? "Edit user — " + editing.username : "Add user" }));

    var name = el("input", { placeholder: "e.g. Malika Karimova", maxlength: "60", value: editing ? editing.display_name : "" });
    var user = el("input", { placeholder: "e.g. malika", maxlength: "32", autocapitalize: "none", spellcheck: "false", value: editing ? editing.username : "" });
    var pass = el("input", { type: "text", placeholder: editing ? "Leave empty to keep" : "At least 8 characters", autocomplete: "new-password" });
    var gen = el("button", { class: "btn g sm", type: "button", text: "Generate", onclick: function () { pass.value = randomPassword(); } });
    var role = el("select", {}, ROLES.map(function (r) { return el("option", { value: r, text: r }); }));
    role.value = editing ? editing.role : "Manager";
    var dept = el("select", {}, DEPTS.map(function (d) { return el("option", { value: d, text: d }); }));
    dept.value = editing && editing.department ? editing.department : "7CORE";
    var team = el("input", { placeholder: "e.g. 7CORE Night Team", maxlength: "60", value: editing ? (editing.team_name || "") : "" });
    var hint = el("div", { class: "hint" });

    var deptField = el("label", { class: "f" }, ["Department", dept]);
    var teamField = el("label", { class: "f" }, ["Team name", team]);
    function sync() {
      var isMgr = role.value === "Manager";
      deptField.style.display = teamField.style.display = isMgr ? "" : "none";
      hint.textContent = ROLE_HINT[role.value];
    }
    role.addEventListener("change", sync);

    wrap.appendChild(el("div", { class: "grid" }, [
      el("label", { class: "f" }, ["Full name", name]),
      el("label", { class: "f" }, ["Username", user]),
      el("label", { class: "f" }, [editing ? "New password" : "Password", el("span", { class: "pw" }, [pass, gen])]),
      el("label", { class: "f" }, ["Role", role]),
      deptField, teamField
    ]));
    wrap.appendChild(hint);
    var note = el("div", { class: "msg" });
    var save = el("button", { class: "btn", type: "button" });
    save.innerHTML = editing ? "Save changes" : ICON_USERS.replace("<svg", '<svg aria-hidden="true"') + "<span>Create user</span>";
    var row = el("div", { class: "row" }, [save]);
    if (editing) row.appendChild(el("button", { class: "btn g", type: "button", text: "Cancel", onclick: function () { state.editing = null; render(false); } }));
    row.appendChild(note);
    wrap.appendChild(row);
    sync();

    save.addEventListener("click", function () {
      var body = { display_name: name.value, username: user.value, role: role.value };
      if (pass.value) body.password = pass.value;
      if (role.value === "Manager") { body.department = dept.value; body.team_name = team.value; }
      if (!editing && !body.password) { msg(note, "Set a password (or press Generate).", false); return; }
      save.disabled = true;
      var request = editing
        ? api("PATCH", "/auth/users/" + editing.kind + "/" + encodeURIComponent(editing.id), body)
        : api("POST", "/auth/users", body);
      request.then(function (u) {
        var shown = body.password ? " Password: " + body.password : "";
        state.editing = null;
        return api("GET", "/auth/users").then(function (data) {
          state.users = data.users || []; state.passkey = data.passkey || ""; render(false);
          var fresh = box.querySelector(".sec .msg");
          if (fresh) msg(fresh, (editing ? "Saved " : "Created ") + u.username + " (" + u.role + ")." + shown, true);
        });
      }).catch(function (e) { msg(note, e.message, false); save.disabled = false; });
    });
    if (editing) setTimeout(function () { name.focus(); }, 0);
    return sec;
  }

  function table() {
    if (!state.users.length) return el("div", { class: "muted", text: "No accounts yet." });
    var tbody = el("tbody");
    state.users.forEach(function (u) {
      var isMe = u.kind === me.kind && String(u.id) === String(me.id);
      var who = el("div", { class: "who" }, [el("b", {}, [u.display_name, isMe ? el("span", { class: "you", text: "YOU" }) : null]), el("span", { text: "@" + u.username })]);
      var scope = u.role === "Manager" ? (u.department + (u.team_name ? " · " + u.team_name : "")) : "All departments";
      var created = u.created_at ? new Date(u.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "—";
      var edit = el("button", { class: "btn g sm", type: "button", text: "Edit", onclick: function () {
        state.editing = u; render(false); box.scrollTop = 0;
      } });
      var del = el("button", { class: "btn d sm", type: "button", text: "Delete" });
      if (isMe) { del.disabled = true; del.title = "You cannot delete your own account"; }
      del.addEventListener("click", function () {
        confirmBox("Delete " + u.display_name + " (@" + u.username + ")? They will no longer be able to sign in.").then(function (ok) {
          if (!ok) return;
          api("DELETE", "/auth/users/" + u.kind + "/" + encodeURIComponent(u.id)).then(load).catch(function (e) { alert(e.message); });
        });
      });
      tbody.appendChild(el("tr", {}, [
        el("td", {}, [who]),
        el("td", {}, [el("span", { class: "role " + roleClass(u.role), text: u.role })]),
        el("td", { class: "muted", text: scope }),
        el("td", { class: "muted", text: created }),
        el("td", { class: "acts" }, [edit, del])
      ]));
    });
    return el("table", {}, [el("thead", {}, [el("tr", {}, ["User", "Role", "Access", "Created", ""].map(function (h) { return el("th", { text: h }); }))]), tbody]);
  }

  function passkeySection() {
    var input = el("input", { placeholder: "New passkey", maxlength: "24", style: "max-width:220px;text-transform:uppercase" });
    var note = el("div", { class: "msg" });
    var save = el("button", { class: "btn g", type: "button", text: "Change passkey" });
    save.addEventListener("click", function () {
      save.disabled = true;
      api("PUT", "/auth/passkey", { passkey: input.value }).then(function (d) {
        state.passkey = d.passkey; current.textContent = d.passkey; input.value = ""; msg(note, "Passkey updated.", true);
      }).catch(function (e) { msg(note, e.message, false); }).then(function () { save.disabled = false; });
    });
    var current = el("span", { class: "code", text: state.passkey || "—" });
    return el("div", { class: "sec" }, [
      el("h4", { text: "Employee registration passkey" }),
      el("div", { class: "row", style: "margin-top:0" }, [current, input, save, note]),
      el("div", { class: "hint", text: "Employees enter this code once, when they register in the Telegram bot's attendance app." })
    ]);
  }

  /* Face ID: who has enrolled in the Telegram app; a reset makes the employee enrol again on next launch */
  function faceSection() {
    var sec = el("div", { class: "sec" }, [el("h4", { text: "Employee Face ID" }), el("div", { class: "muted", text: "Loading…" })]);
    function when(v) {
      return v ? new Date(v).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "—";
    }
    function fill() {
      api("GET", "/auth/faces").then(function (data) {
        var rows = data.employees || [];
        sec.textContent = "";
        var enrolled = rows.filter(function (r) { return r.face; }).length;
        sec.appendChild(el("h4", { text: "Employee Face ID (" + enrolled + " of " + rows.length + " enrolled)" }));
        if (!rows.length) { sec.appendChild(el("div", { class: "muted", text: "No employees yet." })); return; }
        var tbody = el("tbody");
        rows.forEach(function (r) {
          var name = ((r.first_name || "") + " " + (r.last_name || "")).trim() || String(r.telegram_id);
          var status = r.face ? el("span", { class: "role ok-badge", text: "Enrolled" }) : el("span", { class: "role off-badge", text: "Not set up" });
          var reset = el("button", { class: "btn d sm", type: "button", text: "Reset Face ID" });
          if (!r.face) reset.disabled = true;
          reset.addEventListener("click", function () {
            confirmBox("Reset Face ID for " + name + "? They will set it up again the next time they open the app.", "Reset").then(function (ok) {
              if (!ok) return;
              reset.disabled = true;
              api("DELETE", "/auth/faces/" + encodeURIComponent(r.telegram_id)).then(fill).catch(function (e) { alert(e.message); reset.disabled = false; });
            });
          });
          tbody.appendChild(el("tr", {}, [
            el("td", {}, [el("div", { class: "who" }, [el("b", { text: name }), el("span", { text: (r.department || "—") + " · " + r.telegram_id })])]),
            el("td", {}, [status]),
            el("td", { class: "muted", text: r.face ? when(r.face.enrolled_at) : "—" }),
            el("td", { class: "muted", text: r.face ? String(r.face.checks || 0) + (r.face.last_score != null ? " · last " + Math.round(r.face.last_score * 100) + "%" : "") : "—" }),
            el("td", { class: "acts" }, [reset])
          ]));
        });
        sec.appendChild(el("table", {}, [el("thead", {}, [el("tr", {}, ["Employee", "Face ID", "Enrolled", "Scans", ""].map(function (h) { return el("th", { text: h }); }))]), tbody]));
        sec.appendChild(el("div", { class: "hint", text: "Templates stay on this server and are never sent to browsers. Removing an employee also removes their Face ID." }));
      }).catch(function (e) {
        sec.textContent = "";
        sec.appendChild(el("h4", { text: "Employee Face ID" }));
        sec.appendChild(el("div", { class: "msg err", text: "Could not load: " + e.message }));
      });
    }
    fill();
    return sec;
  }
}());
