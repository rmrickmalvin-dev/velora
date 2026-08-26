# DOMAIN - VELORA

Last update: 2026-08-26

## BUILD 02 status

IN PROGRESS

## Stable architecture

```text
UI
|
v
Presentation
|
v
Application
|
v
Domain
^
|
Infrastructure
```

## Product discovery boundary

PASSO 25 Product discovery is a Presentation concern.

Current catalog scale allows the browser to filter the already-rendered active catalog model.

Discovery does not:

- change Repository Contracts
- query IndexedDB directly
- access seed directly
- add Domain search rules

## Search normalization

Presentation normalizes search text for:

- case
- accents
- surrounding whitespace

Searchable fields:

- Product name
- brand
- localized category label

## Product detail route

Canonical route:

`/{locale}/products/{slug}`

The route resolves Product through:

`VeloraApplication.getStorefrontProductBySlug`

Slug remains the canonical public Product identifier.

## Detail model

Presentation converts StorefrontProduct into:

- localized category
- variant display label
- locale-aware Money
- stock label
- quantity display
- locale links

No business invariant moved into Presentation.

## Stock rule

Product detail displays Inventory state.

It does not reserve, decrement or mutate stock.

## Commerce phase boundary

BUILD 02 Product pages remain read-only.

BUILD 03 may connect existing Application Cart Use Cases to interactive client composition.

## Next milestone

PASSO 26 - Storefront Navigation, Category Journeys and Visual Product Media Foundation.