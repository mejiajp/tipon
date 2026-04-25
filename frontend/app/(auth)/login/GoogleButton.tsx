"use client";

import { GoogleLogin } from "@react-oauth/google";

export default function GoogleButton() {
  const handleSuccess = async () => {
    //call backend to exchange token and log in user, then refresh auth state and navigate
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => console.log("Login Failed")}
    />
  );
}
