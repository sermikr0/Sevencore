// Session, API client and live events.
export const app = { user: null, perms: {}, rules: {}, tz: "Asia/Tashkent", departments: [], groups: [] };

export class Fail extends Error {
  constructor(code, status, data) { super(code); this.code = code; this.status = status; this.data = data || {}; }
}

export async function call(path, { method = "GET", body } = {}) {
  const init = { method, credentials: "same-origin", headers: { "X-Requested-With": "sevencore" } };
  if (body !== undefined) { init.headers["Content-Type"] = "application/json"; init.body = JSON.stringify(body); }
  let res;
  try { res = await fetch(path, init); } catch (e) { throw new Fail("network", 0); }
  if (res.status === 401) { location.replace("/"); throw new Fail("signed_out", 401); }
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.ok === false) throw new Fail(data.error || data.message || "server_error", res.status, data);
  return data;
}

const listeners = new Set();
let source = null;
export const live = { on: false };

export function onLive(fn) { listeners.add(fn); return () => listeners.delete(fn); }

export function connectLive(onState) {
  if (source) return;
  source = new EventSource("/api/panel/events");
  source.onopen = () => { live.on = true; onState(true); };
  source.onerror = () => { live.on = false; onState(false); };
  source.onmessage = ev => {
    let data = {};
    try { data = JSON.parse(ev.data); } catch (e) { /* ignore */ }
    listeners.forEach(fn => fn(data));
  };
}
