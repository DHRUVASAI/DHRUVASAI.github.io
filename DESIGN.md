# Portfolio Design System & Craft Guidelines

*Inspired by world-class engineering portfolios (Pranjal Mishra, Linear, Vercel, Stripe)*

## 1. Aesthetic POV & Philosophy
- **Domain**: AI Systems Engineering, High-Speed Security Platforms, Production Full-Stack Architecture.
- **Aesthetic**: Deep Atmospheric Obsidian with Laser Beam Pillars, High-Contrast Glassmorphic Bento Grid, Kinetic Interactive Dock, Tactile Web Audio Synthesizer, and Systems Command Terminal.
- **Tone**: Purposeful, technically deep, razor-sharp, zero-bloat, human-centered.

---

## 2. Color System & Design Tokens

### Dark Canvas (Primary Mode)
- **Background Root**: `#070A14` (Deep obsidian navy space)
- **Card Surface**: `#0C0E18` / `rgba(12, 14, 24, 0.85)` with `backdrop-blur-xl`
- **Card Inset Highlight**: `inset 0 1px 0 rgba(255, 255, 255, 0.08)`
- **Border Default**: `rgba(255, 255, 255, 0.08)`
- **Border Hover**: `rgba(255, 255, 255, 0.22)`
- **Foreground Primary**: `#FFFFFF` / `#F8FAFC`
- **Foreground Secondary**: `#94A3B8` / `#64748B`

### Light Canvas (Day Mode)
- **Background Root**: `#ECECEB` / `#F4F4F2`
- **Card Surface**: `rgba(255, 255, 255, 0.82)` with `backdrop-blur-xl`
- **Card Inset Highlight**: `inset 0 1px 0 rgba(255, 255, 255, 0.9)`
- **Border Default**: `rgba(0, 0, 0, 0.08)`
- **Foreground Primary**: `#0F172A`
- **Foreground Secondary**: `#475569`

### Text Color Tokens (Consolidated to ≤5 Core Tokens)
- **Primary Text**: `text-neutral-950 dark:text-white`
- **Secondary Body Text**: `text-neutral-700 dark:text-neutral-300`
- **Muted & Metadata Text**: `text-neutral-500 dark:text-neutral-400`
- **Accent / Link Text**: `text-indigo-600 dark:text-indigo-400`
- **Status / Verification Text**: `text-emerald-600 dark:text-emerald-400`

### Corner Radii Scale (Consolidated to 5 Tokens)
- **`rounded-md` (6px)**: Small tags, copy buttons, compact status badges
- **`rounded-xl` (12px)**: Interactive controls (buttons, inputs, mini highlight cards)
- **`rounded-2xl` (16px)**: Nested container banners, dialog panels
- **`rounded-3xl` (24px)**: Main bento cards, identity frame
- **`rounded-full` (9999px)**: Avatars, navigation dock, circular icons

---

## 3. Typography Hierarchy & Strict Type Scale (≤8 Sizes)
Every font size on the platform maps strictly to the following 8 scale steps (no arbitrary `text-[9px]`, `text-[10px]`, `text-[11px]`, or `text-[13px]`):
1. **`text-xs` (12px)**: Badges, category labels, code/tech pills, status indicators, metadata.
2. **`text-sm` (14px)**: Secondary body paragraphs, button labels, list items.
3. **`text-base` (16px)**: Primary body copy, description text.
4. **`text-lg` (18px)**: Subheadings, lead sentences, card descriptions.
5. **`text-xl` (20px)**: Card headings, modal subsection headers.
6. **`text-2xl` (24px)**: Section titles (`Engineering with Purpose`, `Selected Work`).
7. **`text-3xl` (30px)**: Primary view headings and modal titles.
8. **`text-5xl sm:text-6xl md:text-7xl lg:text-8xl`**: Display Hero Name (`Dhruva Sai`) with zero ghosting or double layer rendering.

---

## 4. Button Variants (Consolidated to 3 Canonical Styles)
- **Primary Button**: `px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-100 font-semibold text-xs sm:text-sm transition-all shadow-sm cursor-pointer`
- **Secondary / Frosted Button**: `px-4 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-white/80 dark:bg-neutral-800/80 hover:bg-white dark:hover:bg-neutral-700 text-neutral-900 dark:text-white border border-black/10 dark:border-white/10 font-semibold text-xs sm:text-sm transition-all shadow-2xs cursor-pointer`
- **Ghost / Link Action**: `px-2.5 py-1 rounded-md text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 shadow-2xs transition-colors cursor-pointer`

---

## 5. Navigation & Density Architecture
1. **Primary Navigation System**: The Viewport-Anchored Interactive Floating Dock serves as the canonical interaction model (`Home`, `Projects`, `About`, `Terminal`, `Contact`, `Resume`). Mounted at viewport root outside any isolated containers with `pb-40` page clearance.
2. **Header Utility Bar**: The top bar is reserved for brand identity (`Dhruva Sai`), role, live Hyderabad IST status, theme toggle, and intro replay — removing redundant navigation tabs.
3. **Resume CTA Hierarchy**: Exactly 2 clear touchpoints: Primary Hero CTA (`Curriculum Vitae 9.33 CGPA`) and Dock Resume button.
4. **Skills / Tech Stack**: Monochromatic, clean structured rows without competing rainbow dots or pulsating markers. Single clean pill style.
5. **Affordance Integrity**: Every interactive action (`Copy`, `Direct Call`, `Write`, `WhatsApp`) carries an explicit icon, visible border, and distinct background affordance.
