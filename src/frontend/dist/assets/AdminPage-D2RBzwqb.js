import { c as createLucideIcon, u as useStore, r as reactExports, j as jsxRuntimeExports, U as Users, F as CircleX, b as Tabs, d as TabsList, e as TabsTrigger, g as TabsContent, w as Button, i as Card, k as CardHeader, l as CardTitle, m as CardContent, C as CircleCheckBig, G as ue, y as Trash2, I as Input, H as Select, J as SelectTrigger, K as SelectValue, N as SelectContent, O as SelectItem, z as Label, Q as backendGetUsers } from "./index-De7Q6SQO.js";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-DQvCZOLE.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./dialog-CsjrwcpS.js";
import { T as Textarea } from "./textarea-CYtE04I-.js";
import { R as RefreshCw } from "./refresh-cw-BD-tKuOV.js";
import { P as Pencil } from "./pencil-B4TAhzLG.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m16 11 2 2 4-4", key: "9rsbq5" }],
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const UserCheck = createLucideIcon("user-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "19", x2: "19", y1: "8", y2: "14", key: "1bvyxn" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
];
const UserPlus = createLucideIcon("user-plus", __iconNode);
function formatRelativeTime(ts) {
  if (!ts) return "Never";
  const diff = Date.now() - new Date(ts).getTime();
  const mins = Math.floor(diff / 6e4);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}
