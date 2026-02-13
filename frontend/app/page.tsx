"use client"; // important for event handling

import { useState, useEffect } from "react";
import { fetchAPI, addExpense } from "@/lib/fetchers";

// 1️⃣ Define the type for an expense
interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  expenseDate: string;
}

export default function Home() {
  // 2️⃣ Tell useState this is an array of Expense
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const fetchExpenses = async () => {
    const data = await fetchAPI();
    console.log("Fetched:", data);
    setExpenses(data);
  };

  const handleAddExpense = async () => {
    try {
      const newExpense = await addExpense();
      console.log("Inserted:", newExpense);
      fetchExpenses(); // refresh list after adding
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const load = async () => {
      await fetchExpenses();
    };
    load();
  }, []);

  console.log(expenses, "expenses");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-3xl font-bold">Tipon</h1>

      <button
        onClick={handleAddExpense}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Test Expense
      </button>

      <ul className="mt-4">
        {expenses.map((exp, index) => (
          <li key={exp.id || index}>
            {exp.amount} - {exp.category} - {exp.description} -{" "}
            {exp.expenseDate}
          </li>
        ))}
      </ul>
    </div>
  );
}
