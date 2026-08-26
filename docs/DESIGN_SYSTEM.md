# DESIGN SYSTEM - VELORA

Last update: 2026-08-26

Status: BUILD 02 FOUNDATION ACTIVE

## Name

Pearl Technology

## Intent

Create a premium technology Storefront that feels:

- clear
- refined
- modern
- confident
- human

The visual system must not imitate Apple.

## Color architecture

Pearl:

- Pearl 0
- Pearl 50
- Pearl 100
- Pearl 200

Ink:

- Ink 900
- Ink 800
- Ink 700
- Ink 600
- Ink 500

Champagne / Gold:

- Gold 700
- Gold 600
- Gold 500
- Gold 300
- Gold 200
- Gold 100

Semantic:

- Success
- Danger

## Gold rule

Gold is an accent.

Use it for:

- emphasis
- premium detail
- technical markers
- selected state
- subtle glow

Do not use gold as a large dominant background for normal Storefront sections.

## Typography

UI stack:

`Manrope`, then system fallbacks.

Technical stack:

`IBM Plex Mono`, then mono fallbacks.

PASSO 24 does not load remote fonts.

The named fonts may be connected later with an explicit performance decision.

## Spacing

Token scale:

- 1
- 2
- 3
- 4
- 5
- 6
- 8
- 10
- 12
- 16
- 20

## Radius

- small
- medium
- large
- extra large
- pill

## Shadows

- small
- medium
- gold accent

Shadows should remain soft and low-contrast.

## Surfaces

Primary surfaces combine:

- pearl background
- translucent white
- subtle border
- restrained blur

Glass effect is decorative, not a dependency for content readability.

## Motion

Motion must be:

- subtle
- transform-based
- decorative
- reduced-motion aware

PASSO 24 hero devices use transform animation only.

## Responsive baseline

Desktop:

- 4-column category/Product grids

Tablet:

- 2-column grids

Mobile:

- 1-column grids
- reduced visual scale
- no horizontal overflow dependency

## Current components

- StorefrontShell
- hero action buttons
- locale switch
- category cards
- Product cards
- experience cards
- footer

## Next component evolution

PASSO 25 may add:

- category filter controls
- Product discovery controls
- interactive Product cards
- Product detail navigation
- empty/filter states

Reuse existing tokens before adding new tokens.
## Global CSS rule

`src/styles/design-tokens.css` is a normal global CSS file.

Use native global selectors there:

- `:root`
- `html`
- `body`
- `*`
- `::selection`

Do not use CSS Modules-only `:global(...)` syntax in this file.

Component-scoped selectors remain in `.module.css` files.