export type RoleType = 'staff' | 'admin_system' | 'admin_data';

export type CapabilityType = 
  | 'view_dashboard'
  | 'view_live_monitor'
  | 'manage_cases_all'
  | 'manage_cases_assigned'
  | 'override_case_decision'
  | 'view_jobs'
  | 'cancel_jobs'
  | 'manual_offer'
  | 'view_users'
  | 'manage_users'
  | 'verify_identities'
  | 'view_finance'
  | 'process_payouts'
  | 'process_refunds'
  | 'manage_receivables'
  | 'view_services'
  | 'manage_services'
  | 'manage_pricing'
  | 'manage_cancellation_policies'
  | 'manage_priority_tiers'
  | 'manage_admin_accounts'
  | 'manage_roles'
  | 'view_audit_logs';

export interface UserPrincipal {
  id: string;
  email: string;
  name: string;
  role: RoleType;
  capabilities: CapabilityType[];
}
