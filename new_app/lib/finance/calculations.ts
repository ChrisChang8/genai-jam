import type { CategorySpending, MonthlyComparison, RecurringPattern, SavingsPlan, Transaction } from '@/lib/finance/types';

const MAX_CENTS = BigInt(Number.MAX_SAFE_INTEGER);
const DISCRETIONARY = new Set(['FOOD_AND_DINING', 'SHOPPING', 'ENTERTAINMENT', 'SUBSCRIPTIONS']);

/** Reject sub-cent input instead of silently rounding financial source data. */
function cents(value: Transaction['amount']): bigint {
  const match = /^(-?)(\d+)(?:\.(\d{1,2}))?$/.exec(value.toString());
  if (!match) throw new RangeError('Amounts must be finite USD values with at most two decimal places');
  const result = (BigInt(match[2]) * 100n + BigInt((match[3] ?? '').padEnd(2, '0'))) * (match[1] ? -1n : 1n);
  dollars(result);
  return result;
}

function dollars(value: bigint): number {
  if (value > MAX_CENTS || value < -MAX_CENTS) throw new RangeError('Amount exceeds safe cent range');
  return Number(value) / 100;
}

function validDate(date: Date): void {
  if (!(date instanceof Date) || !Number.isFinite(date.getTime())) throw new RangeError('Invalid transaction date');
}

function period(month: number, year: number): void {
  if (!Number.isInteger(month) || month < 1 || month > 12 || !Number.isInteger(year) || year < 100 || year > 9999) {
    throw new RangeError('Expected month 1–12 and year 100–9999');
  }
}

function amount(transaction: Transaction): bigint {
  validDate(transaction.date);
  const value = cents(transaction.amount);
  if (!['INCOME', 'EXPENSE'].includes(transaction.type) ||
    (transaction.type === 'INCOME' && value < 0n) || (transaction.type === 'EXPENSE' && value > 0n)) {
    throw new RangeError('Expected uppercase transaction type and matching amount sign');
  }
  return value;
}

function monthly(transactions: readonly Transaction[], month: number, year: number): Transaction[] {
  period(month, year);
  return transactions.filter((t) => {
    amount(t);
    return t.date.getUTCFullYear() === year && t.date.getUTCMonth() === month - 1;
  });
}

export function calculateMonthlyIncome(transactions: readonly Transaction[], month: number, year: number): number {
  return dollars(monthly(transactions, month, year).reduce((sum, t) => sum + (t.type === 'INCOME' ? amount(t) : 0n), 0n));
}

export function calculateMonthlyExpenses(transactions: readonly Transaction[], month: number, year: number): number {
  return dollars(monthly(transactions, month, year).reduce((sum, t) => sum - (t.type === 'EXPENSE' ? amount(t) : 0n), 0n));
}

export function calculateSavings(income: number, expenses: number): number {
  if (income < 0 || expenses < 0) throw new RangeError('Income and expenses must be nonnegative totals');
  return dollars(cents(income) - cents(expenses));
}

export const calculateMonthlySavings = calculateSavings;

export function calculateSavingsRate(savings: number, income: number): number {
  const saved = cents(savings);
  const earned = cents(income);
  if (earned < 0n) throw new RangeError('Income must be nonnegative');
  return earned === 0n ? 0 : Math.round(Number(saved) / Number(earned) * 10000) / 100;
}

/** Operates on the supplied period; income is excluded. */
export function groupSpendingByCategory(transactions: readonly Transaction[]): CategorySpending[] {
  const groups = new Map<string, bigint>();
  for (const t of transactions) {
    const value = amount(t);
    if (t.type === 'EXPENSE') groups.set(t.category, (groups.get(t.category) ?? 0n) - value);
  }
  return [...groups].map(([category, value]) => ({ category, amount: dollars(value) }))
    .sort((a, b) => a.category < b.category ? -1 : a.category > b.category ? 1 : 0);
}

export function findLargestSpendingCategories(transactions: readonly Transaction[], limit = 3): CategorySpending[] {
  if (!Number.isInteger(limit) || limit < 0) throw new RangeError('Limit must be a nonnegative integer');
  return groupSpendingByCategory(transactions).sort((a, b) => b.amount - a.amount).slice(0, limit);
}

/** Compare selected calendar month expenses with the immediately preceding month. */
export function compareMonthToMonth(transactions: readonly Transaction[], month: number, year: number): MonthlyComparison {
  const current = calculateMonthlyExpenses(transactions, month, year);
  const previous = calculateMonthlyExpenses(transactions, month === 1 ? 12 : month - 1, month === 1 ? year - 1 : year);
  const change = dollars(cents(current) - cents(previous));
  return { current, previous, change, percentageChange: previous === 0 ? (current === 0 ? 0 : null) : Math.round(change / previous * 10000) / 100 };
}

