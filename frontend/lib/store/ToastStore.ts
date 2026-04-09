// toast-store.ts
import { Toast } from "@/types/toast";
import { create } from "zustand";

type ToastStore = {
  toasts: Toast[];
  addToast: (title: string, type: Toast["type"]) => void;
  removeToast: (id: string) => void;
};

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],

  addToast: (title, type) => {
    const id = crypto.randomUUID();

    set((state) => ({
      toasts: [...state.toasts, { id, title, type }],
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
