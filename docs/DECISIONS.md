# DECISIONS — VELORA

Última atualização: 2026-08-24

## Objetivo

Este documento representa o Registro Oficial de Decisões da VELORA.

Decisões aceitas não devem ser apagadas silenciosamente.

Quando uma decisão precisar mudar:

1. preservar a decisão original;
2. registrar uma nova decisão;
3. marcar a anterior como SUPERADA;
4. indicar qual decisão a substituiu;
5. documentar a justificativa;
6. revalidar os gates afetados.

## Status possíveis

- PROPOSTA
- ACEITA
- SUPERADA
- REJEITADA

## Registro Oficial de Decisões

| ID | Status | Decisão | Razão |
| --- | --- | --- | --- |
| CODAL-DEC-001 | ACEITA | A navegação principal da VELORA seguirá estrutura vertical convencional de e-commerce | Preservar previsibilidade, escaneabilidade e familiaridade para usuários de comércio eletrônico |
| CODAL-DEC-002 | ACEITA | O sistema possuirá três papéis conceituais: GUEST, CUSTOMER e ADMIN | Demonstrar uma experiência completa baseada em papéis sem misturar responsabilidades |
| CODAL-DEC-003 | ACEITA | O papel ativo modifica globalmente as ações e capacidades disponíveis na experiência | Permitir que storefront e áreas operacionais reajam de forma consistente ao contexto do usuário |
| CODAL-DEC-004 | ACEITA | ADMIN poderá utilizar a própria Storefront com controles contextuais discretos de edição e operação | Demonstrar administração integrada sem criar uma experiência visual desconectada do produto público |
| CODAL-DEC-005 | ACEITA | A persistência local permanecerá desacoplada da UI | Permitir substituição futura do provider sem reconstruir componentes React |
| CODAL-DEC-006 | ACEITA | A VELORA não realizará pagamento real durante a versão conceitual de portfólio | Evitar simulação enganosa de transações financeiras e manter o checkout demonstrativo |
| CODAL-DEC-007 | ACEITA | PT-BR, EN e ES fazem parte da arquitetura desde o início | Evitar internacionalização tardia e garantir paridade estrutural entre idiomas |
| CODAL-DEC-008 | ACEITA | A identidade visual utilizará Pearl + Champagne como direção principal | Criar uma estética tecnológica, sofisticada e premium sem copiar diretamente outras marcas |
| CODAL-DEC-009 | ACEITA | UI e Data Provider permanecerão separados por contratos e camadas | Permitir evolução de dados locais para API, Supabase ou PostgreSQL sem acoplamento da apresentação |
| CODAL-DEC-010 | ACEITA | Operações administrativas relevantes deverão possuir feedback e confirmação apropriados | Reduzir erros operacionais e tornar ações administrativas compreensíveis |
| CODAL-DEC-011 | ACEITA | A identidade oficial do projeto será VELORA | Consolidar uma marca própria, memorável e adequada ao posicionamento tecnológico premium |
| CODAL-DEC-012 | ACEITA | O catálogo inicial utilizará produtos, marcas e dados fictícios | Permitir liberdade criativa para portfólio sem sugerir uma operação comercial real |
| CODAL-DEC-013 | ACEITA | O estado inicial utilizará Seed imutável combinado com overrides locais | Preservar uma baseline confiável e permitir alterações demonstrativas sem destruir os dados originais |
| CODAL-DEC-014 | ACEITA | IndexedDB será o mecanismo preferencial para dados mutáveis de domínio na implementação local | Suportar persistência estruturada e maior volume de dados sem acoplar o domínio ao navegador |
| CODAL-DEC-015 | ACEITA | Zustand será utilizado somente para estado global de experiência quando houver necessidade comprovada | Evitar transformar Zustand em substituto das regras de domínio ou dos repositories |
| CODAL-DEC-016 | ACEITA | Vercel será o primeiro alvo público de deploy | Manter alinhamento direto com Next.js e reduzir complexidade inicial de publicação |
| CODAL-DEC-017 | ACEITA | A base visual utilizará CSS moderno + CSS Modules + Design Tokens | Manter controle explícito do Design System, performance e identidade sem dependência inicial de Tailwind |
| CODAL-DEC-018 | ACEITA | Storefront e Admin utilizarão o mesmo Design System | Preservar consistência visual e reduzir duplicação entre experiências públicas e administrativas |
| CODAL-DEC-019 | ACEITA | Versões de runtime e dependências principais serão fixadas e registradas durante BUILD 01 | Tornar instalação, debugging, CI e evolução do projeto mais previsíveis |
| CODAL-DEC-020 | ACEITA | URLs localizadas e troca de idioma deverão preservar o contexto equivalente da jornada | Evitar que a mudança de idioma reinicie desnecessariamente a navegação do usuário |
| CODAL-DEC-021 | ACEITA | Domain não depende de React ou Next.js | Preservar regras centrais fora da UI |
| CODAL-DEC-022 | ACEITA | Product e ProductVariant são entidades distintas | Variações possuem SKU, preço e estoque próprios |
| CODAL-DEC-023 | ACEITA | Estoque é controlado por variante | Quantidades precisam representar a unidade vendável real |
| CODAL-DEC-024 | ACEITA | Inventory e InventoryMovement são conceitos separados | Estado atual e histórico possuem responsabilidades diferentes |
| CODAL-DEC-025 | ACEITA | OrderItem preserva snapshot comercial | Histórico não pode mudar com alterações futuras do catálogo |
| CODAL-DEC-026 | ACEITA | Valores monetários usam menor unidade da moeda | Reduzir erros de precisão e tornar cálculos determinísticos |
| CODAL-DEC-027 | ACEITA | Repository Contracts não conhecem providers | Permitir troca de persistência sem reconstruir Application ou UI |
| CODAL-DEC-028 | ACEITA | Componentes não acessam persistência de domínio diretamente | Evitar acoplamento entre UI e infraestrutura |
| CODAL-DEC-029 | ACEITA | Money é representado por minorUnits + CurrencyCode | Evitar ambiguidade e erros de precisão monetária |
| CODAL-DEC-030 | ACEITA | Formatação monetária não pertence ao Domain | Locale e apresentação não devem contaminar regras centrais |
| CODAL-DEC-031 | ACEITA | Percentuais aguardam política explícita de arredondamento | Não introduzir arredondamento financeiro silencioso |
| CODAL-DEC-032 | ACEITA | SKU e Entity ID são conceitos distintos | Identidade técnica e identidade operacional possuem responsabilidades diferentes |
| CODAL-DEC-033 | ACEITA | Testes unitários de domínio utilizam Vitest | Regras centrais precisam de prova automatizada desde o BUILD 01 |
| CODAL-DEC-034 | ACEITA | Slug será um Value Object reutilizável de Domain, com normalização e validação centralizadas | Evitar duplicação de regra de URL em entidades |
| CODAL-DEC-035 | ACEITA | ProductCategory, Product, ProductVariant e ProductMedia são conceitos separados do Catalog Domain | Preservar responsabilidade única e evolução independente |
| CODAL-DEC-036 | ACEITA | SKU pertence a ProductVariant, não ao Product genérico | SKU identifica a unidade comercial vendável |
| CODAL-DEC-037 | ACEITA | ProductVariant rejeita preço negativo, enquanto Money fundamental pode representar valores negativos | Separar regra matemática fundamental de regra comercial |
| CODAL-DEC-038 | ACEITA | Catalog Domain permanece independente de Inventory; Product e ProductVariant não armazenam quantidade ou stock | Evitar acoplamento entre catálogo e estado de estoque |
| CODAL-DEC-039 | ACEITA | ProductMedia pertence obrigatoriamente a Product e pode opcionalmente referenciar ProductVariant | Suportar mídia geral e mídia específica por variante |
| CODAL-DEC-040 | ACEITA | ProductVariant utiliza attributes genéricos e imutáveis | Suportar categorias distintas sem remodelar a entidade central |
| CODAL-DEC-041 | ACEITA | Conteúdo canônico pode existir no Domain, mas localização da experiência não cria dependência de src/i18n | Preservar independência entre domínio e apresentação localizada |
| CODAL-DEC-042 | ACEITA | Inventory represents stock by ProductVariantId and remains separate from Catalog Domain | Keep stock attached to the real sellable unit without contaminating ProductVariant |
| CODAL-DEC-043 | ACEITA | Inventory.quantityOnHand must be a non-negative safe integer | Prevent fractional, negative or numerically unsafe stock states |
| CODAL-DEC-044 | ACEITA | InventoryMovement is a historical entity separate from Inventory | Separate current stock state from stock-change history |
| CODAL-DEC-045 | ACEITA | InventoryMovement uses a signed non-zero safe-integer delta | Represent stock changes deterministically |
| CODAL-DEC-046 | ACEITA | ENTRY requires positive delta, EXIT requires negative delta, and ADJUSTMENT accepts either sign | Make movement semantics explicit and testable |
| CODAL-DEC-047 | ACEITA | InventoryMovement requires a reason | Preserve minimum audit context for stock changes |
| CODAL-DEC-048 | ACEITA | Inventory movements are applied through an immutable transition that validates the target Inventory | Avoid silent mutation and movement application to the wrong inventory |
| CODAL-DEC-049 | ACEITA | No movement may produce negative or unsafe stock quantity | Preserve inventory invariants after every transition |
| CODAL-DEC-058 | ACEITA | Cart is the aggregate for current purchase intent and remains separate from Order | Keep temporary shopping state distinct from transaction history |
| CODAL-DEC-051 | ACEITA | CartItem references ProductVariantId and does not duplicate Inventory responsibility | Keep the cart attached to the sellable unit without owning stock |
| CODAL-DEC-052 | ACEITA | CartItem quantity must be a positive safe integer | Prevent zero, negative, fractional or unsafe purchase quantities |
| CODAL-DEC-053 | ACEITA | CartItem unitPrice uses Money and cannot be negative | Keep cart calculations deterministic and compatible with monetary rules |
| CODAL-DEC-054 | ACEITA | Cart and its items collection are immutable domain values | Prevent silent mutation and simplify state transitions |
| CODAL-DEC-055 | ACEITA | A Cart may contain at most one line per ProductVariant and unique CartItem ids | Avoid duplicated commercial lines and ambiguous quantity state |
| CODAL-DEC-056 | ACEITA | Cart add, remove and quantity updates are immutable Domain Service transitions | Preserve aggregate invariants across cart operations |
| CODAL-DEC-057 | ACEITA | Cart subtotal is calculated from unitPrice times quantity using Money; empty Cart returns null | Preserve currency safety while acknowledging that an empty cart has no currency context |
| CODAL-DEC-066 | ACEITA | Order and OrderItem remain separate from Cart and CartItem | Preserve the boundary between current purchase intent and transaction history |
| CODAL-DEC-059 | ACEITA | OrderItem preserves explicit commercial snapshots for product name, SKU and unit price | Historical orders must not change when Catalog data changes |
| CODAL-DEC-060 | ACEITA | Order requires at least one OrderItem while customerId remains optional for guest orders | Prevent empty transactions while preserving guest checkout capability |
| CODAL-DEC-061 | ACEITA | OrderItem quantity must be a positive safe integer and unitPriceSnapshot cannot be negative | Preserve deterministic commercial history |
| CODAL-DEC-062 | ACEITA | OrderItem ids are unique inside an Order, while variant duplication is not prohibited at the Order layer | Preserve line identity without blocking future pricing or promotion scenarios |
| CODAL-DEC-063 | ACEITA | OrderStatus is runtime-validated and changes only through an explicit transition graph | Prevent invalid lifecycle jumps |
| CODAL-DEC-064 | ACEITA | DELIVERED and CANCELLED are terminal Order states | Preserve lifecycle finality |
| CODAL-DEC-065 | ACEITA | Order subtotal is derived from OrderItem snapshots using Money and rejects currency mismatch | Keep historical totals deterministic and currency-safe |

