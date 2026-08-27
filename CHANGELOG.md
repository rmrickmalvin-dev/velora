# CHANGELOG — VELORA

Última atualização: 2026-08-24

## BUILD 01 — Foundation

### Unidade 01A — Bootstrap + Locale Foundation

Status: CONCLUÍDA, VALIDADA E VERSIONADA

#### Added

- runtime contract;
- Node.js e npm version contracts;
- `.nvmrc`;
- `engines` registrados em `package.json`;
- Next.js App Router foundation;
- TypeScript foundation;
- PT-BR, EN and ES locale contract;
- locale-aware root layout;
- `generateStaticParams`;
- localized metadata;
- localized `html lang`;
- locale switcher;
- pathname-preserving locale navigation;
- default locale redirect `/` → `/pt-BR`;
- Proxy de locale;
- Pearl + Champagne Design Tokens;
- semantic color tokens;
- typography tokens;
- spacing tokens;
- radius tokens;
- shadow tokens;
- motion tokens;
- focus tokens;
- Manrope typography;
- IBM Plex Mono technical typography;
- responsive Foundation Page;
- responsive hero;
- decorative foundation visual;
- foundation status cards;
- global accessibility baseline;
- visible focus baseline;
- reduced-motion baseline;
- screen-reader-only utility;
- responsive locale selector;
- CODAL operational documentation.

#### Internationalization

Validated:

- `/` redirects to `/pt-BR`;
- `/pt-BR` works;
- `/en` works;
- `/es` works;
- locale switcher works;
- locale switcher preserves equivalent pathname;
- `html lang` follows the active locale;
- metadata follows the active locale.

#### Responsive Validation

Validated:

- 375px;
- 768px;
- 1024px;
- 1440px;
- no horizontal overflow.

#### Accessibility Validation

Validated:

- keyboard navigation;
- visible keyboard focus;
- semantic initial structure;
- accessible Locale Switcher naming;
- decorative flags hidden from assistive technologies;
- reduced-motion baseline.

#### Technical Validation

Passed:

- `npm run lint`;
- `npm run typecheck`;
- `npm run build`;
- `npm run check`.

Production build confirmed:

- `/pt-BR` generated via SSG;
- `/en` generated via SSG;
- `/es` generated via SSG;
- `generateStaticParams` recognized;
- Proxy recognized by Next.js.

#### Result

Unidade 01A approved as the first stable technical checkpoint of VELORA.

---

### Unidade 01B — Domain Foundation

Status: EM EXECUÇÃO

#### Architecture

Added:

- Domain boundary;
- Application boundary;
- Infrastructure boundary;
- UI boundary;
- repository abstraction contract;
- provider-independent repository direction;
- Product / ProductVariant separation;
- inventory architecture;
- Inventory / InventoryMovement separation;
- Cart / Order responsibility separation;
- order snapshot rule;
- User / CustomerProfile separation;
- Promotion responsibility boundary;
- Money minor-unit rule;
- SKU / Entity ID separation;
- dependency restrictions;
- `DOMAIN.md`.

Established dependency direction:

UI
→ Application
→ Domain Contracts
← Infrastructure

Established Domain restrictions:

- Domain does not depend on React;
- Domain does not depend on Next.js;
- Domain does not depend on Zustand;
- Domain does not access DOM;
- Domain does not access localStorage;
- Domain does not access IndexedDB;
- Domain does not access Supabase;
- Domain does not use `fetch`;
- Domain does not depend on CSS;
- UI components do not access domain persistence directly.

#### Fundamental Types

Added:

- `UserRole`;
- `ProductStatus`;
- `OrderStatus`;
- `InventoryMovementType`;
- `PromotionStatus`;
- domain entity identifier types.

#### Domain Errors

Added:

- `DomainValidationError`;
- programmatic domain error codes;
- separation between machine-readable error code and human-readable error message.

#### CurrencyCode

Added:

- `CurrencyCode` Value Object;
- three-letter structural validation;
- trimming;
- uppercase normalization;
- `BRL` baseline constant;
- `CURRENCY_CODE_INVALID` validation error.

Established:

- structural support for currency codes does not imply multi-currency storefront support;
- locale and currency remain separate concerns.

#### Money

Added:

- `Money` Value Object;
- `minorUnits`;
- `CurrencyCode`;
- safe-integer validation;
- immutable Money objects;
- zero Money creation;
- currency-safe addition;
- currency-safe subtraction;
- integer multiplication;
- Money comparison;
- Money equality;
- negative-result support;
- negative-value inspection.

Validation rules:

- fractional minor units are rejected;
- incompatible currencies cannot participate in arithmetic;
- fractional multipliers are rejected;
- negative Money values are allowed at the fundamental Value Object level.

Established:

- product prices will apply their own non-negative invariant;
- monetary formatting remains outside Domain;
- percentage calculations require an explicit rounding policy before implementation.

#### SKU

Added:

- `SKU` Value Object;
- whitespace trimming;
- uppercase normalization;
- spaces converted to hyphens;
- underscores converted to hyphens;
- repeated separators collapsed;
- leading and trailing separators removed;
- minimum length validation;
- maximum length validation;
- supported-character validation;
- `SKU_LENGTH_INVALID` validation error;
- `SKU_FORMAT_INVALID` validation error.

Established:

- SKU is an operational/commercial identifier;
- SKU is not the same concept as an internal Entity ID.

#### Testing

Added:

- Vitest 4.1.11;
- `npm run test`;
- `npm run test:watch`;
- unit tests integrated into the aggregated Quality Gate;
- CurrencyCode unit tests;
- Money unit tests;
- SKU unit tests.

Current automated test coverage:

- CurrencyCode normalization;
- BRL baseline;
- invalid currency rejection;
- Money creation using minor units;
- fractional minor-unit rejection;
- same-currency addition;
- cross-currency operation rejection;
- negative Money results;
- integer Money multiplication;
- fractional multiplier rejection;
- zero Money creation;
- Money comparison;
- Money equality;
- SKU normalization;
- valid SKU preservation;
- empty SKU rejection;
- unsupported SKU character rejection;
- repeated separator normalization.

#### Test Evidence

Validated:

- 3 test files passed;
- 18 unit tests passed;
- 0 unit tests failed.

#### Technical Validation

Passed:

