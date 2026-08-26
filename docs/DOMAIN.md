# DOMAIN - VELORA

Last update: 2026-08-26

## BUILD 02 status

IN PROGRESS

## Category route boundary

Category route keys are Presentation/public-navigation concepts.

Canonical public values:

- smartphone
- audio
- power
- protection

They map to the existing Domain category ids for presentation.

No Domain category identifier was changed.

## Category pages

Category pages use:

```text
StaticVeloraRuntime
|
v
VeloraApplication
|
v
Storefront query
|
v
Presentation category filter
```

No new Repository Contract was required.

## Product media boundary

ProductMedia remains the canonical Domain/Application media metadata source.

PASSO 26 adds a Presentation media descriptor:

```text
StorefrontProductVisual
```

Fields:

- canonicalMediaUrl
- canonicalAlt
- fallbackAsset

The fallback is a Presentation concern.

## Seed immutability

Seeded ProductMedia paths remain untouched.

Local fallback art does not replace canonical seeded media data.

## ProductVisual

The shared visual component renders current local fallback assets.

It is safe to replace this rendering strategy later when final local ProductMedia assets exist.

That change should remain in Presentation/Infrastructure asset delivery and not alter Domain entities.

## Next milestone

PASSO 27 - Storefront Accessibility, SEO and BUILD 02 Visual Quality Expansion.