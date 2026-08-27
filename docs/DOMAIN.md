# DOMAIN - VELORA

Last update: 2026-08-27

## BUILD 04 status

IN PROGRESS

## Order operational boundary

PASSO 39 reuses the existing Order Domain lifecycle.

Mutation authority:

`transitionOrderStatus`

Application mutation:

`changeOrderStatus`

Admin read:

`listAdminOrders`

## Allowed transitions

- PENDING -> CONFIRMED, CANCELLED
- CONFIRMED -> PREPARING, CANCELLED
- PREPARING -> SHIPPED, CANCELLED
- SHIPPED -> DELIVERED
- DELIVERED -> none
- CANCELLED -> none

The Domain service exposes an immutable transition snapshot for Presentation through:

`getAllowedOrderStatusTransitions`

React does not duplicate transition rules.

## Persistence

Status mutation saves the recreated immutable Order through OrderRepository.

Order item commercial snapshots are preserved.

## Side effects

Order status mutation does not:

- mutate Inventory
- mutate Cart
- alter Product pricing
- represent payment capture

## Chronology

Order currently has no timestamp.

Admin Order UI does not invent dates or chronological metadata.

## Next milestone

PASSO 40 - Promotions, Pricing Simulator and Commercial Controls.