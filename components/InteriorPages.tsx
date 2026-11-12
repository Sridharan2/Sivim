"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "./Icons";
import { ContactSection } from "./ContactSection";
import {
  business,
  faqs,
  pageInfo,
  services,
  terms,
  type Section,
} from "@/lib/content";

type InteriorSection = Exclude<Section, "products">;

function PageHero({ section }: { section: InteriorSection }) {
  const page = pageInfo[section];
  if (section === "services") {
    const image = "/assets/services/installation-team";
    return (
      <section
        className={`page-hero page-hero-commerce page-hero-${section}`}
        aria-labelledby="page-title"
      >
        <picture className="commerce-backdrop">
          <source
            media="(max-width: 800px)"
            type="image/avif"
            srcSet={`${image}-mobile.avif`}
          />
          <source type="image/avif" srcSet={`${image}.avif`} />
          <source media="(max-width: 800px)" srcSet={`${image}-mobile.webp`} />
          <img
            src={`${image}.webp`}
            alt=""
            width={1672}
            height={941}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div className="section-wrap">
          <div className="commerce-copy">
            <h1 id="page-title">
              CCTV installation.
              <span>Care in every connection.</span>
            </h1>
            <p>
              Installation, setup and maintenance for your home, business or
              workspace.
            </p>
            <div className="commerce-actions">
              <a href="#service-range" className="button button-orange">
                View services
              </a>
              <Link href="/contact/" className="commerce-enquiry">
                Installation enquiry
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }
  const photographic = ["faq", "terms", "support"].includes(section);
  return (
    <div className={`page-hero${photographic ? " page-hero-image" : ""}`}>
      <div className="section-wrap">
        <h1>{page.title}</h1>
        <p>{page.description}</p>
      </div>
    </div>
  );
}

function ServicesPage() {
  return (
    <div className="section-wrap page-body services-browser" id="service-range">
      <div className="service-intro">
        <h2>Our services.</h2>
        <p>From a new installation to keeping your system running.</p>
      </div>
      <div className="service-list">
        {services.map((service) => (
          <details
            className="service-item"
            id={service.id}
            key={service.id}
            open={service.id === "installation"}
          >
            <summary className="service-summary">
              <h3>
                <span className="service-number" aria-hidden="true">
                  {service.number}
                </span>
                <span>{service.name}</span>
                <span className="service-toggle" aria-hidden="true" />
              </h3>
            </summary>
            <div className="service-detail">
              <p>{service.description}</p>
              <Link href="/contact/" className="service-link">
                Discuss this service
                <span className="sr-only">: {service.name}</span>
              </Link>
            </div>
          </details>
        ))}
      </div>
      <div className="availability-note">
        <div>
          <strong>Tell us about your space.</strong>
          <p>
            Share your location. We&apos;ll confirm installation scope,
            availability and charges before you decide.
          </p>
        </div>
        <Link href="/contact/" className="button button-dark">
          Request an installation quote
        </Link>
      </div>
    </div>
  );
}

function FAQPage() {
  const [category, setCategory] = useState("All questions");
  const [query, setQuery] = useState("");
  const filtered = faqs.filter(
    (item) =>
      (category === "All questions" || item.category === category) &&
      `${item.q} ${item.a}`.toLowerCase().includes(query.trim().toLowerCase()),
  );
  return (
    <div className="section-wrap page-body faq-layout">
      <aside>
        <span className="eyebrow">FIND YOUR ANSWER</span>
        <label className="sr-only" htmlFor="faq-search">
          Search questions
        </label>
        <input
          id="faq-search"
          className="faq-search"
          type="search"
          placeholder="What would you like to know?"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          maxLength={150}
        />
        <div className="faq-categories">
          {[
            "All questions",
            "Getting started",
            "Products",
            "Installation",
            "Support",
          ].map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setCategory(item)}
              className={item === category ? "selected" : ""}
              aria-pressed={item === category}
            >
              {item}
              <Icon name="arrow" size={16} />
            </button>
          ))}
        </div>
        <p>Something else on your mind?</p>
        <Link className="text-link" href="/contact/">
          Let&apos;s talk <Icon name="diagonal" size={17} />
        </Link>
      </aside>
      <div className="faq-list">
        <p className="result-count" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "answer" : "answers"}
        </p>
        {filtered.map((item, index) => (
          <details key={item.q}>
            <summary>
              <span className="faq-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{item.q}</span>
              <Icon name="plus" size={20} />
            </summary>
            <p>{item.a}</p>
          </details>
        ))}
        {filtered.length === 0 && (
          <div className="empty-questions">
            <h2>Let&apos;s answer that together.</h2>
            <p>Try another search, or send your question to our team.</p>
            <Link href="/contact/" className="button button-dark">
              Contact SIVIM <Icon name="arrow" size={17} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function SupportPage() {
  return (
    <div className="section-wrap page-body support-layout">
      <div>
        <span className="eyebrow">PRODUCTS. PEOPLE. SUPPORT.</span>
        <h2>
          Let&apos;s get you
          <br />
          back in focus.
        </h2>
        <p>
          For installation guidance, NVR setup, remote-viewing questions or a
          warranty enquiry, get in touch with the product model and a short
          description of the issue.
        </p>
        <a
          href={`mailto:${business.support}?subject=SIVIM%20support%20enquiry`}
          className="button button-dark"
        >
          Email support <Icon name="mail" size={20} />
        </a>
        <a href={`tel:${business.tel}`} className="support-call">
          Or call {business.phone}
        </a>
      </div>
      <div className="support-panel">
        <Icon name="shield" size={42} />
        <h3>Keeping your warranty clear.</h3>
        <p>
          The existing SIVIM support policy states a one-year product warranty.
          Confirm your model&apos;s applicable terms and any extended options at
          purchase.
        </p>
        <ul>
          <li>Keep your purchase invoice.</li>
          <li>Have the product model and serial number ready.</li>
          <li>Describe the issue before arranging a visit or return.</li>
        </ul>
        <a
          href={`mailto:${business.support}?subject=SIVIM%20warranty%20enquiry`}
          className="text-link"
        >
          Ask about your warranty <Icon name="diagonal" size={18} />
        </a>
      </div>
    </div>
  );
}

function TermsPage() {
  return (
    <div className="section-wrap page-body terms-content">
      <p className="terms-date">Existing policy · Last updated May 30, 2025</p>
      {terms.map(([title, body], index) => (
        <article key={title}>
          <span>0{index + 1}</span>
          <div>
            <h2>{title}</h2>
            <p>{body}</p>
          </div>
        </article>
      ))}
      <Link className="text-link" href="/contact/">
        A question about these terms? Get in touch.{" "}
        <Icon name="arrow" size={18} />
      </Link>
    </div>
  );
}

export default function InteriorPage({
  section,
}: {
  section: InteriorSection;
}) {
  return (
    <main id="main-content" className="interior-main" data-page={section}>
      <PageHero section={section} />
      {section === "services" ? (
        <ServicesPage />
      ) : section === "faq" ? (
        <FAQPage />
      ) : section === "contact" ? (
        <ContactSection standalone />
      ) : section === "support" ? (
        <SupportPage />
      ) : (
        <TermsPage />
      )}
    </main>
  );
}
