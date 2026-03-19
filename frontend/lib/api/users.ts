import { fetchAPI } from "./api";

export async function getCurrentUser() {
  fetchAPI("/auth/current");
}

export const guestLogin = () =>
  fetchAPI("/auth/guest", {
    method: "POST",
    credentials: "include",
  });

export const logoutUser = () =>
  fetchAPI("/auth/logout", {
    method: "POST",
  });
