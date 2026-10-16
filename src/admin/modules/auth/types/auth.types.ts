import type { UserPrincipal } from '../../../types/auth';

/**
 * Credentials model for admin login
 */
export interface AdminLoginCredentials {
  email: string;
  password: string;
}

/**
 * Structured model saved to JSON storage for the Remember Me feature
 */
export interface AdminRememberedData {
  rememberMe: boolean;
  email: string;
  savedAt: string;
}

/**
 * Field-level validation errors
 */
export interface AdminLoginFormErrors {
  email?: string;
  password?: string;
  general?: string;
}

/**
 * Result returned by authentication service
 */
export interface LoginResult {
  success: boolean;
  user?: UserPrincipal;
  errorMessage?: string;
}

/**
 * Single Responsibility: Validation Service Contract
 */
export interface IAuthValidationService {
  validateEmail(email: string): string | null;
  validatePassword(password: string): string | null;
  validateLoginForm(credentials: AdminLoginCredentials): AdminLoginFormErrors;
}

/**
 * Single Responsibility: Authentication Service Contract
 */
export interface IAdminAuthService {
  authenticate(credentials: AdminLoginCredentials): Promise<LoginResult>;
  recordAuditLog(email: string, action: string, status: 'SUCCESS' | 'FAILED'): void;
}

/**
 * Brand Configuration for the left hero panel
 */
export interface AdminBrandConfig {
  name: string;
  badge: string;
  headline: string;
  subheadline: string;
  copyright: string;
}
