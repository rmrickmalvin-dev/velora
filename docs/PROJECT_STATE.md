# PROJECT STATE - VELORA

Last update: 2026-08-27

## Phase

BUILD 04 - Application and Data Experience

## State

IN PROGRESS

## BUILD 01

CLOSED AND VALIDATED

## BUILD 02

CLOSED AND VALIDATED

## BUILD 03

CLOSED AND VALIDATED

## Latest validated step

PASSO 35 - Admin Storefront Context, Catalog Controls and Inventory Visibility

## Admin Storefront context

When the current demo role is ADMIN, Product discovery cards and Product detail expose discreet contextual controls.

Controls:

- Edit Product
- Inventory
- numeric stock visibility
- Admin mode label

The controls route into the existing localized Admin workspace.

They do not mutate data in PASSO 35.

## Admin Catalog Dashboard

The ADMIN workspace now loads a browser-persistent operational read model through:

```text
AdminCatalogDashboard
|
v
browser-admin-catalog
|
v
createBrowserVeloraRuntime
|
v
VeloraApplication.listStorefrontProducts
|
v
Persistent Repositories
```

React components do not access repositories or IndexedDB directly.

## Admin read model

Dashboard includes:

- active Product count
- active Variant count
- total Inventory units
- low-stock Variant count
- Product identity
- Variant SKU
- localized price
- quantityOnHand
- availability/attention state

## Scope

PASSO 35 is read-only.

It does not yet:

- create Product
- edit Product
- archive Product
- change price
- mutate Inventory
- append InventoryMovement

Those mutations remain explicit later BUILD 04 units.

## Storefront model

StorefrontProductCard now also exposes numeric:

`stockUnits`

This allows ADMIN context to show real current Inventory totals without parsing localized stock labels.

## Quality Gate

Latest evidence:

- PASSO 35 targeted tests: 40/40
- complete suite: 494/494
- 62 test files passed
- lint passed
- typecheck passed
- production build passed
- `npm run check` passed

## Decisions

After PASSO 35:

`CODAL-DEC-001 -> CODAL-DEC-218`

Next available decision:

`CODAL-DEC-219`

## Next step

PASSO 36 - Admin Product Editing, Price Controls and Persistent Catalog Overrides.