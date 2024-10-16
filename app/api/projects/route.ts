import { NextResponse } from "next/server";
import { getProjects, createProject } from "@/lib/projects";

export async function GET() {
  const projects = await getProjects();

  if (!projects) {
    return NextResponse.json(
      { error: "Could not fetch projects" },
      { status: 500 }
    );
  }

  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const project = await createProject({
      title: body.title,
      description: body.description,
      content: body.content,
      technologies: body.technologies,
      liveLink: body.liveLink,
      githubLink: body.githubLink,
      challenges: body.challenges,
      solutions: body.solutions,
      images: body.images,
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Error creating project" },
      { status: 500 }
    );
  }
}
