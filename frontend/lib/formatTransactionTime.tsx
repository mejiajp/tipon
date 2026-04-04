export function formatTransactionTime(dateTime: string) {
  const date = new Date(`${dateTime}`);

  return date.toLocaleString("en-US", {
    // weekday: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
