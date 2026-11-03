import React, { useState } from 'react';
import { Search, FileText, CheckCircle2, AlertTriangle, ShieldCheck, RefreshCw } from 'lucide-react';

interface TransactionItem {
  id: string;
  payerName: string; // Đối tượng
  type: 'Platform fee' | 'Giữ tiền job' | 'Hoàn tiền';
  amount: number;
  timestamp: string;
  status: 'Success' | 'Pending';
  reconciled: boolean; // Chi tiết đối soát
}

const mockTransactions: TransactionItem[] = [
  {
    id: 'TXN-9901',
    payerName: 'Công ty Cổ phần Alpha',
    type: 'Giữ tiền job',
    amount: 1500000,
    timestamp: '2026-10-08 14:30:00',
    status: 'Success',
    reconciled: true,
  },
  {
    id: 'TXN-9902',
    payerName: 'Hệ thống JobFree',
    type: 'Platform fee',
    amount: 50000,
    timestamp: '2026-10-08 15:00:00',
    status: 'Success',
    reconciled: false,
  },
  {
    id: 'TXN-9903',
    payerName: 'Trần Minh Đức',
    type: 'Hoàn tiền',
    amount: 850000,
    timestamp: '2026-10-08 11:15:00',
    status: 'Pending',
    reconciled: false,
  },
];

