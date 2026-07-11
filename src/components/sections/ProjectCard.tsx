"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  category: string;
  thumbnail: string;
  liveUrl?: string;
  demoUrl?: string;
  gallery?: string[];
  features?: string[];
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-primary/20 bg-card cursor-pointer",
        "hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10",
        "transition-all duration-300"
      )}
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className={cn(
            "object-cover transition-all duration-500",
            isHovered ? "scale-110 blur-sm" : "scale-100 blur-0"
          )}
        />
        <div className="absolute inset-0 bg-linear-to-t from-card/90 to-transparent" />
        
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-[2px]"
            >
              <motion.button
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
              >
                Lihat Detail
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <span className="mb-3 w-fit rounded-full border border-foreground/10 bg-foreground/5 px-3 py-1 text-xs text-foreground/60">
          {project.category}
        </span>

        <h3
          className="mb-3 text-xl font-bold text-foreground"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {project.title}
        </h3>

        <p className="mb-4 flex-1 text-sm leading-relaxed text-foreground/60">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-foreground/10 bg-foreground/5 px-2.5 py-0.5 text-xs text-foreground/60 hover:border-primary/30 hover:text-foreground/80 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export type { Project };
