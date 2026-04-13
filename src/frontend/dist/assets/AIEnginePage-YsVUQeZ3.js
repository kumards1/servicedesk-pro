import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, P as Primitive, a as cn, u as useStore, C as CircleCheckBig, B as Brain, T as TriangleAlert, Z as Zap, b as Tabs, d as TabsList, e as TabsTrigger, f as TrendingUp, A as Activity, U as Users, R as RotateCcw, L as LayoutDashboard, g as TabsContent, h as TrendingDown, i as Card, k as CardHeader, l as CardTitle, m as CardContent, n as ResponsiveContainer, o as PieChart, p as Pie, q as Cell, s as Tooltip, t as Legend, v as Bar, S as Sparkles } from "./index-De7Q6SQO.js";
import { R as RefreshCw } from "./refresh-cw-BD-tKuOV.js";
import { L as LineChart, C as CartesianGrid, X as XAxis, Y as YAxis, a as Line, B as BarChart } from "./BarChart-C1eB9hwZ.js";
import { L as LoaderCircle } from "./loader-circle-DmS6SyYs.js";
import { L as Lightbulb } from "./lightbulb-_pEmTAiV.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "20", height: "5", x: "2", y: "3", rx: "1", key: "1wp1u1" }],
  ["path", { d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8", key: "1s80jp" }],
  ["path", { d: "M10 12h4", key: "a56b0p" }]
];
const Archive = createLucideIcon("archive", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M17 20v2", key: "1rnc9c" }],
  ["path", { d: "M17 2v2", key: "11trls" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M2 17h2", key: "7oei6x" }],
  ["path", { d: "M2 7h2", key: "asdhe0" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "M20 17h2", key: "1fpfkl" }],
  ["path", { d: "M20 7h2", key: "1o8tra" }],
  ["path", { d: "M7 20v2", key: "4gnj0m" }],
  ["path", { d: "M7 2v2", key: "1i4yhu" }],
  ["rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", key: "1vbyd7" }],
  ["rect", { x: "8", y: "8", width: "8", height: "8", rx: "1", key: "z9xiuo" }]
];
const Cpu = createLucideIcon("cpu", __iconNode);
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext3(rootComponentName, defaultContext) {
    const BaseContext = reactExports.createContext(defaultContext);
    BaseContext.displayName = rootComponentName + "Context";
    const index = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    const Provider = (props) => {
      var _a;
      const { scope, children, ...context } = props;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const value = reactExports.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Context.Provider, { value, children });
    };
    Provider.displayName = rootComponentName + "Provider";
    function useContext2(consumerName, scope) {
      var _a;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const context = reactExports.useContext(Context);
      if (context) return context;
      if (defaultContext !== void 0) return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return [Provider, useContext2];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return reactExports.createContext(defaultContext);
    });
    return function useScope(scope) {
      const contexts = (scope == null ? void 0 : scope[scopeName]) || scopeContexts;
      return reactExports.useMemo(
        () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
        [scope, contexts]
      );
    };
  };
  createScope.scopeName = scopeName;
  return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1) return baseScope;
  const createScope = () => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes2, ...currentScope };
      }, {});
      return reactExports.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    };
  };
  createScope.scopeName = baseScope.scopeName;
  return createScope;
}
var PROGRESS_NAME = "Progress";
var DEFAULT_MAX = 100;
var [createProgressContext] = createContextScope(PROGRESS_NAME);
var [ProgressProvider, useProgressContext] = createProgressContext(PROGRESS_NAME);
var Progress$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeProgress,
      value: valueProp = null,
      max: maxProp,
      getValueLabel = defaultGetValueLabel,
      ...progressProps
    } = props;
    if ((maxProp || maxProp === 0) && !isValidMaxNumber(maxProp)) {
      console.error(getInvalidMaxError(`${maxProp}`, "Progress"));
    }
    const max = isValidMaxNumber(maxProp) ? maxProp : DEFAULT_MAX;
    if (valueProp !== null && !isValidValueNumber(valueProp, max)) {
      console.error(getInvalidValueError(`${valueProp}`, "Progress"));
    }
    const value = isValidValueNumber(valueProp, max) ? valueProp : null;
    const valueLabel = isNumber(value) ? getValueLabel(value, max) : void 0;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressProvider, { scope: __scopeProgress, value, max, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "aria-valuemax": max,
        "aria-valuemin": 0,
        "aria-valuenow": isNumber(value) ? value : void 0,
        "aria-valuetext": valueLabel,
        role: "progressbar",
        "data-state": getProgressState(value, max),
        "data-value": value ?? void 0,
        "data-max": max,
        ...progressProps,
        ref: forwardedRef
      }
    ) });
  }
);
Progress$1.displayName = PROGRESS_NAME;
var INDICATOR_NAME = "ProgressIndicator";
var ProgressIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeProgress, ...indicatorProps } = props;
    const context = useProgressContext(INDICATOR_NAME, __scopeProgress);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": getProgressState(context.value, context.max),
        "data-value": context.value ?? void 0,
        "data-max": context.max,
        ...indicatorProps,
        ref: forwardedRef
      }
    );
  }
);
ProgressIndicator.displayName = INDICATOR_NAME;
function defaultGetValueLabel(value, max) {
  return `${Math.round(value / max * 100)}%`;
}
function getProgressState(value, maxValue) {
  return value == null ? "indeterminate" : value === maxValue ? "complete" : "loading";
}
function isNumber(value) {
  return typeof value === "number";
}
function isValidMaxNumber(max) {
  return isNumber(max) && !isNaN(max) && max > 0;
}
function isValidValueNumber(value, max) {
  return isNumber(value) && !isNaN(value) && value <= max && value >= 0;
}
function getInvalidMaxError(propValue, componentName) {
  return `Invalid prop \`max\` of value \`${propValue}\` supplied to \`${componentName}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`;
}
function getInvalidValueError(propValue, componentName) {
  return `Invalid prop \`value\` of value \`${propValue}\` supplied to \`${componentName}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var Root = Progress$1;
var Indicator = ProgressIndicator;
function Progress({
  className,
  value,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "progress",
      className: cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Indicator,
        {
          "data-slot": "progress-indicator",
          className: "bg-primary h-full w-full flex-1 transition-all",
          style: { transform: `translateX(-${100 - (value || 0)}%)` }
        }
      )
    }
  );
}
const AI_CACHE_KEY = "sd_ai_insights_cache";
const AI_CACHE_TIME_KEY = "sd_ai_insights_cache_time";
const AI_CACHE_TTL_MS = 60 * 60 * 1e3;
function loadCachedAI() {
  try {
    const raw = localStorage.getItem(AI_CACHE_KEY);
    const timeRaw = localStorage.getItem(AI_CACHE_TIME_KEY);
    if (!raw || !timeRaw) return null;
    const time = Number(timeRaw);
    if (Date.now() - time > AI_CACHE_TTL_MS) return null;
    return { data: JSON.parse(raw), time };
  } catch {
    return null;
  }
}
function saveCachedAI(data) {
  try {
    localStorage.setItem(AI_CACHE_KEY, JSON.stringify(data));
    localStorage.setItem(AI_CACHE_TIME_KEY, String(Date.now()));
  } catch {
  }
}
function HealthGauge({ score }) {
  const color = score >= 71 ? "#10b981" : score >= 41 ? "#f59e0b" : "#ef4444";
  const label = score >= 71 ? "Excellent" : score >= 41 ? "Moderate" : "At Risk";
  const radius = 54;
  const circumference = Math.PI * radius;
  const dashArray = circumference;
  const dashOffset = circumference - score / 100 * circumference;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-36 h-20 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 120 60", className: "w-full h-full", role: "img", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("title", { children: [
          "Health score: ",
          score
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M 10 60 A 50 50 0 0 1 110 60",
            fill: "none",
            stroke: "#e2e8f0",
            strokeWidth: "10",
            strokeLinecap: "round"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M 10 60 A 50 50 0 0 1 110 60",
            fill: "none",
            stroke: color,
            strokeWidth: "10",
            strokeLinecap: "round",
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
            style: { transition: "stroke-dashoffset 1s ease" }
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-end pb-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "text-2xl font-extrabold leading-none",
            style: { color },
            children: score
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium", children: label })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Overall Health Score" })
  ] });
}
const URGENCY_CONFIG = {
  critical: {
    border: "border-l-rose-500",
    bg: "bg-rose-50",
    badge: "bg-rose-100 text-rose-700 border-rose-200",
    icon: TriangleAlert
  },
  high: {
    border: "border-l-orange-500",
    bg: "bg-orange-50",
    badge: "bg-orange-100 text-orange-700 border-orange-200",
    icon: TriangleAlert
  },
  medium: {
    border: "border-l-amber-400",
    bg: "bg-amber-50",
    badge: "bg-amber-100 text-amber-700 border-amber-200",
    icon: Zap
  },
  low: {
    border: "border-l-blue-400",
    bg: "bg-blue-50",
    badge: "bg-blue-100 text-blue-700 border-blue-200",
    icon: Lightbulb
  },
  positive: {
    border: "border-l-emerald-500",
    bg: "bg-emerald-50",
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
    icon: CircleCheckBig
  }
};
function InsightCard({ insight }) {
  const cfg = URGENCY_CONFIG[insight.urgency] ?? URGENCY_CONFIG.low;
  const Icon = cfg.icon;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `${cfg.bg} ${cfg.border} border border-border border-l-4 rounded-xl p-4`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `p-1.5 rounded-lg border ${cfg.badge.replace("text-", "border-")} shrink-0 mt-0.5`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm text-foreground", children: insight.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-xs px-2 py-0.5 rounded-full font-medium border capitalize ${cfg.badge}`,
                children: insight.urgency
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: insight.message })
        ] })
      ] })
    }
  );
}
function AIInsightsSection() {
  const { partItems, cases } = useStore();
  const [aiData, setAiData] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [lastUpdated, setLastUpdated] = reactExports.useState(null);
  const hasFetched = reactExports.useRef(false);
  const buildContext = reactExports.useCallback(() => {
    const now = Date.now();
    const totalCases = cases.length;
    const casesByStatus = {};
    for (const c of cases) {
      casesByStatus[c.status] = (casesByStatus[c.status] ?? 0) + 1;
    }
    const totalInventory = partItems.length;
    const inStock = partItems.filter((p) => p.status === "in_stock").length;
    const issued = partItems.filter((p) => p.status === "issued").length;
    const issueFreq = {};
    for (const p of partItems.filter((p2) => p2.issueDate)) {
      issueFreq[p.partCode] = (issueFreq[p.partCode] ?? 0) + 1;
    }
    const top5Issued = Object.entries(issueFreq).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([code, count]) => ({ code, count }));
    const stockGroups = {};
    for (const p of partItems.filter((p2) => p2.status === "in_stock")) {
      stockGroups[p.partCode] = (stockGroups[p.partCode] ?? 0) + 1;
    }
    const lowStock = Object.entries(stockGroups).filter(([, qty]) => qty <= 2).map(([code, qty]) => ({ code, qty }));
    const deadStock = Object.entries(stockGroups).filter(([code]) => {
      const item = partItems.find(
        (p) => p.partCode === code && p.status === "in_stock"
      );
      if (!item) return false;
      const lastDate = item.issueDate || item.createdAt || "";
      if (!lastDate) return false;
      const days = Math.floor(
        (now - new Date(lastDate).getTime()) / 864e5
      );
      return days >= 30;
    }).map(([code, qty]) => ({ code, qty }));
    return {
      totalCases,
      casesByStatus,
      totalInventory,
      inStock,
      issued,
      top5IssuedParts: top5Issued,
      lowStockParts: lowStock,
      potentialDeadStock: deadStock
    };
  }, [partItems, cases]);
  const generateLocalAI = reactExports.useCallback(() => {
    const ctx = buildContext();
    const now = Date.now();
    const insights = [];
    const demandForecast = [];
    const deadStockItems = [];
    const inStockRatio = ctx.totalInventory > 0 ? ctx.inStock / ctx.totalInventory : 0;
    const closedCaseRatio = ctx.totalCases > 0 ? (ctx.casesByStatus.closed ?? 0) / ctx.totalCases : 1;
    const lowStockPenalty = Math.min(ctx.lowStockParts.length * 3, 20);
    const deadStockPenalty = Math.min(ctx.potentialDeadStock.length * 2, 15);
    const score = Math.round(
      Math.max(
        0,
        Math.min(
          100,
          inStockRatio * 40 + closedCaseRatio * 35 + (ctx.top5IssuedParts.length > 0 ? 15 : 5) + 10 - lowStockPenalty - deadStockPenalty
        )
      )
    );
    for (const { code, count } of ctx.top5IssuedParts.slice(0, 5)) {
      const inStockQty = partItems.filter(
        (p) => p.partCode === code && p.status === "in_stock"
      ).length;
      const urgency = inStockQty === 0 ? "critical" : inStockQty <= 2 ? "high" : inStockQty <= 4 ? "medium" : "low";
      demandForecast.push({
        partCode: code,
        recommendation: inStockQty === 0 ? `Out of stock! Issued ${count} times. Reorder immediately.` : inStockQty <= 2 ? `Only ${inStockQty} left. Issued ${count} times recently. Reorder soon.` : `${inStockQty} in stock. Issued ${count} times. Monitor closely.`,
        urgency
      });
    }
    for (const { code } of ctx.potentialDeadStock.slice(0, 5)) {
      const item = partItems.find(
        (p) => p.partCode === code && p.status === "in_stock"
      );
      if (!item) continue;
      const lastDate = item.issueDate || item.createdAt || "";
      const days = lastDate ? Math.floor((now - new Date(lastDate).getTime()) / 864e5) : 0;
      deadStockItems.push({
        partCode: code,
        daysIdle: days,
        suggestedAction: days >= 90 ? "Consider returning to vendor — no movement in 3+ months." : days >= 60 ? "Flag for clearance — idle for 2+ months." : "Monitor — no movement in 30+ days."
      });
    }
    if (ctx.lowStockParts.length > 0) {
      insights.push({
        title: `${ctx.lowStockParts.length} Part${ctx.lowStockParts.length > 1 ? "s" : ""} Critically Low`,
        message: `Parts ${ctx.lowStockParts.slice(0, 3).map((p) => p.code).join(
          ", "
        )}${ctx.lowStockParts.length > 3 ? " and more" : ""} have ≤2 units remaining. Place reorder now to avoid service delays.`,
        urgency: "critical"
      });
    }
    if (ctx.potentialDeadStock.length > 0) {
      insights.push({
        title: "Dead Stock Detected",
        message: `${ctx.potentialDeadStock.length} part type${ctx.potentialDeadStock.length > 1 ? "s have" : " has"} not moved in 30+ days. Review for vendor returns or clearance to free up warehouse space.`,
        urgency: "high"
      });
    }
    const openCases = ctx.totalCases - (ctx.casesByStatus.closed ?? 0);
    const partRequiredCases = ctx.casesByStatus.part_required ?? 0;
    if (partRequiredCases > 0) {
      insights.push({
        title: `${partRequiredCases} Case${partRequiredCases > 1 ? "s" : ""} Awaiting Parts`,
        message: `${partRequiredCases} active case${partRequiredCases > 1 ? "s require" : " requires"} parts. Ensure pending part requests are issued promptly to meet SLA targets.`,
        urgency: partRequiredCases >= 3 ? "high" : "medium"
      });
    }
    if (ctx.top5IssuedParts.length > 0) {
      const top = ctx.top5IssuedParts[0];
      insights.push({
        title: "High Demand Part Identified",
        message: `Part ${top.code} is the most issued part with ${top.count} issuances. Ensure adequate stock levels are maintained to support field operations.`,
        urgency: "medium"
      });
    }
    if (openCases > 0 && ctx.totalCases > 0) {
      const closedPct = Math.round(
        (ctx.casesByStatus.closed ?? 0) / ctx.totalCases * 100
      );
      if (closedPct >= 70) {
        insights.push({
          title: "Case Resolution Rate Strong",
          message: `${closedPct}% of all cases are closed. Your team is maintaining healthy resolution rates. Keep up the momentum.`,
          urgency: "positive"
        });
      } else if (closedPct < 40) {
        insights.push({
          title: "Case Backlog Building",
          message: `Only ${closedPct}% of cases are resolved. ${openCases} cases remain open. Consider reviewing technician workloads and part availability.`,
          urgency: "high"
        });
      }
    }
    if (ctx.totalInventory > 0 && ctx.inStock > 0 && insights.length < 3) {
      insights.push({
        title: "Inventory Snapshot",
        message: `${ctx.inStock} of ${ctx.totalInventory} total units are currently in stock. ${ctx.issued} units are issued to technicians in the field.`,
        urgency: "low"
      });
    }
    return {
      overallHealthScore: score,
      insights,
      demandForecast,
      deadStock: deadStockItems,
      summary: `Analysis covers ${ctx.totalInventory} inventory items and ${ctx.totalCases} cases.`
    };
  }, [buildContext, partItems]);
  const fetchAI = reactExports.useCallback(
    async (forceRefresh = false) => {
      if (loading) return;
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
        await new Promise(
          (r) => setTimeout(r, 200 + Math.floor(Math.random() * 600))
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
    [loading, generateLocalAI]
  );
  reactExports.useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchAI(false);
    }
  }, [fetchAI]);
  const timeAgo = lastUpdated ? (() => {
    const diff = Math.floor((Date.now() - lastUpdated) / 6e4);
    if (diff < 1) return "just now";
    if (diff === 1) return "1 minute ago";
    if (diff < 60) return `${diff} minutes ago`;
    return `${Math.floor(diff / 60)} hour${Math.floor(diff / 60) > 1 ? "s" : ""} ago`;
  })() : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl shadow-sm overflow-hidden mb-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-700 text-white px-6 py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-white/20 rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-bold", children: "AI-Powered Insights" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-violet-200 text-xs", children: "Real-time analysis of your inventory and case data" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 shrink-0", children: [
        timeAgo && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-violet-300 hidden sm:block", children: [
          "Updated ",
          timeAgo
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => fetchAI(true),
            disabled: loading,
            className: "flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg transition-colors text-xs font-medium disabled:opacity-60",
            "data-ocid": "ai-engine.refresh-button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                RefreshCw,
                {
                  className: `h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`
                }
              ),
              loading ? "Analyzing..." : "Refresh"
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-10 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-violet-500" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "AI is analyzing your data..." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: [0, 1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "h-2 w-12 bg-violet-100 rounded-full overflow-hidden",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-full bg-violet-400 rounded-full animate-pulse",
              style: { animationDelay: `${i * 150}ms` }
            }
          )
        },
        i
      )) })
    ] }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 text-amber-600 mt-0.5 shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-amber-800", children: error }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => fetchAI(true),
            className: "text-xs text-amber-700 underline mt-1",
            children: "Try again"
          }
        )
      ] })
    ] }) : aiData ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center md:border-r border-border pr-0 md:pr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HealthGauge, { score: aiData.overallHealthScore }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
          aiData.summary && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-3 italic", children: aiData.summary }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: aiData.insights.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-4 text-muted-foreground text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-6 w-6 mx-auto mb-1 text-emerald-400" }),
            "No critical insights — system looks healthy!"
          ] }) : aiData.insights.map((insight) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            InsightCard,
            {
              insight
            },
            `${insight.title}-${insight.urgency}`
          )) })
        ] })
      ] }),
      aiData.demandForecast.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground mb-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4 text-violet-500" }),
          "Demand Forecast Recommendations"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-border rounded-xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/50 border-b border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Part Code" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Recommendation" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Urgency" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: aiData.demandForecast.map((item) => {
            const urgencyCls = {
              critical: "bg-rose-100 text-rose-700 border-rose-200",
              high: "bg-orange-100 text-orange-700 border-orange-200",
              medium: "bg-amber-100 text-amber-700 border-amber-200",
              low: "bg-sky-100 text-sky-700 border-sky-200"
            };
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: "hover:bg-muted/30 transition-colors",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono font-semibold text-xs text-indigo-700", children: item.partCode }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-sm text-muted-foreground", children: item.recommendation }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `text-xs px-2 py-0.5 rounded-full font-semibold border capitalize ${urgencyCls[item.urgency]}`,
                      children: item.urgency
                    }
                  ) })
                ]
              },
              item.partCode
            );
          }) })
        ] }) })
      ] }),
      aiData.deadStock.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground mb-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Archive, { className: "h-4 w-4 text-rose-500" }),
          "Dead Stock Alerts"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3", children: aiData.deadStock.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-rose-50 border border-rose-200 rounded-xl p-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-xs text-rose-700", children: item.partCode }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full font-semibold border border-rose-200", children: [
                  item.daysIdle,
                  "d idle"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-rose-800 leading-relaxed", children: item.suggestedAction })
            ]
          },
          item.partCode
        )) })
      ] })
    ] }) : null })
  ] });
}
function AIEnginePage() {
  var _a, _b, _c, _d, _e;
  const { partItems, stockCompanies, technicians, cases } = useStore();
  const [refreshing, setRefreshing] = reactExports.useState(false);
  const totalParts = partItems.length;
  const inStock = partItems.filter((p) => p.status === "in_stock").length;
  const issued = partItems.filter((p) => p.status === "issued").length;
  const installed = partItems.filter((p) => p.status === "installed").length;
  const returned = partItems.filter(
    (p) => p.status === "returned_to_company"
  ).length;
  const healthScore = totalParts > 0 ? Math.round((inStock + installed) / totalParts * 100) : 0;
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };
  const forecastData = (() => {
    const issuedParts = partItems.filter((p) => p.issueDate);
    if (issuedParts.length === 0) return [];
    const map = {};
    for (const p of issuedParts) {
      const d = new Date(p.issueDate || "");
      if (Number.isNaN(d.getTime())) continue;
      const key = d.toLocaleString("en-US", {
        month: "short",
        year: "2-digit"
      });
      if (!map[key]) map[key] = {};
      const code = p.partCode || "Other";
      map[key][code] = (map[key][code] || 0) + 1;
    }
    return Object.entries(map).map(([month, parts]) => ({ month, ...parts }));
  })();
  const stockVsDemand = stockCompanies.map((c) => {
    const companyParts = partItems.filter((p) => p.companyId === c.id);
    const stockCount = companyParts.filter(
      (p) => p.status === "in_stock"
    ).length;
    const demandCount = companyParts.filter(
      (p) => p.status === "issued" || p.status === "installed"
    ).length;
    return { company: c.name, stock: stockCount, demand: demandCount };
  }).filter((d) => d.stock > 0 || d.demand > 0);
  const statusDistribution = [
    { name: "In Warehouse", value: inStock, fill: "#10b981" },
    { name: "Issued", value: issued, fill: "#f59e0b" },
    { name: "Installed", value: installed, fill: "#3b82f6" },
    { name: "Returned", value: returned, fill: "#ef4444" }
  ];
  const companyHealth = stockCompanies.slice(0, 6).map((c) => {
    const compParts = partItems.filter((p) => p.companyId === c.id);
    const total = compParts.length;
    const healthy = compParts.filter(
      (p) => p.status === "in_stock" || p.status === "installed"
    ).length;
    return {
      name: c.name,
      health: total > 0 ? Math.round(healthy / total * 100) : 0
    };
  }).filter(
    (c) => c.health > 0 || partItems.some(
      (p) => {
        var _a2;
        return p.companyId === ((_a2 = stockCompanies.find((sc) => sc.name === c.name)) == null ? void 0 : _a2.id);
      }
    )
  );
  const deadStock = (() => {
    const now = Date.now();
    const groups = {};
    for (const p of partItems.filter((p2) => p2.status === "in_stock")) {
      const lastDate = p.issueDate || p.createdAt || "";
      const days = lastDate ? Math.floor((now - new Date(lastDate).getTime()) / 864e5) : 0;
      if (days < 14) continue;
      const key = p.partCode;
      if (!groups[key])
        groups[key] = {
          code: p.partCode,
          name: p.overridePartName || p.partCode,
          qty: 0,
          lastMoveDays: days
        };
      groups[key].qty += 1;
      if (days > groups[key].lastMoveDays) groups[key].lastMoveDays = days;
    }
    return Object.values(groups).map((d) => ({
      ...d,
      lastMove: `${d.lastMoveDays} days ago`,
      risk: d.lastMoveDays >= 45 ? "High" : d.lastMoveDays >= 30 ? "Medium" : "Low"
    })).sort((a, b) => b.lastMoveDays - a.lastMoveDays);
  })();
  const techData = technicians.slice(0, 6).map((t) => {
    const tParts = partItems.filter((p) => p.technicianId === t.id);
    const issuedCount = tParts.filter(
      (p) => p.status === "issued" || p.status === "installed" || p.status === "returned_to_company"
    ).length;
    const installedCount = tParts.filter(
      (p) => p.status === "installed"
    ).length;
    return {
      name: t.name.split(" ")[0],
      issued: issuedCount,
      installed: installedCount,
      avgDays: 0
    };
  }).filter((t) => t.issued > 0);
  const reorderItems = (() => {
    const groups = {};
    for (const p of partItems.filter((p2) => p2.status === "in_stock")) {
      const key = p.partCode;
      if (!groups[key])
        groups[key] = {
          name: p.overridePartName || p.partCode,
          current: 0,
          lastPurchase: p.createdAt || ""
        };
      groups[key].current += 1;
    }
    return Object.entries(groups).map(([, v]) => ({
      name: v.name,
      current: v.current,
      reorder: 5,
      lastPurchase: v.lastPurchase ? new Date(v.lastPurchase).toLocaleDateString("en-IN") : "N/A",
      urgency: v.current <= 2 ? "Critical" : v.current <= 4 ? "Warning" : "OK"
    })).sort((a, b) => a.current - b.current);
  })();
  const urgencyColor = {
    Critical: "bg-red-100 text-red-700 border border-red-200",
    Warning: "bg-amber-100 text-amber-700 border border-amber-200",
    OK: "bg-emerald-100 text-emerald-700 border border-emerald-200"
  };
  const kpiCards = [
    {
      label: "Stock Health Score",
      value: totalParts > 0 ? `${healthScore}%` : "—",
      icon: CircleCheckBig,
      color: "from-emerald-500 to-teal-600",
      trend: totalParts > 0 ? healthScore >= 70 ? "Good" : "Low" : "No data",
      up: healthScore >= 70
    },
    {
      label: "In Stock Ratio",
      value: totalParts > 0 ? `${Math.round(inStock / totalParts * 100)}%` : "—",
      icon: Brain,
      color: "from-violet-500 to-purple-600",
      trend: totalParts > 0 ? `${inStock} of ${totalParts} units` : "No data",
      up: inStock > 0
    },
    {
      label: "Dead Stock Risk",
      value: deadStock.length > 0 ? `${deadStock.length} parts` : "None",
      icon: TriangleAlert,
      color: "from-red-500 to-rose-600",
      trend: deadStock.length > 0 ? `${deadStock.filter((d) => d.risk === "High").length} high risk` : "All clear",
      up: deadStock.length === 0
    },
    {
      label: "Reorder Needed",
      value: `${reorderItems.filter((r) => r.urgency !== "OK").length} parts`,
      icon: Zap,
      color: "from-amber-500 to-orange-600",
      trend: reorderItems.filter((r) => r.urgency === "Critical").length > 0 ? "Critical" : "Check stock",
      up: reorderItems.filter((r) => r.urgency !== "OK").length === 0
    }
  ];
  const computedInsights = (() => {
    const insights = [];
    const last30 = Date.now() - 30 * 864e5;
    const recentIssues = partItems.filter(
      (p) => p.issueDate && new Date(p.issueDate).getTime() > last30
    );
    const codeFreq = {};
    for (const p of recentIssues)
      codeFreq[p.partCode] = (codeFreq[p.partCode] || 0) + 1;
    const topDemand = Object.entries(codeFreq).sort((a, b) => b[1] - a[1])[0];
    if (topDemand && topDemand[1] >= 2) {
      insights.push({
        type: "warning",
        title: "High Demand Detected",
        message: `Part ${topDemand[0]} has been issued ${topDemand[1]} times in the last 30 days. Consider restocking soon.`
      });
    }
    if (deadStock.length > 0) {
      insights.push({
        type: "danger",
        title: "Dead Stock Alert",
        message: `${deadStock.length} part type${deadStock.length !== 1 ? "s" : ""} ${deadStock.length !== 1 ? "haven't" : "hasn't"} moved in 30+ days. Consider returning to vendor or marking for clearance.`
      });
    }
    if (totalParts > 0) {
      insights.push({
        type: healthScore >= 70 ? "success" : "warning",
        title: healthScore >= 70 ? "Stock Health Good" : "Stock Health Low",
        message: `Overall warehouse health is at ${healthScore}%. ${healthScore >= 70 ? "Most critical parts are adequately stocked." : "Consider restocking low-inventory items."}`
      });
    }
    const criticalReorder = reorderItems.filter(
      (r) => r.urgency === "Critical"
    );
    if (criticalReorder.length > 0) {
      insights.push({
        type: "danger",
        title: "Critical Reorder Needed",
        message: `${criticalReorder.length} part${criticalReorder.length !== 1 ? "s" : ""} critically low on stock: ${criticalReorder.slice(0, 3).map((r) => r.name).join(", ")}${criticalReorder.length > 3 ? "..." : ""}.`
      });
    }
    const openCases = cases.filter(
      (c) => !["closed", "cancelled"].includes(c.status)
    );
    if (openCases.length > 0) {
      insights.push({
        type: "info",
        title: `${openCases.length} Open Case${openCases.length !== 1 ? "s" : ""}`,
        message: `There ${openCases.length !== 1 ? "are" : "is"} currently ${openCases.length} open case${openCases.length !== 1 ? "s" : ""} in the system${openCases.filter((c) => c.status === "part_required").length > 0 ? `, including ${openCases.filter((c) => c.status === "part_required").length} requiring parts` : ""}.`
      });
    }
    return insights;
  })();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 to-slate-100", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-r from-violet-600 to-purple-700 text-white rounded-2xl px-6 py-6 shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 bg-white/20 rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "AI Engine" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-violet-200 text-sm", children: "Intelligent insights powered by inventory analytics" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: handleRefresh,
          className: "flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl transition-colors text-sm",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              RefreshCw,
              {
                className: `h-4 w-4 ${refreshing ? "animate-spin" : ""}`
              }
            ),
            "Refresh"
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-6 max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AIInsightsSection, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "overview", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl shadow-sm border border-slate-200 p-1 mb-6 inline-flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TabsList, { className: "bg-transparent gap-1", children: [
          "overview",
          "demand",
          "health",
          "technicians",
          "reorder",
          "deadstock"
        ].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          TabsTrigger,
          {
            value: tab,
            className: "capitalize data-[state=active]:bg-violet-600 data-[state=active]:text-white rounded-xl px-4",
            children: tab === "demand" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3.5 w-3.5 mr-1" }),
              "Demand Forecast"
            ] }) : tab === "health" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-3.5 w-3.5 mr-1" }),
              "Stock Health"
            ] }) : tab === "technicians" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5 mr-1" }),
              "Technician Insights"
            ] }) : tab === "reorder" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-3.5 w-3.5 mr-1" }),
              "Reorder"
            ] }) : tab === "deadstock" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Archive, { className: "h-3.5 w-3.5 mr-1" }),
              "Dead Stock"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "h-3.5 w-3.5 mr-1" }),
              "Overview"
            ] })
          },
          tab
        )) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "overview", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6", children: kpiCards.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `bg-gradient-to-br ${k.color} rounded-2xl p-5 text-white shadow-sm`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 text-xs font-medium", children: k.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold mt-2", children: k.value })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(k.icon, { className: "h-5 w-5" }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-3", children: [
                  k.up ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "h-3 w-3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium", children: k.trend })
                ] })
              ]
            },
            k.label
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm border-slate-200", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 bg-amber-100 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3.5 w-3.5 text-amber-600" }) }),
                "Computed Insights"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3", children: computedInsights.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-6 text-slate-400 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { className: "h-8 w-8 mx-auto mb-2 opacity-30" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No insights yet — add inventory and cases to get analysis." })
              ] }) : computedInsights.map((insight) => {
                const colorMap = {
                  warning: {
                    bg: "bg-amber-50 border-amber-200",
                    title: "text-amber-800",
                    text: "text-amber-700",
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4 text-amber-600" })
                  },
                  danger: {
                    bg: "bg-red-50 border-red-200",
                    title: "text-red-800",
                    text: "text-red-700",
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 text-red-600" })
                  },
                  success: {
                    bg: "bg-emerald-50 border-emerald-200",
                    title: "text-emerald-800",
                    text: "text-emerald-700",
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-4 w-4 text-emerald-600" })
                  },
                  info: {
                    bg: "bg-blue-50 border-blue-200",
                    title: "text-blue-800",
                    text: "text-blue-700",
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4 text-blue-600" })
                  }
                };
                const c = colorMap[insight.type];
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: `${c.bg} border rounded-xl p-4`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                        c.icon,
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: `font-semibold text-sm ${c.title}`,
                            children: insight.title
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-sm ${c.text}`, children: insight.message })
                    ]
                  },
                  `insight-${insight.title}`
                );
              }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm border-slate-200", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm", children: "Status Distribution" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: totalParts === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-[220px] text-slate-400 text-sm", children: "No inventory data yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Pie,
                  {
                    data: statusDistribution,
                    cx: "50%",
                    cy: "50%",
                    innerRadius: 60,
                    outerRadius: 90,
                    paddingAngle: 3,
                    dataKey: "value",
                    children: statusDistribution.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: entry.fill }, entry.name))
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { formatter: (v, n) => [v, n] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {})
              ] }) }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm border-slate-200 col-span-1 lg:col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 bg-violet-100 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5 text-violet-600" }) }),
                "Most Active Technician"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: techData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-400 text-center py-6", children: "No technician activity data yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-md flex-shrink-0", children: ((_b = (_a = techData[0]) == null ? void 0 : _a.name) == null ? void 0 : _b[0]) ?? "?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-slate-800 text-base", children: ((_c = techData[0]) == null ? void 0 : _c.name) ?? "—" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-slate-500", children: [
                    ((_d = techData[0]) == null ? void 0 : _d.issued) ?? 0,
                    " parts issued •",
                    " ",
                    ((_e = techData[0]) == null ? void 0 : _e.installed) ?? 0,
                    " installed"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-violet-100 text-violet-700 border border-violet-200", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3 w-3" }),
                    "High Activity"
                  ] }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4 text-center", children: techData.slice(0, 4).map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: `rounded-xl px-4 py-2 ${i === 0 ? "bg-violet-50 border border-violet-200" : "bg-slate-50 border border-slate-100"}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: `font-bold text-sm ${i === 0 ? "text-violet-700" : "text-slate-700"}`,
                          children: t.name
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-slate-500", children: [
                        t.issued,
                        " parts"
                      ] })
                    ]
                  },
                  t.name
                )) })
              ] }) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "demand", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm border-slate-200", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm", children: "Monthly Demand Forecast (Top Parts)" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: forecastData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-60 text-slate-400 text-sm", children: "No issue history to forecast from." }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 280, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: forecastData, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#f1f5f9" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "month", tick: { fontSize: 12 } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: { fontSize: 12 } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {}),
              (() => {
                const codeTotals = {};
                for (const row of forecastData) {
                  for (const [k, v] of Object.entries(row)) {
                    if (k === "month") continue;
                    codeTotals[k] = (codeTotals[k] || 0) + (Number(v) || 0);
                  }
                }
                const colors = ["#8b5cf6", "#06b6d4", "#f59e0b"];
                return Object.entries(codeTotals).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([code], i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Line,
                  {
                    type: "monotone",
                    dataKey: code,
                    stroke: colors[i],
                    strokeWidth: 2,
                    dot: { r: 4 }
                  },
                  code
                ));
              })()
            ] }) }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm border-slate-200", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm", children: "Current Stock vs Predicted Demand" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: stockVsDemand.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-[280px] text-slate-400 text-sm", children: "No stock or demand data yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 280, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: stockVsDemand, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#f1f5f9" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "company", tick: { fontSize: 12 } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: { fontSize: 12 } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Bar,
                {
                  dataKey: "stock",
                  name: "Current Stock",
                  fill: "#10b981",
                  radius: [4, 4, 0, 0]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Bar,
                {
                  dataKey: "demand",
                  name: "Predicted Demand",
                  fill: "#f59e0b",
                  radius: [4, 4, 0, 0]
                }
              )
            ] }) }) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "health", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm border-slate-200", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm", children: "Company Stock Health" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-4", children: companyHealth.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-400 text-center py-6", children: "No company stock data yet." }) : companyHealth.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-slate-700", children: c.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `font-bold ${c.health >= 70 ? "text-emerald-600" : c.health >= 50 ? "text-amber-600" : "text-red-600"}`,
                    children: c.health > 0 ? `${c.health}%` : "—"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: c.health, className: "h-2" })
            ] }, c.name)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm border-slate-200", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm", children: "Dead Stock Parts" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-slate-100 bg-slate-50", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-slate-500 font-medium text-xs", children: "Part" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-slate-500 font-medium text-xs", children: "Qty" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-slate-500 font-medium text-xs", children: "Last Move" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-slate-500 font-medium text-xs", children: "Risk" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: deadStock.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "td",
                {
                  colSpan: 4,
                  className: "px-4 py-8 text-center text-slate-400 text-sm",
                  children: "No dead stock detected."
                }
              ) }) : deadStock.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: "border-b border-slate-50 hover:bg-slate-50",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-slate-800", children: d.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-400", children: d.code })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-slate-600", children: d.qty }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-slate-500 text-xs", children: d.lastMove }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `text-xs px-2 py-0.5 rounded-full font-medium ${d.risk === "High" ? "bg-red-100 text-red-700" : d.risk === "Medium" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`,
                        children: d.risk
                      }
                    ) })
                  ]
                },
                d.code
              )) })
            ] }) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "technicians", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm border-slate-200", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm", children: "Parts Issued per Technician" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: techData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-60 text-slate-400 text-sm", children: "No technician activity data yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 260, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: techData, layout: "vertical", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#f1f5f9" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { type: "number", tick: { fontSize: 11 } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                YAxis,
                {
                  dataKey: "name",
                  type: "category",
                  tick: { fontSize: 12 },
                  width: 60
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Bar,
                {
                  dataKey: "issued",
                  name: "Issued",
                  fill: "#8b5cf6",
                  radius: [0, 4, 4, 0]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Bar,
                {
                  dataKey: "installed",
                  name: "Installed",
                  fill: "#10b981",
                  radius: [0, 4, 4, 0]
                }
              )
            ] }) }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm border-slate-200", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm", children: "Technician Performance" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-slate-100 bg-slate-50", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-slate-500 font-medium text-xs", children: "Technician" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-slate-500 font-medium text-xs", children: "Issued" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-slate-500 font-medium text-xs", children: "Install %" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-slate-500 font-medium text-xs", children: "Avg Days" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: techData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "td",
                {
                  colSpan: 4,
                  className: "px-4 py-8 text-center text-slate-400 text-sm",
                  children: "No technician data yet."
                }
              ) }) : techData.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: "border-b border-slate-50 hover:bg-slate-50",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-slate-800", children: t.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-slate-600", children: t.issued }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: `font-semibold ${t.issued > 0 ? Math.round(
                          t.installed / t.issued * 100
                        ) >= 75 ? "text-emerald-600" : "text-amber-600" : "text-slate-400"}`,
                        children: [
                          t.issued > 0 ? Math.round(t.installed / t.issued * 100) : 0,
                          "%"
                        ]
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-slate-600", children: [
                      t.avgDays,
                      "d"
                    ] })
                  ]
                },
                t.name
              )) })
            ] }) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "reorder", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm border-slate-200", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4 text-amber-500" }),
            "Reorder Suggestions"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-slate-200 bg-slate-50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-slate-500 font-medium", children: "Urgency" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-slate-500 font-medium", children: "Part Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-slate-500 font-medium", children: "Current Stock" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-slate-500 font-medium", children: "Reorder Qty" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-slate-500 font-medium", children: "Last Purchase" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: reorderItems.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "td",
              {
                colSpan: 5,
                className: "px-4 py-8 text-center text-slate-400 text-sm",
                children: "No in-stock parts to analyze yet."
              }
            ) }) : reorderItems.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: `border-b border-slate-100 hover:bg-slate-50 ${r.urgency === "Critical" ? "bg-red-50/30" : r.urgency === "Warning" ? "bg-amber-50/30" : ""}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `text-xs px-2 py-0.5 rounded-full font-bold ${urgencyColor[r.urgency]}`,
                      children: r.urgency
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-slate-800", children: r.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `font-semibold ${r.current <= 2 ? "text-red-600" : r.current <= 5 ? "text-amber-600" : "text-emerald-600"}`,
                      children: r.current
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-blue-600 font-semibold", children: r.reorder }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-slate-500 text-xs", children: r.lastPurchase })
                ]
              },
              r.name
            )) })
          ] }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "deadstock", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm border-slate-200", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 text-red-500" }),
                "Dead Stock Value by Company"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: (() => {
                const companyDeadStockData = stockCompanies.map((c) => {
                  const items = deadStock.filter((d) => {
                    const pi = partItems.find(
                      (p) => p.partCode === d.code && p.companyId === c.id
                    );
                    return !!pi;
                  });
                  return {
                    name: c.name,
                    value: items.reduce((acc, d) => acc + d.qty, 0)
                  };
                }).filter((d) => d.value > 0);
                if (companyDeadStockData.length === 0) {
                  return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-400 text-center py-8", children: "No dead stock by company yet." });
                }
                return /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 240, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: companyDeadStockData, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CartesianGrid,
                    {
                      strokeDasharray: "3 3",
                      stroke: "#f1f5f9"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "name", tick: { fontSize: 11 } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: { fontSize: 11 } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Tooltip,
                    {
                      formatter: (v) => [v, "Dead Stock Units"]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Bar,
                    {
                      dataKey: "value",
                      fill: "#ef4444",
                      radius: [4, 4, 0, 0]
                    }
                  )
                ] }) });
              })() })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm border-slate-200", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "h-4 w-4 text-amber-500" }),
                "Dead Stock vs Active Inventory"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: (() => {
                const activeCount = totalParts - deadStock.reduce((acc, d) => acc + d.qty, 0);
                const deadCount = deadStock.reduce(
                  (acc, d) => acc + d.qty,
                  0
                );
                if (totalParts === 0) {
                  return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-400 text-center py-8", children: "No inventory data yet." });
                }
                const pieData = [
                  {
                    name: "Active Stock",
                    value: activeCount,
                    fill: "#10b981"
                  },
                  {
                    name: "Dead Stock",
                    value: deadCount,
                    fill: "#ef4444"
                  }
                ].filter((d) => d.value > 0);
                return /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 240, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Pie,
                    {
                      data: pieData,
                      cx: "50%",
                      cy: "50%",
                      innerRadius: 60,
                      outerRadius: 90,
                      paddingAngle: 3,
                      dataKey: "value",
                      children: pieData.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: e.fill }, e.name))
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { formatter: (v) => [v, "units"] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {})
                ] }) });
              })() })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm border-slate-200", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 text-red-500" }),
              "Dead Stock Parts List (No movement in 30+ days)"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-slate-200 bg-slate-50", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-slate-500 font-medium", children: "Part Code" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-slate-500 font-medium", children: "Part Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-slate-500 font-medium", children: "Company" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-slate-500 font-medium", children: "Days Idle" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-slate-500 font-medium", children: "Units" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-slate-500 font-medium", children: "Risk" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: deadStock.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "td",
                {
                  colSpan: 6,
                  className: "px-4 py-8 text-center text-slate-400 text-sm",
                  children: "No idle parts found. All in-stock parts have moved recently."
                }
              ) }) : deadStock.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: `border-b border-slate-100 hover:bg-slate-50 ${item.risk === "High" ? "bg-red-50/20" : item.risk === "Medium" ? "bg-amber-50/20" : ""}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs text-blue-600 font-semibold", children: item.code }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-slate-800", children: item.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-slate-600", children: "—" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-bold text-red-600", children: [
                      item.lastMoveDays,
                      "d"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-semibold text-slate-700", children: [
                      item.qty,
                      " units"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `text-xs px-2 py-0.5 rounded-full font-bold ${item.risk === "High" ? "bg-red-100 text-red-700 border border-red-200" : item.risk === "Medium" ? "bg-amber-100 text-amber-700 border border-amber-200" : "bg-blue-100 text-blue-700 border border-blue-200"}`,
                        children: item.risk
                      }
                    ) })
                  ]
                },
                item.code
              )) })
            ] }) })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  AIEnginePage as default
};
