import { c as createLucideIcon, u as useStore, r as reactExports, C as CircleCheckBig, R as RotateCcw, j as jsxRuntimeExports, w as Button, V as Search, I as Input, X, i as Card, m as CardContent, T as TriangleAlert, z as Label, a6 as Package, H as Select, J as SelectTrigger, K as SelectValue, N as SelectContent, O as SelectItem, G as ue, a3 as ChevronUp, E as ChevronDown } from "./index-De7Q6SQO.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-CsjrwcpS.js";
import { T as Textarea } from "./textarea-CYtE04I-.js";
import { S as Send } from "./send-oapnhRw6.js";
import { P as Plus } from "./plus-B5kdLRRW.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12h.01", key: "nlz23k" }],
  ["path", { d: "M3 18h.01", key: "1tta3j" }],
  ["path", { d: "M3 6h.01", key: "1rqtza" }],
  ["path", { d: "M8 12h13", key: "1za7za" }],
  ["path", { d: "M8 18h13", key: "1lx6n3" }],
  ["path", { d: "M8 6h13", key: "ik3vkj" }]
];
const List = createLucideIcon("list", __iconNode);
const STATUS_STYLES = {
  in_stock: "bg-green-100 text-green-700",
  issued: "bg-amber-100 text-amber-700",
  installed: "bg-blue-100 text-blue-700",
  returned_to_company: "bg-red-100 text-red-700",
  returned_to_store: "bg-slate-100 text-slate-600"
};
const STATUS_LABELS = {
  issued: "Issued",
  installed: "Installed",
  returned_to_company: "Returned to Co.",
  returned_to_store: "Returned to Store",
  in_stock: "In Stock"
};
function IssuedPartsPage() {
  const {
    partItems,
    stockCompanies,
    stockCategories,
    stockPartNames,
    technicians,
    cases,
    racks,
    shelves,
    bins,
    navigate,
    markPartInstalled,
    returnPartToStore,
    returnPartToCompany,
    issuePartToTechnician
  } = useStore();
  const [search, setSearch] = reactExports.useState("");
  const [activeTab, setActiveTab] = reactExports.useState("all");
  const [dateFrom, setDateFrom] = reactExports.useState("");
  const [dateTo, setDateTo] = reactExports.useState("");
  const [statusPopupId, setStatusPopupId] = reactExports.useState(null);
  const [pendingAction, setPendingAction] = reactExports.useState(null);
  const [actionRemarks, setActionRemarks] = reactExports.useState("");
  const [returnCompanyReason, setReturnCompanyReason] = reactExports.useState("");
  const [issueModal, setIssueModal] = reactExports.useState(false);
  const [partSearch, setPartSearch] = reactExports.useState("");
  const [showSuggestions, setShowSuggestions] = reactExports.useState(false);
  const [selectedPartCode, setSelectedPartCode] = reactExports.useState("");
  const [issueQty, setIssueQty] = reactExports.useState(1);
  const [issueTechId, setIssueTechId] = reactExports.useState("");
  const [issueCaseId, setIssueCaseId] = reactExports.useState("");
  const [issueNotes, setIssueNotes] = reactExports.useState("");
  const [issueErrors, setIssueErrors] = reactExports.useState({});
  const [expandedGroups, setExpandedGroups] = reactExports.useState(/* @__PURE__ */ new Set());
  const [caseSuggestions, setCaseSuggestions] = reactExports.useState([]);
  const [showCaseSuggestions, setShowCaseSuggestions] = reactExports.useState(false);
  const [caseNotFoundWarning, setCaseNotFoundWarning] = reactExports.useState(false);
  const toggleGroup = (key) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };
  const getTechName = (id) => {
    var _a;
    return ((_a = technicians.find((t) => t.id === id)) == null ? void 0 : _a.name) ?? id;
  };
  const getCompany = (companyId) => {
    var _a;
    return ((_a = stockCompanies.find((c) => c.id === companyId)) == null ? void 0 : _a.name) ?? "";
  };
  const getCategory = (categoryId) => {
    var _a;
    return ((_a = stockCategories.find((c) => c.id === categoryId)) == null ? void 0 : _a.name) ?? "";
  };
  const getPartName = (partNameId) => {
    var _a;
    return ((_a = stockPartNames.find((p) => p.id === partNameId)) == null ? void 0 : _a.name) ?? "";
  };
  const getCompanyDisplay = (p) => {
    var _a;
    return ((_a = stockCompanies.find((c) => c.id === p.companyId)) == null ? void 0 : _a.name) || p.overrideCompanyName || "";
  };
  const getPartNameDisplay = (p) => {
    var _a;
    return ((_a = stockPartNames.find((pn) => pn.id === p.partNameId)) == null ? void 0 : _a.name) || p.overridePartName || "";
  };
  const getLocation = (p) => {
    const rack = racks.find((r) => r.id === p.rackId);
    const shelf = shelves.find((s) => s.id === p.shelfId);
    const bin = bins.find((b) => b.id === p.binId);
    if (!rack) return null;
    return [rack.name, shelf == null ? void 0 : shelf.name, bin == null ? void 0 : bin.name].filter(Boolean).join(" / ");
  };
  const trackedItems = partItems.filter(
    (p) => p.status === "issued" || p.status === "installed" || p.status === "returned_to_store"
  ).sort(
    (a, b) => new Date(b.issueDate || b.createdAt).getTime() - new Date(a.issueDate || a.createdAt).getTime()
  );
  const filterItems = (items) => {
    return items.filter((p) => {
      const matchSearch = !search || p.partCode.toLowerCase().includes(search.toLowerCase()) || getTechName(p.technicianId ?? "").toLowerCase().includes(search.toLowerCase()) || (p.caseId ?? "").toLowerCase().includes(search.toLowerCase());
      const issueDate = p.issueDate ? new Date(p.issueDate) : null;
      const matchFrom = !dateFrom || issueDate && issueDate >= new Date(dateFrom);
      const matchTo = !dateTo || issueDate && issueDate <= /* @__PURE__ */ new Date(`${dateTo}T23:59:59`);
      return matchSearch && matchFrom && matchTo;
    });
  };
  const allFiltered = filterItems(trackedItems);
  const issuedFiltered = filterItems(
    trackedItems.filter((p) => p.status === "issued")
  );
  const installedFiltered = filterItems(
    trackedItems.filter((p) => p.status === "installed")
  );
  const returnedFiltered = filterItems(
    trackedItems.filter((p) => p.status === "returned_to_store")
  );
  const tabItems = {
    all: allFiltered,
    issued: issuedFiltered,
    installed: installedFiltered,
    returned: returnedFiltered
  };
  const displayItems = tabItems[activeTab];
  const inStockItems = partItems.filter((p) => p.status === "in_stock");
  const partCodeGroups = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (const p of inStockItems) {
      const arr = map.get(p.partCode) ?? [];
      arr.push(p);
      map.set(p.partCode, arr);
    }
    return map;
  }, [inStockItems]);
  const filteredSuggestions = reactExports.useMemo(() => {
    if (!partSearch || !showSuggestions) return [];
    const q = partSearch.toLowerCase();
    const results = [];
    partCodeGroups.forEach((items, code) => {
      const sample = items[0];
      if (code.toLowerCase().includes(q) || getPartName(sample.partNameId).toLowerCase().includes(q)) {
        results.push({ partCode: code, items, sample });
      }
    });
    return results.slice(0, 8);
  }, [partSearch, partCodeGroups, showSuggestions]);
  const selectedGroup = selectedPartCode ? partCodeGroups.get(selectedPartCode) : null;
  const selectedSample = selectedGroup == null ? void 0 : selectedGroup[0];
  const availableQty = (selectedGroup == null ? void 0 : selectedGroup.length) ?? 0;
  const openIssueModal = () => {
    setPartSearch("");
    setShowSuggestions(false);
    setSelectedPartCode("");
    setIssueQty(1);
    setIssueTechId("");
    setIssueCaseId("");
    setIssueNotes("");
    setIssueErrors({});
    setCaseSuggestions([]);
    setShowCaseSuggestions(false);
    setCaseNotFoundWarning(false);
    setIssueModal(true);
  };
  const handleSelectSuggestion = (partCode) => {
    setSelectedPartCode(partCode);
    setPartSearch(partCode);
    setShowSuggestions(false);
    setIssueQty(1);
  };
  const handleChangePart = () => {
    setSelectedPartCode("");
    setPartSearch("");
    setShowSuggestions(false);
    setIssueQty(1);
  };
  const handleIssue = () => {
    const errs = {};
    if (!selectedPartCode) errs.part = "Select a part";
    if (!issueTechId) errs.tech = "Select a technician";
    if (!issueCaseId.trim()) errs.caseId = "Case ID is required";
    if (Object.keys(errs).length > 0) {
      setIssueErrors(errs);
      return;
    }
    const toIssue = (selectedGroup ?? []).slice(0, issueQty);
    for (const p of toIssue) {
      issuePartToTechnician(p.id, issueTechId, issueCaseId.trim());
    }
    ue.success("Part issued to technician");
    setIssueModal(false);
  };
  const statusPart = statusPopupId ? partItems.find((p) => p.id === statusPopupId) : null;
  const confirmStatusAction = () => {
    if (!statusPopupId || !pendingAction) return;
    if (pendingAction === "install") markPartInstalled(statusPopupId);
    else if (pendingAction === "return")
      returnPartToStore(statusPopupId, actionRemarks);
    else if (pendingAction === "return_company")
      returnPartToCompany(
        statusPopupId,
        returnCompanyReason || "Company return",
        actionRemarks
      );
    setStatusPopupId(null);
    setPendingAction(null);
    setActionRemarks("");
    setReturnCompanyReason("");
  };
  const TAB_DEFS = [
    {
      value: "all",
      label: "All",
      count: allFiltered.length,
      color: "bg-slate-500",
      icon: List
    },
    {
      value: "issued",
      label: "Issued",
      count: issuedFiltered.length,
      color: "bg-amber-500",
      icon: Send
    },
    {
      value: "installed",
      label: "Installed",
      count: installedFiltered.length,
      color: "bg-blue-500",
      icon: CircleCheckBig
    },
    {
      value: "returned",
      label: "Returned to Store",
      count: returnedFiltered.length,
      color: "bg-slate-400",
      icon: RotateCcw
    }
  ];
  const getGroupBorderColor = (items) => {
    const statuses = items.map((i) => i.status);
    if (statuses.includes("issued")) return "border-l-amber-400";
    if (statuses.includes("installed")) return "border-l-blue-400";
    if (statuses.includes("returned_to_store")) return "border-l-slate-400";
    return "border-l-slate-300";
  };
  const PartTable = ({ items }) => {
    const groups = reactExports.useMemo(() => {
      const map = /* @__PURE__ */ new Map();
      for (const item of items) {
        const arr = map.get(item.partCode) ?? [];
        arr.push(item);
        map.set(item.partCode, arr);
      }
      return [...map.entries()].map(([code, groupItems]) => ({
        code,
        groupItems
      }));
    }, [items]);
    if (items.length === 0) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "text-center py-10 text-slate-400 text-sm",
          "data-ocid": "issued.empty_state",
          children: "No records found."
        }
      );
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-slate-100", children: groups.map(({ code, groupItems }, gIdx) => {
      var _a;
      const isExpanded = expandedGroups.has(code);
      const sample = groupItems[0];
      const borderColor = getGroupBorderColor(groupItems);
      const dominantStatus = groupItems.some((i) => i.status === "issued") ? "issued" : groupItems.some((i) => i.status === "installed") ? "installed" : ((_a = groupItems[0]) == null ? void 0 : _a.status) ?? "issued";
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `border-l-4 ${borderColor}`,
          "data-ocid": `issued.item.${gIdx + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors text-left",
                onClick: () => toggleGroup(code),
                "data-ocid": `issued.toggle.${gIdx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        className: "font-mono text-xs font-semibold text-blue-600 hover:underline flex-shrink-0",
                        onClick: (e) => {
                          e.stopPropagation();
                          navigate("part-detail", void 0, sample.id);
                        },
                        "data-ocid": `issued.link.${gIdx + 1}`,
                        children: code
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-slate-500 truncate hidden sm:block", children: [
                      getCompanyDisplay(sample),
                      " • ",
                      getPartNameDisplay(sample)
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${STATUS_STYLES[dominantStatus] ?? "bg-slate-100 text-slate-600"}`,
                        children: STATUS_LABELS[dominantStatus] ?? dominantStatus
                      }
                    ),
                    groupItems.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded-full font-medium flex-shrink-0", children: [
                      groupItems.length,
                      " units"
                    ] })
                  ] }),
                  isExpanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-4 w-4 text-slate-400 flex-shrink-0 ml-2" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 text-slate-400 flex-shrink-0 ml-2" })
                ]
              }
            ),
            isExpanded && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-slate-100 bg-slate-50/80", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-2 py-1.5 text-slate-500 font-medium text-xs", children: "Technician" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-2 py-1.5 text-slate-500 font-medium text-xs", children: "Case ID" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-2 py-1.5 text-slate-500 font-medium text-xs", children: "Issue Date" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-2 py-1.5 text-slate-500 font-medium text-xs", children: "Status" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-2 py-1.5 text-slate-500 font-medium text-xs", children: "Actions" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: groupItems.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: "border-b border-slate-50 hover:bg-slate-50/50",
                  "data-ocid": `issued.row.${gIdx * 10 + i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-2 text-slate-700 text-xs", children: p.technicianId ? getTechName(p.technicianId) : "-" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-2 text-slate-600 font-mono text-xs", children: p.caseId || "-" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-2 text-slate-500 text-xs", children: p.issueDate ? new Date(p.issueDate).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short"
                    }) : "-" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-2", children: p.status === "issued" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        className: `inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium cursor-pointer hover:opacity-80 transition-opacity ${STATUS_STYLES[p.status]}`,
                        onClick: () => {
                          setStatusPopupId(p.id);
                          setPendingAction(null);
                          setActionRemarks("");
                        },
                        "data-ocid": `issued.status_button.${gIdx * 10 + i + 1}`,
                        children: [
                          STATUS_LABELS[p.status],
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3 w-3 opacity-70" })
                        ]
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_STYLES[p.status]}`,
                        children: STATUS_LABELS[p.status]
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1", children: p.status === "issued" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        className: "text-xs text-blue-600 hover:underline",
                        onClick: () => navigate("part-detail", void 0, p.id),
                        children: "View"
                      }
                    ) }) })
                  ]
                },
                p.id
              )) })
            ] }) })
          ]
        },
        code
      );
    }) });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl px-6 py-5 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 bg-white/20 rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Issued Parts" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-amber-200 text-sm", children: "Track parts issued to technicians" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: openIssueModal,
          className: "bg-white text-amber-600 hover:bg-amber-50",
          "data-ocid": "issued.open_modal_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-1" }),
            " Issue Part"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-w-48 w-52", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            className: "pl-9",
            placeholder: "Search...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            "data-ocid": "issued.search_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 bg-slate-100 rounded-lg p-1", children: TAB_DEFS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setActiveTab(tab.value),
          className: `flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${activeTab === tab.value ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-700"}`,
          "data-ocid": "issued.tab",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(tab.icon, { className: "h-3.5 w-3.5" }),
            tab.label,
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-white text-xs rounded-full px-1.5 py-0.5 leading-none ${tab.color}`,
                children: tab.count
              }
            )
          ]
        },
        tab.value
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-slate-500 font-medium whitespace-nowrap", children: "From" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "date",
            className: "text-sm w-36 h-9",
            value: dateFrom,
            onChange: (e) => setDateFrom(e.target.value),
            "data-ocid": "issued.date_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-slate-500 font-medium whitespace-nowrap", children: "To" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "date",
            className: "text-sm w-36 h-9",
            value: dateTo,
            onChange: (e) => setDateTo(e.target.value),
            "data-ocid": "issued.date_input"
          }
        )
      ] }),
      (search || dateFrom || dateTo) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          variant: "ghost",
          className: "text-slate-500",
          onClick: () => {
            setSearch("");
            setDateFrom("");
            setDateTo("");
          },
          "data-ocid": "issued.cancel_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5 mr-1" }),
            " Clear"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PartTable, { items: displayItems }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!statusPopupId,
        onOpenChange: (open) => {
          if (!open) {
            setStatusPopupId(null);
            setPendingAction(null);
            setActionRemarks("");
            setReturnCompanyReason("");
          }
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", "data-ocid": "issued.dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Update Issue Status" }) }) }),
          statusPart && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-50 rounded-lg p-3 space-y-1.5 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500", children: "Part Code" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold text-blue-600", children: statusPart.partCode })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500", children: "Part Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-slate-800", children: getPartName(statusPart.partNameId) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500", children: "Qty Issued" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-slate-800", children: "1 unit" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500", children: "Technician" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-slate-800", children: statusPart.technicianId ? getTechName(statusPart.technicianId) : "-" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500", children: "Case ID" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-slate-800", children: statusPart.caseId || "-" })
              ] })
            ] }),
            !pendingAction ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    className: "flex-1 bg-green-600 hover:bg-green-700",
                    onClick: () => setPendingAction("install"),
                    "data-ocid": "issued.primary_button",
                    children: "Mark Installed"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    className: "flex-1 border-purple-300 text-purple-700 hover:bg-purple-50",
                    onClick: () => setPendingAction("return"),
                    "data-ocid": "issued.secondary_button",
                    children: "Return to Store"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  className: "w-full border-red-200 text-red-600 hover:bg-red-50",
                  onClick: () => setPendingAction("return_company"),
                  "data-ocid": "issued.return_company_button",
                  children: "Return to Company"
                }
              )
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-xs text-amber-700 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3.5 w-3.5 shrink-0" }),
                pendingAction === "install" ? "Mark this part as installed?" : pendingAction === "return_company" ? "Return this part to company? This will permanently remove it from inventory." : "Return this part to the store?"
              ] }),
              pendingAction === "return" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Remarks (optional)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    className: "mt-1 text-sm",
                    rows: 2,
                    value: actionRemarks,
                    onChange: (e) => setActionRemarks(e.target.value),
                    placeholder: "Reason for return...",
                    "data-ocid": "issued.textarea"
                  }
                )
              ] }),
              pendingAction === "return_company" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Reason *" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "text",
                      className: "mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500",
                      placeholder: "Reason for return to company...",
                      value: returnCompanyReason,
                      onChange: (e) => setReturnCompanyReason(e.target.value)
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Remarks (optional)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Textarea,
                    {
                      className: "mt-1 text-sm",
                      rows: 2,
                      value: actionRemarks,
                      onChange: (e) => setActionRemarks(e.target.value),
                      placeholder: "Additional remarks...",
                      "data-ocid": "issued.textarea"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    className: "flex-1",
                    onClick: () => {
                      setPendingAction(null);
                      setActionRemarks("");
                      setReturnCompanyReason("");
                    },
                    "data-ocid": "issued.cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    disabled: pendingAction === "return_company" && !returnCompanyReason.trim(),
                    className: `flex-1 ${pendingAction === "install" ? "bg-green-600 hover:bg-green-700" : pendingAction === "return_company" ? "bg-red-600 hover:bg-red-700" : "bg-purple-600 hover:bg-purple-700"}`,
                    onClick: confirmStatusAction,
                    "data-ocid": "issued.confirm_button",
                    children: "Confirm"
                  }
                )
              ] })
            ] })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: issueModal, onOpenChange: setIssueModal, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", "data-ocid": "issued.modal", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-5 w-5 text-blue-600" }),
        " Issue Part to Technician"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 max-h-[70vh] overflow-y-auto pr-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Search Part Code (In Stock Only) *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                className: "pl-9 pr-8",
                placeholder: "Enter part code or name...",
                value: partSearch,
                onChange: (e) => {
                  setPartSearch(e.target.value);
                  setShowSuggestions(true);
                  if (selectedPartCode && e.target.value !== selectedPartCode) {
                    setSelectedPartCode("");
                  }
                },
                onFocus: () => setShowSuggestions(true),
                "data-ocid": "issued.search_input"
              }
            ),
            partSearch && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600",
                onClick: () => {
                  setPartSearch("");
                  setSelectedPartCode("");
                  setShowSuggestions(false);
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" })
              }
            )
          ] }),
          issueErrors.part && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs text-red-500 mt-1",
              "data-ocid": "issued.error_state",
              children: issueErrors.part
            }
          ),
          showSuggestions && partSearch && filteredSuggestions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 border border-slate-200 rounded-lg max-h-44 overflow-y-auto shadow-sm", children: filteredSuggestions.map(({ partCode, items, sample }) => {
            const loc = getLocation(sample);
            const locLabel = loc ? "In Warehouse" : "Pending Location";
            const locStyle = loc ? "text-green-600" : "text-amber-600";
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "w-full text-left px-3 py-2.5 hover:bg-blue-50 text-sm border-b border-slate-100 last:border-0",
                onMouseDown: (e) => {
                  e.preventDefault();
                  handleSelectSuggestion(partCode);
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold text-blue-600", children: partCode }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "|" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-600 text-xs", children: [
                    getCompany(sample.companyId),
                    " ›",
                    " ",
                    getCategory(sample.categoryId),
                    " ›",
                    " ",
                    getPartName(sample.partNameId)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "|" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs font-medium ${locStyle}`, children: locLabel }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "|" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-slate-500", children: [
                    "Qty: ",
                    items.length
                  ] })
                ] })
              },
              partCode
            );
          }) }),
          showSuggestions && partSearch && filteredSuggestions.length === 0 && !selectedPartCode && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 mt-1", children: "No in-stock parts found" })
        ] }),
        selectedPartCode && selectedSample && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-blue-200 rounded-lg p-4 bg-blue-50 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-blue-800 text-sm font-mono", children: selectedPartCode }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "text-xs text-blue-600 hover:text-blue-800 underline font-medium",
                onClick: handleChangePart,
                children: "Change"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-y-1.5 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500", children: "Company" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-slate-800", children: getCompany(selectedSample.companyId) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500", children: "Part Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-slate-800", children: getPartName(selectedSample.partNameId) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500", children: "Available" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-green-700", children: [
              availableQty,
              " unit",
              availableQty !== 1 ? "s" : ""
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500", children: "Location" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `font-medium text-sm ${getLocation(selectedSample) ? "text-slate-800" : "text-amber-600"}`,
                children: getLocation(selectedSample) ?? "Pending Location"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-slate-600", children: "Issue Quantity *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "number",
                min: 1,
                max: availableQty,
                value: issueQty,
                onChange: (e) => {
                  const val = Math.min(
                    Math.max(1, Number(e.target.value)),
                    availableQty
                  );
                  setIssueQty(val);
                },
                className: "mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                "data-ocid": "issued.input"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Technician *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: issueTechId, onValueChange: setIssueTechId, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "mt-1", "data-ocid": "issued.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select technician" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: technicians.filter((t) => t.isActive).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: t.id, children: [
              t.name,
              t.technicianCode ? ` (${t.technicianCode})` : ""
            ] }, t.id)) })
          ] }),
          issueErrors.tech && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs text-red-500 mt-1",
              "data-ocid": "issued.error_state",
              children: issueErrors.tech
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Case ID *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                className: "pl-9 pr-8",
                value: issueCaseId,
                onChange: (e) => {
                  const val = e.target.value;
                  setIssueCaseId(val);
                  setCaseNotFoundWarning(false);
                  if (val.trim().length >= 1) {
                    const matches = cases.filter(
                      (c) => c.caseId.toLowerCase().includes(val.toLowerCase()) || c.customerName.toLowerCase().includes(val.toLowerCase())
                    ).slice(0, 5);
                    setCaseSuggestions(matches);
                    setShowCaseSuggestions(true);
                  } else {
                    setCaseSuggestions([]);
                    setShowCaseSuggestions(false);
                  }
                },
                onBlur: () => setTimeout(() => setShowCaseSuggestions(false), 150),
                onFocus: () => {
                  if (issueCaseId.trim().length >= 1 && caseSuggestions.length > 0)
                    setShowCaseSuggestions(true);
                },
                placeholder: "e.g. MD-2024-001",
                "data-ocid": "issued.input"
              }
            ),
            issueCaseId && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600",
                onClick: () => {
                  setIssueCaseId("");
                  setCaseSuggestions([]);
                  setCaseNotFoundWarning(false);
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" })
              }
            )
          ] }),
          showCaseSuggestions && caseSuggestions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 border border-slate-200 rounded-lg max-h-44 overflow-y-auto shadow-sm bg-white z-10 relative", children: caseSuggestions.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "w-full text-left px-3 py-2 hover:bg-blue-50 text-sm border-b border-slate-100 last:border-0",
              onMouseDown: (e) => {
                e.preventDefault();
                setIssueCaseId(c.caseId);
                setCaseSuggestions([]);
                setShowCaseSuggestions(false);
                setCaseNotFoundWarning(false);
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold text-blue-600 text-xs", children: c.caseId }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500 text-xs", children: c.customerName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 capitalize", children: c.status.replace(/_/g, " ") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400 text-xs", children: c.productType })
              ] })
            },
            c.id
          )) }),
          showCaseSuggestions && issueCaseId.trim().length >= 1 && caseSuggestions.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 border border-amber-200 bg-amber-50 rounded-lg p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-amber-700 font-medium mb-2", children: [
              '⚠ No case found with ID "',
              issueCaseId,
              '". Do you want to proceed?'
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "text-xs px-2.5 py-1 rounded bg-amber-600 text-white hover:bg-amber-700",
                  onClick: () => {
                    setCaseNotFoundWarning(true);
                    setShowCaseSuggestions(false);
                  },
                  children: "Proceed anyway"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "text-xs px-2.5 py-1 rounded border border-slate-300 text-slate-600 hover:bg-slate-50",
                  onClick: () => {
                    setIssueCaseId("");
                    setShowCaseSuggestions(false);
                  },
                  children: "Clear"
                }
              )
            ] })
          ] }),
          caseNotFoundWarning && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber-600 mt-1", children: "⚠ Proceeding with unverified Case ID" }),
          issueErrors.caseId && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs text-red-500 mt-1",
              "data-ocid": "issued.error_state",
              children: issueErrors.caseId
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Notes (optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              className: "mt-1",
              value: issueNotes,
              onChange: (e) => setIssueNotes(e.target.value),
              placeholder: "Additional notes...",
              rows: 2,
              "data-ocid": "issued.textarea"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2 border-t border-slate-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            className: "flex-1",
            onClick: () => setIssueModal(false),
            "data-ocid": "issued.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "flex-1 bg-blue-600 hover:bg-blue-700",
            onClick: handleIssue,
            "data-ocid": "issued.confirm_button",
            children: "Issue Part"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  IssuedPartsPage as default
};
