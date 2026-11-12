import cameraImage from "@/assets/home-products/sivim-cctv-cameras.webp";
import recorderImage from "@/assets/home-products/sivim-dvr-nvr-recorders.webp";
import switchImage from "@/assets/home-products/sivim-poe-network-switches.webp";
import cableImage from "@/assets/home-products/sivim-cctv-cables-power-accessories.webp";
import conduitImage from "@/assets/home-products/sivim-pvc-conduits-electrical-accessories.webp";
import { HomeProductExplorer } from "./HomeProductExplorer";
import styles from "./HomeShowcase.module.css";

export { HomeWhyUs } from "./HomeWhyUs";

const productCategories = [
  {
    id: "cameras",
    name: "CCTV cameras",
    image: cameraImage.src,
    imageAlt: "Bullet and dome CCTV cameras",
    width: cameraImage.width,
    height: cameraImage.height,
    href: "/products/#ip-cameras",
  },
  {
    id: "recorders",
    name: "DVR & NVR recorders",
    image: recorderImage.src,
    imageAlt: "DVR and NVR recording systems",
    width: recorderImage.width,
    height: recorderImage.height,
    href: "/products/#nvr",
  },
  {
    id: "switches",
    name: "Network PoE switches",
    image: switchImage.src,
    imageAlt: "Eight-port and sixteen-port network PoE switches",
    width: switchImage.width,
    height: switchImage.height,
    href: "/products/#networking",
  },
  {
    id: "cables",
    name: "Cables & power accessories",
    image: cableImage.src,
    imageAlt:
      "Network and CCTV cables, connectors, power adapter and junction box",
    width: cableImage.width,
    height: cableImage.height,
    href: "/products/#accessories",
  },
  {
    id: "conduits",
    name: "PVC conduits & electrical accessories",
    image: conduitImage.src,
    imageAlt: "PVC pipes, conduit bends, junction boxes and mounting fittings",
    width: conduitImage.width,
    height: conduitImage.height,
    href: "/products/#pvc-conduits",
  },
] as const;

export function HomeProducts() {
  return (
    <section
      id="products"
      className={styles.products}
      aria-labelledby="home-products-title"
    >
      <div className="section-wrap">
        <h2 id="home-products-title" className={styles.productsTitle}>
          Our products.
        </h2>
        <HomeProductExplorer items={productCategories} />
      </div>
    </section>
  );
}
