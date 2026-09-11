# Data Conventions — AI Personal Finance Copilot

This document defines data modeling conventions for the database to ensure consistency, correctness, and maintainability.

---

## 1. Amount Sign Convention

**Rule:** All monetary amounts follow a consistent sign convention to avoid confusion in calculations and comparisons.

- **Income transactions:** Positive values (e.g., +$5,700.00 for salary)
- **Expense transactions:** Negative values (e.g., -$14.28 for coffee purchase)
- **Budgets:** Positive values (monthly limits, e.g., +$500.00 for dining)
- **Goals:** Positive values for both target and current amount (e.g., target $10,000, current $6,800)

**Rationale:** This convention aligns with standard financial reporting and simplifies calculations:
- Monthly savings = sum of all transactions (income + expenses = final balance)
- Budget comparison = spending (absolute value of negative expenses) vs. limit
- Goal progress = current amount / target amount percentage

**Example:**
```
Transaction 1: Salary deposit → +$5,700.00
Transaction 2: Rent payment → -$1,400.00
Transaction 3: Groceries → -$83.42
Monthly Total: +$4,216.58 (net positive = savings this month)
```

---

## 2. Transaction Categories

**Rule:** All transactions must be classified into one of eight predefined categories. This ensures consistent grouping for analysis and recommendations.

**Category List (Enum: TransactionCategory):**
- `HOUSING` — Rent, mortgage, property tax, home insurance, utilities, home repair
- `FOOD_AND_DINING` — Groceries, restaurants, coffee shops, meal delivery
- `TRANSPORTATION` — Gas, car insurance, public transit, ride-sharing, vehicle maintenance
- `SHOPPING` — Retail purchases, online shopping, clothing, electronics
- `ENTERTAINMENT` — Movies, concerts, hobbies, gaming, subscriptions (media-specific)
- `SUBSCRIPTIONS` — Recurring subscriptions (software, apps, memberships, fitness, streaming)
- `INCOME` — Salary, freelance earnings, bonuses, refunds, reimbursements
- `OTHER` — Miscellaneous transactions that don't fit other categories

**Rationale:**
- Eight categories provide enough granularity for meaningful insights without overwhelming users
- Clear definitions prevent ambiguity (e.g., Netflix → SUBSCRIPTIONS, not ENTERTAINMENT)
- Aligns with Google Stitch design mockups (verified in DESIGN.md)

**Decision Log:**
- ✅ Enum-based categories (not separate Category table) — simpler for MVP, sufficient for phase scope
- ✅ Eight categories locked for MVP — no dynamic category creation yet (future work)
- ✅ SUBSCRIPTIONS separated from ENTERTAINMENT — enables "Find Me $500" targeting subscriptions

---

## 3. Date and Time Handling

**Rule:** All dates and times are stored as UTC in SQLite DateTime format. Application logic treats dates as YYYY-MM-DD granularity for financial calculations (time component is present but not meaningful for analytics).

**Storage:**
- Prisma DateTime type → SQLite TEXT in ISO 8601 format (e.g., `2026-09-11T14:32:00.000Z`)
- Always stored in UTC; no timezone conversion in database

**Application Layer (Future):**
- Display layer converts to user timezone (deferred to Phase 5)
- Financial calculations use date only (YYYY-MM-DD), not time of day

**Calculations:**
- Monthly transactions: Transactions with `date >= 2026-09-01` AND `date < 2026-10-01` (UTC)
- Month-to-month comparison: Compare calendar months regardless of time component
- Recurring patterns: Detect by day-of-month, not time

**Example:**
```
Database stores: 2026-09-11T23:45:00.000Z (Salary deposited at 11:45 PM UTC)
Display shows: September 11, 2026 at 3:45 PM (Eastern Time, after conversion)
Calculation: Grouped in September 2026 monthly report (date-only logic)
```

**Rationale:**
- UTC storage avoids timezone confusion across deployments
- Granular timestamps support future audit trails
- Date-only calculations handle recurring and monthly patterns correctly

---

## 4. Account Naming Convention

**Rule:** Account names are freeform strings representing the financial account or card used. There is no separate Account master table in Phase 3 (deferred to Phase 5 for multi-account reconciliation features).

**Naming Format:**
- `"Chase Sapphire"` — Credit card name (from card design or nickname)
- `"Apple Card - 1234"` — Credit card with last 4 digits for disambiguation
- `"Checking - Wells Fargo"` — Bank account with institution name
- `"Fidelity Investments"` — Brokerage account
- `"Cash"` — Cash transactions (if tracked)

