import React from 'react';
import { Check } from 'lucide-react';

interface AdminRememberCheckboxProps {
  id?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

/**
 * SOLID - Single Responsibility:
 * Custom styled checkbox matching the screenshot with JobFree yellow accent.
 */
export const AdminRememberCheckbox: React.FC<AdminRememberCheckboxProps> = ({
  id = 'admin-remember-me',
  checked,
  onChange,
  label,
}) => {
  return (
    <label
      htmlFor={id}
      className="inline-flex items-center gap-2 cursor-pointer select-none group"
    >
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <div
        className={`flex h-4 w-4 items-center justify-center rounded transition-all duration-150 ${
          checked
            ? 'bg-[#fdd506] border border-[#fdd506] text-[#111216]'
            : 'border border-[#d1d5db] bg-white group-hover:border-[#111216]'
        }`}
      >
        {checked && <Check className="h-3 w-3 stroke-[3]" />}
      </div>
      <span className="text-xs sm:text-sm font-medium text-[#111216] font-sans">
        {label}
      </span>
    </label>
  );
};
