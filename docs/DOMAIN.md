# DOMAIN - VELORA

Last update: 2026-08-27

## BUILD 04 status

IN PROGRESS

## Admin Catalog mutation

Application use cases:

- updateAdminProduct
- updateAdminVariantPrice

The use cases load current Domain entities, recreate them through Domain factories, then save through repository contracts.

## Product update preservation

Mutable in PASSO 36:

- name
- brand
- model
- featured

Preserved:

- id
- slug
- categoryId
- status

## Variant price preservation

Mutable:

- Money minorUnits

Preserved:

- id
- productId
- SKU
- currency
- status
- attributes

## Inventory boundary

Price/Product mutation does not mutate Inventory.

## Presentation validation

Admin form validation and decimal parsing live in Feature code.

Domain remains the final invariant boundary through Product/ProductVariant/Money factories.

## Persistent overrides

ProductRepository and ProductVariantRepository remain the persistence abstraction.

Browser IndexedDB selection stays inside Infrastructure composition.

## Next milestone

PASSO 37 - Inventory Adjustment Controls, Movement History and Admin Stock Operations.