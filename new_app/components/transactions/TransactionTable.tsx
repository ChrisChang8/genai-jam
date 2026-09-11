"use client";

import { MerchantAvatar } from "@/components/transactions/MerchantAvatar";
import { Badge } from "@/components/ui/Badge";
import { formatDate, formatSignedMoney } from "@/lib/mock/format";
import type { MockTransaction } from "@/lib/mock/types";

export interface TransactionTableProps {
  transactions: MockTransaction[];
  total: number;
  selectedId: string | null;
  onSelect: (id: string) => void;
}
export const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  total,
  selectedId,
  onSelect,
}) => (
  <div className="overflow-hidden rounded-xl border bg-surface">
    <table className="w-full table-fixed text-left text-xs">
      <caption className="sr-only">
        Sample transactions. Select a merchant to inspect its details.
      </caption>
      <thead className="border-b bg-background text-[10px] uppercase tracking-wider text-muted-foreground">
        <tr>
          <th scope="col" className="w-[68%] px-4 py-4 font-medium md:w-[42%]">
            Merchant
          </th>
          <th
            scope="col"
            className="hidden w-[23%] px-2 py-4 font-medium md:table-cell"
          >
            Category
          </th>
          <th
            scope="col"
            className="hidden w-[18%] px-2 py-4 font-medium md:table-cell"
          >
            Date
          </th>
          <th scope="col" className="px-4 py-4 text-right font-medium">
            Amount
          </th>
        </tr>
      </thead>
      <tbody className="divide-y">
        {transactions.map((transaction) => (
          <tr
            key={transaction.id}
            className={
              selectedId === transaction.id
                ? "bg-muted/70"
                : transaction.amount > 0
                  ? "bg-positive-surface/40"
                  : "hover:bg-background"
            }
          >
            <td className="px-3 py-4 md:px-4">
              <button
                id={`transaction-${transaction.id}`}
                type="button"
                aria-pressed={selectedId === transaction.id}
                aria-controls="transaction-detail"
                onClick={() => onSelect(transaction.id)}
                className="flex min-h-11 w-full items-center gap-3 rounded text-left"
              >
                <MerchantAvatar
                  initials={transaction.initials}
                  income={transaction.amount > 0}
                  selected={selectedId === transaction.id}
                />
                <span className="min-w-0">
                  <span className="block font-semibold leading-relaxed">
                    {transaction.merchant}
                  </span>
                  <span className="mt-1 block text-[10px] leading-relaxed text-muted-foreground">
                    {transaction.account}
                  </span>
                  <span className="mt-1 block text-[10px] text-muted-foreground md:hidden">
                    {transaction.category} · {formatDate(transaction.date)}
                  </span>
                </span>
              </button>
            </td>
            <td className="hidden px-2 md:table-cell">
              <Badge tone={transaction.amount > 0 ? "positive" : "neutral"}>
                {transaction.category}
              </Badge>
            </td>
            <td className="hidden px-2 text-[11px] text-muted-foreground md:table-cell">
              {formatDate(transaction.date)}
            </td>
            <td
              className={`metric px-3 text-right md:px-4 ${transaction.amount > 0 ? "text-positive" : ""}`}
            >
              {formatSignedMoney(transaction.amount)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <p
      role="status"
      className="border-t bg-background px-5 py-4 text-xs text-muted-foreground"
    >
      Showing {transactions.length} of {total} sample transactions
    </p>
  </div>
);
