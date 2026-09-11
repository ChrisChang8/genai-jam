# AI Personal Finance Copilot

An MVP planned to analyze synthetic transactions, explain spending, and generate a deterministic “Find Me $500” savings plan.

## Current status

Phase 1 — Scaffold the Application is implemented. The app includes a landing page and placeholder routes for Transactions, Insights, and Goals. Phase 2 and later phases have not been implemented: there is no dashboard design, data model, seeded data, finance engine, or AI integration yet.

The [roadmap](docs/phases/ROADMAP.md) is the source of truth for phase numbering and scope.

## Getting started

Use Node.js 22 or newer (verified with Node.js 24) and npm.

```bash
cd new_app
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000). No database setup or API key is required for Phase 1.

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

The initial test verifies shadcn class composition and the Vitest path alias. Finance tests will arrive with the finance engine.

## Architecture and tooling

- Next.js 15 App Router, React 19, strict TypeScript with `@/*` rooted in this directory.
- Tailwind CSS 3, shadcn/ui configuration and a local Button component using Radix Slot, class-variance-authority, clsx, and tailwind-merge.
- Lucide React, Recharts, Prisma 6 with SQLite, and Zod installed for the planned phases.
- ESLint and Vitest configured for local development and automated checks.

```text
app/                  Pages, root layout, global CSS; API directory reserved
components/           Feature directories and shadcn/ui primitives
lib/                  UI utility; finance, ai, db, validation directories reserved
prisma/               SQLite configuration and seed placeholder
public/               Static assets (reserved)
tests/                Vitest tests
docs/                 Architecture, design references, and roadmap
```

shadcn/ui uses source components rather than a runtime `shadcn-ui` package. Add components with `npx shadcn@latest add <component>`; configuration lives in `components.json`.

Prisma's `db:generate`, `db:migrate`, and `db:studio` scripts are reserved for Phase 3, after models are defined. No database client is used at runtime. The seed file is a placeholder; a working seed command belongs to Phase 4.

Financial calculations must be deterministic application code. AI will only explain supplied results. Only synthetic data is in scope.

## Phase 1 validation and limitations

Verified installation, development startup, production build, ESLint, TypeScript, and the initial Vitest test. Tests required execution outside the agent sandbox because esbuild's filesystem access was restricted.

At installation, npm audit reported eight advisories (four moderate, four high) involving the Next.js/PostCSS, Prisma/deepmerge-ts, and Vitest dependency trees. These remain unresolved in the retained Next.js 15 / Prisma 6 toolchain; review and remediate them before deployment. No deployment is included in Phase 1.

See [architecture](docs/ARCHITECTURE.md), [agent guidance](AGENTS.md), and [the complete roadmap](docs/phases/ROADMAP.md) for planned work.
