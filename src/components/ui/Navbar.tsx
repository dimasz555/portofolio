"use client";

import { useEffect, useState, useContext } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Download,
  House,
  FolderOpen,
  Briefcase,
  FileText,
  Moon,
  Sun,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeContext } from "@/app/layout";

// Types
interface NavLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

// Data
const NAV_LINKS: NavLink[] = [
  { label: "Beranda", href: "#hero", icon: <House size={16} /> },
  { label: "Proyek", href: "#projects", icon: <FolderOpen size={16} /> },
  { label: "Pengalaman", href: "#experience", icon: <Briefcase size={16} /> },
  { label: "Pendidikan", href: "#education", icon: <FileText size={16} /> },
];

// Hooks
function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function useActiveSection(hrefs: string[]) {
  const [active, setActive] = useState(hrefs[0]);
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    hrefs.forEach((href) => {
      const el = document.getElementById(href.replace("#", ""));
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(href);
        },
        { rootMargin: "-40% 0px -55% 0px" },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((obs) => obs.disconnect());
  }, [hrefs]);
  return active;
}

function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  const href = e.currentTarget.getAttribute("href");
  if (!href) return;
  const target = document.querySelector(href);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function DesktopNav({
  scrolled,
  active,
}: {
  scrolled: boolean;
  active: string;
}) {
  const { isDark, setIsDark } = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="fixed top-0 inset-x-0 z-50 hidden md:flex justify-center pt-4 px-6">
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          "flex items-center gap-1 px-1.5 py-1.5 rounded-full",
          "border transition-all duration-300",
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-border/60 shadow-lg shadow-black/20"
            : "bg-background/50 backdrop-blur-md border-border/30",
        )}
      >

        {/* Nav Links */}
        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-0.5">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = active === href;
              return (
                <li key={href}>
                  <a
                    href={href}
                    onClick={handleNavClick}
                    className={cn(
                      "relative flex flex-col items-center px-4 py-2 rounded-full",
                      "text-sm font-medium transition-colors duration-200",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40",
                    )}
                  >
                    <span>{label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-primary"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="w-px h-5 bg-border/60 mx-1" />

        {/* CTA Buttons */}
        <div className="flex items-center gap-1.5 pr-0.5">
          <button
            onClick={() => setIsDark(!isDark)}
            className={cn(
              "relative flex items-center w-14 h-8 rounded-full",
              "border border-border/70 transition-all duration-300",
              mounted && isDark ? "bg-primary/20" : "bg-muted",
            )}
            aria-label="Toggle theme"
          >
            <motion.div
              className={cn(
                "absolute w-6 h-6 rounded-full flex items-center justify-center",
                "bg-foreground text-background shadow-md",
              )}
              animate={{
                x: mounted && isDark ? 28 : 4,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              {!mounted ? <Moon size={14} /> : isDark ? <Moon size={14} /> : <Sun size={14} />}
            </motion.div>
          </button>
          <a
            href="#contact"
            onClick={handleNavClick}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2 rounded-full",
              "bg-foreground text-background text-sm font-semibold",
              "hover:bg-primary hover:text-white transition-all duration-200",
            )}
          >
            Hubungi Saya
            <span className="text-xs">↗</span>
          </a>
          <a
            href="/cv.pdf"
            download
            className={cn(
              "flex items-center gap-1.5 px-4 py-2 rounded-full",
              "border border-border/70 text-foreground/80 text-sm font-medium",
              "hover:border-primary/60 hover:text-primary hover:bg-primary/5",
              "transition-all duration-200",
            )}
          >
            <Download size={13} />
            Resume
          </a>
        </div>
      </motion.header>
    </div>
  );
}

// Mobile Bottom Nav
function MobileBottomNav({ active }: { active: string }) {
  return (
    <motion.nav
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
      aria-label="Mobile navigation"
      className={cn(
        "fixed bottom-0 inset-x-0 z-50 md:hidden",
        "bg-background/85 backdrop-blur-xl",
        "border-t border-border/40",
        "pb-[env(safe-area-inset-bottom)]",
      )}
    >
      {/* Contact + Resume row */}
      <div className="flex items-center justify-between px-5 pt-2.5 pb-1.5">
        <a
          href="#contact"
          onClick={handleNavClick}
          className={cn(
            "flex items-center gap-1.5 px-4 py-1.5 rounded-full",
            "bg-foreground text-background text-xs font-semibold",
            "hover:bg-primary hover:text-white transition-all duration-200",
          )}
        >
          Hubungi Saya ↗
        </a>
        <a
          href="/cv.pdf"
          download
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full",
            "border border-border/60 text-foreground/80 text-xs font-medium",
            "hover:border-primary/50 hover:text-primary hover:bg-primary/5",
            "transition-all duration-200",
          )}
        >
          <Download size={12} />
          Resume
        </a>
      </div>

      {/* Nav links row */}
      <ul className="flex items-center justify-around px-2 pb-2">
        {NAV_LINKS.map(({ label, href, icon }) => {
          const isActive = active === href;
          return (
            <li key={href} className="flex-1">
              <a
                href={href}
                onClick={handleNavClick}
                aria-label={label}
                aria-current={isActive ? "page" : undefined}
                className="flex flex-col items-center gap-1 py-1.5"
              >
                <span
                  className={cn(
                    "relative flex items-center justify-center w-10 h-7 rounded-full",
                    "transition-colors duration-200",
                    isActive ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="mobile-pill"
                      className="absolute inset-0 rounded-full bg-primary/12"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{icon}</span>
                </span>
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      initial={{ opacity: 0, y: -3 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -3 }}
                      transition={{ duration: 0.15 }}
                      className="text-[10px] font-semibold text-primary leading-none"
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </a>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}

// Main Export
export default function Navbar() {
  const scrolled = useScrolled();
  const active = useActiveSection(NAV_LINKS.map((l) => l.href));

  return (
    <>
      <DesktopNav scrolled={scrolled} active={active} />
      <MobileBottomNav active={active} />
    </>
  );
}
