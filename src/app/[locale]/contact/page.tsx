import Navigation from "@/components/common/navigation";
import { SOCIAL_LINKS } from "@/constants/social-links";
import { getContent } from "@/i18n/content";
import { createPageMetadata } from "@/i18n/metadata";
import { isLocale } from "@/i18n/routing";
import { notFound } from "next/navigation";

type ContactPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: ContactPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return createPageMetadata(locale, "contact", "/contact");
}

const contactLinks = [
  {
    ...SOCIAL_LINKS.whatsapp,
    buttonClass: "bg-[#25D366] hover:bg-[#1ebc59]",
  },
  {
    ...SOCIAL_LINKS.instagram,
    buttonClass:
      "bg-[linear-gradient(135deg,#833AB4_0%,#FD1D1D_52%,#FCAF45_100%)] hover:brightness-110",
  },
  {
    ...SOCIAL_LINKS.telegram,
    buttonClass: "bg-[#229ED9] hover:bg-[#168ac2]",
  },
] as const;

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const content = getContent(locale);

  return (
    <main className="relative min-h-screen overflow-hidden text-foreground">
      <div className="relative z-10">
        <Navigation compact />

        <section className="mx-auto flex min-h-[calc(100vh-7rem)] w-[90%] max-w-[1440px] items-center py-10">
          <div className="w-full max-w-xl">
            <h1 className="font-anton-sc text-6xl uppercase leading-none sm:text-8xl lg:text-[10rem]">
              {content.contact.title}
            </h1>

            <div className="mt-10 flex w-full flex-col gap-4">
              {contactLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.displayName}
                  className={`group flex min-h-20 w-full items-center justify-between rounded-lg border border-white/25 px-5 py-4 text-white shadow-[0_18px_60px_rgba(21,26,23,0.18)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(21,26,23,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-transparent sm:px-6 ${link.buttonClass}`}
                >
                  <span className="flex flex-col gap-1">
                    <span className="text-2xl font-bold leading-none sm:text-3xl">
                      {link.name}
                    </span>
                  </span>
                  <span className="inline-flex text-white transition-transform duration-300 group-hover:translate-x-1">
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
                      <path d="M7 17 17 7" />
                      <path d="M9 7h8v8" />
                    </svg>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
