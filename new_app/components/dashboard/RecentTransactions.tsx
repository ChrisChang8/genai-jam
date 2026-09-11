import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { MerchantAvatar } from "@/components/transactions/MerchantAvatar";
import type { MockTransaction } from "@/lib/mock/types";
import { formatDate, formatSignedMoney } from "@/lib/mock/format";

export interface RecentTransactionsProps {
  transactions: MockTransaction[];
}
export const RecentTransactions: React.FC<RecentTransactionsProps> = ({
  transactions,
}) => (
  <Card>
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 className="font-semibold">Recent Transactions</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Sample activity across demo accounts
        </p>
      </div>
      <Link
        href="/transactions"
        className="flex min-h-11 items-center gap-2 text-xs font-medium"
      >
        View all transactions
        <ArrowRight size={14} aria-hidden="true" />
      </Link>
    </div>
    <ul className="divide-y">
      {transactions.map((transaction) => (
        <li key={transaction.id}>
          <Link
            href={`/transactions?selected=${transaction.id}`}
            className="flex items-center gap-3 rounded-lg py-4 transition-colors hover:bg-muted"
          >
            <MerchantAvatar
              initials={transaction.initials}
              income={transaction.amount > 0}
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium">{transaction.merchant}</p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                {transaction.category} · {transaction.account}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p
                className={`metric text-xs ${transaction.amount > 0 ? "text-positive" : ""}`}
              >
                {formatSignedMoney(transaction.amount)}
              </p>
              <p className="mt-1 text-[10px] text-muted-foreground">
                {formatDate(transaction.date)}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  </Card>
);
