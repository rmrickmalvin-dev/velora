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

PASSO 29 - Browser Runtime, Cart Experience State and Add-to-Cart Integration

## Commerce activation

The first browser-persistent commerce mutation is now active.

Product detail can add an available Product Variant to the demo Cart.

## Browser composition

Browser Cart flow:

```text
Client Component
|
v
browser-cart-runtime
|
v
createBrowserVeloraRuntime
|
v
VeloraApplication
|
v
Persistent Repositories
|
v
IndexedDB
```

Components do not import IndexedDB or concrete persistence providers.

## Cart identity

Stable demo Cart id:

`velora-demo-cart`

Cart item ids are deterministic per Product Variant:

`cart-item-{productVariantId}`

Repeated add on the same Variant therefore follows the existing Application merge behavior.

## Cart experience snapshot

UI reads a Presentation/Feature snapshot:

- totalItems
- lineCount
- subtotalMinorUnits
- currency

Cart indicator count is the sum of Cart item quantities, not only line count.

## Storefront integration

Cart indicator is visible in:

- Home
- Category
- Product detail

Product detail additionally provides:

- add-to-cart button per active Variant
- loading state
- unavailable state
- localized success feedback
- localized error feedback

## Persistence

The browser runtime uses the already-validated IndexedDB Infrastructure composition.

Cart state is loaded again when route components mount after navigation/reload.

A same-document `velora:cart-changed` browser event refreshes visible Cart indicators after mutation.

The event is UI synchronization only.

Persistence remains IndexedDB.

## Inventory rule

Add-to-cart validates available Inventory through Application but does not mutate Inventory.

Reservation/decrement remains outside this step.

## Quality Gate

Latest evidence:

- PASSO 29 targeted tests: 22/22
- complete suite: 319/319
- 41 test files passed
- lint passed
- typecheck passed
- production build passed
- Storefront SSG passed
- Category SSG passed
- Product SSG passed
- `npm run check` passed

## Decisions

After PASSO 29:

`CODAL-DEC-001 -> CODAL-DEC-162`

Next available decision:

`CODAL-DEC-163`

## Next step

PASSO 30 - Cart Drawer, Quantity Controls and Persistent Cart Review.