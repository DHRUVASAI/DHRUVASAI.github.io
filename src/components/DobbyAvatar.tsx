import React, { useRef, useState, useEffect } from 'react';

export type DobbyState = 'idle' | 'working' | 'making' | 'celebrating';

export interface DobbyAvatarProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  state?: DobbyState;
  isLoading?: boolean;
  isSpeaking?: boolean;
  interactive?: boolean;
  shape?: 'circle' | 'rounded';
  showSpeechBubble?: boolean;
  showStatusDot?: boolean;
  showControls?: boolean;
  statusPosition?: 'top-right' | 'bottom-right';
  className?: string;
  onClick?: () => void;
  title?: string;
}

const STATE_CONFIG: Record<DobbyState, { file: string; line: string }> = {
  idle: {
    file: '/dobby/dobby-idle.mp4',
    line: '🧦 Dobby is here, Master! Click Dobby!'
  },
  working: {
    file: '/dobby/dobby-working.mp4',
    line: '✨ Dobby is working hard for you, Master!'
  },
  making: {
    file: '/dobby/dobby-making.mp4',
    line: '🔨 Dobby is crafting something special!'
  },
  celebrating: {
    file: '/dobby/dobby-celebrating.mp4',
    line: '🎉 Dobby did it! Dobby is a free elf!'
  }
};

const SIZE_MAP = {
  xs: { box: 'w-7 h-7', rounded: 'rounded-xl', borderWidth: 'border-2' },
  sm: { box: 'w-10 h-10', rounded: 'rounded-2xl', borderWidth: 'border-2' },
  md: { box: 'w-14 h-14', rounded: 'rounded-2xl', borderWidth: 'border-2' },
  lg: { box: 'w-20 h-20', rounded: 'rounded-3xl', borderWidth: 'border-[3px]' },
  xl: { box: 'w-28 h-28', rounded: 'rounded-full', borderWidth: 'border-4' },
  '2xl': { box: 'w-48 h-48', rounded: 'rounded-full', borderWidth: 'border-[5px]' }
};

