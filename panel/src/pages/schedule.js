// Schedule: one week, one row per person; each day is a block you can change.
import { h, mount } from "../dom.js";
import { t } from "../i18n/index.js";
import { app, call } from "../store.js";
import { today, monday, shift, dow, dd, dmy, hrs } from "../time.js";
import { icon } from "../ui/icons.js";
import { who, empty, loader, deptSelect, searchBox } from "../ui/kit.js";
import { dialog, toast } from "../ui/overlay.js";

export async function page(ctx) {
  ctx.title(t("k_schedule"), t("nav_schedule"));
  const sp = new URLSearchParams(location.search);
  const st = { week: monday(sp.get("week") || today()), dept: sp.get("dept") || "", q: sp.get("q") || "" };
  const label = h("b", { class: "n", style: { fontSize: "15px" } });
  const table = h("div", { class: "sch" }, loader());
  mount(ctx.root,
    h("section", { class: "greet" }, h("div", {}, h("h2", {}, t("sch_h1"), " ", h("b", {}, t("sch_h2"))), h("p", {}, t("sch_sub"))),
      h("div", { class: "row" },
        h("button", { class: "ib", onclick: () => move(-7) }, icon("prev", 16)),
        h("button", { class: "btn line", onclick: () => { st.week = monday(today()); reload(); } }, t("this_week")),
        h("button", { class: "ib", onclick: () => move(7) }, icon("next", 16)))),
    h("div", { class: "filters" }, label, h("span", { class: "sp" }),
      app.perms.all_departments ? deptSelect(st.dept, v => { st.dept = v; reload(); }) : null,
      searchBox(st.q, v => { st.q = v; reload(); })),
    table,
    h("div", { class: "keys", style: { marginTop: "14px" } },
      h("span", {}, h("i", { style: { background: "var(--sig)", borderRadius: "50%" } }), t("k_override")),
      h("span", {}, "✓ ", t("k_actual")),
      h("span", {}, app.perms.schedule_past ? t("k_past_admin") : t("k_past"))));

  function move(n) { st.week = shift(st.week, n); reload(); }

  async function load() {
    const p = new URLSearchParams({ week: st.week });
    if (st.dept) p.set("dept", st.dept);
    if (st.q) p.set("q", st.q);
    const keep = new URLSearchParams();
    if (st.week !== monday(today())) keep.set("week", st.week);
    if (st.dept) keep.set("dept", st.dept);
    history.replaceState(history.state, "", location.pathname + (keep.toString() ? "?" + keep : ""));
    const d = await call("/api/panel/schedule?" + p);
    label.textContent = `${dmy(d.days[0])} → ${dmy(d.days[6])}`;
    if (!d.rows.length) { mount(table, h("div", { class: "card" }, empty(t("no_people"), "team"))); return; }
    mount(table, h("table", {},
      h("thead", {}, h("tr", {}, h("th", {}, t("person")),
        d.days.map(x => h("th", { class: ["d", x === d.today && "today"] }, dow(x), h("b", {}, dd(x)))),
        h("th", { style: { textAlign: "right" } }, t("hours")))),
      h("tbody", {}, d.rows.map(r => h("tr", {},
        h("td", { class: "p" }, who(r, { sub: r.assigned ? r.shift : t("no_shift") })),
        r.cells.map(c => h("td", { class: "c" }, block(r, c, d.today))),
        h("td", { class: "h" }, h("b", { class: "n" }, hrs(r.totals.planned_min)), h("div", { class: "n t3", style: { fontSize: "11.5px" } }, `✓ ${hrs(r.totals.worked_min)}`)))))));
  }

  function block(r, c, td) {
    const plan = c.plan === "scheduled" ? `${c.start}–${c.end}` : t("p_" + c.plan);
    let act = "";
    if (c.status === "present" || c.status === "late") act = `✓ ${c.first_in || ""}${c.status === "late" ? ` +${c.late_min}` : ""}`;
    else if (c.status === "absent") act = t("s_absent");
    else if (c.status === "pending" && c.date === td) act = t("s_pending");
    return h("button", { class: ["blk", c.plan !== "scheduled" && c.plan, "s-" + c.status, c.override && "ov", c.date === td && "today"],
      disabled: !c.editable || !r.assigned, title: c.note || "", onclick: () => edit(r, c) },
      h("div", { class: "p" }, plan), act ? h("div", { class: "a" }, act) : null);
  }

  function edit(r, c) {
    const kinds = ["scheduled", "off", "sick", "vacation", "default"];
    let kind = c.override ? c.plan : "default";
    if (!kinds.includes(kind)) kind = "default";
    const [ds, de] = (r.shift || "09:00–18:00").split("–");
    const s = h("input", { class: "in", type: "time", value: c.override && c.plan === "scheduled" ? c.start : ds });
    const e = h("input", { class: "in", type: "time", value: c.override && c.plan === "scheduled" ? c.end : de });
    const times = h("div", { class: "row" }, h("label", { class: "fld" }, h("span", {}, t("start")), s), h("label", { class: "fld" }, h("span", {}, t("end")), e));
    const note = h("input", { class: "in", maxLength: 120, value: c.note || "" });
    const hint = h("div", { class: "hint" });
    const kindPills = h("div");
    const paint = () => {
      mount(kindPills, h("div", { class: "pills" }, kinds.map(k => h("button", { class: k === kind ? "on" : "", onclick: () => { kind = k; paint(); } }, t("p_" + k)))));
      times.hidden = kind !== "scheduled";
      hint.textContent = t("h_" + kind, { shift: r.shift || "" });
    };
    paint();
    dialog({ title: `${r.name} · ${dow(c.date)} ${dd(c.date)}`, body: [kindPills, times, h("label", { class: "fld" }, h("span", {}, t("note")), note), hint],
      actions: [{ label: t("cancel") }, { label: t("save"), kind: "go", run: async () => {
        const body = { status: kind, note: note.value };
        if (kind === "scheduled") { body.start = s.value; body.end = e.value; }
        await call(`/api/panel/schedule/${r.telegram_id}/${c.date}`, { method: "PUT", body });
        toast(t("saved")); load();
      } }] });
  }

  function reload() { mount(table, loader()); load().catch(() => {}); }
  await load();
  return { refresh: () => load().catch(() => {}) };
}
