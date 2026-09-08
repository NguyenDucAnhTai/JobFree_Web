import { INTERNAL_ROLE, type InternalRole } from "../../models";
import { ROUTER_URL } from "../router.const";

export const getDashboardByRole = (role: InternalRole): string => {
  switch (role) {
    case INTERNAL_ROLE.ADMIN_SYSTEM:
      return ROUTER_URL.ADMIN_SYSTEM.DASHBOARD;
    case INTERNAL_ROLE.ADMIN_DATA:
      return ROUTER_URL.ADMIN_DATA.DASHBOARD;
    case INTERNAL_ROLE.CUSTOMER_SUPPORT:
      return ROUTER_URL.CUSTOMER_SUPPORT.DASHBOARD;
  }
};
