import { cn } from "@/lib/utils";

export interface ProgressProps {
  value: number;
  label: string;
  tone?: "mint" | "black";
  className?: string;
}
export const Progress: React.FC<ProgressProps> = ({
  value,
  label,
  tone = "mint",
  className,
}) => (
  <div
    role="progressbar"
    aria-label={label}
    aria-valuenow={Math.min(100, Math.max(0, value))}
    aria-valuemin={0}
    aria-valuemax={100}
    className={cn("h-2 overflow-hidden rounded-full bg-muted", className)}
  >
    <div
      className={`h-full rounded-full ${tone === "mint" ? "bg-mint" : "bg-black"}`}
      style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
    />
  </div>
);
