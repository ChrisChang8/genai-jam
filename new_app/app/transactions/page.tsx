import { CashflowSummary } from "@/components/transactions/CashflowSummary";
import { PageHeader } from "@/components/common/PageHeader";
import { PreviewAction } from "@/components/common/PreviewAction";
import { TransactionsExperience } from "@/components/transactions/TransactionsExperience";
import { transactions, cashflowSummary } from "@/lib/mock/transactions";

export interface TransactionsPageProps {
  searchParams: Promise<{ selected?: string | string[] }>;
}
export default async function TransactionsPage({
  searchParams,
}: TransactionsPageProps) {
  const params = await searchParams;
  const selected =
    typeof params.selected === "string" ? params.selected : "chipotle";
  return (
    <div className="section-space">
      <PageHeader
        title="Transactions"
        description="Explore sample activity across your demo accounts."
      >
        <PreviewAction
          label="+ Add transaction"
          note="Adding and exporting records arrive in a later phase."
        />
      </PageHeader>
      <CashflowSummary items={cashflowSummary} />
      <TransactionsExperience
        key={selected}
        transactions={transactions}
        initialSelectedId={selected}
      />
    </div>
  );
}
