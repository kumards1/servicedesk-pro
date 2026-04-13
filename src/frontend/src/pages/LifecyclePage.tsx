import {
  ArrowUpRight,
  Building2,
  ChevronDown,
  ChevronRight,
  GitBranch,
  MapPin,
  Package,
  RotateCcw,
  Search,
  ShoppingCart,
  Wrench,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { useStore } from "../store";

type FilterTab =
  | "all"
  | "purchased"
  | "issued"
  | "installed"
  | "returned_store"
  | "returned_company";

const EVENT_META: Record<
  string,
  {
    icon: React.ElementType;
    color: string;
    border: string;
    bg: string;
    label: string;
    iconColor: string;
  }
> = {
  Purchased: {
    icon: ShoppingCart,
    color: "text-green-700",
    border: "border-l-green-500",
    bg: "bg-green-50",
    label: "Purchased",
    iconColor: "text-green-600",
  },
  "Location Assigned": {
    icon: MapPin,
    color: "text-violet-700",
    border: "border-l-violet-500",
    bg: "bg-violet-50",
    label: "Location Assigned",
    iconColor: "text-violet-600",
  },
  Stored: {
    icon: Package,
    color: "text-emerald-700",
    border: "border-l-emerald-500",
    bg: "bg-emerald-50",
    label: "Stored",
    iconColor: "text-emerald-600",
  },
  "Part Requested": {
    icon: ShoppingCart,
    color: "text-blue-700",
    border: "border-l-blue-500",
    bg: "bg-blue-50",
    label: "Part Requested",
    iconColor: "text-blue-600",
  },
  Issued: {
    icon: ArrowUpRight,
    color: "text-orange-700",
    border: "border-l-orange-500",
    bg: "bg-orange-50",
    label: "Issued",
    iconColor: "text-orange-600",
  },
  Installed: {
    icon: Wrench,
    color: "text-blue-700",
    border: "border-l-blue-500",
    bg: "bg-blue-50",
    label: "Installed",
    iconColor: "text-blue-600",
  },
  "Returned Unused": {
    icon: RotateCcw,
    color: "text-amber-700",
    border: "border-l-amber-500",
    bg: "bg-amber-50",
    label: "Returned to Store",
    iconColor: "text-amber-600",
  },
  "Returned to Store": {
    icon: RotateCcw,
    color: "text-amber-700",
    border: "border-l-amber-500",
    bg: "bg-amber-50",
    label: "Returned to Store",
    iconColor: "text-amber-600",
  },
  Relocated: {
    icon: MapPin,
    color: "text-cyan-700",
    border: "border-l-cyan-500",
    bg: "bg-cyan-50",
    label: "Relocated",
    iconColor: "text-cyan-600",
  },
  "Returned to Company": {
    icon: Building2,
    color: "text-red-700",
    border: "border-l-red-500",
    bg: "bg-red-50",
    label: "Returned to Company",
    iconColor: "text-red-600",
  },
  Defective: {
    icon: Building2,
    color: "text-red-700",
    border: "border-l-red-500",
    bg: "bg-red-50",
    label: "Defective",
    iconColor: "text-red-600",
  },
};

function getEventMeta(action: string) {
  // Exact match first
  if (EVENT_META[action]) return EVENT_META[action];
  // Partial match
  for (const [key, val] of Object.entries(EVENT_META)) {
    if (action.toLowerCase().includes(key.toLowerCase())) return val;
  }
  return {
    icon: Package,
    color: "text-muted-foreground",
    border: "border-l-border",
    bg: "bg-muted/30",
    label: action,
    iconColor: "text-muted-foreground",
  };
}

const TAB_FILTER_MAP: Record<FilterTab, string[]> = {
  all: [],
  purchased: ["purchased", "stored"],
  issued: ["issued", "part requested"],
  installed: ["installed"],
  returned_store: ["returned unused", "returned to store"],
  returned_company: ["returned to company", "defective"],
};

function formatDate(ts: string) {
  try {
    return new Date(ts).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return ts;
  }
}

const STATUS_BADGE: Record<string, { label: string; cls: string }> = {
  in_stock: {
    label: "In Warehouse",
    cls: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  },
  issued: {
    label: "Issued",
    cls: "bg-amber-100 text-amber-700 border border-amber-200",
  },
  installed: {
    label: "Installed",
    cls: "bg-blue-100 text-blue-700 border border-blue-200",
  },
  returned_to_company: {
    label: "Returned to Company",
    cls: "bg-red-100 text-red-700 border border-red-200",
  },
  returned_to_store: {
    label: "Returned to Store",
    cls: "bg-slate-100 text-slate-600 border border-slate-200",
  },
};

const FILTER_TABS: {
  key: FilterTab;
  label: string;
  icon: React.ElementType;
  color: string;
}[] = [
  {
    key: "all",
    label: "All Events",
    icon: GitBranch,
    color: "text-indigo-600",
  },
  {
    key: "purchased",
    label: "Purchased",
    icon: ShoppingCart,
    color: "text-green-600",
  },
  {
    key: "issued",
    label: "Issued",
    icon: ArrowUpRight,
    color: "text-orange-600",
  },
  {
    key: "installed",
    label: "Installed",
    icon: Wrench,
    color: "text-blue-600",
  },
  {
    key: "returned_store",
    label: "Returned to Store",
    icon: RotateCcw,
    color: "text-amber-600",
  },
  {
    key: "returned_company",
    label: "Returned to Company",
    icon: Building2,
    color: "text-red-600",
  },
];

export default function LifecyclePage() {
  const {
    partLifecycle,
    partItems,
    stockCompanies,
    stockPartNames,
    stockCategories,
    navigate,
  } = useStore();
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  // Per-tab date filters
  const [dateFilters, setDateFilters] = useState<
    Record<FilterTab, { from: string; to: string }>
  >(
    Object.fromEntries(
      FILTER_TABS.map((t) => [t.key, { from: "", to: "" }]),
    ) as Record<FilterTab, { from: string; to: string }>,
  );

  const allLifecycle = useMemo(() => {
    // Sort all lifecycle entries by timestamp DESC — most recent first
    return [...partLifecycle].sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );
  }, [partLifecycle]);

  // Group by partId — which should be the partCode for reliable grouping
  const groups = useMemo(() => {
    const map = new Map<string, typeof allLifecycle>();
    for (const entry of allLifecycle) {
      // partId can be partCode (new entries) or item id (old entries)
      const key = entry.partId;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(entry);
    }
    // Sort each group chronologically (oldest first for timeline)
    for (const [, arr] of map) {
      arr.sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
      );
    }
    return map;
  }, [allLifecycle]);

  const partCodes = useMemo(() => {
    // Sort by most recent event in each group (DESC)
    return [...groups.keys()].sort((a, b) => {
      const aLatest = groups.get(a)?.[0]?.timestamp ?? "";
      const bLatest = groups.get(b)?.[0]?.timestamp ?? "";
      return bLatest.localeCompare(aLatest);
    });
  }, [groups]);

  const getPartInfo = (partId: string) => {
    // partId in lifecycle can be a part item id OR a part code
    let item = partItems.find((p) => p.id === partId);
    if (!item) {
      // fallback: search by partCode
      item = partItems.find((p) => p.partCode === partId);
    }
    if (!item) {
      return {
        company: "",
        partName: partId,
        status: "in_stock",
        category: "",
      };
    }
    const company =
      stockCompanies.find((c) => c.id === item!.companyId)?.name ?? "";
    const partName =
      stockPartNames.find((p) => p.id === item!.partNameId)?.name ??
      item!.partCode ??
      partId;
    const category =
      stockCategories.find((c) => c.id === item!.categoryId)?.name ?? "";
    return { company, partName, status: item.status, category };
  };

  const currentDateFilter = dateFilters[activeTab];

  const filterEvents = (events: typeof allLifecycle) => {
    let filtered = events;
    // Filter by tab
    if (activeTab !== "all") {
      const keywords = TAB_FILTER_MAP[activeTab];
      filtered = filtered.filter((e) =>
        keywords.some((k) => e.action.toLowerCase().includes(k)),
      );
    }
    // Filter by date range
    if (currentDateFilter.from) {
      filtered = filtered.filter(
        (e) => e.timestamp >= new Date(currentDateFilter.from).toISOString(),
      );
    }
    if (currentDateFilter.to) {
      const toEnd = new Date(currentDateFilter.to);
      toEnd.setHours(23, 59, 59, 999);
      filtered = filtered.filter((e) => e.timestamp <= toEnd.toISOString());
    }
    return filtered;
  };

  const q = search.toLowerCase();
  const filtered = partCodes.filter((code) => {
    const info = getPartInfo(code);
    if (
      q &&
      !code.toLowerCase().includes(q) &&
      !info.partName.toLowerCase().includes(q)
    )
      return false;
    // Only show groups that have events in current tab
    const events = groups.get(code) ?? [];
    return filterEvents(events).length > 0;
  });

  const toggle = (code: string) =>
    setExpanded((s) => {
      const n = new Set(s);
      if (n.has(code)) n.delete(code);
      else n.add(code);
      return n;
    });

  const totalEvents = allLifecycle.length;

  const hasFilters =
    search ||
    currentDateFilter.from ||
    currentDateFilter.to ||
    activeTab !== "all";

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 rounded-2xl shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm">
            <GitBranch className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Part Lifecycle</h1>
            <p className="text-indigo-200 text-sm">
              Track every movement of every part
            </p>
          </div>
          <div className="ml-auto">
            <span className="bg-white/20 text-white text-sm font-semibold px-3 py-1.5 rounded-full">
              {totalEvents} total events
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs - outside header */}
      <div className="flex flex-wrap gap-2">
        {FILTER_TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              type="button"
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                activeTab === tab.key
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                  : "bg-card text-muted-foreground border-border hover:border-indigo-300 hover:text-indigo-600"
              }`}
            >
              <Icon className="h-3 w-3" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div>
        {/* Search + Date Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by part code or part name..."
              className="pl-9 bg-card border-border shadow-sm"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xs text-muted-foreground font-medium">
              From
            </span>
            <Input
              type="date"
              value={currentDateFilter.from}
              onChange={(e) =>
                setDateFilters((prev) => ({
                  ...prev,
                  [activeTab]: { ...prev[activeTab], from: e.target.value },
                }))
              }
              className="bg-card border-border shadow-sm text-sm w-36"
            />
            <span className="text-xs text-muted-foreground font-medium">
              To
            </span>
            <Input
              type="date"
              value={currentDateFilter.to}
              onChange={(e) =>
                setDateFilters((prev) => ({
                  ...prev,
                  [activeTab]: { ...prev[activeTab], to: e.target.value },
                }))
              }
              className="bg-card border-border shadow-sm text-sm w-36"
            />
            {(currentDateFilter.from || currentDateFilter.to) && (
              <button
                type="button"
                onClick={() =>
                  setDateFilters((prev) => ({
                    ...prev,
                    [activeTab]: { from: "", to: "" },
                  }))
                }
                className="text-muted-foreground hover:text-foreground p-1"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Empty state */}
        {totalEvents === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <GitBranch className="h-14 w-14 mx-auto mb-4 opacity-20" />
            <p className="text-lg font-semibold">No lifecycle entries yet</p>
            <p className="text-sm mt-1 text-muted-foreground/70">
              Parts will be tracked here as they move through the system —
              purchases, location assignments, issuances, installations, and
              returns.
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <GitBranch className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p className="text-lg font-medium">No lifecycle events found</p>
            <p className="text-sm mt-1">
              {hasFilters
                ? "Try a different filter or search term"
                : "No events match the current view"}
            </p>
          </div>
        ) : (
          /* Groups */
          <div className="space-y-3">
            {filtered.map((code) => {
              const allEvents = groups.get(code) ?? [];
              const events = filterEvents(allEvents);
              const info = getPartInfo(code);
              const isOpen = expanded.has(code);
              const badge = STATUS_BADGE[info.status] ?? STATUS_BADGE.in_stock;

              // Determine display name: if code looks like an item id (not a readable code), use partName
              const displayCode = code;

              return (
                <Card
                  key={code}
                  className="overflow-hidden shadow-sm border-border hover:shadow-md transition-shadow"
                >
                  {/* Header row */}
                  <button
                    type="button"
                    onClick={() => toggle(code)}
                    className="w-full flex items-center gap-4 px-5 py-4 hover:bg-muted/30 transition-colors text-left"
                  >
                    <span className="text-muted-foreground">
                      {isOpen ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                      <Package className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate("part-detail", undefined, code);
                          }}
                          className="font-bold text-indigo-600 hover:text-indigo-800 hover:underline text-base"
                        >
                          {displayCode}
                        </button>
                        <Badge
                          className={`text-xs px-2 py-0.5 rounded-full font-medium border-0 ${badge.cls}`}
                        >
                          {badge.label}
                        </Badge>
                      </div>
                      {info.company && (
                        <div className="text-sm text-muted-foreground">
                          {info.company} ›{" "}
                          {info.category && `${info.category} › `}
                          {info.partName}
                        </div>
                      )}
                      {!info.company &&
                        info.partName &&
                        info.partName !== code && (
                          <div className="text-sm text-muted-foreground">
                            {info.partName}
                          </div>
                        )}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs text-muted-foreground">
                        {allEvents.length} total
                      </span>
                      <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2.5 py-1 rounded-full">
                        {events.length} event{events.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </button>

                  {/* Timeline */}
                  {isOpen && (
                    <CardContent className="pt-0 pb-5 px-5">
                      <div className="border-t border-border mb-4" />
                      {events.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          No events match the current filter for this part.
                        </p>
                      ) : (
                        <div className="relative ml-3">
                          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-200 to-border" />
                          <div className="space-y-4">
                            {events.map((ev) => {
                              const meta = getEventMeta(ev.action);
                              const Icon = meta.icon;
                              return (
                                <div key={ev.id} className="relative pl-10">
                                  <div
                                    className={`absolute left-2 top-3 w-4 h-4 rounded-full ${meta.bg} border-2 ${meta.border.replace("border-l-", "border-")} flex items-center justify-center shadow-sm`}
                                  >
                                    <Icon
                                      className={`h-2.5 w-2.5 ${meta.iconColor}`}
                                    />
                                  </div>
                                  <div
                                    className={`rounded-xl border-l-4 ${meta.border} ${meta.bg} p-4`}
                                  >
                                    <div className="flex items-start justify-between gap-3">
                                      <div className="flex items-center gap-2">
                                        <Icon
                                          className={`h-4 w-4 ${meta.iconColor}`}
                                        />
                                        <span
                                          className={`font-bold text-sm ${meta.color}`}
                                        >
                                          {ev.action}
                                        </span>
                                      </div>
                                      <span className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">
                                        {formatDate(ev.timestamp)}
                                      </span>
                                    </div>
                                    {ev.details && (
                                      <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                                        {ev.details}
                                      </p>
                                    )}
                                    {ev.userName && (
                                      <p className="text-xs text-muted-foreground/70 mt-1">
                                        By {ev.userName}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
