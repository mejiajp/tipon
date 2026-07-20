import { getDeviceCookie, setAuthCookies } from "@/lib/auth/authCookies";

export async function POST(req: Request) {
  const body = await req.json();
  const deviceId = await getDeviceCookie();

  const springRes = await fetch(
    `${process.env.SPRING_API_URL}/api/auth/guest`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(deviceId && { "X-Device-Id": deviceId }),
      },
      body: JSON.stringify(body),
    }
  );

  if (!springRes.ok)
    return new Response("Login failed", { status: springRes.status });

  const data = await springRes.json();
  const { token, deviceId: newDeviceId, ...userData } = data;

  const res = new Response(JSON.stringify(userData));
  setAuthCookies(res, token, newDeviceId);
  return res;
}
