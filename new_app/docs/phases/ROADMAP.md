# AI Personal Finance Copilot — ROADMAP

## 1. Project Goal

Build a focused MVP for an **AI Personal Finance Copilot** that analyzes synthetic transaction data, explains spending behavior, and generates actionable savings recommendations.

The core workflow is:

```text
Synthetic Transactions
        ↓
Financial Analysis
        ↓
Dashboard + Spending Insights
        ↓
AI Explanation
        ↓
Savings Recommendation
```

The main demo feature is:

> **Find Me $500** — analyze discretionary spending and generate a realistic plan to save an additional $500 per month.

This project should remain intentionally small, demonstrable, and easy for another teammate to run from the repository README.

---

## 2. MVP Scope

### Included

- Responsive finance dashboard
- Synthetic transaction dataset
- Monthly income, spending, savings, and savings-rate calculations
- Spending grouped by category
- Month-over-month spending comparisons
- Recent transactions
- Transactions page with filtering/search
- AI-generated explanations based on calculated financial data
- "Find Me $500" savings-plan generator
- Unit tests for core finance logic
- Input validation
- Environment-variable based secrets
- Basic structured logging
- README with setup, test, and usage instructions

### Out of Scope for MVP

- Real bank integrations
- Plaid
- Real customer financial data
- Authentication
- Multi-user support
- Brokerage integrations
- Payments
- Credit scoring
- Tax advice
- Investment recommendations
- Native mobile app
- Complex machine learning
- Production-grade monitoring stack
- Real financial account syncing

---

## 3. Locked Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| Editor | VS Code | Main development environment |
| AI Coding Assistant | Codex | Planning, implementation, testing, code review |
| Framework | Next.js | Full-stack web application |
| Language | TypeScript | Type safety across frontend and backend |
| Styling | Tailwind CSS | Fast responsive UI implementation |
| UI Components | shadcn/ui | Reusable accessible interface components |
| Icons | Lucide React | Consistent icon system |
| Charts | Recharts | Spending and financial charts |
| Backend | Next.js Route Handlers / Server Actions | Keep the MVP in one codebase |
| Database | SQLite | Simple local persistence |
| ORM | Prisma | Database schema, queries, and seeding |
| Validation | Zod | Validate API and form input |
| Testing | Vitest | Unit testing for finance logic |
| AI | Company-permitted LLM API | Explain structured financial analysis |
| Logging | Structured server console logs | Basic observability |
| Package Manager | npm | Dependency and script management |
| Version Control | Git | Source control |
| Deployment | Vercel if permitted | Optional MVP deployment |

### Architecture Rule

**Financial calculations must be deterministic and performed in application code.**

AI should only:

- Explain calculated financial results
- Summarize patterns
- Turn structured data into readable recommendations

AI must not be trusted to calculate balances, totals, percentages, or savings values.

---

# Phase 0 — Finalize the MVP

## Objective

Lock the application scope before implementation starts.

## Deliverables

Define the core workflow:

```text
Open Dashboard
      ↓
View Financial Summary
      ↓
View Spending Categories
      ↓
Inspect Transactions
      ↓
Ask Copilot a Question
      ↓
Receive Data-Grounded Explanation
      ↓
Generate Savings Plan
```

Confirm MVP pages:

- Overview
- Transactions
- Insights
- Goals

Confirm the initial working feature set:

- Dashboard
- Transactions
- Finance engine
- AI explanation
- Find Me $500

## Acceptance Criteria

- MVP scope is documented.
- Out-of-scope features are documented.
- Team agrees on one core user workflow.
- No coding begins before the scope is clear.

---

# Phase 1 — Scaffold the Application

**Status:** Complete. Next.js scaffold and tooling are implemented in `new_app/`.
The frontend implementation is documented separately under Phase 2 below.

See [Phase 1 completion notes](PHASE_1.md) for changes, verification results, and known limitations.

## Objective

Establish a maintainable project structure before adding business logic.

## Recommended Structure

```text
new app/
│
├── app/
│   ├── page.tsx
│   ├── transactions/
│   ├── insights/
│   ├── goals/
│   └── api/
│
├── components/
│   ├── dashboard/
│   ├── transactions/
│   ├── copilot/
│   ├── charts/
│   └── ui/
│
├── lib/
│   ├── finance/
│   ├── ai/
│   ├── db/
│   └── validation/
│
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
│
├── tests/
│
├── public/
│
├── .env.example
├── README.md
├── ROADMAP.md
├── package.json
└── tsconfig.json
```

## Tasks

- Create the Next.js application.
- Configure TypeScript.
- Configure Tailwind CSS.
- Install shadcn/ui.
- Install Lucide React.
- Install Recharts.
- Install Prisma.
- Install Zod.
- Install Vitest.
- Add `.env.example`.
- Verify development, lint, test, and build scripts.

