import { create } from "zustand";
import { getCurrentUser, logoutUser } from "@/lib/api/users.client";
import { User } from "@/types/user";

type AuthStore = {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
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
    set({ loading: true });

    try {
      await logoutUser();
    } finally {
      set({
        user: null,
        loading: false,
      });
    }
  },

  clearAuth: () => {
    set({
      user: null,
      loading: false,
    });
  },
}));
