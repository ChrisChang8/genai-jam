import { describe, expect, it } from "vitest";
import {
  filterTransactions,
  initialFilters,
  retainVisibleSelection,
} from "@/lib/mock/transaction-filters";
import { transactions } from "@/lib/mock/transactions";
import { formatDate, formatSignedMoney } from "@/lib/mock/format";

describe("Phase 2 sample ledger filtering", () => {
  it("matches merchant and account text without case or outer whitespace sensitivity", () => {
    expect(
      filterTransactions(transactions, {
        ...initialFilters,
        search: "  cHiPoTlE ",
      }).map((row) => row.id),
    ).toEqual(["chipotle"]);
    expect(
      filterTransactions(transactions, { ...initialFilters, search: "1092" }),
    ).toHaveLength(4);
  });
  it("combines search, type, category and inclusive date bounds", () => {
    const filters = {
      search: "Chase",
      kind: "expense" as const,
      category: "Food & Dining",
      from: "2026-09-05",
      to: "2026-09-08",
    };
    expect(
      filterTransactions(transactions, filters).map((row) => row.id),
    ).toEqual(["chipotle", "sweetgreen"]);
  });
  it("distinguishes inflows from expenses", () => {
    expect(
      filterTransactions(transactions, {
        ...initialFilters,
        kind: "income",
      }).map((row) => row.id),
    ).toEqual(["payroll"]);
    expect(
      filterTransactions(transactions, {
        ...initialFilters,
        kind: "expense",
      }).every((row) => row.amount < 0),
    ).toBe(true);
  });
  it("returns empty results for conflicting filters, unknown text and reversed ranges", () => {
    expect(
      filterTransactions(transactions, {
        ...initialFilters,
        kind: "income",
        category: "Groceries",
      }),
    ).toEqual([]);
    expect(
      filterTransactions(transactions, {
        ...initialFilters,
        search: "missing merchant",
      }),
    ).toEqual([]);
    expect(
      filterTransactions(transactions, {
        ...initialFilters,
        from: "2026-09-20",
        to: "2026-09-01",
      }),
    ).toEqual([]);
    expect(filterTransactions([], initialFilters)).toEqual([]);
  });
  it("supports open-ended dates and restores the full fixture list on reset without mutation", () => {
    const before = structuredClone(transactions);
    expect(
      filterTransactions(transactions, {
        ...initialFilters,
        from: "2026-09-21",
      }),
    ).toHaveLength(2);
    expect(
      filterTransactions(transactions, { ...initialFilters, to: "2026-09-01" }),
    ).toHaveLength(1);
    expect(filterTransactions(transactions, initialFilters)).toEqual(before);
    expect(transactions).toEqual(before);
  });
});

describe("transaction selection", () => {
  it("retains a visible selection and clears filtered, unknown or closed selections", () => {
    expect(retainVisibleSelection("chipotle", transactions)).toBe("chipotle");
    const income = filterTransactions(transactions, {
      ...initialFilters,
      kind: "income",
    });
    expect(retainVisibleSelection("chipotle", income)).toBeNull();
    expect(retainVisibleSelection("unknown", transactions)).toBeNull();
    expect(retainVisibleSelection(null, transactions)).toBeNull();
    expect(retainVisibleSelection("payroll", [])).toBeNull();
  });
});

describe("display formatting", () => {
  it("preserves explicit income and expense signs with cents", () => {
    expect(formatSignedMoney(2850)).toBe("+$2,850.00");
    expect(formatSignedMoney(-14.28)).toBe("−$14.28");
  });
  it("displays fixture dates consistently across time zones", () => {
    expect(formatDate("2026-09-01")).toBe("Sep 1, 2026");
  });
});
