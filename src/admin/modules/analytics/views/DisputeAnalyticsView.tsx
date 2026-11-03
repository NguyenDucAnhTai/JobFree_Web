import React from 'react';

export const DisputeAnalyticsView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* 4 KPI Cards matching Penpot Board 29 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5d646c]">
              Cancel Rate
            </span>
            <span className="rounded-full bg-[#e6f9ee] px-2 py-0.5 text-xs font-bold text-[#16a34a]">
              -0.6%
            </span>
          </div>
          <div className="mt-3 text-2xl font-black text-[#0e1216]">8.7%</div>
          <p className="mt-1 text-[11px] text-[#5d646c]">Tỷ lệ hủy ca trước/trong giờ làm</p>
        </div>

        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5d646c]">
              Dispute Rate
            </span>
            <span className="rounded-full bg-[#e6f9ee] px-2 py-0.5 text-xs font-bold text-[#16a34a]">
              -0.2%
            </span>
          </div>
          <div className="mt-3 text-2xl font-black text-[#16a34a]">1.1%</div>
          <p className="mt-1 text-[11px] text-[#5d646c]">Vụ việc tranh chấp trên tổng số job</p>
        </div>

        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5d646c]">
              Refund Amount (7d)
            </span>
            <span className="rounded-full bg-[#fee2e2] px-2 py-0.5 text-xs font-bold text-[#e23532]">
              +3.1%
            </span>
          </div>
          <div className="mt-3 text-2xl font-black text-[#0e1216]">18.400.000 ₫</div>
          <p className="mt-1 text-[11px] text-[#5d646c]">Số tiền giải ngân hoàn trong 7 ngày</p>
        </div>

        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5d646c]">
              Avg Resolution
            </span>
            <span className="rounded-full bg-[#e6f9ee] px-2 py-0.5 text-xs font-bold text-[#16a34a]">
              -0.4 ngày
            </span>
          </div>
          <div className="mt-3 text-2xl font-black text-[#0e1216]">1.8 ngày</div>
          <p className="mt-1 text-[11px] text-[#5d646c]">Thời gian đóng case trung bình</p>
        </div>
      </div>

      {/* Bảng Tranh chấp gần đây matching Penpot */}
      <div className="overflow-hidden rounded-xl border border-[#e1e5ea] bg-white shadow-sm">
        <div className="border-b border-[#e1e5ea] px-6 py-4">
          <h2 className="text-sm font-bold text-[#0e1216]">Tranh chấp gần đây (8 vụ việc)</h2>
          <p className="text-xs text-[#5d646c]">Danh sách các case tranh chấp phát sinh cần giải quyết</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#e1e5ea] bg-[#f5f7f9] text-[11px] font-bold uppercase tracking-wider text-[#5d646c]">
              <tr>
                <th className="px-4 py-3">Mã Job</th>
                <th className="px-4 py-3">Employer</th>
                <th className="px-4 py-3">Lý do tranh chấp</th>
                <th className="px-4 py-3 text-right">Số tiền khiếu nại</th>
                <th className="px-3 py-3 text-center">Trạng thái</th>
                <th className="px-4 py-3 text-center">Tạo lúc</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e1e5ea] font-medium text-[#0e1216]">
              {[
                { id: 'JOB20100', employer: 'Nguyễn Minh Anh', reason: 'Worker đến trễ > 30 phút', amount: '200.000 ₫', status: 'Đang xử lý', date: '2026-06-15' },
                { id: 'JOB20101', employer: 'Trần Thu Hà', reason: 'Chất lượng dịch vụ không đạt', amount: '250.000 ₫', status: 'Chờ Worker phản hồi', date: '2026-06-16' },
                { id: 'JOB20102', employer: 'Phạm Quốc Việt', reason: 'Hiểu nhầm phạm vi công việc', amount: '300.000 ₫', status: 'Đã hoàn tiền', date: '2026-06-17' },
                { id: 'JOB20103', employer: 'Lê Hoàng Nam', reason: 'Phát sinh chi phí không thỏa thuận', amount: '350.000 ₫', status: 'Đã đóng case', date: '2026-06-18' },
                { id: 'JOB20104', employer: 'Nguyễn Minh Anh', reason: 'Worker không tới (No-show)', amount: '400.000 ₫', status: 'Đang xử lý', date: '2026-06-19' },
                { id: 'JOB20105', employer: 'Trần Thu Hà', reason: 'Chất lượng dọn dẹp chưa sạch', amount: '450.000 ₫', status: 'Chờ Worker phản hồi', date: '2026-06-20' },
                { id: 'JOB20106', employer: 'Phạm Quốc Việt', reason: 'Hiểu nhầm thời lượng ca làm', amount: '500.000 ₫', status: 'Đã hoàn tiền', date: '2026-06-21' },
                { id: 'JOB20107', employer: 'Lê Hoàng Nam', reason: 'Yêu cầu hủy ca giờ chót', amount: '550.000 ₫', status: 'Đã đóng case', date: '2026-06-22' },
              ].map((c, idx) => (
                <tr key={idx} className="transition hover:bg-[#f5f7f9]">
                  <td className="px-4 py-3 font-bold text-[#0e1216]">{c.id}</td>
                  <td className="px-4 py-3">{c.employer}</td>
                  <td className="px-4 py-3 text-[#5d646c]">{c.reason}</td>
                  <td className="px-4 py-3 text-right font-bold text-[#0e1216]">{c.amount}</td>
                  <td className="px-3 py-3 text-center">
                    <span
                      className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold ${
                        c.status === 'Đã hoàn tiền'
                          ? 'bg-[#e0f2fe] text-[#0284c7]'
                          : c.status === 'Đang xử lý'
                          ? 'bg-[#fee2e2] text-[#e23532]'
                          : c.status === 'Đã đóng case'
                          ? 'bg-[#e6f9ee] text-[#16a34a]'
                          : 'bg-[#fef9c3] text-[#854d0e]'
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-[#5d646c]">{c.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
