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

const fallback = (src: string, alt: string, width: number, height: number, objectPosition = "50% 50%"): Photo => ({
  src: `/images/fotos/${src}`,
  alt,
  width,
  height,
  objectPosition,
});

// Photos from the brochures and the old school website, shown while a CMS gallery
// ("Seitenbilder → Schwerpunkt → … – Galerie") is still empty.
export const schwerpunktGalleryFallbacks: Record<"sport" | "makerspace" | "abgekocht", Photo[]> = {
  sport: [
    fallback("sport-judo.jpg", "Zwei Schülerinnen im Judoanzug beim Training", 989, 1400, "50% 35%"),
    fallback("sport-judo-halle.jpg", "Judostunde mit vielen Kindern auf den Matten in der Sporthalle", 1086, 611),
    fallback("sport-basketball.jpg", "Basketballteam der Stübi in Trikots in einer Reihe", 675, 380),
  ],
  makerspace: [
    fallback("makerspace-elektronik.jpg", "Zwei Kinder bauen gemeinsam an einer kleinen Elektronikschaltung", 989, 1400, "50% 40%"),
    fallback("makerspace-junge.jpg", "Ein Junge im Stübi-Makerspace-T-Shirt lächelt in die Kamera", 1043, 973),
    fallback("makerspace-loeten.jpg", "Ein Schüler lötet im Makerspace an einer Lochrasterplatine", 719, 379),
    fallback("makerspace-3d-regal.jpg", "Regal mit 3D-Druckern und Material im Makerspace", 1200, 900),
    fallback("makerspace-holz-bohren.jpg", "Ein Schüler schraubt in der Holzwerkstatt des Makerspace an einem Regal", 1620, 1080),
    fallback("makerspace-holz-team.jpg", "Schüler bauen mit ihrem Lehrer gemeinsam an einer Werkbank in der Holzwerkstatt", 1620, 1080),
  ],
  abgekocht: [
    fallback("abgekocht-kueche.jpg", "Ein Schüler mit Schürze brät in der Schulküche Fleisch für das Mittagessen", 989, 1400, "50% 35%"),
    fallback("abgekocht-schulgarten.jpg", "Schüler pflanzen Setzlinge in ein Hochbeet im Schulgarten", 1200, 900),
    fallback("abgekocht-schulgarten-erde.jpg", "Schüler schaufeln Erde für die neuen Hochbeete im Schulgarten", 1200, 900),
  ],
};

// Photos for the wide band between sections, shown while "Seitenbilder → … – Fotoband" is empty.
export const bandFallbacks: Record<"vision" | "bildungswege" | "anmeldung", Photo> = {
  // No children's faces in the wide band (Wunsch der Schule).
  vision: fallback("campus-gebaeude.jpg", "Das Schulgebäude am Stübenhofer Weg vor blauem Himmel", 2340, 1330, "40% 45%"),
  bildungswege: fallback("abitur-2025.jpg", "Der Abiturjahrgang 2025 jubelt mit Zeugnissen und Rosen in der Halle", 1400, 933, "50% 55%"),
  anmeldung: fallback("grundschule-lehrer.jpg", "Ein Lehrer und zwei Grundschulkinder lachen gemeinsam am Lerntisch", 1440, 782, "50% 35%"),
};
