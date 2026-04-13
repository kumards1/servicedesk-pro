import { c as createLucideIcon, u as useStore, r as reactExports, j as jsxRuntimeExports, w as Button, $ as STATUS_TRANSITIONS, a0 as getAgeing, T as TriangleAlert, a1 as ChevronLeft, a2 as StatusBadge, a3 as ChevronUp, E as ChevronDown, a4 as Phone, y as Trash2, i as Card, k as CardHeader, l as CardTitle, m as CardContent, a5 as Check, G as ue, X, a6 as Package, H as Select, J as SelectTrigger, K as SelectValue, N as SelectContent, O as SelectItem, z as Label, I as Input, x as Clock, a7 as photoTypeLabel } from "./index-De7Q6SQO.js";
import { A as AlertDialog, h as AlertDialogTrigger, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-DQvCZOLE.js";
import { T as Textarea } from "./textarea-CYtE04I-.js";
import { H as History } from "./history-DshnOP__.js";
import { M as MapPin } from "./map-pin-BwsmX031.js";
import { P as Pencil } from "./pencil-B4TAhzLG.js";
import { U as Upload } from "./upload-COLdyiGw.js";
import { P as Plus } from "./plus-B5kdLRRW.js";
import { I as Image } from "./image-B2_YahIC.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", key: "1lielz" }]
];
const MessageSquare = createLucideIcon("message-square", __iconNode);
async function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
function PartStatusSection({
  groups,
  statusColor
}) {
  const [expandedKeys, setExpandedKeys] = reactExports.useState(/* @__PURE__ */ new Set());
  const toggle = (key) => {
    setExpandedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };
  const getStatusLabel = (s) => {
    if (s === "issued") return "Issued";
    if (s === "pending") return "Pending";
    if (s === "rejected") return "Rejected";
    if (s === "cancelled") return "Cancelled";
    return s;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 border border-slate-200 rounded-lg overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-50 px-3 py-2 font-semibold text-xs text-slate-600 flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-3.5 w-3.5 text-blue-500" }),
      "Parts Status (",
      groups.length,
      " part code",
      groups.length !== 1 ? "s" : "",
      ")"
    ] }),
    groups.map((group) => {
      var _a;
      const isExpanded = expandedKeys.has(group.partCode);
      const hasIssued = group.entries.some((e) => e.status === "issued");
      const hasPending = group.entries.some((e) => e.status === "pending");
      const dominantStatus = hasIssued ? "issued" : hasPending ? "pending" : ((_a = group.entries[0]) == null ? void 0 : _a.status) ?? "pending";
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "border-t border-slate-100 first:border-t-0",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "w-full flex items-center justify-between px-3 py-2 hover:bg-slate-50 transition-colors text-left",
                onClick: () => toggle(group.partCode),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded", children: group.partCode }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-slate-500 truncate", children: group.partName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `text-xs px-1.5 py-0.5 rounded-full font-medium ${statusColor(dominantStatus)}`,
                        children: getStatusLabel(dominantStatus)
                      }
                    ),
                    group.entries.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full font-medium", children: [
                      "×",
                      group.entries.length
                    ] })
                  ] }),
                  isExpanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-3.5 w-3.5 text-slate-400 flex-shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3.5 w-3.5 text-slate-400 flex-shrink-0" })
                ]
              }
            ),
            isExpanded && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 pb-3 space-y-2", children: group.entries.map((entry, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-white border border-slate-100 rounded-lg p-2.5 space-y-1",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `text-xs px-2 py-0.5 rounded-full font-medium ${statusColor(entry.status)}`,
                        children: getStatusLabel(entry.status)
                      }
                    ),
                    entry.issuedAt && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-slate-400", children: new Date(entry.issuedAt).toLocaleDateString("en-IN") })
                  ] }),
                  entry.status === "issued" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-1 text-xs", children: [
                    entry.issuedByName && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "Issued by: " }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-slate-700", children: entry.issuedByName })
                    ] }),
                    entry.technicianName && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "To: " }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-slate-700", children: entry.technicianName })
                    ] })
                  ] }),
                  entry.status === "rejected" && entry.rejectedReason && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-red-600", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Reason: " }),
                    entry.rejectedReason
                  ] }),
                  entry.status === "cancelled" && entry.cancelledByName && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-slate-500", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Cancelled by: " }),
                    entry.cancelledByName
                  ] }),
                  entry.partPhotoUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: entry.partPhotoUrl,
                      alt: "Part",
                      className: "h-10 w-10 object-cover rounded border border-slate-200"
                    }
                  )
                ]
              },
              `${entry.reqId}-${idx}`
            )) })
          ]
        },
        group.partCode
      );
    })
  ] });
}
function CaseDetailPage() {
  const {
    cases,
    technicians,
    partItems,
    auditLog,
    reminders,
    selectedCaseId,
    navigate,
    updateCase,
    addReminder,
    addAuditEntry,
    addPhotoToCase,
    currentUser,
    settings,
    deleteCase,
    resetStaleTechnician,
    addPartRequest,
    partRequests,
    syncPartRequests,
    syncCases
  } = useStore();
  const [_retryCount, setRetryCount] = reactExports.useState(0);
  const caseData = cases.find((c) => c.id === selectedCaseId);
  reactExports.useEffect(() => {
    syncPartRequests();
    if (!caseData && selectedCaseId) {
      let attempts = 0;
      const retry = async () => {
        if (attempts >= 3) return;
        attempts++;
        await syncCases();
        setRetryCount(attempts);
      };
      const t1 = setTimeout(() => retry(), 1e3);
      const t2 = setTimeout(() => retry(), 2500);
      const t3 = setTimeout(() => retry(), 4e3);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, []);
  const [newStatus, setNewStatus] = reactExports.useState("");
  const [statusDetails, setStatusDetails] = reactExports.useState("");
  const [nextAction, setNextAction] = reactExports.useState("");
  const [techId, setTechId] = reactExports.useState("");
  const [partEntries, setPartEntries] = reactExports.useState([
    {
      id: Math.random().toString(36).slice(2),
      partCode: "",
      partName: "",
      partPhotoUrl: "",
      partPhotoFile: null,
      price: ""
    }
  ]);
  const [partPriority, setPartPriority] = reactExports.useState("normal");
  const [poNumbers, setPoNumbers] = reactExports.useState([{ id: Math.random().toString(36).slice(2), value: "" }]);
  const [orderDate, setOrderDate] = reactExports.useState("");
  const [feedbackText, setFeedbackText] = reactExports.useState("");
  const [closingPhotoFiles, setClosingPhotoFiles] = reactExports.useState([]);
  const [closingPhotoUrls, setClosingPhotoUrls] = reactExports.useState([]);
  const [reminderDate, setReminderDate] = reactExports.useState("");
  const [reminderNote, setReminderNote] = reactExports.useState("");
  const [remarks, setRemarks] = reactExports.useState((caseData == null ? void 0 : caseData.remarks) ?? "");
  const [notes, setNotes] = reactExports.useState((caseData == null ? void 0 : caseData.additionalNotes) ?? "");
  const [saving, setSaving] = reactExports.useState(false);
  const [showHistory, setShowHistory] = reactExports.useState(false);
  const closingPhotoRef = reactExports.useRef(null);
  const caseRelatedRef = reactExports.useRef(null);
  const [caseRelatedFiles, setCaseRelatedFiles] = reactExports.useState([]);
  const [caseRelatedUrls, setCaseRelatedUrls] = reactExports.useState([]);
  const [editingCaseId, setEditingCaseId] = reactExports.useState(false);
  const [newCaseIdValue, setNewCaseIdValue] = reactExports.useState("");
  const [showPartRequestDuplicateModal, setShowPartRequestDuplicateModal] = reactExports.useState(false);
  const [showPartReceivedModal, setShowPartReceivedModal] = reactExports.useState(false);
  const [selectedReceivedPartIds, setSelectedReceivedPartIds] = reactExports.useState(/* @__PURE__ */ new Set());
  const [firstDropdownChoice, setFirstDropdownChoice] = reactExports.useState("");
  const [secondDropdownChoice, setSecondDropdownChoice] = reactExports.useState("");
  const [firstSelectedPartIds, setFirstSelectedPartIds] = reactExports.useState(
    /* @__PURE__ */ new Set()
  );
  const [secondSelectedPartIds, setSecondSelectedPartIds] = reactExports.useState(/* @__PURE__ */ new Set());
  const [secondPONumbers, setSecondPONumbers] = reactExports.useState({});
  const [firstPONumbers, setFirstPONumbers] = reactExports.useState(
    {}
  );
  if (!caseData) {
    const isRetrying = selectedCaseId != null;
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-20", children: isRetrying ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 text-muted-foreground mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Loading case..." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => navigate("cases"),
          children: "Back to Cases"
        }
      )
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Case not found." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "mt-4", onClick: () => navigate("cases"), children: "Back to Cases" })
    ] }) });
  }
  const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const isStale = caseData.status === "on_route" && !!caseData.technicianId && !caseData.hasFirstUpdate && !!caseData.onRouteDate && caseData.onRouteDate < today;
  const normalizePhone = (ph) => ph.replace(/\D/g, "");
  const myPhones = [caseData.phone, caseData.altPhone].filter(Boolean).map(normalizePhone).filter((p) => p.length >= 7);
  const previousCases = cases.filter(
    (c) => c.id !== caseData.id && myPhones.some((ph) => {
      const op = normalizePhone(c.phone);
      const oap = c.altPhone ? normalizePhone(c.altPhone) : "";
      return op === ph || oap !== "" && oap === ph;
    })
  );
  const nextStatuses = STATUS_TRANSITIONS[caseData.status] ?? [];
  const assignedTech = technicians.find((t) => t.id === caseData.technicianId);
  const caseAudit = auditLog.filter((a) => a.caseId === caseData.id).sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
  const caseReminders = reminders.filter(
    (r) => r.caseId === caseData.id && !r.isDone
  );
  const age = getAgeing(caseData.createdAt);
  const handlePartPhotoSelect = async (entryId, file) => {
    const url = await fileToDataUrl(file);
    setPartEntries(
      (prev) => prev.map(
        (e) => e.id === entryId ? { ...e, partPhotoFile: file, partPhotoUrl: url } : e
      )
    );
  };
  const getPartStockStatus = (partCode) => {
    var _a;
    if (!partCode.trim()) return { label: "", color: "" };
    const matching = partItems.filter(
      (p) => p.partCode.toLowerCase() === partCode.toLowerCase() && p.status === "in_stock"
    );
    const isAdmin2 = (currentUser == null ? void 0 : currentUser.role) === "admin";
    const isSupervisor = (currentUser == null ? void 0 : currentUser.role) === "supervisor";
    if (matching.length > 0) {
      if (isAdmin2 || isSupervisor) {
        return {
          label: `In Stock (${matching.length} unit${matching.length !== 1 ? "s" : ""})`,
          color: "text-green-600 bg-green-50 border-green-200"
        };
      }
      return {
        label: "✓ In Stock",
        color: "text-green-600 bg-green-50 border-green-200"
      };
    }
    if (isAdmin2 || isSupervisor) {
      const withTech = partItems.find(
        (p) => p.partCode.toLowerCase() === partCode.toLowerCase() && p.status === "issued"
      );
      if (withTech) {
        const techName = ((_a = technicians.find((t) => t.id === withTech.technicianId)) == null ? void 0 : _a.name) ?? "technician";
        return {
          label: `With Technician: ${techName}`,
          color: "text-amber-600 bg-amber-50 border-amber-200"
        };
      }
      const installed = partItems.find(
        (p) => p.partCode.toLowerCase() === partCode.toLowerCase() && p.status === "installed"
      );
      if (installed)
        return {
          label: "Installed",
          color: "text-blue-600 bg-blue-50 border-blue-200"
        };
    }
    return {
      label: "✗ Not in Stock",
      color: "text-red-600 bg-red-50 border-red-200"
    };
  };
  const handleClosingPhotoSelect = async (files) => {
    if (!files || files.length === 0) return;
    const newFiles = Array.from(files);
    const newUrls = await Promise.all(newFiles.map(fileToDataUrl));
    setClosingPhotoFiles((prev) => [...prev, ...newFiles]);
    setClosingPhotoUrls((prev) => [...prev, ...newUrls]);
  };
  const handleCaseRelatedPhotoSelect = async (files) => {
    if (!files || files.length === 0) return;
    const newFiles = Array.from(files);
    const newUrls = await Promise.all(newFiles.map(fileToDataUrl));
    setCaseRelatedFiles((prev) => [...prev, ...newFiles]);
    setCaseRelatedUrls((prev) => [...prev, ...newUrls]);
  };
  const handleStatusChange = async () => {
    var _a;
    if (!newStatus) return;
    if (newStatus === "part_required") {
      const hasValidEntry = partEntries.some(
        (e) => e.partCode.trim() && e.partName.trim()
      );
      if (!hasValidEntry) {
        ue.error("At least one Part Name and Part Code are required.");
        return;
      }
    }
    setSaving(true);
    const allUpdates = {
      status: newStatus,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    let details = statusDetails;
    if ([
      "closed",
      "adjustment_closed",
      "replacement_done",
      "gas_charge_done"
    ].includes(newStatus)) {
      allUpdates.closedAt = (/* @__PURE__ */ new Date()).toISOString();
    }
    if (newStatus === "on_route") {
      allUpdates.onRouteDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      allUpdates.hasFirstUpdate = false;
    } else if (caseData.status === "on_route") {
      allUpdates.hasFirstUpdate = true;
    }
    if (newStatus === "pending" || newStatus === "rescheduled") {
      if (nextAction) {
        allUpdates.nextActionDate = nextAction;
        details += ` Next action: ${nextAction}`;
      }
    }
    if (newStatus === "on_route" && techId) {
      const tech = technicians.find((t) => t.id === techId);
      allUpdates.technicianId = techId;
      details += ` Assigned to: ${(tech == null ? void 0 : tech.name) ?? techId}`;
    }
    if (newStatus === "part_required") {
      const validPartEntries = partEntries.filter(
        (e) => e.partCode.trim() || e.partName.trim()
      );
      const firstPart = validPartEntries[0] ?? partEntries[0];
      if (firstPart == null ? void 0 : firstPart.partName) allUpdates.partName = firstPart.partName;
      if (firstPart == null ? void 0 : firstPart.partCode) allUpdates.partCode = firstPart.partCode;
      if (firstPart == null ? void 0 : firstPart.partPhotoUrl)
        allUpdates.partPhotoUrl = firstPart.partPhotoUrl;
      allUpdates.parts = validPartEntries.map((e) => ({
        id: Math.random().toString(36).slice(2),
        partCode: e.partCode,
        partName: e.partName,
        partPhotoUrl: e.partPhotoUrl,
        status: "pending",
        price: e.price ? Number(e.price) : void 0
      }));
      details += ` Parts: ${validPartEntries.filter((e) => e.partCode).map((e) => `${e.partName} (${e.partCode})`).join(", ")}`;
    }
    if (newStatus === "part_ordered") {
      const validPOs = poNumbers.map((p) => p.value).filter(Boolean);
      if (validPOs.length > 0) {
        allUpdates.poNumber = validPOs[0];
        allUpdates.poNumbers = validPOs;
      }
      if (orderDate) allUpdates.orderDate = orderDate;
      if (validPOs.length > 0) details += ` PO: ${validPOs.join(", ")}`;
    }
    if (feedbackText) allUpdates.technicianFeedback = feedbackText;
    if (caseRelatedUrls.length > 0) {
      const newRelatedImages = caseRelatedUrls.map((url, i) => {
        var _a2;
        return {
          id: Math.random().toString(36).slice(2),
          url,
          name: ((_a2 = caseRelatedFiles[i]) == null ? void 0 : _a2.name) ?? `Case photo ${i + 1}`
        };
      });
      allUpdates.caseRelatedImages = [
        ...caseData.caseRelatedImages ?? [],
        ...newRelatedImages
      ];
    } else {
      allUpdates.caseRelatedImages = caseData.caseRelatedImages ?? [];
    }
    const photosToAdd = [];
    if (newStatus === "part_required") {
      for (const entry of partEntries.filter((e) => e.partPhotoUrl)) {
        photosToAdd.push({
          id: Math.random().toString(36).slice(2),
          url: entry.partPhotoUrl,
          type: "part",
          name: `${entry.partCode} - ${entry.partName}`
        });
      }
    }
    if (closingPhotoUrls.length > 0 && [
      "closed",
      "adjustment_closed",
      "replacement_done",
      "gas_charge_done"
    ].includes(newStatus)) {
      for (let i = 0; i < closingPhotoUrls.length; i++) {
        photosToAdd.push({
          id: Math.random().toString(36).slice(2),
          url: closingPhotoUrls[i],
          type: "after",
          name: ((_a = closingPhotoFiles[i]) == null ? void 0 : _a.name) ?? `After work photo ${i + 1}`
        });
      }
    }
    if (photosToAdd.length > 0) {
      allUpdates.photos = [...caseData.photos ?? [], ...photosToAdd];
    }
    updateCase(caseData.id, allUpdates);
    addAuditEntry({
      caseId: caseData.id,
      userId: (currentUser == null ? void 0 : currentUser.id) ?? "",
      userName: (currentUser == null ? void 0 : currentUser.name) ?? "",
      action: "Status Changed",
      details: `${caseData.status.replace(/_/g, " ")} → ${newStatus.replace(/_/g, " ")}${details ? `. ${details}` : ""}`
    });
    ue.success(`Case status updated to ${newStatus.replace(/_/g, " ")}`);
    setCaseRelatedFiles([]);
    setCaseRelatedUrls([]);
    setClosingPhotoFiles([]);
    setClosingPhotoUrls([]);
    setNewStatus("");
    setStatusDetails("");
    setNextAction("");
    setTechId("");
    setPartEntries([
      {
        id: Math.random().toString(36).slice(2),
        partCode: "",
        partName: "",
        partPhotoUrl: "",
        partPhotoFile: null,
        price: ""
      }
    ]);
    setPartPriority("normal");
    setPoNumbers([{ id: Math.random().toString(36).slice(2), value: "" }]);
    setOrderDate("");
    setFeedbackText("");
    setSaving(false);
  };
  const saveNotes = () => {
    updateCase(caseData.id, { remarks, additionalNotes: notes });
    addAuditEntry({
      caseId: caseData.id,
      userId: (currentUser == null ? void 0 : currentUser.id) ?? "",
      userName: (currentUser == null ? void 0 : currentUser.name) ?? "",
      action: "Notes Updated",
      details: "Remarks/notes updated"
    });
  };
  const addReminderHandler = () => {
    if (!reminderDate) return;
    addReminder({
      caseId: caseData.id,
      userId: (currentUser == null ? void 0 : currentUser.id) ?? "",
      reminderDate,
      note: reminderNote,
      isDone: false
    });
    setReminderDate("");
    setReminderNote("");
  };
  const handleMultiPartStatusUpdate = async () => {
    setSaving(true);
    try {
      const resetDropdowns = () => {
        setFirstDropdownChoice("");
        setSecondDropdownChoice("");
        setFirstSelectedPartIds(/* @__PURE__ */ new Set());
        setSecondSelectedPartIds(/* @__PURE__ */ new Set());
        setFirstPONumbers({});
        setSecondPONumbers({});
        setNewStatus("");
      };
      if (firstDropdownChoice === "cancelled") {
        updateCase(caseData.id, {
          status: "cancelled",
          updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
          caseRelatedImages: caseData.caseRelatedImages ?? []
        });
        addAuditEntry({
          caseId: caseData.id,
          userId: (currentUser == null ? void 0 : currentUser.id) ?? "",
          userName: (currentUser == null ? void 0 : currentUser.name) ?? "",
          action: "Status Changed",
          details: "part required → cancelled. Case cancelled (parts not available)."
        });
        ue.success("Case cancelled");
        resetDropdowns();
        return;
      }
      const allPONumbers = [];
      if (firstDropdownChoice === "part_ordered") {
        for (const pid of Array.from(firstSelectedPartIds)) {
          if (firstPONumbers[pid]) allPONumbers.push(firstPONumbers[pid]);
        }
      }
      if (secondDropdownChoice === "part_ordered") {
        for (const pid of Array.from(secondSelectedPartIds)) {
          if (secondPONumbers[pid]) allPONumbers.push(secondPONumbers[pid]);
        }
      }
      const availableCount = (firstDropdownChoice === "part_available" ? firstSelectedPartIds.size : 0) + (secondDropdownChoice === "part_available" ? secondSelectedPartIds.size : 0);
      const orderedCount = (firstDropdownChoice === "part_ordered" ? firstSelectedPartIds.size : 0) + (secondDropdownChoice === "part_ordered" ? secondSelectedPartIds.size : 0);
      let newCaseStatus = "pending";
      if (availableCount > 0) {
        newCaseStatus = "part_available";
      } else if (orderedCount > 0) {
        newCaseStatus = "part_ordered";
      } else if (secondDropdownChoice === "cancelled") {
        newCaseStatus = "cancelled";
      }
      const updatedParts = (caseData.parts ?? []).map((p) => {
        if (firstSelectedPartIds.has(p.id)) {
          return { ...p, status: firstDropdownChoice };
        }
        if (secondSelectedPartIds.has(p.id)) {
          return { ...p, status: secondDropdownChoice };
        }
        return p;
      });
      const detailMsg = `${availableCount > 0 ? `${availableCount} part(s) available` : ""}${availableCount > 0 && orderedCount > 0 ? ", " : ""}${orderedCount > 0 ? `${orderedCount} part(s) ordered` : ""}${allPONumbers.length > 0 ? `. PO: ${allPONumbers.join(", ")}` : ""}`;
      const atomicUpdate = {
        status: newCaseStatus,
        updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
        parts: updatedParts,
        caseRelatedImages: caseData.caseRelatedImages ?? []
      };
      if (allPONumbers.length > 0) {
        atomicUpdate.poNumbers = [
          ...caseData.poNumbers ?? [],
          ...allPONumbers
        ];
        atomicUpdate.poNumber = allPONumbers[0];
      }
      updateCase(caseData.id, atomicUpdate);
      addAuditEntry({
        caseId: caseData.id,
        userId: (currentUser == null ? void 0 : currentUser.id) ?? "",
        userName: (currentUser == null ? void 0 : currentUser.name) ?? "",
        action: "Status Changed",
        details: `part required → ${newCaseStatus.replace(/_/g, " ")}. ${detailMsg}`
      });
      ue.success("Parts status updated");
      resetDropdowns();
    } finally {
      setSaving(false);
    }
  };
  const waLink = (phone) => `https://wa.me/${phone.replace(/\D/g, "")}`;
  const handlePartReceivedSubmit = () => {
    if (selectedReceivedPartIds.size === 0) {
      ue.error("Select at least one part to mark as received.");
      return;
    }
    const orderedParts = (caseData.parts ?? []).filter(
      (p) => p.status === "ordered" || p.status === "pending"
    );
    const updatedParts = (caseData.parts ?? []).map((p) => {
      if (selectedReceivedPartIds.has(p.id)) {
        return { ...p, status: "received" };
      }
      return p;
    });
    const stillOrdered = updatedParts.filter(
      (p) => p.status === "ordered" || p.status === "pending"
    );
    const allIssued = updatedParts.every(
      (p) => ["received", "issued", "rejected"].includes(p.status)
    );
    const newCaseStatus = allIssued || stillOrdered.length === 0 ? "part_received" : "part_ordered";
    updateCase(caseData.id, {
      parts: updatedParts,
      status: newCaseStatus,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      caseRelatedImages: caseData.caseRelatedImages ?? []
    });
    addAuditEntry({
      caseId: caseData.id,
      userId: (currentUser == null ? void 0 : currentUser.id) ?? "",
      userName: (currentUser == null ? void 0 : currentUser.name) ?? "",
      action: "Parts Received",
      details: `${selectedReceivedPartIds.size} of ${orderedParts.length} ordered part(s) marked received. Case status: ${newCaseStatus.replace(/_/g, " ")}`
    });
    ue.success(`${selectedReceivedPartIds.size} part(s) marked as received`);
    setShowPartReceivedModal(false);
    setSelectedReceivedPartIds(/* @__PURE__ */ new Set());
  };
  const waPartQuery = () => {
    const supervisorName = settings.supervisorName ?? "Mishra";
    const firstPart = partEntries[0];
    const hasPhoto = !!(caseData.partPhotoUrl || (firstPart == null ? void 0 : firstPart.partPhotoUrl));
    const msg = encodeURIComponent(
      `Hello ${supervisorName} ji,
Case ID: ${caseData.caseId}
Customer: ${caseData.customerName}
Product: ${caseData.product} ${caseData.productType}
Required Part: ${caseData.partName || (firstPart == null ? void 0 : firstPart.partName) || ""}
Part Code: ${caseData.partCode || (firstPart == null ? void 0 : firstPart.partCode) || ""}
${hasPhoto ? "Part photo available.\n" : ""}Please confirm availability.`
    );
    return `https://wa.me/${settings.supervisorWhatsApp}?text=${msg}`;
  };
  const isClosingStatus = [
    "closed",
    "adjustment_closed",
    "replacement_done",
    "gas_charge_done"
  ].includes(newStatus);
  const isAdmin = (currentUser == null ? void 0 : currentUser.role) === "admin";
  const handleResetStale = () => {
    resetStaleTechnician(caseData.id);
    ue.success(
      `Technician unassigned. Case ${caseData.caseId} reset to Pending.`
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto space-y-4", children: [
    isStale && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-amber-50 border border-amber-400 rounded-xl px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-3",
        "data-ocid": "case_detail.panel",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-amber-700", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-5 w-5 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "No technician update received — this case will auto-reset at midnight unless you take action." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: "outline",
              className: "shrink-0 border-amber-500 text-amber-700 hover:bg-amber-100",
              onClick: handleResetStale,
              "data-ocid": "case_detail.button",
              children: "Reset Technician Now"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => navigate("cases"),
          className: "p-2 hover:bg-gray-100 rounded-lg self-start",
          "data-ocid": "case_detail.link",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-5 w-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-gray-900", children: caseData.caseId }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: caseData.status }),
          age >= 8 && ![
            "closed",
            "cancelled",
            "transferred",
            "adjustment_closed",
            "replacement_done",
            "gas_charge_done"
          ].includes(caseData.status) && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3 w-3" }),
            " Overdue (",
            age,
            " days)"
          ] }),
          previousCases.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setShowHistory((v) => !v),
              className: "flex items-center gap-1 text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full hover:bg-amber-100",
              "data-ocid": "case_detail.toggle",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "h-3 w-3" }),
                previousCases.length,
                " previous complaint",
                previousCases.length !== 1 ? "s" : "",
                showHistory ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3 w-3" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-500 mt-0.5", children: [
          caseData.customerName,
          " — ",
          caseData.product,
          " —",
          " ",
          caseData.complaintType.replace("_", " ")
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: `tel:${caseData.phone}`,
            className: "flex items-center gap-1 text-xs bg-green-50 text-green-700 border border-green-200 px-3 py-1.5 rounded-lg hover:bg-green-100",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-3 w-3" }),
              " Call"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: waLink(caseData.phone),
            target: "_blank",
            rel: "noopener noreferrer",
            className: "flex items-center gap-1 text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-lg hover:bg-emerald-100",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-3 w-3" }),
              " WhatsApp"
            ]
          }
        ),
        caseData.address && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: `https://maps.google.com/?q=${encodeURIComponent(caseData.address)}`,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "flex items-center gap-1 text-xs bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-100",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
              " Navigate"
            ]
          }
        ),
        isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "destructive",
              size: "sm",
              className: "h-auto py-1.5",
              "data-ocid": "case_detail.open_modal_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3 mr-1" }),
                "Delete"
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogTitle, { children: [
                "Delete Case ",
                caseData.caseId,
                "?"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "This action cannot be undone. The case, audit trail, and all attached data will be permanently removed." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "case_detail.cancel_button", children: "Cancel" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                AlertDialogAction,
                {
                  className: "bg-red-600 hover:bg-red-700 text-white",
                  onClick: () => {
                    deleteCase(caseData.id);
                    navigate("cases");
                  },
                  "data-ocid": "case_detail.confirm_button",
                  children: "Delete Permanently"
                }
              )
            ] })
          ] })
        ] })
      ] })
    ] }),
    showHistory && previousCases.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm border-amber-200 bg-amber-50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2 pt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-xs text-amber-800 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "h-3.5 w-3.5" }),
        " Previous Complaints for",
        " ",
        caseData.customerName
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-1 pb-3", children: previousCases.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ).map((pc) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => navigate("case-detail", pc.id),
          className: "w-full text-left flex items-center gap-3 bg-white border border-amber-200 rounded-lg px-3 py-2 hover:bg-amber-100 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-amber-800", children: pc.caseId }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: pc.status })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-500", children: [
                pc.product,
                " —",
                " ",
                new Date(pc.createdAt).toLocaleDateString("en-IN")
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3 w-3 text-amber-600 rotate-[-90deg]" })
          ]
        },
        pc.id
      )) })
    ] }),
    caseData.complaintType === "stock_repair" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-purple-50 border border-purple-200 rounded-lg px-4 py-2 text-sm text-purple-700", children: "Dealer Stock Repair — No customer call needed. Send mail to company after completion." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm", children: "Case Information" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500 min-w-[100px] shrink-0", children: "Case ID:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 flex-1", children: editingCaseId && isAdmin ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  value: newCaseIdValue,
                  onChange: (e) => setNewCaseIdValue(e.target.value),
                  className: "text-sm font-medium border rounded px-2 py-0.5 flex-1",
                  "data-ocid": "case_detail.input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    if (newCaseIdValue.trim()) {
                      updateCase(caseData.id, {
                        caseId: newCaseIdValue.trim()
                      });
                      ue.success("Case ID updated");
                    }
                    setEditingCaseId(false);
                  },
                  className: "text-green-600 hover:text-green-800",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setEditingCaseId(false);
                    setNewCaseIdValue(caseData.caseId);
                  },
                  className: "text-gray-400 hover:text-gray-600",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
                }
              )
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-900 font-medium", children: caseData.caseId }),
              isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setEditingCaseId(true);
                    setNewCaseIdValue(caseData.caseId);
                  },
                  className: "text-gray-400 hover:text-blue-600 ml-1",
                  title: "Edit Case ID",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" })
                }
              )
            ] }) })
          ] }),
          [
            ["Customer", caseData.customerName],
            ["Phone", caseData.phone],
            ["Alt Phone", caseData.altPhone || "—"],
            ["Address", caseData.address || "—"],
            ["Product", `${caseData.product} ${caseData.productType}`],
            ["Technician", (assignedTech == null ? void 0 : assignedTech.name) ?? "Not assigned"],
            [
              "Created",
              `${new Date(caseData.createdAt).toLocaleString("en-IN")} (${getAgeing(caseData.createdAt) === 0 ? "Today" : getAgeing(caseData.createdAt) === 1 ? "1 day ago" : `${getAgeing(caseData.createdAt)} days ago`})`
            ],
            [
              "Last Updated",
              new Date(caseData.updatedAt).toLocaleString("en-IN")
            ]
          ].map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gray-500 min-w-[100px] shrink-0", children: [
              k,
              ":"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-900 font-medium break-words", children: v })
          ] }, k)),
          caseData.parts && caseData.parts.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 p-2 bg-orange-50 rounded-lg space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-orange-700", children: [
              "Parts Required (",
              caseData.parts.length,
              ")"
            ] }),
            caseData.parts.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono bg-orange-100 px-1 rounded", children: p.partCode }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-orange-600", children: p.partName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-xs px-1 rounded ${p.status === "issued" ? "bg-green-100 text-green-700" : p.status === "rejected" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`,
                  children: p.status
                }
              ),
              p.partPhotoUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: p.partPhotoUrl,
                  alt: "Part",
                  className: "h-8 w-8 object-cover rounded border"
                }
              )
            ] }, p.id)),
            caseData.poNumber && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-orange-600", children: [
              "PO: ",
              caseData.poNumber
            ] }),
            caseData.poNumbers && caseData.poNumbers.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-orange-600", children: [
              "POs: ",
              caseData.poNumbers.join(", ")
            ] })
          ] }) : caseData.partCode ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 p-2 bg-orange-50 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-orange-700", children: "Part Info" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-orange-600", children: [
              caseData.partName,
              " (",
              caseData.partCode,
              ")"
            ] }),
            caseData.poNumber && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-orange-600", children: [
              "PO: ",
              caseData.poNumber
            ] }),
            caseData.orderDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-orange-600", children: [
              "Ordered:",
              " ",
              new Date(caseData.orderDate).toLocaleDateString("en-IN")
            ] }),
            caseData.partPhotoUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: caseData.partPhotoUrl,
                alt: "Part",
                className: "h-16 w-16 object-cover rounded border"
              }
            ) })
          ] }) : null,
          (() => {
            const caseReqs = partRequests.filter(
              (r) => r.caseDbId === caseData.id
            );
            if (caseReqs.length === 0) return null;
            const groupMap = /* @__PURE__ */ new Map();
            for (const req of caseReqs) {
              if (req.parts && req.parts.length > 0) {
                for (const p of req.parts) {
                  const key = p.partCode || p.partName || "Unknown";
                  const existing = groupMap.get(key) ?? {
                    partCode: key,
                    partName: p.partName || key,
                    entries: []
                  };
                  const tech = technicians.find(
                    (t) => t.id === (p.technicianId || req.technicianId)
                  );
                  existing.entries.push({
                    reqId: req.id,
                    status: p.status || req.status,
                    issuedByName: p.issuedByName || req.issuedByName || "",
                    technicianName: (tech == null ? void 0 : tech.name) || req.issuedByName || "",
                    issuedAt: p.issuedAt || req.issuedAt || "",
                    rejectedReason: req.rejectedReason || "",
                    cancelledByName: req.cancelledByName || "",
                    partPhotoUrl: p.partPhotoUrl || ""
                  });
                  groupMap.set(key, existing);
                }
              } else {
                const key = req.partCode || req.partName || "Unknown";
                const existing = groupMap.get(key) ?? {
                  partCode: key,
                  partName: req.partName || key,
                  entries: []
                };
                const tech = technicians.find(
                  (t) => t.id === req.technicianId
                );
                existing.entries.push({
                  reqId: req.id,
                  status: req.status,
                  issuedByName: req.issuedByName || "",
                  technicianName: (tech == null ? void 0 : tech.name) || "",
                  issuedAt: req.issuedAt || "",
                  rejectedReason: req.rejectedReason || "",
                  cancelledByName: req.cancelledByName || "",
                  partPhotoUrl: req.partPhotoUrl || ""
                });
                groupMap.set(key, existing);
              }
            }
            const groups = [...groupMap.values()];
            const statusColor = (s) => {
              if (s === "issued") return "bg-green-100 text-green-700";
              if (s === "pending") return "bg-amber-100 text-amber-700";
              if (s === "rejected") return "bg-red-100 text-red-700";
              if (s === "cancelled") return "bg-slate-100 text-slate-600";
              return "bg-blue-100 text-blue-700";
            };
            return /* @__PURE__ */ jsxRuntimeExports.jsx(PartStatusSection, { groups, statusColor });
          })()
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm", children: "Update Status" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3", children: nextStatuses.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-500 bg-gray-50 p-3 rounded-lg", children: [
          "Case is in final state:",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: caseData.status.replace(/_/g, " ") })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          caseData.status === "part_ordered" && caseData.parts && caseData.parts.length > 0 && (() => {
            const orderedParts = caseData.parts.filter(
              (p) => p.status === "ordered" || p.status === "pending"
            );
            const receivedParts = caseData.parts.filter(
              (p) => p.status === "received"
            );
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 border border-teal-200 rounded-xl p-3 bg-teal-50/40", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-semibold text-teal-700 flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-3.5 w-3.5" }),
                "Parts ordered — mark received:"
              ] }),
              receivedParts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-teal-600 bg-teal-50 border border-teal-200 rounded p-2", children: [
                "✓ ",
                receivedParts.length,
                " part(s) already received:",
                " ",
                receivedParts.map((p) => p.partCode).join(", ")
              ] }),
              orderedParts.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-slate-600", children: [
                  orderedParts.length,
                  " part(s) still awaiting receipt"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    onClick: () => {
                      setShowPartReceivedModal(true);
                      setSelectedReceivedPartIds(/* @__PURE__ */ new Set());
                    },
                    className: "w-full bg-teal-600 hover:bg-teal-700",
                    "data-ocid": "case_detail.part_received_button",
                    children: "Mark Parts Received"
                  }
                )
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-emerald-600 font-medium", children: '✓ All parts received — select "Part Issued" or next status below' }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-slate-200 pt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 text-center", children: "— or update to other status below —" }) })
            ] });
          })(),
          caseData.status === "part_required" && (() => {
            const caseParts = (() => {
              if (caseData.parts && caseData.parts.length > 0) {
                return caseData.parts.map((p) => ({
                  id: p.id,
                  partCode: p.partCode,
                  partName: p.partName,
                  status: p.status ?? "pending",
                  partPhotoUrl: p.partPhotoUrl
                }));
              }
              const linkedReqs = partRequests.filter(
                (r) => r.caseDbId === caseData.id && r.status === "pending"
              );
              return linkedReqs.flatMap((r) => {
                if (r.parts && r.parts.length > 0) {
                  return r.parts.map((p) => ({
                    id: p.id,
                    partCode: p.partCode,
                    partName: p.partName,
                    status: p.status ?? "pending",
                    partPhotoUrl: p.partPhotoUrl
                  }));
                }
                if (r.partCode) {
                  return [
                    {
                      id: r.id,
                      partCode: r.partCode,
                      partName: r.partName,
                      status: "pending",
                      partPhotoUrl: r.partPhotoUrl
                    }
                  ];
                }
                return [];
              });
            })();
            if (caseParts.length === 0) return null;
            const isMultiple = caseParts.length > 1;
            if (!isMultiple) {
              const part = caseParts[0];
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 border border-indigo-100 rounded-xl p-3 bg-indigo-50/40", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-semibold text-indigo-700 flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-3.5 w-3.5" }),
                  "1 part required — update status:"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs bg-white border border-slate-200 rounded-lg px-3 py-2 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold text-slate-700", children: part.partCode }),
                  part.partName && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-500", children: [
                    "— ",
                    part.partName
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: firstDropdownChoice,
                    onValueChange: (v) => {
                      setFirstDropdownChoice(
                        v
                      );
                      setFirstSelectedPartIds(/* @__PURE__ */ new Set([part.id]));
                      setFirstPONumbers({});
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-8 text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Choose status..." }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "part_available", children: "✅ Part Available" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "part_ordered", children: "📦 Part Ordered (PO)" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "cancelled", children: "⏳ Pending / Cancel" })
                      ] })
                    ]
                  }
                ),
                firstDropdownChoice === "part_ordered" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "PO Number (optional)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      className: "h-7 text-xs",
                      placeholder: "e.g. PO-2024-001",
                      value: firstPONumbers[part.id] || "",
                      onChange: (e) => setFirstPONumbers({
                        [part.id]: e.target.value
                      })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    onClick: handleMultiPartStatusUpdate,
                    disabled: saving || firstDropdownChoice === "",
                    className: "w-full bg-indigo-600 hover:bg-indigo-700",
                    "data-ocid": "case_detail.submit_button",
                    children: saving ? "Saving..." : "Update Part Status"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-slate-200 pt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 text-center", children: "— or update to other status below —" }) })
              ] });
            }
            const remainingForSecond = caseParts.filter(
              (p) => !firstSelectedPartIds.has(p.id)
            );
            const secondOptions = firstDropdownChoice === "part_available" ? [
              {
                value: "part_ordered",
                label: "Part Ordered (PO)"
              },
              { value: "cancelled", label: "Pending / Cancel" }
            ] : firstDropdownChoice === "part_ordered" ? [
              {
                value: "part_available",
                label: "Part Available"
              },
              { value: "cancelled", label: "Pending / Cancel" }
            ] : [];
            const showSecondDropdown = firstDropdownChoice !== "" && firstDropdownChoice !== "cancelled" && firstSelectedPartIds.size > 0 && remainingForSecond.length > 0;
            const canSubmit = firstDropdownChoice === "cancelled" || firstDropdownChoice !== "" && firstSelectedPartIds.size > 0;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 border border-indigo-100 rounded-xl p-3 bg-indigo-50/40", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-semibold text-indigo-700 flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-3.5 w-3.5" }),
                caseParts.length,
                " parts required — update their status:"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-medium text-slate-600", children: "First — Select primary status:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: firstDropdownChoice,
                    onValueChange: (v) => {
                      setFirstDropdownChoice(
                        v
                      );
                      setFirstSelectedPartIds(/* @__PURE__ */ new Set());
                      setFirstPONumbers({});
                      setSecondDropdownChoice("");
                      setSecondSelectedPartIds(/* @__PURE__ */ new Set());
                      setSecondPONumbers({});
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-8 text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Choose status..." }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "part_available", children: "✅ Part Available" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "part_ordered", children: "📦 Part Ordered (PO)" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "cancelled", children: "⏳ Pending / Cancel Case" })
                      ] })
                    ]
                  }
                )
              ] }),
              firstDropdownChoice !== "" && firstDropdownChoice !== "cancelled" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: `rounded-lg p-2 space-y-1 border ${firstDropdownChoice === "part_available" ? "border-green-200 bg-green-50" : "border-blue-200 bg-blue-50"}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-slate-600 mb-1", children: [
                      "Select parts to mark as",
                      " ",
                      firstDropdownChoice === "part_available" ? "Available" : "Ordered",
                      ":"
                    ] }),
                    caseParts.map((part) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 py-1 cursor-pointer", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            type: "checkbox",
                            className: "rounded",
                            checked: firstSelectedPartIds.has(
                              part.id
                            ),
                            onChange: (e) => {
                              setFirstSelectedPartIds((prev) => {
                                const next = new Set(prev);
                                if (e.target.checked)
                                  next.add(part.id);
                                else next.delete(part.id);
                                return next;
                              });
                              if (e.target.checked) {
                                setSecondSelectedPartIds((prev) => {
                                  const next = new Set(prev);
                                  next.delete(part.id);
                                  return next;
                                });
                              }
                            }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "font-mono", children: part.partCode }),
                          part.partName ? ` — ${part.partName}` : ""
                        ] })
                      ] }),
                      firstDropdownChoice === "part_ordered" && firstSelectedPartIds.has(part.id) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          className: "mt-1 text-xs h-7 ml-5",
                          placeholder: "PO Number (optional)",
                          value: firstPONumbers[part.id] || "",
                          onChange: (e) => setFirstPONumbers((prev) => ({
                            ...prev,
                            [part.id]: e.target.value
                          }))
                        }
                      )
                    ] }, `first-${part.id}`))
                  ]
                }
              ),
              showSecondDropdown && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs font-medium text-slate-600", children: [
                  "Second — Remaining ",
                  remainingForSecond.length,
                  " ",
                  "part(s) status:"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: secondDropdownChoice,
                    onValueChange: (v) => {
                      setSecondDropdownChoice(
                        v
                      );
                      setSecondSelectedPartIds(/* @__PURE__ */ new Set());
                      setSecondPONumbers({});
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-8 text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Choose status for remaining parts..." }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: secondOptions.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: opt.value, children: [
                        opt.value === "part_available" ? "✅" : opt.value === "part_ordered" ? "📦" : "⏳",
                        " ",
                        opt.label
                      ] }, opt.value)) })
                    ]
                  }
                ),
                secondDropdownChoice !== "" && secondDropdownChoice !== "cancelled" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: `rounded-lg p-2 space-y-1 border ${secondDropdownChoice === "part_available" ? "border-green-200 bg-green-50" : "border-blue-200 bg-blue-50"}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-slate-600 mb-1", children: [
                        "Select parts to mark as",
                        " ",
                        secondDropdownChoice === "part_available" ? "Available" : "Ordered",
                        ":"
                      ] }),
                      remainingForSecond.map((part) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 py-1 cursor-pointer", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "input",
                            {
                              type: "checkbox",
                              className: "rounded",
                              checked: secondSelectedPartIds.has(
                                part.id
                              ),
                              onChange: (e) => {
                                setSecondSelectedPartIds((prev) => {
                                  const next = new Set(prev);
                                  if (e.target.checked)
                                    next.add(part.id);
                                  else next.delete(part.id);
                                  return next;
                                });
                              }
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "font-mono", children: part.partCode }),
                            part.partName ? ` — ${part.partName}` : ""
                          ] })
                        ] }),
                        secondDropdownChoice === "part_ordered" && secondSelectedPartIds.has(part.id) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Input,
                          {
                            className: "mt-1 text-xs h-7 ml-5",
                            placeholder: "PO Number (optional)",
                            value: secondPONumbers[part.id] || "",
                            onChange: (e) => setSecondPONumbers((prev) => ({
                              ...prev,
                              [part.id]: e.target.value
                            }))
                          }
                        )
                      ] }, `second-${part.id}`))
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: handleMultiPartStatusUpdate,
                  disabled: saving || !canSubmit,
                  className: "w-full bg-indigo-600 hover:bg-indigo-700",
                  "data-ocid": "case_detail.submit_button",
                  children: saving ? "Saving..." : "Update Parts Status"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-slate-200 pt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 text-center", children: "— or update to other status below —" }) })
            ] });
          })(),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "New Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: newStatus,
                onValueChange: (v) => setNewStatus(v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "case_detail.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select next status" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: nextStatuses.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s.replace(/_/g, " ").toUpperCase() }, s)) })
                ]
              }
            )
          ] }),
          (newStatus === "pending" || newStatus === "rescheduled") && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Next Action Date *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "date",
                value: nextAction,
                onChange: (e) => setNextAction(e.target.value),
                required: true,
                "data-ocid": "case_detail.input"
              }
            )
          ] }),
          newStatus === "on_route" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Assign Technician *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: techId, onValueChange: setTechId, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select technician" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: technicians.filter((t) => t.isActive).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: t.id, children: [
                t.name,
                " (",
                t.specialization,
                ")"
              ] }, t.id)) })
            ] })
          ] }),
          newStatus === "part_required" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            partEntries.map((entry, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "border border-gray-200 rounded-lg p-3 space-y-2 bg-gray-50",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-gray-600", children: [
                      "Part ",
                      idx + 1
                    ] }),
                    partEntries.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setPartEntries(
                          (prev) => prev.filter((e) => e.id !== entry.id)
                        ),
                        className: "text-red-400 hover:text-red-600",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Part Name *" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          placeholder: "e.g. Compressor",
                          value: entry.partName,
                          onChange: (e) => setPartEntries(
                            (prev) => prev.map(
                              (p) => p.id === entry.id ? { ...p, partName: e.target.value } : p
                            )
                          )
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Part Code *" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          placeholder: "e.g. COMP-350",
                          value: entry.partCode,
                          onChange: (e) => setPartEntries(
                            (prev) => prev.map(
                              (p) => p.id === entry.id ? {
                                ...p,
                                partCode: e.target.value,
                                stockStatus: void 0
                              } : p
                            )
                          ),
                          onBlur: (e) => {
                            const status = getPartStockStatus(
                              e.target.value
                            );
                            setPartEntries(
                              (prev) => prev.map(
                                (p) => p.id === entry.id ? { ...p, stockStatus: status.label } : p
                              )
                            );
                          }
                        }
                      ),
                      entry.partCode && (() => {
                        const st = getPartStockStatus(entry.partCode);
                        return st.label ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: `text-xs px-2 py-0.5 rounded border ${st.color}`,
                            children: st.label
                          }
                        ) : null;
                      })()
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Price ₹ (optional)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        type: "number",
                        placeholder: "e.g. 1500",
                        value: entry.price ?? "",
                        onChange: (e) => setPartEntries(
                          (prev) => prev.map(
                            (p) => p.id === entry.id ? { ...p, price: e.target.value } : p
                          )
                        )
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Part Photo (optional)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-xs border border-dashed border-gray-300 rounded-lg px-3 py-2 w-full hover:bg-gray-100 cursor-pointer", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-3 w-3 text-gray-400" }),
                      entry.partPhotoFile ? entry.partPhotoFile.name : "Upload part photo",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "file",
                          accept: "image/*",
                          className: "hidden",
                          onChange: (e) => {
                            var _a;
                            const f = (_a = e.target.files) == null ? void 0 : _a[0];
                            if (f) handlePartPhotoSelect(entry.id, f);
                          }
                        }
                      )
                    ] }),
                    entry.partPhotoUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: entry.partPhotoUrl,
                        alt: "Part",
                        className: "h-16 w-16 object-cover rounded border"
                      }
                    )
                  ] })
                ]
              },
              entry.id
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setPartEntries((prev) => [
                  ...prev,
                  {
                    id: Math.random().toString(36).slice(2),
                    partCode: "",
                    partName: "",
                    partPhotoUrl: "",
                    partPhotoFile: null,
                    price: ""
                  }
                ]),
                className: "flex items-center gap-2 text-xs text-blue-600 border border-blue-200 px-3 py-2 rounded-lg hover:bg-blue-50 w-full justify-center",
                "data-ocid": "case_detail.button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" }),
                  " Add Another Part"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "partPriority",
                  className: "text-xs font-medium text-gray-600",
                  children: "Request Priority"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  id: "partPriority",
                  value: partPriority,
                  onChange: (e) => setPartPriority(e.target.value),
                  className: "w-full text-xs border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "low", children: "Low" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "normal", children: "Normal" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "high", children: "High" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "urgent", children: "Urgent" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: waPartQuery(),
                target: "_blank",
                rel: "noopener noreferrer",
                className: "flex items-center gap-2 text-xs bg-green-50 text-green-700 border border-green-200 px-3 py-2 rounded-lg hover:bg-green-100 w-full justify-center",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-3 w-3" }),
                  " Check Part Availability (WhatsApp Supervisor)"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => {
                  const validParts = partEntries.filter(
                    (e) => e.partCode.trim() && e.partName.trim()
                  );
                  if (validParts.length === 0) {
                    ue.error(
                      "At least one Part Name and Part Code are required."
                    );
                    return;
                  }
                  const existingReqs = partRequests.filter(
                    (r) => r.caseDbId === caseData.id && r.status === "pending"
                  );
                  const newPartCodes = validParts.map((p) => p.partCode.trim().toLowerCase()).sort().join(",");
                  const isDuplicate = existingReqs.some((r) => {
                    var _a;
                    const existingCodes = (r.parts && r.parts.length > 0 ? r.parts.map(
                      (p) => p.partCode.trim().toLowerCase()
                    ) : [((_a = r.partCode) == null ? void 0 : _a.trim().toLowerCase()) ?? ""]).sort().join(",");
                    return existingCodes === newPartCodes;
                  });
                  if (isDuplicate) {
                    setShowPartRequestDuplicateModal(true);
                    return;
                  }
                  addPartRequest({
                    caseId: caseData.caseId,
                    caseDbId: caseData.id,
                    customerName: caseData.customerName,
                    partName: validParts[0].partName,
                    partCode: validParts[0].partCode,
                    partPhotoUrl: validParts[0].partPhotoUrl || caseData.partPhotoUrl,
                    requestedBy: (currentUser == null ? void 0 : currentUser.id) ?? "",
                    requestedByName: (currentUser == null ? void 0 : currentUser.name) ?? "",
                    productType: caseData.product || caseData.productType || "",
                    companyName: caseData.companyName || caseData.company || "",
                    priority: partPriority,
                    parts: validParts.map((e) => ({
                      id: Math.random().toString(36).slice(2),
                      partCode: e.partCode,
                      partName: e.partName,
                      partPhotoUrl: e.partPhotoUrl,
                      status: "pending"
                      // price intentionally excluded from part request (supervisor should not see price)
                    }))
                  });
                  ue.success("Part requested successfully");
                },
                className: "flex items-center gap-2 text-xs bg-blue-50 text-blue-700 border border-blue-200 px-3 py-2 rounded-lg hover:bg-blue-100 w-full justify-center",
                "data-ocid": "case_detail.primary_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "📦" }),
                  " Request Part from Supervisor"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-dashed border-violet-300 rounded-lg p-3 space-y-2 bg-violet-50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-violet-700 flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-3 w-3" }),
                " Case Related Images (Product/Serial/Invoice etc.)"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-violet-500", children: "These photos are saved to the case only — not included in the part request." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  ref: caseRelatedRef,
                  type: "file",
                  accept: "image/*",
                  multiple: true,
                  className: "hidden",
                  onChange: (e) => {
                    handleCaseRelatedPhotoSelect(e.target.files);
                    e.target.value = "";
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    var _a;
                    return (_a = caseRelatedRef.current) == null ? void 0 : _a.click();
                  },
                  className: "flex items-center gap-2 text-xs border border-dashed border-violet-300 rounded-lg px-3 py-2 w-full hover:bg-violet-100",
                  "data-ocid": "case_detail.upload_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-3 w-3 text-violet-400" }),
                    caseRelatedFiles.length > 0 ? `${caseRelatedFiles.length} photo(s) selected` : "Upload case photos (product, serial, invoice, etc.)"
                  ]
                }
              ),
              caseRelatedUrls.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: caseRelatedUrls.map((url, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "relative group",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: url,
                        alt: `Related ${idx + 1}`,
                        className: "h-16 w-16 object-cover rounded border border-violet-200"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => {
                          setCaseRelatedFiles(
                            (prev) => prev.filter((_, i) => i !== idx)
                          );
                          setCaseRelatedUrls(
                            (prev) => prev.filter((_, i) => i !== idx)
                          );
                        },
                        className: "absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center",
                        children: "×"
                      }
                    )
                  ]
                },
                url.slice(-24)
              )) })
            ] })
          ] }),
          newStatus === "part_ordered" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 bg-blue-50 px-3 py-2 rounded-lg", children: "Enter PO details (optional)" }),
            poNumbers.map((po, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs", children: [
                  "PO Number ",
                  idx + 1,
                  " (optional)"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "e.g. PO-2024-001",
                    value: po.value,
                    onChange: (e) => setPoNumbers(
                      (prev) => prev.map(
                        (p) => p.id === po.id ? { ...p, value: e.target.value } : p
                      )
                    )
                  }
                )
              ] }),
              poNumbers.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setPoNumbers(
                    (prev) => prev.filter((p) => p.id !== po.id)
                  ),
                  className: "mt-5 text-red-400 hover:text-red-600",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
                }
              )
            ] }, po.id)),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setPoNumbers((prev) => [
                  ...prev,
                  {
                    id: Math.random().toString(36).slice(2),
                    value: ""
                  }
                ]),
                className: "flex items-center gap-2 text-xs text-blue-600 border border-blue-200 px-3 py-2 rounded-lg hover:bg-blue-50 w-full justify-center",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" }),
                  " Add PO Number"
                ]
              }
            ),
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
            ] })
          ] }),
          isClosingStatus && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Technician Feedback" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  placeholder: "Work done details...",
                  value: feedbackText,
                  onChange: (e) => setFeedbackText(e.target.value),
                  rows: 2
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "After-work Photo (optional)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  ref: closingPhotoRef,
                  type: "file",
                  accept: "image/*",
                  multiple: true,
                  className: "hidden",
                  onChange: (e) => {
                    handleClosingPhotoSelect(e.target.files);
                    e.target.value = "";
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    var _a;
                    return (_a = closingPhotoRef.current) == null ? void 0 : _a.click();
                  },
                  className: "flex items-center gap-2 text-xs border border-dashed border-gray-300 rounded-lg px-3 py-2 w-full hover:bg-gray-50",
                  "data-ocid": "case_detail.dropzone",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-3 w-3 text-gray-400" }),
                    closingPhotoFiles.length > 0 ? `${closingPhotoFiles.length} photo${closingPhotoFiles.length > 1 ? "s" : ""} selected` : "Upload closing photos (optional, multiple)"
                  ]
                }
              ),
              closingPhotoUrls.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: closingPhotoUrls.map((url, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: url,
                  alt: `Closing preview ${idx + 1}`,
                  className: "h-20 w-20 object-cover rounded border"
                },
                url.slice(-20)
              )) })
            ] }),
            (caseData.caseRelatedImages ?? []).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-violet-700 font-semibold", children: "Existing Case Related Images" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: (caseData.caseRelatedImages ?? []).map((img) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: img.url,
                    alt: img.name,
                    className: "h-16 w-16 object-cover rounded border border-violet-200"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "a",
                    {
                      href: img.url,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "text-white text-xs bg-blue-600 px-1.5 py-0.5 rounded",
                      children: "View"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "a",
                    {
                      href: img.url,
                      download: img.name,
                      className: "text-white text-xs bg-green-600 px-1.5 py-0.5 rounded",
                      children: "↓"
                    }
                  )
                ] })
              ] }, img.id)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Case Related Images (optional)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400", children: "Product photo, serial number, invoice, ratings etc." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  ref: caseRelatedRef,
                  type: "file",
                  accept: "image/*",
                  multiple: true,
                  className: "hidden",
                  onChange: (e) => {
                    handleCaseRelatedPhotoSelect(e.target.files);
                    e.target.value = "";
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    var _a;
                    return (_a = caseRelatedRef.current) == null ? void 0 : _a.click();
                  },
                  className: "flex items-center gap-2 text-xs border border-dashed border-violet-300 rounded-lg px-3 py-2 w-full hover:bg-violet-50",
                  "data-ocid": "case_detail.upload_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-3 w-3 text-violet-400" }),
                    caseRelatedFiles.length > 0 ? `${caseRelatedFiles.length} case photo(s) selected` : "Upload case related photos (optional)"
                  ]
                }
              ),
              caseRelatedUrls.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: caseRelatedUrls.map((url, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "relative group",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: url,
                        alt: `Related ${idx + 1}`,
                        className: "h-16 w-16 object-cover rounded border border-violet-200"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => {
                          setCaseRelatedFiles(
                            (prev) => prev.filter((_, i) => i !== idx)
                          );
                          setCaseRelatedUrls(
                            (prev) => prev.filter((_, i) => i !== idx)
                          );
                        },
                        className: "absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center",
                        children: "×"
                      }
                    )
                  ]
                },
                url.slice(-24)
              )) })
            ] })
          ] }),
          (newStatus === "cancelled" || newStatus === "transferred") && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Reason *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Reason for cancellation/transfer",
                value: statusDetails,
                onChange: (e) => setStatusDetails(e.target.value),
                required: true
              }
            )
          ] }),
          ![
            "pending",
            "rescheduled",
            "cancelled",
            "transferred",
            "part_required",
            "part_ordered",
            ...[
              "closed",
              "adjustment_closed",
              "replacement_done",
              "gas_charge_done"
            ]
          ].includes(newStatus) && newStatus !== "" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Additional Details" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Optional notes",
                value: statusDetails,
                onChange: (e) => setStatusDetails(e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleStatusChange,
              disabled: !newStatus || saving,
              className: "w-full",
              "data-ocid": "case_detail.submit_button",
              children: saving ? "Saving..." : "Update Status"
            }
          )
        ] }) })
      ] })
    ] }),
    caseData.status === "part_required" && caseData.parts && caseData.parts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm border-blue-200 bg-blue-50/30", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2 pt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm text-blue-700 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-4 w-4" }),
        " Request Part from Supervisor"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: caseData.parts.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: "text-xs font-mono bg-orange-100 text-orange-700 px-2 py-0.5 rounded",
            children: [
              p.partCode,
              " — ",
              p.partName
            ]
          },
          p.id
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => {
              var _a, _b, _c;
              const existingReqs = partRequests.filter(
                (r) => r.caseDbId === caseData.id && r.status === "pending"
              );
              const casePCodes = (caseData.parts ?? []).map((p) => p.partCode.trim().toLowerCase()).sort().join(",");
              const isDuplicate = existingReqs.some((r) => {
                var _a2;
                const existingCodes = (r.parts && r.parts.length > 0 ? r.parts.map((p) => p.partCode.trim().toLowerCase()) : [((_a2 = r.partCode) == null ? void 0 : _a2.trim().toLowerCase()) ?? ""]).sort().join(",");
                return existingCodes === casePCodes;
              });
              if (isDuplicate) {
                setShowPartRequestDuplicateModal(true);
                return;
              }
              const parts = caseData.parts ?? [];
              addPartRequest({
                caseId: caseData.caseId,
                caseDbId: caseData.id,
                customerName: caseData.customerName,
                partName: ((_a = parts[0]) == null ? void 0 : _a.partName) ?? "",
                partCode: ((_b = parts[0]) == null ? void 0 : _b.partCode) ?? "",
                partPhotoUrl: ((_c = parts[0]) == null ? void 0 : _c.partPhotoUrl) ?? caseData.partPhotoUrl,
                requestedBy: (currentUser == null ? void 0 : currentUser.id) ?? "",
                requestedByName: (currentUser == null ? void 0 : currentUser.name) ?? "",
                productType: caseData.product || caseData.productType || "",
                companyName: caseData.companyName || caseData.company || "",
                priority: "normal",
                parts: parts.map((p) => ({
                  id: Math.random().toString(36).slice(2),
                  partCode: p.partCode,
                  partName: p.partName,
                  partPhotoUrl: p.partPhotoUrl,
                  status: "pending"
                }))
              });
              ue.success("Part request sent to supervisor");
            },
            className: "flex items-center gap-2 text-xs bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full justify-center font-medium",
            "data-ocid": "case_detail.part_request_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "📦" }),
              " Send Part Request to Supervisor"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-blue-500 text-center", children: partRequests.filter(
          (r) => r.caseDbId === caseData.id && r.status === "pending"
        ).length > 0 ? `⚠ ${partRequests.filter((r) => r.caseDbId === caseData.id && r.status === "pending").length} pending request(s) already sent` : "No pending requests for this case" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm", children: "Remarks & Notes" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Remarks" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                value: remarks,
                onChange: (e) => setRemarks(e.target.value),
                rows: 3,
                placeholder: "Remarks...",
                "data-ocid": "case_detail.textarea"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Additional Notes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                value: notes,
                onChange: (e) => setNotes(e.target.value),
                rows: 3,
                placeholder: "Internal notes..."
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            onClick: saveNotes,
            variant: "outline",
            "data-ocid": "case_detail.save_button",
            children: "Save Notes"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4" }),
        " Follow-up Reminders"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
        caseReminders.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 mb-3", children: caseReminders.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex items-center justify-between bg-yellow-50 border border-yellow-200 px-3 py-2 rounded-lg text-sm",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-yellow-800", children: new Date(r.reminderDate).toLocaleDateString("en-IN") }),
              r.note && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-yellow-600", children: r.note })
            ] })
          },
          r.id
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "date",
              value: reminderDate,
              onChange: (e) => setReminderDate(e.target.value),
              className: "sm:w-40",
              "data-ocid": "case_detail.input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Reminder note",
              value: reminderNote,
              onChange: (e) => setReminderNote(e.target.value),
              className: "flex-1"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              onClick: addReminderHandler,
              disabled: !reminderDate,
              "data-ocid": "case_detail.button",
              children: "Set Reminder"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm", children: "Photos" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-orange-700 mb-2 flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-3 w-3" }),
            " Part Photos"
          ] }),
          caseData.photos.filter((p) => p.type === "part").length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 bg-gray-50 rounded p-2", children: "No part photos" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2", children: caseData.photos.filter((p) => p.type === "part").map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group aspect-square bg-gray-100 rounded-lg overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: p.url,
                  alt: p.name,
                  className: "w-full h-full object-cover"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: p.url,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "text-white text-xs bg-blue-600 px-1.5 py-0.5 rounded",
                    children: "View"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: p.url,
                    download: p.name,
                    className: "text-white text-xs bg-green-600 px-1.5 py-0.5 rounded",
                    children: "↓"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-center text-gray-500 truncate", children: p.name })
          ] }, p.id)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              className: "mt-2 flex items-center gap-2 text-xs border border-dashed border-orange-300 rounded-lg px-3 py-2 cursor-pointer hover:bg-orange-50 w-full",
              "data-ocid": "case_detail.upload_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-3 w-3 text-orange-400" }),
                "Upload Part Photo",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "file",
                    accept: "image/*",
                    multiple: true,
                    className: "hidden",
                    onChange: async (e) => {
                      const files = Array.from(e.target.files || []);
                      for (const file of files) {
                        const url = await fileToDataUrl(file);
                        addPhotoToCase(caseData.id, {
                          url,
                          type: "part",
                          name: file.name
                        });
                      }
                      e.target.value = "";
                      ue.success("Part photo(s) uploaded");
                    }
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-gray-600 mb-2 flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-3 w-3" }),
            " Other Case Photos"
          ] }),
          caseData.photos.filter((p) => p.type !== "part").length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 bg-gray-50 rounded p-2", children: "No other photos" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2", children: caseData.photos.filter((p) => p.type !== "part").map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group aspect-square bg-gray-100 rounded-lg overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: p.url,
                  alt: p.name,
                  className: "w-full h-full object-cover"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: p.url,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "text-white text-xs bg-blue-600 px-1.5 py-0.5 rounded",
                    children: "View"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: p.url,
                    download: p.name,
                    className: "text-white text-xs bg-green-600 px-1.5 py-0.5 rounded",
                    children: "↓"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-center text-gray-500 truncate", children: photoTypeLabel[p.type] })
          ] }, p.id)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              className: "mt-2 flex items-center gap-2 text-xs border border-dashed border-gray-300 rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-50 w-full",
              "data-ocid": "case_detail.upload_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-3 w-3 text-gray-400" }),
                "Upload Case Photo",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "file",
                    accept: "image/*",
                    multiple: true,
                    className: "hidden",
                    onChange: async (e) => {
                      const files = Array.from(e.target.files || []);
                      for (const file of files) {
                        const url = await fileToDataUrl(file);
                        addPhotoToCase(caseData.id, {
                          url,
                          type: "after",
                          name: file.name
                        });
                      }
                      e.target.value = "";
                      ue.success("Photo(s) uploaded");
                    }
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-violet-700 mb-2 flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-3 w-3 text-violet-500" }),
            " Case Related Images"
          ] }),
          (caseData.caseRelatedImages ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 bg-gray-50 rounded p-2", children: "No case related images" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2", children: (caseData.caseRelatedImages ?? []).map((img) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group aspect-square bg-gray-100 rounded-lg overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: img.url,
                  alt: img.name,
                  className: "w-full h-full object-cover"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: img.url,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "text-white text-xs bg-blue-600 px-1.5 py-0.5 rounded",
                    children: "View"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: img.url,
                    download: img.name,
                    className: "text-white text-xs bg-green-600 px-1.5 py-0.5 rounded",
                    children: "↓"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-center text-gray-500 truncate", children: img.name })
          ] }, img.id)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              className: "mt-2 flex items-center gap-2 text-xs border border-dashed border-violet-300 rounded-lg px-3 py-2 cursor-pointer hover:bg-violet-50 w-full",
              "data-ocid": "case_detail.upload_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-3 w-3 text-violet-400" }),
                "Upload Case Related Photo (product, serial, invoice, etc.)",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "file",
                    accept: "image/*",
                    multiple: true,
                    className: "hidden",
                    onChange: async (e) => {
                      const files = Array.from(e.target.files || []);
                      const newImgs = [];
                      for (const file of files) {
                        const url = await fileToDataUrl(file);
                        newImgs.push({
                          id: Math.random().toString(36).slice(2),
                          url,
                          name: file.name
                        });
                      }
                      updateCase(caseData.id, {
                        caseRelatedImages: [
                          ...caseData.caseRelatedImages ?? [],
                          ...newImgs
                        ]
                      });
                      e.target.value = "";
                      ue.success("Case related photo(s) uploaded");
                    }
                  }
                )
              ]
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm", children: "Activity Timeline" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        caseAudit.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-blue-500 mt-1 flex-shrink-0" }),
            i < caseAudit.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-0.5 bg-gray-200 flex-1 mt-1" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 pb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-gray-900", children: entry.action }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-400", children: new Date(entry.timestamp).toLocaleString("en-IN") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-600 mt-0.5", children: entry.details }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-400", children: [
              "by ",
              entry.userName
            ] })
          ] })
        ] }, entry.id)),
        caseAudit.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400", children: "No activity yet" })
      ] }) })
    ] }),
    showPartRequestDuplicateModal && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl shadow-xl p-6 max-w-sm w-full mx-4 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "⚠️" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-gray-900", children: "Part Request Already Sent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 mt-1", children: "A pending part request for these part codes already exists for this case. Do you want to send another request?" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setShowPartRequestDuplicateModal(false),
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            className: "bg-blue-600 hover:bg-blue-700",
            onClick: () => {
              var _a, _b, _c;
              setShowPartRequestDuplicateModal(false);
              const validParts = caseData.parts && caseData.parts.length > 0 ? caseData.parts : partEntries.filter(
                (e) => e.partCode.trim() && e.partName.trim()
              );
              if (validParts.length === 0) return;
              addPartRequest({
                caseId: caseData.caseId,
                caseDbId: caseData.id,
                customerName: caseData.customerName,
                partName: ((_a = validParts[0]) == null ? void 0 : _a.partName) ?? "",
                partCode: ((_b = validParts[0]) == null ? void 0 : _b.partCode) ?? "",
                partPhotoUrl: ((_c = validParts[0]) == null ? void 0 : _c.partPhotoUrl) ?? caseData.partPhotoUrl,
                requestedBy: (currentUser == null ? void 0 : currentUser.id) ?? "",
                requestedByName: (currentUser == null ? void 0 : currentUser.name) ?? "",
                productType: caseData.product || caseData.productType || "",
                companyName: caseData.companyName || caseData.company || "",
                priority: partPriority || "normal",
                parts: validParts.map((p) => ({
                  id: Math.random().toString(36).slice(2),
                  partCode: p.partCode,
                  partName: p.partName,
                  partPhotoUrl: p.partPhotoUrl ?? "",
                  status: "pending"
                }))
              });
              ue.success("Part request sent again");
            },
            children: "Yes, Send Again"
          }
        )
      ] })
    ] }) }),
    showPartReceivedModal && caseData.parts && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-gray-900 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-5 w-5 text-teal-600" }),
        " Mark Parts as Received"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600", children: "Select which parts have been received:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: caseData.parts.filter(
        (p) => p.status === "ordered" || p.status === "pending"
      ).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "label",
        {
          className: "flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "checkbox",
                className: "rounded",
                checked: selectedReceivedPartIds.has(p.id),
                onChange: (e) => {
                  setSelectedReceivedPartIds((prev) => {
                    const next = new Set(prev);
                    if (e.target.checked) next.add(p.id);
                    else next.delete(p.id);
                    return next;
                  });
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm font-semibold", children: p.partCode }),
              p.partName && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-gray-500 ml-2", children: [
                "— ",
                p.partName
              ] })
            ] })
          ]
        },
        p.id
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => {
              setShowPartReceivedModal(false);
              setSelectedReceivedPartIds(/* @__PURE__ */ new Set());
            },
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            className: "bg-teal-600 hover:bg-teal-700",
            disabled: selectedReceivedPartIds.size === 0,
            onClick: handlePartReceivedSubmit,
            children: [
              "Confirm Received (",
              selectedReceivedPartIds.size,
              ")"
            ]
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  CaseDetailPage as default
};
