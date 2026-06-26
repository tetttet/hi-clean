export const SOCIAL_LINKS = {
  whatsapp: {
    name: "WhatsApp",
    displayName: "WhatsApp +90 552 397 33 33",
    href: "https://wa.me/905523973333",
  },
  telegram: {
    name: "Telegram",
    displayName: "Telegram @Bren228",
    href: "https://t.me/Bren228",
  },
  instagram: {
    name: "Instagram",
    displayName: "Instagram",
    href: "https://www.instagram.com/hiclean.ist/",
  },
} as const;

export const SOCIAL_LINK_LIST = [
  SOCIAL_LINKS.whatsapp,
  SOCIAL_LINKS.telegram,
  SOCIAL_LINKS.instagram,
] as const;
