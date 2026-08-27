import type {
  StorefrontLocale,
} from "./storefront-copy";

export type StorefrontAdminInventoryCopy =
  Readonly<{
    title: string;
    currentStock: string;
    adjustStock: string;
    movementHistory: string;
    movementType: string;
    amount: string;
    reason: string;
    entry: string;
    exit: string;
    adjustment: string;
    review: string;
    confirm: string;
    cancel: string;
    close: string;
    saved: string;
    mutationError: string;
    invalidAmount: string;
    reasonRequired: string;
    reasonTooShort: string;
    reasonTooLong: string;
    noMovements: string;
    delta: string;
    historyNotice: string;
  }>;

const inventoryCopy:
  Record<
    StorefrontLocale,
    StorefrontAdminInventoryCopy
  > = {
    "pt-BR": {
      title:
        "Opera\u00e7\u00e3o de estoque",
      currentStock:
        "Estoque atual",
      adjustStock:
        "Ajustar estoque",
      movementHistory:
        "Hist\u00f3rico de movimentos",
      movementType:
        "Tipo",
      amount:
        "Quantidade",
      reason:
        "Motivo",
      entry:
        "Entrada",
      exit:
        "Sa\u00edda",
      adjustment:
        "Ajuste",
      review:
        "Revisar movimento",
      confirm:
        "Confirmar movimento",
      cancel:
        "Cancelar",
      close:
        "Fechar",
      saved:
        "Movimento salvo e estoque atualizado.",
      mutationError:
        "N\u00e3o foi poss\u00edvel aplicar o movimento. Verifique os valores e o estoque dispon\u00edvel.",
      invalidAmount:
        "Informe uma quantidade inteira diferente de zero.",
      reasonRequired:
        "Informe o motivo do movimento.",
      reasonTooShort:
        "Descreva o motivo com mais detalhes.",
      reasonTooLong:
        "Use at\u00e9 160 caracteres.",
      noMovements:
        "Nenhum movimento encontrado.",
      delta:
        "Delta",
      historyNotice:
        "O hist\u00f3rico preserva a ordem de registro. O Domain atual n\u00e3o possui timestamp de movimento.",
    },
    en: {
      title:
        "Inventory operation",
      currentStock:
        "Current stock",
      adjustStock:
        "Adjust stock",
      movementHistory:
        "Movement history",
      movementType:
        "Type",
      amount:
        "Quantity",
      reason:
        "Reason",
      entry:
        "Entry",
      exit:
        "Exit",
      adjustment:
        "Adjustment",
      review:
        "Review movement",
      confirm:
        "Confirm movement",
      cancel:
        "Cancel",
      close:
        "Close",
      saved:
        "Movement saved and stock updated.",
      mutationError:
        "The movement could not be applied. Check the values and available stock.",
      invalidAmount:
        "Enter a non-zero integer quantity.",
      reasonRequired:
        "Enter a movement reason.",
      reasonTooShort:
        "Describe the reason in more detail.",
      reasonTooLong:
        "Use up to 160 characters.",
      noMovements:
        "No movements found.",
      delta:
        "Delta",
      historyNotice:
        "History preserves append order. The current Domain movement does not contain a timestamp.",
    },
    es: {
      title:
        "Operaci\u00f3n de inventario",
      currentStock:
        "Stock actual",
      adjustStock:
        "Ajustar stock",
      movementHistory:
        "Historial de movimientos",
      movementType:
        "Tipo",
      amount:
        "Cantidad",
      reason:
        "Motivo",
      entry:
        "Entrada",
      exit:
        "Salida",
      adjustment:
        "Ajuste",
      review:
        "Revisar movimiento",
      confirm:
        "Confirmar movimiento",
      cancel:
        "Cancelar",
      close:
        "Cerrar",
      saved:
        "Movimiento guardado y stock actualizado.",
      mutationError:
        "No fue posible aplicar el movimiento. Revisa los valores y el stock disponible.",
      invalidAmount:
        "Ingresa una cantidad entera distinta de cero.",
      reasonRequired:
        "Ingresa el motivo del movimiento.",
      reasonTooShort:
        "Describe el motivo con m\u00e1s detalle.",
      reasonTooLong:
        "Usa hasta 160 caracteres.",
      noMovements:
        "No se encontraron movimientos.",
      delta:
        "Delta",
      historyNotice:
        "El historial conserva el orden de registro. El movimiento actual del Domain no contiene timestamp.",
    },
  };

export function getStorefrontAdminInventoryCopy(
  locale:
    StorefrontLocale,
): StorefrontAdminInventoryCopy {
  return inventoryCopy[
    locale
  ];
}