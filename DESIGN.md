---
name: AeroPrecision
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#45464d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#006398'
  on-secondary: '#ffffff'
  secondary-container: '#5bb8fe'
  on-secondary-container: '#00476e'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#2a1700'
  on-tertiary-container: '#b87500'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#cce5ff'
  secondary-fixed-dim: '#93ccff'
  on-secondary-fixed: '#001d31'
  on-secondary-fixed-variant: '#004b73'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Helvetica Neue
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Helvetica Neue
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Helvetica Neue
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Helvetica Neue
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Helvetica Neue
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.005em
  title-md:
    fontFamily: B612
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
  title-sm:
    fontFamily: B612
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  body-lg:
    fontFamily: B612
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: B612
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: B612
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  data-mono-lg:
    fontFamily: OCR-B
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 22px
    letterSpacing: -0.02em
  data-mono-md:
    fontFamily: OCR-B
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: -0.01em
  data-mono-sm:
    fontFamily: OCR-B
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.02em
  label-caps:
    fontFamily: OCR-B
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 12px
    letterSpacing: 0.08em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  space-xxs: 0.125rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
  space-2xl: 2rem
  space-3xl: 3rem
  space-4xl: 4rem
  gutter-mobile: 1rem
  gutter-tablet: 1.5rem
  gutter-desktop: 2rem
  max-width-content: 1280px
---

## Brand & Style

This design system serves an audience that demands both the operational clarity of professional flight dispatch tools and the refined utility of high-end travel booking platforms. The brand voice balances technical authority with consumer poise: authoritative, analytical, and uncluttered, yet friction-free and human.

The design philosophy combines **Technical Modernism** with **Data-Dense Utility**:
- **Information Architecture:** Aviation metrics (ICAO/IATA codes, tail variants, fuselage types, seat layouts) take priority alongside traditional fare and schedule variables. Data is structured cleanly without extraneous decoration.
- **Visual Tone:** Crisp atmospheric neutrals paired with deep oceanic midnight tones, electrified by avionics cyan accents and high-visibility alert markers. Surfaces feel machined, calibrated, and ultra-sharp.
- **Emotional Resonance:** Precision, confidence, and aviation expertise. Users should feel like they are operating an instrument-grade flight scanner that surfaces the definitive equipment details others hide.

## Colors

The palette draws inspiration from aircraft cockpits, heads-up displays (HUD), and crisp high-altitude horizons.

- **Primary (`#0F172A` - Deep Stratosphere):** Grounding foundation used for primary structural headers, key navigational chrome, and dominant typography.
- **Secondary (`#0284C7` - Supersonic Cyan / Cobalt):** Active states, interactive affordances, flight path vector paths, aircraft family focus indicators, and focal data triggers.
- **Tertiary (`#F59E0B` - Avionics Amber):** Functional highlights, alert badges, aircraft transition warnings, prototype status, and limited-seat alerts.
- **Neutral Palette:** 
  - Canvas & Base: `#FFFFFF` (pure daylight white) and `#F8FAFC` (cool atmospheric slate).
  - Borders & Dividers: `#E2E8F0` (calibrated zinc) and `#CBD5E1`.
  - Secondary Text & Metadata: `#64748B` (technical muted slate) and `#334155` (graphite slate for secondary headers).
  - Status Success: `#10B981` (green beacon).

## Typography

The typographic system utilizes a tri-font hierarchy:
1. **Space Grotesk** anchors primary display headings, model name showcases, and marketing entry points with geometric precision and subtle aerodynamic angles.
2. **Inter** handles narrative readability, descriptive copy, travel policy notices, and standard form inputs.
3. **JetBrains Mono** surfaces flight operational metrics: IATA/ICAO airport pairs (`LHR → HND`), tail registrations, engine designations (`GE9X`, `Trent XWB`), seat configuration formulas (`1-2-1 / 3-3-3`), flight numbers, and time stamps.

Numbers in flight search matrices must always use tabular figures (`font-variant-numeric: tabular-nums`) to prevent layout shifting across dynamic pricing and schedule filters.

## Layout & Spacing

A 12-column fluid grid system anchored by an 8-point base spatial cadence. Structural cards and micro-indicators may drop to 4px increments (`space-xs`) for dense telemetry modules.

- **Desktop (1024px+):** 12 columns, 24px gutters, maximum container width of 1280px. Split layouts feature fixed flight filters and equipment sub-selectors (320px sidebar) pinned adjacent to fluid flight result feeds.
- **Tablet (768px – 1023px):** 8 columns, 20px gutters. Filters collapse into a technical modal drawer with rapid toggle badges.
- **Mobile (<768px):** 4 columns, 16px horizontal margins. Horizontal scrolling pill bars accommodate continuous equipment selection (e.g., A350 vs. B777-300ER vs. A380-800).

