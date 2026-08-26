# DOMAIN - VELORA

Last update: 2026-08-26

## BUILD 02 status

IN PROGRESS

## Accessibility boundary

PASSO 27 accessibility behavior remains in UI, i18n and Design System.

No Domain invariant changed.

Localized accessibility labels are separate from Domain data.

## SEO boundary

SEO is represented by:

`StorefrontSeoModel`

This Presentation model receives:

- locale
- title
- description
- route suffix

It produces:

- canonical path
- language alternates
- robots intent

Next.js route modules adapt this model into Next Metadata.

## Canonical identity

Product:

`/{locale}/products/{slug}`

Category:

`/{locale}/categories/{category}`

Home:

`/{locale}`

Domain entity ids are not exposed as public canonical route identity.

## Structured data policy

No Product Offer schema is emitted while:

- products are fictional
- checkout is not real
- payment is not real

## Next milestone

PASSO 28 - BUILD 02 Final Visual Review, Responsive Hardening and Closure.