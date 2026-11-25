// Overview: today's numbers, who is on shift right now, live feed, who has not arrived, last 7 days.
import { S, t, esc, api, icon, loading, emptyBox, person, actionChip, statusChip, hm, dur, durWords, dayLong, dayShort, dm,
  todayISO, photoView } from "../core.js";
import { addMark, forceCheckout } from "./forms.js";

export async function render(root) {
  root.innerHTML = loading();
  let data = null, timer = null;

  async function load() {
    data = await api("/api/panel/overview");
    draw();
  }

  function kpi(cls, label, value, sub) {
    return `<div class="kpi ${cls}"><small>${esc(label)}</small><b>${value}</b><span>${esc(sub)}</span></div>`;
  }

  function draw() {
    const k = data.kpi;
    root.innerHTML = `
      <div class="head">
        <div><h1>${esc(t("ov_title"))} <em>·</em> ${esc(dayLong(todayISO()))}</h1>
          <p>${esc(t("ov_sub", { n: data.employees }))}</p></div>
        <div class="actions">
          <a class="btn" href="/app/attendance">${icon("list")}${esc(t("all_marks"))}</a>
          <button class="btn primary" id="add">${icon("plus")}${esc(t("add_mark"))}</button>
        </div>
      </div>
      <div class="kpis">
        ${kpi("dark", t("k_on_duty"), k.on_duty, t("k_on_duty_s"))}
        ${kpi("", t("k_arrived"), k.arrived, t("k_arrived_s", { n: k.arrived + k.absent + k.expected }))}
        ${kpi(k.late ? "hot" : "", t("k_late"), k.late, t("k_late_s"))}
        ${kpi("", t("k_absent"), k.absent, t("k_absent_s"))}
        ${kpi("", t("k_expected"), k.expected, t("k_expected_s"))}
        ${kpi("", t("k_away"), k.away, t("k_away_s", { n: k.auto_out_7d }))}
      </div>
      <div class="grid g-2-1" style="margin-bottom:16px">
        <section class="card">
          <div class="card-h"><h2><i></i>${esc(t("on_duty_now"))}</h2><span class="side">${data.on_duty.length}</span></div>
          <div class="card-b flush">${data.on_duty.length ? `<div class="duty" style="padding-top:8px">${data.on_duty.map(dutyCard).join("")}</div>`
            : emptyBox(t("nobody_on_duty"), "clock")}</div>
        </section>
        <section class="card">
          <div class="card-h"><h2><i></i>${esc(t("last_7"))}</h2></div>
          <div class="card-b" style="padding-bottom:6px">${weekChart(data.week)}</div>
          <div class="legend"><span><i style="background:var(--ink)"></i>${esc(t("st_present"))}</span>
            <span><i style="background:var(--orange)"></i>${esc(t("st_late"))}</span>
            <span><i style="background:#ddd6cc"></i>${esc(t("st_absent"))}</span></div>
        </section>
      </div>
      <div class="grid g-2-1">
        <section class="card">
          <div class="card-h"><h2><i></i>${esc(t("today_feed"))}</h2><span class="side">${data.feed.length}</span></div>
          <div class="card-b flush">${data.feed.length ? `<ul class="feed">${data.feed.map(feedItem).join("")}</ul>` : emptyBox(t("no_marks_today"))}</div>
        </section>
        <section class="card">
          <div class="card-h"><h2><i></i>${esc(t("not_arrived"))}</h2><span class="side">${data.waiting.length}</span></div>
          <div class="card-b flush">${data.waiting.length ? `<ul class="wait">${data.waiting.map(waitItem).join("")}</ul>` : emptyBox(t("all_arrived"), "check")}</div>
        </section>
      </div>`;
    root.querySelector("#add").onclick = () => addMark({ onDone: load });
    root.querySelectorAll("[data-out]").forEach(b => b.onclick = e => {
      e.preventDefault(); e.stopPropagation();
      const row = data.on_duty.find(r => String(r.telegram_id) === b.dataset.out);
      forceCheckout(row, load);
    });
    root.querySelectorAll("[data-photo]").forEach(img => img.onclick = () => photoView(img.dataset.photo, img.alt));
    tick();
  }

  function dutyCard(r) {
    const since = Date.parse(r.since), ends = r.ends ? Date.parse(r.ends) : null;
    return `<a class="duty-c" href="/app/employees/${r.telegram_id}" style="text-decoration:none">
      ${person(r, false)}
      <div class="timer"><b data-since="${since}">${dur((Date.now() - since) / 6e4)}</b>
        <small>${esc(t("since", { t: hm(r.since) }))}${r.late_min ? ` · <span style="color:var(--orange-d)">+${r.late_min}</span>` : ""}</small>
        ${ends ? `<div class="bar"><i data-bar="${since}-${ends}" style="width:0"></i></div>` : ""}
      </div>
      ${S.perms.marks ? `<button class="btn sm icon ghost" title="${esc(t("force_out"))}" data-out="${r.telegram_id}">${icon("out")}</button>` : ""}
    </a>`;
  }

  function feedItem(f) {
    const extra = [];
    if (f.late_min) extra.push(`<span class="chip late">+${f.late_min} ${esc(t("min"))}</span>`);
    if (f.distance_m != null) extra.push(`<span class="muted" style="font-size:12px">${icon("pin", 'width="12" height="12"')} ${f.distance_m} m</span>`);
    if (f.manual) extra.push(`<span class="muted" style="font-size:12px">${esc(t("manual"))}</span>`);
    return `<li><span class="time">${hm(f.at)}</span>
      ${f.auto ? `<span class="thumb" style="display:grid;place-items:center">${icon("bolt", 'width="16" height="16"')}</span>`
        : `<img class="thumb" data-photo="${esc(f.id)}" alt="${esc(f.name)}" loading="lazy" src="/api/panel/marks/${encodeURIComponent(f.id)}/photo">`}
      <div class="what"><b><a href="/app/employees/${f.telegram_id}" style="text-decoration:none">${esc(f.name)}</a></b>
        <small>${esc(f.department || "")}</small></div>
      <div class="row" style="gap:6px;justify-content:flex-end">${actionChip(f.action, f.auto)}${extra.join("")}</div></li>`;
  }

  function waitItem(r) {
    return `<li>${person(r)}<span class="when">${r.start ? esc(r.start) : ""}</span>${statusChip(r.status)}</li>`;
  }

  function weekChart(week) {
    const W = 340, H = 190, pad = 22, bw = 26;
    const max = Math.max(1, ...week.map(d => d.present + d.late + d.absent));
    const step = (W - pad * 2) / week.length;
    const scale = v => (v / max) * (H - 46);
    const bars = week.map((d, i) => {
      const x = pad + i * step + (step - bw) / 2;
      let y = H - 26;
      const seg = (v, fill) => { if (!v) return ""; const h = scale(v); y -= h; return `<rect x="${x}" y="${y}" width="${bw}" height="${h}" rx="4" fill="${fill}"/>`; };
      const rects = seg(d.present, "var(--ink)") + seg(d.late, "var(--orange)") + seg(d.absent, "#ddd6cc");
      const came = d.present + d.late;
      const rate = came + d.absent ? Math.round(came / (came + d.absent) * 100) + "%" : "";
      const today = d.date === todayISO();
      return `${rects}<text x="${x + bw / 2}" y="${H - 10}" text-anchor="middle" ${today ? 'style="fill:var(--orange-d);font-weight:800"' : ""}>${esc(dayShort(d.date))}</text>
        <text x="${x + bw / 2}" y="${y - 6}" text-anchor="middle">${rate}</text><title>${dm(d.date)}: ${came} / ${d.absent}</title>`;
    }).join("");
    return `<svg class="chart" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet"><line x1="${pad}" x2="${W - pad}" y1="${H - 26}" y2="${H - 26}" stroke="var(--line)"/>${bars}</svg>`;
  }

  function tick() {
    const now = Date.now();
    root.querySelectorAll("[data-since]").forEach(el => { el.textContent = dur((now - +el.dataset.since) / 6e4); });
    root.querySelectorAll("[data-bar]").forEach(el => {
      const [a, b] = el.dataset.bar.split("-").map(Number);
      el.style.width = Math.min(100, Math.max(0, (now - a) / (b - a) * 100)) + "%";
    });
  }

  await load();
  timer = setInterval(tick, 1000);
  const auto = setInterval(() => load().catch(() => {}), 60000);
  return { refresh: () => load().catch(() => {}), destroy: () => { clearInterval(timer); clearInterval(auto); } };
}
