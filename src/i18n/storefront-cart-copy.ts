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
    drawerTitle: string;
    drawerBody: string;
    close: string;
    subtotal: string;
    quantity: string;
    decrease: string;
    increase: string;
    remove: string;
    loading: string;
    itemSingular: string;
    itemPlural: string;
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
      drawerTitle:
        "Seu carrinho",
      drawerBody:
        "Revise os produtos antes de continuar.",
      close:
        "Fechar carrinho",
      subtotal:
        "Subtotal",
      quantity:
        "Quantidade",
      decrease:
        "Diminuir quantidade",
      increase:
        "Aumentar quantidade",
      remove:
        "Remover",
      loading:
        "Carregando carrinho...",
      itemSingular:
        "item",
      itemPlural:
        "itens",
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
      drawerTitle:
        "Your cart",
      drawerBody:
        "Review your products before continuing.",
      close:
        "Close cart",
      subtotal:
        "Subtotal",
      quantity:
        "Quantity",
      decrease:
        "Decrease quantity",
      increase:
        "Increase quantity",
      remove:
        "Remove",
      loading:
        "Loading cart...",
      itemSingular:
        "item",
      itemPlural:
        "items",
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
      drawerTitle:
        "Tu carrito",
      drawerBody:
        "Revisa los productos antes de continuar.",
      close:
        "Cerrar carrito",
      subtotal:
        "Subtotal",
      quantity:
        "Cantidad",
      decrease:
        "Disminuir cantidad",
      increase:
        "Aumentar cantidad",
      remove:
        "Eliminar",
      loading:
        "Cargando carrito...",
      itemSingular:
        "articulo",
      itemPlural:
        "articulos",
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