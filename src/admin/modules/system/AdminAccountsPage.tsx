import { useState } from 'react';
import { Plus } from 'lucide-react';

interface AdminAccountItem {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Disabled';
  lastLogin: string;
  createdAt: string;
}

const mockAdminAccounts: AdminAccountItem[] = [
  {
    id: 'ADM-001',
    name: 'Phan Quốc Việt',
    email: 'vietpq@jobfree.vn',
    role: 'Super Admin',
    status: 'Active',
    lastLogin: '2026-06-24 08:55',
    createdAt: '2025-01-12',
  },
  {
    id: 'ADM-002',
    name: 'Nguyễn Hà My',
    email: 'hamy@jobfree.vn',
    role: 'Operation Admin',
    status: 'Active',
    lastLogin: '2026-06-24 08:10',
    createdAt: '2025-03-04',
  },
  {
    id: 'ADM-003',
    name: 'Đỗ Thanh Tùng',
    email: 'thanhtung@jobfree.vn',
    role: 'Finance Admin',
    status: 'Active',
    lastLogin: '2026-06-23 17:30',
    createdAt: '2025-05-22',
  },
  {
    id: 'ADM-004',
    name: 'Lê Minh Châu',
    email: 'minhchau@jobfree.vn',
    role: 'Customer Support',
    status: 'Active',
    lastLogin: '2026-06-24 09:00',
    createdAt: '2025-08-18',
  },
  {
    id: 'ADM-005',
    name: 'Trần Bảo Quân',
    email: 'baoquan@jobfree.vn',
    role: 'Admin Data',
    status: 'Disabled',
    lastLogin: '2026-05-30 11:00',
    createdAt: '2025-09-09',
  },
];

export function AdminAccountsPage() {
  const [accounts] = useState(mockAdminAccounts);

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'Super Admin':
        return <span className="rounded bg-yellow-100 text-yellow-800 px-2.5 py-0.5 text-xs font-bold">Super Admin</span>;
      case 'Operation Admin':
        return <span className="rounded bg-blue-100 text-blue-700 px-2.5 py-0.5 text-xs font-bold">Operation Admin</span>;
      case 'Finance Admin':
        return <span className="rounded bg-green-100 text-green-700 px-2.5 py-0.5 text-xs font-bold">Finance Admin</span>;
      case 'Customer Support':
        return <span className="rounded bg-purple-100 text-purple-700 px-2.5 py-0.5 text-xs font-bold">Customer Support</span>;
      case 'Admin Data':
        return <span className="rounded bg-gray-100 text-gray-700 px-2.5 py-0.5 text-xs font-bold">Admin Data</span>;
      default:
        return <span className="rounded bg-gray-100 text-gray-600 px-2.5 py-0.5 text-xs font-bold">{role}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 rounded-xl border border-[#e1e5ea] bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#0e1216]">Admin Accounts</h2>
            <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-[#5d646c]">
              5 tài khoản admin nội bộ
            </span>
          </div>
          <p className="mt-1 text-xs text-[#5d646c]">
            Danh sách nhân sự quản trị được cấp quyền truy cập hệ thống JobFree Admin Portal
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-lg bg-[#0e1216] px-4 py-2.5 text-xs font-bold text-[#fdd506] shadow-xs hover:bg-gray-800 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Mời admin</span>
        </button>
      </div>

      {/* Table Card */}
      <div className="rounded-xl border border-[#e1e5ea] bg-white p-6 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#e1e5ea] bg-[#f9fafb] text-[11px] font-extrabold uppercase tracking-wider text-[#5d646c]">
                <th className="py-3 px-4">Admin</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Lần đăng nhập cuối</th>
                <th className="py-3 px-4">Tạo lúc</th>
                <th className="py-3 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e1e5ea]">
              {accounts.map((acc) => (
                <tr key={acc.id} className="transition-colors hover:bg-[#f9fafb]">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0e1216] text-xs font-bold text-[#fdd506]">
                        {acc.name.split(' ').slice(-1)[0][0]}
                      </div>
                      <span className="font-bold text-sm text-[#0e1216]">{acc.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[#5d646c]">{acc.email}</td>
                  <td className="py-3.5 px-4">{getRoleBadge(acc.role)}</td>
                  <td className="py-3.5 px-4">
                    {acc.status === 'Active' ? (
                      <span className="rounded bg-green-50 px-2 py-0.5 text-xs font-bold text-green-700">
                        Active
                      </span>
                    ) : (
                      <span className="rounded bg-red-50 px-2 py-0.5 text-xs font-bold text-red-600">
                        Disabled
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-[#5d646c]">{acc.lastLogin}</td>
                  <td className="py-3.5 px-4 text-[#8c96a3]">{acc.createdAt}</td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="rounded border border-[#e1e5ea] bg-white px-3 py-1.5 text-xs font-semibold text-[#0e1216] hover:bg-[#f5f7f9] transition-colors">
                      Edit role
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
