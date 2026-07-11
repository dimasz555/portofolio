# Portfolio Project — Agent Context

## Overview

This is a fully static personal portfolio website for **Dimas Zaidan Alif**, a Full Stack Developer. There is no backend, no database, and no contact form. Built with Next.js App Router.

## Owner

Name: Dimas Zaidan Alif
Role: Full Stack Developer, Backend Specialist

---

## Tech Stack

- **Next.js 16.2.9** — App Router only, no Pages Router
- **React 19.2.4**
- **TypeScript ^5** — strict mode
- **Tailwind CSS ^4** — no `tailwind.config.ts`, all theming via CSS variables in `globals.css`
- **Motion ^12** — always import from `motion/react`, never from `framer-motion`
- **Lucide React ^1.21** — no brand icons (GitHub, Instagram, LinkedIn, etc.)
- **clsx + tailwind-merge** — combined via `cn()` helper in `src/lib/utils.ts`

---

## Critical Rules

### Motion / Animation

- Always import from `motion/react`, never from `framer-motion`
- `ease` inside Variants must be a string like `"easeOut"` or `"easeInOut"`, never a `number[]`
- Always type Variants with `import { type Variants } from "motion/react"`
- Never access `window` outside of `useEffect`
- Randomized or generated values (e.g. particles) must be created at module level, outside the component body, to avoid cascading setState errors

### Tailwind CSS v4

- All theme customization is in `globals.css` via `@theme inline {}`
- Always use CSS variable-based classes: `bg-background`, `text-foreground`, `bg-primary`, `text-muted-foreground`, etc.
- Do not use arbitrary color values like `bg-[#2F2FE4]`; use the defined tokens instead

### TypeScript

- Always type component props with interfaces
- Use `type` imports where applicable: `import { type Variants } from "motion/react"`
- Avoid `any` unless absolutely necessary; add eslint-disable comment if used

### General

- Add `"use client"` directive to any component that uses hooks or browser APIs
- Server Components by default unless interactivity is needed
- Do not use `React.FC` — use plain function declarations
- Use `cn()` from `@/lib/utils` for all conditional classNames

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Fonts, metadata, dark class on <html>
│   ├── page.tsx                # Assembles all sections
│   └── globals.css             # Tailwind v4 theme, CSS variables, dark mode
├── components/
│   ├── ui/
│   │   ├── Navbar.tsx
│   │   └── ParticlesBackground.tsx
│   └── sections/
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Skills.tsx
│       ├── Projects.tsx
│       ├── Experience.tsx
│       ├── Education.tsx
│       └── Contact.tsx
└── lib/
    └── utils.ts
```

---

## Completed Components

- `layout.tsx` — Inter + Space Grotesk fonts loaded via `next/font/google`, `<html>` always has class `dark`
- `globals.css` — full Tailwind v4 theme with dark mode CSS variables
- `utils.ts` — `cn()` helper using clsx and tailwind-merge
- `Navbar.tsx` — floating pill navbar with glassmorphism on scroll, bottom nav on mobile
- `ParticlesBackground.tsx` — floating blue particles, fixed position, z-0, generated at module level
- `Hero.tsx` — static name, typed role effect, badges, CTA buttons, stats counter, profile placeholder

## Remaining Sections

- `About.tsx`
- `Skills.tsx`
- `Projects.tsx`
- `Experience.tsx`
- `Education.tsx`
- `Contact.tsx` — static only, social links and CV download, no form

---

## Navbar Details

On desktop, the navbar is a floating centered pill with glassmorphism effect on scroll. Nav links in the center with an underline active indicator using Motion `layoutId`, and two buttons on the right: "Hubungi Saya ↗" that scrolls to `#contact`, and "Resume" that downloads `/cv.pdf`.

On mobile, it becomes a fixed bottom nav bar with two rows. The top row has the Hubungi Saya and Resume buttons. The bottom row has icon-based nav links with an animated label that appears when active.

Nav links: Beranda (`#hero`), Proyek (`#projects`), Pengalaman (`#experience`), Pendidikan (`#education`).

There are no social icons in the Navbar.

## Hero Details

The hero heading shows the static name "Dimas Zaidan Alif". Below it, a typed effect cycles through the roles: "Full Stack Engineer.", "AI System Developer.", "Backend Specialist.". Badges for each role are shown above the heading. Stats show 3+ Tahun Pengalaman and 20+ Proyek Selesai (only two stats). CTA buttons link to `#projects` and `#contact`. The profile image is a placeholder to be replaced with `next/image` later. Background uses GlowBlobs and ParticlesBackground.

## Contact Section Rules

The contact section is fully static. It contains social links for Instagram, GitHub, LinkedIn, and Email, plus a Download CV button. There is no form. Since lucide-react has no brand icons, use inline SVG or a separate icon library for social icons.

## Design Reference
Navbar style: floating centered pill with underline active indicator, not pill/background highlight.