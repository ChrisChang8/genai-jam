import { prisma } from '@/lib/db/client';
import { Transaction, Budget, Goal, Prisma } from '@prisma/client';

// ===== TRANSACTION MUTATIONS =====

/**
 * Create a new transaction
 */
export async function createTransaction(
  data: Prisma.TransactionCreateInput
): Promise<Transaction> {
  return prisma.transaction.create({
    data,
  });
}

/**
 * Update a transaction by ID
 */
export async function updateTransaction(
  id: number,
  data: Prisma.TransactionUpdateInput
): Promise<Transaction> {
  return prisma.transaction.update({
    where: { id },
    data,
  });
}

/**
 * Delete a transaction by ID
 */
export async function deleteTransaction(id: number): Promise<Transaction> {
  return prisma.transaction.delete({
    where: { id },
  });
}

// ===== BUDGET MUTATIONS =====

/**
 * Create a new budget
 */
export async function createBudget(
  data: Prisma.BudgetCreateInput
): Promise<Budget> {
  return prisma.budget.create({
    data,
  });
}

/**
 * Update a budget by ID
 */
export async function updateBudget(
  id: number,
  data: Prisma.BudgetUpdateInput
): Promise<Budget> {
  return prisma.budget.update({
    where: { id },
    data,
  });
}

/**
 * Delete a budget by ID
 */
export async function deleteBudget(id: number): Promise<Budget> {
  return prisma.budget.delete({
    where: { id },
  });
}

// ===== GOAL MUTATIONS =====

/**
 * Create a new goal
 */
export async function createGoal(
  data: Prisma.GoalCreateInput
): Promise<Goal> {
  return prisma.goal.create({
    data,
  });
}

/**
 * Update a goal by ID
 */
export async function updateGoal(
  id: number,
  data: Prisma.GoalUpdateInput
): Promise<Goal> {
  return prisma.goal.update({
    where: { id },
    data,
  });
}

/**
 * Delete a goal by ID
 */
export async function deleteGoal(id: number): Promise<Goal> {
  return prisma.goal.delete({
    where: { id },
  });
}
