# PROJECT STATE - VELORA

Last update: 2026-08-25

## Project

VELORA - professional conceptual e-commerce for smartphones, accessories and mobile technology.

## Phase

BUILD 01 - Foundation

## Current unit

01B - Domain and Data Foundation

## State

IN PROGRESS

## Git checkpoints

- `90f2d42` - domain primitives
- `d682c43` - catalog domain
- `c06a5d3` - inventory domain and movements
- `0e461a3` - cart domain and cart operations
- `bffa30d` - order domain and lifecycle
- `9ee0376` - repository contracts
- `f633f35` - deterministic VELORA seed

## Latest validated step

PASSO 20 - Local Repository Implementations

## Local repositories

Implemented Infrastructure adapters:

- LocalProductCategoryRepository
- LocalProductRepository
- LocalProductVariantRepository
- LocalProductMediaRepository
- LocalInventoryRepository
- LocalInventoryMovementRepository
- LocalCartRepository
- LocalOrderRepository
- createLocalRepositories

## Working state

`createLocalRepositories` initializes Catalog and Inventory from the immutable VELORA seed.

Each call creates isolated working state.

Cart and Order repositories start empty.

The original `veloraSeed` remains unchanged when repositories mutate their working state.

## Persistence level

PASSO 20 repositories are in-memory Infrastructure adapters.

They are intentionally volatile across page reloads.

Their purpose is to:

- validate Repository Contracts
- provide real data access for Application Use Cases
- preserve seed isolation
- make BUILD 01 executable before IndexedDB
- provide a clean reference implementation for future persistent adapters

IndexedDB remains a later Infrastructure adapter.

## Repository semantics

- single lookup returns entity or null
- list results are frozen snapshots
- save is upsert by entity id
- InventoryMovement append preserves insertion order
- Cart supports remove
- Order remains without delete
- repositories add no new business rules

## Quality Gate

Latest evidence:

- PASSO 20 targeted tests: 16/16
- complete suite: 160/160
- 19 test files passed
- lint passed
- typecheck passed
- production build passed
- `/pt-BR` SSG passed
- `/en` SSG passed
- `/es` SSG passed
- Proxy recognized
- `npm run check` passed

## Decisions

After PASSO 20:

`CODAL-DEC-001 -> CODAL-DEC-089`

Next available decision:

`CODAL-DEC-090`

## Next step

PASSO 21 - Application Use Cases.