"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { products, whatsappLink } from "@/lib/content";
import { Icon } from "./Icons";
import styles from "./ProductsCatalogue.module.css";

type Product = (typeof products)[number];
type Selection = { product: Product; mode: "details" | "catalogue" };

function catalogueUrl(product: Product) {
  return `/assets/catalogues/${product.catalogue}`;
}

function fileSize(bytes: number) {
  return `${(bytes / 1_000_000).toFixed(1)} MB`;
}

function DownloadIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12 3v11m-5-5 5 5 5-5M5 17v4h14v-4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Five ranges; PDF content is mounted only after an explicit catalogue request. */
export function ProductsCatalogue() {
  const [selection, setSelection] = useState<Selection | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!selection) return;
    const element = dialog.current;
    if (!element) return;
    const bodyOverflow = document.body.style.overflow;
    const rootOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    if (!element.open) element.showModal();
    element
      .querySelector<HTMLHeadingElement>("h2")
      ?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = bodyOverflow;
      document.documentElement.style.overflow = rootOverflow;
    };
  }, [selection]);

  const open = (
    product: Product,
    mode: Selection["mode"],
    button: HTMLButtonElement,
  ) => {
    opener.current = button;
    setSelection({ product, mode });
  };

  const onClose = () => {
    setSelection(null);
    if (opener.current?.isConnected)
      opener.current.focus({ preventScroll: true });
  };

  const catalogueActions = (product: Product, inDialog = false) => (
    <div className={styles.catalogueActions}>
      <button
        type="button"
        onClick={(event) => {
          if (inDialog) setSelection({ product, mode: "catalogue" });
          else open(product, "catalogue", event.currentTarget);
        }}
        aria-label={`View ${product.name} catalogue`}
      >
        View catalogue
      </button>
      <a
        href={catalogueUrl(product)}
        download={product.catalogue}
        aria-label={`Download ${product.name} catalogue PDF`}
      >
        <DownloadIcon /> Download PDF
      </a>
      <span className={styles.fileInfo}>
        PDF · {product.pages} pages · {fileSize(product.bytes)}
      </span>
    </div>
  );

  return (
    <>
      <section
        id="product-range"
        className={`section-wrap ${styles.range}`}
        aria-labelledby="range-title"
      >
        <div className={styles.rangeHeading}>
          <h2 id="range-title">The complete picture.</h2>
          <p>Five product ranges. Explore the details at your pace.</p>
        </div>
        <nav className={styles.jumpLinks} aria-label="Jump to a product range">
          {products.map((product) => (
            <a key={product.id} href={`#${product.id}`}>
              {product.shortName}
            </a>
          ))}
        </nav>
        <div className={styles.grid}>
          {products.map((product, index) => (
            <article className={styles.card} id={product.id} key={product.id}>
              <div className={styles.photo}>
                <span className={styles.number} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className={styles.copy}>
                <span className={styles.category}>{product.category}</span>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <button
                  type="button"
                  className={styles.detailButton}
                  onClick={(event) =>
                    open(product, "details", event.currentTarget)
                  }
                  aria-label={`View ${product.name} details`}
                >
                  View details{" "}
                  <span className={styles.plus} aria-hidden="true" />
                </button>
                {catalogueActions(product)}
              </div>
            </article>
          ))}
        </div>
        <p className={styles.rangeNote}>
          Catalogues are reference documents. Confirm current models,
          compatibility, availability and pricing with our team.
        </p>
      </section>

      <dialog
        ref={dialog}
        className={styles.dialog}
        aria-labelledby="product-dialog-title"
        onClose={onClose}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        {selection && (
          <>
            <div className={styles.dialogHeader}>
              <p>
                {selection.mode === "catalogue"
                  ? "SIVIM / Product catalogue"
                  : selection.product.category}
              </p>
              <button
                className={styles.close}
                type="button"
                onClick={() => dialog.current?.close()}
                aria-label="Close product viewer"
              >
                Close <Icon name="close" size={16} />
              </button>
            </div>
            {selection.mode === "details" ? (
              <div className={styles.detail}>
                <div className={styles.dialogPhoto}>
                  <Image
                    src={selection.product.image}
                    alt={selection.product.imageAlt}
                    decoding="async"
                  />
                </div>
                <div className={styles.dialogCopy}>
                  <h2 id="product-dialog-title" tabIndex={-1}>
                    {selection.product.name}
                  </h2>
                  <p>{selection.product.description}</p>
                  <ul>
                    {selection.product.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                  {catalogueActions(selection.product, true)}
                  <a
                    className={styles.whatsapp}
                    href={whatsappLink(
                      `Hi SIVIM! I'm interested in ${selection.product.name}. Please share available models, specifications and a quotation.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon name="whatsapp" size={21} /> Ask about this range
                  </a>
                  <p className={styles.confirmation}>
                    Share quantities and your location for a more useful
                    quotation.
                  </p>
                </div>
              </div>
            ) : (
              <div className={styles.reader}>
                <div className={styles.readerTools}>
                  <div>
                    <h2 id="product-dialog-title" tabIndex={-1}>
                      {selection.product.name}
                    </h2>
                    <p>
                      {selection.product.pages} pages · PDF ·{" "}
                      {fileSize(selection.product.bytes)}
                    </p>
                  </div>
                  <nav aria-label="Catalogue actions">
                    <button
                      type="button"
                      onClick={() =>
                        setSelection({
                          product: selection.product,
                          mode: "details",
                        })
                      }
                    >
                      Product details
                    </button>
                    <a
                      href={catalogueUrl(selection.product)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open PDF
                    </a>
                    <a
                      href={catalogueUrl(selection.product)}
                      download={selection.product.catalogue}
                    >
                      <DownloadIcon /> Download
                    </a>
                  </nav>
                </div>
                <iframe
                  key={selection.product.id}
                  src={`${catalogueUrl(selection.product)}#view=FitH`}
                  title={`${selection.product.name} PDF catalogue`}
                  referrerPolicy="no-referrer"
                />
                <p className={styles.readerHint}>
                  If your browser cannot display the document here, choose Open
                  PDF or Download.
                </p>
              </div>
            )}
          </>
        )}
      </dialog>
    </>
  );
}
