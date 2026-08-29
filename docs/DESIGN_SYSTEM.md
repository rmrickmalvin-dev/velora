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
## Demo role session

BUILD 04 begins with an explicit role-selection experience.

Roles:

- Guest
- Customer
- Admin

Visual rules:

- role state is subtle and secondary to Storefront content
- role indicator shares the compact navigation cluster with Cart
- Admin uses restrained gold emphasis rather than a separate visual brand
- mobile collapses role copy to a compact status dot
- login cards explain capabilities without credential/security claims

Language rule:

Always describe role switching as a local demonstration or interface mode, never as real secure authentication.
## Admin Storefront context

PASSO 35 introduces a discreet ADMIN layer over the public Storefront.

Rules:

- Admin context must not visually replace the customer-facing Storefront
- contextual controls use restrained gold/dashed treatment
- controls appear only for ADMIN demo role
- stock is shown numerically to Admin
- Product and Inventory actions navigate to Admin context
- this pass is read-only
- operational Dashboard remains consistent with Pearl Technology
- low-stock attention may use semantic danger text without turning the entire card red
## Admin Product editing

PASSO 36 activates explicit persistent Catalog mutation.

Rules:

- mutation UI remains visually inside Admin context
- Product details and Variant price changes require review before confirmation
- edit form must expose validation beside the affected field
- persistent-local notice remains visible
- Variant currency is informational and preserved
- Admin Product cards remain readable while editor is open
- Product Discovery may hydrate persistent browser overrides after SSG
- mutation success must refresh the operational Admin view
## Admin Inventory operations

PASSO 37 activates stock operations inside the Admin Catalog.

Rules:

- Inventory controls belong to each Variant
- current quantity remains visible before the operation
- ENTRY, EXIT and ADJUSTMENT are explicit choices
- every movement requires a reason
- mutation requires review before confirmation
- movement history uses append order because the current Domain entity has no timestamp
- never invent dates for movement records
- negative-stock rejection comes from Domain
- Inventory feedback uses restrained operational styling rather than replacing the Product card
## Customer Account experience

PASSO 38 introduces the CUSTOMER account surface.

Rules:

- Account must clearly identify itself as a demo experience
- Profile data is fictional by default
- local-only persistence must be disclosed
- Profile form uses the same Pearl Technology field language as Admin forms
- validation appears beside affected fields
- Customer Orders are presented as browser-local demo Orders
- do not imply verified identity or real authentication
- Profile restoration is available without destructive confirmation because it restores fictional seed data only
## Admin Order operations

PASSO 39 introduces operational Order management.

Rules:

- Admin Orders remain inside the ADMIN role workspace
- status filtering is a Presentation concern
- current status is always visible before a transition
- next-status choices come from Domain transition data
- a status mutation requires review and explicit confirmation
- terminal Orders do not show mutation controls
- commercial subtotal uses immutable Order item snapshots
- status changes must never look like payment capture
- do not invent Order dates while Order has no timestamp
## Admin Commercial Simulator

PASSO 40 adds a restrained commercial planning surface.

Rules:

- current persisted Variant price is always shown as the base
- simulated promotional price must be visually separated from persisted price
- gross profit and margin must be labeled as simulations
- Promotion scenarios are local planning artifacts
- scenario save does not imply Storefront activation
- tax, shipping and payment fees must not be invented
- commercial controls reuse the Pearl Technology form language
- scenario deletion is local-only and reversible through recreation
## Storefront Search Intelligence

PASSO 41 refines Product Discovery.

Rules:

- Search controls remain visually secondary to Product content
- Search is accent-insensitive and supports multiple terms
- ranked results remain deterministic
- empty Search preserves Catalog order
- Category controls expose query-aware result counts
- Suggestions are derived from the current local Catalog only
- Search state is reflected in URL `q` and `category`
- Search input and Category controls share the same URL-state update path
- browser back/forward restores visible Search state
- no Search analytics or tracking is implied

## Product Detail Runtime Experience

The Product Detail keeps the Pearl Technology visual language while its commercial information can refresh after hydration.

Runtime-updatable visible information includes:

- Product name
- Brand
- Variant price
- stock label
- quantity on hand
- Variant availability

The static server render remains the immediate initial experience.

Localization quality is part of the Design System: PT-BR and ES visible copy must use correct orthography and accents.

## Browser Accessibility Verification

The Pearl Technology accessibility baseline is now verified both by source contracts and browser execution.

Runtime browser verification covers public Home, Category and Product journeys in PT-BR, EN and ES using axe WCAG A/AA rules.

Global `:focus-visible` and `prefers-reduced-motion` behavior remain mandatory Design System foundations.

## Modal Keyboard Contract

VELORA modal surfaces must preserve visible keyboard orientation.

The Cart Drawer baseline requires:

- focus entry
- visible focus
- focus containment while modal
- Escape close
- focus restoration to the opening control
- reduced-motion support
- explicit trigger-to-dialog relationship

Product Discovery Category filters remain native keyboard-operable buttons and continue to synchronize URL navigation state. Browser accessibility checks use a 60 second test budget and one deterministic worker while preserving the same WCAG A/AA and keyboard assertions.

This behavior is verified in Chromium through Playwright in addition to source contracts.

## PASSO 45 Responsive Runtime Contract

The existing responsive visual architecture remains valid.

Runtime quality now verifies the three main public journeys at:

- 320 px compact
- 768 px tablet
- 1440 px desktop

For Home, Category and Product:

- `main` must remain visible
- document width must not exceed viewport width
- body width must not exceed viewport width
- the primary content box must remain inside the viewport

Performance policy:

- preserve Server Components at public route entries
- keep Client Component growth explicit and reviewed
- do not introduce image optimization machinery where no image-rendering payload exists
- keep current conceptual SVG assets lightweight
