await js(e.id, {
  timestamp: t,
  action_type: o,
  admin_note: c.trim() || null
}), r(), n()
}
catch (e) {
  console.error(`Failed to update log:`, e)
} finally {
  p(!1)
}
}, className: `p-6 space-y-4`, children: [(0, $.jsxs)(`div`, {
className: `space-y-1.5`,
children: [(0, $.jsx)(`label`, {
className: `text-xs font-semibold text-slate-300`,
children: `Action Type`
}), (0, $.jsxs)(`div`, {
className: `grid grid-cols-2 gap-3`,
children: [(0, $.jsxs)(`button`, {
type: `button`,
onClick: () => s(`check_in`),
className: `py-2.5 px-4 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-all ${o===`check_in`?`bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-sm`:`bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600`}`,
children: [(0, $.jsx)(`span`, {
className: `w-2 h-2 rounded-full bg-emerald-400`
}), `CHECK IN`]
}), (0, $.jsxs)(`button`, {
type: `button`,
onClick: () => s(`check_out`),
className: `py-2.5 px-4 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-all ${o===`check_out`?`bg-slate-700 border-slate-600 text-white shadow-sm`:`bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600`}`,
children: [(0, $.jsx)(`span`, {
className: `w-2 h-2 rounded-full bg-slate-400`
}), `CHECK OUT`]
})]
})]
}), (0, $.jsxs)(`div`, {
className: `space-y-1.5`,
children: [(0, $.jsx)(`label`, {
className: `text-xs font-semibold text-slate-300`,
children: `Timestamp (Date & Time)`
}), (0, $.jsx)(`input`, {
type: `datetime-local`,
required: !0,
value: i,
onChange: e => a(e.target.value),
className: `w-full py-2.5 px-3.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 font-mono`
})]
}), (0, $.jsxs)(`div`, {
className: `space-y-1.5`,
children: [(0, $.jsxs)(`label`, {
className: `text-xs font-semibold text-slate-300 flex items-center gap-1.5`,
children: [(0, $.jsx)(oe, {
className: `w-3.5 h-3.5 text-slate-400`
}), `Admin Audit Note / Reason`]
}), (0, $.jsx)(`textarea`, {
rows: 2,
value: c,
onChange: e => l(e.target.value),
placeholder: `e.g. Adjusted time by 15 mins per manager request`,
className: `w-full py-2 px-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500`
})]
}), u ? (0, $.jsxs)(`div`, {
className: `p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl space-y-2`,
children: [(0, $.jsxs)(`p`, {
className: `text-xs text-rose-300 flex items-center gap-1.5 font-medium`,
children: [(0, $.jsx)(Le, {
className: `w-4 h-4 shrink-0`
}), `Are you sure you want to permanently delete this attendance record?`]
}), (0, $.jsxs)(`div`, {
className: `flex items-center gap-2 pt-1`,
children: [(0, $.jsx)(`button`, {
type: `button`,
onClick: async () => {
p(!0);
try {
  await Ms(e.id), r(), n()
} catch (e) {
  console.error(`Failed to delete log:`, e)
} finally {
  p(!1)
}
},
disabled: f,
className: `px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer`,
children: `Yes, Delete Record`
}), (0, $.jsx)(`button`, {
type: `button`,
onClick: () => d(!1),
className: `px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs transition-colors cursor-pointer`,
children: `Cancel`
})]
})]
}) : (0, $.jsxs)(`div`, {
className: `pt-2 flex items-center justify-between border-t border-slate-800`,
children: [(0, $.jsxs)(`button`, {
type: `button`,
onClick: () => d(!0),
className: `text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1.5 py-1 px-2 rounded hover:bg-rose-500/10 transition-colors cursor-pointer`,
children: [(0, $.jsx)(Pe, {
className: `w-3.5 h-3.5`
}), `Delete Record`]
}), (0, $.jsxs)(`div`, {
className: `flex items-center gap-2`,
children: [(0, $.jsx)(`button`, {
type: `button`,
onClick: n,
className: `px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition-colors cursor-pointer`,
children: `Cancel`
}), (0, $.jsxs)(`button`, {
type: `submit`,
disabled: f,
className: `px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 transition-all cursor-pointer`,
children: [(0, $.jsx)(I, {
className: `w-4 h-4`
}), `Save Changes`]
})]
})]
})]
})]
})
})
}, Gc = ({
  employee: e,
  isOpen: t,
  onClose: n,
  onSaved: r
}) => {
  if (!t) return null;
  let [i, a] = (0, T.useState)(e.first_name), [o, s] = (0, T.useState)(e.last_name || ``), [c, l] = (0, T.useState)(e.department || `7CORE`), [u, d] = (0, T.useState)(!1);
  return (0, $.jsx)(`div`, {
    className: `fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs`,
    children: (0, $.jsxs)(`div`, {
      className: `bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden text-slate-100 animate-fadeIn`,
      children: [(0, $.jsxs)(`div`, {
        className: `flex items-center justify-between px-6 py-4 border-b border-slate-800`,
        children: [(0, $.jsxs)(`h3`, {
          className: `text-base font-bold text-white flex items-center gap-2`,
          children: [(0, $.jsx)(Be, {
            className: `w-4 h-4 text-blue-400`
          }), `Edit Employee Profile`]
        }), (0, $.jsx)(`button`, {
          onClick: n,
          className: `text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors`,
          children: (0, $.jsx)(He, {
            className: `w-5 h-5`
          })
        })]
      }), (0, $.jsxs)(`form`, {
        onSubmit: async t => {
          t.preventDefault(), d(!0);
          try {
            await ks(e.telegram_id, {
              first_name: i.trim(),
              last_name: o.trim() || null,
              department: c
            }), r(), n()
          } catch (e) {
            console.error(`Failed to update employee:`, e)
          } finally {
            d(!1)
          }
        },
        className: `p-6 space-y-4`,
        children: [(0, $.jsxs)(`div`, {
          className: `text-xs text-slate-400 font-mono bg-slate-800/60 p-2.5 rounded-xl`,
          children: [`Telegram ID: `, (0, $.jsx)(`span`, {
            className: `text-blue-400 font-bold`,
            children: e.telegram_id
          })]
        }), (0, $.jsxs)(`div`, {
          className: `space-y-1.5`,
          children: [(0, $.jsx)(`label`, {
            className: `text-xs font-semibold text-slate-300`,
            children: `First Name`
          }), (0, $.jsx)(`input`, {
            type: `text`,
            required: !0,
            value: i,
            onChange: e => a(e.target.value),
            className: `w-full py-2 px-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500`
          })]
        }), (0, $.jsxs)(`div`, {
          className: `space-y-1.5`,
          children: [(0, $.jsx)(`label`, {
            className: `text-xs font-semibold text-slate-300`,
            children: `Last Name`
          }), (0, $.jsx)(`input`, {
            type: `text`,
            value: o,
            onChange: e => s(e.target.value),
            placeholder: `Optional`,
            className: `w-full py-2 px-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500`
          })]
        }), (0, $.jsxs)(`div`, {
          className: `space-y-1.5`,
          children: [(0, $.jsxs)(`label`, {
            className: `text-xs font-semibold text-slate-300 flex items-center gap-1.5`,
            children: [(0, $.jsx)(N, {
              className: `w-3.5 h-3.5 text-slate-400`
            }), `Department`]
          }), (0, $.jsx)(`select`, {
            value: c,
            onChange: e => l(e.target.value),
            className: `w-full py-2.5 px-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500`,
            children: kc.filter(e => !e.toLowerCase().includes(`fleet`)).map(e => (0, $.jsx)(`option`, {
              value: e,
              children: e
            }, e))
          })]
        }), (0, $.jsxs)(`div`, {
          className: `pt-3 flex items-center justify-end gap-2 border-t border-slate-800`,
          children: [(0, $.jsx)(`button`, {
            type: `button`,
            onClick: n,
            className: `px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition-colors cursor-pointer`,
            children: `Cancel`
          }), (0, $.jsxs)(`button`, {
            type: `submit`,
            disabled: u,
            className: `px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 transition-all cursor-pointer`,
            children: [(0, $.jsx)(I, {
              className: `w-4 h-4`
            }), `Save Profile`]
          })]
        })]
      })]
    })
  })
}, Kc = ({
  employees: e,
  isOpen: t,
  onClose: n,
  onSaved: r
}) => {
  if (!t) return null;
  let i = () => {
      let e = new Date,
        t = e => String(e).padStart(2, `0`);
      return `${e.getFullYear()}-${t(e.getMonth()+1)}-${t(e.getDate())}T${t(e.getHours())}:${t(e.getMinutes())}`
    },
    [a, o] = (0, T.useState)(e.length > 0 ? e[0].telegram_id : 0),
    [s, c] = (0, T.useState)(`check_in`),
    [l, u] = (0, T.useState)(i()),
    [d, f] = (0, T.useState)(``),
    [p, m] = (0, T.useState)(`Manual check-in logged by dispatch admin`),
    [h, g] = (0, T.useState)(!1);
  return (0, $.jsx)(`div`, {
    className: `fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs`,
    children: (0, $.jsxs)(`div`, {
      className: `bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden text-slate-100 animate-fadeIn`,
      children: [(0, $.jsxs)(`div`, {
        className: `flex items-center justify-between px-6 py-4 border-b border-slate-800`,
        children: [(0, $.jsxs)(`h3`, {
          className: `text-base font-bold text-white flex items-center gap-2`,
          children: [(0, $.jsx)(te, {
            className: `w-4 h-4 text-blue-400`
          }), `Create Manual Attendance Check In`]
        }), (0, $.jsx)(`button`, {
          onClick: n,
          className: `text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors`,
          children: (0, $.jsx)(He, {
            className: `w-5 h-5`
          })
        })]
      }), (0, $.jsxs)(`form`, {
        onSubmit: async e => {
          if (e.preventDefault(), a) {
            g(!0);
            try {
              let e = new Date(l).toISOString();
              await Ns({
                telegram_id: a,
                action_type: s,
                timestamp: e,
                note: d.trim() || void 0,
                admin_note: p.trim() || void 0
              }), r(), n()
            } catch (e) {
              console.error(`Failed to create manual check in:`, e)
            } finally {
              g(!1)
            }
          }
        },
        className: `p-6 space-y-4`,
        children: [(0, $.jsxs)(`div`, {
          className: `space-y-1.5`,
          children: [(0, $.jsx)(`label`, {
            className: `text-xs font-semibold text-slate-300`,
            children: `Select Employee`
          }), e.length === 0 ? (0, $.jsx)(`p`, {
            className: `text-xs text-amber-400`,
            children: `No employees registered yet.`
          }) : (0, $.jsx)(`select`, {
            value: a,
            onChange: e => o(Number(e.target.value)),
            className: `w-full py-2.5 px-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500`,
            children: e.map(e => (0, $.jsxs)(`option`, {
              value: e.telegram_id,
              children: [e.first_name, ` `, e.last_name || ``, ` (`, e.department || `No dept`, `) - ID: `, e.telegram_id]
            }, e.telegram_id))
          })]
        }), (0, $.jsxs)(`div`, {
          className: `space-y-1.5`,
          children: [(0, $.jsx)(`label`, {
            className: `text-xs font-semibold text-slate-300`,
            children: `Action Type`
          }), (0, $.jsxs)(`div`, {
            className: `grid grid-cols-2 gap-3`,
            children: [(0, $.jsxs)(`button`, {
              type: `button`,
              onClick: () => c(`check_in`),
              className: `py-2 px-4 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-all ${s===`check_in`?`bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-sm`:`bg-slate-800 border-slate-700 text-slate-400`}`,
              children: [(0, $.jsx)(`span`, {
                className: `w-2 h-2 rounded-full bg-emerald-400`
              }), `CHECK IN`]
            }), (0, $.jsxs)(`button`, {
              type: `button`,
              onClick: () => c(`check_out`),
              className: `py-2 px-4 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-all ${s===`check_out`?`bg-slate-700 border-slate-600 text-white shadow-sm`:`bg-slate-800 border-slate-700 text-slate-400`}`,
              children: [(0, $.jsx)(`span`, {
                className: `w-2 h-2 rounded-full bg-slate-400`
              }), `CHECK OUT`]
            })]
          })]
        }), (0, $.jsxs)(`div`, {
          className: `space-y-1.5`,
          children: [(0, $.jsxs)(`label`, {
            className: `text-xs font-semibold text-slate-300 flex items-center gap-1.5`,
            children: [(0, $.jsx)(U, {
              className: `w-3.5 h-3.5 text-slate-400`
            }), `Check In Date & Time`]
          }), (0, $.jsx)(`input`, {
            type: `datetime-local`,
            required: !0,
            value: l,
            onChange: e => u(e.target.value),
            className: `w-full py-2 px-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 font-mono`
          })]
        }), (0, $.jsxs)(`div`, {
          className: `space-y-1.5`,
          children: [(0, $.jsx)(`label`, {
            className: `text-xs font-semibold text-slate-300`,
            children: `Admin Reason / Audit Note`
          }), (0, $.jsx)(`input`, {
            type: `text`,
            value: p,
            onChange: e => m(e.target.value),
            placeholder: `e.g. Phone died on shift / approved by supervisor`,
            className: `w-full py-2 px-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500`
          })]
        }), (0, $.jsxs)(`div`, {
          className: `pt-3 flex items-center justify-end gap-2 border-t border-slate-800`,
          children: [(0, $.jsx)(`button`, {
            type: `button`,
            onClick: n,
            className: `px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition-colors cursor-pointer`,
            children: `Cancel`
          }), (0, $.jsxs)(`button`, {
            type: `submit`,
            disabled: h || e.length === 0,
            className: `px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer`,
            children: [(0, $.jsx)(I, {
              className: `w-4 h-4`
            }), `Save Check In`]
          })]
        })]
      })]
    })
  })
}, qc = ({
  log: e,
  isOpen: t,
  onClose: n
}) => {
  if (!t) return null;
  let r = e.distance_meters !== null && e.distance_meters !== void 0 ? e.distance_meters : null,
    i = r !== null && r <= Pc.radiusMeters,
    a = new Date(e.timestamp).toLocaleDateString(`en-US`, {
      timeZone: `Asia/Tashkent`,
      month: `short`,
      day: `numeric`,
      year: `numeric`
    }),
    o = new Date(e.timestamp).toLocaleTimeString(`en-US`, {
      timeZone: `Asia/Tashkent`,
      hour: `2-digit`,
      minute: `2-digit`,
      second: `2-digit`,
      hour12: !1
    });
  return (0, $.jsx)(`div`, {
    className: `fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn`,
    children: (0, $.jsxs)(`div`, {
      className: `bg-slate-900 border border-slate-700 w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden text-slate-100`,
      children: [(0, $.jsxs)(`div`, {
        className: `flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80`,
        children: [(0, $.jsxs)(`div`, {
          className: `flex items-center gap-2.5`,
          children: [(0, $.jsx)(`div`, {
            className: `w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center`,
            children: (0, $.jsx)(Ee, {
              className: `w-4 h-4`
            })
          }), (0, $.jsxs)(`div`, {
            children: [(0, $.jsx)(`h3`, {
              className: `text-sm font-bold text-white`,
              children: `Biometric & Geofence Verification Audit`
            }), (0, $.jsxs)(`p`, {
              className: `text-xs text-slate-400`,
              children: [e.employee?.first_name, ` `, e.employee?.last_name || ``, ` • `, e.employee?.department || `Staff`]
            })]
          })]
        }), (0, $.jsx)(`button`, {
          onClick: n,
          className: `text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer`,
          children: (0, $.jsx)(He, {
            className: `w-5 h-5`
          })
        })]
      }), (0, $.jsxs)(`div`, {
        className: `p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center`,
        children: [(0, $.jsxs)(`div`, {
          className: `flex flex-col items-center`,
          children: [(0, $.jsxs)(`div`, {
            className: `w-64 h-64 rounded-2xl overflow-hidden border-2 border-slate-700 bg-black flex items-center justify-center relative shadow-lg`,
            children: [e.photo_url ? (0, $.jsx)(`img`, {
              src: e.photo_url,
              alt: `Verification Selfie`,
              className: `w-full h-full object-cover`
            }) : (0, $.jsxs)(`div`, {
              className: `flex flex-col items-center justify-center text-slate-500 p-4 text-center`,
              children: [(0, $.jsx)(Be, {
                className: `w-12 h-12 mb-2 opacity-50`
              }), (0, $.jsx)(`span`, {
                className: `text-xs`,
                children: `No camera selfie captured for this entry`
              })]
            }), (0, $.jsx)(`div`, {
              className: `absolute top-2.5 left-2.5`,
              children: (0, $.jsx)(`span`, {
                className: `text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${e.action_type===`check_in`?`bg-emerald-600 text-white`:`bg-slate-700 text-white`}`,
                children: e.action_type.replace(`_`, ` `)
              })
            })]
          }), (0, $.jsx)(`span`, {
            className: `text-[11px] text-slate-400 mt-2 font-mono`,
            children: `Selfie snapshot captured via camera`
          })]
        }), (0, $.jsxs)(`div`, {
          className: `space-y-4 text-xs`,
          children: [(0, $.jsxs)(`div`, {
            className: `p-4 rounded-2xl border ${i?`bg-emerald-500/10 border-emerald-500/30 text-emerald-300`:`bg-amber-500/10 border-amber-500/30 text-amber-300`}`,
            children: [(0, $.jsxs)(`div`, {
              className: `flex items-center gap-2 mb-1`,
              children: [i ? (0, $.jsx)(Ee, {
                className: `w-5 h-5 text-emerald-400`
              }) : (0, $.jsx)(Le, {
                className: `w-5 h-5 text-amber-400`
              }), (0, $.jsx)(`span`, {
                className: `font-bold text-sm`,
                children: i ? `Within 100m Geofence` : `Geofence Breach Alert`
              })]
            }), (0, $.jsx)(`p`, {
              className: `text-[11px] opacity-90 leading-relaxed`,
              children: i ? `Device was ${r}m from Office HQ (inside permitted 100m zone).` : r === null ? `Manual check in or location was unavailable during check in.` : `Device was ${r}m from Office HQ (exceeded permitted 100m radius).`
            })]
          }), (0, $.jsxs)(`div`, {
            className: `bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/60 space-y-2`,
            children: [(0, $.jsxs)(`div`, {
              className: `flex items-center justify-between`,
              children: [(0, $.jsxs)(`span`, {
                className: `text-slate-400 flex items-center gap-1.5`,
                children: [(0, $.jsx)(P, {
                  className: `w-3.5 h-3.5 text-blue-400`
                }), ` Date:`]
              }), (0, $.jsx)(`span`, {
                className: `font-semibold text-white`,
                children: a
              })]
            }), (0, $.jsxs)(`div`, {
              className: `flex items-center justify-between`,
              children: [(0, $.jsxs)(`span`, {
                className: `text-slate-400 flex items-center gap-1.5`,
                children: [(0, $.jsx)(U, {
                  className: `w-3.5 h-3.5 text-blue-400`
                }), ` Exact Time:`]
              }), (0, $.jsx)(`span`, {
                className: `font-semibold font-mono text-white`,
                children: o
              })]
            }), (0, $.jsxs)(`div`, {
              className: `flex items-center justify-between`,
              children: [(0, $.jsxs)(`span`, {
                className: `text-slate-400 flex items-center gap-1.5`,
                children: [(0, $.jsx)(de, {
                  className: `w-3.5 h-3.5 text-blue-400`
                }), ` Office Target:`]
              }), (0, $.jsxs)(`span`, {
                className: `font-mono text-slate-300`,
                children: [Pc.lat.toFixed(6), `, `, Pc.lng.toFixed(6)]
              })]
            }), e.latitude && e.longitude && (0, $.jsxs)(`div`, {
              className: `flex items-center justify-between`,
              children: [(0, $.jsxs)(`span`, {
                className: `text-slate-400 flex items-center gap-1.5`,
                children: [(0, $.jsx)(de, {
                  className: `w-3.5 h-3.5 text-emerald-400`
                }), ` Device GPS:`]
              }), (0, $.jsxs)(`span`, {
                className: `font-mono text-slate-300`,
                children: [e.latitude.toFixed(6), `, `, e.longitude.toFixed(6)]
              })]
            })]
          }), e.note && (0, $.jsxs)(`div`, {
            className: `bg-slate-800/40 p-3 rounded-xl border border-slate-700/40`,
            children: [(0, $.jsx)(`span`, {
              className: `text-slate-400 font-semibold block mb-0.5`,
              children: `Employee Note:`
            }), (0, $.jsx)(`span`, {
              className: `text-slate-200`,
              children: e.note
            })]
          }), e.admin_note && (0, $.jsxs)(`div`, {
            className: `bg-slate-800/80 p-3 rounded-xl border border-slate-700`,
            children: [(0, $.jsx)(`span`, {
              className: `text-blue-400 font-semibold block mb-0.5`,
              children: `Admin Audit Note:`
            }), (0, $.jsx)(`span`, {
              className: `text-slate-200`,
              children: e.admin_note
            })]
          })]
        })]
      }), (0, $.jsx)(`div`, {
        className: `px-6 py-3.5 border-t border-slate-800 bg-slate-900/60 flex justify-end`,
        children: (0, $.jsx)(`button`, {
          onClick: n,
          className: `px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition-colors`,
          children: `Close Inspector`
        })
      })]
    })
  })
}, Jc = ({
  isOpen: e,
  onClose: t,
  employees: n,
  logs: r,
  isDark: i,
  onEditEmployee: a,
  onOpenDossier: o,
  onRefreshData: s
}) => {
  let [c, l] = (0, T.useState)(``), [u, d] = (0, T.useState)(`All`), [f, p] = (0, T.useState)(null), [m, h] = (0, T.useState)(null), [g, _] = (0, T.useState)(null), v = (0, T.useMemo)(() => {
    let e = new Map,
      t = [...r].sort((e, t) => new Date(e.timestamp).getTime() - new Date(t.timestamp).getTime()),
      i = {};
    return t.forEach(e => {
      i[e.telegram_id] || (i[e.telegram_id] = []), i[e.telegram_id].push(e)
    }), n.forEach(t => {
      let n = i[t.telegram_id] || [],
        r = n[n.length - 1];
      r && r.action_type === `check_in` && Date.now() - new Date(r.timestamp).getTime() < 36e6 ? e.set(t.telegram_id, {
        isActive: !0,
        checkInTime: r.timestamp
      }) : e.set(t.telegram_id, {
        isActive: !1
      })
    }), e
  }, [r, n]), y = (0, T.useMemo)(() => n.filter(e => {
    let t = c.toLowerCase().trim(),
      n = !t || e.first_name.toLowerCase().includes(t) || e.last_name && e.last_name.toLowerCase().includes(t) || e.username && e.username.toLowerCase().includes(t) || String(e.telegram_id).includes(t),
      r = u === `All` || e.department === u;
    return n && r
  }), [n, c, u]), b = e => {
    navigator.clipboard.writeText(String(e)), p(e), setTimeout(() => p(null), 2e3)
  }, x = async e => {
    h(e);
    try {
      await Rs(e) && await s()
    } catch (e) {
      console.error(`Failed to delete employee:`, e)
    } finally {
      h(null), _(null)
    }
  };
  return e ? (0, $.jsxs)(`div`, {
    className: `fixed inset-0 z-50 overflow-hidden`,
    children: [(0, $.jsx)(`div`, {
      onClick: t,
      className: `fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fadeIn`
    }), (0, $.jsx)(`div`, {
      className: `fixed inset-y-0 right-0 pl-10 max-w-full flex`,
      children: (0, $.jsxs)(`aside`, {
        className: `w-screen max-w-3xl flex flex-col shadow-2xl transition-all ${i?`bg-[#0f172a] text-slate-100 border-l border-slate-800`:`bg-white text-slate-800`}`,
        children: [(0, $.jsxs)(`div`, {
          className: `px-6 py-5 border-b flex items-center justify-between ${i?`bg-[#1e293b] border-slate-800`:`bg-slate-50 border-slate-200`}`,
          children: [(0, $.jsxs)(`div`, {
            className: `flex items-center gap-3`,
            children: [(0, $.jsx)(`div`, {
              className: `w-10 h-10 rounded-xl bg-red-500/10 text-[#EF4444] border border-red-300 flex items-center justify-center font-bold`,
              children: (0, $.jsx)(Ve, {
                className: `w-5 h-5`
              })
            }), (0, $.jsxs)(`div`, {
              children: [(0, $.jsx)(`h2`, {
                className: `text-base font-bold tracking-tight ${i?`text-white`:`text-slate-900`}`,
                children: `Team & Users Directory`
              }), (0, $.jsxs)(`p`, {
                className: `text-xs ${i?`text-slate-400`:`text-slate-700 font-medium`}`,
                children: [n.length, ` Registered Personnel in Database`]
              })]
            })]
          }), (0, $.jsx)(`button`, {
            onClick: t,
            className: `p-2 rounded-lg transition-colors cursor-pointer ${i?`text-slate-400 hover:text-white hover:bg-slate-800`:`text-slate-700 hover:text-black hover:bg-slate-200`}`,
            children: (0, $.jsx)(He, {
              className: `w-5 h-5`
            })
          })]
        }), (0, $.jsxs)(`div`, {
          className: `p-4 border-b space-y-3 ${i?`bg-[#1e293b]/50 border-slate-800`:`bg-slate-50 border-slate-200`}`,
          children: [(0, $.jsxs)(`div`, {
            className: `relative`,
            children: [(0, $.jsx)(Se, {
              className: `w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${i?`text-slate-400`:`text-slate-700`}`
            }), (0, $.jsx)(`input`, {
              type: `text`,
              placeholder: `Search employee by name, Telegram username, or numeric ID...`,
              value: c,
              onChange: e => l(e.target.value),
              className: `w-full pl-9 pr-4 py-2 rounded-xl text-xs font-semibold border focus:outline-none transition-all ${i?`bg-[#0f172a] border-slate-700 text-white placeholder:text-slate-500 focus:border-[#EF4444]`:`bg-white border-slate-300 text-slate-950 placeholder:text-slate-500 focus:border-[#EF4444]`}`
            })]
          }), (0, $.jsxs)(`div`, {
            className: `flex items-center gap-1.5 overflow-x-auto pb-1 text-xs`,
            children: [(0, $.jsxs)(`button`, {
              onClick: () => d(`All`),
              className: `px-3 py-1 rounded-lg font-bold shrink-0 transition-colors cursor-pointer ${u===`All`?`bg-[#EF4444] text-white shadow-md shadow-red-500/25`:i?`bg-slate-800 text-slate-300 hover:bg-slate-700`:`bg-slate-200 text-slate-900 font-bold hover:bg-slate-300 border border-slate-300`}`,
              children: [`All (`, n.length, `)`]
            }), kc.filter(e => !e.toLowerCase().includes(`fleet`)).map(e => {
              let t = n.filter(t => t.department === e).length;
              return (0, $.jsxs)(`button`, {
                onClick: () => d(e),
                className: `px-2.5 py-1 rounded-lg font-bold shrink-0 transition-colors cursor-pointer ${u===e?`bg-[#EF4444] text-white shadow-md shadow-red-500/25`:i?`bg-slate-800 text-slate-300 hover:bg-slate-700`:`bg-slate-200 text-slate-900 font-bold hover:bg-slate-300 border border-slate-300`}`,
                children: [e, ` (`, t, `)`]
              }, e)
            })]
          })]
        }), (0, $.jsx)(`div`, {
          className: `flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-slate-100 dark:divide-slate-800`,
          children: y.length === 0 ? (0, $.jsxs)(`div`, {
            className: `py-12 text-center text-slate-400`,
            children: [(0, $.jsx)(Ve, {
              className: `w-8 h-8 mx-auto mb-2 opacity-40`
            }), (0, $.jsx)(`p`, {
              className: `text-xs font-semibold`,
              children: `No registered employees match this criteria.`
            })]
          }) : y.map(e => {
            let t = v.get(e.telegram_id),
              n = `${e.first_name} ${e.last_name||``}`.trim();
            return (0, $.jsx)(`div`, {
              className: `pt-3 first:pt-0 p-3 rounded-2xl border transition-all ${i?`bg-[#1e293b]/70 border-slate-800 hover:border-slate-700`:`bg-white border-slate-200 hover:border-slate-300 shadow-2xs`}`,
              children: (0, $.jsxs)(`div`, {
                className: `flex items-start justify-between gap-4`,
                children: [(0, $.jsxs)(`div`, {
                  className: `flex items-start gap-3.5`,
                  children: [(0, $.jsx)(`div`, {
                    className: `w-12 h-12 rounded-xl overflow-hidden shrink-0 border flex items-center justify-center ${i?`bg-slate-800 border-slate-700`:`bg-slate-100 border-slate-300`}`,
                    children: e.photo_url ? (0, $.jsx)(`img`, {
                      src: e.photo_url,
                      alt: n,
                      className: `w-full h-full object-cover`
                    }) : (0, $.jsx)(Be, {
                      className: `w-6 h-6 text-slate-400`
                    })
                  }), (0, $.jsxs)(`div`, {
                    children: [(0, $.jsxs)(`div`, {
                      className: `flex items-center gap-2`,
                      children: [(0, $.jsx)(`span`, {
                        className: `text-sm font-bold ${i?`text-white`:`text-slate-900`}`,
                        children: n
                      }), e.username && (0, $.jsxs)(`span`, {
                        className: `text-xs font-semibold text-[#EF4444]`,
                        children: [`@`, e.username]
                      })]
                    }), (0, $.jsxs)(`div`, {
                      className: `flex items-center gap-2 mt-1 flex-wrap`,
                      children: [(0, $.jsxs)(`span`, {
                        className: `text-[11px] font-bold px-2 py-0.5 rounded-md border flex items-center gap-1 ${i?`bg-red-950/40 text-red-300 border-red-900/50`:`bg-slate-100 text-slate-900 border-slate-300`}`,
                        children: [(0, $.jsx)(N, {
                          className: `w-3 h-3 text-[#EF4444]`
                        }), e.department || `Unassigned`]
                      }), t?.isActive ? (0, $.jsxs)(`span`, {
                        className: `text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 flex items-center gap-1`,
                        children: [(0, $.jsx)(`span`, {
                          className: `w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse`
                        }), `On Duty`]
                      }) : (0, $.jsx)(`span`, {
                        className: `text-[11px] font-semibold px-2 py-0.5 rounded-md border ${i?`bg-slate-800 text-slate-400 border-slate-700`:`bg-slate-100 text-slate-700 border-slate-200`}`,
                        children: `Off Duty`
                      }), (0, $.jsxs)(`button`, {
                        onClick: () => b(e.telegram_id),
                        className: `text-[11px] font-mono flex items-center gap-1 cursor-pointer ${i?`text-slate-400 hover:text-white`:`text-slate-800 hover:text-black font-bold`}`,
                        title: `Copy Telegram ID`,
                        children: [(0, $.jsxs)(`span`, {
                          children: [`ID: `, e.telegram_id]
                        }), f === e.telegram_id ? (0, $.jsx)(I, {
                          className: `w-3 h-3 text-emerald-500`
                        }) : (0, $.jsx)(W, {
                          className: `w-3 h-3 text-slate-400`
                        })]
                      })]
                    })]
                  })]
                }), (0, $.jsxs)(`div`, {
                  className: `flex items-center gap-1.5 shrink-0`,
                  children: [(0, $.jsxs)(`button`, {
                    onClick: () => o(e),
                    className: `py-1.5 px-2.5 rounded-lg border text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer ${i?`bg-red-950/40 text-red-300 border-red-900/50 hover:bg-red-900/60`:`bg-red-50 text-red-700 border-red-200 hover:bg-red-100`}`,
                    title: `Open Employee 360 Dossier`,
                    children: [(0, $.jsx)(Be, {
                      className: `w-3.5 h-3.5`
                    }), (0, $.jsx)(`span`, {
                      children: `360 Dossier`
                    })]
                  }), (0, $.jsxs)(`button`, {
                    onClick: () => a(e),
                    className: `p-2 rounded-lg border text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer ${i?`bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700`:`bg-slate-100 border-slate-300 text-slate-900 hover:bg-slate-200`}`,
                    title: `Edit Employee Details`,
                    children: [(0, $.jsx)(ge, {
                      className: `w-3.5 h-3.5`
                    }), (0, $.jsx)(`span`, {
                      children: `Edit`
                    })]
                  }), g === e.telegram_id ? (0, $.jsxs)(`div`, {
                    className: `flex items-center gap-1`,
                    children: [(0, $.jsx)(`button`, {
                      onClick: () => x(e.telegram_id),
                      disabled: m === e.telegram_id,
                      className: `px-2.5 py-1 bg-rose-600 text-white rounded-lg text-xs font-bold hover:bg-rose-700 transition-colors cursor-pointer`,
                      children: m === e.telegram_id ? `Deleting...` : `Confirm`
                    }), (0, $.jsx)(`button`, {
                      onClick: () => _(null),
                      className: `px-2 py-1 bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300 rounded-lg text-xs transition-colors cursor-pointer`,
                      children: `Cancel`
                    })]
                  }) : (0, $.jsx)(`button`, {
                    onClick: () => _(e.telegram_id),
                    className: `p-2 rounded-lg border border-transparent text-slate-400 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer`,
                    title: `Remove Employee from Roster`,
                    children: (0, $.jsx)(Pe, {
                      className: `w-3.5 h-3.5`
                    })
                  })]
                })]
              })
            }, e.telegram_id)
          })
        })]
      })
    })]
  }) : null
}, Yc = ({
  isOpen: e,
  onClose: t,
  logs: n,
  employees: r,
  isDark: i,
  onRefreshData: a,
  onOpenDossier: o
}) => {
  let [s, c] = (0, T.useState)(null), [l, u] = (0, T.useState)(!1), [d, f] = (0, T.useState)(!1), [p, m] = (0, T.useState)(Date.now());
  (0, T.useEffect)(() => {
    let e = setInterval(() => m(Date.now()), 1e3);
    return () => clearInterval(e)
  }, []);
  let h = (0, T.useMemo)(() => {
      let e = new Map;
      return r.forEach(t => e.set(t.telegram_id, t)), e
    }, [r]),
    g = (0, T.useMemo)(() => {
      let e = [...n].sort((e, t) => new Date(e.timestamp).getTime() - new Date(t.timestamp).getTime()),
        t = {};
      return e.forEach(e => {
        e.action_type === `check_in` ? t[e.telegram_id] = e : e.action_type === `check_out` && delete t[e.telegram_id]
      }), Object.values(t).filter(e => Math.max(0, p - new Date(e.timestamp).getTime()) < 36e6).map(e => {
        let t = h.get(e.telegram_id),
          n = Math.max(0, p - new Date(e.timestamp).getTime()),
          r = n / 36e5;
        return {
          log: e,
          emp: t,
          elapsedMs: n,
          elapsedHours: r,
          isOvertimeShift: r >= 10
        }
      })
    }, [n, h, p]),
    _ = (0, T.useMemo)(() => {
      let e = {};
      return g.forEach(t => {
        let n = t.emp?.department || `Unassigned`;
        e[n] || (e[n] = []), e[n].push(t)
      }), e
    }, [g]),
    v = e => {
      let t = Math.floor(e / 1e3),
        n = Math.floor(t / 3600),
        r = Math.floor(t % 3600 / 60),
        i = t % 60;
      return `${String(n).padStart(2,`0`)}:${String(r).padStart(2,`0`)}:${String(i).padStart(2,`0`)}`
    },
    y = async e => {
      c(e);
      try {
        await Ts(e, `check_out`, `[Supervisor Checkout] Closed from Floor Presence Roster`), await a()
      } catch (e) {
        console.error(`Failed to clock out employee:`, e)
      } finally {
        c(null)
      }
    };
  return e ? (0, $.jsxs)(`div`, {
    className: `fixed inset-0 z-50 overflow-hidden`,
    children: [(0, $.jsx)(`div`, {
      onClick: t,
      className: `fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fadeIn`
    }), (0, $.jsx)(`div`, {
      className: `fixed inset-y-0 right-0 pl-10 max-w-full flex`,
      children: (0, $.jsxs)(`aside`, {
        className: `w-screen max-w-3xl flex flex-col shadow-2xl transition-all ${i?`bg-[#0f172a] text-slate-100 border-l border-slate-800`:`bg-white text-slate-800`}`,
        children: [(0, $.jsxs)(`div`, {
          className: `px-6 py-5 border-b flex items-center justify-between ${i?`bg-[#1e293b] border-slate-800`:`bg-slate-50 border-slate-200`}`,
          children: [(0, $.jsxs)(`div`, {
            className: `flex items-center gap-3`,
            children: [(0, $.jsx)(`div`, {
              className: `w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 border border-blue-300 flex items-center justify-center font-bold`,
              children: (0, $.jsx)(Ve, {
                className: `w-5 h-5`
              })
            }), (0, $.jsxs)(`div`, {
              children: [(0, $.jsx)(`h2`, {
                className: `text-base font-bold tracking-tight ${i?`text-white`:`text-slate-900`}`,
                children: `Floor Presence & Shift Roster`
              }), (0, $.jsxs)(`p`, {
                className: `text-xs text-slate-400`,
                children: [g.length, ` Personnel Currently Clocked In on Dispatch Floor`]
              })]
            })]
          }), (0, $.jsxs)(`div`, {
            className: `flex items-center gap-2`,
            children: [g.length > 0 && (d ? (0, $.jsxs)(`div`, {
              className: `flex items-center gap-1.5`,
              children: [(0, $.jsx)(`button`, {
                onClick: async () => {
                  u(!0);
                  try {
                    for (let e of g) await Ts(e.log.telegram_id, `check_out`, `[Supervisor Shift Closeout] Batch clock-out for shift rotation`);
                    await a()
                  } catch (e) {
                    console.error(`Failed to clock out all personnel:`, e)
                  } finally {
                    u(!1), f(!1)
                  }
                },
                disabled: l,
                className: `py-1.5 px-3 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700 transition-colors cursor-pointer`,
                children: l ? `Closing...` : `Confirm End All`
              }), (0, $.jsx)(`button`, {
                onClick: () => f(!1),
                className: `py-1.5 px-2.5 bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300 rounded-xl text-xs transition-colors cursor-pointer`,
                children: `Cancel`
              })]
            }) : (0, $.jsxs)(`button`, {
              onClick: () => f(!0),
              className: `py-2 px-3 bg-rose-50 hover:bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 dark:border-rose-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer`,
              children: [(0, $.jsx)(ue, {
                className: `w-3.5 h-3.5`
              }), (0, $.jsx)(`span`, {
                children: `End All Active Shifts`
              })]
            })), (0, $.jsx)(`button`, {
              onClick: t,
              className: `p-2 rounded-lg transition-colors cursor-pointer ${i?`text-slate-400 hover:text-white hover:bg-slate-800`:`text-slate-500 hover:text-slate-900 hover:bg-slate-200`}`,
              children: (0, $.jsx)(He, {
                className: `w-5 h-5`
              })
            })]
          })]
        }), (0, $.jsx)(`div`, {
          className: `p-4 border-b flex items-center gap-2 flex-wrap ${i?`bg-[#1e293b]/50 border-slate-800`:`bg-slate-50 border-slate-200`}`,
          children: kc.filter(e => !e.toLowerCase().includes(`fleet`)).map(e => {
            let t = g.filter(t => t.emp?.department === e).length,
              n = r.filter(t => t.department === e).length;
            return (0, $.jsxs)(`div`, {
              className: `px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-2 ${t>0?i?`bg-red-950/40 border-red-900/50 text-red-300 font-bold`:`bg-slate-100 border-slate-300 text-slate-950 font-bold`:i?`bg-slate-900/60 border-slate-800 text-slate-400`:`bg-white border-slate-200 text-slate-600`}`,
              children: [(0, $.jsx)(`span`, {
                className: `w-2 h-2 rounded-full ${t>0?`bg-[#EF4444] animate-pulse`:`bg-slate-300 dark:bg-slate-700`}`
              }), (0, $.jsxs)(`span`, {
                className: `font-bold`,
                children: [e, `:`]
              }), (0, $.jsxs)(`span`, {
                className: `font-mono`,
                children: [t, `/`, n]
              })]
            }, e)
          })
        }), (0, $.jsx)(`div`, {
          className: `flex-1 overflow-y-auto p-4 space-y-6`,
          children: g.length === 0 ? (0, $.jsxs)(`div`, {
            className: `py-16 text-center text-slate-400`,
            children: [(0, $.jsx)(Ve, {
              className: `w-10 h-10 mx-auto mb-2 opacity-40`
            }), (0, $.jsx)(`p`, {
              className: `text-sm font-bold ${i?`text-slate-300`:`text-slate-800`}`,
              children: `No employees currently clocked in.`
            }), (0, $.jsx)(`p`, {
              className: `text-xs mt-1 ${i?`text-slate-400`:`text-slate-600`}`,
              children: `Active staff will show real-time live duration timers here as soon as they check in.`
            })]
          }) : Object.entries(_).filter(([e]) => !e.toLowerCase().includes(`fleet`)).map(([e, t]) => (0, $.jsxs)(`div`, {
            className: `space-y-3`,
            children: [(0, $.jsxs)(`div`, {
              className: `flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${i?`text-slate-400`:`text-slate-900`}`,
              children: [(0, $.jsx)(N, {
                className: `w-3.5 h-3.5 text-[#EF4444]`
              }), (0, $.jsxs)(`span`, {
                children: [e, ` (`, t.length, ` Active)`]
              })]
            }), (0, $.jsx)(`div`, {
              className: `grid grid-cols-1 sm:grid-cols-2 gap-3`,
              children: t.map(e => {
                let t = `${e.emp?.first_name||`Staff`} ${e.emp?.last_name||``}`.trim(),
                  n = new Date(e.log.timestamp).toLocaleTimeString(`en-US`, {
                    timeZone: `Asia/Tashkent`,
                    hour: `2-digit`,
                    minute: `2-digit`,
                    hour12: !1
                  });
                return (0, $.jsxs)(`div`, {
                  className: `p-4 rounded-2xl border transition-all ${e.isOvertimeShift?`border-amber-400/80 bg-amber-50/40 dark:bg-amber-950/20`:i?`bg-[#1e293b]/70 border-slate-800`:`bg-white border-slate-200/90 shadow-2xs`}`,
                  children: [(0, $.jsxs)(`div`, {
                    className: `flex items-start justify-between gap-3`,
                    children: [(0, $.jsxs)(`div`, {
                      className: `flex items-center gap-3`,
                      children: [(0, $.jsx)(`div`, {
                        className: `w-11 h-11 rounded-full overflow-hidden shrink-0 border flex items-center justify-center ${i?`bg-slate-800 border-slate-700`:`bg-slate-100 border-slate-200`}`,
                        children: e.emp?.photo_url ? (0, $.jsx)(`img`, {
                          src: e.emp.photo_url,
                          alt: t,
                          className: `w-full h-full object-cover`
                        }) : (0, $.jsx)(Be, {
                          className: `w-5 h-5 text-slate-400`
                        })
                      }), (0, $.jsxs)(`div`, {
                        children: [e.emp && o ? (0, $.jsx)(`button`, {
                          onClick: () => o(e.emp),
                          className: `text-sm font-bold block text-left hover:underline hover:text-[#EF4444] cursor-pointer ${i?`text-white`:`text-slate-900`}`,
                          title: `Open Employee 360 Dossier`,
                          children: t
                        }) : (0, $.jsx)(`span`, {
                          className: `text-sm font-bold block ${i?`text-white`:`text-slate-900`}`,
                          children: t
                        }), (0, $.jsxs)(`span`, {
                          className: `text-xs ${i?`text-slate-400`:`text-slate-600 font-medium`}`,
                          children: [`Clocked in at `, n]
                        })]
                      })]
                    }), (0, $.jsx)(`button`, {
                      onClick: () => y(e.log.telegram_id),
                      disabled: s === e.log.telegram_id,
                      className: `p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer`,
                      title: `Clock Out Employee`,
                      children: (0, $.jsx)(ue, {
                        className: `w-3.5 h-3.5`
                      })
                    })]
                  }), (0, $.jsxs)(`div`, {
                    className: `mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between`,
                    children: [(0, $.jsxs)(`div`, {
                      className: `flex items-center gap-1.5`,
                      children: [(0, $.jsx)(U, {
                        className: `w-3.5 h-3.5 text-emerald-500`
                      }), (0, $.jsx)(`span`, {
                        className: `text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400`,
                        children: v(e.elapsedMs)
                      })]
                    }), e.isOvertimeShift && (0, $.jsxs)(`span`, {
                      className: `text-[10px] font-bold text-amber-600 bg-amber-100 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-300 dark:border-amber-800 flex items-center gap-1`,
                      children: [(0, $.jsx)(Le, {
                        className: `w-3 h-3`
                      }), `>12h Shift`]
                    })]
                  })]
                }, e.log.id)
              })
            })]
          }, e))
        })]
      })
    })]
  }) : null
}, Xc = ({
  employee: e,
  isOpen: t,
  onClose: n,
  logs: r,
  isDark: i,
  onEditEmployee: a,
  onEditLog: o,
  onInspectSelfie: s,
  onRefreshData: c
}) => {
  let [l, u] = (0, T.useState)(`timeline`), [d, f] = (0, T.useState)(!1), [p, m] = (0, T.useState)(!1), h = (0, T.useMemo)(() => e ? r.filter(t => t.telegram_id === e.telegram_id).sort((e, t) => new Date(t.timestamp).getTime() - new Date(e.timestamp).getTime()) : [], [r, e]), g = (0, T.useMemo)(() => {
    if (!e || h.length === 0) return {
      isActive: !1
    };
    let t = h[0];
    if (t.action_type === `check_in`) {
      let e = Math.max(0, Date.now() - new Date(t.timestamp).getTime());
      if (e < 36e6) return {
        isActive: !0,
        checkInTime: t.timestamp,
        elapsedMs: e
      }
    }
    return {
      isActive: !1
    }
  }, [e, h]), _ = (0, T.useMemo)(() => {
    let e = 0,
      t = 0,
      n = 0,
      r = 0,
      i = [...h].reverse(),
      a = [];
    i.forEach(i => {
      if (i.distance_meters !== null && i.distance_meters !== void 0 && i.distance_meters > 100 || i.note && i.note.toLowerCase().includes(`remote`) ? r++ : n++, i.action_type === `check_in`) a.push(i.timestamp);
      else if (i.action_type === `check_out`) {
        let n = a.pop();
        if (n) {
          let r = new Date(i.timestamp).getTime() - new Date(n).getTime(),
            a = Math.max(0, Math.round(r / 6e4));
          e += 1, t += a
        }
      }
    });
    let o = Number((t / 60).toFixed(2)),
      s = Math.min(o, 40),
      c = Math.max(0, Number((o - 40).toFixed(2))),
      l = e > 0 ? Math.round(t / e) : 0,
      u = `${Math.floor(l/60)}h ${l%60}m`,
      d = h.length,
      f = d > 0 ? Math.round(n / d * 100) : 100;
    return {
      completedShifts: e,
      totalMinutes: t,
      totalHoursDecimal: o,
      regularHours: s,
      overtimeHours: c,
      avgHoursFormatted: u,
      inPerimeterCount: n,
      remoteCount: r,
      perimeterPercentage: f,
      totalCheckIns: d
    }
  }, [h]), v = (0, T.useMemo)(() => h.filter(e => !!e.photo_url), [h]), y = (0, T.useMemo)(() => h.filter(e => e.distance_meters !== null && e.distance_meters !== void 0 && e.distance_meters > 100 || e.note && e.note.toLowerCase().includes(`remote`)), [h]), b = () => {
    e && (navigator.clipboard.writeText(String(e.telegram_id)), f(!0), setTimeout(() => f(!1), 2e3))
  }, x = async () => {
    if (e) {
      m(!0);
      try {
        await Ts(e.telegram_id, `check_out`, `[Supervisor Dossier Override] Manual shift termination from Employee 360`), await c()
      } catch (e) {
        console.error(`Error clocking out user:`, e)
      } finally {
        m(!1)
      }
    }
  }, S = () => {
    if (!e) return;
    let t = [`Timestamp`, `Action Type`, `Department`, `Distance (Meters)`, `Latitude`, `Longitude`, `Shift Duration`, `Employee Note`, `Supervisor Note`],
      n = h.map(t => [`"${t.timestamp}"`, `"${t.action_type}"`, `"${e.department||`Staff`}"`, t.distance_meters !== null && t.distance_meters !== void 0 ? t.distance_meters : 0, t.latitude || ``, t.longitude || ``, `"${t.durationFormatted||``}"`, `"${(t.note||``).replace(/"/g,`""`)}"`, `"${(t.admin_note||``).replace(/"/g,`""`)}"`]),
      r = `data:text/csv;charset=utf-8,﻿` + [t.join(`,`), ...n.map(e => e.join(`,`))].join(`
`),
      i = encodeURI(r),
      a = document.createElement(`a`);
    a.setAttribute(`href`, i), a.setAttribute(`download`, `Dossier_${e.first_name}_${e.last_name||``}_${e.telegram_id}.csv`), document.body.appendChild(a), a.click(), document.body.removeChild(a)
  };
  if (!t || !e) return null;
  let C = `${e.first_name} ${e.last_name||``}`.trim();
  return (0, $.jsxs)(`div`, {
    className: `fixed inset-0 z-50 overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]`,
    children: [(0, $.jsx)(`div`, {
      onClick: n,
      className: `fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fadeIn`
    }), (0, $.jsx)(`div`, {
      className: `fixed inset-y-0 right-0 pl-10 max-w-full flex`,
      children: (0, $.jsxs)(`aside`, {
        className: `w-screen max-w-4xl flex flex-col shadow-2xl transition-all ${i?`bg-[#0f172a] text-slate-100 border-l border-slate-800`:`bg-white text-slate-800`}`,
        children: [(0, $.jsxs)(`div`, {
          className: `px-6 py-5 border-b flex items-center justify-between ${i?`bg-[#1e293b] border-slate-800`:`bg-slate-50 border-slate-200`}`,
          children: [(0, $.jsxs)(`div`, {
            className: `flex items-center gap-2`,
            children: [(0, $.jsx)(`span`, {
              className: `text-[11px] font-bold uppercase tracking-wider text-[#EF4444] dark:text-red-400 bg-red-50 dark:bg-red-950/60 px-2 py-0.5 rounded border border-red-200 dark:border-red-900`,
              children: `Employee 360 Dossier`
            }), (0, $.jsx)(`span`, {
              className: `text-xs ${i?`text-slate-400`:`text-slate-600 font-bold`}`,
              children: `| Complete Operational Footprint`
            })]
          }), (0, $.jsxs)(`div`, {
            className: `flex items-center gap-2`,
            children: [(0, $.jsxs)(`button`, {
              onClick: S,
              className: `py-1.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer`,
              title: `Export individual timesheet`,
              children: [(0, $.jsx)(ie, {
                className: `w-3.5 h-3.5`
              }), (0, $.jsx)(`span`, {
                children: `Export History CSV`
              })]
            }), (0, $.jsxs)(`button`, {
              onClick: () => a(e),
              className: `py-1.5 px-3 rounded-lg text-xs font-bold flex items-center gap-1.5 border transition-colors cursor-pointer ${i?`bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700`:`bg-white border-slate-300 text-slate-700 hover:bg-slate-100`}`,
              children: [(0, $.jsx)(ge, {
                className: `w-3.5 h-3.5`
              }), (0, $.jsx)(`span`, {
                children: `Edit Profile`
              })]
            }), (0, $.jsx)(`button`, {
              onClick: n,
              className: `p-1.5 rounded-lg transition-colors cursor-pointer ${i?`text-slate-400 hover:text-white hover:bg-slate-800`:`text-slate-500 hover:text-slate-900 hover:bg-slate-200`}`,
              children: (0, $.jsx)(He, {
                className: `w-5 h-5`
              })
            })]
          })]
        }), (0, $.jsxs)(`div`, {
          className: `flex-1 overflow-y-auto p-6 space-y-6`,
          children: [(0, $.jsxs)(`div`, {
            className: `p-6 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-6 ${i?`bg-[#1e293b] border-slate-800`:`bg-white border-slate-200 shadow-2xs`}`,
            children: [(0, $.jsxs)(`div`, {
              className: `flex items-start gap-4`,
              children: [(0, $.jsx)(`div`, {
                className: `w-16 h-16 rounded-2xl overflow-hidden shrink-0 border-2 flex items-center justify-center ${i?`bg-slate-800 border-slate-700`:`bg-slate-100 border-slate-200`}`,
                children: e.photo_url ? (0, $.jsx)(`img`, {
                  src: e.photo_url,
                  alt: C,
                  className: `w-full h-full object-cover`
                }) : (0, $.jsx)(Be, {
                  className: `w-8 h-8 text-slate-400`
                })
              }), (0, $.jsxs)(`div`, {
                children: [(0, $.jsxs)(`div`, {
                  className: `flex items-center gap-2 flex-wrap`,
                  children: [(0, $.jsx)(`h1`, {
                    className: `text-lg font-extrabold tracking-tight ${i?`text-white`:`text-slate-950`}`,
                    children: C
                  }), e.username && (0, $.jsxs)(`span`, {
                    className: `text-xs font-semibold ${i?`text-slate-400`:`text-slate-700 font-bold`}`,
                    children: [`@`, e.username]
                  })]
                }), (0, $.jsxs)(`div`, {
                  className: `flex items-center gap-2 mt-1.5 flex-wrap`,
                  children: [(0, $.jsxs)(`span`, {
                    className: `text-xs font-bold px-2.5 py-0.5 rounded-md border flex items-center gap-1.5 ${i?`bg-red-950/40 text-red-300 border-red-900/60`:`bg-slate-100 text-slate-900 border-slate-300`}`,
                    children: [(0, $.jsx)(N, {
                      className: `w-3.5 h-3.5`
                    }), e.department || `Unassigned`]
                  }), g.isActive ? (0, $.jsxs)(`span`, {
                    className: `text-xs font-bold px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 border border-emerald-500/30 flex items-center gap-1.5`,
                    children: [(0, $.jsx)(`span`, {
                      className: `w-2 h-2 rounded-full bg-emerald-500 animate-pulse`
                    }), `Currently On Duty`]
                  }) : (0, $.jsx)(`span`, {
                    className: `text-xs font-bold px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700`,
                    children: `Off Duty`
                  }), (0, $.jsxs)(`button`, {
                    onClick: b,
                    className: `text-xs font-mono text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-1 cursor-pointer`,
                    title: `Copy Telegram ID`,
                    children: [(0, $.jsxs)(`span`, {
                      children: [`ID: `, e.telegram_id]
                    }), d ? (0, $.jsx)(I, {
                      className: `w-3.5 h-3.5 text-emerald-500`
                    }) : (0, $.jsx)(W, {
                      className: `w-3.5 h-3.5`
                    })]
                  })]
                }), e.created_at && (0, $.jsxs)(`p`, {
                  className: `text-[11px] text-slate-400 mt-2`,
                  children: [`Registered: `, new Date(e.created_at).toLocaleDateString(`en-US`, {
                    month: `short`,
                    day: `numeric`,
                    year: `numeric`
                  })]
                })]
              })]
            }), g.isActive && (0, $.jsx)(`div`, {
              className: `shrink-0 flex items-center`,
              children: (0, $.jsxs)(`button`, {
                onClick: x,
                disabled: p,
                className: `py-2.5 px-4 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer`,
                children: [(0, $.jsx)(ue, {
                  className: `w-4 h-4`
                }), (0, $.jsx)(`span`, {
                  children: p ? `Clocking Out...` : `Force Clock Out`
                })]
              })
            })]
          }), (0, $.jsxs)(`div`, {
            className: `grid grid-cols-2 sm:grid-cols-4 gap-3.5`,
            children: [(0, $.jsxs)(`div`, {
              className: `p-4 rounded-2xl border ${i?`bg-[#1e293b] border-slate-800`:`bg-white border-slate-200`}`,
              children: [(0, $.jsxs)(`div`, {
                className: `flex items-center justify-between text-slate-400 text-xs mb-1 font-semibold`,
                children: [(0, $.jsx)(`span`, {
                  children: `Total Shifts`
                }), (0, $.jsx)(q, {
                  className: `w-4 h-4`
                })]
              }), (0, $.jsx)(`div`, {
                className: `text-2xl font-black ${i?`text-white`:`text-slate-900`}`,
                children: _.completedShifts
              }), (0, $.jsxs)(`span`, {
                className: `text-[10px] text-slate-400 mt-1 block`,
                children: [_.totalCheckIns, ` total check-ins`]
              })]
            }), (0, $.jsxs)(`div`, {
              className: `p-4 rounded-2xl border ${i?`bg-[#1e293b] border-slate-800`:`bg-white border-slate-200`}`,
              children: [(0, $.jsxs)(`div`, {
                className: `flex items-center justify-between text-slate-400 text-xs mb-1 font-semibold`,
                children: [(0, $.jsx)(`span`, {
                  children: `Total Hours`
                }), (0, $.jsx)(U, {
                  className: `w-4 h-4`
                })]
              }), (0, $.jsxs)(`div`, {
                className: `text-2xl font-black text-emerald-600 dark:text-emerald-400`,
                children: [_.totalHoursDecimal, `h`]
              }), (0, $.jsxs)(`span`, {
                className: `text-[10px] text-slate-400 mt-1 block font-mono`,
                children: [Math.floor(_.totalMinutes / 60), `h `, _.totalMinutes % 60, `m logged`]
              })]
            }), (0, $.jsxs)(`div`, {
              className: `p-4 rounded-2xl border ${i?`bg-[#1e293b] border-slate-800`:`bg-white border-slate-200`}`,
              children: [(0, $.jsxs)(`div`, {
                className: `flex items-center justify-between text-slate-400 text-xs mb-1 font-semibold`,
                children: [(0, $.jsx)(`span`, {
                  children: `Avg Shift`
                }), (0, $.jsx)(Ie, {
                  className: `w-4 h-4`
                })]
              }), (0, $.jsx)(`div`, {
                className: `text-2xl font-black ${i?`text-white`:`text-slate-900`}`,
                children: _.avgHoursFormatted
              }), (0, $.jsx)(`span`, {
                className: `text-[10px] text-slate-400 mt-1 block`,
                children: `Average per shift`
              })]
            }), (0, $.jsxs)(`div`, {
              className: `p-4 rounded-2xl border ${i?`bg-[#1e293b] border-slate-800`:`bg-white border-slate-200`}`,
              children: [(0, $.jsxs)(`div`, {
                className: `flex items-center justify-between text-slate-400 text-xs mb-1 font-semibold`,
                children: [(0, $.jsx)(`span`, {
                  children: `Perimeter Compliance`
                }), (0, $.jsx)(_e, {
                  className: `w-4 h-4`
                })]
              }), (0, $.jsxs)(`div`, {
                className: `text-2xl font-black ${_.perimeterPercentage>=90?`text-emerald-600`:`text-amber-500`}`,
                children: [_.perimeterPercentage, `%`]
              }), (0, $.jsxs)(`span`, {
                className: `text-[10px] text-slate-400 mt-1 block`,
                children: [_.remoteCount, ` remote check-ins logged`]
              })]
            })]
          }), (0, $.jsxs)(`div`, {
            className: `border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 text-xs font-bold pb-2`,
            children: [(0, $.jsxs)(`button`, {
              onClick: () => u(`timeline`),
              className: `px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${l===`timeline`?`bg-[#EF4444] text-white font-bold shadow-md shadow-red-500/25`:i?`text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700`:`text-slate-800 hover:bg-slate-200 border border-slate-300 font-bold`}`,
              children: [(0, $.jsx)(q, {
                className: `w-3.5 h-3.5`
              }), (0, $.jsxs)(`span`, {
                children: [`Full Check In Timeline (`, h.length, `)`]
              })]
            }), (0, $.jsxs)(`button`, {
              onClick: () => u(`audit`),
              className: `px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${l===`audit`?`bg-[#EF4444] text-white font-bold shadow-md shadow-red-500/25`:i?`text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700`:`text-slate-800 hover:bg-slate-200 border border-slate-300 font-bold`}`,
              children: [(0, $.jsx)(de, {
                className: `w-3.5 h-3.5`
              }), (0, $.jsxs)(`span`, {
                children: [`Perimeter & Remote Exceptions (`, y.length, `)`]
              })]
            }), (0, $.jsxs)(`button`, {
              onClick: () => u(`gallery`),
              className: `px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${l===`gallery`?`bg-[#EF4444] text-white font-bold shadow-md shadow-red-500/25`:i?`text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700`:`text-slate-800 hover:bg-slate-200 border border-slate-300 font-bold`}`,
              children: [(0, $.jsx)(F, {
                className: `w-3.5 h-3.5`
              }), (0, $.jsxs)(`span`, {
                children: [`Verification Selfies (`, v.length, `)`]
              })]
            })]
          }), l === `timeline` && (0, $.jsx)(`div`, {
            className: `rounded-2xl border overflow-hidden ${i?`border-slate-800`:`border-slate-200 shadow-2xs`}`,
            children: (0, $.jsxs)(`table`, {
              className: `w-full text-left text-xs`,
              children: [(0, $.jsx)(`thead`, {
                className: `font-bold border-b uppercase tracking-wider text-[10px] ${i?`bg-slate-900 text-slate-400 border-slate-800`:`bg-slate-100 text-slate-950 border-slate-300 font-extrabold`}`,
                children: (0, $.jsxs)(`tr`, {
                  children: [(0, $.jsx)(`th`, {
                    className: `py-3 px-4`,
                    children: `Date & Time`
                  }), (0, $.jsx)(`th`, {
                    className: `py-3 px-3`,
                    children: `Action Type`
                  }), (0, $.jsx)(`th`, {
                    className: `py-3 px-3`,
                    children: `Perimeter Distance`
                  }), (0, $.jsx)(`th`, {
                    className: `py-3 px-3`,
                    children: `Duration`
                  }), (0, $.jsx)(`th`, {
                    className: `py-3 px-3`,
                    children: `Notes & Audit`
                  }), (0, $.jsx)(`th`, {
                    className: `py-3 px-4 text-right`,
                    children: `Actions`
                  })]
                })
              }), (0, $.jsx)(`tbody`, {
                className: `divide-y ${i?`divide-slate-800 text-slate-200`:`divide-slate-200 text-slate-900`}`,
                children: h.length === 0 ? (0, $.jsx)(`tr`, {
                  children: (0, $.jsx)(`td`, {
                    colSpan: 6,
                    className: `py-8 text-center ${i?`text-slate-400`:`text-slate-600 font-bold`}`,
                    children: `No attendance logs recorded for this employee yet.`
                  })
                }) : h.map(e => {
                  let t = e.action_type === `check_in`,
                    n = e.distance_meters !== null && e.distance_meters !== void 0 && e.distance_meters > 100 || e.note && e.note.toLowerCase().includes(`remote`);
                  return (0, $.jsxs)(`tr`, {
                    className: `hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors`,
                    children: [(0, $.jsx)(`td`, {
                      className: `py-3 px-4 font-mono font-bold ${i?`text-slate-200`:`text-slate-950`}`,
                      children: new Date(e.timestamp).toLocaleString(`en-US`, {
                        timeZone: `Asia/Tashkent`,
                        month: `short`,
                        day: `numeric`,
                        hour: `2-digit`,
                        minute: `2-digit`,
                        second: `2-digit`,
                        hour12: !1
                      })
                    }), (0, $.jsx)(`td`, {
                      className: `py-3 px-3`,
                      children: (0, $.jsx)(`span`, {
                        className: `text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${t?`bg-emerald-100 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300`:`bg-blue-100 text-blue-900 dark:bg-blue-950/60 dark:text-blue-300`}`,
                        children: e.action_type.replace(`_`, ` `)
                      })
                    }), (0, $.jsx)(`td`, {
                      className: `py-3 px-3`,
                      children: n ? (0, $.jsxs)(`span`, {
                        className: `text-[10px] font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 dark:border-rose-800 flex items-center gap-1 w-max`,
                        children: [(0, $.jsx)(de, {
                          className: `w-3 h-3`
                        }), e.distance_meters ? `${Math.round(e.distance_meters)}m away` : `Remote`]
                      }) : (0, $.jsx)(`span`, {
                        className: `text-[10px] font-medium ${i?`text-slate-400`:`text-slate-700 font-bold`}`,
                        children: e.distance_meters !== null && e.distance_meters !== void 0 ? `${Math.round(e.distance_meters)}m (Inside 100m)` : `Inside Geofence`
                      })
                    }), (0, $.jsx)(`td`, {
                      className: `py-3 px-3 font-mono font-bold ${i?`text-slate-300`:`text-slate-900`}`,
                      children: e.durationFormatted || `-`
                    }), (0, $.jsxs)(`td`, {
                      className: `py-3 px-3 max-w-xs`,
                      children: [e.note && (0, $.jsxs)(`p`, {
                        className: `text-[11px] truncate ${i?`text-slate-300`:`text-slate-800`}`,
                        title: e.note,
                        children: [(0, $.jsx)(`span`, {
                          className: `font-bold mr-1 ${i?`text-slate-400`:`text-slate-600`}`,
                          children: `Note:`
                        }), e.note]
                      }), e.admin_note && (0, $.jsxs)(`p`, {
                        className: `text-[11px] text-[#EF4444] dark:text-red-400 truncate font-semibold`,
                        title: e.admin_note,
                        children: [(0, $.jsx)(`span`, {
                          className: `font-bold mr-1`,
                          children: `Admin:`
                        }), e.admin_note]
                      })]
                    }), (0, $.jsx)(`td`, {
                      className: `py-3 px-4 text-right`,
                      children: (0, $.jsxs)(`div`, {
                        className: `flex items-center justify-end gap-1.5`,
                        children: [e.photo_url && (0, $.jsx)(`button`, {
                          onClick: () => s(e),
                          className: `p-1.5 rounded-lg border cursor-pointer ${i?`border-slate-700 text-slate-400 hover:text-white`:`border-slate-300 text-slate-700 hover:text-slate-950 hover:bg-slate-100`}`,
                          title: `View verification selfie`,
                          children: (0, $.jsx)(G, {
                            className: `w-3.5 h-3.5`
                          })
                        }), (0, $.jsx)(`button`, {
                          onClick: () => o(e),
                          className: `p-1.5 rounded-lg border cursor-pointer ${i?`border-slate-700 text-slate-400 hover:text-[#EF4444]`:`border-slate-300 text-slate-700 hover:text-[#EF4444] hover:bg-slate-100`}`,
                          title: `Edit record`,
                          children: (0, $.jsx)(ge, {
                            className: `w-3.5 h-3.5`
                          })
                        })]
                      })
                    })]
                  }, e.id)
                })
              })]
            })
          }), l === `audit` && (0, $.jsx)(`div`, {
            className: `space-y-3`,
            children: y.length === 0 ? (0, $.jsxs)(`div`, {
              className: `p-8 text-center rounded-2xl border ${i?`border-slate-800`:`border-slate-200`}`,
              children: [(0, $.jsx)(Ee, {
                className: `w-8 h-8 text-emerald-500 mx-auto mb-2 opacity-80`
              }), (0, $.jsx)(`p`, {
                className: `text-xs font-bold text-slate-700 dark:text-slate-300`,
                children: `100% Perimeter Compliance Record`
              }), (0, $.jsx)(`p`, {
                className: `text-[11px] text-slate-400 mt-0.5`,
                children: `This employee has zero flagged remote check-ins or out-of-perimeter checkouts.`
              })]
            }) : y.map(e => (0, $.jsx)(`div`, {
              className: `p-4 rounded-2xl border ${i?`bg-[#1e293b]/70 border-slate-800`:`bg-white border-slate-200 shadow-2xs`}`,
              children: (0, $.jsxs)(`div`, {
                className: `flex items-start justify-between`,
                children: [(0, $.jsxs)(`div`, {
                  children: [(0, $.jsxs)(`div`, {
                    className: `flex items-center gap-2 mb-1`,
                    children: [(0, $.jsxs)(`span`, {
                      className: `text-[10px] font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 border border-rose-200 dark:border-rose-800 flex items-center gap-1`,
                      children: [(0, $.jsx)(de, {
                        className: `w-3 h-3`
                      }), e.distance_meters ? `${Math.round(e.distance_meters)}m away from HQ` : `Remote Check In`]
                    }), (0, $.jsx)(`span`, {
                      className: `text-xs font-mono text-slate-400`,
                      children: new Date(e.timestamp).toLocaleString(`en-US`, {
                        timeZone: `Asia/Tashkent`,
                        hour12: !1
                      })
                    })]
                  }), e.note && (0, $.jsxs)(`p`, {
                    className: `text-xs text-slate-700 dark:text-slate-300 mt-2 bg-slate-50 dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800`,
                    children: [(0, $.jsx)(`span`, {
                      className: `font-bold text-slate-400 mr-1`,
                      children: `Employee Explanation:`
                    }), e.note]
                  }), e.latitude && e.longitude && (0, $.jsxs)(`span`, {
                    className: `text-[10px] font-mono text-slate-400 mt-1.5 block`,
                    children: [`Coordinates: `, e.latitude.toFixed(6), `, `, e.longitude.toFixed(6)]
                  })]
                }), e.photo_url && (0, $.jsx)(`button`, {
                  onClick: () => s(e),
                  className: `w-12 h-12 rounded-xl overflow-hidden border shrink-0 cursor-pointer`,
                  children: (0, $.jsx)(`img`, {
                    src: e.photo_url,
                    alt: `Selfie`,
                    className: `w-full h-full object-cover`
                  })
                })]
              })
            }, e.id))
          }), l === `gallery` && (0, $.jsx)(`div`, {
            children: v.length === 0 ? (0, $.jsxs)(`div`, {
              className: `p-8 text-center rounded-2xl border ${i?`border-slate-800`:`border-slate-200`}`,
              children: [(0, $.jsx)(F, {
                className: `w-8 h-8 text-slate-400 mx-auto mb-2 opacity-50`
              }), (0, $.jsx)(`p`, {
                className: `text-xs font-bold text-slate-600 dark:text-slate-400`,
                children: `No verification selfies uploaded yet.`
              })]
            }) : (0, $.jsx)(`div`, {
              className: `grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5`,
              children: v.map(e => (0, $.jsxs)(`div`, {
                onClick: () => s(e),
                className: `group rounded-2xl border overflow-hidden p-2.5 transition-all cursor-pointer ${i?`bg-[#1e293b] border-slate-800 hover:border-[#EF4444]`:`bg-white border-slate-200 hover:border-[#EF4444] shadow-2xs`}`,
                children: [(0, $.jsx)(`div`, {
                  className: `w-full aspect-square rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 relative mb-2`,
                  children: (0, $.jsx)(`img`, {
                    src: e.photo_url,
                    alt: `Verification Selfie`,
                    className: `w-full h-full object-cover group-hover:scale-105 transition-transform`
                  })
                }), (0, $.jsxs)(`div`, {
                  className: `flex items-center justify-between text-[10px]`,
                  children: [(0, $.jsx)(`span`, {
                    className: `font-bold uppercase text-slate-700 dark:text-slate-300`,
                    children: e.action_type.replace(`_`, ` `)
                  }), (0, $.jsx)(`span`, {
                    className: `font-mono text-slate-400`,
                    children: new Date(e.timestamp).toLocaleDateString(`en-US`, {
                      month: `numeric`,
                      day: `numeric`
                    })
                  })]
                })]
              }, e.id))
            })
          })]
        })]
      })
    })]
  })
}, Zc = ({
  schedules: e,
  weekStartDate: t,
  onWeekChange: n,
  onScheduleUpdated: r,
  teamLogs: i = [],
  defaultShiftStart: a = `16:00`,
  defaultShiftEnd: o = `02:00`,
  isDark: s = !0,
  isReadOnly: c = !1,
  department: l = `Operations`,
  managerName: u = `Operations Manager`,
  onConfigureShift: d
}) => {
  let [f, p] = (0, T.useState)(e), [m, h] = (0, T.useState)(!1), g = (0, T.useRef)(!1), [_, v] = (0, T.useState)(!1), [y, b] = (0, T.useState)(!1), [x, S] = (0, T.useState)(``), [C, w] = (0, T.useState)(null), [E, D] = (0, T.useState)({}), [O, k] = (0, T.useState)(null), [A, j] = (0, T.useState)(``), [M, N] = (0, T.useState)(!1), [F, ee] = (0, T.useState)(!1), [B, V] = (0, T.useState)(!1), [te, U] = (0, T.useState)(null), W = (0, T.useMemo)(() => Ks(), []);
  (0, T.useEffect)(() => {
    sc(void 0, Vs.map(e => Us(t, e))).then(e => {
      D(e)
    })
  }, [t]);
  let ne = (0, T.useMemo)(() => {
    let e = new Map;
    if (!i || i.length === 0) return e;
    let t = new Map;
    i.forEach(e => {
      let n = t.get(e.telegram_id) || [];
      n.push(e), t.set(e.telegram_id, n)
    });
    let n = Date.now();
    return t.forEach((t, r) => {
      let i = [...t].sort((e, t) => new Date(e.timestamp).getTime() - new Date(t.timestamp).getTime()),
        a = i[i.length - 1];
      if (a) {
        let t = new Date(a.timestamp).getTime(),
          i = a.action_type === `check_in` && n - t >= 36e6,
          o = a.action_type === `check_in` && !i;
        e.set(r, {
          isCheckedIn: o,
          lastAction: i ? `check_out` : a.action_type,
          timeFormatted: Xs(a.timestamp)
        })
      }
    }), e
  }, [i]);
  (0, T.useEffect)(() => {
    g.current || (p(e), h(!1))
  }, [e]), (0, T.useEffect)(() => {
    p(e), h(!1), g.current = !1
  }, [t]), (0, T.useEffect)(() => {
    O && (j(O.note || ``), ee(!1))
  }, [O]);
  let re = e => {
      let [r, i, a] = t.split(`-`).map(Number), o = new Date(r, i - 1, a);
      o.setDate(o.getDate() + e);
      let s = e => String(e).padStart(2, `0`);
      n(`${o.getFullYear()}-${s(o.getMonth()+1)}-${s(o.getDate())}`), w(null)
    },
    ie = () => {
      let e = new Date,
        t = e.getDay(),
        r = e.getDate() - t + (t === 0 ? -6 : 1),
        i = new Date(e.setDate(r)),
        a = e => String(e).padStart(2, `0`);
      n(`${i.getFullYear()}-${a(i.getMonth()+1)}-${a(i.getDate())}`), w(null)
    },
    ae = (e, n, r) => {
      c || Zs(t, n) && (p(t => t.map(t => {
        if (t.telegram_id !== e) return t;
        let i = t[n] || {
            status: `scheduled`
          },
          s = {
            ...i,
            status: r,
            startTime: r === `scheduled` ? i.startTime || a : void 0,
            endTime: r === `scheduled` ? i.endTime || o : void 0
          };
        return {
          ...t,
          [n]: s
        }
      })), h(!0), g.current = !0, b(!1), w(null))
    },
    G = (e, n, r, i) => {
      c || Zs(t, n) && (p(t => t.map(t => {
        if (t.telegram_id !== e) return t;
        let a = {
          ...t[n] || {
            status: `scheduled`
          },
          status: `scheduled`,
          startTime: r,
          endTime: i
        };
        return {
          ...t,
          [n]: a
        }
      })), h(!0), g.current = !0, b(!1))
    },
    K = async () => {
      if (!c && m) {
        v(!0);
        try {
          await ic(f), h(!1), g.current = !1, b(!0), setTimeout(() => b(!1), 2500), r()
        } catch (e) {
          console.error(`Failed to save schedules:`, e)
        } finally {
          v(!1)
        }
      }
    }, se = async () => {
      if (!O) return;
      N(!0);
      let e = A.trim();
      try {
        await cc(O.telegramId, O.dayDate, e, u);
        let t = `${O.telegramId}_${O.dayDate}`;
        D(n => {
          let r = {
            ...n
          };
          return e ? r[t] = e : delete r[t], r
        }), p(t => t.map(t => {
          if (t.telegram_id !== O.telegramId) return t;
          let n = t[O.dayKey] || {
            status: `scheduled`
          };
          return {
            ...t,
            [O.dayKey]: {
              ...n,
              note: e
            }
          }
        })), ee(!0), setTimeout(() => {
          ee(!1), k(null)
        }, 500)
      } catch (e) {
        console.error(`Failed to save day note:`, e)
      } finally {
        N(!1)
      }
    }, q = async () => {
      if (O) {
        N(!0);
        try {
          await cc(O.telegramId, O.dayDate, ``, u);
          let e = `${O.telegramId}_${O.dayDate}`;
          D(t => {
            let n = {
              ...t
            };
            return delete n[e], n
          }), j(``), ee(!0), setTimeout(() => {
            ee(!1), k(null)
          }, 400)
        } catch (e) {
          console.error(`Failed to clear day note:`, e)
        } finally {
          N(!1)
        }
      }
    }, ce = async () => {
      try {
        V(!0), await Uc({
          monthDateStr: t,
          department: l,
          managerName: u,
          defaultShiftStart: a,
          defaultShiftEnd: o,
          teamLogs: i,
          dayNotes: E,
          allowedTelegramIds: f.map(e => e.telegram_id)
        }), U(`Monthly Attendance (.xlsx) downloaded`), setTimeout(() => U(null), 3500)
      } catch (e) {
        console.error(`Failed to export Monthly Attendance Excel:`, e), alert(`Could not generate monthly attendance spreadsheet. Please try again.`)
      } finally {
        V(!1)
      }
    }, [J, Y] = (0, T.useState)(`all`), [DEPTF, DEPTSET] = (0, T.useState)(`All`), le = (0, T.useMemo)(() => {
      let W = DEPTF === `All` ? f : f.filter(e => ((e.department || e.employee?.department || ``) + ``).toUpperCase().trim() === DEPTF);
      if (!x.trim()) return W;
      let e = x.toLowerCase();
      return W.filter(t => {
        let n = `${t.employee?.first_name||``} ${t.employee?.last_name||``}`.toLowerCase(),
          r = (t.employee?.username || ``).toLowerCase(),
          i = String(t.telegram_id);
        return n.includes(e) || r.includes(e) || i.includes(e)
      })
    }, [f, x, DEPTF]), ue = (0, T.useMemo)(() => {
      let e = [],
        t = [],
        n = [],
        r = [];
      le.forEach(i => {
        let a = (i.employee?.shift_name || ``).toLowerCase().trim(),
          o = (i.employee?.shift_start_time || ``).trim();
        a.includes(`main`) || !a && o === `16:00` ? e.push(i) : a.includes(`night`) || o >= `20:00` || o && o < `06:00` ? n.push(i) : a.includes(`custom`) || i.employee?.shift_start_time && !a.includes(`unassigned`) ? t.push(i) : r.push(i)
      });
      let i = [{
        key: `main`,
        title: `MAIN SHIFT (4PM – 2AM)`,
        subtitle: `Core operations coverage`,
        records: e,
        dotColor: `bg-cyan-400`,
        titleColor: s ? `text-cyan-300` : `text-cyan-800`,
        badgeClass: s ? `bg-cyan-950/80 text-cyan-300 border border-cyan-800` : `bg-cyan-100 text-cyan-900`
      }, {
        key: `custom`,
        title: `CUSTOM SHIFT`,
        subtitle: `Flexible & staggered hours`,
        records: t,
        dotColor: `bg-amber-400`,
        titleColor: s ? `text-amber-300` : `text-amber-800`,
        badgeClass: s ? `bg-amber-950/80 text-amber-300 border border-amber-800` : `bg-amber-100 text-amber-900`
      }, {
        key: `night`,
        title: `NIGHT SHIFT`,
        subtitle: `Late night & overnight coverage`,
        records: n,
        dotColor: `bg-purple-400`,
        titleColor: s ? `text-purple-300` : `text-purple-800`,
        badgeClass: s ? `bg-purple-950/80 text-purple-300 border border-purple-800` : `bg-purple-100 text-purple-900`
      }, {
        key: `other`,
        title: `UNASSIGNED / PENDING SHIFT`,
        subtitle: `Personnel awaiting shift assignment`,
        records: r,
        dotColor: `bg-slate-400`,
        titleColor: s ? `text-slate-400` : `text-slate-700`,
        badgeClass: s ? `bg-slate-800 text-slate-300 border border-slate-700` : `bg-slate-200 text-slate-800`
      }];
      return J === `all` ? i.filter(e => e.records.length > 0) : i.filter(e => e.key === J && e.records.length > 0)
    }, [le, J, s]), de = (0, T.useMemo)(() => {
      let e = Us(t, `monday`),
        n = Us(t, `sunday`),
        r = new Date(e + `T00:00:00`),
        i = new Date(n + `T00:00:00`);
      return `${r.toLocaleDateString(`en-US`,{month:`short`,day:`numeric`})} – ${i.toLocaleDateString(`en-US`,{month:`short`,day:`numeric`,year:`numeric`})}`
    }, [t]), fe = s ? `bg-[#0E121A]` : `bg-white`, pe = s ? `bg-[#121622] text-slate-200` : `bg-slate-900 text-white`, me = s ? `border-[#262C3A]` : `border-slate-300`;
  return (0, $.jsxs)(`div`, {
    className: `w-full flex flex-col gap-3`,
    children: [(0, $.jsxs)(`div`, {
      className: `p-3 rounded-2xl border ${me} ${fe} flex flex-wrap items-center justify-between gap-3 shadow-sm`,
      children: [(0, $.jsxs)(`div`, {
        className: `flex flex-wrap items-center gap-3`,
        children: [(0, $.jsxs)(`div`, {
          className: `flex items-center gap-2`,
          children: [(0, $.jsx)(`div`, {
            className: `p-1.5 rounded-lg bg-red-500/10 text-red-500 font-bold`,
            children: (0, $.jsx)(P, {
              className: `w-4 h-4`
            })
          }), (0, $.jsxs)(`div`, {
            children: [(0, $.jsx)(`div`, {
              className: `text-xs uppercase tracking-wider ${s?`text-slate-400 font-bold`:`text-black font-extrabold`}`,
              children: `Weekly Attendance Plan`
            }), (0, $.jsx)(`div`, {
              className: `text-sm flex items-center gap-2 ${s?`text-white font-extrabold`:`text-black font-black`}`,
              children: (0, $.jsx)(`span`, {
                children: de
              })
            })]
          })]
        }), (0, $.jsxs)(`div`, {
          className: `flex items-center gap-1 border rounded-xl p-0.5 ${me} ${s?`bg-[#090C12]`:`bg-slate-100`}`,
          children: [(0, $.jsx)(`button`, {
            onClick: () => re(-7),
            className: `p-1 rounded-lg transition-colors cursor-pointer ${s?`text-slate-400 hover:text-white hover:bg-slate-700/30`:`text-slate-800 hover:text-black hover:bg-slate-200`}`,
            title: `Previous Week`,
            children: (0, $.jsx)(R, {
              className: `w-4 h-4`
            })
          }), (0, $.jsx)(`button`, {
            onClick: ie,
            className: `px-2.5 py-1 rounded-lg text-xs transition-colors cursor-pointer ${s?`font-bold text-slate-300 hover:text-white hover:bg-slate-700/30`:`font-extrabold text-black hover:bg-slate-200`}`,
            children: `Current Week`
          }), (0, $.jsx)(`button`, {
            onClick: () => re(7),
            className: `p-1 rounded-lg transition-colors cursor-pointer ${s?`text-slate-400 hover:text-white hover:bg-slate-700/30`:`text-slate-800 hover:text-black hover:bg-slate-200`}`,
            title: `Next Week`,
            children: (0, $.jsx)(z, {
              className: `w-4 h-4`
            })
          })]
        })]
      }), (0, $.jsxs)(`div`, {
        className: `flex flex-wrap items-center gap-2`,
        children: [(0, $.jsxs)(`div`, {
          className: `flex items-center rounded-xl border p-1 text-xs shrink-0 ${s?`border-[#262C3A] bg-[#121622]`:`border-slate-300 bg-slate-100`}`,
          children: [(0, $.jsx)(`button`, {
            type: `button`,
            onClick: () => Y(`all`),
            className: `px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer ${J===`all`?`bg-[#EF4444] text-white shadow-xs`:s?`text-slate-400 hover:text-white`:`text-slate-600 hover:text-slate-900`}`,
            children: `All Shifts`
          }), (0, $.jsx)(`button`, {
            type: `button`,
            onClick: () => Y(`main`),
            className: `px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer ${J===`main`?`bg-cyan-600 text-white shadow-xs`:s?`text-slate-400 hover:text-cyan-300`:`text-slate-600 hover:text-cyan-700`}`,
            children: `Main Shift`
          }), (0, $.jsx)(`button`, {
            type: `button`,
            onClick: () => Y(`custom`),
            className: `px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer ${J===`custom`?`bg-amber-600 text-white shadow-xs`:s?`text-slate-400 hover:text-amber-300`:`text-slate-600 hover:text-amber-700`}`,
            children: `Custom Shift`
          }), (0, $.jsx)(`button`, {
            type: `button`,
            onClick: () => Y(`night`),
            className: `px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer ${J===`night`?`bg-purple-600 text-white shadow-xs`:s?`text-slate-400 hover:text-purple-300`:`text-slate-600 hover:text-purple-700`}`,
            children: `Night Shift`
          })]
        }), (0, $.jsxs)(`div`, {
          className: `flex items-center gap-1 rounded-xl border p-0.5 ${s?`border-[#262C3A] bg-[#121622]`:`border-slate-300 bg-slate-100`}`,
          children: [`All`, `7CORE`, `CARGOGPT`, `HOS`].map(e => (0, $.jsx)(`button`, {
            type: `button`,
            onClick: () => DEPTSET(e),
            className: `px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer whitespace-nowrap ${DEPTF===e?`bg-[#EF4444] text-white shadow-xs`:s?`text-slate-400 hover:text-white`:`text-slate-600 hover:text-slate-900`}`,
            children: e
          }, e))
        }), (0, $.jsx)(`input`, {
          type: `text`,
          value: x,
          onChange: e => S(e.target.value),
          placeholder: `Search member...`,
          className: `px-3 py-1.5 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-red-500 w-36 sm:w-48 ${s?`bg-[#121622] border-[#262C3A] text-white placeholder-slate-500 font-medium`:`bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-500 font-bold`}`
        }), (0, $.jsxs)(`button`, {
          type: `button`,
          onClick: ce,
          disabled: B,
          className: `px-3.5 py-1.5 rounded-xl border text-xs flex items-center gap-1.5 transition-all shadow-sm cursor-pointer ${s?`border-blue-500/30 bg-blue-950/40 hover:bg-blue-900/50 text-blue-300 font-bold`:`border-slate-300 bg-white hover:bg-slate-100 text-black font-black shadow-xs`}`,
          title: `Download full month attendance calendar (.xlsx) with all weeks stacked`,
          children: [B ? (0, $.jsx)(X, {
            className: `w-3.5 h-3.5 animate-spin ${s?`text-blue-400`:`text-black`}`
          }) : (0, $.jsx)(P, {
            className: `w-3.5 h-3.5 ${s?`text-blue-400`:`text-blue-600`}`
          }), (0, $.jsx)(`span`, {
            className: s ? `text-blue-300 font-bold` : `text-black font-black`,
            children: B ? `Exporting Month...` : `Monthly Attendance (.xlsx)`
          })]
        }), !c && (0, $.jsxs)(`button`, {
          onClick: K,
          disabled: _ || !m,
          className: `px-4 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${m?`bg-[#EF4444] hover:bg-red-500 text-white shadow-md shadow-red-500/25 ring-2 ring-red-400/40 cursor-pointer animate-pulse`:y?`bg-emerald-600 text-white shadow-sm cursor-default`:s?`bg-[#161B26] text-slate-500 border border-[#262C3A] cursor-not-allowed opacity-70`:`bg-slate-200 text-slate-500 border border-slate-300 cursor-not-allowed opacity-70`}`,
          children: [_ ? (0, $.jsx)(ye, {
            className: `w-3.5 h-3.5 animate-spin`
          }) : y && !m ? (0, $.jsx)(I, {
            className: `w-3.5 h-3.5`
          }) : (0, $.jsx)(xe, {
            className: `w-3.5 h-3.5`
          }), (0, $.jsx)(`span`, {
            children: _ ? `Saving...` : y && !m ? `Saved` : `Save Changes`
          })]
        }), te && (0, $.jsxs)(`span`, {
          className: `text-xs font-bold text-emerald-400 flex items-center gap-1 animate-fade-in`,
          children: [(0, $.jsx)(H, {
            className: `w-3.5 h-3.5`
          }), ` `, te]
        })]
      })]
    }), (0, $.jsx)(`div`, {
      className: `w-full flex-1 overflow-auto rounded-2xl border ${me} ${fe} shadow-sm min-h-[550px] pb-64`,
      children: (0, $.jsxs)(`table`, {
        className: `w-full text-left border-collapse text-xs table-fixed`,
        children: [(0, $.jsx)(`thead`, {
          children: (0, $.jsxs)(`tr`, {
            className: `border-b text-[11px] font-bold uppercase tracking-wider ${pe}`,
            children: [(0, $.jsx)(`th`, {
              className: `py-3 px-3 sticky left-0 z-20 bg-inherit w-[220px] min-w-[220px] max-w-[220px] border-r ${me}`,
              children: `Team Member`
            }), Vs.map(e => {
              let n = Us(t, e),
                r = Zs(t, e),
                i = n === W;
              return (0, $.jsxs)(`th`, {
                className: `py-2.5 px-2 text-center border-r ${s?`border-[#262C3A]`:`border-slate-700`} ${i?s?`bg-blue-950/60 text-blue-200 font-extrabold`:`bg-blue-900 text-white font-extrabold`:s?`text-slate-200`:`text-white`}`,
                children: [(0, $.jsxs)(`div`, {
                  className: `flex items-center justify-center gap-1`,
                  children: [(0, $.jsx)(`span`, {
                    className: `font-extrabold`,
                    children: e.slice(0, 3).toUpperCase()
                  }), !r && (0, $.jsx)(`span`, {
                    title: `Locked (Past & Today)`,
                    children: (0, $.jsx)(Z, {
                      className: `w-2.5 h-2.5 text-red-400 shrink-0`
                    })
                  })]
                }), (0, $.jsxs)(`div`, {
                  className: `text-[10px] font-mono mt-0.5 ${i?`text-amber-300 font-bold`:s?`text-slate-400`:`text-slate-300`}`,
                  children: [n.slice(5), ` `, i && (0, $.jsx)(`span`, {
                    className: `text-amber-300 font-bold`,
                    children: `(Today)`
                  })]
                })]
              }, e)
            })]
          })
        }), (0, $.jsx)(`tbody`, {
          className: `divide-y ${s?`divide-[#262C3A]`:`divide-slate-200`}`,
          children: ue.length === 0 ? (0, $.jsx)(`tr`, {
            children: (0, $.jsx)(`td`, {
              colSpan: 8,
              className: `py-12 text-center text-slate-400 text-xs font-semibold`,
              children: `No members found matching current shift or search criteria.`
            })
          }) : ue.map(e => (0, $.jsxs)(T.Fragment, {
            children: [(0, $.jsx)(`tr`, {
              className: s ? `bg-[#0A0D15]` : `bg-slate-100/90`,
              children: (0, $.jsx)(`td`, {
                colSpan: 8,
                className: `py-2 px-3 border-y ${me}`,
                children: (0, $.jsxs)(`div`, {
                  className: `flex items-center justify-between`,
                  children: [(0, $.jsxs)(`div`, {
                    className: `flex items-center gap-2`,
                    children: [(0, $.jsx)(`span`, {
                      className: `w-2.5 h-2.5 rounded-sm ${e.dotColor}`
                    }), (0, $.jsx)(`span`, {
                      className: `font-black text-xs uppercase tracking-wider ${e.titleColor}`,
                      children: e.title
                    }), (0, $.jsxs)(`span`, {
                      className: `text-[10px] px-2 py-0.5 rounded-md font-extrabold ${e.badgeClass}`,
                      children: [e.records.length, ` `, e.records.length === 1 ? `member` : `members`]
                    })]
                  }), (0, $.jsx)(`span`, {
                    className: `text-[11px] ${s?`text-slate-400`:`text-slate-600`} font-medium`,
                    children: e.subtitle
                  })]
                })
              })
            }), e.records.map(e => {
              let n = e.employee,
                r = `${n?.first_name||`Staff`} ${n?.last_name||``}`.trim(),
                i = ne.get(e.telegram_id);
              return (0, $.jsxs)(`tr`, {
                className: `transition-colors ${s?`hover:bg-[#161B26]`:`hover:bg-slate-50`}`,
                children: [(0, $.jsx)(`td`, {
                  className: `py-2 px-3 sticky left-0 z-10 border-r ${me} w-[220px] min-w-[220px] max-w-[220px] ${s?`bg-[#0E121A]`:`bg-white`}`,
                  children: (0, $.jsxs)(`div`, {
                    onClick: () => n && d && d(n),
                    className: `flex items-center gap-2.5 ${n&&d?`cursor-pointer group`:``}`,
                    children: [(0, $.jsx)(`div`, {
                      className: `w-8 h-8 rounded-full overflow-hidden border flex items-center justify-center shrink-0 ${s?`bg-[#07090E] border-[#262C3A]`:`bg-slate-100 border-slate-300`}`,
                      children: n?.photo_url ? (0, $.jsx)(`img`, {
                        src: n.photo_url,
                        alt: r,
                        className: `w-full h-full object-cover`
                      }) : (0, $.jsx)(Be, {
                        className: `w-4 h-4 text-slate-400`
                      })
                    }), (0, $.jsxs)(`div`, {
                      className: `min-w-0 flex-1`,
                      children: [(0, $.jsx)(`span`, {
                        className: `font-bold block truncate text-xs ${s?`text-white group-hover:text-red-400`:`text-slate-900 group-hover:text-red-600`} transition-colors`,
                        children: r
                      }), (0, $.jsx)(`span`, {
                        className: `text-[10px] font-mono block ${s?`text-slate-400`:`text-slate-500`}`,
                        children: n?.shift_start_time ? `${n.shift_start_time}–${n.shift_end_time}` : `Unassigned`
                      })]
                    })]
                  })
                }), Vs.map(l => {
                  let u = e[l] || {
                      status: `scheduled`
                    },
                    d = !c && Zs(t, l),
                    f = Us(t, l),
                    p = f === W,
                    m = C?.telegramId === e.telegram_id && C?.dayKey === l,
                    h = u.status === `off`,
                    g = u.status === `sick`,
                    _ = !h && !g,
                    v = u.startTime || n?.shift_start_time || a,
                    y = u.endTime || n?.shift_end_time || o,
                    b = `${e.telegram_id}_${f}`,
                    x = E[b] || u.note || ``;
                  return (0, $.jsx)(`td`, {
                    className: `p-1.5 border-r ${me} align-top relative ${p?s?`bg-blue-950/15`:`bg-blue-50/40`:``}`,
                    children: (0, $.jsxs)(`div`, {
                      className: `relative w-full flex flex-col gap-1`,
                      children: [(0, $.jsx)(`button`, {
                        type: `button`,
                        onClick: () => {
                          d && w(m ? null : {
                            telegramId: e.telegram_id,
                            dayKey: l
                          })
                        },
                        disabled: !d,
                        className: `w-full min-h-[46px] p-1.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-0.5 select-none ${d?`cursor-pointer hover:shadow-md`:`opacity-90 cursor-not-allowed shadow-inner`} ${h?s?`bg-[#7F1D1D] border-rose-500/60 text-white hover:border-rose-300 shadow-sm`:`bg-[#991B1B] border-red-950 text-white shadow-xs`:g?s?`bg-[#7C2D12] border-amber-500/60 text-white hover:border-amber-300 shadow-sm`:`bg-[#92400E] border-amber-950 text-white shadow-xs`:s?`bg-[#064E3B] border-emerald-500/60 text-white hover:border-emerald-300 shadow-sm`:`bg-[#065F46] border-emerald-950 text-white shadow-xs`}`,
                        children: h ? (0, $.jsx)(`span`, {
                          className: `font-black text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-md shadow-xs ${s?`bg-black/50 border border-rose-400/60 text-rose-100 font-extrabold`:`bg-red-950/90 border border-red-500/60 text-white`}`,
                          children: `OFF`
                        }) : g ? (0, $.jsx)(`span`, {
                          className: `font-black text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-md shadow-xs ${s?`bg-black/50 border border-amber-400/60 text-amber-100 font-extrabold`:`bg-amber-950/90 border border-amber-500/60 text-white`}`,
                          children: `SICK`
                        }) : (0, $.jsxs)($.Fragment, {
                          children: [(0, $.jsxs)(`span`, {
                            className: `font-mono text-[11px] font-extrabold tracking-wide ${s?`text-emerald-100 font-black`:`text-white font-bold`}`,
                            children: [v, ` – `, y]
                          }), p && (0, $.jsx)(`div`, {
                            className: `flex items-center gap-1 mt-0.5`,
                            children: i?.isCheckedIn ? (0, $.jsxs)(`div`, {
                              className: `flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-black/40 border border-emerald-400/80 text-emerald-200 font-bold text-[9px]`,
                              children: [(0, $.jsx)(`span`, {
                                className: `w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse`
                              }), (0, $.jsxs)(`span`, {
                                className: `text-[9px] font-bold text-emerald-200 font-mono`,
                                children: [`IN `, i.timeFormatted]
                              })]
                            }) : _ ? (0, $.jsxs)(`div`, {
                              className: `flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-black/50 border border-rose-400/90 text-rose-200 font-bold text-[9px] animate-pulse`,
                              children: [(0, $.jsxs)(`span`, {
                                className: `relative flex h-1.5 w-1.5`,
                                children: [(0, $.jsx)(`span`, {
                                  className: `animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-80`
                                }), (0, $.jsx)(`span`, {
                                  className: `relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-500`
                                })]
                              }), (0, $.jsx)(`span`, {
                                className: `text-white font-bold`,
                                children: `Not In`
                              })]
                            }) : (0, $.jsx)(`span`, {
                              className: `text-[9px] font-mono text-slate-200 font-bold`,
                              children: `Not In`
                            })
                          })]
                        })
                      }), (0, $.jsxs)(`button`, {
                        type: `button`,
                        onClick: t => {
                          t.stopPropagation(), k({
                            telegramId: e.telegram_id,
                            empName: r,
                            dayKey: l,
                            dayDate: f,
                            note: x
                          })
                        },
                        className: `w-full px-2 py-1 rounded-lg border text-[10px] font-medium flex items-center justify-between gap-1 transition-all cursor-pointer ${x?s?`bg-amber-950 border-white/40 text-amber-100 hover:bg-amber-900 shadow-xs`:`bg-[#78350F] border-white/40 text-white font-bold hover:bg-[#92400E] shadow-xs`:s?`bg-[#10141E] border-white/30 text-white hover:text-white hover:border-white/60 hover:bg-slate-800`:`bg-slate-800 border-white/40 text-white font-bold hover:bg-slate-700 hover:border-white/70`}`,
                        title: x ? `Note: ${x}` : `Add note for ${r} on ${f}`,
                        children: [(0, $.jsxs)(`div`, {
                          className: `flex items-center gap-1.5 min-w-0`,
                          children: [(0, $.jsx)(oe, {
                            className: `w-3 h-3 shrink-0 ${x?s?`text-amber-300`:`text-amber-200`:`text-white/80`}`
                          }), (0, $.jsx)(`span`, {
                            className: `truncate text-white font-bold`,
                            children: x || `Notes`
                          })]
                        }), x && (0, $.jsx)(`span`, {
                          className: `w-1.5 h-1.5 rounded-full bg-amber-300 shrink-0 border border-white/60`
                        })]
                      }), m && (0, $.jsxs)($.Fragment, {
                        children: [(0, $.jsx)(`div`, {
                          className: `fixed inset-0 z-30`,
                          onClick: () => w(null)
                        }), (0, $.jsxs)(`div`, {
                          className: `absolute left-0 top-full mt-1.5 z-40 w-48 p-2 rounded-xl border shadow-xl flex flex-col gap-1 ${s?`bg-[#121620] border-[#262C3A]`:`bg-white border-slate-300`}`,
                          children: [(0, $.jsx)(`div`, {
                            className: `text-[10px] uppercase tracking-wider px-2 py-1 ${s?`text-slate-400 font-bold`:`text-black font-extrabold`}`,
                            children: `Change Status`
                          }), (0, $.jsxs)(`button`, {
                            type: `button`,
                            onClick: () => ae(e.telegram_id, l, `scheduled`),
                            className: `px-2.5 py-1.5 rounded-lg text-left text-xs transition-colors flex items-center justify-between ${u.status===`scheduled`?s?`bg-emerald-500/15 text-emerald-400 font-bold`:`bg-emerald-100 text-black font-extrabold`:s?`hover:bg-[#1A202C] text-slate-300 font-medium`:`hover:bg-slate-100 text-black font-bold`}`,
                            children: [(0, $.jsx)(`span`, {
                              children: `Scheduled (Work)`
                            }), u.status === `scheduled` && (0, $.jsx)(H, {
                              className: `w-3.5 h-3.5 text-emerald-500`
                            })]
                          }), (0, $.jsxs)(`button`, {
                            type: `button`,
                            onClick: () => ae(e.telegram_id, l, `off`),
                            className: `px-2.5 py-1.5 rounded-lg text-left text-xs transition-colors flex items-center justify-between ${u.status===`off`?s?`bg-rose-500/15 text-rose-400 font-bold`:`bg-rose-100 text-black font-extrabold`:s?`hover:bg-[#1A202C] text-slate-300 font-medium`:`hover:bg-slate-100 text-black font-bold`}`,
                            children: [(0, $.jsx)(`span`, {
                              children: `Day Off`
                            }), u.status === `off` && (0, $.jsx)(H, {
                              className: `w-3.5 h-3.5 text-rose-500`
                            })]
                          }), (0, $.jsxs)(`button`, {
                            type: `button`,
                            onClick: () => ae(e.telegram_id, l, `sick`),
                            className: `px-2.5 py-1.5 rounded-lg text-left text-xs transition-colors flex items-center justify-between ${u.status===`sick`?s?`bg-amber-500/15 text-amber-400 font-bold`:`bg-amber-100 text-black font-extrabold`:s?`hover:bg-[#1A202C] text-slate-300 font-medium`:`hover:bg-slate-100 text-black font-bold`}`,
                            children: [(0, $.jsx)(`span`, {
                              children: `Sick Leave`
                            }), u.status === `sick` && (0, $.jsx)(H, {
                              className: `w-3.5 h-3.5 text-amber-500`
                            })]
                          }), (0, $.jsxs)(`div`, {
                            className: `pt-1 mt-1 border-t px-2 ${s?`border-slate-700/40`:`border-slate-300`}`,
                            children: [(0, $.jsx)(`span`, {
                              className: `text-[10px] block mb-1 ${s?`text-slate-400 font-semibold`:`text-black font-extrabold`}`,
                              children: `Custom Hours:`
                            }), (0, $.jsxs)(`div`, {
                              className: `flex items-center gap-1`,
                              children: [(0, $.jsx)(`input`, {
                                type: `time`,
                                value: v,
                                onChange: t => G(e.telegram_id, l, t.target.value, y),
                                className: `w-20 px-1 py-0.5 rounded text-[11px] font-mono border ${s?`bg-[#0D1017] border-[#262C3A] text-white`:`bg-slate-100 border-slate-300 text-black font-extrabold`}`
                              }), (0, $.jsx)(`span`, {
                                className: `text-xs ${s?`text-slate-400`:`text-black font-bold`}`,
                                children: `–`
                              }), (0, $.jsx)(`input`, {
                                type: `time`,
                                value: y,
                                onChange: t => G(e.telegram_id, l, v, t.target.value),
                                className: `w-20 px-1 py-0.5 rounded text-[11px] font-mono border ${s?`bg-[#0D1017] border-[#262C3A] text-white`:`bg-slate-100 border-slate-300 text-black font-extrabold`}`
                              })]
                            })]
                          })]
                        })]
                      })]
                    })
                  }, l)
                })]
              }, e.telegram_id)
            })]
          }, e.key))
        })]
      })
    }), O && (0, $.jsx)(`div`, {
      className: `fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in`,
      children: (0, $.jsxs)(`div`, {
        className: `w-full max-w-md rounded-2xl border p-5 shadow-2xl flex flex-col gap-4 ${s?`bg-[#10141E] border-[#262C3A] text-white`:`bg-white border-slate-200 text-slate-900`}`,
        children: [(0, $.jsxs)(`div`, {
          className: `flex items-start justify-between gap-3`,
          children: [(0, $.jsxs)(`div`, {
            className: `flex items-center gap-2.5`,
            children: [(0, $.jsx)(`div`, {
              className: `p-2 rounded-xl bg-amber-500/15 text-amber-400`,
              children: (0, $.jsx)(oe, {
                className: `w-5 h-5`
              })
            }), (0, $.jsxs)(`div`, {
              children: [(0, $.jsxs)(`h3`, {
                className: `text-sm font-bold`,
                children: [`Attendance Note: `, O.empName]
              }), (0, $.jsxs)(`div`, {
                className: `text-xs text-slate-400 font-mono mt-0.5`,
                children: [O.dayKey.toUpperCase(), ` • `, O.dayDate]
              })]
            })]
          }), (0, $.jsx)(`button`, {
            type: `button`,
            onClick: () => k(null),
            className: `p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer`,
            children: (0, $.jsx)(He, {
              className: `w-4 h-4`
            })
          })]
        }), (0, $.jsxs)(`div`, {
          className: `space-y-1.5`,
          children: [(0, $.jsxs)(`div`, {
            className: `text-[11px] font-bold text-slate-400 flex items-center gap-1`,
            children: [(0, $.jsx)(Me, {
              className: `w-3 h-3 text-amber-400`
            }), (0, $.jsx)(`span`, {
              children: `Quick Tags`
            })]
          }), (0, $.jsx)(`div`, {
            className: `flex flex-wrap gap-1.5`,
            children: [`Late Approved`, `Early Departure`, `Shift Swap`, `Excused Absence`, `Overtime Approved`].map(e => (0, $.jsxs)(`button`, {
              type: `button`,
              onClick: () => {
                A.includes(e) || j(t => t ? `${t} | ${e}` : e)
              },
              className: `px-2 py-0.5 rounded-md text-[10px] font-semibold border transition-colors cursor-pointer ${s?`bg-[#161B26] border-[#2A3142] text-slate-300 hover:border-amber-500/50 hover:text-amber-300`:`bg-slate-100 border-slate-300 text-slate-700 hover:border-amber-500 hover:text-amber-800`}`,
              children: [`+ `, e]
            }, e))
          })]
        }), (0, $.jsxs)(`div`, {
          className: `space-y-1.5`,
          children: [(0, $.jsx)(`label`, {
            className: `text-[11px] font-bold text-slate-400`,
            children: `Daily Note & Dispatch Exceptions`
          }), (0, $.jsx)(`textarea`, {
            value: A,
            onChange: e => j(e.target.value),
            placeholder: `Enter note for this day specifically (e.g. driver notified dispatcher at 15:30 about maintenance delay on truck #19)...`,
            rows: 4,
            className: `w-full p-3 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors resize-none ${s?`bg-[#0A0D14] border-[#222838] text-white placeholder-slate-500`:`bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400`}`
          }), (0, $.jsx)(`div`, {
            className: `text-[10px] text-slate-500`,
            children: `Notes are saved in the system and Supabase for this day specifically. Notes are included in exported Excel spreadsheets.`
          })]
        }), (0, $.jsxs)(`div`, {
          className: `flex items-center justify-between pt-2 border-t border-slate-700/40`,
          children: [A ? (0, $.jsxs)(`button`, {
            type: `button`,
            onClick: q,
            disabled: M,
            className: `px-3 py-1.5 rounded-xl border border-rose-500/30 text-rose-400 hover:bg-rose-950/40 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer`,
            children: [(0, $.jsx)(Pe, {
              className: `w-3.5 h-3.5`
            }), (0, $.jsx)(`span`, {
              children: `Clear`
            })]
          }) : (0, $.jsx)(`div`, {}), (0, $.jsxs)(`div`, {
            className: `flex items-center gap-2`,
            children: [(0, $.jsx)(`button`, {
              type: `button`,
              onClick: () => k(null),
              className: `px-3 py-1.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-xs font-bold text-slate-300 transition-colors cursor-pointer`,
              children: `Cancel`
            }), (0, $.jsxs)(`button`, {
              type: `button`,
              onClick: se,
              disabled: M,
              className: `px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all cursor-pointer`,
              children: [M ? (0, $.jsx)(X, {
                className: `w-3.5 h-3.5 animate-spin`
              }) : F ? (0, $.jsx)(H, {
                className: `w-3.5 h-3.5 text-slate-950`
              }) : (0, $.jsx)(xe, {
                className: `w-3.5 h-3.5`
              }), (0, $.jsx)(`span`, {
                children: M ? `Saving...` : F ? `Saved` : `Save Note`
              })]
            })]
          })]
        })]
      })
    })]
  })
}, Qc = ({
  isOpen: e,
  onClose: t,
  isDark: n,
  logs: r
}) => {
  if (!e) return null;
  let [i, a] = (0, T.useState)(`All`), [o, s] = (0, T.useState)(() => Hs(new Date)), [c, l] = (0, T.useState)([]), [u, d] = (0, T.useState)(r || []), [f, p] = (0, T.useState)(!0), [m, h] = (0, T.useState)(!0), g = (0, T.useCallback)(async () => {
    p(!0);
    try {
      let [e, t] = await Promise.all([nc(o, i), r && r.length > 0 ? Promise.resolve(r) : Os()]);
      l(e), t && d(t)
    } catch (e) {
      console.error(`Error fetching weekly matrix:`, e)
    } finally {
      p(!1)
    }
  }, [o, i, r]);
  (0, T.useEffect)(() => {
    g()
  }, [g]);
  let _ = n ? `bg-[#0D1017] text-white` : `bg-[#f4f6f8] text-slate-900`,
    v = n ? `bg-[#121620] border-[#262C3A]` : `bg-white border-slate-200`;
  return (0, $.jsx)(`div`, {
    className: `fixed inset-0 z-50 flex flex-col bg-black/85 backdrop-blur-md animate-fadeIn`,
    children: (0, $.jsxs)(`div`, {
      className: `w-full h-full flex flex-col ${_}`,
      children: [(0, $.jsxs)(`div`, {
        className: `px-4 sm:px-6 py-3 border-b flex items-center justify-between shadow-md ${v}`,
        children: [(0, $.jsxs)(`div`, {
          className: `flex items-center gap-3`,
          children: [(0, $.jsx)(`img`, {
            src: n ? `/logo2.png` : `/logo.png`,
            alt: `Sevencore Logo`,
            className: `h-8 md:h-9 object-contain`
          }), (0, $.jsxs)(`div`, {
            children: [(0, $.jsxs)(`div`, {
              className: `flex items-center gap-2`,
              children: [(0, $.jsx)(`h1`, {
                className: `text-base font-extrabold tracking-tight leading-tight`,
                children: `Team Attendance & Shift Schedule Matrix`
              }), (0, $.jsx)(`span`, {
                className: `text-[10px] font-bold px-2 py-0.5 rounded-full ${n?`bg-red-950/80 text-red-300 border border-red-800/80`:`bg-red-100 text-red-700 border border-red-200`}`,
                children: `FULL-SCREEN AUDIT`
              })]
            }), (0, $.jsx)(`p`, {
              className: `text-[11px] ${n?`text-[#94A3B8]`:`text-slate-700 font-medium`}`,
              children: `Persistent database archive of all weekly schedules, vacations, and off-days across all teams (Uzbekistan GMT+5)`
            })]
          })]
        }), (0, $.jsxs)(`div`, {
          className: `flex items-center gap-2.5`,
          children: [(0, $.jsx)(`button`, {
            onClick: () => g(),
            className: `p-2 rounded-xl border transition-colors cursor-pointer ${n?`border-[#262C3A] bg-[#0E121A] hover:bg-[#161B26] text-slate-300 hover:text-white`:`border-slate-300 bg-white hover:bg-slate-100 text-slate-900`}`,
            title: `Refresh`,
            children: (0, $.jsx)(ye, {
              className: `w-4 h-4 ${f?`animate-spin text-[#EF4444]`:``}`
            })
          }), (0, $.jsx)(`button`, {
            onClick: t,
            className: `p-2 rounded-xl border transition-colors cursor-pointer ${n?`border-[#262C3A] bg-[#0E121A] hover:bg-rose-950/60 text-slate-400 hover:text-rose-400`:`border-slate-300 bg-white hover:bg-rose-50 text-slate-700 hover:text-rose-600`}`,
            title: `Close Full Screen`,
            children: (0, $.jsx)(He, {
              className: `w-5 h-5`
            })
          })]
        })]
      }), (0, $.jsxs)(`div`, {
        className: `px-4 sm:px-6 py-2 border-b flex items-center gap-1.5 overflow-x-auto text-xs ${n?`bg-[#0E121A] border-[#262C3A]`:`bg-slate-100 border-slate-200`}`,
        children: [(0, $.jsxs)(`span`, {
          className: `text-[11px] font-bold flex items-center gap-1 shrink-0 mr-1 ${n?`text-slate-400`:`text-slate-900`}`,
          children: [(0, $.jsx)(N, {
            className: `w-3.5 h-3.5 text-[#EF4444]`
          }), ` Team / Dept:`]
        }), (0, $.jsx)(`button`, {
          onClick: () => a(`All`),
          className: `px-3 py-1 rounded-xl text-xs font-bold shrink-0 transition-colors cursor-pointer ${i===`All`?`bg-[#EF4444] text-white shadow-md shadow-red-500/25`:n?`text-slate-300 hover:bg-[#161B26]`:`text-slate-900 hover:bg-slate-200 border border-slate-300 font-bold`}`,
          children: `All Departments`
        }), kc.filter(e => !e.toLowerCase().includes(`fleet`)).map(e => (0, $.jsx)(`button`, {
          onClick: () => a(e),
          className: `px-3 py-1 rounded-xl text-xs font-bold shrink-0 transition-colors cursor-pointer ${i===e?`bg-[#EF4444] text-white shadow-md shadow-red-500/25`:n?`text-slate-300 hover:bg-[#161B26]`:`text-slate-900 hover:bg-slate-200 border border-slate-300 font-bold`}`,
          children: e
        }, e))]
      }), (0, $.jsx)(`div`, {
        className: `flex-1 overflow-auto p-2 sm:p-4 flex flex-col`,
        children: (0, $.jsx)(Zc, {
          schedules: c,
          weekStartDate: o,
          onWeekChange: e => s(e),
          onScheduleUpdated: () => g(),
          teamLogs: u,
          isDark: n,
          isReadOnly: !1,
          department: i,
          managerName: `Admin`
        })
      })]
    })
  })
}, $c = ({
  isOpen: e,
  onClose: t,
  isDark: n = !0,
  onUpdated: r
}) => {
  let [i, a] = (0, T.useState)([]), [o, s] = (0, T.useState)([]), [c, l] = (0, T.useState)(!1), [u, d] = (0, T.useState)(``), [f, p] = (0, T.useState)(`All`), [m, h] = (0, T.useState)(null), [g, _] = (0, T.useState)(null), v = (0, T.useCallback)(async () => {
    l(!0);
    try {
      let [e, t] = await Promise.all([Ds(), hc()]);
      a(e), s(t)
    } catch (e) {
      console.error(`Error loading assignments data:`, e)
    } finally {
      l(!1)
    }
  }, []);
  (0, T.useEffect)(() => {
    e && v()
  }, [e, v]), (0, T.useEffect)(() => {
    if (!e) return;
    let t = Bs(() => {
      v()
    });
    return () => t()
  }, [e, v]);
  let y = async (e, t) => {
    h(e);
    try {
      let n = t === `unassigned` ? null : t,
        a = await yc(e, n);
      if (a.success) {
        let t = o.find(e => e.id === n),
          a = i.find(t => t.telegram_id === e),
          s = a ? `${a.first_name} ${a.last_name||``}`.trim() : `ID ${e}`,
          c = n && t ? `Assigned ${s} to ${t.full_name} (${t.department})` : `Unassigned ${s} from manager`;
        _(c), setTimeout(() => _(null), 3500), await v(), r && r()
      } else alert(a.message || `Failed to assign manager.`)
    } catch (e) {
      console.error(`Failed to assign user to manager:`, e)
    } finally {
      h(null)
    }
  }, b = async (e, t) => {
    h(e);
    try {
      if (await bc(e, t)) {
        let n = i.find(t => t.telegram_id === e),
          a = n ? `${n.first_name} ${n.last_name||``}`.trim() : `ID ${e}`;
        _(`Updated ${a} department to ${t}`), setTimeout(() => _(null), 3500), await v(), r && r()
      } else alert(`Could not update department.`)
    } catch (e) {
      console.error(`Failed to switch employee department:`, e)
    } finally {
      h(null)
    }
  }, x = (0, T.useMemo)(() => {
    let e = i;
    if (f !== `All` && (e = e.filter(e => e.department === f)), u.trim()) {
      let t = u.toLowerCase();
      e = e.filter(e => {
        let n = `${e.first_name||``} ${e.last_name||``}`.toLowerCase(),
          r = (e.username || ``).toLowerCase(),
          i = String(e.telegram_id),
          a = (e.department || ``).toLowerCase();
        return n.includes(t) || r.includes(t) || i.includes(t) || a.includes(t)
      })
    }
    return e
  }, [i, f, u]);
  if (!e) return null;
  let S = n ? `bg-[#0E121A]` : `bg-white`,
    C = n ? `bg-[#121622]` : `bg-slate-50`,
    w = n ? `border-[#262C3A]` : `border-slate-200`,
    E = n ? `text-white` : `text-slate-900`,
    D = n ? `text-slate-400` : `text-slate-500`;
  return (0, $.jsxs)(`div`, {
    className: `fixed inset-0 z-50 flex items-stretch justify-end`,
    children: [(0, $.jsx)(`div`, {
      className: `fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity`,
      onClick: t
    }), (0, $.jsxs)(`div`, {
      className: `relative z-10 w-full max-w-4xl h-full ${S} border-l ${w} shadow-2xl flex flex-col font-['Plus_Jakarta_Sans',sans-serif] animate-slide-left overflow-hidden`,
      children: [(0, $.jsxs)(`div`, {
        className: `p-4 border-b ${w} ${C} flex items-center justify-between gap-4 shrink-0`,
        children: [(0, $.jsxs)(`div`, {
          className: `flex items-center gap-3`,
          children: [(0, $.jsx)(`div`, {
            className: `p-2 rounded-xl bg-red-500/10 text-red-500 font-bold shrink-0`,
            children: (0, $.jsx)(ze, {
              className: `w-5 h-5`
            })
          }), (0, $.jsxs)(`div`, {
            children: [(0, $.jsxs)(`h2`, {
              className: `text-base font-bold ${E} tracking-tight flex items-center gap-2`,
              children: [(0, $.jsx)(`span`, {
                children: `User Assignments & Department Control`
              }), (0, $.jsx)(`span`, {
                className: `text-[10px] font-mono py-0.5 px-2 rounded-md bg-red-950/60 text-red-300 border border-red-800`,
                children: `ADMIN /7CORE`
              })]
            }), (0, $.jsx)(`p`, {
              className: `text-xs ${D}`,
              children: `Assign floor personnel to manager teams and adjust department allocation across HOS, 7CORE, and CARGOGPT.`
            })]
          })]
        }), (0, $.jsxs)(`div`, {
          className: `flex items-center gap-2`,
          children: [(0, $.jsx)(`button`, {
            onClick: v,
            disabled: c,
            title: `Refresh personnel`,
            className: `p-2 rounded-xl border ${w} hover:bg-slate-800/30 text-slate-400 hover:text-white transition-colors cursor-pointer`,
            children: (0, $.jsx)(ye, {
              className: `w-4 h-4 ${c?`animate-spin`:``}`
            })
          }), (0, $.jsx)(`button`, {
            onClick: t,
            className: `p-2 rounded-xl border ${w} hover:bg-slate-800/30 text-slate-400 hover:text-white transition-colors cursor-pointer`,
            children: (0, $.jsx)(He, {
              className: `w-4 h-4`
            })
          })]
        })]
      }), (0, $.jsxs)(`div`, {
        className: `p-3 border-b ${w} flex flex-wrap items-center justify-between gap-3 shrink-0`,
        children: [(0, $.jsxs)(`div`, {
          className: `flex items-center rounded-xl border border-slate-700/50 p-1 text-xs bg-slate-900/50`,
          children: [(0, $.jsxs)(`button`, {
            onClick: () => p(`All`),
            className: `px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer ${f===`All`?`bg-[#EF4444] text-white shadow-sm`:`text-slate-400 hover:text-white`}`,
            children: [`All (`, i.length, `)`]
          }), kc.filter(e => !e.toLowerCase().includes(`fleet`)).map(e => {
            let t = i.filter(t => t.department === e).length;
            return (0, $.jsxs)(`button`, {
              onClick: () => p(e),
              className: `px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer ${f===e?`bg-[#EF4444] text-white shadow-sm`:`text-slate-400 hover:text-white`}`,
              children: [e, ` (`, t, `)`]
            }, e)
          })]
        }), (0, $.jsxs)(`div`, {
          className: `relative`,
          children: [(0, $.jsx)(Se, {
            className: `w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2`
          }), (0, $.jsx)(`input`, {
            type: `text`,
            value: u,
            onChange: e => d(e.target.value),
            placeholder: `Search name, username, ID...`,
            className: `py-1.5 pl-8 pr-3 rounded-xl border text-xs focus:outline-none focus:border-red-500 w-56 ${n?`bg-slate-900 border-slate-700 text-white placeholder:text-slate-500`:`bg-white border-slate-300 text-slate-900 placeholder:text-slate-400`}`
          })]
        })]
      }), g && (0, $.jsxs)(`div`, {
        className: `mx-4 mt-3 p-3 bg-emerald-950/70 border border-emerald-500/50 rounded-xl flex items-center gap-2 text-xs font-bold text-emerald-300 animate-fadeIn shrink-0`,
        children: [(0, $.jsx)(H, {
          className: `w-4 h-4 text-emerald-400 shrink-0`
        }), (0, $.jsx)(`span`, {
          children: g
        })]
      }), (0, $.jsx)(`div`, {
        className: `flex-1 overflow-auto p-4`,
        children: (0, $.jsx)(`div`, {
          className: `rounded-2xl border ${w} overflow-hidden shadow-sm`,
          children: (0, $.jsxs)(`table`, {
            className: `w-full text-left text-xs table-fixed`,
            children: [(0, $.jsx)(`thead`, {
              className: `text-[11px] font-bold uppercase tracking-wider border-b ${w} ${C} text-slate-400`,
              children: (0, $.jsxs)(`tr`, {
                children: [(0, $.jsx)(`th`, {
                  className: `py-3 px-4 w-[240px]`,
                  children: `Personnel`
                }), (0, $.jsx)(`th`, {
                  className: `py-3 px-3 w-[110px]`,
                  children: `Telegram ID`
                }), (0, $.jsx)(`th`, {
                  className: `py-3 px-3 w-[160px]`,
                  children: `Department`
                }), (0, $.jsx)(`th`, {
                  className: `py-3 px-3 w-[220px]`,
                  children: `Assigned Manager`
                }), (0, $.jsx)(`th`, {
                  className: `py-3 px-3 w-[140px] text-right`,
                  children: `Shift Info`
                })]
              })
            }), (0, $.jsx)(`tbody`, {
              className: `divide-y ${n?`divide-[#262C3A]`:`divide-slate-200`}`,
              children: x.length === 0 ? (0, $.jsx)(`tr`, {
                children: (0, $.jsx)(`td`, {
                  colSpan: 5,
                  className: `py-12 text-center text-slate-400 text-xs`,
                  children: `No personnel found matching current filters.`
                })
              }) : x.map(e => {
                let t = `${e.first_name||`Staff`} ${e.last_name||``}`.trim(),
                  r = o.find(t => t.assigned_employee_ids && t.assigned_employee_ids.includes(e.telegram_id)),
                  i = m === e.telegram_id;
                return (0, $.jsxs)(`tr`, {
                  className: `transition-colors ${n?`hover:bg-slate-800/40`:`hover:bg-slate-50`}`,
                  children: [(0, $.jsx)(`td`, {
                    className: `py-2.5 px-4`,
                    children: (0, $.jsxs)(`div`, {
                      className: `flex items-center gap-3`,
                      children: [(0, $.jsx)(`div`, {
                        className: `w-8 h-8 rounded-full overflow-hidden border flex items-center justify-center shrink-0 ${n?`bg-slate-900 border-[#262C3A]`:`bg-slate-100 border-slate-300`}`,
                        children: e.photo_url ? (0, $.jsx)(`img`, {
                          src: e.photo_url,
                          alt: t,
                          className: `w-full h-full object-cover`
                        }) : (0, $.jsx)(Ve, {
                          className: `w-4 h-4 text-slate-400`
                        })
                      }), (0, $.jsxs)(`div`, {
                        className: `min-w-0 flex-1`,
                        children: [(0, $.jsx)(`span`, {
                          className: `font-bold block truncate text-xs ${E}`,
                          children: t
                        }), e.username ? (0, $.jsxs)(`span`, {
                          className: `text-[10px] text-cyan-400 font-mono block truncate`,
                          children: [`@`, e.username]
                        }) : (0, $.jsx)(`span`, {
                          className: `text-[10px] ${D} block`,
                          children: `No username`
                        })]
                      })]
                    })
                  }), (0, $.jsx)(`td`, {
                    className: `py-2.5 px-3 font-mono text-[11px] text-slate-400`,
                    children: e.telegram_id
                  }), (0, $.jsx)(`td`, {
                    className: `py-2.5 px-3`,
                    children: (0, $.jsxs)(`div`, {
                      className: `flex items-center gap-1.5`,
                      children: [(0, $.jsx)(`select`, {
                        disabled: i,
                        value: e.department && !e.department.toLowerCase().includes(`fleet`) ? e.department : `7CORE`,
                        onChange: t => b(e.telegram_id, t.target.value),
                        className: `py-1 px-2.5 rounded-lg border text-xs font-bold focus:outline-none focus:border-red-500 cursor-pointer disabled:opacity-50 ${n?`bg-slate-900 border-slate-700 text-white`:`bg-white border-slate-300 text-slate-900`}`,
                        children: kc.filter(e => !e.toLowerCase().includes(`fleet`)).map(e => (0, $.jsx)(`option`, {
                          value: e,
                          children: e
                        }, e))
                      }), (0, $.jsx)(`span`, {
                        title: `Switch Department`,
                        children: (0, $.jsx)(A, {
                          className: `w-3 h-3 text-slate-500 shrink-0`
                        })
                      })]
                    })
                  }), (0, $.jsx)(`td`, {
                    className: `py-2.5 px-3`,
                    children: (0, $.jsxs)(`select`, {
                      disabled: i,
                      value: r ? r.id : `unassigned`,
                      onChange: t => y(e.telegram_id, t.target.value),
                      className: `w-full py-1 px-2.5 rounded-lg border text-xs font-bold focus:outline-none focus:border-red-500 cursor-pointer disabled:opacity-50 ${r?n?`bg-blue-950/50 border-blue-800 text-blue-200`:`bg-blue-50 border-blue-200 text-blue-900`:n?`bg-slate-900 border-slate-700 text-slate-400`:`bg-slate-100 border-slate-300 text-slate-600`}`,
                      children: [(0, $.jsx)(`option`, {
                        value: `unassigned`,
                        children: `-- Unassigned --`
                      }), o.map(e => {
                        let t = (e.department || `7CORE`).replace(/fleet/gi, `Operations`);
                        return (0, $.jsxs)(`option`, {
                          value: e.id,
                          children: [e.full_name, ` (`, t, `)`]
                        }, e.id)
                      })]
                    })
                  }), (0, $.jsxs)(`td`, {
                    className: `py-2.5 px-3 text-right`,
                    children: [(0, $.jsx)(`span`, {
                      className: `font-mono text-[11px] text-slate-300 block`,
                      children: e.shift_start_time ? `${e.shift_start_time}–${e.shift_end_time}` : `Unassigned`
                    }), (0, $.jsx)(`span`, {
                      className: `text-[10px] ${D} block truncate`,
                      children: e.shift_name || `No Shift`
                    })]
                  })]
                }, e.telegram_id)
              })
            })]
          })
        })
      }), (0, $.jsxs)(`div`, {
        className: `p-3 border-t ${w} ${C} flex items-center justify-between text-xs text-slate-400 shrink-0`,
        children: [(0, $.jsxs)(`div`, {
          className: `flex items-center gap-1.5`,
          children: [(0, $.jsx)(N, {
            className: `w-4 h-4 text-red-500`
          }), (0, $.jsx)(`span`, {
            children: `Assigning a user automatically updates their primary department on their mobile app and schedule records.`
          })]
        }), (0, $.jsx)(`button`, {
          onClick: t,
          className: `px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer transition-colors`,
          children: `Done`
        })]
      })]
    })]
  })
}, el = ({
  isOpen: e,
  onClose: t,
  isDark: n = !0
}) => {
  if ((0, T.useEffect)(() => {
      let n = e => {
        e.key === `Escape` && t()
      };
      return e && window.addEventListener(`keydown`, n), () => {
        window.removeEventListener(`keydown`, n)
      }
    }, [e, t]), !e) return null;
  let r = `/assets/aistudio/Opsector_Software_License___Intellectual_Property_Notice_b2eabd21.pdf?v=2`,
    i = n ? `bg-[#121620] border-[#262C3A] text-slate-100` : `bg-white border-slate-200 text-slate-800`,
    a = n ? `bg-[#0E121A] border-[#262C3A]` : `bg-slate-50 border-slate-200`;
  return (0, $.jsxs)(`div`, {
    className: `fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-xs font-['Plus_Jakarta_Sans',sans-serif]`,
    children: [(0, $.jsx)(`div`, {
      className: `fixed inset-0`,
      onClick: t,
      "aria-hidden": `true`
    }), (0, $.jsxs)(`div`, {
      className: `relative z-10 w-full max-w-4xl h-[88vh] flex flex-col rounded-2xl overflow-hidden border shadow-2xl ${i}`,
      children: [(0, $.jsxs)(`div`, {
        className: `px-4 sm:px-5 py-3 border-b flex items-center justify-between gap-3 ${a}`,
        children: [(0, $.jsxs)(`div`, {
          className: `flex items-center gap-2.5 min-w-0`,
          children: [(0, $.jsx)(`div`, {
            className: `w-8 h-8 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0`,
            children: (0, $.jsx)(oe, {
              className: `w-4 h-4 text-[#EF4444]`
            })
          }), (0, $.jsxs)(`div`, {
            className: `min-w-0`,
            children: [(0, $.jsx)(`h3`, {
              className: `text-sm font-bold truncate ${n?`text-white`:`text-slate-900`}`,
              children: `Opsector Software License`
            }), (0, $.jsx)(`p`, {
              className: `text-[11px] text-slate-400 truncate`,
              children: `Intellectual Property Declaration & Operating License`
            })]
          })]
        }), (0, $.jsxs)(`div`, {
          className: `flex items-center gap-2 shrink-0`,
          children: [(0, $.jsxs)(`a`, {
            href: r,
            download: `Opsector_Software_License___Intellectual_Property_Notice.pdf`,
            className: `px-3 py-1.5 rounded-xl bg-[#EF4444] hover:bg-red-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs`,
            children: [(0, $.jsx)(ie, {
              className: `w-3.5 h-3.5`
            }), (0, $.jsx)(`span`, {
              children: `Download PDF`
            })]
          }), (0, $.jsx)(`a`, {
            href: r,
            target: `_blank`,
            rel: `noopener noreferrer`,
            className: `p-1.5 rounded-xl border text-xs transition-colors cursor-pointer ${n?`border-[#262C3A] bg-[#0D1017] text-slate-300 hover:text-white hover:bg-slate-800`:`border-slate-300 bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100`}`,
            title: `Open in new tab`,
            children: (0, $.jsx)(ae, {
              className: `w-4 h-4`
            })
          }), (0, $.jsx)(`button`, {
            type: `button`,
            onClick: t,
            className: `p-1.5 rounded-xl border text-xs transition-colors cursor-pointer ${n?`border-[#262C3A] bg-[#0D1017] text-slate-300 hover:text-white hover:bg-slate-800`:`border-slate-300 bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100`}`,
            title: `Close modal`,
            children: (0, $.jsx)(He, {
              className: `w-4 h-4`
            })
          })]
        })]
      }), (0, $.jsx)(`div`, {
        className: `flex-1 w-full h-full bg-[#1e232d] overflow-hidden relative`,
        children: (0, $.jsx)(`iframe`, {
          src: `${r}#toolbar=1&navpanes=0`,
          className: `w-full h-full border-0 bg-white`,
          title: `Opsector Software License PDF`
        })
      })]
    })]
  })
}, tl = ({
  adminUser: e,
  onSignOut: t
}) => {
  let [n, r] = (0, T.useState)(() => {
    try {
      return localStorage.getItem(`opsector_admin_theme`) === `dark` ? `dark` : `light`
    } catch {
      return `light`
    }
  }), i = () => {
    let e = n === `light` ? `dark` : `light`;
    r(e);
    try {
      localStorage.setItem(`opsector_admin_theme`, e)
    } catch {}
  }, a = n === `dark`, [o, s] = (0, T.useState)([]), [c, l] = (0, T.useState)([]), [u, d] = (0, T.useState)(!0), [f, p] = (0, T.useState)(new Date), [m, h] = (0, T.useState)(``), [g, _] = (0, T.useState)(`All`), [v, y] = (0, T.useState)(`today`), [b, x] = (0, T.useState)(`flat`), [S, C] = (0, T.useState)(new Set), [w, E] = (0, T.useState)(null), [D, O] = (0, T.useState)(null), [k, A] = (0, T.useState)(null), [j, M] = (0, T.useState)(!1), [P, F] = (0, T.useState)(!1), [I, R] = (0, T.useState)(null), [B, V] = (0, T.useState)(!1), [W, ne] = (0, T.useState)(!1), [re, ie] = (0, T.useState)(null), [ae, se] = (0, T.useState)({});
  (0, T.useEffect)(() => {
    let e = setInterval(() => p(new Date), 1e3);
    return () => clearInterval(e)
  }, []);
  let q = (0, T.useMemo)(() => Ys(v), [v]),
    ce = (0, T.useCallback)(async () => {
      d(!0);
      try {
        let [e, t] = await Promise.all([Os({
          startDate: q?.start,
          endDate: q?.end,
          department: g,
          searchQuery: m
        }), Ds()]);
        s(e), l(t)
      } catch (e) {
        console.error(`Error fetching admin data:`, e)
      } finally {
        d(!1)
      }
    }, [q, g, m]);
  (0, T.useEffect)(() => {
    ce();
    let e = 0,
      t = Bs(() => {
        let t = Date.now();
        t - e > 4e3 && (e = t, ce())
      });
    return () => {
      t()
    }
  }, [ce]);
  let J = (0, T.useMemo)(() => {
      let e = new Map;
      [...o].sort((e, t) => new Date(e.timestamp).getTime() - new Date(t.timestamp).getTime()).forEach(t => {
        e.set(t.telegram_id, t)
      });
      let t = [];
      return e.forEach((e, n) => {
        if (e.action_type === `check_in`) {
          let r = f.getTime() - new Date(e.timestamp).getTime();
          if (r < 36e6) {
            let i = c.find(e => e.telegram_id === n) || e.employee;
            t.push({
              log: e,
              employee: i,
              durationMs: Math.max(0, r)
            })
          }
        }
      }), t
    }, [o, c, f]),
    Y = (0, T.useMemo)(() => {
      let e = {};
      return o.forEach(t => {
        if (!e[t.telegram_id]) {
          let n = c.find(e => e.telegram_id === t.telegram_id) || t.employee;
          e[t.telegram_id] = {
            employee: n,
            logs: []
          }
        }
        e[t.telegram_id].logs.push(t)
      }), Object.values(e)
    }, [o, c]),
    Z = e => {
      let t = Math.floor(e / 1e3),
        n = Math.floor(t / 3600),
        r = Math.floor(t % 3600 / 60),
        i = t % 60,
        a = e => String(e).padStart(2, `0`);
      return `${a(n)}:${a(r)}:${a(i)}`
    },
    [de, fe] = (0, T.useState)(!1),
    me = async () => {
      try {
        fe(!0), await Uc({
          monthDateStr: Ks(),
          department: g,
          managerName: e.username ? e.username.toUpperCase() : `Admin`
        })
      } catch (e) {
        console.error(`Failed to export Monthly Attendance Excel:`, e), alert(`Could not generate monthly attendance spreadsheet. Please try again.`)
      } finally {
        fe(!1)
      }
    }, he = e => {
      let t = new Set(S);
      t.has(e) ? t.delete(e) : t.add(e), C(t)
    }, _e = () => {
      S.size === o.length ? C(new Set) : C(new Set(o.map(e => e.id)))
    }, ve = a ? `bg-[#0D1017] text-white` : `bg-[#f1f5f9] text-slate-900`, be = a ? `bg-[#121620] border-[#262C3A]` : `bg-white border-slate-300 text-slate-900`, xe = a ? `bg-[#121620] border-[#262C3A] shadow-[0_4px_20px_rgba(0,0,0,0.4)]` : `bg-white border-slate-300 shadow-sm text-slate-900`, Ce = a ? `bg-[#0E121A] border-[#262C3A]` : `bg-slate-100 border-slate-300 text-slate-900`, we = a ? `bg-[#0E121A] text-slate-200 border-[#262C3A]` : `bg-slate-200 text-slate-900 border-slate-300 font-bold`, Te = a ? `hover:bg-[#161B26] border-[#262C3A]` : `hover:bg-slate-100 border-slate-200`;
  return (0, $.jsxs)(`div`, {
    className: `min-h-screen w-full flex flex-col font-['Plus_Jakarta_Sans',sans-serif] ${ve} overflow-y-auto`,
    children: [(0, $.jsxs)(`header`, {
      className: `w-full px-8 py-3 flex items-center justify-between border-b shadow-sm sticky top-0 z-40 ${be}`,
      children: [(0, $.jsxs)(`div`, {
        className: `flex items-center gap-3`,
        children: [(0, $.jsx)(`img`, {
          src: a ? `/logo2.png` : `/logo.png`,
          alt: `Sevencore Logo`,
          className: `h-8 md:h-9 object-contain`
        }), (0, $.jsxs)(`div`, {
          children: [(0, $.jsx)(`h1`, {
            className: `text-base font-bold tracking-tight leading-tight ${a?`text-white`:`text-slate-900`}`,
            children: `OPSECTOR Attendance`
          }), (0, $.jsx)(`p`, {
            className: `text-[10px] font-mono leading-none ${a?`text-[#EF4444]`:`text-[#EF4444] font-bold`}`,
            children: `ADMIN TERMINAL`
          })]
        })]
      }), (0, $.jsxs)(`div`, {
        className: `flex items-center gap-4`,
        children: [(0, $.jsxs)(`button`, {
          type: `button`,
          onClick: () => F(!0),
          className: `group px-2.5 py-1.5 rounded-xl border text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 shadow-xs ${a?`bg-[#0E121A] border-[#262C3A] text-slate-300 hover:border-red-500/50 hover:bg-[#161B26]`:`bg-white border-slate-300 text-slate-700 hover:border-red-400 hover:bg-slate-50 font-bold`}`,
          title: `View Software License`,
          children: [(0, $.jsx)(oe, {
            className: `w-3.5 h-3.5 text-[#EF4444] transition-transform group-hover:scale-110`
          }), (0, $.jsx)(`span`, {
            className: `transition-colors group-hover:text-[#EF4444]`,
            children: `License`
          })]
        }), (0, $.jsxs)(`div`, {
          className: `flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono border ${a?`bg-[#0E121A] border-[#262C3A] text-slate-300`:`bg-slate-100 border-slate-300 text-slate-900 font-bold`}`,
          children: [(0, $.jsx)(U, {
            className: `w-3.5 h-3.5 text-[#EF4444]`
          }), (0, $.jsx)(`span`, {
            children: f.toLocaleTimeString(`en-US`, {
              timeZone: `Asia/Tashkent`,
              hour12: !1
            })
          }), (0, $.jsx)(`span`, {
            className: `text-[10px] font-bold text-slate-400`,
            children: `UZT`
          })]
        }), (0, $.jsx)(`button`, {
          onClick: () => window.location.reload(),
          className: `p-2 rounded-xl border transition-colors cursor-pointer ${a?`bg-[#0E121A] border-[#262C3A] text-slate-300 hover:text-white hover:bg-[#161B26]`:`bg-white border-slate-300 text-slate-900 hover:text-black hover:bg-slate-100 font-bold`}`,
          title: `Reload application`,
          children: (0, $.jsx)(ye, {
            className: `w-4 h-4 text-[#EF4444]`
          })
        }), (0, $.jsx)(`button`, {
          onClick: i,
          className: `p-2 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-colors cursor-pointer ${a?`bg-[#0E121A] border-[#262C3A] text-amber-400 hover:bg-[#161B26]`:`bg-white border-slate-300 text-slate-900 hover:bg-slate-100`}`,
          title: a ? `Switch to Bright Mode` : `Switch to Dark Mode`,
          children: a ? (0, $.jsxs)($.Fragment, {
            children: [(0, $.jsx)(je, {
              className: `w-4 h-4 text-amber-400`
            }), (0, $.jsx)(`span`, {
              className: `text-white text-xs font-semibold`,
              children: `Bright`
            })]
          }) : (0, $.jsxs)($.Fragment, {
            children: [(0, $.jsx)(pe, {
              className: `w-4 h-4 text-slate-600`
            }), (0, $.jsx)(`span`, {
              className: `text-slate-700 text-xs font-semibold`,
              children: `Dark`
            })]
          })
        }), (0, $.jsxs)(`div`, {
          className: `flex items-center gap-3 pl-4 border-l ${a?`border-[#262C3A]`:`border-slate-200`}`,
          children: [(0, $.jsx)(`div`, {
            className: `w-9 h-9 rounded-full border flex items-center justify-center ${a?`bg-[#161B26] border-[#262C3A] text-slate-300`:`bg-slate-100 border-slate-300 text-slate-700`}`,
            children: (0, $.jsx)(Be, {
              className: `w-5 h-5`
            })
          }), (0, $.jsx)(`div`, {
            className: `flex flex-col`,
            children: (0, $.jsx)(`span`, {
              className: `text-sm font-bold leading-tight ${a?`text-white`:`text-slate-900`}`,
              children: e.username.toUpperCase()
            })
          }), (0, $.jsx)(`button`, {
            onClick: t,
            className: `p-2 rounded-xl border transition-colors cursor-pointer ml-1 ${a?`border-[#262C3A] bg-[#0E121A] text-slate-400 hover:text-rose-400 hover:bg-rose-950/40`:`border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-slate-100`}`,
            title: `Sign Out`,
            children: (0, $.jsx)(ue, {
              className: `w-4 h-4`
            })
          })]
        })]
      })]
    }), (0, $.jsxs)(`nav`, {
      "aria-label": `Portal Navigation`,
      className: `w-full px-8 py-2.5 border-b flex items-center gap-2 overflow-x-auto text-xs font-semibold sticky top-[57px] z-30 ${be}`,
      children: [(0, $.jsxs)(`button`, {
        onClick: () => R(null),
        className: `px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${I===null?`bg-[#EF4444] text-white font-bold shadow-md shadow-red-500/25`:a?`text-slate-300 hover:text-white hover:bg-[#161B26]`:`text-slate-700 hover:text-slate-900 hover:bg-slate-200 font-bold`}`,
        children: [(0, $.jsx)(le, {
          className: `w-3.5 h-3.5`
        }), (0, $.jsx)(`span`, {
          children: `Live Dispatch Floor`
        })]
      }), (0, $.jsxs)(`button`, {
        onClick: () => R(`users`),
        className: `px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${I===`users`?`bg-[#EF4444] text-white font-bold shadow-md shadow-red-500/25`:a?`text-slate-300 hover:text-white hover:bg-[#161B26]`:`text-slate-700 hover:text-slate-900 hover:bg-slate-200 font-bold`}`,
        children: [(0, $.jsx)(Ve, {
          className: `w-3.5 h-3.5`
        }), (0, $.jsx)(`span`, {
          children: `Team & Users`
        }), (0, $.jsx)(`span`, {
          className: `text-[10px] px-1.5 py-0.2 rounded-full font-bold ${I===`users`?`bg-black/30 text-white`:a?`bg-[#0E121A] text-slate-300 border border-[#262C3A]`:`bg-slate-200 text-slate-900 font-bold border border-slate-300`}`,
          children: c.length
        })]
      }), (0, $.jsxs)(`button`, {
        onClick: () => R(`presence`),
        className: `px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${I===`presence`?`bg-[#EF4444] text-white font-bold shadow-md shadow-red-500/25`:a?`text-slate-300 hover:text-white hover:bg-[#161B26]`:`text-slate-700 hover:text-slate-900 hover:bg-slate-200 font-bold`}`,
        children: [(0, $.jsx)(`span`, {
          className: `w-2 h-2 rounded-full bg-[#EF4444] animate-pulse`
        }), (0, $.jsx)(`span`, {
          children: `Floor Presence & Shift Roster`
        }), (0, $.jsxs)(`span`, {
          className: `text-[10px] px-1.5 py-0.2 rounded-full font-bold ${I===`presence`?`bg-black/30 text-white`:a?`bg-[#0E121A] text-slate-300 border border-[#262C3A]`:`bg-slate-200 text-slate-900 font-bold border border-slate-300`}`,
          children: [J.length, ` Active`]
        })]
      }), (0, $.jsxs)(`button`, {
        onClick: () => V(!0),
        className: `px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${B?`bg-[#EF4444] text-white font-bold shadow-md shadow-red-500/25`:a?`text-slate-300 hover:text-white hover:bg-[#161B26] border border-[#262C3A]`:`text-slate-800 hover:bg-slate-200 border border-slate-300 font-bold`}`,
        children: [(0, $.jsx)(K, {
          className: `w-3.5 h-3.5 text-[#EF4444]`
        }), (0, $.jsx)(`span`, {
          children: `Weekly Attendance Matrix (Full Screen)`
        })]
      }), (0, $.jsxs)(`button`, {
        onClick: () => ne(!0),
        className: `px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${W?`bg-[#EF4444] text-white font-bold shadow-md shadow-red-500/25`:a?`text-slate-300 hover:text-white hover:bg-[#161B26] border border-[#262C3A]`:`text-slate-800 hover:bg-slate-200 border border-slate-300 font-bold`}`,
        children: [(0, $.jsx)(ze, {
          className: `w-3.5 h-3.5 text-cyan-400`
        }), (0, $.jsx)(`span`, {
          children: `User Assignments & Departments`
        })]
      })]
    }), (0, $.jsxs)(`main`, {
      className: `flex-1 w-full px-8 py-6 max-w-[1920px] mx-auto space-y-6`,
      children: [(0, $.jsxs)(`section`, {
        className: `grid grid-cols-1 xl:grid-cols-12 gap-6`,
        children: [(0, $.jsx)(`div`, {
          className: `xl:col-span-8 rounded-2xl border p-6 shadow-xs flex flex-col justify-between ${xe}`,
          children: (0, $.jsxs)(`div`, {
            children: [(0, $.jsxs)(`div`, {
              className: `flex items-center justify-between mb-4`,
              children: [(0, $.jsxs)(`div`, {
                className: `flex items-center gap-2`,
                children: [(0, $.jsx)(`span`, {
                  className: `w-2.5 h-2.5 rounded-full bg-emerald-500`
                }), (0, $.jsxs)(`h2`, {
                  className: `text-xs font-bold uppercase tracking-wider ${a?`text-white`:`text-slate-900`}`,
                  children: [`WHO'S ON DUTY RIGHT NOW (`, J.length, ` ACTIVE)`]
                })]
              }), (0, $.jsx)(`span`, {
                className: `text-xs ${a?`text-slate-400`:`text-slate-500`}`,
                children: `Live running shift durations updated continuously`
              })]
            }), J.length === 0 ? (0, $.jsxs)(`div`, {
              className: `p-8 text-center rounded-xl border ${Ce}`,
              children: [(0, $.jsx)(Ve, {
                className: `w-8 h-8 text-slate-400 mx-auto mb-2 opacity-60`
              }), (0, $.jsx)(`p`, {
                className: `text-xs font-semibold ${a?`text-slate-300`:`text-slate-600`}`,
                children: `No personnel currently clocked in.`
              }), (0, $.jsx)(`p`, {
                className: `text-[11px] text-slate-400 mt-0.5`,
                children: `Employees will appear here automatically when they check in.`
              })]
            }) : (0, $.jsx)(`div`, {
              className: `max-h-[380px] overflow-y-auto pr-1.5`,
              children: (0, $.jsx)(`div`, {
                className: `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5`,
                children: J.map(({
                  log: e,
                  employee: t,
                  durationMs: n
                }) => {
                  let r = `${t?.first_name||`Staff`} ${t?.last_name||``}`.trim(),
                    i = new Date(e.timestamp).toLocaleTimeString(`en-US`, {
                      timeZone: `Asia/Tashkent`,
                      hour: `2-digit`,
                      minute: `2-digit`,
                      hour12: !1
                    }),
                    o = t?.shift_start_time || `16:00`,
                    {
                      isLate: s
                    } = Vc(i, o);
                  return (0, $.jsxs)(`div`, {
                    onClick: () => t && ie(t),
                    className: `rounded-xl border p-3.5 flex items-center gap-3.5 shadow-xs cursor-pointer transition-all hover:border-red-400 group ${a?`bg-[#0E121A] border-[#262C3A]`:`bg-white border-slate-200/90`}`,
                    title: `Click to open Employee 360 Dossier (${s?`Late check-in`:`On-time check-in`})`,
                    children: [(0, $.jsx)(`div`, {
                      className: `w-12 h-12 rounded-full overflow-hidden shrink-0 border flex items-center justify-center ${a?`bg-[#161B26] border-[#262C3A]`:`bg-slate-100 border-slate-200`}`,
                      children: t?.photo_url ? (0, $.jsx)(`img`, {
                        src: t.photo_url,
                        alt: r,
                        className: `w-full h-full object-cover group-hover:scale-105 transition-transform`
                      }) : (0, $.jsx)(Be, {
                        className: `w-6 h-6 text-slate-400`
                      })
                    }), (0, $.jsxs)(`div`, {
                      className: `min-w-0 flex-1`,
                      children: [(0, $.jsxs)(`div`, {
                        className: `flex items-center justify-between`,
                        children: [(0, $.jsx)(`span`, {
                          className: `text-sm font-bold truncate block group-hover:text-red-400 transition-colors ${a?`text-white`:`text-slate-900`}`,
                          children: r
                        }), (0, $.jsx)(`span`, {
                          className: `text-[10px] text-[#EF4444] font-bold opacity-0 group-hover:opacity-100 transition-opacity`,
                          children: `360 →`
                        })]
                      }), (0, $.jsx)(`div`, {
                        className: `mt-0.5`,
                        children: (0, $.jsx)(`span`, {
                          className: `inline-block text-[11px] font-semibold px-2 py-0.5 rounded-md border ${a?`bg-red-950/40 text-red-300 border-red-900/50`:`bg-slate-100 text-slate-900 border-slate-300 font-bold`}`,
                          children: t?.department || `Staff`
                        })
                      }), (0, $.jsxs)(`div`, {
                        className: `flex items-center justify-between mt-2 pt-1.5 border-t border-slate-700/20 text-xs font-mono font-bold`,
                        children: [(0, $.jsx)(`span`, {
                          className: `text-emerald-500 font-bold`,
                          children: Z(n)
                        }), (0, $.jsxs)(`span`, {
                          className: `inline-flex items-center gap-1 text-[11px] font-sans font-bold px-1.5 py-0.5 rounded border ${s?a?`bg-amber-950/60 text-yellow-300 border-yellow-500/50`:`bg-yellow-100 text-yellow-900 border-yellow-400 font-extrabold`:a?`bg-emerald-950/60 text-emerald-300 border-emerald-500/50`:`bg-emerald-100 text-emerald-900 border-emerald-400 font-extrabold`}`,
                          title: s ? `Late check-in (Scheduled: ${o})` : `On-time check-in (Scheduled: ${o})`,
                          children: [(0, $.jsx)(`span`, {
                            className: `w-1.5 h-1.5 rounded-full shrink-0 ${s?`bg-yellow-400`:`bg-emerald-500`}`
                          }), (0, $.jsxs)(`span`, {
                            children: [`In at `, i]
                          }), (0, $.jsx)(`span`, {
                            className: `text-[10px] uppercase tracking-wider`,
                            children: s ? `• Late` : `• On-Time`
                          })]
                        })]
                      })]
                    })]
                  }, e.id)
                })
              })
            })]
          })
        }), (0, $.jsxs)(`div`, {
          className: `xl:col-span-4 rounded-2xl border p-6 shadow-xs flex flex-col justify-between ${xe}`,
          children: [(0, $.jsxs)(`div`, {
            children: [(0, $.jsx)(`h2`, {
              className: `text-xs font-bold uppercase tracking-wider mb-4 ${a?`text-slate-400`:`text-slate-900 font-extrabold`}`,
              children: `FLOOR DISPATCH STATS`
            }), (0, $.jsxs)(`div`, {
              className: `grid grid-cols-2 gap-3.5 mb-5`,
              children: [(0, $.jsxs)(`div`, {
                className: `p-4 rounded-xl border ${Ce}`,
                children: [(0, $.jsx)(`span`, {
                  className: `text-xs font-semibold block mb-1 ${a?`text-slate-400`:`text-slate-800`}`,
                  children: `Active In:`
                }), (0, $.jsx)(`span`, {
                  className: `text-3xl font-bold text-emerald-600 dark:text-emerald-400`,
                  children: J.length
                })]
              }), (0, $.jsxs)(`div`, {
                className: `p-4 rounded-xl border ${Ce}`,
                children: [(0, $.jsx)(`span`, {
                  className: `text-xs font-semibold block mb-1 ${a?`text-slate-400`:`text-slate-800`}`,
                  children: `Total Staff`
                }), (0, $.jsx)(`span`, {
                  className: `text-3xl font-bold ${a?`text-white`:`text-slate-900`}`,
                  children: c.length
                })]
              }), (0, $.jsxs)(`div`, {
                className: `p-4 rounded-xl border ${Ce}`,
                children: [(0, $.jsx)(`span`, {
                  className: `text-xs font-semibold block mb-1 ${a?`text-slate-400`:`text-slate-800`}`,
                  children: `Logs Loaded`
                }), (0, $.jsx)(`span`, {
                  className: `text-3xl font-bold ${a?`text-white`:`text-slate-900`}`,
                  children: o.length
                })]
              }), (0, $.jsxs)(`div`, {
                className: `p-4 rounded-xl border ${Ce}`,
                children: [(0, $.jsx)(`span`, {
                  className: `text-xs font-semibold block mb-1 ${a?`text-slate-400`:`text-slate-800`}`,
                  children: `Selected`
                }), (0, $.jsx)(`span`, {
                  className: `text-3xl font-bold text-[#EF4444]`,
                  children: S.size
                })]
              })]
            })]
          }), (0, $.jsxs)(`button`, {
            onClick: () => M(!0),
            className: `w-full py-3 px-4 rounded-xl bg-[#E51E2B] hover:bg-red-700 text-white font-bold text-xs shadow-md shadow-red-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer`,
            children: [(0, $.jsx)(te, {
              className: `w-4 h-4`
            }), `Add Manual Check In`]
          })]
        })]
      }), (0, $.jsxs)(`section`, {
        className: `rounded-2xl border shadow-xs overflow-hidden ${xe}`,
        children: [(0, $.jsxs)(`div`, {
          className: `px-6 py-4 border-b flex items-center justify-between ${a?`border-slate-800`:`border-slate-200/90`}`,
          children: [(0, $.jsxs)(`div`, {
            className: `flex items-center gap-2`,
            children: [(0, $.jsx)(`h2`, {
              className: `text-sm font-bold uppercase tracking-wider ${a?`text-white`:`text-slate-900`}`,
              children: `ATTENDANCE MASTER RECORD`
            }), (0, $.jsxs)(`span`, {
              className: `text-xs font-mono ${a?`text-slate-400`:`text-slate-500`}`,
              children: [`(`, o.length, ` rows)`]
            })]
          }), (0, $.jsx)(`div`, {
            className: `flex items-center gap-3`,
            children: (0, $.jsxs)(`button`, {
              onClick: _e,
              className: `text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${a?`text-slate-300 hover:text-white`:`text-slate-900 hover:text-black font-bold`}`,
              children: [S.size === o.length && o.length > 0 ? (0, $.jsx)(ke, {
                className: `w-4 h-4 text-[#EF4444]`
              }) : (0, $.jsx)(Ae, {
                className: `w-4 h-4 ${a?`text-slate-400`:`text-slate-700`}`
              }), `Select All`]
            })
          })]
        }), (0, $.jsxs)(`div`, {
          className: `px-6 py-3 border-b flex flex-col lg:flex-row items-center justify-between gap-3 ${a?`bg-[#0E121A] border-[#262C3A]`:`bg-slate-50 border-slate-200`}`,
          children: [(0, $.jsxs)(`div`, {
            className: `w-full lg:w-80 relative`,
            children: [(0, $.jsx)(Se, {
              className: `w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${a?`text-slate-400`:`text-slate-700`}`
            }), (0, $.jsx)(`input`, {
              type: `text`,
              value: m,
              onChange: e => h(e.target.value),
              placeholder: `Search employee, ID, note...`,
              className: `w-full pl-9 pr-4 py-1.5 rounded-xl text-xs font-semibold border focus:outline-none focus:border-[#EF4444] ${a?`bg-[#0D1017] border-[#262C3A] text-white placeholder:text-slate-500`:`bg-white border-slate-300 text-slate-950 placeholder:text-slate-500`}`
            })]
          }), (0, $.jsx)(`div`, {
            className: `flex items-center gap-1 p-1 rounded-xl border text-xs ${a?`bg-[#0D1017] border-[#262C3A]`:`bg-slate-200 border-slate-300`}`,
            children: [`today`, `yesterday`, `week`, `month`, `all`].map(e => (0, $.jsx)(`button`, {
              onClick: () => y(e),
              className: `px-3 py-1 rounded-lg font-bold uppercase tracking-wider text-[10px] transition-all cursor-pointer ${v===e?`bg-[#EF4444] text-white shadow-md shadow-red-500/25`:a?`text-slate-400 hover:text-white`:`text-slate-800 hover:text-black font-bold`}`,
              children: e
            }, e))
          }), (0, $.jsxs)(`div`, {
            className: `flex items-center gap-2`,
            children: [(0, $.jsxs)(`button`, {
              type: `button`,
              onClick: me,
              disabled: de,
              className: `px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer ${a?`border-emerald-500/30 bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300`:`border-slate-300 bg-white hover:bg-slate-100 text-black font-black shadow-xs`}`,
              title: `Download monthly attendance spreadsheet (.xlsx) for ${g===`All`?`all departments`:g}`,
              children: [de ? (0, $.jsx)(X, {
                className: `w-3.5 h-3.5 animate-spin ${a?`text-emerald-400`:`text-black`}`
              }) : (0, $.jsx)(K, {
                className: `w-3.5 h-3.5 ${a?`text-emerald-400`:`text-emerald-600`}`
              }), (0, $.jsx)(`span`, {
                children: de ? `Exporting...` : `Download Monthly (.xlsx)`
              })]
            }), (0, $.jsxs)(`div`, {
              className: `flex items-center p-0.5 rounded-xl border text-xs ml-1 ${a?`bg-[#0D1017] border-[#262C3A]`:`bg-slate-200 border-slate-300`}`,
              children: [(0, $.jsx)(`button`, {
                onClick: () => x(`flat`),
                className: `px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer ${b===`flat`?`bg-[#EF4444] text-white shadow-md shadow-red-500/25`:a?`text-slate-400 hover:text-white`:`text-slate-800 hover:text-black font-bold`}`,
                children: `Flat`
              }), (0, $.jsx)(`button`, {
                onClick: () => x(`grouped`),
                className: `px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer ${b===`grouped`?`bg-[#EF4444] text-white shadow-md shadow-red-500/25`:a?`text-slate-400 hover:text-white`:`text-slate-800 hover:text-black font-bold`}`,
                children: `Grouped`
              })]
            })]
          })]
        }), (0, $.jsxs)(`div`, {
          className: `px-6 py-2 border-b flex items-center gap-1.5 overflow-x-auto text-xs ${a?`bg-[#0E121A] border-[#262C3A]`:`bg-white border-slate-200`}`,
          children: [(0, $.jsxs)(`span`, {
            className: `text-[11px] font-bold flex items-center gap-1 shrink-0 mr-1 ${a?`text-slate-400`:`text-slate-800 font-extrabold`}`,
            children: [(0, $.jsx)(N, {
              className: `w-3.5 h-3.5 text-[#EF4444]`
            }), `Dept:`]
          }), (0, $.jsx)(`button`, {
            onClick: () => _(`All`),
            className: `px-2.5 py-0.5 rounded-lg text-xs font-bold shrink-0 transition-colors cursor-pointer ${g===`All`?`bg-[#EF4444] text-white shadow-md shadow-red-500/25`:a?`bg-[#0D1017] text-slate-300 hover:text-white border border-[#262C3A]`:`bg-slate-200 text-slate-900 font-bold hover:bg-slate-300 border border-slate-300`}`,
            children: `All`
          }), kc.filter(e => !e.toLowerCase().includes(`fleet`)).map(e => (0, $.jsx)(`button`, {
            onClick: () => _(e),
            className: `px-2.5 py-0.5 rounded-lg text-xs font-bold shrink-0 transition-colors cursor-pointer ${g===e?`bg-[#EF4444] text-white shadow-md shadow-red-500/25`:a?`bg-[#0D1017] text-slate-300 hover:text-white border border-[#262C3A]`:`bg-slate-200 text-slate-900 font-bold hover:bg-slate-300 border border-slate-300`}`,
            children: e
          }, e))]
        }), b === `flat` && (0, $.jsx)(`div`, {
          className: `overflow-x-auto`,
          children: (0, $.jsxs)(`table`, {
            className: `w-full text-left text-xs`,
            children: [(0, $.jsx)(`thead`, {
              className: `uppercase tracking-wider text-[11px] font-bold border-b ${we}`,
              children: (0, $.jsxs)(`tr`, {
                children: [(0, $.jsx)(`th`, {
                  className: `py-3.5 px-4 w-10`
                }), (0, $.jsx)(`th`, {
                  className: `py-3.5 px-4`,
                  children: `EMPLOYEE`
                }), (0, $.jsx)(`th`, {
                  className: `py-3.5 px-4`,
                  children: `DEPARTMENT`
                }), (0, $.jsx)(`th`, {
                  className: `py-3.5 px-4`,
                  children: `ACTION`
                }), (0, $.jsx)(`th`, {
                  className: `py-3.5 px-4`,
                  children: `DATE & TIME`
                }), (0, $.jsx)(`th`, {
                  className: `py-3.5 px-4`,
                  children: `VERIFICATION`
                }), (0, $.jsx)(`th`, {
                  className: `py-3.5 px-4`,
                  children: `AUDIT NOTE`
                }), (0, $.jsx)(`th`, {
                  className: `py-3.5 px-4 text-center`,
                  children: `STATUS`
                }), (0, $.jsx)(`th`, {
                  className: `py-3.5 px-4 text-right`
                })]
              })
            }), (0, $.jsx)(`tbody`, {
              className: `divide-y ${a?`divide-slate-800`:`divide-slate-100`}`,
              children: o.length === 0 ? (0, $.jsx)(`tr`, {
                children: (0, $.jsx)(`td`, {
                  colSpan: 9,
                  className: `py-12 text-center ${a?`text-slate-500`:`text-slate-400`}`,
                  children: `No attendance records found for this filter.`
                })
              }) : o.map(e => {
                let t = e.employee,
                  n = `${t?.first_name||`Staff`} ${t?.last_name||``}`.trim(),
                  r = S.has(e.id),
                  i = e.distance_meters,
                  o = i != null && i <= Pc.radiusMeters;
                return (0, $.jsxs)(`tr`, {
                  className: `transition-colors ${Te} ${r?a?`bg-red-950/20`:`bg-red-50/50`:``}`,
                  children: [(0, $.jsx)(`td`, {
                    className: `py-3.5 px-4`,
                    children: (0, $.jsx)(`button`, {
                      onClick: () => he(e.id),
                      className: `text-slate-400 hover:text-[#EF4444] cursor-pointer`,
                      children: r ? (0, $.jsx)(ke, {
                        className: `w-4 h-4 text-[#EF4444]`
                      }) : (0, $.jsx)(Ae, {
                        className: `w-4 h-4 ${a?`text-slate-400`:`text-slate-700`}`
                      })
                    })
                  }), (0, $.jsx)(`td`, {
                    className: `py-3.5 px-4`,
                    children: (0, $.jsxs)(`div`, {
                      className: `flex items-center gap-3`,
                      children: [(0, $.jsx)(`div`, {
                        onClick: () => t && ie(t),
                        className: `w-9 h-9 rounded-full overflow-hidden shrink-0 border flex items-center justify-center cursor-pointer hover:border-red-400 ${a?`bg-slate-800 border-slate-700`:`bg-slate-100 border-slate-300`}`,
                        title: `Open Employee 360 Dossier`,
                        children: t?.photo_url ? (0, $.jsx)(`img`, {
                          src: t.photo_url,
                          alt: n,
                          className: `w-full h-full object-cover`
                        }) : (0, $.jsx)(Be, {
                          className: `w-5 h-5 text-slate-400`
                        })
                      }), (0, $.jsxs)(`div`, {
                        children: [t ? (0, $.jsx)(`button`, {
                          onClick: () => ie(t),
                          className: `font-bold block text-left hover:text-[#EF4444] hover:underline cursor-pointer ${a?`text-white`:`text-slate-900`}`,
                          title: `Open Employee 360 Dossier`,
                          children: n
                        }) : (0, $.jsx)(`span`, {
                          className: `font-bold block ${a?`text-white`:`text-slate-900`}`,
                          children: n
                        }), (0, $.jsxs)(`span`, {
                          className: `text-[11px] font-mono ${a?`text-slate-400`:`text-slate-800 font-bold`}`,
                          children: [`ID: `, e.telegram_id]
                        })]
                      }), t && (0, $.jsx)(`button`, {
                        onClick: () => O(t),
                        className: `text-slate-400 hover:text-[#EF4444] p-1 cursor-pointer`,
                        title: `Edit Employee Profile`,
                        children: (0, $.jsx)(ge, {
                          className: `w-3 h-3`
                        })
                      })]
                    })
                  }), (0, $.jsx)(`td`, {
                    className: `py-3.5 px-4 font-bold ${a?`text-slate-300`:`text-slate-900`}`,
                    children: t?.department || `Unassigned`
                  }), (0, $.jsxs)(`td`, {
                    className: `py-3.5 px-4 font-mono`,
                    children: [(0, $.jsx)(`div`, {
                      className: `font-bold ${a?`text-white`:`text-slate-900`}`,
                      children: new Date(e.timestamp).toLocaleTimeString(`en-US`, {
                        timeZone: `Asia/Tashkent`,
                        hour: `2-digit`,
                        minute: `2-digit`,
                        second: `2-digit`,
                        hour12: !1
                      })
                    }), (0, $.jsx)(`div`, {
                      className: `text-[11px] ${a?`text-slate-400`:`text-slate-700 font-medium`}`,
                      children: new Date(e.timestamp).toLocaleDateString(`en-US`, {
                        timeZone: `Asia/Tashkent`,
                        month: `short`,
                        day: `numeric`,
                        year: `numeric`
                      })
                    })]
                  }), (0, $.jsx)(`td`, {
                    className: `py-3.5 px-4 font-mono font-medium ${a?`text-slate-400`:`text-slate-800`}`,
                    children: new Date(e.timestamp).toLocaleTimeString(`en-US`, {
                      timeZone: `Asia/Tashkent`,
                      hour: `2-digit`,
                      minute: `2-digit`,
                      second: `2-digit`,
                      hour12: !1
                    })
                  }), (0, $.jsx)(`td`, {
                    className: `py-3.5 px-4`,
                    children: (0, $.jsxs)(`div`, {
                      className: `flex items-center gap-2`,
                      children: [e.photo_url ? (0, $.jsxs)(`button`, {
                        onClick: () => A(e),
                        className: `w-7 h-7 rounded-md overflow-hidden border relative group cursor-pointer ${a?`border-slate-700`:`border-slate-300`}`,
                        title: `Inspect selfie`,
                        children: [(0, $.jsx)(`img`, {
                          src: e.photo_url,
                          alt: `Selfie`,
                          className: `w-full h-full object-cover`
                        }), (0, $.jsx)(`div`, {
                          className: `absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity`,
                          children: (0, $.jsx)(G, {
                            className: `w-3 h-3 text-white`
                          })
                        })]
                      }) : null, i == null ? (0, $.jsx)(`span`, {
                        className: `text-[11px] font-medium ${a?`text-slate-400`:`text-slate-700`}`,
                        children: `Manual`
                      }) : (0, $.jsxs)(`span`, {
                        className: `text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${o?`bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800`:`bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800`}`,
                        children: [o ? (0, $.jsx)(H, {
                          className: `w-3 h-3`
                        }) : (0, $.jsx)(Le, {
                          className: `w-3 h-3`
                        }), i, `m`]
                      })]
                    })
                  }), (0, $.jsx)(`td`, {
                    className: `py-3.5 px-4 max-w-xs truncate text-[11px] font-medium ${a?`text-slate-400`:`text-slate-800`}`,
                    children: e.admin_note ? (0, $.jsxs)(`span`, {
                      className: `text-[#EF4444] font-bold`,
                      children: [`[Admin] `, e.admin_note]
                    }) : e.note ? (0, $.jsx)(`span`, {
                      children: e.note
                    }) : (0, $.jsx)(`span`, {
                      className: `text-slate-400`,
                      children: `-`
                    })
                  }), (0, $.jsx)(`td`, {
                    className: `py-3.5 px-4 text-center`,
                    children: e.action_type === `check_in` ? (0, $.jsx)(`span`, {
                      className: `inline-block px-3.5 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider bg-[#00875a]`,
                      children: `CHECK IN`
                    }) : (0, $.jsx)(`span`, {
                      className: `inline-block px-3.5 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider bg-slate-700`,
                      children: `CHECK OUT`
                    })
                  }), (0, $.jsx)(`td`, {
                    className: `py-3.5 px-4 text-right`,
                    children: (0, $.jsx)(`button`, {
                      onClick: () => E(e),
                      className: `p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded cursor-pointer`,
                      title: `Edit record`,
                      children: (0, $.jsx)(ge, {
                        className: `w-3.5 h-3.5`
                      })
                    })
                  })]
                }, e.id)
              })
            })]
          })
        }), b === `grouped` && (0, $.jsx)(`div`, {
          className: `p-6 space-y-3`,
          children: Y.length === 0 ? (0, $.jsx)(`div`, {
            className: `text-center py-12 text-slate-400`,
            children: `No employee records match current filters.`
          }) : Y.map(({
            employee: e,
            logs: t
          }) => {
            let n = e?.telegram_id || 0,
              r = `${e?.first_name||`Staff`} ${e?.last_name||``}`.trim(),
              i = ae[n] !== !1;
            return (0, $.jsxs)(`div`, {
              className: `rounded-xl border overflow-hidden ${a?`bg-[#0f172a] border-slate-800`:`bg-slate-50 border-slate-200/90`}`,
              children: [(0, $.jsxs)(`div`, {
                className: `px-5 py-3 border-b flex items-center justify-between ${a?`bg-slate-900/60 border-slate-800`:`bg-white border-slate-200/90`}`,
                children: [(0, $.jsxs)(`button`, {
                  onClick: () => se(e => ({
                    ...e,
                    [n]: !i
                  })),
                  className: `flex items-center gap-3 text-left focus:outline-none cursor-pointer`,
                  children: [i ? (0, $.jsx)(ee, {
                    className: `w-4 h-4 text-slate-400`
                  }) : (0, $.jsx)(z, {
                    className: `w-4 h-4 text-slate-400`
                  }), (0, $.jsx)(`div`, {
                    className: `w-8 h-8 rounded-full overflow-hidden shrink-0 border flex items-center justify-center ${a?`bg-slate-800 border-slate-700`:`bg-slate-100 border-slate-200`}`,
                    children: e?.photo_url ? (0, $.jsx)(`img`, {
                      src: e.photo_url,
                      alt: r,
                      className: `w-full h-full object-cover`
                    }) : (0, $.jsx)(Be, {
                      className: `w-4 h-4 text-slate-400`
                    })
                  }), (0, $.jsxs)(`div`, {
                    children: [(0, $.jsx)(`span`, {
                      className: `font-bold text-sm ${a?`text-white`:`text-slate-900`}`,
                      children: r
                    }), (0, $.jsxs)(`span`, {
                      className: `text-[11px] font-mono ml-2 ${a?`text-slate-400`:`text-slate-800 font-bold`}`,
                      children: [`ID: `, n]
                    })]
                  }), (0, $.jsx)(`span`, {
                    className: `px-2 py-0.5 rounded text-[10px] font-bold border ${a?`bg-slate-800 text-slate-300 border-slate-700`:`bg-slate-200 text-slate-900 border-slate-300`}`,
                    children: e?.department || `Unassigned`
                  })]
                }), (0, $.jsx)(`div`, {
                  className: `flex items-center gap-2`,
                  children: (0, $.jsxs)(`span`, {
                    className: `text-xs font-mono font-bold ${a?`text-slate-400`:`text-slate-700`}`,
                    children: [t.length, ` check ins`]
                  })
                })]
              }), i && (0, $.jsx)(`div`, {
                className: `divide-y ${a?`divide-slate-800/60`:`divide-slate-200`}`,
                children: t.map(e => (0, $.jsxs)(`div`, {
                  className: `px-6 py-2.5 flex items-center justify-between text-xs ${a?`hover:bg-slate-900/40`:`hover:bg-white`}`,
                  children: [(0, $.jsxs)(`div`, {
                    className: `flex items-center gap-4`,
                    children: [e.action_type === `check_in` ? (0, $.jsx)(`span`, {
                      className: `px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white uppercase bg-[#00875a]`,
                      children: `CHECK IN`
                    }) : (0, $.jsx)(`span`, {
                      className: `px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white uppercase bg-slate-700`,
                      children: `CHECK OUT`
                    }), (0, $.jsx)(`span`, {
                      className: `font-mono font-bold ${a?`text-white`:`text-slate-900`}`,
                      children: new Date(e.timestamp).toLocaleTimeString(`en-US`, {
                        timeZone: `Asia/Tashkent`,
                        hour: `2-digit`,
                        minute: `2-digit`,
                        second: `2-digit`,
                        hour12: !1
                      })
                    }), (0, $.jsx)(`span`, {
                      className: `text-[11px] font-medium ${a?`text-slate-400`:`text-slate-700`}`,
                      children: new Date(e.timestamp).toLocaleDateString(`en-US`, {
                        timeZone: `Asia/Tashkent`,
                        month: `short`,
                        day: `numeric`
                      })
                    }), e.durationFormatted && e.durationFormatted !== `-` && (0, $.jsxs)(`span`, {
                      className: `text-emerald-600 dark:text-emerald-400 font-mono text-[11px] font-bold`,
                      children: [`Duration: `, e.durationFormatted]
                    })]
                  }), (0, $.jsxs)(`div`, {
                    className: `flex items-center gap-3`,
                    children: [e.photo_url && (0, $.jsxs)(`button`, {
                      onClick: () => A(e),
                      className: `text-slate-400 hover:text-[#EF4444] flex items-center gap-1 text-[11px] cursor-pointer`,
                      children: [(0, $.jsx)(G, {
                        className: `w-3.5 h-3.5`
                      }), `Selfie`]
                    }), (0, $.jsx)(`button`, {
                      onClick: () => E(e),
                      className: `p-1 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded cursor-pointer`,
                      children: (0, $.jsx)(ge, {
                        className: `w-3.5 h-3.5`
                      })
                    })]
                  })]
                }, e.id))
              })]
            }, n)
          })
        })]
      })]
    }), w && (0, $.jsx)(Wc, {
      log: w,
      isOpen: !!w,
      onClose: () => E(null),
      onSaved: () => ce()
    }), D && (0, $.jsx)(Gc, {
      employee: D,
      isOpen: !!D,
      onClose: () => O(null),
      onSaved: () => ce()
    }), k && (0, $.jsx)(qc, {
      log: k,
      isOpen: !!k,
      onClose: () => A(null)
    }), (0, $.jsx)(Kc, {
      employees: c,
      isOpen: j,
      onClose: () => M(!1),
      onSaved: () => ce()
    }), (0, $.jsx)(Jc, {
      isOpen: I === `users`,
      onClose: () => R(null),
      employees: c,
      logs: o,
      isDark: a,
      onEditEmployee: e => O(e),
      onOpenDossier: e => ie(e),
      onRefreshData: ce
    }), (0, $.jsx)(Yc, {
      isOpen: I === `presence`,
      onClose: () => R(null),
      logs: o,
      employees: c,
      isDark: a,
      onRefreshData: ce,
      onOpenDossier: e => ie(e)
    }), (0, $.jsx)(Xc, {
      employee: re,
      isOpen: !!re,
      onClose: () => ie(null),
      logs: o,
      isDark: a,
      onEditEmployee: e => {
        O(e), ie(null)
      },
      onEditLog: e => E(e),
      onInspectSelfie: e => A(e),
      onRefreshData: ce
    }), (0, $.jsx)(Qc, {
      isOpen: B,
      onClose: () => V(!1),
      isDark: a,
      logs: o
    }), (0, $.jsx)($c, {
      isOpen: W,
      onClose: () => ne(!1),
      isDark: a,
      onUpdated: ce
    }), (0, $.jsx)(el, {
      isOpen: P,
      onClose: () => F(!1),
      isDark: a
    })]
  })
}, nl = ({
  onBackToApp: e,
  onNavigateToManager: t,
  onNavigateToDev: n
}) => {
  let [r, i] = (0, T.useState)(() => {
    try {
      let e = sessionStorage.getItem(`7core_admin_user`);
      return e ? JSON.parse(e) : null
    } catch {
      return null
    }
  }), [a, o] = (0, T.useState)(!0);
  return (0, T.useEffect)(() => {
    let e = () => {
      let e = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        t = window.innerWidth >= 1024;
      o(t && !e)
    };
    return e(), window.addEventListener(`resize`, e), () => window.removeEventListener(`resize`, e)
  }, []), a ? r ? (0, $.jsx)(tl, {
    adminUser: r,
    onSignOut: () => {
      sessionStorage.removeItem(`7core_admin_user`), i(null)
    }
  }) : (0, $.jsx)(Oc, {
    onLoginSuccess: e => i(e)
  }) : (0, $.jsxs)(`div`, {
    className: `min-h-screen w-full bg-[#0D1017] text-white flex flex-col items-center justify-center p-6 text-center font-['Plus_Jakarta_Sans',sans-serif]`,
    children: [(0, $.jsx)(`img`, {
      src: `/logo2.png`,
      alt: `Sevencore`,
      className: `h-10 object-contain mb-4`
    }), (0, $.jsxs)(`div`, {
      className: `inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/80 border border-red-800 text-red-300 text-xs font-bold mb-3 uppercase tracking-wider`,
      children: [(0, $.jsx)(Te, {
        className: `w-4 h-4 text-[#EF4444]`
      }), `Desktop Screen Required`]
    }), (0, $.jsx)(`h2`, {
      className: `text-xl font-bold text-white max-w-sm`,
      children: `OPSECTOR Attendance Requires a Desktop Screen`
    }), (0, $.jsx)(`p`, {
      className: `text-xs text-[#94A3B8] max-w-md mt-2 mb-6 leading-relaxed`,
      children: `The OPSECTOR Attendance Admin Portal is designed for 16:9 desktop monitors and workstations. Mobile access is disabled to maintain dispatch operations control.`
    }), (0, $.jsxs)(`button`, {
      onClick: e,
      className: `py-3 px-6 bg-[#EF4444] hover:bg-red-500 text-white rounded-xl text-xs font-bold shadow-md shadow-red-500/25 flex items-center gap-2 transition-all cursor-pointer`,
      children: [(0, $.jsx)(k, {
        className: `w-4 h-4`
      }), `Return to Mobile View`]
    })]
  })
}, rl = ({
  onLoginSuccess: e,
  onBackToApp: t
}) => {
  let [n, r] = (0, T.useState)(``), [i, a] = (0, T.useState)(``), [o, s] = (0, T.useState)(null), [c, l] = (0, T.useState)(!1), u = (() => {
    try {
      return localStorage.getItem(`7core_manager_theme`) === `light`
    } catch {
      return !1
    }
  })();
  return (0, $.jsxs)(`div`, {
    className: `min-h-screen bg-[#0D1017] flex flex-col justify-center items-center p-4 font-['Plus_Jakarta_Sans',sans-serif] selection:bg-red-900/40 selection:text-white`,
    children: [(0, $.jsx)(`div`, {
      className: `absolute w-96 h-96 bg-red-600/10 rounded-full blur-3xl -top-12 -left-12 pointer-events-none`
    }), (0, $.jsx)(`div`, {
      className: `absolute w-96 h-96 bg-slate-800/20 rounded-full blur-3xl -bottom-12 -right-12 pointer-events-none`
    }), (0, $.jsxs)(`div`, {
      className: `w-full max-w-md bg-[#121620] border border-red-500/30 rounded-[28px] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.7)] relative z-10`,
      children: [(0, $.jsxs)(`div`, {
        className: `flex flex-col items-center text-center mb-6`,
        children: [(0, $.jsx)(`div`, {
          className: `flex items-center justify-center mb-3`,
          children: (0, $.jsx)(`img`, {
            src: u ? `/logo.png` : `/logo2.png`,
            alt: `SEVENCORE`,
            className: `h-10 w-auto max-w-[220px] object-contain select-none`
          })
        }), (0, $.jsx)(`span`, {
          className: `text-[10px] font-bold tracking-widest text-[#EF4444] uppercase bg-red-950/40 px-3 py-1 rounded-full border border-red-500/30 mb-2`,
          children: `7CORE TEAM OPERATIONS`
        }), (0, $.jsx)(`h1`, {
          className: `text-2xl font-black text-white tracking-tight`,
          children: `Manager Command Portal`
        }), (0, $.jsx)(`p`, {
          className: `text-xs text-[#94A3B8] mt-1`,
          children: `Access your team attendance spreadsheet, schedules & live rosters`
        })]
      }), o && (0, $.jsxs)(`div`, {
        className: `mb-5 p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-start gap-2.5 text-xs text-rose-300`,
        children: [(0, $.jsx)(V, {
          className: `w-4 h-4 shrink-0 text-rose-400 mt-0.5`
        }), (0, $.jsx)(`span`, {
          children: o
        })]
      }), (0, $.jsxs)(`form`, {
        onSubmit: async t => {
          if (t.preventDefault(), !n.trim() || !i.trim()) {
            s(`Please enter both username and password.`);
            return
          }
          l(!0), s(null);
          try {
            let t = await mc(n, i);
            t.success && t.manager ? e(t.manager) : s(t.message || `Invalid manager credentials.`)
          } catch {
            s(`Unable to authenticate. Please check network connection.`)
          } finally {
            l(!1)
          }
        },
        className: `space-y-4`,
        children: [(0, $.jsxs)(`div`, {
          className: `space-y-1.5`,
          children: [(0, $.jsxs)(`label`, {
            className: `text-xs font-semibold text-slate-300 flex items-center gap-1.5`,
            children: [(0, $.jsx)(Be, {
              className: `w-3.5 h-3.5 text-[#EF4444]`
            }), `Manager Username`]
          }), (0, $.jsx)(`input`, {
            type: `text`,
            required: !0,
            autoFocus: !0,
            value: n,
            onChange: e => r(e.target.value),
            placeholder: `e.g. dispatch_mgr`,
            className: `w-full py-2.5 px-3.5 bg-[#0D1017] border border-[#262C3A] rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#EF4444] transition-colors`
          })]
        }), (0, $.jsxs)(`div`, {
          className: `space-y-1.5`,
          children: [(0, $.jsxs)(`label`, {
            className: `text-xs font-semibold text-slate-300 flex items-center gap-1.5`,
            children: [(0, $.jsx)(Z, {
              className: `w-3.5 h-3.5 text-[#EF4444]`
            }), `Manager Password`]
          }), (0, $.jsx)(`input`, {
            type: `password`,
            required: !0,
            value: i,
            onChange: e => a(e.target.value),
            placeholder: `••••••••••••`,
            className: `w-full py-2.5 px-3.5 bg-[#0D1017] border border-[#262C3A] rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#EF4444] transition-colors`
          })]
        }), (0, $.jsx)(`button`, {
          type: `submit`,
          disabled: c,
          className: `w-full mt-2 py-3 px-4 rounded-xl bg-[#EF4444] hover:bg-red-500 text-white font-bold text-xs shadow-lg shadow-red-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50`,
          children: c ? (0, $.jsx)(`span`, {
            children: `AUTHENTICATING...`
          }) : (0, $.jsxs)($.Fragment, {
            children: [(0, $.jsx)(`span`, {
              children: `ACCESS TEAM PORTAL`
            }), (0, $.jsx)(j, {
              className: `w-4 h-4`
            })]
          })
        })]
      }), (0, $.jsx)(`div`, {
        className: `mt-6 pt-5 border-t border-[#262C3A] text-center`,
        children: (0, $.jsx)(`p`, {
          className: `text-[10px] text-[#EF4444] font-bold uppercase`,
          children: `Departments: HOS • 7CORE • CARGOGPT • Fleet`
        })
      })]
    })]
  })
}, il = `00:00.00:30.01:00.01:30.02:00.02:30.03:00.03:30.04:00.04:30.05:00.05:30.06:00.06:30.07:00.07:30.08:00.08:30.09:00.09:30.10:00.10:30.11:00.11:30.12:00.12:30.13:00.13:30.14:00.14:30.15:00.15:30.16:00.16:30.17:00.17:30.18:00.18:30.19:00.19:30.20:00.20:30.21:00.21:30.22:00.22:30.23:00.23:30`.split(`.`), al = [{
  key: `monday`,
  label: `Monday`,
  short: `Mon`
}, {
  key: `tuesday`,
  label: `Tuesday`,
  short: `Tue`
}, {
  key: `wednesday`,
  label: `Wednesday`,
  short: `Wed`
}, {
  key: `thursday`,
  label: `Thursday`,
  short: `Thu`
}, {
  key: `friday`,
  label: `Friday`,
  short: `Fri`
}, {
  key: `saturday`,
  label: `Saturday`,
  short: `Sat`
}, {
  key: `sunday`,
  label: `Sunday`,
  short: `Sun`
}], ol = ({
  isOpen: e,
  onClose: t,
  employee: n,
  onShiftSaved: r,
  currentWeekStartDate: i,
  isDark: a = !0
}) => {
  if (!e || !n) return null;
  let o = `${n.first_name} ${n.last_name||``}`.trim(),
    [s, c] = (0, T.useState)(() => n.shift_start_time === `02:00` && n.shift_end_time === `16:00` ? `second` : n.shift_start_time === `16:00` && n.shift_end_time === `02:00` ? `main` : n.shift_start_time || n.shift_end_time ? `custom` : `main`),
    l = hs(n),
    [u, d] = (0, T.useState)(() => n.shift_start_time || `16:00`),
    [f, p] = (0, T.useState)(() => n.shift_end_time || `02:00`),
    [m, h] = (0, T.useState)(() => n.shift_days && n.shift_days.length > 0 ? n.shift_days : l ? [`monday`, `tuesday`, `wednesday`, `thursday`, `friday`] : []),
    [g, _] = (0, T.useState)(!1),
    [v, y] = (0, T.useState)(!1);
  (0, T.useEffect)(() => {
    if (n) {
      let e = hs(n),
        t = n.shift_start_time || `16:00`,
        r = n.shift_end_time || `02:00`;
      d(t), p(r), c(t === `16:00` && r === `02:00` ? `main` : t === `02:00` && r === `16:00` ? `second` : `custom`), h(n.shift_days && n.shift_days.length > 0 ? n.shift_days : e ? [`monday`, `tuesday`, `wednesday`, `thursday`, `friday`] : []), y(!1)
    }
  }, [n]);
  let b = Ks(),
    x = i || Ws(b),
    S = e => !Zs(x, e),
    C = e => {
      c(e), e === `main` ? (d(`16:00`), p(`02:00`)) : e === `second` && (d(`02:00`), p(`16:00`)), m.length === 0 && h([`monday`, `tuesday`, `wednesday`, `thursday`, `friday`])
    },
    w = e => {
      S(e) || (m.includes(e) ? h(m.filter(t => t !== e)) : h([...m, e]))
    },
    E = e => {
      let t = [];
      e === `mon-fri` ? t = [`monday`, `tuesday`, `wednesday`, `thursday`, `friday`] : e === `mon-sat` ? t = [`monday`, `tuesday`, `wednesday`, `thursday`, `friday`, `saturday`] : e === `everyday` ? t = [...Vs] : e === `none` && (t = []);
      let n = m.filter(e => S(e)),
        r = t.filter(e => !S(e));
      h([...n, ...r])
    },
    D = async () => {
      _(!0), y(!1);
      let e = m.length === 0,
        a = e ? `Shift Unassigned` : s === `main` ? `Main Shift (${u} – ${f})` : s === `second` ? `Second Shift (${u} – ${f})` : `Custom (${u} – ${f})`;
      try {
        await As(n.telegram_id, {
          shift_name: a,
          shift_start_time: e ? `` : u,
          shift_end_time: e ? `` : f,
          shift_days: m
        }, i), y(!0), setTimeout(() => {
          r(), t()
        }, 500)
      } catch (e) {
        console.error(`Failed saving shift:`, e)
      } finally {
        _(!1)
      }
    }, O = a ? `bg-[#121620] border-[#262C3A] text-slate-100` : `bg-white border-slate-200 text-slate-800`, k = a ? `bg-[#0E121A] border-[#262C3A]` : `bg-slate-50 border-slate-200`, A = a ? `bg-[#0D1017] border-[#262C3A] text-white` : `bg-white border-slate-300 text-slate-900`, j = a ? `bg-[#0D1017] border-[#262C3A]` : `bg-slate-50 border-slate-200`;
  return (0, $.jsx)(`div`, {
    className: `fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs`,
    children: (0, $.jsxs)(`div`, {
      className: `border rounded-2xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col font-['Plus_Jakarta_Sans',sans-serif] ${O}`,
      children: [(0, $.jsxs)(`div`, {
        className: `px-5 py-3.5 border-b flex items-center justify-between ${k}`,
        children: [(0, $.jsxs)(`div`, {
          className: `flex items-center gap-2.5`,
          children: [(0, $.jsx)(`div`, {
            className: `w-8 h-8 rounded-full overflow-hidden flex items-center justify-center shrink-0 border ${a?`bg-slate-800 border-slate-700`:`bg-slate-100 border-slate-300`}`,
            children: n.photo_url ? (0, $.jsx)(`img`, {
              src: n.photo_url,
              alt: o,
              className: `w-full h-full object-cover`
            }) : (0, $.jsx)(Be, {
              className: `w-4 h-4 text-slate-400`
            })
          }), (0, $.jsxs)(`div`, {
            children: [(0, $.jsxs)(`div`, {
              className: `flex items-center gap-1.5`,
              children: [(0, $.jsx)(`h3`, {
                className: `text-sm font-bold ${a?`text-white`:`text-slate-900`}`,
                children: o
              }), (0, $.jsx)(`span`, {
                className: `text-[10px] font-bold px-1.5 py-0.2 rounded bg-red-500/10 text-red-500 border border-red-500/20`,
                children: n.department || `7CORE`
              })]
            }), (0, $.jsxs)(`span`, {
              className: `text-[10px] font-mono ${a?`text-slate-400`:`text-slate-500`}`,
              children: [`ID: `, n.telegram_id]
            })]
          })]
        }), (0, $.jsx)(`button`, {
          onClick: t,
          className: `p-1.5 rounded-lg transition-colors cursor-pointer ${a?`text-slate-400 hover:text-white hover:bg-slate-800`:`text-slate-500 hover:text-slate-900 hover:bg-slate-100`}`,
          children: (0, $.jsx)(He, {
            className: `w-4 h-4`
          })
        })]
      }), (0, $.jsxs)(`div`, {
        className: `p-5 space-y-4`,
        children: [v && (0, $.jsxs)(`div`, {
          className: `p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-2 text-xs font-bold text-emerald-500`,
          children: [(0, $.jsx)(H, {
            className: `w-4 h-4 shrink-0`
          }), (0, $.jsx)(`span`, {
            children: `Shift saved.`
          })]
        }), (0, $.jsxs)(`div`, {
          children: [(0, $.jsxs)(`div`, {
            className: `grid grid-cols-3 gap-2`,
            children: [(0, $.jsxs)(`button`, {
              type: `button`,
              onClick: () => C(`main`),
              className: `py-2 px-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${s===`main`?`border-[#EF4444] bg-red-500/10 text-[#EF4444] font-bold`:`${j} text-slate-400 hover:border-slate-500`}`,
              children: [(0, $.jsx)(pe, {
                className: `w-3.5 h-3.5 mb-0.5`
              }), (0, $.jsx)(`span`, {
                className: `text-xs font-bold`,
                children: `16:00 – 02:00`
              }), (0, $.jsx)(`span`, {
                className: `text-[10px] opacity-80`,
                children: `Main Shift`
              })]
            }), (0, $.jsxs)(`button`, {
              type: `button`,
              onClick: () => C(`second`),
              className: `py-2 px-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${s===`second`?`border-[#EF4444] bg-red-500/10 text-[#EF4444] font-bold`:`${j} text-slate-400 hover:border-slate-500`}`,
              children: [(0, $.jsx)(je, {
                className: `w-3.5 h-3.5 mb-0.5`
              }), (0, $.jsx)(`span`, {
                className: `text-xs font-bold`,
                children: `02:00 – 16:00`
              }), (0, $.jsx)(`span`, {
                className: `text-[10px] opacity-80`,
                children: `Second Shift`
              })]
            }), (0, $.jsxs)(`button`, {
              type: `button`,
              onClick: () => C(`custom`),
              className: `py-2 px-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${s===`custom`?`border-[#EF4444] bg-red-500/10 text-[#EF4444] font-bold`:`${j} text-slate-400 hover:border-slate-500`}`,
              children: [(0, $.jsx)(U, {
                className: `w-3.5 h-3.5 mb-0.5`
              }), (0, $.jsx)(`span`, {
                className: `text-xs font-bold`,
                children: `Custom`
              }), (0, $.jsx)(`span`, {
                className: `text-[10px] opacity-80`,
                children: `Shift Hours`
              })]
            })]
          }), (0, $.jsxs)(`div`, {
            className: `mt-3 p-3.5 rounded-xl border ${j} grid grid-cols-2 gap-3`,
            children: [(0, $.jsxs)(`div`, {
              children: [(0, $.jsx)(`label`, {
                className: `block text-[11px] font-bold mb-1 ${a?`text-slate-300`:`text-slate-700`}`,
                children: `Start Time (Military)`
              }), (0, $.jsx)(`select`, {
                value: u,
                onChange: e => d(e.target.value),
                className: `w-full py-1.5 px-2.5 rounded-lg border text-xs font-mono font-bold focus:outline-none focus:border-[#EF4444] cursor-pointer ${A}`,
                children: il.map(e => (0, $.jsx)(`option`, {
                  value: e,
                  children: e
                }, e))
              })]
            }), (0, $.jsxs)(`div`, {
              children: [(0, $.jsx)(`label`, {
                className: `block text-[11px] font-bold mb-1 ${a?`text-slate-300`:`text-slate-700`}`,
                children: `End Time (Military)`
              }), (0, $.jsx)(`select`, {
                value: f,
                onChange: e => p(e.target.value),
                className: `w-full py-1.5 px-2.5 rounded-lg border text-xs font-mono font-bold focus:outline-none focus:border-[#EF4444] cursor-pointer ${A}`,
                children: il.map(e => (0, $.jsx)(`option`, {
                  value: e,
                  children: e
                }, e))
              })]
            })]
          })]
        }), (0, $.jsxs)(`div`, {
          children: [(0, $.jsxs)(`div`, {
            className: `flex items-center justify-between mb-2`,
            children: [(0, $.jsxs)(`label`, {
              className: `text-xs font-bold flex items-center gap-1.5 ${a?`text-slate-300`:`text-slate-700`}`,
              children: [(0, $.jsx)(P, {
                className: `w-3.5 h-3.5 text-[#EF4444]`
              }), (0, $.jsx)(`span`, {
                children: `Working Days`
              })]
            }), (0, $.jsxs)(`div`, {
              className: `flex items-center gap-1 text-[10px] font-semibold`,
              children: [(0, $.jsx)(`button`, {
                type: `button`,
                onClick: () => E(`mon-fri`),
                className: `px-2 py-0.5 rounded border transition-colors cursor-pointer ${j} text-slate-400 hover:text-white`,
                children: `Mon–Fri`
              }), (0, $.jsx)(`button`, {
                type: `button`,
                onClick: () => E(`mon-sat`),
                className: `px-2 py-0.5 rounded border transition-colors cursor-pointer ${j} text-slate-400 hover:text-white`,
                children: `Mon–Sat`
              }), (0, $.jsx)(`button`, {
                type: `button`,
                onClick: () => E(`everyday`),
                className: `px-2 py-0.5 rounded border transition-colors cursor-pointer ${j} text-slate-400 hover:text-white`,
                children: `All Days`
              }), (0, $.jsx)(`button`, {
                type: `button`,
                onClick: () => E(`none`),
                className: `px-2 py-0.5 rounded border transition-colors cursor-pointer ${j} text-slate-400 hover:text-rose-400`,
                children: `Clear (Off)`
              })]
            })]
          }), (0, $.jsxs)(`div`, {
            className: `flex items-center gap-2 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] font-medium mb-2.5`,
            children: [(0, $.jsx)(Z, {
              className: `w-3.5 h-3.5 shrink-0 text-amber-400`
            }), (0, $.jsx)(`span`, {
              children: `Past & present days are locked forever. Changes apply only to upcoming days.`
            })]
          }), (0, $.jsx)(`div`, {
            className: `grid grid-cols-7 gap-1`,
            children: al.map(e => {
              let t = S(e.key),
                n = m.includes(e.key);
              return (0, $.jsxs)(`button`, {
                type: `button`,
                disabled: t,
                onClick: () => w(e.key),
                title: t ? `Locked (past and present days cannot be changed)` : void 0,
                className: `py-1.5 px-1 rounded-lg text-center font-bold text-xs transition-all border ${t?`opacity-60 cursor-not-allowed border-dashed `+(n?`bg-red-950/40 text-red-300 border-red-800`:`${j} text-slate-500 border-slate-700`):n?`bg-[#EF4444] text-white border-red-500 cursor-pointer`:`${j} text-slate-400 hover:text-white cursor-pointer`}`,
                children: [(0, $.jsxs)(`div`, {
                  className: `flex items-center justify-center gap-0.5`,
                  children: [(0, $.jsx)(`span`, {
                    className: `block text-[11px]`,
                    children: e.short
                  }), t && (0, $.jsx)(Z, {
                    className: `w-2.5 h-2.5 text-amber-400 shrink-0`
                  })]
                }), (0, $.jsx)(`span`, {
                  className: `block text-[8px] mt-0.5 ${n?`text-red-100`:`text-slate-500`}`,
                  children: t ? `LOCKED` : n ? `ON` : `OFF`
                })]
              }, e.key)
            })
          })]
        })]
      }), (0, $.jsxs)(`div`, {
        className: `px-5 py-3 border-t flex items-center justify-end gap-2.5 ${k}`,
        children: [(0, $.jsx)(`button`, {
          type: `button`,
          onClick: t,
          className: `px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${a?`border-[#262C3A] bg-[#0D1017] text-slate-300 hover:bg-slate-800`:`border-slate-300 bg-white text-slate-700 hover:bg-slate-100`}`,
          children: `Cancel`
        }), (0, $.jsxs)(`button`, {
          type: `button`,
          disabled: g,
          onClick: D,
          className: `px-4 py-1.5 rounded-xl bg-[#EF4444] hover:bg-red-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50`,
          children: [(0, $.jsx)(xe, {
            className: `w-3.5 h-3.5`
          }), (0, $.jsx)(`span`, {
            children: g ? `Saving...` : `Save Shift`
          })]
        })]
      })]
    })
  })
}, sl = ({
  onBackToApp: e,
  onNavigateToAdmin: t
}) => {
  let [n, r] = (0, T.useState)(() => {
    try {
      let e = localStorage.getItem(`7core_manager_session`);
      return e ? JSON.parse(e) : null
    } catch {
      return null
    }
  }), [i, a] = (0, T.useState)(`spreadsheet`), [o, s] = (0, T.useState)(() => Hs(new Date)), [c, l] = (0, T.useState)(new Date), [u, d] = (0, T.useState)(() => {
    try {
      let e = localStorage.getItem(`7core_manager_theme`);
      return !e || e === `dark`
    } catch {
      return !0
    }
  }), f = () => {
    d(e => {
      let t = !e;
      try {
        localStorage.setItem(`7core_manager_theme`, t ? `dark` : `light`)
      } catch {}
      return t
    })
  }, [p, m] = (0, T.useState)([]), [h, g] = (0, T.useState)([]), [_, v] = (0, T.useState)([]), [y, b] = (0, T.useState)(!0), [x, S] = (0, T.useState)(() => n?.shift_start_time || `16:00`), [C, w] = (0, T.useState)(() => n?.shift_end_time || `02:00`), [E, D] = (0, T.useState)(null), [O, k] = (0, T.useState)(null), [A, j] = (0, T.useState)(!1), [M, N] = (0, T.useState)(`all`), [P, F] = (0, T.useState)({});
  (0, T.useEffect)(() => {
    n && (n.shift_start_time && S(n.shift_start_time), n.shift_end_time && w(n.shift_end_time))
  }, [n]), (0, T.useEffect)(() => {
    let e = setInterval(() => l(new Date), 1e3);
    return () => clearInterval(e)
  }, []), (0, T.useEffect)(() => {
    if (!n) return;
    let e = !0;
    return (async () => {
      let t = await pc(n.id, n.username);
      if (e) {
        if (!t) te();
        else {
          r(t);
          try {
            localStorage.setItem(`7core_manager_session`, JSON.stringify(t))
          } catch {}
        }
      }
    })(), () => {
      e = !1
    }
  }, [n?.id, n?.username]);
  let I = (0, T.useMemo)(() => Xs(c), [c]),
    V = e => {
      r(e), S(e.shift_start_time || `16:00`), w(e.shift_end_time || `02:00`);
      try {
        localStorage.setItem(`7core_manager_session`, JSON.stringify(e))
      } catch {}
    },
    te = () => {
      r(null), m([]), g([]), v([]);
      try {
        localStorage.removeItem(`7core_manager_session`)
      } catch {}
    },
    W = (0, T.useCallback)(async () => {
      if (n) {
        b(!0);
        try {
          if (!await pc(n.id, n.username)) {
            te();
            return
          }
          let e = (await Ds()).filter(e => e.first_name?.toLowerCase().includes(`deactivated`) || e.last_name?.toLowerCase().includes(`deactivated`) ? !1 : !0),
            t = new Set(e.map(e => e.telegram_id));
          m(e);
          let r = (await Os()).filter(e => t.has(e.telegram_id));
          g(r);
          let i = (await nc(o, `All`, null)).filter(e => t.has(e.telegram_id));
          v(i)
        } catch (e) {
          console.error(`Error loading manager data:`, e)
        } finally {
          b(!1)
        }
      }
    }, [n, o]);
  (0, T.useEffect)(() => {
    n && W()
  }, [n, W]), (0, T.useEffect)(() => {
    if (!n) return;
    let e = 0,
      t = Bs(() => {
        let t = Date.now();
        t - e > 4e3 && (e = t, W())
      });
    return () => {
      t()
    }
  }, [n, W]);
  let ne = (0, T.useMemo)(() => {
    let e = new Map;
    [...h].sort((e, t) => new Date(e.timestamp).getTime() - new Date(t.timestamp).getTime()).forEach(t => e.set(t.telegram_id, t));
    let t = [];
    return e.forEach((e, n) => {
      if (e.action_type === `check_in`) {
        let r = c.getTime() - new Date(e.timestamp).getTime();
        if (r < 36e6) {
          let i = p.find(e => e.telegram_id === n) || e.employee;
          t.push({
            log: e,
            employee: i,
            durationMs: Math.max(0, r)
          })
        }
      }
    }), t
  }, [h, p, c]);
  if (!n) return (0, $.jsx)(rl, {
    onLoginSuccess: V,
    onBackToApp: e
  });
  let re = u ? `bg-[#0D1017] text-white` : `bg-slate-100 text-slate-900`,
    ie = u ? `bg-[#121620] border-[#262C3A]` : `bg-white border-slate-200`,
    ae = u ? `bg-[#0E121A]/95 border-[#262C3A]` : `bg-white border-slate-200`,
    q = u ? `bg-[#121620] border-[#262C3A]` : `bg-white border-slate-200 shadow-sm`,
    ce = u ? `bg-[#0D1017] border-[#262C3A]` : `bg-slate-50 border-slate-200`,
    J = u ? `border-[#262C3A]` : `border-slate-200`,
    Y = u ? `text-[#94A3B8]` : `text-slate-500`;
  return (0, $.jsxs)(`div`, {
    className: `min-h-screen flex flex-col font-['Plus_Jakarta_Sans',sans-serif] ${re}`,
    children: [(0, $.jsxs)(`header`, {
      className: `w-full px-4 sm:px-6 py-3 border-b flex items-center justify-between sticky top-0 z-40 shadow-sm ${ie}`,
      children: [(0, $.jsxs)(`div`, {
        className: `flex items-center gap-3 sm:gap-4`,
        children: [(0, $.jsx)(`div`, {
          className: `flex items-center`,
          children: (0, $.jsx)(`img`, {
            src: u ? `/logo2.png` : `/logo.png`,
            alt: `SEVENCORE`,
            className: `h-8 sm:h-9 w-auto max-w-[190px] sm:max-w-[220px] object-contain select-none`
          })
        }), (0, $.jsx)(`div`, {
          className: `h-6 w-[1px] hidden md:block ${u?`bg-[#262C3A]`:`bg-slate-200`}`
        }), (0, $.jsxs)(`div`, {
          children: [(0, $.jsxs)(`div`, {
            className: `flex items-center gap-2`,
            children: [(0, $.jsx)(`h1`, {
              className: `text-sm sm:text-base font-extrabold tracking-tight ${u?`text-white`:`text-slate-900`}`,
              children: n.team_name || `${n.department} Team`
            }), (0, $.jsx)(`span`, {
              className: `text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 border border-red-500/20`,
              children: n.department
            })]
          }), (0, $.jsxs)(`p`, {
            className: `text-[11px] ${Y}`,
            children: [`Manager: `, (0, $.jsx)(`strong`, {
              className: u ? `text-white` : `text-slate-900`,
              children: n.full_name
            }), ` • `, p.length, ` Members`]
          })]
        })]
      }), (0, $.jsxs)(`div`, {
        className: `flex items-center gap-2 sm:gap-2.5`,
        children: [(0, $.jsxs)(`button`, {
          type: `button`,
          onClick: () => j(!0),
          className: `group px-2.5 py-1.5 rounded-xl border text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 shadow-xs ${u?`bg-[#0E121A] border-[#262C3A] text-slate-300 hover:border-red-500/50 hover:bg-[#161B26]`:`bg-white border-slate-300 text-slate-700 hover:border-red-400 hover:bg-slate-50 font-bold`}`,
          title: `View Software License`,
          children: [(0, $.jsx)(oe, {
            className: `w-3.5 h-3.5 text-[#EF4444] transition-transform group-hover:scale-110`
          }), (0, $.jsx)(`span`, {
            className: `transition-colors group-hover:text-[#EF4444]`,
            children: `License`
          })]
        }), (0, $.jsxs)(`div`, {
          className: `hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono shadow-xs ${u?`border-red-500/30 bg-[#0D1017] text-slate-300`:`border-red-500/20 bg-slate-50 text-slate-700`}`,
          children: [(0, $.jsx)(U, {
            className: `w-3.5 h-3.5 text-[#EF4444]`
          }), (0, $.jsx)(`span`, {
            className: `font-bold text-[#EF4444]`,
            children: `UZT:`
          }), (0, $.jsx)(`span`, {
            className: `font-bold ${u?`text-white`:`text-slate-900`}`,
            children: I
          })]
        }), (0, $.jsxs)(`button`, {
          onClick: f,
          className: `px-3 py-1.5 rounded-xl border text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${u?`border-[#262C3A] bg-[#0E121A] hover:bg-[#161B26] text-amber-400`:`border-slate-300 bg-white hover:bg-slate-100 text-slate-700`}`,
          children: [u ? (0, $.jsx)(je, {
            className: `w-3.5 h-3.5 text-amber-400`
          }) : (0, $.jsx)(pe, {
            className: `w-3.5 h-3.5 text-slate-700`
          }), (0, $.jsx)(`span`, {
            className: `hidden sm:inline`,
            children: u ? `Light Mode` : `Dark Mode`
          })]
        }), (0, $.jsx)(`button`, {
          onClick: () => window.location.reload(),
          className: `p-2 rounded-xl border transition-colors cursor-pointer ${u?`border-[#262C3A] bg-[#0E121A] text-slate-300 hover:text-white hover:bg-[#161B26]`:`border-slate-300 bg-white text-slate-700 hover:bg-slate-100`}`,
          title: `Reload application`,
          children: (0, $.jsx)(ye, {
            className: `w-4 h-4 text-[#EF4444]`
          })
        }), (0, $.jsx)(`button`, {
          onClick: te,
          className: `p-2 rounded-xl border transition-colors cursor-pointer ${u?`border-[#262C3A] bg-[#0E121A] text-slate-400 hover:text-rose-400 hover:bg-rose-950/30`:`border-slate-300 bg-white text-slate-600 hover:text-rose-600 hover:bg-rose-50`}`,
          children: (0, $.jsx)(ue, {
            className: `w-4 h-4`
          })
        })]
      })]
    }), (0, $.jsx)(`nav`, {
      className: `w-full px-4 sm:px-6 py-2 border-b flex items-center justify-between text-xs font-semibold ${ae}`,
      children: (0, $.jsxs)(`div`, {
        className: `flex items-center gap-2 overflow-x-auto`,
        children: [(0, $.jsxs)(`button`, {
          onClick: () => a(`spreadsheet`),
          className: `px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${i===`spreadsheet`?`bg-[#EF4444] text-white font-bold shadow-sm`:u?`text-[#94A3B8] hover:text-white hover:bg-[#161B26]`:`text-slate-600 hover:text-slate-900 hover:bg-slate-100`}`,
          children: [(0, $.jsx)(K, {
            className: `w-3.5 h-3.5`
          }), (0, $.jsx)(`span`, {
            children: `Shift Spreadsheet`
          })]
        }), (0, $.jsxs)(`button`, {
          onClick: () => a(`roster`),
          className: `px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${i===`roster`?`bg-[#EF4444] text-white font-bold shadow-sm`:u?`text-[#94A3B8] hover:text-white hover:bg-[#161B26]`:`text-slate-600 hover:text-slate-900 hover:bg-slate-100`}`,
          children: [(0, $.jsx)(Ve, {
            className: `w-3.5 h-3.5`
          }), (0, $.jsx)(`span`, {
            children: `Team Members`
          }), (0, $.jsx)(`span`, {
            className: `text-[10px] px-1.5 py-0.2 rounded-full font-bold ${i===`roster`?`bg-black/30 text-white`:u?`bg-[#161B26] text-slate-300`:`bg-slate-200 text-slate-700`}`,
            children: p.length
          })]
        }), (0, $.jsxs)(`button`, {
          onClick: () => a(`livefeed`),
          className: `px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${i===`livefeed`?`bg-[#EF4444] text-white font-bold shadow-sm`:u?`text-[#94A3B8] hover:text-white hover:bg-[#161B26]`:`text-slate-600 hover:text-slate-900 hover:bg-slate-100`}`,
          children: [(0, $.jsx)(`span`, {
            className: `w-2 h-2 rounded-full bg-[#EF4444] animate-pulse`
          }), (0, $.jsx)(`span`, {
            children: `Live Check-Ins`
          }), (0, $.jsx)(`span`, {
            className: `text-[10px] px-1.5 py-0.2 rounded-full font-bold ${i===`livefeed`?`bg-black/30 text-white`:u?`bg-[#161B26] text-slate-300`:`bg-slate-200 text-slate-700`}`,
            children: ne.length
          })]
        })]
      })
    }), (0, $.jsxs)(`main`, {
      className: `flex-1 w-full ${i===`spreadsheet`?`px-2 sm:px-4 py-3 flex flex-col`:`max-w-[1920px] mx-auto p-4 md:p-6 space-y-4`}`,
      children: [i === `spreadsheet` && (0, $.jsx)(`div`, {
        className: `w-full flex-1 flex flex-col min-h-[calc(100vh-140px)]`,
        children: (0, $.jsx)(Zc, {
          schedules: _,
          weekStartDate: o,
          onWeekChange: e => s(e),
          onScheduleUpdated: () => W(),
          teamLogs: h,
          defaultShiftStart: x,
          defaultShiftEnd: C,
          isDark: u,
          department: n.department,
          managerName: n.full_name,
          onConfigureShift: e => k(e)
        })
      }), i === `roster` && (0, $.jsxs)(`div`, {
        className: `space-y-4`,
        children: [(0, $.jsx)(`div`, {
          className: `flex flex-wrap items-center justify-between gap-3`,
          children: (0, $.jsxs)(`div`, {
            children: [(0, $.jsxs)(`h2`, {
              className: `text-base font-bold tracking-tight ${u?`text-white`:`text-slate-900`}`,
              children: [`Team Members (`, p.length, `)`]
            }), (0, $.jsx)(`p`, {
              className: `text-xs ${Y}`,
              children: `Configure shift assignments for each team member.`
            })]
          })
        }), (0, $.jsx)(`div`, {
          className: `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4`,
          children: p.map(e => {
            let t = `${e.first_name} ${e.last_name||``}`.trim(),
              n = ne.some(t => t.log.telegram_id === e.telegram_id),
              r = hs(e),
              i = ms(e.shift_days),
              a = e.shift_start_time || ``,
              o = e.shift_end_time || ``,
              s = r ? r && a === `16:00` && o === `02:00` ? `Main: 16:00 – 02:00` : r && a === `02:00` && o === `16:00` ? `Second: 02:00 – 16:00` : `${a} – ${o}` : `Unassigned`,
              c = r ? i.length === 5 ? `Mon–Fri` : i.length === 6 ? `Mon–Sat` : i.length === 7 ? `All Days` : `${i.length} days/wk` : `Unassigned`;
            return (0, $.jsxs)(`div`, {
              onClick: () => k(e),
              className: `p-4 rounded-2xl border transition-all flex flex-col justify-between cursor-pointer group select-none ${q} hover:border-red-400 hover:shadow-md`,
              children: [(0, $.jsxs)(`div`, {
                children: [(0, $.jsxs)(`div`, {
                  className: `flex items-center gap-3`,
                  children: [(0, $.jsx)(`div`, {
                    className: `w-11 h-11 rounded-full overflow-hidden border flex items-center justify-center shrink-0 ${u?`bg-[#0D1017] border-[#262C3A]`:`bg-slate-100 border-slate-300`}`,
                    children: e.photo_url ? (0, $.jsx)(`img`, {
                      src: e.photo_url,
                      alt: t,
                      className: `w-full h-full object-cover`
                    }) : (0, $.jsx)(Be, {
                      className: `w-5 h-5 text-slate-400`
                    })
                  }), (0, $.jsxs)(`div`, {
                    className: `min-w-0 flex-1`,
                    children: [(0, $.jsxs)(`div`, {
                      className: `flex items-center justify-between`,
                      children: [(0, $.jsx)(`span`, {
                        className: `font-bold text-sm truncate block transition-colors ${u?`text-white group-hover:text-red-400`:`text-slate-900 group-hover:text-red-600`}`,
                        children: t
                      }), n ? (0, $.jsx)(`span`, {
                        className: `w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-pulse shrink-0 ml-1`
                      }) : (0, $.jsx)(`span`, {
                        className: `w-2 h-2 rounded-full bg-slate-400 shrink-0 ml-1`
                      })]
                    }), (0, $.jsxs)(`span`, {
                      className: `text-[11px] font-mono block mt-0.5 ${Y}`,
                      children: [`ID: `, e.telegram_id]
                    })]
                  })]
                }), (0, $.jsxs)(`div`, {
                  className: `mt-3 p-2.5 rounded-xl border ${ce}`,
                  children: [(0, $.jsxs)(`div`, {
                    className: `flex items-center justify-between text-[11px]`,
                    children: [(0, $.jsxs)(`span`, {
                      className: `flex items-center gap-1 font-medium ${Y}`,
                      children: [(0, $.jsx)(U, {
                        className: `w-3 h-3 text-[#EF4444]`
                      }), `Shift:`]
                    }), (0, $.jsx)(`span`, {
                      className: `font-mono font-bold ${r?u?`text-white`:`text-slate-900`:`text-slate-400`}`,
                      children: s
                    })]
                  }), (0, $.jsxs)(`div`, {
                    className: `flex items-center justify-between text-[11px] mt-1 pt-1 border-t ${u?`border-[#262C3A]/60`:`border-slate-200`}`,
                    children: [(0, $.jsx)(`span`, {
                      className: Y,
                      children: `Days:`
                    }), (0, $.jsx)(`span`, {
                      className: `font-mono font-bold ${r?`text-emerald-500`:`text-slate-400`}`,
                      children: c
                    })]
                  })]
                })]
              }), (0, $.jsxs)(`div`, {
                className: `mt-3 pt-2.5 border-t flex items-center justify-between text-[11px] ${u?`border-[#262C3A]`:`border-slate-200`}`,
                children: [(0, $.jsx)(`span`, {
                  className: `text-[10px] font-bold px-2 py-0.5 rounded border ${u?`bg-[#0D1017] text-slate-300 border-[#262C3A]`:`bg-slate-100 text-slate-700 border-slate-300`}`,
                  children: e.department || `7CORE`
                }), (0, $.jsx)(`span`, {
                  className: `text-[11px] font-bold text-[#EF4444] group-hover:text-red-500 transition-colors`,
                  children: `Configure Shift →`
                })]
              })]
            }, e.telegram_id)
          })
        })]
      }), i === `livefeed` && (() => {
        let e = Ks(),
          [t, n, r] = o.split(`-`).map(Number),
          i = new Date(t, n - 1, r),
          a = new Date(t, n - 1, r + 6),
          l = {
            month: `short`,
            day: `numeric`
          },
          d = `${i.toLocaleDateString(`en-US`,l)} – ${a.toLocaleDateString(`en-US`,{...l,year:`numeric`})}`,
          f = e => {
            let i = new Date(t, n - 1, r);
            i.setDate(i.getDate() + e);
            let a = e => String(e).padStart(2, `0`);
            s(`${i.getFullYear()}-${a(i.getMonth()+1)}-${a(i.getDate())}`)
          },
          m = () => {
            let e = new Date,
              t = e.getDay(),
              n = e.getDate() - t + (t === 0 ? -6 : 1),
              r = new Date(e.setDate(n)),
              i = e => String(e).padStart(2, `0`);
            s(`${r.getFullYear()}-${i(r.getMonth()+1)}-${i(r.getDate())}`)
          },
          g = Vs.map(t => {
            let n = Us(o, t),
              [r, i, a] = n.split(`-`).map(Number),
              s = new Date(r, i - 1, a),
              l = t.charAt(0).toUpperCase() + t.slice(1),
              u = s.toLocaleDateString(`en-US`, {
                month: `short`,
                day: `numeric`,
                year: `numeric`
              }),
              d = n === e,
              f = h.filter(e => zc(e.timestamp) === n && e.action_type === `check_in`);
            f.sort((e, t) => new Date(t.timestamp).getTime() - new Date(e.timestamp).getTime());
            let m = f.map(e => {
                let n = p.find(t => t.telegram_id === e.telegram_id) || e.employee,
                  r = new Date(e.timestamp).getTime(),
                  i = h.find(t => t.telegram_id === e.telegram_id && t.action_type === `check_out` && new Date(t.timestamp).getTime() > r && new Date(t.timestamp).getTime() - r <= 648e5),
                  a = Bc(e.timestamp),
                  o = Xs(e.timestamp),
                  s = i ? Xs(i.timestamp) : null,
                  l = _.find(e => e.telegram_id === n?.telegram_id),
                  u = l ? l[t] : null,
                  f = u?.startTime || n?.shift_start_time || `16:00`;
                u?.endTime || n?.shift_end_time;
                let m = u?.startTime ? `${u.startTime} – ${u.endTime}` : n?.shift_start_time ? `${n.shift_start_time} – ${n.shift_end_time}` : `Unassigned`,
                  {
                    isLate: g
                  } = Vc(a, f),
                  v = !1,
                  y = `-`;
                if (i) {
                  let e = new Date(i.timestamp).getTime() - r;
                  y = `${Math.floor(e/36e5)}h ${Math.floor(e%36e5/6e4)}m`
                } else if (d) {
                  v = !0;
                  let e = Math.max(0, c.getTime() - r);
                  y = `${Math.floor(e/36e5)}h ${Math.floor(e%36e5/6e4)}m (Active)`
                } else y = `Completed`;
                return {
                  checkInLog: e,
                  checkOutLog: i,
                  emp: n,
                  checkInTimeUz: a,
                  checkInTimeFormatted: o,
                  checkOutTimeFormatted: s,
                  shiftTimeframe: m,
                  isLate: g,
                  isOnDuty: v,
                  durationLabel: y
                }
              }),
              g = m.filter(e => e.isOnDuty).length,
              v = m.filter(e => e.isLate).length;
            return {
              dayKey: t,
              dateStr: n,
              dayLabel: l,
              formattedDate: u,
              isToday: d,
              checkIns: m,
              totalCheckIns: m.length,
              onDutyCount: g,
              lateCount: v
            }
          }),
          v = M === `all` ? g : g.filter(e => e.dateStr === M),
          y = g.reduce((e, t) => e + t.totalCheckIns, 0),
          b = ne.length,
          x = g.reduce((e, t) => e + t.lateCount, 0),
          S = (e, t, n) => P[e] === void 0 ? t || n : !P[e],
          C = (e, t, n) => {
            let r = S(e, t, n);
            F(t => ({
              ...t,
              [e]: r
            }))
          };
        return (0, $.jsxs)(`div`, {
          className: `space-y-4`,
          children: [(0, $.jsxs)(`div`, {
            className: `p-4 rounded-2xl border ${J} ${q} shadow-sm space-y-3`,
            children: [(0, $.jsxs)(`div`, {
              className: `flex flex-wrap items-center justify-between gap-3`,
              children: [(0, $.jsxs)(`div`, {
                children: [(0, $.jsxs)(`div`, {
                  className: `flex items-center gap-2`,
                  children: [(0, $.jsx)(U, {
                    className: `w-4 h-4 text-[#EF4444]`
                  }), (0, $.jsx)(`h2`, {
                    className: `text-base font-bold tracking-tight ${u?`text-white`:`text-slate-900`}`,
                    children: `Daily Check-Ins & Weekly Attendance`
                  })]
                }), (0, $.jsx)(`p`, {
                  className: `text-xs ${Y} mt-0.5`,
                  children: `Showing daily check-in timestamps, selfies, location, and shift timeframes • Tashkent Time (UTC+5)`
                })]
              }), (0, $.jsxs)(`div`, {
                className: `flex items-center gap-2`,
                children: [(0, $.jsx)(`span`, {
                  className: `text-xs font-mono font-bold ${u?`text-slate-300`:`text-slate-700`}`,
                  children: d
                }), (0, $.jsxs)(`div`, {
                  className: `flex items-center rounded-xl border p-0.5 ${u?`border-[#262C3A] bg-[#07090E]`:`border-slate-300 bg-slate-100`}`,
                  children: [(0, $.jsx)(`button`, {
                    onClick: () => f(-7),
                    className: `p-1.5 rounded-lg transition-colors cursor-pointer ${u?`text-slate-300 hover:text-white hover:bg-[#161B26]`:`text-slate-700 hover:text-black hover:bg-white`}`,
                    title: `Previous Week`,
                    children: (0, $.jsx)(R, {
                      className: `w-4 h-4`
                    })
                  }), (0, $.jsx)(`button`, {
                    onClick: () => f(7),
                    className: `p-1.5 rounded-lg transition-colors cursor-pointer ${u?`text-slate-300 hover:text-white hover:bg-[#161B26]`:`text-slate-700 hover:text-black hover:bg-white`}`,
                    title: `Next Week`,
                    children: (0, $.jsx)(z, {
                      className: `w-4 h-4`
                    })
                  })]
                }), (0, $.jsx)(`button`, {
                  onClick: m,
                  className: `px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${u?`border-[#262C3A] bg-[#0E121A] text-slate-300 hover:bg-slate-800`:`border-slate-300 bg-white text-slate-700 hover:bg-slate-100`}`,
                  children: `Current Week`
                })]
              })]
            }), (0, $.jsxs)(`div`, {
              className: `pt-3 border-t flex flex-wrap items-center justify-between gap-3 ${u?`border-[#262C3A]/60`:`border-slate-200`}`,
              children: [(0, $.jsxs)(`div`, {
                className: `flex items-center gap-2.5 flex-wrap`,
                children: [(0, $.jsxs)(`div`, {
                  className: `flex items-center gap-1.5`,
                  children: [(0, $.jsx)(se, {
                    className: `w-3.5 h-3.5 text-slate-400`
                  }), (0, $.jsx)(`span`, {
                    className: `text-xs font-bold ${Y}`,
                    children: `Filter Day:`
                  })]
                }), (0, $.jsxs)(`select`, {
                  value: M,
                  onChange: e => N(e.target.value),
                  className: `py-1.5 px-3 rounded-xl border text-xs font-bold transition-colors cursor-pointer focus:outline-none focus:border-[#EF4444] ${u?`bg-[#0E121A] border-[#262C3A] text-slate-200`:`bg-white border-slate-300 text-slate-800`}`,
                  children: [(0, $.jsxs)(`option`, {
                    value: `all`,
                    children: [`All Days (Weekly View • `, y, ` Total)`]
                  }), g.map(e => (0, $.jsxs)(`option`, {
                    value: e.dateStr,
                    children: [e.dayLabel, `, `, e.formattedDate, ` (`, e.totalCheckIns, ` check-in`, e.totalCheckIns === 1 ? `` : `s`, `) `, e.isToday ? `— Today` : ``]
                  }, e.dateStr))]
                }), (0, $.jsxs)(`div`, {
                  className: `flex items-center gap-1.5 ml-1`,
                  children: [(0, $.jsx)(`button`, {
                    type: `button`,
                    onClick: () => {
                      let e = {};
                      g.forEach(t => {
                        e[t.dateStr] = !1
                      }), F(e)
                    },
                    className: `px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-colors cursor-pointer ${u?`border-[#262C3A] text-slate-300 hover:bg-[#1A202C]`:`border-slate-300 text-slate-700 hover:bg-slate-100`}`,
                    children: `Expand All`
                  }), (0, $.jsx)(`button`, {
                    type: `button`,
                    onClick: () => {
                      let e = {};
                      g.forEach(t => {
                        e[t.dateStr] = !0
                      }), F(e)
                    },
                    className: `px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-colors cursor-pointer ${u?`border-[#262C3A] text-slate-300 hover:bg-[#1A202C]`:`border-slate-300 text-slate-700 hover:bg-slate-100`}`,
                    children: `Collapse All`
                  })]
                })]
              }), (0, $.jsxs)(`div`, {
                className: `flex items-center gap-2 flex-wrap`,
                children: [(0, $.jsxs)(`span`, {
                  className: `px-2.5 py-1 rounded-xl text-xs font-mono font-bold border ${u?`bg-[#0E121A] border-[#262C3A] text-slate-200`:`bg-slate-50 border-slate-200 text-slate-800`}`,
                  children: [`Week Check-Ins: `, (0, $.jsx)(`strong`, {
                    className: `text-white font-extrabold`,
                    children: y
                  })]
                }), (0, $.jsxs)(`span`, {
                  className: `px-2.5 py-1 rounded-xl text-xs font-mono font-bold border bg-emerald-500/10 text-emerald-400 border-emerald-500/30 flex items-center gap-1.5`,
                  children: [(0, $.jsx)(`span`, {
                    className: `w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse`
                  }), `On Duty Now: `, (0, $.jsx)(`strong`, {
                    children: b
                  })]
                }), (0, $.jsxs)(`span`, {
                  className: `px-2.5 py-1 rounded-xl text-xs font-mono font-bold border bg-amber-500/10 text-amber-400 border-amber-500/30`,
                  children: [`Late Flags: `, (0, $.jsx)(`strong`, {
                    children: x
                  })]
                })]
              })]
            })]
          }), (0, $.jsx)(`div`, {
            className: `space-y-3.5`,
            children: v.map(e => {
              let t = e.totalCheckIns > 0,
                n = S(e.dateStr, t, e.isToday);
              return (0, $.jsxs)(`div`, {
                className: `rounded-2xl border overflow-hidden transition-all shadow-sm ${q} ${e.isToday?u?`border-blue-500/40`:`border-blue-400`:J}`,
                children: [(0, $.jsxs)(`button`, {
                  type: `button`,
                  onClick: () => C(e.dateStr, t, e.isToday),
                  className: `w-full py-3 px-4 border-b text-left flex flex-wrap items-center justify-between gap-3 transition-colors cursor-pointer select-none ${e.isToday?u?`bg-blue-950/25 border-blue-500/30 hover:bg-blue-950/35`:`bg-blue-50/70 border-blue-200 hover:bg-blue-50`:u?`bg-[#0E121A] border-[#262C3A] hover:bg-[#141A26]`:`bg-slate-50 border-slate-200 hover:bg-slate-100/70`}`,
                  children: [(0, $.jsxs)(`div`, {
                    className: `flex items-center gap-3`,
                    children: [(0, $.jsx)(`div`, {
                      className: `w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${e.isToday?`bg-blue-600 text-white shadow-sm shadow-blue-500/30`:u?`bg-[#161B26] text-slate-300 border border-[#262C3A]`:`bg-slate-200 text-slate-800`}`,
                      children: e.dayKey.slice(0, 2).toUpperCase()
                    }), (0, $.jsx)(`div`, {
                      children: (0, $.jsxs)(`div`, {
                        className: `flex items-center gap-2`,
                        children: [(0, $.jsx)(`span`, {
                          className: `font-bold text-sm ${u?`text-white`:`text-slate-900`}`,
                          children: e.dayLabel
                        }), (0, $.jsx)(`span`, {
                          className: `text-xs font-mono ${Y}`,
                          children: e.formattedDate
                        }), e.isToday && (0, $.jsx)(`span`, {
                          className: `text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/40`,
                          children: `TODAY`
                        })]
                      })
                    })]
                  }), (0, $.jsxs)(`div`, {
                    className: `flex items-center gap-2.5`,
                    children: [(0, $.jsxs)(`span`, {
                      className: `text-[11px] font-mono px-2.5 py-0.5 rounded-lg border font-bold ${t?u?`border-[#262C3A] bg-[#07090E] text-slate-200`:`border-slate-300 bg-white text-slate-800`:`border-transparent text-slate-400`}`,
                      children: [e.totalCheckIns, ` Check-In`, e.totalCheckIns === 1 ? `` : `s`]
                    }), e.onDutyCount > 0 && (0, $.jsxs)(`span`, {
                      className: `text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 font-mono`,
                      children: [(0, $.jsx)(`span`, {
                        className: `w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse`
                      }), e.onDutyCount, ` On Duty`]
                    }), e.lateCount > 0 && (0, $.jsxs)(`span`, {
                      className: `text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 font-mono`,
                      children: [e.lateCount, ` Late`]
                    }), (0, $.jsx)(`div`, {
                      className: `p-1.5 rounded-lg transition-transform duration-200 ${u?`text-slate-400 hover:text-white`:`text-slate-600 hover:text-black`}`,
                      children: n ? (0, $.jsx)(B, {
                        className: `w-4 h-4`
                      }) : (0, $.jsx)(ee, {
                        className: `w-4 h-4`
                      })
                    })]
                  })]
                }), n && (0, $.jsx)(`div`, {
                  children: t ? (0, $.jsx)(`div`, {
                    className: `overflow-x-auto`,
                    children: (0, $.jsxs)(`table`, {
                      className: `w-full text-left text-xs`,
                      children: [(0, $.jsx)(`thead`, {
                        className: `text-[10px] font-bold uppercase tracking-wider border-b ${u?`bg-[#0B0E14] text-slate-400 border-[#262C3A]`:`bg-slate-100/70 text-slate-500 border-slate-200`}`,
                        children: (0, $.jsxs)(`tr`, {
                          children: [(0, $.jsx)(`th`, {
                            className: `py-2.5 px-4`,
                            children: `Member`
                          }), (0, $.jsx)(`th`, {
                            className: `py-2.5 px-4`,
                            children: `Selfie Picture`
                          }), (0, $.jsx)(`th`, {
                            className: `py-2.5 px-4`,
                            children: `Check-In (UZT)`
                          }), (0, $.jsx)(`th`, {
                            className: `py-2.5 px-4`,
                            children: `Check-Out (UZT)`
                          }), (0, $.jsx)(`th`, {
                            className: `py-2.5 px-4`,
                            children: `Shift & Duration`
                          }), (0, $.jsx)(`th`, {
                            className: `py-2.5 px-4`,
                            children: `Timeliness`
                          }), (0, $.jsx)(`th`, {
                            className: `py-2.5 px-4`,
                            children: `Location Proximity`
                          }), (0, $.jsx)(`th`, {
                            className: `py-2.5 px-4`,
                            children: `Notes`
                          })]
                        })
                      }), (0, $.jsx)(`tbody`, {
                        className: `divide-y ${u?`divide-[#262C3A] text-slate-200`:`divide-slate-200 text-slate-700`}`,
                        children: e.checkIns.map(({
                          checkInLog: e,
                          checkOutLog: t,
                          emp: n,
                          checkInTimeFormatted: r,
                          checkOutTimeFormatted: i,
                          shiftTimeframe: a,
                          isLate: o,
                          isOnDuty: s,
                          durationLabel: c
                        }) => {
                          let l = `${n?.first_name||`Member`} ${n?.last_name||``}`.trim(),
                            d = e.distance_meters,
                            f = d != null && d <= Pc.radiusMeters;
                          return (0, $.jsxs)(`tr`, {
                            className: `transition-colors ${u?`hover:bg-[#161B26]`:`hover:bg-slate-50`}`,
                            children: [(0, $.jsx)(`td`, {
                              className: `py-3 px-4`,
                              children: (0, $.jsxs)(`div`, {
                                className: `flex items-center gap-2.5`,
                                children: [(0, $.jsx)(`div`, {
                                  className: `w-8 h-8 rounded-full overflow-hidden border flex items-center justify-center shrink-0 ${u?`bg-[#0D1017] border-[#262C3A]`:`bg-slate-100 border-slate-300`}`,
                                  children: n?.photo_url ? (0, $.jsx)(`img`, {
                                    src: n.photo_url,
                                    alt: l,
                                    className: `w-full h-full object-cover`
                                  }) : (0, $.jsx)(Be, {
                                    className: `w-4 h-4 text-slate-400`
                                  })
                                }), (0, $.jsxs)(`div`, {
                                  children: [(0, $.jsx)(`span`, {
                                    className: `font-bold block text-xs ${u?`text-white`:`text-slate-900`}`,
                                    children: l
                                  }), (0, $.jsxs)(`div`, {
                                    className: `flex items-center gap-1.5 mt-0.5`,
                                    children: [(0, $.jsxs)(`span`, {
                                      className: `text-[10px] font-mono ${Y}`,
                                      children: [`ID: `, e.telegram_id]
                                    }), n?.department && (0, $.jsx)(`span`, {
                                      className: `text-[9px] font-bold px-1.5 py-0.2 rounded bg-red-500/10 text-red-400 border border-red-500/20 font-mono`,
                                      children: n.department
                                    })]
                                  })]
                                })]
                              })
                            }), (0, $.jsx)(`td`, {
                              className: `py-3 px-4`,
                              children: e.photo_url ? (0, $.jsxs)(`button`, {
                                type: `button`,
                                onClick: () => D(e),
                                className: `w-9 h-9 rounded-lg overflow-hidden border relative group cursor-pointer shadow-sm ${u?`border-[#262C3A] hover:border-red-400`:`border-slate-300 hover:border-red-500`}`,
                                title: `Click to view full selfie & details`,
                                children: [(0, $.jsx)(`img`, {
                                  src: e.photo_url,
                                  alt: `Selfie Check-in`,
                                  className: `w-full h-full object-cover`
                                }), (0, $.jsx)(`div`, {
                                  className: `absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity`,
                                  children: (0, $.jsx)(G, {
                                    className: `w-3.5 h-3.5 text-white`
                                  })
                                })]
                              }) : (0, $.jsx)(`span`, {
                                className: `text-[11px] ${Y}`,
                                children: `No Selfie`
                              })
                            }), (0, $.jsxs)(`td`, {
                              className: `py-3 px-4 font-mono`,
                              children: [(0, $.jsx)(`div`, {
                                className: `font-bold text-xs ${u?`text-white`:`text-slate-900`}`,
                                children: r
                              }), (0, $.jsx)(`span`, {
                                className: `text-[10px] text-emerald-500 font-semibold`,
                                children: `Checked In`
                              })]
                            }), (0, $.jsx)(`td`, {
                              className: `py-3 px-4 font-mono`,
                              children: s ? (0, $.jsxs)(`span`, {
                                className: `inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30`,
                                children: [(0, $.jsx)(`span`, {
                                  className: `w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse`
                                }), `ON DUTY`]
                              }) : i ? (0, $.jsxs)(`div`, {
                                children: [(0, $.jsx)(`div`, {
                                  className: `font-bold text-xs ${u?`text-white`:`text-slate-900`}`,
                                  children: i
                                }), (0, $.jsx)(`span`, {
                                  className: `text-[10px] ${Y}`,
                                  children: `Checked Out`
                                })]
                              }) : (0, $.jsx)(`span`, {
                                className: `text-[11px] ${Y}`,
                                children: `-`
                              })
                            }), (0, $.jsxs)(`td`, {
                              className: `py-3 px-4`,
                              children: [(0, $.jsxs)(`div`, {
                                className: `flex items-center gap-1.5 font-mono text-[11px]`,
                                children: [(0, $.jsx)(U, {
                                  className: `w-3 h-3 text-[#EF4444]`
                                }), (0, $.jsx)(`span`, {
                                  className: `font-semibold`,
                                  children: a
                                })]
                              }), (0, $.jsxs)(`div`, {
                                className: `text-[10px] font-mono text-emerald-500 font-bold mt-0.5`,
                                children: [`Duration: `, c]
                              })]
                            }), (0, $.jsx)(`td`, {
                              className: `py-3 px-4`,
                              children: o ? (0, $.jsxs)(`span`, {
                                className: `inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30 font-mono`,
                                children: [(0, $.jsx)(Le, {
                                  className: `w-3 h-3`
                                }), `Late`]
                              }) : (0, $.jsxs)(`span`, {
                                className: `inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-mono`,
                                children: [(0, $.jsx)(H, {
                                  className: `w-3 h-3`
                                }), `On-Time`]
                              })
                            }), (0, $.jsx)(`td`, {
                              className: `py-3 px-4`,
                              children: d == null ? (0, $.jsx)(`span`, {
                                className: `text-[10px] ${Y}`,
                                children: `Remote`
                              }) : (0, $.jsxs)(`span`, {
                                className: `text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${f?`bg-emerald-500/10 text-emerald-400 border border-emerald-500/30`:`bg-amber-500/10 text-amber-400 border border-amber-500/30`}`,
                                children: [f ? (0, $.jsx)(H, {
                                  className: `w-3 h-3`
                                }) : (0, $.jsx)(Le, {
                                  className: `w-3 h-3`
                                }), f ? `Office (${d}m)` : `${d}m Away`]
                              })
                            }), (0, $.jsx)(`td`, {
                              className: `py-3 px-4 max-w-xs truncate text-[11px] ${Y}`,
                              children: e.note || `-`
                            })]
                          }, e.id)
                        })
                      })]
                    })
                  }) : (0, $.jsxs)(`div`, {
                    className: `py-8 text-center text-xs ${Y}`,
                    children: [`No check-ins recorded for `, e.dayLabel, `, `, e.formattedDate, `.`]
                  })
                })]
              }, e.dateStr)
            })
          })]
        })
      })()]
    }), E && (0, $.jsx)(qc, {
      log: E,
      isOpen: !!E,
      onClose: () => D(null)
    }), O && (0, $.jsx)(ol, {
      isOpen: !!O,
      onClose: () => k(null),
      employee: O,
      onShiftSaved: () => {
        W()
      },
      currentWeekStartDate: o,
      isDark: u
    }), (0, $.jsx)(el, {
      isOpen: A,
      onClose: () => j(!1),
      isDark: u
    })]
  })
}, cl = ({
  onLoginSuccess: e,
  onBackToApp: t
}) => {
  let [n, r] = (0, T.useState)(`NAJMIDDIN`), [i, a] = (0, T.useState)(``), [o, s] = (0, T.useState)(null), [c, l] = (0, T.useState)(!1);
  return (0, $.jsxs)(`div`, {
    className: `min-h-screen bg-[#07090e] flex flex-col justify-center items-center p-4 font-['Plus_Jakarta_Sans',sans-serif]`,
    children: [(0, $.jsx)(`div`, {
      className: `absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-25 pointer-events-none`
    }), (0, $.jsxs)(`div`, {
      className: `w-full max-w-md bg-[#0f1422] border border-cyan-900/60 rounded-3xl p-8 shadow-2xl relative z-10`,
      children: [(0, $.jsxs)(`div`, {
        className: `flex flex-col items-center text-center mb-6`,
        children: [(0, $.jsx)(`div`, {
          className: `w-14 h-14 rounded-2xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/10 mb-3`,
          children: (0, $.jsx)(Ne, {
            className: `w-7 h-7`
          })
        }), (0, $.jsx)(`span`, {
          className: `text-[10px] font-mono tracking-widest text-cyan-400 uppercase bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800/80 mb-2 font-bold`,
          children: `RESTRICTED DEVELOPER ACCESS • /dev7core`
        }), (0, $.jsx)(`h1`, {
          className: `text-2xl font-black text-white tracking-tight`,
          children: `Developer Command Suite`
        }), (0, $.jsx)(`p`, {
          className: `text-xs text-slate-400 mt-1`,
          children: `Full Supabase data access, manager provisioning & system control`
        })]
      }), o && (0, $.jsxs)(`div`, {
        className: `mb-5 p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-start gap-2.5 text-xs text-rose-300`,
        children: [(0, $.jsx)(V, {
          className: `w-4 h-4 shrink-0 text-rose-400 mt-0.5`
        }), (0, $.jsx)(`span`, {
          children: o
        })]
      }), (0, $.jsxs)(`form`, {
        onSubmit: async t => {
          if (t.preventDefault(), !n.trim() || !i.trim()) {
            s(`Please provide developer username and password.`);
            return
          }
          l(!0), s(null);
          try {
            let t = await xc(n, i);
            t.success && t.devUser ? e(t.devUser) : s(t.message || `Invalid developer credentials. Access denied.`)
          } catch {
            s(`Authentication failed. Check network connection.`)
          } finally {
            l(!1)
          }
        },
        className: `space-y-4`,
        children: [(0, $.jsxs)(`div`, {
          className: `space-y-1.5`,
          children: [(0, $.jsxs)(`label`, {
            className: `text-xs font-semibold text-slate-300 flex items-center gap-1.5`,
            children: [(0, $.jsx)(Be, {
              className: `w-3.5 h-3.5 text-cyan-400`
            }), `Developer Username`]
          }), (0, $.jsx)(`input`, {
            type: `text`,
            required: !0,
            autoFocus: !0,
            value: n,
            onChange: e => r(e.target.value),
            placeholder: `Username`,
            className: `w-full py-2.5 px-3.5 bg-slate-900/90 border border-slate-700 rounded-xl text-sm text-white font-mono focus:outline-none focus:border-cyan-500 transition-colors uppercase`
          })]
        }), (0, $.jsxs)(`div`, {
          className: `space-y-1.5`,
          children: [(0, $.jsxs)(`label`, {
            className: `text-xs font-semibold text-slate-300 flex items-center gap-1.5`,
            children: [(0, $.jsx)(Z, {
              className: `w-3.5 h-3.5 text-cyan-400`
            }), `Developer Password`]
          }), (0, $.jsx)(`input`, {
            type: `password`,
            required: !0,
            value: i,
            onChange: e => a(e.target.value),
            placeholder: `••••••••••••`,
            className: `w-full py-2.5 px-3.5 bg-slate-900/90 border border-slate-700 rounded-xl text-sm text-white font-mono focus:outline-none focus:border-cyan-500 transition-colors`
          })]
        }), (0, $.jsx)(`button`, {
          type: `submit`,
          disabled: c,
          className: `w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50`,
          children: c ? (0, $.jsx)(`span`, {
            children: `VERIFYING ACCESS...`
          }) : (0, $.jsxs)($.Fragment, {
            children: [(0, $.jsx)(`span`, {
              children: `ENTER DEVELOPER CONSOLE`
            }), (0, $.jsx)(j, {
              className: `w-4 h-4`
            })]
          })
        })]
      }), (0, $.jsxs)(`div`, {
        className: `mt-6 pt-5 border-t border-slate-800 text-center`,
        children: [(0, $.jsxs)(`p`, {
          className: `text-[11px] text-slate-500 font-mono`,
          children: [`Auth: `, (0, $.jsx)(`span`, {
            className: `text-cyan-400`,
            children: `NAJMIDDIN`
          })]
        }), t && (0, $.jsx)(`button`, {
          onClick: t,
          className: `mt-3 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer`,
          children: `← Return to Mobile App`
        })]
      })]
    })]
  })
}, ll = ({
  onBackToApp: e,
  onNavigateToManager: t,
  onNavigateToAdmin: n
}) => {
  let [r, i] = (0, T.useState)(() => {
    try {
      let e = localStorage.getItem(`7core_dev_session`);
      return e ? JSON.parse(e) : null
    } catch {
      return null
    }
  }), [a, o] = (0, T.useState)(`managers`), [s, c] = (0, T.useState)([]), [l, u] = (0, T.useState)(!1), [d, f] = (0, T.useState)(null), [p, m] = (0, T.useState)(``), [h, g] = (0, T.useState)(``), [_, v] = (0, T.useState)(``), [y, b] = (0, T.useState)(`7CORE`), [x, S] = (0, T.useState)(``), [C, w] = (0, T.useState)([]), [E, D] = (0, T.useState)(``), [O, k] = (0, T.useState)(`All`), [j, M] = (0, T.useState)(null), [P, F] = (0, T.useState)(null), [I, ee] = (0, T.useState)([]), [R, z] = (0, T.useState)(!1), [B, V] = (0, T.useState)(``), [U, W] = (0, T.useState)(``), [re, ae] = (0, T.useState)(``), [G, K] = (0, T.useState)(`Admin`), [oe, se] = (0, T.useState)(`employees`), [q, ce] = (0, T.useState)([]), [J, le] = (0, T.useState)(``), [X, Z] = (0, T.useState)(!1), [de, fe] = (0, T.useState)(!1), [pe, me] = (0, T.useState)(``), [he, _e] = (0, T.useState)(``), [ve, be] = (0, T.useState)(null), [xe, Ce] = (0, T.useState)(!1), we = (0, T.useRef)(a);
  we.current = a;
  let Te = (0, T.useRef)(oe);
  Te.current = oe;
  let Ee = (0, T.useRef)(0),
    Oe = e => {
      i(e);
      try {
        localStorage.setItem(`7core_dev_session`, JSON.stringify(e))
      } catch {}
    },
    ke = () => {
      i(null);
      try {
        localStorage.removeItem(`7core_dev_session`)
      } catch {}
    },
    Ae = (0, T.useCallback)(async () => {
      Ce(!0);
      try {
        let [e, t, n, r] = await Promise.all([hc(), Sc(), Is(), Ds()]);
        c(e), ee(t), me(n), w(r)
      } catch (e) {
        console.error(`Error loading dev data:`, e)
      } finally {
        Ce(!1)
      }
    }, []),
    je = (0, T.useCallback)(async (e, t = !1) => {
      t ? Z(!0) : fe(!0);
      try {
        let t = await Tc(e);
        ce(t)
      } catch (t) {
        console.error(`Error querying table ${e}:`, t)
      } finally {
        Z(!1), fe(!1)
      }
    }, []);
  (0, T.useEffect)(() => {
    r && Ae()
  }, [r, Ae]), (0, T.useEffect)(() => {
    r && a === `database` && je(oe, !0)
  }, [r, a, oe, je]), (0, T.useEffect)(() => {
    if (!r) return;
    let e = Bs(() => {
      let e = Date.now();
      e - Ee.current < 4e3 || (Ee.current = e, Ae(), we.current === `database` && je(Te.current, !1))
    });
    return () => {
      e()
    }
  }, [r, Ae, je]);
  let Me = async e => {
    if (e.preventDefault(), p.trim()) {
      if (d) {
        let e = {
          full_name: _.trim() || p.trim(),
          department: y,
          team_name: x.trim() || `${y} Team`
        };
        h.trim() && (e.password = h.trim()), await _c(d.id, e), f(null)
      } else {
        if (!h.trim()) {
          alert(`Password is required when creating a new manager.`);
          return
        }
        await gc({
          username: p.trim(),
          password: h.trim(),
          full_name: _.trim() || p.trim(),
          department: y,
          team_name: x.trim() || `${y} Team`
        }), u(!1)
      }
      m(``), g(``), v(``), S(``), Ae()
    }
  }, Fe = async (e, t) => {
    confirm(`Are you sure you want to permanently delete manager "${t}"?`) && (await vc(e), Ae())
  }, Ie = async (e, t) => {
    F(e);
    try {
      let n = t === `unassigned` ? null : t,
        r = await yc(e, n);
      if (r.success) {
        let t = C.find(t => t.telegram_id === e),
          r = `${t?.first_name||`User`} ${t?.last_name||``}`.trim(),
          i = s.find(e => e.id === n);
        M(i ? `User "${r}" assigned to Manager "${i.full_name}". Department switched to "${i.department}".` : `User "${r}" unassigned from manager.`), setTimeout(() => M(null), 4e3), await Ae()
      } else alert(r.message || `Failed to assign user to manager.`)
    } catch (e) {
      console.error(`Error assigning user:`, e), alert(`Error updating user assignment.`)
    } finally {
      F(null)
    }
  }, Le = async (e, t) => {
    F(e);
    try {
      if (await bc(e, t)) {
        let n = C.find(t => t.telegram_id === e),
          r = `${n?.first_name||`User`} ${n?.last_name||``}`.trim();
        M(`User "${r}" department successfully updated to "${t}".`), setTimeout(() => M(null), 4e3), await Ae()
      } else alert(`Failed to update employee department.`)
    } catch (e) {
      console.error(`Error switching department:`, e), alert(`Error updating department.`)
    } finally {
      F(null)
    }
  }, Re = async e => {
    e.preventDefault(), B.trim() && U.trim() && (await Cc({
      username: B.trim(),
      password: U.trim(),
      display_name: re.trim() || B.trim(),
      role: G
    }), V(``), W(``), ae(``), z(!1), Ae())
  }, Be = async (e, t) => {
    confirm(`Permanently delete admin user "${t}"?`) && (await wc(e), Ae())
  }, He = async e => {
    e.preventDefault(), he.trim() && (await Ls(he.trim()) ? (me(he.trim().toUpperCase()), _e(``), be(`Passkey successfully updated in Supabase.`), setTimeout(() => be(null), 3e3)) : alert(`Failed to update passkey.`))
  }, Ue = async e => {
    let t = e.id === void 0 ? e.telegram_id === void 0 ? `key_name` : `telegram_id` : `id`,
      n = e[t];
    confirm(`Permanently delete row where ${t} = "${n}" from table "${oe}"?`) && (await Ec(oe, t, n), je(oe, !1))
  }, We = () => {
    let e = new Blob([JSON.stringify(q, null, 2)], {
        type: `application/json`
      }),
      t = URL.createObjectURL(e),
      n = document.createElement(`a`);
    n.href = t, n.download = `supabase_${oe}_export_${new Date().toISOString().split(`T`)[0]}.json`, n.click()
  };
  if (!r) return (0, $.jsx)(cl, {
    onLoginSuccess: Oe,
    onBackToApp: e
  });
  let Ge = C.filter(e => {
      if (O !== `All` && e.department !== O) return !1;
      if (!E.trim()) return !0;
      let t = E.toLowerCase(),
        n = `${e.first_name||``} ${e.last_name||``}`.toLowerCase(),
        r = String(e.telegram_id),
        i = (e.username || ``).toLowerCase();
      return n.includes(t) || r.includes(t) || i.includes(t)
    }),
    Ke = q.filter(e => !J.trim() || JSON.stringify(e).toLowerCase().includes(J.toLowerCase()));
  return (0, $.jsxs)(`div`, {
    className: `min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]`,
    children: [(0, $.jsxs)(`header`, {
      className: `w-full px-6 py-3.5 bg-[#0f1422] border-b border-cyan-950 flex items-center justify-between sticky top-0 z-40`,
      children: [(0, $.jsxs)(`div`, {
        className: `flex items-center gap-3`,
        children: [(0, $.jsx)(`div`, {
          className: `w-9 h-9 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-700/60 flex items-center justify-center font-bold`,
          children: (0, $.jsx)(Ne, {
            className: `w-5 h-5`
          })
        }), (0, $.jsxs)(`div`, {
          children: [(0, $.jsxs)(`div`, {
            className: `flex items-center gap-2`,
            children: [(0, $.jsx)(`h1`, {
              className: `text-base font-black text-white tracking-tight`,
              children: `DEVELOPER COMMAND SUITE`
            }), (0, $.jsx)(`span`, {
              className: `text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800`,
              children: `/dev7core • FULL CONTROL`
            })]
          }), (0, $.jsxs)(`p`, {
            className: `text-[11px] text-slate-400 font-mono`,
            children: [`Authenticated: `, (0, $.jsx)(`strong`, {
              children: r.username
            }), ` • Supabase Database Connected`]
          })]
        })]
      }), (0, $.jsxs)(`div`, {
        className: `flex items-center gap-3`,
        children: [t && (0, $.jsxs)(`button`, {
          onClick: t,
          className: `text-xs px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-blue-300 flex items-center gap-1.5 transition-colors cursor-pointer`,
          children: [(0, $.jsx)(N, {
            className: `w-3.5 h-3.5 text-blue-400`
          }), (0, $.jsx)(`span`, {
            children: `Manager Portal (/7manage)`
          })]
        }), n && (0, $.jsxs)(`button`, {
          onClick: n,
          className: `text-xs px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-red-400 flex items-center gap-1.5 transition-colors cursor-pointer`,
          children: [(0, $.jsx)(De, {
            className: `w-3.5 h-3.5 text-[#EF4444]`
          }), (0, $.jsx)(`span`, {
            children: `Admin Terminal`
          })]
        }), (0, $.jsx)(`button`, {
          onClick: () => Ae(),
          className: `p-2 rounded-xl border border-slate-700 bg-slate-900 text-slate-300 hover:text-white transition-colors cursor-pointer`,
          title: `Refresh Data`,
          children: (0, $.jsx)(ye, {
            className: `w-4 h-4 ${xe?`animate-spin text-cyan-400`:``}`
          })
        }), (0, $.jsx)(`button`, {
          onClick: ke,
          className: `p-2 rounded-xl border border-slate-700 bg-slate-900 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer`,
          title: `Sign Out Developer`,
          children: (0, $.jsx)(ue, {
            className: `w-4 h-4`
          })
        })]
      })]
    }), (0, $.jsxs)(`nav`, {
      "aria-label": `Dev Navigation`,
      className: `w-full px-6 py-2.5 bg-[#0b0e17] border-b border-slate-800 flex items-center justify-between text-xs font-semibold`,
      children: [(0, $.jsxs)(`div`, {
        className: `flex items-center gap-2 overflow-x-auto`,
        children: [(0, $.jsxs)(`button`, {
          onClick: () => o(`managers`),
          className: `px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${a===`managers`?`bg-[#EF4444] text-white font-bold shadow-md shadow-red-500/25`:`text-slate-300 hover:text-white hover:bg-slate-800`}`,
          children: [(0, $.jsx)(N, {
            className: `w-3.5 h-3.5`
          }), (0, $.jsxs)(`span`, {
            children: [`Manage Managers (`, s.length, `)`]
          })]
        }), (0, $.jsxs)(`button`, {
          onClick: () => o(`users`),
          className: `px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${a===`users`?`bg-[#EF4444] text-white font-bold shadow-md shadow-red-500/25`:`text-slate-300 hover:text-white hover:bg-slate-800`}`,
          children: [(0, $.jsx)(ze, {
            className: `w-3.5 h-3.5`
          }), (0, $.jsxs)(`span`, {
            children: [`User Assignments & Departments (`, C.length, `)`]
          })]
        }), (0, $.jsxs)(`button`, {
          onClick: () => o(`admins`),
          className: `px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${a===`admins`?`bg-[#EF4444] text-white font-bold shadow-md shadow-red-500/25`:`text-slate-300 hover:text-white hover:bg-slate-800`}`,
          children: [(0, $.jsx)(De, {
            className: `w-3.5 h-3.5`
          }), (0, $.jsxs)(`span`, {
            children: [`Manage Admins (`, I.length, `)`]
          })]
        }), (0, $.jsxs)(`button`, {
          onClick: () => o(`database`),
          className: `px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${a===`database`?`bg-[#EF4444] text-white font-bold shadow-md shadow-red-500/25`:`text-slate-300 hover:text-white hover:bg-slate-800`}`,
          children: [(0, $.jsx)(ne, {
            className: `w-3.5 h-3.5`
          }), (0, $.jsx)(`span`, {
            children: `Database Explorer (Supabase CRUD)`
          })]
        }), (0, $.jsxs)(`button`, {
          onClick: () => o(`security`),
          className: `px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${a===`security`?`bg-[#EF4444] text-white font-bold shadow-md shadow-red-500/25`:`text-slate-300 hover:text-white hover:bg-slate-800`}`,
          children: [(0, $.jsx)(Y, {
            className: `w-3.5 h-3.5`
          }), (0, $.jsx)(`span`, {
            children: `System Passkeys & Security`
          })]
        })]
      }), (0, $.jsx)(`button`, {
        onClick: e,
        className: `text-[11px] text-slate-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer shrink-0 ml-4`,
        children: (0, $.jsx)(`span`, {
          children: `← Exit to Mobile App`
        })
      })]
    }), (0, $.jsxs)(`main`, {
      className: `flex-1 w-full max-w-[1920px] mx-auto p-4 md:p-6 space-y-6`,
      children: [a === `managers` && (0, $.jsxs)(`div`, {
        className: `space-y-6`,
        children: [(0, $.jsxs)(`div`, {
          className: `flex flex-col sm:flex-row sm:items-center justify-between gap-4`,
          children: [(0, $.jsxs)(`div`, {
            children: [(0, $.jsx)(`h2`, {
              className: `text-base font-bold text-white tracking-tight`,
              children: `Manager Accounts & Team Access`
            }), (0, $.jsxs)(`p`, {
              className: `text-xs text-slate-400`,
              children: [`Create and manage manager accounts. Strict 3 departments: `, (0, $.jsx)(`strong`, {
                children: `HOS`
              }), `, `, (0, $.jsx)(`strong`, {
                children: `7CORE`
              }), `, and `, (0, $.jsx)(`strong`, {
                children: `CARGOGPT`
              }), `.`]
            })]
          }), !l && !d && (0, $.jsxs)(`button`, {
            onClick: () => {
              u(!0), m(``), g(``), v(``), S(``), b(`7CORE`)
            },
            className: `px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md shadow-cyan-600/30 transition-all cursor-pointer`,
            children: [(0, $.jsx)(te, {
              className: `w-4 h-4`
            }), (0, $.jsx)(`span`, {
              children: `Create New Manager`
            })]
          })]
        }), (l || d) && (0, $.jsxs)(`div`, {
          className: `p-6 bg-[#0f1422] border border-cyan-800/60 rounded-2xl space-y-4 animate-fadeIn`,
          children: [(0, $.jsxs)(`div`, {
            className: `flex items-center justify-between border-b border-slate-800 pb-3`,
            children: [(0, $.jsxs)(`h3`, {
              className: `text-sm font-bold text-white flex items-center gap-2`,
              children: [(0, $.jsx)(N, {
                className: `w-4 h-4 text-cyan-400`
              }), (0, $.jsx)(`span`, {
                children: d ? `Edit Manager: ${d.username}` : `Provision New Manager`
              })]
            }), (0, $.jsx)(`button`, {
              onClick: () => {
                u(!1), f(null)
              },
              className: `text-xs text-slate-400 hover:text-white cursor-pointer`,
              children: `Cancel`
            })]
          }), (0, $.jsxs)(`form`, {
            onSubmit: Me,
            className: `grid grid-cols-1 md:grid-cols-2 gap-4`,
            children: [(0, $.jsxs)(`div`, {
              className: `space-y-1`,
              children: [(0, $.jsx)(`label`, {
                className: `text-xs font-semibold text-slate-300`,
                children: `Manager Username`
              }), (0, $.jsx)(`input`, {
                type: `text`,
                required: !0,
                value: p,
                onChange: e => m(e.target.value),
                placeholder: `e.g. core_mgr`,
                className: `w-full py-2 px-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 font-mono`
              })]
            }), (0, $.jsxs)(`div`, {
              className: `space-y-1`,
              children: [(0, $.jsx)(`label`, {
                className: `text-xs font-semibold text-slate-300`,
                children: d ? `New Password (leave blank to keep current)` : `Password`
              }), (0, $.jsx)(`input`, {
                type: `password`,
                required: !d,
                value: h,
                onChange: e => g(e.target.value),
                placeholder: `••••••••••••`,
                className: `w-full py-2 px-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500`
              })]
            }), (0, $.jsxs)(`div`, {
              className: `space-y-1`,
              children: [(0, $.jsx)(`label`, {
                className: `text-xs font-semibold text-slate-300`,
                children: `Full Name`
              }), (0, $.jsx)(`input`, {
                type: `text`,
                value: _,
                onChange: e => v(e.target.value),
                placeholder: `e.g. Lead Operations Manager`,
                className: `w-full py-2 px-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500`
              })]
            }), (0, $.jsxs)(`div`, {
              className: `space-y-1`,
              children: [(0, $.jsx)(`label`, {
                className: `text-xs font-semibold text-slate-300`,
                children: `Department (Strictly 3 Departments)`
              }), (0, $.jsx)(`select`, {
                value: y,
                onChange: e => {
                  b(e.target.value), (!x || x.includes(`Team`)) && S(`${e.target.value} Team`)
                },
                className: `w-full py-2 px-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500`,
                children: kc.filter(e => !e.toLowerCase().includes(`fleet`)).map(e => (0, $.jsx)(`option`, {
                  value: e,
                  children: e
                }, e))
              })]
            }), (0, $.jsxs)(`div`, {
              className: `space-y-1 md:col-span-2`,
              children: [(0, $.jsx)(`label`, {
                className: `text-xs font-semibold text-slate-300`,
                children: `Team Name / Title`
              }), (0, $.jsx)(`input`, {
                type: `text`,
                value: x,
                onChange: e => S(e.target.value),
                placeholder: `e.g. 7CORE Operations Team`,
                className: `w-full py-2 px-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500`
              })]
            }), (0, $.jsxs)(`div`, {
              className: `md:col-span-2 pt-2 flex items-center justify-end gap-3`,
              children: [(0, $.jsx)(`button`, {
                type: `button`,
                onClick: () => {
                  u(!1), f(null)
                },
                className: `px-4 py-2 bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs cursor-pointer`,
                children: `Cancel`
              }), (0, $.jsx)(`button`, {
                type: `submit`,
                className: `px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer`,
                children: d ? `Update Manager` : `Create Manager Account`
              })]
            })]
          })]
        }), (0, $.jsx)(`div`, {
          className: `rounded-2xl border border-slate-800 bg-[#0f1422] overflow-hidden shadow-lg`,
          children: (0, $.jsxs)(`table`, {
            className: `w-full text-left text-xs`,
            children: [(0, $.jsx)(`thead`, {
              className: `bg-[#0b0e17] text-slate-400 uppercase tracking-wider text-[11px] font-bold border-b border-slate-800`,
              children: (0, $.jsxs)(`tr`, {
                children: [(0, $.jsx)(`th`, {
                  className: `py-3 px-4`,
                  children: `Username`
                }), (0, $.jsx)(`th`, {
                  className: `py-3 px-4`,
                  children: `Manager Full Name`
                }), (0, $.jsx)(`th`, {
                  className: `py-3 px-4`,
                  children: `Department / Team`
                }), (0, $.jsx)(`th`, {
                  className: `py-3 px-4`,
                  children: `Default Shift`
                }), (0, $.jsx)(`th`, {
                  className: `py-3 px-4 text-right`,
                  children: `Actions`
                })]
              })
            }), (0, $.jsx)(`tbody`, {
              className: `divide-y divide-slate-800 text-slate-200`,
              children: s.map(e => (0, $.jsxs)(`tr`, {
                className: `hover:bg-slate-800/40 transition-colors`,
                children: [(0, $.jsx)(`td`, {
                  className: `py-3 px-4 font-mono font-bold text-cyan-400`,
                  children: e.username
                }), (0, $.jsx)(`td`, {
                  className: `py-3 px-4 font-semibold text-white`,
                  children: e.full_name
                }), (0, $.jsxs)(`td`, {
                  className: `py-3 px-4`,
                  children: [(0, $.jsx)(`span`, {
                    className: `inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-blue-950 text-blue-300 border border-blue-900`,
                    children: e.department
                  }), (0, $.jsxs)(`span`, {
                    className: `text-[11px] text-slate-400 ml-2`,
                    children: [`(`, e.team_name || `${e.department} Squad`, `)`]
                  })]
                }), (0, $.jsxs)(`td`, {
                  className: `py-3 px-4 font-mono text-cyan-300`,
                  children: [e.shift_start_time || `09:00`, ` - `, e.shift_end_time || `18:00`]
                }), (0, $.jsx)(`td`, {
                  className: `py-3 px-4 text-right`,
                  children: (0, $.jsxs)(`div`, {
                    className: `flex items-center justify-end gap-2`,
                    children: [(0, $.jsx)(`button`, {
                      onClick: () => {
                        f(e), m(e.username), v(e.full_name), b(e.department), S(e.team_name || ``), g(``)
                      },
                      className: `p-1.5 text-slate-400 hover:text-cyan-400 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer`,
                      title: `Edit Manager`,
                      children: (0, $.jsx)(ge, {
                        className: `w-3.5 h-3.5`
                      })
                    }), (0, $.jsx)(`button`, {
                      onClick: () => Fe(e.id, e.username),
                      className: `p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-rose-950/40 transition-colors cursor-pointer`,
                      title: `Delete Manager`,
                      children: (0, $.jsx)(Pe, {
                        className: `w-3.5 h-3.5`
                      })
                    })]
                  })
                })]
              }, e.id))
            })]
          })
        })]
      }), a === `users` && (0, $.jsxs)(`div`, {
        className: `space-y-4`,
        children: [(0, $.jsxs)(`div`, {
          className: `flex flex-col md:flex-row md:items-center justify-between gap-4`,
          children: [(0, $.jsxs)(`div`, {
            children: [(0, $.jsxs)(`h2`, {
              className: `text-base font-bold text-white tracking-tight flex items-center gap-2`,
              children: [(0, $.jsx)(ze, {
                className: `w-5 h-5 text-cyan-400`
              }), (0, $.jsx)(`span`, {
                children: `Assign Users to Managers & Switch Departments`
              })]
            }), (0, $.jsx)(`p`, {
              className: `text-xs text-slate-400`,
              children: `Control user assignments and fix mix-ups. Assigning a user to a manager automatically switches their department on their account.`
            })]
          }), (0, $.jsxs)(`div`, {
            className: `flex flex-wrap items-center gap-2.5`,
            children: [(0, $.jsxs)(`div`, {
              className: `flex items-center rounded-xl border border-slate-800 bg-[#0f1422] p-1 text-xs`,
              children: [(0, $.jsxs)(`button`, {
                onClick: () => k(`All`),
                className: `px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer ${O===`All`?`bg-cyan-600 text-white`:`text-slate-400 hover:text-white`}`,
                children: [`All (`, C.length, `)`]
              }), kc.filter(e => !e.toLowerCase().includes(`fleet`)).map(e => {
                let t = C.filter(t => t.department === e).length;
                return (0, $.jsxs)(`button`, {
                  onClick: () => k(e),
                  className: `px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer ${O===e?`bg-cyan-600 text-white`:`text-slate-400 hover:text-white`}`,
                  children: [e, ` (`, t, `)`]
                }, e)
              })]
            }), (0, $.jsxs)(`div`, {
              className: `relative`,
              children: [(0, $.jsx)(Se, {
                className: `w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2`
              }), (0, $.jsx)(`input`, {
                type: `text`,
                value: E,
                onChange: e => D(e.target.value),
                placeholder: `Search name, ID...`,
                className: `py-1.5 pl-8 pr-3 rounded-xl border border-slate-700 bg-slate-900 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 w-44`
              })]
            })]
          })]
        }), j && (0, $.jsxs)(`div`, {
          className: `p-3 bg-cyan-950/70 border border-cyan-500/50 rounded-xl flex items-center gap-2 text-xs font-bold text-cyan-300 animate-fadeIn`,
          children: [(0, $.jsx)(H, {
            className: `w-4 h-4 text-cyan-400 shrink-0`
          }), (0, $.jsx)(`span`, {
            children: j
          })]
        }), (0, $.jsx)(`div`, {
          className: `rounded-2xl border border-slate-800 bg-[#0f1422] overflow-hidden shadow-lg`,
          children: (0, $.jsxs)(`table`, {
            className: `w-full text-left text-xs`,
            children: [(0, $.jsx)(`thead`, {
              className: `bg-[#0b0e17] text-slate-400 uppercase tracking-wider text-[11px] font-bold border-b border-slate-800`,
              children: (0, $.jsxs)(`tr`, {
                children: [(0, $.jsx)(`th`, {
                  className: `py-3 px-4`,
                  children: `User / Personnel`
                }), (0, $.jsx)(`th`, {
                  className: `py-3 px-4`,
                  children: `Telegram ID`
                }), (0, $.jsx)(`th`, {
                  className: `py-3 px-4`,
                  children: `Current Department`
                }), (0, $.jsx)(`th`, {
                  className: `py-3 px-4`,
                  children: `Assigned Manager (Auto-Syncs Dept)`
                }), (0, $.jsx)(`th`, {
                  className: `py-3 px-4 text-right`,
                  children: `Status`
                })]
              })
            }), (0, $.jsx)(`tbody`, {
              className: `divide-y divide-slate-800 text-slate-200`,
              children: Ge.length === 0 ? (0, $.jsx)(`tr`, {
                children: (0, $.jsx)(`td`, {
                  colSpan: 5,
                  className: `py-12 text-center text-slate-400`,
                  children: `No users found matching current filters.`
                })
              }) : Ge.map(e => {
                let t = `${e.first_name||`Staff`} ${e.last_name||``}`.trim(),
                  n = s.find(t => t.assigned_employee_ids && t.assigned_employee_ids.includes(e.telegram_id)),
                  r = P === e.telegram_id;
                return (0, $.jsxs)(`tr`, {
                  className: `hover:bg-slate-800/40 transition-colors`,
                  children: [(0, $.jsx)(`td`, {
                    className: `py-3 px-4`,
                    children: (0, $.jsxs)(`div`, {
                      className: `flex items-center gap-3`,
                      children: [(0, $.jsx)(`div`, {
                        className: `w-8 h-8 rounded-full overflow-hidden bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0`,
                        children: e.photo_url ? (0, $.jsx)(`img`, {
                          src: e.photo_url,
                          alt: t,
                          className: `w-full h-full object-cover`
                        }) : (0, $.jsx)(Ve, {
                          className: `w-4 h-4 text-slate-400`
                        })
                      }), (0, $.jsxs)(`div`, {
                        children: [(0, $.jsx)(`span`, {
                          className: `font-bold text-white block`,
                          children: t
                        }), e.username && (0, $.jsxs)(`span`, {
                          className: `text-[10px] text-cyan-400 font-mono`,
                          children: [`@`, e.username]
                        })]
                      })]
                    })
                  }), (0, $.jsx)(`td`, {
                    className: `py-3 px-4 font-mono text-slate-400`,
                    children: e.telegram_id
                  }), (0, $.jsx)(`td`, {
                    className: `py-3 px-4`,
                    children: (0, $.jsxs)(`div`, {
                      className: `flex items-center gap-1.5`,
                      children: [(0, $.jsx)(`select`, {
                        disabled: r,
                        value: e.department || `7CORE`,
                        onChange: t => Le(e.telegram_id, t.target.value),
                        className: `py-1 px-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-bold text-white focus:outline-none focus:border-cyan-500 cursor-pointer disabled:opacity-50`,
                        children: kc.filter(e => !e.toLowerCase().includes(`fleet`)).map(e => (0, $.jsx)(`option`, {
                          value: e,
                          children: e
                        }, e))
                      }), (0, $.jsx)(`span`, {
                        title: `Switch Department`,
                        children: (0, $.jsx)(A, {
                          className: `w-3 h-3 text-slate-500`
                        })
                      })]
                    })
                  }), (0, $.jsx)(`td`, {
                    className: `py-3 px-4`,
                    children: (0, $.jsxs)(`select`, {
                      disabled: r,
                      value: n ? n.id : `unassigned`,
                      onChange: t => Ie(e.telegram_id, t.target.value),
                      className: `py-1 px-2.5 rounded-lg border text-xs font-medium focus:outline-none transition-colors cursor-pointer disabled:opacity-50 ${n?`bg-blue-950/70 border-blue-700 text-blue-200`:`bg-slate-900 border-slate-700 text-slate-400`}`,
                      children: [(0, $.jsx)(`option`, {
                        value: `unassigned`,
                        children: `-- Unassigned (Default to Dept) --`
                      }), s.map(e => (0, $.jsxs)(`option`, {
                        value: e.id,
                        children: [e.full_name, ` (`, e.department, `) - `, e.team_name]
                      }, e.id))]
                    })
                  }), (0, $.jsx)(`td`, {
                    className: `py-3 px-4 text-right`,
                    children: r ? (0, $.jsxs)(`span`, {
                      className: `text-[10px] text-cyan-400 font-mono animate-pulse flex items-center justify-end gap-1`,
                      children: [(0, $.jsx)(ye, {
                        className: `w-3 h-3 animate-spin`
                      }), ` Updating...`]
                    }) : n ? (0, $.jsx)(`span`, {
                      className: `text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold`,
                      children: `Assigned`
                    }) : (0, $.jsx)(`span`, {
                      className: `text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-medium`,
                      children: `Direct Dept`
                    })
                  })]
                }, e.telegram_id)
              })
            })]
          })
        })]
      }), a === `admins` && (0, $.jsxs)(`div`, {
        className: `space-y-6`,
        children: [(0, $.jsxs)(`div`, {
          className: `flex flex-col sm:flex-row sm:items-center justify-between gap-4`,
          children: [(0, $.jsxs)(`div`, {
            children: [(0, $.jsx)(`h2`, {
              className: `text-base font-bold text-white tracking-tight`,
              children: `Admin Terminal Users`
            }), (0, $.jsx)(`p`, {
              className: `text-xs text-slate-400`,
              children: `Manage accounts with full desktop dispatch supervisor access (/admin)`
            })]
          }), !R && (0, $.jsxs)(`button`, {
            onClick: () => z(!0),
            className: `px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md transition-all cursor-pointer`,
            children: [(0, $.jsx)(te, {
              className: `w-4 h-4`
            }), (0, $.jsx)(`span`, {
              children: `Create Admin User`
            })]
          })]
        }), R && (0, $.jsxs)(`form`, {
          onSubmit: Re,
          className: `p-6 bg-[#0f1422] border border-cyan-800/60 rounded-2xl space-y-4 animate-fadeIn`,
          children: [(0, $.jsxs)(`div`, {
            className: `flex items-center justify-between border-b border-slate-800 pb-3`,
            children: [(0, $.jsxs)(`h3`, {
              className: `text-sm font-bold text-white flex items-center gap-2`,
              children: [(0, $.jsx)(De, {
                className: `w-4 h-4 text-cyan-400`
              }), (0, $.jsx)(`span`, {
                children: `Create New Dispatch Admin`
              })]
            }), (0, $.jsx)(`button`, {
              onClick: () => z(!1),
              className: `text-xs text-slate-400 hover:text-white cursor-pointer`,
              children: `Cancel`
            })]
          }), (0, $.jsxs)(`div`, {
            className: `grid grid-cols-1 md:grid-cols-2 gap-4`,
            children: [(0, $.jsxs)(`div`, {
              className: `space-y-1`,
              children: [(0, $.jsx)(`label`, {
                className: `text-xs font-semibold text-slate-300`,
                children: `Admin Username`
              }), (0, $.jsx)(`input`, {
                type: `text`,
                required: !0,
                value: B,
                onChange: e => V(e.target.value),
                placeholder: `e.g. shift_lead`,
                className: `w-full py-2 px-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 font-mono`
              })]
            }), (0, $.jsxs)(`div`, {
              className: `space-y-1`,
              children: [(0, $.jsx)(`label`, {
                className: `text-xs font-semibold text-slate-300`,
                children: `Admin Password`
              }), (0, $.jsx)(`input`, {
                type: `password`,
                required: !0,
                value: U,
                onChange: e => W(e.target.value),
                placeholder: `••••••••••••`,
                className: `w-full py-2 px-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500`
              })]
            }), (0, $.jsxs)(`div`, {
              className: `space-y-1`,
              children: [(0, $.jsx)(`label`, {
                className: `text-xs font-semibold text-slate-300`,
                children: `Display Name`
              }), (0, $.jsx)(`input`, {
                type: `text`,
                value: re,
                onChange: e => ae(e.target.value),
                placeholder: `e.g. Floor Lead`,
                className: `w-full py-2 px-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500`
              })]
            }), (0, $.jsxs)(`div`, {
              className: `space-y-1`,
              children: [(0, $.jsx)(`label`, {
                className: `text-xs font-semibold text-slate-300`,
                children: `Role`
              }), (0, $.jsx)(`input`, {
                type: `text`,
                value: G,
                onChange: e => K(e.target.value),
                placeholder: `Role (e.g. Super Admin / Lead)`,
                className: `w-full py-2 px-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500`
              })]
            })]
          }), (0, $.jsxs)(`div`, {
            className: `pt-2 flex items-center justify-end gap-3`,
            children: [(0, $.jsx)(`button`, {
              type: `button`,
              onClick: () => z(!1),
              className: `px-4 py-2 bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs cursor-pointer`,
              children: `Cancel`
            }), (0, $.jsx)(`button`, {
              type: `submit`,
              className: `px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer`,
              children: `Save Admin User`
            })]
          })]
        }), (0, $.jsx)(`div`, {
          className: `rounded-2xl border border-slate-800 bg-[#0f1422] overflow-hidden shadow-lg`,
          children: (0, $.jsxs)(`table`, {
            className: `w-full text-left text-xs`,
            children: [(0, $.jsx)(`thead`, {
              className: `bg-[#0b0e17] text-slate-400 uppercase tracking-wider text-[11px] font-bold border-b border-slate-800`,
              children: (0, $.jsxs)(`tr`, {
                children: [(0, $.jsx)(`th`, {
                  className: `py-3 px-4`,
                  children: `Username`
                }), (0, $.jsx)(`th`, {
                  className: `py-3 px-4`,
                  children: `Display Name`
                }), (0, $.jsx)(`th`, {
                  className: `py-3 px-4`,
                  children: `Role`
                }), (0, $.jsx)(`th`, {
                  className: `py-3 px-4 text-right`,
                  children: `Actions`
                })]
              })
            }), (0, $.jsx)(`tbody`, {
              className: `divide-y divide-slate-800 text-slate-200`,
              children: I.map(e => (0, $.jsxs)(`tr`, {
                className: `hover:bg-slate-800/40 transition-colors`,
                children: [(0, $.jsx)(`td`, {
                  className: `py-3 px-4 font-mono font-bold text-cyan-400`,
                  children: e.username
                }), (0, $.jsx)(`td`, {
                  className: `py-3 px-4 font-semibold text-white`,
                  children: e.display_name || e.username
                }), (0, $.jsx)(`td`, {
                  className: `py-3 px-4`,
                  children: (0, $.jsx)(`span`, {
                    className: `px-2 py-0.5 rounded text-[10px] font-bold bg-red-950 text-red-300 border border-red-800`,
                    children: e.role || `Admin`
                  })
                }), (0, $.jsx)(`td`, {
                  className: `py-3 px-4 text-right`,
                  children: (0, $.jsx)(`button`, {
                    onClick: () => Be(e.id, e.username),
                    className: `p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-rose-950/40 transition-colors cursor-pointer`,
                    title: `Delete Admin`,
                    children: (0, $.jsx)(Pe, {
                      className: `w-3.5 h-3.5`
                    })
                  })
                })]
              }, e.id))
            })]
          })
        })]
      }), a === `database` && (0, $.jsxs)(`div`, {
        className: `space-y-4`,
        children: [(0, $.jsxs)(`div`, {
          className: `flex flex-col md:flex-row items-center justify-between gap-4`,
          children: [(0, $.jsxs)(`div`, {
            children: [(0, $.jsxs)(`h2`, {
              className: `text-base font-bold text-white tracking-tight flex items-center gap-2`,
              children: [(0, $.jsx)(ne, {
                className: `w-4 h-4 text-cyan-400`
              }), (0, $.jsx)(`span`, {
                children: `Full Database Explorer`
              }), de && (0, $.jsx)(`span`, {
                title: `Quietly updating...`,
                children: (0, $.jsx)(ye, {
                  className: `w-3.5 h-3.5 animate-spin text-cyan-400`
                })
              })]
            }), (0, $.jsx)(`p`, {
              className: `text-xs text-slate-400`,
              children: `Direct live control over Supabase tables without page flickers or glitches`
            })]
          }), (0, $.jsxs)(`div`, {
            className: `flex items-center gap-3`,
            children: [(0, $.jsxs)(`select`, {
              value: oe,
              onChange: e => {
                let t = e.target.value;
                se(t), je(t, !0)
              },
              className: `py-1.5 px-3 rounded-xl border border-slate-700 bg-slate-900 text-xs font-mono font-bold text-cyan-400 focus:outline-none`,
              children: [(0, $.jsx)(`option`, {
                value: `employees`,
                children: `Table: employees`
              }), (0, $.jsx)(`option`, {
                value: `attendance_logs`,
                children: `Table: attendance_logs`
              }), (0, $.jsx)(`option`, {
                value: `team_schedules`,
                children: `Table: team_schedules`
              }), (0, $.jsx)(`option`, {
                value: `managers`,
                children: `Table: managers`
              }), (0, $.jsx)(`option`, {
                value: `admin_users`,
                children: `Table: admin_users`
              }), (0, $.jsx)(`option`, {
                value: `organization_security`,
                children: `Table: organization_security`
              })]
            }), (0, $.jsxs)(`div`, {
              className: `relative`,
              children: [(0, $.jsx)(Se, {
                className: `w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2`
              }), (0, $.jsx)(`input`, {
                type: `text`,
                value: J,
                onChange: e => le(e.target.value),
                placeholder: `Search rows...`,
                className: `py-1.5 pl-8 pr-3 rounded-xl border border-slate-700 bg-slate-900 text-xs text-white placeholder:text-slate-500 focus:outline-none`
              })]
            }), (0, $.jsxs)(`button`, {
              onClick: We,
              className: `px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer`,
              title: `Export raw JSON`,
              children: [(0, $.jsx)(ie, {
                className: `w-3.5 h-3.5`
              }), (0, $.jsx)(`span`, {
                children: `Export JSON`
              })]
            })]
          })]
        }), (0, $.jsx)(`div`, {
          className: `rounded-2xl border border-slate-800 bg-[#0f1422] overflow-x-auto shadow-lg min-h-[200px]`,
          children: X && q.length === 0 ? (0, $.jsxs)(`div`, {
            className: `py-16 text-center text-slate-400`,
            children: [(0, $.jsx)(ye, {
              className: `w-6 h-6 animate-spin mx-auto mb-2 text-cyan-400`
            }), (0, $.jsx)(`span`, {
              className: `text-xs`,
              children: `Connecting to Supabase table...`
            })]
          }) : Ke.length === 0 ? (0, $.jsxs)(`div`, {
            className: `py-12 text-center text-slate-400 text-xs`,
            children: [`No records returned for table "`, oe, `".`]
          }) : (0, $.jsxs)(`table`, {
            className: `w-full text-left text-xs border-collapse font-mono`,
            children: [(0, $.jsx)(`thead`, {
              className: `bg-[#0b0e17] text-slate-400 uppercase tracking-wider text-[10px] font-bold border-b border-slate-800`,
              children: (0, $.jsxs)(`tr`, {
                children: [(0, $.jsx)(`th`, {
                  className: `py-3 px-3 w-16 text-center`,
                  children: `ACTION`
                }), Object.keys(Ke[0]).map(e => (0, $.jsx)(`th`, {
                  className: `py-3 px-3 border-r border-slate-800 whitespace-nowrap`,
                  children: e
                }, e))]
              })
            }), (0, $.jsx)(`tbody`, {
              className: `divide-y divide-slate-800 text-slate-300`,
              children: Ke.slice(0, 100).map((e, t) => (0, $.jsxs)(`tr`, {
                className: `hover:bg-slate-800/50 transition-colors`,
                children: [(0, $.jsx)(`td`, {
                  className: `py-2 px-3 text-center`,
                  children: (0, $.jsx)(`button`, {
                    onClick: () => Ue(e),
                    className: `p-1 text-slate-500 hover:text-rose-400 rounded hover:bg-rose-950/40 cursor-pointer`,
                    title: `Delete Row`,
                    children: (0, $.jsx)(Pe, {
                      className: `w-3.5 h-3.5`
                    })
                  })
                }), Object.keys(Ke[0]).map(t => {
                  let n = e[t],
                    r = typeof n == `object` && n ? JSON.stringify(n) : String(n ?? ``);
                  return (0, $.jsx)(`td`, {
                    className: `py-2 px-3 border-r border-slate-800/60 max-w-xs truncate text-[11px]`,
                    children: r
                  }, t)
                })]
              }, t))
            })]
          })
        })]
      }), a === `security` && (0, $.jsxs)(`div`, {
        className: `max-w-2xl mx-auto space-y-6`,
        children: [(0, $.jsxs)(`div`, {
          children: [(0, $.jsxs)(`h2`, {
            className: `text-base font-bold text-white tracking-tight flex items-center gap-2`,
            children: [(0, $.jsx)(Y, {
              className: `w-5 h-5 text-cyan-400`
            }), (0, $.jsx)(`span`, {
              children: `Security Configuration & Passkeys`
            })]
          }), (0, $.jsx)(`p`, {
            className: `text-xs text-slate-400`,
            children: `Manage organization passkeys required for personnel onboarding and signouts`
          })]
        }), ve && (0, $.jsxs)(`div`, {
          className: `p-3 bg-cyan-950/80 border border-cyan-500 rounded-xl flex items-center gap-2 text-xs font-bold text-cyan-300 animate-fadeIn`,
          children: [(0, $.jsx)(H, {
            className: `w-4 h-4 text-cyan-400 shrink-0`
          }), (0, $.jsx)(`span`, {
            children: ve
          })]
        }), (0, $.jsxs)(`div`, {
          className: `p-6 bg-[#0f1422] border border-slate-800 rounded-2xl space-y-5`,
          children: [(0, $.jsxs)(`div`, {
            className: `flex items-center justify-between pb-4 border-b border-slate-800`,
            children: [(0, $.jsxs)(`div`, {
              children: [(0, $.jsx)(`span`, {
                className: `text-xs font-semibold text-slate-300 block`,
                children: `Current Active Passkey`
              }), (0, $.jsx)(`span`, {
                className: `text-xs text-slate-500`,
                children: `Required for employee registration and signout`
              })]
            }), (0, $.jsx)(`span`, {
              className: `px-3 py-1.5 rounded-xl bg-cyan-950/70 border border-cyan-800 font-mono text-cyan-300 font-bold text-sm tracking-wider`,
              children: pe || `7CORE2026`
            })]
          }), (0, $.jsxs)(`form`, {
            onSubmit: He,
            className: `space-y-4`,
            children: [(0, $.jsxs)(`div`, {
              className: `space-y-1.5`,
              children: [(0, $.jsx)(`label`, {
                className: `text-xs font-semibold text-slate-300`,
                children: `Set New Passkey`
              }), (0, $.jsx)(`input`, {
                type: `text`,
                required: !0,
                value: he,
                onChange: e => _e(e.target.value.toUpperCase()),
                placeholder: `e.g. 7CORE2026`,
                className: `w-full py-2.5 px-3.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 uppercase tracking-wider`
              })]
            }), (0, $.jsx)(`button`, {
              type: `submit`,
              className: `px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer transition-colors`,
              children: `Update Passkey in Supabase`
            })]
          })]
        })]
      })]
    })]
  })
}, ul = ({
  user: e,
  onAvatarClick: t,
  selectedDate: n = new Date,
  activeTab: r = `checkin`
}) => {
  let i = r === `checkin` ? `/logo.png` : `/logo2.png`,
    a = n.toLocaleDateString(`en-US`, {
      timeZone: `Asia/Tashkent`,
      month: `long`,
      day: `numeric`,
      year: `numeric`
    });
  return (0, $.jsxs)(`header`, {
    className: `w-full pt-4 pb-1 px-1`,
    children: [(0, $.jsxs)(`div`, {
      className: `flex items-center justify-between`,
      children: [(0, $.jsx)(`div`, {
        className: `flex items-center`,
        children: (0, $.jsx)(`img`, {
          src: i,
          alt: `SEVENCORE`,
          className: `h-8 sm:h-9 w-auto max-w-[200px] sm:max-w-[230px] object-contain select-none`
        })
      }), (0, $.jsxs)(`button`, {
        type: `button`,
        onClick: t,
        className: `relative focus:outline-none active:scale-95 transition-transform`,
        title: `View Profile`,
        "aria-label": `User Profile`,
        children: [(0, $.jsx)(`div`, {
          className: `w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-md bg-slate-900 flex items-center justify-center`,
          children: e.photo_url ? (0, $.jsx)(`img`, {
            src: e.photo_url,
            alt: e.first_name || `User`,
            className: `w-full h-full object-cover`,
            referrerPolicy: `no-referrer`,
            onError: e => {
              e.target.style.display = `none`
            }
          }) : (0, $.jsx)(`div`, {
            className: `w-full h-full bg-gradient-to-br from-slate-800 to-black flex items-center justify-center text-white font-bold text-base`,
            children: e.first_name ? e.first_name[0].toUpperCase() : `7`
          })
        }), (0, $.jsx)(`span`, {
          className: `absolute bottom-0 right-0 w-3 h-3 bg-[#22C55E] border-2 border-[#121620] rounded-full`
        })]
      })]
    }), (0, $.jsxs)(`div`, {
      className: `flex items-center justify-center gap-2.5 my-3.5 select-none`,
      children: [(0, $.jsxs)(`div`, {
        className: `flex items-center gap-1.5 opacity-70`,
        children: [(0, $.jsx)(`span`, {
          className: `w-1.5 h-1.5 rounded-full bg-slate-500`
        }), (0, $.jsx)(`span`, {
          className: `h-[1px] w-12 sm:w-20 border-t border-dotted border-slate-500`
        }), (0, $.jsx)(`span`, {
          className: `w-1.5 h-1.5 rounded-full bg-slate-500`
        })]
      }), (0, $.jsx)(`span`, {
        className: `text-slate-300 font-medium tracking-wide text-xs sm:text-sm px-1`,
        children: a
      }), (0, $.jsxs)(`div`, {
        className: `flex items-center gap-1.5 opacity-70`,
        children: [(0, $.jsx)(`span`, {
          className: `w-1.5 h-1.5 rounded-full bg-slate-500`
        }), (0, $.jsx)(`span`, {
          className: `h-[1px] w-12 sm:w-20 border-t border-dotted border-slate-500`
        }), (0, $.jsx)(`span`, {
          className: `w-1.5 h-1.5 rounded-full bg-slate-500`
        })]
      })]
    })]
  })
}, dl = ({
  metrics: e
}) => {
  let t = e.isCheckedIn,
    n = e.totalHoursFormatted || `00:00`;
  if (!n.includes(`:`)) {
    let e = parseFloat(n) || 0,
      t = Math.floor(e),
      r = Math.round((e - t) * 60);
    n = `${String(t).padStart(2,`0`)}:${String(r).padStart(2,`0`)}`
  }
  return (0, $.jsxs)(`div`, {
    className: `grid grid-cols-3 gap-2.5 w-full my-3`,
    children: [(0, $.jsxs)(`div`, {
      className: `rounded-[22px] bg-[#121620] border border-red-500/30 p-3 flex flex-col items-center justify-between text-center min-h-[148px] shadow-[0_4px_20px_rgba(0,0,0,0.4)]`,
      children: [(0, $.jsx)(`div`, {
        className: `w-7 h-7 flex items-center justify-center text-[#EF4444] mt-0.5`,
        children: (0, $.jsx)(I, {
          className: `w-5 h-5 stroke-[2.8]`
        })
      }), (0, $.jsxs)(`div`, {
        className: `text-[#94A3B8] text-[11px] leading-tight text-center font-medium`,
        children: [(0, $.jsx)(`div`, {
          children: `My Checked In`
        }), (0, $.jsx)(`div`, {
          children: `Status`
        })]
      }), (0, $.jsx)(`div`, {
        className: `text-white text-[16px] sm:text-[17px] font-bold leading-tight`,
        children: t ? (0, $.jsxs)($.Fragment, {
          children: [(0, $.jsx)(`div`, {
            children: `Checked`
          }), (0, $.jsx)(`div`, {
            children: `In`
          })]
        }) : (0, $.jsxs)($.Fragment, {
          children: [(0, $.jsx)(`div`, {
            children: `Checked`
          }), (0, $.jsx)(`div`, {
            children: `Out`
          })]
        })
      }), (0, $.jsxs)(`div`, {
        className: `flex items-center justify-center gap-1.5 text-[11px] font-medium mb-0.5`,
        children: [(0, $.jsx)(`span`, {
          className: `w-1.5 h-1.5 rounded-full ${t?`bg-[#22C55E]`:`bg-slate-400`}`
        }), (0, $.jsx)(`span`, {
          className: t ? `text-emerald-400` : `text-[#94A3B8]`,
          children: t ? `Active` : `Inactive`
        })]
      })]
    }), (0, $.jsxs)(`div`, {
      className: `rounded-[22px] bg-[#121620] border border-slate-800 p-3 flex flex-col items-center justify-between text-center min-h-[148px] shadow-[0_4px_20px_rgba(0,0,0,0.4)]`,
      children: [(0, $.jsx)(`div`, {
        className: `w-7 h-7 rounded-full bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-200 mt-0.5`,
        children: (0, $.jsx)(Ve, {
          className: `w-3.5 h-3.5 stroke-[2.2]`
        })
      }), (0, $.jsx)(`div`, {
        className: `text-[#94A3B8] text-[11px] leading-tight text-center font-medium`,
        children: `My Present Today`
      }), (0, $.jsx)(`div`, {
        className: `text-[#EF4444] text-[28px] font-black leading-none my-0.5`,
        children: e.presentToday || 0
      }), (0, $.jsxs)(`div`, {
        className: `text-[#94A3B8] text-[12px] font-medium mb-0.5`,
        children: [`of `, e.totalPresentUnits || 1]
      })]
    }), (0, $.jsxs)(`div`, {
      className: `rounded-[22px] bg-[#121620] border border-red-500/30 p-3 flex flex-col items-center justify-between text-center min-h-[148px] shadow-[0_4px_20px_rgba(0,0,0,0.4)]`,
      children: [(0, $.jsx)(`div`, {
        className: `w-7 h-7 flex items-center justify-center text-[#EF4444] mt-0.5`,
        children: (0, $.jsx)(U, {
          className: `w-5 h-5 stroke-[2.2]`
        })
      }), (0, $.jsxs)(`div`, {
        className: `text-[#94A3B8] text-[11px] leading-tight text-center font-medium`,
        children: [(0, $.jsx)(`div`, {
          children: `My Total Hours`
        }), (0, $.jsx)(`div`, {
          children: `Today`
        })]
      }), (0, $.jsx)(`div`, {
        className: `text-[#EF4444] text-[22px] sm:text-[23px] font-black tracking-wide leading-none my-0.5 font-mono`,
        children: n
      }), (0, $.jsx)(`div`, {
        className: `text-[#94A3B8] text-[12px] font-medium mb-0.5`,
        children: `Hours`
      })]
    })]
  })
}, fl = s({
  getTelegramLocationManager: () => yl,
  getTelegramUser: () => gl,
  getTelegramWebApp: () => pl,
  initTelegramApp: () => hl,
  isTelegramEnvironment: () => ml,
  openTelegramLocationSettings: () => bl,
  requestTelegramLocation: () => xl,
  saveActiveUser: () => _l,
  triggerHaptic: () => vl
}), pl = () => typeof window < `u` && window.Telegram?.WebApp ? window.Telegram.WebApp : null, ml = () => {
  let e = pl();
  return !!(e && e.initData && e.initData.length > 0)
}, hl = () => {
  let e = pl();
  if (e) try {
    e.ready(), e.expand(), e.headerColor &&= `#F8F9FD`, e.backgroundColor &&= `#F8F9FD`
  } catch (e) {
    console.warn(`Telegram WebApp init warning:`, e)
  }
}, gl = () => {
  let e = pl();
  if (e?.initDataUnsafe?.user?.id) {
    let t = e.initDataUnsafe.user;
    try {
      let e = localStorage.getItem(`7core_user_${t.id}`);
      if (e) return {
        ...t,
        ...JSON.parse(e)
      }
    } catch {}
    return t
  }
  try {
    let e = localStorage.getItem(`7core_active_user`);
    if (e) return JSON.parse(e)
  } catch {}
  let t = 1e8;
  try {
    let e = localStorage.getItem(`7core_fallback_id`);
    e ? t = parseInt(e, 10) : (t = Math.floor(1e8 + Math.random() * 9e8), localStorage.setItem(`7core_fallback_id`, String(t)))
  } catch {}
  return {
    id: t,
    first_name: ``,
    last_name: ``,
    username: ``,
    department: null
  }
}, _l = e => {
  try {
    localStorage.setItem(`7core_user_${e.id}`, JSON.stringify(e)), localStorage.setItem(`7core_active_user`, JSON.stringify(e))
  } catch (e) {
    console.error(`Failed to save active user:`, e)
  }
}, vl = (e = `medium`) => {
  let t = pl();
  if (t?.HapticFeedback && (typeof t.isVersionAtLeast != `function` || t.isVersionAtLeast(`6.1`))) try {
    e === `success` || e === `warning` || e === `error` ? t.HapticFeedback.notificationOccurred(e) : t.HapticFeedback.impactOccurred(e)
  } catch {}
}, yl = () => {
  let e = pl();
  return !e?.LocationManager || typeof e.isVersionAtLeast == `function` && !e.isVersionAtLeast(`8.0`) ? null : e.LocationManager
}, bl = () => {
  let e = yl();
  if (e?.openSettings) try {
    e.openSettings()
  } catch (e) {
    console.warn(`Could not open Telegram location settings:`, e)
  }
}, xl = (e = 2500) => new Promise((t, n) => {
  let r = yl();
  if (!r) return n(Error(`Telegram LocationManager not available`));
  let i = !1,
    a = setTimeout(() => {
      i || (i = !0, n(Error(`Telegram LocationManager timed out`)))
    }, e),
    o = e => {
      i || (i = !0, clearTimeout(a), t(e))
    },
    s = e => {
      i || (i = !0, clearTimeout(a), n(e))
    },
    c = () => {
      try {
        r.getLocation(e => {
          e && typeof e.latitude == `number` && typeof e.longitude == `number` ? o({
            latitude: e.latitude,
            longitude: e.longitude,
            accuracy: Math.round(e.horizontal_accuracy || 20)
          }) : r.isAccessRequested && !r.isAccessGranted ? s(Error(`Location permission denied in Telegram. Please allow access in Telegram settings.`)) : s(Error(`Telegram could not retrieve location. Please check your device GPS.`))
        })
      } catch (e) {
        s(Error(e?.message || `Failed to call Telegram getLocation`))
      }
    };
  if (r.isInited) c();
  else try {
    r.init(() => {
      c()
    })
  } catch {
    c()
  }
}), Sl = ({
  metrics: e,
  onTriggerVerification: t,
  employee: n
}) => {
  let r = e.isCheckedIn,
    i = () => {
      if (vl(`medium`), !r && !a.isShiftAssigned) {
        vl(`warning`);
        return
      }
      t(r ? `check_out` : `check_in`)
    },
    a = (0, T.useMemo)(() => {
      let e = new Date,
        [t, i] = e.toLocaleTimeString(`en-GB`, {
          timeZone: `Asia/Tashkent`,
          hour12: !1
        }).split(`:`).map(Number),
        a = t * 60 + i,
        o = n;
      if (!o) try {
        let e = localStorage.getItem(`7core_active_user`),
          t = e ? JSON.parse(e) : null;
        if (t?.id) {
          let e = localStorage.getItem(`7core_employee_${t.id}`);
          if (e && (o = JSON.parse(e)), !o) {
            let e = localStorage.getItem(`7core_employees`);
            if (e) {
              let n = JSON.parse(e);
              n[t.id] && (o = n[t.id])
            }
          }
        }
      } catch {}
      if (!hs(o)) return r ? {
        pillText: `ON DUTY`,
        pillClass: `border-emerald-500/50 bg-emerald-950/60 text-emerald-300`,
        dotClass: `bg-emerald-400 animate-pulse`,
        isTodayWorkDay: !0,
        isShiftAssigned: !1
      } : {
        pillText: `SHIFT UNASSIGNED`,
        pillClass: `border-amber-500/50 bg-amber-950/60 text-amber-300`,
        dotClass: `bg-amber-400`,
        isTodayWorkDay: !1,
        isShiftAssigned: !1
      };
      let s = o.shift_start_time,
        c = o.shift_end_time,
        l = ms(o.shift_days),
        u = e.toLocaleDateString(`en-US`, {
          timeZone: `Asia/Tashkent`,
          weekday: `long`
        }).toLowerCase(),
        d = e.toLocaleDateString(`en-US`, {
          weekday: `long`
        }).toLowerCase(),
        [f, p] = s.split(`:`).map(Number),
        [m, h] = c.split(`:`).map(Number),
        g = f * 60 + p,
        _ = m * 60 + h,
        v = g > _,
        y = l.includes(u) || l.includes(d);
      if (v && a < _) {
        let t = new Date(e.getTime() - 864e5),
          n = t.toLocaleDateString(`en-US`, {
            timeZone: `Asia/Tashkent`,
            weekday: `long`
          }).toLowerCase(),
          r = t.toLocaleDateString(`en-US`, {
            weekday: `long`
          }).toLowerCase();
        (l.includes(n) || l.includes(r)) && (y = !0)
      }
      if (r) return {
        pillText: `ON DUTY • ENDS AT ${c}`,
        pillClass: `border-emerald-500/50 bg-emerald-950/60 text-emerald-300`,
        dotClass: `bg-emerald-400 animate-pulse`,
        isTodayWorkDay: !0,
        isShiftAssigned: !0
      };
      if (!y) return {
        pillText: `DAY OFF`,
        pillClass: `border-slate-700 bg-[#0E121A] text-slate-400`,
        dotClass: `bg-slate-500`,
        isTodayWorkDay: !1,
        isShiftAssigned: !0
      };
      let b = g - a;
      if (b <= 45 && b > 0) return {
        pillText: `CHECK-IN READY • IN ${b}M (${s} UZT)`,
        pillClass: `border-[#EF4444] bg-red-950/70 text-red-300 animate-pulse`,
        dotClass: `bg-[#EF4444]`,
        isTodayWorkDay: !0,
        isShiftAssigned: !0
      };
      if (b > 45) {
        let e = Math.floor(b / 60),
          t = b % 60;
        return {
          pillText: `CHECK-IN IN ${e>0?`${e}h ${t>0?`${t}m`:``}`.trim():`${t}m`} (${s} UZT)`,
          pillClass: `border-red-500/30 bg-[#0E121A] text-slate-300`,
          dotClass: `bg-red-400`,
          isTodayWorkDay: !0,
          isShiftAssigned: !0
        }
      }
      let x = Math.abs(b),
        S = Math.floor(x / 60),
        C = x % 60;
      return {
        pillText: `SHIFT STARTED ${S>0?`${S}h ${C}m`:`${C}m`} AGO (${s} UZT)`,
        pillClass: `border-amber-500/50 bg-amber-950/60 text-amber-300 animate-pulse`,
        dotClass: `bg-amber-400`,
        isTodayWorkDay: !0,
        isShiftAssigned: !0
      }
    }, [n, r]),
    o = r ? `CHECK OUT` : `CHECK IN`,
    s = r ? `Tap to verify your selfie, end shift, and submit attendance.` : a.isShiftAssigned ? !a.isTodayWorkDay && a.isShiftAssigned ? `Today is your scheduled day off. No check-in required.` : `Tap to verify your selfie, check 100m geofence, and start your shift.` : `Shift Unassigned. Awaiting manager shift schedule.`;
  return (0, $.jsx)(`div`, {
    className: `w-full my-3 relative select-none`,
    children: (0, $.jsxs)(`div`, {
      className: `w-full bg-[#131722] border border-red-500/40 rounded-[26px] p-5 sm:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.5)] relative overflow-hidden`,
      children: [(0, $.jsx)(`div`, {
        className: `absolute top-4 right-4 grid grid-cols-5 gap-1.5 opacity-60 pointer-events-none`,
        children: Array.from({
          length: 15
        }).map((e, t) => (0, $.jsx)(`span`, {
          className: `w-1.5 h-1.5 rounded-full bg-[#EF4444]`
        }, t))
      }), (0, $.jsx)(`div`, {
        className: `absolute bottom-3 left-4 grid grid-cols-4 gap-1.5 opacity-40 pointer-events-none`,
        children: Array.from({
          length: 12
        }).map((e, t) => (0, $.jsx)(`span`, {
          className: `w-1.5 h-1.5 rounded-full bg-[#EF4444]`
        }, t))
      }), (0, $.jsxs)(`div`, {
        className: `flex items-center gap-5 sm:gap-6 relative z-10`,
        children: [(0, $.jsx)(`div`, {
          className: `relative shrink-0 flex items-center justify-center`,
          children: (0, $.jsx)(`div`, {
            className: `w-28 h-28 rounded-full border border-red-500/25 flex items-center justify-center bg-red-950/20`,
            children: (0, $.jsx)(`div`, {
              className: `w-[92px] h-[92px] rounded-full border-2 border-red-500/50 flex items-center justify-center`,
              children: (0, $.jsx)(`button`, {
                type: `button`,
                id: `primary-checkin-button`,
                onClick: i,
                className: `w-[74px] h-[74px] rounded-full bg-gradient-to-b from-[#1C202E] to-[#0D1017] border-2 border-[#EF4444] shadow-[0_0_24px_rgba(239,68,68,0.45)] flex items-center justify-center active:scale-90 transition-transform focus:outline-none cursor-pointer`,
                "aria-label": o,
                children: r ? (0, $.jsx)(ue, {
                  className: `w-7 h-7 text-[#EF4444] stroke-[2.5]`
                }) : (0, $.jsx)(I, {
                  className: `w-8 h-8 text-[#EF4444] stroke-[3]`
                })
              })
            })
          })
        }), (0, $.jsxs)(`div`, {
          className: `flex-1 text-left min-w-0`,
          children: [(0, $.jsx)(`div`, {
            className: `mb-1.5`,
            children: (0, $.jsxs)(`span`, {
              className: `inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold border ${a.pillClass}`,
              children: [(0, $.jsx)(`span`, {
                className: `w-1.5 h-1.5 rounded-full ${a.dotClass}`
              }), (0, $.jsx)(`span`, {
                className: `truncate`,
                children: a.pillText
              })]
            })
          }), (0, $.jsx)(`span`, {
            className: `text-[#EF4444] text-[11px] sm:text-xs font-black tracking-widest uppercase block mb-0.5`,
            children: `TAP TO`
          }), (0, $.jsx)(`h2`, {
            className: `text-white text-[28px] sm:text-[32px] font-black tracking-tight leading-none mb-1.5`,
            children: o
          }), (0, $.jsx)(`p`, {
            className: `text-[#94A3B8] text-xs sm:text-[13px] leading-relaxed max-w-[230px]`,
            children: s
          })]
        })]
      })]
    })
  })
}, Cl = ({
  logs: e,
  selectedDate: t = new Date
}) => {
  let [n, r] = (0, T.useState)(null), i = t.toLocaleDateString(`en-US`, {
    timeZone: `Asia/Tashkent`,
    month: `short`,
    day: `numeric`,
    year: `numeric`
  }), a = e => {
    switch (e) {
      case `check_in`:
        return {
          label: `Check In`, dotColor: `bg-[#22C55E]`, textColor: `text-emerald-400`
        };
      case `check_out`:
        return {
          label: `Check Out`, dotColor: `bg-[#EF4444]`, textColor: `text-red-400`
        }
    }
  }, o = e => {
    try {
      return new Date(e).toLocaleTimeString(`en-US`, {
        timeZone: `Asia/Tashkent`,
        hour: `numeric`,
        minute: `2-digit`,
        hour12: !0
      })
    } catch {
      return e
    }
  }, s = e => {
    try {
      return new Date(e).toLocaleDateString(`en-US`, {
        timeZone: `Asia/Tashkent`,
        month: `short`,
        day: `numeric`
      })
    } catch {
      return i
    }
  };
  return (0, $.jsxs)(`div`, {
    className: `w-full mt-3 mb-6 select-none`,
    children: [n && (0, $.jsx)(`div`, {
      className: `fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4`,
      onClick: () => r(null),
      children: (0, $.jsxs)(`div`, {
        className: `relative bg-[#131722] border border-slate-700 rounded-3xl p-4 max-w-[320px] shadow-2xl text-white`,
        onClick: e => e.stopPropagation(),
        children: [(0, $.jsxs)(`div`, {
          className: `flex items-center justify-between pb-3 border-b border-slate-800`,
          children: [(0, $.jsxs)(`div`, {
            className: `flex items-center gap-1.5 text-xs font-bold text-slate-300`,
            children: [(0, $.jsx)(Ee, {
              className: `w-4 h-4 text-emerald-400`
            }), (0, $.jsx)(`span`, {
              children: `Verified Biometric Selfie`
            })]
          }), (0, $.jsx)(`button`, {
            type: `button`,
            onClick: () => r(null),
            className: `w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors`,
            children: (0, $.jsx)(He, {
              className: `w-4 h-4`
            })
          })]
        }), (0, $.jsx)(`div`, {
          className: `w-[280px] h-[280px] rounded-2xl overflow-hidden bg-black mt-3`,
          children: (0, $.jsx)(`img`, {
            src: n,
            alt: `Verification Selfie`,
            className: `w-full h-full object-cover`
          })
        }), (0, $.jsx)(`p`, {
          className: `mt-3 text-center text-[11px] font-semibold text-slate-400`,
          children: `Captured via device camera at attendance gate`
        })]
      })
    }), (0, $.jsxs)(`div`, {
      className: `flex items-center justify-between mb-3 px-1`,
      children: [(0, $.jsxs)(`div`, {
        className: `flex items-center gap-2.5`,
        children: [(0, $.jsx)(`div`, {
          className: `w-7 h-7 rounded-full bg-red-950/40 border border-red-500/40 flex items-center justify-center text-[#EF4444]`,
          children: (0, $.jsx)(U, {
            className: `w-4 h-4 stroke-[2.4]`
          })
        }), (0, $.jsx)(`h3`, {
          className: `text-[17px] font-bold text-white tracking-tight`,
          children: `Today's Personal Log`
        })]
      }), (0, $.jsxs)(`div`, {
        className: `bg-[#7F1D1D]/40 border border-red-500/50 text-white px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 shadow-sm`,
        children: [(0, $.jsx)(P, {
          className: `w-3.5 h-3.5 text-white`
        }), (0, $.jsx)(`span`, {
          children: i
        })]
      })]
    }), (0, $.jsxs)(`div`, {
      className: `bg-[#121620] border border-slate-800 rounded-[22px] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.4)]`,
      children: [(0, $.jsxs)(`div`, {
        className: `grid grid-cols-4 text-center pb-3 text-[11px] font-bold text-[#64748B] tracking-wider uppercase border-b border-slate-800/80`,
        children: [(0, $.jsx)(`div`, {
          children: `DATE`
        }), (0, $.jsx)(`div`, {
          children: `ACTION`
        }), (0, $.jsx)(`div`, {
          children: `TIME`
        }), (0, $.jsx)(`div`, {
          children: `DURATION`
        })]
      }), e.length === 0 ? (0, $.jsxs)(`div`, {
        className: `py-7 text-center text-[#94A3B8] text-xs leading-relaxed max-w-[280px] mx-auto`,
        children: [(0, $.jsx)(`p`, {
          className: `font-medium text-slate-300 mb-1.5`,
          children: `No attendance activity recorded yet today.`
        }), (0, $.jsx)(`p`, {
          className: `text-[#64748B] text-[11.5px]`,
          children: `Tap the big check-in button above to verify selfie & start your shift.`
        })]
      }) : (0, $.jsx)(`div`, {
        className: `flex flex-col gap-2 mt-3`,
        children: e.map(e => {
          let t = a(e.action_type);
          return (0, $.jsxs)(`div`, {
            className: `grid grid-cols-4 items-center text-center py-2.5 px-1 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs font-medium`,
            children: [(0, $.jsx)(`div`, {
              className: `text-slate-300 font-medium text-[11px]`,
              children: s(e.timestamp)
            }), (0, $.jsxs)(`div`, {
              className: `flex items-center justify-center gap-1.5`,
              children: [(0, $.jsx)(`span`, {
                className: `w-1.5 h-1.5 rounded-full ${t.dotColor}`
              }), (0, $.jsx)(`span`, {
                className: `font-semibold ${t.textColor} text-[11px]`,
                children: t.label
              }), e.photo_url && (0, $.jsx)(`button`, {
                type: `button`,
                onClick: () => r(e.photo_url || null),
                className: `w-4 h-4 rounded overflow-hidden shrink-0 border border-slate-700 hover:scale-110 transition-transform cursor-pointer`,
                title: `View verified selfie`,
                children: (0, $.jsx)(`img`, {
                  src: e.photo_url,
                  alt: `Selfie`,
                  className: `w-full h-full object-cover`
                })
              })]
            }), (0, $.jsxs)(`div`, {
              className: `text-slate-300 font-medium text-[11px]`,
              children: [(0, $.jsx)(`div`, {
                children: o(e.timestamp)
              }), e.distance_meters !== null && e.distance_meters !== void 0 && (0, $.jsxs)(`div`, {
                className: `text-[9.5px] text-emerald-400 font-semibold flex items-center justify-center gap-0.5 mt-0.5`,
                children: [(0, $.jsx)(de, {
                  className: `w-2.5 h-2.5`
                }), (0, $.jsxs)(`span`, {
                  children: [e.distance_meters, `m`]
                })]
              })]
            }), (0, $.jsx)(`div`, {
              className: `text-slate-300 font-medium text-[11px] font-mono`,
              children: e.durationFormatted || `-`
            })]
          }, e.id)
        })
      })]
    })]
  })
}, wl = ({
  activeTab: e,
  onSelectTab: t
}) => {
  let n = [{
      id: `checkin`,
      label: `Check-In`,
      icon: ce
    }, {
      id: `mylog`,
      label: `My Log`,
      icon: oe
    }, {
      id: `calendar`,
      label: `Calendar`,
      icon: P
    }, {
      id: `profile`,
      label: `Profile`,
      icon: Be
    }],
    r = n => {
      n !== e && (vl(`light`), t(n))
    };
  return (0, $.jsx)(`nav`, {
    className: `fixed bottom-3 left-0 right-0 max-w-[430px] mx-auto px-3 z-40 pointer-events-none select-none`,
    children: (0, $.jsx)(`div`, {
      className: `bg-[#0E121A]/95 backdrop-blur-lg border border-red-500/30 rounded-[28px] py-2 px-2 shadow-[0_8px_32px_rgba(0,0,0,0.8)] flex items-center justify-around pointer-events-auto`,
      children: n.map(t => {
        let n = e === t.id,
          i = t.icon;
        return (0, $.jsxs)(`button`, {
          id: `nav-tab-${t.id}`,
          onClick: () => r(t.id),
          className: `flex-1 py-1.5 flex flex-col items-center justify-center transition-all cursor-pointer active:scale-95`,
          children: [(0, $.jsx)(i, {
            className: `w-5 h-5 mb-1 transition-colors ${n?`text-[#EF4444] stroke-[2.4]`:`text-[#64748B] stroke-[2]`}`
          }), (0, $.jsx)(`span`, {
            className: `text-[11.5px] leading-none transition-colors ${n?`text-[#EF4444] font-bold`:`text-[#64748B] font-medium`}`,
            children: t.label
          })]
        }, t.id)
      })
    })
  })
}, Tl = ({
  user: e
}) => {
  let [t, n] = (0, T.useState)(new Date), [r, i] = (0, T.useState)(new Date().getDate()), [a, o] = (0, T.useState)([]), s = t.getFullYear(), c = t.getMonth();
  (0, T.useEffect)(() => {
    (async () => {
      try {
        let t = await ws(e.id, s, c);
        o(t)
      } catch (e) {
        console.error(e)
      }
    })()
  }, [e.id, s, c]);
  let l = new Date(s, c + 1, 0).getDate(),
    u = new Date(s, c, 1).getDay(),
    d = () => {
      n(new Date(s, c - 1, 1)), i(1)
    },
    f = () => {
      n(new Date(s, c + 1, 1)), i(1)
    },
    p = t.toLocaleString(`en-US`, {
      month: `long`
    }),
    m = {};
  a.forEach(e => {
    let t = new Intl.DateTimeFormat(`en-CA`, {
        timeZone: `Asia/Tashkent`
      }).format(new Date(e.timestamp)).split(`-`).map(Number),
      n = t[0],
      r = t[1] - 1,
      i = t[2];
    n === s && r === c && (m[i] || (m[i] = []), m[i].push(e))
  });
  let h = e => {
      if (!e || e.length === 0) return 0;
      let t = [...e].sort((e, t) => new Date(e.timestamp).getTime() - new Date(t.timestamp).getTime()),
        n = 0,
        r = null;
      for (let e of t) {
        let t = new Date(e.timestamp).getTime();
        e.action_type === `check_in` ? r = t : e.action_type === `check_out` && r !== null && (n += Math.min(t - r, 36e6), r = null)
      }
      return Math.floor(n / 6e4)
    },
    g = m[r] || [],
    _ = h(g),
    v = Object.keys(m).length,
    y = 0;
  Object.values(m).forEach(e => {
    y += h(e)
  });
  let b = vs(y);
  return (0, $.jsxs)(`div`, {
    className: `w-full pb-20 pt-1 select-none`,
    children: [(0, $.jsxs)(`div`, {
      className: `grid grid-cols-2 gap-3 mb-3.5`,
      children: [(0, $.jsxs)(`div`, {
        className: `bg-[#131722] border border-red-500/40 rounded-[20px] p-4 flex items-center gap-3.5 shadow-md`,
        children: [(0, $.jsx)(`div`, {
          className: `text-[#EF4444] shrink-0`,
          children: (0, $.jsx)(M, {
            className: `w-7 h-7 stroke-[2.2]`
          })
        }), (0, $.jsxs)(`div`, {
          children: [(0, $.jsx)(`span`, {
            className: `text-[#94A3B8] text-xs font-medium block leading-tight`,
            children: `Days Worked`
          }), (0, $.jsxs)(`span`, {
            className: `text-white text-[22px] font-black leading-tight mt-0.5 block`,
            children: [v, ` days`]
          })]
        })]
      }), (0, $.jsxs)(`div`, {
        className: `bg-[#131722] border border-red-500/40 rounded-[20px] p-4 flex items-center gap-3.5 shadow-md`,
        children: [(0, $.jsx)(`div`, {
          className: `text-[#EF4444] shrink-0`,
          children: (0, $.jsx)(U, {
            className: `w-7 h-7 stroke-[2.2]`
          })
        }), (0, $.jsxs)(`div`, {
          children: [(0, $.jsx)(`span`, {
            className: `text-[#94A3B8] text-xs font-medium block leading-tight`,
            children: `Total Hours`
          }), (0, $.jsx)(`span`, {
            className: `text-[#EF4444] text-[22px] font-black leading-tight mt-0.5 block`,
            children: b === `-` ? `0h` : b
          })]
        })]
      })]
    }), (0, $.jsxs)(`div`, {
      className: `bg-[#131722] border border-slate-800 rounded-[24px] p-4 sm:p-5 shadow-lg`,
      children: [(0, $.jsxs)(`div`, {
        className: `flex items-center justify-between mb-3 px-1`,
        children: [(0, $.jsxs)(`h3`, {
          className: `text-white text-[18px] font-bold flex items-center gap-2`,
          children: [(0, $.jsx)(P, {
            className: `w-5 h-5 text-[#EF4444]`
          }), (0, $.jsxs)(`span`, {
            children: [p, ` `, s]
          })]
        }), (0, $.jsxs)(`div`, {
          className: `flex items-center gap-1.5`,
          children: [(0, $.jsx)(`button`, {
            onClick: d,
            className: `w-8 h-8 rounded-full bg-[#1C202C] hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer`,
            "aria-label": `Previous month`,
            children: (0, $.jsx)(R, {
              className: `w-4 h-4`
            })
          }), (0, $.jsx)(`button`, {
            onClick: f,
            className: `w-8 h-8 rounded-full bg-[#1C202C] hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer`,
            "aria-label": `Next month`,
            children: (0, $.jsx)(z, {
              className: `w-4 h-4`
            })
          })]
        })]
      }), (0, $.jsxs)(`div`, {
        className: `grid grid-cols-7 text-center text-xs font-bold text-[#64748B] uppercase mb-2`,
        children: [(0, $.jsx)(`span`, {
          children: `SU`
        }), (0, $.jsx)(`span`, {
          children: `MO`
        }), (0, $.jsx)(`span`, {
          children: `TU`
        }), (0, $.jsx)(`span`, {
          children: `WE`
        }), (0, $.jsx)(`span`, {
          children: `TH`
        }), (0, $.jsx)(`span`, {
          children: `FR`
        }), (0, $.jsx)(`span`, {
          children: `SA`
        })]
      }), (0, $.jsxs)(`div`, {
        className: `grid grid-cols-7 gap-y-2 text-center`,
        children: [Array.from({
          length: u
        }).map((e, t) => (0, $.jsx)(`div`, {
          className: `h-9`
        }, `empty-${t}`)), Array.from({
          length: l
        }).map((e, t) => {
          let n = t + 1;
          return (0, $.jsx)(`button`, {
            onClick: () => i(n),
            className: `h-9 w-full flex items-center justify-center cursor-pointer transition-transform`,
            children: (0, $.jsx)(`div`, {
              className: `w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${r===n?`bg-[#E51E2B] text-white font-bold shadow-[0_2px_12px_rgba(229,30,43,0.5)]`:`text-white hover:bg-slate-800/60`}`,
              children: n
            })
          }, `day-${n}`)
        })]
      })]
    }), (0, $.jsxs)(`div`, {
      className: `mt-3.5 bg-[#131722] border border-slate-800 rounded-[22px] p-4 shadow-md`,
      children: [(0, $.jsxs)(`div`, {
        className: `flex items-center justify-between mb-2`,
        children: [(0, $.jsxs)(`div`, {
          children: [(0, $.jsxs)(`h4`, {
            className: `text-base font-bold text-white`,
            children: [p, ` `, r, `, `, s]
          }), (0, $.jsxs)(`span`, {
            className: `text-xs text-[#94A3B8] block mt-0.5`,
            children: [`Total Shift: `, _ > 0 ? vs(_) : `No recorded hours`]
          })]
        }), g.length > 0 ? (0, $.jsxs)(`span`, {
          className: `inline-flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-500/40 px-2.5 py-1 rounded-full`,
          children: [(0, $.jsx)(H, {
            className: `w-3.5 h-3.5 text-emerald-400`
          }), `Attended`]
        }) : (0, $.jsx)(`span`, {
          className: `text-xs font-medium text-[#EF4444] bg-red-950/40 border border-red-500/40 px-2.5 py-1 rounded-full`,
          children: `Off / Absent`
        })]
      }), g.length === 0 ? (0, $.jsx)(`p`, {
        className: `text-xs text-[#64748B] py-5 text-center`,
        children: `No check-in records for this date.`
      }) : (0, $.jsx)(`div`, {
        className: `space-y-2 mt-3 pt-2 border-t border-slate-800/80`,
        children: g.map(e => (0, $.jsxs)(`div`, {
          className: `flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs`,
          children: [(0, $.jsxs)(`div`, {
            className: `flex items-center gap-2`,
            children: [(0, $.jsx)(`span`, {
              className: `w-2 h-2 rounded-full ${e.action_type===`check_out`?`bg-[#EF4444]`:`bg-[#22C55E]`}`
            }), (0, $.jsx)(`span`, {
              className: `font-semibold text-slate-200 capitalize`,
              children: e.action_type.replace(`_`, ` `)
            }), e.distance_meters !== null && e.distance_meters !== void 0 && (0, $.jsxs)(`span`, {
              className: `text-[10px] text-emerald-400 flex items-center gap-0.5 font-semibold`,
              children: [(0, $.jsx)(de, {
                className: `w-2.5 h-2.5`
              }), e.distance_meters, `m`]
            })]
          }), (0, $.jsx)(`div`, {
            className: `text-slate-400 font-medium`,
            children: new Date(e.timestamp).toLocaleTimeString(`en-US`, {
              timeZone: `Asia/Tashkent`,
              hour: `numeric`,
              minute: `2-digit`,
              hour12: !0
            })
          })]
        }, e.id))
      })]
    })]
  })
}, El = ({
  logs: e,
  onRefresh: t
}) => {
  let [n, r] = (0, T.useState)(`all`), [i, a] = (0, T.useState)(!1), [o, s] = (0, T.useState)(null), [c, l] = (0, T.useState)(!1), u = async () => {
    l(!0);
    try {
      await t()
    } finally {
      setTimeout(() => l(!1), 500)
    }
  }, d = e.filter(e => n === `all` || e.action_type === n).sort((e, t) => {
    let n = new Date(e.timestamp).getTime(),
      r = new Date(t.timestamp).getTime();
    return i ? n - r : r - n
  }), f = e.filter(e => e.action_type === `check_in`).length, p = e.filter(e => e.action_type === `check_out`).length;
  return (0, $.jsxs)(`div`, {
    className: `w-full pb-20 pt-1 select-none`,
    children: [o && (0, $.jsx)(`div`, {
      className: `fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn`,
      onClick: () => s(null),
      children: (0, $.jsxs)(`div`, {
        className: `relative bg-[#131722] border border-slate-700 rounded-3xl p-4 max-w-[320px] shadow-2xl text-white`,
        onClick: e => e.stopPropagation(),
        children: [(0, $.jsxs)(`div`, {
          className: `flex items-center justify-between pb-3 border-b border-slate-800`,
          children: [(0, $.jsxs)(`div`, {
            className: `flex items-center gap-1.5 text-xs font-bold text-slate-300`,
            children: [(0, $.jsx)(Ee, {
              className: `w-4 h-4 text-emerald-400`
            }), (0, $.jsx)(`span`, {
              children: `Verified Biometric Selfie`
            })]
          }), (0, $.jsx)(`button`, {
            type: `button`,
            onClick: () => s(null),
            className: `w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer`,
            children: (0, $.jsx)(He, {
              className: `w-4 h-4`
            })
          })]
        }), (0, $.jsx)(`div`, {
          className: `w-[280px] h-[280px] rounded-2xl overflow-hidden bg-black mt-3`,
          children: (0, $.jsx)(`img`, {
            src: o,
            alt: `Verification Selfie`,
            className: `w-full h-full object-cover`
          })
        }), (0, $.jsx)(`p`, {
          className: `mt-3 text-center text-[11px] font-semibold text-slate-400`,
          children: `Time and GPS stamped selfie verification`
        })]
      })
    }), (0, $.jsxs)(`div`, {
      className: `flex items-center justify-between mb-3 px-1`,
      children: [(0, $.jsxs)(`div`, {
        className: `flex items-center gap-2.5`,
        children: [(0, $.jsx)(`img`, {
          src: `/logo2.png`,
          alt: `SEVENCORE`,
          className: `h-8 w-auto max-w-[130px] object-contain select-none`
        }), (0, $.jsxs)(`div`, {
          children: [(0, $.jsx)(`h3`, {
            className: `text-base font-black text-white tracking-tight leading-none`,
            children: `Attendance History`
          }), (0, $.jsxs)(`span`, {
            className: `text-[11px] font-bold text-[#94A3B8] mt-0.5 block`,
            children: [e.length, ` Total Records Logged`]
          })]
        })]
      }), (0, $.jsx)(`button`, {
        type: `button`,
        onClick: u,
        className: `p-2 rounded-xl bg-[#131722] border border-slate-800 hover:border-slate-700 text-slate-300 shadow-sm transition-colors cursor-pointer`,
        title: `Refresh logs`,
        children: (0, $.jsx)(ye, {
          className: `w-4 h-4 ${c?`animate-spin text-[#EF4444]`:``}`
        })
      })]
    }), (0, $.jsxs)(`div`, {
      className: `grid grid-cols-2 gap-2.5 mb-3`,
      children: [(0, $.jsxs)(`div`, {
        className: `bg-[#131722] border border-slate-800 rounded-xl p-2.5 flex items-center justify-between shadow-md`,
        children: [(0, $.jsxs)(`div`, {
          className: `flex items-center gap-2`,
          children: [(0, $.jsx)(`div`, {
            className: `w-6 h-6 rounded-md bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 flex items-center justify-center`,
            children: (0, $.jsx)(H, {
              className: `w-3.5 h-3.5`
            })
          }), (0, $.jsx)(`span`, {
            className: `text-xs font-semibold text-[#94A3B8]`,
            children: `Check-Ins`
          })]
        }), (0, $.jsx)(`span`, {
          className: `text-sm font-black text-white font-mono`,
          children: f
        })]
      }), (0, $.jsxs)(`div`, {
        className: `bg-[#131722] border border-slate-800 rounded-xl p-2.5 flex items-center justify-between shadow-md`,
        children: [(0, $.jsxs)(`div`, {
          className: `flex items-center gap-2`,
          children: [(0, $.jsx)(`div`, {
            className: `w-6 h-6 rounded-md bg-red-950/60 border border-red-500/30 text-[#EF4444] flex items-center justify-center`,
            children: (0, $.jsx)(ue, {
              className: `w-3.5 h-3.5`
            })
          }), (0, $.jsx)(`span`, {
            className: `text-xs font-semibold text-[#94A3B8]`,
            children: `Check-Outs`
          })]
        }), (0, $.jsx)(`span`, {
          className: `text-sm font-black text-[#EF4444] font-mono`,
          children: p
        })]
      })]
    }), (0, $.jsxs)(`div`, {
      className: `flex items-center justify-between gap-2 mb-3 bg-[#131722] p-2 rounded-2xl border border-slate-800 shadow-md`,
      children: [(0, $.jsxs)(`div`, {
        className: `flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar text-xs`,
        children: [(0, $.jsx)(se, {
          className: `w-3.5 h-3.5 text-slate-500 ml-1 shrink-0`
        }), [{
          id: `all`,
          label: `All`
        }, {
          id: `check_in`,
          label: `Check In`
        }, {
          id: `check_out`,
          label: `Check Out`
        }].map(e => (0, $.jsx)(`button`, {
          onClick: () => r(e.id),
          className: `px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${n===e.id?`bg-[#E51E2B] text-white shadow-xs`:`bg-slate-900 text-[#94A3B8] hover:text-white`}`,
          children: e.label
        }, e.id))]
      }), (0, $.jsx)(`button`, {
        type: `button`,
        onClick: () => a(!i),
        className: `p-1.5 rounded-xl border border-slate-800 text-[#94A3B8] hover:text-white hover:bg-slate-900 shrink-0 transition-colors cursor-pointer`,
        title: `Order: ${i?`Oldest first`:`Newest first`}`,
        children: (0, $.jsx)(O, {
          className: `w-4 h-4`
        })
      })]
    }), (0, $.jsx)(`div`, {
      className: `space-y-2`,
      children: d.length === 0 ? (0, $.jsxs)(`div`, {
        className: `bg-[#131722] border border-slate-800 rounded-2xl p-8 text-center text-slate-500 text-xs shadow-md`,
        children: [(0, $.jsx)(U, {
          className: `w-8 h-8 text-slate-600 mx-auto mb-2`
        }), (0, $.jsx)(`p`, {
          className: `font-bold text-slate-300 mb-1`,
          children: `No attendance records found`
        }), (0, $.jsx)(`p`, {
          className: `text-slate-500`,
          children: `There are no records matching the selected filter criteria.`
        })]
      }) : d.map(e => {
        let t = new Date(e.timestamp),
          n = t.toLocaleDateString(`en-US`, {
            timeZone: `Asia/Tashkent`,
            month: `short`,
            day: `numeric`,
            year: `numeric`
          }),
          r = t.toLocaleTimeString(`en-US`, {
            timeZone: `Asia/Tashkent`,
            hour: `numeric`,
            minute: `2-digit`,
            hour12: !0
          }),
          i = e.action_type === `check_in`;
        return (0, $.jsxs)(`div`, {
          className: `bg-[#131722] border border-slate-800 rounded-2xl p-3.5 shadow-md flex items-center justify-between hover:border-slate-700 transition-colors`,
          children: [(0, $.jsxs)(`div`, {
            className: `flex items-center gap-3 min-w-0`,
            children: [e.photo_url ? (0, $.jsx)(`button`, {
              type: `button`,
              onClick: () => s(e.photo_url || null),
              className: `w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-slate-700 hover:scale-105 transition-transform cursor-pointer`,
              children: (0, $.jsx)(`img`, {
                src: e.photo_url,
                alt: `Selfie`,
                className: `w-full h-full object-cover`
              })
            }) : (0, $.jsx)(`div`, {
              className: `w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0`,
              children: i ? (0, $.jsx)(H, {
                className: `w-5 h-5 text-emerald-400`
              }) : (0, $.jsx)(ue, {
                className: `w-5 h-5 text-[#EF4444]`
              })
            }), (0, $.jsxs)(`div`, {
              className: `min-w-0`,
              children: [(0, $.jsxs)(`div`, {
                className: `flex items-center gap-2`,
                children: [(0, $.jsx)(`span`, {
                  className: `text-xs font-bold uppercase tracking-wider ${i?`text-emerald-400`:`text-[#EF4444]`}`,
                  children: i ? `Check In` : `Check Out`
                }), e.durationFormatted && (0, $.jsx)(`span`, {
                  className: `text-[10.5px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-300 font-mono`,
                  children: e.durationFormatted
                })]
              }), (0, $.jsxs)(`div`, {
                className: `text-[11px] text-[#94A3B8] flex items-center gap-1.5 mt-0.5`,
                children: [(0, $.jsx)(`span`, {
                  children: n
                }), (0, $.jsx)(`span`, {
                  children: `•`
                }), (0, $.jsx)(`span`, {
                  children: r
                })]
              })]
            })]
          }), e.distance_meters !== null && e.distance_meters !== void 0 && (0, $.jsx)(`div`, {
            className: `text-right shrink-0`,
            children: (0, $.jsxs)(`span`, {
              className: `text-[10px] text-emerald-400 font-semibold flex items-center justify-end gap-0.5`,
              children: [(0, $.jsx)(de, {
                className: `w-3 h-3`
              }), e.distance_meters, `m`]
            })
          })]
        }, e.id)
      })
    })]
  })
}, Dl = .65;
async function Ol(e, t = 220, n = Dl) {
  return new Promise((r, i) => {
    let a = new Image;
    if (a.crossOrigin = `anonymous`, a.onload = () => {
        try {
          let i = document.createElement(`canvas`),
            o = Math.min(a.width, a.height),
            s = (a.width - o) / 2,
            c = (a.height - o) / 2,
            l = Math.min(t, o);
          i.width = l, i.height = l;
          let u = i.getContext(`2d`);
          if (!u) {
            r(typeof e == `string` ? e : ``);
            return
          }
          u.drawImage(a, s, c, o, o, 0, 0, l, l), r(i.toDataURL(`image/jpeg`, n))
        } catch (t) {
          console.warn(`Image compression fallback:`, t), r(typeof e == `string` ? e : ``)
        }
      }, a.onerror = e => {
        console.warn(`Image load error during compression:`, e), i(e)
      }, typeof e == `string`) a.src = e;
    else {
      let t = new FileReader;
      t.onload = e => {
        a.src = e.target?.result
      }, t.onerror = e => i(e), t.readAsDataURL(e)
    }
  })
}

function kl(e, t = 220, n = Dl) {
  let r = document.createElement(`canvas`),
    i = Math.min(e.videoWidth, e.videoHeight) || 480,
    a = Math.min(t, i);
  r.width = a, r.height = a;
  let o = r.getContext(`2d`);
  if (!o) return ``;
  let s = (e.videoWidth - i) / 2,
    c = (e.videoHeight - i) / 2;
  return o.translate(a, 0), o.scale(-1, 1), o.drawImage(e, s, c, i, i, 0, 0, a, a), r.toDataURL(`image/jpeg`, n)
}
var Al = ({
    user: e,
    onLogout: t,
    onUpdateUser: n,
    employee: r
  }) => {
    let [i, a] = (0, T.useState)(!1), [o, s] = (0, T.useState)(!1), [c, l] = (0, T.useState)(!1), [u, d] = (0, T.useState)(!1), [f, p] = (0, T.useState)(e.first_name || ``), [m, h] = (0, T.useState)(e.last_name || ``), [g, _] = (0, T.useState)(() => {
      let t = e.department;
      return t && !t.toLowerCase().includes(`fleet`) && kc.includes(t) ? t : `7CORE`
    }), [v, y] = (0, T.useState)(e.photo_url || null), [b, x] = (0, T.useState)(!1), [S, C] = (0, T.useState)(``), [w, E] = (0, T.useState)(``), [D, O] = (0, T.useState)(!1), k = (0, T.useRef)(null), A = () => {
      navigator.clipboard.writeText(String(e.id)), a(!0), vl(`light`), setTimeout(() => a(!1), 2e3)
    }, j = async e => {
      let t = e.target.files?.[0];
      if (t) try {
        let e = await Ol(t, 220, .7);
        y(e), vl(`success`)
      } catch (e) {
        console.warn(`Profile image compression error:`, e)
      }
    }, M = () => {
      y(null), k.current && (k.current.value = ``), vl(`light`)
    }, P = async t => {
      if (t.preventDefault(), f.trim()) {
        l(!0), vl(`medium`);
        try {
          if (await ks(e.id, {
              first_name: f.trim(),
              last_name: m.trim() || null,
              department: g,
              photo_url: v
            })) {
            let t = {
              ...e,
              first_name: f.trim(),
              last_name: m.trim() || void 0,
              department: g,
              photo_url: v || void 0
            };
            n && n(t), vl(`success`), d(!0), setTimeout(() => d(!1), 2500), s(!1)
          }
        } catch (e) {
          console.error(`Failed to update profile:`, e), vl(`error`)
        } finally {
          l(!1)
        }
      }
    }, ee = () => {
      p(e.first_name || ``), h(e.last_name || ``), _(e.department || `7CORE`), y(e.photo_url || null), s(!1)
    }, R = async e => {
      if (e.preventDefault(), E(``), !S.trim()) {
        E(`Please enter the security passkey.`);
        return
      }
      O(!0);
      try {
        await Fs(S.trim()) ? (vl(`success`), x(!1), t && t()) : (vl(`error`), E(`Invalid passkey. Correct passkey is required to log out.`))
      } catch {
        E(`Verification failed. Please try again.`), vl(`error`)
      } finally {
        O(!1)
      }
    }, z = hs(r), B = (0, T.useMemo)(() => ms(r?.shift_days), [r?.shift_days]), H = (0, T.useMemo)(() => new Date().toLocaleDateString(`en-US`, {
      timeZone: `Asia/Tashkent`,
      weekday: `long`
    }).toLowerCase(), []), te = (0, T.useMemo)(() => new Date().toLocaleDateString(`en-US`, {
      weekday: `long`
    }).toLowerCase(), []), ne = z && (B.includes(H) || B.includes(te));
    return (0, $.jsxs)(`div`, {
      className: `w-full pb-24 pt-1 animate-fadeIn`,
      children: [(0, $.jsx)(`input`, {
        ref: k,
        type: `file`,
        accept: `image/*`,
        onChange: j,
        className: `hidden`
      }), (0, $.jsxs)(`div`, {
        className: `bg-[#131722] border border-slate-800 rounded-[28px] p-6 shadow-md mb-4 relative overflow-hidden text-white`,
        children: [u && (0, $.jsxs)(`div`, {
          className: `mb-4 p-3 bg-emerald-950/50 border border-emerald-500/40 text-emerald-400 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 animate-fadeIn`,
          children: [(0, $.jsx)(I, {
            className: `w-4 h-4 text-emerald-400`
          }), `Profile updated successfully!`]
        }), (0, $.jsxs)(`div`, {
          className: `flex flex-col items-center text-center`,
          children: [(0, $.jsxs)(`div`, {
            className: `relative group mb-3`,
            children: [(0, $.jsx)(`div`, {
              className: `w-24 h-24 rounded-full overflow-hidden border-4 border-slate-700 ring-4 ring-slate-800 shadow-lg bg-slate-900 flex items-center justify-center`,
              children: v ? (0, $.jsx)(`img`, {
                src: v,
                alt: f || e.first_name,
                className: `w-full h-full object-cover`
              }) : (0, $.jsx)(Be, {
                className: `w-12 h-12 text-slate-400`
              })
            }), (0, $.jsx)(`button`, {
              type: `button`,
              onClick: () => k.current?.click(),
              className: `absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#E51E2B] hover:bg-red-700 text-white shadow-md flex items-center justify-center border-2 border-slate-900 transition-transform active:scale-90 cursor-pointer`,
              title: `Upload profile picture`,
              children: (0, $.jsx)(F, {
                className: `w-4 h-4`
              })
            })]
          }), (0, $.jsxs)(`div`, {
            className: `flex items-center gap-2 mb-3`,
            children: [(0, $.jsx)(`button`, {
              type: `button`,
              onClick: () => k.current?.click(),
              className: `text-[11px] font-bold text-slate-300 hover:text-white py-1 px-3 bg-slate-800 hover:bg-slate-700 rounded-full transition-colors cursor-pointer`,
              children: v ? `Change Photo` : `Upload Photo`
            }), v && (0, $.jsxs)(`button`, {
              type: `button`,
              onClick: M,
              className: `text-[11px] font-semibold text-rose-400 hover:text-rose-300 py-1 px-2.5 rounded-full hover:bg-rose-950/40 transition-colors flex items-center gap-1 cursor-pointer`,
              children: [(0, $.jsx)(Pe, {
                className: `w-3 h-3`
              }), `Remove`]
            })]
          }), o ? (0, $.jsxs)(`form`, {
            onSubmit: P,
            className: `w-full text-left space-y-3.5 mt-2`,
            children: [(0, $.jsxs)(`div`, {
              className: `space-y-1`,
              children: [(0, $.jsx)(`label`, {
                className: `text-xs font-bold text-slate-300`,
                children: `First Name`
              }), (0, $.jsx)(`input`, {
                type: `text`,
                required: !0,
                value: f,
                onChange: e => p(e.target.value),
                placeholder: `First name`,
                className: `w-full py-2.5 px-3 bg-slate-900 border border-slate-700 rounded-xl text-xs font-semibold text-white focus:outline-none focus:border-[#EF4444]`
              })]
            }), (0, $.jsxs)(`div`, {
              className: `space-y-1`,
              children: [(0, $.jsx)(`label`, {
                className: `text-xs font-bold text-slate-300`,
                children: `Last Name`
              }), (0, $.jsx)(`input`, {
                type: `text`,
                value: m,
                onChange: e => h(e.target.value),
                placeholder: `Last name (optional)`,
                className: `w-full py-2.5 px-3 bg-slate-900 border border-slate-700 rounded-xl text-xs font-semibold text-white focus:outline-none focus:border-[#EF4444]`
              })]
            }), (0, $.jsxs)(`div`, {
              className: `space-y-1`,
              children: [(0, $.jsxs)(`label`, {
                className: `text-xs font-bold text-slate-300 flex items-center gap-1.5`,
                children: [(0, $.jsx)(N, {
                  className: `w-3.5 h-3.5 text-slate-400`
                }), `Department`]
              }), (0, $.jsx)(`select`, {
                value: g,
                onChange: e => _(e.target.value),
                className: `w-full py-2.5 px-3 bg-slate-900 border border-slate-700 rounded-xl text-xs font-semibold text-white focus:outline-none focus:border-[#EF4444] cursor-pointer`,
                children: kc.filter(e => !e.toLowerCase().includes(`fleet`)).map(e => (0, $.jsx)(`option`, {
                  value: e,
                  children: e
                }, e))
              })]
            }), (0, $.jsxs)(`div`, {
              className: `pt-2 flex items-center gap-2`,
              children: [(0, $.jsx)(`button`, {
                type: `button`,
                onClick: ee,
                disabled: c,
                className: `w-1/2 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-colors cursor-pointer`,
                children: `Cancel`
              }), (0, $.jsx)(`button`, {
                type: `submit`,
                disabled: c,
                className: `w-1/2 py-2.5 bg-[#E51E2B] hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer`,
                children: c ? (0, $.jsxs)($.Fragment, {
                  children: [(0, $.jsx)(X, {
                    className: `w-3.5 h-3.5 animate-spin`
                  }), (0, $.jsx)(`span`, {
                    children: `Saving...`
                  })]
                }) : (0, $.jsxs)($.Fragment, {
                  children: [(0, $.jsx)(xe, {
                    className: `w-3.5 h-3.5`
                  }), (0, $.jsx)(`span`, {
                    children: `Save Changes`
                  })]
                })
              })]
            })]
          }) : (0, $.jsxs)($.Fragment, {
            children: [(0, $.jsxs)(`h3`, {
              className: `text-xl font-extrabold text-white`,
              children: [e.first_name, ` `, e.last_name || ``]
            }), e.username && (0, $.jsxs)(`p`, {
              className: `text-xs text-[#EF4444] font-semibold mb-1`,
              children: [`@`, e.username]
            }), (0, $.jsxs)(`div`, {
              className: `inline-flex items-center gap-1.5 bg-slate-900 px-3 py-1 rounded-full text-xs text-slate-300 font-mono mt-1 border border-slate-800`,
              children: [(0, $.jsxs)(`span`, {
                children: [`Telegram ID: `, e.id]
              }), (0, $.jsx)(`button`, {
                type: `button`,
                onClick: A,
                className: `hover:text-white active:scale-90 transition-transform cursor-pointer`,
                title: `Copy Telegram ID`,
                children: i ? (0, $.jsx)(I, {
                  className: `w-3.5 h-3.5 text-emerald-400`
                }) : (0, $.jsx)(W, {
                  className: `w-3.5 h-3.5 text-slate-400`
                })
              })]
            }), (0, $.jsxs)(`div`, {
              className: `mt-3 flex items-center justify-center gap-2 flex-wrap`,
              children: [e.department && (0, $.jsxs)(`span`, {
                className: `text-[11px] font-black px-3 py-1 rounded-full bg-slate-900 text-white flex items-center gap-1 border border-slate-800 shadow-2xs`,
                children: [(0, $.jsx)(N, {
                  className: `w-3.5 h-3.5 text-[#E51E2B]`
                }), e.department]
              }), (0, $.jsxs)(`span`, {
                className: `text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 flex items-center gap-1 shadow-2xs`,
                children: [(0, $.jsx)(`span`, {
                  className: `w-1.5 h-1.5 rounded-full bg-emerald-400`
                }), `Active Personnel`]
              })]
            }), (0, $.jsx)(`div`, {
              className: `mt-5 w-full pt-4 border-t border-slate-800`,
              children: (0, $.jsxs)(`button`, {
                type: `button`,
                onClick: () => s(!0),
                className: `w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer`,
                children: [(0, $.jsx)(he, {
                  className: `w-4 h-4 text-slate-400`
                }), `Edit Profile Details`]
              })
            })]
          })]
        })]
      }), (0, $.jsxs)(`div`, {
        className: `bg-[#131722] border border-slate-800 rounded-2xl p-4 shadow-md text-white mb-4`,
        children: [(0, $.jsxs)(`div`, {
          className: `flex items-center justify-between mb-2`,
          children: [(0, $.jsxs)(`div`, {
            className: `flex items-center gap-2`,
            children: [(0, $.jsx)(U, {
              className: `w-4 h-4 text-[#EF4444]`
            }), (0, $.jsx)(`span`, {
              className: `text-sm font-bold text-white`,
              children: `Work Shift Schedule`
            })]
          }), (0, $.jsx)(`span`, {
            className: `px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${z?ne?`border-emerald-500/40 bg-emerald-950/40 text-emerald-300`:`border-slate-700 bg-[#0E121A] text-slate-400`:`border-amber-500/40 bg-amber-950/40 text-amber-300`}`,
            children: z ? ne ? `TODAY: WORKING` : `TODAY: DAY OFF` : `SHIFT UNASSIGNED`
          })]
        }), (0, $.jsxs)(`div`, {
          className: `grid grid-cols-2 gap-2 my-2.5`,
          children: [(0, $.jsxs)(`div`, {
            className: `p-2.5 rounded-xl bg-[#0D1017] border border-[#262C3A]`,
            children: [(0, $.jsx)(`span`, {
              className: `text-[10px] font-mono text-[#94A3B8] block`,
              children: `Shift Hours`
            }), (0, $.jsx)(`span`, {
              className: `text-xs font-mono font-bold text-white mt-0.5 block`,
              children: z ? `${r.shift_start_time} – ${r.shift_end_time}` : `Unassigned`
            })]
          }), (0, $.jsxs)(`div`, {
            className: `p-2.5 rounded-xl bg-[#0D1017] border border-[#262C3A]`,
            children: [(0, $.jsx)(`span`, {
              className: `text-[10px] font-mono text-[#94A3B8] block`,
              children: `Scheduled Days`
            }), (0, $.jsx)(`span`, {
              className: `text-xs font-mono font-bold text-white mt-0.5 block truncate`,
              children: z ? B.length === 7 ? `All 7 Days` : B.length === 5 && B.includes(`monday`) && B.includes(`friday`) ? `Mon–Fri (5d)` : B.length === 6 ? `Mon–Sat (6d)` : `${B.length} days/wk` : `None`
            })]
          })]
        }), (0, $.jsx)(`p`, {
          className: `text-[11px] text-[#94A3B8] leading-relaxed mb-3`,
          children: z ? ne ? `Today is a scheduled working day (${r.shift_start_time} – ${r.shift_end_time} UZT).` : `Today is your scheduled day off. No check-in required.` : `Your work shift has not been assigned yet. Awaiting manager assignment.`
        }), (0, $.jsxs)(`div`, {
          className: `p-3 rounded-xl bg-[#0D1017] border border-[#262C3A] flex items-center justify-between`,
          children: [(0, $.jsxs)(`div`, {
            className: `flex items-center gap-2 text-xs text-[#94A3B8]`,
            children: [(0, $.jsx)(Z, {
              className: `w-3.5 h-3.5 text-slate-400`
            }), (0, $.jsx)(`span`, {
              children: `Shift schedule managed by Dispatch & Management`
            })]
          }), (0, $.jsx)(`span`, {
            className: `text-[10px] font-mono uppercase text-slate-400 font-bold px-2 py-0.5 rounded bg-[#161B26] border border-[#262C3A]`,
            children: `Fixed`
          })]
        })]
      }), (0, $.jsxs)(`div`, {
        className: `bg-[#131722] border border-slate-800 rounded-2xl p-4 shadow-md text-white`,
        children: [(0, $.jsxs)(`div`, {
          className: `flex items-center gap-2 mb-1.5`,
          children: [(0, $.jsx)(Te, {
            className: `w-4 h-4 text-[#EF4444]`
          }), (0, $.jsx)(`span`, {
            className: `text-sm font-bold text-white`,
            children: `Account & Device Session`
          })]
        }), (0, $.jsx)(`p`, {
          className: `text-xs text-[#94A3B8] mb-3 leading-relaxed`,
          children: `Leaving the company or switching devices? Logging out clears this terminal's registration and requires the company passkey.`
        }), (0, $.jsxs)(`button`, {
          type: `button`,
          onClick: () => {
            C(``), E(``), x(!0), vl(`light`)
          },
          className: `w-full py-2.5 px-4 bg-red-950/40 hover:bg-red-950/60 text-red-400 border border-red-500/30 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer`,
          children: [(0, $.jsx)(ue, {
            className: `w-4 h-4 text-[#EF4444]`
          }), `Log Out User`]
        })]
      }), b && (0, $.jsx)(`div`, {
        className: `fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn`,
        children: (0, $.jsxs)(`div`, {
          className: `bg-[#131722] border border-slate-700 w-full max-w-sm rounded-3xl p-6 shadow-2xl relative text-white`,
          children: [(0, $.jsx)(`button`, {
            onClick: () => x(!1),
            className: `absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition-colors cursor-pointer`,
            children: (0, $.jsx)(He, {
              className: `w-5 h-5`
            })
          }), (0, $.jsxs)(`div`, {
            className: `text-center mb-5`,
            children: [(0, $.jsx)(`div`, {
              className: `w-12 h-12 rounded-2xl bg-red-950/50 border border-red-500/30 text-[#EF4444] flex items-center justify-center mx-auto mb-3 shadow-xs`,
              children: (0, $.jsx)(Z, {
                className: `w-6 h-6`
              })
            }), (0, $.jsx)(`h3`, {
              className: `text-base font-extrabold text-white`,
              children: `Security Passkey Required`
            }), (0, $.jsx)(`p`, {
              className: `text-xs text-[#94A3B8] mt-1 leading-relaxed`,
              children: `Enter the organization passkey to verify authorization and log out of this employee account.`
            })]
          }), (0, $.jsxs)(`form`, {
            onSubmit: R,
            className: `space-y-4`,
            children: [(0, $.jsxs)(`div`, {
              className: `space-y-1.5`,
              children: [(0, $.jsxs)(`label`, {
                className: `text-xs font-semibold text-slate-300 flex items-center gap-1.5`,
                children: [(0, $.jsx)(J, {
                  className: `w-3.5 h-3.5 text-slate-400`
                }), `Passkey`]
              }), (0, $.jsx)(`input`, {
                type: `text`,
                autoFocus: !0,
                required: !0,
                value: S,
                onChange: e => {
                  C(e.target.value.toUpperCase()), E(``)
                },
                placeholder: `Enter passkey to log out`,
                className: `w-full py-2.5 px-3.5 bg-slate-900 border border-slate-700 rounded-xl text-sm font-mono tracking-wider text-white placeholder:text-slate-500 focus:outline-none focus:border-[#EF4444] transition-all uppercase`
              })]
            }), w && (0, $.jsxs)(`div`, {
              className: `p-3 bg-red-950/50 border border-red-500/40 rounded-xl text-red-300 text-xs flex items-center gap-2`,
              children: [(0, $.jsx)(V, {
                className: `w-4 h-4 shrink-0 text-[#EF4444]`
              }), (0, $.jsx)(`span`, {
                children: w
              })]
            }), (0, $.jsxs)(`div`, {
              className: `pt-2 flex items-center gap-2`,
              children: [(0, $.jsx)(`button`, {
                type: `button`,
                onClick: () => x(!1),
                className: `w-1/2 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition-colors cursor-pointer`,
                children: `Cancel`
              }), (0, $.jsx)(`button`, {
                type: `submit`,
                disabled: D,
                className: `w-1/2 py-2.5 bg-[#E51E2B] hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer`,
                children: D ? (0, $.jsxs)($.Fragment, {
                  children: [(0, $.jsx)(X, {
                    className: `w-3.5 h-3.5 animate-spin`
                  }), (0, $.jsx)(`span`, {
                    children: `Verifying...`
                  })]
                }) : (0, $.jsxs)($.Fragment, {
                  children: [(0, $.jsx)(ue, {
                    className: `w-3.5 h-3.5`
                  }), (0, $.jsx)(`span`, {
                    children: `Confirm Log Out`
                  })]
                })
              })]
            })]
          })]
        })
      })]
    })
  },
  jl = l(o(((e, t) => {
    (function(n, r) {
      typeof e == `object` && t !== void 0 ? r(e) : typeof define == `function` && define.amd ? define([`exports`], r) : (n = typeof globalThis < `u` ? globalThis : n || self, r(n.leaflet = {}))
    })(e, (function(e) {
      var t = `1.9.4`;

      function n(e) {
        for (var t, n = 1, r = arguments.length, i; n < r; n++)
          for (t in i = arguments[n], i) e[t] = i[t];
        return e
      }
      var r = Object.create || (function() {
        function e() {}
        return function(t) {
          return e.prototype = t, new e
        }
      })();

      function i(e, t) {
        var n = Array.prototype.slice;
        if (e.bind) return e.bind.apply(e, n.call(arguments, 1));
        var r = n.call(arguments, 2);
        return function() {
          return e.apply(t, r.length ? r.concat(n.call(arguments)) : arguments)
        }
      }
      var a = 0;

      function o(e) {
        return `_leaflet_id` in e || (e._leaflet_id = ++a), e._leaflet_id
      }

      function s(e, t, n) {
        var r, i, a, o = function() {
          r = !1, i &&= (a.apply(n, i), !1)
        };
        return a = function() {
          r ? i = arguments : (e.apply(n, arguments), setTimeout(o, t), r = !0)
        }, a
      }

      function c(e, t, n) {
        var r = t[1],
          i = t[0],
          a = r - i;
        return e === r && n ? e : ((e - i) % a + a) % a + i
      }

      function l() {
        return !1
      }

      function u(e, t) {
        if (t === !1) return e;
        var n = 10 ** (t === void 0 ? 6 : t);
        return Math.round(e * n) / n
      }

      function d(e) {
        return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, ``)
      }

      function f(e) {
        return d(e).split(/\s+/)
      }

      function p(e, t) {
        for (var n in Object.prototype.hasOwnProperty.call(e, `options`) || (e.options = e.options ? r(e.options) : {}), t) e.options[n] = t[n];
        return e.options
      }

      function m(e, t, n) {
        var r = [];
        for (var i in e) r.push(encodeURIComponent(n ? i.toUpperCase() : i) + `=` + encodeURIComponent(e[i]));
        return (!t || t.indexOf(`?`) === -1 ? `?` : `&`) + r.join(`&`)
      }
      var h = /\{ *([\w_ -]+) *\}/g;

      function g(e, t) {
        return e.replace(h, function(e, n) {
          var r = t[n];
          if (r === void 0) throw Error(`No value provided for variable ` + e);
          return typeof r == `function` && (r = r(t)), r
        })
      }
      var _ = Array.isArray || function(e) {
        return Object.prototype.toString.call(e) === `[object Array]`
      };

      function v(e, t) {
        for (var n = 0; n < e.length; n++)
          if (e[n] === t) return n;
        return -1
      }
      var y = `data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=`;

      function b(e) {
        return window[`webkit` + e] || window[`moz` + e] || window[`ms` + e]
      }
      var x = 0;

      function S(e) {
        var t = +new Date,
          n = Math.max(0, 16 - (t - x));
        return x = t + n, window.setTimeout(e, n)
      }
      var C = window.requestAnimationFrame || b(`RequestAnimationFrame`) || S,
        w = window.cancelAnimationFrame || b(`CancelAnimationFrame`) || b(`CancelRequestAnimationFrame`) || function(e) {
          window.clearTimeout(e)
        };

      function T(e, t, n) {
        if (n && C === S) e.call(t);
        else return C.call(window, i(e, t))
      }

      function E(e) {
        e && w.call(window, e)
      }
      var D = {
        __proto__: null,
        extend: n,
        create: r,
        bind: i,
        get lastId() {
          return a
        },
        stamp: o,
        throttle: s,
        wrapNum: c,
        falseFn: l,
        formatNum: u,
        trim: d,
        splitWords: f,
        setOptions: p,
        getParamString: m,
        template: g,
        isArray: _,
        indexOf: v,
        emptyImageUrl: y,
        requestFn: C,
        cancelFn: w,
        requestAnimFrame: T,
        cancelAnimFrame: E
      };

      function O() {}
      O.extend = function(e) {
        var t = function() {
            p(this), this.initialize && this.initialize.apply(this, arguments), this.callInitHooks()
          },
          i = t.__super__ = this.prototype,
          a = r(i);
        for (var o in a.constructor = t, t.prototype = a, this) Object.prototype.hasOwnProperty.call(this, o) && o !== `prototype` && o !== `__super__` && (t[o] = this[o]);
        return e.statics && n(t, e.statics), e.includes && (k(e.includes), n.apply(null, [a].concat(e.includes))), n(a, e), delete a.statics, delete a.includes, a.options && (a.options = i.options ? r(i.options) : {}, n(a.options, e.options)), a._initHooks = [], a.callInitHooks = function() {
          if (!this._initHooksCalled) {
            i.callInitHooks && i.callInitHooks.call(this), this._initHooksCalled = !0;
            for (var e = 0, t = a._initHooks.length; e < t; e++) a._initHooks[e].call(this)
          }
        }, t
      }, O.include = function(e) {
        var t = this.prototype.options;
        return n(this.prototype, e), e.options && (this.prototype.options = t, this.mergeOptions(e.options)), this
      }, O.mergeOptions = function(e) {
        return n(this.prototype.options, e), this
      }, O.addInitHook = function(e) {
        var t = Array.prototype.slice.call(arguments, 1),
          n = typeof e == `function` ? e : function() {
            this[e].apply(this, t)
          };
        return this.prototype._initHooks = this.prototype._initHooks || [], this.prototype._initHooks.push(n), this
      };

      function k(e) {
        if (typeof L < `u` && L && L.Mixin) {
          e = _(e) ? e : [e];
          for (var t = 0; t < e.length; t++) e[t] === L.Mixin.Events && console.warn(`Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.`, Error().stack)
        }
      }
      var A = {
        on: function(e, t, n) {
          if (typeof e == `object`)
            for (var r in e) this._on(r, e[r], t);
          else {
            e = f(e);
            for (var i = 0, a = e.length; i < a; i++) this._on(e[i], t, n)
          }
          return this
        },
        off: function(e, t, n) {
          if (!arguments.length) delete this._events;
          else if (typeof e == `object`)
            for (var r in e) this._off(r, e[r], t);
          else {
            e = f(e);
            for (var i = arguments.length === 1, a = 0, o = e.length; a < o; a++) i ? this._off(e[a]) : this._off(e[a], t, n)
          }
          return this
        },
        _on: function(e, t, n, r) {
          if (typeof t != `function`) {
            console.warn(`wrong listener type: ` + typeof t);
            return
          }
          if (this._listens(e, t, n) === !1) {
            n === this && (n = void 0);
            var i = {
              fn: t,
              ctx: n
            };
            r && (i.once = !0), this._events = this._events || {}, this._events[e] = this._events[e] || [], this._events[e].push(i)
          }
        },
        _off: function(e, t, n) {
          var r, i, a;
          if (this._events && (r = this._events[e], r)) {
            if (arguments.length === 1) {
              if (this._firingCount)
                for (i = 0, a = r.length; i < a; i++) r[i].fn = l;
              delete this._events[e];
              return
            }
            if (typeof t != `function`) {
              console.warn(`wrong listener type: ` + typeof t);
              return
            }
            var o = this._listens(e, t, n);
            if (o !== !1) {
              var s = r[o];
              this._firingCount && (s.fn = l, this._events[e] = r = r.slice()), r.splice(o, 1)
            }
          }
        },
        fire: function(e, t, r) {
          if (!this.listens(e, r)) return this;
          var i = n({}, t, {
            type: e,
            target: this,
            sourceTarget: t && t.sourceTarget || this
          });
          if (this._events) {
            var a = this._events[e];
            if (a) {
              this._firingCount = this._firingCount + 1 || 1;
              for (var o = 0, s = a.length; o < s; o++) {
                var c = a[o],
                  l = c.fn;
                c.once && this.off(e, l, c.ctx), l.call(c.ctx || this, i)
              }
              this._firingCount--
            }
          }
          return r && this._propagateEvent(i), this
        },
        listens: function(e, t, n, r) {
          typeof e != `string` && console.warn(`"string" type argument expected`);
          var i = t;
          typeof t != `function` && (r = !!t, i = void 0, n = void 0);
          var a = this._events && this._events[e];
          if (a && a.length && this._listens(e, i, n) !== !1) return !0;
          if (r) {
            for (var o in this._eventParents)
              if (this._eventParents[o].listens(e, t, n, r)) return !0
          }
          return !1
        },
        _listens: function(e, t, n) {
          if (!this._events) return !1;
          var r = this._events[e] || [];
          if (!t) return !!r.length;
          n === this && (n = void 0);
          for (var i = 0, a = r.length; i < a; i++)
            if (r[i].fn === t && r[i].ctx === n) return i;
          return !1
        },
        once: function(e, t, n) {
          if (typeof e == `object`)
            for (var r in e) this._on(r, e[r], t, !0);
          else {
            e = f(e);
            for (var i = 0, a = e.length; i < a; i++) this._on(e[i], t, n, !0)
          }
          return this
        },
        addEventParent: function(e) {
          return this._eventParents = this._eventParents || {}, this._eventParents[o(e)] = e, this
        },
        removeEventParent: function(e) {
          return this._eventParents && delete this._eventParents[o(e)], this
        },
        _propagateEvent: function(e) {
          for (var t in this._eventParents) this._eventParents[t].fire(e.type, n({
            layer: e.target,
            propagatedFrom: e.target
          }, e), !0)
        }
      };
      A.addEventListener = A.on, A.removeEventListener = A.clearAllEventListeners = A.off, A.addOneTimeEventListener = A.once, A.fireEvent = A.fire, A.hasEventListeners = A.listens;
      var j = O.extend(A);

      function M(e, t, n) {
        this.x = n ? Math.round(e) : e, this.y = n ? Math.round(t) : t
      }
      var N = Math.trunc || function(e) {
        return e > 0 ? Math.floor(e) : Math.ceil(e)
      };
      M.prototype = {
        clone: function() {
          return new M(this.x, this.y)
        },
        add: function(e) {
          return this.clone()._add(P(e))
        },
        _add: function(e) {
          return this.x += e.x, this.y += e.y, this
        },
        subtract: function(e) {
          return this.clone()._subtract(P(e))
        },
        _subtract: function(e) {
          return this.x -= e.x, this.y -= e.y, this
        },
        divideBy: function(e) {
          return this.clone()._divideBy(e)
        },
        _divideBy: function(e) {
          return this.x /= e, this.y /= e, this
        },
        multiplyBy: function(e) {
          return this.clone()._multiplyBy(e)
        },
        _multiplyBy: function(e) {
          return this.x *= e, this.y *= e, this
        },
        scaleBy: function(e) {
          return new M(this.x * e.x, this.y * e.y)
        },
        unscaleBy: function(e) {
          return new M(this.x / e.x, this.y / e.y)
        },
        round: function() {
          return this.clone()._round()
        },
        _round: function() {
          return this.x = Math.round(this.x), this.y = Math.round(this.y), this
        },
        floor: function() {
          return this.clone()._floor()
        },
        _floor: function() {
          return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this
        },
        ceil: function() {
          return this.clone()._ceil()
        },
        _ceil: function() {
          return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this
        },
        trunc: function() {
          return this.clone()._trunc()
        },
        _trunc: function() {
          return this.x = N(this.x), this.y = N(this.y), this
        },
        distanceTo: function(e) {
          e = P(e);
          var t = e.x - this.x,
            n = e.y - this.y;
          return Math.sqrt(t * t + n * n)
        },
        equals: function(e) {
          return e = P(e), e.x === this.x && e.y === this.y
        },
        contains: function(e) {
          return e = P(e), Math.abs(e.x) <= Math.abs(this.x) && Math.abs(e.y) <= Math.abs(this.y)
        },
        toString: function() {
          return `Point(` + u(this.x) + `, ` + u(this.y) + `)`
        }
      };

      function P(e, t, n) {
        return e instanceof M ? e : _(e) ? new M(e[0], e[1]) : e == null ? e : typeof e == `object` && `x` in e && `y` in e ? new M(e.x, e.y) : new M(e, t, n)
      }

      function F(e, t) {
        if (e)
          for (var n = t ? [e, t] : e, r = 0, i = n.length; r < i; r++) this.extend(n[r])
      }
      F.prototype = {
        extend: function(e) {
          var t, n;
          if (!e) return this;
          if (e instanceof M || typeof e[0] == `number` || `x` in e) t = n = P(e);
          else if (e = I(e), t = e.min, n = e.max, !t || !n) return this;
          return !this.min && !this.max ? (this.min = t.clone(), this.max = n.clone()) : (this.min.x = Math.min(t.x, this.min.x), this.max.x = Math.max(n.x, this.max.x), this.min.y = Math.min(t.y, this.min.y), this.max.y = Math.max(n.y, this.max.y)), this
        },
        getCenter: function(e) {
          return P((this.min.x + this.max.x) / 2, (this.min.y + this.max.y) / 2, e)
        },
        getBottomLeft: function() {
          return P(this.min.x, this.max.y)
        },
        getTopRight: function() {
          return P(this.max.x, this.min.y)
        },
        getTopLeft: function() {
          return this.min
        },
        getBottomRight: function() {
          return this.max
        },
        getSize: function() {
          return this.max.subtract(this.min)
        },
        contains: function(e) {
          var t, n;
          return e = typeof e[0] == `number` || e instanceof M ? P(e) : I(e), e instanceof F ? (t = e.min, n = e.max) : t = n = e, t.x >= this.min.x && n.x <= this.max.x && t.y >= this.min.y && n.y <= this.max.y
        },
        intersects: function(e) {
          e = I(e);
          var t = this.min,
            n = this.max,
            r = e.min,
            i = e.max,
            a = i.x >= t.x && r.x <= n.x,
            o = i.y >= t.y && r.y <= n.y;
          return a && o
        },
        overlaps: function(e) {
          e = I(e);
          var t = this.min,
            n = this.max,
            r = e.min,
            i = e.max,
            a = i.x > t.x && r.x < n.x,
            o = i.y > t.y && r.y < n.y;
          return a && o
        },
        isValid: function() {
          return !!(this.min && this.max)
        },
        pad: function(e) {
          var t = this.min,
            n = this.max,
            r = Math.abs(t.x - n.x) * e,
            i = Math.abs(t.y - n.y) * e;
          return I(P(t.x - r, t.y - i), P(n.x + r, n.y + i))
        },
        equals: function(e) {
          return e ? (e = I(e), this.min.equals(e.getTopLeft()) && this.max.equals(e.getBottomRight())) : !1
        }
      };

      function I(e, t) {
        return !e || e instanceof F ? e : new F(e, t)
      }

      function ee(e, t) {
        if (e)
          for (var n = t ? [e, t] : e, r = 0, i = n.length; r < i; r++) this.extend(n[r])
      }
      ee.prototype = {
        extend: function(e) {
          var t = this._southWest,
            n = this._northEast,
            r, i;
          if (e instanceof z) r = e, i = e;
          else if (e instanceof ee) {
            if (r = e._southWest, i = e._northEast, !r || !i) return this
          } else return e ? this.extend(B(e) || R(e)) : this;
          return !t && !n ? (this._southWest = new z(r.lat, r.lng), this._northEast = new z(i.lat, i.lng)) : (t.lat = Math.min(r.lat, t.lat), t.lng = Math.min(r.lng, t.lng), n.lat = Math.max(i.lat, n.lat), n.lng = Math.max(i.lng, n.lng)), this
        },
        pad: function(e) {
          var t = this._southWest,
            n = this._northEast,
            r = Math.abs(t.lat - n.lat) * e,
            i = Math.abs(t.lng - n.lng) * e;
          return new ee(new z(t.lat - r, t.lng - i), new z(n.lat + r, n.lng + i))
        },
        getCenter: function() {
          return new z((this._southWest.lat + this._northEast.lat) / 2, (this._southWest.lng + this._northEast.lng) / 2)
        },
        getSouthWest: function() {
          return this._southWest
        },
        getNorthEast: function() {
          return this._northEast
        },
        getNorthWest: function() {
          return new z(this.getNorth(), this.getWest())
        },
        getSouthEast: function() {
          return new z(this.getSouth(), this.getEast())
        },
        getWest: function() {
          return this._southWest.lng
        },
        getSouth: function() {
          return this._southWest.lat
        },
        getEast: function() {
          return this._northEast.lng
        },
        getNorth: function() {
          return this._northEast.lat
        },
        contains: function(e) {
          e = typeof e[0] == `number` || e instanceof z || `lat` in e ? B(e) : R(e);
          var t = this._southWest,
            n = this._northEast,
            r, i;
          return e instanceof ee ? (r = e.getSouthWest(), i = e.getNorthEast()) : r = i = e, r.lat >= t.lat && i.lat <= n.lat && r.lng >= t.lng && i.lng <= n.lng
        },
        intersects: function(e) {
          e = R(e);
          var t = this._southWest,
            n = this._northEast,
            r = e.getSouthWest(),
            i = e.getNorthEast(),
            a = i.lat >= t.lat && r.lat <= n.lat,
            o = i.lng >= t.lng && r.lng <= n.lng;
          return a && o
        },
        overlaps: function(e) {
          e = R(e);
          var t = this._southWest,
            n = this._northEast,
            r = e.getSouthWest(),
            i = e.getNorthEast(),
            a = i.lat > t.lat && r.lat < n.lat,
            o = i.lng > t.lng && r.lng < n.lng;
          return a && o
        },
        toBBoxString: function() {
          return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(`,`)
        },
        equals: function(e, t) {
          return e ? (e = R(e), this._southWest.equals(e.getSouthWest(), t) && this._northEast.equals(e.getNorthEast(), t)) : !1
        },
        isValid: function() {
          return !!(this._southWest && this._northEast)
        }
      };

      function R(e, t) {
        return e instanceof ee ? e : new ee(e, t)
      }

      function z(e, t, n) {
        if (isNaN(e) || isNaN(t)) throw Error(`Invalid LatLng object: (` + e + `, ` + t + `)`);
        this.lat = +e, this.lng = +t, n !== void 0 && (this.alt = +n)
      }
      z.prototype = {
        equals: function(e, t) {
          return e ? (e = B(e), Math.max(Math.abs(this.lat - e.lat), Math.abs(this.lng - e.lng)) <= (t === void 0 ? 1e-9 : t)) : !1
        },
        toString: function(e) {
          return `LatLng(` + u(this.lat, e) + `, ` + u(this.lng, e) + `)`
        },
        distanceTo: function(e) {
          return H.distance(this, B(e))
        },
        wrap: function() {
          return H.wrapLatLng(this)
        },
        toBounds: function(e) {
          var t = 180 * e / 40075017,
            n = t / Math.cos(Math.PI / 180 * this.lat);
          return R([this.lat - t, this.lng - n], [this.lat + t, this.lng + n])
        },
        clone: function() {
          return new z(this.lat, this.lng, this.alt)
        }
      };

      function B(e, t, n) {
        return e instanceof z ? e : _(e) && typeof e[0] != `object` ? e.length === 3 ? new z(e[0], e[1], e[2]) : e.length === 2 ? new z(e[0], e[1]) : null : e == null ? e : typeof e == `object` && `lat` in e ? new z(e.lat, `lng` in e ? e.lng : e.lon, e.alt) : t === void 0 ? null : new z(e, t, n)
      }
      var V = {
          latLngToPoint: function(e, t) {
            var n = this.projection.project(e),
              r = this.scale(t);
            return this.transformation._transform(n, r)
          },
          pointToLatLng: function(e, t) {
            var n = this.scale(t),
              r = this.transformation.untransform(e, n);
            return this.projection.unproject(r)
          },
          project: function(e) {
            return this.projection.project(e)
          },
          unproject: function(e) {
            return this.projection.unproject(e)
          },
          scale: function(e) {
            return 256 * 2 ** e
          },
          zoom: function(e) {
            return Math.log(e / 256) / Math.LN2
          },
          getProjectedBounds: function(e) {
            if (this.infinite) return null;
            var t = this.projection.bounds,
              n = this.scale(e);
            return new F(this.transformation.transform(t.min, n), this.transformation.transform(t.max, n))
          },
          infinite: !1,
          wrapLatLng: function(e) {
            var t = this.wrapLng ? c(e.lng, this.wrapLng, !0) : e.lng,
              n = this.wrapLat ? c(e.lat, this.wrapLat, !0) : e.lat,
              r = e.alt;
            return new z(n, t, r)
          },
          wrapLatLngBounds: function(e) {
            var t = e.getCenter(),
              n = this.wrapLatLng(t),
              r = t.lat - n.lat,
              i = t.lng - n.lng;
            if (r === 0 && i === 0) return e;
            var a = e.getSouthWest(),
              o = e.getNorthEast();
            return new ee(new z(a.lat - r, a.lng - i), new z(o.lat - r, o.lng - i))
          }
        },
        H = n({}, V, {
          wrapLng: [-180, 180],
          R: 6371e3,
          distance: function(e, t) {
            var n = Math.PI / 180,
              r = e.lat * n,
              i = t.lat * n,
              a = Math.sin((t.lat - e.lat) * n / 2),
              o = Math.sin((t.lng - e.lng) * n / 2),
              s = a * a + Math.cos(r) * Math.cos(i) * o * o,
              c = 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
            return this.R * c
          }
        }),
        te = 6378137,
        U = {
          R: te,
          MAX_LATITUDE: 85.0511287798,
          project: function(e) {
            var t = Math.PI / 180,
              n = this.MAX_LATITUDE,
              r = Math.max(Math.min(n, e.lat), -n),
              i = Math.sin(r * t);
            return new M(this.R * e.lng * t, this.R * Math.log((1 + i) / (1 - i)) / 2)
          },
          unproject: function(e) {
            var t = 180 / Math.PI;
            return new z((2 * Math.atan(Math.exp(e.y / this.R)) - Math.PI / 2) * t, e.x * t / this.R)
          },
          bounds: (function() {
            var e = te * Math.PI;
            return new F([-e, -e], [e, e])
          })()
        };

      function W(e, t, n, r) {
        if (_(e)) {
          this._a = e[0], this._b = e[1], this._c = e[2], this._d = e[3];
          return
        }
        this._a = e, this._b = t, this._c = n, this._d = r
      }
      W.prototype = {
        transform: function(e, t) {
          return this._transform(e.clone(), t)
        },
        _transform: function(e, t) {
          return t ||= 1, e.x = t * (this._a * e.x + this._b), e.y = t * (this._c * e.y + this._d), e
        },
        untransform: function(e, t) {
          return t ||= 1, new M((e.x / t - this._b) / this._a, (e.y / t - this._d) / this._c)
        }
      };

      function ne(e, t, n, r) {
        return new W(e, t, n, r)
      }
      var re = n({}, H, {
          code: `EPSG:3857`,
          projection: U,
          transformation: function() {
            var e = .5 / (Math.PI * U.R);
            return ne(e, .5, -e, .5)
          }()
        }),
        ie = n({}, re, {
          code: `EPSG:900913`
        });

      function ae(e) {
        return document.createElementNS(`http://www.w3.org/2000/svg`, e)
      }

      function G(e, t) {
        for (var n = ``, r = 0, i, a = e.length, o, s, c; r < a; r++) {
          for (s = e[r], i = 0, o = s.length; i < o; i++) c = s[i], n += (i ? `L` : `M`) + c.x + ` ` + c.y;
          n += t ? Re.svg ? `z` : `x` : ``
        }
        return n || `M0 0`
      }
      var K = document.documentElement.style,
        oe = `ActiveXObject` in window,
        se = oe && !document.addEventListener,
        q = `msLaunchUri` in navigator && !(`documentMode` in document),
        ce = Le(`webkit`),
        J = Le(`android`),
        Y = Le(`android 2`) || Le(`android 3`),
        le = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10),
        X = J && Le(`Google`) && le < 537 && !(`AudioNode` in window),
        Z = !!window.opera,
        ue = !q && Le(`chrome`),
        de = Le(`gecko`) && !ce && !Z && !oe,
        fe = !ue && Le(`safari`),
        pe = Le(`phantom`),
        me = `OTransition` in K,
        he = navigator.platform.indexOf(`Win`) === 0,
        ge = oe && `transition` in K,
        _e = `WebKitCSSMatrix` in window && `m11` in new window.WebKitCSSMatrix && !Y,
        ve = `MozPerspective` in K,
        ye = !window.L_DISABLE_3D && (ge || _e || ve) && !me && !pe,
        be = typeof orientation < `u` || Le(`mobile`),
        xe = be && ce,
        Se = be && _e,
        Ce = !window.PointerEvent && window.MSPointerEvent,
        we = !!(window.PointerEvent || Ce),
        Te = `ontouchstart` in window || !!window.TouchEvent,
        Ee = !window.L_NO_TOUCH && (Te || we),
        De = be && Z,
        Oe = be && de,
        ke = (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI) > 1,
        Ae = function() {
          var e = !1;
          try {
            var t = Object.defineProperty({}, "passive", {
              get: function() {
                e = !0
              }
            });
            window.addEventListener(`testPassiveEventSupport`, l, t), window.removeEventListener(`testPassiveEventSupport`, l, t)
          } catch {}
          return e
        }(),
        je = function() {
          return !!document.createElement(`canvas`).getContext
        }(),
        Me = !!(document.createElementNS && ae(`svg`).createSVGRect),
        Ne = !!Me && (function() {
          var e = document.createElement(`div`);
          return e.innerHTML = `<svg/>`, (e.firstChild && e.firstChild.namespaceURI) === `http://www.w3.org/2000/svg`
        })(),
        Pe = !Me && function() {
          try {
            var e = document.createElement(`div`);
            e.innerHTML = `<v:shape adj="1"/>`;
            var t = e.firstChild;
            return t.style.behavior = `url(#default#VML)`, t && typeof t.adj == `object`
          } catch {
            return !1
          }
        }(),
        Fe = navigator.platform.indexOf(`Mac`) === 0,
        Ie = navigator.platform.indexOf(`Linux`) === 0;

      function Le(e) {
        return navigator.userAgent.toLowerCase().indexOf(e) >= 0
      }
      var Re = {
          ie: oe,
          ielt9: se,
          edge: q,
          webkit: ce,
          android: J,
          android23: Y,
          androidStock: X,
          opera: Z,
          chrome: ue,
          gecko: de,
          safari: fe,
          phantom: pe,
          opera12: me,
          win: he,
          ie3d: ge,
          webkit3d: _e,
          gecko3d: ve,
          any3d: ye,
          mobile: be,
          mobileWebkit: xe,
          mobileWebkit3d: Se,
          msPointer: Ce,
          pointer: we,
          touch: Ee,
          touchNative: Te,
          mobileOpera: De,
          mobileGecko: Oe,
          retina: ke,
          passiveEvents: Ae,
          canvas: je,
          svg: Me,
          vml: Pe,
          inlineSvg: Ne,
          mac: Fe,
          linux: Ie
        },
        ze = Re.msPointer ? `MSPointerDown` : `pointerdown`,
        Be = Re.msPointer ? `MSPointerMove` : `pointermove`,
        Ve = Re.msPointer ? `MSPointerUp` : `pointerup`,
        He = Re.msPointer ? `MSPointerCancel` : `pointercancel`,
        Ue = {
          touchstart: ze,
          touchmove: Be,
          touchend: Ve,
          touchcancel: He
        },
        We = {
          touchstart: et,
          touchmove: $e,
          touchend: $e,
          touchcancel: $e
        },
        Ge = {},
        Ke = !1;

      function qe(e, t, n) {
        return t === `touchstart` && Qe(), We[t] ? (n = We[t].bind(this, n), e.addEventListener(Ue[t], n, !1), n) : (console.warn(`wrong event specified:`, t), l)
      }

      function Je(e, t, n) {
        if (!Ue[t]) {
          console.warn(`wrong event specified:`, t);
          return
        }
        e.removeEventListener(Ue[t], n, !1)
      }

      function Ye(e) {
        Ge[e.pointerId] = e
      }

      function Xe(e) {
        Ge[e.pointerId] && (Ge[e.pointerId] = e)
      }

      function Ze(e) {
        delete Ge[e.pointerId]
      }

      function Qe() {
        Ke ||= (document.addEventListener(ze, Ye, !0), document.addEventListener(Be, Xe, !0), document.addEventListener(Ve, Ze, !0), document.addEventListener(He, Ze, !0), !0)
      }

      function $e(e, t) {
        if (t.pointerType !== (t.MSPOINTER_TYPE_MOUSE || `mouse`)) {
          for (var n in t.touches = [], Ge) t.touches.push(Ge[n]);
          t.changedTouches = [t], e(t)
        }
      }

      function et(e, t) {
        t.MSPOINTER_TYPE_TOUCH && t.pointerType === t.MSPOINTER_TYPE_TOUCH && Yt(t), $e(e, t)
      }

      function tt(e) {
        var t = {},
          n, r;
        for (r in e) n = e[r], t[r] = n && n.bind ? n.bind(e) : n;
        return e = t, t.type = `dblclick`, t.detail = 2, t.isTrusted = !1, t._simulated = !0, t
      }
      var nt = 200;

      function rt(e, t) {
        e.addEventListener(`dblclick`, t);
        var n = 0,
          r;

        function i(e) {
          if (e.detail !== 1) {
            r = e.detail;
            return
          }
          if (!(e.pointerType === `mouse` || e.sourceCapabilities && !e.sourceCapabilities.firesTouchEvents)) {
            var i = Zt(e);
            if (!i.some(function(e) {
                return e instanceof HTMLLabelElement && e.attributes.for
              }) || i.some(function(e) {
                return e instanceof HTMLInputElement || e instanceof HTMLSelectElement
              })) {
              var a = Date.now();
              a - n <= nt ? (r++, r === 2 && t(tt(e))) : r = 1, n = a
            }
          }
        }
        return e.addEventListener(`click`, i), {
          dblclick: t,
          simDblclick: i
        }
      }

      function it(e, t) {
        e.removeEventListener(`dblclick`, t.dblclick), e.removeEventListener(`click`, t.simDblclick)
      }
      var at = St([`transform`, `webkitTransform`, `OTransform`, `MozTransform`, `msTransform`]),
        ot = St([`webkitTransition`, `transition`, `OTransition`, `MozTransition`, `msTransition`]),
        st = ot === `webkitTransition` || ot === `OTransition` ? ot + `End` : `transitionend`;

      function ct(e) {
        return typeof e == `string` ? document.getElementById(e) : e
      }

      function lt(e, t) {
        var n = e.style[t] || e.currentStyle && e.currentStyle[t];
        if ((!n || n === `auto`) && document.defaultView) {
          var r = document.defaultView.getComputedStyle(e, null);
          n = r ? r[t] : null
        }
        return n === `auto` ? null : n
      }

      function ut(e, t, n) {
        var r = document.createElement(e);
        return r.className = t || ``, n && n.appendChild(r), r
      }

      function dt(e) {
        var t = e.parentNode;
        t && t.removeChild(e)
      }

      function ft(e) {
        for (; e.firstChild;) e.removeChild(e.firstChild)
      }

      function pt(e) {
        var t = e.parentNode;
        t && t.lastChild !== e && t.appendChild(e)
      }

      function mt(e) {
        var t = e.parentNode;
        t && t.firstChild !== e && t.insertBefore(e, t.firstChild)
      }

      function ht(e, t) {
        if (e.classList !== void 0) return e.classList.contains(t);
        var n = yt(e);
        return n.length > 0 && RegExp(`(^|\\s)` + t + `(\\s|$)`).test(n)
      }

      function gt(e, t) {
        if (e.classList !== void 0)
          for (var n = f(t), r = 0, i = n.length; r < i; r++) e.classList.add(n[r]);
        else if (!ht(e, t)) {
          var a = yt(e);
          vt(e, (a ? a + ` ` : ``) + t)
        }
      }

      function _t(e, t) {
        e.classList === void 0 ? vt(e, d((` ` + yt(e) + ` `).replace(` ` + t + ` `, ` `))) : e.classList.remove(t)
      }

      function vt(e, t) {
        e.className.baseVal === void 0 ? e.className = t : e.className.baseVal = t
      }

      function yt(e) {
        return e.correspondingElement && (e = e.correspondingElement), e.className.baseVal === void 0 ? e.className : e.className.baseVal
      }

      function bt(e, t) {
        `opacity` in e.style ? e.style.opacity = t : `filter` in e.style && xt(e, t)
      }

      function xt(e, t) {
        var n = !1,
          r = `DXImageTransform.Microsoft.Alpha`;
        try {
          n = e.filters.item(r)
        } catch {
          if (t === 1) return
        }
        t = Math.round(t * 100), n ? (n.Enabled = t !== 100, n.Opacity = t) : e.style.filter += ` progid:` + r + `(opacity=` + t + `)`
      }

      function St(e) {
        for (var t = document.documentElement.style, n = 0; n < e.length; n++)
          if (e[n] in t) return e[n];
        return !1
      }

      function Ct(e, t, n) {
        var r = t || new M(0, 0);
        e.style[at] = (Re.ie3d ? `translate(` + r.x + `px,` + r.y + `px)` : `translate3d(` + r.x + `px,` + r.y + `px,0)`) + (n ? ` scale(` + n + `)` : ``)
      }

      function wt(e, t) {
        e._leaflet_pos = t, Re.any3d ? Ct(e, t) : (e.style.left = t.x + `px`, e.style.top = t.y + `px`)
      }

      function Tt(e) {
        return e._leaflet_pos || new M(0, 0)
      }
      var Et, Dt, Ot;
      if (`onselectstart` in document) Et = function() {
        zt(window, `selectstart`, Yt)
      }, Dt = function() {
        Vt(window, `selectstart`, Yt)
      };
      else {
        var kt = St([`userSelect`, `WebkitUserSelect`, `OUserSelect`, `MozUserSelect`, `msUserSelect`]);
        Et = function() {
          if (kt) {
            var e = document.documentElement.style;
            Ot = e[kt], e[kt] = `none`
          }
        }, Dt = function() {
          kt && (document.documentElement.style[kt] = Ot, Ot = void 0)
        }
      }

      function At() {
        zt(window, `dragstart`, Yt)
      }

      function jt() {
        Vt(window, `dragstart`, Yt)
      }
      var Mt, Nt;

      function Pt(e) {
        for (; e.tabIndex === -1;) e = e.parentNode;
        e.style && (Ft(), Mt = e, Nt = e.style.outlineStyle, e.style.outlineStyle = `none`, zt(window, `keydown`, Ft))
      }

      function Ft() {
        Mt && (Mt.style.outlineStyle = Nt, Mt = void 0, Nt = void 0, Vt(window, `keydown`, Ft))
      }

      function It(e) {
        do e = e.parentNode; while ((!e.offsetWidth || !e.offsetHeight) && e !== document.body);
        return e
      }

      function Lt(e) {
        var t = e.getBoundingClientRect();
        return {
          x: t.width / e.offsetWidth || 1,
          y: t.height / e.offsetHeight || 1,
          boundingClientRect: t
        }
      }
      var Rt = {
        __proto__: null,
        TRANSFORM: at,
        TRANSITION: ot,
        TRANSITION_END: st,
        get: ct,
        getStyle: lt,
        create: ut,
        remove: dt,
        empty: ft,
        toFront: pt,
        toBack: mt,
        hasClass: ht,
        addClass: gt,
        removeClass: _t,
        setClass: vt,
        getClass: yt,
        setOpacity: bt,
        testProp: St,
        setTransform: Ct,
        setPosition: wt,
        getPosition: Tt,
        get disableTextSelection() {
          return Et
        },
        get enableTextSelection() {
          return Dt
        },
        disableImageDrag: At,
        enableImageDrag: jt,
        preventOutline: Pt,
        restoreOutline: Ft,
        getSizedParentNode: It,
        getScale: Lt
      };

      function zt(e, t, n, r) {
        if (t && typeof t == `object`)
          for (var i in t) Wt(e, i, t[i], n);
        else {
          t = f(t);
          for (var a = 0, o = t.length; a < o; a++) Wt(e, t[a], n, r)
        }
        return this
      }
      var Bt = `_leaflet_events`;

      function Vt(e, t, n, r) {
        if (arguments.length === 1) Ht(e), delete e[Bt];
        else if (t && typeof t == `object`)
          for (var i in t) Gt(e, i, t[i], n);
        else if (t = f(t), arguments.length === 2) Ht(e, function(e) {
          return v(t, e) !== -1
        });
        else
          for (var a = 0, o = t.length; a < o; a++) Gt(e, t[a], n, r);
        return this
      }

      function Ht(e, t) {
        for (var n in e[Bt]) {
          var r = n.split(/\d/)[0];
          (!t || t(r)) && Gt(e, r, null, null, n)
        }
      }
      var Ut = {
        mouseenter: `mouseover`,
        mouseleave: `mouseout`,
        wheel: !(`onwheel` in window) && `mousewheel`
      };

      function Wt(e, t, n, r) {
        var i = t + o(n) + (r ? `_` + o(r) : ``);
        if (e[Bt] && e[Bt][i]) return this;
        var a = function(t) {
            return n.call(r || e, t || window.event)
          },
          s = a;
        !Re.touchNative && Re.pointer && t.indexOf(`touch`) === 0 ? a = qe(e, t, a) : Re.touch && t === `dblclick` ? a = rt(e, a) : `addEventListener` in e ? t === `touchstart` || t === `touchmove` || t === `wheel` || t === `mousewheel` ? e.addEventListener(Ut[t] || t, a, Re.passiveEvents ? {
          passive: !1
        } : !1) : t === `mouseenter` || t === `mouseleave` ? (a = function(t) {
          t ||= window.event, tn(e, t) && s(t)
        }, e.addEventListener(Ut[t], a, !1)) : e.addEventListener(t, s, !1) : e.attachEvent(`on` + t, a), e[Bt] = e[Bt] || {}, e[Bt][i] = a
      }

      function Gt(e, t, n, r, i) {
        i ||= t + o(n) + (r ? `_` + o(r) : ``);
        var a = e[Bt] && e[Bt][i];
        if (!a) return this;
        !Re.touchNative && Re.pointer && t.indexOf(`touch`) === 0 ? Je(e, t, a) : Re.touch && t === `dblclick` ? it(e, a) : `removeEventListener` in e ? e.removeEventListener(Ut[t] || t, a, !1) : e.detachEvent(`on` + t, a), e[Bt][i] = null
      }

      function Kt(e) {
        return e.stopPropagation ? e.stopPropagation() : e.originalEvent ? e.originalEvent._stopped = !0 : e.cancelBubble = !0, this
      }

      function qt(e) {
        return Wt(e, `wheel`, Kt), this
      }

      function Jt(e) {
        return zt(e, `mousedown touchstart dblclick contextmenu`, Kt), e._leaflet_disable_click = !0, this
      }

      function Yt(e) {
        return e.preventDefault ? e.preventDefault() : e.returnValue = !1, this
      }

      function Xt(e) {
        return Yt(e), Kt(e), this
      }

      function Zt(e) {
        if (e.composedPath) return e.composedPath();
        for (var t = [], n = e.target; n;) t.push(n), n = n.parentNode;
        return t
      }

      function Qt(e, t) {
        if (!t) return new M(e.clientX, e.clientY);
        var n = Lt(t),
          r = n.boundingClientRect;
        return new M((e.clientX - r.left) / n.x - t.clientLeft, (e.clientY - r.top) / n.y - t.clientTop)
      }
      var $t = Re.linux && Re.chrome ? window.devicePixelRatio : Re.mac ? window.devicePixelRatio * 3 : window.devicePixelRatio > 0 ? 2 * window.devicePixelRatio : 1;

      function en(e) {
        return Re.edge ? e.wheelDeltaY / 2 : e.deltaY && e.deltaMode === 0 ? -e.deltaY / $t : e.deltaY && e.deltaMode === 1 ? -e.deltaY * 20 : e.deltaY && e.deltaMode === 2 ? -e.deltaY * 60 : e.deltaX || e.deltaZ ? 0 : e.wheelDelta ? (e.wheelDeltaY || e.wheelDelta) / 2 : e.detail && Math.abs(e.detail) < 32765 ? -e.detail * 20 : e.detail ? e.detail / -32765 * 60 : 0
      }

      function tn(e, t) {
        var n = t.relatedTarget;
        if (!n) return !0;
        try {
          for (; n && n !== e;) n = n.parentNode
        } catch {
          return !1
        }
        return n !== e
      }
      var nn = {
          __proto__: null,
          on: zt,
          off: Vt,
          stopPropagation: Kt,
          disableScrollPropagation: qt,
          disableClickPropagation: Jt,
          preventDefault: Yt,
          stop: Xt,
          getPropagationPath: Zt,
          getMousePosition: Qt,
          getWheelDelta: en,
          isExternalTarget: tn,
          addListener: zt,
          removeListener: Vt
        },
        rn = j.extend({
          run: function(e, t, n, r) {
            this.stop(), this._el = e, this._inProgress = !0, this._duration = n || .25, this._easeOutPower = 1 / Math.max(r || .5, .2), this._startPos = Tt(e), this._offset = t.subtract(this._startPos), this._startTime = +new Date, this.fire(`start`), this._animate()
          },
          stop: function() {
            this._inProgress && (this._step(!0), this._complete())
          },
          _animate: function() {
            this._animId = T(this._animate, this), this._step()
          },
          _step: function(e) {
            var t = +new Date - this._startTime,
              n = this._duration * 1e3;
            t < n ? this._runFrame(this._easeOut(t / n), e) : (this._runFrame(1), this._complete())
          },
          _runFrame: function(e, t) {
            var n = this._startPos.add(this._offset.multiplyBy(e));
            t && n._round(), wt(this._el, n), this.fire(`step`)
          },
          _complete: function() {
            E(this._animId), this._inProgress = !1, this.fire(`end`)
          },
          _easeOut: function(e) {
            return 1 - (1 - e) ** this._easeOutPower
          }
        }),
        an = j.extend({
          options: {
            crs: re,
            center: void 0,
            zoom: void 0,
            minZoom: void 0,
            maxZoom: void 0,
            layers: [],
            maxBounds: void 0,
            renderer: void 0,
            zoomAnimation: !0,
            zoomAnimationThreshold: 4,
            fadeAnimation: !0,
            markerZoomAnimation: !0,
            transform3DLimit: 8388608,
            zoomSnap: 1,
            zoomDelta: 1,
            trackResize: !0
          },
          initialize: function(e, t) {
            t = p(this, t), this._handlers = [], this._layers = {}, this._zoomBoundLayers = {}, this._sizeChanged = !0, this._initContainer(e), this._initLayout(), this._onResize = i(this._onResize, this), this._initEvents(), t.maxBounds && this.setMaxBounds(t.maxBounds), t.zoom !== void 0 && (this._zoom = this._limitZoom(t.zoom)), t.center && t.zoom !== void 0 && this.setView(B(t.center), t.zoom, {
              reset: !0
            }), this.callInitHooks(), this._zoomAnimated = ot && Re.any3d && !Re.mobileOpera && this.options.zoomAnimation, this._zoomAnimated && (this._createAnimProxy(), zt(this._proxy, st, this._catchTransitionEnd, this)), this._addLayers(this.options.layers)
          },
          setView: function(e, t, r) {
            return t = t === void 0 ? this._zoom : this._limitZoom(t), e = this._limitCenter(B(e), t, this.options.maxBounds), r ||= {}, this._stop(), this._loaded && !r.reset && r !== !0 && (r.animate !== void 0 && (r.zoom = n({
              animate: r.animate
            }, r.zoom), r.pan = n({
              animate: r.animate,
              duration: r.duration
            }, r.pan)), this._zoom === t ? this._tryAnimatedPan(e, r.pan) : this._tryAnimatedZoom && this._tryAnimatedZoom(e, t, r.zoom)) ? (clearTimeout(this._sizeTimer), this) : (this._resetView(e, t, r.pan && r.pan.noMoveStart), this)
          },
          setZoom: function(e, t) {
            return this._loaded ? this.setView(this.getCenter(), e, {
              zoom: t
            }) : (this._zoom = e, this)
          },
          zoomIn: function(e, t) {
            return e ||= Re.any3d ? this.options.zoomDelta : 1, this.setZoom(this._zoom + e, t)
          },
          zoomOut: function(e, t) {
            return e ||= Re.any3d ? this.options.zoomDelta : 1, this.setZoom(this._zoom - e, t)
          },
          setZoomAround: function(e, t, n) {
            var r = this.getZoomScale(t),
              i = this.getSize().divideBy(2),
              a = (e instanceof M ? e : this.latLngToContainerPoint(e)).subtract(i).multiplyBy(1 - 1 / r),
              o = this.containerPointToLatLng(i.add(a));
            return this.setView(o, t, {
              zoom: n
            })
          },
          _getBoundsCenterZoom: function(e, t) {
            t ||= {}, e = e.getBounds ? e.getBounds() : R(e);
            var n = P(t.paddingTopLeft || t.padding || [0, 0]),
              r = P(t.paddingBottomRight || t.padding || [0, 0]),
              i = this.getBoundsZoom(e, !1, n.add(r));
            if (i = typeof t.maxZoom == `number` ? Math.min(t.maxZoom, i) : i, i === 1 / 0) return {
              center: e.getCenter(),
              zoom: i
            };
            var a = r.subtract(n).divideBy(2),
              o = this.project(e.getSouthWest(), i),
              s = this.project(e.getNorthEast(), i);
            return {
              center: this.unproject(o.add(s).divideBy(2).add(a), i),
              zoom: i
            }
          },
          fitBounds: function(e, t) {
            if (e = R(e), !e.isValid()) throw Error(`Bounds are not valid.`);
            var n = this._getBoundsCenterZoom(e, t);
            return this.setView(n.center, n.zoom, t)
          },
          fitWorld: function(e) {
            return this.fitBounds([
              [-90, -180],
              [90, 180]
            ], e)
          },
          panTo: function(e, t) {
            return this.setView(e, this._zoom, {
              pan: t
            })
          },
          panBy: function(e, t) {
            if (e = P(e).round(), t ||= {}, !e.x && !e.y) return this.fire(`moveend`);
            if (t.animate !== !0 && !this.getSize().contains(e)) return this._resetView(this.unproject(this.project(this.getCenter()).add(e)), this.getZoom()), this;
            if (this._panAnim || (this._panAnim = new rn, this._panAnim.on({
                step: this._onPanTransitionStep,
                end: this._onPanTransitionEnd
              }, this)), t.noMoveStart || this.fire(`movestart`), t.animate !== !1) {
              gt(this._mapPane, `leaflet-pan-anim`);
              var n = this._getMapPanePos().subtract(e).round();
              this._panAnim.run(this._mapPane, n, t.duration || .25, t.easeLinearity)
            } else this._rawPanBy(e), this.fire(`move`).fire(`moveend`);
            return this
          },
          flyTo: function(e, t, n) {
            if (n ||= {}, n.animate === !1 || !Re.any3d) return this.setView(e, t, n);
            this._stop();
            var r = this.project(this.getCenter()),
              i = this.project(e),
              a = this.getSize(),
              o = this._zoom;
            e = B(e), t = t === void 0 ? o : t;
            var s = Math.max(a.x, a.y),
              c = s * this.getZoomScale(o, t),
              l = i.distanceTo(r) || 1,
              u = 1.42,
              d = u * u;

            function f(e) {
              var t = e ? -1 : 1,
                n = e ? c : s,
                r = (c * c - s * s + t * d * d * l * l) / (2 * n * d * l),
                i = Math.sqrt(r * r + 1) - r;
              return i < 1e-9 ? -18 : Math.log(i)
            }

            function p(e) {
              return (Math.exp(e) - Math.exp(-e)) / 2
            }

            function m(e) {
              return (Math.exp(e) + Math.exp(-e)) / 2
            }

            function h(e) {
              return p(e) / m(e)
            }
            var g = f(0);

            function _(e) {
              return s * (m(g) / m(g + u * e))
            }

            function v(e) {
              return s * (m(g) * h(g + u * e) - p(g)) / d
            }

            function y(e) {
              return 1 - (1 - e) ** 1.5
            }
            var b = Date.now(),
              x = (f(1) - g) / u,
              S = n.duration ? 1e3 * n.duration : 1e3 * x * .8;

            function C() {
              var n = (Date.now() - b) / S,
                a = y(n) * x;
              n <= 1 ? (this._flyToFrame = T(C, this), this._move(this.unproject(r.add(i.subtract(r).multiplyBy(v(a) / l)), o), this.getScaleZoom(s / _(a), o), {
                flyTo: !0
              })) : this._move(e, t)._moveEnd(!0)
            }
            return this._moveStart(!0, n.noMoveStart), C.call(this), this
          },
          flyToBounds: function(e, t) {
            var n = this._getBoundsCenterZoom(e, t);
            return this.flyTo(n.center, n.zoom, t)
          },
          setMaxBounds: function(e) {
            return e = R(e), this.listens(`moveend`, this._panInsideMaxBounds) && this.off(`moveend`, this._panInsideMaxBounds), e.isValid() ? (this.options.maxBounds = e, this._loaded && this._panInsideMaxBounds(), this.on(`moveend`, this._panInsideMaxBounds)) : (this.options.maxBounds = null, this)
          },
          setMinZoom: function(e) {
            var t = this.options.minZoom;
            return this.options.minZoom = e, this._loaded && t !== e && (this.fire(`zoomlevelschange`), this.getZoom() < this.options.minZoom) ? this.setZoom(e) : this
          },
          setMaxZoom: function(e) {
            var t = this.options.maxZoom;
            return this.options.maxZoom = e, this._loaded && t !== e && (this.fire(`zoomlevelschange`), this.getZoom() > this.options.maxZoom) ? this.setZoom(e) : this
          },
          panInsideBounds: function(e, t) {
            this._enforcingBounds = !0;
            var n = this.getCenter(),
              r = this._limitCenter(n, this._zoom, R(e));
            return n.equals(r) || this.panTo(r, t), this._enforcingBounds = !1, this
          },
          panInside: function(e, t) {
            t ||= {};
            var n = P(t.paddingTopLeft || t.padding || [0, 0]),
              r = P(t.paddingBottomRight || t.padding || [0, 0]),
              i = this.project(this.getCenter()),
              a = this.project(e),
              o = this.getPixelBounds(),
              s = I([o.min.add(n), o.max.subtract(r)]),
              c = s.getSize();
            if (!s.contains(a)) {
              this._enforcingBounds = !0;
              var l = a.subtract(s.getCenter()),
                u = s.extend(a).getSize().subtract(c);
              i.x += l.x < 0 ? -u.x : u.x, i.y += l.y < 0 ? -u.y : u.y, this.panTo(this.unproject(i), t), this._enforcingBounds = !1
            }
            return this
          },
          invalidateSize: function(e) {
            if (!this._loaded) return this;
            e = n({
              animate: !1,
              pan: !0
            }, e === !0 ? {
              animate: !0
            } : e);
            var t = this.getSize();
            this._sizeChanged = !0, this._lastCenter = null;
            var r = this.getSize(),
              a = t.divideBy(2).round(),
              o = r.divideBy(2).round(),
              s = a.subtract(o);
            return !s.x && !s.y ? this : (e.animate && e.pan ? this.panBy(s) : (e.pan && this._rawPanBy(s), this.fire(`move`), e.debounceMoveend ? (clearTimeout(this._sizeTimer), this._sizeTimer = setTimeout(i(this.fire, this, `moveend`), 200)) : this.fire(`moveend`)), this.fire(`resize`, {
              oldSize: t,
              newSize: r
            }))
          },
          stop: function() {
            return this.setZoom(this._limitZoom(this._zoom)), this.options.zoomSnap || this.fire(`viewreset`), this._stop()
          },
          locate: function(e) {
            if (e = this._locateOptions = n({
                timeout: 1e4,
                watch: !1
              }, e), !(`geolocation` in navigator)) return this._handleGeolocationError({
              code: 0,
              message: `Geolocation not supported.`
            }), this;
            var t = i(this._handleGeolocationResponse, this),
              r = i(this._handleGeolocationError, this);
            return e.watch ? this._locationWatchId = navigator.geolocation.watchPosition(t, r, e) : navigator.geolocation.getCurrentPosition(t, r, e), this
          },
          stopLocate: function() {
            return navigator.geolocation && navigator.geolocation.clearWatch && navigator.geolocation.clearWatch(this._locationWatchId), this._locateOptions && (this._locateOptions.setView = !1), this
          },
          _handleGeolocationError: function(e) {
            if (this._container._leaflet_id) {
              var t = e.code,
                n = e.message || (t === 1 ? `permission denied` : t === 2 ? `position unavailable` : `timeout`);
              this._locateOptions.setView && !this._loaded && this.fitWorld(), this.fire(`locationerror`, {
                code: t,
                message: `Geolocation error: ` + n + `.`
              })
            }
          },
          _handleGeolocationResponse: function(e) {
            if (this._container._leaflet_id) {
              var t = e.coords.latitude,
                n = e.coords.longitude,
                r = new z(t, n),
                i = r.toBounds(e.coords.accuracy * 2),
                a = this._locateOptions;
              if (a.setView) {
                var o = this.getBoundsZoom(i);
                this.setView(r, a.maxZoom ? Math.min(o, a.maxZoom) : o)
              }
              var s = {
                latlng: r,
                bounds: i,
                timestamp: e.timestamp
              };
              for (var c in e.coords) typeof e.coords[c] == `number` && (s[c] = e.coords[c]);
              this.fire(`locationfound`, s)
            }
          },
          addHandler: function(e, t) {
            if (!t) return this;
            var n = this[e] = new t(this);
            return this._handlers.push(n), this.options[e] && n.enable(), this
          },
          remove: function() {
            if (this._initEvents(!0), this.options.maxBounds && this.off(`moveend`, this._panInsideMaxBounds), this._containerId !== this._container._leaflet_id) throw Error(`Map container is being reused by another instance`);
            try {
              delete this._container._leaflet_id, delete this._containerId
            } catch {
              this._container._leaflet_id = void 0, this._containerId = void 0
            }
            for (var e in this._locationWatchId !== void 0 && this.stopLocate(), this._stop(), dt(this._mapPane), this._clearControlPos && this._clearControlPos(), this._resizeRequest &&= (E(this._resizeRequest), null), this._clearHandlers(), this._loaded && this.fire(`unload`), this._layers) this._layers[e].remove();
            for (e in this._panes) dt(this._panes[e]);
            return this._layers = [], this._panes = [], delete this._mapPane, delete this._renderer, this
          },
          createPane: function(e, t) {
            var n = ut(`div`, `leaflet-pane` + (e ? ` leaflet-` + e.replace(`Pane`, ``) + `-pane` : ``), t || this._mapPane);
            return e && (this._panes[e] = n), n
          },
          getCenter: function() {
            return this._checkIfLoaded(), this._lastCenter && !this._moved() ? this._lastCenter.clone() : this.layerPointToLatLng(this._getCenterLayerPoint())
          },
          getZoom: function() {
            return this._zoom
          },
          getBounds: function() {
            var e = this.getPixelBounds();
            return new ee(this.unproject(e.getBottomLeft()), this.unproject(e.getTopRight()))
          },
          getMinZoom: function() {
            return this.options.minZoom === void 0 ? this._layersMinZoom || 0 : this.options.minZoom
          },
          getMaxZoom: function() {
            return this.options.maxZoom === void 0 ? this._layersMaxZoom === void 0 ? 1 / 0 : this._layersMaxZoom : this.options.maxZoom
          },
          getBoundsZoom: function(e, t, n) {
            e = R(e), n = P(n || [0, 0]);
            var r = this.getZoom() || 0,
              i = this.getMinZoom(),
              a = this.getMaxZoom(),
              o = e.getNorthWest(),
              s = e.getSouthEast(),
              c = this.getSize().subtract(n),
              l = I(this.project(s, r), this.project(o, r)).getSize(),
              u = Re.any3d ? this.options.zoomSnap : 1,
              d = c.x / l.x,
              f = c.y / l.y,
              p = t ? Math.max(d, f) : Math.min(d, f);
            return r = this.getScaleZoom(p, r), u && (r = Math.round(r / (u / 100)) * (u / 100), r = t ? Math.ceil(r / u) * u : Math.floor(r / u) * u), Math.max(i, Math.min(a, r))
          },
          getSize: function() {
            return (!this._size || this._sizeChanged) && (this._size = new M(this._container.clientWidth || 0, this._container.clientHeight || 0), this._sizeChanged = !1), this._size.clone()
          },
          getPixelBounds: function(e, t) {
            var n = this._getTopLeftPoint(e, t);
            return new F(n, n.add(this.getSize()))
          },
          getPixelOrigin: function() {
            return this._checkIfLoaded(), this._pixelOrigin
          },
          getPixelWorldBounds: function(e) {
            return this.options.crs.getProjectedBounds(e === void 0 ? this.getZoom() : e)
          },
          getPane: function(e) {
            return typeof e == `string` ? this._panes[e] : e
          },
          getPanes: function() {
            return this._panes
          },
          getContainer: function() {
            return this._container
          },
          getZoomScale: function(e, t) {
            var n = this.options.crs;
            return t = t === void 0 ? this._zoom : t, n.scale(e) / n.scale(t)
          },
          getScaleZoom: function(e, t) {
            var n = this.options.crs;
            t = t === void 0 ? this._zoom : t;
            var r = n.zoom(e * n.scale(t));
            return isNaN(r) ? 1 / 0 : r
          },
          project: function(e, t) {
            return t = t === void 0 ? this._zoom : t, this.options.crs.latLngToPoint(B(e), t)
          },
          unproject: function(e, t) {
            return t = t === void 0 ? this._zoom : t, this.options.crs.pointToLatLng(P(e), t)
          },
          layerPointToLatLng: function(e) {
            var t = P(e).add(this.getPixelOrigin());
            return this.unproject(t)
          },
          latLngToLayerPoint: function(e) {
            return this.project(B(e))._round()._subtract(this.getPixelOrigin())
          },
          wrapLatLng: function(e) {
            return this.options.crs.wrapLatLng(B(e))
          },
          wrapLatLngBounds: function(e) {
            return this.options.crs.wrapLatLngBounds(R(e))
          },
          distance: function(e, t) {
            return this.options.crs.distance(B(e), B(t))
          },
          containerPointToLayerPoint: function(e) {
            return P(e).subtract(this._getMapPanePos())
          },
          layerPointToContainerPoint: function(e) {
            return P(e).add(this._getMapPanePos())
          },
          containerPointToLatLng: function(e) {
            var t = this.containerPointToLayerPoint(P(e));
            return this.layerPointToLatLng(t)
          },
          latLngToContainerPoint: function(e) {
            return this.layerPointToContainerPoint(this.latLngToLayerPoint(B(e)))
          },
          mouseEventToContainerPoint: function(e) {
            return Qt(e, this._container)
          },
          mouseEventToLayerPoint: function(e) {
            return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(e))
          },
          mouseEventToLatLng: function(e) {
            return this.layerPointToLatLng(this.mouseEventToLayerPoint(e))
          },
          _initContainer: function(e) {
            var t = this._container = ct(e);
            if (!t) throw Error(`Map container not found.`);
            if (t._leaflet_id) throw Error(`Map container is already initialized.`);
            zt(t, `scroll`, this._onScroll, this), this._containerId = o(t)
          },
          _initLayout: function() {
            var e = this._container;
            this._fadeAnimated = this.options.fadeAnimation && Re.any3d, gt(e, `leaflet-container` + (Re.touch ? ` leaflet-touch` : ``) + (Re.retina ? ` leaflet-retina` : ``) + (Re.ielt9 ? ` leaflet-oldie` : ``) + (Re.safari ? ` leaflet-safari` : ``) + (this._fadeAnimated ? ` leaflet-fade-anim` : ``));
            var t = lt(e, `position`);
            t !== `absolute` && t !== `relative` && t !== `fixed` && t !== `sticky` && (e.style.position = `relative`), this._initPanes(), this._initControlPos && this._initControlPos()
          },
          _initPanes: function() {
            var e = this._panes = {};
            this._paneRenderers = {}, this._mapPane = this.createPane(`mapPane`, this._container), wt(this._mapPane, new M(0, 0)), this.createPane(`tilePane`), this.createPane(`overlayPane`), this.createPane(`shadowPane`), this.createPane(`markerPane`), this.createPane(`tooltipPane`), this.createPane(`popupPane`), this.options.markerZoomAnimation || (gt(e.markerPane, `leaflet-zoom-hide`), gt(e.shadowPane, `leaflet-zoom-hide`))
          },
          _resetView: function(e, t, n) {
            wt(this._mapPane, new M(0, 0));
            var r = !this._loaded;
            this._loaded = !0, t = this._limitZoom(t), this.fire(`viewprereset`);
            var i = this._zoom !== t;
            this._moveStart(i, n)._move(e, t)._moveEnd(i), this.fire(`viewreset`), r && this.fire(`load`)
          },
          _moveStart: function(e, t) {
            return e && this.fire(`zoomstart`), t || this.fire(`movestart`), this
          },
          _move: function(e, t, n, r) {
            t === void 0 && (t = this._zoom);
            var i = this._zoom !== t;
            return this._zoom = t, this._lastCenter = e, this._pixelOrigin = this._getNewPixelOrigin(e), r ? n && n.pinch && this.fire(`zoom`, n) : ((i || n && n.pinch) && this.fire(`zoom`, n), this.fire(`move`, n)), this
          },
          _moveEnd: function(e) {
            return e && this.fire(`zoomend`), this.fire(`moveend`)
          },
          _stop: function() {
            return E(this._flyToFrame), this._panAnim && this._panAnim.stop(), this
          },
          _rawPanBy: function(e) {
            wt(this._mapPane, this._getMapPanePos().subtract(e))
          },
          _getZoomSpan: function() {
            return this.getMaxZoom() - this.getMinZoom()
          },
          _panInsideMaxBounds: function() {
            this._enforcingBounds || this.panInsideBounds(this.options.maxBounds)
          },
          _checkIfLoaded: function() {
            if (!this._loaded) throw Error(`Set map center and zoom first.`)
          },
          _initEvents: function(e) {
            this._targets = {}, this._targets[o(this._container)] = this;
            var t = e ? Vt : zt;
            t(this._container, `click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup`, this._handleDOMEvent, this), this.options.trackResize && t(window, `resize`, this._onResize, this), Re.any3d && this.options.transform3DLimit && (e ? this.off : this.on).call(this, `moveend`, this._onMoveEnd)
          },
          _onResize: function() {
            E(this._resizeRequest), this._resizeRequest = T(function() {
              this.invalidateSize({
                debounceMoveend: !0
              })
            }, this)
          },
          _onScroll: function() {
            this._container.scrollTop = 0, this._container.scrollLeft = 0
          },
          _onMoveEnd: function() {
            var e = this._getMapPanePos();
            Math.max(Math.abs(e.x), Math.abs(e.y)) >= this.options.transform3DLimit && this._resetView(this.getCenter(), this.getZoom())
          },
          _findEventTargets: function(e, t) {
            for (var n = [], r, i = t === `mouseout` || t === `mouseover`, a = e.target || e.srcElement, s = !1; a;) {
              if (r = this._targets[o(a)], r && (t === `click` || t === `preclick`) && this._draggableMoved(r)) {
                s = !0;
                break
              }
              if (r && r.listens(t, !0) && (i && !tn(a, e) || (n.push(r), i)) || a === this._container) break;
              a = a.parentNode
            }
            return !n.length && !s && !i && this.listens(t, !0) && (n = [this]), n
          },
          _isClickDisabled: function(e) {
            for (; e && e !== this._container;) {
              if (e._leaflet_disable_click) return !0;
              e = e.parentNode
            }
          },
          _handleDOMEvent: function(e) {
            var t = e.target || e.srcElement;
            if (!(!this._loaded || t._leaflet_disable_events || e.type === `click` && this._isClickDisabled(t))) {
              var n = e.type;
              n === `mousedown` && Pt(t), this._fireDOMEvent(e, n)
            }
          },
          _mouseEvents: [`click`, `dblclick`, `mouseover`, `mouseout`, `contextmenu`],
          _fireDOMEvent: function(e, t, r) {
            if (e.type === `click`) {
              var i = n({}, e);
              i.type = `preclick`, this._fireDOMEvent(i, i.type, r)
            }
            var a = this._findEventTargets(e, t);
            if (r) {
              for (var o = [], s = 0; s < r.length; s++) r[s].listens(t, !0) && o.push(r[s]);
              a = o.concat(a)
            }
            if (a.length) {
              t === `contextmenu` && Yt(e);
              var c = a[0],
                l = {
                  originalEvent: e
                };
              if (e.type !== `keypress` && e.type !== `keydown` && e.type !== `keyup`) {
                var u = c.getLatLng && (!c._radius || c._radius <= 10);
                l.containerPoint = u ? this.latLngToContainerPoint(c.getLatLng()) : this.mouseEventToContainerPoint(e), l.layerPoint = this.containerPointToLayerPoint(l.containerPoint), l.latlng = u ? c.getLatLng() : this.layerPointToLatLng(l.layerPoint)
              }
              for (s = 0; s < a.length; s++)
                if (a[s].fire(t, l, !0), l.originalEvent._stopped || a[s].options.bubblingMouseEvents === !1 && v(this._mouseEvents, t) !== -1) return
            }
          },
          _draggableMoved: function(e) {
            return e = e.dragging && e.dragging.enabled() ? e : this, e.dragging && e.dragging.moved() || this.boxZoom && this.boxZoom.moved()
          },
          _clearHandlers: function() {
            for (var e = 0, t = this._handlers.length; e < t; e++) this._handlers[e].disable()
          },
          whenReady: function(e, t) {
            return this._loaded ? e.call(t || this, {
              target: this
            }) : this.on(`load`, e, t), this
          },
          _getMapPanePos: function() {
            return Tt(this._mapPane) || new M(0, 0)
          },
          _moved: function() {
            var e = this._getMapPanePos();
            return e && !e.equals([0, 0])
          },
          _getTopLeftPoint: function(e, t) {
            return (e && t !== void 0 ? this._getNewPixelOrigin(e, t) : this.getPixelOrigin()).subtract(this._getMapPanePos())
          },
          _getNewPixelOrigin: function(e, t) {
            var n = this.getSize()._divideBy(2);
            return this.project(e, t)._subtract(n)._add(this._getMapPanePos())._round()
          },
          _latLngToNewLayerPoint: function(e, t, n) {
            var r = this._getNewPixelOrigin(n, t);
            return this.project(e, t)._subtract(r)
          },
          _latLngBoundsToNewLayerBounds: function(e, t, n) {
            var r = this._getNewPixelOrigin(n, t);
            return I([this.project(e.getSouthWest(), t)._subtract(r), this.project(e.getNorthWest(), t)._subtract(r), this.project(e.getSouthEast(), t)._subtract(r), this.project(e.getNorthEast(), t)._subtract(r)])
          },
          _getCenterLayerPoint: function() {
            return this.containerPointToLayerPoint(this.getSize()._divideBy(2))
          },
          _getCenterOffset: function(e) {
            return this.latLngToLayerPoint(e).subtract(this._getCenterLayerPoint())
          },
          _limitCenter: function(e, t, n) {
            if (!n) return e;
            var r = this.project(e, t),
              i = this.getSize().divideBy(2),
              a = new F(r.subtract(i), r.add(i)),
              o = this._getBoundsOffset(a, n, t);
            return Math.abs(o.x) <= 1 && Math.abs(o.y) <= 1 ? e : this.unproject(r.add(o), t)
          },
          _limitOffset: function(e, t) {
            if (!t) return e;
            var n = this.getPixelBounds(),
              r = new F(n.min.add(e), n.max.add(e));
            return e.add(this._getBoundsOffset(r, t))
          },
          _getBoundsOffset: function(e, t, n) {
            var r = I(this.project(t.getNorthEast(), n), this.project(t.getSouthWest(), n)),
              i = r.min.subtract(e.min),
              a = r.max.subtract(e.max);
            return new M(this._rebound(i.x, -a.x), this._rebound(i.y, -a.y))
          },
          _rebound: function(e, t) {
            return e + t > 0 ? Math.round(e - t) / 2 : Math.max(0, Math.ceil(e)) - Math.max(0, Math.floor(t))
          },
          _limitZoom: function(e) {
            var t = this.getMinZoom(),
              n = this.getMaxZoom(),
              r = Re.any3d ? this.options.zoomSnap : 1;
            return r && (e = Math.round(e / r) * r), Math.max(t, Math.min(n, e))
          },
          _onPanTransitionStep: function() {
            this.fire(`move`)
          },
          _onPanTransitionEnd: function() {
            _t(this._mapPane, `leaflet-pan-anim`), this.fire(`moveend`)
          },
          _tryAnimatedPan: function(e, t) {
            var n = this._getCenterOffset(e)._trunc();
            return (t && t.animate) !== !0 && !this.getSize().contains(n) ? !1 : (this.panBy(n, t), !0)
          },
          _createAnimProxy: function() {
            var e = this._proxy = ut(`div`, `leaflet-proxy leaflet-zoom-animated`);
            this._panes.mapPane.appendChild(e), this.on(`zoomanim`, function(e) {
              var t = at,
                n = this._proxy.style[t];
              Ct(this._proxy, this.project(e.center, e.zoom), this.getZoomScale(e.zoom, 1)), n === this._proxy.style[t] && this._animatingZoom && this._onZoomTransitionEnd()
            }, this), this.on(`load moveend`, this._animMoveEnd, this), this._on(`unload`, this._destroyAnimProxy, this)
          },
          _destroyAnimProxy: function() {
            dt(this._proxy), this.off(`load moveend`, this._animMoveEnd, this), delete this._proxy
          },
          _animMoveEnd: function() {
            var e = this.getCenter(),
              t = this.getZoom();
            Ct(this._proxy, this.project(e, t), this.getZoomScale(t, 1))
          },
          _catchTransitionEnd: function(e) {
            this._animatingZoom && e.propertyName.indexOf(`transform`) >= 0 && this._onZoomTransitionEnd()
          },
          _nothingToAnimate: function() {
            return !this._container.getElementsByClassName(`leaflet-zoom-animated`).length
          },
          _tryAnimatedZoom: function(e, t, n) {
            if (this._animatingZoom) return !0;
            if (n ||= {}, !this._zoomAnimated || n.animate === !1 || this._nothingToAnimate() || Math.abs(t - this._zoom) > this.options.zoomAnimationThreshold) return !1;
            var r = this.getZoomScale(t),
              i = this._getCenterOffset(e)._divideBy(1 - 1 / r);
            return n.animate !== !0 && !this.getSize().contains(i) ? !1 : (T(function() {
              this._moveStart(!0, n.noMoveStart || !1)._animateZoom(e, t, !0)
            }, this), !0)
          },
          _animateZoom: function(e, t, n, r) {
            this._mapPane && (n && (this._animatingZoom = !0, this._animateToCenter = e, this._animateToZoom = t, gt(this._mapPane, `leaflet-zoom-anim`)), this.fire(`zoomanim`, {
              center: e,
              zoom: t,
              noUpdate: r
            }), this._tempFireZoomEvent ||= this._zoom !== this._animateToZoom, this._move(this._animateToCenter, this._animateToZoom, void 0, !0), setTimeout(i(this._onZoomTransitionEnd, this), 250))
          },
          _onZoomTransitionEnd: function() {
            this._animatingZoom && (this._mapPane && _t(this._mapPane, `leaflet-zoom-anim`), this._animatingZoom = !1, this._move(this._animateToCenter, this._animateToZoom, void 0, !0), this._tempFireZoomEvent && this.fire(`zoom`), delete this._tempFireZoomEvent, this.fire(`move`), this._moveEnd(!0))
          }
        });

      function on(e, t) {
        return new an(e, t)
      }
      var sn = O.extend({
          options: {
            position: `topright`
          },
          initialize: function(e) {
            p(this, e)
          },
          getPosition: function() {
            return this.options.position
          },
          setPosition: function(e) {
            var t = this._map;
            return t && t.removeControl(this), this.options.position = e, t && t.addControl(this), this
          },
          getContainer: function() {
            return this._container
          },
          addTo: function(e) {
            this.remove(), this._map = e;
            var t = this._container = this.onAdd(e),
              n = this.getPosition(),
              r = e._controlCorners[n];
            return gt(t, `leaflet-control`), n.indexOf(`bottom`) === -1 ? r.appendChild(t) : r.insertBefore(t, r.firstChild), this._map.on(`unload`, this.remove, this), this
          },
          remove: function() {
            return this._map ? (dt(this._container), this.onRemove && this.onRemove(this._map), this._map.off(`unload`, this.remove, this), this._map = null, this) : this
          },
          _refocusOnMap: function(e) {
            this._map && e && e.screenX > 0 && e.screenY > 0 && this._map.getContainer().focus()
          }
        }),
        cn = function(e) {
          return new sn(e)
        };
      an.include({
        addControl: function(e) {
          return e.addTo(this), this
        },
        removeControl: function(e) {
          return e.remove(), this
        },
        _initControlPos: function() {
          var e = this._controlCorners = {},
            t = `leaflet-`,
            n = this._controlContainer = ut(`div`, t + `control-container`, this._container);

          function r(r, i) {
            var a = t + r + ` ` + t + i;
            e[r + i] = ut(`div`, a, n)
          }
          r(`top`, `left`), r(`top`, `right`), r(`bottom`, `left`), r(`bottom`, `right`)
        },
        _clearControlPos: function() {
          for (var e in this._controlCorners) dt(this._controlCorners[e]);
          dt(this._controlContainer), delete this._controlCorners, delete this._controlContainer
        }
      });
      var ln = sn.extend({
          options: {
            collapsed: !0,
            position: `topright`,
            autoZIndex: !0,
            hideSingleBase: !1,
            sortLayers: !1,
            sortFunction: function(e, t, n, r) {
              return n < r ? -1 : +(r < n)
            }
          },
          initialize: function(e, t, n) {
            for (var r in p(this, n), this._layerControlInputs = [], this._layers = [], this._lastZIndex = 0, this._handlingClick = !1, this._preventClick = !1, e) this._addLayer(e[r], r);
            for (r in t) this._addLayer(t[r], r, !0)
          },
          onAdd: function(e) {
            this._initLayout(), this._update(), this._map = e, e.on(`zoomend`, this._checkDisabledLayers, this);
            for (var t = 0; t < this._layers.length; t++) this._layers[t].layer.on(`add remove`, this._onLayerChange, this);
            return this._container
          },
          addTo: function(e) {
            return sn.prototype.addTo.call(this, e), this._expandIfNotCollapsed()
          },
          onRemove: function() {
            this._map.off(`zoomend`, this._checkDisabledLayers, this);
            for (var e = 0; e < this._layers.length; e++) this._layers[e].layer.off(`add remove`, this._onLayerChange, this)
          },
          addBaseLayer: function(e, t) {
            return this._addLayer(e, t), this._map ? this._update() : this
          },
          addOverlay: function(e, t) {
            return this._addLayer(e, t, !0), this._map ? this._update() : this
          },
          removeLayer: function(e) {
            e.off(`add remove`, this._onLayerChange, this);
            var t = this._getLayer(o(e));
            return t && this._layers.splice(this._layers.indexOf(t), 1), this._map ? this._update() : this
          },
          expand: function() {
            gt(this._container, `leaflet-control-layers-expanded`), this._section.style.height = null;
            var e = this._map.getSize().y - (this._container.offsetTop + 50);
            return e < this._section.clientHeight ? (gt(this._section, `leaflet-control-layers-scrollbar`), this._section.style.height = e + `px`) : _t(this._section, `leaflet-control-layers-scrollbar`), this._checkDisabledLayers(), this
          },
          collapse: function() {
            return _t(this._container, `leaflet-control-layers-expanded`), this
          },
          _initLayout: function() {
            var e = `leaflet-control-layers`,
              t = this._container = ut(`div`, e),
              n = this.options.collapsed;
            t.setAttribute(`aria-haspopup`, !0), Jt(t), qt(t);
            var r = this._section = ut(`section`, e + `-list`);
            n && (this._map.on(`click`, this.collapse, this), zt(t, {
              mouseenter: this._expandSafely,
              mouseleave: this.collapse
            }, this));
            var i = this._layersLink = ut(`a`, e + `-toggle`, t);
            i.href = `#`, i.title = `Layers`, i.setAttribute(`role`, `button`), zt(i, {
              keydown: function(e) {
                e.keyCode === 13 && this._expandSafely()
              },
              click: function(e) {
                Yt(e), this._expandSafely()
              }
            }, this), n || this.expand(), this._baseLayersList = ut(`div`, e + `-base`, r), this._separator = ut(`div`, e + `-separator`, r), this._overlaysList = ut(`div`, e + `-overlays`, r), t.appendChild(r)
          },
          _getLayer: function(e) {
            for (var t = 0; t < this._layers.length; t++)
              if (this._layers[t] && o(this._layers[t].layer) === e) return this._layers[t]
          },
          _addLayer: function(e, t, n) {
            this._map && e.on(`add remove`, this._onLayerChange, this), this._layers.push({
              layer: e,
              name: t,
              overlay: n
            }), this.options.sortLayers && this._layers.sort(i(function(e, t) {
              return this.options.sortFunction(e.layer, t.layer, e.name, t.name)
            }, this)), this.options.autoZIndex && e.setZIndex && (this._lastZIndex++, e.setZIndex(this._lastZIndex)), this._expandIfNotCollapsed()
          },
          _update: function() {
            if (!this._container) return this;
            ft(this._baseLayersList), ft(this._overlaysList), this._layerControlInputs = [];
            var e, t, n, r, i = 0;
            for (n = 0; n < this._layers.length; n++) r = this._layers[n], this._addItem(r), t ||= r.overlay, e ||= !r.overlay, i += +!r.overlay;
            return this.options.hideSingleBase && (e &&= i > 1, this._baseLayersList.style.display = e ? `` : `none`), this._separator.style.display = t && e ? `` : `none`, this
          },
          _onLayerChange: function(e) {
            this._handlingClick || this._update();
            var t = this._getLayer(o(e.target)),
              n = t.overlay ? e.type === `add` ? `overlayadd` : `overlayremove` : e.type === `add` ? `baselayerchange` : null;
            n && this._map.fire(n, t)
          },
          _createRadioElement: function(e, t) {
            var n = `<input type="radio" class="leaflet-control-layers-selector" name="` + e + `"` + (t ? ` checked="checked"` : ``) + `/>`,
              r = document.createElement(`div`);
            return r.innerHTML = n, r.firstChild
          },
          _addItem: function(e) {
            var t = document.createElement(`label`),
              n = this._map.hasLayer(e.layer),
              r;
            e.overlay ? (r = document.createElement(`input`), r.type = `checkbox`, r.className = `leaflet-control-layers-selector`, r.defaultChecked = n) : r = this._createRadioElement(`leaflet-base-layers_` + o(this), n), this._layerControlInputs.push(r), r.layerId = o(e.layer), zt(r, `click`, this._onInputClick, this);
            var i = document.createElement(`span`);
            i.innerHTML = ` ` + e.name;
            var a = document.createElement(`span`);
            return t.appendChild(a), a.appendChild(r), a.appendChild(i), (e.overlay ? this._overlaysList : this._baseLayersList).appendChild(t), this._checkDisabledLayers(), t
          },
          _onInputClick: function() {
            if (!this._preventClick) {
              var e = this._layerControlInputs,
                t, n, r = [],
                i = [];
              this._handlingClick = !0;
              for (var a = e.length - 1; a >= 0; a--) t = e[a], n = this._getLayer(t.layerId).layer, t.checked ? r.push(n) : t.checked || i.push(n);
              for (a = 0; a < i.length; a++) this._map.hasLayer(i[a]) && this._map.removeLayer(i[a]);
              for (a = 0; a < r.length; a++) this._map.hasLayer(r[a]) || this._map.addLayer(r[a]);
              this._handlingClick = !1, this._refocusOnMap()
            }
          },
          _checkDisabledLayers: function() {
            for (var e = this._layerControlInputs, t, n, r = this._map.getZoom(), i = e.length - 1; i >= 0; i--) t = e[i], n = this._getLayer(t.layerId).layer, t.disabled = n.options.minZoom !== void 0 && r < n.options.minZoom || n.options.maxZoom !== void 0 && r > n.options.maxZoom
          },
          _expandIfNotCollapsed: function() {
            return this._map && !this.options.collapsed && this.expand(), this
          },
          _expandSafely: function() {
            var e = this._section;
            this._preventClick = !0, zt(e, `click`, Yt), this.expand();
            var t = this;
            setTimeout(function() {
              Vt(e, `click`, Yt), t._preventClick = !1
            })
          }
        }),
        un = function(e, t, n) {
          return new ln(e, t, n)
        },
        dn = sn.extend({
          options: {
            position: `topleft`,
            zoomInText: `<span aria-hidden="true">+</span>`,
            zoomInTitle: `Zoom in`,
            zoomOutText: `<span aria-hidden="true">&#x2212;</span>`,
            zoomOutTitle: `Zoom out`
          },
          onAdd: function(e) {
            var t = `leaflet-control-zoom`,
              n = ut(`div`, t + ` leaflet-bar`),
              r = this.options;
            return this._zoomInButton = this._createButton(r.zoomInText, r.zoomInTitle, t + `-in`, n, this._zoomIn), this._zoomOutButton = this._createButton(r.zoomOutText, r.zoomOutTitle, t + `-out`, n, this._zoomOut), this._updateDisabled(), e.on(`zoomend zoomlevelschange`, this._updateDisabled, this), n
          },
          onRemove: function(e) {
            e.off(`zoomend zoomlevelschange`, this._updateDisabled, this)
          },
          disable: function() {
            return this._disabled = !0, this._updateDisabled(), this
          },
          enable: function() {
            return this._disabled = !1, this._updateDisabled(), this
          },
          _zoomIn: function(e) {
            !this._disabled && this._map._zoom < this._map.getMaxZoom() && this._map.zoomIn(this._map.options.zoomDelta * (e.shiftKey ? 3 : 1))
          },
          _zoomOut: function(e) {
            !this._disabled && this._map._zoom > this._map.getMinZoom() && this._map.zoomOut(this._map.options.zoomDelta * (e.shiftKey ? 3 : 1))
          },
          _createButton: function(e, t, n, r, i) {
            var a = ut(`a`, n, r);
            return a.innerHTML = e, a.href = `#`, a.title = t, a.setAttribute(`role`, `button`), a.setAttribute(`aria-label`, t), Jt(a), zt(a, `click`, Xt), zt(a, `click`, i, this), zt(a, `click`, this._refocusOnMap, this), a
          },
          _updateDisabled: function() {
            var e = this._map,
              t = `leaflet-disabled`;
            _t(this._zoomInButton, t), _t(this._zoomOutButton, t), this._zoomInButton.setAttribute(`aria-disabled`, `false`), this._zoomOutButton.setAttribute(`aria-disabled`, `false`), (this._disabled || e._zoom === e.getMinZoom()) && (gt(this._zoomOutButton, t), this._zoomOutButton.setAttribute(`aria-disabled`, `true`)), (this._disabled || e._zoom === e.getMaxZoom()) && (gt(this._zoomInButton, t), this._zoomInButton.setAttribute(`aria-disabled`, `true`))
          }
        });
      an.mergeOptions({
        zoomControl: !0
      }), an.addInitHook(function() {
        this.options.zoomControl && (this.zoomControl = new dn, this.addControl(this.zoomControl))
      });
      var fn = function(e) {
          return new dn(e)
        },
        pn = sn.extend({
          options: {
            position: `bottomleft`,
            maxWidth: 100,
            metric: !0,
            imperial: !0
          },
          onAdd: function(e) {
            var t = `leaflet-control-scale`,
              n = ut(`div`, t),
              r = this.options;
            return this._addScales(r, t + `-line`, n), e.on(r.updateWhenIdle ? `moveend` : `move`, this._update, this), e.whenReady(this._update, this), n
          },
          onRemove: function(e) {
            e.off(this.options.updateWhenIdle ? `moveend` : `move`, this._update, this)
          },
          _addScales: function(e, t, n) {
            e.metric && (this._mScale = ut(`div`, t, n)), e.imperial && (this._iScale = ut(`div`, t, n))
          },
          _update: function() {
            var e = this._map,
              t = e.getSize().y / 2,
              n = e.distance(e.containerPointToLatLng([0, t]), e.containerPointToLatLng([this.options.maxWidth, t]));
            this._updateScales(n)
          },
          _updateScales: function(e) {
            this.options.metric && e && this._updateMetric(e), this.options.imperial && e && this._updateImperial(e)
          },
          _updateMetric: function(e) {
            var t = this._getRoundNum(e),
              n = t < 1e3 ? t + ` m` : t / 1e3 + ` km`;
            this._updateScale(this._mScale, n, t / e)
          },
          _updateImperial: function(e) {
            var t = e * 3.2808399,
              n, r, i;
            t > 5280 ? (n = t / 5280, r = this._getRoundNum(n), this._updateScale(this._iScale, r + ` mi`, r / n)) : (i = this._getRoundNum(t), this._updateScale(this._iScale, i + ` ft`, i / t))
          },
          _updateScale: function(e, t, n) {
            e.style.width = Math.round(this.options.maxWidth * n) + `px`, e.innerHTML = t
          },
          _getRoundNum: function(e) {
            var t = 10 ** ((Math.floor(e) + ``).length - 1),
              n = e / t;
            return n = n >= 10 ? 10 : n >= 5 ? 5 : n >= 3 ? 3 : n >= 2 ? 2 : 1, t * n
          }
        }),
        mn = function(e) {
          return new pn(e)
        },
        hn = sn.extend({
          options: {
            position: `bottomright`,
            prefix: `<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">` + (Re.inlineSvg ? `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg> ` : ``) + `Leaflet</a>`
          },
          initialize: function(e) {
            p(this, e), this._attributions = {}
          },
          onAdd: function(e) {
            for (var t in e.attributionControl = this, this._container = ut(`div`, `leaflet-control-attribution`), Jt(this._container), e._layers) e._layers[t].getAttribution && this.addAttribution(e._layers[t].getAttribution());
            return this._update(), e.on(`layeradd`, this._addAttribution, this), this._container
          },
          onRemove: function(e) {
            e.off(`layeradd`, this._addAttribution, this)
          },
          _addAttribution: function(e) {
            e.layer.getAttribution && (this.addAttribution(e.layer.getAttribution()), e.layer.once(`remove`, function() {
              this.removeAttribution(e.layer.getAttribution())
            }, this))
          },
          setPrefix: function(e) {
            return this.options.prefix = e, this._update(), this
          },
          addAttribution: function(e) {
            return e ? (this._attributions[e] || (this._attributions[e] = 0), this._attributions[e]++, this._update(), this) : this
          },
          removeAttribution: function(e) {
            return e && this._attributions[e] && (this._attributions[e]--, this._update()), this
          },
          _update: function() {
            if (this._map) {
              var e = [];
              for (var t in this._attributions) this._attributions[t] && e.push(t);
              var n = [];
              this.options.prefix && n.push(this.options.prefix), e.length && n.push(e.join(`, `)), this._container.innerHTML = n.join(` <span aria-hidden="true">|</span> `)
            }
          }
        });
      an.mergeOptions({
        attributionControl: !0
      }), an.addInitHook(function() {
        this.options.attributionControl && new hn().addTo(this)
      }), sn.Layers = ln, sn.Zoom = dn, sn.Scale = pn, sn.Attribution = hn, cn.layers = un, cn.zoom = fn, cn.scale = mn, cn.attribution = function(e) {
        return new hn(e)
      };
      var gn = O.extend({
        initialize: function(e) {
          this._map = e
        },
        enable: function() {
          return this._enabled ? this : (this._enabled = !0, this.addHooks(), this)
        },
        disable: function() {
          return this._enabled ? (this._enabled = !1, this.removeHooks(), this) : this
        },
        enabled: function() {
          return !!this._enabled
        }
      });
      gn.addTo = function(e, t) {
        return e.addHandler(t, this), this
      };
      var _n = {
          Events: A
        },
        vn = Re.touch ? `touchstart mousedown` : `mousedown`,
        yn = j.extend({
          options: {
            clickTolerance: 3
          },
          initialize: function(e, t, n, r) {
            p(this, r), this._element = e, this._dragStartTarget = t || e, this._preventOutline = n
          },
          enable: function() {
            this._enabled ||= (zt(this._dragStartTarget, vn, this._onDown, this), !0)
          },
          disable: function() {
            this._enabled && (yn._dragging === this && this.finishDrag(!0), Vt(this._dragStartTarget, vn, this._onDown, this), this._enabled = !1, this._moved = !1)
          },
          _onDown: function(e) {
            if (this._enabled && (this._moved = !1, !ht(this._element, `leaflet-zoom-anim`))) {
              if (e.touches && e.touches.length !== 1) {
                yn._dragging === this && this.finishDrag();
                return
              }
              if (!(yn._dragging || e.shiftKey || e.which !== 1 && e.button !== 1 && !e.touches) && (yn._dragging = this, this._preventOutline && Pt(this._element), At(), Et(), !this._moving)) {
                this.fire(`down`);
                var t = e.touches ? e.touches[0] : e,
                  n = It(this._element);
                this._startPoint = new M(t.clientX, t.clientY), this._startPos = Tt(this._element), this._parentScale = Lt(n);
                var r = e.type === `mousedown`;
                zt(document, r ? `mousemove` : `touchmove`, this._onMove, this), zt(document, r ? `mouseup` : `touchend touchcancel`, this._onUp, this)
              }
            }
          },
          _onMove: function(e) {
            if (this._enabled) {
              if (e.touches && e.touches.length > 1) {
                this._moved = !0;
                return
              }
              var t = e.touches && e.touches.length === 1 ? e.touches[0] : e,
                n = new M(t.clientX, t.clientY)._subtract(this._startPoint);
              (n.x || n.y) && (Math.abs(n.x) + Math.abs(n.y) < this.options.clickTolerance || (n.x /= this._parentScale.x, n.y /= this._parentScale.y, Yt(e), this._moved || (this.fire(`dragstart`), this._moved = !0, gt(document.body, `leaflet-dragging`), this._lastTarget = e.target || e.srcElement, window.SVGElementInstance && this._lastTarget instanceof window.SVGElementInstance && (this._lastTarget = this._lastTarget.correspondingUseElement), gt(this._lastTarget, `leaflet-drag-target`)), this._newPos = this._startPos.add(n), this._moving = !0, this._lastEvent = e, this._updatePosition()))
            }
          },
          _updatePosition: function() {
            var e = {
              originalEvent: this._lastEvent
            };
            this.fire(`predrag`, e), wt(this._element, this._newPos), this.fire(`drag`, e)
          },
          _onUp: function() {
            this._enabled && this.finishDrag()
          },
          finishDrag: function(e) {
            _t(document.body, `leaflet-dragging`), this._lastTarget &&= (_t(this._lastTarget, `leaflet-drag-target`), null), Vt(document, `mousemove touchmove`, this._onMove, this), Vt(document, `mouseup touchend touchcancel`, this._onUp, this), jt(), Dt();
            var t = this._moved && this._moving;
            this._moving = !1, yn._dragging = !1, t && this.fire(`dragend`, {
              noInertia: e,
              distance: this._newPos.distanceTo(this._startPos)
            })
          }
        });

      function bn(e, t, n) {
        for (var r, i = [1, 4, 2, 8], a = 0, o, s, c, l, u = e.length, d, f; a < u; a++) e[a]._code = Nn(e[a], t);
        for (s = 0; s < 4; s++) {
          for (d = i[s], r = [], a = 0, u = e.length, o = u - 1; a < u; o = a++) c = e[a], l = e[o], c._code & d ? l._code & d || (f = Mn(l, c, d, t, n), f._code = Nn(f, t), r.push(f)) : (l._code & d && (f = Mn(l, c, d, t, n), f._code = Nn(f, t), r.push(f)), r.push(c));
          e = r
        }
        return e
      }

      function xn(e, t) {
        var n, r, i, a, o, s, c, l, u;
        if (!e || e.length === 0) throw Error(`latlngs not passed`);
        In(e) || (console.warn(`latlngs are not flat! Only the first ring will be used`), e = e[0]);
        var d = B([0, 0]),
          f = R(e);
        f.getNorthWest().distanceTo(f.getSouthWest()) * f.getNorthEast().distanceTo(f.getNorthWest()) < 1700 && (d = Sn(e));
        var p = e.length,
          m = [];
        for (n = 0; n < p; n++) {
          var h = B(e[n]);
          m.push(t.project(B([h.lat - d.lat, h.lng - d.lng])))
        }
        for (s = c = l = 0, n = 0, r = p - 1; n < p; r = n++) i = m[n], a = m[r], o = i.y * a.x - a.y * i.x, c += (i.x + a.x) * o, l += (i.y + a.y) * o, s += o * 3;
        u = s === 0 ? m[0] : [c / s, l / s];
        var g = t.unproject(P(u));
        return B([g.lat + d.lat, g.lng + d.lng])
      }

      function Sn(e) {
        for (var t = 0, n = 0, r = 0, i = 0; i < e.length; i++) {
          var a = B(e[i]);
          t += a.lat, n += a.lng, r++
        }
        return B([t / r, n / r])
      }
      var Cn = {
        __proto__: null,
        clipPolygon: bn,
        polygonCenter: xn,
        centroid: Sn
      };

      function wn(e, t) {
        if (!t || !e.length) return e.slice();
        var n = t * t;
        return e = kn(e, n), e = Dn(e, n), e
      }

      function Tn(e, t, n) {
        return Math.sqrt(Fn(e, t, n, !0))
      }

      function En(e, t, n) {
        return Fn(e, t, n)
      }

      function Dn(e, t) {
        var n = e.length,
          r = new(typeof Uint8Array < `u` ? Uint8Array : Array)(n);
        r[0] = r[n - 1] = 1, On(e, r, t, 0, n - 1);
        var i, a = [];
        for (i = 0; i < n; i++) r[i] && a.push(e[i]);
        return a
      }

      function On(e, t, n, r, i) {
        for (var a = 0, o, s = r + 1, c; s <= i - 1; s++) c = Fn(e[s], e[r], e[i], !0), c > a && (o = s, a = c);
        a > n && (t[o] = 1, On(e, t, n, r, o), On(e, t, n, o, i))
      }

      function kn(e, t) {
        for (var n = [e[0]], r = 1, i = 0, a = e.length; r < a; r++) Pn(e[r], e[i]) > t && (n.push(e[r]), i = r);
        return i < a - 1 && n.push(e[a - 1]), n
      }
      var An;

      function jn(e, t, n, r, i) {
        var a = r ? An : Nn(e, n),
          o = Nn(t, n),
          s, c, l;
        for (An = o;;) {
          if (!(a | o)) return [e, t];
          if (a & o) return !1;
          s = a || o, c = Mn(e, t, s, n, i), l = Nn(c, n), s === a ? (e = c, a = l) : (t = c, o = l)
        }
      }

      function Mn(e, t, n, r, i) {
        var a = t.x - e.x,
          o = t.y - e.y,
          s = r.min,
          c = r.max,
          l, u;
        return n & 8 ? (l = e.x + a * (c.y - e.y) / o, u = c.y) : n & 4 ? (l = e.x + a * (s.y - e.y) / o, u = s.y) : n & 2 ? (l = c.x, u = e.y + o * (c.x - e.x) / a) : n & 1 && (l = s.x, u = e.y + o * (s.x - e.x) / a), new M(l, u, i)
      }

      function Nn(e, t) {
        var n = 0;
        return e.x < t.min.x ? n |= 1 : e.x > t.max.x && (n |= 2), e.y < t.min.y ? n |= 4 : e.y > t.max.y && (n |= 8), n
      }

      function Pn(e, t) {
        var n = t.x - e.x,
          r = t.y - e.y;
        return n * n + r * r
      }

      function Fn(e, t, n, r) {
        var i = t.x,
          a = t.y,
          o = n.x - i,
          s = n.y - a,
          c = o * o + s * s,
          l;
        return c > 0 && (l = ((e.x - i) * o + (e.y - a) * s) / c, l > 1 ? (i = n.x, a = n.y) : l > 0 && (i += o * l, a += s * l)), o = e.x - i, s = e.y - a, r ? o * o + s * s : new M(i, a)
      }

      function In(e) {
        return !_(e[0]) || typeof e[0][0] != `object` && e[0][0] !== void 0
      }

      function Ln(e) {
        return console.warn(`Deprecated use of _flat, please use L.LineUtil.isFlat instead.`), In(e)
      }

      function Rn(e, t) {
        var n, r, i, a, o, s, c, l;
        if (!e || e.length === 0) throw Error(`latlngs not passed`);
        In(e) || (console.warn(`latlngs are not flat! Only the first ring will be used`), e = e[0]);
        var u = B([0, 0]),
          d = R(e);
        d.getNorthWest().distanceTo(d.getSouthWest()) * d.getNorthEast().distanceTo(d.getNorthWest()) < 1700 && (u = Sn(e));
        var f = e.length,
          p = [];
        for (n = 0; n < f; n++) {
          var m = B(e[n]);
          p.push(t.project(B([m.lat - u.lat, m.lng - u.lng])))
        }
        for (n = 0, r = 0; n < f - 1; n++) r += p[n].distanceTo(p[n + 1]) / 2;
        if (r === 0) l = p[0];
        else
          for (n = 0, a = 0; n < f - 1; n++)
            if (o = p[n], s = p[n + 1], i = o.distanceTo(s), a += i, a > r) {
              c = (a - r) / i, l = [s.x - c * (s.x - o.x), s.y - c * (s.y - o.y)];
              break
            } var h = t.unproject(P(l));
        return B([h.lat + u.lat, h.lng + u.lng])
      }
      var zn = {
          __proto__: null,
          simplify: wn,
          pointToSegmentDistance: Tn,
          closestPointOnSegment: En,
          clipSegment: jn,
          _getEdgeIntersection: Mn,
          _getBitCode: Nn,
          _sqClosestPointOnSegment: Fn,
          isFlat: In,
          _flat: Ln,
          polylineCenter: Rn
        },
        Bn = {
          project: function(e) {
            return new M(e.lng, e.lat)
          },
          unproject: function(e) {
            return new z(e.y, e.x)
          },
          bounds: new F([-180, -90], [180, 90])
        },
        Vn = {
          R: 6378137,
          R_MINOR: 6356752.314245179,
          bounds: new F([-20037508.34279, -15496570.73972], [20037508.34279, 18764656.23138]),
          project: function(e) {
            var t = Math.PI / 180,
              n = this.R,
              r = e.lat * t,
              i = this.R_MINOR / n,
              a = Math.sqrt(1 - i * i),
              o = a * Math.sin(r),
              s = Math.tan(Math.PI / 4 - r / 2) / ((1 - o) / (1 + o)) ** (a / 2);
            return r = -n * Math.log(Math.max(s, 1e-10)), new M(e.lng * t * n, r)
          },
          unproject: function(e) {
            for (var t = 180 / Math.PI, n = this.R, r = this.R_MINOR / n, i = Math.sqrt(1 - r * r), a = Math.exp(-e.y / n), o = Math.PI / 2 - 2 * Math.atan(a), s = 0, c = .1, l; s < 15 && Math.abs(c) > 1e-7; s++) l = i * Math.sin(o), l = ((1 - l) / (1 + l)) ** (i / 2), c = Math.PI / 2 - 2 * Math.atan(a * l) - o, o += c;
            return new z(o * t, e.x * t / n)
          }
        },
        Hn = {
          __proto__: null,
          LonLat: Bn,
          Mercator: Vn,
          SphericalMercator: U
        },
        Un = n({}, H, {
          code: `EPSG:3395`,
          projection: Vn,
          transformation: function() {
            var e = .5 / (Math.PI * Vn.R);
            return ne(e, .5, -e, .5)
          }()
        }),
        Wn = n({}, H, {
          code: `EPSG:4326`,
          projection: Bn,
          transformation: ne(1 / 180, 1, -1 / 180, .5)
        }),
        Gn = n({}, V, {
          projection: Bn,
          transformation: ne(1, 0, -1, 0),
          scale: function(e) {
            return 2 ** e
          },
          zoom: function(e) {
            return Math.log(e) / Math.LN2
          },
          distance: function(e, t) {
            var n = t.lng - e.lng,
              r = t.lat - e.lat;
            return Math.sqrt(n * n + r * r)
          },
          infinite: !0
        });
      V.Earth = H, V.EPSG3395 = Un, V.EPSG3857 = re, V.EPSG900913 = ie, V.EPSG4326 = Wn, V.Simple = Gn;
      var Kn = j.extend({
        options: {
          pane: `overlayPane`,
          attribution: null,
          bubblingMouseEvents: !0
        },
        addTo: function(e) {
          return e.addLayer(this), this
        },
        remove: function() {
          return this.removeFrom(this._map || this._mapToAdd)
        },
        removeFrom: function(e) {
          return e && e.removeLayer(this), this
        },
        getPane: function(e) {
          return this._map.getPane(e ? this.options[e] || e : this.options.pane)
        },
        addInteractiveTarget: function(e) {
          return this._map._targets[o(e)] = this, this
        },
        removeInteractiveTarget: function(e) {
          return delete this._map._targets[o(e)], this
        },
        getAttribution: function() {
          return this.options.attribution
        },
        _layerAdd: function(e) {
          var t = e.target;
          if (t.hasLayer(this)) {
            if (this._map = t, this._zoomAnimated = t._zoomAnimated, this.getEvents) {
              var n = this.getEvents();
              t.on(n, this), this.once(`remove`, function() {
                t.off(n, this)
              }, this)
            }
            this.onAdd(t), this.fire(`add`), t.fire(`layeradd`, {
              layer: this
            })
          }
        }
      });
      an.include({
        addLayer: function(e) {
          if (!e._layerAdd) throw Error(`The provided object is not a Layer.`);
          var t = o(e);
          return this._layers[t] ? this : (this._layers[t] = e, e._mapToAdd = this, e.beforeAdd && e.beforeAdd(this), this.whenReady(e._layerAdd, e), this)
        },
        removeLayer: function(e) {
          var t = o(e);
          return this._layers[t] ? (this._loaded && e.onRemove(this), delete this._layers[t], this._loaded && (this.fire(`layerremove`, {
            layer: e
          }), e.fire(`remove`)), e._map = e._mapToAdd = null, this) : this
        },
        hasLayer: function(e) {
          return o(e) in this._layers
        },
        eachLayer: function(e, t) {
          for (var n in this._layers) e.call(t, this._layers[n]);
          return this
        },
        _addLayers: function(e) {
          e = e ? _(e) ? e : [e] : [];
          for (var t = 0, n = e.length; t < n; t++) this.addLayer(e[t])
        },
        _addZoomLimit: function(e) {
          (!isNaN(e.options.maxZoom) || !isNaN(e.options.minZoom)) && (this._zoomBoundLayers[o(e)] = e, this._updateZoomLevels())
        },
        _removeZoomLimit: function(e) {
          var t = o(e);
          this._zoomBoundLayers[t] && (delete this._zoomBoundLayers[t], this._updateZoomLevels())
        },
        _updateZoomLevels: function() {
          var e = 1 / 0,
            t = -1 / 0,
            n = this._getZoomSpan();
          for (var r in this._zoomBoundLayers) {
            var i = this._zoomBoundLayers[r].options;
            e = i.minZoom === void 0 ? e : Math.min(e, i.minZoom), t = i.maxZoom === void 0 ? t : Math.max(t, i.maxZoom)
          }
          this._layersMaxZoom = t === -1 / 0 ? void 0 : t, this._layersMinZoom = e === 1 / 0 ? void 0 : e, n !== this._getZoomSpan() && this.fire(`zoomlevelschange`), this.options.maxZoom === void 0 && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom && this.setZoom(this._layersMaxZoom), this.options.minZoom === void 0 && this._layersMinZoom && this.getZoom() < this._layersMinZoom && this.setZoom(this._layersMinZoom)
        }
      });
      var qn = Kn.extend({
          initialize: function(e, t) {
            p(this, t), this._layers = {};
            var n, r;
            if (e)
              for (n = 0, r = e.length; n < r; n++) this.addLayer(e[n])
          },
          addLayer: function(e) {
            var t = this.getLayerId(e);
            return this._layers[t] = e, this._map && this._map.addLayer(e), this
          },
          removeLayer: function(e) {
            var t = e in this._layers ? e : this.getLayerId(e);
            return this._map && this._layers[t] && this._map.removeLayer(this._layers[t]), delete this._layers[t], this
          },
          hasLayer: function(e) {
            return (typeof e == `number` ? e : this.getLayerId(e)) in this._layers
          },
          clearLayers: function() {
            return this.eachLayer(this.removeLayer, this)
          },
          invoke: function(e) {
            var t = Array.prototype.slice.call(arguments, 1),
              n, r;
            for (n in this._layers) r = this._layers[n], r[e] && r[e].apply(r, t);
            return this
          },
          onAdd: function(e) {
            this.eachLayer(e.addLayer, e)
          },
          onRemove: function(e) {
            this.eachLayer(e.removeLayer, e)
          },
          eachLayer: function(e, t) {
            for (var n in this._layers) e.call(t, this._layers[n]);
            return this
          },
          getLayer: function(e) {
            return this._layers[e]
          },
          getLayers: function() {
            var e = [];
            return this.eachLayer(e.push, e), e
          },
          setZIndex: function(e) {
            return this.invoke(`setZIndex`, e)
          },
          getLayerId: function(e) {
            return o(e)
          }
        }),
        Jn = function(e, t) {
          return new qn(e, t)
        },
        Yn = qn.extend({
          addLayer: function(e) {
            return this.hasLayer(e) ? this : (e.addEventParent(this), qn.prototype.addLayer.call(this, e), this.fire(`layeradd`, {
              layer: e
            }))
          },
          removeLayer: function(e) {
            return this.hasLayer(e) ? (e in this._layers && (e = this._layers[e]), e.removeEventParent(this), qn.prototype.removeLayer.call(this, e), this.fire(`layerremove`, {
              layer: e
            })) : this
          },
          setStyle: function(e) {
            return this.invoke(`setStyle`, e)
          },
          bringToFront: function() {
            return this.invoke(`bringToFront`)
          },
          bringToBack: function() {
            return this.invoke(`bringToBack`)
          },
          getBounds: function() {
            var e = new ee;
            for (var t in this._layers) {
              var n = this._layers[t];
              e.extend(n.getBounds ? n.getBounds() : n.getLatLng())
            }
            return e
          }
        }),
        Xn = function(e, t) {
          return new Yn(e, t)
        },
        Zn = O.extend({
          options: {
            popupAnchor: [0, 0],
            tooltipAnchor: [0, 0],
            crossOrigin: !1
          },
          initialize: function(e) {
            p(this, e)
          },
          createIcon: function(e) {
            return this._createIcon(`icon`, e)
          },
          createShadow: function(e) {
            return this._createIcon(`shadow`, e)
          },
          _createIcon: function(e, t) {
            var n = this._getIconUrl(e);
            if (!n) {
              if (e === `icon`) throw Error(`iconUrl not set in Icon options (see the docs).`);
              return null
            }
            var r = this._createImg(n, t && t.tagName === `IMG` ? t : null);
            return this._setIconStyles(r, e), (this.options.crossOrigin || this.options.crossOrigin === ``) && (r.crossOrigin = this.options.crossOrigin === !0 ? `` : this.options.crossOrigin), r
          },
          _setIconStyles: function(e, t) {
            var n = this.options,
              r = n[t + `Size`];
            typeof r == `number` && (r = [r, r]);
            var i = P(r),
              a = P(t === `shadow` && n.shadowAnchor || n.iconAnchor || i && i.divideBy(2, !0));
            e.className = `leaflet-marker-` + t + ` ` + (n.className || ``), a && (e.style.marginLeft = -a.x + `px`, e.style.marginTop = -a.y + `px`), i && (e.style.width = i.x + `px`, e.style.height = i.y + `px`)
          },
          _createImg: function(e, t) {
            return t ||= document.createElement(`img`), t.src = e, t
          },
          _getIconUrl: function(e) {
            return Re.retina && this.options[e + `RetinaUrl`] || this.options[e + `Url`]
          }
        });

      function Qn(e) {
        return new Zn(e)
      }
      var $n = Zn.extend({
          options: {
            iconUrl: `marker-icon.png`,
            iconRetinaUrl: `marker-icon-2x.png`,
            shadowUrl: `marker-shadow.png`,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            tooltipAnchor: [16, -28],
            shadowSize: [41, 41]
          },
          _getIconUrl: function(e) {
            return typeof $n.imagePath != `string` && ($n.imagePath = this._detectIconPath()), (this.options.imagePath || $n.imagePath) + Zn.prototype._getIconUrl.call(this, e)
          },
          _stripUrl: function(e) {
            var t = function(e, t, n) {
              var r = t.exec(e);
              return r && r[n]
            };
            return e = t(e, /^url\((['"])?(.+)\1\)$/, 2), e && t(e, /^(.*)marker-icon\.png$/, 1)
          },
          _detectIconPath: function() {
            var e = ut(`div`, `leaflet-default-icon-path`, document.body),
              t = lt(e, `background-image`) || lt(e, `backgroundImage`);
            if (document.body.removeChild(e), t = this._stripUrl(t), t) return t;
            var n = document.querySelector(`link[href$="leaflet.css"]`);
            return n ? n.href.substring(0, n.href.length - 11 - 1) : ``
          }
        }),
        er = gn.extend({
          initialize: function(e) {
            this._marker = e
          },
          addHooks: function() {
            var e = this._marker._icon;
            this._draggable ||= new yn(e, e, !0), this._draggable.on({
              dragstart: this._onDragStart,
              predrag: this._onPreDrag,
              drag: this._onDrag,
              dragend: this._onDragEnd
            }, this).enable(), gt(e, `leaflet-marker-draggable`)
          },
          removeHooks: function() {
            this._draggable.off({
              dragstart: this._onDragStart,
              predrag: this._onPreDrag,
              drag: this._onDrag,
              dragend: this._onDragEnd
            }, this).disable(), this._marker._icon && _t(this._marker._icon, `leaflet-marker-draggable`)
          },
          moved: function() {
            return this._draggable && this._draggable._moved
          },
          _adjustPan: function(e) {
            var t = this._marker,
              n = t._map,
              r = this._marker.options.autoPanSpeed,
              i = this._marker.options.autoPanPadding,
              a = Tt(t._icon),
              o = n.getPixelBounds(),
              s = n.getPixelOrigin(),
              c = I(o.min._subtract(s).add(i), o.max._subtract(s).subtract(i));
            if (!c.contains(a)) {
              var l = P((Math.max(c.max.x, a.x) - c.max.x) / (o.max.x - c.max.x) - (Math.min(c.min.x, a.x) - c.min.x) / (o.min.x - c.min.x), (Math.max(c.max.y, a.y) - c.max.y) / (o.max.y - c.max.y) - (Math.min(c.min.y, a.y) - c.min.y) / (o.min.y - c.min.y)).multiplyBy(r);
              n.panBy(l, {
                animate: !1
              }), this._draggable._newPos._add(l), this._draggable._startPos._add(l), wt(t._icon, this._draggable._newPos), this._onDrag(e), this._panRequest = T(this._adjustPan.bind(this, e))
            }
          },
          _onDragStart: function() {
            this._oldLatLng = this._marker.getLatLng(), this._marker.closePopup && this._marker.closePopup(), this._marker.fire(`movestart`).fire(`dragstart`)
          },
          _onPreDrag: function(e) {
            this._marker.options.autoPan && (E(this._panRequest), this._panRequest = T(this._adjustPan.bind(this, e)))
          },
          _onDrag: function(e) {
            var t = this._marker,
              n = t._shadow,
              r = Tt(t._icon),
              i = t._map.layerPointToLatLng(r);
            n && wt(n, r), t._latlng = i, e.latlng = i, e.oldLatLng = this._oldLatLng, t.fire(`move`, e).fire(`drag`, e)
          },
          _onDragEnd: function(e) {
            E(this._panRequest), delete this._oldLatLng, this._marker.fire(`moveend`).fire(`dragend`, e)
          }
        }),
        tr = Kn.extend({
          options: {
            icon: new $n,
            interactive: !0,
            keyboard: !0,
            title: ``,
            alt: `Marker`,
            zIndexOffset: 0,
            opacity: 1,
            riseOnHover: !1,
            riseOffset: 250,
            pane: `markerPane`,
            shadowPane: `shadowPane`,
            bubblingMouseEvents: !1,
            autoPanOnFocus: !0,
            draggable: !1,
            autoPan: !1,
            autoPanPadding: [50, 50],
            autoPanSpeed: 10
          },
          initialize: function(e, t) {
            p(this, t), this._latlng = B(e)
          },
          onAdd: function(e) {
            this._zoomAnimated = this._zoomAnimated && e.options.markerZoomAnimation, this._zoomAnimated && e.on(`zoomanim`, this._animateZoom, this), this._initIcon(), this.update()
          },
          onRemove: function(e) {
            this.dragging && this.dragging.enabled() && (this.options.draggable = !0, this.dragging.removeHooks()), delete this.dragging, this._zoomAnimated && e.off(`zoomanim`, this._animateZoom, this), this._removeIcon(), this._removeShadow()
          },
          getEvents: function() {
            return {
              zoom: this.update,
              viewreset: this.update
            }
          },
          getLatLng: function() {
            return this._latlng
          },
          setLatLng: function(e) {
            var t = this._latlng;
            return this._latlng = B(e), this.update(), this.fire(`move`, {
              oldLatLng: t,
              latlng: this._latlng
            })
          },
          setZIndexOffset: function(e) {
            return this.options.zIndexOffset = e, this.update()
          },
          getIcon: function() {
            return this.options.icon
          },
          setIcon: function(e) {
            return this.options.icon = e, this._map && (this._initIcon(), this.update()), this._popup && this.bindPopup(this._popup, this._popup.options), this
          },
          getElement: function() {
            return this._icon
          },
          update: function() {
            if (this._icon && this._map) {
              var e = this._map.latLngToLayerPoint(this._latlng).round();
              this._setPos(e)
            }
            return this
          },
          _initIcon: function() {
            var e = this.options,
              t = `leaflet-zoom-` + (this._zoomAnimated ? `animated` : `hide`),
              n = e.icon.createIcon(this._icon),
              r = !1;
            n !== this._icon && (this._icon && this._removeIcon(), r = !0, e.title && (n.title = e.title), n.tagName === `IMG` && (n.alt = e.alt || ``)), gt(n, t), e.keyboard && (n.tabIndex = `0`, n.setAttribute(`role`, `button`)), this._icon = n, e.riseOnHover && this.on({
              mouseover: this._bringToFront,
              mouseout: this._resetZIndex
            }), this.options.autoPanOnFocus && zt(n, `focus`, this._panOnFocus, this);
            var i = e.icon.createShadow(this._shadow),
              a = !1;
            i !== this._shadow && (this._removeShadow(), a = !0), i && (gt(i, t), i.alt = ``), this._shadow = i, e.opacity < 1 && this._updateOpacity(), r && this.getPane().appendChild(this._icon), this._initInteraction(), i && a && this.getPane(e.shadowPane).appendChild(this._shadow)
          },
          _removeIcon: function() {
            this.options.riseOnHover && this.off({
              mouseover: this._bringToFront,
              mouseout: this._resetZIndex
            }), this.options.autoPanOnFocus && Vt(this._icon, `focus`, this._panOnFocus, this), dt(this._icon), this.removeInteractiveTarget(this._icon), this._icon = null
          },
          _removeShadow: function() {
            this._shadow && dt(this._shadow), this._shadow = null
          },
          _setPos: function(e) {
            this._icon && wt(this._icon, e), this._shadow && wt(this._shadow, e), this._zIndex = e.y + this.options.zIndexOffset, this._resetZIndex()
          },
          _updateZIndex: function(e) {
            this._icon && (this._icon.style.zIndex = this._zIndex + e)
          },
          _animateZoom: function(e) {
            var t = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center).round();
            this._setPos(t)
          },
          _initInteraction: function() {
            if (this.options.interactive && (gt(this._icon, `leaflet-interactive`), this.addInteractiveTarget(this._icon), er)) {
              var e = this.options.draggable;
              this.dragging && (e = this.dragging.enabled(), this.dragging.disable()), this.dragging = new er(this), e && this.dragging.enable()
            }
          },
          setOpacity: function(e) {
            return this.options.opacity = e, this._map && this._updateOpacity(), this
          },
          _updateOpacity: function() {
            var e = this.options.opacity;
            this._icon && bt(this._icon, e), this._shadow && bt(this._shadow, e)
          },
          _bringToFront: function() {
            this._updateZIndex(this.options.riseOffset)
          },
          _resetZIndex: function() {
            this._updateZIndex(0)
          },
          _panOnFocus: function() {
            var e = this._map;
            if (e) {
              var t = this.options.icon.options,
                n = t.iconSize ? P(t.iconSize) : P(0, 0),
                r = t.iconAnchor ? P(t.iconAnchor) : P(0, 0);
              e.panInside(this._latlng, {
                paddingTopLeft: r,
                paddingBottomRight: n.subtract(r)
              })
            }
          },
          _getPopupAnchor: function() {
            return this.options.icon.options.popupAnchor
          },
          _getTooltipAnchor: function() {
            return this.options.icon.options.tooltipAnchor
          }
        });

      function nr(e, t) {
        return new tr(e, t)
      }
      var rr = Kn.extend({
          options: {
            stroke: !0,
            color: `#3388ff`,
            weight: 3,
            opacity: 1,
            lineCap: `round`,
            lineJoin: `round`,
            dashArray: null,
            dashOffset: null,
            fill: !1,
            fillColor: null,
            fillOpacity: .2,
            fillRule: `evenodd`,
            interactive: !0,
            bubblingMouseEvents: !0
          },
          beforeAdd: function(e) {
            this._renderer = e.getRenderer(this)
          },
          onAdd: function() {
            this._renderer._initPath(this), this._reset(), this._renderer._addPath(this)
          },
          onRemove: function() {
            this._renderer._removePath(this)
          },
          redraw: function() {
            return this._map && this._renderer._updatePath(this), this
          },
          setStyle: function(e) {
            return p(this, e), this._renderer && (this._renderer._updateStyle(this), this.options.stroke && e && Object.prototype.hasOwnProperty.call(e, `weight`) && this._updateBounds()), this
          },
          bringToFront: function() {
            return this._renderer && this._renderer._bringToFront(this), this
          },
          bringToBack: function() {
            return this._renderer && this._renderer._bringToBack(this), this
          },
          getElement: function() {
            return this._path
          },
          _reset: function() {
            this._project(), this._update()
          },
          _clickTolerance: function() {
            return (this.options.stroke ? this.options.weight / 2 : 0) + (this._renderer.options.tolerance || 0)
          }
        }),
        ir = rr.extend({
          options: {
            fill: !0,
            radius: 10
          },
          initialize: function(e, t) {
            p(this, t), this._latlng = B(e), this._radius = this.options.radius
          },
          setLatLng: function(e) {
            var t = this._latlng;
            return this._latlng = B(e), this.redraw(), this.fire(`move`, {
              oldLatLng: t,
              latlng: this._latlng
            })
          },
          getLatLng: function() {
            return this._latlng
          },
          setRadius: function(e) {
            return this.options.radius = this._radius = e, this.redraw()
          },
          getRadius: function() {
            return this._radius
          },
          setStyle: function(e) {
            var t = e && e.radius || this._radius;
            return rr.prototype.setStyle.call(this, e), this.setRadius(t), this
          },
          _project: function() {
            this._point = this._map.latLngToLayerPoint(this._latlng), this._updateBounds()
          },
          _updateBounds: function() {
            var e = this._radius,
              t = this._radiusY || e,
              n = this._clickTolerance(),
              r = [e + n, t + n];
            this._pxBounds = new F(this._point.subtract(r), this._point.add(r))
          },
          _update: function() {
            this._map && this._updatePath()
          },
          _updatePath: function() {
            this._renderer._updateCircle(this)
          },
          _empty: function() {
            return this._radius && !this._renderer._bounds.intersects(this._pxBounds)
          },
          _containsPoint: function(e) {
            return e.distanceTo(this._point) <= this._radius + this._clickTolerance()
          }
        });

      function ar(e, t) {
        return new ir(e, t)
      }
      var or = ir.extend({
        initialize: function(e, t, r) {
          if (typeof t == `number` && (t = n({}, r, {
              radius: t
            })), p(this, t), this._latlng = B(e), isNaN(this.options.radius)) throw Error(`Circle radius cannot be NaN`);
          this._mRadius = this.options.radius
        },
        setRadius: function(e) {
          return this._mRadius = e, this.redraw()
        },
        getRadius: function() {
          return this._mRadius
        },
        getBounds: function() {
          var e = [this._radius, this._radiusY || this._radius];
          return new ee(this._map.layerPointToLatLng(this._point.subtract(e)), this._map.layerPointToLatLng(this._point.add(e)))
        },
        setStyle: rr.prototype.setStyle,
        _project: function() {
          var e = this._latlng.lng,
            t = this._latlng.lat,
            n = this._map,
            r = n.options.crs;
          if (r.distance === H.distance) {
            var i = Math.PI / 180,
              a = this._mRadius / H.R / i,
              o = n.project([t + a, e]),
              s = n.project([t - a, e]),
              c = o.add(s).divideBy(2),
              l = n.unproject(c).lat,
              u = Math.acos((Math.cos(a * i) - Math.sin(t * i) * Math.sin(l * i)) / (Math.cos(t * i) * Math.cos(l * i))) / i;
            (isNaN(u) || u === 0) && (u = a / Math.cos(Math.PI / 180 * t)), this._point = c.subtract(n.getPixelOrigin()), this._radius = isNaN(u) ? 0 : c.x - n.project([l, e - u]).x, this._radiusY = c.y - o.y
          } else {
            var d = r.unproject(r.project(this._latlng).subtract([this._mRadius, 0]));
            this._point = n.latLngToLayerPoint(this._latlng), this._radius = this._point.x - n.latLngToLayerPoint(d).x
          }
          this._updateBounds()
        }
      });

      function sr(e, t, n) {
        return new or(e, t, n)
      }
      var cr = rr.extend({
        options: {
          smoothFactor: 1,
          noClip: !1
        },
        initialize: function(e, t) {
          p(this, t), this._setLatLngs(e)
        },
        getLatLngs: function() {
          return this._latlngs
        },
        setLatLngs: function(e) {
          return this._setLatLngs(e), this.redraw()
        },
        isEmpty: function() {
          return !this._latlngs.length
        },
        closestLayerPoint: function(e) {
          for (var t = 1 / 0, n = null, r = Fn, i, a, o = 0, s = this._parts.length; o < s; o++)
            for (var c = this._parts[o], l = 1, u = c.length; l < u; l++) {
              i = c[l - 1], a = c[l];
              var d = r(e, i, a, !0);
              d < t && (t = d, n = r(e, i, a))
            }
          return n && (n.distance = Math.sqrt(t)), n
        },
        getCenter: function() {
          if (!this._map) throw Error(`Must add layer to map before using getCenter()`);
          return Rn(this._defaultShape(), this._map.options.crs)
        },
        getBounds: function() {
          return this._bounds
        },
        addLatLng: function(e, t) {
          return t ||= this._defaultShape(), e = B(e), t.push(e), this._bounds.extend(e), this.redraw()
        },
        _setLatLngs: function(e) {
          this._bounds = new ee, this._latlngs = this._convertLatLngs(e)
        },
        _defaultShape: function() {
          return In(this._latlngs) ? this._latlngs : this._latlngs[0]
        },
        _convertLatLngs: function(e) {
          for (var t = [], n = In(e), r = 0, i = e.length; r < i; r++) n ? (t[r] = B(e[r]), this._bounds.extend(t[r])) : t[r] = this._convertLatLngs(e[r]);
          return t
        },
        _project: function() {
          var e = new F;
          this._rings = [], this._projectLatlngs(this._latlngs, this._rings, e), this._bounds.isValid() && e.isValid() && (this._rawPxBounds = e, this._updateBounds())
        },
        _updateBounds: function() {
          var e = this._clickTolerance(),
            t = new M(e, e);
          this._rawPxBounds && (this._pxBounds = new F([this._rawPxBounds.min.subtract(t), this._rawPxBounds.max.add(t)]))
        },
        _projectLatlngs: function(e, t, n) {
          var r = e[0] instanceof z,
            i = e.length,
            a, o;
          if (r) {
            for (o = [], a = 0; a < i; a++) o[a] = this._map.latLngToLayerPoint(e[a]), n.extend(o[a]);
            t.push(o)
          } else
            for (a = 0; a < i; a++) this._projectLatlngs(e[a], t, n)
        },
        _clipPoints: function() {
          var e = this._renderer._bounds;
          if (this._parts = [], this._pxBounds && this._pxBounds.intersects(e)) {
            if (this.options.noClip) {
              this._parts = this._rings;
              return
            }
            for (var t = this._parts, n = 0, r, i = 0, a = this._rings.length, o, s, c; n < a; n++)
              for (c = this._rings[n], r = 0, o = c.length; r < o - 1; r++) s = jn(c[r], c[r + 1], e, r, !0), s && (t[i] = t[i] || [], t[i].push(s[0]), (s[1] !== c[r + 1] || r === o - 2) && (t[i].push(s[1]), i++))
          }
        },
        _simplifyPoints: function() {
          for (var e = this._parts, t = this.options.smoothFactor, n = 0, r = e.length; n < r; n++) e[n] = wn(e[n], t)
        },
        _update: function() {
          this._map && (this._clipPoints(), this._simplifyPoints(), this._updatePath())
        },
        _updatePath: function() {
          this._renderer._updatePoly(this)
        },
        _containsPoint: function(e, t) {
          var n, r, i, a, o, s, c = this._clickTolerance();
          if (!this._pxBounds || !this._pxBounds.contains(e)) return !1;
          for (n = 0, a = this._parts.length; n < a; n++)
            for (s = this._parts[n], r = 0, o = s.length, i = o - 1; r < o; i = r++)
              if ((t || r !== 0) && Tn(e, s[i], s[r]) <= c) return !0;
          return !1
        }
      });

      function lr(e, t) {
        return new cr(e, t)
      }
      cr._flat = Ln;
      var ur = cr.extend({
        options: {
          fill: !0
        },
        isEmpty: function() {
          return !this._latlngs.length || !this._latlngs[0].length
        },
        getCenter: function() {
          if (!this._map) throw Error(`Must add layer to map before using getCenter()`);
          return xn(this._defaultShape(), this._map.options.crs)
        },
        _convertLatLngs: function(e) {
          var t = cr.prototype._convertLatLngs.call(this, e),
            n = t.length;
          return n >= 2 && t[0] instanceof z && t[0].equals(t[n - 1]) && t.pop(), t
        },
        _setLatLngs: function(e) {
          cr.prototype._setLatLngs.call(this, e), In(this._latlngs) && (this._latlngs = [this._latlngs])
        },
        _defaultShape: function() {
          return In(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0]
        },
        _clipPoints: function() {
          var e = this._renderer._bounds,
            t = this.options.weight,
            n = new M(t, t);
          if (e = new F(e.min.subtract(n), e.max.add(n)), this._parts = [], this._pxBounds && this._pxBounds.intersects(e)) {
            if (this.options.noClip) {
              this._parts = this._rings;
              return
            }
            for (var r = 0, i = this._rings.length, a; r < i; r++) a = bn(this._rings[r], e, !0), a.length && this._parts.push(a)
          }
        },
        _updatePath: function() {
          this._renderer._updatePoly(this, !0)
        },
        _containsPoint: function(e) {
          var t = !1,
            n, r, i, a, o, s, c, l;
          if (!this._pxBounds || !this._pxBounds.contains(e)) return !1;
          for (a = 0, c = this._parts.length; a < c; a++)
            for (n = this._parts[a], o = 0, l = n.length, s = l - 1; o < l; s = o++) r = n[o], i = n[s], r.y > e.y != i.y > e.y && e.x < (i.x - r.x) * (e.y - r.y) / (i.y - r.y) + r.x && (t = !t);
          return t || cr.prototype._containsPoint.call(this, e, !0)
        }
      });

      function dr(e, t) {
        return new ur(e, t)
      }
      var fr = Yn.extend({
        initialize: function(e, t) {
          p(this, t), this._layers = {}, e && this.addData(e)
        },
        addData: function(e) {
          var t = _(e) ? e : e.features,
            n, r, i;
          if (t) {
            for (n = 0, r = t.length; n < r; n++) i = t[n], (i.geometries || i.geometry || i.features || i.coordinates) && this.addData(i);
            return this
          }
          var a = this.options;
          if (a.filter && !a.filter(e)) return this;
          var o = pr(e, a);
          return o ? (o.feature = br(e), o.defaultOptions = o.options, this.resetStyle(o), a.onEachFeature && a.onEachFeature(e, o), this.addLayer(o)) : this
        },
        resetStyle: function(e) {
          return e === void 0 ? this.eachLayer(this.resetStyle, this) : (e.options = n({}, e.defaultOptions), this._setLayerStyle(e, this.options.style), this)
        },
        setStyle: function(e) {
          return this.eachLayer(function(t) {
            this._setLayerStyle(t, e)
          }, this)
        },
        _setLayerStyle: function(e, t) {
          e.setStyle && (typeof t == `function` && (t = t(e.feature)), e.setStyle(t))
        }
      });

      function pr(e, t) {
        var n = e.type === `Feature` ? e.geometry : e,
          r = n ? n.coordinates : null,
          i = [],
          a = t && t.pointToLayer,
          o = t && t.coordsToLatLng || hr,
          s, c, l, u;
        if (!r && !n) return null;
        switch (n.type) {
          case `Point`:
            return s = o(r), mr(a, e, s, t);
          case `MultiPoint`:
            for (l = 0, u = r.length; l < u; l++) s = o(r[l]), i.push(mr(a, e, s, t));
            return new Yn(i);
          case `LineString`:
          case `MultiLineString`:
            return c = gr(r, n.type === `LineString` ? 0 : 1, o), new cr(c, t);
          case `Polygon`:
          case `MultiPolygon`:
            return c = gr(r, n.type === `Polygon` ? 1 : 2, o), new ur(c, t);
          case `GeometryCollection`:
            for (l = 0, u = n.geometries.length; l < u; l++) {
              var d = pr({
                geometry: n.geometries[l],
                type: `Feature`,
                properties: e.properties
              }, t);
              d && i.push(d)
            }
            return new Yn(i);
          case `FeatureCollection`:
            for (l = 0, u = n.features.length; l < u; l++) {
              var f = pr(n.features[l], t);
              f && i.push(f)
            }
            return new Yn(i);
          default:
            throw Error(`Invalid GeoJSON object.`)
        }
      }

      function mr(e, t, n, r) {
        return e ? e(t, n) : new tr(n, r && r.markersInheritOptions && r)
      }

      function hr(e) {
        return new z(e[1], e[0], e[2])
      }

      function gr(e, t, n) {
        for (var r = [], i = 0, a = e.length, o; i < a; i++) o = t ? gr(e[i], t - 1, n) : (n || hr)(e[i]), r.push(o);
        return r
      }

      function _r(e, t) {
        return e = B(e), e.alt === void 0 ? [u(e.lng, t), u(e.lat, t)] : [u(e.lng, t), u(e.lat, t), u(e.alt, t)]
      }

      function vr(e, t, n, r) {
        for (var i = [], a = 0, o = e.length; a < o; a++) i.push(t ? vr(e[a], In(e[a]) ? 0 : t - 1, n, r) : _r(e[a], r));
        return !t && n && i.length > 0 && i.push(i[0].slice()), i
      }

      function yr(e, t) {
        return e.feature ? n({}, e.feature, {
          geometry: t
        }) : br(t)
      }

      function br(e) {
        return e.type === `Feature` || e.type === `FeatureCollection` ? e : {
          type: `Feature`,
          properties: {},
          geometry: e
        }
      }
      var xr = {
        toGeoJSON: function(e) {
          return yr(this, {
            type: `Point`,
            coordinates: _r(this.getLatLng(), e)
          })
        }
      };
      tr.include(xr), or.include(xr), ir.include(xr), cr.include({
        toGeoJSON: function(e) {
          var t = !In(this._latlngs),
            n = vr(this._latlngs, +!!t, !1, e);
          return yr(this, {
            type: (t ? `Multi` : ``) + `LineString`,
            coordinates: n
          })
        }
      }), ur.include({
        toGeoJSON: function(e) {
          var t = !In(this._latlngs),
            n = t && !In(this._latlngs[0]),
            r = vr(this._latlngs, n ? 2 : +!!t, !0, e);
          return t || (r = [r]), yr(this, {
            type: (n ? `Multi` : ``) + `Polygon`,
            coordinates: r
          })
        }
      }), qn.include({
        toMultiPoint: function(e) {
          var t = [];
          return this.eachLayer(function(n) {
            t.push(n.toGeoJSON(e).geometry.coordinates)
          }), yr(this, {
            type: `MultiPoint`,
            coordinates: t
          })
        },
        toGeoJSON: function(e) {
          var t = this.feature && this.feature.geometry && this.feature.geometry.type;
          if (t === `MultiPoint`) return this.toMultiPoint(e);
          var n = t === `GeometryCollection`,
            r = [];
          return this.eachLayer(function(t) {
            if (t.toGeoJSON) {
              var i = t.toGeoJSON(e);
              if (n) r.push(i.geometry);
              else {
                var a = br(i);
                a.type === `FeatureCollection` ? r.push.apply(r, a.features) : r.push(a)
              }
            }
          }), n ? yr(this, {
            geometries: r,
            type: `GeometryCollection`
          }) : {
            type: `FeatureCollection`,
            features: r
          }
        }
      });

      function Sr(e, t) {
        return new fr(e, t)
      }
      var Cr = Sr,
        wr = Kn.extend({
          options: {
            opacity: 1,
            alt: ``,
            interactive: !1,
            crossOrigin: !1,
            errorOverlayUrl: ``,
            zIndex: 1,
            className: ``
          },
          initialize: function(e, t, n) {
            this._url = e, this._bounds = R(t), p(this, n)
          },
          onAdd: function() {
            this._image || (this._initImage(), this.options.opacity < 1 && this._updateOpacity()), this.options.interactive && (gt(this._image, `leaflet-interactive`), this.addInteractiveTarget(this._image)), this.getPane().appendChild(this._image), this._reset()
          },
          onRemove: function() {
            dt(this._image), this.options.interactive && this.removeInteractiveTarget(this._image)
          },
          setOpacity: function(e) {
            return this.options.opacity = e, this._image && this._updateOpacity(), this
          },
          setStyle: function(e) {
            return e.opacity && this.setOpacity(e.opacity), this
          },
          bringToFront: function() {
            return this._map && pt(this._image), this
          },
          bringToBack: function() {
            return this._map && mt(this._image), this
          },
          setUrl: function(e) {
            return this._url = e, this._image && (this._image.src = e), this
          },
          setBounds: function(e) {
            return this._bounds = R(e), this._map && this._reset(), this
          },
          getEvents: function() {
            var e = {
              zoom: this._reset,
              viewreset: this._reset
            };
            return this._zoomAnimated && (e.zoomanim = this._animateZoom), e
          },
          setZIndex: function(e) {
            return this.options.zIndex = e, this._updateZIndex(), this
          },
          getBounds: function() {
            return this._bounds
          },
          getElement: function() {
            return this._image
          },
          _initImage: function() {
            var e = this._url.tagName === `IMG`,
              t = this._image = e ? this._url : ut(`img`);
            if (gt(t, `leaflet-image-layer`), this._zoomAnimated && gt(t, `leaflet-zoom-animated`), this.options.className && gt(t, this.options.className), t.onselectstart = l, t.onmousemove = l, t.onload = i(this.fire, this, `load`), t.onerror = i(this._overlayOnError, this, `error`), (this.options.crossOrigin || this.options.crossOrigin === ``) && (t.crossOrigin = this.options.crossOrigin === !0 ? `` : this.options.crossOrigin), this.options.zIndex && this._updateZIndex(), e) {
              this._url = t.src;
              return
            }
            t.src = this._url, t.alt = this.options.alt
          },
          _animateZoom: function(e) {
            var t = this._map.getZoomScale(e.zoom),
              n = this._map._latLngBoundsToNewLayerBounds(this._bounds, e.zoom, e.center).min;
            Ct(this._image, n, t)
          },
          _reset: function() {
            var e = this._image,
              t = new F(this._map.latLngToLayerPoint(this._bounds.getNorthWest()), this._map.latLngToLayerPoint(this._bounds.getSouthEast())),
              n = t.getSize();
            wt(e, t.min), e.style.width = n.x + `px`, e.style.height = n.y + `px`
          },
          _updateOpacity: function() {
            bt(this._image, this.options.opacity)
          },
          _updateZIndex: function() {
            this._image && this.options.zIndex !== void 0 && this.options.zIndex !== null && (this._image.style.zIndex = this.options.zIndex)
          },
          _overlayOnError: function() {
            this.fire(`error`);
            var e = this.options.errorOverlayUrl;
            e && this._url !== e && (this._url = e, this._image.src = e)
          },
          getCenter: function() {
            return this._bounds.getCenter()
          }
        }),
        Tr = function(e, t, n) {
          return new wr(e, t, n)
        },
        Er = wr.extend({
          options: {
            autoplay: !0,
            loop: !0,
            keepAspectRatio: !0,
            muted: !1,
            playsInline: !0
          },
          _initImage: function() {
            var e = this._url.tagName === `VIDEO`,
              t = this._image = e ? this._url : ut(`video`);
            if (gt(t, `leaflet-image-layer`), this._zoomAnimated && gt(t, `leaflet-zoom-animated`), this.options.className && gt(t, this.options.className), t.onselectstart = l, t.onmousemove = l, t.onloadeddata = i(this.fire, this, `load`), e) {
              for (var n = t.getElementsByTagName(`source`), r = [], a = 0; a < n.length; a++) r.push(n[a].src);
              this._url = n.length > 0 ? r : [t.src];
              return
            }
            _(this._url) || (this._url = [this._url]), !this.options.keepAspectRatio && Object.prototype.hasOwnProperty.call(t.style, `objectFit`) && (t.style.objectFit = `fill`), t.autoplay = !!this.options.autoplay, t.loop = !!this.options.loop, t.muted = !!this.options.muted, t.playsInline = !!this.options.playsInline;
            for (var o = 0; o < this._url.length; o++) {
              var s = ut(`source`);
              s.src = this._url[o], t.appendChild(s)
            }
          }
        });

      function Dr(e, t, n) {
        return new Er(e, t, n)
      }
      var Or = wr.extend({
        _initImage: function() {
          var e = this._image = this._url;
          gt(e, `leaflet-image-layer`), this._zoomAnimated && gt(e, `leaflet-zoom-animated`), this.options.className && gt(e, this.options.className), e.onselectstart = l, e.onmousemove = l
        }
      });

      function kr(e, t, n) {
        return new Or(e, t, n)
      }
      var Ar = Kn.extend({
        options: {
          interactive: !1,
          offset: [0, 0],
          className: ``,
          pane: void 0,
          content: ``
        },
        initialize: function(e, t) {
          e && (e instanceof z || _(e)) ? (this._latlng = B(e), p(this, t)) : (p(this, e), this._source = t), this.options.content && (this._content = this.options.content)
        },
        openOn: function(e) {
          return e = arguments.length ? e : this._source._map, e.hasLayer(this) || e.addLayer(this), this
        },
        close: function() {
          return this._map && this._map.removeLayer(this), this
        },
        toggle: function(e) {
          return this._map ? this.close() : (arguments.length ? this._source = e : e = this._source, this._prepareOpen(), this.openOn(e._map)), this
        },
        onAdd: function(e) {
          this._zoomAnimated = e._zoomAnimated, this._container || this._initLayout(), e._fadeAnimated && bt(this._container, 0), clearTimeout(this._removeTimeout), this.getPane().appendChild(this._container), this.update(), e._fadeAnimated && bt(this._container, 1), this.bringToFront(), this.options.interactive && (gt(this._container, `leaflet-interactive`), this.addInteractiveTarget(this._container))
        },
        onRemove: function(e) {
          e._fadeAnimated ? (bt(this._container, 0), this._removeTimeout = setTimeout(i(dt, void 0, this._container), 200)) : dt(this._container), this.options.interactive && (_t(this._container, `leaflet-interactive`), this.removeInteractiveTarget(this._container))
        },
        getLatLng: function() {
          return this._latlng
        },
        setLatLng: function(e) {
          return this._latlng = B(e), this._map && (this._updatePosition(), this._adjustPan()), this
        },
        getContent: function() {
          return this._content
        },
        setContent: function(e) {
          return this._content = e, this.update(), this
        },
        getElement: function() {
          return this._container
        },
        update: function() {
          this._map && (this._container.style.visibility = `hidden`, this._updateContent(), this._updateLayout(), this._updatePosition(), this._container.style.visibility = ``, this._adjustPan())
        },
        getEvents: function() {
          var e = {
            zoom: this._updatePosition,
            viewreset: this._updatePosition
          };
          return this._zoomAnimated && (e.zoomanim = this._animateZoom), e
        },
        isOpen: function() {
          return !!this._map && this._map.hasLayer(this)
        },
        bringToFront: function() {
          return this._map && pt(this._container), this
        },
        bringToBack: function() {
          return this._map && mt(this._container), this
        },
        _prepareOpen: function(e) {
          var t = this._source;
          if (!t._map) return !1;
          if (t instanceof Yn) {
            t = null;
            var n = this._source._layers;
            for (var r in n)
              if (n[r]._map) {
                t = n[r];
                break
              } if (!t) return !1;
            this._source = t
          }
          if (!e) {
            if (t.getCenter) e = t.getCenter();
            else if (t.getLatLng) e = t.getLatLng();
            else if (t.getBounds) e = t.getBounds().getCenter();
            else throw Error(`Unable to get source layer LatLng.`)
          }
          return this.setLatLng(e), this._map && this.update(), !0
        },
        _updateContent: function() {
          if (this._content) {
            var e = this._contentNode,
              t = typeof this._content == `function` ? this._content(this._source || this) : this._content;
            if (typeof t == `string`) e.innerHTML = t;
            else {
              for (; e.hasChildNodes();) e.removeChild(e.firstChild);
              e.appendChild(t)
            }
            this.fire(`contentupdate`)
          }
        },
        _updatePosition: function() {
          if (this._map) {
            var e = this._map.latLngToLayerPoint(this._latlng),
              t = P(this.options.offset),
              n = this._getAnchor();
            this._zoomAnimated ? wt(this._container, e.add(n)) : t = t.add(e).add(n);
            var r = this._containerBottom = -t.y,
              i = this._containerLeft = -Math.round(this._containerWidth / 2) + t.x;
            this._container.style.bottom = r + `px`, this._container.style.left = i + `px`
          }
        },
        _getAnchor: function() {
          return [0, 0]
        }
      });
      an.include({
        _initOverlay: function(e, t, n, r) {
          var i = t;
          return i instanceof e || (i = new e(r).setContent(t)), n && i.setLatLng(n), i
        }
      }), Kn.include({
        _initOverlay: function(e, t, n, r) {
          var i = n;
          return i instanceof e ? (p(i, r), i._source = this) : (i = t && !r ? t : new e(r, this), i.setContent(n)), i
        }
      });
      var jr = Ar.extend({
          options: {
            pane: `popupPane`,
            offset: [0, 7],
            maxWidth: 300,
            minWidth: 50,
            maxHeight: null,
            autoPan: !0,
            autoPanPaddingTopLeft: null,
            autoPanPaddingBottomRight: null,
            autoPanPadding: [5, 5],
            keepInView: !1,
            closeButton: !0,
            autoClose: !0,
            closeOnEscapeKey: !0,
            className: ``
          },
          openOn: function(e) {
            return e = arguments.length ? e : this._source._map, !e.hasLayer(this) && e._popup && e._popup.options.autoClose && e.removeLayer(e._popup), e._popup = this, Ar.prototype.openOn.call(this, e)
          },
          onAdd: function(e) {
            Ar.prototype.onAdd.call(this, e), e.fire(`popupopen`, {
              popup: this
            }), this._source && (this._source.fire(`popupopen`, {
              popup: this
            }, !0), this._source instanceof rr || this._source.on(`preclick`, Kt))
          },
          onRemove: function(e) {
            Ar.prototype.onRemove.call(this, e), e.fire(`popupclose`, {
              popup: this
            }), this._source && (this._source.fire(`popupclose`, {
              popup: this
            }, !0), this._source instanceof rr || this._source.off(`preclick`, Kt))
          },
          getEvents: function() {
            var e = Ar.prototype.getEvents.call(this);
            return (this.options.closeOnClick === void 0 ? this._map.options.closePopupOnClick : this.options.closeOnClick) && (e.preclick = this.close), this.options.keepInView && (e.moveend = this._adjustPan), e
          },
          _initLayout: function() {
            var e = `leaflet-popup`,
              t = this._container = ut(`div`, e + ` ` + (this.options.className || ``) + ` leaflet-zoom-animated`),
              n = this._wrapper = ut(`div`, e + `-content-wrapper`, t);
            if (this._contentNode = ut(`div`, e + `-content`, n), Jt(t), qt(this._contentNode), zt(t, `contextmenu`, Kt), this._tipContainer = ut(`div`, e + `-tip-container`, t), this._tip = ut(`div`, e + `-tip`, this._tipContainer), this.options.closeButton) {
              var r = this._closeButton = ut(`a`, e + `-close-button`, t);
              r.setAttribute(`role`, `button`), r.setAttribute(`aria-label`, `Close popup`), r.href = `#close`, r.innerHTML = `<span aria-hidden="true">&#215;</span>`, zt(r, `click`, function(e) {
                Yt(e), this.close()
              }, this)
            }
          },
          _updateLayout: function() {
            var e = this._contentNode,
              t = e.style;
            t.width = ``, t.whiteSpace = `nowrap`;
            var n = e.offsetWidth;
            n = Math.min(n, this.options.maxWidth), n = Math.max(n, this.options.minWidth), t.width = n + 1 + `px`, t.whiteSpace = ``, t.height = ``;
            var r = e.offsetHeight,
              i = this.options.maxHeight,
              a = `leaflet-popup-scrolled`;
            i && r > i ? (t.height = i + `px`, gt(e, a)) : _t(e, a), this._containerWidth = this._container.offsetWidth
          },
          _animateZoom: function(e) {
            var t = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center),
              n = this._getAnchor();
            wt(this._container, t.add(n))
          },
          _adjustPan: function() {
            if (this.options.autoPan) {
              if (this._map._panAnim && this._map._panAnim.stop(), this._autopanning) {
                this._autopanning = !1;
                return
              }
              var e = this._map,
                t = parseInt(lt(this._container, `marginBottom`), 10) || 0,
                n = this._container.offsetHeight + t,
                r = this._containerWidth,
                i = new M(this._containerLeft, -n - this._containerBottom);
              i._add(Tt(this._container));
              var a = e.layerPointToContainerPoint(i),
                o = P(this.options.autoPanPadding),
                s = P(this.options.autoPanPaddingTopLeft || o),
                c = P(this.options.autoPanPaddingBottomRight || o),
                l = e.getSize(),
                u = 0,
                d = 0;
              a.x + r + c.x > l.x && (u = a.x + r - l.x + c.x), a.x - u - s.x < 0 && (u = a.x - s.x), a.y + n + c.y > l.y && (d = a.y + n - l.y + c.y), a.y - d - s.y < 0 && (d = a.y - s.y), (u || d) && (this.options.keepInView && (this._autopanning = !0), e.fire(`autopanstart`).panBy([u, d]))
            }
          },
          _getAnchor: function() {
            return P(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0])
          }
        }),
        Mr = function(e, t) {
          return new jr(e, t)
        };
      an.mergeOptions({
        closePopupOnClick: !0
      }), an.include({
        openPopup: function(e, t, n) {
          return this._initOverlay(jr, e, t, n).openOn(this), this
        },
        closePopup: function(e) {
          return e = arguments.length ? e : this._popup, e && e.close(), this
        }
      }), Kn.include({
        bindPopup: function(e, t) {
          return this._popup = this._initOverlay(jr, this._popup, e, t), this._popupHandlersAdded ||= (this.on({
            click: this._openPopup,
            keypress: this._onKeyPress,
            remove: this.closePopup,
            move: this._movePopup
          }), !0), this
        },
        unbindPopup: function() {
          return this._popup &&= (this.off({
            click: this._openPopup,
            keypress: this._onKeyPress,
            remove: this.closePopup,
            move: this._movePopup
          }), this._popupHandlersAdded = !1, null), this
        },
        openPopup: function(e) {
          return this._popup && (this instanceof Yn || (this._popup._source = this), this._popup._prepareOpen(e || this._latlng) && this._popup.openOn(this._map)), this
        },
        closePopup: function() {
          return this._popup && this._popup.close(), this
        },
        togglePopup: function() {
          return this._popup && this._popup.toggle(this), this
        },
        isPopupOpen: function() {
          return this._popup ? this._popup.isOpen() : !1
        },
        setPopupContent: function(e) {
          return this._popup && this._popup.setContent(e), this
        },
        getPopup: function() {
          return this._popup
        },
        _openPopup: function(e) {
          if (this._popup && this._map) {
            Xt(e);
            var t = e.layer || e.target;
            if (this._popup._source === t && !(t instanceof rr)) {
              this._map.hasLayer(this._popup) ? this.closePopup() : this.openPopup(e.latlng);
              return
            }
            this._popup._source = t, this.openPopup(e.latlng)
          }
        },
        _movePopup: function(e) {
          this._popup.setLatLng(e.latlng)
        },
        _onKeyPress: function(e) {
          e.originalEvent.keyCode === 13 && this._openPopup(e)
        }
      });
      var Nr = Ar.extend({
          options: {
            pane: `tooltipPane`,
            offset: [0, 0],
            direction: `auto`,
            permanent: !1,
            sticky: !1,
            opacity: .9
          },
          onAdd: function(e) {
            Ar.prototype.onAdd.call(this, e), this.setOpacity(this.options.opacity), e.fire(`tooltipopen`, {
              tooltip: this
            }), this._source && (this.addEventParent(this._source), this._source.fire(`tooltipopen`, {
              tooltip: this
            }, !0))
          },
          onRemove: function(e) {
            Ar.prototype.onRemove.call(this, e), e.fire(`tooltipclose`, {
              tooltip: this
            }), this._source && (this.removeEventParent(this._source), this._source.fire(`tooltipclose`, {
              tooltip: this
            }, !0))
          },
          getEvents: function() {
            var e = Ar.prototype.getEvents.call(this);
            return this.options.permanent || (e.preclick = this.close), e
          },
          _initLayout: function() {
            var e = `leaflet-tooltip ` + (this.options.className || ``) + ` leaflet-zoom-` + (this._zoomAnimated ? `animated` : `hide`);
            this._contentNode = this._container = ut(`div`, e), this._container.setAttribute(`role`, `tooltip`), this._container.setAttribute(`id`, `leaflet-tooltip-` + o(this))
          },
          _updateLayout: function() {},
          _adjustPan: function() {},
          _setPosition: function(e) {
            var t, n, r = this._map,
              i = this._container,
              a = r.latLngToContainerPoint(r.getCenter()),
              o = r.layerPointToContainerPoint(e),
              s = this.options.direction,
              c = i.offsetWidth,
              l = i.offsetHeight,
              u = P(this.options.offset),
              d = this._getAnchor();
            s === `top` ? (t = c / 2, n = l) : s === `bottom` ? (t = c / 2, n = 0) : s === `center` ? (t = c / 2, n = l / 2) : s === `right` ? (t = 0, n = l / 2) : s === `left` ? (t = c, n = l / 2) : o.x < a.x ? (s = `right`, t = 0, n = l / 2) : (s = `left`, t = c + (u.x + d.x) * 2, n = l / 2), e = e.subtract(P(t, n, !0)).add(u).add(d), _t(i, `leaflet-tooltip-right`), _t(i, `leaflet-tooltip-left`), _t(i, `leaflet-tooltip-top`), _t(i, `leaflet-tooltip-bottom`), gt(i, `leaflet-tooltip-` + s), wt(i, e)
          },
          _updatePosition: function() {
            var e = this._map.latLngToLayerPoint(this._latlng);
            this._setPosition(e)
          },
          setOpacity: function(e) {
            this.options.opacity = e, this._container && bt(this._container, e)
          },
          _animateZoom: function(e) {
            var t = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center);
            this._setPosition(t)
          },
          _getAnchor: function() {
            return P(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0])
          }
        }),
        Pr = function(e, t) {
          return new Nr(e, t)
        };
      an.include({
        openTooltip: function(e, t, n) {
          return this._initOverlay(Nr, e, t, n).openOn(this), this
        },
        closeTooltip: function(e) {
          return e.close(), this
        }
      }), Kn.include({
        bindTooltip: function(e, t) {
          return this._tooltip && this.isTooltipOpen() && this.unbindTooltip(), this._tooltip = this._initOverlay(Nr, this._tooltip, e, t), this._initTooltipInteractions(), this._tooltip.options.permanent && this._map && this._map.hasLayer(this) && this.openTooltip(), this
        },
        unbindTooltip: function() {
          return this._tooltip &&= (this._initTooltipInteractions(!0), this.closeTooltip(), null), this
        },
        _initTooltipInteractions: function(e) {
          if (e || !this._tooltipHandlersAdded) {
            var t = e ? `off` : `on`,
              n = {
                remove: this.closeTooltip,
                move: this._moveTooltip
              };
            this._tooltip.options.permanent ? n.add = this._openTooltip : (n.mouseover = this._openTooltip, n.mouseout = this.closeTooltip, n.click = this._openTooltip, this._map ? this._addFocusListeners() : n.add = this._addFocusListeners), this._tooltip.options.sticky && (n.mousemove = this._moveTooltip), this[t](n), this._tooltipHandlersAdded = !e
          }
        },
        openTooltip: function(e) {
          return this._tooltip && (this instanceof Yn || (this._tooltip._source = this), this._tooltip._prepareOpen(e) && (this._tooltip.openOn(this._map), this.getElement ? this._setAriaDescribedByOnLayer(this) : this.eachLayer && this.eachLayer(this._setAriaDescribedByOnLayer, this))), this
        },
        closeTooltip: function() {
          if (this._tooltip) return this._tooltip.close()
        },
        toggleTooltip: function() {
          return this._tooltip && this._tooltip.toggle(this), this
        },
        isTooltipOpen: function() {
          return this._tooltip.isOpen()
        },
        setTooltipContent: function(e) {
          return this._tooltip && this._tooltip.setContent(e), this
        },
        getTooltip: function() {
          return this._tooltip
        },
        _addFocusListeners: function() {
          this.getElement ? this._addFocusListenersOnLayer(this) : this.eachLayer && this.eachLayer(this._addFocusListenersOnLayer, this)
        },
        _addFocusListenersOnLayer: function(e) {
          var t = typeof e.getElement == `function` && e.getElement();
          t && (zt(t, `focus`, function() {
            this._tooltip._source = e, this.openTooltip()
          }, this), zt(t, `blur`, this.closeTooltip, this))
        },
        _setAriaDescribedByOnLayer: function(e) {
          var t = typeof e.getElement == `function` && e.getElement();
          t && t.setAttribute(`aria-describedby`, this._tooltip._container.id)
        },
        _openTooltip: function(e) {
          if (this._tooltip && this._map) {
            if (this._map.dragging && this._map.dragging.moving() && !this._openOnceFlag) {
              this._openOnceFlag = !0;
              var t = this;
              this._map.once(`moveend`, function() {
                t._openOnceFlag = !1, t._openTooltip(e)
              });
              return
            }
            this._tooltip._source = e.layer || e.target, this.openTooltip(this._tooltip.options.sticky ? e.latlng : void 0)
          }
        },
        _moveTooltip: function(e) {
          var t = e.latlng,
            n, r;
          this._tooltip.options.sticky && e.originalEvent && (n = this._map.mouseEventToContainerPoint(e.originalEvent), r = this._map.containerPointToLayerPoint(n), t = this._map.layerPointToLatLng(r)), this._tooltip.setLatLng(t)
        }
      });
      var Fr = Zn.extend({
        options: {
          iconSize: [12, 12],
          html: !1,
          bgPos: null,
          className: `leaflet-div-icon`
        },
        createIcon: function(e) {
          var t = e && e.tagName === `DIV` ? e : document.createElement(`div`),
            n = this.options;
          if (n.html instanceof Element ? (ft(t), t.appendChild(n.html)) : t.innerHTML = n.html === !1 ? `` : n.html, n.bgPos) {
            var r = P(n.bgPos);
            t.style.backgroundPosition = -r.x + `px ` + -r.y + `px`
          }
          return this._setIconStyles(t, `icon`), t
        },
        createShadow: function() {
          return null
        }
      });

      function Ir(e) {
        return new Fr(e)
      }
      Zn.Default = $n;
      var Lr = Kn.extend({
        options: {
          tileSize: 256,
          opacity: 1,
          updateWhenIdle: Re.mobile,
          updateWhenZooming: !0,
          updateInterval: 200,
          zIndex: 1,
          bounds: null,
          minZoom: 0,
          maxZoom: void 0,
          maxNativeZoom: void 0,
          minNativeZoom: void 0,
          noWrap: !1,
          pane: `tilePane`,
          className: ``,
          keepBuffer: 2
        },
        initialize: function(e) {
          p(this, e)
        },
        onAdd: function() {
          this._initContainer(), this._levels = {}, this._tiles = {}, this._resetView()
        },
        beforeAdd: function(e) {
          e._addZoomLimit(this)
        },
        onRemove: function(e) {
          this._removeAllTiles(), dt(this._container), e._removeZoomLimit(this), this._container = null, this._tileZoom = void 0
        },
        bringToFront: function() {
          return this._map && (pt(this._container), this._setAutoZIndex(Math.max)), this
        },
        bringToBack: function() {
          return this._map && (mt(this._container), this._setAutoZIndex(Math.min)), this
        },
        getContainer: function() {
          return this._container
        },
        setOpacity: function(e) {
          return this.options.opacity = e, this._updateOpacity(), this
        },
        setZIndex: function(e) {
          return this.options.zIndex = e, this._updateZIndex(), this
        },
        isLoading: function() {
          return this._loading
        },
        redraw: function() {
          if (this._map) {
            this._removeAllTiles();
            var e = this._clampZoom(this._map.getZoom());
            e !== this._tileZoom && (this._tileZoom = e, this._updateLevels()), this._update()
          }
          return this
        },
        getEvents: function() {
          var e = {
            viewprereset: this._invalidateAll,
            viewreset: this._resetView,
            zoom: this._resetView,
            moveend: this._onMoveEnd
          };
          return this.options.updateWhenIdle || (this._onMove ||= s(this._onMoveEnd, this.options.updateInterval, this), e.move = this._onMove), this._zoomAnimated && (e.zoomanim = this._animateZoom), e
        },
        createTile: function() {
          return document.createElement(`div`)
        },
        getTileSize: function() {
          var e = this.options.tileSize;
          return e instanceof M ? e : new M(e, e)
        },
        _updateZIndex: function() {
          this._container && this.options.zIndex !== void 0 && this.options.zIndex !== null && (this._container.style.zIndex = this.options.zIndex)
        },
        _setAutoZIndex: function(e) {
          for (var t = this.getPane().children, n = -e(-1 / 0, 1 / 0), r = 0, i = t.length, a; r < i; r++) a = t[r].style.zIndex, t[r] !== this._container && a && (n = e(n, +a));
          isFinite(n) && (this.options.zIndex = n + e(-1, 1), this._updateZIndex())
        },
        _updateOpacity: function() {
          if (this._map && !Re.ielt9) {
            bt(this._container, this.options.opacity);
            var e = +new Date,
              t = !1,
              n = !1;
            for (var r in this._tiles) {
              var i = this._tiles[r];
              if (i.current && i.loaded) {
                var a = Math.min(1, (e - i.loaded) / 200);
                bt(i.el, a), a < 1 ? t = !0 : (i.active ? n = !0 : this._onOpaqueTile(i), i.active = !0)
              }
            }
            n && !this._noPrune && this._pruneTiles(), t && (E(this._fadeFrame), this._fadeFrame = T(this._updateOpacity, this))
          }
        },
        _onOpaqueTile: l,
        _initContainer: function() {
          this._container || (this._container = ut(`div`, `leaflet-layer ` + (this.options.className || ``)), this._updateZIndex(), this.options.opacity < 1 && this._updateOpacity(), this.getPane().appendChild(this._container))
        },
        _updateLevels: function() {
          var e = this._tileZoom,
            t = this.options.maxZoom;
          if (e !== void 0) {
            for (var n in this._levels) n = Number(n), this._levels[n].el.children.length || n === e ? (this._levels[n].el.style.zIndex = t - Math.abs(e - n), this._onUpdateLevel(n)) : (dt(this._levels[n].el), this._removeTilesAtZoom(n), this._onRemoveLevel(n), delete this._levels[n]);
            var r = this._levels[e],
              i = this._map;
            return r || (r = this._levels[e] = {}, r.el = ut(`div`, `leaflet-tile-container leaflet-zoom-animated`, this._container), r.el.style.zIndex = t, r.origin = i.project(i.unproject(i.getPixelOrigin()), e).round(), r.zoom = e, this._setZoomTransform(r, i.getCenter(), i.getZoom()), r.el.offsetWidth, this._onCreateLevel(r)), this._level = r, r
          }
        },
        _onUpdateLevel: l,
        _onRemoveLevel: l,
        _onCreateLevel: l,
        _pruneTiles: function() {
          if (this._map) {
            var e, t, n = this._map.getZoom();
            if (n > this.options.maxZoom || n < this.options.minZoom) {
              this._removeAllTiles();
              return
            }
            for (e in this._tiles) t = this._tiles[e], t.retain = t.current;
            for (e in this._tiles)
              if (t = this._tiles[e], t.current && !t.active) {
                var r = t.coords;
                this._retainParent(r.x, r.y, r.z, r.z - 5) || this._retainChildren(r.x, r.y, r.z, r.z + 2)
              } for (e in this._tiles) this._tiles[e].retain || this._removeTile(e)
          }
        },
        _removeTilesAtZoom: function(e) {
          for (var t in this._tiles) this._tiles[t].coords.z === e && this._removeTile(t)
        },
        _removeAllTiles: function() {
          for (var e in this._tiles) this._removeTile(e)
        },
        _invalidateAll: function() {
          for (var e in this._levels) dt(this._levels[e].el), this._onRemoveLevel(Number(e)), delete this._levels[e];
          this._removeAllTiles(), this._tileZoom = void 0
        },
        _retainParent: function(e, t, n, r) {
          var i = Math.floor(e / 2),
            a = Math.floor(t / 2),
            o = n - 1,
            s = new M(+i, +a);
          s.z = +o;
          var c = this._tileCoordsToKey(s),
            l = this._tiles[c];
          return l && l.active ? (l.retain = !0, !0) : (l && l.loaded && (l.retain = !0), o > r && this._retainParent(i, a, o, r))
        },
        _retainChildren: function(e, t, n, r) {
          for (var i = 2 * e; i < 2 * e + 2; i++)
            for (var a = 2 * t; a < 2 * t + 2; a++) {
              var o = new M(i, a);
              o.z = n + 1;
              var s = this._tileCoordsToKey(o),
                c = this._tiles[s];
              if (c && c.active) {
                c.retain = !0;
                continue
              }
              c && c.loaded && (c.retain = !0), n + 1 < r && this._retainChildren(i, a, n + 1, r)
            }
        },
        _resetView: function(e) {
          var t = e && (e.pinch || e.flyTo);
          this._setView(this._map.getCenter(), this._map.getZoom(), t, t)
        },
        _animateZoom: function(e) {
          this._setView(e.center, e.zoom, !0, e.noUpdate)
        },
        _clampZoom: function(e) {
          var t = this.options;
          return t.minNativeZoom !== void 0 && e < t.minNativeZoom ? t.minNativeZoom : t.maxNativeZoom !== void 0 && t.maxNativeZoom < e ? t.maxNativeZoom : e
        },
        _setView: function(e, t, n, r) {
          var i = Math.round(t);
          i = this.options.maxZoom !== void 0 && i > this.options.maxZoom || this.options.minZoom !== void 0 && i < this.options.minZoom ? void 0 : this._clampZoom(i);
          var a = this.options.updateWhenZooming && i !== this._tileZoom;
          (!r || a) && (this._tileZoom = i, this._abortLoading && this._abortLoading(), this._updateLevels(), this._resetGrid(), i !== void 0 && this._update(e), n || this._pruneTiles(), this._noPrune = !!n), this._setZoomTransforms(e, t)
        },
        _setZoomTransforms: function(e, t) {
          for (var n in this._levels) this._setZoomTransform(this._levels[n], e, t)
        },
        _setZoomTransform: function(e, t, n) {
          var r = this._map.getZoomScale(n, e.zoom),
            i = e.origin.multiplyBy(r).subtract(this._map._getNewPixelOrigin(t, n)).round();
          Re.any3d ? Ct(e.el, i, r) : wt(e.el, i)
        },
        _resetGrid: function() {
          var e = this._map,
            t = e.options.crs,
            n = this._tileSize = this.getTileSize(),
            r = this._tileZoom,
            i = this._map.getPixelWorldBounds(this._tileZoom);
          i && (this._globalTileRange = this._pxBoundsToTileRange(i)), this._wrapX = t.wrapLng && !this.options.noWrap && [Math.floor(e.project([0, t.wrapLng[0]], r).x / n.x), Math.ceil(e.project([0, t.wrapLng[1]], r).x / n.y)], this._wrapY = t.wrapLat && !this.options.noWrap && [Math.floor(e.project([t.wrapLat[0], 0], r).y / n.x), Math.ceil(e.project([t.wrapLat[1], 0], r).y / n.y)]
        },
        _onMoveEnd: function() {
          this._map && !this._map._animatingZoom && this._update()
        },
        _getTiledPixelBounds: function(e) {
          var t = this._map,
            n = t._animatingZoom ? Math.max(t._animateToZoom, t.getZoom()) : t.getZoom(),
            r = t.getZoomScale(n, this._tileZoom),
            i = t.project(e, this._tileZoom).floor(),
            a = t.getSize().divideBy(r * 2);
          return new F(i.subtract(a), i.add(a))
        },
        _update: function(e) {
          var t = this._map;
          if (t) {
            var n = this._clampZoom(t.getZoom());
            if (e === void 0 && (e = t.getCenter()), this._tileZoom !== void 0) {
              var r = this._getTiledPixelBounds(e),
                i = this._pxBoundsToTileRange(r),
                a = i.getCenter(),
                o = [],
                s = this.options.keepBuffer,
                c = new F(i.getBottomLeft().subtract([s, -s]), i.getTopRight().add([s, -s]));
              if (!(isFinite(i.min.x) && isFinite(i.min.y) && isFinite(i.max.x) && isFinite(i.max.y))) throw Error(`Attempted to load an infinite number of tiles`);
              for (var l in this._tiles) {
                var u = this._tiles[l].coords;
                (u.z !== this._tileZoom || !c.contains(new M(u.x, u.y))) && (this._tiles[l].current = !1)
              }
              if (Math.abs(n - this._tileZoom) > 1) {
                this._setView(e, n);
                return
              }
              for (var d = i.min.y; d <= i.max.y; d++)
                for (var f = i.min.x; f <= i.max.x; f++) {
                  var p = new M(f, d);
                  if (p.z = this._tileZoom, this._isValidTile(p)) {
                    var m = this._tiles[this._tileCoordsToKey(p)];
                    m ? m.current = !0 : o.push(p)
                  }
                }
              if (o.sort(function(e, t) {
                  return e.distanceTo(a) - t.distanceTo(a)
                }), o.length !== 0) {
                this._loading || (this._loading = !0, this.fire(`loading`));
                var h = document.createDocumentFragment();
                for (f = 0; f < o.length; f++) this._addTile(o[f], h);
                this._level.el.appendChild(h)
              }
            }
          }
        },
        _isValidTile: function(e) {
          var t = this._map.options.crs;
          if (!t.infinite) {
            var n = this._globalTileRange;
            if (!t.wrapLng && (e.x < n.min.x || e.x > n.max.x) || !t.wrapLat && (e.y < n.min.y || e.y > n.max.y)) return !1
          }
          if (!this.options.bounds) return !0;
          var r = this._tileCoordsToBounds(e);
          return R(this.options.bounds).overlaps(r)
        },
        _keyToBounds: function(e) {
          return this._tileCoordsToBounds(this._keyToTileCoords(e))
        },
        _tileCoordsToNwSe: function(e) {
          var t = this._map,
            n = this.getTileSize(),
            r = e.scaleBy(n),
            i = r.add(n);
          return [t.unproject(r, e.z), t.unproject(i, e.z)]
        },
        _tileCoordsToBounds: function(e) {
          var t = this._tileCoordsToNwSe(e),
            n = new ee(t[0], t[1]);
          return this.options.noWrap || (n = this._map.wrapLatLngBounds(n)), n
        },
        _tileCoordsToKey: function(e) {
          return e.x + `:` + e.y + `:` + e.z
        },
        _keyToTileCoords: function(e) {
          var t = e.split(`:`),
            n = new M(+t[0], +t[1]);
          return n.z = +t[2], n
        },
        _removeTile: function(e) {
          var t = this._tiles[e];
          t && (dt(t.el), delete this._tiles[e], this.fire(`tileunload`, {
            tile: t.el,
            coords: this._keyToTileCoords(e)
          }))
        },
        _initTile: function(e) {
          gt(e, `leaflet-tile`);
          var t = this.getTileSize();
          e.style.width = t.x + `px`, e.style.height = t.y + `px`, e.onselectstart = l, e.onmousemove = l, Re.ielt9 && this.options.opacity < 1 && bt(e, this.options.opacity)
        },
        _addTile: function(e, t) {
          var n = this._getTilePos(e),
            r = this._tileCoordsToKey(e),
            a = this.createTile(this._wrapCoords(e), i(this._tileReady, this, e));
          this._initTile(a), this.createTile.length < 2 && T(i(this._tileReady, this, e, null, a)), wt(a, n), this._tiles[r] = {
            el: a,
            coords: e,
            current: !0
          }, t.appendChild(a), this.fire(`tileloadstart`, {
            tile: a,
            coords: e
          })
        },
        _tileReady: function(e, t, n) {
          t && this.fire(`tileerror`, {
            error: t,
            tile: n,
            coords: e
          });
          var r = this._tileCoordsToKey(e);
          n = this._tiles[r], n && (n.loaded = +new Date, this._map._fadeAnimated ? (bt(n.el, 0), E(this._fadeFrame), this._fadeFrame = T(this._updateOpacity, this)) : (n.active = !0, this._pruneTiles()), t || (gt(n.el, `leaflet-tile-loaded`), this.fire(`tileload`, {
            tile: n.el,
            coords: e
          })), this._noTilesToLoad() && (this._loading = !1, this.fire(`load`), Re.ielt9 || !this._map._fadeAnimated ? T(this._pruneTiles, this) : setTimeout(i(this._pruneTiles, this), 250)))
        },
        _getTilePos: function(e) {
          return e.scaleBy(this.getTileSize()).subtract(this._level.origin)
        },
        _wrapCoords: function(e) {
          var t = new M(this._wrapX ? c(e.x, this._wrapX) : e.x, this._wrapY ? c(e.y, this._wrapY) : e.y);
          return t.z = e.z, t
        },
        _pxBoundsToTileRange: function(e) {
          var t = this.getTileSize();
          return new F(e.min.unscaleBy(t).floor(), e.max.unscaleBy(t).ceil().subtract([1, 1]))
        },
        _noTilesToLoad: function() {
          for (var e in this._tiles)
            if (!this._tiles[e].loaded) return !1;
          return !0
        }
      });

      function Rr(e) {
        return new Lr(e)
      }
      var zr = Lr.extend({
        options: {
          minZoom: 0,
          maxZoom: 18,
          subdomains: `abc`,
          errorTileUrl: ``,
          zoomOffset: 0,
          tms: !1,
          zoomReverse: !1,
          detectRetina: !1,
          crossOrigin: !1,
          referrerPolicy: !1
        },
        initialize: function(e, t) {
          this._url = e, t = p(this, t), t.detectRetina && Re.retina && t.maxZoom > 0 ? (t.tileSize = Math.floor(t.tileSize / 2), t.zoomReverse ? (t.zoomOffset--, t.minZoom = Math.min(t.maxZoom, t.minZoom + 1)) : (t.zoomOffset++, t.maxZoom = Math.max(t.minZoom, t.maxZoom - 1)), t.minZoom = Math.max(0, t.minZoom)) : t.zoomReverse ? t.minZoom = Math.min(t.maxZoom, t.minZoom) : t.maxZoom = Math.max(t.minZoom, t.maxZoom), typeof t.subdomains == `string` && (t.subdomains = t.subdomains.split(``)), this.on(`tileunload`, this._onTileRemove)
        },
        setUrl: function(e, t) {
          return this._url === e && t === void 0 && (t = !0), this._url = e, t || this.redraw(), this
        },
        createTile: function(e, t) {
          var n = document.createElement(`img`);
          return zt(n, `load`, i(this._tileOnLoad, this, t, n)), zt(n, `error`, i(this._tileOnError, this, t, n)), (this.options.crossOrigin || this.options.crossOrigin === ``) && (n.crossOrigin = this.options.crossOrigin === !0 ? `` : this.options.crossOrigin), typeof this.options.referrerPolicy == `string` && (n.referrerPolicy = this.options.referrerPolicy), n.alt = ``, n.src = this.getTileUrl(e), n
        },
        getTileUrl: function(e) {
          var t = {
            r: Re.retina ? `@2x` : ``,
            s: this._getSubdomain(e),
            x: e.x,
            y: e.y,
            z: this._getZoomForUrl()
          };
          if (this._map && !this._map.options.crs.infinite) {
            var r = this._globalTileRange.max.y - e.y;
            this.options.tms && (t.y = r), t[`-y`] = r
          }
          return g(this._url, n(t, this.options))
        },
        _tileOnLoad: function(e, t) {
          Re.ielt9 ? setTimeout(i(e, this, null, t), 0) : e(null, t)
        },
        _tileOnError: function(e, t, n) {
          var r = this.options.errorTileUrl;
          r && t.getAttribute(`src`) !== r && (t.src = r), e(n, t)
        },
        _onTileRemove: function(e) {
          e.tile.onload = null
        },
        _getZoomForUrl: function() {
          var e = this._tileZoom,
            t = this.options.maxZoom,
            n = this.options.zoomReverse,
            r = this.options.zoomOffset;
          return n && (e = t - e), e + r
        },
        _getSubdomain: function(e) {
          var t = Math.abs(e.x + e.y) % this.options.subdomains.length;
          return this.options.subdomains[t]
        },
        _abortLoading: function() {
          var e, t;
          for (e in this._tiles)
            if (this._tiles[e].coords.z !== this._tileZoom && (t = this._tiles[e].el, t.onload = l, t.onerror = l, !t.complete)) {
              t.src = y;
              var n = this._tiles[e].coords;
              dt(t), delete this._tiles[e], this.fire(`tileabort`, {
                tile: t,
                coords: n
              })
            }
        },
        _removeTile: function(e) {
          var t = this._tiles[e];
          if (t) return t.el.setAttribute(`src`, y), Lr.prototype._removeTile.call(this, e)
        },
        _tileReady: function(e, t, n) {
          if (!(!this._map || n && n.getAttribute(`src`) === y)) return Lr.prototype._tileReady.call(this, e, t, n)
        }
      });

      function Br(e, t) {
        return new zr(e, t)
      }
      var Vr = zr.extend({
        defaultWmsParams: {
          service: `WMS`,
          request: `GetMap`,
          layers: ``,
          styles: ``,
          format: `image/jpeg`,
          transparent: !1,
          version: `1.1.1`
        },
        options: {
          crs: null,
          uppercase: !1
        },
        initialize: function(e, t) {
          this._url = e;
          var r = n({}, this.defaultWmsParams);
          for (var i in t) i in this.options || (r[i] = t[i]);
          t = p(this, t);
          var a = t.detectRetina && Re.retina ? 2 : 1,
            o = this.getTileSize();
          r.width = o.x * a, r.height = o.y * a, this.wmsParams = r
        },
        onAdd: function(e) {
          this._crs = this.options.crs || e.options.crs, this._wmsVersion = parseFloat(this.wmsParams.version);
          var t = this._wmsVersion >= 1.3 ? `crs` : `srs`;
          this.wmsParams[t] = this._crs.code, zr.prototype.onAdd.call(this, e)
        },
        getTileUrl: function(e) {
          var t = this._tileCoordsToNwSe(e),
            n = this._crs,
            r = I(n.project(t[0]), n.project(t[1])),
            i = r.min,
            a = r.max,
            o = (this._wmsVersion >= 1.3 && this._crs === Wn ? [i.y, i.x, a.y, a.x] : [i.x, i.y, a.x, a.y]).join(`,`),
            s = zr.prototype.getTileUrl.call(this, e);
          return s + m(this.wmsParams, s, this.options.uppercase) + (this.options.uppercase ? `&BBOX=` : `&bbox=`) + o
        },
        setParams: function(e, t) {
          return n(this.wmsParams, e), t || this.redraw(), this
        }
      });

      function Hr(e, t) {
        return new Vr(e, t)
      }
      zr.WMS = Vr, Br.wms = Hr;
      var Ur = Kn.extend({
          options: {
            padding: .1
          },
          initialize: function(e) {
            p(this, e), o(this), this._layers = this._layers || {}
          },
          onAdd: function() {
            this._container || (this._initContainer(), gt(this._container, `leaflet-zoom-animated`)), this.getPane().appendChild(this._container), this._update(), this.on(`update`, this._updatePaths, this)
          },
          onRemove: function() {
            this.off(`update`, this._updatePaths, this), this._destroyContainer()
          },
          getEvents: function() {
            var e = {
              viewreset: this._reset,
              zoom: this._onZoom,
              moveend: this._update,
              zoomend: this._onZoomEnd
            };
            return this._zoomAnimated && (e.zoomanim = this._onAnimZoom), e
          },
          _onAnimZoom: function(e) {
            this._updateTransform(e.center, e.zoom)
          },
          _onZoom: function() {
            this._updateTransform(this._map.getCenter(), this._map.getZoom())
          },
          _updateTransform: function(e, t) {
            var n = this._map.getZoomScale(t, this._zoom),
              r = this._map.getSize().multiplyBy(.5 + this.options.padding),
              i = this._map.project(this._center, t),
              a = r.multiplyBy(-n).add(i).subtract(this._map._getNewPixelOrigin(e, t));
            Re.any3d ? Ct(this._container, a, n) : wt(this._container, a)
          },
          _reset: function() {
            for (var e in this._update(), this._updateTransform(this._center, this._zoom), this._layers) this._layers[e]._reset()
          },
          _onZoomEnd: function() {
            for (var e in this._layers) this._layers[e]._project()
          },
          _updatePaths: function() {
            for (var e in this._layers) this._layers[e]._update()
          },
          _update: function() {
            var e = this.options.padding,
              t = this._map.getSize(),
              n = this._map.containerPointToLayerPoint(t.multiplyBy(-e)).round();
            this._bounds = new F(n, n.add(t.multiplyBy(1 + e * 2)).round()), this._center = this._map.getCenter(), this._zoom = this._map.getZoom()
          }
        }),
        Wr = Ur.extend({
          options: {
            tolerance: 0
          },
          getEvents: function() {
            var e = Ur.prototype.getEvents.call(this);
            return e.viewprereset = this._onViewPreReset, e
          },
          _onViewPreReset: function() {
            this._postponeUpdatePaths = !0
          },
          onAdd: function() {
            Ur.prototype.onAdd.call(this), this._draw()
          },
          _initContainer: function() {
            var e = this._container = document.createElement(`canvas`);
            zt(e, `mousemove`, this._onMouseMove, this), zt(e, `click dblclick mousedown mouseup contextmenu`, this._onClick, this), zt(e, `mouseout`, this._handleMouseOut, this), e._leaflet_disable_events = !0, this._ctx = e.getContext(`2d`)
          },
          _destroyContainer: function() {
            E(this._redrawRequest), delete this._ctx, dt(this._container), Vt(this._container), delete this._container
          },
          _updatePaths: function() {
            if (!this._postponeUpdatePaths) {
              var e;
              for (var t in this._redrawBounds = null, this._layers) e = this._layers[t], e._update();
              this._redraw()
            }
          },
          _update: function() {
            if (!(this._map._animatingZoom && this._bounds)) {
              Ur.prototype._update.call(this);
              var e = this._bounds,
                t = this._container,
                n = e.getSize(),
                r = Re.retina ? 2 : 1;
              wt(t, e.min), t.width = r * n.x, t.height = r * n.y, t.style.width = n.x + `px`, t.style.height = n.y + `px`, Re.retina && this._ctx.scale(2, 2), this._ctx.translate(-e.min.x, -e.min.y), this.fire(`update`)
            }
          },
          _reset: function() {
            Ur.prototype._reset.call(this), this._postponeUpdatePaths && (this._postponeUpdatePaths = !1, this._updatePaths())
          },
          _initPath: function(e) {
            this._updateDashArray(e), this._layers[o(e)] = e;
            var t = e._order = {
              layer: e,
              prev: this._drawLast,
              next: null
            };
            this._drawLast && (this._drawLast.next = t), this._drawLast = t, this._drawFirst = this._drawFirst || this._drawLast
          },
          _addPath: function(e) {
            this._requestRedraw(e)
          },
          _removePath: function(e) {
            var t = e._order,
              n = t.next,
              r = t.prev;
            n ? n.prev = r : this._drawLast = r, r ? r.next = n : this._drawFirst = n, delete e._order, delete this._layers[o(e)], this._requestRedraw(e)
          },
          _updatePath: function(e) {
            this._extendRedrawBounds(e), e._project(), e._update(), this._requestRedraw(e)
          },
          _updateStyle: function(e) {
            this._updateDashArray(e), this._requestRedraw(e)
          },
          _updateDashArray: function(e) {
            if (typeof e.options.dashArray == `string`) {
              for (var t = e.options.dashArray.split(/[, ]+/), n = [], r, i = 0; i < t.length; i++) {
                if (r = Number(t[i]), isNaN(r)) return;
                n.push(r)
              }
              e.options._dashArray = n
            } else e.options._dashArray = e.options.dashArray
          },
          _requestRedraw: function(e) {
            this._map && (this._extendRedrawBounds(e), this._redrawRequest = this._redrawRequest || T(this._redraw, this))
          },
          _extendRedrawBounds: function(e) {
            if (e._pxBounds) {
              var t = (e.options.weight || 0) + 1;
              this._redrawBounds = this._redrawBounds || new F, this._redrawBounds.extend(e._pxBounds.min.subtract([t, t])), this._redrawBounds.extend(e._pxBounds.max.add([t, t]))
            }
          },
          _redraw: function() {
            this._redrawRequest = null, this._redrawBounds && (this._redrawBounds.min._floor(), this._redrawBounds.max._ceil()), this._clear(), this._draw(), this._redrawBounds = null
          },
          _clear: function() {
            var e = this._redrawBounds;
            if (e) {
              var t = e.getSize();
              this._ctx.clearRect(e.min.x, e.min.y, t.x, t.y)
            } else this._ctx.save(), this._ctx.setTransform(1, 0, 0, 1, 0, 0), this._ctx.clearRect(0, 0, this._container.width, this._container.height), this._ctx.restore()
          },
          _draw: function() {
            var e, t = this._redrawBounds;
            if (this._ctx.save(), t) {
              var n = t.getSize();
              this._ctx.beginPath(), this._ctx.rect(t.min.x, t.min.y, n.x, n.y), this._ctx.clip()
            }
            this._drawing = !0;
            for (var r = this._drawFirst; r; r = r.next) e = r.layer, (!t || e._pxBounds && e._pxBounds.intersects(t)) && e._updatePath();
            this._drawing = !1, this._ctx.restore()
          },
          _updatePoly: function(e, t) {
            if (this._drawing) {
              var n, r, i, a, o = e._parts,
                s = o.length,
                c = this._ctx;
              if (s) {
                for (c.beginPath(), n = 0; n < s; n++) {
                  for (r = 0, i = o[n].length; r < i; r++) a = o[n][r], c[r ? `lineTo` : `moveTo`](a.x, a.y);
                  t && c.closePath()
                }
                this._fillStroke(c, e)
              }
            }
          },
          _updateCircle: function(e) {
            if (this._drawing && !e._empty()) {
              var t = e._point,
                n = this._ctx,
                r = Math.max(Math.round(e._radius), 1),
                i = (Math.max(Math.round(e._radiusY), 1) || r) / r;
              i !== 1 && (n.save(), n.scale(1, i)), n.beginPath(), n.arc(t.x, t.y / i, r, 0, Math.PI * 2, !1), i !== 1 && n.restore(), this._fillStroke(n, e)
            }
          },
          _fillStroke: function(e, t) {
            var n = t.options;
            n.fill && (e.globalAlpha = n.fillOpacity, e.fillStyle = n.fillColor || n.color, e.fill(n.fillRule || `evenodd`)), n.stroke && n.weight !== 0 && (e.setLineDash && e.setLineDash(t.options && t.options._dashArray || []), e.globalAlpha = n.opacity, e.lineWidth = n.weight, e.strokeStyle = n.color, e.lineCap = n.lineCap, e.lineJoin = n.lineJoin, e.stroke())
          },
          _onClick: function(e) {
            for (var t = this._map.mouseEventToLayerPoint(e), n, r, i = this._drawFirst; i; i = i.next) n = i.layer, n.options.interactive && n._containsPoint(t) && (e.type !== `click` && e.type !== `preclick` || !this._map._draggableMoved(n)) && (r = n);
            this._fireEvent(r ? [r] : !1, e)
          },
          _onMouseMove: function(e) {
            if (!(!this._map || this._map.dragging.moving() || this._map._animatingZoom)) {
              var t = this._map.mouseEventToLayerPoint(e);
              this._handleMouseHover(e, t)
            }
          },
          _handleMouseOut: function(e) {
            var t = this._hoveredLayer;
            t && (_t(this._container, `leaflet-interactive`), this._fireEvent([t], e, `mouseout`), this._hoveredLayer = null, this._mouseHoverThrottled = !1)
          },
          _handleMouseHover: function(e, t) {
            if (!this._mouseHoverThrottled) {
              for (var n, r, a = this._drawFirst; a; a = a.next) n = a.layer, n.options.interactive && n._containsPoint(t) && (r = n);
              r !== this._hoveredLayer && (this._handleMouseOut(e), r && (gt(this._container, `leaflet-interactive`), this._fireEvent([r], e, `mouseover`), this._hoveredLayer = r)), this._fireEvent(this._hoveredLayer ? [this._hoveredLayer] : !1, e), this._mouseHoverThrottled = !0, setTimeout(i(function() {
                this._mouseHoverThrottled = !1
              }, this), 32)
            }
          },
          _fireEvent: function(e, t, n) {
            this._map._fireDOMEvent(t, n || t.type, e)
          },
          _bringToFront: function(e) {
            var t = e._order;
            if (t) {
              var n = t.next,
                r = t.prev;
              if (n) n.prev = r;
              else return;
              r ? r.next = n : n && (this._drawFirst = n), t.prev = this._drawLast, this._drawLast.next = t, t.next = null, this._drawLast = t, this._requestRedraw(e)
            }
          },
          _bringToBack: function(e) {
            var t = e._order;
            if (t) {
              var n = t.next,
                r = t.prev;
              if (r) r.next = n;
              else return;
              n ? n.prev = r : r && (this._drawLast = r), t.prev = null, t.next = this._drawFirst, this._drawFirst.prev = t, this._drawFirst = t, this._requestRedraw(e)
            }
          }
        });

      function Gr(e) {
        return Re.canvas ? new Wr(e) : null
      }
      var Kr = (function() {
          try {
            return document.namespaces.add(`lvml`, `urn:schemas-microsoft-com:vml`),
              function(e) {
                return document.createElement(`<lvml:` + e + ` class="lvml">`)
              }
          } catch {}
          return function(e) {
            return document.createElement(`<` + e + ` xmlns="urn:schemas-microsoft.com:vml" class="lvml">`)
          }
        })(),
        qr = {
          _initContainer: function() {
            this._container = ut(`div`, `leaflet-vml-container`)
          },
          _update: function() {
            this._map._animatingZoom || (Ur.prototype._update.call(this), this.fire(`update`))
          },
          _initPath: function(e) {
            var t = e._container = Kr(`shape`);
            gt(t, `leaflet-vml-shape ` + (this.options.className || ``)), t.coordsize = `1 1`, e._path = Kr(`path`), t.appendChild(e._path), this._updateStyle(e), this._layers[o(e)] = e
          },
          _addPath: function(e) {
            var t = e._container;
            this._container.appendChild(t), e.options.interactive && e.addInteractiveTarget(t)
          },
          _removePath: function(e) {
            var t = e._container;
            dt(t), e.removeInteractiveTarget(t), delete this._layers[o(e)]
          },
          _updateStyle: function(e) {
            var t = e._stroke,
              n = e._fill,
              r = e.options,
              i = e._container;
            i.stroked = !!r.stroke, i.filled = !!r.fill, r.stroke ? (t ||= e._stroke = Kr(`stroke`), i.appendChild(t), t.weight = r.weight + `px`, t.color = r.color, t.opacity = r.opacity, r.dashArray ? t.dashStyle = _(r.dashArray) ? r.dashArray.join(` `) : r.dashArray.replace(/( *, *)/g, ` `) : t.dashStyle = ``, t.endcap = r.lineCap.replace(`butt`, `flat`), t.joinstyle = r.lineJoin) : t && (i.removeChild(t), e._stroke = null), r.fill ? (n ||= e._fill = Kr(`fill`), i.appendChild(n), n.color = r.fillColor || r.color, n.opacity = r.fillOpacity) : n && (i.removeChild(n), e._fill = null)
          },
          _updateCircle: function(e) {
            var t = e._point.round(),
              n = Math.round(e._radius),
              r = Math.round(e._radiusY || n);
            this._setPath(e, e._empty() ? `M0 0` : `AL ` + t.x + `,` + t.y + ` ` + n + `,` + r + ` 0,23592600`)
          },
          _setPath: function(e, t) {
            e._path.v = t
          },
          _bringToFront: function(e) {
            pt(e._container)
          },
          _bringToBack: function(e) {
            mt(e._container)
          }
        },
        Jr = Re.vml ? Kr : ae,
        Yr = Ur.extend({
          _initContainer: function() {
            this._container = Jr(`svg`), this._container.setAttribute(`pointer-events`, `none`), this._rootGroup = Jr(`g`), this._container.appendChild(this._rootGroup)
          },
          _destroyContainer: function() {
            dt(this._container), Vt(this._container), delete this._container, delete this._rootGroup, delete this._svgSize
          },
          _update: function() {
            if (!(this._map._animatingZoom && this._bounds)) {
              Ur.prototype._update.call(this);
              var e = this._bounds,
                t = e.getSize(),
                n = this._container;
              (!this._svgSize || !this._svgSize.equals(t)) && (this._svgSize = t, n.setAttribute(`width`, t.x), n.setAttribute(`height`, t.y)), wt(n, e.min), n.setAttribute(`viewBox`, [e.min.x, e.min.y, t.x, t.y].join(` `)), this.fire(`update`)
            }
          },
          _initPath: function(e) {
            var t = e._path = Jr(`path`);
            e.options.className && gt(t, e.options.className), e.options.interactive && gt(t, `leaflet-interactive`), this._updateStyle(e), this._layers[o(e)] = e
          },
          _addPath: function(e) {
            this._rootGroup || this._initContainer(), this._rootGroup.appendChild(e._path), e.addInteractiveTarget(e._path)
          },
          _removePath: function(e) {
            dt(e._path), e.removeInteractiveTarget(e._path), delete this._layers[o(e)]
          },
          _updatePath: function(e) {
            e._project(), e._update()
          },
          _updateStyle: function(e) {
            var t = e._path,
              n = e.options;
            t && (n.stroke ? (t.setAttribute(`stroke`, n.color), t.setAttribute(`stroke-opacity`, n.opacity), t.setAttribute(`stroke-width`, n.weight), t.setAttribute(`stroke-linecap`, n.lineCap), t.setAttribute(`stroke-linejoin`, n.lineJoin), n.dashArray ? t.setAttribute(`stroke-dasharray`, n.dashArray) : t.removeAttribute(`stroke-dasharray`), n.dashOffset ? t.setAttribute(`stroke-dashoffset`, n.dashOffset) : t.removeAttribute(`stroke-dashoffset`)) : t.setAttribute(`stroke`, `none`), n.fill ? (t.setAttribute(`fill`, n.fillColor || n.color), t.setAttribute(`fill-opacity`, n.fillOpacity), t.setAttribute(`fill-rule`, n.fillRule || `evenodd`)) : t.setAttribute(`fill`, `none`))
          },
          _updatePoly: function(e, t) {
            this._setPath(e, G(e._parts, t))
          },
          _updateCircle: function(e) {
            var t = e._point,
              n = Math.max(Math.round(e._radius), 1),
              r = Math.max(Math.round(e._radiusY), 1) || n,
              i = `a` + n + `,` + r + ` 0 1,0 `,
              a = e._empty() ? `M0 0` : `M` + (t.x - n) + `,` + t.y + i + n * 2 + `,0 ` + i + -n * 2 + `,0 `;
            this._setPath(e, a)
          },
          _setPath: function(e, t) {
            e._path.setAttribute(`d`, t)
          },
          _bringToFront: function(e) {
            pt(e._path)
          },
          _bringToBack: function(e) {
            mt(e._path)
          }
        });
      Re.vml && Yr.include(qr);

      function Xr(e) {
        return Re.svg || Re.vml ? new Yr(e) : null
      }
      an.include({
        getRenderer: function(e) {
          var t = e.options.renderer || this._getPaneRenderer(e.options.pane) || this.options.renderer || this._renderer;
          return t ||= this._renderer = this._createRenderer(), this.hasLayer(t) || this.addLayer(t), t
        },
        _getPaneRenderer: function(e) {
          if (e === `overlayPane` || e === void 0) return !1;
          var t = this._paneRenderers[e];
          return t === void 0 && (t = this._createRenderer({
            pane: e
          }), this._paneRenderers[e] = t), t
        },
        _createRenderer: function(e) {
          return this.options.preferCanvas && Gr(e) || Xr(e)
        }
      });
      var Zr = ur.extend({
        initialize: function(e, t) {
          ur.prototype.initialize.call(this, this._boundsToLatLngs(e), t)
        },
        setBounds: function(e) {
          return this.setLatLngs(this._boundsToLatLngs(e))
        },
        _boundsToLatLngs: function(e) {
          return e = R(e), [e.getSouthWest(), e.getNorthWest(), e.getNorthEast(), e.getSouthEast()]
        }
      });

      function Qr(e, t) {
        return new Zr(e, t)
      }
      Yr.create = Jr, Yr.pointsToPath = G, fr.geometryToLayer = pr, fr.coordsToLatLng = hr, fr.coordsToLatLngs = gr, fr.latLngToCoords = _r, fr.latLngsToCoords = vr, fr.getFeature = yr, fr.asFeature = br, an.mergeOptions({
        boxZoom: !0
      });
      var $r = gn.extend({
        initialize: function(e) {
          this._map = e, this._container = e._container, this._pane = e._panes.overlayPane, this._resetStateTimeout = 0, e.on(`unload`, this._destroy, this)
        },
        addHooks: function() {
          zt(this._container, `mousedown`, this._onMouseDown, this)
        },
        removeHooks: function() {
          Vt(this._container, `mousedown`, this._onMouseDown, this)
        },
        moved: function() {
          return this._moved
        },
        _destroy: function() {
          dt(this._pane), delete this._pane
        },
        _resetState: function() {
          this._resetStateTimeout = 0, this._moved = !1
        },
        _clearDeferredResetState: function() {
          this._resetStateTimeout !== 0 && (clearTimeout(this._resetStateTimeout), this._resetStateTimeout = 0)
        },
        _onMouseDown: function(e) {
          if (!e.shiftKey || e.which !== 1 && e.button !== 1) return !1;
          this._clearDeferredResetState(), this._resetState(), Et(), At(), this._startPoint = this._map.mouseEventToContainerPoint(e), zt(document, {
            contextmenu: Xt,
            mousemove: this._onMouseMove,
            mouseup: this._onMouseUp,
            keydown: this._onKeyDown
          }, this)
        },
        _onMouseMove: function(e) {
          this._moved || (this._moved = !0, this._box = ut(`div`, `leaflet-zoom-box`, this._container), gt(this._container, `leaflet-crosshair`), this._map.fire(`boxzoomstart`)), this._point = this._map.mouseEventToContainerPoint(e);
          var t = new F(this._point, this._startPoint),
            n = t.getSize();
          wt(this._box, t.min), this._box.style.width = n.x + `px`, this._box.style.height = n.y + `px`
        },
        _finish: function() {
          this._moved && (dt(this._box), _t(this._container, `leaflet-crosshair`)), Dt(), jt(), Vt(document, {
            contextmenu: Xt,
            mousemove: this._onMouseMove,
            mouseup: this._onMouseUp,
            keydown: this._onKeyDown
          }, this)
        },
        _onMouseUp: function(e) {
          if ((e.which === 1 || e.button === 1) && (this._finish(), this._moved)) {
            this._clearDeferredResetState(), this._resetStateTimeout = setTimeout(i(this._resetState, this), 0);
            var t = new ee(this._map.containerPointToLatLng(this._startPoint), this._map.containerPointToLatLng(this._point));
            this._map.fitBounds(t).fire(`boxzoomend`, {
              boxZoomBounds: t
            })
          }
        },
        _onKeyDown: function(e) {
          e.keyCode === 27 && (this._finish(), this._clearDeferredResetState(), this._resetState())
        }
      });
      an.addInitHook(`addHandler`, `boxZoom`, $r), an.mergeOptions({
        doubleClickZoom: !0
      });
      var ei = gn.extend({
        addHooks: function() {
          this._map.on(`dblclick`, this._onDoubleClick, this)
        },
        removeHooks: function() {
          this._map.off(`dblclick`, this._onDoubleClick, this)
        },
        _onDoubleClick: function(e) {
          var t = this._map,
            n = t.getZoom(),
            r = t.options.zoomDelta,
            i = e.originalEvent.shiftKey ? n - r : n + r;
          t.options.doubleClickZoom === `center` ? t.setZoom(i) : t.setZoomAround(e.containerPoint, i)
        }
      });
      an.addInitHook(`addHandler`, `doubleClickZoom`, ei), an.mergeOptions({
        dragging: !0,
        inertia: !0,
        inertiaDeceleration: 3400,
        inertiaMaxSpeed: 1 / 0,
        easeLinearity: .2,
        worldCopyJump: !1,
        maxBoundsViscosity: 0
      });
      var ti = gn.extend({
        addHooks: function() {
          if (!this._draggable) {
            var e = this._map;
            this._draggable = new yn(e._mapPane, e._container), this._draggable.on({
              dragstart: this._onDragStart,
              drag: this._onDrag,
              dragend: this._onDragEnd
            }, this), this._draggable.on(`predrag`, this._onPreDragLimit, this), e.options.worldCopyJump && (this._draggable.on(`predrag`, this._onPreDragWrap, this), e.on(`zoomend`, this._onZoomEnd, this), e.whenReady(this._onZoomEnd, this))
          }
          gt(this._map._container, `leaflet-grab leaflet-touch-drag`), this._draggable.enable(), this._positions = [], this._times = []
        },
        removeHooks: function() {
          _t(this._map._container, `leaflet-grab`), _t(this._map._container, `leaflet-touch-drag`), this._draggable.disable()
        },
        moved: function() {
          return this._draggable && this._draggable._moved
        },
        moving: function() {
          return this._draggable && this._draggable._moving
        },
        _onDragStart: function() {
          var e = this._map;
          if (e._stop(), this._map.options.maxBounds && this._map.options.maxBoundsViscosity) {
            var t = R(this._map.options.maxBounds);
            this._offsetLimit = I(this._map.latLngToContainerPoint(t.getNorthWest()).multiplyBy(-1), this._map.latLngToContainerPoint(t.getSouthEast()).multiplyBy(-1).add(this._map.getSize())), this._viscosity = Math.min(1, Math.max(0, this._map.options.maxBoundsViscosity))
          } else this._offsetLimit = null;
          e.fire(`movestart`).fire(`dragstart`), e.options.inertia && (this._positions = [], this._times = [])
        },
        _onDrag: function(e) {
          if (this._map.options.inertia) {
            var t = this._lastTime = +new Date,
              n = this._lastPos = this._draggable._absPos || this._draggable._newPos;
            this._positions.push(n), this._times.push(t), this._prunePositions(t)
          }
          this._map.fire(`move`, e).fire(`drag`, e)
        },
        _prunePositions: function(e) {
          for (; this._positions.length > 1 && e - this._times[0] > 50;) this._positions.shift(), this._times.shift()
        },
        _onZoomEnd: function() {
          var e = this._map.getSize().divideBy(2),
            t = this._map.latLngToLayerPoint([0, 0]);
          this._initialWorldOffset = t.subtract(e).x, this._worldWidth = this._map.getPixelWorldBounds().getSize().x
        },
        _viscousLimit: function(e, t) {
          return e - (e - t) * this._viscosity
        },
        _onPreDragLimit: function() {
          if (this._viscosity && this._offsetLimit) {
            var e = this._draggable._newPos.subtract(this._draggable._startPos),
              t = this._offsetLimit;
            e.x < t.min.x && (e.x = this._viscousLimit(e.x, t.min.x)), e.y < t.min.y && (e.y = this._viscousLimit(e.y, t.min.y)), e.x > t.max.x && (e.x = this._viscousLimit(e.x, t.max.x)), e.y > t.max.y && (e.y = this._viscousLimit(e.y, t.max.y)), this._draggable._newPos = this._draggable._startPos.add(e)
          }
        },
        _onPreDragWrap: function() {
          var e = this._worldWidth,
            t = Math.round(e / 2),
            n = this._initialWorldOffset,
            r = this._draggable._newPos.x,
            i = (r - t + n) % e + t - n,
            a = (r + t + n) % e - t - n,
            o = Math.abs(i + n) < Math.abs(a + n) ? i : a;
          this._draggable._absPos = this._draggable._newPos.clone(), this._draggable._newPos.x = o
        },
        _onDragEnd: function(e) {
          var t = this._map,
            n = t.options,
            r = !n.inertia || e.noInertia || this._times.length < 2;
          if (t.fire(`dragend`, e), r) t.fire(`moveend`);
          else {
            this._prunePositions(+new Date);
            var i = this._lastPos.subtract(this._positions[0]),
              a = (this._lastTime - this._times[0]) / 1e3,
              o = n.easeLinearity,
              s = i.multiplyBy(o / a),
              c = s.distanceTo([0, 0]),
              l = Math.min(n.inertiaMaxSpeed, c),
              u = s.multiplyBy(l / c),
              d = l / (n.inertiaDeceleration * o),
              f = u.multiplyBy(-d / 2).round();
            !f.x && !f.y ? t.fire(`moveend`) : (f = t._limitOffset(f, t.options.maxBounds), T(function() {
              t.panBy(f, {
                duration: d,
                easeLinearity: o,
                noMoveStart: !0,
                animate: !0
              })
            }))
          }
        }
      });
      an.addInitHook(`addHandler`, `dragging`, ti), an.mergeOptions({
        keyboard: !0,
        keyboardPanDelta: 80
      });
      var ni = gn.extend({
        keyCodes: {
          left: [37],
          right: [39],
          down: [40],
          up: [38],
          zoomIn: [187, 107, 61, 171],
          zoomOut: [189, 109, 54, 173]
        },
        initialize: function(e) {
          this._map = e, this._setPanDelta(e.options.keyboardPanDelta), this._setZoomDelta(e.options.zoomDelta)
        },
        addHooks: function() {
          var e = this._map._container;
          e.tabIndex <= 0 && (e.tabIndex = `0`), zt(e, {
            focus: this._onFocus,
            blur: this._onBlur,
            mousedown: this._onMouseDown
          }, this), this._map.on({
            focus: this._addHooks,
            blur: this._removeHooks
          }, this)
        },
        removeHooks: function() {
          this._removeHooks(), Vt(this._map._container, {
            focus: this._onFocus,
            blur: this._onBlur,
            mousedown: this._onMouseDown
          }, this), this._map.off({
            focus: this._addHooks,
            blur: this._removeHooks
          }, this)
        },
        _onMouseDown: function() {
          if (!this._focused) {
            var e = document.body,
              t = document.documentElement,
              n = e.scrollTop || t.scrollTop,
              r = e.scrollLeft || t.scrollLeft;
            this._map._container.focus(), window.scrollTo(r, n)
          }
        },
        _onFocus: function() {
          this._focused = !0, this._map.fire(`focus`)
        },
        _onBlur: function() {
          this._focused = !1, this._map.fire(`blur`)
        },
        _setPanDelta: function(e) {
          for (var t = this._panKeys = {}, n = this.keyCodes, r = 0, i = n.left.length; r < i; r++) t[n.left[r]] = [-1 * e, 0];
          for (r = 0, i = n.right.length; r < i; r++) t[n.right[r]] = [e, 0];
          for (r = 0, i = n.down.length; r < i; r++) t[n.down[r]] = [0, e];
          for (r = 0, i = n.up.length; r < i; r++) t[n.up[r]] = [0, -1 * e]
        },
        _setZoomDelta: function(e) {
          for (var t = this._zoomKeys = {}, n = this.keyCodes, r = 0, i = n.zoomIn.length; r < i; r++) t[n.zoomIn[r]] = e;
          for (r = 0, i = n.zoomOut.length; r < i; r++) t[n.zoomOut[r]] = -e
        },
        _addHooks: function() {
          zt(document, `keydown`, this._onKeyDown, this)
        },
        _removeHooks: function() {
          Vt(document, `keydown`, this._onKeyDown, this)
        },
        _onKeyDown: function(e) {
          if (!(e.altKey || e.ctrlKey || e.metaKey)) {
            var t = e.keyCode,
              n = this._map,
              r;
            if (t in this._panKeys) {
              if (!n._panAnim || !n._panAnim._inProgress) {
                if (r = this._panKeys[t], e.shiftKey && (r = P(r).multiplyBy(3)), n.options.maxBounds && (r = n._limitOffset(P(r), n.options.maxBounds)), n.options.worldCopyJump) {
                  var i = n.wrapLatLng(n.unproject(n.project(n.getCenter()).add(r)));
                  n.panTo(i)
                } else n.panBy(r)
              }
            } else if (t in this._zoomKeys) n.setZoom(n.getZoom() + (e.shiftKey ? 3 : 1) * this._zoomKeys[t]);
            else if (t === 27 && n._popup && n._popup.options.closeOnEscapeKey) n.closePopup();
            else return;
            Xt(e)
          }
        }
      });
      an.addInitHook(`addHandler`, `keyboard`, ni), an.mergeOptions({
        scrollWheelZoom: !0,
        wheelDebounceTime: 40,
        wheelPxPerZoomLevel: 60
      });
      var ri = gn.extend({
        addHooks: function() {
          zt(this._map._container, `wheel`, this._onWheelScroll, this), this._delta = 0
        },
        removeHooks: function() {
          Vt(this._map._container, `wheel`, this._onWheelScroll, this)
        },
        _onWheelScroll: function(e) {
          var t = en(e),
            n = this._map.options.wheelDebounceTime;
          this._delta += t, this._lastMousePos = this._map.mouseEventToContainerPoint(e), this._startTime ||= +new Date;
          var r = Math.max(n - (+new Date - this._startTime), 0);
          clearTimeout(this._timer), this._timer = setTimeout(i(this._performZoom, this), r), Xt(e)
        },
        _performZoom: function() {
          var e = this._map,
            t = e.getZoom(),
            n = this._map.options.zoomSnap || 0;
          e._stop();
          var r = this._delta / (this._map.options.wheelPxPerZoomLevel * 4),
            i = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(r)))) / Math.LN2,
            a = n ? Math.ceil(i / n) * n : i,
            o = e._limitZoom(t + (this._delta > 0 ? a : -a)) - t;
          this._delta = 0, this._startTime = null, o && (e.options.scrollWheelZoom === `center` ? e.setZoom(t + o) : e.setZoomAround(this._lastMousePos, t + o))
        }
      });
      an.addInitHook(`addHandler`, `scrollWheelZoom`, ri);
      var ii = 600;
      an.mergeOptions({
        tapHold: Re.touchNative && Re.safari && Re.mobile,
        tapTolerance: 15
      });
      var Q = gn.extend({
        addHooks: function() {
          zt(this._map._container, `touchstart`, this._onDown, this)
        },
        removeHooks: function() {
          Vt(this._map._container, `touchstart`, this._onDown, this)
        },
        _onDown: function(e) {
          if (clearTimeout(this._holdTimeout), e.touches.length === 1) {
            var t = e.touches[0];
            this._startPos = this._newPos = new M(t.clientX, t.clientY), this._holdTimeout = setTimeout(i(function() {
              this._cancel(), this._isTapValid() && (zt(document, `touchend`, Yt), zt(document, `touchend touchcancel`, this._cancelClickPrevent), this._simulateEvent(`contextmenu`, t))
            }, this), ii), zt(document, `touchend touchcancel contextmenu`, this._cancel, this), zt(document, `touchmove`, this._onMove, this)
          }
        },
        _cancelClickPrevent: function e() {
          Vt(document, `touchend`, Yt), Vt(document, `touchend touchcancel`, e)
        },
        _cancel: function() {
          clearTimeout(this._holdTimeout), Vt(document, `touchend touchcancel contextmenu`, this._cancel, this), Vt(document, `touchmove`, this._onMove, this)
        },
        _onMove: function(e) {
          var t = e.touches[0];
          this._newPos = new M(t.clientX, t.clientY)
        },
        _isTapValid: function() {
          return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance
        },
        _simulateEvent: function(e, t) {
          var n = new MouseEvent(e, {
            bubbles: !0,
            cancelable: !0,
            view: window,
            screenX: t.screenX,
            screenY: t.screenY,
            clientX: t.clientX,
            clientY: t.clientY
          });
          n._simulated = !0, t.target.dispatchEvent(n)
        }
      });
      an.addInitHook(`addHandler`, `tapHold`, Q), an.mergeOptions({
        touchZoom: Re.touch,
        bounceAtZoomLimits: !0
      });
      var ai = gn.extend({
        addHooks: function() {
          gt(this._map._container, `leaflet-touch-zoom`), zt(this._map._container, `touchstart`, this._onTouchStart, this)
        },
        removeHooks: function() {
          _t(this._map._container, `leaflet-touch-zoom`), Vt(this._map._container, `touchstart`, this._onTouchStart, this)
        },
        _onTouchStart: function(e) {
          var t = this._map;
          if (!(!e.touches || e.touches.length !== 2 || t._animatingZoom || this._zooming)) {
            var n = t.mouseEventToContainerPoint(e.touches[0]),
              r = t.mouseEventToContainerPoint(e.touches[1]);
            this._centerPoint = t.getSize()._divideBy(2), this._startLatLng = t.containerPointToLatLng(this._centerPoint), t.options.touchZoom !== `center` && (this._pinchStartLatLng = t.containerPointToLatLng(n.add(r)._divideBy(2))), this._startDist = n.distanceTo(r), this._startZoom = t.getZoom(), this._moved = !1, this._zooming = !0, t._stop(), zt(document, `touchmove`, this._onTouchMove, this), zt(document, `touchend touchcancel`, this._onTouchEnd, this), Yt(e)
          }
        },
        _onTouchMove: function(e) {
          if (e.touches && e.touches.length === 2 && this._zooming) {
            var t = this._map,
              n = t.mouseEventToContainerPoint(e.touches[0]),
              r = t.mouseEventToContainerPoint(e.touches[1]),
              a = n.distanceTo(r) / this._startDist;
            if (this._zoom = t.getScaleZoom(a, this._startZoom), !t.options.bounceAtZoomLimits && (this._zoom < t.getMinZoom() && a < 1 || this._zoom > t.getMaxZoom() && a > 1) && (this._zoom = t._limitZoom(this._zoom)), t.options.touchZoom === `center`) {
              if (this._center = this._startLatLng, a === 1) return
            } else {
              var o = n._add(r)._divideBy(2)._subtract(this._centerPoint);
              if (a === 1 && o.x === 0 && o.y === 0) return;
              this._center = t.unproject(t.project(this._pinchStartLatLng, this._zoom).subtract(o), this._zoom)
            }
            this._moved ||= (t._moveStart(!0, !1), !0), E(this._animRequest);
            var s = i(t._move, t, this._center, this._zoom, {
              pinch: !0,
              round: !1
            }, void 0);
            this._animRequest = T(s, this, !0), Yt(e)
          }
        },
        _onTouchEnd: function() {
          if (!this._moved || !this._zooming) {
            this._zooming = !1;
            return
          }
          this._zooming = !1, E(this._animRequest), Vt(document, `touchmove`, this._onTouchMove, this), Vt(document, `touchend touchcancel`, this._onTouchEnd, this), this._map.options.zoomAnimation ? this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), !0, this._map.options.zoomSnap) : this._map._resetView(this._center, this._map._limitZoom(this._zoom))
        }
      });
      an.addInitHook(`addHandler`, `touchZoom`, ai), an.BoxZoom = $r, an.DoubleClickZoom = ei, an.Drag = ti, an.Keyboard = ni, an.ScrollWheelZoom = ri, an.TapHold = Q, an.TouchZoom = ai, e.Bounds = F, e.Browser = Re, e.CRS = V, e.Canvas = Wr, e.Circle = or, e.CircleMarker = ir, e.Class = O, e.Control = sn, e.DivIcon = Fr, e.DivOverlay = Ar, e.DomEvent = nn, e.DomUtil = Rt, e.Draggable = yn, e.Evented = j, e.FeatureGroup = Yn, e.GeoJSON = fr, e.GridLayer = Lr, e.Handler = gn, e.Icon = Zn, e.ImageOverlay = wr, e.LatLng = z, e.LatLngBounds = ee, e.Layer = Kn, e.LayerGroup = qn, e.LineUtil = zn, e.Map = an, e.Marker = tr, e.Mixin = _n, e.Path = rr, e.Point = M, e.PolyUtil = Cn, e.Polygon = ur, e.Polyline = cr, e.Popup = jr, e.PosAnimation = rn, e.Projection = Hn, e.Rectangle = Zr, e.Renderer = Ur, e.SVG = Yr, e.SVGOverlay = Or, e.TileLayer = zr, e.Tooltip = Nr, e.Transformation = W, e.Util = D, e.VideoOverlay = Er, e.bind = i, e.bounds = I, e.canvas = Gr, e.circle = sr, e.circleMarker = ar, e.control = cn, e.divIcon = Ir, e.extend = n, e.featureGroup = Xn, e.geoJSON = Sr, e.geoJson = Cr, e.gridLayer = Rr, e.icon = Qn, e.imageOverlay = Tr, e.latLng = B, e.latLngBounds = R, e.layerGroup = Jn, e.map = on, e.marker = nr, e.point = P, e.polygon = dr, e.polyline = lr, e.popup = Mr, e.rectangle = Qr, e.setOptions = p, e.stamp = o, e.svg = Xr, e.svgOverlay = kr, e.tileLayer = Br, e.tooltip = Pr, e.transformation = ne, e.version = t, e.videoOverlay = Dr;
      var oi = window.L;
      e.noConflict = function() {
        return window.L = oi, this
      }, window.L = e
    }))
  }))(), 1),
  Ml = ({
    userLocation: e,
    distanceMeters: t,
    isInside: n
  }) => {
    let r = (0, T.useRef)(null),
      i = (0, T.useRef)(null),
      a = (0, T.useRef)(null);
    return (0, T.useEffect)(() => {
      if (!r.current) return;
      delete jl.default.Icon.Default.prototype._getIconUrl, jl.default.Icon.Default.mergeOptions({
        iconRetinaUrl: `https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png`,
        iconUrl: `https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png`,
        shadowUrl: `https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png`
      });
      let e = jl.default.map(r.current, {
        center: [Pc.lat, Pc.lng],
        zoom: 17,
        zoomControl: !1,
        attributionControl: !1
      });
      i.current = e, jl.default.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, {
        maxZoom: 19
      }).addTo(e), jl.default.circle([Pc.lat, Pc.lng], {
        color: `#EF4444`,
        fillColor: `#EF4444`,
        fillOpacity: .15,
        radius: Pc.radiusMeters,
        weight: 2,
        dashArray: `4, 4`
      }).addTo(e);
      let t = jl.default.divIcon({
        className: `custom-office-pin`,
        html: `
        <div style="background:#EF4444;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 10px rgba(239,68,68,0.5);border:2px solid #FFFFFF;">
          <svg style="width:14px;height:14px;color:white;" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
      `,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });
      return jl.default.marker([Pc.lat, Pc.lng], {
        icon: t
      }).addTo(e).bindPopup(`<b>${Pc.name}</b><br>100m Allowed Zone`), setTimeout(() => {
        e.invalidateSize()
      }, 200), () => {
        e.remove(), i.current = null
      }
    }, []), (0, T.useEffect)(() => {
      let t = i.current;
      if (t && e) {
        a.current ? (a.current.setLatLng([e.lat, e.lng]), a.current.setStyle({
          fillColor: n ? `#16A34A` : `#EF4444`
        })) : a.current = jl.default.circleMarker([e.lat, e.lng], {
          radius: 8,
          color: `#FFFFFF`,
          fillColor: n ? `#16A34A` : `#EF4444`,
          fillOpacity: 1,
          weight: 3
        }).addTo(t);
        let r = jl.default.latLngBounds([
          [Pc.lat, Pc.lng],
          [e.lat, e.lng]
        ]);
        t.fitBounds(r, {
          padding: [35, 35],
          maxZoom: 18
        })
      }
    }, [e, n]), (0, $.jsxs)(`div`, {
      className: `w-full relative rounded-2xl overflow-hidden border border-slate-700 shadow-inner`,
      children: [(0, $.jsx)(`div`, {
        ref: r,
        className: `w-full h-[150px] bg-slate-900`
      }), (0, $.jsxs)(`div`, {
        className: `absolute bottom-2 left-2 z-[400] bg-slate-900/90 backdrop-blur-xs px-2.5 py-1 rounded-lg text-[10px] font-mono text-slate-200 shadow-xs border border-slate-700 flex items-center gap-1.5`,
        children: [(0, $.jsx)(`span`, {
          className: `w-2 h-2 rounded-full bg-[#EF4444]`
        }), (0, $.jsxs)(`span`, {
          children: [`Office: `, Pc.lat, `, `, Pc.lng]
        })]
      }), t !== null && (0, $.jsxs)(`div`, {
        className: `absolute top-2 right-2 z-[400] px-2.5 py-1 rounded-full text-[11px] font-bold shadow-xs border flex items-center gap-1 backdrop-blur-xs ${n?`bg-emerald-500/90 text-white border-emerald-400`:`bg-rose-500/90 text-white border-rose-400`}`,
        children: [(0, $.jsx)(`span`, {
          children: n ? `✓` : `⚠`
        }), (0, $.jsxs)(`span`, {
          children: [t, `m away`]
        })]
      })]
    })
  },
  Nl = ({
    actionType: e,
    isOpen: t,
    onClose: n,
    employee: r,
    onConfirm: i
  }) => {
    let [a, o] = (0, T.useState)(null), [s, c] = (0, T.useState)(null), [l, u] = (0, T.useState)(!1), [d, f] = (0, T.useState)(!1), [p, m] = (0, T.useState)(null), [h, g] = (0, T.useState)(null), [_, v] = (0, T.useState)(null), [y, b] = (0, T.useState)(``), [x, S] = (0, T.useState)(!1), [C, w] = (0, T.useState)(null), [E, D] = (0, T.useState)(null), [O, k] = (0, T.useState)(null), [A, j] = (0, T.useState)(!1), [M, N] = (0, T.useState)(!1), P = (0, T.useRef)(null), I = (0, T.useRef)(null), ee = (0, T.useRef)(null), R = (0, T.useRef)(null), z = () => {
      vl(`light`), ee.current && (ee.current.value = ``, ee.current.click())
    }, B = () => {
      vl(`light`), R.current && (R.current.value = ``, R.current.click())
    }, te = async () => {
      if (!d) {
        S(!0), f(!0), m(null), b(`Initializing location sensor...`);
        try {
          let e = await Lc({
            timeoutMs: 15e3,
            targetAccuracyMeters: 40,
            onProgress: e => b(e)
          });
          o({
            lat: e.lat,
            lng: e.lng
          }), g(e.accuracy), v(e.source);
          let {
            isInside: t,
            distanceMeters: n
          } = Ic(e.lat, e.lng);
          u(t && n <= 100), c(n)
        } catch (e) {
          console.warn(`Geolocation warning:`, e?.message || e), u(!1), m(e?.message || `Unable to acquire GPS coordinates. Ensure location is enabled and tap Refresh GPS.`)
        } finally {
          f(!1), b(``)
        }
      }
    }, U = async (e = !1) => {
      e && vl(`light`), j(!0), e && k(null);
      try {
        C && (C.getTracks().forEach(e => e.stop()), w(null));
        let e = !!navigator?.mediaDevices?.getUserMedia,
          t = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        if (!e && !t) throw Error(`Camera streaming is not supported by this in-app browser.`);
        let n = null,
          r = null;
        if (e) try {
          n = await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode: `user`
            },
            audio: !1
          })
        } catch (e) {
          r = e;
          try {
            n = await navigator.mediaDevices.getUserMedia({
              video: {
                facingMode: {
                  ideal: `user`
                }
              },
              audio: !1
            })
          } catch (e) {
            r = e;
            try {
              n = await navigator.mediaDevices.getUserMedia({
                video: !0,
                audio: !1
              })
            } catch (e) {
              r = e
            }
          }
        }
        if (!n && t) try {
          n = await new Promise((e, n) => {
            t.call(navigator, {
              video: !0,
              audio: !1
            }, e, n)
          })
        } catch (e) {
          r = e
        }
        if (n) w(n), k(null);
        else if (r) throw r
      } catch (t) {
        if (console.warn(`Camera access note:`, t?.message || t), e) {
          let e = t?.name || ``,
            n = (t?.message || ``).toLowerCase();
          e === `NotAllowedError` || e === `PermissionDeniedError` || n.includes(`denied`) || n.includes(`permission`) ? k(`Camera permission was blocked. Tap "Open Phone Camera" or allow in device settings.`) : k(t?.message || `Unable to open camera stream. Tap "Open Phone Camera" below.`)
        } else k(null)
      } finally {
        j(!1)
      }
    }, W = () => {
      C && (C.getTracks().forEach(e => e.stop()), w(null)), P.current && (P.current.srcObject = null)
    };
    (0, T.useEffect)(() => (t ? (D(null), o(null), c(null), u(!1), m(null), g(null), v(null), S(!1), f(!1), U()) : W(), () => {
      W()
    }), [t]), (0, T.useEffect)(() => {
      let e = !1;
      if (C && P.current && !E) {
        let t = P.current;
        t.srcObject !== C && (t.srcObject = C);
        let n = t.play();
        n !== void 0 && n.catch(t => {
          t.name !== `AbortError` && !e && console.warn(`Video play notice:`, t?.message || t)
        })
      }
      return () => {
        e = !0
      }
    }, [C, E]);
    let ne = () => {
        if (!P.current) return;
        vl(`medium`);
        let e = kl(P.current, 220, .65);
        e && (D(e), W())
      },
      re = () => {
        vl(`light`), D(null), k(null), U(!0)
      },
      ie = async e => {
        let t = e.target.files?.[0];
        if (t) try {
          let e = await Ol(t, 220, .65);
          D(e), W(), k(null), vl(`success`)
        } catch (e) {
          console.warn(`File compression error:`, e)
        } finally {
          e.target && (e.target.value = ``)
        }
      }, ae = async () => {
        if (M) return;
        if (!E) {
          vl(`error`);
          return
        }
        if (G) {
          if (d) {
            vl(`error`);
            return
          }
          if (!l || s === null || s > 100) {
            vl(`error`);
            return
          }
        }
        N(!0), vl(`medium`);
        let e = a?.lat ?? Pc.lat,
          t = a?.lng ?? Pc.lng,
          r = s ?? (G ? 0 : 999);
        try {
          await Promise.all([i({
            photoUrl: E,
            latitude: e,
            longitude: t,
            distanceMeters: r
          }), new Promise(e => setTimeout(e, 3e3))]), vl(`success`), W(), n()
        } catch (e) {
          console.error(`Submission error:`, e), vl(`error`)
        } finally {
          N(!1)
        }
      };
    if (!t) return null;
    let G = e === `check_in`,
      K = G ? `CHECK-IN VERIFICATION` : `CHECK-OUT VERIFICATION`,
      oe = r?.shift_start_time || `16:00`,
      se = r?.shift_end_time || `02:00`,
      q = !!E,
      ce = !G || l && s !== null && s <= 100,
      J = q && ce && !d && !M;
    return (0, $.jsxs)(`div`, {
      className: `fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/85 backdrop-blur-md p-0 sm:p-3 animate-fadeIn font-['Plus_Jakarta_Sans',sans-serif]`,
      children: [(0, $.jsx)(`canvas`, {
        ref: I,
        className: `hidden`
      }), (0, $.jsx)(`input`, {
        ref: ee,
        type: `file`,
        accept: `image/*`,
        capture: `user`,
        onChange: ie,
        className: `hidden`
      }), (0, $.jsx)(`input`, {
        ref: R,
        type: `file`,
        accept: `image/*`,
        onChange: ie,
        className: `hidden`
      }), (0, $.jsxs)(`div`, {
        className: `w-full max-w-[440px] max-h-[94vh] bg-[#121620] border-t-2 sm:border-2 border-red-500/50 rounded-t-[32px] sm:rounded-[32px] flex flex-col shadow-[0_20px_60px_rgba(0,0,0,0.95)] overflow-hidden text-white animate-slideUp relative`,
        children: [(0, $.jsx)(`div`, {
          className: `absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#EF4444] to-transparent z-20`
        }), (0, $.jsx)(`div`, {
          className: `absolute top-3.5 right-12 grid grid-cols-4 gap-1.5 opacity-35 pointer-events-none z-10`,
          children: Array.from({
            length: 8
          }).map((e, t) => (0, $.jsx)(`span`, {
            className: `w-1.5 h-1.5 rounded-full bg-[#EF4444]`
          }, t))
        }), (0, $.jsx)(`div`, {
          className: `w-12 h-1 bg-slate-700/80 rounded-full mx-auto mt-2.5 mb-1 shrink-0 select-none`
        }), (0, $.jsxs)(`div`, {
          className: `px-5 pt-2 pb-3.5 flex items-center justify-between border-b border-[#262C3A] bg-[#0D1017] relative z-10`,
          children: [(0, $.jsxs)(`div`, {
            className: `flex items-center gap-3 min-w-0`,
            children: [(0, $.jsx)(`div`, {
              className: `w-10 h-10 rounded-2xl bg-gradient-to-b from-[#1C202E] to-[#0D1017] border-2 border-red-500/50 text-[#EF4444] flex items-center justify-center shadow-[0_0_16px_rgba(239,68,68,0.35)] shrink-0`,
              children: (0, $.jsx)(Ee, {
                className: `w-5 h-5 stroke-[2.4]`
              })
            }), (0, $.jsxs)(`div`, {
              className: `min-w-0`,
              children: [(0, $.jsx)(`h3`, {
                className: `text-base font-black text-white leading-tight tracking-tight uppercase truncate`,
                children: K
              }), (0, $.jsxs)(`div`, {
                className: `flex items-center gap-1.5 text-[10px] font-mono text-[#94A3B8] mt-0.5`,
                children: [(0, $.jsxs)(`span`, {
                  className: `text-red-400 font-bold`,
                  children: [`Shift: `, oe, ` – `, se]
                }), (0, $.jsx)(`span`, {
                  children: `•`
                }), (0, $.jsx)(`span`, {
                  children: `100m Perimeter`
                })]
              })]
            })]
          }), (0, $.jsx)(`button`, {
            type: `button`,
            onClick: n,
            className: `w-8 h-8 rounded-full bg-[#161B26] border border-[#262C3A] hover:bg-red-950/60 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-2`,
            "aria-label": `Close`,
            children: (0, $.jsx)(He, {
              className: `w-4 h-4 stroke-[2.5]`
            })
          })]
        }), (0, $.jsxs)(`div`, {
          className: `flex-1 overflow-y-auto px-5 py-4 space-y-4`,
          children: [(0, $.jsxs)(`div`, {
            className: `bg-[#131722] border border-[#262C3A] rounded-[24px] p-4 relative overflow-hidden`,
            children: [(0, $.jsxs)(`div`, {
              className: `w-full flex items-center justify-between mb-3 px-0.5`,
              children: [(0, $.jsxs)(`span`, {
                className: `text-xs font-black uppercase tracking-wider text-white flex items-center gap-2`,
                children: [(0, $.jsx)(F, {
                  className: `w-4 h-4 text-[#EF4444]`
                }), `1. Take Live Selfie`]
              }), E ? (0, $.jsxs)(`span`, {
                className: `text-[10px] font-mono font-bold text-emerald-300 bg-emerald-950/70 border border-emerald-500/50 px-2.5 py-0.5 rounded-full flex items-center gap-1`,
                children: [(0, $.jsx)(H, {
                  className: `w-3 h-3 text-emerald-400`
                }), `VERIFIED`]
              }) : (0, $.jsx)(`span`, {
                className: `text-[10px] font-mono font-bold text-red-300 bg-red-950/60 border border-red-500/40 px-2 py-0.5 rounded-full`,
                children: `REQUIRED`
              })]
            }), (0, $.jsxs)(`div`, {
              className: `w-[240px] h-[240px] relative rounded-[28px] overflow-hidden bg-[#0D1017] border-2 border-red-500/50 shadow-[0_0_24px_rgba(239,68,68,0.25)] flex items-center justify-center mx-auto`,
              children: [(0, $.jsx)(`div`, {
                className: `absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#EF4444] z-20 pointer-events-none`
              }), (0, $.jsx)(`div`, {
                className: `absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#EF4444] z-20 pointer-events-none`
              }), (0, $.jsx)(`div`, {
                className: `absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#EF4444] z-20 pointer-events-none`
              }), (0, $.jsx)(`div`, {
                className: `absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#EF4444] z-20 pointer-events-none`
              }), E ? (0, $.jsxs)(`div`, {
                className: `w-full h-full relative`,
                children: [(0, $.jsx)(`img`, {
                  src: E,
                  alt: `Selfie Snapshot`,
                  className: `w-full h-full object-cover`
                }), (0, $.jsxs)(`div`, {
                  className: `absolute bottom-2 inset-x-2 bg-[#0D1017]/80 backdrop-blur-xs border border-emerald-500/40 rounded-xl py-1 px-2 text-center flex items-center justify-center gap-1.5 text-[10px] font-mono text-emerald-300 font-bold`,
                  children: [(0, $.jsx)(H, {
                    className: `w-3 h-3 text-emerald-400`
                  }), `PHOTO READY`]
                })]
              }) : A ? (0, $.jsxs)(`div`, {
                className: `p-4 text-center text-white text-xs flex flex-col items-center justify-center w-full h-full`,
                children: [(0, $.jsx)(`div`, {
                  className: `w-12 h-12 rounded-full bg-red-950/40 border border-red-500/40 flex items-center justify-center mb-2.5`,
                  children: (0, $.jsx)(ye, {
                    className: `w-6 h-6 text-[#EF4444] animate-spin`
                  })
                }), (0, $.jsx)(`p`, {
                  className: `font-bold text-slate-100 text-xs mb-1`,
                  children: `Requesting Camera...`
                }), (0, $.jsxs)(`p`, {
                  className: `text-[10px] text-slate-400 leading-tight px-3`,
                  children: [`Tap `, (0, $.jsx)(`span`, {
                    className: `text-white font-bold`,
                    children: `"Allow"`
                  }), ` when prompted by your device`]
                })]
              }) : O ? (0, $.jsxs)(`div`, {
                className: `p-3.5 text-center text-white text-xs flex flex-col items-center justify-center w-full h-full`,
                children: [(0, $.jsx)(`div`, {
                  className: `w-10 h-10 rounded-full bg-red-950/50 border border-red-500/50 flex items-center justify-center mb-1.5 shadow-[0_0_12px_rgba(239,68,68,0.3)]`,
                  children: (0, $.jsx)(V, {
                    className: `w-5 h-5 text-amber-400`
                  })
                }), (0, $.jsx)(`p`, {
                  className: `text-[11px] font-bold text-slate-100 mb-0.5 px-1 text-center leading-tight`,
                  children: `Camera Access Required`
                }), (0, $.jsx)(`p`, {
                  className: `text-[10px] text-slate-300 mb-2 px-1 text-center leading-tight`,
                  children: O
                }), (0, $.jsxs)(`button`, {
                  type: `button`,
                  onClick: z,
                  className: `w-full max-w-[195px] py-2 px-3 bg-[#EF4444] hover:bg-red-500 active:scale-95 text-white rounded-xl text-xs font-bold font-mono transition-all shadow-md shadow-red-500/30 flex items-center justify-center gap-1.5 cursor-pointer mb-1.5`,
                  children: [(0, $.jsx)(F, {
                    className: `w-3.5 h-3.5 stroke-[2.5]`
                  }), `OPEN PHONE CAMERA`]
                }), (0, $.jsxs)(`button`, {
                  type: `button`,
                  onClick: () => U(!0),
                  className: `w-full max-w-[195px] py-1.5 px-3 bg-[#161B26] hover:bg-[#1E2433] border border-slate-700/70 hover:border-red-500/50 text-slate-300 hover:text-white rounded-xl text-[10px] font-semibold font-mono flex items-center justify-center gap-1.5 transition-colors cursor-pointer mb-1`,
                  children: [(0, $.jsx)(be, {
                    className: `w-3 h-3 text-[#EF4444]`
                  }), `Retry Allow Camera`]
                }), (0, $.jsxs)(`button`, {
                  type: `button`,
                  onClick: B,
                  className: `text-[10px] font-mono text-slate-400 hover:text-white underline decoration-slate-600 transition-colors flex items-center gap-1 py-0.5 cursor-pointer mt-0.5`,
                  children: [(0, $.jsx)(Re, {
                    className: `w-3 h-3 text-slate-400`
                  }), `Or select photo from gallery`]
                })]
              }) : C ? (0, $.jsxs)(`div`, {
                className: `w-full h-full relative`,
                children: [(0, $.jsx)(`video`, {
                  ref: P,
                  autoPlay: !0,
                  playsInline: !0,
                  muted: !0,
                  className: `w-full h-full object-cover transform -scale-x-100`
                }), (0, $.jsx)(`div`, {
                  className: `absolute inset-0 pointer-events-none flex items-center justify-center`,
                  children: (0, $.jsx)(`div`, {
                    className: `w-[145px] h-[180px] rounded-[50%] border-2 border-dashed border-red-500/60 shadow-[0_0_0_9999px_rgba(13,16,23,0.4)]`
                  })
                }), (0, $.jsxs)(`div`, {
                  className: `absolute top-2.5 left-2.5 bg-[#0D1017]/85 border border-red-500/40 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[9px] text-white flex items-center gap-1.5 font-mono z-10`,
                  children: [(0, $.jsx)(`span`, {
                    className: `w-1.5 h-1.5 rounded-full bg-[#EF4444] animate-ping`
                  }), (0, $.jsx)(`span`, {
                    children: `LIVE SENSOR`
                  })]
                })]
              }) : (0, $.jsxs)(`div`, {
                className: `p-3 text-center text-white text-xs flex flex-col items-center justify-center w-full h-full`,
                children: [(0, $.jsx)(`div`, {
                  className: `w-10 h-10 rounded-full bg-red-950/40 border border-red-500/40 flex items-center justify-center mb-1.5 shadow-[0_0_16px_rgba(239,68,68,0.25)]`,
                  children: (0, $.jsx)(F, {
                    className: `w-5 h-5 text-[#EF4444]`
                  })
                }), (0, $.jsx)(`p`, {
                  className: `text-xs font-bold text-white mb-0.5 px-2 text-center uppercase tracking-wider`,
                  children: `Take Attendance Selfie`
                }), (0, $.jsx)(`p`, {
                  className: `text-[10px] text-slate-300 mb-2 px-2 text-center leading-tight`,
                  children: `Tap below to allow camera access for live check-in`
                }), (0, $.jsxs)(`button`, {
                  type: `button`,
                  onClick: () => U(!0),
                  className: `w-full max-w-[195px] py-2 px-3 bg-[#EF4444] hover:bg-red-500 active:scale-95 text-white rounded-xl text-xs font-black font-mono tracking-wide transition-all shadow-[0_0_16px_rgba(239,68,68,0.4)] flex items-center justify-center gap-2 cursor-pointer mb-1.5`,
                  children: [(0, $.jsx)(F, {
                    className: `w-4 h-4 stroke-[2.5]`
                  }), `ALLOW CAMERA`]
                }), (0, $.jsxs)(`button`, {
                  type: `button`,
                  onClick: z,
                  className: `w-full max-w-[195px] py-1.5 px-3 bg-[#161B26] hover:bg-[#1E2433] border border-red-500/30 text-slate-200 hover:text-white rounded-xl text-[10px] font-bold font-mono transition-colors flex items-center justify-center gap-1.5 cursor-pointer mb-1`,
                  children: [(0, $.jsx)(F, {
                    className: `w-3 h-3 text-[#EF4444]`
                  }), `OPEN PHONE CAMERA`]
                }), (0, $.jsxs)(`button`, {
                  type: `button`,
                  onClick: B,
                  className: `text-[10px] font-mono text-slate-400 hover:text-white underline decoration-slate-600 transition-colors flex items-center gap-1 py-0.5 cursor-pointer`,
                  children: [(0, $.jsx)(Re, {
                    className: `w-3 h-3 text-slate-400`
                  }), `Or upload photo from device`]
                })]
              })]
            }), (0, $.jsx)(`div`, {
              className: `mt-3 flex items-center justify-center gap-2`,
              children: E ? (0, $.jsxs)(`button`, {
                type: `button`,
                onClick: re,
                className: `px-4 py-2 bg-[#161B26] hover:bg-[#1E2433] border border-[#262C3A] text-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95`,
                children: [(0, $.jsx)(be, {
                  className: `w-3.5 h-3.5 text-[#EF4444]`
                }), `Retake Selfie`]
              }) : C ? (0, $.jsxs)(`div`, {
                className: `flex flex-col items-center`,
                children: [(0, $.jsx)(`div`, {
                  className: `w-16 h-16 rounded-full border border-red-500/30 bg-red-950/20 flex items-center justify-center`,
                  children: (0, $.jsx)(`button`, {
                    type: `button`,
                    onClick: ne,
                    className: `w-12 h-12 rounded-full bg-gradient-to-b from-[#1C202E] to-[#0D1017] border-2 border-[#EF4444] shadow-[0_0_18px_rgba(239,68,68,0.5)] flex items-center justify-center active:scale-90 transition-transform cursor-pointer`,
                    "aria-label": `Snap Selfie`,
                    children: (0, $.jsx)(F, {
                      className: `w-5 h-5 text-[#EF4444] stroke-[2.4]`
                    })
                  })
                }), (0, $.jsx)(`span`, {
                  className: `text-[10px] font-mono font-bold text-slate-300 uppercase tracking-wider mt-1.5`,
                  children: `Tap to Snap Selfie`
                })]
              }) : (0, $.jsxs)(`div`, {
                className: `flex items-center gap-2`,
                children: [(0, $.jsxs)(`button`, {
                  type: `button`,
                  onClick: () => U(!0),
                  disabled: A,
                  className: `px-3.5 py-2 bg-[#161B26] hover:bg-[#1E2433] border border-[#262C3A] hover:border-red-500/50 text-slate-200 hover:text-white rounded-xl text-xs font-bold font-mono flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95 disabled:opacity-50`,
                  children: [A ? (0, $.jsx)(ye, {
                    className: `w-3.5 h-3.5 text-[#EF4444] animate-spin`
                  }) : (0, $.jsx)(F, {
                    className: `w-3.5 h-3.5 text-[#EF4444]`
                  }), A ? `Requesting...` : `Allow Camera`]
                }), (0, $.jsxs)(`button`, {
                  type: `button`,
                  onClick: z,
                  className: `px-3.5 py-2 bg-[#161B26] hover:bg-[#1E2433] border border-red-500/40 hover:border-red-500 text-white rounded-xl text-xs font-bold font-mono flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95`,
                  children: [(0, $.jsx)(F, {
                    className: `w-3.5 h-3.5 text-[#EF4444]`
                  }), `Take Photo`]
                })]
              })
            })]
          }), (0, $.jsxs)(`div`, {
            className: `bg-[#131722] border border-[#262C3A] rounded-[24px] p-4 relative overflow-hidden`,
            children: [(0, $.jsxs)(`div`, {
              className: `flex items-center justify-between mb-3 px-0.5`,
              children: [(0, $.jsxs)(`span`, {
                className: `text-xs font-black uppercase tracking-wider text-white flex items-center gap-2`,
                children: [(0, $.jsx)(de, {
                  className: `w-4 h-4 text-[#EF4444]`
                }), `2. 100m Geofence Check`]
              }), (0, $.jsxs)(`button`, {
                type: `button`,
                onClick: te,
                disabled: d,
                className: `text-[11px] text-[#EF4444] font-semibold hover:underline flex items-center gap-1 cursor-pointer font-mono`,
                title: `Refresh GPS`,
                children: [(0, $.jsx)(ye, {
                  className: `w-3 h-3 ${d?`animate-spin`:``}`
                }), d ? `Locating...` : a ? `Refresh GPS` : `Allow GPS`]
              })]
            }), (0, $.jsx)(`div`, {
              className: `rounded-2xl overflow-hidden border border-[#262C3A] shadow-inner bg-[#0D1017]`,
              children: (0, $.jsx)(Ml, {
                userLocation: a,
                distanceMeters: s,
                isInside: l
              })
            }), (0, $.jsx)(`div`, {
              className: `mt-2.5`,
              children: d ? (0, $.jsxs)(`div`, {
                className: `p-3 rounded-xl bg-[#0D1017] border border-[#262C3A] text-xs text-slate-300 flex items-center justify-between font-mono`,
                children: [(0, $.jsxs)(`div`, {
                  className: `flex items-center gap-2.5 min-w-0`,
                  children: [(0, $.jsx)(ye, {
                    className: `w-4 h-4 animate-spin text-[#EF4444] shrink-0`
                  }), (0, $.jsxs)(`div`, {
                    className: `min-w-0`,
                    children: [(0, $.jsx)(`span`, {
                      className: `font-semibold text-white block`,
                      children: `Locating GPS Coordinates...`
                    }), (0, $.jsx)(`span`, {
                      className: `text-[10px] text-slate-400 truncate block`,
                      children: y || `Acquiring satellite / network fix...`
                    })]
                  })]
                }), (0, $.jsx)(`button`, {
                  type: `button`,
                  onClick: () => {
                    f(!1), m(`Locating cancelled. Tap Check Location to retry.`)
                  },
                  className: `px-2.5 py-1 text-[11px] bg-[#1E2433] hover:bg-slate-700 text-slate-300 rounded border border-slate-600 shrink-0 cursor-pointer`,
                  children: `Cancel`
                })]
              }) : a ? l ? (0, $.jsxs)(`div`, {
                className: `p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/50 text-xs text-emerald-300 space-y-1.5`,
                children: [(0, $.jsxs)(`div`, {
                  className: `flex items-center justify-between`,
                  children: [(0, $.jsxs)(`div`, {
                    className: `flex items-center gap-2`,
                    children: [(0, $.jsx)(H, {
                      className: `w-4 h-4 text-emerald-400 shrink-0`
                    }), (0, $.jsx)(`span`, {
                      className: `font-bold`,
                      children: `Inside Office Geofence!`
                    })]
                  }), h !== null && (0, $.jsxs)(`span`, {
                    className: `text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-900/60 border border-emerald-500/40 text-emerald-200`,
                    children: [`±`, h, `m`]
                  })]
                }), (0, $.jsxs)(`div`, {
                  className: `flex items-center justify-between text-[11px] text-slate-300 font-mono`,
                  children: [(0, $.jsxs)(`span`, {
                    children: [s, `m from office (Within 100m)`]
                  }), (0, $.jsxs)(`button`, {
                    type: `button`,
                    onClick: te,
                    disabled: d,
                    className: `text-[10px] text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer`,
                    children: [(0, $.jsx)(ye, {
                      className: `w-3 h-3`
                    }), `Refresh GPS`]
                  })]
                })]
              }) : (0, $.jsxs)(`div`, {
                className: `p-3 rounded-xl bg-rose-950/50 border border-rose-500/50 text-xs text-rose-300 flex flex-col gap-2`,
                children: [(0, $.jsxs)(`div`, {
                  className: `flex items-center justify-between`,
                  children: [(0, $.jsxs)(`div`, {
                    className: `flex items-center gap-2`,
                    children: [(0, $.jsx)(V, {
                      className: `w-4 h-4 text-rose-400 shrink-0`
                    }), (0, $.jsx)(`span`, {
                      className: `font-bold`,
                      children: `Outside Office Perimeter`
                    })]
                  }), h !== null && (0, $.jsxs)(`span`, {
                    className: `text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-900/60 border border-rose-500/40 text-rose-200`,
                    children: [`±`, h, `m `, h > 70 ? `(Weak signal)` : ``]
                  })]
                }), (0, $.jsxs)(`p`, {
                  className: `text-[11px] text-rose-200 leading-snug`,
                  children: [`You are currently `, (0, $.jsxs)(`span`, {
                    className: `font-bold text-white`,
                    children: [s, ` meters`]
                  }), ` away from coordinates (`, Pc.lat.toFixed(6), `, `, Pc.lng.toFixed(6), `). Must be within 100m to verify.`]
                }), h && h > 50 && (0, $.jsx)(`p`, {
                  className: `text-[10px] text-amber-300/90 leading-tight`,
                  children: `Weak GPS reception indoors. Step near an exterior window and tap Refresh GPS.`
                }), (0, $.jsx)(`div`, {
                  className: `flex items-center gap-2 pt-0.5`,
                  children: (0, $.jsxs)(`button`, {
                    type: `button`,
                    onClick: te,
                    disabled: d,
                    className: `px-3 py-1.5 bg-[#EF4444] hover:bg-red-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer`,
                    children: [(0, $.jsx)(ye, {
                      className: `w-3 h-3`
                    }), `Refresh GPS`]
                  })
                }), !G && (0, $.jsxs)(`div`, {
                  className: `mt-1 pt-1.5 border-t border-rose-800/60`,
                  children: [(0, $.jsxs)(`div`, {
                    className: `flex items-center justify-between`,
                    children: [(0, $.jsx)(`span`, {
                      className: `text-[11px] font-bold text-amber-300`,
                      children: `Remote Checkout Allowed`
                    }), (0, $.jsx)(`span`, {
                      className: `text-[10px] font-bold text-amber-300 bg-amber-950 border border-amber-800 px-2 py-0.5 rounded`,
                      children: `Remote`
                    })]
                  }), (0, $.jsx)(`p`, {
                    className: `text-[10px] text-slate-300 mt-1 leading-snug`,
                    children: `Remote checkout is permitted to close your shift. Your selfie and current distance will be logged.`
                  })]
                })]
              }) : p ? (0, $.jsxs)(`div`, {
                className: `p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/60 text-xs text-rose-300 space-y-2.5`,
                children: [(0, $.jsxs)(`div`, {
                  className: `flex items-center gap-2`,
                  children: [(0, $.jsx)(V, {
                    className: `w-4 h-4 text-rose-400 shrink-0`
                  }), (0, $.jsx)(`span`, {
                    className: `font-bold`,
                    children: `GPS Permission / Reception Error`
                  })]
                }), (0, $.jsx)(`p`, {
                  className: `text-[11px] text-rose-200 leading-snug`,
                  children: p
                }), (0, $.jsxs)(`div`, {
                  className: `flex flex-wrap items-center gap-2 pt-0.5`,
                  children: [ml() && (0, $.jsxs)(`button`, {
                    type: `button`,
                    onClick: bl,
                    className: `px-3 py-1.5 bg-[#161B26] hover:bg-[#1E2433] border border-slate-600 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer`,
                    children: [(0, $.jsx)(we, {
                      className: `w-3 h-3 text-slate-300`
                    }), `Telegram Settings`]
                  }), (0, $.jsxs)(`button`, {
                    type: `button`,
                    onClick: te,
                    disabled: d,
                    className: `px-3 py-1.5 bg-[#EF4444] hover:bg-red-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer`,
                    children: [(0, $.jsx)(ye, {
                      className: `w-3 h-3`
                    }), `Try Again`]
                  })]
                })]
              }) : (0, $.jsxs)(`div`, {
                className: `p-3.5 rounded-xl bg-[#0D1017] border border-[#262C3A] text-center space-y-2`,
                children: [(0, $.jsx)(`p`, {
                  className: `text-xs text-slate-300`,
                  children: `Step 2: 100-meter office perimeter verification is required to complete check-in.`
                }), (0, $.jsxs)(`button`, {
                  type: `button`,
                  onClick: te,
                  className: `w-full py-2.5 px-4 bg-[#EF4444] hover:bg-red-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-red-500/25 flex items-center justify-center gap-2 cursor-pointer active:scale-95`,
                  children: [(0, $.jsx)(me, {
                    className: `w-4 h-4 text-white`
                  }), (0, $.jsx)(`span`, {
                    children: `Allow Location & Verify GPS`
                  })]
                })]
              })
            })]
          })]
        }), (0, $.jsxs)(`div`, {
          className: `p-4 border-t border-[#262C3A] bg-[#0D1017] space-y-2`,
          children: [!M && (0, $.jsxs)(`div`, {
            className: `flex items-center justify-between text-[11px] font-mono px-1`,
            children: [(0, $.jsxs)(`span`, {
              className: `flex items-center gap-1.5`,
              children: [(0, $.jsx)(`span`, {
                className: `w-2 h-2 rounded-full ${q?`bg-emerald-400`:`bg-red-500 animate-pulse`}`
              }), (0, $.jsxs)(`span`, {
                className: q ? `text-emerald-300 font-semibold` : `text-red-400 font-bold`,
                children: [`Photo: `, q ? `Captured ✓` : `Required ✕`]
              })]
            }), (0, $.jsxs)(`span`, {
              className: `flex items-center gap-1.5`,
              children: [(0, $.jsx)(`span`, {
                className: `w-2 h-2 rounded-full ${G?d?`bg-amber-400 animate-ping`:ce?`bg-emerald-400`:`bg-red-500 animate-pulse`:`bg-emerald-400`}`
              }), (0, $.jsxs)(`span`, {
                className: G ? d ? `text-amber-300` : ce ? `text-emerald-300 font-semibold` : `text-red-400 font-bold` : `text-emerald-300 font-semibold`,
                children: [`GPS: `, G ? d ? `Locating...` : ce ? `Within 100m ✓` : `Outside 100m ✕` : `Remote Allowed ✓`]
              })]
            })]
          }), (0, $.jsx)(`button`, {
            type: `button`,
            disabled: M || !J && !(q && !a && !d) && !(!q && !C && !A),
            onClick: () => {
              !q && !C ? O ? z() : U(!0) : q && !a && !d ? te() : ae()
            },
            className: `w-full py-4 rounded-2xl font-black text-xs sm:text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2.5 ${M?`bg-red-950/80 border border-red-500/60 text-white shadow-[0_4px_25px_rgba(239,68,68,0.3)] cursor-wait`:J?`bg-gradient-to-r from-[#EF4444] to-[#DC2626] border border-red-400/40 text-white shadow-[0_4px_25px_rgba(239,68,68,0.45)] hover:brightness-110 active:scale-[0.98] cursor-pointer`:!q&&!C&&!A||q&&!a&&!d?`bg-[#EF4444] hover:bg-red-500 text-white shadow-[0_4px_25px_rgba(239,68,68,0.35)] cursor-pointer active:scale-[0.98]`:`bg-[#181C26] border border-slate-700/60 text-slate-400 cursor-not-allowed opacity-90`}`,
            children: M ? (0, $.jsxs)($.Fragment, {
              children: [(0, $.jsx)(ye, {
                className: `w-5 h-5 animate-spin text-white`
              }), (0, $.jsx)(`span`, {
                className: `font-extrabold tracking-wide`,
                children: G ? `RECORDING CHECK IN...` : `RECORDING CHECK OUT...`
              })]
            }) : q ? G && !a && !d ? (0, $.jsxs)($.Fragment, {
              children: [(0, $.jsx)(me, {
                className: `w-4 h-4 text-white`
              }), (0, $.jsx)(`span`, {
                className: `font-extrabold tracking-wide text-white`,
                children: `ALLOW LOCATION & VERIFY GPS`
              })]
            }) : G && d ? (0, $.jsxs)($.Fragment, {
              children: [(0, $.jsx)(ye, {
                className: `w-4 h-4 animate-spin text-amber-400`
              }), (0, $.jsx)(`span`, {
                className: `font-bold tracking-wide text-amber-300`,
                children: `LOCKING SATELLITE GPS...`
              })]
            }) : G && !ce ? (0, $.jsxs)($.Fragment, {
              children: [(0, $.jsx)(V, {
                className: `w-4 h-4 text-rose-400`
              }), (0, $.jsx)(`span`, {
                className: `font-bold tracking-wide text-rose-300`,
                children: `OUTSIDE 100M GEOFENCE (CANNOT CHECK IN)`
              })]
            }) : (0, $.jsxs)($.Fragment, {
              children: [G ? (0, $.jsx)(H, {
                className: `w-4 h-4 stroke-[2.5]`
              }) : (0, $.jsx)(Ee, {
                className: `w-4 h-4 stroke-[2.5]`
              }), (0, $.jsx)(`span`, {
                className: `font-extrabold tracking-wide`,
                children: G ? `CONFIRM & CHECK IN` : `CONFIRM & CHECK OUT`
              })]
            }) : C ? (0, $.jsxs)($.Fragment, {
              children: [(0, $.jsx)(F, {
                className: `w-4 h-4 text-red-400`
              }), (0, $.jsx)(`span`, {
                className: `font-bold tracking-wide text-red-300`,
                children: G ? `PHOTO REQUIRED TO CHECK IN` : `PHOTO REQUIRED TO CHECK OUT`
              })]
            }) : (0, $.jsxs)($.Fragment, {
              children: [A ? (0, $.jsx)(ye, {
                className: `w-4 h-4 animate-spin text-white`
              }) : (0, $.jsx)(F, {
                className: `w-4 h-4 text-white`
              }), (0, $.jsx)(`span`, {
                className: `font-extrabold tracking-wide text-white`,
                children: A ? `REQUESTING CAMERA...` : O ? `OPEN PHONE CAMERA` : `ALLOW CAMERA FOR SELFIE`
              })]
            })
          })]
        })]
      })]
    })
  },
  Pl = ({
    isOpen: e,
    onClose: t,
    onConfirm: n
  }) => {
    let [r, i] = (0, T.useState)(`Forgot to check out before leaving dispatch office`), [a, o] = (0, T.useState)(!1), [s, c] = (0, T.useState)(`Detecting current remote location...`), [l, u] = (0, T.useState)({});
    return T.useEffect(() => {
      let t = !1;
      return e && (c(`Detecting location...`), Lc({
        timeoutMs: 8e3,
        targetAccuracyMeters: 100
      }).then(e => {
        if (t) return;
        let {
          distanceMeters: n
        } = Ic(e.lat, e.lng);
        u({
          lat: e.lat,
          lng: e.lng,
          distance: n
        }), c(n > 100 ? `Remote location detected: ${n}m from office perimeter (±${e.accuracy}m)` : `Office location detected: ${n}m from office (±${e.accuracy}m)`)
      }).catch(e => {
        t || (console.warn(`Geolocation unavailable for manual checkout:`, e?.message || e), c(`Remote location logged (GPS signal unavailable)`))
      })), () => {
        t = !0
      }
    }, [e]), e ? (0, $.jsx)(`div`, {
      className: `fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn font-['Plus_Jakarta_Sans',sans-serif]`,
      children: (0, $.jsxs)(`div`, {
        className: `bg-[#121620] border-2 border-red-500/30 w-full max-w-sm rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative text-white`,
        children: [(0, $.jsx)(`button`, {
          onClick: t,
          disabled: a,
          className: `absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-xl bg-[#161B26] border border-[#262C3A] transition-colors cursor-pointer`,
          children: (0, $.jsx)(He, {
            className: `w-4 h-4`
          })
        }), (0, $.jsxs)(`div`, {
          className: `text-center mb-4`,
          children: [(0, $.jsx)(`div`, {
            className: `w-12 h-12 rounded-2xl bg-amber-950/60 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-3 shadow-xs`,
            children: (0, $.jsx)(U, {
              className: `w-6 h-6`
            })
          }), (0, $.jsx)(`h3`, {
            className: `text-base font-extrabold text-white`,
            children: `Manual Remote Check-Out`
          }), (0, $.jsx)(`p`, {
            className: `text-xs text-[#94A3B8] mt-1 leading-relaxed`,
            children: `Forgot to check out before leaving the dispatch floor? You can record your checkout now from anywhere.`
          })]
        }), (0, $.jsxs)(`form`, {
          onSubmit: async e => {
            e.preventDefault(), o(!0), vl(`medium`);
            try {
              await Promise.all([n({
                note: `[Manual Remote Check-out] ${r.trim()||`Forgot to check out`}`,
                latitude: l.lat,
                longitude: l.lng,
                distanceMeters: l.distance
              }), new Promise(e => setTimeout(e, 3e3))]), vl(`success`), t()
            } catch (e) {
              console.error(`Manual checkout failed:`, e), vl(`error`)
            } finally {
              o(!1)
            }
          },
          className: `space-y-4`,
          children: [(0, $.jsxs)(`div`, {
            className: `p-3 bg-[#0D1017] border border-amber-800/60 rounded-2xl space-y-1.5 text-xs text-amber-300`,
            children: [(0, $.jsxs)(`div`, {
              className: `flex items-center gap-1.5 font-bold text-amber-400`,
              children: [(0, $.jsx)(Le, {
                className: `w-4 h-4 shrink-0 text-amber-400`
              }), (0, $.jsx)(`span`, {
                children: `100m Perimeter Bypassed`
              })]
            }), (0, $.jsx)(`p`, {
              className: `text-[11px] text-slate-300 leading-relaxed`,
              children: `This will close your active shift immediately. It will be logged with a manual checkout note for floor supervisors.`
            }), (0, $.jsxs)(`div`, {
              className: `flex items-center gap-1 text-[10px] text-amber-400/90 font-mono pt-1 border-t border-amber-900/40`,
              children: [(0, $.jsx)(de, {
                className: `w-3 h-3 shrink-0`
              }), (0, $.jsx)(`span`, {
                className: `truncate`,
                children: s
              })]
            })]
          }), (0, $.jsxs)(`div`, {
            className: `space-y-1.5`,
            children: [(0, $.jsx)(`label`, {
              className: `text-xs font-semibold text-slate-300`,
              children: `Reason / Explanation Note`
            }), (0, $.jsx)(`input`, {
              type: `text`,
              required: !0,
              value: r,
              onChange: e => i(e.target.value),
              placeholder: `e.g. Left office at 5:00 PM, forgot to check out`,
              className: `w-full py-2.5 px-3 bg-[#0E121A] border border-[#262C3A] rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#EF4444]`
            })]
          }), (0, $.jsxs)(`div`, {
            className: `pt-2 flex items-center gap-2`,
            children: [(0, $.jsx)(`button`, {
              type: `button`,
              onClick: t,
              disabled: a,
              className: `w-1/2 py-2.5 bg-[#161B26] hover:bg-[#1E2433] border border-[#262C3A] text-slate-300 rounded-xl text-xs font-bold transition-colors cursor-pointer`,
              children: `Cancel`
            }), (0, $.jsx)(`button`, {
              type: `submit`,
              disabled: a,
              className: `w-1/2 py-2.5 bg-[#EF4444] hover:bg-red-500 text-white rounded-xl text-xs font-bold shadow-md shadow-red-500/25 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer`,
              children: a ? (0, $.jsxs)($.Fragment, {
                children: [(0, $.jsx)(X, {
                  className: `w-3.5 h-3.5 animate-spin`
                }), (0, $.jsx)(`span`, {
                  children: `Checking Out...`
                })]
              }) : (0, $.jsxs)($.Fragment, {
                children: [(0, $.jsx)(I, {
                  className: `w-3.5 h-3.5`
                }), (0, $.jsx)(`span`, {
                  children: `Check Out Now`
                })]
              })
            })]
          })]
        })]
      })
    }) : null
  },
  Fl = ({
    employee: e,
    metrics: t
  }) => {
    let [n, r] = (0, T.useState)(() => new Date);
    (0, T.useEffect)(() => {
      let e = setInterval(() => {
        r(new Date)
      }, 1e3);
      return () => clearInterval(e)
    }, []);
    let i = t.isCheckedIn,
      a = (0, T.useMemo)(() => {
        let t = n.toLocaleTimeString(`en-GB`, {
            timeZone: `Asia/Tashkent`,
            hour12: !1
          }),
          [r, a, o] = t.split(`:`).map(Number),
          s = r * 60 + a,
          c = e;
        if (!c) try {
          let e = localStorage.getItem(`7core_active_user`),
            t = e ? JSON.parse(e) : null;
          if (t?.id) {
            let e = localStorage.getItem(`7core_employee_${t.id}`);
            if (e && (c = JSON.parse(e)), !c) {
              let e = localStorage.getItem(`7core_employees`);
              if (e) {
                let n = JSON.parse(e);
                n[t.id] && (c = n[t.id])
              }
            }
          }
        } catch {}
        if (!hs(c)) return {
          status: `unassigned`,
          uzTimeString: t,
          startTime: `--:--`,
          endTime: `--:--`,
          badgeText: `SHIFT UNASSIGNED`,
          badgeColor: `border-amber-500/40 bg-amber-950/40 text-amber-300`,
          dotColor: `bg-amber-400`,
          counterLabel: `SCHEDULE`,
          counterValue: `Shift Unassigned`,
          counterSub: `Awaiting shift assignment`,
          subtext: `Your shift has not been assigned yet. Once assigned, your working hours and days will appear here.`,
          isTodayWorkDay: !1,
          isShiftAssigned: !1
        };
        let l = c.shift_start_time,
          u = c.shift_end_time,
          d = ms(c.shift_days),
          f = n.toLocaleDateString(`en-US`, {
            timeZone: `Asia/Tashkent`,
            weekday: `long`
          }).toLowerCase(),
          p = n.toLocaleDateString(`en-US`, {
            weekday: `long`
          }).toLowerCase(),
          [m, h] = l.split(`:`).map(Number),
          [g, _] = u.split(`:`).map(Number),
          v = m * 60 + h,
          y = g * 60 + _,
          b = v > y,
          x = d.includes(f) || d.includes(p);
        if (b && s < y) {
          let e = new Date(n.getTime() - 864e5),
            t = e.toLocaleDateString(`en-US`, {
              timeZone: `Asia/Tashkent`,
              weekday: `long`
            }).toLowerCase(),
            r = e.toLocaleDateString(`en-US`, {
              weekday: `long`
            }).toLowerCase();
          (d.includes(t) || d.includes(r)) && (x = !0)
        }
        let S = v - s;
        if (i) return {
          status: `on_duty`,
          uzTimeString: t,
          startTime: l,
          endTime: u,
          badgeText: `ON DUTY`,
          badgeColor: `border-emerald-500/50 bg-emerald-950/60 text-emerald-300`,
          dotColor: `bg-emerald-400`,
          counterLabel: `ACTIVE DUTY`,
          counterValue: `${l} – ${u}`,
          counterSub: `Ends at ${u} UZT`,
          subtext: `Currently checked in. Scheduled until ${u} UZT.`,
          isTodayWorkDay: !0,
          isShiftAssigned: !0
        };
        if (!x) return {
          status: `off_day`,
          uzTimeString: t,
          startTime: l,
          endTime: u,
          badgeText: `DAY OFF`,
          badgeColor: `border-slate-700 bg-[#0E121A] text-slate-400`,
          dotColor: `bg-slate-500`,
          counterLabel: `SCHEDULE`,
          counterValue: `Day Off`,
          counterSub: `Scheduled rest day`,
          subtext: `Today is a scheduled day off.`,
          isTodayWorkDay: !1,
          isShiftAssigned: !0
        };
        if (S <= 45 && S > 0) return {
          status: `ready`,
          uzTimeString: t,
          startTime: l,
          endTime: u,
          badgeText: `CHECK-IN READY`,
          badgeColor: `border-[#EF4444] bg-red-950/70 text-red-300 animate-pulse`,
          dotColor: `bg-[#EF4444]`,
          counterLabel: `TODAY SHIFT`,
          counterValue: `${l} – ${u}`,
          counterSub: `Check-in ready • Starts in ${S}m`,
          subtext: `Check-in window is open. Scheduled shift: ${l} – ${u} UZT.`,
          isTodayWorkDay: !0,
          isShiftAssigned: !0
        };
        if (S > 45) {
          let e = Math.floor(S / 60),
            n = S % 60,
            r = e > 0 ? `${e}h ${n>0?`${n}m`:``}`.trim() : `${n}m`;
          return {
            status: `upcoming`,
            uzTimeString: t,
            startTime: l,
            endTime: u,
            badgeText: `UPCOMING`,
            badgeColor: `border-red-500/30 bg-[#0E121A] text-slate-300`,
            dotColor: `bg-red-400`,
            counterLabel: `TODAY SHIFT`,
            counterValue: `${l} – ${u}`,
            counterSub: `Starts in ${r} (${l} UZT)`,
            subtext: `Scheduled shift: ${l} – ${u} (Tashkent GMT+5).`,
            isTodayWorkDay: !0,
            isShiftAssigned: !0
          }
        }
        let C = Math.abs(S),
          w = Math.floor(C / 60),
          T = C % 60,
          E = w > 0 ? `${w}h ${T}m` : `${T}m`;
        return {
          status: `active_pending`,
          uzTimeString: t,
          startTime: l,
          endTime: u,
          badgeText: `CHECK-IN PENDING`,
          badgeColor: `border-amber-500/50 bg-amber-950/60 text-amber-300 animate-pulse`,
          dotColor: `bg-amber-400`,
          counterLabel: `TODAY SHIFT`,
          counterValue: `${l} – ${u}`,
          counterSub: `Started ${E} ago`,
          subtext: `Shift started ${E} ago (${l} UZT). Please check in below.`,
          isTodayWorkDay: !0,
          isShiftAssigned: !0
        }
      }, [e, i, n]);
    return (0, $.jsx)(`div`, {
      className: `w-full my-2.5 select-none font-['Plus_Jakarta_Sans',sans-serif]`,
      children: (0, $.jsxs)(`div`, {
        className: `w-full bg-[#131722] border border-red-500/40 rounded-[26px] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.5)] relative overflow-hidden`,
        children: [(0, $.jsx)(`div`, {
          className: `absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#EF4444] to-transparent opacity-80`
        }), (0, $.jsx)(`div`, {
          className: `absolute top-3.5 right-3.5 grid grid-cols-4 gap-1.5 opacity-40 pointer-events-none`,
          children: Array.from({
            length: 8
          }).map((e, t) => (0, $.jsx)(`span`, {
            className: `w-1.5 h-1.5 rounded-full bg-[#EF4444]`
          }, t))
        }), (0, $.jsxs)(`div`, {
          className: `flex items-center justify-between gap-2 mb-3 relative z-10`,
          children: [(0, $.jsxs)(`div`, {
            className: `flex items-center gap-2 min-w-0`,
            children: [(0, $.jsx)(U, {
              className: `w-3.5 h-3.5 text-[#EF4444] shrink-0`
            }), (0, $.jsxs)(`span`, {
              className: `text-xs font-mono font-bold text-white tracking-wider`,
              children: [a.uzTimeString, ` `, (0, $.jsx)(`span`, {
                className: `text-[10px] text-slate-400 font-normal`,
                children: `UZT`
              })]
            })]
          }), (0, $.jsxs)(`span`, {
            className: `inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold border shrink-0 ${a.badgeColor}`,
            children: [(0, $.jsx)(`span`, {
              className: `w-1.5 h-1.5 rounded-full ${a.dotColor} ${a.status===`ready`||a.status===`on_duty`||a.status===`active_pending`?`animate-pulse`:``}`
            }), a.badgeText]
          })]
        }), (0, $.jsxs)(`div`, {
          className: `p-3.5 rounded-2xl bg-[#0D1017] border border-[#262C3A] flex items-center justify-between gap-3 mb-2.5 relative z-10 shadow-inner`,
          children: [(0, $.jsxs)(`div`, {
            className: `flex flex-col`,
            children: [(0, $.jsx)(`span`, {
              className: `text-[#EF4444] text-[10px] font-black tracking-widest uppercase block mb-0.5`,
              children: a.counterLabel
            }), (0, $.jsx)(`div`, {
              className: `text-white text-xl sm:text-2xl font-black tracking-tight leading-none font-mono`,
              children: a.counterValue
            }), (0, $.jsx)(`span`, {
              className: `text-[#94A3B8] text-[10px] font-mono mt-1`,
              children: a.counterSub
            })]
          }), (0, $.jsxs)(`div`, {
            className: `text-right flex flex-col items-end`,
            children: [(0, $.jsx)(`span`, {
              className: `text-[10px] font-mono text-[#94A3B8] uppercase block mb-0.5`,
              children: `Schedule`
            }), (0, $.jsxs)(`div`, {
              className: `flex items-center gap-1.5 mb-0.5`,
              children: [a.isShiftAssigned ? a.isTodayWorkDay ? a.startTime >= `16:00` ? (0, $.jsx)(pe, {
                className: `w-3.5 h-3.5 text-red-400`
              }) : (0, $.jsx)(je, {
                className: `w-3.5 h-3.5 text-amber-400`
              }) : (0, $.jsx)(P, {
                className: `w-3.5 h-3.5 text-slate-500`
              }) : (0, $.jsx)(V, {
                className: `w-3.5 h-3.5 text-amber-400`
              }), (0, $.jsx)(`span`, {
                className: `text-xs font-mono font-black ${a.isShiftAssigned?a.isTodayWorkDay?`text-white`:`text-slate-400`:`text-amber-300`}`,
                children: a.isShiftAssigned ? a.isTodayWorkDay ? `${a.startTime} – ${a.endTime}` : `Day Off` : `Unassigned`
              })]
            }), (0, $.jsx)(`span`, {
              className: `text-[10px] font-mono text-slate-400`,
              children: `Tashkent (GMT+5)`
            })]
          })]
        }), (0, $.jsx)(`div`, {
          className: `px-1 relative z-10`,
          children: (0, $.jsx)(`p`, {
            className: `text-[11px] text-[#94A3B8] leading-snug`,
            children: a.subtext
          })
        })]
      })
    })
  },
  Il = ({
    initialUser: e,
    onComplete: t
  }) => {
    let [n, r] = (0, T.useState)(`code`), [i, a] = (0, T.useState)(``), [o, s] = (0, T.useState)(``), [c, l] = (0, T.useState)(!1), [u, d] = (0, T.useState)(e.first_name || ``), [f, p] = (0, T.useState)(e.last_name || ``), [m, h] = (0, T.useState)(() => {
      let t = e.department;
      return t && !t.toLowerCase().includes(`fleet`) && kc.includes(t) ? t : ``
    }), [g, _] = (0, T.useState)(!1), [v, y] = (0, T.useState)(``), [b, x] = (0, T.useState)(``), [S, C] = (0, T.useState)(!1);
    return (0, T.useEffect)(() => {
      if (n !== `welcome`) return;
      let r = 0;
      x(``), C(!1);
      let i = setInterval(() => {
        r < 27 ? (x(`Welcome to 7CORE Attendance`.slice(0, r + 1)), r++) : (clearInterval(i), C(!0), setTimeout(() => {
          t({
            ...e,
            first_name: u.trim(),
            last_name: f.trim() || void 0,
            department: m || `7CORE`
          })
        }, 1200))
      }, 65);
      return () => clearInterval(i)
    }, [n]), (0, $.jsxs)(`div`, {
      className: `w-full min-h-[560px] flex flex-col justify-center px-2 py-6 select-none`,
      children: [n === `code` && (0, $.jsxs)(`div`, {
        className: `bg-[#131722] rounded-3xl p-6 shadow-xl border border-slate-800 flex flex-col items-center text-center animate-fadeIn text-white`,
        children: [(0, $.jsx)(`div`, {
          className: `mb-4 flex flex-col items-center`,
          children: (0, $.jsx)(`img`, {
            src: `/logo2.png`,
            alt: `SEVENCORE`,
            className: `h-10 sm:h-12 w-auto max-w-[240px] object-contain mx-auto mb-2 select-none`
          })
        }), (0, $.jsxs)(`div`, {
          className: `inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-slate-300 text-xs font-bold mb-3 border border-slate-800`,
          children: [(0, $.jsx)(De, {
            className: `w-3.5 h-3.5 text-[#E51E2B]`
          }), `7CORE Security Gate`]
        }), (0, $.jsx)(`h2`, {
          className: `text-xl font-black text-white tracking-tight`,
          children: `Organization Passkey`
        }), (0, $.jsx)(`p`, {
          className: `text-xs text-[#94A3B8] mt-1 mb-6 max-w-xs leading-relaxed font-medium`,
          children: `This attendance terminal is restricted to authorized company personnel. Enter your organization passkey to continue.`
        }), (0, $.jsxs)(`form`, {
          onSubmit: async e => {
            if (e.preventDefault(), s(``), !i.trim()) {
              s(`Please enter your organization passkey.`);
              return
            }
            l(!0);
            try {
              await Fs(i) ? (vl(`success`), r(`profile`)) : (vl(`error`), s(`Invalid access code.`))
            } catch {
              s(`Verification error. Please try again.`)
            } finally {
              l(!1)
            }
          },
          className: `w-full max-w-xs space-y-4`,
          children: [(0, $.jsxs)(`div`, {
            children: [(0, $.jsx)(`input`, {
              type: `text`,
              autoFocus: !0,
              value: i,
              onChange: e => {
                a(e.target.value.toUpperCase()), s(``)
              },
              placeholder: `ENTER PASSKEY`,
              className: `w-full text-center tracking-widest font-mono text-lg font-bold py-3.5 px-4 rounded-xl border border-slate-700 bg-slate-900 text-white focus:border-[#E51E2B] focus:outline-none transition-all uppercase placeholder:normal-case placeholder:font-sans placeholder:text-slate-500 placeholder:text-sm`
            }), o && (0, $.jsx)(`p`, {
              className: `text-xs text-[#EF4444] font-semibold mt-2 animate-shake`,
              children: o
            })]
          }), (0, $.jsx)(`button`, {
            type: `submit`,
            disabled: c,
            className: `w-full py-3.5 px-6 rounded-xl bg-[#E51E2B] hover:bg-red-700 text-white font-bold text-sm shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer`,
            children: c ? (0, $.jsxs)($.Fragment, {
              children: [(0, $.jsx)(X, {
                className: `w-4 h-4 animate-spin`
              }), (0, $.jsx)(`span`, {
                children: `Verifying Passkey...`
              })]
            }) : (0, $.jsxs)($.Fragment, {
              children: [(0, $.jsx)(`span`, {
                children: `Verify Passkey`
              }), (0, $.jsx)(j, {
                className: `w-4 h-4`
              })]
            })
          })]
        })]
      }), n === `profile` && (0, $.jsxs)(`div`, {
        className: `bg-[#131722] rounded-3xl p-6 shadow-xl border border-slate-800 animate-fadeIn text-white`,
        children: [(0, $.jsxs)(`div`, {
          className: `flex items-center gap-2 mb-1`,
          children: [(0, $.jsx)(`span`, {
            className: `w-2 h-2 rounded-full bg-[#E51E2B]`
          }), (0, $.jsx)(`span`, {
            className: `text-xs font-black uppercase tracking-wider text-slate-400`,
            children: `Step 2 of 2`
          })]
        }), (0, $.jsx)(`h2`, {
          className: `text-xl font-black text-white tracking-tight`,
          children: `Employee Information`
        }), (0, $.jsx)(`p`, {
          className: `text-xs text-[#94A3B8] mt-1 mb-5 font-medium`,
          children: `Confirm your legal name and your primary operating department.`
        }), (0, $.jsxs)(`form`, {
          onSubmit: async t => {
            if (t.preventDefault(), y(``), !u.trim()) {
              y(`Please enter your first name.`);
              return
            }
            if (!m) {
              y(`Please select your department.`);
              return
            }
            let n = {
              ...e,
              first_name: u.trim(),
              last_name: f.trim() || void 0,
              department: m
            };
            _l(n);
            let i = {
              telegram_id: n.id,
              first_name: n.first_name,
              last_name: n.last_name || null,
              username: n.username || null,
              photo_url: n.photo_url || null,
              department: m,
              is_verified: !0,
              created_at: new Date().toISOString(),
              shift_name: `Shift Unassigned`,
              shift_start_time: null,
              shift_end_time: null,
              shift_days: []
            };
            try {
              localStorage.setItem(`7core_employee_${n.id}`, JSON.stringify(i))
            } catch {}
            try {
              await _s(i)
            } catch (e) {
              console.warn(`Sync employee error during onboarding:`, e)
            }
            vl(`success`), r(`welcome`)
          },
          className: `space-y-4`,
          children: [(0, $.jsxs)(`div`, {
            className: `space-y-1.5`,
            children: [(0, $.jsxs)(`label`, {
              className: `text-xs font-bold text-slate-300 flex items-center gap-1.5`,
              children: [(0, $.jsx)(Be, {
                className: `w-3.5 h-3.5 text-slate-400`
              }), `First Name`]
            }), (0, $.jsx)(`input`, {
              type: `text`,
              required: !0,
              value: u,
              onChange: e => d(e.target.value),
              placeholder: `Enter your first name`,
              className: `w-full py-2.5 px-3.5 rounded-xl border border-slate-700 bg-slate-900 text-white text-sm focus:border-[#E51E2B] focus:outline-none font-medium placeholder:text-slate-500`
            })]
          }), (0, $.jsxs)(`div`, {
            className: `space-y-1.5`,
            children: [(0, $.jsxs)(`label`, {
              className: `text-xs font-bold text-slate-300 flex items-center gap-1.5`,
              children: [(0, $.jsx)(Be, {
                className: `w-3.5 h-3.5 text-slate-400`
              }), `Last Name (Optional)`]
            }), (0, $.jsx)(`input`, {
              type: `text`,
              value: f,
              onChange: e => p(e.target.value),
              placeholder: `Enter your last name`,
              className: `w-full py-2.5 px-3.5 rounded-xl border border-slate-700 bg-slate-900 text-white text-sm focus:border-[#E51E2B] focus:outline-none font-medium placeholder:text-slate-500`
            })]
          }), (0, $.jsxs)(`div`, {
            className: `space-y-1.5 relative`,
            children: [(0, $.jsxs)(`label`, {
              className: `text-xs font-bold text-slate-300 flex items-center gap-1.5`,
              children: [(0, $.jsx)(N, {
                className: `w-3.5 h-3.5 text-slate-400`
              }), `Select Department`]
            }), (0, $.jsxs)(`button`, {
              type: `button`,
              onClick: () => _(!g),
              className: `w-full py-2.5 px-3.5 rounded-xl border border-slate-700 bg-slate-900 text-sm flex items-center justify-between focus:border-[#E51E2B] focus:outline-none text-left font-medium cursor-pointer`,
              children: [(0, $.jsx)(`span`, {
                className: m ? `font-bold text-white` : `text-slate-500`,
                children: m || `Choose from HOS, 7CORE, CARGOGPT...`
              }), (0, $.jsx)(ee, {
                className: `w-4 h-4 text-slate-400 transition-transform ${g?`rotate-180`:``}`
              })]
            }), g && (0, $.jsx)(`div`, {
              className: `absolute top-full left-0 right-0 mt-1.5 bg-[#1A202C] border border-slate-700 rounded-xl shadow-2xl z-50 py-1.5 max-h-56 overflow-y-auto`,
              children: kc.filter(e => !e.toLowerCase().includes(`fleet`)).map(e => {
                let t = m === e;
                return (0, $.jsxs)(`button`, {
                  type: `button`,
                  onClick: () => {
                    h(e), _(!1)
                  },
                  className: `w-full px-3.5 py-2.5 text-left text-xs font-bold flex items-center justify-between hover:bg-slate-800 transition-colors cursor-pointer ${t?`bg-slate-800 text-white`:`text-slate-300`}`,
                  children: [(0, $.jsxs)(`div`, {
                    className: `flex items-center gap-2`,
                    children: [(0, $.jsx)(`span`, {
                      className: `w-2 h-2 rounded-full bg-[#E51E2B]`
                    }), (0, $.jsx)(`span`, {
                      children: e
                    })]
                  }), t && (0, $.jsx)(I, {
                    className: `w-4 h-4 text-[#E51E2B]`
                  })]
                }, e)
              })
            })]
          }), v && (0, $.jsx)(`p`, {
            className: `text-xs text-[#EF4444] font-semibold`,
            children: v
          }), (0, $.jsxs)(`button`, {
            type: `submit`,
            className: `w-full py-3.5 px-6 rounded-xl bg-[#E51E2B] hover:bg-red-700 text-white font-bold text-sm shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2`,
            children: [(0, $.jsx)(`span`, {
              children: `Confirm & Start Shift`
            }), (0, $.jsx)(j, {
              className: `w-4 h-4`
            })]
          })]
        })]
      }), n === `welcome` && (0, $.jsxs)(`div`, {
        className: `bg-[#131722] rounded-3xl p-8 shadow-xl border border-slate-800 flex flex-col items-center justify-center text-center animate-fadeIn min-h-[380px] text-white`,
        children: [(0, $.jsx)(`div`, {
          className: `mb-6 flex items-center justify-center`,
          children: (0, $.jsx)(`img`, {
            src: `/logo.png`,
            alt: `SEVENCORE`,
            className: `h-12 sm:h-14 w-auto max-w-[260px] object-contain mx-auto select-none`
          })
        }), (0, $.jsxs)(`h2`, {
          className: `text-3xl text-white font-bold mb-3 min-h-[50px] font-['Dancing_Script',cursive]`,
          style: {
            textShadow: `0 2px 8px rgba(0,0,0,0.5)`
          },
          children: [b, !S && (0, $.jsx)(`span`, {
            className: `inline-block w-[2px] h-6 bg-[#E51E2B] ml-1 animate-pulse`
          })]
        }), (0, $.jsxs)(`p`, {
          className: `text-sm font-bold text-slate-300`,
          children: [`Welcome aboard, `, (0, $.jsx)(`strong`, {
            className: `text-white`,
            children: u
          }), `!`]
        }), (0, $.jsxs)(`span`, {
          className: `text-xs font-black uppercase tracking-wider text-[#EF4444] bg-red-950/50 border border-red-500/40 px-3 py-1 rounded-full mt-2`,
          children: [`Department: `, m]
        }), (0, $.jsxs)(`div`, {
          className: `mt-8 flex items-center justify-center gap-2 text-xs font-semibold text-slate-500`,
          children: [(0, $.jsx)(X, {
            className: `w-3.5 h-3.5 animate-spin text-[#EF4444]`
          }), (0, $.jsx)(`span`, {
            children: `Loading dashboard...`
          })]
        })]
      })]
    })
  },
  Ll = ({
    onNavigateToAdmin: e,
    onNavigateToManage: t,
    onNavigateToDev: n,
    onBackToLanding: r
  }) => {
    let [i, a] = (0, T.useState)(`checkin`), [o, s] = (0, T.useState)(gl()), [c, l] = (0, T.useState)(() => {
      try {
        let e = localStorage.getItem(`7core_employee_${gl().id}`);
        if (e) return JSON.parse(e)
      } catch (e) {
        console.warn(`Failed to parse cached employee profile`, e)
      }
      return null
    }), [u, d] = (0, T.useState)(!1), [f, p] = (0, T.useState)(!0), [m, h] = (0, T.useState)([]), [g, _] = (0, T.useState)({
      isCheckedIn: !1,
      presentToday: 0,
      totalPresentUnits: 1,
      totalHoursFormatted: `00:00`,
      totalMinutes: 0
    }), [v, y] = (0, T.useState)(!0), [b, x] = (0, T.useState)(`check_in`), [S, C] = (0, T.useState)(!1), [w, E] = (0, T.useState)(!1);
    (0, T.useEffect)(() => {
      hl();
      let e = gl();
      s(e), (async () => {
        try {
          if (localStorage.getItem(`7core_logged_out_${e.id}`) === `true`) {
            d(!1), l(null), p(!1);
            return
          }
          let t = await gs(e.id);
          if (t && t.department && t.first_name) {
            l(t), d(!0);
            let n = {
              ...e,
              first_name: t.first_name,
              last_name: t.last_name || e.last_name,
              department: t.department?.toLowerCase() === `fleet` ? `Fleet` : t.department
            };
            s(n), _l(n), localStorage.setItem(`7core_registered_${e.id}`, `true`)
          } else {
            let t = null;
            try {
              let n = localStorage.getItem(`7core_employee_${e.id}`);
              n && (t = JSON.parse(n))
            } catch {}
            if (t && t.first_name && t.department) {
              l(t), d(!0);
              let n = {
                ...e,
                first_name: t.first_name,
                last_name: t.last_name || e.last_name,
                department: t.department?.toLowerCase() === `fleet` ? `Fleet` : t.department
              };
              s(n), _l(n), localStorage.setItem(`7core_registered_${e.id}`, `true`)
            } else d(!1), l(null), ps(e.id)
          }
        } catch (e) {
          console.warn(`Registration check warning:`, e), d(!1), l(null)
        } finally {
          p(!1)
        }
      })()
    }, []);
    let D = (0, T.useCallback)(async () => {
      try {
        let [e, t] = await Promise.all([Cs(o.id), gs(o.id)]);
        h(e);
        let n = Es(e);
        _(n), t && l(t)
      } catch (e) {
        console.error(`Failed to load attendance logs:`, e)
      } finally {
        y(!1)
      }
    }, [o.id]);
    (0, T.useEffect)(() => {
      if (!u || !o.id) return;
      D();
      let e = null,
        t = () => {
          clearTimeout(e), e = setTimeout(() => {
            D()
          }, 500)
        };
      window.addEventListener(`7core_attendance_update`, t), window.addEventListener(`storage`, t);
      let n = zs(o.id, () => {
        clearTimeout(e), e = setTimeout(() => {
          D()
        }, 500)
      });
      return () => {
        clearTimeout(e), window.removeEventListener(`7core_attendance_update`, t), window.removeEventListener(`storage`, t), n()
      }
    }, [u, o.id, D]), (0, T.useEffect)(() => {
      if (!g.isCheckedIn) return;
      let e = setInterval(() => {
        _(Es(m))
      }, 15e3);
      return () => clearInterval(e)
    }, [g.isCheckedIn, m]);
    let O = e => {
        x(e), C(!0)
      },
      k = async e => {
        try {
          let t = await Ts(o.id, b, void 0, {
            photoUrl: e.photoUrl,
            latitude: e.latitude,
            longitude: e.longitude,
            distanceMeters: e.distanceMeters
          });
          h(e => {
            let n = [...e.filter(e => e.id !== t.id), t];
            return _(Es(n)), n
          }), vl(`success`)
        } catch (e) {
          console.error(`Failed to record verified attendance:`, e), vl(`error`), e?.message && e.message.includes(`removed from database`) && j()
        }
      }, A = async e => {
        try {
          localStorage.removeItem(`7core_logged_out_${e.id}`)
        } catch {}
        s(e), d(!0), localStorage.setItem(`7core_registered_${e.id}`, `true`);
        let t = await gs(e.id);
        t && l(t), D()
      }, j = () => {
        ps(o.id), l(null), d(!1), a(`checkin`);
        let e = gl();
        s({
          ...e,
          first_name: ``,
          last_name: ``,
          department: null
        }), h([]), _({
          isCheckedIn: !1,
          presentToday: 0,
          totalPresentUnits: 1,
          totalHoursFormatted: `00:00`,
          totalMinutes: 0
        })
      };
    return f ? (0, $.jsx)(`div`, {
      className: `min-h-screen bg-[#0D1017] flex items-center justify-center`,
      children: (0, $.jsx)(`div`, {
        className: `w-8 h-8 rounded-full border-2 border-[#E51E2B] border-t-transparent animate-spin`
      })
    }) : (0, $.jsx)(`div`, {
      className: `min-h-screen bg-[#0D1017] text-white flex flex-col items-center selection:bg-red-900/40 selection:text-white font-['Plus_Jakarta_Sans',sans-serif]`,
      style: {
        background: i === `checkin` ? `radial-gradient(130% 270px at 50% 0%, #FFFFFF 0%, #E3E7EE 30%, #3B4454 65%, #0D1017 100%), #0D1017` : `#0D1017`
      },
      children: (0, $.jsxs)(`main`, {
        className: `w-full max-w-[430px] min-h-screen flex flex-col px-4 pt-1 pb-16 relative`,
        children: [(0, $.jsx)(ul, {
          user: o,
          onAvatarClick: () => a(`profile`),
          activeTab: i
        }), u ? (0, $.jsxs)($.Fragment, {
          children: [i === `checkin` && (0, $.jsxs)(`section`, {
            className: `flex flex-col flex-1 animate-fadeIn`,
            children: [(0, $.jsx)(dl, {
              metrics: g
            }), (0, $.jsx)(Fl, {
              employee: c,
              metrics: g
            }), (0, $.jsx)(Sl, {
              metrics: g,
              employee: c,
              onTriggerVerification: O,
              onManualCheckout: () => E(!0)
            }), (0, $.jsx)(Cl, {
              logs: m
            })]
          }), i === `mylog` && (0, $.jsx)(`section`, {
            className: `flex-1 animate-fadeIn`,
            children: (0, $.jsx)(El, {
              logs: m,
              onRefresh: D
            })
          }), i === `calendar` && (0, $.jsx)(`section`, {
            className: `flex-1 animate-fadeIn`,
            children: (0, $.jsx)(Tl, {
              user: o
            })
          }), i === `profile` && (0, $.jsx)(`section`, {
            className: `flex-1 animate-fadeIn`,
            children: (0, $.jsx)(Al, {
              user: o,
              employee: c,
              onLogout: j,
              onUpdateUser: e => {
                s(e), _l(e)
              }
            })
          }), (0, $.jsx)(wl, {
            activeTab: i,
            onSelectTab: a
          })]
        }) : (0, $.jsx)(Il, {
          initialUser: o,
          onComplete: A
        }), (0, $.jsx)(Nl, {
          actionType: b,
          isOpen: S,
          employee: c,
          onClose: () => C(!1),
          onConfirm: k
        }), (0, $.jsx)(Pl, {
          isOpen: w,
          onClose: () => E(!1),
          onConfirm: async e => {
            try {
              let t = await Ts(o.id, `check_out`, e.note, {
                latitude: e.latitude,
                longitude: e.longitude,
                distanceMeters: e.distanceMeters
              });
              h(e => {
                let n = [...e.filter(e => e.id !== t.id), t];
                return _(Es(n)), n
              }), vl(`success`)
            } catch (e) {
              console.error(`Failed to record manual checkout:`, e), vl(`error`), e?.message && e.message.includes(`removed from database`) && j()
            }
          }
        })]
      })
    })
  },
  Rl = () => {
    let [e, t] = (0, T.useState)(35), [n, r] = (0, T.useState)(`monthly`), [i, a] = (0, T.useState)(!1), [o, s] = (0, T.useState)(`Fleet Pro ($9.99/user) - 14-Day Free Trial`), [c, l] = (0, T.useState)(!1), [u, d] = (0, T.useState)({
      name: ``,
      company: ``,
      email: ``,
      phone: ``,
      fleetSize: `35`,
      notes: ``
    }), f = 6.99, p = 9.99, m = 16.99, h = n === `annual` ? .833 : 1, g = Math.round(e * f * h * 100) / 100, _ = Math.round(e * p * h * 100) / 100, v = Math.round(e * m * h * 100) / 100, y = 18 / 60 * e * 26, b = Math.round(y * 22), x = Math.round(b * 12), S = e => {
      s(e), l(!1), a(!0)
    }, C = e => {
      e.preventDefault(), l(!0)
    }, w = e => {
      let t = document.getElementById(e);
      t && t.scrollIntoView({
        behavior: `smooth`
      })
    };
    return (0, $.jsxs)(`div`, {
      className: `min-h-screen bg-[#0A0D14] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-red-900/40 selection:text-white`,
      children: [(0, $.jsx)(`header`, {
        className: `sticky top-0 z-50 w-full border-b border-[#1E2433] bg-[#0A0D14]/90 backdrop-blur-md`,
        children: (0, $.jsxs)(`div`, {
          className: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between`,
          children: [(0, $.jsxs)(`div`, {
            className: `flex items-center gap-3`,
            children: [(0, $.jsx)(`img`, {
              src: `/logo3.png`,
              alt: `OPSECTOR`,
              className: `h-8 sm:h-9 w-auto max-w-[190px] object-contain select-none`
            }), (0, $.jsx)(`span`, {
              className: `hidden sm:inline-block text-xs font-mono text-slate-400 border-l border-[#1E2433] pl-3`,
              children: `Fleet Logistics TMS`
            })]
          }), (0, $.jsxs)(`nav`, {
            className: `hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300`,
            children: [(0, $.jsx)(`button`, {
              onClick: () => w(`features`),
              className: `hover:text-white transition-colors cursor-pointer`,
              children: `Features`
            }), (0, $.jsx)(`button`, {
              onClick: () => w(`how-it-works`),
              className: `hover:text-white transition-colors cursor-pointer`,
              children: `How It Works`
            }), (0, $.jsx)(`button`, {
              onClick: () => w(`pricing`),
              className: `hover:text-white transition-colors cursor-pointer`,
              children: `Pricing & Plans`
            }), (0, $.jsx)(`button`, {
              onClick: () => w(`calculator`),
              className: `hover:text-white transition-colors cursor-pointer`,
              children: `Seat Calculator`
            }), (0, $.jsx)(`button`, {
              onClick: () => w(`faq`),
              className: `hover:text-white transition-colors cursor-pointer`,
              children: `FAQ`
            })]
          }), (0, $.jsx)(`div`, {
            className: `flex items-center gap-3`,
            children: (0, $.jsxs)(`button`, {
              onClick: () => S(`Custom Enterprise Demo`),
              className: `px-4 py-2 rounded-xl bg-[#E51E2B] hover:bg-red-600 text-xs font-bold text-white shadow-lg shadow-red-500/25 flex items-center gap-1.5 transition-all cursor-pointer`,
              children: [(0, $.jsx)(ve, {
                className: `w-3.5 h-3.5`
              }), (0, $.jsx)(`span`, {
                children: `Contact Sales`
              })]
            })
          })]
        })
      }), (0, $.jsxs)(`section`, {
        className: `relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full overflow-hidden`,
        children: [(0, $.jsx)(`div`, {
          className: `absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-red-600/10 blur-[140px] rounded-full pointer-events-none`
        }), (0, $.jsxs)(`div`, {
          className: `relative text-center max-w-3xl mx-auto space-y-6`,
          children: [(0, $.jsxs)(`div`, {
            className: `inline-flex items-center gap-2 text-xs font-mono text-red-400 bg-red-950/40 border border-red-500/30 px-3.5 py-1 rounded-full`,
            children: [(0, $.jsx)(De, {
              className: `w-3.5 h-3.5 text-red-400`
            }), (0, $.jsx)(`span`, {
              children: `Enterprise-Grade TMS Built for 35+ Truck Operations`
            })]
          }), (0, $.jsxs)(`h1`, {
            className: `text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]`,
            children: [`Eliminate Buddy Punching with `, (0, $.jsx)(`span`, {
              className: `text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400`,
              children: `100m GPS & Selfie Verification`
            })]
          }), (0, $.jsx)(`p`, {
            className: `text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed`,
            children: `Drivers check in directly in Telegram in under 3 seconds. Zero App Store downloads, strict satellite perimeter checks, and audit-proof shift spreadsheets designed for 85-inch dispatch floor command displays.`
          }), (0, $.jsxs)(`div`, {
            className: `pt-2 flex flex-wrap items-center justify-center gap-3`,
            children: [(0, $.jsxs)(`button`, {
              onClick: () => S(`Fleet Pro ($9.99/user) - 14-Day Free Trial`),
              className: `px-6 py-3.5 rounded-2xl bg-[#E51E2B] hover:bg-red-600 text-white font-bold text-sm shadow-xl shadow-red-500/30 flex items-center gap-2 transition-all cursor-pointer`,
              children: [(0, $.jsx)(`span`, {
                children: `Start 14-Day Free Trial`
              }), (0, $.jsx)(j, {
                className: `w-4 h-4`
              })]
            }), (0, $.jsxs)(`button`, {
              onClick: () => w(`pricing`),
              className: `px-6 py-3.5 rounded-2xl border border-[#262C3A] bg-[#121622] hover:bg-[#1A2030] text-slate-200 font-bold text-sm transition-all cursor-pointer flex items-center gap-2`,
              children: [(0, $.jsx)(re, {
                className: `w-4 h-4 text-emerald-400`
              }), (0, $.jsx)(`span`, {
                children: `Explore Plans ($6.99 – $16.99)`
              })]
            })]
          }), (0, $.jsxs)(`div`, {
            className: `pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-slate-400 font-mono`,
            children: [(0, $.jsxs)(`div`, {
              className: `flex items-center gap-1.5`,
              children: [(0, $.jsx)(H, {
                className: `w-4 h-4 text-emerald-400`
              }), (0, $.jsx)(`span`, {
                children: `100m Strict Geofence`
              })]
            }), (0, $.jsxs)(`div`, {
              className: `flex items-center gap-1.5`,
              children: [(0, $.jsx)(H, {
                className: `w-4 h-4 text-emerald-400`
              }), (0, $.jsx)(`span`, {
                children: `Biometric Photo Proof`
              })]
            }), (0, $.jsxs)(`div`, {
              className: `flex items-center gap-1.5`,
              children: [(0, $.jsx)(H, {
                className: `w-4 h-4 text-emerald-400`
              }), (0, $.jsx)(`span`, {
                children: `25KB Compressed JPEGs`
              })]
            }), (0, $.jsxs)(`div`, {
              className: `flex items-center gap-1.5`,
              children: [(0, $.jsx)(H, {
                className: `w-4 h-4 text-emerald-400`
              }), (0, $.jsx)(`span`, {
                children: `14-Day Free Trial Available`
              })]
            })]
          })]
        }), (0, $.jsxs)(`div`, {
          className: `mt-14 relative max-w-5xl mx-auto rounded-3xl border border-[#222938] bg-[#10141E] p-3 sm:p-5 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden`,
          children: [(0, $.jsxs)(`div`, {
            className: `flex items-center justify-between pb-3 border-b border-[#1E2433] text-xs`,
            children: [(0, $.jsxs)(`div`, {
              className: `flex items-center gap-2`,
              children: [(0, $.jsx)(`div`, {
                className: `w-3 h-3 rounded-full bg-red-500/80`
              }), (0, $.jsx)(`div`, {
                className: `w-3 h-3 rounded-full bg-yellow-500/80`
              }), (0, $.jsx)(`div`, {
                className: `w-3 h-3 rounded-full bg-green-500/80`
              }), (0, $.jsx)(`span`, {
                className: `font-mono text-slate-400 ml-2`,
                children: `OpSector Dispatch Command • 35 Trucks Live`
              })]
            }), (0, $.jsxs)(`div`, {
              className: `flex items-center gap-2 font-mono text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-0.5 rounded-full`,
              children: [(0, $.jsx)(`span`, {
                className: `w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse`
              }), (0, $.jsx)(`span`, {
                children: `All Systems Operational`
              })]
            })]
          }), (0, $.jsxs)(`div`, {
            className: `grid grid-cols-1 md:grid-cols-3 gap-4 pt-4`,
            children: [(0, $.jsxs)(`div`, {
              className: `p-4 rounded-xl bg-[#090C12] border border-[#1E2433]`,
              children: [(0, $.jsx)(`div`, {
                className: `text-[11px] font-mono text-slate-400 uppercase tracking-wider`,
                children: `Active Drivers On Duty`
              }), (0, $.jsxs)(`div`, {
                className: `text-2xl font-black text-white mt-1`,
                children: [`28 `, (0, $.jsx)(`span`, {
                  className: `text-xs font-normal text-emerald-400`,
                  children: `/ 35 Verified`
                })]
              }), (0, $.jsxs)(`div`, {
                className: `text-[11px] text-slate-400 mt-2 flex items-center gap-1`,
                children: [(0, $.jsx)(H, {
                  className: `w-3.5 h-3.5 text-emerald-400`
                }), (0, $.jsx)(`span`, {
                  children: `100% inside 100m yard perimeter`
                })]
              })]
            }), (0, $.jsxs)(`div`, {
              className: `p-4 rounded-xl bg-[#090C12] border border-[#1E2433]`,
              children: [(0, $.jsx)(`div`, {
                className: `text-[11px] font-mono text-slate-400 uppercase tracking-wider`,
                children: `Automated Late Detection`
              }), (0, $.jsxs)(`div`, {
                className: `text-2xl font-black text-amber-400 mt-1`,
                children: [`2 `, (0, $.jsx)(`span`, {
                  className: `text-xs font-normal text-slate-400`,
                  children: `Past Grace (15m)`
                })]
              }), (0, $.jsxs)(`div`, {
                className: `text-[11px] text-slate-400 mt-2 flex items-center gap-1`,
                children: [(0, $.jsx)(U, {
                  className: `w-3.5 h-3.5 text-amber-400`
                }), (0, $.jsx)(`span`, {
                  children: `Visual floor alerts triggered`
                })]
              })]
            }), (0, $.jsxs)(`div`, {
              className: `p-4 rounded-xl bg-[#090C12] border border-[#1E2433]`,
              children: [(0, $.jsx)(`div`, {
                className: `text-[11px] font-mono text-slate-400 uppercase tracking-wider`,
                children: `Payroll Leakage Prevented`
              }), (0, $.jsxs)(`div`, {
                className: `text-2xl font-black text-emerald-400 mt-1`,
                children: [`$`, b.toLocaleString(), ` `, (0, $.jsx)(`span`, {
                  className: `text-xs font-normal text-slate-400`,
                  children: `/ mo`
                })]
              }), (0, $.jsxs)(`div`, {
                className: `text-[11px] text-slate-400 mt-2 flex items-center gap-1`,
                children: [(0, $.jsx)(Fe, {
                  className: `w-3.5 h-3.5 text-emerald-400`
                }), (0, $.jsx)(`span`, {
                  children: `Zero buddy punching tolerance`
                })]
              })]
            })]
          })]
        })]
      }), (0, $.jsxs)(`section`, {
        id: `features`,
        className: `py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-[#1E2433]`,
        children: [(0, $.jsxs)(`div`, {
          className: `text-center max-w-2xl mx-auto space-y-3 mb-14`,
          children: [(0, $.jsx)(`div`, {
            className: `text-xs font-mono text-red-400 uppercase tracking-wider`,
            children: `Mission-Critical Architecture`
          }), (0, $.jsx)(`h2`, {
            className: `text-2xl sm:text-4xl font-extrabold text-white`,
            children: `Built Strictly for Fleet Reality, Not Silicon Valley Hype`
          }), (0, $.jsx)(`p`, {
            className: `text-sm text-slate-400`,
            children: `Real logistics fleets cannot afford slow mobile apps that freeze in bad cell service or complex portals drivers refuse to use.`
          })]
        }), (0, $.jsxs)(`div`, {
          className: `grid grid-cols-1 md:grid-cols-3 gap-6`,
          children: [(0, $.jsxs)(`div`, {
            className: `p-6 rounded-2xl border border-[#1E2433] bg-[#10141E] space-y-4`,
            children: [(0, $.jsx)(`div`, {
              className: `w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500`,
              children: (0, $.jsx)(de, {
                className: `w-6 h-6`
              })
            }), (0, $.jsx)(`h3`, {
              className: `text-base font-bold text-white`,
              children: `Strict 100m Yard Perimeter`
            }), (0, $.jsx)(`p`, {
              className: `text-xs text-slate-400 leading-relaxed`,
              children: `High-accuracy Haversine formula calculation blocks check-ins if the driver is outside the facility gate. No spoofing, no checking in from home.`
            })]
          }), (0, $.jsxs)(`div`, {
            className: `p-6 rounded-2xl border border-[#1E2433] bg-[#10141E] space-y-4`,
            children: [(0, $.jsx)(`div`, {
              className: `w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400`,
              children: (0, $.jsx)(F, {
                className: `w-6 h-6`
              })
            }), (0, $.jsx)(`h3`, {
              className: `text-base font-bold text-white`,
              children: `Live Camera Selfie Proof`
            }), (0, $.jsx)(`p`, {
              className: `text-xs text-slate-400 leading-relaxed`,
              children: `Direct rear/front camera capture with gallery upload prevention. Photos are downscaled to 25KB WebP/JPEG to prevent bandwidth spikes and storage egress.`
            })]
          }), (0, $.jsxs)(`div`, {
            className: `p-6 rounded-2xl border border-[#1E2433] bg-[#10141E] space-y-4`,
            children: [(0, $.jsx)(`div`, {
              className: `w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400`,
              children: (0, $.jsx)(U, {
                className: `w-6 h-6`
              })
            }), (0, $.jsx)(`h3`, {
              className: `text-base font-bold text-white`,
              children: `Military Overnight Rollovers`
            }), (0, $.jsx)(`p`, {
              className: `text-xs text-slate-400 leading-relaxed`,
              children: `Native handling of overnight shifts spanning midnight (e.g. 16:00 to 02:00 next day). Grace periods and automatic late flags without manual dispatcher math.`
            })]
          }), (0, $.jsxs)(`div`, {
            className: `p-6 rounded-2xl border border-[#1E2433] bg-[#10141E] space-y-4`,
            children: [(0, $.jsx)(`div`, {
              className: `w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400`,
              children: (0, $.jsx)(K, {
                className: `w-6 h-6`
              })
            }), (0, $.jsx)(`h3`, {
              className: `text-base font-bold text-white`,
              children: `Styled Excel (.xlsx) Export`
            }), (0, $.jsx)(`p`, {
              className: `text-xs text-slate-400 leading-relaxed`,
              children: `Export weekly attendance plans directly into formatted spreadsheets with color-coded status backgrounds, exact Uzbekistan check-in timestamps, and dynamic summary formulas.`
            })]
          }), (0, $.jsxs)(`div`, {
            className: `p-6 rounded-2xl border border-[#1E2433] bg-[#10141E] space-y-4`,
            children: [(0, $.jsx)(`div`, {
              className: `w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400`,
              children: (0, $.jsx)(fe, {
                className: `w-6 h-6`
              })
            }), (0, $.jsx)(`h3`, {
              className: `text-base font-bold text-white`,
              children: `85-Inch Dispatch TV Mode`
            }), (0, $.jsx)(`p`, {
              className: `text-xs text-slate-400 leading-relaxed`,
              children: `Engineered specifically for wall-mounted command center televisions. High contrast, large legibility typography, and real-time red flashing alerts for un-checked working drivers.`
            })]
          }), (0, $.jsxs)(`div`, {
            className: `p-6 rounded-2xl border border-[#1E2433] bg-[#10141E] space-y-4`,
            children: [(0, $.jsx)(`div`, {
              className: `w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400`,
              children: (0, $.jsx)(Z, {
                className: `w-6 h-6`
              })
            }), (0, $.jsx)(`h3`, {
              className: `text-base font-bold text-white`,
              children: `Audit-Proof Payroll Vault`
            }), (0, $.jsx)(`p`, {
              className: `text-xs text-slate-400 leading-relaxed`,
              children: `Once shifts close, attendance logs lock into historical records. Tamper-evident architecture guarantees peace of mind during labor audits.`
            })]
          })]
        })]
      }), (0, $.jsxs)(`section`, {
        id: `how-it-works`,
        className: `py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-[#1E2433]`,
        children: [(0, $.jsxs)(`div`, {
          className: `text-center max-w-2xl mx-auto space-y-3 mb-14`,
          children: [(0, $.jsx)(`div`, {
            className: `text-xs font-mono text-emerald-400 uppercase tracking-wider`,
            children: `Zero Driver Friction`
          }), (0, $.jsx)(`h2`, {
            className: `text-2xl sm:text-4xl font-extrabold text-white`,
            children: `From Arrival to Verified Shift in 3 Seconds`
          }), (0, $.jsx)(`p`, {
            className: `text-sm text-slate-400`,
            children: `No username passwords forgotten, no app updates required, no battery draining background GPS.`
          })]
        }), (0, $.jsxs)(`div`, {
          className: `grid grid-cols-1 md:grid-cols-4 gap-4`,
          children: [(0, $.jsxs)(`div`, {
            className: `p-5 rounded-2xl border border-[#1E2433] bg-[#10141E] relative`,
            children: [(0, $.jsx)(`div`, {
              className: `text-3xl font-mono font-black text-slate-700 mb-2`,
              children: `01`
            }), (0, $.jsx)(`h4`, {
              className: `text-sm font-bold text-white`,
              children: `Driver Pulls Into Yard`
            }), (0, $.jsx)(`p`, {
              className: `text-xs text-slate-400 mt-1`,
              children: `Driver arrives at designated dispatch terminal or terminal yard.`
            })]
          }), (0, $.jsxs)(`div`, {
            className: `p-5 rounded-2xl border border-[#1E2433] bg-[#10141E] relative`,
            children: [(0, $.jsx)(`div`, {
              className: `text-3xl font-mono font-black text-slate-700 mb-2`,
              children: `02`
            }), (0, $.jsx)(`h4`, {
              className: `text-sm font-bold text-white`,
              children: `Taps Check-In in Telegram`
            }), (0, $.jsx)(`p`, {
              className: `text-xs text-slate-400 mt-1`,
              children: `Opens the fleet bot in Telegram. Instantly opens the verified mini app.`
            })]
          }), (0, $.jsxs)(`div`, {
            className: `p-5 rounded-2xl border border-[#1E2433] bg-[#10141E] relative`,
            children: [(0, $.jsx)(`div`, {
              className: `text-3xl font-mono font-black text-slate-700 mb-2`,
              children: `03`
            }), (0, $.jsx)(`h4`, {
              className: `text-sm font-bold text-white`,
              children: `Snaps Selfie Proof`
            }), (0, $.jsx)(`p`, {
              className: `text-xs text-slate-400 mt-1`,
              children: `Single tap takes photo & validates 100m satellite yard proximity.`
            })]
          }), (0, $.jsxs)(`div`, {
            className: `p-5 rounded-2xl border border-[#1E2433] bg-[#10141E] relative`,
            children: [(0, $.jsx)(`div`, {
              className: `text-3xl font-mono font-black text-red-500/80 mb-2`,
              children: `04`
            }), (0, $.jsx)(`h4`, {
              className: `text-sm font-bold text-white`,
              children: `TV Updates In Real-Time`
            }), (0, $.jsx)(`p`, {
              className: `text-xs text-slate-400 mt-1`,
              children: `Dispatch TV updates immediately with green on-duty pill and exact timestamp.`
            })]
          })]
        })]
      }), (0, $.jsxs)(`section`, {
        id: `pricing`,
        className: `py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-[#1E2433]`,
        children: [(0, $.jsxs)(`div`, {
          className: `text-center max-w-3xl mx-auto space-y-4 mb-12`,
          children: [(0, $.jsxs)(`div`, {
            className: `inline-flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3.5 py-1 rounded-full`,
            children: [(0, $.jsx)(M, {
              className: `w-3.5 h-3.5 text-emerald-400`
            }), (0, $.jsx)(`span`, {
              children: `Transparent Per-User Pricing • 14-Day Free Trial`
            })]
          }), (0, $.jsx)(`h2`, {
            className: `text-3xl sm:text-5xl font-black text-white tracking-tight`,
            children: `Predictable Fleet Pricing That Scales With You`
          }), (0, $.jsx)(`p`, {
            className: `text-sm sm:text-base text-slate-300`,
            children: `No hidden setup fees, no per-truck hardware leases. Start with our popular Fleet Pro plan and enjoy a full 14-day free trial.`
          }), (0, $.jsxs)(`div`, {
            className: `pt-4 flex items-center justify-center gap-3`,
            children: [(0, $.jsx)(`span`, {
              className: `text-xs font-semibold ${n===`monthly`?`text-white`:`text-slate-400`}`,
              children: `Monthly`
            }), (0, $.jsx)(`button`, {
              onClick: () => r(n === `monthly` ? `annual` : `monthly`),
              className: `w-12 h-6 rounded-full transition-colors p-1 cursor-pointer relative ${n===`annual`?`bg-[#E51E2B]`:`bg-[#1E2433]`}`,
              children: (0, $.jsx)(`div`, {
                className: `w-4 h-4 rounded-full bg-white transition-transform ${n===`annual`?`translate-x-6`:`translate-x-0`}`
              })
            }), (0, $.jsxs)(`span`, {
              className: `text-xs font-semibold flex items-center gap-1.5 ${n===`annual`?`text-white`:`text-slate-400`}`,
              children: [(0, $.jsx)(`span`, {
                children: `Annual`
              }), (0, $.jsx)(`span`, {
                className: `text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full`,
                children: `Save 17% (2 Mo Free)`
              })]
            })]
          })]
        }), (0, $.jsxs)(`div`, {
          className: `grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch`,
          children: [(0, $.jsxs)(`div`, {
            className: `p-7 rounded-3xl border border-[#1E2433] bg-[#10141E] flex flex-col justify-between space-y-6`,
            children: [(0, $.jsxs)(`div`, {
              className: `space-y-5`,
              children: [(0, $.jsxs)(`div`, {
                children: [(0, $.jsx)(`span`, {
                  className: `text-xs font-mono font-bold text-slate-400 uppercase tracking-wider`,
                  children: `Tier 1 • Core Fleet`
                }), (0, $.jsx)(`h3`, {
                  className: `text-xl font-bold text-white mt-1`,
                  children: `Starter Dispatch`
                }), (0, $.jsx)(`p`, {
                  className: `text-xs text-slate-400 mt-1`,
                  children: `Essential geofenced mobile check-ins and basic attendance logging for small fleets.`
                })]
              }), (0, $.jsxs)(`div`, {
                className: `pt-2 border-t border-[#1E2433]`,
                children: [(0, $.jsxs)(`div`, {
                  className: `flex items-baseline gap-1`,
                  children: [(0, $.jsxs)(`span`, {
                    className: `text-4xl font-mono font-black text-white`,
                    children: [`$`, n === `annual` ? `5.82` : `6.99`]
                  }), (0, $.jsx)(`span`, {
                    className: `text-xs text-slate-400`,
                    children: `/ user / mo`
                  })]
                }), (0, $.jsxs)(`div`, {
                  className: `text-[11px] text-slate-500 font-mono mt-1`,
                  children: [`For 35 users: $`, g.toLocaleString(), ` / mo`]
                })]
              }), (0, $.jsxs)(`div`, {
                className: `space-y-2.5 pt-2`,
                children: [(0, $.jsx)(`div`, {
                  className: `text-xs font-bold text-slate-300`,
                  children: `Included Core Features:`
                }), (0, $.jsxs)(`ul`, {
                  className: `space-y-2 text-xs text-slate-300`,
                  children: [(0, $.jsxs)(`li`, {
                    className: `flex items-start gap-2`,
                    children: [(0, $.jsx)(H, {
                      className: `w-4 h-4 text-emerald-400 shrink-0 mt-0.5`
                    }), (0, $.jsxs)(`span`, {
                      children: [(0, $.jsx)(`strong`, {
                        children: `100m Geofence`
                      }), ` strict GPS yard perimeter verification`]
                    })]
                  }), (0, $.jsxs)(`li`, {
                    className: `flex items-start gap-2`,
                    children: [(0, $.jsx)(H, {
                      className: `w-4 h-4 text-emerald-400 shrink-0 mt-0.5`
                    }), (0, $.jsxs)(`span`, {
                      children: [(0, $.jsx)(`strong`, {
                        children: `Biometric Selfie Capture`
                      }), ` with camera locking`]
                    })]
                  }), (0, $.jsxs)(`li`, {
                    className: `flex items-start gap-2`,
                    children: [(0, $.jsx)(H, {
                      className: `w-4 h-4 text-emerald-400 shrink-0 mt-0.5`
                    }), (0, $.jsxs)(`span`, {
                      children: [(0, $.jsx)(`strong`, {
                        children: `25KB Ultra-Compressed JPEGs`
                      }), ` (zero data egress costs)`]
                    })]
                  }), (0, $.jsxs)(`li`, {
                    className: `flex items-start gap-2`,
                    children: [(0, $.jsx)(H, {
                      className: `w-4 h-4 text-emerald-400 shrink-0 mt-0.5`
                    }), (0, $.jsxs)(`span`, {
                      children: [(0, $.jsx)(`strong`, {
                        children: `Telegram Mini App`
                      }), ` (zero App Store friction for drivers)`]
                    })]
                  }), (0, $.jsxs)(`li`, {
                    className: `flex items-start gap-2`,
                    children: [(0, $.jsx)(H, {
                      className: `w-4 h-4 text-emerald-400 shrink-0 mt-0.5`
                    }), (0, $.jsx)(`span`, {
                      children: `Single yard / terminal dispatch perimeter`
                    })]
                  }), (0, $.jsxs)(`li`, {
                    className: `flex items-start gap-2`,
                    children: [(0, $.jsx)(H, {
                      className: `w-4 h-4 text-emerald-400 shrink-0 mt-0.5`
                    }), (0, $.jsx)(`span`, {
                      children: `Standard email support (24hr response)`
                    })]
                  })]
                })]
              })]
            }), (0, $.jsx)(`button`, {
              onClick: () => S(`Starter Dispatch ($6.99/user)`),
              className: `w-full py-3 rounded-xl border border-[#262C3A] bg-[#121622] hover:bg-[#1A2030] text-xs font-bold text-white transition-all cursor-pointer`,
              children: `Get Started with Core`
            })]
          }), (0, $.jsxs)(`div`, {
            className: `p-7 rounded-3xl border-2 border-red-500 bg-[#121622] flex flex-col justify-between space-y-6 relative shadow-2xl shadow-red-500/15`,
            children: [(0, $.jsxs)(`div`, {
              className: `absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#E51E2B] text-white text-[11px] font-extrabold px-4 py-1 rounded-full uppercase tracking-wider shadow-lg flex items-center gap-1.5 whitespace-nowrap`,
              children: [(0, $.jsx)(Ue, {
                className: `w-3.5 h-3.5 text-yellow-300`
              }), (0, $.jsx)(`span`, {
                children: `14 Days Free Trial • Most Popular`
              })]
            }), (0, $.jsxs)(`div`, {
              className: `space-y-5`,
              children: [(0, $.jsxs)(`div`, {
                children: [(0, $.jsx)(`span`, {
                  className: `text-xs font-mono font-bold text-red-400 uppercase tracking-wider`,
                  children: `Tier 2 • Active Fleet Operations`
                }), (0, $.jsx)(`h3`, {
                  className: `text-xl font-bold text-white mt-1`,
                  children: `Fleet Pro & Live Ops`
                }), (0, $.jsx)(`p`, {
                  className: `text-xs text-slate-400 mt-1`,
                  children: `Full command center operations with live photo feed, military shifts, and Excel plan exports.`
                })]
              }), (0, $.jsxs)(`div`, {
                className: `pt-2 border-t border-slate-700/60`,
                children: [(0, $.jsxs)(`div`, {
                  className: `flex items-baseline gap-1`,
                  children: [(0, $.jsxs)(`span`, {
                    className: `text-4xl font-mono font-black text-white`,
                    children: [`$`, n === `annual` ? `8.32` : `9.99`]
                  }), (0, $.jsx)(`span`, {
                    className: `text-xs text-slate-400`,
                    children: `/ user / mo`
                  })]
                }), (0, $.jsx)(`div`, {
                  className: `text-[11px] text-emerald-400 font-mono mt-1 font-bold`,
                  children: `14 Days 100% Free Trial ($0 Due Today)`
                }), (0, $.jsxs)(`div`, {
                  className: `text-[11px] text-slate-400 font-mono`,
                  children: [`For 35 users: $`, _.toLocaleString(), ` / mo after trial`]
                })]
              }), (0, $.jsxs)(`div`, {
                className: `space-y-2.5 pt-2`,
                children: [(0, $.jsxs)(`div`, {
                  className: `text-xs font-bold text-white flex items-center gap-1`,
                  children: [(0, $.jsx)(Oe, {
                    className: `w-3.5 h-3.5 text-yellow-400`
                  }), (0, $.jsx)(`span`, {
                    children: `Everything in Starter ($6.99), PLUS:`
                  })]
                }), (0, $.jsxs)(`ul`, {
                  className: `space-y-2 text-xs text-slate-200`,
                  children: [(0, $.jsxs)(`li`, {
                    className: `flex items-start gap-2`,
                    children: [(0, $.jsx)(H, {
                      className: `w-4 h-4 text-emerald-400 shrink-0 mt-0.5`
                    }), (0, $.jsxs)(`span`, {
                      children: [(0, $.jsx)(`strong`, {
                        children: `14-Day Full Access Free Trial`
                      }), ` (no upfront commitment)`]
                    })]
                  }), (0, $.jsxs)(`li`, {
                    className: `flex items-start gap-2`,
                    children: [(0, $.jsx)(H, {
                      className: `w-4 h-4 text-emerald-400 shrink-0 mt-0.5`
                    }), (0, $.jsxs)(`span`, {
                      children: [(0, $.jsx)(`strong`, {
                        children: `Live Daily Check-Ins Feed`
                      }), ` with photo inspector thumbnails`]
                    })]
                  }), (0, $.jsxs)(`li`, {
                    className: `flex items-start gap-2`,
                    children: [(0, $.jsx)(H, {
                      className: `w-4 h-4 text-emerald-400 shrink-0 mt-0.5`
                    }), (0, $.jsxs)(`span`, {
                      children: [(0, $.jsx)(`strong`, {
                        children: `Military-Time Overnight Shift Rollover`
                      }), ` (e.g. 16:00 – 02:00)`]
                    })]
                  }), (0, $.jsxs)(`li`, {
                    className: `flex items-start gap-2`,
                    children: [(0, $.jsx)(H, {
                      className: `w-4 h-4 text-emerald-400 shrink-0 mt-0.5`
                    }), (0, $.jsxs)(`span`, {
                      children: [(0, $.jsx)(`strong`, {
                        children: `Automated 15-Minute Late Detection`
                      }), ` & floor alerts`]
                    })]
                  }), (0, $.jsxs)(`li`, {
                    className: `flex items-start gap-2`,
                    children: [(0, $.jsx)(H, {
                      className: `w-4 h-4 text-emerald-400 shrink-0 mt-0.5`
                    }), (0, $.jsxs)(`span`, {
                      children: [(0, $.jsx)(`strong`, {
                        children: `Styled Excel (.xlsx) Export`
                      }), ` with custom formulas & colors`]
                    })]
                  }), (0, $.jsxs)(`li`, {
                    className: `flex items-start gap-2`,
                    children: [(0, $.jsx)(H, {
                      className: `w-4 h-4 text-emerald-400 shrink-0 mt-0.5`
                    }), (0, $.jsxs)(`span`, {
                      children: [(0, $.jsx)(`strong`, {
                        children: `Daily Attendance Notes`
                      }), ` & dispatch exception tagging`]
                    })]
                  }), (0, $.jsxs)(`li`, {
                    className: `flex items-start gap-2`,
                    children: [(0, $.jsx)(H, {
                      className: `w-4 h-4 text-emerald-400 shrink-0 mt-0.5`
                    }), (0, $.jsxs)(`span`, {
                      children: [(0, $.jsx)(`strong`, {
                        children: `Pulsing "ON DUTY" Monitor`
                      }), ` with active elapsed shift timer`]
                    })]
                  }), (0, $.jsxs)(`li`, {
                    className: `flex items-start gap-2`,
                    children: [(0, $.jsx)(H, {
                      className: `w-4 h-4 text-emerald-400 shrink-0 mt-0.5`
                    }), (0, $.jsx)(`span`, {
                      children: `Multi-yard & remote driver dispatch capability`
                    })]
                  }), (0, $.jsxs)(`li`, {
                    className: `flex items-start gap-2`,
                    children: [(0, $.jsx)(H, {
                      className: `w-4 h-4 text-emerald-400 shrink-0 mt-0.5`
                    }), (0, $.jsx)(`span`, {
                      children: `Priority chat & email support (<1 hour turnaround)`
                    })]
                  })]
                })]
              })]
            }), (0, $.jsxs)(`button`, {
              onClick: () => S(`Fleet Pro ($9.99/user) - 14-Day Free Trial`),
              className: `w-full py-3.5 rounded-xl bg-[#E51E2B] hover:bg-red-600 text-xs font-extrabold text-white shadow-xl shadow-red-500/30 transition-all cursor-pointer flex items-center justify-center gap-1.5`,
              children: [(0, $.jsx)(`span`, {
                children: `Start 14-Day Free Trial`
              }), (0, $.jsx)(j, {
                className: `w-4 h-4`
              })]
            })]
          }), (0, $.jsxs)(`div`, {
            className: `p-7 rounded-3xl border border-amber-500/40 bg-gradient-to-b from-[#14120E] to-[#10141E] flex flex-col justify-between space-y-6 relative shadow-xl shadow-amber-500/5`,
            children: [(0, $.jsxs)(`div`, {
              className: `space-y-5`,
              children: [(0, $.jsxs)(`div`, {
                className: `flex items-center justify-between`,
                children: [(0, $.jsxs)(`div`, {
                  children: [(0, $.jsx)(`span`, {
                    className: `text-xs font-mono font-bold text-amber-400 uppercase tracking-wider`,
                    children: `Tier 3 • Full-Service Operations`
                  }), (0, $.jsx)(`h3`, {
                    className: `text-xl font-bold text-white mt-1`,
                    children: `Enterprise Command`
                  })]
                }), (0, $.jsx)(`div`, {
                  className: `text-[10px] font-bold text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2.5 py-0.5 rounded-full uppercase tracking-wider`,
                  children: `The Best Option`
                })]
              }), (0, $.jsx)(`p`, {
                className: `text-xs text-slate-300 leading-relaxed`,
                children: `The undisputed premier solution for 24/7 mission-critical operations. Includes custom engineering on demand, 24/7 VIP support, and full telematics integration.`
              }), (0, $.jsxs)(`div`, {
                className: `pt-2 border-t border-slate-700/60`,
                children: [(0, $.jsxs)(`div`, {
                  className: `flex items-baseline gap-1`,
                  children: [(0, $.jsxs)(`span`, {
                    className: `text-4xl font-mono font-black text-amber-300`,
                    children: [`$`, n === `annual` ? `14.15` : `16.99`]
                  }), (0, $.jsx)(`span`, {
                    className: `text-xs text-slate-400`,
                    children: `/ user / mo`
                  })]
                }), (0, $.jsx)(`div`, {
                  className: `text-[11px] text-amber-400/90 font-mono mt-1 font-semibold`,
                  children: `Complete white-glove engineering co-pilot included`
                }), (0, $.jsxs)(`div`, {
                  className: `text-[11px] text-slate-400 font-mono`,
                  children: [`For 35 users: $`, v.toLocaleString(), ` / mo`]
                })]
              }), (0, $.jsxs)(`div`, {
                className: `space-y-2.5 pt-2`,
                children: [(0, $.jsxs)(`div`, {
                  className: `text-xs font-bold text-amber-300 flex items-center gap-1`,
                  children: [(0, $.jsx)(M, {
                    className: `w-3.5 h-3.5 text-amber-400`
                  }), (0, $.jsx)(`span`, {
                    children: `Everything in Starter & Pro ($9.99), PLUS:`
                  })]
                }), (0, $.jsxs)(`ul`, {
                  className: `space-y-2 text-xs text-slate-200`,
                  children: [(0, $.jsxs)(`li`, {
                    className: `flex items-start gap-2`,
                    children: [(0, $.jsx)(H, {
                      className: `w-4 h-4 text-amber-400 shrink-0 mt-0.5`
                    }), (0, $.jsxs)(`span`, {
                      children: [(0, $.jsx)(`strong`, {
                        children: `Custom Tailored Features`
                      }), `: Bespoke TMS/ERP workflows coded specifically for your fleet`]
                    })]
                  }), (0, $.jsxs)(`li`, {
                    className: `flex items-start gap-2`,
                    children: [(0, $.jsx)(H, {
                      className: `w-4 h-4 text-amber-400 shrink-0 mt-0.5`
                    }), (0, $.jsxs)(`span`, {
                      children: [(0, $.jsx)(`strong`, {
                        children: `24/7/365 Dedicated Senior Operations Account Manager`
                      }), ` with VIP phone hotline`]
                    })]
                  }), (0, $.jsxs)(`li`, {
                    className: `flex items-start gap-2`,
                    children: [(0, $.jsx)(H, {
                      className: `w-4 h-4 text-amber-400 shrink-0 mt-0.5`
                    }), (0, $.jsxs)(`span`, {
                      children: [(0, $.jsx)(`strong`, {
                        children: `Samsara & ELD Telematics Real-Time Integration`
                      }), ` for truck location sync`]
                    })]
                  }), (0, $.jsxs)(`li`, {
                    className: `flex items-start gap-2`,
                    children: [(0, $.jsx)(H, {
                      className: `w-4 h-4 text-amber-400 shrink-0 mt-0.5`
                    }), (0, $.jsxs)(`span`, {
                      children: [(0, $.jsx)(`strong`, {
                        children: `Automated Google Sheets Bidirectional Live Sync`
                      }), ` directly to your company tabs`]
                    })]
                  }), (0, $.jsxs)(`li`, {
                    className: `flex items-start gap-2`,
                    children: [(0, $.jsx)(H, {
                      className: `w-4 h-4 text-amber-400 shrink-0 mt-0.5`
                    }), (0, $.jsxs)(`span`, {
                      children: [(0, $.jsx)(`strong`, {
                        children: `Dedicated 85-inch Dispatch TV Displays`
                      }), ` optimized for floor visibility`]
                    })]
                  }), (0, $.jsxs)(`li`, {
                    className: `flex items-start gap-2`,
                    children: [(0, $.jsx)(H, {
                      className: `w-4 h-4 text-amber-400 shrink-0 mt-0.5`
                    }), (0, $.jsxs)(`span`, {
                      children: [(0, $.jsx)(`strong`, {
                        children: `99.99% Enterprise Uptime SLA`
                      }), ` with guaranteed 15-minute response`]
                    })]
                  }), (0, $.jsxs)(`li`, {
                    className: `flex items-start gap-2`,
                    children: [(0, $.jsx)(H, {
                      className: `w-4 h-4 text-amber-400 shrink-0 mt-0.5`
                    }), (0, $.jsxs)(`span`, {
                      children: [(0, $.jsx)(`strong`, {
                        children: `White-Label Custom Branding`
                      }), ` (your logo, company styling)`]
                    })]
                  }), (0, $.jsxs)(`li`, {
                    className: `flex items-start gap-2`,
                    children: [(0, $.jsx)(H, {
                      className: `w-4 h-4 text-amber-400 shrink-0 mt-0.5`
                    }), (0, $.jsxs)(`span`, {
                      children: [(0, $.jsx)(`strong`, {
                        children: `Free Onboarding & Driver Training`
                      }), ` conducted by logistics specialists`]
                    })]
                  })]
                })]
              })]
            }), (0, $.jsxs)(`button`, {
              onClick: () => S(`Enterprise Command ($16.99/user) - The Best Option`),
              className: `w-full py-3.5 rounded-xl border border-amber-500/50 bg-amber-500 hover:bg-amber-400 text-xs font-black text-slate-950 shadow-xl shadow-amber-500/20 transition-all cursor-pointer flex items-center justify-center gap-1.5`,
              children: [(0, $.jsx)(M, {
                className: `w-4 h-4`
              }), (0, $.jsx)(`span`, {
                children: `Contact Enterprise Sales`
              })]
            })]
          })]
        })]
      }), (0, $.jsx)(`section`, {
        id: `calculator`,
        className: `py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-[#1E2433]`,
        children: (0, $.jsxs)(`div`, {
          className: `max-w-4xl mx-auto rounded-3xl border border-[#222938] bg-[#10141E] p-6 sm:p-10 shadow-2xl`,
          children: [(0, $.jsxs)(`div`, {
            className: `flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#1E2433]`,
            children: [(0, $.jsxs)(`div`, {
              children: [(0, $.jsx)(`div`, {
                className: `text-xs font-mono text-red-400 uppercase tracking-wider`,
                children: `Interactive Math Breakdown`
              }), (0, $.jsx)(`h3`, {
                className: `text-xl sm:text-2xl font-black text-white mt-1`,
                children: `Calculate Exact Investment for Your Fleet Size`
              }), (0, $.jsx)(`p`, {
                className: `text-xs text-slate-400 mt-1`,
                children: `See exactly how much you invest and how much payroll leakage you prevent every month.`
              })]
            }), (0, $.jsxs)(`div`, {
              className: `p-3 rounded-2xl bg-[#090C12] border border-[#1E2433] text-center min-w-[150px]`,
              children: [(0, $.jsx)(`div`, {
                className: `text-[10px] font-mono text-slate-400 uppercase`,
                children: `Selected Fleet Size`
              }), (0, $.jsxs)(`div`, {
                className: `text-3xl font-black text-white mt-0.5`,
                children: [e, ` `, (0, $.jsx)(`span`, {
                  className: `text-xs font-normal text-slate-400`,
                  children: `Users`
                })]
              })]
            })]
          }), (0, $.jsxs)(`div`, {
            className: `pt-8 space-y-8`,
            children: [(0, $.jsxs)(`div`, {
              className: `space-y-3`,
              children: [(0, $.jsxs)(`div`, {
                className: `flex justify-between text-xs font-semibold`,
                children: [(0, $.jsx)(`span`, {
                  className: `text-slate-300`,
                  children: `Drag to adjust total drivers & dispatchers:`
                }), (0, $.jsxs)(`span`, {
                  className: `font-mono text-red-400 font-bold`,
                  children: [e, ` Active Personnel`]
                })]
              }), (0, $.jsx)(`input`, {
                type: `range`,
                min: 5,
                max: 150,
                step: 1,
                value: e,
                onChange: e => t(Number(e.target.value)),
                className: `w-full h-2 bg-[#1A202C] rounded-lg appearance-none cursor-pointer accent-[#E51E2B]`
              }), (0, $.jsxs)(`div`, {
                className: `flex justify-between text-[11px] font-mono text-slate-500`,
                children: [(0, $.jsx)(`span`, {
                  children: `5 Users`
                }), (0, $.jsx)(`span`, {
                  children: `35 Users (Standard Fleet)`
                }), (0, $.jsx)(`span`, {
                  children: `75 Users`
                }), (0, $.jsx)(`span`, {
                  children: `150 Users`
                })]
              })]
            }), (0, $.jsxs)(`div`, {
              className: `grid grid-cols-1 md:grid-cols-3 gap-4`,
              children: [(0, $.jsxs)(`div`, {
                className: `p-4 rounded-2xl bg-[#090C12] border border-[#1E2433] space-y-2`,
                children: [(0, $.jsx)(`div`, {
                  className: `text-xs font-bold text-slate-300`,
                  children: `Starter Dispatch`
                }), (0, $.jsxs)(`div`, {
                  className: `text-[11px] font-mono text-slate-400`,
                  children: [e, ` users × $`, f, `/mo`]
                }), (0, $.jsxs)(`div`, {
                  className: `text-2xl font-black font-mono text-white pt-1`,
                  children: [`$`, g.toLocaleString(), ` `, (0, $.jsx)(`span`, {
                    className: `text-xs font-normal text-slate-400`,
                    children: `/ mo`
                  })]
                }), (0, $.jsxs)(`div`, {
                  className: `text-[11px] text-slate-500`,
                  children: [`$`, Math.round(g * 12).toLocaleString(), ` / year`]
                }), (0, $.jsx)(`button`, {
                  onClick: () => S(`Starter Dispatch ($6.99) - ${e} Users`),
                  className: `w-full mt-2 py-2 rounded-xl border border-slate-700 hover:bg-slate-800 text-xs font-bold text-slate-300 transition-colors cursor-pointer`,
                  children: `Choose Starter`
                })]
              }), (0, $.jsxs)(`div`, {
                className: `p-4 rounded-2xl bg-[#131722] border-2 border-red-500/60 space-y-2 relative`,
                children: [(0, $.jsx)(`div`, {
                  className: `absolute -top-2.5 right-3 bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase`,
                  children: `14-Day Free Trial`
                }), (0, $.jsx)(`div`, {
                  className: `text-xs font-bold text-white`,
                  children: `Fleet Pro & Live Ops`
                }), (0, $.jsxs)(`div`, {
                  className: `text-[11px] font-mono text-slate-400`,
                  children: [e, ` users × $`, p, `/mo`]
                }), (0, $.jsxs)(`div`, {
                  className: `text-2xl font-black font-mono text-emerald-400 pt-1`,
                  children: [`$`, _.toLocaleString(), ` `, (0, $.jsx)(`span`, {
                    className: `text-xs font-normal text-slate-400`,
                    children: `/ mo`
                  })]
                }), (0, $.jsx)(`div`, {
                  className: `text-[11px] text-emerald-400/80 font-bold`,
                  children: `First 14 Days $0.00 Free`
                }), (0, $.jsx)(`button`, {
                  onClick: () => S(`Fleet Pro ($9.99) - ${e} Users (14-Day Free Trial)`),
                  className: `w-full mt-2 py-2 rounded-xl bg-[#E51E2B] hover:bg-red-600 text-xs font-bold text-white transition-colors cursor-pointer`,
                  children: `Start 14-Day Trial`
                })]
              }), (0, $.jsxs)(`div`, {
                className: `p-4 rounded-2xl bg-[#14120E] border border-amber-500/40 space-y-2`,
                children: [(0, $.jsx)(`div`, {
                  className: `text-xs font-bold text-amber-300`,
                  children: `Enterprise Command`
                }), (0, $.jsxs)(`div`, {
                  className: `text-[11px] font-mono text-slate-400`,
                  children: [e, ` users × $`, m, `/mo`]
                }), (0, $.jsxs)(`div`, {
                  className: `text-2xl font-black font-mono text-amber-300 pt-1`,
                  children: [`$`, v.toLocaleString(), ` `, (0, $.jsx)(`span`, {
                    className: `text-xs font-normal text-slate-400`,
                    children: `/ mo`
                  })]
                }), (0, $.jsx)(`div`, {
                  className: `text-[11px] text-amber-400/80`,
                  children: `Includes 24/7 dedicated support & custom code`
                }), (0, $.jsx)(`button`, {
                  onClick: () => S(`Enterprise Command ($16.99) - ${e} Users`),
                  className: `w-full mt-2 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors cursor-pointer`,
                  children: `Contact Enterprise`
                })]
              })]
            }), (0, $.jsxs)(`div`, {
              className: `p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4`,
              children: [(0, $.jsxs)(`div`, {
                className: `flex items-center gap-3`,
                children: [(0, $.jsx)(`div`, {
                  className: `p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0`,
                  children: (0, $.jsx)(Fe, {
                    className: `w-5 h-5`
                  })
                }), (0, $.jsxs)(`div`, {
                  children: [(0, $.jsx)(`div`, {
                    className: `text-xs font-bold text-emerald-300`,
                    children: `Estimated Stolen Payroll Eliminated`
                  }), (0, $.jsx)(`div`, {
                    className: `text-[11px] text-slate-400`,
                    children: `Based on 18 minutes unverified idle/late time prevented per driver per shift @ $22/hr.`
                  })]
                })]
              }), (0, $.jsxs)(`div`, {
                className: `text-right shrink-0`,
                children: [(0, $.jsxs)(`div`, {
                  className: `text-xl font-mono font-black text-emerald-400`,
                  children: [`+$`, x.toLocaleString()]
                }), (0, $.jsx)(`div`, {
                  className: `text-[10px] text-slate-400 font-mono`,
                  children: `Annual Net Savings`
                })]
              })]
            })]
          })]
        })
      }), (0, $.jsxs)(`section`, {
        id: `faq`,
        className: `py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full border-t border-[#1E2433]`,
        children: [(0, $.jsxs)(`div`, {
          className: `text-center space-y-3 mb-12`,
          children: [(0, $.jsx)(`div`, {
            className: `text-xs font-mono text-red-400 uppercase tracking-wider`,
            children: `Frequently Asked Questions`
          }), (0, $.jsx)(`h2`, {
            className: `text-2xl sm:text-3xl font-extrabold text-white`,
            children: `Common Questions From Fleet Operations Directors`
          })]
        }), (0, $.jsxs)(`div`, {
          className: `space-y-4`,
          children: [(0, $.jsxs)(`div`, {
            className: `p-5 rounded-2xl border border-[#1E2433] bg-[#10141E] space-y-2`,
            children: [(0, $.jsx)(`h4`, {
              className: `text-sm font-bold text-white`,
              children: `How does the 14-day free trial on the $9.99 plan work?`
            }), (0, $.jsx)(`p`, {
              className: `text-xs text-slate-400 leading-relaxed`,
              children: `When you choose our Fleet Pro plan, you get 14 days of full, unconstrained access to test with your drivers and dispatchers. No credit card is charged upfront. If it doesn't eliminate your attendance headaches, you cancel with zero obligation.`
            })]
          }), (0, $.jsxs)(`div`, {
            className: `p-5 rounded-2xl border border-[#1E2433] bg-[#10141E] space-y-2`,
            children: [(0, $.jsx)(`h4`, {
              className: `text-sm font-bold text-white`,
              children: `Do drivers have to download a native app from the App Store?`
            }), (0, $.jsx)(`p`, {
              className: `text-xs text-slate-400 leading-relaxed`,
              children: `No. Drivers check in through a verified Telegram Mini App. They tap a single button, verify their 100m GPS perimeter, snap their selfie, and are done in under 3 seconds. It works on any iPhone or Android device instantly.`
            })]
          }), (0, $.jsxs)(`div`, {
            className: `p-5 rounded-2xl border border-[#1E2433] bg-[#10141E] space-y-2`,
            children: [(0, $.jsx)(`h4`, {
              className: `text-sm font-bold text-white`,
              children: `What makes the $16.99 Enterprise Command plan the best option?`
            }), (0, $.jsx)(`p`, {
              className: `text-xs text-slate-400 leading-relaxed`,
              children: `The Enterprise plan provides a complete dedicated technical co-pilot. If your dispatch floor needs custom reporting formulas, specialized Samsara/ELD sync, 85-inch command center TV screen layouts, or 24/7 dedicated phone escalation for midnight dispatch emergencies, our engineering team builds it for you.`
            })]
          }), (0, $.jsxs)(`div`, {
            className: `p-5 rounded-2xl border border-[#1E2433] bg-[#10141E] space-y-2`,
            children: [(0, $.jsx)(`h4`, {
              className: `text-sm font-bold text-white`,
              children: `Can managers export attendance spreadsheets to Excel?`
            }), (0, $.jsx)(`p`, {
              className: `text-xs text-slate-400 leading-relaxed`,
              children: `Yes. The system generates professionally styled .xlsx files with color-coded on-time/late status, Uzbekistan timestamps, and automated summary calculation formulas ready for payroll accounting.`
            })]
          })]
        })]
      }), (0, $.jsx)(`footer`, {
        className: `border-t border-[#1E2433] bg-[#070A0F] py-12 px-4 sm:px-6 lg:px-8 mt-auto`,
        children: (0, $.jsxs)(`div`, {
          className: `max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6`,
          children: [(0, $.jsxs)(`div`, {
            className: `flex items-center gap-3`,
            children: [(0, $.jsx)(`img`, {
              src: `/logo3.png`,
              alt: `OPSECTOR`,
              className: `h-7 w-auto object-contain select-none`
            }), (0, $.jsxs)(`span`, {
              className: `text-xs text-slate-500`,
              children: [`© `, new Date().getFullYear(), ` OPSECTOR Fleet Technologies. All rights reserved.`]
            })]
          }), (0, $.jsxs)(`div`, {
            className: `flex flex-wrap items-center gap-6 text-xs text-slate-400`,
            children: [(0, $.jsx)(`button`, {
              onClick: () => w(`features`),
              className: `hover:text-white transition-colors cursor-pointer`,
              children: `Features`
            }), (0, $.jsx)(`button`, {
              onClick: () => w(`pricing`),
              className: `hover:text-white transition-colors cursor-pointer`,
              children: `Pricing`
            }), (0, $.jsx)(`button`, {
              onClick: () => w(`calculator`),
              className: `hover:text-white transition-colors cursor-pointer`,
              children: `ROI Calculator`
            }), (0, $.jsx)(`button`, {
              onClick: () => S(`General Inquiry`),
              className: `hover:text-white transition-colors cursor-pointer`,
              children: `Contact Sales`
            })]
          })]
        })
      }), i && (0, $.jsx)(`div`, {
        className: `fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in`,
        children: (0, $.jsxs)(`div`, {
          className: `w-full max-w-lg rounded-3xl border border-[#262C3A] bg-[#10141E] p-6 sm:p-8 shadow-2xl text-white relative`,
          children: [(0, $.jsx)(`button`, {
            onClick: () => a(!1),
            className: `absolute top-5 right-5 p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer`,
            children: (0, $.jsx)(He, {
              className: `w-5 h-5`
            })
          }), c ? (0, $.jsxs)(`div`, {
            className: `py-8 text-center space-y-4`,
            children: [(0, $.jsx)(`div`, {
              className: `w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto`,
              children: (0, $.jsx)(H, {
                className: `w-8 h-8`
              })
            }), (0, $.jsx)(`h3`, {
              className: `text-xl font-extrabold text-white`,
              children: `Inquiry Received!`
            }), (0, $.jsxs)(`p`, {
              className: `text-xs text-slate-300 max-w-sm mx-auto leading-relaxed`,
              children: [`Thank you, `, (0, $.jsx)(`strong`, {
                children: u.name || `Fleet Manager`
              }), `. Your dispatch inquiry for `, (0, $.jsx)(`strong`, {
                children: o
              }), ` has been received. An OpSector logistics specialist will contact you within 15 minutes to set up your account and 14-day trial.`]
            }), (0, $.jsx)(`div`, {
              className: `pt-3`,
              children: (0, $.jsx)(`button`, {
                onClick: () => a(!1),
                className: `px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-colors cursor-pointer`,
                children: `Done`
              })
            })]
          }) : (0, $.jsxs)(`form`, {
            onSubmit: C,
            className: `space-y-4`,
            children: [(0, $.jsxs)(`div`, {
              children: [(0, $.jsxs)(`div`, {
                className: `inline-flex items-center gap-1.5 text-[11px] font-mono text-red-400 bg-red-950/40 border border-red-500/30 px-2.5 py-0.5 rounded-full mb-2`,
                children: [(0, $.jsx)(Ue, {
                  className: `w-3 h-3`
                }), (0, $.jsx)(`span`, {
                  children: `OpSector Fleet Onboarding`
                })]
              }), (0, $.jsx)(`h3`, {
                className: `text-lg sm:text-xl font-bold text-white`,
                children: `Start Your Fleet Trial & Contact Sales`
              }), (0, $.jsx)(`p`, {
                className: `text-xs text-slate-400 mt-1`,
                children: `Fill out the form below. We'll set up your geofenced terminals and provision your trial.`
              })]
            }), (0, $.jsxs)(`div`, {
              className: `p-3 rounded-xl bg-[#090C12] border border-[#1E2433] flex items-center justify-between`,
              children: [(0, $.jsxs)(`div`, {
                className: `min-w-0`,
                children: [(0, $.jsx)(`span`, {
                  className: `text-[10px] text-slate-400 uppercase font-mono block`,
                  children: `Selected Plan:`
                }), (0, $.jsx)(`span`, {
                  className: `text-xs font-bold text-white truncate block`,
                  children: o
                })]
              }), (0, $.jsx)(`span`, {
                className: `text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full shrink-0`,
                children: `14 Days Free`
              })]
            }), (0, $.jsxs)(`div`, {
              className: `grid grid-cols-1 sm:grid-cols-2 gap-3`,
              children: [(0, $.jsxs)(`div`, {
                className: `space-y-1`,
                children: [(0, $.jsx)(`label`, {
                  className: `text-[11px] font-semibold text-slate-300`,
                  children: `Your Full Name *`
                }), (0, $.jsx)(`input`, {
                  type: `text`,
                  required: !0,
                  value: u.name,
                  onChange: e => d({
                    ...u,
                    name: e.target.value
                  }),
                  placeholder: `e.g. Alex Miller`,
                  className: `w-full px-3 py-2 rounded-xl border border-[#262C3A] bg-[#0A0D14] text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-red-500`
                })]
              }), (0, $.jsxs)(`div`, {
                className: `space-y-1`,
                children: [(0, $.jsx)(`label`, {
                  className: `text-[11px] font-semibold text-slate-300`,
                  children: `Fleet / Company Name *`
                }), (0, $.jsx)(`input`, {
                  type: `text`,
                  required: !0,
                  value: u.company,
                  onChange: e => d({
                    ...u,
                    company: e.target.value
                  }),
                  placeholder: `e.g. Prime Logistics Express`,
                  className: `w-full px-3 py-2 rounded-xl border border-[#262C3A] bg-[#0A0D14] text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-red-500`
                })]
              })]
            }), (0, $.jsxs)(`div`, {
              className: `grid grid-cols-1 sm:grid-cols-2 gap-3`,
              children: [(0, $.jsxs)(`div`, {
                className: `space-y-1`,
                children: [(0, $.jsx)(`label`, {
                  className: `text-[11px] font-semibold text-slate-300`,
                  children: `Work Email *`
                }), (0, $.jsx)(`input`, {
                  type: `email`,
                  required: !0,
                  value: u.email,
                  onChange: e => d({
                    ...u,
                    email: e.target.value
                  }),
                  placeholder: `alex@fleetcompany.com`,
                  className: `w-full px-3 py-2 rounded-xl border border-[#262C3A] bg-[#0A0D14] text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-red-500`
                })]
              }), (0, $.jsxs)(`div`, {
                className: `space-y-1`,
                children: [(0, $.jsx)(`label`, {
                  className: `text-[11px] font-semibold text-slate-300`,
                  children: `Phone / Telegram Handle *`
                }), (0, $.jsx)(`input`, {
                  type: `text`,
                  required: !0,
                  value: u.phone,
                  onChange: e => d({
                    ...u,
                    phone: e.target.value
                  }),
                  placeholder: `+1 (555) 019-2834`,
                  className: `w-full px-3 py-2 rounded-xl border border-[#262C3A] bg-[#0A0D14] text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-red-500`
                })]
              })]
            }), (0, $.jsxs)(`div`, {
              className: `space-y-1`,
              children: [(0, $.jsx)(`label`, {
                className: `text-[11px] font-semibold text-slate-300`,
                children: `Estimated Total Drivers & Dispatchers`
              }), (0, $.jsxs)(`select`, {
                value: u.fleetSize,
                onChange: e => d({
                  ...u,
                  fleetSize: e.target.value
                }),
                className: `w-full px-3 py-2 rounded-xl border border-[#262C3A] bg-[#0A0D14] text-xs text-white focus:outline-none focus:ring-1 focus:ring-red-500 cursor-pointer`,
                children: [(0, $.jsx)(`option`, {
                  value: `15`,
                  children: `5 – 15 Drivers (Small Fleet)`
                }), (0, $.jsx)(`option`, {
                  value: `35`,
                  children: `16 – 35 Drivers (Standard Fleet)`
                }), (0, $.jsx)(`option`, {
                  value: `75`,
                  children: `36 – 75 Drivers (Mid-Size Logistics)`
                }), (0, $.jsx)(`option`, {
                  value: `150`,
                  children: `75+ Drivers (Large Enterprise Fleet)`
                })]
              })]
            }), (0, $.jsxs)(`div`, {
              className: `space-y-1`,
              children: [(0, $.jsx)(`label`, {
                className: `text-[11px] font-semibold text-slate-300`,
                children: `Specific Fleet Requirements / Notes (Optional)`
              }), (0, $.jsx)(`textarea`, {
                rows: 2,
                value: u.notes,
                onChange: e => d({
                  ...u,
                  notes: e.target.value
                }),
                placeholder: `e.g. Need Samsara integration, 2 terminal yards in Chicago, 16:00 to 02:00 night shift rollover...`,
                className: `w-full p-2.5 rounded-xl border border-[#262C3A] bg-[#0A0D14] text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-red-500 resize-none`
              })]
            }), (0, $.jsxs)(`div`, {
              className: `pt-2`,
              children: [(0, $.jsxs)(`button`, {
                type: `submit`,
                className: `w-full py-3 rounded-xl bg-[#E51E2B] hover:bg-red-600 text-white font-bold text-xs shadow-lg shadow-red-500/25 flex items-center justify-center gap-1.5 transition-all cursor-pointer`,
                children: [(0, $.jsx)(Ce, {
                  className: `w-3.5 h-3.5`
                }), (0, $.jsx)(`span`, {
                  children: `Submit & Start 14-Day Free Trial`
                })]
              }), (0, $.jsx)(`div`, {
                className: `text-[10px] text-center text-slate-500 mt-2`,
                children: `Zero spam guaranteed. We will reach out only regarding your OpSector deployment.`
              })]
            })]
          })]
        })
      })]
    })
  };

function zl() {
  let e = () => {
      let e = window.location.hash.toLowerCase(),
        t = window.location.pathname.toLowerCase(),
        n = window.location.search.toLowerCase();
      if (e.includes(`dev7core`) || e.includes(`#dev`) || t.includes(`/dev7core`) || t.includes(`/dev`) || n.includes(`dev7core`) || n.includes(`dev`)) return `dev`;
      if (e.includes(`7manage`) || e.includes(`#manage`) || t.includes(`/7manage`) || t.includes(`/manage`) || n.includes(`7manage`) || n.includes(`manage`)) return `manage`;
      if (e === `#admin` || e.includes(`7core`) || e.includes(`#core`) || t === `/admin` || t.includes(`/7core`) || t.includes(`/core`) || n.includes(`admin`) || n.includes(`7core`)) return `admin`;
      if (e.includes(`mobile`) || t.includes(`/mobile`) || n.includes(`mobile`) || e.includes(`app`) || t.includes(`/app`) || n.includes(`app`)) return `mobile`;
      try {
        let e = window.Telegram?.WebApp;
        if (e && e.initData && e.initData.length > 0) return `mobile`
      } catch {}
      return `landing`
    },
    [t, n] = (0, T.useState)(e);
  (0, T.useEffect)(() => {
    let t = () => {
      n(e())
    };
    return window.addEventListener(`hashchange`, t), window.addEventListener(`popstate`, t), () => {
      window.removeEventListener(`hashchange`, t), window.removeEventListener(`popstate`, t)
    }
  }, []);
  let r = () => {
      window.location.hash = ``, n(`landing`)
    },
    i = () => {
      window.location.hash = `#mobile`, n(`mobile`)
    },
    a = () => {
      window.location.hash = `#admin`, n(`admin`)
    },
    o = () => {
      window.location.hash = `#7manage`, n(`manage`)
    },
    s = () => {
      window.location.hash = `#dev7core`, n(`dev`)
    };
  return t === `dev` ? (0, $.jsx)(ll, {
    onBackToApp: r,
    onNavigateToManager: o,
    onNavigateToAdmin: a
  }) : t === `manage` ? (0, $.jsx)(sl, {
    onBackToApp: r,
    onNavigateToAdmin: a
  }) : t === `admin` ? (0, $.jsx)(nl, {
    onBackToApp: r,
    onNavigateToManager: o,
    onNavigateToDev: s
  }) : t === `mobile` ? (0, $.jsx)(Ll, {
    onNavigateToAdmin: a,
    onNavigateToManage: o,
    onNavigateToDev: s,
    onBackToLanding: r
  }) : (0, $.jsx)(Rl, {
    onNavigateToMobile: i,
    onNavigateToManage: o,
    onNavigateToAdmin: a,
    onNavigateToDev: s
  })
}(0, We.createRoot)(document.getElementById(`root`)).render((0, $.jsx)(T.StrictMode, {
  children: (0, $.jsx)(zl, {})
}));