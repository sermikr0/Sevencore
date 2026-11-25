// Insights: share of on time / late / absent, day-by-day bars, ranking, person × day heat map, Excel export.
import { h, mount } from "../dom.js";
import { t, getLang } from "../i18n/index.js";
import { app, call } from "../store.js";
import { thisMonth, monthName, addMonth, today, monday, dd, dmy, dow, hrs, pct, words } from "../time.js";
import { icon } from "../ui/icons.js";
import { avatar, empty, loader, deptSelect, pills } from "../ui/kit.js";
import { ring, dayBars } from "../ui/charts.js";
import { download } from "../ui/overlay.js";

export async function page(ctx) {
  ctx.title(t("k_insights"), t("nav_insights"));
  const sp = new URLSearchParams(location.search);
  const st = { mode: sp.get("mode") || "month", month: sp.get("month") || thisMonth(), from: sp.get("from") || monday(today()), to: sp.get("to") || today(),
    dept: sp.get("dept") || "" };
  const filterBar = h("div", { class: "filters" });
  const out = h("div", {}, loader());
  mount(ctx.root,
    h("section", { class: "greet" }, h("div", {}, h("h2", {}, t("ins_h1"), " ", h("b", {}, t("ins_h2"))), h("p", {}, t("ins_sub"))),
      h("button", { class: "btn go", onclick: () => { const p = params(); p.set("lang", getLang()); download("/api/panel/reports.xlsx?" + p); } },
        icon("down", 16), "Excel")),
    filterBar, out);

  function params() {
    const p = new URLSearchParams();
    if (st.mode === "range") { p.set("from", st.from); p.set("to", st.to); } else p.set("month", st.month);
    if (st.dept) p.set("dept", st.dept);
    return p;
  }

  function bar() {
    mount(filterBar,
      pills([["month", t("by_month")], ["range", t("by_range")]], st.mode, k => { st.mode = k; bar(); reload(); }),
      st.mode === "month" ? h("span", { class: "row" },
        h("button", { class: "ib", onclick: () => { st.month = addMonth(st.month, -1); bar(); reload(); } }, icon("prev", 16)),
        h("b", { class: "it", style: { fontSize: "22px", minWidth: "160px", textAlign: "center" } }, monthName(st.month)),
        h("button", { class: "ib", disabled: st.month >= thisMonth(), onclick: () => { st.month = addMonth(st.month, 1); bar(); reload(); } }, icon("next", 16)))
        : h("span", { class: "row" },
          h("input", { class: "in", type: "date", value: st.from, onchange: e => { st.from = e.target.value; reload(); } }), h("span", { class: "t3" }, "→"),
          h("input", { class: "in", type: "date", value: st.to, onchange: e => { st.to = e.target.value; reload(); } })),
      h("span", { class: "sp" }),
      app.perms.all_departments ? deptSelect(st.dept, v => { st.dept = v; reload(); }) : null);
  }

  async function load() {
    const keep = params();
    if (st.mode === "month" && st.month === thisMonth()) keep.delete("month");
    if (st.mode === "range") keep.set("mode", "range");
    history.replaceState(history.state, "", location.pathname + (keep.toString() ? "?" + keep : ""));
    const d = await call("/api/panel/reports?" + params());
    draw(d);
  }

  function draw(d) {
    const T = d.totals;
    if (!d.rows.length) { mount(out, h("div", { class: "card" }, empty(t("no_people"), "team"))); return; }
    const rank = [...d.rows].filter(r => r.totals.rate != null)
      .sort((a, b) => (b.totals.rate - a.totals.rate) || (a.totals.late_min - b.totals.late_min) || (b.totals.worked_min - a.totals.worked_min));
    const lateRank = [...d.rows].filter(r => r.totals.late).sort((a, b) => b.totals.late_min - a.totals.late_min).slice(0, 5);
    const many = d.days.length > 16;
    mount(out,
      h("section", { class: "grid cols-hero", style: { marginBottom: "16px" } },
        h("div", { class: "card gauge-card rise" },
          h("div", { class: "donut" },
            ring([{ value: T.on_time, color: "var(--tx)" }, { value: T.late, color: "var(--sig)", glow: true }, { value: T.absent, color: "#3f3f46" }],
              { size: 190, width: 22 }),
            h("div", { class: "mid" }, h("div", {}, h("b", { class: "n" }, pct(T.rate)), h("small", {}, t("rate"))))),
          h("div", { class: "legend2" },
            h("div", {}, h("i", { style: { background: "var(--tx)" } }), h("span", {}, t("s_present")), h("b", { class: "n" }, T.on_time)),
            h("div", {}, h("i", { style: { background: "var(--sig)" } }), h("span", {}, t("s_late")), h("b", { class: "n" }, T.late)),
            h("div", {}, h("i", { style: { background: "#3f3f46" } }), h("span", {}, t("s_absent")), h("b", { class: "n" }, T.absent)),
            h("div", {}, h("i", { style: { background: "var(--s3)" } }), h("span", {}, t("away")), h("b", { class: "n" }, T.off + T.sick + T.vacation)))),
        h("div", { class: "tiles rise" },
          h("div", { class: "tile hot" }, h("small", {}, t("hours")), h("b", {}, hrs(T.worked_min)), h("span", {}, t("hours_s"))),
          h("div", { class: "tile" }, h("small", {}, t("work_days")), h("b", {}, T.work_days), h("span", {}, t("people_n", { n: d.rows.length }))),
          h("div", { class: "tile" }, h("small", {}, t("late_total")), h("b", { style: { fontSize: "26px" } }, words(T.late_min)), h("span", {}, t("late_after", { n: app.rules.late_grace_min }))),
          h("div", { class: "tile" }, h("small", {}, t("auto_7")), h("b", {}, T.auto_out), h("span", {}, t("auto_s")))),
        h("div", { class: "card rise" },
          h("div", { class: "chd" }, h("h3", {}, t("late_top")), h("span", { class: "tag n" }, lateRank.length)),
          lateRank.length ? h("div", { class: "cbd board" }, lateRank.map((r, i) => h("div", { class: "r", onclick: () => ctx.go(`/app/team/${r.telegram_id}`) },
            h("span", { class: "rk n" }, String(i + 1).padStart(2, "0")),
            h("span", { class: "who" }, avatar(r, "sm"), h("span", { class: "nm" }, h("b", {}, r.name))),
            h("span", { class: "n sig", style: { textAlign: "right", whiteSpace: "nowrap" } }, words(r.totals.late_min)),
            h("span", { class: "n t3", style: { textAlign: "right" } }, `×${r.totals.late}`))))
            : empty(t("nobody_late"), "check"))),
      h("section", { class: "card rise", style: { marginBottom: "16px" } },
        h("div", { class: "chd" }, h("h3", {}, t("by_day")), h("span", { class: "sp" }),
          h("span", { class: "keys" }, h("span", {}, h("i", { style: { background: "var(--tx)" } }), t("s_present")),
            h("span", {}, h("i", { style: { background: "var(--sig)" } }), t("s_late")), h("span", {}, h("i", { style: { background: "#3f3f46" } }), t("s_absent")))),
        h("div", { class: "cbd" }, dayBars(d.daily.map(x => ({ label: many ? +x.date.slice(8) : `${dow(x.date)} ${+x.date.slice(8)}`, accent: x.date === today(),
          parts: [{ value: x.present - x.late, color: "var(--tx)" }, { value: x.late, color: "var(--sig)" }, { value: x.absent, color: "#3f3f46" }] })),
        { labelEvery: many ? 2 : 1 }))),
      h("section", { class: "grid cols-main" },
        h("div", { class: "card rise" },
          h("div", { class: "chd" }, h("h3", {}, t("heatmap")), h("span", { class: "tag n" }, `${dmy(d.from)} → ${dmy(d.to)}`)),
          h("div", { class: "matrix" }, h("table", {},
            h("thead", {}, h("tr", {}, h("th", { class: "nm" }), d.days.map(x => h("th", { style: x === today() ? { color: "var(--sig)" } : null }, +x.slice(8))),
              h("th", {}, t("hours")))),
            h("tbody", {}, d.rows.map(r => h("tr", {},
              h("td", { class: "nm" }, h("a", { class: "who", href: `/app/team/${r.telegram_id}`, "data-link": "" }, avatar(r, "sm"), h("span", { class: "nm" }, h("b", {}, r.name)))),
              r.days.map(x => h("td", { class: ["q", x.status], title: `${dd(x.date)} · ${t("s_" + x.status)}${x.first_in ? " · " + x.first_in : ""}` })),
              h("td", { class: "tot" }, hrs(r.totals.worked_min)))))))),
        h("div", { class: "card rise" },
          h("div", { class: "chd" }, h("h3", {}, t("ranking")), h("span", { class: "tag n" }, rank.length)),
          rank.length ? h("div", { class: "cbd board" }, rank.map((r, i) => h("div", { class: "r", onclick: () => ctx.go(`/app/team/${r.telegram_id}`) },
            h("span", { class: "rk n" }, String(i + 1).padStart(2, "0")),
            h("span", { class: "who" }, avatar(r, "sm"), h("span", { class: "nm" }, h("b", {}, r.name), h("small", {}, `${r.totals.work_days} ${t("days_short")} · ${hrs(r.totals.worked_min)} ${t("h_short")}`))),
            h("span", { class: "rate" }, h("span", { class: "meter" }, h("i", { style: { width: `${(r.totals.rate || 0) * 100}%` } })),
              h("b", { class: "n" }, pct(r.totals.rate))),
            h("span", { class: "n t3", style: { textAlign: "right" } }, r.totals.avg_in || "—"))))
            : empty(t("no_data"), "chart"))));
  }

  function reload() { mount(out, loader()); load().catch(() => {}); }
  bar();
  await load();
  return { refresh: () => load().catch(() => {}) };
}
