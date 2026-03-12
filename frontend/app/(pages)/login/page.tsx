"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import { useEffect } from "react";

export default function LoginPage() {
  const { token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && token) {
      router.push("/dashboard");
    }
  }, [token, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Welcome to Tipon
        </h1>

        <p className="text-sm text-gray-500 text-center mb-6">
          Track your expenses instantly.
        </p>

        <button
          className="w-full bg-black text-white py-2 rounded hover:opacity-80 transition"
          onClick={() => window.location.reload()}
        >
          Continue as Guest
        </button>

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
