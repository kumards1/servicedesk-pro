import { c as createLucideIcon, u as useStore, r as reactExports, j as jsxRuntimeExports, w as Button, ac as Badge, x as Clock, F as CircleX, V as Search, I as Input, a6 as Package, i as Card, a3 as ChevronUp, E as ChevronDown, m as CardContent, ab as User, G as ue, C as CircleCheckBig, z as Label, H as Select, J as SelectTrigger, K as SelectValue, N as SelectContent, O as SelectItem } from "./index-De7Q6SQO.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-CsjrwcpS.js";
import { T as Textarea } from "./textarea-CYtE04I-.js";
import { R as RefreshCw } from "./refresh-cw-BD-tKuOV.js";
import { E as Eye } from "./eye-E-8cL4pI.js";
import { D as Download } from "./download-EX2SZm82.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m4.9 4.9 14.2 14.2", key: "1m5liu" }]
];
const Ban = createLucideIcon("ban", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["polyline", { points: "22 12 16 12 14 15 10 15 8 12 2 12", key: "o97t9d" }],
  [
    "path",
    {
      d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
      key: "oot6mr"
    }
  ]
];
const Inbox = createLucideIcon("inbox", __iconNode);
const PRIORITY_COLORS = {
  low: "bg-slate-100 text-slate-600 border-slate-200",
  normal: "bg-blue-100 text-blue-700 border-blue-200",
  high: "bg-orange-100 text-orange-700 border-orange-200",
  urgent: "bg-red-100 text-red-700 border-red-200"
};
const PRIORITY_LABEL = {
  low: "Low",
  normal: "Normal",
  high: "High",
  urgent: "🔥 Urgent"
};
const STATUS_BORDER = {
  pending: "border-l-amber-400",
  issued: "border-l-emerald-400",
  rejected: "border-l-red-400",
  cancelled: "border-l-slate-300"
};
const STOCK_STATUS_COLORS = {
  inStock: "bg-emerald-50 text-emerald-700 border-emerald-200",
  notInStock: "bg-red-50 text-red-700 border-red-200",
  withTechnician: "bg-amber-50 text-amber-700 border-amber-200",
  installed: "bg-blue-50 text-blue-700 border-blue-200"
};
function PartRequestsPage() {
  const {
    partRequests,
    technicians,
    partItems,
    currentUser,
    issuePartRequest,
    rejectPartRequest,
    cancelPartRequest,
    addAuditEntry,
    navigate,
    syncPartRequests,
    markPartRequestsSeen
  } = useStore();
  const getStockStatus = (partCode) => {
    var _a;
    if (!(partCode == null ? void 0 : partCode.trim()))
      return {
        label: "—",
        colorClass: "text-muted-foreground",
        inStock: false
      };
    const inStockItems = partItems.filter(
      (p) => p.partCode.toLowerCase() === partCode.toLowerCase() && p.status === "in_stock"
    );
    if (inStockItems.length > 0) {
      const detail = (currentUser == null ? void 0 : currentUser.role) === "backend_user" ? "✓ In Stock" : `In Stock (${inStockItems.length} unit${inStockItems.length !== 1 ? "s" : ""})`;
      return {
        label: detail,
        colorClass: STOCK_STATUS_COLORS.inStock,
        inStock: true
      };
    }
    if ((currentUser == null ? void 0 : currentUser.role) !== "backend_user") {
      const withTech = partItems.find(
        (p) => p.partCode.toLowerCase() === partCode.toLowerCase() && p.status === "issued"
      );
      if (withTech) {
        const techName = ((_a = technicians.find((t) => t.id === withTech.technicianId)) == null ? void 0 : _a.name) ?? "technician";
        return {
          label: `With ${techName}`,
          colorClass: STOCK_STATUS_COLORS.withTechnician,
          inStock: false
        };
      }
      const installed = partItems.find(
        (p) => p.partCode.toLowerCase() === partCode.toLowerCase() && p.status === "installed"
      );
      if (installed)
        return {
          label: "Installed",
          colorClass: STOCK_STATUS_COLORS.installed,
          inStock: false
        };
    }
    return {
      label: "✗ Not in Stock",
      colorClass: STOCK_STATUS_COLORS.notInStock,
      inStock: false
    };
  };
  const getGreeting = () => {
    const h = (/* @__PURE__ */ new Date()).getHours();
    return h < 12 ? "Good Morning" : h < 17 ? "Good Afternoon" : "Good Evening";
  };
  const canSeePrice = (currentUser == null ? void 0 : currentUser.role) === "admin" || (currentUser == null ? void 0 : currentUser.role) === "backend_user";
  const [activeTab, setActiveTab] = reactExports.useState("pending");
  const [issueModal, setIssueModal] = reactExports.useState(null);
  const [issuePartModal, setIssuePartModal] = reactExports.useState(null);
  const [rejectModal, setRejectModal] = reactExports.useState(null);
  const [selectedTech, setSelectedTech] = reactExports.useState("");
  const [rejectReason, setRejectReason] = reactExports.useState("");
  const [imageModal, setImageModal] = reactExports.useState(null);
  const [refreshing, setRefreshing] = reactExports.useState(false);
  const [expandedIds, setExpandedIds] = reactExports.useState(/* @__PURE__ */ new Set());
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [filterDate, setFilterDate] = reactExports.useState("");
  reactExports.useEffect(() => {
    syncPartRequests();
    markPartRequestsSeen();
  }, []);
  reactExports.useEffect(() => {
    setSearchQuery("");
    setFilterDate("");
  }, [activeTab]);
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await syncPartRequests();
      ue.success("Requests refreshed");
    } catch {
      ue.error("Failed to refresh");
    } finally {
      setRefreshing(false);
    }
  };
  const toggleExpand = (id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const isPrivileged = (currentUser == null ? void 0 : currentUser.role) === "admin" || (currentUser == null ? void 0 : currentUser.role) === "supervisor";
  const visible = partRequests.filter((r) => {
    if (!isPrivileged && r.requestedBy !== (currentUser == null ? void 0 : currentUser.id)) return false;
    if (activeTab === "all") return true;
    return r.status === activeTab;
  });
  const deduplicated = (() => {
    var _a;
    const seen = /* @__PURE__ */ new Map();
    const sorted = [...visible].sort(
      (a, b) => new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime()
    );
    for (const req of sorted) {
      const codes = (req.parts && req.parts.length > 0 ? req.parts.map((p) => p.partCode.trim().toLowerCase()) : [((_a = req.partCode) == null ? void 0 : _a.trim().toLowerCase()) ?? ""]).sort().join(",");
      const key = `${req.caseId}::${codes}`;
      if (!seen.has(key)) seen.set(key, req);
    }
    return Array.from(seen.values());
  })();
  const filtered = deduplicated.filter((r) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matches = r.caseId.toLowerCase().includes(q) || r.partName.toLowerCase().includes(q) || r.partCode.toLowerCase().includes(q) || r.customerName.toLowerCase().includes(q) || r.requestedByName.toLowerCase().includes(q);
      if (!matches) return false;
    }
    if (filterDate) {
      const reqDate = r.requestedAt ? r.requestedAt.split("T")[0] : "";
      if (reqDate !== filterDate) return false;
    }
    return true;
  }).sort(
    (a, b) => new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime()
  );
  const pendingCount = (() => {
    var _a;
    const pendingVisible = partRequests.filter(
      (r) => r.status === "pending" && (isPrivileged || r.requestedBy === (currentUser == null ? void 0 : currentUser.id))
    );
    const seen = /* @__PURE__ */ new Set();
    let count = 0;
    for (const req of pendingVisible) {
      const codes = (req.parts && req.parts.length > 0 ? req.parts.map((p) => p.partCode.trim().toLowerCase()) : [((_a = req.partCode) == null ? void 0 : _a.trim().toLowerCase()) ?? ""]).sort().join(",");
      const key = `${req.caseId}::${codes}`;
      if (!seen.has(key)) {
        seen.add(key);
        count++;
      }
    }
    return count;
  })();
  const handleIssueAll = () => {
    if (!issueModal || !selectedTech) {
      ue.error("Please select a technician.");
      return;
    }
    if (issueModal.parts && issueModal.parts.length > 0) {
      const notInStock = issueModal.parts.filter((p) => {
        if (p.status === "issued" || p.status === "rejected") return false;
        const stockItems = partItems.filter(
          (inv) => inv.partCode.toLowerCase() === p.partCode.toLowerCase() && inv.status === "in_stock"
        );
        return stockItems.length === 0;
      });
      if (notInStock.length > 0) {
        ue.error(
          `Cannot issue: ${notInStock.map((p) => p.partCode).join(", ")} not in stock`
        );
        return;
      }
    } else if (issueModal.partCode) {
      const inStockItems = partItems.filter(
        (p) => p.partCode.toLowerCase() === issueModal.partCode.toLowerCase() && p.status === "in_stock"
      );
      if (inStockItems.length === 0) {
        ue.error(`Cannot issue: ${issueModal.partCode} is not in stock`);
        return;
      }
    }
    issuePartRequest(issueModal.id, selectedTech);
    const partCodesStr = issueModal.parts && issueModal.parts.length > 0 ? issueModal.parts.map((p) => p.partCode).join(", ") : issueModal.partCode;
    addAuditEntry({
      caseId: issueModal.caseDbId,
      userId: (currentUser == null ? void 0 : currentUser.id) ?? "",
      userName: (currentUser == null ? void 0 : currentUser.name) ?? "",
      action: "Part Issued",
      details: `Issued part(s) [${partCodesStr}] for case ${issueModal.caseId} to technician (${(currentUser == null ? void 0 : currentUser.name) ?? ""})`
    });
    ue.success("Part issued successfully");
    setIssueModal(null);
    setSelectedTech("");
  };
  const handleIssueSinglePart = () => {
    if (!issuePartModal || !selectedTech) {
      ue.error("Please select a technician.");
      return;
    }
    const { req, part } = issuePartModal;
    const stockItems = partItems.filter(
      (inv) => inv.partCode.toLowerCase() === part.partCode.toLowerCase() && inv.status === "in_stock"
    );
    if (stockItems.length === 0) {
      ue.error(`Cannot issue: ${part.partCode} is not in stock`);
      return;
    }
    issuePartRequest(req.id, selectedTech, part.id);
    addAuditEntry({
      caseId: req.caseDbId,
      userId: (currentUser == null ? void 0 : currentUser.id) ?? "",
      userName: (currentUser == null ? void 0 : currentUser.name) ?? "",
      action: "Part Issued",
      details: `Issued part [${part.partCode}] for case ${req.caseId} by ${(currentUser == null ? void 0 : currentUser.name) ?? ""}`
    });
    ue.success(`Part ${part.partCode} issued successfully`);
    setIssuePartModal(null);
    setSelectedTech("");
  };
  const handleReject = () => {
    if (!rejectModal || !rejectReason.trim()) {
      ue.error("Please enter a rejection reason.");
      return;
    }
    rejectPartRequest(rejectModal.id, rejectReason.trim());
    const partCodesStr = rejectModal.parts && rejectModal.parts.length > 0 ? rejectModal.parts.map((p) => p.partCode).join(", ") : rejectModal.partCode;
    addAuditEntry({
      caseId: rejectModal.caseDbId,
      userId: (currentUser == null ? void 0 : currentUser.id) ?? "",
      userName: (currentUser == null ? void 0 : currentUser.name) ?? "",
      action: "Part Request Rejected",
      details: `Rejected part request [${partCodesStr}] for case ${rejectModal.caseId}. Reason: ${rejectReason.trim()}`
    });
    ue.success("Part request rejected");
    setRejectModal(null);
    setRejectReason("");
  };
  const priorityBadge = (priority) => {
    const p = priority || "normal";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Badge,
      {
        className: `text-[10px] px-1.5 py-0.5 border font-semibold ${PRIORITY_COLORS[p] ?? PRIORITY_COLORS.normal}`,
        children: PRIORITY_LABEL[p] ?? p
      }
    );
  };
  const statusBadge = (status) => {
    switch (status) {
      case "pending":
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-amber-100 text-amber-700 border border-amber-200 text-[10px] px-1.5 py-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-2.5 w-2.5 mr-1" }),
          " Pending"
        ] });
      case "issued":
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-emerald-100 text-emerald-700 border border-emerald-200 text-[10px] px-1.5 py-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-2.5 w-2.5 mr-1" }),
          " Issued"
        ] });
      case "rejected":
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-red-100 text-red-700 border border-red-200 text-[10px] px-1.5 py-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-2.5 w-2.5 mr-1" }),
          " Rejected"
        ] });
      case "cancelled":
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-muted text-muted-foreground border border-border text-[10px] px-1.5 py-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Ban, { className: "h-2.5 w-2.5 mr-1" }),
          " Cancelled"
        ] });
    }
  };
  const partItemStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] px-1.5 py-0.5 rounded border bg-amber-50 text-amber-700 border-amber-200", children: "Pending" });
      case "issued":
        return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] px-1.5 py-0.5 rounded border bg-emerald-50 text-emerald-700 border-emerald-200", children: "✓ Issued" });
      case "rejected":
        return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] px-1.5 py-0.5 rounded border bg-red-50 text-red-700 border-red-200", children: "Rejected" });
    }
  };
  const tabs = [
    {
      key: "pending",
      label: `Pending${pendingCount > 0 ? ` (${pendingCount})` : ""}`,
      icon: Clock
    },
    { key: "rejected", label: "Rejected", icon: CircleX },
    { key: "cancelled", label: "Cancelled", icon: Ban },
    { key: "all", label: "All", icon: Inbox }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl px-6 py-5 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 bg-white/20 rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Inbox, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Part Requests" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-blue-200 text-sm", children: isPrivileged ? "Review and action part requests from backend users" : "Your part requests to supervisor" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            onClick: handleRefresh,
            disabled: refreshing,
            className: "gap-2 bg-white/20 border-white/30 text-white hover:bg-white/30",
            "data-ocid": "part_requests.secondary_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                RefreshCw,
                {
                  className: `h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`
                }
              ),
              refreshing ? "Refreshing..." : "Refresh"
            ]
          }
        ),
        pendingCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-white text-blue-700 px-3 py-1 text-sm font-bold", children: [
          pendingCount,
          " Pending"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 bg-card p-1 rounded-lg border border-border shadow-sm w-fit", children: tabs.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setActiveTab(t.key),
        className: `px-4 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${activeTab === t.key ? "bg-blue-600 text-white shadow-sm" : "text-muted-foreground hover:bg-muted"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(t.icon, { className: "h-3.5 w-3.5" }),
          t.label
        ]
      },
      t.key
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search by Case ID, Part, Customer...",
            value: searchQuery,
            onChange: (e) => setSearchQuery(e.target.value),
            className: "pl-9 h-9 text-sm",
            "data-ocid": "part_requests.search_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          type: "date",
          value: filterDate,
          onChange: (e) => setFilterDate(e.target.value),
          className: "w-40 h-9 text-sm",
          "data-ocid": "part_requests.input"
        }
      ),
      (searchQuery || filterDate) && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "sm",
          variant: "ghost",
          onClick: () => {
            setSearchQuery("");
            setFilterDate("");
          },
          children: "Clear"
        }
      )
    ] }),
    filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-16 text-muted-foreground",
        "data-ocid": "part_requests.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-12 w-12 mb-3 opacity-30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm", children: [
            "No ",
            activeTab === "all" ? "" : activeTab,
            " requests found"
          ] })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "overflow-y-auto",
        style: { maxHeight: "calc(100vh - 300px)" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2", children: filtered.map((req, idx) => {
          const tech = technicians.find((t) => t.id === req.technicianId);
          const isExpanded = expandedIds.has(req.id);
          const priority = req.priority || "normal";
          const borderColor = STATUS_BORDER[req.status] ?? "border-l-border";
          const hasMultipleParts = req.parts && req.parts.length > 0;
          const pendingParts = hasMultipleParts ? req.parts.filter((p) => p.status === "pending") : [];
          const allPartsInStock = hasMultipleParts ? pendingParts.every((p) => getStockStatus(p.partCode).inStock) : getStockStatus(req.partCode).inStock;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Card,
            {
              className: `border border-border border-l-4 ${borderColor} overflow-hidden shadow-sm hover:shadow-md transition-shadow`,
              "data-ocid": `part_requests.item.${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "w-full text-left",
                    onClick: () => toggleExpand(req.id),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 hover:bg-muted/40 transition-colors gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-blue-600 text-sm font-mono whitespace-nowrap", children: req.caseId }),
                        statusBadge(req.status)
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded truncate max-w-[200px]", children: hasMultipleParts ? `${req.parts.length} Parts` : req.partCode || "—" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
                        priorityBadge(priority),
                        isExpanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-4 w-4 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 text-muted-foreground" })
                      ] })
                    ] })
                  }
                ),
                isExpanded && /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "px-4 pb-4 pt-0 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-3", children: [
                  isPrivileged && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg px-4 py-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-blue-800", children: [
                      "Hello ",
                      getGreeting(),
                      ",",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-indigo-700", children: currentUser == null ? void 0 : currentUser.name }),
                      " ",
                      "ji,"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-blue-600 mt-0.5", children: "A new part request has been submitted for your action." })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-lg border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("table", { className: "w-full text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { className: "divide-y divide-border", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 font-semibold text-muted-foreground w-[38%]", children: "Requested By" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-foreground font-medium", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-3 w-3 text-indigo-400" }),
                        req.requestedByName
                      ] }) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 font-semibold text-muted-foreground", children: "Case ID" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          className: "text-blue-600 hover:underline font-mono text-xs font-semibold",
                          onClick: () => navigate("case-detail", req.caseDbId),
                          children: req.caseId
                        }
                      ) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 font-semibold text-muted-foreground", children: "Customer" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-foreground", children: req.customerName || "—" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 font-semibold text-muted-foreground", children: "Product Type" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-foreground", children: req.productType || "—" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 font-semibold text-muted-foreground", children: "Company" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-foreground", children: req.companyName || "—" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 font-semibold text-muted-foreground", children: "Requested At" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-muted-foreground", children: req.requestedAt ? new Date(req.requestedAt).toLocaleString(
                        "en-IN",
                        {
                          dateStyle: "medium",
                          timeStyle: "short"
                        }
                      ) : "—" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 font-semibold text-muted-foreground", children: "Priority" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: priorityBadge(req.priority) })
                    ] })
                  ] }) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-muted-foreground uppercase tracking-wide", children: hasMultipleParts ? "Parts Requested" : "Part Details" }),
                    hasMultipleParts ? (
                      // Multi-part rows
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: req.parts.map((part) => {
                        var _a;
                        const stockSt = getStockStatus(part.partCode);
                        const partPrice = part.price;
                        return /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "bg-muted/30 border border-border rounded-lg p-3",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs font-bold text-foreground", children: part.partCode }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: part.partName }),
                                  canSeePrice && partPrice !== void 0 && partPrice !== "" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] px-1.5 py-0.5 rounded border bg-violet-50 text-violet-700 border-violet-200", children: [
                                    "₹",
                                    partPrice
                                  ] }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "span",
                                    {
                                      className: `text-[10px] px-1.5 py-0.5 rounded border ${stockSt.colorClass}`,
                                      children: stockSt.label
                                    }
                                  ),
                                  partItemStatusBadge(part.status)
                                ] }),
                                part.issuedByName && part.status === "issued" && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-emerald-600 mt-1", children: [
                                  "Issued by ",
                                  part.issuedByName,
                                  part.technicianId && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                                    " ",
                                    "to",
                                    " ",
                                    ((_a = technicians.find(
                                      (t) => t.id === part.technicianId
                                    )) == null ? void 0 : _a.name) ?? part.technicianId
                                  ] })
                                ] })
                              ] }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 flex-shrink-0", children: [
                                part.partPhotoUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "button",
                                    {
                                      type: "button",
                                      onClick: () => setImageModal(
                                        part.partPhotoUrl
                                      ),
                                      className: "p-1 rounded text-blue-500 hover:bg-blue-50 border border-blue-100",
                                      title: "View Photo",
                                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3 w-3" })
                                    }
                                  ),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "a",
                                    {
                                      href: part.partPhotoUrl,
                                      download: `part-${part.partCode}.jpg`,
                                      className: "p-1 rounded text-green-600 hover:bg-green-50 border border-green-100",
                                      title: "Download Photo",
                                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3 w-3" })
                                    }
                                  )
                                ] }),
                                isPrivileged && part.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "button",
                                  {
                                    type: "button",
                                    disabled: !stockSt.inStock,
                                    onClick: () => {
                                      setIssuePartModal({
                                        req,
                                        part
                                      });
                                      setSelectedTech("");
                                    },
                                    className: `text-[10px] px-2 py-1 rounded border font-semibold transition-colors ${stockSt.inStock ? "bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700" : "bg-muted text-muted-foreground border-border cursor-not-allowed"}`,
                                    title: stockSt.inStock ? "Issue this part" : "Not in stock",
                                    children: "Issue"
                                  }
                                ),
                                isPrivileged && part.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "button",
                                  {
                                    type: "button",
                                    onClick: () => {
                                      setRejectModal(req);
                                      setRejectReason("");
                                    },
                                    className: "text-[10px] px-2 py-1 rounded border font-semibold bg-red-50 text-red-600 border-red-200 hover:bg-red-100 transition-colors",
                                    title: "Reject this request",
                                    children: "Reject"
                                  }
                                ),
                                (currentUser == null ? void 0 : currentUser.role) === "backend_user" && part.status === "pending" && req.requestedBy === currentUser.id && /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "button",
                                  {
                                    type: "button",
                                    onClick: () => {
                                      cancelPartRequest(req.id);
                                      addAuditEntry({
                                        caseId: req.caseDbId,
                                        userId: currentUser.id,
                                        userName: currentUser.name,
                                        action: "Part Request Cancelled",
                                        details: `Cancelled part request [${part.partCode}] for case ${req.caseId} by ${currentUser.name}`
                                      });
                                      ue.success(
                                        "Part request cancelled"
                                      );
                                    },
                                    className: "text-[10px] px-2 py-1 rounded border font-semibold bg-muted text-muted-foreground border-border hover:bg-muted/70 transition-colors",
                                    children: "Cancel"
                                  }
                                )
                              ] })
                            ] })
                          },
                          part.id
                        );
                      }) })
                    ) : (
                      // Single part
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/30 border border-border rounded-lg p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                        req.partCode && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs font-bold text-foreground", children: req.partCode }),
                        req.partName && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: req.partName }),
                        canSeePrice && req.price !== void 0 && req.price !== "" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] px-1.5 py-0.5 rounded border bg-violet-50 text-violet-700 border-violet-200", children: [
                          "₹",
                          req.price
                        ] }),
                        req.partCode && (() => {
                          const st = getStockStatus(req.partCode);
                          return /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: `text-[10px] px-1.5 py-0.5 rounded border ${st.colorClass}`,
                              children: st.label
                            }
                          );
                        })(),
                        req.partPhotoUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "button",
                            {
                              type: "button",
                              onClick: () => setImageModal(req.partPhotoUrl),
                              className: "flex items-center gap-1 text-blue-600 hover:text-blue-800 text-xs border border-blue-100 px-2 py-0.5 rounded bg-blue-50",
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3 w-3" }),
                                " View"
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "a",
                            {
                              href: req.partPhotoUrl,
                              download: `part-${req.partCode}.jpg`,
                              className: "flex items-center gap-1 text-green-600 hover:text-green-800 text-xs border border-green-100 px-2 py-0.5 rounded bg-green-50",
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3 w-3" }),
                                " Download"
                              ]
                            }
                          )
                        ] })
                      ] }) })
                    )
                  ] }),
                  req.status === "issued" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs bg-emerald-50 text-emerald-700 px-3 py-2 rounded-lg border border-emerald-200 flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-3.5 w-3.5 flex-shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "Issued to",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: (tech == null ? void 0 : tech.name) ?? req.technicianId }),
                      " ",
                      "by ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: req.issuedByName }),
                      req.issuedAt && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        " ",
                        "•",
                        " ",
                        new Date(req.issuedAt).toLocaleDateString(
                          "en-IN"
                        )
                      ] })
                    ] })
                  ] }),
                  req.status === "rejected" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs bg-red-50 text-red-700 px-3 py-2 rounded-lg border border-red-200", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Rejected" }),
                    req.rejectedByName && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      " ",
                      "by ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: req.rejectedByName })
                    ] }),
                    ": ",
                    req.rejectedReason
                  ] }),
                  req.status === "cancelled" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs bg-muted text-muted-foreground px-3 py-2 rounded-lg border border-border", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Cancelled" }),
                    req.cancelledByName && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      " ",
                      "by ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: req.cancelledByName })
                    ] }),
                    req.cancelledAt && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      " ",
                      "•",
                      " ",
                      new Date(req.cancelledAt).toLocaleDateString(
                        "en-IN"
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap pt-1", children: [
                    !isPrivileged && req.status === "pending" && req.requestedBy === (currentUser == null ? void 0 : currentUser.id) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        size: "sm",
                        variant: "outline",
                        className: "text-red-600 border-red-200 hover:bg-red-50 h-8 px-3 text-xs",
                        onClick: () => {
                          var _a;
                          cancelPartRequest(req.id);
                          addAuditEntry({
                            caseId: req.caseDbId,
                            userId: (currentUser == null ? void 0 : currentUser.id) ?? "",
                            userName: (currentUser == null ? void 0 : currentUser.name) ?? "",
                            action: "Part Request Cancelled",
                            details: `Part request [${req.partCode || ((_a = req.parts) == null ? void 0 : _a.map((p) => p.partCode).join(", "))}] cancelled for case ${req.caseId} by ${(currentUser == null ? void 0 : currentUser.name) ?? ""}`
                          });
                          ue.success("Part request cancelled");
                        },
                        "data-ocid": "part_requests.cancel_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Ban, { className: "h-3 w-3 mr-1" }),
                          " Cancel Request"
                        ]
                      }
                    ),
                    (currentUser == null ? void 0 : currentUser.role) === "supervisor" && req.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          size: "sm",
                          className: "bg-emerald-600 hover:bg-emerald-700 text-white h-8 px-3 text-xs",
                          disabled: hasMultipleParts ? pendingParts.length === 0 : !getStockStatus(req.partCode).inStock,
                          onClick: () => {
                            setIssueModal(req);
                            setSelectedTech("");
                          },
                          title: !allPartsInStock ? "Some parts not in stock" : "Issue all parts",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-3.5 w-3.5 mr-1" }),
                            "Issue All"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          size: "sm",
                          variant: "outline",
                          className: "border-red-200 text-red-600 hover:bg-red-50 h-8 px-3 text-xs",
                          onClick: () => {
                            setRejectModal(req);
                            setRejectReason("");
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3.5 w-3.5 mr-1" }),
                            " ",
                            "Reject"
                          ]
                        }
                      ),
                      !allPartsInStock && pendingParts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-amber-600 w-full mt-0.5", children: "⚠ Some parts not in stock. Issue available parts individually above." })
                    ] }),
                    (currentUser == null ? void 0 : currentUser.role) === "admin" && req.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          size: "sm",
                          className: "bg-emerald-600 hover:bg-emerald-700 text-white h-8 px-3 text-xs",
                          disabled: hasMultipleParts ? pendingParts.length === 0 : !getStockStatus(req.partCode).inStock,
                          onClick: () => {
                            setIssueModal(req);
                            setSelectedTech("");
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-3.5 w-3.5 mr-1" }),
                            "Issue All"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          size: "sm",
                          variant: "outline",
                          className: "border-red-200 text-red-600 hover:bg-red-50 h-8 px-3 text-xs",
                          onClick: () => {
                            setRejectModal(req);
                            setRejectReason("");
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3.5 w-3.5 mr-1" }),
                            " ",
                            "Reject"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          size: "sm",
                          variant: "outline",
                          className: "border-border text-muted-foreground hover:bg-muted h-8 px-3 text-xs",
                          onClick: () => {
                            var _a;
                            cancelPartRequest(req.id);
                            addAuditEntry({
                              caseId: req.caseDbId,
                              userId: (currentUser == null ? void 0 : currentUser.id) ?? "",
                              userName: (currentUser == null ? void 0 : currentUser.name) ?? "",
                              action: "Part Request Cancelled",
                              details: `Part request [${req.partCode || ((_a = req.parts) == null ? void 0 : _a.map((p) => p.partCode).join(", "))}] cancelled for case ${req.caseId} by ${(currentUser == null ? void 0 : currentUser.name) ?? ""} (${(currentUser == null ? void 0 : currentUser.role) ?? ""})`
                            });
                            ue.success("Part request cancelled");
                          },
                          "data-ocid": "part_requests.delete_button",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Ban, { className: "h-3.5 w-3.5 mr-1" }),
                            " Cancel"
                          ]
                        }
                      ),
                      !allPartsInStock && pendingParts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-amber-600 w-full mt-0.5", children: "⚠ Some parts not in stock. Issue available parts individually above." })
                    ] })
                  ] })
                ] }) })
              ]
            },
            req.id
          );
        }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!issueModal, onOpenChange: () => setIssueModal(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Issue Part to Technician" }) }),
      issueModal && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-lg px-3 py-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4 text-indigo-600" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-indigo-500", children: "Requested by" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-indigo-800", children: issueModal.requestedByName })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg p-3 border border-border space-y-1.5 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Case" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium font-mono", children: issueModal.caseId })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Customer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: issueModal.customerName })
          ] }),
          issueModal.parts && issueModal.parts.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground block mb-1", children: "Parts" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: issueModal.parts.filter((p) => p.status === "pending").map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground", children: p.partCode }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: p.partName })
            ] }, p.id)) })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Part Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: issueModal.partName })
            ] }),
            issueModal.partCode && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Part Code" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-medium", children: issueModal.partCode })
            ] })
          ] }),
          issueModal.productType && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Product" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: issueModal.productType })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Priority" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: priorityBadge(issueModal.priority) })
          ] })
        ] }),
        issueModal.partPhotoUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: issueModal.partPhotoUrl,
            alt: "Part",
            className: "h-28 w-full object-contain rounded-lg border"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Assign to Technician *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedTech, onValueChange: setSelectedTech, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select technician" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: technicians.filter((t) => t.isActive).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: t.id, children: [
              t.name,
              " ",
              t.specialization ? `(${t.specialization})` : ""
            ] }, t.id)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setIssueModal(null),
              "data-ocid": "part_requests.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "bg-emerald-600 hover:bg-emerald-700 text-white",
              onClick: handleIssueAll,
              disabled: !selectedTech,
              "data-ocid": "part_requests.confirm_button",
              children: "Confirm Issue"
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!issuePartModal,
        onOpenChange: () => setIssuePartModal(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Issue Part" }) }),
          issuePartModal && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg p-3 border border-border text-xs space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Part Code" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold", children: issuePartModal.part.partCode })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Part Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: issuePartModal.part.partName })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Case" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: issuePartModal.req.caseId })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Requested By" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: issuePartModal.req.requestedByName })
              ] })
            ] }),
            issuePartModal.part.partPhotoUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: issuePartModal.part.partPhotoUrl,
                alt: "Part",
                className: "h-24 w-full object-contain rounded-lg border"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Assign to Technician *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedTech, onValueChange: setSelectedTech, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select technician" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: technicians.filter((t) => t.isActive).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: t.id, children: [
                  t.name,
                  " ",
                  t.specialization ? `(${t.specialization})` : ""
                ] }, t.id)) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 pt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  onClick: () => setIssuePartModal(null),
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  className: "bg-emerald-600 hover:bg-emerald-700 text-white",
                  onClick: handleIssueSinglePart,
                  disabled: !selectedTech,
                  children: "Issue This Part"
                }
              )
            ] })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!rejectModal, onOpenChange: () => setRejectModal(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Reject Part Request" }) }),
      rejectModal && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg p-3 border border-border space-y-1 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Case" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: rejectModal.caseId })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Part" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: rejectModal.partName })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Requested by" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: rejectModal.requestedByName })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Rejection Reason *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              placeholder: "Enter reason for rejection...",
              value: rejectReason,
              onChange: (e) => setRejectReason(e.target.value),
              rows: 3,
              "data-ocid": "part_requests.textarea"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setRejectModal(null),
              "data-ocid": "part_requests.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "destructive",
              onClick: handleReject,
              disabled: !rejectReason.trim(),
              "data-ocid": "part_requests.confirm_button",
              children: "Reject Request"
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!imageModal, onOpenChange: () => setImageModal(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Part Photo" }) }),
      imageModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: imageModal,
          alt: "Part",
          className: "w-full rounded-lg object-contain max-h-96"
        }
      )
    ] }) })
  ] });
}
export {
  PartRequestsPage as default
};
