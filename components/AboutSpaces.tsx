import styles from "./AboutExperience.module.css";

/** Native scroll timelines reveal each line; the copy needs no hydration. */
export function AboutSpaces() {
  return (
    <div className={styles.installations}>
      <p className={styles.installationIntro}>We specialise in</p>
      <div className={styles.installationLines}>
        {["Home", "Business", "Workspace"].map((space) => (
          <div className={styles.installationRow} key={space}>
            <h3 className={styles.installationText}>
              {space} <span>installation.</span>
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
