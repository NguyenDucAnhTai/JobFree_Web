import type { UserPrincipal } from '../types/auth';

export const mockUsers: UserPrincipal[] = [
  {
    id: 'u1',
    email: 'admin@jobfree.vn',
    name: 'Admin System',
    role: 'admin_system',
    capabilities: [
      'view_dashboard', 'view_live_monitor', 'manage_cases_all', 'manage_cases_assigned',
      'override_case_decision', 'view_jobs', 'cancel_jobs', 'manual_offer', 'view_users',
      'manage_users', 'verify_identities', 'view_finance', 'process_payouts', 'process_refunds',
      'manage_receivables', 'view_services', 'manage_services', 'manage_pricing',
      'manage_cancellation_policies', 'manage_priority_tiers', 'manage_admin_accounts',
      'manage_roles', 'view_audit_logs'
    ]
  },
  {
    id: 'u2',
    email: 'staff@jobfree.vn',
    name: 'Staff Operations',
    role: 'staff',
    capabilities: [
      'view_dashboard', 'view_live_monitor', 'manage_cases_assigned', 'view_jobs',
      'view_users', 'view_finance', 'process_payouts', 'process_refunds', 'manage_receivables',
      'view_services'
    ]
  },
  {
    id: 'u3',
    email: 'analyst@jobfree.vn',
    name: 'Data Analyst',
    role: 'admin_data',
    capabilities: [
      'view_dashboard', 'view_live_monitor', 'view_jobs', 'view_users', 'view_finance', 'view_services'
    ]
  }
];

export const mockDb = {
  users: mockUsers,
  // Add other mocked entities as required: cases, verification cases, transactions, etc.
};
