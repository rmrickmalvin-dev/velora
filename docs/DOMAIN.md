# DOMAIN - VELORA

Last update: 2026-08-27

## BUILD 04 status

IN PROGRESS

## Commercial simulation boundary

PASSO 40 intentionally keeps Promotion scenarios outside the canonical Domain.

Reason:

- they are planning/simulation artifacts
- they do not affect checkout
- they do not alter ProductVariant price
- they do not alter Order snapshots
- backend Promotion activation remains a later explicit step

## Simulator arithmetic

Base price:

existing ProductVariant price in minor units.

Discount:

percentage parsed into basis points.

Promotional price:

base price minus rounded discount amount.

Gross profit simulation:

promotional price minus estimated cost.

Gross margin simulation:

gross profit divided by promotional price.

## Non-goals

PASSO 40 does not model:

- taxes
- shipping
- payment fees
- accounting standards
- real promotional eligibility

## Persistence

Scenario storage:

`velora.demo.promotions.v1`

This is browser-local Feature state.

## Next milestone

PASSO 41 - Search, Discovery Intelligence and Catalog Navigation Refinement.