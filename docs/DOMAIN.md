# DOMAIN - VELORA

Last update: 2026-08-26

## BUILD 03 status

IN PROGRESS

## Cart review boundary

Cart Drawer is a UI surface.

It does not own Cart business rules.

Mutations flow through:

`CartExperience`

then:

`VeloraApplication`

then existing Domain services.

## Cart line enrichment

Cart Domain entities preserve purchase intent.

Presentation display metadata such as Product name and SKU is joined from Application Storefront data.

This avoids moving Product display snapshots into the mutable Cart Domain.

OrderItem remains the layer that owns commercial snapshots for placed orders.

## Quantity update

UI sends:

- cartItemId
- productVariantId
- quantity

Feature adapter forwards the operation to the existing Application update use case.

Domain/Application remain authoritative for valid Cart transitions.

## Removal

Removal uses the same Feature/Application path.

UI does not edit persisted records directly.

## Inventory

Cart quantity operations do not mutate Inventory.

## Next milestone

PASSO 31 - Demo Checkout Foundation, Cart Validation and Conversion Journey.