"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
//import { Project } from "@prisma/client";

type Inputs = {
  title?: string;
  description?: string;
  content?: string;
  technologies: string;
  liveLink?: string;
  githubLink?: string;
  challenges: string;
  solutions: string;
  images?: string;
};

type Project = {
  id: number;
  title: string;
  description: string;
  content: string;
  technologies: string[];
  liveLink?: string;
  githubLink?: string;
  challenges: string[];
  solutions: string[];
  images?: string;
  createdAt: Date;
  updatedAt: Date;
};

export default function EditProjectForm({ project }: { project: Project }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      ...project,
      technologies: project.technologies.join(", "),
      challenges: project.challenges.join(", "),
      solutions: project.solutions.join(", "),
      images: project.images || "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/projects/${project.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          technologies: data.technologies.split(",").map((tech) => tech.trim()),
          challenges: data.challenges
            .split(",")
            .map((challenge) => challenge.trim()),
          solutions: data.solutions
            .split(",")
            .map((solution) => solution.trim()),
        }),
      });

      if (response.ok) {
        router.push("/admin/projects");
        router.refresh();
      } else {
        throw new Error("Failed to update project");
      }
    } catch (error) {
      console.error("Error updating project:", error);
      alert("Failed to update project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          {...register("title", { required: "Title is required" })}
          id="title"
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          {...register("description", { required: "Description is required" })}
          id="description"
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        ></textarea>
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700"
        >
          Content
        </label>
        <textarea
          {...register("content", { required: "Content is required" })}
          id="content"
          rows={5}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        ></textarea>
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="technologies"
          className="block text-sm font-medium text-gray-700"
        >
          Technologies (comma-separated)
        </label>
        <input
          {...register("technologies", {
            required: "Technologies are required",
          })}
          id="technologies"
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.technologies && (
          <p className="mt-1 text-sm text-red-600">
            {errors.technologies.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="liveLink"
          className="block text-sm font-medium text-gray-700"
        >
          Live Link (optional)
        </label>
        <input
          {...register("liveLink")}
          id="liveLink"
          type="url"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>

      <div>
        <label
          htmlFor="githubLink"
          className="block text-sm font-medium text-gray-700"
        >
          GitHub Link (optional)
        </label>
        <input
          {...register("githubLink")}
          id="githubLink"
          type="url"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>

      <div>
        <label
          htmlFor="challenges"
          className="block text-sm font-medium text-gray-700"
        >
          Challenges (comma-separated)
        </label>
        <input
          {...register("challenges", { required: "Challenges are required" })}
          id="challenges"
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.challenges && (
          <p className="mt-1 text-sm text-red-600">
            {errors.challenges.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="solutions"
          className="block text-sm font-medium text-gray-700"
        >
          Solutions (comma-separated)
        </label>
        <input
          {...register("solutions", { required: "Solutions are required" })}
          id="solutions"
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.solutions && (
          <p className="mt-1 text-sm text-red-600">
            {errors.solutions.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="images"
          className="block text-sm font-medium text-gray-700"
        >
          Images (optional, comma-separated URLs)
        </label>
        <input
          {...register("images")}
          id="images"
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => router.push("/admin/projects")}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isSubmitting ? "Updating..." : "Update Project"}
        </button>
      </div>
    </form>
  );
}
