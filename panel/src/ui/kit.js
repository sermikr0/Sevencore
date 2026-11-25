// Small building blocks shared by the pages.
import { h } from "../dom.js";
import { t } from "../i18n/index.js";
import { icon } from "./icons.js";
import { app } from "../store.js";

export function initials(name) {
  return String(name || "?").trim().split(/\s+/).slice(0, 2).map(w => w[0] || "").join("").toUpperCase() || "?";
}

export function avatar(person, cls = "") {
  const img = h("img", { alt: "", loading: "lazy", src: `/api/panel/employees/${encodeURIComponent(person.telegram_id)}/photo` });
  img.addEventListener("error", () => img.remove());
  return h("span", { class: ["av", cls] }, initials(person.name), img);
}

export function who(person, { link = true, sub } = {}) {
  const inner = [avatar(person, person._ring ? "ring" : ""),
    h("span", { class: "nm" }, h("b", {}, person.name), h("small", {}, sub ?? (person.username ? "@" + person.username : person.department || "")))];
  return link ? h("a", { class: "who", href: `/app/team/${person.telegram_id}`, "data-link": "" }, inner) : h("span", { class: "who" }, inner);
}

export function status(code, extra) {
  return h("span", { class: ["st", code] }, t("s_" + code) + (extra ? ` · ${extra}` : ""));
}

export function action(kind, auto) {
  if (auto) return h("span", { class: "act auto" }, icon("bolt", 12), t("auto"));
  return kind === "check_in" ? h("span", { class: "act in" }, icon("in", 12), t("in")) : h("span", { class: "act out" }, icon("out", 12), t("out"));
}

export function weekDots(days) {
  const keys = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  return h("span", { class: "wk", title: (days || []).map(d => t("dow").split(",")[keys.indexOf(d)]).join(" ") },
    keys.map(k => h("i", { class: days && days.includes(k) ? "on" : "" })));
}

export function empty(text, ico = "clock") {
  return h("div", { class: "empty" }, h("div", { class: "ring" }, icon(ico, 22)), text);
}

export function loader() { return h("div", { class: "load" }, h("i")); }

export function photo(markId, cls = "ph", onOpen) {
  const img = h("img", { class: cls, alt: "", loading: "lazy", src: `/api/panel/marks/${encodeURIComponent(markId)}/photo`, onclick: onOpen });
  img.addEventListener("error", () => img.replaceWith(h("span", { class: cls, style: { display: "grid", placeItems: "center", color: "var(--tx3)" } }, icon("cam", 16))));
  return img;
}

export function deptSelect(value, onChange) {
  return h("select", { class: "sel", onchange: e => onChange(e.target.value) },
    h("option", { value: "" }, t("all_depts")),
    app.departments.map(d => h("option", { value: d, selected: d === value }, d)));
}

export function searchBox(value, onInput) {
  let timer;
  return h("label", { class: "srch" }, icon("search", 16),
    h("input", { class: "in", value: value || "", placeholder: t("find_person"),
      oninput: e => { clearTimeout(timer); timer = setTimeout(() => onInput(e.target.value.trim()), 280); } }));
}

export function pills(options, value, onPick) {
  const wrap = h("div", { class: "pills" });
  for (const [k, label, count] of options) {
    wrap.append(h("button", { class: k === value ? "on" : "", onclick: () => onPick(k) }, label, count != null ? h("em", {}, count) : null));
  }
  return wrap;
}
