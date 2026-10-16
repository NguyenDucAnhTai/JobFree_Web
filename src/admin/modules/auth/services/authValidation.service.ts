import type {
  IAuthValidationService,
  AdminLoginCredentials,
  AdminLoginFormErrors,
} from '../types/auth.types';

/**
 * SOLID - Single Responsibility Principle:
 * AuthValidationService is purely responsible for validating login inputs
 * and formatting human-friendly Vietnamese error messages.
 */
export class AuthValidationService implements IAuthValidationService {
  private readonly emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  public validateEmail(email: string): string | null {
    const trimmed = email.trim();
    if (!trimmed) {
      return 'Vui lòng nhập địa chỉ email.';
    }
    if (!this.emailRegex.test(trimmed)) {
      return 'Định dạng email không hợp lệ (ví dụ: admin@jobfree.vn).';
    }
    return null;
  }

  public validatePassword(password: string): string | null {
    if (!password) {
      return 'Vui lòng nhập mật khẩu.';
    }
    if (password.length < 6) {
      return 'Mật khẩu phải có ít nhất 6 ký tự.';
    }
    return null;
  }

  public validateLoginForm(credentials: AdminLoginCredentials): AdminLoginFormErrors {
    const errors: AdminLoginFormErrors = {};

    const emailError = this.validateEmail(credentials.email);
    if (emailError) {
      errors.email = emailError;
    }

    const passwordError = this.validatePassword(credentials.password);
    if (passwordError) {
      errors.password = passwordError;
    }

    return errors;
  }
}

export const defaultAuthValidationService = new AuthValidationService();
