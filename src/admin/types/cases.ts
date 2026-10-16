export type CaseType =
  | 'support'
  | 'verification_review'
  | 'check_in_review'
  | 'incident'
  | 'no_show_appeal'
  | 'completion_confirmation'
  | 'cash_payment_dispute'
  | 'employer_non_payment'
  | 'block_appeal'
  | 'worker_receivable'
  | 'payment_reconciliation'
  | 'payout_exception'
  | 'financial_exception'
  | 'identity_security';

export type CaseStatus =
  | 'open'
  | 'assigned'
  | 'awaiting_evidence'
  | 'escalated'
  | 'action_pending'
  | 'resolved'
  | 'dismissed';

export interface Finding {
  id: string;
  description: string;
  evidenceIds: string[];
  createdAt: string;
  createdBy: string;
}

export interface ResolutionCode {
  code: string;
  description: string;
  requiresNotes: boolean;
}
