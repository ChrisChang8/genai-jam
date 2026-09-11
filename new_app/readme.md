# AI Personal Finance Copilot

An MVP planned to analyze synthetic transactions, explain spending, and generate a deterministic “Find Me $500” savings plan.

## Current status

Phases 1–5 are implemented: the responsive frontend, Prisma data model, synthetic seed script, and deterministic finance engine. The frontend still uses Phase 2 mock fixtures; dashboard integration begins in Phase 6. Work stops at Phase 5. See [Phase 5 notes](docs/phases/PHASE_5.md) for finance contracts and limitations.

The [roadmap](docs/phases/ROADMAP.md) is the source of truth for phase numbering and scope.

## Getting started

Use Node.js 22 or newer (verified with Node.js 24) and npm.

```bash
cd new_app
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000). No database setup or API key is required to run the Phase 2 frontend.

Optional environment template: copy `.env.example` to `.env` (`Copy-Item .env.example .env` in PowerShell). Prisma CLI and Next.js both read `.env`; local environment files are ignored by Git. The SQLite URL is relative to `prisma/schema.prisma`.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Check TypeScript without emitting files |
| `npm test` | Run Vitest once and exit |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:ui` | Open the Vitest UI |
| `npm run build` | Create the production build |
| `npm start` | Serve the production build |

Vitest covers shadcn class composition, mock-ledger filters, selection retention, date/currency formatting, and 20 finance-engine tests for calculations and edge cases.

## Exploring the frontend

- **Overview:** Financial summary, spending comparison (Month / 3M / 6M), category allocation, recent transaction links, recommendations, and demo accounts.
- **Transactions:** Search merchants/accounts, combine type/category/date filters, reset filters, and select a row for details. Recent transaction links preselect that record. Filtering a selected record out clears its details.
- **Insights:** Four illustrative insight cards, a dining chart, and Active/Archived views; the archived sample is empty.
- **Goals:** Two savings goals, progress indicators, and a pacing toggle that switches between fixed illustrative scenarios and milestone dates.

Mock interactions reset on reload. Disabled actions identify later functionality, including record changes, exports, transfers, applying plans, and historical analysis. Summary figures describe the full illustrative month; the eleven-row sample ledger is not their source. Goal dates and recommendations reproduce the design scenarios and are not calculated forecasts.

## Architecture and tooling

- Next.js 15 App Router, React 19, strict TypeScript with `@/*` rooted in this directory.
- Tailwind CSS 3, shadcn/ui configuration and a local Button component using Radix Slot, class-variance-authority, clsx, and tailwind-merge.
- Lucide React, Recharts, Prisma 6 with SQLite, and Zod installed for the planned phases.
- ESLint and Vitest configured for local development and automated checks.

```text
app/                  Pages, root layout, global CSS; API directory reserved
components/           Feature directories and shadcn/ui primitives
lib/                  UI utilities, typed mock fixtures, and separate feature modules
prisma/               SQLite schema, migrations, and synthetic seed script
public/               Locally served Inter font and its OFL license
tests/                Vitest tests
docs/                 Architecture, design references, and roadmap
```

shadcn/ui uses source components rather than a runtime `shadcn-ui` package. Add components with `npx shadcn@latest add <component>`; configuration lives in `components.json`.

The frontend keeps route files focused on composition. Shared page framing lives in `components/common`, accessible primitives in `components/ui`, and page-specific components in their feature directories. `lib/mock` supplies typed presentation data through props. Charts and interactive controls use client boundaries; static layout and insight content stay server-rendered. Inter is served locally, so running and building the frontend does not request Google Fonts.

For local synthetic data, configure `.env`, run `npm run db:generate`, `npm run db:migrate`, and `npm run db:seed`. Seeding clears existing transactions, budgets, and goals. The seed currently uses random values, so each run can differ. The frontend is not yet connected to the database. The finance engine accepts Prisma-shaped records without querying SQLite.

Financial calculations must be deterministic application code. AI will only explain supplied results. Only synthetic data is in scope.

## Phase 2 validation

ESLint, TypeScript, all nine Vitest tests, and the production build pass. Browser checks passed on all four pages at 375px, 768px, and 1440px, including combined filters, empty states, transaction selection, chart tabs, insight tabs, the pacing toggle, keyboard focus, and mobile navigation. The final browser pass reported no console or page errors and no horizontal overflow. See [Phase 2 completion notes](docs/phases/PHASE_2.md) for details and the exact scope boundary.

## Phase 1 validation and limitations

Verified installation, development startup, production build, ESLint, TypeScript, and the initial Vitest test. Tests required execution outside the agent sandbox because esbuild's filesystem access was restricted.

At installation, npm audit reported eight advisories (four moderate, four high) involving the Next.js/PostCSS, Prisma/deepmerge-ts, and Vitest dependency trees. These remain unresolved in the retained Next.js 15 / Prisma 6 toolchain; review and remediate them before deployment. No deployment is included in Phase 1.

See [architecture](docs/ARCHITECTURE.md), [agent guidance](AGENTS.md), and [the complete roadmap](docs/phases/ROADMAP.md) for planned work.
