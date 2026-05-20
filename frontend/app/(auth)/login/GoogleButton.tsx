"use client";

import { googleLogin } from "@/lib/api/users.client";
import { useGoogleLogin } from "@react-oauth/google";
import GoogleIcon from "@/public/images/google-icon.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { useToastStore } from "@/stores/useToastStore";

export default function GoogleButton() {
  const router = useRouter();

  const refreshAuth = useAuthStore((state) => state.refreshAuth);
  const addToast = useToastStore((state) => state.addToast);

  const login = useGoogleLogin({
    flow: "auth-code",

    onSuccess: async (res) => {
      try {
        await googleLogin(res.code);

        // IMPORTANT
        await refreshAuth();

        addToast(`Welcome ${useAuthStore.getState().user?.name}!`, "success");

        router.replace("/home");
      } catch (err) {
        console.log(err);
        addToast("Google login failed", "error");
      }
    },

    onError: (error) => {
      console.log(error);
      addToast("Google login failed", "error");
    },
  });

  return (
    <button
      onClick={() => login()}
      className="full-button outline flex justify-center items-center"
    >
      <Image
        width="100"
        height="100"
        src={GoogleIcon.src}
        alt="Google Icon"
        className="w-5 h-5 mr-2"
      />

      <span>Continue with Google</span>
    </button>
  );
}
