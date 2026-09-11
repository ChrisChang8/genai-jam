# Project Architecture — Detailed Structure

This document explains the repository structure, conventions, and rationale behind the folder organization.

---

## Folder Structure Overview

```
new_app/
├── app/                    # Next.js App Router pages and routes
├── components/             # React components (organized by feature)
├── lib/                    # Shared business logic and utilities
├── prisma/                 # Database schema and seed scripts
├── tests/                  # Unit and integration tests
├── public/                 # Static assets (images, icons, etc.)
├── docs/                   # Project documentation and design files
└── Configuration files
```

---

## Detailed Folder Breakdown

### `app/` — Next.js Pages & API Routes

The App Router structure mirrors the user-facing navigation:

```
app/
├── page.tsx                # Home page / Dashboard (/)
├── api/                    # Backend API routes
│   ├── transactions/
│   ├── insights/
│   ├── goals/
│   └── [resource]/
├── transactions/           # Transactions page (/transactions)
│   └── page.tsx
├── insights/               # Insights page (/insights)
│   └── page.tsx
├── goals/                  # Goals page (/goals)
│   └── page.tsx
├── layout.tsx              # Root layout (nav, theme, providers)
└── globals.css             # Global styles (Tailwind imports)
```

**Conventions:**
- Each page folder contains `page.tsx` for the route
- API routes under `api/` handle data fetching (queries, mutations)
- Shared layout logic in `layout.tsx`
- Page-specific logic stays in page components; reusable logic moves to `components/`

**Next Steps (Phase 2):**
- Implement `layout.tsx` with navigation, theme provider, error boundaries
- Create `page.tsx` for each main page (dashboard, transactions, insights, goals)
- Set up basic API routes for fetching transaction data

---

### `components/` — React Components (Feature-Organized)

Components are organized by feature/page domain, not by technical layer:

```
components/
├── dashboard/              # Dashboard-specific components
│   ├── SummaryCards.tsx    # Income, spending, savings cards
│   ├── SpendingChart.tsx   # Monthly spending trend
│   ├── CategoryBreakdown.tsx
│   └── RecentTransactions.tsx
│
├── transactions/           # Transactions page components
│   ├── TransactionTable.tsx
│   ├── TransactionFilters.tsx
│   ├── TransactionSearch.tsx
│   └── TransactionDetail.tsx
│
├── insights/               # Insights page components
│   ├── InsightCard.tsx
│   ├── SavingsOpportunity.tsx
│   ├── SpendingTrend.tsx
│   └── MonthComparison.tsx
│
├── goals/                  # Goals page components
│   ├── GoalCard.tsx
│   ├── GoalProgress.tsx
│   ├── GoalForm.tsx
│   └── GoalTimeline.tsx
│
├── copilot/                # AI Copilot components
│   ├── CopilotChat.tsx     # Chat interface
│   ├── CopilotPrompts.tsx  # Quick-prompt suggestions
│   ├── CopilotResponse.tsx # AI response display
│   └── FindMe500.tsx       # Savings plan feature
│
├── charts/                 # Data visualization (Recharts-based)
│   ├── LineChart.tsx
│   ├── BarChart.tsx
│   ├── PieChart.tsx
│   └── AreaChart.tsx
│
├── ui/                     # shadcn/ui and base components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Dialog.tsx
│   ├── Input.tsx
│   ├── Select.tsx
│   ├── Table.tsx
│   └── Badge.tsx
│
├── common/                 # Shared components used across features
│   ├── PageHeader.tsx      # Page title + navigation
│   ├── ErrorBoundary.tsx
│   ├── LoadingSpinner.tsx
│   └── EmptyState.tsx
│
└── providers/              # Context providers
    ├── ThemeProvider.tsx
    ├── ToastProvider.tsx
    └── DataProvider.tsx
```

**Conventions:**
- **Feature-first organization**: Group components by the user-facing feature they support
- **Naming**: PascalCase for component files (e.g., `SummaryCards.tsx`)
- **Imports**: Use path alias `@/components/` from `tsconfig.json`
- **Props**: Define component props as a separate `Props` interface
- **Exports**: One component per file (usually)

