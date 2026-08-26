# DOMAIN - VELORA

Last update: 2026-08-26

## BUILD 01

CLOSED AND VALIDATED

Domain and Application foundation remains stable.

## BUILD 02 integration rule

UI consumes Application-facing data.

UI does not:

- access IndexedDB directly
- access localStorage directly
- import concrete persistent repositories
- create raw Product records
- duplicate Domain validation

## Static Storefront composition

PASSO 24 introduces:

`createStaticVeloraRuntime`

Purpose:

- SSG Storefront composition
- server-safe data access
- no browser API dependency
- same VeloraApplication facade

Architecture:

```text
Next.js SSG Page
|
v
StaticVeloraRuntime
|
v
VeloraApplication
|
v
Domain Repository Contracts
|
v
Local Repository Infrastructure
|
v
VELORA Seed
```

This composition is read-oriented for static Storefront output.

Persistent browser interaction remains separate.

## Presentation model

`StorefrontHomeModel` converts Application results into UI-ready display data.

Presentation responsibilities include:

- locale-aware Money formatting
- localized category labels
- stock display labels
- locale switch links
- first featured Product selection

Money formatting remains outside Domain.

## Product card data

Each visible card receives:

- Product id
- Slug
- brand
- name
- category
- minimum active Variant price
- aggregated Inventory availability
- featured state

These values originate from Application output.

## Design System boundary

CSS Design Tokens are Presentation concerns.

They do not enter Domain or Application.

## Motion

Decorative hero movement is CSS-only.

`prefers-reduced-motion` disables nonessential animation.

## Next milestone

PASSO 25 - Storefront Product Discovery and Product Card Interaction.