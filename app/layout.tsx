import type { Metadata, Viewport } from "next";
import { SiteChrome } from "@/components/SiteChrome";
import { ContactFooter } from "@/components/ContactFooter";
import { business } from "@/lib/site-config";
import "./globals.css";

const title = `${business.name} | CCTV, PoE Networking & Installation Solutions${business.city ? ` in ${business.city}` : ""}`;
export const metadata: Metadata = {
  metadataBase: new URL(business.url),
  title: { default: title, template: `%s | ${business.name}` },
  description: business.description,
  applicationName: business.name,
  icons: { icon: business.logoMark, apple: business.logoMark },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: business.name,
    title,
    description: business.description,
    images: [
      {
        url: "/assets/hero-silver-camera.webp",
        width: 1536,
        height: 1024,
        alt: `${business.name} surveillance camera`,
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0b1720",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organisation = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${business.url}/#business`,
    name: business.name,
    url: business.url,
    telephone: business.tel,
    email: business.email,
    logo: `${business.url}${business.logo}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.street,
      addressLocality: business.city || undefined,
      addressRegion: business.region || undefined,
      addressCountry: business.country || undefined,
    },
    openingHoursSpecification: business.openingHours,
  };
  return (
    <html lang="en-IN" data-scroll-behavior="smooth">
      <head>
        <link
          rel="preload"
          href="/assets/manrope-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body id="top">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organisation).replace(/</g, "\\u003c"),
          }}
        />
        <SiteChrome footer={<ContactFooter />}>{children}</SiteChrome>
      </body>
    </html>
  );
}
