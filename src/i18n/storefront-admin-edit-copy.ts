import type {
  StorefrontLocale,
} from "./storefront-copy";

export type StorefrontAdminEditCopy =
  Readonly<{
    editorTitle: string;
    editorBody: string;
    name: string;
    brand: string;
    model: string;
    featured: string;
    productDetails: string;
    variantPrices: string;
    reviewProduct: string;
    confirmProduct: string;
    reviewPrice: string;
    confirmPrice: string;
    cancel: string;
    close: string;
    saved: string;
    priceSaved: string;
    mutationError: string;
    required: string;
    tooShort: string;
    tooLong: string;
    invalidPrice: string;
    currencyHint: string;
    persistentNotice: string;
  }>;

const adminEditCopy:
  Record<
    StorefrontLocale,
    StorefrontAdminEditCopy
  > = {
    "pt-BR": {
      editorTitle:
        "Editar produto",
      editorBody:
        "Ajuste a identidade comercial e os pre\u00e7os das variantes da demonstra\u00e7\u00e3o.",
      name:
        "Nome",
      brand:
        "Marca",
      model:
        "Modelo",
      featured:
        "Produto em destaque",
      productDetails:
        "Dados do produto",
      variantPrices:
        "Pre\u00e7os das variantes",
      reviewProduct:
        "Revisar altera\u00e7\u00f5es",
      confirmProduct:
        "Confirmar produto",
      reviewPrice:
        "Revisar pre\u00e7o",
      confirmPrice:
        "Confirmar pre\u00e7o",
      cancel:
        "Cancelar",
      close:
        "Fechar editor",
      saved:
        "Produto salvo na demonstra\u00e7\u00e3o local.",
      priceSaved:
        "Pre\u00e7o salvo na demonstra\u00e7\u00e3o local.",
      mutationError:
        "N\u00e3o foi poss\u00edvel salvar a altera\u00e7\u00e3o.",
      required:
        "Campo obrigat\u00f3rio.",
      tooShort:
        "Informe um valor mais completo.",
      tooLong:
        "Use at\u00e9 120 caracteres.",
      invalidPrice:
        "Informe um pre\u00e7o v\u00e1lido com at\u00e9 duas casas decimais.",
      currencyHint:
        "Use valor decimal; a moeda atual da variante \u00e9 preservada.",
      persistentNotice:
        "As altera\u00e7\u00f5es ficam persistidas localmente e podem ser removidas pelo reset da demonstra\u00e7\u00e3o.",
    },
    en: {
      editorTitle:
        "Edit product",
      editorBody:
        "Adjust the demo Product commercial identity and Variant prices.",
      name:
        "Name",
      brand:
        "Brand",
      model:
        "Model",
      featured:
        "Featured Product",
      productDetails:
        "Product details",
      variantPrices:
        "Variant prices",
      reviewProduct:
        "Review changes",
      confirmProduct:
        "Confirm Product",
      reviewPrice:
        "Review price",
      confirmPrice:
        "Confirm price",
      cancel:
        "Cancel",
      close:
        "Close editor",
      saved:
        "Product saved in the local demo.",
      priceSaved:
        "Price saved in the local demo.",
      mutationError:
        "The change could not be saved.",
      required:
        "This field is required.",
      tooShort:
        "Enter a more complete value.",
      tooLong:
        "Use up to 120 characters.",
      invalidPrice:
        "Enter a valid price with up to two decimal places.",
      currencyHint:
        "Use a decimal value; the current Variant currency is preserved.",
      persistentNotice:
        "Changes persist locally and can be removed through the demo reset.",
    },
    es: {
      editorTitle:
        "Editar producto",
      editorBody:
        "Ajusta la identidad comercial y los precios de las variantes de la demostraci\u00f3n.",
      name:
        "Nombre",
      brand:
        "Marca",
      model:
        "Modelo",
      featured:
        "Producto destacado",
      productDetails:
        "Datos del producto",
      variantPrices:
        "Precios de variantes",
      reviewProduct:
        "Revisar cambios",
      confirmProduct:
        "Confirmar producto",
      reviewPrice:
        "Revisar precio",
      confirmPrice:
        "Confirmar precio",
      cancel:
        "Cancelar",
      close:
        "Cerrar editor",
      saved:
        "Producto guardado en la demostraci\u00f3n local.",
      priceSaved:
        "Precio guardado en la demostraci\u00f3n local.",
      mutationError:
        "No fue posible guardar el cambio.",
      required:
        "Campo obligatorio.",
      tooShort:
        "Ingresa un valor m\u00e1s completo.",
      tooLong:
        "Usa hasta 120 caracteres.",
      invalidPrice:
        "Ingresa un precio v\u00e1lido con hasta dos decimales.",
      currencyHint:
        "Usa un valor decimal; se conserva la moneda actual de la variante.",
      persistentNotice:
        "Los cambios quedan guardados localmente y pueden eliminarse con el reset de la demostraci\u00f3n.",
    },
  };

export function getStorefrontAdminEditCopy(
  locale:
    StorefrontLocale,
): StorefrontAdminEditCopy {
  return adminEditCopy[
    locale
  ];
}