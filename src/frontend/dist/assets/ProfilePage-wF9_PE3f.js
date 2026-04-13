import { u as useStore, r as reactExports, j as jsxRuntimeExports, aD as CircleUser, i as Card, k as CardHeader, l as CardTitle, ab as User, m as CardContent, z as Label, I as Input, w as Button, aE as Lock, G as ue } from "./index-De7Q6SQO.js";
function ProfilePage() {
  var _a, _b;
  const { currentUser, updateCurrentUser } = useStore();
  const [name, setName] = reactExports.useState((currentUser == null ? void 0 : currentUser.name) ?? "");
  const [phone, setPhone] = reactExports.useState((currentUser == null ? void 0 : currentUser.phone) ?? "");
  const [savingProfile, setSavingProfile] = reactExports.useState(false);
  const [currentPwd, setCurrentPwd] = reactExports.useState("");
  const [newPwd, setNewPwd] = reactExports.useState("");
  const [confirmPwd, setConfirmPwd] = reactExports.useState("");
  const [savingPwd, setSavingPwd] = reactExports.useState(false);
  if (!currentUser) return null;
  const handleSaveProfile = () => {
    if (!name.trim()) {
      ue.error("Name cannot be empty");
      return;
    }
    setSavingProfile(true);
    setTimeout(() => {
      updateCurrentUser({ name: name.trim(), phone: phone.trim() });
      ue.success("Profile updated successfully");
      setSavingProfile(false);
    }, 400);
  };
  const handleChangePassword = () => {
    if (currentPwd !== currentUser.password) {
      ue.error("Current password is incorrect");
      return;
    }
    if (newPwd.length < 6) {
      ue.error("New password must be at least 6 characters");
      return;
    }
    if (newPwd !== confirmPwd) {
      ue.error("New passwords do not match");
      return;
    }
    setSavingPwd(true);
    setTimeout(() => {
      updateCurrentUser({ password: newPwd });
      setCurrentPwd("");
      setNewPwd("");
      setConfirmPwd("");
      ue.success("Password changed successfully");
      setSavingPwd(false);
    }, 400);
  };
  const memberSince = currentUser.createdAt ? new Date(currentUser.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }) : "—";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl px-6 py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 bg-white/20 rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleUser, { className: "h-6 w-6" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "My Profile" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-indigo-200 text-sm", children: "Manage your account details and password" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4 text-indigo-500" }),
        " Profile Information"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0", children: ((_b = (_a = currentUser.name) == null ? void 0 : _a[0]) == null ? void 0 : _b.toUpperCase()) ?? "U" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-gray-900", children: currentUser.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: currentUser.email }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-2 py-0.5 rounded-full font-medium bg-blue-100 text-blue-700 capitalize", children: currentUser.role.replace("_", " ") })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "profile-name", children: "Full Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "profile-name",
                value: name,
                onChange: (e) => setName(e.target.value),
                placeholder: "Your name",
                "data-ocid": "profile.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "profile-email", children: "Email Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "profile-email",
                value: currentUser.email,
                disabled: true,
                className: "bg-gray-50"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "profile-phone", children: "Phone Number" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "profile-phone",
                value: phone,
                onChange: (e) => setPhone(e.target.value),
                placeholder: "Phone number"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Role" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: currentUser.role.replace("_", " "),
                disabled: true,
                className: "bg-gray-50 capitalize"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center h-9", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-2 py-0.5 rounded-full font-medium bg-green-100 text-green-700 capitalize", children: currentUser.status }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Member Since" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: memberSince, disabled: true, className: "bg-gray-50" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleSaveProfile,
            disabled: savingProfile,
            className: "bg-blue-600 hover:bg-blue-700",
            "data-ocid": "profile.save_button",
            children: savingProfile ? "Saving..." : "Save Changes"
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-4 w-4 text-slate-500" }),
        " Change Password"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "current-pwd", children: "Current Password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "current-pwd",
              type: "password",
              value: currentPwd,
              onChange: (e) => setCurrentPwd(e.target.value),
              placeholder: "Enter current password",
              "data-ocid": "profile.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "new-pwd", children: "New Password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "new-pwd",
                type: "password",
                value: newPwd,
                onChange: (e) => setNewPwd(e.target.value),
                placeholder: "New password"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "confirm-pwd", children: "Confirm New Password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "confirm-pwd",
                type: "password",
                value: confirmPwd,
                onChange: (e) => setConfirmPwd(e.target.value),
                placeholder: "Confirm new password"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleChangePassword,
            disabled: savingPwd || !currentPwd || !newPwd || !confirmPwd,
            variant: "outline",
            className: "border-blue-600 text-blue-600 hover:bg-blue-50",
            "data-ocid": "profile.submit_button",
            children: savingPwd ? "Changing..." : "Change Password"
          }
        ) })
      ] })
    ] })
  ] });
}
export {
  ProfilePage as default
};