/** Daily run rate through the supplied UTC calendar day, inclusive. No system clock dependency. */
export function calculateProjectedMonthlySpend(transactions: readonly Transaction[], asOf: Date): number {
  validDate(asOf);
  const year = asOf.getUTCFullYear();
  const month = asOf.getUTCMonth() + 1;
  const day = asOf.getUTCDate();
  const elapsed = monthly(transactions, month, year).filter((t) => t.date.getUTCDate() <= day);
  const spent = cents(calculateMonthlyExpenses(elapsed, month, year));
  const days = BigInt(new Date(Date.UTC(year, month, 0)).getUTCDate());
  return dollars((spent * days + BigInt(Math.floor(day / 2))) / BigInt(day));
}

/** Heuristic: at least three observations, stable amount (within 10%), and regular dates. */
export function detectRecurringTransactions(transactions: readonly Transaction[]): RecurringPattern[] {
  const groups = new Map<string, Transaction[]>();
  for (const t of transactions) {
    amount(t);
    const key = JSON.stringify([t.merchant.trim().toLowerCase(), t.account, t.category, t.type]);
    groups.set(key, [...(groups.get(key) ?? []), t]);
  }
  const patterns: RecurringPattern[] = [];
  for (const [key, rows] of [...groups].sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0)) {
    if (rows.length < 3) continue;
    const sorted = [...rows].sort((a, b) => a.date.getTime() - b.date.getTime());
    const values = sorted.map((t) => { const v = amount(t); return v < 0n ? -v : v; });
    const total = values.reduce((a, b) => a + b, 0n);
    const count = BigInt(values.length);
    if (total === 0n || values.some((v) => (v * count > total ? v * count - total : total - v * count) * 10n > total)) continue;
    const dates = sorted.map((t) => Date.UTC(t.date.getUTCFullYear(), t.date.getUTCMonth(), t.date.getUTCDate()) / 86400000);
    const gaps = dates.slice(1).map((d, i) => d - dates[i]);
    const monthlyCadence = sorted.slice(1).every((t, i) => {
      const prev = sorted[i].date;
      const delta = (t.date.getUTCFullYear() - prev.getUTCFullYear()) * 12 + t.date.getUTCMonth() - prev.getUTCMonth();
      return delta === 1 && Math.abs(t.date.getUTCDate() - prev.getUTCDate()) <= 3;
    });
    const monthCounts = new Map<string, number>();
    sorted.forEach((t) => {
      const m = `${t.date.getUTCFullYear()}-${t.date.getUTCMonth()}`;
      monthCounts.set(m, (monthCounts.get(m) ?? 0) + 1);
    });
    const semiMonthly = monthCounts.size >= 2 && [...monthCounts.values()].every((n) => n === 2) && gaps.every((g) => g >= 12 && g <= 19);
    const cadence = monthlyCadence ? 'monthly' : gaps.every((g) => g >= 6 && g <= 8) ? 'weekly' : semiMonthly ? 'semimonthly' : gaps.every((g) => g >= 13 && g <= 15) ? 'biweekly' : null;
    if (!cadence) continue;
    const [merchant, account, category, type] = JSON.parse(key) as string[];
    const average = (total + count / 2n) / count;
    patterns.push({ merchant, account, category, type, cadence, occurrences: rows.length, averageAmount: dollars(type === 'EXPENSE' ? -average : average) });
  }
  return patterns;
}

/** Largest discretionary category first; allocate only the requested cents. */
export function generateSavingsPlan(transactions: readonly Transaction[], targetAmount: number, month: number, year: number): SavingsPlan {
  const target = cents(targetAmount);
  if (target < 0n) throw new RangeError('Savings target must be nonnegative');
  let remaining = target;
  const recommendations: SavingsPlan['recommendations'] = [];
  const categories = findLargestSpendingCategories(monthly(transactions, month, year), Number.MAX_SAFE_INTEGER);
  for (const { category, amount: current } of categories) {
    if (!DISCRETIONARY.has(category) || remaining === 0n) continue;
    const available = cents(current);
    const savings = available < remaining ? available : remaining;
    if (savings === 0n) continue;
    recommendations.push({ category, current, recommended: dollars(available - savings), savings: dollars(savings) });
    remaining -= savings;
  }
  return { target: dollars(target), recommendations, totalSavings: dollars(target - remaining), shortfall: dollars(remaining), feasible: remaining === 0n, annualSavings: dollars((target - remaining) * 12n) };
}
