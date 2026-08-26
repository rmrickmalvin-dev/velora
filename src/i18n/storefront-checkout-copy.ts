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
        "Esta experiencia faz parte de um portfolio conceitual. Nenhuma cobranca, pagamento ou pedido real sera realizado.",
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
        "Endereco",
      city:
        "Cidade",
      postalCode:
        "CEP ou codigo postal",
      submit:
        "Validar dados da demonstracao",
      submittedTitle:
        "Dados validados.",
      submittedBody:
        "A jornada demonstrativa foi concluida localmente. Nenhum pedido foi enviado e nenhuma cobranca foi realizada.",
      emptyTitle:
        "Seu carrinho esta vazio.",
      emptyBody:
        "Adicione um produto antes de iniciar o checkout demonstrativo.",
      invalidCartTitle:
        "O carrinho precisa de revisao.",
      invalidCartBody:
        "Nao e possivel continuar enquanto os dados comerciais do carrinho estiverem inconsistentes.",
      backToStore:
        "Voltar para a loja",
      subtotal:
        "Subtotal",
      errorRequired:
        "Campo obrigatorio.",
      errorEmail:
        "Informe um e-mail valido.",
      errorShort:
        "Informe um valor mais completo.",
      errorPostal:
        "Informe um codigo postal valido.",
      completingOrder:
        "Criando pedido demonstrativo...",
      completionError:
        "Nao foi possivel concluir o pedido demonstrativo.",
      confirmationEyebrow:
        "Pedido demonstrativo",
      confirmationTitle:
        "Jornada concluida.",
      confirmationBody:
        "O pedido demonstrativo foi salvo localmente. Nenhuma cobranca foi realizada.",
      reference:
        "Referencia do pedido",
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
        "Esta experiencia forma parte de un portfolio conceptual. No se realizara ningun cobro, pago ni pedido real.",
      summaryTitle:
        "Resumen del carrito",
      contactTitle:
        "Contacto",
      deliveryTitle:
        "Entrega",
      fullName:
        "Nombre completo",
      email:
        "Correo electronico",
      addressLine:
        "Direccion",
      city:
        "Ciudad",
      postalCode:
        "Codigo postal",
      submit:
        "Validar datos de demostracion",
      submittedTitle:
        "Datos validados.",
      submittedBody:
        "El recorrido demostrativo se completo localmente. No se envio ningun pedido ni se realizo ningun cobro.",
      emptyTitle:
        "Tu carrito esta vacio.",
      emptyBody:
        "Agrega un producto antes de iniciar el checkout demostrativo.",
      invalidCartTitle:
        "El carrito necesita revision.",
      invalidCartBody:
        "No es posible continuar mientras los datos comerciales del carrito sean inconsistentes.",
      backToStore:
        "Volver a la tienda",
      subtotal:
        "Subtotal",
      errorRequired:
        "Campo obligatorio.",
      errorEmail:
        "Ingresa un correo valido.",
      errorShort:
        "Ingresa un valor mas completo.",
      errorPostal:
        "Ingresa un codigo postal valido.",
      completingOrder:
        "Creando pedido demostrativo...",
      completionError:
        "No fue posible completar el pedido demostrativo.",
      confirmationEyebrow:
        "Pedido demostrativo",
      confirmationTitle:
        "Recorrido completado.",
      confirmationBody:
        "El pedido demostrativo se guardo localmente. No se realizo ningun cobro.",
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