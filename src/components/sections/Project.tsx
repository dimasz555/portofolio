"use client";

import { useRef, useState } from "react";
import {
  motion,
  useInView,
  type Variants,
  AnimatePresence,
} from "motion/react";
import ProjectCard, { type Project } from "./ProjectCard";
import ProjectModal from "./ProjectModal";

const projects: Project[] = [
  {
    id: 1,
    title: "OneAcademy",
    description:
      "RESTful API untuk platform yang menyediakan konten pembelajaran online berupa video. Platform ini akan menyediakan konten pembelajaran yang dapat diakses secara gratis atau berlangganan.",
    techStack: [
      "Express.js",
      "PostgreSQL",
      "PrismaORM",
      "JWT",
      "Imagekit.io",
      "Nodemailer",
      "Google Cloud Platform",
    ],
    category: "Backend Developer",
    thumbnail: "/images/projects/oneacademy-1.png",
    liveUrl: "https://github.com/dimasz555/OneAcademyAPI",
    demoUrl: "https://documenter.getpostman.com/view/32054518/2sBY4JxiAT",
    gallery: ["/images/projects/oneacademy-1.png"],
    features: [
      "Merancang dan mengembangkan RESTful API menggunakan Express.js.",
      "Mengelola skema database PostgreSQL menggunakan Prisma ORM.",
      "Mengimplementasikan autentikasi dan otorisasi berbasis JWT.",
      "Integrasi dengan layanan eksternal Imagekit.io dan Nodemailer.",
      "Deployment menggunakan Google Cloud Platform.",
    ],
  },
  {
    id: 2,
    title: "Sajada Digital Agency",
    description:
      "Platform digital penjualan properti daerah Pontianak dan sekitarnya yang menyediakan sistem booking online terintegrasi dan manajemen agen/afiliasi untuk memperluas jangkauan serta meningkatkan efektivitas penjualan.",
    techStack: [
      "Laravel",
      "Livewire",
      "Filament",
      "TailwindCSS",
      "MySQL",
      "Midtrans",
    ],
    category: "Full Stack",
    thumbnail: "/images/projects/sajadadigital.png",
    demoUrl: "https://sajadadigital.com",
    gallery: [
      "/images/projects/sajadadigital.png",
      "/images/projects/sajadadigital-1.png",
    ],
    features: [
      "Membuat sistem mulai dari tahap perancangan hingga deployment",
      "Mengimplementasikan payment gateway menggunakan Midtrans.",
      "Menyiapkan dan mengelola CI/CD pipeline untuk otomatisasi proses deployment ke server.",
      "Mengoptimalkan SEO untuk meningkatkan visibilitas di mesin pencari.",
    ],
  },
  {
    id: 3,
    title: "Jowin Carwash",
    description:
      "Website untuk layanan coffee dan carwash dengan landing page, sistem tracking cucian kendaraan, dan dashboard admin untuk pengelolaan data pelanggan dan cucian.",
    techStack: ["Laravel", "Livewire", "TailwindCSS", "MySQL", "Filament"],
    category: "Full Stack",
    thumbnail: "/images/projects/jowincarwash.png",
    demoUrl: "https://jowin.wablitz.com/",
    gallery: [
      "/images/projects/jowincarwash.png",
      "/images/projects/jowincarwash-1.png",
    ],
    features: [
      "Mengembangkan landing page yang responsif untuk memperkenalkan layanan coffee dan carwash.",
      "Membangun sistem pelacakan status cucian kendaraan secara real-time.",
      "Mengintegrasikan WhatsApp API untuk mengirimkan notifikasi progres cucian kepada pelanggan.",
      "Mengembangkan dashboard admin untuk mengelola data pelanggan, transaksi, dan status cucian.",
      "Merancang struktur database dan mengembangkan backend menggunakan Laravel, Livewire, dan MySQL.",
    ],
  },
  {
    id: 4,
    title: "Sajadadir",
    description:
      "Website yang digunakan oleh karyawan Sajada Digital Agency untuk melakukan absensi (masuk/pulang), pengajuan izin, serta rekap kehadiran, hingga mendukung proses penggajian.",
    techStack: ["Laravel", "Livewire", "TailwindCSS", "MySQL", "Filament"],
    category: "Full Stack",
    thumbnail: "/images/projects/sajadadir.png",
    demoUrl: "https://sajadadir.wablitz.com/",
    gallery: [
      "/images/projects/sajadadir.png",
      "/images/projects/sajadadir-1.png",
    ],
    features: [
      "Merancang struktur database dan mengembangkan backend menggunakan Laravel.",
      "Membangun antarmuka interaktif dengan Livewire dan Tailwind CSS.",
      "Mengembangkan modul absensi, pengajuan izin, dan rekap kehadiran karyawan.",
      "Mengimplementasikan autentikasi serta manajemen peran pengguna menggunakan Filament.",
      "Mengoptimalkan proses rekap data untuk mendukung perhitungan penggajian.",
    ],
  },
  {
    id: 5,
    title: "SIPETA",
    description:
      "Sistem Informasi Pembayaran Tanah Kavling (SIPETA)  merupakan sistem yang membantu admin dan konsumen dalam melakukan proses interaksi pembayaran cicilan tanah kavling.",
    techStack: ["Laravel", "Livewire", "Bootstrap", "MySQL", "Midtrans"],
    category: "Full Stack",
    thumbnail: "/images/projects/sipeta.png",
    liveUrl: "https://github.com/dimasz555/Sipeta-app",
    gallery: [
      "/images/projects/sipeta.png",
      "/images/projects/sipeta-1.png",
      "/images/projects/sipeta-2.png",
    ],
    features: [
      "Mengembangkan sistem pengelolaan data konsumen, kavling, dan transaksi pembayaran cicilan.",
      "Mengintegrasikan Midtrans sebagai payment gateway untuk memproses pembayaran secara online.",
      "Membangun dashboard admin untuk memantau status pembayaran dan data konsumen.",
      "Mengimplementasikan autentikasi dan manajemen hak akses pengguna.",
    ],
  },
  {
    id: 6,
    title: "Sistem Antrian Puskesmas",
    description:
      "Aplikasi antrian digital untuk puskesmas dengan fitur real-time queue management dan notifikasi untuk meningkatkan efisiensi pelayanan.",
    techStack: [
      "Next.js",
      "React",
      "Prisma ORM",
      "PostgreSQL",
      "TailwindCSS",
      "Shadcn UI",
      "JWT",
    ],
    category: "Full Stack",
    thumbnail: "/images/projects/siap.png",
    liveUrl: "https://github.com/dimasz555/antrian-app",
    demoUrl: "https://antrian-app-nine.vercel.app/",
    gallery: [
      "/images/projects/siap.png",
      "/images/projects/siap-1.png",
      "/images/projects/siap-2.png",
    ],
    features: [
      "Mengembangkan sistem manajemen antrian secara real-time.",
      "Merancang dan mengembangkan skema database PostgreSQL menggunakan Prisma ORM.",
      "Membangun antarmuka pengguna yang responsif menggunakan Next.js, React, Tailwind CSS, dan Shadcn UI.",
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
