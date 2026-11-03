import React, { useState } from 'react';
import { Search, Filter, Plus, Eye } from 'lucide-react';
import type { CaseType, CaseStatus } from '../../types';
import { CaseDetailDrawer } from './CaseDetailDrawer';

interface CaseItem {
  id: string;
  type: CaseType;
  title: string;
  status: CaseStatus;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  assignee?: string;
  jobId?: string;
}

const mockCases: CaseItem[] = [
  {
    id: 'CASE-1029',
    type: 'cash_payment_dispute',
    title: 'Employer báo đã trả tiền mặt nhưng Worker chưa xác nhận',
    status: 'assigned',
    priority: 'urgent',
    createdAt: '2026-10-08 14:15',
    assignee: 'Staff Anna',
    jobId: 'J10251',
  },
  {
    id: 'CASE-1030',
    type: 'check_in_review',
    title: 'Check-in ngoại lệ: GPS lệch 350m do nhà trong hẻm sâu',
    status: 'open',
    priority: 'high',
    createdAt: '2026-10-08 14:40',
    jobId: 'J10250',
  },
  {
    id: 'CASE-1031',
    type: 'employer_non_payment',
    title: 'Employer cố ý không trả tiền mặt sau ca làm hoàn thành',
    status: 'action_pending',
    priority: 'urgent',
    createdAt: '2026-10-08 11:20',
    assignee: 'Staff Hoàng',
    jobId: 'J10245',
  },
  {
    id: 'CASE-1032',
    type: 'verification_review',
    title: 'eKYC review: Mặt sau CCCD bị chói sáng, cần xác minh lại',
    status: 'awaiting_evidence',
    priority: 'medium',
    createdAt: '2026-10-08 09:30',
    assignee: 'Staff Minh',
  },
  {
    id: 'CASE-1033',
    type: 'block_appeal',
    title: 'Kháng nghị lệnh khóa tài khoản Employer (DEC-093)',
    status: 'escalated',
    priority: 'high',
    createdAt: '2026-10-07 16:00',
    assignee: 'Admin System',
  },
  {
    id: 'CASE-1034',
    type: 'no_show_appeal',
    title: 'Worker kháng nghị lỗi no-show do tai nạn bất khả kháng',
    status: 'resolved',
    priority: 'medium',
    createdAt: '2026-10-07 10:15',
    assignee: 'Staff Anna',
  },
];

const statusStyles: Record<CaseStatus, { bg: string; text: string; label: string }> = {
  open: { bg: 'bg-[#e0f2fe]', text: 'text-[#0284c7]', label: 'Mới mở' },
  assigned: { bg: 'bg-[#fef3c7]', text: 'text-[#b45309]', label: 'Đang xử lý' },
  awaiting_evidence: { bg: 'bg-[#f3e8ff]', text: 'text-[#7e22ce]', label: 'Chờ bằng chứng' },
  escalated: { bg: 'bg-[#fee2e2]', text: 'text-[#e23532]', label: 'Chuyển cấp duyệt' },
  action_pending: { bg: 'bg-[#ffedd5]', text: 'text-[#c2410c]', label: 'Chờ ghi nhận DB' },
  resolved: { bg: 'bg-[#e6f9ee]', text: 'text-[#16a34a]', label: 'Đã giải quyết' },
  dismissed: { bg: 'bg-[#eff2f5]', text: 'text-[#5d646c]', label: 'Đã bác bỏ' },
};

const caseTypeLabels: Record<CaseType, string> = {
  support: 'Hỗ trợ chung',
  verification_review: 'Review eKYC',
  check_in_review: 'Check-in ngoại lệ',
  incident: 'Sự cố ca làm',
  no_show_appeal: 'Kháng nghị No-show',
  completion_confirmation: 'Xác nhận hoàn tất',
  cash_payment_dispute: 'Tranh chấp tiền mặt',
  employer_non_payment: 'Employer quỵt tiền',
  block_appeal: 'Kháng nghị khóa TK',
  worker_receivable: 'Công nợ Worker',
  payment_reconciliation: 'Đối soát payOS',
  payout_exception: 'Ngoại lệ Payout',
  financial_exception: 'Ngoại lệ tài chính',
  identity_security: 'An ninh danh tính',
};

