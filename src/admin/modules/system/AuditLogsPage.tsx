import { useState } from 'react';
import { Download, Filter, CheckCircle2, XCircle } from 'lucide-react';

interface AuditLogItem {
  id: string;
  timestamp: string;
  adminName: string;
  role: string;
  action: string;
  target: string;
  ip: string;
  result: 'Success' | 'Failed';
}

const mockAuditLogs: AuditLogItem[] = [
  {
    id: 'LOG-001',
    timestamp: '2026-06-24 09:15',
    adminName: 'Phan Quốc Việt',
    role: 'Super Admin',
    action: 'Approved worker verification',
    target: 'Worker U002',
    ip: '118.69.21.4',
    result: 'Success',
  },
  {
    id: 'LOG-002',
    timestamp: '2026-06-24 09:05',
    adminName: 'Nguyễn Hà My',
    role: 'Operation Admin',
    action: 'Reassigned job',
    target: 'Job J10247',
    ip: '118.69.21.18',
    result: 'Success',
  },
  {
    id: 'LOG-003',
    timestamp: '2026-06-24 08:50',
    adminName: 'Đỗ Thanh Tùng',
    role: 'Finance Admin',
    action: 'Approved refund',
    target: 'Refund RF1199',
    ip: '118.69.21.22',
    result: 'Success',
  },
  {
    id: 'LOG-004',
    timestamp: '2026-06-24 08:20',
    adminName: 'Phan Quốc Việt',
    role: 'Super Admin',
    action: 'Changed pricing rule',
    target: 'Phụ kho',
    ip: '118.69.21.4',
    result: 'Success',
  },
  {
    id: 'LOG-005',
    timestamp: '2026-06-23 21:30',
    adminName: 'Phan Quốc Việt',
    role: 'Super Admin',
    action: 'Disabled admin account',
    target: 'Trần Bảo Quân',
    ip: '118.69.21.4',
    result: 'Success',
  },
  {
    id: 'LOG-006',
    timestamp: '2026-06-23 19:10',
    adminName: 'Lê Minh Châu',
    role: 'Customer Support',
    action: 'Suspended worker account',
    target: 'Worker U007',
    ip: '118.69.21.30',
    result: 'Success',
  },
  {
    id: 'LOG-007',
    timestamp: '2026-06-23 17:00',
    adminName: 'Nguyễn Hà My',
    role: 'Operation Admin',
    action: 'Created voucher',
    target: 'WORKERBONUS50',
    ip: '118.69.21.18',
    result: 'Success',
  },
  {
    id: 'LOG-008',
    timestamp: '2026-06-23 11:20',
    adminName: 'Phan Quốc Việt',
    role: 'Super Admin',
    action: 'Login attempt',
    target: 'Admin Portal',
    ip: '118.69.21.4',
    result: 'Failed',
  },
];

