/** Shared catalogue and public site configuration. */
import { business } from "./site-config";
import cameraImage from "@/assets/home-products/sivim-cctv-cameras.webp";
import recorderImage from "@/assets/home-products/sivim-dvr-nvr-recorders.webp";
import switchImage from "@/assets/home-products/sivim-poe-network-switches.webp";
import cableImage from "@/assets/home-products/sivim-cctv-cables-power-accessories.webp";
import conduitImage from "@/assets/home-products/sivim-pvc-conduits-electrical-accessories.webp";
export { business, socialChannels, whatsappLink } from "./site-config";

export const navigation = [
  { id: "home", label: "Home", href: "/#home" },
  { id: "about", label: "About us", href: "/#about" },
  { id: "services", label: "Services", href: "/services/" },
  { id: "products", label: "Products", href: "/products/" },
  { id: "why-us", label: "Why us", href: "/#why-us" },
  { id: "contact", label: "Contact", href: "/#contact" },
  { id: "faq", label: "FAQ", href: "/faq/" },
];

export const pageInfo = {
  services: {
    label: "Our services",
    title: "Every angle. Thought through.",
    description:
      "Explore CCTV installation, business and home surveillance, access control, remote-viewing setup and technical support from SIVIM in Chennai.",
  },
  products: {
    label: "Our products",
    title: "The right pieces. Working together.",
    description:
      "Explore SIVIM CCTV cameras, DVR and NVR recorders, PoE switches, cables, power accessories and PVC conduits. View or download the five product catalogues.",
  },
  contact: {
    label: "Let's talk",
    title: "Your space. Let's make it safer.",
    description:
      "Contact SIVIM in Royapuram, Chennai for CCTV products, installation enquiries, quotations and technical support.",
  },
  faq: {
    label: "A little clarity",
    title: "Good questions. Clear answers.",
    description:
      "Answers to questions about SIVIM surveillance products, installation, remote viewing, quotations, warranty and support.",
  },
  support: {
    label: "Here to help",
    title: "Support that stays with you.",
    description:
      "Contact SIVIM for installation guidance, CCTV and NVR troubleshooting, remote-viewing assistance and warranty enquiries.",
  },
  terms: {
    label: "The details",
    title: "Terms & conditions.",
    description:
      "Read SIVIM's existing terms for product usage, orders, delivery, installation, warranty and support.",
  },
} as const;

export type Section = keyof typeof pageInfo;

export const products = [
  {
    id: "ip-cameras",
    category: "Cameras",
    name: "CCTV cameras",
    shortName: "Cameras",
    description:
      "4MP, 5MP and 8MP IP Pro Colour, PTZ, motorized-lens and HD camera options.",
    imageAlt: "SIVIM bullet, turret and dome CCTV cameras",
    details: [
      "IP and HD camera options",
      "Fixed, motorized-lens and PTZ options",
      "Choose coverage, image detail and recording together",
    ],
    catalogue: "SIVIM_01_CCTV_Cameras.pdf",
    pages: 10,
    bytes: 8991997,
    image: cameraImage,
  },
  {
    id: "nvr",
    category: "Recording",
    name: "DVR & NVR recorders",
    shortName: "Recorders",
    description:
      "Recording systems with channel and storage options to suit your cameras.",
    imageAlt: "SIVIM CCTV recording equipment and network video recorders",
    details: [
      "DVR options for compatible analog systems",
      "NVR options for compatible IP cameras",
      "Plan camera channels, storage and playback",
    ],
    catalogue: "SIVIM_02_DVR_NVR_Recorders.pdf",
    pages: 2,
    bytes: 2065190,
    image: recorderImage,
  },
  {
    id: "networking",
    category: "Networking",
    name: "Network PoE switches",
    shortName: "PoE switches",
    description:
      "Connect compatible IP cameras and plan network capacity in one place.",
    imageAlt: "SIVIM network PoE switches with multiple camera ports",
    details: [
      "PoE network switches for compatible IP cameras",
      "Compare port count, uplinks and power budget",
      "Confirm camera and network compatibility",
    ],
    catalogue: "SIVIM_03_PoE_Network_Switches.pdf",
    pages: 2,
    bytes: 2079321,
    image: switchImage,
  },
  {
    id: "accessories",
    category: "Accessories",
    name: "Cables & power accessories",
    shortName: "Cables & power",
    description:
      "CAT6, CCTV combo cables, connectors, adapters and junction boxes.",
    imageAlt:
      "Network and CCTV cables, connectors, power supplies and junction boxes",
    details: [
      "CAT6 and CCTV combo cable options",
      "Connectors, power adapters and junction boxes",
      "Match cable runs and power to your system",
    ],
    catalogue: "SIVIM_04_Cables_Power_Accessories.pdf",
    pages: 2,
    bytes: 1473939,
    image: cableImage,
  },
  {
    id: "pvc-conduits",
    category: "Installation materials",
    name: "PVC conduits & electrical accessories",
    shortName: "Conduits & fittings",
    description:
      "Pipes, bends, hoses and boxes for a tidy, protected installation.",
    imageAlt: "PVC conduits, bends, pipes and electrical installation fittings",
    details: [
      "PVC pipes, hoses and conduit bends",
      "Junction boxes and ceiling boxes",
      "Plan sizes, routes and installation quantities",
    ],
    catalogue: "SIVIM_05_PVC_Conduits_Electrical_Accessories.pdf",
    pages: 5,
    bytes: 3462578,
    image: conduitImage,
  },
] as const;

