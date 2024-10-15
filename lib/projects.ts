import prisma from "@/lib/prisma";
import { Project } from "@prisma/client";

export async function getProjects(): Promise<Project[]> {
  try {
    return await prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw new Error("Could not fetch projects");
  }
}

export async function getProject(id: number): Promise<Project | null> {
  try {
    return await prisma.project.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error(`Error fetching project with ID ${id}:`, error);
    throw new Error("Could not fetch project");
  }
}
