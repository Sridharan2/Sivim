import styles from "./HomeWhyUs.module.css";

const reasons = [
  "Coverage planned for your space.",
  "The right products, carefully installed.",
  "Setup guidance and ongoing support.",
] as const;

export function HomeWhyUs() {
  return (
    <section
      id="why-us"
      className={styles.section}
      aria-labelledby="home-why-title"
    >
      <div className={styles.wrap}>
        <div className={styles.introduction}>
          <span className={styles.eyebrow}>Why SIVIM</span>
          <h2 id="home-why-title" className={styles.headline}>
            The right view.
            <span>The right people.</span>
          </h2>
          <a className={styles.contact} href="#contact">
            Let&apos;s plan your setup
          </a>
        </div>
        <ol className={styles.points}>
          {reasons.map((reason, index) => (
            <li key={reason}>
              <span className={styles.number} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{reason}</h3>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
