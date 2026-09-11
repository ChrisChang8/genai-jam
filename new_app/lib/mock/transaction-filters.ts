import type { MockTransaction } from "@/lib/mock/types";

export type TransactionKind = "all" | "income" | "expense";
export interface TransactionFilters {
  search: string;
  kind: TransactionKind;
  category: string;
  from: string;
  to: string;
}
export const initialFilters: TransactionFilters = {
  search: "",
  kind: "all",
  category: "all",
  from: "",
  to: "",
};

export function filterTransactions(
  rows: MockTransaction[],
  filters: TransactionFilters,
): MockTransaction[] {
  const search = filters.search.trim().toLocaleLowerCase("en-US");
  return rows.filter(
    (row) =>
      (!search ||
        `${row.merchant} ${row.account}`
          .toLocaleLowerCase("en-US")
          .includes(search)) &&
      (filters.kind === "all" ||
        (filters.kind === "income" ? row.amount > 0 : row.amount < 0)) &&
      (filters.category === "all" || row.category === filters.category) &&
      (!filters.from || row.date >= filters.from) &&
      (!filters.to || row.date <= filters.to),
  );
}

export function retainVisibleSelection(
  selectedId: string | null,
  rows: MockTransaction[],
): string | null {
  return rows.some((row) => row.id === selectedId) ? selectedId : null;
}
