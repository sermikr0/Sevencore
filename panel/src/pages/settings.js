// Settings (admins): people with access, the employee passkey, the rules in force, the bot.
import { h, mount } from "../dom.js";
import { t } from "../i18n/index.js";
import { app, call } from "../store.js";
import { dmy, dayOf } from "../time.js";
import { icon } from "../ui/icons.js";
import { empty, loader, initials } from "../ui/kit.js";
import { dialog, confirm, toast, errorText } from "../ui/overlay.js";

export async function page(ctx) {
  ctx.title(t("k_settings"), t("nav_settings"));
  if (app.user.kind !== "admin") { mount(ctx.root, h("div", { class: "card" }, empty(t("e_forbidden"), "shield"))); return {}; }
  const sections = [...(app.perms.accounts ? [["access", "user", t("sec_access")], ["passkey", "key", t("sec_passkey")]] : []),
    ["rules", "shield", t("sec_rules")], ["bot", "send", t("sec_bot")]];
  let sec = new URLSearchParams(location.search).get("s") || sections[0][0];
  let cfg = null, users = null;
  const nav = h("nav", { class: "subnav" });
  const pane = h("div", {}, loader());
  mount(ctx.root,
    h("section", { class: "greet" }, h("div", {}, h("h2", {}, t("set_h1"), " ", h("b", {}, t("set_h2"))), h("p", {}, t("set_sub")))),
    h("div", { class: "setwrap" }, nav, pane));

  async function load() {
    cfg = await call("/api/panel/settings");
    users = app.perms.accounts ? await call("/auth/users") : null;
    draw();
  }

  function draw() {
    mount(nav, sections.map(([k, ico, label]) => h("button", { class: k === sec ? "on" : "", onclick: () => {
      sec = k; history.replaceState(history.state, "", location.pathname + "?s=" + k); draw();
    } }, icon(ico, 16), label)));
    mount(pane, { access, passkey, rules, bot }[sec]());
  }

  function roleClass(u) { return u.role === "Super Admin" ? "super" : u.role === "Admin" ? "admin" : ""; }
  function roleName(r) { return r === "Super Admin" ? t("r_super") : r === "Admin" ? t("r_admin") : t("r_manager"); }

  function access() {
    return h("div", { class: "card" },
      h("div", { class: "chd" }, h("h3", {}, t("sec_access")), h("span", { class: "tag n" }, users.users.length), h("span", { class: "sp" }),
        h("button", { class: "btn go sm", onclick: () => userForm(null) }, icon("plus", 14), t("add_user"))),
      h("div", { class: "cbd users" }, users.users.map(u => h("div", { class: "u" },
        h("span", { class: "who" }, h("span", { class: "av sm" }, initials(u.display_name)),
          h("span", { class: "nm" }, h("b", {}, u.display_name, u.id === users.me.id && u.kind === users.me.kind ? h("span", { class: "t3" }, ` · ${t("you")}`) : null),
            h("small", {}, "@" + u.username))),
        h("span", { class: ["role", roleClass(u)] }, roleName(u.role)),
        h("span", { class: "t3" }, u.kind === "manager" ? t("scope_dept", { d: u.department }) : t("scope_all")),
        h("button", { class: "btn sm line", onclick: () => userForm(u) }, icon("pen", 14), t("edit"))))));
  }

  function passkey() {
    const input = h("input", { class: "in n", maxLength: 24, placeholder: t("new_passkey"), style: { textTransform: "uppercase", width: "200px" } });
    return h("div", { class: "card pad", style: { display: "grid", gap: "18px" } },
      h("div", {}, h("h3", { style: { margin: "0 0 6px" } }, t("sec_passkey")), h("p", { class: "t2", style: { margin: 0 } }, t("passkey_hint"))),
      h("div", {}, h("span", { class: "key" }, cfg.passkey || "—")),
      h("div", { class: "row" }, input, h("button", { class: "btn go", onclick: async () => {
        try { await call("/auth/passkey", { method: "PUT", body: { passkey: input.value } }); toast(t("saved")); load(); }
        catch (e) { toast(e.code || errorText(e), true); }
      } }, t("change"))));
  }

  function rules() {
    const r = cfg.rules;
    const map = `https://yandex.uz/maps/?pt=${r.office.lng},${r.office.lat}&z=17&l=map`;
    const line = (k, v) => h("div", {}, h("span", {}, k), h("span", {}, v));
    return h("div", { style: { display: "grid", gap: "14px" } },
      h("div", { class: "rules" },
        line(t("ru_in"), t("ru_in_v", { a: r.early_min, b: r.late_max_min })),
        line(t("ru_late"), t("ru_late_v", { n: r.late_grace_min })),
        line(t("ru_out"), t("ru_out_v", { n: r.checkout_window_min })),
        line(t("ru_missed"), t("ru_missed_v")),
        line(t("ru_area"), [t("ru_area_v", { r: r.radius_m }), " ", h("a", { class: "sig", href: map, target: "_blank", rel: "noopener" }, `${r.office.lat}, ${r.office.lng} ↗`)]),
        line(t("ru_face"), r.liveness ? t("ru_face_live") : "Face ID"),
        line(t("ru_gap"), t("ru_gap_v", { n: r.min_gap_min }))),
      h("div", { class: "hint" }, t("rules_hint")));
  }

  function bot() {
    const b = cfg.bot, ok = b.state === "polling";
    return h("div", { class: "card pad", style: { display: "grid", gap: "16px" } },
      h("div", { class: "row", style: { justifyContent: "space-between" } }, h("h3", { style: { margin: 0 } }, t("sec_bot")),
        h("span", { class: ["st", ok ? "duty" : "absent"] }, ok ? t("bot_on") : b.state)),
      h("div", { class: "rules" },
        h("div", {}, h("span", {}, t("bot_name")), b.username ? h("a", { class: "sig", href: `https://t.me/${b.username}`, target: "_blank", rel: "noopener" }, "@" + b.username) : "—"),
        h("div", {}, h("span", {}, t("bot_app")), h("span", { class: "n", style: { wordBreak: "break-all" } }, b.app_url || "—"))));
  }

  function userForm(u) {
    const editing = !!u;
    const f = {
      display_name: h("input", { class: "in", maxLength: 60, value: u ? u.display_name : "" }),
      username: h("input", { class: "in n", maxLength: 32, value: u ? u.username : "", placeholder: "malika" }),
      password: h("input", { class: "in n", placeholder: editing ? t("keep_pw") : t("min_8") }),
      role: h("select", { class: "sel" }, ["Manager", "Admin", "Super Admin"].map(r => h("option", { value: r, selected: (u ? u.role : "Manager") === r }, roleName(r)))),
      department: h("select", { class: "sel" }, app.departments.map(x => h("option", { value: x, selected: u && u.department === x }, x))),
    };
    const deptField = h("label", { class: "fld" }, h("span", {}, t("dept")), f.department);
    const hint = h("div", { class: "hint" });
    const sync = () => { deptField.hidden = f.role.value !== "Manager"; hint.textContent = t("rh_" + f.role.value.replace(" ", "_").toLowerCase()); };
    f.role.onchange = sync; sync();
    const gen = () => { f.password.value = Array.from(crypto.getRandomValues(new Uint8Array(10)), x => "abcdefghjkmnpqrstuvwxyz23456789"[x % 31]).join(""); };
    dialog({ title: editing ? t("edit_user") : t("add_user"), body: [
      h("div", { class: "row" }, h("label", { class: "fld" }, h("span", {}, t("full_name")), f.display_name), h("label", { class: "fld" }, h("span", {}, t("login")), f.username)),
      h("label", { class: "fld" }, h("span", {}, editing ? t("new_pw") : t("pw")), h("div", { class: "row", style: { flexWrap: "nowrap" } }, f.password,
        h("button", { class: "btn line", type: "button", onclick: gen }, t("generate")))),
      h("div", { class: "row" }, h("label", { class: "fld" }, h("span", {}, t("role")), f.role), deptField),
      hint,
    ], actions: [
      ...(editing ? [{ label: t("delete"), kind: "warn", left: true, run: async close => {
        if (!(await confirm(t("delete_user_q", { name: u.display_name }), t("delete")))) return false;
        await call(`/auth/users/${u.kind}/${encodeURIComponent(u.id)}`, { method: "DELETE" });
        toast(t("deleted")); close(); load();
      } }] : []),
      { label: t("cancel") },
      { label: t("save"), kind: "go", run: async () => {
        const body = {};
        for (const k in f) body[k] = f[k].value;
        if (body.role !== "Manager") delete body.department;
        if (editing && !body.password) delete body.password;
        try {
          if (editing) await call(`/auth/users/${u.kind}/${encodeURIComponent(u.id)}`, { method: "PATCH", body });
          else await call("/auth/users", { method: "POST", body });
        } catch (e) { toast(e.code || errorText(e), true); return false; }
        toast(editing ? t("saved") : t("user_made", { u: body.username }));
        load();
      } },
    ] });
  }

  await load();
  return {};
}
