# AI HANDOFF - VELORA

Last update: 2026-08-25

CODAL OS - Complete Edition active.

## State

BUILD 01 - Foundation

Unit 01B - Domain Foundation

Latest validated step:

PASSO 17 - Order + OrderItem

## Checkpoints

- `90f2d42` - domain primitives
- `d682c43` - catalog domain
- `c06a5d3` - inventory domain
- `0e461a3` - cart domain

## Current Domain

Catalog:

- ProductCategory
- Product
- ProductVariant
- ProductMedia

Inventory:

- Inventory
- InventoryMovement
- applyInventoryMovement

Cart:

- CartItem
- Cart
- addCartItem
- removeCartItem
- updateCartItemQuantity
- calculateCartSubtotal

Order:

- OrderItem
- Order
- calculateOrderSubtotal
- transitionOrderStatus

## Order snapshot rule

OrderItem preserves:

- productId
- productVariantId
- productNameSnapshot
- skuSnapshot
- unitPriceSnapshot
- quantity

Historical order rendering must not require current Catalog values.

## Order status rule

Allowed transitions:

- PENDING -> CONFIRMED
- PENDING -> CANCELLED
- CONFIRMED -> PREPARING
- CONFIRMED -> CANCELLED
- PREPARING -> SHIPPED
- PREPARING -> CANCELLED
- SHIPPED -> DELIVERED

Terminal:

- DELIVERED
- CANCELLED

## Critical architecture rules

Do not merge Cart with Order.

Do not replace OrderItem snapshots with current Product data.

Do not put persistence inside Domain entities.

Do not bypass Money for order totals.

## Quality Gate

Latest evidence:

```text
PASSO 17 targeted: 32/32
Full suite:         132/132
lint:               passed
typecheck:          passed
build:              passed
check:              passed
```

## Decisions

After PASSO 17:

`CODAL-DEC-001 -> CODAL-DEC-065`

Next:

`CODAL-DEC-066`

## Next action

PASSO 18 - Repository Contracts.

Repository Contracts must not know IndexedDB, Supabase, PostgreSQL or API clients.

## Reading order

1. docs/PROJECT_STATE.md
2. docs/DECISIONS.md
3. docs/DOMAIN.md
4. docs/QUALITY_STATE.md
5. docs/STACK.md
6. CHANGELOG.md