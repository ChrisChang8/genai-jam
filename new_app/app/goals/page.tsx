import { PageHeader } from "@/components/common/PageHeader";
import { MetricGrid } from "@/components/common/MetricGrid";
import { PreviewAction } from "@/components/common/PreviewAction";
import { GoalCard } from "@/components/goals/GoalCard";
import { PacingOptimizer } from "@/components/goals/PacingOptimizer";
import { goals, goalMetrics, optimizerScenarios } from "@/lib/mock/goals";

export default function GoalsPage() {
  return (
    <div className="section-space">
      <PageHeader
        title="Savings Goals"
        description="Manage your financial targets with disciplined pacing and projected milestones."
      >
        <PreviewAction label="+ New Goal" />
      </PageHeader>
      <MetricGrid items={goalMetrics} />
      <div className="grid gap-6 border-t pt-8 lg:grid-cols-2">
        {goals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>
      <PacingOptimizer scenarios={optimizerScenarios} />
    </div>
  );
}
