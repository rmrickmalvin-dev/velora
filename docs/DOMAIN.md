# DOMAIN - VELORA

Last update: 2026-08-26

## BUILD 03 status

IN PROGRESS

## Demo Order use case

Application use case:

`createDemoOrderFromCart`

Dependencies:

- CartRepository
- OrderRepository
- ProductRepository
- ProductVariantRepository

## Order snapshot rule

OrderItem is created from the current Cart plus canonical Product/Variant identity.

Snapshot fields:

- Product name
- SKU
- Cart unit price
- quantity

This preserves the existing distinction between:

- mutable purchase intent in Cart
- historical commercial record in Order

## Completion ordering

Current persistence sequence:

1. fully validate and build Order
2. save Order
3. remove Cart

This prefers preserving the historical Order over clearing Cart early.

## Identity conflict

An existing Order id causes:

`APPLICATION_ORDER_ID_CONFLICT`

The active Cart is not cleared in that failure path.

## Customer data

PASSO 32 creates a guest Order.

Checkout personal fields are not persisted into Order.

## Inventory

Order creation does not mutate Inventory.

Stock reservation/decrement remains an explicit future decision.

## Next milestone

PASSO 33 - Demo Order History, Reset Flow and BUILD 03 Closure.