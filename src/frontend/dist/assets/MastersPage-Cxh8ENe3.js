import { u as useStore, r as reactExports, ak as Layers, a6 as Package, j as jsxRuntimeExports, i as Card, b as Tabs, d as TabsList, e as TabsTrigger, g as TabsContent, w as Button, y as Trash2, z as Label, H as Select, J as SelectTrigger, K as SelectValue, N as SelectContent, O as SelectItem, I as Input, G as ue } from "./index-De7Q6SQO.js";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-DQvCZOLE.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./dialog-CsjrwcpS.js";
import { T as Textarea } from "./textarea-CYtE04I-.js";
import { B as Building2 } from "./building-2-Doljm3TO.js";
import { T as Tag } from "./tag-WKOHLAdV.js";
import { P as Plus } from "./plus-B5kdLRRW.js";
import { E as Eye } from "./eye-E-8cL4pI.js";
import { P as Pencil } from "./pencil-B4TAhzLG.js";
function MastersPage() {
  const {
    stockCompanies,
    stockCategories,
    stockPartNames,
    partItems,
    purchaseEntries,
    currentUser,
    navigate,
    addStockCompany,
    updateStockCompany,
    deleteStockCompany,
    addStockCategory,
    updateStockCategory,
    deleteStockCategory,
    addStockPartName,
    updateStockPartName,
    deleteStockPartName
  } = useStore();
  const isAdmin = (currentUser == null ? void 0 : currentUser.role) === "admin";
  const [dialog, setDialog] = reactExports.useState(false);
  const [editId, setEditId] = reactExports.useState(null);
  const [editName, setEditName] = reactExports.useState("");
  const [editType, setEditType] = reactExports.useState(
    "company"
  );
  const [editCategoryCompanyId, setEditCategoryCompanyId] = reactExports.useState("");
  const [editPartNameCompanyId, setEditPartNameCompanyId] = reactExports.useState("");
  const [editPartNameCategoryId, setEditPartNameCategoryId] = reactExports.useState("");
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const [bulkOpen, setBulkOpen] = reactExports.useState(false);
  const [bulkType, setBulkType] = reactExports.useState(
    "company"
  );
  const [bulkText, setBulkText] = reactExports.useState("");
  const openAdd = (type) => {
    setEditId(null);
    setEditName("");
    setEditType(type);
    setEditCategoryCompanyId("");
    setEditPartNameCompanyId("");
    setEditPartNameCategoryId("");
    setDialog(true);
  };
  const openEdit = (id, name, type) => {
    setEditId(id);
    setEditName(name);
    setEditType(type);
    if (type === "category") {
      const cat = stockCategories.find((c) => c.id === id);
      setEditCategoryCompanyId((cat == null ? void 0 : cat.companyId) ?? "");
    }
    if (type === "partname") {
      const pn = stockPartNames.find((p) => p.id === id);
      setEditPartNameCompanyId((pn == null ? void 0 : pn.companyId) ?? "");
      setEditPartNameCategoryId((pn == null ? void 0 : pn.categoryId) ?? "");
    }
    setDialog(true);
  };
  const handleSave = () => {
    if (!editName.trim()) return;
    if (editType === "company") {
      if (editId) updateStockCompany(editId, editName);
      else addStockCompany(editName);
    } else if (editType === "category") {
      const company = stockCompanies.find(
        (c) => c.id === editCategoryCompanyId
      );
      if (editId)
        updateStockCategory(
          editId,
          editName,
          editCategoryCompanyId || void 0,
          company == null ? void 0 : company.name
        );
      else
        addStockCategory(
          editName,
          editCategoryCompanyId || void 0,
          company == null ? void 0 : company.name
        );
    } else {
      const company = stockCompanies.find(
        (c) => c.id === editPartNameCompanyId
      );
      const category = stockCategories.find(
        (c) => c.id === editPartNameCategoryId
      );
      if (editId)
        updateStockPartName(
          editId,
          editName,
          editPartNameCompanyId || void 0,
          company == null ? void 0 : company.name,
          editPartNameCategoryId || void 0,
          category == null ? void 0 : category.name
        );
      else
        addStockPartName(
          editName,
          editPartNameCompanyId || void 0,
          company == null ? void 0 : company.name,
          editPartNameCategoryId || void 0,
          category == null ? void 0 : category.name
        );
    }
    ue.success(editId ? "Updated successfully" : "Added successfully");
    setDialog(false);
  };
  const handleDelete = () => {
    if (!deleteTarget) return;
    if (deleteTarget.type === "company") deleteStockCompany(deleteTarget.id);
    else if (deleteTarget.type === "category")
      deleteStockCategory(deleteTarget.id);
    else deleteStockPartName(deleteTarget.id);
    setDeleteTarget(null);
  };
  const handleBulk = () => {
    const names = bulkText.split(",").map((n) => n.trim()).filter(Boolean);
    for (const n of names) {
      if (bulkType === "company") addStockCompany(n);
      else if (bulkType === "category") addStockCategory(n);
      else addStockPartName(n);
    }
    ue.success("Items added successfully");
    setBulkOpen(false);
    setBulkText("");
  };
  const stats = reactExports.useMemo(
    () => ({
      companies: stockCompanies.length,
      categories: stockCategories.length,
      partNames: stockPartNames.length,
      totalPurchases: purchaseEntries.length
    }),
    [stockCompanies, stockCategories, stockPartNames, purchaseEntries]
  );
  const getCompanyStats = (companyId) => {
    const parts = partItems.filter((p) => p.companyId === companyId);
    const cats = [...new Set(parts.map((p) => p.categoryId))];
    const pnames = [...new Set(parts.map((p) => p.partNameId))];
    const purch = purchaseEntries.filter((p) => p.companyId === companyId);
    return {
      parts: parts.length,
      categories: cats.length,
      partNames: pnames.length,
      purchases: purch.length
    };
  };
  const getCategoryStats = (catId) => {
    const parts = partItems.filter((p) => p.categoryId === catId);
    const pnames = [...new Set(parts.map((p) => p.partNameId))];
    const purch = purchaseEntries.filter((p) => p.categoryId === catId);
    return {
      parts: parts.length,
      partNames: pnames.length,
      purchases: purch.length
    };
  };
  const getPartNameStats = (pnId) => {
    const parts = partItems.filter((p) => p.partNameId === pnId);
    const purch = purchaseEntries.filter((p) => p.partNameId === pnId);
    return { parts: parts.length, purchases: purch.length };
  };
  const kpiCards = [
    {
      label: "Companies",
      value: stats.companies,
      color: "from-blue-500 to-blue-600",
      icon: Building2
    },
    {
      label: "Categories",
      value: stats.categories,
      color: "from-violet-500 to-violet-600",
      icon: Layers
    },
    {
      label: "Part Names",
      value: stats.partNames,
      color: "from-emerald-500 to-emerald-600",
      icon: Tag
    },
    {
      label: "Total Purchases",
      value: stats.totalPurchases,
      color: "from-amber-500 to-amber-600",
      icon: Package
    }
  ];
  const filteredCategoriesForPartName = editPartNameCompanyId ? stockCategories.filter(
    (c) => !c.companyId || c.companyId === editPartNameCompanyId
  ) : stockCategories;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-2xl px-6 py-6 shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 bg-white/20 rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-6 w-6" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Masters" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-teal-200 text-sm", children: "Manage product hierarchy" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-6 max-w-5xl mx-auto space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: kpiCards.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `bg-gradient-to-br ${k.color} rounded-2xl p-4 text-white shadow-sm`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 text-xs font-medium", children: k.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold mt-1", children: k.value })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(k.icon, { className: "h-5 w-5" }) })
          ] })
        },
        k.label
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-slate-100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-slate-800 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-4 w-4 text-blue-600" }),
          "Part Status by Company"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-slate-100", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 font-semibold text-slate-700 bg-slate-50", children: "Company" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-4 py-3 font-semibold text-emerald-700 bg-emerald-50/50", children: "In Stock" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-4 py-3 font-semibold text-amber-700 bg-amber-50/50", children: "Issued" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-4 py-3 font-semibold text-blue-700 bg-blue-50/50", children: "Installed" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-4 py-3 font-semibold text-red-700 bg-red-50/50", children: "Returned" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-4 py-3 font-semibold text-slate-700 bg-slate-50", children: "Total" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
            stockCompanies.map((c) => {
              const cParts = partItems.filter((p) => p.companyId === c.id);
              const inStock = cParts.filter(
                (p) => p.status === "in_stock"
              ).length;
              const issued = cParts.filter(
                (p) => p.status === "issued"
              ).length;
              const installed = cParts.filter(
                (p) => p.status === "installed"
              ).length;
              const returned = cParts.filter(
                (p) => p.status === "returned_to_company"
              ).length;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: "border-b border-slate-50 hover:bg-slate-50 transition-colors",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 font-semibold text-slate-800", children: c.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-emerald-700", children: inStock }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-amber-700", children: issued }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-blue-700", children: installed }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-red-700", children: returned }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-slate-800", children: cParts.length }) })
                  ]
                },
                c.id
              );
            }),
            stockCompanies.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "td",
              {
                colSpan: 6,
                className: "px-5 py-8 text-center text-slate-400 text-sm",
                children: "No companies yet"
              }
            ) })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-sm border-slate-200 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "companies", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-slate-200 bg-slate-50 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "bg-transparent h-12 gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsTrigger,
            {
              value: "companies",
              className: "data-[state=active]:bg-white data-[state=active]:shadow-sm",
              "data-ocid": "masters.tab",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-4 w-4 mr-1.5" }),
                " Companies (",
                stats.companies,
                ")"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsTrigger,
            {
              value: "categories",
              className: "data-[state=active]:bg-white data-[state=active]:shadow-sm",
              "data-ocid": "masters.tab",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-4 w-4 mr-1.5" }),
                " Categories (",
                stats.categories,
                ")"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsTrigger,
            {
              value: "partnames",
              className: "data-[state=active]:bg-white data-[state=active]:shadow-sm",
              "data-ocid": "masters.tab",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-4 w-4 mr-1.5" }),
                " Part Names (",
                stats.partNames,
                ")"
              ]
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "companies", className: "p-4", children: [
          isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                onClick: () => {
                  setBulkType("company");
                  setBulkOpen(true);
                },
                children: "Bulk Import"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                className: "bg-teal-600 hover:bg-teal-700",
                onClick: () => openAdd("company"),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-1" }),
                  " Add Company"
                ]
              }
            )
          ] }),
          stockCompanies.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-center py-12 text-slate-400",
              "data-ocid": "masters.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-10 w-10 mx-auto mb-2 opacity-30" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No companies added yet." })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: stockCompanies.map((c, idx) => {
            const s = getCompanyStats(c.id);
            const isUnused = s.parts === 0 && s.purchases === 0;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-4 bg-slate-50 hover:bg-white border border-slate-200 rounded-xl px-4 py-3 transition-all shadow-sm",
                "data-ocid": `masters.item.${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-4 w-4 text-white" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-slate-800", children: c.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap items-center gap-1.5 mt-1", children: isUnused ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs bg-slate-100 text-slate-400 px-2 py-0.5 rounded-full", children: "Unused" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full", children: [
                        s.categories,
                        " categories"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full", children: [
                        s.parts,
                        " parts"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full", children: [
                        s.purchases,
                        " purchases"
                      ] })
                    ] }) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "sm",
                        variant: "ghost",
                        className: "text-blue-600 hover:bg-blue-50",
                        onClick: () => navigate("inventory"),
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" })
                      }
                    ),
                    isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          size: "sm",
                          variant: "ghost",
                          className: "text-amber-600 hover:bg-amber-50",
                          onClick: () => openEdit(c.id, c.name, "company"),
                          "data-ocid": `masters.edit_button.${idx + 1}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          size: "sm",
                          variant: "ghost",
                          className: "text-red-500 hover:bg-red-50",
                          onClick: () => setDeleteTarget({
                            id: c.id,
                            name: c.name,
                            type: "company"
                          }),
                          "data-ocid": `masters.delete_button.${idx + 1}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
                        }
                      )
                    ] })
                  ] })
                ]
              },
              c.id
            );
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "categories", className: "p-4", children: [
          isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                onClick: () => {
                  setBulkType("category");
                  setBulkOpen(true);
                },
                children: "Bulk Import"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                className: "bg-violet-600 hover:bg-violet-700",
                onClick: () => openAdd("category"),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-1" }),
                  " Add Category"
                ]
              }
            )
          ] }),
          stockCategories.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-center py-12 text-slate-400",
              "data-ocid": "masters.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-10 w-10 mx-auto mb-2 opacity-30" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No categories added yet." })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-slate-200", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 font-semibold text-slate-600 bg-slate-50", children: "Category" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 font-semibold text-slate-600 bg-slate-50", children: "Company" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 font-semibold text-slate-600 bg-slate-50", children: "Stats" }),
              isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-2.5 font-semibold text-slate-600 bg-slate-50", children: "Actions" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: stockCategories.map((cat, idx) => {
              var _a;
              const s = getCategoryStats(cat.id);
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: "border-b border-slate-100 hover:bg-slate-50 transition-colors",
                  "data-ocid": `masters.item.${idx + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-3.5 w-3.5 text-white" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-slate-800", children: cat.name })
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: cat.companyId ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium", children: ((_a = stockCompanies.find(
                      (c) => c.id === cat.companyId
                    )) == null ? void 0 : _a.name) ?? cat.companyName ?? "—" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs bg-slate-100 text-slate-400 px-2 py-0.5 rounded-full", children: "Unassigned" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full", children: [
                        s.partNames,
                        " part names"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full", children: [
                        s.parts,
                        " parts"
                      ] })
                    ] }) }),
                    isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          size: "sm",
                          variant: "ghost",
                          className: "text-blue-600 hover:bg-blue-50",
                          onClick: () => navigate("inventory"),
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          size: "sm",
                          variant: "ghost",
                          className: "text-amber-600 hover:bg-amber-50",
                          onClick: () => openEdit(cat.id, cat.name, "category"),
                          "data-ocid": `masters.edit_button.${idx + 1}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          size: "sm",
                          variant: "ghost",
                          className: "text-red-500 hover:bg-red-50",
                          onClick: () => setDeleteTarget({
                            id: cat.id,
                            name: cat.name,
                            type: "category"
                          }),
                          "data-ocid": `masters.delete_button.${idx + 1}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
                        }
                      )
                    ] }) })
                  ]
                },
                cat.id
              );
            }) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "partnames", className: "p-4", children: [
          isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                onClick: () => {
                  setBulkType("partname");
                  setBulkOpen(true);
                },
                children: "Bulk Import"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                className: "bg-emerald-600 hover:bg-emerald-700",
                onClick: () => openAdd("partname"),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-1" }),
                  " Add Part Name"
                ]
              }
            )
          ] }),
          stockPartNames.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-center py-12 text-slate-400",
              "data-ocid": "masters.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-10 w-10 mx-auto mb-2 opacity-30" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No part names added yet." })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-slate-200", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 font-semibold text-slate-600 bg-slate-50", children: "Part Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 font-semibold text-slate-600 bg-slate-50", children: "Company" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 font-semibold text-slate-600 bg-slate-50", children: "Category" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 font-semibold text-slate-600 bg-slate-50", children: "Stats" }),
              isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-2.5 font-semibold text-slate-600 bg-slate-50", children: "Actions" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: stockPartNames.map((pn, idx) => {
              var _a, _b;
              const s = getPartNameStats(pn.id);
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: "border-b border-slate-100 hover:bg-slate-50 transition-colors",
                  "data-ocid": `masters.item.${idx + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-3.5 w-3.5 text-white" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-slate-800", children: pn.name })
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: pn.companyId ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium", children: ((_a = stockCompanies.find(
                      (c) => c.id === pn.companyId
                    )) == null ? void 0 : _a.name) ?? pn.companyName ?? "—" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs bg-slate-100 text-slate-400 px-2 py-0.5 rounded-full", children: "Unassigned" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: pn.categoryId ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-medium", children: ((_b = stockCategories.find(
                      (c) => c.id === pn.categoryId
                    )) == null ? void 0 : _b.name) ?? pn.categoryName ?? "—" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs bg-slate-100 text-slate-400 px-2 py-0.5 rounded-full", children: "Unassigned" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full", children: [
                        s.parts,
                        " parts"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full", children: [
                        s.purchases,
                        " purchases"
                      ] })
                    ] }) }),
                    isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          size: "sm",
                          variant: "ghost",
                          className: "text-amber-600 hover:bg-amber-50",
                          onClick: () => openEdit(pn.id, pn.name, "partname"),
                          "data-ocid": `masters.edit_button.${idx + 1}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          size: "sm",
                          variant: "ghost",
                          className: "text-red-500 hover:bg-red-50",
                          onClick: () => setDeleteTarget({
                            id: pn.id,
                            name: pn.name,
                            type: "partname"
                          }),
                          "data-ocid": `masters.delete_button.${idx + 1}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
                        }
                      )
                    ] }) })
                  ]
                },
                pn.id
              );
            }) })
          ] }) })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialog, onOpenChange: setDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
        editId ? "Edit" : "Add",
        " ",
        editType === "company" ? "Company" : editType === "category" ? "Category" : "Part Name"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-2 space-y-4", children: [
        editType === "category" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
            "Company",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400 text-xs", children: "(required)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: editCategoryCompanyId,
              onValueChange: setEditCategoryCompanyId,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select company" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: stockCompanies.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.id, children: c.name }, c.id)) })
              ]
            }
          )
        ] }),
        editType === "partname" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
              "Company",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400 text-xs", children: "(required)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: editPartNameCompanyId,
                onValueChange: (v) => {
                  setEditPartNameCompanyId(v);
                  setEditPartNameCategoryId("");
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select company" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: stockCompanies.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.id, children: c.name }, c.id)) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
              "Category",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400 text-xs", children: "(required)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: editPartNameCategoryId,
                onValueChange: setEditPartNameCategoryId,
                disabled: !editPartNameCompanyId,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectValue,
                    {
                      placeholder: editPartNameCompanyId ? "Select category" : "Select company first"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: filteredCategoriesForPartName.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.id, children: c.name }, c.id)) })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: editName,
              onChange: (e) => setEditName(e.target.value),
              placeholder: "Enter name",
              className: "mt-1",
              onKeyDown: (e) => e.key === "Enter" && handleSave(),
              "data-ocid": "masters.input"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            onClick: () => setDialog(false),
            "data-ocid": "masters.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleSave,
            disabled: !editName.trim(),
            "data-ocid": "masters.save_button",
            children: editId ? "Update" : "Add"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: bulkOpen, onOpenChange: setBulkOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
        "Bulk Import",
        " ",
        bulkType === "company" ? "Companies" : bulkType === "category" ? "Categories" : "Part Names"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Comma-separated names" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            value: bulkText,
            onChange: (e) => setBulkText(e.target.value),
            placeholder: "Name A, Name B, Name C",
            rows: 4,
            className: "mt-1"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setBulkOpen(false), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleBulk, children: "Import" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: !!deleteTarget,
        onOpenChange: () => setDeleteTarget(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogTitle, { children: [
              'Delete "',
              deleteTarget == null ? void 0 : deleteTarget.name,
              '"?'
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "This will permanently remove this entry. Parts using this cannot be removed." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                className: "bg-red-600 hover:bg-red-700",
                onClick: handleDelete,
                children: "Delete"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  MastersPage as default
};
