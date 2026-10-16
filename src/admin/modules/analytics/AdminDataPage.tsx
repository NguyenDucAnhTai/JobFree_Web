import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  BarChart3,
  DollarSign,
  CreditCard,
  Briefcase,
  AlertTriangle,
  Zap,
  Users,
  UserCheck,
  RotateCcw,
  Layers,
  MapPin,
  Activity,
  FileSpreadsheet,
  Download,
  Search,
  Table,
} from 'lucide-react';

import {
  DataOverviewView,
  RevenueManagementView,
  RevenueReconciliationView,
  PayOSRealtimeView,
  PaymentInsightsView,
  JobAnalyticsView,
  DisputeAnalyticsView,
  UrgentFeeAnalyticsView,
  EmployerAnalyticsView,
  WorkerAnalyticsView,
  RetentionAnalyticsView,
  ServiceAnalyticsView,
  AreaAnalyticsView,
  SupplyDemandAnalyticsView,
  ReportsSummaryView,
} from './views';

export type AdminDataTab =
  | 'overview'
  | 'revenue'
  | 'reconciliation'
  | 'payos-realtime'
  | 'payment-insights'
  | 'job-analytics'
  | 'disputes'
  | 'urgent-fee'
  | 'employers'
  | 'workers'
  | 'retention'
  | 'services'
  | 'areas'
  | 'supply-demand'
  | 'reports';

interface MenuSubItem {
  id: AdminDataTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface MenuGroup {
  group: string;
  items: MenuSubItem[];
}

const menuGroups: MenuGroup[] = [
  {
    group: 'TỔNG QUAN',
    items: [
      { id: 'overview', label: 'Tổng quan dữ liệu', icon: BarChart3 },
    ],
  },
  {
    group: 'DÒNG TIỀN',
    items: [
      { id: 'revenue', label: 'Doanh thu & Tổng hợp', icon: DollarSign },
      { id: 'reconciliation', label: 'COD & Đối soát tháng', icon: Table },
      { id: 'payos-realtime', label: 'PayOS Realtime', icon: CreditCard },
      { id: 'payment-insights', label: 'Payment Insights', icon: Activity },
    ],
  },
  {
    group: 'HOẠT ĐỘNG',
    items: [
      { id: 'job-analytics', label: 'Job Analytics', icon: Briefcase },
      { id: 'disputes', label: 'Hủy & tranh chấp', icon: AlertTriangle },
      { id: 'urgent-fee', label: 'Gói ưu tiên', icon: Zap },
    ],
  },
  {
    group: 'NGƯỜI DÙNG',
    items: [
      { id: 'employers', label: 'Employer Analytics', icon: Users },
      { id: 'workers', label: 'Worker Analytics', icon: UserCheck },
      { id: 'retention', label: 'Retention Cohort', icon: RotateCcw },
    ],
  },
  {
    group: 'DỊCH VỤ & KHU VỰC',
    items: [
      { id: 'services', label: 'Dịch vụ phổ biến', icon: Layers },
      { id: 'areas', label: 'Khu vực hoạt động', icon: MapPin },
      { id: 'supply-demand', label: 'Cung cầu Worker', icon: Activity },
    ],
  },
  {
    group: 'BÁO CÁO & DỮ LIỆU',
    items: [
      { id: 'reports', label: 'Báo cáo & Export', icon: FileSpreadsheet },
    ],
  },
];

export const AdminDataPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = (searchParams.get('tab') as AdminDataTab) || 'overview';
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const handleSelectTab = (tab: AdminDataTab) => {
    setSearchParams({ tab });
  };

