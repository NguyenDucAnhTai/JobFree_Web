import React, { useState } from 'react';
import { Save, CheckCircle2, Settings, Clock } from 'lucide-react';

export const AppSettingsPage: React.FC = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [allowNewJobs, setAllowNewJobs] = useState(true);
  const [allowEmployerReg, setAllowEmployerReg] = useState(true);
  const [allowWorkerReg, setAllowWorkerReg] = useState(true);

  const [timeoutInstant, setTimeoutInstant] = useState(30);
  const [timeoutFast, setTimeoutFast] = useState(90);
  const [timeoutNormal, setTimeoutNormal] = useState(6);
  const [maxWorkerInvites, setMaxWorkerInvites] = useState(5);

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col gap-4 rounded-xl border border-[#e1e5ea] bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-[#0e1216]">App Settings</h1>
            <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800">
              Quyền Quản Trị Hệ Thống
            </span>
          </div>
          <p className="mt-1 text-sm text-[#5d646c]">
            Cấu hình các tham số vận hành chung của hệ thống.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {savedSuccess && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
              <CheckCircle2 size={16} /> Đã lưu cài đặt thành công!
            </span>
          )}
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 rounded-xl bg-[#fdd506] px-4 py-2 text-xs font-bold text-[#0e1216] shadow-sm hover:bg-[#e5c105]"
          >
            <Save size={16} /> Lưu thay đổi
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* KHỐI 1: General */}
        <div className="rounded-xl border border-[#e1e5ea] bg-white p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2 border-b border-[#e1e5ea] pb-3">
            <Settings size={18} className="text-gray-600" />
            <h2 className="text-base font-bold text-[#0e1216]">General</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="block text-sm font-semibold text-[#0e1216]">Maintenance mode</span>
                <span className="text-xs text-[#5d646c]">Khi bật, app khách hàng sẽ hiển thị banner bảo trì</span>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={maintenanceMode}
                  onChange={(e) => setMaintenanceMode(e.target.checked)}
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="block text-sm font-semibold text-[#0e1216]">Cho phép tạo job mới</span>
                <span className="text-xs text-[#5d646c]">Tắt khi cần dừng hệ thống tạm thời</span>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={allowNewJobs}
                  onChange={(e) => setAllowNewJobs(e.target.checked)}
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="block text-sm font-semibold text-[#0e1216]">Cho phép đăng ký Employer mới</span>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={allowEmployerReg}
                  onChange={(e) => setAllowEmployerReg(e.target.checked)}
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="block text-sm font-semibold text-[#0e1216]">Cho phép đăng ký Worker mới</span>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={allowWorkerReg}
                  onChange={(e) => setAllowWorkerReg(e.target.checked)}
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
              </label>
            </div>
          </div>
        </div>

        {/* KHỐI 2: Dispatch & Timeouts */}
        <div className="rounded-xl border border-[#e1e5ea] bg-white p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2 border-b border-[#e1e5ea] pb-3">
            <Clock size={18} className="text-blue-600" />
            <h2 className="text-base font-bold text-[#0e1216]">Dispatch & Timeouts</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#0e1216] mb-1.5">
                Timeout job Tức thì (phút)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={timeoutInstant}
                  onChange={(e) => setTimeoutInstant(Number(e.target.value))}
                  className="w-full rounded-xl border border-[#e1e5ea] bg-[#f5f7f9] p-2.5 pr-12 text-sm font-semibold text-[#0e1216] focus:border-[#fdd506] focus:bg-white focus:outline-none"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#5d646c]">phút</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0e1216] mb-1.5">
                Timeout job Nhanh (phút)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={timeoutFast}
                  onChange={(e) => setTimeoutFast(Number(e.target.value))}
                  className="w-full rounded-xl border border-[#e1e5ea] bg-[#f5f7f9] p-2.5 pr-12 text-sm font-semibold text-[#0e1216] focus:border-[#fdd506] focus:bg-white focus:outline-none"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#5d646c]">phút</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0e1216] mb-1.5">
                Timeout job Bình thường (giờ)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={timeoutNormal}
                  onChange={(e) => setTimeoutNormal(Number(e.target.value))}
                  className="w-full rounded-xl border border-[#e1e5ea] bg-[#f5f7f9] p-2.5 pr-12 text-sm font-semibold text-[#0e1216] focus:border-[#fdd506] focus:bg-white focus:outline-none"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#5d646c]">giờ</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0e1216] mb-1.5">
                Số worker mời tối đa
              </label>
              <input
                type="number"
                value={maxWorkerInvites}
                onChange={(e) => setMaxWorkerInvites(Number(e.target.value))}
                className="w-full rounded-xl border border-[#e1e5ea] bg-[#f5f7f9] p-2.5 text-sm font-semibold text-[#0e1216] focus:border-[#fdd506] focus:bg-white focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppSettingsPage;
