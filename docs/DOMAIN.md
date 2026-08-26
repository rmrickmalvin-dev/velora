# DOMAIN - VELORA

Last update: 2026-08-25

## Dependency direction

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

## Persistence boundary

Domain defines Repository Contracts.

Application consumes Repository Contracts.

Infrastructure implements Repository Contracts.

PASSO 22 adds persistent Infrastructure without changing Domain or Application contracts.

## PersistenceProvider

Infrastructure-level storage operations:

- get
- getAll
- put
- add
- delete
- clear

This abstraction is intentionally not a Domain contract.

It exists below repository implementations.

## IndexedDbProvider

Browser implementation using native IndexedDB.

Object stores:

- productCategories
- products
- productVariants
- productMedia
- inventory
- inventoryMovements
- carts
- orders

Default database:

`velora-demo`

Version:

`1`

No external IndexedDB package was introduced.

## Runtime boundary

IndexedDB is browser-only.

If IndexedDB is unavailable, the provider fails explicitly with PersistenceError.

No SSR fallback silently changes persistence semantics.

## Persistent Repository strategy

Catalog and Inventory use immutable baseline plus overrides.

```text
veloraSeed
   +
persistent overrides
   =
current read model
```

Saving a seeded entity writes an override with the same id.

The original seed remains untouched.

## Mutable commerce state

Cart:

- persistent record only
- no seed baseline
- may be deleted

Order:

- persistent record only
- no seed baseline
- no repository delete contract

InventoryMovement:

- seed history remains baseline
- new persistent movements append after baseline history
- duplicate movement ids are rejected

## Domain rehydration

Structured persistence removes JavaScript freeze state.

Therefore persistent reads are rehydrated through Domain factories.

This restores:

- entity validation
- immutable objects
- SKU normalization
- Slug rules
- Money construction
- nested CartItem and OrderItem invariants

## Composition

`createPersistentRepositories(provider)` supports any Infrastructure provider implementing PersistenceProvider.

`createBrowserRepositories()` selects IndexedDbProvider for browser composition.

Application Use Cases continue to depend only on Domain Repository Contracts.

## Reset semantics

`resetPersistentOverrides(provider)` clears all persistent stores.

After reset:

- seed Catalog returns
- seed Inventory returns
- seed InventoryMovement history returns
- Cart is empty
- Order is empty

## Test state

PASSO 22 adds:

- 6 provider behavior tests
- 14 persistent repository tests

Complete suite:

- 24 test files
- 204 tests
- 204 passed
- 0 failed

## Next milestone

PASSO 23 - BUILD 01 Final Integration and Closure.