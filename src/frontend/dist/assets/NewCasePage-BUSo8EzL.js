import { c as createLucideIcon, u as useStore, r as reactExports, j as jsxRuntimeExports, a8 as ClipboardList, f as TrendingUp, U as Users, i as Card, k as CardHeader, l as CardTitle, m as CardContent, z as Label, I as Input, H as Select, J as SelectTrigger, K as SelectValue, N as SelectContent, O as SelectItem, w as Button, G as ue } from "./index-De7Q6SQO.js";
import { T as Textarea } from "./textarea-CYtE04I-.js";
import { L as LoaderCircle } from "./loader-circle-DmS6SyYs.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 10v6", key: "1bos4e" }],
  ["path", { d: "M9 13h6", key: "1uhe8q" }],
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
      key: "1kt360"
    }
  ]
];
const FolderPlus = createLucideIcon("folder-plus", __iconNode);
function NewCasePage() {
  const { addCase, navigate, settings, cases, syncCases } = useStore();
  const [form, setForm] = reactExports.useState({
    caseId: "",
    customerName: "",
    phone: "",
    altPhone: "",
    address: "",
    product: "",
    productType: "",
    complaintType: "installation",
    remarks: ""
  });
  const [saving, setSaving] = reactExports.useState(false);
  const setField = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    try {
      const newCase = addCase({
        ...form,
        status: "new",
        technicianId: "",
        technicianFeedback: "",
        partCode: "",
        partName: "",
        partPhotoUrl: "",
        poNumber: "",
        orderDate: "",
        receivedDate: "",
        nextActionDate: "",
        additionalNotes: ""
      });
      await new Promise((r) => setTimeout(r, 800));
      await syncCases();
      navigate("case-detail", newCase.id);
    } catch (err) {
      ue.error("Failed to save case. Please try again.");
      console.error("addCase error:", err);
    } finally {
      setSaving(false);
    }
  };
  const todayCases = cases.filter((c) => {
    const today = (/* @__PURE__ */ new Date()).toDateString();
    return new Date(c.createdAt).toDateString() === today;
  }).length;
  const openCases = cases.filter(
    (c) => ![
      "closed",
      "cancelled",
      "transferred",
      "adjustment_closed",
      "replacement_done",
      "gas_charge_done"
    ].includes(c.status)
  ).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 sm:px-0 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl px-6 py-6 shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-white/20 rounded-xl backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FolderPlus, { className: "h-7 w-7" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "New Complaint" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-blue-200 text-sm mt-0.5", children: "Add a new service case from the company portal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mt-3 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 bg-white/15 rounded-lg px-3 py-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "h-3.5 w-3.5 text-blue-200" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold", children: [
              "Today: ",
              todayCases
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 bg-white/15 rounded-lg px-3 py-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3.5 w-3.5 text-blue-200" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold", children: [
              "Open: ",
              openCases
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 bg-white/15 rounded-lg px-3 py-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5 text-blue-200" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold", children: [
              "Total: ",
              cases.length
            ] })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Case Details" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Case ID (from portal) *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "e.g. MD-2024-123",
                value: form.caseId,
                onChange: (e) => setField("caseId", e.target.value),
                required: true,
                "data-ocid": "new_case.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Complaint Type *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.complaintType,
                onValueChange: (v) => setField("complaintType", v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "new_case.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "installation", children: "Installation (Customer)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "breakdown", children: "Breakdown (Customer)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "stock_repair", children: "Stock Machine Repair (Dealer)" })
                  ] })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Customer Name *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Full name",
                value: form.customerName,
                onChange: (e) => setField("customerName", e.target.value),
                required: true,
                "data-ocid": "new_case.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Phone *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Primary mobile",
                value: form.phone,
                onChange: (e) => setField("phone", e.target.value),
                required: true,
                "data-ocid": "new_case.input"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Alternate Phone" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Alternate mobile",
                value: form.altPhone,
                onChange: (e) => setField("altPhone", e.target.value),
                "data-ocid": "new_case.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Product *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.product,
                onValueChange: (v) => setField("product", v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select product" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: settings.products.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: p, children: p }, p)) })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Product Type / Model" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "e.g. 1.5 Ton Split",
              value: form.productType,
              onChange: (e) => setField("productType", e.target.value),
              "data-ocid": "new_case.input"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Address" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Full address",
              value: form.address,
              onChange: (e) => setField("address", e.target.value),
              "data-ocid": "new_case.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Remarks" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              placeholder: "Initial complaint notes...",
              value: form.remarks,
              onChange: (e) => setField("remarks", e.target.value),
              rows: 3,
              "data-ocid": "new_case.textarea"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              className: "flex-1",
              disabled: saving,
              "data-ocid": "new_case.submit_button",
              children: saving ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }),
                "Saving..."
              ] }) : "Create Case"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: () => navigate("cases"),
              "data-ocid": "new_case.cancel_button",
              children: "Cancel"
            }
          )
        ] })
      ] }) })
    ] })
  ] });
}
export {
  NewCasePage as default
};
