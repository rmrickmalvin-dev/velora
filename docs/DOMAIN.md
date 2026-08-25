# DOMAIN â€” VELORA

Ãšltima atualizaÃ§Ã£o: 2026-08-25

## Objetivo

Definir o domÃ­nio da VELORA independentemente de framework, UI e provider.

## Regra central

```text
Domain nÃ£o conhece Framework.
Framework conhece Domain.
```

## DependÃªncias proibidas no Domain

React, Next.js, Zustand, DOM, CSS, localStorage, IndexedDB, Supabase, fetch e providers externos.

## DireÃ§Ã£o arquitetural

```text
UI
â†“
Application
â†“
Domain Contracts
â†‘
Infrastructure
```

## Ãreas

Catalog, Inventory, Cart, Order, Pricing, Promotion, Authentication e Customer.

## IDs atuais

UserId, CustomerId, ProductCategoryId, ProductId, ProductVariantId, ProductMediaId, InventoryId, InventoryMovementId, CartId, OrderId, PromotionId e AddressId.

IDs continuam independentes da tecnologia de persistÃªncia.

## DomainValidationError

Contrato: `code + message`.

## CurrencyCode

Trim, uppercase e trÃªs letras. BRL Ã© baseline atual. Locale e Currency sÃ£o conceitos separados.

## Money

Usa `minorUnits + CurrencyCode`.

Regras:

- minorUnits Ã© safe integer;
- moedas incompatÃ­veis nÃ£o operam juntas;
- Money fundamental pode ser negativo;
- formataÃ§Ã£o fica fora do Domain;
- ProductVariant.price aplica regra prÃ³pria de nÃ£o negatividade;
- porcentagens aguardam polÃ­tica explÃ­cita de arredondamento.

## SKU

Identificador operacional/comercial distinto de Entity ID.

SKU pertence a ProductVariant.

## Slug

Value Object reutilizÃ¡vel.

Normaliza Unicode/diacrÃ­ticos, trim, lowercase e separadores; rejeita resultado vazio; mÃ¡ximo atual 96 caracteres.

## Catalog Domain

```text
ProductCategory
       â”‚
       â–¼
    Product
       â”‚
       â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
       â–¼               â–¼
ProductVariant     ProductMedia
```

Catalog nÃ£o Ã© Inventory.

## ProductCategory

`id + slug + name + description?`

Invariantes: id, name e slug vÃ¡lidos; resultado imutÃ¡vel.

## Product

`id + slug + name + brand + model + categoryId + status + featured`

NÃ£o possui stock, quantity, inventory, cart state, order state, provider ou React state.

## ProductVariant

`id + productId + sku + price + status + attributes`

Invariantes:

- id obrigatÃ³rio;
- productId obrigatÃ³rio;
- SKU vÃ¡lido;
- price nÃ£o negativo;
- status vÃ¡lido;
- attribute keys/values nÃ£o vazios;
- attributes imutÃ¡veis.

Attributes sÃ£o genÃ©ricos para categorias diferentes.

## ProductMedia

`id + productId + variantId? + url + alt + position`

Toda mÃ­dia pertence a Product e pode opcionalmente apontar para uma Variant especÃ­fica.

Position Ã© safe integer nÃ£o negativo.

## Product x ProductVariant

NÃ£o fundir.

Product Ã© o conceito comercial principal. ProductVariant Ã© a configuraÃ§Ã£o vendÃ¡vel especÃ­fica com SKU, preÃ§o e atributos.

## Catalog x Inventory

Proibido:

- Product.stock;
- Product.quantity;
- ProductVariant.stock;
- ProductVariant.quantity.

Modelo futuro:

```text
ProductVariant
      â”‚
      â–¼
Inventory
      â”‚
      â–¼
InventoryMovement
```

## Inventory

Ainda nÃ£o implementado. RepresentarÃ¡ quantidade atual por ProductVariantId.

## InventoryMovement

Ainda nÃ£o implementado. Tipos jÃ¡ definidos: ENTRY, EXIT e ADJUSTMENT.

## Cart

Ainda nÃ£o implementado. RepresentarÃ¡ intenÃ§Ã£o atual de compra e nÃ£o serÃ¡ Order.

## Order

Ainda nÃ£o implementado. RepresentarÃ¡ snapshot transacional. OrderItem preservarÃ¡ snapshot comercial.

## Persistence Boundary

```text
Use Case
â†“
Repository Contract
â†“
Repository Implementation
â†“
Data Provider
```

Primeira fase: Seed imutÃ¡vel + IndexedDB/local overrides.

Futuro: API + PostgreSQL/Supabase.

## Internationalization Boundary

`src/domain` nÃ£o importa `src/i18n`.

PT-BR, EN e ES pertencem Ã  experiÃªncia/apresentaÃ§Ã£o.

## Test Coverage

```text
CurrencyCode       3
Money             10
SKU                5
Slug               5
ProductCategory    4
Product            5
ProductVariant     7
ProductMedia       7
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
TOTAL             46
```

## PrÃ³ximo marco

PASSO 15 â€” Inventory + InventoryMovement, sem adicionar quantidade em Product ou ProductVariant.