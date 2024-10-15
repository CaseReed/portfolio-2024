import Link from "next/link";
import * as motion from "framer-motion/client";
import { Variants } from "framer-motion";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { Project } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

interface ProjectDetailsProps {
  project: Project;
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <motion.header
        className="bg-white dark:bg-gray-800 shadow-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Retour à l'accueil
          </Link>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="space-y-12"
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          <motion.section variants={fadeInUp}>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
              {project.title}
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              {project.description}
            </p>
          </motion.section>

          <motion.section
            variants={fadeInUp}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <Card className="col-span-2">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">
                  À propos du projet
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {project.content}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">Technologies</h2>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <Badge key={index} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="mt-6 space-y-4">
                  <Button
                    asChild
                    className={`w-full ${
                      !project.liveLink && "opacity-50 cursor-not-allowed"
                    }`}
                    disabled={!project.liveLink}
                  >
                    {project.liveLink ? (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Voir le projet en ligne
                      </a>
                    ) : (
                      <span>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Voir le projet en ligne
                      </span>
                    )}
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className={`w-full ${
                      !project.githubLink && "opacity-50 cursor-not-allowed"
                    }`}
                    disabled={!project.githubLink}
                  >
                    {project.githubLink ? (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="mr-2 h-4 w-4" />
                        Voir le code source
                      </a>
                    ) : (
                      <span>
                        <Github className="mr-2 h-4 w-4" />
                        Voir le code source
                      </span>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.section>

          <motion.section variants={fadeInUp}>
            <h2 className="text-2xl font-semibold mb-4">Défis et Solutions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-2">Défis</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {project.challenges.map((challenge, index) => (
                      <li
                        key={index}
                        className="text-gray-600 dark:text-gray-300"
                      >
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-2">Solutions</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {project.solutions.map((solution, index) => (
                      <li
                        key={index}
                        className="text-gray-600 dark:text-gray-300"
                      >
                        {solution}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.section>

          <motion.section variants={fadeInUp} className="text-center">
            <h2 className="text-2xl font-semibold mb-4">
              Intéressé par ce projet ?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              N'hésitez pas à me contacter pour en discuter ou pour voir
              d'autres projets similaires.
            </p>
            <div className="space-x-4">
              <Button asChild>
                <Link href="/#contact">Me contacter</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/#projects">Voir d'autres projets</Link>
              </Button>
            </div>
          </motion.section>
        </motion.div>
      </main>
    </div>
  );
}
