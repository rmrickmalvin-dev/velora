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

PASSO 37 - Inventory Adjustment Controls, Movement History and Admin Stock Operations

## Inventory operations

The ADMIN workspace now exposes explicit Inventory operations per Product Variant.

Available movement types:

- ENTRY
- EXIT
- ADJUSTMENT

Human input is validated in Feature code.

Domain still validates:

- non-zero safe integer delta
- ENTRY positive
- EXIT negative
- reason required
- resulting Inventory cannot become negative

## Application

VeloraApplication exposes:

- adjustInventory
- listInventoryMovements

History reads through InventoryMovementRepository.

## Browser flow

```text
AdminInventoryOperations
|
v
browser-admin-inventory
|
v
VeloraApplication
|
v
adjustInventory / listInventoryMovements
|
v
InventoryRepository + InventoryMovementRepository
|
v
IndexedDB
```

React never imports repositories or IndexedDbProvider.

## Movement history

History shows:

- movement type
- signed delta
- reason

The current InventoryMovement Domain entity has no timestamp.

Therefore the Admin UI presents newest-first append order without inventing dates.

## Storefront refresh

A dedicated browser event exists:

`velora:inventory-changed`

Product Discovery subscribes to both:

- `velora:catalog-changed`
- `velora:inventory-changed`

This keeps persistent local stock visible after Admin operations while preserving SSG initial rendering.

## Side effects

Stock operations do not:

- alter Cart
- create Order
- change Product price
- change Product identity

## Quality Gate

Latest evidence:

- PASSO 37 targeted tests: 52/52
- complete suite: 594/594
- 75 test files passed
- lint passed
- typecheck passed
- production build passed
- `npm run check` passed

## Decisions

After PASSO 37:

`CODAL-DEC-001 -> CODAL-DEC-238`

Next available decision:

`CODAL-DEC-239`

## Next step

PASSO 38 - Customer Account Data, Saved Profile and Customer Order Experience.