import React from 'react';

export interface AdminInputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  rightSlot?: React.ReactNode;
}

/**
 * SOLID - Single Responsibility & Open/Closed Principle:
 * Reusable accessible input field with label, error display, and right-slot extensions.
 */
export const AdminInputField: React.FC<AdminInputFieldProps> = ({
  id,
  label,
  error,
  rightSlot,
  className = '',
  ...inputProps
}) => {
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="block text-xs sm:text-sm font-semibold text-[#111216] mb-1.5 font-sans"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          className={`w-full rounded-lg border ${
            error
              ? 'border-red-500 bg-red-50/10'
              : 'border-[#e2e8f0] bg-[#f8f9fa] focus:bg-white'
          } px-3.5 py-2.5 text-sm text-[#111216] placeholder-[#8e97a4] outline-none transition duration-150 focus:border-[#111216] focus:ring-1 focus:ring-[#111216] font-sans ${
            rightSlot ? 'pr-10' : ''
          } ${className}`}
          {...inputProps}
        />
        {rightSlot && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
            {rightSlot}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-500 font-medium font-sans">
          {error}
        </p>
      )}
    </div>
  );
};
