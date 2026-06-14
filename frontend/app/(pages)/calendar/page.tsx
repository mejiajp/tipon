import { getExpenseCalendar } from "@/lib/api/expenses.server";
import React from "react";
import CalendarView from "./components/CalendarView";
import PageTitle from "@/components/PageTitle";

export const dynamic = "force-dynamic";

export default async function page() {
  const currentDate = new Date();
  const year = currentDate.getFullYear().toString();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");

  const data = await getExpenseCalendar(year, month);

  if (!data) {
    return (
      <div className="">
        <PageTitle title="Calendar" />
        <div className="flex flex-col gap-base">
          <p className="text-center text-gray-500">
            Failed to load calendar data.
          </p>
        </div>
      </div>
    );
  }

  console.log(data);
  return (
    <div className="">
      <PageTitle title="Calendar" />
      <div className="flex flex-col gap-base">
        <CalendarView data={data} />
      </div>
    </div>
  );
}
