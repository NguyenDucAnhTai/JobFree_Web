import { Navigate, Outlet } from "react-router-dom";
import type { InternalRole } from "../../models";
import { useAuthStore } from "../../stores";
import { ROUTER_URL } from "../router.const";

interface RoleGuardProps {
  roles: InternalRole[];
}

export default function RoleGuard({ roles }: RoleGuardProps) {
  const { user } = useAuthStore();

  if (!user || !roles.includes(user.role)) {
    return <Navigate replace to={ROUTER_URL.FORBIDDEN} />;
  }

  return <Outlet />;
}