## Acceptance Criteria

- `npm install` succeeds.
- `npm run dev` starts the app.
- `npm run build` succeeds.
- The repository structure matches the documented architecture.

---

# Phase 2 — Translate the Google Stitch Design

**Status:** Complete. The four responsive pages, shared components, and focused mock interactions are implemented. This frontend delivery stops at Phase 2; it does not include subsequent phases.

See [Phase 2 completion notes](PHASE_2.md) for architecture decisions, changes, validation, and mock-data limitations.

## Objective

Turn the Google Stitch output into a reusable responsive frontend.

## Tasks

- Save/export Stitch references.
- Recreate the design using:
  - Next.js
  - TypeScript
  - Tailwind CSS
  - shadcn/ui
  - Lucide React
  - Recharts
- Use mock values initially.
- Build reusable layout and UI components.
- Preserve desktop and mobile responsiveness.

## Suggested Pages

```text
/
├── Overview
├── Transactions
├── Insights
└── Goals
```

## Acceptance Criteria

- Application visually matches the approved Stitch design.
- Navigation works.
- Main pages render.
- Dashboard is responsive.
- No database or AI integration is required yet.
- `npm run build` succeeds.

---

# Phase 3 — Define the Data Model

## Objective

Create the smallest data model required for the MVP.

## Transaction

```text
Transaction
-----------
id
merchant
amount
date
category
type
account
```

## Budget

```text
Budget
------
id
category
monthlyLimit
```

## Goal

```text
Goal
----
id
name
targetAmount
currentAmount
targetDate
```

## Suggested Categories

- Housing
- Food & Dining
- Transportation
- Shopping
- Entertainment
- Subscriptions
- Income
- Other

## Tasks

- Define Prisma schema.
- Generate Prisma client.
- Create initial migration.
- Document conventions:
  - Positive vs negative transaction amounts
  - Expense vs income type
  - Currency assumptions
  - Date/time handling

## Acceptance Criteria

- Database schema is valid.
- Prisma client generates successfully.
- Local SQLite database can be created from scratch.
- Data conventions are documented.

---

# Phase 4 — Generate Synthetic Financial Data

## Objective

Create realistic fake financial activity for development and demos.

## Dataset Target

Generate approximately:

- 100–300 transactions
- 3 months of history
- Recurring income
- Recurring rent
- Weekly fuel purchases
- Dining transactions
- Shopping transactions
- Entertainment transactions
- Monthly subscriptions

## Example

```json
{
  "merchant": "Chipotle",
  "amount": -14.28,
  "category": "Food & Dining",
  "date": "2026-09-08",
  "type": "expense",
  "account": "Checking"
}
```

## Required Patterns

Seed data should intentionally contain patterns that the application can detect:

- Dining spending increases this month
- Subscription charges repeat monthly
- Payroll arrives twice per month
- Rent occurs once per month
- Fuel occurs regularly
- Shopping has occasional spikes

## Tasks

- Create Prisma seed script.
- Populate transaction data.
- Populate optional goals/budgets.
- Make seeding reproducible.
- Avoid all real customer data.

## Acceptance Criteria

- Seed command creates a usable dataset.
- Dashboard data can be calculated from the seed.
- Re-seeding works reliably.
- Data contains meaningful trends for the demo.

---

# Phase 5 — Build the Finance Engine

**Status:** Complete. Deterministic finance functions and focused unit tests are implemented independently of the UI and database queries. Work stops at Phase 5.

See [Phase 5 completion notes](PHASE_5.md) for contracts, assumptions, validation, and limitations.

## Objective

Create deterministic functions for all financial calculations.

## Core Functions

```text
calculateMonthlyIncome()
calculateMonthlyExpenses()
calculateSavings()
calculateSavingsRate()

groupSpendingByCategory()

compareMonthToMonth()

detectRecurringTransactions()

findLargestSpendingCategories()

calculateProjectedMonthlySpend()

generateSavingsPlan(targetAmount)
```

## Example Savings Plan Contract

Input:

```text
generateSavingsPlan(500)
```

Output:

```json
{
  "target": 500,
  "recommendations": [
    {
      "category": "Food & Dining",
      "current": 620,
      "recommended": 420,
      "savings": 200
    }
  ]
}
```

## Design Requirements

- Pure functions where practical
- Easy to unit test
- No AI dependency
- No UI dependency
- Explicit handling for empty data
- Avoid floating-point surprises where possible

## Acceptance Criteria

- Finance calculations work independently from the UI.
- All core calculations use transaction data.
- Savings recommendations never exceed available discretionary spending.
- Core functions have unit tests or are ready for testing.

