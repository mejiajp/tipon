import { getExpenses } from "@/lib/fetchers/expenses";
import React from "react";

export default async function page() {
  const expense = await getExpenses();
  console.log(expense);
  return <div>page</div>;
}
