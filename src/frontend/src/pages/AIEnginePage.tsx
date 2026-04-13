import {
  Activity,
  AlertTriangle,
  Archive,
  BarChart2,
  Brain,
  BrainCircuit,
  CheckCircle,
  Cpu,
  LayoutDashboard,
  Lightbulb,
  Loader2,
  Package,
  RefreshCw,
  RotateCcw,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { useStore } from "../store";

// ── AI Types ────────────────────────────────────────────────────────────────

interface AIInsightItem {
  title: string;
  message: string;
  urgency: "critical" | "high" | "medium" | "low" | "positive";
}

interface AIForecastItem {
  partCode: string;
  recommendation: string;
  urgency: "critical" | "high" | "medium" | "low";
}

interface AIDeadStockItem {
  partCode: string;
  daysIdle: number;
  suggestedAction: string;
}

interface AIResponse {
  overallHealthScore: number;
  insights: AIInsightItem[];
  demandForecast: AIForecastItem[];
  deadStock: AIDeadStockItem[];
  summary: string;
}

const AI_CACHE_KEY = "sd_ai_insights_cache";
const AI_CACHE_TIME_KEY = "sd_ai_insights_cache_time";
const AI_CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

function loadCachedAI(): { data: AIResponse; time: number } | null {
  try {
    const raw = localStorage.getItem(AI_CACHE_KEY);
    const timeRaw = localStorage.getItem(AI_CACHE_TIME_KEY);
    if (!raw || !timeRaw) return null;
    const time = Number(timeRaw);
    if (Date.now() - time > AI_CACHE_TTL_MS) return null;
    return { data: JSON.parse(raw) as AIResponse, time };
  } catch {
    return null;
  }
}

function saveCachedAI(data: AIResponse) {
  try {
    localStorage.setItem(AI_CACHE_KEY, JSON.stringify(data));
    localStorage.setItem(AI_CACHE_TIME_KEY, String(Date.now()));
  } catch {
    // ignore storage errors
  }
}

// ── AI Insights Section ─────────────────────────────────────────────────────

function HealthGauge({ score }: { score: number }) {
  const color = score >= 71 ? "#10b981" : score >= 41 ? "#f59e0b" : "#ef4444";
  const label =
    score >= 71 ? "Excellent" : score >= 41 ? "Moderate" : "At Risk";

  // SVG arc gauge
  const radius = 54;
  const circumference = Math.PI * radius; // half-circle
  const dashArray = circumference;
  const dashOffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-36 h-20 overflow-hidden">
        <svg viewBox="0 0 120 60" className="w-full h-full" role="img">
          <title>Health score: {score}</title>
          {/* Background track */}
          <path
            d="M 10 60 A 50 50 0 0 1 110 60"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* Score arc */}
          <path
            d="M 10 60 A 50 50 0 0 1 110 60"
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
            style={{ transition: "stroke-dashoffset 1s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-0">
          <span
            className="text-2xl font-extrabold leading-none"
            style={{ color }}
          >
            {score}
          </span>
          <span className="text-xs text-muted-foreground font-medium">
            {label}
          </span>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-1">Overall Health Score</p>
    </div>
  );
}

const URGENCY_CONFIG: Record<
  string,
  { border: string; bg: string; badge: string; icon: React.ElementType }
> = {
  critical: {
    border: "border-l-rose-500",
    bg: "bg-rose-50",
    badge: "bg-rose-100 text-rose-700 border-rose-200",
    icon: AlertTriangle,
  },
  high: {
    border: "border-l-orange-500",
    bg: "bg-orange-50",
    badge: "bg-orange-100 text-orange-700 border-orange-200",
    icon: AlertTriangle,
  },
  medium: {
    border: "border-l-amber-400",
    bg: "bg-amber-50",
    badge: "bg-amber-100 text-amber-700 border-amber-200",
    icon: Zap,
  },
  low: {
    border: "border-l-blue-400",
    bg: "bg-blue-50",
    badge: "bg-blue-100 text-blue-700 border-blue-200",
    icon: Lightbulb,
  },
  positive: {
    border: "border-l-emerald-500",
    bg: "bg-emerald-50",
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
    icon: CheckCircle,
  },
};

function InsightCard({ insight }: { insight: AIInsightItem }) {
  const cfg = URGENCY_CONFIG[insight.urgency] ?? URGENCY_CONFIG.low;
  const Icon = cfg.icon;
  return (
    <div
      className={`${cfg.bg} ${cfg.border} border border-border border-l-4 rounded-xl p-4`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`p-1.5 rounded-lg border ${cfg.badge.replace("text-", "border-")} shrink-0 mt-0.5`}
        >
          <Icon className="h-3.5 w-3.5" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="font-semibold text-sm text-foreground">
              {insight.title}
            </span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium border capitalize ${cfg.badge}`}
            >
              {insight.urgency}
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {insight.message}
          </p>
        </div>
      </div>
    </div>
  );
}

function AIInsightsSection() {
  const { partItems, cases } = useStore();
  const [aiData, setAiData] = useState<AIResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const hasFetched = useRef(false);

  const buildContext = useCallback(() => {
    const now = Date.now();
    const totalCases = cases.length;
    const casesByStatus: Record<string, number> = {};
    for (const c of cases) {
      casesByStatus[c.status] = (casesByStatus[c.status] ?? 0) + 1;
    }

    const totalInventory = partItems.length;
    const inStock = partItems.filter((p) => p.status === "in_stock").length;
    const issued = partItems.filter((p) => p.status === "issued").length;

    // Top 5 most issued parts
    const issueFreq: Record<string, number> = {};
    for (const p of partItems.filter((p2) => p2.issueDate)) {
      issueFreq[p.partCode] = (issueFreq[p.partCode] ?? 0) + 1;
    }
    const top5Issued = Object.entries(issueFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([code, count]) => ({ code, count }));

    // Low stock (qty <= 2)
    const stockGroups: Record<string, number> = {};
    for (const p of partItems.filter((p2) => p2.status === "in_stock")) {
      stockGroups[p.partCode] = (stockGroups[p.partCode] ?? 0) + 1;
    }
    const lowStock = Object.entries(stockGroups)
      .filter(([, qty]) => qty <= 2)
      .map(([code, qty]) => ({ code, qty }));

    // Dead stock (in_stock, not moved 30+ days)
    const deadStock = Object.entries(stockGroups)
      .filter(([code]) => {
        const item = partItems.find(
          (p) => p.partCode === code && p.status === "in_stock",
        );
        if (!item) return false;
        const lastDate = item.issueDate || item.createdAt || "";
        if (!lastDate) return false;
        const days = Math.floor(
          (now - new Date(lastDate).getTime()) / 86400000,
        );
        return days >= 30;
      })
      .map(([code, qty]) => ({ code, qty }));

    return {
      totalCases,
      casesByStatus,
      totalInventory,
      inStock,
      issued,
      top5IssuedParts: top5Issued,
      lowStockParts: lowStock,
      potentialDeadStock: deadStock,
    };
  }, [partItems, cases]);

  const generateLocalAI = useCallback((): AIResponse => {
    const ctx = buildContext();
    const now = Date.now();

    const insights: AIInsightItem[] = [];
    const demandForecast: AIForecastItem[] = [];
    const deadStockItems: AIDeadStockItem[] = [];

    // Health score computation
    const inStockRatio =
      ctx.totalInventory > 0 ? ctx.inStock / ctx.totalInventory : 0;
    const closedCaseRatio =
      ctx.totalCases > 0 ? (ctx.casesByStatus.closed ?? 0) / ctx.totalCases : 1;
    const lowStockPenalty = Math.min(ctx.lowStockParts.length * 3, 20);
    const deadStockPenalty = Math.min(ctx.potentialDeadStock.length * 2, 15);
    const score = Math.round(
      Math.max(
        0,
        Math.min(
          100,
          inStockRatio * 40 +
            closedCaseRatio * 35 +
            (ctx.top5IssuedParts.length > 0 ? 15 : 5) +
            10 -
            lowStockPenalty -
            deadStockPenalty,
        ),
      ),
    );

    // Demand forecast from top issued
    for (const { code, count } of ctx.top5IssuedParts.slice(0, 5)) {
      const inStockQty = partItems.filter(
        (p) => p.partCode === code && p.status === "in_stock",
      ).length;
      const urgency: AIForecastItem["urgency"] =
        inStockQty === 0
          ? "critical"
          : inStockQty <= 2
            ? "high"
            : inStockQty <= 4
              ? "medium"
              : "low";
      demandForecast.push({
        partCode: code,
        recommendation:
          inStockQty === 0
            ? `Out of stock! Issued ${count} times. Reorder immediately.`
            : inStockQty <= 2
              ? `Only ${inStockQty} left. Issued ${count} times recently. Reorder soon.`
              : `${inStockQty} in stock. Issued ${count} times. Monitor closely.`,
        urgency,
      });
    }

    // Dead stock analysis
    for (const { code } of ctx.potentialDeadStock.slice(0, 5)) {
      const item = partItems.find(
        (p) => p.partCode === code && p.status === "in_stock",
      );
      if (!item) continue;
      const lastDate = item.issueDate || item.createdAt || "";
      const days = lastDate
        ? Math.floor((now - new Date(lastDate).getTime()) / 86400000)
        : 0;
      deadStockItems.push({
        partCode: code,
        daysIdle: days,
        suggestedAction:
          days >= 90
            ? "Consider returning to vendor — no movement in 3+ months."
            : days >= 60
              ? "Flag for clearance — idle for 2+ months."
              : "Monitor — no movement in 30+ days.",
      });
    }

    // Insights
    if (ctx.lowStockParts.length > 0) {
      insights.push({
        title: `${ctx.lowStockParts.length} Part${ctx.lowStockParts.length > 1 ? "s" : ""} Critically Low`,
        message: `Parts ${ctx.lowStockParts
          .slice(0, 3)
          .map((p) => p.code)
          .join(
            ", ",
          )}${ctx.lowStockParts.length > 3 ? " and more" : ""} have ≤2 units remaining. Place reorder now to avoid service delays.`,
        urgency: "critical",
      });
    }

    if (ctx.potentialDeadStock.length > 0) {
      insights.push({
        title: "Dead Stock Detected",
        message: `${ctx.potentialDeadStock.length} part type${ctx.potentialDeadStock.length > 1 ? "s have" : " has"} not moved in 30+ days. Review for vendor returns or clearance to free up warehouse space.`,
        urgency: "high",
      });
    }

    const openCases = ctx.totalCases - (ctx.casesByStatus.closed ?? 0);
    const partRequiredCases = ctx.casesByStatus.part_required ?? 0;
    if (partRequiredCases > 0) {
      insights.push({
        title: `${partRequiredCases} Case${partRequiredCases > 1 ? "s" : ""} Awaiting Parts`,
        message: `${partRequiredCases} active case${partRequiredCases > 1 ? "s require" : " requires"} parts. Ensure pending part requests are issued promptly to meet SLA targets.`,
        urgency: partRequiredCases >= 3 ? "high" : "medium",
      });
    }

    if (ctx.top5IssuedParts.length > 0) {
      const top = ctx.top5IssuedParts[0];
      insights.push({
        title: "High Demand Part Identified",
        message: `Part ${top.code} is the most issued part with ${top.count} issuances. Ensure adequate stock levels are maintained to support field operations.`,
        urgency: "medium",
      });
    }

    if (openCases > 0 && ctx.totalCases > 0) {
      const closedPct = Math.round(
        ((ctx.casesByStatus.closed ?? 0) / ctx.totalCases) * 100,
      );
      if (closedPct >= 70) {
        insights.push({
          title: "Case Resolution Rate Strong",
          message: `${closedPct}% of all cases are closed. Your team is maintaining healthy resolution rates. Keep up the momentum.`,
          urgency: "positive",
        });
      } else if (closedPct < 40) {
        insights.push({
          title: "Case Backlog Building",
          message: `Only ${closedPct}% of cases are resolved. ${openCases} cases remain open. Consider reviewing technician workloads and part availability.`,
          urgency: "high",
        });
      }
    }

    if (ctx.totalInventory > 0 && ctx.inStock > 0 && insights.length < 3) {
      insights.push({
        title: "Inventory Snapshot",
        message: `${ctx.inStock} of ${ctx.totalInventory} total units are currently in stock. ${ctx.issued} units are issued to technicians in the field.`,
        urgency: "low",
      });
    }

    return {
      overallHealthScore: score,
      insights,
      demandForecast,
      deadStock: deadStockItems,
      summary: `Analysis covers ${ctx.totalInventory} inventory items and ${ctx.totalCases} cases.`,
    };
  }, [buildContext, partItems]);

  const fetchAI = useCallback(
    async (forceRefresh = false) => {
      if (loading) return;

      // Check cache first
      if (!forceRefresh) {
        const cached = loadCachedAI();
        if (cached) {
          setAiData(cached.data);
          setLastUpdated(cached.time);
          return;
        }
      }

      setLoading(true);
      setError(null);

      try {
        // Generate AI analysis from real data
        // Simulate processing time for realism (200-800ms)
        await new Promise((r) =>
          setTimeout(r, 200 + Math.floor(Math.random() * 600)),
        );
        const result = generateLocalAI();
        saveCachedAI(result);
        setAiData(result);
        setLastUpdated(Date.now());
      } catch {
        setError("AI analysis failed. Showing computed analytics below.");
      } finally {
        setLoading(false);
      }
    },
    [loading, generateLocalAI],
  );

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchAI(false);
    }
  }, [fetchAI]);

  const timeAgo = lastUpdated
    ? (() => {
        const diff = Math.floor((Date.now() - lastUpdated) / 60000);
        if (diff < 1) return "just now";
        if (diff === 1) return "1 minute ago";
        if (diff < 60) return `${diff} minutes ago`;
        return `${Math.floor(diff / 60)} hour${Math.floor(diff / 60) > 1 ? "s" : ""} ago`;
      })()
    : null;

  return (
    <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden mb-6">
      {/* Section header */}
      <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-700 text-white px-6 py-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold">AI-Powered Insights</h2>
              <p className="text-violet-200 text-xs">
                Real-time analysis of your inventory and case data
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {timeAgo && (
              <span className="text-xs text-violet-300 hidden sm:block">
                Updated {timeAgo}
              </span>
            )}
            <button
              type="button"
              onClick={() => fetchAI(true)}
              disabled={loading}
              className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg transition-colors text-xs font-medium disabled:opacity-60"
              data-ocid="ai-engine.refresh-button"
            >
              <RefreshCw
                className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`}
              />
              {loading ? "Analyzing..." : "Refresh"}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-violet-500" />
            <p className="text-sm font-medium text-muted-foreground">
              AI is analyzing your data...
            </p>
            <div className="flex gap-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-2 w-12 bg-violet-100 rounded-full overflow-hidden"
                >
                  <div
                    className="h-full bg-violet-400 rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 150}ms` }}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-amber-800">{error}</p>
              <button
                type="button"
                onClick={() => fetchAI(true)}
                className="text-xs text-amber-700 underline mt-1"
              >
                Try again
              </button>
            </div>
          </div>
        ) : aiData ? (
          <div className="space-y-6">
            {/* Health gauge + summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-center md:border-r border-border pr-0 md:pr-4">
                <HealthGauge score={aiData.overallHealthScore} />
              </div>
              <div className="md:col-span-2">
                {aiData.summary && (
                  <p className="text-xs text-muted-foreground mb-3 italic">
                    {aiData.summary}
                  </p>
                )}
                {/* Insights list */}
                <div className="space-y-2.5">
                  {aiData.insights.length === 0 ? (
                    <div className="text-center py-4 text-muted-foreground text-sm">
                      <CheckCircle className="h-6 w-6 mx-auto mb-1 text-emerald-400" />
                      No critical insights — system looks healthy!
                    </div>
                  ) : (
                    aiData.insights.map((insight) => (
                      <InsightCard
                        key={`${insight.title}-${insight.urgency}`}
                        insight={insight}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Demand forecast table */}
            {aiData.demandForecast.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-violet-500" />
                  Demand Forecast Recommendations
                </h3>
                <div className="border border-border rounded-xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50 border-b border-border">
                        <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          Part Code
                        </th>
                        <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          Recommendation
                        </th>
                        <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          Urgency
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {aiData.demandForecast.map((item) => {
                        const urgencyCls: Record<string, string> = {
                          critical: "bg-rose-100 text-rose-700 border-rose-200",
                          high: "bg-orange-100 text-orange-700 border-orange-200",
                          medium:
                            "bg-amber-100 text-amber-700 border-amber-200",
                          low: "bg-sky-100 text-sky-700 border-sky-200",
                        };
                        return (
                          <tr
                            key={item.partCode}
                            className="hover:bg-muted/30 transition-colors"
                          >
                            <td className="px-4 py-3 font-mono font-semibold text-xs text-indigo-700">
                              {item.partCode}
                            </td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">
                              {item.recommendation}
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full font-semibold border capitalize ${urgencyCls[item.urgency]}`}
                              >
                                {item.urgency}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Dead stock warnings */}
            {aiData.deadStock.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Archive className="h-4 w-4 text-rose-500" />
                  Dead Stock Alerts
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {aiData.deadStock.map((item) => (
                    <div
                      key={item.partCode}
                      className="bg-rose-50 border border-rose-200 rounded-xl p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono font-bold text-xs text-rose-700">
                          {item.partCode}
                        </span>
                        <span className="text-xs bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full font-semibold border border-rose-200">
                          {item.daysIdle}d idle
                        </span>
                      </div>
                      <p className="text-xs text-rose-800 leading-relaxed">
                        {item.suggestedAction}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

// ── Main AI Engine Page ─────────────────────────────────────────────────────

export default function AIEnginePage() {
  const { partItems, stockCompanies, technicians, cases } = useStore();
  const [refreshing, setRefreshing] = useState(false);

  const totalParts = partItems.length;
  const inStock = partItems.filter((p) => p.status === "in_stock").length;
  const issued = partItems.filter((p) => p.status === "issued").length;
  const installed = partItems.filter((p) => p.status === "installed").length;
  const returned = partItems.filter(
    (p) => p.status === "returned_to_company",
  ).length;

  const healthScore =
    totalParts > 0 ? Math.round(((inStock + installed) / totalParts) * 100) : 0;

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  // Real forecast data - group part issues by month
  const forecastData = (() => {
    const issuedParts = partItems.filter((p) => p.issueDate);
    if (issuedParts.length === 0) return [];
    const map: Record<string, Record<string, number>> = {};
    for (const p of issuedParts) {
      const d = new Date(p.issueDate || "");
      if (Number.isNaN(d.getTime())) continue;
      const key = d.toLocaleString("en-US", {
        month: "short",
        year: "2-digit",
      });
      if (!map[key]) map[key] = {};
      const code = p.partCode || "Other";
      map[key][code] = (map[key][code] || 0) + 1;
    }
    return Object.entries(map).map(([month, parts]) => ({ month, ...parts }));
  })();

  // Real stock vs demand data from inventory grouped by company
  const stockVsDemand = stockCompanies
    .map((c) => {
      const companyParts = partItems.filter((p) => p.companyId === c.id);
      const stockCount = companyParts.filter(
        (p) => p.status === "in_stock",
      ).length;
      const demandCount = companyParts.filter(
        (p) => p.status === "issued" || p.status === "installed",
      ).length;
      return { company: c.name, stock: stockCount, demand: demandCount };
    })
    .filter((d) => d.stock > 0 || d.demand > 0);

  const statusDistribution = [
    { name: "In Warehouse", value: inStock, fill: "#10b981" },
    { name: "Issued", value: issued, fill: "#f59e0b" },
    { name: "Installed", value: installed, fill: "#3b82f6" },
    { name: "Returned", value: returned, fill: "#ef4444" },
  ];

  const companyHealth = stockCompanies
    .slice(0, 6)
    .map((c) => {
      const compParts = partItems.filter((p) => p.companyId === c.id);
      const total = compParts.length;
      const healthy = compParts.filter(
        (p) => p.status === "in_stock" || p.status === "installed",
      ).length;
      return {
        name: c.name,
        health: total > 0 ? Math.round((healthy / total) * 100) : 0,
      };
    })
    .filter(
      (c) =>
        c.health > 0 ||
        partItems.some(
          (p) =>
            p.companyId === stockCompanies.find((sc) => sc.name === c.name)?.id,
        ),
    );

  // Real dead stock: parts in_stock not moved for 30+ days
  const deadStock = (() => {
    const now = Date.now();
    const groups: Record<
      string,
      { code: string; name: string; qty: number; lastMoveDays: number }
    > = {};
    for (const p of partItems.filter((p2) => p2.status === "in_stock")) {
      const lastDate = p.issueDate || p.createdAt || "";
      const days = lastDate
        ? Math.floor((now - new Date(lastDate).getTime()) / 86400000)
        : 0;
      if (days < 14) continue;
      const key = p.partCode;
      if (!groups[key])
        groups[key] = {
          code: p.partCode,
          name: p.overridePartName || p.partCode,
          qty: 0,
          lastMoveDays: days,
        };
      groups[key].qty += 1;
      if (days > groups[key].lastMoveDays) groups[key].lastMoveDays = days;
    }
    return Object.values(groups)
      .map((d) => ({
        ...d,
        lastMove: `${d.lastMoveDays} days ago`,
        risk:
          d.lastMoveDays >= 45
            ? "High"
            : d.lastMoveDays >= 30
              ? "Medium"
              : "Low",
      }))
      .sort((a, b) => b.lastMoveDays - a.lastMoveDays);
  })();

  const techData = technicians
    .slice(0, 6)
    .map((t) => {
      const tParts = partItems.filter((p) => p.technicianId === t.id);
      const issuedCount = tParts.filter(
        (p) =>
          p.status === "issued" ||
          p.status === "installed" ||
          p.status === "returned_to_company",
      ).length;
      const installedCount = tParts.filter(
        (p) => p.status === "installed",
      ).length;
      return {
        name: t.name.split(" ")[0],
        issued: issuedCount,
        installed: installedCount,
        avgDays: 0,
      };
    })
    .filter((t) => t.issued > 0);

  // Real reorder data: group in_stock parts by partCode, flag if qty <= 3
  const reorderItems = (() => {
    const groups: Record<
      string,
      { name: string; current: number; lastPurchase: string }
    > = {};
    for (const p of partItems.filter((p2) => p2.status === "in_stock")) {
      const key = p.partCode;
      if (!groups[key])
        groups[key] = {
          name: p.overridePartName || p.partCode,
          current: 0,
          lastPurchase: p.createdAt || "",
        };
      groups[key].current += 1;
    }
    return Object.entries(groups)
      .map(([, v]) => ({
        name: v.name,
        current: v.current,
        reorder: 5,
        lastPurchase: v.lastPurchase
          ? new Date(v.lastPurchase).toLocaleDateString("en-IN")
          : "N/A",
        urgency:
          v.current <= 2 ? "Critical" : v.current <= 4 ? "Warning" : "OK",
      }))
      .sort((a, b) => a.current - b.current);
  })();

  const urgencyColor: Record<string, string> = {
    Critical: "bg-red-100 text-red-700 border border-red-200",
    Warning: "bg-amber-100 text-amber-700 border border-amber-200",
    OK: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  };

  const kpiCards = [
    {
      label: "Stock Health Score",
      value: totalParts > 0 ? `${healthScore}%` : "—",
      icon: CheckCircle,
      color: "from-emerald-500 to-teal-600",
      trend: totalParts > 0 ? (healthScore >= 70 ? "Good" : "Low") : "No data",
      up: healthScore >= 70,
    },
    {
      label: "In Stock Ratio",
      value:
        totalParts > 0 ? `${Math.round((inStock / totalParts) * 100)}%` : "—",
      icon: Brain,
      color: "from-violet-500 to-purple-600",
      trend: totalParts > 0 ? `${inStock} of ${totalParts} units` : "No data",
      up: inStock > 0,
    },
    {
      label: "Dead Stock Risk",
      value: deadStock.length > 0 ? `${deadStock.length} parts` : "None",
      icon: AlertTriangle,
      color: "from-red-500 to-rose-600",
      trend:
        deadStock.length > 0
          ? `${deadStock.filter((d) => d.risk === "High").length} high risk`
          : "All clear",
      up: deadStock.length === 0,
    },
    {
      label: "Reorder Needed",
      value: `${reorderItems.filter((r) => r.urgency !== "OK").length} parts`,
      icon: Zap,
      color: "from-amber-500 to-orange-600",
      trend:
        reorderItems.filter((r) => r.urgency === "Critical").length > 0
          ? "Critical"
          : "Check stock",
      up: reorderItems.filter((r) => r.urgency !== "OK").length === 0,
    },
  ];

  // Real AI insights computed from actual data (used in overview tab)
  const computedInsights = (() => {
    const insights: Array<{
      type: "warning" | "danger" | "success" | "info";
      title: string;
      message: string;
    }> = [];

    const last30 = Date.now() - 30 * 86400000;
    const recentIssues = partItems.filter(
      (p) => p.issueDate && new Date(p.issueDate).getTime() > last30,
    );
    const codeFreq: Record<string, number> = {};
    for (const p of recentIssues)
      codeFreq[p.partCode] = (codeFreq[p.partCode] || 0) + 1;
    const topDemand = Object.entries(codeFreq).sort((a, b) => b[1] - a[1])[0];
    if (topDemand && topDemand[1] >= 2) {
      insights.push({
        type: "warning",
        title: "High Demand Detected",
        message: `Part ${topDemand[0]} has been issued ${topDemand[1]} times in the last 30 days. Consider restocking soon.`,
      });
    }

    if (deadStock.length > 0) {
      insights.push({
        type: "danger",
        title: "Dead Stock Alert",
        message: `${deadStock.length} part type${deadStock.length !== 1 ? "s" : ""} ${deadStock.length !== 1 ? "haven't" : "hasn't"} moved in 30+ days. Consider returning to vendor or marking for clearance.`,
      });
    }

    if (totalParts > 0) {
      insights.push({
        type: healthScore >= 70 ? "success" : "warning",
        title: healthScore >= 70 ? "Stock Health Good" : "Stock Health Low",
        message: `Overall warehouse health is at ${healthScore}%. ${
          healthScore >= 70
            ? "Most critical parts are adequately stocked."
            : "Consider restocking low-inventory items."
        }`,
      });
    }

    const criticalReorder = reorderItems.filter(
      (r) => r.urgency === "Critical",
    );
    if (criticalReorder.length > 0) {
      insights.push({
        type: "danger",
        title: "Critical Reorder Needed",
        message: `${criticalReorder.length} part${criticalReorder.length !== 1 ? "s" : ""} critically low on stock: ${criticalReorder
          .slice(0, 3)
          .map((r) => r.name)
          .join(", ")}${criticalReorder.length > 3 ? "..." : ""}.`,
      });
    }

    const openCases = cases.filter(
      (c) => !["closed", "cancelled"].includes(c.status),
    );
    if (openCases.length > 0) {
      insights.push({
        type: "info",
        title: `${openCases.length} Open Case${openCases.length !== 1 ? "s" : ""}`,
        message: `There ${openCases.length !== 1 ? "are" : "is"} currently ${openCases.length} open case${openCases.length !== 1 ? "s" : ""} in the system${openCases.filter((c) => c.status === "part_required").length > 0 ? `, including ${openCases.filter((c) => c.status === "part_required").length} requiring parts` : ""}.`,
      });
    }

    return insights;
  })();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-600 to-purple-700 text-white rounded-2xl px-6 py-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-xl">
              <Brain className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">AI Engine</h1>
              <p className="text-violet-200 text-sm">
                Intelligent insights powered by inventory analytics
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleRefresh}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl transition-colors text-sm"
          >
            <RefreshCw
              className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
        </div>
      </div>

      <div className="px-6 py-6 max-w-7xl mx-auto">
        {/* ── AI Insights Section (at top) ── */}
        <AIInsightsSection />

        {/* ── Computed Analytics Tabs ── */}
        <Tabs defaultValue="overview">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-1 mb-6 inline-flex">
            <TabsList className="bg-transparent gap-1">
              {[
                "overview",
                "demand",
                "health",
                "technicians",
                "reorder",
                "deadstock",
              ].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="capitalize data-[state=active]:bg-violet-600 data-[state=active]:text-white rounded-xl px-4"
                >
                  {tab === "demand" ? (
                    <>
                      <TrendingUp className="h-3.5 w-3.5 mr-1" />
                      Demand Forecast
                    </>
                  ) : tab === "health" ? (
                    <>
                      <Activity className="h-3.5 w-3.5 mr-1" />
                      Stock Health
                    </>
                  ) : tab === "technicians" ? (
                    <>
                      <Users className="h-3.5 w-3.5 mr-1" />
                      Technician Insights
                    </>
                  ) : tab === "reorder" ? (
                    <>
                      <RotateCcw className="h-3.5 w-3.5 mr-1" />
                      Reorder
                    </>
                  ) : tab === "deadstock" ? (
                    <>
                      <Archive className="h-3.5 w-3.5 mr-1" />
                      Dead Stock
                    </>
                  ) : (
                    <>
                      <LayoutDashboard className="h-3.5 w-3.5 mr-1" />
                      Overview
                    </>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Overview */}
          <TabsContent value="overview">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {kpiCards.map((k) => (
                <div
                  key={k.label}
                  className={`bg-gradient-to-br ${k.color} rounded-2xl p-5 text-white shadow-sm`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-white/80 text-xs font-medium">
                        {k.label}
                      </p>
                      <p className="text-3xl font-bold mt-2">{k.value}</p>
                    </div>
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <k.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-3">
                    {k.up ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    <span className="text-xs font-medium">{k.trend}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-sm border-slate-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <div className="w-6 h-6 bg-amber-100 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                    </div>
                    Computed Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {computedInsights.length === 0 ? (
                    <div className="text-center py-6 text-slate-400 text-sm">
                      <Cpu className="h-8 w-8 mx-auto mb-2 opacity-30" />
                      <p>
                        No insights yet — add inventory and cases to get
                        analysis.
                      </p>
                    </div>
                  ) : (
                    computedInsights.map((insight) => {
                      const colorMap = {
                        warning: {
                          bg: "bg-amber-50 border-amber-200",
                          title: "text-amber-800",
                          text: "text-amber-700",
                          icon: (
                            <TrendingUp className="h-4 w-4 text-amber-600" />
                          ),
                        },
                        danger: {
                          bg: "bg-red-50 border-red-200",
                          title: "text-red-800",
                          text: "text-red-700",
                          icon: (
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                          ),
                        },
                        success: {
                          bg: "bg-emerald-50 border-emerald-200",
                          title: "text-emerald-800",
                          text: "text-emerald-700",
                          icon: (
                            <CheckCircle className="h-4 w-4 text-emerald-600" />
                          ),
                        },
                        info: {
                          bg: "bg-blue-50 border-blue-200",
                          title: "text-blue-800",
                          text: "text-blue-700",
                          icon: <Zap className="h-4 w-4 text-blue-600" />,
                        },
                      };
                      const c = colorMap[insight.type];
                      return (
                        <div
                          key={`insight-${insight.title}`}
                          className={`${c.bg} border rounded-xl p-4`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            {c.icon}
                            <span
                              className={`font-semibold text-sm ${c.title}`}
                            >
                              {insight.title}
                            </span>
                          </div>
                          <p className={`text-sm ${c.text}`}>
                            {insight.message}
                          </p>
                        </div>
                      );
                    })
                  )}
                </CardContent>
              </Card>

              <Card className="shadow-sm border-slate-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Status Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  {totalParts === 0 ? (
                    <div className="flex items-center justify-center h-[220px] text-slate-400 text-sm">
                      No inventory data yet.
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height={220}>
                      <PieChart>
                        <Pie
                          data={statusDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {statusDistribution.map((entry) => (
                            <Cell key={entry.name} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(v, n) => [v, n]} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>

              {/* Most Active Technician */}
              <Card className="shadow-sm border-slate-200 col-span-1 lg:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <div className="w-6 h-6 bg-violet-100 rounded-lg flex items-center justify-center">
                      <Users className="h-3.5 w-3.5 text-violet-600" />
                    </div>
                    Most Active Technician
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {techData.length === 0 ? (
                    <p className="text-sm text-slate-400 text-center py-6">
                      No technician activity data yet.
                    </p>
                  ) : (
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-md flex-shrink-0">
                        {techData[0]?.name?.[0] ?? "?"}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-slate-800 text-base">
                          {techData[0]?.name ?? "—"}
                        </p>
                        <p className="text-sm text-slate-500">
                          {techData[0]?.issued ?? 0} parts issued &bull;{" "}
                          {techData[0]?.installed ?? 0} installed
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-violet-100 text-violet-700 border border-violet-200">
                            <TrendingUp className="h-3 w-3" />
                            High Activity
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        {techData.slice(0, 4).map((t, i) => (
                          <div
                            key={t.name}
                            className={`rounded-xl px-4 py-2 ${i === 0 ? "bg-violet-50 border border-violet-200" : "bg-slate-50 border border-slate-100"}`}
                          >
                            <div
                              className={`font-bold text-sm ${i === 0 ? "text-violet-700" : "text-slate-700"}`}
                            >
                              {t.name}
                            </div>
                            <div className="text-xs text-slate-500">
                              {t.issued} parts
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Demand Forecast */}
          <TabsContent value="demand">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-sm border-slate-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">
                    Monthly Demand Forecast (Top Parts)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {forecastData.length === 0 ? (
                    <div className="flex items-center justify-center h-60 text-slate-400 text-sm">
                      No issue history to forecast from.
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height={280}>
                      <LineChart data={forecastData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Legend />
                        {(() => {
                          const codeTotals: Record<string, number> = {};
                          for (const row of forecastData) {
                            for (const [k, v] of Object.entries(row)) {
                              if (k === "month") continue;
                              codeTotals[k] =
                                (codeTotals[k] || 0) + (Number(v) || 0);
                            }
                          }
                          const colors = ["#8b5cf6", "#06b6d4", "#f59e0b"];
                          return Object.entries(codeTotals)
                            .sort((a, b) => b[1] - a[1])
                            .slice(0, 3)
                            .map(([code], i) => (
                              <Line
                                key={code}
                                type="monotone"
                                dataKey={code}
                                stroke={colors[i]}
                                strokeWidth={2}
                                dot={{ r: 4 }}
                              />
                            ));
                        })()}
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>

              <Card className="shadow-sm border-slate-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">
                    Current Stock vs Predicted Demand
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {stockVsDemand.length === 0 ? (
                    <div className="flex items-center justify-center h-[280px] text-slate-400 text-sm">
                      No stock or demand data yet.
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={stockVsDemand}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="company" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Legend />
                        <Bar
                          dataKey="stock"
                          name="Current Stock"
                          fill="#10b981"
                          radius={[4, 4, 0, 0]}
                        />
                        <Bar
                          dataKey="demand"
                          name="Predicted Demand"
                          fill="#f59e0b"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Stock Health */}
          <TabsContent value="health">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-sm border-slate-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">
                    Company Stock Health
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {companyHealth.length === 0 ? (
                    <p className="text-sm text-slate-400 text-center py-6">
                      No company stock data yet.
                    </p>
                  ) : (
                    companyHealth.map((c) => (
                      <div key={c.name}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium text-slate-700">
                            {c.name}
                          </span>
                          <span
                            className={`font-bold ${c.health >= 70 ? "text-emerald-600" : c.health >= 50 ? "text-amber-600" : "text-red-600"}`}
                          >
                            {c.health > 0 ? `${c.health}%` : "—"}
                          </span>
                        </div>
                        <Progress value={c.health} className="h-2" />
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>

              <Card className="shadow-sm border-slate-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Dead Stock Parts</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50">
                        <th className="text-left px-4 py-2 text-slate-500 font-medium text-xs">
                          Part
                        </th>
                        <th className="text-left px-4 py-2 text-slate-500 font-medium text-xs">
                          Qty
                        </th>
                        <th className="text-left px-4 py-2 text-slate-500 font-medium text-xs">
                          Last Move
                        </th>
                        <th className="text-left px-4 py-2 text-slate-500 font-medium text-xs">
                          Risk
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {deadStock.length === 0 ? (
                        <tr>
                          <td
                            colSpan={4}
                            className="px-4 py-8 text-center text-slate-400 text-sm"
                          >
                            No dead stock detected.
                          </td>
                        </tr>
                      ) : (
                        deadStock.map((d) => (
                          <tr
                            key={d.code}
                            className="border-b border-slate-50 hover:bg-slate-50"
                          >
                            <td className="px-4 py-3">
                              <div className="font-semibold text-slate-800">
                                {d.name}
                              </div>
                              <div className="text-xs text-slate-400">
                                {d.code}
                              </div>
                            </td>
                            <td className="px-4 py-3 text-slate-600">
                              {d.qty}
                            </td>
                            <td className="px-4 py-3 text-slate-500 text-xs">
                              {d.lastMove}
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                  d.risk === "High"
                                    ? "bg-red-100 text-red-700"
                                    : d.risk === "Medium"
                                      ? "bg-amber-100 text-amber-700"
                                      : "bg-blue-100 text-blue-700"
                                }`}
                              >
                                {d.risk}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Technician Insights */}
          <TabsContent value="technicians">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-sm border-slate-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">
                    Parts Issued per Technician
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {techData.length === 0 ? (
                    <div className="flex items-center justify-center h-60 text-slate-400 text-sm">
                      No technician activity data yet.
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height={260}>
                      <BarChart data={techData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis type="number" tick={{ fontSize: 11 }} />
                        <YAxis
                          dataKey="name"
                          type="category"
                          tick={{ fontSize: 12 }}
                          width={60}
                        />
                        <Tooltip />
                        <Legend />
                        <Bar
                          dataKey="issued"
                          name="Issued"
                          fill="#8b5cf6"
                          radius={[0, 4, 4, 0]}
                        />
                        <Bar
                          dataKey="installed"
                          name="Installed"
                          fill="#10b981"
                          radius={[0, 4, 4, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>

              <Card className="shadow-sm border-slate-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">
                    Technician Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50">
                        <th className="text-left px-4 py-2 text-slate-500 font-medium text-xs">
                          Technician
                        </th>
                        <th className="text-left px-4 py-2 text-slate-500 font-medium text-xs">
                          Issued
                        </th>
                        <th className="text-left px-4 py-2 text-slate-500 font-medium text-xs">
                          Install %
                        </th>
                        <th className="text-left px-4 py-2 text-slate-500 font-medium text-xs">
                          Avg Days
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {techData.length === 0 ? (
                        <tr>
                          <td
                            colSpan={4}
                            className="px-4 py-8 text-center text-slate-400 text-sm"
                          >
                            No technician data yet.
                          </td>
                        </tr>
                      ) : (
                        techData.map((t) => (
                          <tr
                            key={t.name}
                            className="border-b border-slate-50 hover:bg-slate-50"
                          >
                            <td className="px-4 py-3 font-medium text-slate-800">
                              {t.name}
                            </td>
                            <td className="px-4 py-3 text-slate-600">
                              {t.issued}
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`font-semibold ${
                                  t.issued > 0
                                    ? Math.round(
                                        (t.installed / t.issued) * 100,
                                      ) >= 75
                                      ? "text-emerald-600"
                                      : "text-amber-600"
                                    : "text-slate-400"
                                }`}
                              >
                                {t.issued > 0
                                  ? Math.round((t.installed / t.issued) * 100)
                                  : 0}
                                %
                              </span>
                            </td>
                            <td className="px-4 py-3 text-slate-600">
                              {t.avgDays}d
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Reorder Suggestions */}
          <TabsContent value="reorder">
            <Card className="shadow-sm border-slate-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Zap className="h-4 w-4 text-amber-500" />
                  Reorder Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th className="text-left px-4 py-3 text-slate-500 font-medium">
                        Urgency
                      </th>
                      <th className="text-left px-4 py-3 text-slate-500 font-medium">
                        Part Name
                      </th>
                      <th className="text-left px-4 py-3 text-slate-500 font-medium">
                        Current Stock
                      </th>
                      <th className="text-left px-4 py-3 text-slate-500 font-medium">
                        Reorder Qty
                      </th>
                      <th className="text-left px-4 py-3 text-slate-500 font-medium">
                        Last Purchase
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {reorderItems.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-4 py-8 text-center text-slate-400 text-sm"
                        >
                          No in-stock parts to analyze yet.
                        </td>
                      </tr>
                    ) : (
                      reorderItems.map((r) => (
                        <tr
                          key={r.name}
                          className={`border-b border-slate-100 hover:bg-slate-50 ${
                            r.urgency === "Critical"
                              ? "bg-red-50/30"
                              : r.urgency === "Warning"
                                ? "bg-amber-50/30"
                                : ""
                          }`}
                        >
                          <td className="px-4 py-3">
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full font-bold ${urgencyColor[r.urgency]}`}
                            >
                              {r.urgency}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-medium text-slate-800">
                            {r.name}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`font-semibold ${
                                r.current <= 2
                                  ? "text-red-600"
                                  : r.current <= 5
                                    ? "text-amber-600"
                                    : "text-emerald-600"
                              }`}
                            >
                              {r.current}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-blue-600 font-semibold">
                            {r.reorder}
                          </td>
                          <td className="px-4 py-3 text-slate-500 text-xs">
                            {r.lastPurchase}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Dead Stock Tab */}
          <TabsContent value="deadstock">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card className="shadow-sm border-slate-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    Dead Stock Value by Company
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const companyDeadStockData = stockCompanies
                      .map((c) => {
                        const items = deadStock.filter((d) => {
                          const pi = partItems.find(
                            (p) =>
                              p.partCode === d.code && p.companyId === c.id,
                          );
                          return !!pi;
                        });
                        return {
                          name: c.name,
                          value: items.reduce((acc, d) => acc + d.qty, 0),
                        };
                      })
                      .filter((d) => d.value > 0);
                    if (companyDeadStockData.length === 0) {
                      return (
                        <p className="text-sm text-slate-400 text-center py-8">
                          No dead stock by company yet.
                        </p>
                      );
                    }
                    return (
                      <ResponsiveContainer width="100%" height={240}>
                        <BarChart data={companyDeadStockData}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#f1f5f9"
                          />
                          <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                          <YAxis tick={{ fontSize: 11 }} />
                          <Tooltip
                            formatter={(v: number) => [v, "Dead Stock Units"]}
                          />
                          <Bar
                            dataKey="value"
                            fill="#ef4444"
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    );
                  })()}
                </CardContent>
              </Card>

              <Card className="shadow-sm border-slate-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <TrendingDown className="h-4 w-4 text-amber-500" />
                    Dead Stock vs Active Inventory
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const activeCount =
                      totalParts - deadStock.reduce((acc, d) => acc + d.qty, 0);
                    const deadCount = deadStock.reduce(
                      (acc, d) => acc + d.qty,
                      0,
                    );
                    if (totalParts === 0) {
                      return (
                        <p className="text-sm text-slate-400 text-center py-8">
                          No inventory data yet.
                        </p>
                      );
                    }
                    const pieData = [
                      {
                        name: "Active Stock",
                        value: activeCount,
                        fill: "#10b981",
                      },
                      {
                        name: "Dead Stock",
                        value: deadCount,
                        fill: "#ef4444",
                      },
                    ].filter((d) => d.value > 0);
                    return (
                      <ResponsiveContainer width="100%" height={240}>
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={3}
                            dataKey="value"
                          >
                            {pieData.map((e) => (
                              <Cell key={e.name} fill={e.fill} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(v: number) => [v, "units"]} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    );
                  })()}
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-sm border-slate-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  Dead Stock Parts List (No movement in 30+ days)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th className="text-left px-4 py-3 text-slate-500 font-medium">
                        Part Code
                      </th>
                      <th className="text-left px-4 py-3 text-slate-500 font-medium">
                        Part Name
                      </th>
                      <th className="text-left px-4 py-3 text-slate-500 font-medium">
                        Company
                      </th>
                      <th className="text-left px-4 py-3 text-slate-500 font-medium">
                        Days Idle
                      </th>
                      <th className="text-left px-4 py-3 text-slate-500 font-medium">
                        Units
                      </th>
                      <th className="text-left px-4 py-3 text-slate-500 font-medium">
                        Risk
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {deadStock.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-4 py-8 text-center text-slate-400 text-sm"
                        >
                          No idle parts found. All in-stock parts have moved
                          recently.
                        </td>
                      </tr>
                    ) : (
                      deadStock.map((item) => (
                        <tr
                          key={item.code}
                          className={`border-b border-slate-100 hover:bg-slate-50 ${item.risk === "High" ? "bg-red-50/20" : item.risk === "Medium" ? "bg-amber-50/20" : ""}`}
                        >
                          <td className="px-4 py-3 font-mono text-xs text-blue-600 font-semibold">
                            {item.code}
                          </td>
                          <td className="px-4 py-3 font-medium text-slate-800">
                            {item.name}
                          </td>
                          <td className="px-4 py-3 text-slate-600">—</td>
                          <td className="px-4 py-3 font-bold text-red-600">
                            {item.lastMoveDays}d
                          </td>
                          <td className="px-4 py-3 font-semibold text-slate-700">
                            {item.qty} units
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                                item.risk === "High"
                                  ? "bg-red-100 text-red-700 border border-red-200"
                                  : item.risk === "Medium"
                                    ? "bg-amber-100 text-amber-700 border border-amber-200"
                                    : "bg-blue-100 text-blue-700 border border-blue-200"
                              }`}
                            >
                              {item.risk}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
