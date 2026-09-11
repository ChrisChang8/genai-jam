---
name: fincopilot-design
description: Guide for implementing and maintaining consistent UI design across the AI Personal Finance Copilot. References DESIGN.md color system, component patterns, and responsive layouts. Ensures all UI components follow the Understated Monochrome & Mint design system.
keywords:
  - design
  - ui
  - components
  - color-system
  - responsive
  - shadcn/ui
applyTo:
  - "components/**/*.tsx"
  - "app/**/*.tsx"
  - "docs/design/**"
  - "DESIGN.md"
---

# FinCopilot Design Skill

This skill provides guidance for building UI components that are consistent with the FinCopilot design system.

## Design System: Understated Monochrome & Mint

### Color Palette

The design system uses a professional, clean palette with high contrast:

**Neutral Base (Grays)**
- Surface: `#f9f9f9` — Main background
- Surface Dim: `#dadada` — Secondary backgrounds
- Inverse Surface: `#2f3131` — Dark backgrounds (themes)
- On Surface: `#1a1c1c` — Primary text color
- On Surface Variant: `#4c4546` — Secondary text color
- Outline: `#7e7576` — Borders and dividers

**Primary (Black)**
- Primary: `#000000` — Buttons, key elements
- On Primary: `#ffffff` — Text on primary background
- Primary Container: `#1b1b1b` — Secondary button state
- On Primary Container: `#848484` — Text on primary container

**Secondary (Mint/Teal)**
- Secondary: `#006c49` — Accents, success states
- On Secondary: `#ffffff` — Text on secondary background
- Secondary Container: `#6cf8bb` — Light mint backgrounds
- On Secondary Container: `#00714d` — Text on mint background
- Secondary Fixed: `#6ffbbe` — Interactive element backgrounds
- Secondary Fixed Dim: `#4edea3` — Hover state

**Error**
- Error: `#ba1a1a` — Error states, destructive actions
- On Error: `#ffffff` — Text on error background
- Error Container: `#ffdad6` — Error message backgrounds
- On Error Container: `#93000a` — Text on error background

### Component Color Usage

#### Cards & Containers
```typescript
// Main card background
backgroundColor: '#f9f9f9'  // Surface

// Card border
borderColor: '#e2e2e2'      // Surface Container High

// Text on card
color: '#1a1c1c'            // On Surface
```

#### Buttons

**Primary Button** (dark background, white text)
```typescript
backgroundColor: '#000000'  // Primary
color: '#ffffff'            // On Primary
hover: '#1b1b1b'           // Primary Container
```

**Secondary Button** (mint background, dark text)
```typescript
backgroundColor: '#6ffbbe'  // Secondary Fixed
color: '#002113'            // On Secondary Fixed
hover: '#4edea3'           // Secondary Fixed Dim
```

**Outlined Button** (transparent with mint border)
```typescript
backgroundColor: 'transparent'
borderColor: '#006c49'      // Secondary
color: '#006c49'            // Secondary
hover: '#6cf8bb'           // Secondary Container (light fill)
```

#### Typography

**Headings**
- Color: `#1a1c1c` (On Surface)
- Font Weight: 600-700
- Use for: Page titles, card titles, section headers

**Body Text**
- Color: `#1a1c1c` (On Surface)
- Font Weight: 400
- Use for: Descriptions, content

**Secondary Text**
- Color: `#4c4546` (On Surface Variant)
- Font Weight: 400
- Use for: Labels, captions, meta information

**Error Text**
- Color: `#ba1a1a` (Error)
- Use for: Error messages, validation

**Success Text**
- Color: `#006c49` (Secondary)
- Use for: Success messages, confirmations

#### Borders & Dividers

- Default: `#e2e2e2` (Surface Container High)
- Secondary: `#cfc4c5` (Outline Variant)
- Focus: `#7e7576` (Outline)

## Component Patterns

### Dashboard Summary Cards

Used on Overview/Dashboard page to display key metrics (Income, Spending, Savings, Savings Rate).

**Structure:**
```typescript
interface SummaryCardProps {
  label: string;           // e.g., "Monthly Income"
  value: number | string;  // e.g., "$5,700"
  change?: {
    percent: number;       // e.g., 16.8
    direction: 'up' | 'down';
  };
  trend?: 'positive' | 'neutral'; // For coloring change indicator
}
```

**Style:**
- Background: `#f9f9f9` (Surface)
- Border: `1px solid #e2e2e2`
- Label text: `#4c4546` (On Surface Variant, small)
- Value text: `#1a1c1c` (On Surface, large, bold)
- Change text: `#006c49` (Secondary, green for positive) or `#ba1a1a` (Error, red for negative)
- Padding: `16px`
- Border radius: `8px`

