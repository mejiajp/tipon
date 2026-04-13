"use client";

import React, { useState } from "react";
import { Calendar, CalendarDayButton } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface DayExpense {
  date: string;
  total: number;
}

interface CalendarViewProps {
  data: DayExpense[];
  showAmount?: boolean;
}

export default function CalendarView({
  data,
  showAmount = true,
}: CalendarViewProps) {
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

  return (
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
                  "group-data-[today=true]:bg-white group-data-[today=true]:opacity-100" // ← /btn suffix
                )}
              />
            </CalendarDayButton>
          );
        },
      }}
    />
  );
}
