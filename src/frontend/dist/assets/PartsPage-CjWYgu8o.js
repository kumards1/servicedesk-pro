import { u as useStore, r as reactExports, T as TriangleAlert, ad as ShoppingCart, C as CircleCheckBig, j as jsxRuntimeExports, a6 as Package, a0 as getAgeing, a2 as StatusBadge, E as ChevronDown, w as Button, z as Label, I as Input } from "./index-De7Q6SQO.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-CsjrwcpS.js";
import { T as Tag } from "./tag-WKOHLAdV.js";
import { R as RefreshCw } from "./refresh-cw-BD-tKuOV.js";
const CLOSED_STATUSES = [
  "closed",
  "cancelled",
  "transferred",
  "adjustment_closed",
  "replacement_done",
  "gas_charge_done"
];
function buildPartRows(cases, techniciansMap, tab) {
  const rows = [];
  for (const c of cases) {
    if (CLOSED_STATUSES.includes(c.status)) continue;
    if (!c.parts || c.parts.length === 0) {
      if (tab === "part_required" && c.status === "part_required" && c.partCode) {
        rows.push({
          caseDbId: c.id,
          caseDisplayId: c.caseId,
          customerName: c.customerName,
          product: c.product,
          technicianName: techniciansMap.get(c.technicianId) ?? "—",
          partDbId: "__legacy__",
          partCode: c.partCode,
          partName: c.partName || c.partCode,
          partPhotoUrl: c.partPhotoUrl ?? "",
          partStatus: "pending",
          poNumber: c.poNumber,
          updatedAt: c.updatedAt,
          caseCreatedAt: c.createdAt
        });
      } else if (tab === "part_ordered" && c.status === "part_ordered" && c.partCode) {
        rows.push({
          caseDbId: c.id,
          caseDisplayId: c.caseId,
          customerName: c.customerName,
          product: c.product,
          technicianName: techniciansMap.get(c.technicianId) ?? "—",
          partDbId: "__legacy__",
          partCode: c.partCode,
          partName: c.partName || c.partCode,
          partPhotoUrl: c.partPhotoUrl ?? "",
          partStatus: "ordered",
          poNumber: c.poNumber,
          updatedAt: c.updatedAt,
          caseCreatedAt: c.createdAt
        });
      } else if (tab === "part_received" && c.status === "part_received") {
        rows.push({
          caseDbId: c.id,
          caseDisplayId: c.caseId,
          customerName: c.customerName,
          product: c.product,
          technicianName: techniciansMap.get(c.technicianId) ?? "—",
          partDbId: "__legacy__",
          partCode: c.partCode,
          partName: c.partName || c.partCode,
          partPhotoUrl: c.partPhotoUrl ?? "",
          partStatus: "received",
          poNumber: c.poNumber,
          updatedAt: c.updatedAt,
          caseCreatedAt: c.createdAt
        });
      }
      continue;
    }
    for (const p of c.parts) {
      const pStatus = p.status;
      const tabMatch = tab === "part_required" && (pStatus === "pending" || pStatus === "required") || tab === "part_ordered" && (pStatus === "ordered" || pStatus === "part_ordered") || tab === "part_received" && (pStatus === "received" || pStatus === "part_received");
      if (!tabMatch) continue;
      rows.push({
        caseDbId: c.id,
        caseDisplayId: c.caseId,
        customerName: c.customerName,
        product: c.product,
        technicianName: techniciansMap.get(c.technicianId) ?? "—",
        partDbId: p.id,
        partCode: p.partCode,
        partName: p.partName,
        partPhotoUrl: p.partPhotoUrl ?? "",
        partStatus: pStatus,
        poNumber: p.poNumber,
        updatedAt: c.updatedAt,
        caseCreatedAt: c.createdAt
      });
    }
  }
  return rows.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}
