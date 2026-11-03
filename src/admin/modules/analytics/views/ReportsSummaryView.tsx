import React, { useState } from 'react';
import { Download, FileSpreadsheet } from 'lucide-react';

export const ReportsSummaryView: React.FC = () => {
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const handleDownload = (format: string, reportName: string) => {
    setDownloadNotice(
      `Yêu cầu xuất ${reportName} định dạng ${format} đã được ghi nhận. Link tải bảo mật đã được tạo theo quy định DEC-101/104 (tồn tại 24 giờ).`
    );
    setTimeout(() => setDownloadNotice(null), 6000);
  };

  return (
    <div className="space-y-6">
      {/* 4 Data Quality KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <span className="text-xs font-semibold text-[#5d646c]">Data Quality Score</span>
          <div className="mt-2 text-2xl font-black text-[#16a34a]">99.8%</div>
          <p className="mt-1 text-[11px] text-[#5d646c]">Bản ghi khớp schema nghiệp vụ</p>
        </div>

        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <span className="text-xs font-semibold text-[#5d646c]">Pipeline Latency</span>
          <div className="mt-2 text-2xl font-black text-[#0e1216]">1.2s</div>
          <p className="mt-1 text-[11px] text-[#5d646c]">Độ trễ đồng bộ từ database chính</p>
        </div>

        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <span className="text-xs font-semibold text-[#5d646c]">Missing Required Fields</span>
          <div className="mt-2 text-2xl font-black text-[#16a34a]">0.02%</div>
          <p className="mt-1 text-[11px] text-[#5d646c]">Dữ liệu toàn vẹn cao</p>
        </div>

        <div className="rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm">
          <span className="text-xs font-semibold text-[#5d646c]">Audit Compliance</span>
          <div className="mt-2 text-2xl font-black text-[#0284c7]">DEC-104</div>
          <p className="mt-1 text-[11px] text-[#5d646c]">Quyền chỉ đọc & bảo mật PII</p>
        </div>
      </div>

      {downloadNotice && (
        <div className="flex items-center justify-between rounded-lg border border-[#ca8a04] bg-[#fefce8] p-4 text-xs font-medium text-[#854d0e]">
          <span>{downloadNotice}</span>
          <button onClick={() => setDownloadNotice(null)} className="font-bold hover:underline">
            Đóng
          </button>
        </div>
      )}

      {/* Trung tâm xuất báo cáo (Export Center) */}
      <div className="overflow-hidden rounded-xl border border-[#e1e5ea] bg-white shadow-sm">
        <div className="border-b border-[#e1e5ea] px-6 py-4">
          <h2 className="text-sm font-bold text-[#0e1216]">Trung tâm xuất báo cáo & dữ liệu</h2>
          <p className="text-xs text-[#5d646c]">Tải xuống các bộ dữ liệu phân tích định dạng chuẩn</p>
        </div>

        <div className="divide-y divide-[#e1e5ea] p-6">
          {[
            { title: 'Báo cáo doanh thu & đối soát tháng (Reconciliation Report)', desc: 'Chi tiết toàn bộ GMV, COD, phí nền tảng 10% và đối soát sao kê', tag: 'Tài chính' },
            { title: 'Báo cáo giao dịch cổng payOS thời gian thực (PayOS Audit Stream)', desc: 'Danh sách 10.000 giao dịch, mã đơn, webhook log và phí cổng', tag: 'Cổng TT' },
            { title: 'Báo cáo năng suất Worker & Xếp hạng sao (Worker Performance)', desc: 'Tỷ lệ hoàn thành, thời gian on-time, thu nhập giải ngân', tag: 'Vận hành' },
            { title: 'Báo cáo tỷ lệ cung - cầu theo 11 quận TP.HCM (Supply & Demand Gap)', desc: 'Mật độ nhu cầu đặt ca và lực lượng thợ trực chiến theo khung giờ', tag: 'Thị trường' },
          ].map((rep, idx) => (
            <div key={idx} className="flex flex-col gap-4 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#0e1216] text-xs">{rep.title}</span>
                  <span className="rounded bg-[#f5f7f9] px-2 py-0.5 text-[10px] font-bold text-[#5d646c]">{rep.tag}</span>
                </div>
                <p className="mt-1 text-xs text-[#5d646c]">{rep.desc}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownload('CSV', rep.title)}
                  className="flex items-center gap-1 rounded-lg border border-[#e1e5ea] bg-[#f5f7f9] px-3 py-1.5 text-xs font-bold text-[#0e1216] transition hover:bg-[#e2e8f0]"
                >
                  <FileSpreadsheet className="h-3.5 w-3.5" /> CSV
                </button>
                <button
                  onClick={() => handleDownload('Excel (XLSX)', rep.title)}
                  className="flex items-center gap-1 rounded-lg border border-[#e1e5ea] bg-[#0e1216] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-[#1e252d]"
                >
                  <Download className="h-3.5 w-3.5" /> Excel
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
