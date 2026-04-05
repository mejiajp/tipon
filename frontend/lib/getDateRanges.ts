export function getDateRanges(date: Date) {
  // --- Day ---
  const dayStart = new Date(date);
  const dayEnd = new Date(date);
  const dayLabel = date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }); // e.g., "Apr 5"

  // --- Week (assuming week starts Monday) ---
  const dayOfWeek = date.getDay(); // 0 = Sunday
  const diffToMonday = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;

  const weekStart = new Date(date);
  weekStart.setDate(date.getDate() + diffToMonday);

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  const weekLabel = `${weekStart.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })} - ${weekEnd.toLocaleDateString("en-US", {
    day: "numeric",
  })}`;
  // e.g., "Apr 3 - Apr 9"

  // --- Month ---
  const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
  const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const monthLabel = monthStart.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
  // e.g., "April 2026"

  return {
    day: { start: dayStart, end: dayEnd, label: dayLabel },
    week: { start: weekStart, end: weekEnd, label: weekLabel },
    month: { start: monthStart, end: monthEnd, label: monthLabel },
  };
}
