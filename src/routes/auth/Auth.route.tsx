import { lazy } from "react";
import { Route } from "react-router-dom";
import { GuestGuard } from "../guard";
import { ROUTER_URL } from "../router.const";

const LoginPage = lazy(() => import("../../pages/auth/Login.page"));

export default function AuthRoute() {
  return (
    <Route element={<GuestGuard />}>
      <Route path={ROUTER_URL.AUTH.LOGIN} element={<LoginPage />} />
    </Route>
  );
}
