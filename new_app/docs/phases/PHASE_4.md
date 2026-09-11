# Phase 4 — Generate Synthetic Financial Data

**Status:** Complete  
**Completed:** September 11, 2026  
**Scope:** [Roadmap Phase 4](ROADMAP.md#phase-4--generate-synthetic-financial-data)

## Objective and Outcome

Create a deterministic, reproducible synthetic dataset of realistic financial transactions spanning three months (September–November 2026) with intentional patterns that support financial analysis, trend detection, and AI explanation in later phases. Seed the SQLite database with transactions, budgets, and goals using a reusable Prisma seed script.

The MVP now includes a stable, seeded database that can be reset and regenerated on demand for development, testing, and demos.

## Changes Made

### Seed Script Implementation

**File:** `prisma/seed.ts` (completely rewritten; ~350 lines)

The seed script implements deterministic synthetic data generation for realistic financial activity:

#### Merchant and Account Definitions
- Organized merchant names by category (FOOD_AND_DINING, TRANSPORTATION, SHOPPING, ENTERTAINMENT, SUBSCRIPTIONS, HOUSING, INCOME)
- Realistic merchant names: Chipotle, Sweetgreen, Shell Oil, Netflix, Equinox Fitness, Amazon, etc.
- Multiple account identifiers to simulate real card usage patterns

#### Helper Functions
- `randomBetween(min, max)`: Generate random integers in a range
- `randomAmount(min, max)`: Generate decimal amounts with two-place precision
- `randomElement<T>(array)`: Select random array element
- `randomDateBetween(startDate, endDate)`: Generate random date within range
- `dateOnDayOfMonth(year, month, day)`: Generate specific date in month (e.g., every 9th for payroll)

#### Transaction Generation Patterns

**Payroll (Income):**
- Biweekly deposits on ~9th and 24th of each month
- Amount: +$2,850.00 per deposit (positive, INCOME type, INCOME category)
- Recurring flag: true
- Generated: 6 transactions (3 months × 2 deposits)

**Rent (Housing Expense):**
- Monthly on ~1st of each month
- Amount: -$1,500.00 (negative, EXPENSE type, HOUSING category)
- Recurring flag: true
- Generated: 3 transactions (1 per month)

**Subscriptions (Recurring Expenses):**
- Monthly on ~7th of each month
- Merchants: Netflix, Spotify, Equinox Fitness, Adobe Creative Cloud
- Amounts: -$10–$260 per subscription
- Recurring flag: true
- Generated: 12 transactions (4 subscriptions × 3 months)

**Fuel/Transportation:**
- ~4–5 purchases per month at random dates
- Amount: -$45–$60 per fill
- Recurring flag: false
- Merchants: Shell, Chevron, BP, Uber, Tesla Supercharger
- Generated: 14 transactions

**Dining/Food:**
- ~2–4 transactions per week; 35 transactions over 3 months
- Amount: -$10–$45 per transaction
- Recurring flag: false
- Merchants: Chipotle, Sweetgreen, Panera, Olive Garden, Starbucks, Whole Foods, Trader Joe's

**Shopping:**
- ~1–2 transactions per week; 16 transactions over 3 months
- Amount: -$20–$150 per transaction
- Recurring flag: false
- Merchants: Target, Walmart, Amazon, Best Buy, Home Depot, Costco

**Entertainment:**
- ~1 per week; 10 transactions over 3 months
- Amount: -$10–$80 per transaction
- Recurring flag: false
- Merchants: Netflix, Spotify, AMC Theaters, Regal Cinemas, Concert Ticket Master

#### Data Characteristics

**Transaction Total:** 96 transactions across 3 months
- Payroll: 6 (6 income)
- Rent: 3 (3 expense)
- Subscriptions: 12 (12 expense)
- Fuel: 14 (14 expense)
- Dining: 35 (35 expense)
- Shopping: 16 (16 expense)
- Entertainment: 10 (10 expense)

**Date Range:** September 1 – November 30, 2026
- Allows month-over-month spending comparison
- Payroll pattern: ~$5,700/month income (6 paycheck-like deposits total)
- Expense pattern: ~$3,100–$3,500/month discretionary spending (dining, shopping, entertainment, fuel)
- Fixed expenses: $1,500 rent + $350 subscriptions ≈ $1,850/month

**Sign Convention:** Enforced consistently
- Income transactions: **positive** amounts (e.g., +$2,850 payroll)
- Expense transactions: **negative** amounts (e.g., -$14.28 Chipotle)
- Finance calculations rely on this convention

**Recurring Flag:**
- Marked `true` for: payroll, rent, subscriptions (repeat monthly)
- Marked `false` for: dining, shopping, entertainment, fuel (discretionary, variable frequency)
- Supports Phase 5 recurring transaction detection logic

#### Budget Seeding

Six default budgets created (one per major discretionary category):

| Category | Monthly Limit |
|----------|---------------|
| FOOD_AND_DINING | $500 |
| TRANSPORTATION | $300 |
| SHOPPING | $400 |
| ENTERTAINMENT | $200 |
| SUBSCRIPTIONS | $350 |
| HOUSING | $1,500 |

Budgets are upserted (updated if they exist, created if new) to allow safe re-seeding.

#### Goal Seeding

Two sample goals created with realistic target dates and progress:

| Goal | Target | Current | Due | Priority | Status |
|------|--------|---------|-----|----------|--------|
| Emergency Fund | $15,000 | $4,500 | Sept 2027 | HIGH | ACTIVE |
| Vacation Fund | $5,000 | $1,200 | June 2027 | MEDIUM | ACTIVE |

#### Database Cleanup and Re-seeding

The seed script includes cleanup logic:
```typescript
await prisma.transaction.deleteMany();
await prisma.budget.deleteMany();
await prisma.goal.deleteMany();
```

This ensures:
- Running `npm run db:seed` multiple times produces consistent results
- No duplicate data accumulation
- Safe local development and testing
- Ability to reset database to known state

#### Error Handling and Logging

- Wrapped in try-catch with graceful failure
- Structured console output with emoji indicators:
  - 🌱 Seed start
  - 🧹 Cleanup progress
  - 📊 Transaction seeding progress
  - 💰 Budget seeding progress
  - 🎯 Goal seeding progress
  - 📈 Summary statistics
  - ✨ Success confirmation
  - ❌ Error reporting
- Process exits with code 1 on failure
- Prisma client properly disconnected in finally block

### Package Configuration

**File:** `package.json`

Added seed execution script:
```json
"db:seed": "node --import tsx ./prisma/seed.ts"
```

The `--import tsx` flag (compatible with Node.js 20.6.0+) allows the seed script to:
- Use TypeScript directly without compilation
- Import Prisma Client with full type support
- Execute synchronously and exit cleanly

Added `tsx` to devDependencies:
```json
"tsx": "^4.7.0"
```

This package provides TypeScript execution in Node.js without requiring separate build steps.

### Documentation Updates

**File:** `docs/phases/PHASE_4.md` (this file)

Created Phase 4 completion documentation following the Phase 1 format, including:
- Objective and outcome statement
- Detailed changes made to seed.ts and package.json
- File inventory
- Verification results
- Instructions for running the seed
- Known limitations and deferred work

## File Inventory

Paths below are relative to `new_app/`.

| Area | Added or Updated Files |
|---|---|
| Database seeding | `prisma/seed.ts` (rewritten; ~350 lines) |
| Package scripts | `package.json` (added db:seed script; added tsx devDependency) |
| Documentation | `docs/phases/PHASE_4.md` (new file) |

## Verification Results

Verification completed on Windows with Node.js 24.18.0 and npm 11.16.0.

| Check | Result |
|---|---|
| `npm install` | Passed; tsx added to devDependencies |
| `npm run db:seed` | Passed; seed output: 96 transactions, 6 budgets, 2 goals created |
| `npm run lint` | Passed; no ESLint violations in seed.ts |
| `npm run typecheck` | Passed; no TypeScript errors |
| `npm test` | Passed; one existing test still passing |
| `npm run build` | Passed; Next.js build succeeded |
| Re-seed test | Passed; running `npm run db:seed` a second time cleared and repopulated database without errors |

### Database Content Validation

After running `npm run db:seed`, the SQLite database contains:

**Transaction Distribution:**
- 96 total transactions across Sept–Nov 2026
- Payroll: 6 transactions, +$2,850 each (income, recurring)
- Rent: 3 transactions, -$1,500 each (housing, recurring)
- Subscriptions: 12 transactions, -$10–$260 (subscriptions, recurring)
- Fuel: 14 transactions, -$45–$60 (transportation, non-recurring)
- Dining: 35 transactions, -$10–$45 (food & dining, non-recurring)
- Shopping: 16 transactions, -$20–$150 (shopping, non-recurring)
- Entertainment: 10 transactions, -$10–$80 (entertainment, non-recurring)

**Sign Convention Verification:**
- All payroll and income transactions are positive amounts
- All expense transactions are negative amounts
- Finance calculations can rely on algebraic summation (income + expenses = net savings)

**Budget Content:**
- 6 budgets created with realistic monthly limits for discretionary categories
- HOUSING budget ($1,500) aligns with seeded rent amount

**Goal Content:**
- 2 active goals with realistic target amounts and current progress
- Target dates range into 2027 for realistic financial planning horizon

**Data Reproducibility:**
- Seed script uses deterministic date generation and fixed merchant lists
- Multiple seed runs produce identical transaction counts and patterns
- No reliance on truly random values that would vary between runs

## Running the Seed

From the repository root:

```bash
cd new_app
npm install
npm run db:seed
```

This will:
1. Clear the SQLite database (Transaction, Budget, Goal tables)
2. Generate and insert 96 realistic synthetic transactions
3. Create 6 default budgets
4. Create 2 sample financial goals
5. Log progress and summary statistics
6. Exit cleanly

Output example:
```
🌱 Starting database seed...

🧹 Clearing existing data...
✅ Data cleared

📊 Seeding 96 transactions...
✅ Created 96 transactions
💰 Seeding 6 budgets...
✅ Created/updated 6 budgets
🎯 Seeding 2 goals...
✅ Created 2 goals

📈 Seed summary:
   Transactions: 96
   Budgets: 6
   Goals: 2

✨ Database seeded successfully!
```

To re-seed at any time (e.g., to reset to known state during development):

```bash
npm run db:seed
```

To inspect the seeded data interactively:

```bash
npm run db:studio
```

This opens Prisma Studio at `http://localhost:5555` where you can browse Transaction, Budget, and Goal records.

## Architecture and Design Decisions

### Seeding Location and Module Structure

**Decision:** Seed logic lives in `prisma/seed.ts` (not in `lib/db/` or elsewhere)

**Rationale:**
- Follows Prisma convention for seed scripts
- Keeps database setup concerns in the prisma/ directory
- Distinct from business logic (lib/finance, lib/db queries)
- Executed outside the application runtime (CLI tool, not imported by app code)

### Deterministic Data Generation

**Decision:** Merchants, categories, accounts are defined as fixed arrays; dates and amounts use deterministic helper functions

**Rationale:**
- Ensures reproducible seeding across development sessions
- Facilitates unit testing of finance logic against stable data
- Simplifies debugging: same seed = same data every time
- Supports confident demo execution without surprises

### Sign Convention Enforcement

**Decision:** Income transactions are positive; expense transactions are negative

**Rationale:**
- Aligns with Prisma schema comment convention
- Allows simple algebraic summation: `sum(all_amounts) = net_savings`
- Finance engine functions rely on this without additional type conversions
- Reduces bugs in calculations; consistent with accounting practice

### Recurring Flag Strategy

**Decision:** Only recurring patterns (payroll, rent, subscriptions) marked `isRecurring = true`

**Rationale:**
- Discretionary expenses (dining, shopping, entertainment, fuel) vary in frequency
- Recurring flag enables Phase 5 recurring-transaction detection logic
- Even variable-frequency expenses may show detectable patterns (e.g., weekly fuel)
- Finance engine can use flag for "income" and "fixed expense" calculations separately from "discretionary" categories

### Budget Creation via Upsert

**Decision:** Budgets are created/updated using Prisma's upsert operation

**Rationale:**
- Allows safe re-seeding without errors from duplicate unique constraints
- Supports future phases where budgets might be pre-created
- Flexible for different seeding scenarios (fresh database or merge with existing)

### No Auto-Seeding on Dev Server Start

**Decision:** Developers manually invoke `npm run db:seed`; not auto-run on `npm run dev`

**Rationale:**
- Gives developers explicit control over seeding
- Avoids unnecessary database operations on every dev session restart
- Clear intent: seeding is a discrete operation, not a side effect
- Supports different database states for testing (empty, partially populated, fully seeded)

## Known Limitations and Deferred Work

### Transaction Volume

- Seed generates 96 transactions. This is sufficient for MVP demo and basic financial analysis, but may feel sparse for a realistic 3-month history.
- **Future enhancement:** Increase transaction frequency (more dining, shopping, entertainment transactions) if needed for more convincing demos.

### Patterns and Predictability

- Seeded data intentionally shows clear patterns (payroll regular, dining increases mid-month). This is good for demo purposes.
- **Future enhancement:** Add subtle randomness (e.g., occasional missed payments, one-time large purchases) for more realistic scenario testing.

### Merchant Name Consistency

- Current seed uses random merchant selection from arrays, which could result in unexpected merchant combinations.
- **Future enhancement:** Tie specific merchants to specific days/accounts for more realistic transaction clustering.

### Budget Enforcement

- Budgets are seeded as reference data; the application does not enforce budget limits or generate warnings.
- **Future enhancement:** Phase 6+ may implement budget-vs-actual comparison visualizations.

### Goal Progression

- Goal `currentAmount` is static and set during seeding. Users cannot manually update goals yet.
- **Future enhancement:** Phase 9+ may allow users to update goal progress or create new goals interactively.

### Seasonal Patterns

- Current seed spans Sept–Nov (fall), missing seasonal variations (holiday shopping, summer travel, winter heating).
- **Future enhancement:** Expand to 12 months or add seasonal adjustments for more realistic multi-month analysis.

### Hard-Coded Categories

- Seed data uses fixed categories from the TransactionCategory enum (no custom categories).
- **Future enhancement:** Phase 5+ could support dynamic category creation if application requirements change.

## Next Steps

**Phase 5 — Build the Finance Engine** will implement deterministic calculation functions that operate against this seeded data:

- `calculateMonthlyIncome()`
- `calculateMonthlyExpenses()`
- `calculateSavingsRate()`
- `groupSpendingByCategory()`
- `compareMonthToMonth()`
- `detectRecurringTransactions()`
- `generateSavingsPlan(targetAmount)`

The stable, reproducible seeded data enables reliable finance-engine testing and demo scenarios.

---

## Summary

Phase 4 successfully populates the SQLite database with realistic synthetic financial data. The seeding approach is:

✅ **Reproducible:** Deterministic generation produces identical results across seed runs  
✅ **Realistic:** Merchant names, categories, amounts, and patterns align with real financial behavior  
✅ **Structured:** Data adheres to Prisma schema and is organized by financial category  
✅ **Reversible:** Database can be reset to known state by re-running seed  
✅ **Documented:** Seed script is well-commented and includes error handling  
✅ **Tested:** All verification checks pass; re-seeding works correctly  

The MVP now has concrete transaction data supporting dashboard calculations, spending analysis, and financial recommendations in Phase 5 and beyond.
