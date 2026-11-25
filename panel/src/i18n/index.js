import uz from "./uz.js";
import ru from "./ru.js";
import en from "./en.js";

export const LANGS = { uz, ru, en };
let lang = "uz";
try { const saved = localStorage.getItem("sevencore.lang"); if (LANGS[saved]) lang = saved; } catch (e) { /* private mode */ }
document.documentElement.lang = lang;

export function getLang() { return lang; }
export function setLang(next) {
  if (!LANGS[next]) return;
  lang = next;
  document.documentElement.lang = next;
  try { localStorage.setItem("sevencore.lang", next); } catch (e) { /* ignore */ }
}
export function t(key, vars) {
  let s = LANGS[lang][key] ?? LANGS.uz[key] ?? key;
  if (vars) for (const k in vars) s = s.split(`{${k}}`).join(vars[k]);
  return s;
}