function formatDateTime(ts) {
  if (!ts) return "Never";
  return new Date(ts).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function formatLogDateTime(ts) {
  if (!ts) return "—";
  return new Date(ts).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function isActiveNow(u) {
  if (u.isOnline) return true;
  if (!u.lastActive) return false;
  return Date.now() - new Date(u.lastActive).getTime() < 10 * 60 * 1e3;
}
const ACTION_COLORS = {
  Login: "bg-green-50 text-green-800",
  Logout: "bg-gray-50 text-gray-700",
  "User Deleted": "bg-red-50 text-red-800",
  "Case Deleted": "bg-red-50 text-red-800",
  "User Rejected": "bg-red-50 text-red-800",
  "User Created": "bg-blue-50 text-blue-800",
  "User Approved": "bg-blue-50 text-blue-800",
  "Case Created": "bg-blue-50 text-blue-800",
  "Technician Added": "bg-blue-50 text-blue-800"
};
function getActionColor(action) {
  return ACTION_COLORS[action] ?? "bg-white text-gray-700";
}
const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  role: "backend_user",
  password: ""
};
function AdminPage() {
  const {
    users,
    currentUser,
    activityLog,
    approveUser,
    rejectUser,
    createUser,
    editUser,
    deleteUser,
    mergeUsers,
    markApprovalsSeen
  } = useStore();
  const isAdmin = (currentUser == null ? void 0 : currentUser.role) === "admin";
  reactExports.useEffect(() => {
    if (!isAdmin) return;
    markApprovalsSeen();
    const fetchUsers = () => {
      backendGetUsers().then((freshUsers) => {
        if (freshUsers.length > 0) {
          mergeUsers(freshUsers);
        }
      }).catch(() => {
      });
    };
    fetchUsers();
    const interval = setInterval(fetchUsers, 3e3);
    return () => clearInterval(interval);
  }, [isAdmin, mergeUsers]);
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [editingUser, setEditingUser] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(EMPTY_FORM);
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const [rejectDialogOpen, setRejectDialogOpen] = reactExports.useState(false);
  const [rejectTargetUser, setRejectTargetUser] = reactExports.useState(null);
  const [rejectReason, setRejectReason] = reactExports.useState("");
  const [logSearch, setLogSearch] = reactExports.useState("");
  const [logActionFilter, setLogActionFilter] = reactExports.useState("all");
  const [refreshingApprovals, setRefreshingApprovals] = reactExports.useState(false);
  if (!isAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-20 text-gray-500", children: "Access denied. Admins only." });
  }
  const handleRefreshApprovals = async () => {
    setRefreshingApprovals(true);
    try {
      const fresh = await backendGetUsers();
      if (fresh.length > 0) mergeUsers(fresh);
      ue.success("Approvals refreshed");
    } catch {
      ue.error("Failed to refresh");
    } finally {
      setRefreshingApprovals(false);
    }
  };
  const pending = users.filter((u) => u.status === "pending");
  const approved = users.filter((u) => u.status === "approved");
  const rejected = users.filter((u) => u.status === "rejected");
  const openCreate = () => {
    setEditingUser(null);
    setForm(EMPTY_FORM);
    setDialogOpen(true);
  };
  const openEdit = (u) => {
    setEditingUser(u);
    setForm({
      name: u.name,
      email: u.email,
      phone: u.phone,
      role: u.role,
      password: ""
    });
    setDialogOpen(true);
  };
  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim()) {
      ue.error("Name and email are required");
      return;
    }
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone.trim())) {
      ue.error("Mobile number is required and must be exactly 10 digits");
      return;
    }
    if (!editingUser && !form.password) {
      ue.error("Password is required for new users");
      return;
    }
    if (editingUser) {
      const updates = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        role: form.role
      };
      if (form.password) updates.password = form.password;
      try {
        editUser(editingUser.id, updates);
        ue.success("User updated successfully");
      } catch (err) {
        if (err instanceof Error) {
          if (err.message === "email_exists")
            ue.error("A user with this email already exists");
          else if (err.message === "phone_exists")
            ue.error("This mobile number is already registered");
          else ue.error("Failed to update user");
        }
        return;
      }
    } else {
      try {
        await createUser({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          role: form.role,
          password: form.password
        });
        ue.success("User created successfully");
      } catch (err) {
        if (err instanceof Error) {
          if (err.message === "email_exists")
            ue.error("A user with this email already exists");
          else if (err.message === "phone_exists")
            ue.error("This mobile number is already registered");
          else ue.error("Failed to create user");
        }
        return;
      }
    }
    setDialogOpen(false);
  };
  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteUser(deleteTarget.id);
    ue.success(`User ${deleteTarget.name} deleted`);
    setDeleteTarget(null);
  };
  const uniqueActions = Array.from(new Set(activityLog.map((l) => l.action)));
  const filteredLog = activityLog.filter((l) => {
    const matchSearch = !logSearch || l.userName.toLowerCase().includes(logSearch.toLowerCase()) || l.details.toLowerCase().includes(logSearch.toLowerCase());
    const matchAction = logActionFilter === "all" || l.action === logActionFilter;
    return matchSearch && matchAction;
  }).slice(0, 200);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-r from-violet-700 to-purple-700 text-white rounded-xl px-6 py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 bg-white/20 rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-6 w-6" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Admin Panel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-violet-200 text-sm", children: "Manage users, approvals, and activity" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: [
      {
        label: "Pending Approval",
        value: pending.length,
        color: "text-yellow-600",
        bg: "bg-yellow-50",
        Icon: Users
      },
      {
        label: "Approved Users",
        value: approved.length,
        color: "text-green-600",
        bg: "bg-green-50",
        Icon: UserCheck
      },
      {
        label: "Rejected",
        value: rejected.length,
        color: "text-red-600",
        bg: "bg-red-50",
        Icon: CircleX
      }
    ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `${s.bg} rounded-xl p-4 border border-white shadow-sm flex items-center gap-3`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(s.Icon, { className: `h-8 w-8 ${s.color} opacity-70` }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-2xl font-bold ${s.color}`, children: s.value }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: s.label })
          ] })
        ]
      },
      s.label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "approvals", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "approvals", "data-ocid": "admin.tab", children: [
          "Approvals",
          " ",
          pending.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 bg-yellow-500 text-white text-xs rounded-full px-1.5", children: pending.length })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "users", "data-ocid": "admin.tab", children: "Users" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "activity", "data-ocid": "admin.tab", children: "Activity Log" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "approvals", className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            onClick: handleRefreshApprovals,
            disabled: refreshingApprovals,
            className: "gap-2",
            "data-ocid": "admin.secondary_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                RefreshCw,
                {
                  className: `h-3.5 w-3.5 ${refreshingApprovals ? "animate-spin" : ""}`
                }
              ),
              refreshingApprovals ? "Refreshing..." : "Refresh"
            ]
          }
        ) }),
        pending.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "text-center py-12 text-gray-400 text-sm",
            "data-ocid": "admin.empty_state",
            children: "No pending approvals"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm border-yellow-200", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm text-yellow-700 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4" }),
            " Pending Approvals (",
            pending.length,
            ")"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3", children: pending.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col sm:flex-row sm:items-center justify-between bg-yellow-50 border border-yellow-100 px-4 py-3 rounded-lg gap-3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-gray-900", children: u.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-500", children: [
                    u.email,
                    " · ",
                    u.phone
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-400 capitalize", children: [
                    u.role.replace("_", " "),
                    " · Requested",
                    " ",
                    new Date(u.createdAt).toLocaleDateString("en-IN")
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      onClick: async () => {
                        await approveUser(u.id);
                        ue.success("User approved");
                      },
                      className: "bg-green-600 hover:bg-green-700 h-8",
                      "data-ocid": "admin.confirm_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-3.5 w-3.5 mr-1" }),
                        "Approve"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      variant: "destructive",
                      onClick: () => {
                        setRejectTargetUser(u);
                        setRejectReason("");
                        setRejectDialogOpen(true);
                      },
                      className: "h-8",
                      "data-ocid": "admin.delete_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3.5 w-3.5 mr-1" }),
                        "Reject"
                      ]
                    }
                  )
                ] })
              ]
            },
            u.id
          )) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "users", className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-500", children: [
            users.length,
            " total users"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              onClick: openCreate,
              className: "bg-blue-600 hover:bg-blue-700 h-8",
              "data-ocid": "admin.primary_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-3.5 w-3.5 mr-1" }),
                "Add User"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "min-w-[800px] w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b bg-gray-50", children: [
            "Name",
            "Email",
            "Phone",
            "Role",
            "Status",
            "Online Status",
            "Last Login",
            "Actions"
          ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "th",
            {
              className: "text-left px-3 py-2.5 text-xs font-semibold text-gray-500 whitespace-nowrap",
              children: h
            },
            h
          )) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: users.filter((u) => u.status !== "rejected").map((u) => {
            const active = isActiveNow(u);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: "border-b last:border-0 hover:bg-gray-50",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 font-medium text-gray-900 whitespace-nowrap", children: u.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 text-gray-500 text-xs", children: u.email }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 text-gray-500 text-xs whitespace-nowrap", children: u.phone || "—" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `text-xs px-2 py-1 rounded-full font-medium capitalize ${u.role === "admin" ? "bg-violet-100 text-violet-700" : u.role === "supervisor" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`,
                      children: u.role.replace("_", " ")
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `text-xs px-2 py-0.5 rounded-full font-medium capitalize ${u.status === "approved" ? "bg-green-100 text-green-700" : u.status === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`,
                      children: u.status
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `w-2 h-2 rounded-full flex-shrink-0 ${active ? "bg-green-500" : "bg-gray-300"}`
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `text-xs ${active ? "text-green-700 font-medium" : "text-gray-500"}`,
                        children: active ? "Active" : u.lastActive ? `Last seen: ${formatRelativeTime(u.lastActive)}` : "Never"
                      }
                    )
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 text-xs text-gray-500 whitespace-nowrap", children: formatDateTime(u.lastLogin) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                    u.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          size: "sm",
                          onClick: async () => {
                            await approveUser(u.id);
                            ue.success("User approved");
                          },
                          className: "h-6 text-xs bg-green-600 hover:bg-green-700",
                          children: "Approve"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          size: "sm",
                          variant: "destructive",
                          onClick: () => {
                            setRejectTargetUser(u);
                            setRejectReason("");
                            setRejectDialogOpen(true);
                          },
                          className: "h-6 text-xs",
                          children: "Reject"
                        }
                      )
                    ] }),
                    u.id !== (currentUser == null ? void 0 : currentUser.id) && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => openEdit(u),
                          className: "p-1 rounded hover:bg-blue-50 text-blue-600",
                          title: "Edit user",
                          "data-ocid": "admin.edit_button",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setDeleteTarget(u),
                          className: "p-1 rounded hover:bg-red-50 text-red-500",
                          title: "Delete user",
                          "data-ocid": "admin.delete_button",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
                        }
                      )
                    ] }),
                    u.id === (currentUser == null ? void 0 : currentUser.id) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-400", children: "Current user" })
                  ] }) })
                ]
              },
              u.id
            );
          }) })
        ] }) }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "activity", className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Search by user or details...",
              value: logSearch,
              onChange: (e) => setLogSearch(e.target.value),
              className: "max-w-xs h-8 text-sm",
              "data-ocid": "admin.search_input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: logActionFilter, onValueChange: setLogActionFilter, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "w-48 h-8 text-xs",
                "data-ocid": "admin.select",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All actions" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Actions" }),
              uniqueActions.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: a, children: a }, a))
            ] })
          ] })
        ] }),
        filteredLog.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "text-center py-12 text-gray-400 text-sm",
            "data-ocid": "admin.empty_state",
            children: "No activity logs found"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-400 px-3 pt-3 pb-1", children: [
            "Showing last ",
            filteredLog.length,
            " activities"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "min-w-[600px] w-full text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b bg-gray-50", children: ["Timestamp", "User", "Action", "Details"].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "th",
              {
                className: "text-left px-3 py-2 text-xs font-semibold text-gray-500 whitespace-nowrap",
                children: h
              },
              h
            )) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filteredLog.map((log, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: `border-b last:border-0 ${getActionColor(log.action)}`,
                "data-ocid": `admin.row.item.${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-xs whitespace-nowrap", children: formatLogDateTime(log.timestamp) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 font-medium whitespace-nowrap", children: log.userName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium", children: log.action }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-xs text-gray-600", children: log.details })
                ]
              },
              log.id
            )) })
          ] }) })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", "data-ocid": "admin.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editingUser ? "Edit User" : "Create New User" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Full Name *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.name,
              onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
              placeholder: "Enter full name",
              "data-ocid": "admin.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Email *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "email",
              value: form.email,
              onChange: (e) => setForm((f) => ({ ...f, email: e.target.value })),
              placeholder: "Enter email"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
            "Phone *",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-normal text-gray-500", children: "(10 digits)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.phone,
              onChange: (e) => setForm((f) => ({ ...f, phone: e.target.value })),
              placeholder: "10-digit mobile number",
              maxLength: 10
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Role" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: form.role,
              onValueChange: (v) => setForm((f) => ({ ...f, role: v })),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "admin.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "admin", children: "Admin" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "supervisor", children: "Supervisor" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "backend_user", children: "Backend User" })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: editingUser ? "Password (leave blank to keep current)" : "Password *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "password",
              value: form.password,
              onChange: (e) => setForm((f) => ({ ...f, password: e.target.value })),
              placeholder: editingUser ? "Leave blank to keep current" : "Set password"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            onClick: () => setDialogOpen(false),
            "data-ocid": "admin.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleSubmit,
            className: "bg-blue-600 hover:bg-blue-700",
            "data-ocid": "admin.submit_button",
            children: editingUser ? "Save Changes" : "Create User"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: !!deleteTarget,
        onOpenChange: (open) => !open && setDeleteTarget(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "admin.dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete User" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
              "Are you sure you want to delete",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: deleteTarget == null ? void 0 : deleteTarget.name }),
              "? This action cannot be undone."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "admin.cancel_button", children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                onClick: handleDelete,
                className: "bg-red-600 hover:bg-red-700",
                "data-ocid": "admin.confirm_button",
                children: "Delete"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: rejectDialogOpen,
        onOpenChange: (open) => {
          if (!open) {
            setRejectDialogOpen(false);
            setRejectTargetUser(null);
            setRejectReason("");
          }
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2 text-rose-700", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-5 w-5" }),
            "Reject Application"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-2 space-y-4", children: [
            rejectTargetUser && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 rounded-lg px-4 py-3 border border-gray-100", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-gray-900", children: rejectTargetUser.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: rejectTargetUser.email })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-sm font-medium text-gray-700", children: [
                "Rejection Reason ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-rose-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  placeholder: "Enter reason for rejection (minimum 5 characters)...",
                  value: rejectReason,
                  onChange: (e) => setRejectReason(e.target.value),
                  className: "resize-none focus-visible:ring-rose-500",
                  rows: 3
                }
              ),
              rejectReason.length > 0 && rejectReason.trim().length < 5 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-rose-500", children: "Please enter at least 5 characters." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                onClick: () => {
                  setRejectDialogOpen(false);
                  setRejectTargetUser(null);
                  setRejectReason("");
                },
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "destructive",
                disabled: rejectReason.trim().length < 5,
                onClick: () => {
                  if (rejectTargetUser) {
                    rejectUser(rejectTargetUser.id, rejectReason.trim());
                    ue.success("Application rejected");
                  }
                  setRejectDialogOpen(false);
                  setRejectTargetUser(null);
                  setRejectReason("");
                },
                children: "Confirm Reject"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  AdminPage as default
};
