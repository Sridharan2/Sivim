import type { Metadata } from "next";
import { AboutExperience } from "@/components/HomeExperience";
import { Hero } from "@/components/Hero";
import { HomeServices } from "@/components/HomeServices";
import { HomeProducts, HomeWhyUs } from "@/components/HomeShowcase";
import { ContactSection } from "@/components/ContactSection";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      <AboutExperience />
      <HomeServices />
      <HomeProducts />
      <HomeWhyUs />
      <ContactSection />
    </main>
  );
}
