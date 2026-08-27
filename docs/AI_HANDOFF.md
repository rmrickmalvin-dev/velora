# AI HANDOFF - VELORA

Last update: 2026-08-27

CODAL OS - Complete Edition active.

## State

BUILD 04 - IN PROGRESS

Latest validated step:

PASSO 41 - Search, Discovery Intelligence and Catalog Navigation Refinement

## Search Intelligence

Use:

`buildStorefrontSearchExperience`

Search is:

- accent-insensitive
- multi-term AND
- deterministic
- ranked only when query exists

Searchable fields:

- Product name
- Brand
- localized Category label
- slug

## Discovery URL state

Browser adapter:

`browser-discovery-navigation`

Parameters:

- `q`
- `category`

Product Search input and Category controls must use:

`updateDiscovery`

Do not reintroduce direct Category-only state changes that bypass URL synchronization.

Initial URL-state React updates are queued inside the effect.

## Persistent Catalog compatibility

Keep:

- `loadBrowserStorefrontProductCards`
- `subscribeBrowserStorefrontDataChanged`

## Design Token quality

All referenced VELORA CSS variables under `src` must resolve to the primary Design Token registry.

Primary definitions are unique.

Registered scoped overrides are valid.

## Quality Gate

```text
PASSO 41 targeted: 50/50
Full suite:         787/787
Test files:         99/99
ESLint warnings:    0
typecheck:          passed
build:              passed
check:              passed
```

## Decisions

After PASSO 41:

`CODAL-DEC-001 -> CODAL-DEC-278`

Next:

`CODAL-DEC-279`

## Next action

PASSO 42 - Product Detail Runtime Sync, Localization Integrity and BUILD 04 Readiness.

Focus:

- Product Detail browser-persistent Catalog synchronization
- persistent price/name/stock parity between Discovery and Detail
- PT-BR/ES human-facing accent integrity
- bounded i18n regression tests
- BUILD 04 readiness audit
- close BUILD 04 only if all gates pass