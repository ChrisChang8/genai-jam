import { Check, Circle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { Milestone } from "@/lib/mock/types";

export interface MilestoneTimelineProps {
  milestones: Milestone[];
}
export const MilestoneTimeline: React.FC<MilestoneTimelineProps> = ({
  milestones,
}) => (
  <Card className="md:p-7">
    <div className="mb-8 flex items-center justify-between gap-4">
      <h2 className="text-sm font-semibold uppercase tracking-wide">
        Milestone Trajectory
      </h2>
      <span className="text-xs text-muted-foreground">2026 – 2028</span>
    </div>
    <ol className="grid gap-6 md:grid-cols-4 md:gap-0">
      {milestones.map((milestone) => (
        <li key={milestone.title} className="relative md:pr-4">
          <div className="absolute left-4 right-0 top-4 hidden border-t md:block" />
          <div className="relative flex items-center gap-2">
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${milestone.status === "Achieved" ? "bg-mint text-white" : milestone.status === "Current target" ? "bg-black text-white" : "border bg-surface text-muted-foreground"}`}
            >
              {milestone.status === "Achieved" ? (
                <Check size={16} aria-hidden="true" />
              ) : (
                <Circle size={9} fill="currentColor" aria-hidden="true" />
              )}
            </span>
            <span
              className={`bg-surface pr-2 text-[10px] font-medium uppercase tracking-wide ${milestone.status === "Achieved" ? "text-positive" : ""}`}
            >
              {milestone.status}
            </span>
          </div>
          <h3 className="mt-3 text-sm font-semibold">{milestone.title}</h3>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {milestone.detail}
          </p>
        </li>
      ))}
    </ol>
  </Card>
);
