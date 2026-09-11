/** Presentation contracts for Phase 2 fixtures, independent of future database models. */
export interface MockTransaction {
  id: string;
  merchant: string;
  initials: string;
  amount: number;
  date: string;
  account: string;
  category: string;
  context: string;
}
export interface CategorySpending {
  name: string;
  amount: number;
  percentage: number;
  change?: string;
}
export interface SpendingPoint {
  label: string;
  current: number | null;
  previous: number;
  projected?: number;
}
export type SpendingPeriod = "Month" | "3M" | "6M";
export interface SpendingSeries {
  pace: string;
  points: SpendingPoint[];
  summary: string;
  currentLabel: string;
  previousLabel: string;
}
export interface MockGoal {
  id: string;
  category: string;
  name: string;
  account: string;
  badge: string;
  saved: number;
  target: number;
  progress: number;
  monthlyPace: number;
  completion: string;
  remaining: string;
}
export interface Milestone {
  title: string;
  detail: string;
  status: "Achieved" | "Current target" | "Upcoming" | "Future";
}
export interface OptimizerScenario {
  completion: string;
  description: string;
  milestones: Milestone[];
}
export interface InsightData {
  diningSummary: { description: string; recommendation: string };
  subscriptionSummary: {
    badge: string;
    description: string;
    recommendation: string;
  };
  savingsSummary: {
    description: string;
    target: string;
    ahead: string;
    reserves: string;
    comparison: string;
    progress: number;
    recommendation: string;
  };
  weekendSummary: {
    description: string;
    total: string;
    weekdays: number;
    weekends: number;
    recommendation: string;
  };
  dining: { week: string; amount: number }[];
  subscriptions: { name: string; detail: string; amount: number }[];
  activeCount: number;
}

export interface RecommendationData {
  dining: {
    change: string;
    spending: number;
    baseline: number;
    annualSavings: number;
  };
  plan: {
    monthlySavings: number;
    annualSavings: number;
    categories: { category: string; savings: number }[];
  };
}
