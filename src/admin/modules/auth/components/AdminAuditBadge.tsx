import React from 'react';
import { Shield } from 'lucide-react';
import { DEFAULT_AUTH_UI } from '../config/auth.constants';

interface AdminAuditBadgeProps {
  message?: string;
}

/**
 * SOLID - Single Responsibility:
 * Security notice component alerting users about internal audit logging.
 */
export const AdminAuditBadge: React.FC<AdminAuditBadgeProps> = ({
  message = DEFAULT_AUTH_UI.auditNotice,
}) => {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-[#e5e7eb] bg-[#f8f9fa] px-4 py-3 text-xs text-[#6c757d]">
      <Shield className="h-4 w-4 shrink-0 text-[#6c757d]" />
      <span className="leading-relaxed font-sans">{message}</span>
    </div>
  );
};
