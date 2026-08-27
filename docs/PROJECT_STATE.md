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

PASSO 39 - Admin Orders, Status Workflow and Operational Order Management

## Admin Orders

The ADMIN workspace now includes persistent Order operations.

Admin can:

- list all persisted Orders
- filter by Order status
- inspect reference and identity context
- inspect item quantity and line count
- inspect commercial snapshot subtotal
- review the next Domain-allowed status
- explicitly confirm a status transition

## Application boundary

VeloraApplication exposes:

`listAdminOrders`

Existing mutation remains:

`changeOrderStatus`

Browser flow:

```text
AdminOrdersPanel
|
v
browser-admin-orders
|
v
VeloraApplication
|
v
listAdminOrders / changeOrderStatus
|
v
OrderRepository
|
v
IndexedDB
```

React does not access repositories or IndexedDbProvider.

## Domain lifecycle

The Domain service now exposes an immutable read of allowed transitions.

Rules remain:

- PENDING -> CONFIRMED or CANCELLED
- CONFIRMED -> PREPARING or CANCELLED
- PREPARING -> SHIPPED or CANCELLED
- SHIPPED -> DELIVERED
- DELIVERED -> terminal
- CANCELLED -> terminal

The existing `transitionOrderStatus` remains the mutation authority.

## Operational transparency

Order status changes do not represent:

- payment capture
- financial settlement
- real shipping integration
- Inventory mutation

No Order timestamps are invented because the current Order entity has no timestamp.

## Quality Gate

Latest evidence:

- PASSO 39 targeted tests: 52/52
- complete suite: 690/690
- 87 test files passed
- ESLint zero warnings
- typecheck passed
- production build passed
- `npm run check` passed

## Decisions

After PASSO 39:

`CODAL-DEC-001 -> CODAL-DEC-258`

Next available decision:

`CODAL-DEC-259`

## Next step

PASSO 40 - Promotions, Pricing Simulator and Commercial Controls.