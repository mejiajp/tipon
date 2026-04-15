import { getExpenseRange } from "@/lib/api/expenses.server";
import { getDateRanges } from "@/lib/getDateRanges";
import RangeFilter from "./components/RangeFilter";
import RecentTransactions from "./components/RecentTransactions";
import SpendingSplit from "./components/SpendingSplit";
import TotalSpent from "./components/TotalSpent";
import PageTitle from "@/components/PageTitle";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>;
}) {
  const params = await searchParams;
  const range = params.range ?? "weekly";
  const ranges = getDateRanges(new Date());

  const selected =
    range === "daily"
      ? ranges.day
      : range === "weekly"
      ? ranges.week
      : ranges.month;

  // Fetch expenses for selected range
  const expenses = await getExpenseRange(
    selected.start.toISOString().split("T")[0],
    selected.end.toISOString().split("T")[0]
  );

  return (
    <>
      <PageTitle
        title="Home"
        slot={
          <RangeFilter>
            <p>{selected.label}</p>
            <div></div>
          </RangeFilter>
        }
      />

      <div className="flex flex-col gap-base">
        <TotalSpent expenses={expenses} />
        <SpendingSplit expenses={expenses} range={range} />
        <RecentTransactions />
      </div>
    </>
  );
}
