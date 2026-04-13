import { Suspense, lazy, useEffect } from "react";
import Layout from "./components/Layout";
import { Toaster } from "./components/ui/sonner";
import {
  getMidnightTaskRanDate,
  setMidnightTaskRanDate,
} from "./services/userBackend";
import { useStore } from "./store";

import DashboardPage from "./pages/DashboardPage";
// Eagerly loaded — used before auth
import LoginPage from "./pages/LoginPage";
import RegisterApprovedPage from "./pages/RegisterApprovedPage";
import RegisterPage from "./pages/RegisterPage";
import RegisterPendingPage from "./pages/RegisterPendingPage";
import RegisterRejectedPage from "./pages/RegisterRejectedPage";

// Lazy loaded — only fetched when navigated to
const AIEnginePage = lazy(() => import("./pages/AIEnginePage"));
const AdminNoticesPage = lazy(() => import("./pages/AdminNoticesPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const AuditLogsPage = lazy(() => import("./pages/AuditLogsPage"));
const CaseDetailPage = lazy(() => import("./pages/CaseDetailPage"));
const CasesPage = lazy(() => import("./pages/CasesPage"));
const CustomerHistoryPage = lazy(() => import("./pages/CustomerHistoryPage"));
const DataManagementPage = lazy(() => import("./pages/DataManagementPage"));
const ExistingCasesPage = lazy(() => import("./pages/ExistingCasesPage"));
const ExistingStockPage = lazy(() => import("./pages/ExistingStockPage"));
const InventoryPage = lazy(() => import("./pages/InventoryPage"));
const IssuedPartsPage = lazy(() => import("./pages/IssuedPartsPage"));
const LifecyclePage = lazy(() => import("./pages/LifecyclePage"));
const MastersPage = lazy(() => import("./pages/MastersPage"));
const NewCasePage = lazy(() => import("./pages/NewCasePage"));
const NotificationsPage = lazy(() => import("./pages/NotificationsPage"));
const PartDetailPage = lazy(() => import("./pages/PartDetailPage"));
const PartRequestsPage = lazy(() => import("./pages/PartRequestsPage"));
const PartsPage = lazy(() => import("./pages/PartsPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const PurchasePage = lazy(() => import("./pages/PurchasePage"));
const ReportsPage = lazy(() => import("./pages/ReportsPage"));
const ReturnToCompanyPage = lazy(() => import("./pages/ReturnToCompanyPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const TechniciansPage = lazy(() => import("./pages/TechniciansPage"));
const VendorsPage = lazy(() => import("./pages/VendorsPage"));
const WarehousePage = lazy(() => import("./pages/WarehousePage"));

// Minimal page-level skeleton shown while lazy chunks load
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  const currentUser = useStore((s) => s.currentUser);
  const currentPage = useStore((s) => s.currentPage);
  const isInitializing = useStore((s) => s.isInitializing);
  const sessionExpired = useStore((s) => s.sessionExpired);

  // biome-ignore lint/correctness/useExhaustiveDependencies: initUsers is stable, run once
  useEffect(() => {
    useStore.getState().initUsers();
  }, []);

  // Auto-logout: if current user is deleted by admin, log them out live
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional polling
  useEffect(() => {
    if (!currentUser) return;
    const check = () => {
      const latestUsers = useStore.getState().users;
      if (latestUsers.length === 0) return; // Guard: never logout on empty list
      const found = latestUsers.find(
        (u) =>
          u.id === currentUser.id ||
          u.email.toLowerCase() === currentUser.email.toLowerCase(),
      );
      if (!found) useStore.getState().logout();
    };
    const interval = setInterval(check, 5000);
    return () => clearInterval(interval);
  }, [currentUser?.id]);

  // ── Polling: staggered intervals ───────────────────────────────────────────
  // Critical data (users, cases, partRequests, notices) — every 3 seconds
  // Heavy data (inventory, appData with warehouse/technicians/vendors) — every 8 seconds
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional polling
  useEffect(() => {
    if (!currentUser) return;

    // Initial load: sync everything at once on login
    // casesInitialized and partRequestsInitialized flags are set by initUsers already.
    // Just sync remaining non-critical data here.
    const initialPoll = async () => {
      const store = useStore.getState();
      await store.syncUsersFromBackend();
      await Promise.allSettled([
        store.syncNotices(),
        store.syncInventory(),
        store.syncAppData(),
      ]);
      // Now sync cases+partRequests via normal sync (flags are already set by initUsers)
      store.syncCases().catch(() => {});
      store.syncPartRequests().catch(() => {});
    };
    initialPoll();

    // Critical data: users + cases + partRequests + notices every 3s
    const criticalInterval = setInterval(() => {
      const store = useStore.getState();
      store.syncUsersFromBackend().catch(() => {});
      store.syncCases().catch(() => {});
      store.syncPartRequests().catch(() => {});
      store.syncNotices().catch(() => {});
    }, 3000);

    // Heavy data: inventory + appData (warehouse/technicians/vendors/notifications) every 8s
    const heavyInterval = setInterval(() => {
      const store = useStore.getState();
      store.syncInventory().catch(() => {});
      store.syncAppData().catch(() => {});
    }, 8000);

    return () => {
      clearInterval(criticalInterval);
      clearInterval(heavyInterval);
    };
  }, [currentUser?.id]);

  // Session timeout: after 30 min of inactivity, mark session as expired.
  // User stays on current page; on next interaction they get redirected to login.
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional inactivity timer
  useEffect(() => {
    if (!currentUser) return;
    const TIMEOUT_MS = 30 * 60 * 1000;
    let timer: ReturnType<typeof setTimeout>;

    const onActivity = () => {
      if (useStore.getState().sessionExpired) {
        useStore.getState().logout();
        return;
      }
      clearTimeout(timer);
      timer = setTimeout(() => {
        useStore.getState().setSessionExpired(true);
      }, TIMEOUT_MS);
    };

    const events = [
      "mousemove",
      "mousedown",
      "keydown",
      "touchstart",
      "scroll",
      "click",
    ];
    for (const e of events)
      window.addEventListener(e, onActivity, { passive: true });
    timer = setTimeout(() => {
      useStore.getState().setSessionExpired(true);
    }, TIMEOUT_MS);

    return () => {
      clearTimeout(timer);
      for (const e of events) window.removeEventListener(e, onActivity);
    };
  }, [currentUser?.id]);

  // ── Midnight scheduler: stale case resets, pending case reminders, low-stock alerts ───
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional midnight scheduler
  useEffect(() => {
    if (!currentUser) return;

    const runMidnightTasks = async () => {
      // Guard: only run once per calendar day using backend flag (not localStorage)
      const todayKey = new Date().toISOString().split("T")[0];
      try {
        const lastRun = await getMidnightTaskRanDate();
        if (lastRun === todayKey) return;
        await setMidnightTaskRanDate(todayKey);
      } catch {
        // If backend call fails, fall back to localStorage to avoid re-running
        const lastRun = localStorage.getItem("midnightTasksRunToday");
        if (lastRun === todayKey) return;
        localStorage.setItem("midnightTasksRunToday", todayKey);
      }

      const store = useStore.getState();
      const {
        cases,
        partItems,
        addNotification,
        saveCasesToBackend,
        saveAppDataToBackend,
      } = store;
      const today = todayKey;

      // 1. Stale on_route cases: reset if no update from yesterday
      const staleCases = cases.filter(
        (c) =>
          c.status === "on_route" &&
          c.onRouteDate &&
          c.onRouteDate < today &&
          !c.hasFirstUpdate,
      );
      for (const c of staleCases) {
        store.resetStaleTechnician(c.id);
        const techName = c.technicianId
          ? (store.technicians.find((t) => t.id === c.technicianId)?.name ??
            c.technicianId)
          : "technician";
        const msg = `Case ${c.caseId} reset: no update from ${techName} since yesterday`;
        // Notify admin
        addNotification({
          userId: "",
          message: msg,
          type: "stale_case",
          isRead: false,
          caseId: c.id,
          targetRole: "admin",
        });
        // Notify the backend user who owns the case
        if (c.createdBy) {
          addNotification({
            userId: c.createdBy,
            message: msg,
            type: "stale_case",
            isRead: false,
            caseId: c.id,
            targetRole: "backend_user",
            targetUserId: c.createdBy,
          });
        }
      }
      if (staleCases.length > 0) saveCasesToBackend().catch(() => {});

      // 2. Pending case daily reminders
      const pendingCases = cases.filter((c) => c.status === "pending");
      if (pendingCases.length > 0) {
        const pendingMsg = `Pending case reminder: ${pendingCases.length} case${pendingCases.length > 1 ? "s" : ""} are still pending`;
        addNotification({
          userId: "",
          message: pendingMsg,
          type: "general",
          isRead: false,
          targetRole: "admin",
        });
        // All backend users get the reminder
        addNotification({
          userId: "",
          message: pendingMsg,
          type: "general",
          isRead: false,
          targetRole: "backend_user",
        });
      }

      // 3. Low stock alerts: part codes with < 5 in_stock units
      const stockMap = new Map<string, number>();
      for (const item of partItems) {
        if (item.status === "in_stock") {
          stockMap.set(item.partCode, (stockMap.get(item.partCode) ?? 0) + 1);
        }
      }
      for (const [partCode, count] of stockMap.entries()) {
        if (count < 5) {
          const stockMsg = `Low stock alert: ${partCode} has only ${count} unit${count !== 1 ? "s" : ""} remaining`;
          addNotification({
            userId: "",
            message: stockMsg,
            type: "low_stock",
            isRead: false,
            relatedPartCode: partCode,
            targetRole: "admin",
          });
          addNotification({
            userId: "",
            message: stockMsg,
            type: "low_stock",
            isRead: false,
            relatedPartCode: partCode,
            targetRole: "supervisor",
          });
        }
      }

      saveAppDataToBackend().catch(() => {});
    };

    // Schedule: fire at next midnight, then every 24h
    const msUntilMidnight = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      return midnight.getTime() - now.getTime();
    };

    let dailyInterval: ReturnType<typeof setInterval> | null = null;
    const firstTimeout = setTimeout(() => {
      runMidnightTasks().catch(() => {});
      dailyInterval = setInterval(
        () => runMidnightTasks().catch(() => {}),
        24 * 60 * 60 * 1000,
      );
    }, msUntilMidnight());

    return () => {
      clearTimeout(firstTimeout);
      if (dailyInterval) clearInterval(dailyInterval);
    };
  }, [currentUser?.id]);

  if (isInitializing) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-950 z-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-white text-lg font-medium tracking-wide">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    if (currentPage === "register") return <RegisterPage />;
    if (currentPage === "register-pending") return <RegisterPendingPage />;
    if (currentPage === "register-approved") return <RegisterApprovedPage />;
    if (currentPage === "register-rejected") return <RegisterRejectedPage />;
    return <LoginPage />;
  }

  return (
    <>
      {sessionExpired && (
        <button
          type="button"
          className="fixed top-0 left-0 right-0 z-[9999] bg-amber-500 text-white text-center py-2 text-sm font-medium cursor-pointer w-full"
          onClick={() => useStore.getState().logout()}
        >
          ⚠️ Your session has expired. Click here to log in again.
        </button>
      )}
      <Layout>
        <Suspense fallback={<PageLoader />}>
          {currentPage === "dashboard" && <DashboardPage />}
          {currentPage === "cases" && <CasesPage />}
          {currentPage === "new-case" && <NewCasePage />}
          {currentPage === "case-detail" && <CaseDetailPage />}
          {currentPage === "customer-history" && <CustomerHistoryPage />}
          {currentPage === "parts" && <PartsPage />}
          {currentPage === "technicians" && <TechniciansPage />}
          {currentPage === "reports" && <ReportsPage />}
          {currentPage === "settings" && <SettingsPage />}
          {currentPage === "admin" && <AdminPage />}
          {currentPage === "profile" && <ProfilePage />}
          {currentPage === "inventory" && <InventoryPage />}
          {currentPage === "purchase" && <PurchasePage />}
          {currentPage === "part-detail" && <PartDetailPage />}
          {currentPage === "issued-parts" && <IssuedPartsPage />}
          {currentPage === "warehouse" && <WarehousePage />}
          {currentPage === "masters" && <MastersPage />}
          {currentPage === "part-requests" && <PartRequestsPage />}
          {currentPage === "vendors" && <VendorsPage />}
          {currentPage === "return-to-company" && <ReturnToCompanyPage />}
          {currentPage === "lifecycle" && <LifecyclePage />}
          {currentPage === "ai-engine" && <AIEnginePage />}
          {currentPage === "notifications" && <NotificationsPage />}
          {currentPage === "audit-logs" && <AuditLogsPage />}
          {currentPage === "notices" && <AdminNoticesPage />}
          {currentPage === "data-management" && <DataManagementPage />}
          {currentPage === "existing-stock" && <ExistingStockPage />}
          {currentPage === "existing-cases" && <ExistingCasesPage />}
          {![
            "dashboard",
            "cases",
            "new-case",
            "case-detail",
            "customer-history",
            "parts",
            "technicians",
            "reports",
            "settings",
            "admin",
            "profile",
            "inventory",
            "purchase",
            "part-detail",
            "issued-parts",
            "warehouse",
            "masters",
            "part-requests",
            "vendors",
            "return-to-company",
            "lifecycle",
            "ai-engine",
            "notifications",
            "audit-logs",
            "notices",
            "data-management",
            "existing-stock",
            "existing-cases",
          ].includes(currentPage) && <DashboardPage />}
        </Suspense>
      </Layout>
      <Toaster position="top-right" />
    </>
  );
}
