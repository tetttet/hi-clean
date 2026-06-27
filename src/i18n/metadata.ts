import type { Metadata } from "next";
import { getContent } from "./content";
import { locales, type Locale } from "./routing";

const siteName = "HI-Clean";
const previewImageUrl = "/images/logo.jpeg";

export function createRootMetadata(locale: Locale): Metadata {
  const content = getContent(locale);
  const copy = content.metadata.root;

  return {
    metadataBase: new URL(getSiteUrl()),
    applicationName: siteName,
    title: {
      default: copy.title,
      template: `%s | ${siteName}`,
    },
    description: copy.description,
    keywords: copy.keywords,
    alternates: {
      canonical: localizedPath(locale, "/"),
      languages: localizedLanguages("/"),
    },
    icons: {
      icon: [
        {
          url: "/images/icon.png",
          sizes: "3200x3200",
          type: "image/png",
        },
      ],
      apple: [
        {
          url: "/images/icon.png",
          sizes: "3200x3200",
          type: "image/png",
        },
      ],
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: localizedPath(locale, "/"),
      siteName,
      images: [previewImage(copy.imageAlt)],
      locale: content.openGraphLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
      images: [previewImageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function createPageMetadata(
  locale: Locale,
  page: "home" | "services" | "contact",
  pathname: "/" | "/services" | "/contact"
): Metadata {
  const copy = getContent(locale).metadata[page];
  const url = localizedPath(locale, pathname);

  return {
    title: {
      absolute: copy.title,
    },
    description: copy.description,
    alternates: {
      canonical: url,
      languages: localizedLanguages(pathname),
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url,
      images: [previewImage(copy.imageAlt)],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
      images: [previewImageUrl],
    },
  };
}

function previewImage(alt: string) {
  return {
    url: previewImageUrl,
    width: 1254,
    height: 536,
    alt,
  };
}

function localizedLanguages(pathname: "/" | "/services" | "/contact") {
  return Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, pathname)])
  );
}

function localizedPath(locale: Locale, pathname: "/" | "/services" | "/contact") {
  return pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
}

function getSiteUrl() {
  const url =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL ??
    "http://localhost:3000";

  return url.startsWith("http") ? url : `https://${url}`;
}
