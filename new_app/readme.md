# AI Personal Finance Copilot — MVP

A focused, intelligent personal finance application that analyzes spending behavior, explains financial insights, and generates actionable savings recommendations using AI.

## Project Overview

**What:** An MVP personal finance dashboard powered by AI that helps users understand their spending patterns and find concrete ways to save money.

**Why:** Financial literacy matters. Most people don't have a clear picture of where their money goes. This app changes that by combining real financial calculations with natural-language AI explanations.

**Core Feature:** **Find Me $500** — Analyze your discretionary spending and get a realistic, personalized plan to save an additional $500 per month.

---

## Quick Start

### Prerequisites

- **Node.js**: v18.17.0 or higher
- **npm**: v9 or higher
- **SQLite**: Included with Node.js ecosystem
- **LLM API Access**: Company-permitted LLM (e.g., OpenAI GPT-4o-mini)

### Installation

1. **Clone and navigate to the project:**
   ```bash
   cd new_app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` and add your LLM API key:
   ```
   LLM_API_KEY=your-api-key-here
   LLM_MODEL=gpt-4o-mini
   ```

4. **Initialize the database:**
   ```bash
   npm run db:generate
   npm run db:migrate
   npm run db:seed
   ```

### Running the Application

**Development server** (with hot reload):
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

**Production build:**
```bash
npm run build
npm run start
```

---

## Testing

**Run all unit tests:**
```bash
npm run test
```

**Watch mode (for development):**
```bash
npm run test:watch
```

**UI test runner:**
```bash
npm run test:ui
```

