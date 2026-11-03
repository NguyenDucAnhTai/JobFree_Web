import React from 'react';

export const SupplyDemandAnalyticsView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* 4 KPI Cards matching Penpot Board 36 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5d646c]">
              Demand index
            </span>
            <span className="rounded-full bg-[#fef9c3] px-2 py-0.5 text-xs font-bold text-[#854d0e]">
              +3.4%
            </span>
          </div>
          <div className="mt-3 text-2xl font-black text-[#0e1216]">1.24</div>
          <p className="mt-1 text-[11px] text-[#5d646c]">Chỉ số nhu cầu đặt ca làm</p>
        </div>

        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5d646c]">
              Supply index
            </span>
            <span className="rounded-full bg-[#e6f9ee] px-2 py-0.5 text-xs font-bold text-[#16a34a]">
              +1.1%
            </span>
          </div>
          <div className="mt-3 text-2xl font-black text-[#0e1216]">0.96</div>
          <p className="mt-1 text-[11px] text-[#5d646c]">Chỉ số nguồn thợ sẵn sàng</p>
        </div>

        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5d646c]">
              Khu vực thiếu Worker
            </span>
            <span className="rounded-full bg-[#fee2e2] px-2 py-0.5 text-xs font-bold text-[#e23532]">
              Cần cứu trợ
            </span>
          </div>
          <div className="mt-3 text-2xl font-black text-[#e23532]">3 quận</div>
          <p className="mt-1 text-[11px] text-[#5d646c]">Tân Bình, Gò Vấp, Thủ Đức</p>
        </div>

        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5d646c]">
              Khu vực dư Worker
            </span>
            <span className="rounded-full bg-[#e6f9ee] px-2 py-0.5 text-xs font-bold text-[#16a34a]">
              Ổn định
            </span>
          </div>
          <div className="mt-3 text-2xl font-black text-[#16a34a]">1 quận</div>
          <p className="mt-1 text-[11px] text-[#5d646c]">Quận 1 thặng dư nhẹ</p>
        </div>
      </div>

      {/* Bảng Cân bằng cung cầu theo quận matching Penpot */}
      <div className="overflow-hidden rounded-xl border border-[#e1e5ea] bg-white shadow-sm">
        <div className="border-b border-[#e1e5ea] px-6 py-4">
          <h2 className="text-sm font-bold text-[#0e1216]">Cân bằng cung cầu theo quận (11 địa bàn)</h2>
          <p className="text-xs text-[#5d646c]">So sánh số lượng ca làm phát sinh mỗi ngày và lực lượng thợ trực chiến</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#e1e5ea] bg-[#f5f7f9] text-[11px] font-bold uppercase tracking-wider text-[#5d646c]">
              <tr>
                <th className="px-4 py-3">Quận</th>
                <th className="px-4 py-3 text-center">Demand (jobs/ngày)</th>
                <th className="px-4 py-3 text-center">Supply (thợ sẵn sàng)</th>
                <th className="px-4 py-3 text-center">Khoảng lệch (Gap)</th>
                <th className="px-4 py-3 text-center">Trạng thái thị trường</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e1e5ea] font-medium text-[#0e1216]">
              {[
                { district: 'Quận 1', demand: 100, supply: 80, gap: '+20', status: 'Cân bằng' },
                { district: 'Quận 3', demand: 108, supply: 93, gap: '+15', status: 'Cân bằng' },
                { district: 'Quận 4', demand: 116, supply: 106, gap: '+10', status: 'Cân bằng' },
                { district: 'Quận 5', demand: 124, supply: 119, gap: '+5', status: 'Cân bằng' },
                { district: 'Quận 7', demand: 132, supply: 82, gap: '+50', status: 'Thiếu' },
                { district: 'Quận 10', demand: 140, supply: 95, gap: '+45', status: 'Thiếu' },
                { district: 'Quận Bình Thạnh', demand: 148, supply: 108, gap: '+40', status: 'Thiếu' },
                { district: 'Quận Phú Nhuận', demand: 156, supply: 121, gap: '+35', status: 'Thiếu' },
                { district: 'Quận Tân Bình', demand: 164, supply: 84, gap: '+80', status: 'Thiếu' },
                { district: 'Quận Gò Vấp', demand: 172, supply: 97, gap: '+75', status: 'Thiếu' },
                { district: 'TP. Thủ Đức', demand: 180, supply: 110, gap: '+70', status: 'Thiếu' },
              ].map((row, idx) => (
                <tr key={idx} className="transition hover:bg-[#f5f7f9]">
                  <td className="px-4 py-3 font-bold text-[#0e1216]">{row.district}</td>
                  <td className="px-4 py-3 text-center font-bold">{row.demand}</td>
                  <td className="px-4 py-3 text-center text-[#0284c7] font-bold">{row.supply}</td>
                  <td className={`px-4 py-3 text-center font-bold ${row.status === 'Cân bằng' ? 'text-[#16a34a]' : 'text-[#e23532]'}`}>
                    {row.gap}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-block rounded px-2.5 py-0.5 text-[10px] font-bold ${
                        row.status === 'Cân bằng'
                          ? 'bg-[#e6f9ee] text-[#16a34a]'
                          : 'bg-[#fee2e2] text-[#e23532]'
                      }`}
                    >
                      {row.status === 'Cân bằng' ? 'Cân bằng thị trường' : 'Thiếu thợ cục bộ'}
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
