import React from 'react';
import type { AdminBrandConfig } from '../types/auth.types';
import { DEFAULT_ADMIN_BRAND } from '../config/auth.constants';

interface AdminBrandPanelProps {
  brand?: AdminBrandConfig;
}

/**
 * SOLID - Single Responsibility:
 * AdminBrandPanel presents the left dark hero panel (50% split)
 * with the JF yellow brand icon, proposition headline, and copyright.
 */
export const AdminBrandPanel: React.FC<AdminBrandPanelProps> = ({
  brand = DEFAULT_ADMIN_BRAND,
}) => {
  return (
    <div className="flex h-full w-full flex-col justify-between bg-[#111216] px-12 py-10 lg:px-16 lg:py-14 xl:px-20 xl:py-16 text-white select-none">
      {/* Brand Header */}
      <div className="flex items-center gap-3.5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fdd506] font-extrabold text-[#111216] text-sm tracking-tight shadow-sm">
          {brand.badge}
        </div>
        <span className="text-lg font-bold tracking-tight text-white font-sans">
          {brand.name}
        </span>
      </div>

      {/* Center Hero Content */}
      <div className="my-auto py-12 max-w-xl">
        <h1 className="text-3xl lg:text-[38px] xl:text-[44px] font-bold tracking-tight text-white leading-[1.22] font-sans">
          {brand.headline}
        </h1>
        <p className="mt-6 text-sm lg:text-[15px] text-[#8e97a4] font-normal leading-relaxed font-sans max-w-lg">
          {brand.subheadline}
        </p>
      </div>

      {/* Footer Copyright */}
      <div className="text-xs text-[#525b68] font-medium font-sans">
        {brand.copyright}
      </div>
    </div>
  );
};
