# DOMAIN - VELORA

Last update: 2026-08-27

## BUILD 04 status

IN PROGRESS

## Inventory Application boundary

Existing mutation:

`adjustInventory`

New read:

`listInventoryMovements`

## Domain invariants preserved

InventoryMovement:

- id required
- Inventory id required
- type valid
- delta is a non-zero safe integer
- ENTRY requires positive delta
- EXIT requires negative delta
- reason required

Inventory:

- quantityOnHand remains a non-negative safe integer
- applying a movement cannot produce negative Inventory

## Admin input mapping

Feature validation converts human quantity input into Domain delta:

- ENTRY 5 -> +5
- EXIT 5 -> -5
- ADJUSTMENT -2 -> -2
- ADJUSTMENT +2 -> +2

The Domain remains the final rule boundary.

## Movement history

InventoryMovement currently contains no timestamp.

Do not invent movement dates.

Repository append order is the available chronology.

## Side effects

Inventory operations remain independent from:

- Cart
- Order
- Product
- ProductVariant price

## Next milestone

PASSO 38 - Customer Account Data, Saved Profile and Customer Order Experience.