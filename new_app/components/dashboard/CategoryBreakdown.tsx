import { Card } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import type { CategorySpending } from "@/lib/mock/types";
import { formatMoney } from "@/lib/mock/format";

export interface CategoryBreakdownProps {
  categories: CategorySpending[];
  total: number;
}
export const CategoryBreakdown: React.FC<CategoryBreakdownProps> = ({
  categories,
  total,
}) => (
  <Card>
    <div className="mb-6 flex justify-between gap-4">
      <div>
        <h2 className="font-semibold">Spending by Category</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Allocation for September 2026
        </p>
      </div>
      <div className="text-right">
        <p className="metric text-sm">{formatMoney(total)}</p>
        <p className="eyebrow mt-1">Total</p>
      </div>
    </div>
    <div className="space-y-4">
      {categories.map((category, index) => (
        <div key={category.name}>
          <div className="mb-2 flex items-center justify-between gap-2 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium">{category.name}</span>
              {category.change && (
                <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                  {category.change}
                </span>
              )}
            </div>
            <div className="flex shrink-0 gap-3 tabular-nums">
              <span className="text-muted-foreground">
                {category.percentage}%
              </span>
              <span className="font-medium">
                {formatMoney(category.amount, 2)}
              </span>
            </div>
          </div>
          <Progress
            label={`${category.name} share`}
            value={category.percentage}
            tone="black"
            className={`h-1 ${index > 2 ? "opacity-50" : ""}`}
          />
        </div>
      ))}
    </div>
  </Card>
);
