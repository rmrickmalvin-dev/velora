# PROJECT STATE - VELORA

Last update: 2026-08-27

## Phase

BUILD 05 - Quality

## State

IN PROGRESS

## BUILD 01

CLOSED AND VALIDATED

## BUILD 02

CLOSED AND VALIDATED

## BUILD 03

CLOSED AND VALIDATED

## Latest validated step

PASSO 41 - Search, Discovery Intelligence and Catalog Navigation Refinement

## Search Intelligence

Product Discovery now uses ranked, accent-insensitive Search Intelligence.

Searchable Presentation fields:

- Product name
- Brand
- localized Category label
- stable Product slug

Multi-term queries require every term to match.

Empty queries preserve the existing Catalog order.

## Discovery navigation

Search state is represented by URL query parameters:

- `q`
- `category`

Typing uses `history.replaceState`.

Browser back/forward is synchronized through `popstate`.

Category controls use the same `updateDiscovery` path as Search input so visible state and URL state remain equivalent.

Search state is not stored in localStorage.

## Suggestions

Suggestions are derived only from the current browser Catalog.

No network Search, analytics or external recommendation system is used.

## Persistent data compatibility

Product Discovery continues to react to browser-persistent:

- Product edits
- Variant price edits
- Inventory changes

## Design Token integrity

Every referenced VELORA CSS variable under `src` must exist in the primary Design Token registry.

Primary registry definitions are unique.

Registered scoped overrides remain allowed.

Added referenced tokens:

- `--velora-ink-400`
- `--velora-gold-800`
- `--velora-gold-400`
- `--velora-space-7`

## Quality Gate

Latest evidence:

- PASSO 41 targeted tests: 50/50
- complete suite: 787/787
- 99 test files passed
- ESLint zero warnings
- typecheck passed
- production build passed
- `npm run check` passed

## Decisions

After PASSO 41:

`CODAL-DEC-001 -> CODAL-DEC-278`

Next available decision:

`CODAL-DEC-279`

## Next step

PASSO 44 - Keyboard, Dialog Focus, Navigation and Runtime Accessibility Hardening.

## PASSO 42 - BUILD 04 Closure

Status: CLOSED AND VALIDATED

Product Detail now preserves the SSG route as its initial shell and synchronizes the visible Product name, Brand, Variant prices and Inventory state from the browser-persistent Application runtime.

Catalog and Inventory change events refresh the Product Detail through the existing Storefront Feature adapter.

PT-BR and ES human-facing localization debt identified by the BUILD 04 audit was repaired with source-safe TypeScript Unicode escapes.

BUILD 04 closure evidence:

- 102 test files
- 811 tests
- zero failures
- ESLint zero warnings
- typecheck passed
- production build passed
- 57 static pages preserved

Official decisions:

`CODAL-DEC-001 -> CODAL-DEC-288`

Next available decision:

`CODAL-DEC-289`

Next phase:

BUILD 05 - Quality.

## PASSO 43 - Runtime Quality Harness

Status: COMPLETED AND TECHNICALLY VALIDATED

BUILD 05 is IN PROGRESS.

The first BUILD 05 pass adds browser-executed quality evidence without replacing existing source-level contracts.

Added:

- Playwright Chromium harness
- axe browser accessibility checks
- PT-BR, EN and ES Home coverage
- PT-BR, EN and ES Category coverage
- PT-BR, EN and ES Product coverage
- isolated browser test server on port 3100
- separate `test:e2e` script
- aggregate `quality` script
- Playwright report and test-result ignore rules

Existing global focus-visible and reduced-motion foundations remain preserved.

Evidence:

- PASSO 43 source contract: 8/8
- browser accessibility E2E: 9/9
- Vitest suite: 819/819
- test files: 103/103
- ESLint zero warnings
- TypeScript passed
- production build passed
- 57/57 static pages preserved

Next available decision:

`CODAL-DEC-297`

Next step:

PASSO 44 - Keyboard, Dialog Focus, Navigation and Runtime Accessibility Hardening.
