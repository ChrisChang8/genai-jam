import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import type { MockGoal } from "@/lib/mock/types";
import { formatMoney } from "@/lib/mock/format";

export interface GoalCardProps {
  goal: MockGoal;
}
export const GoalCard: React.FC<GoalCardProps> = ({ goal }) => (
  <Card className="md:p-7">
    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
      <p
        className={`eyebrow ${goal.id === "emergency" ? "text-positive" : ""}`}
      >
        {goal.category}
      </p>
      <Badge>{goal.badge}</Badge>
    </div>
    <h2 className="text-xl font-semibold">{goal.name}</h2>
    <p className="mt-2 text-sm text-muted-foreground">{goal.account}</p>
    <div className="mb-4 mt-8 flex flex-wrap items-end justify-between gap-2">
      <div className="flex flex-wrap items-baseline gap-2">
        <span className="metric text-3xl">{formatMoney(goal.saved)}</span>
        <span className="text-sm text-muted-foreground">
          of {formatMoney(goal.target)}
        </span>
      </div>
      <span className="text-sm font-medium tabular-nums text-positive">
        {goal.progress}%
      </span>
    </div>
    <Progress value={goal.progress} label={`${goal.name} progress`} />
    <dl className="mt-8 flex flex-wrap justify-between gap-5 border-t pt-5 text-sm">
      <div>
        <dt className="text-xs text-muted-foreground">Monthly pace</dt>
        <dd className="mt-1 font-semibold tabular-nums">
          {formatMoney(goal.monthlyPace)} / mo
        </dd>
      </div>
      <div className="text-right">
        <dt className="text-xs text-muted-foreground">Est. completion</dt>
        <dd className="mt-1 text-xs">
          <strong>{goal.completion}</strong>{" "}
          <span className="text-muted-foreground">({goal.remaining})</span>
        </dd>
      </div>
    </dl>
  </Card>
);
