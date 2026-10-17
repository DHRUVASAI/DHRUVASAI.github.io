import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Volume2, VolumeX, Sparkles, MapPin, Terminal, Bot } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';

interface OpeningAnimationProps {
  onComplete: () => void;
}

export const OpeningAnimation: React.FC<OpeningAnimationProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Sync video audio track with soundEnabled state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = !soundEnabled;
    }
  }, [soundEnabled]);

  // Ensure autoplay starts smoothly on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay handled gracefully by browser policies
      });
    }
  }, []);

  useEffect(() => {
    const startTime = performance.now();
    const duration = 5800; // 5.8s fluid duration matching dhruva.mp4 greeting animation

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const current = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        // Auto proceed smoothly after 100%
        setTimeout(() => {
          handleProceed();
        }, 850);
      }
    }, 25);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        handleProceed();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleProceed = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 620);
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (videoRef.current) {
      videoRef.current.muted = !next;
      if (next) {
        videoRef.current.play().catch(() => {});
      }
    }
  };

  // Status message corresponding to progress
  const getStatusText = (val: number) => {
    if (val < 30) return 'Initializing portfolio systems...';
    if (val < 65) return 'Calibrating AI engineering modules...';
    if (val < 95) return 'Loading production architectures...';
    return 'Ready to explore';
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#07080D] text-white select-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-y-auto px-4 py-4 sm:py-6 ${
        isFadingOut ? 'opacity-0 scale-105 blur-[3px] pointer-events-none' : 'opacity-100 scale-100 blur-0'
      }`}
    >
      {/* Background Matrix / Grid & Ambient Atmospheric Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle engineering grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '36px 36px'
          }}
        ></div>

        {/* Ambient vibrant glowing orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[520px] h-[340px] sm:h-[520px] bg-gradient-to-tr from-emerald-600/15 via-indigo-600/20 to-purple-600/15 rounded-full blur-[100px] sm:blur-[130px] animate-pulse"></div>
        <div className="absolute top-1/4 left-1/3 w-[180px] sm:w-[260px] h-[180px] sm:h-[260px] bg-amber-500/10 rounded-full blur-[70px] sm:blur-[90px]"></div>
      </div>

      {/* Top Bar Controls (Sound & Skip) */}
      <div className="absolute top-3 right-3 sm:top-5 sm:right-6 flex items-center gap-2 z-30">
        <button
          onClick={toggleSound}
          className="text-[11px] sm:text-xs font-mono text-neutral-400 hover:text-white px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all flex items-center gap-1.5 cursor-pointer"
          title={soundEnabled ? 'Mute audio' : 'Play greeting sound'}
        >
          {soundEnabled ? (
            <>
              <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Audio On</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-neutral-500" />
              <span className="hidden sm:inline">Sound</span>
            </>
          )}
        </button>

        <button
          onClick={handleProceed}
          className="text-[11px] sm:text-xs font-mono text-neutral-400 hover:text-white px-3 py-1 sm:py-1.5 rounded-full border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all cursor-pointer flex items-center gap-1"
          title="Skip intro (or press Esc/Space)"
        >
          <span>Skip</span>
          <span className="text-neutral-500 text-[10px]">➔</span>
        </button>
      </div>

      {/* Main Presentation Container - Fit for all devices */}
      <div className="relative z-10 flex flex-col items-center max-w-md sm:max-w-lg w-full text-center my-auto py-2">
        
        {/* Animated Speech Bubble */}
        <div className="mb-2.5 sm:mb-3 relative animate-bounce [animation-duration:2.5s] z-20">
          <div className="relative inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-2xl bg-neutral-900/95 border border-white/15 shadow-2xl backdrop-blur-md">
            <span className="inline-block text-base sm:text-lg animate-wiggle">👋</span>
            <div className="text-left">
              <p className="text-[11px] sm:text-xs font-semibold text-white tracking-wide">
                Hi! I'm <span className="text-amber-400 font-bold">Dhruva Sai</span>
              </p>
              <p className="text-[9px] sm:text-[10px] text-neutral-400">
                Welcome to my portfolio!
              </p>
            </div>
          </div>
          {/* Pointer caret */}
          <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-neutral-800 mx-auto"></div>
        </div>

        {/* Hero Video Card featuring Dhruva's animation */}
        <div className="relative group mb-3 sm:mb-4">
          {/* Glowing Aura */}
          <div className="absolute -inset-1.5 sm:-inset-2 rounded-3xl bg-gradient-to-tr from-emerald-500/25 via-indigo-500/30 to-amber-500/25 blur-lg opacity-75 group-hover:opacity-100 transition-opacity animate-pulse"></div>

          {/* Reference Card Container: Dhruva's Real Video */}
          <div className="relative w-48 h-60 sm:w-56 sm:h-70 md:w-64 md:h-80 rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-950 border border-white/15 shadow-2xl group-hover:scale-[1.02] transition-transform duration-500">
            <video
              ref={videoRef}
              src="/dhruva.mp4"
              poster="/dhruva-video-poster.jpg"
              autoPlay
              loop
              muted={!soundEnabled}
              playsInline
              className="w-full h-full object-cover object-[52%_center] filter brightness-105 contrast-105"
            />

            {/* Quick sound toggle badge on the video card */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleSound();
              }}
              className="absolute top-2.5 right-2.5 z-20 p-1.5 rounded-full bg-black/60 hover:bg-black/85 text-white/80 hover:text-white backdrop-blur-md border border-white/10 transition-all cursor-pointer flex items-center gap-1 shadow-md"
              title={soundEnabled ? 'Mute audio' : 'Unmute audio'}
            >
              {soundEnabled ? (
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
              )}
            </button>

            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-transparent pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-14 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />

            {/* Bottom Card Labels */}
            <div className="absolute bottom-3 left-3.5 right-3.5 sm:bottom-4 sm:left-4 sm:right-4 text-left text-white flex items-end justify-between pointer-events-none z-10">
              <div>
                <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-emerald-400 font-bold font-mono flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  AI Engineer
                </div>
                <div className="text-sm sm:text-base font-bold tracking-tight text-white drop-shadow-md">
                  {PERSONAL_INFO.name}
                </div>
              </div>
              <span className="text-[9px] sm:text-[10px] px-2 sm:px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-white font-medium border border-white/20 flex items-center gap-1.5 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Hyderabad, IN</span>
              </span>
            </div>
          </div>
        </div>

        {/* Hero Identification & Greeting */}
        <div className="mt-1 sm:mt-2">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] sm:text-[11px] font-mono text-indigo-300 mb-1.5">
            <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400" />
            <span>AI Systems Engineer & Full-Stack Developer</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight mb-1 text-white">
            <span className="bg-gradient-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent">
              VUDATHA DHRUVA SAI
            </span>
          </h1>

          <p className="text-[11px] sm:text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed mb-3">
            Crafting agentic AI swarms, high-speed security engines, and production full-stack systems.
          </p>
        </div>

        {/* Tech Badges Row */}
        <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 mb-3 sm:mb-4 text-[10px] sm:text-[11px] font-mono text-neutral-300">
          <span className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1">
            <span className="text-amber-400">🐍</span> Python
          </span>
          <span className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1">
            <span className="text-cyan-400">⚛️</span> React & Next.js
          </span>
          <span className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1">
            <span className="text-orange-400">☁️</span> AWS Cloud
          </span>
          <span className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1">
            <Bot className="w-2.5 h-2.5 text-emerald-400" /> Agentic AI
          </span>
        </div>

        {/* Laser Loading Bar */}
        <div className="w-full max-w-[240px] sm:max-w-xs mb-3 sm:mb-4">
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden p-0.5 border border-white/10 relative">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 via-indigo-500 to-amber-400 rounded-full transition-all duration-75 ease-out shadow-[0_0_12px_rgba(16,185,129,0.7)]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-neutral-400 mt-1.5 px-1">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="truncate max-w-[170px] sm:max-w-none">{getStatusText(progress)}</span>
            </span>
            <span className="text-amber-400 font-bold">{progress}%</span>
          </div>
        </div>

        {/* Enter Portfolio Action Button */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={handleProceed}
            className="group px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-white hover:bg-neutral-100 text-neutral-950 font-bold text-[11px] sm:text-xs tracking-wider uppercase shadow-xl flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Enter Portfolio</span>
            <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Hint footer */}
        <p className="text-[9px] sm:text-[10px] font-mono text-neutral-600 mt-2 sm:mt-3">
          Press Esc or Space to enter · Click button to proceed
        </p>
      </div>
    </div>
  );
};
