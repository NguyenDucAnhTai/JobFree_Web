import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Search, Bell, LogOut } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { mockUsers } from '../services/mockDb';

const routeTitles: Record<string, string> = {
  '/admin': 'Dashboard Overview',
  '/admin/analytics': 'JobFree Admin Data · Analytics read-only',
  '/admin/data': 'JobFree Admin Data · Analytics read-only',
  '/admin/live-monitor': 'Live Monitor Điều phối',
  '/admin/cases': 'Quản lý Vụ việc (Cases)',
  '/admin/jobs': 'Quản lý Công việc (Jobs)',
  '/admin/manual-offer': 'Điều phối Thủ công (Manual Offer)',
  '/admin/users': 'Quản lý Người dùng (Users)',
  '/admin/verification': 'Phê duyệt Xác minh eKYC',
  '/admin/payments': 'Thanh toán & Đối soát payOS',
  '/admin/payouts': 'Lô Payout Hằng Ngày (21:00)',
  '/admin/refunds': 'Hàng đợi Hoàn tiền Employer',
  '/admin/receivables': 'Quản lý Công nợ',
  '/admin/categories': 'Danh mục Dịch vụ',
  '/admin/pricing': 'Cấu hình Biểu giá theo Giờ',
  '/admin/priority-tiers': 'Cấu hình Gói Ưu tiên',
  '/admin/cancellation-policies': 'Chính sách Hủy Dịch vụ',
  '/admin/accounts': 'Quản trị Tài khoản Nội bộ',
  '/admin/roles': 'Ma trận Quyền & Vai trò (RBAC)',
  '/admin/settings': 'Cấu hình Tham số Hệ thống',
  '/admin/audit-logs': 'Nhật ký Kiểm toán (Audit Logs)',
};

export const AdminHeader: React.FC = () => {
  const { user, loginAs, logout } = useAdminAuth();
  const location = useLocation();

  const title = routeTitles[location.pathname] || 'Admin Console';
  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .slice(-2)
        .join('')
        .toUpperCase()
    : 'AD';

  return (
    <header className="flex h-[72px] items-center justify-between border-b border-[#e1e5ea] bg-white px-8 shadow-sm">
      {/* Title */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-[#0e1216]">{title}</h1>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-6">
        {/* Search Input matching Penpot */}
        <div className="relative hidden w-80 md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5d646c]" />
          <input
            type="text"
            placeholder="Tìm kiếm user, job, transaction…"
            className="w-full h-9 rounded-lg border border-[#e1e5ea] bg-[#f5f7f9] py-2 pl-9 pr-4 text-xs text-[#0e1216] placeholder-[#5d646c] outline-none transition focus:border-[#0e1216] focus:bg-white"
          />
        </div>

        {/* Switch to Admin Data Portal Quick Button */}
        <Link
          to="/data"
          className="flex items-center gap-1.5 rounded-lg border border-[#fdd506] bg-[#fef9c3] px-3 py-1.5 text-xs font-bold text-[#854d0e] transition hover:bg-[#fde047]"
        >
          <span>📊</span>
          <span>Mở Admin Data</span>
        </Link>

        {/* Notifications */}
        <button
          type="button"
          aria-label="Thông báo hệ thống"
          className="relative rounded-lg p-2 text-[#5d646c] transition hover:bg-[#f5f7f9] hover:text-[#0e1216]"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#e23532]" />
        </button>

        {/* Role Switcher for Testing */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-[#5d646c]">Đổi vai trò:</span>
          <select
            value={user?.email || ''}
            onChange={(e) => loginAs(e.target.value)}
            className="rounded-lg border border-[#e1e5ea] bg-[#f5f7f9] px-2.5 py-1.5 text-xs font-semibold text-[#0e1216] outline-none transition hover:bg-white focus:border-[#0e1216]"
          >
            {mockUsers.map((u) => (
              <option key={u.id} value={u.email}>
                {u.role.toUpperCase()} - {u.name}
              </option>
            ))}
          </select>
        </div>

        {/* User Profile matching Penpot */}
        <div className="flex items-center gap-3 border-l border-[#e1e5ea] pl-6">
          <div className="text-right">
            <div className="text-sm font-bold text-[#0e1216]">{user?.name}</div>
            <div className="mt-0.5 inline-block rounded bg-[#fdd506] px-2 py-0.5 text-[10px] font-extrabold uppercase text-[#0e1216]">
              {user?.role.replace('_', ' ')}
            </div>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0e1216] font-extrabold text-[#f5f7f9]">
            {initials}
          </div>

          {/* Logout Button */}
          <button
            type="button"
            onClick={logout}
            title="Đăng xuất khỏi Admin Console"
            className="rounded-lg p-2 text-[#5d646c] transition hover:bg-red-50 hover:text-red-600 ml-1"
            aria-label="Đăng xuất"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

