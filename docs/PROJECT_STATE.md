# PROJECT STATE - VELORA

Last update: 2026-08-25

## Project

VELORA - professional conceptual e-commerce for smartphones, accessories and mobile technology.

Locales:

- PT-BR
- EN
- ES

## Phase

BUILD 01 - Foundation

## Current unit

01B - Domain Foundation

## State

IN PROGRESS

## Git checkpoints

- `90f2d42` - domain primitives
- `d682c43` - catalog domain
- `c06a5d3` - inventory domain and movements

## Latest validated step

PASSO 16 - Cart + CartItem

## Current Domain

Value Objects:

- CurrencyCode
- Money
- SKU
- Slug

Catalog:

- ProductCategory
- Product
- ProductVariant
- ProductMedia

Inventory:

- Inventory
- InventoryMovement
- Inventory Service

Cart:

- Cart
- CartItem
- Cart Service

## Cart

Cart is the aggregate for current purchase intent.

Fields:

- id
- items

Rules:

- id is required
- items collection is immutable
- CartItem ids are unique
- a ProductVariant appears at most once in a Cart

## CartItem

Fields:

- id
- productVariantId
- unitPrice
- quantity

Rules:

- id required
- productVariantId required
- quantity is a positive safe integer
- unitPrice cannot be negative
- SKU and Inventory are not duplicated into CartItem

## Cart Service

Implemented:

- addCartItem
- removeCartItem
- updateCartItemQuantity
- calculateCartSubtotal

All transitions are immutable.

Subtotal:

- uses Money
- uses integer multiplication
- rejects currency mismatch through Money rules
- returns null for empty cart

## Cart vs Order

Cart represents current purchase intent.

Order remains a separate future transaction snapshot.

Cart is not an Order draft.

## Quality Gate

Latest evidence:

- PASSO 16 targeted tests: 28/28
- complete suite: 100/100
- lint passed
- typecheck passed
- production build passed
- `/pt-BR` SSG passed
- `/en` SSG passed
- `/es` SSG passed
- Proxy recognized
- `npm run check` passed

## Decisions

After PASSO 16:

`CODAL-DEC-001 -> CODAL-DEC-057`

Next available decision:

`CODAL-DEC-058`

## Next step

PASSO 17 - Order + OrderItem.