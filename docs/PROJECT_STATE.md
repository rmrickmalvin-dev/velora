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

PASSO 40 - Promotions, Pricing Simulator and Commercial Controls

## Commercial Simulator

ADMIN now includes a commercial simulation workspace based on the persisted Variant price.

Inputs:

- Variant
- scenario label
- promotional code
- estimated cost
- discount percentage

Outputs:

- base price
- simulated promotional price
- simulated gross profit
- simulated gross margin

## Promotion scenarios

Saved Promotion scenarios are browser-local Feature state.

Storage key:

`velora.demo.promotions.v1`

They are intentionally not canonical Domain Promotion records yet.

They do not change:

- ProductVariant persisted price
- Storefront price
- Cart
- checkout
- Orders
- payment state
- Inventory

## Simulation boundaries

The simulator intentionally does not model:

- tax
- shipping
- payment fees
- accounting truth

Gross profit and margin are clearly presented as simulations.

## Reset

Global browser demo reset now clears:

- IndexedDB demo overrides
- Customer Profile
- Promotion scenarios
- Cart presentation refresh

## Quality Gate

Latest evidence:

- PASSO 40 targeted tests: 47/47
- complete suite: 737/737
- 93 test files passed
- ESLint zero warnings
- typecheck passed
- production build passed
- `npm run check` passed

## Decisions

After PASSO 40:

`CODAL-DEC-001 -> CODAL-DEC-268`

Next available decision:

`CODAL-DEC-269`

## Next step

PASSO 41 - Search, Discovery Intelligence and Catalog Navigation Refinement.