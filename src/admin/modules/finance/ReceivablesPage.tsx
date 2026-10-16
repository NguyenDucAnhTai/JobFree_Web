import React, { useState } from 'react';
import { Clock, ShieldAlert, AlertTriangle, CheckCircle2, UserCheck, Ban } from 'lucide-react';

interface WorkerReceivable {
  id: string;
  workerName: string;
  amount: number;
  jobId: string;
  status: 'warning_12h' | 'overdue_24h' | 'locked_72h' | 'settled';
  dueDate: string;
  createdAt: string;
}

interface EmployerReceivable {
  id: string;
  employerName: string;
  amount: number;
  jobId: string;
  status: 'reminded_24h' | 'overdue_48h' | 'intentional_default';
  contactStatus: 'contacted' | 'not_reached' | 'refused';
  dueDate: string;
  createdAt: string;
}

const mockWorkerReceivables: WorkerReceivable[] = [
  {
    id: 'REC-W-20261008-01',
    workerName: 'Lê Văn Worker',
    amount: 50000,
    jobId: 'JOB-20261007-091',
    status: 'overdue_24h',
    dueDate: '2026-10-08 10:00:00',
    createdAt: '2026-10-07 10:00:00',
  },
  {
    id: 'REC-W-20261008-02',
    workerName: 'Phạm Minh Trí',
    amount: 75000,
    jobId: 'JOB-20261006-045',
    status: 'locked_72h',
    dueDate: '2026-10-07 16:00:00',
    createdAt: '2026-10-06 16:00:00',
  },
];

const mockEmployerReceivables: EmployerReceivable[] = [
  {
    id: 'REC-E-20261008-01',
    employerName: 'Trần Thị Thu Loan',
    amount: 1500000,
    jobId: 'JOB-20261006-033',
    status: 'overdue_48h',
    contactStatus: 'not_reached',
    dueDate: '2026-10-08 15:00:00',
    createdAt: '2026-10-06 15:00:00',
  },
];

