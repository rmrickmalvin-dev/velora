# QUALITY STATE - VELORA

Last update: 2026-08-25

## BUILD 01

Status: IN PROGRESS

## Unit 01A

Status: COMPLETED, VALIDATED AND VERSIONED

## Unit 01B - Domain Foundation

Status: IN PROGRESS

### Foundation

- [x] architecture boundaries
- [x] DomainValidationError
- [x] CurrencyCode
- [x] Money
- [x] SKU
- [x] Slug
- [x] Vitest

### Catalog Domain - PASSO 14

- [x] ProductCategory
- [x] Product
- [x] ProductVariant
- [x] ProductMedia
- [x] 46/46 total tests at checkpoint

### Inventory Domain - PASSO 15

- [x] Inventory
- [x] InventoryMovement
- [x] Inventory Service
- [x] 26/26 targeted tests
- [x] 72/72 total tests at checkpoint

### Cart Domain - PASSO 16

- [x] CartItem
- [x] Cart
- [x] Cart Service
- [x] CartItemId
- [x] positive safe-integer quantity
- [x] non-negative unit price
- [x] immutable CartItem
- [x] immutable Cart
- [x] immutable item collection
- [x] unique CartItem ids
- [x] one line per ProductVariant
- [x] immutable add
- [x] immutable remove
- [x] immutable quantity update
- [x] subtotal by Money
- [x] empty subtotal is null
- [x] multi-currency subtotal rejected

## PASSO 16 Test Evidence

Targeted:

```text
3 test files
28 tests
28 passed
0 failed
```

Complete suite:

```text
14 test files
100 tests
100 passed
0 failed
```

## Latest Technical Gate

- [x] targeted Vitest
- [x] npm run lint
- [x] npm run typecheck
- [x] npm run test
- [x] npm run build
- [x] npm run check
- [x] /pt-BR SSG
- [x] /en SSG
- [x] /es SSG
- [x] Proxy recognized

## Pending - Unit 01B

- [ ] Order
- [ ] OrderItem
- [ ] Repository Contracts
- [ ] Seed Foundation
- [ ] IndexedDB provider
- [ ] Local repositories

## Next Quality Gate

PASSO 17 - Order + OrderItem.