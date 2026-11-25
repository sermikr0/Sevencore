// Attendance log: every check-in / check-out in a period, with filters, corrections and CSV export.
import { S, t, esc, api, icon, loading, emptyBox, person, actionChip, hm, dur, dmy, todayISO, addDays, mondayOf,
  deptOptions, photoView, download, qs, setQs, localInput } from "../core.js";
import { addMark, editMark } from "./forms.js";

const RANGES = ["today", "yesterday", "week", "month", "custom"];

function rangeDates(kind, from, to) {
  const today = todayISO();
  if (kind === "yesterday") return [addDays(today, -1), addDays(today, -1)];
  if (kind === "week") return [mondayOf(today), today];
  if (kind === "month") return [today.slice(0, 8) + "01", today];
  if (kind === "custom") return [from || today, to || today];
  return [today, today];
}

export async function render(root) {
  const st = { range: qs("range", "today"), from: qs("from"), to: qs("to"), dept: qs("dept"), action: qs("action"), q: qs("q") };
  let data = null;

  root.innerHTML = `
    <div class="head">
      <div><h1>${esc(t("nav_attendance"))}</h1><p>${esc(t("att_sub"))}</p></div>
      <div class="actions">
        <button class="btn" id="csv">${icon("download")}CSV</button>
        <button class="btn primary" id="add">${icon("plus")}${esc(t("add_mark"))}</button>
      </div>
    </div>
    <div class="toolbar">
      <div class="seg" id="ranges">${RANGES.map(r => `<button data-r="${r}">${esc(t("r_" + r))}</button>`).join("")}</div>
      <span class="row" id="custom" hidden>
        <input class="input" type="date" id="from"><span class="muted">—</span><input class="input" type="date" id="to">
      </span>
      <span class="grow"></span>
      <select class="select" id="dept">${deptOptions(st.dept)}</select>
      <select class="select" id="action">
        <option value="">${esc(t("all_actions"))}</option>
        <option value="check_in">${esc(t("check_in"))}</option>
        <option value="check_out">${esc(t("check_out"))}</option>
      </select>
      <label class="search">${icon("search")}<input class="input" id="q" placeholder="${esc(t("search_ph"))}" value="${esc(st.q)}"></label>
    </div>
    <div class="kpis" id="sum" style="grid-template-columns:repeat(4,minmax(0,1fr))"></div>
    <section class="card"><div id="list">${loading()}</div></section>`;

  const $ = s => root.querySelector(s);
  if (!S.perms.all_departments && S.departments.length) $("#dept").hidden = true;
  $("#action").value = st.action;

  function syncControls() {
    root.querySelectorAll("[data-r]").forEach(b => b.classList.toggle("on", b.dataset.r === st.range));
    $("#custom").hidden = st.range !== "custom";
    const [f, to] = rangeDates(st.range, st.from, st.to);
    $("#from").value = f; $("#to").value = to;
  }

  function params() {
    const [f, to] = rangeDates(st.range, st.from, st.to);
    const p = new URLSearchParams({ from: f, to });
    if (st.dept) p.set("dept", st.dept);
    if (st.action) p.set("action", st.action);
    if (st.q) p.set("q", st.q);
    return p;
  }

  async function load() {
    setQs({ range: st.range === "today" ? "" : st.range, from: st.range === "custom" ? st.from : "", to: st.range === "custom" ? st.to : "",
      dept: st.dept, action: st.action, q: st.q });
    data = await api("/api/panel/marks?" + params());
    draw();
  }

  function draw() {
    $("#sum").innerHTML = `
      <div class="kpi dark"><small>${esc(t("s_total"))}</small><b>${data.total}</b><span>${esc(dmy(data.from))} — ${esc(dmy(data.to))}</span></div>
      <div class="kpi"><small>${esc(t("s_checkins"))}</small><b>${data.check_ins}</b><span>${esc(t("s_checkouts", { n: data.total - data.check_ins }))}</span></div>
      <div class="kpi ${data.late ? "hot" : ""}"><small>${esc(t("k_late"))}</small><b>${data.late}</b><span>${esc(t("s_late"))}</span></div>
      <div class="kpi"><small>${esc(t("s_manual"))}</small><b>${data.manual}</b><span>${esc(t("s_manual_s"))}</span></div>`;
    if (!data.rows.length) { $("#list").innerHTML = emptyBox(t("no_marks")); return; }
    const showDate = data.from !== data.to;
    $("#list").innerHTML = `<div class="table-wrap"><table class="t">
      <thead><tr><th>${esc(t("employee"))}</th><th>${esc(t("action"))}</th><th>${esc(t("time"))}</th>
        <th>${esc(t("details"))}</th><th class="num">${esc(t("duration"))}</th><th>${esc(t("photo"))}</th><th></th></tr></thead>
      <tbody>${data.rows.map(r => `<tr>
        <td>${person(r)}</td>
        <td>${actionChip(r.action, r.auto)}</td>
        <td class="nowrap"><b class="mono">${hm(r.at)}</b>${showDate ? `<div class="muted mono" style="font-size:12px">${esc(dmy(localInput(Date.parse(r.at)).slice(0, 10)))}</div>` : ""}</td>
        <td style="max-width:320px">
          <div class="row" style="gap:6px">
            ${r.late_min ? `<span class="chip late">+${r.late_min} ${esc(t("min"))}</span>` : ""}
            ${r.distance_m != null ? `<span class="muted" style="font-size:12px">${icon("pin", 'width="12" height="12"')} ${r.distance_m} m</span>` : ""}
            ${r.face ? `<span class="face on">${icon("face")}Face ID</span>` : ""}
          </div>
          ${r.admin_note ? `<div class="muted" style="font-size:12px;margin-top:3px">${esc(r.admin_note)}</div>` : ""}
        </td>
        <td class="num mono">${r.duration_min != null ? dur(r.duration_min) : ""}</td>
        <td>${r.auto ? "" : `<img class="thumb" data-photo="${esc(r.id)}" alt="${esc(r.name)}" loading="lazy" src="/api/panel/marks/${encodeURIComponent(r.id)}/photo">`}</td>
        <td class="num">${S.perms.marks ? `<button class="btn sm icon ghost" data-edit="${esc(r.id)}" title="${esc(t("edit"))}">${icon("edit")}</button>` : ""}</td>
      </tr>`).join("")}</tbody></table></div>
      ${data.total > data.rows.length ? `<div class="empty">${esc(t("too_many", { n: data.rows.length, total: data.total }))}</div>` : ""}`;
    root.querySelectorAll("[data-photo]").forEach(img => img.onclick = () => photoView(img.dataset.photo, img.alt));
    root.querySelectorAll("[data-edit]").forEach(b => b.onclick = () => editMark(data.rows.find(r => r.id === b.dataset.edit), { onDone: load }));
  }

  root.querySelectorAll("[data-r]").forEach(b => b.onclick = () => { st.range = b.dataset.r; syncControls(); reload(); });
  $("#from").onchange = () => { st.from = $("#from").value; reload(); };
  $("#to").onchange = () => { st.to = $("#to").value; reload(); };
  $("#dept").onchange = () => { st.dept = $("#dept").value; reload(); };
  $("#action").onchange = () => { st.action = $("#action").value; reload(); };
  let qt;
  $("#q").oninput = () => { clearTimeout(qt); qt = setTimeout(() => { st.q = $("#q").value.trim(); reload(); }, 300); };
  $("#add").onclick = () => addMark({ onDone: load });
  $("#csv").onclick = () => download("/api/panel/marks.csv?" + params());

  function reload() { $("#list").innerHTML = loading(); load().catch(e => { $("#list").innerHTML = emptyBox(e.code || "error"); }); }

  syncControls();
  await load();
  return { refresh: () => load().catch(() => {}) };
}
