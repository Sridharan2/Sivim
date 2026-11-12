import type { Metadata } from "next";
import { business, pageInfo, type Section } from "./content";

const titles: Record<Section, string> = {
  services: "CCTV installation & surveillance services in Chennai",
  products: "CCTV products, accessories & catalogues",
  contact: "Contact us | CCTV products & installation enquiries",
  faq: "CCTV products, installation & support FAQs",
  support: "Technical support & warranty enquiries",
  terms: "Terms & conditions",
};

export function sectionMetadata(section: Section): Metadata {
  const { description } = pageInfo[section];
  const image =
    section === "products"
      ? {
          url: "/assets/products/products-landscape.webp",
          width: 1600,
          height: 960,
          alt: "SIVIM CCTV cameras, recorders, networking and installation accessories",
        }
      : section === "services"
        ? {
            url: "/assets/services/installation-team.webp",
            width: 1672,
            height: 941,
            alt: "SIVIM CCTV installation team",
          }
        : {
            url: "/assets/hero-silver-camera.webp",
            width: 1536,
            height: 1024,
            alt: "SIVIM surveillance camera",
          };
  return {
    title: titles[section],
    description,
    alternates: { canonical: `/${section}/` },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: business.name,
      title: `${titles[section]} | ${business.name}`,
      description,
      url: `/${section}/`,
      images: [image],
    },
  };
}
