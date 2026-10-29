import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, Bot, Volume2, Headphones } from 'lucide-react';
import DecryptedText from './ui/DecryptedText/DecryptedText';
import ShinyText from './ui/ShinyText/ShinyText';
import Magnet from './ui/Magnet/Magnet';

interface OpeningAnimationProps {
  onComplete: () => void;
}

export const OpeningAnimation: React.FC<OpeningAnimationProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasUnmuted, setHasUnmuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasTriggeredProceed = useRef(false);

  const handleProceed = () => {
    if (hasTriggeredProceed.current) return;
    hasTriggeredProceed.current = true;
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  const triggerUnmuteAndPlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    video.volume = 1.0;
    video.currentTime = 0;
    video.play().catch(() => {});
    setHasUnmuted(true);
    setIsPlaying(true);
  };

  // Video Autoplay & Smart Audio Detection
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isMounted = true;

    // Strictly unmuted by default at 100% volume
    video.volume = 1.0;
    video.muted = false;

    const startPlaying = async () => {
      try {
        // 1. Attempt immediate unmuted playback (Succeeds on Replay & active browsing)
        await video.play();
        if (isMounted) {
          setIsPlaying(true);
          setHasUnmuted(true);
        }
      } catch {
        // 2. If browser autoplay policy holds audio on a fresh cold visit:
        // Keep video playing smoothly so Dhruva is waving and animated!
        try {
          video.muted = true;
          await video.play();
          if (isMounted) {
            setIsPlaying(true);
            setHasUnmuted(false);
          }
        } catch {
          // Ignore
        }

        // The instant user interacts ANYWHERE on the screen, immediately unlock full audio and play from start!
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

  // Keyboard shortcut listener
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

  // Video Progress & Time Sync
  const handleTimeUpdate = () => {
    if (hasTriggeredProceed.current) return;
    const video = videoRef.current;
    if (!video) return;

    if (hasUnmuted) {
      const duration = video.duration && !isNaN(video.duration) ? Math.min(video.duration, 5.5) : 5.5;
      const calculatedPct = Math.min(100, Math.round((video.currentTime / duration) * 100));
      setProgress(calculatedPct);

      if (calculatedPct >= 100 || (video.currentTime >= 5.5 && video.currentTime > 0)) {
        handleProceed();
      }
    } else {
      // Loop smoothly at 0:00 - 5.8s while waiting for user interaction so the visitor never misses Dhruva's speech
      if (video.currentTime >= 5.8) {
        video.currentTime = 0;
        video.play().catch(() => {});
      }
      setProgress(20);
    }
  };

  const handleVideoEnded = () => {
    if (hasUnmuted) {
      handleProceed();
    }
  };

  // Safety fallback: only active while audio is actively playing to completion
  useEffect(() => {
    if (!isPlaying || !hasUnmuted) return;

    const timer = setTimeout(() => {
      handleProceed();
    }, 6200);

    return () => clearTimeout(timer);
  }, [isPlaying, hasUnmuted]);

  const getStatusText = (val: number) => {
    if (!hasUnmuted) return 'Click anywhere to hear Dhruva...';
    if (val < 30) return 'Initializing portfolio systems...';
    if (val < 70) return 'Calibrating AI engineering modules...';
    if (val < 98) return 'Loading production architectures...';
    return 'Ready to explore';
  };

  return (
    <div
      onClick={() => {
        if (!hasUnmuted) {
          triggerUnmuteAndPlay();
        }
      }}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-between bg-[#07080D] text-white select-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-y-auto px-4 py-3 sm:py-6 cursor-pointer ${
        isFadingOut ? 'opacity-0 scale-105 blur-[3px] pointer-events-none' : 'opacity-100 scale-100 blur-0'
      }`}
    >
      {/* Background Matrix / Grid & Ambient Atmospheric Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '36px 36px'
          }}
        ></div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] bg-gradient-to-tr from-emerald-600/15 via-indigo-600/20 to-purple-600/15 rounded-full blur-[90px] sm:blur-[130px] animate-pulse"></div>
      </div>

      {/* Top Bar Skip Button */}
      <header className="w-full max-w-4xl flex items-center justify-end z-30 pointer-events-auto shrink-0 pt-1 pb-1">
        <Magnet padding={15} magnetStrength={2}>
          <button
            data-skip="true"
            onClick={(e) => {
              e.stopPropagation();
              handleProceed();
            }}
            className="min-h-[38px] text-[11px] sm:text-xs font-mono text-neutral-300 hover:text-white px-4 py-1.5 rounded-full border border-white/15 hover:border-white/35 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all cursor-pointer flex items-center gap-1.5 shadow-lg"
            title="Skip intro (or press Esc)"
          >
            <span>Skip</span>
            <span className="text-neutral-400 text-[11px]">➔</span>
          </button>
        </Magnet>
      </header>

      {/* Presentation Container - Guaranteed No Cut-Off on top or bottom */}
      <section
        aria-label="Welcome presentation"
        className="relative z-10 flex flex-col items-center max-w-md w-full text-center py-2 sm:py-4 pointer-events-auto shrink-0 my-auto"
      >
        {/* Hero Video Card featuring Dhruva's Real Animation */}
        <div className="relative group mb-2.5 sm:mb-3">
          {/* Subtle Glowing Aura */}
          <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-emerald-500/20 via-indigo-500/25 to-amber-500/20 blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>

          {/* Video Container - Autoplays Immediately Unmuted */}
          <div className="relative w-44 h-56 sm:w-52 sm:h-64 rounded-2xl sm:rounded-3xl overflow-hidden bg-white border-2 border-white/30 shadow-[0_15px_40px_rgba(0,0,0,0.6)] group-hover:scale-[1.02] transition-transform duration-500">
            <video
              ref={videoRef}
              src="/dhruva.mp4"
              poster="/dhruva-video-poster.jpg"
              autoPlay
              playsInline
              preload="auto"
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleVideoEnded}
              onPlay={() => setIsPlaying(true)}
              className="w-full h-full object-cover object-[50%_45%]"
            />

            {/* Sleek Sound Indicator Badge */}
            <div
              onClick={!hasUnmuted ? triggerUnmuteAndPlay : undefined}
              className={`absolute top-2.5 right-2.5 z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-md shadow-lg transition-all duration-300 cursor-pointer ${
                hasUnmuted
                  ? 'bg-neutral-950/75 text-emerald-400 border border-emerald-400/40'
                  : 'bg-neutral-950/90 text-amber-300 border border-amber-400/50 hover:scale-105 animate-pulse'
              }`}
              title={hasUnmuted ? 'Audio is playing loud and clear' : 'Click to hear Dhruva'}
            >
              {hasUnmuted ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono font-medium tracking-tight">Sound ON</span>
                  <span className="inline-flex items-center gap-0.5 ml-0.5">
                    <span className="w-0.5 h-2 bg-emerald-400 rounded-full animate-[pulse_0.6s_ease-in-out_infinite]"></span>
                    <span className="w-0.5 h-3 bg-emerald-400 rounded-full animate-[pulse_0.8s_ease-in-out_infinite]"></span>
                    <span className="w-0.5 h-1.5 bg-emerald-400 rounded-full animate-[pulse_0.5s_ease-in-out_infinite]"></span>
                  </span>
                </>
              ) : (
                <>
                  <Headphones className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
                  <span className="text-[10px] font-mono font-medium tracking-tight text-amber-300">Tap for Voice 🎧</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Live Spoken Dialogue Caption */}
        <div className="mb-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 max-w-sm mx-auto shadow-sm">
          <p className="text-[11px] sm:text-xs text-neutral-200 font-mono italic flex items-center justify-center gap-1.5">
            <span>"Oh, hello there. Yes, I am talking to you. Welcome to my portfolio!"</span>
            {hasUnmuted && (
              <span className="inline-flex items-center gap-0.5 ml-1">
                <span className="w-1 h-2.5 bg-emerald-400 rounded-full animate-[pulse_0.6s_ease-in-out_infinite]"></span>
                <span className="w-1 h-3.5 bg-emerald-400 rounded-full animate-[pulse_0.8s_ease-in-out_infinite]"></span>
                <span className="w-1 h-2 bg-emerald-400 rounded-full animate-[pulse_0.5s_ease-in-out_infinite]"></span>
              </span>
            )}
          </p>
        </div>

        {/* Hero Identification with DecryptedText from React Bits */}
        <div className="mt-0.5">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] sm:text-[11px] font-mono text-indigo-300 mb-1">
            <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400" />
            <ShinyText
              text="AI Systems Engineer & Full-Stack Developer"
              speed={2.5}
              color="rgba(165, 180, 252, 0.9)"
              shineColor="#ffffff"
            />
          </div>

          <h1 className="text-xl sm:text-2xl font-black tracking-tight mb-0.5 text-white">
            <DecryptedText
              text="VUDATHA DHRUVA SAI"
              animateOn="view"
              speed={30}
              maxIterations={12}
              sequential={true}
              className="bg-gradient-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent font-black tracking-tight"
              encryptedClassName="text-indigo-400 font-mono"
            />
          </h1>

          <p className="text-[11px] sm:text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed mb-2.5">
            Crafting agentic AI swarms, high-speed security engines, and production full-stack systems.
          </p>
        </div>

        {/* Tech Badges Row */}
        <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 mb-2.5 text-[10px] sm:text-[11px] font-mono text-neutral-300">
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

        {/* Video Progress Bar */}
        <div className="w-full max-w-[240px] sm:max-w-xs mb-2.5">
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden p-0.5 border border-white/10 relative">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 via-indigo-500 to-amber-400 rounded-full transition-all duration-75 ease-out shadow-[0_0_12px_rgba(16,185,129,0.7)]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-neutral-400 mt-1 px-1">
            <span className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${hasUnmuted ? 'bg-emerald-400 animate-ping' : 'bg-amber-400 animate-pulse'}`}></span>
              <span className="truncate max-w-[170px] sm:max-w-none">{getStatusText(progress)}</span>
            </span>
            <span className="text-amber-400 font-bold">{progress}%</span>
          </div>
        </div>

        {/* Enter Portfolio Action Button with Magnet */}
        <div className="flex items-center justify-center gap-3">
          <Magnet padding={20} magnetStrength={2}>
            <button
              data-skip="true"
              onClick={(e) => {
                e.stopPropagation();
                handleProceed();
              }}
              className="group min-h-[42px] px-6 py-2 rounded-full bg-white hover:bg-neutral-100 text-neutral-950 font-bold text-xs tracking-wider uppercase shadow-xl flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Enter Portfolio</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </Magnet>
        </div>
      </section>

      {/* Bottom Hint Footer */}
      <footer className="w-full text-center z-20 pointer-events-none shrink-0 mt-1">
        <p className="text-[9px] sm:text-[10px] font-mono text-neutral-400">
          {!hasUnmuted
            ? '🎧 Click anywhere on screen to hear Dhruva speak · Press Esc to enter'
            : '🔊 Sound is playing · Press Esc to enter portfolio'}
        </p>
      </footer>
    </div>
  );
};
