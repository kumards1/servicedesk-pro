import { u as useStore, r as reactExports, j as jsxRuntimeExports, D as Settings, i as Card, k as CardHeader, l as CardTitle, m as CardContent, z as Label, I as Input, X, w as Button, C as CircleCheckBig, G as ue } from "./index-De7Q6SQO.js";
import { P as Plus } from "./plus-B5kdLRRW.js";
function SettingsPage() {
  const { settings, updateSettings, currentUser } = useStore();
  const isAdmin = (currentUser == null ? void 0 : currentUser.role) === "admin";
  const [saved, setSaved] = reactExports.useState(false);
  const [waNumber, setWaNumber] = reactExports.useState(settings.supervisorWhatsApp);
  const [supervisorName, setSupervisorName] = reactExports.useState(
    settings.supervisorName ?? "Mishra"
  );
  const [companyName, setCompanyName] = reactExports.useState(settings.companyName);
  const [products, setProducts] = reactExports.useState(settings.products);
  const [newProduct, setNewProduct] = reactExports.useState("");
  const save = () => {
    updateSettings({
      supervisorWhatsApp: waNumber,
      supervisorName,
      companyName,
      products
    });
    setSaved(true);
    ue.success("Settings saved");
    setTimeout(() => setSaved(false), 3e3);
  };
  const addProduct = () => {
    if (newProduct.trim() && !products.includes(newProduct.trim())) {
      setProducts([...products, newProduct.trim()]);
      setNewProduct("");
    }
  };
  const removeProduct = (p) => setProducts(products.filter((x) => x !== p));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-r from-gray-600 to-slate-700 text-white rounded-xl px-6 py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 bg-white/20 rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-6 w-6" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Settings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-300 text-sm", children: "Configure system settings" })
      ] })
    ] }) }),
    !isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-yellow-50 border border-yellow-200 px-4 py-3 rounded-lg text-sm text-yellow-800", children: "Only admins can modify settings." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm", children: "Company Settings" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Company Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: companyName,
            onChange: (e) => setCompanyName(e.target.value),
            disabled: !isAdmin
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm", children: "Supervisor Details" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Supervisor Name (used in WhatsApp greeting)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "e.g. Mishra",
              value: supervisorName,
              onChange: (e) => setSupervisorName(e.target.value),
              disabled: !isAdmin
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-400", children: [
            "WhatsApp messages will start with: Hello ",
            supervisorName,
            " ji,"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "WhatsApp Number (with country code, no spaces)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "e.g. 919876543210",
              value: waNumber,
              onChange: (e) => setWaNumber(e.target.value),
              disabled: !isAdmin
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400", children: "This number will receive part availability queries." })
        ] }),
        waNumber && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: `https://wa.me/${waNumber}`,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "text-xs text-green-600 hover:underline",
            children: [
              "Test: Open WhatsApp to ",
              waNumber
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm", children: "Product List" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: products.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: "flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full text-sm",
            children: [
              p,
              isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => removeProduct(p), children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" }) })
            ]
          },
          p
        )) }),
        isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Add product...",
              value: newProduct,
              onChange: (e) => setNewProduct(e.target.value),
              onKeyDown: (e) => e.key === "Enter" && addProduct()
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: addProduct, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }) })
        ] })
      ] })
    ] }),
    isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: save, "data-ocid": "settings.save_button", children: "Save Settings" }),
      saved && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-green-600 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-4 w-4" }),
        " Saved!"
      ] })
    ] })
  ] });
}
export {
  SettingsPage as default
};
