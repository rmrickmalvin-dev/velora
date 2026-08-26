# PROJECT STATE - VELORA

Last update: 2026-08-26

## Project

VELORA - professional conceptual e-commerce for smartphones, accessories and mobile technology.

## Phase

BUILD 01 - Foundation

## State

CLOSED AND VALIDATED

## Official BUILD 01 closure

PASSO 23 - Final Integration and Closure

## Foundation delivered

Runtime and platform:

- Next.js 16.3.1
- React 19.2.8
- TypeScript 5.9.3
- Node 24.13.0
- npm 11.6.2
- locale routing for PT-BR, EN and ES
- production SSG routes
- Proxy recognized

Domain:

- Money
- CurrencyCode
- SKU
- Slug
- Catalog
- Inventory
- Cart
- Order
- Domain services
- Repository Contracts

Infrastructure:

- deterministic VELORA seed
- in-memory repositories
- PersistenceProvider
- native IndexedDbProvider
- MemoryPersistenceProvider
- persistent repository adapters
- seed plus override strategy
- Domain rehydration
- demo reset

Application:

- Storefront queries
- Cart orchestration
- Inventory orchestration
- Order orchestration
- createVeloraApplication facade

Composition:

- createVeloraRuntime
- createBrowserVeloraRuntime
- resetDemo binding

## BUILD 01 final architecture

```text
Next.js UI
    |
    v
VeloraApplication
    |
    v
Application Use Cases
    |
    v
Domain Repository Contracts
    ^
    |
Persistent Repository Adapters
    |
    v
PersistenceProvider
    |
    +-- IndexedDbProvider
    `-- MemoryPersistenceProvider
```

The same Application facade can also run with the in-memory Local Repositories.

## Dependency boundaries

Validated by automated architecture tests:

- Domain does not import Application
- Domain does not import Infrastructure
- Domain does not import React
- Domain does not import Next.js
- Application does not import Infrastructure
- Application does not import React
- Application does not import Next.js

## Test discovery

Vitest project scripts are constrained to `src`.

This prevents `.codal-backups` or other local artifacts from being interpreted as production test suites.

## Clean install proof

BUILD 01 closure executed:

`npm ci --no-audit --no-fund`

before the final complete quality gate.

This proves package.json and package-lock.json can recreate the project dependencies from a clean install.

## Final quality evidence

- PASSO 23 targeted tests: 11/11
- complete suite: 215/215
- 26 test files passed
- lint passed
- typecheck passed
- production build passed
- `/pt-BR` SSG passed
- `/en` SSG passed
- `/es` SSG passed
- Proxy recognized
- clean install passed
- `npm run check` passed

## Decisions

After BUILD 01 closure:

`CODAL-DEC-001 -> CODAL-DEC-115`

Next available decision:

`CODAL-DEC-116`

## Next phase

BUILD 02 - Storefront and Design System

First action:

PASSO 24 - BUILD 02 Design System Foundation and Storefront Shell.