export const DobbyAvatar: React.FC<DobbyAvatarProps> = ({
  size = 'md',
  state: controlledState,
  isLoading = false,
  isSpeaking = false,
  interactive = true,
  shape = 'rounded',
  showSpeechBubble = false,
  showStatusDot = true,
  showControls = false,
  statusPosition = 'bottom-right',
  className = '',
  onClick,
  title = "Dobby the House Elf — Master Dhruva's Loyal Assistant"
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [internalState, setInternalState] = useState<DobbyState>('idle');
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isCelebratingTemp, setIsCelebratingTemp] = useState(false);

  // Derive active state
  let currentState: DobbyState = 'idle';
  if (isCelebratingTemp) {
    currentState = 'celebrating';
  } else if (controlledState) {
    currentState = controlledState;
  } else if (isLoading) {
    currentState = 'working';
  } else {
    currentState = internalState;
  }

  // Update video playback when currentState changes
  useEffect(() => {
    if (videoRef.current) {
      const targetSrc = STATE_CONFIG[currentState].file;
      if (!videoRef.current.src.endsWith(targetSrc)) {
        videoRef.current.src = targetSrc;
        videoRef.current.load();
        videoRef.current.play().catch(() => {});
      }
    }
  }, [currentState]);

  // Pointer tracking for 3D tilt
  useEffect(() => {
    if (!interactive) return;

    let rafId: number | null = null;

    const handlePointerMove = (e: PointerEvent) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = (e.clientX - centerX) / (window.innerWidth / 2);
        const dy = (e.clientY - centerY) / (window.innerHeight / 2);

        const clampedX = Math.max(-1, Math.min(1, dx));
        const clampedY = Math.max(-1, Math.min(1, dy));

        setOffset({ x: clampedX, y: clampedY });
      });
    };

    const handleMouseLeave = () => {
      setOffset({ x: 0, y: 0 });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [interactive]);

  const handleClick = (e: React.MouseEvent) => {
    // Click triggers celebration animation then reverts to idle after 4 seconds
    setIsCelebratingTemp(true);
    setTimeout(() => {
      setIsCelebratingTemp(false);
      setInternalState('idle');
    }, 4000);

    if (onClick) {
      onClick();
    }
  };

  const metrics = SIZE_MAP[size];
  const roundedClass = shape === 'circle' ? 'rounded-full' : metrics.rounded;

  // 3D rotation angles
  const maxRot = isHovered ? 20 : 14;
  const rotY = offset.x * maxRot;
  const rotX = -offset.y * maxRot;

  const isWorking = currentState === 'working' || currentState === 'making' || isLoading;
  const isCelebrating = currentState === 'celebrating';

  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      {/* Speech Bubble (Optional) */}
      {showSpeechBubble && (
        <div className="mb-2 px-3 py-1.5 rounded-full bg-neutral-900/90 dark:bg-white/95 text-white dark:text-neutral-950 text-xs font-semibold shadow-lg backdrop-blur-md border border-white/10 dark:border-black/10 animate-fade-in text-center max-w-xs transition-all pointer-events-none">
          {STATE_CONFIG[currentState].line}
        </div>
      )}

      {/* Main Avatar Interactive Container */}
      <div
        ref={containerRef}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        title={title}
        className="relative inline-flex items-center justify-center select-none cursor-pointer group"
        style={{ perspective: 800 }}
      >
        {/* Magic Glowing Aura when working or celebrating */}
        {(isWorking || isCelebrating || isSpeaking) && (
          <div
            className={`absolute -inset-1.5 ${roundedClass} ${
              isCelebrating
                ? 'bg-gradient-to-tr from-amber-400 via-yellow-300 to-emerald-400 opacity-90 blur-md animate-pulse'
                : 'bg-gradient-to-tr from-emerald-500/70 via-teal-400/50 to-indigo-500/60 opacity-80 blur-sm animate-pulse'
            } pointer-events-none transition-all duration-300`}
          />
        )}

        {/* 3D Stage Frame */}
        <div
          className={`relative ${metrics.box} ${roundedClass} ${metrics.borderWidth} overflow-hidden bg-neutral-900 shadow-xl transition-transform duration-150 ease-out ${
            isCelebrating
              ? 'border-amber-400 ring-4 ring-amber-400/50 shadow-[0_0_25px_rgba(251,191,36,0.6)]'
              : isWorking
              ? 'border-emerald-400 ring-2 ring-emerald-400/50 shadow-[0_0_20px_rgba(52,211,153,0.5)]'
              : 'border-[#e8a800] dark:border-[#e8a800]/80 group-hover:border-amber-300'
          }`}
          style={{
            transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${
              isHovered ? 1.06 : 1
            })`,
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Animated Video Element with Poster Fallback */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            poster="/dobby/dobby.png"
            className="w-full h-full object-cover object-center block select-none pointer-events-none scale-105"
          >
            <source src={STATE_CONFIG[currentState].file} type="video/mp4" />
            <img
              src="/dobby/dobby.png"
              alt="Dobby the House Elf"
              className="w-full h-full object-cover object-top select-none pointer-events-none"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                target.src = '/dobby.jpg';
              }}
            />
          </video>

          {/* Holographic light reflection following cursor */}
          <div
            className="absolute inset-0 pointer-events-none opacity-25 mix-blend-overlay"
            style={{
              background: `linear-gradient(${115 + offset.x * 35}deg, rgba(255,255,255,0.7) 0%, transparent 60%)`
            }}
          />

          {/* Audio Equalizer Waves when speaking / working */}
          {(isWorking || isSpeaking) && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-3 pb-1 px-1 flex items-center justify-center gap-0.5">
              <span className="w-0.5 h-2 bg-emerald-400 rounded-full animate-[soundWave_0.6s_ease-in-out_infinite]" />
              <span className="w-0.5 h-3 bg-emerald-300 rounded-full animate-[soundWave_0.8s_ease-in-out_infinite_0.15s]" />
              <span className="w-0.5 h-2 bg-emerald-400 rounded-full animate-[soundWave_0.7s_ease-in-out_infinite_0.3s]" />
            </div>
          )}
        </div>

        {/* Live Online Green Beacon */}
        {showStatusDot && (
          <span
            className={`absolute ${
              statusPosition === 'top-right' ? '-top-0.5 -right-0.5' : '-bottom-0.5 -right-0.5'
            } flex h-2.5 w-2.5 z-10 pointer-events-none`}
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-neutral-950"></span>
          </span>
        )}
      </div>

      {/* Interactive Controls Buttons (Optional) */}
      {showControls && (
        <div className="mt-3 flex gap-1.5 justify-center flex-wrap">
          {(['idle', 'working', 'making', 'celebrating'] as DobbyState[]).map((btnState) => (
            <button
              key={btnState}
              onClick={() => {
                setIsCelebratingTemp(false);
                setInternalState(btnState);
              }}
              className={`px-3 py-1 rounded-full text-xs font-semibold capitalize transition-all cursor-pointer ${
                currentState === btnState
                  ? 'bg-amber-500 text-neutral-950 font-bold shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-neutral-300 border border-white/10'
              }`}
            >
              {btnState}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
