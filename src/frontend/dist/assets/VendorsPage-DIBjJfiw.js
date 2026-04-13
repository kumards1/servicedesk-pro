import { c as createLucideIcon, u as useStore, r as reactExports, j as jsxRuntimeExports, w as Button, U as Users, ad as ShoppingCart, a6 as Package, i as Card, m as CardContent, I as Input, y as Trash2, a4 as Phone, br as Mail, an as ShoppingBag, k as CardHeader, l as CardTitle, z as Label, G as ue } from "./index-De7Q6SQO.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./dialog-CsjrwcpS.js";
import { B as Building2 } from "./building-2-Doljm3TO.js";
import { P as Plus } from "./plus-B5kdLRRW.js";
import { M as MapPin } from "./map-pin-BwsmX031.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M6 3h12", key: "ggurg9" }],
  ["path", { d: "M6 8h12", key: "6g4wlu" }],
  ["path", { d: "m6 13 8.5 8", key: "u1kupk" }],
  ["path", { d: "M6 13h3", key: "wdp6ag" }],
  ["path", { d: "M9 13c6.667 0 6.667-10 0-10", key: "1nkvk2" }]
];
const IndianRupee = createLucideIcon("indian-rupee", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7", key: "1m0v6g" }],
  [
    "path",
    {
      d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",
      key: "ohrbg2"
    }
  ]
];
const SquarePen = createLucideIcon("square-pen", __iconNode);
const emptyForm = () => ({ name: "", phone: "", email: "", address: "" });
function VendorsPage() {
  const {
    vendors,
    purchaseEntries,
    addVendor,
    updateVendor,
    deleteVendor,
    navigate
  } = useStore();
  const [search, setSearch] = reactExports.useState("");
  const [sort, setSort] = reactExports.useState("name");
  const [showModal, setShowModal] = reactExports.useState(false);
  const [editId, setEditId] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(emptyForm());
  const [deleteId, setDeleteId] = reactExports.useState(null);
  const getVendorStats = (v) => {
    const purchases = purchaseEntries.filter(
      (p) => p.vendorId === v.id || p.vendorName === v.name
    );
    const totalUnits2 = purchases.reduce((a, p) => a + (p.quantity || 0), 0);
    const totalSpend2 = purchases.reduce(
      (a, p) => a + (p.costPrice || 0) * (p.quantity || 0),
      0
    );
    return {
      purchases: purchases.length,
      units: totalUnits2,
      spend: totalSpend2
    };
  };
  const totalPurchases = purchaseEntries.length;
  const totalUnits = purchaseEntries.reduce((a, p) => a + (p.quantity || 0), 0);
  const totalSpend = purchaseEntries.reduce(
    (a, p) => a + (p.costPrice || 0) * (p.quantity || 0),
    0
  );
  let filtered = vendors.filter(
    (v) => !search || v.name.toLowerCase().includes(search.toLowerCase()) || v.email.toLowerCase().includes(search.toLowerCase())
  );
  if (sort === "name")
    filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  else if (sort === "spend") {
    filtered = [...filtered].sort(
      (a, b) => getVendorStats(b).spend - getVendorStats(a).spend
    );
  } else if (sort === "purchases") {
    filtered = [...filtered].sort(
      (a, b) => getVendorStats(b).purchases - getVendorStats(a).purchases
    );
  }
  const openAdd = () => {
    setEditId(null);
    setForm(emptyForm());
    setShowModal(true);
  };
  const openEdit = (v) => {
    setEditId(v.id);
    setForm({
      name: v.name,
      phone: v.phone,
      email: v.email,
      address: v.address
    });
    setShowModal(true);
  };
  const saveVendor = () => {
    if (!form.name.trim()) return;
    if (editId) {
      updateVendor(editId, form);
      ue.success("Vendor updated");
    } else {
      addVendor(form);
      ue.success("Vendor added successfully");
    }
    setShowModal(false);
  };
  const rankedVendors = [...vendors].map((v) => ({ ...v, ...getVendorStats(v) })).sort((a, b) => b.spend - a.spend);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-xl px-6 py-5 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 bg-white/20 rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Vendors" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-emerald-200 text-sm", children: "Manage your spare parts vendors" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: openAdd,
          className: "bg-white text-emerald-700 hover:bg-emerald-50",
          "data-ocid": "vendors.open_modal_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-1" }),
            " Add Vendor"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: [
      {
        label: "Total Vendors",
        value: vendors.length,
        color: "text-blue-600",
        icon: Users,
        bg: "bg-blue-100",
        gradient: "from-blue-50 to-white"
      },
      {
        label: "Total Purchases",
        value: totalPurchases,
        color: "text-purple-600",
        icon: ShoppingCart,
        bg: "bg-purple-100",
        gradient: "from-purple-50 to-white"
      },
      {
        label: "Total Units",
        value: totalUnits,
        color: "text-green-600",
        icon: Package,
        bg: "bg-green-100",
        gradient: "from-green-50 to-white"
      },
      {
        label: "Total Spend",
        value: `₹${totalSpend.toLocaleString()}`,
        color: "text-amber-600",
        icon: IndianRupee,
        bg: "bg-amber-100",
        gradient: "from-amber-50 to-white"
      }
    ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: `shadow-sm border-0 bg-gradient-to-br ${s.gradient}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center flex-shrink-0`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: `h-5 w-5 ${s.color}` })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: s.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-xl font-bold ${s.color}`, children: s.value })
          ] })
        ] })
      },
      s.label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "Search vendors...",
          value: search,
          onChange: (e) => setSearch(e.target.value),
          className: "max-w-xs",
          "data-ocid": "vendors.search_input"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: sort,
          onChange: (e) => setSort(e.target.value),
          className: "border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white",
          "data-ocid": "vendors.select",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "name", children: "Name A-Z" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "spend", children: "Spend High-Low" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "purchases", children: "Most Purchases" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: filtered.map((v, i) => {
      const stats = getVendorStats(v);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: "shadow-sm hover:shadow-md transition-shadow",
          "data-ocid": `vendors.card.${i + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-5 w-5 text-blue-600" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-slate-900", children: v.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-400", children: [
                    "Since ",
                    new Date(v.createdAt).toLocaleDateString()
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => openEdit(v),
                    className: "p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded",
                    "data-ocid": `vendors.edit_button.${i + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "h-4 w-4" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setDeleteId(v.id),
                    className: "p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded",
                    "data-ocid": `vendors.delete_button.${i + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 text-sm text-slate-600 mb-3", children: [
              v.phone && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-3.5 w-3.5 text-slate-400" }),
                v.phone
              ] }),
              v.email && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-3.5 w-3.5 text-slate-400" }),
                v.email
              ] }),
              v.address && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5 text-slate-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: v.address })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-slate-900", children: stats.purchases }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400", children: "Purchases" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-slate-900", children: stats.units }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400", children: "Units" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg font-bold text-slate-900", children: [
                  "₹",
                  stats.spend.toLocaleString()
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400", children: "Spend" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                className: "w-full h-8 text-xs text-blue-600 border-blue-200 hover:bg-blue-50",
                onClick: () => navigate("purchase", void 0, void 0, v.id),
                "data-ocid": `vendors.link.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-3.5 w-3.5 mr-1" }),
                  " View Purchases →"
                ]
              }
            )
          ] })
        },
        v.id
      );
    }) }),
    filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "text-center py-12 text-slate-400",
        "data-ocid": "vendors.empty_state",
        children: "No vendors found"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Vendor Spend Ranking" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-slate-200 bg-slate-50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-slate-600 font-medium", children: "#" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-slate-600 font-medium", children: "Vendor" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-slate-600 font-medium", children: "Purchases" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-slate-600 font-medium", children: "Units" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-slate-600 font-medium", children: "Total Spend" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: rankedVendors.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "border-b border-slate-100 hover:bg-slate-50",
            "data-ocid": `vendors.row.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-2 text-slate-500 font-medium", children: [
                "#",
                i + 1
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 font-medium text-slate-900", children: v.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-slate-600", children: v.purchases }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-slate-600", children: v.units }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-2 font-semibold text-green-600", children: [
                "₹",
                v.spend.toLocaleString()
              ] })
            ]
          },
          v.id
        )) })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showModal, onOpenChange: setShowModal, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "vendors.modal", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editId ? "Edit Vendor" : "Add New Vendor" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Vendor Name *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.name,
              onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
              placeholder: "Company name",
              "data-ocid": "vendors.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Phone" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.phone,
              onChange: (e) => setForm((f) => ({ ...f, phone: e.target.value })),
              placeholder: "Contact number",
              "data-ocid": "vendors.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.email,
              onChange: (e) => setForm((f) => ({ ...f, email: e.target.value })),
              placeholder: "email@example.com",
              "data-ocid": "vendors.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Address" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.address,
              onChange: (e) => setForm((f) => ({ ...f, address: e.target.value })),
              placeholder: "Business address",
              "data-ocid": "vendors.input"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            onClick: () => setShowModal(false),
            "data-ocid": "vendors.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: saveVendor,
            className: "bg-blue-600 hover:bg-blue-700",
            "data-ocid": "vendors.save_button",
            children: editId ? "Save Changes" : "Add Vendor"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!deleteId, onOpenChange: (o) => !o && setDeleteId(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "vendors.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Delete Vendor" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-600", children: "Are you sure you want to delete this vendor? This cannot be undone." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            onClick: () => setDeleteId(null),
            "data-ocid": "vendors.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "destructive",
            onClick: () => {
              if (deleteId) deleteVendor(deleteId);
              setDeleteId(null);
            },
            "data-ocid": "vendors.confirm_button",
            children: "Delete"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  VendorsPage as default
};