**Rationale:**
- Freeform strings enable simple MVP without account master data
- Supports multi-account demo scenarios without complex setup
- User-friendly names (not account numbers) improve readability
- Phase 5 can normalize into separate Account entity if needed

**Example:**
```
Transaction 1: Merchant: "Chipotle", Account: "Chase Sapphire"
Transaction 2: Merchant: "Shell Oil", Account: "Apple Card - 1234"
Transaction 3: Merchant: "Salary Deposit", Account: "Checking - Wells Fargo"
```

---

## 5. Recurring Transaction Flag

**Rule:** Transactions have an `isRecurring` boolean flag to indicate whether a transaction is expected to repeat in future months. This flag is **manually set**, not automatically detected.

**Semantics:**
- `isRecurring: true` — Recurring charges (rent, subscriptions, payroll)
- `isRecurring: false` — One-time transactions (groceries, shopping, discretionary expenses)

**How It's Set:**
- Seed data (Phase 4) manually flags known recurring transactions (e.g., Payroll, Netflix, Rent)
- UI (Phase 5) may allow users to flag transactions as recurring
- Phase 5 Finance Engine may auto-detect patterns, but Phase 3 does not

**Usage:**
- Recurring transaction detection (Phase 5): Filter by `isRecurring: true` and group by merchant
- Savings plan generation (Phase 5): Exclude recurring from "discretionary" analysis
- Budget comparison: Compare budget limits against recurring + discretionary spending

**Example:**
```
Transaction 1: Fidelity Payroll → isRecurring: true (salary every 2 weeks)
Transaction 2: Netflix Premium → isRecurring: true (monthly subscription)
Transaction 3: Whole Foods → isRecurring: false (weekly groceries, amount varies)
Transaction 4: Chipotle Mexican Grill → isRecurring: false (lunch purchase)
```

---

## 6. Audit Fields

**Rule:** All models include audit fields to track creation and modification time for future audit trails and compliance features.

**Fields:**
- `createdAt` (DateTime) — Set at record creation, never modified (immutable)
- `updatedAt` (DateTime) — Set at creation, automatically updated on any field modification

**Purpose:**
- Enables audit trails for financial data changes (currently unused, reserved for Phase 5)
- Supports "created vs. modified" distinction for reporting
- Foundation for "undo" or versioning features in future phases

**Behavior:**
```typescript
// Creation
const txn = await createTransaction({ ... });
// txn.createdAt = 2026-09-11T14:30:00Z
// txn.updatedAt = 2026-09-11T14:30:00Z

// Modification
const updated = await updateTransaction(txn.id, { merchant: "New Name" });
// updated.createdAt = 2026-09-11T14:30:00Z (unchanged)
// updated.updatedAt = 2026-09-11T15:45:00Z (updated)
```

---

## Summary Table

| Convention | Rule | Example |
|---|---|---|
| **Amounts** | Income +, Expense -, Budgets +, Goals + | Salary +$5,700, Coffee -$5.50, Budget +$500 |
| **Categories** | Fixed enum (8 options), same for transactions and budgets | HOUSING, FOOD_AND_DINING, SUBSCRIPTIONS |
| **Dates** | UTC, ISO 8601 format, YYYY-MM-DD granularity for calculations | `2026-09-11T14:32:00Z` → "Sep 11" for reporting |
| **Accounts** | Freeform strings, no master table yet | "Chase Sapphire", "Checking - Wells Fargo" |
| **Recurring** | Manual boolean flag (not auto-detected) | `isRecurring: true` for rent/salary |
| **Audit** | `createdAt` immutable, `updatedAt` auto-syncs | Track data changes for compliance |

---

## When to Update This Document

- When Phase 4 (Seeding) auto-detects recurring transactions
- When Phase 5 adds timezone display logic
- When Phase 5 separates Account into master table
- When financial regulations require additional audit fields

---

## Deferred Decisions (Future Phases)

- **Account Master Table** — Phase 5 may formalize multi-account reconciliation
- **Category Customization** — Phase 5 may allow user-defined categories (blocked for MVP)
- **Transaction Tags** — Future: user-defined tags for flexible grouping
- **Budget Customization** — Future: per-user budget overrides
- **Timezone Support** — Phase 5: user timezone preferences and display conversion
- **Multi-Currency** — Future: support for multiple currencies (currently USD-only)
