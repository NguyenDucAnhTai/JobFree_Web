import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, 
  AlertTriangle, 
  Navigation, 
  CheckCircle2, 
  RefreshCw,
  Sparkles
} from 'lucide-react';

interface LiveJobItem {
  id: string;
  createdAt: string;
  parentService: string;
  subService: string;
  district: string;
  address: string;
  workerName?: string;
  workerAvatar?: string;
  workerStatus: string;
  distanceOrStep?: string;
  countdown: string;
  slaStatus: string;
  slaLevel: 'critical' | 'overload' | 'warning' | 'normal' | 'on_track';
  actionType: 'emergency_assign' | 'manual_assign' | 'direct_offer' | 'view_gps' | 'detail';
}

const mockLiveJobs: LiveJobItem[] = [
  {
    id: '#JOB-10255',
    createdAt: 'Tạo lúc 14:10',
    parentService: 'Thợ Khóa chuyên dụng',
    subService: 'Khóa cửa bị kẹt cấp cứu',
    district: 'P. Thảo Điền, TP. Thủ Đức',
    address: 'Chung cư Masteri An Phú',
    workerStatus: 'Failed 3 broadcast',
    distanceOrStep: 'Không thợ phản hồi',
    countdown: 'Trễ 21 phút',
    slaStatus: 'Vượt SLA 300%',
    slaLevel: 'critical',
    actionType: 'emergency_assign',
  },
  {
    id: '#JOB-10254',
    createdAt: 'Tạo lúc 14:15',
    parentService: 'Điện nước khẩn',
    subService: 'Vỡ đường ống chính tầng trệt',
    district: 'Phú Mỹ Hưng, Quận 7',
    address: 'Khu biệt thự Chateau',
    workerStatus: 'Chưa có thợ nhận',
    distanceOrStep: 'Đang mở rộng bán kính 7km',
    countdown: 'Trễ 14 phút',
    slaStatus: 'Khách khiếu nại',
    slaLevel: 'critical',
    actionType: 'emergency_assign',
  },
  {
    id: '#JOB-10252',
    createdAt: 'Tạo lúc 14:22',
    parentService: 'Thợ điện gia dụng',
    subService: 'Chập điện tủ CB tổng',
    district: 'P. Hiệp Phú, TP. Thủ Đức',
    address: 'Đường Man Thiện',
    workerStatus: 'Thợ từ chối (x2)',
    distanceOrStep: 'Lý do: Đang kẹt đường',
    countdown: 'Trễ 8 phút',
    slaStatus: 'Đang quay vòng ghép',
    slaLevel: 'overload',
    actionType: 'manual_assign',
  },
  {
    id: '#JOB-10250',
    createdAt: 'Tạo lúc 14:28',
    parentService: 'Điện lạnh dân dụng',
    subService: 'Sửa máy lạnh Inverter rò gas',
    district: 'P. Thảo Điền, TP. Thủ Đức',
    address: 'Số 28 Xuân Thủy',
    workerStatus: 'Đang tìm thợ gần (2.5km)',
    distanceOrStep: 'Đã gửi lời mời 3 thợ',
    countdown: 'Còn 2:45 phút',
    slaStatus: 'Trong ngưỡng SLA',
    slaLevel: 'warning',
    actionType: 'direct_offer',
  },
  {
    id: '#JOB-10249',
    createdAt: 'Nhận lúc 14:24',
    parentService: 'Cấp thoát nước',
    subService: 'Xử lý rò rỉ van khóa bồn rửa',
    district: 'P. Bến Nghé, Quận 1',
    address: 'Tòa nhà Vincom Center',
    workerName: 'Lê Văn Cường',
    workerAvatar: 'LC',
    workerStatus: 'Đang đến (1.2km)',
    distanceOrStep: 'Cách điểm hẹn 600m',
    countdown: 'Đến sau 5p',
    slaStatus: 'Đúng lộ trình GPS',
    slaLevel: 'normal',
    actionType: 'view_gps',
  },
  {
    id: '#JOB-10248',
    createdAt: 'Check-in 13:45',
    parentService: 'Dọn dẹp vệ sinh theo giờ',
    subService: 'Dịch vụ Gia đình 2 Giờ',
    district: 'Phú Mỹ Hưng, Quận 7',
    address: 'Chung cư Scenic Valley 2',
    workerName: 'Trần Mai Lan',
    workerAvatar: 'TL',
    workerStatus: 'Đang làm việc',
    distanceOrStep: 'Hoàn thành 3/4 hạng mục',
    countdown: '45 / 120 phút',
    slaStatus: 'Đang thi công',
    slaLevel: 'on_track',
    actionType: 'detail',
  },
];

