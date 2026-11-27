// sevencore panel — shell (side rail, top bar, mobile tab bar), router, live updates.
import { h, mount } from "./dom.js";
import { t, setLang, getLang } from "./i18n/index.js";
import { app, call, connectLive, onLive } from "./store.js";
import { clock } from "./time.js";
import { icon, GLYPH } from "./ui/icons.js";
import { initials } from "./ui/kit.js";
import { openPalette } from "./ui/palette.js";
import { dialog, errorText } from "./ui/overlay.js";
import * as livePage from "./pages/live.js";
import * as journalPage from "./pages/journal.js";
import * as teamPage from "./pages/team.js";
import * as schedulePage from "./pages/schedule.js";
import * as insightsPage from "./pages/insights.js";
import * as settingsPage from "./pages/settings.js";

const NAV = [
  { grp: "g_watch", items: [{ href: "/app", ico: "pulse", key: "nav_live" }, { href: "/app/journal", ico: "journal", key: "nav_journal" }] },
  { grp: "g_people", items: [{ href: "/app/team", ico: "team", key: "nav_team" }, { href: "/app/schedule", ico: "grid", key: "nav_schedule" }] },
  { grp: "g_insight", items: [{ href: "/app/insights", ico: "chart", key: "nav_insights" }] },
  { grp: "g_admin", admin: true, items: [{ href: "/app/settings", ico: "cog", key: "nav_settings" }] },
];
const ROUTES = [
  [/^\/app\/?$/, livePage], [/^\/app\/journal\/?$/, journalPage], [/^\/app\/team(?:\/(\d+))?\/?$/, teamPage],
  [/^\/app\/schedule\/?$/, schedulePage], [/^\/app\/insights\/?$/, insightsPage], [/^\/app\/settings\/?$/, settingsPage],
];
const ALIASES = { "/app/attendance": "/app/journal", "/app/employees": "/app/team", "/app/reports": "/app/insights" };

let current = null, currentModule = null, liveTimer = null;
const el = {};

function isAdmin() { return app.user.kind === "admin"; }
function roleLabel(u) { return u.kind === "manager" ? `${t("r_manager")} · ${u.department}` : u.role === "Super Admin" ? t("r_super") : t("r_admin"); }

function shell() {
  let mini = false;
  try { mini = localStorage.getItem("sevencore.mini") === "1"; } catch (e) { /* ignore */ }
  const links = [];
  const rail = h("aside", { class: "rail" },
    h("a", { class: "mark", href: "/app", "data-link": "" }, h("span", { class: "glyph", svg: GLYPH }),
      h("span", {}, h("b", {}, "sevencore"), h("small", {}, t("brand")))),
    NAV.filter(g => !g.admin || isAdmin()).map(g => [h("div", { class: "grp" }, t(g.grp)), g.items.map(it => {
      const a = h("a", { class: "item", href: it.href, "data-link": "", "data-nav": it.href, title: t(it.key) }, icon(it.ico), h("span", {}, t(it.key)));
      links.push(a);
      return a;
    })]),
    h("div", { class: "rail-foot" },
      h("div", { class: "langs" }, ["uz", "ru", "en"].map(l => h("button", { class: l === getLang() ? "on" : "", onclick: () => switchLang(l) }, l.toUpperCase()))),
      h("div", { class: "me" },
        h("span", { class: "av sm ring" }, initials(app.user.display_name)),
        h("span", { class: "mt" }, h("b", {}, app.user.display_name), h("small", {}, roleLabel(app.user))),
        h("button", { class: "ib out", title: t("logout"), onclick: logout }, icon("exit", 16)))));
  el.pulse = h("span", { class: "pulse" }, h("i"), "LIVE");
  el.clock = h("span", { class: "clock n" }, clock());
  el.kicker = h("small"); el.title = h("h1");
  const bar = h("header", { class: "bar" },
    h("button", { class: "ib", title: t("collapse"), onclick: () => {
      const on = el.shell.classList.toggle("mini");
      try { localStorage.setItem("sevencore.mini", on ? "1" : "0"); } catch (e) { /* ignore */ }
    } }, icon("side", 16)),
    h("div", { class: "ttl" }, el.kicker, el.title), h("div", { class: "sp" }),
    h("button", { class: "find", onclick: palette }, icon("search", 16), h("span", {}, t("find")), h("kbd", {}, "Ctrl K")),
    el.pulse, el.clock,
    h("button", { class: "ib mob-me", title: app.user.display_name, onclick: meSheet, style: { display: "none" } }, icon("user", 16)));
  el.page = h("main", { class: "page" });
  const tabs = h("nav", { class: "tabbar" }, [["/app", "pulse", "nav_live"], ["/app/journal", "journal", "nav_journal"], ["/app/team", "team", "nav_team"],
    ["/app/schedule", "grid", "nav_schedule"], ["/app/insights", "chart", "nav_insights"]]
    .map(([href, ico, key]) => { const a = h("a", { href, "data-link": "", "data-nav": href }, icon(ico, 20), t(key + "_s")); links.push(a); return a; }));
  el.links = links;
  el.shell = h("div", { class: ["shell", mini && "mini"] }, rail, h("div", { style: { minWidth: 0 } }, bar, el.page), tabs);
  mount(document.getElementById("root"), el.shell);
  const mq = window.matchMedia("(max-width: 720px)");
  const sync = () => { bar.querySelector(".mob-me").style.display = mq.matches ? "grid" : "none"; };
  mq.addEventListener("change", sync); sync();
  setPulse(false);
}

