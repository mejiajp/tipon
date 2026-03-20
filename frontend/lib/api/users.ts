import { clientFetch, serverFetch } from "./api";

export async function getCurrentUser() {
  serverFetch("/auth/current");
}

export const guestLogin = () =>
  clientFetch("/auth/guest", {
    method: "POST",
    credentials: "include",
  });

export const logoutUser = () =>
  clientFetch("/auth/logout", {
    method: "POST",
  });
