import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface MetricItem {
  label: string;
  value: string;
  detail: ReactNode;
  positive?: boolean;
  detailPositive?: boolean;
  detailBadge?: boolean;
}
export interface MetricGridProps {
  items: MetricItem[];
  bordered?: boolean;
}
export const MetricGrid: React.FC<MetricGridProps> = ({
  items,
  bordered = false,
}) => (
  <div className="grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-0">
    {items.map((item, index) => (
      <div
        key={item.label}
        className={cn(
          "min-w-0 py-2",
          bordered
            ? "rounded-xl border bg-surface p-5 lg:mr-4 lg:last:mr-0"
            : index > 0 && "lg:border-l lg:pl-6",
        )}
      >
        <p className="eyebrow">{item.label}</p>
        <p
          className={cn(
            "metric mt-3 text-2xl md:text-3xl",
            item.positive && "text-positive",
          )}
        >
          {item.value}
        </p>
        <div
          className={cn(
            "mt-2 text-xs leading-relaxed text-muted-foreground",
            item.detailPositive && "text-positive",
            item.detailBadge &&
              "inline-flex rounded-full bg-positive-surface px-2 py-0.5 text-positive",
          )}
        >
          {item.detail}
        </div>
      </div>
    ))}
  </div>
);
