import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  DollarSign,
  FileText,
  MapPin,
  Minus,
  Package,
  PackagePlus,
  Plus,
  Save,
  Tag,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { useStore } from "../store";

interface PartCodeRow {
  id: string;
  partCode: string;
  quantity: number;
  price: string;
  notes: string;
  rackId: string;
  shelfId: string;
  binId: string;
}

interface PartNameSection {
  id: string;
  partNameId: string;
  rows: PartCodeRow[];
}

function newPartCodeRow(): PartCodeRow {
  return {
    id: Math.random().toString(36).slice(2),
    partCode: "",
    quantity: 1,
    price: "",
    notes: "",
    rackId: "",
    shelfId: "",
    binId: "",
  };
}

function newPartNameSection(): PartNameSection {
  return {
    id: Math.random().toString(36).slice(2),
    partNameId: "",
    rows: [newPartCodeRow()],
  };
}

export default function ExistingStockPage() {
  const {
    currentUser,
    stockPartNames,
    stockCompanies,
    stockCategories,
    racks,
    shelves,
    bins,
    addExistingStock,
    navigate,
  } = useStore();

  const [sections, setSections] = useState<PartNameSection[]>([
    newPartNameSection(),
  ]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);
  const [savedCount, setSavedCount] = useState(0);

  if (currentUser?.role !== "admin") {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertTriangle className="h-10 w-10 text-amber-500 mx-auto mb-3" />
          <p className="text-foreground font-semibold">Admin access required</p>
        </div>
      </div>
    );
  }

  // ── Section helpers ───────────────────────────────────────────────────────
  const addSection = () =>
    setSections((prev) => [...prev, newPartNameSection()]);

  const removeSection = (sectionId: string) => {
    if (sections.length > 1)
      setSections((prev) => prev.filter((s) => s.id !== sectionId));
  };

  const updateSectionPartName = (sectionId: string, partNameId: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === sectionId ? { ...s, partNameId } : s)),
    );
    setErrors((prev) => {
      const { [`${sectionId}-partNameId`]: _, ...rest } = prev;
      return rest;
    });
  };

  // ── Row helpers ───────────────────────────────────────────────────────────
  const addRow = (sectionId: string) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId ? { ...s, rows: [...s.rows, newPartCodeRow()] } : s,
      ),
    );
  };

  const removeRow = (sectionId: string, rowId: string) => {
    setSections((prev) =>
      prev.map((s) => {
        if (s.id !== sectionId || s.rows.length <= 1) return s;
        return { ...s, rows: s.rows.filter((r) => r.id !== rowId) };
      }),
    );
  };

  const updateRow = (
    sectionId: string,
    rowId: string,
    field: keyof PartCodeRow,
    value: string | number,
  ) => {
    setSections((prev) =>
      prev.map((s) => {
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
          }),
        };
      }),
    );
    setErrors((prev) => {
      const key = `${sectionId}-${rowId}-${field}`;
      const { [key]: _, ...rest } = prev;
      return rest;
    });
  };

  // ── Validate ──────────────────────────────────────────────────────────────
  const validate = () => {
    const errs: Record<string, string> = {};
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

  // ── Submit ────────────────────────────────────────────────────────────────
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
        costPrice: r.price ? Number(r.price) : undefined,
        rackId: r.rackId || undefined,
        shelfId: r.shelfId || undefined,
        binId: r.binId || undefined,
        notes: r.notes || undefined,
      }));
    });

    addExistingStock(allEntries);
    setSavedCount(
      sections.reduce(
        (s, sec) => s + sec.rows.reduce((rs, r) => rs + r.quantity, 0),
        0,
      ),
    );
    setSaved(true);
  };

  const handleAddMore = () => {
    setSections([newPartNameSection()]);
    setErrors({});
    setSaved(false);
    setSavedCount(0);
  };

  // ── Success screen ────────────────────────────────────────────────────────
  if (saved) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-2xl p-6 mb-6 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 rounded-xl p-2">
              <PackagePlus className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Existing Stock Entry</h1>
              <p className="text-teal-100 text-sm">
                Add parts already in your store before this system was set up
              </p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-10 text-center shadow-sm">
          <div className="flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mx-auto mb-4">
            <CheckCircle2 className="h-9 w-9 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Stock Added Successfully!
          </h2>
          <p className="text-muted-foreground mb-6">
            <Badge className="bg-emerald-100 text-emerald-700 text-base px-4 py-1">
              {savedCount} unit{savedCount !== 1 ? "s" : ""} added
            </Badge>
          </p>
          <div className="flex gap-3 justify-center">
            <Button
              onClick={handleAddMore}
              className="bg-teal-600 hover:bg-teal-700 text-white gap-2"
            >
              <Plus className="h-4 w-4" /> Add More Stock
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("inventory")}
              className="gap-2"
            >
              Go to Inventory <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const totalUnits = sections.reduce(
    (s, sec) => s + sec.rows.reduce((rs, r) => rs + r.quantity, 0),
    0,
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 rounded-xl p-2">
            <PackagePlus className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Existing Stock Entry</h1>
            <p className="text-teal-100 text-sm">
              Add parts that were already in your store before this system was
              set up — multiple part names at once
            </p>
          </div>
        </div>
      </div>

      {/* Part name sections */}
      {sections.map((section, sectionIdx) => {
        const pn = stockPartNames.find((p) => p.id === section.partNameId);
        const company = pn?.companyId
          ? stockCompanies.find((c) => c.id === pn.companyId)
          : null;
        const category = pn?.categoryId
          ? stockCategories.find((c) => c.id === pn.categoryId)
          : null;

        return (
          <div
            key={section.id}
            className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden"
          >
            {/* Section header */}
            <div className="flex items-center justify-between px-5 py-3 bg-gradient-to-r from-teal-50 to-emerald-50 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="bg-teal-600 text-white rounded-lg w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">
                  {sectionIdx + 1}
                </div>
                <span className="font-semibold text-foreground text-sm">
                  {pn ? pn.name : `Part Name #${sectionIdx + 1}`}
                </span>
                {pn && (
                  <div className="flex items-center gap-1 flex-wrap">
                    {company && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">
                        {company.name}
                      </span>
                    )}
                    {category && (
                      <span className="text-xs bg-violet-100 text-violet-700 px-1.5 py-0.5 rounded-full">
                        {category.name}
                      </span>
                    )}
                  </div>
                )}
              </div>
              {sections.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 h-7 w-7 p-0"
                  onClick={() => removeSection(section.id)}
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              )}
            </div>

            <div className="p-5 space-y-4">
              {/* Select part name */}
              <div className="max-w-md">
                <Label className="text-xs font-semibold text-foreground flex items-center gap-1">
                  <Tag className="h-3.5 w-3.5 text-teal-600" /> Part Name{" "}
                  <span className="text-rose-500">*</span>
                </Label>
                <Select
                  value={section.partNameId}
                  onValueChange={(v) => updateSectionPartName(section.id, v)}
                >
                  <SelectTrigger
                    className={`mt-1 ${errors[`${section.id}-partNameId`] ? "border-rose-500" : ""}`}
                    data-ocid="existing-stock.select"
                  >
                    <SelectValue placeholder="Select a part name..." />
                  </SelectTrigger>
                  <SelectContent>
                    {stockPartNames.map((spn) => {
                      const co = spn.companyId
                        ? stockCompanies.find((c) => c.id === spn.companyId)
                            ?.name
                        : null;
                      const ca = spn.categoryId
                        ? stockCategories.find((c) => c.id === spn.categoryId)
                            ?.name
                        : null;
                      return (
                        <SelectItem key={spn.id} value={spn.id}>
                          <div className="flex flex-col">
                            <span className="font-medium">{spn.name}</span>
                            {(co || ca) && (
                              <span className="text-xs text-muted-foreground">
                                {[co, ca].filter(Boolean).join(" › ")}
                              </span>
                            )}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                {errors[`${section.id}-partNameId`] && (
                  <p className="text-xs text-rose-500 mt-1">
                    {errors[`${section.id}-partNameId`]}
                  </p>
                )}
              </div>

              {/* Part code rows */}
              {section.partNameId && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Part Codes
                    </span>
                    <Badge className="bg-teal-100 text-teal-700 border-teal-200 text-xs">
                      {section.rows.length} code
                      {section.rows.length !== 1 ? "s" : ""}
                    </Badge>
                  </div>

                  {section.rows.map((row, rowIdx) => {
                    const filteredShelves = shelves.filter(
                      (s) => s.rackId === row.rackId,
                    );
                    const filteredBins = bins.filter(
                      (b) => b.shelfId === row.shelfId,
                    );
                    return (
                      <div
                        key={row.id}
                        className="border border-border rounded-xl overflow-hidden"
                      >
                        <div className="flex items-center justify-between px-4 py-2.5 bg-muted/30 border-b border-border">
                          <span className="text-xs font-semibold text-muted-foreground">
                            Part Code #{rowIdx + 1}
                          </span>
                          {section.rows.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 h-7 w-7 p-0"
                              onClick={() => removeRow(section.id, row.id)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          )}
                        </div>

                        {/* Row 1: Part Code + Quantity */}
                        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Part Code */}
                          <div className="space-y-1">
                            <Label className="text-xs font-semibold text-foreground flex items-center gap-1">
                              <Package className="h-3.5 w-3.5 text-teal-600" />{" "}
                              Part Code <span className="text-rose-500">*</span>
                            </Label>
                            <Input
                              placeholder="e.g. A-01928"
                              value={row.partCode}
                              onChange={(e) =>
                                updateRow(
                                  section.id,
                                  row.id,
                                  "partCode",
                                  e.target.value,
                                )
                              }
                              className={
                                errors[`${section.id}-${row.id}-partCode`]
                                  ? "border-rose-500"
                                  : ""
                              }
                              data-ocid="existing-stock.input"
                            />
                            {errors[`${section.id}-${row.id}-partCode`] && (
                              <p className="text-xs text-rose-500">
                                {errors[`${section.id}-${row.id}-partCode`]}
                              </p>
                            )}
                          </div>

                          {/* Quantity */}
                          <div className="space-y-1">
                            <Label className="text-xs font-semibold text-foreground flex items-center gap-1">
                              <Package className="h-3.5 w-3.5 text-teal-600" />{" "}
                              Quantity <span className="text-rose-500">*</span>
                            </Label>
                            <div className="flex items-center gap-1">
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="h-9 w-9 shrink-0"
                                onClick={() =>
                                  updateRow(
                                    section.id,
                                    row.id,
                                    "quantity",
                                    Math.max(1, row.quantity - 1),
                                  )
                                }
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </Button>
                              <Input
                                type="number"
                                min={1}
                                value={row.quantity}
                                onChange={(e) =>
                                  updateRow(
                                    section.id,
                                    row.id,
                                    "quantity",
                                    Math.max(
                                      1,
                                      Number.parseInt(e.target.value) || 1,
                                    ),
                                  )
                                }
                                className="text-center"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="h-9 w-9 shrink-0"
                                onClick={() =>
                                  updateRow(
                                    section.id,
                                    row.id,
                                    "quantity",
                                    row.quantity + 1,
                                  )
                                }
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        {/* Row 2: Price + Notes (per part code) */}
                        <div className="px-4 pb-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <Label className="text-xs font-semibold text-foreground flex items-center gap-1">
                              <DollarSign className="h-3.5 w-3.5 text-emerald-600" />{" "}
                              Unit Price ₹{" "}
                              <span className="text-muted-foreground font-normal">
                                (optional)
                              </span>
                            </Label>
                            <Input
                              type="number"
                              placeholder="0.00"
                              value={row.price}
                              onChange={(e) =>
                                updateRow(
                                  section.id,
                                  row.id,
                                  "price",
                                  e.target.value,
                                )
                              }
                              className="text-sm"
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs font-semibold text-foreground flex items-center gap-1">
                              <FileText className="h-3.5 w-3.5 text-blue-500" />{" "}
                              Notes{" "}
                              <span className="text-muted-foreground font-normal">
                                (optional)
                              </span>
                            </Label>
                            <Input
                              placeholder="Any notes for this part code..."
                              value={row.notes}
                              onChange={(e) =>
                                updateRow(
                                  section.id,
                                  row.id,
                                  "notes",
                                  e.target.value,
                                )
                              }
                              className="text-sm"
                            />
                          </div>
                        </div>

                        {/* Location */}
                        <div className="px-4 pb-4">
                          <div className="border border-dashed border-teal-300 rounded-xl p-3 bg-teal-50/50">
                            <div className="flex items-center gap-2 mb-2.5">
                              <MapPin className="h-3.5 w-3.5 text-teal-600" />
                              <span className="text-xs font-semibold text-teal-700">
                                Location (optional)
                              </span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">
                                  Rack
                                </Label>
                                <Select
                                  value={row.rackId}
                                  onValueChange={(v) =>
                                    updateRow(section.id, row.id, "rackId", v)
                                  }
                                >
                                  <SelectTrigger className="h-8 text-xs">
                                    <SelectValue placeholder="Select rack" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {racks.map((r) => (
                                      <SelectItem key={r.id} value={r.id}>
                                        {r.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">
                                  Shelf
                                </Label>
                                <Select
                                  value={row.shelfId}
                                  onValueChange={(v) =>
                                    updateRow(section.id, row.id, "shelfId", v)
                                  }
                                  disabled={!row.rackId}
                                >
                                  <SelectTrigger className="h-8 text-xs">
                                    <SelectValue
                                      placeholder={
                                        row.rackId
                                          ? "Select shelf"
                                          : "Select rack first"
                                      }
                                    />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {filteredShelves.map((s) => (
                                      <SelectItem key={s.id} value={s.id}>
                                        {s.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">
                                  Bin
                                </Label>
                                <Select
                                  value={row.binId}
                                  onValueChange={(v) =>
                                    updateRow(section.id, row.id, "binId", v)
                                  }
                                  disabled={!row.shelfId}
                                >
                                  <SelectTrigger className="h-8 text-xs">
                                    <SelectValue
                                      placeholder={
                                        row.shelfId
                                          ? "Select bin"
                                          : "Select shelf first"
                                      }
                                    />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {filteredBins.map((b) => (
                                      <SelectItem key={b.id} value={b.id}>
                                        {b.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <Button
                    variant="outline"
                    onClick={() => addRow(section.id)}
                    className="gap-2 border-teal-300 text-teal-700 hover:bg-teal-50 text-xs h-8"
                    data-ocid="existing-stock.primary_button"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Another Part Code
                  </Button>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Add part name section button */}
      <Button
        variant="outline"
        onClick={addSection}
        className="w-full gap-2 border-dashed border-teal-400 text-teal-700 hover:bg-teal-50 h-12"
      >
        <Plus className="h-4 w-4" /> Add Another Part Name
      </Button>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card border border-border rounded-2xl p-4 shadow-sm">
        <div className="text-sm text-muted-foreground">
          {sections.length} part name{sections.length !== 1 ? "s" : ""} ·{" "}
          {sections.reduce((s, sec) => s + sec.rows.length, 0)} code
          {sections.reduce((s, sec) => s + sec.rows.length, 0) !== 1 ? "s" : ""}{" "}
          → <strong>{totalUnits}</strong> total units
        </div>
        <Button
          onClick={handleSave}
          disabled={sections.every((s) => !s.partNameId)}
          className="gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white px-8"
          data-ocid="existing-stock.submit_button"
        >
          <Save className="h-4 w-4" /> Save All Stock Entries
        </Button>
      </div>
    </div>
  );
}
