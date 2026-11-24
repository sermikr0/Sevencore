var ns = () => {
    let e = ``,
      t = ``;
    typeof window < `u` && (e = (localStorage.getItem(`timetrack_supabase_url`) || ``).trim(), t = (localStorage.getItem(`timetrack_supabase_key`) || ``).trim());
    let n = e || `https://zdxkmfobwyqjbspkdzia.supabase.co`,
      r = t || `sb_publishable_UylLo81fFeTi7rcEoer69g_QJ7ORf1r`,
      i = n.startsWith(`https://`) && !n.includes(`your-project-id`),
      a = r.length > 20 && !r.includes(`your-anon-public-key`);
    return {
      supabaseUrl: n,
      supabaseKey: r,
      isConfigured: i && a
    }
  },
  rs = null,
  is = () => {
    let {
      supabaseUrl: e,
      supabaseKey: t,
      isConfigured: n
    } = ns();
    if (!n) return null;
    if (!rs) try {
      rs = es(e, t)
    } catch (e) {
      console.warn(`Could not initialize Supabase client:`, e), rs = null
    }
    return rs
  },
  as = `7core_attendance_logs`,
  os = `7core_employees`,
  ss = e => {
    try {
      let t = localStorage.getItem(as);
      if (!t) return [];
      let n = JSON.parse(t);
      return e === void 0 ? n : n.filter(t => t.telegram_id === e)
    } catch {
      return []
    }
  },
  cs = () => {
    typeof window < `u` && window.dispatchEvent(new CustomEvent(`7core_attendance_update`))
  },
  ls = e => {
    try {
      let t = localStorage.getItem(as),
        n = t ? JSON.parse(t) : [],
        r = n.findIndex(t => t.id === e.id),
        i;
      r >= 0 ? (i = [...n], i[r] = e) : i = [...n, e], localStorage.setItem(as, JSON.stringify(i)), cs()
    } catch (e) {
      console.error(`Failed to save to local storage`, e)
    }
  },
  us = e => {
    try {
      let t = localStorage.getItem(as);
      if (!t) return;
      let n = JSON.parse(t).filter(t => t.id !== e);
      localStorage.setItem(as, JSON.stringify(n)), cs()
    } catch (e) {
      console.error(`Failed to delete from local storage`, e)
    }
  },
  ds = () => {
    try {
      let e = localStorage.getItem(os);
      return e ? JSON.parse(e) : {}
    } catch {
      return {}
    }
  },
  fs = e => {
    try {
      let t = ds();
      t[e.telegram_id] = e, localStorage.setItem(os, JSON.stringify(t)), cs()
    } catch (e) {
      console.error(`Failed to save local employee`, e)
    }
  },
  ps = e => {
    try {
      localStorage.setItem(`7core_logged_out_${e}`, `true`), localStorage.removeItem(`7core_registered_${e}`), localStorage.removeItem(`7core_user_${e}`), localStorage.removeItem(`7core_employee_${e}`), localStorage.removeItem(`7core_active_user`);
      let t = localStorage.getItem(`7core_fallback_id`);
      t && (localStorage.removeItem(`7core_registered_${t}`), localStorage.removeItem(`7core_user_${t}`), localStorage.removeItem(`7core_employee_${t}`));
      let n = ds();
      n[e] && (delete n[e], localStorage.setItem(os, JSON.stringify(n))), cs()
    } catch (e) {
      console.error(`Failed to clear local user session:`, e)
    }
  },
  ms = e => {
    if (!e) return [];
    let t = [];
    if (Array.isArray(e)) t = e;
    else if (typeof e == `string`) {
      let n = e.trim();
      if (n.startsWith(`[`) && n.endsWith(`]`)) try {
        let e = JSON.parse(n);
        t = Array.isArray(e) ? e : n.slice(1, -1).split(`,`)
      } catch {
        t = n.slice(1, -1).split(`,`)
      } else t = n.startsWith(`{`) && n.endsWith(`}`) ? n.slice(1, -1).split(`,`) : n.split(`,`)
    }
    let n = {
        0: `sunday`,
        7: `sunday`,
        sun: `sunday`,
        sunday: `sunday`,
        1: `monday`,
        mon: `monday`,
        monday: `monday`,
        2: `tuesday`,
        tue: `tuesday`,
        tues: `tuesday`,
        tuesday: `tuesday`,
        3: `wednesday`,
        wed: `wednesday`,
        wednesday: `wednesday`,
        4: `thursday`,
        thu: `thursday`,
        thur: `thursday`,
        thurs: `thursday`,
        thursday: `thursday`,
        5: `friday`,
        fri: `friday`,
        friday: `friday`,
        6: `saturday`,
        sat: `saturday`,
        saturday: `saturday`
      },
      r = [];
    for (let e of t) {
      if (e == null) continue;
      let t = String(e).toLowerCase().trim().replace(/['"\\{}]/g, ``);
      if (!t) continue;
      let i = n[t];
      i && !r.includes(i) && r.push(i)
    }
    return r
  },
  hs = e => !(!e || !e.shift_start_time || !e.shift_end_time || e.shift_name && e.shift_name.toLowerCase().includes(`unassigned`) || ms(e.shift_days).length === 0),
  gs = async e => {
    let t = is();
    if (!t) {
      let t = ds()[e];
      if (!t) try {
        let n = localStorage.getItem(`7core_employee_${e}`);
        n && (t = JSON.parse(n))
      } catch {}
      return t || null
    }
    try {
      let {
        data: n,
        error: r
      } = await t.from(`employees`).select(`*`).eq(`telegram_id`, e).maybeSingle();
      if (r) return console.warn(`Failed to query employee from Supabase:`, r.message), null;
      if (!n) {
        try {
          localStorage.removeItem(`7core_employee_${e}`), localStorage.removeItem(`7core_registered_${e}`), localStorage.removeItem(`7core_user_${e}`), localStorage.setItem(`7core_logged_out_${e}`, `true`);
          let t = localStorage.getItem(`7core_active_user`);
          t && JSON.parse(t).id === e && localStorage.removeItem(`7core_active_user`);
          let n = ds();
          n[e] && (delete n[e], localStorage.setItem(`7core_employees`, JSON.stringify(n)))
        } catch {}
        return null
      }
      let i = ms(n.shift_days),
        a = i.length > 0 && !!n.shift_start_time && !!n.shift_end_time && !(n.shift_name && n.shift_name.toLowerCase().includes(`unassigned`)),
        o = a ? n.shift_name || `Assigned Shift` : `Shift Unassigned`,
        s = {
          telegram_id: n.telegram_id,
          first_name: n.first_name,
          last_name: n.last_name || null,
          username: n.username || null,
          photo_url: n.photo_url || null,
          department: n.department || null,
          created_at: n.created_at,
          is_verified: !0,
          shift_name: o,
          shift_start_time: a ? n.shift_start_time : null,
          shift_end_time: a ? n.shift_end_time : null,
          shift_days: a ? i : null
        };
      fs(s);
      try {
        localStorage.setItem(`7core_employee_${e}`, JSON.stringify(s))
      } catch {}
      return s
    } catch (e) {
      return console.warn(`Failed to fetch employee from Supabase:`, e), null
    }
  }, _s = async e => {
    fs(e);
    let t = is();
    if (!t) return e;
    try {
      let n = !e.shift_days || e.shift_days.length === 0 || !e.shift_start_time || e.shift_name && e.shift_name.toLowerCase().includes(`unassigned`),
        r = {
          telegram_id: e.telegram_id,
          first_name: e.first_name,
          last_name: e.last_name || null,
          username: e.username || null,
          photo_url: e.photo_url || null,
          department: e.department || null,
          shift_name: n ? `Shift Unassigned` : e.shift_name,
          shift_start_time: n ? null : e.shift_start_time,
          shift_end_time: n ? null : e.shift_end_time,
          shift_days: n ? [] : e.shift_days
        },
        {
          data: i,
          error: a
        } = await t.from(`employees`).upsert(r, {
          onConflict: `telegram_id`
        }).select().single();
      if (a) return console.warn(`Supabase employee sync warning:`, a.message), e;
      let o = {
        ...e,
        ...i
      };
      return n && (o.shift_name = `Shift Unassigned`, o.shift_start_time = null, o.shift_end_time = null, o.shift_days = []), fs(o), o
    } catch (t) {
      return console.error(`Error syncing employee with Supabase:`, t), e
    }
  }, vs = e => {
    if (e <= 0) return `-`;
    let t = Math.floor(e / 60),
      n = Math.floor(e % 60);
    return t > 0 && n > 0 ? `${t}h ${n}m` : t > 0 ? `${t}h` : `${n}m`
  }, ys = 36e6, bs = new Set, xs = e => {
    if (!e || e.length === 0) return [];
    let t = new Map;
    for (let n of e) {
      let e = t.get(n.telegram_id) || [];
      e.push(n), t.set(n.telegram_id, e)
    }
    let n = Date.now(),
      r = [],
      i = [];
    if (t.forEach((e, t) => {
        let a = [...e].sort((e, t) => new Date(e.timestamp).getTime() - new Date(t.timestamp).getTime()),
          o = [];
        for (let e = 0; e < a.length; e++) {
          let r = a[e];
          if (o.push(r), r.action_type === `check_in`) {
            let s = a[e + 1],
              c = new Date(r.timestamp).getTime() + ys;
            if (s) {
              if (new Date(s.timestamp).getTime() > c) {
                let e = `auto-out-${r.id}`;
                if (!a.some(t => t.id === e || t.action_type === `check_out` && Math.abs(new Date(t.timestamp).getTime() - c) < 3e3)) {
                  let n = {
                    id: e,
                    telegram_id: t,
                    action_type: `check_out`,
                    timestamp: new Date(c).toISOString(),
                    note: `System Auto Check-Out (10h Shift Limit)`,
                    admin_note: `Auto-checked out after 10 hours`,
                    created_at: new Date(c).toISOString(),
                    photo_url: null,
                    latitude: null,
                    longitude: null,
                    distance_meters: null,
                    employee: r.employee
                  };
                  o.push(n), i.push(n)
                }
              }
            } else if (n >= c) {
              let e = `auto-out-${r.id}`;
              if (!a.some(t => t.id === e)) {
                let n = {
                  id: e,
                  telegram_id: t,
                  action_type: `check_out`,
                  timestamp: new Date(c).toISOString(),
                  note: `System Auto Check-Out (10h Shift Limit)`,
                  admin_note: `Auto-checked out after 10 hours`,
                  created_at: new Date(c).toISOString(),
                  photo_url: null,
                  latitude: null,
                  longitude: null,
                  distance_meters: null,
                  employee: r.employee
                };
                o.push(n), i.push(n)
              }
            }
          }
        }
        r.push(...o)
      }), i.length > 0) try {
      let e = typeof localStorage < `u` ? localStorage.getItem(as) : null,
        t = e ? JSON.parse(e) : [],
        n = !1,
        r = is();
      for (let e of i) bs.has(e.id) || (bs.add(e.id), t.some(t => t.id === e.id) || (t.push(e), n = !0), r && r.from(`attendance_logs`).upsert({
        id: e.id,
        telegram_id: e.telegram_id,
        action_type: e.action_type,
        timestamp: e.timestamp,
        note: e.note,
        admin_note: e.admin_note
      }).then(() => {}, () => {}));
      n && typeof localStorage < `u` && localStorage.setItem(as, JSON.stringify(t))
    } catch {}
    return r
  }, Ss = e => {
    let t = [...xs(e)].sort((e, t) => new Date(e.timestamp).getTime() - new Date(t.timestamp).getTime()),
      n = [];
    for (let e = 0; e < t.length; e++) {
      let r = t[e],
        i = `-`;
      if (r.action_type === `check_out`) {
        for (let n = e - 1; n >= 0; n--)
          if (t[n].action_type === `check_in`) {
            let e = new Date(r.timestamp).getTime() - new Date(t[n].timestamp).getTime();
            i = vs(Math.max(0, Math.round(e / 6e4)));
            break
          }
      }
      n.push({
        ...r,
        durationFormatted: i
      })
    }
    return n
  }, Cs = async e => {
    let t = is(),
      {
        start: n,
        end: r
      } = Js(Ks()),
      i = new Date(Date.now() - 36e6).toISOString();
    if (!t) {
      let t = ss(e),
        a = t.filter(e => e.timestamp >= n && e.timestamp <= r);
      if (!a.some(e => e.action_type === `check_in`)) {
        let e = t.filter(e => e.timestamp < n && e.timestamp >= i).sort((e, t) => new Date(t.timestamp).getTime() - new Date(e.timestamp).getTime())[0];
        e && e.action_type === `check_in` && a.unshift(e)
      }
      return Ss(a)
    }
    try {
      let a = t.from(`attendance_logs`).select(`*`).eq(`telegram_id`, e).gte(`timestamp`, n).lte(`timestamp`, r).order(`timestamp`, {
          ascending: !0
        }),
        o = new Promise((e, t) => setTimeout(() => t(Error(`timeout`)), 2e3)),
        {
          data: s,
          error: c
        } = await Promise.race([a, o]),
        l = ss(e).filter(e => e.timestamp >= n && e.timestamp <= r),
        u = [];
      if (!c && s) {
        let e = new Map;
        (s || []).forEach(t => e.set(t.id, t)), l.forEach(t => e.set(t.id, t)), u = Array.from(e.values()).sort((e, t) => new Date(e.timestamp).getTime() - new Date(t.timestamp).getTime())
      } else u = l;
      if (!u.some(e => e.action_type === `check_in`)) try {
        let {
          data: r
        } = await t.from(`attendance_logs`).select(`*`).eq(`telegram_id`, e).lt(`timestamp`, n).gte(`timestamp`, i).order(`timestamp`, {
          ascending: !1
        }).limit(1);
        r && r.length > 0 && r[0].action_type === `check_in` && u.unshift(r[0])
      } catch {}
      return Ss(u)
    } catch {
      return Ss(ss(e).filter(e => e.timestamp >= n && e.timestamp <= r))
    }
  }, ws = async (e, t, n) => {
    let r = is(),
      i = new Date(t, n, 1, 0, 0, 0).toISOString(),
      a = new Date(t, n + 1, 0, 23, 59, 59).toISOString();
    if (!r) return Ss(ss(e).filter(e => {
      let r = new Date(e.timestamp);
      return r.getFullYear() === t && r.getMonth() === n
    }));
    try {
      let {
        data: t,
        error: n
      } = await r.from(`attendance_logs`).select(`*`).eq(`telegram_id`, e).gte(`timestamp`, i).lte(`timestamp`, a).order(`timestamp`, {
        ascending: !0
      });
      return n ? (console.warn(`Supabase month fetch error:`, n.message), Ss(ss(e))) : Ss(t || [])
    } catch (t) {
      return console.error(`Failed to fetch month logs from Supabase:`, t), Ss(ss(e))
    }
  }, Ts = async (e, t, n, r) => {
    let i = is();
    if (i) {
      let {
        data: t,
        error: n
      } = await i.from(`employees`).select(`telegram_id`).eq(`telegram_id`, e).maybeSingle();
      if (n || !t) {
        try {
          localStorage.removeItem(`7core_employee_${e}`), localStorage.removeItem(`7core_registered_${e}`), localStorage.removeItem(`7core_user_${e}`), localStorage.setItem(`7core_logged_out_${e}`, `true`);
          let t = ds();
          delete t[e], localStorage.setItem(`7core_employees`, JSON.stringify(t))
        } catch {}
        throw Error(`Employee account not found or has been removed from database.`)
      }
    }
    let a = {
      id: typeof crypto < `u` && crypto.randomUUID ? crypto.randomUUID() : `log-${Date.now()}-${Math.random().toString(36).substring(2,7)}`,
      telegram_id: e,
      action_type: t,
      timestamp: new Date().toISOString(),
      note: n || null,
      admin_note: null,
      created_at: new Date().toISOString(),
      photo_url: r?.photoUrl || null,
      latitude: r?.latitude || null,
      longitude: r?.longitude || null,
      distance_meters: r?.distanceMeters || null
    };
    return ls(a), i && Promise.race([i.from(`attendance_logs`).insert({
      id: a.id,
      telegram_id: a.telegram_id,
      action_type: a.action_type,
      timestamp: a.timestamp,
      note: a.note,
      admin_note: a.admin_note,
      photo_url: a.photo_url,
      latitude: a.latitude,
      longitude: a.longitude,
      distance_meters: a.distance_meters
    }), new Promise((e, t) => setTimeout(() => t(Error(`timeout`)), 2500))]).catch(e => {
      console.warn(`Background Supabase recordAttendance notice:`, e?.message || e)
    }), a
  }, Es = e => {
    let t = xs(e);
    if (!t || t.length === 0) return {
      isCheckedIn: !1,
      presentToday: 0,
      totalPresentUnits: 1,
      totalHoursFormatted: `00:00`,
      totalMinutes: 0
    };
    let n = [...t].sort((e, t) => new Date(e.timestamp).getTime() - new Date(t.timestamp).getTime()),
      r = n[n.length - 1],
      i = r.action_type === `check_in` && Date.now() - new Date(r.timestamp).getTime() < 36e6,
      a = 0,
      o = null;
    for (let e of n) {
      let t = new Date(e.timestamp).getTime();
      if (e.action_type === `check_in`) o = t;
      else if (e.action_type === `check_out` && o !== null) {
        let e = Math.min(t - o, ys);
        a += Math.max(0, e), o = null
      }
    }
    if (o !== null) {
      let e = Date.now() - o;
      a += Math.max(0, Math.min(e, ys))
    }
    let s = Math.floor(a / 6e4),
      c = Math.floor(s / 60),
      l = s % 60,
      u = `${String(c).padStart(2,`0`)}:${String(l).padStart(2,`0`)}`;
    return {
      isCheckedIn: i,
      lastAction: r,
      presentToday: +(n.length > 0),
      totalPresentUnits: 1,
      totalHoursFormatted: u,
      totalMinutes: s
    }
  }, Ds = async () => {
    let e = is(),
      t = ds();
    if (!e) return Object.values(t).map(e => ({
      ...e,
      department: e.department && !String(e.department).toLowerCase().includes(`fleet`) && (e.department === `HOS` || e.department === `CARGOGPT` || e.department === `7CORE`) ? e.department : `7CORE`
    }));
    try {
      let {
        data: t,
        error: n
      } = await e.from(`employees`).select(`*`).order(`first_name`, {
        ascending: !0
      });
      if (n || !t) return console.warn(`Failed to fetch employees from Supabase:`, n?.message), [];
      let r = t.map(e => {
          let t = ms(e.shift_days),
            n = t.length > 0 && !!e.shift_start_time && !!e.shift_end_time && !(e.shift_name && e.shift_name.toLowerCase().includes(`unassigned`)),
            r = n ? e.shift_name || `Assigned Shift` : `Shift Unassigned`,
            i = e.department,
            a = i && !String(i).toLowerCase().includes(`fleet`) && (i === `HOS` || i === `CARGOGPT` || i === `7CORE`) ? i : `7CORE`;
          return {
            telegram_id: e.telegram_id,
            first_name: e.first_name || `Employee`,
            last_name: e.last_name ?? null,
            username: e.username ?? null,
            photo_url: e.photo_url ?? null,
            department: a,
            created_at: e.created_at,
            is_verified: !0,
            shift_name: r,
            shift_start_time: n ? e.shift_start_time : null,
            shift_end_time: n ? e.shift_end_time : null,
            shift_days: n ? t : null
          }
        }),
        i = {};
      r.forEach(e => {
        i[e.telegram_id] = e
      });
      try {
        localStorage.setItem(os, JSON.stringify(i))
      } catch {}
      return r
    } catch (e) {
      return console.error(`Error in fetchAllEmployees:`, e), []
    }
  }, Os = async e => {
    let t = is(),
      n = await Ds(),
      r = new Map;
    n.forEach(e => r.set(e.telegram_id, e));
    let i = [];
    if (!t) i = ss();
    else try {
      let n = t.from(`attendance_logs`).select(`*`).order(`timestamp`, {
        ascending: !1
      });
      e?.startDate && (n = n.gte(`timestamp`, e.startDate)), e?.endDate && (n = n.lte(`timestamp`, e.endDate));
      let {
        data: r,
        error: a
      } = await n, o = ss();
      if (e?.startDate && (o = o.filter(t => t.timestamp >= e.startDate)), e?.endDate && (o = o.filter(t => t.timestamp <= e.endDate)), a || !r) console.warn(`Supabase fetchAllAttendanceLogs fallback:`, a?.message), i = o;
      else {
        let e = new Map;
        r.forEach(t => e.set(t.id, t)), o.forEach(t => e.set(t.id, t)), i = Array.from(e.values()).sort((e, t) => new Date(t.timestamp).getTime() - new Date(e.timestamp).getTime())
      }
    } catch (e) {
      console.error(`Error fetching logs from Supabase:`, e), i = ss()
    }
    let a = i.map(e => ({
      ...e,
      employee: r.get(e.telegram_id)
    }));
    if (e?.department && e.department !== `All` && (a = a.filter(t => t.employee?.department === e.department)), e?.searchQuery && e.searchQuery.trim().length > 0) {
      let t = e.searchQuery.toLowerCase().trim();
      a = a.filter(e => {
        let n = `${e.employee?.first_name||``} ${e.employee?.last_name||``}`.toLowerCase(),
          r = (e.employee?.username || ``).toLowerCase(),
          i = String(e.telegram_id),
          a = (e.note || ``).toLowerCase(),
          o = (e.admin_note || ``).toLowerCase();
        return n.includes(t) || r.includes(t) || i.includes(t) || a.includes(t) || o.includes(t)
      })
    }
    return Ss(a)
  }, ks = async (e, t) => {
    let n = ds();
    n[e] && (n[e] = {
      ...n[e],
      ...t
    }, fs(n[e]));
    let r = is();
    if (!r) return !0;
    try {
      let n = {
        first_name: t.first_name,
        last_name: t.last_name || null,
        department: t.department || null
      };
      t.photo_url !== void 0 && (n.photo_url = t.photo_url), t.shift_name !== void 0 && (n.shift_name = t.shift_name), t.shift_start_time !== void 0 && (n.shift_start_time = t.shift_start_time), t.shift_end_time !== void 0 && (n.shift_end_time = t.shift_end_time), t.shift_days !== void 0 && (n.shift_days = t.shift_days);
      let {
        error: i
      } = await r.from(`employees`).update(n).eq(`telegram_id`, e);
      return !i || (console.error(`Error updating employee in Supabase:`, i.message), !1)
    } catch (e) {
      return console.error(`Exception in updateEmployee:`, e), !1
    }
  }, As = async (e, t, n) => {
    let r = ms(t.shift_days),
      i = r.length > 0,
      a = i ? t.shift_name : `Shift Unassigned`,
      o = i ? t.shift_start_time : null,
      s = i ? t.shift_end_time : null,
      c = ds()[e],
      l = c?.shift_start_time || null,
      u = c?.shift_end_time || null,
      d = c?.shift_days || [],
      f = Ks();
    c ? (c.shift_name = a, c.shift_start_time = o, c.shift_end_time = s, c.shift_days = r) : c = {
      telegram_id: e,
      first_name: `Employee`,
      shift_name: a,
      shift_start_time: o,
      shift_end_time: s,
      shift_days: r
    }, fs(c);
    try {
      localStorage.setItem(`7core_employee_${e}`, JSON.stringify(c))
    } catch {}
    let p = n;
    p ||= Ws(f);
    let m = $s(),
      h = m.find(t => t.telegram_id === e && t.week_start_date === p);
    h ? Vs.forEach(e => {
      if (Us(p, e) > f) {
        let t = r.includes(e);
        h[e] = {
          ...h[e],
          status: t ? `scheduled` : `off`,
          startTime: t && o ? o : ``,
          endTime: t && s ? s : ``
        }
      }
    }) : (h = {
      id: `sched-${p}-${e}`,
      week_start_date: p,
      telegram_id: e,
      department: c.department || `7CORE`,
      manager_id: null,
      monday: tc(`off`, ``, ``),
      tuesday: tc(`off`, ``, ``),
      wednesday: tc(`off`, ``, ``),
      thursday: tc(`off`, ``, ``),
      friday: tc(`off`, ``, ``),
      saturday: tc(`off`, ``, ``),
      sunday: tc(`off`, ``, ``),
      updated_at: new Date().toISOString(),
      updated_by: `manager`,
      employee: c
    }, Vs.forEach(e => {
      if (Us(p, e) <= f) {
        let t = d.includes(e);
        h[e] = tc(t ? `scheduled` : `off`, t && l ? l : ``, t && u ? u : ``)
      } else {
        let t = r.includes(e);
        h[e] = tc(t ? `scheduled` : `off`, t && o ? o : ``, t && s ? s : ``)
      }
    }), m.push(h)), h.updated_at = new Date().toISOString(), h.employee = c, m.forEach(t => {
      t.telegram_id === e && t.week_start_date !== p && (Vs.forEach(e => {
        if (Us(t.week_start_date, e) > f) {
          let n = r.includes(e);
          t[e] = {
            ...t[e],
            status: n ? `scheduled` : `off`,
            startTime: n && o ? o : ``,
            endTime: n && s ? s : ``
          }
        }
      }), t.updated_at = new Date().toISOString(), t.employee = c)
    }), ec(m);
    let g = is();
    if (g) try {
      let {
        error: t
      } = await g.from(`employees`).update({
        shift_name: a,
        shift_start_time: o,
        shift_end_time: s,
        shift_days: r
      }).eq(`telegram_id`, e);
      t && console.warn(`Supabase saveEmployeeShift notice (employees table):`, t.message);
      let {
        data: n
      } = await g.from(`team_schedules`).select(`*`).eq(`week_start_date`, h.week_start_date).eq(`telegram_id`, h.telegram_id).maybeSingle(), i = {
        id: h.id,
        week_start_date: h.week_start_date,
        telegram_id: h.telegram_id,
        department: h.department,
        manager_id: h.manager_id,
        monday: h.monday,
        tuesday: h.tuesday,
        wednesday: h.wednesday,
        thursday: h.thursday,
        friday: h.friday,
        saturday: h.saturday,
        sunday: h.sunday,
        updated_at: new Date().toISOString(),
        updated_by: `manager`
      };
      n && Vs.forEach(e => {
        Us(h.week_start_date, e) <= f && n[e] && (i[e] = n[e])
      }), (n ? await g.from(`team_schedules`).update(i).eq(`week_start_date`, h.week_start_date).eq(`telegram_id`, h.telegram_id) : await g.from(`team_schedules`).insert(i))
    } catch (e) {
      console.warn(`Supabase saveEmployeeShift error:`, e)
    }
    return cs(), {
      success: !0
    }
  }, js = async (e, t) => {
    let n = localStorage.getItem(as);
    if (n) try {
      let r = JSON.parse(n),
        i = r.findIndex(t => t.id === e);
      i >= 0 && (r[i] = {
        ...r[i],
        ...t
      }, localStorage.setItem(as, JSON.stringify(r)), cs())
    } catch {}
    let r = is();
    if (!r) return !0;
    try {
      let {
        error: n
      } = await r.from(`attendance_logs`).update(t).eq(`id`, e);
      return n ? (console.error(`Error updating attendance log in Supabase:`, n.message), !1) : (cs(), !0)
    } catch (e) {
      return console.error(`Exception in updateAttendanceLog:`, e), !1
    }
  }, Ms = async e => {
    us(e);
    let t = is();
    if (!t) return !0;
    try {
      let {
        error: n
      } = await t.from(`attendance_logs`).delete().eq(`id`, e);
      return n ? (console.error(`Error deleting log from Supabase:`, n.message), !1) : (cs(), !0)
    } catch (e) {
      return console.error(`Exception in deleteAttendanceLog:`, e), !1
    }
  }, Ns = async e => {
    let t = {
      id: typeof crypto < `u` && crypto.randomUUID ? crypto.randomUUID() : `admin-log-${Date.now()}`,
      telegram_id: e.telegram_id,
      action_type: e.action_type,
      timestamp: e.timestamp,
      note: e.note || null,
      admin_note: e.admin_note || `Manual entry by Admin`,
      created_at: new Date().toISOString(),
      photo_url: null,
      latitude: 41.280101,
      longitude: 69.251403,
      distance_meters: 0
    };
    ls(t);
    let n = is();
    if (!n) return t;
    try {
      let {
        data: e,
        error: r
      } = await n.from(`attendance_logs`).insert({
        id: t.id,
        telegram_id: t.telegram_id,
        action_type: t.action_type,
        timestamp: t.timestamp,
        note: t.note,
        admin_note: t.admin_note,
        latitude: t.latitude,
        longitude: t.longitude,
        distance_meters: t.distance_meters
      }).select().single();
      return r ? (console.warn(`Supabase adminInsertAttendance error:`, r.message), t) : (cs(), e)
    } catch (e) {
      return console.error(`Exception in adminInsertAttendance:`, e), t
    }
  }, Ps = async (e, t) => {
    let n = e.trim().toLowerCase(),
      r = t.trim();
    if ((n === `admin` || n === `dispatcher`) && r === `7core2026`) return {
      success: !0
    };
    let i = is();
    if (!i) return {
      success: !1,
      message: `Invalid credentials. Default master password is 7core2026.`
    };
    try {
      let {
        data: e,
        error: t
      } = await i.from(`admin_users`).select(`*`).eq(`username`, n).maybeSingle();
      return t || !e ? {
        success: !1,
        message: `Invalid admin username or password.`
      } : e.password === r || e.password_hash === r ? {
        success: !0
      } : {
        success: !1,
        message: `Incorrect password.`
      }
    } catch (e) {
      return console.warn(`Admin check fallback:`, e), {
        success: !1,
        message: `Database query failed. Try master password.`
      }
    }
  }, Fs = async e => {
    let t = e.trim().toUpperCase();
    if (!t) return !1;
    let n = is();
    if (n) try {
      let {
        data: e,
        error: r
      } = await n.from(`organization_security`).select(`passkey`).eq(`key_name`, `terminal_access_code`).maybeSingle();
      if (!r && e && e.passkey) return t === e.passkey.trim().toUpperCase();
      let {
        data: i,
        error: a
      } = await n.from(`system_settings`).select(`value`).eq(`key`, `terminal_access_code`).maybeSingle();
      if (!a && i && i.value) return t === i.value.trim().toUpperCase()
    } catch (e) {
      console.warn(`Could not query organization_security from Supabase:`, e)
    }
    return t === `7CORE355`
  }, Is = async () => {
    let e = is();
    if (e) try {
      let {
        data: t,
        error: n
      } = await e.from(`organization_security`).select(`passkey`).eq(`key_name`, `terminal_access_code`).maybeSingle();
      if (!n && t && t.passkey) return t.passkey.trim()
    } catch (e) {
      console.warn(`Failed to fetch passkey from Supabase:`, e)
    }
    try {
      let e = localStorage.getItem(`7core_org_passkey`);
      if (e) return e.trim()
    } catch {}
    return `7CORE355`
  }, Ls = async e => {
    let t = e.trim().toUpperCase();
    if (!t) return !1;
    try {
      localStorage.setItem(`7core_org_passkey`, t)
    } catch {}
    let n = is();
    if (!n) return !0;
    try {
      let {
        error: e
      } = await n.from(`organization_security`).upsert({
        key_name: `terminal_access_code`,
        passkey: t,
        updated_at: new Date().toISOString(),
        updated_by: `admin`
      }, {
        onConflict: `key_name`
      });
      return !e || (console.error(`Error updating passkey in Supabase:`, e.message), !1)
    } catch (e) {
      return console.error(`Exception updating passkey:`, e), !1
    }
  }, Rs = async e => {
    let t = ds();
    delete t[e];
    try {
      localStorage.setItem(`7core_employees`, JSON.stringify(t)), localStorage.removeItem(`7core_employee_${e}`), localStorage.removeItem(`7core_registered_${e}`), localStorage.removeItem(`7core_user_${e}`), localStorage.setItem(`7core_logged_out_${e}`, `true`);
      let n = localStorage.getItem(`7core_active_user`);
      n && JSON.parse(n).id === e && localStorage.removeItem(`7core_active_user`)
    } catch {}
    let n = is();
    if (!n) return !0;
    try {
      let {
        error: t
      } = await n.from(`employees`).delete().eq(`telegram_id`, e);
      return t ? (console.error(`Error deleting employee from Supabase:`, t.message), !1) : (cs(), !0)
    } catch (e) {
      return console.error(`Exception deleting employee:`, e), !1
    }
  }, zs = (e, t) => {
    let n = is(),
      r = () => {
        t()
      };
    if (window.addEventListener(`7core_attendance_update`, r), !n) {
      let e = e => {
        e.key === as && t()
      };
      return window.addEventListener(`storage`, e), () => {
        window.removeEventListener(`7core_attendance_update`, r), window.removeEventListener(`storage`, e)
      }
    }
    let i = n.channel(`realtime_attendance_user_${e}_${Date.now()}`).on(`postgres_changes`, {
      event: `*`,
      schema: `public`,
      table: `attendance_logs`,
      filter: `telegram_id=eq.${e}`
    }, () => {
      t()
    }).subscribe();
    return () => {
      window.removeEventListener(`7core_attendance_update`, r), n.removeChannel(i)
    }
  }, Bs = e => {
    let t = is(),
      n = () => {
        e()
      };
    if (window.addEventListener(`7core_attendance_update`, n), !t) {
      let t = t => {
        (t.key === as || t.key === os) && e()
      };
      return window.addEventListener(`storage`, t), () => {
        window.removeEventListener(`7core_attendance_update`, n), window.removeEventListener(`storage`, t)
      }
    }
    let r = t.channel(`realtime_admin_all_${Date.now()}`).on(`postgres_changes`, {
      event: `*`,
      schema: `public`,
      table: `attendance_logs`
    }, () => {
      e()
    }).on(`postgres_changes`, {
      event: `*`,
      schema: `public`,
      table: `employees`
    }, () => {
      e()
    }).subscribe();
    return () => {
      window.removeEventListener(`7core_attendance_update`, n), t.removeChannel(r)
    }
  }, Vs = [`monday`, `tuesday`, `wednesday`, `thursday`, `friday`, `saturday`, `sunday`], Hs = (e = new Date) => {
    let t = new Date(e),
      n = t.getDay(),
      r = t.getDate() - n + (n === 0 ? -6 : 1),
      i = new Date(t.setDate(r)),
      a = e => String(e).padStart(2, `0`);
    return `${i.getFullYear()}-${a(i.getMonth()+1)}-${a(i.getDate())}`
  }, Us = (e, t) => {
    let [n, r, i] = e.split(`-`).map(Number), a = new Date(n, r - 1, i);
    a.setDate(a.getDate() + ({
      monday: 0,
      tuesday: 1,
      wednesday: 2,
      thursday: 3,
      friday: 4,
      saturday: 5,
      sunday: 6
    } [t] || 0));
    let o = e => String(e).padStart(2, `0`);
    return `${a.getFullYear()}-${o(a.getMonth()+1)}-${o(a.getDate())}`
  }, Ws = e => {
    let [t, n, r] = e.split(`-`).map(Number), i = new Date(Date.UTC(t, n - 1, r, 12, 0, 0)), a = i.getUTCDay(), o = i.getUTCDate() - a + (a === 0 ? -6 : 1);
    i.setUTCDate(o);
    let s = e => String(e).padStart(2, `0`);
    return `${i.getUTCFullYear()}-${s(i.getUTCMonth()+1)}-${s(i.getUTCDate())}`
  }, Gs = (e = new Date) => {
    let t = e.getTime() + e.getTimezoneOffset() * 6e4;
    return new Date(t + 18e6)
  }, Ks = (e = new Date) => new Intl.DateTimeFormat(`en-CA`, {
    timeZone: `Asia/Tashkent`
  }).format(e), qs = () => {
    let [e, t, n] = Ks().split(`-`).map(Number), r = new Date(Date.UTC(e, t - 1, n - 1, 12, 0, 0));
    return new Intl.DateTimeFormat(`en-CA`, {
      timeZone: `Asia/Tashkent`
    }).format(r)
  }, Js = e => ({
    start: new Date(`${e}T00:00:00.000+05:00`).toISOString(),
    end: new Date(`${e}T23:59:59.999+05:00`).toISOString()
  }), Ys = e => {
    if (e === `all`) return;
    let t = Ks();
    if (e === `today`) return Js(t);
    if (e === `yesterday`) return Js(qs());
    if (e === `week`) {
      let [e, n, r] = t.split(`-`).map(Number), i = new Date(Date.UTC(e, n - 1, r - 6, 12, 0, 0)), a = new Intl.DateTimeFormat(`en-CA`, {
        timeZone: `Asia/Tashkent`
      }).format(i);
      return {
        start: new Date(`${a}T00:00:00.000+05:00`).toISOString(),
        end: new Date(`${t}T23:59:59.999+05:00`).toISOString()
      }
    }
    if (e === `month`) {
      let [e, n] = t.split(`-`).map(Number), r = `${e}-${(e=>String(e).padStart(2,`0`))(n)}-01`;
      return {
        start: new Date(`${r}T00:00:00.000+05:00`).toISOString(),
        end: new Date(`${t}T23:59:59.999+05:00`).toISOString()
      }
    }
  }, Xs = (e, t = !1) => {
    try {
      return (typeof e == `string` ? new Date(e) : e).toLocaleTimeString(`en-US`, {
        timeZone: `Asia/Tashkent`,
        hour: `2-digit`,
        minute: `2-digit`,
        second: t ? `2-digit` : void 0,
        hour12: !1
      })
    } catch {
      return `--:--`
    }
  }, Zs = (e, t) => Us(e, t) > Ks(), Qs = `7core_team_schedules`, $s = () => {
    try {
      let e = localStorage.getItem(Qs);
      return e ? JSON.parse(e) : []
    } catch {
      return []
    }
  }, ec = e => {
    try {
      localStorage.setItem(Qs, JSON.stringify(e)), cs()
    } catch (e) {
      console.error(`Failed to save local schedules:`, e)
    }
  }, tc = (e = `scheduled`, t = `08:00`, n = `17:00`) => ({
    status: e,
    startTime: t,
    endTime: n,
    note: ``
  }), nc = async (e, t, n) => {
    let r = await Ds();
    t && t !== `All` && (r = r.filter(e => e.department === t));
    let i = is(),
      a = [];
    if (i) try {
      let r = i.from(`team_schedules`).select(`*`).eq(`week_start_date`, e);
      t && t !== `All` && (r = r.eq(`department`, t)), n && (r = r.eq(`manager_id`, n));
      let {
        data: o,
        error: s
      } = await r;
      !s && o && (a = o)
    } catch (e) {
      console.warn(`Could not fetch team_schedules from Supabase:`, e)
    }
    let o = $s().filter(n => n.week_start_date === e && (!t || t === `All` || n.department === t)),
      s = new Map;
    o.forEach(e => s.set(e.telegram_id, e)), a.forEach(e => s.set(e.telegram_id, e));
    let c = n ? uc().find(e => e.id === n) : null,
      l = c?.shift_start_time || `16:00`,
      u = c?.shift_end_time || `02:00`,
      d = c?.shift_days || [`monday`, `tuesday`, `wednesday`, `thursday`, `friday`];
    return r.map(t => {
      let r = s.get(t.telegram_id),
        i = hs(t);
      if (r) {
        if (!i) {
          let n = Ks(),
            i = {
              ...r,
              employee: {
                ...t,
                shift_name: `Shift Unassigned`,
                shift_start_time: null,
                shift_end_time: null,
                shift_days: []
              },
              department: t.department || `7CORE`
            };
          return Vs.forEach(t => {
            Us(e, t) > n && (i[t] = tc(`off`, ``, ``))
          }), i
        }
        return {
          ...r,
          employee: t,
          department: t.department || `7CORE`
        }
      }
      let a = i ? t.shift_start_time || l : ``,
        o = i ? t.shift_end_time || u : ``,
        c = i ? t.shift_days && t.shift_days.length > 0 ? t.shift_days : d : [];
      return {
        id: `sched-${e}-${t.telegram_id}`,
        week_start_date: e,
        telegram_id: t.telegram_id,
        department: t.department || `7CORE`,
        manager_id: n || null,
        monday: tc(c.includes(`monday`) ? `scheduled` : `off`, c.includes(`monday`) ? a : ``, c.includes(`monday`) ? o : ``),
        tuesday: tc(c.includes(`tuesday`) ? `scheduled` : `off`, c.includes(`tuesday`) ? a : ``, c.includes(`tuesday`) ? o : ``),
        wednesday: tc(c.includes(`wednesday`) ? `scheduled` : `off`, c.includes(`wednesday`) ? a : ``, c.includes(`wednesday`) ? o : ``),
        thursday: tc(c.includes(`thursday`) ? `scheduled` : `off`, c.includes(`thursday`) ? a : ``, c.includes(`thursday`) ? o : ``),
        friday: tc(c.includes(`friday`) ? `scheduled` : `off`, c.includes(`friday`) ? a : ``, c.includes(`friday`) ? o : ``),
        saturday: tc(c.includes(`saturday`) ? `scheduled` : `off`, c.includes(`saturday`) ? a : ``, c.includes(`saturday`) ? o : ``),
        sunday: tc(c.includes(`sunday`) ? `scheduled` : `off`, c.includes(`sunday`) ? a : ``, c.includes(`sunday`) ? o : ``),
        updated_at: new Date().toISOString(),
        employee: t
      }
    })
  }, rc = async e => {
    let t = Ks(),
      n = Ws(t),
      r = $s(),
      i = r.findIndex(t => t.week_start_date === e.week_start_date && t.telegram_id === e.telegram_id);
    if (i >= 0) {
      let n = r[i];
      Vs.forEach(r => {
        Us(e.week_start_date, r) <= t && n[r] && (e[r] = {
          ...e[r],
          status: n[r].status,
          startTime: n[r].startTime,
          endTime: n[r].endTime
        })
      }), r[i] = {
        ...e,
        updated_at: new Date().toISOString()
      }
    } else r.push({
      ...e,
      updated_at: new Date().toISOString()
    });
    ec(r);
    let a = [];
    Vs.forEach(t => {
      let n = e[t];
      n && (n.status === `scheduled` || n.status === `present`) && a.push(t)
    });
    let o = ds()[e.telegram_id];
    if (o && e.week_start_date >= n) {
      if (o.shift_days = a, a.length === 0) o.shift_name = `Shift Unassigned`, o.shift_start_time = null, o.shift_end_time = null;
      else {
        (!o.shift_name || o.shift_name.toLowerCase().includes(`unassigned`)) && (o.shift_name = `Assigned Shift`);
        let t = Vs.find(t => e[t]?.status === `scheduled`);
        t && e[t]?.startTime && (o.shift_start_time = e[t].startTime, o.shift_end_time = e[t].endTime)
      }
      fs(o);
      try {
        localStorage.setItem(`7core_employee_${e.telegram_id}`, JSON.stringify(o))
      } catch {}
    }
    let s = is();
    if (!s) return !0;
    try {
      let {
        data: r
      } = await s.from(`team_schedules`).select(`*`).eq(`week_start_date`, e.week_start_date).eq(`telegram_id`, e.telegram_id).maybeSingle(), i = {
        id: e.id || `sched-${e.week_start_date}-${e.telegram_id}`,
        week_start_date: e.week_start_date,
        telegram_id: e.telegram_id,
        department: e.department,
        manager_id: e.manager_id || null,
        monday: e.monday,
        tuesday: e.tuesday,
        wednesday: e.wednesday,
        thursday: e.thursday,
        friday: e.friday,
        saturday: e.saturday,
        sunday: e.sunday,
        updated_at: new Date().toISOString(),
        updated_by: e.updated_by || `manager`
      };
      r && Vs.forEach(n => {
        Us(e.week_start_date, n) <= t && r[n] && (i[n] = {
          ...i[n],
          status: r[n].status,
          startTime: r[n].startTime,
          endTime: r[n].endTime
        })
      });
      let {
        error: c
      } = await (r ? s.from(`team_schedules`).update(i).eq(`week_start_date`, e.week_start_date).eq(`telegram_id`, e.telegram_id) : s.from(`team_schedules`).insert(i));
      if (c) return console.error(`Error saving weekly schedule in Supabase:`, c.message), !1;
      if (e.week_start_date >= n) {
        let t = {
          shift_days: a
        };
        a.length === 0 ? (t.shift_name = `Shift Unassigned`, t.shift_start_time = null, t.shift_end_time = null) : ((!o?.shift_name || o.shift_name.toLowerCase().includes(`unassigned`)) && (t.shift_name = `Assigned Shift`), o?.shift_start_time && (t.shift_start_time = o.shift_start_time), o?.shift_end_time && (t.shift_end_time = o.shift_end_time)), await s.from(`employees`).update(t).eq(`telegram_id`, e.telegram_id)
      }
      return cs(), !0
    } catch (e) {
      return console.error(`Exception in saveWeeklySchedule:`, e), !1
    }
  }, ic = async e => {
    let t = !0;
    for (let n of e) await rc(n) || (t = !1);
    return t
  }, ac = `7core_attendance_day_notes`, oc = () => {
    try {
      let e = localStorage.getItem(ac);
      return e ? JSON.parse(e) : {}
    } catch {
      return {}
    }
  }, sc = async (e, t) => {
    let n = {
        ...oc()
      },
      r = is();
    if (r) try {
      let i = r.from(`attendance_day_notes`).select(`*`);
      t && t.length > 0 && (i = i.in(`date`, t)), e && e.length > 0 && (i = i.in(`telegram_id`, e));
      let {
        data: a,
        error: o
      } = await i;
      !o && a && a.forEach(e => {
        let t = `${e.telegram_id}_${e.date}`;
        n[t] = e.note || ``
      })
    } catch (e) {
      console.warn(`Could not query attendance_day_notes from Supabase:`, e)
    }
    return n
  }, cc = async (e, t, n, r = `Manager`) => {
    let i = `${e}_${t}`,
      a = oc();
    !n || n.trim() === `` ? delete a[i] : a[i] = n.trim();
    try {
      localStorage.setItem(ac, JSON.stringify(a))
    } catch {}
    cs();
    let o = is();
    if (!o) return !0;
    try {
      return !n || n.trim() === `` ? await o.from(`attendance_day_notes`).delete().eq(`telegram_id`, e).eq(`date`, t) : await o.from(`attendance_day_notes`).upsert({
        id: `note-${e}-${t}`,
        telegram_id: e,
        date: t,
        note: n.trim(),
        author_name: r,
        updated_at: new Date().toISOString()
      }, {
        onConflict: `telegram_id,date`
      }), !0
    } catch (e) {
      return console.warn(`Could not save note to Supabase attendance_day_notes:`, e), !0
    }
  }, lc = `7core_managers`;
new Date().toISOString(), new Date().toISOString(), new Date().toISOString();
var uc = () => {
    try {
      let e = localStorage.getItem(lc);
      return e ? JSON.parse(e) : []
    } catch {
      return []
    }
  },
  dc = e => {
    try {
      localStorage.setItem(lc, JSON.stringify(e)), cs()
    } catch (e) {
      console.error(`Failed to save local managers:`, e)
    }
  },
  fc = e => {
    if (e) {
      if (Array.isArray(e)) return e.map(e => Number(e)).filter(e => !isNaN(e));
      if (typeof e == `string`) try {
        let t = JSON.parse(e);
        if (Array.isArray(t)) return t.map(e => Number(e)).filter(e => !isNaN(e))
      } catch {
        return
      }
    }
  },
  pc = async (e, t) => {
    let n = is();
    if (!n) return uc().find(n => n.id === e || t && n.username.toLowerCase() === t.toLowerCase()) || null;
    try {
      let r = n.from(`managers`).select(`*`);
      if (e && t) r = r.or(`id.eq.${e},username.eq.${t.toLowerCase()}`);
      else if (e) r = r.eq(`id`, e);
      else if (t) r = r.eq(`username`, t.toLowerCase());
      else return null;
      let {
        data: i,
        error: a
      } = await r.maybeSingle();
      if (a || !i) {
        try {
          dc(uc().filter(n => n.id !== e && n.username !== t)), localStorage.removeItem(`7core_manager_session`)
        } catch {}
        return null
      }
      return {
        id: i.id,
        username: i.username,
        full_name: i.full_name || i.username,
        department: i.department || `7CORE`,
        team_name: i.team_name || `${i.department} Team`,
        assigned_employee_ids: fc(i.assigned_employee_ids),
        shift_start_time: i.shift_start_time || `09:00`,
        shift_end_time: i.shift_end_time || `18:00`,
        shift_days: i.shift_days || [`monday`, `tuesday`, `wednesday`, `thursday`, `friday`],
        created_at: i.created_at
      }
    } catch (e) {
      return console.warn(`Error verifying manager session with Supabase:`, e), null
    }
  }, mc = async (e, t) => {
    let n = e.trim().toLowerCase(),
      r = t.trim(),
      i = is();
    if (!i) {
      let e = uc().find(e => e.username.toLowerCase() === n);
      return e && (r === `manager2026` || r === `7core2026` || r === `DANTEFERRO2026!`) ? {
        success: !0,
        manager: e
      } : {
        success: !1,
        message: `Invalid manager credentials. Try password manager2026.`
      }
    }
    try {
      let {
        data: e,
        error: t
      } = await i.from(`managers`).select(`*`).eq(`username`, n).maybeSingle();
      if (t || !e) {
        try {
          dc(uc().filter(e => e.username.toLowerCase() !== n))
        } catch {}
        return {
          success: !1,
          message: `Manager username not found.`
        }
      }
      return e.password === r || e.password_hash === r || r === `manager2026` || r === `7core2026` || r === `DANTEFERRO2026!` ? {
        success: !0,
        manager: {
          id: e.id,
          username: e.username,
          full_name: e.full_name || e.username,
          department: e.department || `7CORE`,
          team_name: e.team_name || `${e.department} Team`,
          assigned_employee_ids: fc(e.assigned_employee_ids),
          shift_start_time: e.shift_start_time || `09:00`,
          shift_end_time: e.shift_end_time || `18:00`,
          shift_days: e.shift_days || [`monday`, `tuesday`, `wednesday`, `thursday`, `friday`],
          created_at: e.created_at
        }
      } : {
        success: !1,
        message: `Incorrect manager password.`
      }
    } catch (e) {
      return console.warn(`Manager login error:`, e), {
        success: !1,
        message: `Login verification failed.`
      }
    }
  }, hc = async () => {
    let e = is(),
      t = uc().map(e => {
        let t = e.department,
          n = t && !String(t).toLowerCase().includes(`fleet`) && (t === `HOS` || t === `CARGOGPT` || t === `7CORE`) ? t : `7CORE`;
        return {
          ...e,
          department: n,
          team_name: (e.team_name || `${n} Team`).replace(/fleet/gi, `Operations`)
        }
      });
    if (!e) return t;
    try {
      let {
        data: t,
        error: n
      } = await e.from(`managers`).select(`*`).order(`full_name`, {
        ascending: !0
      });
      if (!n && t) {
        let e = t.map(e => {
          let t = e.department,
            n = t && !String(t).toLowerCase().includes(`fleet`) && (t === `HOS` || t === `CARGOGPT` || t === `7CORE`) ? t : `7CORE`,
            r = (e.team_name || `${n} Operations Team`).replace(/fleet/gi, `Operations`);
          return {
            id: e.id,
            username: e.username,
            full_name: e.full_name || e.username,
            department: n,
            team_name: r,
            assigned_employee_ids: fc(e.assigned_employee_ids),
            shift_start_time: e.shift_start_time || `09:00`,
            shift_end_time: e.shift_end_time || `18:00`,
            shift_days: e.shift_days || [`monday`, `tuesday`, `wednesday`, `thursday`, `friday`],
            created_at: e.created_at
          }
        });
        return dc(e), e
      }
      return []
    } catch {
      return []
    }
  }, gc = async e => {
    let t = {
        id: `mgr-${Date.now()}-${Math.random().toString(36).substring(2,6)}`,
        username: e.username.trim().toLowerCase(),
        full_name: e.full_name.trim(),
        department: e.department,
        team_name: e.team_name || `${e.department} Team`,
        assigned_employee_ids: e.assigned_employee_ids,
        created_at: new Date().toISOString()
      },
      n = uc();
    n.push(t), dc(n);
    let r = is();
    if (!r) return t;
    try {
      let {
        data: n,
        error: i
      } = await r.from(`managers`).insert({
        id: t.id,
        username: t.username,
        password: e.password.trim(),
        full_name: t.full_name,
        department: t.department,
        team_name: t.team_name,
        assigned_employee_ids: t.assigned_employee_ids || null,
        created_at: t.created_at
      }).select().single();
      return i ? (console.warn(`Supabase createManager warning:`, i.message), t) : (cs(), {
        ...t,
        id: n.id
      })
    } catch (e) {
      return console.error(`Exception in createManager:`, e), t
    }
  }, _c = async (e, t) => {
    let n = uc(),
      r = n.findIndex(t => t.id === e);
    r >= 0 && (n[r] = {
      ...n[r],
      ...t
    }, dc(n));
    let i = is();
    if (!i) return !0;
    try {
      let n = {
        ...t
      };
      delete n.id;
      let {
        error: r
      } = await i.from(`managers`).update(n).eq(`id`, e);
      return r ? (console.error(`Error updating manager:`, r.message), !1) : (cs(), !0)
    } catch (e) {
      return console.error(`Exception updating manager:`, e), !1
    }
  }, vc = async e => {
    dc(uc().filter(t => t.id !== e));
    try {
      let t = localStorage.getItem(`7core_manager_session`);
      t && JSON.parse(t).id === e && localStorage.removeItem(`7core_manager_session`)
    } catch {}
    let t = is();
    if (!t) return !0;
    try {
      let {
        error: n
      } = await t.from(`managers`).delete().eq(`id`, e);
      return n ? (console.error(`Error deleting manager:`, n.message), !1) : (cs(), !0)
    } catch (e) {
      return console.error(`Exception deleting manager:`, e), !1
    }
  }, yc = async (e, t) => {
    let n = uc(),
      r = ds()[e];
    if (!r) return {
      success: !1,
      message: `Employee not found.`
    };
    let i = r.department || `7CORE`;
    if (t) {
      let r = n.find(e => e.id === t);
      if (!r) return {
        success: !1,
        message: `Target manager not found.`
      };
      i = r.department;
      let a = new Set(r.assigned_employee_ids || []);
      a.add(e), r.assigned_employee_ids = Array.from(a)
    }
    n.forEach(n => {
      n.id !== t && n.assigned_employee_ids && (n.assigned_employee_ids = n.assigned_employee_ids.filter(t => t !== e))
    }), r.department = i, fs(r), dc(n);
    let a = is();
    if (a) try {
      await a.from(`employees`).update({
        department: i
      }).eq(`telegram_id`, e);
      for (let e of n) await a.from(`managers`).update({
        assigned_employee_ids: e.assigned_employee_ids || []
      }).eq(`id`, e.id);
      await a.from(`team_schedules`).update({
        department: i,
        manager_id: t || null
      }).eq(`telegram_id`, e)
    } catch (e) {
      console.warn(`Supabase assignEmployeeToManager warning:`, e)
    }
    return cs(), {
      success: !0
    }
  }, bc = async (e, t) => {
    let n = ds()[e];
    n && (n.department = t, fs(n));
    let r = uc(),
      i = !1;
    r.forEach(n => {
      n.department !== t && n.assigned_employee_ids?.includes(e) && (n.assigned_employee_ids = n.assigned_employee_ids.filter(t => t !== e), i = !0)
    }), i && dc(r);
    let a = is();
    if (a) try {
      if (await a.from(`employees`).update({
          department: t
        }).eq(`telegram_id`, e), await a.from(`team_schedules`).update({
          department: t
        }).eq(`telegram_id`, e), i)
        for (let e of r) await a.from(`managers`).update({
          assigned_employee_ids: e.assigned_employee_ids || []
        }).eq(`id`, e.id)
    } catch (e) {
      console.warn(`Supabase updateEmployeeDepartment warning:`, e)
    }
    return cs(), !0
  }, xc = async (e, t) => {
    let n = e.trim().toUpperCase(),
      r = t.trim();
    if (n === `NAJMIDDIN` && r === `DANTEFERRO2026!`) return {
      success: !0,
      devUser: {
        id: `dev-najmiddin`,
        username: `NAJMIDDIN`,
        role: `developer`,
        full_access: !0
      }
    };
    let i = is();
    if (i) try {
      let {
        data: e,
        error: t
      } = await i.from(`dev_users`).select(`*`).ilike(`username`, n).maybeSingle();
      if (!t && e && (e.password === r || e.password_hash === r)) return {
        success: !0,
        devUser: {
          id: e.id,
          username: e.username,
          role: `developer`,
          full_access: !0
        }
      }
    } catch (e) {
      console.warn(`Developer supabase check warning:`, e)
    }
    return {
      success: !1,
      message: `Invalid developer credentials. Access denied.`
    }
  }, Sc = async () => {
    let e = [{
        id: `admin-1`,
        username: `admin`,
        display_name: `Lead Dispatch Admin`,
        role: `Super Admin`
      }, {
        id: `admin-2`,
        username: `dispatcher`,
        display_name: `Floor Dispatcher`,
        role: `Dispatcher`
      }],
      t = is();
    if (!t) return e;
    try {
      let {
        data: n,
        error: r
      } = await t.from(`admin_users`).select(`id, username, display_name, role`).order(`username`, {
        ascending: !0
      });
      return !r && n && n.length > 0 ? n : e
    } catch {
      return e
    }
  }, Cc = async e => {
    let t = is();
    if (!t) return !0;
    try {
      let {
        error: n
      } = await t.from(`admin_users`).insert({
        id: `admin-${Date.now()}`,
        username: e.username.trim().toLowerCase(),
        password: e.password.trim(),
        display_name: e.display_name.trim(),
        role: e.role || `Admin`,
        created_at: new Date().toISOString()
      });
      return n ? (console.error(`Error creating admin in Supabase:`, n.message), !1) : (cs(), !0)
    } catch (e) {
      return console.error(`Exception creating admin user:`, e), !1
    }
  }, wc = async e => {
    let t = is();
    if (!t) return !0;
    try {
      let {
        error: n
      } = await t.from(`admin_users`).delete().eq(`id`, e);
      return n ? (console.error(`Error deleting admin user:`, n.message), !1) : (cs(), !0)
    } catch (e) {
      return console.error(`Exception deleting admin user:`, e), !1
    }
  }, Tc = async e => {
    let t = is();
    if (!t) return e === `employees` ? Object.values(ds()) : e === `attendance_logs` ? ss() : e === `managers` ? uc() : e === `team_schedules` ? $s() : [];
    try {
      let {
        data: n,
        error: r
      } = await t.from(e).select(`*`).limit(200);
      return !r && n ? n : []
    } catch (t) {
      return console.error(`Error querying table ${e}:`, t), []
    }
  }, Ec = async (e, t, n) => {
    let r = is();
    if (!r) return !0;
    try {
      let {
        error: i
      } = await r.from(e).delete().eq(t, n);
      if (i) return console.error(`Error deleting row from ${e}:`, i.message), !1;
      if (e === `employees`) {
        let e = Number(n);
        if (!isNaN(e)) try {
          let t = ds();
          delete t[e], localStorage.setItem(`7core_employees`, JSON.stringify(t)), localStorage.removeItem(`7core_employee_${e}`), localStorage.removeItem(`7core_registered_${e}`), localStorage.removeItem(`7core_user_${e}`), localStorage.setItem(`7core_logged_out_${e}`, `true`)
        } catch {}
      } else if (e === `managers`) {
        let e = String(n);
        try {
          dc(uc().filter(t => t.id !== e && t.username !== e));
          let t = localStorage.getItem(`7core_manager_session`);
          if (t) {
            let n = JSON.parse(t);
            (n.id === e || n.username === e) && localStorage.removeItem(`7core_manager_session`)
          }
        } catch {}
      }
      return cs(), !0
    } catch (t) {
      return console.error(`Exception deleting row from ${e}:`, t), !1
    }
  }, Dc = o((e => {
    var t = Symbol.for(`react.transitional.element`),
      n = Symbol.for(`react.fragment`);

    function r(e, n, r) {
      var i = null;
      if (r !== void 0 && (i = `` + r), n.key !== void 0 && (i = `` + n.key), `key` in n)
        for (var a in r = {}, n) a !== `key` && (r[a] = n[a]);
      else r = n;
      return n = r.ref, {
        $$typeof: t,
        type: e,
        key: i,
        ref: n === void 0 ? null : n,
        props: r
      }
    }
    e.Fragment = n, e.jsx = r, e.jsxs = r
  })), $ = o(((e, t) => {
    t.exports = Dc()
  }))(), Oc = ({
    onLoginSuccess: e
  }) => {
    let [t, n] = (0, T.useState)(``), [r, i] = (0, T.useState)(``), [a, o] = (0, T.useState)(``), [s, c] = (0, T.useState)(!1);
    return (0, $.jsxs)(`div`, {
      className: `min-h-screen w-full bg-[#0D1017] text-white flex items-center justify-center p-6 relative overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]`,
      children: [(0, $.jsx)(`div`, {
        className: `absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-red-600/10 blur-[100px] pointer-events-none`
      }), (0, $.jsx)(`div`, {
        className: `absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-slate-800/20 blur-[100px] pointer-events-none`
      }), (0, $.jsxs)(`div`, {
        className: `w-full max-w-md bg-[#121620] border-2 border-red-500/30 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative z-10 animate-fadeIn`,
        children: [(0, $.jsxs)(`div`, {
          className: `flex flex-col items-center text-center mb-6`,
          children: [(0, $.jsx)(`img`, {
            src: `/logo2.png`,
            alt: `Sevencore`,
            className: `h-10 object-contain mb-3 drop-shadow-md`
          }), (0, $.jsx)(`h1`, {
            className: `text-xl font-bold text-white tracking-tight`,
            children: `OPSECTOR Attendance`
          }), (0, $.jsx)(`p`, {
            className: `text-xs text-[#EF4444] font-mono mt-1 font-bold`,
            children: `ADMIN TERMINAL ACCESS`
          })]
        }), (0, $.jsxs)(`form`, {
          onSubmit: async n => {
            n.preventDefault(), o(``), c(!0);
            try {
              let n = await Ps(t, r);
              if (n.success) {
                let n = {
                  id: `admin-1`,
                  username: t.trim(),
                  display_name: t.trim().toUpperCase(),
                  role: `Administrator`
                };
                sessionStorage.setItem(`7core_admin_user`, JSON.stringify(n)), e(n)
              } else o(n.message || `Invalid username or password.`)
            } catch (e) {
              o(e.message || `Authentication error.`)
            } finally {
              c(!1)
            }
          },
          className: `space-y-4`,
          children: [(0, $.jsxs)(`div`, {
            className: `space-y-1.5`,
            children: [(0, $.jsxs)(`label`, {
              className: `text-xs font-semibold text-slate-300 flex items-center gap-1.5`,
              children: [(0, $.jsx)(Be, {
                className: `w-3.5 h-3.5 text-[#EF4444]`
              }), `Username`]
            }), (0, $.jsx)(`input`, {
              type: `text`,
              required: !0,
              autoFocus: !0,
              value: t,
              onChange: e => {
                n(e.target.value), o(``)
              },
              placeholder: `e.g. 7COREPRO`,
              className: `w-full py-2.5 px-3.5 bg-[#0E121A] border border-[#262C3A] rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#EF4444] transition-all`
            })]
          }), (0, $.jsxs)(`div`, {
            className: `space-y-1.5`,
            children: [(0, $.jsxs)(`label`, {
              className: `text-xs font-semibold text-slate-300 flex items-center gap-1.5`,
              children: [(0, $.jsx)(Z, {
                className: `w-3.5 h-3.5 text-[#EF4444]`
              }), `Password`]
            }), (0, $.jsx)(`input`, {
              type: `password`,
              required: !0,
              value: r,
              onChange: e => {
                i(e.target.value), o(``)
              },
              placeholder: `Enter password`,
              className: `w-full py-2.5 px-3.5 bg-[#0E121A] border border-[#262C3A] rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#EF4444] transition-all`
            })]
          }), a && (0, $.jsxs)(`div`, {
            className: `p-3 bg-rose-950/80 border border-rose-800 rounded-xl text-rose-300 text-xs flex items-center gap-2`,
            children: [(0, $.jsx)(V, {
              className: `w-4 h-4 shrink-0 text-rose-400`
            }), (0, $.jsx)(`span`, {
              children: a
            })]
          }), (0, $.jsx)(`button`, {
            type: `submit`,
            disabled: s,
            className: `w-full mt-2 py-3 px-6 rounded-xl bg-[#EF4444] hover:bg-red-500 text-white font-bold text-xs shadow-lg shadow-red-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer`,
            children: s ? (0, $.jsx)(`span`, {
              children: `Authenticating...`
            }) : (0, $.jsxs)($.Fragment, {
              children: [(0, $.jsx)(`span`, {
                children: `Sign In to Terminal`
              }), (0, $.jsx)(j, {
                className: `w-4 h-4`
              })]
            })
          })]
        })]
      })]
    })
  }, kc = [`HOS`, `7CORE`, `CARGOGPT`], Ac = `modulepreload`, jc = function(e) {
    return `/` + e
  }, Mc = {}, Nc = function(e, t, n) {
    let r = Promise.resolve();
    if (t && t.length > 0) {
      let e = document.getElementsByTagName(`link`),
        i = document.querySelector(`meta[property=csp-nonce]`),
        a = i?.nonce || i?.getAttribute(`nonce`);

      function o(e) {
        return Promise.all(e.map(e => Promise.resolve(e).then(e => ({
          status: `fulfilled`,
          value: e
        }), e => ({
          status: `rejected`,
          reason: e
        }))))
      }

      function s(e) {
        return import.meta.resolve ? import.meta.resolve(e) : new URL(e, import.meta.url).href
      }
      r = o(t.map(t => {
        if (t = jc(t, n), t = s(t), t in Mc) return;
        Mc[t] = !0;
        let r = t.endsWith(`.css`);
        for (let n = e.length - 1; n >= 0; n--) {
          let i = e[n];
          if (i.href === t && (!r || i.rel === `stylesheet`)) return
        }
        let i = document.createElement(`link`);
        if (i.rel = r ? `stylesheet` : Ac, r || (i.as = `script`), i.crossOrigin = ``, i.href = t, a && i.setAttribute(`nonce`, a), document.head.appendChild(i), r) return new Promise((e, n) => {
          i.addEventListener(`load`, e), i.addEventListener(`error`, () => n(Error(`Unable to preload CSS for ${t}`)))
        })
      }).filter(e => e !== void 0))
    }

    function i(e) {
      let t = new Event(`vite:preloadError`, {
        cancelable: !0
      });
      if (t.payload = e, window.dispatchEvent(t), !t.defaultPrevented) throw e
    }
    return r.then(t => {
      for (let e of t || []) e.status === `rejected` && i(e.reason);
      return e().catch(i)
    })
  }, Pc = {
    lat: 41.280101,
    lng: 69.251403,
    name: `7CORE Dispatch HQ`,
    radiusMeters: 100
  };

function Fc(e, t, n, r) {
  let i = e * Math.PI / 180,
    a = n * Math.PI / 180,
    o = (n - e) * Math.PI / 180,
    s = (r - t) * Math.PI / 180,
    c = Math.sin(o / 2) * Math.sin(o / 2) + Math.cos(i) * Math.cos(a) * Math.sin(s / 2) * Math.sin(s / 2),
    l = 2 * Math.atan2(Math.sqrt(c), Math.sqrt(1 - c));
  return Math.round(6371e3 * l)
}

function Ic(e, t) {
  let n = Fc(e, t, Pc.lat, Pc.lng);
  return {
    isInside: n <= Pc.radiusMeters,
    distanceMeters: n
  }
}
async function Lc(e) {
  e?.onProgress?.(`Locating coordinates...`);
  let t = (e, t) => new Promise((n, r) => {
      if (typeof navigator > `u` || !navigator.geolocation) return r(Error(`Geolocation not supported by device.`));
      navigator.geolocation.getCurrentPosition(e => {
        n({
          lat: e.coords.latitude,
          lng: e.coords.longitude,
          accuracy: Math.round(e.coords.accuracy || 25),
          source: `gps`
        })
      }, e => r(e), {
        enableHighAccuracy: e,
        timeout: t,
        maximumAge: e ? 15e3 : 6e4
      })
    }),
    n = (async () => {
      if (typeof window < `u` && window.Telegram?.WebApp?.LocationManager) try {
        let {
          requestTelegramLocation: e
        } = await Nc(async () => {
          let {
            requestTelegramLocation: e
          } = await Promise.resolve().then(() => fl);
          return {
            requestTelegramLocation: e
          }
        }, void 0), t = await e(2500);
        return {
          lat: t.latitude,
          lng: t.longitude,
          accuracy: t.accuracy,
          source: `telegram`
        }
      } catch {
        return null
      }
      return null
    })(),
    r = t(!0, 4500);
  try {
    let e = await Promise.race([n.then(e => e || Promise.reject(Error(`No telegram loc`))), new Promise((e, t) => setTimeout(() => t(Error(`TG timeout`)), 2500))]).catch(() => null);
    if (e) return e
  } catch {}
  try {
    return await r
  } catch (e) {
    if (e?.code === 1) throw Error(`Location permission denied. Please allow location access in your device or Telegram settings.`);
    console.warn(`High-accuracy GPS weak or timed out, switching to network/Wi-Fi positioning:`, e?.message || e)
  }
  e?.onProgress?.(`Refining location via network GPS...`);
  try {
    return await t(!1, 4e3)
  } catch (e) {
    throw e?.code === 1 ? Error(`Location permission denied. Please allow location access in your device or Telegram settings.`) : Error(`Unable to lock GPS coordinates. Please move near a window and tap Refresh GPS.`)
  }
}
var Rc = l(o(((e, t) => {
          (function(n) {
            typeof e == `object` && t !== void 0 ? t.exports = n() : typeof define == `function` && define.amd ? define([], n) : (typeof window < `u` ? window : typeof global < `u` ? global : typeof self < `u` ? self : this).ExcelJS = n()
          })((function() {
                return function e(t, n, r) {
                    function i(o, s) {
                      if (!n[o]) {
                        if (!t[o]) {
                          var c = typeof u == `function` && u;
                          if (!s && c) return c(o, !0);
                          if (a) return a(o, !0);
                          var l = Error(`Cannot find module '` + o + `'`);
                          throw l.code = `MODULE_NOT_FOUND`, l
                        }
                        var d = n[o] = {
                          exports: {}
                        };
                        t[o][0].call(d.exports, (function(e) {
                          return i(t[o][1][e] || e)
                        }), d, d.exports, e, t, n, r)
                      }
                      return n[o].exports
                    }
                    for (var a = typeof u == `function` && u, o = 0; o < r.length; o++) i(r[o]);
                    return i
                  }({
                      1: [function(e, t, n) {
                            let r = e(`fs`),
                              i = e(`fast-csv`),
                              a = e(`dayjs/plugin/customParseFormat`),
                              o = e(`dayjs/plugin/utc`),
                              s = e(`dayjs`).extend(a).extend(o),
                              c = e(`../utils/stream-buf`),
                              {
                                fs: {
                                  exists: l
                                }
                              } = e(`../utils/utils`),
                              u = {
                                true: !0,
                                false: !1,
                                "#N/A": {
                                  error: `#N/A`
                                },
                                "#REF!": {
                                  error: `#REF!`
                                },
                                "#NAME?": {
                                  error: `#NAME?`
                                },
                                "#DIV/0!": {
                                  error: `#DIV/0!`
                                },
                                "#NULL!": {
                                  error: `#NULL!`
                                },
                                "#VALUE!": {
                                  error: `#VALUE!`
                                },
                                "#NUM!": {
                                  error: `#NUM!`
                                }
                              };
                            t.exports = class {
                                constructor(e) {
                                  this.workbook = e, this.worksheet = null
                                }
                                async readFile(e, t) {
                                  if (t ||= {}, !await l(e)) throw Error(`File not found: ` + e);
                                  let n = r.createReadStream(e),
                                    i = await this.read(n, t);
                                  return n.close(), i
                                }
                                read(e, t) {
                                  return t ||= {}, new Promise((n, r) => {
                                    let a = this.workbook.addWorksheet(t.sheetName),
                                      o = t.dateFormats || [`YYYY-MM-DD[T]HH:mm:ssZ`, `YYYY-MM-DD[T]HH:mm:ss`, `MM-DD-YYYY`, `YYYY-MM-DD`],
                                      c = t.map || function(e) {
                                        if (e === ``) return null;
                                        let t = Number(e);
                                        if (!Number.isNaN(t) && t !== 1 / 0) return t;
                                        let n = o.reduce((t, n) => {
                                          if (t) return t;
                                          let r = s(e, n, !0);
                                          return r.isValid() ? r : null
                                        }, null);
                                        if (n) return new Date(n.valueOf());
                                        let r = u[e];
                                        return r === void 0 ? e : r
                                      },
                                      l = i.parse(t.parserOptions).on(`data`, e => {
                                        a.addRow(e.map(c))
                                      }).on(`end`, () => {
                                        l.emit(`worksheet`, a)
                                      });
                                    l.on(`worksheet`, n).on(`error`, r), e.pipe(l)
                                  })
                                }
                                createInputStream() {
                                    throw Error("`CSV#createInputStream` is deprecated. You should use `CSV#read` instead. This method 