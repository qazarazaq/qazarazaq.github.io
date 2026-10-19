export type ProjectScreen = {
  src: string;
  previewSrc?: string;
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
  problem: string;
  contribution: string;
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
    summary: "A connected mobile and ATM experience for withdrawing physical gold. The work spans finding a machine, understanding the available denominations, and knowing what to do next.",
    medium: "Mobile app + physical ATM",
    problem: "A withdrawal crosses two interfaces. Customers need to understand where to go, what they can collect, and how the app connects to the machine.",
    contribution: "UI/CX design across the mobile and ATM journey: pickup guidance, gold selection, fee presentation, and location information.",
    decisions: [
      { title: "Separate weight from cost", description: "Show the gold denomination and printing fee as distinct information. Keep the selected product and total fee visible as the customer compares options." },
      { title: "Make the next action explicit", description: "Use direct pickup instructions and a clear scan action to connect Livin’ to the ATM. Carry that clarity through to collecting the physical gold." },
      { title: "Organize locations by city", description: "Group the ATM directory by city, with a consistent name, address, and map action. A longer list stays useful when customers can scan their area first." },
    ],
    flow: ["Open Ambil Emas", "Choose gold account", "Find an ATM", "Scan at the machine", "Select & review gold", "Confirm & collect"],
    screens: [
      { src: "/work/gold-guide.webp", previewSrc: "/work/gold-guide-device.webp", title: "Mobile pickup guide", caption: "A clear scan action and a direct link to ATM locations.", width: 375, height: 812 },
      { src: "/work/gold-selection.webp", previewSrc: "/work/gold-selection-device.webp", title: "Denomination & fee", caption: "Brand, weight, printing fee, and selected total on the ATM.", width: 720, height: 1280, kind: "atm" },
      { src: "/work/gold-pickup.webp", previewSrc: "/work/gold-pickup-device.webp", title: "Physical pickup", caption: "Instructions point to the final action at the machine.", width: 720, height: 1280, kind: "atm" },
      { src: "/work/gold-locations.webp", title: "City-grouped ATM directory", caption: "Consistent location rows grouped by city, with a map action.", width: 750, height: 10318, kind: "directory" },
    ],
    publicUrl: "https://www.bankmandiri.co.id/livin/emas/ambil-emas-di-atm",
  },
  {
    slug: "livin-food",
    title: "Livin’ Food",
    headline: "From finding a meal to placing an order.",
    summary: "Food discovery and ordering inside Livin’. Different dining modes share a familiar path through restaurants, menus, the cart, and payment.",
    medium: "Mobile commerce",
    problem: "Dine-in and delivery start with different needs. Discovery should make those choices clear while keeping the ordering experience consistent.",
    contribution: "UI/CX design for discovery and category patterns, ordering states, cart detail, and the continuation into payment.",
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
      { src: "/work/food-checkout.webp", title: "Order review & payment", caption: "Selected items, delivery choices, the total, and the payment action.", width: 375, height: 1495 },
    ],
    publicUrl: "https://www.bankmandiri.co.id/livin/food",
  },
];

// Retained from the existing portfolio. Brief summaries avoid implying that
// additional case-study evidence or measured outcomes are available.
export const supportingProjects = [
  { title: "Kopra SCM", medium: "Desktop / wholesale banking", description: "Customer-facing supply-chain banking with dense information, task flows, approvals, and account-receivable states.", contribution: "Workflow mapping, information hierarchy, reusable interaction patterns, and interface detail.", screen: { src: "/work/kopra.webp", title: "Kopra SCM invoice submission", caption: "An empty invoice-entry state from the customer-facing wholesale workflow.", width: 2369, height: 1290 } },
  { title: "Livin Auto", medium: "Mobile / financing", description: "Vehicle discovery, affordability simulation, and the continuation into a financing application.", contribution: "Journey structure, interaction design, and reusable mobile UI states.", screen: { src: "/work/auto.webp", title: "Livin Auto vehicle detail", caption: "Vehicle variant, availability, price, and the continuation into credit simulation.", width: 375, height: 812 } },
  { title: "Sukha Donasi", medium: "Mobile / donations", description: "A donation journey connecting campaign context, amount selection, review, and payment.", contribution: "Flow definition, interface consistency, and payment continuity.", screen: { src: "/work/donasi.webp", title: "Sukha Donasi amount selection", caption: "Preset and custom donation amounts for a conservation campaign.", width: 375, height: 812 } },
];
