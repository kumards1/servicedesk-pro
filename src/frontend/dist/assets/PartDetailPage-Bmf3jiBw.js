import { c as createLucideIcon, u as useStore, r as reactExports, j as jsxRuntimeExports, w as Button, ak as Layers, a6 as Package, am as CircleAlert, i as Card, m as CardContent, a9 as FileText, y as Trash2, an as ShoppingBag, R as RotateCcw, T as TriangleAlert, z as Label, I as Input, A as Activity, H as Select, J as SelectTrigger, K as SelectValue, N as SelectContent, O as SelectItem, V as Search, X } from "./index-De7Q6SQO.js";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-DQvCZOLE.js";
import { D as Dialog, a as DialogContent, d as DialogFooter } from "./dialog-CsjrwcpS.js";
import { T as Textarea } from "./textarea-CYtE04I-.js";
import { B as Building2 } from "./building-2-Doljm3TO.js";
import { T as Tag } from "./tag-WKOHLAdV.js";
import { C as Calendar } from "./calendar-CSRezUDQ.js";
import { M as MapPin } from "./map-pin-BwsmX031.js";
import { L as Lightbulb } from "./lightbulb-_pEmTAiV.js";
import { I as Image } from "./image-B2_YahIC.js";
import { E as Eye } from "./eye-E-8cL4pI.js";
import { D as Download } from "./download-EX2SZm82.js";
import { P as Plus } from "./plus-B5kdLRRW.js";
import { T as Truck } from "./truck-D77gopmz.js";
import { D as DollarSign } from "./dollar-sign-NuhIYfqB.js";
import { S as Send } from "./send-oapnhRw6.js";
import { R as RefreshCw } from "./refresh-cw-BD-tKuOV.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode);
const STATUS_STYLES = {
  in_stock: "bg-green-100 text-green-700 border-green-200",
  issued: "bg-amber-100 text-amber-700 border-amber-200",
  installed: "bg-blue-100 text-blue-700 border-blue-200",
  returned_to_company: "bg-red-100 text-red-700 border-red-200",
  returned_to_store: "bg-slate-100 text-slate-600 border-slate-200"
};
const STATUS_LABELS = {
  in_stock: "In Warehouse",
  issued: "Issued",
  installed: "Installed",
  returned_to_company: "Returned to Company",
  returned_to_store: "Returned to Store"
};
function getLifecycleDotColor(action) {
  const lower = action.toLowerCase();
  if (lower.includes("purchas")) return "#3b82f6";
  if (lower.includes("stored") || lower.includes("stock")) return "#14b8a6";
  if (lower.includes("issued") || lower.includes("issue")) return "#f97316";
  if (lower.includes("returned unused") || lower.includes("return to store") || lower.includes("returned to store"))
    return "#22c55e";
  if (lower.includes("defective")) return "#ef4444";
  if (lower.includes("installed")) return "#10b981";
  if (lower.includes("returned to company") || lower.includes("return to company"))
    return "#a855f7";
  if (lower.includes("returned defective")) return "#ef4444";
  if (lower.includes("returned installed")) return "#10b981";
  if (lower.includes("relocated") || lower.includes("location"))
    return "#f59e0b";
  if (lower.includes("return")) return "#22c55e";
  return "#64748b";
}
function downloadImage(url, filename) {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
}
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
function PartDetailPage() {
  var _a, _b, _c, _d;
  const {
    selectedPartId,
    previousPage,
    navigate,
    partItems,
    partLifecycle,
    purchaseEntries,
    stockCompanies,
    stockCategories,
    stockPartNames,
    racks,
    shelves,
    bins,
    technicians,
    vendors,
    cases,
    issuePartToTechnician,
    markPartInstalled,
    returnPartToStore,
    returnPartToCompany,
    assignPartLocation,
    addPartImages,
    removePartImage,
    updatePurchaseInvoiceImage,
    removePurchaseInvoiceImage
  } = useStore();
  const part = partItems.find((p) => p.id === selectedPartId) ?? partItems.find((p) => p.partCode === selectedPartId) ?? null;
  const lifecycle = (part ? partLifecycle.filter(
    (l) => l.partId === part.id || l.partId === part.partCode
  ) : []).sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
  const [issueDialog, setIssueDialog] = reactExports.useState(false);
  const [issueTechId, setIssueTechId] = reactExports.useState("");
  const [issueCaseId, setIssueCaseId] = reactExports.useState("");
  const [issueNotes, setIssueNotes] = reactExports.useState("");
  const [issueQty, setIssueQty] = reactExports.useState(1);
  const [caseSuggestions, setCaseSuggestions] = reactExports.useState([]);
  const [showCaseSuggestions, setShowCaseSuggestions] = reactExports.useState(false);
  const [caseNotFoundWarning, setCaseNotFoundWarning] = reactExports.useState(false);
  const [returnDialog, setReturnDialog] = reactExports.useState(false);
  const [returnRemarks, setReturnRemarks] = reactExports.useState("");
  const [issueActionPending, setIssueActionPending] = reactExports.useState(null);
  const [rtcVendorId, setRtcVendorId] = reactExports.useState("");
  const [rtcRef, setRtcRef] = reactExports.useState("");
  const [rtcDate, setRtcDate] = reactExports.useState((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
  const [rtcReason, setRtcReason] = reactExports.useState("");
  const [rtcNotes, setRtcNotes] = reactExports.useState("");
  const [showRtcConfirm, setShowRtcConfirm] = reactExports.useState(false);
  const [showRelocate, setShowRelocate] = reactExports.useState(false);
  const [relRack, setRelRack] = reactExports.useState("");
  const [relShelf, setRelShelf] = reactExports.useState("");
  const [relBin, setRelBin] = reactExports.useState("");
  const [uploadingImages, setUploadingImages] = reactExports.useState(false);
  const [uploadingInvoice, setUploadingInvoice] = reactExports.useState(false);
  const [lightboxUrl, setLightboxUrl] = reactExports.useState(null);
  const [deleteConfirmState, setDeleteConfirmState] = reactExports.useState({ open: false, type: "part" });
  const partImageInputRef = reactExports.useRef(null);
  const invoiceImageInputRef = reactExports.useRef(null);
  const purchase = purchaseEntries.find((pe) => pe.id === (part == null ? void 0 : part.purchaseId));
  const company = ((_a = stockCompanies.find((c) => c.id === (part == null ? void 0 : part.companyId))) == null ? void 0 : _a.name) ?? "";
  const category = ((_b = stockCategories.find((c) => c.id === (part == null ? void 0 : part.categoryId))) == null ? void 0 : _b.name) ?? "";
  const partName = ((_c = stockPartNames.find((p) => p.id === (part == null ? void 0 : part.partNameId))) == null ? void 0 : _c.name) ?? "";
  const tech = technicians.find((t) => t.id === (part == null ? void 0 : part.technicianId));
  const rack = racks.find((r) => r.id === (part == null ? void 0 : part.rackId));
  const shelf = shelves.find((s) => s.id === (part == null ? void 0 : part.shelfId));
  const bin = bins.find((b) => b.id === (part == null ? void 0 : part.binId));
  const aggregateStockCount = reactExports.useMemo(
    () => partItems.filter(
      (p) => p.partCode === (part == null ? void 0 : part.partCode) && p.status === "in_stock"
    ).length,
    [partItems, part]
  );
  const sameCodeSuggestions = reactExports.useMemo(() => {
    if (!part) return [];
    const seen = /* @__PURE__ */ new Set();
    const results = [];
    for (const p of partItems) {
      if (p.partCode === part.partCode && p.id !== part.id && p.rackId) {
        const rk = racks.find((r) => r.id === p.rackId);
        const sh = shelves.find((s) => s.id === p.shelfId);
        const bn = bins.find((b) => b.id === p.binId);
        const key = `${p.rackId}-${p.shelfId}-${p.binId}`;
        if (!seen.has(key)) {
          seen.add(key);
          results.push({
            rackName: (rk == null ? void 0 : rk.name) ?? "—",
            shelfName: (sh == null ? void 0 : sh.name) ?? "—",
            binName: (bn == null ? void 0 : bn.name) ?? "—"
          });
        }
      }
    }
    return results;
  }, [partItems, part, racks, shelves, bins]);
  const uniqueVendors = reactExports.useMemo(() => {
    if (!part) return [];
    const purchasesForPart = purchaseEntries.filter(
      (pe) => partItems.some(
        (pi) => pi.purchaseId === pe.id && pi.partCode === part.partCode
      )
    );
    const seen = /* @__PURE__ */ new Set();
    return purchasesForPart.filter((pe) => {
      const key = pe.vendorId ?? pe.vendorName;
      if (seen.has(key ?? "")) return false;
      seen.add(key ?? "");
      return true;
    });
  }, [purchaseEntries, partItems, part]);
  if (!part) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400", children: "Part not found." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          className: "mt-4",
          onClick: () => navigate(previousPage ?? "inventory"),
          "data-ocid": "part.button",
          children: "Go Back"
        }
      )
    ] });
  }
  const singleVendorName = uniqueVendors.length === 1 ? (uniqueVendors[0].vendorId ? (_d = vendors.find((v) => v.id === uniqueVendors[0].vendorId)) == null ? void 0 : _d.name : uniqueVendors[0].vendorName) ?? "—" : null;
  const filteredShelves = shelves.filter((s) => s.rackId === relRack);
  const filteredBins = bins.filter((b) => b.shelfId === relShelf);
  const handleRelocateConfirm = () => {
    if (!relRack) return;
    assignPartLocation(part.id, relRack, relShelf, relBin);
    setShowRelocate(false);
    setRelRack("");
    setRelShelf("");
    setRelBin("");
  };
  const handleRtcSubmit = () => {
    if (!rtcReason.trim()) return;
    returnPartToCompany(part.id, rtcReason.trim(), rtcNotes);
    setRtcReason("");
    setRtcNotes("");
  };
  const handlePartImagesUpload = async (files) => {
    if (!files || files.length === 0) return;
    setUploadingImages(true);
    try {
      const base64s = await Promise.all(
        Array.from(files).map((f) => fileToBase64(f))
      );
      addPartImages(part.id, base64s);
    } finally {
      setUploadingImages(false);
      if (partImageInputRef.current) partImageInputRef.current.value = "";
    }
  };
  const handleInvoiceImageUpload = async (files) => {
    if (!files || files.length === 0) return;
    if (!purchase) return;
    setUploadingInvoice(true);
    try {
      const base64 = await fileToBase64(files[0]);
      updatePurchaseInvoiceImage(purchase.id, base64);
    } finally {
      setUploadingInvoice(false);
      if (invoiceImageInputRef.current) invoiceImageInputRef.current.value = "";
    }
  };
  const formattedDate = new Date(part.createdAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
  const allPartImages = [
    ...part.partImageUrls ?? [],
    ...part.imageUrl && !(part.partImageUrls ?? []).includes(part.imageUrl) ? [part.imageUrl] : []
  ];
  const isReturnedToCompany = part.status === "returned_to_company";
  const isInstalled = part.status === "installed";
  const isIssued = part.status === "issued";
  const locationHeading = isIssued || isReturnedToCompany || isInstalled ? "Last Location" : "Location";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pb-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => navigate(previousPage ?? "inventory"),
          "data-ocid": "part.button",
          className: "shrink-0",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 mr-1" }),
            " Back"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-slate-900 font-mono tracking-tight", children: part.partCode }),
          part.status !== "in_stock" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `text-xs px-2.5 py-1 rounded-full font-semibold border ${STATUS_STYLES[part.status]}`,
              children: STATUS_LABELS[part.status]
            }
          ),
          part.status === "in_stock" && !part.rackId && !part.shelfId && !part.binId && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 border border-amber-200 font-semibold", children: "Pending Location" }),
          part.status === "in_stock" && (part.rackId || part.shelfId || part.binId) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200 font-medium", children: "In Warehouse" }),
          part.status === "in_stock" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-medium", children: [
            aggregateStockCount,
            " in stock"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-1 text-xs text-slate-500 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-3 w-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: company }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-300", children: "›" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-3 w-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: category }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-300", children: "›" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-3 w-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: partName })
        ] })
      ] })
    ] }),
    isReturnedToCompany && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-red-200 bg-red-50 px-5 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-5 w-5 text-red-500 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-red-700 text-base", children: "Returned to Company" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-slate-500 ml-7", children: [
        company,
        " › ",
        category,
        " › ",
        partName
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-400 mt-1 ml-7", children: "No further actions available" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 bg-white/20 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-4 w-4 text-white" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-white", children: "Part Details" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-slate-100", children: [
            [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "flex items-center gap-1.5",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-3.5 w-3.5 text-blue-400" }),
                    "Part Code"
                  ]
                },
                "code-lbl"
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "font-mono font-semibold text-blue-600",
                  children: part.partCode
                },
                "code"
              )
            ],
            [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "flex items-center gap-1.5",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-3.5 w-3.5 text-slate-400" }),
                    "Part Name"
                  ]
                },
                "name-lbl"
              ),
              partName
            ],
            [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "flex items-center gap-1.5",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-3.5 w-3.5 text-emerald-500" }),
                    "Stock"
                  ]
                },
                "stock-lbl"
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full text-xs border border-emerald-200",
                  children: [
                    aggregateStockCount,
                    " units"
                  ]
                },
                "stock"
              )
            ],
            [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-3.5 w-3.5 text-indigo-400" }),
                "Company"
              ] }, "co-lbl"),
              company
            ],
            [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-3.5 w-3.5 text-violet-400" }),
                "Category"
              ] }, "cat-lbl"),
              category
            ],
            [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "flex items-center gap-1.5",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5 text-slate-400" }),
                    "Added"
                  ]
                },
                "date-lbl"
              ),
              formattedDate
            ]
          ].map(([label, value]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between py-2.5 text-sm",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500", children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-slate-800 text-right max-w-[60%]", children: value })
              ]
            },
            typeof label === "string" ? label : Math.random().toString()
          )) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 bg-white/20 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-white" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-white", children: locationHeading })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-3 space-y-3", children: [
            rack ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg text-sm font-medium text-slate-700", children: rack.name }),
              shelf && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400 text-xs", children: "›" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg text-sm font-medium text-slate-700", children: shelf.name })
              ] }),
              bin && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400 text-xs", children: "›" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg text-sm font-medium text-slate-700", children: bin.name })
              ] })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Location Pending" })
            ] }),
            part.status === "in_stock" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "text-blue-600 border-blue-300 hover:bg-blue-50",
                onClick: () => {
                  setShowRelocate(!showRelocate);
                  setRelRack(part.rackId ?? "");
                  setRelShelf(part.shelfId ?? "");
                  setRelBin(part.binId ?? "");
                },
                "data-ocid": "part.secondary_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5 mr-1" }),
                  rack ? "Relocate" : "Assign Location"
                ]
              }
            ),
            showRelocate && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-slate-200 rounded-lg p-4 bg-slate-50 space-y-3", children: [
              sameCodeSuggestions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-50 border border-amber-200 rounded-lg px-3 py-2.5 flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "h-4 w-4 text-amber-500 mt-0.5 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-amber-800", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold mb-1", children: "Same part code already located at:" }),
                  sameCodeSuggestions.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      className: "font-mono",
                      children: [
                        s.rackName,
                        " › ",
                        s.shelfName,
                        " › ",
                        s.binName
                      ]
                    },
                    `${s.rackName}-${s.shelfName}-${s.binName}`
                  ))
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "rel-rack",
                    className: "block text-xs font-medium text-slate-600 mb-1",
                    children: "Rack"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    className: "w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                    id: "rel-rack",
                    value: relRack,
                    onChange: (e) => {
                      setRelRack(e.target.value);
                      setRelShelf("");
                      setRelBin("");
                    },
                    "data-ocid": "part.select",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "— Select Rack —" }),
                      racks.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: r.id, children: r.name }, r.id))
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "rel-shelf",
                    className: "block text-xs font-medium text-slate-600 mb-1",
                    children: "Shelf"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    className: "w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50",
                    id: "rel-shelf",
                    value: relShelf,
                    onChange: (e) => {
                      setRelShelf(e.target.value);
                      setRelBin("");
                    },
                    disabled: !relRack,
                    "data-ocid": "part.select",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "— Select Shelf —" }),
                      filteredShelves.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s.id, children: s.name }, s.id))
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "rel-bin",
                    className: "block text-xs font-medium text-slate-600 mb-1",
                    children: "Bin"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    className: "w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50",
                    id: "rel-bin",
                    value: relBin,
                    onChange: (e) => setRelBin(e.target.value),
                    disabled: !relShelf,
                    "data-ocid": "part.select",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "— Select Bin —" }),
                      filteredBins.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: b.id, children: b.name }, b.id))
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "ghost",
                    onClick: () => setShowRelocate(false),
                    "data-ocid": "part.cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    onClick: handleRelocateConfirm,
                    disabled: !relRack,
                    "data-ocid": "part.confirm_button",
                    children: "Confirm Relocation"
                  }
                )
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 bg-white/20 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-4 w-4 text-white" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-white", children: "Part Images" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                ref: partImageInputRef,
                type: "file",
                multiple: true,
                accept: "image/*",
                className: "hidden",
                onChange: (e) => handlePartImagesUpload(e.target.files)
              }
            ),
            allPartImages.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: allPartImages.map((url, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "group relative aspect-square rounded-lg overflow-hidden border border-slate-200 bg-slate-100",
                  "data-ocid": `part.item.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: url,
                        alt: `Part ${i + 1}`,
                        className: "w-full h-full object-cover"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          title: "View",
                          className: "bg-white/90 hover:bg-white rounded-lg p-1.5 text-slate-700 transition-colors",
                          onClick: () => setLightboxUrl(url),
                          "data-ocid": "part.button",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3.5 w-3.5" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          title: "Download",
                          className: "bg-white/90 hover:bg-white rounded-lg p-1.5 text-slate-700 transition-colors",
                          onClick: () => downloadImage(
                            url,
                            `part-${part.partCode}-${i + 1}.jpg`
                          ),
                          "data-ocid": "part.button",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5" })
                        }
                      ),
                      !isReturnedToCompany && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          title: "Delete",
                          className: "bg-red-500/90 hover:bg-red-500 rounded-lg p-1.5 text-white transition-colors",
                          onClick: () => setDeleteConfirmState({
                            open: true,
                            type: "part",
                            url
                          }),
                          "data-ocid": "part.delete_button",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
                        }
                      )
                    ] })
                  ]
                },
                url || i
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-400", children: [
                allPartImages.length,
                " image",
                allPartImages.length !== 1 ? "s" : "",
                " — hover to view/download/delete"
              ] })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "text-center py-6 border-2 border-dashed border-slate-200 rounded-lg",
                "data-ocid": "part.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-8 w-8 mx-auto text-slate-300 mb-2" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-400", children: "No images uploaded" })
                ]
              }
            ),
            !isReturnedToCompany && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                onClick: () => {
                  var _a2;
                  return (_a2 = partImageInputRef.current) == null ? void 0 : _a2.click();
                },
                disabled: uploadingImages,
                "data-ocid": "part.upload_button",
                className: "flex items-center gap-1.5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
                  uploadingImages ? "Uploading..." : "Upload Images"
                ]
              }
            ) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 bg-white/20 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-4 w-4 text-white" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-white", children: "Purchase Info" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-slate-100", children: [
              [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "h-3.5 w-3.5 text-amber-500" }),
                  "Vendor"
                ] }, "v-lbl"),
                (purchase == null ? void 0 : purchase.vendorName) ?? "—"
              ],
              [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-3.5 w-3.5 text-slate-400" }),
                  "Invoice No."
                ] }, "inv-lbl"),
                (purchase == null ? void 0 : purchase.invoiceNumber) ?? "—"
              ],
              [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "flex items-center gap-1.5",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5 text-slate-400" }),
                      "Purchase Date"
                    ]
                  },
                  "date-lbl"
                ),
                (purchase == null ? void 0 : purchase.invoiceDate) ?? "—"
              ],
              [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "flex items-center gap-1.5",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-3.5 w-3.5 text-green-500" }),
                      "Cost"
                    ]
                  },
                  "cost-lbl"
                ),
                (purchase == null ? void 0 : purchase.costPrice) != null ? `₹${purchase.costPrice.toLocaleString()}` : "—"
              ]
            ].map(([label, value]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between py-2.5 text-sm",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500", children: label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-slate-800", children: value })
                ]
              },
              typeof label === "string" ? label : Math.random().toString()
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-3 border-t border-slate-100", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-slate-600 mb-2", children: "Invoice Image" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  ref: invoiceImageInputRef,
                  type: "file",
                  accept: "image/*",
                  className: "hidden",
                  onChange: (e) => handleInvoiceImageUpload(e.target.files)
                }
              ),
              (purchase == null ? void 0 : purchase.invoiceImageUrl) ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-24 h-24 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 group", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: purchase.invoiceImageUrl,
                      alt: "Invoice",
                      className: "w-full h-full object-cover"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        title: "View",
                        className: "bg-white/90 hover:bg-white rounded-lg p-1.5 text-slate-700",
                        onClick: () => setLightboxUrl(purchase.invoiceImageUrl),
                        "data-ocid": "part.button",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3.5 w-3.5" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        title: "Download",
                        className: "bg-white/90 hover:bg-white rounded-lg p-1.5 text-slate-700",
                        onClick: () => downloadImage(
                          purchase.invoiceImageUrl,
                          `invoice-${purchase.invoiceNumber}.jpg`
                        ),
                        "data-ocid": "part.button",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5" })
                      }
                    ),
                    !isReturnedToCompany && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        title: "Delete",
                        className: "bg-red-500/90 hover:bg-red-500 rounded-lg p-1.5 text-white",
                        onClick: () => setDeleteConfirmState({
                          open: true,
                          type: "invoice",
                          purchaseId: purchase.id
                        }),
                        "data-ocid": "part.delete_button",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
                      }
                    )
                  ] })
                ] }),
                !isReturnedToCompany && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    className: "flex items-center gap-1.5 text-xs",
                    onClick: () => {
                      var _a2;
                      return (_a2 = invoiceImageInputRef.current) == null ? void 0 : _a2.click();
                    },
                    disabled: uploadingInvoice,
                    "data-ocid": "part.upload_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" }),
                      uploadingInvoice ? "Uploading..." : "Replace Invoice Image"
                    ]
                  }
                )
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400", children: "No invoice image" }),
                !isReturnedToCompany && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    className: "flex items-center gap-1.5 text-xs",
                    onClick: () => {
                      var _a2;
                      return (_a2 = invoiceImageInputRef.current) == null ? void 0 : _a2.click();
                    },
                    disabled: uploadingInvoice || !purchase,
                    "data-ocid": "part.upload_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" }),
                      uploadingInvoice ? "Uploading..." : "Upload Invoice Image"
                    ]
                  }
                )
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        part.status === "in_stock" && !isReturnedToCompany && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "bg-blue-600 hover:bg-blue-700 w-full",
            size: "sm",
            onClick: () => {
              setIssueTechId("");
              setIssueCaseId("");
              setIssueNotes("");
              setIssueQty(1);
              setCaseSuggestions([]);
              setShowCaseSuggestions(false);
              setCaseNotFoundWarning(false);
              setIssueDialog(true);
            },
            "data-ocid": "part.primary_button",
            children: "Issue to Technician"
          }
        ) }) }),
        (isIssued || isInstalled) && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-amber-500 to-yellow-500 px-4 py-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 bg-white/20 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4 text-white" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-white", children: "Issue Details" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-3 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 text-sm divide-y divide-slate-100", children: [
              ["Technician", (tech == null ? void 0 : tech.name) ?? part.technicianId],
              ["Case ID", part.caseId],
              [
                "Issue Date",
                part.issueDate ? new Date(part.issueDate).toLocaleDateString() : "—"
              ],
              ["Issued By", part.issuedBy]
            ].map(([label, value]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between py-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500", children: label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-slate-800 text-right", children: value })
                ]
              },
              label
            )) }),
            isIssued && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2 border-t border-slate-100 space-y-2", children: !issueActionPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  className: "flex-1 bg-green-600 hover:bg-green-700",
                  size: "sm",
                  onClick: () => setIssueActionPending("install"),
                  "data-ocid": "part.primary_button",
                  children: "Mark Installed"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  className: "flex-1",
                  onClick: () => setIssueActionPending("return"),
                  "data-ocid": "part.secondary_button",
                  children: "Return to Store"
                }
              )
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: issueActionPending === "install" ? "Confirm mark as installed?" : "Confirm return to store?" }),
              issueActionPending === "return" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  value: returnRemarks,
                  onChange: (e) => setReturnRemarks(e.target.value),
                  placeholder: "Remarks (optional)",
                  rows: 2,
                  className: "text-sm",
                  "data-ocid": "part.textarea"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    className: "flex-1",
                    onClick: () => setIssueActionPending(null),
                    "data-ocid": "part.cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    className: `flex-1 ${issueActionPending === "install" ? "bg-green-600 hover:bg-green-700" : "bg-purple-600 hover:bg-purple-700"}`,
                    onClick: () => {
                      if (issueActionPending === "install")
                        markPartInstalled(part.id);
                      else returnPartToStore(part.id, returnRemarks);
                      setIssueActionPending(null);
                    },
                    "data-ocid": "part.confirm_button",
                    children: "Confirm"
                  }
                )
              ] })
            ] }) })
          ] })
        ] }),
        !isReturnedToCompany && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm overflow-hidden border-red-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-red-600 to-rose-600 px-4 py-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 bg-white/20 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-4 w-4 text-white" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-white", children: "Return to Company" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-3 space-y-3", children: isIssued ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 shrink-0 mt-0.5 text-amber-600" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Part is currently issued. Return to store first before returning to company." })
          ] }) : isInstalled ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded-lg px-3 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4 shrink-0 mt-0.5 text-blue-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Part is installed and cannot be returned to company." })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-amber-200 bg-amber-50 p-3 flex items-start gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 text-amber-600 shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber-700", children: "This action is permanent and cannot be undone. Once a part is returned to company, it cannot be reissued or relocated." })
            ] }),
            singleVendorName ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-slate-500", children: "Vendor" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-slate-800 mt-1", children: singleVendorName })
            ] }) : uniqueVendors.length > 1 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  className: "text-xs text-slate-500",
                  htmlFor: "rtc-vendor",
                  children: "Vendor"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  id: "rtc-vendor",
                  className: "mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400",
                  value: rtcVendorId,
                  onChange: (e) => setRtcVendorId(e.target.value),
                  "data-ocid": "part.select",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "— Select Vendor —" }),
                    uniqueVendors.map((pe) => {
                      var _a2;
                      const vName = pe.vendorId ? (_a2 = vendors.find((v) => v.id === pe.vendorId)) == null ? void 0 : _a2.name : pe.vendorName;
                      return /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "option",
                        {
                          value: pe.vendorId ?? pe.vendorName ?? "",
                          children: vName
                        },
                        pe.vendorId ?? pe.vendorName
                      );
                    })
                  ]
                }
              )
            ] }) : null,
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Label,
                {
                  className: "text-xs text-slate-500",
                  htmlFor: "rtc-ref",
                  children: [
                    "Reference No.",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "(optional)" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "rtc-ref",
                  className: "mt-1 text-sm",
                  placeholder: "e.g. RTN-001",
                  value: rtcRef,
                  onChange: (e) => setRtcRef(e.target.value),
                  "data-ocid": "part.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  className: "text-xs text-slate-500",
                  htmlFor: "rtc-date",
                  children: "Date"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "rtc-date",
                  type: "date",
                  className: "mt-1 text-sm",
                  value: rtcDate,
                  onChange: (e) => setRtcDate(e.target.value),
                  "data-ocid": "part.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Label,
                {
                  className: "text-xs text-slate-500",
                  htmlFor: "rtc-reason",
                  children: [
                    "Reason ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "rtc-reason",
                  className: "mt-1 text-sm",
                  placeholder: "e.g. Defective, Damaged",
                  value: rtcReason,
                  onChange: (e) => setRtcReason(e.target.value),
                  "data-ocid": "part.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Label,
                {
                  className: "text-xs text-slate-500",
                  htmlFor: "rtc-notes",
                  children: [
                    "Notes ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "(optional)" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "rtc-notes",
                  className: "mt-1 text-sm",
                  rows: 2,
                  placeholder: "Additional notes",
                  value: rtcNotes,
                  onChange: (e) => setRtcNotes(e.target.value),
                  "data-ocid": "part.textarea"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: "bg-red-600 hover:bg-red-700 w-full",
                size: "sm",
                onClick: () => setShowRtcConfirm(true),
                disabled: !rtcReason.trim(),
                "data-ocid": "part.delete_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-3.5 w-3.5 mr-1.5" }),
                  "Record Return"
                ]
              }
            )
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 bg-white/20 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-4 w-4 text-white" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-white", children: "Lifecycle" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-0", children: lifecycle.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-sm", children: "No history yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-0", children: lifecycle.map((entry, i) => {
            const dotColor = getLifecycleDotColor(entry.action);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-2.5 h-2.5 rounded-full mt-1.5 shrink-0",
                    style: { backgroundColor: dotColor }
                  }
                ),
                i < lifecycle.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-0.5 flex-1 bg-slate-200 my-1" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-4 min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-slate-800", children: entry.action }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-slate-400 shrink-0 whitespace-nowrap", children: new Date(entry.timestamp).toLocaleDateString() })
                ] }),
                entry.details && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 mt-0.5", children: entry.details }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-400", children: [
                  "by ",
                  entry.userName
                ] })
              ] })
            ] }, entry.id);
          }) }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: issueDialog,
        onOpenChange: (open) => {
          setIssueDialog(open);
          if (!open) {
            setShowCaseSuggestions(false);
            setCaseNotFoundWarning(false);
          }
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 rounded-t-lg flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-white/20 rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-5 w-5 text-white" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-white", children: "Issue to Technician" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-blue-200 text-xs", children: "Assign this part to a technician" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Technician *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: issueTechId, onValueChange: setIssueTechId, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "part.select", className: "mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select technician" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: technicians.filter((t) => t.isActive).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: t.id, children: [
                  t.name,
                  t.technicianCode ? ` (${t.technicianCode})` : ""
                ] }, t.id)) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Case ID *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    className: "pl-9 pr-8",
                    value: issueCaseId,
                    onChange: (e) => {
                      const val = e.target.value;
                      setIssueCaseId(val);
                      setCaseNotFoundWarning(false);
                      if (val.trim().length >= 1) {
                        const matches = cases.filter(
                          (c) => c.caseId.toLowerCase().includes(val.toLowerCase()) || c.customerName.toLowerCase().includes(val.toLowerCase())
                        ).slice(0, 5);
                        setCaseSuggestions(matches);
                        setShowCaseSuggestions(true);
                      } else {
                        setCaseSuggestions([]);
                        setShowCaseSuggestions(false);
                      }
                    },
                    onBlur: () => setTimeout(() => setShowCaseSuggestions(false), 150),
                    onFocus: () => {
                      if (issueCaseId.trim().length >= 1 && caseSuggestions.length > 0)
                        setShowCaseSuggestions(true);
                    },
                    placeholder: "e.g. MD-2024-001",
                    "data-ocid": "part.input"
                  }
                ),
                issueCaseId && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600",
                    onClick: () => {
                      setIssueCaseId("");
                      setCaseSuggestions([]);
                      setCaseNotFoundWarning(false);
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" })
                  }
                )
              ] }),
              showCaseSuggestions && caseSuggestions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 border border-slate-200 rounded-lg max-h-44 overflow-y-auto shadow-sm bg-white z-10 relative", children: caseSuggestions.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "w-full text-left px-3 py-2 hover:bg-blue-50 text-sm border-b border-slate-100 last:border-0",
                  onMouseDown: (e) => {
                    e.preventDefault();
                    setIssueCaseId(c.caseId);
                    setCaseSuggestions([]);
                    setShowCaseSuggestions(false);
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold text-blue-600 text-xs", children: c.caseId }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500 text-xs", children: c.customerName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 capitalize", children: c.status.replace(/_/g, " ") }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400 text-xs", children: c.productType })
                  ] })
                },
                c.id
              )) }),
              showCaseSuggestions && issueCaseId.trim().length >= 1 && caseSuggestions.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 border border-amber-200 bg-amber-50 rounded-lg p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-amber-700 font-medium mb-2", children: [
                  '⚠ No case found with ID "',
                  issueCaseId,
                  '". Do you want to proceed?'
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      className: "text-xs px-2.5 py-1 rounded bg-amber-600 text-white hover:bg-amber-700",
                      onClick: () => {
                        setCaseNotFoundWarning(true);
                        setShowCaseSuggestions(false);
                      },
                      children: "Proceed anyway"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      className: "text-xs px-2.5 py-1 rounded border border-slate-300 text-slate-600 hover:bg-slate-50",
                      onClick: () => {
                        setIssueCaseId("");
                        setShowCaseSuggestions(false);
                      },
                      children: "Clear"
                    }
                  )
                ] })
              ] }),
              caseNotFoundWarning && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber-600 mt-1", children: "⚠ Proceeding with unverified Case ID" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Quantity *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "number",
                  min: 1,
                  max: aggregateStockCount,
                  value: issueQty,
                  onChange: (e) => setIssueQty(
                    Math.max(
                      1,
                      Math.min(aggregateStockCount, Number(e.target.value))
                    )
                  ),
                  className: "mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                  "data-ocid": "part.input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-400 mt-0.5", children: [
                aggregateStockCount,
                " units available"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Notes" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  className: "mt-1",
                  value: issueNotes,
                  onChange: (e) => setIssueNotes(e.target.value),
                  placeholder: "Optional notes",
                  rows: 2,
                  "data-ocid": "part.textarea"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                onClick: () => setIssueDialog(false),
                "data-ocid": "part.cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "bg-blue-600 hover:bg-blue-700",
                onClick: () => {
                  if (!issueTechId || !issueCaseId.trim()) return;
                  const toIssue = partItems.filter(
                    (p) => p.partCode === part.partCode && p.status === "in_stock"
                  ).slice(0, issueQty);
                  for (const p of toIssue) {
                    issuePartToTechnician(p.id, issueTechId, issueCaseId.trim());
                  }
                  setIssueDialog(false);
                },
                "data-ocid": "part.confirm_button",
                children: "Issue Part"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: returnDialog, onOpenChange: setReturnDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 rounded-t-lg flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-white/20 rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-5 w-5 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-white", children: "Return to Store" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-emerald-200 text-xs", children: "Return this part from technician" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Remarks / Reason" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            value: returnRemarks,
            onChange: (e) => setReturnRemarks(e.target.value),
            placeholder: "Why is this part being returned?",
            "data-ocid": "part.textarea"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            onClick: () => setReturnDialog(false),
            "data-ocid": "part.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "bg-blue-600 hover:bg-blue-700",
            onClick: () => {
              returnPartToStore(part.id, returnRemarks);
              setReturnDialog(false);
            },
            "data-ocid": "part.confirm_button",
            children: "Return to Store"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: showRtcConfirm, onOpenChange: setShowRtcConfirm, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Confirm Return to Company?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
          "This action is",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-red-600", children: "permanent and cannot be undone" }),
          ". The part will be marked as returned to company and removed from active inventory."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "part.cancel_button", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AlertDialogAction,
          {
            className: "bg-red-600 hover:bg-red-700",
            "data-ocid": "part.confirm_button",
            onClick: () => {
              handleRtcSubmit();
              setShowRtcConfirm(false);
            },
            children: "Yes, Return to Company"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: deleteConfirmState.open,
        onOpenChange: (open) => !open && setDeleteConfirmState((s) => ({ ...s, open: false })),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Image?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "This action cannot be undone. The image will be permanently deleted." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "part.cancel_button", children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                className: "bg-red-600 hover:bg-red-700",
                "data-ocid": "part.confirm_button",
                onClick: () => {
                  if (deleteConfirmState.type === "part" && deleteConfirmState.url) {
                    removePartImage(part.id, deleteConfirmState.url);
                  } else if (deleteConfirmState.type === "invoice" && deleteConfirmState.purchaseId) {
                    removePurchaseInvoiceImage(deleteConfirmState.purchaseId);
                  }
                  setDeleteConfirmState((s) => ({ ...s, open: false }));
                },
                children: "Delete"
              }
            )
          ] })
        ] })
      }
    ),
    lightboxUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4",
        onClick: () => setLightboxUrl(null),
        onKeyDown: (e) => e.key === "Escape" && setLightboxUrl(null),
        role: "presentation",
        "data-ocid": "part.modal",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-4xl max-h-[90vh]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: lightboxUrl,
              alt: "Full size",
              className: "max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "absolute top-2 right-2 bg-white/90 hover:bg-white rounded-full p-1.5 text-slate-700",
              onClick: () => setLightboxUrl(null),
              "data-ocid": "part.close_button",
              children: "✕"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              className: "bg-white/90 text-slate-800 hover:bg-white",
              onClick: () => downloadImage(lightboxUrl, "part-image.jpg"),
              "data-ocid": "part.button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5 mr-1" }),
                "Download"
              ]
            }
          ) })
        ] })
      }
    )
  ] });
}
export {
  PartDetailPage as default
};
