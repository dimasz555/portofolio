"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Types
interface StatItem {
  count: number;
  label: string;
}

// Data
const TYPED_WORDS = ["Full Stack Developer.", "Backend Specialist."];

const STATS: StatItem[] = [
  { count: 2, label: "Tahun Pengalaman" },
  { count: 6, label: "Proyek Selesai" },
  { count: 15, label: "Teknologi Digunakan" },
];

// Hooks

function useTyped(words: string[]) {
  const [display, setDisplay] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex];
    const speed = deleting ? 50 : 90;

    const timeout = setTimeout(() => {
      if (!deleting) {
        const next = word.slice(0, display.length + 1);
        setDisplay(next);
        if (next.length === word.length) {
          setTimeout(() => setDeleting(true), 1600);
        }
      } else {
        const next = word.slice(0, display.length - 1);
        setDisplay(next);
        if (next.length === 0) {
          setDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [display, deleting, wordIndex, words]);

  return display;
}

function useCountUp(target: number, duration = 1200) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
            else setValue(target);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return { value, ref };
}

// Animation Variants
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Sub-components
function StatCard({ count, label }: StatItem) {
  const { value, ref } = useCountUp(count);
  return (
    <div className="flex flex-col">
      <span
        ref={ref}
        className="font-display text-3xl font-bold text-primary tabular-nums"
      >
        {value}+
      </span>
      <span className="text-xs text-muted-foreground mt-0.5">{label}</span>
    </div>
  );
}

function ProfilePlaceholder() {
  return (
    <Image
      src="/images/dimas.png"
      alt="Foto profil"
      width={400}
      height={400}
      loading="eager"
      className="rounded-2xl object-cover"
    />
  );
}

function GlowBlobs() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      <motion.div
        className="absolute -top-40 -left-40 w-150 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(47,47,228,0.14) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-32 -right-20 w-125 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(22,46,147,0.16) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  );
}

// Main Component
export default function Hero() {
  const typed = useTyped(TYPED_WORDS);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center px-6 md:px-10 lg:px-16 pt-24 pb-20 overflow-hidden"
    >
      <GlowBlobs />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12 lg:gap-20">
        {/* ── Left: Content ── */}
        <motion.div
          className="flex-1 flex flex-col items-center md:items-start text-center md:text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >

          {/* Heading — nama highlight, typing jadi subtitle */}
          <motion.div variants={itemVariants} className="mb-4">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight">
              Halo, saya <span className="text-primary">Dimas Zaidan Alif</span>
            </h1>

            {/* Typing subtitle */}
            <div className="mt-3 flex items-center gap-1.5 justify-center md:justify-start">
              <span className="text-base sm:text-lg text-muted-foreground font-medium">
                {typed}
              </span>
              <motion.span
                className="inline-block w-0.5 h-[1em] bg-primary align-middle rounded-full"
                animate={{ opacity: [1, 0] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-muted-foreground text-base lg:text-lg leading-relaxed max-w-lg mb-8"
          >
            Saya membangun aplikasi berbasis web, backend yang scalabel. Memperhatikan setiap detail
            engineering yang presisi dan efisien.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center md:justify-start gap-3 mb-12"
          >
            <a
              href="#projects"
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-full",
                "bg-primary text-primary-foreground text-sm font-semibold",
                "hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30",
                "hover:-translate-y-0.5 active:translate-y-0",
                "transition-all duration-200",
              )}
            >
              Lihat Proyek
            </a>
            <a
              href="#contact"
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-full",
                "border border-border/60 text-foreground/80 text-sm font-medium",
                "hover:border-primary/50 hover:text-primary hover:bg-primary/5",
                "transition-all duration-200",
              )}
            >
              Hubungi Saya
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-8 md:gap-10"
          >
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className="flex items-center gap-8 md:gap-10"
              >
                <StatCard {...stat} />
                {i < STATS.length - 1 && (
                  <div className="w-px h-8 bg-border/50" />
                )}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right: Image ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="relative shrink-0"
        >
          <motion.div
            className="absolute -inset-4 rounded-3xl"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(47,47,228,0.22) 0%, transparent 70%)",
            }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <div className="relative p-2 rounded-3xl bg-linear-to-br from-primary/20 via-secondary/10 to-primary/20">
            <div className="relative p-1 rounded-2xl bg-background/40 backdrop-blur-sm">
              <div className="relative overflow-hidden rounded-2xl ring-2 ring-primary/30 ring-offset-2 ring-offset-background">
                <ProfilePlaceholder />
                <div className="absolute inset-0 bg-linear-to-t from-primary/10 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => {
          const aboutSection = document.querySelector("#about");
          if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        aria-label="Gulir ke bagian selanjutnya"
      >
        <span className="text-[10px] tracking-[0.2em] text-muted-foreground/50 uppercase">
          Gulir
        </span>
        <motion.div
          className="w-px h-10 bg-linear-to-b from-primary/40 to-transparent"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.button>
    </section>
  );
}
