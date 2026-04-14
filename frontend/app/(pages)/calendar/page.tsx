import { getExpenseCalendar } from "@/lib/api/expenses.server";
import React from "react";
import CalendarView from "./components/CalendarView";

export default async function page() {
  const currentDate = new Date();
  const year = currentDate.getFullYear().toString();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");

  const data = await getExpenseCalendar(year, month);

  console.log(data);
  return (
    <div className="">
      <div className="page-title-container">
        <h1 className="page-title ">Calendar</h1>
      </div>
      <div className="flex flex-col gap-base">
        <CalendarView data={data} />
      </div>
    </div>
  );
}
