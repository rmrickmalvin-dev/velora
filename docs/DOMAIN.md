# DOMAIN - VELORA

Last update: 2026-08-25

## Central principle

Domain does not know Framework.

Framework knows Domain.

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

## Cart Domain

```text
ProductVariant
      |
      v
   CartItem
      |
      v
     Cart
```

Cart represents current purchase intent.

Cart remains separate from Order.

### CartItem

Structure:

```text
CartItem
|- id
|- productVariantId
|- unitPrice
`- quantity
```

Invariants:

- id required
- productVariantId required
- quantity is a positive safe integer
- unitPrice is Money
- unitPrice cannot be negative
- CartItem is immutable

CartItem does not contain:

- Inventory
- stock
- Order state
- persistence provider

### Cart

Structure:

```text
Cart
|- id
`- items[]
```

Invariants:

- id required
- Cart is immutable
- items collection is immutable
- CartItem ids are unique
- ProductVariant ids are unique inside the Cart

The one-variant-per-line rule prevents duplicate commercial lines.

### Cart Service

Functions:

- addCartItem
- removeCartItem
- updateCartItemQuantity
- calculateCartSubtotal

Transitions return a new Cart.

Original Cart and CartItem objects are not mutated.

### Cart subtotal

Each line total is:

```text
unitPrice * quantity
```

Subtotal uses Money operations.

Rules:

- quantity multiplication is integer-only
- different currencies are rejected
- empty cart returns null because no currency exists yet

## Cart vs Inventory

Cart quantity is purchase intent.

Inventory quantityOnHand is stock state.

They are different concepts.

Cart does not mutate Inventory directly.

Application use cases will coordinate availability later.

## Cart vs Order

Cart:

- mutable through immutable state transitions
- represents current intent
- may change before checkout

Order:

- not implemented yet
- will preserve transaction history
- OrderItem will store commercial snapshots

CartItem is not OrderItem.

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

## Test State

PASSO 14 checkpoint:

- 46 tests

PASSO 15 checkpoint:

- 72 tests

PASSO 16:

- 28 new tests
- 100 total tests
- 0 failures

## Next milestone

PASSO 17 - Order + OrderItem.