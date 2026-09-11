"use client";

import { X } from "lucide-react";
import { MerchantAvatar } from "@/components/transactions/MerchantAvatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { formatDate, formatSignedMoney } from "@/lib/mock/format";
import type { MockTransaction } from "@/lib/mock/types";

export interface TransactionDetailProps {
  transaction: MockTransaction;
  onClose: () => void;
}
export const TransactionDetail: React.FC<TransactionDetailProps> = ({
  transaction,
  onClose,
}) => (
  <section
    aria-labelledby="detail-title"
    className="rounded-xl border bg-surface p-5 md:p-6"
  >
    <div className="flex items-center justify-between border-b pb-4">
      <h2 id="detail-title" className="eyebrow">
        Transaction details
      </h2>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close transaction details"
        className="flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
      >
        <X size={18} />
      </button>
    </div>
    <div className="flex flex-col items-center py-7 text-center">
      <MerchantAvatar initials={transaction.initials} selected large />
      <h3 className="mt-5 text-xl font-semibold">{transaction.merchant}</h3>
      <p
        className={`metric my-3 text-3xl ${transaction.amount > 0 ? "text-positive" : ""}`}
      >
        {formatSignedMoney(transaction.amount)}
      </p>
      <Badge tone="positive">● Cleared · sample</Badge>
    </div>
    <dl className="space-y-4 rounded-xl border bg-background p-4 text-xs">
      {[
        { label: "Date", value: formatDate(transaction.date) },
        { label: "Account", value: transaction.account },
        { label: "Category", value: transaction.category },
      ].map((item) => (
        <div key={item.label} className="flex justify-between gap-4">
          <dt className="text-muted-foreground">{item.label}</dt>
          <dd className="text-right">{item.value}</dd>
        </div>
      ))}
    </dl>
    <div className="my-5 rounded-xl border bg-background p-4">
      <h3 className="eyebrow">Spending context</h3>
      <p className="mt-3 text-xs leading-relaxed">{transaction.context}</p>
    </div>
    <div className="space-y-2">
      <Button disabled variant="outline" className="w-full">
        Split transaction
      </Button>
      <Button disabled variant="outline" className="w-full">
        Exclude from budget
      </Button>
      <p className="pt-1 text-[11px] leading-relaxed text-muted-foreground">
        Editing, splitting, and budget changes are unavailable in this preview.
      </p>
    </div>
  </section>
);