- `npm run lint`;
- `npm run typecheck`;
- `npm run test`;
- `npm run build`;
- `npm run check`.

Aggregated Quality Gate:

lint
→ typecheck
→ unit tests
→ production build

Latest validated result:

- ESLint passed;
- TypeScript passed;
- Vitest passed — 18/18;
- production build passed;
- `/pt-BR` SSG passed;
- `/en` SSG passed;
- `/es` SSG passed;
- Proxy recognized by Next.js;
- aggregated Quality Gate passed.

#### Documentation

Updated:

- `docs/PROJECT_STATE.md`;
- `docs/QUALITY_STATE.md`;
- `docs/STACK.md`;
- `docs/DOMAIN.md`;
- `docs/DECISIONS.md`;
- `docs/AI_HANDOFF.md`;
- `CHANGELOG.md`.

#### Current Result

The first executable Domain primitives are implemented and validated.

Completed in Unidade 01B so far:

- architecture boundaries;
- dependency rules;
- fundamental types;
- DomainValidationError;
- CurrencyCode;
- Money;
- SKU;
- Vitest foundation;
- 18/18 unit tests;
- aggregated Quality Gate.

#### Next

Implement Catalog Domain:

- ProductCategory;
- Product;
- ProductVariant;
- ProductMedia.

Required next validations:

- product identity invariants;
- slug invariants;
- ProductVariant → Product relationship;
- SKU ownership by variant;
- non-negative variant price;
- predictable ProductMedia structure;
- ProductCategory identity;
- catalog independence from Inventory;
- catalog independence from Infrastructure;
- catalog unit tests;
- lint;
- typecheck;
- unit tests;
- production build;
- aggregated Quality Gate.
---

### PASSO 14 — Catalog Domain

Status: CONCLUÍDO E TECNICAMENTE VALIDADO

#### Added

- Slug Value Object;
- ProductCategory;
- Product;
- ProductVariant;
- ProductMedia;
- ProductCategoryId;
- ProductMediaId;
- generic immutable Variant attributes;
- Product/Variant media association.

#### Invariants

- slug normalization and validation;
- ProductCategory identity;
- Product identity/category/status;
- ProductVariant belongs to Product;
- SKU belongs to ProductVariant;
- ProductVariant price cannot be negative;
- attributes cannot contain empty keys/values;
- ProductMedia belongs to Product;
- ProductMedia may optionally target ProductVariant;
- ProductMedia position is non-negative safe integer;
- Catalog remains independent from Inventory and Infrastructure.

#### Testing

PASSO 14 isolated:

- 5 test files passed;
- 28 tests passed;
- 0 failed.

Complete suite:

- 8 test files passed;
- 46 tests passed;
- 0 failed.

#### Technical Validation

Passed:

- `npm run typecheck`;
- `npm run lint`;
- `npm run test`;
- `npm run build`;
- `npm run check`.

Production build confirmed PT-BR, EN and ES via SSG and Proxy recognized by Next.js.

#### Decisions

Added CODAL-DEC-034 through CODAL-DEC-041.

Next decision: CODAL-DEC-042.

#### Next

PASSO 15 — Inventory + InventoryMovement.
---

### PASSO 15 - Inventory Domain

Status: COMPLETED AND TECHNICALLY VALIDATED

#### Inventory

Added:

- Inventory
- ProductVariantId relation
- quantityOnHand
- safe-integer validation
- non-negative quantity invariant
- immutable inventory state

#### InventoryMovement

Added:

- InventoryMovement
- InventoryId relation
- explicit movement type
- signed delta
- required reason
- immutable movement record

Validated:

- ENTRY requires positive delta
- EXIT requires negative delta
- ADJUSTMENT accepts positive or negative non-zero delta
- fractional delta rejected
- zero delta rejected
- unsupported movement type rejected

#### Inventory Service

Added:

- applyInventoryMovement

Validated:

- movement must belong to provided Inventory
- ENTRY increases quantity
- EXIT decreases quantity
- ADJUSTMENT applies signed correction
- negative resulting stock is rejected
- unsafe integer result is rejected
- transition returns a new Inventory

#### Architecture

```text
ProductVariant
      |
      v
Inventory
      |
      v
InventoryMovement
```

Catalog remains free of stock fields.

#### Testing

PASSO 15 targeted validation:

- 3 test files passed
- 26 tests passed
- 0 tests failed

Complete suite:

- 11 test files passed
- 72 tests passed
- 0 tests failed

#### Technical Validation

Passed:

- npm run lint
- npm run typecheck
- npm run test
- npm run build
- npm run check

#### Decisions

Added:

- CODAL-DEC-042 through CODAL-DEC-049

Next available decision:

- CODAL-DEC-050

#### Next

PASSO 16 - Cart + CartItem.
---

### PASSO 16 - Cart Domain

Status: COMPLETED AND TECHNICALLY VALIDATED

#### CartItem

Added:

- CartItemId
- CartItem
- ProductVariantId relation
- Money unitPrice
- quantity
- immutable CartItem

Validated:

- required id
- required ProductVariantId
- positive safe-integer quantity
- zero quantity rejection
- negative quantity rejection
- fractional quantity rejection
- negative unit price rejection

#### Cart

Added:

- Cart aggregate
- immutable items collection
- unique CartItem ids
- one CartItem per ProductVariant

Validated:

- empty Cart
- Cart with items
- required Cart id
- duplicate item rejection
- duplicate ProductVariant rejection
- defensive copy of input collection

#### Cart Service

Added:

- addCartItem
- removeCartItem
- updateCartItemQuantity
- calculateCartSubtotal

Validated:

- immutable add
- immutable remove
- immutable quantity update
- unknown item rejection
- subtotal for one item
- subtotal for multiple items
- empty Cart subtotal
- cross-currency rejection

#### Architecture

Cart remains separate from:

- Inventory
- Order
- React
- Next.js
- persistence providers

Cart quantity represents purchase intent.

Inventory quantityOnHand represents stock state.

#### Testing

PASSO 16 targeted validation:

- 3 test files passed
- 28 tests passed
- 0 tests failed

Complete suite:

- 14 test files passed
- 100 tests passed
- 0 tests failed

#### Technical Validation

Passed:

- npm run lint
- npm run typecheck
- npm run test
- npm run build
- npm run check

#### Decisions

