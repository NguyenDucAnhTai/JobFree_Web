export interface PayoutItem {
  id: string;
  workerId: string;
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  jobId?: string;
}

export interface PayoutBatch {
  id: string;
  createdAt: string;
  processedAt?: string;
  totalAmount: number;
  itemCount: number;
  status: 'draft' | 'pending_approval' | 'processing' | 'completed' | 'failed';
  items: PayoutItem[];
}

export interface RefundItem {
  id: string;
  employerId: string;
  amount: number;
  reason: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  jobId?: string;
  createdAt: string;
}

export interface TransactionRecord {
  id: string;
  type: 'payment' | 'payout' | 'refund' | 'adjustment';
  amount: number;
  status: string;
  referenceId: string;
  createdAt: string;
}

export interface ReceivableRecord {
  id: string;
  workerId: string;
  amount: number;
  reason: string;
  status: 'active' | 'settled' | 'written_off';
  createdAt: string;
  dueDate: string;
}
