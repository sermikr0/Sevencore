// Team: people as cards; one person opens in a slide-over (calendar, marks, shift, photos, profile).
import { h, mount } from "../dom.js";
import { t } from "../i18n/index.js";
import { app, call } from "../store.js";
import { thisMonth, monthName, addMonth, today, weekday, hhmm, hm, hrs, pct, words, dmy, dayOf, dd } from "../time.js";
import { icon } from "../ui/icons.js";
import { avatar, status, action, weekDots, empty, loader, deptSelect, searchBox, pills } from "../ui/kit.js";
import { confirm, toast, errorText, lightbox } from "../ui/overlay.js";
import { forgetPeople } from "../ui/palette.js";
import { addMark, editMark, closeShift, dropRoster } from "./marks.js";

const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
const PRESETS = [["09:00", "18:00"], ["08:00", "17:00"], ["10:00", "19:00"], ["16:00", "02:00"], ["02:00", "16:00"]];

export async function page(ctx) {
  ctx.title(t("k_team"), t("nav_team"));
  const sp = new URLSearchParams(location.search);
  const st = { dept: sp.get("dept") || "", q: sp.get("q") || "", show: sp.get("show") || "all" };
  let rows = [], drawer = null;
  const filterBar = h("div", { class: "filters" });
  const grid = h("div", {}, loader());
  mount(ctx.root,
    h("section", { class: "greet" }, h("div", {}, h("h2", {}, t("team_h1"), " ", h("b", {}, t("team_h2"))), h("p", {}, t("team_sub")))),
    filterBar, grid);

  async function load() {
    const p = new URLSearchParams();
    if (st.dept) p.set("dept", st.dept);
    if (st.q) p.set("q", st.q);
    rows = (await call("/api/panel/employees?" + p)).rows;
    draw();
  }

  const isDuty = r => r.today && r.today.ongoing;
  function draw() {
    const counts = { all: rows.length, duty: rows.filter(isDuty).length, noshift: rows.filter(r => !r.shift).length, noface: rows.filter(r => !r.face).length };
    mount(filterBar,
      pills(["all", "duty", "noshift", "noface"].map(k => [k, t("f_" + k), counts[k]]), st.show, k => { st.show = k; draw(); }),
      h("span", { class: "sp" }),
      app.perms.all_departments ? deptSelect(st.dept, v => { st.dept = v; load(); }) : null,
      searchBox(st.q, v => { st.q = v; load(); }));
    const list = rows.filter(r => st.show === "duty" ? isDuty(r) : st.show === "noshift" ? !r.shift : st.show === "noface" ? !r.face : true);
    if (!list.length) { mount(grid, h("div", { class: "card" }, empty(rows.length ? t("nothing") : t("no_people"), "team"))); return; }
    mount(grid, h("div", { class: "people" }, list.map(card)));
  }

  function card(r) {
    const d = r.today || {};
    const duty = isDuty(r);
    return h("article", { class: ["person", duty && "duty"], onclick: () => ctx.go(`/app/team/${r.telegram_id}`) },
      h("div", { class: "top" },
        h("span", { class: "avwrap" }, avatar(r, ["lg", duty && "ring"].filter(Boolean).join(" ")),
          h("span", { class: ["fid", r.face && "on"], title: r.face ? t("face_on") : t("face_off") }, icon("scan", 12))),
        h("div", { class: "nm" }, h("b", { title: r.name }, r.name), h("small", {}, r.username ? "@" + r.username : String(r.telegram_id)))),
      h("div", { class: "mid" },
        r.shift ? h("div", {}, h("div", { class: "sh" }, r.shift), weekDots(r.days)) : h("span", { class: "st late" }, t("no_shift")),
        duty ? h("span", { class: "st duty" }, `${t("on_shift")} · ${d.first_in || ""}`) : status(d.status || "none", d.first_in && d.status !== "absent" ? d.first_in : "")),
      h("div", { class: "foot" },
        h("span", { class: "dept" }, r.department || "—"),
        h("span", {}, r.manager || (r.joined ? t("since_d", { d: dmy(dayOf(r.joined)) }) : ""))));
  }

  // ------------------------------------------------------------ one person
  async function openMember(tg) {
    if (drawer) drawer.close(false);
    drawer = member(tg, ctx, () => { drawer = null; if (location.pathname !== "/app/team") ctx.go("/app/team" + location.search); }, () => load().catch(() => {}));
  }

  await load();
  if (ctx.params[0]) openMember(ctx.params[0]);
  return {
    refresh: () => { load().catch(() => {}); if (drawer) drawer.refresh(); },
    update: params => { if (params[0]) openMember(params[0]); else if (drawer) drawer.close(false); },
    dispose: () => { if (drawer) drawer.close(false); },
  };
}

