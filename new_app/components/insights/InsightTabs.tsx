"use client";

import { useState, type ReactNode } from "react";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { EmptyState } from "@/components/common/EmptyState";

export interface InsightTabsProps {
  activeCount: number;
  children: ReactNode;
}
export const InsightTabs: React.FC<InsightTabsProps> = ({
  activeCount,
  children,
}) => {
  const [view, setView] = useState<"active" | "archived">("active");
  return (
    <section aria-label="Financial insights" className="space-y-6">
      <div className="flex justify-end">
        <SegmentedControl
          label="Insight view"
          value={view}
          onChange={setView}
          options={[
            { value: "active", label: `Active (${activeCount})` },
            { value: "archived", label: "Archived" },
          ]}
        />
      </div>
      <div aria-live="polite">
        {view === "active" ? (
          children
        ) : (
          <EmptyState
            title="No archived insights"
            description="Your sample insights are all active. Archived insights will appear here."
          />
        )}
      </div>
    </section>
  );
};
