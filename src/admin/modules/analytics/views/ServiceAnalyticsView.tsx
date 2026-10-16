import React from 'react';

export const ServiceAnalyticsView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* 4 KPI Cards matching Penpot Board 34 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5d646c]">
              Tổng dịch vụ active
            </span>
            <span className="rounded-full bg-[#f5f7f9] px-2 py-0.5 text-xs font-bold text-[#5d646c]">
              10 pilot
            </span>
          </div>
          <div className="mt-3 text-2xl font-black text-[#0e1216]">10</div>
          <p className="mt-1 text-[11px] text-[#5d646c]">Danh mục thí điểm chuẩn DEC-030</p>
        </div>

        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5d646c]">
              Booking (7d)
            </span>
            <span className="rounded-full bg-[#e6f9ee] px-2 py-0.5 text-xs font-bold text-[#16a34a]">
              +4.2%
            </span>
          </div>
          <div className="mt-3 text-2xl font-black text-[#0e1216]">1.842</div>
          <p className="mt-1 text-[11px] text-[#5d646c]">Lượt đặt ca làm trong tuần</p>
        </div>

        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5d646c]">
              GMV Dịch vụ top 1
            </span>
            <span className="rounded-full bg-[#e6f9ee] px-2 py-0.5 text-xs font-bold text-[#16a34a]">
              +6.1%
            </span>
          </div>
          <div className="mt-3 text-2xl font-black text-[#0e1216]">184.000.000 ₫</div>
          <p className="mt-1 text-[11px] text-[#5d646c]">Dọn nhà theo giờ dẫn đầu</p>
        </div>

        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5d646c]">
              Tỷ lệ lặp lại
            </span>
            <span className="rounded-full bg-[#fef9c3] px-2 py-0.5 text-xs font-bold text-[#854d0e]">
              +1.3%
            </span>
          </div>
          <div className="mt-3 text-2xl font-black text-[#0e1216]">38.7%</div>
          <p className="mt-1 text-[11px] text-[#5d646c]">Đặt cùng 1 dịch vụ nhiều lần</p>
        </div>
      </div>

      {/* Bảng xếp hạng 10 dịch vụ matching Penpot */}
      <div className="overflow-hidden rounded-xl border border-[#e1e5ea] bg-white shadow-sm">
        <div className="border-b border-[#e1e5ea] px-6 py-4">
          <h2 className="text-sm font-bold text-[#0e1216]">Bảng xếp hạng 10 dịch vụ phổ biến</h2>
          <p className="text-xs text-[#5d646c]">Xếp hạng theo sản lượng booking và tổng giá trị giao dịch phát sinh</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#e1e5ea] bg-[#f5f7f9] text-[11px] font-bold uppercase tracking-wider text-[#5d646c]">
              <tr>
                <th className="px-4 py-3">Dịch vụ</th>
                <th className="px-4 py-3">Nhóm ngành</th>
                <th className="px-4 py-3 text-center">Booking (30d)</th>
                <th className="px-4 py-3 text-right">GMV (30d)</th>
                <th className="px-4 py-3 text-center">Đánh giá</th>
                <th className="px-4 py-3 text-center">Tăng trưởng</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e1e5ea] font-medium text-[#0e1216]">
              {[
                { name: 'Dọn nhà theo giờ', group: 'Dọn dẹp', bookings: 800, gmv: '280.000.000 ₫', rating: '4.90 ★', growth: '+8.0%' },
                { name: 'Tổng vệ sinh', group: 'Dọn dẹp', bookings: 740, gmv: '259.000.000 ₫', rating: '4.86 ★', growth: '+7.3%' },
                { name: 'Giặt sofa & rèm', group: 'Dọn dẹp', bookings: 680, gmv: '238.000.000 ₫', rating: '4.82 ★', growth: '+6.6%' },
                { name: 'Sửa điện', group: 'Sửa chữa', bookings: 620, gmv: '217.000.000 ₫', rating: '4.78 ★', growth: '+5.9%' },
                { name: 'Sửa nước', group: 'Sửa chữa', bookings: 560, gmv: '196.000.000 ₫', rating: '4.74 ★', growth: '+5.2%' },
                { name: 'Lắp đặt máy lạnh', group: 'Sửa chữa', bookings: 500, gmv: '175.000.000 ₫', rating: '4.70 ★', growth: '+4.5%' },
                { name: 'Nấu ăn theo bữa', group: 'Gia đình', bookings: 440, gmv: '154.000.000 ₫', rating: '4.66 ★', growth: '+3.8%' },
                { name: 'Trông trẻ', group: 'Gia đình', bookings: 380, gmv: '133.000.000 ₫', rating: '4.62 ★', growth: '+3.1%' },
                { name: 'Chăm người bệnh', group: 'Gia đình', bookings: 320, gmv: '112.000.000 ₫', rating: '4.58 ★', growth: '+2.4%' },
                { name: 'Bốc xếp - chuyển nhà', group: 'Vận chuyển', bookings: 260, gmv: '91.000.000 ₫', rating: '4.54 ★', growth: '+1.7%' },
              ].map((svc, idx) => (
                <tr key={idx} className="transition hover:bg-[#f5f7f9]">
                  <td className="px-4 py-3 font-bold text-[#0e1216]">{svc.name}</td>
                  <td className="px-4 py-3">
                    <span className="rounded bg-[#f5f7f9] px-2 py-0.5 text-[11px] font-semibold text-[#5d646c]">
                      {svc.group}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center font-bold">{svc.bookings}</td>
                  <td className="px-4 py-3 text-right font-extrabold text-[#16a34a]">{svc.gmv}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="rounded bg-[#fef9c3] px-2 py-0.5 text-[11px] font-bold text-[#854d0e]">
                      {svc.rating}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-bold text-[#16a34a]">{svc.growth}</span>
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
