"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { guestLogin } from "@/lib/api/users.client";
import { useToastStore } from "@/lib/store/ToastStore";
import { useAuthStore } from "@/lib/store/AuthStore";

export default function LoginPage() {
  const router = useRouter();
  const addToast = useToastStore((state) => state.addToast);

  const { user, loading, refreshAuth } = useAuthStore();
  const [name, setName] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      router.replace("/home");
    }
  }, [user, loading, router]);

  if (loading || user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  async function handleGuestLogin(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await guestLogin(name); // backend call
      console.log(user);
      await refreshAuth(); // update Zustand store
      router.replace("/home"); // navigate
      addToast(
        `Logged in as Guest, welcome ${useAuthStore.getState().user?.name}!`,
        "guest"
      );
    } catch (err) {
      addToast("Guest login failed", "error");
      console.error(err);
    }
  }

  return (
    <>
      <div className="flex-1"></div>
      <div className="bg-bg p-base">
        <h3 className="text-text text-center text-huge font-bold my-5">
          Track your expenses!
        </h3>

        <form onSubmit={handleGuestLogin} className="flex flex-col gap-4 ">
          <input
            type="text"
            placeholder="Enter name as guest"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="outline rounded-base p-base"
          />
          <button
            type="submit"
            className="bg-primary p-base rounded-base text-white"
          >
            Continue as Guest
          </button>
        </form>

        <div className="my-6 text-center text-text-muted text-sm">or</div>

        <button className="w-full outline rounded-base p-base" disabled>
          Login with Email (coming soon)
        </button>
      </div>
    </>
  );
}
