import type {
  StorefrontLocale,
} from "./storefront-copy";

export type StorefrontInteractionCopy =
  Readonly<{
    discovery: Readonly<{
      eyebrow: string;
      title: string;
      body: string;
      searchLabel: string;
      searchPlaceholder: string;
      allCategories: string;
      resultSingular: string;
      resultPlural: string;
      emptyTitle: string;
      emptyBody: string;
      viewDetails: string;
    }>;
    detail: Readonly<{
      backToStore: string;
      eyebrow: string;
      variantsTitle: string;
      variantsBody: string;
      sku: string;
      available: string;
      unavailable: string;
      units: string;
      readOnlyNote: string;
      viewVariants: string;
    }>;
  }>;

const interactionCopy:
  Record<
    StorefrontLocale,
    StorefrontInteractionCopy
  > = {
    "pt-BR": {
      discovery: {
        eyebrow:
          "Descoberta de produtos",
        title:
          "Encontre a tecnologia certa.",
        body:
          "Pesquise por produto ou marca e refine a colecao por categoria.",
        searchLabel:
          "Pesquisar produtos",
        searchPlaceholder:
          "Buscar por nome ou marca",
        allCategories:
          "Todos",
        resultSingular:
          "produto encontrado",
        resultPlural:
          "produtos encontrados",
        emptyTitle:
          "Nenhum produto encontrado.",
        emptyBody:
          "Ajuste a busca ou escolha outra categoria.",
        viewDetails:
          "Ver detalhes",
      },
      detail: {
        backToStore:
          "Voltar para a loja",
        eyebrow:
          "Detalhes do produto",
        variantsTitle:
          "Escolha sua versao.",
        variantsBody:
          "Precos e estoque sao derivados das variantes ativas do catalogo VELORA.",
        sku:
          "SKU",
        available:
          "Disponivel",
        unavailable:
          "Indisponivel",
        units:
          "unidades",
        readOnlyNote:
          "A pagina de produto e somente leitura nesta etapa. A interacao de compra entra no BUILD 03.",
        viewVariants:
          "Ver versoes",
      },
    },
    en: {
      discovery: {
        eyebrow:
          "Product discovery",
        title:
          "Find the right technology.",
        body:
          "Search by product or brand and refine the collection by category.",
        searchLabel:
          "Search products",
        searchPlaceholder:
          "Search by name or brand",
        allCategories:
          "All",
        resultSingular:
          "product found",
        resultPlural:
          "products found",
        emptyTitle:
          "No products found.",
        emptyBody:
          "Adjust the search or choose another category.",
        viewDetails:
          "View details",
      },
      detail: {
        backToStore:
          "Back to store",
        eyebrow:
          "Product details",
        variantsTitle:
          "Choose your version.",
        variantsBody:
          "Prices and stock are derived from active VELORA catalog variants.",
        sku:
          "SKU",
        available:
          "Available",
        unavailable:
          "Unavailable",
        units:
          "units",
        readOnlyNote:
          "The Product page is read-only at this stage. Purchase interaction enters in BUILD 03.",
        viewVariants:
          "View versions",
      },
    },
    es: {
      discovery: {
        eyebrow:
          "Descubrimiento de productos",
        title:
          "Encuentra la tecnologia adecuada.",
        body:
          "Busca por producto o marca y filtra la coleccion por categoria.",
        searchLabel:
          "Buscar productos",
        searchPlaceholder:
          "Buscar por nombre o marca",
        allCategories:
          "Todos",
        resultSingular:
          "producto encontrado",
        resultPlural:
          "productos encontrados",
        emptyTitle:
          "No se encontraron productos.",
        emptyBody:
          "Ajusta la busqueda o elige otra categoria.",
        viewDetails:
          "Ver detalles",
      },
      detail: {
        backToStore:
          "Volver a la tienda",
        eyebrow:
          "Detalles del producto",
        variantsTitle:
          "Elige tu version.",
        variantsBody:
          "Los precios y el stock provienen de las variantes activas del catalogo VELORA.",
        sku:
          "SKU",
        available:
          "Disponible",
        unavailable:
          "No disponible",
        units:
          "unidades",
        readOnlyNote:
          "La pagina de producto es de solo lectura en esta etapa. La compra interactiva entra en BUILD 03.",
        viewVariants:
          "Ver versiones",
      },
    },
  };

export function getStorefrontInteractionCopy(
  locale: StorefrontLocale,
): StorefrontInteractionCopy {
  return interactionCopy[locale];
}