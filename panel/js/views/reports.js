// Reports: per employee for a month or any period — days worked, on time, late, absent, hours, attendance rate.
import { S, t, esc, api, icon, loading, emptyBox, person, hours, pct, durWords, dm, dmy, dayShort, monthISO, monthLabel,
  todayISO, mondayOf, addDays, deptOptions, download, qs, setQs } from "../core.js";

const COLS = [
  ["name", "employee"], ["work_days", "work_days"], ["on_time", "on_time"], ["late", "k_late"], ["absent", "k_absent"],
  ["away", "away_days"], ["worked_min", "hours"], ["avg_in", "avg_in"], ["rate", "rate"],
];

export async function render(root) {
  const st = { mode: qs("mode", "month"), month: qs("month", monthISO()), from: qs("from", mondayOf(todayISO())), to: qs("to", todayISO()),
    dept: qs("dept"), sort: qs("sort", "name"), dir: qs("dir", "asc") };
  let data = null;

  root.innerHTML = `
    <div class="head">
      <div><h1>${esc(t("nav_reports"))}</h1><p>${esc(t("rep_sub"))}</p></div>
      <div class="actions"><button class="btn primary" id="xlsx">${icon("download")}Excel</button></div>
    </div>
    <div class="toolbar">
      <div class="seg" id="mode"><button data-m="month">${esc(t("by_month"))}</button><button data-m="range">${esc(t("by_range"))}</button></div>
      <span class="row" id="m-month"><input class="input" type="month" id="month" max="${monthISO()}"></span>
      <span class="row" id="m-range"><input class="input" type="date" id="from"><span class="muted">—</span><input class="input" type="date" id="to"></span>
      <span class="grow"></span>
      <select class="select" id="dept">${deptOptions(st.dept)}</select>
    </div>
    <div id="body">${loading()}</div>`;
  const $ = s => root.querySelector(s);
  if (!S.perms.all_departments) $("#dept").hidden = true;

  function params() {
    const p = new URLSearchParams();
    if (st.mode === "month") p.set("month", st.month); else { p.set("from", st.from); p.set("to", st.to); }
    if (st.dept) p.set("dept", st.dept);
    return p;
  }

  function sync() {
    root.querySelectorAll("[data-m]").forEach(b => b.classList.toggle("on", b.dataset.m === st.mode));
    $("#m-month").hidden = st.mode !== "month";
    $("#m-range").hidden = st.mode !== "range";
    $("#month").value = st.month; $("#from").value = st.from; $("#to").value = st.to;
  }

  async function load() {
    setQs({ mode: st.mode === "month" ? "" : st.mode, month: st.mode === "month" && st.month !== monthISO() ? st.month : "",
      from: st.mode === "range" ? st.from : "", to: st.mode === "range" ? st.to : "", dept: st.dept,
      sort: st.sort === "name" ? "" : st.sort, dir: st.dir === "asc" ? "" : st.dir });
    data = await api("/api/panel/reports?" + params());
    draw();
  }

  function val(r, k) {
    if (k === "name") return r.name.toLowerCase();
    if (k === "away") return r.totals.off + r.totals.sick + r.totals.vacation;
    if (k === "avg_in") return r.totals.avg_in || "99";
    if (k === "rate") return r.totals.rate ?? -1;
    return r.totals[k];
  }

  function draw() {
    const T = data.totals;
    const title = st.mode === "month" ? monthLabel(st.month) : `${dmy(data.from)} — ${dmy(data.to)}`;
    const rows = [...data.rows].sort((a, b) => {
      const x = val(a, st.sort), y = val(b, st.sort);
      return (x > y ? 1 : x < y ? -1 : 0) * (st.dir === "asc" ? 1 : -1);
    });
    $("#body").innerHTML = `
      <div class="kpis">
        <div class="kpi dark"><small>${esc(t("rate"))}</small><b>${pct(T.rate)}</b><span>${esc(title)}</span></div>
        <div class="kpi"><small>${esc(t("work_days"))}</small><b>${T.work_days}</b><span>${esc(t("people_n", { n: data.rows.length }))}</span></div>
        <div class="kpi"><small>${esc(t("on_time"))}</small><b>${T.on_time}</b><span>${esc(t("late_after", { n: S.rules.late_grace_min }))}</span></div>
        <div class="kpi ${T.late ? "hot" : ""}"><small>${esc(t("k_late"))}</small><b>${T.late}</b><span>${esc(durWords(T.late_min))}</span></div>
        <div class="kpi"><small>${esc(t("k_absent"))}</small><b>${T.absent}</b><span>${esc(t("auto_out"))}: ${T.auto_out}</span></div>
        <div class="kpi alt"><small>${esc(t("hours"))}</small><b>${hours(T.worked_min)}</b><span>${esc(t("hours_s"))}</span></div>
      </div>
      <section class="card" style="margin-bottom:16px">
        <div class="card-h"><h2><i></i>${esc(t("daily_chart"))}</h2><span class="side">${esc(title)}</span></div>
        <div class="card-b">${dailyChart(data.daily)}</div>
      </section>
      <section class="card">
        ${rows.length ? `<div class="table-wrap"><table class="t">
          <thead><tr>${COLS.map(([k, l]) => `<th class="sort ${k !== "name" ? "num" : ""} ${st.sort === k ? "sorted" : ""}" data-s="${k}">${esc(t(l))}${st.sort === k ? (st.dir === "asc" ? " ↑" : " ↓") : ""}</th>`).join("")}
            <th>${esc(t("days_strip"))}</th></tr></thead>
          <tbody>${rows.map(r => {
            const x = r.totals;
            return `<tr>
              <td>${person(r)}</td>
              <td class="num mono">${x.work_days}</td>
              <td class="num mono">${x.on_time}</td>
              <td class="num mono" style="${x.late ? "color:var(--orange-d);font-weight:800" : ""}">${x.late}</td>
              <td class="num mono" style="${x.absent ? "font-weight:800" : ""}">${x.absent}</td>
              <td class="num mono">${x.off + x.sick + x.vacation}</td>
              <td class="num mono"><b>${hours(x.worked_min)}</b></td>
              <td class="num mono">${esc(x.avg_in || "—")}</td>
              <td class="num"><span class="ratebar"><b class="mono">${pct(x.rate)}</b><i><span style="width:${x.rate == null ? 0 : x.rate * 100}%"></span></i></span></td>
              <td><span class="strip">${r.days.map(d => `<i class="${esc(d.status)}" title="${esc(dm(d.date))} · ${esc(t("st_" + d.status))}${d.first_in ? " · " + esc(d.first_in) : ""}"></i>`).join("")}</span></td>
            </tr>`;
          }).join("")}</tbody>
          <tfoot><tr><td>${esc(t("total"))}</td><td class="num mono">${T.work_days}</td><td class="num mono">${T.on_time}</td><td class="num mono">${T.late}</td>
            <td class="num mono">${T.absent}</td><td class="num mono">${T.off + T.sick + T.vacation}</td><td class="num mono">${hours(T.worked_min)}</td><td></td>
            <td class="num mono">${pct(T.rate)}</td><td></td></tr></tfoot>
        </table></div>` : emptyBox(t("no_employees"), "users")}
      </section>`;
    root.querySelectorAll("[data-s]").forEach(th => th.onclick = () => {
      if (st.sort === th.dataset.s) st.dir = st.dir === "asc" ? "desc" : "asc"; else { st.sort = th.dataset.s; st.dir = th.dataset.s === "name" ? "asc" : "desc"; }
      setQs({ sort: st.sort === "name" ? "" : st.sort, dir: st.dir === "asc" ? "" : st.dir });
      draw();
    });
  }

  function dailyChart(days) {
    const W = Math.max(600, days.length * 26), H = 170, pad = 16;
    const step = (W - pad * 2) / days.length, bw = Math.min(16, step - 6);
    const max = Math.max(1, ...days.map(d => d.present + d.absent));
    const today = todayISO();
    const bars = days.map((d, i) => {
      const x = pad + i * step + (step - bw) / 2;
      let y = H - 24;
      const seg = (v, fill) => { if (!v) return ""; const h = v / max * (H - 40); y -= h; return `<rect x="${x}" y="${y}" width="${bw}" height="${h}" rx="3" fill="${fill}"/>`; };
      const lbl = days.length <= 16 || i % 2 === 0 ? `<text x="${x + bw / 2}" y="${H - 8}" text-anchor="middle" ${d.date === today ? 'style="fill:var(--orange-d);font-weight:800"' : ""}>${+d.date.slice(8)}</text>` : "";
      return seg(d.present - d.late, "var(--ink)") + seg(d.late, "var(--orange)") + seg(d.absent, "#ddd6cc") + lbl +
        `<title>${dm(d.date)} ${dayShort(d.date)}: ${d.present} / ${d.absent}</title>`;
    }).join("");
    return `<div class="table-wrap"><svg class="chart" style="min-width:${W}px;height:${H}px" viewBox="0 0 ${W} ${H}">
      <line x1="${pad}" x2="${W - pad}" y1="${H - 24}" y2="${H - 24}" stroke="var(--line)"/>${bars}</svg></div>
      <div class="legend" style="padding:8px 0 0"><span><i style="background:var(--ink)"></i>${esc(t("st_present"))}</span>
        <span><i style="background:var(--orange)"></i>${esc(t("st_late"))}</span><span><i style="background:#ddd6cc"></i>${esc(t("st_absent"))}</span></div>`;
  }

  root.querySelectorAll("[data-m]").forEach(b => b.onclick = () => { st.mode = b.dataset.m; sync(); reload(); });
  $("#month").onchange = () => { if ($("#month").value) { st.month = $("#month").value; reload(); } };
  $("#from").onchange = () => { st.from = $("#from").value; reload(); };
  $("#to").onchange = () => { st.to = $("#to").value; reload(); };
  $("#dept").onchange = () => { st.dept = $("#dept").value; reload(); };
  $("#xlsx").onclick = () => { const p = params(); p.set("lang", S.lang); download("/api/panel/reports.xlsx?" + p); };
  function reload() { $("#body").innerHTML = loading(); load().catch(() => {}); }
  sync();
  await load();
  return { refresh: () => load().catch(() => {}) };
}