  const handleExport = () => {
    setExportNotice(
      'Đã gửi yêu cầu xuất dữ liệu toàn cảnh hệ thống (DEC-101/104). Link tải có hiệu lực 24 giờ, dữ liệu tự xóa sau 7 ngày.'
    );
    setTimeout(() => setExportNotice(null), 5000);
  };

  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-6">
      {/* Top Banner matching Penpot "JobFree Admin Data · Analytics read-only" */}
      <div className="flex flex-col gap-4 rounded-xl border border-[#e1e5ea] bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0e1216] font-black text-[#fdd506] shadow-sm">
            DA
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl font-bold tracking-tight text-[#0e1216]">
                JobFree Admin Data
              </h1>
              <span className="rounded-full bg-[#e0f2fe] px-2.5 py-0.5 text-xs font-bold text-[#0284c7]">
                Analytics read-only
              </span>
              <span className="rounded bg-[#f5f7f9] px-2 py-0.5 text-[11px] font-semibold text-[#5d646c]">
                DEC-104 compliant
              </span>
            </div>
            <p className="mt-0.5 text-xs text-[#5d646c]">
              Bảng điều khiển 17 màn hình phân tích dữ liệu, đối soát dòng tiền payOS và giám sát thị trường (Penpot AD Prototype).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#5d646c]" />
            <input
              type="text"
              placeholder="Tìm kiếm chỉ số…"
              className="w-48 rounded-lg border border-[#e1e5ea] bg-[#f5f7f9] py-1.5 pl-8 pr-3 text-xs text-[#0e1216] outline-none transition focus:border-[#0e1216] focus:bg-white"
            />
          </div>
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 rounded-lg border border-[#e1e5ea] bg-[#0e1216] px-3.5 py-1.5 text-xs font-bold text-white transition hover:bg-[#1e252d]"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {exportNotice && (
        <div className="flex items-center justify-between rounded-lg border border-[#ca8a04] bg-[#fefce8] p-3 text-xs text-[#854d0e]">
          <span>{exportNotice}</span>
          <button onClick={() => setExportNotice(null)} className="font-bold hover:underline">
            Đóng
          </button>
        </div>
      )}

      {/* Main Layout: Left Side Navigation (Penpot AD Menu) + Right Content View */}
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Left Sub-Sidebar for Admin Data Console (Penpot Left Menu) */}
        <aside className="w-full shrink-0 rounded-xl border border-[#e1e5ea] bg-white p-4 shadow-sm lg:w-64">
          <div className="mb-3 px-3 text-[11px] font-extrabold uppercase tracking-wider text-[#0e1216]">
            Danh mục phân tích
          </div>

          <div className="space-y-4">
            {menuGroups.map((group, gIdx) => (
              <div key={gIdx} className="space-y-1">
                <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#8c96a3]">
                  {group.group}
                </div>
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelectTab(item.id)}
                        className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs font-semibold transition ${
                          isActive
                            ? 'bg-[#0e1216] text-[#fdd506] shadow-sm'
                            : 'text-[#5d646c] hover:bg-[#f5f7f9] hover:text-[#0e1216]'
                        }`}
                      >
                        <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-[#fdd506]' : 'text-[#8c96a3]'}`} />
                        <span className="truncate">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-[#e1e5ea] pt-4 px-3 text-[11px] text-[#8c96a3]">
            Vai trò: <span className="font-bold text-[#0e1216]">admin_data</span>
            <div className="text-[10px] text-[#5d646c]">Chỉ đọc • Quyền xuất có ghi log</div>
          </div>
        </aside>

        {/* Right Dynamic View */}
        <main className="flex-1 overflow-hidden">
          {currentTab === 'overview' && <DataOverviewView />}
          {currentTab === 'revenue' && <RevenueManagementView />}
          {currentTab === 'reconciliation' && <RevenueReconciliationView />}
          {currentTab === 'payos-realtime' && <PayOSRealtimeView />}
          {currentTab === 'payment-insights' && <PaymentInsightsView />}
          {currentTab === 'job-analytics' && <JobAnalyticsView />}
          {currentTab === 'disputes' && <DisputeAnalyticsView />}
          {currentTab === 'urgent-fee' && <UrgentFeeAnalyticsView />}
          {currentTab === 'employers' && <EmployerAnalyticsView />}
          {currentTab === 'workers' && <WorkerAnalyticsView />}
          {currentTab === 'retention' && <RetentionAnalyticsView />}
          {currentTab === 'services' && <ServiceAnalyticsView />}
          {currentTab === 'areas' && <AreaAnalyticsView />}
          {currentTab === 'supply-demand' && <SupplyDemandAnalyticsView />}
          {currentTab === 'reports' && <ReportsSummaryView />}
        </main>
      </div>
    </div>
  );
};
