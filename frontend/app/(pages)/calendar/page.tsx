import { getExpenseCalendar } from "@/lib/api/expenses.server";
import React from "react";
import CalendarView from "./components/CalendarView";

export default async function page() {
  const data = await getExpenseCalendar("2026", "01");
  console.log(data);
  return (
    <div>
      <CalendarView />
    </div>
  );
}