Vertical spacing maintains tight cohesion between related metrics (e.g., 4px between airport code and terminal details, 16px between independent flight legs).

## Elevation & Depth

This design system avoids heavy blurred skeuomorphic drop shadows in favor of **Calibrated Technical Layers** with crisp micro-borders and directional ambient illumination:

- **Base Layer (Level 0):** Background foundation (`#F8FAFC`). Flat, un-elevated canvas.
- **Instrument Surface (Level 1):** Standard search cards, leg summaries, and filter blocks. Uses pure `#FFFFFF` fill bounded by a 1px micro-border (`#E2E8F0`) and an imperceptible ambient shadow: `0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.02)`.
- **Hover & Selected Equipment State (Level 2):** Flight cards under inspection or active aircraft nodes elevate slightly with a sharper boundary: `0 4px 12px -2px rgba(15, 23, 42, 0.08), 0 2px 6px -2px rgba(15, 23, 42, 0.04)` and border shift to `#CBD5E1` (or `#0284C7` if active).
- **Overlays, Drawers & Avionics Popovers (Level 3):** Aircraft seat configuration maps, technical spec drawers, and tail registry sheets: `0 20px 25px -5px rgba(15, 23, 42, 0.12), 0 8px 10px -6px rgba(15, 23, 42, 0.04)`.

## Shapes

The design system adopts **Level 1 (Soft)** roundedness. Crisp geometry reflects aeronautical engineering: sharp, machined, and purposeful rather than overly rounded or whimsical.

- **Primary Cards & Panels:** `0.375rem` (6px) or `0.5rem` (8px).
- **Data Chips, Status Badges & Aviation Tags:** `0.25rem` (4px) to retain structural rigidity and tabular alignment.
- **Pill Filters (Interactive Selectors):** Explicit full-radius caps (`rounded-full` / 9999px) are reserved strictly for interactive toggle pills (e.g., equipment category filter buttons: *Widebody*, *Upper Deck*, *Twin-Aisle*) to differentiate actionable toggles from non-interactive metadata badges.

## Components

### Buttons & Interactive Controls
- **Primary Flight Action:** Deep Stratosphere (`#0F172A`) solid background with pure white text, 8px radius, height 40px/48px, subtle hover transition to `#1E293B`.
- **Secondary / Action CTA:** Vibrant Supersonic Cyan (`#0284C7`) background with white typography, designed for booking and flight path exploration.
- **Technical Ghost Button:** 1px border (`#E2E8F0`), transparent background, Inter 14px SemiBold, JetBrains Mono supplemental data tag.

### Aircraft & Route Badges
- **Fuselage / Model Badge:** High-contrast, micro-bordered rectangle (`#F1F5F9` background, `#334155` text, 1px `#CBD5E1` border). Uses `JetBrains Mono` 11px uppercase (e.g., `A350-900 | ULTRA-LONG HAUL`).
- **Cabin Architecture Pill:** Tinted indicator with subtle color signifiers:
  - *Widebody / Twin Aisle:* Cyan wash (`#E0F2FE` background, `#0369A1` text).
  - *Double Deck / Rare Fleet:* Amber wash (`#FEF3C7` background, `#B45309` text, `#FDE68A` border).
  - *Carbon Composite (B787 / A350):* Emerald wash (`#ECFDF5` background, `#047857` text).

### Flight Leg Timelines
- Horizontal progress track rendered in `#E2E8F0` with solid `#0284C7` vector indicators at waypoints. 
- Transfer/layover stops feature a 10px hollow dot revealing equipment change warnings in tertiary amber (`#F59E0B`) if the connection involves downgauging to regional equipment.
- Monospaced flight duration (`09H 45M`) and route codes aligned above and below the timeline node.

### Input Fields & Technical Dropdowns
- Crisp 1px border (`#CBD5E1`) focusing to a 1.5px `#0284C7` ring. 
- Integrated leading prefix badges (e.g., `FROM`, `TO`, `AIRFRAME:`) styled in uppercase JetBrains Mono (`label-caps`).

### Result Cards
- Multi-tier structured card:
  - **Top Row:** Carrier, equipment flagship badge, and direct fare.
  - **Middle Row:** Time, route timeline, layover node, tail type code.
  - **Bottom Deck (Technical Spec Bar):** Monospaced spec summary highlighting Seat Pitch (`34"`), Wi-Fi Generation (`Ka-Band Satellite`), Seat Model (`Collins Horizon`), and Engine Variant (`RR Trent 1000`).

use the following refrence

D:\Git\Which Plane\whichplane.app\stitch_whichplane_aircraft_flight_search_reference\filelist.txt