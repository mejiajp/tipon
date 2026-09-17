import { setAuthCookies } from "@/lib/auth/authCookies";

export async function POST(req: Request) {
  const body = await req.json();

  const springRes = await fetch(`${process.env.SPRING_API_URL}/auth/google`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!springRes.ok) {
    const error = await springRes.text();

    console.error("GOOGLE AUTH ERROR:", {
      status: springRes.status,
      statusText: springRes.statusText,
      body: error,
    });

    return new Response(error || "Google login failed", {
      status: springRes.status,
    });
  }
  const data = await springRes.json();
  const { token, deviceId, ...userData } = data;

  const res = new Response(JSON.stringify(userData));
  setAuthCookies(res, token, deviceId);
  return res;
}
