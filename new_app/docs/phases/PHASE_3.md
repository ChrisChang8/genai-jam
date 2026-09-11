# Phase 3 — Define the Database Data Model

**Status:** Complete  
**Completed:** September 11, 2026  
**Scope:** [Roadmap Phase 3](ROADMAP.md#phase-3--define-the-database-data-model)

## Objective and outcome

Establish a complete Prisma data model for the core financial entities (Transactions, Budgets, and Goals) with proper enums, relationships, audit fields, and data conventions. Phase 3 delivers the database schema, migrations, client initialization, and a read/write query layer for use by future phases.

The database schema is defined, migrations are created, and the SQLite development database is initialized. Synthetic seed data and data validation are deferred to Phase 4.

Work stopped at Phase 3. The API endpoints and UI integration are deferred to Phase 5.

## Changes made

### Data model definition

- Defined four enums (TransactionType, TransactionCategory, GoalPriority, GoalStatus) to classify and filter financial data consistently.
- Defined Transaction model with signed amount convention (positive for income, negative for expense), UTC datetime, category and type references, freeform account field, recurring flag, and audit fields.
- Defined Budget model with category reference, monthly limit, and audit fields. Unique constraint on category enforces one budget per category.
- Defined Goal model with target and current amounts (both positive), target date, priority and status enums, and audit fields.
- Added inline documentation comments to all enums and models explaining purpose and data conventions.
- Added data convention comments to key fields (e.g., amount sign, date granularity, account naming).
- Included database indexes on commonly queried fields (date, category, type for Transaction; category for Budget; status, priority, targetDate for Goal).

### Prisma configuration and client generation

- Preserved the SQLite datasource and Prisma client generator configuration from Phase 1.
- Ran `npx prisma generate` to create Prisma Client types in `node_modules/.prisma/client/`.
- Validated schema syntax and Prisma configuration with no errors.

### Database migrations and initialization

- Ran `npx prisma migrate dev --name init` to create the initial migration.
- Migration file auto-generated at `prisma/migrations/20260911151037_init/migration.sql`.
- Created SQLite development database at `prisma/dev.db` with all tables, indexes, and enums properly initialized.
- Migration includes CREATE TABLE statements for Transaction, Budget, and Goal; CREATE INDEX statements for optimized queries.
- Prisma client regenerated after migration application.

### Database client singleton

- Created `lib/db/client.ts` with a PrismaClient singleton pattern to avoid multiple connections in development.
- Exported `prisma` instance for use by query and mutation modules.
- Configured for development mode to reuse client across module reloads.

### Database access layer — queries

- Created `lib/db/queries.ts` with typed read functions for all three models.
- Transaction queries: `getTransactionsByMonth()`, `getTransactionsByCategory()`, `getAllTransactions()`, `getTransactionById()`.
- Budget queries: `getBudgets()`, `getBudgetByCategory()`.
- Goal queries: `getGoals()`, `getGoalsByStatus()`, `getGoalById()`.
- All functions use Prisma client and return typed results (Transaction[], Budget[], Goal[]).
- Date filtering for monthly transactions handles UTC dates and month boundary conditions correctly.
- Results ordered sensibly: transactions by date descending (most recent first), budgets by category ascending, goals by creation date descending or target date ascending.

### Database access layer — mutations

- Created `lib/db/mutations.ts` with typed write functions for all three models.
- Transaction mutations: `createTransaction()`, `updateTransaction()`, `deleteTransaction()`.
- Budget mutations: `createBudget()`, `updateBudget()`, `deleteBudget()`.
- Goal mutations: `createGoal()`, `updateGoal()`, `deleteGoal()`.
- All functions use Prisma client input/update types (TransactionCreateInput, etc.) for type safety.
- All functions return typed results (Transaction, Budget, Goal).
- Organized by entity with section comments for readability.
- Errors from Prisma bubble up to caller (no custom error handling in Phase 3).

### Data conventions documentation

- Created `docs/DATA_CONVENTIONS.md` with six comprehensive convention sections.
- Amount Sign Convention: Income +, Expense -, Budgets +, Goals + for calculation consistency.
- Transaction Categories: Eight fixed enum categories with clear definitions and rationale.
- Date and Time Handling: UTC storage, ISO 8601 format, YYYY-MM-DD granularity for analytics.
- Account Naming Convention: Freeform strings, no master table yet; supports multi-account demo.
- Recurring Transaction Flag: Manual boolean flag for pattern detection; not auto-computed in Phase 3.
- Audit Fields: `createdAt` immutable, `updatedAt` auto-synced for future compliance and audit trails.
- Included summary table, decision log, and deferred decisions section.

### Entity relationship diagram

- Created `docs/ERD.md` with Mermaid erDiagram showing all three tables, fields, types, and relationships.
- Documented enum values and their meanings.
- Included Schema Notes section explaining each table's purpose and key fields.
- Included Cardinality section showing many-to-one relationships and independent entities.
- Included Phase 3 Assumptions section (fixed enums, application-layer enforcement, freeform accounts).
- Included Future Enhancements section for Phase 5+ features (Account master table, tags, multi-category splits).

## File inventory

Paths below are relative to `new_app/`.

| Area | Added or updated files |
| --- | --- |
| Prisma schema and migrations | `prisma/schema.prisma`, `prisma/migrations/20260911151037_init/migration.sql`, `prisma/migrations/migration_lock.toml` |
| Database initialization | `prisma/dev.db` (SQLite database file) |
| Database client | `lib/db/client.ts` |
| Database access — queries | `lib/db/queries.ts` |
| Database access — mutations | `lib/db/mutations.ts` |
| Environment configuration | `.env` (created from `.env.example` with DATABASE_URL) |
| Documentation | `docs/DATA_CONVENTIONS.md`, `docs/ERD.md`, `docs/phases/PHASE_3.md` |

## Verification results

These results were recorded during the Phase 3 implementation on Windows with Node.js 24.18.0 and npm 11.16.0.

| Check | Result |
| --- | --- |
| `npx prisma generate` | Passed; generated Prisma Client v6.19.3 in 156ms with no errors |
| `npx prisma migrate dev --name init` | Passed; created migration and dev.db file; applied successfully |
| Migration file exists | ✓ `prisma/migrations/20260911151037_init/migration.sql` created with all DDL statements |
| Database file created | ✓ `prisma/dev.db` present in `prisma/` directory |
| Schema validation | Passed; all enums, models, relationships validated |
| TypeScript compilation | Passed; imported from `@prisma/client` successfully; no type errors |
| Query functions compile | ✓ Imported all functions from `lib/db/queries.ts` without errors |
| Mutation functions compile | ✓ Imported all functions from `lib/db/mutations.ts` without errors |
| Database schema verification | Passed; all tables (Transaction, Budget, Goal) present; all indexes created |

The database schema is validated and ready for use by Phase 4 (synthetic data seeding) and Phase 5 (API endpoints and UI integration).

## Running Phase 3

From the repository root:

```bash
cd new_app
```

**Verify existing setup:**

```bash
npx prisma generate
npx prisma migrate dev --name init
```

**Inspect the database (GUI):**

```bash
npx prisma studio
```

Opens a browser-based database explorer at `http://localhost:5555` to view and edit tables. Requires a running development environment.

**Reset database (for development):**

```bash
npx prisma migrate reset
```

Resets the database to the initial state by dropping all data and re-running all migrations. Use this during development if the database becomes corrupted or you need to start fresh.

**Query the database programmatically:**

From a Node.js script or API route, import and use the query/mutation functions:

```typescript
import { getTransactionsByMonth, createTransaction } from '@/lib/db/queries';
import { createBudget } from '@/lib/db/mutations';

// Query by month (current month: September 2026)
const september = await getTransactionsByMonth(9, 2026);

// Create a new transaction
const txn = await createTransaction({
  merchant: 'Salary Deposit',
  amount: 5700,
  date: new Date('2026-09-11'),
  category: 'INCOME',
  type: 'INCOME',
  account: 'Checking - Wells Fargo',
  isRecurring: true,
});

// Create a budget
const budget = await createBudget({
  category: 'FOOD_AND_DINING',
  monthlyLimit: 500,
});
```

## Known limitations and deferred work

- Account master table is deferred to Phase 5. Account names are currently freeform strings with no constraints or reconciliation features.
- Dynamic category creation is deferred to Phase 5. Transaction and Budget categories are fixed to eight enum values for MVP.
- Automatic recurring transaction detection is deferred to Phase 5 Finance Engine. The `isRecurring` flag is manually set (currently unused in seeding).
- Multi-currency support is deferred to future phases. All amounts are assumed to be USD.
- Timezone support is deferred to Phase 5. Dates are stored in UTC; user timezone preferences and display conversion not yet implemented.
- Synthetic data seeding is deferred to Phase 4. The database is currently empty; a seed command with realistic test data will be added in Phase 4.
- Data validation (Zod integration) is deferred to Phase 4. Input validation is not yet enforced at the database layer.
- Error handling and retry logic are deferred to Phase 5. Prisma errors bubble up to the caller.
- Test coverage for the database layer is deferred to Phase 5. No unit or integration tests have been written for queries and mutations.
- API endpoint integration is deferred to Phase 5. Query and mutation functions are defined but not yet exposed via Next.js API routes.
- UI integration is deferred to Phase 5. Components have not been updated to fetch from the database.

Work stopped at Phase 3. Phase 4 — Seed Synthetic Data is the next roadmap phase and was not started as part of this change.

## Summary

Phase 3 delivers a complete, validated database schema with three core models (Transaction, Budget, Goal), four enums (TransactionType, TransactionCategory, GoalPriority, GoalStatus), and a full read/write query layer. The schema follows financial data conventions (signed amounts, category classification, UTC dates, audit fields) documented in `DATA_CONVENTIONS.md` and illustrated in `ERD.md`. The SQLite development database is initialized and ready for seeding and integration.