function meSheet() {
  dialog({ title: app.user.display_name, body: [
    h("div", { class: "t3" }, `@${app.user.username} · ${roleLabel(app.user)}`),
    h("div", { class: "langs" }, ["uz", "ru", "en"].map(l => h("button", { class: l === getLang() ? "on" : "", onclick: () => { document.querySelector(".dlg-wrap").remove(); switchLang(l); } }, l.toUpperCase()))),
    isAdmin() ? h("a", { class: "btn", href: "/app/settings", "data-link": "", onclick: () => document.querySelector(".dlg-wrap").remove() }, icon("cog", 16), t("nav_settings")) : null,
    h("button", { class: "btn warn", onclick: logout }, icon("exit", 16), t("logout")),
  ] });
}

async function logout() {
  try { await call("/auth/logout", { method: "POST" }); } catch (e) { /* ignore */ }
  location.replace("/");
}

function switchLang(l) { setLang(l); shell(); route(true); }

function palette() {
  const pages = NAV.filter(g => !g.admin || isAdmin()).flatMap(g => g.items).map(it => ({ href: it.href, label: t(it.key), icon: it.ico }));
  openPalette(go, pages);
}

function setPulse(on) { if (el.pulse) el.pulse.classList.toggle("on", on); }

export function go(href) {
  if (href === location.pathname + location.search) return;
  history.pushState({}, "", href);
  route();
}

function setTitle(kicker, title) { el.kicker.textContent = kicker || ""; el.title.textContent = title || ""; document.title = `${title} · sevencore`; }

async function route(force = false) {
  let path = location.pathname.replace(/\/+$/, "") || "/app";
  if (ALIASES[path]) { history.replaceState({}, "", ALIASES[path]); path = ALIASES[path]; }
  const hit = ROUTES.find(([re]) => re.test(path));
  el.links.forEach(a => {
    const nav = a.dataset.nav;
    a.classList.toggle("on", nav === "/app" ? path === "/app" : path.startsWith(nav));
  });
  if (!hit) { mount(el.page, errorPanel(t("e_not_found"))); return; }
  const params = path.match(hit[0]).slice(1);
  if (!force && current && currentModule === hit[1] && current.update) { current.update(params); return; }
  if (current && current.dispose) current.dispose();
  current = null; currentModule = hit[1];
  el.page.replaceChildren();
  const ctx = { root: el.page, params, title: setTitle, go };
  try {
    current = (await hit[1].page(ctx)) || {};
    window.scrollTo(0, 0);
  } catch (e) {
    mount(el.page, errorPanel(errorText(e)));
  }
}

function errorPanel(text) {
  return h("div", { class: "card pad", style: { textAlign: "center", padding: "50px 20px" } },
    h("div", { class: "it", style: { fontSize: "34px" } }, t("oops")), h("p", { class: "t2" }, text),
    h("a", { class: "btn", href: "/app", "data-link": "" }, t("nav_live")));
}

async function boot() {
  try {
    const me = await call("/api/panel/me");
    Object.assign(app, { user: me.user, perms: me.perms, rules: me.rules, tz: me.tz, departments: me.departments, groups: me.groups || [] });
  } catch (e) {
    mount(document.getElementById("root"), h("div", { class: "page" }, errorPanel(errorText(e))));
    return;
  }
  shell();
  document.addEventListener("click", e => {
    const a = e.target.closest("a[data-link]");
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    go(a.getAttribute("href"));
  });
  document.addEventListener("keydown", e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); palette(); }
  });
  window.addEventListener("popstate", () => route());
  await route();
  connectLive(setPulse);
  onLive(() => {
    clearTimeout(liveTimer);
    liveTimer = setTimeout(() => { if (current && current.refresh) current.refresh(); }, 650);
  });
  setInterval(() => { el.clock.textContent = clock(); }, 1000);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible" && current && current.refresh) current.refresh();
  });
}

boot();
