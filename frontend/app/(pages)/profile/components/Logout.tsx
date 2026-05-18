"use client";

import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const { logout } = useAuthStore();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.replace("/login");
  }

  return (
    <div
      onClick={handleLogout}
      className="full-button text-white font-bold bg-red-500"
    >
      Logout
    </div>
  );
}
