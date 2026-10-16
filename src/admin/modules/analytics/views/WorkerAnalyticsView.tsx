import React from 'react';

export const WorkerAnalyticsView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* 4 KPI Cards matching Penpot Board 32 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5d646c]">
              Active workers
            </span>
            <span className="rounded-full bg-[#e6f9ee] px-2 py-0.5 text-xs font-bold text-[#16a34a]">
              +3.2%
            </span>
          </div>
          <div className="mt-3 text-2xl font-black text-[#0e1216]">1.426</div>
          <p className="mt-1 text-[11px] text-[#5d646c]">Thợ đã xác minh eKYC hoạt động</p>
        </div>

        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5d646c]">
              New workers (7d)
            </span>
            <span className="rounded-full bg-[#e6f9ee] px-2 py-0.5 text-xs font-bold text-[#16a34a]">
              +5.8%
            </span>
          </div>
          <div className="mt-3 text-2xl font-black text-[#0e1216]">94</div>
          <p className="mt-1 text-[11px] text-[#5d646c]">Thợ hoàn tất onboarding trong tuần</p>
        </div>

        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5d646c]">
              Avg earnings / worker
            </span>
            <span className="rounded-full bg-[#e0f2fe] px-2 py-0.5 text-xs font-bold text-[#0284c7]">
              +1.4%
            </span>
          </div>
          <div className="mt-3 text-2xl font-black text-[#0e1216]">2.180.000 ₫</div>
          <p className="mt-1 text-[11px] text-[#5d646c]">Thu nhập trung bình mỗi tuần</p>
        </div>

        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5d646c]">
              Acceptance rate
            </span>
            <span className="rounded-full bg-[#e6f9ee] px-2 py-0.5 text-xs font-bold text-[#16a34a]">
              +0.6%
            </span>
          </div>
          <div className="mt-3 text-2xl font-black text-[#16a34a]">91.2%</div>
          <p className="mt-1 text-[11px] text-[#5d646c]">Tỷ lệ nhận ca sau khi nhận offer</p>
        </div>
      </div>

      {/* Bảng Top Workers matching Penpot */}
      <div className="overflow-hidden rounded-xl border border-[#e1e5ea] bg-white shadow-sm">
        <div className="border-b border-[#e1e5ea] px-6 py-4">
          <h2 className="text-sm font-bold text-[#0e1216]">Top Workers (8 Thợ xuất sắc nhất tháng)</h2>
          <p className="text-xs text-[#5d646c]">Xếp hạng theo sản lượng ca hoàn thành và đánh giá của khách hàng</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#e1e5ea] bg-[#f5f7f9] text-[11px] font-bold uppercase tracking-wider text-[#5d646c]">
              <tr>
                <th className="px-4 py-3">Worker</th>
                <th className="px-4 py-3 text-center">Job (30d)</th>
                <th className="px-4 py-3 text-right">Thu nhập giải ngân</th>
                <th className="px-4 py-3 text-center">Đánh giá</th>
                <th className="px-4 py-3 text-center">Đúng giờ (On-time)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e1e5ea] font-medium text-[#0e1216]">
              {[
                { name: 'Nguyễn Văn Hùng', jobs: 46, earnings: '12.880.000 ₫', rating: '4.95 ★', ontime: '98%' },
                { name: 'Trần Quốc Bảo', jobs: 43, earnings: '12.040.000 ₫', rating: '4.90 ★', ontime: '97%' },
                { name: 'Lê Thị Hằng', jobs: 40, earnings: '11.200.000 ₫', rating: '4.85 ★', ontime: '96%' },
                { name: 'Phạm Tuấn Anh', jobs: 37, earnings: '10.360.000 ₫', rating: '4.80 ★', ontime: '95%' },
                { name: 'Đặng Hoàng Yến', jobs: 34, earnings: '9.520.000 ₫', rating: '4.75 ★', ontime: '94%' },
                { name: 'Vũ Đình Khoa', jobs: 31, earnings: '8.680.000 ₫', rating: '4.70 ★', ontime: '93%' },
                { name: 'Ngô Thị Mai', jobs: 28, earnings: '7.840.000 ₫', rating: '4.65 ★', ontime: '92%' },
                { name: 'Hoàng Văn Dũng', jobs: 25, earnings: '7.000.000 ₫', rating: '4.60 ★', ontime: '91%' },
              ].map((w, idx) => (
                <tr key={idx} className="transition hover:bg-[#f5f7f9]">
                  <td className="px-4 py-3 font-bold text-[#0e1216]">{w.name}</td>
                  <td className="px-4 py-3 text-center font-bold">{w.jobs}</td>
                  <td className="px-4 py-3 text-right font-extrabold text-[#16a34a]">{w.earnings}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="rounded bg-[#fef9c3] px-2 py-0.5 text-[11px] font-bold text-[#854d0e]">
                      {w.rating}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center font-bold text-[#0284c7]">{w.ontime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
