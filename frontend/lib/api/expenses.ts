import { serverFetch, clientFetch } from "@/lib/api/api";

// GET ALL
export const getAllExpenses = () => serverFetch("/expenses");

// GET GIVEN A RANGE
export const getExpenseRange = (start: string, end: string) =>
  serverFetch(`/expenses/range?start=${start}&end=${end}`);

// GET MONTHLY CALENDAR
export const getExpenseCalendar = (year: string, month: string) =>
  serverFetch(`/expenses/calendar?year=${year}&month=${month}`);

// POST NEW
export const createExpense = (expense: {
  amount: number;
  category: string;
  description: string;
}) =>
  clientFetch("/expenses", {
    method: "POST",
    body: JSON.stringify(expense),
  });
