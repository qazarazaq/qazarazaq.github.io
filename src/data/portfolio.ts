export type PortfolioLink = {
  label: "View Figma" | "View Behance";
  href: string;
  isPlaceholder?: boolean;
};

export type PortfolioProject = {
  slug: string;
  title: string;
  company: string;
  category: string;
  role: string;
  problem: string;
  contribution: string;
  tags: string[];
  links: PortfolioLink[];
  cover: string;
  accent: "blue" | "pink" | "gold" | "red";
};

// Replace placeholder URLs here when the exact Figma or Behance project links are ready.
export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "livin-auto",
    title: "Livin Auto",
    company: "Bank Mandiri / Livin'",
    category: "Financing / mobile banking",
    role: "Product design, UX flow, UI execution",
    problem:
      "Automotive financing can feel fragmented when users need to compare vehicles, understand loan options, and continue into application steps.",
    contribution:
      "Structured discovery, calculator, eligibility, and application moments into a clearer mobile banking flow.",
    tags: ["Mobile banking", "Financing", "Discovery", "Application flow"],
    cover: "/portfolio/portfolio-livin-auto-cover.jpg",
    accent: "blue",
    links: [
      {
        label: "View Figma",
        href: "https://www.figma.com/",
        isPlaceholder: true,
      },
      {
        label: "View Behance",
        href: "https://www.behance.net/wildanrazaq",
        isPlaceholder: true,
      },
    ],
  },
  {
    slug: "sukha-donasi",
    title: "Sukha Donasi",
    company: "Bank Mandiri / Livin'",
    category: "Donation / lifestyle commerce inside banking",
    role: "Product design, interaction, visual system execution",
    problem:
      "Donation flows inside banking need emotional clarity while still feeling fast, trustworthy, and payment-ready.",
    contribution:
      "Connected campaign discovery, nominal selection, donor details, and payment continuation into a clearer giving experience.",
    tags: ["Donation", "Sukha", "Payments", "Mobile UX"],
    cover: "/portfolio/portfolio-sukha-donasi-cover.jpg",
    accent: "pink",
    links: [
      {
        label: "View Figma",
        href: "https://www.figma.com/",
        isPlaceholder: true,
      },
      {
        label: "View Behance",
        href: "https://www.behance.net/wildanrazaq",
        isPlaceholder: true,
      },
    ],
  },
  {
    slug: "kopra-scm",
    title: "Kopra SCM",
    company: "Bank Mandiri",
    category: "Business / corporate banking platform",
    role: "UX simplification, workflow design, product UI",
    problem:
      "Corporate banking workflows often combine dense data, approvals, and operational tasks that can overwhelm daily users.",
    contribution:
      "Brought structure to enterprise flows across SCM, productivity, and complex task simplification.",
    tags: ["Corporate banking", "Enterprise UX", "SCM", "Productivity"],
    cover: "/portfolio/portfolio-kopra-scm-cover.jpg",
    accent: "gold",
    links: [
      {
        label: "View Figma",
        href: "https://www.figma.com/",
        isPlaceholder: true,
      },
      {
        label: "View Behance",
        href: "https://www.behance.net/wildanrazaq",
        isPlaceholder: true,
      },
    ],
  },
  {
    slug: "telkom-gealileo",
    title: "Telkom Gealileo",
    company: "Telkom Indonesia",
    category: "Enterprise procurement workflow",
    role: "Web UX, workflow clarity, high-fidelity UI",
    problem:
      "Procurement teams need to review documents, track proposal stages, and coordinate uploads without losing operational context.",
    contribution:
      "Clarified procurement progress, document upload states, and supporting information into a calmer enterprise workflow.",
    tags: ["Telkom", "Procurement", "Enterprise UX", "Workflow"],
    cover: "/portfolio/portfolio-telkom-gealileo-cover.jpg",
    accent: "red",
    links: [
      {
        label: "View Figma",
        href: "https://www.figma.com/",
        isPlaceholder: true,
      },
      {
        label: "View Behance",
        href: "https://www.behance.net/wildanrazaq",
        isPlaceholder: true,
      },
    ],
  },
];
