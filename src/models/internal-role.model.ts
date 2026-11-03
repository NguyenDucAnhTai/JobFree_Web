export const INTERNAL_ROLE = {
  ADMIN_SYSTEM: "ADMIN_SYSTEM",
  ADMIN_DATA: "ADMIN_DATA",
  CUSTOMER_SUPPORT: "CUSTOMER_SUPPORT",
} as const;

export type InternalRole =
  (typeof INTERNAL_ROLE)[keyof typeof INTERNAL_ROLE];
