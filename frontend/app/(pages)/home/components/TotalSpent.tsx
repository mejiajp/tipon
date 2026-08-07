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

  const comparison = (() => {
    if (!hasCurrentData && !hasPreviousData) {
      return {
        percent: 0,
        trend: "none" as const,
        label: `No spending ${
          range === "daily"
            ? "today"
            : range === "weekly"
            ? "this week"
            : "this month"
        }`,
      };
    }

    if (!hasCurrentData) {
      return {
        percent: null,
        trend: "none" as const,
        label: `No spending ${
          range === "daily"
            ? "today"
            : range === "weekly"
            ? "this week"
            : "this month"
        }`,
      };
    }

    if (!hasPreviousData) {
      return {
        percent: null,
        trend: "none" as const,
        label: `₱${formatAmount(total)} new spending since ${label}`,
      };
    }

    const percent = ((total - previousTotal) / previousTotal) * 100;

    return {
      percent,
      trend:
        percent > 0
          ? ("up" as const)
          : percent < 0
          ? ("down" as const)
          : ("none" as const),
      label: `${Math.abs(percent).toFixed(0)}% ${
        percent > 0 ? "above" : percent < 0 ? "below" : "same as"
      } ${label}`,
    };
  })();

  return (
    <section className="px-base py-16 flex flex-col items-center">
      <h2 className="text-base">Total Spent</h2>

      <p className="font-bold text-[48px] -tracking-wider">
        PHP {formatAmount(total)}
      </p>

      <div className="flex items-center gap-1">
        {comparison.trend === "up" && <TrendUp className="w-4 h-4" />}
        {comparison.trend === "down" && <TrendDown className="w-4 h-4" />}

        <label>{comparison.label}</label>
      </div>
    </section>
  );
}
