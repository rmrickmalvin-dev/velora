export const storefrontLocales = [
  "pt-BR",
  "en",
  "es",
] as const;

export type StorefrontLocale =
  (typeof storefrontLocales)[number];

export type StorefrontCopy =
  Readonly<{
    localeName: string;
    nav: Readonly<{
      featured: string;
      categories: string;
      experience: string;
    }>;
    hero: Readonly<{
      eyebrow: string;
      title: string;
      body: string;
      primaryCta: string;
      secondaryCta: string;
      proof: string;
    }>;
    categories: Readonly<{
      eyebrow: string;
      title: string;
      body: string;
      smartphone: string;
      audio: string;
      power: string;
      protection: string;
    }>;
    featured: Readonly<{
      eyebrow: string;
      title: string;
      body: string;
      badge: string;
      stockAvailable: string;
      stockLow: string;
      from: string;
    }>;
    experience: Readonly<{
      eyebrow: string;
      title: string;
      body: string;
      pointOneTitle: string;
      pointOneBody: string;
      pointTwoTitle: string;
      pointTwoBody: string;
      pointThreeTitle: string;
      pointThreeBody: string;
    }>;
    footer: Readonly<{
      statement: string;
      portfolio: string;
    }>;
    metadata: Readonly<{
      title: string;
      description: string;
    }>;
  }>;

