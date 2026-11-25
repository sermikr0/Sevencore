// Weekly schedule: per employee and day — work hours, day off, sick leave, vacation; past days show what happened.
import { S, t, esc, api, icon, loading, emptyBox, person, modal, toast, dm, dmy, dayShort, mondayOf, addDays, todayISO,
  deptOptions, qs, setQs, hours } from "../core.js";

export async function render(root) {
  const st = { week: mondayOf(qs("week", todayISO())), dept: qs("dept"), q: qs("q") };
  let data = null;

  root.innerHTML = `
    <div class="head">
      <div><h1>${esc(t("nav_schedule"))}</h1><p>${esc(t("sch_sub"))}</p></div>
      <div class="actions">
        <button class="btn icon" id="prev">${icon("left")}</button>
        <button class="btn" id="this">${esc(t("this_week"))}</button>
        <button class="btn icon" id="next">${icon("right")}</button>
      </div>
    </div>
    <div class="toolbar">
      <b id="label" style="font:700 15px var(--display)"></b>
      <span class="grow"></span>
      <select class="select" id="dept">${deptOptions(st.dept)}</select>
      <label class="search">${icon("search")}<input class="input" id="q" placeholder="${esc(t("search_ph"))}" value="${esc(st.q)}"></label>
    </div>
    <section class="card"><div id="grid">${loading()}</div></section>
    <div class="legend" style="padding:14px 2px">
      <span><i style="background:var(--orange);border-radius:50%"></i>${esc(t("legend_override"))}</span>
      <span>✓ ${esc(t("legend_actual"))}</span>
      <span>${esc(t(S.perms.schedule_past ? "legend_past_admin" : "legend_past"))}</span>
    </div>`;
  const $ = s => root.querySelector(s);
  if (!S.perms.all_departments) $("#dept").hidden = true;

  async function load() {
    const p = new URLSearchParams({ week: st.week });
    if (st.dept) p.set("dept", st.dept);
    if (st.q) p.set("q", st.q);
    setQs({ week: st.week === mondayOf(todayISO()) ? "" : st.week, dept: st.dept, q: st.q });
    data = await api("/api/panel/schedule?" + p);
    draw();
  }

  function slot(row, c, i) {
    const cls = [c.plan === "scheduled" ? "" : c.plan, "st-" + c.status, c.override ? "ov" : "", c.date === data.today ? "today" : ""].join(" ");
    const planTxt = c.plan === "scheduled" ? `${esc(c.start)}–${esc(c.end)}` : esc(t("plan_" + c.plan));
    let act = "";
    if (c.status === "present" || c.status === "late") act = `✓ ${esc(c.first_in || "")}${c.status === "late" ? ` +${c.late_min}` : ""}`;
    else if (c.status === "absent") act = esc(t("st_absent"));
    else if (c.status === "pending" && c.date === data.today) act = esc(t("st_pending"));
    const dis = !c.editable || !row.assigned ? "disabled" : "";
    return `<button class="slot ${cls}" ${dis} data-row="${row.telegram_id}" data-i="${i}" title="${esc(c.note || "")}">
      <div class="p">${planTxt}</div>${act ? `<div class="a">${act}</div>` : ""}</button>`;
  }

  function draw() {
    $("#label").textContent = `${dmy(data.days[0])} — ${dmy(data.days[6])}`;
    if (!data.rows.length) { $("#grid").innerHTML = emptyBox(t("no_employees"), "users"); return; }
    $("#grid").innerHTML = `<div class="table-wrap"><table class="t sched">
      <thead><tr><th>${esc(t("employee"))}</th>${data.days.map(d => `<th class="day ${d === data.today ? "today" : ""}">${esc(dayShort(d))}<b>${esc(dm(d))}</b></th>`).join("")}
        <th class="num">${esc(t("hours"))}</th></tr></thead>
      <tbody>${data.rows.map(r => `<tr>
        <td style="min-width:200px">${person(r)}${r.assigned ? `<div class="muted mono" style="font-size:11.5px;margin:4px 0 0 47px">${esc(r.shift)}</div>`
          : `<div style="margin:4px 0 0 47px"><span class="chip late">${esc(t("no_shift"))}</span></div>`}</td>
        ${r.cells.map((c, i) => `<td class="cell">${slot(r, c, i)}</td>`).join("")}
        <td class="num"><b class="mono">${hours(r.totals.planned_min)}</b><div class="muted mono" style="font-size:11.5px">${hours(r.totals.worked_min)} ✓</div></td>
      </tr>`).join("")}</tbody></table></div>`;
    root.querySelectorAll(".slot:not([disabled])").forEach(b => b.onclick = () => {
      const row = data.rows.find(r => String(r.telegram_id) === b.dataset.row);
      edit(row, row.cells[+b.dataset.i]);
    });
  }

  function edit(row, c) {
    const kinds = ["scheduled", "off", "sick", "vacation", "default"];
    let cur = c.override ? c.plan : "default";
    if (!kinds.includes(cur)) cur = "default";
    const [ds, de] = (row.shift || "09:00–18:00").split("–");
    modal({
      title: `${row.name} · ${dayShort(c.date)} ${dm(c.date)}`,
      body: `
        <div class="seg orange" id="kind" style="width:100%">${kinds.map(k => `<button data-k="${k}" class="${k === cur ? "on" : ""}">${esc(t("plan_" + k))}</button>`).join("")}</div>
        <div class="row" id="times">
          <label class="field" style="flex:1"><span>${esc(t("start"))}</span><input class="input mono" type="time" name="s" value="${esc(c.plan === "scheduled" && c.override ? c.start : ds)}"></label>
          <label class="field" style="flex:1"><span>${esc(t("end"))}</span><input class="input mono" type="time" name="e" value="${esc(c.plan === "scheduled" && c.override ? c.end : de)}"></label>
        </div>
        <label class="field"><span>${esc(t("note"))}</span><input class="input" name="note" maxlength="120" value="${esc(c.note || "")}"></label>
        <div class="note" id="hint"></div>`,
      onOpen: m => {
        const sync = () => {
          const k = m.querySelector("[data-k].on").dataset.k;
          m.querySelector("#times").hidden = k !== "scheduled";
          m.querySelector("#hint").textContent = t("hint_" + k, { shift: row.shift || "" });
        };
        m.querySelectorAll("[data-k]").forEach(b => b.onclick = () => { m.querySelectorAll("[data-k]").forEach(x => x.classList.toggle("on", x === b)); sync(); });
        sync();
      },
      actions: [{ label: t("cancel") }, { label: t("save"), kind: "primary", onClick: async m => {
        const k = m.querySelector("[data-k].on").dataset.k;
        const body = { status: k, note: m.querySelector("[name=note]").value };
        if (k === "scheduled") { body.start = m.querySelector("[name=s]").value; body.end = m.querySelector("[name=e]").value; }
        await api(`/api/panel/schedule/${row.telegram_id}/${c.date}`, { method: "PUT", body });
        toast(t("saved"));
        load();
      } }],
    });
  }

  $("#prev").onclick = () => { st.week = addDays(st.week, -7); reload(); };
  $("#next").onclick = () => { st.week = addDays(st.week, 7); reload(); };
  $("#this").onclick = () => { st.week = mondayOf(todayISO()); reload(); };
  $("#dept").onchange = () => { st.dept = $("#dept").value; reload(); };
  let qt;
  $("#q").oninput = () => { clearTimeout(qt); qt = setTimeout(() => { st.q = $("#q").value.trim(); reload(); }, 300); };
  function reload() { $("#grid").innerHTML = loading(); load().catch(() => {}); }
  await load();
  return { refresh: () => load().catch(() => {}) };
}
