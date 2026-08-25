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

- `90f2d42` - domain primitives
- `d682c43` - catalog domain
- `c06a5d3` - inventory domain and movements
- `0e461a3` - cart domain and cart operations
- `bffa30d` - order domain and lifecycle

## Latest validated step

PASSO 18 - Repository Contracts

## Current Domain

Implemented:

- Catalog
- Inventory
- Cart
- Order
- Repository Contracts

## Repository Contracts

Created:

- ProductCategoryRepository
- ProductRepository
- ProductVariantRepository
- ProductMediaRepository
- InventoryRepository
- InventoryMovementRepository
- CartRepository
- OrderRepository

Contracts live in Domain and know only Domain concepts.

They do not know:

- IndexedDB
- localStorage
- Supabase
- PostgreSQL
- HTTP
- fetch
- Next.js
- React

## Contract semantics

Read operations are asynchronous and return Promise.

Missing entities return `null`.

Collection queries return readonly arrays.

State repositories use `save`.

InventoryMovement uses `append` because movement history is conceptually append-only.

CartRepository supports removal because a temporary Cart may be discarded.

OrderRepository intentionally does not expose delete because Order is historical transaction data.

## Quality Gate

PASSO 18 adds no runtime behavior and therefore no artificial runtime tests.

Primary proof:

- TypeScript contract validation
- ESLint
- full regression suite

Latest evidence:

- repository typecheck passed
- repository lint passed
- full suite: 132/132
- production build passed
- `/pt-BR` SSG passed
- `/en` SSG passed
- `/es` SSG passed
- Proxy recognized
- `npm run check` passed

## Decisions

After PASSO 18:

`CODAL-DEC-001 -> CODAL-DEC-073`

Next available decision:

`CODAL-DEC-074`

## Next step

PASSO 19 - Seed Foundation.