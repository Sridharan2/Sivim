"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ComponentProps,
  type ReactNode,
} from "react";
import { Icon } from "./Icons";
import { business, navigation, whatsappLink } from "@/lib/content";
import styles from "./SiteHeader.module.css";

function subscribeToIntroPreference(onChange: () => void) {
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  motion.addEventListener("change", onChange);
  window.addEventListener("storage", onChange);
  return () => {
    motion.removeEventListener("change", onChange);
    window.removeEventListener("storage", onChange);
  };
}

function introIsEligible() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return false;
  try {
    return sessionStorage.getItem("sivim-camera-intro-seen") !== "1";
  } catch {
    return true;
  }
}

function LoadingIntro() {
  const eligible = useSyncExternalStore(
    subscribeToIntroPreference,
    introIsEligible,
    () => true,
  );
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);
  useEffect(() => {
    if (!eligible) return;
    let cancelled = false;
    let finished = false;
    let exitTimer: ReturnType<typeof setTimeout> | undefined;
    const finish = () => {
      if (cancelled || finished) return;
      finished = true;
      setLeaving(true);
      exitTimer = setTimeout(() => {
        if (cancelled) return;
        try {
          sessionStorage.setItem("sivim-camera-intro-seen", "1");
        } catch {
          /* The animation does not depend on storage access. */
        }
        setVisible(false);
      }, 180);
    };
    // The SVG intro must not download Home artwork or delay a ready page.
    const deadline = setTimeout(finish, 700);
    if (document.fonts) void document.fonts.ready.then(finish, finish);
    else finish();
    return () => {
      cancelled = true;
      clearTimeout(deadline);
      clearTimeout(exitTimer);
    };
  }, [eligible]);
  if (!visible || !eligible) return null;
  return (
    <div
      className={`loading-intro ${leaving ? "intro-leaving" : ""}`}
      aria-hidden="true"
    >
      <svg
        className="intro-camera"
        viewBox="0 0 240 200"
        fill="none"
        focusable="false"
      >
        <defs>
          <clipPath id="intro-camera-dome">
            <path
              d="M51 58v49a69 69 0 0 0 138 0V58Z"
              fill="white"
              stroke="none"
            />
          </clipPath>
        </defs>
        <rect x="38" y="24" width="164" height="34" rx="5" />
        <path d="M38 41h164M51 58v49a69 69 0 0 0 138 0V58" />
        <g clipPath="url(#intro-camera-dome)">
          <g className="intro-lens">
            <circle cx="120" cy="139" r="34" />
            <circle cx="120" cy="139" r="22" />
            <circle className="intro-iris" cx="120" cy="139" r="10" />
            <path d="M116 138a5 5 0 0 1 5-5" />
          </g>
        </g>
        <circle className="intro-led" cx="169" cy="79" r="6" />
      </svg>
      <p>Preparing your view</p>
      <div className="intro-progress">
        <span />
      </div>
    </div>
  );
}

function NavigationLink({
  href,
  ...props
}: Omit<ComponentProps<"a">, "href"> & { href: string }) {
  // Native anchors also scroll when the same fragment is clicked again.
  return href.includes("#") ? (
    <a {...props} href={href} />
  ) : (
    <Link {...props} href={href} />
  );
}

