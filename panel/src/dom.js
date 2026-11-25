// Tiny hyperscript: real DOM nodes, no HTML strings, so user data is never parsed as markup.
const SVG = "http://www.w3.org/2000/svg";

export function h(tag, props, ...kids) {
  const svg = tag.startsWith("svg:");
  const el = svg ? document.createElementNS(SVG, tag.slice(4)) : document.createElement(tag);
  for (const key in props || {}) {
    const v = props[key];
    if (v == null || v === false) continue;
    if (key === "class") el.setAttribute("class", Array.isArray(v) ? v.filter(Boolean).join(" ") : v);
    else if (key === "style" && typeof v === "object") Object.assign(el.style, v);
    else if (key.startsWith("on") && typeof v === "function") el.addEventListener(key.slice(2).toLowerCase(), v);
    else if (key === "ref") v(el);
    else if (key === "svg") el.innerHTML = v;                 // trusted, static icon markup only
    else if (!svg && key in el && key !== "list") el[key] = v;
    else el.setAttribute(key, v === true ? "" : v);
  }
  add(el, kids);
  return el;
}

export function add(el, kids) {
  for (const k of kids.flat(Infinity)) {
    if (k == null || k === false || k === true) continue;
    el.append(k instanceof Node ? k : document.createTextNode(String(k)));
  }
  return el;
}

export function mount(root, ...kids) {
  root.replaceChildren();
  return add(root, kids);
}

export const q = (sel, root = document) => root.querySelector(sel);
export const qa = (sel, root = document) => [...root.querySelectorAll(sel)];
