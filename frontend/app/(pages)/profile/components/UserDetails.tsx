"use client";

import { googleLink } from "@/lib/api/users.client";
import GoogleIcon from "@/public/images/google-icon.png";
import { useAuthStore } from "@/stores/useAuthStore";
import { useToastStore } from "@/stores/useToastStore";
import { useGoogleLogin } from "@react-oauth/google";
import Image from "next/image";

export default function UserDetails() {
  const { user, refreshAuth } = useAuthStore();
  const addToast = useToastStore((state) => state.addToast);

  const linkGoogle = useGoogleLogin({
    flow: "auth-code",

    onSuccess: async (res) => {
      try {
        await googleLink(res.code);

        // refresh current session so guest → google is reflected
        await refreshAuth();

        addToast("Google account linked successfully!", "success");
      } catch (err) {
        console.error(err);
        addToast("Failed to link Google account", "error");
      }
    },

    onError: (error) => {
      console.error(error);
      addToast("Google linking failed", "error");
    },
  });

  if (!user) return null;

  return (
    <div className="space-y-base">
      <div className="flex flex-col items-center">
        <div className="w-24 aspect-square rounded-full text-[48px] text-white bg-primary flex justify-center items-center mb-base">
          {user.name?.split("")[0]?.toUpperCase()}
        </div>

        <h3 className="text-xl font-semibold">{user.name}</h3>

        <h3 className="text-text-muted">
          {user.email ? user.email : "Guest User"}
        </h3>
      </div>

      <div className="flex justify-between gap-5">
        <div className="bg-bg rounded-base flex-1 p-base text-center flex flex-col justify-center">
          <p>Joined since:</p>
          <p>
            {new Date(user.createdAt).toLocaleDateString("en-PH", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="bg-bg rounded-base flex-1 p-base text-center flex flex-col justify-center">
          {user.provider === "GOOGLE" ? (
            <>
              <p>Account Type:</p>
              <p>{user.provider}</p>
            </>
          ) : (
            <>
              <p>Logged as Guest</p>

              <button
                onClick={() => linkGoogle()}
                className="mt-2 border border-text-muted text-text px-4 py-2 rounded-base flex justify-center hover:bg-primary hover:border-primary transition-colors duration-300 ease-in-out cursor-pointer"
              >
                <Image
                  width="100"
                  height="100"
                  src={GoogleIcon.src}
                  alt="Google Icon"
                  className="w-5 h-5 mr-2"
                />
                <p>Link to Google</p>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
