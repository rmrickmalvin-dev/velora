# AI HANDOFF - VELORA

Last update: 2026-08-27

CODAL OS - Complete Edition active.

## State

BUILD 04 - IN PROGRESS

Latest validated step:

PASSO 40 - Promotions, Pricing Simulator and Commercial Controls

## Admin Commercial UI

Component:

`AdminCommercialPanel`

It reads current Variant prices through:

`loadBrowserAdminCatalog`

## Simulator

Pure Feature model:

`admin-commercial-simulator-model`

Supports:

- cost parsing
- discount basis points
- promotional price
- gross profit
- gross margin
- Promotion scenario validation

## Browser persistence

Adapter:

`browser-demo-promotions`

Storage key:

`velora.demo.promotions.v1`

React must not access localStorage directly.

## Important boundary

Promotion scenarios are simulations only.

They do not mutate:

- ProductVariant price
- Storefront
- Cart
- checkout
- Order
- Inventory

Do not silently connect them to checkout.

## Financial honesty

Do not describe gross profit/margin as accounting truth.

No tax, shipping or payment-fee model exists in PASSO 40.

## Quality Gate

```text
PASSO 40 targeted: 47/47
Full suite:         737/737
Test files:         93/93
ESLint warnings:    0
typecheck:          passed
build:              passed
check:              passed
```

## Decisions

After PASSO 40:

`CODAL-DEC-001 -> CODAL-DEC-268`

Next:

`CODAL-DEC-269`

## Next action

PASSO 41 - Search, Discovery Intelligence and Catalog Navigation Refinement.