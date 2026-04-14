import { ExpenseList } from "@/components/ExpenseList";
import DefaultIcon from "@/components/icons/Ellipsis";
import { getRecentExpenses } from "@/lib/api/expenses.server";
import { categoryIcons } from "@/lib/categoryIconsMap";
import { formatAmount, formatTransactionTime } from "@/lib/formatters";
import { Expense } from "@/types/expenses";
import Link from "next/link";

export default async function RecentTransactions() {
  const expenses: Expense[] = await getRecentExpenses();

  console.log(expenses);
  return (
    <section className="flex flex-col p-base rounded-base gap-base bg-bg">
      <div className="flex justify-between">
        <h2>Recent Transactions</h2>
        {/* add current date in this calendar as params later  */}
        <Link href="/calendar" className="text-text-muted text-small">
          See all
        </Link>
      </div>
      <ExpenseList expenses={expenses} />
    </section>
  );
}
