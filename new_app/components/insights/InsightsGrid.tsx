import Link from "next/link";
import { InsightCard } from "@/components/insights/InsightCard";
import { DiningChart } from "@/components/charts/DiningChart";
import { PreviewAction } from "@/components/common/PreviewAction";
import { Progress } from "@/components/ui/Progress";
import { formatMoney } from "@/lib/mock/format";
import type { InsightData } from "@/lib/mock/types";

export interface InsightsGridProps {
  data: InsightData;
}
export const InsightsGrid: React.FC<InsightsGridProps> = ({ data }) => (
  <div className="grid gap-6 lg:grid-cols-2">
    <InsightCard
      category="Discretionary"
      title="Dining Spending"
      badge="Higher than usual"
      description={data.diningSummary.description}
      action={
        <div className="flex flex-wrap items-start justify-between gap-3">
          <PreviewAction label="Set Weekly Cap" />
          <Link
            href="/transactions"
            className="flex min-h-11 items-center text-xs text-muted-foreground"
          >
            View sample charges →
          </Link>
        </div>
      }
    >
      <DiningChart data={data.dining} />
      <div className="rounded-xl border bg-background p-4 text-xs leading-relaxed">
        <strong className="font-medium">Recommendation:</strong>{" "}
        {data.diningSummary.recommendation}
      </div>
    </InsightCard>
    <InsightCard
      category="Fixed expenses"
      title="Recurring Subscriptions"
      badge={data.subscriptionSummary.badge}
      description={data.subscriptionSummary.description}
      action={<PreviewAction label="Review Subscriptions" />}
    >
      <ul className="space-y-2">
        {data.subscriptions.map((subscription) => (
          <li
            key={subscription.name}
            className="flex flex-wrap items-center justify-between gap-2 rounded-lg border px-3 py-2.5 text-xs"
          >
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-300" />
              {subscription.name}
            </span>
            <span className="flex gap-3">
              <span className="text-[10px] text-muted-foreground">
                {subscription.detail}
              </span>
              <span className="tabular-nums">
                {formatMoney(subscription.amount, 2)}/mo
              </span>
            </span>
          </li>
        ))}
      </ul>
      <div className="rounded-xl bg-positive-surface p-4 text-xs leading-relaxed text-positive">
        <strong className="font-medium text-foreground">
          Savings Opportunity:
        </strong>{" "}
        {data.subscriptionSummary.recommendation}
      </div>
    </InsightCard>
    <InsightCard
      category="Milestone"
      title="Savings Milestone"
      badge="Target met"
      positive
      description={data.savingsSummary.description}
      action={
        <PreviewAction
          label="Transfer Surplus to Emergency Fund"
          note="Transfers are unavailable in this demo."
        />
      }
    >
      <div className="space-y-3 rounded-xl border bg-background p-4">
        <div className="flex justify-between gap-2 text-xs">
          <span className="text-muted-foreground">
            {data.savingsSummary.target}
          </span>
          <span className="text-positive">{data.savingsSummary.ahead}</span>
        </div>
        <Progress
          value={data.savingsSummary.progress}
          label="Monthly savings target reached"
        />
        <div className="flex flex-wrap justify-between gap-2 text-xs">
          <span className="text-muted-foreground">
            {data.savingsSummary.reserves}
          </span>
          <span>{data.savingsSummary.comparison}</span>
        </div>
      </div>
      <div className="rounded-xl border bg-background p-4 text-xs leading-relaxed">
        <strong className="font-medium">Suggested Allocation:</strong>{" "}
        {data.savingsSummary.recommendation}
      </div>
    </InsightCard>
    <InsightCard
      category="Pattern"
      title="Weekend Spending Pattern"
      badge="Fri – Sun"
      description={data.weekendSummary.description}
      action={<PreviewAction label="Set Weekend Alert" />}
    >
      <div className="space-y-3 rounded-xl border bg-background p-4">
        <div className="flex flex-wrap justify-between gap-2 text-xs">
          <span className="text-muted-foreground">Discretionary split</span>
          <span>{data.weekendSummary.total}</span>
        </div>
        <div
          role="img"
          aria-label={`Weekdays: ${data.weekendSummary.weekdays}%. Weekends: ${data.weekendSummary.weekends}%.`}
          className="flex h-2.5 gap-1 overflow-hidden rounded-full"
        >
          <span
            style={{ width: `${data.weekendSummary.weekdays}%` }}
            className="bg-neutral-300"
          />
          <span
            style={{ width: `${data.weekendSummary.weekends}%` }}
            className="bg-black"
          />
        </div>
        <div className="flex justify-between gap-2 text-[11px] text-muted-foreground">
          <span>● Mon – Thu ({data.weekendSummary.weekdays}%)</span>
          <span>● Fri – Sun ({data.weekendSummary.weekends}%)</span>
        </div>
      </div>
      <div className="rounded-xl border bg-background p-4 text-xs leading-relaxed">
        <strong className="font-medium">Guardrail:</strong>{" "}
        {data.weekendSummary.recommendation}
      </div>
    </InsightCard>
  </div>
);
