import React, { useState } from 'react';
import { Zap, Search } from 'lucide-react';

export const PayOSRealtimeView: React.FC = () => {
  const [selectedTxn, setSelectedTxn] = useState<any | null>(null);

  const transactions = [
    { id: 'TXN100000', order: 'JF0466500', job: 'JOB20000', employer: 'Hoàng Khánh Vy', amount: '904.177 ₫', method: 'ATM', status: 'Refunded', created: '17:40:46', paid: '17:41:04', webhook: 'Received' },
    { id: 'TXN100001', order: 'JF0466501', job: 'JOB20001', employer: 'Phạm Quốc Việt', amount: '583.650 ₫', method: 'ATM', status: 'Refunded', created: '17:35:46', paid: '17:36:33', webhook: 'Received' },
    { id: 'TXN100002', order: 'JF0466502', job: 'JOB20002', employer: 'Đặng Thành Long', amount: '435.552 ₫', method: 'VISA', status: 'Success', created: '17:31:46', paid: '17:32:24', webhook: 'Received' },
    { id: 'TXN100003', order: 'JF0466503', job: 'JOB20003', employer: 'Bùi Tuấn Kiệt', amount: '708.150 ₫', method: 'VISA', status: 'Pending', created: '17:26:46', paid: '—', webhook: 'Pending' },
    { id: 'TXN100004', order: 'JF0466504', job: 'JOB20004', employer: 'Lê Hoàng Nam', amount: '850.519 ₫', method: 'Wallet', status: 'Success', created: '17:21:46', paid: '17:22:15', webhook: 'Received' },
    { id: 'TXN100005', order: 'JF0466505', job: 'JOB20005', employer: 'Nguyễn Minh Anh', amount: '350.000 ₫', method: 'QR', status: 'Success', created: '17:15:20', paid: '17:15:45', webhook: 'Received' },
    { id: 'TXN100006', order: 'JF0466506', job: 'JOB20006', employer: 'Trần Thu Hà', amount: '480.000 ₫', method: 'ATM', status: 'Failed', created: '17:08:12', paid: '—', webhook: 'Received' },
    { id: 'TXN100007', order: 'JF0466507', job: 'JOB20007', employer: 'Vũ Mai Linh', amount: '620.000 ₫', method: 'QR', status: 'Success', created: '17:01:05', paid: '17:01:30', webhook: 'Received' },
  ];

  return (
    <div className="space-y-6">
      {/* PayOS Connection Status Banner matching Penpot */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e6f9ee] text-[#16a34a]">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[#0e1216]">PayOS Live Connection</span>
              <span className="flex items-center gap-1 rounded-full bg-[#e6f9ee] px-2 py-0.5 text-[11px] font-bold text-[#16a34a]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#16a34a]" /> Connected
              </span>
              <span className="rounded bg-[#f5f7f9] px-2 py-0.5 text-[11px] font-bold text-[#5d646c]">
                Sandbox
              </span>
            </div>
            <p className="text-xs text-[#5d646c]">
              Webhook stream nhận liên tục từ payOS API Gateway
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs text-[#5d646c]">
          <div>
            <span className="block text-[10px] uppercase">Last Event</span>
            <span className="font-mono font-bold text-[#0e1216]">payment.success (17:40:46)</span>
          </div>
          <div>
            <span className="block text-[10px] uppercase">Error Rate</span>
            <span className="font-bold text-[#16a34a]">0.8%</span>
          </div>
          <div>
            <span className="block text-[10px] uppercase">Avg Latency</span>
            <span className="font-bold text-[#0e1216]">1.4s</span>
          </div>
        </div>
      </div>

      {/* Metric Counters matching Penpot Board 25 */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
        <div className="rounded-xl border border-[#e1e5ea] bg-white p-4 text-center shadow-sm">
          <span className="text-[11px] font-semibold text-[#5d646c]">Total Today</span>
          <div className="mt-1 text-xl font-black text-[#0e1216]">28</div>
          <span className="text-[10px] text-[#5d646c]">Giao dịch</span>
        </div>

        <div className="rounded-xl border border-[#e1e5ea] bg-white p-4 text-center shadow-sm">
          <span className="text-[11px] font-semibold text-[#5d646c]">Successful</span>
          <div className="mt-1 text-xl font-black text-[#16a34a]">14</div>
          <span className="text-[10px] text-[#16a34a]">50.0%</span>
        </div>

        <div className="rounded-xl border border-[#e1e5ea] bg-white p-4 text-center shadow-sm">
          <span className="text-[11px] font-semibold text-[#5d646c]">Pending</span>
          <div className="mt-1 text-xl font-black text-[#854d0e]">2</div>
          <span className="text-[10px] text-[#854d0e]">Đang xử lý</span>
        </div>

        <div className="rounded-xl border border-[#e1e5ea] bg-white p-4 text-center shadow-sm">
          <span className="text-[11px] font-semibold text-[#5d646c]">Failed</span>
          <div className="mt-1 text-xl font-black text-[#e23532]">4</div>
          <span className="text-[10px] text-[#e23532]">Thất bại</span>
        </div>

        <div className="rounded-xl border border-[#e1e5ea] bg-white p-4 text-center shadow-sm">
          <span className="text-[11px] font-semibold text-[#5d646c]">Refunded</span>
          <div className="mt-1 text-xl font-black text-[#0284c7]">8</div>
          <span className="text-[10px] text-[#0284c7]">Đã hoàn tiền</span>
        </div>

        <div className="rounded-xl border border-[#e1e5ea] bg-white p-4 text-center shadow-sm">
          <span className="text-[11px] font-semibold text-[#5d646c]">Total Amount</span>
          <div className="mt-1 text-sm font-black text-[#0e1216]">7.308.354 ₫</div>
          <span className="text-[10px] text-[#5d646c]">Hôm nay</span>
        </div>

        <div className="rounded-xl border border-[#e1e5ea] bg-white p-4 text-center shadow-sm">
          <span className="text-[11px] font-semibold text-[#5d646c]">PayOS Fee Est.</span>
          <div className="mt-1 text-sm font-black text-[#5d646c]">80.392 ₫</div>
          <span className="text-[10px] text-[#5d646c]">~1.1%</span>
        </div>
      </div>

      {/* Live PayOS Transaction Stream Table matching Penpot */}
      <div className="overflow-hidden rounded-xl border border-[#e1e5ea] bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-[#e1e5ea] px-6 py-4">
          <div>
            <h2 className="text-sm font-bold text-[#0e1216]">
              Live PayOS Transaction Stream
            </h2>
            <p className="text-xs text-[#5d646c]">28 giao dịch gần nhất ghi nhận qua hệ thống</p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#5d646c]" />
            <input
              type="text"
              placeholder="Lọc mã đơn, người trả…"
              className="w-48 rounded-lg border border-[#e1e5ea] bg-[#f5f7f9] py-1.5 pl-8 pr-3 text-xs text-[#0e1216] outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#e1e5ea] bg-[#f5f7f9] text-[11px] font-bold uppercase tracking-wider text-[#5d646c]">
              <tr>
                <th className="px-4 py-3">Transaction ID</th>
                <th className="px-4 py-3">PayOS Order</th>
                <th className="px-3 py-3">Job</th>
                <th className="px-4 py-3">Employer</th>
                <th className="px-4 py-3 text-right">Amount</th>
                <th className="px-3 py-3 text-center">Method</th>
                <th className="px-3 py-3 text-center">Status</th>
                <th className="px-3 py-3 text-center">Created</th>
                <th className="px-3 py-3 text-center">Paid</th>
                <th className="px-3 py-3 text-center">Webhook</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e1e5ea] font-medium text-[#0e1216]">
              {transactions.map((txn, idx) => (
                <tr key={idx} className="transition hover:bg-[#f5f7f9]">
                  <td className="px-4 py-3 font-mono font-bold text-[#0e1216]">{txn.id}</td>
                  <td className="px-4 py-3 font-mono text-[#5d646c]">{txn.order}</td>
                  <td className="px-3 py-3 font-bold">{txn.job}</td>
                  <td className="px-4 py-3">{txn.employer}</td>
                  <td className="px-4 py-3 text-right font-bold">{txn.amount}</td>
                  <td className="px-3 py-3 text-center">
                    <span className="rounded bg-[#f5f7f9] px-2 py-0.5 text-[11px] font-semibold text-[#0e1216]">
                      {txn.method}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span
                      className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold ${
                        txn.status === 'Success'
                          ? 'bg-[#e6f9ee] text-[#16a34a]'
                          : txn.status === 'Pending'
                          ? 'bg-[#fef9c3] text-[#854d0e]'
                          : txn.status === 'Failed'
                          ? 'bg-[#fee2e2] text-[#e23532]'
                          : 'bg-[#e0f2fe] text-[#0284c7]'
                      }`}
                    >
                      {txn.status}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-center text-[#5d646c]">{txn.created}</td>
                  <td className="px-3 py-3 text-center text-[#5d646c]">{txn.paid}</td>
                  <td className="px-3 py-3 text-center">
                    <span className="text-[10px] font-bold text-[#16a34a]">
                      {txn.webhook}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => setSelectedTxn(txn)}
                      className="rounded bg-[#f5f7f9] px-2.5 py-1 text-[11px] font-bold text-[#0e1216] hover:bg-[#e2e8f0]"
                    >
                      Xem
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer / Modal xem chi tiết giao dịch (Board 26 AD - PayOS Realtime Details) */}
      {selectedTxn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-xl rounded-xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#e1e5ea] pb-3">
              <div>
                <h3 className="text-base font-bold text-[#0e1216]">
                  PayOS Transaction Detail: {selectedTxn.id}
                </h3>
                <p className="text-xs text-[#5d646c]">Mã đơn hàng: {selectedTxn.order}</p>
              </div>
              <button
                onClick={() => setSelectedTxn(null)}
                className="rounded p-1 text-[#5d646c] hover:bg-[#f5f7f9] hover:text-[#0e1216]"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs text-[#0e1216]">
              <div className="grid grid-cols-2 gap-2 rounded-lg bg-[#f5f7f9] p-3">
                <div>
                  <span className="text-[#5d646c]">Công việc liên kết:</span>
                  <div className="font-bold">{selectedTxn.job}</div>
                </div>
                <div>
                  <span className="text-[#5d646c]">Người thanh toán:</span>
                  <div className="font-bold">{selectedTxn.employer}</div>
                </div>
                <div>
                  <span className="text-[#5d646c]">Số tiền thanh toán:</span>
                  <div className="font-bold text-[#16a34a]">{selectedTxn.amount}</div>
                </div>
                <div>
                  <span className="text-[#5d646c]">Phương thức:</span>
                  <div className="font-bold">{selectedTxn.method}</div>
                </div>
              </div>

              <div>
                <span className="font-bold text-[#0e1216]">Raw Webhook Payload (Audit DEC-101):</span>
                <pre className="mt-1 max-h-40 overflow-y-auto rounded-lg bg-[#0e1216] p-3 text-[11px] text-green-400 font-mono">
{JSON.stringify(
  {
    code: '00',
    desc: 'success',
    data: {
      orderCode: selectedTxn.order,
      amount: selectedTxn.amount,
      description: `JobFree Payment ${selectedTxn.job}`,
      accountNumber: '0981234567',
      reference: 'FT26177899120',
      transactionDateTime: '2026-06-25 17:41:04',
      paymentLinkId: 'plink_7719028',
      currency: 'VND',
    },
    signature: '7e9b01c3...verified',
  },
  null,
  2
)}
                </pre>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedTxn(null)}
                className="rounded-lg bg-[#0e1216] px-4 py-2 text-xs font-bold text-white hover:bg-[#1e252d]"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
