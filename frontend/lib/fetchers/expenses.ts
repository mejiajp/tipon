const API_URL = process.env.NEXT_PUBLIC_API_URL + "/expenses";

export async function getExpenses() {
  try {
    const res = await fetch(`${API_URL}`);
    if (!res.ok) {
      throw new Error("Failed to fetch expenses");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching expenses:", error);
  }
}

export async function createExpense() {
  const res = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: 123.45,
      category: "Food",
      description: "Test Lunch",
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to add expense");
  }
  return res.json();
}
