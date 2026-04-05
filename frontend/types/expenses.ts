import { Category } from "./category";

export interface Expense {
  id: string;
  amount: number;
  category: Category;
  title: string;
  createdAt: string; // ISO string
  date: string; // ISO string
}
