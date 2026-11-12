import Image from "next/image";
import type { SVGProps } from "react";
import { business } from "@/lib/site-config";
type Props = SVGProps<SVGSVGElement> & {
  name: string;
  size?: number;
};
/** Small, hand-drawn SVG vocabulary; no icon package or font dependency. */
export function Icon({ name, size = 22, ...props }: Props) {
  const forwardArrow = (
    <path d="M4 12h15.5m-5-4.5 5 4.5-5 4.5" strokeWidth="1.4" />
  );
  const paths: Record<string, React.ReactNode> = {
    arrow: forwardArrow,
    diagonal: forwardArrow,
    up: <path d="M12 20V4m-4.5 5 4.5-5 4.5 5" strokeWidth="1.4" />,
    plus: <path d="M5 12h14M12 5v14" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    shield: (
      <>
        <path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z" />
        <path d="m8 12 3 3 5-6" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r=".6" fill="currentColor" />
      </>
    ),
    facebook: (
      <path d="M14 22v-9h3l.5-4H14V7c0-1 .4-2 2-2h2V1h-3c-4 0-6 2-6 6v2H6v4h3v9" />
    ),
    youtube: (
      <>
        <path d="M21 7c-.3-2-1-3-3-3H6C4 4 3.3 5 3 7c-.5 3-.5 7 0 10 .3 2 1 3 3 3h12c2 0 2.7-1 3-3 .5-3 .5-7 0-10Z" />
        <path d="m10 8 6 4-6 4V8Z" />
      </>
    ),
    whatsapp: (
      <>
        <path d="M21 11.5a9 9 0 0 1-13.5 7.8L3 21l1.6-4.5A9 9 0 1 1 21 11.5Z" />
        <path d="m8 7 2 3-1 1c1 2 2 3 4 4l1-1 3 1c-1 3-4 2-7 0S5 9 8 7Z" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name] ?? paths.shield}
    </svg>
  );
}
export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand ${compact ? "brand-compact" : ""}`}>
      <Image
        src={compact ? business.logoMark : business.logo}
        alt={business.name}
        width={compact ? 45 : 172}
        height={compact ? 40 : 69}
        loading="eager"
      />
      {business.tagline && (
        <span className="brand-caption">{business.tagline}</span>
      )}
    </span>
  );
}
