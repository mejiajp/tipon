export function formatAmount(amount: number) {
  return amount.toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatTransactionTime(dateTime: string) {
  const date = new Date(`${dateTime}`);

  return date.toLocaleString("en-US", {
    // weekday: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
