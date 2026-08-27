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

PASSO 38 - Customer Account Data, Saved Profile and Customer Order Experience

## Customer Account

The CUSTOMER role now receives a dedicated account surface inside the existing localized `/[locale]/account` route.

The Account is still an experience gate, not a security boundary.

## Demo Customer Profile

The Profile contains:

- fullName
- email
- phone
- city

Default values are fictional.

The Profile persists only in this browser through a Feature adapter:

`velora.demo.customer-profile.v1`

React does not access localStorage directly.

## Profile boundary

The saved Profile is browser-local experience state.

It is not:

- a real authenticated identity
- a remote account
- a canonical Domain Customer record
- a checkout Customer binding

This separation is intentional until a later Customer/Authentication backend step.

## Customer Order experience

The Account reuses existing demo Order history.

Orders shown in the Account are the Orders created by this local browser demo.

They remain guest demo Orders with no verified Customer identity binding.

This is explicitly disclosed in the UI.

## Reset

Existing global browser demo reset now clears:

- IndexedDB demo overrides through resetDemo
- demo Customer Profile
- Cart presentation refresh

The active demo role is not reset.

## Quality Gate

Latest evidence:

- PASSO 38 targeted tests: 40/40
- complete suite: 634/634
- 81 test files passed
- ESLint zero warnings
- typecheck passed
- production build passed
- `npm run check` passed

## Decisions

After PASSO 38:

`CODAL-DEC-001 -> CODAL-DEC-248`

Next available decision:

`CODAL-DEC-249`

## Next step

PASSO 39 - Admin Orders, Status Workflow and Operational Order Management.