Added:

- CODAL-DEC-050 through CODAL-DEC-057

Next available decision:

- CODAL-DEC-058

#### Next

PASSO 17 - Order + OrderItem.
---

### PASSO 17 - Order Domain

Status: COMPLETED AND TECHNICALLY VALIDATED

#### OrderItem

Added:

- OrderItemId
- OrderItem
- ProductId reference
- ProductVariantId reference
- productNameSnapshot
- skuSnapshot
- unitPriceSnapshot
- quantity
- immutable commercial snapshot

Validated:

- required identifiers
- required product name snapshot
- SKU normalization
- positive safe-integer quantity
- non-negative unit price snapshot
- immutable OrderItem

#### Order

Added:

- Order
- optional CustomerId
- guest-order support
- OrderStatus
- immutable items collection

Validated:

- required Order id
- optional but non-blank CustomerId
- at least one OrderItem
- unique OrderItem ids
- runtime OrderStatus validation
- immutable Order

#### Order Service

Added:

- calculateOrderSubtotal
- transitionOrderStatus

Validated:

- single-line subtotal
- multi-line subtotal
- cross-currency rejection
- explicit lifecycle transitions
- terminal DELIVERED
- terminal CANCELLED
- immutable status transition

#### Architecture

Cart and Order remain separate.

OrderItem snapshots remain readable without current Catalog data.

#### Testing

PASSO 17 targeted validation:

- 3 test files passed
- 32 tests passed
- 0 tests failed

Complete suite:

- 17 test files passed
- 132 tests passed
- 0 tests failed

#### Technical Validation

Passed:

- npm run lint
- npm run typecheck
- npm run test
- npm run build
- npm run check

#### Decisions

Added:

- CODAL-DEC-058 through CODAL-DEC-065

Next available decision:

- CODAL-DEC-066

#### Next

PASSO 18 - Repository Contracts.
---

### PASSO 18 - Repository Contracts

Status: COMPLETED AND TECHNICALLY VALIDATED

#### Added

Repository Contracts:

- ProductCategoryRepository
- ProductRepository
- ProductVariantRepository
- ProductMediaRepository
- InventoryRepository
- InventoryMovementRepository
- CartRepository
- OrderRepository

Also added:

- repository barrel export

#### Architecture

Established:

- Repository Contracts live in Domain
- contracts know only Domain concepts
- contracts are Promise-based
- missing single entities return null
- collection queries return readonly arrays
- provider-specific types are forbidden

Provider implementations may later use:

- in-memory data
- seed data
- IndexedDB
- API
- Supabase
- PostgreSQL

without changing the contracts.

#### Semantics

InventoryMovementRepository:

- uses append for historical movement records

CartRepository:

- supports remove for temporary Cart state

OrderRepository:

- intentionally exposes no delete contract

#### Testing Strategy

No new runtime behavior was introduced.

No artificial runtime tests were added for TypeScript interfaces.

Validation used:

- TypeScript typecheck
- ESLint
- existing full regression suite
- production build

#### Test Evidence

Complete suite remains:

- 17 test files passed
- 132 tests passed
- 0 tests failed

#### Technical Validation

Passed:

- npm run typecheck
- npm run lint
- npm run test
- npm run build
- npm run check

#### Decisions

Added:

- CODAL-DEC-066 through CODAL-DEC-073

Next available decision:

- CODAL-DEC-074

#### Next

PASSO 19 - Seed Foundation.
---

### PASSO 19 - Seed Foundation

Status: COMPLETED AND TECHNICALLY VALIDATED

#### Added

Infrastructure seed module:

- createVeloraSeed
- veloraSeed
- VeloraSeed
- seed barrel export

#### Fictional baseline

Added:

- 4 ProductCategory records
- 8 Product records
- 15 ProductVariant records
- 16 ProductMedia records
- 15 Inventory records
- 15 initial InventoryMovement records

Fictional brands:

- Aster
- Nivalis
- Halo
- Flux
- Veil

#### Integrity

Validated:

- deterministic recreation
- frozen seed container
- frozen collections
- frozen Domain entities
- unique category ids and slugs
- unique product ids and slugs
- unique variant ids and SKUs
- valid ProductCategory references
- valid Product references
- coherent ProductMedia references
- one Inventory per ProductVariant
- one initial ENTRY movement per Inventory
- initial movement matches quantityOnHand
- featured products available
- every category represented

#### Architecture

Seed lives in Infrastructure.

Seed records are created through Domain factories.

Cart and Order are intentionally excluded from immutable baseline state.

Media uses logical local paths until final Storefront assets are produced.

#### Testing

PASSO 19 targeted validation:

- 1 test file passed
- 12 tests passed
- 0 tests failed

Complete suite:

- 18 test files passed
- 144 tests passed
- 0 tests failed

#### Technical Validation

Passed:

- npm run lint
- npm run typecheck
- npm run test
- npm run build
- npm run check

#### Decisions

Added:

- CODAL-DEC-074 through CODAL-DEC-081

Next available decision:

- CODAL-DEC-082

#### Next

PASSO 20 - Local Repository Implementations.
---

### PASSO 20 - Local Repository Implementations

Status: COMPLETED AND TECHNICALLY VALIDATED

#### Added

Local Infrastructure adapters:

- LocalProductCategoryRepository
- LocalProductRepository
- LocalProductVariantRepository
- LocalProductMediaRepository
- LocalInventoryRepository
- LocalInventoryMovementRepository
- LocalCartRepository
- LocalOrderRepository
- createLocalRepositories
- local repository barrel export

#### Initialization

Catalog and Inventory initialize from `veloraSeed`.

Cart and Order initialize empty.

Each factory call creates isolated working state.

The immutable seed remains unchanged.

#### Repository behavior

Validated:

- Product id lookup
- Product slug lookup
- Product upsert
- ProductVariant SKU lookup
- ProductVariant Product lookup
- ProductMedia Product lookup
- ProductMedia Variant lookup
- Inventory ProductVariant lookup
- Inventory local update
- seed isolation
- InventoryMovement append order
- Cart save/find/remove
- Order save/find/customer list
- guest Order customer-query exclusion
- frozen list snapshots
- null for missing records
- isolated repository bundles

#### Persistence scope

PASSO 20 repositories are in-memory only.

They intentionally do not survive browser reload.

