import type {
  StorefrontLocale,
} from "./storefront-copy";

export type StorefrontAdminCopy =
  Readonly<{
    adminMode: string;
    editProduct: string;
    inventory: string;
    stockUnits: string;
    dashboardEyebrow: string;
    dashboardTitle: string;
    dashboardBody: string;
    activeCatalog: string;
    products: string;
    variants: string;
    units: string;
    lowStock: string;
    sku: string;
    price: string;
    stock: string;
    available: string;
    attention: string;
    loading: string;
    empty: string;
    readOnlyNotice: string;
  }>;

const adminCopy:
  Record<
    StorefrontLocale,
    StorefrontAdminCopy
  > = {
    "pt-BR": {
      adminMode:
        "Modo Admin",
      editProduct:
        "Editar produto",
      inventory:
        "Estoque",
      stockUnits:
        "unidades",
      dashboardEyebrow:
        "Cat\u00e1logo / Invent\u00e1rio",
      dashboardTitle:
        "Vis\u00e3o operacional.",
      dashboardBody:
        "Acompanhe o cat\u00e1logo ativo, variantes, pre\u00e7os e estoque da demonstra\u00e7\u00e3o.",
      activeCatalog:
        "Cat\u00e1logo ativo",
      products:
        "Produtos",
      variants:
        "Variantes",
      units:
        "Unidades",
      lowStock:
        "Estoque baixo",
      sku:
        "SKU",
      price:
        "Pre\u00e7o",
      stock:
        "Estoque",
      available:
        "Dispon\u00edvel",
      attention:
        "Aten\u00e7\u00e3o",
      loading:
        "Carregando vis\u00e3o administrativa...",
      empty:
        "Nenhum produto ativo dispon\u00edvel.",
      readOnlyNotice:
        "Os controles contextuais deste passo s\u00e3o de navega\u00e7\u00e3o e leitura. Muta\u00e7\u00f5es de cat\u00e1logo e estoque entram em unidades posteriores.",
    },
    en: {
      adminMode:
        "Admin mode",
      editProduct:
        "Edit product",
      inventory:
        "Inventory",
      stockUnits:
        "units",
      dashboardEyebrow:
        "Catalog / Inventory",
      dashboardTitle:
        "Operational view.",
      dashboardBody:
        "Review the active catalog, variants, prices and demo inventory.",
      activeCatalog:
        "Active catalog",
      products:
        "Products",
      variants:
        "Variants",
      units:
        "Units",
      lowStock:
        "Low stock",
      sku:
        "SKU",
      price:
        "Price",
      stock:
        "Stock",
      available:
        "Available",
      attention:
        "Attention",
      loading:
        "Loading admin view...",
      empty:
        "No active products available.",
      readOnlyNotice:
        "Contextual controls in this step are navigation and read-only. Catalog and Inventory mutations arrive in later units.",
    },
    es: {
      adminMode:
        "Modo Admin",
      editProduct:
        "Editar producto",
      inventory:
        "Inventario",
      stockUnits:
        "unidades",
      dashboardEyebrow:
        "Cat\u00e1logo / Inventario",
      dashboardTitle:
        "Visi\u00f3n operativa.",
      dashboardBody:
        "Revisa el cat\u00e1logo activo, variantes, precios e inventario de la demostraci\u00f3n.",
      activeCatalog:
        "Cat\u00e1logo activo",
      products:
        "Productos",
      variants:
        "Variantes",
      units:
        "Unidades",
      lowStock:
        "Stock bajo",
      sku:
        "SKU",
      price:
        "Precio",
      stock:
        "Stock",
      available:
        "Disponible",
      attention:
        "Atenci\u00f3n",
      loading:
        "Cargando vista administrativa...",
      empty:
        "No hay productos activos disponibles.",
      readOnlyNotice:
        "Los controles contextuales de este paso son de navegaci\u00f3n y lectura. Las mutaciones de cat\u00e1logo e inventario llegan en unidades posteriores.",
    },
  };

export function getStorefrontAdminCopy(
  locale:
    StorefrontLocale,
): StorefrontAdminCopy {
  return adminCopy[
    locale
  ];
}