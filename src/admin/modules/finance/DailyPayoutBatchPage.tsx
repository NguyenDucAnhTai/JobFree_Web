import React, { useState } from 'react';
import { Play, CheckCircle, ShieldAlert, CreditCard } from 'lucide-react';

interface PayoutItem {
  id: string;
  workerId: string;
  cccdName: string;
  bankAccountName: string;
  bankAccountDetails: string;
  amount: number;
  cccdMatch: boolean;
  status: 'pending' | 'exception' | 'approved';
}

const mockPayouts: PayoutItem[] = [
  {
    id: 'PO-001',
    workerId: 'WK-8901',
    cccdName: 'NGUYỄN VĂN AN',
    bankAccountName: 'NGUYỄN VĂN AN',
    bankAccountDetails: '1903456789011 - Techcombank',
    amount: 1500000,
    cccdMatch: true,
    status: 'pending',
  },
  {
    id: 'PO-002',
    workerId: 'WK-8902',
    cccdName: 'TRẦN THỊ BÌNH',
    bankAccountName: 'TRAN THI BINH',
    bankAccountDetails: '001100223344 - Vietcombank',
    amount: 500000,
    cccdMatch: false,
    status: 'exception',
  },
  {
    id: 'PO-003',
    workerId: 'WK-8903',
    cccdName: 'LÊ HOÀNG NAM',
    bankAccountName: 'LÊ HOÀNG NAM',
    bankAccountDetails: '1029384756 - MBBank',
    amount: 850000,
    cccdMatch: true,
    status: 'pending',
  },
];

