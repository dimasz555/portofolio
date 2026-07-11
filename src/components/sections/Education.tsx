"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "motion/react";
import { cn } from "@/lib/utils";
import { GraduationCap, Calendar, Award } from "lucide-react";

interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  major?: string;
  period: string;
  gpa?: string;
  description: string;
}

const EDUCATION: EducationItem[] = [
  {
    id: "1",
    degree: "Sarjana Komputer (S1)",
    institution: "Universitas Tanjungpura",
    major: "Sistem Informasi",
    period: "2021 - 2025",
    gpa: "3.89",
    description:
      "Fokus pada pengembangan sistem informasi, analisis kebutuhan bisnis, dan implementasi solusi teknologi untuk meningkatkan efisiensi organisasi.",
  },
  {
    id: "2",
    degree: "Studi Independen",
    institution: "Binar Academy",
    major: "Backend JavaScript",
    period: "Agustus 2023 - Desember 2023",
    description:
      "Program intensif pengembangan backend dengan Node.js, Express, PostgreSQL, dan best practices dalam membangun RESTful API yang scalable dan secure.",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function SectionLabel() {
  return (
    <motion.div variants={slideUpVariants} className="flex items-center gap-3">
      <div className="h-px w-8 bg-primary" />
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
        Pendidikan
      </span>
      <div className="h-px w-8 bg-primary" />
    </motion.div>
  );
}

function EducationCard({ item }: { item: EducationItem }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8 }}
      className={cn(
        "group relative rounded-2xl border border-primary/20 bg-card/50 p-6 backdrop-blur-sm",
        "hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10",
        "transition-all duration-300"
      )}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3
            className="text-xl font-bold text-foreground"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {item.degree}
          </h3>
          <p className="mt-1 text-base font-semibold text-primary">
            {item.institution}
          </p>
          {item.major && (
            <p className="mt-0.5 text-sm text-foreground/60">{item.major}</p>
          )}
        </div>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <GraduationCap className="h-6 w-6 text-primary" />
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-4 text-sm text-foreground/60">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          <span>{item.period}</span>
        </div>
        {item.gpa && (
          <div className="flex items-center gap-1.5">
            <Award className="h-4 w-4" />
            <span>IPK: {item.gpa}</span>
          </div>
        )}
      </div>

      <p className="text-sm leading-relaxed text-foreground/60">
        {item.description}
      </p>

      <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
    </motion.div>
  );
}

export default function Education() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="education"
      ref={ref}
      className="relative overflow-hidden py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/3 top-1/4 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]"
      />

      <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="mb-12 text-center">
            <div className="mb-6 flex justify-center">
              <SectionLabel />
            </div>
            <motion.h2
              variants={slideUpVariants}
              className="text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Riwayat <span className="text-primary">Pendidikan</span>
            </motion.h2>
            <motion.p
              variants={slideUpVariants}
              className="mx-auto mt-4 max-w-2xl text-base text-foreground/60 sm:text-lg"
            >
              Perjalanan akademis dan pelatihan yang membentuk keahlian saya
            </motion.p>
          </div>

          <div className="space-y-6">
            {EDUCATION.map((edu) => (
              <EducationCard key={edu.id} item={edu} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
