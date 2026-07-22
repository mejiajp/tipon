// lib/authApi.ts
export async function guestLogin(name: string) {
  const res = await fetch("/api/auth/guest", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
    credentials: "include",
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

export async function getMe() {
  const res = await fetch("/api/auth/me", { credentials: "include" });
  if (!res.ok) throw new Error("Not authenticated");
  return res.json();
}

export async function logout() {
  await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
}
