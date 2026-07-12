export type PortfolioProject = {
  slug: string;
  title: string;
  organization: string;
  domain: string;
  problem: string;
  contribution: string;
  role: string;
  responsibilities: string[];
  platform: string[];
  year: string | null;
  projectStatus: string | null;
  caseStudyUrl: string | null;
  confidentiality: string;
  impact: string | null;
  tags: string[];
  systemMap: string[];
  approvedConstraints: string | null;
  approvedOutcome: string | null;
};

// Public-safe summaries only. Add dates, outcomes, URLs, and project-specific
// constraints here after confirming they are approved for publication.
export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "livin-auto",
    title: "Livin Auto",
    organization: "Bank Mandiri / Livin'",
    domain: "Automotive financing and digital banking",
    problem:
      "Automotive financing can become fragmented when users need to discover vehicles, understand options, simulate affordability, and continue into an application.",
    contribution:
      "Structured the journey into clearer decision points and reusable states for a mobile banking context.",
    role: "Product design, journey structure, and interface execution",
    responsibilities: [
      "Journey structure",
      "Interaction design",
      "Reusable UI states",
      "High-fidelity specification",
    ],
    platform: ["Mobile"],
    year: null,
    projectStatus: null,
    caseStudyUrl: null,
    confidentiality: "Public-safe summary",
    impact: null,
    tags: ["Digital banking", "Financing", "Complex journeys"],
    systemMap: ["Discover", "Compare", "Simulate", "Apply"],
    approvedConstraints: null,
    approvedOutcome: null,
  },
  {
    slug: "sukha-donasi",
    title: "Sukha Donasi",
    organization: "Bank Mandiri / Livin'",
    domain: "Donation experience inside a banking product",
    problem:
      "A giving journey needs emotional clarity while remaining fast, trustworthy, and consistent with a financial product.",
    contribution:
      "Connected campaign context, amount selection, donor details, review, and payment continuation into a coherent mobile flow.",
    role: "Product design, interaction design, and visual system execution",
    responsibilities: [
      "Flow definition",
      "State design",
      "Payment continuity",
      "Interface consistency",
    ],
    platform: ["Mobile"],
    year: null,
    projectStatus: null,
    caseStudyUrl: null,
    confidentiality: "Public-safe summary",
    impact: null,
    tags: ["Commerce", "Payments", "Mobile UX"],
    systemMap: ["Campaign", "Amount", "Review", "Payment"],
    approvedConstraints: null,
    approvedOutcome: null,
  },
  {
    slug: "kopra-scm",
    title: "Kopra SCM",
    organization: "Bank Mandiri",
    domain: "Corporate banking and supply-chain workflows",
    problem:
      "Enterprise workflows combine dense information, approvals, operational tasks, and status changes that must remain understandable for daily users.",
    contribution:
      "Brought hierarchy and reusable interaction patterns to complex task and account-receivable workflows.",
    role: "Product design, enterprise workflow design, and product UI",
    responsibilities: [
      "Workflow mapping",
      "Information hierarchy",
      "State consistency",
      "Handoff detail",
    ],
    platform: ["Responsive web"],
    year: null,
    projectStatus: null,
    caseStudyUrl: null,
    confidentiality: "Public-safe summary",
    impact: null,
    tags: ["Corporate banking", "Enterprise UX", "SCM"],
    systemMap: ["Task", "Approval", "Status", "History"],
    approvedConstraints: null,
    approvedOutcome: null,
  },
  {
    slug: "telkom-gealileo",
    title: "Telkom Gealileo",
    organization: "Telkom Indonesia",
    domain: "Enterprise procurement workflow",
    problem:
      "Procurement teams need to review documents, understand proposal stages, and coordinate uploads without losing operational context.",
    contribution:
      "Clarified progress, document states, and supporting information within a calmer enterprise workflow.",
    role: "Web UX, workflow clarity, and high-fidelity UI",
    responsibilities: [
      "Workflow structure",
      "Document states",
      "Progress visibility",
      "Interface refinement",
    ],
    platform: ["Web"],
    year: null,
    projectStatus: null,
    caseStudyUrl: null,
    confidentiality: "Public-safe summary",
    impact: null,
    tags: ["Procurement", "Enterprise UX", "Internal tools"],
    systemMap: ["Proposal", "Documents", "Review", "Progress"],
    approvedConstraints: null,
    approvedOutcome: null,
  },
];
