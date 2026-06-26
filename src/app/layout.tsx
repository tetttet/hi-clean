import type { Metadata } from "next";
import { Anton_SC, Montserrat } from "next/font/google";
import localFont from "next/font/local";
import Layout from "@/components/layout";
import { SocialFloatingButton } from "@/components/common/social-floating-button";
import "./globals.css";

const anton_sc = Anton_SC({
  variable: "--font-anton-sc",
  subsets: ["latin"],
  weight: ["400"],
});

const gambetta = localFont({
  src: [
    {
      path: "../../public/fonts/Gambetta-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
  ],
  variable: "--font-gambetta",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const siteName = "HI-Clean";
const siteUrl = getSiteUrl();
const defaultTitle = "HI-Clean | Apartment and House Cleaning in Istanbul";
const defaultDescription =
  "Premium apartment, house, deep, move-in, sofa, mattress, chair, pouf, and carpet cleaning in Istanbul.";
const previewImage = {
  url: "/images/logo.jpeg",
  width: 1254,
  height: 536,
  alt: "HI-Clean cleaning service logo",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: [
    "HI-Clean",
    "Istanbul cleaning",
    "apartment cleaning",
    "house cleaning",
    "deep cleaning",
    "sofa cleaning",
    "carpet cleaning",
  ],
  alternates: {
    canonical: "/",
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
    title: defaultTitle,
    description: defaultDescription,
    url: "/",
    siteName,
    images: [previewImage],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [previewImage.url],
  },
  robots: {
    index: true,
    follow: true,
  },
};

function getSiteUrl() {
  const url =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL ??
    "http://localhost:3000";

  return url.startsWith("http") ? url : `https://${url}`;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton_sc.variable} ${montserrat.variable} ${gambetta.variable}`}
    >
      <body className={`${montserrat.className} antialiased`}>
        <Layout>{children}</Layout>
        <SocialFloatingButton />
      </body>
    </html>
  );
}
