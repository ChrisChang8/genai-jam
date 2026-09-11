---
name: Understated Monochrome & Mint
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f4'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#4c4546'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#7e7576'
  outline-variant: '#cfc4c5'
  surface-tint: '#5e5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1b1b1b'
  on-primary-container: '#848484'
  inverse-primary: '#c6c6c6'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#151c27'
  on-tertiary-container: '#7d8492'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#dce2f3'
  tertiary-fixed-dim: '#c0c7d6'
  on-tertiary-fixed: '#151c27'
  on-tertiary-fixed-variant: '#404754'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
  mint-vibrant: '#00d084'
  mint-deep: '#059669'
  mint-surface: '#ecfdf5'
  border-hairline: '#e5e7eb'
  border-subtle: '#f3f4f6'
  slate-text-muted: '#9ca3af'
  canvas-neutral: '#fafafa'
typography:
  display-hero:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  metric-tabular:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.06em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 2rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system delivers an ultra-minimalist, functional financial experience inspired by the disciplined reduction of Uber Base and high-end modern fintech. It eliminates decorative noise, synthetic gradient glows, and speculative AI card tropes in favor of absolute typographic authority, structural clarity, and purposeful utility.

### Visual Character
- **Monochrome Foundation:** The canvas is strictly achromatic—pure black (`#000000`), stark white (`#FFFFFF`), and calibrated neutral gray dividers (`#E5E7EB` / `#F3F4F6`). 
- **Singular Chromatic Purpose:** Mint green (`#10B981`) serves as the sole chromatic accent, dedicated exclusively to positive values, active toggle states, and confirmation flags. Negative data and warnings rely on muted slate-gray or restrained crimson outlines without breaking the monochrome discipline.
- **Extreme Breathing Room:** Generous internal whitespace replaces heavy borders, drop shadows, and complex container tiers. Form follows clarity: density lives in tabular numbers, while spatial composition creates calm around high-stakes metrics.

## Colors

The system employs a hyper-disciplined monochromatic scale punctuated by a single vibrant mint green accent. Color is never decorative; it acts strictly as visual telemetry.

### Palette Architecture
- **Primary (`#000000`):** Pure solid black for dominant CTA buttons, core headlines, heavy monetary totals, and prominent navigation elements.
- **Secondary / Accent (`#10B981`):** The signature vibrant mint green. Applied exclusively to positive yields, active tab indicators, completed transaction checks, and focused states. Light variations (`#ECFDF5`) serve as subtle backgrounds for pill badges.
- **Tertiary (`#6B7280`):** Balanced neutral slate for secondary body copy, field hints, column headers, and structural metadata.
- **Neutral Canvas (`#FFFFFF` & `#FAFAFA`):** Pure white dominates cards and viewport containers, resting on an ultra-subtle off-white backing (`#FAFAFA`) to establish separation without relying on shadows.

### Boundaries & Outlines
- **Borders (`#E5E7EB` & `#F3F4F6`):** Razor-thin 1px outlines deliver structural containment. Never apply colored borders unless signaling active interactive focus (`#000000` or `#10B981`).

## Typography

Typography relies entirely on **Inter** to ensure maximum typographic precision and mechanical neutrality.

### Key Rules
- **Tabular Numerics:** All currency indicators, ledger tables, asset quantities, and percentage deltas must enforce OpenType tabular figures (`font-variant-numeric: tabular-nums`). This eliminates horizontal text shifting when data refreshes live.
- **Negative Tracking:** Large headline levels and display amounts leverage tight letter spacing (`-0.02em` to `-0.03em`), creating a commanding, monolithic aesthetic reminiscent of international modernist signage.
- **Data Scannability:** Micro labels and column descriptors use `label-caps` set in uppercase with wide tracking (`+0.06em`) in tertiary slate (`#6B7280`), forming an instant distinction between labels and balance figures.

## Layout & Spacing

The layout is anchored on an 8-point harmonic grid system designed for effortless parsing of financial ledgers, account summaries, and action panels.

### Grid Geometry
- **Mobile (< 768px):** 4-column fluid layout with `1rem` outer canvas padding. Component cards stretch full viewport width.
- **Tablet (768px – 1024px):** 8-column layout with `2rem` side margins, allowing card pairings and side-by-side transaction/detail panes.
- **Desktop (> 1024px):** 12-column structure with `3rem` canvas margins and a fixed 240px navigation dock. Max-width content boundary is constrained to 1380px to preserve generous white space and prevent horizontal line drift.

