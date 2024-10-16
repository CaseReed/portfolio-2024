"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { Project } from "@prisma/client";

import { toast } from "sonner";

type ProjectsListProps = {
  initialProjects: Project[];
};

export default function ProjectsList({ initialProjects }: ProjectsListProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleDelete = async (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) {
      try {
        const response = await fetch(`/api/projects/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Échec de la suppression du projet");
        }

        setProjects((prevProjects) =>
          prevProjects.filter((project) => project.id !== id)
        );
        // alert("Projet supprimé avec succès.");
        toast.success("Projet supprimé avec succès.");
      } catch (error) {
        console.error("Échec de la suppression du projet :", error);
        alert(
          "Une erreur est survenue lors de la tentative de suppression du projet."
        );
      }
    }
  };

  if (isLoading) {
    return <div>Loading projects...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projects List</h1>
        <div className="flex flex-row gap-x-2">
          <Link
            href="/"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Return home page
          </Link>
          <Link
            href="/admin/add-project"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add New Project
          </Link>
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
            {projects.map((project) => (
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
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
