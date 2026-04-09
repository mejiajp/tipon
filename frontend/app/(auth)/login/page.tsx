"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import { useEffect, useState } from "react";
import { guestLogin } from "@/lib/api/users.client";
// import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const { user, loading, refreshAuth } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");

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

  async function handleGuestLogin() {
    await guestLogin(name);
    await refreshAuth();
    router.replace("/home");
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