export const CasesListPage: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<CaseItem | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = mockCases.filter((c) => {
    if (filterType !== 'all' && c.type !== filterType) return false;
    if (filterStatus !== 'all' && c.status !== filterStatus) return false;
    if (searchQuery && !c.id.toLowerCase().includes(searchQuery.toLowerCase()) && !c.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Info Banner */}
      <div className="flex flex-col gap-4 rounded-xl border border-[#e1e5ea] bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#0e1216]">Hàng đợi Vụ việc (14 Loại Case • 7 Trạng thái)</h2>
          <p className="mt-1 text-xs text-[#5d646c]">
            Tuân thủ DEC-098 & DEC-099: Case chỉ chuyển sang `resolved` sau khi Operational DB đã commit và phát event xác nhận.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 rounded-lg bg-[#fdd506] px-4 py-2 text-xs font-bold text-[#0e1216] transition hover:bg-yellow-400">
            <Plus className="h-4 w-4" /> Tạo Case Nội Bộ
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-[#e1e5ea] bg-white p-4 shadow-sm">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5d646c]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo mã case, tiêu đề, mã job..."
            className="w-full rounded-lg border border-[#e1e5ea] bg-[#f5f7f9] py-2 pl-9 pr-3 text-xs text-[#0e1216] placeholder-[#5d646c] outline-none focus:border-[#0e1216] focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-[#5d646c]" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="rounded-lg border border-[#e1e5ea] bg-[#f5f7f9] px-3 py-2 text-xs font-medium text-[#0e1216] outline-none focus:border-[#0e1216]"
          >
            <option value="all">Tất cả loại case (14)</option>
            {Object.entries(caseTypeLabels).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-lg border border-[#e1e5ea] bg-[#f5f7f9] px-3 py-2 text-xs font-medium text-[#0e1216] outline-none focus:border-[#0e1216]"
          >
            <option value="all">Tất cả trạng thái (7)</option>
            {Object.entries(statusStyles).map(([key, { label }]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Cases Table */}
      <div className="overflow-hidden rounded-xl border border-[#e1e5ea] bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[#e1e5ea] bg-[#f5f7f9] text-[11px] font-bold uppercase tracking-wider text-[#5d646c]">
            <tr>
              <th className="py-3 px-4">Mã Case</th>
              <th className="py-3 px-4">Loại vụ việc</th>
              <th className="py-3 px-4">Tiêu đề & Nội dung</th>
              <th className="py-3 px-4">Mã Job</th>
              <th className="py-3 px-4">Người xử lý</th>
              <th className="py-3 px-4">Trạng thái</th>
              <th className="py-3 px-4 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e1e5ea] text-xs">
            {filtered.map((item) => {
              const statusCfg = statusStyles[item.status];
              return (
                <tr key={item.id} className="transition hover:bg-[#f9fafb]">
                  <td className="py-3.5 px-4 font-bold text-[#0e1216]">{item.id}</td>
                  <td className="py-3.5 px-4 font-semibold text-[#0e1216]">
                    {caseTypeLabels[item.type] || item.type}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-[#0e1216]">{item.title}</div>
                    <div className="text-[11px] text-[#5d646c]">{item.createdAt}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[#5d646c]">{item.jobId || '—'}</td>
                  <td className="py-3.5 px-4 text-[#0e1216]">{item.assignee || <span className="text-[#8c96a3]">Chưa nhận</span>}</td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-block rounded px-2 py-0.5 text-[11px] font-bold ${statusCfg.bg} ${statusCfg.text}`}>
                      {statusCfg.label}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedCase(item)}
                      className="inline-flex items-center gap-1 rounded-lg border border-[#e1e5ea] bg-[#f5f7f9] px-2.5 py-1 text-xs font-bold text-[#0e1216] transition hover:bg-[#e7ecf0]"
                    >
                      <Eye className="h-3.5 w-3.5" /> Xem chi tiết
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Case Detail Slide-over Drawer */}
      {selectedCase && (
        <CaseDetailDrawer
          caseItem={selectedCase}
          isOpen={!!selectedCase}
          onClose={() => setSelectedCase(null)}
        />
      )}
    </div>
  );
};
