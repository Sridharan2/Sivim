/** Public, build-time configuration. Never read secrets through this module. */
function text(value: string | undefined) {
  return value?.trim() ?? "";
}

function required(value: string | undefined, key: string) {
  const result = text(value);
  if (!result)
    throw new Error(`Missing ${key}. Copy .env.example to .env.local.`);
  return result;
}

function httpsUrl(value: string | undefined, hosts?: readonly string[]) {
  if (!text(value)) return null;
  try {
    const url = new URL(text(value));
    if (
      url.protocol !== "https:" ||
      url.username ||
      url.password ||
      url.port ||
      (hosts && !hosts.includes(url.hostname.toLowerCase()))
    )
      return null;
    return url;
  } catch {
    return null;
  }
}

function phone(value: string | undefined) {
  const label = text(value);
  if (!label) return null;
  const digits = label.replace(/\D/g, "");
  if (!/^[+\d\s().-]+$/.test(label) || !/^\d{7,15}$/.test(digits))
    throw new Error(
      "Use a valid public phone number in the contact environment variables.",
    );
  return { label, href: `tel:${label.startsWith("+") ? "+" : ""}${digits}` };
}

function email(value: string, key: string) {
  if (!/^[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(value))
    throw new Error(`Use a valid public email address in ${key}.`);
  return value;
}

function asset(value: string | undefined, fallback: string) {
  const path = text(value) || fallback;
  if (!/^\/assets\/[a-z0-9_./-]+$/i.test(path) || path.includes(".."))
    throw new Error("Brand image paths must point to files inside /assets/.");
  return path;
}

const name = required(
  process.env.NEXT_PUBLIC_COMPANY_NAME,
  "NEXT_PUBLIC_COMPANY_NAME",
);
const siteUrl = httpsUrl(process.env.NEXT_PUBLIC_SITE_URL);
if (!siteUrl)
  throw new Error("Set NEXT_PUBLIC_SITE_URL to the final HTTPS website URL.");
const primary = phone(
  required(process.env.NEXT_PUBLIC_PHONE_PRIMARY, "NEXT_PUBLIC_PHONE_PRIMARY"),
)!;
const contactEmail = email(
  required(process.env.NEXT_PUBLIC_CONTACT_EMAIL, "NEXT_PUBLIC_CONTACT_EMAIL"),
  "NEXT_PUBLIC_CONTACT_EMAIL",
);
const address = required(
  process.env.NEXT_PUBLIC_CONTACT_ADDRESS,
  "NEXT_PUBLIC_CONTACT_ADDRESS",
);
const whatsappNumber = required(
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  "NEXT_PUBLIC_WHATSAPP_NUMBER",
);
if (!/^\d{7,15}$/.test(whatsappNumber))
  throw new Error(
    "NEXT_PUBLIC_WHATSAPP_NUMBER must contain only the international number's digits.",
  );

const mapHosts = ["www.google.com", "google.com", "maps.google.com"];
const mapUrl = httpsUrl(process.env.NEXT_PUBLIC_MAP_URL, [
  ...mapHosts,
  "maps.app.goo.gl",
]);
const embedUrl = httpsUrl(process.env.NEXT_PUBLIC_MAP_EMBED_URL, mapHosts);
const mapEmbed =
  embedUrl &&
  (embedUrl.pathname.startsWith("/maps/embed") ||
    (embedUrl.pathname === "/maps" &&
      embedUrl.searchParams.get("output") === "embed"))
    ? embedUrl.toString()
    : null;
const validDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const openingDays = text(process.env.NEXT_PUBLIC_OPEN_DAYS)
  .split(",")
  .map((day) => day.trim())
  .filter((day) => validDays.includes(day));
const opens = text(process.env.NEXT_PUBLIC_OPEN_TIME);
const closes = text(process.env.NEXT_PUBLIC_CLOSE_TIME);
const timePattern = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

export const business = {
  name,
  url: siteUrl.origin,
  tagline: text(process.env.NEXT_PUBLIC_BRAND_TAGLINE),
  description: text(process.env.NEXT_PUBLIC_COMPANY_DESCRIPTION),
  logo: asset(process.env.NEXT_PUBLIC_LOGO_PATH, "/assets/logo.png"),
  logoMark: asset(
    process.env.NEXT_PUBLIC_LOGO_MARK_PATH,
    "/assets/logo-mark.png",
  ),
  phone: primary.label,
  tel: primary.href.slice(4),
  phones: [
    primary,
    phone(process.env.NEXT_PUBLIC_PHONE_SECONDARY),
    phone(process.env.NEXT_PUBLIC_PHONE_LANDLINE),
  ].filter((item): item is NonNullable<typeof item> => item !== null),
  email: contactEmail,
  support: email(
    text(process.env.NEXT_PUBLIC_SUPPORT_EMAIL) || contactEmail,
    "NEXT_PUBLIC_SUPPORT_EMAIL",
  ),
  address,
  street: text(process.env.NEXT_PUBLIC_STREET_ADDRESS) || address,
  city: text(process.env.NEXT_PUBLIC_CITY),
  region: text(process.env.NEXT_PUBLIC_REGION),
  country: text(process.env.NEXT_PUBLIC_COUNTRY),
  hours: text(process.env.NEXT_PUBLIC_BUSINESS_HOURS),
  openingHours:
    openingDays.length && timePattern.test(opens) && timePattern.test(closes)
      ? [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: openingDays,
            opens,
            closes,
          },
        ]
      : undefined,
  whatsapp: `https://wa.me/${whatsappNumber}`,
  mapUrl:
    mapUrl?.toString() ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`,
  mapEmbed,
};

export function whatsappLink(
  message = `Hi ${business.name}! I'd like to know more about your security solutions.`,
) {
  return `${business.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const socialChannels = [
  {
    name: "instagram",
    label: "Instagram",
    href: httpsUrl(process.env.NEXT_PUBLIC_INSTAGRAM_URL, [
      "instagram.com",
      "www.instagram.com",
    ])?.toString(),
  },
  {
    name: "facebook",
    label: "Facebook",
    href: httpsUrl(process.env.NEXT_PUBLIC_FACEBOOK_URL, [
      "facebook.com",
      "www.facebook.com",
      "m.facebook.com",
    ])?.toString(),
  },
  {
    name: "youtube",
    label: "YouTube",
    href: httpsUrl(process.env.NEXT_PUBLIC_YOUTUBE_URL, [
      "youtube.com",
      "www.youtube.com",
      "youtu.be",
    ])?.toString(),
  },
];
