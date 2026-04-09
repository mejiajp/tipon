import { clientFetch } from "@/lib/api/clientFetch";

export const getCurrentUser = () => clientFetch("/auth/current");

export const guestLogin = (name: string) =>
  clientFetch("/auth/guest", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ name }),
  });

export const logoutUser = () =>
  clientFetch("/auth/logout", {
    method: "POST",
  });
