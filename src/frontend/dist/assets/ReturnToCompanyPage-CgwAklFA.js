import { c as createLucideIcon, u as useStore, r as reactExports, j as jsxRuntimeExports, R as RotateCcw, w as Button, V as Search, I as Input, i as Card, m as CardContent, z as Label, a6 as Package, X, T as TriangleAlert } from "./index-De7Q6SQO.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./dialog-CsjrwcpS.js";
import { T as Textarea } from "./textarea-CYtE04I-.js";
import { P as Plus } from "./plus-B5kdLRRW.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "16", height: "20", x: "4", y: "2", rx: "2", ry: "2", key: "76otgf" }],
  ["path", { d: "M9 22v-4h6v4", key: "r93iot" }],
  ["path", { d: "M8 6h.01", key: "1dz90k" }],
  ["path", { d: "M16 6h.01", key: "1x0f13" }],
  ["path", { d: "M12 6h.01", key: "1vi96p" }],
  ["path", { d: "M12 10h.01", key: "1nrarc" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 10h.01", key: "1m94wz" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 10h.01", key: "19clt8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }]
];
const Building = createLucideIcon("building", __iconNode);
function ReturnToCompanyPage() {
  var _a, _b;
  const {
    partItems,
    stockCompanies,
    stockCategories,
    stockPartNames,
    purchaseEntries,
    vendors,
    currentUser,
    returnPartToCompany
  } = useStore();
  const [search, setSearch] = reactExports.useState("");
  const [showModal, setShowModal] = reactExports.useState(false);
  const [showFinalConfirm, setShowFinalConfirm] = reactExports.useState(false);
  const [returns, setReturns] = reactExports.useState(() => {
    return partItems.filter((p) => p.status === "returned_to_company").map((p) => {
      var _a2, _b2, _c, _d;
      const partName = ((_a2 = stockPartNames.find((n) => n.id === p.partNameId)) == null ? void 0 : _a2.name) ?? "";
      const company = ((_b2 = stockCompanies.find((c) => c.id === p.companyId)) == null ? void 0 : _b2.name) ?? "";
      const purchase = purchaseEntries.find((pur) => pur.id === p.purchaseId);
      const vendor = (purchase == null ? void 0 : purchase.vendorId) ? ((_c = vendors.find((v) => v.id === purchase.vendorId)) == null ? void 0 : _c.name) ?? purchase.vendorName : (purchase == null ? void 0 : purchase.vendorName) ?? "";
      return {
        id: p.id,
        partId: p.id,
        partCode: p.partCode,
        partName,
        companyName: company,
        vendorName: vendor,
        referenceNumber: "",
        reason: p.returnToCompanyReason,
        returnDate: ((_d = p.returnedToCompanyAt) == null ? void 0 : _d.split("T")[0]) ?? "",
        recordedBy: p.returnedToCompanyBy,
        notes: p.returnToCompanyRemarks,
        createdAt: p.returnedToCompanyAt ?? ""
      };
    });
  });
  const [partSearch, setPartSearch] = reactExports.useState("");
  const [selectedPartId, setSelectedPartId] = reactExports.useState("");
  const [referenceNumber, setReferenceNumber] = reactExports.useState("");
  const [returnDate, setReturnDate] = reactExports.useState(
    (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
  );
  const [reason, setReason] = reactExports.useState("");
  const [notes, setNotes] = reactExports.useState("");
  const [errors, setErrors] = reactExports.useState({});
  const eligibleParts = partItems.filter((p) => p.status === "in_stock");
  const searchedParts = partSearch.trim() ? eligibleParts.filter(
    (p) => p.partCode.toLowerCase().includes(partSearch.toLowerCase())
  ) : [];
  const selectedPart = partItems.find((p) => p.id === selectedPartId);
  const selectedPurchase = selectedPart ? purchaseEntries.find((pur) => pur.id === selectedPart.purchaseId) : null;
  const autoVendor = selectedPurchase ? selectedPurchase.vendorId ? ((_a = vendors.find((v) => v.id === selectedPurchase.vendorId)) == null ? void 0 : _a.name) ?? selectedPurchase.vendorName : selectedPurchase.vendorName : "";
  const openModal = () => {
    setPartSearch("");
    setSelectedPartId("");
    setReferenceNumber("");
    setReturnDate((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
    setReason("");
    setNotes("");
    setErrors({});
    setShowModal(true);
  };
  const getPartBreadcrumb = (p) => {
    var _a2, _b2, _c;
    const company = ((_a2 = stockCompanies.find((c) => c.id === p.companyId)) == null ? void 0 : _a2.name) ?? "";
    const category = ((_b2 = stockCategories.find((c) => c.id === p.categoryId)) == null ? void 0 : _b2.name) ?? "";
    const partName = ((_c = stockPartNames.find((n) => n.id === p.partNameId)) == null ? void 0 : _c.name) ?? "";
    return [company, category, partName].filter(Boolean).join(" > ");
  };
  const getPartStatus = (p) => {
    if (p.binId) return "In Warehouse";
    return "Pending Location";
  };
  const validateAndConfirm = () => {
    const errs = {};
    if (!selectedPartId) errs.part = "Please select a part";
    if (!reason.trim()) errs.reason = "Reason is required";
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setShowFinalConfirm(true);
  };
  const handleSubmit = () => {
    var _a2, _b2;
    returnPartToCompany(selectedPartId, reason, notes);
    const part = partItems.find((p) => p.id === selectedPartId);
    const partName = ((_a2 = stockPartNames.find((n) => n.id === part.partNameId)) == null ? void 0 : _a2.name) ?? "";
    const company = ((_b2 = stockCompanies.find((c) => c.id === part.companyId)) == null ? void 0 : _b2.name) ?? "";
    setReturns((prev) => [
      {
        id: `rtc-${Date.now()}`,
        partId: selectedPartId,
        partCode: part.partCode,
        partName,
        companyName: company,
        vendorName: autoVendor,
        referenceNumber,
        reason,
        returnDate,
        recordedBy: (currentUser == null ? void 0 : currentUser.name) ?? "Unknown",
        notes,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      },
      ...prev
    ]);
    setShowFinalConfirm(false);
    setShowModal(false);
  };
  const filtered = returns.filter(
    (r) => !search || r.partCode.toLowerCase().includes(search.toLowerCase()) || r.partName.toLowerCase().includes(search.toLowerCase()) || r.vendorName.toLowerCase().includes(search.toLowerCase())
  ).sort(
    (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl px-6 py-5 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 bg-white/20 rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Return to Company" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-200 text-sm", children: "Track defective parts returned to vendors/companies" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: openModal,
          className: "bg-white text-red-700 hover:bg-red-50",
          "data-ocid": "rtc.open_modal_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-1" }),
            " Record Return"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          className: "pl-9",
          placeholder: "Search returns...",
          value: search,
          onChange: (e) => setSearch(e.target.value),
          "data-ocid": "rtc.search_input"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-12 text-slate-400",
        "data-ocid": "rtc.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Building, { className: "h-8 w-8 mx-auto mb-2 opacity-40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No returns recorded yet." })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-slate-200 bg-slate-50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-slate-600 font-medium", children: "Part Code" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-slate-600 font-medium", children: "Part Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-slate-600 font-medium", children: "Vendor" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-slate-600 font-medium", children: "Reference" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-slate-600 font-medium", children: "Reason" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-slate-600 font-medium", children: "Return Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-slate-600 font-medium", children: "Recorded By" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "border-b border-slate-100 hover:bg-slate-50",
          "data-ocid": `rtc.row.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 font-mono text-xs font-semibold text-blue-600", children: r.partCode }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-slate-700", children: r.partName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-slate-600", children: r.vendorName || "-" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-slate-600", children: r.referenceNumber || "-" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-slate-600 max-w-[160px] truncate", children: r.reason }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-slate-500 text-xs", children: r.returnDate || "-" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-slate-600", children: r.recordedBy })
          ]
        },
        r.id
      )) })
    ] }) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showModal, onOpenChange: setShowModal, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", "data-ocid": "rtc.modal", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Building, { className: "h-5 w-5 text-red-600" }),
        " Record Return to Company"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Search Part Code *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                className: "pl-9",
                placeholder: "Type part code to search...",
                value: partSearch,
                onChange: (e) => {
                  setPartSearch(e.target.value);
                  if (selectedPartId) setSelectedPartId("");
                },
                "data-ocid": "rtc.part_search_input"
              }
            )
          ] }),
          errors.part && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs text-red-500 mt-1",
              "data-ocid": "rtc.error_state",
              children: errors.part
            }
          ),
          partSearch.trim() && !selectedPartId && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 border border-slate-200 rounded-lg max-h-44 overflow-y-auto shadow-sm", children: searchedParts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-400 p-3", children: "No eligible parts found" }) : searchedParts.map((p) => {
            const breadcrumb = getPartBreadcrumb(p);
            const statusLabel = getPartStatus(p);
            const isInWarehouse = statusLabel === "In Warehouse";
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "w-full text-left px-3 py-2.5 hover:bg-blue-50 border-b border-slate-100 last:border-0 flex items-center justify-between gap-2",
                onClick: () => {
                  setSelectedPartId(p.id);
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold text-blue-600 text-sm shrink-0", children: p.partCode }),
                    breadcrumb && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-slate-500 truncate", children: breadcrumb })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `text-xs px-2 py-0.5 rounded-full shrink-0 font-medium ${isInWarehouse ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`,
                      children: statusLabel
                    }
                  )
                ]
              },
              p.id
            );
          }) }),
          selectedPartId && selectedPart && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 border border-blue-200 rounded-lg bg-blue-50 p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-4 w-4 text-blue-600 mt-0.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-slate-500 w-20", children: "Part Code" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm font-semibold text-blue-700", children: selectedPart.partCode })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-slate-500 w-20", children: "Part Name" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-slate-700", children: ((_b = stockPartNames.find(
                    (n) => n.id === selectedPart.partNameId
                  )) == null ? void 0 : _b.name) ?? "-" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-slate-500 w-20", children: "Status" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `text-xs px-2 py-0.5 rounded-full font-medium ${getPartStatus(selectedPart) === "In Warehouse" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`,
                      children: getPartStatus(selectedPart)
                    }
                  )
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 shrink-0 mt-0.5",
                onClick: () => {
                  setSelectedPartId("");
                  setPartSearch("");
                },
                "data-ocid": "rtc.change_part_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" }),
                  " Change"
                ]
              }
            )
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Vendor" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: autoVendor || "",
              readOnly: true,
              className: "bg-slate-50",
              placeholder: "Auto-filled from purchase record"
            }
          ),
          autoVendor && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 mt-1", children: "Auto-filled from purchase record" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Reference / Invoice No" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: referenceNumber,
                onChange: (e) => setReferenceNumber(e.target.value),
                placeholder: "Ref number",
                "data-ocid": "rtc.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Return Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "date",
                value: returnDate,
                onChange: (e) => setReturnDate(e.target.value),
                "data-ocid": "rtc.input"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Reason *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              value: reason,
              onChange: (e) => setReason(e.target.value),
              placeholder: "Defective / damaged / wrong part...",
              rows: 2,
              "data-ocid": "rtc.textarea"
            }
          ),
          errors.reason && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs text-red-500 mt-1",
              "data-ocid": "rtc.error_state",
              children: errors.reason
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Notes (optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              value: notes,
              onChange: (e) => setNotes(e.target.value),
              placeholder: "Additional notes...",
              rows: 2,
              "data-ocid": "rtc.textarea"
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
            "data-ocid": "rtc.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: validateAndConfirm,
            className: "bg-red-600 hover:bg-red-700",
            "data-ocid": "rtc.confirm_button",
            children: "Record Return"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showFinalConfirm, onOpenChange: setShowFinalConfirm, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", "data-ocid": "rtc.confirm_dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2 text-red-700", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-5 w-5 text-amber-500" }),
        "Confirm Return to Company"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-amber-200 bg-amber-50 p-3 flex items-start gap-2 my-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 text-amber-600 shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-amber-800", children: "This action is permanent and cannot be undone." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-amber-700", children: [
            "Part",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold", children: selectedPart == null ? void 0 : selectedPart.partCode }),
            " ",
            "will be permanently removed from inventory and marked as returned to company."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            onClick: () => setShowFinalConfirm(false),
            "data-ocid": "rtc.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "bg-red-600 hover:bg-red-700",
            onClick: handleSubmit,
            "data-ocid": "rtc.final_confirm_button",
            children: "Yes, Return to Company"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  ReturnToCompanyPage as default
};