Persistent local storage remains a later IndexedDB adapter behind the same Domain contracts.

#### Testing

PASSO 20 targeted validation:

- 1 test file passed
- 16 tests passed
- 0 tests failed

Complete suite:

- 19 test files passed
- 160 tests passed
- 0 tests failed

#### Technical Validation

Passed:

- npm run lint
- npm run typecheck
- npm run test
- npm run build
- npm run check

#### Decisions

Added:

- CODAL-DEC-082 through CODAL-DEC-089

Next available decision:

- CODAL-DEC-090

#### Next

PASSO 21 - Application Use Cases.
---

### PASSO 21 - Application Use Cases

Status: COMPLETED AND TECHNICALLY VALIDATED

#### Added

Application layer:

- ApplicationError
- listStorefrontProducts
- getStorefrontProductBySlug
- addProductToCart
- updateCartQuantity
- removeProductFromCart
- getCartSummary
- adjustInventory
- changeOrderStatus
- listCustomerOrders
- Application barrel export

#### Storefront

Validated:

- ACTIVE Product filtering
- ACTIVE ProductVariant filtering
- featured-first ordering
- deterministic name ordering
- ProductMedia aggregation
- Inventory aggregation
- detail lookup by Slug
- missing/inactive detail returns null

#### Cart

Validated:

- ProductVariant lookup
- sale status validation
- Inventory lookup
- stock availability
- new Cart creation
- current ProductVariant price capture
- repeated-add quantity merge
- quantity update
- CartItem removal
- Money subtotal
- no Inventory mutation during Cart operations

#### Inventory

Validated:

- Inventory lookup
- Domain InventoryMovement creation
- Domain stock transition
- Inventory persistence
- movement history append
- missing Inventory error
- negative stock remains rejected by Domain

#### Order

Validated:

- Order lookup
- Domain status transition
- Order persistence
- missing Order error
- invalid transition protection
- Customer Order listing

#### Architecture

Application imports Domain contracts and services.

Application does not import concrete local repository implementations.

Local repositories are composition/test adapters only.

#### Testing

PASSO 21 targeted validation:

- 3 test files passed
- 24 tests passed
- 0 tests failed

Complete suite:

- 22 test files passed
- 184 tests passed
- 0 tests failed

#### Technical Validation

Passed:

- npm run lint
- npm run typecheck
- npm run test
- npm run build
- npm run check

#### Decisions

Added:

- CODAL-DEC-090 through CODAL-DEC-097

Next available decision:

- CODAL-DEC-098

#### Next

PASSO 22 - IndexedDB Provider and Persistent Local Adapters.
---

### PASSO 22 - IndexedDB Provider and Persistent Local Adapters

Status: COMPLETED AND TECHNICALLY VALIDATED

#### Added - Persistence

- PersistenceProvider
- PersistenceError
- MemoryPersistenceProvider
- IndexedDbProvider
- persistence store registry

IndexedDbProvider uses native browser IndexedDB.

No new external persistence dependency was added.

#### Added - Persistent Repositories

- PersistentProductCategoryRepository
- PersistentProductRepository
- PersistentProductVariantRepository
- PersistentProductMediaRepository
- PersistentInventoryRepository
- PersistentInventoryMovementRepository
- PersistentCartRepository
- PersistentOrderRepository
- createPersistentRepositories
- createBrowserRepositories
- resetPersistentOverrides

#### Persistent strategy

Catalog and Inventory:

- immutable seed fallback
- persisted overrides by id

Cart and Order:

- persisted runtime state only

InventoryMovement:

- seed baseline history
- persisted append-only history

#### Rehydration

Persistent reads recreate Domain entities through Domain factories.

This restores validation and immutability after storage round trips.

#### Browser composition

`createBrowserRepositories` selects IndexedDbProvider.

Application Use Cases remain provider-independent.

#### Reset

`resetPersistentOverrides` clears all persistence stores.

Seed-backed repositories return to baseline after reset.

Cart and Order return empty.

#### Quality cleanup

Removed the unused `createInventory` import warning from the PASSO 21 Cart Application test.

#### Testing

PASSO 22 targeted validation:

- 2 test files passed
- 20 tests passed
- 0 tests failed

Complete suite:

- 24 test files passed
- 204 tests passed
- 0 tests failed

#### Technical Validation

Passed:

- npm run lint
- npm run typecheck
- npm run test
- npm run build
- npm run check

#### Decisions

Added:

- CODAL-DEC-098 through CODAL-DEC-107

Next available decision:

- CODAL-DEC-108

#### Next

PASSO 23 - BUILD 01 Final Integration and Closure.
---

### PASSO 23 - BUILD 01 Final Integration and Closure

Status: COMPLETED AND TECHNICALLY VALIDATED

#### Added

Application composition:

- createVeloraApplication
- VeloraApplication
- VeloraApplicationDependencies

Infrastructure composition:

- createVeloraRuntime
- createBrowserVeloraRuntime
- VeloraRuntime
- resetDemo binding

Architecture validation:

- Domain dependency boundary test
- Application dependency boundary test

Closure record:

- docs/BUILD_01_CLOSURE.md

#### Test discovery hardening

Updated project test scripts:

- `vitest run` -> `vitest run src`
- `vitest` -> `vitest src`

This prevents `.codal-backups` and other local artifacts from being discovered as project tests.

#### Clean install proof

Executed:

- npm ci --no-audit --no-fund

Then executed the complete quality gate.

#### Final testing

PASSO 23 targeted:

- 2 test files passed
- 11 tests passed
- 0 tests failed

Complete suite:

- 26 test files passed
- 215 tests passed
- 0 tests failed

#### Technical validation

Passed:

- Node v24.13.0
- npm 11.6.2
- .nvmrc 24.13.0
- npm ci
- npm run lint
- npm run typecheck
- npm run test
- npm run build
- npm run check
- git diff --check

#### Architecture

Validated:

- Domain does not import Application
- Domain does not import Infrastructure
- Domain does not import React
- Domain does not import Next.js
- Application does not import Infrastructure
- Application does not import React
- Application does not import Next.js

#### Decisions

Added:

- CODAL-DEC-108 through CODAL-DEC-115

Next available decision:

- CODAL-DEC-116

#### BUILD 01

CLOSED AND VALIDATED

#### Next

