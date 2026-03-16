export function getDeviceId(): string | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie.match(/(^| )deviceId=([^;]+)/);
  return match ? match[2] : null;
}
