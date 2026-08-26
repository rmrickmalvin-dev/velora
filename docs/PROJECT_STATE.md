# PROJECT STATE - VELORA

Last update: 2026-08-26

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

PASSO 34 - Demo Authentication Roles, Session Experience and Customer/Admin Entry

## Demo roles

Available interface roles:

- GUEST
- CUSTOMER
- ADMIN

Default:

`GUEST`

These are portfolio experience modes.

They are not real authentication identities.

## Demo session

Small shared session state is persisted through:

`src/features/session/browser-demo-session.ts`

Storage key:

`velora.demo.session.v1`

Only the role value is persisted.

No password, credential, token or personal profile is stored.

## Role entry

Localized routes:

- `/{locale}/login`
- `/{locale}/account`
- `/{locale}/admin`

All three are noindex.

## Quick exploration

Login provides:

- Explore as Customer
- Explore Admin dashboard
- Continue as Guest

No credentials are requested.

## Global role awareness

SessionIndicator is integrated into the existing global Cart cluster.

The current role is therefore visible across Storefront journeys that already expose CartIndicator.

Role state uses React useSyncExternalStore with:

- same-document session event
- browser storage event
- GUEST server snapshot

## Customer area

PASSO 34 establishes Customer workspace entry only.

Real account/profile data is not used yet.

## Admin area

PASSO 34 establishes Admin workspace entry only.

Catalog, Inventory and operational controls remain for later BUILD 04 units.

## Quality Gate

Latest evidence:

- PASSO 34 targeted tests: 40/40
- complete suite: 462/462
- 58 test files passed
- lint passed
- typecheck passed
- production build passed
- login/account/admin SSG passed
- `npm run check` passed

## Decisions

After PASSO 34:

`CODAL-DEC-001 -> CODAL-DEC-208`

Next available decision:

`CODAL-DEC-209`

## Next step

PASSO 35 - Admin Storefront Context, Catalog Controls and Inventory Visibility.