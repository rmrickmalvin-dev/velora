# AI HANDOFF - VELORA

Last update: 2026-08-26

CODAL OS - Complete Edition active.

## State

BUILD 01 - CLOSED

BUILD 02 - IN PROGRESS

Latest validated step:

PASSO 27 - Storefront Accessibility, SEO and BUILD 02 Visual Quality Expansion

## Accessibility

Use:

`getStorefrontAccessibilityCopy`

for localized accessibility-only labels.

Preserve:

- skip links
- visible focus
- reduced motion
- increased contrast
- polite search results
- pressed-state filters

## SEO

Use:

`buildStorefrontSeoModel`

for localized Storefront metadata.

Do not hand-build inconsistent canonical or language alternate paths in route files.

## Canonical journeys

Home:

`/{locale}`

Category:

`/{locale}/categories/{category}`

Product:

`/{locale}/products/{slug}`

## Structured data rule

Do not add Product Offer structured data while VELORA is a fictional portfolio store without real payment.

## Quality Gate

```text
PASSO 27 targeted: 22/22
Full suite:         283/283
Test files:         36/36
lint:               passed
typecheck:          passed
build:              passed
check:              passed
```

## Decisions

After PASSO 27:

`CODAL-DEC-001 -> CODAL-DEC-146`

Next:

`CODAL-DEC-147`

## Next action

PASSO 28 - BUILD 02 Final Visual Review, Responsive Hardening and Closure.

Focus:

- responsive hardening
- visual consistency audit
- navigation quality
- overflow protection
- BUILD 02 closure evidence
- prepare BUILD 03 Commerce Interaction