import { u as useStore, r as reactExports, a0 as getAgeing, j as jsxRuntimeExports, a8 as ClipboardList, w as Button, T as TriangleAlert, a9 as FileText, x as Clock, a6 as Package, C as CircleCheckBig, I as Input, H as Select, J as SelectTrigger, K as SelectValue, N as SelectContent, O as SelectItem, y as Trash2, a2 as StatusBadge, aa as Bell, a1 as ChevronLeft, W as ChevronRight, X } from "./index-De7Q6SQO.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-CsjrwcpS.js";
import { U as Upload } from "./upload-COLdyiGw.js";
import { D as Download } from "./download-EX2SZm82.js";
import { C as CirclePlus } from "./circle-plus-DplsFd8V.js";
import { T as Truck } from "./truck-D77gopmz.js";
import { F as Funnel } from "./funnel-D07buPss.js";
import { C as Calendar } from "./calendar-CSRezUDQ.js";
import { H as History } from "./history-DshnOP__.js";
function CustomerHistoryDialog({
  open,
  onClose,
  relatedCases,
  currentCaseId,
  onNavigate
}) {
  const others = relatedCases.filter((c) => c.id !== currentCaseId);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-2xl mx-4 sm:mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "h-5 w-5 text-blue-600" }),
      "Customer History (",
      others.length,
      " previous complaint",
      others.length !== 1 ? "s" : "",
      ")"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 max-h-96 overflow-y-auto", children: others.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 py-4 text-center", children: "No previous complaints found for this customer." }) : others.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        className: "w-full text-left border rounded-lg p-3 hover:bg-blue-50 cursor-pointer transition-colors",
        onClick: () => {
          onClose();
          onNavigate(c.id);
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-blue-700", children: c.caseId }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: c.status })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-gray-600 mt-1", children: [
            c.product,
            " — ",
            c.complaintType.replace("_", " ")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-gray-400 mt-1", children: [
            new Date(c.createdAt).toLocaleDateString("en-IN"),
            " ·",
            " ",
            c.remarks || "No remarks"
          ] })
        ]
      },
      c.id
    )) })
  ] }) });
}
function parseCSV(text) {
  const lines = text.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length < 2) return [];
  const header = lines[0].split(",").map((h) => h.replace(/^"|"$/g, "").trim().toLowerCase());
  const col = (row, names) => {
    for (const name of names) {
      const idx = header.indexOf(name);
      if (idx >= 0 && row[idx]) return row[idx].replace(/^"|"$/g, "").trim();
    }
    return "";
  };
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const cells = [];
    let current = "";
    let inQuote = false;
    for (const ch of lines[i]) {
      if (ch === '"') {
        inQuote = !inQuote;
      } else if (ch === "," && !inQuote) {
        cells.push(current);
        current = "";
      } else {
        current += ch;
      }
    }
    cells.push(current);
    const name = col(cells, ["customer name", "customer", "name"]);
    const phone = col(cells, ["phone", "mobile", "contact"]);
    if (!name || !phone) continue;
    const rawType = col(cells, ["complaint type", "type"]).toLowerCase().replace(/\s+/g, "_");
    const complaintType = rawType === "installation" ? "installation" : rawType === "stock_repair" ? "stock_repair" : "breakdown";
    const rawStatus = col(cells, ["status"]).toLowerCase().replace(/\s+/g, "_");
    const validStatuses = [
      "new",
      "printed",
      "confirmed",
      "pending",
      "on_route",
      "cancelled",
      "transferred",
      "rescheduled",
      "part_required",
      "part_ordered",
      "part_received",
      "re_open",
      "gas_charge_pending",
      "gas_charge_done",
      "adjustment_closed",
      "replacement_done",
      "closed"
    ];
    const status = validStatuses.includes(rawStatus) ? rawStatus : "new";
    const followUp = col(cells, [
      "follow-up date",
      "follow up date",
      "followup",
      "next action"
    ]);
    let nextActionDate = "";
    if (followUp) {
      try {
        const parsed = new Date(followUp);
        if (!Number.isNaN(parsed.getTime()))
          nextActionDate = parsed.toISOString().split("T")[0];
      } catch {
      }
    }
    rows.push({
      customerName: name,
      phone,
      altPhone: col(cells, ["alt phone", "alternate phone", "alt mobile"]),
      address: col(cells, ["address"]),
      product: col(cells, ["product"]) || "Unknown",
      productType: col(cells, ["product type", "model"]),
      complaintType,
      status,
      remarks: col(cells, ["remarks", "notes", "description"]),
      partCode: col(cells, ["part code", "partcode"]),
      partName: col(cells, ["part name", "partname"]),
      nextActionDate
    });
  }
  return rows;
}
function ImportCSVDialog({
  open,
  onClose,
  onImport
}) {
  const fileRef = reactExports.useRef(null);
  const [rows, setRows] = reactExports.useState([]);
  const [fileName, setFileName] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  const handleFile = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    setFileName(file.name);
    setError("");
    const reader = new FileReader();
    reader.onload = (ev) => {
      var _a2;
      const text = (_a2 = ev.target) == null ? void 0 : _a2.result;
      const parsed = parseCSV(text);
      if (parsed.length === 0) {
        setError(
          "No valid rows found. Make sure the CSV has Customer Name and Phone columns."
        );
        setRows([]);
      } else {
        setRows(parsed);
      }
    };
    reader.readAsText(file);
  };
  const handleImport = () => {
    if (rows.length > 0) {
      onImport(rows);
      setRows([]);
      setFileName("");
      onClose();
    }
  };
  const downloadTemplate = () => {
    const headers = "Customer Name,Phone,Alt Phone,Address,Product,Product Type,Complaint Type,Status,Remarks,Part Code,Part Name,Follow-up Date";
    const sample = "Priya Sharma,9812345678,,12 MG Road Delhi,AC,1.5 Ton Split,installation,new,New installation,,, ";
    const csv = `${headers}
${sample}`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "import-template.csv";
    a.click();
    URL.revokeObjectURL(url);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Dialog,
    {
      open,
      onOpenChange: (o) => {
        if (!o) {
          setRows([]);
          setFileName("");
          setError("");
          onClose();
        }
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-2xl mx-4 sm:mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-5 w-5 text-blue-600" }),
          "Import Cases from CSV"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium mb-1", children: "Expected CSV columns:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-blue-700", children: "Customer Name, Phone, Alt Phone, Address, Product, Product Type, Complaint Type (installation/breakdown/stock_repair), Status, Remarks, Part Code, Part Name, Follow-up Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: downloadTemplate,
                className: "mt-2 text-xs text-blue-600 underline hover:text-blue-800",
                children: "Download template CSV"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: "w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors",
              onClick: () => {
                var _a;
                return (_a = fileRef.current) == null ? void 0 : _a.click();
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-8 w-8 text-gray-400 mx-auto mb-2" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600", children: fileName ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-700 font-medium", children: fileName }) : "Click to select CSV file" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mt-1", children: "Supports .csv files" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    ref: fileRef,
                    type: "file",
                    accept: ".csv",
                    className: "hidden",
                    onChange: handleFile
                  }
                )
              ]
            }
          ),
          error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700 flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4 shrink-0 mt-0.5" }),
            error
          ] }),
          rows.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-gray-700 mb-2", children: [
              "Preview — ",
              rows.length,
              " case",
              rows.length !== 1 ? "s" : "",
              " ready to import"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto max-h-48 border rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "min-w-max w-full text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-gray-50 sticky top-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: [
                "Customer",
                "Phone",
                "Product",
                "Type",
                "Status",
                "Remarks"
              ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "th",
                {
                  className: "px-3 py-2 text-left font-semibold text-gray-500 whitespace-nowrap",
                  children: h
                },
                h
              )) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
                rows.slice(0, 10).map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-1.5 whitespace-nowrap", children: r.customerName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-1.5 whitespace-nowrap", children: r.phone }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-1.5 whitespace-nowrap", children: r.product }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-1.5 whitespace-nowrap capitalize", children: r.complaintType.replace(/_/g, " ") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-1.5 whitespace-nowrap capitalize", children: r.status.replace(/_/g, " ") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-1.5 max-w-[150px] truncate", children: r.remarks })
                ] }, `${r.phone}-${i}`)),
                rows.length > 10 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-t", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "td",
                  {
                    colSpan: 6,
                    className: "px-3 py-1.5 text-center text-gray-400",
                    children: [
                      "...and ",
                      rows.length - 10,
                      " more rows"
                    ]
                  }
                ) })
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                onClick: () => {
                  setRows([]);
                  setFileName("");
                  setError("");
                  onClose();
                },
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                onClick: handleImport,
                disabled: rows.length === 0,
                className: "bg-blue-600 hover:bg-blue-700",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4 mr-1" }),
                  "Import ",
                  rows.length > 0 ? `${rows.length} Cases` : ""
                ]
              }
            )
          ] })
        ] })
      ] })
    }
  );
}
function BulkDeleteDialog({
  open,
  count,
  onConfirm,
  onCancel
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Dialog,
    {
      open,
      onOpenChange: (o) => {
        if (!o) onCancel();
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm mx-4 sm:mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2 text-red-600", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-5 w-5" }),
          "Delete ",
          count,
          " Case",
          count !== 1 ? "s" : "",
          "?"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-600", children: [
          "This will permanently delete ",
          count,
          " selected case",
          count !== 1 ? "s" : "",
          ". This action cannot be undone."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: onCancel, children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "destructive", onClick: onConfirm, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 mr-1" }),
            "Delete ",
            count,
            " Case",
            count !== 1 ? "s" : ""
          ] })
        ] })
      ] })
    }
  );
}
const normalizePhone = (ph) => ph.replace(/\D/g, "");
const checkStale = (c, today) => c.status === "on_route" && !!c.technicianId && !c.hasFirstUpdate && !!c.onRouteDate && c.onRouteDate < today;
function CasesPage() {
  const {
    cases,
    technicians,
    reminders,
    navigate,
    updateCase,
    addAuditEntry,
    currentUser,
    deleteCase,
    deleteCases,
    importCases
  } = useStore();
  const [search, setSearch] = reactExports.useState("");
  const [filterStatus, setFilterStatus] = reactExports.useState("all");
  const [filterType, setFilterType] = reactExports.useState("all");
  const [filterTech, setFilterTech] = reactExports.useState("all");
  const [filterAgeing, setFilterAgeing] = reactExports.useState("all");
  const [page, setPage] = reactExports.useState(1);
  const [selected, setSelected] = reactExports.useState(/* @__PURE__ */ new Set());
  const [bulkStatus, setBulkStatus] = reactExports.useState("");
  const [showFilters, setShowFilters] = reactExports.useState(false);
  const [historyDialog, setHistoryDialog] = reactExports.useState(null);
  const [showImport, setShowImport] = reactExports.useState(false);
  const [showBulkDelete, setShowBulkDelete] = reactExports.useState(false);
  const [importSuccess, setImportSuccess] = reactExports.useState(null);
  const PER_PAGE = 20;
  const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const filtered = reactExports.useMemo(() => {
    return cases.filter((c) => {
      const q = search.toLowerCase();
      const matchSearch = !q || c.caseId.toLowerCase().includes(q) || c.customerName.toLowerCase().includes(q) || c.phone.includes(q) || (c.altPhone || "").includes(q) || c.partCode.toLowerCase().includes(q);
      if (filterStatus === "stale") {
        return matchSearch && checkStale(c, today);
      }
      const matchStatus = filterStatus === "all" || c.status === filterStatus;
      const matchType = filterType === "all" || c.complaintType === filterType;
      const matchTech = filterTech === "all" || c.technicianId === filterTech;
      const age = getAgeing(c.createdAt);
      const matchAgeing = filterAgeing === "all" || filterAgeing === "0-3" && age <= 3 || filterAgeing === "4-7" && age >= 4 && age <= 7 || filterAgeing === "8+" && age >= 8;
      return matchSearch && matchStatus && matchType && matchTech && matchAgeing;
    }).sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }, [
    cases,
    search,
    filterStatus,
    filterType,
    filterTech,
    filterAgeing,
    today
  ]);
  const staleCount = reactExports.useMemo(
    () => cases.filter((c) => checkStale(c, today)).length,
    [cases, today]
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const getCustomerHistory = (c) => {
    const phones = [c.phone, c.altPhone].filter(Boolean).map(normalizePhone).filter((p) => p.length >= 7);
    if (phones.length === 0) return [];
    return cases.filter(
      (other) => other.id !== c.id && phones.some((ph) => {
        const op = normalizePhone(other.phone);
        const oap = other.altPhone ? normalizePhone(other.altPhone) : "";
        return op === ph || oap !== "" && oap === ph;
      })
    );
  };
  const toggleSelect = (id) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };
  const toggleAll = () => {
    if (selected.size === paginated.length) setSelected(/* @__PURE__ */ new Set());
    else setSelected(new Set(paginated.map((c) => c.id)));
  };
  const applyBulkStatus = () => {
    if (!bulkStatus || selected.size === 0) return;
    for (const id of selected) {
      updateCase(id, {
        status: bulkStatus,
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      });
      addAuditEntry({
        caseId: id,
        userId: (currentUser == null ? void 0 : currentUser.id) ?? "",
        userName: (currentUser == null ? void 0 : currentUser.name) ?? "",
        action: "Bulk Status Change",
        details: `Status changed to ${bulkStatus}`
      });
    }
    setSelected(/* @__PURE__ */ new Set());
    setBulkStatus("");
  };
  const handleBulkDelete = () => {
    deleteCases(Array.from(selected));
    setSelected(/* @__PURE__ */ new Set());
    setShowBulkDelete(false);
  };
  const handleImport = (rows) => {
    const count = importCases(
      rows.map((r) => ({
        caseId: "",
        // will be auto-generated in store
        customerName: r.customerName,
        phone: r.phone,
        altPhone: r.altPhone,
        address: r.address,
        product: r.product,
        productType: r.productType,
        complaintType: r.complaintType,
        status: r.status,
        technicianId: "",
        technicianFeedback: "",
        partCode: r.partCode,
        partName: r.partName,
        partPhotoUrl: "",
        poNumber: "",
        orderDate: "",
        receivedDate: "",
        nextActionDate: r.nextActionDate,
        remarks: r.remarks,
        additionalNotes: ""
      }))
    );
    setImportSuccess(count);
    setTimeout(() => setImportSuccess(null), 4e3);
  };
  const exportCSV = () => {
    const headers = [
      "Case ID",
      "Customer",
      "Phone",
      "Alt Phone",
      "Complaint Type",
      "Product",
      "Status",
      "Technician",
      "Follow-up Date",
      "Part Code",
      "Ageing",
      "Last Updated"
    ];
    const rows = filtered.map((c) => {
      var _a;
      return [
        c.caseId,
        c.customerName,
        c.phone,
        c.altPhone || "",
        c.complaintType.replace(/_/g, " "),
        c.product,
        c.status,
        ((_a = technicians.find((t) => t.id === c.technicianId)) == null ? void 0 : _a.name) ?? "",
        c.nextActionDate ? new Date(c.nextActionDate).toLocaleDateString("en-IN") : "",
        c.partCode,
        `${getAgeing(c.createdAt)}d`,
        new Date(c.updatedAt).toLocaleDateString("en-IN")
      ];
    });
    const csv = [headers, ...rows].map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cases-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const rowClass = (c) => {
    if (checkStale(c, today))
      return "bg-amber-50 border-l-4 border-l-amber-400 hover:bg-amber-100";
    const age = getAgeing(c.createdAt);
    const closed = [
      "closed",
      "cancelled",
      "transferred",
      "adjustment_closed",
      "replacement_done"
    ].includes(c.status);
    if (!closed && age >= 8) return "bg-red-50 hover:bg-red-100";
    if (c.status === "pending") return "bg-yellow-50 hover:bg-yellow-100";
    if (closed) return "bg-green-50 hover:bg-green-100";
    return "hover:bg-blue-50";
  };
  const formatFollowUp = (dateStr) => {
    if (!dateStr) return "—";
    try {
      const d = new Date(dateStr);
      const day = String(d.getDate()).padStart(2, "0");
      const month = d.toLocaleString("en-IN", { month: "short" });
      const year = d.getFullYear();
      return `${day} ${month} ${year}`;
    } catch {
      return "—";
    }
  };
  const getPartStatusBreakdown = (c) => {
    if (!c.parts || c.parts.length === 0) return null;
    const counts = {};
    for (const p of c.parts) {
      const s = p.status;
      counts[s] = (counts[s] ?? 0) + 1;
    }
    const lines = [];
    if (counts.pending)
      lines.push({
        label: "Required",
        color: "text-red-600 bg-red-50",
        count: counts.pending
      });
    if (counts.available || counts.part_available)
      lines.push({
        label: "Available",
        color: "text-emerald-600 bg-emerald-50",
        count: (counts.available ?? 0) + (counts.part_available ?? 0)
      });
    if (counts.ordered || counts.part_ordered)
      lines.push({
        label: "Ordered",
        color: "text-blue-600 bg-blue-50",
        count: (counts.ordered ?? 0) + (counts.part_ordered ?? 0)
      });
    if (counts.received || counts.part_received)
      lines.push({
        label: "Received",
        color: "text-violet-600 bg-violet-50",
        count: (counts.received ?? 0) + (counts.part_received ?? 0)
      });
    if (counts.issued)
      lines.push({
        label: "Issued",
        color: "text-amber-600 bg-amber-50",
        count: counts.issued
      });
    if (counts.rejected)
      lines.push({
        label: "Rejected",
        color: "text-gray-500 bg-gray-50",
        count: counts.rejected
      });
    return lines.length > 0 ? lines : null;
  };
  const isAdmin = (currentUser == null ? void 0 : currentUser.role) === "admin";
  const quickFilters = [
    { label: "All", value: "all", icon: ClipboardList },
    {
      label: `No Update${staleCount > 0 ? ` (${staleCount})` : ""}`,
      value: "stale",
      icon: TriangleAlert
    },
    { label: "New", value: "new", icon: FileText },
    { label: "Pending", value: "pending", icon: Clock },
    { label: "On Route", value: "on_route", icon: Truck },
    { label: "Part Required", value: "part_required", icon: Package },
    { label: "Closed", value: "closed", icon: CircleCheckBig }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 bg-white/20 rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "All Cases" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-blue-200 text-sm", children: [
            filtered.length,
            " cases found"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap", children: [
        importSuccess !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-green-700 bg-green-100 border border-green-200 rounded-full px-3 py-1.5 font-medium", children: [
          importSuccess,
          " cases imported successfully"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setShowImport(true),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4 mr-1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Import CSV" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: exportCSV, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4 mr-1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Export CSV" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            onClick: () => navigate("new-case"),
            "data-ocid": "cases.primary_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "h-4 w-4 mr-1" }),
              "New Case"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: quickFilters.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => {
          setFilterStatus(f.value);
          setPage(1);
        },
        className: `px-3 py-1.5 text-xs rounded-full font-medium transition-colors ${filterStatus === f.value ? f.value === "stale" ? "bg-amber-500 text-white shadow-sm" : "bg-blue-600 text-white shadow-sm" : f.value === "stale" && staleCount > 0 ? "bg-amber-100 text-amber-700 border border-amber-300" : "bg-white text-gray-600 border hover:bg-gray-50"}`,
        "data-ocid": "cases.tab",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(f.icon, { className: "h-3 w-3 inline mr-1" }),
          f.label
        ]
      },
      f.value
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border shadow-sm p-3 sm:p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search case ID, customer, phone...",
            value: search,
            onChange: (e) => {
              setSearch(e.target.value);
              setPage(1);
            },
            className: "flex-1",
            "data-ocid": "cases.search_input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setShowFilters(!showFilters),
            className: "shrink-0",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline ml-1", children: "Filters" })
            ]
          }
        )
      ] }),
      showFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: filterStatus,
            onValueChange: (v) => {
              setFilterStatus(v);
              setPage(1);
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Status" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Status" }),
                [
                  "new",
                  "printed",
                  "confirmed",
                  "pending",
                  "on_route",
                  "rescheduled",
                  "part_required",
                  "part_ordered",
                  "part_received",
                  "re_open",
                  "gas_charge_pending",
                  "gas_charge_done",
                  "adjustment_closed",
                  "replacement_done",
                  "closed",
                  "cancelled",
                  "transferred"
                ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s.replace(/_/g, " ") }, s))
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: filterType,
            onValueChange: (v) => {
              setFilterType(v);
              setPage(1);
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Type" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Types" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "installation", children: "Installation" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "breakdown", children: "Breakdown" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "stock_repair", children: "Stock Repair" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: filterTech,
            onValueChange: (v) => {
              setFilterTech(v);
              setPage(1);
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Technician" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Technicians" }),
                technicians.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: t.id, children: t.name }, t.id))
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: filterAgeing,
            onValueChange: (v) => {
              setFilterAgeing(v);
              setPage(1);
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Ageing" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Ages" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "0-3", children: "0–3 days" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "4-7", children: "4–7 days" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "8+", children: "8+ days" })
              ] })
            ]
          }
        )
      ] }),
      selected.size > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 pt-2 border-t", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-gray-600 font-medium", children: [
          selected.size,
          " selected"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: bulkStatus, onValueChange: setBulkStatus, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-40 text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Change status" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: [
            "pending",
            "confirmed",
            "on_route",
            "part_required",
            "closed",
            "cancelled"
          ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s.replace(/_/g, " ") }, s)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", onClick: applyBulkStatus, disabled: !bulkStatus, children: "Apply" }),
        isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "destructive",
            onClick: () => setShowBulkDelete(true),
            className: "flex items-center gap-1",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
              "Delete Selected (",
              selected.size,
              ")"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => setSelected(/* @__PURE__ */ new Set()),
            children: "Clear"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border shadow-sm overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "min-w-[1200px] w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b bg-gray-50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-3 w-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: selected.size === paginated.length && paginated.length > 0,
              onChange: toggleAll,
              className: "rounded"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap", children: "Case ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap", children: "Customer Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap", children: "Mobile" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap", children: "Complaint Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap", children: "Product" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap", children: "Technician" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap", children: "Follow-up" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap", children: "Age" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap", children: "Cust. History" }),
          isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap", children: "Del" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          paginated.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "td",
            {
              colSpan: isAdmin ? 12 : 11,
              className: "py-10 text-center text-gray-400 text-sm",
              "data-ocid": "cases.empty_state",
              children: "No cases found"
            }
          ) }),
          paginated.map((c, idx) => {
            const age = getAgeing(c.createdAt);
            const history = getCustomerHistory(c);
            const tech = technicians.find((t) => t.id === c.technicianId);
            const stale = checkStale(c, today);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: `border-b last:border-0 cursor-pointer transition-colors ${rowClass(c)}`,
                onClick: () => navigate("case-detail", c.id),
                onKeyDown: (e) => {
                  if (e.key === "Enter") navigate("case-detail", c.id);
                },
                tabIndex: 0,
                "data-ocid": `cases.item.${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "td",
                    {
                      className: "px-3 py-3",
                      onClick: (e) => e.stopPropagation(),
                      onKeyDown: (e) => e.stopPropagation(),
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "checkbox",
                          checked: selected.has(c.id),
                          onChange: () => toggleSelect(c.id),
                          className: "rounded"
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 font-medium text-blue-700 whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                    stale && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { title: "No technician update", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3.5 w-3.5 text-amber-500 shrink-0" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: c.caseId })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 text-gray-800 font-medium whitespace-nowrap", children: c.customerName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 text-gray-600 whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: c.phone }),
                    c.altPhone && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-400", children: c.altPhone })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 text-gray-600 whitespace-nowrap capitalize text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `px-2 py-0.5 rounded-full text-xs font-medium ${c.complaintType === "installation" ? "bg-blue-100 text-blue-700" : c.complaintType === "breakdown" ? "bg-red-100 text-red-700" : "bg-purple-100 text-purple-700"}`,
                      children: c.complaintType.replace(/_/g, " ")
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 text-gray-600 text-xs whitespace-nowrap", children: c.product }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 whitespace-nowrap", children: (() => {
                    const breakdown = getPartStatusBreakdown(c);
                    if (breakdown) {
                      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-0.5", children: breakdown.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: `inline-flex items-center gap-1 text-xs px-1.5 py-0.5 rounded font-medium mr-0.5 ${item.color}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: item.count }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.label })
                          ]
                        },
                        item.label
                      )) });
                    }
                    return /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: c.status });
                  })() }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 text-gray-600 text-xs whitespace-nowrap", children: (tech == null ? void 0 : tech.name) ?? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-300", children: "—" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 text-xs whitespace-nowrap", children: (() => {
                    const caseReminder = reminders.filter((r) => r.caseId === c.id && !r.isDone).sort(
                      (a, b) => new Date(a.reminderDate).getTime() - new Date(b.reminderDate).getTime()
                    )[0];
                    const dateStr = (caseReminder == null ? void 0 : caseReminder.reminderDate) ?? c.nextActionDate;
                    if (!dateStr)
                      return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-300", children: "—" });
                    const isOverdue = new Date(dateStr) < new Date(today);
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: `flex items-center gap-1 ${isOverdue ? "text-red-600" : "text-blue-600"}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Calendar,
                            {
                              className: `h-3 w-3 shrink-0 ${isOverdue ? "text-red-400" : "text-blue-400"}`
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: formatFollowUp(dateStr) }),
                          (caseReminder == null ? void 0 : caseReminder.note) && /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-3 w-3 shrink-0 opacity-60" })
                        ]
                      }
                    );
                  })() }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "td",
                    {
                      className: `px-3 py-3 font-bold text-xs whitespace-nowrap ${age >= 8 ? "text-red-600" : age >= 4 ? "text-yellow-600" : "text-green-600"}`,
                      children: [
                        age,
                        "d"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "td",
                    {
                      className: "px-3 py-3 whitespace-nowrap",
                      onClick: (e) => e.stopPropagation(),
                      onKeyDown: (e) => e.stopPropagation(),
                      children: history.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: () => setHistoryDialog({ caseId: c.id, cases: history }),
                          className: "inline-flex items-center gap-1 bg-orange-100 text-orange-700 text-xs font-bold px-2 py-0.5 rounded-full hover:bg-orange-200 transition-colors",
                          "data-ocid": `cases.item.${idx + 1}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "h-3 w-3" }),
                            history.length
                          ]
                        }
                      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-300 text-xs", children: "—" })
                    }
                  ),
                  isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "td",
                    {
                      className: "px-3 py-3 whitespace-nowrap",
                      onClick: (e) => e.stopPropagation(),
                      onKeyDown: (e) => e.stopPropagation(),
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => deleteCase(c.id),
                          className: "p-1 hover:bg-red-100 rounded text-red-400 hover:text-red-600",
                          title: "Delete case",
                          "data-ocid": `cases.delete_button.${idx + 1}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
                        }
                      )
                    }
                  )
                ]
              },
              c.id
            );
          })
        ] })
      ] }) }),
      totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-t bg-gray-50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-gray-500", children: [
          "Page ",
          page,
          " of ",
          totalPages,
          " · ",
          filtered.length,
          " cases"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => setPage((p) => Math.max(1, p - 1)),
              disabled: page === 1,
              "data-ocid": "cases.pagination_prev",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => setPage((p) => Math.min(totalPages, p + 1)),
              disabled: page === totalPages,
              "data-ocid": "cases.pagination_next",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
            }
          )
        ] })
      ] })
    ] }),
    historyDialog && /* @__PURE__ */ jsxRuntimeExports.jsx(
      CustomerHistoryDialog,
      {
        open: !!historyDialog,
        onClose: () => setHistoryDialog(null),
        relatedCases: historyDialog.cases,
        currentCaseId: historyDialog.caseId,
        onNavigate: (id) => navigate("case-detail", id)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ImportCSVDialog,
      {
        open: showImport,
        onClose: () => setShowImport(false),
        onImport: handleImport
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      BulkDeleteDialog,
      {
        open: showBulkDelete,
        count: selected.size,
        onConfirm: handleBulkDelete,
        onCancel: () => setShowBulkDelete(false)
      }
    )
  ] });
}
export {
  CasesPage as default
};
