# DOMAIN - VELORA

Last update: 2026-08-25

## Central principle

Domain does not know Framework.

Framework knows Domain.

## Dependency direction

```text
UI
|
v
Application
|
v
Domain Contracts
^
|
Infrastructure
```

## Current layers

Domain:

- Catalog
- Inventory
- Cart
- Order
- Repository Contracts

Infrastructure:

- Seed Foundation

## Seed Boundary

Seed is Infrastructure, not Domain.

The seed provides a deterministic baseline implementation input while respecting Domain rules.

Seed records are created through Domain factories.

Raw seed objects do not bypass entity invariants.

## Seed API

Infrastructure exports:

- `createVeloraSeed`
- `veloraSeed`
- `VeloraSeed`

`createVeloraSeed` recreates a fresh deterministic baseline using Domain factories.

`veloraSeed` exposes the ready immutable baseline instance.

The factory exists so local repositories and demo reset flows can rebuild known baseline state without mutating the exported seed instance.

## VELORA baseline

```text
4  ProductCategory
8  Product
15 ProductVariant
16 ProductMedia
15 Inventory
15 InventoryMovement
```

All content is fictional.

## Seed rules

The baseline is:

- deterministic
- immutable
- internally coherent
- provider-independent at the Domain boundary
- safe to reset

Stable ids, slugs and SKUs are explicit.

This makes demo reset behavior predictable and allows later local repositories to rebuild from a known baseline.

## Inventory baseline

Every seeded ProductVariant has exactly one Inventory.

Every seeded Inventory begins with one ENTRY InventoryMovement.

The initial movement delta equals quantityOnHand.

This preserves a coherent initial inventory history.

## Media baseline

ProductMedia records use logical local asset paths.

Example:

```text
/images/catalog/aster-one-x-pro/front.webp
```

The data contract exists before final visual assets.

Final images belong to the Storefront asset phase.

## Mutable state exclusion

The immutable baseline intentionally excludes:

- Cart
- Order

Those concepts represent mutable runtime/demo state.

They will be created by repository implementations and Application Use Cases.

## Repository relationship

Next architecture step:

```text
VELORA Seed
    |
    v
Local Repository
    |
    v
Repository Contract
    |
    v
Application Use Case
```

The seed does not implement repositories itself.

## Test state

PASSO 19 adds:

- 12 seed-integrity tests

Current complete suite:

- 18 test files
- 144 tests
- 144 passed
- 0 failed

## Next milestone

PASSO 20 - Local Repository Implementations.