import { categoryIcons } from "@/lib/categoryIconsMap";
import DefaultIcon from "@/components/icons/Ellipsis";
import { formatTransactionTime } from "@/lib/formatTransactionTime";

export default function RecentTransactions() {
  const expenses = [
    {
      title: "Mcdo Delivery",
      name: "Food and Dining",
      icon: "food",
      dateTime: "2026-03-05T14:30:00Z",
      amount: 50,
    },
    {
      title: "Grab Car",
      name: "Transportation",
      icon: "transportation",
      dateTime: "2026-03-05T15:30:00Z",
      amount: 30,
    },
    {
      title: "Donation to Charity",
      name: "Gifts and Donations",
      icon: "gifts",
      dateTime: "2026-03-05T16:30:00Z",
      amount: 20,
    },
  ];
  return (
    <section className="flex flex-col p-base rounded-base gap-base bg-bg-light">
      <div className="flex justify-between">
        <h2>Recent Transactions</h2>
        <p className="text-text-muted">See All</p>
      </div>
      <ul>
        {expenses.map((expense) => {
          const Icon =
            categoryIcons[
              (expense.icon as keyof typeof categoryIcons) || DefaultIcon
            ];
          return (
            <li
              key={expense.name}
              className="flex justify-between items-center h-[60px]"
            >
              <div className="flex items-center">
                <div className="p-base">
                  <Icon className="w-8 h-8 text-text-muted" />
                </div>
                <div>
                  <p>{expense.title}</p>
                  <p className="text-text-muted">
                    {formatTransactionTime(expense.dateTime)}, {expense.name}
                  </p>
                </div>
              </div>
              <p className="font-bold">{expense.amount}%</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
