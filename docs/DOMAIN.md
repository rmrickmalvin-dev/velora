# DOMAIN - VELORA

Last update: 2026-08-25

## Architecture

```text
UI
|
v
Application
|
v
Domain
^
|
Infrastructure
```

## Application boundary

Application coordinates use cases.

Application may depend on:

- Domain entities
- Domain services
- Domain Repository Contracts
- Application DTOs/errors

Application must not depend on:

- Local repository implementations
- IndexedDB implementation details
- Supabase
- PostgreSQL
- React components
- Next.js routing internals

## Storefront use cases

### listStorefrontProducts

Aggregates:

- Product
- active ProductVariant records
- ProductMedia
- Inventory

Exposes only ACTIVE Products.

Ordering is deterministic:

1. featured Products
2. non-featured Products
3. alphabetical Product name inside each group

### getStorefrontProductBySlug

Returns:

```text
StorefrontProduct | null
```

Inactive or missing Product returns null.

## Cart use cases

### addProductToCart

Coordinates:

- ProductVariant lookup
- ACTIVE sale status
- Inventory lookup
- stock availability
- Cart creation
- CartItem creation
- repeated ProductVariant merge
- Cart save

Repeated adds increase the existing line quantity.

They do not create duplicate ProductVariant lines.

### updateCartQuantity

Validates current Inventory before applying Domain Cart quantity transition.

### removeProductFromCart

Coordinates Cart lookup, item existence and Domain removal.

### getCartSummary

Returns Cart plus Money subtotal.

Empty Cart subtotal remains null through Domain behavior.

## Cart vs Inventory

Cart quantity is purchase intent.

Inventory quantityOnHand is stock state.

Cart operations do not decrement Inventory.

Stock mutation belongs to explicit inventory/order orchestration.

## Inventory use case

### adjustInventory

Coordinates:

1. find Inventory
2. create InventoryMovement
3. apply Domain movement
4. save resulting Inventory
5. append InventoryMovement history

Domain still owns stock invariants.

## Order use cases

### changeOrderStatus

Coordinates Repository lookup, Domain transition and Repository save.

### listCustomerOrders

Uses OrderRepository customer query.

Guest Orders are not returned for a CustomerId.

## Application errors

ApplicationError represents orchestration failures such as:

- missing ProductVariant
- unavailable ProductVariant
- missing Inventory
- insufficient stock
- missing Cart
- missing CartItem
- missing Order

DomainValidationError remains responsible for Domain invariant violations.

## Infrastructure composition

Tests compose Application Use Cases with Local Repository implementations.

Production composition will later select persistent adapters.

Application modules themselves remain implementation-independent.

## Test state

PASSO 21 adds:

- 24 Application tests

Complete suite:

- 22 test files
- 184 tests
- 184 passed
- 0 failed

## Next milestone

PASSO 22 - IndexedDB Provider and Persistent Local Adapters.