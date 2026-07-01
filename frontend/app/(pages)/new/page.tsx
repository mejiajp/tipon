import PageTitle from "@/components/PageTitle";
import NewExpenseForm from "./components/NewExpenseForm";
import { getAllCategories } from "@/lib/api/categories.server";
import { getExpenseCalendar } from "@/lib/api/expenses.server";

export default async function page() {
  const categories = await getAllCategories();
  const currentDate = new Date();
  const year = currentDate.getFullYear().toString();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");

  const accumulatedExpense = await getExpenseCalendar(year, month);

  console.log(categories);

  return (
    <>
      <PageTitle title="New Expense" />
      <NewExpenseForm
        categories={categories}
        accumulatedExpense={accumulatedExpense}
      />
    </>
  );
}
