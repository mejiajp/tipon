import { getDeviceCookie, clearAuthCookies } from "@/lib/auth/authCookies";

export async function POST() {
  const deviceId = await getDeviceCookie();

  await fetch(`${process.env.SPRING_API_URL}/api/auth/logout`, {
    method: "POST",
    headers: deviceId ? { "X-Device-Id": deviceId } : {},
  });

  const res = new Response(null, { status: 204 });
  clearAuthCookies(res);
  return res;
}