**Example HTML Structure:**
```html
<div class="p-4 border rounded-lg bg-surface">
  <p class="text-sm text-on-surface-variant">Monthly Income</p>
  <p class="text-2xl font-bold text-on-surface">$5,700</p>
  <p class="text-sm text-secondary">16.8% from last month</p>
</div>
```

### Charts (Recharts)

**Color Configuration:**
```typescript
const chartConfig = {
  income: '#006c49',        // Secondary (mint)
  expense: '#1a1c1c',       // On Surface (dark)
  savings: '#006c49',       // Secondary (mint)
  average: '#7e7576',       // Outline (gray)
};
```

**Line Chart (Spending Trend)**
- Line color: `#1a1c1c`
- Fill: `rgba(0, 108, 73, 0.1)` (mint with transparency)
- Dot color: `#006c49`
- Grid: `#e2e2e2`

**Bar Chart (Spending by Category)**
- Bar fill: `#006c49` (mint)
- Hover: `#4edea3` (lighter mint)
- Label: `#1a1c1c`
- Grid: `#e2e2e2`

**Pie Chart (Category Breakdown)**
- Primary color: `#006c49` (mint)
- Secondary color: `#1a1c1c` (black)
- Tertiary color: `#7e7576` (gray)
- Rotate through palette for more slices

### Transaction Table / List

**Header Row**
- Background: `#eeeeee` (Surface Container)
- Text: `#1a1c1c` (On Surface)
- Font weight: 600
- Padding: `12px 16px`

**Data Rows**
- Background: `#ffffff` (Surface Container Lowest)
- Alt row background: `#f9f9f9` (Surface) for stripe effect
- Text: `#1a1c1c` (On Surface)
- Padding: `12px 16px`
- Border bottom: `1px solid #e2e2e2`
- Hover: Light mint tint or `#f3f3f4` (Surface Container Low)

**Amount Formatting**
- Income (positive): Green text `#006c49` (Secondary), prefixed with `+`
- Expense (negative): Dark text `#1a1c1c`, prefixed with `-`

**Status Badges**
- Success: Background `#6cf8bb` (Secondary Container), text `#00714d`
- Pending: Background `#e2e2e2`, text `#4c4546`
- Error: Background `#ffdad6` (Error Container), text `#93000a`

### Input Fields & Forms

**Text Input**
- Border: `1px solid #cfc4c5` (Outline Variant)
- Background: `#ffffff` (Surface Container Lowest)
- Text: `#1a1c1c`
- Placeholder: `#7e7576` (Outline)
- Focus: Border color `#006c49` (Secondary)
- Padding: `8px 12px`
- Border radius: `4px`

**Labels**
- Color: `#1a1c1c` (On Surface)
- Font weight: 500
- Margin bottom: `4px`
- Font size: `0.875rem`

**Validation Messages**
- Error: `#ba1a1a` (Error)
- Success: `#006c49` (Secondary)

### Navigation / Menu

**Active Item**
- Background: `#006c49` (Secondary) or `#6ffbbe` (Secondary Fixed)
- Text: `#ffffff` or `#002113` (On Secondary Fixed)
- Font weight: 600

**Inactive Item**
- Text: `#4c4546` (On Surface Variant)
- Hover: Background `#eeeeee` (Surface Container)

**Divider**
- Color: `#e2e2e2` (Surface Container High)
- Height: `1px`

### Modal / Dialog

**Backdrop**
- Color: `rgba(0, 0, 0, 0.5)` (semi-transparent black)

**Modal Content**
- Background: `#ffffff` (Surface Container Lowest)
- Border radius: `12px`
- Box shadow: `0 4px 12px rgba(0, 0, 0, 0.15)`
- Title: `#1a1c1c`, font weight 600
- Content: `#1a1c1c`, font weight 400
- Padding: `24px`

**Modal Buttons**
- Primary: Black background `#000000`, white text
- Secondary: Mint border `#006c49`, mint text `#006c49`
- Cancel: Gray border `#cfc4c5`, gray text `#4c4546`

## Responsive Design

### Breakpoints

Following Tailwind CSS conventions:
- `sm`: 640px (small phones)
- `md`: 768px (tablets)
- `lg`: 1024px (desktops)
- `xl`: 1280px (large desktops)

### Dashboard Layout

**Mobile (< 768px)**
- Single column layout
- Summary cards stack vertically
- Chart takes full width
- Transaction list shows limited columns (Merchant, Amount)
- Sidebar navigation as hamburger menu

**Tablet (768px - 1024px)**
- 2-column summary cards grid
- Charts side by side
- Show more transaction columns
- Navigation as horizontal menu

