"use client";

import {
  default as DefaultIcon,
  default as Ellipsis,
} from "@/components/icons/Ellipsis";
import { categoryIcons } from "@/lib/categoryIconsMap";
import { Expense } from "@/types/expenses";
import { useState } from "react";

export default function SpendingSplit({
  expenses,
  range,
}: {
  expenses: Expense[];
  range: string;
}) {
  const total = expenses.reduce((sum, e) => e.amount + sum, 0);

  const [showAll, setShowAll] = useState(false);

  const totalsByCategory = expenses.reduce((acc, e) => {
    const category = e.category.name;
    const slug = e.category.slug;

    if (!acc[category]) {
      acc[category] = { slug, amount: 0 };
    }

    acc[category].amount += e.amount;

    return acc;
  }, {} as Record<string, { slug: string; amount: number }>);

  const categories = Object.entries(totalsByCategory)
    .map(([name, { slug, amount }]) => ({
      name,
      amount,
      slug,
      percentage: (amount / total) * 100,
    }))
    .sort((a, b) => b.amount - a.amount);

  const othersAmount =
    total - categories.slice(0, 3).reduce((sum, c) => c.amount + sum, 0);

  const sortedCategories = showAll ? categories : categories.slice(0, 3);
  return (
    <section className="flex flex-col p-base rounded-base gap-base bg-bg">
      <div className="flex justify-between">
        <h2>Spending Split</h2>

        <div onClick={() => setShowAll(!showAll)}>
          <Ellipsis className="w-6.5 h-6.5" />
        </div>
      </div>
      <ul>
        {sortedCategories.map((category) => {
          const Icon =
            categoryIcons[
              (category.slug as keyof typeof categoryIcons) || DefaultIcon
            ];
          return (
            <li
              key={category.name}
              className="flex justify-between items-center h-[60px]"
            >
              <div className="flex items-center">
                <div className="p-base">
                  <Icon className="w-8 h-8 text-text-muted" />
                </div>
                <p>{category.name}</p>
              </div>
              <p className="font-bold">{Math.floor(category.percentage)}%</p>
            </li>
          );
        })}
        {othersAmount > 0 && !showAll && (
          <li className="flex justify-between items-center h-[60px]">
            <div className="flex items-center">
              <div className="p-base">
                <DefaultIcon className="w-8 h-8 text-text-muted" />
              </div>
              <p>Others</p>
            </div>
            <p className="font-bold">
              {Math.floor((othersAmount / total) * 100)}%
            </p>
          </li>
        )}

        {sortedCategories.length === 0 && (
          <div className="h-[150px] flex justify-center items-center">
            <h3>
              No record of expense this{" "}
              {range === "daily"
                ? "day"
                : range === "weekly"
                ? "week"
                : "month"}
              ...
            </h3>
          </div>
        )}
      </ul>
    </section>
  );
}
