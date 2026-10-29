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

### Accent Colors
- **Emerald** (`#10B981` / `#059669`): Operational status, Monte Carlo engine (EDGE), verified badges.
- **Indigo** (`#6366F1` / `#4F46E5`): Core AI systems, focus areas, primary CTA gradients.
- **Cyan** (`#06B6D4` / `#0891B2`): Cybersecurity SOC HUD (GARUDA), real-time packets.
- **Amber** (`#F59E0B` / `#D97706`): Multi-agent orchestration (TeamForge AI), honors & awards.
- **Purple** (`#A855F7` / `#9333EA`): Emotion embeddings (VibeVerse), creative AI.

---

## 3. Typography Hierarchy
- **Display Hero Headings**: Bold, letter-spaced `-0.03em`, line-height `1.05`, kinetic character reveal with `DecryptedText`.
- **Card & Section Headings**: Font size `1.25rem` to `1.75rem`, tracking `-0.02em`, font-semibold to font-bold.
- **Body Text**: Measure `55-70ch`, line-height `1.6`, font-normal, text-neutral-600 dark:text-neutral-300.
- **Technical & Metric Data**: `font-mono` (JetBrains Mono / monospace) with clean border tags.

---

## 4. Key Interactive Components
1. **Interactive Floating Dock**: macOS-style magnification, spring physics, tooltips, sound triggers.
2. **Atmospheric Background**: Vertical beam pillars, subtle ambient light glow following cursor.
3. **Tech Stack Ribbon**: Infinite dual-lane smooth marquee with brand badges.
4. **Haptic Audio Synthesizer**: Web Audio API native sine/triangle clicks and chimes.
5. **Systems Command Terminal**: Modal terminal accessible via `Cmd+K` or dock icon.
