import { Navigate, Outlet } from "react-router-dom";
import LoadingLayout from "../../layouts/Loading.layout";
import { useAuthStore } from "../../stores";
import { getDashboardByRole } from "./role-redirect.util";

export default function GuestGuard() {
  const { user, isInitialized } = useAuthStore();

  if (!isInitialized) {
    return <LoadingLayout />;
  }

  if (user) {
    return <Navigate replace to={getDashboardByRole(user.role)} />;
  }

  return <Outlet />;
}
