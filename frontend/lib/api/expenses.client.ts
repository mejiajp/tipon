import { Category } from "@/types/category";
import { clientFetch } from "./clientFetch";

// POST NEW
export const createExpense = (expense: {
  amount: number;
  category: Category;
  title: string;
}) =>
  clientFetch("/expenses", {
    method: "POST",
    body: JSON.stringify(expense),
  });