## Decisões por área

### Experiência e Produto

- CODAL-DEC-001 — navegação vertical convencional;
- CODAL-DEC-002 — GUEST, CUSTOMER e ADMIN;
- CODAL-DEC-003 — role modifica a experiência global;
- CODAL-DEC-004 — Admin possui controles contextuais na Storefront;
- CODAL-DEC-006 — nenhum pagamento real;
- CODAL-DEC-010 — feedback e confirmação para operações administrativas;
- CODAL-DEC-011 — identidade VELORA;
- CODAL-DEC-012 — catálogo fictício inicial.

### Internacionalização

- CODAL-DEC-007 — PT-BR, EN e ES desde o início;
- CODAL-DEC-020 — locale preserva contexto equivalente da jornada.

### Design System

- CODAL-DEC-008 — Pearl + Champagne;
- CODAL-DEC-017 — CSS + CSS Modules + Design Tokens;
- CODAL-DEC-018 — Storefront e Admin compartilham Design System.

### Arquitetura e Persistência

- CODAL-DEC-005 — persistência desacoplada da UI;
- CODAL-DEC-009 — UI e Data Provider separados;
- CODAL-DEC-013 — Seed imutável + overrides locais;
- CODAL-DEC-014 — IndexedDB para domínio mutável;
- CODAL-DEC-015 — Zustand apenas para estado global necessário;
- CODAL-DEC-021 — Domain independente de React e Next.js;
- CODAL-DEC-027 — Repository Contracts independentes de providers;
- CODAL-DEC-028 — componentes não acessam persistência diretamente.

