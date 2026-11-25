// Ctrl/Cmd + K: jump to any page or employee.
import { h } from "../dom.js";
import { t } from "../i18n/index.js";
import { call } from "../store.js";
import { icon } from "./icons.js";
import { avatar } from "./kit.js";

let people = null;

export async function openPalette(go, pages) {
  if (document.querySelector(".pal-wrap")) return;
  let items = [], sel = 0;
  const list = h("ul");
  const input = h("input", { placeholder: t("pal_ph"), oninput: () => render(), onkeydown: key });
  const wrap = h("div", { class: "pal-wrap", onclick: e => { if (e.target === wrap) close(); } }, h("div", { class: "pal" }, input, list));
  function close() { wrap.remove(); }
  function key(e) {
    if (e.key === "Escape") close();
    else if (e.key === "ArrowDown") { sel = Math.min(items.length - 1, sel + 1); paint(); e.preventDefault(); }
    else if (e.key === "ArrowUp") { sel = Math.max(0, sel - 1); paint(); e.preventDefault(); }
    else if (e.key === "Enter" && items[sel]) { close(); go(items[sel].href); }
  }
  function render() {
    const qv = input.value.trim().toLowerCase();
    const pg = pages.filter(p => !qv || p.label.toLowerCase().includes(qv)).map(p => ({ ...p, group: "pages" }));
    const pp = (people || []).filter(p => !qv || p.name.toLowerCase().includes(qv) || (p.username || "").toLowerCase().includes(qv)
      || String(p.telegram_id).includes(qv)).slice(0, 8).map(p => ({ href: `/app/team/${p.telegram_id}`, label: p.name, person: p, group: "people",
      k: p.department }));
    items = [...pp, ...pg];
    sel = 0;
    paint();
  }
  function paint() {
    list.replaceChildren();
    let last = "";
    items.forEach((it, i) => {
      if (it.group !== last) { list.append(h("div", { class: "grp2" }, t("pal_" + it.group))); last = it.group; }
      list.append(h("li", { class: i === sel ? "on" : "", onmouseenter: () => { sel = i; paint(); }, onclick: () => { close(); go(it.href); } },
        it.person ? avatar(it.person, "sm") : icon(it.icon), it.label, it.k ? h("span", { class: "k" }, it.k) : null));
    });
    if (!items.length) list.append(h("div", { class: "empty" }, t("nothing")));
  }
  document.body.append(wrap);
  input.focus();
  render();
  if (!people) {
    try { people = (await call("/api/panel/employees")).rows; render(); } catch (e) { people = []; }
  }
}

export function forgetPeople() { people = null; }
