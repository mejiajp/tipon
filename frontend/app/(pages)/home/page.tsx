import { getExpenseRange } from "@/lib/api/expenses.server";
import TotalSpent from "./components/TotalSpent";
import SpendingSplit from "./components/SpendingSplit";
import RecentTransactions from "./components/RecentTransactions";
import Down from "@/components/icons/Down";

export default async function page() {
  const expense = await getExpenseRange("2026-03-02", "2026-03-07");
  console.log(expense);
  return (
    <>
      <div className="flex justify-between  mb-5">
        <h1 className="page-title">Expenses</h1>
        <div className="flex items-center bg-primary gap-small rounded-full px-base py-[8px] text-smaller text-white">
          <p>March 2026</p>
          <Down className="w-4 h-4  ml-1" />
        </div>
      </div>
      <div className="flex flex-col gap-base">
        <TotalSpent />
        <SpendingSplit />
        <RecentTransactions />
      </div>
    </>
  );
}
