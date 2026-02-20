const API_URL = process.env.NEXT_PUBLIC_API_URL + "/auth";

export async function getCurrentUser() {
  const response = await fetch(`${API_URL}/current`, {
    credentials: "include",
  });
  const user = await response.json();
  console.log("Current user:", user);
  return user;
}
