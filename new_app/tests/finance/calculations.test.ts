import { describe, expect, it } from 'vitest';
import { Decimal } from '@prisma/client/runtime/library';
import * as finance from '@/lib/finance/calculations';
import type { Transaction } from '@/lib/finance/types';

function transaction(overrides: Partial<Transaction> = {}): Transaction {
  return { merchant: 'Shop', account: 'Checking', date: new Date('2026-09-10T00:00:00Z'), amount: -100, category: 'SHOPPING', type: 'EXPENSE', ...overrides };
}

describe('monthly finance calculations', () => {
  const rows = [transaction(), transaction({ amount: -0.1 }), transaction({ amount: new Decimal('-0.20') }), transaction({ amount: 1000, type: 'INCOME', category: 'INCOME' }), transaction({ date: new Date('2026-08-31T23:59:59.999Z'), amount: -999 }), transaction({ date: new Date('2026-10-01T00:00:00Z'), amount: -999 })];
  it('uses UTC month boundaries and exact cents with Prisma decimals', () => {
    expect(finance.calculateMonthlyIncome(rows, 9, 2026)).toBe(1000);
    expect(finance.calculateMonthlyExpenses(rows, 9, 2026)).toBe(100.3);
    expect(finance.calculateSavings(1000, 100.3)).toBe(899.7);
    expect(finance.calculateSavingsRate(899.7, 1000)).toBe(89.97);
  });
  it('supports deficits and zero income', () => {
    expect(finance.calculateSavings(100, 150)).toBe(-50);
    expect(finance.calculateSavingsRate(-50, 100)).toBe(-50);
    expect(finance.calculateSavingsRate(-50, 0)).toBe(0);
  });
  it('handles empty input across the engine', () => {
    expect(finance.calculateMonthlyIncome([], 9, 2026)).toBe(0);
    expect(finance.calculateMonthlyExpenses([], 9, 2026)).toBe(0);
    expect(finance.groupSpendingByCategory([])).toEqual([]);
    expect(finance.findLargestSpendingCategories([])).toEqual([]);
    expect(finance.detectRecurringTransactions([])).toEqual([]);
    expect(finance.compareMonthToMonth([], 9, 2026).percentageChange).toBe(0);
    expect(finance.calculateProjectedMonthlySpend([], new Date('2026-09-10'))).toBe(0);
  });
  it.each([NaN, Infinity, 1.001, Number.MAX_VALUE])('rejects invalid monetary input %s', (amount) => {
    expect(() => finance.calculateMonthlyIncome([transaction({ amount, type: 'INCOME' })], 9, 2026)).toThrow(RangeError);
  });
  it('rejects invalid signs, types, periods, dates, and unsafe totals', () => {
    expect(() => finance.calculateMonthlyExpenses([transaction({ amount: 10 })], 9, 2026)).toThrow();
    expect(() => finance.groupSpendingByCategory([transaction({ type: 'refund' })])).toThrow();
    expect(() => finance.calculateMonthlyIncome([], 13, 2026)).toThrow();
    expect(() => finance.calculateMonthlyIncome([transaction({ date: new Date('invalid') })], 9, 2026)).toThrow();
    expect(() => finance.calculateSavings(-1, 10)).toThrow();
    expect(() => finance.calculateSavingsRate(1, -10)).toThrow();
    expect(() => finance.calculateMonthlyExpenses([transaction({ amount: '-90071992547409.91' }), transaction()], 9, 2026)).toThrow();
  });
});

describe('spending analysis', () => {
  it('groups expenses, excludes income, and ranks ties alphabetically without mutating input', () => {
    const rows = Object.freeze([transaction({ category: 'OTHER', amount: -200 }), transaction(), transaction(), transaction({ amount: 500, type: 'INCOME' })]);
    expect(finance.groupSpendingByCategory(rows)).toEqual([{ category: 'OTHER', amount: 200 }, { category: 'SHOPPING', amount: 200 }]);
    expect(finance.findLargestSpendingCategories(rows, 1)).toEqual([{ category: 'OTHER', amount: 200 }]);
    expect(finance.findLargestSpendingCategories(rows, 0)).toEqual([]);
    expect(() => finance.findLargestSpendingCategories(rows, -1)).toThrow();
  });
  it('compares across years and reports undefined growth from zero', () => {
    const rows = [transaction({ date: new Date('2025-12-10'), amount: -200 }), transaction({ date: new Date('2026-01-10'), amount: -150 })];
    expect(finance.compareMonthToMonth(rows, 1, 2026)).toEqual({ current: 150, previous: 200, change: -50, percentageChange: -25 });
    expect(finance.compareMonthToMonth(rows, 12, 2025).percentageChange).toBeNull();
    expect(finance.compareMonthToMonth(rows, 2, 2026).percentageChange).toBe(-100);
  });
  it('projects inclusive UTC days, ignores future days and handles leap February', () => {
    const rows = [transaction({ date: new Date('2024-02-10T23:59:59Z'), amount: -100 }), transaction({ date: new Date('2024-02-11'), amount: -500 }), transaction()];
    expect(finance.calculateProjectedMonthlySpend(rows, new Date('2024-02-10'))).toBe(290);
    expect(finance.calculateProjectedMonthlySpend(rows, new Date('2024-02-29'))).toBe(600);
    expect(finance.calculateProjectedMonthlySpend([transaction({ amount: -0.01 })], new Date('2026-09-11'))).toBe(0.03);
  });
});

