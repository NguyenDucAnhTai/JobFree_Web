import React, { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { AdminInputField } from './AdminInputField';
import { AdminRememberCheckbox } from './AdminRememberCheckbox';
import { AdminAuditBadge } from './AdminAuditBadge';
import { useAdminLogin } from '../hooks/useAdminLogin';
import { DEFAULT_AUTH_UI } from '../config/auth.constants';
import type { LoginResult } from '../types/auth.types';

interface AdminLoginFormProps {
  onSuccess?: (result: LoginResult) => void;
}

/**
 * SOLID - Single Responsibility & Composition:
 * AdminLoginForm orchestrates user interaction, state binding,
 * credential submission, and presentation feedback.
 */
export const AdminLoginForm: React.FC<AdminLoginFormProps> = ({ onSuccess }) => {
  const {
    credentials,
    rememberMe,
    showPassword,
    errors,
    isSubmitting,
    handleInputChange,
    handleToggleRememberMe,
    handleToggleShowPassword,
    handleSubmit,
  } = useAdminLogin({ onSuccess });

  const [forgotPasswordNotice, setForgotPasswordNotice] = useState<boolean>(false);

  return (
    <div className="w-full">
      {/* Title & Subtitle */}
      <div className="mb-7">
        <h2 className="text-2xl sm:text-[26px] font-bold tracking-tight text-[#111216] font-sans">
          {DEFAULT_AUTH_UI.loginTitle}
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-[#6c757d] font-sans">
          {DEFAULT_AUTH_UI.loginSubtitle}
        </p>
      </div>

      {/* General Error Alert */}
      {errors.general && (
        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3.5 text-xs font-medium text-red-700 font-sans">
          {errors.general}
        </div>
      )}

      {/* Form Elements */}
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Email Input */}
        <AdminInputField
          id="admin-email"
          name="email"
          type="email"
          label={DEFAULT_AUTH_UI.emailLabel}
          value={credentials.email}
          onChange={handleInputChange('email')}
          placeholder="admin@jobfree.vn"
          autoComplete="username"
          error={errors.email}
          disabled={isSubmitting}
        />

        {/* Password Input */}
        <AdminInputField
          id="admin-password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          label={DEFAULT_AUTH_UI.passwordLabel}
          value={credentials.password}
          onChange={handleInputChange('password')}
          placeholder="admin123"
          autoComplete="current-password"
          error={errors.password}
          disabled={isSubmitting}
          rightSlot={
            <button
              type="button"
              onClick={handleToggleShowPassword}
              tabIndex={-1}
              className="text-[#6c757d] hover:text-[#111216] transition-colors p-1"
              aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiển thị mật khẩu'}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          }
        />

        {/* Remember Me & Forgot Password Row */}
        <div className="flex items-center justify-between pt-1">
          <AdminRememberCheckbox
            id="remember-me-checkbox"
            checked={rememberMe}
            onChange={handleToggleRememberMe}
            label={DEFAULT_AUTH_UI.rememberMeLabel}
          />

          <button
            type="button"
            onClick={() => setForgotPasswordNotice((prev) => !prev)}
            className="text-xs sm:text-sm font-normal text-[#6c757d] hover:text-[#111216] transition-colors font-sans"
          >
            {DEFAULT_AUTH_UI.forgotPasswordLabel}
          </button>
        </div>

        {/* Forgot Password Helper Toast */}
        {forgotPasswordNotice && (
          <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-xs text-amber-900 font-sans leading-relaxed">
            Liên hệ Quản trị viên Kỹ thuật nội bộ qua kênh Slack / IT Support để được cấp lại mật khẩu cho tài khoản Admin.
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-[#fdd506] py-3 px-4 text-sm font-bold text-[#111216] transition-colors duration-150 hover:bg-[#ebd505] active:bg-[#d8c304] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-sans mt-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin text-[#111216]" />
              <span>{DEFAULT_AUTH_UI.submittingButtonLabel}</span>
            </>
          ) : (
            <span>{DEFAULT_AUTH_UI.submitButtonLabel}</span>
          )}
        </button>

        {/* Audit Log Badge */}
        <div className="pt-2">
          <AdminAuditBadge />
        </div>
      </form>
    </div>
  );
};
