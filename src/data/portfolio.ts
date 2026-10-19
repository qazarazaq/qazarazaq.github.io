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
    problem: "A withdrawal crosses two interfaces. Customers need to understand where to go, what they can collect, and how the app connects to the machine.",
    decisions: [
      { title: "Separate weight from cost", description: "Show the gold denomination and printing fee as distinct information. Keep the selected product and total fee visible as the customer compares options." },
      { title: "Make the next action explicit", description: "Use direct pickup instructions and a clear scan action to connect Livin’ to the ATM. Carry that clarity through to collecting the physical gold." },
      { title: "Organize locations by city", description: "Group the ATM directory by city, with a consistent name, address, and map action. A longer list stays useful when customers can scan their area first." },
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
    problem: "Dine-in and delivery start with different needs. Discovery should make those choices clear while keeping the ordering experience consistent.",
    decisions: [
      { title: "Keep dining modes distinct", description: "Give dine-in and delivery their own context, so customers can see which service they are choosing before committing to an order." },
      { title: "Make discovery easy to scan", description: "Use recognizable categories and consistent restaurant information. Keep menu imagery, item names, and prices readable in a compact mobile layout." },
      { title: "Keep the order understandable", description: "Maintain a clear relationship between selected items, quantities, and the total. Give payment a deliberate next step from the cart." },
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
  { title: "Kopra SCM", medium: "Wholesale banking", devices: ["laptop"] as const, description: "I worked on invoice overview, search, and status flows for customer-facing supply-chain banking, focusing on information hierarchy and consistent interactions.", screen: { src: "/work/kopra.webp", title: "Kopra SCM invoice search & status", caption: "A detail of invoice search, status tabs, and table structure. Customer records and account details are omitted.", width: 1138, height: 208 } },
  { title: "Livin Auto", medium: "Vehicle financing", devices: ["phone"] as const, description: "I worked on the journey and reusable mobile states for vehicle discovery, affordability simulation, and financing applications.", screen: { src: "/work/auto.webp", title: "Livin Auto vehicle detail", caption: "Vehicle variant, availability, price, and the continuation into credit simulation.", width: 375, height: 812 } },
  { title: "Sukha Donasi", medium: "Donations", devices: ["phone"] as const, description: "I worked on the donation flow from campaign context and amount selection to review and payment, keeping the interface consistent across steps.", screen: { src: "/work/donasi.webp", title: "Sukha Donasi amount selection", caption: "Preset and custom donation amounts for a conservation campaign.", width: 375, height: 812 } },
];
