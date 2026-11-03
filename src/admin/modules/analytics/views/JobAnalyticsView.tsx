import React from 'react';

export const JobAnalyticsView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* 4 KPI Cards matching Penpot Board 28 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5d646c]">
              Total Jobs (7d)
            </span>
            <span className="rounded-full bg-[#e6f9ee] px-2 py-0.5 text-xs font-bold text-[#16a34a]">
              +4.2%
            </span>
          </div>
          <div className="mt-3 text-2xl font-black text-[#0e1216]">1.842</div>
          <p className="mt-1 text-[11px] text-[#5d646c]">Ca làm đăng tải trong 7 ngày</p>
        </div>

        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5d646c]">
              Completed Rate
            </span>
            <span className="rounded-full bg-[#e6f9ee] px-2 py-0.5 text-xs font-bold text-[#16a34a]">
              +1.1%
            </span>
          </div>
          <div className="mt-3 text-2xl font-black text-[#16a34a]">86.2%</div>
          <p className="mt-1 text-[11px] text-[#5d646c]">Tỷ lệ hoàn thành đúng tiến độ</p>
        </div>

        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5d646c]">
              Avg Time-to-Match
            </span>
            <span className="rounded-full bg-[#e6f9ee] px-2 py-0.5 text-xs font-bold text-[#16a34a]">
              -3.4%
            </span>
          </div>
          <div className="mt-3 text-2xl font-black text-[#0e1216]">11 phút</div>
          <p className="mt-1 text-[11px] text-[#5d646c]">Thời gian điều phối trung bình</p>
        </div>

        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5d646c]">
              Avg Job Value
            </span>
            <span className="rounded-full bg-[#e0f2fe] px-2 py-0.5 text-xs font-bold text-[#0284c7]">
              +2.0%
            </span>
          </div>
          <div className="mt-3 text-2xl font-black text-[#0e1216]">385.000 ₫</div>
          <p className="mt-1 text-[11px] text-[#5d646c]">Giá trị trung bình 1 ca làm</p>
        </div>
      </div>

      {/* Bảng Job theo quận (8 dòng) matching Penpot */}
      <div className="overflow-hidden rounded-xl border border-[#e1e5ea] bg-white shadow-sm">
        <div className="border-b border-[#e1e5ea] px-6 py-4">
          <h2 className="text-sm font-bold text-[#0e1216]">Job theo quận (TP.HCM)</h2>
          <p className="text-xs text-[#5d646c]">Thống kê 8 quận có số lượng ca làm cao nhất</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#e1e5ea] bg-[#f5f7f9] text-[11px] font-bold uppercase tracking-wider text-[#5d646c]">
              <tr>
                <th className="px-4 py-3">Quận</th>
                <th className="px-4 py-3 text-center">Tổng job</th>
                <th className="px-4 py-3 text-center">Hoàn thành</th>
                <th className="px-4 py-3 text-center">Hủy</th>
                <th className="px-4 py-3 text-right">GMV</th>
                <th className="px-4 py-3 text-center">Avg Time-to-Match</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e1e5ea] font-medium text-[#0e1216]">
              {[
                { district: 'Quận 1', total: 120, done: 95, cancel: 8, gmv: '43.200.000 ₫', time: '10 phút' },
                { district: 'Quận 3', total: 131, done: 104, cancel: 9, gmv: '47.160.000 ₫', time: '11 phút' },
                { district: 'Quận 4', total: 142, done: 113, cancel: 10, gmv: '51.120.000 ₫', time: '12 phút' },
                { district: 'Quận 5', total: 153, done: 122, cancel: 11, gmv: '55.080.000 ₫', time: '13 phút' },
                { district: 'Quận 7', total: 164, done: 131, cancel: 8, gmv: '59.040.000 ₫', time: '14 phút' },
                { district: 'Quận 10', total: 175, done: 140, cancel: 9, gmv: '63.000.000 ₫', time: '10 phút' },
                { district: 'Quận Bình Thạnh', total: 186, done: 149, cancel: 10, gmv: '66.960.000 ₫', time: '11 phút' },
                { district: 'Quận Phú Nhuận', total: 197, done: 158, cancel: 11, gmv: '70.920.000 ₫', time: '12 phút' },
              ].map((row, idx) => (
                <tr key={idx} className="transition hover:bg-[#f5f7f9]">
                  <td className="px-4 py-3 font-bold text-[#0e1216]">{row.district}</td>
                  <td className="px-4 py-3 text-center font-bold">{row.total}</td>
                  <td className="px-4 py-3 text-center text-[#16a34a] font-bold">{row.done}</td>
                  <td className="px-4 py-3 text-center text-[#e23532]">{row.cancel}</td>
                  <td className="px-4 py-3 text-right font-extrabold">{row.gmv}</td>
                  <td className="px-4 py-3 text-center text-[#5d646c]">{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
