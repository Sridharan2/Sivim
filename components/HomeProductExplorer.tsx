"use client";

import Image from "next/image";
import {
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import styles from "./HomeShowcase.module.css";

type ProductCategory = {
  id: string;
  name: string;
  image: string;
  imageAlt: string;
  width: number;
  height: number;
  href: string;
};

/** One category stays open: a shared desktop preview and an inline mobile panel. */
export function HomeProductExplorer({
  items,
}: {
  items: readonly ProductCategory[];
}) {
  const [active, setActive] = useState(0);
  const explorer = useRef<HTMLDivElement>(null);
  const pendingTop = useRef<number | null>(null);

  useLayoutEffect(() => {
    const previousTop = pendingTop.current;
    pendingTop.current = null;
    if (
      previousTop === null ||
      !window.matchMedia("(max-width: 800px)").matches
    )
      return;
    const category = explorer.current?.querySelector<HTMLElement>(
      '[data-selected="true"]',
    );
    const button = category?.querySelector("button");
    const preview = category?.querySelector<HTMLElement>(
      "[data-product-preview]",
    );
    if (!button || !preview) return;
    const bounds = button.getBoundingClientRect();
    const clearance =
      (document.querySelector("header")?.getBoundingClientRect().bottom ?? 80) +
      16;
    const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
    const targetTop = Math.max(
      clearance,
      Math.min(
        previousTop,
        viewportHeight -
          bounds.height -
          preview.getBoundingClientRect().height -
          24,
      ),
    );
    // Correct the collapsed panel's height before paint, keeping the tapped row
    // and its new preview together without a second animated scroll.
    window.scrollBy({ top: bounds.top - targetTop, behavior: "instant" });
  }, [active]);

  const onKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number;
    if (event.key === "ArrowDown") next = (index + 1) % items.length;
    else if (event.key === "ArrowUp")
      next = (index + items.length - 1) % items.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = items.length - 1;
    else return;
    event.preventDefault();
    explorer.current
      ?.querySelectorAll<HTMLButtonElement>("[data-product-category]")
      [next]?.focus();
  };

  const onPreview = (event: PointerEvent<HTMLButtonElement>, index: number) => {
    if (
      event.pointerType === "mouse" &&
      window.matchMedia("(min-width: 801px) and (hover: hover)").matches &&
      !explorer.current?.querySelector("[data-product-preview]:focus-within")
    )
      setActive(index);
  };

  return (
    <div
      ref={explorer}
      className={styles.explorer}
      role="group"
      aria-label="Product categories"
    >
      {items.map((item, index) => {
        const selected = active === index;
        const buttonId = "home-category-" + item.id;
        const panelId = "home-preview-" + item.id;
        return (
          <div
            className={styles.category}
            data-selected={selected}
            key={item.id}
          >
            <h3 className={styles.categoryHeading}>
              <button
                id={buttonId}
                type="button"
                data-product-category=""
                aria-expanded={selected}
                aria-disabled={selected}
                aria-controls={panelId}
                onClick={(event) => {
                  if (active === index) return;
                  pendingTop.current = window.matchMedia("(max-width: 800px)")
                    .matches
                    ? event.currentTarget.getBoundingClientRect().top
                    : null;
                  setActive(index);
                }}
                onPointerEnter={(event) => onPreview(event, index)}
                onKeyDown={(event) => onKey(event, index)}
              >
                <span className={styles.categoryNumber} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={styles.categoryName}>{item.name}</span>
              </button>
            </h3>
            <div
              id={panelId}
              className={styles.productPreview}
              data-product-preview=""
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!selected}
              inert={!selected}
            >
              <div className={styles.previewClip}>
                <div className={styles.previewSurface}>
                  <Image
                    className={styles.previewImage}
                    src={item.image}
                    alt={item.imageAlt}
                    width={item.width}
                    height={item.height}
                    loading="lazy"
                    decoding="async"
                  />
                  <a
                    className={styles.catalogueLink}
                    href={item.href}
                    aria-label={"Explore " + item.name}
                  >
                    View products
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
