import Link from "next/link";
import { business, socialChannels } from "@/lib/site-config";
import { Brand, Icon } from "./Icons";
import styles from "./ContactFooter.module.css";

/** Public contact information is rendered once, in the footer. */
export function ContactFooter() {
  return (
    <footer id="footer" className={styles.footer}>
      <div className="section-wrap">
        <div className={styles.contactCard}>
          <div className={styles.contactItem}>
            <span className={styles.label}>Call us</span>
            {business.phones.map((phone) => (
              <a key={phone.href} href={phone.href}>
                {phone.label}
              </a>
            ))}
          </div>
          <div className={styles.contactItem}>
            <span className={styles.label}>Email us</span>
            <a href={`mailto:${business.email}`}>{business.email}</a>
            {business.support !== business.email && (
              <a href={`mailto:${business.support}`}>{business.support}</a>
            )}
          </div>
          <div className={styles.contactItem}>
            <span className={styles.label}>Visit us</span>
            <a href={business.mapUrl} target="_blank" rel="noopener noreferrer">
              {business.address}
            </a>
          </div>
        </div>
        <div className={styles.main}>
          <div className={styles.brand}>
            <Link href="/" aria-label={`${business.name} home`}>
              <Brand />
            </Link>
            {business.description && <p>{business.description}</p>}
            {business.hours && <p className={styles.hours}>{business.hours}</p>}
            <Link className={styles.enquiry} href="/#contact">
              Talk to our team
            </Link>
            <div className={styles.socials} aria-label="Social channels">
              {socialChannels.map((channel) =>
                channel.href ? (
                  <a
                    key={channel.name}
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${business.name} on ${channel.label}`}
                  >
                    <Icon name={channel.name} size={19} />
                  </a>
                ) : (
                  <span
                    key={channel.name}
                    className={styles.unavailable}
                    role="img"
                    aria-label={`${channel.label} profile coming soon`}
                  >
                    <Icon name={channel.name} size={19} />
                  </span>
                ),
              )}
            </div>
          </div>
          <div className={styles.location}>
            <span className={styles.label}>Our location</span>
            <div className={styles.map}>
              {business.mapEmbed ? (
                <iframe
                  src={business.mapEmbed}
                  title={`${business.name} location map`}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : (
                <a
                  className={styles.mapPlaceholder}
                  href={business.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <strong>{business.city || business.name}</strong>
                  <span>Find us on Google Maps</span>
                </a>
              )}
              <a
                className={styles.mapLink}
                href={business.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get directions
              </a>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <span>
            &copy; {new Date().getFullYear()} {business.name}. All rights
            reserved.
          </span>
          <nav aria-label="Footer links">
            <Link href="/terms/">Terms &amp; conditions</Link>
            <Link href="/support/">Support</Link>
          </nav>
          <a href="#main-content">
            Back to top <Icon name="up" size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
