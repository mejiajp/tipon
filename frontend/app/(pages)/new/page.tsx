import PageTitle from "@/components/PageTitle";
import NewExpenseForm from "./components/NewExpenseForm";
import { getAllCategories } from "@/lib/api/categories.server";

export default async function page() {
  const categories = await getAllCategories();
  console.log(categories);
  return (
    <>
      <PageTitle title="New Expense" />
      <NewExpenseForm categories={categories} />
    </>
  );
}
