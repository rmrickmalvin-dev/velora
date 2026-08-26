# DOMAIN - VELORA

Last update: 2026-08-26

## BUILD 03 status

IN PROGRESS

## Checkout boundary

PASSO 31 checkout remains a UI/Feature validation journey.

It does not create an Order.

## Cart validation

`validateCheckoutCart`

verifies that the current Cart is coherent enough to enter checkout.

It does not replace Domain Cart invariants.

Checks include:

- non-empty Cart
- positive safe quantities
- available subtotal/currency
- line currency consistency

## Form validation

`validateCheckoutForm`

is a pure Feature model.

It normalizes and validates:

- fullName
- email
- addressLine
- city
- postalCode

These values do not become Domain entities in PASSO 31.

## Privacy boundary

Checkout form values are ephemeral UI state.

No persistence or network submission is performed.

## Order boundary

Order creation remains separate.

When activated, OrderItem must continue preserving commercial snapshots.

Do not reuse mutable Cart as an Order record.

## Next milestone

PASSO 32 - Demo Order Creation, Confirmation and Cart Completion.