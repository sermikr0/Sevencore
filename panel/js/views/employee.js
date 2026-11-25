// One employee: month calendar, marks, shift, selfies, profile.
import { S, t, esc, api, icon, loading, emptyBox, avatar, statusChip, actionChip, hm, dur, durWords, hours, pct, dm, dmy,
  monthISO, monthLabel, todayISO, weekday, toast, errText, confirmBox, photoView, localInput, qs, setQs, daysDots } from "../core.js";
import { addMark, editMark, forceCheckout, forgetEmployees } from "./forms.js";
import { navigate } from "../main.js";

const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
const PRESETS = [["09:00", "18:00"], ["08:00", "17:00"], ["10:00", "19:00"], ["16:00", "02:00"], ["02:00", "16:00"]];

export async function render(root, [tg]) {
  const st = { month: qs("month", monthISO()), tab: qs("tab", "calendar") };
  let d = null;

  async function load() {
    d = await api(`/api/panel/employees/${tg}?month=${st.month}`);
    draw();
  }

  function draw() {
    const e = d.employee, tt = d.totals;
    const tabs = [["calendar", t("tab_calendar")], ["marks", t("tab_marks")], ["shift", t("tab_shift")], ["photos", t("tab_photos")]];
    if (S.perms.employee_edit) tabs.push(["profile", t("tab_profile")]);
    root.innerHTML = `
      <a class="crumb" href="/app/employees">${icon("left", 'width="15" height="15"')}${esc(t("nav_employees"))}</a>
      <section class="card" style="margin-bottom:16px">
        <div class="profile">
          ${avatar(e.telegram_id, e.name, "lg")}
          <div class="info">
            <h1>${esc(e.name)}</h1>
            <div class="meta">
              <span class="chip dept">${esc(e.department || "—")}</span>
              ${e.username ? `<span>@${esc(e.username)}</span>` : ""}
              <span>ID <code id="copy-id" title="${esc(t("copy"))}">${e.telegram_id}</code></span>
              <span>${esc(t("joined"))}: ${e.joined ? esc(dmy(localInput(Date.parse(e.joined)).slice(0, 10))) : "—"}</span>
              ${d.face ? `<span class="face on">${icon("face")}Face ID</span>` : `<span class="face">${icon("face")}${esc(t("not_enrolled"))}</span>`}
            </div>
            <div class="meta" style="margin-top:10px">
              ${e.assigned ? `<b class="mono" style="color:var(--ink)">${esc(e.shift)}</b>${daysDots(e.days)}` : `<span class="chip late">${esc(t("no_shift"))}</span>`}
              ${d.on_duty ? `<span class="chip duty"><span class="dot" style="background:#fff"></span>${esc(t("on_shift"))} · ${esc(t("since", { t: hm(d.on_duty.since) }))}</span>` : ""}
            </div>
          </div>
          <div class="row">
            ${d.on_duty && S.perms.marks ? `<button class="btn dark" id="out">${icon("out")}${esc(t("force_out"))}</button>` : ""}
            ${S.perms.marks ? `<button class="btn primary" id="add">${icon("plus")}${esc(t("add_mark"))}</button>` : ""}
          </div>
        </div>
        <div class="toolbar" style="padding:0 20px;margin:0 0 14px">
          <button class="btn sm icon" id="prev">${icon("left")}</button>
          <b style="font:700 15px var(--display);min-width:150px;text-align:center">${esc(monthLabel(st.month))}</b>
          <button class="btn sm icon" id="next" ${st.month >= monthISO() ? "disabled" : ""}>${icon("right")}</button>
        </div>
        <div class="mini-kpis">
          <div><small>${esc(t("work_days"))}</small><b>${tt.work_days}</b></div>
          <div><small>${esc(t("on_time"))}</small><b>${tt.on_time}</b></div>
          <div><small>${esc(t("k_late"))}</small><b style="${tt.late ? "color:var(--orange-d)" : ""}">${tt.late}</b></div>
          <div><small>${esc(t("k_absent"))}</small><b>${tt.absent}</b></div>
          <div><small>${esc(t("hours"))}</small><b>${hours(tt.worked_min)}</b></div>
          <div><small>${esc(t("rate"))}</small><b>${pct(tt.rate)}</b></div>
        </div>
      </section>
      <section class="card">
        <div class="tabs">${tabs.map(([k, l]) => `<button data-tab="${k}" class="${k === st.tab ? "on" : ""}">${esc(l)}</button>`).join("")}</div>
        <div class="card-b" id="pane"></div>
      </section>`;
    const $ = s => root.querySelector(s);
    $("#copy-id").onclick = () => { try { navigator.clipboard.writeText(String(e.telegram_id)); toast(t("copied")); } catch (x) { /* ignore */ } };
    $("#prev").onclick = () => shiftMonth(-1);
    $("#next").onclick = () => shiftMonth(1);
    if ($("#add")) $("#add").onclick = () => addMark({ tg: e.telegram_id, onDone: load });
    if ($("#out")) $("#out").onclick = () => forceCheckout(e, load);
    root.querySelectorAll("[data-tab]").forEach(b => b.onclick = () => { st.tab = b.dataset.tab; setQs({ tab: st.tab === "calendar" ? "" : st.tab }); draw(); });
    pane($("#pane"));
  }

  function shiftMonth(n) {
    let [y, m] = st.month.split("-").map(Number);
    m += n; if (m < 1) { m = 12; y--; } if (m > 12) { m = 1; y++; }
    st.month = `${y}-${String(m).padStart(2, "0")}`;
    setQs({ month: st.month === monthISO() ? "" : st.month });
    load();
  }

  function pane(el) {
    if (st.tab === "marks") return marksPane(el);
    if (st.tab === "shift") return shiftPane(el);
    if (st.tab === "photos") return photosPane(el);
    if (st.tab === "profile") return profilePane(el);
    return calendarPane(el);
  }

  function calendarPane(el) {
    const today = todayISO();
    const lead = weekday(d.days[0].date);
    const cells = [];
    for (let i = 0; i < lead; i++) cells.push('<div class="d blank"></div>');
    for (const day of d.days) {
      const n = +day.date.slice(8);
      let v = "";
      if (day.status === "present" || day.status === "late") {
        v = `${esc(day.first_in || "")}${day.status === "late" ? ` +${day.late_min}` : ""}<br>${day.ongoing ? "…" : dur(day.worked_min)}`;
      } else if (["absent", "off", "sick", "vacation"].includes(day.status)) v = esc(t("st_" + day.status));
      else if (day.plan === "scheduled" && day.start) v = `<span class="muted">${esc(day.start)}</span>`;
      cells.push(`<div class="d ${esc(day.status)} ${day.date === today ? "today" : ""}" title="${esc(t("st_" + day.status))}">
        <div class="n">${n}</div><div class="v">${v}</div></div>`);
    }
    el.innerHTML = `<div class="cal">${t("dow").split(",").map(x => `<div class="dow">${esc(x)}</div>`).join("")}${cells.join("")}</div>
      <div class="legend" style="padding:14px 0 0">
        <span><i style="background:#fff;border:1px solid var(--line-2)"></i>${esc(t("st_present"))}</span>
        <span><i style="background:var(--orange-100)"></i>${esc(t("st_late"))}</span>
        <span><i style="background:var(--ink)"></i>${esc(t("st_absent"))}</span>
        <span><i style="background:#f1eee9"></i>${esc(t("st_off"))} / ${esc(t("st_sick"))}</span>
        <span>${esc(t("avg_in"))}: <b class="mono" style="color:var(--ink)">${esc(d.totals.avg_in || "—")}</b></span>
        <span>${esc(t("late_total"))}: <b style="color:var(--ink)">${durWords(d.totals.late_min)}</b></span>
        ${d.totals.auto_out ? `<span>${esc(t("auto_out"))}: <b style="color:var(--ink)">${d.totals.auto_out}</b></span>` : ""}
      </div>`;
  }

  function marksPane(el) {
    if (!d.marks.length) { el.innerHTML = emptyBox(t("no_marks")); return; }
    el.style.padding = "0";
    el.innerHTML = `<div class="table-wrap"><table class="t">
      <thead><tr><th>${esc(t("date"))}</th><th>${esc(t("action"))}</th><th>${esc(t("time"))}</th><th>${esc(t("details"))}</th>
        <th class="num">${esc(t("duration"))}</th><th></th></tr></thead>
      <tbody>${d.marks.map(m => `<tr>
        <td class="mono nowrap">${esc(dm(localInput(Date.parse(m.at)).slice(0, 10)))}</td>
        <td>${actionChip(m.action, m.auto)}</td>
        <td><b class="mono">${hm(m.at)}</b></td>
        <td>${m.late_min ? `<span class="chip late">+${m.late_min} ${esc(t("min"))}</span> ` : ""}${m.distance_m != null ? `<span class="muted" style="font-size:12px">${m.distance_m} m</span>` : ""}
          ${m.admin_note ? `<div class="muted" style="font-size:12px">${esc(m.admin_note)}</div>` : ""}</td>
        <td class="num mono">${m.duration_min != null ? dur(m.duration_min) : ""}</td>
        <td class="num">${S.perms.marks ? `<button class="btn sm icon ghost" data-edit="${esc(m.id)}">${icon("edit")}</button>` : ""}</td>
      </tr>`).join("")}</tbody></table></div>`;
    el.querySelectorAll("[data-edit]").forEach(b => b.onclick = () =>
      editMark({ ...d.marks.find(m => m.id === b.dataset.edit), name: d.employee.name }, { onDone: load }));
  }

  function shiftPane(el) {
    el.style.padding = "";
    const e = d.employee;
    const cur = { start: (e.start || "09:00").slice(0, 5), end: (e.end || "18:00").slice(0, 5), days: e.assigned ? [...e.days] : DAYS.slice(0, 5) };
    const names = t("dow").split(",");
    const r = S.rules;
    el.innerHTML = `<div class="shift-ed">
      <div><div class="field"><span>${esc(t("presets"))}</span></div>
        <div class="presets" id="presets">${PRESETS.map(([a, b]) => `<button data-p="${a}-${b}"><b>${a} – ${b}</b><small>${esc(presetName(a, b))}</small></button>`).join("")}</div></div>
      <div class="row">
        <label class="field"><span>${esc(t("start"))}</span><input class="input mono" type="time" id="s" value="${cur.start}"></label>
        <label class="field"><span>${esc(t("end"))}</span><input class="input mono" type="time" id="e" value="${cur.end}"></label>
      </div>
      <div><div class="field"><span>${esc(t("work_days_pick"))}</span></div>
        <div class="daypick" id="days">${DAYS.map((k, i) => `<button data-d="${k}" class="${cur.days.includes(k) ? "on" : ""}">${esc(names[i])}</button>`).join("")}</div></div>
      <div class="note" id="windows"></div>
      <div class="row">
        <button class="btn primary" id="save">${icon("check")}${esc(t("save_shift"))}</button>
        ${e.assigned ? `<button class="btn ghost" id="clear">${esc(t("remove_shift"))}</button>` : ""}
      </div>
    </div>`;
    const $ = s => el.querySelector(s);
    const win = () => {
      const s = $("#s").value, en = $("#e").value;
      if (!s || !en) return;
      const add = (hm_, min) => { let [h, m] = hm_.split(":").map(Number); let x = (h * 60 + m + min + 1440 * 2) % 1440; return `${String(Math.floor(x / 60)).padStart(2, "0")}:${String(x % 60).padStart(2, "0")}`; };
      $("#windows").innerHTML = esc(t("windows_line", { in1: add(s, -r.early_min), in2: add(s, r.late_max_min), out1: en, out2: add(en, r.checkout_window_min) }));
      el.querySelectorAll("[data-p]").forEach(b => b.classList.toggle("on", b.dataset.p === `${s}-${en}`));
    };
    el.querySelectorAll("[data-p]").forEach(b => b.onclick = () => { const [a, c] = b.dataset.p.split("-"); $("#s").value = a; $("#e").value = c; win(); });
    el.querySelectorAll("[data-d]").forEach(b => b.onclick = () => b.classList.toggle("on"));
    $("#s").oninput = win; $("#e").oninput = win;
    win();
    $("#save").onclick = async () => {
      const days = [...el.querySelectorAll("[data-d].on")].map(b => b.dataset.d);
      try {
        const res = await api(`/api/panel/employees/${tg}`, { method: "PATCH", body: { shift: { start: $("#s").value, end: $("#e").value, days } } });
        toast(t(res.shift_note === "from_tomorrow" ? "shift_saved_tomorrow" : "shift_saved_today"));
        forgetEmployees(); load();
      } catch (x) { toast(errText(x), "err"); }
    };
    if ($("#clear")) $("#clear").onclick = async () => {
      if (!(await confirmBox(t("remove_shift_q")))) return;
      try { await api(`/api/panel/employees/${tg}`, { method: "PATCH", body: { shift: { clear: true } } }); toast(t("saved")); load(); }
      catch (x) { toast(errText(x), "err"); }
    };
  }

  function presetName(a, b) {
    const s = +a.slice(0, 2), e = +b.slice(0, 2);
    if (e < s) return t("preset_night");
    if (e - s > 10) return t("preset_long");
    return t("preset_day");
  }

  function photosPane(el) {
    el.style.padding = "";
    if (!d.photos.length) { el.innerHTML = emptyBox(t("no_photos"), "cam"); return; }
    el.innerHTML = `<div class="photos">${d.photos.map(p => `<figure data-photo="${esc(p.id)}">
      <img loading="lazy" alt="" src="/api/panel/marks/${encodeURIComponent(p.id)}/photo">
      <figcaption><span>${esc(dm(localInput(Date.parse(p.at)).slice(0, 10)))} ${hm(p.at)}</span><span>${p.action === "check_in" ? "IN" : "OUT"}</span></figcaption></figure>`).join("")}</div>`;
    el.querySelectorAll("[data-photo]").forEach(f => f.onclick = () => photoView(f.dataset.photo, d.employee.name));
  }

  function profilePane(el) {
    el.style.padding = "";
    const e = d.employee;
    el.innerHTML = `<div class="shift-ed">
      <div class="row">
        <label class="field" style="flex:1"><span>${esc(t("first_name"))}</span><input class="input" id="fn" maxlength="40" value="${esc(e.first_name || "")}"></label>
        <label class="field" style="flex:1"><span>${esc(t("last_name"))}</span><input class="input" id="ln" maxlength="40" value="${esc(e.last_name || "")}"></label>
      </div>
      <div class="row">
        <label class="field" style="flex:1"><span>${esc(t("department"))}</span>
          <select class="select" id="dp">${S.departments.map(x => `<option${x === e.department ? " selected" : ""}>${esc(x)}</option>`).join("")}</select></label>
        <label class="field" style="flex:1"><span>${esc(t("manager"))}</span>
          <select class="select" id="mg"><option value="">${esc(t("by_department"))}</option>
            ${d.managers.map(m => `<option value="${esc(m.id)}"${m.id === e.manager_id ? " selected" : ""}>${esc(m.name)} · ${esc(m.department || "")}</option>`).join("")}</select></label>
      </div>
      <div><button class="btn primary" id="psave">${icon("check")}${esc(t("save"))}</button></div>
      <div class="danger-zone"><div><b>Face ID</b><div class="muted" style="font-size:13px">${d.face
        ? esc(t("face_info", { date: dmy(localInput(Date.parse(d.face.enrolled_at)).slice(0, 10)), n: d.face.checks || 0 }))
        : esc(t("not_enrolled"))}</div></div>
        ${d.face ? `<button class="btn danger" id="reset">${icon("refresh")}${esc(t("reset_face"))}</button>` : ""}</div>
      <div class="danger-zone"><div><b>${esc(t("delete_employee"))}</b><div class="muted" style="font-size:13px">${esc(t("delete_employee_hint"))}</div></div>
        <button class="btn danger" id="del">${icon("trash")}${esc(t("delete"))}</button></div>
    </div>`;
    const $ = s => el.querySelector(s);
    $("#psave").onclick = async () => {
      try {
        await api(`/api/panel/employees/${tg}`, { method: "PATCH", body: { first_name: $("#fn").value, last_name: $("#ln").value,
          department: $("#dp").value, manager_id: $("#mg").value || null } });
        toast(t("saved")); forgetEmployees(); load();
      } catch (x) { toast(errText(x), "err"); }
    };
    if ($("#reset")) $("#reset").onclick = async () => {
      if (!(await confirmBox(t("reset_face_q", { name: e.name }), t("reset_face")))) return;
      try { await api(`/api/panel/employees/${tg}/face`, { method: "DELETE" }); toast(t("face_reset_done")); load(); }
      catch (x) { toast(errText(x), "err"); }
    };
    $("#del").onclick = async () => {
      if (!(await confirmBox(t("delete_employee_q", { name: e.name }), t("delete")))) return;
      try { await api(`/api/panel/employees/${tg}`, { method: "DELETE" }); toast(t("deleted")); forgetEmployees(); navigate("/app/employees"); }
      catch (x) { toast(errText(x), "err"); }
    };
  }

  root.innerHTML = loading();
  await load();
  return { refresh: () => { if (st.tab !== "shift" && st.tab !== "profile") load().catch(() => {}); } };
}