**Example Component Pattern:**
```typescript
import React from 'react';

interface SummaryCardsProps {
  income: number;
  spending: number;
  savings: number;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({
  income,
  spending,
  savings,
}) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Cards */}
    </div>
  );
};
```

**Next Steps (Phase 1):**
- Translate UI mockups from Google Stitch into React components
- Build dashboard layout and summary cards first
- Create transaction list component with mock data
- Implement navigation between pages

---

### `lib/` — Business Logic & Utilities

Non-UI code organized by domain:

```
lib/
├── finance/                # Core financial calculations
│   ├── calculations.ts     # Pure functions for finance logic
│   ├── categories.ts       # Category definitions and utilities
│   ├── validators.ts       # Input validation for amounts, dates
│   └── types.ts            # TypeScript types (Transaction, Budget, Goal)
│
├── ai/                     # LLM integration
│   ├── client.ts           # Initialize and call LLM API
│   ├── prompts.ts          # Prompt templates
│   └── types.ts            # AI response types
│
├── db/                     # Database utilities
│   ├── client.ts           # Prisma client instance
│   ├── queries.ts          # Reusable database queries
│   └── mutations.ts        # Reusable database mutations
│
└── validation/             # Zod schemas for runtime validation
    ├── transaction.ts      # Transaction input schemas
    ├── budget.ts           # Budget input schemas
    └── goal.ts             # Goal input schemas
```

#### `lib/finance/` — Financial Calculations (Critical)

This is the **heart** of the application. All financial calculations must be:
- **Pure functions** (no side effects)
- **Deterministic** (same input → same output, always)
- **Testable** (easy to unit test)
- **Well-commented** (explain the logic)

**Key Functions (Phase 5):**
```typescript
// Calculate monthly totals
function calculateMonthlyIncome(transactions: Transaction[]): number
function calculateMonthlyExpenses(transactions: Transaction[]): number
function calculateMonthlySavings(income: number, expenses: number): number
function calculateSavingsRate(savings: number, income: number): number

// Group and analyze
function groupSpendingByCategory(transactions: Transaction[]): CategorySpending[]
function compareMonthToMonth(transactions: Transaction[]): MonthlyComparison[]
function detectRecurringTransactions(transactions: Transaction[]): RecurringPattern[]

// Generate recommendations
function generateSavingsPlan(transactions: Transaction[], targetAmount: number): SavingsPlan
```

**Example Implementation Pattern:**
```typescript
/**
 * Calculate total spending for a given month.
 * Only includes transactions with type 'expense'.
 * @param transactions - Array of transactions
 * @param month - Month (1-12)
 * @param year - Year
 * @returns Total spending amount (positive number)
 */
export function calculateMonthlyExpenses(
  transactions: Transaction[],
  month: number,
  year: number
): number {
  return transactions
    .filter(
      (t) =>
        t.type === 'expense' &&
        t.date.getMonth() + 1 === month &&
        t.date.getFullYear() === year
    )
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
}
```

**Testing Finance Functions:**
```typescript
describe('calculateMonthlyExpenses', () => {
  it('should sum all expenses for a given month', () => {
    const transactions = [
      { amount: -100, type: 'expense', date: new Date('2026-09-15') },
      { amount: -50, type: 'expense', date: new Date('2026-09-20') },
      { amount: 5700, type: 'income', date: new Date('2026-09-01') },
    ];
    expect(calculateMonthlyExpenses(transactions, 9, 2026)).toBe(150);
  });
});
```

#### `lib/ai/` — LLM Integration

Handles communication with the AI service. Keeps prompt logic separate from response handling.

**Key Files:**
- `client.ts`: Initialize LLM client with API key, handle retries
- `prompts.ts`: Prompt templates for different use cases (spending explanation, savings plan, etc.)
- `types.ts`: TypeScript interfaces for AI responses

