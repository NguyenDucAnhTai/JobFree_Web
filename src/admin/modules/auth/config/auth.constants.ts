import authDefaultsJson from '../data/adminAuthDefaults.json';
import type { AdminBrandConfig } from '../types/auth.types';

export const AUTH_STORAGE_KEYS = {
  ADMIN_REMEMBER_JSON: 'jobfree_admin_remember_credentials.json',
  ADMIN_SESSION: 'jobfree_admin_session.json',
} as const;

export const DEFAULT_ADMIN_BRAND: AdminBrandConfig = authDefaultsJson.brand;

export const DEFAULT_ADMIN_CREDENTIALS = authDefaultsJson.defaultCredentials;

export const DEFAULT_AUTH_UI = authDefaultsJson.ui;
