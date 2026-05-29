import TrendUp from "@/components/icons/TrendUp";
import TrendDown from "@/components/icons/TrendDown";
import { formatAmount } from "@/lib/formatters";
import { Expense } from "@/types/expenses";

export default function TotalSpent({
  expenses,
  previousExpenses,
  range,
}: {
  expenses: Expense[];
  previousExpenses: Expense[];
  range: string;
}) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  const previousTotal = previousExpenses.reduce((sum, e) => sum + e.amount, 0);

  const percent =
    previousTotal === 0 ? 0 : ((total - previousTotal) / previousTotal) * 100;

  const comparisonText =
    percent > 0 ? "above" : percent < 0 ? "below" : "same as";

  const label =
    range === "daily"
      ? "yesterday"
      : range === "weekly"
      ? "last week"
      : "last month";

  return (
    <section className="px-base py-16 flex flex-col items-center">
      <h2 className="text-base">Total Spent</h2>

      <p className="font-bold text-[48px] -tracking-wider">
        PHP {formatAmount(total)}
      </p>

      <div className="flex items-center gap-1">
        {percent > 0 ? (
          <TrendUp className="w-4 h-4" />
        ) : percent < 0 ? (
          <TrendDown className="w-4 h-4" />
        ) : null}

        <label>
          {Math.abs(percent).toFixed(0)}%{" "}
          {percent > 0 ? "above" : percent < 0 ? "below" : "same as"} {label}
        </label>
      </div>
    </section>
  );
}
