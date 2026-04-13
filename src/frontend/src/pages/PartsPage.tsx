import {
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  Package,
  RefreshCw,
  ShoppingCart,
  Tag,
} from "lucide-react";
import { useState } from "react";
import StatusBadge from "../components/StatusBadge";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { getAgeing, useStore } from "../store";
import type { Case } from "../types";

type PartTab = "part_required" | "part_ordered" | "part_received";

const CLOSED_STATUSES = [
  "closed",
  "cancelled",
  "transferred",
  "adjustment_closed",
  "replacement_done",
  "gas_charge_done",
];

// A "flat row" represents a single part within a case
interface PartRow {
  caseDbId: string; // internal case id
  caseDisplayId: string; // human-readable caseId
  customerName: string;
  product: string;
  technicianName: string;
  partDbId: string; // part entry id within case.parts[]
  partCode: string;
  partName: string;
  partPhotoUrl: string;
  partStatus: string;
  poNumber?: string;
  updatedAt: string;
  caseCreatedAt: string;
}

function buildPartRows(
  cases: Case[],
  techniciansMap: Map<string, string>,
  tab: PartTab,
): PartRow[] {
  const rows: PartRow[] = [];
  for (const c of cases) {
    if (CLOSED_STATUSES.includes(c.status)) continue;
    if (!c.parts || c.parts.length === 0) {
      // Legacy: case has no parts[] but has partCode — use case-level status
      if (
        tab === "part_required" &&
        c.status === "part_required" &&
        c.partCode
      ) {
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
          caseCreatedAt: c.createdAt,
        });
      } else if (
        tab === "part_ordered" &&
        c.status === "part_ordered" &&
        c.partCode
      ) {
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
          caseCreatedAt: c.createdAt,
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
          caseCreatedAt: c.createdAt,
        });
      }
      continue;
    }
    // Multi-part case: show parts per their individual status
    for (const p of c.parts) {
      const pStatus = p.status as string;
      const tabMatch =
        (tab === "part_required" &&
          (pStatus === "pending" || pStatus === "required")) ||
        (tab === "part_ordered" &&
          (pStatus === "ordered" || pStatus === "part_ordered")) ||
        (tab === "part_received" &&
          (pStatus === "received" || pStatus === "part_received"));
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
        caseCreatedAt: c.createdAt,
      });
    }
  }
  return rows.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}

