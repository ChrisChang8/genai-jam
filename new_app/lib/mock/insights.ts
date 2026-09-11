import type { InsightData } from "@/lib/mock/types";

export const insights: InsightData = {
  diningSummary: {
    description:
      "You spent $620 on dining this month (+$120 compared to last month).",
    recommendation:
      "Setting a $105/week target keeps you under $500 in this sample month.",
  },
  subscriptionSummary: {
    badge: "7 services",
    description: "7 active recurring charges totaling $135/mo ($1,620/year).",
    recommendation:
      "Pause or cancel unused Equinox and NYTimes to save $55/month ($660/year). Illustrative only.",
  },
  savingsSummary: {
    description:
      "Savings rate reached 44.9% this month (up from 38% in August).",
    target: "Monthly target: 40.0%",
    ahead: "+4.9 pp ahead",
    reserves: "$2,560 in sample reserves",
    comparison: "+$490 vs August",
    progress: 100,
    recommendation:
      "You have a $300 surplus. Allocating it to your Emergency Fund achieves your goal 2 months earlier in this illustrative scenario.",
  },
  weekendSummary: {
    description:
      "38% of your discretionary spending occurs between Friday and Sunday.",
    total: "$456 spent over 3 weekends",
    weekdays: 62,
    weekends: 38,
    recommendation:
      "A gentle notification on Friday afternoons can help you track social and dining budgets.",
  },
  activeCount: 4,
  dining: [
    { week: "W1", amount: 110 },
    { week: "W2", amount: 140 },
    { week: "W3", amount: 165 },
    { week: "W4", amount: 205 },
  ],
  subscriptions: [
    { name: "Equinox Digital", detail: "Unused in 45d", amount: 40 },
    { name: "NYTimes", detail: "Rarely read", amount: 15 },
    {
      name: "Netflix, Spotify, Prime, iCloud, ChatGPT",
      detail: "5 services",
      amount: 80,
    },
  ],
};
export const insightMetrics = [
  { label: "Active signals", value: "4", detail: "September 2026 sample" },
  {
    label: "Potential monthly savings",
    value: "+$500/mo",
    detail: "$6,000 annualized opportunity",
    positive: true,
  },
  {
    label: "Savings rate",
    value: "44.9%",
    detail: "+6.9 percentage points vs previous month",
  },
  {
    label: "Month pace",
    value: "On track",
    detail: "8 days remaining in sample cycle",
  },
];
