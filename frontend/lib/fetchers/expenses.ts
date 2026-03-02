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
  try {
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
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error adding expense:", error);
  }
}

export async function getExpenseRange(start: string, end: string) {
  try {
    const res = await fetch(`${API_URL}?start=${start}&end=${end}`);
    if (!res.ok) {
      throw new Error("Failed to fetch expense range");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching expense range:", error);
  }
}

export async function getExpenseCalendar(year: string, month: string) {
  const res = await fetch(`${API_URL}/calendar?year=${year}&month=${month}`);

  const data = await res.json();

  if (!res.ok)
    throw new Error(data.message || "Failed to fetch expense calendar");

  console.log(data);
  return data;
}
