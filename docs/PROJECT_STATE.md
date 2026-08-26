# PROJECT STATE - VELORA

Last update: 2026-08-26

## Phase

BUILD 03 - Commerce Interaction

## State

IN PROGRESS

## BUILD 01

CLOSED AND VALIDATED

## BUILD 02

CLOSED AND VALIDATED

## Latest validated step

PASSO 30 - Cart Drawer, Quantity Controls and Persistent Cart Review

## Cart review surface

The persistent Cart is now reviewable from all existing Cart indicators.

Cart indicator opens an accessible side drawer.

## Cart Drawer

Available:

- persisted Cart reload
- Product name
- SKU
- line quantity
- line total
- subtotal
- increase quantity
- decrease quantity
- remove line
- empty state
- loading state
- Escape close
- backdrop close
- focus on close control
- body scroll lock while open

## Cart Feature model

CartExperienceSnapshot now includes:

- totalItems
- lineCount
- subtotalMinorUnits
- currency
- lines

Each line includes:

- cartItemId
- productVariantId
- productName
- SKU
- quantity
- unit price
- currency

Product/SKU display metadata is enriched through Application Storefront data.

## Quantity mutation

Quantity changes continue through:

```text
Cart Drawer
|
v
Browser Cart Experience
|
v
VeloraApplication
|
v
Domain Cart rules
|
v
Persistent Repository
```

The Drawer does not call Application use cases directly.

## Persistence

Cart quantity and removal changes persist through the same browser IndexedDB composition established in PASSO 29.

Runtime recreation with the same provider preserves:

- added lines
- updated quantities

## Inventory

Cart quantity changes do not mutate Inventory.

No stock reservation occurs.

## Checkout boundary

PASSO 30 is Cart review only.

Checkout and payment remain deferred.

## Quality Gate

Latest evidence:

- PASSO 30 targeted tests: 30/30
- complete suite: 335/335
- 42 test files passed
- lint passed
- typecheck passed
- production build passed
- `npm run check` passed

## Decisions

After PASSO 30:

`CODAL-DEC-001 -> CODAL-DEC-170`

Next available decision:

`CODAL-DEC-171`

## Next step

PASSO 31 - Demo Checkout Foundation, Cart Validation and Conversion Journey.