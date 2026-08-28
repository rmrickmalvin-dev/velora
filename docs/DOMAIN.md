# DOMAIN - VELORA

Last update: 2026-08-27

## BUILD 04 status

CLOSED AND VALIDATED

## Search boundary

PASSO 41 Search Intelligence is Presentation logic over `StorefrontProductCard`.

It does not create Domain Search entities.

Search does not mutate:

- Product
- ProductVariant
- Inventory
- Cart
- Order
- Promotion scenarios

## Search semantics

Searchable fields:

- Product name
- Brand
- localized Category label
- stable Product slug

Multi-term matching uses AND semantics.

Ranking is deterministic.

Empty query preserves Catalog order.

## Browser navigation boundary

URL-backed Search state lives behind:

`browser-discovery-navigation`

State parameters:

- `q`
- `category`

Product Discovery sends both Search input and Category controls through the shared `updateDiscovery` path.

No localStorage persistence is used for Search navigation.

## Design Token contract

`design-token-reference-contract.test.ts` verifies:

- every referenced VELORA variable exists in the primary registry
- primary definitions are unique
- scoped overrides may only redefine registered tokens

## Next milestone

PASSO 45 - Runtime Performance, Responsive and SEO Hardening.

## Product Detail browser synchronization

The Product Detail route keeps its static Application read as the initial SSG shell.

After hydration, `ProductDetail` reads the same browser-persistent Application data used by Storefront Discovery through:

`loadBrowserStorefrontProductDetail`

The browser Feature adapter:

- uses `createBrowserVeloraRuntime`
- reads through `VeloraApplication.listStorefrontProducts`
- rebuilds the existing `StorefrontProductDetailModel`
- subscribes to Catalog and Inventory change events
- does not expose repositories or localStorage to UI components

Local browser overrides do not rewrite server-generated metadata. The visible Product Detail is the browser-synchronized experience; metadata remains the deterministic static baseline.

## BUILD 05 browser quality boundary

Playwright and axe are Quality tooling only.

They do not change Domain, Application, Repository or persistence behavior.

Browser quality tests exercise public Storefront output through the rendered application and complement existing source-level architecture, accessibility, responsive, SEO and Design Token contracts.

## Cart modal runtime accessibility boundary

Cart accessibility remains a UI and Quality concern.

The Cart Drawer:

- keeps data mutations behind Browser Cart Experience
- exposes a stable dialog relationship from trigger to modal
- traps keyboard focus while modal
- restores focus after closure
- preserves Escape close and body scroll lock
- does not change Cart, Inventory or persistence Domain rules

Product Discovery keyboard activation continues to use the existing URL-backed Navigation adapter. The 60 second Playwright test budget and single-worker browser execution are Quality tooling only and do not change application runtime behavior. The accessibility hardening does not add a new state or persistence system.
