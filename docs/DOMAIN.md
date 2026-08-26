# DOMAIN - VELORA

Last update: 2026-08-26

## BUILD 03 status

IN PROGRESS

## Browser Cart boundary

UI components do not select persistence providers.

They call:

`browser-cart-runtime`

which lazily selects:

`createBrowserVeloraRuntime`

The Infrastructure composition root remains the only browser persistence selection point.

## Cart Experience

Feature layer:

`createCartExperience`

Responsibilities:

- load Cart summary through Application
- add one Product Variant through Application
- transform Application summary into UI experience snapshot

It does not duplicate Cart merge rules.

## Stable Cart identity

Demo Cart:

`velora-demo-cart`

Deterministic Cart item id:

`cart-item-{productVariantId}`

The existing Application/Domain Cart behavior remains authoritative.

## Inventory boundary

Add-to-cart:

- validates Inventory availability
- does not decrement Inventory
- does not append InventoryMovement
- does not reserve stock

## Browser event

`velora:cart-changed`

is a same-document Presentation synchronization signal.

It is not persistence and does not replace repository state.

## Next milestone

PASSO 30 - Cart Drawer, Quantity Controls and Persistent Cart Review.