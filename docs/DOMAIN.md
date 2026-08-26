# DOMAIN - VELORA

Last update: 2026-08-26

## BUILD 03

CLOSED AND VALIDATED

## OrderRepository evolution

OrderRepository now supports:

- findById
- list
- listByCustomerId
- save

`list` is required for guest demo history because guest Orders intentionally have no CustomerId.

## Guest demo history

Application operation:

`listDemoOrders`

filters Orders where:

`customerId === undefined`

Presentation then derives:

- total quantity
- line count
- subtotal
- status
- Order reference

Subtotal comes from OrderItem snapshots through Domain `calculateOrderSubtotal`.

## Reset boundary

Browser demo reset delegates to:

`VeloraRuntime.resetDemo`

No Domain entity owns reset behavior.

Reset is Infrastructure/demo-environment lifecycle behavior.

## Inventory boundary

BUILD 03 commerce completion still does not mutate Inventory.

## Next phase

BUILD 04 - Application and Data Experience

Next milestone:

PASSO 34 - Demo Authentication Roles, Session Experience and Customer/Admin Entry.