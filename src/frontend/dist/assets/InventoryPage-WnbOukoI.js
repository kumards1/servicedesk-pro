import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, a6 as Package, V as Search, ai as ArrowLeftRight, u as useStore, I as Input, X, i as Card, m as CardContent, aj as FolderOpen, ak as Layers, E as ChevronDown, W as ChevronRight, w as Button, ac as Badge, ag as ArrowRight, al as Wrench, ab as User } from "./index-De7Q6SQO.js";
import { F as Folder } from "./folder-Dv2xNaht.js";
import { B as Building2 } from "./building-2-Doljm3TO.js";
import { T as Tag } from "./tag-WKOHLAdV.js";
import { M as MapPin } from "./map-pin-BwsmX031.js";
import { C as CircleCheck } from "./circle-check-DuUcrnv7.js";
import { C as Calendar } from "./calendar-CSRezUDQ.js";
import { L as Lightbulb } from "./lightbulb-_pEmTAiV.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
const ExternalLink = createLucideIcon("external-link", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 22v-9", key: "x3hkom" }],
  [
    "path",
    {
      d: "M15.17 2.21a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.655 1.655 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z",
      key: "2ntwy6"
    }
  ],
  [
    "path",
    {
      d: "M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13",
      key: "1pmm1c"
    }
  ],
  [
    "path",
    {
      d: "M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.636 1.636 0 0 0 1.63 0z",
      key: "12ttoo"
    }
  ]
];
const PackageOpen = createLucideIcon("package-open", __iconNode);
const STATUS_STYLES = {
  in_stock: "bg-green-100 text-green-700 border-green-200",
  issued: "bg-amber-100 text-amber-700 border-amber-200",
  installed: "bg-blue-100 text-blue-700 border-blue-200",
  returned_to_company: "bg-red-100 text-red-700 border-red-200",
  returned_to_store: "bg-slate-100 text-slate-600 border-slate-200"
};
const STATUS_LABELS = {
  in_stock: "In Stock",
  issued: "Issued",
  installed: "Installed",
  returned_to_company: "Returned to Co.",
  returned_to_store: "Returned to Store"
};
function useLocationHelpers() {
  const { racks, shelves, bins } = useStore();
  const getRack = (id) => {
    var _a;
    return ((_a = racks.find((r) => r.id === id)) == null ? void 0 : _a.name) ?? "";
  };
  const getShelf = (id) => {
    var _a;
    return ((_a = shelves.find((s) => s.id === id)) == null ? void 0 : _a.name) ?? "";
  };
  const getBin = (id) => {
    var _a;
    return ((_a = bins.find((b) => b.id === id)) == null ? void 0 : _a.name) ?? "";
  };
  const locationStr = (p) => {
    if (!p.rackId) return "Location Pending";
    return [getRack(p.rackId), getShelf(p.shelfId), getBin(p.binId)].filter(Boolean).join(" > ");
  };
  return { getRack, getShelf, getBin, locationStr };
}
function PartCodePopup({ popup, onClose, onNavigate }) {
  const { racks, shelves, bins, technicians } = useStore();
  const [unitSearch, setUnitSearch] = reactExports.useState("");
  if (!popup) return null;
  const getRack = (id) => {
    var _a;
    return ((_a = racks.find((r) => r.id === id)) == null ? void 0 : _a.name) ?? "";
  };
  const getShelf = (id) => {
    var _a;
    return ((_a = shelves.find((s) => s.id === id)) == null ? void 0 : _a.name) ?? "";
  };
  const getBin = (id) => {
    var _a;
    return ((_a = bins.find((b) => b.id === id)) == null ? void 0 : _a.name) ?? "";
  };
  const getTech = (id) => {
    var _a;
    return ((_a = technicians.find((t) => t.id === id)) == null ? void 0 : _a.name) ?? id;
  };
  const locationStr = (p) => {
    if (!p.rackId) return null;
    return [getRack(p.rackId), getShelf(p.shelfId), getBin(p.binId)].filter(Boolean).join(" › ");
  };
  const q = unitSearch.trim().toLowerCase();
  const filteredUnits = popup.units.filter((u) => {
    if (!q) return true;
    const loc = locationStr(u) ?? "";
    const tech = u.technicianId ? getTech(u.technicianId) : "";
    return u.partCode.toLowerCase().includes(q) || loc.toLowerCase().includes(q) || tech.toLowerCase().includes(q) || (u.caseId ?? "").toLowerCase().includes(q) || u.status.toLowerCase().includes(q);
  });
  const inStock = popup.units.filter((u) => u.status === "in_stock").length;
  const issued = popup.units.filter((u) => u.status === "issued").length;
  const installed = popup.units.filter((u) => u.status === "installed").length;
  const total = popup.units.length;
  const groupedUnits = {
    in_stock: filteredUnits.filter((u) => u.status === "in_stock"),
    issued: filteredUnits.filter((u) => u.status === "issued"),
    installed: filteredUnits.filter((u) => u.status === "installed"),
    returned_to_store: filteredUnits.filter(
      (u) => u.status === "returned_to_store"
    ),
    returned_to_company: filteredUnits.filter(
      (u) => u.status === "returned_to_company"
    )
  };
  const STATUS_CONFIG = {
    in_stock: {
      label: "In Stock",
      headerCls: "bg-emerald-50 border-emerald-100 text-emerald-700",
      badgeCls: "bg-emerald-100 text-emerald-700",
      dotCls: "bg-emerald-400",
      icon: CircleCheck
    },
    issued: {
      label: "With Technician",
      headerCls: "bg-amber-50 border-amber-100 text-amber-700",
      badgeCls: "bg-amber-100 text-amber-700",
      dotCls: "bg-amber-400",
      icon: User
    },
    installed: {
      label: "Installed",
      headerCls: "bg-purple-50 border-purple-100 text-purple-700",
      badgeCls: "bg-purple-100 text-purple-700",
      dotCls: "bg-purple-400",
      icon: Wrench
    },
    returned_to_store: {
      label: "Returned to Store",
      headerCls: "bg-sky-50 border-sky-100 text-sky-700",
      badgeCls: "bg-sky-100 text-sky-700",
      dotCls: "bg-sky-400",
      icon: ArrowRight
    },
    returned_to_company: {
      label: "Returned to Company",
      headerCls: "bg-rose-50 border-rose-100 text-rose-700",
      badgeCls: "bg-rose-100 text-rose-700",
      dotCls: "bg-rose-400",
      icon: ArrowRight
    }
  };
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: modal backdrop
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4",
        onClick: onClose,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-white rounded-xl shadow-xl w-full max-w-[560px] max-h-[82vh] overflow-hidden flex flex-col animate-in zoom-in-95 fade-in duration-150",
            onClick: (e) => e.stopPropagation(),
            "data-ocid": "inventory.part-code-popup",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border-b border-gray-100 px-5 py-4 flex items-start justify-between shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-base font-semibold text-gray-900 tracking-tight", children: popup.partCode }),
                    popup.companyName && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-medium border border-indigo-100", children: popup.companyName })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 mt-0.5 font-normal", children: popup.partName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5 mt-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium", children: [
                      total,
                      " total"
                    ] }),
                    inStock > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium", children: [
                      inStock,
                      " in stock"
                    ] }),
                    issued > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium", children: [
                      issued,
                      " issued"
                    ] }),
                    installed > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium", children: [
                      installed,
                      " installed"
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    className: "shrink-0 p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600 ml-3",
                    "aria-label": "Close",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2.5 border-b border-gray-100 bg-gray-50 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "text",
                    className: "w-full pl-8 pr-8 py-1.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-300 placeholder:text-gray-400",
                    placeholder: "Filter by part code, location, technician...",
                    value: unitSearch,
                    onChange: (e) => setUnitSearch(e.target.value)
                  }
                ),
                unitSearch && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setUnitSearch(""),
                    className: "absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" })
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-y-auto flex-1", children: filteredUnits.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-12 text-gray-400", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-10 w-10 mb-2 opacity-20" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-normal", children: unitSearch ? "No units match your filter" : "No units found for this part code" }),
                unitSearch && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setUnitSearch(""),
                    className: "text-xs text-indigo-600 mt-2 hover:underline",
                    children: "Clear filter"
                  }
                )
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: Object.entries(groupedUnits).map(([status, units]) => {
                if (units.length === 0) return null;
                const cfg = STATUS_CONFIG[status];
                let unitIndex = 0;
                for (const [s, arr] of Object.entries(groupedUnits)) {
                  if (s === status) break;
                  unitIndex += arr.length;
                }
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: `flex items-center gap-2 px-4 py-1.5 border-b border-t first:border-t-0 ${cfg.headerCls} sticky top-0 z-10`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: `w-2 h-2 rounded-full ${cfg.dotCls} shrink-0`
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium", children: cfg.label }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-xs text-gray-400 font-normal", children: [
                          units.length,
                          " unit",
                          units.length !== 1 ? "s" : ""
                        ] })
                      ]
                    }
                  ),
                  units.map((unit, idx) => {
                    const loc = locationStr(unit);
                    const techName = unit.technicianId ? getTech(unit.technicianId) : null;
                    const issueDate = unit.issueDate ? new Date(unit.issueDate).toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    }) : null;
                    const globalIdx = unitIndex + idx + 1;
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 transition-colors gap-3 border-b border-gray-50 last:border-b-0",
                        "data-ocid": `inventory.popup.unit.${globalIdx}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0 flex-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 w-6 h-6 rounded-full bg-gray-100 text-gray-500 text-xs flex items-center justify-center font-normal", children: globalIdx }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 space-y-0.5 flex-1", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-3 w-3 text-indigo-400 shrink-0" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs font-medium text-gray-800 truncate", children: unit.partCode })
                              ] }),
                              loc ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-gray-500 font-normal", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3 text-emerald-400 shrink-0" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: loc })
                              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs text-amber-600 font-normal", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-2.5 w-2.5" }),
                                "Pending Location"
                              ] }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
                                techName && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-gray-400 font-normal", children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-2.5 w-2.5" }),
                                  techName
                                ] }),
                                unit.caseId && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-gray-400 font-normal font-mono", children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-2.5 w-2.5 text-indigo-300" }),
                                  unit.caseId
                                ] }),
                                issueDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-gray-400 font-normal", children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-2.5 w-2.5 text-sky-400" }),
                                  issueDate
                                ] })
                              ] })
                            ] })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-1.5 shrink-0", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: `text-xs px-2 py-0.5 rounded-full font-normal ${cfg.badgeCls}`,
                                children: cfg.label
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              Button,
                              {
                                size: "sm",
                                variant: "outline",
                                className: "h-6 text-xs border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-indigo-700 hover:border-indigo-200 gap-1 font-normal",
                                onClick: () => {
                                  onClose();
                                  onNavigate(unit.id);
                                },
                                "data-ocid": `inventory.popup.view-details.${globalIdx}`,
                                children: [
                                  "Details",
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3" })
                                ]
                              }
                            )
                          ] })
                        ]
                      },
                      unit.id
                    );
                  })
                ] }, status);
              }) }) })
            ]
          }
        )
      }
    )
  );
}
function SparePartsTab() {
  const {
    partItems,
    stockCompanies,
    stockCategories,
    stockPartNames,
    navigate
  } = useStore();
  const [search, setSearch] = reactExports.useState("");
  const [expandedCompanies, setExpandedCompanies] = reactExports.useState(
    /* @__PURE__ */ new Set()
  );
  const [expandedCategories, setExpandedCategories] = reactExports.useState(
    /* @__PURE__ */ new Set()
  );
  const [expandedPartNames, setExpandedPartNames] = reactExports.useState(
    /* @__PURE__ */ new Set()
  );
  const [partCodePopup, setPartCodePopup] = reactExports.useState(null);
  const q = search.trim().toLowerCase();
  const tree = reactExports.useMemo(() => {
    var _a, _b, _c;
    const root = /* @__PURE__ */ new Map();
    for (const item of partItems) {
      if (!root.has(item.companyId)) root.set(item.companyId, /* @__PURE__ */ new Map());
      const l2 = root.get(item.companyId);
      if (!l2.has(item.categoryId)) l2.set(item.categoryId, /* @__PURE__ */ new Map());
      const l3 = l2.get(item.categoryId);
      if (!l3.has(item.partNameId)) l3.set(item.partNameId, /* @__PURE__ */ new Map());
      const l4 = l3.get(item.partNameId);
      if (!l4.has(item.partCode)) l4.set(item.partCode, []);
      l4.get(item.partCode).push(item);
    }
    const result = [];
    for (const [companyId, l2] of root) {
      const companyName = ((_a = stockCompanies.find((c) => c.id === companyId)) == null ? void 0 : _a.name) ?? "";
      const categories = [];
      for (const [categoryId, l3] of l2) {
        const catName = ((_b = stockCategories.find((c) => c.id === categoryId)) == null ? void 0 : _b.name) ?? "";
        const partNames = [];
        for (const [partNameId, l4] of l3) {
          const pnName = ((_c = stockPartNames.find((p) => p.id === partNameId)) == null ? void 0 : _c.name) ?? "";
          const partCodes = [];
          for (const [partCode, units] of l4) {
            if (q) {
              const matches = companyName.toLowerCase().includes(q) || catName.toLowerCase().includes(q) || pnName.toLowerCase().includes(q) || partCode.toLowerCase().includes(q);
              if (!matches) continue;
            }
            partCodes.push({ partCode, units });
          }
          if (partCodes.length > 0) {
            const totalUnits = partCodes.reduce(
              (s, pc) => s + pc.units.length,
              0
            );
            partNames.push({ partNameId, partCodes, totalUnits });
          }
        }
        if (partNames.length > 0) {
          const totalUnits = partNames.reduce((s, pn) => s + pn.totalUnits, 0);
          categories.push({ categoryId, partNames, totalUnits });
        }
      }
      if (categories.length > 0) {
        const totalUnits = categories.reduce((s, c) => s + c.totalUnits, 0);
        result.push({ companyId, categories, totalUnits });
      }
    }
    return result;
  }, [partItems, stockCompanies, stockCategories, stockPartNames, q]);
  const toggle = (_set, id, setter) => setter((prev) => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          className: "pl-9",
          placeholder: "Search by company, category, part name or part code...",
          value: search,
          onChange: (e) => setSearch(e.target.value),
          "data-ocid": "inventory.search_input"
        }
      ),
      search && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setSearch(""),
          className: "absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-sm overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: tree.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "text-center py-12 text-slate-400 text-sm",
        "data-ocid": "inventory.empty_state",
        children: q ? "No matching parts found." : "No parts in inventory yet."
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: tree.map((company) => {
      var _a;
      const companyName = ((_a = stockCompanies.find((c) => c.id === company.companyId)) == null ? void 0 : _a.name) ?? company.companyId;
      const isCompanyOpen = expandedCompanies.has(company.companyId) || !!q;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "border-b border-slate-100 last:border-0",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors text-left",
                onClick: () => toggle(
                  expandedCompanies,
                  company.companyId,
                  setExpandedCompanies
                ),
                "data-ocid": "inventory.toggle",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                    isCompanyOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "h-4 w-4 text-blue-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Folder, { className: "h-4 w-4 text-slate-400" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1 bg-blue-100 rounded", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-3.5 w-3.5 text-blue-600" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-blue-900", children: companyName })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-0.5 rounded-full font-medium", children: [
                      company.categories.length,
                      " ",
                      company.categories.length === 1 ? "category" : "categories"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-slate-50 text-slate-600 border border-slate-200 px-2.5 py-0.5 rounded-full font-medium", children: [
                      company.totalUnits,
                      " units"
                    ] })
                  ] })
                ]
              }
            ),
            isCompanyOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-slate-100", children: company.categories.map((cat) => {
              var _a2;
              const catName = ((_a2 = stockCategories.find((c) => c.id === cat.categoryId)) == null ? void 0 : _a2.name) ?? cat.categoryId;
              const isCatOpen = expandedCategories.has(cat.categoryId) || !!q;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    className: "w-full flex items-center justify-between pl-10 pr-4 py-2.5 hover:bg-slate-50 transition-colors text-left",
                    onClick: () => toggle(
                      expandedCategories,
                      cat.categoryId,
                      setExpandedCategories
                    ),
                    "data-ocid": "inventory.toggle",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                        isCatOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "h-3.5 w-3.5 text-emerald-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Folder, { className: "h-3.5 w-3.5 text-slate-400" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-0.5 bg-emerald-100 rounded", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-3 w-3 text-emerald-600" }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-emerald-900", children: catName })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded-full", children: [
                          cat.partNames.length,
                          " ",
                          cat.partNames.length === 1 ? "name" : "names"
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-slate-50 text-slate-600 border border-slate-200 px-2 py-0.5 rounded-full", children: [
                          cat.totalUnits,
                          " units"
                        ] })
                      ] })
                    ]
                  }
                ),
                isCatOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: cat.partNames.map((pn) => {
                  var _a3;
                  const pnName = ((_a3 = stockPartNames.find(
                    (p) => p.id === pn.partNameId
                  )) == null ? void 0 : _a3.name) ?? pn.partNameId;
                  const isPnOpen = expandedPartNames.has(pn.partNameId) || !!q;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        className: "w-full flex items-center justify-between pl-16 pr-4 py-2 hover:bg-blue-50 transition-colors text-left group",
                        onClick: () => toggle(
                          expandedPartNames,
                          pn.partNameId,
                          setExpandedPartNames
                        ),
                        "data-ocid": "inventory.button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                            isPnOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3.5 w-3.5 text-blue-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5 text-slate-400" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-3.5 w-3.5 text-blue-400" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-blue-700 font-medium group-hover:underline", children: pnName })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full", children: [
                            pn.partCodes.length,
                            " code",
                            pn.partCodes.length !== 1 ? "s" : ""
                          ] })
                        ]
                      }
                    ),
                    isPnOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pl-20", children: pn.partCodes.map((pcGroup) => {
                      const inStockCount = pcGroup.units.filter(
                        (u) => u.status === "in_stock"
                      ).length;
                      return /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "border-l-2 border-slate-200 ml-1",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "button",
                            {
                              type: "button",
                              className: "w-full flex items-center justify-between pr-4 py-2 pl-3 hover:bg-blue-50 transition-colors text-left group",
                              onClick: () => {
                                var _a4, _b;
                                const pnName2 = ((_a4 = stockPartNames.find(
                                  (p) => p.id === pn.partNameId
                                )) == null ? void 0 : _a4.name) ?? "";
                                const coName = ((_b = stockCompanies.find(
                                  (c) => {
                                    var _a5;
                                    return c.id === ((_a5 = pcGroup.units[0]) == null ? void 0 : _a5.companyId);
                                  }
                                )) == null ? void 0 : _b.name) ?? "";
                                setPartCodePopup({
                                  partCode: pcGroup.partCode,
                                  partName: pnName2,
                                  companyName: coName,
                                  units: pcGroup.units
                                });
                              },
                              "data-ocid": "inventory.toggle",
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-3 w-3 text-slate-400" }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs font-semibold text-blue-700 group-hover:underline", children: pcGroup.partCode }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-green-50 text-green-700 border border-green-200 px-1.5 py-0.5 rounded-full font-medium", children: [
                                    pcGroup.units.length,
                                    " ",
                                    "unit",
                                    pcGroup.units.length !== 1 ? "s" : "",
                                    inStockCount > 0 && inStockCount < pcGroup.units.length && ` · ${inStockCount} in stock`
                                  ] })
                                ] }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" })
                              ]
                            }
                          )
                        },
                        pcGroup.partCode
                      );
                    }) })
                  ] }, pn.partNameId);
                }) })
              ] }, cat.categoryId);
            }) })
          ]
        },
        company.companyId
      );
    }) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PartCodePopup,
      {
        popup: partCodePopup,
        onClose: () => setPartCodePopup(null),
        onNavigate: (id) => navigate("part-detail", void 0, id)
      }
    )
  ] });
}
function PartSearchTab() {
  const {
    partItems,
    stockCompanies,
    stockCategories,
    stockPartNames,
    purchaseEntries,
    vendors,
    navigate
  } = useStore();
  const { locationStr } = useLocationHelpers();
  const [search, setSearch] = reactExports.useState("");
  const [expandedId, setExpandedId] = reactExports.useState(null);
  const q = search.trim().toLowerCase();
  const results = reactExports.useMemo(() => {
    if (!q) return [];
    return partItems.filter((p) => {
      var _a;
      const pnName = ((_a = stockPartNames.find((pn) => pn.id === p.partNameId)) == null ? void 0 : _a.name) ?? "";
      return p.partCode.toLowerCase().includes(q) || pnName.toLowerCase().includes(q);
    }).slice(0, 50);
  }, [partItems, stockPartNames, q]);
  const getInfo = (item) => {
    var _a, _b, _c, _d;
    const company = ((_a = stockCompanies.find((c) => c.id === item.companyId)) == null ? void 0 : _a.name) ?? "";
    const category = ((_b = stockCategories.find((c) => c.id === item.categoryId)) == null ? void 0 : _b.name) ?? "";
    const partName = ((_c = stockPartNames.find((p) => p.id === item.partNameId)) == null ? void 0 : _c.name) ?? "";
    const purchase = purchaseEntries.find((p) => p.id === item.purchaseId);
    const vendorId = purchase == null ? void 0 : purchase.vendorId;
    const vendor = vendorId ? (_d = vendors.find((v) => v.id === vendorId)) == null ? void 0 : _d.name : (purchase == null ? void 0 : purchase.vendorName) ?? "—";
    return {
      company,
      category,
      partName,
      vendor: vendor ?? (purchase == null ? void 0 : purchase.vendorName) ?? "—"
    };
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          className: "pl-9 pr-9",
          placeholder: "Search by part code or name...",
          value: search,
          onChange: (e) => {
            setSearch(e.target.value);
            setExpandedId(null);
          },
          "data-ocid": "inventory.search_input"
        }
      ),
      search && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => {
            setSearch("");
            setExpandedId(null);
          },
          className: "absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600",
          "data-ocid": "inventory.button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
        }
      )
    ] }),
    !q ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16 text-slate-400 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-8 w-8 mx-auto mb-3 opacity-30" }),
      "Search by part code or name..."
    ] }) : results.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-16 text-slate-400 text-sm",
        "data-ocid": "inventory.empty_state",
        children: [
          "No parts found for “",
          search,
          "”."
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-sm overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-slate-100", children: results.map((item, i) => {
      const info = getInfo(item);
      const isExpanded = expandedId === item.id;
      const date = new Date(item.createdAt).toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric"
        }
      );
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { "data-ocid": `inventory.item.${i + 1}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors flex items-start justify-between gap-3",
            onClick: () => setExpandedId(isExpanded ? null : item.id),
            "data-ocid": `inventory.row.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-3.5 w-3.5 text-slate-400 shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold text-slate-800 text-sm", children: item.partCode }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-slate-400", children: date })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-slate-500 mt-0.5 ml-5", children: [
                  info.company,
                  " › ",
                  info.category,
                  " ›",
                  " ",
                  info.partName
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `text-xs px-2 py-0.5 rounded-full font-medium border ${STATUS_STYLES[item.status]}`,
                    children: STATUS_LABELS[item.status]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-slate-500", children: "Qty: 1" })
              ] })
            ]
          }
        ),
        isExpanded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-4 mb-3 p-4 bg-slate-50 rounded-lg border border-slate-200", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono font-bold text-slate-900", children: item.partCode }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-slate-500 mt-0.5", children: [
                info.company,
                " › ",
                info.category,
                " ›",
                " ",
                info.partName
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-xs px-2 py-0.5 rounded-full font-medium border ${STATUS_STYLES[item.status]}`,
                  children: STATUS_LABELS[item.status]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: (e) => {
                    e.stopPropagation();
                    setExpandedId(null);
                  },
                  className: "text-slate-400 hover:text-slate-600",
                  "data-ocid": "inventory.close_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-slate-500", children: "Vendor" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-slate-700 font-medium", children: info.vendor }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-slate-500", children: "Location" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-slate-700", children: locationStr(item) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: "outline",
              className: "text-blue-600 border-blue-300 hover:bg-blue-50",
              onClick: () => navigate("part-detail", void 0, item.id),
              "data-ocid": "inventory.button",
              children: "View Full Details →"
            }
          )
        ] })
      ] }, item.id);
    }) }) }) })
  ] });
}
function RelocateModal({ item, onClose }) {
  var _a;
  const {
    racks,
    shelves,
    bins,
    assignPartLocation,
    stockPartNames,
    partItems
  } = useStore();
  const { locationStr } = useLocationHelpers();
  const [selectedRack, setSelectedRack] = reactExports.useState(item.rackId ?? "");
  const [selectedShelf, setSelectedShelf] = reactExports.useState(item.shelfId ?? "");
  const [selectedBin, setSelectedBin] = reactExports.useState(item.binId ?? "");
  const filteredShelves = shelves.filter((s) => s.rackId === selectedRack);
  const filteredBins = bins.filter((b) => b.shelfId === selectedShelf);
  const partName = ((_a = stockPartNames.find((p) => p.id === item.partNameId)) == null ? void 0 : _a.name) ?? "—";
  const sameCodeSuggestions = reactExports.useMemo(() => {
    const seen = /* @__PURE__ */ new Set();
    const results = [];
    for (const p of partItems) {
      if (p.partCode === item.partCode && p.id !== item.id && p.rackId) {
        const rk = racks.find((r) => r.id === p.rackId);
        const sh = shelves.find((s) => s.id === p.shelfId);
        const bn = bins.find((b) => b.id === p.binId);
        const key = `${p.rackId}-${p.shelfId}-${p.binId}`;
        if (!seen.has(key)) {
          seen.add(key);
          results.push({
            rackName: (rk == null ? void 0 : rk.name) ?? "—",
            shelfName: (sh == null ? void 0 : sh.name) ?? "—",
            binName: (bn == null ? void 0 : bn.name) ?? "—"
          });
        }
      }
    }
    return results;
  }, [partItems, item, racks, shelves, bins]);
  const handleSave = () => {
    assignPartLocation(item.id, selectedRack, selectedShelf, selectedBin);
    onClose();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4",
      "data-ocid": "inventory.modal",
      onKeyDown: (e) => e.key === "Escape" && onClose(),
      role: "presentation",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-slate-200", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-blue-600" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-slate-900", children: "Assign / Relocate" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onClose,
              className: "text-slate-400 hover:text-slate-600",
              "data-ocid": "inventory.close_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-50 rounded-lg px-4 py-3 space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-slate-500 font-medium", children: "Part Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-slate-800", children: partName })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-slate-500 font-medium", children: "Part Code" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm font-bold text-blue-600", children: item.partCode })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-slate-500", children: [
            "Current location:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-slate-700", children: locationStr(item) })
          ] }),
          sameCodeSuggestions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-50 border border-amber-200 rounded-lg px-3 py-2.5 flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "h-4 w-4 text-amber-500 mt-0.5 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-amber-800", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold mb-1", children: "Same part code already located at:" }),
              sameCodeSuggestions.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  className: "font-mono",
                  children: [
                    s.rackName,
                    " › ",
                    s.shelfName,
                    " › ",
                    s.binName
                  ]
                },
                `${s.rackName}-${s.shelfName}-${s.binName}`
              ))
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "relocate-rack",
                  className: "block text-sm font-medium text-slate-700 mb-1",
                  children: "Rack"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  id: "relocate-rack",
                  className: "w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                  value: selectedRack,
                  onChange: (e) => {
                    setSelectedRack(e.target.value);
                    setSelectedShelf("");
                    setSelectedBin("");
                  },
                  "data-ocid": "inventory.select",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "— Select Rack —" }),
                    racks.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: r.id, children: r.name }, r.id))
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "relocate-shelf",
                  className: "block text-sm font-medium text-slate-700 mb-1",
                  children: "Shelf"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  id: "relocate-shelf",
                  className: "w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50",
                  value: selectedShelf,
                  onChange: (e) => {
                    setSelectedShelf(e.target.value);
                    setSelectedBin("");
                  },
                  disabled: !selectedRack,
                  "data-ocid": "inventory.select",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "— Select Shelf —" }),
                    filteredShelves.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s.id, children: s.name }, s.id))
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "relocate-bin",
                  className: "block text-sm font-medium text-slate-700 mb-1",
                  children: "Bin"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  id: "relocate-bin",
                  className: "w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50",
                  value: selectedBin,
                  onChange: (e) => setSelectedBin(e.target.value),
                  disabled: !selectedShelf,
                  "data-ocid": "inventory.select",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "— Select Bin —" }),
                    filteredBins.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: b.id, children: b.name }, b.id))
                  ]
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-3 px-5 py-4 border-t border-slate-200", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              onClick: onClose,
              "data-ocid": "inventory.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleSave,
              disabled: !selectedRack,
              "data-ocid": "inventory.confirm_button",
              children: "Confirm Relocation"
            }
          )
        ] })
      ] })
    }
  );
}
function PartRelocationTab() {
  const {
    partItems,
    stockCompanies,
    stockCategories,
    stockPartNames,
    navigate
  } = useStore();
  const { locationStr } = useLocationHelpers();
  const [search, setSearch] = reactExports.useState("");
  const [relocateItem, setRelocateItem] = reactExports.useState(
    null
  );
  const [expandedCompanies, setExpandedCompanies] = reactExports.useState(
    /* @__PURE__ */ new Set()
  );
  const q = search.trim().toLowerCase();
  const inStockItems = reactExports.useMemo(
    () => partItems.filter((p) => p.status === "in_stock").filter((p) => {
      var _a;
      if (!q) return true;
      const pnName = ((_a = stockPartNames.find((pn) => pn.id === p.partNameId)) == null ? void 0 : _a.name) ?? "";
      return p.partCode.toLowerCase().includes(q) || pnName.toLowerCase().includes(q);
    }),
    [partItems, stockPartNames, q]
  );
  const grouped = reactExports.useMemo(() => {
    const compMap = /* @__PURE__ */ new Map();
    for (const item of inStockItems) {
      if (!compMap.has(item.companyId)) compMap.set(item.companyId, /* @__PURE__ */ new Map());
      const catMap = compMap.get(item.companyId);
      if (!catMap.has(item.categoryId)) catMap.set(item.categoryId, []);
      catMap.get(item.categoryId).push(item);
    }
    const result = [];
    for (const [companyId, catMap] of compMap) {
      const categories = [];
      for (const [categoryId, items] of catMap) {
        categories.push({ categoryId, items });
      }
      result.push({ companyId, categories });
    }
    return result;
  }, [inStockItems]);
  const toggleCompany = (id) => setExpandedCompanies((prev) => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });
  let rowIndex = 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          className: "pl-9 pr-9",
          placeholder: "Search in-stock parts by code or name...",
          value: search,
          onChange: (e) => setSearch(e.target.value),
          "data-ocid": "inventory.search_input"
        }
      ),
      search && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setSearch(""),
          className: "absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: inStockItems.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "text-center py-12 text-slate-400 text-sm",
        "data-ocid": "inventory.empty_state",
        children: q ? "No matching in-stock parts." : "No in-stock parts available."
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: grouped.map((compGroup) => {
      var _a;
      const companyName = ((_a = stockCompanies.find((c) => c.id === compGroup.companyId)) == null ? void 0 : _a.name) ?? compGroup.companyId;
      const totalItems = compGroup.categories.reduce(
        (s, c) => s + c.items.length,
        0
      );
      const isExpanded = expandedCompanies.has(compGroup.companyId) || !!q;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "border-b border-slate-200 last:border-0",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "w-full flex items-center gap-3 px-4 py-3 bg-slate-50 hover:bg-slate-100 transition-colors text-left",
                onClick: () => toggleCompany(compGroup.companyId),
                "data-ocid": "inventory.toggle",
                children: [
                  isExpanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 text-slate-500 shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-slate-400 shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-4 w-4 text-blue-600 shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-slate-800 text-sm flex-1", children: companyName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs", children: [
                    totalItems,
                    " items"
                  ] })
                ]
              }
            ),
            isExpanded && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-slate-100 bg-white", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left pl-10 pr-4 py-2 text-slate-500 font-medium text-xs", children: "Part Code" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-slate-500 font-medium text-xs", children: "Part Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-slate-500 font-medium text-xs", children: "Category" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-slate-500 font-medium text-xs", children: "Current Location" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-slate-500 font-medium text-xs", children: "Action" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: compGroup.categories.map((catGroup) => {
                return catGroup.items.map((item) => {
                  var _a2, _b;
                  rowIndex += 1;
                  const currentIndex = rowIndex;
                  const pnName = ((_a2 = stockPartNames.find(
                    (p) => p.id === item.partNameId
                  )) == null ? void 0 : _a2.name) ?? "";
                  const catName = ((_b = stockCategories.find(
                    (c) => c.id === item.categoryId
                  )) == null ? void 0 : _b.name) ?? "";
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "tr",
                    {
                      className: "border-b border-slate-100 hover:bg-slate-50 transition-colors",
                      "data-ocid": `inventory.row.${currentIndex}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "pl-10 pr-4 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "button",
                            className: "font-mono text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1",
                            onClick: () => navigate(
                              "part-detail",
                              void 0,
                              item.id
                            ),
                            "data-ocid": `inventory.link.${currentIndex}`,
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-3 w-3" }),
                              item.partCode
                            ]
                          }
                        ) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-slate-700 text-xs", children: pnName }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-slate-500 text-xs", children: catName }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-slate-500 text-xs", children: locationStr(item) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Button,
                          {
                            size: "sm",
                            variant: "outline",
                            className: "text-blue-600 border-blue-300 hover:bg-blue-50 text-xs",
                            onClick: () => setRelocateItem(item),
                            "data-ocid": `inventory.edit_button.${currentIndex}`,
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3 mr-1" }),
                              "Relocate"
                            ]
                          }
                        ) })
                      ]
                    },
                    item.id
                  );
                });
              }) })
            ] }) })
          ]
        },
        compGroup.companyId
      );
    }) }) }) }),
    relocateItem && /* @__PURE__ */ jsxRuntimeExports.jsx(
      RelocateModal,
      {
        item: relocateItem,
        onClose: () => setRelocateItem(null)
      }
    )
  ] });
}
const TABS = [
  { id: "spare-parts", label: "Spare Parts", icon: PackageOpen },
  { id: "part-search", label: "Part Search", icon: Search },
  { id: "part-relocation", label: "Part Relocation", icon: ArrowLeftRight }
];
function InventoryPage() {
  const [activeTab, setActiveTab] = reactExports.useState("spare-parts");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl px-6 py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 bg-white/20 rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-6 w-6" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Inventory" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-emerald-200 text-sm", children: "Manage and search spare parts stock" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-slate-200 bg-white/80", children: /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex gap-1 px-1", "aria-label": "Inventory tabs", children: TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        className: `flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold transition-all border-b-2 -mb-px ${activeTab === tab.id ? "border-emerald-600 text-emerald-600 bg-emerald-50/60" : "border-transparent text-slate-500 hover:text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50/40"}`,
        onClick: () => setActiveTab(tab.id),
        "data-ocid": "inventory.tab",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(tab.icon, { className: "h-4 w-4" }),
          tab.label
        ]
      },
      tab.id
    )) }) }),
    activeTab === "spare-parts" && /* @__PURE__ */ jsxRuntimeExports.jsx(SparePartsTab, {}),
    activeTab === "part-search" && /* @__PURE__ */ jsxRuntimeExports.jsx(PartSearchTab, {}),
    activeTab === "part-relocation" && /* @__PURE__ */ jsxRuntimeExports.jsx(PartRelocationTab, {})
  ] });
}
export {
  InventoryPage as default
};
