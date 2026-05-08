import projectsRaw from "@/data/projects.json";
import type { PortfolioProject } from "@/types/portfolio";

export function getProjects(): PortfolioProject[] {
  return projectsRaw as PortfolioProject[];
}

export function getProjectById(id: string): PortfolioProject | undefined {
  return getProjects().find((project) => project.id === id);
}

export function getFlagshipProjects(): PortfolioProject[] {
  return getProjects().filter((project) => project.priority === "flagship");
}
