import { PageHeader } from "@/components/common/PageHeader";
import { MetricGrid } from "@/components/common/MetricGrid";
import { InsightTabs } from "@/components/insights/InsightTabs";
import { InsightsGrid } from "@/components/insights/InsightsGrid";
import { HistoricalSearch } from "@/components/insights/HistoricalSearch";
import { insights, insightMetrics } from "@/lib/mock/insights";

export default function InsightsPage() {
  return (
    <div className="section-space">
      <PageHeader
        title="Insights"
        description="Key spending trends and monthly opportunities."
      />
      <MetricGrid items={insightMetrics} bordered />
      <InsightTabs activeCount={insights.activeCount}>
        <InsightsGrid data={insights} />
      </InsightTabs>
      <HistoricalSearch />
    </div>
  );
}
