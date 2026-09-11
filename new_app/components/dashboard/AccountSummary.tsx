import { Card } from "@/components/ui/Card";
import { formatMoney } from "@/lib/mock/format";

export interface AccountSummaryProps {
  accounts: { name: string; balance: number }[];
}
export const AccountSummary: React.FC<AccountSummaryProps> = ({ accounts }) => (
  <Card>
    <div className="mb-4 flex items-center justify-between gap-2">
      <h2 className="text-sm font-medium">Demo Accounts</h2>
      <span className="text-[10px] text-muted-foreground">Sample balances</span>
    </div>
    <ul className="space-y-3">
      {accounts.map((account) => (
        <li key={account.name} className="flex justify-between gap-2 text-xs">
          <span className="text-muted-foreground">{account.name}</span>
          <span className="tabular-nums">
            {formatMoney(account.balance, 2)}
          </span>
        </li>
      ))}
    </ul>
  </Card>
);
