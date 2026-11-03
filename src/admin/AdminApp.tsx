import { Navigate, Route, Routes } from "react-router-dom";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import { AdminLayout } from "./layouts/AdminLayout";

// Modules
import { AdminDashboardPage } from "./modules/dashboard";
import {
  LiveMonitorPage,
  ManualAssignmentPage,
  JobsManagementPage,
} from "./modules/operations";
import { WorkerVerificationPage } from "./modules/verification";
import {
  WalletsTransactionsPage,
  RefundsWithdrawalsPage
} from "./modules/finance";
import {
  ServiceCategoriesPage,
  PricingRulesPage,
  VoucherManagementPage,
} from "./modules/services";
import { AllUsersPage } from "./modules/users";
import {
  AdminAccountsPage,
  RolesPermissionsPage,
  AppSettingsPage,
  AuditLogsPage,
} from "./modules/system";
import { AdminDataLayout } from "./modules/analytics";
import { AdminLoginPage } from "./modules/auth";

export default function AdminApp() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin" replace />} />

      {/* Admin Login Route */}
      <Route
        path="/admin/login"
        element={
          <AdminAuthProvider>
            <AdminLoginPage />
          </AdminAuthProvider>
        }
      />

      {/* 1. Super Admin Portal (/admin) */}
      <Route path="/admin" element={<AdminAuthProvider><AdminLayout /></AdminAuthProvider>}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="live-monitor" element={<LiveMonitorPage />} />
        <Route path="cases" element={<Navigate to="/admin/jobs?status=Disputed" replace />} />
        <Route path="jobs" element={<JobsManagementPage />} />
        <Route path="manual-assignment" element={<ManualAssignmentPage />} />
        <Route path="manual-offer" element={<Navigate to="/admin/manual-assignment" replace />} />
        <Route path="users" element={<AllUsersPage />} />
        <Route path="verification" element={<WorkerVerificationPage />} />
        <Route path="wallets" element={<WalletsTransactionsPage />} />
        <Route path="refunds-withdrawals" element={<RefundsWithdrawalsPage />} />
        <Route path="payments" element={<Navigate to="/admin/wallets" replace />} />
        <Route path="payouts" element={<Navigate to="/admin/wallets" replace />} />
        <Route path="refunds" element={<Navigate to="/admin/refunds-withdrawals" replace />} />
        <Route path="receivables" element={<Navigate to="/admin/refunds-withdrawals" replace />} />
        <Route path="categories" element={<ServiceCategoriesPage />} />
        <Route path="pricing" element={<PricingRulesPage />} />
        <Route path="vouchers" element={<VoucherManagementPage />} />
        <Route path="accounts" element={<AdminAccountsPage />} />
        <Route path="roles" element={<RolesPermissionsPage />} />
        <Route path="settings" element={<AppSettingsPage />} />
        <Route path="audit-logs" element={<AuditLogsPage />} />
        <Route path="analytics" element={<Navigate to="/data" replace />} />
        <Route path="data" element={<Navigate to="/data" replace />} />
      </Route>

      {/* 2. Standalone Admin Data Portal (/data, /admin-data, /analytics) */}
      <Route path="/data" element={<AdminAuthProvider><AdminDataLayout /></AdminAuthProvider>} />
      <Route path="/admin-data" element={<Navigate to="/data" replace />} />
      <Route path="/analytics" element={<Navigate to="/data" replace />} />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}
