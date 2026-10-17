import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Volume2, VolumeX, Sparkles, Bot } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';

interface OpeningAnimationProps {
  onComplete: () => void;
}

export const OpeningAnimation: React.FC<OpeningAnimationProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [audioBlocked, setAudioBlocked] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasUnmutedOnce = useRef(false);

  // Synchronize muted state with soundEnabled
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = !soundEnabled;
    }
  }, [soundEnabled]);

  // Master video initialization & audio autoplay handler
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isMounted = true;

    const startPlayback = async () => {
      // 1. First, attempt unmuted playback (sound ON by default)
      video.muted = false;
      try {
        await video.play();
        if (isMounted) {
          setSoundEnabled(true);
          setAudioBlocked(false);
          setHasStarted(true);
        }
      } catch (err) {
        // 2. If the browser blocks unmuted autoplay on initial visit,
        // play muted so the video visuals run smoothly without freezing
        console.warn('Unmuted autoplay prevented by browser; waiting for first interaction:', err);
        if (isMounted && videoRef.current) {
          videoRef.current.muted = true;
          try {
            await videoRef.current.play();
          } catch {}
          setSoundEnabled(false);
          setAudioBlocked(true);
          setHasStarted(true);
        }
      }
    };

    startPlayback();

    // 3. User interaction listener: un-mutes and plays from start on first touch/click/key
    const handleFirstUserInteraction = () => {
      if (hasUnmutedOnce.current) return;
      hasUnmutedOnce.current = true;

      if (videoRef.current) {
        videoRef.current.muted = false;
        // If unmuted shortly after starting, restart so they hear the full greeting from the beginning
        if (videoRef.current.currentTime > 0.8 && videoRef.current.currentTime < 5.0) {
          videoRef.current.currentTime = 0;
        }
        videoRef.current.play().catch(() => {});
        setSoundEnabled(true);
        setAudioBlocked(false);
      }

      cleanupListeners();
    };

    const cleanupListeners = () => {
      window.removeEventListener('pointerdown', handleFirstUserInteraction);
      window.removeEventListener('touchstart', handleFirstUserInteraction);
      window.removeEventListener('click', handleFirstUserInteraction);
      window.removeEventListener('keydown', handleFirstUserInteraction);
    };

    window.addEventListener('pointerdown', handleFirstUserInteraction, { passive: true });
    window.addEventListener('touchstart', handleFirstUserInteraction, { passive: true });
    window.addEventListener('click', handleFirstUserInteraction, { passive: true });
    window.addEventListener('keydown', handleFirstUserInteraction, { passive: true });

    // Safety fallback: ensure animation transitions within 8.5 seconds even if video stalls
    const fallbackTimer = setTimeout(() => {
      if (isMounted) {
        handleProceed();
      }
    }, 8500);

    return () => {
      isMounted = false;
      clearTimeout(fallbackTimer);
      cleanupListeners();
    };
  }, []);

  // Update progress bar based on actual video playback
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration || isNaN(video.duration)) return;

    const currentPct = Math.min(100, Math.round((video.currentTime / video.duration) * 100));
    setProgress(currentPct);

    // Auto-proceed smoothly once video reaches end
    if (video.currentTime >= video.duration - 0.15 || currentPct >= 100) {
      setTimeout(() => {
        handleProceed();
      }, 550);
    }
  };

  const handleVideoEnded = () => {
    setProgress(100);
    setTimeout(() => {
      handleProceed();
    }, 500);
  };

  const handleProceed = () => {
    if (isFadingOut) return;
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  const toggleSound = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const next = !soundEnabled;
    setSoundEnabled(next);
    setAudioBlocked(false);
    hasUnmutedOnce.current = true;

    if (videoRef.current) {
      videoRef.current.muted = !next;
      if (next) {
        videoRef.current.play().catch(() => {});
      }
    }
  };

  // Keyboard shortcut listener for escape / space to enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        handleProceed();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getStatusText = (val: number) => {
    if (val < 25) return 'Greeting visitor...';
    if (val < 60) return 'Calibrating AI engineering modules...';
    if (val < 90) return 'Loading production architectures...';
    return 'Ready to explore';
  };

  return (
    <div
      onClick={() => {
        if (audioBlocked) {
          toggleSound();
        }
      }}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#07080D] text-white select-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-y-auto px-4 py-4 sm:py-6 cursor-pointer ${
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

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[540px] h-[340px] sm:h-[540px] bg-gradient-to-tr from-emerald-600/15 via-indigo-600/20 to-purple-600/15 rounded-full blur-[100px] sm:blur-[140px] animate-pulse"></div>
        <div className="absolute top-1/4 left-1/3 w-[180px] sm:w-[260px] h-[180px] sm:h-[260px] bg-amber-500/10 rounded-full blur-[70px] sm:blur-[90px]"></div>
      </div>

      {/* Top Bar Controls (Sound & Skip) */}
      <div className="absolute top-3 right-3 sm:top-5 sm:right-6 flex items-center gap-2 z-30 pointer-events-auto">
        <button
          onClick={toggleSound}
          className={`text-[11px] sm:text-xs font-mono px-3 py-1.5 rounded-full border backdrop-blur-md transition-all flex items-center gap-1.5 cursor-pointer shadow-lg ${
            soundEnabled
              ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20'
              : 'border-white/10 bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 animate-pulse'
          }`}
          title={soundEnabled ? 'Mute audio' : 'Turn sound on'}
        >
          {soundEnabled ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Audio On</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-amber-300 font-semibold">Tap for Sound 🔊</span>
            </>
          )}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleProceed();
          }}
          className="text-[11px] sm:text-xs font-mono text-neutral-400 hover:text-white px-3 py-1.5 rounded-full border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all cursor-pointer flex items-center gap-1 shadow-lg"
          title="Skip intro (or press Esc/Space)"
        >
          <span>Skip</span>
          <span className="text-neutral-500 text-[10px]">➔</span>
        </button>
      </div>

      {/* Main Presentation Container */}
      <div className="relative z-10 flex flex-col items-center max-w-md sm:max-w-lg w-full text-center my-auto py-2 pointer-events-auto">
        
        {/* Animated Speech Bubble */}
        <div className="mb-2.5 sm:mb-3 relative animate-bounce [animation-duration:2.5s] z-20">
          <div className="relative inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-2xl bg-neutral-900/95 border border-white/20 shadow-2xl backdrop-blur-md">
            <span className="inline-block text-base sm:text-lg animate-wiggle">👋</span>
            <div className="text-left">
              <p className="text-[11px] sm:text-xs font-semibold text-white tracking-wide">
                Hi! I'm <span className="text-amber-400 font-bold">Dhruva Sai</span>
              </p>
              <p className="text-[9px] sm:text-[10px] text-neutral-300 font-mono">
                "Welcome to my portfolio!"
              </p>
            </div>
            {soundEnabled && (
              <span className="flex items-center gap-0.5 ml-1">
                <span className="w-1 h-3 bg-emerald-400 rounded-full animate-[pulse_0.6s_ease-in-out_infinite]"></span>
                <span className="w-1 h-4 bg-emerald-400 rounded-full animate-[pulse_0.8s_ease-in-out_infinite]"></span>
                <span className="w-1 h-2 bg-emerald-400 rounded-full animate-[pulse_0.5s_ease-in-out_infinite]"></span>
              </span>
            )}
          </div>
          <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-neutral-800 mx-auto"></div>
        </div>

        {/* Hero Video Card featuring Dhruva's Real Animation */}
        <div className="relative group mb-3 sm:mb-4">
          {/* Subtle Glowing Aura */}
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-emerald-500/20 via-indigo-500/25 to-amber-500/20 blur-xl opacity-75 group-hover:opacity-100 transition-opacity"></div>

          {/* Video Container (Crisp White Background matching the animation artwork) */}
          <div className="relative w-52 h-64 sm:w-60 sm:h-72 md:w-68 md:h-80 rounded-2xl sm:rounded-3xl overflow-hidden bg-white border-2 border-white/30 shadow-[0_15px_40px_rgba(0,0,0,0.6)] group-hover:scale-[1.02] transition-transform duration-500">
            <video
              ref={videoRef}
              src="/dhruva.mp4"
              poster="/dhruva-video-poster.jpg"
              autoPlay
              playsInline
              preload="auto"
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleVideoEnded}
              className="w-full h-full object-cover object-[50%_45%]"
            />

            {/* Quick sound toggle pill inside the card */}
            <button
              onClick={toggleSound}
              className={`absolute top-2.5 right-2.5 z-20 px-2.5 py-1 rounded-full text-[10px] font-mono backdrop-blur-md border transition-all cursor-pointer flex items-center gap-1.5 shadow-lg ${
                soundEnabled
                  ? 'bg-black/60 hover:bg-black/80 text-emerald-400 border-white/20'
                  : 'bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold border-amber-300 animate-bounce'
              }`}
              title={soundEnabled ? 'Mute audio' : 'Unmute audio'}
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-3 h-3 text-emerald-400" />
                  <span className="text-white text-[9px]">Audio On</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3 h-3 text-neutral-950" />
                  <span className="text-[9px]">Unmute 🔊</span>
                </>
              )}
            </button>

            {/* Floating Audio Tap Banner if browser blocked unmuted autoplay */}
            {audioBlocked && (
              <div
                onClick={toggleSound}
                className="absolute inset-x-3 bottom-3 z-30 py-1.5 px-3 rounded-xl bg-neutral-900/90 text-white backdrop-blur-md border border-amber-400/50 shadow-2xl flex items-center justify-center gap-2 cursor-pointer hover:bg-neutral-900 transition-colors"
              >
                <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span className="text-[11px] font-medium text-amber-200">
                  Tap to hear Dhruva's voice 🎧
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Live Spoken Dialogue Caption */}
        <div className="mb-2.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 max-w-sm mx-auto">
          <p className="text-[11px] sm:text-xs text-neutral-300 font-mono italic">
            "Oh, hello there. Yes, I am talking to you. Welcome to my portfolio!"
          </p>
        </div>

        {/* Hero Identification */}
        <div className="mt-1">
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

        {/* Video Progress Bar */}
        <div className="w-full max-w-[240px] sm:max-w-xs mb-3 sm:mb-4">
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden p-0.5 border border-white/10 relative">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 via-indigo-500 to-amber-400 rounded-full transition-all duration-100 ease-out shadow-[0_0_12px_rgba(16,185,129,0.7)]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

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
            onClick={(e) => {
              e.stopPropagation();
              handleProceed();
            }}
            className="group px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-white hover:bg-neutral-100 text-neutral-950 font-bold text-[11px] sm:text-xs tracking-wider uppercase shadow-xl flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Enter Portfolio</span>
            <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Hint footer */}
        <p className="text-[9px] sm:text-[10px] font-mono text-neutral-600 mt-2 sm:mt-3">
          Press Esc or Space to enter · Click anywhere to unmute/proceed
        </p>
      </div>
    </div>
  );
};
