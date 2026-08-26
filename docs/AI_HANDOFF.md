# AI HANDOFF - VELORA

Last update: 2026-08-26

CODAL OS - Complete Edition active.

## State

BUILD 01 - CLOSED AND VALIDATED

Next:

BUILD 02 - Storefront and Design System

## Latest validated step

PASSO 23 - BUILD 01 Final Integration and Closure

## Application entry point

Use:

`createVeloraApplication`

for provider-independent Application composition.

## Infrastructure entry point

Browser composition:

`createBrowserVeloraRuntime`

Provider-controlled composition:

`createVeloraRuntime`

## UI dependency rule

BUILD 02 UI should consume `runtime.application`.

Do not make UI components depend directly on:

- IndexedDbProvider
- PersistenceProvider
- persistent repository classes
- local repository classes
- localStorage

## Runtime structure

```text
runtime.application
runtime.repositories
runtime.resetDemo
```

Normal Storefront UI behavior should use `runtime.application`.

`runtime.repositories` exists for Infrastructure composition and future privileged workflows, not routine component data access.

## Test discovery

The package scripts now scope Vitest to `src`.

Do not place executable project tests inside `.codal-backups`.

## Final BUILD 01 quality evidence

```text
PASSO 23 targeted: 11/11
Full suite:         215/215
Test files:         26/26
clean install:      passed
lint:               passed
typecheck:          passed
build:              passed
check:              passed
```

## Decisions

After BUILD 01:

`CODAL-DEC-001 -> CODAL-DEC-115`

Next:

`CODAL-DEC-116`

## Next action

PASSO 24 - BUILD 02 Design System Foundation and Storefront Shell.

BUILD 02 should begin visual work now.

Start with:

- Pearl Technology visual tokens
- typography
- spacing
- radius
- shadows
- borders
- button primitives
- input primitives
- badges
- cards
- Storefront navigation shell
- responsive page shell
- locale-safe navigation

Do not reopen BUILD 01 architecture without evidence of a defect.

## Reading order

1. docs/PROJECT_STATE.md
2. docs/DECISIONS.md
3. docs/DOMAIN.md
4. docs/QUALITY_STATE.md
5. docs/STACK.md
6. docs/BUILD_01_CLOSURE.md
7. CHANGELOG.md