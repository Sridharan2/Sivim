import Image from "next/image";
import { AboutSpaces } from "./AboutSpaces";
import { AboutStats } from "./AboutStats";
import { aboutStats } from "@/lib/about-stats";
import { business } from "@/lib/content";
import styles from "./AboutExperience.module.css";

export function AboutExperience() {
  const location = [business.city, business.region].filter(Boolean).join(", ");

  return (
    <section id="about" className={styles.about} aria-labelledby="about-title">
      <div className={styles.opening}>
        <figure className={styles.showcase}>
          <div className={styles.frame}>
            <Image
              className={styles.photograph}
              src="/assets/about-surveillance.webp"
              alt="A ceiling-mounted surveillance camera overlooking an indoor space"
              width="1920"
              height="1080"
              loading="lazy"
              decoding="async"
            />
            <div className={styles.imageCopy}>
              <div className={styles.intro}>
                <div className={styles.title}>
                  <span className={styles.eyebrow}>
                    A little about {business.name}
                  </span>
                  <h2 id="about-title" className={styles.headline}>
                    <span className={styles.headlineLine}>
                      <span>Big on protection.</span>
                    </span>
                    <span className={styles.headlineLine}>
                      <span>
                        <span className={styles.headlineAccent}>
                          Personal by nature.
                        </span>
                      </span>
                    </span>
                  </h2>
                </div>
                <div className={styles.introduction}>
                  <p>
                    {business.name} brings CCTV cameras, recording systems and
                    networking products together, with installation support
                    planned around your space.
                  </p>
                  {location && (
                    <span className={styles.location}>
                      Based in {location}.
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </figure>
        <AboutStats {...aboutStats} />
      </div>

      <div className={styles.approach}>
        <div className="section-wrap">
          <AboutSpaces />
        </div>
      </div>
    </section>
  );
}
