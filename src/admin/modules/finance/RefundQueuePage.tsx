import React, { useState } from 'react';
import { Timer, CheckCircle2, Clock, AlertCircle, RefreshCw, Search, XCircle } from 'lucide-react';

interface RefundItem {
  id: string;
  jobId: string;
  employerName: string;
  amount: number;
  reason: string;
  timeRemaining: string;
  status: 'eligible' | 'initiated' | 'completed' | 'failed' | 'rejected';
}

const mockRefunds: RefundItem[] = [
  {
    id: 'RF1201',
    jobId: 'J10248',
    employerName: 'Công ty Cổ phần Alpha Logistics',
    amount: 2000000,
    reason: 'Hủy ca hợp lệ trước giờ quy định (DEC-103)',
    timeRemaining: '12h 30m',
    status: 'eligible',
  },
  {
    id: 'RF1202',
    jobId: 'J10249',
    employerName: 'Nguyễn Văn Hùng',
    amount: 500000,
    reason: 'Không tìm thấy Worker sau cửa sổ điều phối',
    timeRemaining: '01h 15m',
    status: 'initiated',
  },
  {
    id: 'RF1203',
    jobId: 'J10250',
    employerName: 'Cửa hàng Tiện lợi Phúc An',
    amount: 750000,
    reason: 'Worker vắng mặt không lý do (No-show)',
    timeRemaining: 'Hết hạn',
    status: 'completed',
  },
  {
    id: 'RF1204',
    jobId: 'J10251',
    employerName: 'Lê Hoàng Nam',
    amount: 350000,
    reason: 'Số tài khoản thụ hưởng không hợp lệ hoặc đã đóng',
    timeRemaining: '00h 25m',
    status: 'failed',
  },
];

