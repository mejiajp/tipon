import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function serverFetch(path: string, options: RequestInit = {}) {
  const cookieStore = await cookies();

  const jwt = cookieStore.get("jwt")?.value;
  const deviceId = cookieStore.get("deviceId")?.value;

  const cookieHeader = [
    jwt ? `jwt=${jwt}` : null,
    deviceId ? `deviceId=${deviceId}` : null,
  ]
    .filter(Boolean)
    .join("; ");

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
      ...(options.headers || {}),
    },
  });

  let data;

  try {
    data = await res.json();
  } catch (err) {
    console.error("Failed to parse JSON:", err);
    throw new Error("Invalid API response format");
  }

  if (!res.ok) {
    console.error("API ERROR:", res.status, data);

    throw new Error(data?.message || `HTTP ${res.status}`);
  }

  return data;
}
