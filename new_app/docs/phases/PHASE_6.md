# Phase 6 — Connect Calculations to the Dashboard

**Status:** Complete. Work stops at Phase 6; no Phase 7+ features were implemented.

## Changes

- The Overview server component queries SQLite through the existing Prisma query helper on every request. No database records or Decimal objects cross the client boundary.
- `lib/finance/dashboard.ts` adapts Prisma-shaped records using the Phase 5 finance engine for monthly income, expenses, savings, savings rate, category totals, and month-over-month expense changes.
- Current balance and account balances represent cumulative net recorded activity with a zero opening balance. They are not synced bank balances.
- The displayed period is the latest recorded UTC month, with its latest transaction date explicitly shown. All recorded transactions in that month are included, even when the synthetic seed is ahead of today's date.
- Month displays daily cumulative expenses against the previous calendar month, stopping the current line at the latest recorded day. 3M and 6M display calendar-month totals against the preceding corresponding period. Missing months show zero recorded activity, not inferred history. Latest-month totals can be partial; comparisons are not normalized by elapsed days.
- Category labels, shares, account totals, and five most recent transactions come from recorded data. Equal-date transactions use descending ID order.
- Added loading, retryable error, whole-dashboard empty, and no-expense states. Database failures are not disguised as empty data.
- Removed mock recommendations from Overview in favor of a later-phase placeholder. Removed database-transaction links into the still-mock Transactions page.

## Verification

- `npm run typecheck` — passed.
- `npm run lint` — passed.
- `npm test` — all 32 tests passed, including three new dashboard tests covering decimal records, UTC year rollover, account/category/chart reconciliation, serialization, deterministic recent ordering, empty input, income-only and expense-only input.
- `npm run build` — passed; Overview is dynamically server-rendered.
- Production HTTP smoke check — status 200; rendered income and expenses matched independent Prisma group-by aggregates, and the latest merchant appeared.
- Existing local database read without modification: 96 transactions, latest month November 2026, income $5,700.00, expenses $3,150.96, savings $2,549.04, net recorded balance $7,850.03. These are verification observations, not constants in the application.

## Scope and limitations

Transactions, Insights, and Goals retain their Phase 2 mock behavior. AI and savings-plan workflows remain deferred. No schema, seed, dependency, or database contents were changed. Prisma runs on the server directly; an extra dashboard API endpoint is unnecessary for this server-rendered page. Visual browser validation and simulated database-outage recovery were not performed in this phase.
