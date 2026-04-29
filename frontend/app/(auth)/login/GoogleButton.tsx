"use client";

import { googleLogin } from "@/lib/api/users.client";
import { useGoogleLogin } from "@react-oauth/google";

export default function GoogleButton() {
  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (res) => {
      console.log(res);
      await googleLogin(res.code);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <button onClick={() => login()} className="full-button outline">
      Continue with Google
    </button>
  );
}
