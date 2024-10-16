"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { Project } from "@prisma/client";

import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type ProjectsListProps = {
  initialProjects: Project[];
};

export default function ProjectsList({ initialProjects }: ProjectsListProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isLoading, setIsLoading] = useState(true);
  const [projectToDelete, setProjectToDelete] = useState<number | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const confirmDelete = async () => {
    if (projectToDelete === null) return;

    try {
      const response = await fetch(`/api/projects/${projectToDelete}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Échec de la suppression du projet");
      }

      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== projectToDelete)
      );
      setProjectToDelete(null);
      toast.success("Projet supprimé avec succès.");
    } catch (error) {
      console.error("Échec de la suppression du projet :", error);
      toast.error(
        "Une erreur est survenue lors de la tentative de suppression du projet."
      );
    }
  };

  return (
    <AlertDialog>
      <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Projects List</h1>
          <div className="flex flex-row gap-x-2">
            <Button asChild variant="outline">
              <Link href="/">Return to home page</Link>
            </Button>
            <Button asChild>
              <Link href="/admin/add-project">Add New Project</Link>
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-left">Title</th>
                <th className="py-2 px-4 border-b text-left">Description</th>
                <th className="py-2 px-4 border-b text-left">Technologies</th>
                <th className="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading &&
                projects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{project.title}</td>
                    <td className="py-2 px-4 border-b">
                      {project.description.substring(0, 100)}...
                    </td>
                    <td className="py-2 px-4 border-b">
                      {project.technologies.join(", ")}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <Link
                        href={`/admin/projects/${project.id}/edit`}
                        className="text-blue-500 hover:text-blue-700 mr-2"
                      >
                        Edit
                      </Link>
                      <AlertDialogTrigger asChild>
                        <button
                          onClick={() => setProjectToDelete(project.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </AlertDialogTrigger>
                    </td>
                  </tr>
                ))}
              {projects.length === 0 && !isLoading && (
                <tr>
                  <td colSpan={4} className="py-2 px-4 border-b">
                    No projects found.
                  </td>
                </tr>
              )}
              {isLoading && (
                <tr>
                  <td colSpan={4} className="py-2 px-4 border-b">
                    Loading projects...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this project?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </div>
    </AlertDialog>
  );
}
