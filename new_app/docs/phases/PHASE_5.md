# Phase 5 — Build the Finance Engine

Completed September 11, 2026. Scope is limited to roadmap Phase 5.

## Changes

- `lib/finance/types.ts`: database-independent input and result contracts, structurally compatible with Prisma transactions and Decimal amounts.
- `lib/finance/calculations.ts`: monthly income/expenses, savings and savings rate, category grouping/ranking, month-over-month expense comparison, recurring transaction detection, daily spending projection, and deterministic savings plans.
- `tests/finance/calculations.test.ts`: 20 focused tests, including fractional cents rejection, UTC boundaries, deficits, zero income, empty data, December/January comparison, leap February, recurrence, and feasible/infeasible savings targets.
- `tsconfig.json`: removed the pre-existing `ignoreDeprecations: "6.0"` setting, which the installed TypeScript 5.9.3 rejects.
- README and roadmap updated to describe the completed engine and scope boundary.

## Contracts and assumptions

All functions are pure, accept readonly transaction arrays, and have no UI, database-client, AI, or system-clock dependency. Source amounts are USD with at most two decimal places; numbers, decimal strings, and Prisma Decimal objects are accepted. Calculations accumulate integer cents with BigInt and return dollar numbers. Invalid input/signs/dates and totals outside the safe integer-cent range throw RangeError. Empty datasets return zero or empty results.

Use uppercase `INCOME`/`EXPENSE` and database category identifiers, matching the existing schema and seed. Income is nonnegative, expenses nonpositive; expense totals are returned positive. Date inputs are Date objects, and periods use UTC calendar dates with month 1–12 and year 100–9999. Grouping and ranking operate on the entire supplied array; pass a selected period when needed.

```typescript
calculateMonthlyIncome(transactions, 9, 2026);
calculateMonthlyExpenses(transactions, 9, 2026);
calculateSavings(income, expenses); // calculateMonthlySavings is an alias
calculateSavingsRate(savings, income); // percentage rounded to 2 decimals
groupSpendingByCategory(transactions);
findLargestSpendingCategories(transactions, 3);
compareMonthToMonth(transactions, 9, 2026);
detectRecurringTransactions(transactions);
calculateProjectedMonthlySpend(transactions, new Date('2026-09-15'));
generateSavingsPlan(transactions, 500, 9, 2026);
```

Savings may be negative. Zero income returns a zero savings rate. Expense comparisons use the immediately preceding calendar month and return a null percentage when spending rises from a zero baseline; zero-to-zero returns zero.

Projection uses spending through the entire supplied UTC day divided by elapsed calendar days, multiplied by days in that month, rounded to the nearest cent. It excludes later days, including future seeded activity. This is a simple daily run rate, not a prediction of scheduled bills.

Recurring detection groups by normalized merchant plus exact account, category, and type. It requires three observations, each amount within 10% of the group mean, and weekly (6–8 days), biweekly (13–15 days), semimonthly (two per observed month with 12–19 day gaps), or adjacent-month cadence (day-of-month drift up to three days). Monthly and semimonthly matches take precedence over interval matches. Results include signed average amounts and normalized merchant names. The manual `isRecurring` flag is not evidence of recurrence and is not used.

Savings plans use only the selected month's Food & Dining, Shopping, Entertainment, and Subscriptions expenses. Categories are allocated largest first, with alphabetical ties. Each reduction is bounded by current spending; exact target cents are allocated when feasible. Results report recommendations, total savings, annual savings, feasibility, and remaining shortfall. Zero is a valid target; negative/sub-cent targets are rejected.

## Limitations and phase boundary

The savings policy can reduce a discretionary category to zero. It is a mathematical allocation, not a personalized assessment of essential purchases within a mixed category such as groceries/dining. Recurring detection is a heuristic: sparse histories, missed payments, changing accounts, or variable amounts can prevent detection.

The existing seed is randomized and uses local date constructors, despite older completion notes describing it as deterministic. This phase does not rewrite the seed or database query layer. Tests use fixed synthetic records and exercise Prisma Decimal compatibility without requiring a database.

No dashboard wiring, API routes, AI integration, savings-plan UI, or later roadmap phases were implemented. Earlier phase notes that defer those features to Phase 5 are superseded by the roadmap's scope.

## Validation

- Baseline `npm test`: 9 tests passed.
- `npm test`: all 29 tests passed (20 finance tests plus 9 existing tests).
- `npm run lint`: passed.
- `npm run typecheck`: passed after removing the incompatible compiler setting.
- `npm run build`: passed; all four application pages built successfully.
- `git diff --check`: passed.

Initial typecheck/build attempts failed on the pre-existing compiler setting described above; both passed after the correction. No dependency changes were needed.
