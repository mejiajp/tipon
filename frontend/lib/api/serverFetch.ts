import { cookies } from "next/headers";
import parsingResponse from "./parsingResponse";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function serverFetch(path: string, options: RequestInit = {}) {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
      ...(options.headers || {}),
    },
  });

  const data = parsingResponse(res);

  return data;
}
