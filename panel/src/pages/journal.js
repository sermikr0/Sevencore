// Journal: every mark, grouped by day, with filters, corrections and CSV export.
import { h, mount } from "../dom.js";
import { t } from "../i18n/index.js";
import { app, call } from "../store.js";
import { today, shift, monday, hhmm, hm, dayOf, relDay, dmy } from "../time.js";
import { icon } from "../ui/icons.js";
import { who, action, empty, loader, photo, deptSelect, searchBox, pills } from "../ui/kit.js";
import { lightbox, download } from "../ui/overlay.js";
import { addMark, editMark } from "./marks.js";

function range(kind, from, to) {
  const td = today();
  if (kind === "yesterday") return [shift(td, -1), shift(td, -1)];
  if (kind === "week") return [monday(td), td];
  if (kind === "month") return [td.slice(0, 8) + "01", td];
  if (kind === "custom") return [from || td, to || td];
  return [td, td];
}

export async function page(ctx) {
  ctx.title(t("k_journal"), t("nav_journal"));
  const sp = new URLSearchParams(location.search);
  const st = { r: sp.get("r") || "today", from: sp.get("from"), to: sp.get("to"), dept: sp.get("dept") || "", act: sp.get("act") || "", q: sp.get("q") || "" };
  const filterBar = h("div", { class: "filters" });
  const summary = h("div", { class: "card sumline" });
  const list = h("div", {}, loader());
  mount(ctx.root,
    h("section", { class: "greet" }, h("div", {}, h("h2", {}, t("journal_h1"), " ", h("b", {}, t("journal_h2"))), h("p", {}, t("journal_sub"))),
      h("div", { class: "row" },
        h("button", { class: "btn line", onclick: () => download("/api/panel/marks.csv?" + params()) }, icon("down", 16), "CSV"),
        h("button", { class: "btn go", onclick: () => addMark({ done: load }) }, icon("plus", 16), t("add_mark")))),
    filterBar, summary, list);

  function params() {
    const [f, to] = range(st.r, st.from, st.to);
    const p = new URLSearchParams({ from: f, to });
    if (st.dept) p.set("dept", st.dept);
    if (st.act) p.set("action", st.act);
    if (st.q) p.set("q", st.q);
    return p;
  }

  function bar() {
    const [f, to] = range(st.r, st.from, st.to);
    mount(filterBar,
      pills([["today", t("r_today")], ["yesterday", t("r_yesterday")], ["week", t("r_week")], ["month", t("r_month")], ["custom", t("r_custom")]],
        st.r, k => { st.r = k; bar(); reload(); }),
      st.r === "custom" ? h("span", { class: "row" },
        h("input", { class: "in", type: "date", value: f, onchange: e => { st.from = e.target.value; reload(); } }), h("span", { class: "t3" }, "→"),
        h("input", { class: "in", type: "date", value: to, onchange: e => { st.to = e.target.value; reload(); } })) : null,
      h("span", { class: "sp" }),
      app.perms.all_departments ? deptSelect(st.dept, v => { st.dept = v; reload(); }) : null,
      h("select", { class: "sel", onchange: e => { st.act = e.target.value; reload(); } },
        h("option", { value: "" }, t("all_actions")), h("option", { value: "check_in", selected: st.act === "check_in" }, t("in_long")),
        h("option", { value: "check_out", selected: st.act === "check_out" }, t("out_long"))),
      searchBox(st.q, v => { st.q = v; reload(); }));
  }

  async function load() {
    const keep = new URLSearchParams();
    for (const [k, v] of Object.entries({ r: st.r === "today" ? "" : st.r, from: st.r === "custom" ? st.from : "", to: st.r === "custom" ? st.to : "",
      dept: st.dept, act: st.act, q: st.q })) if (v) keep.set(k, v);
    history.replaceState(history.state, "", location.pathname + (keep.toString() ? "?" + keep : ""));
    const d = await call("/api/panel/marks?" + params());
    mount(summary,
      h("div", {}, h("small", {}, t("period")), h("b", { class: "n", style: { fontSize: "18px" } }, d.from === d.to ? dmy(d.from) : `${dmy(d.from)} → ${dmy(d.to)}`)),
      h("div", {}, h("small", {}, t("marks")), h("b", { class: "n" }, d.total)),
      h("div", {}, h("small", {}, t("in_long")), h("b", { class: "n" }, d.check_ins)),
      h("div", {}, h("small", {}, t("out_long")), h("b", { class: "n" }, d.total - d.check_ins)),
      h("div", {}, h("small", {}, t("s_late")), h("b", { class: ["n", d.late && "sig"] }, d.late)),
      h("div", {}, h("small", {}, t("manual")), h("b", { class: "n" }, d.manual)));
    if (!d.rows.length) { mount(list, h("div", { class: "card" }, empty(t("no_marks"), "journal"))); return; }
    const days = new Map();
    for (const r of d.rows) { const k = dayOf(r.at); if (!days.has(k)) days.set(k, []); days.get(k).push(r); }
    mount(list, [...days].map(([day, rows]) => [
      h("div", { class: "day-h" }, h("h4", {}, relDay(day)), h("span", { class: "n" }, `${dmy(day)} · ${rows.length}`)),
      h("div", { class: "entries" }, rows.map(entry)),
    ]), d.total > d.rows.length ? h("div", { class: "empty" }, t("too_many", { n: d.rows.length, total: d.total })) : null);
  }

  function entry(r) {
    return h("div", { class: "entry" },
      h("span", { class: "tm n" }, hhmm(r.at)),
      who(r),
      action(r.action, r.auto),
      h("div", { class: "meta" },
        r.late_min ? h("span", { class: "st late" }, t("late_by", { m: r.late_min })) : null,
        r.distance_m != null ? h("span", { class: "row", style: { gap: "4px" } }, icon("pin", 13), `${r.distance_m} m`) : null,
        r.face ? h("span", { class: "face on" }, icon("scan", 14), "Face ID") : null,
        r.admin_note ? h("span", { class: "note" }, r.admin_note) : null),
      h("span", { class: "dur" }, r.duration_min != null ? hm(r.duration_min) : ""),
      r.auto ? h("span") : photo(r.id, "ph", () => lightbox(r.id, r.name)),
      app.perms.marks ? h("button", { class: "ib", title: t("edit"), onclick: () => editMark(r, { done: load }) }, icon("pen", 15)) : h("span"));
  }

  function reload() { mount(list, loader()); load().catch(() => mount(list, empty(t("e_server_error")))); }

  bar();
  await load();
  return { refresh: () => load().catch(() => {}) };
}
