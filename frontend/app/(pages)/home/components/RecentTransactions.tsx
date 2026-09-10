import { ExpenseList } from "@/components/ExpenseList";
import { Expense } from "@/types/expenses";
import Link from "next/link";

type RecentTransactionsProps = {
  expenses: Expense[];
};

export default function RecentTransactions({
  expenses,
}: RecentTransactionsProps) {
  return (
    <section className="flex flex-col p-base rounded-base gap-base bg-bg">
      <div className="flex justify-between">
        <h2>Recent Transactions</h2>

        <Link href="/calendar" className="text-text-muted text-small">
          See all
        </Link>
      </div>

      <ExpenseList expenses={expenses} />
    </section>
  );
}
