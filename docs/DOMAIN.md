# DOMAIN - VELORA

Last update: 2026-08-27

## BUILD 04 status

IN PROGRESS

## Admin read boundary

PASSO 35 does not introduce new Domain mutation rules.

Admin Catalog visibility reads through the existing Application Storefront query and persistent repositories.

## Presentation read model

`buildAdminCatalogModel`

derives operational UI data from Storefront Application data.

It includes:

- Product identity
- Variant identity
- SKU
- current Variant price
- current Inventory quantity
- low-stock Presentation flag

The low-stock flag is Presentation guidance and is not a new Inventory invariant.

## Storefront Admin context

ADMIN controls are Feature/UI role-aware navigation.

They do not bypass Application boundaries.

## Mutation boundary

Product, price and Inventory writes are deliberately deferred.

## Next milestone

PASSO 36 - Admin Product Editing, Price Controls and Persistent Catalog Overrides.