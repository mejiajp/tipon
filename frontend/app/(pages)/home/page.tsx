import { getExpenseRange } from "@/lib/api/expenses.server";
import { getDateRanges } from "@/lib/getDateRanges";
import RangeFilter from "./components/RangeFilter";
import RecentTransactions from "./components/RecentTransactions";
import SpendingSplit from "./components/SpendingSplit";
import TotalSpent from "./components/TotalSpent";
import PageTitle from "@/components/PageTitle";

export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>;
}) {
  const params = await searchParams;
  const range = params.range ?? "weekly";

  const now = new Date();
  const ranges = getDateRanges(now);

  const selected =
    range === "daily"
      ? ranges.day
      : range === "weekly"
      ? ranges.week
      : ranges.month;

  // current expenses
  const expenses = await getExpenseRange(
    selected.start.toISOString().split("T")[0],
    selected.end.toISOString().split("T")[0]
  );

  // previous date reference
  const previousDate =
    range === "daily"
      ? new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
      : range === "weekly"
      ? new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)
      : new Date(now.getFullYear(), now.getMonth() - 1, 1);

  const prevRanges = getDateRanges(previousDate);

  const previous =
    range === "daily"
      ? prevRanges.day
      : range === "weekly"
      ? prevRanges.week
      : prevRanges.month;

  const previousExpenses = await getExpenseRange(
    previous.start.toISOString().split("T")[0],
    previous.end.toISOString().split("T")[0]
  );

  return (
    <>
      <PageTitle
        title="Home"
        slot={
          <RangeFilter>
            <p>{selected.label}</p>
          </RangeFilter>
        }
      />

      <div className="flex flex-col gap-base">
        <TotalSpent
          expenses={expenses}
          previousExpenses={previousExpenses}
          range={range}
        />
        <SpendingSplit expenses={expenses} range={range} />
        <RecentTransactions />
      </div>
    </>
  );
}
