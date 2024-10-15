import Link from "next/link";
import Image from "next/image";
import * as motion from "framer-motion/client";
import { Variants } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

import ProfilImage from "@/app/images/profil-v2.png";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { getProjects } from "@/lib/projects";

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

// const projects: any[] = [
//   {
//     id: 1,
//     title: "Portfolio 2024",
//     description:
//       "Site web personnel de Julien Tavernier, développeur front-end spécialisé en création d'applications web modernes et performantes.",
//     link: "https://portfolio-2024.vercel.app/",
//   },
// ];

export default async function Home() {
  const projects = await getProjects();

  return (
    <div className="flex flex-col min-h-screen">
      <motion.header
        className="px-4 lg:px-6 h-14 flex items-center justify-between max-w-7xl mx-auto w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link className="flex items-center justify-center" href="#">
          <span className="sr-only">Votre nom</span>
          <span className="font-bold text-2xl">JT</span>
        </Link>
        <nav className="flex gap-4 sm:gap-6">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="#about"
            >
              À propos
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="#projects"
            >
              Projets
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="#contact"
            >
              Contact
            </Link>
          </motion.div>
        </nav>
      </motion.header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex items-center justify-center">
          <motion.div
            className="container px-4 md:px-6"
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            <div className="flex flex-col items-center space-y-4 text-center">
              <motion.div className="space-y-2" variants={fadeInUp}>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Bienvenue sur mon portfolio
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Je suis un développeur passionné spécialisé en création
                  d'applications web modernes et performantes.
                </p>
              </motion.div>
              <motion.div className="space-x-4" variants={fadeInUp}>
                <Button asChild>
                  <Link href="#contact">Me contacter</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="#projects">Voir mes projets</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <motion.section
          id="about"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="container px-4 md:px-6 max-w-5xl mx-auto">
            <motion.div
              className="grid gap-6 lg:grid-cols-2 items-center"
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <motion.div variants={fadeInUp}>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  À propos de moi
                </h2>
                <ul className="flex flex-col mt-4 gap-y-4 space-y-2">
                  <div className="flex flex-col">
                    <li className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Développement Front-end</span>
                    </li>
                    <p className="mt-2 text-sm text-gray-500">
                      Création d'interfaces utilisateur réactives et fluides,
                      intégration de designs via Figma, développement basé sur
                      les standards UX/UI.
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-2 whitespace-nowrap">
                      <Badge>React</Badge>
                      <Badge>Next.js</Badge>
                      <Badge>Tailwind CSS</Badge>
                      <Badge>TypeScript</Badge>
                      <Badge>Vue.js</Badge>
                      <Badge>Framer Motion</Badge>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <li className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Outils et Méthodes de Collaboration</span>
                    </li>
                    <p className="mt-2 text-sm text-gray-500">
                      Gestion des projets et collaboration avec les designers
                      pour garantir une cohérence visuelle des produits.
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-2 whitespace-nowrap">
                      <Badge>Figma</Badge>
                      <Badge>VS Code</Badge>
                      <Badge>Linear</Badge>
                      <Badge>Agile</Badge>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <li className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Optimisation et Performance</span>
                    </li>
                    <p className="mt-2 text-sm text-gray-500">
                      Techniques avancées pour garantir des expériences rapides
                      et réactives.
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-2 whitespace-nowrap">
                      <Badge>Tokenisation de thèmes</Badge>
                      <Badge>Optimisation des performances</Badge>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <li className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Gestion de Projets Web et SaaS</span>
                    </li>
                    <p className="mt-2 text-sm text-gray-500">
                      Développement de solutions pour divers secteurs :
                      cybersécurité, éducation, finance, et défense.
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-2 whitespace-nowrap">
                      <Badge>Cybersécurité</Badge>
                      <Badge>Éducation</Badge>
                      <Badge>Finance</Badge>
                      <Badge>Défense</Badge>
                      <Badge>Startup</Badge>
                    </div>
                  </div>
                </ul>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className="relative h-[300px] sm:h-[400px] rounded-lg overflow-hidden"
              >
                <Image
                  src={ProfilImage}
                  alt="Portrait de Julien Tavernier"
                  className="absolute inset-0 object-contain w-full h-full"
                  width={600}
                  height={400}
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          id="projects"
          className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Mes Projets
            </h2>
            <motion.div
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {projects.map((project, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card>
                    <CardHeader>
                      <CardTitle>{project.title}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button asChild>
                        <Link href={`/projects/${project.id}`}>
                          En savoir plus
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      </main>
      <motion.footer
        id="contact"
        className="py-6 w-full shrink-0 items-center px-4 md:px-6 border-t"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-center max-w-7xl mx-auto">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2024 Julien Tavernier. Tous droits réservés.
          </p>
          <nav className="flex gap-4 sm:gap-6 mt-4 sm:mt-0">
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
              <Link
                className="text-xs hover:underline underline-offset-4"
                href="https://github.com/CaseReed"
                target="_blank"
                rel="noreferrer"
              >
                <span className="sr-only">GitHub</span>
                <Github className="h-6 w-6" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
              <Link
                className="text-xs hover:underline underline-offset-4"
                href="https://www.linkedin.com/in/jtavernierpro/"
                target="_blank"
                rel="noreferrer"
              >
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
              <Link
                className="text-xs hover:underline underline-offset-4"
                href="mailto:julien.tavernier.pro@gmail.com"
                target="_blank"
                rel="noreferrer"
              >
                <span className="sr-only">Email</span>
                <Mail className="h-6 w-6" />
              </Link>
            </motion.div>
          </nav>
        </div>
      </motion.footer>
    </div>
  );
}
