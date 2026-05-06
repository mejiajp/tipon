"use client";

import { googleLogin } from "@/lib/api/users.client";
import { useGoogleLogin } from "@react-oauth/google";
import GoogleIcon from "@/public/images/google-icon.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function GoogleButton() {
  const router = useRouter();

  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (res) => {
      console.log(res);
      try {
        await googleLogin(res.code);
        router.replace("/home");
      } catch (err) {
        console.log(err);
      }
    },
    onError: (error) => {
      console.log(error);
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

      <span> Continue with Google</span>
    </button>
  );
}
