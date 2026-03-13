import { getExpenseRange } from "@/lib/api/expenses";

export default async function page() {
  const expense = await getExpenseRange("2026-03-02", "2024-03-02");
  console.log(expense);
  return <div>page</div>;
}