Unit tests cover all core financial calculation logic in `lib/finance/`. See [Testing](#testing) section for more details.

---

## Project Architecture

The repository follows a feature-driven structure designed for clarity and scalability:

```
new_app/
├── app/                    # Next.js pages and API routes
│   ├── api/               # Backend API endpoints
│   ├── transactions/      # Transactions page
│   ├── insights/          # Insights page
│   ├── goals/             # Goals page
│   └── page.tsx           # Dashboard home page
│
├── components/            # React components (organized by feature)
│   ├── dashboard/         # Dashboard widgets and summary cards
│   ├── transactions/      # Transaction list and filters
│   ├── insights/          # Spending analysis components
│   ├── goals/             # Savings goal components
│   ├── copilot/           # AI copilot UI and prompts
│   ├── charts/            # Data visualization components (Recharts)
│   └── ui/                # shadcn/ui base components
│
├── lib/                   # Business logic and utilities
│   ├── finance/           # Core financial calculations (deterministic, pure functions)
│   ├── ai/                # LLM integration and prompt templates
│   ├── db/                # Database utilities and helpers
│   └── validation/        # Zod schemas for API and form validation
│
├── prisma/                # Database schema and seeding
│   ├── schema.prisma      # Data model definitions
│   └── seed.ts            # Seed script for synthetic transaction data
│
├── tests/                 # Unit tests (Vitest)
│   └── finance/           # Tests for finance calculations
│
├── public/                # Static assets
│
├── docs/                  # Project documentation
│   ├── ARCHITECTURE.md    # Detailed folder structure explanation
│   ├── design/            # UI design mockups and specifications
│   └── phases/            # ROADMAP.md (8-phase development plan)
│
├── .env.example           # Environment variable template
├── package.json           # Project dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── next.config.js         # Next.js configuration (phase 2)
├── tailwind.config.js     # Tailwind CSS configuration (phase 2)
├── README.md              # This file
└── ROADMAP.md             # 8-phase development roadmap
```

**Key Principles:**
- **Deterministic Finance Logic**: All financial calculations happen in `lib/finance/` using pure functions with testable, predictable outputs.
- **AI for Explanation Only**: The LLM explains calculated results, doesn't calculate them.
- **Type Safety**: Full TypeScript across frontend, backend, and database.
- **Modular Components**: Features organized by domain, not technical layer.

For detailed explanations of each folder, see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

---

## Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | Next.js 15 | Full-stack web application |
| **Language** | TypeScript | Type safety |
| **Styling** | Tailwind CSS | Responsive design |
| **UI Components** | shadcn/ui | Pre-built accessible components |
| **Icons** | Lucide React | Icon system |
| **Charts** | Recharts | Financial data visualization |
| **Database** | SQLite | Local persistence |
| **ORM** | Prisma | Database schema & queries |
| **Validation** | Zod | Runtime data validation |
| **Testing** | Vitest | Unit testing framework |
| **AI/LLM** | Company LLM API | Natural-language explanations |
| **Package Manager** | npm | Dependency management |

---

## Development Workflow

### Adding a New Financial Calculation

1. Create a pure function in `lib/finance/calculations.ts`
2. Write unit tests in `tests/finance/calculations.test.ts`
3. Import and use in components or API routes
4. Pass results to AI for natural-language explanation

### Adding a New Page

1. Create a folder under `app/your-page/`
2. Add `page.tsx` for the page
3. Create components in `components/your-page/`
4. Add routes to navigation in `PageHeader.tsx`

### Adding a New UI Component

1. Use `npx shadcn-ui@latest add component-name` to install from shadcn
2. Or create a custom component in `components/ui/`
3. Export from `components/ui/index.ts` for easy importing

### Connecting to AI

1. Prepare structured financial data (from calculations in `lib/finance/`)
2. Create a prompt template in `lib/ai/prompts.ts`
3. Call the LLM via `lib/ai/client.ts`
4. Display response in a component (e.g., `components/copilot/Explanation.tsx`)

---

## Database Schema

The MVP uses a minimal data model:

- **Transaction**: Merchant, amount, date, category, type (income/expense), account
- **Budget**: Category, monthly limit
- **Goal**: Name, target amount, current amount, target date

Managed with Prisma in `prisma/schema.prisma`. Run migrations with:
```bash
npm run db:migrate
```

---

## Security & Environment

- **Secrets**: Stored in `.env.local` (never committed)
- **API Keys**: LLM API key loaded from environment
- **Database**: SQLite stored locally; `prisma/dev.db` ignored by git
- **Input Validation**: All API inputs validated with Zod

---

## Current Phase

This project is in **Phase 0 (Planning) / Phase 2 (Scaffolding)**. The folder structure and configuration are complete. The next steps are:

1. **Phase 1**: Translate UI design mockups into React components
2. **Phase 2**: Set up Next.js, Tailwind CSS, shadcn/ui, and core layout
3. **Phase 3**: Define Prisma data model
4. **Phase 4**: Generate synthetic transaction data
5. **Phase 5**: Build finance engine (calculations)
6. **Phase 6**: Connect calculations to dashboard
7. **Phase 7**: Build transactions experience
8. **Phase 8**: Add AI financial copilot

See [ROADMAP.md](docs/phases/ROADMAP.md) for the complete 8-phase plan.

---

## AI Code Assistant Guide

If you're an AI agent or another developer using this repository, see [AGENTS.md](AGENTS.md) for:
- Quick navigation map
- Key symbols and entry points
- Development patterns
- Common tasks and code conventions

---

## Documentation

- [ARCHITECTURE.md](docs/ARCHITECTURE.md) — Detailed folder structure and conventions
- [ROADMAP.md](docs/phases/ROADMAP.md) — 8-phase development plan with acceptance criteria
- [docs/design/](docs/design/) — UI mockups and design specifications

---

## Useful Commands

```bash
# Database
npm run db:generate    # Regenerate Prisma client
npm run db:migrate     # Create/update database schema
npm run db:seed        # Populate with synthetic data
npm run db:studio      # Open Prisma Studio UI

# Development
npm run dev            # Start dev server
npm run lint           # Run ESLint

# Testing
npm run test           # Run all tests once
npm run test:watch     # Watch mode
npm run test:ui        # Vitest UI

# Production
npm run build          # Build for production
npm run start          # Start production server
```

---

## License

This is a training/challenge project. Follow your organization's guidelines.

---

## Questions?

Refer to:
1. [AGENTS.md](AGENTS.md) for code navigation help
2. [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for folder/file explanations
3. [docs/phases/ROADMAP.md](docs/phases/ROADMAP.md) for the phased development plan
4. Inline code comments for implementation details

Happy coding!

