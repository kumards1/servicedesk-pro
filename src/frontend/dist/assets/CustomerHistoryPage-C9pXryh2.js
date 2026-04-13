import { u as useStore, r as reactExports, j as jsxRuntimeExports, U as Users, x as Clock, V as Search, I as Input, ab as User, a2 as StatusBadge, a0 as getAgeing } from "./index-De7Q6SQO.js";
import { H as History } from "./history-DshnOP__.js";
function CustomerHistoryPage() {
  const { cases, navigate } = useStore();
  const [query, setQuery] = reactExports.useState("");
  const grouped = reactExports.useMemo(() => {
    var _a;
    const q = query.trim().toLowerCase();
    const filtered = q ? cases.filter(
      (c) => c.customerName.toLowerCase().includes(q) || c.phone.includes(q) || c.altPhone.includes(q)
    ) : cases;
    const sorted = [...filtered].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    const byPhone = /* @__PURE__ */ new Map();
    for (const c of sorted) {
      const key = c.phone;
      if (!byPhone.has(key)) byPhone.set(key, []);
      (_a = byPhone.get(key)) == null ? void 0 : _a.push(c);
    }
    return byPhone;
  }, [cases, query]);
  const totalCustomers = grouped.size;
  const totalCasesAll = cases.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-r from-purple-600 to-violet-700 text-white rounded-2xl px-6 py-6 shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-white/20 rounded-xl backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "h-7 w-7" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Customer History" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-purple-200 text-sm mt-0.5", children: "All customer complaints — search by name or phone" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mt-3 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 bg-white/15 rounded-lg px-3 py-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5 text-purple-200" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold", children: [
              "Total Customers: ",
              totalCustomers
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 bg-white/15 rounded-lg px-3 py-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5 text-purple-200" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold", children: [
              "Total Cases: ",
              totalCasesAll
            ] })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "Search by name or phone number...",
          value: query,
          onChange: (e) => setQuery(e.target.value),
          className: "pl-9",
          "data-ocid": "customer_history.search_input"
        }
      )
    ] }),
    grouped.size === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12 bg-white rounded-xl border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-10 w-10 text-gray-300 mx-auto mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500", children: query ? `No customers found for "${query}"` : "No cases yet" })
    ] }),
    Array.from(grouped.entries()).map(([phone, customerCases], idx) => {
      const cust = customerCases[0];
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden",
          "data-ocid": `customer_history.item.${idx + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b bg-gray-50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4 text-blue-600" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-gray-900", children: cust.customerName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-500", children: [
                    cust.phone,
                    cust.altPhone && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gray-400 ml-1", children: [
                      "/ ",
                      cust.altPhone
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-blue-600", children: [
                  customerCases.length,
                  " case",
                  customerCases.length !== 1 ? "s" : ""
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-400", children: [
                  customerCases.filter(
                    (c) => [
                      "closed",
                      "adjustment_closed",
                      "replacement_done"
                    ].includes(c.status)
                  ).length,
                  " ",
                  "closed"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y", children: customerCases.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => navigate("case-detail", c.id),
                className: "w-full text-left flex items-center gap-4 px-5 py-3 hover:bg-blue-50 cursor-pointer transition-colors",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm text-blue-700", children: c.caseId }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: c.status }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-500 capitalize", children: c.complaintType.replace("_", " ") })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-600 mt-0.5", children: [
                      c.product,
                      " ",
                      c.productType,
                      " —",
                      " ",
                      new Date(c.createdAt).toLocaleDateString("en-IN")
                    ] }),
                    c.remarks && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 truncate", children: c.remarks }),
                    c.partName && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-orange-600", children: [
                      "Part: ",
                      c.partName,
                      " (",
                      c.partCode,
                      ")"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right text-xs text-gray-400 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                    getAgeing(c.createdAt),
                    "d ago"
                  ] }) })
                ]
              },
              c.id
            )) })
          ]
        },
        phone
      );
    })
  ] });
}
export {
  CustomerHistoryPage as default
};
