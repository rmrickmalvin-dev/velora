import type {
  StorefrontLocale,
} from "./storefront-copy";

export type StorefrontOrdersCopy =
  Readonly<{
    historyCta: string;
    eyebrow: string;
    title: string;
    body: string;
    emptyTitle: string;
    emptyBody: string;
    status: string;
    items: string;
    subtotal: string;
    reset: string;
    resetBody: string;
    confirmReset: string;
    cancelReset: string;
    resetComplete: string;
    backToStore: string;
    noPaymentNotice: string;
  }>;

const ordersCopy:
  Record<
    StorefrontLocale,
    StorefrontOrdersCopy
  > = {
    "pt-BR": {
      historyCta:
        "Pedidos demonstrativos",
      eyebrow:
        "Hist\u00f3rico local",
      title:
        "Pedidos da demonstra\u00e7\u00e3o.",
      body:
        "Revise os pedidos demonstrativos salvos neste navegador.",
      emptyTitle:
        "Nenhum pedido demonstrativo ainda.",
      emptyBody:
        "Conclua um checkout demonstrativo para criar o primeiro registro.",
      status:
        "Status",
      items:
        "Itens",
      subtotal:
        "Subtotal",
      reset:
        "Redefinir demonstra\u00e7\u00e3o",
      resetBody:
        "Isso remove pedidos, carrinho e outros overrides locais, restaurando a base inicial da VELORA.",
      confirmReset:
        "Confirmar redefini\u00e7\u00e3o",
      cancelReset:
        "Cancelar",
      resetComplete:
        "Demonstra\u00e7\u00e3o redefinida.",
      backToStore:
        "Voltar para a loja",
      noPaymentNotice:
        "Estes registros s\u00e3o pedidos conceituais locais. Eles n\u00e3o representam pagamentos ou compras reais.",
    },
    en: {
      historyCta:
        "Demo orders",
      eyebrow:
        "Local history",
      title:
        "Demo order history.",
      body:
        "Review demo orders stored in this browser.",
      emptyTitle:
        "No demo orders yet.",
      emptyBody:
        "Complete a demo checkout to create the first record.",
      status:
        "Status",
      items:
        "Items",
      subtotal:
        "Subtotal",
      reset:
        "Reset demo",
      resetBody:
        "This removes orders, cart and other local overrides, restoring the initial VELORA baseline.",
      confirmReset:
        "Confirm reset",
      cancelReset:
        "Cancel",
      resetComplete:
        "Demo reset completed.",
      backToStore:
        "Back to store",
      noPaymentNotice:
        "These are local conceptual order records. They do not represent real payments or purchases.",
    },
    es: {
      historyCta:
        "Pedidos demostrativos",
      eyebrow:
        "Historial local",
      title:
        "Historial de pedidos demo.",
      body:
        "Revisa los pedidos demostrativos guardados en este navegador.",
      emptyTitle:
        "A\u00fan no hay pedidos demostrativos.",
      emptyBody:
        "Completa un checkout demostrativo para crear el primer registro.",
      status:
        "Estado",
      items:
        "Art\u00edculos",
      subtotal:
        "Subtotal",
      reset:
        "Restablecer demostraci\u00f3n",
      resetBody:
        "Esto elimina pedidos, carrito y otros cambios locales, restaurando la base inicial de VELORA.",
      confirmReset:
        "Confirmar restablecimiento",
      cancelReset:
        "Cancelar",
      resetComplete:
        "Demostraci\u00f3n restablecida.",
      backToStore:
        "Volver a la tienda",
      noPaymentNotice:
        "Estos registros son pedidos conceptuales locales. No representan pagos ni compras reales.",
    },
  };

export function getStorefrontOrdersCopy(
  locale:
    StorefrontLocale,
): StorefrontOrdersCopy {
  return ordersCopy[
    locale
  ];
}