**Example Usage Pattern:**
```typescript
// In a page or API route
import { explainSpendingTrend } from '@/lib/ai/prompts';
import { callLLM } from '@/lib/ai/client';

const financialData = {
  monthlyIncome: 5700,
  monthlyExpenses: 3140,
  spendingByCategory: { dining: 620, transportation: 350, ... },
};

const prompt = explainSpendingTrend(financialData);
const explanation = await callLLM(prompt);
```

#### `lib/db/` — Database Utilities

Wraps Prisma client and exports reusable queries/mutations:

```typescript
// lib/db/queries.ts
export async function getTransactionsByMonth(month: number, year: number) {
  return prisma.transaction.findMany({
    where: {
      date: {
        gte: new Date(year, month - 1, 1),
        lt: new Date(year, month, 1),
      },
    },
  });
}

export async function getBudgetByCategory(category: string) {
  return prisma.budget.findUnique({
    where: { category },
  });
}
```

#### `lib/validation/` — Zod Schemas

Runtime validation for API requests and form inputs:

```typescript
// lib/validation/transaction.ts
import { z } from 'zod';

export const TransactionSchema = z.object({
  merchant: z.string().min(1),
  amount: z.number().finite(),
  date: z.coerce.date(),
  category: z.enum(['Housing', 'Food', 'Transportation', ...]),
  type: z.enum(['income', 'expense']),
  account: z.string(),
});

export type CreateTransactionInput = z.infer<typeof TransactionSchema>;
```

**Next Steps (Phases 3-5):**
- Define types in `lib/finance/types.ts`
- Implement pure calculation functions in `lib/finance/calculations.ts`
- Write comprehensive tests for finance logic
- Set up Prisma client and database queries
- Create Zod schemas for all inputs

---

### `prisma/` — Database Schema & Seeding

```
prisma/
├── schema.prisma           # Data model definition
├── seed.ts                 # Script to populate synthetic data
└── migrations/             # Auto-generated migration files
    └── [timestamp]_init/
        └── migration.sql
```

**`schema.prisma` Structure (Phase 3):**
```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Transaction {
  id        Int     @id @default(autoincrement())
  merchant  String
  amount    Decimal
  date      DateTime
  category  String
  type      String  // "income" or "expense"
  account   String
  createdAt DateTime @default(now())
}

model Budget {
  id            Int     @id @default(autoincrement())
  category      String  @unique
  monthlyLimit  Decimal
  createdAt     DateTime @default(now())
}

model Goal {
  id           Int      @id @default(autoincrement())
  name         String
  targetAmount Decimal
  currentAmount Decimal
  targetDate   DateTime
  createdAt    DateTime @default(now())
}
```

**`seed.ts` (Phase 4):**
Generate ~100-300 realistic synthetic transactions with patterns:
- Recurring payroll (2x/month)
- Fixed rent (monthly)
- Variable dining/shopping
- Subscriptions (monthly)
- Seasonal spikes

```bash
npm run db:seed
```

---

### `tests/` — Unit Tests

Test structure mirrors source code:

```
tests/
├── finance/
│   ├── calculations.test.ts
│   ├── categories.test.ts
│   └── validators.test.ts
├── setup.ts                # Test configuration and utilities
└── fixtures/
    └── transactions.fixture.ts  # Mock data for tests
```

**Testing Convention (Vitest):**
```typescript
import { describe, it, expect } from 'vitest';
import { calculateMonthlyExpenses } from '@/lib/finance/calculations';

describe('Finance Calculations', () => {
  describe('calculateMonthlyExpenses', () => {
    it('should return 0 for empty transaction list', () => {
      expect(calculateMonthlyExpenses([], 9, 2026)).toBe(0);
    });

    it('should only count expenses, not income', () => {
      // Test implementation
    });
  });
});
```

**Running Tests:**
```bash
npm run test          # Run all tests once
npm run test:watch   # Watch mode
npm run test:ui      # Vitest UI dashboard
```

---

### `public/` — Static Assets

