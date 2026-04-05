import { getExpenseRange } from "@/lib/api/expenses.server";
import { getDateRanges } from "@/lib/getDateRanges";
import TotalSpent from "./components/TotalSpent";
import SpendingSplit from "./components/SpendingSplit";
import RecentTransactions from "./components/RecentTransactions";
import RangeFilter from "./components/RangeFilter";
import { searchRegistries } from "shadcn/registry";

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

  console.log(selected);

  console.log(expenses);

  return (
    <div className="">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Expenses</h1>
        <RangeFilter>
          <p>{selected.label}</p>
          <div></div>
        </RangeFilter>
      </div>

      <div className="flex flex-col gap-6">
        <TotalSpent expenses={expenses} />
        <SpendingSplit />
        <RecentTransactions />
      </div>
    </div>
  );
}
