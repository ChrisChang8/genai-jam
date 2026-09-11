import { PrismaClient } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

/**
 * Merchant directory for realistic transaction generation.
 */
const merchants = {
  FOOD_AND_DINING: [
    'Chipotle Mexican Grill',
    'Sweetgreen',
    'Panera Bread',
    'Olive Garden',
    'Starbucks',
    'Subway',
    'Whole Foods Market',
    'Trader Joe\'s',
    'Target',
    'Kroger',
  ],
  TRANSPORTATION: [
    'Shell Oil',
    'Chevron',
    'BP Gas Station',
    'Uber Technologies',
    'Lyft',
    'Tesla Supercharger',
  ],
  SHOPPING: [
    'Target',
    'Walmart',
    'Amazon',
    'Best Buy',
    'Home Depot',
    'Costco Wholesale',
    'Nike',
  ],
  ENTERTAINMENT: [
    'Netflix Premium',
    'Spotify Premium',
    'AMC Theaters',
    'Regal Cinemas',
    'Concert Ticket Master',
    'Hulu',
  ],
  SUBSCRIPTIONS: [
    'Netflix Premium',
    'Spotify Premium',
    'Equinox Fitness',
    'Adobe Creative Cloud',
    'Microsoft 365',
    'Disney+',
    'Gym Membership',
  ],
  HOUSING: ['Rent Payment', 'Property Management'],
  INCOME: ['Salary Deposit', 'Payroll', 'Freelance Income'],
};

const accounts = [
  'Chase Sapphire ··4821',
  'Apple Card ··1092',
  'Fidelity Checking ··9301',
  'Wells Fargo Debit ··5567',
];

/**
 * Helper: Generate random amount with 2 decimal places
 */
function randomAmount(min: number, max: number): Decimal {
  const amount = Math.random() * (max - min) + min;
  return new Decimal(parseFloat(amount.toFixed(2)));
}

/**
 * Helper: Pick random element from array
 */
function randomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Helper: Generate date in range [startDate, endDate]
 */
function randomDateBetween(startDate: Date, endDate: Date): Date {
  const time = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
  return new Date(time);
}

/**
 * Helper: Generate specific date in a month (e.g., day 9 of each month)
 */
function dateOnDayOfMonth(year: number, month: number, day: number): Date {
  return new Date(year, month - 1, day);
}

/**
 * Generate biweekly payroll transactions (income)
 */
async function seedPayroll() {
  const transactions = [];

  // Sept, Oct, Nov 2026
  for (let month = 9; month <= 11; month++) {
    // Two payroll deposits per month (~9th and 24th)
    for (const day of [9, 24]) {
      transactions.push({
        merchant: 'Salary Deposit',
        amount: new Decimal('2850.00'),
        date: dateOnDayOfMonth(2026, month, day),
        category: 'INCOME',
        type: 'INCOME',
        account: randomElement(accounts),
        description: 'Biweekly payroll deposit',
        isRecurring: true,
      });
    }
  }

  return transactions;
}

/**
 * Generate monthly rent transactions
 */
async function seedRent() {
  const transactions = [];

  for (let month = 9; month <= 11; month++) {
    transactions.push({
      merchant: 'Rent Payment',
      amount: new Decimal('-1500.00'),
      date: dateOnDayOfMonth(2026, month, 1),
      category: 'HOUSING',
      type: 'EXPENSE',
      account: randomElement(accounts),
      description: 'Monthly rent payment',
      isRecurring: true,
    });
  }

  return transactions;
}

/**
 * Generate recurring subscription transactions
 */
async function seedSubscriptions() {
  const subscriptions = [
    { merchant: 'Netflix Premium', amount: -19.99 },
    { merchant: 'Spotify Premium', amount: -12.99 },
    { merchant: 'Equinox Fitness', amount: -260.0 },
    { merchant: 'Adobe Creative Cloud', amount: -54.99 },
  ];

  const transactions = [];

  for (let month = 9; month <= 11; month++) {
    for (const sub of subscriptions) {
      // Subscriptions on 7th of each month
      transactions.push({
        merchant: sub.merchant,
        amount: new Decimal(sub.amount.toFixed(2)),
        date: dateOnDayOfMonth(2026, month, 7),
        category: 'SUBSCRIPTIONS',
        type: 'EXPENSE',
        account: randomElement(accounts),
        description: 'Monthly subscription',
        isRecurring: true,
      });
    }
  }

  return transactions;
}

/**
 * Generate fuel/transportation transactions
 */
async function seedFuel() {
  const transactions = [];
  const startDate = new Date(2026, 8, 1); // Sept 1
  const endDate = new Date(2026, 10, 30); // Nov 30

  // ~4-5 fuel purchases per month = ~14 total
  for (let i = 0; i < 14; i++) {
    transactions.push({
      merchant: randomElement(merchants.TRANSPORTATION),
      amount: new Decimal(randomAmount(-60, -45).toString()),
      date: randomDateBetween(startDate, endDate),
      category: 'TRANSPORTATION',
      type: 'EXPENSE',
      account: randomElement(accounts),
      description: 'Fuel purchase',
      isRecurring: false,
    });
  }

  return transactions;
}

/**
 * Generate dining/food transactions
 */
