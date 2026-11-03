import React from 'react';
import {
  AlertCircle
} from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string;
  badgeText: string;
  badgeType?: 'gold' | 'red' | 'blue' | 'green';
}

const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  badgeText,
  badgeType = 'gold',
}) => {
  const badgeClasses =
    badgeType === 'red'
      ? 'bg-[#ff383c] text-[#f5f5f5]'
      : badgeType === 'blue'
      ? 'bg-[#e0f2fe] text-[#0284c7]'
      : badgeType === 'green'
      ? 'bg-[#e6f9ee] text-[#16a34a]'
      : 'bg-[#ffb330] text-[#1b150c]';

  return (
    <div className="flex flex-col justify-between rounded-xl border border-[#e1e5ea] bg-[#ffffff] p-5 shadow-sm transition hover:shadow-md">
      <div>
        <span className="text-base font-normal text-[#5d646c]">{label}</span>
      </div>
      <div className="my-2 text-[32px] leading-none font-black text-[#0e1216]">{value}</div>
      <div className="flex items-center gap-1.5 mt-2">
        <span className={`rounded px-2 py-0.5 text-xs font-bold ${badgeClasses}`}>
          {badgeText}
        </span>
      </div>
    </div>
  );
};

export const AdminDashboardPage: React.FC = () => {
  return (
    <div className="max-w-[1112px] mx-auto w-full space-y-6">
      {/* KPI Cards Grid Row 1 */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Total Employers"
          value="1,248"
          badgeText="+ 12 hôm nay"
          badgeType="gold"
        />
        <MetricCard
          label="Total Workers"
          value="3,892"
          badgeText="+ 12 hôm nay"
          badgeType="gold"
        />
        <MetricCard
          label="Active Jobs"
          value="126"
          badgeText="+ 18 hôm nay"
          badgeType="gold"
        />
        <MetricCard
          label="Completed Jobs Today"
          value="318"
          badgeText="-3%"
          badgeType="gold"
        />
      </div>

      {/* KPI Cards Grid Row 2 */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Cancelled Jobs"
          value="42"
          badgeText="-3%"
          badgeType="gold"
        />
        <MetricCard
          label="Open Disputes"
          value="11"
          badgeText="+ 2 dispute"
          badgeType="red"
        />
        <MetricCard
          label="Platform Revenue"
          value="128.500.000₫"
          badgeText="Tháng này"
          badgeType="green"
        />
        <MetricCard
          label="Pending Withdrawals"
          value="36.200.000₫"
          badgeText="6 yêu cầu"
          badgeType="blue"
        />
      </div>

      {/* Urgent Alert Banner */}
      <div className="rounded-xl border border-[#e1e5ea] bg-[#ffffff] p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#fee2e2] text-[#e23532] rounded-lg">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-[#e23532]">5 Instant Jobs Overdue</h3>
            <p className="text-sm text-[#5d646c]">2 ví dụ trễ gần nhất: Trễ 8 phút và Trễ 12 phút</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-[#e23532] text-white text-sm font-bold rounded-lg hover:bg-red-700 transition">
          Xử lý ngay
        </button>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Chart 1 */}
        <div className="rounded-xl border border-[#e1e5ea] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-bold text-[#0e1216]">Jobs over time</h2>
            <select className="rounded-lg border border-[#e1e5ea] bg-[#f5f7f9] px-3 py-1.5 text-xs font-bold text-[#0e1216] outline-none">
              <option>7 ngày qua</option>
            </select>
          </div>
          <div className="h-[200px] flex items-end justify-between gap-2 border-b border-[#e1e5ea] pb-2">
            {[40, 70, 45, 90, 65, 85, 120].map((h, i) => (
              <div key={i} className="w-full bg-[#ffb330] rounded-t-sm transition-all hover:opacity-80" style={{ height: `${(h / 120) * 100}%` }}></div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-[#5d646c] mt-2">
            <span>T2</span><span>T3</span><span>T4</span><span>T5</span><span>T6</span><span>T7</span><span>CN</span>
          </div>
        </div>

        {/* Chart 2 */}
        <div className="rounded-xl border border-[#e1e5ea] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-bold text-[#0e1216]">Revenue over time</h2>
            <select className="rounded-lg border border-[#e1e5ea] bg-[#f5f7f9] px-3 py-1.5 text-xs font-bold text-[#0e1216] outline-none">
              <option>7 ngày qua</option>
            </select>
          </div>
          <div className="h-[200px] flex items-end justify-between gap-2 border-b border-[#e1e5ea] pb-2">
             {[30, 50, 40, 80, 55, 75, 100].map((h, i) => (
              <div key={i} className="w-full bg-[#16a34a] rounded-t-sm transition-all hover:opacity-80" style={{ height: `${(h / 100) * 100}%` }}></div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-[#5d646c] mt-2">
            <span>T2</span><span>T3</span><span>T4</span><span>T5</span><span>T6</span><span>T7</span><span>CN</span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Section */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Left Column: Urgent System Alerts (360px) */}
        <div className="w-full lg:w-[360px] flex flex-col rounded-xl border border-[#e1e5ea] bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-[18px] font-bold text-[#0e1216]">Urgent system alerts</h2>
            <p className="text-[13px] text-[#5d646c]">Cảnh báo cần xử lý ngay</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center rounded-lg bg-[#eff2f5] px-3 py-2.5 h-[44px]">
              <span className="text-xs font-medium text-[#0e1216]">5 job tức thì quá 30 phút chưa có worker</span>
            </div>
            <div className="flex items-center rounded-lg bg-[#eff2f5] px-3 py-2.5 h-[44px]">
              <span className="text-xs font-medium text-[#0e1216]">3 giao dịch rút tiền đang chờ duyệt</span>
            </div>
            <div className="flex items-center rounded-lg bg-[#eff2f5] px-3 py-2.5 h-[44px]">
              <span className="text-xs font-medium text-[#0e1216]">2 worker bị report nhiều lần</span>
            </div>
            <div className="flex items-center rounded-lg bg-[#eff2f5] px-3 py-2.5 h-[44px]">
              <span className="text-xs font-medium text-[#0e1216]">1 khu vực đang thiếu worker (Bình Tân)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Live Jobs & Dispatch Activity Table (736px / flex-1) */}
        <div className="flex-1 rounded-xl border border-[#e1e5ea] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-[#0e1216]">Jobs cần admin xử lý</h2>
            <button className="rounded-lg border border-[#e1e5ea] bg-[#f5f7f9] px-3 py-1.5 text-xs font-bold text-[#0e1216] hover:bg-[#e7ecf0]">
              Xem tất cả
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-[#e1e5ea] bg-[#ffffff] text-[11px] font-bold uppercase tracking-wider text-[#5d646c]">
                <tr>
                  <th className="py-3 px-3">Job</th>
                  <th className="py-3 px-3">Service</th>
                  <th className="py-3 px-3">Employer</th>
                  <th className="py-3 px-3">Priority</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Thời gian</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e1e5ea] text-xs">
                <tr className="hover:bg-[#f9fafb]">
                  <td className="py-3.5 px-3 font-bold text-[#0e1216]">J10246</td>
                  <td className="py-3.5 px-3 text-[#0e1216]">Phụ kho</td>
                  <td className="py-3.5 px-3 text-[#5d646c]">Lê Thanh Hương</td>
                  <td className="py-3.5 px-3">
                    <span className="inline-block rounded bg-[#fee2e2] px-2 py-0.5 text-[10px] font-bold text-[#e23532]">
                      Tức thì
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="inline-block rounded bg-[#e0f2fe] px-2 py-0.5 text-[10px] font-bold text-[#0284c7]">
                      Waiting
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-[#5d646c]">Quá hạn 8 phút</td>
                </tr>

                <tr className="hover:bg-[#f9fafb]">
                  <td className="py-3.5 px-3 font-bold text-[#0e1216]">J10250</td>
                  <td className="py-3.5 px-3 text-[#0e1216]">Phụ shop & livestream</td>
                  <td className="py-3.5 px-3 text-[#5d646c]">Nguyễn Minh Anh</td>
                  <td className="py-3.5 px-3">
                    <span className="inline-block rounded bg-[#eff2f5] px-2 py-0.5 text-[10px] font-bold text-[#5d646c]">
                      Bình thường
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="inline-block rounded bg-[#fee2e2] px-2 py-0.5 text-[10px] font-bold text-[#e23532]">
                      Disputed
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-[#5d646c]">30 phút</td>
                </tr>

                <tr className="hover:bg-[#f9fafb]">
                  <td className="py-3.5 px-3 font-bold text-[#0e1216]">J10252</td>
                  <td className="py-3.5 px-3 text-[#0e1216]">Daily Helper - Việc nhà</td>
                  <td className="py-3.5 px-3 text-[#5d646c]">Trần Hoàng Phúc</td>
                  <td className="py-3.5 px-3">
                    <span className="inline-block rounded bg-[#fef3c7] px-2 py-0.5 text-[10px] font-bold text-[#b45309]">
                      Nhanh
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="inline-block rounded bg-[#e6f9ee] px-2 py-0.5 text-[10px] font-bold text-[#16a34a]">
                      Đã nhận ca
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-[#5d646c]">45 phút</td>
                </tr>

                <tr className="hover:bg-[#f9fafb]">
                  <td className="py-3.5 px-3 font-bold text-[#0e1216]">J10253</td>
                  <td className="py-3.5 px-3 text-[#0e1216]">Setup tiệc tại gia</td>
                  <td className="py-3.5 px-3 text-[#5d646c]">Vũ Thanh Hằng</td>
                  <td className="py-3.5 px-3">
                    <span className="inline-block rounded bg-[#eff2f5] px-2 py-0.5 text-[10px] font-bold text-[#5d646c]">
                      Bình thường
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="inline-block rounded bg-[#e6f9ee] px-2 py-0.5 text-[10px] font-bold text-[#16a34a]">
                      Đã hoàn thành
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-[#5d646c]">1 giờ trước</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
