import Link from "next/link";
import Image from "next/image";
import { heroCameraImage } from "@/lib/hero-image";
import { business } from "@/lib/site-config";
import { Icon } from "./Icons";
import styles from "./Hero.module.css";

/** Server-rendered hero; native CSS moves the camera and backdrop on scroll. */
export function Hero() {
  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.backdrop} aria-hidden="true">
        <Image
          src="/assets/avon-park.webp"
          alt=""
          width="735"
          height="572"
          loading="eager"
        />
      </div>
      <div className={`section-wrap ${styles.inner}`}>
        <div className={styles.copy}>
          <h1 id="hero-title">
            From Lens
            <br />
            to Last Cable.
            <br />
            <span className={styles.accent}>
              Security, Covered<span className={styles.period}>.</span>
            </span>
          </h1>
          <p className={styles.description}>
            For everything you&apos;ve built. And everyone you come home to.
          </p>
          <p className={styles.support}>
            Explore CCTV cameras, recording systems, networking products and
            installation solutions from {business.name}.
          </p>
          <div className={styles.actions}>
            <Link href="/products/" className="button button-orange">
              Explore products <Icon name="diagonal" size={18} />
            </Link>
            <Link href="/contact/" className="button button-outline">
              Installation enquiry <Icon name="arrow" size={18} />
            </Link>
          </div>
        </div>
        <div className={styles.visual}>
          <picture>
            <source
              type="image/avif"
              srcSet={heroCameraImage.avifSrcSet}
              sizes={heroCameraImage.sizes}
            />
            <source
              srcSet={heroCameraImage.srcSet}
              sizes={heroCameraImage.sizes}
            />
            <img
              className={styles.camera}
              src={heroCameraImage.src}
              width={heroCameraImage.width}
              height={heroCameraImage.height}
              alt={`${business.name} Silver Bullet security camera mounted on a pole`}
              fetchPriority="high"
              decoding="async"
            />
          </picture>
        </div>
      </div>
    </section>
  );
}
