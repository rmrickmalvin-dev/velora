# AI HANDOFF - VELORA

Last update: 2026-08-27

CODAL OS - Complete Edition active.

## State

BUILD 01 - CLOSED

BUILD 02 - CLOSED

BUILD 03 - CLOSED

BUILD 04 - IN PROGRESS

Latest validated step:

PASSO 36 - Admin Product Editing, Price Controls and Persistent Catalog Overrides

## Application mutations

Available:

- updateAdminProduct
- updateAdminVariantPrice

Always call through VeloraApplication.

Do not save Product/ProductVariant directly from React.

## Admin Product Editor

Component:

`AdminProductEditor`

Supports:

- name
- brand
- model
- featured
- Variant prices

Requires explicit confirmation before write.

## Price rule

Admin decimal text is converted to minor units in Feature code.

Domain Money remains the final invariant.

Currency is preserved from the existing Variant.

## Browser persistence

Adapter:

`browser-admin-catalog-mutations`

Mutations emit:

`velora:catalog-changed`

Public Product Discovery hydrates browser Catalog overrides after SSG and subscribes to the same event.

## Reset

resetDemo restores seed Product and price values.

## Inventory

Catalog/price mutation does not mutate Inventory.

## Quality Gate

```text
PASSO 36 targeted: 48/48
Full suite:         542/542
Test files:         68/68
lint:               passed
typecheck:          passed
build:              passed
check:              passed
```

## Decisions

After PASSO 36:

`CODAL-DEC-001 -> CODAL-DEC-228`

Next:

`CODAL-DEC-229`

## Next action

PASSO 37 - Inventory Adjustment Controls, Movement History and Admin Stock Operations.

Focus:

- explicit stock adjustment UI
- reason required
- signed delta validation
- InventoryMovement history
- persistent adjustment
- confirmation before stock mutation
- refresh Admin Inventory visibility
- no Cart/Order side effects