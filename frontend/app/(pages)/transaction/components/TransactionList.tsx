import { getAllExpenses } from "@/lib/fetchers/expenses";

export default async function TransactionList() {
  const transactionList = await getAllExpenses();

  console.log(transactionList);
  return <div>{JSON.stringify(transactionList)}</div>;
}
