import { getExpenseRange } from "@/lib/api/expenses.server";

export default async function page() {
  const expense = await getExpenseRange("2026-03-02", "2026-03-07");
  // console.log(expense);
  return <div>page</div>;
}
