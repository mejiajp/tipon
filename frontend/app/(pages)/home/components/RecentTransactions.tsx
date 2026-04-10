import { categoryIcons } from "@/lib/categoryIconsMap";
import DefaultIcon from "@/components/icons/Ellipsis";
import { formatTransactionTime } from "@/lib/formatTransactionTime";
import { getRecentExpenses } from "@/lib/api/expenses.server";
import { Expense } from "@/types/expenses";
import Link from "next/link";
import { formatAmount } from "@/lib/formatAmount";

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
      <ul>
        {expenses.map((expense) => {
          const Icon =
            categoryIcons[
              (expense.category.slug as keyof typeof categoryIcons) ||
                DefaultIcon
            ];

          return (
            <li
              key={expense.id}
              className="flex justify-between items-center h-15"
            >
              <div className="flex items-center">
                <div className="p-base">
                  <Icon className="w-8 h-8 text-text-muted" />
                </div>
                <div>
                  <p>{expense.title}</p>
                  <p className="text-text-muted">
                    {formatTransactionTime(expense.createdAt)},{" "}
                    {expense.category.name}
                  </p>
                </div>
              </div>
              <p className="font-bold">{formatAmount(expense.amount)}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
