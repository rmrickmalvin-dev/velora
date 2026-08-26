# AI HANDOFF - VELORA

Last update: 2026-08-26

CODAL OS - Complete Edition active.

## State

BUILD 01 - CLOSED

BUILD 02 - CLOSED

BUILD 03 - IN PROGRESS

Latest validated step:

PASSO 29 - Browser Runtime, Cart Experience State and Add-to-Cart Integration

## Browser commerce composition

Client components may use:

`getBrowserCartExperience`

They must not import:

- IndexedDbProvider
- PersistenceProvider
- concrete persistent repositories

## Cart id

Stable:

`velora-demo-cart`

## Add-to-cart

Product detail now activates the existing Application addProductToCart use case.

Do not duplicate merge or Inventory validation rules in React.

## Cart indicator

Visible on:

- Storefront home
- category page
- Product detail

It reloads persisted Cart state on mount.

Same-page mutations emit:

`velora:cart-changed`

## Persistence

IndexedDB remains selected by:

`createBrowserVeloraRuntime`

Do not move persistence into UI components.

## Inventory

Adding to Cart must not mutate Inventory.

## Quality Gate

```text
PASSO 29 targeted: 22/22
Full suite:         319/319
Test files:         41/41
lint:               passed
typecheck:          passed
build:              passed
check:              passed
```

## Decisions

After PASSO 29:

`CODAL-DEC-001 -> CODAL-DEC-162`

Next:

`CODAL-DEC-163`

## Next action

PASSO 30 - Cart Drawer, Quantity Controls and Persistent Cart Review.

Focus:

- accessible Cart surface
- line-item review
- quantity update
- remove item
- subtotal
- empty state
- persistent reload
- no checkout/payment yet