export const LiveMonitorPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'all' | 'critical' | 'running'>('all');
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  const filteredJobs = mockLiveJobs.filter((job) => {
    if (activeTab === 'critical') return job.slaLevel === 'critical' || job.slaLevel === 'overload';
    if (activeTab === 'running') return job.slaLevel === 'normal' || job.slaLevel === 'on_track';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Header & Realtime Connection Status */}
      <div className="flex flex-col gap-4 rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#8c96a3]">
            <span>ĐIỀU HÀNH CHÍNH</span>
            <span>/</span>
            <span className="text-[#0e1216] font-bold">GIÁM SÁT HIỆN TRƯỜNG REALTIME</span>
          </div>
          <h2 className="mt-1 text-xl font-black text-[#0e1216] tracking-tight">
            Live Operations Monitor
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full bg-[#e6f9ee] px-3 py-1 text-xs font-bold text-[#16a34a] border border-[#b7ebc9]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#16a34a] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#16a34a]"></span>
            </span>
            <span>Core API v2.4 28ms - Live Socket Connected</span>
          </div>
          <div className="text-xs text-[#8c96a3] flex items-center gap-1 font-medium">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>5s</span>
          </div>
        </div>
      </div>

      {/* Heatmap & Density Section (TP.HCM) */}
      <div className="rounded-xl border border-[#e1e5ea] bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e1e5ea] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-[#0e1216]">Bản đồ Mật độ Hiện trường TP.HCM</h3>
              <span className="rounded-full bg-[#fee2e2] px-2.5 py-0.5 text-xs font-bold text-[#e23532] border border-[#fca5a5]">
                2 Zone báo động đỏ
              </span>
            </div>
            <p className="mt-0.5 text-xs text-[#5d646c]">
              Giám sát ranh giới, nhiệt lượng thiếu thợ & trôi đơn theo thời gian thực
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#5d646c]">Lớp hiển thị:</span>
            <div className="flex rounded-lg border border-[#e1e5ea] p-0.5 bg-[#f5f7f9] text-xs font-medium">
              <button className="rounded px-2.5 py-1 bg-white font-bold text-[#0e1216] shadow-xs">Nhu cầu</button>
              <button className="rounded px-2.5 py-1 text-[#5d646c] hover:text-[#0e1216]">Vị trí Thợ</button>
              <button className="rounded px-2.5 py-1 text-[#5d646c] hover:text-[#0e1216]">Quận Huyện</button>
            </div>
          </div>
        </div>

        {/* Zone Cards Visual Grid */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {/* TP. Thủ Đức - Critical */}
          <div 
            onClick={() => setSelectedZone('thuduc')}
            className={`cursor-pointer rounded-xl border p-4 transition-all ${
              selectedZone === 'thuduc' ? 'ring-2 ring-[#e23532]' : ''
            } border-[#fca5a5] bg-[#fff5f5] hover:shadow-md`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#e23532] uppercase tracking-wider">TP. THỦ ĐỨC</span>
              <span className="rounded bg-[#e23532] px-1.5 py-0.5 text-[10px] font-extrabold text-white">CRITICAL</span>
            </div>
            <div className="mt-2 text-sm font-bold text-[#0e1216]">18 việc • 4 quá hạn</div>
            <div className="mt-1 text-xs text-[#8c96a3]">Thảo Điền • Sala • Grand Park</div>
            <div className="mt-3 flex items-center gap-1.5 text-[11px] font-bold text-[#e23532]">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Tỷ lệ Cung/Cầu: 0.28 (Thiếu thợ)</span>
            </div>
          </div>

          {/* Quận 7 - Overload */}
          <div 
            onClick={() => setSelectedZone('q7')}
            className={`cursor-pointer rounded-xl border p-4 transition-all ${
              selectedZone === 'q7' ? 'ring-2 ring-[#b45309]' : ''
            } border-[#fcd34d] bg-[#fffbeb] hover:shadow-md`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#b45309] uppercase tracking-wider">QUẬN 7</span>
              <span className="rounded bg-[#b45309] px-1.5 py-0.5 text-[10px] font-extrabold text-white">OVERLOAD</span>
            </div>
            <div className="mt-2 text-sm font-bold text-[#0e1216]">12 việc • 3 quá hạn</div>
            <div className="mt-1 text-xs text-[#8c96a3]">Phú Mỹ Hưng • Tân Quy</div>
            <div className="mt-3 flex items-center gap-1.5 text-[11px] font-bold text-[#b45309]">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Tỷ lệ Cung/Cầu: 0.42 (Tải cao)</span>
            </div>
          </div>

          {/* Bình Thạnh - Balanced */}
          <div 
            onClick={() => setSelectedZone('binhthanh')}
            className={`cursor-pointer rounded-xl border p-4 transition-all ${
              selectedZone === 'binhthanh' ? 'ring-2 ring-[#16a34a]' : ''
            } border-[#e1e5ea] bg-[#f9fafb] hover:shadow-md`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#0e1216] uppercase tracking-wider">BÌNH THẠNH</span>
              <span className="rounded bg-[#e6f9ee] px-1.5 py-0.5 text-[10px] font-bold text-[#16a34a]">100% Khớp</span>
            </div>
            <div className="mt-2 text-sm font-bold text-[#0e1216]">6 việc • 0 quá hạn</div>
            <div className="mt-1 text-xs text-[#8c96a3]">Thanh Đa • Hàng Xanh</div>
            <div className="mt-3 flex items-center gap-1.5 text-[11px] font-bold text-[#16a34a]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Tỷ lệ Cung/Cầu: 1.15 (Ổn định)</span>
            </div>
          </div>

          {/* Quận 1 (Trung tâm) */}
          <div 
            onClick={() => setSelectedZone('q1')}
            className={`cursor-pointer rounded-xl border p-4 transition-all ${
              selectedZone === 'q1' ? 'ring-2 ring-[#16a34a]' : ''
            } border-[#e1e5ea] bg-[#f9fafb] hover:shadow-md`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#0e1216] uppercase tracking-wider">QUẬN 1</span>
              <span className="rounded bg-[#e6f9ee] px-1.5 py-0.5 text-[10px] font-bold text-[#16a34a]">SLA 99%</span>
            </div>
            <div className="mt-2 text-sm font-bold text-[#0e1216]">8 việc • Đạt chuẩn</div>
            <div className="mt-1 text-xs text-[#8c96a3]">Bến Nghé • Đa Kao</div>
            <div className="mt-3 flex items-center gap-1.5 text-[11px] font-bold text-[#16a34a]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Tỷ lệ Cung/Cầu: 1.85 (Dồi dào)</span>
            </div>
          </div>

          {/* Gò Vấp / Tân Bình */}
          <div 
            onClick={() => setSelectedZone('govap')}
            className={`cursor-pointer rounded-xl border p-4 transition-all ${
              selectedZone === 'govap' ? 'ring-2 ring-[#5d646c]' : ''
            } border-[#e1e5ea] bg-[#f9fafb] hover:shadow-md`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#0e1216] uppercase tracking-wider">GÒ VẤP / TÂN BÌNH</span>
              <span className="rounded bg-[#f0f3f6] px-1.5 py-0.5 text-[10px] font-bold text-[#5d646c]">Tải TB</span>
            </div>
            <div className="mt-2 text-sm font-bold text-[#0e1216]">9 việc • 1 chờ ghép</div>
            <div className="mt-1 text-xs text-[#8c96a3]">Quang Trung • Phan Huy Ích</div>
            <div className="mt-3 flex items-center gap-1.5 text-[11px] font-bold text-[#5d646c]">
              <Activity className="w-3.5 h-3.5" />
              <span>Tỷ lệ Cung/Cầu: 0.95 (Cân bằng)</span>
            </div>
          </div>
        </div>

        {/* Legend & AI Recommendation Box */}
        <div className="mt-5 flex flex-col lg:flex-row items-stretch gap-4 border-t border-[#e1e5ea] pt-4">
          <div className="flex items-center gap-3 text-xs text-[#5d646c] flex-wrap">
            <span className="font-bold text-[#0e1216]">CHÚ DẪN TỶ LỆ CUNG/CẦU (THỢ / VIỆC):</span>
            <span className="flex items-center gap-1">
              <span className="inline-block w-3 h-3 rounded-full bg-[#e23532]"></span> Báo động (&lt; 0.5)
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block w-3 h-3 rounded-full bg-[#f59e0b]"></span> Cân bằng (0.5 - 1.5)
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block w-3 h-3 rounded-full bg-[#10b981]"></span> Dư thợ (&gt; 2.0)
            </span>
          </div>

          <div className="flex-1 rounded-lg bg-[#f0f9ff] border border-[#bae6fd] p-3 text-xs text-[#0369a1] flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-[#0284c7] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Gợi ý thuật toán điều phối tự động:</span> Khu vực TP. Thủ Đức đang thiếu hụt 11 thợ điện lạnh trong bán kính 5km. Khuyến nghị kích hoạt phụ cấp di chuyển liên quận (+30.000đ/job) từ Quận 1 sang Thủ Đức.
            </div>
          </div>
        </div>
      </div>

      {/* Real-time SLA Job Queue Table */}
      <div className="rounded-xl border border-[#e1e5ea] bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e1e5ea] pb-4">
          <div>
            <h3 className="text-base font-bold text-[#0e1216]">
              Hàng đợi Công việc Realtime (12 Quá hạn / 45 Chờ)
            </h3>
            <p className="text-xs text-[#5d646c] mt-0.5">
              Tự động ưu tiên đẩy các đơn trễ SLA lên hàng đầu để can thiệp thủ công
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex rounded-lg border border-[#e1e5ea] p-0.5 bg-[#f5f7f9] text-xs font-semibold">
              <button 
                onClick={() => setActiveTab('all')}
                className={`rounded px-3 py-1.5 transition-all ${
                  activeTab === 'all' ? 'bg-[#0e1216] text-[#fdd506] shadow-xs' : 'text-[#5d646c] hover:text-[#0e1216]'
                }`}
              >
                Tất cả (6)
              </button>
              <button 
                onClick={() => setActiveTab('critical')}
                className={`rounded px-3 py-1.5 transition-all ${
                  activeTab === 'critical' ? 'bg-[#e23532] text-white shadow-xs' : 'text-[#5d646c] hover:text-[#e23532]'
                }`}
              >
                Nguy cấp (3)
              </button>
              <button 
                onClick={() => setActiveTab('running')}
                className={`rounded px-3 py-1.5 transition-all ${
                  activeTab === 'running' ? 'bg-[#16a34a] text-white shadow-xs' : 'text-[#5d646c] hover:text-[#16a34a]'
                }`}
              >
                Đang chạy (3)
              </button>
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#e1e5ea] bg-[#f9fafb] text-[11px] font-extrabold uppercase tracking-wider text-[#5d646c]">
                <th className="py-3 px-4">MÃ JOB</th>
                <th className="py-3 px-4">DỊCH VỤ</th>
                <th className="py-3 px-4">KHU VỰC & ĐỊA CHỈ</th>
                <th className="py-3 px-4">THỢ / TRẠNG THÁI</th>
                <th className="py-3 px-4">ĐẾM NGƯỢC</th>
                <th className="py-3 px-4 text-right">HÀNH ĐỘNG</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e1e5ea]">
              {filteredJobs.map((job) => {
                const isCritical = job.slaLevel === 'critical';
                const isOverload = job.slaLevel === 'overload';

                return (
                  <tr 
                    key={job.id} 
                    className={`transition-colors hover:bg-[#f9fafb] ${
                      isCritical ? 'bg-[#fff5f5]' : isOverload ? 'bg-[#fffbeb]' : ''
                    }`}
                  >
                    {/* Mã Job */}
                    <td className="py-3.5 px-4 font-mono">
                      <div className="font-bold text-[#0e1216]">{job.id}</div>
                      <div className="text-[11px] text-[#8c96a3] mt-0.5">{job.createdAt}</div>
                    </td>

                    {/* Dịch vụ */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#0e1216]">{job.parentService}</div>
                      <div className="text-[11px] text-[#5d646c] mt-0.5">{job.subService}</div>
                    </td>

                    {/* Địa chỉ */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-[#0e1216]">{job.district}</div>
                      <div className="text-[11px] text-[#8c96a3] mt-0.5">{job.address}</div>
                    </td>

                    {/* Thợ / Trạng thái */}
                    <td className="py-3.5 px-4">
                      {job.workerName ? (
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0e1216] text-[11px] font-bold text-[#fdd506]">
                            {job.workerAvatar}
                          </div>
                          <div>
                            <div className="font-bold text-[#0e1216]">{job.workerName}</div>
                            <div className="text-[11px] text-[#16a34a] font-semibold">{job.workerStatus}</div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className={`font-bold ${isCritical ? 'text-[#e23532]' : isOverload ? 'text-[#b45309]' : 'text-[#0e1216]'}`}>
                            {job.workerStatus}
                          </div>
                          <div className="text-[11px] text-[#8c96a3] mt-0.5">{job.distanceOrStep}</div>
                        </div>
                      )}
                    </td>

                    {/* Đếm ngược & SLA */}
                    <td className="py-3.5 px-4">
                      <div className={`font-black ${
                        isCritical ? 'text-[#e23532]' : isOverload ? 'text-[#b45309]' : 'text-[#0e1216]'
                      }`}>
                        {job.countdown}
                      </div>
                      <div className="text-[11px] text-[#5d646c] font-medium mt-0.5">{job.slaStatus}</div>
                    </td>

                    {/* Hành động */}
                    <td className="py-3.5 px-4 text-right">
                      {job.actionType === 'emergency_assign' && (
                        <button 
                          onClick={() => navigate(`/admin/manual-assignment?jobId=${job.id.replace('#JOB-', 'J')}&priority=emergency`)}
                          className="rounded-lg bg-[#e23532] px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-[#c82320] transition-colors cursor-pointer"
                        >
                          Gán khẩn cấp
                        </button>
                      )}
                      {job.actionType === 'manual_assign' && (
                        <button 
                          onClick={() => navigate(`/admin/manual-assignment?jobId=${job.id.replace('#JOB-', 'J')}`)}
                          className="rounded-lg bg-[#f59e0b] px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-[#d97706] transition-colors cursor-pointer"
                        >
                          Gán thủ công
                        </button>
                      )}
                      {job.actionType === 'direct_offer' && (
                        <button 
                          onClick={() => navigate(`/admin/manual-assignment?jobId=${job.id.replace('#JOB-', 'J')}`)}
                          className="rounded-lg bg-[#0e1216] px-3.5 py-1.5 text-xs font-bold text-[#fdd506] shadow-xs hover:bg-gray-800 transition-colors cursor-pointer"
                        >
                          Chỉ định
                        </button>
                      )}
                      {job.actionType === 'view_gps' && (
                        <button className="rounded-lg border border-[#0e1216] bg-white px-3.5 py-1.5 text-xs font-bold text-[#0e1216] shadow-xs hover:bg-[#f5f7f9] transition-colors flex items-center gap-1.5 ml-auto">
                          <Navigation className="w-3.5 h-3.5" />
                          <span>Xem GPS</span>
                        </button>
                      )}
                      {job.actionType === 'detail' && (
                        <button className="rounded-lg border border-[#e1e5ea] bg-white px-3.5 py-1.5 text-xs font-bold text-[#5d646c] shadow-xs hover:bg-[#f5f7f9] hover:text-[#0e1216] transition-colors">
                          Chi tiết
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer info & Pagination */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#e1e5ea] pt-3.5 text-xs text-[#8c96a3]">
          <div>
            Hiển thị 1 - 6 trên tổng số 387 công việc hiện trường • Tự động đồng bộ mỗi 5 giây
          </div>
          <div className="font-medium text-[#0e1216]">
            Trang 1 / 64
          </div>
        </div>
      </div>
    </div>
  );
};