export default function PartsPage() {
  const {
    cases,
    technicians,
    navigate,
    updateCase,
    addAuditEntry,
    currentUser,
  } = useStore();

  const [tab, setTab] = useState<PartTab>("part_required");
  const [poDialog, setPoDialog] = useState<{
    caseDbId: string;
    partDbId: string;
  } | null>(null);
  const [poNumber, setPoNumber] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const techMap = new Map(technicians.map((t) => [t.id, t.name]));

  const rows = buildPartRows(cases, techMap, tab);

  // Count for tab badges — count distinct part rows per tab
  const countForTab = (t: PartTab) => buildPartRows(cases, techMap, t).length;

  // Update a single part's status within a case
  const updatePartStatus = (
    caseDbId: string,
    partDbId: string,
    newStatus: string,
    extraCaseUpdates?: Partial<Case>,
  ) => {
    const c = cases.find((x) => x.id === caseDbId);
    if (!c) return;
    setActionLoading(`${caseDbId}-${partDbId}`);

    if (partDbId === "__legacy__") {
      // Legacy: update case-level status
      const caseStatus =
        newStatus === "ordered"
          ? "part_ordered"
          : newStatus === "received"
            ? "part_received"
            : newStatus === "pending"
              ? "part_required"
              : "re_open";
      updateCase(caseDbId, {
        status: caseStatus as Case["status"],
        updatedAt: new Date().toISOString(),
        ...(extraCaseUpdates ?? {}),
      });
      addAuditEntry({
        caseId: caseDbId,
        userId: currentUser?.id ?? "",
        userName: currentUser?.name ?? "",
        action: "Parts Tracking",
        details: `Part ${c.partCode} marked as ${newStatus} via Parts Tracking`,
      });
      setTimeout(() => setActionLoading(null), 800);
      return;
    }

    // Multi-part: update the specific part entry
    const updatedParts = (c.parts ?? []).map((p) =>
      p.id === partDbId
        ? {
            ...p,
            status: newStatus as
              | "pending"
              | "ordered"
              | "received"
              | "issued"
              | "rejected",
          }
        : p,
    );

    // Derive overall case status from updated parts
    const statuses = updatedParts.map((p) => p.status as string);
    let derivedCaseStatus: Case["status"] = c.status;

    if (newStatus === "ordered" || newStatus === "part_ordered") {
      // If all parts are now ordered or received, case → part_ordered
      const allOrderedOrReceived = statuses.every((s) =>
        [
          "ordered",
          "part_ordered",
          "received",
          "part_received",
          "issued",
        ].includes(s),
      );
      if (allOrderedOrReceived) derivedCaseStatus = "part_ordered";
    } else if (newStatus === "received" || newStatus === "part_received") {
      // If all parts are received/issued, case → part_received; else keep part_ordered
      const allReceivedOrIssued = statuses.every((s) =>
        ["received", "part_received", "issued"].includes(s),
      );
      derivedCaseStatus = allReceivedOrIssued
        ? "part_received"
        : "part_ordered";
    } else if (newStatus === "available" || newStatus === "part_available") {
      const allAvailable = statuses.every((s) =>
        ["available", "part_available"].includes(s),
      );
      if (allAvailable) derivedCaseStatus = "part_available";
    } else if (newStatus === "pending") {
      derivedCaseStatus = "part_required";
    }

    updateCase(caseDbId, {
      parts: updatedParts,
      status: derivedCaseStatus,
      updatedAt: new Date().toISOString(),
      ...(extraCaseUpdates ?? {}),
    });
    addAuditEntry({
      caseId: caseDbId,
      userId: currentUser?.id ?? "",
      userName: currentUser?.name ?? "",
      action: "Parts Tracking",
      details: `Part ${updatedParts.find((p) => p.id === partDbId)?.partCode ?? partDbId} marked as ${newStatus} via Parts Tracking`,
    });
    setTimeout(() => setActionLoading(null), 800);
  };

  const markAvailable = (row: PartRow) => {
    updatePartStatus(row.caseDbId, row.partDbId, "available");
  };

  const markOrdered = (row: PartRow, po?: string, od?: string) => {
    const extras: Partial<Case> = {};
    if (po) {
      extras.poNumber = po;
    }
    if (od) extras.orderDate = od;
    updatePartStatus(row.caseDbId, row.partDbId, "ordered", extras);
  };

  const markReceived = (row: PartRow) => {
    updatePartStatus(row.caseDbId, row.partDbId, "received");
  };

  const markReopen = (row: PartRow) => {
    updatePartStatus(row.caseDbId, row.partDbId, "pending");
  };

  const savePO = (row: PartRow) => {
    markOrdered(row, poNumber, orderDate);
    setPoDialog(null);
    setPoNumber("");
    setOrderDate("");
  };

  const tabs: {
    key: PartTab;
    label: string;
    color: string;
    count: number;
    icon: React.ElementType;
  }[] = [
    {
      key: "part_required",
      label: "Part Required",
      color: "bg-red-600",
      count: countForTab("part_required"),
      icon: AlertTriangle,
    },
    {
      key: "part_ordered",
      label: "Part Ordered",
      color: "bg-blue-600",
      count: countForTab("part_ordered"),
      icon: ShoppingCart,
    },
    {
      key: "part_received",
      label: "Part Received",
      color: "bg-green-600",
      count: countForTab("part_received"),
      icon: CheckCircle,
    },
  ];

  const poDialogRow = poDialog
    ? (rows.find(
        (r) =>
          r.caseDbId === poDialog.caseDbId && r.partDbId === poDialog.partDbId,
      ) ?? null)
    : null;

  return (
    <div className="space-y-5">
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-white/20 rounded-xl">
            <Package className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Parts Tracking</h1>
            <p className="text-orange-200 text-sm">
              Track individual part requirements and delivery status
            </p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          {
            label: "Part Required",
            value: countForTab("part_required"),
            color: "text-red-600",
            bg: "bg-red-50 border-red-100",
          },
          {
            label: "Part Ordered",
            value: countForTab("part_ordered"),
            color: "text-blue-600",
            bg: "bg-blue-50 border-blue-100",
          },
          {
            label: "Part Received",
            value: countForTab("part_received"),
            color: "text-green-600",
            bg: "bg-green-50 border-green-100",
          },
        ].map((s) => (
          <div
            key={s.label}
            className={`${s.bg} rounded-xl p-3 sm:p-4 border shadow-sm`}
          >
            <p className="text-xs text-gray-500">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`px-3 sm:px-4 py-2 text-sm rounded-lg font-medium transition-colors flex items-center gap-2 ${
              tab === t.key
                ? `${t.color} text-white shadow-sm`
                : "bg-white text-gray-600 border hover:bg-gray-50"
            }`}
            data-ocid="parts.tab"
          >
            <t.icon className="h-3.5 w-3.5" />
            {t.label}
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${tab === t.key ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}
            >
              {t.count}
            </span>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">
                  Case ID
                </th>
                <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">
                  Customer
                </th>
                <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap hidden sm:table-cell">
                  Product
                </th>
                <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">
                  Part Code
                </th>
                <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">
                  Part Name
                </th>
                {tab === "part_ordered" && (
                  <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap hidden md:table-cell">
                    PO Number
                  </th>
                )}
                <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap hidden lg:table-cell">
                  Technician
                </th>
                <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap hidden sm:table-cell">
                  Age
                </th>
                <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">
                  Status
                </th>
                <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr>
                  <td
                    colSpan={tab === "part_ordered" ? 10 : 9}
                    className="py-10 text-center text-gray-400 text-sm"
                    data-ocid="parts.empty_state"
                  >
                    No parts in this stage
                  </td>
                </tr>
              )}
              {rows.map((row) => {
                const age = getAgeing(row.caseCreatedAt);
                const isLoading =
                  actionLoading === `${row.caseDbId}-${row.partDbId}`;
                return (
                  <tr
                    key={`${row.caseDbId}-${row.partDbId}`}
                    className="border-b last:border-0 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-3 py-3 font-medium text-blue-700 whitespace-nowrap">
                      <button
                        type="button"
                        className="hover:underline text-left"
                        onClick={() => navigate("case-detail", row.caseDbId)}
                        data-ocid="parts.case_link"
                      >
                        {row.caseDisplayId}
                      </button>
                    </td>
                    <td className="px-3 py-3 text-gray-700 whitespace-nowrap">
                      <div>
                        <p className="font-medium">{row.customerName}</p>
                        <p className="text-xs text-gray-400 sm:hidden">
                          {row.product}
                        </p>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-gray-600 text-xs hidden sm:table-cell whitespace-nowrap">
                      {row.product}
                    </td>
                    <td className="px-3 py-3 text-gray-600 font-mono text-xs whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Tag className="h-3 w-3 text-gray-400 shrink-0" />
                        {row.partCode || "—"}
                      </div>
                    </td>
                    <td className="px-3 py-3 font-medium text-orange-700 whitespace-nowrap text-xs">
                      {row.partName || "—"}
                    </td>
                    {tab === "part_ordered" && (
                      <td className="px-3 py-3 hidden md:table-cell text-xs whitespace-nowrap">
                        {row.poNumber ? (
                          <span className="text-gray-700">{row.poNumber}</span>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              setPoDialog({
                                caseDbId: row.caseDbId,
                                partDbId: row.partDbId,
                              })
                            }
                            className="text-xs text-blue-600 hover:underline"
                            data-ocid="parts.po_button"
                          >
                            Enter PO
                          </button>
                        )}
                      </td>
                    )}
                    <td className="px-3 py-3 text-gray-600 text-xs hidden lg:table-cell whitespace-nowrap">
                      {row.technicianName}
                    </td>
                    <td
                      className={`px-3 py-3 font-medium text-xs hidden sm:table-cell whitespace-nowrap ${age >= 8 ? "text-red-600" : "text-gray-600"}`}
                    >
                      {age}d
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <StatusBadge
                        status={
                          row.partStatus === "pending" ||
                          row.partStatus === "required"
                            ? "part_required"
                            : row.partStatus === "ordered" ||
                                row.partStatus === "part_ordered"
                              ? "part_ordered"
                              : row.partStatus === "received" ||
                                  row.partStatus === "part_received"
                                ? "part_received"
                                : row.partStatus === "available" ||
                                    row.partStatus === "part_available"
                                  ? "part_available"
                                  : "part_required"
                        }
                      />
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      {isLoading ? (
                        <RefreshCw className="h-4 w-4 animate-spin text-gray-400" />
                      ) : (
                        <div className="flex items-center gap-1">
                          {tab === "part_required" && (
                            <div className="relative group">
                              <button
                                type="button"
                                className="flex items-center gap-1 text-xs bg-white border border-gray-200 rounded-md px-2 py-1.5 hover:bg-gray-50 transition-colors font-medium text-gray-700 shadow-sm"
                                data-ocid="parts.action_button"
                                onClick={(e) => {
                                  const menu = e.currentTarget
                                    .nextElementSibling as HTMLElement | null;
                                  if (menu) menu.classList.toggle("hidden");
                                }}
                              >
                                Action
                                <ChevronDown className="h-3 w-3" />
                              </button>
                              <div className="hidden absolute z-20 left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[130px] py-1">
                                <button
                                  type="button"
                                  className="w-full text-left px-3 py-2 text-xs text-emerald-700 hover:bg-emerald-50 transition-colors font-medium"
                                  onClick={(e) => {
                                    (
                                      e.currentTarget
                                        .closest(".relative")
                                        ?.querySelector(
                                          ".hidden",
                                        ) as HTMLElement
                                    )?.classList.add("hidden");
                                    markAvailable(row);
                                  }}
                                  data-ocid="parts.available_button"
                                >
                                  ✓ Available
                                </button>
                                <button
                                  type="button"
                                  className="w-full text-left px-3 py-2 text-xs text-blue-700 hover:bg-blue-50 transition-colors font-medium"
                                  onClick={(e) => {
                                    (
                                      e.currentTarget
                                        .closest(".relative")
                                        ?.querySelector(
                                          ".hidden",
                                        ) as HTMLElement
                                    )?.classList.add("hidden");
                                    setPoDialog({
                                      caseDbId: row.caseDbId,
                                      partDbId: row.partDbId,
                                    });
                                  }}
                                  data-ocid="parts.order_button"
                                >
                                  📦 Part Ordered
                                </button>
                              </div>
                            </div>
                          )}
                          {tab === "part_ordered" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs h-7 px-2 border-green-300 text-green-700 hover:bg-green-50"
                              onClick={() => markReceived(row)}
                              data-ocid="parts.received_button"
                            >
                              Mark Received
                            </Button>
                          )}
                          {tab === "part_received" && (
                            <Button
                              size="sm"
                              className="text-xs h-7 px-2 bg-green-600 hover:bg-green-700"
                              onClick={() => markReopen(row)}
                              data-ocid="parts.reopen_button"
                            >
                              Reopen
                            </Button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* PO Dialog */}
      <Dialog
        open={!!poDialog}
        onOpenChange={() => {
          setPoDialog(null);
          setPoNumber("");
          setOrderDate("");
        }}
      >
        <DialogContent className="mx-4 sm:mx-auto">
          <DialogHeader>
            <DialogTitle>Enter PO Details</DialogTitle>
          </DialogHeader>
          {poDialogRow && (
            <p className="text-xs text-gray-500 -mt-2 mb-1">
              Part:{" "}
              <span className="font-medium text-gray-700">
                {poDialogRow.partCode}
              </span>{" "}
              — {poDialogRow.partName}
            </p>
          )}
          <div className="space-y-3 py-2">
            <div className="space-y-1">
              <Label className="text-xs">PO Number (optional)</Label>
              <Input
                placeholder="e.g. PO-2024-001"
                value={poNumber}
                onChange={(e) => setPoNumber(e.target.value)}
                data-ocid="parts.po_input"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Order Date (optional)</Label>
              <Input
                type="date"
                value={orderDate}
                onChange={(e) => setOrderDate(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => poDialogRow && savePO(poDialogRow)}
                className="flex-1"
                data-ocid="parts.save_button"
              >
                Mark as Ordered
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setPoDialog(null);
                  setPoNumber("");
                  setOrderDate("");
                }}
                data-ocid="parts.cancel_button"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
