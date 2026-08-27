CODAL-DEC-199 VELORA

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
| CODAL-DEC-050 | ACEITA | Cart is the aggregate for current purchase intent and remains separate from Order | Keep temporary shopping state distinct from transaction history |
| CODAL-DEC-051 | ACEITA | CartItem references ProductVariantId and does not duplicate Inventory responsibility | Keep the cart attached to the sellable unit without owning stock |
| CODAL-DEC-052 | ACEITA | CartItem quantity must be a positive safe integer | Prevent zero, negative, fractional or unsafe purchase quantities |
| CODAL-DEC-053 | ACEITA | CartItem unitPrice uses Money and cannot be negative | Keep cart calculations deterministic and compatible with monetary rules |
| CODAL-DEC-054 | ACEITA | Cart and its items collection are immutable domain values | Prevent silent mutation and simplify state transitions |
| CODAL-DEC-055 | ACEITA | A Cart may contain at most one line per ProductVariant and unique CartItem ids | Avoid duplicated commercial lines and ambiguous quantity state |
| CODAL-DEC-056 | ACEITA | Cart add, remove and quantity updates are immutable Domain Service transitions | Preserve aggregate invariants across cart operations |
| CODAL-DEC-057 | ACEITA | Cart subtotal is calculated from unitPrice times quantity using Money; empty Cart returns null | Preserve currency safety while acknowledging that an empty cart has no currency context |
| CODAL-DEC-058 | ACEITA | Order and OrderItem remain separate from Cart and CartItem | Preserve the boundary between current purchase intent and transaction history |
| CODAL-DEC-059 | ACEITA | OrderItem preserves explicit commercial snapshots for product name, SKU and unit price | Historical orders must not change when Catalog data changes |
| CODAL-DEC-060 | ACEITA | Order requires at least one OrderItem while customerId remains optional for guest orders | Prevent empty transactions while preserving guest checkout capability |
| CODAL-DEC-061 | ACEITA | OrderItem quantity must be a positive safe integer and unitPriceSnapshot cannot be negative | Preserve deterministic commercial history |
| CODAL-DEC-062 | ACEITA | OrderItem ids are unique inside an Order, while variant duplication is not prohibited at the Order layer | Preserve line identity without blocking future pricing or promotion scenarios |
| CODAL-DEC-063 | ACEITA | OrderStatus is runtime-validated and changes only through an explicit transition graph | Prevent invalid lifecycle jumps |
| CODAL-DEC-064 | ACEITA | DELIVERED and CANCELLED are terminal Order states | Preserve lifecycle finality |
| CODAL-DEC-065 | ACEITA | Order subtotal is derived from OrderItem snapshots using Money and rejects currency mismatch | Keep historical totals deterministic and currency-safe |
| CODAL-DEC-066 | ACEITA | Repository Contracts live in Domain and expose only Domain concepts | Preserve persistence independence and dependency direction |
| CODAL-DEC-067 | ACEITA | Repository operations are asynchronous Promise-based contracts from the start | Support local and remote providers without changing Application signatures |
| CODAL-DEC-068 | ACEITA | Single-entity repository lookups return Entity or null when data is absent | Treat absence as a normal data outcome and let Application decide error semantics |
| CODAL-DEC-069 | ACEITA | Repository collection queries return readonly arrays | Prevent callers from mutating repository-owned collections |
| CODAL-DEC-070 | ACEITA | InventoryMovementRepository exposes append instead of generic save | Make historical append semantics explicit |
| CODAL-DEC-071 | ACEITA | CartRepository may remove Cart state because Cart is temporary purchase intent | Allow disposal of abandoned or completed temporary cart state |
| CODAL-DEC-072 | ACEITA | OrderRepository does not expose delete | Preserve transaction history as durable domain data |
| CODAL-DEC-073 | ACEITA | Repository Contracts never expose provider-specific query or storage types | Prevent Infrastructure details from leaking into Domain or Application |
| CODAL-DEC-074 | ACEITA | Seed Foundation belongs to Infrastructure and creates records through Domain factories | Preserve Domain invariants while keeping baseline data outside Domain |
| CODAL-DEC-075 | ACEITA | The VELORA seed baseline is deterministic and immutable | Enable predictable demo reset and reproducible repository initialization |
| CODAL-DEC-076 | ACEITA | Initial catalog brands, products and commercial data are entirely fictional | Preserve portfolio freedom without implying a real commercial operation |
| CODAL-DEC-077 | ACEITA | Seed ids, slugs and SKUs are explicit and stable rather than generated at runtime | Keep references deterministic across resets, tests and future migrations |
| CODAL-DEC-078 | ACEITA | Every seeded ProductVariant has exactly one Inventory baseline record | Maintain one clear stock state per sellable unit |
| CODAL-DEC-079 | ACEITA | Every seeded Inventory begins with one ENTRY InventoryMovement matching initial quantityOnHand | Keep initial stock state and movement history coherent |
| CODAL-DEC-080 | ACEITA | Seed ProductMedia uses logical local asset paths before final visual assets exist | Allow data architecture and Storefront development to progress independently from final imagery |
| CODAL-DEC-081 | ACEITA | Immutable baseline seed excludes Cart and Order state | Keep mutable session and transaction state outside resettable catalog baseline |
| CODAL-DEC-082 | ACEITA | PASSO 20 local repositories are Infrastructure adapters implementing existing Domain Repository Contracts | Make the current architecture executable without coupling Domain to storage |
| CODAL-DEC-083 | ACEITA | Local repository working state initializes from the immutable VELORA seed but never mutates the seed | Preserve deterministic reset and baseline integrity |
| CODAL-DEC-084 | ACEITA | PASSO 20 repositories are intentionally in-memory and volatile across reloads | Unblock Application development before IndexedDB without pretending persistence already exists |
| CODAL-DEC-085 | ACEITA | Local repository list methods return frozen snapshot arrays | Prevent external callers from mutating repository collection state |
| CODAL-DEC-086 | ACEITA | Local state repositories use upsert-by-id save semantics while InventoryMovement preserves append order | Keep storage behavior predictable and aligned with existing contracts |
| CODAL-DEC-087 | ACEITA | Cart and Order repositories initialize empty instead of being seeded with transaction state | Preserve the boundary between immutable baseline data and runtime commerce state |
| CODAL-DEC-088 | ACEITA | Each createLocalRepositories call returns an isolated repository bundle | Make reset and test isolation deterministic |
| CODAL-DEC-089 | ACEITA | Infrastructure repositories do not introduce new business rules beyond storage contract semantics | Keep business invariants in Domain and orchestration in Application |
| CODAL-DEC-090 | ACEITA | Application Use Cases depend on Domain Repository Contracts and Domain services, never concrete Infrastructure adapters | Preserve dependency inversion and future provider replacement |
| CODAL-DEC-091 | ACEITA | Storefront queries expose only ACTIVE Products and ACTIVE ProductVariants while aggregating ProductMedia and Inventory | Keep public commerce reads sale-ready without moving presentation concerns into Domain |
| CODAL-DEC-092 | ACEITA | Storefront Product ordering is featured-first and then alphabetical by Product name | Provide deterministic public ordering before UI-specific merchandising exists |
| CODAL-DEC-093 | ACEITA | Repeated add-to-cart for the same ProductVariant merges quantity into the existing CartItem | Match expected commerce behavior while preserving one line per ProductVariant |
| CODAL-DEC-094 | ACEITA | Cart Application Use Cases validate Inventory availability but do not mutate Inventory | Keep purchase intent separate from stock state until an explicit stock-changing workflow |
| CODAL-DEC-095 | ACEITA | Application orchestration errors use ApplicationError while Domain invariant failures remain DomainValidationError | Separate orchestration failure semantics from Domain validation semantics |
| CODAL-DEC-096 | ACEITA | Inventory adjustment orchestration persists the validated Inventory state and appends its InventoryMovement history | Keep current stock and movement history synchronized through Domain rules |
| CODAL-DEC-097 | ACEITA | Order status orchestration must load through OrderRepository, apply the Domain transition graph and save the new Order | Prevent Application from bypassing Order lifecycle invariants |
| CODAL-DEC-098 | ACEITA | Infrastructure defines PersistenceProvider below Repository implementations for storage-level operations | Keep storage mechanics separate from Domain Repository Contracts |
| CODAL-DEC-099 | ACEITA | Browser persistence uses native IndexedDB through IndexedDbProvider without adding an external IndexedDB dependency | Keep the BUILD 01 dependency surface small while providing real browser persistence |
| CODAL-DEC-100 | ACEITA | Persisted records are rehydrated through Domain factories before being returned as Domain entities | Restore validation, normalization and immutability after structured persistence |
| CODAL-DEC-101 | ACEITA | Persistent Catalog and Inventory repositories use immutable veloraSeed as fallback plus persisted override records | Preserve deterministic baseline and allow admin/demo mutation without rewriting seed |
| CODAL-DEC-102 | ACEITA | Persistent Cart and Order repositories have no seed fallback | Keep runtime commerce state separate from immutable portfolio baseline |
| CODAL-DEC-103 | ACEITA | Persistent InventoryMovement history combines seed baseline movements with append-only persisted movements | Preserve initial stock history while allowing durable subsequent movement history |
| CODAL-DEC-104 | ACEITA | Repository bundles recreated with the same PersistenceProvider observe the same persisted override state | Make provider lifetime the persistence boundary rather than repository object lifetime |
| CODAL-DEC-105 | ACEITA | resetPersistentOverrides clears persistent stores and restores seed-backed repositories to baseline while clearing Cart and Order | Provide deterministic demo reset semantics |
| CODAL-DEC-106 | ACEITA | createBrowserRepositories selects IndexedDbProvider only at Infrastructure composition while Application remains unchanged | Preserve dependency inversion across in-memory and persistent modes |
| CODAL-DEC-107 | ACEITA | IndexedDB is treated as browser-only and unavailable runtimes fail explicitly instead of silently changing storage behavior | Keep SSR and browser persistence semantics truthful |
| CODAL-DEC-108 | ACEITA | createVeloraApplication binds Repository Contracts into one stable Application facade for UI consumption | Reduce repeated dependency wiring while preserving Application independence from Infrastructure |
| CODAL-DEC-109 | ACEITA | Concrete provider and repository selection belongs to an Infrastructure composition root | Keep browser persistence decisions outside Domain, Application and UI components |
| CODAL-DEC-110 | ACEITA | Vitest project scripts execute tests only from src | Prevent backups and generated local artifacts from being discovered as project test suites |
| CODAL-DEC-111 | ACEITA | BUILD 01 closure requires a successful npm ci before the final complete quality gate | Prove package manifest and lockfile reproducibility from a clean dependency install |
| CODAL-DEC-112 | ACEITA | createBrowserVeloraRuntime selects IndexedDbProvider while createVeloraRuntime remains provider-injectable | Support browser production composition and deterministic test composition with the same Application surface |
| CODAL-DEC-113 | ACEITA | Automated architecture tests protect Domain and Application dependency direction | Turn core CODAL architecture rules into executable regression evidence |
| CODAL-DEC-114 | ACEITA | BUILD 02 UI should consume the Application facade and must not access persistence providers directly | Preserve the validated BUILD 01 architecture when visual development begins |
| CODAL-DEC-115 | ACEITA | BUILD 01 Foundation is officially closed after clean install, architecture integration, full tests and production build pass | Authorize transition to BUILD 02 Storefront and Design System |
| CODAL-DEC-116 | ACEITA | BUILD 02 visual foundation is named Pearl Technology and is implemented through reusable CSS Design Tokens | Give the Storefront a stable visual language before multiplying pages and components |
| CODAL-DEC-117 | ACEITA | SSG Storefront rendering uses createStaticVeloraRuntime while browser persistence remains a separate composition | Prevent IndexedDB from leaking into static/server rendering while preserving one Application facade |
| CODAL-DEC-118 | ACEITA | First Storefront Product cards must consume commercial data from Application output instead of hardcoded Product records | Make the visible portfolio experience prove the BUILD 01 architecture |
| CODAL-DEC-119 | ACEITA | Storefront copy is centralized for PT-BR, EN and ES from the first visual shell | Preserve i18n parity while UI complexity grows |
| CODAL-DEC-120 | ACEITA | PASSO 24 uses CSS-generated conceptual Product art until final local visual assets are intentionally produced | Avoid broken remote assets and keep visual progress independent from final imagery |
| CODAL-DEC-121 | ACEITA | Price and stock display labels are Presentation responsibilities derived from Domain/Application data | Keep formatting and merchandising language outside Domain |
| CODAL-DEC-122 | ACEITA | Decorative Storefront motion must honor prefers-reduced-motion and use transform-based animation | Protect accessibility and performance as visual identity grows |
| CODAL-DEC-123 | ACEITA | Champagne/gold is a restrained accent rather than the dominant Storefront surface | Preserve premium contrast without turning the interface into decorative excess |
| CODAL-DEC-124 | ACEITA | Product discovery operates on Presentation models already delivered by SSG and does not access repositories from the client component | Keep browser interaction decoupled from Infrastructure |
| CODAL-DEC-125 | ACEITA | Search and category filtering remain Presentation-only for the current small catalog | Avoid expanding Domain and Repository Contracts without a scale-driven requirement |
| CODAL-DEC-126 | ACEITA | Product discovery search is case-insensitive and accent-normalized across Product name, brand and localized category label | Improve user discovery without redefining canonical Domain data |
| CODAL-DEC-127 | ACEITA | Product cards navigate through canonical locale-safe routes `/{locale}/products/{slug}` | Preserve i18n context and stable public Product identity |
| CODAL-DEC-128 | ACEITA | Product detail pages are statically generated and load Product data through VeloraApplication.getStorefrontProductBySlug | Make detail pages prove Application integration without direct seed access |
| CODAL-DEC-129 | ACEITA | Product detail locale switching preserves the current Product slug | Maintain equivalent user journey across PT-BR, EN and ES |
| CODAL-DEC-130 | ACEITA | Product detail displays variant price and Inventory state but does not mutate or reserve stock | Keep BUILD 02 informational and preserve stock mutation boundaries |
| CODAL-DEC-131 | ACEITA | Add-to-cart UI interaction remains deferred to BUILD 03 Commerce Interaction | Preserve the approved phase plan while BUILD 02 focuses on Storefront discovery and presentation |
| CODAL-DEC-132 | ACEITA | Storefront category cards navigate to canonical `/{locale}/categories/{category}` routes | Turn visual categories into explicit, shareable discovery journeys |
| CODAL-DEC-133 | ACEITA | Public category route keys are Presentation identifiers `smartphone`, `audio`, `power`, and `protection` rather than raw Domain category ids | Keep public URLs readable without changing Domain identity |
| CODAL-DEC-134 | ACEITA | Category pages are statically generated from VeloraApplication Storefront data and filtered in Presentation | Preserve SSG performance and avoid unnecessary Repository Contract growth |
| CODAL-DEC-135 | ACEITA | Category pages preserve the current category across locale switching | Maintain equivalent i18n journeys beyond the home page |
| CODAL-DEC-136 | ACEITA | StorefrontProductVisual preserves canonical ProductMedia metadata while exposing a separate local fallback asset | Separate canonical media data from temporary portfolio rendering strategy |
| CODAL-DEC-137 | ACEITA | PASSO 26 local Product visual fallbacks are versioned SVG assets under `/public/images/velora` with no remote dependency | Guarantee reliable local rendering and fast iteration |
| CODAL-DEC-138 | ACEITA | Seeded ProductMedia paths remain immutable and are not rewritten to match temporary fallback assets | Preserve deterministic seed history and future media migration |
| CODAL-DEC-139 | ACEITA | ProductVisual is the shared Presentation primitive for category, Product card, and Product detail visuals | Centralize future media replacement and prevent duplicated rendering logic |
| CODAL-DEC-140 | ACEITA | Major Storefront routes expose keyboard skip links to their primary content sections | Reduce repeated keyboard traversal through sticky navigation |
| CODAL-DEC-141 | ACEITA | Pearl Technology defines a global visible focus-visible treatment | Make keyboard focus consistent with the Design System |
| CODAL-DEC-142 | ACEITA | Accessibility-only navigation labels are localized through a dedicated Storefront accessibility copy module | Preserve equivalent semantics across PT-BR, EN and ES without mixing Domain data |
| CODAL-DEC-143 | ACEITA | StorefrontSeoModel owns canonical path and language alternate generation for home, category and Product journeys | Prevent route-specific SEO metadata drift |
| CODAL-DEC-144 | ACEITA | SEO language alternates include PT-BR, EN, ES and x-default while preserving the current route suffix | Represent the existing internationalized journey explicitly |
| CODAL-DEC-145 | ACEITA | Product Offer structured data is not emitted while VELORA remains a fictional portfolio store without real payment | Avoid misleading commercial search claims |
| CODAL-DEC-146 | ACEITA | Pearl Technology supports prefers-contrast: more by strengthening border tokens without redesigning layout | Improve accessibility while preserving the visual identity |
| CODAL-DEC-147 | ACEITA | VELORA desktop Storefront navigation uses a fixed conventional vertical rail; tablet/mobile use a sticky top header | Restore the approved navigation requirement before BUILD 02 closure |
| CODAL-DEC-148 | ACEITA | Desktop rail width is 15.5rem and primary page content is offset by the same amount | Keep navigation persistent without overlapping Storefront content |
| CODAL-DEC-149 | ACEITA | Page-level horizontal viewport overflow is blocked; horizontal scrolling is allowed only inside intentional local controls such as mobile category filters | Prevent accidental mobile overflow while preserving useful compact interactions |
| CODAL-DEC-150 | ACEITA | Compact locale controls use a minimum 2.75rem interaction target | Improve touch usability without visually enlarging desktop navigation |
| CODAL-DEC-151 | ACEITA | Storefront, category and Product layouts use min-width and text-wrapping hardening around grid and long-content boundaries | Protect responsive layouts from future catalog content variation |
| CODAL-DEC-152 | ACEITA | BUILD 02 closure requires dedicated responsive-contract and readiness tests in addition to the existing full quality gate | Make visual architecture requirements continuously verifiable |
| CODAL-DEC-153 | ACEITA | BUILD 03 commerce interaction must preserve the established Home, Category and Product public route identities | Allow commerce behavior to evolve without destabilizing Storefront navigation and SEO |
| CODAL-DEC-154 | ACEITA | BUILD 02 Storefront and Design System is officially closed only after vertical-navigation restoration, responsive hardening, 297 passing tests and production build validation | Create an explicit quality-first boundary before Commerce Interaction begins |
| CODAL-DEC-155 | ACEITA | Browser commerce composition is selected lazily through createBrowserVeloraRuntime from a client-safe Feature adapter | Keep IndexedDB and concrete providers outside React components and server rendering |
| CODAL-DEC-156 | ACEITA | The persistent demo Cart uses the stable id `velora-demo-cart` | Allow reload and route navigation to address one deterministic browser Cart |
| CODAL-DEC-157 | ACEITA | Add-to-cart generates deterministic Cart item ids as `cart-item-{productVariantId}` | Align repeated Variant additions with the existing Cart merge behavior |
| CODAL-DEC-158 | ACEITA | Cart indicator count is the sum of Cart item quantities rather than the number of distinct lines | Represent the quantity users perceive as items in the Cart |
| CODAL-DEC-159 | ACEITA | Same-document Cart UI synchronization uses the `velora:cart-changed` browser event while IndexedDB remains the persistence source of truth | Refresh independent client islands without creating a second persistence system |
| CODAL-DEC-160 | ACEITA | Product detail is the first BUILD 03 surface allowed to mutate Cart state | Introduce commerce interaction at the point of explicit Variant choice |
| CODAL-DEC-161 | ACEITA | Add-to-cart may validate Inventory availability but never decrement, reserve or append Inventory movements | Preserve Inventory mutation boundaries until order/checkout semantics require them |
| CODAL-DEC-162 | ACEITA | PASSO 29 exposes Cart indicators across Home, Category and Product journeys but defers full Cart review and quantity management to PASSO 30 | Activate persistent commerce state without overloading the first BUILD 03 unit |
| CODAL-DEC-163 | ACEITA | CartIndicator is the global trigger for one accessible Cart Drawer surface across Storefront journeys | Keep Cart review consistent without introducing route-specific Cart implementations |
| CODAL-DEC-164 | ACEITA | CartExperienceSnapshot exposes review lines enriched with Product name and SKU from Application Storefront data | Keep display metadata outside mutable Cart Domain while avoiding UI repository access |
| CODAL-DEC-165 | ACEITA | Cart quantity update and removal are exposed only through CartExperience before reaching VeloraApplication | Prevent React components from duplicating Application orchestration |
| CODAL-DEC-166 | ACEITA | Quantity decrement stops at one and explicit removal remains a separate destructive action | Make Cart intent clear and avoid accidental deletion through the decrement control |
| CODAL-DEC-167 | ACEITA | Cart Drawer subtotal is derived from Application Cart summary and line totals are derived from immutable Cart unit price times quantity | Keep commercial display consistent with Cart Domain pricing |
| CODAL-DEC-168 | ACEITA | Cart Drawer uses modal dialog semantics, Escape close, backdrop close, focus entry and temporary body scroll lock | Make persistent Cart review usable with keyboard and compact viewports |
| CODAL-DEC-169 | ACEITA | Cart quantity and removal mutations continue to leave Inventory unchanged | Preserve the no-reservation rule until checkout/order semantics explicitly require stock mutation |
| CODAL-DEC-170 | ACEITA | PASSO 30 completes persistent Cart review but defers checkout and payment behavior to the next verifiable BUILD 03 unit | Keep Commerce Interaction incremental and auditable |
| CODAL-DEC-171 | ACEITA | Cart Drawer exposes checkout only when the persistent Cart contains at least one line and routes to `/{locale}/checkout` | Prevent empty checkout entry while preserving locale context |
| CODAL-DEC-172 | ACEITA | Checkout is a statically generated locale route whose Cart data hydrates only in the browser through Browser Cart Experience | Preserve SSG while respecting IndexedDB browser-only boundaries |
| CODAL-DEC-173 | ACEITA | Checkout Cart readiness is validated by a pure Feature validator before form progression | Separate checkout orchestration checks from React rendering and Domain invariants |
| CODAL-DEC-174 | ACEITA | Checkout contact and delivery validation is implemented as a pure Feature model without adding a new form dependency | Keep the first checkout unit small, testable and dependency-neutral |
| CODAL-DEC-175 | ACEITA | Checkout form values remain ephemeral React state and are not persisted or transmitted in PASSO 31 | Avoid storing conceptual personal data without a real business destination |
| CODAL-DEC-176 | ACEITA | PASSO 31 explicitly states that no payment, charge or real order occurs | Keep the portfolio experience persuasive without false commercial claims |
| CODAL-DEC-177 | ACEITA | A valid PASSO 31 submission produces only local confirmation and does not clear Cart | Avoid implying successful commerce before Order persistence exists |
| CODAL-DEC-178 | ACEITA | PASSO 31 checkout does not mutate Inventory | Preserve stock mutation boundaries until an explicit Order/checkout rule is added |
| CODAL-DEC-179 | ACEITA | Order creation is deferred to PASSO 32 so OrderItem snapshots and Cart completion can be implemented as one auditable unit | Keep checkout validation separate from persisted Order semantics |
| CODAL-DEC-180 | ACEITA | Demo Order creation is an Application use case exposed through VeloraApplication rather than implemented in Checkout React code | Preserve Application orchestration and keep UI independent from repositories |
| CODAL-DEC-181 | ACEITA | createDemoOrderFromCart creates guest Orders with initial status PENDING | Represent an honest order lifecycle without inventing payment/customer authentication state |
| CODAL-DEC-182 | ACEITA | OrderItem snapshots Product name, SKU, Cart unit price and quantity at demo Order creation | Preserve historical commercial meaning independently from later catalog changes |
| CODAL-DEC-183 | ACEITA | Order is persisted before the completed Cart is removed | Avoid losing purchase intent before a historical Order exists |
| CODAL-DEC-184 | ACEITA | Existing demo Order identity raises APPLICATION_ORDER_ID_CONFLICT and does not clear the active Cart | Prevent accidental overwrite and destructive retry behavior |
| CODAL-DEC-185 | ACEITA | Browser checkout uses completeBrowserDemoOrder and never imports persistence providers directly | Keep client commerce composition behind the established Infrastructure root |
| CODAL-DEC-186 | ACEITA | Checkout personal form values remain ephemeral and are not copied into guest Order in PASSO 32 | Avoid silently persisting conceptual personal data |
| CODAL-DEC-187 | ACEITA | Demo Order confirmation exposes an Order reference and PENDING status but never a fake transaction or payment id | Maintain transparent portfolio semantics |
| CODAL-DEC-188 | ACEITA | Demo Order creation and Cart completion do not mutate or reserve Inventory | Keep stock changes separate until an explicit inventory/order policy is introduced |
| CODAL-DEC-189 | ACEITA | OrderRepository exposes list in addition to customer-scoped listing so guest demo Orders can be reviewed without inventing Customer identity | Support guest history through the existing repository source of truth |
| CODAL-DEC-190 | ACEITA | VeloraApplication exposes listDemoOrders and filters records without CustomerId | Keep guest-history orchestration in Application rather than React or Infrastructure |
| CODAL-DEC-191 | ACEITA | Demo Order history derives subtotal from immutable OrderItem snapshots through Domain calculateOrderSubtotal | Preserve historical commercial meaning instead of re-reading current Product prices |
| CODAL-DEC-192 | ACEITA | Demo Order history is exposed at `/{locale}/orders` and its browser-local records are marked noindex | Provide a review journey without indexing client-specific demo state |
| CODAL-DEC-193 | ACEITA | Cart Drawer and successful Checkout confirmation both link to demo Order history | Keep persisted Orders discoverable after Cart completion and later navigation |
| CODAL-DEC-194 | ACEITA | Demo reset is a two-step destructive UI action that delegates to the existing VeloraRuntime.resetDemo operation | Avoid accidental reset and avoid creating a second persistence/reset mechanism |
| CODAL-DEC-195 | ACEITA | Demo reset restores all local persistent overrides, not only Cart and Orders | Return the complete conceptual environment to its deterministic seed baseline |
| CODAL-DEC-196 | ACEITA | Checkout and demo Order history routes are noindex because their meaningful content depends on browser-local commerce state | Keep search metadata aligned with public discoverable content |
| CODAL-DEC-197 | ACEITA | BUILD 03 closure preserves the rule that Cart, Checkout and demo Order completion never mutate Inventory | Keep stock reservation/decrement as an explicit future policy |
| CODAL-DEC-198 | ACEITA | BUILD 03 Commerce Interaction is officially closed after persistent Cart, transparent Checkout, demo Order completion, Order history, reset flow, 422 passing tests and production build validation | Create an explicit quality boundary before role/session and application-data experiences begin |
| CODAL-DEC-199 | ACEITA | GUEST, CUSTOMER and ADMIN are demo interface experience roles rather than real authentication identities | Preserve portfolio realism without false security semantics |
| CODAL-DEC-200 | ACEITA | GUEST is the default server and browser fallback role | Keep public Storefront behavior stable before any role is selected |
| CODAL-DEC-201 | ACEITA | Small demo session role state is persisted through a dedicated Feature-layer localStorage adapter under `velora.demo.session.v1` | Keep UI/session state separate from IndexedDB Domain persistence |
| CODAL-DEC-202 | ACEITA | Demo login offers credential-free quick entry for Customer and Admin plus Guest continuation | Optimize portfolio exploration while explicitly avoiding fake credential flows |
| CODAL-DEC-203 | ACEITA | Login, Account and Admin demo routes are localized and noindex | Keep browser-role workspaces available without treating them as public search content |
| CODAL-DEC-204 | ACEITA | Role-aware shared UI uses useSyncExternalStore over a same-document custom event plus browser storage events | Synchronize role state without adding a second global state dependency |
| CODAL-DEC-205 | ACEITA | SessionIndicator is composed into the existing CartIndicator cluster so role context follows current Storefront journeys | Make selected experience mode globally visible with minimal navigation disruption |
| CODAL-DEC-206 | ACEITA | Customer and Admin workspace checks are experience gates only and must not be presented as authorization or security boundaries | Prevent misleading security claims in a local conceptual portfolio |
| CODAL-DEC-207 | ACEITA | PASSO 34 establishes Customer/Admin entry foundations but defers Customer data and Admin Catalog/Inventory controls to later BUILD 04 units | Keep role/session activation small and verifiable |
| CODAL-DEC-208 | ACEITA | BUILD 04 Application and Data Experience opens only after role/session routes, global role awareness, 462 passing tests and production build validation | Preserve quality-first phase transition |
| CODAL-DEC-209 | ACEITA | ADMIN demo role adds discreet contextual controls to Product discovery and Product detail without replacing the customer-facing Storefront | Make the Admin role modify the global experience while preserving one shared Storefront |
| CODAL-DEC-210 | ACEITA | StorefrontProductCard exposes numeric stockUnits in addition to localized stockLabel | Allow role-aware operational UI to use Inventory values without parsing Presentation strings |
| CODAL-DEC-211 | ACEITA | Admin contextual Product controls are navigation/read-only in PASSO 35 | Introduce operational context before activating mutation workflows |
| CODAL-DEC-212 | ACEITA | Admin Catalog Dashboard reads browser-persistent data through createBrowserVeloraRuntime and VeloraApplication.listStorefrontProducts | Preserve UI to Application to Repository boundaries |
| CODAL-DEC-213 | ACEITA | Admin React components never import concrete repositories or IndexedDbProvider | Keep persistence selection inside Infrastructure composition |
| CODAL-DEC-214 | ACEITA | Admin Catalog read model exposes Product identity, Variant SKU, price and quantityOnHand | Provide operational visibility required by the portfolio without duplicating Domain entities in React |
| CODAL-DEC-215 | ACEITA | Admin low-stock state at quantity less than or equal to five is Presentation guidance rather than a Domain Inventory invariant | Keep merchandising attention separate from stock validity rules |
| CODAL-DEC-216 | ACEITA | PASSO 35 Admin Dashboard is scoped to the active Storefront catalog returned by the current Application query | Keep the first operational read model aligned with what visitors can currently browse |
| CODAL-DEC-217 | ACEITA | Product, price and Inventory mutations remain deferred until explicit Admin mutation use cases are implemented | Prevent hidden writes and keep every administrative mutation auditable |
| CODAL-DEC-218 | ACEITA | PASSO 35 is complete only after ADMIN context, Catalog/Inventory visibility, 494 passing tests and production build validation | Preserve quality-first BUILD 04 progression |
| CODAL-DEC-219 | ACEITA | Product name, brand, model and featured state are mutable through explicit Application Admin use cases while id, slug, category and status are preserved | Allow meaningful Catalog editing without silently changing routing or lifecycle identity |
| CODAL-DEC-220 | ACEITA | Variant price mutation recreates Money from validated minor units and preserves the Variant currency, SKU, status and attributes | Keep price editing aligned with Domain Money and Variant identity |
| CODAL-DEC-221 | ACEITA | Product and Variant price writes persist through ProductRepository and ProductVariantRepository contracts | Maintain provider-agnostic persistence and IndexedDB replaceability |
| CODAL-DEC-222 | ACEITA | Admin Product details and each Variant price require explicit review/confirmation before mutation | Make meaningful administrative writes intentional and auditable |
| CODAL-DEC-223 | ACEITA | Decimal Admin price input is parsed in Feature code and Domain Money remains the final invariant boundary | Separate human-friendly form parsing from monetary Domain representation |
| CODAL-DEC-224 | ACEITA | Browser Admin mutation adapters call VeloraApplication and emit `velora:catalog-changed` only after successful persistence | Keep React free of persistence logic and provide deterministic refresh signaling |
| CODAL-DEC-225 | ACEITA | Public Product Discovery keeps SSG initial data then hydrates browser-persistent Catalog overrides through VeloraApplication | Preserve fast static rendering while making local Admin edits visible in the demo Storefront |
| CODAL-DEC-226 | ACEITA | Product/price mutation never changes Inventory or InventoryMovement | Keep Catalog commercial data and stock operations independently auditable |
| CODAL-DEC-227 | ACEITA | Existing resetDemo is the rollback mechanism for persistent Catalog overrides | Avoid introducing a second reset or seed restoration path |
| CODAL-DEC-228 | ACEITA | PASSO 36 is complete only after persistent Product/price edits, Storefront browser refresh, 542 passing tests and production build validation | Preserve quality-first BUILD 04 mutation progression |
| CODAL-DEC-229 | ACEITA | VeloraApplication exposes InventoryMovement history through listInventoryMovements in addition to existing adjustInventory mutation | Keep movement reads on the same UI to Application to Repository path as stock writes |
| CODAL-DEC-230 | ACEITA | Admin Inventory operations expose ENTRY, EXIT and ADJUSTMENT with human quantity input mapped to signed Domain delta | Keep the UI understandable while preserving existing InventoryMovement sign rules |
| CODAL-DEC-231 | ACEITA | Every Admin stock operation requires a normalized non-empty reason before review | Preserve auditable movement meaning and Domain reason requirements |
| CODAL-DEC-232 | ACEITA | Inventory mutation requires an explicit review/confirmation state before adjustInventory is called | Prevent accidental stock writes in the demo Admin experience |
| CODAL-DEC-233 | ACEITA | InventoryMovement history is presented by repository append order and no movement date is invented because the current Domain entity has no timestamp | Keep operational history honest to available data |
| CODAL-DEC-234 | ACEITA | Admin Catalog Variant read models expose Inventory identity separately from SKU and Variant identity | Allow stock operations without deriving persistence identifiers from Presentation text |
| CODAL-DEC-235 | ACEITA | Successful Inventory mutation emits `velora:inventory-changed` and Product Discovery subscribes to combined Storefront Catalog/Inventory change signals | Make persistent stock overrides visible while preserving SSG initial rendering |
| CODAL-DEC-236 | ACEITA | Inventory operations do not mutate Cart, Order, Product identity or Variant price | Keep stock administration independently auditable |
| CODAL-DEC-237 | ACEITA | Negative resulting stock remains rejected by existing Domain applyInventoryMovement rules rather than duplicated in React | Preserve one source of truth for Inventory validity |
| CODAL-DEC-238 | ACEITA | PASSO 37 is complete only after persistent stock adjustment, movement history, Storefront refresh, 594 passing tests and production build validation | Preserve quality-first BUILD 04 progression |
| CODAL-DEC-239 | ACEITA | PASSO 38 Demo Customer Profile is browser-local Feature experience state rather than a canonical Domain Customer or authentication identity | Provide a useful portfolio Account without making unsupported identity/security claims |
| CODAL-DEC-240 | ACEITA | Demo Customer Profile persists behind a Feature adapter at `velora.demo.customer-profile.v1` and React never accesses localStorage directly | Preserve replaceability and UI boundary discipline for small browser experience state |
| CODAL-DEC-241 | ACEITA | The default Customer Profile uses explicitly fictional values and an `example.com` email | Avoid suggesting a real person or production account exists |
| CODAL-DEC-242 | ACEITA | Profile fullName, email, phone and city are normalized and validated before local persistence | Keep saved demo data coherent without creating premature Domain Customer rules |
| CODAL-DEC-243 | ACEITA | The existing CUSTOMER role gate remains the Account experience gate and is not described as a security boundary | Preserve the transparent demo authentication model introduced in PASSO 34 |
| CODAL-DEC-244 | ACEITA | Customer Account displays existing browser-local guest demo Orders and explicitly states they are not linked to a verified Customer identity | Add Customer Order visibility without silently changing Order ownership semantics |
| CODAL-DEC-245 | ACEITA | PASSO 38 does not assign Order customerId from Demo Customer Profile or alter checkout completion | Prevent Feature Profile data from becoming canonical Order identity by side effect |
| CODAL-DEC-246 | ACEITA | Global browser demo reset clears Demo Customer Profile in addition to existing persistent demo overrides while preserving the selected demo role | Keep reset semantics complete without unexpectedly changing the current experience role |
| CODAL-DEC-247 | ACEITA | Customer Account Profile and Order presentation reuse existing localized Storefront money/order models rather than duplicate commercial calculations | Keep one source of truth for monetary presentation and Order history summaries |
| CODAL-DEC-248 | ACEITA | PASSO 38 is complete only after saved Profile, Customer Account Order visibility, zero-warning lint, 638 passing tests and production build validation | Preserve quality-first BUILD 04 progression |
| CODAL-DEC-249 | ACEITA | VeloraApplication exposes `listAdminOrders` using OrderRepository.list so ADMIN operations can read guest and future Customer Orders through the Application boundary | Keep Admin Order visibility complete and provider-agnostic |
| CODAL-DEC-250 | ACEITA | Order Domain service exposes an immutable `getAllowedOrderStatusTransitions` query while `transitionOrderStatus` remains the mutation authority | Let Presentation render valid next actions without duplicating lifecycle rules in React |
| CODAL-DEC-251 | ACEITA | Admin Order status mutation reuses existing `changeOrderStatus` and persists through OrderRepository | Preserve the established Domain -> Application -> Repository path |
| CODAL-DEC-252 | ACEITA | Every Admin status change requires selection, review and explicit confirmation before persistence | Prevent accidental operational transitions |
| CODAL-DEC-253 | ACEITA | DELIVERED and CANCELLED remain terminal in Admin UI because the Domain exposes no next statuses | Keep UI behavior aligned with terminal Domain states |
| CODAL-DEC-254 | ACEITA | Admin Order filtering is Presentation-only and does not alter repository order or persisted Order data | Keep operational filtering reversible and side-effect free |
| CODAL-DEC-255 | ACEITA | Order status mutation does not mutate Inventory, Cart, commercial snapshots or payment state | Keep lifecycle administration independent from stock, commerce and payment semantics |
| CODAL-DEC-256 | ACEITA | Admin Order UI distinguishes guest versus recorded customerId context without claiming verified identity | Preserve transparent demo identity semantics |
| CODAL-DEC-257 | ACEITA | No Order date or chronology is invented because the current Order entity has no timestamp | Keep operational presentation faithful to available Domain data |
| CODAL-DEC-258 | ACEITA | PASSO 39 is complete only after persistent Admin status workflow, zero-warning lint, 690 passing tests and production build validation | Preserve quality-first BUILD 04 progression |
| CODAL-DEC-259 | ACEITA | PASSO 40 Promotion scenarios are browser-local Feature planning state rather than canonical Domain Promotion entities | Enable commercial portfolio interaction without silently affecting checkout or pricing rules |
| CODAL-DEC-260 | ACEITA | Commercial simulation always starts from the currently persisted ProductVariant price loaded through the Admin Catalog read boundary | Keep simulation grounded in the actual local demo catalog state |
| CODAL-DEC-261 | ACEITA | Estimated cost and discount are human simulation inputs parsed in Feature code; money remains represented in integer minor units | Preserve deterministic arithmetic and avoid floating-point commercial persistence |
| CODAL-DEC-262 | ACEITA | Discount percentage is normalized to basis points and limited to greater than zero and at most 95 percent | Keep simulator behavior deterministic and avoid accidental free/negative prices |
| CODAL-DEC-263 | ACEITA | Gross profit and gross margin are explicitly simulations and exclude tax, shipping, payment fees and accounting claims | Keep financial presentation honest to the available data |
| CODAL-DEC-264 | ACEITA | Saved Promotion scenarios use the versioned local key `velora.demo.promotions.v1` behind a Feature adapter; React never accesses localStorage directly | Preserve replaceability and UI boundary discipline |
| CODAL-DEC-265 | ACEITA | Promotion scenario save does not mutate ProductVariant price, Storefront, Cart, checkout, Order or Inventory | Separate commercial planning from active commerce behavior |
| CODAL-DEC-266 | ACEITA | Global demo reset clears Promotion scenarios together with existing persistent demo overrides and Customer Profile | Keep reset semantics complete for browser-local portfolio state |
| CODAL-DEC-267 | ACEITA | Promotion codes are normalized to uppercase and limited to 3-24 alphanumeric/hyphen characters for demo scenario consistency | Keep commercial scenario identifiers readable without implying a real coupon engine |
| CODAL-DEC-268 | ACEITA | PASSO 40 is complete only after simulator, local Promotion scenarios, zero-warning lint, 737 passing tests and production build validation | Preserve quality-first BUILD 04 progression |

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
- CODAL-DEC-269 — Domain independente de React e Next.js;
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
- utilizar o próximo número disponível após CODAL-DEC-198;
- preservar decisões históricas mesmo quando forem superadas.

## Próxima decisão disponível

CODAL-DEC-042
