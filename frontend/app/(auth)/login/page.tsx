"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { guestLogin } from "@/lib/api/users.client";
import { useToastStore } from "@/stores/useToastStore";
import { useAuthStore } from "@/stores/useAuthStore";
import GoogleButton from "./GoogleButton";
import Image from "next/image";
import BackgroundImage from "@/public/images/login-background.jpg";

export default function LoginPage() {
  const router = useRouter();
  const addToast = useToastStore((state) => state.addToast);

  const { user, loading, refreshAuth } = useAuthStore();
  const [name, setName] = useState("");

  useEffect(() => {
    if (!loading && user) {
      router.replace("/home");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Logging in...</p>
      </div>
    );
  }

  if (user) {
    return null;
  }

  async function handleGuestLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await guestLogin(name);
      await refreshAuth();
      router.replace("/home");

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
    <div className="relative min-h-screen ">
      <Image
        src={BackgroundImage}
        alt="background"
        fill
        className="object-cover"
        priority
      />

      {/* Dark overlay */}
      <div className="absolute bottom-0 inset-0 bg-black/40" />

      {/* Content */}
      <div className="absolute bottom-0 z-10 bg-bg p-base rounded-t-base w-full ">
        <h3 className="text-text text-center text-huge font-bold my-5">
          Track your expenses!
        </h3>

        <form onSubmit={handleGuestLogin} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter name as guest"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="outline rounded-base p-base"
          />
          <button type="submit" className="full-button bg-primary text-white">
            Continue as Guest
          </button>
        </form>

        <div className="my-6 text-center text-text-muted text-sm">or</div>

        <GoogleButton />
      </div>
    </div>
  );
}
