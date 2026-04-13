import {
  ArrowLeftRight,
  ArrowRight,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Filter,
  Folder,
  FolderOpen,
  Layers,
  Lightbulb,
  MapPin,
  Package,
  PackageOpen,
  Search,
  Tag,
  User,
  Wrench,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { useStore } from "../store";
import type { PartInventoryItem } from "../types";

// ── Helpers ────────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<string, string> = {
  in_stock: "bg-green-100 text-green-700 border-green-200",
  issued: "bg-amber-100 text-amber-700 border-amber-200",
  installed: "bg-blue-100 text-blue-700 border-blue-200",
  returned_to_company: "bg-red-100 text-red-700 border-red-200",
  returned_to_store: "bg-slate-100 text-slate-600 border-slate-200",
};

const STATUS_LABELS: Record<string, string> = {
  in_stock: "In Stock",
  issued: "Issued",
  installed: "Installed",
  returned_to_company: "Returned to Co.",
  returned_to_store: "Returned to Store",
};

function useLocationHelpers() {
  const { racks, shelves, bins } = useStore();
  const getRack = (id: string) => racks.find((r) => r.id === id)?.name ?? "";
  const getShelf = (id: string) => shelves.find((s) => s.id === id)?.name ?? "";
  const getBin = (id: string) => bins.find((b) => b.id === id)?.name ?? "";
  const locationStr = (p: PartInventoryItem) => {
    if (!p.rackId) return "Location Pending";
    return [getRack(p.rackId), getShelf(p.shelfId), getBin(p.binId)]
      .filter(Boolean)
      .join(" > ");
  };
  return { getRack, getShelf, getBin, locationStr };
}

// ── Part Code Units Popup ──────────────────────────────────────────────────

type PartCodePopupState = {
  partCode: string;
  partName: string;
  companyName: string;
  units: PartInventoryItem[];
} | null;

interface PartCodePopupProps {
  popup: PartCodePopupState;
  onClose: () => void;
  onNavigate: (id: string) => void;
}

