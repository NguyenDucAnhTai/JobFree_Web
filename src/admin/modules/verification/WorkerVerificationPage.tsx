import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

interface WorkerRequest {
  id: string;
  name: string;
  zone: string;
  submittedAt: string;
  status: 'Pending' | 'Need more info' | 'Rejected';
  phone: string;
  dob: string;
  gender: string;
  cccd: string;
}

const mockRequests: WorkerRequest[] = [
  { id: 'U004', name: 'Phạm Hoàng Nam', zone: 'Gò Vấp', submittedAt: '2026-06-23 18:00', status: 'Pending', phone: '0904 567 890', dob: '12/08/1998', gender: 'Nam', cccd: '0790•••••1234' },
  { id: 'U005', name: 'Cao Thị Mỹ Duyên', zone: 'Quận 1', submittedAt: '2026-06-23 16:40', status: 'Pending', phone: '0905 123 456', dob: '20/10/1995', gender: 'Nữ', cccd: '0791•••••5678' },
  { id: 'U006', name: 'Lý Minh Hiếu', zone: 'Bình Thạnh', submittedAt: '2026-06-23 14:20', status: 'Need more info', phone: '0906 234 567', dob: '15/05/2000', gender: 'Nam', cccd: '0792•••••9012' },
  { id: 'U007', name: 'Hồ Trung Kiên', zone: 'Thủ Đức', submittedAt: '2026-06-23 09:00', status: 'Pending', phone: '0907 345 678', dob: '08/03/1992', gender: 'Nam', cccd: '0793•••••3456' },
  { id: 'U008', name: 'Hoàng Văn Đức', zone: 'Bình Tân', submittedAt: '2026-06-22 11:00', status: 'Rejected', phone: '0908 456 789', dob: '25/12/1988', gender: 'Nam', cccd: '0794•••••7890' },
];

export const WorkerVerificationPage: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('U004');
  
  const selectedWorker = mockRequests.find(w => w.id === selectedId) || mockRequests[0];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-xs font-semibold">Pending</span>;
      case 'Need more info':
        return <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs font-semibold">Need more info</span>;
      case 'Rejected':
        return <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs font-semibold">Rejected</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#f5f7f9] min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Worker Verification</h1>

      <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-120px)]">
        {/* Left Column: Queue */}
        <div className="w-full md:w-[320px] bg-white border border-[#e1e5ea] rounded shadow-sm flex flex-col h-full overflow-hidden shrink-0">
          <div className="p-4 border-b border-[#e1e5ea] flex justify-between items-center bg-gray-50">
            <h2 className="font-bold text-gray-800">Queue</h2>
            <span className="text-xs text-gray-500 font-medium">5 workers chờ xét duyệt</span>
          </div>
          <div className="overflow-y-auto flex-1">
            {mockRequests.map((worker) => (
              <button
                key={worker.id}
                onClick={() => setSelectedId(worker.id)}
                className={`w-full text-left p-4 border-b border-[#e1e5ea] transition-colors hover:bg-gray-50 ${selectedId === worker.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''}`}
              >
                <div className="font-semibold text-gray-900">{worker.name}</div>
                <div className="text-sm text-gray-500 mt-1">{worker.zone} · {worker.submittedAt}</div>
                <div className="mt-2">{getStatusBadge(worker.status)}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="flex-1 bg-white border border-[#e1e5ea] rounded shadow-sm flex flex-col h-full overflow-hidden">
          <div className="p-6 border-b border-[#e1e5ea] flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{selectedWorker.name}</h2>
              <div className="text-sm text-gray-500 mt-1">
                {selectedWorker.id} · {selectedWorker.phone} · {selectedWorker.zone}
              </div>
            </div>
            <div>{getStatusBadge(selectedWorker.status)}</div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {/* Photos */}
            <div className="flex flex-col xl:flex-row gap-6 mb-8">
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">CCCD - Mặt trước</h3>
                <div className="border border-gray-300 rounded bg-gray-100 h-48 flex items-center justify-center relative overflow-hidden group">
                   <div className="text-gray-400">Ảnh CCCD</div>
                   <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <span className="text-white font-medium">Xem lớn</span>
                   </div>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Selfie xác minh</h3>
                <div className="border border-gray-300 rounded bg-gray-100 h-48 flex items-center justify-center relative overflow-hidden group">
                   <div className="text-gray-400">Ảnh Selfie</div>
                   <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <span className="text-white font-medium">Xem lớn</span>
                   </div>
                </div>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
              <div className="p-4 bg-gray-50 border border-gray-100 rounded">
                <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  VNeID
                </div>
                <div className="font-medium text-green-700">Đã đối chiếu</div>
              </div>
              <div className="p-4 bg-gray-50 border border-gray-100 rounded">
                <div className="text-xs text-gray-500 mb-1">Họ tên</div>
                <div className="font-medium text-gray-900">{selectedWorker.name}</div>
              </div>
              <div className="p-4 bg-gray-50 border border-gray-100 rounded">
                <div className="text-xs text-gray-500 mb-1">Khu vực</div>
                <div className="font-medium text-gray-900">{selectedWorker.zone}</div>
              </div>
              <div className="p-4 bg-gray-50 border border-gray-100 rounded">
                <div className="text-xs text-gray-500 mb-1">Ngày sinh</div>
                <div className="font-medium text-gray-900">{selectedWorker.dob}</div>
              </div>
              <div className="p-4 bg-gray-50 border border-gray-100 rounded">
                <div className="text-xs text-gray-500 mb-1">Giới tính</div>
                <div className="font-medium text-gray-900">{selectedWorker.gender}</div>
              </div>
              <div className="p-4 bg-gray-50 border border-gray-100 rounded">
                <div className="text-xs text-gray-500 mb-1">Số CCCD</div>
                <div className="font-medium text-gray-900">{selectedWorker.cccd}</div>
              </div>
            </div>

            {/* Note & Actions */}
            <div className="border-t border-[#e1e5ea] pt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Internal note</h3>
              <textarea 
                className="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 mb-4 min-h-[100px]"
                placeholder="Ghi chú nội bộ cho lần xét duyệt này…"
              ></textarea>
              <div className="flex justify-end items-center gap-3">
                <button className="px-4 py-2 border border-yellow-400 bg-yellow-50 text-yellow-700 font-semibold rounded shadow-sm hover:bg-yellow-100">
                  Yêu cầu bổ sung
                </button>
                <button className="px-4 py-2 border border-red-200 bg-white text-red-600 font-semibold rounded shadow-sm hover:bg-red-50">
                  Reject
                </button>
                <button className="px-6 py-2 bg-black text-white font-semibold rounded shadow-sm hover:bg-gray-800">
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
