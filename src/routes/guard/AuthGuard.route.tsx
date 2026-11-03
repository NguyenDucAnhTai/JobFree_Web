import { Navigate, Outlet, useLocation } from "react-router-dom";
import LoadingLayout from "../../layouts/Loading.layout";
import { useAuthStore } from "../../stores";
import { ROUTER_URL } from "../router.const";

export default function AuthGuard() {
  const { user, isInitialized } = useAuthStore();
  const location = useLocation();

  if (!isInitialized) {
    return <LoadingLayout />;
  }

  if (!user) {
    return (
      <Navigate
        replace
        to={ROUTER_URL.AUTH.LOGIN}
        state={{ from: location.pathname }}
      />
    );
  }

  return <Outlet />;
}
