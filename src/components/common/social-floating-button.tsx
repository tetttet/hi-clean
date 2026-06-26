"use client";

import { useState } from "react";
import { SOCIAL_LINKS } from "@/constants/social-links";

const ICON_CLASS = "h-6 w-6";

const WhatsappIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={ICON_CLASS}
    fill="currentColor"
  >
    <path d="M12.04 2C6.58 2 2.14 6.28 2.14 11.54c0 1.9.58 3.67 1.58 5.15L2 22l5.55-1.63a10.22 10.22 0 0 0 4.49.99c5.46 0 9.9-4.28 9.9-9.54S17.5 2 12.04 2Zm0 17.71c-1.48 0-2.86-.38-4.08-1.06l-.31-.18-3.29.96 1.04-3.08-.2-.32a7.74 7.74 0 0 1-1.28-4.29c0-4.35 3.65-7.89 8.12-7.89s8.12 3.54 8.12 7.89-3.65 7.97-8.12 7.97Zm4.45-5.91c-.24-.12-1.45-.69-1.67-.77-.22-.08-.39-.12-.55.12-.16.23-.63.77-.77.93-.14.15-.28.17-.52.06-.24-.12-1.02-.36-1.94-1.16-.72-.62-1.2-1.39-1.34-1.62-.14-.24-.01-.36.11-.48.11-.1.24-.27.36-.41.12-.14.16-.24.24-.39.08-.15.04-.29-.02-.41-.06-.12-.55-1.28-.75-1.75-.2-.47-.4-.4-.55-.41h-.47c-.16 0-.41.06-.63.29-.22.24-.83.81-.83 1.98s.85 2.3.97 2.46c.12.15 1.68 2.48 4.07 3.48.57.24 1.01.38 1.36.49.57.18 1.09.15 1.5.09.46-.07 1.45-.57 1.65-1.12.2-.55.2-1.02.14-1.12-.06-.1-.22-.16-.46-.27Z" />
  </svg>
);

const TelegramIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={ICON_CLASS}
    fill="currentColor"
  >
    <path d="M21.73 3.53c.28 1.73-2.23 14.56-3.2 17.02-.41 1.02-1.19 1.09-1.92.68l-5.04-3.72-2.43 2.34c-.27.27-.5.5-1.02.5l.36-5.14 9.36-8.46c.41-.36-.09-.56-.63-.2L5.64 13.83.66 12.27c-1.08-.34-1.1-1.08.23-1.6L20.34 3.2c.9-.34 1.69.22 1.39.33Z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={ICON_CLASS}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
  >
    <rect width="17" height="17" x="3.5" y="3.5" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const SocialIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-7 w-7"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
  >
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <path d="m8.6 10.5 6.8-4" />
    <path d="m8.6 13.5 6.8 4" />
  </svg>
);

const SOCIAL_ACTIONS = [
  {
    ...SOCIAL_LINKS.whatsapp,
    icon: <WhatsappIcon />,
    colorClass: "bg-[#25D366] hover:bg-[#1ebc59]",
  },
  {
    ...SOCIAL_LINKS.telegram,
    icon: <TelegramIcon />,
    colorClass: "bg-[#229ED9] hover:bg-[#168ac2]",
  },
  {
    ...SOCIAL_LINKS.instagram,
    icon: <InstagramIcon />,
    colorClass: "bg-[#E1306C] hover:bg-[#ca285f]",
  },
] as const;

export const SocialFloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-[70] flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">
      <div className="flex flex-col items-end gap-3">
        {SOCIAL_ACTIONS.map((action, index) => (
          <a
            key={action.name}
            href={action.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={action.displayName}
            title={action.displayName}
            className={`flex h-12 w-12 items-center justify-center rounded-full text-white shadow-[0_14px_36px_rgba(21,26,23,0.22)] outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:h-14 sm:w-14 ${action.colorClass} ${
              isOpen
                ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                : "pointer-events-none translate-y-4 scale-75 opacity-0"
            }`}
            style={{
              transitionDelay: isOpen
                ? `${(SOCIAL_ACTIONS.length - index) * 45}ms`
                : `${index * 35}ms`,
            }}
          >
            {action.icon}
          </a>
        ))}
      </div>

      <button
        type="button"
        aria-label={isOpen ? "Close social links" : "Open social links"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background shadow-[0_18px_42px_rgba(21,26,23,0.28)] outline-none transition duration-300 hover:bg-accent focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:h-16 sm:w-16"
      >
        <span
          className={`inline-flex transition-transform duration-300 ${
            isOpen ? "rotate-45" : "rotate-0"
          }`}
        >
          <SocialIcon />
        </span>
      </button>
    </div>
  );
};
