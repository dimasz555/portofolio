"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "motion/react";
import { ArrowRight, Server, Database, Monitor, Wrench } from "lucide-react";

// Animation Variants

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
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

const slideLeftVariants: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const slideRightVariants: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const techStacks = [
  {
    id: "backend",
    icon: Server,
    label: "Back-End",
    items: ["Express.js", "Laravel", "REST API"],
  },
  {
    id: "database",
    icon: Database,
    label: "Database",
    items: ["MySQL", "PostgreSQL", "Prisma ORM"],
  },
  {
    id: "frontend",
    icon: Monitor,
    label: "Front-End",
    items: ["Laravel Blade","Next.js", "React", "Tailwind CSS", "Bootstrap", "Livewire"],
  },
  {
    id: "tools",
    icon: Wrench,
    label: "Tools",
    items: ["Git", "GitHub", "CI/CD", "Github Actions", "Postman"],
  },
];

// Sub-components

function SectionLabel() {
  return (
    <motion.div variants={slideUpVariants} className="flex items-center gap-3">
      <div className="h-px w-8 bg-primary" />
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
        Tentang Saya
      </span>
      <div className="h-px w-8 bg-primary" />
    </motion.div>
  );
}

function MainText() {
  return (
    <>
      <motion.h2
        variants={slideUpVariants}
        className="text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Membangun <span className="text-primary">Solusi Digital</span> yang
        Bermakna
      </motion.h2>

      <motion.p
        variants={slideUpVariants}
        className="mt-4 max-w-xl text-base leading-relaxed text-foreground/60 sm:text-lg"
      >
        <span className="font-semibold text-foreground">
          Full-Stack Web Developer
        </span>{" "}
        yang terbiasa mengembangkan aplikasi web end-to-end menggunakan Laravel
        dan JavaScript ecosystem, mulai dari perancangan database, pengembangan
        RESTful API, hingga deployment.
      </motion.p>

      <motion.p
        variants={slideUpVariants}
        className="mt-3 max-w-xl text-base leading-relaxed text-foreground/60 sm:text-lg"
      >
        Saat ini aktif sebagai{" "}
        <span className="font-semibold text-foreground">freelancer</span> dan
        terbuka untuk proyek kolaborasi, konsultasi teknis, maupun peluang kerja
        penuh waktu.
      </motion.p>
    </>
  );
}

function CtaLink() {
  return (
    <motion.div variants={slideUpVariants}>
      <a
        href="#projects"
        className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/70 transition-colors"
      >
        Lihat proyek saya
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </a>
    </motion.div>
  );
}

function TechStackCard({
  stack,
  variants,
}: {
  stack: (typeof techStacks)[0];
  variants: typeof slideLeftVariants;
}) {
  const Icon = stack.icon;
  return (
    <motion.div
      variants={variants}
      className="rounded-2xl border border-primary/20 bg-primary/5 p-5 backdrop-blur-sm"
    >
      <div className="mb-3 flex items-center gap-2">
        <div className="rounded-lg bg-primary/10 p-2">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <span
          className="text-sm font-bold text-foreground"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {stack.label}
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {stack.items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-foreground/10 bg-foreground/5 px-2.5 py-0.5 text-xs text-foreground/60 hover:border-primary/30 hover:text-foreground/80 transition-colors"
          >
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// Main Component

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden py-24 sm:py-32"
    >
      {/* Background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/4 top-1/2 -translate-y-1/2 h-125 rounded-full bg-primary/5 blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24 lg:items-start"
        >
          {/* ── Left Column: Bio ── */}
          <div className="flex flex-col gap-6">
            <SectionLabel />
            <MainText />
            <CtaLink />
          </div>

          {/* ── Right Column: Tech Stack ── */}
          <div className="flex flex-col gap-4">
            <motion.p
              variants={slideRightVariants}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/40"
            >
              Tech Stack
            </motion.p>
            {techStacks.map((stack, i) => (
              <TechStackCard
                key={stack.id}
                stack={stack}
                variants={i % 2 === 0 ? slideRightVariants : slideLeftVariants}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
