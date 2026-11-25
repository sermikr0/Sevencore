// SVG charts: ring gauge, donut, stacked day bars, sparkline.
import { h } from "../dom.js";

function arc(cx, cy, r, from, to) {
  const a0 = from * 2 * Math.PI, a1 = to * 2 * Math.PI;
  const large = to - from > .5 ? 1 : 0;
  return `M ${cx + r * Math.cos(a0)} ${cy + r * Math.sin(a0)} A ${r} ${r} 0 ${large} 1 ${cx + r * Math.cos(a1)} ${cy + r * Math.sin(a1)}`;
}

// segments: [{ value, color, dash }] drawn around a ring; gap between segments.
export function ring(segments, { size = 210, width = 16, track = "var(--s3)", gap = .012 } = {}) {
  const c = size / 2, r = c - width / 2 - 2;
  const total = segments.reduce((s, x) => s + x.value, 0);
  const svg = h("svg:svg", { viewBox: `0 0 ${size} ${size}` },
    h("svg:circle", { cx: c, cy: c, r, fill: "none", stroke: track, "stroke-width": width }));
  if (!total) return svg;
  let at = 0;
  for (const s of segments) {
    if (!s.value) continue;
    const frac = s.value / total;
    const from = at + (frac < 1 ? gap / 2 : 0), to = at + frac - (frac < 1 ? gap / 2 : 0);
    at += frac;
    if (to <= from) continue;
    svg.append(h("svg:path", { d: arc(c, c, r, from, to - (to - from >= 1 ? .0001 : 0)), fill: "none", stroke: s.color, "stroke-width": width,
      "stroke-linecap": "round", "stroke-dasharray": s.dash || null, style: s.glow ? { filter: "drop-shadow(0 0 6px rgba(255,106,26,.7))" } : null }));
  }
  return svg;
}

// days: [{ label, parts: [{ value, color }], accent }]
export function dayBars(days, { height = 180, labelEvery = 1 } = {}) {
  const W = Math.max(560, days.length * 24), H = height, padB = 22, top = 10;
  const max = Math.max(1, ...days.map(d => d.parts.reduce((s, p) => s + p.value, 0)));
  const step = W / days.length, bw = Math.max(6, Math.min(18, step - 8));
  const svg = h("svg:svg", { class: "barsvg", viewBox: `0 0 ${W} ${H}`, preserveAspectRatio: "none", style: { minWidth: W + "px" } });
  days.forEach((d, i) => {
    const x = i * step + (step - bw) / 2;
    let y = H - padB;
    for (const p of d.parts) {
      if (!p.value) continue;
      const hgt = p.value / max * (H - padB - top);
      y -= hgt;
      svg.append(h("svg:rect", { x, y, width: bw, height: Math.max(0, hgt - 1.5), rx: 3, fill: p.color }));
    }
    if (!d.parts.some(p => p.value)) svg.append(h("svg:rect", { x, y: H - padB - 3, width: bw, height: 3, rx: 1.5, fill: "var(--s3)" }));
    if (i % labelEvery === 0) {
      svg.append(h("svg:text", { x: x + bw / 2, y: H - 6, "text-anchor": "middle", style: d.accent ? { fill: "var(--sig)" } : null }, d.label));
    }
  });
  return h("div", { style: { overflowX: "auto" } }, svg);
}

export function spark(values, color = "var(--sig)") {
  const W = 70, H = 26, max = Math.max(1, ...values);
  const pts = values.map((v, i) => `${(i / Math.max(1, values.length - 1)) * W},${H - 2 - v / max * (H - 4)}`).join(" ");
  return h("svg:svg", { class: "spark", viewBox: `0 0 ${W} ${H}` },
    h("svg:polyline", { points: pts, fill: "none", stroke: color, "stroke-width": 1.8, "stroke-linecap": "round", "stroke-linejoin": "round" }));
}
