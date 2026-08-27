# AI HANDOFF - VELORA

Last update: 2026-08-27

CODAL OS - Complete Edition active.

## State

BUILD 01 - CLOSED

BUILD 02 - CLOSED

BUILD 03 - CLOSED

BUILD 04 - IN PROGRESS

Latest validated step:

PASSO 39 - Admin Orders, Status Workflow and Operational Order Management

## Admin Order UI

Component:

`AdminOrdersPanel`

Rendered inside the existing ADMIN role workspace.

Supports:

- list all Orders
- status filter
- guest/Customer context
- item quantity
- line count
- subtotal
- next status selection
- review
- confirm

## Application

Use:

- `listAdminOrders`
- `changeOrderStatus`

Do not call OrderRepository from React.

## Domain

Use:

`getAllowedOrderStatusTransitions`

for Presentation options.

Use:

`transitionOrderStatus`

as the mutation authority.

Do not duplicate lifecycle rules in React.

## Transparency

Status change is not:

- payment capture
- payment confirmation
- real logistics
- Inventory mutation

Order has no timestamp.

Do not invent Order dates.

## Quality Gate

```text
PASSO 39 targeted: 52/52
Full suite:         690/690
Test files:         87/87
ESLint warnings:    0
typecheck:          passed
build:              passed
check:              passed
```

## Decisions

After PASSO 39:

`CODAL-DEC-001 -> CODAL-DEC-258`

Next:

`CODAL-DEC-259`

## Next action

PASSO 40 - Promotions, Pricing Simulator and Commercial Controls.

Focus:

- Promotion model and rules
- Admin promotional controls
- price/profit simulation
- explicit simulation vs persisted price distinction
- no fake tax/shipping precision
- localized commercial feedback