---

# Phase 6 — Connect Real Calculations to the Dashboard

## Objective

Replace hardcoded Stitch/mock values with database-backed calculated values.

## Dashboard Metrics

- Current balance
- Monthly income
- Monthly expenses
- Monthly savings
- Savings rate
- Spending by category
- Month-over-month change
- Recent transactions

## Tasks

- Query transaction data.
- Pass data into finance-engine functions.
- Feed computed results to dashboard components.
- Populate charts from actual synthetic data.
- Add basic loading/error states.

## Acceptance Criteria

- Dashboard contains no hardcoded financial summary values.
- Summary cards reflect seeded data.
- Spending charts reflect seeded data.
- Recent transactions come from SQLite.
- Empty-state handling exists.

---

# Phase 7 — Build the Transactions Experience

## Objective

Let users inspect how the financial totals were produced.

## Features

- Transaction list/table
- Search
- Date filtering
- Category filtering
- Income/expense filtering
- Sort options
- Transaction detail view
- Optional category editing

## Suggested Columns

- Merchant
- Category
- Date
- Account
- Amount

## Acceptance Criteria

- Transactions load from the database.
- Search and filters work.
- Income and expenses are visually distinguishable.
- The page remains usable on smaller screens.

---

# Phase 8 — Add AI Financial Copilot

## Objective

Use AI to explain structured financial analysis.

## Architecture

```text
Database
    ↓
Finance Engine
    ↓
Structured Financial Summary
    ↓
LLM
    ↓
Natural-Language Explanation
```

## Example Input to AI

```json
{
  "monthlyIncome": 5700,
  "monthlyExpenses": 3140,
  "savingsRate": 44.9,
  "topCategories": [
    {
      "category": "Food & Dining",
      "amount": 620,
      "change": 24
    }
  ]
}
```

## Supported Questions

- Where am I overspending?
- Why did my spending increase?
- How can I save more money?
- What changed this month?

## AI Requirements

- Only use supplied financial numbers.
- Do not invent transactions.
- Do not calculate core totals independently.
- Keep responses concise.
- Avoid tax, legal, or regulated investment advice.
- Return a helpful failure message if the AI provider is unavailable.

## Security Requirements

- AI API keys remain server-side.
- No secrets in frontend bundles.
- Do not log full transaction histories.

## Acceptance Criteria

- User can ask a supported financial question.
- AI response references actual calculated values.
- AI failure does not break the app.
- No AI-generated value overrides finance-engine calculations.

---

# Phase 9 — Build “Find Me $500”

## Objective

Deliver the strongest end-to-end MVP demo.

## Workflow

User enters a savings target:

```text
$500 per month
```

The finance engine analyzes discretionary spending and generates a plan.

Example:

```text
Food & Dining
$620 → $420
Save $200

Shopping
$290 → $170
Save $120

Entertainment
$180 → $100
Save $80

Subscriptions
$135 → $35
Save $100

Total Savings
$500/month

Annual Impact
$6,000
```

## Features

- User-defined savings target
- Deterministic recommendation generation
- Current vs recommended spending
- Monthly savings total
- Annualized impact
- AI-generated explanation
- Optional “Customize Plan” interaction

## Acceptance Criteria

- User can enter a target.
- App generates a mathematically valid plan.
- Recommended savings total matches the target when feasible.
- App clearly reports when the target is not feasible.
- AI explains but does not calculate the plan.

---

# Phase 10 — Add Unit Tests

## Objective

Prove that the financial logic behaves correctly.

## Priority Test Cases

- Calculates monthly income
- Calculates monthly expenses
- Calculates savings
- Calculates savings rate
- Groups spending by category
- Compares two months
- Ignores income in spending calculations
- Detects recurring payments
- Generates a savings plan
- Does not exceed available discretionary spending
- Handles empty data
- Handles zero income safely
- Handles infeasible savings targets

## Test Focus

Prioritize business logic over extensive UI testing.

## Acceptance Criteria

- `npm test` succeeds.
- Core finance-engine functions are covered.
- Savings-plan behavior is validated.
- Edge cases are tested.

---

# Phase 11 — Add Basic Security Controls

## Objective

Meet reasonable MVP security expectations.

## Requirements

- Use synthetic financial information only.
- Store secrets in environment variables.
- Exclude `.env` from Git.
- Include `.env.example`.
- Keep AI calls server-side.
- Validate incoming requests with Zod.
- Validate savings targets.
- Do not allow AI to directly mutate financial data.
- Avoid logging sensitive transaction details.

## UI Disclaimer

Include a small notice such as:

> Demo application using synthetic financial data. Recommendations are for educational and demonstration purposes only.

## Acceptance Criteria

