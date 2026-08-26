# PROJECT STATE - VELORA

Last update: 2026-08-26

## Project

VELORA - professional conceptual e-commerce for smartphones, accessories and mobile technology.

## Phase

BUILD 02 - Storefront and Design System

## State

IN PROGRESS

## BUILD 01

CLOSED AND VALIDATED

## Latest validated step

PASSO 25 - Storefront Product Discovery and Product Card Interaction

## Storefront discovery

The home Storefront now exposes the full active catalog through a client-side discovery surface.

Available:

- Product/brand search
- category filters
- result count
- empty state
- locale-safe Product links
- interactive Product cards

Discovery works on Presentation models already delivered by SSG.

It does not access repositories or persistence providers in the browser.

## Product cards

Cards now link to canonical Product detail routes:

```text
/{locale}/products/{slug}
```

Examples:

```text
/pt-BR/products/aster-one-x-pro
/en/products/aster-one-x-pro
/es/products/aster-one-x-pro
```

## Product detail route

Product detail pages are statically generated from Application data.

The route loads Product data through:

```text
StaticVeloraRuntime
|
v
VeloraApplication
|
v
getStorefrontProductBySlug
```

The page does not read the seed directly.

## Detail presentation

Each Product detail exposes:

- Product brand
- Product name
- localized category
- active variants
- SKU
- variant attributes
- locale-aware price
- Inventory quantity
- availability state
- locale switch preserving Product slug

## Commerce boundary

Product detail remains read-only in BUILD 02.

Add-to-cart UI interaction is intentionally deferred to BUILD 03 - Commerce Interaction.

The existing Application Cart Use Cases remain ready for that phase.

## Search semantics

Search is Presentation-only at current catalog scale.

It is:

- case-insensitive
- accent-normalized
- brand-aware
- Product-name-aware
- category-aware

No repository contract was changed.

## Quality Gate

Latest evidence:

- PASSO 25 targeted tests: 16/16
- complete suite: 247/247
- 31 test files passed
- lint passed
- typecheck passed
- production build passed
- Storefront home SSG passed
- Product detail SSG passed
- PT-BR / EN / ES preserved
- `npm run check` passed

## Decisions

After PASSO 25:

`CODAL-DEC-001 -> CODAL-DEC-131`

Next available decision:

`CODAL-DEC-132`

## Next step

PASSO 26 - Storefront Navigation, Category Journeys and Visual Product Media Foundation.