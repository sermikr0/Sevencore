// Schedule: one week, split into shift groups (Day Shift, Night Shift, ...); one row per person, each day a block.
import { h, mount } from "../dom.js";
import { t } from "../i18n/index.js";
import { app, call } from "../store.js";
import { today, monday, shift, dow, dd, dmy, hrs } from "../time.js";
import { icon } from "../ui/icons.js";
import { who, empty, loader, deptSelect, searchBox, pills, groupOf, groupTag, NO_GROUP } from "../ui/kit.js";
import { dialog, toast } from "../ui/overlay.js";
import { pickGroup } from "../ui/groups.js";

export async function page(ctx) {
  ctx.title(t("k_schedule"), t("nav_schedule"));
  const sp = new URLSearchParams(location.search);
  const st = { week: monday(sp.get("week") || today()), dept: sp.get("dept") || "", q: sp.get("q") || "", g: sp.get("g") || "" };
  let d = null;
  const label = h("b", { class: "n", style: { fontSize: "15px" } });
  const tabs = h("div", { class: "gtabs" });
  const out = h("div", {}, loader());
  mount(ctx.root,
    h("section", { class: "greet" }, h("div", {}, h("h2", {}, t("sch_h1"), " ", h("b", {}, t("sch_h2"))), h("p", {}, t("sch_sub"))),
      h("div", { class: "row" },
        h("button", { class: "ib", onclick: () => move(-7) }, icon("prev", 16)),
        h("button", { class: "btn line", onclick: () => { st.week = monday(today()); reload(); } }, t("this_week")),
        h("button", { class: "ib", onclick: () => move(7) }, icon("next", 16)))),
    h("div", { class: "filters" }, label, h("span", { class: "sp" }),
      app.perms.all_departments ? deptSelect(st.dept, v => { st.dept = v; reload(); }) : null,
      searchBox(st.q, v => { st.q = v; reload(); })),
    tabs, out,
    h("div", { class: "keys", style: { marginTop: "14px" } },
      h("span", {}, h("i", { style: { background: "var(--sig)", borderRadius: "50%" } }), t("k_override")),
      h("span", {}, "✓ ", t("k_actual")),
      h("span", {}, app.perms.schedule_past ? t("k_past_admin") : t("k_past"))));

  function move(n) { st.week = shift(st.week, n); reload(); }

  function remember() {
    const keep = new URLSearchParams();
    if (st.week !== monday(today())) keep.set("week", st.week);
    if (st.dept) keep.set("dept", st.dept);
    if (st.g) keep.set("g", st.g);
    history.replaceState(history.state, "", location.pathname + (keep.toString() ? "?" + keep : ""));
  }

  async function load() {
    const p = new URLSearchParams({ week: st.week });
    if (st.dept) p.set("dept", st.dept);
    if (st.q) p.set("q", st.q);
    d = await call("/api/panel/schedule?" + p);
    if (d.groups) app.groups = d.groups;
    label.textContent = `${dmy(d.days[0])} → ${dmy(d.days[6])}`;
    draw();
  }

  // rows of one section: a group name, or NO_GROUP
  const rowsOf = key => d.rows.filter(r => (groupOf(r) || NO_GROUP) === key);

  function draw() {
    const keys = [...app.groups, NO_GROUP];
    if (st.g && !keys.includes(st.g)) st.g = "";
    remember();
    const count = Object.fromEntries(keys.map(k => [k, rowsOf(k).length]));
    const opts = [["", t("f_all"), d.rows.length], ...app.groups.map(g => [g, g, count[g]])];
    if (count[NO_GROUP] || st.g === NO_GROUP) opts.push([NO_GROUP, t("grp_none"), count[NO_GROUP]]);
    mount(tabs, app.groups.length ? pills(opts, st.g, k => { st.g = k; draw(); }) : null);
    if (!d.rows.length) { mount(out, h("div", { class: "card" }, empty(t("no_people"), "team"))); return; }
    if (!app.groups.length) { mount(out, h("div", { class: "sch" }, table(d.rows))); return; }
    const shown = st.g ? [st.g] : keys.filter(k => count[k]);
    mount(out, shown.map(k => section(k, rowsOf(k))));
  }

  function section(key, rows) {
    const none = key === NO_GROUP;
    const planned = rows.reduce((s, r) => s + r.totals.planned_min, 0);
    return h("section", { class: ["gsec", none && "none"] },
      h("header", { class: "gsec-h" },
        h("span", { class: "gmark" }, icon("layers", 16)),
        h("h3", {}, none ? t("grp_none") : key),
        h("span", { class: "tag n" }, t("grp_people", { n: rows.length })),
        planned ? h("span", { class: "t3 n" }, t("grp_planned", { h: hrs(planned) })) : null,
        h("span", { class: "sp" }),
        none && rows.length ? h("span", { class: "t3 gsec-hint" }, t("grp_none_hint")) : null),
      rows.length ? h("div", { class: "sch" }, table(rows)) : h("div", { class: "card" }, empty(t("grp_empty"), "team")));
  }

  function table(rows) {
    return h("table", {},
      h("thead", {}, h("tr", {}, h("th", {}, t("person")),
        d.days.map(x => h("th", { class: ["d", x === d.today && "today"] }, dow(x), h("b", {}, dd(x)))),
        h("th", { style: { textAlign: "right" } }, t("hours")))),
      h("tbody", {}, rows.map(r => h("tr", {},
        h("td", { class: "p" }, h("div", { class: "pcell" }, who(r, { sub: r.assigned ? r.shift : t("no_shift") }),
          app.groups.length && app.perms.shift ? groupTag(groupOf(r), () => pickGroup(r, () => load().catch(() => {}))) : null)),
        r.cells.map(c => h("td", { class: "c" }, block(r, c, d.today))),
        h("td", { class: "h" }, h("b", { class: "n" }, hrs(r.totals.planned_min)), h("div", { class: "n t3", style: { fontSize: "11.5px" } }, `✓ ${hrs(r.totals.worked_min)}`))))));
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

  function reload() { mount(out, loader()); load().catch(() => {}); }
  await load();
  return { refresh: () => load().catch(() => {}) };
}
