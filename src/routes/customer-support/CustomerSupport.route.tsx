import { lazy } from "react";
import { Navigate, Route } from "react-router-dom";
import { customerSupportMenu, InternalLayout } from "../../layouts";
import { INTERNAL_ROLE } from "../../models";
import { AuthGuard, RoleGuard } from "../guard";
import { ROUTER_URL } from "../router.const";

const CustomerSupportDashboardPage = lazy(
  () => import("../../pages/customer-support/CustomerSupportDashboard.page"),
);

export default function CustomerSupportRoute() {
  return (
    <Route element={<AuthGuard />}>
      <Route element={<RoleGuard roles={[INTERNAL_ROLE.CUSTOMER_SUPPORT]} />}>
        <Route element={<InternalLayout menuItems={customerSupportMenu} />}>
          <Route
            path={ROUTER_URL.CUSTOMER_SUPPORT.ROOT}
            element={
              <Navigate replace to={ROUTER_URL.CUSTOMER_SUPPORT.DASHBOARD} />
            }
          />
          <Route
            path={ROUTER_URL.CUSTOMER_SUPPORT.DASHBOARD}
            element={<CustomerSupportDashboardPage />}
          />
        </Route>
      </Route>
    </Route>
  );
}