function Header({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const shell = useRef<HTMLDivElement>(null);
  const header = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const home = pathname === "/";
  useEffect(() => {
    let frame = 0;
    let disposed = false;
    const getAnchorOffset = () =>
      Number.parseFloat(
        window.getComputedStyle(document.documentElement).scrollPaddingTop,
      ) || 0;
    let anchorOffset = home ? getAnchorOffset() : 0;
    const sectionIds = navigation
      .filter((item) => item.id !== "faq")
      .map((item) => item.id);
    let targets: HTMLElement[] = [];
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 36);
      if (!home) return;
      if (targets.length !== sectionIds.length) {
        targets = sectionIds
          .map((id) => document.getElementById(id))
          .filter((element): element is HTMLElement => element !== null);
      }
      // Include the landing point of native anchors, including compact headers.
      const readingLine = Math.max(
        (header.current?.getBoundingClientRect().bottom ?? 120) + 24,
        anchorOffset + 1,
      );
      let current = "home";
      for (const target of targets) {
        if (target.getBoundingClientRect().top <= readingLine)
          current = target.id;
      }
      setActiveSection(current);
    };
    const schedule = () => {
      if (!disposed && !frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      anchorOffset = home ? getAnchorOffset() : 0;
      schedule();
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("hashchange", schedule);
    document.fonts.ready.then(schedule);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("hashchange", schedule);
    };
  }, [home, pathname]);
  useEffect(() => {
    if (!open) return;
    const menuShell = shell.current;
    const menuHeader = header.current;
    const menuToggle = toggle.current;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Keep the page behind the menu out of the keyboard and accessibility tree.
    const background = Array.from(menuShell?.parentElement?.children ?? [])
      .filter(
        (element): element is HTMLElement =>
          element instanceof HTMLElement &&
          element !== menuShell &&
          !["SCRIPT", "STYLE", "LINK"].includes(element.tagName),
      )
      .map((element) => ({ element, inert: element.inert }));
    background.forEach(({ element }) => {
      element.inert = true;
    });
    panel.current
      ?.querySelector<HTMLAnchorElement>("a")
      ?.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
      }
      if (event.key === "Tab") {
        const elements = Array.from(
          menuHeader?.querySelectorAll<HTMLElement>("a, button") ?? [],
        ).filter((element) => element.getClientRects().length > 0);
        const current = elements.indexOf(document.activeElement as HTMLElement);
        if (event.shiftKey && current <= 0) {
          event.preventDefault();
          elements.at(-1)?.focus({ preventScroll: true });
        } else if (
          !event.shiftKey &&
          (current === -1 || current === elements.length - 1)
        ) {
          event.preventDefault();
          elements[0]?.focus({ preventScroll: true });
        }
      }
    };
    const onResize = () => {
      if (window.innerWidth > 1100) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previous;
      background.forEach(({ element, inert }) => {
        element.inert = inert;
      });
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      if (menuShell?.contains(document.activeElement)) {
        const destination =
          window.innerWidth <= 1100
            ? menuToggle
            : menuHeader?.querySelector<HTMLAnchorElement>("a");
        destination?.focus({ preventScroll: true });
      }
    };
  }, [open]);
  const activeId = home ? activeSection : pathname.split("/")[1];
  return (
    <div
      ref={shell}
      className={styles.shell}
      data-open={open}
      role={open ? "dialog" : undefined}
      aria-modal={open ? true : undefined}
      aria-label={open ? "Main menu" : undefined}
    >
      <header ref={header} className={styles.header} data-scrolled={scrolled}>
        <Link
          href="/"
          className={styles.logo}
          aria-label={`${business.name} home`}
          onClick={() => setOpen(false)}
        >
          <picture>
            <source media="(max-width: 1100px)" srcSet={business.logoMark} />
            <img src={business.logo} alt="" width="154" height="61" />
          </picture>
        </Link>
        <nav className={styles.desktopNav} aria-label="Main navigation">
          {navigation.map((item) => (
            <NavigationLink
              className={styles.desktopLink}
              key={item.href}
              href={item.href}
              aria-current={
                activeId === item.id ? (home ? "location" : "page") : undefined
              }
            >
              {item.label}
            </NavigationLink>
          ))}
        </nav>
        <NavigationLink href="/#contact" className={styles.contactButton}>
          Get in touch
        </NavigationLink>
        <button
          ref={toggle}
          type="button"
          className={styles.menuButton}
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-haspopup="dialog"
          onClick={() => setOpen((value) => !value)}
        >
          <span className={styles.menuLabel} aria-hidden="true">
            {open ? "Close" : "Menu"}
          </span>
          <span className={styles.menuIcon} aria-hidden="true" />
        </button>
        <div
          id="mobile-menu"
          ref={panel}
          className={styles.panel}
          inert={!open}
          aria-hidden={!open}
        >
          <nav aria-label="Mobile navigation">
            {navigation.map((item) => (
              <NavigationLink
                className={styles.panelLink}
                href={item.href}
                key={item.href}
                onClick={() => setOpen(false)}
                aria-current={
                  activeId === item.id
                    ? home
                      ? "location"
                      : "page"
                    : undefined
                }
              >
                <span>{item.label}</span>
              </NavigationLink>
            ))}
          </nav>
          <a className={styles.phone} href={`tel:${business.tel}`}>
            <span>Call us</span>
            {business.phone}
          </a>
        </div>
      </header>
      <button
        className={styles.scrim}
        onClick={() => setOpen(false)}
        aria-label="Close navigation"
        aria-hidden="true"
        tabIndex={-1}
        disabled={!open}
      />
    </div>
  );
}

export function SiteChrome({
  children,
  footer,
}: {
  children: ReactNode;
  footer: ReactNode;
}) {
  const pathname = usePathname();
  const route = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      route.current?.animate([{ opacity: 0.85 }, { opacity: 1 }], {
        duration: 180,
        easing: "ease-out",
      });
  }, [pathname]);
  return (
    <>
      <LoadingIntro />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header key={pathname} pathname={pathname} />
      <div ref={route} className="route-content">
        {children}
      </div>
      {footer}
      <a
        className="whatsapp-float"
        href={whatsappLink(
          `Hi ${business.name}! I'd like to enquire about your products and installation solutions.`,
        )}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with ${business.name} on WhatsApp`}
      >
        <Icon name="whatsapp" size={26} />
        <span className="whatsapp-label">Chat with {business.name}</span>
      </a>
    </>
  );
}
