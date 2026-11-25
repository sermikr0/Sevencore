// Mark forms used on several pages: add, correct / delete, close a shift.
import { h } from "../dom.js";
import { t } from "../i18n/index.js";
import { call } from "../store.js";
import { inputValue, hhmm, dmy, dayOf } from "../time.js";
import { dialog, confirm, toast, errorText } from "../ui/overlay.js";

let roster = null;
export function dropRoster() { roster = null; }

function actionSelect(value) {
  return h("select", { class: "sel", name: "action" },
    h("option", { value: "check_in", selected: value !== "check_out" }, t("in_long")),
    h("option", { value: "check_out", selected: value === "check_out" }, t("out_long")));
}

export async function addMark({ person, action, done } = {}) {
  if (!roster) roster = (await call("/api/panel/employees")).rows;
  if (!roster.length) { toast(t("no_people"), true); return; }
  const who = h("select", { class: "sel", name: "tg" }, roster.map(r => h("option", { value: r.telegram_id,
    selected: person && String(person.telegram_id) === String(r.telegram_id) }, `${r.name} · ${r.department || ""}`)));
  const act = actionSelect(action);
  const at = h("input", { class: "in", type: "datetime-local", value: inputValue() });
  const note = h("input", { class: "in", maxLength: 200, placeholder: t("reason_ph") });
  dialog({ title: t("add_mark"), body: [
    h("label", { class: "fld" }, h("span", {}, t("person")), who),
    h("div", { class: "row" }, h("label", { class: "fld" }, h("span", {}, t("action")), act), h("label", { class: "fld" }, h("span", {}, t("when")), at)),
    h("label", { class: "fld" }, h("span", {}, t("reason")), note),
    h("div", { class: "hint sig" }, t("add_hint")),
  ], actions: [{ label: t("cancel") }, { label: t("save"), kind: "go", run: async () => {
    await call("/api/panel/marks", { method: "POST", body: { telegram_id: +who.value, action: act.value, at: at.value, note: note.value } });
    toast(t("saved")); if (done) done();
  } }] });
}

export function editMark(mark, { done } = {}) {
  const act = actionSelect(mark.action);
  const at = h("input", { class: "in", type: "datetime-local", value: inputValue(Date.parse(mark.at)) });
  const note = h("input", { class: "in", maxLength: 200, placeholder: t("reason_ph") });
  dialog({ title: t("edit_mark"), body: [
    h("div", { class: "hint" }, `${mark.name || ""} · ${dmy(dayOf(mark.at))} · ${hhmm(mark.at)}`),
    h("div", { class: "row" }, h("label", { class: "fld" }, h("span", {}, t("action")), act), h("label", { class: "fld" }, h("span", {}, t("when")), at)),
    h("label", { class: "fld" }, h("span", {}, t("reason")), note),
    mark.admin_note ? h("div", { class: "t3", style: { fontSize: "12.5px" } }, `${t("note")}: ${mark.admin_note}`) : null,
  ], actions: [
    { label: t("delete"), kind: "warn", left: true, run: async close => {
      if (!(await confirm(t("delete_mark_q"), t("delete")))) return false;
      await call(`/api/panel/marks/${encodeURIComponent(mark.id)}`, { method: "DELETE" });
      toast(t("deleted")); close(); if (done) done();
    } },
    { label: t("cancel") },
    { label: t("save"), kind: "go", run: async () => {
      const body = { action: act.value, at: at.value };
      if (note.value.trim()) body.note = note.value.trim();
      await call(`/api/panel/marks/${encodeURIComponent(mark.id)}`, { method: "PATCH", body });
      toast(t("saved")); if (done) done();
    } },
  ] });
}

export async function closeShift(person, done) {
  if (!(await confirm(t("close_shift_q", { name: person.name }), t("close_shift")))) return;
  try {
    await call(`/api/panel/employees/${person.telegram_id}/checkout`, { method: "POST" });
    toast(t("closed")); if (done) done();
  } catch (e) { toast(errorText(e), true); }
}
