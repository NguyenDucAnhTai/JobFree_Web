import React from 'react';

export const UrgentFeeAnalyticsView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* 4 KPI Cards matching Penpot Board 30 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5d646c]">
              Priority bookings (7d)
            </span>
            <span className="rounded-full bg-[#fef9c3] px-2 py-0.5 text-xs font-bold text-[#854d0e]">
              +12.5%
            </span>
          </div>
          <div className="mt-3 text-2xl font-black text-[#0e1216]">482 lượt</div>
          <p className="mt-1 text-[11px] text-[#5d646c]">26.2% tổng ca làm chọn ưu tiên</p>
        </div>

        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5d646c]">
              Priority Fee Revenue
            </span>
            <span className="rounded-full bg-[#e6f9ee] px-2 py-0.5 text-xs font-bold text-[#16a34a]">
              +14.8%
            </span>
          </div>
          <div className="mt-3 text-2xl font-black text-[#0e1216]">4.250.000 ₫</div>
          <p className="mt-1 text-[11px] text-[#5d646c]">100% doanh thu thuần của JobFree (DEC-025)</p>
        </div>

        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5d646c]">
              Match Rate (Priority)
            </span>
            <span className="rounded-full bg-[#e6f9ee] px-2 py-0.5 text-xs font-bold text-[#16a34a]">
              +14.3%
            </span>
          </div>
          <div className="mt-3 text-2xl font-black text-[#16a34a]">98.5%</div>
          <p className="mt-1 text-[11px] text-[#5d646c]">So với 84.2% của việc thường</p>
        </div>

        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5d646c]">
              Avg Match Speed
            </span>
            <span className="rounded-full bg-[#e6f9ee] px-2 py-0.5 text-xs font-bold text-[#16a34a]">
              -12.1p
            </span>
          </div>
          <div className="mt-3 text-2xl font-black text-[#0e1216]">4.2 phút</div>
          <p className="mt-1 text-[11px] text-[#5d646c]">Tốc độ ghép thợ có gói ưu tiên</p>
        </div>
      </div>

      {/* So sánh 3 gói ưu tiên chuẩn DEC-025/106 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="rounded bg-[#f5f7f9] px-2.5 py-1 text-xs font-bold text-[#5d646c]">
              GÓI NORMAL
            </span>
            <span className="text-sm font-bold text-[#0e1216]">0 ₫</span>
          </div>
          <div className="mt-4 space-y-2 text-xs text-[#5d646c]">
            <div className="flex justify-between">
              <span>Số booking tuần qua:</span>
              <span className="font-bold text-[#0e1216]">1.360 lượt</span>
            </div>
            <div className="flex justify-between">
              <span>Tỷ lệ ghép thành công:</span>
              <span className="font-semibold text-[#0e1216]">84.2%</span>
            </div>
            <div className="flex justify-between">
              <span>Thời gian ghép TB:</span>
              <span className="font-semibold text-[#0e1216]">18.5 phút</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[#fdd506] bg-[#fefce8] p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="rounded bg-[#fef08a] px-2.5 py-1 text-xs font-bold text-[#854d0e]">
              GÓI NHANH (FAST)
            </span>
            <span className="text-sm font-extrabold text-[#854d0e]">15.000 ₫</span>
          </div>
          <div className="mt-4 space-y-2 text-xs text-[#854d0e]">
            <div className="flex justify-between">
              <span>Số booking tuần qua:</span>
              <span className="font-bold text-[#0e1216]">312 lượt</span>
            </div>
            <div className="flex justify-between">
              <span>Doanh thu thu về:</span>
              <span className="font-bold text-[#16a34a]">4.680.000 ₫</span>
            </div>
            <div className="flex justify-between">
              <span>Thời gian ghép TB:</span>
              <span className="font-semibold text-[#0e1216]">6.4 phút</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[#fca5a5] bg-[#fef2f2] p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="rounded bg-[#fecaca] px-2.5 py-1 text-xs font-bold text-[#991b1b]">
              GÓI TỨC THÌ (INSTANT)
            </span>
            <span className="text-sm font-extrabold text-[#991b1b]">30.000 ₫</span>
          </div>
          <div className="mt-4 space-y-2 text-xs text-[#991b1b]">
            <div className="flex justify-between">
              <span>Số booking tuần qua:</span>
              <span className="font-bold text-[#0e1216]">170 lượt</span>
            </div>
            <div className="flex justify-between">
              <span>Doanh thu thu về:</span>
              <span className="font-bold text-[#16a34a]">5.100.000 ₫</span>
            </div>
            <div className="flex justify-between">
              <span>Thời gian ghép TB:</span>
              <span className="font-semibold text-[#0e1216]">3.1 phút</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