**Desktop (> 1024px)**
- 4-column summary cards grid
- Multiple charts in dashboard
- Full transaction table with all columns
- Left sidebar navigation

### Spacing Scale

Using 4px base unit (Tailwind CSS):
- `4px` (1 unit): Tight spacing
- `8px` (2 units): Normal spacing between elements
- `12px` (3 units): Comfortable spacing
- `16px` (4 units): Section spacing
- `24px` (6 units): Major section spacing
- `32px` (8 units): Page-level spacing

## Typography

### Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
  sans-serif;
```

### Sizes

- H1 (Page title): 32px, weight 700, line-height 1.2
- H2 (Section title): 24px, weight 600, line-height 1.3
- H3 (Card title): 18px, weight 600, line-height 1.4
- Body: 14px, weight 400, line-height 1.5
- Small (labels, captions): 12px, weight 400, line-height 1.4
- Tiny (metadata): 11px, weight 400, line-height 1.4

## Using shadcn/ui

### Recommended Components

Install with: `npx shadcn-ui@latest add [component]`

**Core UI:**
- `button` — Primary and secondary buttons
- `card` — Container for content
- `input` — Text input fields
- `label` — Form labels
- `badge` — Status indicators
- `dialog` — Modals and confirmations

**Data Display:**
- `table` — Transaction lists
- `select` — Dropdown selectors
- `date-picker` — Date inputs

**Navigation:**
- `navigation-menu` — Main navigation
- `breadcrumb` — Navigation hierarchy

**Feedback:**
- `alert` — Error/success messages
- `toast` — Notifications

### Styling shadcn/ui Components

shadcn/ui uses Tailwind CSS. Customize with Tailwind classes:

```typescript
<Button 
  className="bg-mint text-white hover:bg-mint-dark"
  onClick={handleClick}
>
  Action
</Button>
```

Define custom colors in `tailwind.config.js`:

```javascript
theme: {
  colors: {
    mint: {
      DEFAULT: '#006c49',
      light: '#6cf8bb',
      dark: '#004d36',
    },
    surface: {
      DEFAULT: '#f9f9f9',
      dim: '#dadada',
    },
  },
}
```

## Design Checklist

Before marking a component as complete:

- [ ] Colors match the Understated Monochrome & Mint palette
- [ ] Text has sufficient contrast (WCAG AA minimum)
- [ ] Component is responsive (mobile, tablet, desktop)
- [ ] Hover and active states are defined
- [ ] Focus states visible for keyboard navigation
- [ ] Icons use Lucide React consistently
- [ ] Spacing uses the 4px unit scale
- [ ] Typography matches the font scale
- [ ] Consistent use of primary (black) and secondary (mint) colors
- [ ] Transaction amounts show income as positive (mint), expenses as negative (dark)
- [ ] Error messages use error red `#ba1a1a`
- [ ] Success messages use secondary mint `#006c49`
- [ ] Component works in light mode (dark mode optional)

## Common Design Issues & Fixes

### Issue: Text not readable on background
**Fix:** Verify contrast ratio. Use `#1a1c1c` (On Surface) on light backgrounds, `#ffffff` on dark backgrounds.

### Issue: Buttons don't look interactive
**Fix:** Add clear hover and active states. Primary: darker shade. Secondary: lighter shade.

### Issue: Mobile layout breaks on small screens
**Fix:** Use Tailwind breakpoints: `md:`, `lg:`, `xl:` prefixes. Test at 320px, 768px, 1024px widths.

### Issue: Inconsistent spacing
**Fix:** Use Tailwind spacing scale: `p-2`, `p-4`, `gap-4`, etc. (4px units).

### Issue: Chart colors clash with design
**Fix:** Use palette colors. Primary: `#006c49` (mint). Secondary: `#1a1c1c` (black). Tertiary: `#7e7576` (gray).

## Figma/Design File References

Design mockups are in `docs/design/`:
- Overview Dashboard: `docs/design/overview_dashboard_minimal/code.html`
- Transactions: `docs/design/transactions_minimal/code.html`
- Insights: `docs/design/financial_insights_minimal/code.html`
- Goals: `docs/design/goals_planning_minimal/code.html`
- Color Palette: `docs/design/understated_monochrome_mint/` (reference)
- Design Specs: `docs/design/DESIGN.md`

Use these as reference for layouts and component styling.

## Next Steps

When implementing a new component:
1. Check the design mockups in `docs/design/`
2. Identify which palette colors to use
3. Apply Understated Monochrome & Mint colors
4. Ensure responsive design for mobile/tablet/desktop
5. Verify color contrast and accessibility
6. Test hover, active, and error states
7. Use shadcn/ui where applicable
8. Reference this skill for color and styling decisions
