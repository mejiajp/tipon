import { getTokenCookie } from "@/lib/auth/authCookies";

async function handler(
  req: Request,
  { params }: { params: { path: string[] } }
) {
  const token = await getTokenCookie();
  const path = params.path.join("/");

  const springRes = await fetch(`${process.env.SPRING_API_URL}/api/${path}`, {
    method: req.method,
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
      "Content-Type": "application/json",
    },
    body: ["GET", "HEAD"].includes(req.method) ? undefined : await req.text(),
  });

  const data = await springRes.text();

  return new Response(data, {
    status: springRes.status,
    headers: { "Content-Type": "application/json" },
  });
}

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as DELETE,
  handler as PATCH,
};
