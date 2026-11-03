import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminBrandPanel } from '../components/AdminBrandPanel';
import { AdminLoginForm } from '../components/AdminLoginForm';
import { useAdminAuth } from '../../../context/AdminAuthContext';
import type { LoginResult } from '../types/auth.types';

/**
 * SOLID - Single Responsibility:
 * AdminLoginPage composes the brand banner (left 50%) and the login form (right 50%)
 * in a responsive split-screen viewport layout matching the design screenshot.
 */
export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginAs } = useAdminAuth();

  const handleLoginSuccess = (result: LoginResult) => {
    if (result.user) {
      loginAs(result.user.email);
    }
    navigate('/admin', { replace: true });
  };

  return (
    <div className="flex min-h-screen w-screen overflow-x-hidden font-sans bg-[#f8f9fa]">
      {/* Left 50%: Brand & Proposition Showcase (Dark Theme) */}
      <div className="hidden lg:flex lg:w-1/2">
        <AdminBrandPanel />
      </div>

      {/* Right 50%: Authentication Form Area (Light Theme) */}
      <div className="flex flex-1 flex-col justify-center items-center px-6 py-12 lg:w-1/2 lg:px-14 xl:px-24 min-h-screen">
        {/* Mobile Header (visible only on small screens) */}
        <div className="mb-8 flex items-center gap-3 lg:hidden">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fdd506] font-extrabold text-[#111216] text-sm shadow-sm">
            JF
          </div>
          <span className="text-xl font-bold tracking-tight text-[#111216]">
            JobFree Admin
          </span>
        </div>

        {/* Center Login Form Container */}
        <div className="w-full max-w-[390px] sm:max-w-[420px]">
          <AdminLoginForm onSuccess={handleLoginSuccess} />
        </div>

        {/* Mobile Footer (visible only on small screens) */}
        <div className="mt-8 text-xs text-[#8c96a3] lg:hidden">
          © 2026 JobFree Vietnam
        </div>
      </div>
    </div>
  );
};
