import { getDeviceCookie, setAuthCookies } from "@/lib/auth/authCookies";

export async function POST(req: Request) {
  const body = await req.json();
  const deviceId = await getDeviceCookie();

  const springRes = await fetch(`${process.env.SPRING_API_URL}/auth/guest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(deviceId && { "X-Device-Id": deviceId }),
    },
    body: JSON.stringify(body),
  });

  console.log("SPRING RESPONSE STATUS:", springRes.status);
  console.log("SPRING API URL:", process.env.SPRING_API_URL);

  if (!springRes.ok) {
    const error = await springRes.text();

    console.error("SPRING STATUS:", springRes.status);
    console.error("SPRING ERROR:", error);

    return new Response(error, {
      status: springRes.status,
    });
  }
  const data = await springRes.json();
  const { token, deviceId: newDeviceId, ...userData } = data;

  const res = new Response(JSON.stringify(userData));
  setAuthCookies(res, token, newDeviceId);
  return res;
}
