import React from 'react';
import { X, MapPin, DollarSign, Clock, User, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

interface JobDetailDrawerProps {
  job: {
    id: string;
    service: string;
    employer: string;
    worker?: string;
    tier: string;
    status: string;
    price: number;
    location: string;
    createdAt: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

export const JobDetailDrawer: React.FC<JobDetailDrawerProps> = ({ job, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm">
      <div className="flex h-full w-[540px] flex-col border-l border-[#e1e5ea] bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#e1e5ea] bg-[#f5f7f9] p-6">
          <div>
            <h2 className="text-base font-bold text-[#0e1216]">Chi tiết Ca làm #{job.id}</h2>
            <p className="text-xs text-[#5d646c]">{job.service}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-[#5d646c] hover:bg-white hover:text-[#0e1216]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto p-6 text-xs text-[#0e1216]">
          {/* Shift Details */}
          <div className="rounded-xl border border-[#e1e5ea] bg-[#f5f7f9] p-4">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-[#5d646c]">Thông tin ca làm</h3>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#5d646c]" />
                <span className="font-semibold">Tạo lúc: {job.createdAt}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#5d646c]" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-[#5d646c]" />
                <span>Ghi chú: {job.service === 'Phụ kho nhẹ' ? 'Cần 2 nam khỏe mạnh bốc vác' : 'Gọi trước khi đến'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#5d646c]" />
                <span>Trạng thái check-in: <span className="font-bold text-[#0284c7]">{job.status === 'In Progress' || job.status === 'Completed' ? 'Đã Check-in' : 'Chưa Check-in'}</span></span>
              </div>
              <div className="flex items-center gap-2 mt-2 border-t border-[#e1e5ea] pt-2">
                <DollarSign className="h-4 w-4 text-[#5d646c]" />
                <span>
                  Tiền đang giữ (Fund hold):{' '}
                  <strong className="text-base font-bold text-[#0e1216]">
                    {job.price.toLocaleString('vi-VN')} VND
                  </strong>
                </span>
              </div>
            </div>
          </div>

          {/* People Involved */}
          <div className="rounded-xl border border-[#e1e5ea] bg-white p-4">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-[#5d646c]">Người tham gia</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg bg-[#eff2f5] p-3">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-[#5d646c]" />
                  <div>
                    <div className="font-bold text-[#0e1216]">{job.employer}</div>
                    <div className="text-[10px] text-[#5d646c]">Employer (Người liên hệ)</div>
                  </div>
                </div>
                <span className="rounded bg-[#e6f9ee] px-2 py-0.5 text-[10px] font-bold text-[#16a34a]">
                  Đã cọc payOS
                </span>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-[#eff2f5] p-3">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-[#5d646c]" />
                  <div>
                    <div className="font-bold text-[#0e1216]">{job.worker || 'Chưa gán Worker'}</div>
                    <div className="text-[10px] text-[#5d646c]">Worker</div>
                  </div>
                </div>
                {job.worker && (
                  <span className="flex items-center gap-1 rounded bg-[#e6f9ee] px-2 py-0.5 text-[10px] font-bold text-[#16a34a]">
                    <ShieldCheck className="h-3 w-3" /> Đã qua eKYC
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#e1e5ea] bg-[#f5f7f9] p-4 text-right">
          <button
            onClick={onClose}
            className="rounded-lg border border-[#e1e5ea] bg-white px-4 py-2 text-xs font-bold text-[#0e1216] hover:bg-[#eff2f5]"
          >
            Đóng Drawer
          </button>
        </div>
      </div>
    </div>
  );
};