function PartCodePopup({ popup, onClose, onNavigate }: PartCodePopupProps) {
  const { racks, shelves, bins, technicians } = useStore();
  const [unitSearch, setUnitSearch] = useState("");

  if (!popup) return null;

  const getRack = (id: string) => racks.find((r) => r.id === id)?.name ?? "";
  const getShelf = (id: string) => shelves.find((s) => s.id === id)?.name ?? "";
  const getBin = (id: string) => bins.find((b) => b.id === id)?.name ?? "";
  const getTech = (id: string) =>
    technicians.find((t) => t.id === id)?.name ?? id;

  const locationStr = (p: PartInventoryItem) => {
    if (!p.rackId) return null;
    return [getRack(p.rackId), getShelf(p.shelfId), getBin(p.binId)]
      .filter(Boolean)
      .join(" › ");
  };

  const q = unitSearch.trim().toLowerCase();
  const filteredUnits = popup.units.filter((u) => {
    if (!q) return true;
    const loc = locationStr(u) ?? "";
    const tech = u.technicianId ? getTech(u.technicianId) : "";
    return (
      u.partCode.toLowerCase().includes(q) ||
      loc.toLowerCase().includes(q) ||
      tech.toLowerCase().includes(q) ||
      (u.caseId ?? "").toLowerCase().includes(q) ||
      u.status.toLowerCase().includes(q)
    );
  });

  const inStock = popup.units.filter((u) => u.status === "in_stock").length;
  const issued = popup.units.filter((u) => u.status === "issued").length;
  const installed = popup.units.filter((u) => u.status === "installed").length;
  const total = popup.units.length;

  const groupedUnits: Record<string, PartInventoryItem[]> = {
    in_stock: filteredUnits.filter((u) => u.status === "in_stock"),
    issued: filteredUnits.filter((u) => u.status === "issued"),
    installed: filteredUnits.filter((u) => u.status === "installed"),
    returned_to_store: filteredUnits.filter(
      (u) => u.status === "returned_to_store",
    ),
    returned_to_company: filteredUnits.filter(
      (u) => u.status === "returned_to_company",
    ),
  };

  const STATUS_CONFIG: Record<
    string,
    {
      label: string;
      headerCls: string;
      badgeCls: string;
      dotCls: string;
      icon: React.ElementType;
    }
  > = {
    in_stock: {
      label: "In Stock",
      headerCls: "bg-emerald-50 border-emerald-100 text-emerald-700",
      badgeCls: "bg-emerald-100 text-emerald-700",
      dotCls: "bg-emerald-400",
      icon: CheckCircle2,
    },
    issued: {
      label: "With Technician",
      headerCls: "bg-amber-50 border-amber-100 text-amber-700",
      badgeCls: "bg-amber-100 text-amber-700",
      dotCls: "bg-amber-400",
      icon: User,
    },
    installed: {
      label: "Installed",
      headerCls: "bg-purple-50 border-purple-100 text-purple-700",
      badgeCls: "bg-purple-100 text-purple-700",
      dotCls: "bg-purple-400",
      icon: Wrench,
    },
    returned_to_store: {
      label: "Returned to Store",
      headerCls: "bg-sky-50 border-sky-100 text-sky-700",
      badgeCls: "bg-sky-100 text-sky-700",
      dotCls: "bg-sky-400",
      icon: ArrowRight,
    },
    returned_to_company: {
      label: "Returned to Company",
      headerCls: "bg-rose-50 border-rose-100 text-rose-700",
      badgeCls: "bg-rose-100 text-rose-700",
      dotCls: "bg-rose-400",
      icon: ArrowRight,
    },
  };

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: modal backdrop
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: stop propagation */}
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-[560px] max-h-[82vh] overflow-hidden flex flex-col animate-in zoom-in-95 fade-in duration-150"
        onClick={(e) => e.stopPropagation()}
        data-ocid="inventory.part-code-popup"
      >
        {/* Clean header — light background, not dark gradient */}
        <div className="bg-white border-b border-gray-100 px-5 py-4 flex items-start justify-between shrink-0">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-base font-semibold text-gray-900 tracking-tight">
                {popup.partCode}
              </span>
              {popup.companyName && (
                <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-medium border border-indigo-100">
                  {popup.companyName}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-0.5 font-normal">
              {popup.partName}
            </p>
            {/* Summary pills */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">
                {total} total
              </span>
              {inStock > 0 && (
                <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">
                  {inStock} in stock
                </span>
              )}
              {issued > 0 && (
                <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
                  {issued} issued
                </span>
              )}
              {installed > 0 && (
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">
                  {installed} installed
                </span>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600 ml-3"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Search bar */}
        <div className="px-4 py-2.5 border-b border-gray-100 bg-gray-50 shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            <input
              type="text"
              className="w-full pl-8 pr-8 py-1.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-300 placeholder:text-gray-400"
              placeholder="Filter by part code, location, technician..."
              value={unitSearch}
              onChange={(e) => setUnitSearch(e.target.value)}
            />
            {unitSearch && (
              <button
                type="button"
                onClick={() => setUnitSearch("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Units list — grouped by status */}
        <div className="overflow-y-auto flex-1">
          {filteredUnits.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <Package className="h-10 w-10 mb-2 opacity-20" />
              <p className="text-sm font-normal">
                {unitSearch
                  ? "No units match your filter"
                  : "No units found for this part code"}
              </p>
              {unitSearch && (
                <button
                  type="button"
                  onClick={() => setUnitSearch("")}
                  className="text-xs text-indigo-600 mt-2 hover:underline"
                >
                  Clear filter
                </button>
              )}
            </div>
          ) : (
            <div>
              {Object.entries(groupedUnits).map(([status, units]) => {
                if (units.length === 0) return null;
                const cfg = STATUS_CONFIG[status];
                let unitIndex = 0;
                for (const [s, arr] of Object.entries(groupedUnits)) {
                  if (s === status) break;
                  unitIndex += arr.length;
                }

                return (
                  <div key={status}>
                    {/* Section header — lighter */}
                    <div
                      className={`flex items-center gap-2 px-4 py-1.5 border-b border-t first:border-t-0 ${cfg.headerCls} sticky top-0 z-10`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${cfg.dotCls} shrink-0`}
                      />
                      <span className="text-xs font-medium">{cfg.label}</span>
                      <span className="ml-auto text-xs text-gray-400 font-normal">
                        {units.length} unit{units.length !== 1 ? "s" : ""}
                      </span>
                    </div>

                    {/* Unit rows — clean table-like layout */}
                    {units.map((unit, idx) => {
                      const loc = locationStr(unit);
                      const techName = unit.technicianId
                        ? getTech(unit.technicianId)
                        : null;
                      const issueDate = unit.issueDate
                        ? new Date(unit.issueDate).toLocaleString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : null;
                      const globalIdx = unitIndex + idx + 1;

                      return (
                        <div
                          key={unit.id}
                          className="flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 transition-colors gap-3 border-b border-gray-50 last:border-b-0"
                          data-ocid={`inventory.popup.unit.${globalIdx}`}
                        >
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            {/* Serial number */}
                            <span className="shrink-0 w-6 h-6 rounded-full bg-gray-100 text-gray-500 text-xs flex items-center justify-center font-normal">
                              {globalIdx}
                            </span>
                            <div className="min-w-0 space-y-0.5 flex-1">
                              {/* Part code — prominently shown per unit */}
                              <div className="flex items-center gap-1.5">
                                <Tag className="h-3 w-3 text-indigo-400 shrink-0" />
                                <span className="font-mono text-xs font-medium text-gray-800 truncate">
                                  {unit.partCode}
                                </span>
                              </div>
                              {/* Location row */}
                              {loc ? (
                                <div className="flex items-center gap-1 text-xs text-gray-500 font-normal">
                                  <MapPin className="h-3 w-3 text-emerald-400 shrink-0" />
                                  <span className="truncate">{loc}</span>
                                </div>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-xs text-amber-600 font-normal">
                                  <MapPin className="h-2.5 w-2.5" />
                                  Pending Location
                                </span>
                              )}
                              {/* Meta row */}
                              <div className="flex flex-wrap items-center gap-2">
                                {techName && (
                                  <span className="flex items-center gap-1 text-xs text-gray-400 font-normal">
                                    <User className="h-2.5 w-2.5" />
                                    {techName}
                                  </span>
                                )}
                                {unit.caseId && (
                                  <span className="flex items-center gap-1 text-xs text-gray-400 font-normal font-mono">
                                    <Tag className="h-2.5 w-2.5 text-indigo-300" />
                                    {unit.caseId}
                                  </span>
                                )}
                                {issueDate && (
                                  <span className="flex items-center gap-1 text-xs text-gray-400 font-normal">
                                    <Calendar className="h-2.5 w-2.5 text-sky-400" />
                                    {issueDate}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Right side: status badge + button */}
                          <div className="flex flex-col items-end gap-1.5 shrink-0">
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full font-normal ${cfg.badgeCls}`}
                            >
                              {cfg.label}
                            </span>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-6 text-xs border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-indigo-700 hover:border-indigo-200 gap-1 font-normal"
                              onClick={() => {
                                onClose();
                                onNavigate(unit.id);
                              }}
                              data-ocid={`inventory.popup.view-details.${globalIdx}`}
                            >
                              Details
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Tab 1: Spare Parts ──────────────────────────────────────────────────────

function SparePartsTab() {
  const {
    partItems,
    stockCompanies,
    stockCategories,
    stockPartNames,
    navigate,
  } = useStore();

  const [search, setSearch] = useState("");
  const [expandedCompanies, setExpandedCompanies] = useState<Set<string>>(
    new Set(),
  );
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(),
  );
  const [expandedPartNames, setExpandedPartNames] = useState<Set<string>>(
    new Set(),
  );
  // Popup for part code units
  const [partCodePopup, setPartCodePopup] = useState<PartCodePopupState>(null);

  const q = search.trim().toLowerCase();

  // Build tree: Company → Category → PartName → PartCode groups (all statuses)
  type PartCodeGroup = { partCode: string; units: PartInventoryItem[] };
  type PartNameGroup = {
    partNameId: string;
    partCodes: PartCodeGroup[];
    totalUnits: number;
  };
  type CategoryGroup = {
    categoryId: string;
    partNames: PartNameGroup[];
    totalUnits: number;
  };
  type CompanyGroup = {
    companyId: string;
    categories: CategoryGroup[];
    totalUnits: number;
  };

  const tree = useMemo((): CompanyGroup[] => {
    // Map: companyId → categoryId → partNameId → partCode → items[]
    type Level4 = Map<string, PartInventoryItem[]>;
    type Level3 = Map<string, Level4>;
    type Level2 = Map<string, Level3>;
    type Level1 = Map<string, Level2>;

    const root: Level1 = new Map();

    for (const item of partItems) {
      if (!root.has(item.companyId)) root.set(item.companyId, new Map());
      const l2 = root.get(item.companyId)!;
      if (!l2.has(item.categoryId)) l2.set(item.categoryId, new Map());
      const l3 = l2.get(item.categoryId)!;
      if (!l3.has(item.partNameId)) l3.set(item.partNameId, new Map());
      const l4 = l3.get(item.partNameId)!;
      if (!l4.has(item.partCode)) l4.set(item.partCode, []);
      l4.get(item.partCode)!.push(item);
    }

    const result: CompanyGroup[] = [];
    for (const [companyId, l2] of root) {
      const companyName =
        stockCompanies.find((c) => c.id === companyId)?.name ?? "";
      const categories: CategoryGroup[] = [];

      for (const [categoryId, l3] of l2) {
        const catName =
          stockCategories.find((c) => c.id === categoryId)?.name ?? "";
        const partNames: PartNameGroup[] = [];

        for (const [partNameId, l4] of l3) {
          const pnName =
            stockPartNames.find((p) => p.id === partNameId)?.name ?? "";
          const partCodes: PartCodeGroup[] = [];

          for (const [partCode, units] of l4) {
            // Filter by search
            if (q) {
              const matches =
                companyName.toLowerCase().includes(q) ||
                catName.toLowerCase().includes(q) ||
                pnName.toLowerCase().includes(q) ||
                partCode.toLowerCase().includes(q);
              if (!matches) continue;
            }
            partCodes.push({ partCode, units });
          }

          if (partCodes.length > 0) {
            const totalUnits = partCodes.reduce(
              (s, pc) => s + pc.units.length,
              0,
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

  const toggle = (
    _set: Set<string>,
    id: string,
    setter: React.Dispatch<React.SetStateAction<Set<string>>>,
  ) =>
    setter((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          className="pl-9"
          placeholder="Search by company, category, part name or part code..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          data-ocid="inventory.search_input"
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Tree */}
      <Card className="shadow-sm overflow-hidden">
        <CardContent className="p-0">
          {tree.length === 0 ? (
            <div
              className="text-center py-12 text-slate-400 text-sm"
              data-ocid="inventory.empty_state"
            >
              {q ? "No matching parts found." : "No parts in inventory yet."}
            </div>
          ) : (
            <div>
              {tree.map((company) => {
                const companyName =
                  stockCompanies.find((c) => c.id === company.companyId)
                    ?.name ?? company.companyId;
                const isCompanyOpen =
                  expandedCompanies.has(company.companyId) || !!q;
                return (
                  <div
                    key={company.companyId}
                    className="border-b border-slate-100 last:border-0"
                  >
                    {/* Company row */}
                    <button
                      type="button"
                      className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors text-left"
                      onClick={() =>
                        toggle(
                          expandedCompanies,
                          company.companyId,
                          setExpandedCompanies,
                        )
                      }
                      data-ocid="inventory.toggle"
                    >
                      <div className="flex items-center gap-2.5">
                        {isCompanyOpen ? (
                          <FolderOpen className="h-4 w-4 text-blue-500" />
                        ) : (
                          <Folder className="h-4 w-4 text-slate-400" />
                        )}
                        <div className="p-1 bg-blue-100 rounded">
                          <Building2 className="h-3.5 w-3.5 text-blue-600" />
                        </div>
                        <span className="font-semibold text-blue-900">
                          {companyName}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-0.5 rounded-full font-medium">
                          {company.categories.length}{" "}
                          {company.categories.length === 1
                            ? "category"
                            : "categories"}
                        </span>
                        <span className="text-xs bg-slate-50 text-slate-600 border border-slate-200 px-2.5 py-0.5 rounded-full font-medium">
                          {company.totalUnits} units
                        </span>
                      </div>
                    </button>

                    {/* Categories */}
                    {isCompanyOpen && (
                      <div className="border-t border-slate-100">
                        {company.categories.map((cat) => {
                          const catName =
                            stockCategories.find((c) => c.id === cat.categoryId)
                              ?.name ?? cat.categoryId;
                          const isCatOpen =
                            expandedCategories.has(cat.categoryId) || !!q;
                          return (
                            <div key={cat.categoryId}>
                              <button
                                type="button"
                                className="w-full flex items-center justify-between pl-10 pr-4 py-2.5 hover:bg-slate-50 transition-colors text-left"
                                onClick={() =>
                                  toggle(
                                    expandedCategories,
                                    cat.categoryId,
                                    setExpandedCategories,
                                  )
                                }
                                data-ocid="inventory.toggle"
                              >
                                <div className="flex items-center gap-2">
                                  {isCatOpen ? (
                                    <FolderOpen className="h-3.5 w-3.5 text-emerald-500" />
                                  ) : (
                                    <Folder className="h-3.5 w-3.5 text-slate-400" />
                                  )}
                                  <div className="p-0.5 bg-emerald-100 rounded">
                                    <Layers className="h-3 w-3 text-emerald-600" />
                                  </div>
                                  <span className="text-sm font-semibold text-emerald-900">
                                    {catName}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded-full">
                                    {cat.partNames.length}{" "}
                                    {cat.partNames.length === 1
                                      ? "name"
                                      : "names"}
                                  </span>
                                  <span className="text-xs bg-slate-50 text-slate-600 border border-slate-200 px-2 py-0.5 rounded-full">
                                    {cat.totalUnits} units
                                  </span>
                                </div>
                              </button>

                              {/* Part Names */}
                              {isCatOpen && (
                                <div>
                                  {cat.partNames.map((pn) => {
                                    const pnName =
                                      stockPartNames.find(
                                        (p) => p.id === pn.partNameId,
                                      )?.name ?? pn.partNameId;
                                    const isPnOpen =
                                      expandedPartNames.has(pn.partNameId) ||
                                      !!q;
                                    return (
                                      <div key={pn.partNameId}>
                                        <button
                                          type="button"
                                          className="w-full flex items-center justify-between pl-16 pr-4 py-2 hover:bg-blue-50 transition-colors text-left group"
                                          onClick={() =>
                                            toggle(
                                              expandedPartNames,
                                              pn.partNameId,
                                              setExpandedPartNames,
                                            )
                                          }
                                          data-ocid="inventory.button"
                                        >
                                          <div className="flex items-center gap-2">
                                            {isPnOpen ? (
                                              <ChevronDown className="h-3.5 w-3.5 text-blue-400" />
                                            ) : (
                                              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                                            )}
                                            <Package className="h-3.5 w-3.5 text-blue-400" />
                                            <span className="text-sm text-blue-700 font-medium group-hover:underline">
                                              {pnName}
                                            </span>
                                          </div>
                                          <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                                            {pn.partCodes.length} code
                                            {pn.partCodes.length !== 1
                                              ? "s"
                                              : ""}
                                          </span>
                                        </button>

                                        {/* Part Code Groups */}
                                        {isPnOpen && (
                                          <div className="pl-20">
                                            {pn.partCodes.map((pcGroup) => {
                                              const inStockCount =
                                                pcGroup.units.filter(
                                                  (u) =>
                                                    u.status === "in_stock",
                                                ).length;
                                              return (
                                                <div
                                                  key={pcGroup.partCode}
                                                  className="border-l-2 border-slate-200 ml-1"
                                                >
                                                  {/* Part code row — click opens popup */}
                                                  <button
                                                    type="button"
                                                    className="w-full flex items-center justify-between pr-4 py-2 pl-3 hover:bg-blue-50 transition-colors text-left group"
                                                    onClick={() => {
                                                      const pnName =
                                                        stockPartNames.find(
                                                          (p) =>
                                                            p.id ===
                                                            pn.partNameId,
                                                        )?.name ?? "";
                                                      const coName =
                                                        stockCompanies.find(
                                                          (c) =>
                                                            c.id ===
                                                            pcGroup.units[0]
                                                              ?.companyId,
                                                        )?.name ?? "";
                                                      setPartCodePopup({
                                                        partCode:
                                                          pcGroup.partCode,
                                                        partName: pnName,
                                                        companyName: coName,
                                                        units: pcGroup.units,
                                                      });
                                                    }}
                                                    data-ocid="inventory.toggle"
                                                  >
                                                    <div className="flex items-center gap-2">
                                                      <Tag className="h-3 w-3 text-slate-400" />
                                                      <span className="font-mono text-xs font-semibold text-blue-700 group-hover:underline">
                                                        {pcGroup.partCode}
                                                      </span>
                                                      <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-1.5 py-0.5 rounded-full font-medium">
                                                        {pcGroup.units.length}{" "}
                                                        unit
                                                        {pcGroup.units
                                                          .length !== 1
                                                          ? "s"
                                                          : ""}
                                                        {inStockCount > 0 &&
                                                          inStockCount <
                                                            pcGroup.units
                                                              .length &&
                                                          ` · ${inStockCount} in stock`}
                                                      </span>
                                                    </div>
                                                    <ExternalLink className="h-3.5 w-3.5 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                  </button>
                                                </div>
                                              );
                                            })}
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Part Code Units Popup ── */}
      <PartCodePopup
        popup={partCodePopup}
        onClose={() => setPartCodePopup(null)}
        onNavigate={(id) => navigate("part-detail", undefined, id)}
      />
    </div>
  );
}

// ── Tab 2: Part Search ─────────────────────────────────────────────────────

function PartSearchTab() {
  const {
    partItems,
    stockCompanies,
    stockCategories,
    stockPartNames,
    purchaseEntries,
    vendors,
    navigate,
  } = useStore();
  const { locationStr } = useLocationHelpers();

  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const q = search.trim().toLowerCase();

  const results = useMemo(() => {
    if (!q) return [];
    return partItems
      .filter((p) => {
        const pnName =
          stockPartNames.find((pn) => pn.id === p.partNameId)?.name ?? "";
        return (
          p.partCode.toLowerCase().includes(q) ||
          pnName.toLowerCase().includes(q)
        );
      })
      .slice(0, 50);
  }, [partItems, stockPartNames, q]);

  const getInfo = (item: PartInventoryItem) => {
    const company =
      stockCompanies.find((c) => c.id === item.companyId)?.name ?? "";
    const category =
      stockCategories.find((c) => c.id === item.categoryId)?.name ?? "";
    const partName =
      stockPartNames.find((p) => p.id === item.partNameId)?.name ?? "";
    const purchase = purchaseEntries.find((p) => p.id === item.purchaseId);
    const vendorId = purchase?.vendorId;
    const vendor = vendorId
      ? vendors.find((v) => v.id === vendorId)?.name
      : (purchase?.vendorName ?? "—");
    return {
      company,
      category,
      partName,
      vendor: vendor ?? purchase?.vendorName ?? "—",
    };
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          className="pl-9 pr-9"
          placeholder="Search by part code or name..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setExpandedId(null);
          }}
          data-ocid="inventory.search_input"
        />
        {search && (
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setExpandedId(null);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            data-ocid="inventory.button"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {!q ? (
        <div className="text-center py-16 text-slate-400 text-sm">
          <Search className="h-8 w-8 mx-auto mb-3 opacity-30" />
          Search by part code or name...
        </div>
      ) : results.length === 0 ? (
        <div
          className="text-center py-16 text-slate-400 text-sm"
          data-ocid="inventory.empty_state"
        >
          No parts found for &ldquo;{search}&rdquo;.
        </div>
      ) : (
        <Card className="shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <ul className="divide-y divide-slate-100">
              {results.map((item, i) => {
                const info = getInfo(item);
                const isExpanded = expandedId === item.id;
                const date = new Date(item.createdAt).toLocaleDateString(
                  "en-IN",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  },
                );
                return (
                  <li key={item.id} data-ocid={`inventory.item.${i + 1}`}>
                    {/* Result row */}
                    <button
                      type="button"
                      className="w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors flex items-start justify-between gap-3"
                      onClick={() => setExpandedId(isExpanded ? null : item.id)}
                      data-ocid={`inventory.row.${i + 1}`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <Tag className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                          <span className="font-mono font-semibold text-slate-800 text-sm">
                            {item.partCode}
                          </span>
                          <span className="text-xs text-slate-400">{date}</span>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5 ml-5">
                          {info.company} &rsaquo; {info.category} &rsaquo;{" "}
                          {info.partName}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium border ${
                            STATUS_STYLES[item.status]
                          }`}
                        >
                          {STATUS_LABELS[item.status]}
                        </span>
                        <span className="text-xs text-slate-500">Qty: 1</span>
                      </div>
                    </button>

                    {/* Expanded inline card */}
                    {isExpanded && (
                      <div className="mx-4 mb-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <div>
                            <div className="font-mono font-bold text-slate-900">
                              {item.partCode}
                            </div>
                            <div className="text-xs text-slate-500 mt-0.5">
                              {info.company} &rsaquo; {info.category} &rsaquo;{" "}
                              {info.partName}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full font-medium border ${
                                STATUS_STYLES[item.status]
                              }`}
                            >
                              {STATUS_LABELS[item.status]}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedId(null);
                              }}
                              className="text-slate-400 hover:text-slate-600"
                              data-ocid="inventory.close_button"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm mb-3">
                          <div className="text-slate-500">Vendor</div>
                          <div className="text-slate-700 font-medium">
                            {info.vendor}
                          </div>
                          <div className="text-slate-500">Location</div>
                          <div className="text-slate-700">
                            {locationStr(item)}
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-blue-600 border-blue-300 hover:bg-blue-50"
                          onClick={() =>
                            navigate("part-detail", undefined, item.id)
                          }
                          data-ocid="inventory.button"
                        >
                          View Full Details →
                        </Button>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ── Tab 3: Part Relocation ─────────────────────────────────────────────────

interface RelocateModalProps {
  item: PartInventoryItem;
  onClose: () => void;
}

function RelocateModal({ item, onClose }: RelocateModalProps) {
  const {
    racks,
    shelves,
    bins,
    assignPartLocation,
    stockPartNames,
    partItems,
  } = useStore();
  const { locationStr } = useLocationHelpers();

  const [selectedRack, setSelectedRack] = useState(item.rackId ?? "");
  const [selectedShelf, setSelectedShelf] = useState(item.shelfId ?? "");
  const [selectedBin, setSelectedBin] = useState(item.binId ?? "");

  const filteredShelves = shelves.filter((s) => s.rackId === selectedRack);
  const filteredBins = bins.filter((b) => b.shelfId === selectedShelf);

  const partName =
    stockPartNames.find((p) => p.id === item.partNameId)?.name ?? "—";

  const sameCodeSuggestions = useMemo(() => {
    const seen = new Set<string>();
    const results: { rackName: string; shelfName: string; binName: string }[] =
      [];
    for (const p of partItems) {
      if (p.partCode === item.partCode && p.id !== item.id && p.rackId) {
        const rk = racks.find((r) => r.id === p.rackId);
        const sh = shelves.find((s) => s.id === p.shelfId);
        const bn = bins.find((b) => b.id === p.binId);
        const key = `${p.rackId}-${p.shelfId}-${p.binId}`;
        if (!seen.has(key)) {
          seen.add(key);
          results.push({
            rackName: rk?.name ?? "—",
            shelfName: sh?.name ?? "—",
            binName: bn?.name ?? "—",
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

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      data-ocid="inventory.modal"
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      role="presentation"
    >
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-blue-600" />
            <h2 className="font-semibold text-slate-900">Assign / Relocate</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
            data-ocid="inventory.close_button"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-5 py-4 space-y-4">
          {/* Part identity header */}
          <div className="bg-slate-50 rounded-lg px-4 py-3 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">
                Part Name
              </span>
              <span className="text-sm font-semibold text-slate-800">
                {partName}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">
                Part Code
              </span>
              <span className="font-mono text-sm font-bold text-blue-600">
                {item.partCode}
              </span>
            </div>
          </div>

          <div className="text-sm text-slate-500">
            Current location:{" "}
            <span className="font-medium text-slate-700">
              {locationStr(item)}
            </span>
          </div>

          {sameCodeSuggestions.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2.5 flex gap-2">
              <Lightbulb className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
              <div className="text-xs text-amber-800">
                <p className="font-semibold mb-1">
                  Same part code already located at:
                </p>
                {sameCodeSuggestions.map((s) => (
                  <p
                    key={`${s.rackName}-${s.shelfName}-${s.binName}`}
                    className="font-mono"
                  >
                    {s.rackName} › {s.shelfName} › {s.binName}
                  </p>
                ))}
              </div>
            </div>
          )}
          <div className="space-y-3">
            <div>
              <label
                htmlFor="relocate-rack"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Rack
              </label>
              <select
                id="relocate-rack"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedRack}
                onChange={(e) => {
                  setSelectedRack(e.target.value);
                  setSelectedShelf("");
                  setSelectedBin("");
                }}
                data-ocid="inventory.select"
              >
                <option value="">— Select Rack —</option>
                {racks.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="relocate-shelf"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Shelf
              </label>
              <select
                id="relocate-shelf"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                value={selectedShelf}
                onChange={(e) => {
                  setSelectedShelf(e.target.value);
                  setSelectedBin("");
                }}
                disabled={!selectedRack}
                data-ocid="inventory.select"
              >
                <option value="">— Select Shelf —</option>
                {filteredShelves.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="relocate-bin"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Bin
              </label>
              <select
                id="relocate-bin"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                value={selectedBin}
                onChange={(e) => setSelectedBin(e.target.value)}
                disabled={!selectedShelf}
                data-ocid="inventory.select"
              >
                <option value="">— Select Bin —</option>
                {filteredBins.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-slate-200">
          <Button
            variant="ghost"
            onClick={onClose}
            data-ocid="inventory.cancel_button"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!selectedRack}
            data-ocid="inventory.confirm_button"
          >
            Confirm Relocation
          </Button>
        </div>
      </div>
    </div>
  );
}

function PartRelocationTab() {
  const {
    partItems,
    stockCompanies,
    stockCategories,
    stockPartNames,
    navigate,
  } = useStore();
  const { locationStr } = useLocationHelpers();

  const [search, setSearch] = useState("");
  const [relocateItem, setRelocateItem] = useState<PartInventoryItem | null>(
    null,
  );
  const [expandedCompanies, setExpandedCompanies] = useState<Set<string>>(
    new Set(),
  );

  const q = search.trim().toLowerCase();

  const inStockItems = useMemo(
    () =>
      partItems
        .filter((p) => p.status === "in_stock")
        .filter((p) => {
          if (!q) return true;
          const pnName =
            stockPartNames.find((pn) => pn.id === p.partNameId)?.name ?? "";
          return (
            p.partCode.toLowerCase().includes(q) ||
            pnName.toLowerCase().includes(q)
          );
        }),
    [partItems, stockPartNames, q],
  );

  // Group by company, then category
  type CatGroup = { categoryId: string; items: PartInventoryItem[] };
  type CompGroup = { companyId: string; categories: CatGroup[] };

  const grouped = useMemo((): CompGroup[] => {
    const compMap = new Map<string, Map<string, PartInventoryItem[]>>();
    for (const item of inStockItems) {
      if (!compMap.has(item.companyId)) compMap.set(item.companyId, new Map());
      const catMap = compMap.get(item.companyId)!;
      if (!catMap.has(item.categoryId)) catMap.set(item.categoryId, []);
      catMap.get(item.categoryId)!.push(item);
    }
    const result: CompGroup[] = [];
    for (const [companyId, catMap] of compMap) {
      const categories: CatGroup[] = [];
      for (const [categoryId, items] of catMap) {
        categories.push({ categoryId, items });
      }
      result.push({ companyId, categories });
    }
    return result;
  }, [inStockItems]);

  const toggleCompany = (id: string) =>
    setExpandedCompanies((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  let rowIndex = 0;

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          className="pl-9 pr-9"
          placeholder="Search in-stock parts by code or name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          data-ocid="inventory.search_input"
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-0">
          {inStockItems.length === 0 ? (
            <div
              className="text-center py-12 text-slate-400 text-sm"
              data-ocid="inventory.empty_state"
            >
              {q
                ? "No matching in-stock parts."
                : "No in-stock parts available."}
            </div>
          ) : (
            <div>
              {grouped.map((compGroup) => {
                const companyName =
                  stockCompanies.find((c) => c.id === compGroup.companyId)
                    ?.name ?? compGroup.companyId;
                const totalItems = compGroup.categories.reduce(
                  (s, c) => s + c.items.length,
                  0,
                );
                const isExpanded =
                  expandedCompanies.has(compGroup.companyId) || !!q;

                return (
                  <div
                    key={compGroup.companyId}
                    className="border-b border-slate-200 last:border-0"
                  >
                    {/* Company header - clickable toggle */}
                    <button
                      type="button"
                      className="w-full flex items-center gap-3 px-4 py-3 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                      onClick={() => toggleCompany(compGroup.companyId)}
                      data-ocid="inventory.toggle"
                    >
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4 text-slate-500 shrink-0" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-slate-400 shrink-0" />
                      )}
                      <Building2 className="h-4 w-4 text-blue-600 shrink-0" />
                      <span className="font-semibold text-slate-800 text-sm flex-1">
                        {companyName}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {totalItems} items
                      </Badge>
                    </button>

                    {/* Expanded rows */}
                    {isExpanded && (
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-slate-100 bg-white">
                              <th className="text-left pl-10 pr-4 py-2 text-slate-500 font-medium text-xs">
                                Part Code
                              </th>
                              <th className="text-left px-4 py-2 text-slate-500 font-medium text-xs">
                                Part Name
                              </th>
                              <th className="text-left px-4 py-2 text-slate-500 font-medium text-xs">
                                Category
                              </th>
                              <th className="text-left px-4 py-2 text-slate-500 font-medium text-xs">
                                Current Location
                              </th>
                              <th className="text-left px-4 py-2 text-slate-500 font-medium text-xs">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {compGroup.categories.map((catGroup) => {
                              return catGroup.items.map((item) => {
                                rowIndex += 1;
                                const currentIndex = rowIndex;
                                const pnName =
                                  stockPartNames.find(
                                    (p) => p.id === item.partNameId,
                                  )?.name ?? "";
                                const catName =
                                  stockCategories.find(
                                    (c) => c.id === item.categoryId,
                                  )?.name ?? "";
                                return (
                                  <tr
                                    key={item.id}
                                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                                    data-ocid={`inventory.row.${currentIndex}`}
                                  >
                                    <td className="pl-10 pr-4 py-2.5">
                                      <button
                                        type="button"
                                        className="font-mono text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
                                        onClick={() =>
                                          navigate(
                                            "part-detail",
                                            undefined,
                                            item.id,
                                          )
                                        }
                                        data-ocid={`inventory.link.${currentIndex}`}
                                      >
                                        <Tag className="h-3 w-3" />
                                        {item.partCode}
                                      </button>
                                    </td>
                                    <td className="px-4 py-2.5 text-slate-700 text-xs">
                                      {pnName}
                                    </td>
                                    <td className="px-4 py-2.5 text-slate-500 text-xs">
                                      {catName}
                                    </td>
                                    <td className="px-4 py-2.5 text-slate-500 text-xs">
                                      {locationStr(item)}
                                    </td>
                                    <td className="px-4 py-2.5">
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="text-blue-600 border-blue-300 hover:bg-blue-50 text-xs"
                                        onClick={() => setRelocateItem(item)}
                                        data-ocid={`inventory.edit_button.${currentIndex}`}
                                      >
                                        <MapPin className="h-3 w-3 mr-1" />
                                        Relocate
                                      </Button>
                                    </td>
                                  </tr>
                                );
                              });
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {relocateItem && (
        <RelocateModal
          item={relocateItem}
          onClose={() => setRelocateItem(null)}
        />
      )}
    </div>
  );
}

// ── Main Page ───────────────────────────────────────────────────────────────

type TabId = "spare-parts" | "part-search" | "part-relocation";

const TABS: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: "spare-parts", label: "Spare Parts", icon: PackageOpen },
  { id: "part-search", label: "Part Search", icon: Search },
  { id: "part-relocation", label: "Part Relocation", icon: ArrowLeftRight },
];

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState<TabId>("spare-parts");

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-white/20 rounded-xl">
            <Package className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Inventory</h1>
            <p className="text-emerald-200 text-sm">
              Manage and search spare parts stock
            </p>
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div className="border-b border-slate-200 bg-white/80">
        <nav className="flex gap-1 px-1" aria-label="Inventory tabs">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold transition-all border-b-2 -mb-px ${
                activeTab === tab.id
                  ? "border-emerald-600 text-emerald-600 bg-emerald-50/60"
                  : "border-transparent text-slate-500 hover:text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50/40"
              }`}
              onClick={() => setActiveTab(tab.id)}
              data-ocid="inventory.tab"
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab content */}
      {activeTab === "spare-parts" && <SparePartsTab />}
      {activeTab === "part-search" && <PartSearchTab />}
      {activeTab === "part-relocation" && <PartRelocationTab />}
    </div>
  );
}
