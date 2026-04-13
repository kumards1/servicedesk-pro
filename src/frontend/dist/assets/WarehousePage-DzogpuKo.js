import { c as createLucideIcon, u as useStore, r as reactExports, j as jsxRuntimeExports, a6 as Package, b as Tabs, d as TabsList, e as TabsTrigger, g as TabsContent, w as Button, y as Trash2, V as Search, I as Input, ak as Layers, z as Label, H as Select, J as SelectTrigger, K as SelectValue, N as SelectContent, O as SelectItem, G as ue, aj as FolderOpen } from "./index-De7Q6SQO.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./dialog-CsjrwcpS.js";
import { B as Building2 } from "./building-2-Doljm3TO.js";
import { M as MapPin } from "./map-pin-BwsmX031.js";
import { P as Plus } from "./plus-B5kdLRRW.js";
import { P as Pencil } from "./pencil-B4TAhzLG.js";
import { T as Tag } from "./tag-WKOHLAdV.js";
import { F as Folder } from "./folder-Dv2xNaht.js";
import { L as Lightbulb } from "./lightbulb-_pEmTAiV.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M3 12h18", key: "1i2n21" }],
  ["path", { d: "M3 18h18", key: "1h113x" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }]
];
const AlignJustify = createLucideIcon("align-justify", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",
      key: "hh9hay"
    }
  ],
  ["path", { d: "m3.3 7 8.7 5 8.7-5", key: "g66t2b" }],
  ["path", { d: "M12 22V12", key: "d0xqtd" }]
];
const Box = createLucideIcon("box", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "7", height: "7", x: "3", y: "3", rx: "1", key: "1g98yp" }],
  ["rect", { width: "7", height: "7", x: "14", y: "3", rx: "1", key: "6d4xhi" }],
  ["rect", { width: "7", height: "7", x: "14", y: "14", rx: "1", key: "nxv5o0" }],
  ["rect", { width: "7", height: "7", x: "3", y: "14", rx: "1", key: "1bb6yr" }]
];
const LayoutGrid = createLucideIcon("layout-grid", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "20", height: "8", x: "2", y: "2", rx: "2", ry: "2", key: "ngkwjq" }],
  ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2", ry: "2", key: "iecqi9" }],
  ["line", { x1: "6", x2: "6.01", y1: "6", y2: "6", key: "16zg32" }],
  ["line", { x1: "6", x2: "6.01", y1: "18", y2: "18", key: "nzw8ys" }]
];
const Server = createLucideIcon("server", __iconNode);
function DeleteConfirm({
  open,
  title,
  message,
  onConfirm,
  onCancel
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => !v && onCancel(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "text-red-600 flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-5 w-5" }),
      " ",
      title
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-600", children: message }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          onClick: onCancel,
          "data-ocid": "warehouse.cancel_button",
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "destructive",
          onClick: onConfirm,
          "data-ocid": "warehouse.confirm_button",
          children: "Delete"
        }
      )
    ] })
  ] }) });
}
function AssignLocationDialog({
  open,
  partId,
  partCode,
  allPartItems,
  racks,
  shelves,
  bins,
  onAssign,
  onClose
}) {
  var _a, _b, _c;
  const [rack, setRack] = reactExports.useState("");
  const [shelf, setShelf] = reactExports.useState("");
  const [bin, setBin] = reactExports.useState("");
  const sameCodeLocations = (() => {
    var _a2, _b2, _c2;
    const seen = /* @__PURE__ */ new Set();
    const results = [];
    for (const p of allPartItems) {
      if (p.partCode === partCode && p.id !== partId && p.rackId) {
        const key = `${p.rackId}-${p.shelfId}-${p.binId}`;
        if (!seen.has(key)) {
          seen.add(key);
          const rackName = ((_a2 = racks.find((r) => r.id === p.rackId)) == null ? void 0 : _a2.name) ?? p.rackId;
          const shelfName = ((_b2 = shelves.find((s) => s.id === p.shelfId)) == null ? void 0 : _b2.name) ?? "";
          const binName = ((_c2 = bins.find((b) => b.id === p.binId)) == null ? void 0 : _c2.name) ?? "";
          results.push({ rackName, shelfName, binName });
        }
      }
    }
    return results;
  })();
  const handleClose = () => {
    setRack("");
    setShelf("");
    setBin("");
    onClose();
  };
  const selectedRackName = (_a = racks.find((r) => r.id === rack)) == null ? void 0 : _a.name;
  const selectedShelfName = (_b = shelves.find((s) => s.id === shelf)) == null ? void 0 : _b.name;
  const selectedBinName = (_c = bins.find((b) => b.id === bin)) == null ? void 0 : _c.name;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => !v && handleClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md p-0 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5 text-white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-white/20 rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-5 w-5 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold", children: "Assign Location" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-indigo-200 text-xs mt-0.5", children: "Select a rack, shelf and bin for this part" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-2 bg-white/15 rounded-xl px-4 py-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `text-sm font-semibold ${selectedRackName ? "text-white" : "text-indigo-300"}`,
            children: selectedRackName ?? "Rack"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-indigo-300 text-sm", children: "›" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `text-sm font-semibold ${selectedShelfName ? "text-white" : "text-indigo-300"}`,
            children: selectedShelfName ?? "Shelf"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-indigo-300 text-sm", children: "›" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `text-sm font-semibold ${selectedBinName ? "text-white" : "text-indigo-300"}`,
            children: selectedBinName ?? "Bin"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-5 space-y-4", children: [
      sameCodeLocations.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl bg-yellow-50 border border-yellow-200 px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1 bg-yellow-200 rounded-md mt-0.5 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "h-3.5 w-3.5 text-yellow-700" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-yellow-800 mb-1.5", children: "Same part code already assigned to:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: sameCodeLocations.map((loc) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-xs text-yellow-700 bg-yellow-100 rounded-lg px-2.5 py-1.5 font-mono",
              children: [
                loc.rackName,
                loc.shelfName ? ` › ${loc.shelfName}` : "",
                loc.binName ? ` › ${loc.binName}` : ""
              ]
            },
            `${loc.rackName}-${loc.shelfName}-${loc.binName}`
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-yellow-600 mt-1.5 italic", children: "You can assign this part to the same location for easy tracking." })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-amber-50 border border-amber-100 px-4 py-3 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm font-semibold text-amber-700", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1 bg-amber-200 rounded-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Server, { className: "h-3.5 w-3.5 text-amber-700" }) }),
          "Rack"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: rack,
            onValueChange: (v) => {
              setRack(v);
              setShelf("");
              setBin("");
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "bg-white border-amber-200 focus:ring-amber-400",
                  "data-ocid": "warehouse.select",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select rack" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: racks.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: r.id, children: r.name }, r.id)) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `rounded-xl border px-4 py-3 space-y-2 transition-opacity ${rack ? "bg-emerald-50 border-emerald-100" : "bg-slate-50 border-slate-100 opacity-60"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm font-semibold text-emerald-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1 bg-emerald-200 rounded-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlignJustify, { className: "h-3.5 w-3.5 text-emerald-700" }) }),
              "Shelf"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: shelf,
                onValueChange: (v) => {
                  setShelf(v);
                  setBin("");
                },
                disabled: !rack,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      className: "bg-white border-emerald-200 focus:ring-emerald-400",
                      "data-ocid": "warehouse.select",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select shelf" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: shelves.filter((s) => s.rackId === rack).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s.id, children: s.name }, s.id)) })
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `rounded-xl border px-4 py-3 space-y-2 transition-opacity ${shelf ? "bg-blue-50 border-blue-100" : "bg-slate-50 border-slate-100 opacity-60"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm font-semibold text-blue-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1 bg-blue-200 rounded-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { className: "h-3.5 w-3.5 text-blue-700" }) }),
              "Bin ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400 font-normal", children: "(optional)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: bin, onValueChange: setBin, disabled: !shelf, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "bg-white border-blue-200 focus:ring-blue-400",
                  "data-ocid": "warehouse.select",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select bin" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: bins.filter((b) => b.shelfId === shelf).map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: b.id, children: b.name }, b.id)) })
            ] })
          ]
        }
      ),
      rack && shelf && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 px-4 py-3 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 bg-indigo-100 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-indigo-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-indigo-500 font-medium", children: "Selected path" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-indigo-700", children: [
            selectedRackName,
            " › ",
            selectedShelfName,
            selectedBinName ? ` › ${selectedBinName}` : ""
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            onClick: handleClose,
            className: "flex-1",
            "data-ocid": "warehouse.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            className: "flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold shadow-md",
            disabled: !rack || !shelf,
            onClick: () => {
              onAssign(partId, rack, shelf, bin);
              handleClose();
            },
            "data-ocid": "warehouse.confirm_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 mr-2" }),
              "Assign Location"
            ]
          }
        )
      ] })
    ] })
  ] }) });
}
function WarehouseLayoutView({
  warehouse,
  racks,
  shelves,
  bins,
  partItems,
  stockPartNames,
  isAdmin,
  onBack,
  onAddRack,
  onEditRack,
  onDeleteRack,
  onAddShelf,
  onEditShelf,
  onDeleteShelf,
  onAddBin,
  onEditBin,
  onDeleteBin,
  onPartClick
}) {
  const warehouseRacks = racks.filter(
    (r) => r.warehouseId === warehouse.id || !r.warehouseId
  );
  const [expandedRacks, setExpandedRacks] = reactExports.useState(/* @__PURE__ */ new Set());
  const [expandedShelves, setExpandedShelves] = reactExports.useState(
    /* @__PURE__ */ new Set()
  );
  const [expandedLocRacks, setExpandedLocRacks] = reactExports.useState(
    /* @__PURE__ */ new Set()
  );
  const [expandedLocShelves, setExpandedLocShelves] = reactExports.useState(
    /* @__PURE__ */ new Set()
  );
  const [expandedLocBins, setExpandedLocBins] = reactExports.useState(
    /* @__PURE__ */ new Set()
  );
  const toggleRack = (id) => setExpandedRacks((prev) => {
    const s = new Set(prev);
    s.has(id) ? s.delete(id) : s.add(id);
    return s;
  });
  const toggleShelf = (id) => setExpandedShelves((prev) => {
    const s = new Set(prev);
    s.has(id) ? s.delete(id) : s.add(id);
    return s;
  });
  const toggleLocRack = (id) => setExpandedLocRacks((prev) => {
    const s = new Set(prev);
    s.has(id) ? s.delete(id) : s.add(id);
    return s;
  });
  const toggleLocShelf = (id) => setExpandedLocShelves((prev) => {
    const s = new Set(prev);
    s.has(id) ? s.delete(id) : s.add(id);
    return s;
  });
  const toggleLocBin = (id) => setExpandedLocBins((prev) => {
    const s = new Set(prev);
    s.has(id) ? s.delete(id) : s.add(id);
    return s;
  });
  const getPartName = (id) => {
    var _a;
    return ((_a = stockPartNames.find((p) => p.id === id)) == null ? void 0 : _a.name) ?? "—";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: onBack,
          className: "text-sm text-blue-600 hover:underline flex items-center gap-1",
          "data-ocid": "warehouse.button",
          children: "← Warehouses"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-300", children: "/" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-5 w-5 text-slate-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-slate-900", children: warehouse.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: warehouse.address })
        ] })
      ] }),
      isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          className: "ml-auto bg-blue-600 hover:bg-blue-700",
          onClick: onAddRack,
          "data-ocid": "warehouse.open_modal_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Server, { className: "h-4 w-4 mr-1" }),
            " Add Rack"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: warehouseRacks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "text-center py-8 text-slate-400 text-sm",
        "data-ocid": "warehouse.empty_state",
        children: "No racks in this warehouse."
      }
    ) : warehouseRacks.map((rack, ri) => {
      const rackShelves = shelves.filter((s) => s.rackId === rack.id);
      const isExpanded = expandedRacks.has(rack.id);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "border border-slate-200 rounded-lg overflow-hidden",
          "data-ocid": `warehouse.item.${ri + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => toggleRack(rack.id),
                  className: "flex items-center gap-2 flex-1 text-left",
                  children: [
                    isExpanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "h-5 w-5 text-white/80" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Folder, { className: "h-5 w-5 text-blue-200" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1 bg-white/20 rounded-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Server, { className: "h-4 w-4 text-white" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-white", children: rack.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-white/20 text-white text-xs px-2 py-0.5 rounded-full font-medium", children: [
                      rackShelves.length,
                      " shelf(ves)"
                    ] })
                  ]
                }
              ),
              isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "ghost",
                    className: "text-white/80 hover:text-white hover:bg-white/20",
                    onClick: () => onEditRack(rack),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "ghost",
                    className: "text-red-200 hover:text-white hover:bg-red-500/30",
                    onClick: () => onDeleteRack(rack),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
                  }
                )
              ] })
            ] }),
            isExpanded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pl-6 pr-4 pb-3 space-y-2 mt-2", children: [
              rackShelves.map((shelf, si) => {
                const shelfBins = bins.filter(
                  (b) => b.shelfId === shelf.id
                );
                const isShelfExpanded = expandedShelves.has(shelf.id);
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "border border-slate-200 rounded-md overflow-hidden",
                    "data-ocid": `warehouse.item.${si + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center px-3 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100 gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "button",
                            onClick: () => toggleShelf(shelf.id),
                            className: "flex items-center gap-2 flex-1 text-left",
                            children: [
                              isShelfExpanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "h-4 w-4 text-emerald-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Folder, { className: "h-4 w-4 text-emerald-300" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-0.5 bg-emerald-100 rounded", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlignJustify, { className: "h-3.5 w-3.5 text-emerald-600" }) }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-emerald-800", children: shelf.name }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full font-medium", children: [
                                shelfBins.length,
                                " bin(s)"
                              ] })
                            ]
                          }
                        ),
                        isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Button,
                            {
                              size: "sm",
                              variant: "ghost",
                              className: "text-emerald-600 hover:bg-emerald-100",
                              onClick: () => onEditShelf(shelf),
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3 w-3" })
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Button,
                            {
                              size: "sm",
                              variant: "ghost",
                              className: "text-red-400 hover:bg-red-50",
                              onClick: () => onDeleteShelf(shelf),
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3" })
                            }
                          )
                        ] })
                      ] }),
                      isShelfExpanded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-2 pt-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: shelfBins.map((bin) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            className: "flex items-center gap-1 bg-amber-50 border border-amber-200 rounded-full px-2.5 py-1 text-xs text-amber-800 font-medium",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { className: "h-3 w-3 text-amber-500" }),
                              bin.name,
                              isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "button",
                                  {
                                    type: "button",
                                    onClick: () => onEditBin(bin),
                                    className: "text-slate-400 hover:text-slate-700",
                                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-2.5 w-2.5" })
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "button",
                                  {
                                    type: "button",
                                    onClick: () => onDeleteBin(bin),
                                    className: "text-red-400 hover:text-red-600",
                                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-2.5 w-2.5" })
                                  }
                                )
                              ] })
                            ]
                          },
                          bin.id
                        )) }),
                        isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "button",
                            onClick: () => onAddBin(shelf.id),
                            className: "mt-2 text-xs text-blue-600 hover:underline flex items-center gap-1",
                            "data-ocid": "warehouse.open_modal_button",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { className: "h-3 w-3" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" }),
                              " Add Bin"
                            ]
                          }
                        )
                      ] })
                    ]
                  },
                  shelf.id
                );
              }),
              isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => onAddShelf(rack.id),
                  className: "text-xs text-blue-600 hover:underline flex items-center gap-1 mt-1",
                  "data-ocid": "warehouse.open_modal_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AlignJustify, { className: "h-3 w-3" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" }),
                    " Add Shelf"
                  ]
                }
              )
            ] })
          ]
        },
        rack.id
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3 p-3 bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 rounded-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 bg-indigo-100 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-4 w-4 text-indigo-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-indigo-900 text-sm", children: "Parts by Location" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full ml-auto font-medium", children: [
          partItems.filter(
            (p) => p.rackId && p.status !== "returned_to_company"
          ).length,
          " ",
          "Parts"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: warehouseRacks.map((rack, ri) => {
        const rackParts = partItems.filter(
          (p) => p.rackId === rack.id && p.status !== "returned_to_company"
        );
        const rackShelves = shelves.filter((s) => s.rackId === rack.id);
        const isExpanded = expandedLocRacks.has(rack.id);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "border border-slate-200 rounded-lg overflow-hidden",
            "data-ocid": `warehouse.item.${ri + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => toggleLocRack(rack.id),
                  className: "w-full flex items-center px-4 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 gap-2 text-left",
                  children: [
                    isExpanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "h-5 w-5 text-white/80" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Folder, { className: "h-5 w-5 text-blue-200" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1 bg-white/20 rounded-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Server, { className: "h-4 w-4 text-white" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-white", children: rack.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-white/20 text-white text-xs px-2 py-0.5 rounded-full font-medium", children: [
                        rackShelves.length,
                        " Shelves"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-white/20 text-white text-xs px-2 py-0.5 rounded-full font-medium", children: [
                        rackParts.length,
                        " Parts"
                      ] })
                    ] })
                  ]
                }
              ),
              isExpanded && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pl-6 pr-4 pb-3 space-y-2 mt-2", children: rackShelves.map((shelf, si) => {
                const shelfBins = bins.filter(
                  (b) => b.shelfId === shelf.id
                );
                const shelfBinIds = shelfBins.map((b) => b.id);
                const shelfParts = partItems.filter(
                  (p) => p.shelfId === shelf.id && p.binId && shelfBinIds.includes(p.binId) && p.status !== "returned_to_company"
                );
                const isShelfExpanded = expandedLocShelves.has(shelf.id);
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "border border-slate-200 rounded-md overflow-hidden",
                    "data-ocid": `warehouse.item.${si + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: () => toggleLocShelf(shelf.id),
                          className: "w-full flex items-center px-3 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100 gap-2 text-left",
                          children: [
                            isShelfExpanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "h-4 w-4 text-emerald-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Folder, { className: "h-4 w-4 text-emerald-300" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-0.5 bg-emerald-100 rounded", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlignJustify, { className: "h-3.5 w-3.5 text-emerald-600" }) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-emerald-800", children: shelf.name }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex gap-1.5", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full font-medium", children: [
                                shelfBins.length,
                                " Bins"
                              ] }),
                              shelfParts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-teal-100 text-teal-700 text-xs px-2 py-0.5 rounded-full font-medium", children: [
                                shelfParts.length,
                                " Parts"
                              ] })
                            ] })
                          ]
                        }
                      ),
                      isShelfExpanded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-3 pt-1 space-y-2", children: [
                        shelfBins.map((bin) => {
                          const binParts = partItems.filter(
                            (p) => p.binId && bin.id && p.binId === bin.id && p.status !== "returned_to_company"
                          );
                          const isBinExpanded = expandedLocBins.has(
                            bin.id
                          );
                          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "div",
                            {
                              className: "border border-slate-100 rounded",
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                  "button",
                                  {
                                    type: "button",
                                    onClick: () => toggleLocBin(bin.id),
                                    className: "w-full flex items-center px-2 py-1.5 bg-amber-50 border-b border-amber-100 gap-2 text-left",
                                    children: [
                                      isBinExpanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "h-3.5 w-3.5 text-amber-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Folder, { className: "h-3.5 w-3.5 text-amber-300" }),
                                      /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { className: "h-3 w-3 text-amber-500" }),
                                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-amber-800", children: bin.name }),
                                      binParts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full font-medium ml-auto", children: [
                                        binParts.length,
                                        " Parts"
                                      ] })
                                    ]
                                  }
                                ),
                                isBinExpanded && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 pb-2 space-y-1", children: binParts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400", children: "No parts" }) : binParts.map((part) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                  "div",
                                  {
                                    className: "flex items-center gap-2 text-xs",
                                    children: [
                                      /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-3 w-3 text-blue-400" }),
                                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                                        "button",
                                        {
                                          type: "button",
                                          onClick: () => onPartClick(part.partCode),
                                          className: "font-mono text-blue-700 font-semibold hover:underline",
                                          children: part.partCode
                                        }
                                      ),
                                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-600", children: getPartName(part.partNameId) })
                                    ]
                                  },
                                  part.id
                                )) })
                              ]
                            },
                            bin.id
                          );
                        }),
                        (() => {
                          const noBinParts = shelfParts.filter(
                            (p) => !p.binId
                          );
                          if (noBinParts.length === 0) return null;
                          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: noBinParts.map((part) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "div",
                            {
                              className: "flex items-center gap-2 text-xs",
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-3 w-3 text-blue-400" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "button",
                                  {
                                    type: "button",
                                    onClick: () => onPartClick(part.partCode),
                                    className: "font-mono text-blue-700 font-semibold hover:underline",
                                    children: part.partCode
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-600", children: getPartName(part.partNameId) })
                              ]
                            },
                            part.id
                          )) });
                        })()
                      ] })
                    ]
                  },
                  shelf.id
                );
              }) })
            ]
          },
          rack.id
        );
      }) })
    ] })
  ] });
}
function WarehousePage() {
  var _a;
  const {
    warehouses,
    racks,
    shelves,
    bins,
    partItems,
    stockCompanies,
    stockCategories,
    stockPartNames,
    currentUser,
    addWarehouse,
    updateWarehouse,
    deleteWarehouse,
    addRackToWarehouse,
    updateRack,
    deleteRack,
    addShelf,
    updateShelf,
    deleteShelf,
    addBin,
    updateBin,
    deleteBin,
    assignPartLocation,
    navigate
  } = useStore();
  const isAdmin = (currentUser == null ? void 0 : currentUser.role) === "admin";
  const [selectedWarehouse, setSelectedWarehouse] = reactExports.useState(
    null
  );
  const [whDialog, setWhDialog] = reactExports.useState(false);
  const [whEdit, setWhEdit] = reactExports.useState(null);
  const [whName, setWhName] = reactExports.useState("");
  const [whAddress, setWhAddress] = reactExports.useState("");
  const [rackDialog, setRackDialog] = reactExports.useState(false);
  const [rackEdit, setRackEdit] = reactExports.useState(null);
  const [rackName, setRackName] = reactExports.useState("");
  const [rackWhId, setRackWhId] = reactExports.useState("");
  const [shelfDialog, setShelfDialog] = reactExports.useState(false);
  const [shelfEdit, setShelfEdit] = reactExports.useState(null);
  const [shelfName, setShelfName] = reactExports.useState("");
  const [shelfRackId, setShelfRackId] = reactExports.useState("");
  const [binDialog, setBinDialog] = reactExports.useState(false);
  const [binEdit, setBinEdit] = reactExports.useState(null);
  const [binName, setBinName] = reactExports.useState("");
  const [binShelfId, setBinShelfId] = reactExports.useState("");
  const [deleteConfirm, setDeleteConfirm] = reactExports.useState({ open: false, title: "", message: "", onConfirm: () => {
  } });
  const [assignDialog, setAssignDialog] = reactExports.useState(false);
  const [assignPartId, setAssignPartId] = reactExports.useState("");
  const [pendingSearch, setPendingSearch] = reactExports.useState("");
  const locationPending = partItems.filter(
    (p) => !p.rackId && p.status !== "returned_to_company" && p.status !== "issued"
  );
  const filteredPending = pendingSearch.trim() ? locationPending.filter((p) => {
    var _a2;
    const partName = ((_a2 = stockPartNames.find((pn) => pn.id === p.partNameId)) == null ? void 0 : _a2.name) ?? "";
    const q = pendingSearch.toLowerCase();
    return p.partCode.toLowerCase().includes(q) || partName.toLowerCase().includes(q);
  }) : locationPending;
  const confirmDelete = (title, message, fn) => {
    setDeleteConfirm({ open: true, title, message, onConfirm: fn });
  };
  const handlePartClick = (partCode) => {
    const item = partItems.find((p) => p.partCode === partCode);
    if (item) navigate("part-detail", void 0, item.id);
  };
  const openAddWarehouse = () => {
    setWhEdit(null);
    setWhName("");
    setWhAddress("");
    setWhDialog(true);
  };
  const openEditWarehouse = (wh) => {
    setWhEdit(wh);
    setWhName(wh.name);
    setWhAddress(wh.address);
    setWhDialog(true);
  };
  const saveWarehouse = () => {
    if (!whName.trim()) return;
    if (whEdit) updateWarehouse(whEdit.id, whName.trim(), whAddress.trim());
    else {
      addWarehouse(whName.trim(), whAddress.trim());
      ue.success(
        whEdit ? "Warehouse updated" : "Warehouse added successfully"
      );
    }
    setWhDialog(false);
  };
  const openAddRack = (warehouseId) => {
    setRackEdit(null);
    setRackName("");
    setRackWhId(warehouseId);
    setRackDialog(true);
  };
  const openEditRack = (rack) => {
    setRackEdit(rack);
    setRackName(rack.name);
    setRackWhId(rack.warehouseId ?? "");
    setRackDialog(true);
  };
  const saveRack = () => {
    if (!rackName.trim()) return;
    if (rackEdit) updateRack(rackEdit.id, rackName.trim());
    else {
      addRackToWarehouse(rackName.trim(), rackWhId);
      ue.success(rackEdit ? "Rack updated" : "Rack added successfully");
    }
    setRackDialog(false);
  };
  const openAddShelf = (rackId) => {
    setShelfEdit(null);
    setShelfName("");
    setShelfRackId(rackId);
    setShelfDialog(true);
  };
  const openEditShelf = (shelf) => {
    setShelfEdit(shelf);
    setShelfName(shelf.name);
    setShelfRackId(shelf.rackId);
    setShelfDialog(true);
  };
  const saveShelf = () => {
    if (!shelfName.trim() || !shelfRackId) return;
    if (shelfEdit)
      updateShelf(shelfEdit.id, {
        name: shelfName.trim(),
        rackId: shelfRackId
      });
    else {
      addShelf(shelfName.trim(), shelfRackId);
      ue.success(shelfEdit ? "Shelf updated" : "Shelf added successfully");
    }
    setShelfDialog(false);
  };
  const openAddBin = (shelfId) => {
    setBinEdit(null);
    setBinName("");
    setBinShelfId(shelfId);
    setBinDialog(true);
  };
  const openEditBin = (bin) => {
    setBinEdit(bin);
    setBinName(bin.name);
    setBinShelfId(bin.shelfId);
    setBinDialog(true);
  };
  const saveBin = () => {
    if (!binName.trim() || !binShelfId) return;
    if (binEdit)
      updateBin(binEdit.id, { name: binName.trim(), shelfId: binShelfId });
    else {
      addBin(binName.trim(), binShelfId);
      ue.success(binEdit ? "Bin updated" : "Bin added successfully");
    }
    setBinDialog(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-r from-indigo-700 via-blue-700 to-cyan-700 text-white rounded-2xl px-6 py-5 shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-white/20 rounded-2xl shadow-inner", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-7 w-7" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "Warehouse Management" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-blue-200 text-sm mt-0.5", children: "Manage warehouse locations and track stock placement" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-white/15 rounded-xl px-3 py-2 border border-white/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Server, { className: "h-4 w-4 text-blue-200" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-bold leading-none", children: racks.length }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-blue-200 mt-0.5", children: "Racks" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-white/15 rounded-xl px-3 py-2 border border-white/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlignJustify, { className: "h-4 w-4 text-emerald-200" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-bold leading-none", children: shelves.length }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-emerald-200 mt-0.5", children: "Shelves" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-white/15 rounded-xl px-3 py-2 border border-white/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { className: "h-4 w-4 text-amber-200" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-bold leading-none", children: bins.length }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-amber-200 mt-0.5", children: "Bins" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-white/15 rounded-xl px-3 py-2 border border-white/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-4 w-4 text-cyan-200" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-bold leading-none", children: locationPending.length }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-cyan-200 mt-0.5", children: "Pending" })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "layout", className: "w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-4", "data-ocid": "warehouse.tab", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "layout", "data-ocid": "warehouse.tab", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGrid, { className: "h-4 w-4 mr-1.5" }),
          " Layout"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "pending", "data-ocid": "warehouse.tab", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 mr-1.5" }),
          " Location Pending",
          locationPending.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 bg-amber-500 text-white text-xs rounded-full px-1.5 py-0.5", children: locationPending.length })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "layout", children: selectedWarehouse ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        WarehouseLayoutView,
        {
          warehouse: selectedWarehouse,
          racks: racks.filter(
            (r) => r.warehouseId === selectedWarehouse.id || !r.warehouseId
          ),
          shelves,
          bins,
          partItems,
          stockPartNames,
          isAdmin,
          onBack: () => setSelectedWarehouse(null),
          onAddRack: () => openAddRack(selectedWarehouse.id),
          onEditRack: openEditRack,
          onDeleteRack: (rack) => confirmDelete(
            "Delete Rack",
            `Are you sure you want to delete "${rack.name}"? All shelves and bins inside will also be removed.`,
            () => deleteRack(rack.id)
          ),
          onAddShelf: openAddShelf,
          onEditShelf: openEditShelf,
          onDeleteShelf: (shelf) => confirmDelete(
            "Delete Shelf",
            `Are you sure you want to delete "${shelf.name}"? All bins inside will also be removed.`,
            () => deleteShelf(shelf.id)
          ),
          onAddBin: openAddBin,
          onEditBin: openEditBin,
          onDeleteBin: (bin) => confirmDelete(
            "Delete Bin",
            `Are you sure you want to delete bin "${bin.name}"?`,
            () => deleteBin(bin.id)
          ),
          onPartClick: handlePartClick
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 bg-indigo-100 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-4 w-4 text-indigo-600" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-slate-900 text-base", children: "Warehouses" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium", children: (warehouses ?? []).length })
          ] }),
          isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              className: "bg-indigo-600 hover:bg-indigo-700 ml-1",
              onClick: openAddWarehouse,
              "data-ocid": "warehouse.open_modal_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-1" }),
                " Add Warehouse"
              ]
            }
          )
        ] }),
        (warehouses ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "text-center py-12 text-slate-400",
            "data-ocid": "warehouse.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-10 w-10 mx-auto mb-2 opacity-30" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No warehouses added yet." })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: (warehouses ?? []).map((wh, i) => {
          const whRacks = racks.filter(
            (r) => r.warehouseId === wh.id || !r.warehouseId
          );
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all group",
              "data-ocid": `warehouse.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    className: "cursor-pointer text-left w-full bg-gradient-to-br from-blue-600 to-indigo-700 p-5 text-white",
                    onClick: () => setSelectedWarehouse(wh),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 mb-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 bg-white/20 rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-6 w-6" }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-lg group-hover:text-blue-100 transition-colors truncate", children: wh.name }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-blue-200 text-sm mt-0.5 truncate", children: wh.address || "No address" })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 bg-white/15 rounded-lg px-2.5 py-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Server, { className: "h-3.5 w-3.5 text-blue-200" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-white", children: [
                            whRacks.length,
                            " Rack(s)"
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-200 text-xs ml-auto", children: "Click to explore →" })
                      ] })
                    ]
                  }
                ),
                isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 p-3 bg-slate-50", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      variant: "outline",
                      className: "flex-1",
                      onClick: () => openEditWarehouse(wh),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5 mr-1" }),
                        " Edit"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      variant: "outline",
                      className: "text-red-600 border-red-200 hover:bg-red-50",
                      onClick: () => confirmDelete(
                        "Delete Warehouse",
                        `Are you sure you want to delete "${wh.name}"? This action cannot be undone.`,
                        () => deleteWarehouse(wh.id)
                      ),
                      "data-ocid": "warehouse.delete_button",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
                    }
                  )
                ] })
              ]
            },
            wh.id
          );
        }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "pending", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl px-6 py-5 shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 bg-white/20 rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-6 w-6" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "Location Pending Parts" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-amber-100 text-sm mt-0.5", children: "Parts that have not been assigned a warehouse location yet." })
          ] }),
          locationPending.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-white/20 text-white font-bold text-lg px-3 py-1 rounded-xl", children: locationPending.length })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Search by part code or part name...",
              value: pendingSearch,
              onChange: (e) => setPendingSearch(e.target.value),
              className: "pl-9",
              "data-ocid": "warehouse.search_input"
            }
          )
        ] }),
        filteredPending.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "text-center py-12",
            "data-ocid": "warehouse.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-10 w-10 text-slate-300 mx-auto mb-2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400", children: pendingSearch ? "No parts match your search." : "All parts have locations assigned." })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-xl border border-slate-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-xs font-bold text-amber-800 uppercase tracking-wide", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-3 w-3" }),
              "Part Code"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-3 text-xs font-bold text-amber-800 uppercase tracking-wide", children: "Part Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-3 text-xs font-bold text-amber-800 uppercase tracking-wide", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-3 w-3" }),
              "Company"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-3 text-xs font-bold text-amber-800 uppercase tracking-wide", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-3 w-3" }),
              "Category"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-3 text-xs font-bold text-amber-800 uppercase tracking-wide", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-3 text-xs font-bold text-amber-800 uppercase tracking-wide", children: "Action" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "bg-white", children: filteredPending.map((p, i) => {
            var _a2, _b, _c;
            const partName = ((_a2 = stockPartNames.find((pn) => pn.id === p.partNameId)) == null ? void 0 : _a2.name) ?? "—";
            const company = ((_b = stockCompanies.find((c) => c.id === p.companyId)) == null ? void 0 : _b.name) ?? "—";
            const category = ((_c = stockCategories.find((c) => c.id === p.categoryId)) == null ? void 0 : _c.name) ?? "—";
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: `border-b border-slate-100 hover:bg-amber-50 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`,
                "data-ocid": `warehouse.row.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => handlePartClick(p.partCode),
                      className: "font-mono text-xs font-semibold text-blue-600 hover:underline hover:text-blue-800",
                      children: p.partCode
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 text-slate-700 font-medium", children: partName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 text-slate-600", children: company }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 text-slate-600", children: category }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `text-xs font-medium px-2 py-0.5 rounded-full ${p.status === "issued" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`,
                      children: p.status === "issued" ? "Issued" : "In Stock"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      variant: "outline",
                      className: "text-emerald-600 border-emerald-300 text-xs hover:bg-emerald-50",
                      onClick: () => {
                        setAssignPartId(p.id);
                        setAssignDialog(true);
                      },
                      "data-ocid": `warehouse.button.${i + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3 mr-1" }),
                        " Assign"
                      ]
                    }
                  ) })
                ]
              },
              p.id
            );
          }) })
        ] }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: whDialog, onOpenChange: setWhDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
        whEdit ? "Edit" : "Add",
        " Warehouse"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Warehouse Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: whName,
            onChange: (e) => setWhName(e.target.value),
            placeholder: "e.g. Main Warehouse",
            "data-ocid": "warehouse.input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Address" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: whAddress,
            onChange: (e) => setWhAddress(e.target.value),
            placeholder: "e.g. Plot 12, Industrial Area, Delhi",
            "data-ocid": "warehouse.input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            onClick: () => setWhDialog(false),
            "data-ocid": "warehouse.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "bg-blue-600 hover:bg-blue-700",
            onClick: saveWarehouse,
            "data-ocid": "warehouse.save_button",
            children: "Save"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: rackDialog, onOpenChange: setRackDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
        rackEdit ? "Edit" : "Add",
        " Rack"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Rack Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: rackName,
            onChange: (e) => setRackName(e.target.value),
            placeholder: "e.g. Rack C",
            "data-ocid": "warehouse.input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            onClick: () => setRackDialog(false),
            "data-ocid": "warehouse.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "bg-blue-600 hover:bg-blue-700",
            onClick: saveRack,
            "data-ocid": "warehouse.save_button",
            children: "Save"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: shelfDialog, onOpenChange: setShelfDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
        shelfEdit ? "Edit" : "Add",
        " Shelf"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Shelf Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: shelfName,
            onChange: (e) => setShelfName(e.target.value),
            placeholder: "e.g. Shelf C1",
            "data-ocid": "warehouse.input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Rack" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: shelfRackId, onValueChange: setShelfRackId, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "warehouse.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select rack" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: racks.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: r.id, children: r.name }, r.id)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            onClick: () => setShelfDialog(false),
            "data-ocid": "warehouse.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "bg-blue-600 hover:bg-blue-700",
            onClick: saveShelf,
            "data-ocid": "warehouse.save_button",
            children: "Save"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: binDialog, onOpenChange: setBinDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
        binEdit ? "Edit" : "Add",
        " Bin"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Bin Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: binName,
            onChange: (e) => setBinName(e.target.value),
            placeholder: "e.g. Bin C1-1",
            "data-ocid": "warehouse.input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Shelf" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: binShelfId, onValueChange: setBinShelfId, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "warehouse.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select shelf" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: shelves.map((s) => {
            const rack = racks.find((r) => r.id === s.rackId);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: s.id, children: [
              s.name,
              " (",
              (rack == null ? void 0 : rack.name) ?? "",
              ")"
            ] }, s.id);
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            onClick: () => setBinDialog(false),
            "data-ocid": "warehouse.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "bg-blue-600 hover:bg-blue-700",
            onClick: saveBin,
            "data-ocid": "warehouse.save_button",
            children: "Save"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DeleteConfirm,
      {
        open: deleteConfirm.open,
        title: deleteConfirm.title,
        message: deleteConfirm.message,
        onConfirm: () => {
          deleteConfirm.onConfirm();
          setDeleteConfirm((d) => ({ ...d, open: false }));
        },
        onCancel: () => setDeleteConfirm((d) => ({ ...d, open: false }))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AssignLocationDialog,
      {
        open: assignDialog,
        partId: assignPartId,
        partCode: ((_a = partItems.find((p) => p.id === assignPartId)) == null ? void 0 : _a.partCode) ?? "",
        allPartItems: partItems,
        racks,
        shelves,
        bins,
        onAssign: assignPartLocation,
        onClose: () => setAssignDialog(false)
      }
    )
  ] });
}
export {
  WarehousePage as default
};
