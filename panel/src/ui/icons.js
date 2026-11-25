// Line icons, 1.6 stroke, drawn for this panel.
import { h } from "../dom.js";

const D = {
  pulse: "M3 12h4l2.5-6 4 12 2.5-6H21",
  journal: "M6 3h11a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6zM6 3v18M10 8h5M10 12h5M10 16h3",
  team: "M16 19v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M9.5 10a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM21 19v-1a4 4 0 0 0-3-3.9M15.5 3.2a3.5 3.5 0 0 1 0 6.6",
  grid: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
  chart: "M4 19V9M10 19V5M16 19v-7M22 19H2",
  cog: "M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM19.4 13.5l1.6 1.2-2 3.4-1.9-.7a7.6 7.6 0 0 1-2 1.2L14.8 21h-4l-.3-2.4a7.6 7.6 0 0 1-2-1.2l-1.9.7-2-3.4 1.6-1.2a7.7 7.7 0 0 1 0-2.4L4.6 9.9l2-3.4 1.9.7a7.6 7.6 0 0 1 2-1.2L10.8 3h4l.3 2.4a7.6 7.6 0 0 1 2 1.2l1.9-.7 2 3.4-1.6 1.2a7.7 7.7 0 0 1 0 2.4z",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4",
  plus: "M12 5v14M5 12h14",
  close: "M6 6l12 12M18 6 6 18",
  pen: "M15 5l4 4M4 20l1-4L16 5l4 4L9 19z",
  bin: "M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13",
  down: "M12 3v12M7 10l5 5 5-5M4 21h16",
  prev: "M15 6l-6 6 6 6",
  next: "M9 6l6 6-6 6",
  exit: "M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4M10 17l-5-5 5-5M5 12h11",
  side: "M4 4h16v16H4zM9 4v16",
  scan: "M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M9 10h.01M15 10h.01M9.5 15a3.5 3.5 0 0 0 5 0",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2",
  pin: "M12 21s7-6 7-11.5A7 7 0 0 0 5 9.5C5 15 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  bolt: "M13 2 4 14h7l-1 8 9-12h-7z",
  key: "M15 9a4 4 0 1 1-3.5 2L4 18.5V21h3v-2h2v-2h2l1.5-1.5",
  shield: "M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6z",
  send: "M21 3 10 14M21 3l-7 18-4-7-7-4z",
  copy: "M9 9h11v11H9zM5 15H4V4h11v1",
  check: "M5 12.5l4.5 4.5L19 7.5",
  loop: "M4 12a8 8 0 0 1 14-5.3L20 9M20 4v5h-5M20 12a8 8 0 0 1-14 5.3L4 15M4 20v-5h5",
  out: "M15 12H4M9 7l-5 5 5 5M15 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4",
  in: "M10 12h11M16 7l5 5-5 5M9 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h4",
  cam: "M4 8h3l2-3h6l2 3h3v12H4zM12 17a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z",
  sun: "M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1",
};

export function icon(name, size = 18) {
  return h("svg:svg", { class: "i", viewBox: "0 0 24 24", width: size, height: size, fill: "none", stroke: "currentColor",
    "stroke-width": "1.6", "stroke-linecap": "round", "stroke-linejoin": "round", "aria-hidden": "true" },
    h("svg:path", { d: D[name] || "" }));
}

export const GLYPH = '<svg viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" stroke-width="2.4" stroke-linecap="round"><path d="M17 7.5C15.8 6 14 5.2 12 5.2c-3 0-5 1.6-5 3.6 0 4.6 10 2.5 10 7 0 2-2.2 3.6-5.2 3.6-2 0-3.9-.8-5-2.3"/></svg>';
