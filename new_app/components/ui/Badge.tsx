import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps {
  children: ReactNode;
  tone?: "neutral" | "positive";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  tone = "neutral",
  className,
}) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
      tone === "positive"
        ? "bg-positive-surface text-positive"
        : "bg-muted text-muted-foreground",
      className,
    )}
  >
    {children}
  </span>
);
