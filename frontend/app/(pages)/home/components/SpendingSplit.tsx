import Ellipsis from "@/components/icons/Ellipsis";
import { categoryIcons } from "@/lib/categoryIconsMap";
import DefaultIcon from "@/components/icons/Ellipsis";
import { Expense } from "@/types/expenses";

export default function SpendingSplit() {
  const categories = [
    {
      name: "Food and Dining",
      icon: "food",
      percentage: 50,
    },
    {
      name: "Transportation",
      icon: "transportation",
      percentage: 30,
    },
    {
      name: "Gifts and Donations",
      icon: "gifts",
      percentage: 20,
    },
  ];
  return (
    <section className="flex flex-col p-base rounded-base gap-base bg-bg-light">
      <div className="flex justify-between">
        <h2>Spending Split</h2>
        <Ellipsis className="w-6.5 h-6.5" />
      </div>
      <ul>
        {categories.map((category) => {
          const Icon =
            categoryIcons[
              (category.icon as keyof typeof categoryIcons) || DefaultIcon
            ];
          return (
            <li
              key={category.name}
              className="flex justify-between items-center h-[60px]"
            >
              <div className="flex items-center">
                <div className="p-base">
                  <Icon className="w-8 h-8 text-text-muted" />
                </div>
                <p>{category.name}</p>
              </div>
              <p className="font-bold">{category.percentage}%</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
