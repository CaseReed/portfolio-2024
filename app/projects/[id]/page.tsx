import { notFound } from "next/navigation";
import ProjectDetails from "@/components/ProjectDetails";
import { getProject } from "@/lib/projects";

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const projectId = parseInt(params.id, 10);
  const project = await getProject(projectId);

  if (!project) {
    notFound();
  }

  return <ProjectDetails project={project} />;
}
