# DOMAIN - VELORA

Last update: 2026-08-27

## BUILD 04 status

IN PROGRESS

## Customer Profile boundary

PASSO 38 intentionally does not create a new Domain Customer entity or authentication model.

`DemoCustomerProfile` is Feature-level browser-local experience state.

It exists to make the portfolio Account surface useful while keeping identity claims honest.

## Profile fields

- fullName
- email
- phone
- city

Feature validation normalizes and validates browser input before persistence.

## Persistence

Profile storage:

`velora.demo.customer-profile.v1`

The adapter is isolated from React.

## Order boundary

Customer Account displays existing guest demo Orders.

No Order customerId is assigned from the Profile in PASSO 38.

Therefore:

- Profile data cannot silently become Order identity
- checkout behavior remains unchanged
- existing Order lifecycle remains valid
- no fake verified Customer relationship is introduced

## Reset

Global browser demo reset clears the Profile in addition to existing persistent demo data.

## Next milestone

PASSO 39 - Admin Orders, Status Workflow and Operational Order Management.