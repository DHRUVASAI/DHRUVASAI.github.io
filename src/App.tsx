import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { HomeBento } from './components/HomeBento.tsx';
import { AboutView } from './components/AboutView.tsx';
import { PortfolioView } from './components/PortfolioView.tsx';
import { ContactView } from './components/ContactView.tsx';
import { ProjectDetailModal } from './components/ProjectDetailModal.tsx';
import { ResumeModal } from './components/ResumeModal.tsx';
import { GeminiChatbot } from './components/GeminiChatbot.tsx';
import { OpeningAnimation } from './components/OpeningAnimation.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { getProjectById } from './utils/portfolio.ts';

type ViewType = 'home' | 'about' | 'portfolio' | 'contact';

function AppContent() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [showOpening, setShowOpening] = useState<boolean>(() => {
    try {
      if (typeof window !== 'undefined') {
        const hash = window.location.hash.replace('#', '').toLowerCase();
        if (hash === 'about' || hash === 'portfolio' || hash === 'contact') {
          return false;
        }
      }
    } catch {
      // ignore
    }
    return true;
  });
  const [isRevealing, setIsRevealing] = useState<boolean>(false);

  const handleOpeningComplete = () => {
    setShowOpening(false);
    setIsRevealing(true);
    setTimeout(() => {
      setIsRevealing(false);
    }, 1000);
  };

  // Sync with browser URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'about' || hash === 'portfolio' || hash === 'contact' || hash === 'home') {
        setCurrentView(hash as ViewType);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (view: ViewType) => {
    setCurrentView(view);
    window.location.hash = view;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProject = (projectId: string) => {
    setSelectedProjectId(projectId);
  };

  const selectedProject = selectedProjectId ? getProjectById(selectedProjectId) || null : null;

  return (
    <div className="min-h-screen bg-[#ECECEB] dark:bg-[#090A0E] text-[#111111] dark:text-[#ECECED] flex flex-col justify-between selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-300 relative overflow-x-hidden">
      {/* Skip to Main Content Link for Keyboard & Screen Readers */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-neutral-900 focus:text-white dark:focus:bg-white dark:focus:text-neutral-900 focus:rounded-xl focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs font-semibold"
      >
        Skip to main content
      </a>

      {/* Opening Intro Animation */}
      {showOpening && (
        <OpeningAnimation
          onComplete={handleOpeningComplete}
        />
      )}

      {/* Cinematic Reveal Beam Effect on Entrance */}
      {isRevealing && (
        <div className="fixed inset-0 pointer-events-none z-30 bg-gradient-to-b from-indigo-500/15 via-emerald-500/5 to-transparent transition-opacity duration-1000" />
      )}

      {/* Top Navbar with Night Mode toggle and Entrance Transition */}
      <div
        className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          showOpening
            ? 'opacity-0 -translate-y-6 pointer-events-none'
            : 'opacity-100 translate-y-0'
        }`}
      >
        <Navbar
          currentView={currentView}
          onNavigate={navigateTo}
          onOpenResume={() => setIsResumeOpen(true)}
          onPlayOpening={() => setShowOpening(true)}
        />
      </div>

      {/* Main View Transition from Opening Animation */}
      <main
        id="main-content"
        tabIndex={-1}
        className={`flex-1 flex flex-col justify-start outline-none transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          showOpening
            ? 'opacity-0 scale-[0.98] translate-y-8 blur-[2px] pointer-events-none'
            : 'opacity-100 scale-100 translate-y-0 blur-0'
        }`}
      >
        {currentView === 'home' && (
          <HomeBento
            onNavigate={navigateTo}
            onOpenProject={handleOpenProject}
            onOpenResume={() => setIsResumeOpen(true)}
          />
        )}

        {currentView === 'about' && (
          <AboutView
            onNavigate={navigateTo}
            onOpenProject={handleOpenProject}
            onOpenResume={() => setIsResumeOpen(true)}
          />
        )}

        {currentView === 'portfolio' && (
          <PortfolioView
            onOpenProject={handleOpenProject}
            onNavigate={navigateTo}
          />
        )}

        {currentView === 'contact' && (
          <ContactView onNavigate={navigateTo} />
        )}
      </main>

      {/* Interactive Gemini Chatbot */}
      <GeminiChatbot />

      {/* Modals */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProjectId(null)}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
