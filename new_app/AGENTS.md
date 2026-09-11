# AGENTS.md — Navigation Guide for Code Exploration

This guide is designed to help AI agents and developers quickly understand and navigate the AI Personal Finance Copilot codebase.

---

## Quick Repository Map

```
new_app/
├── app/                    # Next.js pages and API routes
├── components/             # React components (feature-organized)
├── lib/                    # Business logic and utilities
├── prisma/                 # Database schema and seeding
├── tests/                  # Unit tests (Vitest)
├── docs/                   # Documentation and design files
├── package.json            # Dependencies and npm scripts
├── tsconfig.json           # TypeScript configuration
├── .env.example            # Environment variable template
├── README.md               # Project overview and setup
└── ROADMAP.md              # 8-phase development plan
```

For detailed explanations of each folder, see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

---

## Key Entry Points by Task

### Starting a Development Session

1. Read [README.md](README.md) for quick start instructions
2. Review [docs/phases/ROADMAP.md](docs/phases/ROADMAP.md) to understand the current phase
3. Check [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for folder structure
4. Review the relevant phase section in ROADMAP.md for acceptance criteria

### Understanding the Application Flow

**User flow:**
1. User lands on Dashboard (app/page.tsx)
2. Views financial summary via components/dashboard/
3. Navigates to Transactions, Insights, or Goals via PageHeader.tsx
4. Asks Copilot a question (components/copilot/CopilotChat.tsx)
5. Receives AI-generated explanation based on calculated data

**Data flow:**
```
Transactions (Prisma/SQLite)
  ↓
lib/finance/ (pure calculation functions)
  ↓
app/api/ (API endpoints return calculated data)
  ↓
React components (display data + user interactions)
  ↓
lib/ai/ (prepare data for LLM)
  ↓
LLM API (generate explanations)
  ↓
components/copilot/ (display AI response)
```

### Finding Specific Code

**Financial calculations:**
- Location: [lib/finance/](lib/finance/)
- Key file: `lib/finance/calculations.ts`
- Examples: `calculateMonthlyExpenses()`, `generateSavingsPlan()`, `groupSpendingByCategory()`
- Tests: `tests/finance/calculations.test.ts`

**Component implementations:**
- Dashboard components: [components/dashboard/](components/dashboard/)
- Transaction list: [components/transactions/](components/transactions/)
- Insights/analysis: [components/insights/](components/insights/)
- Goals/savings: [components/goals/](components/goals/)
- AI chat: [components/copilot/](components/copilot/)
- Data charts: [components/charts/](components/charts/)
- UI building blocks: [components/ui/](components/ui/)

**Pages and routing:**
- Dashboard home: [app/page.tsx](app/page.tsx)
- Transactions page: [app/transactions/page.tsx](app/transactions/page.tsx)
- Insights page: [app/insights/page.tsx](app/insights/page.tsx)
- Goals page: [app/goals/page.tsx](app/goals/page.tsx)
- API routes: [app/api/](app/api/)

**Database and data access:**
- Schema definition: [prisma/schema.prisma](prisma/schema.prisma)
- Database queries: [lib/db/queries.ts](lib/db/queries.ts)
- Database mutations: [lib/db/mutations.ts](lib/db/mutations.ts)
- Seed data: [prisma/seed.ts](prisma/seed.ts)

**AI integration:**
- LLM client: [lib/ai/client.ts](lib/ai/client.ts)
- Prompt templates: [lib/ai/prompts.ts](lib/ai/prompts.ts)
- AI types: [lib/ai/types.ts](lib/ai/types.ts)

**Input validation:**
- Transaction validation: [lib/validation/transaction.ts](lib/validation/transaction.ts)
- Budget validation: [lib/validation/budget.ts](lib/validation/budget.ts)
- Goal validation: [lib/validation/goal.ts](lib/validation/goal.ts)

---

## Core Development Patterns

### Adding a New Financial Calculation

1. Define the function in `lib/finance/calculations.ts`:
   ```typescript
   export function calculateNewMetric(transactions: Transaction[]): number {
     // Pure function, no side effects
     // Return predictable result
   }
   ```

2. Write tests in `tests/finance/calculations.test.ts`:
   ```typescript
   describe('calculateNewMetric', () => {
     it('should correctly calculate the metric', () => {
       // Test implementation
     });
   });
   ```

3. Use in a component or API route:
   ```typescript
   import { calculateNewMetric } from '@/lib/finance/calculations';
   const result = calculateNewMetric(transactions);
   ```

4. Expose via API route (if needed) in `app/api/[resource].ts`

5. Display in a component, optionally with AI explanation

### Adding a New Page

1. Create folder under `app/your-page/`
2. Create `app/your-page/page.tsx`:
   ```typescript
   import { YourPageComponent } from '@/components/your-page/YourPage';
   
   export default function YourPage() {
     return <YourPageComponent />;
   }
   ```

3. Create components in `components/your-page/`:
   ```typescript
   interface YourPageProps {
     // Props definition
   }
   
   export const YourPageComponent: React.FC<YourPageProps> = (props) => {
     // Component implementation
   };
   ```

4. Add navigation link in [components/common/PageHeader.tsx](components/common/PageHeader.tsx)

### Adding a New UI Component

1. **From shadcn/ui:**
   ```bash
   npx shadcn-ui@latest add component-name
   ```
   This creates `components/ui/component-name.tsx`

2. **Custom component:**
   Create in `components/ui/CustomComponent.tsx`:
   ```typescript
   export const CustomComponent: React.FC<Props> = (props) => {
     return (/* JSX */);
   };
   ```

3. **Export and use:**
   ```typescript
   import { CustomComponent } from '@/components/ui/CustomComponent';
   ```

### Integrating with AI

1. Prepare financial data using `lib/finance/` calculations:
   ```typescript
   const monthlyAnalysis = {
     income: calculateMonthlyIncome(transactions),
     expenses: calculateMonthlyExpenses(transactions),
     categories: groupSpendingByCategory(transactions),
   };
   ```

2. Create a prompt template in `lib/ai/prompts.ts`:
   ```typescript
   export function explainSpending(data: FinancialData): string {
     return `Explain this spending pattern: ${JSON.stringify(data)}`;
   }
   ```

3. Call LLM in an API route or Server Action:
   ```typescript
   import { callLLM } from '@/lib/ai/client';
   import { explainSpending } from '@/lib/ai/prompts';
   
   const prompt = explainSpending(financialData);
   const response = await callLLM(prompt);
   ```

4. Display in a component:
   ```typescript
   import { CopilotResponse } from '@/components/copilot/CopilotResponse';
   
   <CopilotResponse explanation={response} />
   ```

### Adding a Database Model

1. Update `prisma/schema.prisma`:
   ```prisma
   model NewModel {
     id        Int     @id @default(autoincrement())
     name      String
     createdAt DateTime @default(now())
   }
   ```

2. Regenerate Prisma client:
   ```bash
   npm run db:generate
   ```

3. Create a migration:
   ```bash
   npm run db:migrate
   ```

4. Add queries to `lib/db/queries.ts`:
   ```typescript
   export async function getNewModel(id: number) {
     return prisma.newModel.findUnique({ where: { id } });
   }
   ```

5. Add mutations to `lib/db/mutations.ts`:
   ```typescript
   export async function createNewModel(data: CreateInput) {
     return prisma.newModel.create({ data });
   }
   ```

---

## Important Code Symbols to Know

### Financial Calculations (lib/finance/calculations.ts)

- `calculateMonthlyIncome(transactions, month, year): number`
- `calculateMonthlyExpenses(transactions, month, year): number`
- `calculateMonthlySavings(income, expenses): number`
- `calculateSavingsRate(savings, income): number`
- `groupSpendingByCategory(transactions): CategorySpending[]`
- `compareMonthToMonth(transactions): MonthlyComparison[]`
- `detectRecurringTransactions(transactions): RecurringPattern[]`
- `generateSavingsPlan(transactions, targetAmount): SavingsPlan`

### Key Data Types (lib/finance/types.ts)

```typescript
interface Transaction {
  id: number;
  merchant: string;
  amount: number;      // Positive: income, Negative: expense
  date: Date;
  category: string;
  type: 'income' | 'expense';
  account: string;
}

interface Budget {
  id: number;
  category: string;
  monthlyLimit: number;
}

interface Goal {
  id: number;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: Date;
}

interface SavingsPlan {
  target: number;
  categories: { category: string; savings: number }[];
}
```

### LLM Integration (lib/ai/)

- `callLLM(prompt: string): Promise<string>` — Main function to call the LLM
- `explainSpending(data): string` — Prompt template for spending explanations
- `generateSavingsRecommendation(data): string` — Prompt template for recommendations
- `LLMResponse` — Interface for typed AI responses

### Database Access (lib/db/)

- `prisma.transaction.findMany()` — Query transactions
- `prisma.budget.findUnique()` — Get a budget
- `prisma.goal.create()` — Create a goal
- `getTransactionsByMonth()` — Reusable query helper
- `createTransaction()` — Reusable mutation helper

### React Hooks & Context

- `PageHeader` — Navigation component (shows current page)
- `ThemeProvider` — Theme context (if light/dark mode is implemented)
- `DataProvider` — Global data fetching context (if implemented)

---

## Development Workflow by Phase

### Phase 0: Planning (Complete)
- Repository structure created
- Documentation in place
- Configuration files ready

**Next tasks:** Move to Phase 1

### Phase 1: Translate UI Mockups
- Implement React components from Google Stitch design
- Build dashboard layout
- Create navigation
- Use mock data initially

**Files to work on:**
- `components/dashboard/`
- `components/transactions/`
- `components/insights/`
- `components/goals/`
- `app/page.tsx`, `app/layout.tsx`

**Commands:**
```bash
npm run dev          # Test components in browser
npm run lint         # Check code quality
```

### Phase 2: Scaffold Application
- Set up Next.js configuration
- Configure Tailwind CSS
- Install and configure shadcn/ui
- Set up TypeScript strictness

**Files to work on:**
- `next.config.js` (create)
- `tailwind.config.js` (create)
- `tailwind.css` (create)

**Commands:**
```bash
npm install
npm run dev
npm run build
```

### Phase 3: Define Data Model
- Create Prisma schema
- Generate Prisma client
- Create initial migration

**Files to work on:**
- `prisma/schema.prisma`

**Commands:**
```bash
npm run db:generate
npm run db:migrate
```

### Phase 4: Generate Synthetic Data
- Implement seed script
- Populate realistic transaction data

**Files to work on:**
- `prisma/seed.ts`

**Commands:**
```bash
npm run db:seed
npm run db:studio  # Verify data in UI
```

### Phase 5: Build Finance Engine
- Implement all calculation functions
- Write comprehensive unit tests
- Document assumptions and edge cases

**Files to work on:**
- `lib/finance/calculations.ts`
- `lib/finance/types.ts`
- `tests/finance/calculations.test.ts`

**Commands:**
```bash
npm run test
npm run test:watch
npm run test:ui
```

### Phase 6: Connect Calculations to Dashboard
- Query data from database
- Call finance functions
- Display results in components
- Handle empty states and errors

**Files to work on:**
- `app/api/dashboard/route.ts` (create)
- `components/dashboard/*`
- `app/page.tsx`

**Commands:**
```bash
npm run dev
npm run test
```

### Phase 7: Build Transactions Experience
- Implement transaction list/table
- Add search and filtering
- Create transaction detail view
- Make responsive

**Files to work on:**
- `app/transactions/page.tsx`
- `components/transactions/TransactionTable.tsx`
- `components/transactions/TransactionFilters.tsx`

**Commands:**
```bash
npm run dev
npm run lint
```

### Phase 8: Add AI Copilot
- Implement LLM integration
- Create prompt templates
- Build copilot UI
- Test AI-generated explanations

**Files to work on:**
- `lib/ai/client.ts`
- `lib/ai/prompts.ts`
- `components/copilot/CopilotChat.tsx`
- `app/api/copilot/route.ts` (create)

**Commands:**
```bash
npm run dev
npm run test
```

---

## Testing Guide

### Running Tests

```bash
npm run test          # Run all tests once
npm run test:watch   # Watch mode for development
npm run test:ui      # Open Vitest UI dashboard
```

### Writing Tests for Finance Functions

```typescript
import { describe, it, expect } from 'vitest';
import { calculateMonthlyExpenses } from '@/lib/finance/calculations';

describe('Finance: calculateMonthlyExpenses', () => {
  it('should sum all expense amounts for the given month', () => {
    const transactions = [
      { amount: -100, type: 'expense', date: new Date('2026-09-15') },
      { amount: -50, type: 'expense', date: new Date('2026-09-20') },
      { amount: 5700, type: 'income', date: new Date('2026-09-01') },
    ];
    
    const result = calculateMonthlyExpenses(transactions, 9, 2026);
    expect(result).toBe(150);
  });

  it('should return 0 if no transactions exist for the month', () => {
    expect(calculateMonthlyExpenses([], 9, 2026)).toBe(0);
  });
});
```

### Test File Locations

- Finance calculations: `tests/finance/calculations.test.ts`
- Validation schemas: `tests/validation/schemas.test.ts`
- Database queries: `tests/db/queries.test.ts` (if needed)

---

## Code Conventions

### TypeScript

- Use `interface` for component props and types
- Use `type` for union types and primitives
- Enable strict mode (enforced in tsconfig.json)
- Export explicit types from all modules

Example:
```typescript
interface TransactionProps {
  transaction: Transaction;
  onEdit?: (id: number) => void;
}

export const TransactionRow: React.FC<TransactionProps> = (props) => {
  // Component
};
```

### React Components

- Functional components only (hooks-based)
- PascalCase file names: `MyComponent.tsx`
- Define props as separate interface
- Use `React.FC<Props>` type annotation

Example:
```typescript
interface CardProps {
  title: string;
  value: number | string;
}

export const Card: React.FC<CardProps> = ({ title, value }) => {
  return (
    <div className="p-4 border rounded">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
};
```

### Function Naming

- Calculations: `calculateX`, `computeX`, `getX`
- Getters: `getX`, `fetchX`, `queryX`
- Setters/Mutations: `createX`, `updateX`, `deleteX`, `setX`
- Validators: `validateX`, `isValid`
- Transformers: `formatX`, `parseX`, `transformX`

Examples:
```typescript
calculateMonthlyExpenses()    // Calculation
getTransactionsByMonth()       // Query
createTransaction()            // Mutation
validateTransactionDate()      // Validation
formatCurrencyAmount()         // Formatting
```

### Transaction Amounts

Important: Always use consistent sign convention:
- **Positive** for income: `+5700`
- **Negative** for expenses: `-83.42`

Always store as-is in database. Use `Math.abs()` when displaying as expense.

### Imports

Use path aliases from `tsconfig.json`:
```typescript
// Good
import { calculateMonthlyExpenses } from '@/lib/finance/calculations';
import { SummaryCards } from '@/components/dashboard/SummaryCards';

// Avoid
import { calculateMonthlyExpenses } from '../../../../lib/finance/calculations';
```

---

## Common Tasks Reference

### Task: Add a New Spending Category

1. Update category enum in `lib/finance/types.ts`
2. Update seed data in `prisma/seed.ts` to include category
3. Update tests in `tests/finance/calculations.test.ts`
4. Update UI category selector in `components/`

### Task: Change the Savings Goal Target

1. Update `generateSavingsPlan()` function in `lib/finance/calculations.ts`
2. Update tests in `tests/finance/calculations.test.ts`
3. Update AI prompt in `lib/ai/prompts.ts` to reference new target
4. Update component display in `components/copilot/FindMe500.tsx`

### Task: Add Input Validation to an API Route

1. Define Zod schema in `lib/validation/`
2. Use `.parse()` or `.safeParse()` in the API route:
   ```typescript
   import { TransactionSchema } from '@/lib/validation/transaction';
   
   const validData = TransactionSchema.parse(req.body);
   // or
   const result = TransactionSchema.safeParse(req.body);
   if (!result.success) return res.status(400).json(result.error);
   ```

### Task: Query Recent Transactions

1. Use a database query helper:
   ```typescript
   import { getRecentTransactions } from '@/lib/db/queries';
   
   const transactions = await getRecentTransactions(limit: 10);
   ```

2. Or write a raw query:
   ```typescript
   import { prisma } from '@/lib/db/client';
   
   const transactions = await prisma.transaction.findMany({
     orderBy: { date: 'desc' },
     take: 10,
   });
   ```

### Task: Debug a Calculation

1. Add console logs in the calculation function
2. Add test cases to reproduce the issue
3. Check the test output with `npm run test:watch`
4. Verify the logic step-by-step in the test

### Task: Run the Application Locally

1. Install dependencies: `npm install`
2. Set up environment: `cp .env.example .env.local` + add LLM API key
3. Initialize database: `npm run db:generate && npm run db:migrate && npm run db:seed`
4. Start dev server: `npm run dev`
5. Open http://localhost:3000 in browser

---

## Troubleshooting

### "Prisma schema is out of sync with database"

Run migrations:
```bash
npm run db:migrate
```

### "Cannot find module '@/lib/...'"

Verify path alias in `tsconfig.json` and ensure the file exists.

### "LLM API key not found"

Check `.env.local` and ensure `LLM_API_KEY` is set:
```bash
echo $env:LLM_API_KEY  # PowerShell
echo $LLM_API_KEY      # Bash
```

### Tests failing unexpectedly

1. Clear cache: Delete `node_modules/.vite`
2. Reinstall: `npm install`
3. Run tests: `npm run test`

### Component not rendering

1. Check browser console for errors
2. Verify component is exported from `page.tsx`
3. Check props are passed correctly
4. Verify Tailwind CSS is configured

---

## Documentation References

- [README.md](README.md) — Setup instructions and quick start
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — Detailed folder structure and patterns
- [docs/phases/ROADMAP.md](docs/phases/ROADMAP.md) — 8-phase development plan with acceptance criteria
- [docs/design/DESIGN.md](docs/design/DESIGN.md) — Design system and UI tokens
- [.env.example](.env.example) — Environment variable reference

---

## Next Steps

1. **If starting a new feature:** Find the relevant phase in docs/phases/ROADMAP.md and the corresponding section in this guide
2. **If debugging code:** Use "Finding Specific Code" section above to locate the relevant files
3. **If unsure about a pattern:** Check "Core Development Patterns" section for examples
4. **If building tests:** Reference "Testing Guide" section for structure and examples

Happy coding!
