# Skills — AI Agent Guidance

This folder contains domain-specific skills that guide AI agents in performing specialized tasks for the AI Personal Finance Copilot project.

## Available Skills

### 1. DOCUMENTATION.md — fincopilot-documentation

**Purpose:** Maintain and update project documentation to ensure consistency across README, ARCHITECTURE, ROADMAP, and AGENTS guides.

**When to use:**
- Updating documentation after code structure changes
- Adding new development patterns
- Adding new phases to the ROADMAP
- Updating setup instructions or commands
- Ensuring cross-references between docs are accurate
- Clarifying code organization and conventions

**Applies to:**
- `**/*.md` — All markdown files
- `docs/**` — Documentation folder
- README.md, AGENTS.md, docs/ARCHITECTURE.md, docs/phases/ROADMAP.md

**Key functions:**
- Understand current folder structure and architecture
- Update docs in sync (README, ARCHITECTURE, AGENTS, ROADMAP)
- Verify all links and file paths
- Maintain consistent terminology
- Ensure examples are accurate

**Documentation structure:**
- README.md — Project overview, quick start, setup
- docs/ARCHITECTURE.md — Folder structure, patterns, conventions
- AGENTS.md — Code navigation, entry points, workflows
- docs/phases/ROADMAP.md — 8-phase development plan
- docs/design/DESIGN.md — Design system, colors, specifications

---

### 2. DESIGN.md — fincopilot-design

**Purpose:** Implement and maintain UI components with consistent design following the Understated Monochrome & Mint design system.

**When to use:**
- Building new React components
- Implementing dashboard, transactions, insights, or goals pages
- Creating charts or data visualizations
- Styling forms, inputs, and buttons
- Ensuring responsive design across devices
- Matching the approved UI mockups

**Applies to:**
- `components/**/*.tsx` — All React components
- `app/**/*.tsx` — Next.js pages
- `docs/design/**` — Design documentation

**Key functions:**
- Reference color palette and usage guidelines
- Implement responsive layouts (mobile, tablet, desktop)
- Use shadcn/ui components correctly
- Ensure accessibility (contrast, focus states)
- Match design mockups from `docs/design/`

**Design system:**
- Color Palette: Understated Monochrome & Mint
- Primary Colors: Black `#000000`, Mint `#006c49`
- Neutral Base: Grays from `#f9f9f9` to `#1a1c1c`
- Accent: Mint green `#006c49`, `#6ffbbe`
- Error: Red `#ba1a1a`

**Component patterns:**
- Summary cards (dashboard metrics)
- Charts (Recharts with mint/black colors)
- Transaction tables (alternating row backgrounds)
- Buttons (primary/secondary/outlined states)
- Modals and dialogs
- Navigation and menus
- Form inputs and validation

**Design mockups location:**
- `docs/design/overview_dashboard_minimal/` — Dashboard layout
- `docs/design/transactions_minimal/` — Transactions page
- `docs/design/financial_insights_minimal/` — Insights page
- `docs/design/goals_planning_minimal/` — Goals page
- `docs/design/DESIGN.md` — Full design specification

---

## How to Use Skills

### For AI Agents

When asked to perform a task, reference the relevant skill:

1. **Documentation task** → Use `DOCUMENTATION.md`
   - Example: "Update the README with the new database setup steps"
   - Skill guides you to: Update README.md Installation section, verify package.json scripts, update AGENTS.md references

2. **Design/UI task** → Use `DESIGN.md`
   - Example: "Build the dashboard summary cards"
   - Skill guides you to: Use Understated Monochrome & Mint colors, ensure responsive design, match `docs/design/overview_dashboard_minimal/`, verify accessibility

3. **General development task** → Reference AGENTS.md + relevant skill
   - Example: "Add a new financial calculation and document it"
   - Skill guides you to: Create function in `lib/finance/`, test in `tests/finance/`, document in AGENTS.md (DOCUMENTATION skill), reference in ROADMAP phase

### For Developers

Skills serve as quick reference guides:

- Need to write docs? → Read DOCUMENTATION.md for structure, terminology, and verification checklist
- Building UI? → Read DESIGN.md for colors, components, responsive patterns
- Starting development? → Reference AGENTS.md + relevant skill folder

---

## Folder Structure

```
new_app/skills/
├── README.md           # This file - overview of skills
├── DOCUMENTATION.md    # fincopilot-documentation skill
└── DESIGN.md          # fincopilot-design skill
```

---

## Skill Metadata

Each skill file includes frontmatter with metadata:

```yaml
---
name: fincopilot-[skill-name]
description: What this skill does
keywords:
  - relevant
  - keywords
applyTo:
  - file/patterns
  - docs/**
---
```

This metadata helps AI agents understand:
- **name**: Unique identifier for the skill
- **description**: When and why to use the skill
- **keywords**: Tags for skill discovery
- **applyTo**: File patterns the skill applies to

---

## Extending Skills

To add a new skill:

1. Create `[SKILLNAME].md` in this folder
2. Include frontmatter with name, description, keywords, applyTo
3. Add comprehensive guidance for the domain
4. Include examples and checklists
5. Reference existing documentation and code patterns
6. Update this README.md with the new skill

---

## Quick Reference

| Skill | Use When | Focus |
|-------|----------|-------|
| DOCUMENTATION | Updating docs, adding features, clarifying code | README, ARCHITECTURE, AGENTS, ROADMAP consistency |
| DESIGN | Building UI, styling components, ensuring consistency | Colors, typography, responsive layout, accessibility |

---

## Next Steps

- Start a task → Choose the relevant skill
- Build a feature → Reference AGENTS.md + DESIGN skill (if UI) + DOCUMENTATION skill (for docs)
- Debug an issue → Check AGENTS.md troubleshooting section
- Learn the codebase → Read skills in order: DOCUMENTATION, DESIGN, AGENTS.md

Happy coding!
