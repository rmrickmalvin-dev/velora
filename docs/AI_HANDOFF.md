# AI HANDOFF - VELORA

Last update: 2026-08-27

CODAL OS - Complete Edition active.

## State

BUILD 01 - CLOSED

BUILD 02 - CLOSED

BUILD 03 - CLOSED

BUILD 04 - IN PROGRESS

Latest validated step:

PASSO 38 - Customer Account Data, Saved Profile and Customer Order Experience

## Customer Account

Route:

`/[locale]/account`

The existing CUSTOMER role gate remains active.

Component:

`CustomerAccountPanel`

## Demo Profile

Feature model:

`demo-customer-profile-model`

Browser adapter:

`browser-demo-customer-profile`

Storage key:

`velora.demo.customer-profile.v1`

Do not access localStorage from React.

## Identity warning

The Profile is not:

- real authentication
- remote account identity
- Domain Customer identity
- checkout Customer binding

Do not silently change this boundary.

## Customer Orders

Account uses:

`loadBrowserDemoOrders`

These remain browser-local guest demo Orders.

Do not claim they are verified Customer Orders.

## Reset

`resetBrowserDemoData` also calls:

`resetBrowserDemoCustomerProfile`

Active session role remains untouched.

## Quality Gate

```text
PASSO 38 targeted: 44/44
Full suite:         638/638
Test files:         81/81
ESLint warnings:    0
typecheck:          passed
build:              passed
check:              passed
```

## Decisions

After PASSO 38:

`CODAL-DEC-001 -> CODAL-DEC-248`

Next:

`CODAL-DEC-249`

## Next action

PASSO 39 - Admin Orders, Status Workflow and Operational Order Management.

Focus:

- Admin Order list
- status transitions through existing Domain Order lifecycle
- explicit confirmation
- persistent status changes
- operational filtering
- no real payment claim
- no Inventory side effects from status mutation