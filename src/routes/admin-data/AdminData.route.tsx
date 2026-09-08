import { lazy } from "react";
import { Navigate, Route } from "react-router-dom";
import { adminDataMenu, InternalLayout } from "../../layouts";
import { INTERNAL_ROLE } from "../../models";
import { AuthGuard, RoleGuard } from "../guard";
import { ROUTER_URL } from "../router.const";

const AdminDataDashboardPage = lazy(
  () => import("../../pages/admin-data/AdminDataDashboard.page"),
);

export default function AdminDataRoute() {
  return (
    <Route element={<AuthGuard />}>
      <Route element={<RoleGuard roles={[INTERNAL_ROLE.ADMIN_DATA]} />}>
        <Route element={<InternalLayout menuItems={adminDataMenu} />}>
          <Route
            path={ROUTER_URL.ADMIN_DATA.ROOT}
            element={<Navigate replace to={ROUTER_URL.ADMIN_DATA.DASHBOARD} />}
          />
          <Route
            path={ROUTER_URL.ADMIN_DATA.DASHBOARD}
            element={<AdminDataDashboardPage />}
          />
        </Route>
      </Route>
    </Route>
  );
}
