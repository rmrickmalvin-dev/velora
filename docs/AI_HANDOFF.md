# AI HANDOFF - VELORA

Last update: 2026-08-25

CODAL OS - Complete Edition active.

## State

BUILD 01 - Foundation

Unit 01B - Domain Foundation

Latest validated step:

PASSO 16 - Cart + CartItem

## Checkpoints

- `90f2d42` - domain primitives
- `d682c43` - catalog domain
- `c06a5d3` - inventory domain

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
- applyInventoryMovement

Cart:

- CartItem
- Cart
- addCartItem
- removeCartItem
- updateCartItemQuantity
- calculateCartSubtotal

## Cart Rules

CartItem:

```text
id
productVariantId
unitPrice
quantity
```

- quantity > 0
- quantity is safe integer
- unitPrice >= 0
- immutable

Cart:

- immutable
- unique item ids
- one CartItem per ProductVariant
- immutable items collection

Subtotal:

- Money-based
- integer multiplication
- cross-currency rejected
- empty cart => null

## Critical architecture rules

Do not merge Cart with Order.

Do not put Inventory inside Cart.

Do not mutate ProductVariant when Cart quantity changes.

Cart quantity is purchase intent, not stock quantity.

## Quality Gate

Latest evidence:

```text
PASSO 16 targeted: 28/28
Full suite:         100/100
lint:               passed
typecheck:          passed
build:              passed
check:              passed
```

## Decisions

After PASSO 16:

`CODAL-DEC-001 -> CODAL-DEC-057`

Next:

`CODAL-DEC-058`

## Next action

PASSO 17 - Order + OrderItem.

OrderItem must preserve commercial snapshot data and must not depend on the current Catalog state.

## Reading order

1. docs/PROJECT_STATE.md
2. docs/DECISIONS.md
3. docs/DOMAIN.md
4. docs/QUALITY_STATE.md
5. docs/STACK.md
6. CHANGELOG.md