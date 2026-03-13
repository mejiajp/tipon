import { fetchAPI } from "@/lib/api/api";

export const getAllExpenses = () => fetchAPI("/expenses");

export const getExpenseRange = (start: string, end: string) =>
  fetchAPI(`/expenses/range?start=${start}&end=${end}`);

export const getExpenseCalendar = (year: string, month: string) =>
  fetchAPI(`/expenses/calendar?year=${year}&month=${month}`);
export const createExpense = (expense: {
  amount: number;
  category: string;
  description: string;
}) =>
  fetchAPI("/expenses", {
    method: "POST",
    body: JSON.stringify(expense),
  });
