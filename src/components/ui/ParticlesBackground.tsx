"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const PARTICLES = Array.from({ length: 120 }, (_, i) => ({
  id: i,
  size: ((i * 7) % 4) + 2.5,
  x: ((i * 13) % 100),
  duration: ((i * 11) % 14) + 10,
  delay: ((i * 17) % 12),
  opacity: ((i * 19) % 35) / 100 + 0.1,
}));

function useViewportHeight() {
  const [height, setHeight] = useState(800);

  useEffect(() => {
    const update = () => setHeight(window.innerHeight);
    update();

    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return height;
}

export default function ParticlesBackground() {
  const viewportHeight = useViewportHeight();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
    >
      {PARTICLES.map((p) => (
        <motion.span
          key={p.id}
          className="absolute bottom-0 rounded-full bg-primary"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
          }}
          animate={{
            y: [0, -viewportHeight],
            opacity: [0, p.opacity, p.opacity * 0.5, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
