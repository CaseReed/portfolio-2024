import prisma from "@/lib/prisma";
import { Project } from "@prisma/client";

interface CreateProjectInput {
  title: string;
  description: string;
  content: string;
  technologies: string[];
  liveLink?: string;
  githubLink?: string;
  challenges: string[];
  solutions: string[];
  images?: string;
}

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

export async function createProject(
  data: CreateProjectInput
): Promise<Project> {
  try {
    return await prisma.project.create({
      data: data,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    throw new Error("Could not create project");
  }
}

export async function deleteProject(id: number): Promise<void> {
  try {
    await prisma.project.delete({
      where: {
        id,
      },
    });
    console.log(`Project with ID ${id} deleted successfully`);
  } catch (error) {
    console.error(`Error deleting project with ID ${id}:`, error);
    throw new Error("Could not delete project");
  }
}
