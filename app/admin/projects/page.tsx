import ProjectsList from "./ProjectsList";
import { getProjects } from "@/lib/projects";

export const revalidate = 0; // This ensures the page is always up-to-date

export default async function ProjectsPage() {
  const initialProjects = await getProjects();

  return <ProjectsList initialProjects={initialProjects} />;
}
