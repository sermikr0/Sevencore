// Dates and times in the company time zone (Asia/Tashkent), whatever the viewer's own zone is.
import { app } from "./store.js";
import { t } from "./i18n/index.js";

const fmts = {};
function partsOf(ms) {
  const f = fmts[app.tz] || (fmts[app.tz] = new Intl.DateTimeFormat("en-GB", { timeZone: app.tz, year: "numeric", month: "2-digit",
    day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }));
  const o = {};
  for (const p of f.formatToParts(new Date(ms))) o[p.type] = p.value;
  return { y: o.year, mo: o.month, d: o.day, h: o.hour === "24" ? "00" : o.hour, mi: o.minute, s: o.second };
}
export const now = () => Date.now();
export function clock(ms = now()) { const p = partsOf(ms); return `${p.h}:${p.mi}:${p.s}`; }
export function hhmm(iso) { if (!iso) return "—"; const p = partsOf(Date.parse(iso)); return `${p.h}:${p.mi}`; }
export function dayOf(iso) { const p = partsOf(Date.parse(iso)); return `${p.y}-${p.mo}-${p.d}`; }
export function today() { const p = partsOf(now()); return `${p.y}-${p.mo}-${p.d}`; }
export function thisMonth() { return today().slice(0, 7); }
export function inputValue(ms = now()) { const p = partsOf(ms); return `${p.y}-${p.mo}-${p.d}T${p.h}:${p.mi}`; }
export function minutesOfDay(iso) { const p = partsOf(Date.parse(iso)); return +p.h * 60 + +p.mi; }
export function shift(dateStr, days) { const d = new Date(dateStr + "T12:00:00Z"); d.setUTCDate(d.getUTCDate() + days); return d.toISOString().slice(0, 10); }
export function weekday(dateStr) { return (new Date(dateStr + "T12:00:00Z").getUTCDay() + 6) % 7; }
export function monday(dateStr) { return shift(dateStr, -weekday(dateStr)); }
export function dd(dateStr) { return dateStr.slice(8, 10) + "." + dateStr.slice(5, 7); }
export function dmy(dateStr) { return `${dateStr.slice(8, 10)}.${dateStr.slice(5, 7)}.${dateStr.slice(0, 4)}`; }
export function dow(dateStr) { return t("dow").split(",")[weekday(dateStr)]; }
export function longDay(dateStr) {
  const m = +dateStr.slice(5, 7);
  return `${+dateStr.slice(8, 10)} ${t("months_of").split(",")[m - 1]}`;
}
export function monthName(ym) { const [y, m] = ym.split("-").map(Number); return `${t("months").split(",")[m - 1]} ${y}`; }
export function addMonth(ym, n) {
  let [y, m] = ym.split("-").map(Number); m += n;
  while (m < 1) { m += 12; y--; } while (m > 12) { m -= 12; y++; }
  return `${y}-${String(m).padStart(2, "0")}`;
}
export function hm(min) {
  if (min == null) return "—";
  min = Math.max(0, Math.round(min));
  return `${Math.floor(min / 60)}:${String(min % 60).padStart(2, "0")}`;
}
export function hrs(min) { return ((min || 0) / 60).toFixed(1); }
export function words(min) {
  min = Math.max(0, Math.round(min || 0));
  const a = Math.floor(min / 60), b = min % 60;
  return a && b ? t("u_hm", { h: a, m: b }) : a ? t("u_h", { h: a }) : t("u_m", { m: b });
}
export function pct(x) { return x == null ? "—" : `${Math.round(x * 100)}%`; }
export function relDay(dateStr) {
  const td = today();
  if (dateStr === td) return t("today");
  if (dateStr === shift(td, -1)) return t("yesterday");
  return `${longDay(dateStr)}, ${t("dow_long").split(",")[weekday(dateStr)]}`;
}
export function greeting() {
  const hr = +clock().slice(0, 2);
  return t(hr < 5 ? "g_night" : hr < 12 ? "g_morning" : hr < 18 ? "g_day" : "g_evening");
}