function member(tg, ctx, onClosed, onChanged) {
  const st = { month: thisMonth(), tab: "overview" };
  let d = null, alive = true;
  const body = h("div", { class: "drawer-b" }, loader());
  const head = h("div", { class: "drawer-h" });
  const tabs = h("div", { class: "seg" });
  const veil = h("div", { class: "veil", onclick: () => close() });
  const panel = h("aside", { class: "drawer", role: "dialog", "aria-modal": "true" }, head, tabs, body);
  const esc = e => { if (e.key === "Escape" && !document.querySelector(".dlg-wrap")) close(); };
  document.addEventListener("keydown", esc);
  document.body.append(veil, panel);

  function close(navigate = true) {
    if (!alive) return;
    alive = false;
    veil.remove(); panel.remove();
    document.removeEventListener("keydown", esc);
    if (navigate) onClosed();
  }

  async function load() {
    d = await call(`/api/panel/employees/${tg}?month=${st.month}`);
    if (alive) draw();
  }

  function changed() { dropRoster(); forgetPeople(); onChanged(); load().catch(() => {}); }

  function draw() {
    const e = d.employee;
    mount(head,
      avatar(e, ["xl", d.on_duty && "ring"].filter(Boolean).join(" ")),
      h("div", { class: "nm" }, h("h2", {}, e.name),
        h("div", { class: "meta" },
          h("span", { class: "dept", style: { font: "600 10.5px var(--num)", letterSpacing: ".14em", padding: "3px 8px", borderRadius: "6px", background: "var(--s2)" } }, e.department || "—"),
          e.username ? h("span", {}, "@" + e.username) : null,
          h("code", { title: t("copy"), onclick: () => { try { navigator.clipboard.writeText(String(e.telegram_id)); toast(t("copied")); } catch (x) { /* ignore */ } } }, e.telegram_id),
          d.face ? h("span", { class: "face on" }, icon("scan", 14), "Face ID") : h("span", { class: "face" }, icon("scan", 14), t("face_off"))),
        h("div", { class: "meta" },
          e.assigned ? [h("b", { class: "n", style: { color: "var(--tx)" } }, e.shift), weekDots(e.days)] : h("span", { class: "st late" }, t("no_shift")),
          d.on_duty ? h("span", { class: "st duty" }, `${t("on_shift")} · ${hhmm(d.on_duty.since)}`) : null)),
      h("div", { class: "row", style: { alignSelf: "flex-start" } },
        d.on_duty && app.perms.marks ? h("button", { class: "btn warn sm", onclick: () => closeShift(e, changed) }, icon("out", 14), t("close_shift")) : null,
        app.perms.marks ? h("button", { class: "btn go sm", onclick: () => addMark({ person: e, done: changed }) }, icon("plus", 14), t("mark")) : null,
        h("button", { class: "ib", "aria-label": t("close"), onclick: () => close() }, icon("close", 16))));
    const names = [["overview", t("tab_over")], ["marks", t("tab_marks")], ["shift", t("tab_shift")], ["photos", t("tab_photos")]];
    if (app.perms.employee_edit) names.push(["profile", t("tab_profile")]);
    mount(tabs, names.map(([k, l]) => h("button", { class: k === st.tab ? "on" : "", onclick: () => { st.tab = k; draw(); } }, l)));
    const pane = { overview, marks, shiftPane, photos, profile }[st.tab === "shift" ? "shiftPane" : st.tab]();
    mount(body, pane);
  }

  function monthNav() {
    return h("div", { class: "monthnav" },
      h("button", { class: "ib", onclick: () => { st.month = addMonth(st.month, -1); load(); } }, icon("prev", 16)),
      h("b", {}, monthName(st.month)),
      h("button", { class: "ib", disabled: st.month >= thisMonth(), onclick: () => { st.month = addMonth(st.month, 1); load(); } }, icon("next", 16)));
  }

  function overview() {
    const x = d.totals;
    const lead = weekday(d.days[0].date);
    return [monthNav(),
      h("div", { class: "stats" },
        stat(t("work_days"), x.work_days), stat(t("s_present"), x.on_time), stat(t("s_late"), x.late, x.late && "sig"),
        stat(t("s_absent"), x.absent), stat(t("hours"), hrs(x.worked_min)), stat(t("rate"), pct(x.rate))),
      h("div", { class: "heat" },
        t("dow").split(",").map(w => h("div", { class: "dw" }, w)),
        Array.from({ length: lead }, () => h("div", { class: "c blank" })),
        d.days.map(day => {
          let v = "";
          if (day.status === "present" || day.status === "late") v = `${day.first_in || ""}${day.status === "late" ? " +" + day.late_min : ""}`;
          else if (["absent", "off", "sick", "vacation"].includes(day.status)) v = t("s_" + day.status);
          else if (day.plan === "scheduled" && day.start) v = day.start;
          return h("div", { class: ["c", day.status, day.date === today() && "today"], title: `${dd(day.date)} · ${t("s_" + day.status)}${day.worked_min ? " · " + hm(day.worked_min) : ""}` },
            h("div", { class: "d" }, +day.date.slice(8)), h("div", { class: "v" }, v));
        })),
      h("div", { class: "keys", style: { marginTop: "16px" } },
        h("span", {}, h("i", { style: { background: "#e7e5e4" } }), t("s_present")), h("span", {}, h("i", { style: { background: "var(--sig)" } }), t("s_late")),
        h("span", {}, h("i", { style: { border: "1px dashed var(--tx3)" } }), t("s_absent")),
        h("span", {}, `${t("avg_in")}: `, h("b", { class: "n", style: { color: "var(--tx)" } }, x.avg_in || "—")),
        h("span", {}, `${t("late_total")}: `, h("b", { style: { color: "var(--tx)" } }, words(x.late_min))))];
  }

  function stat(label, value, cls) { return h("div", {}, h("small", {}, label), h("b", { class: cls || "" }, value)); }

  function marks() {
    if (!d.marks.length) return [monthNav(), empty(t("no_marks"), "journal")];
    return [monthNav(), h("div", { class: "lst" }, d.marks.map(m => h("div", { class: "ln" },
      h("span", { class: "tm n" }, hhmm(m.at)),
      h("span", { class: "n t3" }, dd(dayOf(m.at))),
      h("div", { class: "row", style: { gap: "8px" } }, action(m.action, m.auto),
        m.late_min ? h("span", { class: "st late" }, t("late_by", { m: m.late_min })) : null,
        m.admin_note ? h("span", { class: "t3", style: { fontSize: "12px" } }, m.admin_note) : null),
      h("span", { class: "n t2" }, m.duration_min != null ? hm(m.duration_min) : ""),
      app.perms.marks ? h("button", { class: "ib", onclick: () => editMark({ ...m, name: d.employee.name }, { done: changed }) }, icon("pen", 14)) : h("span"))))];
  }

  function shiftPane() {
    const e = d.employee, r = app.rules;
    const s = h("input", { class: "in", type: "time", value: (e.start || "09:00").slice(0, 5) });
    const en = h("input", { class: "in", type: "time", value: (e.end || "18:00").slice(0, 5) });
    const picked = new Set(e.assigned ? e.days : DAYS.slice(0, 5));
    const dayBtns = h("div", { class: "days" });
    const presetRow = h("div", { class: "chips" });
    const windows = h("div", { class: "hint sig" });
    const shiftTime = (v, m) => { const [a, b] = v.split(":").map(Number); const x = ((a * 60 + b + m) % 1440 + 1440) % 1440; return `${String(Math.floor(x / 60)).padStart(2, "0")}:${String(x % 60).padStart(2, "0")}`; };
    const refreshUi = () => {
      mount(dayBtns, DAYS.map((k, i) => h("button", { class: picked.has(k) ? "on" : "", onclick: () => { picked.has(k) ? picked.delete(k) : picked.add(k); refreshUi(); } },
        t("dow").split(",")[i])));
      mount(presetRow, PRESETS.map(([a, b]) => h("button", { class: s.value === a && en.value === b ? "on" : "", onclick: () => { s.value = a; en.value = b; refreshUi(); } },
        h("b", {}, `${a} – ${b}`), h("small", {}, +b.slice(0, 2) < +a.slice(0, 2) ? t("p_night") : +b.slice(0, 2) - +a.slice(0, 2) > 10 ? t("p_long") : t("p_day")))));
      windows.textContent = s.value && en.value ? t("windows", { a: shiftTime(s.value, -r.early_min), b: shiftTime(s.value, r.late_max_min), c: en.value,
        d: shiftTime(en.value, r.checkout_window_min) }) : "";
    };
    s.oninput = refreshUi; en.oninput = refreshUi;
    refreshUi();
    return h("div", { class: "form" },
      h("label", { class: "fld" }, h("span", {}, t("presets")), presetRow),
      h("div", { class: "row" }, h("label", { class: "fld" }, h("span", {}, t("start")), s), h("label", { class: "fld" }, h("span", {}, t("end")), en)),
      h("label", { class: "fld" }, h("span", {}, t("work_days")), dayBtns),
      windows,
      h("div", { class: "row" },
        h("button", { class: "btn go", onclick: async () => {
          try {
            const res = await call(`/api/panel/employees/${tg}`, { method: "PATCH", body: { shift: { start: s.value, end: en.value, days: DAYS.filter(k => picked.has(k)) } } });
            toast(t(res.shift_note === "from_tomorrow" ? "shift_tomorrow" : "shift_today")); changed();
          } catch (x) { toast(errorText(x), true); }
        } }, icon("check", 16), t("save_shift")),
        e.assigned ? h("button", { class: "btn line", onclick: async () => {
          if (!(await confirm(t("drop_shift_q")))) return;
          try { await call(`/api/panel/employees/${tg}`, { method: "PATCH", body: { shift: { clear: true } } }); toast(t("saved")); changed(); }
          catch (x) { toast(errorText(x), true); }
        } }, t("drop_shift")) : null));
  }

  function photos() {
    if (!d.photos.length) return empty(t("no_photos"), "cam");
    return h("div", { class: "gallery" }, d.photos.map(p => h("figure", { onclick: () => lightbox(p.id, d.employee.name) },
      h("img", { alt: "", loading: "lazy", src: `/api/panel/marks/${encodeURIComponent(p.id)}/photo` }),
      h("figcaption", {}, h("span", {}, `${dd(dayOf(p.at))} ${hhmm(p.at)}`), h("span", {}, p.action === "check_in" ? "IN" : "OUT")))));
  }

  function profile() {
    const e = d.employee;
    const fn = h("input", { class: "in", maxLength: 40, value: e.first_name || "" });
    const ln = h("input", { class: "in", maxLength: 40, value: e.last_name || "" });
    const dp = h("select", { class: "sel" }, app.departments.map(x => h("option", { value: x, selected: x === e.department }, x)));
    const mg = h("select", { class: "sel" }, h("option", { value: "" }, t("by_dept")),
      d.managers.map(m => h("option", { value: m.id, selected: m.id === e.manager_id }, `${m.name} · ${m.department || ""}`)));
    return h("div", { class: "form" },
      h("div", { class: "row" }, h("label", { class: "fld" }, h("span", {}, t("first_name")), fn), h("label", { class: "fld" }, h("span", {}, t("last_name")), ln)),
      h("div", { class: "row" }, h("label", { class: "fld" }, h("span", {}, t("dept")), dp), h("label", { class: "fld" }, h("span", {}, t("manager")), mg)),
      h("div", {}, h("button", { class: "btn go", onclick: async () => {
        try {
          await call(`/api/panel/employees/${tg}`, { method: "PATCH", body: { first_name: fn.value, last_name: ln.value, department: dp.value, manager_id: mg.value || null } });
          toast(t("saved")); changed();
        } catch (x) { toast(errorText(x), true); }
      } }, icon("check", 16), t("save"))),
      h("div", { class: "danger" }, h("div", {}, h("b", {}, "Face ID"),
        h("small", {}, d.face ? t("face_info", { d: dmy(dayOf(d.face.enrolled_at)), n: d.face.checks || 0 }) : t("face_off"))),
        d.face ? h("button", { class: "btn warn", onclick: async () => {
          if (!(await confirm(t("face_reset_q", { name: e.name }), t("face_reset")))) return;
          try { await call(`/api/panel/employees/${tg}/face`, { method: "DELETE" }); toast(t("face_reset_done")); changed(); }
          catch (x) { toast(errorText(x), true); }
        } }, icon("loop", 15), t("face_reset")) : null),
      h("div", { class: "danger" }, h("div", {}, h("b", {}, t("remove_person")), h("small", {}, t("remove_person_hint"))),
        h("button", { class: "btn warn", onclick: async () => {
          if (!(await confirm(t("remove_person_q", { name: e.name }), t("delete")))) return;
          try { await call(`/api/panel/employees/${tg}`, { method: "DELETE" }); toast(t("deleted")); dropRoster(); forgetPeople(); onChanged(); close(); }
          catch (x) { toast(errorText(x), true); }
        } }, icon("bin", 15), t("delete"))));
  }

  load().catch(x => { mount(body, empty(errorText(x))); });
  return { close, refresh: () => { if (alive && st.tab !== "shift" && st.tab !== "profile") load().catch(() => {}); } };
}
