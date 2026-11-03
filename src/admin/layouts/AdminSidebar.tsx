import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Activity,
  Briefcase,
  Send,
  Users,
  ShieldCheck,
  Layers,
  DollarSign,
  Zap,
  UserCheck,
  Lock,
  Settings,
  History,
  BarChart3,
  Wallet,
  ArrowDownLeft
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import type { CapabilityType } from '../types/auth';

interface NavItem {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  capability?: CapabilityType;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    label: 'OPERATIONS',
    items: [
      { label: 'Dashboard', path: '/admin', icon: LayoutDashboard, capability: 'view_dashboard' },
      { label: 'Live Monitor', path: '/admin/live-monitor', icon: Activity, capability: 'view_live_monitor' },
      { label: 'Jobs', path: '/admin/jobs', icon: Briefcase, capability: 'view_jobs' },
      { label: 'Manual Assignment', path: '/admin/manual-assignment', icon: Send, capability: 'manual_offer' },
    ],
  },
  {
    label: 'USERS',
    items: [
      { label: 'All Users', path: '/admin/users', icon: Users, capability: 'view_users' },
      { label: 'Verification (eKYC)', path: '/admin/verification', icon: ShieldCheck, capability: 'verify_identities' },
    ],
  },
  {
    label: 'FINANCE',
    items: [
      { label: 'Wallets & Transactions', path: '/admin/wallets', icon: Wallet, capability: 'view_finance' },
      { label: 'Refunds & Withdrawals', path: '/admin/refunds-withdrawals', icon: ArrowDownLeft, capability: 'process_refunds' },
    ],
  },
  {
    label: 'SERVICES',
    items: [
      { label: 'Service Categories', path: '/admin/categories', icon: Layers, capability: 'view_services' },
      { label: 'Pricing Rules', path: '/admin/pricing', icon: DollarSign, capability: 'manage_pricing' },
      { label: 'Vouchers', path: '/admin/vouchers', icon: Zap, capability: 'manage_pricing' },
    ],
  },
  {
    label: 'ANALYTICS (ADMIN DATA)',
    items: [
      { label: 'Admin Data Console', path: '/data', icon: BarChart3, capability: 'view_dashboard' },
    ],
  },
  {
    label: 'SYSTEM',
    items: [
      { label: 'Admin Accounts', path: '/admin/accounts', icon: UserCheck, capability: 'manage_admin_accounts' },
      { label: 'Roles & Permissions', path: '/admin/roles', icon: Lock, capability: 'manage_roles' },
      { label: 'App Settings', path: '/admin/settings', icon: Settings, capability: 'manage_admin_accounts' },
      { label: 'Audit Logs', path: '/admin/audit-logs', icon: History, capability: 'view_audit_logs' },
    ],
  },
];

export const AdminSidebar: React.FC = () => {
  const { hasCapability, logout } = useAdminAuth();

  return (
    <aside className="flex h-screen w-[293px] min-w-[293px] flex-col justify-between border-r border-[#1e252d] bg-[#0e1216] text-[#8c96a3]">
      {/* Brand Header */}
      <div className="flex items-center gap-3 border-b border-[#1e252d] px-6 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#fdd506] font-black text-[#0e1216] shadow-sm">
          JF
        </div>
        <div>
          <div className="text-base font-extrabold text-[#e2e5e8] tracking-tight">JobFree</div>
          <div className="text-[11px] font-medium text-[#8c96a3]">Super Admin Console</div>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 space-y-6 overflow-y-auto px-4 py-5 scrollbar-thin scrollbar-thumb-gray-800">
        {navGroups.map((group, idx) => {
          const visibleItems = group.items.filter(
            (item) => !item.capability || hasCapability(item.capability)
          );
          if (visibleItems.length === 0) return null;

          return (
            <div key={idx}>
              <div className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-[#607489]">
                {group.label}
              </div>
              <div className="space-y-1">
                {visibleItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.path === '/admin'}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-[#1e252d] font-semibold text-white border-l-2 border-[#fdd506]'
                            : 'text-[#8c96a3] hover:bg-[#1a2027] hover:text-white'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <Icon className={`h-4 w-4 ${isActive ? 'text-[#fdd506]' : 'text-[#8c96a3]'}`} />
                          <span>{item.label}</span>
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      {/* Footer & Portal Switcher */}
      <div className="border-t border-[#1e252d] p-4 space-y-2">
        <Link
          to="/data"
          className="flex items-center justify-between rounded-lg border border-[#323d49] bg-[#161c22] px-3.5 py-2 text-xs font-bold text-[#e2e5e8] transition hover:border-[#fdd506] hover:text-white"
        >
          <div className="flex items-center gap-2">
            <span>📊</span>
            <span>Admin Data Portal</span>
          </div>
          <span className="text-[10px] text-[#fdd506]">→</span>
        </Link>
        <div className="flex items-center justify-between px-1 text-[10px] text-[#607489]">
          <span>v1.0.0 • © JobFree 2026</span>
          <button
            type="button"
            onClick={logout}
            className="text-red-400 hover:text-red-300 transition-colors"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </aside>
  );
};
