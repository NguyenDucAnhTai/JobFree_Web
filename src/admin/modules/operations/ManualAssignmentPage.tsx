import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Send, XCircle, CheckCircle2 } from 'lucide-react';

interface JobAssignmentData {
  id: string;
  title: string;
  subService: string;
  district: string;
  priority: string;
  priorityBadgeColor: string;
  overdue: string;
  employer: string;
  price: string;
  createdAt: string;
}

const waitingJobsList: JobAssignmentData[] = [
  {
    id: 'J10246',
    title: 'Kiểm đếm',
    subService: 'Phụ kho',
    district: 'Quận 7',
    priority: 'Tức thì',
    priorityBadgeColor: 'bg-[#fee2e2] text-[#e23532]',
    overdue: 'Quá hạn 8 phút',
    employer: 'Lê Thanh Hương',
    price: '350.000₫',
    createdAt: '2026-06-24 09:30',
  },
  {
    id: 'J10250',
    title: 'Kiểm đếm',
    subService: 'Phụ kho',
    district: 'Bình Tân',
    priority: 'Tức thì',
    priorityBadgeColor: 'bg-[#fee2e2] text-[#e23532]',
    overdue: 'Quá hạn 12 phút',
    employer: 'Đặng Thị Lan',
    price: '300.000₫',
    createdAt: '2026-06-24 10:15',
  },
  {
    id: 'J10255',
    title: 'Khóa cửa bị kẹt cấp cứu',
    subService: 'Thợ Khóa chuyên dụng',
    district: 'P. Thảo Điền, TP. Thủ Đức',
    priority: 'Khẩn cấp',
    priorityBadgeColor: 'bg-[#fee2e2] text-[#e23532]',
    overdue: 'Quá hạn 21 phút',
    employer: 'Bùi Tuấn Kiệt',
    price: '450.000₫',
    createdAt: '2026-06-24 14:10',
  },
  {
    id: 'J10254',
    title: 'Vỡ đường ống chính tầng trệt',
    subService: 'Điện nước khẩn',
    district: 'Phú Mỹ Hưng, Quận 7',
    priority: 'Khẩn cấp',
    priorityBadgeColor: 'bg-[#fee2e2] text-[#e23532]',
    overdue: 'Quá hạn 14 phút',
    employer: 'Phạm Quốc Việt',
    price: '500.000₫',
    createdAt: '2026-06-24 14:15',
  },
];

