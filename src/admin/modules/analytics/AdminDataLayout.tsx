import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
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
  Shield,
  ArrowRight,
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { mockUsers } from '../../services/mockDb';

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

const tabTitles: Record<AdminDataTab, string> = {
  overview: 'Tổng quan dữ liệu (Macro Analytics)',
  revenue: 'Doanh thu & Bảng tổng hợp (Revenue Summarize)',
  reconciliation: 'COD & Đối soát doanh thu (Reconciliation)',
  'payos-realtime': 'PayOS Live Stream & Transactions',
  'payment-insights': 'Payment Insights & Distribution',
  'job-analytics': 'Job Analytics & Time-to-Match',
  disputes: 'Hủy ca & Vụ việc tranh chấp (Disputes)',
  'urgent-fee': 'Gói ưu tiên & Phí điều phối (Urgent Fee)',
  employers: 'Dữ liệu hành vi Employer (Anonymized)',
  workers: 'Hiệu suất & Thu nhập Worker (Anonymized)',
  retention: 'Cohort Retention (Tuần 1 đến Tuần 8)',
  services: 'Hiệu suất theo Danh mục Dịch vụ',
  areas: 'Báo cáo theo 11 Quận/Huyện TP.HCM',
  'supply-demand': 'Cân bằng Cung - Cầu lao động theo địa bàn',
  reports: 'Trung tâm Xuất báo cáo & Chất lượng dữ liệu',
};

export const AdminDataLayout: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = (searchParams.get('tab') as AdminDataTab) || 'overview';
  const [exportNotice, setExportNotice] = useState<string | null>(null);
  const { user, loginAs } = useAdminAuth();

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
    <div className="flex h-screen w-screen overflow-hidden bg-[#f5f7f9] text-[#0e1216]">
      {/* 1. Dedicated Admin Data Sidebar matching Penpot AD */}
      <aside className="flex h-full w-[280px] min-w-[280px] flex-col justify-between border-r border-[#1e252d] bg-[#0e1216] text-[#8c96a3]">
        {/* Brand Header */}
        <div>
          <div className="flex items-center gap-3 border-b border-[#1e252d] px-6 py-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#fdd506] font-black text-[#0e1216] shadow-sm">
              DA
            </div>
            <div>
              <div className="text-base font-extrabold tracking-tight text-[#e2e5e8]">
                Admin Data
              </div>
              <div className="text-[11px] font-medium text-[#8c96a3]">
                Analytics Console
              </div>
            </div>
          </div>

          {/* Navigation Menu Groups */}
          <nav className="max-h-[calc(100vh-210px)] space-y-4 overflow-y-auto px-4 py-5 scrollbar-thin scrollbar-thumb-gray-800">
            {menuGroups.map((group, gIdx) => (
              <div key={gIdx} className="space-y-1">
                <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#607489]">
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
                            ? 'border-l-2 border-[#fdd506] bg-[#1e252d] font-bold text-white shadow-sm'
                            : 'text-[#8c96a3] hover:bg-[#1a2027] hover:text-white'
                        }`}
                      >
                        <Icon
                          className={`h-4 w-4 shrink-0 ${
                            isActive ? 'text-[#fdd506]' : 'text-[#8c96a3]'
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Footer Link: Switch to Super Admin Portal */}
        <div className="border-t border-[#1e252d] p-4 space-y-2">
          <Link
            to="/admin"
            className="flex items-center justify-between rounded-lg border border-[#323d49] bg-[#161c22] px-3.5 py-2 text-xs font-bold text-[#e2e5e8] transition hover:border-[#fdd506] hover:text-white"
          >
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-[#fdd506]" />
              <span>Super Admin Portal</span>
            </div>
            <ArrowRight className="h-3.5 w-3.5 text-[#8c96a3]" />
          </Link>
          <div className="px-1 text-[10px] text-[#607489]">
            Read-only analytics role • DEC-104
          </div>
        </div>
      </aside>

      {/* 2. Right Canvas Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header matching Penpot AD */}
        <header className="flex h-[72px] shrink-0 items-center justify-between border-b border-[#e1e5ea] bg-white px-8 shadow-sm">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold tracking-tight text-[#0e1216]">
              {tabTitles[currentTab] || 'Admin Data Console'}
            </h1>
            <span className="rounded-full bg-[#e0f2fe] px-2.5 py-0.5 text-xs font-bold text-[#0284c7]">
              Read-only
            </span>
          </div>

          <div className="flex items-center gap-5">
            {/* Search Input */}
            <div className="relative hidden w-72 md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5d646c]" />
              <input
                type="text"
                placeholder="Tìm kiếm chỉ số, mã đơn, khu vực…"
                className="h-9 w-full rounded-lg border border-[#e1e5ea] bg-[#f5f7f9] py-2 pl-9 pr-4 text-xs text-[#0e1216] placeholder-[#5d646c] outline-none transition focus:border-[#0e1216] focus:bg-white"
              />
            </div>

            {/* Export Button */}
            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 rounded-lg border border-[#e1e5ea] bg-[#0e1216] px-3.5 py-2 text-xs font-bold text-white transition hover:bg-[#1e252d]"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export</span>
            </button>

            {/* Switch to Super Admin Quick Button */}
            <Link
              to="/admin"
              className="flex items-center gap-1.5 rounded-lg border border-[#e1e5ea] bg-[#f5f7f9] px-3 py-2 text-xs font-bold text-[#0e1216] transition hover:bg-[#e2e8f0]"
            >
              <span>🛡️</span>
              <span>Sang Super Admin</span>
            </Link>

            {/* Role Switcher */}
            <div className="flex items-center gap-2 border-l border-[#e1e5ea] pl-4">
              <select
                value={user?.email || 'analyst@jobfree.vn'}
                onChange={(e) => loginAs(e.target.value)}
                className="rounded-lg border border-[#e1e5ea] bg-[#f5f7f9] px-2.5 py-1.5 text-xs font-semibold text-[#0e1216] outline-none transition hover:bg-white focus:border-[#0e1216]"
              >
                {mockUsers.map((u) => (
                  <option key={u.id} value={u.email}>
                    {u.role.toUpperCase()} - {u.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Profile Avatar */}
            <div className="flex items-center gap-3 border-l border-[#e1e5ea] pl-4">
              <div className="text-right">
                <div className="text-xs font-bold text-[#0e1216]">
                  {user?.name || 'Data Analyst'}
                </div>
                <div className="text-[10px] font-semibold text-[#5d646c]">
                  analyst@jobfree.vn
                </div>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0e1216] text-xs font-black text-[#fdd506]">
                DA
              </div>
            </div>
          </div>
        </header>

        {/* Export Notification Banner */}
        {exportNotice && (
          <div className="flex items-center justify-between border-b border-[#ca8a04] bg-[#fefce8] px-8 py-3 text-xs font-medium text-[#854d0e]">
            <span>{exportNotice}</span>
            <button
              onClick={() => setExportNotice(null)}
              className="font-bold hover:underline"
            >
              Đóng
            </button>
          </div>
        )}

        {/* Dynamic View Container */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="mx-auto w-full max-w-[1320px]">
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
          </div>
        </main>
      </div>
    </div>
  );
};
