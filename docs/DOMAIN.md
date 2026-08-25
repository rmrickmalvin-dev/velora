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

## Implemented domains

- Catalog
- Inventory
- Cart
- Order

## Repository Boundary

Repository Contracts are Domain ports.

They describe what the application needs from persistence without describing how persistence works.

```text
Application
    |
    v
Repository Contract
    ^
    |
Infrastructure Adapter
```

## Provider independence

Repository Contracts must not expose:

- IndexedDB transaction types
- localStorage APIs
- Supabase clients
- PostgreSQL types
- HTTP response objects
- fetch
- React
- Next.js

## Async contract

Repository methods return Promise from the beginning.

This allows the same Application layer to work with:

- in-memory demo repositories
- IndexedDB
- remote APIs
- Supabase
- PostgreSQL-backed services

without changing Domain contracts.

## Missing entity semantic

Single-entity lookup returns:

```text
Entity | null
```

Missing data is not automatically an exceptional condition.

Application Use Cases decide whether a missing entity becomes a user-facing error.

## Collection semantic

List queries return:

```text
readonly Entity[]
```

Callers must not mutate repository-owned collections.

## Catalog repositories

### ProductCategoryRepository

- findById
- findBySlug
- list
- save

### ProductRepository

- findById
- findBySlug
- list
- save

### ProductVariantRepository

- findById
- findBySku
- listByProductId
- save

### ProductMediaRepository

- findById
- listByProductId
- listByVariantId
- save

## Inventory repositories

### InventoryRepository

- findById
- findByProductVariantId
- save

### InventoryMovementRepository

- listByInventoryId
- append

InventoryMovement uses `append` instead of generic `save`.

The name communicates historical append semantics.

## CartRepository

- findById
- save
- remove

Cart is temporary purchase intent and may be discarded.

## OrderRepository

- findById
- listByCustomerId
- save

OrderRepository intentionally has no delete contract.

Order is transaction history.

## Current test state

Repository interfaces add no runtime behavior.

Therefore PASSO 18 adds no artificial interface tests.

Regression remains:

- 17 test files
- 132 tests
- 132 passed
- 0 failed

TypeScript typecheck is the primary contract proof for this step.

## Next milestone

PASSO 19 - Seed Foundation.