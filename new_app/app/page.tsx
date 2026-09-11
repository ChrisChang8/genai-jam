import { PageHeader } from "@/components/common/PageHeader";
import { MetricGrid } from "@/components/common/MetricGrid";
import { Badge } from "@/components/ui/Badge";
import { SpendingChart } from "@/components/charts/SpendingChart";
import { CategoryBreakdown } from "@/components/dashboard/CategoryBreakdown";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { Recommendations } from "@/components/dashboard/Recommendations";
import { AccountSummary } from "@/components/dashboard/AccountSummary";
import {
  accounts,
  categories,
  dashboardMetrics,
  recommendations,
  categoryTotal,
  spendingSeries,
} from "@/lib/mock/dashboard";
import { recentTransactions } from "@/lib/mock/transactions";

export default function Home() {
  return (
    <div className="section-space">
      <PageHeader
        title="Good morning, Chris"
        description="Overview of your finances this month."
      >
        <Badge>Personal · September 2026</Badge>
      </PageHeader>
      <MetricGrid items={dashboardMetrics} />
      <div className="grid items-start gap-7 xl:grid-cols-[minmax(0,2.1fr)_minmax(300px,1fr)]">
        <div className="section-space">
          <SpendingChart series={spendingSeries} />
          <CategoryBreakdown categories={categories} total={categoryTotal} />
          <RecentTransactions transactions={recentTransactions} />
        </div>
        <aside className="space-y-6" aria-label="Recommendations and accounts">
          <Recommendations data={recommendations} />
          <AccountSummary accounts={accounts} />
        </aside>
      </div>
    </div>
  );
}
