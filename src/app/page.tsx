import { HomeInject } from "@/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HI-Clean | Apartment and House Cleaning",
  description:
    "HI-Clean provides bright, reliable cleaning for apartments and houses.",
};

export default function Home() {
  return <HomeInject />;
}
