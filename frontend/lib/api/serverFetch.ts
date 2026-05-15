const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function serverFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const contentType = res.headers.get("content-type");

  let data = null;

  if (contentType?.includes("application/json")) {
    try {
      data = await res.json();
    } catch (err) {
      console.error("Failed to parse JSON:", err);
      data = null;
    }
  } else {
    const text = await res.text().catch(() => "");
    console.warn("Non-JSON response:", text);
    data = null;
  }

  if (!res.ok) {
    console.error("API ERROR:", res.status, data);

    // IMPORTANT: do NOT crash whole Server Component
    return null;
  }

  return data;
}
