import React from 'react';

export const EmployerAnalyticsView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* 4 KPI Cards matching Penpot Board 31 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5d646c]">
              Active employers
            </span>
            <span className="rounded-full bg-[#e6f9ee] px-2 py-0.5 text-xs font-bold text-[#16a34a]">
              +4.7%
            </span>
          </div>
          <div className="mt-3 text-2xl font-black text-[#0e1216]">2.841</div>
          <p className="mt-1 text-[11px] text-[#5d646c]">Chủ nhà / đơn vị có hoạt động</p>
        </div>

        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5d646c]">
              New employers (7d)
            </span>
            <span className="rounded-full bg-[#e6f9ee] px-2 py-0.5 text-xs font-bold text-[#16a34a]">
              +6.1%
            </span>
          </div>
          <div className="mt-3 text-2xl font-black text-[#0e1216]">186</div>
          <p className="mt-1 text-[11px] text-[#5d646c]">Đăng ký mới trong tuần</p>
        </div>

        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5d646c]">
              Avg spend / employer
            </span>
            <span className="rounded-full bg-[#e0f2fe] px-2 py-0.5 text-xs font-bold text-[#0284c7]">
              +1.9%
            </span>
          </div>
          <div className="mt-3 text-2xl font-black text-[#0e1216]">1.240.000 ₫</div>
          <p className="mt-1 text-[11px] text-[#5d646c]">Chi tiêu trung bình mỗi tháng</p>
        </div>

        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5d646c]">
              Repeat rate
            </span>
            <span className="rounded-full bg-[#fef9c3] px-2 py-0.5 text-xs font-bold text-[#854d0e]">
              +2.4%
            </span>
          </div>
          <div className="mt-3 text-2xl font-black text-[#0e1216]">48.3%</div>
          <p className="mt-1 text-[11px] text-[#5d646c]">Tỷ lệ đặt ca lần thứ 2 trở lên</p>
        </div>
      </div>

      {/* Bảng Top Employers matching Penpot */}
      <div className="overflow-hidden rounded-xl border border-[#e1e5ea] bg-white shadow-sm">
        <div className="border-b border-[#e1e5ea] px-6 py-4">
          <h2 className="text-sm font-bold text-[#0e1216]">Top Employers (8 khách hàng chi tiêu nhiều nhất)</h2>
          <p className="text-xs text-[#5d646c]">Dữ liệu 30 ngày qua (PII che theo chuẩn bảo mật)</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#e1e5ea] bg-[#f5f7f9] text-[11px] font-bold uppercase tracking-wider text-[#5d646c]">
              <tr>
                <th className="px-4 py-3">Employer</th>
                <th className="px-4 py-3 text-center">Số job (30d)</th>
                <th className="px-4 py-3 text-right">Chi tiêu (30d)</th>
                <th className="px-4 py-3 text-right">Avg job value</th>
                <th className="px-4 py-3 text-center">Quận chính</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e1e5ea] font-medium text-[#0e1216]">
              {[
                { name: 'Nguyễn Minh Anh', jobs: 28, spend: '11.760.000 ₫', avg: '380.000 ₫', district: 'Quận 1' },
                { name: 'Trần Thu Hà', jobs: 26, spend: '10.920.000 ₫', avg: '392.000 ₫', district: 'Quận 3' },
                { name: 'Phạm Quốc Việt', jobs: 24, spend: '10.080.000 ₫', avg: '404.000 ₫', district: 'Quận 7' },
                { name: 'Lê Hoàng Nam', jobs: 22, spend: '9.240.000 ₫', avg: '416.000 ₫', district: 'Bình Thạnh' },
                { name: 'Vũ Mai Linh', jobs: 20, spend: '8.400.000 ₫', avg: '428.000 ₫', district: 'Phú Nhuận' },
                { name: 'Đặng Thành Long', jobs: 18, spend: '7.560.000 ₫', avg: '440.000 ₫', district: 'Quận 10' },
                { name: 'Hoàng Khánh Vy', jobs: 16, spend: '6.720.000 ₫', avg: '452.000 ₫', district: 'Tân Bình' },
                { name: 'Bùi Tuấn Kiệt', jobs: 14, spend: '5.880.000 ₫', avg: '464.000 ₫', district: 'Gò Vấp' },
              ].map((emp, idx) => (
                <tr key={idx} className="transition hover:bg-[#f5f7f9]">
                  <td className="px-4 py-3 font-bold text-[#0e1216]">{emp.name}</td>
                  <td className="px-4 py-3 text-center font-bold">{emp.jobs}</td>
                  <td className="px-4 py-3 text-right font-extrabold text-[#16a34a]">{emp.spend}</td>
                  <td className="px-4 py-3 text-right text-[#5d646c]">{emp.avg}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="rounded bg-[#f5f7f9] px-2 py-0.5 text-[11px] font-semibold text-[#0e1216]">
                      {emp.district}
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
