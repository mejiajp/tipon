import { clientFetch } from "@/lib/api/clientFetch";

export const getCurrentUser = () => clientFetch("/auth/me");

export const guestLogin = (name: string) =>
  clientFetch("/auth/guest", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ name }),
  });

// Google Login using useGoogleLogin auth-code
export const googleLogin = (code: string) =>
  clientFetch("/auth/google", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ code }),
  });

export const logoutUser = () =>
  clientFetch("/auth/logout", {
    method: "POST",
  });
