"use client";

import React, { useState } from "react";
import { Calendar, CalendarDayButton } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Expense } from "@/types/expenses";
import { ExpenseList } from "@/components/ExpenseList";

interface DayExpense {
  date: string;
  expense: Expense[];
  total: number;
}

interface CalendarViewProps {
  data: DayExpense[];
  showAmount?: boolean;
}

export default function CalendarView({ data }: CalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  const getHeat = (total: number) => {
    const ratio = total / 10000;
    if (ratio > 0.75) return "bg-green-900 ";
    if (ratio > 0.5) return "bg-green-500 ";
    if (ratio > 0.25) return "bg-green-300 ";
    if (total === 0) return "";
    return "bg-green-100";
  };

  const selectedDateExpenses = data.find(
    (d) => new Date(d.date).toDateString() === selectedDate?.toDateString()
  );
  console.log(selectedDateExpenses);

  return (
    <>
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        className="w-full"
        required
        components={{
          DayButton: ({ day, modifiers, ...props }) => {
            const entry = data.find(
              (d) => new Date(d.date).toDateString() === day.date.toDateString()
            );

            // console.log({ day: day.date.toDateString(), entry });
            return (
              <CalendarDayButton
                day={day}
                modifiers={modifiers}
                {...props}
                className={cn(props.className, "group")}
              >
                {props.children}

                <span
                  className={cn(
                    "w-[70%] h-1 absolute bottom-[10%] rounded-full",
                    `${entry ? getHeat(entry.total) : ""}`,
                    `${
                      entry?.expense.length
                        ? "group-data-[today=true]:bg-white group-data-[today=true]:opacity-100"
                        : ""
                    }` // ← /btn suffix
                  )}
                />
              </CalendarDayButton>
            );
          },
        }}
      />
      <section className="flex flex-col p-base rounded-base gap-base bg-bg">
        {selectedDateExpenses?.expense.length ? (
          <>
            <h3 className="section">
              {new Date(selectedDateExpenses.date).toLocaleString("en-PH", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </h3>
            <div>
              <ExpenseList expenses={selectedDateExpenses.expense} />
            </div>
          </>
        ) : (
          <div>
            <div className="h-20 flex justify-center items-center">
              <h3>No recorded expense this day...</h3>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
