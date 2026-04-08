// toast-store.ts
import { Toast } from "@/types/toast";
import { create } from "zustand";

type ToastStore = {
  toasts: Toast[];
  addToast: (title: string) => void;
  removeToast: (id: string) => void;
};

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],

  addToast: (title) => {
    const id = crypto.randomUUID();

    set((state) => ({
      toasts: [...state.toasts, { id, title }],
    }));

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 4000);
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
