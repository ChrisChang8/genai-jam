"use client";

import { useState } from "react";
import { TransactionFilters } from "@/components/transactions/TransactionFilters";
import { TransactionTable } from "@/components/transactions/TransactionTable";
import { TransactionDetail } from "@/components/transactions/TransactionDetail";
import { EmptyState } from "@/components/common/EmptyState";
import {
  filterTransactions,
  initialFilters,
  retainVisibleSelection,
  type TransactionFilters as Filters,
} from "@/lib/mock/transaction-filters";
import type { MockTransaction } from "@/lib/mock/types";

export interface TransactionsExperienceProps {
  transactions: MockTransaction[];
  initialSelectedId: string | null;
}
export const TransactionsExperience: React.FC<TransactionsExperienceProps> = ({
  transactions,
  initialSelectedId,
}) => {
  const [filters, setFilters] = useState(initialFilters);
  const [selectedId, setSelectedId] = useState<string | null>(
    retainVisibleSelection(initialSelectedId, transactions),
  );
  const visible = filterTransactions(transactions, filters);
  const selected = visible.find((row) => row.id === selectedId);
  const categories = Array.from(
    new Set(transactions.map((row) => row.category)),
  ).sort();
  function changeFilters(next: Filters) {
    setFilters(next);
    setSelectedId((previous) =>
      retainVisibleSelection(previous, filterTransactions(transactions, next)),
    );
  }
  function closeDetails() {
    setSelectedId(null);
    document.getElementById(`transaction-${selectedId}`)?.focus();
  }
  return (
    <div className="space-y-7">
      <TransactionFilters
        filters={filters}
        categories={categories}
        onChange={changeFilters}
      />
      <div
        className={`grid items-start gap-7 ${selected ? "xl:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]" : ""}`}
      >
        {visible.length ? (
          <TransactionTable
            transactions={visible}
            total={transactions.length}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        ) : (
          <div role="status">
            <EmptyState
              title="No matching transactions"
              description="Try a different search, category, or date range, or reset your filters."
            />
            <p className="mt-3 text-xs text-muted-foreground">
              Showing 0 of {transactions.length} sample transactions
            </p>
          </div>
        )}
        <div id="transaction-detail" aria-live="polite">
          {selected && (
            <TransactionDetail transaction={selected} onClose={closeDetails} />
          )}
        </div>
      </div>
    </div>
  );
};