export const ManualAssignmentPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const queryJobId = searchParams.get('jobId');

  const [selectedJobId, setSelectedJobId] = useState<string>(() => {
    if (queryJobId && waitingJobsList.some(j => j.id === queryJobId)) {
      return queryJobId;
    }
    return 'J10246';
  });

  useEffect(() => {
    if (queryJobId && waitingJobsList.some(j => j.id === queryJobId)) {
      setSelectedJobId(queryJobId);
    }
  }, [queryJobId]);

  const currentJob = waitingJobsList.find(j => j.id === selectedJobId) || waitingJobsList[0];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-[#e1e5ea] bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-[#0e1216]">Manual Job Assignment</h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column: Jobs cần gán */}
        <div className="w-full lg:w-[340px] rounded-xl border border-[#e1e5ea] bg-white p-6 shadow-sm">
          <h3 className="mb-4 font-bold text-[#0e1216]">
            Jobs cần gán <span className="text-xs font-normal text-[#5d646c] ml-2">{waitingJobsList.length} jobs đang chờ</span>
          </h3>
          <div className="space-y-4">
            {waitingJobsList.map((job) => {
              const isSelected = selectedJobId === job.id;
              return (
                <div 
                  key={job.id}
                  className={`cursor-pointer rounded-lg border p-4 transition-all ${
                    isSelected ? 'border-[#0e1216] bg-[#f5f7f9] shadow-xs' : 'border-[#e1e5ea] hover:border-[#8c96a3]'
                  }`}
                  onClick={() => setSelectedJobId(job.id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-[#0e1216]">{job.id} — {job.title}</h4>
                      <p className="text-xs text-[#5d646c] mt-0.5">{job.subService} · {job.district}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold ${job.priorityBadgeColor}`}>
                        {job.priority}
                      </span>
                      <p className="text-xs font-semibold text-[#e23532] mt-1">{job.overdue}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: flex-1 */}
        <div className="flex-1 space-y-6">
          {/* Detail Job Card */}
          <div className="rounded-xl border border-[#e1e5ea] bg-white p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-[#0e1216]">{currentJob.id} — {currentJob.title}</h3>
                <p className="text-sm text-[#5d646c] mt-1">{currentJob.subService} · {currentJob.district}</p>
              </div>
              <div className="text-right">
                <span className={`inline-block rounded px-2 py-1 text-xs font-bold mr-2 ${currentJob.priorityBadgeColor}`}>
                  {currentJob.priority}
                </span>
                <span className="inline-block rounded bg-[#fef3c7] px-2 py-1 text-xs font-bold text-[#b45309]">
                  Waiting
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm border-t border-[#e1e5ea] pt-4">
              <div>
                <span className="text-[#8c96a3] block mb-1">Employer:</span> 
                <span className="font-medium text-[#0e1216]">{currentJob.employer}</span>
              </div>
              <div>
                <span className="text-[#8c96a3] block mb-1">Giá:</span> 
                <span className="font-medium text-[#0e1216]">{currentJob.price}</span>
              </div>
              <div>
                <span className="text-[#8c96a3] block mb-1">Tạo lúc:</span> 
                <span className="font-medium text-[#0e1216]">{currentJob.createdAt}</span>
              </div>
              <div>
                <span className="text-[#8c96a3] block mb-1">Thời gian còn lại:</span> 
                <span className="font-medium text-[#e23532]">{currentJob.overdue}</span>
              </div>
            </div>
          </div>

          {/* Workers list */}
          <div className="rounded-xl border border-[#e1e5ea] bg-white p-6 shadow-sm">
            <h3 className="mb-1 font-bold text-[#0e1216]">Workers được đề xuất</h3>
            <p className="text-xs text-[#5d646c] mb-4">Xếp hạng theo khoảng cách, rating, và tỷ lệ hoàn thành</p>
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {/* Worker 1 - Active */}
              <div className="rounded-lg border border-[#e1e5ea] p-4 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-[#0e1216]">Trần Quốc Bảo</h4>
                        <span className="rounded bg-[#e6f9ee] px-2 py-0.5 text-[10px] font-bold text-[#16a34a]">Active</span>
                      </div>
                      <p className="text-xs text-[#5d646c] mt-1">0.8 km · 2 phút trước</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 rounded bg-[#f5f7f9] p-2 text-center text-xs mb-4">
                    <div>
                      <p className="text-[#5d646c]">Rating</p>
                      <p className="font-bold text-[#0e1216]">4.9★</p>
                    </div>
                    <div>
                      <p className="text-[#5d646c]">Hoàn thành</p>
                      <p className="font-bold text-[#0e1216]">92%</p>
                    </div>
                    <div>
                      <p className="text-[#5d646c]">No-show</p>
                      <p className="font-bold text-[#0e1216]">0%</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 inline-flex justify-center items-center gap-1 rounded-lg bg-[#0e1216] px-3 py-2 text-xs font-bold text-white hover:bg-gray-800">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Assign
                  </button>
                  <button className="flex-1 inline-flex justify-center items-center gap-1 rounded-lg border border-[#e1e5ea] px-3 py-2 text-xs font-bold text-[#0e1216] hover:bg-gray-50">
                    <Send className="h-3.5 w-3.5" /> Mời job
                  </button>
                </div>
              </div>

              {/* Worker 2 - Active */}
              <div className="rounded-lg border border-[#e1e5ea] p-4 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-[#0e1216]">Võ Gia Hân</h4>
                        <span className="rounded bg-[#e6f9ee] px-2 py-0.5 text-[10px] font-bold text-[#16a34a]">Active</span>
                      </div>
                      <p className="text-xs text-[#5d646c] mt-1">1.4 km · 8 phút trước</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 rounded bg-[#f5f7f9] p-2 text-center text-xs mb-4">
                    <div>
                      <p className="text-[#5d646c]">Rating</p>
                      <p className="font-bold text-[#0e1216]">4.7★</p>
                    </div>
                    <div>
                      <p className="text-[#5d646c]">Hoàn thành</p>
                      <p className="font-bold text-[#0e1216]">88%</p>
                    </div>
                    <div>
                      <p className="text-[#5d646c]">No-show</p>
                      <p className="font-bold text-[#0e1216]">2%</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 inline-flex justify-center items-center gap-1 rounded-lg bg-[#0e1216] px-3 py-2 text-xs font-bold text-white hover:bg-gray-800">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Assign
                  </button>
                  <button className="flex-1 inline-flex justify-center items-center gap-1 rounded-lg border border-[#e1e5ea] px-3 py-2 text-xs font-bold text-[#0e1216] hover:bg-gray-50">
                    <Send className="h-3.5 w-3.5" /> Mời job
                  </button>
                </div>
              </div>

              {/* Worker 3 - Busy */}
              <div className="rounded-lg border border-[#e1e5ea] p-4 opacity-75 bg-[#fcfdfe] flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-[#5d646c]">Phạm Hoàng Nam</h4>
                        <span className="rounded bg-[#fee2e2] px-2 py-0.5 text-[10px] font-bold text-[#e23532]">Busy</span>
                      </div>
                      <p className="text-xs text-[#5d646c] mt-1">2.6 km · 20 phút trước</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 rounded bg-[#f5f7f9] p-2 text-center text-xs mb-2">
                    <div>
                      <p className="text-[#5d646c]">Rating</p>
                      <p className="font-medium text-[#5d646c]">4.2★</p>
                    </div>
                    <div>
                      <p className="text-[#5d646c]">Hoàn thành</p>
                      <p className="font-medium text-[#5d646c]">90%</p>
                    </div>
                    <div>
                      <p className="text-[#5d646c]">No-show</p>
                      <p className="font-medium text-[#5d646c]">1%</p>
                    </div>
                  </div>
                  <div className="text-[11px] text-[#e23532] font-semibold flex items-center gap-1 mb-4">
                    <XCircle className="h-3.5 w-3.5" /> Đang bận (Busy)
                  </div>
                </div>
                <div className="flex gap-2">
                  <button disabled className="flex-1 inline-flex justify-center items-center gap-1 rounded-lg bg-gray-200 px-3 py-2 text-xs font-bold text-gray-400 cursor-not-allowed">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Assign
                  </button>
                  <button disabled className="flex-1 inline-flex justify-center items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-xs font-bold text-gray-400 cursor-not-allowed">
                    <Send className="h-3.5 w-3.5" /> Mời job
                  </button>
                </div>
              </div>

              {/* Worker 4 - Too far */}
              <div className="rounded-lg border border-[#e1e5ea] p-4 opacity-75 bg-[#fcfdfe] flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-[#5d646c]">Bùi Khánh Linh</h4>
                        <span className="rounded bg-[#e6f9ee] px-2 py-0.5 text-[10px] font-bold text-[#16a34a]">Active</span>
                      </div>
                      <p className="text-xs text-[#5d646c] mt-1">3.8 km · 1 giờ trước</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 rounded bg-[#f5f7f9] p-2 text-center text-xs mb-2">
                    <div>
                      <p className="text-[#5d646c]">Rating</p>
                      <p className="font-medium text-[#5d646c]">3.9★</p>
                    </div>
                    <div>
                      <p className="text-[#5d646c]">Hoàn thành</p>
                      <p className="font-medium text-[#5d646c]">85%</p>
                    </div>
                    <div>
                      <p className="text-[#5d646c]">No-show</p>
                      <p className="font-medium text-[#5d646c]">5%</p>
                    </div>
                  </div>
                  <div className="text-[11px] text-[#e23532] font-semibold flex items-center gap-1 mb-4">
                    <XCircle className="h-3.5 w-3.5" /> Cách quá xa khu vực job
                  </div>
                </div>
                <div className="flex gap-2">
                  <button disabled className="flex-1 inline-flex justify-center items-center gap-1 rounded-lg bg-gray-200 px-3 py-2 text-xs font-bold text-gray-400 cursor-not-allowed">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Assign
                  </button>
                  <button disabled className="flex-1 inline-flex justify-center items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-xs font-bold text-gray-400 cursor-not-allowed">
                    <Send className="h-3.5 w-3.5" /> Mời job
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
