import { NextResponse } from "next/server";
import { getProject, deleteProject } from "@/lib/projects";

export async function GET({ params }: { params: { id: string } }) {
  console.log("GET params", params.id);
  const id = parseInt(params.id, 10);
  const project = await getProject(id);

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json(project);
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
