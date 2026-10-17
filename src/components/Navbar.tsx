import React, { useState, useEffect } from 'react';
import { formatHyderabadTime } from '../utils/portfolio.ts';
import { PERSONAL_INFO } from '../data/portfolioData.ts';
import { ArrowLeft, Clock, MapPin, Sparkles, FileText, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.tsx';

interface NavbarProps {
  currentView: 'home' | 'about' | 'portfolio' | 'contact';
  onNavigate: (view: 'home' | 'about' | 'portfolio' | 'contact') => void;
  onOpenResume?: () => void;
  onPlayOpening?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenResume,
  onPlayOpening
}) => {
  const [time, setTime] = useState<string>('');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setTime(formatHyderabadTime(new Date()));
    const interval = setInterval(() => {
      setTime(formatHyderabadTime(new Date()));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="w-full max-w-[1360px] mx-auto px-3 sm:px-8 lg:px-12 pt-3 sm:pt-6 pb-3 sm:pb-4 z-40 sticky top-0 bg-[#ECECEB]/90 dark:bg-[#090A0E]/90 backdrop-blur-md transition-colors duration-300">
      <div className="flex items-center justify-between gap-2 sm:gap-4 text-[13px] sm:text-[15px] font-normal tracking-tight text-[#1c1b1a] dark:text-[#ECECED]">
        {/* Left Side: Brand Name / Home breadcrumb */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {currentView === 'home' ? (
            <button
              onClick={() => onNavigate('home')}
              className="font-bold text-neutral-950 dark:text-white text-sm sm:text-lg tracking-tight hover:opacity-80 transition-opacity flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>{PERSONAL_INFO.name}</span>
            </button>
          ) : (
            <button
              onClick={() => onNavigate('home')}
              className="group inline-flex items-center gap-1.5 text-neutral-800 dark:text-neutral-200 hover:text-neutral-500 dark:hover:text-neutral-400 font-medium transition-colors whitespace-nowrap"
            >
              <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:-translate-x-0.5" />
              <span>Home</span>
            </button>
          )}

          <span className="text-neutral-400 dark:text-neutral-600 font-light hidden lg:inline">/</span>
          <span className="text-neutral-600 dark:text-neutral-400 font-normal hidden xl:inline-block truncate max-w-[200px]">
            {PERSONAL_INFO.role}
          </span>
        </div>

        {/* Center: Quick Navigation Tabs */}
        <nav className="flex items-center bg-white/70 dark:bg-neutral-900/80 backdrop-blur-md border border-black/5 dark:border-white/10 rounded-full p-0.5 sm:p-1 shadow-xs text-[11px] sm:text-xs md:text-sm font-medium shrink-0">
          <button
            onClick={() => onNavigate('home')}
            className={`px-2.5 sm:px-3.5 md:px-4 py-1 sm:py-1.5 rounded-full transition-all ${
              currentView === 'home'
                ? 'bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-200/50 dark:hover:bg-neutral-800'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('about')}
            className={`px-2.5 sm:px-3.5 md:px-4 py-1 sm:py-1.5 rounded-full transition-all ${
              currentView === 'about'
                ? 'bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-200/50 dark:hover:bg-neutral-800'
            }`}
          >
            About
          </button>
          <button
            onClick={() => onNavigate('portfolio')}
            className={`px-2 sm:px-3.5 md:px-4 py-1 sm:py-1.5 rounded-full transition-all ${
              currentView === 'portfolio'
                ? 'bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-200/50 dark:hover:bg-neutral-800'
            }`}
          >
            <span className="hidden sm:inline">Selected </span>Work
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className={`px-2.5 sm:px-3.5 md:px-4 py-1 sm:py-1.5 rounded-full transition-all ${
              currentView === 'contact'
                ? 'bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-200/50 dark:hover:bg-neutral-800'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Right Side: Night Mode Toggle, Bitmoji Intro Replay, Resume Button & Hyderabad Time */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 shrink-0">
          {onPlayOpening && (
            <button
              onClick={onPlayOpening}
              className="p-1.5 sm:p-2 min-h-[36px] min-w-[36px] flex items-center justify-center rounded-full bg-white/70 dark:bg-neutral-900/80 hover:bg-white dark:hover:bg-neutral-800 border border-black/5 dark:border-white/10 text-neutral-800 dark:text-neutral-200 transition-all shadow-xs cursor-pointer group"
              title="Replay Welcome Intro"
              aria-label="Replay Welcome Intro"
            >
              <span className="text-xs sm:text-sm group-hover:scale-125 inline-block transition-transform">👋</span>
            </button>
          )}

          {/* Night Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-1.5 sm:p-2 min-h-[36px] min-w-[36px] flex items-center justify-center rounded-full bg-white/70 dark:bg-neutral-900/80 hover:bg-white dark:hover:bg-neutral-800 border border-black/5 dark:border-white/10 text-neutral-800 dark:text-neutral-200 transition-all shadow-xs cursor-pointer"
            title={theme === 'dark' ? 'Switch to Daylight Mode' : 'Switch to Night Mode'}
            aria-label="Toggle Night Mode"
          >
            {theme === 'dark' ? (
              <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-700" />
            )}
          </button>

          {onOpenResume && (
            <button
              onClick={onOpenResume}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 hover:bg-black dark:hover:bg-neutral-100 text-xs font-semibold transition-all shadow-xs"
              title="View Dhruva's verified resume PDF"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>
          )}

          <div className="hidden xl:flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
            <span className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Hyderabad</span>
            </span>
            <span className="text-neutral-400 dark:text-neutral-600">•</span>
            <span className="font-mono text-xs text-neutral-800 dark:text-neutral-200">{time || 'Live'}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
