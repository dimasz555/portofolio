"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { X, ChevronLeft, ChevronRight, ExternalLink, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { type Project } from "./ProjectCard";

export default function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const gallery = project.gallery || [project.thumbnail];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-2xl border border-primary/20 bg-card shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-lg bg-background/80 p-2 text-foreground/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col lg:flex-row max-h-[90vh]">
          <div className="relative w-full lg:w-1/2 h-64 lg:h-auto">
            <div className="relative h-full">
              <Image
                src={gallery[currentImageIndex]}
                alt={`${project.title} - ${currentImageIndex + 1}`}
                fill
                className="object-contain"
              />
              
              {gallery.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-lg bg-background/80 p-2 text-foreground/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-lg bg-background/80 p-2 text-foreground/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {gallery.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={cn(
                          "h-2 rounded-full transition-all",
                          index === currentImageIndex
                            ? "w-8 bg-primary"
                            : "w-2 bg-foreground/30 hover:bg-foreground/50"
                        )}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {gallery.length > 1 && (
              <div className="hidden lg:grid grid-cols-4 gap-2 p-4 bg-background/50">
                {gallery.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={cn(
                      "relative h-20 overflow-hidden rounded-lg border-2 transition-all",
                      index === currentImageIndex
                        ? "border-primary"
                        : "border-transparent hover:border-primary/50"
                    )}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="w-full lg:w-1/2 overflow-y-auto p-6 lg:p-8">
            <span className="mb-3 inline-block rounded-full border border-foreground/10 bg-foreground/5 px-3 py-1 text-xs text-foreground/60">
              {project.category}
            </span>

            <h2
              className="mb-4 text-3xl font-bold text-foreground"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {project.title}
            </h2>

            <p className="mb-6 text-sm leading-relaxed text-foreground/70">
              {project.description}
            </p>

            {project.features && project.features.length > 0 && (
              <div className="mb-6">
                <h3 className="mb-3 text-lg font-semibold text-foreground">
                  Kontribusi
                </h3>
                <div className="space-y-2">
                  {project.features.map((feature, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <p className="text-sm text-foreground/70">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-6">
              <h3 className="mb-3 text-lg font-semibold text-foreground">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-foreground/10 bg-foreground/5 px-3 py-1 text-xs text-foreground/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  Lihat di GitHub
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-primary bg-transparent px-4 py-2.5 text-sm font-semibold text-primary hover:bg-primary/10 transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  Lihat Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
