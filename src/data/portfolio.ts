export type ProjectScreen = {
  src: string;
  title: string;
  caption: string;
  width: number;
  height: number;
  kind?: "directory" | "atm";
};

export type PortfolioProject = {
  slug: string;
  title: string;
  headline: string;
  summary: string;
  medium: string;
  devices: ("phone" | "laptop" | "atm")[];
  problem: string;
  decisions: { title: string; description: string }[];
  flow: string[];
  screens: ProjectScreen[];
  publicUrl: string;
};

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "livin-gold",
    title: "Livin’ Gold / ATM Emas",
    headline: "From a gold balance to gold in hand.",
    summary: "I designed pickup guidance, gold selection, fees, and location information across the mobile and ATM journey for withdrawing physical gold.",
    medium: "Mobile app and ATM",
    devices: ["phone", "atm"],
    problem: "Gold is selected in grams, while printing fees are paid in rupiah. Customers also move between Livin’ and a physical ATM, so the selected piece, cost, and pickup instructions need to stay clear.",
    decisions: [
      { title: "One piece, one clear total", description: "The selection is one piece from one brand. Weight and printing fee have separate labels, while a shared summary keeps the selected piece and total fee visible across the brand choices." },
      { title: "Give the handoff a primary action", description: "The mobile guide makes “Scan QR di ATM” the primary action and keeps ATM locations as a secondary link. Starting a pickup and finding a machine have different priorities, without needing separate entry screens." },
      { title: "Organize locations by city", description: "The directory is grouped by city. Each location keeps its name, address, and map action in one repeated row, so expanding the list does not change how a customer scans their area." },
    ],
    flow: ["Open Ambil Emas", "Choose gold account", "Find an ATM", "Scan at the machine", "Select & review gold", "Confirm & collect"],
    screens: [
      { src: "/work/gold-guide.webp", title: "Mobile pickup guide", caption: "A clear scan action and a direct link to ATM locations.", width: 375, height: 812 },
      { src: "/work/gold-selection.webp", title: "Denomination & fee", caption: "Brand, weight, printing fee, and selected total on the ATM.", width: 720, height: 1280, kind: "atm" },
      { src: "/work/gold-pickup.webp", title: "Physical pickup", caption: "Instructions point to the final action at the machine.", width: 720, height: 1280, kind: "atm" },
    ],
    publicUrl: "https://www.bankmandiri.co.id/livin/emas/ambil-emas-di-atm",
  },
  {
    slug: "livin-food",
    title: "Livin’ Food",
    headline: "From finding a meal to placing an order.",
    summary: "I worked on discovery, categories, ordering states, and cart detail for Livin’ Food, connecting dine-in and delivery journeys to payment.",
    medium: "Mobile commerce",
    devices: ["phone"],
    problem: "Customers need a dining mode, a way into a large menu of categories, and a cart that reflects whether a restaurant can still fulfil the order. Those states need to feel connected inside Livin’.",
    decisions: [
      { title: "Choose the dining context first", description: "Dine-in and delivery have distinct entry points before the restaurant and menu. The shared ordering structure stays familiar, while the chosen service gives discovery its context." },
      { title: "Keep categories consistent across states", description: "The same category artwork and labels carry across the scroll states, with “Terdekat” retained as a nearby shortcut. This accommodates a longer category set without changing the visual meaning of each choice." },
      { title: "Make unavailable carts distinguishable", description: "Saved carts distinguish restaurants that are available, closing, closed, or outside the delivery area. Availability belongs beside the saved order, where customers decide which cart to continue." },
    ],
    flow: ["Choose dining mode", "Discover a restaurant", "Choose menu items", "Review the cart", "Continue to payment"],
    screens: [
      { src: "/work/food-discovery.webp", title: "Restaurant discovery", caption: "Dining modes, categories, and restaurants in one entry point.", width: 375, height: 812 },
      { src: "/work/food-menu.webp", title: "Menu & item selection", caption: "A consistent product grid with visible names and prices.", width: 375, height: 812 },
      { src: "/work/food-cart.webp", title: "Saved cart states", caption: "Distinguish available, closing, closed, and out-of-range restaurants.", width: 375, height: 812 },
    ],
    publicUrl: "https://www.bankmandiri.co.id/livin/food",
  },
];

// Retained from the existing portfolio. Brief summaries avoid implying that
// additional case-study evidence or measured outcomes are available.
export const supportingProjects = [
  { title: "Kopra SCM", medium: "Wholesale banking", devices: ["laptop"] as const, description: "I worked on the invoice overview, search, and status flows. A shared workspace keeps status filters, invoice identifiers, buyers, amounts, and dates together, with row labels distinguishing the status of each invoice.", screen: { src: "/work/kopra.webp", title: "Kopra SCM invoice overview & status", caption: "Invoice overview and status variants from the original design. Profile details are excluded; identifying and financial record values are masked for public display.", width: 1154, height: 844 } },
  { title: "Livin Auto", medium: "Vehicle financing", devices: ["phone"] as const, description: "I worked on the journey and reusable mobile states for vehicle discovery, affordability simulation, and financing applications.", screen: { src: "/work/auto.webp", title: "Livin Auto vehicle detail", caption: "Vehicle variant, availability, price, and the continuation into credit simulation.", width: 375, height: 812 } },
  { title: "Sukha Donasi", medium: "Donations", devices: ["phone"] as const, description: "I worked on the donation flow from campaign context and amount selection to review and payment, keeping the interface consistent across steps.", screen: { src: "/work/donasi.webp", title: "Sukha Donasi amount selection", caption: "Preset and custom donation amounts for a conservation campaign.", width: 375, height: 812 } },
];
