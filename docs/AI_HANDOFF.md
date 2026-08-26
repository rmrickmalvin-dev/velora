# AI HANDOFF - VELORA

Last update: 2026-08-26

CODAL OS - Complete Edition active.

## State

BUILD 01 - CLOSED

BUILD 02 - IN PROGRESS

Latest validated step:

PASSO 25 - Storefront Product Discovery and Product Card Interaction

## Discovery

Client component:

`ProductDiscovery`

Pure filter logic:

`filterStorefrontProducts`

Discovery receives already-built Presentation Product cards.

It must not import repositories or persistence providers.

## Product routes

Canonical:

`/{locale}/products/{slug}`

Product detail page uses:

- createStaticVeloraRuntime
- VeloraApplication.getStorefrontProductBySlug
- buildStorefrontProductDetailModel
- ProductDetail

## Locale rule

Product card navigation includes locale.

Product detail locale switch preserves the same Product slug.

## Commerce rule

Do not add browser Cart persistence in BUILD 02.

Product detail is read-only.

Interactive add-to-cart begins in BUILD 03 unless a later official decision changes the phase plan.

## Search rule

Current search/filter is Presentation-only.

Do not expand Domain or repository APIs for the current 8-Product catalog without evidence that scale or requirements changed.

## Quality Gate

```text
PASSO 25 targeted: 16/16
Full suite:         247/247
Test files:         31/31
lint:               passed
typecheck:          passed
build:              passed
check:              passed
```

## Decisions

After PASSO 25:

`CODAL-DEC-001 -> CODAL-DEC-131`

Next:

`CODAL-DEC-132`

## Next action

PASSO 26 - Storefront Navigation, Category Journeys and Visual Product Media Foundation.

Focus:

- make category cards navigable
- preserve category intent
- improve Product navigation
- prepare local visual Product media strategy
- keep CSS art as safe fallback

## Reading order

1. docs/PROJECT_STATE.md
2. docs/DECISIONS.md
3. docs/DOMAIN.md
4. docs/QUALITY_STATE.md
5. docs/STACK.md
6. docs/BUILD_01_CLOSURE.md
7. docs/DESIGN_SYSTEM.md
8. CHANGELOG.md