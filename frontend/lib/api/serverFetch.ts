// serverFetch.ts
import { cookies } from "next/headers";

const API_URL = process.env.SPRING_API_URL; // server-only, not NEXT_PUBLIC_

export async function serverFetch(path: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const deviceId = cookieStore.get("deviceId")?.value;

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(deviceId && { "X-Device-Id": deviceId }),
      ...(options.headers || {}),
    },
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw new Error(data?.message || `HTTP ${res.status}`);
  }

  return data;
}
