export const ROUTER_URL = {
  PUBLIC: {
    HOME: "/",
    ABOUT: "/about",
  },

  AUTH: {
    LOGIN: "/login",
  },

  ADMIN_SYSTEM: {
    ROOT: "/admin-system",
    DASHBOARD: "/admin-system/dashboard",
  },

  ADMIN_DATA: {
    ROOT: "/admin-data",
    DASHBOARD: "/admin-data/dashboard",
  },

  CUSTOMER_SUPPORT: {
    ROOT: "/cskh",
    DASHBOARD: "/cskh/dashboard",
  },

  FORBIDDEN: "/403",
} as const;
