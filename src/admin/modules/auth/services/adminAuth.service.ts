import type {
  IAdminAuthService,
  AdminLoginCredentials,
  LoginResult,
} from '../types/auth.types';
import type { UserPrincipal } from '../../../types/auth';
import { mockUsers } from '../../../services/mockDb';

/**
 * SOLID - Single Responsibility Principle:
 * AdminAuthService manages authentication logic, credential verification,
 * and security audit event logging.
 */
export class AdminAuthService implements IAdminAuthService {
  public async authenticate(credentials: AdminLoginCredentials): Promise<LoginResult> {
    // Simulate brief network latency for realistic UX
    await new Promise((resolve) => setTimeout(resolve, 600));

    const emailTrimmed = credentials.email.trim().toLowerCase();
    const foundUser = mockUsers.find((u: UserPrincipal) => u.email.toLowerCase() === emailTrimmed);

    if (!foundUser) {
      this.recordAuditLog(credentials.email, 'LOGIN_ATTEMPT', 'FAILED');
      return {
        success: false,
        errorMessage: 'Tài khoản không tồn tại trong hệ thống quản trị nội bộ.',
      };
    }

    // In production, this verifies a salted hash; for admin demo, valid passwords match admin123 / staff123 or length >= 6
    if (credentials.password !== 'admin123' && credentials.password.length < 6) {
      this.recordAuditLog(credentials.email, 'LOGIN_ATTEMPT', 'FAILED');
      return {
        success: false,
        errorMessage: 'Mật khẩu không chính xác. Vui lòng kiểm tra lại.',
      };
    }

    this.recordAuditLog(foundUser.email, 'LOGIN_SUCCESS', 'SUCCESS');
    return {
      success: true,
      user: foundUser,
    };
  }

  public recordAuditLog(
    email: string,
    action: string,
    status: 'SUCCESS' | 'FAILED'
  ): void {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      email,
      action,
      status,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown',
    };
    
    // In production this POSTs to /api/audit-logs
    console.info('[Security Audit Log]:', JSON.stringify(logEntry));
  }
}

export const defaultAdminAuthService = new AdminAuthService();
