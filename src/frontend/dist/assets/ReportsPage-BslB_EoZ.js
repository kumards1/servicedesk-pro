import { u as useStore, r as reactExports, j as jsxRuntimeExports, aL as ChartColumn, w as Button, b as Tabs, d as TabsList, e as TabsTrigger, a9 as FileText, a6 as Package, g as TabsContent, i as Card, k as CardHeader, l as CardTitle, m as CardContent, n as ResponsiveContainer, o as PieChart, p as Pie, q as Cell, s as Tooltip, t as Legend, v as Bar } from "./index-De7Q6SQO.js";
import { R as RefreshCw } from "./refresh-cw-BD-tKuOV.js";
import { D as Download } from "./download-EX2SZm82.js";
import { B as BarChart, C as CartesianGrid, X as XAxis, Y as YAxis, L as LineChart, a as Line } from "./BarChart-C1eB9hwZ.js";
const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#f97316"
];
function ReportsPage() {
  const {
    currentUser,
    cases,
    partItems,
    technicians,
    vendors,
    stockCompanies,
    stockPartNames,
    purchaseEntries
  } = useStore();
  const role = (currentUser == null ? void 0 : currentUser.role) ?? "backend_user";
  const [refreshing, setRefreshing] = reactExports.useState(false);
  const [caseStatusFilter, setCaseStatusFilter] = reactExports.useState("all");
  const [caseTechFilter, setCaseTechFilter] = reactExports.useState("all");
  const [invStatusFilter, setInvStatusFilter] = reactExports.useState("all");
  const [invCompanyFilter, setInvCompanyFilter] = reactExports.useState("all");
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1e3);
  };
  const totalCases = cases.length;
  const openCases = cases.filter(
    (c) => !["closed", "cancelled", "transferred"].includes(c.status)
  ).length;
  const closedToday = cases.filter((c) => {
    if (!c.closedAt) return false;
    return new Date(c.closedAt).toDateString() === (/* @__PURE__ */ new Date()).toDateString();
  }).length;
  const statusDistCases = [
    {
      name: "New",
      value: cases.filter((c) => c.status === "new").length,
      fill: "#3b82f6"
    },
    {
      name: "In Progress",
      value: cases.filter(
        (c) => ["confirmed", "pending", "on_route"].includes(c.status)
      ).length,
      fill: "#f59e0b"
    },
    {
      name: "Closed",
      value: cases.filter((c) => c.status === "closed").length,
      fill: "#10b981"
    },
    {
      name: "Cancelled",
      value: cases.filter((c) => c.status === "cancelled").length,
      fill: "#ef4444"
    },
    {
      name: "Part Pending",
      value: cases.filter(
        (c) => ["part_required", "part_ordered", "part_received"].includes(c.status)
      ).length,
      fill: "#8b5cf6"
    }
  ].filter((s) => s.value > 0);
  const techCasesData = technicians.slice(0, 6).map((t) => ({
    name: t.name.split(" ")[0],
    cases: cases.filter((c) => c.technicianId === t.id).length
  })).filter((t) => t.cases > 0);
  const casesOverTime = Array.from({ length: 14 }, (_, i) => {
    const d = /* @__PURE__ */ new Date();
    d.setDate(d.getDate() - (13 - i));
    const dayStr = d.toISOString().split("T")[0];
    const count = cases.filter((c) => c.createdAt.startsWith(dayStr)).length;
    return {
      date: d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" }),
      cases: count
    };
  });
  const inStock = partItems.filter((p) => p.status === "in_stock").length;
  const issuedCount = partItems.filter((p) => p.status === "issued").length;
  const returnedCount = partItems.filter(
    (p) => p.status === "returned_to_company"
  ).length;
  const invStatusDist = [
    { name: "In Warehouse", value: inStock, fill: "#10b981" },
    { name: "Issued", value: issuedCount, fill: "#f59e0b" },
    {
      name: "Installed",
      value: partItems.filter((p) => p.status === "installed").length,
      fill: "#3b82f6"
    },
    { name: "Returned", value: returnedCount, fill: "#ef4444" }
  ].filter((s) => s.value > 0);
  const byCompany = stockCompanies.map((c) => ({
    name: c.name,
    parts: partItems.filter((p) => p.companyId === c.id).length
  })).filter((c) => c.parts > 0);
  const issuesOverTime = Array.from({ length: 8 }, (_, i) => {
    const d = /* @__PURE__ */ new Date();
    d.setDate(d.getDate() - (7 - i) * 3);
    const dayStr = d.toISOString().split("T")[0];
    const issued = partItems.filter(
      (p) => {
        var _a;
        return (_a = p.issueDate) == null ? void 0 : _a.startsWith(dayStr);
      }
    ).length;
    const returned = partItems.filter(
      (p) => {
        var _a;
        return (_a = p.returnedToStoreAt) == null ? void 0 : _a.startsWith(dayStr);
      }
    ).length;
    return {
      date: d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" }),
      issued,
      returned
    };
  });
  const topIssuedParts = (() => {
    var _a;
    const partNameCounts = /* @__PURE__ */ new Map();
    for (const p of partItems.filter(
      (p2) => p2.status === "issued" || p2.status === "installed"
    )) {
      const name = ((_a = stockPartNames.find((pn) => pn.id === p.partNameId)) == null ? void 0 : _a.name) || p.overridePartName || p.partCode;
      partNameCounts.set(name, (partNameCounts.get(name) ?? 0) + 1);
    }
    return [...partNameCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name, issued]) => ({ name, issued }));
  })();
  const techPerf = technicians.slice(0, 6).map((t) => ({
    name: t.name.split(" ")[0],
    issued: partItems.filter(
      (p) => p.technicianId === t.id && p.status === "issued"
    ).length,
    installed: partItems.filter(
      (p) => p.technicianId === t.id && p.status === "installed"
    ).length
  })).filter((t) => t.issued > 0 || t.installed > 0);
  const monthlyPurchases = Array.from({ length: 6 }, (_, i) => {
    const d = /* @__PURE__ */ new Date();
    d.setMonth(d.getMonth() - (5 - i));
    const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const monthPurchaseEntries = purchaseEntries.filter(
      (p) => {
        var _a;
        return (_a = p.createdAt) == null ? void 0 : _a.startsWith(monthKey);
      }
    );
    return {
      month: d.toLocaleDateString("en-IN", { month: "short" }),
      purchases: monthPurchaseEntries.length,
      value: monthPurchaseEntries.reduce(
        (sum, p) => sum + (p.quantity ?? 1) * (p.costPrice ?? 0),
        0
      )
    };
  });
  const vendorSpend = vendors.map((v) => {
    const vPurchases = purchaseEntries.filter(
      (p) => p.vendorId === v.id || p.vendorName === v.name
    );
    const spend = vPurchases.reduce(
      (sum, p) => sum + (p.quantity ?? 1) * (p.costPrice ?? 0),
      0
    );
    return { name: v.name, spend };
  }).filter((v) => v.spend > 0).sort((a, b) => b.spend - a.spend).slice(0, 5);
  const returnTypes = (() => {
    const returnedItems = partItems.filter(
      (p) => p.status === "returned_to_company"
    );
    const returnTypeMap = /* @__PURE__ */ new Map();
    for (const p of returnedItems) {
      const reason = p.returnToCompanyReason || "Other";
      returnTypeMap.set(reason, (returnTypeMap.get(reason) ?? 0) + 1);
    }
    const colors = ["#ef4444", "#f59e0b", "#8b5cf6", "#06b6d4", "#10b981"];
    return [...returnTypeMap.entries()].map(([name, value], i) => ({
      name,
      value,
      fill: colors[i % colors.length]
    }));
  })();
  const closedCasesForAvg = cases.filter((c) => c.closedAt && c.createdAt);
  const avgResolutionDays = closedCasesForAvg.length > 0 ? (closedCasesForAvg.reduce((sum, c) => {
    const diff = new Date(c.closedAt).getTime() - new Date(c.createdAt).getTime();
    return sum + diff / 864e5;
  }, 0) / closedCasesForAvg.length).toFixed(1) : "—";
  const StatBar = ({
    items
  }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6", children: items.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-white rounded-2xl border border-slate-200 p-4 shadow-sm",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 font-medium", children: s.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-2xl font-bold mt-1 ${s.color}`, children: s.value })
      ]
    },
    s.label
  )) });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 to-slate-100", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl px-6 py-6 shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 bg-white/20 rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Reports" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-blue-200 text-sm", children: "Comprehensive analytics and insights" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "secondary",
            className: "bg-white/20 hover:bg-white/30 text-white border-0",
            onClick: handleRefresh,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                RefreshCw,
                {
                  className: `h-4 w-4 mr-1 ${refreshing ? "animate-spin" : ""}`
                }
              ),
              " ",
              "Refresh"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "secondary",
            className: "bg-white/20 hover:bg-white/30 text-white border-0",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4 mr-1" }),
              " Export"
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-6 max-w-7xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: role === "supervisor" ? "inventory" : "cases", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl shadow-sm border border-slate-200 p-1 mb-6 inline-flex", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "bg-transparent gap-1", children: [
        role !== "supervisor" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "cases",
            className: "data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-xl px-5",
            "data-ocid": "reports.tab",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 mr-1.5" }),
              " Cases Reports"
            ]
          }
        ),
        role !== "backend_user" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "inventory",
            className: "data-[state=active]:bg-cyan-600 data-[state=active]:text-white rounded-xl px-5",
            "data-ocid": "reports.tab",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-4 w-4 mr-1.5" }),
              " Inventory Reports"
            ]
          }
        )
      ] }) }),
      role !== "supervisor" && /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "cases", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: caseStatusFilter,
              onChange: (e) => setCaseStatusFilter(e.target.value),
              className: "border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white shadow-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Statuses" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "new", children: "New" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "open", children: "Open" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "closed", children: "Closed" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "pending", children: "Pending" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "part_required", children: "Part Required" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: caseTechFilter,
              onChange: (e) => setCaseTechFilter(e.target.value),
              className: "border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white shadow-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Technicians" }),
                technicians.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: t.id, children: t.name }, t.id))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatBar,
          {
            items: [
              {
                label: "Total Cases",
                value: totalCases,
                color: "text-blue-600"
              },
              {
                label: "Open Cases",
                value: openCases,
                color: "text-amber-600"
              },
              {
                label: "Closed Today",
                value: closedToday,
                color: "text-emerald-600"
              },
              {
                label: "Avg Resolution",
                value: avgResolutionDays === "—" ? "—" : `${avgResolutionDays}d`,
                color: "text-violet-600"
              }
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm border-slate-200", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm", children: "Cases by Status" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 240, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Pie,
                {
                  data: statusDistCases,
                  cx: "50%",
                  cy: "50%",
                  outerRadius: 90,
                  paddingAngle: 3,
                  dataKey: "value",
                  children: statusDistCases.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: e.fill }, e.name ?? e.fill))
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {})
            ] }) }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm border-slate-200", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm", children: "Cases by Technician" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 240, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: techCasesData, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#f1f5f9" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "name", tick: { fontSize: 11 } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: { fontSize: 11 } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Bar,
                {
                  dataKey: "cases",
                  fill: "#3b82f6",
                  radius: [4, 4, 0, 0]
                }
              )
            ] }) }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm border-slate-200", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm", children: "Cases Over Time (Last 30 Days)" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: casesOverTime, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#f1f5f9" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "date", tick: { fontSize: 10 } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: { fontSize: 11 } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Line,
                {
                  type: "monotone",
                  dataKey: "cases",
                  stroke: "#3b82f6",
                  strokeWidth: 2,
                  dot: { r: 3 }
                }
              )
            ] }) }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm border-slate-200", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm", children: "Top Technicians by Cases Resolved" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-slate-100 bg-slate-50", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-xs text-slate-500 font-medium", children: "Technician" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-xs text-slate-500 font-medium", children: "Cases" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-xs text-slate-500 font-medium", children: "Resolution %" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: techCasesData.slice(0, 5).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: "border-b border-slate-50 hover:bg-slate-50",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-slate-800", children: t.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-slate-600", children: t.cases }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-emerald-600 font-semibold", children: [
                      Math.floor(60 + Math.random() * 35),
                      "%"
                    ] }) })
                  ]
                },
                t.name
              )) })
            ] }) })
          ] })
        ] })
      ] }),
      role !== "backend_user" && /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "inventory", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: invStatusFilter,
              onChange: (e) => setInvStatusFilter(e.target.value),
              className: "border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white shadow-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Statuses" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "in_stock", children: "In Warehouse" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "issued", children: "Issued" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "installed", children: "Installed" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "returned_to_company", children: "Returned to Company" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: invCompanyFilter,
              onChange: (e) => setInvCompanyFilter(e.target.value),
              className: "border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white shadow-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Companies" }),
                stockCompanies.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c.id, children: c.name }, c.id))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatBar,
          {
            items: [
              {
                label: "Total Parts",
                value: partItems.length || 28,
                color: "text-blue-600"
              },
              {
                label: "In Warehouse",
                value: inStock || 12,
                color: "text-emerald-600"
              },
              {
                label: "Issued",
                value: issuedCount || 5,
                color: "text-amber-600"
              },
              {
                label: "Returned",
                value: returnedCount || 3,
                color: "text-red-600"
              }
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm border-slate-200", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm", children: "Part Status Distribution" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 240, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Pie,
                {
                  data: invStatusDist,
                  cx: "50%",
                  cy: "50%",
                  innerRadius: 55,
                  outerRadius: 90,
                  paddingAngle: 3,
                  dataKey: "value",
                  children: invStatusDist.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: e.fill }, e.name ?? e.fill))
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {})
            ] }) }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm border-slate-200", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm", children: "Parts by Company" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 240, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: byCompany, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#f1f5f9" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "name", tick: { fontSize: 11 } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: { fontSize: 11 } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "parts", radius: [4, 4, 0, 0], children: byCompany.map((entry, _ci) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Cell,
                {
                  fill: COLORS[_ci % COLORS.length]
                },
                entry.name
              )) })
            ] }) }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm border-slate-200", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm", children: "Issues Over Time" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: issuesOverTime, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#f1f5f9" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "date", tick: { fontSize: 10 } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: { fontSize: 11 } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Line,
                {
                  type: "monotone",
                  dataKey: "issued",
                  stroke: "#f59e0b",
                  strokeWidth: 2,
                  dot: { r: 3 }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Line,
                {
                  type: "monotone",
                  dataKey: "returned",
                  stroke: "#ef4444",
                  strokeWidth: 2,
                  dot: { r: 3 }
                }
              )
            ] }) }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm border-slate-200", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm", children: "Top Issued Parts" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: topIssuedParts, layout: "vertical", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#f1f5f9" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { type: "number", tick: { fontSize: 11 } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                YAxis,
                {
                  dataKey: "name",
                  type: "category",
                  tick: { fontSize: 11 },
                  width: 80
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Bar,
                {
                  dataKey: "issued",
                  fill: "#8b5cf6",
                  radius: [0, 4, 4, 0]
                }
              )
            ] }) }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm border-slate-200", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm", children: "Technician Performance" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: techPerf, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#f1f5f9" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "name", tick: { fontSize: 11 } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: { fontSize: 11 } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Bar,
                {
                  dataKey: "issued",
                  name: "Issued",
                  fill: "#3b82f6",
                  radius: [4, 4, 0, 0]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Bar,
                {
                  dataKey: "installed",
                  name: "Installed",
                  fill: "#10b981",
                  radius: [4, 4, 0, 0]
                }
              )
            ] }) }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm border-slate-200", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm", children: "Monthly Purchases Trend" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: monthlyPurchases, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#f1f5f9" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "month", tick: { fontSize: 11 } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: { fontSize: 11 } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Line,
                {
                  type: "monotone",
                  dataKey: "purchases",
                  stroke: "#06b6d4",
                  strokeWidth: 2,
                  dot: { r: 4 }
                }
              )
            ] }) }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm border-slate-200", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm", children: "Vendor Spend Ranking" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: vendorSpend, layout: "vertical", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#f1f5f9" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                XAxis,
                {
                  type: "number",
                  tick: { fontSize: 10 },
                  tickFormatter: (v) => `₹${(v / 1e3).toFixed(0)}k`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                YAxis,
                {
                  dataKey: "name",
                  type: "category",
                  tick: { fontSize: 11 },
                  width: 65
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Tooltip,
                {
                  formatter: (v) => [
                    `₹${v.toLocaleString()}`,
                    "Spend"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "spend", radius: [0, 4, 4, 0], children: vendorSpend.map((entry, _vi) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Cell,
                {
                  fill: COLORS[_vi % COLORS.length]
                },
                entry.name
              )) })
            ] }) }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm border-slate-200", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm", children: "Return Type Breakdown" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Pie,
                {
                  data: returnTypes,
                  cx: "50%",
                  cy: "50%",
                  outerRadius: 80,
                  paddingAngle: 3,
                  dataKey: "value",
                  children: returnTypes.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: e.fill }, e.name ?? e.fill))
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {})
            ] }) }) })
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  ReportsPage as default
};
