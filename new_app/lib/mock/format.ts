/** Display formatting only; no financial analysis takes place here. */
export const formatMoney = (amount: number, decimals = 0): string =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
export const formatSignedMoney = (amount: number): string =>
  `${amount >= 0 ? "+" : "−"}${formatMoney(Math.abs(amount), 2)}`;
export const formatDate = (date: string): string =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
