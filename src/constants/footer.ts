import { SOCIAL_LINKS } from "./social-links";

export const FOOTER_LINKS = [
  {
    category: "Explore",
    links: [
      {
        name: "Home",
        href: "#top",
      },
      {
        name: "Services",
        href: "#services",
      },
      {
        name: "Results",
        href: "#results",
      },
      {
        name: "Reviews",
        href: "#reviews",
      },
    ],
  },
  {
    category: "Cleaning",
    links: [
      {
        name: "Apartments",
        href: "#services",
      },
      {
        name: "Houses",
        href: "#services",
      },
      {
        name: "Deep Cleaning",
        href: "#services",
      },
    ],
  },
  {
    category: "Contact",
    links: [
      {
        name: "Book a Clean",
        href: "mailto:hello@hi-clean.com",
      },
      {
        name: "Call HI-Clean",
        href: "tel:+905523973333",
      },
    ],
  },
  {
    category: "Socials",
    links: [
      {
        name: SOCIAL_LINKS.whatsapp.displayName,
        href: SOCIAL_LINKS.whatsapp.href,
      },
      {
        name: SOCIAL_LINKS.telegram.displayName,
        href: SOCIAL_LINKS.telegram.href,
      },
      {
        name: SOCIAL_LINKS.instagram.displayName,
        href: SOCIAL_LINKS.instagram.href,
      },
    ],
  },
];
