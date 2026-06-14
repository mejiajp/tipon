import { clientFetch } from "@/lib/api/clientFetch";

// GET ALL
export const getAllExpenses = () => clientFetch("/expenses");

// GET GIVEN A RANGE
export const getExpenseRange = (start: string, end: string) =>
  clientFetch(`/expenses/range?start=${start}&end=${end}`);

// GET MONTHLY CALENDAR
export const getExpenseCalendar = (year: string, month: string) =>
  clientFetch(`/expenses/calendar?year=${year}&month=${month}`);

// GET RECENT
export const getRecentExpenses = () => clientFetch("/expenses/recent");