export const PaymentsReconciliationPage: React.FC = () => {
  const [transactions, setTransactions] = useState<TransactionItem[]>(mockTransactions);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isReconciling, setIsReconciling] = useState(false);

  const formatVND = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const handleStartReconciliation = () => {
    setIsReconciling(true);
    setTimeout(() => {
      setTransactions((prev) =>
        prev.map((t) => ({ ...t, reconciled: true, status: 'Success' }))
      );
      setIsReconciling(false);
    }, 1000);
  };

  const filteredTransactions = transactions.filter((t) => {
    const matchesFilter =
      filterType === 'all' ||
      (filterType === 'reconciled' && t.reconciled) ||
      (filterType === 'unreconciled' && !t.reconciled);
    const matchesSearch =
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.payerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalRevenue = transactions
    .filter((t) => t.type === 'Platform fee' && t.status === 'Success')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalFundHold = transactions
    .filter((t) => t.type === 'Giữ tiền job' && t.status === 'Success')
    .reduce((sum, t) => sum + t.amount, 0);

  const txTodayCount = transactions.length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col gap-4 rounded-xl border border-[#e1e5ea] bg-[#ffffff] p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-[#0e1216]">Thanh Toán & Đối Soát payOS</h1>
            <span className="rounded-full bg-[#e6f9ee] px-2.5 py-0.5 text-xs font-semibold text-[#16a34a]">
              Cổng payOS Realtime
            </span>
          </div>
          <p className="mt-1 text-sm text-[#5d646c]">
            Quản lý dòng tiền nạp giữ (Fund Holds) theo job và tự động đối soát với sao kê ngân hàng đối tác (DEC-058/077).
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-xl border border-[#e1e5ea] bg-white px-4 py-2 text-xs font-semibold text-[#0e1216] shadow-sm hover:bg-[#f5f7f9]">
            <FileText size={16} className="text-[#5d646c]" />
            Upload Sao Kê
          </button>
          <button
            onClick={handleStartReconciliation}
            disabled={isReconciling}
            className="inline-flex items-center gap-2 rounded-xl bg-[#ffb330] px-4 py-2 text-xs font-semibold text-[#0e1216] shadow-sm hover:bg-[#e5c105] disabled:opacity-50"
          >
            {isReconciling ? (
              <RefreshCw size={16} className="animate-spin text-[#0e1216]" />
            ) : (
              <ShieldCheck size={16} className="text-[#0e1216]" />
            )}
            Bắt Đầu Đối Soát Tự Động
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-[#e1e5ea] bg-[#ffffff] p-5 shadow-sm">
          <div className="text-xs font-medium text-[#5d646c]">Tổng doanh thu sàn</div>
          <div className="mt-2 text-2xl font-bold text-[#16a34a]">{formatVND(totalRevenue)}</div>
          <div className="mt-1 text-xs text-[#5d646c]">Phí nền tảng đã thu</div>
        </div>
        <div className="rounded-xl border border-[#e1e5ea] bg-[#ffffff] p-5 shadow-sm">
          <div className="text-xs font-medium text-[#5d646c]">Giao dịch hôm nay</div>
          <div className="mt-2 text-2xl font-bold text-[#0e1216]">{txTodayCount}</div>
          <div className="mt-1 text-xs text-[#5d646c]">Tất cả giao dịch qua payOS</div>
        </div>
        <div className="rounded-xl border border-[#e1e5ea] bg-[#ffffff] p-5 shadow-sm">
          <div className="text-xs font-medium text-[#5d646c]">Tiền đang giữ theo job (Held Funds)</div>
          <div className="mt-2 text-2xl font-bold text-[#ffb330]">{formatVND(totalFundHold)}</div>
          <div className="mt-1 text-xs text-[#5d646c]">Tạm giữ cho các ca làm việc đang chạy</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col gap-4 rounded-xl border border-[#e1e5ea] bg-[#ffffff] p-4 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: 'Tất cả GD' },
            { id: 'unreconciled', label: 'Chưa đối soát' },
            { id: 'reconciled', label: 'Đã đối soát' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilterType(f.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                filterType === f.id
                  ? 'bg-[#0e1216] text-[#ffb330]'
                  : 'bg-[#f5f7f9] text-[#5d646c] hover:bg-[#e1e5ea] hover:text-[#0e1216]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="relative min-w-[260px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8c96a3]" size={16} />
          <input
            type="text"
            placeholder="Tìm theo mã GD, người nạp..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-[#e1e5ea] bg-[#f5f7f9] py-1.5 pl-9 pr-3 text-xs text-[#0e1216] placeholder-[#8c96a3] focus:border-[#ffb330] focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-[#e1e5ea] bg-[#ffffff] shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[#e1e5ea] bg-[#f5f7f9] text-xs font-semibold text-[#5d646c]">
              <tr>
                <th className="px-5 py-3.5">Mã giao dịch payOS (TXN)</th>
                <th className="px-5 py-3.5">Đối tượng</th>
                <th className="px-5 py-3.5">Loại giao dịch</th>
                <th className="px-5 py-3.5">Số tiền (₫)</th>
                <th className="px-5 py-3.5">Thời gian</th>
                <th className="px-5 py-3.5">Trạng thái</th>
                <th className="px-5 py-3.5">Chi tiết đối soát</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e1e5ea]">
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="transition-colors hover:bg-[#f5f7f9]">
                  <td className="px-5 py-4 font-mono text-xs font-semibold text-[#0e1216]">
                    {tx.id}
                  </td>
                  <td className="px-5 py-4 font-medium text-[#0e1216]">
                    {tx.payerName}
                  </td>
                  <td className="px-5 py-4 text-[#5d646c]">
                    {tx.type}
                  </td>
                  <td className="px-5 py-4 font-semibold text-[#0e1216]">
                    {formatVND(tx.amount)}
                  </td>
                  <td className="px-5 py-4 text-xs text-[#5d646c]">
                    {tx.timestamp}
                  </td>
                  <td className="px-5 py-4">
                    {tx.status === 'Success' ? (
                      <span className="rounded bg-[#e6f9ee] px-2 py-0.5 font-bold text-[#16a34a]">Success</span>
                    ) : (
                      <span className="rounded bg-[#fff8e6] px-2 py-0.5 font-bold text-[#ffb330]">Pending</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    {tx.reconciled ? (
                      <span className="inline-flex items-center gap-1 rounded bg-[#e6f9ee] px-2 py-0.5 font-bold text-[#16a34a]">
                        <CheckCircle2 size={12} /> Đã đối soát
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded bg-[#ffebe6] px-2 py-0.5 font-bold text-[#ff383c]">
                        <AlertTriangle size={12} /> Chưa đối soát
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
