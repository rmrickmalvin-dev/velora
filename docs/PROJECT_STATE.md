# PROJECT STATE - VELORA

Last update: 2026-08-25

## Project

VELORA - professional conceptual e-commerce for smartphones, accessories and mobile technology.

Locales:

- PT-BR
- EN
- ES

## Phase

BUILD 01 - Foundation

## Current unit

01B - Domain Foundation

## State

IN PROGRESS

## Git checkpoints

Previous domain checkpoint:

`90f2d42` - `feat: add domain primitives and unit test foundation`

Catalog checkpoint:

`d682c43` - `feat: add catalog domain entities and slug`

## Latest validated step

PASSO 15 - Inventory + InventoryMovement

## Architecture

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

Domain remains independent from React, Next.js, Zustand, DOM, CSS, localStorage, IndexedDB, Supabase, fetch and external providers.

## Implemented Domain

Value Objects:

- CurrencyCode
- Money
- SKU
- Slug

Catalog:

- ProductCategory
- Product
- ProductVariant
- ProductMedia

Inventory:

- Inventory
- InventoryMovement
- Inventory Service

## Inventory

Represents current stock state for a ProductVariant.

Fields:

- id
- productVariantId
- quantityOnHand

Invariants:

- id required
- productVariantId required
- quantityOnHand must be a safe integer
- quantityOnHand cannot be negative

## InventoryMovement

Represents historical stock change.

Fields:

- id
- inventoryId
- type
- delta
- reason

Types:

- ENTRY
- EXIT
- ADJUSTMENT

Rules:

- delta is a non-zero safe integer
- ENTRY requires positive delta
- EXIT requires negative delta
- ADJUSTMENT accepts positive or negative delta
- reason is required

## Inventory Service

`applyInventoryMovement`:

- validates movement ownership
- calculates the next quantity
- rejects negative resulting stock
- rejects unsafe integer results
- returns a new immutable Inventory
- does not mutate Catalog

## Catalog vs Inventory

Product and ProductVariant still do not contain stock or quantity.

Relationship:

```text
ProductVariant
      |
      v
Inventory
      |
      v
InventoryMovement
```

## Quality Gate

Latest evidence:

- PASSO 15 targeted tests: 26/26
- complete suite: 72/72
- lint passed
- typecheck passed
- production build passed
- `/pt-BR` SSG passed
- `/en` SSG passed
- `/es` SSG passed
- Proxy recognized
- `npm run check` passed

## Decisions

After PASSO 15:

`CODAL-DEC-001 -> CODAL-DEC-049`

Next available decision:

`CODAL-DEC-050`

## Next step

PASSO 16 - Cart + CartItem.