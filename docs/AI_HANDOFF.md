# AI HANDOFF - VELORA

Last update: 2026-08-25

CODAL OS - Complete Edition active.

## State

BUILD 01 - Foundation

Unit 01B - Domain Foundation

Latest validated step:

PASSO 15 - Inventory + InventoryMovement

## Checkpoints

- `90f2d42` - domain primitives
- `d682c43` - catalog domain

## Stack

- Node.js 24.13.0
- npm 11.6.2
- Next.js 16.3.1
- React 19.2.8
- React DOM 19.2.8
- TypeScript 5.9.3
- ESLint 9.39.5
- Vitest 4.1.11

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

## Inventory Rules

Inventory:

```text
id
productVariantId
quantityOnHand
```

quantityOnHand:

- safe integer
- >= 0

InventoryMovement:

```text
id
inventoryId
type
delta
reason
```

Semantics:

- ENTRY => positive delta
- EXIT => negative delta
- ADJUSTMENT => positive or negative non-zero delta

Movement reason is required.

`applyInventoryMovement`:

- validates inventoryId
- rejects negative stock
- rejects unsafe result
- returns a new Inventory

## Critical architecture rule

Do not add stock or quantity to Product/ProductVariant.

Inventory remains separate from Catalog.

## Quality Gate

Latest evidence:

```text
PASSO 15 targeted: 26/26
Full suite:         72/72
lint:               passed
typecheck:          passed
build:              passed
check:              passed
```

Routes:

- /pt-BR SSG
- /en SSG
- /es SSG

## Decisions

After PASSO 15:

`CODAL-DEC-001 -> CODAL-DEC-049`

Next:

`CODAL-DEC-050`

## Next action

PASSO 16 - Cart + CartItem.

Do not start Order before Cart is stable.

## Reading order

1. docs/PROJECT_STATE.md
2. docs/DECISIONS.md
3. docs/DOMAIN.md
4. docs/QUALITY_STATE.md
5. docs/STACK.md
6. CHANGELOG.md