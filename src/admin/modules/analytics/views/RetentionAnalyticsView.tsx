import React from 'react';

export const RetentionAnalyticsView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* 4 KPI Cards matching Penpot Board 33 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5d646c]">
              D7 Retention
            </span>
            <span className="rounded-full bg-[#e6f9ee] px-2 py-0.5 text-xs font-bold text-[#16a34a]">
              +1.8%
            </span>
          </div>
          <div className="mt-3 text-2xl font-black text-[#0e1216]">42.6%</div>
          <p className="mt-1 text-[11px] text-[#5d646c]">Tỷ lệ quay lại sau 7 ngày đầu</p>
        </div>

        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5d646c]">
              D30 Retention
            </span>
            <span className="rounded-full bg-[#e6f9ee] px-2 py-0.5 text-xs font-bold text-[#16a34a]">
              +0.9%
            </span>
          </div>
          <div className="mt-3 text-2xl font-black text-[#0e1216]">28.1%</div>
          <p className="mt-1 text-[11px] text-[#5d646c]">Tỷ lệ giữ chân sau 1 tháng</p>
        </div>

        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5d646c]">
              D90 Retention
            </span>
            <span className="rounded-full bg-[#e6f9ee] px-2 py-0.5 text-xs font-bold text-[#16a34a]">
              +0.3%
            </span>
          </div>
          <div className="mt-3 text-2xl font-black text-[#0e1216]">17.3%</div>
          <p className="mt-1 text-[11px] text-[#5d646c]">Tỷ lệ gắn bó sau 3 tháng</p>
        </div>

        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5d646c]">
              Churn (30d)
            </span>
            <span className="rounded-full bg-[#e6f9ee] px-2 py-0.5 text-xs font-bold text-[#16a34a]">
              -0.5%
            </span>
          </div>
          <div className="mt-3 text-2xl font-black text-[#16a34a]">9.2%</div>
          <p className="mt-1 text-[11px] text-[#5d646c]">Tỷ lệ rời bỏ nền tảng</p>
        </div>
      </div>

      {/* Cohort 8 tuần gần nhất matching Penpot */}
      <div className="overflow-hidden rounded-xl border border-[#e1e5ea] bg-white shadow-sm">
        <div className="border-b border-[#e1e5ea] px-6 py-4">
          <h2 className="text-sm font-bold text-[#0e1216]">Cohort 8 tuần gần nhất (User Retention)</h2>
          <p className="text-xs text-[#5d646c]">Tỷ lệ giữ chân qua từng tuần theo nhóm tuần đăng ký đầu tiên</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#e1e5ea] bg-[#f5f7f9] text-[11px] font-bold uppercase tracking-wider text-[#5d646c]">
              <tr>
                <th className="px-4 py-3">Cohort</th>
                <th className="px-4 py-3 text-center">Người dùng</th>
                <th className="px-3 py-3 text-center">W1</th>
                <th className="px-3 py-3 text-center">W2</th>
                <th className="px-3 py-3 text-center">W3</th>
                <th className="px-3 py-3 text-center">W4</th>
                <th className="px-3 py-3 text-center">W5</th>
                <th className="px-3 py-3 text-center">W6</th>
                <th className="px-3 py-3 text-center">W7</th>
                <th className="px-3 py-3 text-center">W8</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e1e5ea] font-medium text-[#0e1216]">
              {[
                { cohort: '05/01 - 05/07', users: 420, w1: '100%', w2: '48.2%', w3: '38.5%', w4: '32.1%', w5: '28.4%', w6: '25.0%', w7: '22.8%', w8: '20.5%' },
                { cohort: '05/08 - 05/14', users: 445, w1: '100%', w2: '49.1%', w3: '39.0%', w4: '33.2%', w5: '29.1%', w6: '26.2%', w7: '23.4%', w8: '—' },
                { cohort: '05/15 - 05/21', users: 460, w1: '100%', w2: '50.3%', w3: '40.2%', w4: '34.5%', w5: '30.2%', w6: '27.1%', w7: '—', w8: '—' },
                { cohort: '05/22 - 05/28', users: 485, w1: '100%', w2: '51.2%', w3: '41.0%', w4: '35.0%', w5: '31.4%', w6: '—', w7: '—', w8: '—' },
                { cohort: '05/29 - 06/04', users: 510, w1: '100%', w2: '52.0%', w3: '42.1%', w4: '36.2%', w5: '—', w6: '—', w7: '—', w8: '—' },
                { cohort: '06/05 - 06/11', users: 535, w1: '100%', w2: '53.1%', w3: '43.0%', w4: '—', w5: '—', w6: '—', w7: '—', w8: '—' },
                { cohort: '06/12 - 06/18', users: 560, w1: '100%', w2: '54.2%', w3: '—', w4: '—', w5: '—', w6: '—', w7: '—', w8: '—' },
                { cohort: '06/19 - 06/25', users: 590, w1: '100%', w2: '—', w3: '—', w4: '—', w5: '—', w6: '—', w7: '—', w8: '—' },
              ].map((row, idx) => (
                <tr key={idx} className="transition hover:bg-[#f5f7f9]">
                  <td className="px-4 py-3 font-bold text-[#0e1216]">{row.cohort}</td>
                  <td className="px-4 py-3 text-center font-bold">{row.users}</td>
                  <td className="px-3 py-3 text-center font-bold text-[#16a34a] bg-emerald-50/50">{row.w1}</td>
                  <td className="px-3 py-3 text-center font-semibold">{row.w2}</td>
                  <td className="px-3 py-3 text-center">{row.w3}</td>
                  <td className="px-3 py-3 text-center">{row.w4}</td>
                  <td className="px-3 py-3 text-center">{row.w5}</td>
                  <td className="px-3 py-3 text-center">{row.w6}</td>
                  <td className="px-3 py-3 text-center">{row.w7}</td>
                  <td className="px-3 py-3 text-center">{row.w8}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
