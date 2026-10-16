import { useState } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  RotateCcw, 
  Save, 
  AlertCircle
} from 'lucide-react';

interface RoleItem {
  id: string;
  code: string;
  name: string;
  category: string;
  description: string;
  memberCount: number;
  percentage: number;
  color: string;
}

const mockRoles: RoleItem[] = [
  {
    id: 'super_admin',
    code: 'ROLE_SUPER_ADMIN',
    name: 'Super Admin',
    category: 'Toàn quyền',
    description: 'Hệ thống tối cao',
    memberCount: 3,
    percentage: 11,
    color: '#fdd506',
  },
  {
    id: 'ops_admin',
    code: 'ROLE_OPS_ADMIN',
    name: 'Operation Admin',
    category: 'Vận hành',
    description: 'Điều hành Hiện trường',
    memberCount: 8,
    percentage: 30,
    color: '#3b82f6',
  },
  {
    id: 'finance_admin',
    code: 'ROLE_FINANCE',
    name: 'Finance Admin',
    category: 'Tài chính',
    description: 'Kế toán & Tài chính',
    memberCount: 4,
    percentage: 15,
    color: '#10b981',
  },
  {
    id: 'cs_agent',
    code: 'ROLE_CS_AGENT',
    name: 'Customer Support',
    category: 'Hỗ trợ',
    description: 'Chăm sóc Khách hàng',
    memberCount: 12,
    percentage: 44,
    color: '#8b5cf6',
  },
];

interface PermissionGroup {
  name: string;
  description: string;
  statusBadge: string;
  statusType: 'full' | 'partial' | 'restricted' | 'read_only';
  permissions: {
    title: string;
    description: string;
    actionLabel: string;
    enabled: boolean;
  }[];
}

const mockPermissionGroups: Record<string, PermissionGroup[]> = {
  ops_admin: [
    {
      name: 'Vận hành Công việc (Jobs & Dispatch)',
      description: 'Tra cứu, lọc trạng thái, trích xuất dữ liệu vận hành và can thiệp điều phối',
      statusBadge: 'Được cấp (3/3)',
      statusType: 'full',
      permissions: [
        {
          title: 'Danh sách Công việc (Jobs Master List)',
          description: 'Tra cứu, lọc trạng thái, trích xuất dữ liệu vận hành',
          actionLabel: 'Toàn quyền',
          enabled: true,
        },
        {
          title: 'Gán thợ thủ công (Manual Assign)',
          description: 'Can thiệp gán đơn hoặc mời thợ nhận việc khi hệ thống tự động không ghép được',
          actionLabel: 'Gán trực tiếp',
          enabled: true,
        },
        {
          title: 'Hủy công việc & Bồi hoàn (Cancel Job)',
          description: 'Xử lý tranh chấp, bồi hoàn cọc và thu hồi phí dịch vụ',
          actionLabel: 'Duyệt phạt/hủy',
          enabled: true,
        },
      ],
    },
    {
      name: 'Quản lý Người dùng & eKYC',
      description: 'Duyệt hồ sơ thợ, khóa tài khoản vi phạm, tra cứu profile đối tác',
      statusBadge: 'Cấp một phần (2/3)',
      statusType: 'partial',
      permissions: [
        {
          title: 'Xét duyệt hồ sơ eKYC Worker',
          description: 'Đối chiếu CCCD, selfie xác minh, phê duyệt hoặc yêu cầu bổ sung',
          actionLabel: 'Duyệt hồ sơ',
          enabled: true,
        },
        {
          title: 'Khóa / Cảnh báo tài khoản',
          description: 'Đình chỉ tài khoản vi phạm, gửi cảnh báo vi phạm SLA',
          actionLabel: 'Cảnh báo/Khóa',
          enabled: true,
        },
        {
          title: 'Xóa vĩnh viễn tài khoản',
          description: 'Xóa hoàn toàn dữ liệu PII người dùng khỏi cơ sở dữ liệu',
          actionLabel: 'Bị chặn',
          enabled: false,
        },
      ],
    },
    {
      name: 'Tài chính, Ví & Khuyến mãi',
      description: 'Duyệt lệnh rút tiền, nạp ví ký quỹ, tạo voucher khuyến mãi sàn',
      statusBadge: 'Bị giới hạn (0/2)',
      statusType: 'restricted',
      permissions: [
        {
          title: 'Duyệt rút tiền & Payout hàng loạt',
          description: 'Chỉ dành riêng cho nhóm Finance Admin và Super Admin',
          actionLabel: 'Vô hiệu hóa',
          enabled: false,
        },
        {
          title: 'Quản lý Khuyến mãi & Ngân sách Voucher',
          description: 'Tạo mã voucher, cấu hình ngân sách tài trợ sàn',
          actionLabel: 'Vô hiệu hóa',
          enabled: false,
        },
      ],
    },
    {
      name: 'Cấu hình Hệ thống & Audit Log',
      description: 'Cài đặt tham số vận hành, quản lý ma trận quyền và xem nhật ký audit diff',
      statusBadge: 'Chỉ xem (1/2)',
      statusType: 'read_only',
      permissions: [
        {
          title: 'Tra cứu Audit Logs',
          description: 'Truy vết toàn bộ thao tác của đội ngũ điều phối hiện trường',
          actionLabel: 'Chỉ xem',
          enabled: true,
        },
        {
          title: 'Sửa đổi App Settings & Quyền hạn',
          description: 'Chỉnh sửa cấu hình bán kính ghép, timeout hoặc ma trận vai trò',
          actionLabel: 'Bị chặn',
          enabled: false,
        },
      ],
    },
  ],
};

