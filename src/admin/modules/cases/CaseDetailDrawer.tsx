import React, { useState } from 'react';
import { X, Briefcase, User, CheckCircle, ShieldAlert, ArrowRight, Save } from 'lucide-react';
import type { CaseStatus, CaseType } from '../../types';

interface CaseDetailDrawerProps {
  caseItem: {
    id: string;
    type: CaseType;
    title: string;
    status: CaseStatus;
    priority: string;
    createdAt: string;
    assignee?: string;
    jobId?: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

export const CaseDetailDrawer: React.FC<CaseDetailDrawerProps> = ({ caseItem, isOpen, onClose }) => {
  const [findingNote, setFindingNote] = useState('');
  const [status, setStatus] = useState<CaseStatus>(caseItem.status);
  const [resolutionCode, setResolutionCode] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm">
      <div className="flex h-full w-[640px] flex-col border-l border-[#e1e5ea] bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#e1e5ea] bg-[#f5f7f9] p-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#5d646c]">#{caseItem.id}</span>
              <span className="rounded bg-[#fee2e2] px-2 py-0.5 text-[10px] font-bold uppercase text-[#e23532]">
                {caseItem.priority}
              </span>
            </div>
            <h2 className="mt-1 text-base font-bold text-[#0e1216]">{caseItem.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-[#5d646c] transition hover:bg-white hover:text-[#0e1216]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 space-y-6 overflow-y-auto p-6 text-xs text-[#0e1216]">
          {/* Metadata Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-[#e1e5ea] bg-[#f5f7f9] p-3.5">
              <span className="text-[11px] font-bold text-[#5d646c]">Trạng thái hiện tại:</span>
              <div className="mt-1 font-bold text-[#0e1216] uppercase">{status}</div>
            </div>
            <div className="rounded-lg border border-[#e1e5ea] bg-[#f5f7f9] p-3.5">
              <span className="text-[11px] font-bold text-[#5d646c]">Mã công việc liên quan:</span>
              <div className="mt-1 font-bold text-[#0e1216]">{caseItem.jobId || 'Không gắn job'}</div>
            </div>
          </div>

          {/* Operational References (DEC-098) */}
          <div className="rounded-xl border border-[#e1e5ea] bg-white p-4">
            <h3 className="mb-2 font-bold text-[#0e1216]">Thực thể Vận hành tham chiếu</h3>
            <p className="mb-3 text-[11px] text-[#5d646c]">
              Admin DB chỉ lưu reference ID, không sao chép toàn bộ profile hoặc ledger (DEC-098).
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between rounded bg-[#eff2f5] p-2.5">
                <span className="flex items-center gap-1.5 font-medium"><Briefcase className="h-3.5 w-3.5 text-[#5d646c]" /> Job Aggregate</span>
                <span className="font-mono text-[#5d646c]">{caseItem.jobId || 'None'}</span>
              </div>
              <div className="flex items-center justify-between rounded bg-[#eff2f5] p-2.5">
                <span className="flex items-center gap-1.5 font-medium"><User className="h-3.5 w-3.5 text-[#5d646c]" /> Người khiếu nại</span>
                <span className="font-medium text-[#0e1216]">Nguyễn Văn A (Employer)</span>
              </div>
            </div>
          </div>

          {/* Timeline of Findings */}
          <div className="rounded-xl border border-[#e1e5ea] bg-white p-4">
            <h3 className="mb-3 font-bold text-[#0e1216]">Nhật ký xử lý & Bằng chứng (Findings Timeline)</h3>
            <div className="space-y-3 border-l-2 border-[#e1e5ea] pl-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#0e1216]">Hệ thống ghi nhận sự cố</span>
                  <span className="text-[10px] text-[#5d646c]">14:15</span>
                </div>
                <p className="mt-0.5 text-[#5d646c]">Tranh chấp tiền mặt phát sinh sau khi hoàn thành ca làm.</p>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#0e1216]">Staff Anna đã tiếp nhận</span>
                  <span className="text-[10px] text-[#5d646c]">14:22</span>
                </div>
                <p className="mt-0.5 text-[#5d646c]">Đã gọi điện cho cả 2 bên. Worker cho biết chưa nhận được tiền mặt.</p>
              </div>
            </div>

            {/* Add Finding Note */}
            <div className="mt-4 pt-3 border-t border-[#e1e5ea]">
              <label className="block text-[11px] font-bold text-[#0e1216] mb-1">Thêm nhận xét / Bằng chứng mới (Versioned):</label>
              <textarea
                value={findingNote}
                onChange={(e) => setFindingNote(e.target.value)}
                placeholder="Ghi nhận biên bản trao đổi, đối soát..."
                rows={2}
                className="w-full rounded-lg border border-[#e1e5ea] bg-[#f5f7f9] p-2 text-xs text-[#0e1216] outline-none focus:border-[#0e1216]"
              />
              <button
                onClick={() => setFindingNote('')}
                className="mt-2 flex items-center gap-1 rounded bg-[#0e1216] px-3 py-1.5 text-[11px] font-bold text-white hover:bg-gray-800"
              >
                <Save className="h-3 w-3" /> Lưu Finding
              </button>
            </div>
          </div>

          {/* Transition Action Buttons compliant with DEC-098/DEC-099 */}
          <div className="rounded-xl border border-[#e1e5ea] bg-[#f5f7f9] p-4">
            <h3 className="mb-2 font-bold text-[#0e1216]">Hành động chuyển trạng thái được phép:</h3>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button
                onClick={() => setStatus('awaiting_evidence')}
                className="flex items-center justify-center gap-1.5 rounded-lg border border-[#e1e5ea] bg-white p-2.5 text-xs font-bold text-[#0e1216] shadow-sm hover:bg-[#eff2f5]"
              >
                <ArrowRight className="h-3.5 w-3.5 text-[#b45309]" /> Yêu cầu bằng chứng
              </button>
              <button
                onClick={() => setStatus('escalated')}
                className="flex items-center justify-center gap-1.5 rounded-lg border border-[#e1e5ea] bg-white p-2.5 text-xs font-bold text-[#0e1216] shadow-sm hover:bg-[#eff2f5]"
              >
                <ShieldAlert className="h-3.5 w-3.5 text-[#e23532]" /> Chuyển cấp duyệt (Escalate)
              </button>
              <button
                onClick={() => setStatus('action_pending')}
                className="flex items-center justify-center gap-1.5 rounded-lg border border-[#e1e5ea] bg-white p-2.5 text-xs font-bold text-[#0e1216] shadow-sm hover:bg-[#eff2f5]"
              >
                <CheckCircle className="h-3.5 w-3.5 text-[#0284c7]" /> Quyết toán theo công thức
              </button>
            </div>
            
            <div className="border-t border-[#e1e5ea] pt-3">
              <label className="block text-[11px] font-bold text-[#0e1216] mb-1">Mã giải quyết (resolution_code) để Đóng Case:</label>
              <div className="flex gap-2">
                <select 
                  value={resolutionCode}
                  onChange={(e) => setResolutionCode(e.target.value)}
                  className="flex-1 rounded-lg border border-[#e1e5ea] bg-white px-3 py-2 text-xs font-medium text-[#0e1216] outline-none focus:border-[#0e1216]"
                >
                  <option value="">-- Chọn resolution_code --</option>
                  <option value="worker_at_fault">Lỗi do Worker</option>
                  <option value="employer_at_fault">Lỗi do Employer</option>
                  <option value="mutual_agreement">Thỏa thuận 2 bên</option>
                  <option value="fraud_detected">Phát hiện gian lận</option>
                  <option value="insufficient_evidence">Không đủ bằng chứng</option>
                </select>
                <button
                  onClick={() => setStatus('resolved')}
                  disabled={!resolutionCode}
                  className="flex items-center justify-center gap-1.5 rounded-lg bg-[#fdd506] px-4 py-2 text-xs font-bold text-[#0e1216] shadow-sm hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CheckCircle className="h-3.5 w-3.5 text-[#0e1216]" /> Đóng Case
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#e1e5ea] bg-[#f5f7f9] p-4 text-right">
          <button
            onClick={onClose}
            className="rounded-lg border border-[#e1e5ea] bg-white px-4 py-2 text-xs font-bold text-[#0e1216] shadow-sm hover:bg-[#eff2f5]"
          >
            Đóng Drawer
          </button>
        </div>
      </div>
    </div>
  );
};
