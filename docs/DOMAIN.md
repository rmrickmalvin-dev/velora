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

## Repository implementation boundary

Domain defines Repository Contracts.

Infrastructure implements those contracts.

PASSO 20 introduces local in-memory adapters.

```text
VELORA Seed
    |
    v
Local Repository Adapter
    |
    v
Domain Repository Contract
    |
    v
Application Use Case
```

## Local Repository Implementations

Implemented:

- LocalProductCategoryRepository
- LocalProductRepository
- LocalProductVariantRepository
- LocalProductMediaRepository
- LocalInventoryRepository
- LocalInventoryMovementRepository
- LocalCartRepository
- LocalOrderRepository

Factory:

- `createLocalRepositories`

## Seed isolation

Local repositories copy seed references into private working collections.

Because Domain entities are immutable, entity references are safe to reuse as baseline values.

Repository mutations replace or append working-state references.

They never mutate the `veloraSeed` collections.

Calling `createLocalRepositories` again recreates a clean isolated working state.

## Current persistence behavior

The PASSO 20 adapter is in memory.

It does not survive a browser reload.

This is intentional.

The local adapter proves Repository Contracts and unblocks Application Use Cases before persistent Infrastructure is introduced.

Future IndexedDB adapters must implement the same Domain contracts.

## Read semantics

Single lookup:

```text
Entity | null
```

List query:

```text
readonly Entity[]
```

Local list methods return frozen snapshots.

## Write semantics

State repositories use `save` as upsert by entity id.

InventoryMovement uses `append`.

Cart supports remove.

Order has no delete contract.

## Business-rule boundary

Local repositories do not invent business rules.

Examples of rules that remain outside repository implementation:

- stock cannot become negative
- Cart quantity must be positive
- Order lifecycle transition validity
- commercial snapshot creation

Those rules remain in Domain and Application.

## Quality state

PASSO 20 adds:

- 16 local repository tests

Complete suite:

- 19 test files
- 160 tests
- 160 passed
- 0 failed

## Next milestone

PASSO 21 - Application Use Cases.