# Phase 2 — Translate the Google Stitch Design

**Status:** Complete  
**Completed:** September 11, 2026  
**Scope:** [Roadmap Phase 2](ROADMAP.md#phase-2--translate-the-google-stitch-design)

## Outcome

Implemented Overview, Transactions, Insights, and Goals with a shared responsive top navigation and the monochrome-and-mint visual system. Stitch screenshots determine the page composition; the written design guide supplies the styling direction. The original exported HTML and images remain reference material, not runtime dependencies.

This delivery stops at Phase 2. It introduces no database model, migration, backend endpoint, finance engine, AI integration, persistence, or deployment. Separate concurrent workspace changes to Phase 1 notes and Phase 3/database files were preserved and are not part of this frontend delivery.

## Changes

- **App foundation:** Thin route composition, shared app shell, active navigation, mobile navigation row, skip link, local Inter font, app icon, and semantic CSS/Tailwind tokens. Inter is bundled with its OFL license; no runtime Google Fonts request is needed.
- **Reusable components:** PageHeader, MetricGrid, EmptyState, PreviewAction, Card, Badge, Input, SegmentedControl, Progress, and the existing shadcn Button. Feature directories hold dashboard panels, transaction controls/detail, insight cards, and goal components. Merchant avatars are shared between dashboard and ledger.
- **Overview:** Summary metrics, Recharts comparison with three fixture periods, category bars, recent-transaction deep links, savings recommendations, and sample accounts.
- **Transactions:** Eleven example records; combined merchant/account search, type, category, and inclusive date filters; reset and empty states; accurate visible counts; selection and detail panel. Invalid/filtered selections are cleared, and closing details restores row focus. The `selected` query parameter supports dashboard links.
- **Insights:** Summary metrics, four reusable insight cards, dining chart, subscription list, savings progress, discretionary split, and Active/Archived views with an empty archived state.
- **Goals:** Reusable goal cards, progress indicators, pacing switch, and milestone timeline. The switch selects fixed standard/accelerated scenarios and does not run financial calculations.
- **Data and checks:** Typed `lib/mock` presentation fixtures passed through props, pure filtering/selection helpers, consistent UTC date and signed-currency formatting, and eight focused tests in addition to the existing utility test.
- **Documentation:** Updated README, current frontend architecture, and Phase 2 roadmap status.

## Architectural decisions

Route and layout components remain server-rendered. Client boundaries are limited to navigation state, Recharts, transaction interactions, insight tabs, and the pacing toggle. Server-rendered insight content is passed through the client selector as children. No global data provider or additional runtime dependency was introduced; package manifests and lockfile are unchanged by this delivery.

Presentation types are independent of Prisma and future finance-engine contracts. Later phases can adapt their results at route/data boundaries and reuse the components. Shared helpers only filter or format values; they do not calculate financial summaries or forecasts.

The desktop content area is limited to 1380px inside its page padding. Mobile navigation stays visible in a second row; metrics reflow into two columns, ledger metadata moves into merchant cells, and transaction details appear below the table. Cards and timelines stack on narrower screens.

## Verification results

| Check | Result |
| --- | --- |
| `npm run lint` | Passed, no warnings |
| `npm run typecheck` | Passed |
| `npm test` | Passed: 9 tests across 2 files |
| `npm run build` | Passed; all four routes and the app icon compiled |
| Browser layout | All four routes at 375px, 768px, and 1440px; no page-level horizontal overflow |
| Visual review | Desktop screenshots compared with all four Stitch references; mobile and tablet reflow checked |
| Browser behavior | Combined filters, no-results state, reset, retained/cleared selection, detail closing/focus, keyboard activation, chart periods, deep links, insight views, pacing scenarios, disabled preview actions, and mobile navigation passed |
| Browser diagnostics | Final development-preview run: no console errors/warnings or uncaught page errors |

Browser checks used the bundled Playwright runtime and installed Chrome without adding project dependencies. Viewport screenshots and run results were generated under ignored `.next/phase2-qa/`; these are disposable QA artifacts. The successful production build was followed by concurrent development work that reused `.next`, so the browser results above are development-preview results, not a production-server claim. Stop development servers before regenerating a build for `npm start`.

## Intentional limits

- September 2026 figures, forecasts, and recommendation text are illustrative fixtures, independent of the current date. Monthly summaries do not sum the eleven-row sample ledger.
- Goal cards retain their original scheduled pace while the optimizer previews an alternate milestone scenario. No money is moved and no computed forecast is implied.
- Controls for creating/editing records, exports, applying plans, transfers, and historical analysis are disabled with nearby explanations. Account summaries describe sample balances rather than live syncing.
- Mock state resets on reload. There is one demo profile and one light theme; no authentication or account integration.
- No Phase 3 or subsequent work was implemented as part of this task.
