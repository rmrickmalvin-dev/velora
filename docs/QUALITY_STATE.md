# QUALITY STATE — VELORA

Última atualização: 2026-08-24

## BUILD 01

Status: EM EXECUÇÃO

## Unidade 01A — Bootstrap + Locale Foundation

Status: CONCLUÍDA E VALIDADA

### Runtime

- [x] Node 24.13.0 comprovado
- [x] npm 11.6.2 comprovado
- [x] `.nvmrc` presente
- [x] `engines` registrados

### Framework

- [x] Next.js 16.3.1
- [x] React 19.2.8
- [x] React DOM 19.2.8
- [x] TypeScript 5.9.3
- [x] ESLint 9.39.5

### Internationalization

- [x] contrato central de locales
- [x] PT-BR
- [x] EN
- [x] ES
- [x] `/` redireciona para `/pt-BR`
- [x] troca de locale funciona
- [x] pathname equivalente é preservado
- [x] `html lang` correto
- [x] metadata localizada

### Visual

- [x] Pearl + Champagne tokens
- [x] Manrope
- [x] IBM Plex Mono
- [x] Foundation Page
- [x] 375px aprovado
- [x] 768px aprovado
- [x] 1024px aprovado
- [x] 1440px aprovado
- [x] sem overflow horizontal

### Accessibility

- [x] HTML semântico inicial
- [x] `focus-visible`
- [x] nomes acessíveis do Locale Switcher
- [x] bandeiras decorativas ocultas para tecnologias assistivas
- [x] reduced motion baseline
- [x] navegação por teclado validada
- [x] foco visível validado

### Technical Gates

- [x] `npm run lint`
- [x] `npm run typecheck`
- [x] `npm run build`
- [x] `npm run check`

### Build

- [x] `/pt-BR` gerado
- [x] `/en` gerado
- [x] `/es` gerado
- [x] SSG utilizando `generateStaticParams`
- [x] Proxy reconhecido pelo Next.js

### Resultado

Unidade 01A concluída, validada e versionada em Git.

A fundação visual, responsiva, internacionalizada e acessível da VELORA está aprovada.

---

## Unidade 01B — Domain Contracts + Repository Architecture + Seed Foundation + Test Infrastructure

Status: EM EXECUÇÃO

### Architecture Boundaries

- [x] Domain boundary definida
- [x] Application boundary definida
- [x] Infrastructure boundary definida
- [x] UI boundary definida
- [x] direção de dependências documentada
- [x] Repository Contracts independentes de provider
- [x] UI proibida de acessar persistência de domínio diretamente

### Domain Dependency Rules

- [x] Domain não depende de React
- [x] Domain não depende de Next.js
- [x] Domain não depende de Zustand
- [x] Domain não depende de DOM
- [x] Domain não acessa localStorage
- [x] Domain não acessa IndexedDB
- [x] Domain não acessa Supabase
- [x] Domain não utiliza `fetch`
- [x] Domain não depende de CSS

### Domain Modeling Decisions

- [x] Product e ProductVariant separados
- [x] estoque associado à variante
- [x] Inventory e InventoryMovement separados
- [x] Cart separado de Order
- [x] OrderItem deverá preservar snapshot comercial
- [x] User e CustomerProfile separados
- [x] Promotion possui responsabilidade própria
- [x] Money utiliza minor units
- [x] SKU e Entity ID são conceitos distintos

### Fundamental Types

- [x] UserRole
- [x] ProductStatus
- [x] OrderStatus
- [x] InventoryMovementType
- [x] PromotionStatus

### DomainValidationError

- [x] erro de validação de domínio implementado
- [x] erros possuem código programático
- [x] erros não dependem apenas de mensagem humana

### CurrencyCode

- [x] CurrencyCode implementado
- [x] normalização implementada
- [x] uppercase implementado
- [x] formato estrutural validado
- [x] BRL definido como baseline atual
- [x] código inválido gera erro de domínio

### Money

- [x] Money implementado
- [x] `minorUnits`
- [x] `CurrencyCode`
- [x] safe integers
- [x] imutabilidade
- [x] soma
- [x] subtração
- [x] multiplicação por inteiro
- [x] comparação
- [x] igualdade
- [x] suporte a resultado negativo
- [x] operações entre moedas incompatíveis são rejeitadas
- [x] multiplicadores fracionários são rejeitados
- [x] formatação monetária permanece fora do Domain
- [x] política percentual não foi adicionada sem regra explícita de arredondamento

### SKU

- [x] SKU implementado
- [x] normalização
- [x] uppercase
- [x] espaços convertidos em hífen
- [x] underscores convertidos em hífen
- [x] separadores duplicados removidos
- [x] comprimento validado
- [x] caracteres inválidos rejeitados
- [x] SKU permanece diferente do Entity ID

### Unit Testing

- [x] Vitest 4.1.11 instalado
- [x] script `npm run test`
- [x] script `npm run test:watch`
- [x] CurrencyCode testado
- [x] Money testado
- [x] SKU testado

### Test Evidence

- [x] 3 test files passed
- [x] 18 testes passaram
- [x] 0 testes falharam

### Technical Gates — Unidade 01B

- [x] `npm run lint`
- [x] `npm run typecheck`
- [x] `npm run test`
- [x] `npm run build`
- [x] `npm run check`

### Aggregated Quality Gate

O comando:

`npm run check`

executa:

lint
→ typecheck
→ unit tests
→ production build

Último resultado comprovado:

- [x] ESLint aprovado
- [x] TypeScript aprovado
- [x] Vitest aprovado — 18/18
- [x] Production Build aprovado
- [x] SSG `/pt-BR` aprovado
- [x] SSG `/en` aprovado
- [x] SSG `/es` aprovado
- [x] Proxy reconhecido

### Próximas validações da Unidade 01B

Ainda pendentes:

- [ ] ProductCategory
- [ ] Product
- [ ] ProductVariant
- [ ] ProductMedia
- [ ] testes do catálogo
- [ ] Inventory
- [ ] InventoryMovement
- [ ] Cart
- [ ] CartItem
- [ ] Order
- [ ] OrderItem
- [ ] Repository Contracts
- [ ] Seed Foundation
- [ ] persistência local
- [ ] Test Infrastructure expandida para próximas regras

## Resultado Atual

BUILD 01 permanece em execução.

Unidade 01A:

CONCLUÍDA E VALIDADA.

Unidade 01B:

EM EXECUÇÃO.

Último ponto técnico comprovado:

- Domain primitives implementados;
- Vitest 4.1.11 operacional;
- 18/18 testes unitários aprovados;
- lint aprovado;
- typecheck aprovado;
- production build aprovado;
- aggregated quality gate aprovado.

Próximo alvo:

ProductCategory
→ Product
→ ProductVariant
→ ProductMedia
→ testes das invariantes do catálogo