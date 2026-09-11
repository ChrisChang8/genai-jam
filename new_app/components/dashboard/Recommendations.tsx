import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { PreviewAction } from "@/components/common/PreviewAction";
import { formatMoney } from "@/lib/mock/format";
import type { RecommendationData } from "@/lib/mock/types";

export interface RecommendationsProps {
  data: RecommendationData;
}
export const Recommendations: React.FC<RecommendationsProps> = ({ data }) => (
  <Card>
    <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
      <h2 className="font-semibold">Smart Recommendations</h2>
      <span className="text-[10px] text-muted-foreground">Sample insights</span>
    </div>
    <div className="space-y-4">
      <div className="rounded-xl border bg-background p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-xs font-semibold">Dining Spend Alert</h3>
          <Badge>{data.dining.change}</Badge>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          You&apos;ve spent{" "}
          <strong className="font-medium text-foreground">
            {formatMoney(data.dining.spending)}
          </strong>{" "}
          on dining this month vs your typical{" "}
          <strong className="font-medium text-foreground">
            {formatMoney(data.dining.baseline)}
          </strong>{" "}
          baseline.
        </p>
        <div className="mt-3 flex justify-between gap-2 rounded-lg border bg-surface p-3 text-[11px]">
          <span>Potential annual savings</span>
          <span className="font-medium text-positive">
            +{formatMoney(data.dining.annualSavings)}/yr
          </span>
        </div>
      </div>
      <div className="rounded-xl border p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-xs font-semibold">Monthly Savings Plan</h3>
          <Badge tone="positive">
            Save {formatMoney(data.plan.monthlySavings)}/mo
          </Badge>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          Targeted category adjustments to reach{" "}
          {formatMoney(data.plan.annualSavings)}/yr in additional savings.
        </p>
        <ul className="my-4 divide-y">
          {data.plan.categories.map((item) => (
            <li
              key={item.category}
              className="flex justify-between gap-2 py-2.5 text-xs"
            >
              <span>{item.category}</span>
              <span className="tabular-nums text-positive">
                −{formatMoney(item.savings)}/mo
              </span>
            </li>
          ))}
        </ul>
        <PreviewAction label="Apply Plan" fullWidth />
      </div>
    </div>
  </Card>
);
