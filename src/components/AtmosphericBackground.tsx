import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext.tsx';

export const AtmosphericBackground: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!glowRef.current) return;
      glowRef.current.style.transform = `translate3d(${e.clientX - 250}px, ${e.clientY - 250}px, 0)`;
      glowRef.current.style.opacity = isDark ? '0.22' : '0.12';
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [isDark]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none transition-colors duration-500">
      {/* 1. Deep Space Base Layer */}
      <div
        className={`absolute inset-0 transition-colors duration-500 ${
          isDark ? 'bg-[#070A14]' : 'bg-[#ECECEB]'
        }`}
      />

      {/* 2. Laser Light Pillars (Pranjal Mishra Inspired) */}
      <div className="absolute inset-0 overflow-hidden">
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          preserveAspectRatio="none"
          viewBox="0 0 1920 1080"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="pillarGlow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isDark ? '#6366f1' : '#818cf8'} stopOpacity={isDark ? '0.35' : '0.15'} />
              <stop offset="45%" stopColor={isDark ? '#10b981' : '#34d399'} stopOpacity={isDark ? '0.2' : '0.08'} />
              <stop offset="100%" stopColor={isDark ? '#06b6d4' : '#38bdf8'} stopOpacity="0" />
            </linearGradient>
            <linearGradient id="cyanPillar" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity={isDark ? '0.25' : '0.12'} />
              <stop offset="70%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
          </defs>

          <g className={`transition-opacity duration-700 ${isDark ? 'opacity-40' : 'opacity-15'}`}>
            {/* Primary Vertical Beams */}
            <rect x="180" y="0" width="1.5" height="1080" fill="url(#pillarGlow)" />
            <rect x="360" y="0" width="3.5" height="1080" fill="url(#pillarGlow)" />
            <rect x="620" y="0" width="1.5" height="1080" fill="url(#pillarGlow)" />
            <rect x="880" y="0" width="4.5" height="1080" fill="url(#cyanPillar)" />
            <rect x="1140" y="0" width="1.5" height="1080" fill="url(#pillarGlow)" />
            <rect x="1420" y="0" width="3.5" height="1080" fill="url(#pillarGlow)" />
            <rect x="1680" y="0" width="2" height="1080" fill="url(#cyanPillar)" />
            <rect x="1840" y="0" width="1.5" height="1080" fill="url(#pillarGlow)" />
          </g>
        </svg>
      </div>

      {/* 3. Subtle Structural Architectural Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.045]"
        style={{
          backgroundImage: isDark
            ? 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)'
            : 'linear-gradient(to right, #000000 1px, transparent 1px), linear-gradient(to bottom, #000000 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }}
      />

      {/* 4. Ambient Cursor Spotlight Torch */}
      <div
        ref={glowRef}
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none blur-[110px] will-change-transform transition-opacity duration-300 opacity-0"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(99, 102, 241, 0.45) 0%, rgba(16, 185, 129, 0.25) 40%, transparent 70%)'
            : 'radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, rgba(16, 185, 129, 0.15) 40%, transparent 70%)'
        }}
      />

      {/* 5. Fixed Ambient Aurora Glows */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-indigo-600/10 dark:bg-indigo-600/15 rounded-full blur-[140px]" />
      <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-emerald-500/10 dark:bg-emerald-500/12 rounded-full blur-[150px]" />
      <div className="absolute -bottom-40 left-1/4 w-[700px] h-[700px] bg-cyan-600/10 dark:bg-cyan-600/12 rounded-full blur-[160px]" />
    </div>
  );
};
