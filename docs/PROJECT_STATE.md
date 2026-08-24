# PROJECT STATE — VELORA

Última atualização: 2026-08-24

## Projeto

VELORA

## Fase

BUILD 01 — Foundation

## Unidade atual

01B — Domain Contracts + Repository Architecture + Seed Foundation + Test Infrastructure

## Estado

EM EXECUÇÃO

A Unidade 01A foi concluída, validada e versionada em Git.

A Unidade 01B está em desenvolvimento.

## Último ponto válido

### Unidade 01A — Bootstrap + Locale Foundation

Concluída e validada.

A fundação inicial da VELORA contém:

- Next.js App Router;
- TypeScript;
- contrato de runtime;
- locale routing;
- PT-BR;
- EN;
- ES;
- redirecionamento de `/` para `/pt-BR`;
- troca de idioma preservando pathname equivalente;
- Design Tokens;
- identidade visual Pearl + Champagne;
- Manrope;
- IBM Plex Mono;
- metadata localizada;
- `html lang` localizado;
- Locale Switcher;
- Foundation Page responsiva;
- Proxy de locale;
- baseline de acessibilidade;
- baseline de reduced motion;
- navegação por teclado;
- foco visível;
- ausência de overflow horizontal nos breakpoints validados.

Validações visuais comprovadas:

- 375px;
- 768px;
- 1024px;
- 1440px.

### Unidade 01B — Domain Foundation

Arquitetura de domínio iniciada.

Fronteiras formalmente definidas:

UI
↓
Application
↓
Domain Contracts
↑
Infrastructure

Foram definidos os seguintes princípios:

- Domain não depende de React;
- Domain não depende de Next.js;
- Domain não depende de Zustand;
- Domain não acessa DOM;
- Domain não acessa localStorage;
- Domain não acessa IndexedDB;
- Domain não acessa Supabase;
- Domain não utiliza providers diretamente;
- componentes de UI não acessam persistência de domínio diretamente;
- Repository Contracts permanecem independentes do provider;
- Product e ProductVariant são conceitos distintos;
- estoque pertence à variante;
- Inventory e InventoryMovement possuem responsabilidades distintas;
- OrderItem deverá preservar snapshot comercial;
- Money utiliza a menor unidade da moeda;
- SKU e Entity ID são conceitos distintos.

## Contratos de domínio implementados

Primeiros contratos executáveis implementados:

- Fundamental Types;
- UserRole;
- ProductStatus;
- OrderStatus;
- InventoryMovementType;
- PromotionStatus;
- DomainValidationError;
- CurrencyCode;
- Money;
- SKU.

## CurrencyCode

Implementado com:

- normalização;
- uppercase;
- validação estrutural;
- código de erro de domínio;
- BRL como moeda baseline atual do projeto.

## Money

Implementado com:

- `minorUnits`;
- `CurrencyCode`;
- safe integers;
- imutabilidade;
- soma;
- subtração;
- multiplicação por quantidade inteira;
- comparação;
- igualdade;
- suporte a resultado negativo;
- proteção contra operações entre moedas diferentes.

Valores monetários negativos são permitidos no Value Object fundamental porque podem representar diferenças, prejuízo e resultados financeiros.

Restrições específicas, como preço de venda não negativo, pertencem aos contratos responsáveis por preço e produto.

Formatação monetária permanece fora do Domain.

Política de arredondamento percentual ainda não foi definida e não deve ser adicionada implicitamente.

## SKU

Implementado com:

- normalização;
- uppercase;
- separadores por hífen;
- remoção de separadores duplicados;
- validação de comprimento;
- validação de formato;
- identidade distinta do Entity ID.

Exemplo:

`vl_aster xp 256 gra`

é normalizado para:

`VL-ASTER-XP-256-GRA`

## Runtime comprovado

Node.js: 24.13.0

npm: 11.6.2

## Dependências principais comprovadas

Next.js: 16.3.1

React: 19.2.8

React DOM: 19.2.8

TypeScript: 5.9.3

ESLint: 9.39.5

Vitest: 4.1.11

## Test Infrastructure

Vitest foi introduzido como primeiro test runner de domínio.

Suites atuais:

- CurrencyCode;
- Money;
- SKU.

Resultado comprovado:

- 3 test files passed;
- 18 testes passaram;
- 0 testes falharam.

## Quality Gate comprovado

O gate agregado atual executa:

lint
→ typecheck
→ unit tests
→ production build

Comando:

`npm run check`

Última execução comprovada:

- ESLint: aprovado;
- TypeScript: aprovado;
- Vitest: 18/18 testes aprovados;
- Production Build: aprovado;
- Aggregated Check: aprovado.

## Build de produção comprovado

Next.js gerou corretamente:

- `/pt-BR`;
- `/en`;
- `/es`.

As três rotas foram pré-renderizadas via SSG utilizando `generateStaticParams`.

O Proxy também foi reconhecido pelo Next.js.

## Contrato de locale

Locales suportados:

- pt-BR;
- en;
- es.

Locale padrão:

- pt-BR.

Comportamento comprovado:

- `/` redireciona para `/pt-BR`;
- `/pt-BR` funciona;
- `/en` funciona;
- `/es` funciona;
- troca de idioma funciona;
- troca de idioma preserva pathname equivalente;
- `html lang` acompanha o locale;
- metadata acompanha o locale.

## Persistência

Estado atual:

Ainda não implementada para o domínio comercial.

Direção arquitetural aprovada:

UI
→ Application
→ Repository Contract
→ Infrastructure Provider

Primeira fase planejada:

- Seed imutável;
- overrides locais;
- IndexedDB para domínio mutável;
- localStorage somente para estados pequenos apropriados.

Futuro:

- API;
- Supabase;
- PostgreSQL.

A UI não poderá acessar esses mecanismos diretamente.

## Documentação operacional

Documentos ativos:

- `docs/PROJECT_STATE.md`;
- `docs/DECISIONS.md`;
- `docs/STACK.md`;
- `docs/QUALITY_STATE.md`;
- `docs/DOMAIN.md`;
- `docs/AI_HANDOFF.md`;
- `CHANGELOG.md`.

Esses documentos devem ser atualizados conforme decisões, arquitetura e gates forem alterados.

## Próxima ação

Implementar os contratos centrais do catálogo:

- ProductCategory;
- Product;
- ProductVariant;
- ProductMedia.

Esses contratos devem ser acompanhados por testes unitários das invariantes do catálogo.

Regras que deverão ser protegidas incluem:

- produto possuir identidade válida;
- slug possuir formato válido;
- variante pertencer a um produto;
- SKU continuar sendo responsabilidade da variante;
- preço não permitir valor negativo;
- moedas relacionadas permanecerem coerentes quando necessário;
- mídia possuir estrutura previsível;
- Product não absorver responsabilidades de Inventory;
- Product não depender de React, Next.js ou Infrastructure.

## Próximo gate

Após a implementação do domínio de catálogo:

1. executar testes unitários específicos;
2. executar `npm run typecheck`;
3. executar `npm run lint`;
4. executar `npm run check`;
5. atualizar documentação;
6. criar checkpoint Git se todos os gates forem aprovados.

## Próximo marco

PASSO 14 — ProductCategory + Product + ProductVariant + ProductMedia