export const DailyPayoutBatchPage: React.FC = () => {
  const [payouts, setPayouts] = useState<PayoutItem[]>(mockPayouts);
  const [showExceptionModal, setShowExceptionModal] = useState(false);
  const [selectedException, setSelectedException] = useState<PayoutItem | null>(null);

  const totalAmount = payouts.reduce((sum, p) => sum + p.amount, 0);

  const formatVND = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const handleApproveException = () => {
    if (selectedException) {
      setPayouts((prev) =>
        prev.map((p) => (p.id === selectedException.id ? { ...p, status: 'approved', cccdMatch: true } : p))
      );
    }
    setShowExceptionModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col gap-4 rounded-xl border border-[#e1e5ea] bg-[#ffffff] p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-bold text-[#0e1216]">
            <CreditCard className="h-5 w-5 text-[#ffb330]" /> Lô Payout Hằng Ngày (Worker Payouts)
          </h2>
          <p className="mt-1 text-xs text-[#5d646c]">
            DEC-077 & DEC-105: Chốt danh sách trước 20:00, thực hiện chuyển khoản lúc 21:00 giờ VN. Ngoại lệ cần người duyệt thứ hai (Dual-control).
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-[#ffb330] px-4 py-2 text-xs font-bold text-[#0e1216] shadow-sm hover:bg-[#e5c105]">
          <Play className="h-4 w-4" /> Khởi chạy lô Payout 21:00
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="rounded-xl border border-[#e1e5ea] bg-[#ffffff] p-5 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#5d646c]">Tổng tiền đợt Payout</div>
          <div className="mt-2 text-2xl font-black text-[#0e1216]">
            {formatVND(totalAmount)}
          </div>
        </div>
        <div className="rounded-xl border border-[#e1e5ea] bg-[#ffffff] p-5 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#5d646c]">Số giao dịch thường</div>
          <div className="mt-2 text-2xl font-black text-[#16a34a]">
            {payouts.filter((p) => p.status === 'pending').length} giao dịch
          </div>
        </div>
        <div className="rounded-xl border border-[#e1e5ea] bg-[#ffffff] p-5 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#5d646c]">Giao dịch ngoại lệ</div>
          <div className="mt-2 text-2xl font-black text-[#ff383c]">
            {payouts.filter((p) => p.status === 'exception').length} cần duyệt dual-control
          </div>
        </div>
      </div>

      {/* Payout Table */}
      <div className="overflow-hidden rounded-xl border border-[#e1e5ea] bg-[#ffffff] shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[#e1e5ea] bg-[#f5f7f9] text-[11px] font-bold uppercase tracking-wider text-[#5d646c]">
            <tr>
              <th className="py-3 px-4">Mã Worker</th>
              <th className="py-3 px-4">Tên CCCD</th>
              <th className="py-3 px-4">Tên chủ TK Ngân hàng</th>
              <th className="py-3 px-4">Số TK / Ngân hàng</th>
              <th className="py-3 px-4">Số tiền giải ngân</th>
              <th className="py-3 px-4">Đối soát tên CCCD với tên chủ TK</th>
              <th className="py-3 px-4 text-right">Thao tác (Dual-Control)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e1e5ea] text-xs">
            {payouts.map((item) => (
              <tr key={item.id} className="transition hover:bg-[#f5f7f9]">
                <td className="py-3.5 px-4 font-bold text-[#0e1216]">{item.workerId}</td>
                <td className="py-3.5 px-4 font-bold text-[#0e1216]">{item.cccdName}</td>
                <td className="py-3.5 px-4 font-bold text-[#0e1216]">{item.bankAccountName}</td>
                <td className="py-3.5 px-4 font-mono text-[#5d646c]">{item.bankAccountDetails}</td>
                <td className="py-3.5 px-4 font-bold text-[#0e1216]">
                  {formatVND(item.amount)}
                </td>
                <td className="py-3.5 px-4">
                  {item.cccdMatch ? (
                    <span className="inline-flex items-center gap-1 rounded bg-[#e6f9ee] px-2 py-0.5 text-[10px] font-bold text-[#16a34a]">
                      <CheckCircle className="h-3 w-3" /> Khớp 100%
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded bg-[#ffebe6] px-2 py-0.5 text-[10px] font-bold text-[#ff383c]">
                      <ShieldAlert className="h-3 w-3" /> Lệch tên
                    </span>
                  )}
                </td>
                <td className="py-3.5 px-4 text-right">
                  {item.status === 'exception' ? (
                    <button
                      onClick={() => {
                        setSelectedException(item);
                        setShowExceptionModal(true);
                      }}
                      className="rounded bg-[#ff383c] px-2.5 py-1 text-[11px] font-bold text-white hover:bg-red-700"
                    >
                      Duyệt Dual-Control
                    </button>
                  ) : (
                    <span className="text-[#8c96a3]">Sẵn sàng</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Dual Control Modal */}
      {showExceptionModal && selectedException && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-[480px] rounded-xl border border-[#e1e5ea] bg-white p-6 shadow-2xl">
            <h3 className="text-base font-bold text-[#0e1216]">Xác nhận Ngoại lệ Payout (Người duyệt thứ hai)</h3>
            <p className="mt-1 text-xs text-[#5d646c]">
              DEC-077 / DEC-105: Quy trình phê duyệt 2 người cho ngoại lệ payout (đổi tài khoản, đổi số tiền, chi lại sau lỗi).
            </p>

            <div className="mt-4 space-y-2 rounded-lg bg-[#f5f7f9] p-3 text-xs text-[#0e1216]">
              <div><strong>Mã Worker:</strong> {selectedException.workerId}</div>
              <div><strong>Số tiền:</strong> {formatVND(selectedException.amount)}</div>
              <div><strong>Tên CCCD:</strong> {selectedException.cccdName}</div>
              <div><strong>Tài khoản:</strong> {selectedException.bankAccountDetails} - {selectedException.bankAccountName}</div>
              <div className="text-[#ff383c]"><strong>Lý do ngoại lệ:</strong> Tên chủ tài khoản ngân hàng chưa khớp với CCCD.</div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setShowExceptionModal(false)}
                className="rounded-lg border border-[#e1e5ea] bg-white px-3.5 py-2 text-xs font-bold text-[#0e1216] hover:bg-[#f5f7f9]"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleApproveException}
                className="rounded-lg bg-[#ffb330] px-4 py-2 text-xs font-bold text-[#0e1216] hover:bg-[#e5c105]"
              >
                Chấp thuận giải ngân
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
