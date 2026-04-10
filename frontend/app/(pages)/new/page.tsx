import NewExpenseForm from "./components/NewExpenseForm";
import { getAllCategories } from "@/lib/api/categories.server";

export default async function page() {
  const categories = await getAllCategories();
  console.log(categories);
  return (
    <>
      <div className="page-title-container">
        <h1 className="page-title ">New Expense</h1>
      </div>
      <NewExpenseForm categories={categories} />
    </>
  );
}
