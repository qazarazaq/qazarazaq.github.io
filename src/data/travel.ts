export type TravelItem = {
  title: string;
  year: string;
  image: string;
  href: string;
};

export const travelItems: TravelItem[] = [
  {
    title: "Sapporo",
    year: "2026",
    image: "/travel/sapporo.jpg",
    href: "https://qazartrip.figma.site/sapporo/sapporo-2026",
  },
  {
    title: "Osaka",
    year: "2025",
    image: "/travel/osaka.jpg",
    href: "https://qazartrip.figma.site/osaka/osaka-2025",
  },
  {
    title: "Tokyo",
    year: "2024",
    image: "/travel/tokyo.jpg",
    href: "https://qazartrip.figma.site/tokyo/tokyo-2024",
  },
  {
    title: "Japan",
    year: "2022",
    image: "/travel/japan.jpg",
    href: "https://qazartrip.figma.site/japan/japan-2022",
  },
  {
    title: "Singapore",
    year: "2025",
    image: "/travel/singapore.jpg",
    href: "https://qazartrip.figma.site/singapore/singapore-2025",
  },
];
