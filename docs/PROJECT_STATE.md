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

PASSO 36 - Admin Product Editing, Price Controls and Persistent Catalog Overrides

## Admin Product mutation

VeloraApplication now exposes:

- updateAdminProduct
- updateAdminVariantPrice

Product update can change:

- name
- brand
- model
- featured

It preserves:

- id
- slug
- category
- status

Variant price update preserves:

- Variant id
- Product id
- SKU
- currency
- status
- attributes

## Persistence

Mutations are saved through existing ProductRepository and ProductVariantRepository contracts.

Browser flow:

```text
AdminProductEditor
|
v
browser-admin-catalog-mutations
|
v
VeloraApplication
|
v
Application mutation use case
|
v
Persistent Repository
|
v
IndexedDB
```

React does not import repositories or IndexedDbProvider.

## Confirmation

Product details and Variant prices require a review/confirmation step before mutation.

## Price input

Admin UI accepts:

- whole decimal values
- dot decimal separator
- comma decimal separator
- maximum two decimal places

Application persists prices as Money minor units while preserving the current Variant currency.

## Browser Storefront refresh

Product Discovery starts from SSG data for fast rendering, then hydrates current browser-persistent Catalog overrides through VeloraApplication.

Catalog mutation emits:

`velora:catalog-changed`

Product Discovery subscribes and refreshes its browser Catalog cards.

## Reset

Existing resetDemo restores original seed Product and Variant price values.

## Inventory

Product and price mutation do not change Inventory.

## Quality Gate

Latest evidence:

- PASSO 36 targeted tests: 48/48
- complete suite: 542/542
- 68 test files passed
- lint passed
- typecheck passed
- production build passed
- `npm run check` passed

## Decisions

After PASSO 36:

`CODAL-DEC-001 -> CODAL-DEC-228`

Next available decision:

`CODAL-DEC-229`

## Next step

PASSO 37 - Inventory Adjustment Controls, Movement History and Admin Stock Operations.