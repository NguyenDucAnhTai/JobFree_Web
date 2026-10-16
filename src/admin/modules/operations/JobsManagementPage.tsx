import React, { useState } from 'react';
import { Search, Filter, Eye, UserPlus, XCircle } from 'lucide-react';
import { JobDetailDrawer } from './JobDetailDrawer';

interface JobItem {
  id: string;
  service: string;
  subService?: string;
  employer: string;
  worker?: string;
  location: string;
  tier: 'Normal' | 'Fast' | 'Instant';
  price: number;
  status: 'Waiting' | 'Matched' | 'In Progress' | 'Completed' | 'Cancelled' | 'Disputed';
  createdAt: string;
}

const mockJobs: JobItem[] = [
  {
    id: 'J10250',
    service: 'Phụ kho', subService: 'Kiểm đếm',
    employer: 'Đặng Thị Lan',
    location: 'Quận 1, TP.HCM',
    tier: 'Instant',
    status: 'Waiting',
    price: 230000,
    createdAt: '2026-10-08 14:00',
  },
  {
    id: 'J10251',
    service: 'Phụ shop & livestream', subService: 'Đóng gói & chốt đơn',
    employer: 'Nguyễn Minh Anh',
    worker: 'Trần Văn Long',
    location: 'Bình Thạnh, TP.HCM',
    tier: 'Normal',
    status: 'Disputed',
    price: 180000,
    createdAt: '2026-10-08 09:00',
  },
  {
    id: 'J10252',
    service: 'Dọn sân vườn/sân thượng', subService: 'Dọn cỏ & cắt tỉa',
    employer: 'Trần Hoàng Phúc',
    worker: 'Lê Thị Thu',
    location: 'Quận 3, TP.HCM',
    tier: 'Fast',
    status: 'In Progress',
    price: 215000,
    createdAt: '2026-10-08 13:00',
  },
  {
    id: 'J10253',
    service: 'Setup tiệc tại gia', subService: 'Phục vụ bàn',
    employer: 'Vũ Thanh Hằng',
    worker: 'Đỗ Quốc Tuấn',
    location: 'Phú Nhuận, TP.HCM',
    tier: 'Normal',
    status: 'Completed',
    price: 350000,
    createdAt: '2026-10-07 18:00',
  },
];

const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
  'Waiting': { bg: 'bg-[#fef3c7]', text: 'text-[#b45309]', label: 'Waiting' },
  'Matched': { bg: 'bg-[#e0f2fe]', text: 'text-[#0284c7]', label: 'Matched' },
  'In Progress': { bg: 'bg-[#e0f2fe]', text: 'text-[#0284c7]', label: 'In Progress' },
  'Completed': { bg: 'bg-[#e6f9ee]', text: 'text-[#16a34a]', label: 'Completed' },
  'Cancelled': { bg: 'bg-[#eff2f5]', text: 'text-[#5d646c]', label: 'Cancelled' },
  'Disputed': { bg: 'bg-[#fee2e2]', text: 'text-[#e23532]', label: 'Disputed' },
};

const TABS = ['All', 'Waiting', 'Matched', 'In Progress', 'Completed', 'Cancelled', 'Disputed'];

