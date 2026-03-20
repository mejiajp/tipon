"use client";

import { getAllExpenses } from "@/lib/api/expenses";
import { useEffect, useState } from "react";

export default function TransactionList() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await getAllExpenses();
      setExpenses(data);
    }

    load();
  }, []);

  return <div>{JSON.stringify(expenses)}</div>;
}
