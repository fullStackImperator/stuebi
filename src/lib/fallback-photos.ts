import type { Photo } from "@/lib/photo";

// Brochure photos shown while the CMS slots ("Seitenbilder → Schwerpunkt") are still empty.
export const schwerpunktFallbacks: Record<"sport" | "makerspace" | "abgekocht", Photo> = {
  sport: {
    src: "/images/fotos/sport-fussball.jpg",
    alt: "Schüler spielen Fußball in der Sporthalle",
    width: 842,
    height: 625,
    objectPosition: "40% 55%",
  },
  makerspace: {
    src: "/images/fotos/makerspace-3d-drucker.jpg",
    alt: "Ein Schüler arbeitet im Makerspace an einem 3D-Drucker",
    width: 1046,
    height: 710,
    objectPosition: "60% 40%",
  },
  abgekocht: {
    src: "/images/fotos/abgekocht-kochen.jpg",
    alt: "Ein Junge brät Gemüse in der Schulküche beim Projekt Abgekocht",
    width: 1240,
    height: 1132,
    objectPosition: "50% 20%",
  },
};
