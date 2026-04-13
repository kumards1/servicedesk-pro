import { u as useStore, r as reactExports, j as jsxRuntimeExports, al as Wrench, w as Button, y as Trash2, z as Label, I as Input, G as ue } from "./index-De7Q6SQO.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-CsjrwcpS.js";
import { S as Switch } from "./switch-uBKaXmTl.js";
import { C as CirclePlus } from "./circle-plus-DplsFd8V.js";
import { P as Pencil } from "./pencil-B4TAhzLG.js";
function TechniciansPage() {
  const {
    technicians,
    cases,
    currentUser,
    addTechnician,
    updateTechnician,
    deleteTechnician
  } = useStore();
  const isAdmin = (currentUser == null ? void 0 : currentUser.role) === "admin";
  const [dialog, setDialog] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState({
    name: "",
    phone: "",
    specialization: "",
    isActive: true,
    technicianCode: ""
  });
  const open = (t) => {
    if (t) {
      setEditing(t);
      setForm({
        name: t.name,
        phone: t.phone,
        specialization: t.specialization,
        isActive: t.isActive,
        technicianCode: t.technicianCode ?? ""
      });
    } else {
      setEditing(null);
      setForm({
        name: "",
        phone: "",
        specialization: "",
        isActive: true,
        technicianCode: ""
      });
    }
    setDialog(true);
  };
  const save = () => {
    if (editing) {
      updateTechnician(editing.id, form);
      ue.success("Technician updated");
    } else {
      addTechnician(form);
      ue.success("Technician added successfully");
    }
    setDialog(false);
  };
  const perf = (techId) => ({
    assigned: cases.filter((c) => c.technicianId === techId).length,
    completed: cases.filter(
      (c) => c.technicianId === techId && ["closed", "adjustment_closed", "replacement_done"].includes(c.status)
    ).length,
    pending: cases.filter(
      (c) => c.technicianId === techId && ![
        "closed",
        "cancelled",
        "transferred",
        "adjustment_closed",
        "replacement_done"
      ].includes(c.status)
    ).length
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl px-6 py-5 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 bg-white/20 rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Technicians" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-teal-200 text-sm", children: [
            technicians.length,
            " technician",
            technicians.length !== 1 ? "s" : "",
            " registered"
          ] })
        ] })
      ] }),
      isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => open(),
          className: "bg-white text-teal-700 hover:bg-teal-50",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "h-4 w-4 mr-1" }),
            "Add Technician"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: technicians.map((t) => {
      const p = perf(t.id);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `bg-white rounded-xl border shadow-sm p-5 ${!t.isActive ? "opacity-60" : ""}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold", children: t.name[0] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-gray-900", children: t.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: t.specialization }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400", children: t.phone }),
                  t.technicianCode && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-blue-500 font-mono", children: t.technicianCode })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `text-xs px-2 py-0.5 rounded-full font-medium ${t.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`,
                    children: t.isActive ? "Active" : "Inactive"
                  }
                ),
                isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => open(t),
                      className: "p-1 hover:bg-gray-100 rounded",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5 text-gray-400" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => deleteTechnician(t.id),
                      className: "p-1 hover:bg-red-50 rounded",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5 text-red-400" })
                    }
                  )
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3 mt-4 pt-4 border-t", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-blue-600", children: p.assigned }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: "Total" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-green-600", children: p.completed }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: "Completed" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-yellow-600", children: p.pending }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: "Pending" })
              ] })
            ] })
          ]
        },
        t.id
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialog, onOpenChange: setDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editing ? "Edit Technician" : "Add Technician" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.name,
              onChange: (e) => setForm({ ...form, name: e.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Phone" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.phone,
              onChange: (e) => setForm({ ...form, phone: e.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Specialization" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "e.g. AC, Washing Machine",
              value: form.specialization,
              onChange: (e) => setForm({ ...form, specialization: e.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Employee ID / Tech Code (optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "e.g. TECH-005",
              value: form.technicianCode,
              onChange: (e) => setForm({ ...form, technicianCode: e.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Switch,
            {
              checked: form.isActive,
              onCheckedChange: (v) => setForm({ ...form, isActive: v })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Active" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: save, className: "w-full", children: "Save" })
      ] })
    ] }) })
  ] });
}
export {
  TechniciansPage as default
};
