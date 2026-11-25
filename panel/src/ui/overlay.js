// Dialogs, confirmation, photo lightbox, toasts.
import { h } from "../dom.js";
import { t } from "../i18n/index.js";
import { icon } from "./icons.js";

export function errorText(e) {
  const code = e && (e.code || e.message) || "server_error";
  const key = "e_" + code;
  const txt = t(key);
  return txt === key ? code : txt;
}

let box;
export function toast(text, bad = false) {
  if (!box) { box = h("div", { class: "toasts" }); document.body.append(box); }
  const el = h("div", { class: ["toast", bad && "err"] }, text);
  box.append(el);
  setTimeout(() => el.remove(), 3800);
}

// dialog({ title, body: Node[], actions: [{ label, kind, left, run(close) }] })
export function dialog({ title, body, actions = [], className = "" }) {
  const close = () => { wrap.remove(); document.removeEventListener("keydown", esc); };
  const esc = e => { if (e.key === "Escape") close(); };
  const foot = actions.length ? h("footer", {}, actions.map(a => {
    const b = h("button", { class: ["btn", a.kind, a.left && "left"], onclick: async () => {
      if (!a.run) return close();
      b.disabled = true;
      try { if ((await a.run(close)) !== false) close(); } catch (err) { toast(errorText(err), true); } finally { b.disabled = false; }
    } }, a.label);
    return b;
  })) : null;
  const card = h("div", { class: ["dlg", className], role: "dialog", "aria-modal": "true" },
    h("header", {}, h("h3", {}, title), h("button", { class: "ib", "aria-label": t("close"), onclick: () => close() }, icon("close", 16))),
    h("div", { class: "body" }, body), foot);
  const wrap = h("div", { class: "dlg-wrap", onclick: e => { if (e.target === wrap) close(); } }, card);
  document.addEventListener("keydown", esc);
  document.body.append(wrap);
  const first = card.querySelector("input, select, textarea");
  if (first) setTimeout(() => first.focus(), 40);
  return { close, card };
}

export function confirm(text, okLabel) {
  return new Promise(resolve => {
    let answered = false;
    const d = dialog({ title: t("sure"), body: [h("p", { style: { margin: 0, color: "var(--tx2)" } }, text)],
      actions: [{ label: t("cancel"), run: () => { answered = true; resolve(false); } },
        { label: okLabel || t("yes"), kind: "go", run: () => { answered = true; resolve(true); } }] });
    const watch = new MutationObserver(() => {
      if (!document.body.contains(d.card)) { watch.disconnect(); if (!answered) resolve(false); }
    });
    watch.observe(document.body, { childList: true });
  });
}

export function lightbox(markId, caption) {
  dialog({ title: caption || t("photo"), className: "lightbox",
    body: [h("img", { alt: "", src: `/api/panel/marks/${encodeURIComponent(markId)}/photo` })] });
}

export function download(url) {
  const a = h("a", { href: url, rel: "noopener" });
  document.body.append(a); a.click(); a.remove();
}
