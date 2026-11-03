import { lazy } from "react";
import { Navigate, Route } from "react-router-dom";
import { adminSystemMenu, InternalLayout } from "../../layouts";
import { INTERNAL_ROLE } from "../../models";
import { AuthGuard, RoleGuard } from "../guard";
import { ROUTER_URL } from "../router.const";

const AdminSystemDashboardPage = lazy(
  () => import("../../pages/admin-system/AdminSystemDashboard.page"),
);

export default function AdminSystemRoute() {
  return (
    <Route element={<AuthGuard />}>
      <Route element={<RoleGuard roles={[INTERNAL_ROLE.ADMIN_SYSTEM]} />}>
        <Route element={<InternalLayout menuItems={adminSystemMenu} />}>
          <Route
            path={ROUTER_URL.ADMIN_SYSTEM.ROOT}
            element={
              <Navigate replace to={ROUTER_URL.ADMIN_SYSTEM.DASHBOARD} />
            }
          />
          <Route
            path={ROUTER_URL.ADMIN_SYSTEM.DASHBOARD}
            element={<AdminSystemDashboardPage />}
          />
        </Route>
      </Route>
    </Route>
  );
}
