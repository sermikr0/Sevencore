// Put one person into a shift group (or take them out). Managers and admins; the server checks the scope.
import { h } from "../dom.js";
import { t } from "../i18n/index.js";
import { app, call } from "../store.js";
import { icon } from "./icons.js";
import { dialog, toast, errorText } from "./overlay.js";
import { groupOf } from "./kit.js";

export function pickGroup(person, done) {
  const current = groupOf(person);
  let busy = false;
  const choose = async (g, d) => {
    if (busy) return;
    if (g === current) { d.close(); return; }
    busy = true;
    try {
      await call(`/api/panel/employees/${person.telegram_id}`, { method: "PATCH", body: { group: g } });
      toast(g ? t("grp_saved", { name: person.name, g }) : t("grp_cleared", { name: person.name }));
      d.close();
      if (done) done(g);
    } catch (e) { toast(errorText(e), true); busy = false; }
  };
  const list = h("div", { class: "gpick" });
  const d = dialog({ title: t("grp_pick", { name: person.name }), body: [list, h("div", { class: "hint" }, t("grp_pick_hint"))] });
  list.append(...app.groups.map(g => h("button", { type: "button", class: g === current ? "on" : "", onclick: () => choose(g, d) },
    icon(g === current ? "check" : "layers", 15), h("span", {}, g))),
    h("button", { type: "button", class: ["none", !current && "on"], onclick: () => choose(null, d) },
      icon(!current ? "check" : "close", 15), h("span", {}, t("grp_none"))));
  return d;
}
