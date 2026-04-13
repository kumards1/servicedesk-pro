import { u as useStore, r as reactExports, j as jsxRuntimeExports, T as TriangleAlert, ah as PackagePlus, ac as Badge, w as Button, ag as ArrowRight, X, z as Label, H as Select, J as SelectTrigger, K as SelectValue, N as SelectContent, O as SelectItem, y as Trash2, a6 as Package, I as Input, a9 as FileText } from "./index-De7Q6SQO.js";
import { C as CircleCheck } from "./circle-check-DuUcrnv7.js";
import { P as Plus } from "./plus-B5kdLRRW.js";
import { T as Tag } from "./tag-WKOHLAdV.js";
import { M as Minus, S as Save } from "./save-COw0Edse.js";
import { D as DollarSign } from "./dollar-sign-NuhIYfqB.js";
import { M as MapPin } from "./map-pin-BwsmX031.js";
function newPartCodeRow() {
  return {
    id: Math.random().toString(36).slice(2),
    partCode: "",
    quantity: 1,
    price: "",
    notes: "",
    rackId: "",
    shelfId: "",
    binId: ""
  };
}
function newPartNameSection() {
  return {
    id: Math.random().toString(36).slice(2),
    partNameId: "",
    rows: [newPartCodeRow()]
  };
}
function ExistingStockPage() {
  const {
    currentUser,
    stockPartNames,
    stockCompanies,
    stockCategories,
    racks,
    shelves,
    bins,
    addExistingStock,
    navigate
  } = useStore();
  const [sections, setSections] = reactExports.useState([
    newPartNameSection()
  ]);
  const [errors, setErrors] = reactExports.useState({});
  const [saved, setSaved] = reactExports.useState(false);
  const [savedCount, setSavedCount] = reactExports.useState(0);
  if ((currentUser == null ? void 0 : currentUser.role) !== "admin") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-10 w-10 text-amber-500 mx-auto mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-semibold", children: "Admin access required" })
    ] }) });
  }
  const addSection = () => setSections((prev) => [...prev, newPartNameSection()]);
  const removeSection = (sectionId) => {
    if (sections.length > 1)
      setSections((prev) => prev.filter((s) => s.id !== sectionId));
  };
  const updateSectionPartName = (sectionId, partNameId) => {
    setSections(
      (prev) => prev.map((s) => s.id === sectionId ? { ...s, partNameId } : s)
    );
    setErrors((prev) => {
      const { [`${sectionId}-partNameId`]: _, ...rest } = prev;
      return rest;
    });
  };
  const addRow = (sectionId) => {
    setSections(
      (prev) => prev.map(
        (s) => s.id === sectionId ? { ...s, rows: [...s.rows, newPartCodeRow()] } : s
      )
    );
  };
  const removeRow = (sectionId, rowId) => {
    setSections(
      (prev) => prev.map((s) => {
        if (s.id !== sectionId || s.rows.length <= 1) return s;
        return { ...s, rows: s.rows.filter((r) => r.id !== rowId) };
      })
    );
  };
  const updateRow = (sectionId, rowId, field, value) => {
    setSections(
      (prev) => prev.map((s) => {
        if (s.id !== sectionId) return s;
        return {
          ...s,
          rows: s.rows.map((r) => {
            if (r.id !== rowId) return r;
            const updated = { ...r, [field]: value };
            if (field === "rackId") {
              updated.shelfId = "";
              updated.binId = "";
            }
            if (field === "shelfId") updated.binId = "";
            return updated;
          })
        };
      })
    );
    setErrors((prev) => {
      const key = `${sectionId}-${rowId}-${field}`;
      const { [key]: _, ...rest } = prev;
      return rest;
    });
  };
  const validate = () => {
    const errs = {};
    for (const section of sections) {
      if (!section.partNameId)
        errs[`${section.id}-partNameId`] = "Select a part name";
      for (const r of section.rows) {
        if (!r.partCode.trim())
          errs[`${section.id}-${r.id}-partCode`] = "Required";
        if (r.quantity < 1) errs[`${section.id}-${r.id}-quantity`] = "Min 1";
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };
  const handleSave = () => {
    if (!validate()) return;
    const allEntries = sections.flatMap((section) => {
      const pn = stockPartNames.find((p) => p.id === section.partNameId);
      if (!pn) return [];
      return section.rows.map((r) => ({
        partCode: r.partCode.trim(),
        companyId: pn.companyId ?? "",
        categoryId: pn.categoryId ?? "",
        partNameId: section.partNameId,
        quantity: r.quantity,
        costPrice: r.price ? Number(r.price) : void 0,
        rackId: r.rackId || void 0,
        shelfId: r.shelfId || void 0,
        binId: r.binId || void 0,
        notes: r.notes || void 0
      }));
    });
    addExistingStock(allEntries);
    setSavedCount(
      sections.reduce(
        (s, sec) => s + sec.rows.reduce((rs, r) => rs + r.quantity, 0),
        0
      )
    );
    setSaved(true);
  };
  const handleAddMore = () => {
    setSections([newPartNameSection()]);
    setErrors({});
    setSaved(false);
    setSavedCount(0);
  };
  if (saved) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 max-w-2xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-2xl p-6 mb-6 shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white/20 rounded-xl p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PackagePlus, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold", children: "Existing Stock Entry" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-teal-100 text-sm", children: "Add parts already in your store before this system was set up" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-10 text-center shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-9 w-9 text-emerald-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-foreground mb-2", children: "Stock Added Successfully!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-emerald-100 text-emerald-700 text-base px-4 py-1", children: [
          savedCount,
          " unit",
          savedCount !== 1 ? "s" : "",
          " added"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: handleAddMore,
              className: "bg-teal-600 hover:bg-teal-700 text-white gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
                " Add More Stock"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              onClick: () => navigate("inventory"),
              className: "gap-2",
              children: [
                "Go to Inventory ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
              ]
            }
          )
        ] })
      ] })
    ] });
  }
  const totalUnits = sections.reduce(
    (s, sec) => s + sec.rows.reduce((rs, r) => rs + r.quantity, 0),
    0
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-2xl p-6 shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white/20 rounded-xl p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PackagePlus, { className: "h-6 w-6" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold", children: "Existing Stock Entry" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-teal-100 text-sm", children: "Add parts that were already in your store before this system was set up — multiple part names at once" })
      ] })
    ] }) }),
    sections.map((section, sectionIdx) => {
      const pn = stockPartNames.find((p) => p.id === section.partNameId);
      const company = (pn == null ? void 0 : pn.companyId) ? stockCompanies.find((c) => c.id === pn.companyId) : null;
      const category = (pn == null ? void 0 : pn.categoryId) ? stockCategories.find((c) => c.id === pn.categoryId) : null;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-2xl shadow-sm overflow-hidden",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-3 bg-gradient-to-r from-teal-50 to-emerald-50 border-b border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-teal-600 text-white rounded-lg w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0", children: sectionIdx + 1 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground text-sm", children: pn ? pn.name : `Part Name #${sectionIdx + 1}` }),
                pn && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 flex-wrap", children: [
                  company && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full", children: company.name }),
                  category && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs bg-violet-100 text-violet-700 px-1.5 py-0.5 rounded-full", children: category.name })
                ] })
              ] }),
              sections.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "text-rose-500 hover:text-rose-600 hover:bg-rose-50 h-7 w-7 p-0",
                  onClick: () => removeSection(section.id),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs font-semibold text-foreground flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-3.5 w-3.5 text-teal-600" }),
                  " Part Name",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-rose-500", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: section.partNameId,
                    onValueChange: (v) => updateSectionPartName(section.id, v),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          className: `mt-1 ${errors[`${section.id}-partNameId`] ? "border-rose-500" : ""}`,
                          "data-ocid": "existing-stock.select",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select a part name..." })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: stockPartNames.map((spn) => {
                        var _a, _b;
                        const co = spn.companyId ? (_a = stockCompanies.find((c) => c.id === spn.companyId)) == null ? void 0 : _a.name : null;
                        const ca = spn.categoryId ? (_b = stockCategories.find((c) => c.id === spn.categoryId)) == null ? void 0 : _b.name : null;
                        return /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: spn.id, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: spn.name }),
                          (co || ca) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: [co, ca].filter(Boolean).join(" › ") })
                        ] }) }, spn.id);
                      }) })
                    ]
                  }
                ),
                errors[`${section.id}-partNameId`] && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-rose-500 mt-1", children: errors[`${section.id}-partNameId`] })
              ] }),
              section.partNameId && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Part Codes" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-teal-100 text-teal-700 border-teal-200 text-xs", children: [
                    section.rows.length,
                    " code",
                    section.rows.length !== 1 ? "s" : ""
                  ] })
                ] }),
                section.rows.map((row, rowIdx) => {
                  const filteredShelves = shelves.filter(
                    (s) => s.rackId === row.rackId
                  );
                  const filteredBins = bins.filter(
                    (b) => b.shelfId === row.shelfId
                  );
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "border border-border rounded-xl overflow-hidden",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-2.5 bg-muted/30 border-b border-border", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-muted-foreground", children: [
                            "Part Code #",
                            rowIdx + 1
                          ] }),
                          section.rows.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Button,
                            {
                              variant: "ghost",
                              size: "sm",
                              className: "text-rose-500 hover:text-rose-600 hover:bg-rose-50 h-7 w-7 p-0",
                              onClick: () => removeRow(section.id, row.id),
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs font-semibold text-foreground flex items-center gap-1", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-3.5 w-3.5 text-teal-600" }),
                              " ",
                              "Part Code ",
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-rose-500", children: "*" })
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Input,
                              {
                                placeholder: "e.g. A-01928",
                                value: row.partCode,
                                onChange: (e) => updateRow(
                                  section.id,
                                  row.id,
                                  "partCode",
                                  e.target.value
                                ),
                                className: errors[`${section.id}-${row.id}-partCode`] ? "border-rose-500" : "",
                                "data-ocid": "existing-stock.input"
                              }
                            ),
                            errors[`${section.id}-${row.id}-partCode`] && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-rose-500", children: errors[`${section.id}-${row.id}-partCode`] })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs font-semibold text-foreground flex items-center gap-1", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-3.5 w-3.5 text-teal-600" }),
                              " ",
                              "Quantity ",
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-rose-500", children: "*" })
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                Button,
                                {
                                  type: "button",
                                  variant: "outline",
                                  size: "icon",
                                  className: "h-9 w-9 shrink-0",
                                  onClick: () => updateRow(
                                    section.id,
                                    row.id,
                                    "quantity",
                                    Math.max(1, row.quantity - 1)
                                  ),
                                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-3.5 w-3.5" })
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                Input,
                                {
                                  type: "number",
                                  min: 1,
                                  value: row.quantity,
                                  onChange: (e) => updateRow(
                                    section.id,
                                    row.id,
                                    "quantity",
                                    Math.max(
                                      1,
                                      Number.parseInt(e.target.value) || 1
                                    )
                                  ),
                                  className: "text-center"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                Button,
                                {
                                  type: "button",
                                  variant: "outline",
                                  size: "icon",
                                  className: "h-9 w-9 shrink-0",
                                  onClick: () => updateRow(
                                    section.id,
                                    row.id,
                                    "quantity",
                                    row.quantity + 1
                                  ),
                                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" })
                                }
                              )
                            ] })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-3 grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs font-semibold text-foreground flex items-center gap-1", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-3.5 w-3.5 text-emerald-600" }),
                              " ",
                              "Unit Price ₹",
                              " ",
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: "(optional)" })
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Input,
                              {
                                type: "number",
                                placeholder: "0.00",
                                value: row.price,
                                onChange: (e) => updateRow(
                                  section.id,
                                  row.id,
                                  "price",
                                  e.target.value
                                ),
                                className: "text-sm"
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs font-semibold text-foreground flex items-center gap-1", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-3.5 w-3.5 text-blue-500" }),
                              " ",
                              "Notes",
                              " ",
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: "(optional)" })
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Input,
                              {
                                placeholder: "Any notes for this part code...",
                                value: row.notes,
                                onChange: (e) => updateRow(
                                  section.id,
                                  row.id,
                                  "notes",
                                  e.target.value
                                ),
                                className: "text-sm"
                              }
                            )
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-dashed border-teal-300 rounded-xl p-3 bg-teal-50/50", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2.5", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5 text-teal-600" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-teal-700", children: "Location (optional)" })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-3", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Rack" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                Select,
                                {
                                  value: row.rackId,
                                  onValueChange: (v) => updateRow(section.id, row.id, "rackId", v),
                                  children: [
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-8 text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select rack" }) }),
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: racks.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: r.id, children: r.name }, r.id)) })
                                  ]
                                }
                              )
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Shelf" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                Select,
                                {
                                  value: row.shelfId,
                                  onValueChange: (v) => updateRow(section.id, row.id, "shelfId", v),
                                  disabled: !row.rackId,
                                  children: [
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-8 text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      SelectValue,
                                      {
                                        placeholder: row.rackId ? "Select shelf" : "Select rack first"
                                      }
                                    ) }),
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: filteredShelves.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s.id, children: s.name }, s.id)) })
                                  ]
                                }
                              )
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Bin" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                Select,
                                {
                                  value: row.binId,
                                  onValueChange: (v) => updateRow(section.id, row.id, "binId", v),
                                  disabled: !row.shelfId,
                                  children: [
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-8 text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      SelectValue,
                                      {
                                        placeholder: row.shelfId ? "Select bin" : "Select shelf first"
                                      }
                                    ) }),
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: filteredBins.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: b.id, children: b.name }, b.id)) })
                                  ]
                                }
                              )
                            ] })
                          ] })
                        ] }) })
                      ]
                    },
                    row.id
                  );
                }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    onClick: () => addRow(section.id),
                    className: "gap-2 border-teal-300 text-teal-700 hover:bg-teal-50 text-xs h-8",
                    "data-ocid": "existing-stock.primary_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
                      " Add Another Part Code"
                    ]
                  }
                )
              ] })
            ] })
          ]
        },
        section.id
      );
    }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "outline",
        onClick: addSection,
        className: "w-full gap-2 border-dashed border-teal-400 text-teal-700 hover:bg-teal-50 h-12",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          " Add Another Part Name"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-4 bg-card border border-border rounded-2xl p-4 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
        sections.length,
        " part name",
        sections.length !== 1 ? "s" : "",
        " ·",
        " ",
        sections.reduce((s, sec) => s + sec.rows.length, 0),
        " code",
        sections.reduce((s, sec) => s + sec.rows.length, 0) !== 1 ? "s" : "",
        " ",
        "→ ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: totalUnits }),
        " total units"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: handleSave,
          disabled: sections.every((s) => !s.partNameId),
          className: "gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white px-8",
          "data-ocid": "existing-stock.submit_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
            " Save All Stock Entries"
          ]
        }
      )
    ] })
  ] });
}
export {
  ExistingStockPage as default
};
