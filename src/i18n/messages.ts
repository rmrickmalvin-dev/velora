import type { Locale } from "./config";

type FoundationItem = {
  title: string;
  description: string;
};

type FoundationMessages = {
  brand: {
    name: string;
    buildLabel: string;
  };

  navigation: {
    languageSelectorLabel: string;
    homeLabel: string;
  };

  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };

  foundation: {
    title: string;
    items: FoundationItem[];
  };

  footer: {
    projectLabel: string;
  };
};

export const foundationMessages = {
  "pt-BR": {
    brand: {
      name: "VELORA",
      buildLabel: "BUILD 01",
    },

    navigation: {
      languageSelectorLabel: "Selecionar idioma",
      homeLabel: "Velora — página inicial",
    },

    hero: {
      eyebrow: "VELORA · BUILD 01",
      title: "Tecnologia no seu ritmo.",
      description:
        "Uma experiência de tecnologia construída para transformar descoberta, comparação e escolha em uma jornada clara, rápida e sofisticada.",
    },

    foundation: {
      title: "Fundação ativa",
      items: [
        {
          title: "Experiência localizada",
          description:
            "Português, inglês e espanhol fazem parte da arquitetura desde o primeiro build.",
        },
        {
          title: "Arquitetura evolutiva",
          description:
            "A base está sendo preparada para catálogo, autenticação, comércio e administração sem acoplamentos descartáveis.",
        },
        {
          title: "Qualidade desde o início",
          description:
            "Responsividade, acessibilidade, performance e testabilidade entram antes das funcionalidades complexas.",
        },
      ],
    },

    footer: {
      projectLabel: "CODAL OS · BUILD 01",
    },
  },

  en: {
    brand: {
      name: "VELORA",
      buildLabel: "BUILD 01",
    },

    navigation: {
      languageSelectorLabel: "Select language",
      homeLabel: "Velora — home page",
    },

    hero: {
      eyebrow: "VELORA · BUILD 01",
      title: "Technology at your pace.",
      description:
        "A technology experience designed to turn discovery, comparison, and choice into a clear, fast, and sophisticated journey.",
    },

    foundation: {
      title: "Foundation active",
      items: [
        {
          title: "Localized experience",
          description:
            "Portuguese, English, and Spanish are part of the architecture from the very first build.",
        },
        {
          title: "Evolvable architecture",
          description:
            "The foundation is being prepared for catalog, authentication, commerce, and administration without disposable coupling.",
        },
        {
          title: "Quality from the start",
          description:
            "Responsiveness, accessibility, performance, and testability arrive before complex features.",
        },
      ],
    },

    footer: {
      projectLabel: "CODAL OS · BUILD 01",
    },
  },

  es: {
    brand: {
      name: "VELORA",
      buildLabel: "BUILD 01",
    },

    navigation: {
      languageSelectorLabel: "Seleccionar idioma",
      homeLabel: "Velora — página de inicio",
    },

    hero: {
      eyebrow: "VELORA · BUILD 01",
      title: "Tecnología a tu ritmo.",
      description:
        "Una experiencia tecnológica creada para transformar el descubrimiento, la comparación y la elección en un recorrido claro, rápido y sofisticado.",
    },

    foundation: {
      title: "Base activa",
      items: [
        {
          title: "Experiencia localizada",
          description:
            "Portugués, inglés y español forman parte de la arquitectura desde el primer build.",
        },
        {
          title: "Arquitectura evolutiva",
          description:
            "La base se prepara para catálogo, autenticación, comercio y administración sin acoplamientos descartables.",
        },
        {
          title: "Calidad desde el inicio",
          description:
            "Responsividad, accesibilidad, rendimiento y testabilidad llegan antes que las funcionalidades complejas.",
        },
      ],
    },

    footer: {
      projectLabel: "CODAL OS · BUILD 01",
    },
  },
} satisfies Record<Locale, FoundationMessages>;

export function getFoundationMessages(locale: Locale) {
  return foundationMessages[locale];
}