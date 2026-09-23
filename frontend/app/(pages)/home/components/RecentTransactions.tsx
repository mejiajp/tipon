import { ExpenseList } from "@/components/ExpenseList";
import { Expense } from "@/types/expenses";
import Link from "next/link";

type RecentTransactionsProps = {
  expenses: Expense[];
};

export default function RecentTransactions({
  expenses,
}: RecentTransactionsProps) {
  console.log(expenses);
  return (
    <section className="flex flex-col p-base rounded-base gap-base bg-bg">
      <div className="flex justify-between">
        <h2>Recent Transactions</h2>

        <Link href="/calendar" className="text-text-muted text-small">
          See all
        </Link>
      </div>

      {expenses.length > 0 ? (
        <ExpenseList expenses={expenses} />
      ) : (
        <div className="h-37.5 flex justify-center items-center">
          <h3>No recorded expense...</h3>
        </div>
      )}
    </section>
  );
}
