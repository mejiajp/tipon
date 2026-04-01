"use client";

import { categoryIcons } from "@/lib/categoryIconsMap";
import DefaultIcon from "@/components/icons/Ellipsis";
import { useState } from "react";

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface NewExpenseFormProps {
  categories: Category[];
}

export default function NewExpenseForm({ categories }: NewExpenseFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
  });

  const [showAllCategories, setShowAllCategories] = useState(false);
  const visibleCategories = showAllCategories
    ? categories
    : categories.slice(0, 8);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  console.log(formData);

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2.5">
        <h3 className="section-title">Amount</h3>
        <input
          type="number"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          placeholder="PHP 0.00"
          className="bg-bg-light p-4 rounded-[16px]"
        />
      </div>
      <div className="flex flex-col gap-2.5">
        <h3 className="section-title">Title</h3>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="What is the expense?"
          className="bg-bg-light p-4 rounded-[16px] "
        />
      </div>
      <div className="flex flex-col gap-2.5">
        <h3 className="section-title">Category</h3>

        <ul className="grid grid-cols-4 grid-row-2 gap-4">
          {visibleCategories.map((category) => {
            const Icon =
              categoryIcons[category.slug as keyof typeof categoryIcons] ||
              DefaultIcon;
            return (
              <li
                key={category.id}
                onClick={() =>
                  setFormData({ ...formData, category: category.name })
                }
                className={` flex flex-col justify-center gap-1 rounded-[16px] items-center cursor-pointer aspect-square  ${
                  formData.category === category.name
                    ? "bg-primary text-bg-light"
                    : "bg-bg-light text-text-muted"
                }`}
              >
                <Icon className="w-6.5 h-6.5" />
                <p
                  className={`text-tiny font-bold text-center tracking-wide ${
                    formData.category === category.name
                      ? "text-bg-light "
                      : "text-text-muted "
                  }`}
                >
                  {category.name}
                </p>
              </li>
            );
          })}
        </ul>
        <div
          className="w-6.5 h-6.5 cursor-pointer ml-auto"
          onClick={() => setShowAllCategories(!showAllCategories)}
        >
          <DefaultIcon className=" " />
        </div>
      </div>
      <button
        type="submit"
        className="bg-primary w-full text-bg-light text-center py-5 rounded-[16px] font-bold tracking-wide"
      >
        Add Expense
      </button>
    </form>
  );
}
