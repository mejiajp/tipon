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

  const label =
    range === "daily"
      ? "yesterday"
      : range === "weekly"
      ? "last week"
      : "last month";

  const hasCurrentData = expenses.length > 0;
  const hasPreviousData = previousExpenses.length > 0;

  let percent: number | null = null;
  let comparisonLabel: string;

  if (!hasCurrentData) {
    comparisonLabel = `No record ${
      range === "daily"
        ? "today"
        : range === "weekly"
        ? "this week"
        : "this month"
    }`;
  } else if (!hasPreviousData) {
    comparisonLabel = `₱${formatAmount(total)} new since ${label}`;
  } else if (previousTotal === 0 && total === 0) {
    percent = 0;
    comparisonLabel = `0% same as ${label}`;
  } else if (previousTotal === 0) {
    comparisonLabel = `₱${formatAmount(total)} new spending since ${label}`;
  } else {
    percent = ((total - previousTotal) / previousTotal) * 100;

    comparisonLabel = `${Math.abs(percent).toFixed(0)}% ${
      percent > 0 ? "above" : percent < 0 ? "below" : "same as"
    } ${label}`;
  }

  return (
    <section className="px-base py-16 flex flex-col items-center">
      <h2 className="text-base">Total Spent</h2>

      <p className="font-bold text-[48px] -tracking-wider">
        PHP {formatAmount(total)}
      </p>

      <div className="flex items-center gap-1">
        {percent !== null && percent > 0 && <TrendUp className="w-4 h-4" />}
        {percent !== null && percent < 0 && <TrendDown className="w-4 h-4" />}

        <label>{comparisonLabel}</label>
      </div>
    </section>
  );
}
