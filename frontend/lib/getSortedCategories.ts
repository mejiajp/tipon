import { Category } from "@/types/category";
import { Expense } from "@/types/expenses";

export function getSortedCategories(
  categories: Category[],
  expenses: Expense[]
): Category[] {
  const frequencyMap: Record<string, number> = {};

  for (const expense of expenses) {
    const categoryName = expense?.category?.name;
    if (categoryName) {
      frequencyMap[categoryName] = (frequencyMap[categoryName] || 0) + 1;
    }
  }

  return [...categories].sort((a, b) => {
    const freqA = frequencyMap[a.name] || 0;
    const freqB = frequencyMap[b.name] || 0;
    return freqB - freqA;
  });
}
