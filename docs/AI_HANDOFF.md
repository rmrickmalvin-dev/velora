# AI HANDOFF - VELORA

Last update: 2026-08-25

CODAL OS - Complete Edition active.

## State

BUILD 01 - Foundation

Latest validated step:

PASSO 22 - IndexedDB Provider and Persistent Local Adapters

## Persistent Infrastructure

Available:

- PersistenceProvider
- PersistenceError
- MemoryPersistenceProvider
- IndexedDbProvider
- PersistentProductCategoryRepository
- PersistentProductRepository
- PersistentProductVariantRepository
- PersistentProductMediaRepository
- PersistentInventoryRepository
- PersistentInventoryMovementRepository
- PersistentCartRepository
- PersistentOrderRepository
- createPersistentRepositories
- createBrowserRepositories
- resetPersistentOverrides

## Browser persistence

`createBrowserRepositories()` selects native IndexedDB.

Default database:

`velora-demo`

IndexedDB is browser-only.

Do not call browser composition during SSR.

## Baseline rule

Catalog and Inventory:

```text
veloraSeed + persisted overrides
```

Cart and Order:

```text
persisted runtime state only
```

InventoryMovement:

```text
seed baseline history + persisted appended history
```

## Rehydration rule

Never trust raw persisted objects as final Domain objects.

Persistent repositories must rehydrate through Domain factories.

## Dependency rule

Application must not import IndexedDbProvider or concrete persistent repositories.

UI/composition chooses the Infrastructure adapter.

## Quality Gate

Latest evidence:

```text
PASSO 22 targeted: 20/20
Full suite:         204/204
Test files:         24/24
lint:               passed
typecheck:          passed
build:              passed
check:              passed
```

PASSO 21 unused-import lint warning was removed.

## Decisions

After PASSO 22:

`CODAL-DEC-001 -> CODAL-DEC-107`

Next:

`CODAL-DEC-108`

## Next action

PASSO 23 - BUILD 01 Final Integration and Closure.

The next step should verify composition, reproducibility and official BUILD 01 readiness before entering BUILD 02 Storefront and Design System.

## Reading order

1. docs/PROJECT_STATE.md
2. docs/DECISIONS.md
3. docs/DOMAIN.md
4. docs/QUALITY_STATE.md
5. docs/STACK.md
6. CHANGELOG.md