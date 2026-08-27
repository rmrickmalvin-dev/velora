# AI HANDOFF - VELORA

Last update: 2026-08-27

CODAL OS - Complete Edition active.

## State

BUILD 01 - CLOSED

BUILD 02 - CLOSED

BUILD 03 - CLOSED

BUILD 04 - IN PROGRESS

Latest validated step:

PASSO 35 - Admin Storefront Context, Catalog Controls and Inventory Visibility

## Admin Storefront

When demo role is ADMIN:

- Product cards expose Edit Product and Inventory controls
- Product detail exposes the same controls
- numeric stock is visible

These controls are read/navigation only in PASSO 35.

## Admin Dashboard

Component:

`AdminCatalogDashboard`

Data adapter:

`browser-admin-catalog`

Read model:

`buildAdminCatalogModel`

Data path:

`VeloraApplication.listStorefrontProducts`

Do not import repositories or IndexedDB into Admin React components.

## Low stock

`lowStock` in the Admin read model is Presentation guidance at quantity <= 5.

It is not a Domain rule.

## Mutations

Do not implement Product/price/Inventory writes as hidden side effects.

Next step owns those mutations explicitly.

## Quality Gate

```text
PASSO 35 targeted: 40/40
Full suite:         494/494
Test files:         62/62
lint:               passed
typecheck:          passed
build:              passed
check:              passed
```

## Decisions

After PASSO 35:

`CODAL-DEC-001 -> CODAL-DEC-218`

Next:

`CODAL-DEC-219`

## Next action

PASSO 36 - Admin Product Editing, Price Controls and Persistent Catalog Overrides.

Focus:

- explicit Product edit form
- Variant price edits
- persistent Catalog overrides
- Zod/domain validation boundaries
- confirmation before meaningful mutations
- Storefront refresh after mutation
- no direct persistence from React