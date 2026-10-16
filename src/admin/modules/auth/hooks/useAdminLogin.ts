import { useState, useEffect, useCallback } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import type {
  AdminLoginCredentials,
  AdminLoginFormErrors,
  AdminRememberedData,
  IAdminAuthService,
  IAuthValidationService,
  LoginResult,
} from '../types/auth.types';
import type { IStorageService } from '../types/storage.types';
import {
  AUTH_STORAGE_KEYS,
  DEFAULT_ADMIN_CREDENTIALS,
} from '../config/auth.constants';
import { JsonLocalStorageService } from '../services/jsonStorage.service';
import { defaultAuthValidationService } from '../services/authValidation.service';
import { defaultAdminAuthService } from '../services/adminAuth.service';

interface UseAdminLoginOptions {
  storageService?: IStorageService<AdminRememberedData>;
  validationService?: IAuthValidationService;
  authService?: IAdminAuthService;
  onSuccess?: (result: LoginResult) => void;
}

export const useAdminLogin = ({
  storageService = new JsonLocalStorageService<AdminRememberedData>(
    AUTH_STORAGE_KEYS.ADMIN_REMEMBER_JSON
  ),
  validationService = defaultAuthValidationService,
  authService = defaultAdminAuthService,
  onSuccess,
}: UseAdminLoginOptions = {}) => {
  const [credentials, setCredentials] = useState<AdminLoginCredentials>({
    email: DEFAULT_ADMIN_CREDENTIALS.email,
    password: DEFAULT_ADMIN_CREDENTIALS.password,
  });

  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<AdminLoginFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Initialize from JSON storage on mount
  useEffect(() => {
    const savedData = storageService.get();
    if (savedData) {
      setRememberMe(savedData.rememberMe);
      if (savedData.email) {
        setCredentials((prev) => ({
          ...prev,
          email: savedData.email,
        }));
      }
    }
  }, [storageService]);

  const handleInputChange = useCallback(
    (field: keyof AdminLoginCredentials) =>
      (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setCredentials((prev) => ({ ...prev, [field]: val }));
        
        // Clear field error on change
        setErrors((prev) => {
          if (!prev[field] && !prev.general) return prev;
          const updated = { ...prev };
          delete updated[field];
          delete updated.general;
          return updated;
        });
      },
    []
  );

  const handleToggleRememberMe = useCallback((checked: boolean) => {
    setRememberMe(checked);
  }, []);

  const handleToggleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // 1. Validation
      const formErrors = validationService.validateLoginForm(credentials);
      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        return;
      }

      setIsSubmitting(true);
      setErrors({});

      try {
        // 2. Authentication
        const result = await authService.authenticate(credentials);

        if (!result.success) {
          setErrors({
            general: result.errorMessage || 'Đăng nhập không thành công. Vui lòng thử lại.',
          });
          setIsSubmitting(false);
          return;
        }

        // 3. Persist Remember Me JSON to storage according to user preference
        if (rememberMe) {
          storageService.save({
            rememberMe: true,
            email: credentials.email.trim(),
            savedAt: new Date().toISOString(),
          });
        } else {
          storageService.remove();
        }

        setIsSubmitting(false);

        // 4. Trigger Success Callback
        if (onSuccess) {
          onSuccess(result);
        }
      } catch (err) {
        console.error('[useAdminLogin] Unexpected login error:', err);
        setErrors({
          general: 'Đã có lỗi hệ thống xảy ra. Vui lòng thử lại sau giây lát.',
        });
        setIsSubmitting(false);
      }
    },
    [credentials, rememberMe, validationService, authService, storageService, onSuccess]
  );

  return {
    credentials,
    rememberMe,
    showPassword,
    errors,
    isSubmitting,
    handleInputChange,
    handleToggleRememberMe,
    handleToggleShowPassword,
    handleSubmit,
    setCredentials,
  };
};
