import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Anton_SC, Montserrat } from "next/font/google";
import localFont from "next/font/local";
import Layout from "@/components/layout";
import { SocialFloatingButton } from "@/components/common/social-floating-button";
import { createRootMetadata } from "@/i18n/metadata";
import { isLocale, locales } from "@/i18n/routing";
import "../globals.css";

const anton_sc = Anton_SC({
  variable: "--font-anton-sc",
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
});

const gambetta = localFont({
  src: [
    {
      path: "../../../public/fonts/Gambetta-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
  ],
  variable: "--font-gambetta",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "latin-ext", "cyrillic"],
});

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return createRootMetadata(locale);
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${anton_sc.variable} ${montserrat.variable} ${gambetta.variable}`}
    >
      <body className={`${montserrat.className} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Layout>{children}</Layout>
          <SocialFloatingButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
