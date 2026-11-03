import { create } from "zustand";
import type { InternalUser } from "../models";

interface AuthState {
  user: InternalUser | null;
  isInitialized: boolean;
  isAuthenticating: boolean;
  setUser: (user: InternalUser | null) => void;
  initialize: () => Promise<void>;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isInitialized: false,
  isAuthenticating: false,
  setUser: (user) => set({ user }),
  initialize: async () => {
    set({ isAuthenticating: true });

    try {
      set({ user: null, isInitialized: true });
    } finally {
      set({ isAuthenticating: false });
    }
  },
  clearUser: () => set({ user: null }),
}));
