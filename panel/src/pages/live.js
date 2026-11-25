// Live: today's attendance ring, key numbers, the shift timeline and the live stream.
import { h, mount } from "../dom.js";
import { t } from "../i18n/index.js";
import { app, call } from "../store.js";
import { today, longDay, dow, greeting, hhmm, hm, now, words } from "../time.js";
import { icon } from "../ui/icons.js";
import { who, status, action, empty, loader, photo } from "../ui/kit.js";
import { ring, spark } from "../ui/charts.js";
import { lightbox } from "../ui/overlay.js";
import { addMark, closeShift } from "./marks.js";

export async function page(ctx) {
  ctx.title(`${t("today")} · ${longDay(today())}`, t("nav_live"));
  mount(ctx.root, loader());
  let d = null, tick = null;

  async function load() {
    d = await call("/api/panel/overview");
    draw();
  }

  function draw() {
    const k = d.kpi;
    const planned = k.arrived + k.absent + k.expected;
    const rate = planned ? Math.round(k.arrived / planned * 100) : 0;
    const onTime = k.arrived - k.late;
    const weekVals = key => d.week.map(x => key === "came" ? x.present + x.late : x[key]);
    mount(ctx.root,
      h("section", { class: "greet rise" },
        h("div", {}, h("h2", {}, greeting() + ", ", h("b", {}, app.user.display_name.split(" ")[0])),
          h("p", {}, t("live_line", { a: k.arrived, p: planned, d: k.on_duty }))),
        h("div", { class: "row" },
          h("a", { class: "btn line", href: "/app/journal", "data-link": "" }, icon("journal", 16), t("nav_journal")),
          h("button", { class: "btn go", onclick: () => addMark({ done: load }) }, icon("plus", 16), t("add_mark")))),
      h("section", { class: "grid cols-hero", style: { marginBottom: "16px" } },
        h("div", { class: "card gauge-card rise" },
          h("div", { class: "gauge" },
            ring([{ value: onTime, color: "var(--tx)" }, { value: k.late, color: "var(--sig)", glow: true },
              { value: k.absent, color: "#3f3f46" }, { value: k.expected, color: "var(--s4)", dash: "2 5" }]),
            h("div", { class: "mid" }, h("div", {}, h("b", { class: "n" }, rate, h("sup", {}, "%")), h("small", {}, t("came_of", { a: k.arrived, p: planned }))))),
          h("div", { class: "legend2" },
            h("div", {}, h("i", { style: { background: "var(--tx)" } }), h("span", {}, t("s_present")), h("b", { class: "n" }, onTime)),
            h("div", {}, h("i", { style: { background: "var(--sig)" } }), h("span", {}, t("s_late")), h("b", { class: "n" }, k.late)),
            h("div", {}, h("i", { style: { background: "#3f3f46" } }), h("span", {}, t("s_absent")), h("b", { class: "n" }, k.absent)),
            h("div", {}, h("i", { style: { border: "1px dashed var(--tx3)" } }), h("span", {}, t("s_pending")), h("b", { class: "n" }, k.expected)),
            h("div", {}, h("i", { style: { background: "var(--s3)" } }), h("span", {}, t("away")), h("b", { class: "n" }, k.away)))),
        h("div", { class: "tiles rise" },
          tile(t("on_duty"), k.on_duty, t("on_duty_s"), "hot", null),
          tile(t("s_late"), k.late, t("late_s"), "", spark(weekVals("late"))),
          tile(t("s_absent"), k.absent, t("absent_s"), "", spark(weekVals("absent"), "var(--tx3)")),
          tile(t("auto_7"), k.auto_out_7d, t("auto_7_s"), "", null)),
        h("div", { class: "card datecard rise" },
          h("div", {}, h("div", { class: "big n" }, today().slice(8), h("em", {}, ".")), h("div", { class: "sub" }, `${longDay(today()).split(" ")[1]}, ${t("dow_long").split(",")[(new Date(today() + "T12:00:00Z").getUTCDay() + 6) % 7]}`)),
          weekBars(d.week))),
      h("section", { class: "grid cols-main" },
        h("div", { class: "card rise" },
          h("div", { class: "chd" }, h("h3", {}, t("timeline")), h("span", { class: "tag n" }, d.lanes.length), h("span", { class: "sp" }),
            h("span", { class: "t3", style: { fontSize: "12px" } }, t("timeline_hint"))),
          d.lanes.length ? timeline(d.lanes) : empty(t("no_shifts_today"), "clock")),
        h("div", { class: "stack" },
          h("div", { class: "card rise" },
            h("div", { class: "chd" }, h("h3", {}, t("stream")), h("span", { class: "tag n" }, d.feed.length)),
            d.feed.length ? h("ul", { class: "stream" }, d.feed.map(streamItem)) : empty(t("no_marks_today"), "journal")),
          h("div", { class: "card rise" },
            h("div", { class: "chd" }, h("h3", {}, t("waiting")), h("span", { class: "tag n" }, d.waiting.length)),
            d.waiting.length ? h("div", { class: "cbd", style: { display: "grid", gap: "10px" } }, d.waiting.map(w =>
              h("div", { class: "row", style: { justifyContent: "space-between", flexWrap: "nowrap" } }, who(w),
                h("span", { class: "row", style: { flexWrap: "nowrap" } }, h("span", { class: "n t3" }, w.start || ""), status(w.status)))))
              : empty(t("all_here"), "check")))));
  }

  function tile(label, value, sub, cls, sp) {
    return h("div", { class: ["tile", value && cls] }, h("small", {}, label), h("b", {}, value), h("span", {}, sub), sp);
  }

  function weekBars(week) {
    const max = Math.max(1, ...week.map(x => x.present + x.late + x.absent));
    return h("div", { class: "week7" }, week.map(x => {
      const came = x.present + x.late, total = came + x.absent;
      return h("div", { title: `${x.date}: ${came}/${total}` },
        h("span", { class: "col", style: { height: `${Math.max(6, total / max * 100)}%` } },
          h("i", { style: { height: total ? `${x.present / total * 100}%` : "0", background: "var(--tx)" } }),
          h("i", { style: { height: total ? `${x.late / total * 100}%` : "0", background: "var(--sig)" } })),
        h("small", { class: x.date === today() ? "now" : "" }, dow(x.date)));
    }));
  }

  function timeline(lanes) {
    const times = [now() - 2 * 3600e3, now() + 2 * 3600e3];
    for (const l of lanes) {
      if (l.plan) times.push(Date.parse(l.plan.start), Date.parse(l.plan.end));
      for (const s of l.sessions) times.push(Date.parse(s.start), s.end ? Date.parse(s.end) : now());
    }
    let a = Math.min(...times), b = Math.max(...times);
    a = Math.floor(a / 3600e3) * 3600e3; b = Math.ceil(b / 3600e3) * 3600e3;
    if (b - a > 26 * 3600e3) a = b - 26 * 3600e3;
    const span = b - a, pos = ms => `${Math.min(100, Math.max(0, (ms - a) / span * 100))}%`;
    const hours = [];
    const stepH = span > 16 * 3600e3 ? 3 : span > 10 * 3600e3 ? 2 : 1;
    for (let x = a; x <= b; x += stepH * 3600e3) hours.push(x);
    const grid = () => hours.map(x => h("span", { class: "tl-grid", style: { left: pos(x) } }));
    return h("div", { class: "tl" }, h("div", { class: "tl-in" },
      h("div", { class: "tl-axis" }, h("span"), h("div", { class: "tl-hours" }, hours.filter(x => (x - a) / span < .94).map(x => h("span", { style: { left: pos(x) } }, hhmm(new Date(x).toISOString()))))),
      lanes.map(l => {
        const ongoing = l.sessions.some(s => s.ongoing);
        const track = h("div", { class: "tl-track" }, grid());
        if (l.plan) {
          const s0 = Date.parse(l.plan.start), e0 = Date.parse(l.plan.end);
          track.append(h("div", { class: "tl-plan", style: { left: pos(s0), width: `calc(${pos(e0)} - ${pos(s0)})` }, title: `${hhmm(l.plan.start)}–${hhmm(l.plan.end)}` }));
        }
        for (const s of l.sessions) {
          const s0 = Date.parse(s.start), e0 = s.end ? Date.parse(s.end) : now();
          const w = (e0 - s0) / span * 100;
          track.append(h("div", { class: ["tl-work", s.ongoing && "live", s.auto && "auto"], style: { left: pos(s0), width: `${Math.max(.6, w)}%` },
            title: `${hhmm(s.start)} → ${s.end ? hhmm(s.end) : "…"}` }, w > 7 ? `${hhmm(s.start)} · ${hm((e0 - s0) / 6e4)}` : ""));
          if (s.late_min) track.append(h("span", { class: "tl-late", style: { left: pos(s0) }, title: t("late_by", { m: s.late_min }) }));
        }
        if (now() >= a && now() <= b) track.append(h("span", { class: "tl-now", style: { left: pos(now()) } }));
        return h("div", { class: "tl-row" }, h("div", { class: "row", style: { flexWrap: "nowrap", justifyContent: "space-between", minWidth: 0 } },
          who({ ...l, _ring: ongoing }, { sub: l.plan ? `${hhmm(l.plan.start)}–${hhmm(l.plan.end)}` : l.department }),
          ongoing && app.perms.marks ? h("button", { class: "ib", title: t("close_shift"), onclick: () => closeShift(l, load) }, icon("out", 15)) : null), track);
      }),
      h("div", { class: "tl-axis" }, h("span"), h("div", { class: "tl-hours" }, h("span", { style: { left: pos(now()), color: "var(--sig)" } }, t("now"))))));
  }

  function streamItem(f) {
    return h("li", {},
      h("span", { class: "tm" }, hhmm(f.at)),
      h("span", { class: ["nd", f.action === "check_out" && "out", f.late_min && "late"] }),
      h("div", { class: "row", style: { flexWrap: "nowrap", minWidth: 0 } },
        f.auto ? null : photo(f.id, "ph", () => lightbox(f.id, f.name)),
        h("a", { class: "who", href: `/app/team/${f.telegram_id}`, "data-link": "" }, h("span", { class: "nm" }, h("b", {}, f.name),
          h("small", { class: f.late_min ? "sig" : "" }, f.late_min ? t("late_by", { m: f.late_min })
            : (f.distance_m != null ? `${f.distance_m} m · ${f.department || ""}` : f.department || ""))))),
      action(f.action, f.auto));
  }

  await load();
  tick = setInterval(() => { if (d) draw(); }, 60000);
  return { refresh: () => load().catch(() => {}), dispose: () => clearInterval(tick) };
}
