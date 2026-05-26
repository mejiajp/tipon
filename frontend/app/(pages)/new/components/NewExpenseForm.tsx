"use client";

import { categoryIcons } from "@/lib/categoryIconsMap";
import DefaultIcon from "@/components/icons/Ellipsis";
import { useState } from "react";
import { createExpense } from "@/lib/api/expenses.client";
import { Category } from "@/types/category";
import { useToastStore } from "@/stores/useToastStore";
import Down from "@/components/icons/Down";
import { Expense } from "@/types/expenses";
import { getSortedCategories } from "@/lib/getSortedCategories";

interface NewExpenseFormProps {
  categories: Category[];
  accumulatedExpense: {
    date: string;
    expense: Expense[];
    total: number;
  }[];
}

interface FormData {
  amount: string;
  title: string;
  category: Category | null;
}

export default function NewExpenseForm({
  categories,
  accumulatedExpense,
}: NewExpenseFormProps) {
  const [formData, setFormData] = useState<FormData>({
    amount: "",
    title: "",
    category: null,
  });

  const [showAllCategories, setShowAllCategories] = useState(false);
  const addToast = useToastStore((state) => state.addToast);

  const expenses = accumulatedExpense.flatMap((entry) => entry.expense);
  const sortedCategories = getSortedCategories(categories, expenses);

  const visibleCategories = showAllCategories
    ? sortedCategories
    : sortedCategories.slice(0, 8);

  const isFormValid =
    formData.amount.trim() !== "" &&
    !isNaN(parseFloat(formData.amount)) &&
    parseFloat(formData.amount) > 0 &&
    formData.title.trim() !== "" &&
    formData.category !== null;

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.category) {
      console.error("Category is not selected");
      return;
    }

    const toBeSubmitted = {
      title: formData.title,
      category: formData.category,
      amount: parseFloat(formData.amount),
    };

    console.log("Submitting form with data:", toBeSubmitted);

    await createExpense(toBeSubmitted);

    setFormData({
      title: "",
      amount: "",
      category: null,
    });

    addToast("Expense added successfully!", "success");
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-small p-base rounded-base bg-bg">
        <h3 className="section-title">Amount</h3>
        <input
          type="number"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          placeholder="PHP 0.00"
          className="bg-bg-light p-4 rounded-base outline-none focus:ring-2 focus:ring-gray-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>
      <div className="flex flex-col gap-small p-base rounded-base bg-bg">
        <h3 className="section-title">Title</h3>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="What is the expense?"
          className="bg-bg-light p-4 rounded-base outline-none focus:ring-2 focus:ring-gray-300"
        />
      </div>
      <div className="flex flex-col gap-small p-base rounded-base bg-bg">
        <h3 className="section-title">Category</h3>

        <ul className="grid grid-cols-4 grid-row-2 gap-4">
          {visibleCategories.map((category) => {
            const Icon =
              categoryIcons[category.slug as keyof typeof categoryIcons] ||
              DefaultIcon;
            return (
              <li
                key={category.id}
                onClick={() => setFormData({ ...formData, category: category })}
                className={` flex flex-col justify-center gap-1 rounded-[16px] items-center cursor-pointer aspect-square  ${
                  formData.category === category
                    ? "bg-primary text-white"
                    : "bg-bg-light text-text-muted"
                }`}
              >
                <Icon className="w-6.5 h-6.5 shrink-0" />
                <div className="h-4 flex items-center justify-center w-[80%]">
                  <p
                    className={`text-tiny font-bold text-center  tracking-wide ${
                      formData.category === category
                        ? "text-white "
                        : "text-text-muted "
                    }`}
                  >
                    {category.name}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
        <div
          className="w-6.5 h-6.5 cursor-pointer ml-auto"
          onClick={() => setShowAllCategories(!showAllCategories)}
        >
          <Down
            className={`w-4 h-4 transition-transform duration-200 ${
              showAllCategories ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={!isFormValid}
        className={`full-button bg-primary text-white tracking-wide transition-all ${
          isFormValid ? "cursor-pointer" : "cursor-not-allowed "
        }`}
      >
        Add Expense
      </button>
    </form>
  );
}