- No secrets are committed.
- Invalid API inputs return safe errors.
- Client code cannot access server API credentials.
- Demo disclaimer is visible where appropriate.

---

# Phase 12 — Add Basic Observability

## Objective

Make important application behavior visible during development and demos.

## Suggested Events

```text
finance.analysis.success
savings_plan.generated
ai.request.success
ai.request.failed
database.query.failed
validation.failed
```

## Example

```json
{
  "event": "savings_plan.generated",
  "target": 500,
  "recommendationCount": 4
}
```

## Requirements

- Structured logging
- No sensitive financial data in logs
- Errors include enough context to debug
- Avoid building a full monitoring platform for the MVP

## Acceptance Criteria

- Important backend operations create readable log entries.
- AI failures are logged.
- Finance-engine failures are traceable.
- No full transaction payloads appear in logs.

---

# Phase 13 — Complete README Documentation

## Objective

Make the project easy for another teammate to run and explain.

## README Sections

```text
# AI Personal Finance Copilot

## Problem

## Solution

## Demo Workflow

## Features

## Tech Stack

## Architecture

## Project Structure

## Getting Started

## Environment Variables

## Database Setup

## Seeding Data

## Running Locally

## Running Tests

## AI Usage

## Security Considerations

## Observability

## Current Limitations

## Future Improvements
```

## Required Commands

Document exact commands such as:

```bash
npm install
npm run dev
npm test
npm run build
```

Also document:

- Prisma setup
- Database seeding
- Environment variables
- AI provider setup if required

## Acceptance Criteria

- A teammate can clone the repository and run the app from the README.
- Test instructions are complete.
- Current limitations are clearly separated from implemented functionality.
- AI/Codex usage is explained.

---

# Phase 14 — Final Validation

## Objective

Make the repository demo-ready.

## Required Checks

Run:

```bash
npm run lint
npm test
npm run build
```

Manually verify:

- Dashboard loads
- Metrics match seeded transactions
- Charts load
- Transactions filter correctly
- AI questions work
- AI failure state works
- Find Me $500 works
- Infeasible savings targets are handled
- Mobile layout works
- No secrets exist in Git
- README commands are accurate

## Acceptance Criteria

All required automated checks pass, or any known limitation is explicitly documented.

---

# Phase 15 — Optional Deployment

## Objective

Deploy the MVP only if time and company policy permit.

## Option A — Local Demo

Use:

- Next.js
- Prisma
- SQLite

Best option when speed and simplicity are more important than hosting.

## Option B — Hosted Demo

Suggested stack:

- Next.js
- Vercel
- Supabase PostgreSQL

If moving from SQLite to Supabase:

- Keep Prisma if practical
- Update datasource configuration
- Re-run migrations
- Re-run seed
- Test all finance-engine queries

## Acceptance Criteria

If deployed:

- Production build succeeds.
- Environment variables are configured securely.
- No real financial information is present.
- Deployment steps are documented.

If not deployed:

- README clearly states that the MVP is intended for local execution.

---

# Recommended Implementation Order

Follow this order:

1. Finalize MVP scope
2. Translate Stitch design
3. Scaffold Next.js application
4. Define Prisma data model
5. Seed synthetic transactions
6. Build finance engine
7. Connect dashboard to real calculations
8. Build transactions page
9. Add AI Copilot
10. Build Find Me $500
11. Add unit tests
12. Add validation/security
13. Add logging
14. Complete README
15. Run final validation
16. Deploy only if time permits

---

# Codex Working Rules

Codex should work phase-by-phase rather than attempting the entire project at once.

Before implementing a phase:

1. Read `README.md`.
2. Read `ROADMAP.md`.
3. Inspect the current repository.
4. Identify the next incomplete phase.
5. Make only changes needed for that phase.
6. Run the relevant validation commands.
7. Report:
   - Files changed
   - What was implemented
   - Tests/checks run
   - Any blockers or limitations

Do not silently expand scope.

Do not introduce new major dependencies without justification.

Do not implement real financial integrations for the MVP.

Do not use an LLM for calculations that belong in the finance engine.

---

# MVP Completion Definition

The MVP is considered complete when:

- The application runs locally.
- Synthetic transactions are stored and loaded.
- Dashboard metrics are calculated from transaction data.
- Spending is grouped and visualized by category.
- Transactions can be inspected and filtered.
- AI can explain calculated spending patterns.
- “Find Me $500” generates a valid savings plan.
- Core finance logic has unit tests.
- API inputs are validated.
- Secrets are protected.
- Basic backend events are logged.
- `npm test` passes.
- `npm run build` passes.
- README explains how to run and demonstrate the project.

Anything beyond this point is an enhancement rather than an MVP requirement.
