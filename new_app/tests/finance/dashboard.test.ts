import { describe, expect, it } from 'vitest';
import { buildDashboard, type DashboardTransaction } from '@/lib/finance/dashboard';

const row = (id: number, date: string, amount: string, account = 'Checking'): DashboardTransaction => ({ id, date: new Date(date), amount: { toString: () => amount }, merchant: 'Demo Merchant', account, category: amount.startsWith('-') ? 'FOOD_AND_DINING' : 'INCOME', type: amount.startsWith('-') ? 'EXPENSE' : 'INCOME' });

describe('dashboard database-record adapter', () => {
  it('reconciles decimal records across months, accounts, charts and categories', () => {
    const data = buildDashboard([
      row(1, '2025-12-01T00:00:00Z', '1000'),
      row(2, '2025-12-31T23:59:59Z', '-100.10'),
      row(3, '2026-01-01T00:00:00Z', '500'),
      row(4, '2026-01-02T00:00:00Z', '-50.20'),
      row(5, '2026-01-02T00:00:00Z', '-20.30', 'Card'),
    ])!;
    expect(data.period).toBe('January 2026');
    expect(data.income).toBe(500);
    expect(data.expenses).toBe(70.50);
    expect(data.savings).toBe(429.50);
    expect(data.savingsRate).toBe(85.9);
    expect(data.balance).toBe(1329.40);
    expect(data.accounts).toEqual([{ name: 'Card', balance: -20.30 }, { name: 'Checking', balance: 1349.70 }]);
    expect(data.categories).toEqual([{ name: 'Food & Dining', amount: 70.50, percentage: 100 }]);
    expect(data.comparison.previous).toBe(100.10);
    expect(data.series.Month.points[1].current).toBe(70.50);
    expect(data.series.Month.points[2].current).toBeNull();
    expect(data.series.Month.points[30].previous).toBe(100.10);
    expect(data.series['3M'].points.map(p => p.current)).toEqual([0, 100.10, 70.50]);
    expect(data.recentTransactions.map(t => t.id)).toEqual(['5', '4', '3', '2', '1']);
    expect(JSON.parse(JSON.stringify(data))).toEqual(data);
  });
  it('returns an explicit empty state without choosing a fabricated month', () => {
    expect(buildDashboard([])).toBeNull();
  });
  it('handles income-only and expense-only data without invalid percentages', () => {
    const income = buildDashboard([row(1, '2026-02-01T00:00:00Z', '10')])!;
    expect(income.categories).toEqual([]);
    expect(income.savingsRate).toBe(100);
    const expense = buildDashboard([row(1, '2026-02-01T00:00:00Z', '-0.10')])!;
    expect(expense.savingsRate).toBe(0);
    expect(expense.balance).toBe(-0.10);
    expect(expense.comparison.percentageChange).toBeNull();
  });
});
