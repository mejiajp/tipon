// lib/store/authStore.ts
import { create } from "zustand";
import { getCurrentUser, logoutUser } from "@/lib/api/users.client";
import { User } from "@/types/user";

type AuthState = {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: true,

  refreshAuth: async () => {
    set({ loading: true });
    try {
      const currentUser = await getCurrentUser();
      set({ user: currentUser ?? null });
    } catch {
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    await logoutUser();
    set({ user: null });
  },
}));

// Optionally, immediately load the current user when the store is used
useAuthStore.getState().refreshAuth();