async function seedDining() {
  const transactions = [];
  const startDate = new Date(2026, 8, 1);
  const endDate = new Date(2026, 10, 30);

  // ~2-4 times per week = ~30-40 transactions over 3 months
  for (let i = 0; i < 35; i++) {
    transactions.push({
      merchant: randomElement(merchants.FOOD_AND_DINING),
      amount: new Decimal(randomAmount(-45, -10).toString()),
      date: randomDateBetween(startDate, endDate),
      category: 'FOOD_AND_DINING',
      type: 'EXPENSE',
      account: randomElement(accounts),
      description: 'Dining transaction',
      isRecurring: false,
    });
  }

  return transactions;
}

/**
 * Generate shopping transactions
 */
async function seedShopping() {
  const transactions = [];
  const startDate = new Date(2026, 8, 1);
  const endDate = new Date(2026, 10, 30);

  // ~1-2 per week = ~12-18 transactions over 3 months
  for (let i = 0; i < 16; i++) {
    transactions.push({
      merchant: randomElement(merchants.SHOPPING),
      amount: new Decimal(randomAmount(-150, -20).toString()),
      date: randomDateBetween(startDate, endDate),
      category: 'SHOPPING',
      type: 'EXPENSE',
      account: randomElement(accounts),
      description: 'Retail shopping',
      isRecurring: false,
    });
  }

  return transactions;
}

/**
 * Generate entertainment transactions
 */
async function seedEntertainment() {
  const transactions = [];
  const startDate = new Date(2026, 8, 1);
  const endDate = new Date(2026, 10, 30);

  // ~1-2 per week on weekends = ~8-12 transactions
  for (let i = 0; i < 10; i++) {
    transactions.push({
      merchant: randomElement(merchants.ENTERTAINMENT),
      amount: new Decimal(randomAmount(-80, -10).toString()),
      date: randomDateBetween(startDate, endDate),
      category: 'ENTERTAINMENT',
      type: 'EXPENSE',
      account: randomElement(accounts),
      description: 'Entertainment expense',
      isRecurring: false,
    });
  }

  return transactions;
}

/**
 * Seed all transactions
 */
async function seedTransactions() {
  const allTransactions = [
    ...(await seedPayroll()),
    ...(await seedRent()),
    ...(await seedSubscriptions()),
    ...(await seedFuel()),
    ...(await seedDining()),
    ...(await seedShopping()),
    ...(await seedEntertainment()),
  ];

  console.log(`📊 Seeding ${allTransactions.length} transactions...`);

  for (const tx of allTransactions) {
    await prisma.transaction.create({
      data: tx,
    });
  }

  console.log(`✅ Created ${allTransactions.length} transactions`);
  return allTransactions.length;
}

/**
 * Seed default budgets
 */
async function seedBudgets() {
  const budgets = [
    { category: 'FOOD_AND_DINING', monthlyLimit: new Decimal('500.00') },
    { category: 'TRANSPORTATION', monthlyLimit: new Decimal('300.00') },
    { category: 'SHOPPING', monthlyLimit: new Decimal('400.00') },
    { category: 'ENTERTAINMENT', monthlyLimit: new Decimal('200.00') },
    { category: 'SUBSCRIPTIONS', monthlyLimit: new Decimal('350.00') },
    { category: 'HOUSING', monthlyLimit: new Decimal('1500.00') },
  ];

  console.log(`💰 Seeding ${budgets.length} budgets...`);

  for (const budget of budgets) {
    await prisma.budget.upsert({
      where: { category: budget.category },
      update: { monthlyLimit: budget.monthlyLimit },
      create: budget,
    });
  }

  console.log(`✅ Created/updated ${budgets.length} budgets`);
  return budgets.length;
}

/**
 * Seed sample goals
 */
async function seedGoals() {
  const goals = [
    {
      name: 'Emergency Fund',
      description: 'Build 6 months of living expenses as emergency savings',
      targetAmount: new Decimal('15000.00'),
      currentAmount: new Decimal('4500.00'),
      targetDate: new Date(2027, 8, 30), // Sept 2027
      priority: 'HIGH',
      status: 'ACTIVE',
    },
    {
      name: 'Vacation Fund',
      description: 'Save for a week-long vacation to Europe',
      targetAmount: new Decimal('5000.00'),
      currentAmount: new Decimal('1200.00'),
      targetDate: new Date(2027, 5, 30), // June 2027
      priority: 'MEDIUM',
      status: 'ACTIVE',
    },
  ];

  console.log(`🎯 Seeding ${goals.length} goals...`);

  for (const goal of goals) {
    await prisma.goal.create({
      data: goal,
    });
  }

  console.log(`✅ Created ${goals.length} goals`);
  return goals.length;
}

/**
 * Main seeding orchestration
 */
async function main() {
  try {
    console.log('\n🌱 Starting database seed...\n');

    // Clear existing data to allow re-seeding
    console.log('🧹 Clearing existing data...');
    await prisma.transaction.deleteMany();
    await prisma.budget.deleteMany();
    await prisma.goal.deleteMany();
    console.log('✅ Data cleared\n');

    // Seed data
    const txCount = await seedTransactions();
    const budgetCount = await seedBudgets();
    const goalCount = await seedGoals();

    console.log(`\n📈 Seed summary:`);
    console.log(`   Transactions: ${txCount}`);
    console.log(`   Budgets: ${budgetCount}`);
    console.log(`   Goals: ${goalCount}`);
    console.log(`\n✨ Database seeded successfully!\n`);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