const copies:
  Record<
    StorefrontLocale,
    StorefrontCopy
  > = {
    "pt-BR": {
      localeName:
        "Portugues",
      nav: {
        featured:
          "Destaques",
        categories:
          "Categorias",
        experience:
          "Experi\u00eancia",
      },
      hero: {
        eyebrow:
          "Curadoria mobile premium",
        title:
          "Tecnologia no seu ritmo.",
        body:
          "Smartphones e acess\u00f3rios selecionados para unir desempenho, design e uma experi\u00eancia de compra mais clara.",
        primaryCta:
          "Explorar destaques",
        secondaryCta:
          "Ver categorias",
        proof:
          "Catalogo conceitual VELORA",
      },
      categories: {
        eyebrow:
          "Escolha por universo",
        title:
          "Tudo que acompanha o seu dia.",
        body:
          "Uma vitrine organizada para encontrar tecnologia sem ruido.",
        smartphone:
          "Smartphones",
        audio:
          "Audio",
        power:
          "Energia",
        protection:
          "Protecao",
      },
      featured: {
        eyebrow:
          "Selecao VELORA",
        title:
          "Destaques da colecao.",
        body:
          "Produtos ficticios do case, servidos pela arquitetura real da aplicacao.",
        badge:
          "Destaque",
        stockAvailable:
          "Em estoque",
        stockLow:
          "Ultimas unidades",
        from:
          "A partir de",
      },
      experience: {
        eyebrow:
          "Pearl Technology",
        title:
          "Premium sem excesso.",
        body:
          "A identidade combina superficies peroladas, detalhes champagne e hierarquia limpa para deixar o produto no centro.",
        pointOneTitle:
          "Clareza primeiro",
        pointOneBody:
          "Informacao comercial direta, espaco negativo e leitura rapida.",
        pointTwoTitle:
          "Movimento com funcao",
        pointTwoBody:
          "Transicoes sutis sem competir com produto, acessibilidade ou performance.",
        pointThreeTitle:
          "Pronta para evoluir",
        pointThreeBody:
          "A Storefront nasce sobre Application, Domain e persistencia ja validados.",
      },
      footer: {
        statement:
          "VELORA - Tecnologia no seu ritmo.",
        portfolio:
          "Projeto conceitual para portf\u00f3lio profissional.",
      },
      metadata: {
        title:
          "VELORA | Tecnologia no seu ritmo",
        description:
          "Storefront conceitual premium para smartphones, acess\u00f3rios e tecnologia mobile.",
      },
    },
    en: {
      localeName:
        "English",
      nav: {
        featured:
          "Featured",
        categories:
          "Categories",
        experience:
          "Experience",
      },
      hero: {
        eyebrow:
          "Premium mobile curation",
        title:
          "Technology at your pace.",
        body:
          "Smartphones and accessories selected to combine performance, design and a clearer shopping experience.",
        primaryCta:
          "Explore featured",
        secondaryCta:
          "Browse categories",
        proof:
          "VELORA conceptual catalog",
      },
      categories: {
        eyebrow:
          "Choose your universe",
        title:
          "Everything that moves with your day.",
        body:
          "A focused showcase built to help you find technology without noise.",
        smartphone:
          "Smartphones",
        audio:
          "Audio",
        power:
          "Power",
        protection:
          "Protection",
      },
      featured: {
        eyebrow:
          "VELORA selection",
        title:
          "Collection highlights.",
        body:
          "Fictional case products delivered by the real application architecture.",
        badge:
          "Featured",
        stockAvailable:
          "In stock",
        stockLow:
          "Low stock",
        from:
          "From",
      },
      experience: {
        eyebrow:
          "Pearl Technology",
        title:
          "Premium without excess.",
        body:
          "The identity combines pearl surfaces, champagne accents and clean hierarchy to keep the product at the center.",
        pointOneTitle:
          "Clarity first",
        pointOneBody:
          "Direct commercial information, negative space and fast reading.",
        pointTwoTitle:
          "Motion with purpose",
        pointTwoBody:
          "Subtle transitions that never compete with product, accessibility or performance.",
        pointThreeTitle:
          "Built to evolve",
        pointThreeBody:
          "The Storefront starts on top of already validated Application, Domain and persistence layers.",
      },
      footer: {
        statement:
          "VELORA - Technology at your pace.",
        portfolio:
          "Conceptual project for a professional portfolio.",
      },
      metadata: {
        title:
          "VELORA | Technology at your pace",
        description:
          "Premium conceptual storefront for smartphones, accessories and mobile technology.",
      },
    },
    es: {
      localeName:
        "Espanol",
      nav: {
        featured:
          "Destacados",
        categories:
          "Categorias",
        experience:
          "Experiencia",
      },
      hero: {
        eyebrow:
          "Curaduria mobile premium",
        title:
          "Tecnologia a tu ritmo.",
        body:
          "Smartphones y accesorios seleccionados para unir rendimiento, dise\u00f1o y una experiencia de compra m\u00e1s clara.",
        primaryCta:
          "Explorar destacados",
        secondaryCta:
          "Ver categorias",
        proof:
          "Catalogo conceptual VELORA",
      },
      categories: {
        eyebrow:
          "Elige tu universo",
        title:
          "Todo lo que acompana tu dia.",
        body:
          "Una vitrina organizada para encontrar tecnologia sin ruido.",
        smartphone:
          "Smartphones",
        audio:
          "Audio",
        power:
          "Energia",
        protection:
          "Proteccion",
      },
      featured: {
        eyebrow:
          "Seleccion VELORA",
        title:
          "Destacados de la coleccion.",
        body:
          "Productos ficticios del case servidos por la arquitectura real de la aplicacion.",
        badge:
          "Destacado",
        stockAvailable:
          "En stock",
        stockLow:
          "Ultimas unidades",
        from:
          "Desde",
      },
      experience: {
        eyebrow:
          "Pearl Technology",
        title:
          "Premium sin exceso.",
        body:
          "La identidad combina superficies perladas, detalles champagne y jerarquia limpia para mantener el producto en el centro.",
        pointOneTitle:
          "Claridad primero",
        pointOneBody:
          "Informacion comercial directa, espacio negativo y lectura rapida.",
        pointTwoTitle:
          "Movimiento con funcion",
        pointTwoBody:
          "Transiciones sutiles que no compiten con producto, accesibilidad o rendimiento.",
        pointThreeTitle:
          "Lista para evolucionar",
        pointThreeBody:
          "La Storefront nace sobre Application, Domain y persistencia ya validados.",
      },
      footer: {
        statement:
          "VELORA - Tecnologia a tu ritmo.",
        portfolio:
          "Proyecto conceptual para portafolio profesional.",
      },
      metadata: {
        title:
          "VELORA | Tecnologia a tu ritmo",
        description:
          "Storefront conceptual premium para smartphones, accesorios y tecnologia mobile.",
      },
    },
  };

export function isStorefrontLocale(
  value: string,
): value is StorefrontLocale {
  return storefrontLocales.some(
    (locale) =>
      locale === value,
  );
}

export function getStorefrontCopy(
  locale: StorefrontLocale,
): StorefrontCopy {
  return copies[locale];
}