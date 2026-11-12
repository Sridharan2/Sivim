/** Explicit static-export sources; the browser chooses its supported format. */
export const heroCameraImage = {
  src: "/assets/hero-silver-camera.webp",
  srcSet:
    "/assets/hero-silver-camera-small.webp 768w, /assets/hero-silver-camera.webp 1536w",
  avifSrcSet:
    "/assets/hero-silver-camera-small.avif 768w, /assets/hero-silver-camera.avif 1536w",
  sizes:
    "(max-width: 800px) and (orientation: portrait) calc((100vw - 40px) * 1.85), (max-width: 1200px) 85vw, 1420px",
  width: 1536,
  height: 1024,
} as const;
