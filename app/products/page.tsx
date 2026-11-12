import Link from "next/link";
import { ProductsCatalogue } from "@/components/ProductsCatalogue";
import { business, products, productFaqs } from "@/lib/content";
import { sectionMetadata } from "@/lib/metadata";
import styles from "@/components/ProductsCatalogue.module.css";

export const metadata = sectionMetadata("products");

export default function Page() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${business.url}/products/`,
        name: `${business.name} CCTV products and catalogues`,
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: products.length,
          itemListElement: products.map((product, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: product.name,
            url: `${business.url}/products/#${product.id}`,
          })),
        },
      },
    ],
  };
  return (
    <main id="main-content" className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <section className={styles.hero} aria-labelledby="page-title">
        <picture className={styles.backdrop}>
          <source
            media="(max-width: 800px)"
            type="image/avif"
            srcSet="/assets/products/products-landscape-mobile.avif"
          />
          <source
            type="image/avif"
            srcSet="/assets/products/products-landscape.avif"
          />
          <source
            media="(max-width: 800px)"
            srcSet="/assets/products/products-landscape-mobile.webp"
          />
          <img
            src="/assets/products/products-landscape.webp"
            alt=""
            width={1600}
            height={960}
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div className="section-wrap">
          <div className={styles.heroCopy}>
            <h1 id="page-title">
              Cameras to cables.<span>One connected setup.</span>
            </h1>
            <p>
              Explore the equipment, find your fit and keep the details with our
              product catalogues.
            </p>
            <div className={styles.heroActions}>
              <a href="#product-range" className="button button-orange">
                Explore our products
              </a>
              <Link href="/#contact" className={styles.quietLink}>
                Help me choose
              </Link>
            </div>
          </div>
        </div>
      </section>
      <ProductsCatalogue />
      <section className={styles.faq} aria-labelledby="product-faq-title">
        <div className={`section-wrap ${styles.faqLayout}`}>
          <div className={styles.faqIntro}>
            <h2 id="product-faq-title">Before you choose.</h2>
            <p>
              A little clarity on cameras, recording, connections and your next
              step.
            </p>
            <Link className={styles.quietLink} href="/faq/">
              More questions, answered
            </Link>
          </div>
          <div className={styles.questions}>
            {productFaqs.map((item) => (
              <details key={item.q}>
                <summary>
                  {item.q}
                  <span className={styles.plus} aria-hidden="true" />
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
