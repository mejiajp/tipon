import NewExpenseForm from "./components/NewExpenseForm";
import { getAllCategories } from "@/lib/api/categories.server";

export default async function page() {
  const categories = await getAllCategories();
  // console.log(categories);
  return (
    <div className="flex flex-col gap-2.5 ">
      <h1 className="page-title  ">New Expense</h1>
      <NewExpenseForm categories={categories} />
    </div>
  );
}
