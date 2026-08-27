import type {
  StorefrontLocale,
} from "./storefront-copy";

export type StorefrontAdminCommercialCopy =
  Readonly<{
    eyebrow: string;
    title: string;
    body: string;
    simulationNotice: string;
    variant: string;
    label: string;
    code: string;
    cost: string;
    discount: string;
    simulate: string;
    confirmSave: string;
    cancel: string;
    saved: string;
    saveError: string;
    invalidField: string;
    basePrice: string;
    promotionalPrice: string;
    grossProfit: string;
    grossMargin: string;
    scenarios: string;
    empty: string;
    delete: string;
    resetNotice: string;
  }>;

const copies:
  Record<
    StorefrontLocale,
    StorefrontAdminCommercialCopy
  > = {
    "pt-BR": {
      eyebrow:
        "ADMIN / COMERCIAL",
      title:
        "Simulador de pre\u00e7o e promo\u00e7\u00f5es.",
      body:
        "Teste cen\u00e1rios de desconto e margem usando o pre\u00e7o persistido da variante como base.",
      simulationNotice:
        "Os cen\u00e1rios s\u00e3o somente simula\u00e7\u00f5es locais. Eles n\u00e3o alteram o pre\u00e7o do produto, o checkout, impostos, frete ou qualquer cobran\u00e7a real.",
      variant:
        "Variante",
      label:
        "Nome do cen\u00e1rio",
      code:
        "C\u00f3digo promocional",
      cost:
        "Custo estimado",
      discount:
        "Desconto (%)",
      simulate:
        "Simular",
      confirmSave:
        "Salvar cen\u00e1rio local",
      cancel:
        "Cancelar revis\u00e3o",
      saved:
        "Cen\u00e1rio salvo neste navegador.",
      saveError:
        "N\u00e3o foi poss\u00edvel salvar o cen\u00e1rio.",
      invalidField:
        "Revise os campos comerciais.",
      basePrice:
        "Pre\u00e7o base",
      promotionalPrice:
        "Pre\u00e7o promocional simulado",
      grossProfit:
        "Lucro bruto simulado",
      grossMargin:
        "Margem bruta simulada",
      scenarios:
        "Cen\u00e1rios salvos",
      empty:
        "Nenhum cen\u00e1rio promocional local salvo.",
      delete:
        "Excluir cen\u00e1rio",
      resetNotice:
        "O reset global da demonstra\u00e7\u00e3o tamb\u00e9m remove estes cen\u00e1rios.",
    },
    en: {
      eyebrow:
        "ADMIN / COMMERCIAL",
      title:
        "Pricing and promotion simulator.",
      body:
        "Test discount and margin scenarios using the persisted Variant price as the base.",
      simulationNotice:
        "Scenarios are local simulations only. They do not change Product price, checkout, taxes, shipping or any real charge.",
      variant:
        "Variant",
      label:
        "Scenario name",
      code:
        "Promotion code",
      cost:
        "Estimated cost",
      discount:
        "Discount (%)",
      simulate:
        "Simulate",
      confirmSave:
        "Save local scenario",
      cancel:
        "Cancel review",
      saved:
        "Scenario saved in this browser.",
      saveError:
        "The scenario could not be saved.",
      invalidField:
        "Review the commercial fields.",
      basePrice:
        "Base price",
      promotionalPrice:
        "Simulated promotional price",
      grossProfit:
        "Simulated gross profit",
      grossMargin:
        "Simulated gross margin",
      scenarios:
        "Saved scenarios",
      empty:
        "No local Promotion scenario has been saved.",
      delete:
        "Delete scenario",
      resetNotice:
        "The global demo reset also removes these scenarios.",
    },
    es: {
      eyebrow:
        "ADMIN / COMERCIAL",
      title:
        "Simulador de precios y promociones.",
      body:
        "Prueba escenarios de descuento y margen usando el precio persistido de la variante como base.",
      simulationNotice:
        "Los escenarios son solamente simulaciones locales. No cambian el precio del producto, checkout, impuestos, env\u00edo ni ning\u00fan cobro real.",
      variant:
        "Variante",
      label:
        "Nombre del escenario",
      code:
        "C\u00f3digo promocional",
      cost:
        "Costo estimado",
      discount:
        "Descuento (%)",
      simulate:
        "Simular",
      confirmSave:
        "Guardar escenario local",
      cancel:
        "Cancelar revisi\u00f3n",
      saved:
        "Escenario guardado en este navegador.",
      saveError:
        "No fue posible guardar el escenario.",
      invalidField:
        "Revisa los campos comerciales.",
      basePrice:
        "Precio base",
      promotionalPrice:
        "Precio promocional simulado",
      grossProfit:
        "Beneficio bruto simulado",
      grossMargin:
        "Margen bruto simulado",
      scenarios:
        "Escenarios guardados",
      empty:
        "No hay ning\u00fan escenario promocional local guardado.",
      delete:
        "Eliminar escenario",
      resetNotice:
        "El reset global de la demostraci\u00f3n tambi\u00e9n elimina estos escenarios.",
    },
  };

export function getStorefrontAdminCommercialCopy(
  locale:
    StorefrontLocale,
): StorefrontAdminCommercialCopy {
  return copies[
    locale
  ];
}