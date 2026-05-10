"use client";

import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Expense } from "@/types/expenses";
import { ExpenseList } from "@/components/ExpenseList";

interface DayExpense {
  date: string;
  expense: Expense[];
  total: number;
}

interface CalendarViewProps {
  data: DayExpense[];
}

export default function CalendarView({ data }: CalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [month, setMonth] = useState<Date>(new Date());

  const getHeat = (total: number) => {
    const ratio = total / 10000;
    if (ratio > 0.75) return "bg-green-900";
    if (ratio > 0.5) return "bg-green-500";
    if (ratio > 0.25) return "bg-green-300";
    if (total === 0) return "";
    return "bg-green-100";
  };

  const selectedDateExpenses = data.find(
    (d) => new Date(d.date).toDateString() === selectedDate.toDateString()
  );

  const changeMonth = (dir: "prev" | "next") => {
    setMonth((prev) => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + (dir === "next" ? 1 : -1));
      return newMonth;
    });
  };

  return (
    <div className="flex flex-col gap-4 p-2 bg-bg rounded-base">
      {/* 🔥 CUSTOM HEADER (STANDARD APPROACH) */}
      <div className="flex items-center justify-between p-2">
        <h2 className=" text-larger pl-1 ">
          {month.toLocaleString("en-PH", {
            month: "long",
            year: "numeric",
          })}
        </h2>

        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => changeMonth("prev")}
          >
            <ChevronLeftIcon className="size-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => changeMonth("next")}
          >
            <ChevronRightIcon className="size-4" />
          </Button>
        </div>
      </div>

      {/* CALENDAR */}
      <Calendar
        mode="single"
        month={month}
        onMonthChange={setMonth}
        selected={selectedDate}
        onSelect={setSelectedDate}
        className="w-full"
        required
        components={{
          DayButton: ({ day, modifiers, ...props }) => {
            const entry = data.find(
              (d) => new Date(d.date).toDateString() === day.date.toDateString()
            );

            return (
              <div className="relative group">
                <button {...props} className={cn(props.className)} />

                {/* heat indicator */}
                <span
                  className={cn(
                    "absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[70%] h-1 rounded-full pointer-events-none",
                    entry ? getHeat(entry.total) : ""
                  )}
                />
              </div>
            );
          },
        }}
      />

      {/* EXPENSE SECTION */}
      <section className="flex flex-col p-base rounded-base gap-base bg-bg">
        <h3 className="section">
          {selectedDateExpenses?.date
            ? new Date(selectedDateExpenses.date).toLocaleString("en-PH", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })
            : ""}
        </h3>

        {selectedDateExpenses?.expense.length ? (
          <ExpenseList expenses={selectedDateExpenses.expense} />
        ) : (
          <div className="h-20 flex justify-center items-center">
            <h3>No recorded expense this day...</h3>
          </div>
        )}
      </section>
    </div>
  );
}
