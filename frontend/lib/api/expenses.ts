const API_URL = process.env.NEXT_PUBLIC_API_URL + "/expenses";

export async function getAllExpenses() {
  const res = await fetch(`${API_URL}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch all expenses");
  }

  return data;
}

export async function createExpense(expense: {
  amount: number;
  category: string;
  description: string;
}) {
  const res = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expense),
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to create expense");
  }

  return data;
}

export async function getExpenseRange(start: string, end: string) {
  const res = await fetch(`${API_URL}?start=${start}&end=${end}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.message || "Failed to fetch expenses for the specified range"
    );
  }

  return data;
}

export async function getExpenseCalendar(year: string, month: string) {
  const res = await fetch(`${API_URL}/calendar?year=${year}&month=${month}`);
  const data = await res.json();

  if (!res.ok)
    throw new Error(data.message || "Failed to fetch expense calendar");

  return data;
}