BUILD 02 - Storefront and Design System

PASSO 24 - Design System Foundation and Storefront Shell.
---

### PASSO 24 - BUILD 02 Design System Foundation and Storefront Shell

Status: COMPLETED AND TECHNICALLY VALIDATED

#### BUILD transition

BUILD 01 remains CLOSED AND VALIDATED.

BUILD 02 is now IN PROGRESS.

#### Added - Pearl Technology

Design Tokens:

- pearl palette
- ink hierarchy
- champagne/gold accents
- semantic colors
- typography stacks
- spacing
- radius
- shadows
- borders
- transitions
- responsive content width

#### Added - Storefront presentation

- Storefront localized copy
- StaticVeloraRuntime
- StorefrontHomeModel
- locale-aware Money formatting
- localized category labels
- stock presentation label
- StorefrontShell
- responsive CSS Module
- localized metadata

#### Visible Storefront

Implemented:

- sticky premium header
- VELORA brand
- PT-BR / EN / ES switch
- hero
- category grid
- featured Product grid
- Pearl Technology experience section
- footer

#### Architecture integration

Visible Product cards use data from:

- VeloraApplication
- Storefront Use Case
- Domain Repository Contracts
- VELORA Seed

No Product commercial records are hardcoded in the UI.

SSG uses StaticVeloraRuntime and does not call IndexedDB.

#### Visual assets

PASSO 24 uses CSS-generated conceptual Product art.

Final Product media remains a later Storefront step.

#### Accessibility

Implemented:

- semantic landmarks
- heading hierarchy
- language labels
- decorative aria-hidden visuals
- reduced-motion support
- responsive layouts

#### Testing

PASSO 24 targeted validation:

- 3 test files passed
- 16 tests passed
- 0 tests failed

Complete suite:

- 29 test files passed
- 231 tests passed
- 0 tests failed

#### Technical Validation

Passed:

- npm run lint
- npm run typecheck
- npm run test
- npm run build
- npm run check

#### Decisions

Added:

- CODAL-DEC-116 through CODAL-DEC-123

Next available decision:

- CODAL-DEC-124

#### Next

PASSO 25 - Storefront Product Discovery and Product Card Interaction.
---

### PASSO 24 CSS Warning Cleanup

Status: COMPLETED AND VALIDATED

The PASSO 24 Storefront build was functionally successful, but Turbopack reported CSS parser warnings for `:global(...)` selectors inside the normal global stylesheet.

Fixed:

- global selector syntax in `src/styles/design-tokens.css`
- preserved all Pearl Technology tokens
- preserved reduced-motion behavior

Post-fix evidence:

- lint passed
- typecheck passed
- 231 tests passed
- production build passed
- CSS parser warning audit passed

No new CODAL decision was required.

Next decision remains:

- CODAL-DEC-124
---

### PASSO 25 - Storefront Product Discovery and Product Card Interaction

Status: COMPLETED AND TECHNICALLY VALIDATED

#### Added - Discovery

- ProductDiscovery client component
- Product name search
- brand search
- category filter
- result count
- empty state
- normalized Presentation search model

#### Added - Product card interaction

- locale-safe Product detail links
- card visual interaction
- details CTA
- full active catalog discovery

#### Added - Product detail

Route:

- `/{locale}/products/{slug}`

Presentation:

- Product identity
- localized category
- active variants
- SKU
- variant attributes
- locale-aware price
- Inventory quantity
- availability
- locale-preserving language switch

#### Architecture

Product detail resolves data through VeloraApplication.

Client discovery does not access repositories.

Search remains Presentation-only.

#### Commerce boundary

Product detail is read-only in BUILD 02.

Add-to-cart UI remains scheduled for BUILD 03.

#### Testing

PASSO 25 targeted:

- 2 test files passed
- 16 tests passed
- 0 failed

Complete suite:

- 31 test files passed
- 247 tests passed
- 0 failed

#### Technical Validation

Passed:

- npm run lint
- npm run typecheck
- npm run test
- npm run build
- npm run check

#### Decisions

Added:

- CODAL-DEC-124 through CODAL-DEC-131

Next available decision:

- CODAL-DEC-132

#### Next

PASSO 26 - Storefront Navigation, Category Journeys and Visual Product Media Foundation.
---

### PASSO 26 - Storefront Navigation, Category Journeys and Visual Product Media Foundation

Status: COMPLETED AND TECHNICALLY VALIDATED

#### Added - Category journeys

Canonical route:

- `/{locale}/categories/{category}`

Categories:

- smartphone
- audio
- power
- protection

Category cards now navigate.

Category pages are SSG and preserve locale/category context.

#### Added - Product media foundation

- StorefrontProductVisual
- canonical ProductMedia reference
- canonical media alt metadata
- category-specific local fallback asset
- ProductVisual shared component

#### Added - Local visual assets

- smartphone.svg
- audio.svg
- power.svg
- protection.svg

All assets are local and versioned.

#### Architecture

Seeded ProductMedia paths remain unchanged.

The fallback rendering strategy is Presentation-only.

No Repository Contract changed.

#### Testing

PASSO 26 targeted:

- 2 test files passed
- 14 tests passed
- 0 failed

Complete suite:

- 33 test files passed
- 261 tests passed
- 0 failed

#### Technical Validation

Passed:

- npm run lint
- npm run typecheck
- npm run test
- npm run build
- npm run check

#### Decisions

Added:

- CODAL-DEC-132 through CODAL-DEC-139

Next available decision:

- CODAL-DEC-140

#### Next

PASSO 27 - Storefront Accessibility, SEO and BUILD 02 Visual Quality Expansion.
---

### PASSO 27 - Storefront Accessibility, SEO and BUILD 02 Visual Quality Expansion

Status: COMPLETED AND TECHNICALLY VALIDATED

#### Accessibility

Added:

- localized accessibility copy
- home skip link
- category skip link
- Product skip link
- global focus-visible treatment
- increased-contrast token support

Preserved:

- reduced motion
- polite discovery announcements
- pressed-state category filters

#### SEO

Added:

- StorefrontSeoModel
- canonical locale paths
- PT-BR alternate
- EN alternate
- ES alternate
- x-default
- explicit index/follow metadata

Integrated into:

- Storefront home
- category routes
- Product routes

#### Structured data

