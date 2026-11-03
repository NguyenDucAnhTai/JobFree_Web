export interface ProblemDetails {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
  [key: string]: any;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface FilterParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDesc?: boolean;
  search?: string;
  [key: string]: any;
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  actorId: string;
  actorRole: string;
  action: string;
  targetType: string;
  targetId: string;
  details: Record<string, any>;
  ipAddress?: string;
}
