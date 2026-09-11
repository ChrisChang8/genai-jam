# AI Personal Finance Copilot

An MVP planned to analyze synthetic transactions, explain spending, and generate a deterministic “Find Me $500” savings plan.

## Current status

The Phase 2 frontend implements Overview, Transactions, Insights, and Goals from the Google Stitch references. It uses a shared responsive layout, reusable components, and typed September 2026 fixtures. The frontend does not query a database, run a finance engine, or call AI. This delivery stops at Phase 2.

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

Vitest covers shadcn class composition, combined mock-ledger filters, selection retention, and consistent date/currency formatting. Finance-engine tests belong to later phases.

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
prisma/               SQLite configuration and seed placeholder
public/               Locally served Inter font and its OFL license
tests/                Vitest tests
docs/                 Architecture, design references, and roadmap
```

shadcn/ui uses source components rather than a runtime `shadcn-ui` package. Add components with `npx shadcn@latest add <component>`; configuration lives in `components.json`.

The frontend keeps route files focused on composition. Shared page framing lives in `components/common`, accessible primitives in `components/ui`, and page-specific components in their feature directories. `lib/mock` supplies typed presentation data through props. Charts and interactive controls use client boundaries; static layout and insight content stay server-rendered. Inter is served locally, so running and building the frontend does not request Google Fonts.

Prisma's `db:generate`, `db:migrate`, and `db:studio` scripts are reserved for Phase 3, after models are defined. No database client is used at runtime. The seed file is a placeholder; a working seed command belongs to Phase 4.

Financial calculations must be deterministic application code. AI will only explain supplied results. Only synthetic data is in scope.

## Phase 2 validation

ESLint, TypeScript, all nine Vitest tests, and the production build pass. Browser checks passed on all four pages at 375px, 768px, and 1440px, including combined filters, empty states, transaction selection, chart tabs, insight tabs, the pacing toggle, keyboard focus, and mobile navigation. The final browser pass reported no console or page errors and no horizontal overflow. See [Phase 2 completion notes](docs/phases/PHASE_2.md) for details and the exact scope boundary.

## Phase 1 validation and limitations

Verified installation, development startup, production build, ESLint, TypeScript, and the initial Vitest test. Tests required execution outside the agent sandbox because esbuild's filesystem access was restricted.

At installation, npm audit reported eight advisories (four moderate, four high) involving the Next.js/PostCSS, Prisma/deepmerge-ts, and Vitest dependency trees. These remain unresolved in the retained Next.js 15 / Prisma 6 toolchain; review and remediate them before deployment. No deployment is included in Phase 1.

See [architecture](docs/ARCHITECTURE.md), [agent guidance](AGENTS.md), and [the complete roadmap](docs/phases/ROADMAP.md) for planned work.
