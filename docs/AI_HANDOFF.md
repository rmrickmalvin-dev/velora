# AI HANDOFF - VELORA

Last update: 2026-08-27

CODAL OS - Complete Edition active.

## State

BUILD 01 - CLOSED

BUILD 02 - CLOSED

BUILD 03 - CLOSED

BUILD 04 - IN PROGRESS

Latest validated step:

PASSO 37 - Inventory Adjustment Controls, Movement History and Admin Stock Operations

## Inventory UI

Component:

`AdminInventoryOperations`

It is rendered per Variant in the ADMIN Catalog Dashboard.

Supported:

- ENTRY
- EXIT
- ADJUSTMENT
- reason
- review/confirm
- movement history

## Application

Use:

- `adjustInventory`
- `listInventoryMovements`

Do not call repositories from React.

## Browser adapter

Use:

`browser-admin-inventory`

Successful mutation emits:

`velora:inventory-changed`

## Storefront refresh

`ProductDiscovery` subscribes through:

`subscribeBrowserStorefrontDataChanged`

It responds to Catalog and Inventory changes.

## Movement chronology

InventoryMovement has no timestamp.

Use repository append order only.

Do not invent timestamps.

## Quality Gate

```text
PASSO 37 targeted: 52/52
Full suite:         594/594
Test files:         75/75
lint:               passed
typecheck:          passed
build:              passed
check:              passed
```

## Decisions

After PASSO 37:

`CODAL-DEC-001 -> CODAL-DEC-238`

Next:

`CODAL-DEC-239`

## Next action

PASSO 38 - Customer Account Data, Saved Profile and Customer Order Experience.

Focus:

- demo Customer profile data
- local persistence through abstraction
- customer-facing account surface
- Customer Order visibility
- no fake authentication
- no real personal account claim
- preserve Guest/Admin behavior