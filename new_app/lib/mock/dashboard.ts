import type {
  CategorySpending,
  SpendingPeriod,
  SpendingSeries,
  RecommendationData,
} from "@/lib/mock/types";

export const dashboardMetrics = [
  {
    label: "Current balance",
    value: "$8,420",
    detail: "↑ +6.4% from last month",
    detailPositive: true,
  },
  {
    label: "Monthly income",
    value: "$5,700",
    detail: "Expected: $5,700 (100%)",
  },
  {
    label: "Monthly spending",
    value: "$3,140",
    detail: "+8% higher than last month",
  },
  {
    label: "Monthly savings",
    value: "$2,560",
    detail: "44.9% savings rate",
    detailBadge: true,
  },
];
export const categories: CategorySpending[] = [
  { name: "Housing", amount: 1400, percentage: 44.6 },
  {
    name: "Food & Dining",
    amount: 620,
    percentage: 19.7,
    change: "+24% vs last mo",
  },
  { name: "Transportation", amount: 350, percentage: 11.1 },
  { name: "Shopping", amount: 290, percentage: 9.2 },
  { name: "Entertainment", amount: 180, percentage: 5.7 },
  { name: "Subscriptions", amount: 135, percentage: 4.3 },
  { name: "Other", amount: 165, percentage: 5.3 },
];
export const spendingSeries: Record<SpendingPeriod, SpendingSeries> = {
  Month: {
    pace: "Pace: $286 ahead of August",
    summary:
      "September spending is $3,140 as of Sep 22, $286 ahead of August at the same point. Dashed lines show the comparison and illustrative projection.",
    currentLabel: "Sep",
    previousLabel: "Aug",
    points: [
      { label: "Sep 1", current: 90, previous: 80 },
      { label: "Sep 8", current: 840, previous: 780 },
      { label: "Sep 15", current: 1910, previous: 1600 },
      { label: "Sep 22", current: 3140, previous: 2854, projected: 3140 },
      { label: "Sep 30", current: null, previous: 3600, projected: 3960 },
    ],
  },
  "3M": {
    pace: "Illustrative monthly totals",
    summary:
      "Sample monthly spending: July $2,720; August $2,854; September $3,140. Comparison shows the preceding three months.",
    currentLabel: "Jul–Sep",
    previousLabel: "Apr–Jun",
    points: [
      { label: "Month 1", current: 2720, previous: 2490 },
      { label: "Month 2", current: 2854, previous: 2600 },
      { label: "Month 3", current: 3140, previous: 2780 },
    ],
  },
  "6M": {
    pace: "Illustrative monthly totals",
    summary:
      "Sample monthly spending from April to September: $2,490, $2,600, $2,780, $2,720, $2,854, and $3,140. Comparison shows the preceding six months.",
    currentLabel: "Apr–Sep",
    previousLabel: "Oct–Mar",
    points: [
      { label: "Month 1", current: 2490, previous: 2300 },
      { label: "Month 2", current: 2600, previous: 2650 },
      { label: "Month 3", current: 2780, previous: 2700 },
      { label: "Month 4", current: 2720, previous: 2400 },
      { label: "Month 5", current: 2854, previous: 2510 },
      { label: "Month 6", current: 3140, previous: 2620 },
    ],
  },
};
export const savingsRecommendations = [
  { category: "Food & Dining", savings: 200 },
  { category: "Shopping", savings: 120 },
  { category: "Subscriptions", savings: 100 },
  { category: "Entertainment", savings: 80 },
];
export const accounts = [
  { name: "Chase Sapphire Card", balance: -1740 },
  { name: "Apple Card", balance: -324.5 },
  { name: "Fidelity Checking", balance: 10484.5 },
];

export const recommendations: RecommendationData = {
  dining: {
    change: "24% higher",
    spending: 620,
    baseline: 500,
    annualSavings: 1440,
  },
  plan: {
    monthlySavings: 500,
    annualSavings: 6000,
    categories: savingsRecommendations,
  },
};
export const categoryTotal = 3140;
