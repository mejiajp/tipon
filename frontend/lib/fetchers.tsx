const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchAPI() {
  try {
    const res = await fetch(`${API_URL}/expenses`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(res);
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

export async function addExpense() {
  const res = await fetch(`${API_URL}/expenses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: 123.45,
      category: "Food",
      description: "Test Lunch",
      expenseDate: "2026-02-13",
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to add expense");
  }

  return res.json(); // returns the inserted expense
}