export function AuditLogsPage() {
  const [logs] = useState(mockAuditLogs);
  const [selectedAdmin, setSelectedAdmin] = useState('all');
  const [selectedAction, setSelectedAction] = useState('all');
  const [selectedResult, setSelectedResult] = useState('all');

  const filteredLogs = logs.filter((log) => {
    if (selectedAdmin !== 'all' && log.adminName !== selectedAdmin) return false;
    if (selectedAction !== 'all' && log.action !== selectedAction) return false;
    if (selectedResult !== 'all' && log.result !== selectedResult) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col gap-4 rounded-xl border border-[#e1e5ea] bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#0e1216]">Audit Logs</h2>
          <p className="mt-1 text-xs text-[#5d646c]">
            Nhật ký an ninh & truy vết toàn bộ thao tác của đội ngũ quản trị trên hệ thống
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-lg border border-[#e1e5ea] bg-white px-4 py-2 text-xs font-bold text-[#0e1216] shadow-xs hover:bg-[#f5f7f9] transition-colors">
          <Download className="h-4 w-4" />
          <span>Xuất báo cáo</span>
        </button>
      </div>

      {/* Filters Toolbar */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-[#e1e5ea] bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-[#5d646c]" />
          <select 
            value={selectedAdmin} 
            onChange={(e) => setSelectedAdmin(e.target.value)}
            className="rounded-lg border border-[#e1e5ea] bg-[#f9fafb] px-3 py-2 text-xs font-medium text-[#0e1216] outline-none"
          >
            <option value="all">Tất cả admin</option>
            <option value="Phan Quốc Việt">Phan Quốc Việt</option>
            <option value="Nguyễn Hà My">Nguyễn Hà My</option>
            <option value="Đỗ Thanh Tùng">Đỗ Thanh Tùng</option>
            <option value="Lê Minh Châu">Lê Minh Châu</option>
          </select>
        </div>

        <select 
          value={selectedAction}
          onChange={(e) => setSelectedAction(e.target.value)}
          className="rounded-lg border border-[#e1e5ea] bg-[#f9fafb] px-3 py-2 text-xs font-medium text-[#0e1216] outline-none"
        >
          <option value="all">Tất cả action</option>
          <option value="Approved worker verification">Approved worker verification</option>
          <option value="Reassigned job">Reassigned job</option>
          <option value="Approved refund">Approved refund</option>
          <option value="Changed pricing rule">Changed pricing rule</option>
          <option value="Disabled admin account">Disabled admin account</option>
          <option value="Suspended worker account">Suspended worker account</option>
          <option value="Created voucher">Created voucher</option>
          <option value="Login attempt">Login attempt</option>
        </select>

        <div className="flex items-center gap-2 text-xs text-[#5d646c]">
          <input 
            type="date" 
            defaultValue="2026-06-23" 
            className="rounded-lg border border-[#e1e5ea] bg-[#f9fafb] px-2.5 py-1.5 text-xs text-[#0e1216] outline-none" 
          />
          <span>đến</span>
          <input 
            type="date" 
            defaultValue="2026-06-24" 
            className="rounded-lg border border-[#e1e5ea] bg-[#f9fafb] px-2.5 py-1.5 text-xs text-[#0e1216] outline-none" 
          />
        </div>

        <select 
          value={selectedResult}
          onChange={(e) => setSelectedResult(e.target.value)}
          className="rounded-lg border border-[#e1e5ea] bg-[#f9fafb] px-3 py-2 text-xs font-medium text-[#0e1216] outline-none ml-auto"
        >
          <option value="all">Tất cả kết quả</option>
          <option value="Success">Success</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

      {/* Table Card */}
      <div className="rounded-xl border border-[#e1e5ea] bg-white p-6 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#e1e5ea] bg-[#f9fafb] text-[11px] font-extrabold uppercase tracking-wider text-[#5d646c]">
                <th className="py-3 px-4">Thời gian</th>
                <th className="py-3 px-4">Admin</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Đối tượng</th>
                <th className="py-3 px-4">IP</th>
                <th className="py-3 px-4">Kết quả</th>
                <th className="py-3 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e1e5ea]">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="transition-colors hover:bg-[#f9fafb]">
                  <td className="py-3.5 px-4 font-mono text-[#5d646c]">{log.timestamp}</td>
                  <td className="py-3.5 px-4 font-bold text-[#0e1216]">{log.adminName}</td>
                  <td className="py-3.5 px-4">
                    <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-semibold text-[#5d646c]">
                      {log.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-[#0e1216]">{log.action}</td>
                  <td className="py-3.5 px-4 font-semibold text-blue-600">{log.target}</td>
                  <td className="py-3.5 px-4 font-mono text-xs text-[#8c96a3]">{log.ip}</td>
                  <td className="py-3.5 px-4">
                    {log.result === 'Success' ? (
                      <span className="inline-flex items-center gap-1 rounded bg-green-50 px-2 py-0.5 text-xs font-bold text-green-700">
                        <CheckCircle2 className="h-3 w-3" /> Success
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded bg-red-50 px-2 py-0.5 text-xs font-bold text-red-600">
                        <XCircle className="h-3 w-3" /> Failed
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="rounded border border-[#e1e5ea] bg-white px-3 py-1.5 text-xs font-semibold text-[#0e1216] hover:bg-[#f5f7f9] transition-colors">
                      Detail
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