describe('recurring patterns', () => {
  function onDates(dates: string[], overrides: Partial<Transaction> = {}) {
    return dates.map((date) => transaction({ ...overrides, date: new Date(date) }));
  }
  it('detects monthly end-of-month payments from unsorted data', () => {
    const rows = onDates(['2026-03-31', '2026-01-31', '2026-02-28']);
    expect(finance.detectRecurringTransactions(rows)).toEqual([{ merchant: 'shop', account: 'Checking', category: 'SHOPPING', type: 'EXPENSE', cadence: 'monthly', occurrences: 3, averageAmount: -100 }]);
    expect(rows[0].date.toISOString()).toContain('2026-03-31');
  });
  it.each([
    ['weekly', ['2026-09-01', '2026-09-08', '2026-09-15']],
    ['biweekly', ['2026-09-01', '2026-09-15', '2026-09-29']],
    ['semimonthly', ['2026-09-09', '2026-09-24', '2026-10-09', '2026-10-24', '2026-11-09', '2026-11-24']],
  ] as const)('detects %s income cadence', (cadence, dates) => {
    expect(finance.detectRecurringTransactions(onDates([...dates], { type: 'INCOME', amount: 2850 }))[0]).toMatchObject({ cadence, averageAmount: 2850 });
  });
  it('does not infer recurrence from sparse, irregular, duplicated, or unstable charges', () => {
    expect(finance.detectRecurringTransactions(onDates(['2026-09-01', '2026-10-01']))).toEqual([]);
    expect(finance.detectRecurringTransactions(onDates(['2026-09-01', '2026-09-03', '2026-10-20']))).toEqual([]);
    expect(finance.detectRecurringTransactions(onDates(['2026-09-01', '2026-09-01', '2026-09-08']))).toEqual([]);
    const rows = onDates(['2026-09-01', '2026-10-01', '2026-11-01']);
    rows[1].amount = -200;
    expect(finance.detectRecurringTransactions(rows)).toEqual([]);
  });
  it('separates accounts and normalizes merchant whitespace/case', () => {
    const rows = onDates(['2026-09-01', '2026-10-01', '2026-11-01']);
    rows[1].merchant = ' SHOP ';
    expect(finance.detectRecurringTransactions(rows)).toHaveLength(1);
    rows[1].account = 'Other card';
    expect(finance.detectRecurringTransactions(rows)).toEqual([]);
  });
});

describe('savings plans', () => {
  const rows = [transaction({ amount: -300 }), transaction({ category: 'FOOD_AND_DINING', amount: -250 }), transaction({ category: 'HOUSING', amount: -1500 }), transaction({ category: 'TRANSPORTATION', amount: -100 }), transaction({ category: 'OTHER', amount: -100 }), transaction({ date: new Date('2026-08-01'), amount: -900 })];
  it('meets a feasible target exactly using only selected-month discretionary spending', () => {
    expect(finance.generateSavingsPlan(rows, 500, 9, 2026)).toEqual({ target: 500, recommendations: [
      { category: 'SHOPPING', current: 300, recommended: 0, savings: 300 },
      { category: 'FOOD_AND_DINING', current: 250, recommended: 50, savings: 200 },
    ], totalSavings: 500, shortfall: 0, feasible: true, annualSavings: 6000 });
  });
  it('caps an infeasible plan and reports the shortfall', () => {
    expect(finance.generateSavingsPlan(rows, 600, 9, 2026)).toMatchObject({ totalSavings: 550, shortfall: 50, feasible: false, annualSavings: 6600 });
    expect(finance.generateSavingsPlan([], 500, 9, 2026)).toMatchObject({ recommendations: [], totalSavings: 0, shortfall: 500, feasible: false });
    expect(finance.generateSavingsPlan(rows, 0, 9, 2026)).toMatchObject({ recommendations: [], feasible: true });
    expect(() => finance.generateSavingsPlan(rows, -1, 9, 2026)).toThrow();
  });
  it('preserves every cent and never recommends more than current spending', () => {
    const small = [transaction({ amount: -0.1 }), transaction({ amount: -0.2, category: 'ENTERTAINMENT' })];
    for (const target of [0.01, 0.15, 0.29, 0.3, 0.31, 500]) {
      const plan = finance.generateSavingsPlan(small, target, 9, 2026);
      const sum = plan.recommendations.reduce((n, r) => n + Math.round(r.savings * 100), 0);
      expect(sum).toBe(Math.round(plan.totalSavings * 100));
      expect(sum + Math.round(plan.shortfall * 100)).toBe(Math.round(target * 100));
      for (const r of plan.recommendations) {
        expect(r.recommended).toBeGreaterThanOrEqual(0);
        expect(r.savings).toBeLessThanOrEqual(r.current);
      }
    }
  });
});
