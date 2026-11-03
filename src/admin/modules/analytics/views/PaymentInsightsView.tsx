import React from 'react';

export const PaymentInsightsView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* 4 Summary Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <span className="text-xs font-semibold text-[#5d646c]">Tỷ lệ thanh toán thành công</span>
          <div className="mt-2 text-2xl font-black text-[#16a34a]">98.2%</div>
          <p className="mt-1 text-[11px] text-[#5d646c]">Tính trên 1.420 giao dịch</p>
        </div>

        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <span className="text-xs font-semibold text-[#5d646c]">Phương thức phổ biến nhất</span>
          <div className="mt-2 text-2xl font-black text-[#0e1216]">VietQR (42.8%)</div>
          <p className="mt-1 text-[11px] text-[#5d646c]">Quét mã tức thì qua app ngân hàng</p>
        </div>

        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <span className="text-xs font-semibold text-[#5d646c]">Thời gian khớp webhook TB</span>
          <div className="mt-2 text-2xl font-black text-[#0284c7]">1.4 giây</div>
          <p className="mt-1 text-[11px] text-[#5d646c]">Độ trễ xử lý callback payOS</p>
        </div>

        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <span className="text-xs font-semibold text-[#5d646c]">Chi phí cổng thanh toán TB</span>
          <div className="mt-2 text-2xl font-black text-[#0e1216]">~1.1%</div>
          <p className="mt-1 text-[11px] text-[#5d646c]">Tối ưu qua biểu phí payOS</p>
        </div>
      </div>

      {/* Row 1: Distributions matching Penpot Board 27 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Payment status distribution */}
        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold text-[#0e1216]">
            Payment status distribution (Hôm nay)
          </h2>
          <p className="text-xs text-[#5d646c]">Phân bổ trạng thái giao dịch phát sinh</p>

          <div className="mt-6 space-y-4">
            {[
              { label: 'Success', count: 16, pct: 57, color: 'bg-[#16a34a]', text: 'text-[#16a34a]' },
              { label: 'Pending', count: 5, pct: 18, color: 'bg-[#f59e0b]', text: 'text-[#f59e0b]' },
              { label: 'Failed', count: 2, pct: 7, color: 'bg-[#e23532]', text: 'text-[#e23532]' },
              { label: 'Refunded', count: 5, pct: 18, color: 'bg-[#0284c7]', text: 'text-[#0284c7]' },
            ].map((st, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#0e1216]">{st.label}</span>
                  <span className={st.text}>{st.count} GD ({st.pct}%)</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#f5f7f9]">
                  <div className={`h-full rounded-full ${st.color}`} style={{ width: `${st.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Method distribution */}
        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold text-[#0e1216]">
            Method distribution
          </h2>
          <p className="text-xs text-[#5d646c]">Phương thức thanh toán Employer sử dụng</p>

          <div className="mt-6 space-y-4">
            {[
              { label: 'VietQR / QR Ngân hàng', count: 12, pct: 40, color: 'bg-[#fdd506]' },
              { label: 'ATM / Thẻ nội địa Napas', count: 9, pct: 30, color: 'bg-[#0e1216]' },
              { label: 'Thẻ quốc tế (VISA / MasterCard)', count: 6, pct: 20, color: 'bg-[#0284c7]' },
              { label: 'Ví điện tử liên kết', count: 3, pct: 10, color: 'bg-[#8c96a3]' },
            ].map((m, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#0e1216]">{m.label}</span>
                  <span className="text-[#5d646c]">{m.count} GD ({m.pct}%)</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#f5f7f9]">
                  <div className={`h-full rounded-full ${m.color}`} style={{ width: `${m.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: 24h Trend Bar Chart matching Penpot */}
      <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#0e1216]">
              Pending vs Success trend (24h qua)
            </h2>
            <p className="text-xs text-[#5d646c]">Số lượng giao dịch theo khung giờ trong ngày</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 font-semibold text-[#16a34a]">
              <span className="h-2.5 w-2.5 rounded-sm bg-[#16a34a]" /> Thành công
            </span>
            <span className="flex items-center gap-1.5 font-semibold text-[#f59e0b]">
              <span className="h-2.5 w-2.5 rounded-sm bg-[#f59e0b]" /> Đang chờ
            </span>
          </div>
        </div>

        <div className="mt-6 flex h-40 items-end gap-3 border-b border-[#e1e5ea] pb-2">
          {[
            { h: '0h', s: 2, p: 0 },
            { h: '2h', s: 1, p: 0 },
            { h: '4h', s: 0, p: 0 },
            { h: '6h', s: 5, p: 1 },
            { h: '8h', s: 18, p: 3 },
            { h: '10h', s: 24, p: 4 },
            { h: '12h', s: 15, p: 2 },
            { h: '14h', s: 20, p: 3 },
            { h: '16h', s: 22, p: 5 },
            { h: '18h', s: 19, p: 2 },
            { h: '20h', s: 14, p: 1 },
            { h: '22h', s: 8, p: 1 },
          ].map((bar, i) => (
            <div key={i} className="group flex flex-1 flex-col items-center gap-1">
              <div
                className="w-full rounded-t bg-[#16a34a]"
                style={{ height: `${bar.s * 4}px` }}
              />
              <div
                className="w-full rounded-t bg-[#f59e0b]"
                style={{ height: `${bar.p * 4}px` }}
              />
              <span className="text-[10px] text-[#5d646c]">{bar.h}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