Product Offer structured data remains intentionally absent because VELORA is a fictional portfolio store without real payment.

#### Testing

PASSO 27 targeted:

- 3 test files passed
- 22 tests passed
- 0 failed

Complete suite:

- 36 test files passed
- 283 tests passed
- 0 failed

#### Technical Validation

Passed:

- npm run lint
- npm run typecheck
- npm run test
- npm run build
- npm run check

#### Decisions

Added:

- CODAL-DEC-140 through CODAL-DEC-146

Next available decision:

- CODAL-DEC-147

#### Next

PASSO 28 - BUILD 02 Final Visual Review, Responsive Hardening and Closure.
---

### PASSO 28 - BUILD 02 Final Visual Review, Responsive Hardening and Closure

Status: COMPLETED AND TECHNICALLY VALIDATED

#### Navigation correction

The final visual review identified that the approved VELORA desktop navigation requirement was vertical.

BUILD 02 now closes with:

- fixed desktop vertical rail
- tablet/mobile sticky top header
- matching layout on Storefront, category and Product pages

#### Responsive hardening

Added:

- page-level overflow protection
- overflow clip fallback
- local-only mobile filter scrolling
- minimum-width protection
- long-content wrapping
- compact locale touch-target increase

#### Testing

PASSO 28 targeted:

- 2 test files passed
- 14 tests passed
- 0 failed

Complete suite:

- 38 test files passed
- 297 tests passed
- 0 failed

#### Technical Validation

Passed:

- npm run lint
- npm run typecheck
- npm run test
- npm run build
- npm run check

#### BUILD 02

CLOSED AND VALIDATED

Closure record:

- docs/BUILD_02_CLOSURE.md

#### Decisions

Added:

- CODAL-DEC-147 through CODAL-DEC-154

Next available decision:

- CODAL-DEC-155

#### Next

BUILD 03 - Commerce Interaction

PASSO 29 - Browser Runtime, Cart Experience State and Add-to-Cart Integration.
---

### PASSO 29 - Browser Runtime, Cart Experience State and Add-to-Cart Integration

Status: COMPLETED AND TECHNICALLY VALIDATED

#### BUILD transition

BUILD 02 remains CLOSED AND VALIDATED.

BUILD 03 - Commerce Interaction is now IN PROGRESS.

#### Added - Cart Feature

- CartExperience
- stable demo Cart id
- Cart experience snapshot
- lazy browser Cart runtime
- same-document Cart change event

#### Added - Cart UI

- localized Cart copy
- CartIndicator
- AddToCartControl
- Product Variant add action
- loading state
- success state
- error state
- unavailable state

#### Architecture

Browser persistence is selected only through createBrowserVeloraRuntime.

React components do not import IndexedDB.

Cart persistence remains in existing persistent repositories.

#### Inventory

Add-to-cart validates but does not mutate Inventory.

#### Testing

PASSO 29 targeted:

- 3 test files passed
- 22 tests passed
- 0 failed

Complete suite:

- 41 test files passed
- 319 tests passed
- 0 failed

#### Technical Validation

Passed:

- npm run lint
- npm run typecheck
- npm run test
- npm run build
- npm run check

#### Decisions

Added:

- CODAL-DEC-155 through CODAL-DEC-162

Next available decision:

- CODAL-DEC-163

#### Next

PASSO 30 - Cart Drawer, Quantity Controls and Persistent Cart Review.
---

### PASSO 30 - Cart Drawer, Quantity Controls and Persistent Cart Review

Status: COMPLETED AND TECHNICALLY VALIDATED

#### Added - Cart review

- CartDrawer
- persistent Cart line review
- Product name
- SKU
- line quantity
- line total
- subtotal
- empty state
- loading state

#### Added - Cart mutation

- increase quantity
- decrease quantity
- remove line

All mutations flow through CartExperience and VeloraApplication.

#### Accessibility

- modal dialog semantics
- Escape close
- backdrop close
- focus entry
- body scroll lock
- reduced-motion support

#### Persistence

Updated quantities survive runtime recreation with the same persistence provider.

#### Inventory

Cart quantity operations do not mutate Inventory.

#### Testing

PASSO 30 targeted:

- 3 test files passed
- 30 tests passed
- 0 failed

Complete suite:

- 42 test files passed
- 335 tests passed
- 0 failed

#### Technical Validation

Passed:

- npm run lint
- npm run typecheck
- npm run test
- npm run build
- npm run check

#### Decisions

Added:

- CODAL-DEC-163 through CODAL-DEC-170

Next available decision:

- CODAL-DEC-171

#### Next

PASSO 31 - Demo Checkout Foundation, Cart Validation and Conversion Journey.
---

### PASSO 31 - Demo Checkout Foundation, Cart Validation and Conversion Journey

Status: COMPLETED AND TECHNICALLY VALIDATED

#### Added - Checkout journey

- locale-safe `/checkout`
- Cart Drawer checkout CTA
- persistent Cart summary
- contact form
- delivery form
- local-only completion feedback

#### Validation

Added:

- Checkout Cart validator
- Checkout form validator
- normalized form values
- localized validation errors

#### Privacy

Checkout personal fields are not:

- persisted
- placed in localStorage
- placed in sessionStorage
- transmitted by network request

#### Commerce transparency

PASSO 31 explicitly does not:

- create Order
- charge payment
- clear Cart
- mutate Inventory

#### Testing

PASSO 31 targeted:

- 4 test files passed
- 33 tests passed
- 0 failed

Complete suite:

- 46 test files passed
- 368 tests passed
- 0 failed

#### Technical Validation

Passed:

- npm run lint
- npm run typecheck
- npm run test
- npm run build
- npm run check

#### Decisions

Added:

- CODAL-DEC-171 through CODAL-DEC-179

Next available decision:

- CODAL-DEC-180

#### Next

PASSO 32 - Demo Order Creation, Confirmation and Cart Completion.
---

### PASSO 32 - Demo Order Creation, Confirmation and Cart Completion

Status: COMPLETED AND TECHNICALLY VALIDATED

#### Added - Application Order creation

- createDemoOrderFromCart
- guest PENDING Order
- Product snapshot
- SKU snapshot
- unit price snapshot
- quantity snapshot
- duplicate Order id protection

#### Added - Browser completion

