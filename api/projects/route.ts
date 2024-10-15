import { NextResponse } from "next/server";
import { getProjects } from "@/lib/projects";

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
