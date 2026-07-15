export async function clientFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`/api/proxy${path}`, {
    // relative, same-origin → Next.js server
    ...options,
    credentials: "include", //it's same-site, so it just works
    headers: {
      "Content-Type": "application/json",
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