- completeBrowserDemoOrder
- local demo Order reference
- persistent Order confirmation
- Cart refresh event after success

#### Cart completion

Cart is removed only after Order save succeeds.

#### Privacy

Checkout contact/delivery values remain ephemeral and are not copied into Order.

#### Inventory

Demo Order creation does not mutate Inventory.

#### Testing

PASSO 32 targeted:

- 4 test files passed
- 34 tests passed
- 0 failed

Complete suite:

- 48 test files passed
- 386 tests passed
- 0 failed

#### Technical Validation

Passed:

- npm run lint
- npm run typecheck
- npm run test
- npm run build
- npm run check

#### Decisions

Added:

- CODAL-DEC-180 through CODAL-DEC-188

Next available decision:

- CODAL-DEC-189

#### Next

PASSO 33 - Demo Order History, Reset Flow and BUILD 03 Closure.
---

### PASSO 33 - Demo Order History, Reset Flow and BUILD 03 Closure

Status: COMPLETED AND TECHNICALLY VALIDATED

#### Added - Guest demo Order history

- OrderRepository list
- Application listDemoOrders
- persistent guest history
- Order snapshot subtotal
- localized `/orders` route
- Cart Drawer history entry
- Checkout confirmation history entry

#### Added - Demo reset

- explicit two-step reset
- existing Runtime resetDemo integration
- Cart indicator refresh
- deterministic baseline restoration

#### SEO

Checkout and Orders browser-state routes are noindex.

#### Commerce boundaries

Preserved:

- no payment provider
- no fake transaction id
- no persistent Checkout personal data
- no direct IndexedDB UI access
- no Inventory mutation

#### Testing

PASSO 33 targeted:

- 5 test files passed
- 36 tests passed
- 0 failed

Complete suite:

- 53 test files passed
- 422 tests passed
- 0 failed

#### Technical Validation

Passed:

- npm run lint
- npm run typecheck
- npm run test
- npm run build
- npm run check

#### Registry repair

A historical CODAL decision-code discontinuity was detected by the PASSO 33 closure audit.

The repair preserved every official decision row text and chronological row order while normalizing official numeric prefixes to:

- CODAL-DEC-001 through CODAL-DEC-198

Next available decision:

- CODAL-DEC-199

#### BUILD 03

CLOSED AND VALIDATED

Closure record:

- docs/BUILD_03_CLOSURE.md

#### Next

BUILD 04 - Application and Data Experience

PASSO 34 - Demo Authentication Roles, Session Experience and Customer/Admin Entry.
---

### PASSO 34 - Demo Authentication Roles, Session Experience and Customer/Admin Entry

Status: COMPLETED AND TECHNICALLY VALIDATED

#### BUILD transition

BUILD 03 remains CLOSED AND VALIDATED.

BUILD 04 - Application and Data Experience is now IN PROGRESS.

#### Added - Demo roles

- GUEST
- CUSTOMER
- ADMIN
- GUEST default
- pure role model
- role area access model

#### Added - Browser session

- dedicated localStorage adapter
- `velora.demo.session.v1`
- same-document session event
- cross-tab storage synchronization
- useSyncExternalStore integration

#### Added - Role routes

- `/{locale}/login`
- `/{locale}/account`
- `/{locale}/admin`

All role routes are noindex.

#### Added - Quick exploration

- Explore as Customer
- Explore Admin dashboard
- Continue as Guest

No credentials or security claims are introduced.

#### Global experience

SessionIndicator is composed into the existing Cart cluster.

#### Testing

PASSO 34 targeted:

- 5 test files passed
- 44 tests passed
- 0 failed

Complete suite:

- 58 test files passed
- 462 tests passed
- 0 failed

#### Technical Validation

Passed:

- npm run lint
- npm run typecheck
- npm run test
- npm run build
- npm run check

#### Decisions

Added:

- CODAL-DEC-199 through CODAL-DEC-208

Next available decision:

- CODAL-DEC-209

#### Next

PASSO 35 - Admin Storefront Context, Catalog Controls and Inventory Visibility.
---

### PASSO 35 - Admin Storefront Context, Catalog Controls and Inventory Visibility

Status: COMPLETED AND TECHNICALLY VALIDATED

#### Added - Admin Storefront context

- ADMIN-only Product controls
- Product card controls
- Product detail controls
- numeric stock visibility
- localized Admin copy

#### Added - Admin Catalog visibility

- Admin Catalog read model
- active Product count
- active Variant count
- total Inventory units
- low-stock Variant count
- SKU
- price
- quantityOnHand

#### Architecture

Admin React components read through:

- browser-admin-catalog
- createBrowserVeloraRuntime
- VeloraApplication

No direct repositories or IndexedDB imports are used by Admin React components.

#### Mutation boundary

PASSO 35 is read-only.

Product, price and Inventory mutation remain deferred.

#### Testing

PASSO 35 targeted:

- 5 test files passed
- 44 tests passed
- 0 failed

Complete suite:

- 62 test files passed
- 494 tests passed
- 0 failed

#### Technical Validation

Passed:

- npm run lint
- npm run typecheck
- npm run test
- npm run build
- npm run check

#### Decisions

Added:

- CODAL-DEC-209 through CODAL-DEC-218

Next available decision:

- CODAL-DEC-219

#### Next

PASSO 36 - Admin Product Editing, Price Controls and Persistent Catalog Overrides.
---

### PASSO 36 - Admin Product Editing, Price Controls and Persistent Catalog Overrides

Status: COMPLETED AND TECHNICALLY VALIDATED

#### Added - Application mutations

- updateAdminProduct
- updateAdminVariantPrice
- Product identity preservation
- Variant currency/SKU preservation
- persistent repository writes

#### Added - Admin Product Editor

- Product name
- Brand
- Model
- Featured toggle
- Variant decimal price input
- Product confirmation
- price confirmation
- localized validation

#### Added - Browser Catalog synchronization

- `velora:catalog-changed`
- browser Storefront Catalog loader
- Product Discovery persistent override hydration
- same-document Catalog refresh

#### Reset

Existing resetDemo restores seed Product and price state.

#### Inventory boundary

Product and price writes do not mutate Inventory.

#### Testing

PASSO 36 targeted:

- 6 test files passed
- 48 tests passed
- 0 failed

Complete suite:

- 68 test files passed
- 542 tests passed
- 0 failed

