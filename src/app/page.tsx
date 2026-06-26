import { HomeInject } from "@/components";
import type { Metadata } from "next";

const title = "HI-Clean | Apartment and House Cleaning in Istanbul";
const description =
  "Book reliable apartment, house, deep, move-in, and fabric cleaning in Istanbul with HI-Clean.";
const previewImage = {
  url: "/images/logo.jpeg",
  width: 1254,
  height: 536,
  alt: "HI-Clean cleaning service logo",
};

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: "/",
    images: [previewImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [previewImage.url],
  },
};

export default function Home() {
  return <HomeInject />;
}
