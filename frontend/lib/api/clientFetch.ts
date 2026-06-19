import parsingResponse from "./parsingResponse";

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

  const data = parsingResponse(res);

  return data;
}