#### Technical Validation

Passed:

- npm run lint
- npm run typecheck
- npm run test
- npm run build
- npm run check

#### Decisions

Added:

- CODAL-DEC-219 through CODAL-DEC-228

Next available decision:

- CODAL-DEC-229

#### Next

PASSO 37 - Inventory Adjustment Controls, Movement History and Admin Stock Operations.
---

### PASSO 37 - Inventory Adjustment Controls, Movement History and Admin Stock Operations

Status: COMPLETED AND TECHNICALLY VALIDATED

#### Added - Inventory operations

- ENTRY
- EXIT
- ADJUSTMENT
- quantity validation
- reason validation
- explicit review/confirmation
- persistent stock mutation

#### Added - Movement history

- Application listInventoryMovements
- browser history adapter
- movement type
- signed delta
- reason
- newest-first append presentation

No timestamps are invented because InventoryMovement currently has no timestamp field.

#### Added - Storefront Inventory refresh

- `velora:inventory-changed`
- combined Storefront data subscription
- Product Discovery refresh after stock mutation

#### Side-effect boundary

Inventory operations do not mutate:

- Cart
- Orders
- Product identity
- Variant price

#### Testing

PASSO 37 targeted:

- 7 test files passed
- 52 tests passed
- 0 failed

Complete suite:

- 75 test files passed
- 594 tests passed
- 0 failed

#### Technical Validation

Passed:

- npm run lint
- npm run typecheck
- npm run test
- npm run build
- npm run check

#### Decisions

Added:

- CODAL-DEC-229 through CODAL-DEC-238

Next available decision:

- CODAL-DEC-239

#### Next

PASSO 38 - Customer Account Data, Saved Profile and Customer Order Experience.
---

### PASSO 37 Quality Cleanup

Status: COMPLETED

Removed the remaining React Hook `exhaustive-deps` warning from `AdminInventoryOperations`.

Technical validation:

- ESLint with `--max-warnings=0`
- TypeScript
- Inventory UI targeted regression
- complete 594-test suite
- production build

No architectural decision changed.

Next decision remains:

- CODAL-DEC-239
---

### PASSO 38 - Customer Account Data, Saved Profile and Customer Order Experience

Status: COMPLETED AND TECHNICALLY VALIDATED

#### Added - Customer Account

- CUSTOMER role Account surface
- fictional default Profile
- Name
- Email
- Phone
- City
- validation
- local save
- fictional Profile restore

#### Added - Profile persistence boundary

- versioned local key
- Feature adapter
- same-document update event
- cross-tab storage update
- no React localStorage access

#### Added - Customer Order experience

- existing browser-local demo Order history
- reference
- status
- item count
- localized subtotal
- empty state
- explicit non-verified identity disclosure

#### Reset

Global browser demo reset now also clears the Demo Customer Profile.

#### Identity boundary

PASSO 38 does not:

- create real authentication
- create a remote Customer account
- bind Profile to checkout identity
- assign Order customerId

#### Testing

PASSO 38 targeted:

- 6 test files passed
- 44 tests passed
- 0 failed

Complete suite:

- 81 test files passed
- 638 tests passed
- 0 failed

#### Technical Validation

Passed:

- ESLint `--max-warnings=0`
- npm run lint
- npm run typecheck
- npm run test
- npm run build
- npm run check

#### Decisions

Added:

- CODAL-DEC-239 through CODAL-DEC-248

Next available decision:

- CODAL-DEC-249

#### Next

PASSO 39 - Admin Orders, Status Workflow and Operational Order Management.
---

### PASSO 39 - Admin Orders, Status Workflow and Operational Order Management

Status: COMPLETED AND TECHNICALLY VALIDATED

#### Added - Admin Order operations

- all persisted Order listing
- status filter
- guest/Customer context
- item quantity
- line count
- commercial snapshot subtotal
- Domain-driven next status
- explicit review
- explicit confirmation

#### Added - Application and Domain reads

- listAdminOrders
- getAllowedOrderStatusTransitions

Existing changeOrderStatus remains the status mutation path.

#### Lifecycle

Supported:

- PENDING -> CONFIRMED / CANCELLED
- CONFIRMED -> PREPARING / CANCELLED
- PREPARING -> SHIPPED / CANCELLED
- SHIPPED -> DELIVERED
- DELIVERED terminal
- CANCELLED terminal

#### Side-effect boundary

Status mutation does not change:

- Inventory
- Cart
- Product pricing
- Order item commercial snapshots
- payment state

#### Testing

PASSO 39 targeted:

- 6 test files passed
- 52 tests passed
- 0 failed

Complete suite:

- 87 test files passed
- 690 tests passed
- 0 failed

#### Technical Validation

Passed:

- ESLint `--max-warnings=0`
- npm run lint
- npm run typecheck
- npm run test
- npm run build
- npm run check

#### Decisions

Added:

- CODAL-DEC-249 through CODAL-DEC-258

Next available decision:

- CODAL-DEC-259

#### Next

PASSO 40 - Promotions, Pricing Simulator and Commercial Controls.
---

### PASSO 40 - Promotions, Pricing Simulator and Commercial Controls

Status: COMPLETED AND TECHNICALLY VALIDATED

#### Added - Commercial simulator

- current Variant base price
- estimated cost input
- discount input
- promotional price simulation
- gross profit simulation
- gross margin simulation

#### Added - Promotion scenarios

- scenario label
- normalized Promotion code
- local save
- local list
- local delete
- global reset integration

#### Commercial boundary

Promotion scenarios do not mutate:

- ProductVariant price
- Storefront price
- Cart
- checkout
- Order
- Inventory

The simulator does not invent:

- tax
- shipping
- payment fees
- accounting truth

#### Testing

PASSO 40 targeted:

- 6 test files passed
- 47 tests passed
- 0 failed

Complete suite:

- 93 test files passed
- 737 tests passed
- 0 failed

#### Technical Validation

Passed:

- ESLint `--max-warnings=0`
- npm run lint
- npm run typecheck
- npm run test
- npm run build
- npm run check

#### Decisions

Added:

- CODAL-DEC-259 through CODAL-DEC-268

Next available decision:

- CODAL-DEC-269

#### Next

PASSO 41 - Search, Discovery Intelligence and Catalog Navigation Refinement.