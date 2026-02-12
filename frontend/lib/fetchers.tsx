const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchAPI() {
  try {
    const res = await fetch(`${API_URL}`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(res);
    return res.text();
  } catch (error) {
    console.log(error);
  }
}
