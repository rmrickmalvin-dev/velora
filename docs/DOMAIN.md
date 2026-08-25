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

## Implemented domains

- Catalog
- Inventory
- Cart
- Order

## Order Domain

Order represents transaction history.

Order is not Cart.

### OrderItem

Structure:

```text
OrderItem
|- id
|- productId
|- productVariantId
|- productNameSnapshot
|- skuSnapshot
|- unitPriceSnapshot
`- quantity
```

OrderItem preserves commercial data that must not depend on future Catalog state.

Snapshot fields are intentionally explicit.

Invariants:

- id required
- productId required
- productVariantId required
- productNameSnapshot required
- skuSnapshot validated through SKU
- unitPriceSnapshot uses Money
- unitPriceSnapshot cannot be negative
- quantity is a positive safe integer
- OrderItem is immutable

### Order

Structure:

```text
Order
|- id
|- customerId?
|- status
`- items[]
```

Invariants:

- id required
- customerId optional
- customerId cannot be blank when provided
- at least one OrderItem required
- OrderItem ids are unique
- status must be a valid OrderStatus
- Order is immutable
- items collection is immutable

Guest orders are allowed by omitting customerId.

### Order subtotal

Order subtotal is calculated from snapshots:

```text
unitPriceSnapshot * quantity
```

Money rules remain active.

Cross-currency totals are rejected.

### Order status transitions

Allowed graph:

```text
PENDING
|-- CONFIRMED
|   |-- PREPARING
|   |   |-- SHIPPED
|   |   |   `-- DELIVERED
|   |   `-- CANCELLED
|   `-- CANCELLED
`-- CANCELLED
```

Terminal states:

- DELIVERED
- CANCELLED

Invalid jumps are rejected.

Transitions return a new Order and do not mutate the previous state.

## Order Service

Implemented:

- `calculateOrderSubtotal`
- `transitionOrderStatus`

`calculateOrderSubtotal` derives totals from OrderItem snapshots using Money.

`transitionOrderStatus` applies the explicit Order lifecycle without mutating the original Order.

Allowed transitions:

```text
PENDING -> CONFIRMED
PENDING -> CANCELLED
CONFIRMED -> PREPARING
CONFIRMED -> CANCELLED
PREPARING -> SHIPPED
PREPARING -> CANCELLED
SHIPPED -> DELIVERED
```

Terminal states:

- DELIVERED
- CANCELLED

Invalid lifecycle jumps are rejected.

## Cart vs Order

Cart:

- current purchase intent
- can be modified
- CartItem stores current cart price state

Order:

- historical transaction
- status-controlled lifecycle
- OrderItem stores commercial snapshots

CartItem and OrderItem must not be merged.

## Order vs Catalog

Order history must remain readable even when:

- Product name changes
- SKU changes
- price changes
- Product is archived
- ProductVariant changes

Therefore OrderItem snapshot fields do not depend on current Catalog lookup for historical display.

## Persistence Boundary

Next phase:

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

Repository Contracts remain provider-independent.

## Test State

PASSO 14 checkpoint:

- 46 tests

PASSO 15 checkpoint:

- 72 tests

PASSO 16 checkpoint:

- 100 tests

PASSO 17:

- 32 new tests
- 132 total tests
- 0 failures

## Next milestone

PASSO 18 - Repository Contracts.