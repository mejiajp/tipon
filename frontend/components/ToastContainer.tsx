"use client";

import { useToastStore } from "@/lib/toast/ToastStore";

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-bg text-white px-4 py-2 rounded-md shadow"
        >
          {toast.title}

          <button onClick={() => removeToast(toast.id)} className="ml-2">
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
