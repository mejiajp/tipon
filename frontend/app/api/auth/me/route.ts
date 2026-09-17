import {
  getTokenCookie,
  getDeviceCookie,
  setAuthCookies,
} from "@/lib/auth/authCookies";

export async function GET() {
  const token = await getTokenCookie();
  const deviceId = await getDeviceCookie();

  const springRes = await fetch(`${process.env.SPRING_API_URL}/auth/me`, {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(deviceId && { "X-Device-Id": deviceId }),
    },
  });

  if (!springRes.ok) {
    const error = await springRes.text();

    console.error("GOOGLE AUTH ERROR:", {
      status: springRes.status,
      statusText: springRes.statusText,
      body: error,
    });

    return new Response(error || "Google login failed", {
      status: 401,
    });
  }

  const data = await springRes.json();
  const { token: newToken, deviceId: newDeviceId, ...userData } = data;

  const res = new Response(JSON.stringify(userData));
  if (newToken) setAuthCookies(res, newToken, newDeviceId);
  return res;
}
