import { c as createLucideIcon, u as useStore, r as reactExports, ae as GitBranch, ad as ShoppingCart, al as Wrench, R as RotateCcw, j as jsxRuntimeExports, V as Search, I as Input, X, i as Card, E as ChevronDown, W as ChevronRight, a6 as Package, ac as Badge, m as CardContent } from "./index-De7Q6SQO.js";
import { B as Building2 } from "./building-2-Doljm3TO.js";
import { M as MapPin } from "./map-pin-BwsmX031.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
];
const ArrowUpRight = createLucideIcon("arrow-up-right", __iconNode);
const EVENT_META = {
  Purchased: {
    icon: ShoppingCart,
    color: "text-green-700",
    border: "border-l-green-500",
    bg: "bg-green-50",
    label: "Purchased",
    iconColor: "text-green-600"
  },
  "Location Assigned": {
    icon: MapPin,
    color: "text-violet-700",
    border: "border-l-violet-500",
    bg: "bg-violet-50",
    label: "Location Assigned",
    iconColor: "text-violet-600"
  },
  Stored: {
    icon: Package,
    color: "text-emerald-700",
    border: "border-l-emerald-500",
    bg: "bg-emerald-50",
    label: "Stored",
    iconColor: "text-emerald-600"
  },
  "Part Requested": {
    icon: ShoppingCart,
    color: "text-blue-700",
    border: "border-l-blue-500",
    bg: "bg-blue-50",
    label: "Part Requested",
    iconColor: "text-blue-600"
  },
  Issued: {
    icon: ArrowUpRight,
    color: "text-orange-700",
    border: "border-l-orange-500",
    bg: "bg-orange-50",
    label: "Issued",
    iconColor: "text-orange-600"
  },
  Installed: {
    icon: Wrench,
    color: "text-blue-700",
    border: "border-l-blue-500",
    bg: "bg-blue-50",
    label: "Installed",
    iconColor: "text-blue-600"
  },
  "Returned Unused": {
    icon: RotateCcw,
    color: "text-amber-700",
    border: "border-l-amber-500",
    bg: "bg-amber-50",
    label: "Returned to Store",
    iconColor: "text-amber-600"
  },
  "Returned to Store": {
    icon: RotateCcw,
    color: "text-amber-700",
    border: "border-l-amber-500",
    bg: "bg-amber-50",
    label: "Returned to Store",
    iconColor: "text-amber-600"
  },
  Relocated: {
    icon: MapPin,
    color: "text-cyan-700",
    border: "border-l-cyan-500",
    bg: "bg-cyan-50",
    label: "Relocated",
    iconColor: "text-cyan-600"
  },
  "Returned to Company": {
    icon: Building2,
    color: "text-red-700",
    border: "border-l-red-500",
    bg: "bg-red-50",
    label: "Returned to Company",
    iconColor: "text-red-600"
  },
  Defective: {
    icon: Building2,
    color: "text-red-700",
    border: "border-l-red-500",
    bg: "bg-red-50",
    label: "Defective",
    iconColor: "text-red-600"
  }
};
function getEventMeta(action) {
  if (EVENT_META[action]) return EVENT_META[action];
  for (const [key, val] of Object.entries(EVENT_META)) {
    if (action.toLowerCase().includes(key.toLowerCase())) return val;
  }
  return {
    icon: Package,
    color: "text-muted-foreground",
    border: "border-l-border",
    bg: "bg-muted/30",
    label: action,
    iconColor: "text-muted-foreground"
  };
}
const TAB_FILTER_MAP = {
  all: [],
  purchased: ["purchased", "stored"],
  issued: ["issued", "part requested"],
  installed: ["installed"],
  returned_store: ["returned unused", "returned to store"],
  returned_company: ["returned to company", "defective"]
};
function formatDate(ts) {
  try {
    return new Date(ts).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  } catch {
    return ts;
  }
}
const STATUS_BADGE = {
  in_stock: {
    label: "In Warehouse",
    cls: "bg-emerald-100 text-emerald-700 border border-emerald-200"
  },
  issued: {
    label: "Issued",
    cls: "bg-amber-100 text-amber-700 border border-amber-200"
  },
  installed: {
    label: "Installed",
    cls: "bg-blue-100 text-blue-700 border border-blue-200"
  },
  returned_to_company: {
    label: "Returned to Company",
    cls: "bg-red-100 text-red-700 border border-red-200"
  },
  returned_to_store: {
    label: "Returned to Store",
    cls: "bg-slate-100 text-slate-600 border border-slate-200"
  }
};
const FILTER_TABS = [
  {
    key: "all",
    label: "All Events",
    icon: GitBranch,
    color: "text-indigo-600"
  },
  {
    key: "purchased",
    label: "Purchased",
    icon: ShoppingCart,
    color: "text-green-600"
  },
  {
    key: "issued",
    label: "Issued",
    icon: ArrowUpRight,
    color: "text-orange-600"
  },
  {
    key: "installed",
    label: "Installed",
    icon: Wrench,
    color: "text-blue-600"
  },
  {
    key: "returned_store",
    label: "Returned to Store",
    icon: RotateCcw,
    color: "text-amber-600"
  },
  {
    key: "returned_company",
    label: "Returned to Company",
    icon: Building2,
    color: "text-red-600"
  }
];
function LifecyclePage() {
  const {
    partLifecycle,
    partItems,
    stockCompanies,
    stockPartNames,
    stockCategories,
    navigate
  } = useStore();
  const [search, setSearch] = reactExports.useState("");
  const [expanded, setExpanded] = reactExports.useState(/* @__PURE__ */ new Set());
  const [activeTab, setActiveTab] = reactExports.useState("all");
  const [dateFilters, setDateFilters] = reactExports.useState(
    Object.fromEntries(
      FILTER_TABS.map((t) => [t.key, { from: "", to: "" }])
    )
  );
  const allLifecycle = reactExports.useMemo(() => {
    return [...partLifecycle].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }, [partLifecycle]);
  const groups = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (const entry of allLifecycle) {
      const key = entry.partId;
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(entry);
    }
    for (const [, arr] of map) {
      arr.sort(
        (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
    }
    return map;
  }, [allLifecycle]);
  const partCodes = reactExports.useMemo(() => {
    return [...groups.keys()].sort((a, b) => {
      var _a, _b, _c, _d;
      const aLatest = ((_b = (_a = groups.get(a)) == null ? void 0 : _a[0]) == null ? void 0 : _b.timestamp) ?? "";
      const bLatest = ((_d = (_c = groups.get(b)) == null ? void 0 : _c[0]) == null ? void 0 : _d.timestamp) ?? "";
      return bLatest.localeCompare(aLatest);
    });
  }, [groups]);
  const getPartInfo = (partId) => {
    var _a, _b, _c;
    let item = partItems.find((p) => p.id === partId);
    if (!item) {
      item = partItems.find((p) => p.partCode === partId);
    }
    if (!item) {
      return {
        company: "",
        partName: partId,
        status: "in_stock",
        category: ""
      };
    }
    const company = ((_a = stockCompanies.find((c) => c.id === item.companyId)) == null ? void 0 : _a.name) ?? "";
    const partName = ((_b = stockPartNames.find((p) => p.id === item.partNameId)) == null ? void 0 : _b.name) ?? item.partCode ?? partId;
    const category = ((_c = stockCategories.find((c) => c.id === item.categoryId)) == null ? void 0 : _c.name) ?? "";
    return { company, partName, status: item.status, category };
  };
  const currentDateFilter = dateFilters[activeTab];
  const filterEvents = (events) => {
    let filtered2 = events;
    if (activeTab !== "all") {
      const keywords = TAB_FILTER_MAP[activeTab];
      filtered2 = filtered2.filter(
        (e) => keywords.some((k) => e.action.toLowerCase().includes(k))
      );
    }
    if (currentDateFilter.from) {
      filtered2 = filtered2.filter(
        (e) => e.timestamp >= new Date(currentDateFilter.from).toISOString()
      );
    }
    if (currentDateFilter.to) {
      const toEnd = new Date(currentDateFilter.to);
      toEnd.setHours(23, 59, 59, 999);
      filtered2 = filtered2.filter((e) => e.timestamp <= toEnd.toISOString());
    }
    return filtered2;
  };
  const q = search.toLowerCase();
  const filtered = partCodes.filter((code) => {
    const info = getPartInfo(code);
    if (q && !code.toLowerCase().includes(q) && !info.partName.toLowerCase().includes(q))
      return false;
    const events = groups.get(code) ?? [];
    return filterEvents(events).length > 0;
  });
  const toggle = (code) => setExpanded((s) => {
    const n = new Set(s);
    if (n.has(code)) n.delete(code);
    else n.add(code);
    return n;
  });
  const totalEvents = allLifecycle.length;
  const hasFilters = search || currentDateFilter.from || currentDateFilter.to || activeTab !== "all";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 rounded-2xl shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 bg-white/20 rounded-xl backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GitBranch, { className: "h-6 w-6" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Part Lifecycle" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-indigo-200 text-sm", children: "Track every movement of every part" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-white/20 text-white text-sm font-semibold px-3 py-1.5 rounded-full", children: [
        totalEvents,
        " total events"
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: FILTER_TABS.map((tab) => {
      const Icon = tab.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setActiveTab(tab.key),
          className: `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${activeTab === tab.key ? "bg-indigo-600 text-white border-indigo-600 shadow-sm" : "bg-card text-muted-foreground border-border hover:border-indigo-300 hover:text-indigo-600"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3 w-3" }),
            tab.label
          ]
        },
        tab.key
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: search,
              onChange: (e) => setSearch(e.target.value),
              placeholder: "Search by part code or part name...",
              className: "pl-9 bg-card border-border shadow-sm"
            }
          ),
          search && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setSearch(""),
              className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium", children: "From" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "date",
              value: currentDateFilter.from,
              onChange: (e) => setDateFilters((prev) => ({
                ...prev,
                [activeTab]: { ...prev[activeTab], from: e.target.value }
              })),
              className: "bg-card border-border shadow-sm text-sm w-36"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium", children: "To" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "date",
              value: currentDateFilter.to,
              onChange: (e) => setDateFilters((prev) => ({
                ...prev,
                [activeTab]: { ...prev[activeTab], to: e.target.value }
              })),
              className: "bg-card border-border shadow-sm text-sm w-36"
            }
          ),
          (currentDateFilter.from || currentDateFilter.to) && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setDateFilters((prev) => ({
                ...prev,
                [activeTab]: { from: "", to: "" }
              })),
              className: "text-muted-foreground hover:text-foreground p-1",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
            }
          )
        ] })
      ] }),
      totalEvents === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-20 text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(GitBranch, { className: "h-14 w-14 mx-auto mb-4 opacity-20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold", children: "No lifecycle entries yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1 text-muted-foreground/70", children: "Parts will be tracked here as they move through the system — purchases, location assignments, issuances, installations, and returns." })
      ] }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16 text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(GitBranch, { className: "h-12 w-12 mx-auto mb-3 opacity-30" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-medium", children: "No lifecycle events found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", children: hasFilters ? "Try a different filter or search term" : "No events match the current view" })
      ] }) : (
        /* Groups */
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filtered.map((code) => {
          const allEvents = groups.get(code) ?? [];
          const events = filterEvents(allEvents);
          const info = getPartInfo(code);
          const isOpen = expanded.has(code);
          const badge = STATUS_BADGE[info.status] ?? STATUS_BADGE.in_stock;
          const displayCode = code;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Card,
            {
              className: "overflow-hidden shadow-sm border-border hover:shadow-md transition-shadow",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => toggle(code),
                    className: "w-full flex items-center gap-4 px-5 py-4 hover:bg-muted/30 transition-colors text-left",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: isOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-4 w-4 text-white" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: (e) => {
                                e.stopPropagation();
                                navigate("part-detail", void 0, code);
                              },
                              className: "font-bold text-indigo-600 hover:text-indigo-800 hover:underline text-base",
                              children: displayCode
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Badge,
                            {
                              className: `text-xs px-2 py-0.5 rounded-full font-medium border-0 ${badge.cls}`,
                              children: badge.label
                            }
                          )
                        ] }),
                        info.company && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
                          info.company,
                          " ›",
                          " ",
                          info.category && `${info.category} › `,
                          info.partName
                        ] }),
                        !info.company && info.partName && info.partName !== code && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: info.partName })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                          allEvents.length,
                          " total"
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-indigo-100 text-indigo-700 text-xs font-bold px-2.5 py-1 rounded-full", children: [
                          events.length,
                          " event",
                          events.length !== 1 ? "s" : ""
                        ] })
                      ] })
                    ]
                  }
                ),
                isOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-0 pb-5 px-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border mb-4" }),
                  events.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center py-4", children: "No events match the current filter for this part." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative ml-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-200 to-border" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: events.map((ev) => {
                      const meta = getEventMeta(ev.action);
                      const Icon = meta.icon;
                      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative pl-10", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: `absolute left-2 top-3 w-4 h-4 rounded-full ${meta.bg} border-2 ${meta.border.replace("border-l-", "border-")} flex items-center justify-center shadow-sm`,
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Icon,
                              {
                                className: `h-2.5 w-2.5 ${meta.iconColor}`
                              }
                            )
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            className: `rounded-xl border-l-4 ${meta.border} ${meta.bg} p-4`,
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    Icon,
                                    {
                                      className: `h-4 w-4 ${meta.iconColor}`
                                    }
                                  ),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "span",
                                    {
                                      className: `font-bold text-sm ${meta.color}`,
                                      children: ev.action
                                    }
                                  )
                                ] }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground whitespace-nowrap flex-shrink-0", children: formatDate(ev.timestamp) })
                              ] }),
                              ev.details && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1.5 leading-relaxed", children: ev.details }),
                              ev.userName && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground/70 mt-1", children: [
                                "By ",
                                ev.userName
                              ] })
                            ]
                          }
                        )
                      ] }, ev.id);
                    }) })
                  ] })
                ] })
              ]
            },
            code
          );
        }) })
      )
    ] })
  ] });
}
export {
  LifecyclePage as default
};