Store images, icons, favicons, and other static files:

```
public/
├── favicon.ico
├── images/
│   ├── logo.png
│   └── hero.png
└── icons/
    └── (svg icons if not using Lucide)
```

---

### `docs/` — Project Documentation

```
docs/
├── ARCHITECTURE.md         # This file
├── design/                 # UI design references
│   ├── DESIGN.md          # Design system documentation
│   ├── mockups/
│   │   ├── overview_dashboard_minimal/
│   │   ├── transactions_minimal/
│   │   ├── goals_planning_minimal/
│   │   └── financial_insights_minimal/
│   └── understated_monochrome_mint/
│       └── (color palette and design tokens)
└── phases/
    └── ROADMAP.md         # 8-phase development plan
```

---

## Code Conventions

### TypeScript

- **Strict mode enabled** in `tsconfig.json`
- **Export explicit types** for all components and functions
- **Use interfaces for component props** (not just inline types)
- **Path aliases**: `@/components/`, `@/lib/`, etc. from `tsconfig.json`

### React Components

- **Functional components** only (hooks-based)
- **Component naming**: PascalCase files, e.g., `SummaryCards.tsx`
- **Props pattern**:
  ```typescript
  interface MyComponentProps {
    title: string;
    onAction?: () => void;
  }
  export const MyComponent: React.FC<MyComponentProps> = ({ title, onAction }) => {
    // ...
  };
  ```

### Transaction Amounts

- **Positive** for income (payroll: +5700)
- **Negative** for expenses (groceries: -83.42)
- **Always store as-is** in database; use `Math.abs()` when displaying

### Error Handling

- **API routes**: Return proper HTTP status codes (200, 400, 404, 500)
- **Frontend**: Display user-friendly error messages from error boundaries
- **Finance logic**: Return 0 or empty array for edge cases (no data) rather than throwing

### Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Components | PascalCase | `SummaryCards.tsx` |
| Functions | camelCase | `calculateMonthlyExpenses()` |
| Constants | UPPER_SNAKE_CASE | `SPENDING_CATEGORIES` |
| Types/Interfaces | PascalCase | `TransactionProps`, `Transaction` |
| Files | Same as export | `SummaryCards.tsx` exports `SummaryCards` |

---

## Git Conventions

### .gitignore

Exclude:
```
node_modules/
.next/
build/
dist/
prisma/dev.db
.env.local
.DS_Store
*.log
```

### Commit Messages

- Start with a verb: `Add`, `Fix`, `Update`, `Refactor`, `Remove`
- Reference the phase: `[Phase X] Add finance calculations`
- Example: `[Phase 5] Add calculateMonthlyExpenses function`

---

## Next Steps by Phase

1. **Phase 1**: Build UI components from Stitch design
2. **Phase 2**: Set up Next.js, Tailwind, shadcn/ui
3. **Phase 3**: Define Prisma schema
4. **Phase 4**: Implement seed data
5. **Phase 5**: Implement finance calculations
6. **Phase 6**: Connect UI to data
7. **Phase 7**: Build transaction filtering
8. **Phase 8**: Integrate AI explanations

---

## Useful Commands Summary

```bash
# Folder creation checklist (already done):
# ✓ app/, components/, lib/, prisma/, tests/, public/, docs/

# Database setup:
npm run db:generate     # Generate Prisma client
npm run db:migrate      # Create/update schema
npm run db:seed         # Populate synthetic data
npm run db:studio       # Open Prisma UI

# Development:
npm run dev             # Start Next.js dev server
npm run lint            # Run ESLint
npm run test            # Run Vitest
npm run build           # Production build

# Watch modes:
npm run test:watch      # Watch tests
npm run test:ui         # Vitest UI
```

---

## Questions?

- **Folder purposes**: Look at the relevant section above
- **Component patterns**: See the `components/` breakdown and example patterns
- **Finance logic**: Refer to `lib/finance/` section for calculation guidelines
- **ROADMAP**: See [ROADMAP.md](../ROADMAP.md) for phased development details
