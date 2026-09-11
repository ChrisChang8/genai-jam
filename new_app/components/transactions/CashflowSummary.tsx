import { formatSignedMoney } from "@/lib/mock/format";

export interface CashflowSummaryProps {
  items: { label: string; amount: number }[];
}
export const CashflowSummary: React.FC<CashflowSummaryProps> = ({ items }) => (
  <div className="flex flex-wrap gap-x-6 gap-y-3 rounded-xl border bg-surface px-5 py-4 text-sm">
    {items.map((item) => (
      <span key={item.label} className="text-muted-foreground">
        {item.label}:{" "}
        <strong
          className={`ml-1 font-semibold tabular-nums ${item.amount >= 0 ? "text-positive" : "text-foreground"}`}
        >
          {formatSignedMoney(item.amount)}
        </strong>
      </span>
    ))}
    <span className="self-center text-[11px] text-muted-foreground">
      Illustrative monthly summary · not totals of this sample ledger
    </span>
  </div>
);