export const ReceivablesPage: React.FC = () => {
  const [tab, setTab] = useState<'worker' | 'employer'>('worker');
  const [showConfirmModal, setShowConfirmModal] = useState<string | null>(null);

  const formatVND = (amount: number) => {
    return amount.toLocaleString('vi-VN') + ' ₫';
  };

  const getWorkerStatusBadge = (status: WorkerReceivable['status']) => {
    switch (status) {
      case 'warning_12h':
        return (
          <span className="inline-flex items-center gap-1 rounded bg-[#e0f2fe] px-2.5 py-0.5 text-xs font-bold text-[#0284c7]">
            <Clock size={12} /> Cảnh báo 12h
          </span>
        );
      case 'overdue_24h':
        return (
          <span className="inline-flex items-center gap-1 rounded bg-[#fff8e6] px-2.5 py-0.5 text-xs font-bold text-[#ffb330]">
            <AlertTriangle size={12} /> Quá hạn 24h (Khóa TM)
          </span>
        );
      case 'locked_72h':
        return (
          <span className="inline-flex items-center gap-1 rounded bg-[#ffebe6] px-2.5 py-0.5 text-xs font-bold text-[#ff383c]">
            <Ban size={12} /> Quá hạn 72h (Khóa Mọi Việc)
          </span>
        );
      case 'settled':
        return (
          <span className="inline-flex items-center gap-1 rounded bg-[#e6f9ee] px-2.5 py-0.5 text-xs font-bold text-[#16a34a]">
            <CheckCircle2 size={12} /> Đã thanh toán
          </span>
        );
    }
  };

  const getEmployerStatusBadge = (status: EmployerReceivable['status']) => {
    switch (status) {
      case 'reminded_24h':
        return (
          <span className="inline-flex items-center gap-1 rounded bg-[#e0f2fe] px-2.5 py-0.5 text-xs font-bold text-[#0284c7]">
            <Clock size={12} /> Đã nhắc 24h
          </span>
        );
      case 'overdue_48h':
        return (
          <span className="inline-flex items-center gap-1 rounded bg-[#fff8e6] px-2.5 py-0.5 text-xs font-bold text-[#ffb330]">
            <ShieldAlert size={12} /> Quá hạn 48h
          </span>
        );
      case 'intentional_default':
        return (
          <span className="inline-flex items-center gap-1 rounded bg-[#ffebe6] px-2.5 py-0.5 text-xs font-bold text-[#ff383c]">
            <Ban size={12} /> Cố ý quỵt nợ (Block vĩnh viễn)
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col gap-4 rounded-xl border border-[#e1e5ea] bg-[#ffffff] p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-[#0e1216]">Quản Lý Công Nợ & Thu Hồi</h1>
            <span className="rounded-full bg-[#fff8e6] px-2.5 py-0.5 text-xs font-semibold text-[#ffb330]">
              DEC-053–056 / DEC-107
            </span>
          </div>
          <p className="mt-1 text-sm text-[#5d646c]">
            Kiểm soát nợ phí tiền mặt Worker và xử lý vi phạm quỵt tiền mặt của Employer với quy trình Recovery Pack.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#e1e5ea]">
        <button
          onClick={() => setTab('worker')}
          className={`flex items-center gap-2 border-b-2 px-5 py-3 text-sm font-semibold transition-colors ${
            tab === 'worker'
              ? 'border-[#ffb330] text-[#0e1216]'
              : 'border-transparent text-[#5d646c] hover:text-[#0e1216]'
          }`}
        >
          <span>Công nợ Worker (Phí nền tảng)</span>
          <span className="rounded-full bg-[#f5f7f9] px-2 py-0.5 text-xs text-[#5d646c]">
            {mockWorkerReceivables.length}
          </span>
        </button>
        <button
          onClick={() => setTab('employer')}
          className={`flex items-center gap-2 border-b-2 px-5 py-3 text-sm font-semibold transition-colors ${
            tab === 'employer'
              ? 'border-[#ffb330] text-[#0e1216]'
              : 'border-transparent text-[#5d646c] hover:text-[#0e1216]'
          }`}
        >
          <span>Công nợ Employer (Không trả Worker)</span>
          <span className="rounded-full bg-[#f5f7f9] px-2 py-0.5 text-xs text-[#5d646c]">
            {mockEmployerReceivables.length}
          </span>
        </button>
      </div>

      {/* Policy Notice Box */}
      {tab === 'worker' ? (
        <div className="rounded-xl border border-[#e1e5ea] bg-[#f5f7f9] p-4 text-xs text-[#0e1216]">
          <span className="font-bold">Quy tắc thu hồi nợ Worker:</span> Hạn thanh toán phí 24h từ lúc hoàn thành ca tiền mặt. Nhắc nhở tại mốc 12h, 24h, 48h. Quá hạn 24h tự động khóa nhận job tiền mặt. Quá hạn 72h tự động khóa toàn bộ nhận job trên nền tảng (DEC-053/056).
        </div>
      ) : (
        <div className="rounded-xl border border-[#e1e5ea] bg-[#f5f7f9] p-4 text-xs text-[#0e1216]">
          <span className="font-bold">Quy tắc thu hồi nợ Employer (DEC-107):</span> Employer không trả tiền mặt cho Worker sau khi hoàn thành. Hệ thống nhắc nhở tự động 24h/48h. Staff liên hệ 3 lần. Nếu cố ý không trả: Khóa vĩnh viễn tài khoản và kích hoạt Basic Legal Recovery Pack chuyển giao bộ phận pháp lý.
        </div>
      )}

      {/* Table Content */}
      <div className="overflow-hidden rounded-xl border border-[#e1e5ea] bg-[#ffffff] shadow-sm">
        {tab === 'worker' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-[#e1e5ea] bg-[#f5f7f9] text-xs font-semibold text-[#5d646c]">
                <tr>
                  <th className="px-5 py-3.5">Mã Công Nợ</th>
                  <th className="px-5 py-3.5">Worker</th>
                  <th className="px-5 py-3.5">Mã Ca Làm</th>
                  <th className="px-5 py-3.5">Số Tiền Nợ</th>
                  <th className="px-5 py-3.5">Hạn Chót</th>
                  <th className="px-5 py-3.5">Trạng Thái Xử Lý</th>
                  <th className="px-5 py-3.5 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e1e5ea]">
                {mockWorkerReceivables.map((rec) => (
                  <tr key={rec.id} className="transition-colors hover:bg-[#f5f7f9]">
                    <td className="px-5 py-4 font-mono text-xs font-semibold text-[#0e1216]">
                      {rec.id}
                    </td>
                    <td className="px-5 py-4 font-medium text-[#0e1216]">
                      {rec.workerName}
                    </td>
                    <td className="px-5 py-4 font-mono text-xs text-blue-600 hover:underline cursor-pointer">
                      {rec.jobId}
                    </td>
                    <td className="px-5 py-4 font-semibold text-[#ff383c]">
                      {formatVND(rec.amount)}
                    </td>
                    <td className="px-5 py-4 text-xs text-[#5d646c]">
                      {rec.dueDate}
                    </td>
                    <td className="px-5 py-4">
                      {getWorkerStatusBadge(rec.status)}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button className="inline-flex items-center gap-1 rounded-lg bg-[#ffb330] px-3 py-1.5 text-xs font-semibold text-[#0e1216] shadow-sm hover:bg-[#e5c105]">
                        <UserCheck size={12} />
                        Đối Soát CK
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-[#e1e5ea] bg-[#f5f7f9] text-xs font-semibold text-[#5d646c]">
                <tr>
                  <th className="px-5 py-3.5">Mã Công Nợ</th>
                  <th className="px-5 py-3.5">Employer Vi Phạm</th>
                  <th className="px-5 py-3.5">Mã Ca Làm</th>
                  <th className="px-5 py-3.5">Tiền Nợ Worker</th>
                  <th className="px-5 py-3.5">Hạn Chót</th>
                  <th className="px-5 py-3.5">Trạng Thái & Liên Hệ</th>
                  <th className="px-5 py-3.5 text-right">Thao Tác Thu Hồi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e1e5ea]">
                {mockEmployerReceivables.map((rec) => (
                  <tr key={rec.id} className="transition-colors hover:bg-[#f5f7f9]">
                    <td className="px-5 py-4 font-mono text-xs font-semibold text-[#0e1216]">
                      {rec.id}
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-medium text-[#0e1216]">{rec.employerName}</div>
                      <div className="text-xs text-[#5d646c]">Liên hệ: {rec.contactStatus}</div>
                    </td>
                    <td className="px-5 py-4 font-mono text-xs text-blue-600 hover:underline cursor-pointer">
                      {rec.jobId}
                    </td>
                    <td className="px-5 py-4 font-semibold text-[#ff383c]">
                      {formatVND(rec.amount)}
                    </td>
                    <td className="px-5 py-4 text-xs text-[#5d646c]">
                      {rec.dueDate}
                    </td>
                    <td className="px-5 py-4">
                      {getEmployerStatusBadge(rec.status)}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="rounded-lg border border-[#e1e5ea] bg-white px-2.5 py-1.5 text-xs font-medium text-[#0e1216] hover:bg-[#f5f7f9]">
                          Ghi Nhận LH
                        </button>
                        <button
                          onClick={() => setShowConfirmModal(rec.id)}
                          className="inline-flex items-center gap-1 rounded-lg bg-[#ffebe6] px-2.5 py-1.5 text-xs font-semibold text-[#ff383c] hover:bg-red-200"
                        >
                          <Ban size={12} />
                          Xác Nhận Cố Ý (DEC-107)
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Confirm Intentional Default */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-[#e1e5ea] bg-white p-6 shadow-2xl">
            <div className="flex items-center gap-3 text-[#ff383c]">
              <ShieldAlert size={24} />
              <h3 className="text-base font-bold text-[#0e1216]">Xác Nhận Cố Ý Không Trả Nợ</h3>
            </div>
            <p className="mt-3 text-xs text-[#5d646c]">
              Hành động này sẽ kích hoạt quy trình thu hồi pháp lý (DEC-107):
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-[#0e1216]">
              <li>Khóa vĩnh viễn tài khoản Employer khỏi nền tảng.</li>
              <li>Tự động khởi tạo Basic Legal Recovery Pack.</li>
              <li>Chuyển thông tin tới bộ phận pháp lý của JobFree.</li>
            </ul>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmModal(null)}
                className="rounded-lg border border-[#e1e5ea] bg-white px-4 py-2 text-xs font-semibold text-[#5d646c] hover:bg-[#f5f7f9]"
              >
                Hủy bỏ
              </button>
              <button
                onClick={() => setShowConfirmModal(null)}
                className="rounded-lg bg-[#ff383c] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-red-700"
              >
                Xác Nhận Khóa & Tạo Legal Pack
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
