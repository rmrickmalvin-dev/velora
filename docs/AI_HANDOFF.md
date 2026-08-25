# AI HANDOFF - VELORA

Last update: 2026-08-25

CODAL OS - Complete Edition active.

## State

BUILD 01 - Foundation

Latest validated step:

PASSO 20 - Local Repository Implementations

## Checkpoints

- `90f2d42` - domain primitives
- `d682c43` - catalog domain
- `c06a5d3` - inventory domain
- `0e461a3` - cart domain
- `bffa30d` - order domain
- `9ee0376` - repository contracts
- `f633f35` - VELORA seed

## Local Infrastructure

Location:

`src/infrastructure/repositories/local`

Available:

- LocalProductCategoryRepository
- LocalProductRepository
- LocalProductVariantRepository
- LocalProductMediaRepository
- LocalInventoryRepository
- LocalInventoryMovementRepository
- LocalCartRepository
- LocalOrderRepository
- createLocalRepositories

## Critical rules

- local repositories initialize from `veloraSeed`
- never mutate `veloraSeed`
- each repository bundle is isolated
- Cart starts empty
- Order starts empty
- list methods return frozen snapshots
- save is infrastructure upsert, not business validation
- InventoryMovement append preserves history order
- no provider types leak into Domain

## Persistence note

PASSO 20 is in-memory only.

Reload persistence is intentionally not implemented yet.

IndexedDB will be a later adapter behind the same Repository Contracts.

## Quality Gate

Latest evidence:

```text
PASSO 20 targeted: 16/16
Full suite:         160/160
Test files:         19/19
lint:               passed
typecheck:          passed
build:              passed
check:              passed
```

## Decisions

After PASSO 20:

`CODAL-DEC-001 -> CODAL-DEC-089`

Next:

`CODAL-DEC-090`

## Next action

PASSO 21 - Application Use Cases.

Application Use Cases should orchestrate Repository Contracts and Domain services without importing local repository implementations directly.

## Reading order

1. docs/PROJECT_STATE.md
2. docs/DECISIONS.md
3. docs/DOMAIN.md
4. docs/QUALITY_STATE.md
5. docs/STACK.md
6. CHANGELOG.md