"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { PreviewAction } from "@/components/common/PreviewAction";
import { MilestoneTimeline } from "@/components/goals/MilestoneTimeline";
import type { OptimizerScenario } from "@/lib/mock/types";

export interface PacingOptimizerProps {
  scenarios: { standard: OptimizerScenario; accelerated: OptimizerScenario };
}
export const PacingOptimizer: React.FC<PacingOptimizerProps> = ({
  scenarios,
}) => {
  const [enabled, setEnabled] = useState(true);
  const scenario = enabled ? scenarios.accelerated : scenarios.standard;
  return (
    <div className="section-space">
      <Card className="flex flex-col gap-6 md:p-7 lg:flex-row lg:items-center">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-lg font-semibold">Pacing Optimizer</h2>
            <Badge tone={enabled ? "positive" : "neutral"}>
              {enabled ? "Surplus available" : "Standard pace"}
            </Badge>
          </div>
          <p
            className="mt-3 text-sm leading-7 text-muted-foreground"
            aria-live="polite"
          >
            <strong className="font-medium text-foreground">
              {enabled
                ? "Accelerate with Monthly Surplus: "
                : "Scheduled Monthly Pace: "}
            </strong>
            {scenario.description}
          </p>
          <p className="mt-2 text-[11px] text-muted-foreground">
            Illustrative scenario · the goal cards show the original scheduled
            pace.
          </p>
        </div>
        <div className="flex items-start gap-5">
          <button
            type="button"
            role="switch"
            aria-checked={enabled}
            aria-label="Preview accelerated savings pace"
            onClick={() => setEnabled(!enabled)}
            className={`relative mt-2 h-7 w-12 shrink-0 rounded-full transition-colors ${enabled ? "bg-black" : "bg-neutral-300"}`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform ${enabled ? "left-1 translate-x-5" : "left-1"}`}
            />
          </button>
          <PreviewAction
            label="Apply to Auto-Transfers"
            note="Auto-transfers are unavailable in this demo."
          />
        </div>
      </Card>
      <MilestoneTimeline milestones={scenario.milestones} />
    </div>
  );
};
