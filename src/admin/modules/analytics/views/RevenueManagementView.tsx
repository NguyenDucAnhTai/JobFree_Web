import React, { useState } from 'react';

export const RevenueManagementView: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div className="space-y-6">
      {/* Top Filter Bar matching Penpot */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#e1e5ea] bg-white p-4 shadow-sm">
        {/* Time filters */}
        <div className="flex flex-wrap items-center gap-1.5 rounded-lg bg-[#f5f7f9] p-1 text-xs font-semibold text-[#5d646c]">
          {[
            { id: 'today', label: 'Hôm nay' },
            { id: '7d', label: '7 ngày' },
            { id: 'month', label: 'Tháng này' },
            { id: 'quarter', label: 'Quý này' },
            { id: 'year', label: 'Năm này' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTimeRange(t.id)}
              className={`rounded-md px-3 py-1.5 transition ${
                timeRange === t.id
                  ? 'bg-white font-bold text-[#0e1216] shadow-sm'
                  : 'hover:text-[#0e1216]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Dropdown filters */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <select className="rounded-lg border border-[#e1e5ea] bg-[#f5f7f9] px-3 py-1.5 font-medium text-[#0e1216] outline-none">
            <option>Tất cả dịch vụ</option>
            <option>Daily Helper - Việc nhà</option>
            <option>Phụ kho</option>
            <option>Phụ shop & livestream</option>
          </select>

          <select className="rounded-lg border border-[#e1e5ea] bg-[#f5f7f9] px-3 py-1.5 font-medium text-[#0e1216] outline-none">
            <option>Tất cả quận</option>
            <option>Quận 1</option>
            <option>Quận 3</option>
            <option>Quận 7</option>
            <option>Bình Thạnh</option>
          </select>

          <select className="rounded-lg border border-[#e1e5ea] bg-[#f5f7f9] px-3 py-1.5 font-medium text-[#0e1216] outline-none">
            <option>Mọi priority</option>
            <option>Normal (0₫)</option>
            <option>Nhanh (15.000₫)</option>
            <option>Tức thì (30.000₫)</option>
          </select>
        </div>
      </div>

      {/* 4 Main Revenue Cards matching Penpot AD - Revenu Management */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5d646c]">
              GMV
            </span>
            <span className="rounded-full bg-[#fee2e2] px-2 py-0.5 text-xs font-bold text-[#e23532]">
              -29.0%
            </span>
          </div>
          <div className="mt-3 text-2xl font-black text-[#0e1216]">
            545.685.934 ₫
          </div>
          <p className="mt-1 text-[11px] text-[#5d646c]">Tổng giá trị việc phát sinh</p>
        </div>

        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5d646c]">
              Platform Revenue
            </span>
            <span className="rounded-full bg-[#e6f9ee] px-2 py-0.5 text-xs font-bold text-[#16a34a]">
              +26.1%
            </span>
          </div>
          <div className="mt-3 text-2xl font-black text-[#0e1216]">
            87.309.743 ₫
          </div>
          <p className="mt-1 text-[11px] text-[#5d646c]">Phí nền tảng cố định 10% (DEC-006)</p>
        </div>

        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5d646c]">
              PayOS Amount
            </span>
            <span className="rounded-full bg-[#e0f2fe] px-2 py-0.5 text-xs font-bold text-[#0284c7]">
              +31.9%
            </span>
          </div>
          <div className="mt-3 text-2xl font-black text-[#0e1216]">
            354.695.857 ₫
          </div>
          <p className="mt-1 text-[11px] text-[#5d646c]">Thanh toán qua cổng payOS</p>
        </div>

        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5d646c]">
              Revenue Growth
            </span>
            <span className="rounded-full bg-[#fef9c3] px-2 py-0.5 text-xs font-bold text-[#854d0e]">
              29.0%
            </span>
          </div>
          <div className="mt-3 text-2xl font-black text-[#0e1216]">
            +29.0% MoM
          </div>
          <p className="mt-1 text-[11px] text-[#5d646c]">Tăng trưởng doanh thu thuần</p>
        </div>
      </div>

      {/* 4 Secondary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-[#e1e5ea] bg-white p-4 shadow-sm">
          <span className="text-xs font-semibold text-[#5d646c]">Escrow Amount (Ký quỹ)</span>
          <div className="mt-1 text-lg font-black text-[#0e1216]">98.223.465 ₫</div>
          <span className="text-[10px] font-bold text-[#0284c7]">2.1% GMV</span>
        </div>

        <div className="rounded-xl border border-[#e1e5ea] bg-white p-4 shadow-sm">
          <span className="text-xs font-semibold text-[#5d646c]">Voucher Cost</span>
          <div className="mt-1 text-lg font-black text-[#0e1216]">8.185.286 ₫</div>
          <span className="text-[10px] font-bold text-[#5d646c]">1.2% GMV</span>
        </div>

        <div className="rounded-xl border border-[#e1e5ea] bg-white p-4 shadow-sm">
          <span className="text-xs font-semibold text-[#5d646c]">Refund Amount (Hoàn trả)</span>
          <div className="mt-1 text-lg font-black text-[#e23532]">4.365.484 ₫</div>
          <span className="text-[10px] font-bold text-[#e23532]">0.5% GMV</span>
        </div>

        <div className="rounded-xl border border-[#e1e5ea] bg-white p-4 shadow-sm">
          <span className="text-xs font-semibold text-[#5d646c]">Net Revenue Estimate</span>
          <div className="mt-1 text-lg font-black text-[#16a34a]">68.756.431 ₫</div>
          <span className="text-[10px] font-bold text-[#16a34a]">Sau trừ chi phí</span>
        </div>
      </div>

      {/* Bảng Doanh thu chi tiết theo ngày matching Penpot Board 38 AD - Renenue Management - Sumarize */}
      <div className="overflow-hidden rounded-xl border border-[#e1e5ea] bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-[#e1e5ea] px-6 py-4">
          <div>
            <h2 className="text-sm font-bold text-[#0e1216]">
              Bảng doanh thu (Summarize)
            </h2>
            <p className="text-xs text-[#5d646c]">7 kỳ báo cáo gần nhất · bấm vào dòng để xem chi tiết</p>
          </div>
          <button className="rounded-lg border border-[#e1e5ea] bg-[#f5f7f9] px-3 py-1.5 text-xs font-bold text-[#0e1216] hover:bg-[#e2e8f0]">
            Xuất Excel
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#e1e5ea] bg-[#f5f7f9] text-[11px] font-bold uppercase tracking-wider text-[#5d646c]">
              <tr>
                <th className="px-4 py-3">Period</th>
                <th className="px-3 py-3 text-center">Total</th>
                <th className="px-3 py-3 text-center">Done</th>
                <th className="px-4 py-3 text-right">GMV</th>
                <th className="px-4 py-3 text-right">PayOS</th>
                <th className="px-4 py-3 text-right">COD</th>
                <th className="px-4 py-3 text-right">Commission (10%)</th>
                <th className="px-3 py-3 text-right">Priority Fee</th>
                <th className="px-3 py-3 text-right">Refund</th>
                <th className="px-4 py-3 text-right">Worker Payout</th>
                <th className="px-4 py-3 text-right font-extrabold text-[#0e1216]">Net Revenue</th>
                <th className="px-3 py-3 text-center">Growth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e1e5ea] font-medium text-[#0e1216]">
              {[
                { period: '2026-06-21', total: 252, done: 210, gmv: '91.023.030 ₫', payos: '59.164.970 ₫', cod: '31.858.060 ₫', com: '10.922.763 ₫', priority: '3.640.921 ₫', refund: '728.184 ₫', payout: '80.100.267 ₫', net: '11.468.902 ₫', growth: '0.0%' },
                { period: '2026-06-22', total: 260, done: 208, gmv: '77.955.488 ₫', payos: '50.671.067 ₫', cod: '27.284.421 ₫', com: '9.354.658 ₫', priority: '3.118.219 ₫', refund: '623.643 ₫', payout: '68.600.830 ₫', net: '9.822.392 ₫', growth: '-14.4%' },
                { period: '2026-06-23', total: 212, done: 181, gmv: '78.877.085 ₫', payos: '51.270.105 ₫', cod: '27.606.980 ₫', com: '9.465.250 ₫', priority: '3.155.083 ₫', refund: '631.016 ₫', payout: '69.411.835 ₫', net: '9.938.514 ₫', growth: '+1.2%' },
                { period: '2026-06-24', total: 236, done: 191, gmv: '83.805.070 ₫', payos: '54.473.296 ₫', cod: '29.331.774 ₫', com: '10.056.608 ₫', priority: '3.352.202 ₫', refund: '670.440 ₫', payout: '73.748.462 ₫', net: '10.559.439 ₫', growth: '+6.2%' },
                { period: '2026-06-25', total: 269, done: 219, gmv: '69.095.595 ₫', payos: '44.912.137 ₫', cod: '24.183.458 ₫', com: '8.291.471 ₫', priority: '2.763.823 ₫', refund: '552.764 ₫', payout: '60.804.124 ₫', net: '8.706.046 ₫', growth: '-17.6%' },
                { period: '2026-06-26', total: 240, done: 206, gmv: '80.321.666 ₫', payos: '52.209.083 ₫', cod: '28.112.583 ₫', com: '9.638.599 ₫', priority: '3.212.866 ₫', refund: '642.573 ₫', payout: '70.683.067 ₫', net: '10.120.530 ₫', growth: '+16.2%' },
                { period: '2026-06-27', total: 180, done: 150, gmv: '64.608.000 ₫', payos: '41.995.200 ₫', cod: '22.612.800 ₫', com: '7.752.960 ₫', priority: '2.584.320 ₫', refund: '516.864 ₫', payout: '56.855.040 ₫', net: '8.140.608 ₫', growth: '-19.6%' },
              ].map((row, idx) => (
                <tr key={idx} className="transition hover:bg-[#f5f7f9]">
                  <td className="px-4 py-3 font-bold text-[#0e1216]">{row.period}</td>
                  <td className="px-3 py-3 text-center">{row.total}</td>
                  <td className="px-3 py-3 text-center text-[#16a34a] font-bold">{row.done}</td>
                  <td className="px-4 py-3 text-right font-bold">{row.gmv}</td>
                  <td className="px-4 py-3 text-right text-[#0284c7]">{row.payos}</td>
                  <td className="px-4 py-3 text-right text-[#b45309]">{row.cod}</td>
                  <td className="px-4 py-3 text-right text-[#16a34a]">{row.com}</td>
                  <td className="px-3 py-3 text-right text-[#f59e0b]">{row.priority}</td>
                  <td className="px-3 py-3 text-right text-[#e23532]">{row.refund}</td>
                  <td className="px-4 py-3 text-right">{row.payout}</td>
                  <td className="px-4 py-3 text-right font-black text-[#0e1216]">{row.net}</td>
                  <td className="px-3 py-3 text-center">
                    <span
                      className={`inline-block rounded px-1.5 py-0.5 text-[10px] font-bold ${
                        row.growth.startsWith('+')
                          ? 'bg-[#e6f9ee] text-[#16a34a]'
                          : row.growth === '0.0%'
                          ? 'bg-[#f5f7f9] text-[#5d646c]'
                          : 'bg-[#fee2e2] text-[#e23532]'
                      }`}
                    >
                      {row.growth}
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
