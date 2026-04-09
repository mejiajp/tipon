"use client";

import { useToastStore } from "@/lib/store/ToastStore";
import Exit from "@/components/icons/toast/Exit";
import Check from "@/components/icons/toast/Check";
import Default from "@/components/icons/Ellipsis";

import Login from "@/components/icons/navigation/Profile";

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  const styles = {
    success: "bg-primary",
    error: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
    google: "bg-primary",
    guest: "bg-primary",
  };

  const icons = {
    success: <Check className="w-5 text-bg-light" />,
    error: <Exit className="w-5 text-bg-light" />,
    info: <Default className="w-5 text-bg-light" />,
    google: <Login className="w-5 text-bg-light" />,
    guest: <Login className="w-5 text-bg-light" />,
  };
  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-bg text-text  p-base rounded-base flex justify-center items-center gap-base shadow"
        >
          <div className={`rounded-full p-1.25 ${styles[toast.type]}`}>
            {icons[toast.type]}
          </div>
          <p className="leading-normal">{toast.title}</p>

          <button className="" onClick={() => removeToast(toast.id)}>
            <Exit className="w-5" />
          </button>
        </div>
      ))}
    </div>
  );
}
