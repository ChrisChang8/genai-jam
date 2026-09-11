import { prisma } from '@/lib/db/client';
import { Transaction, Budget, Goal } from '@prisma/client';

/**
 * Get all transactions for a specific month and year
 */
export async function getTransactionsByMonth(
  month: number,
  year: number
): Promise<Transaction[]> {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59);

  return prisma.transaction.findMany({
    where: {
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
    orderBy: { date: 'desc' },
  });
}

/**
 * Get all transactions in a specific category
 */
export async function getTransactionsByCategory(
  category: string
): Promise<Transaction[]> {
  return prisma.transaction.findMany({
    where: { category },
    orderBy: { date: 'desc' },
  });
}

/**
 * Get all transactions
 */
export async function getAllTransactions(): Promise<Transaction[]> {
  return prisma.transaction.findMany({
    orderBy: { date: 'desc' },
  });
}

/**
 * Get a single transaction by ID
 */
export async function getTransactionById(id: number): Promise<Transaction | null> {
  return prisma.transaction.findUnique({
    where: { id },
  });
}

/**
 * Get all budgets
 */
export async function getBudgets(): Promise<Budget[]> {
  return prisma.budget.findMany({
    orderBy: { category: 'asc' },
  });
}

/**
 * Get a budget by category
 */
export async function getBudgetByCategory(category: string): Promise<Budget | null> {
  return prisma.budget.findFirst({
    where: { category },
  });
}

/**
 * Get all goals
 */
export async function getGoals(): Promise<Goal[]> {
  return prisma.goal.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

/**
 * Get goals filtered by status
 */
export async function getGoalsByStatus(
  status: 'ACTIVE' | 'PAUSED' | 'COMPLETED'
): Promise<Goal[]> {
  return prisma.goal.findMany({
    where: { status },
    orderBy: { targetDate: 'asc' },
  });
}

/**
 * Get a single goal by ID
 */
export async function getGoalById(id: number): Promise<Goal | null> {
  return prisma.goal.findUnique({
    where: { id },
  });
}
