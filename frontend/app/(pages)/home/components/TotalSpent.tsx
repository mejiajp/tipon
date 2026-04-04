import TrendUp from "@/components/icons/TrendUp";
import React from "react";

export default function TotalSpent() {
  return (
    <section className="px-base py-[48px] flex flex-col items-center">
      <h2 className="font-bold -tracking-wider">TOTAL SPENT</h2>
      <p className="font-bold text-[48px] -tracking-wider">PHP 240.00</p>
      <div className="flex items-center">
        <TrendUp className="w-4 h-4" />
        <label>12% above last month</label>
      </div>
    </section>
  );
}
