import { u as useStore, r as reactExports, j as jsxRuntimeExports, T as TriangleAlert, af as ClipboardPlus, ac as Badge, w as Button, ag as ArrowRight, y as Trash2, z as Label, a9 as FileText, I as Input, ab as User, a4 as Phone, H as Select, J as SelectTrigger, K as SelectValue, N as SelectContent, O as SelectItem } from "./index-De7Q6SQO.js";
import { T as Textarea } from "./textarea-CYtE04I-.js";
import { C as CircleCheck } from "./circle-check-DuUcrnv7.js";
import { P as Plus } from "./plus-B5kdLRRW.js";
import { M as Minus, S as Save } from "./save-COw0Edse.js";
import { I as Image } from "./image-B2_YahIC.js";
const COMPLAINT_TYPES = [
  { value: "installation", label: "Installation" },
  { value: "breakdown", label: "Breakdown" },
  { value: "stock_repair", label: "Stock Repair" }
];
const CASE_STATUSES = [
  { value: "new", label: "New" },
  { value: "printed", label: "Printed" },
  { value: "confirmed", label: "Confirmed" },
  { value: "pending", label: "Pending" },
  { value: "on_route", label: "On Route" },
  { value: "cancelled", label: "Cancelled" },
  { value: "transferred", label: "Transferred" },
  { value: "rescheduled", label: "Rescheduled" },
  { value: "part_required", label: "Part Required" },
  { value: "part_ordered", label: "Part Ordered" },
  { value: "part_received", label: "Part Received" },
  { value: "re_open", label: "Re-Open" },
  { value: "gas_charge_pending", label: "Gas Charge Pending" },
  { value: "gas_charge_done", label: "Gas Charge Done" },
  { value: "adjustment_closed", label: "Adjustment Closed" },
  { value: "replacement_done", label: "Replacement Done" },
  { value: "closed", label: "Closed" }
];
function newCaseEntry() {
  return {
    id: Math.random().toString(36).slice(2),
    caseId: "",
    customerName: "",
    phone: "",
    altPhone: "",
    address: "",
    product: "",
    productType: "",
    complaintType: "",
    status: "",
    remarks: "",
    createdDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    closedDate: "",
    partImages: [],
    caseRelatedImages: [],
    partCode: "",
    partCodes: [{ id: Math.random().toString(36).slice(2), value: "" }],
    poNumber: "",
    poNumbers: [{ id: Math.random().toString(36).slice(2), value: "" }]
  };
}
function ExistingCasesPage() {
  const { currentUser, addCase, navigate } = useStore();
  const [entries, setEntries] = reactExports.useState([newCaseEntry()]);
  const [errors, setErrors] = reactExports.useState({});
  const [saved, setSaved] = reactExports.useState(false);
  const [savedCount, setSavedCount] = reactExports.useState(0);
  if ((currentUser == null ? void 0 : currentUser.role) !== "admin") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-10 w-10 text-amber-500 mx-auto mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-semibold", children: "Admin access required" })
    ] }) });
  }
  const updateEntry = (id, field, value) => {
    setEntries(
      (prev) => prev.map((e) => e.id === id ? { ...e, [field]: value } : e)
    );
    setErrors((prev) => {
      const n = { ...prev };
      delete n[`${id}-${field}`];
      return n;
    });
  };
  const addRow = () => setEntries((prev) => [...prev, newCaseEntry()]);
  const removeRow = (id) => {
    if (entries.length === 1) return;
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };
  const validate = () => {
    const errs = {};
    for (const e of entries) {
      if (!e.customerName.trim()) errs[`${e.id}-customerName`] = "Required";
      if (!e.phone.trim()) errs[`${e.id}-phone`] = "Required";
      if (!e.complaintType) errs[`${e.id}-complaintType`] = "Required";
      if (!e.status) errs[`${e.id}-status`] = "Required";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };
  const handleSave = () => {
    if (!validate()) return;
    for (const e of entries) {
      const savedCase = addCase({
        customerName: e.customerName,
        phone: e.phone,
        altPhone: e.altPhone,
        address: e.address,
        product: e.product,
        productType: e.productType,
        complaintType: e.complaintType,
        status: e.status,
        technicianId: "",
        technicianFeedback: "",
        partCode: e.partCodes.map((p) => p.value).filter(Boolean)[0] || e.partCode,
        partName: "",
        partPhotoUrl: "",
        poNumber: e.poNumbers.map((p) => p.value).filter(Boolean)[0] || e.poNumber,
        poNumbers: e.poNumbers.map((p) => p.value).filter(Boolean),
        orderDate: "",
        receivedDate: "",
        nextActionDate: "",
        remarks: e.remarks,
        additionalNotes: "",
        caseId: e.caseId || ""
      });
      if (savedCase && e.partImages.length > 0) {
        for (let i = 0; i < e.partImages.length; i++) {
          useStore.getState().addPhotoToCase(savedCase.id, {
            url: e.partImages[i],
            type: "part",
            name: `Part Image ${i + 1}`
          });
        }
      }
      if (savedCase && e.caseRelatedImages.length > 0) {
        const relatedImgs = e.caseRelatedImages.map((url, i) => ({
          id: Math.random().toString(36).slice(2),
          url,
          name: `Case Related Image ${i + 1}`
        }));
        useStore.getState().updateCase(savedCase.id, {
          caseRelatedImages: relatedImgs
        });
      }
    }
    setSavedCount(entries.length);
    setSaved(true);
  };
  const handleAddMore = () => {
    setEntries([newCaseEntry()]);
    setErrors({});
    setSaved(false);
    setSavedCount(0);
  };
  if (saved) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 max-w-2xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-6 mb-6 shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white/20 rounded-xl p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardPlus, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold", children: "Existing Cases Entry" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-blue-100 text-sm", children: "Add historical cases that existed before this system was set up" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-10 text-center shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-9 w-9 text-blue-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-foreground mb-2", children: "Cases Added Successfully!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-base px-4 py-1", children: [
          savedCount,
          " case",
          savedCount !== 1 ? "s" : "",
          " added"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: handleAddMore,
              className: "bg-blue-600 hover:bg-blue-700 text-white gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
                " Add More Cases"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              onClick: () => navigate("cases"),
              className: "gap-2",
              children: [
                "Go to Cases ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
              ]
            }
          )
        ] })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-6 shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white/20 rounded-xl p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardPlus, { className: "h-6 w-6" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold", children: "Existing Cases Entry" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-blue-100 text-sm", children: "Add historical cases that existed before this system was set up" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-white/20 text-white border-white/30", children: [
        entries.length,
        " case",
        entries.length !== 1 ? "s" : ""
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: entries.map((entry, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-2xl shadow-sm overflow-hidden",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-b border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-blue-600 text-white rounded-lg w-7 h-7 flex items-center justify-center text-sm font-bold", children: idx + 1 }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground text-sm", children: [
                "Case Entry #",
                idx + 1
              ] })
            ] }),
            entries.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20",
                onClick: () => removeRow(entry.id),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs font-semibold text-foreground flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-3.5 w-3.5 text-blue-600" }),
                " Case ID",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: "(Optional)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "e.g. MD-2024-001",
                  value: entry.caseId,
                  onChange: (e) => updateEntry(entry.id, "caseId", e.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs font-semibold text-foreground flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-3.5 w-3.5 text-blue-600" }),
                " Customer Name",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-rose-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "e.g. Ramesh Kumar",
                  value: entry.customerName,
                  onChange: (e) => updateEntry(entry.id, "customerName", e.target.value),
                  className: errors[`${entry.id}-customerName`] ? "border-rose-500" : "",
                  "data-ocid": "existing-cases.input"
                }
              ),
              errors[`${entry.id}-customerName`] && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-rose-500", children: errors[`${entry.id}-customerName`] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs font-semibold text-foreground flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-3.5 w-3.5 text-blue-600" }),
                " Phone",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-rose-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "10-digit number",
                  value: entry.phone,
                  onChange: (e) => updateEntry(entry.id, "phone", e.target.value),
                  className: errors[`${entry.id}-phone`] ? "border-rose-500" : ""
                }
              ),
              errors[`${entry.id}-phone`] && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-rose-500", children: errors[`${entry.id}-phone`] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs font-semibold text-foreground flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-3.5 w-3.5 text-blue-600" }),
                " Alt Phone"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "Alternative number",
                  value: entry.altPhone,
                  onChange: (e) => updateEntry(entry.id, "altPhone", e.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 md:col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-foreground", children: "Address" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "Customer address",
                  value: entry.address,
                  onChange: (e) => updateEntry(entry.id, "address", e.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs font-semibold text-foreground flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-3.5 w-3.5 text-blue-600" }),
                " Product"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "e.g. AC, Fridge",
                  value: entry.product,
                  onChange: (e) => updateEntry(entry.id, "product", e.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-foreground", children: "Product Type" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "e.g. 1.5 Ton Split",
                  value: entry.productType,
                  onChange: (e) => updateEntry(entry.id, "productType", e.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs font-semibold text-foreground flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-3.5 w-3.5 text-blue-600" }),
                " Complaint Type ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-rose-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: entry.complaintType,
                  onValueChange: (v) => updateEntry(entry.id, "complaintType", v),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectTrigger,
                      {
                        className: errors[`${entry.id}-complaintType`] ? "border-rose-500" : "",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select type" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: COMPLAINT_TYPES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: t.value, children: t.label }, t.value)) })
                  ]
                }
              ),
              errors[`${entry.id}-complaintType`] && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-rose-500", children: errors[`${entry.id}-complaintType`] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs font-semibold text-foreground flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-3.5 w-3.5 text-blue-600" }),
                " Status",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-rose-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: entry.status,
                  onValueChange: (v) => updateEntry(entry.id, "status", v),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectTrigger,
                      {
                        className: errors[`${entry.id}-status`] ? "border-rose-500" : "",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select status" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CASE_STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s.value, children: s.label }, s.value)) })
                  ]
                }
              ),
              errors[`${entry.id}-status`] && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-rose-500", children: errors[`${entry.id}-status`] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-foreground", children: "Created Date" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "date",
                  value: entry.createdDate,
                  onChange: (e) => updateEntry(entry.id, "createdDate", e.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 md:col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-foreground", children: "Remarks" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  placeholder: "Any additional remarks...",
                  value: entry.remarks,
                  onChange: (e) => updateEntry(entry.id, "remarks", e.target.value),
                  className: "resize-none h-20"
                }
              )
            ] }),
            entry.status === "part_required" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 md:col-span-2 lg:col-span-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-foreground", children: "Part Codes" }),
              entry.partCodes.map((pc) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "Part Code",
                    value: pc.value,
                    onChange: (e) => {
                      setEntries(
                        (prev) => prev.map(
                          (en) => {
                            var _a;
                            return en.id === entry.id ? {
                              ...en,
                              partCodes: en.partCodes.map(
                                (p) => p.id === pc.id ? { ...p, value: e.target.value } : p
                              ),
                              partCode: ((_a = en.partCodes[0]) == null ? void 0 : _a.value) || ""
                            } : en;
                          }
                        )
                      );
                    },
                    className: "flex-1"
                  }
                ),
                entry.partCodes.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setEntries(
                      (prev) => prev.map(
                        (en) => {
                          var _a;
                          return en.id === entry.id ? {
                            ...en,
                            partCodes: en.partCodes.filter(
                              (p) => p.id !== pc.id
                            ),
                            partCode: ((_a = en.partCodes.filter(
                              (p) => p.id !== pc.id
                            )[0]) == null ? void 0 : _a.value) || ""
                          } : en;
                        }
                      )
                    ),
                    className: "text-red-400 hover:text-red-600",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-4 w-4" })
                  }
                )
              ] }, pc.id)),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setEntries(
                    (prev) => prev.map(
                      (en) => en.id === entry.id ? {
                        ...en,
                        partCodes: [
                          ...en.partCodes,
                          {
                            id: Math.random().toString(36).slice(2),
                            value: ""
                          }
                        ]
                      } : en
                    )
                  ),
                  className: "flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" }),
                    " Add Part Code"
                  ]
                }
              )
            ] }),
            entry.status === "part_ordered" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 md:col-span-2 lg:col-span-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-foreground", children: "PO Numbers" }),
              entry.poNumbers.map((po) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "PO Number",
                    value: po.value,
                    onChange: (e) => {
                      setEntries(
                        (prev) => prev.map(
                          (en) => {
                            var _a;
                            return en.id === entry.id ? {
                              ...en,
                              poNumbers: en.poNumbers.map(
                                (p) => p.id === po.id ? { ...p, value: e.target.value } : p
                              ),
                              poNumber: ((_a = en.poNumbers[0]) == null ? void 0 : _a.value) || ""
                            } : en;
                          }
                        )
                      );
                    },
                    className: "flex-1"
                  }
                ),
                entry.poNumbers.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setEntries(
                      (prev) => prev.map(
                        (en) => {
                          var _a;
                          return en.id === entry.id ? {
                            ...en,
                            poNumbers: en.poNumbers.filter(
                              (p) => p.id !== po.id
                            ),
                            poNumber: ((_a = en.poNumbers.filter(
                              (p) => p.id !== po.id
                            )[0]) == null ? void 0 : _a.value) || ""
                          } : en;
                        }
                      )
                    ),
                    className: "text-red-400 hover:text-red-600",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-4 w-4" })
                  }
                )
              ] }, po.id)),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setEntries(
                    (prev) => prev.map(
                      (en) => en.id === entry.id ? {
                        ...en,
                        poNumbers: [
                          ...en.poNumbers,
                          {
                            id: Math.random().toString(36).slice(2),
                            value: ""
                          }
                        ]
                      } : en
                    )
                  ),
                  className: "flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" }),
                    " Add PO Number"
                  ]
                }
              )
            ] }),
            [
              "closed",
              "adjustment_closed",
              "replacement_done",
              "gas_charge_done"
            ].includes(entry.status) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-foreground", children: "Closed Date" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "date",
                  value: entry.closedDate,
                  onChange: (e) => updateEntry(entry.id, "closedDate", e.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 md:col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs font-semibold text-foreground flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-3.5 w-3.5 text-blue-600" }),
                " Part Images",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: "(Optional)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "file",
                  accept: "image/*",
                  multiple: true,
                  className: "hidden",
                  id: `part-images-${entry.id}`,
                  onChange: async (e) => {
                    const files = Array.from(e.target.files ?? []);
                    const urls = await Promise.all(
                      files.map(
                        (f) => new Promise((resolve) => {
                          const reader = new FileReader();
                          reader.onload = (ev) => {
                            var _a;
                            return resolve((_a = ev.target) == null ? void 0 : _a.result);
                          };
                          reader.readAsDataURL(f);
                        })
                      )
                    );
                    setEntries(
                      (prev) => prev.map(
                        (ent) => ent.id === entry.id ? { ...ent, partImages: [...ent.partImages, ...urls] } : ent
                      )
                    );
                    e.target.value = "";
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    var _a;
                    return (_a = document.getElementById(`part-images-${entry.id}`)) == null ? void 0 : _a.click();
                  },
                  className: "flex items-center gap-2 text-xs border border-dashed border-gray-300 rounded-lg px-3 py-2 w-full hover:bg-gray-50 dark:hover:bg-gray-800",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-3 w-3 text-gray-400" }),
                    entry.partImages.length > 0 ? `${entry.partImages.length} image${entry.partImages.length > 1 ? "s" : ""} selected` : "Upload Part Images (Optional, Multiple)"
                  ]
                }
              ),
              entry.partImages.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mt-1", children: entry.partImages.map((url, idx2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: url,
                  alt: `Part ${idx2 + 1}`,
                  className: "h-16 w-16 object-cover rounded border"
                },
                url.slice(-20)
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 md:col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs font-semibold text-foreground flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-3.5 w-3.5 text-violet-600" }),
                " Case Related Images",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: "(Optional — product photo, serial no, invoice, ratings)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "file",
                  accept: "image/*",
                  multiple: true,
                  className: "hidden",
                  id: `case-related-images-${entry.id}`,
                  onChange: async (e) => {
                    const files = Array.from(e.target.files ?? []);
                    const urls = await Promise.all(
                      files.map(
                        (f) => new Promise((resolve) => {
                          const reader = new FileReader();
                          reader.onload = (ev) => {
                            var _a;
                            return resolve((_a = ev.target) == null ? void 0 : _a.result);
                          };
                          reader.readAsDataURL(f);
                        })
                      )
                    );
                    setEntries(
                      (prev) => prev.map(
                        (ent) => ent.id === entry.id ? {
                          ...ent,
                          caseRelatedImages: [
                            ...ent.caseRelatedImages,
                            ...urls
                          ]
                        } : ent
                      )
                    );
                    e.target.value = "";
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    var _a;
                    return (_a = document.getElementById(`case-related-images-${entry.id}`)) == null ? void 0 : _a.click();
                  },
                  className: "flex items-center gap-2 text-xs border border-dashed border-violet-300 rounded-lg px-3 py-2 w-full hover:bg-violet-50 dark:hover:bg-violet-900/20",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-3 w-3 text-violet-400" }),
                    entry.caseRelatedImages.length > 0 ? `${entry.caseRelatedImages.length} image${entry.caseRelatedImages.length > 1 ? "s" : ""} selected` : "Upload Case Related Images (Optional, Multiple)"
                  ]
                }
              ),
              entry.caseRelatedImages.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mt-1", children: entry.caseRelatedImages.map((url, idx2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: url,
                    alt: `Case ${idx2 + 1}`,
                    className: "h-16 w-16 object-cover rounded border border-violet-200"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setEntries(
                      (prev) => prev.map(
                        (ent) => ent.id === entry.id ? {
                          ...ent,
                          caseRelatedImages: ent.caseRelatedImages.filter(
                            (_, i) => i !== idx2
                          )
                        } : ent
                      )
                    ),
                    className: "absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center",
                    children: "×"
                  }
                )
              ] }, url.slice(-20))) })
            ] })
          ] })
        ]
      },
      entry.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-4 bg-card border border-border rounded-2xl p-4 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          onClick: addRow,
          className: "gap-2 border-blue-300 text-blue-700 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-900/20",
          "data-ocid": "existing-cases.primary_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
            " Add Another Case"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: handleSave,
          className: "gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8",
          "data-ocid": "existing-cases.submit_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
            " Save All Cases (",
            entries.length,
            ")"
          ]
        }
      )
    ] })
  ] });
}
export {
  ExistingCasesPage as default
};
