import { getExpenseRange} from "@/lib/fetchers/expenses";
import React from "react";

export default async function page() {
  const expense = await getExpenseRange("2026-03-02", "2024-03-02");
  console.log(expense);
  return <div>page</div>;
}
