// Dialogs shared by several pages: add / edit a mark, force a check-out.
import { t, esc, api, modal, confirmBox, toast, errText, localInput, hm, dmy, parts } from "../core.js";

let empCache = null;
async function employeeOptions(selected) {
  if (!empCache) empCache = (await api("/api/panel/employees")).rows;
  return empCache.map(e => `<option value="${e.telegram_id}"${String(e.telegram_id) === String(selected) ? " selected" : ""}>${esc(e.name)} · ${esc(e.department || "")}</option>`).join("");
}
export function forgetEmployees() { empCache = null; }

export async function addMark({ tg, action, onDone } = {}) {
  const opts = await employeeOptions(tg);
  if (!opts) { toast(t("no_employees"), "err"); return; }
  modal({
    title: t("add_mark"),
    body: `
      <label class="field"><span>${esc(t("employee"))}</span><select class="select" name="tg">${opts}</select></label>
      <div class="row">
        <label class="field" style="flex:1"><span>${esc(t("action"))}</span>
          <select class="select" name="action">
            <option value="check_in"${action === "check_out" ? "" : " selected"}>${esc(t("check_in"))}</option>
            <option value="check_out"${action === "check_out" ? " selected" : ""}>${esc(t("check_out"))}</option>
          </select></label>
        <label class="field" style="flex:1.3"><span>${esc(t("date_time"))}</span>
          <input class="input" type="datetime-local" name="at" value="${localInput(Date.now())}"></label>
      </div>
      <label class="field"><span>${esc(t("reason"))}</span>
        <input class="input" name="note" maxlength="200" placeholder="${esc(t("reason_ph"))}"></label>
      <div class="note">${esc(t("add_mark_note"))}</div>`,
    actions: [{ label: t("cancel") }, {
      label: t("save"), kind: "primary", onClick: async m => {
        const body = { telegram_id: +m.querySelector("[name=tg]").value, action: m.querySelector("[name=action]").value,
          at: m.querySelector("[name=at]").value, note: m.querySelector("[name=note]").value };
        await api("/api/panel/marks", { method: "POST", body });
        toast(t("saved"));
        if (onDone) onDone();
      },
    }],
  });
}

export function editMark(mark, { onDone } = {}) {
  modal({
    title: t("edit_mark"),
    body: `
      <div class="note dark">${esc(mark.name || "")} · ${esc(dmy(localInput(Date.parse(mark.at)).slice(0, 10)))} ${esc(hm(mark.at))}</div>
      <div class="row">
        <label class="field" style="flex:1"><span>${esc(t("action"))}</span>
          <select class="select" name="action">
            <option value="check_in"${mark.action === "check_in" ? " selected" : ""}>${esc(t("check_in"))}</option>
            <option value="check_out"${mark.action === "check_out" ? " selected" : ""}>${esc(t("check_out"))}</option>
          </select></label>
        <label class="field" style="flex:1.3"><span>${esc(t("date_time"))}</span>
          <input class="input" type="datetime-local" name="at" value="${localInput(Date.parse(mark.at))}"></label>
      </div>
      <label class="field"><span>${esc(t("reason"))}</span>
        <input class="input" name="note" maxlength="200" placeholder="${esc(t("reason_ph"))}"></label>
      ${mark.admin_note ? `<div class="muted" style="font-size:12.5px">${esc(t("admin_note"))}: ${esc(mark.admin_note)}</div>` : ""}`,
    actions: [
      { label: t("delete"), kind: "danger", left: true, onClick: async (m, close) => {
        if (!(await confirmBox(t("delete_mark_q"), t("delete")))) return false;
        await api(`/api/panel/marks/${encodeURIComponent(mark.id)}`, { method: "DELETE" });
        toast(t("deleted")); close(); if (onDone) onDone();
      } },
      { label: t("cancel") },
      { label: t("save"), kind: "primary", onClick: async m => {
        const body = { action: m.querySelector("[name=action]").value, at: m.querySelector("[name=at]").value };
        const note = m.querySelector("[name=note]").value.trim();
        if (note) body.note = note;
        await api(`/api/panel/marks/${encodeURIComponent(mark.id)}`, { method: "PATCH", body });
        toast(t("saved")); if (onDone) onDone();
      } },
    ],
  });
}

export async function forceCheckout(row, onDone) {
  if (!(await confirmBox(t("force_out_q", { name: row.name }), t("force_out"), false))) return;
  try {
    await api(`/api/panel/employees/${row.telegram_id}/checkout`, { method: "POST" });
    toast(t("force_out_done"));
    if (onDone) onDone();
  } catch (e) { toast(errText(e), "err"); }
}

export function nowParts() { return parts(Date.now()); }
