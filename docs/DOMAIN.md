# DOMAIN - VELORA

Last update: 2026-08-27

## BUILD 04 status

IN PROGRESS

## Search boundary

PASSO 41 Search Intelligence is Presentation logic over `StorefrontProductCard`.

It does not create Domain Search entities.

Search does not mutate:

- Product
- ProductVariant
- Inventory
- Cart
- Order
- Promotion scenarios

## Search semantics

Searchable fields:

- Product name
- Brand
- localized Category label
- stable Product slug

Multi-term matching uses AND semantics.

Ranking is deterministic.

Empty query preserves Catalog order.

## Browser navigation boundary

URL-backed Search state lives behind:

`browser-discovery-navigation`

State parameters:

- `q`
- `category`

Product Discovery sends both Search input and Category controls through the shared `updateDiscovery` path.

No localStorage persistence is used for Search navigation.

## Design Token contract

`design-token-reference-contract.test.ts` verifies:

- every referenced VELORA variable exists in the primary registry
- primary definitions are unique
- scoped overrides may only redefine registered tokens

## Next milestone

PASSO 42 - Product Detail Runtime Sync, Localization Integrity and BUILD 04 Readiness.