const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function clientFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
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