function PartsPage() {
  const {
    cases,
    technicians,
    navigate,
    updateCase,
    addAuditEntry,
    currentUser
  } = useStore();
  const [tab, setTab] = reactExports.useState("part_required");
  const [poDialog, setPoDialog] = reactExports.useState(null);
  const [poNumber, setPoNumber] = reactExports.useState("");
  const [orderDate, setOrderDate] = reactExports.useState("");
  const [actionLoading, setActionLoading] = reactExports.useState(null);
  const techMap = new Map(technicians.map((t) => [t.id, t.name]));
  const rows = buildPartRows(cases, techMap, tab);
  const countForTab = (t) => buildPartRows(cases, techMap, t).length;
  const updatePartStatus = (caseDbId, partDbId, newStatus, extraCaseUpdates) => {
    var _a;
    const c = cases.find((x) => x.id === caseDbId);
    if (!c) return;
    setActionLoading(`${caseDbId}-${partDbId}`);
    if (partDbId === "__legacy__") {
      const caseStatus = newStatus === "ordered" ? "part_ordered" : newStatus === "received" ? "part_received" : newStatus === "pending" ? "part_required" : "re_open";
      updateCase(caseDbId, {
        status: caseStatus,
        updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
        ...extraCaseUpdates ?? {}
      });
      addAuditEntry({
        caseId: caseDbId,
        userId: (currentUser == null ? void 0 : currentUser.id) ?? "",
        userName: (currentUser == null ? void 0 : currentUser.name) ?? "",
        action: "Parts Tracking",
        details: `Part ${c.partCode} marked as ${newStatus} via Parts Tracking`
      });
      setTimeout(() => setActionLoading(null), 800);
      return;
    }
    const updatedParts = (c.parts ?? []).map(
      (p) => p.id === partDbId ? {
        ...p,
        status: newStatus
      } : p
    );
    const statuses = updatedParts.map((p) => p.status);
    let derivedCaseStatus = c.status;
    if (newStatus === "ordered" || newStatus === "part_ordered") {
      const allOrderedOrReceived = statuses.every(
        (s) => [
          "ordered",
          "part_ordered",
          "received",
          "part_received",
          "issued"
        ].includes(s)
      );
      if (allOrderedOrReceived) derivedCaseStatus = "part_ordered";
    } else if (newStatus === "received" || newStatus === "part_received") {
      const allReceivedOrIssued = statuses.every(
        (s) => ["received", "part_received", "issued"].includes(s)
      );
      derivedCaseStatus = allReceivedOrIssued ? "part_received" : "part_ordered";
    } else if (newStatus === "available" || newStatus === "part_available") {
      const allAvailable = statuses.every(
        (s) => ["available", "part_available"].includes(s)
      );
      if (allAvailable) derivedCaseStatus = "part_available";
    } else if (newStatus === "pending") {
      derivedCaseStatus = "part_required";
    }
    updateCase(caseDbId, {
      parts: updatedParts,
      status: derivedCaseStatus,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      ...extraCaseUpdates ?? {}
    });
    addAuditEntry({
      caseId: caseDbId,
      userId: (currentUser == null ? void 0 : currentUser.id) ?? "",
      userName: (currentUser == null ? void 0 : currentUser.name) ?? "",
      action: "Parts Tracking",
      details: `Part ${((_a = updatedParts.find((p) => p.id === partDbId)) == null ? void 0 : _a.partCode) ?? partDbId} marked as ${newStatus} via Parts Tracking`
    });
    setTimeout(() => setActionLoading(null), 800);
  };
  const markAvailable = (row) => {
    updatePartStatus(row.caseDbId, row.partDbId, "available");
  };
  const markOrdered = (row, po, od) => {
    const extras = {};
    if (po) {
      extras.poNumber = po;
    }
    if (od) extras.orderDate = od;
    updatePartStatus(row.caseDbId, row.partDbId, "ordered", extras);
  };
  const markReceived = (row) => {
    updatePartStatus(row.caseDbId, row.partDbId, "received");
  };
  const markReopen = (row) => {
    updatePartStatus(row.caseDbId, row.partDbId, "pending");
  };
  const savePO = (row) => {
    markOrdered(row, poNumber, orderDate);
    setPoDialog(null);
    setPoNumber("");
    setOrderDate("");
  };
  const tabs = [
    {
      key: "part_required",
      label: "Part Required",
      color: "bg-red-600",
      count: countForTab("part_required"),
      icon: TriangleAlert
    },
    {
      key: "part_ordered",
      label: "Part Ordered",
      color: "bg-blue-600",
      count: countForTab("part_ordered"),
      icon: ShoppingCart
    },
    {
      key: "part_received",
      label: "Part Received",
      color: "bg-green-600",
      count: countForTab("part_received"),
      icon: CircleCheckBig
    }
  ];
  const poDialogRow = poDialog ? rows.find(
    (r) => r.caseDbId === poDialog.caseDbId && r.partDbId === poDialog.partDbId
  ) ?? null : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl px-6 py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 bg-white/20 rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-6 w-6" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Parts Tracking" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-orange-200 text-sm", children: "Track individual part requirements and delivery status" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: [
      {
        label: "Part Required",
        value: countForTab("part_required"),
        color: "text-red-600",
        bg: "bg-red-50 border-red-100"
      },
      {
        label: "Part Ordered",
        value: countForTab("part_ordered"),
        color: "text-blue-600",
        bg: "bg-blue-50 border-blue-100"
      },
      {
        label: "Part Received",
        value: countForTab("part_received"),
        color: "text-green-600",
        bg: "bg-green-50 border-green-100"
      }
    ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `${s.bg} rounded-xl p-3 sm:p-4 border shadow-sm`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: s.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-2xl font-bold ${s.color}`, children: s.value })
        ]
      },
      s.label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: tabs.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setTab(t.key),
        className: `px-3 sm:px-4 py-2 text-sm rounded-lg font-medium transition-colors flex items-center gap-2 ${tab === t.key ? `${t.color} text-white shadow-sm` : "bg-white text-gray-600 border hover:bg-gray-50"}`,
        "data-ocid": "parts.tab",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(t.icon, { className: "h-3.5 w-3.5" }),
          t.label,
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `text-xs px-1.5 py-0.5 rounded-full font-bold ${tab === t.key ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`,
              children: t.count
            }
          )
        ]
      },
      t.key
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-xl border shadow-sm overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b bg-gray-50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap", children: "Case ID" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap", children: "Customer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap hidden sm:table-cell", children: "Product" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap", children: "Part Code" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap", children: "Part Name" }),
        tab === "part_ordered" && /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap hidden md:table-cell", children: "PO Number" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap hidden lg:table-cell", children: "Technician" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap hidden sm:table-cell", children: "Age" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap", children: "Action" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        rows.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "td",
          {
            colSpan: tab === "part_ordered" ? 10 : 9,
            className: "py-10 text-center text-gray-400 text-sm",
            "data-ocid": "parts.empty_state",
            children: "No parts in this stage"
          }
        ) }),
        rows.map((row) => {
          const age = getAgeing(row.caseCreatedAt);
          const isLoading = actionLoading === `${row.caseDbId}-${row.partDbId}`;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: "border-b last:border-0 hover:bg-gray-50 transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 font-medium text-blue-700 whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "hover:underline text-left",
                    onClick: () => navigate("case-detail", row.caseDbId),
                    "data-ocid": "parts.case_link",
                    children: row.caseDisplayId
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 text-gray-700 whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: row.customerName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 sm:hidden", children: row.product })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 text-gray-600 text-xs hidden sm:table-cell whitespace-nowrap", children: row.product }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 text-gray-600 font-mono text-xs whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-3 w-3 text-gray-400 shrink-0" }),
                  row.partCode || "—"
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 font-medium text-orange-700 whitespace-nowrap text-xs", children: row.partName || "—" }),
                tab === "part_ordered" && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 hidden md:table-cell text-xs whitespace-nowrap", children: row.poNumber ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-700", children: row.poNumber }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setPoDialog({
                      caseDbId: row.caseDbId,
                      partDbId: row.partDbId
                    }),
                    className: "text-xs text-blue-600 hover:underline",
                    "data-ocid": "parts.po_button",
                    children: "Enter PO"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 text-gray-600 text-xs hidden lg:table-cell whitespace-nowrap", children: row.technicianName }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "td",
                  {
                    className: `px-3 py-3 font-medium text-xs hidden sm:table-cell whitespace-nowrap ${age >= 8 ? "text-red-600" : "text-gray-600"}`,
                    children: [
                      age,
                      "d"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  StatusBadge,
                  {
                    status: row.partStatus === "pending" || row.partStatus === "required" ? "part_required" : row.partStatus === "ordered" || row.partStatus === "part_ordered" ? "part_ordered" : row.partStatus === "received" || row.partStatus === "part_received" ? "part_received" : row.partStatus === "available" || row.partStatus === "part_available" ? "part_available" : "part_required"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 whitespace-nowrap", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-4 w-4 animate-spin text-gray-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                  tab === "part_required" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        className: "flex items-center gap-1 text-xs bg-white border border-gray-200 rounded-md px-2 py-1.5 hover:bg-gray-50 transition-colors font-medium text-gray-700 shadow-sm",
                        "data-ocid": "parts.action_button",
                        onClick: (e) => {
                          const menu = e.currentTarget.nextElementSibling;
                          if (menu) menu.classList.toggle("hidden");
                        },
                        children: [
                          "Action",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3 w-3" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden absolute z-20 left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[130px] py-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          className: "w-full text-left px-3 py-2 text-xs text-emerald-700 hover:bg-emerald-50 transition-colors font-medium",
                          onClick: (e) => {
                            var _a, _b;
                            (_b = (_a = e.currentTarget.closest(".relative")) == null ? void 0 : _a.querySelector(
                              ".hidden"
                            )) == null ? void 0 : _b.classList.add("hidden");
                            markAvailable(row);
                          },
                          "data-ocid": "parts.available_button",
                          children: "✓ Available"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          className: "w-full text-left px-3 py-2 text-xs text-blue-700 hover:bg-blue-50 transition-colors font-medium",
                          onClick: (e) => {
                            var _a, _b;
                            (_b = (_a = e.currentTarget.closest(".relative")) == null ? void 0 : _a.querySelector(
                              ".hidden"
                            )) == null ? void 0 : _b.classList.add("hidden");
                            setPoDialog({
                              caseDbId: row.caseDbId,
                              partDbId: row.partDbId
                            });
                          },
                          "data-ocid": "parts.order_button",
                          children: "📦 Part Ordered"
                        }
                      )
                    ] })
                  ] }),
                  tab === "part_ordered" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      variant: "outline",
                      className: "text-xs h-7 px-2 border-green-300 text-green-700 hover:bg-green-50",
                      onClick: () => markReceived(row),
                      "data-ocid": "parts.received_button",
                      children: "Mark Received"
                    }
                  ),
                  tab === "part_received" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      className: "text-xs h-7 px-2 bg-green-600 hover:bg-green-700",
                      onClick: () => markReopen(row),
                      "data-ocid": "parts.reopen_button",
                      children: "Reopen"
                    }
                  )
                ] }) })
              ]
            },
            `${row.caseDbId}-${row.partDbId}`
          );
        })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!poDialog,
        onOpenChange: () => {
          setPoDialog(null);
          setPoNumber("");
          setOrderDate("");
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "mx-4 sm:mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Enter PO Details" }) }),
          poDialogRow && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-500 -mt-2 mb-1", children: [
            "Part:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-gray-700", children: poDialogRow.partCode }),
            " ",
            "— ",
            poDialogRow.partName
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "PO Number (optional)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "e.g. PO-2024-001",
                  value: poNumber,
                  onChange: (e) => setPoNumber(e.target.value),
                  "data-ocid": "parts.po_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Order Date (optional)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "date",
                  value: orderDate,
                  onChange: (e) => setOrderDate(e.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: () => poDialogRow && savePO(poDialogRow),
                  className: "flex-1",
                  "data-ocid": "parts.save_button",
                  children: "Mark as Ordered"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  onClick: () => {
                    setPoDialog(null);
                    setPoNumber("");
                    setOrderDate("");
                  },
                  "data-ocid": "parts.cancel_button",
                  children: "Cancel"
                }
              )
            ] })
          ] })
        ] })
      }
    )
  ] });
}
export {
  PartsPage as default
};
