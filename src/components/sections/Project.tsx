"use client";

import { useRef, useState } from "react";
import { motion, useInView, type Variants, AnimatePresence } from "motion/react";
import ProjectCard, { type Project } from "./ProjectCard";
import ProjectModal from "./ProjectModal";

const projects: Project[] = [
  {
    id: 1,
    title: "OneAcademy",
    description:
      "Platform yang menyediakan konten pembelajaran online berupa video. Platform ini akan menyediakan konten pembelajaran yang dapat diakses secara gratis atau berlangganan.",
    techStack: ["Express.js", "RESTful API", "PostgreSQL", "PrismaORM", "JWT"],
    category: "RESTful API",
    thumbnail: "/images/sajadadigital.png",
    liveUrl: "https://github.com/dimasz555/OneAcademyAPI",
    demoUrl: "https://documenter.getpostman.com/view/32054518/2sBY4JxiAT",
    gallery: ["/images/sajadadigital.png", "/images/projects/oneacademy-1.png"],
    features: [
      "Live class dengan video conference terintegrasi",
      "Assignment tracking dan submission system",
      "Progress monitoring untuk siswa dan pengajar",
      "Real-time notification untuk deadline dan update",
      "Dashboard analytics untuk performa siswa",
    ],
  },
  {
    id: 2,
    title: "Sajada Digital Agency",
    description:
      "Platform digital penjualan properti daerah Pontianak dan sekitarnya yang menyediakan sistem booking online terintegrasi dan manajemen agen/afiliasi untuk memperluas jangkauan serta meningkatkan efektivitas penjualan.",
    techStack: ["Laravel", "Livewire", "Filament", "TailwindCSS", "MySQL", "Midtrans"],
    category: "Website",
    thumbnail: "/images/sajadadigital.png",
    liveUrl: "#",
    demoUrl: "#",
    gallery: ["/images/sajadadigital.png", "/images/sajadadigital.png"],
    features: [
      "Interactive portfolio showcase dengan animasi smooth",
      "Visual storytelling menggunakan parallax scrolling",
      "Contact form dengan email notification",
      "SEO optimized untuk meningkatkan visibility",
    ],
  },
  {
    id: 3,
    title: "Jowin Carwash",
    description:
      "Website untuk layanan coffee dan carwash dengan landing page, sistem tracking cucian kendaraan, dan dashboard admin untuk pengelolaan data pelanggan dan cucian.",
    techStack: ["Laravel", "Livewire", "TailwindCSS", "MySQL", "Filament"],
    category: "Management System",
    thumbnail: "/images/sajadadigital.png",
    liveUrl: "#",
    gallery: ["/images/sajadadigital.png", "/images/sajadadigital.png", "/images/sajadadigital.png", "/images/sajadadigital.png"],
    features: [
      "Booking system dengan slot management",
      "Payment gateway integration (Midtrans)",
      "Real-time notification via WhatsApp API",
      "Customer history dan loyalty points",
      "Admin dashboard untuk monitoring operasional",
    ],
  },
  {
    id: 4,
    title: "Sajadadir",
    description:
      "Website yang digunakan oleh karyawan Sajada Digital Agency untuk melakukan absensi (masuk/pulang), pengajuan izin, serta rekap kehadiran, hingga mendukung proses penggajian.",
    techStack: ["Laravel", "Livewire", "TailwindCSS", "MySQL", "Filament"],
    category: "Dashboard",
    thumbnail: "/images/sajadadigital.png",
    liveUrl: "#",
    gallery: ["/images/sajadadigital.png", "/images/sajadadigital.png"],
    features: [
      "Real-time analytics dashboard",
      "Custom reporting dengan export ke PDF/Excel",
      "Interactive charts dan visualisasi data",
      "Multi-user access dengan role-based permission",
    ],
  },
  {
    id: 5,
    title: "SIPETA",
    description:
      "Sistem Informasi Pembayaran Tanah Kavling (SIPETA)  merupakan sistem yang membantu admin dan konsumen dalam melakukan proses interaksi pembayaran cicilan tanah kavling.",
    techStack: ["Laravel", "Livewire", "Bootstrap", "MySQL"],
    category: "Finance System",
    thumbnail: "/images/sajadadigital.png",
    liveUrl: "#",
    gallery: ["/images/sajadadigital.png", "/images/sajadadigital.png", "/images/sajadadigital.png"],
    features: [
      "Transaction management dengan double-entry bookkeeping",
      "Budget planning dan monitoring",
      "Financial reporting otomatis",
      "Multi-currency support",
      "Audit trail untuk semua transaksi",
    ],
  },
  {
    id: 6,
    title: "Sistem Antrian Puskesmas",
    description:
      "Aplikasi antrian digital untuk puskesmas dengan fitur real-time queue management dan notifikasi untuk meningkatkan efisiensi pelayanan.",
    techStack: ["Next.js", "React", "Prisma ORM", "PostgreSQL", "TailwindCSS", "Shadcn UI", "JWT"],
    category: "Queue System",
    thumbnail: "/images/sajadadigital.png",
    liveUrl: "#",
    gallery: ["/images/sajadadigital.png", "/images/sajadadigital.png", "/images/sajadadigital.png"],
    features: [
      "Real-time queue management dengan Socket.io",
      "Display board untuk monitoring antrian",
      "SMS notification untuk pasien",
      "Appointment scheduling sistem",
      "Analytics untuk optimasi layanan",
    ],
  },
];

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

function SectionLabel() {
  return (
    <motion.div variants={slideUpVariants} className="flex items-center gap-3">
      <div className="h-px w-8 bg-primary" />
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
        Portofolio
      </span>
      <div className="h-px w-8 bg-primary" />
    </motion.div>
  );
}

export default function Project() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      ref={ref}
      className="relative overflow-hidden py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute right-1/4 top-1/3 h-125 rounded-full bg-primary/5 blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
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
              Proyek <span className="text-primary">Terpilih</span>
            </motion.h2>
            <motion.p
              variants={slideUpVariants}
              className="mx-auto mt-4 max-w-2xl text-base text-foreground/60 sm:text-lg"
            >
              Beberapa proyek yang telah saya kerjakan dengan berbagai teknologi
              dan solusi
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
