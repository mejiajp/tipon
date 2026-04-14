import { categoryIcons } from "@/lib/categoryIconsMap";
import DefaultIcon from "@/components/icons/Ellipsis";
import { formatAmount, formatTransactionTime } from "@/lib/formatters";
import { Expense } from "@/types/expenses";

interface ExpenseListProps {
  expenses: Expense[];
}

export function ExpenseList({ expenses }: ExpenseListProps) {
  return (
    <ul>
      {expenses.map((expense) => {
        const Icon =
          categoryIcons[
            (expense.category.slug as keyof typeof categoryIcons) || DefaultIcon
          ];

        return (
          <li
            key={expense.id}
            className="flex justify-between items-center h-16"
          >
            <div className="flex items-center">
              <div className="p-base">
                <Icon className="w-8 h-8 text-text-muted" />
              </div>
              <div>
                <p>{expense.title}</p>
                <p className="text-text-muted">
                  {formatTransactionTime(expense.createdAt)},{" "}
                  {expense.category.name}
                </p>
              </div>
            </div>
            <p className="">{formatAmount(expense.amount)}</p>
          </li>
        );
      })}
    </ul>
  );
}
