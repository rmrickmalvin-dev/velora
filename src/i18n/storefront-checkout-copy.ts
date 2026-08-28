import type {
  StorefrontLocale,
} from "./storefront-copy";

export type StorefrontCheckoutCopy =
  Readonly<{
    checkoutCta: string;
    eyebrow: string;
    title: string;
    body: string;
    demoNotice: string;
    summaryTitle: string;
    contactTitle: string;
    deliveryTitle: string;
    fullName: string;
    email: string;
    addressLine: string;
    city: string;
    postalCode: string;
    submit: string;
    submittedTitle: string;
    submittedBody: string;
    emptyTitle: string;
    emptyBody: string;
    invalidCartTitle: string;
    invalidCartBody: string;
    backToStore: string;
    subtotal: string;
    errorRequired: string;
    errorEmail: string;
    errorShort: string;
    errorPostal: string;
    completingOrder: string;
    completionError: string;
    confirmationEyebrow: string;
    confirmationTitle: string;
    confirmationBody: string;
    reference: string;
    orderStatus: string;
    continueShopping: string;
  }>;

const checkoutCopy:
  Record<
    StorefrontLocale,
    StorefrontCheckoutCopy
  > = {
    "pt-BR": {
      checkoutCta:
        "Ir para checkout",
      eyebrow:
        "Checkout demonstrativo",
      title:
        "Prepare sua jornada.",
      body:
        "Revise o carrinho e valide os dados de contato e entrega.",
      demoNotice:
        "Esta experi\u00eancia faz parte de um portf\u00f3lio conceitual. Nenhuma cobran\u00e7a, pagamento ou pedido real ser\u00e1 realizado.",
      summaryTitle:
        "Resumo do carrinho",
      contactTitle:
        "Contato",
      deliveryTitle:
        "Entrega",
      fullName:
        "Nome completo",
      email:
        "E-mail",
      addressLine:
        "Endere\u00e7o",
      city:
        "Cidade",
      postalCode:
        "CEP ou c\u00f3digo postal",
      submit:
        "Validar dados da demonstra\u00e7\u00e3o",
      submittedTitle:
        "Dados validados.",
      submittedBody:
        "A jornada demonstrativa foi conclu\u00edda localmente. Nenhum pedido foi enviado e nenhuma cobran\u00e7a foi realizada.",
      emptyTitle:
        "Seu carrinho est\u00e1 vazio.",
      emptyBody:
        "Adicione um produto antes de iniciar o checkout demonstrativo.",
      invalidCartTitle:
        "O carrinho precisa de revis\u00e3o.",
      invalidCartBody:
        "N\u00e3o \u00e9 poss\u00edvel continuar enquanto os dados comerciais do carrinho estiverem inconsistentes.",
      backToStore:
        "Voltar para a loja",
      subtotal:
        "Subtotal",
      errorRequired:
        "Campo obrigat\u00f3rio.",
      errorEmail:
        "Informe um e-mail v\u00e1lido.",
      errorShort:
        "Informe um valor mais completo.",
      errorPostal:
        "Informe um c\u00f3digo postal v\u00e1lido.",
      completingOrder:
        "Criando pedido demonstrativo...",
      completionError:
        "N\u00e3o foi poss\u00edvel concluir o pedido demonstrativo.",
      confirmationEyebrow:
        "Pedido demonstrativo",
      confirmationTitle:
        "Jornada conclu\u00edda.",
      confirmationBody:
        "O pedido demonstrativo foi salvo localmente. Nenhuma cobran\u00e7a foi realizada.",
      reference:
        "Refer\u00eancia do pedido",
      orderStatus:
        "Status",
      continueShopping:
        "Continuar explorando",
    },
    en: {
      checkoutCta:
        "Go to checkout",
      eyebrow:
        "Demo checkout",
      title:
        "Prepare your journey.",
      body:
        "Review the cart and validate contact and delivery details.",
      demoNotice:
        "This experience is part of a conceptual portfolio. No charge, payment or real order will be created.",
      summaryTitle:
        "Cart summary",
      contactTitle:
        "Contact",
      deliveryTitle:
        "Delivery",
      fullName:
        "Full name",
      email:
        "Email",
      addressLine:
        "Address",
      city:
        "City",
      postalCode:
        "Postal code",
      submit:
        "Validate demo details",
      submittedTitle:
        "Details validated.",
      submittedBody:
        "The demo journey was completed locally. No order was submitted and no charge was made.",
      emptyTitle:
        "Your cart is empty.",
      emptyBody:
        "Add a product before starting the demo checkout.",
      invalidCartTitle:
        "The cart needs review.",
      invalidCartBody:
        "You cannot continue while the cart commercial data is inconsistent.",
      backToStore:
        "Back to store",
      subtotal:
        "Subtotal",
      errorRequired:
        "This field is required.",
      errorEmail:
        "Enter a valid email.",
      errorShort:
        "Enter a more complete value.",
      errorPostal:
        "Enter a valid postal code.",
      completingOrder:
        "Creating demo order...",
      completionError:
        "Could not complete the demo order.",
      confirmationEyebrow:
        "Demo order",
      confirmationTitle:
        "Journey completed.",
      confirmationBody:
        "The demo order was saved locally. No charge was made.",
      reference:
        "Order reference",
      orderStatus:
        "Status",
      continueShopping:
        "Continue exploring",
    },
    es: {
      checkoutCta:
        "Ir al checkout",
      eyebrow:
        "Checkout demostrativo",
      title:
        "Prepara tu recorrido.",
      body:
        "Revisa el carrito y valida los datos de contacto y entrega.",
      demoNotice:
        "Esta experiencia forma parte de un portafolio conceptual. No se realizar\u00e1 ning\u00fan cobro, pago ni pedido real.",
      summaryTitle:
        "Resumen del carrito",
      contactTitle:
        "Contacto",
      deliveryTitle:
        "Entrega",
      fullName:
        "Nombre completo",
      email:
        "Correo electr\u00f3nico",
      addressLine:
        "Direcci\u00f3n",
      city:
        "Ciudad",
      postalCode:
        "C\u00f3digo postal",
      submit:
        "Validar datos de demostraci\u00f3n",
      submittedTitle:
        "Datos validados.",
      submittedBody:
        "El recorrido demostrativo se complet\u00f3 localmente. No se envi\u00f3 ning\u00fan pedido ni se realiz\u00f3 ning\u00fan cobro.",
      emptyTitle:
        "Tu carrito est\u00e1 vac\u00edo.",
      emptyBody:
        "Agrega un producto antes de iniciar el checkout demostrativo.",
      invalidCartTitle:
        "El carrito necesita revisi\u00f3n.",
      invalidCartBody:
        "No es posible continuar mientras los datos comerciales del carrito sean inconsistentes.",
      backToStore:
        "Volver a la tienda",
      subtotal:
        "Subtotal",
      errorRequired:
        "Campo obligatorio.",
      errorEmail:
        "Ingresa un correo v\u00e1lido.",
      errorShort:
        "Ingresa un valor m\u00e1s completo.",
      errorPostal:
        "Ingresa un c\u00f3digo postal v\u00e1lido.",
      completingOrder:
        "Creando pedido demostrativo...",
      completionError:
        "No fue posible completar el pedido demostrativo.",
      confirmationEyebrow:
        "Pedido demostrativo",
      confirmationTitle:
        "Recorrido completado.",
      confirmationBody:
        "El pedido demostrativo se guard\u00f3 localmente. No se realiz\u00f3 ning\u00fan cobro.",
      reference:
        "Referencia del pedido",
      orderStatus:
        "Estado",
      continueShopping:
        "Seguir explorando",
    },
  };

export function getStorefrontCheckoutCopy(
  locale:
    StorefrontLocale,
): StorefrontCheckoutCopy {
  return checkoutCopy[
    locale
  ];
}