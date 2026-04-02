import { clientFetch } from "@/lib/api/clientFetch";

export const getCurrentUser = () => clientFetch("/auth/current");

export const guestLogin = () =>
  clientFetch("/auth/guest", {
    method: "POST",
    credentials: "include",
  });

export const logoutUser = () =>
  clientFetch("/auth/logout", {
    method: "POST",
  });
