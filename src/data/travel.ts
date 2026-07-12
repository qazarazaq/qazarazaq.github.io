export type TravelItem = {
  id: string;
  location: string;
  country: string;
  year: string;
  image: string;
  width: number;
  height: number;
  imagePosition: string;
  alt: string;
  caption: string | null;
  href: string;
};

export const travelItems: TravelItem[] = [
  {
    id: "sapporo-2026",
    location: "Sapporo",
    country: "Japan",
    year: "2026",
    image: "/travel/sapporo.jpg",
    width: 800,
    height: 1200,
    imagePosition: "50% 50%",
    alt: "Snow-covered Sapporo street with a parking sign and vending machine",
    caption: null,
    href: "https://qazartrip.figma.site/sapporo/sapporo-2026",
  },
  {
    id: "osaka-2025",
    location: "Osaka",
    country: "Japan",
    year: "2025",
    image: "/travel/osaka.jpg",
    width: 900,
    height: 1200,
    imagePosition: "50% 50%",
    alt: "Nintendo Museum exterior beneath a cloudy sky",
    caption: null,
    href: "https://qazartrip.figma.site/osaka/osaka-2025",
  },
  {
    id: "tokyo-2024",
    location: "Tokyo",
    country: "Japan",
    year: "2024",
    image: "/travel/tokyo.jpg",
    width: 900,
    height: 1200,
    imagePosition: "50% 50%",
    alt: "Large bronze Buddha framed by dark tree branches",
    caption: null,
    href: "https://qazartrip.figma.site/tokyo/tokyo-2024",
  },
  {
    id: "japan-2022",
    location: "Japan",
    country: "Japan",
    year: "2022",
    image: "/travel/japan.jpg",
    width: 794,
    height: 1200,
    imagePosition: "58% 50%",
    alt: "Osaka Castle against a clear blue sky",
    caption: null,
    href: "https://qazartrip.figma.site/japan/japan-2022",
  },
  {
    id: "singapore-2025",
    location: "Singapore",
    country: "Singapore",
    year: "2025",
    image: "/travel/singapore.jpg",
    width: 900,
    height: 1200,
    imagePosition: "50% 50%",
    alt: "Supertree Grove illuminated in blue and purple at night",
    caption: null,
    href: "https://qazartrip.figma.site/singapore/singapore-2025",
  },
];
