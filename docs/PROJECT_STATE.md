# PROJECT STATE â€” VELORA

Ãšltima atualizaÃ§Ã£o: 2026-08-25

## Projeto

VELORA â€” e-commerce conceitual profissional de smartphones, acessÃ³rios e tecnologia mÃ³vel para portfÃ³lio.

Locales: PT-BR, EN e ES.

## Fase

BUILD 01 â€” Foundation

## Unidade atual

01B â€” Domain Foundation

Status: EM EXECUÃ‡ÃƒO

## Ãšltimo checkpoint Git estÃ¡vel anterior

`90f2d42` â€” `feat: add domain primitives and unit test foundation`

## Ãšltimo passo tÃ©cnico validado

PASSO 14 â€” Catalog Domain

Implementados:

- Slug;
- ProductCategory;
- Product;
- ProductVariant;
- ProductMedia.

## Arquitetura

```text
UI
â†“
Application
â†“
Domain Contracts
â†‘
Infrastructure
```

Domain nÃ£o depende de React, Next.js, Zustand, DOM, CSS, localStorage, IndexedDB, Supabase, fetch ou providers externos.

UI nÃ£o acessa persistÃªncia de domÃ­nio diretamente.

## Value Objects

Implementados:

- CurrencyCode;
- Money;
- SKU;
- Slug.

Money usa `minorUnits + CurrencyCode`. Money fundamental pode representar valor negativo, mas `ProductVariant.price` nÃ£o pode ser negativo.

SKU Ã© distinto de Entity ID e pertence a ProductVariant.

Slug centraliza normalizaÃ§Ã£o e validaÃ§Ã£o URL-safe.

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

### ProductCategory

Campos: id, slug, name, description?.

### Product

Campos: id, slug, name, brand, model, categoryId, status, featured.

Product nÃ£o possui estoque.

### ProductVariant

Campos: id, productId, sku, price, status, attributes.

Regras:

- pertence a Product por `productId`;
- SKU pertence Ã  variante;
- preÃ§o nÃ£o negativo;
- attributes genÃ©ricos e imutÃ¡veis;
- nÃ£o armazena estoque.

### ProductMedia

Campos: id, productId, variantId?, url, alt, position.

Pode ser mÃ­dia geral do Product ou mÃ­dia especÃ­fica de uma Variant.

## Catalog x Inventory

Catalog Domain nÃ£o Ã© Inventory Domain.

- Product nÃ£o possui stock;
- ProductVariant nÃ£o possui stock;
- Inventory deverÃ¡ referenciar ProductVariantId.

## Runtime e stack comprovados

- Node.js 24.13.0;
- npm 11.6.2;
- Next.js 16.3.1;
- React 19.2.8;
- React DOM 19.2.8;
- TypeScript 5.9.3;
- ESLint 9.39.5;
- Vitest 4.1.11.

## Quality Gate

`npm run check` executa lint â†’ typecheck â†’ unit tests â†’ production build.

Ãšltima evidÃªncia em 2026-08-25:

- typecheck aprovado;
- lint aprovado;
- 8 test files passed;
- 46/46 testes passaram;
- 0 falhas;
- production build aprovado;
- `/pt-BR`, `/en` e `/es` SSG aprovados;
- Proxy reconhecido.

DistribuiÃ§Ã£o:

- CurrencyCode 3;
- Money 10;
- SKU 5;
- Slug 5;
- ProductCategory 4;
- Product 5;
- ProductVariant 7;
- ProductMedia 7.

PASSO 14 isolado: 5 arquivos, 28/28 testes.

## PersistÃªncia planejada

```text
UI
â†’ Application
â†’ Repository Contract
â†’ Infrastructure Provider
```

Primeira fase: Seed imutÃ¡vel + overrides locais + IndexedDB para estado mutÃ¡vel.

Futuro: API, Supabase, PostgreSQL.

## DecisÃµes

ApÃ³s esta sincronizaÃ§Ã£o: `CODAL-DEC-001 â†’ CODAL-DEC-041`.

PrÃ³xima decisÃ£o disponÃ­vel: `CODAL-DEC-042`.

## PrÃ³xima aÃ§Ã£o

PASSO 15 â€” Inventory + InventoryMovement.

Objetivos:

- estoque por ProductVariantId;
- quantidade segura;
- ENTRY, EXIT e ADJUSTMENT;
- histÃ³rico separado do estado atual;
- testes unitÃ¡rios;
- regressÃ£o completa;
- independÃªncia de Infrastructure.