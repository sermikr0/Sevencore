// Employees: everyone who registered through the bot, with shift, Face ID and today's status.
import { S, t, esc, api, icon, loading, emptyBox, person, statusChip, daysDots, hm, deptOptions, qs, setQs } from "../core.js";
import { navigate } from "../main.js";

export async function render(root) {
  const st = { dept: qs("dept"), q: qs("q"), view: qs("show", "all") };
  let rows = [];
  root.innerHTML = `
    <div class="head">
      <div><h1>${esc(t("nav_employees"))}</h1><p>${esc(t("emp_sub"))}</p></div>
    </div>
    <div class="toolbar">
      <div class="seg orange" id="views">
        ${["all", "duty", "noshift", "noface"].map(v => `<button data-v="${v}">${esc(t("ev_" + v))}</button>`).join("")}
      </div>
      <span class="grow"></span>
      <select class="select" id="dept">${deptOptions(st.dept)}</select>
      <label class="search">${icon("search")}<input class="input" id="q" placeholder="${esc(t("search_ph"))}" value="${esc(st.q)}"></label>
    </div>
    <section class="card"><div id="list">${loading()}</div></section>`;
  const $ = s => root.querySelector(s);
  if (!S.perms.all_departments) $("#dept").hidden = true;

  async function load() {
    const p = new URLSearchParams();
    if (st.dept) p.set("dept", st.dept);
    if (st.q) p.set("q", st.q);
    setQs({ dept: st.dept, q: st.q, show: st.view === "all" ? "" : st.view });
    rows = (await api("/api/panel/employees?" + p)).rows;
    draw();
  }

  function filtered() {
    if (st.view === "duty") return rows.filter(r => r.today && r.today.ongoing);
    if (st.view === "noshift") return rows.filter(r => !r.shift);
    if (st.view === "noface") return rows.filter(r => !r.face);
    return rows;
  }

  function draw() {
    root.querySelectorAll("[data-v]").forEach(b => {
      b.classList.toggle("on", b.dataset.v === st.view);
      const n = { all: rows.length, duty: rows.filter(r => r.today && r.today.ongoing).length,
        noshift: rows.filter(r => !r.shift).length, noface: rows.filter(r => !r.face).length }[b.dataset.v];
      b.textContent = `${t("ev_" + b.dataset.v)} · ${n}`;
    });
    const list = filtered();
    if (!list.length) { $("#list").innerHTML = emptyBox(rows.length ? t("no_match") : t("no_employees"), "users"); return; }
    $("#list").innerHTML = `<div class="table-wrap"><table class="t">
      <thead><tr><th>${esc(t("employee"))}</th><th>${esc(t("department"))}</th><th>${esc(t("shift"))}</th>
        <th>${esc(t("today"))}</th><th>Face ID</th>${S.perms.assign ? `<th>${esc(t("manager"))}</th>` : ""}<th></th></tr></thead>
      <tbody>${list.map(r => {
        const d = r.today || {};
        const today = d.ongoing ? `<span class="chip duty"><span class="dot" style="background:#fff"></span>${esc(t("on_shift"))} · ${esc(d.first_in || "")}</span>`
          : statusChip(d.status || "none", d.first_in && d.status !== "absent" ? d.first_in : "");
        return `<tr class="click" data-tg="${r.telegram_id}">
          <td>${person(r)}</td>
          <td><span class="chip dept">${esc(r.department || "—")}</span></td>
          <td>${r.shift ? `<b class="mono">${esc(r.shift)}</b><div style="margin-top:4px">${daysDots(r.days)}</div>`
            : `<span class="chip late">${esc(t("no_shift"))}</span>`}</td>
          <td>${today}</td>
          <td>${r.face ? `<span class="face on">${icon("face")}${esc(t("enrolled"))}</span>` : `<span class="face">${icon("face")}${esc(t("not_enrolled"))}</span>`}</td>
          ${S.perms.assign ? `<td class="muted">${esc(r.manager || "—")}</td>` : ""}
          <td class="num">${icon("right", 'width="16" height="16" style="color:var(--soft)"')}</td>
        </tr>`;
      }).join("")}</tbody></table></div>`;
    root.querySelectorAll("tr[data-tg]").forEach(tr => tr.onclick = e => {
      if (e.target.closest("a")) return;
      navigate("/app/employees/" + tr.dataset.tg);
    });
  }

  root.querySelectorAll("[data-v]").forEach(b => b.onclick = () => { st.view = b.dataset.v; setQs({ show: st.view === "all" ? "" : st.view }); draw(); });
  $("#dept").onchange = () => { st.dept = $("#dept").value; load(); };
  let qt;
  $("#q").oninput = () => { clearTimeout(qt); qt = setTimeout(() => { st.q = $("#q").value.trim(); load(); }, 300); };
  await load();
  return { refresh: () => load().catch(() => {}) };
}
