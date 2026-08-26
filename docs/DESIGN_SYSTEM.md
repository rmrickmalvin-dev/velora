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
## Product discovery controls

PASSO 25 adds:

- pill category filters
- pill search surface
- result count
- empty state
- Product detail action

Rules:

- active filter uses Ink 900
- inactive filters remain low-contrast
- search remains visually quiet
- Product card motion uses transform only
- card interaction must not hide commercial information

## Product detail foundation

Product detail keeps the Pearl Technology language:

- pearl Product stage
- large Product title
- restrained gold accents
- technical SKU labels
- variant cards
- low-contrast stock metadata

Product detail remains read-only during BUILD 02.
## Product visual media

PASSO 26 introduces one shared ProductVisual primitive.

Current visual source:

- local SVG fallback by Product category

Canonical ProductMedia metadata remains available in the Presentation descriptor.

Rules:

- preserve canonical media reference
- never mutate the immutable seed to satisfy a temporary visual need
- use local assets for reliable portfolio rendering
- do not depend on remote Product image URLs
- keep Product name as the primary accessible identification near decorative art
- replace fallback rendering in one shared component when final Product media is ready
## Accessibility quality layer

PASSO 27 adds:

- global focus-visible treatment
- keyboard skip links
- sticky-header scroll offset
- increased-contrast border tokens
- localized accessibility labels

Rules:

- never remove focus without an equivalent visible replacement
- preserve reduced motion
- skip links must remain keyboard reachable
- higher contrast may strengthen tokens without changing layout
## Desktop vertical navigation

BUILD 02 closes with the approved conventional vertical navigation pattern.

Desktop:

- 15.5rem fixed rail
- content offset by the same rail width
- VELORA brand at the top
- primary journey navigation below
- locale controls anchored toward the lower rail area

Tablet/mobile:

- rail is removed
- content offset returns to zero
- sticky top navigation becomes active
- locale targets increase to at least 2.75rem

## Responsive overflow rule

The page must never require horizontal viewport scrolling.

Allowed exception:

- the category-filter strip may scroll horizontally inside its own local container on narrow mobile screens

Use local overflow instead of page overflow.
## Cart interaction

BUILD 03 begins with restrained Pearl Technology commerce feedback.

Cart indicator:

- compact pill
- localized label
- Ink quantity badge
- aria-live count

Add-to-cart:

- full-width Variant action
- Ink background
- pill radius
- visible focus
- disabled unavailable state
- localized live feedback

Commerce feedback should be clear without introducing aggressive sales styling.
## Cart Drawer

PASSO 30 expands the compact Cart indicator into a persistent review drawer.

Visual rules:

- right-side panel on desktop
- full-width panel on narrow mobile
- pearl background
- Ink commercial hierarchy
- gold reserved for technical accents
- destructive remove action uses semantic danger token
- quantity controls remain compact and circular
- subtotal remains fixed in the drawer footer

Accessibility rules:

- dialog semantics
- modal intent
- Escape close
- explicit close control
- visible focus
- reduced-motion fallback
- body scroll lock only while the drawer is open
## Demo Checkout

PASSO 31 creates a transparent conceptual checkout journey.

Visual rules:

- preserve desktop vertical VELORA navigation
- use two-column summary/form composition on desktop
- collapse to one column on tablet/mobile
- keep the no-payment notice visually visible but restrained
- use semantic danger styling only for validation errors
- keep success confirmation calm and non-transactional

Language rule:

The interface must never imply that payment, charging or a real order occurred during PASSO 31.
## Demo Order confirmation

PASSO 32 turns a validated conceptual checkout into a persistent demo Order.

Confirmation rules:

- use calm Pearl Technology presentation
- label the identifier as an Order reference
- expose PENDING as Order status
- explicitly repeat that no charge occurred
- never render fake payment authorization or transaction identifiers
- clear visible Cart state only after Order persistence succeeds
## Demo Order history

BUILD 03 closes with a browser-local Order history surface.

Rules:

- keep conceptual Order references technical and readable
- show status, quantity and subtotal without payment language
- mark the route noindex
- keep reset visually separated from normal browsing actions
- require a second explicit confirmation before reset
- use the existing semantic danger token for reset confirmation

Checkout and local Order history are browser-state commerce routes and should not be indexed.