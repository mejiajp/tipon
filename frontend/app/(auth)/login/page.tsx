"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import { useEffect } from "react";
import { guestLogin } from "@/lib/api/users";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const { user, loading, refreshAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  if (loading || user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  async function handleGuestLogin() {
    await guestLogin();
    await refreshAuth();
    router.replace("/dashboard");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-bg-dark">
      <div className="bg-bg  rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Welcome to Tipon
        </h1>

        <p className="text-sm text-gray-500 text-center mb-6">
          Track your expenses instantly.
        </p>

        {/* <button
          className="w-full bg-primary text-white py-2 rounded hover:opacity-80 transition"
          onClick={handleGuestLogin}
        >
          Continue as Guest
        </button> */}
        <Button onClick={handleGuestLogin}>Continue as Guest </Button>

        <div className="my-6 text-center text-gray-400 text-sm">or</div>

        <button
          className="w-full border py-2 rounded hover:bg-gray-50 transition"
          disabled
        >
          Login with Email (coming soon)
        </button>
      </div>
    </div>
  );
}
