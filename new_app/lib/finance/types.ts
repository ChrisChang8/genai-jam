/** Structurally accepts Prisma records without importing a database runtime. */
export interface Transaction {
  merchant: string;
  amount: number | string | { toString(): string };
  date: Date;
  category: string;
  type: string;
  account: string;
}

export interface CategorySpending {
  category: string;
  amount: number;
}

export interface MonthlyComparison {
  current: number;
  previous: number;
  change: number;
  /** Relative expense change in percent; null when previous spending was zero and current is nonzero. */
  percentageChange: number | null;
}

export interface RecurringPattern {
  merchant: string;
  account: string;
  category: string;
  type: string;
  cadence: 'weekly' | 'biweekly' | 'semimonthly' | 'monthly';
  occurrences: number;
  averageAmount: number;
}

export interface SavingsPlan {
  target: number;
  recommendations: { category: string; current: number; recommended: number; savings: number }[];
  totalSavings: number;
  shortfall: number;
  feasible: boolean;
  annualSavings: number;
}
