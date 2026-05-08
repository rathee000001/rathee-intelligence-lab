export type ProjectType =
  | "flagship-platform"
  | "deployed-website"
  | "artifact-backed"
  | "dashboard"
  | "financial-analysis"
  | "case-study";

export type LinkType =
  | "live"
  | "github"
  | "drive"
  | "tableau"
  | "pdf"
  | "presentation"
  | "spreadsheet"
  | "screenshot";

export type ProjectLink = {
  label: string;
  url: string;
  type: LinkType;
};

export type PortfolioProject = {
  id: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  status: "completed" | "current" | "in-development";
  semester: string;
  projectType: ProjectType;
  priority: "flagship" | "high" | "standard";
  cinematicTheme: "landing" | "gold" | "hershey" | "clean" | "marketing" | "finance" | "tableau" | "case";
  summary: string;
  problem: string;
  solution: string;
  businessValue: string;
  tools: string[];
  skills: string[];
  roles: string[];
  links: ProjectLink[];
  faculty?: string[];
  course?: string;
};
