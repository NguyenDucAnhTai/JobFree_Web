import React from 'react';

export const AreaAnalyticsView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* 4 KPI Cards matching Penpot Board 35 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5d646c]">
              Quận active
            </span>
            <span className="rounded-full bg-[#f5f7f9] px-2 py-0.5 text-xs font-bold text-[#5d646c]">
              11 quận
            </span>
          </div>
          <div className="mt-3 text-2xl font-black text-[#0e1216]">11</div>
          <p className="mt-1 text-[11px] text-[#5d646c]">Vùng hoạt động chính tại TP.HCM</p>
        </div>

        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5d646c]">
              Top District GMV
            </span>
            <span className="rounded-full bg-[#e6f9ee] px-2 py-0.5 text-xs font-bold text-[#16a34a]">
              +4.4%
            </span>
          </div>
          <div className="mt-3 text-2xl font-black text-[#0e1216]">240.000.000 ₫</div>
          <p className="mt-1 text-[11px] text-[#5d646c]">Quận 1 giữ vị trí số 1</p>
        </div>

        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5d646c]">
              Avg Jobs / District
            </span>
            <span className="rounded-full bg-[#e0f2fe] px-2 py-0.5 text-xs font-bold text-[#0284c7]">
              +2.1%
            </span>
          </div>
          <div className="mt-3 text-2xl font-black text-[#0e1216]">168</div>
          <p className="mt-1 text-[11px] text-[#5d646c]">Số lượng ca làm trung bình mỗi quận</p>
        </div>

        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5d646c]">
              Coverage
            </span>
            <span className="rounded-full bg-[#e6f9ee] px-2 py-0.5 text-xs font-bold text-[#16a34a]">
              +1.2%
            </span>
          </div>
          <div className="mt-3 text-2xl font-black text-[#16a34a]">92%</div>
          <p className="mt-1 text-[11px] text-[#5d646c]">Độ phủ thợ trên địa bàn</p>
        </div>
      </div>

      {/* Bảng Hoạt động theo quận (11 dòng) matching Penpot */}
      <div className="overflow-hidden rounded-xl border border-[#e1e5ea] bg-white shadow-sm">
        <div className="border-b border-[#e1e5ea] px-6 py-4">
          <h2 className="text-sm font-bold text-[#0e1216]">Hoạt động theo quận (11 địa bàn)</h2>
          <p className="text-xs text-[#5d646c]">Thống kê 30 ngày về việc làm, doanh thu và lực lượng lao động</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#e1e5ea] bg-[#f5f7f9] text-[11px] font-bold uppercase tracking-wider text-[#5d646c]">
              <tr>
                <th className="px-4 py-3">Quận</th>
                <th className="px-4 py-3 text-center">Jobs (30d)</th>
                <th className="px-4 py-3 text-right">GMV (30d)</th>
                <th className="px-4 py-3 text-center">Workers Active</th>
                <th className="px-4 py-3 text-center">Employers Active</th>
                <th className="px-4 py-3 text-center">Fill Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e1e5ea] font-medium text-[#0e1216]">
              {[
                { district: 'Quận 1', jobs: 420, gmv: '151.200.000 ₫', workers: 120, employers: 260, fill: '94%' },
                { district: 'Quận 3', jobs: 398, gmv: '143.280.000 ₫', workers: 114, employers: 248, fill: '93%' },
                { district: 'Quận 4', jobs: 376, gmv: '135.360.000 ₫', workers: 108, employers: 236, fill: '92%' },
                { district: 'Quận 5', jobs: 354, gmv: '127.440.000 ₫', workers: 102, employers: 224, fill: '91%' },
                { district: 'Quận 7', jobs: 332, gmv: '119.520.000 ₫', workers: 96, employers: 212, fill: '90%' },
                { district: 'Quận 10', jobs: 310, gmv: '111.600.000 ₫', workers: 90, employers: 200, fill: '89%' },
                { district: 'Quận Bình Thạnh', jobs: 288, gmv: '103.680.000 ₫', workers: 84, employers: 188, fill: '88%' },
                { district: 'Quận Phú Nhuận', jobs: 266, gmv: '95.760.000 ₫', workers: 78, employers: 176, fill: '87%' },
                { district: 'Quận Tân Bình', jobs: 244, gmv: '87.840.000 ₫', workers: 72, employers: 164, fill: '86%' },
                { district: 'Quận Gò Vấp', jobs: 222, gmv: '79.920.000 ₫', workers: 66, employers: 152, fill: '85%' },
                { district: 'TP. Thủ Đức', jobs: 200, gmv: '72.000.000 ₫', workers: 60, employers: 140, fill: '84%' },
              ].map((row, idx) => (
                <tr key={idx} className="transition hover:bg-[#f5f7f9]">
                  <td className="px-4 py-3 font-bold text-[#0e1216]">{row.district}</td>
                  <td className="px-4 py-3 text-center font-bold">{row.jobs}</td>
                  <td className="px-4 py-3 text-right font-extrabold text-[#16a34a]">{row.gmv}</td>
                  <td className="px-4 py-3 text-center text-[#0284c7] font-semibold">{row.workers}</td>
                  <td className="px-4 py-3 text-center text-[#0e1216] font-semibold">{row.employers}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="rounded bg-[#e6f9ee] px-2 py-0.5 text-[11px] font-bold text-[#16a34a]">
                      {row.fill}
                    </span>
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
