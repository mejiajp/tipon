import {
  getTokenCookie,
  getDeviceCookie,
  setAuthCookies,
} from "@/lib/auth/authCookies";

export async function POST(req: Request) {
  const token = await getTokenCookie();
  const deviceId = await getDeviceCookie();
  const body = await req.json();

  const springRes = await fetch(`${process.env.SPRING_API_URL}/auth/link`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(deviceId && { "X-Device-Id": deviceId }),
    },
    body: JSON.stringify(body),
  });

  if (!springRes.ok) {
    const error = await springRes.text();

    console.error("SPRING RESPONSE:", {
      status: springRes.status,
      statusText: springRes.statusText,
      body: error,
    });

    console.log("LINK AUTH:", {
      hasToken: !!token,
      hasDeviceId: !!deviceId,
    });

    return new Response(error || "Google linking failed", {
      status: springRes.status,
    });
  }

  const data = await springRes.json();

  const { token: newToken, deviceId: newDeviceId, ...userData } = data;

  const res = new Response(JSON.stringify(userData));

  if (newToken) {
    setAuthCookies(res, newToken, newDeviceId);
  }

  return res;
}
