// Shared helpers for the Sevencore panel: state, i18n, API, formatting, UI primitives.
import { DICT } from "./i18n.js";

export const S = { lang: "uz", me: null, perms: {}, rules: {}, tz: "Asia/Tashkent", departments: [] };
try { const l = localStorage.getItem("sc_panel_lang"); if (l && DICT[l]) S.lang = l; } catch (e) { /* storage off */ }

export function setLang(lang) {
  S.lang = lang;
  try { localStorage.setItem("sc_panel_lang", lang); } catch (e) { /* ignore */ }
  document.documentElement.lang = lang;
}

export function t(key, vars) {
  let s = (DICT[S.lang] && DICT[S.lang][key]) ?? DICT.uz[key] ?? key;
  if (vars) for (const k in vars) s = s.split("{" + k + "}").join(vars[k]);
  return s;
}

export function esc(v) {
  return String(v ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// ------------------------------------------------------------------ API
export class ApiErr extends Error {
  constructor(code, status, extra) { super(code); this.code = code; this.status = status; this.extra = extra || {}; }
}

export async function api(path, opts = {}) {
  const init = { method: opts.method || "GET", headers: { "X-Requested-With": "sevencore" }, credentials: "same-origin" };
  if (opts.body !== undefined) { init.headers["Content-Type"] = "application/json"; init.body = JSON.stringify(opts.body); }
  let res;
  try { res = await fetch(path, init); } catch (e) { throw new ApiErr("network", 0); }
  if (res.status === 401) { location.replace("/"); throw new ApiErr("signed_out", 401); }
  let data = {};
  try { data = await res.json(); } catch (e) { /* empty */ }
  if (!res.ok || data.ok === false) throw new ApiErr(data.error || data.message || "server_error", res.status, data);
  return data;
}

export function errText(e) {
  if (!e) return t("e_server_error");
  const key = "e_" + (e.code || e.message || "server_error");
  const txt = t(key);
  return txt === key ? (e.code || t("e_server_error")) : txt;
}

// ------------------------------------------------------------------ time
const fmtCache = {};
function fmt(opts) {
  const k = JSON.stringify(opts) + S.lang;
  if (!fmtCache[k]) fmtCache[k] = new Intl.DateTimeFormat("en-GB", { timeZone: S.tz, ...opts });
  return fmtCache[k];
}
export function parts(ms) {
  const p = {};
  for (const x of fmt({ year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })
    .formatToParts(new Date(ms))) p[x.type] = x.value;
  return { y: p.year, m: p.month, d: p.day, hh: p.hour === "24" ? "00" : p.hour, mm: p.minute, ss: p.second };
}
export function hm(iso) { if (!iso) return "—"; const p = parts(Date.parse(iso)); return p.hh + ":" + p.mm; }
export function todayISO() { const p = parts(Date.now()); return `${p.y}-${p.m}-${p.d}`; }
export function monthISO() { return todayISO().slice(0, 7); }
export function localInput(ms) { const p = parts(ms); return `${p.y}-${p.m}-${p.d}T${p.hh}:${p.mm}`; }
export function addDays(dateStr, n) {
  const d = new Date(dateStr + "T12:00:00Z"); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10);
}
export function mondayOf(dateStr) {
  const d = new Date(dateStr + "T12:00:00Z"); const wd = (d.getUTCDay() + 6) % 7; return addDays(dateStr, -wd);
}
export function weekday(dateStr) { return (new Date(dateStr + "T12:00:00Z").getUTCDay() + 6) % 7; }
export function dayShort(dateStr) { return t("dow").split(",")[weekday(dateStr)]; }
export function dmy(dateStr) { const [y, m, d] = dateStr.split("-"); return `${d}.${m}.${y}`; }
export function dm(dateStr) { const [, m, d] = dateStr.split("-"); return `${d}.${m}`; }
export function dayLong(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return `${d} ${t("months").split(",")[m - 1]}, ${t("dow_long").split(",")[weekday(dateStr)]}`;
}
export function monthLabel(ym) { const [y, m] = ym.split("-").map(Number); return `${t("months_n").split(",")[m - 1]} ${y}`; }
export function dur(min) {
  if (min == null) return "—";
  min = Math.max(0, Math.round(min));
  return `${Math.floor(min / 60)}:${String(min % 60).padStart(2, "0")}`;
}
export function durWords(min) {
  min = Math.max(0, Math.round(min || 0));
  const h = Math.floor(min / 60), m = min % 60;
  if (h && m) return t("hm", { h, m });
  return h ? t("h", { h }) : t("m", { m });
}
export function hours(min) { return (Math.round((min || 0) / 6) / 10).toFixed(1); }
export function pct(x) { return x == null ? "—" : Math.round(x * 100) + "%"; }

// ------------------------------------------------------------------ icons
const P = {
  home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
  list: '<path d="M8 6h13M8 12h13M8 18h13"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.6 3.3-6 6.5-6s5.9 2.4 6.5 6"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.4c2 .8 3.2 2.8 3.5 5.6"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  chart: '<path d="M4 20V4"/><path d="M4 20h16"/><rect x="7" y="11" width="3" height="6" rx="1"/><rect x="12" y="7" width="3" height="10" rx="1"/><rect x="17" y="13" width="3" height="4" rx="1"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  edit: '<path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4z"/><path d="m13.5 6.5 4 4"/>',
  trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
  download: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
  left: '<path d="m15 18-6-6 6-6"/>',
  right: '<path d="m9 18 6-6-6-6"/>',
  logout: '<path d="M15 17l5-5-5-5M20 12H9M11 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  face: '<path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2"/><path d="M9 10v1M15 10v1M12 10v3h-1M9.5 16c1.4 1 3.6 1 5 0"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  in: '<path d="M10 17l5-5-5-5M15 12H3M15 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4"/>',
  out: '<path d="M14 17l5-5-5-5M19 12H8M9 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4"/>',
  eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  bolt: '<path d="M13 3 4 14h7l-1 7 9-11h-7l1-7z"/>',
  key: '<circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M17 6l3 3M14 9l2 2"/>',
  shield: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3z"/>',
  bot: '<rect x="4" y="8" width="16" height="11" rx="3"/><path d="M12 4v4M9 13v1M15 13v1"/>',
  copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
  refresh: '<path d="M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7"/>',
  check: '<path d="m5 12 5 5L20 7"/>',
  cam: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
};
export function icon(name, extra = "") {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ${extra}>${P[name] || ""}</svg>`;
}
export const LOGO = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6h12l-7 13"/><path d="M9 12.5h6"/></svg>';

// ------------------------------------------------------------------ small components
export function initials(name) {
  return String(name || "?").split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase() || "?";
}
export function avatar(tg, name, cls = "") {
  return `<span class="av ${cls}">${esc(initials(name))}<img data-av alt="" loading="lazy" src="/api/panel/employees/${encodeURIComponent(tg)}/photo"></span>`;
}
export function person(row, link = true) {
  const inner = `${avatar(row.telegram_id, row.name)}<span style="min-width:0"><b>${esc(row.name)}</b><small>${row.username ? "@" + esc(row.username) : esc(row.department || "")}</small></span>`;
  return link ? `<a class="person" href="/app/employees/${row.telegram_id}">${inner}</a>` : `<span class="person">${inner}</span>`;
}
export function statusChip(status, extra) {
  return `<span class="chip ${esc(status)}">${esc(t("st_" + status))}${extra ? " " + esc(extra) : ""}</span>`;
}
export function actionChip(action, auto) {
  if (auto) return `<span class="chip auto">${icon("bolt")}${esc(t("auto_out"))}</span>`;
  return action === "check_in" ? `<span class="chip in">${icon("in")}${esc(t("check_in"))}</span>`
    : `<span class="chip out">${icon("out")}${esc(t("check_out"))}</span>`;
}
export function daysDots(days) {
  const names = t("dow_1").split(",");
  const keys = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  return `<span class="days">${keys.map((k, i) => `<i class="${days && days.includes(k) ? "on" : ""}">${names[i]}</i>`).join("")}</span>`;
}
export function emptyBox(text, ico = "list") { return `<div class="empty">${icon(ico)}${esc(text)}</div>`; }
export function loading() { return '<div class="loading"><div class="spin"></div></div>'; }
export function deptOptions(selected, withAll = true) {
  return (withAll ? `<option value="">${esc(t("all_departments"))}</option>` : "") +
    S.departments.map(d => `<option value="${esc(d)}"${d === selected ? " selected" : ""}>${esc(d)}</option>`).join("");
}

// ------------------------------------------------------------------ overlays
let toastBox;
export function toast(msg, kind = "") {
  if (!toastBox) { toastBox = document.createElement("div"); toastBox.className = "toasts"; document.body.appendChild(toastBox); }
  const el = document.createElement("div");
  el.className = "toast " + kind;
  el.textContent = msg;
  toastBox.appendChild(el);
  setTimeout(() => el.remove(), 3600);
}

export function modal({ title, body, actions = [], wide = false, onOpen }) {
  const wrap = document.createElement("div");
  wrap.className = "overlay";
  wrap.innerHTML = `<div class="modal ${wide ? "wide" : ""}" role="dialog" aria-modal="true">
    <div class="modal-h"><h3>${esc(title)}</h3><button class="x" data-x aria-label="${esc(t("close"))}">${icon("x")}</button></div>
    <div class="modal-b">${body}</div>
    ${actions.length ? `<div class="modal-f">${actions.map((a, i) => `<button class="btn ${a.kind || ""} ${a.left ? "left" : ""}" data-a="${i}">${esc(a.label)}</button>`).join("")}</div>` : ""}
  </div>`;
  const close = () => { wrap.remove(); document.removeEventListener("keydown", onKey); };
  const onKey = e => { if (e.key === "Escape") close(); };
  document.addEventListener("keydown", onKey);
  wrap.addEventListener("click", async e => {
    if (e.target === wrap || e.target.closest("[data-x]")) return close();
    const b = e.target.closest("[data-a]");
    if (!b) return;
    const a = actions[+b.dataset.a];
    if (!a.onClick) return close();
    b.disabled = true;
    try { const keep = await a.onClick(wrap.querySelector(".modal"), close); if (keep !== false) close(); }
    catch (err) { toast(errText(err), "err"); }
    finally { b.disabled = false; }
  });
  document.body.appendChild(wrap);
  const first = wrap.querySelector("input,select,textarea");
  if (first) setTimeout(() => first.focus(), 30);
  if (onOpen) onOpen(wrap.querySelector(".modal"), close);
  return { el: wrap.querySelector(".modal"), close };
}

export function confirmBox(text, okLabel, danger = true) {
  return new Promise(resolve => {
    let done = false;
    const m = modal({
      title: t("confirm_title"), body: `<p style="margin:0">${esc(text)}</p>`,
      actions: [{ label: t("cancel"), onClick: () => { done = true; resolve(false); } },
        { label: okLabel || t("yes"), kind: danger ? "primary" : "dark", onClick: () => { done = true; resolve(true); } }],
    });
    const obs = new MutationObserver(() => { if (!document.body.contains(m.el)) { obs.disconnect(); if (!done) resolve(false); } });
    obs.observe(document.body, { childList: true });
  });
}

export function photoView(markId, caption) {
  modal({ title: caption || t("photo"), body: `<img class="photo-view" alt="" src="/api/panel/marks/${encodeURIComponent(markId)}/photo">` });
}

// image fallback: CSP forbids inline onerror, so one capturing listener hides broken avatars/thumbs
document.addEventListener("error", e => {
  const el = e.target;
  if (el && el.tagName === "IMG" && (el.hasAttribute("data-av") || el.classList.contains("thumb"))) el.remove();
}, true);

export function download(url) {
  const a = document.createElement("a");
  a.href = url; a.rel = "noopener";
  document.body.appendChild(a); a.click(); a.remove();
}

export function qs(name, fallback = "") { return new URLSearchParams(location.search).get(name) || fallback; }
export function setQs(params) {
  const u = new URL(location.href);
  for (const k in params) { if (params[k]) u.searchParams.set(k, params[k]); else u.searchParams.delete(k); }
  history.replaceState(history.state, "", u.pathname + u.search);
}
