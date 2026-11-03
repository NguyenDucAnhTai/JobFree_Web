import { ROUTER_URL } from "../../routes";
import type { InternalMenuItem } from "./internal-menu.model";

export const adminSystemMenu: InternalMenuItem[] = [
  {
    label: "Dashboard",
    to: ROUTER_URL.ADMIN_SYSTEM.DASHBOARD,
  },
];