### Spatial Rhythms
- **Canvas Breathing Room:** Section blocks and dashboard groups are separated by `space-xl` (40px) to prevent cognitive overload.
- **Internal Card Padding:** High-visibility overview modules utilize `space-lg` (24px) for expansive framing. Data rows and list items compact down to `space-sm` (8px) and `space-md` (16px) for optimal row density.

## Elevation & Depth

Depth in this system is planar, structural, and tactile, relying entirely on physical hairplanes rather than artificial blur shadows or colored glows.

### Spatial Tiers
- **Layer 0 (Canvas):** Minimal neutral background tint (`#FAFAFA`).
- **Layer 1 (Cards & Data Panels):** Solid white (`#FFFFFF`) surface framed strictly by a 1px solid hairline border (`#E5E7EB`). Drop shadows are eliminated (`box-shadow: none`), relying purely on edge definition.
- **Layer 2 (Dropdowns & Context Menus):** Pure white panels elevated solely by a subtle, razor-thin ambient occlusion shadow:
  `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);` combined with a 1px `#E5E7EB` border.
- **Layer 3 (Modals & Focus Dialogs):** Centered white container with a 1px border over an achromatic dark scrim (`rgba(0, 0, 0, 0.45)` with no blur), ensuring crisp foreground dominance without fuzzy translucency.

## Shapes

The geometric architecture balances soft comfort with architectural precision.

- **Primary Cards & Containers:** Standardized at `0.75rem` (12px, corresponding to modern `rounded-xl` specifications). This provides crisp modern borders that soften density without appearing bubbly.
- **Buttons & Interactive Fields:** Configured at `0.5rem` to `0.625rem` (8px–10px) to offer distinct geometric contrast against larger 12px outer card boundaries.
- **Status Pills & Metric Badges:** Full circular caps (`rounded-full` / 9999px) to immediately signal compact metadata and status tokens.
- **Dividers:** 1px hairline lines without rounded caps or feathered edges.

## Components

### Buttons
- **Primary:** Solid `#000000` background with crisp `#FFFFFF` text. Height 44px, border radius 10px, font weight semibold (14px). Hover state shifts subtly to `#1F2937` with no glow.
- **Accent Action:** Solid `#10B981` mint green background with `#FFFFFF` text, strictly reserved for primary transaction commits, transfers, or confirmations.
- **Secondary / Outlined:** `#FFFFFF` background, 1px solid `#E5E7EB` border, `#000000` text. Hover transitions to `#F9FAFB`.

### Cards
- **Overview & Asset Cards:** `#FFFFFF` background, 12px radius, 1px border (`#E5E7EB`), internal padding of 24px (`space-lg`). Includes a muted uppercase label (`label-caps`), tabular balance indicator, and an optional mint delta pill.
- **Zero-Shadow Rule:** Cards remain strictly flat against the `#FAFAFA` foundation; depth is established solely by hairline borders and internal spacing.

### Metric Badges & Chips
- **Positive Delta Chip:** Pill-shaped (`rounded-full`), height 22px, horizontal padding 8px. Filled with `#ECFDF5` background and bold `#059669` or `#10B981` text. Preceded by a directional arrow (`↑`).
- **Neutral / Static Tag:** Light gray background (`#F3F4F6`), `#374151` text, 9999px border radius.

### Input Fields & Controls
- **Text Inputs:** Height 44px, white background, 8px radius, 1px border (`#E5E7EB`), text `#000000`. On focus, the border sharpens to solid `#000000` with a 1px clean ring—no colored halos.
- **Segmented Selectors (Period Toggles):** Background track `#F3F4F6` with 8px radius. Active segment renders as an elevated `#FFFFFF` card with a 1px `#E5E7EB` border and semibold black text.

### Data Lists & Ledgers
- **Transaction Item:** Minimalist row separated by 1px hairline divider (`#F3F4F6`). Left: simple 36px circular avatar or geometric category icon with `#F3F4F6` background. Center: counterparty name in `#000000` (`body-md` medium) with timestamp in `#6B7280`. Right: monetary figure in `metric-tabular`. Positive cash inflow figures render in bold `#10B981`, expenses in `#000000`.