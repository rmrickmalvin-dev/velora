# AI HANDOFF - VELORA

Last update: 2026-08-25

CODAL OS - Complete Edition active.

## State

BUILD 01 - Foundation

Latest validated step:

PASSO 21 - Application Use Cases

## Checkpoints

- `90f2d42` - domain primitives
- `d682c43` - catalog domain
- `c06a5d3` - inventory domain
- `0e461a3` - cart domain
- `bffa30d` - order domain
- `9ee0376` - repository contracts
- `f633f35` - seed foundation
- `1706833` - local repositories

## Application API

Available:

- listStorefrontProducts
- getStorefrontProductBySlug
- addProductToCart
- updateCartQuantity
- removeProductFromCart
- getCartSummary
- adjustInventory
- changeOrderStatus
- listCustomerOrders

## Storefront rules

- expose only ACTIVE Products
- expose only ACTIVE ProductVariants
- aggregate ProductMedia and Inventory
- featured Products sort first
- missing/inactive detail returns null

## Cart rules

- ProductVariant must exist
- ProductVariant must be ACTIVE
- Inventory must exist
- requested quantity cannot exceed stock
- repeated add merges quantity
- Cart operations do not mutate Inventory
- subtotal remains Money-based

## Inventory rules

`adjustInventory`:

- finds Inventory
- creates InventoryMovement
- uses Domain transition
- saves Inventory
- appends movement history

## Order rules

`changeOrderStatus` must use the Domain lifecycle.

Do not mutate Order status directly.

## Dependency rule

Application Use Cases depend on Domain Repository Contracts.

They must not import local repository classes.

Infrastructure selection belongs to composition.

## Quality Gate

Latest evidence:

```text
PASSO 21 targeted: 24/24
Full suite:         184/184
Test files:         22/22
lint:               passed
typecheck:          passed
build:              passed
check:              passed
```

## Decisions

After PASSO 21:

`CODAL-DEC-001 -> CODAL-DEC-097`

Next:

`CODAL-DEC-098`

## Next action

PASSO 22 - IndexedDB Provider and Persistent Local Adapters.

Persistent adapters must implement the same Domain Repository Contracts without changing Application Use Cases.

## Reading order

1. docs/PROJECT_STATE.md
2. docs/DECISIONS.md
3. docs/DOMAIN.md
4. docs/QUALITY_STATE.md
5. docs/STACK.md
6. CHANGELOG.md