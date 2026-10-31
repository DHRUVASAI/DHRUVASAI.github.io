import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Headphones, Zap, ArrowRight, Sun, Moon } from 'lucide-react';
import Hyperspeed from './ui/Hyperspeed/Hyperspeed';
import Magnet from './ui/Magnet/Magnet';
import { useTheme } from '../context/ThemeContext';
import { playClickSound } from '../utils/soundEffects';

interface OpeningAnimationProps {
  onComplete: () => void;
}

export const OpeningAnimation: React.FC<OpeningAnimationProps> = ({ onComplete }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const [currentTime, setCurrentTime] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isWarping, setIsWarping] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasUnmuted, setHasUnmuted] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const videoRef = useRef<HTMLVideoElement>(null);
  const podRef = useRef<HTMLDivElement>(null);
  const hasTriggeredProceed = useRef(false);

  const handleProceed = () => {
    if (hasTriggeredProceed.current) return;
    hasTriggeredProceed.current = true;
    playClickSound();

    // Trigger explosive warp acceleration before dropping into homepage
    setIsWarping(true);
    setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        onComplete();
      }, 700);
    }, 900);
  };

  const triggerUnmuteAndPlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playClickSound();
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    video.volume = 1.0;
    video.currentTime = 0;
    video.play().catch(() => {});
    setHasUnmuted(true);
    setIsPlaying(true);
  };

  // 3D Parallax Tilt for Avatar Pod
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!podRef.current) return;
      const rect = podRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = (e.clientX - centerX) / (window.innerWidth / 2);
      const dy = (e.clientY - centerY) / (window.innerHeight / 2);

      setTilt({
        x: -Math.max(-1, Math.min(1, dy)) * 12,
        y: Math.max(-1, Math.min(1, dx)) * 14
      });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  // Video Autoplay & Smart Audio Detection
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isMounted = true;
    video.volume = 1.0;
    video.muted = false;

    const startPlaying = async () => {
      try {
        await video.play();
        if (isMounted) {
          setIsPlaying(true);
          setHasUnmuted(true);
        }
      } catch {
        try {
          video.muted = true;
          await video.play();
          if (isMounted) {
            setIsPlaying(true);
            setHasUnmuted(false);
          }
        } catch {
          // ignore
        }

        const handleFirstInteraction = () => {
          if (videoRef.current) {
            videoRef.current.muted = false;
            videoRef.current.volume = 1.0;
            videoRef.current.currentTime = 0;
            videoRef.current.play().catch(() => {});
            setHasUnmuted(true);
          }
          cleanup();
        };

        const cleanup = () => {
          window.removeEventListener('pointerdown', handleFirstInteraction);
          window.removeEventListener('touchstart', handleFirstInteraction);
          window.removeEventListener('click', handleFirstInteraction);
          window.removeEventListener('keydown', handleFirstInteraction);
        };

        window.addEventListener('pointerdown', handleFirstInteraction, { once: true });
        window.addEventListener('touchstart', handleFirstInteraction, { once: true });
        window.addEventListener('click', handleFirstInteraction, { once: true });
        window.addEventListener('keydown', handleFirstInteraction, { once: true });
      }
    };

    startPlaying();

    return () => {
      isMounted = false;
    };
  }, []);

  // Keybindings (Esc to skip, Space/Enter to enter or unmute)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleProceed();
      } else if (e.key === ' ' || e.key === 'Enter') {
        if (!hasUnmuted) {
          triggerUnmuteAndPlay();
        } else {
          handleProceed();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasUnmuted]);

  // Video Progress & Sync
  const handleTimeUpdate = () => {
    if (hasTriggeredProceed.current) return;
    const video = videoRef.current;
    if (!video) return;

    const t = video.currentTime;
    setCurrentTime(t);

    if (hasUnmuted) {
      if (t >= 5.3) {
        handleProceed();
      }
    } else {
      if (t >= 5.8) {
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    }
  };

  return (
    <div
      onClick={() => {
        if (!hasUnmuted) {
          triggerUnmuteAndPlay();
        }
      }}
      className={`fixed inset-0 z-[100] flex flex-col justify-between items-center select-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] px-6 py-6 sm:py-8 overflow-hidden cursor-pointer ${
        isDark ? 'bg-[#05060A] text-white' : 'bg-[#ECECEB] text-neutral-900'
      } ${
        isFadingOut
          ? 'opacity-0 scale-125 blur-[16px] pointer-events-none'
          : 'opacity-100 scale-100 blur-0'
      }`}
    >
      {/* 1. Fullscreen 3D Hyperspeed Warp Tunnel (React Bits Three.js Engine) */}
      <div className="absolute inset-0 pointer-events-auto">
        <Hyperspeed
          key={theme}
          curve="gentle"
          curvature={0.8}
          speed={isWarping ? 8.5 : 1.6}
          boost={isWarping ? 12.0 : 4.5}
          fov={isWarping ? 125 : 75}
          boostFov={135}
          lanes={3}
          roadWidth={12}
          density={isDark ? 1.6 : 1.4}
          trailLength={isWarping ? 450 : 220}
          lightSize={isWarping ? 8 : 4.5}
          theme={isDark ? 'dark' : 'light'}
          tailColors={
            isDark
              ? ['#10b981', '#06b6d4', '#6366f1', '#34d399']
              : ['#0284C7', '#2563EB', '#059669', '#D97706']
          }
          headColors={
            isDark
              ? ['#06b6d4', '#38bdf8', '#818cf8', '#a855f7']
              : ['#0284C7', '#10B981', '#4F46E5']
          }
          poleColors={isDark ? ['#10b981', '#06b6d4'] : ['#0284C7', '#059669']}
          roadColor={isDark ? '#030408' : '#DFDFDC'}
          roadOpacity={isDark ? 0.65 : 0.52}
          lineColor={isDark ? '#1e293b' : '#CBD5E1'}
          glow={isDark ? (isWarping ? 3.5 : 1.2) : (isWarping ? 1.8 : 0.7)}
          interactive={true}
          boosting={isWarping}
          className="w-full h-full"
        />
      </div>

      {/* 2. Cyber HUD Vignette & Atmospheric Gradients */}
      <div
        className={`absolute inset-0 pointer-events-none ${
          isDark
            ? 'bg-[radial-gradient(ellipse_at_center,transparent_30%,#030408_95%)]'
            : 'bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(236,236,235,0.85)_95%)]'
        }`}
      />

      {/* 3. Sleek Top Bar HUD */}
      <header className="w-full max-w-5xl flex items-center justify-between z-30 pointer-events-auto shrink-0">
        <div
          className={`flex items-center gap-2.5 px-3 py-1.5 rounded-full backdrop-blur-xl border ${
            isDark
              ? 'bg-black/60 border-white/10 text-neutral-300'
              : 'bg-white/80 border-black/10 text-neutral-800 shadow-sm'
          }`}
        >
          <span className="relative flex h-2 w-2">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isDark ? 'bg-cyan-400' : 'bg-emerald-500'
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                isDark ? 'bg-cyan-500' : 'bg-emerald-600'
              }`}
            />
          </span>
          <span className="text-[11px] font-mono tracking-widest uppercase flex items-center gap-1.5">
            <span>WARP CORE:</span>
            <span
              className={
                isWarping
                  ? 'text-amber-500 font-bold animate-pulse'
                  : isDark
                  ? 'text-emerald-400 font-bold'
                  : 'text-emerald-600 font-bold'
              }
            >
              {isWarping ? 'HYPERDRIVE ACTIVE' : 'ONLINE (1.6x)'}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Theme Switcher Pill (Light & Dark) */}
          <div
            className={`flex items-center p-0.5 rounded-full backdrop-blur-xl border transition-all ${
              isDark
                ? 'bg-black/60 border-white/15'
                : 'bg-white/90 border-neutral-300 shadow-sm'
            }`}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (!isDark) return;
                playClickSound();
                toggleTheme();
              }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-medium transition-all cursor-pointer ${
                !isDark
                  ? 'bg-neutral-900 text-white shadow-sm font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Switch to Architectural Light Theme"
            >
              <Sun className={`w-3 h-3 ${!isDark ? 'text-amber-400' : 'text-neutral-400'}`} />
              <span className="hidden sm:inline">Light</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                if (isDark) return;
                playClickSound();
                toggleTheme();
              }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-medium transition-all cursor-pointer ${
                isDark
                  ? 'bg-white/20 text-cyan-300 shadow-sm font-semibold'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
              title="Switch to Deep Obsidian Dark Theme"
            >
              <Moon className={`w-3 h-3 ${isDark ? 'text-cyan-400' : 'text-neutral-500'}`} />
              <span className="hidden sm:inline">Dark</span>
            </button>
          </div>

          {/* Skip Warp Button */}
          <Magnet padding={15} magnetStrength={2}>
            <button
              data-skip="true"
              onClick={(e) => {
                e.stopPropagation();
                handleProceed();
              }}
              className={`text-xs font-mono px-4 py-1.5 rounded-full border backdrop-blur-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-xl group ${
                isDark
                  ? 'bg-black/60 hover:bg-black/80 border-white/15 hover:border-cyan-400/60 text-neutral-300 hover:text-white'
                  : 'bg-white/80 hover:bg-white border-black/10 hover:border-indigo-500/50 text-neutral-700 hover:text-neutral-950'
              }`}
              title="Skip hyperspace jump"
            >
              <span>Skip Warp</span>
              <span
                className={`text-[10px] group-hover:translate-x-0.5 transition-transform ${
                  isDark ? 'text-cyan-400' : 'text-indigo-600'
                }`}
              >
                [Esc] ➔
              </span>
            </button>
          </Magnet>
        </div>
      </header>

      {/* 4. Center Teleportation Pod: Dhruva Avatar in 3D Warp Field */}
      <main className="relative z-20 flex flex-col items-center justify-center max-w-2xl w-full text-center my-auto py-2 pointer-events-auto">
        {/* Holographic Containment Pod with 3D Tilt */}
        <div
          ref={podRef}
          className="relative mb-5 select-none"
          style={{
            transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${
              isWarping ? 1.15 : 1
            })`,
            transformStyle: 'preserve-3d',
            transition: 'transform 0.15s ease-out'
          }}
        >
          {/* Radiant Neon Energy Ring */}
          <div
            className={`absolute -inset-3 rounded-[32px] bg-gradient-to-tr transition-all duration-500 blur-xl ${
              isWarping
                ? 'from-cyan-400 via-emerald-400 to-indigo-500 opacity-100 animate-pulse scale-110'
                : isDark
                ? hasUnmuted
                  ? 'from-emerald-500/40 via-cyan-500/40 to-indigo-500/40 opacity-80 animate-pulse'
                  : 'from-cyan-500/25 via-indigo-500/25 to-purple-500/25 opacity-60'
                : hasUnmuted
                ? 'from-indigo-400/30 via-emerald-400/30 to-cyan-400/30 opacity-70 animate-pulse'
                : 'from-indigo-300/20 via-neutral-300/20 to-emerald-300/20 opacity-50'
            }`}
          />

          {/* Pod Window Frame */}
          <div
            className={`relative w-48 h-60 sm:w-56 sm:h-70 rounded-[28px] overflow-hidden border-2 shadow-2xl transition-all duration-300 ${
              isDark
                ? 'bg-black/90 border-cyan-400/40 shadow-[0_20px_60px_rgba(0,0,0,0.95)] ring-1 ring-white/20'
                : 'bg-white/95 border-indigo-400/40 shadow-[0_20px_50px_rgba(0,0,0,0.18)] ring-1 ring-black/10'
            }`}
          >
            {/* Sci-Fi Corner Overlays */}
            <span
              className={`absolute top-2 left-2 text-[8px] font-mono select-none z-20 pointer-events-none ${
                isDark ? 'text-cyan-400/90' : 'text-indigo-600'
              }`}
            >
              ┌ TRANSMISSION
            </span>
            <span
              className={`absolute top-2 right-2 text-[8px] font-mono select-none z-20 pointer-events-none ${
                isDark ? 'text-emerald-400/90' : 'text-emerald-700'
              }`}
            >
              {hasUnmuted ? 'AUDIO: LINKED ┐' : 'AUDIO: READY ┐'}
            </span>
            <span
              className={`absolute bottom-2 left-2 text-[8px] font-mono select-none z-20 pointer-events-none ${
                isDark ? 'text-neutral-400' : 'text-neutral-500'
              }`}
            >
              └ HYPERSPEED
            </span>
            <span
              className={`absolute bottom-2 right-2 text-[8px] font-mono select-none z-20 pointer-events-none ${
                isDark ? 'text-cyan-400/90' : 'text-indigo-600'
              }`}
            >
              SECTOR 01 ┘
            </span>

            {/* Video Feed */}
            <video
              ref={videoRef}
              src="/dhruva.mp4"
              poster="/dhruva-video-poster.jpg"
              autoPlay
              playsInline
              preload="auto"
              onTimeUpdate={handleTimeUpdate}
              className="w-full h-full object-cover object-[50%_40%] scale-105 pointer-events-none"
            />

            {/* Holographic Lens Flare */}
            <div
              className="absolute inset-0 pointer-events-none opacity-25 mix-blend-overlay"
              style={{
                background: `linear-gradient(${115 + tilt.y * 2.5}deg, rgba(255,255,255,0.7) 0%, transparent 60%)`
              }}
            />

            {/* Audio Toggle Indicator */}
            <div
              onClick={!hasUnmuted ? triggerUnmuteAndPlay : undefined}
              className={`absolute bottom-3 left-3 right-3 z-30 flex items-center justify-between px-3 py-1.5 rounded-xl backdrop-blur-xl transition-all duration-300 ${
                hasUnmuted
                  ? isDark
                    ? 'bg-black/85 border border-emerald-400/50 text-emerald-400'
                    : 'bg-white/95 border border-emerald-500/50 text-emerald-700 shadow-md'
                  : isDark
                  ? 'bg-black/90 border border-amber-400/70 text-amber-300 animate-pulse ring-2 ring-amber-400/30 cursor-pointer'
                  : 'bg-white/95 border border-amber-500/70 text-amber-600 animate-pulse ring-2 ring-amber-400/40 shadow-md cursor-pointer'
              }`}
            >
              <div className="flex items-center gap-1.5">
                {hasUnmuted ? (
                  <Volume2 className={`w-3.5 h-3.5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                ) : (
                  <Headphones className={`w-3.5 h-3.5 ${isDark ? 'text-amber-300' : 'text-amber-600'}`} />
                )}
                <span className="text-[11px] font-mono font-bold tracking-tight">
                  {hasUnmuted ? 'Sound Playing' : 'Tap to Listen'}
                </span>
              </div>

              {hasUnmuted ? (
                <div className="flex items-center gap-0.5">
                  <span
                    className={`w-0.5 h-2 rounded-full animate-[soundWave_0.6s_ease-in-out_infinite] ${
                      isDark ? 'bg-emerald-400' : 'bg-emerald-600'
                    }`}
                  />
                  <span
                    className={`w-0.5 h-3.5 rounded-full animate-[soundWave_0.8s_ease-in-out_infinite_0.15s] ${
                      isDark ? 'bg-emerald-300' : 'bg-emerald-500'
                    }`}
                  />
                  <span
                    className={`w-0.5 h-2 rounded-full animate-[soundWave_0.7s_ease-in-out_infinite_0.3s] ${
                      isDark ? 'bg-emerald-400' : 'bg-emerald-600'
                    }`}
                  />
                </div>
              ) : (
                <span
                  className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase ${
                    isDark ? 'bg-amber-400/20 text-amber-300' : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  Play
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Live Spoken Dialogue HUD Subtitle */}
        <div
          className={`mb-4 px-5 py-2.5 rounded-2xl backdrop-blur-2xl border max-w-lg mx-auto shadow-2xl transition-colors ${
            isDark
              ? 'bg-black/75 border-cyan-400/30 text-neutral-100'
              : 'bg-white/90 border-black/10 text-neutral-900 shadow-xl'
          }`}
        >
          <p className="text-sm sm:text-base font-medium tracking-tight leading-relaxed font-mono">
            <span className={isDark ? 'text-cyan-400 font-bold' : 'text-indigo-600 font-bold'}>“</span>
            <span>Oh, hello there. Yes, I am talking to you. </span>
            <span className={isDark ? 'text-emerald-400 font-bold' : 'text-emerald-600 font-bold'}>
              Welcome to my portfolio!
            </span>
            <span className={isDark ? 'text-cyan-400 font-bold' : 'text-indigo-600 font-bold'}>”</span>
          </p>
          <div className="flex items-center justify-center gap-2 mt-1.5 text-[11px] font-mono text-neutral-400">
            <span className={isDark ? 'text-white font-semibold' : 'text-neutral-900 font-semibold'}>
              Vudatha Dhruva Sai
            </span>
            <span>·</span>
            <span className={isDark ? 'text-cyan-400' : 'text-indigo-600'}>
              AI Systems & Full-Stack Engineer
            </span>
          </div>
        </div>

        {/* Action Button: INITIATE WARP ➔ */}
        <div className="mt-2">
          <Magnet padding={25} magnetStrength={2.5}>
            <button
              data-skip="true"
              onClick={(e) => {
                e.stopPropagation();
                handleProceed();
              }}
              className={`group min-h-[48px] px-8 py-3 rounded-full font-black text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-2xl ${
                isDark
                  ? 'bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-neutral-950 shadow-[0_0_35px_rgba(6,182,212,0.6)] border border-white/80'
                  : 'bg-neutral-950 hover:bg-neutral-800 text-white shadow-[0_15px_35px_rgba(0,0,0,0.25)] border border-black/10'
              }`}
            >
              <Zap className={`w-4 h-4 ${isDark ? 'text-neutral-950 fill-neutral-950' : 'text-amber-400 fill-amber-400'}`} />
              <span>{isWarping ? 'WARPING IN...' : 'INITIATE WARP ➔'}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
            </button>
          </Magnet>
        </div>
      </main>

      {/* 5. Minimal Bottom Telemetry Hint */}
      <footer className="w-full text-center z-20 pointer-events-none shrink-0">
        <p className={`text-[11px] font-mono ${isDark ? 'text-neutral-400' : 'text-neutral-600'} flex items-center justify-center gap-2`}>
          <span>Click & hold anywhere to accelerate warp speed</span>
          <span>·</span>
          <span>Press Esc to enter</span>
        </p>
      </footer>
    </div>
  );
};
