# AI HANDOFF - VELORA

Last update: 2026-08-25

CODAL OS - Complete Edition active.

## State

BUILD 01 - Foundation

Unit 01B - Domain Foundation

Latest validated step:

PASSO 18 - Repository Contracts

## Checkpoints

- `90f2d42` - domain primitives
- `d682c43` - catalog domain
- `c06a5d3` - inventory domain
- `0e461a3` - cart domain
- `bffa30d` - order domain

## Repository Contracts

Available:

- ProductCategoryRepository
- ProductRepository
- ProductVariantRepository
- ProductMediaRepository
- InventoryRepository
- InventoryMovementRepository
- CartRepository
- OrderRepository

## Critical repository rules

Contracts know only Domain types.

Do not import:

- IndexedDB
- Supabase
- PostgreSQL
- fetch
- React
- Next.js

All repository operations are async Promise-based.

Single lookups return Entity or null.

Collection queries return readonly arrays.

InventoryMovement history uses append.

OrderRepository has no delete contract.

## Quality Gate

Latest evidence:

```text
Repository typecheck: passed
Repository lint:      passed
Full suite:           132/132
Build:                passed
Check:                passed
```

No new runtime tests were added because PASSO 18 introduces interfaces, not runtime behavior.

## Decisions

After PASSO 18:

`CODAL-DEC-001 -> CODAL-DEC-073`

Next:

`CODAL-DEC-074`

## Next action

PASSO 19 - Seed Foundation.

Seed data must be deterministic, coherent and immutable as baseline.

It must use Domain factories instead of raw unvalidated objects.

## Reading order

1. docs/PROJECT_STATE.md
2. docs/DECISIONS.md
3. docs/DOMAIN.md
4. docs/QUALITY_STATE.md
5. docs/STACK.md
6. CHANGELOG.md