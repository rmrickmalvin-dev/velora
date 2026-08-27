import type {
  OrderStatus,
} from "../domain/types/statuses";
import type {
  StorefrontLocale,
} from "./storefront-copy";

export type StorefrontAdminOrdersCopy =
  Readonly<{
    eyebrow: string;
    title: string;
    body: string;
    noPaymentNotice: string;
    empty: string;
    filterLabel: string;
    allStatuses: string;
    reference: string;
    identity: string;
    guest: string;
    customer: string;
    status: string;
    items: string;
    lines: string;
    subtotal: string;
    nextStatus: string;
    review: string;
    confirm: string;
    cancel: string;
    updated: string;
    updateError: string;
    terminal: string;
    statusLabels:
      Readonly<
        Record<
          OrderStatus,
          string
        >
      >;
  }>;

const copies:
  Record<
    StorefrontLocale,
    StorefrontAdminOrdersCopy
  > = {
    "pt-BR": {
      eyebrow:
        "ADMIN / PEDIDOS",
      title:
        "Opera\u00e7\u00e3o de pedidos.",
      body:
        "Acompanhe os pedidos persistidos nesta demonstra\u00e7\u00e3o e avance somente pelas transi\u00e7\u00f5es permitidas pelo Domain.",
      noPaymentNotice:
        "Os pedidos s\u00e3o conceituais e locais. A mudan\u00e7a de status n\u00e3o representa pagamento, captura financeira ou integra\u00e7\u00e3o log\u00edstica real.",
      empty:
        "Nenhum pedido local foi criado. Conclua um checkout de demonstra\u00e7\u00e3o para alimentar esta \u00e1rea.",
      filterLabel:
        "Filtrar por status",
      allStatuses:
        "Todos",
      reference:
        "Refer\u00eancia",
      identity:
        "Identidade",
      guest:
        "Visitante demo",
      customer:
        "Customer registrado no Order",
      status:
        "Status",
      items:
        "Itens",
      lines:
        "Linhas",
      subtotal:
        "Subtotal",
      nextStatus:
        "Pr\u00f3ximo status",
      review:
        "Revisar mudan\u00e7a",
      confirm:
        "Confirmar status",
      cancel:
        "Cancelar",
      updated:
        "Status do pedido atualizado.",
      updateError:
        "N\u00e3o foi poss\u00edvel atualizar o status.",
      terminal:
        "Fluxo conclu\u00eddo",
      statusLabels: {
        PENDING:
          "Pendente",
        CONFIRMED:
          "Confirmado",
        PREPARING:
          "Em prepara\u00e7\u00e3o",
        SHIPPED:
          "Enviado",
        DELIVERED:
          "Entregue",
        CANCELLED:
          "Cancelado",
      },
    },
    en: {
      eyebrow:
        "ADMIN / ORDERS",
      title:
        "Order operations.",
      body:
        "Review Orders persisted in this demo and advance only through transitions allowed by the Domain.",
      noPaymentNotice:
        "Orders are conceptual and local. A status change does not represent payment capture, financial settlement or a real logistics integration.",
      empty:
        "No local Order exists yet. Complete a demo checkout to populate this area.",
      filterLabel:
        "Filter by status",
      allStatuses:
        "All",
      reference:
        "Reference",
      identity:
        "Identity",
      guest:
        "Demo guest",
      customer:
        "Customer recorded on Order",
      status:
        "Status",
      items:
        "Items",
      lines:
        "Lines",
      subtotal:
        "Subtotal",
      nextStatus:
        "Next status",
      review:
        "Review change",
      confirm:
        "Confirm status",
      cancel:
        "Cancel",
      updated:
        "Order status updated.",
      updateError:
        "The Order status could not be updated.",
      terminal:
        "Workflow complete",
      statusLabels: {
        PENDING:
          "Pending",
        CONFIRMED:
          "Confirmed",
        PREPARING:
          "Preparing",
        SHIPPED:
          "Shipped",
        DELIVERED:
          "Delivered",
        CANCELLED:
          "Cancelled",
      },
    },
    es: {
      eyebrow:
        "ADMIN / PEDIDOS",
      title:
        "Operaci\u00f3n de pedidos.",
      body:
        "Revisa los pedidos persistidos en esta demostraci\u00f3n y avanza solamente por las transiciones permitidas por el Domain.",
      noPaymentNotice:
        "Los pedidos son conceptuales y locales. Un cambio de estado no representa cobro, liquidaci\u00f3n financiera ni integraci\u00f3n log\u00edstica real.",
      empty:
        "Todav\u00eda no existe ning\u00fan pedido local. Completa un checkout de demostraci\u00f3n para alimentar esta \u00e1rea.",
      filterLabel:
        "Filtrar por estado",
      allStatuses:
        "Todos",
      reference:
        "Referencia",
      identity:
        "Identidad",
      guest:
        "Visitante demo",
      customer:
        "Customer registrado en el Order",
      status:
        "Estado",
      items:
        "Art\u00edculos",
      lines:
        "L\u00edneas",
      subtotal:
        "Subtotal",
      nextStatus:
        "Pr\u00f3ximo estado",
      review:
        "Revisar cambio",
      confirm:
        "Confirmar estado",
      cancel:
        "Cancelar",
      updated:
        "Estado del pedido actualizado.",
      updateError:
        "No fue posible actualizar el estado.",
      terminal:
        "Flujo concluido",
      statusLabels: {
        PENDING:
          "Pendiente",
        CONFIRMED:
          "Confirmado",
        PREPARING:
          "En preparaci\u00f3n",
        SHIPPED:
          "Enviado",
        DELIVERED:
          "Entregado",
        CANCELLED:
          "Cancelado",
      },
    },
  };

export function getStorefrontAdminOrdersCopy(
  locale:
    StorefrontLocale,
): StorefrontAdminOrdersCopy {
  return copies[
    locale
  ];
}