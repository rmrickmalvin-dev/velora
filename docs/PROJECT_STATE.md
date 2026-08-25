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
- `0e461a3` - cart domain and cart operations

## Latest validated step

PASSO 17 - Order + OrderItem

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

Order:

- Order
- OrderItem
- Order Service

## OrderItem

OrderItem is a commercial snapshot.

Fields:

- id
- productId
- productVariantId
- productNameSnapshot
- skuSnapshot
- unitPriceSnapshot
- quantity

The snapshot prevents future Catalog changes from rewriting historical order data.

## Order

Fields:

- id
- optional customerId
- status
- items

Rules:

- id required
- guest orders are allowed
- customerId is optional but cannot be blank when provided
- at least one OrderItem required
- OrderItem ids must be unique
- status must be valid
- Order and items collection are immutable

## Order Service

Implemented:

- calculateOrderSubtotal
- transitionOrderStatus

Status graph:

```text
PENDING
|-- CONFIRMED
|   |-- PREPARING
|   |   |-- SHIPPED
|   |   |   `-- DELIVERED
|   |   `-- CANCELLED
|   `-- CANCELLED
`-- CANCELLED
```

DELIVERED and CANCELLED are terminal.

## Cart vs Order

Cart represents current purchase intent.

Order represents transaction history.

CartItem and OrderItem remain distinct.

## Quality Gate

Latest evidence:

- PASSO 17 targeted tests: 32/32
- complete suite: 132/132
- lint passed
- typecheck passed
- production build passed
- `/pt-BR` SSG passed
- `/en` SSG passed
- `/es` SSG passed
- Proxy recognized
- `npm run check` passed

## Decisions

After PASSO 17:

`CODAL-DEC-001 -> CODAL-DEC-065`

Next available decision:

`CODAL-DEC-066`

## Next step

PASSO 18 - Repository Contracts.