### Runtime e Deploy

- CODAL-DEC-016 — Vercel como primeiro alvo público;
- CODAL-DEC-019 — versões registradas durante BUILD 01.

### Catálogo e Estoque

- CODAL-DEC-022 — Product e ProductVariant separados;
- CODAL-DEC-023 — estoque por variante;
- CODAL-DEC-024 — Inventory e InventoryMovement separados;
- CODAL-DEC-032 — SKU e Entity ID separados.

### Pedidos

- CODAL-DEC-025 — OrderItem preserva snapshot comercial.

### Dinheiro e Pricing

- CODAL-DEC-026 — valores monetários usam menor unidade da moeda;
- CODAL-DEC-029 — Money utiliza minorUnits + CurrencyCode;
- CODAL-DEC-030 — formatação monetária fora do Domain;
- CODAL-DEC-031 — percentuais aguardam política explícita de arredondamento.

### Qualidade

- CODAL-DEC-033 — Vitest é o test runner unitário do Domain.

### Catalog Domain — PASSO 14

- CODAL-DEC-034 — Slug como Value Object reutilizável;
- CODAL-DEC-035 — entidades do Catalog Domain separadas;
- CODAL-DEC-036 — SKU pertence a ProductVariant;
- CODAL-DEC-037 — ProductVariant.price não negativo;
- CODAL-DEC-038 — Catalog separado de Inventory;
- CODAL-DEC-039 — ProductMedia ligada a Product e opcionalmente Variant;
- CODAL-DEC-040 — attributes de Variant genéricos e imutáveis;
- CODAL-DEC-041 — Domain independente de src/i18n.

### Inventory Domain - PASSO 15

- CODAL-DEC-042 - Inventory by ProductVariantId
- CODAL-DEC-043 - safe non-negative quantityOnHand
- CODAL-DEC-044 - InventoryMovement separated from Inventory
- CODAL-DEC-045 - signed non-zero safe-integer delta
- CODAL-DEC-046 - explicit ENTRY, EXIT and ADJUSTMENT semantics
- CODAL-DEC-047 - required reason
- CODAL-DEC-048 - immutable transition with Inventory relation validation
- CODAL-DEC-049 - no negative or unsafe resulting stock

## Regras de continuidade

Uma IA ou desenvolvedor que continuar a VELORA deve:

- ler este documento antes de propor mudanças arquiteturais;
- não substituir decisões ACEITAS silenciosamente;
- verificar se uma nova implementação contradiz alguma decisão existente;
- registrar novas decisões com numeração sequencial;
- utilizar o próximo número disponível após CODAL-DEC-065;
- preservar decisões históricas mesmo quando forem superadas.

## Próxima decisão disponível

CODAL-DEC-042