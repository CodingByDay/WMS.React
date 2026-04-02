# WMS React — design system plan

This document defines **one consistent language** for padding, typography, color, and components. Implementation uses **CSS custom properties** in `src/design/design-tokens.css`. The **`/canvas`** route is the living preview: tokens, samples, and the home menu layout before rolling changes across all screens.

## Principles

1. **Single source of truth** — spacing and type use the `--wms-*` variables; avoid ad-hoc `px` for new UI.
2. **Brand** — keep primary navy `#081a45` and orange accent for actions; do not introduce a second primary hue without a deliberate rebrand.
3. **Density** — warehouse UIs stay **readable at arm’s length**: minimum body text `14px` (`--wms-text-sm`) where tables dominate; `16px` (`--wms-text-base`) for home and settings forms.
4. **Alignment** — page content uses a **max width** (`--wms-page-max-width`) with horizontal padding (`--wms-page-padding-x`).

## Typography scale

| Token | Rem | Use |
|--------|-----|-----|
| `--wms-text-xs` | 12 | Captions, meta, table secondary |
| `--wms-text-sm` | 14 | Form labels, dense tables, buttons (compact) |
| `--wms-text-base` | 16 | Body, tile titles, default inputs |
| `--wms-text-lg` | 18 | Section titles |
| `--wms-text-xl` | 20 | Page titles (secondary) |
| `--wms-text-2xl` | 24 | Page titles (primary) |
| `--wms-text-3xl` | 30 | Marketing / login hero only |

**Rule:** new screens use **at most two levels** above body for hierarchy (e.g. `2xl` title + `sm` label).

## Spacing scale

Base unit **4px**. Use tokens only:

`--wms-space-1` (4) → `2` (8) → `3` (12) → `4` (16) → `5` (20) → `6` (24) → `8` (32) → `10` (40) → `12` (48).

**Rules:**

- **Page padding:** `--wms-page-padding-x` / `--wms-page-padding-y` (currently tied to `space-6`).
- **Between form fields:** `space-4` vertical.
- **Between cards / tiles:** `space-4`–`space-6` gap in grid.
- **Inside cards:** `space-5`–`space-6` padding.

## Color

- **Primary:** `--wms-color-primary` — headers, key actions, focus rings (where applicable).
- **Accent:** `--wms-color-accent` — secondary CTAs consistent with existing orange gradient buttons in the shell.
- **Surfaces:** `--wms-color-bg-app` (page), `--wms-color-bg-elevated` (cards, modals).
- **Text:** `--wms-color-text`, `--wms-color-text-muted` for descriptions.

## Components (rollout order)

1. **Done:** Home menu — `WmsHomeTiles` (stacked navy buttons + tokens). `/canvas` for token preview.
2. **Done:** App-wide **layout** (`wms-layout.css`) — shared background, font, horizontal padding on `main-container` content, listing body, transactions, settings tables, stock filters + grid margins.
3. **Done:** **Tables** (`wms-tables.css`, loaded after `App.css`) — `wms-data-table` + `wms-table-wrap` on shared `Table`, `UserTable`, `TableForgeDashboard`, import wizard; **DevExtreme DataGrid** header/row/hover aligned to tokens; react-table class prefix fallback for any table without the utility class.
4. **Next:** Pagination / filter toolbars (`paginationControls`, search strips) to use tokens instead of hard-coded hex.
4. **Last:** Popups and Ant Design overrides mapped to tokens where possible.

## Files

| File | Role |
|------|------|
| `src/design/design-tokens.css` | Variables |
| `src/components/WmsHomeTiles.css` | Home grid + tiles |
| `src/canvas/DesignCanvas.css` | Canvas-only token showcase |
| `src/design/DESIGN_PLAN.md` | This document |

When adding screens, import patterns from `/canvas` and reuse `--wms-*` before writing new pixel values.
