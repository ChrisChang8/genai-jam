import type { MockGoal, OptimizerScenario } from "@/lib/mock/types";

export const goals: MockGoal[] = [
  {
    id: "emergency",
    category: "Essential target",
    name: "Emergency Fund",
    account: "Marcus High-Yield Savings · 4.4% APY",
    badge: "6 months reserve",
    saved: 6800,
    target: 10000,
    progress: 68,
    monthlyPace: 650,
    completion: "Jan 2027",
    remaining: "4 mos left",
  },
  {
    id: "travel",
    category: "Lifestyle & travel",
    name: "Tokyo & Kyoto Trip",
    account: "Travel Vault · 0.8% APY",
    badge: "Spring 2027",
    saved: 1400,
    target: 3000,
    progress: 47,
    monthlyPace: 450,
    completion: "March 2027",
    remaining: "6 mos left",
  },
];
export const goalMetrics = [
  { label: "Total saved", value: "$8,200", detail: "Across all active funds" },
  { label: "Aggregated target", value: "$13,000", detail: "$4,800 remaining" },
  {
    label: "Monthly inflow",
    value: "$1,100/mo",
    detail: "Scheduled deposits · sample",
  },
  {
    label: "System status",
    value: "On track",
    detail: "All goals on track · illustrative",
  },
];
const milestones = [
  {
    title: "3-Month Safety Net",
    detail: "$5,000 threshold completed",
    status: "Achieved" as const,
  },
  {
    title: "6-Month Emergency Fund",
    detail: "$10,000 target · Jan 2027",
    status: "Current target" as const,
  },
  {
    title: "Travel Fund",
    detail: "$3,000 target · March 2027",
    status: "Upcoming" as const,
  },
  {
    title: "Home Down Payment",
    detail: "Wealth expansion track",
    status: "Future" as const,
  },
];
export const optimizerScenarios: {
  standard: OptimizerScenario;
  accelerated: OptimizerScenario;
} = {
  standard: {
    completion: "Jan 2027",
    description:
      "Keep the scheduled monthly pace. The sample Emergency Fund target remains January 2027.",
    milestones,
  },
  accelerated: {
    completion: "Nov 2026",
    description:
      "Allocating the illustrative $500 monthly dining & subscription savings brings Emergency Fund completion forward from Jan 2027 to Nov 2026.",
    milestones: milestones.map((m) =>
      m.status === "Current target"
        ? { ...m, detail: "$10,000 target · Nov 2026" }
        : m,
    ),
  },
};
