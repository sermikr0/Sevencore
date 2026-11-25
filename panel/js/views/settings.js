// Settings (admins): accounts and roles, the employee passkey, the active rules, the Telegram bot.
import { S, t, esc, api, icon, loading, emptyBox, modal, confirmBox, toast, errText, dmy, localInput } from "../core.js";

export async function render(root) {
  root.innerHTML = loading();
  let cfg = null, users = null;

  async function load() {
    cfg = await api("/api/panel/settings");
    users = S.perms.accounts ? await api("/auth/users") : null;
    draw();
  }

  function roleChip(u) {
    const cls = u.role === "Super Admin" ? "absent" : u.role === "Admin" ? "in" : "late";
    const label = u.role === "Super Admin" ? t("role_super") : u.role === "Admin" ? t("role_admin") : t("role_manager");
    return `<span class="chip ${cls}">${esc(label)}</span>`;
  }

  function draw() {
    const r = cfg.rules, b = cfg.bot;
    const mapUrl = `https://yandex.uz/maps/?pt=${r.office.lng},${r.office.lat}&z=17&l=map`;
    root.innerHTML = `
      <div class="head"><div><h1>${esc(t("nav_settings"))}</h1><p>${esc(t("set_sub"))}</p></div></div>
      ${S.perms.accounts ? `
      <section class="card" style="margin-bottom:16px">
        <div class="card-h"><h2><i></i>${esc(t("accounts"))}</h2><button class="btn primary sm" id="new-user">${icon("plus")}${esc(t("add_user"))}</button></div>
        <div class="card-b flush"><div class="table-wrap"><table class="t">
          <thead><tr><th>${esc(t("user"))}</th><th>${esc(t("role"))}</th><th>${esc(t("access"))}</th><th>${esc(t("created"))}</th><th></th></tr></thead>
          <tbody>${users.users.map(u => `<tr>
            <td><span class="person"><span class="av sm">${esc((u.display_name || "?").slice(0, 2).toUpperCase())}</span>
              <span><b>${esc(u.display_name)}${u.id === users.me.id && u.kind === users.me.kind ? ` <span class="muted">(${esc(t("you"))})</span>` : ""}</b><small>@${esc(u.username)}</small></span></span></td>
            <td>${roleChip(u)}</td>
            <td class="muted">${u.kind === "manager" ? esc(t("access_dept", { d: u.department })) : esc(t("access_all"))}</td>
            <td class="muted mono">${u.created_at ? esc(dmy(localInput(Date.parse(u.created_at)).slice(0, 10))) : "—"}</td>
            <td class="num"><button class="btn sm" data-edit="${esc(u.kind)}:${esc(u.id)}">${icon("edit")}${esc(t("edit"))}</button></td>
          </tr>`).join("")}</tbody></table></div></div>
      </section>
      <div class="grid g-1-1" style="margin-bottom:16px">
        <section class="card">
          <div class="card-h"><h2><i></i>${esc(t("passkey"))}</h2></div>
          <div class="card-b">
            <p class="muted" style="margin-top:0">${esc(t("passkey_hint"))}</p>
            <div class="row"><b class="mono" style="font-size:22px;letter-spacing:.08em;background:var(--ink);color:#fff;padding:6px 14px;border-radius:10px">${esc(cfg.passkey || "—")}</b>
              <input class="input mono" id="pk" maxlength="24" placeholder="${esc(t("new_passkey"))}" style="text-transform:uppercase;width:170px">
              <button class="btn dark" id="pk-save">${esc(t("change"))}</button></div>
          </div>
        </section>
        ${botCard(b)}
      </div>` : `<div class="grid g-1-1" style="margin-bottom:16px">${botCard(b)}<div></div></div>`}
      <section class="card">
        <div class="card-h"><h2><i></i>${esc(t("rules"))}</h2><a class="btn sm" target="_blank" rel="noopener" href="${esc(mapUrl)}">${icon("pin")}${esc(t("open_map"))}</a></div>
        <div class="card-b"><div class="kv">
          <div>${esc(t("r_checkin"))}</div><div>${esc(t("r_checkin_v", { a: r.early_min, b: r.late_max_min }))}</div>
          <div>${esc(t("r_late"))}</div><div>${esc(t("r_late_v", { n: r.late_grace_min }))}</div>
          <div>${esc(t("r_checkout"))}</div><div>${esc(t("r_checkout_v", { n: r.checkout_window_min }))}</div>
          <div>${esc(t("r_missed"))}</div><div>${esc(t("r_missed_v"))}</div>
          <div>${esc(t("r_area"))}</div><div>${esc(t("r_area_v", { r: r.radius_m, lat: r.office.lat, lng: r.office.lng }))}${r.checkout_geofence ? "" : " · " + esc(t("r_out_anywhere"))}</div>
          <div>${esc(t("r_face"))}</div><div>${esc(t(r.liveness ? "r_face_live" : "r_face_v"))}</div>
          <div>${esc(t("r_gap"))}</div><div>${esc(t("r_gap_v", { n: r.min_gap_min }))}</div>
        </div><p class="muted" style="margin-bottom:0;font-size:12.5px">${esc(t("rules_hint"))}</p></div>
      </section>`;
    const $ = s => root.querySelector(s);
    if ($("#new-user")) $("#new-user").onclick = () => userForm(null);
    root.querySelectorAll("[data-edit]").forEach(btn => btn.onclick = () => {
      const [kind, id] = btn.dataset.edit.split(":");
      userForm(users.users.find(u => u.kind === kind && String(u.id) === id));
    });
    if ($("#pk-save")) $("#pk-save").onclick = async () => {
      try { await api("/auth/passkey", { method: "PUT", body: { passkey: $("#pk").value } }); toast(t("saved")); load(); }
      catch (e) { toast(errText(e), "err"); }
    };
  }

  function botCard(b) {
    const ok = b.state === "polling";
    return `<section class="card"><div class="card-h"><h2><i></i>${esc(t("bot"))}</h2>
      <span class="chip ${ok ? "duty" : "absent"}">${esc(ok ? t("bot_on") : b.state)}</span></div>
      <div class="card-b"><div class="kv">
        <div>${esc(t("bot_name"))}</div><div>${b.username ? `<a href="https://t.me/${esc(b.username)}" target="_blank" rel="noopener">@${esc(b.username)}</a>` : "—"}</div>
        <div>${esc(t("bot_app"))}</div><div class="mono" style="word-break:break-all">${esc(b.app_url || "—")}</div>
      </div></div></section>`;
  }

  function userForm(u) {
    const editing = !!u;
    const gen = () => Array.from(crypto.getRandomValues(new Uint8Array(9)), x => "abcdefghjkmnpqrstuvwxyz23456789"[x % 31]).join("");
    modal({
      title: editing ? t("edit_user") : t("add_user"),
      body: `
        <div class="row">
          <label class="field" style="flex:1"><span>${esc(t("full_name"))}</span><input class="input" name="display_name" maxlength="60" value="${esc(u ? u.display_name : "")}"></label>
          <label class="field" style="flex:1"><span>${esc(t("username"))}</span><input class="input mono" name="username" maxlength="32" value="${esc(u ? u.username : "")}" placeholder="malika"></label>
        </div>
        <label class="field"><span>${esc(editing ? t("new_password") : t("password"))}</span>
          <div class="row"><input class="input mono" name="password" style="flex:1" placeholder="${esc(editing ? t("keep_password") : t("min_8"))}">
          <button class="btn" type="button" id="gen">${esc(t("generate"))}</button></div></label>
        <div class="row">
          <label class="field" style="flex:1"><span>${esc(t("role"))}</span><select class="select" name="role">
            ${["Manager", "Admin", "Super Admin"].map(r => `<option value="${r}"${(u ? u.role : "Manager") === r ? " selected" : ""}>${esc(r === "Manager" ? t("role_manager") : r === "Admin" ? t("role_admin") : t("role_super"))}</option>`).join("")}
          </select></label>
          <label class="field" style="flex:1" id="dept-f"><span>${esc(t("department"))}</span><select class="select" name="department">
            ${S.departments.map(d => `<option${u && u.department === d ? " selected" : ""}>${esc(d)}</option>`).join("")}</select></label>
        </div>
        <div class="note" id="role-hint"></div>`,
      onOpen: m => {
        const role = m.querySelector("[name=role]");
        const sync = () => {
          m.querySelector("#dept-f").hidden = role.value !== "Manager";
          m.querySelector("#role-hint").textContent = t("role_hint_" + role.value.replace(" ", "_").toLowerCase());
        };
        role.onchange = sync; sync();
        m.querySelector("#gen").onclick = () => { m.querySelector("[name=password]").value = gen(); };
      },
      actions: [
        ...(editing ? [{ label: t("delete"), kind: "danger", left: true, onClick: async (m, close) => {
          if (!(await confirmBox(t("delete_user_q", { name: u.display_name }), t("delete")))) return false;
          await api(`/auth/users/${u.kind}/${encodeURIComponent(u.id)}`, { method: "DELETE" });
          toast(t("deleted")); close(); load();
        } }] : []),
        { label: t("cancel") },
        { label: t("save"), kind: "primary", onClick: async m => {
          const body = {};
          for (const k of ["display_name", "username", "password", "role", "department"]) body[k] = m.querySelector(`[name=${k}]`).value;
          if (body.role !== "Manager") delete body.department;
          if (editing && !body.password) delete body.password;
          try {
            if (editing) await api(`/auth/users/${u.kind}/${encodeURIComponent(u.id)}`, { method: "PATCH", body });
            else await api("/auth/users", { method: "POST", body });
          } catch (e) { toast(e.code || errText(e), "err"); return false; }
          toast(editing ? t("saved") : t("user_created", { u: body.username }));
          load();
        } },
      ],
    });
  }

  await load();
  return {};
}
