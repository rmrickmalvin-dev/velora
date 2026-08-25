# DOMAIN - VELORA

Last update: 2026-08-25

## Central principle

```text
Domain does not know Framework.
Framework knows Domain.
```

## Forbidden Domain dependencies

- React
- Next.js
- Zustand
- DOM
- CSS
- localStorage
- IndexedDB
- Supabase
- fetch
- external providers

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

## Value Objects

- CurrencyCode
- Money
- SKU
- Slug

## Catalog Domain

```text
ProductCategory
       |
       v
    Product
       |
       +---------------+
       v               v
ProductVariant     ProductMedia
```

Product and ProductVariant do not store stock.

## Inventory Domain

```text
ProductVariant
      |
      v
Inventory
      |
      v
InventoryMovement
```

### Inventory

Responsibility:

Represent current stock state for a ProductVariant.

Structure:

```text
Inventory
|- id
|- productVariantId
`- quantityOnHand
```

Invariants:

- id required
- productVariantId required
- quantityOnHand is a safe integer
- quantityOnHand >= 0

### InventoryMovement

Responsibility:

Represent one historical stock change.

Structure:

```text
InventoryMovement
|- id
|- inventoryId
|- type
|- delta
`- reason
```

Types:

- ENTRY
- EXIT
- ADJUSTMENT

Delta semantics:

```text
ENTRY      delta > 0
EXIT       delta < 0
ADJUSTMENT delta != 0
```

For all movements:

- delta must be a safe integer
- delta cannot be zero
- reason is required

### Inventory Service

`applyInventoryMovement` performs an immutable stock transition.

Rules:

1. movement.inventoryId must match inventory.id
2. resulting quantity must remain a safe integer
3. resulting quantity cannot be negative
4. returns a new Inventory
5. never mutates Product or ProductVariant

## Catalog vs Inventory

Forbidden:

```text
Product.stock
Product.quantity
ProductVariant.stock
ProductVariant.quantity
```

Inventory references ProductVariantId.

## Cart

Not implemented yet.

Cart represents current purchase intent and remains distinct from Order.

## Order

Not implemented yet.

Order will represent a transaction snapshot.

OrderItem will preserve commercial snapshot data.

## Persistence Boundary

```text
Use Case
|
v
Repository Contract
|
v
Repository Implementation
|
v
Data Provider
```

Domain remains provider-independent.

## Internationalization Boundary

`src/domain` does not depend on `src/i18n`.

## Test State

PASSO 14:

- 46 total tests

PASSO 15:

- 26 new tests
- 72 total tests
- 0 failures

## Next milestone

PASSO 16 - Cart + CartItem.