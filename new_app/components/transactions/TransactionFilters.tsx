"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { Button } from "@/components/ui/button";
import type { TransactionFilters as Filters } from "@/lib/mock/transaction-filters";
import { initialFilters } from "@/lib/mock/transaction-filters";

export interface TransactionFiltersProps {
  filters: Filters;
  categories: string[];
  onChange: (filters: Filters) => void;
}
export const TransactionFilters: React.FC<TransactionFiltersProps> = ({
  filters,
  categories,
  onChange,
}) => (
  <div className="space-y-4">
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <label className="relative w-full lg:max-w-md">
        <span className="sr-only">Search merchants or accounts</span>
        <Search
          size={16}
          aria-hidden="true"
          className="absolute left-3.5 top-3.5 text-muted-foreground"
        />
        <Input
          type="search"
          placeholder="Search transactions, merchants, accounts…"
          className="rounded-full bg-muted pl-10"
          value={filters.search}
          onChange={(event) =>
            onChange({ ...filters, search: event.target.value })
          }
        />
      </label>
      <div className="flex flex-wrap items-center gap-3">
        <SegmentedControl
          label="Transaction type"
          value={filters.kind}
          options={[
            { value: "all", label: "All" },
            { value: "income", label: "Income" },
            { value: "expense", label: "Expenses" },
          ]}
          onChange={(kind) => onChange({ ...filters, kind })}
        />
        <label>
          <span className="sr-only">Category</span>
          <select
            aria-label="Category"
            className="control max-w-full rounded-full"
            value={filters.category}
            onChange={(event) =>
              onChange({ ...filters, category: event.target.value })
            }
          >
            <option value="all">All categories</option>
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </label>
      </div>
    </div>
    <div className="flex flex-wrap items-end gap-3">
      <label className="min-w-0 flex-1 text-xs text-muted-foreground sm:flex-none">
        From
        <Input
          className="mt-1"
          aria-label="From date"
          type="date"
          value={filters.from}
          onChange={(event) =>
            onChange({ ...filters, from: event.target.value })
          }
        />
      </label>
      <label className="min-w-0 flex-1 text-xs text-muted-foreground sm:flex-none">
        To
        <Input
          className="mt-1"
          aria-label="To date"
          type="date"
          value={filters.to}
          onChange={(event) => onChange({ ...filters, to: event.target.value })}
        />
      </label>
      <Button variant="outline" onClick={() => onChange(initialFilters)}>
        Reset filters
      </Button>
      <p className="w-full text-[11px] text-muted-foreground sm:w-auto sm:pb-3">
        Filters apply to the sample ledger only.
      </p>
    </div>
    {filters.from && filters.to && filters.from > filters.to && (
      <p role="status" className="text-sm text-muted-foreground">
        The start date is after the end date. Adjust the range to show
        transactions.
      </p>
    )}
  </div>
);
