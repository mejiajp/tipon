const API_URL = process.env.NEXT_PUBLIC_API_URL + "/auth";

export async function getCurrentUser() {
  const response = await fetch(`${API_URL}/current`, {});
  const user = await response.json();
  console.log("Current user:", user);

  if (!response.ok) {
    throw new Error(user.message || "Failed to fetch current user");
  }

  return user;
}

export async function guestLogin(deviceId: string) {
  const response = await fetch(`${API_URL}/guest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ deviceId }),
  });
  const user = await response.json();

  if (!response.ok) {
    throw new Error(user.message || "Failed to login as guest");
  }

  return user;
}
