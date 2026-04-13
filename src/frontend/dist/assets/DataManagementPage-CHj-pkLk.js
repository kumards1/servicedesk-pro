import { c as createLucideIcon, u as useStore, r as reactExports, j as jsxRuntimeExports, T as TriangleAlert, i as Card, k as CardHeader, l as CardTitle, a9 as FileText, ac as Badge, m as CardContent, b as Tabs, d as TabsList, e as TabsTrigger, g as TabsContent, I as Input, w as Button, y as Trash2, a6 as Package, a8 as ClipboardList, ad as ShoppingCart, aa as Bell, ae as GitBranch, R as RotateCcw, C as CircleCheckBig } from "./index-De7Q6SQO.js";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-DQvCZOLE.js";
import { C as Calendar } from "./calendar-CSRezUDQ.js";
import { C as ClipboardCheck } from "./clipboard-check-Cnavb2jK.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
  ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5", key: "1wlel7" }],
  ["path", { d: "M3 12A9 3 0 0 0 21 12", key: "mv7ke4" }]
];
const Database = createLucideIcon("database", __iconNode);
function DataManagementPage() {
  const {
    cases,
    partItems,
    purchaseEntries,
    auditLog,
    notifications,
    partRequests,
    storePilotAuditLogs
  } = useStore();
  const [confirmAction, setConfirmAction] = reactExports.useState(null);
  const [done, setDone] = reactExports.useState(/* @__PURE__ */ new Set());
  const [dateRanges, setDateRanges] = reactExports.useState({});
  const getDateRange = (id) => dateRanges[id] ?? { from: "", to: "" };
  const setDateRange = (id, field, value) => {
    setDateRanges((prev) => ({
      ...prev,
      [id]: { ...getDateRange(id), [field]: value }
    }));
  };
  const handleConfirm = () => {
    if (!confirmAction) return;
    const key = confirmAction.actionKey;
    const store = useStore.getState();
    if (key === "cases_all") {
      useStore.setState({ cases: [] });
      store.saveCasesToBackend().catch(() => {
      });
    } else if (key === "cases_pending") {
      useStore.setState({
        cases: store.cases.filter((c) => c.status !== "pending")
      });
      store.saveCasesToBackend().catch(() => {
      });
    } else if (key === "cases_closed") {
      useStore.setState({
        cases: store.cases.filter((c) => c.status !== "closed")
      });
      store.saveCasesToBackend().catch(() => {
      });
    } else if (key === "cases_cancelled") {
      useStore.setState({
        cases: store.cases.filter((c) => c.status !== "cancelled")
      });
      store.saveCasesToBackend().catch(() => {
      });
    } else if (key === "inv_all") {
      useStore.setState({ partItems: [] });
      store.saveInventoryToBackend().catch(() => {
      });
    } else if (key === "inv_instock") {
      useStore.setState({
        partItems: store.partItems.filter((p) => p.status !== "in_stock")
      });
      store.saveInventoryToBackend().catch(() => {
      });
    } else if (key === "inv_issued") {
      useStore.setState({
        partItems: store.partItems.filter((p) => p.status !== "issued")
      });
      store.saveInventoryToBackend().catch(() => {
      });
    } else if (key === "inv_installed") {
      useStore.setState({
        partItems: store.partItems.filter((p) => p.status !== "installed")
      });
      store.saveInventoryToBackend().catch(() => {
      });
    } else if (key === "inv_returned") {
      useStore.setState({
        partItems: store.partItems.filter(
          (p) => p.status !== "returned_to_company"
        )
      });
      store.saveInventoryToBackend().catch(() => {
      });
    } else if (key === "pr_all") {
      useStore.setState({ partRequests: [] });
      store.saveInventoryToBackend().catch(() => {
      });
    } else if (key === "pr_pending") {
      useStore.setState({
        partRequests: store.partRequests.filter((r) => r.status !== "pending")
      });
      store.saveInventoryToBackend().catch(() => {
      });
    } else if (key === "pr_rejected") {
      useStore.setState({
        partRequests: store.partRequests.filter((r) => r.status !== "rejected")
      });
      store.saveInventoryToBackend().catch(() => {
      });
    } else if (key === "pr_cancelled") {
      useStore.setState({
        partRequests: store.partRequests.filter(
          (r) => r.status !== "cancelled"
        )
      });
      store.saveInventoryToBackend().catch(() => {
      });
    } else if (key === "purchase_all") {
      useStore.setState({ purchaseEntries: [] });
      store.saveInventoryToBackend().catch(() => {
      });
    } else if (key === "audit_all") {
      useStore.setState({ auditLog: [], storePilotAuditLogs: [] });
      store.saveInventoryToBackend().catch(() => {
      });
    } else if (key === "audit_login") {
      useStore.setState({
        storePilotAuditLogs: store.storePilotAuditLogs.filter(
          (l) => l.action !== "LOGIN" && l.action !== "LOGOUT"
        )
      });
      store.saveInventoryToBackend().catch(() => {
      });
    } else if (key === "audit_creates") {
      useStore.setState({
        storePilotAuditLogs: store.storePilotAuditLogs.filter(
          (l) => l.action !== "CREATE"
        )
      });
      store.saveInventoryToBackend().catch(() => {
      });
    } else if (key === "audit_updates") {
      useStore.setState({
        storePilotAuditLogs: store.storePilotAuditLogs.filter(
          (l) => l.action !== "UPDATE" && l.action !== "ISSUE" && l.action !== "RETURN"
        )
      });
      store.saveInventoryToBackend().catch(() => {
      });
    } else if (key === "audit_deletes") {
      useStore.setState({
        storePilotAuditLogs: store.storePilotAuditLogs.filter(
          (l) => l.action !== "DELETE"
        )
      });
      store.saveInventoryToBackend().catch(() => {
      });
    } else if (key === "notif_all") {
      useStore.setState({ notifications: [] });
    } else if (key === "notif_part_requests") {
      useStore.setState({
        notifications: store.notifications.filter(
          (n) => n.type !== "part_request"
        )
      });
    } else if (key === "notif_part_issued") {
      useStore.setState({
        notifications: store.notifications.filter(
          (n) => n.type !== "part_issued"
        )
      });
    } else if (key === "notif_general") {
      useStore.setState({
        notifications: store.notifications.filter(
          (n) => n.type === "part_request" || n.type === "part_issued"
        )
      });
    } else if (key === "delete_all_data") {
      useStore.setState({
        cases: [],
        partItems: [],
        purchaseEntries: [],
        auditLog: [],
        storePilotAuditLogs: [],
        notifications: [],
        partRequests: []
      });
      store.saveCasesToBackend().catch(() => {
      });
      store.saveInventoryToBackend().catch(() => {
      });
    }
    setDone((s) => /* @__PURE__ */ new Set([...s, key]));
    setConfirmAction(null);
  };
  const confirm = (title, count, key) => {
    setConfirmAction({
      title,
      description: `This will permanently delete ${count.toLocaleString()} record(s). This cannot be undone.`,
      count,
      actionKey: key
    });
  };
  const TabDeleteBtn = ({
    label,
    actionKey,
    count
  }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-slate-700", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "ml-2 text-xs", children: [
        count,
        " records"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        size: "sm",
        variant: "destructive",
        className: "h-7 px-3 text-xs bg-red-600 hover:bg-red-700",
        disabled: done.has(actionKey) || count === 0,
        onClick: () => confirm(label, count, actionKey),
        "data-ocid": "data_management.delete_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3 mr-1" }),
          done.has(actionKey) ? "Done" : "Delete"
        ]
      }
    )
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-r from-red-600 to-rose-700 text-white rounded-2xl px-6 py-6 shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 bg-white/20 rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "h-6 w-6" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Data Management" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-200 text-sm", children: "Permanently delete system data. These actions cannot be undone." })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "px-6 py-6 max-w-6xl mx-auto space-y-6",
        "data-ocid": "data_management.page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 bg-red-50 border-2 border-red-200 rounded-2xl p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-red-800", children: "Danger Zone — Irreversible Actions" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-700 text-sm mt-0.5", children: "Deleted data cannot be recovered. All delete actions are permanent and irreversible. Please back up important data before proceeding." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm border-l-4 border-l-blue-500 rounded-2xl overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-5 w-5 text-blue-600" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-slate-800 text-sm", children: "Cases" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 font-normal", children: "Service complaint records" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs font-bold", children: [
                  cases.length,
                  " total"
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "all", className: "w-full", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full grid grid-cols-4 h-8 text-xs mb-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "all", className: "text-xs", children: "All" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "pending", className: "text-xs", children: "Pending" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "closed", className: "text-xs", children: "Closed" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "cancelled", className: "text-xs", children: "Cancelled" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "all", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    TabDeleteBtn,
                    {
                      label: "Delete All Cases",
                      actionKey: "cases_all",
                      count: cases.length
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "pending", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    TabDeleteBtn,
                    {
                      label: "Delete Pending Cases",
                      actionKey: "cases_pending",
                      count: cases.filter((c) => c.status === "pending").length
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "closed", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    TabDeleteBtn,
                    {
                      label: "Delete Closed Cases",
                      actionKey: "cases_closed",
                      count: cases.filter((c) => c.status === "closed").length
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "cancelled", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    TabDeleteBtn,
                    {
                      label: "Delete Cancelled Cases",
                      actionKey: "cases_cancelled",
                      count: cases.filter((c) => c.status === "cancelled").length
                    }
                  ) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-slate-100 pt-3 mt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-slate-500 mb-2 flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }),
                    " Delete by Date Range"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-end", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-400 block mb-1", children: "From" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          type: "date",
                          value: getDateRange("cases").from,
                          onChange: (e) => setDateRange("cases", "from", e.target.value),
                          className: "h-8 text-xs"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-400 block mb-1", children: "To" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          type: "date",
                          value: getDateRange("cases").to,
                          onChange: (e) => setDateRange("cases", "to", e.target.value),
                          className: "h-8 text-xs"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        size: "sm",
                        variant: "outline",
                        className: "h-8 text-xs border-red-200 text-red-600 hover:bg-red-50",
                        disabled: !getDateRange("cases").from || !getDateRange("cases").to,
                        onClick: () => confirm(
                          "Delete Cases by Date Range",
                          cases.length,
                          "cases_range"
                        ),
                        "data-ocid": "data_management.delete_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3 mr-1" }),
                          " Delete Range"
                        ]
                      }
                    )
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm border-l-4 border-l-emerald-500 rounded-2xl overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-5 w-5 text-emerald-600" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-slate-800 text-sm", children: "Inventory Parts" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 font-normal", children: "Spare part records" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs font-bold", children: [
                  partItems.length,
                  " total"
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "all", className: "w-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full grid grid-cols-5 h-8 text-xs mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "all", className: "text-xs", children: "All" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "instock", className: "text-xs", children: "In Stock" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "issued", className: "text-xs", children: "Issued" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "installed", className: "text-xs", children: "Installed" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "returned", className: "text-xs", children: "Returned" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "all", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TabDeleteBtn,
                  {
                    label: "Delete All Parts",
                    actionKey: "inv_all",
                    count: partItems.length
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "instock", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TabDeleteBtn,
                  {
                    label: "Delete In-Stock Parts",
                    actionKey: "inv_instock",
                    count: partItems.filter((p) => p.status === "in_stock").length
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "issued", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TabDeleteBtn,
                  {
                    label: "Delete Issued Parts",
                    actionKey: "inv_issued",
                    count: partItems.filter((p) => p.status === "issued").length
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "installed", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TabDeleteBtn,
                  {
                    label: "Delete Installed Parts",
                    actionKey: "inv_installed",
                    count: partItems.filter((p) => p.status === "installed").length
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "returned", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TabDeleteBtn,
                  {
                    label: "Delete Returned Parts",
                    actionKey: "inv_returned",
                    count: partItems.filter(
                      (p) => p.status === "returned_to_company"
                    ).length
                  }
                ) })
              ] }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm border-l-4 border-l-orange-500 rounded-2xl overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "h-5 w-5 text-orange-600" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-slate-800 text-sm", children: "Part Requests" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 font-normal", children: "Part request records" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs font-bold", children: [
                  partRequests.length,
                  " total"
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "all", className: "w-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full grid grid-cols-4 h-8 text-xs mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "all", className: "text-xs", children: "All" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "pending", className: "text-xs", children: "Pending" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "rejected", className: "text-xs", children: "Rejected" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "cancelled", className: "text-xs", children: "Cancelled" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "all", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TabDeleteBtn,
                  {
                    label: "Delete All Requests",
                    actionKey: "pr_all",
                    count: partRequests.length
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "pending", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TabDeleteBtn,
                  {
                    label: "Delete Pending Requests",
                    actionKey: "pr_pending",
                    count: partRequests.filter((r) => r.status === "pending").length
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "rejected", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TabDeleteBtn,
                  {
                    label: "Delete Rejected Requests",
                    actionKey: "pr_rejected",
                    count: partRequests.filter((r) => r.status === "rejected").length
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "cancelled", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TabDeleteBtn,
                  {
                    label: "Delete Cancelled Requests",
                    actionKey: "pr_cancelled",
                    count: partRequests.filter((r) => r.status === "cancelled").length
                  }
                ) })
              ] }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm border-l-4 border-l-violet-500 rounded-2xl overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-5 w-5 text-violet-600" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-slate-800 text-sm", children: "Purchase Records" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 font-normal", children: "Purchase entries and invoices" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs font-bold", children: [
                  purchaseEntries.length,
                  " total"
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                TabDeleteBtn,
                {
                  label: "Delete All Purchases",
                  actionKey: "purchase_all",
                  count: purchaseEntries.length
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm border-l-4 border-l-orange-400 rounded-2xl overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardCheck, { className: "h-5 w-5 text-orange-600" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-slate-800 text-sm", children: "Audit Logs" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 font-normal", children: "System activity and audit trail" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs font-bold", children: [
                  storePilotAuditLogs.length,
                  " total"
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "all", className: "w-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full grid grid-cols-5 h-8 text-xs mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "all", className: "text-xs", children: "All" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "login", className: "text-xs", children: "Login" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "creates", className: "text-xs", children: "Creates" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "updates", className: "text-xs", children: "Updates" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "deletes", className: "text-xs", children: "Deletes" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "all", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TabDeleteBtn,
                  {
                    label: "Clear All Logs",
                    actionKey: "audit_all",
                    count: storePilotAuditLogs.length + auditLog.length
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "login", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TabDeleteBtn,
                  {
                    label: "Clear Login/Logout Logs",
                    actionKey: "audit_login",
                    count: storePilotAuditLogs.filter(
                      (l) => l.action === "LOGIN" || l.action === "LOGOUT"
                    ).length
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "creates", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TabDeleteBtn,
                  {
                    label: "Clear Create Logs",
                    actionKey: "audit_creates",
                    count: storePilotAuditLogs.filter((l) => l.action === "CREATE").length
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "updates", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TabDeleteBtn,
                  {
                    label: "Clear Update/Issue/Return Logs",
                    actionKey: "audit_updates",
                    count: storePilotAuditLogs.filter(
                      (l) => l.action === "UPDATE" || l.action === "ISSUE" || l.action === "RETURN"
                    ).length
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "deletes", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TabDeleteBtn,
                  {
                    label: "Clear Delete Logs",
                    actionKey: "audit_deletes",
                    count: storePilotAuditLogs.filter((l) => l.action === "DELETE").length
                  }
                ) })
              ] }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm border-l-4 border-l-slate-400 rounded-2xl overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-5 w-5 text-slate-600" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-slate-800 text-sm", children: "Notifications" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 font-normal", children: "In-app alerts" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs font-bold", children: [
                  notifications.length,
                  " total"
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "all", className: "w-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full grid grid-cols-4 h-8 text-xs mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "all", className: "text-xs", children: "All" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "part_req", className: "text-xs", children: "Part Req" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "part_issued", className: "text-xs", children: "Issued" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "general", className: "text-xs", children: "General" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "all", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TabDeleteBtn,
                  {
                    label: "Clear All Notifications",
                    actionKey: "notif_all",
                    count: notifications.length
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "part_req", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TabDeleteBtn,
                  {
                    label: "Clear Part Request Notifs",
                    actionKey: "notif_part_requests",
                    count: notifications.filter((n) => n.type === "part_request").length
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "part_issued", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TabDeleteBtn,
                  {
                    label: "Clear Part Issued Notifs",
                    actionKey: "notif_part_issued",
                    count: notifications.filter(
                      (n) => n.type === "part_issued"
                    ).length
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "general", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TabDeleteBtn,
                  {
                    label: "Clear General Notifs",
                    actionKey: "notif_general",
                    count: notifications.filter(
                      (n) => n.type !== "part_request" && n.type !== "part_issued"
                    ).length
                  }
                ) })
              ] }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm border-l-4 border-l-indigo-500 rounded-2xl overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GitBranch, { className: "h-5 w-5 text-indigo-600" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-slate-800 text-sm", children: "Lifecycle Events" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 font-normal", children: "Part movement history" })
                ] })
              ] }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 italic", children: "Read-only data for reference." }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm border-l-4 border-l-rose-500 rounded-2xl overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-5 w-5 text-rose-600" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-slate-800 text-sm", children: "Issued Parts History" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 font-normal", children: "Parts issued to technicians" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs font-bold", children: [
                  partItems.filter(
                    (p) => p.status === "issued" || p.status === "installed"
                  ).length,
                  " ",
                  "active"
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "all", className: "w-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full grid grid-cols-2 h-8 text-xs mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "all", className: "text-xs", children: "All Issued" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "returned", className: "text-xs", children: "Returned to Store" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "all", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TabDeleteBtn,
                  {
                    label: "Delete All Issued History",
                    actionKey: "inv_issued",
                    count: partItems.filter((p) => p.status === "issued").length
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "returned", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TabDeleteBtn,
                  {
                    label: "Delete Returned to Store",
                    actionKey: "inv_returned",
                    count: partItems.filter(
                      (p) => p.status === "returned_to_company"
                    ).length
                  }
                ) })
              ] }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm border-2 border-red-200 bg-red-50/30 rounded-2xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-5 w-5 text-red-600" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-red-800 text-sm", children: "Bulk Operations" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-600 font-normal", children: "Delete everything at once. Use with extreme caution." })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "destructive",
                  className: "w-full gap-2 bg-red-700 hover:bg-red-800",
                  onClick: () => setConfirmAction({
                    title: "Delete ALL System Data",
                    description: "This will permanently delete ALL cases, inventory parts, purchase records, part requests, audit logs, and notifications. This action CANNOT be undone.",
                    count: cases.length + partItems.length + purchaseEntries.length + auditLog.length + notifications.length + partRequests.length,
                    actionKey: "delete_all_data"
                  }),
                  "data-ocid": "data_management.delete_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }),
                    "Delete ALL Data"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  className: "w-full gap-2 border-slate-300",
                  onClick: () => {
                    setDone(/* @__PURE__ */ new Set());
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-4 w-4" }),
                    "Reset Completion Status"
                  ]
                }
              )
            ] }) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: !!confirmAction,
        onOpenChange: (o) => !o && setConfirmAction(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "data_management.dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogTitle, { className: "flex items-center gap-2 text-red-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-5 w-5" }),
              confirmAction == null ? void 0 : confirmAction.title
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { className: "text-slate-600", children: [
              confirmAction == null ? void 0 : confirmAction.description,
              confirmAction && confirmAction.count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block mt-2 font-bold text-red-700", children: [
                confirmAction.count.toLocaleString(),
                " record(s) will be deleted."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block mt-2 font-bold text-red-800", children: "This action is permanent and cannot be undone." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "data_management.cancel_button", children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                className: "bg-red-600 hover:bg-red-700",
                onClick: handleConfirm,
                "data-ocid": "data_management.confirm_button",
                children: "Yes, Delete Permanently"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  DataManagementPage as default
};
