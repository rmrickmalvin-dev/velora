# PROJECT STATE - VELORA

Last update: 2026-08-26

## Phase

BUILD 02 - Storefront and Design System

## State

IN PROGRESS

## BUILD 01

CLOSED AND VALIDATED

## Latest validated step

PASSO 27 - Storefront Accessibility, SEO and BUILD 02 Visual Quality Expansion

## Accessibility expansion

Storefront home, category and Product detail now provide:

- keyboard skip links
- explicit focus-visible treatment
- localized primary navigation labels
- localized language navigation labels
- reduced-motion preservation
- increased-contrast token support

Product discovery continues to provide:

- polite result announcements
- pressed-state category filters
- hidden search label

## Skip-link targets

Home:

`#storefront-main-content`

Category:

`#category-main-content`

Product:

`#product-main-content`

## SEO foundation

Presentation now provides:

`StorefrontSeoModel`

For home, category and Product routes it produces:

- title
- description
- canonical locale path
- PT-BR alternate
- EN alternate
- ES alternate
- x-default alternate
- explicit index/follow intent

## SEO route identity

Home:

`/{locale}`

Category:

`/{locale}/categories/{category}`

Product:

`/{locale}/products/{slug}`

Language alternates preserve the current route suffix.

## Structured data policy

PASSO 27 does not emit Product Offer structured data.

VELORA products are fictional portfolio content and payment is not real.

SEO quality must not create false commercial claims.

## Quality Gate

Latest evidence:

- PASSO 27 targeted tests: 22/22
- complete suite: 283/283
- 36 test files passed
- lint passed
- typecheck passed
- production build passed
- home SSG passed
- category SSG passed
- Product SSG passed
- PT-BR / EN / ES preserved
- `npm run check` passed

## Decisions

After PASSO 27:

`CODAL-DEC-001 -> CODAL-DEC-146`

Next available decision:

`CODAL-DEC-147`

## Next step

PASSO 28 - BUILD 02 Final Visual Review, Responsive Hardening and Closure.