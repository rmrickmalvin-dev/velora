# PROJECT STATE - VELORA

Last update: 2026-08-25

## Project

VELORA - professional conceptual e-commerce for smartphones, accessories and mobile technology.

## Phase

BUILD 01 - Foundation

## Current unit

01D - Persistent Infrastructure

## State

IN PROGRESS

## Latest validated step

PASSO 22 - IndexedDB Provider and Persistent Local Adapters

## Current architecture

```text
UI
|
v
Application
|
v
Domain Repository Contracts
^
|
+-- In-memory Local Repositories
|
`-- Persistent Repositories
        |
        v
PersistenceProvider
        |
        +-- IndexedDbProvider
        `-- MemoryPersistenceProvider (tests)
```

## Persistence Provider

Infrastructure now defines a provider abstraction for record stores.

Operations:

- get
- getAll
- put
- add
- delete
- clear

The provider abstraction does not leak into Domain or Application.

## IndexedDB

`IndexedDbProvider` is the browser persistence implementation.

Characteristics:

- native browser IndexedDB
- no new external dependency
- database name defaults to `velora-demo`
- schema version starts at 1
- one object store per repository data family
- explicit unavailable/open/transaction failure behavior

IndexedDB is browser-only.

SSR and Node execution do not pretend IndexedDB exists.

## Persistent repositories

Implemented:

- PersistentProductCategoryRepository
- PersistentProductRepository
- PersistentProductVariantRepository
- PersistentProductMediaRepository
- PersistentInventoryRepository
- PersistentInventoryMovementRepository
- PersistentCartRepository
- PersistentOrderRepository

## Baseline plus overrides

Catalog and Inventory use:

```text
immutable veloraSeed baseline
+
persistent override records
=
current repository view
```

The baseline is never mutated.

Cart and Order do not have seed fallback.

## Rehydration

Records read from persistence are recreated through Domain factories.

This restores:

- validation
- normalization
- immutable Domain objects
- Money and branded Value Objects

## Browser composition

`createBrowserRepositories` creates persistent repositories backed by IndexedDB.

Application Use Cases remain unchanged because they depend on Domain Repository Contracts.

## Reset

`resetPersistentOverrides` clears persistent stores.

After reset:

- Catalog and Inventory fall back to the immutable seed
- Cart becomes empty
- Order becomes empty
- appended persistent movements are removed
- seed movement history remains

## Quality Gate

Latest evidence:

- PASSO 22 targeted tests: 20/20
- complete suite: 204/204
- 24 test files passed
- lint passed with PASSO 21 warning removed
- typecheck passed
- production build passed
- `/pt-BR` SSG passed
- `/en` SSG passed
- `/es` SSG passed
- Proxy recognized
- `npm run check` passed

## Decisions

After PASSO 22:

`CODAL-DEC-001 -> CODAL-DEC-107`

Next available decision:

`CODAL-DEC-108`

## Next step

PASSO 23 - BUILD 01 Final Integration and Closure.