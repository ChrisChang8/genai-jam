import { PageHeader } from '@/components/common/PageHeader';
import { MetricGrid } from '@/components/common/MetricGrid';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { SpendingChart } from '@/components/charts/SpendingChart';
import { CategoryBreakdown } from '@/components/dashboard/CategoryBreakdown';
import { RecentTransactions } from '@/components/dashboard/RecentTransactions';
import { AccountSummary } from '@/components/dashboard/AccountSummary';
import { getAllTransactions } from '@/lib/db/queries';
import { buildDashboard } from '@/lib/finance/dashboard';
import { formatDate, formatMoney } from '@/lib/mock/format';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const data = buildDashboard(await getAllTransactions());
  if (!data) return <div className="section-space"><PageHeader title="Overview" description="Your synthetic financial activity" /><Card><h2 className="font-semibold">No transactions yet</h2><p className="mt-2 text-sm text-muted-foreground">Seed the local database to see your financial summary, spending charts, and recent activity.</p></Card></div>;
  const change = data.comparison.percentageChange;
  return (
    <div className="section-space">
      <PageHeader title="Your financial overview" description={`Latest recorded month · activity through ${formatDate(data.asOf)}`}><Badge>{data.period}</Badge></PageHeader>
      <MetricGrid items={[
        { label: 'Current balance', value: formatMoney(data.balance, 2), detail: 'Net recorded activity; opening balance assumed zero' },
        { label: 'Monthly income', value: formatMoney(data.income, 2), detail: data.period },
        { label: 'Monthly expenses', value: formatMoney(data.expenses, 2), detail: change === null ? 'No prior spending baseline' : `${change > 0 ? '+' : ''}${change}% vs previous calendar month` },
        { label: 'Monthly savings', value: formatMoney(data.savings, 2), detail: `${data.savingsRate}% savings rate`, detailPositive: data.savings > 0 },
      ]} />
      <div className="grid items-start gap-7 xl:grid-cols-[minmax(0,2.1fr)_minmax(300px,1fr)]">
        <div className="section-space">
          <SpendingChart series={data.series} />
          <CategoryBreakdown categories={data.categories} total={data.expenses} period={data.period} />
          <RecentTransactions transactions={data.recentTransactions} />
        </div>
        <aside className="space-y-6" aria-label="Accounts and upcoming features">
          <AccountSummary accounts={data.accounts} />
          <Card><h2 className="font-semibold">Financial Copilot</h2><p className="mt-3 text-xs leading-relaxed text-muted-foreground">AI explanations and personalized savings plans are coming in later phases.</p></Card>
        </aside>
      </div>
    </div>
  );
}
