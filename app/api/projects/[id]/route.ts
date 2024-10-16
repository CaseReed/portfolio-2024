import { NextResponse } from "next/server";
import { getProject, deleteProject, updateProject } from "@/lib/projects";

export async function GET({ params }: { params: { id: string } }) {
  console.log("GET params", params.id);
  const id = parseInt(params.id, 10);
  const project = await getProject(id);

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json(project);
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const project = await updateProject({
      id: body.id,
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
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Error updating project" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = Number(params.id);

    if (!projectId) {
      return NextResponse.json(
        { error: "L'ID du projet est requis" },
        { status: 400 }
      );
    }

    await deleteProject(projectId);

    return NextResponse.json({ message: "Projet supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du projet :", error);
    return NextResponse.json(
      { error: "Impossible de supprimer le projet" },
      { status: 500 }
    );
  }
}