export const RefundQueuePage: React.FC = () => {
  const [refunds, setRefunds] = useState<RefundItem[]>(mockRefunds);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [processingId, setProcessingId] = useState<string | null>(null);

  const formatVND = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const getStatusBadge = (status: RefundItem['status']) => {
    switch (status) {
      case 'eligible':
        return (
          <span className="inline-flex items-center gap-1 rounded bg-[#e0f2fe] px-2 py-0.5 text-xs font-bold text-[#0284c7]">
            <Clock size={12} /> Chờ hoàn tiền
          </span>
        );
      case 'initiated':
        return (
          <span className="inline-flex items-center gap-1 rounded bg-[#fff8e6] px-2 py-0.5 text-xs font-bold text-[#ffb330]">
            <RefreshCw size={12} className="animate-spin" /> Đang chuyển ngân
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 rounded bg-[#e6f9ee] px-2 py-0.5 text-xs font-bold text-[#16a34a]">
            <CheckCircle2 size={12} /> Đã hoàn thành
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1 rounded bg-[#ffebe6] px-2 py-0.5 text-xs font-bold text-[#ff383c]">
            <AlertCircle size={12} /> Lỗi chuyển tiền
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 rounded bg-[#f5f7f9] px-2 py-0.5 text-xs font-bold text-[#5d646c]">
            <XCircle size={12} /> Đã từ chối
          </span>
        );
    }
  };

  const handleProcessRefund = (id: string, action: 'approve' | 'reject') => {
    setProcessingId(id);
    setTimeout(() => {
      setRefunds((prev) =>
        prev.map((r) =>
          r.id === id
            ? { ...r, status: action === 'approve' ? 'completed' : 'rejected', timeRemaining: 'Đã xử lý' }
            : r
        )
      );
      setProcessingId(null);
    }, 800);
  };

  const filteredRefunds = refunds.filter((r) => {
    const matchesFilter = filterStatus === 'all' || r.status === filterStatus;
    const matchesSearch =
      r.employerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.jobId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.reason.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalEligibleAmount = refunds
    .filter((r) => r.status === 'eligible' || r.status === 'initiated')
    .reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 rounded-xl border border-[#e1e5ea] bg-[#ffffff] p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-[#0e1216]">Hàng Đợi Hoàn Tiền (Employer Refund Queue)</h1>
            <span className="rounded-full bg-[#e6f9ee] px-2.5 py-0.5 text-xs font-semibold text-[#16a34a]">
              SLA 24 Giờ
            </span>
          </div>
          <p className="mt-1 text-sm text-[#5d646c]">
            Tự động hoàn tiền gốc về tài khoản ngân hàng đã lưu trong 24 giờ sau khi sự kiện hoàn tiền phát sinh (DEC-038/060/086).
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-[#e1e5ea] bg-[#f5f7f9] px-4 py-2 text-right">
            <div className="text-xs text-[#5d646c]">Tổng chờ hoàn (24h)</div>
            <div className="text-lg font-bold text-[#0e1216]">{formatVND(totalEligibleAmount)}</div>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-[#e1e5ea] bg-[#ffffff] p-5 shadow-sm">
          <div className="text-xs font-medium text-[#5d646c]">Chờ hoàn tiền (Eligible)</div>
          <div className="mt-2 text-2xl font-bold text-[#0284c7]">
            {refunds.filter((r) => r.status === 'eligible').length}
          </div>
          <div className="mt-1 text-xs text-[#5d646c]">Cần thực hiện trước deadline 24h</div>
        </div>
        <div className="rounded-xl border border-[#e1e5ea] bg-[#ffffff] p-5 shadow-sm">
          <div className="text-xs font-medium text-[#5d646c]">Đang chuyển ngân (Initiated)</div>
          <div className="mt-2 text-2xl font-bold text-[#ffb330]">
            {refunds.filter((r) => r.status === 'initiated').length}
          </div>
          <div className="mt-1 text-xs text-[#5d646c]">payOS đang gửi lệnh tới NH</div>
        </div>
        <div className="rounded-xl border border-[#e1e5ea] bg-[#ffffff] p-5 shadow-sm">
          <div className="text-xs font-medium text-[#5d646c]">Đã hoàn tất (Completed)</div>
          <div className="mt-2 text-2xl font-bold text-[#16a34a]">
            {refunds.filter((r) => r.status === 'completed').length}
          </div>
          <div className="mt-1 text-xs text-[#5d646c]">Tiền đã về tài khoản Employer</div>
        </div>
        <div className="rounded-xl border border-[#e1e5ea] bg-[#ffffff] p-5 shadow-sm">
          <div className="text-xs font-medium text-[#5d646c]">Thất bại / Lỗi (Failed)</div>
          <div className="mt-2 text-2xl font-bold text-[#ff383c]">
            {refunds.filter((r) => r.status === 'failed').length}
          </div>
          <div className="mt-1 text-xs text-[#5d646c]">Cần đối soát hoặc liên hệ lại</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-4 rounded-xl border border-[#e1e5ea] bg-[#ffffff] p-4 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {['all', 'eligible', 'initiated', 'completed', 'failed'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                filterStatus === st
                  ? 'bg-[#0e1216] text-[#ffb330]'
                  : 'bg-[#f5f7f9] text-[#5d646c] hover:bg-[#e1e5ea] hover:text-[#0e1216]'
              }`}
            >
              {st === 'all'
                ? 'Tất cả'
                : st === 'eligible'
                ? 'Chờ hoàn tiền'
                : st === 'initiated'
                ? 'Đang chuyển'
                : st === 'completed'
                ? 'Hoàn tất'
                : 'Lỗi'}
            </button>
          ))}
        </div>
        <div className="relative min-w-[260px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8c96a3]" size={16} />
          <input
            type="text"
            placeholder="Tìm theo Employer, mã GD..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-[#e1e5ea] bg-[#f5f7f9] py-1.5 pl-9 pr-3 text-xs text-[#0e1216] placeholder-[#8c96a3] focus:border-[#ffb330] focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      {/* Refunds Table */}
      <div className="overflow-hidden rounded-xl border border-[#e1e5ea] bg-[#ffffff] shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[#e1e5ea] bg-[#f5f7f9] text-xs font-semibold text-[#5d646c]">
              <tr>
                <th className="px-5 py-3.5">Request ID</th>
                <th className="px-5 py-3.5">Mã Job</th>
                <th className="px-5 py-3.5">Employer</th>
                <th className="px-5 py-3.5">Số tiền hoàn</th>
                <th className="px-5 py-3.5">Lý do</th>
                <th className="px-5 py-3.5">
                  <div className="flex items-center gap-1">
                    <Timer size={14} />
                    <span>Bộ đếm hạn 24h</span>
                  </div>
                </th>
                <th className="px-5 py-3.5">Trạng thái</th>
                <th className="px-5 py-3.5 text-right">Thao tác Duyệt/Từ chối</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e1e5ea]">
              {filteredRefunds.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-sm text-[#5d646c]">
                    Không có giao dịch hoàn tiền nào phù hợp với bộ lọc.
                  </td>
                </tr>
              ) : (
                filteredRefunds.map((refund) => (
                  <tr key={refund.id} className="transition-colors hover:bg-[#f5f7f9]">
                    <td className="px-5 py-4 font-mono text-xs font-semibold text-[#0e1216]">
                      {refund.id}
                    </td>
                    <td className="px-5 py-4 font-mono text-xs text-[#0e1216]">
                      {refund.jobId}
                    </td>
                    <td className="px-5 py-4 font-medium text-[#0e1216]">
                      {refund.employerName}
                    </td>
                    <td className="px-5 py-4 font-semibold text-[#0e1216]">
                      {formatVND(refund.amount)}
                    </td>
                    <td className="px-5 py-4 text-xs text-[#5d646c]">
                      {refund.reason}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`font-semibold text-xs ${
                          refund.status === 'completed' || refund.status === 'rejected'
                            ? 'text-gray-400'
                            : refund.timeRemaining.startsWith('00h') || refund.timeRemaining.startsWith('01h')
                            ? 'text-red-600 font-bold'
                            : 'text-[#0e1216]'
                        }`}
                      >
                        {refund.timeRemaining}
                      </span>
                    </td>
                    <td className="px-5 py-4">{getStatusBadge(refund.status)}</td>
                    <td className="px-5 py-4 text-right">
                      {refund.status === 'eligible' && (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleProcessRefund(refund.id, 'approve')}
                            disabled={processingId === refund.id}
                            className="inline-flex items-center gap-1 rounded-lg bg-[#ffb330] px-3 py-1.5 text-xs font-semibold text-[#0e1216] shadow-sm hover:bg-[#e5c105] disabled:opacity-50"
                          >
                            {processingId === refund.id ? (
                              <RefreshCw size={12} className="animate-spin" />
                            ) : (
                              <CheckCircle2 size={12} />
                            )}
                            Duyệt
                          </button>
                          <button
                            onClick={() => handleProcessRefund(refund.id, 'reject')}
                            disabled={processingId === refund.id}
                            className="inline-flex items-center gap-1 rounded-lg bg-[#ffebe6] px-3 py-1.5 text-xs font-semibold text-[#ff383c] shadow-sm hover:bg-red-200 disabled:opacity-50"
                          >
                            <XCircle size={12} />
                            Từ chối
                          </button>
                        </div>
                      )}
                      {refund.status === 'failed' && (
                        <button className="rounded-lg border border-[#ff383c] bg-[#ffebe6] px-2.5 py-1 text-xs font-semibold text-[#ff383c] hover:bg-red-200">
                          Xử lý lỗi
                        </button>
                      )}
                      {(refund.status === 'completed' || refund.status === 'rejected') && (
                        <span className="text-xs text-[#8c96a3]">Đã xử lý</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
