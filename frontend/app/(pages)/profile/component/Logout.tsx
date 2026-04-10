"use client";

import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const { logout } = useAuthStore();
  const router = useRouter();

  async function handleLogout() {
    await logout(); // wait for backend to clear session
    router.replace("/login"); // redirect after logout completes
  }

  return (
    <div
      onClick={handleLogout}
      className="cursor-pointer text-red-600 hover:text-red-800"
    >
      Logout
    </div>
  );
}
