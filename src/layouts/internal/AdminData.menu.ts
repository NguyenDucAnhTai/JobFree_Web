import { ROUTER_URL } from "@/routes/router.const";
import type { InternalMenuItem } from "./internal-menu.model";

export const adminDataMenu: InternalMenuItem[] = [
  {
    label: "Dashboard",
    to: ROUTER_URL.ADMIN_DATA.DASHBOARD,
  },
];
