import { calculateMonthlyExpenses, calculateMonthlyIncome, calculateSavings, calculateSavingsRate, compareMonthToMonth, groupSpendingByCategory } from '@/lib/finance/calculations';
import type { Transaction } from '@/lib/finance/types';
import type { SpendingPeriod, SpendingSeries } from '@/lib/mock/types';

export interface DashboardTransaction extends Transaction { id: number }
const labels: Record<string, string> = { HOUSING: 'Housing', FOOD_AND_DINING: 'Food & Dining', TRANSPORTATION: 'Transportation', SHOPPING: 'Shopping', ENTERTAINMENT: 'Entertainment', SUBSCRIPTIONS: 'Subscriptions', INCOME: 'Income', OTHER: 'Other' };
const monthLabel = (date: Date) => new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(date);
const inMonth = (t: Transaction, date: Date) => t.date.getUTCFullYear() === date.getUTCFullYear() && t.date.getUTCMonth() === date.getUTCMonth();

/** Latest recorded UTC month; balances assume zero opening funds. */
export function buildDashboard(transactions: readonly DashboardTransaction[]) {
  const sorted = [...transactions].sort((a, b) => b.date.getTime() - a.date.getTime() || b.id - a.id);
  const latest = sorted[0]?.date;
  if (!latest) return null;
  const month = latest.getUTCMonth() + 1;
  const year = latest.getUTCFullYear();
  const selected = sorted.filter(t => inMonth(t, latest));
  const income = calculateMonthlyIncome(sorted, month, year);
  const expenses = calculateMonthlyExpenses(sorted, month, year);
  const savings = calculateSavings(income, expenses);
  // Reuse validated, cent-safe monthly totals for the complete recorded ledger.
  const net = (rows: readonly Transaction[]) => {
    const periods = new Map(rows.map(t => [`${t.date.getUTCFullYear()}-${t.date.getUTCMonth()}`, t.date]));
    let earned = 0n;
    let spent = 0n;
    for (const date of periods.values()) {
      earned += BigInt(Math.round(calculateMonthlyIncome(rows, date.getUTCMonth() + 1, date.getUTCFullYear()) * 100));
      spent += BigInt(Math.round(calculateMonthlyExpenses(rows, date.getUTCMonth() + 1, date.getUTCFullYear()) * 100));
    }
    return calculateSavings(Number(earned) / 100, Number(spent) / 100);
  };
  const series = {} as Record<SpendingPeriod, SpendingSeries>;
  for (const [key, count] of [['Month', 1], ['3M', 3], ['6M', 6]] as const) {
    const points = Array.from({ length: count }, (_, index) => {
      const date = new Date(Date.UTC(year, month - count + index, 1));
      const previous = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() - count, 1));
      return { label: monthLabel(date), current: calculateMonthlyExpenses(sorted, date.getUTCMonth() + 1, date.getUTCFullYear()), previous: calculateMonthlyExpenses(sorted, previous.getUTCMonth() + 1, previous.getUTCFullYear()) };
    });
    series[key] = { points, pace: 'Recorded monthly expenses', currentLabel: 'Selected period', previousLabel: 'Preceding period', summary: 'Calendar-month totals from recorded transactions. Months without records show zero; the latest month may be incomplete.' };
  }
  const previousDate = new Date(Date.UTC(year, month - 2, 1));
  const days = new Date(Date.UTC(year, month, 0)).getUTCDate();
  series.Month = {
    pace: 'Recorded spending through each calendar day',
    currentLabel: monthLabel(latest), previousLabel: monthLabel(previousDate),
    summary: 'Cumulative expenses by UTC day. The current line stops at the latest recorded day; no future spending is projected.',
    points: Array.from({ length: days }, (_, index) => {
      const day = index + 1;
      const throughDay = sorted.filter(t => t.date.getUTCDate() <= day);
      return { label: String(day), current: day <= latest.getUTCDate() ? calculateMonthlyExpenses(throughDay, month, year) : null, previous: calculateMonthlyExpenses(throughDay, previousDate.getUTCMonth() + 1, previousDate.getUTCFullYear()) };
    }),
  };
  return {
    period: monthLabel(latest), asOf: latest.toISOString(), income, expenses, savings,
    savingsRate: calculateSavingsRate(savings, income), balance: net(sorted),
    comparison: compareMonthToMonth(sorted, month, year), series,
    categories: groupSpendingByCategory(selected).sort((a, b) => b.amount - a.amount).map(row => ({ name: labels[row.category] ?? row.category, amount: row.amount, percentage: expenses === 0 ? 0 : Math.round(row.amount / expenses * 1000) / 10 })),
    accounts: [...new Set(sorted.map(t => t.account))].sort().map(name => ({ name, balance: net(sorted.filter(t => t.account === name)) })),
    recentTransactions: sorted.slice(0, 5).map(t => ({ id: String(t.id), merchant: t.merchant, initials: t.merchant.split(/\s+/).map(word => word[0]).slice(0, 2).join(''), amount: Number(t.amount.toString()), date: t.date.toISOString(), account: t.account, category: labels[t.category] ?? t.category, context: '' })),
  };
}
