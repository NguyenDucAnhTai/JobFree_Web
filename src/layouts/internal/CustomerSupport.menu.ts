import { ROUTER_URL } from "../../routes";
import type { InternalMenuItem } from "./internal-menu.model";

export const customerSupportMenu: InternalMenuItem[] = [
  {
    label: "Dashboard",
    to: ROUTER_URL.CUSTOMER_SUPPORT.DASHBOARD,
  },
];
