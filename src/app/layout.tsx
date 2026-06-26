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

export const metadata: Metadata = {
  title: "HI-Clean | Apartment and House Cleaning",
  description:
    "Premium apartment and house cleaning with a careful, reliable team.",
};

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
