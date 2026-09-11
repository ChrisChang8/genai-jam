import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export interface InsightCardProps {
  category: string;
  title: string;
  badge: string;
  positive?: boolean;
  description: ReactNode;
  children: ReactNode;
  action: ReactNode;
}
export const InsightCard: React.FC<InsightCardProps> = ({
  category,
  title,
  badge,
  positive,
  description,
  children,
  action,
}) => (
  <Card className="flex h-full flex-col gap-5 md:p-7">
    <div className="flex flex-wrap items-center justify-between gap-2">
      <p className="eyebrow">{category}</p>
      <Badge tone={positive ? "positive" : "neutral"}>{badge}</Badge>
    </div>
    <div>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
    <div className="space-y-4">{children}</div>
    <div className="mt-auto border-t pt-5">{action}</div>
  </Card>
);
