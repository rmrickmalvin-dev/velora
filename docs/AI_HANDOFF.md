# AI HANDOFF - VELORA

Last update: 2026-08-26

CODAL OS - Complete Edition active.

## State

BUILD 01 - CLOSED

BUILD 02 - CLOSED

BUILD 03 - CLOSED

BUILD 04 - IN PROGRESS

Latest validated step:

PASSO 34 - Demo Authentication Roles, Session Experience and Customer/Admin Entry

## Role model

Roles:

- GUEST
- CUSTOMER
- ADMIN

Default:

GUEST

These are demo interface modes.

Do not describe them as secure authentication.

## Browser session adapter

Use:

`browser-demo-session`

Storage:

`velora.demo.session.v1`

Persist only the demo role.

Do not store:

- passwords
- auth tokens
- personal account records

## Global UI

SessionIndicator is composed into CartIndicator.

This makes current role visible throughout existing Storefront commerce journeys.

## Demo routes

- `/{locale}/login`
- `/{locale}/account`
- `/{locale}/admin`

All are noindex.

## Customer/Admin scope

PASSO 34 creates role-aware entry foundations only.

Do not invent full Customer profile or Admin CRUD yet.

## Quality Gate

```text
PASSO 34 targeted: 40/40
Full suite:         462/462
Test files:         58/58
lint:               passed
typecheck:          passed
build:              passed
check:              passed
```

## Decisions

After PASSO 34:

`CODAL-DEC-001 -> CODAL-DEC-208`

Next:

`CODAL-DEC-209`

## Next action

PASSO 35 - Admin Storefront Context, Catalog Controls and Inventory Visibility.

Focus:

- discreet Admin context on Storefront
- role-aware Product controls
- Catalog and Inventory read models
- no direct repository access from React
- mutations remain explicit and auditable