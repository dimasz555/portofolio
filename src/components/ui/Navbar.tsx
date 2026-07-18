"use client";

import { useEffect, useState, useContext } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Download,
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
  {
    label: "Beranda",
    href: "#hero",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    label: "Proyek",
    href: "#projects",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    label: "Pengalaman",
    href: "#experience",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    label: "Pendidikan",
    href: "#education",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    label: "Kontak",
    href: "#contact",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
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
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
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

function MobileBottomNav({ active }: { active: string }) {
  const { isDark, setIsDark } = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
        onClick={() => setIsDark(!isDark)}
        className={cn(
          "fixed top-4 right-4 z-50 md:hidden",
          "w-11 h-11 rounded-2xl flex items-center justify-center",
          "bg-background/85 backdrop-blur-xl border border-border/40",
          "shadow-lg shadow-black/10 transition-all duration-200",
          "active:scale-95",
        )}
        aria-label="Toggle theme"
      >
        {!mounted ? (
          <Moon size={18} className="text-muted-foreground" />
        ) : isDark ? (
          <Moon size={18} className="text-primary" />
        ) : (
          <Sun size={18} className="text-primary" />
        )}
      </motion.button>

      <motion.nav
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        aria-label="Mobile navigation"
        className="fixed bottom-4 inset-x-4 z-50 md:hidden"
      >
        <ul
        className={cn(
          "flex items-center justify-around px-4 py-3",
          "bg-background/85 backdrop-blur-xl rounded-3xl",
          "border border-border/40 shadow-lg shadow-black/10",
        )}
      >
        {NAV_LINKS.map(({ label, href, icon }) => {
          const isActive = active === href;
          return (
            <li key={href} className="flex-1">
              <a
                href={href}
                onClick={handleNavClick}
                aria-label={label}
                aria-current={isActive ? "page" : undefined}
                className="flex flex-col items-center gap-1.5 py-1"
              >
                <span
                  className={cn(
                    "relative flex items-center justify-center w-11 h-9 rounded-2xl",
                    "transition-colors duration-200",
                    isActive ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="mobile-pill"
                      className="absolute inset-0 rounded-2xl bg-primary/12"
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
    </>
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
