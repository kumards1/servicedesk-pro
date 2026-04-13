import {
  AlertTriangle,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  Clock,
  History,
  Image,
  MapPin,
  MessageSquare,
  Package,
  Pencil,
  Phone,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import StatusBadge from "../components/StatusBadge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import {
  STATUS_TRANSITIONS,
  getAgeing,
  photoTypeLabel,
  useStore,
} from "../store";
import type { CaseStatus, PhotoType } from "../types";

// Convert file to base64 data URL (no external storage needed for in-app photos)
async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Local component for collapsible part status groups
type PartStatusEntry = {
  reqId: string;
  status: string;
  issuedByName: string;
  technicianName: string;
  issuedAt: string;
  rejectedReason?: string;
  cancelledByName?: string;
  partPhotoUrl?: string;
};
type PartStatusGroup = {
  partCode: string;
  partName: string;
  entries: PartStatusEntry[];
};

function PartStatusSection({
  groups,
  statusColor,
}: {
  groups: PartStatusGroup[];
  statusColor: (s: string) => string;
}) {
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());
  const toggle = (key: string) => {
    setExpandedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const getStatusLabel = (s: string) => {
    if (s === "issued") return "Issued";
    if (s === "pending") return "Pending";
    if (s === "rejected") return "Rejected";
    if (s === "cancelled") return "Cancelled";
    return s;
  };

  return (
    <div className="mt-2 border border-slate-200 rounded-lg overflow-hidden">
      <div className="bg-slate-50 px-3 py-2 font-semibold text-xs text-slate-600 flex items-center gap-1.5">
        <Package className="h-3.5 w-3.5 text-blue-500" />
        Parts Status ({groups.length} part code{groups.length !== 1 ? "s" : ""})
      </div>
      {groups.map((group) => {
        const isExpanded = expandedKeys.has(group.partCode);
        const hasIssued = group.entries.some((e) => e.status === "issued");
        const hasPending = group.entries.some((e) => e.status === "pending");
        const dominantStatus = hasIssued
          ? "issued"
          : hasPending
            ? "pending"
            : (group.entries[0]?.status ?? "pending");
        return (
          <div
            key={group.partCode}
            className="border-t border-slate-100 first:border-t-0"
          >
            <button
              type="button"
              className="w-full flex items-center justify-between px-3 py-2 hover:bg-slate-50 transition-colors text-left"
              onClick={() => toggle(group.partCode)}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-mono text-xs font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">
                  {group.partCode}
                </span>
                <span className="text-xs text-slate-500 truncate">
                  {group.partName}
                </span>
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${statusColor(dominantStatus)}`}
                >
                  {getStatusLabel(dominantStatus)}
                </span>
                {group.entries.length > 1 && (
                  <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full font-medium">
                    ×{group.entries.length}
                  </span>
                )}
              </div>
              {isExpanded ? (
                <ChevronUp className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
              )}
            </button>
            {isExpanded && (
              <div className="px-3 pb-3 space-y-2">
                {group.entries.map((entry, idx) => (
                  <div
                    key={`${entry.reqId}-${idx}`}
                    className="bg-white border border-slate-100 rounded-lg p-2.5 space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor(entry.status)}`}
                      >
                        {getStatusLabel(entry.status)}
                      </span>
                      {entry.issuedAt && (
                        <span className="text-xs text-slate-400">
                          {new Date(entry.issuedAt).toLocaleDateString("en-IN")}
                        </span>
                      )}
                    </div>
                    {entry.status === "issued" && (
                      <div className="grid grid-cols-2 gap-1 text-xs">
                        {entry.issuedByName && (
                          <div>
                            <span className="text-slate-400">Issued by: </span>
                            <span className="font-medium text-slate-700">
                              {entry.issuedByName}
                            </span>
                          </div>
                        )}
                        {entry.technicianName && (
                          <div>
                            <span className="text-slate-400">To: </span>
                            <span className="font-medium text-slate-700">
                              {entry.technicianName}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                    {entry.status === "rejected" && entry.rejectedReason && (
                      <div className="text-xs text-red-600">
                        <span className="font-medium">Reason: </span>
                        {entry.rejectedReason}
                      </div>
                    )}
                    {entry.status === "cancelled" && entry.cancelledByName && (
                      <div className="text-xs text-slate-500">
                        <span className="font-medium">Cancelled by: </span>
                        {entry.cancelledByName}
                      </div>
                    )}
                    {entry.partPhotoUrl && (
                      <img
                        src={entry.partPhotoUrl}
                        alt="Part"
                        className="h-10 w-10 object-cover rounded border border-slate-200"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function CaseDetailPage() {
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
    syncCases,
  } = useStore();

  const [_retryCount, setRetryCount] = useState(0);
  const caseData = cases.find((c) => c.id === selectedCaseId);

  // biome-ignore lint/correctness/useExhaustiveDependencies: sync part requests on mount
  useEffect(() => {
    syncPartRequests();
    // If case not found immediately, sync and retry up to 3 times
    if (!caseData && selectedCaseId) {
      let attempts = 0;
      const retry = async () => {
        if (attempts >= 3) return;
        attempts++;
        await syncCases();
        setRetryCount(attempts);
      };
      // Start retrying
      const t1 = setTimeout(() => retry(), 1000);
      const t2 = setTimeout(() => retry(), 2500);
      const t3 = setTimeout(() => retry(), 4000);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, []);

  const [newStatus, setNewStatus] = useState<CaseStatus | "">("");
  const [statusDetails, setStatusDetails] = useState("");
  const [nextAction, setNextAction] = useState("");
  const [techId, setTechId] = useState("");
  const [partEntries, setPartEntries] = useState<
    Array<{
      id: string;
      partCode: string;
      partName: string;
      partPhotoUrl: string;
      partPhotoFile: File | null;
      stockStatus?: string;
      price?: string;
    }>
  >([
    {
      id: Math.random().toString(36).slice(2),
      partCode: "",
      partName: "",
      partPhotoUrl: "",
      partPhotoFile: null,
      price: "",
    },
  ]);
  const [partPriority, setPartPriority] = useState("normal");
  const [poNumbers, setPoNumbers] = useState<
    Array<{ id: string; value: string }>
  >([{ id: Math.random().toString(36).slice(2), value: "" }]);
  const [orderDate, setOrderDate] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [closingPhotoFiles, setClosingPhotoFiles] = useState<File[]>([]);
  const [closingPhotoUrls, setClosingPhotoUrls] = useState<string[]>([]);
  const [reminderDate, setReminderDate] = useState("");
  const [reminderNote, setReminderNote] = useState("");
  const [remarks, setRemarks] = useState(caseData?.remarks ?? "");
  const [notes, setNotes] = useState(caseData?.additionalNotes ?? "");
  const [saving, setSaving] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const closingPhotoRef = useRef<HTMLInputElement>(null);
  const caseRelatedRef = useRef<HTMLInputElement>(null);
  const [caseRelatedFiles, setCaseRelatedFiles] = useState<File[]>([]);
  const [caseRelatedUrls, setCaseRelatedUrls] = useState<string[]>([]);

  const [editingCaseId, setEditingCaseId] = useState(false);
  const [newCaseIdValue, setNewCaseIdValue] = useState("");
  // Part request duplicate warning modal
  const [showPartRequestDuplicateModal, setShowPartRequestDuplicateModal] =
    useState(false);
  // Part received selection modal (for multi-part ordered cases)
  const [showPartReceivedModal, setShowPartReceivedModal] = useState(false);
  const [selectedReceivedPartIds, setSelectedReceivedPartIds] = useState<
    Set<string>
  >(new Set());
  // Dual-dropdown state for multi-part status flow
  const [firstDropdownChoice, setFirstDropdownChoice] = useState<
    "" | "part_available" | "part_ordered" | "cancelled"
  >("");
  const [secondDropdownChoice, setSecondDropdownChoice] = useState<
    "" | "part_available" | "part_ordered" | "cancelled"
  >("");
  const [firstSelectedPartIds, setFirstSelectedPartIds] = useState<Set<string>>(
    new Set(),
  );
  const [secondSelectedPartIds, setSecondSelectedPartIds] = useState<
    Set<string>
  >(new Set());
  const [secondPONumbers, setSecondPONumbers] = useState<
    Record<string, string>
  >({});
  const [firstPONumbers, setFirstPONumbers] = useState<Record<string, string>>(
    {},
  );

  if (!caseData) {
    // Still loading — show spinner while retrying sync
    const isRetrying = selectedCaseId != null;
    return (
      <div className="text-center py-20">
        {isRetrying ? (
          <>
            <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
              <span className="inline-block w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm">Loading case...</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("cases")}
            >
              Back to Cases
            </Button>
          </>
        ) : (
          <>
            <p className="text-muted-foreground">Case not found.</p>
            <Button className="mt-4" onClick={() => navigate("cases")}>
              Back to Cases
            </Button>
          </>
        )}
      </div>
    );
  }

  const today = new Date().toISOString().split("T")[0];

  // Stale detection
  const isStale =
    caseData.status === "on_route" &&
    !!caseData.technicianId &&
    !caseData.hasFirstUpdate &&
    !!caseData.onRouteDate &&
    caseData.onRouteDate < today;

  // Auto-load customer history using normalized phone matching
  const normalizePhone = (ph: string) => ph.replace(/\D/g, "");
  const myPhones = [caseData.phone, caseData.altPhone]
    .filter(Boolean)
    .map(normalizePhone)
    .filter((p) => p.length >= 7);

  const previousCases = cases.filter(
    (c) =>
      c.id !== caseData.id &&
      myPhones.some((ph) => {
        const op = normalizePhone(c.phone);
        const oap = c.altPhone ? normalizePhone(c.altPhone) : "";
        return op === ph || (oap !== "" && oap === ph);
      }),
  );

  const nextStatuses = STATUS_TRANSITIONS[caseData.status] ?? [];
  const assignedTech = technicians.find((t) => t.id === caseData.technicianId);
  const caseAudit = auditLog
    .filter((a) => a.caseId === caseData.id)
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );
  const caseReminders = reminders.filter(
    (r) => r.caseId === caseData.id && !r.isDone,
  );
  const age = getAgeing(caseData.createdAt);

  const handlePartPhotoSelect = async (entryId: string, file: File) => {
    const url = await fileToDataUrl(file);
    setPartEntries((prev) =>
      prev.map((e) =>
        e.id === entryId ? { ...e, partPhotoFile: file, partPhotoUrl: url } : e,
      ),
    );
  };

  const getPartStockStatus = (
    partCode: string,
  ): { label: string; color: string } => {
    if (!partCode.trim()) return { label: "", color: "" };
    const matching = partItems.filter(
      (p) =>
        p.partCode.toLowerCase() === partCode.toLowerCase() &&
        p.status === "in_stock",
    );
    const isAdmin = currentUser?.role === "admin";
    const isSupervisor = currentUser?.role === "supervisor";
    if (matching.length > 0) {
      if (isAdmin || isSupervisor) {
        return {
          label: `In Stock (${matching.length} unit${matching.length !== 1 ? "s" : ""})`,
          color: "text-green-600 bg-green-50 border-green-200",
        };
      }
      return {
        label: "✓ In Stock",
        color: "text-green-600 bg-green-50 border-green-200",
      };
    }
    // Check with technician or installed (only for admin/supervisor)
    if (isAdmin || isSupervisor) {
      const withTech = partItems.find(
        (p) =>
          p.partCode.toLowerCase() === partCode.toLowerCase() &&
          p.status === "issued",
      );
      if (withTech) {
        const techName =
          technicians.find((t) => t.id === withTech.technicianId)?.name ??
          "technician";
        return {
          label: `With Technician: ${techName}`,
          color: "text-amber-600 bg-amber-50 border-amber-200",
        };
      }
      const installed = partItems.find(
        (p) =>
          p.partCode.toLowerCase() === partCode.toLowerCase() &&
          p.status === "installed",
      );
      if (installed)
        return {
          label: "Installed",
          color: "text-blue-600 bg-blue-50 border-blue-200",
        };
    }
    return {
      label: "✗ Not in Stock",
      color: "text-red-600 bg-red-50 border-red-200",
    };
  };

  const handleClosingPhotoSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const newFiles = Array.from(files);
    const newUrls = await Promise.all(newFiles.map(fileToDataUrl));
    setClosingPhotoFiles((prev) => [...prev, ...newFiles]);
    setClosingPhotoUrls((prev) => [...prev, ...newUrls]);
  };

  const handleCaseRelatedPhotoSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const newFiles = Array.from(files);
    const newUrls = await Promise.all(newFiles.map(fileToDataUrl));
    setCaseRelatedFiles((prev) => [...prev, ...newFiles]);
    setCaseRelatedUrls((prev) => [...prev, ...newUrls]);
  };

  const handleStatusChange = async () => {
    if (!newStatus) return;
    // Mandatory part code/name validation for part_required
    if (newStatus === "part_required") {
      const hasValidEntry = partEntries.some(
        (e) => e.partCode.trim() && e.partName.trim(),
      );
      if (!hasValidEntry) {
        toast.error("At least one Part Name and Part Code are required.");
        return;
      }
    }
    setSaving(true);

    // Build all updates in ONE object — status + field changes + images all together
    const allUpdates: Record<string, unknown> = {
      status: newStatus,
      updatedAt: new Date().toISOString(),
    };
    let details = statusDetails;

    // Handle closing statuses
    if (
      [
        "closed",
        "adjustment_closed",
        "replacement_done",
        "gas_charge_done",
      ].includes(newStatus)
    ) {
      allUpdates.closedAt = new Date().toISOString();
    }
    if (newStatus === "on_route") {
      allUpdates.onRouteDate = new Date().toISOString().split("T")[0];
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
      details += ` Assigned to: ${tech?.name ?? techId}`;
    }
    if (newStatus === "part_required") {
      const validPartEntries = partEntries.filter(
        (e) => e.partCode.trim() || e.partName.trim(),
      );
      const firstPart = validPartEntries[0] ?? partEntries[0];
      if (firstPart?.partName) allUpdates.partName = firstPart.partName;
      if (firstPart?.partCode) allUpdates.partCode = firstPart.partCode;
      if (firstPart?.partPhotoUrl)
        allUpdates.partPhotoUrl = firstPart.partPhotoUrl;
      // Store ALL parts on the case (include price for case data)
      allUpdates.parts = validPartEntries.map((e) => ({
        id: Math.random().toString(36).slice(2),
        partCode: e.partCode,
        partName: e.partName,
        partPhotoUrl: e.partPhotoUrl,
        status: "pending" as const,
        price: e.price ? Number(e.price) : undefined,
      }));
      details += ` Parts: ${validPartEntries
        .filter((e) => e.partCode)
        .map((e) => `${e.partName} (${e.partCode})`)
        .join(", ")}`;
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

    // Include case related images atomically in the same update (prevent race conditions)
    if (caseRelatedUrls.length > 0) {
      const newRelatedImages = caseRelatedUrls.map((url, i) => ({
        id: Math.random().toString(36).slice(2),
        url,
        name: caseRelatedFiles[i]?.name ?? `Case photo ${i + 1}`,
      }));
      allUpdates.caseRelatedImages = [
        ...(caseData.caseRelatedImages ?? []),
        ...newRelatedImages,
      ];
    } else {
      // Always preserve existing caseRelatedImages — never drop them
      allUpdates.caseRelatedImages = caseData.caseRelatedImages ?? [];
    }

    // Add closing photos to allUpdates.photos atomically
    const photosToAdd: Array<{
      id: string;
      url: string;
      type: string;
      name: string;
    }> = [];
    if (newStatus === "part_required") {
      for (const entry of partEntries.filter((e) => e.partPhotoUrl)) {
        photosToAdd.push({
          id: Math.random().toString(36).slice(2),
          url: entry.partPhotoUrl,
          type: "part",
          name: `${entry.partCode} - ${entry.partName}`,
        });
      }
    }
    if (
      closingPhotoUrls.length > 0 &&
      [
        "closed",
        "adjustment_closed",
        "replacement_done",
        "gas_charge_done",
      ].includes(newStatus)
    ) {
      for (let i = 0; i < closingPhotoUrls.length; i++) {
        photosToAdd.push({
          id: Math.random().toString(36).slice(2),
          url: closingPhotoUrls[i],
          type: "after",
          name: closingPhotoFiles[i]?.name ?? `After work photo ${i + 1}`,
        });
      }
    }
    if (photosToAdd.length > 0) {
      allUpdates.photos = [...(caseData.photos ?? []), ...photosToAdd];
    }

    // SINGLE ATOMIC UPDATE — status + all field changes + images in one call
    // This prevents the race condition where two separate updateCase calls overwrite each other
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateCase(caseData.id, allUpdates as any);

    // Add audit entry (does NOT call updateCase again)
    addAuditEntry({
      caseId: caseData.id,
      userId: currentUser?.id ?? "",
      userName: currentUser?.name ?? "",
      action: "Status Changed",
      details: `${caseData.status.replace(/_/g, " ")} → ${newStatus.replace(/_/g, " ")}${details ? `. ${details}` : ""}`,
    });

    toast.success(`Case status updated to ${newStatus.replace(/_/g, " ")}`);

    // Reset form — do immediately so UI responds fast
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
        price: "",
      },
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
      userId: currentUser?.id ?? "",
      userName: currentUser?.name ?? "",
      action: "Notes Updated",
      details: "Remarks/notes updated",
    });
  };

  const addReminderHandler = () => {
    if (!reminderDate) return;
    addReminder({
      caseId: caseData.id,
      userId: currentUser?.id ?? "",
      reminderDate,
      note: reminderNote,
      isDone: false,
    });
    setReminderDate("");
    setReminderNote("");
  };

  // Multi-part status update handler (dual-dropdown version)
  const handleMultiPartStatusUpdate = async () => {
    setSaving(true);
    try {
      const resetDropdowns = () => {
        setFirstDropdownChoice("");
        setSecondDropdownChoice("");
        setFirstSelectedPartIds(new Set());
        setSecondSelectedPartIds(new Set());
        setFirstPONumbers({});
        setSecondPONumbers({});
        setNewStatus("");
      };

      // Handle "cancelled" first dropdown choice — atomic single update
      if (firstDropdownChoice === "cancelled") {
        updateCase(caseData.id, {
          status: "cancelled" as CaseStatus,
          updatedAt: new Date().toISOString(),
          caseRelatedImages: caseData.caseRelatedImages ?? [],
        } as any);
        addAuditEntry({
          caseId: caseData.id,
          userId: currentUser?.id ?? "",
          userName: currentUser?.name ?? "",
          action: "Status Changed",
          details:
            "part required → cancelled. Case cancelled (parts not available).",
        });
        toast.success("Case cancelled");
        resetDropdowns();
        return;
      }

      // Collect PO numbers from part_ordered selections
      const allPONumbers: string[] = [];
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

      const availableCount =
        (firstDropdownChoice === "part_available"
          ? firstSelectedPartIds.size
          : 0) +
        (secondDropdownChoice === "part_available"
          ? secondSelectedPartIds.size
          : 0);
      const orderedCount =
        (firstDropdownChoice === "part_ordered"
          ? firstSelectedPartIds.size
          : 0) +
        (secondDropdownChoice === "part_ordered"
          ? secondSelectedPartIds.size
          : 0);

      // Determine new overall case status
      // part_available takes priority; if only ordered → part_ordered; else pending
      let newCaseStatus: CaseStatus = "pending";
      if (availableCount > 0) {
        newCaseStatus = "part_available";
      } else if (orderedCount > 0) {
        newCaseStatus = "part_ordered";
      } else if (secondDropdownChoice === "cancelled") {
        newCaseStatus = "cancelled";
      }

      // Build per-part status updates
      const updatedParts = (caseData.parts ?? []).map((p) => {
        if (firstSelectedPartIds.has(p.id)) {
          return { ...p, status: firstDropdownChoice as string };
        }
        if (secondSelectedPartIds.has(p.id)) {
          return { ...p, status: secondDropdownChoice as string };
        }
        return p;
      });

      const detailMsg = `${availableCount > 0 ? `${availableCount} part(s) available` : ""}${availableCount > 0 && orderedCount > 0 ? ", " : ""}${orderedCount > 0 ? `${orderedCount} part(s) ordered` : ""}${allPONumbers.length > 0 ? `. PO: ${allPONumbers.join(", ")}` : ""}`;

      // SINGLE ATOMIC UPDATE
      const atomicUpdate: Record<string, unknown> = {
        status: newCaseStatus,
        updatedAt: new Date().toISOString(),
        parts: updatedParts,
        caseRelatedImages: caseData.caseRelatedImages ?? [],
      };
      if (allPONumbers.length > 0) {
        atomicUpdate.poNumbers = [
          ...(caseData.poNumbers ?? []),
          ...allPONumbers,
        ];
        atomicUpdate.poNumber = allPONumbers[0];
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      updateCase(caseData.id, atomicUpdate as any);
      addAuditEntry({
        caseId: caseData.id,
        userId: currentUser?.id ?? "",
        userName: currentUser?.name ?? "",
        action: "Status Changed",
        details: `part required → ${newCaseStatus.replace(/_/g, " ")}. ${detailMsg}`,
      });

      toast.success("Parts status updated");
      resetDropdowns();
    } finally {
      setSaving(false);
    }
  };

  const waLink = (phone: string) => `https://wa.me/${phone.replace(/\D/g, "")}`;

  // Part Received handler: marks selected parts as received; keeps case in part_ordered if some remain
  const handlePartReceivedSubmit = () => {
    if (selectedReceivedPartIds.size === 0) {
      toast.error("Select at least one part to mark as received.");
      return;
    }
    const orderedParts = (caseData.parts ?? []).filter(
      (p) =>
        (p.status as string) === "ordered" ||
        (p.status as string) === "pending",
    );
    const updatedParts = (caseData.parts ?? []).map((p) => {
      if (selectedReceivedPartIds.has(p.id)) {
        return { ...p, status: "received" as const };
      }
      return p;
    });
    // If all ordered parts are now received, set case status to part_received
    // If some still remain ordered/pending, keep part_ordered
    const stillOrdered = updatedParts.filter(
      (p) =>
        (p.status as string) === "ordered" ||
        (p.status as string) === "pending",
    );
    const allIssued = updatedParts.every((p) =>
      ["received", "issued", "rejected"].includes(p.status as string),
    );
    const newCaseStatus: CaseStatus =
      allIssued || stillOrdered.length === 0 ? "part_received" : "part_ordered";
    updateCase(caseData.id, {
      parts: updatedParts,
      status: newCaseStatus,
      updatedAt: new Date().toISOString(),
      caseRelatedImages: caseData.caseRelatedImages ?? [],
    } as any);
    addAuditEntry({
      caseId: caseData.id,
      userId: currentUser?.id ?? "",
      userName: currentUser?.name ?? "",
      action: "Parts Received",
      details: `${selectedReceivedPartIds.size} of ${orderedParts.length} ordered part(s) marked received. Case status: ${newCaseStatus.replace(/_/g, " ")}`,
    });
    toast.success(`${selectedReceivedPartIds.size} part(s) marked as received`);
    setShowPartReceivedModal(false);
    setSelectedReceivedPartIds(new Set());
  };

  const waPartQuery = () => {
    const supervisorName = settings.supervisorName ?? "Mishra";
    const firstPart = partEntries[0];
    const hasPhoto = !!(caseData.partPhotoUrl || firstPart?.partPhotoUrl);
    const msg = encodeURIComponent(
      `Hello ${supervisorName} ji,\nCase ID: ${caseData.caseId}\nCustomer: ${caseData.customerName}\nProduct: ${caseData.product} ${caseData.productType}\nRequired Part: ${caseData.partName || firstPart?.partName || ""}\nPart Code: ${caseData.partCode || firstPart?.partCode || ""}\n${hasPhoto ? "Part photo available.\n" : ""}Please confirm availability.`,
    );
    return `https://wa.me/${settings.supervisorWhatsApp}?text=${msg}`;
  };

  const isClosingStatus = [
    "closed",
    "adjustment_closed",
    "replacement_done",
    "gas_charge_done",
  ].includes(newStatus);

  const isAdmin = currentUser?.role === "admin";

  const handleResetStale = () => {
    resetStaleTechnician(caseData.id);
    toast.success(
      `Technician unassigned. Case ${caseData.caseId} reset to Pending.`,
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Stale Warning Banner */}
      {isStale && (
        <div
          className="bg-amber-50 border border-amber-400 rounded-xl px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-3"
          data-ocid="case_detail.panel"
        >
          <div className="flex items-center gap-2 text-amber-700">
            <AlertTriangle className="h-5 w-5 shrink-0" />
            <p className="text-sm font-medium">
              No technician update received — this case will auto-reset at
              midnight unless you take action.
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="shrink-0 border-amber-500 text-amber-700 hover:bg-amber-100"
            onClick={handleResetStale}
            data-ocid="case_detail.button"
          >
            Reset Technician Now
          </Button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-3">
        <button
          type="button"
          onClick={() => navigate("cases")}
          className="p-2 hover:bg-gray-100 rounded-lg self-start"
          data-ocid="case_detail.link"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-bold text-gray-900">
              {caseData.caseId}
            </h2>
            <StatusBadge status={caseData.status} />
            {age >= 8 &&
              ![
                "closed",
                "cancelled",
                "transferred",
                "adjustment_closed",
                "replacement_done",
                "gas_charge_done",
              ].includes(caseData.status) && (
                <span className="flex items-center gap-1 text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                  <AlertTriangle className="h-3 w-3" /> Overdue ({age} days)
                </span>
              )}
            {/* Customer history badge */}
            {previousCases.length > 0 && (
              <button
                type="button"
                onClick={() => setShowHistory((v) => !v)}
                className="flex items-center gap-1 text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full hover:bg-amber-100"
                data-ocid="case_detail.toggle"
              >
                <History className="h-3 w-3" />
                {previousCases.length} previous complaint
                {previousCases.length !== 1 ? "s" : ""}
                {showHistory ? (
                  <ChevronUp className="h-3 w-3" />
                ) : (
                  <ChevronDown className="h-3 w-3" />
                )}
              </button>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-0.5">
            {caseData.customerName} &mdash; {caseData.product} &mdash;{" "}
            {caseData.complaintType.replace("_", " ")}
          </p>
        </div>
        {/* Quick Actions + Admin Delete */}
        <div className="flex flex-wrap gap-2">
          <a
            href={`tel:${caseData.phone}`}
            className="flex items-center gap-1 text-xs bg-green-50 text-green-700 border border-green-200 px-3 py-1.5 rounded-lg hover:bg-green-100"
          >
            <Phone className="h-3 w-3" /> Call
          </a>
          <a
            href={waLink(caseData.phone)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-lg hover:bg-emerald-100"
          >
            <MessageSquare className="h-3 w-3" /> WhatsApp
          </a>
          {caseData.address && (
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(caseData.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-100"
            >
              <MapPin className="h-3 w-3" /> Navigate
            </a>
          )}
          {isAdmin && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  size="sm"
                  className="h-auto py-1.5"
                  data-ocid="case_detail.open_modal_button"
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Delete Case {caseData.caseId}?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. The case, audit trail, and all
                    attached data will be permanently removed.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel data-ocid="case_detail.cancel_button">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => {
                      deleteCase(caseData.id);
                      navigate("cases");
                    }}
                    data-ocid="case_detail.confirm_button"
                  >
                    Delete Permanently
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>

      {/* Customer Previous History (inline) */}
      {showHistory && previousCases.length > 0 && (
        <Card className="shadow-sm border-amber-200 bg-amber-50">
          <CardHeader className="pb-2 pt-3">
            <CardTitle className="text-xs text-amber-800 flex items-center gap-2">
              <History className="h-3.5 w-3.5" /> Previous Complaints for{" "}
              {caseData.customerName}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 pb-3">
            {previousCases
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime(),
              )
              .map((pc) => (
                <button
                  key={pc.id}
                  type="button"
                  onClick={() => navigate("case-detail", pc.id)}
                  className="w-full text-left flex items-center gap-3 bg-white border border-amber-200 rounded-lg px-3 py-2 hover:bg-amber-100 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold text-amber-800">
                        {pc.caseId}
                      </span>
                      <StatusBadge status={pc.status} />
                    </div>
                    <p className="text-xs text-gray-500">
                      {pc.product} &mdash;{" "}
                      {new Date(pc.createdAt).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                  <ChevronDown className="h-3 w-3 text-amber-600 rotate-[-90deg]" />
                </button>
              ))}
          </CardContent>
        </Card>
      )}

      {/* Stock Repair Note */}
      {caseData.complaintType === "stock_repair" && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg px-4 py-2 text-sm text-purple-700">
          Dealer Stock Repair — No customer call needed. Send mail to company
          after completion.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Case Info */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Case Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {/* Editable Case ID (admin only) */}
            <div className="flex gap-2">
              <span className="text-gray-500 min-w-[100px] shrink-0">
                Case ID:
              </span>
              <div className="flex items-center gap-1 flex-1">
                {editingCaseId && isAdmin ? (
                  <>
                    <input
                      type="text"
                      value={newCaseIdValue}
                      onChange={(e) => setNewCaseIdValue(e.target.value)}
                      className="text-sm font-medium border rounded px-2 py-0.5 flex-1"
                      data-ocid="case_detail.input"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newCaseIdValue.trim()) {
                          updateCase(caseData.id, {
                            caseId: newCaseIdValue.trim(),
                          });
                          toast.success("Case ID updated");
                        }
                        setEditingCaseId(false);
                      }}
                      className="text-green-600 hover:text-green-800"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingCaseId(false);
                        setNewCaseIdValue(caseData.caseId);
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <span className="text-gray-900 font-medium">
                      {caseData.caseId}
                    </span>
                    {isAdmin && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingCaseId(true);
                          setNewCaseIdValue(caseData.caseId);
                        }}
                        className="text-gray-400 hover:text-blue-600 ml-1"
                        title="Edit Case ID"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
            {[
              ["Customer", caseData.customerName],
              ["Phone", caseData.phone],
              ["Alt Phone", caseData.altPhone || "—"],
              ["Address", caseData.address || "—"],
              ["Product", `${caseData.product} ${caseData.productType}`],
              ["Technician", assignedTech?.name ?? "Not assigned"],
              [
                "Created",
                `${new Date(caseData.createdAt).toLocaleString("en-IN")} (${getAgeing(caseData.createdAt) === 0 ? "Today" : getAgeing(caseData.createdAt) === 1 ? "1 day ago" : `${getAgeing(caseData.createdAt)} days ago`})`,
              ],
              [
                "Last Updated",
                new Date(caseData.updatedAt).toLocaleString("en-IN"),
              ],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-2">
                <span className="text-gray-500 min-w-[100px] shrink-0">
                  {k}:
                </span>
                <span className="text-gray-900 font-medium break-words">
                  {v}
                </span>
              </div>
            ))}
            {/* Multi-part display: show all parts if case.parts exists, fallback to single */}
            {caseData.parts && caseData.parts.length > 0 ? (
              <div className="mt-2 p-2 bg-orange-50 rounded-lg space-y-1">
                <p className="text-xs font-semibold text-orange-700">
                  Parts Required ({caseData.parts.length})
                </p>
                {caseData.parts.map((p) => (
                  <div key={p.id} className="flex items-center gap-2">
                    <span className="text-xs font-mono bg-orange-100 px-1 rounded">
                      {p.partCode}
                    </span>
                    <span className="text-xs text-orange-600">
                      {p.partName}
                    </span>
                    <span
                      className={`text-xs px-1 rounded ${
                        p.status === "issued"
                          ? "bg-green-100 text-green-700"
                          : p.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {p.status}
                    </span>
                    {p.partPhotoUrl && (
                      <img
                        src={p.partPhotoUrl}
                        alt="Part"
                        className="h-8 w-8 object-cover rounded border"
                      />
                    )}
                  </div>
                ))}
                {caseData.poNumber && (
                  <p className="text-xs text-orange-600">
                    PO: {caseData.poNumber}
                  </p>
                )}
                {caseData.poNumbers && caseData.poNumbers.length > 1 && (
                  <p className="text-xs text-orange-600">
                    POs: {caseData.poNumbers.join(", ")}
                  </p>
                )}
              </div>
            ) : caseData.partCode ? (
              <div className="mt-2 p-2 bg-orange-50 rounded-lg">
                <p className="text-xs font-semibold text-orange-700">
                  Part Info
                </p>
                <p className="text-xs text-orange-600">
                  {caseData.partName} ({caseData.partCode})
                </p>
                {caseData.poNumber && (
                  <p className="text-xs text-orange-600">
                    PO: {caseData.poNumber}
                  </p>
                )}
                {caseData.orderDate && (
                  <p className="text-xs text-orange-600">
                    Ordered:{" "}
                    {new Date(caseData.orderDate).toLocaleDateString("en-IN")}
                  </p>
                )}
                {caseData.partPhotoUrl && (
                  <div className="mt-1">
                    <img
                      src={caseData.partPhotoUrl}
                      alt="Part"
                      className="h-16 w-16 object-cover rounded border"
                    />
                  </div>
                )}
              </div>
            ) : null}
            {/* Parts Status - comprehensive multi-part display */}
            {(() => {
              const caseReqs = partRequests.filter(
                (r) => r.caseDbId === caseData.id,
              );
              if (caseReqs.length === 0) return null;

              // Build a unified list of all part entries grouped by partCode
              type PartEntry = {
                partCode: string;
                partName: string;
                entries: Array<{
                  reqId: string;
                  status: string;
                  issuedByName: string;
                  technicianName: string;
                  issuedAt: string;
                  rejectedReason?: string;
                  cancelledByName?: string;
                  partPhotoUrl?: string;
                }>;
              };
              const groupMap = new Map<string, PartEntry>();

              for (const req of caseReqs) {
                if (req.parts && req.parts.length > 0) {
                  for (const p of req.parts) {
                    const key = p.partCode || p.partName || "Unknown";
                    const existing = groupMap.get(key) ?? {
                      partCode: key,
                      partName: p.partName || key,
                      entries: [],
                    };
                    const tech = technicians.find(
                      (t) => t.id === (p.technicianId || req.technicianId),
                    );
                    existing.entries.push({
                      reqId: req.id,
                      status: p.status || req.status,
                      issuedByName: p.issuedByName || req.issuedByName || "",
                      technicianName: tech?.name || req.issuedByName || "",
                      issuedAt: p.issuedAt || req.issuedAt || "",
                      rejectedReason: req.rejectedReason || "",
                      cancelledByName: req.cancelledByName || "",
                      partPhotoUrl: p.partPhotoUrl || "",
                    });
                    groupMap.set(key, existing);
                  }
                } else {
                  const key = req.partCode || req.partName || "Unknown";
                  const existing = groupMap.get(key) ?? {
                    partCode: key,
                    partName: req.partName || key,
                    entries: [],
                  };
                  const tech = technicians.find(
                    (t) => t.id === req.technicianId,
                  );
                  existing.entries.push({
                    reqId: req.id,
                    status: req.status,
                    issuedByName: req.issuedByName || "",
                    technicianName: tech?.name || "",
                    issuedAt: req.issuedAt || "",
                    rejectedReason: req.rejectedReason || "",
                    cancelledByName: req.cancelledByName || "",
                    partPhotoUrl: req.partPhotoUrl || "",
                  });
                  groupMap.set(key, existing);
                }
              }

              const groups = [...groupMap.values()];

              const statusColor = (s: string) => {
                if (s === "issued") return "bg-green-100 text-green-700";
                if (s === "pending") return "bg-amber-100 text-amber-700";
                if (s === "rejected") return "bg-red-100 text-red-700";
                if (s === "cancelled") return "bg-slate-100 text-slate-600";
                return "bg-blue-100 text-blue-700";
              };

              return (
                <PartStatusSection groups={groups} statusColor={statusColor} />
              );
            })()}
          </CardContent>
        </Card>

        {/* Status Change */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Update Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {nextStatuses.length === 0 ? (
              <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                Case is in final state:{" "}
                <strong>{caseData.status.replace(/_/g, " ")}</strong>
              </p>
            ) : (
              <>
                {/* Part Ordered → Mark parts received (multi-select if multiple parts) */}
                {caseData.status === "part_ordered" &&
                  caseData.parts &&
                  caseData.parts.length > 0 &&
                  (() => {
                    const orderedParts = caseData.parts!.filter(
                      (p) =>
                        (p.status as string) === "ordered" ||
                        (p.status as string) === "pending",
                    );
                    const receivedParts = caseData.parts!.filter(
                      (p) => (p.status as string) === "received",
                    );
                    return (
                      <div className="space-y-2 border border-teal-200 rounded-xl p-3 bg-teal-50/40">
                        <div className="text-xs font-semibold text-teal-700 flex items-center gap-1">
                          <Package className="h-3.5 w-3.5" />
                          Parts ordered — mark received:
                        </div>
                        {receivedParts.length > 0 && (
                          <div className="text-xs text-teal-600 bg-teal-50 border border-teal-200 rounded p-2">
                            ✓ {receivedParts.length} part(s) already received:{" "}
                            {receivedParts.map((p) => p.partCode).join(", ")}
                          </div>
                        )}
                        {orderedParts.length > 0 ? (
                          <>
                            <div className="text-xs text-slate-600">
                              {orderedParts.length} part(s) still awaiting
                              receipt
                            </div>
                            <Button
                              onClick={() => {
                                setShowPartReceivedModal(true);
                                setSelectedReceivedPartIds(new Set());
                              }}
                              className="w-full bg-teal-600 hover:bg-teal-700"
                              data-ocid="case_detail.part_received_button"
                            >
                              Mark Parts Received
                            </Button>
                          </>
                        ) : (
                          <div className="text-xs text-emerald-600 font-medium">
                            ✓ All parts received — select "Part Issued" or next
                            status below
                          </div>
                        )}
                        <div className="border-t border-slate-200 pt-3">
                          <p className="text-xs text-slate-400 text-center">
                            — or update to other status below —
                          </p>
                        </div>
                      </div>
                    );
                  })()}

                {/* Multi-part / single-part dual-dropdown: shown when case is part_required */}
                {caseData.status === "part_required" &&
                  (() => {
                    // Use caseData.parts[] as authoritative source; fall back to partRequests for legacy
                    const caseParts: Array<{
                      id: string;
                      partCode: string;
                      partName: string;
                      status: string;
                      partPhotoUrl?: string;
                    }> = (() => {
                      if (caseData.parts && caseData.parts.length > 0) {
                        return caseData.parts.map((p) => ({
                          id: p.id,
                          partCode: p.partCode,
                          partName: p.partName,
                          status: (p as any).status ?? "pending",
                          partPhotoUrl: p.partPhotoUrl,
                        }));
                      }
                      const linkedReqs = partRequests.filter(
                        (r) =>
                          r.caseDbId === caseData.id && r.status === "pending",
                      );
                      return linkedReqs.flatMap((r) => {
                        if (r.parts && r.parts.length > 0) {
                          return r.parts.map((p) => ({
                            id: p.id,
                            partCode: p.partCode,
                            partName: p.partName,
                            status: (p.status as string) ?? "pending",
                            partPhotoUrl: p.partPhotoUrl,
                          }));
                        }
                        if (r.partCode) {
                          return [
                            {
                              id: r.id,
                              partCode: r.partCode,
                              partName: r.partName,
                              status: "pending" as string,
                              partPhotoUrl: r.partPhotoUrl,
                            },
                          ];
                        }
                        return [];
                      });
                    })();

                    if (caseParts.length === 0) return null;

                    const isMultiple = caseParts.length > 1;

                    if (!isMultiple) {
                      // SINGLE PART — one dropdown with three options
                      const part = caseParts[0];
                      return (
                        <div className="space-y-3 border border-indigo-100 rounded-xl p-3 bg-indigo-50/40">
                          <div className="text-xs font-semibold text-indigo-700 flex items-center gap-1">
                            <Package className="h-3.5 w-3.5" />1 part required —
                            update status:
                          </div>
                          <div className="text-xs bg-white border border-slate-200 rounded-lg px-3 py-2 flex items-center gap-2">
                            <span className="font-mono font-semibold text-slate-700">
                              {part.partCode}
                            </span>
                            {part.partName && (
                              <span className="text-slate-500">
                                — {part.partName}
                              </span>
                            )}
                          </div>
                          <Select
                            value={firstDropdownChoice}
                            onValueChange={(v) => {
                              setFirstDropdownChoice(
                                v as
                                  | "part_available"
                                  | "part_ordered"
                                  | "cancelled",
                              );
                              setFirstSelectedPartIds(new Set([part.id]));
                              setFirstPONumbers({});
                            }}
                          >
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue placeholder="Choose status..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="part_available">
                                ✅ Part Available
                              </SelectItem>
                              <SelectItem value="part_ordered">
                                📦 Part Ordered (PO)
                              </SelectItem>
                              <SelectItem value="cancelled">
                                ⏳ Pending / Cancel
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          {firstDropdownChoice === "part_ordered" && (
                            <div className="space-y-1">
                              <Label className="text-xs">
                                PO Number (optional)
                              </Label>
                              <Input
                                className="h-7 text-xs"
                                placeholder="e.g. PO-2024-001"
                                value={firstPONumbers[part.id] || ""}
                                onChange={(e) =>
                                  setFirstPONumbers({
                                    [part.id]: e.target.value,
                                  })
                                }
                              />
                            </div>
                          )}
                          <Button
                            onClick={handleMultiPartStatusUpdate}
                            disabled={saving || firstDropdownChoice === ""}
                            className="w-full bg-indigo-600 hover:bg-indigo-700"
                            data-ocid="case_detail.submit_button"
                          >
                            {saving ? "Saving..." : "Update Part Status"}
                          </Button>
                          <div className="border-t border-slate-200 pt-3">
                            <p className="text-xs text-slate-400 text-center">
                              — or update to other status below —
                            </p>
                          </div>
                        </div>
                      );
                    }

                    // MULTIPLE PARTS — two sequential dropdowns
                    const remainingForSecond = caseParts.filter(
                      (p) => !firstSelectedPartIds.has(p.id),
                    );

                    const secondOptions: Array<{
                      value: string;
                      label: string;
                    }> =
                      firstDropdownChoice === "part_available"
                        ? [
                            {
                              value: "part_ordered",
                              label: "Part Ordered (PO)",
                            },
                            { value: "cancelled", label: "Pending / Cancel" },
                          ]
                        : firstDropdownChoice === "part_ordered"
                          ? [
                              {
                                value: "part_available",
                                label: "Part Available",
                              },
                              { value: "cancelled", label: "Pending / Cancel" },
                            ]
                          : [];

                    const showSecondDropdown =
                      firstDropdownChoice !== "" &&
                      firstDropdownChoice !== "cancelled" &&
                      firstSelectedPartIds.size > 0 &&
                      remainingForSecond.length > 0;

                    const canSubmit =
                      firstDropdownChoice === "cancelled" ||
                      (firstDropdownChoice !== "" &&
                        firstSelectedPartIds.size > 0);

                    return (
                      <div className="space-y-3 border border-indigo-100 rounded-xl p-3 bg-indigo-50/40">
                        <div className="text-xs font-semibold text-indigo-700 flex items-center gap-1">
                          <Package className="h-3.5 w-3.5" />
                          {caseParts.length} parts required — update their
                          status:
                        </div>

                        {/* First dropdown */}
                        <div className="space-y-2">
                          <Label className="text-xs font-medium text-slate-600">
                            First — Select primary status:
                          </Label>
                          <Select
                            value={firstDropdownChoice}
                            onValueChange={(v) => {
                              setFirstDropdownChoice(
                                v as
                                  | "part_available"
                                  | "part_ordered"
                                  | "cancelled",
                              );
                              setFirstSelectedPartIds(new Set());
                              setFirstPONumbers({});
                              setSecondDropdownChoice("");
                              setSecondSelectedPartIds(new Set());
                              setSecondPONumbers({});
                            }}
                          >
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue placeholder="Choose status..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="part_available">
                                ✅ Part Available
                              </SelectItem>
                              <SelectItem value="part_ordered">
                                📦 Part Ordered (PO)
                              </SelectItem>
                              <SelectItem value="cancelled">
                                ⏳ Pending / Cancel Case
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* First dropdown part selection (if not cancelled/pending) */}
                        {firstDropdownChoice !== "" &&
                          firstDropdownChoice !== "cancelled" && (
                            <div
                              className={`rounded-lg p-2 space-y-1 border ${firstDropdownChoice === "part_available" ? "border-green-200 bg-green-50" : "border-blue-200 bg-blue-50"}`}
                            >
                              <p className="text-xs font-semibold text-slate-600 mb-1">
                                Select parts to mark as{" "}
                                {firstDropdownChoice === "part_available"
                                  ? "Available"
                                  : "Ordered"}
                                :
                              </p>
                              {caseParts.map((part) => (
                                <div key={`first-${part.id}`}>
                                  <label className="flex items-center gap-2 py-1 cursor-pointer">
                                    <input
                                      type="checkbox"
                                      className="rounded"
                                      checked={firstSelectedPartIds.has(
                                        part.id,
                                      )}
                                      onChange={(e) => {
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
                                      }}
                                    />
                                    <span className="text-xs">
                                      <strong className="font-mono">
                                        {part.partCode}
                                      </strong>
                                      {part.partName
                                        ? ` — ${part.partName}`
                                        : ""}
                                    </span>
                                  </label>
                                  {firstDropdownChoice === "part_ordered" &&
                                    firstSelectedPartIds.has(part.id) && (
                                      <Input
                                        className="mt-1 text-xs h-7 ml-5"
                                        placeholder="PO Number (optional)"
                                        value={firstPONumbers[part.id] || ""}
                                        onChange={(e) =>
                                          setFirstPONumbers((prev) => ({
                                            ...prev,
                                            [part.id]: e.target.value,
                                          }))
                                        }
                                      />
                                    )}
                                </div>
                              ))}
                            </div>
                          )}

                        {/* Second dropdown: only when first is done and remaining parts exist */}
                        {showSecondDropdown && (
                          <div className="space-y-2">
                            <Label className="text-xs font-medium text-slate-600">
                              Second — Remaining {remainingForSecond.length}{" "}
                              part(s) status:
                            </Label>
                            <Select
                              value={secondDropdownChoice}
                              onValueChange={(v) => {
                                setSecondDropdownChoice(
                                  v as
                                    | "part_available"
                                    | "part_ordered"
                                    | "cancelled",
                                );
                                setSecondSelectedPartIds(new Set());
                                setSecondPONumbers({});
                              }}
                            >
                              <SelectTrigger className="h-8 text-xs">
                                <SelectValue placeholder="Choose status for remaining parts..." />
                              </SelectTrigger>
                              <SelectContent>
                                {secondOptions.map((opt) => (
                                  <SelectItem key={opt.value} value={opt.value}>
                                    {opt.value === "part_available"
                                      ? "✅"
                                      : opt.value === "part_ordered"
                                        ? "📦"
                                        : "⏳"}{" "}
                                    {opt.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>

                            {secondDropdownChoice !== "" &&
                              secondDropdownChoice !== "cancelled" && (
                                <div
                                  className={`rounded-lg p-2 space-y-1 border ${secondDropdownChoice === "part_available" ? "border-green-200 bg-green-50" : "border-blue-200 bg-blue-50"}`}
                                >
                                  <p className="text-xs font-semibold text-slate-600 mb-1">
                                    Select parts to mark as{" "}
                                    {secondDropdownChoice === "part_available"
                                      ? "Available"
                                      : "Ordered"}
                                    :
                                  </p>
                                  {remainingForSecond.map((part) => (
                                    <div key={`second-${part.id}`}>
                                      <label className="flex items-center gap-2 py-1 cursor-pointer">
                                        <input
                                          type="checkbox"
                                          className="rounded"
                                          checked={secondSelectedPartIds.has(
                                            part.id,
                                          )}
                                          onChange={(e) => {
                                            setSecondSelectedPartIds((prev) => {
                                              const next = new Set(prev);
                                              if (e.target.checked)
                                                next.add(part.id);
                                              else next.delete(part.id);
                                              return next;
                                            });
                                          }}
                                        />
                                        <span className="text-xs">
                                          <strong className="font-mono">
                                            {part.partCode}
                                          </strong>
                                          {part.partName
                                            ? ` — ${part.partName}`
                                            : ""}
                                        </span>
                                      </label>
                                      {secondDropdownChoice ===
                                        "part_ordered" &&
                                        secondSelectedPartIds.has(part.id) && (
                                          <Input
                                            className="mt-1 text-xs h-7 ml-5"
                                            placeholder="PO Number (optional)"
                                            value={
                                              secondPONumbers[part.id] || ""
                                            }
                                            onChange={(e) =>
                                              setSecondPONumbers((prev) => ({
                                                ...prev,
                                                [part.id]: e.target.value,
                                              }))
                                            }
                                          />
                                        )}
                                    </div>
                                  ))}
                                </div>
                              )}
                          </div>
                        )}

                        <Button
                          onClick={handleMultiPartStatusUpdate}
                          disabled={saving || !canSubmit}
                          className="w-full bg-indigo-600 hover:bg-indigo-700"
                          data-ocid="case_detail.submit_button"
                        >
                          {saving ? "Saving..." : "Update Parts Status"}
                        </Button>
                        <div className="border-t border-slate-200 pt-3">
                          <p className="text-xs text-slate-400 text-center">
                            — or update to other status below —
                          </p>
                        </div>
                      </div>
                    );
                  })()}

                <div className="space-y-1">
                  <Label className="text-xs">New Status</Label>
                  <Select
                    value={newStatus}
                    onValueChange={(v: CaseStatus) => setNewStatus(v)}
                  >
                    <SelectTrigger data-ocid="case_detail.select">
                      <SelectValue placeholder="Select next status" />
                    </SelectTrigger>
                    <SelectContent>
                      {nextStatuses.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s.replace(/_/g, " ").toUpperCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Pending / Rescheduled */}
                {(newStatus === "pending" || newStatus === "rescheduled") && (
                  <div className="space-y-1">
                    <Label className="text-xs">Next Action Date *</Label>
                    <Input
                      type="date"
                      value={nextAction}
                      onChange={(e) => setNextAction(e.target.value)}
                      required
                      data-ocid="case_detail.input"
                    />
                  </div>
                )}

                {/* On Route → Assign tech */}
                {newStatus === "on_route" && (
                  <div className="space-y-1">
                    <Label className="text-xs">Assign Technician *</Label>
                    <Select value={techId} onValueChange={setTechId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select technician" />
                      </SelectTrigger>
                      <SelectContent>
                        {technicians
                          .filter((t) => t.isActive)
                          .map((t) => (
                            <SelectItem key={t.id} value={t.id}>
                              {t.name} ({t.specialization})
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Part Required — multi-part entry */}
                {newStatus === "part_required" && (
                  <div className="space-y-3">
                    {partEntries.map((entry, idx) => (
                      <div
                        key={entry.id}
                        className="border border-gray-200 rounded-lg p-3 space-y-2 bg-gray-50"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-gray-600">
                            Part {idx + 1}
                          </span>
                          {partEntries.length > 1 && (
                            <button
                              type="button"
                              onClick={() =>
                                setPartEntries((prev) =>
                                  prev.filter((e) => e.id !== entry.id),
                                )
                              }
                              className="text-red-400 hover:text-red-600"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <Label className="text-xs">Part Name *</Label>
                            <Input
                              placeholder="e.g. Compressor"
                              value={entry.partName}
                              onChange={(e) =>
                                setPartEntries((prev) =>
                                  prev.map((p) =>
                                    p.id === entry.id
                                      ? { ...p, partName: e.target.value }
                                      : p,
                                  ),
                                )
                              }
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">Part Code *</Label>
                            <Input
                              placeholder="e.g. COMP-350"
                              value={entry.partCode}
                              onChange={(e) =>
                                setPartEntries((prev) =>
                                  prev.map((p) =>
                                    p.id === entry.id
                                      ? {
                                          ...p,
                                          partCode: e.target.value,
                                          stockStatus: undefined,
                                        }
                                      : p,
                                  ),
                                )
                              }
                              onBlur={(e) => {
                                const status = getPartStockStatus(
                                  e.target.value,
                                );
                                setPartEntries((prev) =>
                                  prev.map((p) =>
                                    p.id === entry.id
                                      ? { ...p, stockStatus: status.label }
                                      : p,
                                  ),
                                );
                              }}
                            />
                            {entry.partCode &&
                              (() => {
                                const st = getPartStockStatus(entry.partCode);
                                return st.label ? (
                                  <span
                                    className={`text-xs px-2 py-0.5 rounded border ${st.color}`}
                                  >
                                    {st.label}
                                  </span>
                                ) : null;
                              })()}
                          </div>
                        </div>
                        {/* Price field — stored on case, NOT sent to supervisor in part request */}
                        <div className="space-y-1">
                          <Label className="text-xs">Price ₹ (optional)</Label>
                          <Input
                            type="number"
                            placeholder="e.g. 1500"
                            value={entry.price ?? ""}
                            onChange={(e) =>
                              setPartEntries((prev) =>
                                prev.map((p) =>
                                  p.id === entry.id
                                    ? { ...p, price: e.target.value }
                                    : p,
                                ),
                              )
                            }
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">
                            Part Photo (optional)
                          </Label>
                          <label className="flex items-center gap-2 text-xs border border-dashed border-gray-300 rounded-lg px-3 py-2 w-full hover:bg-gray-100 cursor-pointer">
                            <Upload className="h-3 w-3 text-gray-400" />
                            {entry.partPhotoFile
                              ? entry.partPhotoFile.name
                              : "Upload part photo"}
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (f) handlePartPhotoSelect(entry.id, f);
                              }}
                            />
                          </label>
                          {entry.partPhotoUrl && (
                            <img
                              src={entry.partPhotoUrl}
                              alt="Part"
                              className="h-16 w-16 object-cover rounded border"
                            />
                          )}
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        setPartEntries((prev) => [
                          ...prev,
                          {
                            id: Math.random().toString(36).slice(2),
                            partCode: "",
                            partName: "",
                            partPhotoUrl: "",
                            partPhotoFile: null,
                            price: "",
                          },
                        ])
                      }
                      className="flex items-center gap-2 text-xs text-blue-600 border border-blue-200 px-3 py-2 rounded-lg hover:bg-blue-50 w-full justify-center"
                      data-ocid="case_detail.button"
                    >
                      <Plus className="h-3 w-3" /> Add Another Part
                    </button>
                    {/* Priority Dropdown */}
                    <div className="space-y-1">
                      <label
                        htmlFor="partPriority"
                        className="text-xs font-medium text-gray-600"
                      >
                        Request Priority
                      </label>
                      <select
                        id="partPriority"
                        value={partPriority}
                        onChange={(e) => setPartPriority(e.target.value)}
                        className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="low">Low</option>
                        <option value="normal">Normal</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                    <a
                      href={waPartQuery()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs bg-green-50 text-green-700 border border-green-200 px-3 py-2 rounded-lg hover:bg-green-100 w-full justify-center"
                    >
                      <MessageSquare className="h-3 w-3" /> Check Part
                      Availability (WhatsApp Supervisor)
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        const validParts = partEntries.filter(
                          (e) => e.partCode.trim() && e.partName.trim(),
                        );
                        if (validParts.length === 0) {
                          toast.error(
                            "At least one Part Name and Part Code are required.",
                          );
                          return;
                        }
                        // Check for duplicate: same caseId + same part codes
                        const existingReqs = partRequests.filter(
                          (r) =>
                            r.caseDbId === caseData.id &&
                            r.status === "pending",
                        );
                        const newPartCodes = validParts
                          .map((p) => p.partCode.trim().toLowerCase())
                          .sort()
                          .join(",");
                        const isDuplicate = existingReqs.some((r) => {
                          const existingCodes = (
                            r.parts && r.parts.length > 0
                              ? r.parts.map((p) =>
                                  p.partCode.trim().toLowerCase(),
                                )
                              : [r.partCode?.trim().toLowerCase() ?? ""]
                          )
                            .sort()
                            .join(",");
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
                          partPhotoUrl:
                            validParts[0].partPhotoUrl || caseData.partPhotoUrl,
                          requestedBy: currentUser?.id ?? "",
                          requestedByName: currentUser?.name ?? "",
                          productType:
                            (caseData as any).product ||
                            (caseData as any).productType ||
                            "",
                          companyName:
                            (caseData as any).companyName ||
                            (caseData as any).company ||
                            "",
                          priority: partPriority,
                          parts: validParts.map((e) => ({
                            id: Math.random().toString(36).slice(2),
                            partCode: e.partCode,
                            partName: e.partName,
                            partPhotoUrl: e.partPhotoUrl,
                            status: "pending" as const,
                            // price intentionally excluded from part request (supervisor should not see price)
                          })),
                        } as any);
                        toast.success("Part requested successfully");
                      }}
                      className="flex items-center gap-2 text-xs bg-blue-50 text-blue-700 border border-blue-200 px-3 py-2 rounded-lg hover:bg-blue-100 w-full justify-center"
                      data-ocid="case_detail.primary_button"
                    >
                      <span>📦</span> Request Part from Supervisor
                    </button>

                    {/* Case Related Images — NOT sent with part request */}
                    <div className="border border-dashed border-violet-300 rounded-lg p-3 space-y-2 bg-violet-50">
                      <p className="text-xs font-semibold text-violet-700 flex items-center gap-1">
                        <Image className="h-3 w-3" /> Case Related Images
                        (Product/Serial/Invoice etc.)
                      </p>
                      <p className="text-xs text-violet-500">
                        These photos are saved to the case only — not included
                        in the part request.
                      </p>
                      <input
                        ref={caseRelatedRef}
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => {
                          handleCaseRelatedPhotoSelect(e.target.files);
                          e.target.value = "";
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => caseRelatedRef.current?.click()}
                        className="flex items-center gap-2 text-xs border border-dashed border-violet-300 rounded-lg px-3 py-2 w-full hover:bg-violet-100"
                        data-ocid="case_detail.upload_button"
                      >
                        <Upload className="h-3 w-3 text-violet-400" />
                        {caseRelatedFiles.length > 0
                          ? `${caseRelatedFiles.length} photo(s) selected`
                          : "Upload case photos (product, serial, invoice, etc.)"}
                      </button>
                      {caseRelatedUrls.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {caseRelatedUrls.map((url, idx) => (
                            <div
                              key={url.slice(-24)}
                              className="relative group"
                            >
                              <img
                                src={url}
                                alt={`Related ${idx + 1}`}
                                className="h-16 w-16 object-cover rounded border border-violet-200"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  setCaseRelatedFiles((prev) =>
                                    prev.filter((_, i) => i !== idx),
                                  );
                                  setCaseRelatedUrls((prev) =>
                                    prev.filter((_, i) => i !== idx),
                                  );
                                }}
                                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Part Ordered — multi-PO entry */}
                {newStatus === "part_ordered" && (
                  <div className="space-y-2">
                    <p className="text-xs text-gray-500 bg-blue-50 px-3 py-2 rounded-lg">
                      Enter PO details (optional)
                    </p>
                    {poNumbers.map((po, idx) => (
                      <div key={po.id} className="flex gap-2 items-center">
                        <div className="flex-1 space-y-1">
                          <Label className="text-xs">
                            PO Number {idx + 1} (optional)
                          </Label>
                          <Input
                            placeholder="e.g. PO-2024-001"
                            value={po.value}
                            onChange={(e) =>
                              setPoNumbers((prev) =>
                                prev.map((p) =>
                                  p.id === po.id
                                    ? { ...p, value: e.target.value }
                                    : p,
                                ),
                              )
                            }
                          />
                        </div>
                        {poNumbers.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              setPoNumbers((prev) =>
                                prev.filter((p) => p.id !== po.id),
                              )
                            }
                            className="mt-5 text-red-400 hover:text-red-600"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        setPoNumbers((prev) => [
                          ...prev,
                          {
                            id: Math.random().toString(36).slice(2),
                            value: "",
                          },
                        ])
                      }
                      className="flex items-center gap-2 text-xs text-blue-600 border border-blue-200 px-3 py-2 rounded-lg hover:bg-blue-50 w-full justify-center"
                    >
                      <Plus className="h-3 w-3" /> Add PO Number
                    </button>
                    <div className="space-y-1">
                      <Label className="text-xs">Order Date (optional)</Label>
                      <Input
                        type="date"
                        value={orderDate}
                        onChange={(e) => setOrderDate(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {/* Closing statuses — feedback + optional photo */}
                {isClosingStatus && (
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <Label className="text-xs">Technician Feedback</Label>
                      <Textarea
                        placeholder="Work done details..."
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        rows={2}
                      />
                    </div>
                    {/* Optional closing photo */}
                    <div className="space-y-1">
                      <Label className="text-xs">
                        After-work Photo (optional)
                      </Label>
                      <input
                        ref={closingPhotoRef}
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => {
                          handleClosingPhotoSelect(e.target.files);
                          e.target.value = "";
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => closingPhotoRef.current?.click()}
                        className="flex items-center gap-2 text-xs border border-dashed border-gray-300 rounded-lg px-3 py-2 w-full hover:bg-gray-50"
                        data-ocid="case_detail.dropzone"
                      >
                        <Image className="h-3 w-3 text-gray-400" />
                        {closingPhotoFiles.length > 0
                          ? `${closingPhotoFiles.length} photo${closingPhotoFiles.length > 1 ? "s" : ""} selected`
                          : "Upload closing photos (optional, multiple)"}
                      </button>
                      {closingPhotoUrls.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {closingPhotoUrls.map((url, idx) => (
                            <img
                              key={url.slice(-20)}
                              src={url}
                              alt={`Closing preview ${idx + 1}`}
                              className="h-20 w-20 object-cover rounded border"
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Existing case related images (already saved) */}
                    {(caseData.caseRelatedImages ?? []).length > 0 && (
                      <div className="space-y-1">
                        <Label className="text-xs text-violet-700 font-semibold">
                          Existing Case Related Images
                        </Label>
                        <div className="flex flex-wrap gap-2">
                          {(caseData.caseRelatedImages ?? []).map((img) => (
                            <div key={img.id} className="relative group">
                              <img
                                src={img.url}
                                alt={img.name}
                                className="h-16 w-16 object-cover rounded border border-violet-200"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center gap-1">
                                <a
                                  href={img.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-white text-xs bg-blue-600 px-1.5 py-0.5 rounded"
                                >
                                  View
                                </a>
                                <a
                                  href={img.url}
                                  download={img.name}
                                  className="text-white text-xs bg-green-600 px-1.5 py-0.5 rounded"
                                >
                                  ↓
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Case Related Images upload for closing */}
                    <div className="space-y-1">
                      <Label className="text-xs">
                        Case Related Images (optional)
                      </Label>
                      <p className="text-xs text-gray-400">
                        Product photo, serial number, invoice, ratings etc.
                      </p>
                      <input
                        ref={caseRelatedRef}
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => {
                          handleCaseRelatedPhotoSelect(e.target.files);
                          e.target.value = "";
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => caseRelatedRef.current?.click()}
                        className="flex items-center gap-2 text-xs border border-dashed border-violet-300 rounded-lg px-3 py-2 w-full hover:bg-violet-50"
                        data-ocid="case_detail.upload_button"
                      >
                        <Image className="h-3 w-3 text-violet-400" />
                        {caseRelatedFiles.length > 0
                          ? `${caseRelatedFiles.length} case photo(s) selected`
                          : "Upload case related photos (optional)"}
                      </button>
                      {caseRelatedUrls.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {caseRelatedUrls.map((url, idx) => (
                            <div
                              key={url.slice(-24)}
                              className="relative group"
                            >
                              <img
                                src={url}
                                alt={`Related ${idx + 1}`}
                                className="h-16 w-16 object-cover rounded border border-violet-200"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  setCaseRelatedFiles((prev) =>
                                    prev.filter((_, i) => i !== idx),
                                  );
                                  setCaseRelatedUrls((prev) =>
                                    prev.filter((_, i) => i !== idx),
                                  );
                                }}
                                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Cancel / Transfer reason */}
                {(newStatus === "cancelled" || newStatus === "transferred") && (
                  <div className="space-y-1">
                    <Label className="text-xs">Reason *</Label>
                    <Input
                      placeholder="Reason for cancellation/transfer"
                      value={statusDetails}
                      onChange={(e) => setStatusDetails(e.target.value)}
                      required
                    />
                  </div>
                )}

                {/* Generic additional details for remaining statuses */}
                {![
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
                    "gas_charge_done",
                  ],
                ].includes(newStatus) &&
                  newStatus !== "" && (
                    <div className="space-y-1">
                      <Label className="text-xs">Additional Details</Label>
                      <Input
                        placeholder="Optional notes"
                        value={statusDetails}
                        onChange={(e) => setStatusDetails(e.target.value)}
                      />
                    </div>
                  )}

                <Button
                  onClick={handleStatusChange}
                  disabled={!newStatus || saving}
                  className="w-full"
                  data-ocid="case_detail.submit_button"
                >
                  {saving ? "Saving..." : "Update Status"}
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Always-available Part Request button — shown whenever status is part_required AND parts exist */}
      {caseData.status === "part_required" &&
        caseData.parts &&
        caseData.parts.length > 0 && (
          <Card className="shadow-sm border-blue-200 bg-blue-50/30">
            <CardHeader className="pb-2 pt-3">
              <CardTitle className="text-sm text-blue-700 flex items-center gap-2">
                <Package className="h-4 w-4" /> Request Part from Supervisor
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex flex-wrap gap-1">
                {caseData.parts.map((p) => (
                  <span
                    key={p.id}
                    className="text-xs font-mono bg-orange-100 text-orange-700 px-2 py-0.5 rounded"
                  >
                    {p.partCode} — {p.partName}
                  </span>
                ))}
              </div>
              <button
                type="button"
                onClick={() => {
                  // Check for duplicate: same caseId + same part codes
                  const existingReqs = partRequests.filter(
                    (r) => r.caseDbId === caseData.id && r.status === "pending",
                  );
                  const casePCodes = (caseData.parts ?? [])
                    .map((p) => p.partCode.trim().toLowerCase())
                    .sort()
                    .join(",");
                  const isDuplicate = existingReqs.some((r) => {
                    const existingCodes = (
                      r.parts && r.parts.length > 0
                        ? r.parts.map((p) => p.partCode.trim().toLowerCase())
                        : [r.partCode?.trim().toLowerCase() ?? ""]
                    )
                      .sort()
                      .join(",");
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
                    partName: parts[0]?.partName ?? "",
                    partCode: parts[0]?.partCode ?? "",
                    partPhotoUrl:
                      parts[0]?.partPhotoUrl ?? caseData.partPhotoUrl,
                    requestedBy: currentUser?.id ?? "",
                    requestedByName: currentUser?.name ?? "",
                    productType:
                      (caseData as any).product ||
                      (caseData as any).productType ||
                      "",
                    companyName:
                      (caseData as any).companyName ||
                      (caseData as any).company ||
                      "",
                    priority: "normal",
                    parts: parts.map((p) => ({
                      id: Math.random().toString(36).slice(2),
                      partCode: p.partCode,
                      partName: p.partName,
                      partPhotoUrl: p.partPhotoUrl,
                      status: "pending" as const,
                    })),
                  } as any);
                  toast.success("Part request sent to supervisor");
                }}
                className="flex items-center gap-2 text-xs bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full justify-center font-medium"
                data-ocid="case_detail.part_request_button"
              >
                <span>📦</span> Send Part Request to Supervisor
              </button>
              <p className="text-xs text-blue-500 text-center">
                {partRequests.filter(
                  (r) => r.caseDbId === caseData.id && r.status === "pending",
                ).length > 0
                  ? `⚠ ${partRequests.filter((r) => r.caseDbId === caseData.id && r.status === "pending").length} pending request(s) already sent`
                  : "No pending requests for this case"}
              </p>
            </CardContent>
          </Card>
        )}

      {/* Remarks & Notes */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Remarks &amp; Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-xs">Remarks</Label>
              <Textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                rows={3}
                placeholder="Remarks..."
                data-ocid="case_detail.textarea"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Additional Notes</Label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Internal notes..."
              />
            </div>
          </div>
          <Button
            size="sm"
            onClick={saveNotes}
            variant="outline"
            data-ocid="case_detail.save_button"
          >
            Save Notes
          </Button>
        </CardContent>
      </Card>

      {/* Reminders */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Clock className="h-4 w-4" /> Follow-up Reminders
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {caseReminders.length > 0 && (
            <div className="space-y-2 mb-3">
              {caseReminders.map((r) => (
                <div
                  key={r.id}
                  className="flex items-center justify-between bg-yellow-50 border border-yellow-200 px-3 py-2 rounded-lg text-sm"
                >
                  <div>
                    <p className="font-medium text-yellow-800">
                      {new Date(r.reminderDate).toLocaleDateString("en-IN")}
                    </p>
                    {r.note && (
                      <p className="text-xs text-yellow-600">{r.note}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              type="date"
              value={reminderDate}
              onChange={(e) => setReminderDate(e.target.value)}
              className="sm:w-40"
              data-ocid="case_detail.input"
            />
            <Input
              placeholder="Reminder note"
              value={reminderNote}
              onChange={(e) => setReminderNote(e.target.value)}
              className="flex-1"
            />
            <Button
              size="sm"
              onClick={addReminderHandler}
              disabled={!reminderDate}
              data-ocid="case_detail.button"
            >
              Set Reminder
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Photos */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Photos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Part Photos */}
          <div>
            <p className="text-xs font-semibold text-orange-700 mb-2 flex items-center gap-1">
              <Package className="h-3 w-3" /> Part Photos
            </p>
            {caseData.photos.filter((p) => p.type === "part").length === 0 ? (
              <p className="text-xs text-gray-400 bg-gray-50 rounded p-2">
                No part photos
              </p>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {caseData.photos
                  .filter((p) => p.type === "part")
                  .map((p) => (
                    <div key={p.id} className="space-y-1">
                      <div className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={p.url}
                          alt={p.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                          <a
                            href={p.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white text-xs bg-blue-600 px-1.5 py-0.5 rounded"
                          >
                            View
                          </a>
                          <a
                            href={p.url}
                            download={p.name}
                            className="text-white text-xs bg-green-600 px-1.5 py-0.5 rounded"
                          >
                            ↓
                          </a>
                        </div>
                      </div>
                      <p className="text-xs text-center text-gray-500 truncate">
                        {p.name}
                      </p>
                    </div>
                  ))}
              </div>
            )}
            {/* Upload button for part photos */}
            <label
              className="mt-2 flex items-center gap-2 text-xs border border-dashed border-orange-300 rounded-lg px-3 py-2 cursor-pointer hover:bg-orange-50 w-full"
              data-ocid="case_detail.upload_button"
            >
              <Upload className="h-3 w-3 text-orange-400" />
              Upload Part Photo
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={async (e) => {
                  const files = Array.from(e.target.files || []);
                  for (const file of files) {
                    const url = await fileToDataUrl(file);
                    addPhotoToCase(caseData.id, {
                      url,
                      type: "part" as PhotoType,
                      name: file.name,
                    });
                  }
                  e.target.value = "";
                  toast.success("Part photo(s) uploaded");
                }}
              />
            </label>
          </div>

          {/* Other Case Photos (after/product/serial etc) */}
          <div>
            <p className="text-xs font-semibold text-gray-600 mb-2 flex items-center gap-1">
              <Image className="h-3 w-3" /> Other Case Photos
            </p>
            {caseData.photos.filter((p) => p.type !== "part").length === 0 ? (
              <p className="text-xs text-gray-400 bg-gray-50 rounded p-2">
                No other photos
              </p>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {caseData.photos
                  .filter((p) => p.type !== "part")
                  .map((p) => (
                    <div key={p.id} className="space-y-1">
                      <div className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={p.url}
                          alt={p.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                          <a
                            href={p.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white text-xs bg-blue-600 px-1.5 py-0.5 rounded"
                          >
                            View
                          </a>
                          <a
                            href={p.url}
                            download={p.name}
                            className="text-white text-xs bg-green-600 px-1.5 py-0.5 rounded"
                          >
                            ↓
                          </a>
                        </div>
                      </div>
                      <p className="text-xs text-center text-gray-500 truncate">
                        {photoTypeLabel[p.type as PhotoType]}
                      </p>
                    </div>
                  ))}
              </div>
            )}
            {/* Upload button for other case photos */}
            <label
              className="mt-2 flex items-center gap-2 text-xs border border-dashed border-gray-300 rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-50 w-full"
              data-ocid="case_detail.upload_button"
            >
              <Upload className="h-3 w-3 text-gray-400" />
              Upload Case Photo
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={async (e) => {
                  const files = Array.from(e.target.files || []);
                  for (const file of files) {
                    const url = await fileToDataUrl(file);
                    addPhotoToCase(caseData.id, {
                      url,
                      type: "after" as PhotoType,
                      name: file.name,
                    });
                  }
                  e.target.value = "";
                  toast.success("Photo(s) uploaded");
                }}
              />
            </label>
          </div>

          {/* Case Related Images */}
          <div>
            <p className="text-xs font-semibold text-violet-700 mb-2 flex items-center gap-1">
              <Image className="h-3 w-3 text-violet-500" /> Case Related Images
            </p>
            {(caseData.caseRelatedImages ?? []).length === 0 ? (
              <p className="text-xs text-gray-400 bg-gray-50 rounded p-2">
                No case related images
              </p>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {(caseData.caseRelatedImages ?? []).map((img) => (
                  <div key={img.id} className="space-y-1">
                    <div className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={img.url}
                        alt={img.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                        <a
                          href={img.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white text-xs bg-blue-600 px-1.5 py-0.5 rounded"
                        >
                          View
                        </a>
                        <a
                          href={img.url}
                          download={img.name}
                          className="text-white text-xs bg-green-600 px-1.5 py-0.5 rounded"
                        >
                          ↓
                        </a>
                      </div>
                    </div>
                    <p className="text-xs text-center text-gray-500 truncate">
                      {img.name}
                    </p>
                  </div>
                ))}
              </div>
            )}
            {/* Upload button for case related images */}
            <label
              className="mt-2 flex items-center gap-2 text-xs border border-dashed border-violet-300 rounded-lg px-3 py-2 cursor-pointer hover:bg-violet-50 w-full"
              data-ocid="case_detail.upload_button"
            >
              <Upload className="h-3 w-3 text-violet-400" />
              Upload Case Related Photo (product, serial, invoice, etc.)
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={async (e) => {
                  const files = Array.from(e.target.files || []);
                  const newImgs: Array<{
                    id: string;
                    url: string;
                    name: string;
                  }> = [];
                  for (const file of files) {
                    const url = await fileToDataUrl(file);
                    newImgs.push({
                      id: Math.random().toString(36).slice(2),
                      url,
                      name: file.name,
                    });
                  }
                  updateCase(caseData.id, {
                    caseRelatedImages: [
                      ...(caseData.caseRelatedImages ?? []),
                      ...newImgs,
                    ] as any,
                  });
                  e.target.value = "";
                  toast.success("Case related photo(s) uploaded");
                }}
              />
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Audit Timeline */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Activity Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {caseAudit.map((entry, i) => (
              <div key={entry.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500 mt-1 flex-shrink-0" />
                  {i < caseAudit.length - 1 && (
                    <div className="w-0.5 bg-gray-200 flex-1 mt-1" />
                  )}
                </div>
                <div className="flex-1 pb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-gray-900">
                      {entry.action}
                    </p>
                    <span className="text-xs text-gray-400">
                      {new Date(entry.timestamp).toLocaleString("en-IN")}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5">
                    {entry.details}
                  </p>
                  <p className="text-xs text-gray-400">by {entry.userName}</p>
                </div>
              </div>
            ))}
            {caseAudit.length === 0 && (
              <p className="text-sm text-gray-400">No activity yet</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Part Request Duplicate Warning Modal */}
      {showPartRequestDuplicateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full mx-4 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <h3 className="font-bold text-gray-900">
                  Part Request Already Sent
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  A pending part request for these part codes already exists for
                  this case. Do you want to send another request?
                </p>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPartRequestDuplicateModal(false)}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                  setShowPartRequestDuplicateModal(false);
                  const validParts =
                    caseData.parts && caseData.parts.length > 0
                      ? caseData.parts
                      : partEntries.filter(
                          (e) => e.partCode.trim() && e.partName.trim(),
                        );
                  if (validParts.length === 0) return;
                  addPartRequest({
                    caseId: caseData.caseId,
                    caseDbId: caseData.id,
                    customerName: caseData.customerName,
                    partName: validParts[0]?.partName ?? "",
                    partCode: (validParts[0] as any)?.partCode ?? "",
                    partPhotoUrl:
                      (validParts[0] as any)?.partPhotoUrl ??
                      caseData.partPhotoUrl,
                    requestedBy: currentUser?.id ?? "",
                    requestedByName: currentUser?.name ?? "",
                    productType:
                      (caseData as any).product ||
                      (caseData as any).productType ||
                      "",
                    companyName:
                      (caseData as any).companyName ||
                      (caseData as any).company ||
                      "",
                    priority: partPriority || "normal",
                    parts: validParts.map((p: any) => ({
                      id: Math.random().toString(36).slice(2),
                      partCode: p.partCode,
                      partName: p.partName,
                      partPhotoUrl: p.partPhotoUrl ?? "",
                      status: "pending" as const,
                    })),
                  } as any);
                  toast.success("Part request sent again");
                }}
              >
                Yes, Send Again
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Part Received Selection Modal */}
      {showPartReceivedModal && caseData.parts && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4 space-y-4">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <Package className="h-5 w-5 text-teal-600" /> Mark Parts as
              Received
            </h3>
            <p className="text-sm text-gray-600">
              Select which parts have been received:
            </p>
            <div className="space-y-2">
              {caseData.parts
                .filter(
                  (p) =>
                    (p.status as string) === "ordered" ||
                    (p.status as string) === "pending",
                )
                .map((p) => (
                  <label
                    key={p.id}
                    className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="rounded"
                      checked={selectedReceivedPartIds.has(p.id)}
                      onChange={(e) => {
                        setSelectedReceivedPartIds((prev) => {
                          const next = new Set(prev);
                          if (e.target.checked) next.add(p.id);
                          else next.delete(p.id);
                          return next;
                        });
                      }}
                    />
                    <div>
                      <span className="font-mono text-sm font-semibold">
                        {p.partCode}
                      </span>
                      {p.partName && (
                        <span className="text-sm text-gray-500 ml-2">
                          — {p.partName}
                        </span>
                      )}
                    </div>
                  </label>
                ))}
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowPartReceivedModal(false);
                  setSelectedReceivedPartIds(new Set());
                }}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                className="bg-teal-600 hover:bg-teal-700"
                disabled={selectedReceivedPartIds.size === 0}
                onClick={handlePartReceivedSubmit}
              >
                Confirm Received ({selectedReceivedPartIds.size})
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
