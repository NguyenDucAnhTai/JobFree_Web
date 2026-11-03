import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { UserPrincipal, CapabilityType } from '../types/auth';
import { mockUsers } from '../services/mockDb';

interface AdminAuthContextType {
  user: UserPrincipal | null;
  isAuthenticated: boolean;
  loginAs: (email: string) => void;
  logout: () => void;
  hasCapability: (cap: CapabilityType) => boolean;
}

const SESSION_STORAGE_KEY = 'jobfree_admin_active_session.json';

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserPrincipal | null>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedSession = window.localStorage.getItem(SESSION_STORAGE_KEY);
      if (savedSession) {
        try {
          const parsed = JSON.parse(savedSession);
          const found = mockUsers.find((u) => u.email === parsed.email);
          if (found) return found;
        } catch {
          // Fall through
        }
      }
    }
    return mockUsers[0];
  });

  const loginAs = (email: string) => {
    const foundUser = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (foundUser) {
      setUser(foundUser);
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(
          SESSION_STORAGE_KEY,
          JSON.stringify({ email: foundUser.email, loggedInAt: new Date().toISOString() })
        );
      }
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(SESSION_STORAGE_KEY);
    }
  };

  const hasCapability = (cap: CapabilityType) => {
    if (!user) return false;
    return user.capabilities.includes(cap);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loginAs,
        logout,
        hasCapability,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