export function RolesPermissionsPage() {
  const [selectedRoleId, setSelectedRoleId] = useState('ops_admin');
  const [searchTerm, setSearchTerm] = useState('');

  const selectedRole = mockRoles.find((r) => r.id === selectedRoleId) || mockRoles[0];
  const permissionGroups = mockPermissionGroups[selectedRoleId] || mockPermissionGroups['ops_admin'];

  return (
    <div className="space-y-6">
      {/* Breadcrumb & Title */}
      <div className="flex flex-col gap-2 rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#8c96a3]">
            <span>HỆ THỐNG & PHÂN QUYỀN</span>
            <span>/</span>
            <span className="text-[#0e1216] font-bold">VAI TRÒ & PHÂN QUYỀN</span>
          </div>
          <h2 className="mt-1 text-xl font-black text-[#0e1216] tracking-tight">
            Roles & Permissions Management
          </h2>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-[#0e1216] px-4 py-2.5 text-xs font-bold text-[#fdd506] shadow-xs hover:bg-gray-800 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Thêm vai trò mới</span>
        </button>
      </div>

      {/* Top Stat Bar: Phân bổ quyền trên nền tảng */}
      <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#5d646c]" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#5d646c]">
              PHÂN BỔ QUYỀN TRÊN NỀN TẢNG
            </span>
          </div>
          <span className="text-xs font-bold text-[#0e1216]">Tổng cộng: 27 nhân sự quản trị</span>
        </div>

        {/* Multi-segment progress bar */}
        <div className="flex h-3 w-full overflow-hidden rounded-full bg-gray-100">
          <div className="bg-[#fdd506] transition-all" style={{ width: '11%' }} title="Super Admin: 11%" />
          <div className="bg-[#3b82f6] transition-all" style={{ width: '30%' }} title="Operation Admin: 30%" />
          <div className="bg-[#10b981] transition-all" style={{ width: '15%' }} title="Finance Admin: 15%" />
          <div className="bg-[#8b5cf6] transition-all" style={{ width: '44%' }} title="Customer Support: 44%" />
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-6 text-xs text-[#5d646c]">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#fdd506]"></span>
            <span>Super Admin (3 · 11%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#3b82f6]"></span>
            <span>Operation Admin (8 · 30%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#10b981]"></span>
            <span>Finance Admin (4 · 15%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#8b5cf6]"></span>
            <span>Customer Support (12 · 44%)</span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Workbench */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column: Roles list (340px) */}
        <div className="w-full lg:w-[340px] shrink-0 rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-[#0e1216] flex items-center gap-2">
              <span>Danh sách vai trò</span>
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-[#5d646c]">4 SYS_ROLES</span>
            </h3>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm vai trò..." 
              className="w-full rounded-lg border border-[#e1e5ea] bg-[#f9fafb] py-2 pl-8 pr-3 text-xs outline-none focus:border-[#0e1216]"
            />
          </div>

          <div className="space-y-2.5">
            {mockRoles.map((role) => {
              const isSelected = role.id === selectedRoleId;
              return (
                <div
                  key={role.id}
                  onClick={() => setSelectedRoleId(role.id)}
                  className={`cursor-pointer rounded-xl border p-3.5 transition-all ${
                    isSelected 
                      ? 'border-[#0e1216] bg-[#f5f7f9] shadow-xs' 
                      : 'border-[#e1e5ea] hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#0e1216]">{role.name}</span>
                    <span className="text-xs font-semibold text-[#8c96a3]">{role.memberCount} nhân sự</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-xs text-[#5d646c]">
                    <span>{role.description}</span>
                    <span className="font-mono text-[10px] text-gray-400">{role.code}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Permission Matrix for selected role (flex-1) */}
        <div className="flex-1 rounded-xl border border-[#e1e5ea] bg-white p-6 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e1e5ea] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-[#0e1216]">{selectedRole.name}</h3>
                <span className="rounded bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-700">
                  {selectedRole.code}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-[#5d646c]">
                Cấu hình ma trận quyền hạn tác vụ chi tiết cho vai trò {selectedRole.name}
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button className="flex items-center gap-1.5 rounded-lg border border-[#e1e5ea] bg-white px-3.5 py-2 text-xs font-semibold text-[#5d646c] hover:bg-[#f5f7f9] transition-colors">
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Khôi phục mặc định</span>
              </button>
              <button className="flex items-center gap-1.5 rounded-lg bg-[#0e1216] px-4 py-2 text-xs font-bold text-[#fdd506] hover:bg-gray-800 transition-colors shadow-xs">
                <Save className="w-3.5 h-3.5" />
                <span>Áp dụng ma trận</span>
              </button>
            </div>
          </div>

          <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-3 text-xs text-yellow-800 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-yellow-700" />
            <span>
              Thay đổi quyền sẽ có hiệu lực ngay lập tức sau phiên đăng nhập kế tiếp của nhân viên.
            </span>
          </div>

          {/* Groups list */}
          <div className="space-y-5">
            {permissionGroups.map((group, gIdx) => (
              <div key={gIdx} className="rounded-xl border border-[#e1e5ea] bg-[#fcfdfe] p-4.5 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-[#0e1216]">{group.name}</h4>
                    <p className="text-xs text-[#5d646c] mt-0.5">{group.description}</p>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    group.statusType === 'full' ? 'bg-green-100 text-green-700' :
                    group.statusType === 'partial' ? 'bg-blue-100 text-blue-700' :
                    group.statusType === 'read_only' ? 'bg-gray-100 text-gray-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {group.statusBadge}
                  </span>
                </div>

                <div className="divide-y divide-[#e1e5ea] rounded-lg border border-[#e1e5ea] bg-white">
                  {group.permissions.map((perm, pIdx) => (
                    <div key={pIdx} className="flex items-center justify-between p-3.5 text-xs">
                      <div>
                        <div className="font-semibold text-[#0e1216]">{perm.title}</div>
                        <div className="text-[#8c96a3] mt-0.5">{perm.description}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`font-semibold px-2 py-0.5 rounded ${
                          perm.enabled ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {perm.actionLabel}
                        </span>
                        <input 
                          type="checkbox" 
                          checked={perm.enabled} 
                          readOnly 
                          className="h-4 w-4 rounded border-gray-300 text-[#0e1216] focus:ring-[#0e1216]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
