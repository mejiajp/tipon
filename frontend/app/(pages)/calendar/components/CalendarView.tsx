"use client";

import React, { useState } from "react";

import { Calendar } from "@/components/ui/calendar";

export default function CalendarView() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  console.log(selectedDate);
  return (
    <Calendar
      mode="single"
      selected={selectedDate}
      onSelect={setSelectedDate}
      className="w-full"
    />
  );
}
