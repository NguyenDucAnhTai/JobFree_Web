import React from 'react';

export const DataOverviewView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* 4 KPI Cards matching Penpot AD - DashBoard */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: GMV hôm nay */}
        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5d646c]">
              GMV hôm nay
            </span>
            <span className="rounded-full bg-[#fef9c3] px-2 py-0.5 text-xs font-bold text-[#854d0e]">
              +46.9%
            </span>
          </div>
          <div className="mt-3 text-2xl font-black text-[#0e1216]">
            80.433.472 ₫
          </div>
          <p className="mt-1 text-[11px] text-[#5d646c]">
            So với trung bình 14 ngày
          </p>
        </div>

        {/* Card 2: Net Revenue (14d) */}
        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5d646c]">
              Net Revenue (14d)
            </span>
            <span className="rounded-full bg-[#e6f9ee] px-2 py-0.5 text-xs font-bold text-[#16a34a]">
              +6.4%
            </span>
          </div>
          <div className="mt-3 text-2xl font-black text-[#0e1216]">
            124.759.227 ₫
          </div>
          <p className="mt-1 text-[11px] text-[#5d646c]">
            Phí sàn 10% + phí ưu tiên
          </p>
        </div>

        {/* Card 3: Tổng job (14d) */}
        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5d646c]">
              Tổng job (14d)
            </span>
            <span className="rounded-full bg-[#e0f2fe] px-2 py-0.5 text-xs font-bold text-[#0284c7]">
              +3.2%
            </span>
          </div>
          <div className="mt-3 text-2xl font-black text-[#0e1216]">
            3.233
          </div>
          <p className="mt-1 text-[11px] text-[#5d646c]">
            2.787 ca hoàn thành
          </p>
        </div>

        {/* Card 4: Active employers */}
        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5d646c]">
              Active employers
            </span>
            <span className="rounded-full bg-[#fef9c3] px-2 py-0.5 text-xs font-bold text-[#854d0e]">
              +4.7%
            </span>
          </div>
          <div className="mt-3 text-2xl font-black text-[#0e1216]">
            2.841
          </div>
          <p className="mt-1 text-[11px] text-[#5d646c]">
            1.426 worker đang hoạt động
          </p>
        </div>
      </div>

      {/* Row 1: Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* GMV vs Net Revenue (14 ngày gần nhất) */}
        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#0e1216]">
                GMV vs Net Revenue (triệu đồng)
              </h2>
              <p className="text-xs text-[#5d646c]">14 ngày gần nhất (06-12 đến 06-25)</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 font-semibold text-[#0e1216]">
                <span className="h-2.5 w-2.5 rounded-sm bg-[#0e1216]" /> GMV
              </span>
              <span className="flex items-center gap-1.5 font-semibold text-[#b45309]">
                <span className="h-2.5 w-2.5 rounded-sm bg-[#fdd506]" /> Net Rev (10%)
              </span>
            </div>
          </div>

          {/* Bar chart mockup matching Penpot D1..D14 */}
          <div className="mt-6 flex h-48 items-end gap-2 border-b border-[#e1e5ea] pb-2">
            {[
              { d: '06-12', gmv: 68, net: 7 },
              { d: '06-13', gmv: 75, net: 8 },
              { d: '06-14', gmv: 82, net: 9 },
              { d: '06-15', gmv: 91, net: 10 },
              { d: '06-16', gmv: 70, net: 7.5 },
              { d: '06-17', gmv: 84, net: 9 },
              { d: '06-18', gmv: 78, net: 8.2 },
              { d: '06-19', gmv: 86, net: 9.1 },
              { d: '06-20', gmv: 95, net: 10.2 },
              { d: '06-21', gmv: 91, net: 9.8 },
              { d: '06-22', gmv: 78, net: 8.5 },
              { d: '06-23', gmv: 79, net: 8.6 },
              { d: '06-24', gmv: 84, net: 9.2 },
              { d: '06-25', gmv: 80, net: 8.8 },
            ].map((bar, i) => (
              <div key={i} className="group relative flex flex-1 flex-col items-center gap-1">
                <div
                  className="w-full rounded-t bg-[#0e1216] transition group-hover:bg-[#1e252d]"
                  style={{ height: `${(bar.gmv / 100) * 160}px` }}
                />
                <div
                  className="w-full rounded-t bg-[#fdd506]"
                  style={{ height: `${(bar.net / 100) * 160 * 3}px` }}
                />
                <span className="text-[10px] text-[#5d646c]">{bar.d.slice(-2)}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between rounded-lg bg-[#f5f7f9] p-3 text-xs">
            <div>
              <span className="font-bold text-[#0e1216]">Tổng GMV 14 ngày:</span>{' '}
              <span className="font-extrabold text-[#0e1216]">990.152.542 ₫</span>
            </div>
            <span className="text-[#5d646c]">
              Tổng tiền Employer thanh toán cho job hoàn thành trong giai đoạn
            </span>
          </div>
        </div>

        {/* Top dịch vụ (%) matching Penpot */}
        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold text-[#0e1216]">Top dịch vụ (%)</h2>
          <p className="text-xs text-[#5d646c]">Tỷ trọng GMV theo ngành hàng</p>

          <div className="mt-6 space-y-4">
            {[
              { name: 'Dọn nhà theo giờ', pct: 38, val: '376M' },
              { name: 'Tổng vệ sinh', pct: 24, val: '238M' },
              { name: 'Giặt sofa & rèm', pct: 16, val: '158M' },
              { name: 'Sửa điện', pct: 12, val: '119M' },
              { name: 'Sửa nước', pct: 10, val: '99M' },
            ].map((svc, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#0e1216]">{svc.name}</span>
                  <span className="text-[#5d646c]">{svc.pct}% ({svc.val})</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#f5f7f9]">
                  <div
                    className="h-full rounded-full bg-[#fdd506]"
                    style={{ width: `${svc.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Sức khỏe nền tảng (Platform Health) */}
      <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
        <h2 className="text-sm font-bold text-[#0e1216]">Sức khỏe nền tảng (Platform Health)</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-5">
          <div className="rounded-lg border border-[#e1e5ea] bg-[#f5f7f9] p-3 text-center">
            <span className="text-[11px] text-[#5d646c]">Tỷ lệ hoàn thành job</span>
            <div className="mt-1 text-lg font-black text-[#16a34a]">86.2%</div>
            <span className="text-[10px] font-bold text-[#16a34a]">+1.4%</span>
          </div>

          <div className="rounded-lg border border-[#e1e5ea] bg-[#f5f7f9] p-3 text-center">
            <span className="text-[11px] text-[#5d646c]">Tỷ lệ hủy</span>
            <div className="mt-1 text-lg font-black text-[#b45309]">8.7%</div>
            <span className="text-[10px] font-bold text-[#16a34a]">-0.6%</span>
          </div>

          <div className="rounded-lg border border-[#e1e5ea] bg-[#f5f7f9] p-3 text-center">
            <span className="text-[11px] text-[#5d646c]">Tỷ lệ tranh chấp</span>
            <div className="mt-1 text-lg font-black text-[#e23532]">1.1%</div>
            <span className="text-[10px] font-bold text-[#16a34a]">-0.2%</span>
          </div>

          <div className="rounded-lg border border-[#e1e5ea] bg-[#f5f7f9] p-3 text-center">
            <span className="text-[11px] text-[#5d646c]">NPS Worker</span>
            <div className="mt-1 text-lg font-black text-[#0e1216]">62</div>
            <span className="text-[10px] font-bold text-[#16a34a]">+3</span>
          </div>

          <div className="rounded-lg border border-[#e1e5ea] bg-[#f5f7f9] p-3 text-center">
            <span className="text-[11px] text-[#5d646c]">NPS Employer</span>
            <div className="mt-1 text-lg font-black text-[#0e1216]">58</div>
            <span className="text-[10px] font-bold text-[#16a34a]">+1</span>
          </div>
        </div>
      </div>

      {/* Row 3: Số job theo quận (TP.HCM) matching Penpot */}
      <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
        <h2 className="text-sm font-bold text-[#0e1216]">Số job theo quận (TP.HCM)</h2>
        <p className="text-xs text-[#5d646c]">Phân bổ mật độ việc làm nội thành</p>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {[
            { q: 'Q1', jobs: 200, pct: '100%' },
            { q: 'Q3', jobs: 185, pct: '92%' },
            { q: 'Q4', jobs: 140, pct: '70%' },
            { q: 'Q5', jobs: 135, pct: '68%' },
            { q: 'Q7', jobs: 165, pct: '82%' },
            { q: 'Q10', jobs: 150, pct: '75%' },
            { q: 'Q. Bình Thạnh', jobs: 175, pct: '88%' },
            { q: 'Q. Phú Nhuận', jobs: 120, pct: '60%' },
          ].map((item, i) => (
            <div key={i} className="rounded-lg border border-[#e1e5ea] bg-[#f5f7f9] p-3 text-center">
              <span className="text-xs font-bold text-[#0e1216]">{item.q}</span>
              <div className="mt-1 text-base font-black text-[#0e1216]">{item.jobs}</div>
              <span className="text-[10px] text-[#5d646c]">jobs/tuần</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
