import { cookies } from "next/headers";

const TOKEN_COOKIE = "token";
const DEVICE_COOKIE = "deviceId";

export async function getTokenCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(TOKEN_COOKIE)?.value;
}

export async function getDeviceCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(DEVICE_COOKIE)?.value;
}

export function setAuthCookies(
  res: Response,
  token?: string,
  deviceId?: string
) {
  if (token) {
    res.headers.append(
      "Set-Cookie",
      `${TOKEN_COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${
        60 * 60 * 24
      }` // 1 day
    );
  }

  if (deviceId) {
    res.headers.append(
      "Set-Cookie",
      `${DEVICE_COOKIE}=${deviceId}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${
        60 * 60 * 24 * 30
      }` // 30 days
    );
  }
}

export function clearAuthCookies(res: Response) {
  res.headers.append(
    "Set-Cookie",
    `${TOKEN_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`
  );
  res.headers.append(
    "Set-Cookie",
    `${DEVICE_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`
  );
}
