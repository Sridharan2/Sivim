import { services } from "@/lib/content";
import styles from "./HomeServices.module.css";

export function HomeServices() {
  return (
    <section
      id="services"
      className={styles.section}
      aria-labelledby="home-services-title"
    >
      <div className={`section-wrap ${styles.layout}`}>
        <div className={styles.introduction}>
          <span className={styles.eyebrow}>Our services</span>
          <h2 id="home-services-title">
            Every connection.
            <span>Considered.</span>
          </h2>
          <p className={styles.introductionCopy}>
            Camera installation, recorder setup and ongoing maintenance for
            homes, offices and business premises.
          </p>
          <p className={styles.note}>
            Installation availability, scope and charges are confirmed for your
            location.
          </p>
        </div>

        <div className={styles.collection}>
          <ol className={styles.serviceList} role="list">
            {services.map((service) => (
              <li className={styles.item} key={service.id}>
                <a
                  className={styles.service}
                  href={`/services/#${service.id}`}
                  aria-labelledby={`home-service-${service.id}`}
                  aria-describedby={`home-service-description-${service.id}`}
                >
                  <span className={styles.number} aria-hidden="true">
                    {service.number}
                  </span>
                  <div className={styles.copy}>
                    <h3 id={`home-service-${service.id}`}>{service.name}</h3>
                    <p
                      className={styles.description}
                      id={`home-service-description-${service.id}`}
                    >
                      {service.description}
                    </p>
                  </div>
                  <span className={styles.hoverDot} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ol>
          <div className={styles.action}>
            <a href="/services/" className={styles.overviewButton}>
              View all services
              <span className={styles.buttonDot} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
