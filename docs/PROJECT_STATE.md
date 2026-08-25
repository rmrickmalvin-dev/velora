# PROJECT STATE - VELORA

Last update: 2026-08-25

## Project

VELORA - professional conceptual e-commerce for smartphones, accessories and mobile technology.

## Phase

BUILD 01 - Foundation

## Current unit

01C - Application Foundation

## State

IN PROGRESS

## Git checkpoints

- `90f2d42` - domain primitives
- `d682c43` - catalog domain
- `c06a5d3` - inventory domain
- `0e461a3` - cart domain
- `bffa30d` - order domain
- `9ee0376` - repository contracts
- `f633f35` - deterministic seed
- `1706833` - local repository implementations

## Latest validated step

PASSO 21 - Application Use Cases

## Application Layer

Implemented:

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

## Storefront orchestration

Storefront queries now combine:

- Product
- active ProductVariant records
- ProductMedia
- Inventory

Only ACTIVE Products are exposed.

Featured Products sort before non-featured Products.

Within the same featured group, Product name defines deterministic order.

## Cart orchestration

Application now coordinates:

- ProductVariant lookup
- sale availability
- Inventory availability
- Cart creation
- repeated-add quantity merge
- Cart quantity update
- CartItem removal
- Money subtotal

Adding to Cart does not mutate Inventory.

Inventory remains stock state.

Cart remains purchase intent.

## Inventory orchestration

`adjustInventory` coordinates:

- Inventory lookup
- InventoryMovement creation
- Domain stock transition
- Inventory save
- InventoryMovement append

Domain rules still prevent negative stock.

## Order orchestration

Application now coordinates:

- Order lookup
- Domain status transition
- Order persistence
- Customer Order listing

Application does not bypass the Domain lifecycle graph.

## Infrastructure independence

Application imports Domain contracts and Domain services.

Application does not import local repository implementations.

The local repositories are used only by tests/composition.

This preserves future IndexedDB/API adapter compatibility.

## Quality Gate

Latest evidence:

- PASSO 21 targeted tests: 24/24
- complete suite: 184/184
- 22 test files passed
- lint passed
- typecheck passed
- production build passed
- `/pt-BR` SSG passed
- `/en` SSG passed
- `/es` SSG passed
- Proxy recognized
- `npm run check` passed

## Decisions

After PASSO 21:

`CODAL-DEC-001 -> CODAL-DEC-097`

Next available decision:

`CODAL-DEC-098`

## Next step

PASSO 22 - IndexedDB Provider and Persistent Local Adapters.