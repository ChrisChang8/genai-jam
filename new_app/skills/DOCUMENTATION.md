---
name: fincopilot-documentation
description: Manage and update AI Personal Finance Copilot documentation to maintain consistency across README, ARCHITECTURE, ROADMAP, and AGENTS guides. Understands the current folder structure, phases, and ensures all references are aligned.
keywords:
  - documentation
  - architecture
  - roadmap
  - consistency
applyTo:
  - "**/*.md"
  - docs/**
  - README.md
  - AGENTS.md
  - ROADMAP.md
---

# FinCopilot Documentation Skill

This skill helps maintain consistency and accuracy across the AI Personal Finance Copilot documentation.

## Context & Architecture

### Current Repository Structure
```
new_app/
├── app/                    # Next.js pages and API routes
├── components/             # React components (feature-organized)
├── lib/                    # Business logic (finance, ai, db, validation)
├── prisma/                 # Database schema and seeding
├── tests/                  # Unit tests
├── public/                 # Static assets
├── docs/
│   ├── ARCHITECTURE.md     # Detailed folder structure and conventions
│   ├── design/             # UI design mockups and specifications
│   │   └── DESIGN.md       # Design system and color palette
│   └── phases/
│       └── ROADMAP.md      # 8-phase development plan
├── .env.example            # Environment variables
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript config
├── README.md               # Project overview and quick start
└── AGENTS.md               # AI agent navigation guide
```

### Key Documentation Files

1. **README.md** — Project overview, quick start, setup instructions
2. **docs/ARCHITECTURE.md** — Detailed folder structure, code patterns, conventions
3. **AGENTS.md** — Navigation guide for AI agents, code entry points, development patterns
4. **docs/phases/ROADMAP.md** — 8-phase development plan with acceptance criteria
5. **docs/design/DESIGN.md** — Design system, color tokens, UI specifications

### Core Principles

- **Deterministic Finance Logic**: Financial calculations in `lib/finance/` only, pure functions
- **AI for Explanation**: LLM explains calculated results, never calculates core metrics
- **Type Safety**: Full TypeScript with strict mode across frontend and backend
- **Feature-Driven Organization**: Components and logic grouped by feature domain
- **Transaction Sign Convention**: Positive = income, Negative = expense

## When to Use This Skill

- Updating documentation when code structure changes
- Ensuring README, ARCHITECTURE, AGENTS, and ROADMAP are aligned
- Adding new development patterns or phases
- Clarifying code organization and conventions
- Updating links and references across docs

## Documentation Tasks

### Task: Update Documentation After Code Changes

1. **Identify what changed** (e.g., new folder, new pattern, new phase)
2. **Update affected docs**:
   - **README.md** — Update Quick Start, Architecture section, or commands if applicable
   - **docs/ARCHITECTURE.md** — Update folder breakdown, patterns, or conventions
   - **AGENTS.md** — Update entry points, code symbols, or development workflows
   - **docs/phases/ROADMAP.md** — Update phase acceptance criteria or add new phases
3. **Verify cross-references** — Ensure all links between docs are valid
4. **Maintain consistency** — Use same terminology, naming conventions, examples

### Task: Document a New Development Pattern

When adding a new pattern (e.g., "Adding a new API endpoint"):

1. Add to **docs/ARCHITECTURE.md** under "Code Patterns" section
2. Add example to **AGENTS.md** under "Core Development Patterns"
3. Reference the pattern in relevant ROADMAP phase
4. Link from README.md if it affects setup/workflow

### Task: Add a New Development Phase

When extending ROADMAP.md with a new phase:

1. Follow the existing phase structure:
   ```markdown
   # Phase X — [Name]
   
   ## Objective
   [Clear goal]
   
   ## Tasks
   - [Task 1]
   - [Task 2]
   
   ## Acceptance Criteria
   - [Criterion 1]
   - [Criterion 2]
   ```

2. Update README.md "Current Phase" section
3. Update AGENTS.md "Development Workflow by Phase" section
4. Ensure task references point to existing folders (e.g., `lib/finance/`, `components/dashboard/`)

### Task: Update README.md Quick Start

When setup instructions change:

1. Update the **Prerequisites** section if dependencies change
2. Update **Installation** steps in order
3. Ensure all commands match **package.json** scripts
4. Test commands are valid:
   ```bash
   npm install
   npm run db:generate
   npm run db:migrate
   npm run db:seed
   npm run dev
   npm run test
   npm run build
   ```

### Task: Keep AGENTS.md Entry Points Accurate

When folder structure or key files change:

1. Update "Key Entry Points by Task" section
2. Update "Finding Specific Code" file locations
3. Update "Important Code Symbols to Know" with current functions
4. Verify file paths use correct structure:
   - Calculations: `lib/finance/calculations.ts`
   - Components: `components/[feature]/[Component].tsx`
   - Database: `lib/db/queries.ts`, `lib/db/mutations.ts`
   - AI: `lib/ai/client.ts`, `lib/ai/prompts.ts`
   - Validation: `lib/validation/[domain].ts`

## Documentation Standards

### Markdown Style

- Use clear section headers (H2 `##` for main sections, H3 `###` for subsections)
- Use code blocks with language:
  ```typescript
  // TypeScript examples
  ```
  ```bash
  # Bash/npm commands
  ```
- Use backticks for file names, code symbols, and commands: `app/page.tsx`, `calculateMonthlyExpenses()`
- Use bold for emphasis: **important**, **must**, **required**

### Code Examples

- Include 3-5 lines of context before and after changes
- Show imports and full function signatures
- Use actual paths from the repository
- TypeScript examples should show types/interfaces

### Cross-References

- Link to files using relative paths: `[README.md](README.md)`, `[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)`
- Link to sections: `[Quick Start](README.md#quick-start)` (if needed)
- Ensure all linked files exist
- Use consistent link text format

### Terminology

- **Application** or **MVP** (not "app" when referring to the whole project)
- **Financial calculation** (not "finance logic")
- **Finance engine** (the combined lib/finance/ functions)
- **LLM** or **AI** (use interchangeably for language model)
- **Copilot** or **Financial Copilot** (the AI feature)
- **Transaction** (single financial event)
- **Category** (spending/income category like "Food & Dining")

## Verification Checklist

Before marking documentation as complete:

- [ ] All file paths exist in the repository
- [ ] All code examples compile/are syntactically valid
- [ ] All links between docs work (no broken references)
- [ ] Phase descriptions match actual folder structure
- [ ] Commands in README match `package.json` scripts
- [ ] No emoji characters
- [ ] Consistent terminology throughout
- [ ] ARCHITECTURE.md and AGENTS.md are aligned
- [ ] ROADMAP.md phases reference correct folders/patterns
- [ ] README.md Quick Start is accurate and complete

## Common Documentation Patterns

### When describing a folder:
```markdown
### `lib/finance/` — Financial Calculations (Critical)

This is the **heart** of the application. All financial calculations must be:
- Pure functions (no side effects)
- Deterministic (same input → same output)
- Testable (easy to unit test)

Key functions:
- `calculateMonthlyIncome(transactions): number`
- `generateSavingsPlan(transactions, target): SavingsPlan`
```

### When describing a development pattern:
```markdown
### Adding a New Financial Calculation

1. Create pure function in `lib/finance/calculations.ts`
2. Write tests in `tests/finance/calculations.test.ts`
3. Import and use in components/API routes
4. Example:
   ```typescript
   export function myCalculation(data: Type[]): number {
     // Implementation
   }
   ```
```

### When linking between docs:
```markdown
For detailed explanations, see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).
For development workflows, see [AGENTS.md](AGENTS.md).
For the 8-phase plan, see [ROADMAP.md](ROADMAP.md).
```

## Quick Reference: File Purposes

| File | Purpose | Audience |
|------|---------|----------|
| README.md | Setup, overview, quick start | Developers new to project |
| docs/ARCHITECTURE.md | Folder structure, patterns, conventions | Developers implementing features |
| AGENTS.md | Code navigation, entry points, troubleshooting | AI agents and code explorers |
| docs/phases/ROADMAP.md | 8-phase plan with acceptance criteria | Project managers, developers |
| docs/design/DESIGN.md | Design system, colors, UI specifications | UI/UX developers |

## Next Steps

When asked to update documentation:
1. Identify which doc(s) to update based on the change type
2. Find the relevant section
3. Make changes while maintaining consistency
4. Verify all cross-references
5. Test all commands and file paths
6. Ensure terminology is consistent with this skill
