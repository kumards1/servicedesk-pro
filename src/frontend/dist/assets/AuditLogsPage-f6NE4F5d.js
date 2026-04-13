import { c as createLucideIcon, u as useStore, r as reactExports, j as jsxRuntimeExports, V as Search, I as Input, X, E as ChevronDown, W as ChevronRight, Y as LogOut, R as RotateCcw, y as Trash2, _ as ScrollText } from "./index-De7Q6SQO.js";
import { C as ClipboardCheck } from "./clipboard-check-Cnavb2jK.js";
import { F as Funnel } from "./funnel-D07buPss.js";
import { C as Calendar } from "./calendar-CSRezUDQ.js";
import { S as Send } from "./send-oapnhRw6.js";
import { P as Pencil } from "./pencil-B4TAhzLG.js";
import { P as Plus } from "./plus-B5kdLRRW.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m10 17 5-5-5-5", key: "1bsop3" }],
  ["path", { d: "M15 12H3", key: "6jk70r" }],
  ["path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4", key: "u53s6r" }]
];
const LogIn = createLucideIcon("log-in", __iconNode);
const ACTION_COLORS = {
  CREATE: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  UPDATE: "bg-blue-100 text-blue-700 border border-blue-200",
  DELETE: "bg-red-100 text-red-700 border border-red-200",
  ISSUE: "bg-amber-100 text-amber-700 border border-amber-200",
  RETURN: "bg-slate-100 text-slate-600 border border-slate-200",
  LOGIN: "bg-violet-100 text-violet-700 border border-violet-200",
  LOGOUT: "bg-gray-100 text-gray-600 border border-gray-200"
};
const ACTION_ICONS = {
  CREATE: Plus,
  UPDATE: Pencil,
  DELETE: Trash2,
  ISSUE: Send,
  RETURN: RotateCcw,
  LOGIN: LogIn,
  LOGOUT: LogOut
};
const ACTIONS = [
  "ALL",
  "CREATE",
  "UPDATE",
  "DELETE",
  "ISSUE",
  "RETURN",
  "LOGIN",
  "LOGOUT"
];
const MODULES = [
  "ALL",
  "Case",
  "PartRequest",
  "Inventory",
  "UserManagement",
  "Purchase",
  "Warehouse",
  "Technician",
  "Vendor",
  "Notice",
  "Settings",
  "Auth"
];
const MODULE_COLORS = {
  Case: "bg-blue-50 text-blue-700 border border-blue-200",
  PartRequest: "bg-amber-50 text-amber-700 border border-amber-200",
  Inventory: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  PartIssue: "bg-orange-50 text-orange-700 border border-orange-200",
  PartInstance: "bg-teal-50 text-teal-700 border border-teal-200",
  UserManagement: "bg-violet-50 text-violet-700 border border-violet-200",
  Purchase: "bg-indigo-50 text-indigo-700 border border-indigo-200",
  Warehouse: "bg-cyan-50 text-cyan-700 border border-cyan-200",
  Technician: "bg-rose-50 text-rose-700 border border-rose-200",
  Vendor: "bg-pink-50 text-pink-700 border border-pink-200",
  Notice: "bg-lime-50 text-lime-700 border border-lime-200",
  Settings: "bg-slate-100 text-slate-600 border border-slate-200",
  Auth: "bg-gray-100 text-gray-600 border border-gray-200"
};
function formatTime(ts) {
  try {
    return new Date(ts).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    });
  } catch {
    return ts;
  }
}
function formatDateGroup(ts) {
  try {
    const d = new Date(ts);
    const today = /* @__PURE__ */ new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (d.toDateString() === today.toDateString()) return "Today";
    if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
    return d.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  } catch {
    return ts;
  }
}
function getDateGroupKey(ts) {
  try {
    return new Date(ts).toDateString();
  } catch {
    return ts;
  }
}
function matchesModuleFilter(logModule, filter) {
  if (filter === "ALL") return true;
  if (filter === "Inventory")
    return logModule === "PartInstance" || logModule === "PartIssue" || logModule === "Inventory";
  return logModule === filter || logModule.toLowerCase().includes(filter.toLowerCase());
}
function AuditLogsPage() {
  const { currentUser, storePilotAuditLogs, navigate } = useStore();
  const [search, setSearch] = reactExports.useState("");
  const [selectedActions, setSelectedActions] = reactExports.useState(
    /* @__PURE__ */ new Set(["ALL"])
  );
  const [selectedModule, setSelectedModule] = reactExports.useState("ALL");
  const [expandedDates, setExpandedDates] = reactExports.useState(/* @__PURE__ */ new Set());
  const [expandedRoles, setExpandedRoles] = reactExports.useState(/* @__PURE__ */ new Set());
  const [expandedUsers, setExpandedUsers] = reactExports.useState(/* @__PURE__ */ new Set());
  const q = search.toLowerCase();
  const filtered = reactExports.useMemo(() => {
    return (storePilotAuditLogs ?? []).filter((log) => {
      const matchAction = selectedActions.has("ALL") || selectedActions.has(log.action);
      const matchModule = matchesModuleFilter(log.module, selectedModule);
      const matchSearch = !q || log.userName.toLowerCase().includes(q) || log.module.toLowerCase().includes(q) || log.details.toLowerCase().includes(q) || (log.partCodes ?? []).some((c) => c.toLowerCase().includes(q));
      return matchAction && matchModule && matchSearch;
    });
  }, [storePilotAuditLogs, selectedActions, selectedModule, q]);
  const dateGroups = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (const log of [...filtered].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )) {
      const key = getDateGroupKey(log.timestamp);
      if (!map.has(key))
        map.set(key, { label: formatDateGroup(log.timestamp), logs: [] });
      map.get(key).logs.push(log);
    }
    return map;
  }, [filtered]);
  const toggleAction = (a) => {
    setSelectedActions((prev) => {
      const next = new Set(prev);
      if (a === "ALL") return /* @__PURE__ */ new Set(["ALL"]);
      next.delete("ALL");
      if (next.has(a)) next.delete(a);
      else next.add(a);
      if (next.size === 0) return /* @__PURE__ */ new Set(["ALL"]);
      return next;
    });
  };
  const toggleDate = (key) => setExpandedDates((s) => {
    const n = new Set(s);
    if (n.has(key)) n.delete(key);
    else n.add(key);
    return n;
  });
  const toggleRole = (key) => setExpandedRoles((s) => {
    const n = new Set(s);
    if (n.has(key)) n.delete(key);
    else n.add(key);
    return n;
  });
  const toggleUser = (key) => setExpandedUsers((s) => {
    const n = new Set(s);
    if (n.has(key)) n.delete(key);
    else n.add(key);
    return n;
  });
  const renderDetails = (details, partCodes) => {
    if (!partCodes || partCodes.length === 0) return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: details });
    const parts = [];
    let remaining = details;
    let keyIdx = 0;
    for (const code of partCodes) {
      const idx = remaining.indexOf(code);
      if (idx === -1) continue;
      if (idx > 0) parts.push(remaining.slice(0, idx));
      parts.push(
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => navigate("part-detail", void 0, code),
            className: "font-semibold text-blue-600 hover:text-blue-800 hover:underline",
            children: code
          },
          keyIdx++
        )
      );
      remaining = remaining.slice(idx + code.length);
    }
    if (remaining) parts.push(remaining);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: parts });
  };
  if ((currentUser == null ? void 0 : currentUser.role) !== "admin") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-[60vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardCheck, { className: "h-16 w-16 mx-auto mb-4 text-muted-foreground/30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-muted-foreground", children: "Access Restricted" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground/60 mt-2", children: "Audit logs are only accessible to administrators." })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-r from-slate-700 to-gray-800 text-white px-6 py-6 rounded-2xl shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 bg-white/20 rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardCheck, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Audit Logs" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-300 text-sm", children: "Complete record of all system activity" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-white/20 text-white text-sm font-semibold px-3 py-1.5 rounded-full", children: [
        filtered.length,
        " records"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl shadow-sm border border-border p-4 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col md:flex-row gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: search,
              onChange: (e) => setSearch(e.target.value),
              placeholder: "Search user, module, details, part code...",
              className: "pl-9 border-border"
            }
          ),
          search && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setSearch(""),
              className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-4 w-4 text-muted-foreground self-center" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-muted-foreground self-center", children: "Actions:" }),
          ACTIONS.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => toggleAction(a),
              className: `text-xs font-semibold px-3 py-1 rounded-full transition-all ${selectedActions.has(a) ? a === "ALL" ? "bg-slate-700 text-white" : `${ACTION_COLORS[a] ?? "bg-muted"} ring-1 ring-offset-1 ring-slate-400` : "bg-muted text-muted-foreground hover:bg-muted/70"}`,
              children: a
            },
            a
          ))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4 text-muted-foreground self-center" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-muted-foreground self-center", children: "Module:" }),
          MODULES.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setSelectedModule(m),
              className: `text-xs font-semibold px-3 py-1 rounded-full transition-all ${selectedModule === m ? m === "ALL" ? "bg-slate-700 text-white" : `${MODULE_COLORS[m] ?? "bg-muted text-muted-foreground border border-border"} ring-1 ring-offset-1 ring-slate-400` : "bg-muted text-muted-foreground hover:bg-muted/70"}`,
              children: m
            },
            m
          ))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        [...dateGroups.entries()].map(([dateKey, { label, logs }]) => {
          const isDateOpen = expandedDates.has(dateKey);
          const roleMap = /* @__PURE__ */ new Map();
          for (const log of logs) {
            if (!roleMap.has(log.userRole)) roleMap.set(log.userRole, []);
            roleMap.get(log.userRole).push(log);
          }
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card rounded-2xl shadow-sm border border-border overflow-hidden",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => toggleDate(dateKey),
                    className: "w-full flex items-center gap-3 px-5 py-4 hover:bg-muted/40 transition-colors text-left",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: isDateOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground flex-1", children: label }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                        roleMap.size,
                        " role",
                        roleMap.size !== 1 ? "s" : ""
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-muted text-muted-foreground text-xs font-semibold px-2 py-0.5 rounded-full", children: [
                        logs.length,
                        " ",
                        logs.length === 1 ? "entry" : "entries"
                      ] })
                    ]
                  }
                ),
                isDateOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border", children: [...roleMap.entries()].map(([role, roleLogs]) => {
                  const roleKey = `${dateKey}-${role}`;
                  const isRoleOpen = expandedRoles.has(roleKey);
                  const userMap = /* @__PURE__ */ new Map();
                  for (const log of roleLogs) {
                    if (!userMap.has(log.userName))
                      userMap.set(log.userName, []);
                    userMap.get(log.userName).push(log);
                  }
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "border-b border-border last:border-0",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "button",
                            onClick: () => toggleRole(roleKey),
                            className: "w-full flex items-center gap-3 px-8 py-3 hover:bg-muted/40 transition-colors text-left",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/50", children: isRoleOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5" }) }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-muted-foreground text-sm capitalize flex-1", children: role }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                                userMap.size,
                                " user",
                                userMap.size !== 1 ? "s" : ""
                              ] }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-blue-50 text-blue-600 text-xs font-semibold px-2 py-0.5 rounded-full", children: [
                                roleLogs.length,
                                " entries"
                              ] })
                            ]
                          }
                        ),
                        isRoleOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: [...userMap.entries()].map(
                          ([userName, userLogs]) => {
                            const userKey = `${roleKey}-${userName}`;
                            const isUserOpen = expandedUsers.has(userKey);
                            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "div",
                              {
                                className: "border-t border-border/50",
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                    "button",
                                    {
                                      type: "button",
                                      onClick: () => toggleUser(userKey),
                                      className: "w-full flex items-center gap-3 px-12 py-2.5 hover:bg-indigo-50/50 transition-colors text-left",
                                      children: [
                                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/50", children: isUserOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3" }) }),
                                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0", children: userName.slice(0, 1) }),
                                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground text-sm flex-1", children: userName }),
                                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                                          userLogs.length,
                                          " actions"
                                        ] })
                                      ]
                                    }
                                  ),
                                  isUserOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-12 pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
                                    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-muted-foreground border-b border-border", children: [
                                      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 font-semibold", children: "Action" }),
                                      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 font-semibold", children: "Module" }),
                                      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 font-semibold", children: "#ID" }),
                                      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 font-semibold", children: "Details" }),
                                      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 font-semibold", children: "Time" })
                                    ] }) }),
                                    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: userLogs.map((log) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                      "tr",
                                      {
                                        className: "border-b border-border/50 hover:bg-muted/30 transition-colors",
                                        children: [
                                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                            "span",
                                            {
                                              className: `inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${ACTION_COLORS[log.action] ?? "bg-muted text-muted-foreground"}`,
                                              children: [
                                                (() => {
                                                  const I = ACTION_ICONS[log.action];
                                                  return I ? /* @__PURE__ */ jsxRuntimeExports.jsx(I, { className: "h-2.5 w-2.5" }) : null;
                                                })(),
                                                log.action
                                              ]
                                            }
                                          ) }),
                                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                            "span",
                                            {
                                              className: `inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold ${MODULE_COLORS[log.module] ?? "bg-muted text-muted-foreground border border-border"}`,
                                              children: log.module
                                            }
                                          ) }),
                                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-muted-foreground/60", children: log.recordId }),
                                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-muted-foreground max-w-xs", children: renderDetails(
                                            log.details,
                                            log.partCodes
                                          ) }),
                                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-muted-foreground/60 text-right whitespace-nowrap", children: formatTime(log.timestamp) })
                                        ]
                                      },
                                      log.id
                                    )) })
                                  ] }) })
                                ]
                              },
                              userName
                            );
                          }
                        ) })
                      ]
                    },
                    role
                  );
                }) })
              ]
            },
            dateKey
          );
        }),
        dateGroups.size === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-20 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollText, { className: "h-14 w-14 mx-auto mb-4 opacity-20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold", children: "No audit entries recorded yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1 text-muted-foreground/70", children: "Actions across the system will appear here — case updates, part requests, inventory changes, user management, and more." }),
          (search || !selectedActions.has("ALL") || selectedModule !== "ALL") && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-3 text-muted-foreground/50", children: "Try clearing the filters above to see all entries." })
        ] })
      ] })
    ] })
  ] });
}
export {
  AuditLogsPage as default
};