export const JobsManagementPage: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<JobItem | null>(null);
  const [activeTab, setActiveTab] = useState('All');
  const [filterService, setFilterService] = useState('all');
  const [filterLocation, setFilterLocation] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = mockJobs.filter((j) => {
    if (activeTab !== 'All' && j.status !== activeTab) return false;
    if (filterService !== 'all' && j.service !== filterService) return false;
    if (filterLocation !== 'all' && !j.location.includes(filterLocation)) return false;
    if (search && !j.id.toLowerCase().includes(search.toLowerCase()) && !j.employer.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-xl border border-[#e1e5ea] bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#0e1216]">Quản lý Công việc (Jobs & Shifts)</h2>
          <p className="mt-1 text-xs text-[#5d646c]">
            Theo dõi trạng thái ca làm, tiền đang giữ theo job (fund holds) và kiểm tra check-in theo hợp đồng API.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#e1e5ea] pb-2">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-bold rounded-t-lg transition ${
              activeTab === tab
                ? 'bg-white text-[#0e1216] border border-b-0 border-[#e1e5ea]'
                : 'text-[#5d646c] hover:bg-[#f5f7f9]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filter and Search */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-[#e1e5ea] bg-white p-4 shadow-sm">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5d646c]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo Job ID, tên Employer..."
            className="w-full rounded-lg border border-[#e1e5ea] bg-[#f5f7f9] py-2 pl-9 pr-3 text-xs text-[#0e1216] placeholder-[#5d646c] outline-none focus:border-[#0e1216] focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-[#5d646c]" />
          <select
            value={filterService}
            onChange={(e) => setFilterService(e.target.value)}
            className="rounded-lg border border-[#e1e5ea] bg-[#f5f7f9] px-3 py-2 text-xs font-medium text-[#0e1216] outline-none focus:border-[#0e1216]"
          >
            <option value="all">Tất cả service</option>
            <option value="Phụ kho nhẹ">Phụ kho nhẹ</option>
            <option value="Phụ shop & livestream">Phụ shop & livestream</option>
            <option value="Daily Helper - Việc nhà">Daily Helper - Việc nhà</option>
            <option value="Setup tiệc tại gia">Setup tiệc tại gia</option>
          </select>

          <select
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
            className="rounded-lg border border-[#e1e5ea] bg-[#f5f7f9] px-3 py-2 text-xs font-medium text-[#0e1216] outline-none focus:border-[#0e1216]"
          >
            <option value="all">Tất cả khu vực</option>
            <option value="Quận 1">Quận 1</option>
            <option value="Quận 3">Quận 3</option>
            <option value="Bình Thạnh">Bình Thạnh</option>
            <option value="Phú Nhuận">Phú Nhuận</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-[#e1e5ea] bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[#e1e5ea] bg-[#f5f7f9] text-[11px] font-bold uppercase tracking-wider text-[#5d646c]">
            <tr>
              <th className="py-3 px-4">Job ID</th>
              <th className="py-3 px-4">Service</th>
              <th className="py-3 px-4">Employer</th>
              <th className="py-3 px-4">Worker</th>
              <th className="py-3 px-4">Khu vực</th>
              <th className="py-3 px-4">Priority</th>
              <th className="py-3 px-4">Giá</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Tạo lúc</th>
              <th className="py-3 px-4 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e1e5ea] text-xs">
            {filtered.map((j) => {
              const statusCfg = statusStyles[j.status] || { bg: 'bg-gray-100', text: 'text-gray-800', label: j.status };
              return (
                <tr key={j.id} className="transition hover:bg-[#f9fafb]">
                  <td className="py-3.5 px-4 font-bold text-[#0e1216]">{j.id}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-[#0e1216]">{j.service}</div>
                    {j.subService && <div className="text-xs text-[#5d646c]">{j.subService}</div>}
                  </td>
                  <td className="py-3.5 px-4 text-[#5d646c]">{j.employer}</td>
                  <td className="py-3.5 px-4 text-[#0e1216]">{j.worker || <span className="text-[#8c96a3]">Chưa có</span>}</td>
                  <td className="py-3.5 px-4 text-[#5d646c]">{j.location}</td>
                  <td className="py-3.5 px-4">
                    <span className="rounded bg-[#eff2f5] px-2 py-0.5 font-bold text-[#0e1216]">{j.tier}</span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#0e1216]">
                    {j.price.toLocaleString('vi-VN')} đ
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-block rounded px-2 py-0.5 text-[11px] font-bold ${statusCfg.bg} ${statusCfg.text}`}>
                      {statusCfg.label}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[#5d646c]">{j.createdAt}</td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedJob(j)}
                        className="inline-flex items-center gap-1 rounded-lg border border-[#e1e5ea] bg-[#f5f7f9] px-2 py-1 text-xs font-bold text-[#0e1216] hover:bg-[#e7ecf0]"
                        title="Xem"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      <button
                        className="inline-flex items-center gap-1 rounded-lg border border-[#e1e5ea] bg-[#fef3c7] px-2 py-1 text-xs font-bold text-[#b45309] hover:bg-yellow-200"
                        title="Assign"
                      >
                        <UserPlus className="h-3.5 w-3.5" />
                      </button>
                      <button
                        className="inline-flex items-center gap-1 rounded-lg border border-[#e1e5ea] bg-[#fee2e2] px-2 py-1 text-xs font-bold text-[#e23532] hover:bg-red-200"
                        title="Cancel"
                      >
                        <XCircle className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selectedJob && (
        <JobDetailDrawer
          job={selectedJob}
          isOpen={!!selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </div>
  );
};
