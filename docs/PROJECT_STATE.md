# PROJECT STATE - VELORA

Last update: 2026-08-27

## Phase

BUILD 04 - Application and Data Experience

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

PASSO 42 - Product Detail Runtime Sync, Localization Integrity and BUILD 04 Readiness.