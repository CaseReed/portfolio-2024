import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import EditProjectForm from "./EditProjectForm";

async function getProject(id: number) {
  const project = await prisma.project.findUnique({
    where: { id },
  });
  if (!project) notFound();
  return project;
}

export default async function EditProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const projectId = parseInt(params.id, 10);
  const project = await getProject(projectId);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Edit Project: {project.title}</h1>
      <EditProjectForm project={project} />
    </div>
  );
}
