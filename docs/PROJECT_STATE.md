# PROJECT STATE - VELORA

Last update: 2026-08-26

## Phase

BUILD 02 - Storefront and Design System

## State

IN PROGRESS

## BUILD 01

CLOSED AND VALIDATED

## Latest validated step

PASSO 26 - Storefront Navigation, Category Journeys and Visual Product Media Foundation

## Category journeys

Storefront category cards now navigate to canonical locale-safe routes:

```text
/{locale}/categories/{category}
```

Categories:

- smartphone
- audio
- power
- protection

Category pages are statically generated and use Application Storefront data.

## Category route behavior

Each category page provides:

- localized title
- localized journey copy
- search inside the selected category
- Product cards
- locale switch preserving category
- locale-safe back navigation

## Product media foundation

Presentation now carries two separate visual concepts:

1. canonical ProductMedia reference from Application data
2. local fallback visual asset for current portfolio rendering

Canonical seeded ProductMedia paths are preserved.

They are not rewritten or mutated.

## Local visual fallbacks

Local SVG fallback assets now exist for:

- smartphone
- audio
- power
- protection

Path family:

`/images/velora/*.svg`

These assets replace the previous CSS-only Product object shapes in Product discovery and Product detail.

## Shared ProductVisual

`ProductVisual` is the shared rendering primitive for:

- category cards
- Product cards
- Product detail

The Product visual can evolve later from fallback SVG to final ProductMedia without changing Domain or Application.

## Media architecture

```text
ProductMedia from Application
        |
        v
StorefrontProductVisual
        |
        +-- canonicalMediaUrl
        +-- canonicalAlt
        `-- fallbackAsset
                 |
                 v
            ProductVisual
```

## Quality Gate

Latest evidence:

- PASSO 26 targeted tests: 14/14
- complete suite: 261/261
- 33 test files passed
- lint passed
- typecheck passed
- production build passed
- home Storefront SSG passed
- Product detail SSG passed
- category journey SSG passed
- PT-BR / EN / ES preserved
- `npm run check` passed

## Decisions

After PASSO 26:

`CODAL-DEC-001 -> CODAL-DEC-139`

Next available decision:

`CODAL-DEC-140`

## Next step

PASSO 27 - Storefront Accessibility, SEO and BUILD 02 Visual Quality Expansion.