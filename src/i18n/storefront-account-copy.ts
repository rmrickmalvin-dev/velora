import type {
  StorefrontLocale,
} from "./storefront-copy";

export type StorefrontAccountCopy =
  Readonly<{
    eyebrow: string;
    title: string;
    body: string;
    localNotice: string;
    profileTitle: string;
    fullName: string;
    email: string;
    phone: string;
    city: string;
    save: string;
    restore: string;
    saved: string;
    restored: string;
    saveError: string;
    required: string;
    tooShort: string;
    tooLong: string;
    invalidEmail: string;
    invalidPhone: string;
    ordersTitle: string;
    ordersBody: string;
    orderRef: string;
    status: string;
    items: string;
    subtotal: string;
    noOrders: string;
    browseStore: string;
  }>;

const accountCopy:
  Record<
    StorefrontLocale,
    StorefrontAccountCopy
  > = {
    "pt-BR": {
      eyebrow:
        "CUSTOMER / CONTA DEMO",
      title:
        "Seu espa\u00e7o na VELORA.",
      body:
        "Edite um perfil fict\u00edcio salvo somente neste navegador e acompanhe os pedidos criados nesta demonstra\u00e7\u00e3o local.",
      localNotice:
        "Esta \u00e9 uma experi\u00eancia de portf\u00f3lio. N\u00e3o existe autentica\u00e7\u00e3o real, conta remota ou identidade verificada.",
      profileTitle:
        "Perfil de demonstra\u00e7\u00e3o",
      fullName:
        "Nome",
      email:
        "E-mail",
      phone:
        "Telefone",
      city:
        "Cidade",
      save:
        "Salvar perfil local",
      restore:
        "Restaurar perfil fict\u00edcio",
      saved:
        "Perfil salvo neste navegador.",
      restored:
        "Perfil fict\u00edcio restaurado.",
      saveError:
        "N\u00e3o foi poss\u00edvel salvar o perfil.",
      required:
        "Campo obrigat\u00f3rio.",
      tooShort:
        "Informe um valor mais completo.",
      tooLong:
        "Valor acima do limite permitido.",
      invalidEmail:
        "Informe um e-mail v\u00e1lido.",
      invalidPhone:
        "Informe um telefone v\u00e1lido.",
      ordersTitle:
        "Pedidos desta demonstra\u00e7\u00e3o",
      ordersBody:
        "Os pedidos abaixo pertencem ao estado local deste navegador. Eles ainda n\u00e3o est\u00e3o vinculados a uma identidade de cliente verificada.",
      orderRef:
        "Refer\u00eancia",
      status:
        "Status",
      items:
        "Itens",
      subtotal:
        "Subtotal",
      noOrders:
        "Nenhum pedido local foi criado ainda.",
      browseStore:
        "Explorar produtos",
    },
    en: {
      eyebrow:
        "CUSTOMER / DEMO ACCOUNT",
      title:
        "Your VELORA space.",
      body:
        "Edit a fictional profile saved only in this browser and review Orders created in this local demo.",
      localNotice:
        "This is a portfolio experience. There is no real authentication, remote account or verified identity.",
      profileTitle:
        "Demo profile",
      fullName:
        "Name",
      email:
        "Email",
      phone:
        "Phone",
      city:
        "City",
      save:
        "Save local profile",
      restore:
        "Restore fictional profile",
      saved:
        "Profile saved in this browser.",
      restored:
        "Fictional profile restored.",
      saveError:
        "The profile could not be saved.",
      required:
        "This field is required.",
      tooShort:
        "Enter a more complete value.",
      tooLong:
        "The value is above the allowed limit.",
      invalidEmail:
        "Enter a valid email.",
      invalidPhone:
        "Enter a valid phone number.",
      ordersTitle:
        "Orders from this demo",
      ordersBody:
        "The Orders below belong to this browser-local demo state. They are not yet linked to a verified Customer identity.",
      orderRef:
        "Reference",
      status:
        "Status",
      items:
        "Items",
      subtotal:
        "Subtotal",
      noOrders:
        "No local Order has been created yet.",
      browseStore:
        "Browse products",
    },
    es: {
      eyebrow:
        "CUSTOMER / CUENTA DEMO",
      title:
        "Tu espacio VELORA.",
      body:
        "Edita un perfil ficticio guardado solamente en este navegador y revisa los pedidos creados en esta demostraci\u00f3n local.",
      localNotice:
        "Esta es una experiencia de portafolio. No existe autenticaci\u00f3n real, cuenta remota ni identidad verificada.",
      profileTitle:
        "Perfil de demostraci\u00f3n",
      fullName:
        "Nombre",
      email:
        "Correo",
      phone:
        "Tel\u00e9fono",
      city:
        "Ciudad",
      save:
        "Guardar perfil local",
      restore:
        "Restaurar perfil ficticio",
      saved:
        "Perfil guardado en este navegador.",
      restored:
        "Perfil ficticio restaurado.",
      saveError:
        "No fue posible guardar el perfil.",
      required:
        "Campo obligatorio.",
      tooShort:
        "Ingresa un valor m\u00e1s completo.",
      tooLong:
        "El valor supera el l\u00edmite permitido.",
      invalidEmail:
        "Ingresa un correo v\u00e1lido.",
      invalidPhone:
        "Ingresa un tel\u00e9fono v\u00e1lido.",
      ordersTitle:
        "Pedidos de esta demostraci\u00f3n",
      ordersBody:
        "Los pedidos pertenecen al estado local de este navegador. Todav\u00eda no est\u00e1n vinculados a una identidad de cliente verificada.",
      orderRef:
        "Referencia",
      status:
        "Estado",
      items:
        "Art\u00edculos",
      subtotal:
        "Subtotal",
      noOrders:
        "Todav\u00eda no se cre\u00f3 ning\u00fan pedido local.",
      browseStore:
        "Explorar productos",
    },
  };

export function getStorefrontAccountCopy(
  locale:
    StorefrontLocale,
): StorefrontAccountCopy {
  return accountCopy[
    locale
  ];
}