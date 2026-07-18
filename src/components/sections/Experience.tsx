"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "motion/react";
import { cn } from "@/lib/utils";
import { Calendar, MapPin } from "lucide-react";

interface ExperienceItem {
  id: string;
  position: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: "1",
    position: "IT Staff Programmer",
    company: "PT Sajada Digital Agency",
    location: "Pontianak, Indonesia",
    period: "Februari 2024 - Sekarang",
    description:
      "Mengembangkan web end-to-end, menangani bug di environment production, serta setup dan pengelolaan CI/CD untuk deployment.",
    achievements: [
      "Mengembangkan aplikasi jual beli tanah kavling berbasis web dengan fitur pengelolaan data pelanggan, transaksi, dan pembayaran cicilan.",
      "Membangun dan mengembangkan aplikasi internal perusahaan menggunakan Laravel dan teknologi pendukungnya.",
      "Mengimplementasikan fitur absensi, dashboard monitoring, serta modul pengelolaan data sesuai kebutuhan bisnis.",
      "Melakukan debugging, maintenance, dan optimasi aplikasi pada lingkungan production.",
      "Menangani proses deployment serta konfigurasi server untuk memastikan aplikasi berjalan dengan baik.",
    ],
  },
  {
    id: "2",
    position: "Magang - Full Stack Developer",
    company: "UPT Klinik Sungai Bangkong",
    location: "Pontianak, Indonesia",
    period: "Maret 2024 - Juni 2024",
    description:
      "Mengembangkan Sistem Rekam Medis Elektronik serta melakukan analisis dan perbaikan bug untuk meningkatkan stabilitas sistem.",
    achievements: [
      "Melakukan wawancara dan analisis kebutuhan dengan pengguna dari berbagai poli untuk mengevaluasi kesesuaian sistem yang berjalan.",
      "Mengidentifikasi kendala dan bug pada aplikasi berdasarkan hasil analisis serta masukan pengguna.",
      "Melakukan perbaikan dan pengembangan fitur agar sistem sesuai dengan kebutuhan operasional klinik.",
      "Melakukan pengujian terhadap perubahan sistem untuk memastikan fitur berjalan sesuai kebutuhan.",
      "Melakukan maintenance aplikasi dan membantu meningkatkan stabilitas sistem rekam medis elektronik.",
    ],
  },
  {
    id: "3",
    position: "Magang - Full Stack Developer",
    company: "PT Sajada Digital Agency",
    location: "Pontianak, Indonesia",
    period: "Mei 2023 - Juli 2023",
    description:
      "Mengembangkan fitur pada aplikasi internal perusahaan untuk pengelolaan dokumen dan layanan berbasis web.",
    achievements: [
      "Mengembangkan fitur aplikasi menggunakan Laravel dan teknologi frontend terkait.",
      "Membantu proses debugging dan optimasi performa aplikasi.",
    ],
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

const timelineVariants: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function SectionLabel() {
  return (
    <motion.div variants={slideUpVariants} className="flex items-center gap-3">
      <div className="h-px w-8 bg-primary" />
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
        Pengalaman
      </span>
      <div className="h-px w-8 bg-primary" />
    </motion.div>
  );
}

function TimelineItem({
  item,
  index,
}: {
  item: ExperienceItem;
  index: number;
}) {
  return (
    <motion.div variants={timelineVariants} className="relative flex gap-6">
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background",
            "shadow-lg shadow-primary/20",
          )}
        >
          <span
            className="text-sm font-bold text-primary"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <div className="w-0.5 flex-1 bg-linear-to-b from-primary to-primary/20 mt-2" />
      </div>

      <div className="flex-1 pb-12">
        <div
          className={cn(
            "group rounded-2xl border border-primary/20 bg-card/50 p-6 backdrop-blur-sm",
            "hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10",
            "transition-all duration-300",
          )}
        >
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3
                className="text-xl font-bold text-foreground"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {item.position}
              </h3>
              <p className="mt-1 text-base font-semibold text-primary">
                {item.company}
              </p>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap gap-4 text-sm text-foreground/60">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>{item.period}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              <span>{item.location}</span>
            </div>
          </div>

          <p className="mb-4 text-sm leading-relaxed text-foreground/60">
            {item.description}
          </p>

          <div className="space-y-2">
            {item.achievements.map((achievement, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span className="text-sm text-foreground/80">
                  {achievement}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="experience"
      ref={ref}
      className="relative overflow-hidden py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/3 top-1/4 h-125 rounded-full bg-primary/5 blur-[120px]"
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
              Perjalanan <span className="text-primary">Profesional</span>
            </motion.h2>
            <motion.p
              variants={slideUpVariants}
              className="mx-auto mt-4 max-w-2xl text-base text-foreground/60 sm:text-lg"
            >
              Pengalaman saya dalam membangun solusi teknologi yang berdampak
            </motion.p>
          </div>

          <div className="mt-12">
            {EXPERIENCES.map((exp, index) => (
              <TimelineItem key={exp.id} item={exp} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
