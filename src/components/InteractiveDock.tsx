import React, { useState, useEffect } from 'react';
import {
  Home,
  Layers,
  User,
  Terminal,
  Mail,
  FileText,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Sparkles
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext.tsx';
import {
  isSoundEnabled,
  setSoundEnabled,
  playClickSound,
  playHoverSound
} from '../utils/soundEffects.ts';

interface InteractiveDockProps {
  currentView: 'home' | 'about' | 'portfolio' | 'contact';
  onNavigate: (view: 'home' | 'about' | 'portfolio' | 'contact') => void;
  onOpenResume: () => void;
  onOpenTerminal: () => void;
}

export const InteractiveDock: React.FC<InteractiveDockProps> = ({
  currentView,
  onNavigate,
  onOpenResume,
  onOpenTerminal
}) => {
  const { theme, toggleTheme } = useTheme();
  const [soundOn, setSoundOn] = useState(isSoundEnabled);

  useEffect(() => {
    const handleSoundToggle = (e: Event) => {
      const customEvent = e as CustomEvent<{ enabled: boolean }>;
      if (customEvent.detail) {
        setSoundOn(customEvent.detail.enabled);
      }
    };
    window.addEventListener('dhruva_sound_toggle', handleSoundToggle);
    return () => window.removeEventListener('dhruva_sound_toggle', handleSoundToggle);
  }, []);

  const handleToggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) {
      setTimeout(() => playClickSound(), 10);
    }
  };

  const dockItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      action: () => {
        playClickSound();
        onNavigate('home');
      },
      active: currentView === 'home',
      badge: null
    },
    {
      id: 'portfolio',
      label: 'Projects',
      icon: Layers,
      action: () => {
        playClickSound();
        onNavigate('portfolio');
      },
      active: currentView === 'portfolio',
      badge: '6'
    },
    {
      id: 'about',
      label: 'About',
      icon: User,
      action: () => {
        playClickSound();
        onNavigate('about');
      },
      active: currentView === 'about',
      badge: null
    },
    {
      id: 'terminal',
      label: 'Terminal (⌘K)',
      icon: Terminal,
      action: () => {
        playClickSound();
        onOpenTerminal();
      },
      active: false,
      badge: '●',
      badgeColor: 'text-emerald-400'
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: Mail,
      action: () => {
        playClickSound();
        onNavigate('contact');
      },
      active: currentView === 'contact',
      badge: null
    },
    {
      id: 'resume',
      label: 'Resume',
      icon: FileText,
      action: () => {
        playClickSound();
        onOpenResume();
      },
      active: false,
      badge: '9.33'
    }
  ];

  return (
    <nav
      aria-label="Floating interactive dock"
      className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 select-none max-w-[95vw]"
    >
      <div className="flex items-center gap-1 sm:gap-2 px-3 py-2 rounded-2xl bg-white/80 dark:bg-[#0C0E18]/85 backdrop-blur-2xl border border-black/10 dark:border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.25)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
        {dockItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={item.action}
              onMouseEnter={playHoverSound}
              className={`group relative flex flex-col items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.22] hover:-translate-y-2 active:scale-95 cursor-pointer ${
                item.active
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-md'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10'
              }`}
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:scale-110" />

              {/* Active Dot Under Indicator */}
              {item.active && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-indigo-500 dark:bg-indigo-400" />
              )}

              {/* Badge (e.g. 6 projects, 9.33) */}
              {item.badge && !item.active && (
                <span
                  className={`absolute -top-1 -right-1 text-[8px] font-mono font-bold px-1 rounded-full ${
                    item.badgeColor || 'bg-indigo-500 text-white'
                  }`}
                >
                  {item.badge}
                </span>
              )}

              {/* Tooltip on Hover */}
              <div className="absolute -top-9 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 whitespace-nowrap px-2.5 py-1 rounded-lg bg-neutral-950 text-white text-[10px] font-mono tracking-tight shadow-xl border border-white/10">
                {item.label}
              </div>
            </button>
          );
        })}

        {/* Vertical Divider */}
        <div className="w-px h-6 bg-black/10 dark:bg-white/15 mx-1" />

        {/* Audio Synthesizer Toggle */}
        <button
          onClick={() => {
            playClickSound();
            handleToggleSound();
          }}
          onMouseEnter={playHoverSound}
          className={`group relative flex flex-col items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.22] hover:-translate-y-2 active:scale-95 cursor-pointer ${
            soundOn
              ? 'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10'
              : 'text-neutral-400 dark:text-neutral-500 hover:bg-black/5 dark:hover:bg-white/10'
          }`}
          title={soundOn ? 'Mute haptic audio' : 'Enable haptic audio'}
        >
          {soundOn ? (
            <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
          ) : (
            <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
          )}

          {/* Tooltip on Hover */}
          <div className="absolute -top-9 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 whitespace-nowrap px-2.5 py-1 rounded-lg bg-neutral-950 text-white text-[10px] font-mono tracking-tight shadow-xl border border-white/10">
            {soundOn ? 'Audio: ON 🔊' : 'Audio: OFF 🔇'}
          </div>
        </button>

        {/* Theme Toggle (Day / Night) */}
        <button
          onClick={() => {
            playClickSound();
            toggleTheme();
          }}
          onMouseEnter={playHoverSound}
          className="group relative flex flex-col items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.22] hover:-translate-y-2 active:scale-95 cursor-pointer"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 transition-transform group-hover:rotate-45" />
          ) : (
            <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 transition-transform group-hover:-rotate-12" />
          )}

          {/* Tooltip on Hover */}
          <div className="absolute -top-9 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 whitespace-nowrap px-2.5 py-1 rounded-lg bg-neutral-950 text-white text-[10px] font-mono tracking-tight shadow-xl border border-white/10">
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </div>
        </button>
      </div>
    </nav>
  );
};
