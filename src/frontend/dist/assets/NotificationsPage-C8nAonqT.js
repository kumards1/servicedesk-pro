import { c as createLucideIcon, u as useStore, r as reactExports, j as jsxRuntimeExports, aa as Bell, w as Button, X, T as TriangleAlert, R as RotateCcw, x as Clock, i as Card, m as CardContent, y as Trash2, z as Label, I as Input, H as Select, J as SelectTrigger, K as SelectValue, N as SelectContent, O as SelectItem, a6 as Package, h as TrendingDown } from "./index-De7Q6SQO.js";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-DQvCZOLE.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./dialog-CsjrwcpS.js";
import { T as Textarea } from "./textarea-CYtE04I-.js";
import { S as Send } from "./send-oapnhRw6.js";
import { P as Plus } from "./plus-B5kdLRRW.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M13.916 2.314A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.74 7.327A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673 9 9 0 0 1-.585-.665",
      key: "1tip0g"
    }
  ],
  ["circle", { cx: "18", cy: "8", r: "3", key: "1g0gzu" }]
];
const BellDot = createLucideIcon("bell-dot", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M17 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 .258-1.742",
      key: "178tsu"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M8.668 3.01A6 6 0 0 1 18 8c0 2.687.77 4.653 1.707 6.05", key: "1hqiys" }]
];
const BellOff = createLucideIcon("bell-off", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M12 8V4H8", key: "hb8ula" }],
  ["rect", { width: "16", height: "12", x: "4", y: "8", rx: "2", key: "enze0r" }],
  ["path", { d: "M2 14h2", key: "vft8re" }],
  ["path", { d: "M20 14h2", key: "4cs60a" }],
  ["path", { d: "M15 13v2", key: "1xurst" }],
  ["path", { d: "M9 13v2", key: "rq6x2g" }]
];
const Bot = createLucideIcon("bot", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M18 6 7 17l-5-5", key: "116fxf" }],
  ["path", { d: "m22 10-7.5 7.5L13 16", key: "ke71qq" }]
];
const CheckCheck = createLucideIcon("check-check", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
];
const Info = createLucideIcon("info", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m17 2 4 4-4 4", key: "nntrym" }],
  ["path", { d: "M3 11v-1a4 4 0 0 1 4-4h14", key: "84bu3i" }],
  ["path", { d: "m7 22-4-4 4-4", key: "1wqhfi" }],
  ["path", { d: "M21 13v1a4 4 0 0 1-4 4H3", key: "1rx37r" }]
];
const Repeat = createLucideIcon("repeat", __iconNode);
const TYPE_STYLES = {
  follow_up: {
    border: "border-l-blue-500",
    bg: "bg-blue-50",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "h-4 w-4 text-blue-500" }),
    label: "Follow-up",
    priority: "medium",
    filter: "all"
  },
  overdue: {
    border: "border-l-red-500",
    bg: "bg-red-50",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 text-red-500" }),
    label: "Overdue",
    priority: "high",
    filter: "all"
  },
  part_pending: {
    border: "border-l-amber-500",
    bg: "bg-amber-50",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-4 w-4 text-amber-500" }),
    label: "Parts",
    priority: "medium",
    filter: "all"
  },
  general: {
    border: "border-l-slate-400",
    bg: "bg-slate-50",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-4 w-4 text-slate-500" }),
    label: "General",
    priority: "low",
    filter: "all"
  },
  stale_case: {
    border: "border-l-orange-500",
    bg: "bg-orange-50",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 text-orange-500" }),
    label: "Stale",
    priority: "high",
    filter: "all"
  },
  part_request: {
    border: "border-l-emerald-500",
    bg: "bg-emerald-50",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-4 w-4 text-emerald-500" }),
    label: "Part Request",
    priority: "medium",
    filter: "issued"
  },
  low_stock: {
    border: "border-l-red-400",
    bg: "bg-red-50",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "h-4 w-4 text-red-500" }),
    label: "Low Stock",
    priority: "high",
    filter: "low_stock"
  },
  part_issued: {
    border: "border-l-amber-500",
    bg: "bg-amber-50",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-4 w-4 text-amber-500" }),
    label: "Part Issued",
    priority: "medium",
    filter: "issued"
  },
  part_returned: {
    border: "border-l-blue-500",
    bg: "bg-blue-50",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-4 w-4 text-blue-500" }),
    label: "Part Returned",
    priority: "low",
    filter: "returned"
  },
  ai_insight: {
    border: "border-l-violet-500",
    bg: "bg-violet-50",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "h-4 w-4 text-violet-500" }),
    label: "AI Insight",
    priority: "low",
    filter: "ai"
  }
};
const PRIORITY_BADGE = {
  all: "",
  high: "bg-red-100 text-red-700 border border-red-200",
  medium: "bg-amber-100 text-amber-700 border border-amber-200",
  low: "bg-blue-100 text-blue-700 border border-blue-200"
};
function relativeTime(ts) {
  const diff = (Date.now() - new Date(ts).getTime()) / 1e3;
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}
function reminderCountdown(dateStr) {
  const diff = (new Date(dateStr).getTime() - Date.now()) / 864e5;
  if (diff < 0) return { label: "Overdue", cls: "bg-red-100 text-red-600" };
  if (diff < 1) return { label: "Today", cls: "bg-amber-100 text-amber-700" };
  return {
    label: `In ${Math.ceil(diff)} day${Math.ceil(diff) > 1 ? "s" : ""}`,
    cls: "bg-blue-100 text-blue-700"
  };
}
function NotificationsPage() {
  const {
    notifications,
    reminders,
    markNotificationRead,
    deleteNotification,
    addReminder,
    updateReminder,
    currentUser,
    cases,
    addNotification
  } = useStore();
  const [filter, setFilter] = reactExports.useState("all");
  const [priority, setPriority] = reactExports.useState("all");
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const [reminderOpen, setReminderOpen] = reactExports.useState(false);
  const [snoozeId, setSnoozeId] = reactExports.useState(null);
  const [dismissId, setDismissId] = reactExports.useState(null);
  const [clearAllOpen, setClearAllOpen] = reactExports.useState(false);
  const [rForm, setRForm] = reactExports.useState({
    note: "",
    reminderDate: "",
    repeat: "none"
  });
  reactExports.useEffect(() => {
    if (!currentUser) return;
    const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    for (const c of cases) {
      if (!c.nextActionDate) continue;
      const caseDate = c.nextActionDate.split("T")[0];
      if (caseDate !== today) continue;
      const shouldNotify = currentUser.role === "admin" || currentUser.role === "backend_user" && (c.createdBy === currentUser.id || c.technicianId === currentUser.id);
      if (!shouldNotify) continue;
      const alreadyExists = notifications.some(
        (n) => {
          var _a;
          return n.type === "follow_up" && n.caseId === c.id && ((_a = n.createdAt) == null ? void 0 : _a.split("T")[0]) === today;
        }
      );
      if (!alreadyExists) {
        addNotification({
          userId: currentUser.id,
          message: `Reminder: Case ${c.caseId} scheduled for today — Customer: ${c.customerName}`,
          type: "follow_up",
          isRead: false,
          caseId: c.id
        });
      }
    }
  }, [cases.length, currentUser == null ? void 0 : currentUser.id]);
  const visibleNotifications = (() => {
    const role = currentUser == null ? void 0 : currentUser.role;
    const uid = currentUser == null ? void 0 : currentUser.id;
    return notifications.filter((n) => {
      const targeted = n.targetRole === "all" || n.targetRole === role || n.targetUserId === uid || !n.targetRole && !n.targetUserId;
      if (!targeted) return false;
      if (role === "admin") return true;
      if (role === "supervisor")
        return [
          "part_returned",
          "low_stock",
          "part_request",
          "part_issued",
          "stale_case",
          "general"
        ].includes(n.type);
      return [
        "follow_up",
        "overdue",
        "part_pending",
        "general",
        "stale_case",
        "part_issued"
      ].includes(n.type);
    });
  })();
  const unread = visibleNotifications.filter((n) => !n.isRead).length;
  const read = visibleNotifications.filter((n) => n.isRead).length;
  const markAllRead = () => {
    for (const n of visibleNotifications.filter((n2) => !n2.isRead))
      markNotificationRead(n.id);
  };
  const clearAllRead = () => {
    for (const n of visibleNotifications.filter((n2) => n2.isRead))
      deleteNotification(n.id);
    setClearAllOpen(false);
  };
  const filtered = visibleNotifications.filter((n) => {
    const style = TYPE_STYLES[n.type] ?? TYPE_STYLES.general;
    if (filter === "unread") {
      if (n.isRead) return false;
    } else if (filter === "low_stock") {
      if (n.type !== "low_stock") return false;
    } else if (filter === "issued") {
      if (!["part_request", "part_issued"].includes(n.type)) return false;
    } else if (filter === "returned") {
      if (n.type !== "part_returned") return false;
    } else if (filter === "ai") {
      if (n.type !== "ai_insight") return false;
    } else if (filter === "reminders") {
      return false;
    }
    if (priority !== "all" && style.priority !== priority) return false;
    return true;
  });
  const userReminders = reminders.filter(
    (r) => !r.isDone && r.userId === (currentUser == null ? void 0 : currentUser.id)
  );
  const handleAddReminder = () => {
    if (!rForm.note || !rForm.reminderDate) return;
    addReminder({
      caseId: "",
      userId: (currentUser == null ? void 0 : currentUser.id) ?? "",
      reminderDate: new Date(rForm.reminderDate).toISOString(),
      note: rForm.note,
      isDone: false
    });
    setReminderOpen(false);
    setRForm({ note: "", reminderDate: "", repeat: "none" });
  };
  const handleSnooze = (id) => {
    const r = reminders.find((r2) => r2.id === id);
    if (!r) return;
    const newDate = new Date(r.reminderDate);
    newDate.setDate(newDate.getDate() + 1);
    updateReminder(id, { reminderDate: newDate.toISOString() });
    setSnoozeId(null);
  };
  const handleDismiss = (id) => {
    updateReminder(id, { isDone: true });
    setDismissId(null);
  };
  const FILTER_TABS = [
    { key: "all", label: "All", color: "bg-amber-500", icon: Bell },
    { key: "unread", label: "Unread", color: "bg-red-500", icon: BellDot },
    {
      key: "low_stock",
      label: "Low Stock",
      color: "bg-rose-500",
      icon: TriangleAlert
    },
    { key: "issued", label: "Issued", color: "bg-amber-500", icon: Send },
    {
      key: "returned",
      label: "Returned",
      color: "bg-blue-500",
      icon: RotateCcw
    },
    {
      key: "reminders",
      label: "Reminders",
      color: "bg-purple-500",
      icon: Clock
    },
    { key: "ai", label: "AI", color: "bg-violet-500", icon: Bot }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-4 rounded-2xl shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 bg-white/20 rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Notifications" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-white/20 text-white text-xs font-semibold px-2 py-0.5 rounded-full", children: [
              unread,
              " unread"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-white/10 text-white/80 text-xs px-2 py-0.5 rounded-full", children: [
              read,
              " read"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "secondary",
            className: "bg-white/20 hover:bg-white/30 text-white border-0",
            onClick: markAllRead,
            "data-ocid": "notifications.primary_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCheck, { className: "h-4 w-4 mr-1" }),
              " Mark All Read"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "secondary",
            className: "bg-white/20 hover:bg-white/30 text-white border-0",
            onClick: () => setClearAllOpen(true),
            "data-ocid": "notifications.delete_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4 mr-1" }),
              " Clear Read"
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
      FILTER_TABS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setFilter(f.key),
          className: `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${filter === f.key ? "bg-amber-500 text-white border-amber-500 shadow-sm" : "bg-white text-slate-600 border-slate-200 hover:border-amber-300 hover:text-amber-600"}`,
          "data-ocid": "notifications.tab",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(f.icon, { className: "h-3 w-3" }),
            f.label,
            f.key === "unread" && unread > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full", children: unread })
          ]
        },
        f.key
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: priority,
          onChange: (e) => setPriority(e.target.value),
          className: "bg-white text-slate-600 text-xs rounded-full px-3 py-1.5 border border-slate-200 outline-none font-semibold cursor-pointer hover:border-amber-300",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Priority" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "high", children: "High" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "medium", children: "Medium" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "low", children: "Low" })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      (filter === "all" || filter === "reminders") && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-bold text-slate-700 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-amber-500" }),
            "Active Reminders",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full font-medium", children: userReminders.length })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              onClick: () => setReminderOpen(true),
              className: "bg-amber-500 hover:bg-amber-600 text-white",
              "data-ocid": "notifications.open_modal_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5 mr-1" }),
                " Add Reminder"
              ]
            }
          )
        ] }),
        userReminders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            className: "border-dashed border-2 border-slate-200",
            "data-ocid": "notifications.empty_state",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-8 text-center text-slate-400", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-8 w-8 mx-auto mb-2 opacity-30" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No active reminders" })
            ] })
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: userReminders.map((r) => {
          const cd = reminderCountdown(r.reminderDate);
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: "border-l-4 border-l-amber-400 shadow-sm",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex items-start justify-between gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-amber-600" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-slate-800 text-sm", children: r.note }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 mt-0.5", children: new Date(r.reminderDate).toLocaleString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true
                      }
                    ) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `text-xs px-2 py-0.5 rounded-full font-medium ${cd.cls}`,
                      children: cd.label
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      variant: "outline",
                      className: "text-blue-600 border-blue-200 hover:bg-blue-50 text-xs",
                      onClick: () => setSnoozeId(r.id),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Repeat, { className: "h-3 w-3 mr-1" }),
                        " Snooze"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      variant: "ghost",
                      className: "text-slate-400 hover:text-red-500",
                      onClick: () => setDismissId(r.id),
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
                    }
                  )
                ] })
              ] })
            },
            r.id
          );
        }) })
      ] }),
      filter !== "reminders" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-bold text-slate-700 flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-4 w-4 text-amber-500" }),
          "Notifications",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded-full font-medium", children: filtered.length })
        ] }),
        filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "text-center py-16 text-slate-400",
            "data-ocid": "notifications.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BellOff, { className: "h-12 w-12 mx-auto mb-3 opacity-30" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-medium", children: "All caught up!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", children: "No notifications to show." })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filtered.map((n) => {
          const style = TYPE_STYLES[n.type] ?? TYPE_STYLES.general;
          const pBadge = PRIORITY_BADGE[style.priority];
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: `border-l-4 ${style.border} shadow-sm transition-all ${!n.isRead ? style.bg : "bg-white opacity-75"} hover:shadow-md cursor-pointer`,
              onClick: () => markNotificationRead(n.id),
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${n.isRead ? "bg-slate-100" : style.bg}`,
                    children: style.icon
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: `text-xs font-semibold px-1.5 py-0.5 rounded ${n.isRead ? "bg-slate-100 text-slate-500" : "bg-white/80 text-slate-600"}`,
                          children: style.label
                        }
                      ),
                      pBadge && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: `text-xs px-1.5 py-0.5 rounded font-medium ${pBadge}`,
                          children: style.priority
                        }
                      ),
                      n.relatedPartCode && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-slate-400", children: [
                        "Part: ",
                        n.relatedPartCode
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: `text-sm mt-1 ${n.isRead ? "text-slate-500" : "text-slate-800 font-medium"}`,
                        children: n.message
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
                    !n.isRead && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-amber-500 rounded-full" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-slate-400", children: relativeTime(n.createdAt) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: (e) => {
                          e.stopPropagation();
                          setDeleteTarget(n.id);
                        },
                        className: "text-slate-300 hover:text-red-500 transition-colors p-1 rounded",
                        "data-ocid": "notifications.delete_button",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
                      }
                    )
                  ] })
                ] }) })
              ] })
            },
            n.id
          );
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: !!deleteTarget,
        onOpenChange: () => setDeleteTarget(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete notification?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "This notification will be permanently removed." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "notifications.cancel_button", children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                className: "bg-red-600 hover:bg-red-700",
                onClick: () => {
                  if (deleteTarget) deleteNotification(deleteTarget);
                  setDeleteTarget(null);
                },
                "data-ocid": "notifications.confirm_button",
                children: "Delete"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: clearAllOpen, onOpenChange: setClearAllOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Clear all read notifications?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "All read notifications will be permanently deleted." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AlertDialogAction,
          {
            className: "bg-red-600 hover:bg-red-700",
            onClick: clearAllRead,
            children: "Clear All"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: !!snoozeId, onOpenChange: () => setSnoozeId(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Snooze Reminder?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "This reminder will be postponed by 1 day." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AlertDialogAction,
          {
            onClick: () => {
              if (snoozeId) handleSnooze(snoozeId);
            },
            children: "Snooze 1 Day"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: !!dismissId, onOpenChange: () => setDismissId(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Dismiss Reminder?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "This reminder will be marked as done." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AlertDialogAction,
          {
            onClick: () => {
              if (dismissId) handleDismiss(dismissId);
            },
            children: "Dismiss"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: reminderOpen, onOpenChange: setReminderOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", "data-ocid": "notifications.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Add Reminder" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Note *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              value: rForm.note,
              onChange: (e) => setRForm({ ...rForm, note: e.target.value }),
              placeholder: "What do you need to remember?",
              className: "mt-1",
              "data-ocid": "notifications.textarea"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Date & Time *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "datetime-local",
              value: rForm.reminderDate,
              onChange: (e) => setRForm({ ...rForm, reminderDate: e.target.value }),
              className: "mt-1",
              "data-ocid": "notifications.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Repeat" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: rForm.repeat,
              onValueChange: (v) => setRForm({ ...rForm, repeat: v }),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "none", children: "None" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "daily", children: "Daily" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "weekly", children: "Weekly" })
                ] })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            onClick: () => setReminderOpen(false),
            "data-ocid": "notifications.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleAddReminder,
            disabled: !rForm.note || !rForm.reminderDate,
            "data-ocid": "notifications.submit_button",
            children: "Add Reminder"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  NotificationsPage as default
};
