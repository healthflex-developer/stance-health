import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Stance Health",
    short_name: "Stance",
    description:
      "Evidence-backed Orthopaedic Rehab — medical science & technology tailored for your performance and recovery.",
    start_url: "/",
    display: "standalone",
    background_color: "#132644",
    theme_color: "#cdfe71",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
