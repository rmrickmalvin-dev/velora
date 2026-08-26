# DOMAIN - VELORA

Last update: 2026-08-26

## BUILD 01 status

CLOSED AND VALIDATED

## Dependency direction

```text
UI
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

## Stable Domain foundation

Implemented and validated:

- CurrencyCode
- Money
- SKU
- Slug
- ProductCategory
- Product
- ProductVariant
- ProductMedia
- Inventory
- InventoryMovement
- Cart
- CartItem
- Order
- OrderItem
- Cart Service
- Inventory Service
- Order Service
- Repository Contracts

## Application facade

`createVeloraApplication` binds Repository Contracts once and exposes a UI-ready orchestration surface.

The UI does not need to repeatedly inject repositories into every use-case call.

Available behavior includes:

- Storefront Product listing
- Storefront Product detail
- Add to Cart
- Cart quantity update
- Cart removal
- Cart summary
- Inventory adjustment
- Order status transition
- Customer Order listing

## Composition root

Infrastructure owns concrete provider selection.

`createVeloraRuntime(provider)` composes:

- persistent repositories
- Application facade
- demo reset

`createBrowserVeloraRuntime()` selects IndexedDbProvider for browser usage.

## Persistence model

```text
Catalog / Inventory
=
immutable seed
+
persistent overrides

Cart / Order
=
persistent runtime state

InventoryMovement
=
seed baseline history
+
persistent appended history
```

## Rehydration

Persistent records are recreated through Domain factories before leaving repository adapters.

This restores validation and immutable Domain objects.

## Dependency regression tests

Automated BUILD 01 architecture tests protect:

Domain:

- no Application import
- no Infrastructure import
- no React import
- no Next.js import

Application:

- no Infrastructure import
- no React import
- no Next.js import

## UI rule for BUILD 02

Storefront components should call the Application facade.

They should not:

- access IndexedDB directly
- access localStorage directly
- instantiate repository adapters inside components
- duplicate Domain rules
- bypass Application orchestration

## BUILD 02 readiness

The data and behavior foundation is ready for visual Storefront integration.

Next milestone:

PASSO 24 - BUILD 02 Design System Foundation and Storefront Shell.