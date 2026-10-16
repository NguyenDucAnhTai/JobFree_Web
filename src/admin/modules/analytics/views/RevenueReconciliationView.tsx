import React, { useState } from 'react';
import { Search } from 'lucide-react';

export const RevenueReconciliationView: React.FC = () => {
  const [filterTab, setFilterTab] = useState('all');
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* 8 Metric Cards matching Penpot Board 39 */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-[#e1e5ea] bg-white p-4 shadow-sm">
          <span className="text-xs font-semibold text-[#5d646c]">Tổng COD phát sinh</span>
          <div className="mt-1 text-xl font-black text-[#0e1216]">29.101.767 ₫</div>
          <span className="text-[10px] text-[#5d646c]">36 job COD tháng 6</span>
        </div>

        <div className="rounded-xl border border-[#e1e5ea] bg-white p-4 shadow-sm">
          <span className="text-xs font-semibold text-[#5d646c]">COD đã thu</span>
          <div className="mt-1 text-xl font-black text-[#16a34a]">22.427.153 ₫</div>
          <span className="text-[10px] text-[#16a34a]">Worker đã nhận tiền</span>
        </div>

        <div className="rounded-xl border border-[#e1e5ea] bg-white p-4 shadow-sm">
          <span className="text-xs font-semibold text-[#5d646c]">COD đã nộp</span>
          <div className="mt-1 text-xl font-black text-[#0284c7]">17.536.374 ₫</div>
          <span className="text-[10px] text-[#0284c7]">Đã chuyển khoản về cty</span>
        </div>

        <div className="rounded-xl border border-[#e1e5ea] bg-white p-4 shadow-sm">
          <span className="text-xs font-semibold text-[#5d646c]">COD còn thiếu</span>
          <div className="mt-1 text-xl font-black text-[#b45309]">6.674.614 ₫</div>
          <span className="text-[10px] text-[#b45309]">22.9% tổng COD</span>
        </div>

        <div className="rounded-xl border border-[#e1e5ea] bg-white p-4 shadow-sm">
          <span className="text-xs font-semibold text-[#5d646c]">COD đang ký quỹ</span>
          <div className="mt-1 text-xl font-black text-[#0e1216]">4.928.083 ₫</div>
          <span className="text-[10px] text-[#5d646c]">Tiền cọc an toàn</span>
        </div>

        <div className="rounded-xl border border-[#e1e5ea] bg-white p-4 shadow-sm">
          <span className="text-xs font-semibold text-[#5d646c]">COD lệch cần xử lý</span>
          <div className="mt-1 text-xl font-black text-[#e23532]">11.640.001 ₫</div>
          <span className="text-[10px] font-bold text-[#e23532]">Cần kiểm tra lại sao kê</span>
        </div>

        <div className="rounded-xl border border-[#e1e5ea] bg-white p-4 shadow-sm">
          <span className="text-xs font-semibold text-[#5d646c]">Job đã / chưa đối soát</span>
          <div className="mt-1 text-xl font-black text-[#0e1216]">1 / 35</div>
          <span className="text-[10px] text-[#5d646c]">Tỷ lệ đối soát: 2.8%</span>
        </div>

        <div className="rounded-xl border border-[#e1e5ea] bg-white p-4 shadow-sm">
          <span className="text-xs font-semibold text-[#5d646c]">Net COD Settlement</span>
          <div className="mt-1 text-xl font-black text-[#e23532]">-7.681.775 ₫</div>
          <span className="text-[10px] text-[#e23532]">Chênh lệch dòng tiền</span>
        </div>
      </div>

      {/* Filter Tabs matching Penpot */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#e1e5ea] bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
          {[
            { id: 'all', label: 'Tất cả job COD' },
            { id: 'month', label: 'Tháng này' },
            { id: 'unreconciled', label: 'Chưa đối soát (35)' },
            { id: 'discrepancy', label: 'Bị lệch tiền (12)' },
            { id: 'urgent', label: 'Cần xử lý gấp (4)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterTab(tab.id)}
              className={`rounded-lg px-3 py-1.5 transition ${
                filterTab === tab.id
                  ? 'bg-[#0e1216] text-white shadow-sm'
                  : 'bg-[#f5f7f9] text-[#5d646c] hover:bg-[#e2e8f0] hover:text-[#0e1216]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#5d646c]" />
          <input
            type="text"
            placeholder="Tìm Job ID, Worker, Employer…"
            className="w-56 rounded-lg border border-[#e1e5ea] bg-[#f5f7f9] py-1.5 pl-8 pr-3 text-xs text-[#0e1216] outline-none transition focus:border-[#0e1216] focus:bg-white"
          />
        </div>
      </div>

      {/* Bảng đối soát chi tiết matching Penpot Board 39 & 40 */}
      <div className="overflow-hidden rounded-xl border border-[#e1e5ea] bg-white shadow-sm">
        <div className="border-b border-[#e1e5ea] px-6 py-4">
          <h2 className="text-sm font-bold text-[#0e1216]">
            Danh sách giao dịch COD & Đối soát doanh thu
          </h2>
          <p className="text-xs text-[#5d646c]">
            Đối chiếu số tiền thu hộ từ khách hàng và số tiền Worker đã nộp vào tài khoản chuyên dụng
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#e1e5ea] bg-[#f5f7f9] text-[11px] font-bold uppercase tracking-wider text-[#5d646c]">
              <tr>
                <th className="px-4 py-3">Mã Job</th>
                <th className="px-4 py-3">Worker</th>
                <th className="px-4 py-3">Employer</th>
                <th className="px-4 py-3 text-right">COD Thu</th>
                <th className="px-4 py-3 text-right">COD Đã Nộp</th>
                <th className="px-4 py-3 text-right">Chênh lệch</th>
                <th className="px-3 py-3 text-center">Trạng thái</th>
                <th className="px-4 py-3 text-center">Thời gian</th>
                <th className="px-4 py-3 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e1e5ea] font-medium text-[#0e1216]">
              {[
                { job: 'JOB30101', worker: 'Nguyễn Văn Hùng', employer: 'Nguyễn Minh Anh', collected: '450.000 ₫', submitted: '450.000 ₫', diff: '0 ₫', status: 'reconciled', date: '2026-06-25' },
                { job: 'JOB30102', worker: 'Trần Quốc Bảo', employer: 'Trần Thu Hà', collected: '620.000 ₫', submitted: '500.000 ₫', diff: '-120.000 ₫', status: 'discrepancy', date: '2026-06-25' },
                { job: 'JOB30103', worker: 'Lê Thị Hằng', employer: 'Phạm Quốc Việt', collected: '380.000 ₫', submitted: '0 ₫', diff: '-380.000 ₫', status: 'pending', date: '2026-06-25' },
                { job: 'JOB30104', worker: 'Phạm Tuấn Anh', employer: 'Lê Hoàng Nam', collected: '850.000 ₫', submitted: '850.000 ₫', diff: '0 ₫', status: 'reconciled', date: '2026-06-24' },
                { job: 'JOB30105', worker: 'Đặng Hoàng Yến', employer: 'Vũ Mai Linh', collected: '520.000 ₫', submitted: '320.000 ₫', diff: '-200.000 ₫', status: 'discrepancy', date: '2026-06-24' },
                { job: 'JOB30106', worker: 'Vũ Đình Khoa', employer: 'Đặng Thành Long', collected: '400.000 ₫', submitted: '0 ₫', diff: '-400.000 ₫', status: 'pending', date: '2026-06-24' },
                { job: 'JOB30107', worker: 'Ngô Thị Mai', employer: 'Hoàng Khánh Vy', collected: '750.000 ₫', submitted: '750.000 ₫', diff: '0 ₫', status: 'reconciled', date: '2026-06-23' },
                { job: 'JOB30108', worker: 'Hoàng Văn Dũng', employer: 'Bùi Tuấn Kiệt', collected: '900.000 ₫', submitted: '600.000 ₫', diff: '-300.000 ₫', status: 'discrepancy', date: '2026-06-23' },
              ].map((row, idx) => (
                <tr key={idx} className="transition hover:bg-[#f5f7f9]">
                  <td className="px-4 py-3 font-bold text-[#0e1216]">{row.job}</td>
                  <td className="px-4 py-3">{row.worker}</td>
                  <td className="px-4 py-3">{row.employer}</td>
                  <td className="px-4 py-3 text-right font-bold">{row.collected}</td>
                  <td className="px-4 py-3 text-right text-[#0284c7] font-semibold">{row.submitted}</td>
                  <td className={`px-4 py-3 text-right font-bold ${row.diff === '0 ₫' ? 'text-[#16a34a]' : 'text-[#e23532]'}`}>
                    {row.diff}
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span
                      className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold ${
                        row.status === 'reconciled'
                          ? 'bg-[#e6f9ee] text-[#16a34a]'
                          : row.status === 'discrepancy'
                          ? 'bg-[#fee2e2] text-[#e23532]'
                          : 'bg-[#fef9c3] text-[#854d0e]'
                      }`}
                    >
                      {row.status === 'reconciled' ? 'Khớp 100%' : row.status === 'discrepancy' ? 'Lệch tiền' : 'Chờ nộp'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-[#5d646c]">{row.date}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => setSelectedJob(row.job)}
                      className="rounded bg-[#f5f7f9] px-2.5 py-1 text-[11px] font-bold text-[#0e1216] hover:bg-[#e2e8f0]"
                    >
                      Chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal / Drawer Chi tiết đối soát (Board 40 AD - Revenue Management - Detail) */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#e1e5ea] pb-3">
              <h3 className="text-base font-bold text-[#0e1216]">
                Chi tiết đối soát: {selectedJob}
              </h3>
              <button
                onClick={() => setSelectedJob(null)}
                className="rounded p-1 text-[#5d646c] hover:bg-[#f5f7f9] hover:text-[#0e1216]"
              >
                ✕
              </button>
            </div>
            <div className="mt-4 space-y-3 text-xs text-[#0e1216]">
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-[#5d646c]">Mã công việc:</span>
                <span className="font-bold">{selectedJob}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-[#5d646c]">Dịch vụ:</span>
                <span className="font-semibold">Daily Helper - Dọn dẹp ca 3 giờ</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-[#5d646c]">Tiền mặt khách trả (COD):</span>
                <span className="font-bold text-[#16a34a]">450.000 ₫</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-[#5d646c]">Phí nền tảng JobFree (10%):</span>
                <span className="font-bold text-[#0e1216]">45.000 ₫</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-[#5d646c]">Mã giao dịch đối soát ngân hàng:</span>
                <span className="font-mono font-semibold">MB-TRX-20260625-9921</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#5d646c]">Trạng thái kiểm toán:</span>
                <span className="rounded bg-[#e6f9ee] px-2 py-0.5 font-bold text-[#16a34a]">
                  Đã ghi nhận sổ cái bất biến (DEC-058)
                </span>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setSelectedJob(null)}
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