export const services = [
  {
    id: "installation",
    number: "01",
    name: "CCTV installation & servicing",
    description:
      "Install CCTV cameras and service existing systems, including camera positioning, connections and recording checks.",
  },
  {
    id: "home",
    number: "02",
    name: "Home & office surveillance setup",
    description:
      "Plan camera positions and recording coverage for houses, apartments and offices.",
  },
  {
    id: "ip-analog-installation",
    number: "03",
    name: "IP & analog camera installation",
    description:
      "Set up IP or analog cameras with the right recorder, cabling and connections.",
  },
  {
    id: "wireless-cameras",
    number: "04",
    name: "Wireless camera setup",
    description:
      "Install Wi-Fi cameras, check signal coverage and configure power connections and supported viewing apps.",
  },
  {
    id: "cctv-amc",
    number: "05",
    name: "CCTV annual maintenance (AMC)",
    description:
      "Regular system checks, camera servicing and support under an agreed annual maintenance contract.",
  },
  {
    id: "network-cabling",
    number: "06",
    name: "Network cabling & DVR/NVR setup",
    description:
      "Install network cables and configure recording, storage and playback on a compatible DVR or NVR.",
  },
  {
    id: "business",
    number: "07",
    name: "Shop & warehouse surveillance",
    description:
      "Plan camera coverage for shop floors, stockrooms, warehouses and loading areas.",
  },
  {
    id: "access-control",
    number: "08",
    name: "Access control installation",
    description:
      "Set up compatible biometric door locks and RFID entry systems for controlled access.",
  },
  {
    id: "remote-viewing",
    number: "09",
    name: "Remote viewing setup",
    description:
      "Set up supported apps so you can view compatible cameras on your phone or computer.",
  },
  {
    id: "support",
    number: "10",
    name: "Technical support & troubleshooting",
    description:
      "Help with system configuration, recording issues, connection problems and warranty enquiries.",
  },
] as const;

export const faqs = [
  {
    category: "Getting started",
    q: "Can you help me choose the right CCTV system?",
    a: "Yes. Tell us about your property, the areas you want to cover and your recording needs. Our team can discuss suitable cameras, recording equipment and networking options before preparing a quotation.",
  },
  {
    category: "Getting started",
    q: "Do you provide installation support?",
    a: "Installation support is available on request. Share your location and requirements so we can confirm the scope, availability and any installation charges before you proceed.",
  },
  {
    category: "Products",
    q: "What products can I enquire about?",
    a: "Browse five product groups: CCTV cameras, DVR and NVR recorders, network PoE switches, cables and power accessories, and PVC conduits and electrical accessories. Confirm current models and availability with SIVIM before ordering.",
  },
  {
    category: "Products",
    q: "What is the difference between a DVR and an NVR?",
    a: "A DVR is generally used with analog cameras, while an NVR records footage from compatible IP cameras over a network. The right recorder depends on your cameras, channel requirements and storage needs.",
  },
  {
    category: "Products",
    q: "Can I view my cameras on my phone?",
    a: "Remote viewing depends on your camera or recorder, its supported app and an appropriate internet connection. Ask us about compatibility and setup guidance for the equipment you choose.",
  },
  {
    category: "Installation",
    q: "Can you install a system outside Chennai?",
    a: "Please share your location before booking. Our team will confirm installation availability, travel requirements and charges for your address. Product delivery and on-site installation are arranged separately.",
  },
  {
    category: "Installation",
    q: "How do I request an installation quote?",
    a: `Use our contact section to prepare an enquiry, message us on WhatsApp or call ${business.phone}. Your property type, city, areas to cover and approximate camera count help us understand the requirement.`,
  },
  {
    category: "Support",
    q: "What warranty is available?",
    a: "The existing SIVIM support policy states a one-year product warranty, with extended options on request. Confirm the applicable model-specific coverage, exclusions and claim process when purchasing. Keep your invoice and product serial number.",
  },
  {
    category: "Support",
    q: "How can I get technical assistance?",
    a: `Contact ${business.support} or call ${business.phone}. Share your product model and a brief description of the issue. Do not send camera passwords, private footage or account credentials.`,
  },
  {
    category: "Products",
    q: "What should I check before choosing a PoE switch?",
    a: "Check the number of camera ports, uplink speed, total power budget and compatibility with each camera. Share your camera models and cable distances so SIVIM can help you plan the network.",
  },
  {
    category: "Products",
    q: "Can I view and download SIVIM product catalogues?",
    a: "Yes. Each of the five product groups has its own PDF catalogue. Choose View catalogue to read it, or Download PDF to save a copy. Catalogue files load only when you open or download them.",
  },
  {
    category: "Products",
    q: "How can I get a price for CCTV products and installation?",
    a: "Choose a product group and send an enquiry on WhatsApp, or use the contact form. Include quantities, your location and whether you need installation. SIVIM will confirm specifications, availability and charges before you decide.",
  },
];

export const productFaqs = faqs.filter((item) => item.category === "Products");

export const terms = [
  [
    "Introduction",
    "By accessing and using our website and purchasing our CCTV and NVR products, you agree to be bound by these terms and conditions.",
  ],
  [
    "Product usage",
    "All products are intended for lawful surveillance and security purposes only. The misuse of our equipment for unauthorized recording is strictly prohibited.",
  ],
  [
    "Orders & payments",
    "All orders are subject to availability. Full payment must be made at the time of purchase unless otherwise agreed.",
  ],
  [
    "Delivery & installation",
    "We strive to deliver products within the estimated timeline. Installation support is provided where applicable and may incur additional charges.",
  ],
  [
    "Warranty & support",
    "All products come with a standard warranty period as mentioned on the product page. Extended warranties are available upon request.",
  ],
  [
    "Liability",
    "We are not liable for any damages arising from misuse or improper installation of our products. Please follow all usage and safety instructions provided.",
  ],
  [
    "Amendments",
    "We reserve the right to change these terms at any time. Continued use of our services constitutes acceptance of the revised terms.",
  ],
];
