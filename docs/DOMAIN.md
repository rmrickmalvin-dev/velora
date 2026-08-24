# DOMAIN — VELORA

## Objetivo

Definir as fronteiras do domínio do e-commerce VELORA independentemente de framework, UI ou mecanismo de persistência.

## Arquitetura

UI
↓
Application
↓
Domain Contracts
↑
Infrastructure

## Domain

Contém:

- Entities
- Value Objects
- Domain Services
- Repository Contracts

O domínio não depende de React, Next.js, Zustand, IndexedDB, Supabase ou APIs externas.

## Application

Contém:

- Use Cases
- DTOs
- Orquestração

A camada Application executa comportamentos utilizando contratos do domínio.

## Infrastructure

Contém implementações técnicas.

Primeira fase:

- Seed
- Persistência local
- IndexedDB quando necessário
- localStorage apenas para estados pequenos apropriados

Futuro:

- API
- Supabase
- PostgreSQL
- Auth Provider
- Storage
- Shipping Provider

## UI

Next.js e React apresentam e coletam interação.

Componentes não acessam providers de persistência diretamente.

## Entidades iniciais

- User
- CustomerProfile
- Session
- Product
- ProductVariant
- Inventory
- InventoryMovement
- Cart
- CartItem
- Order
- OrderItem
- Promotion
- Address
- StoreSettings

## Value Objects iniciais

- Money
- SKU

Outros poderão surgir apenas quando houver benefício concreto.

## Product e ProductVariant

Product representa o conceito comercial do item.

ProductVariant representa a unidade efetivamente vendável, podendo possuir SKU, preço, imagens, atributos e disponibilidade próprios.

## Inventory

Representa o estado atual de estoque de uma variante.

## InventoryMovement

Representa o histórico e motivo das alterações de estoque.

Tipos:

- ENTRY
- EXIT
- ADJUSTMENT

## Cart

Representa intenção de compra atual.

Não depende de Zustand ou React.

## Order

Representa registro de uma compra demonstrativa concluída.

OrderItem preserva snapshot comercial para impedir alterações históricas quando o catálogo mudar.

## Roles

- GUEST
- CUSTOMER
- ADMIN

O controle demonstrativo no frontend não representa autorização segura de produção.

## Money — Diretriz Arquitetural

Valores monetários serão armazenados internamente utilizando a menor unidade da moeda sempre que aplicável.

Exemplo:

R$ 19,90 = 1990 centavos.

A formatação pertence à fronteira de apresentação.

## Repositories

Contratos de repository não conhecem detalhes do provider.

Implementações poderão incluir:

- Demo Repository
- IndexedDB Repository
- Remote Repository

## Dependências proibidas no Domain

- React
- Next.js
- Zustand
- DOM
- localStorage
- IndexedDB
- Supabase
- fetch
- CSS

## Regra

Tecnologia pode mudar sem redefinir o significado das entidades centrais do sistema.

## Fundamental Types

O domínio possui tipos fechados para:

- UserRole
- ProductStatus
- OrderStatus
- InventoryMovementType
- PromotionStatus

Strings livres não devem substituir esses contratos.

## CurrencyCode

CurrencyCode normaliza e valida códigos monetários estruturais de três letras.

Suporte estrutural a códigos distintos não significa que a Storefront possua conversão ou preços multi-moeda.

## Money

Money utiliza:

- minorUnits;
- CurrencyCode;
- safe integers;
- operações imutáveis;
- verificação de moeda.

Money pode representar valores negativos.

Restrições específicas como preço >= 0 pertencem aos contratos de preço, não ao Value Object fundamental.

Formatação monetária pertence à camada de apresentação.

Operações percentuais serão adicionadas somente quando a política de arredondamento estiver formalmente definida.

## SKU

SKU é um identificador operacional de produto/variante.

O valor é:

- normalizado;
- uppercase;
- delimitado por hífen;
- validado;
- independente do ID interno da entidade.