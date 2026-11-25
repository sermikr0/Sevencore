// Panel shell: navbar, router, live updates.
import { S, t, esc, api, icon, LOGO, setLang, parts, errText, initials } from "./core.js";
import * as overview from "./views/overview.js";
import * as attendance from "./views/attendance.js";
import * as employees from "./views/employees.js";
import * as employee from "./views/employee.js";
import * as schedule from "./views/schedule.js";
import * as reports from "./views/reports.js";
import * as settings from "./views/settings.js";

const NAV = [
  { href: "/app", ico: "home", key: "nav_overview" },
  { href: "/app/attendance", ico: "list", key: "nav_attendance" },
  { href: "/app/employees", ico: "users", key: "nav_employees" },
  { href: "/app/schedule", ico: "calendar", key: "nav_schedule" },
  { href: "/app/reports", ico: "chart", key: "nav_reports" },
  { href: "/app/settings", ico: "gear", key: "nav_settings", admin: true },
];
const ROUTES = [
  [/^\/app\/?$/, overview], [/^\/app\/attendance\/?$/, attendance], [/^\/app\/employees\/?$/, employees],
  [/^\/app\/employees\/(\d+)\/?$/, employee], [/^\/app\/schedule\/?$/, schedule], [/^\/app\/reports\/?$/, reports],
  [/^\/app\/settings\/?$/, settings],
];
const LANGS = ["uz", "ru", "en"];
let current = null, live = false, refreshTimer = null, seq = 0;

function shell() {
  const me = S.me;
  const links = NAV.filter(n => !n.admin || me.kind === "admin")
    .map(n => `<a href="${n.href}" data-nav="${n.href}">${icon(n.ico)}<span>${esc(t(n.key))}</span></a>`).join("");
  document.getElementById("root").innerHTML = `
    <header class="nav" id="nav"><div class="nav-in">
      <button class="nav-btn burger" id="burger" aria-label="${esc(t("menu"))}">${icon("menu", 'width="18" height="18"')}</button>
      <a class="brand" href="/app">
        <span class="brand-mark">${LOGO}</span>
        <span><b>SEVENCORE</b><small>${esc(t("brand_sub"))}</small></span>
      </a>
      <nav class="links" id="links">${links}</nav>
      <div class="nav-right">
        <span class="live ${live ? "on" : ""}" id="live" title="${esc(t("live_hint"))}"><i></i><span>LIVE</span></span>
        <span class="clock" id="clock">--:--</span>
        <button class="nav-btn" id="lang">${icon("globe", 'width="15" height="15"')}${S.lang.toUpperCase()}</button>
        <div class="me">
          <button class="me-btn" id="me-btn" aria-haspopup="menu">
            <span class="me-av">${esc(initials(me.display_name))}</span>
            <span class="me-txt"><b>${esc(me.display_name)}</b><small>${esc(roleName(me))}</small></span>
          </button>
          <div class="menu" id="menu" hidden>
            <div class="who"><b>${esc(me.display_name)}</b><small>@${esc(me.username)} · ${esc(roleName(me))}</small></div>
            <button id="logout">${esc(t("logout"))}</button>
          </div>
        </div>
      </div>
    </div></header>
    <main class="main" id="view"></main>`;
  document.getElementById("lang").onclick = () => {
    setLang(LANGS[(LANGS.indexOf(S.lang) + 1) % LANGS.length]);
    shell(); route();
  };
  document.getElementById("burger").onclick = () => document.getElementById("nav").classList.toggle("open");
  const menu = document.getElementById("menu");
  document.getElementById("me-btn").onclick = e => { e.stopPropagation(); menu.hidden = !menu.hidden; };
  document.addEventListener("click", () => { menu.hidden = true; });
  document.getElementById("logout").onclick = async () => {
    try { await api("/auth/logout", { method: "POST" }); } catch (e) { /* ignore */ }
    location.replace("/");
  };
}

export function roleName(u) {
  return u.kind === "manager" ? `${t("role_manager")} · ${u.department}` : (u.role === "Super Admin" ? t("role_super") : t("role_admin"));
}

async function route() {
  const my = ++seq;
  const path = location.pathname;
  const nav = document.getElementById("nav");
  nav.classList.remove("open");
  document.querySelectorAll("[data-nav]").forEach(a => {
    const h = a.dataset.nav;
    a.classList.toggle("on", h === "/app" ? /^\/app\/?$/.test(path) : path.startsWith(h));
  });
  if (current && current.destroy) current.destroy();
  current = null;
  const view = document.getElementById("view");
  const hit = ROUTES.find(([re]) => re.test(path));
  if (!hit) { view.innerHTML = errorBox(t("not_found")); return; }
  const params = path.match(hit[0]).slice(1);
  try {
    const handle = await hit[1].render(view, params);
    if (my !== seq) { if (handle && handle.destroy) handle.destroy(); return; }
    current = handle || null;
    window.scrollTo(0, 0);
  } catch (e) {
    if (my === seq) view.innerHTML = errorBox(errText(e));
  }
}

function errorBox(text) {
  return `<div class="card err-box"><b>${esc(t("oops"))}</b><span class="muted">${esc(text)}</span><div style="margin-top:16px">
    <a class="btn dark" href="/app">${esc(t("nav_overview"))}</a></div></div>`;
}

export function navigate(href) {
  if (href === location.pathname + location.search) return;
  history.pushState({}, "", href);
  route();
}

function sse() {
  let es;
  const connect = () => {
    es = new EventSource("/api/panel/events");
    es.onopen = () => setLive(true);
    es.onerror = () => { setLive(false); };
    es.onmessage = () => {
      clearTimeout(refreshTimer);
      refreshTimer = setTimeout(() => { if (current && current.refresh) current.refresh(); }, 700);
    };
  };
  connect();
}
function setLive(on) {
  live = on;
  const el = document.getElementById("live");
  if (el) el.classList.toggle("on", on);
}

function tickClock() {
  const el = document.getElementById("clock");
  if (el) { const p = parts(Date.now()); el.textContent = `${p.hh}:${p.mm}:${p.ss}`; }
}

async function boot() {
  document.documentElement.lang = S.lang;
  try {
    const me = await api("/api/panel/me");
    Object.assign(S, { me: me.user, perms: me.perms, rules: me.rules, tz: me.tz, departments: me.departments });
  } catch (e) {
    document.getElementById("root").innerHTML = `<main class="main">${errorBox(errText(e))}</main>`;
    return;
  }
  shell();
  document.addEventListener("click", e => {
    const a = e.target.closest("a[href^='/app']");
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || a.target) return;
    e.preventDefault();
    navigate(a.getAttribute("href"));
  });
  window.addEventListener("popstate", route);
  await route();
  sse();
  tickClock();
  setInterval(tickClock, 1000);
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible" && current && current.refresh) current.refresh(); });
}

boot();
