import { fetchAPI } from "@/lib/api/api";

// GET ALL
export const getAllExpenses = () => fetchAPI("/expenses");

// GET GIVEN A RANGE
export const getExpenseRange = (start: string, end: string) =>
  fetchAPI(`/expenses/range?start=${start}&end=${end}`);

// GET MONTHLY CALENDAR
export const getExpenseCalendar = (year: string, month: string) =>
  fetchAPI(`/expenses/calendar?year=${year}&month=${month}`);

// POST NEW
export const createExpense = (expense: {
  amount: number;
  category: string;
  description: string;
}) =>
  fetchAPI("/expenses", {
    method: "POST",
    body: JSON.stringify(expense),
  });
