import type {
  StorefrontLocale,
} from "./storefront-copy";

export type StorefrontCartCopy =
  Readonly<{
    cartLabel: string;
    emptyCart: string;
    addToCart: string;
    adding: string;
    added: string;
    unavailable: string;
    error: string;
  }>;

const cartCopy:
  Record<
    StorefrontLocale,
    StorefrontCartCopy
  > = {
    "pt-BR": {
      cartLabel:
        "Carrinho",
      emptyCart:
        "Carrinho vazio",
      addToCart:
        "Adicionar ao carrinho",
      adding:
        "Adicionando...",
      added:
        "Adicionado ao carrinho.",
      unavailable:
        "Indisponivel",
      error:
        "Nao foi possivel adicionar.",
    },
    en: {
      cartLabel:
        "Cart",
      emptyCart:
        "Empty cart",
      addToCart:
        "Add to cart",
      adding:
        "Adding...",
      added:
        "Added to cart.",
      unavailable:
        "Unavailable",
      error:
        "Could not add item.",
    },
    es: {
      cartLabel:
        "Carrito",
      emptyCart:
        "Carrito vacio",
      addToCart:
        "Agregar al carrito",
      adding:
        "Agregando...",
      added:
        "Agregado al carrito.",
      unavailable:
        "No disponible",
      error:
        "No fue posible agregar.",
    },
  };

export function getStorefrontCartCopy(
  locale:
    StorefrontLocale,
): StorefrontCartCopy {
  return cartCopy[
    locale
  ];
}