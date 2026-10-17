import React, { useState } from 'react';
import { PROJECTS, Project, PERSONAL_INFO } from '../data/portfolioData.ts';
import { filterProjects } from '../utils/portfolio.ts';
import { ArrowUpRight, Github, ExternalLink, Activity, Shield, Sparkles, Terminal, Cpu, Database, Network, GitBranch, Layers, CheckCircle2 } from 'lucide-react';
import { GitDiagramArchitecture } from './GitDiagramArchitecture.tsx';

interface PortfolioViewProps {
  onOpenProject: (projectId: string) => void;
  onNavigate: (view: 'home' | 'about' | 'portfolio' | 'contact') => void;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({ onOpenProject, onNavigate }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [activeTabMap, setActiveTabMap] = useState<Record<string, 'preview' | 'architecture'>>({});
  const [customProjectImages, setCustomProjectImages] = useState<Record<string, string>>({});
  const [customArchImages, setCustomArchImages] = useState<Record<string, string>>({});

  React.useEffect(() => {
    const images: Record<string, string> = {};
    const archImages: Record<string, string> = {};
    PROJECTS.forEach((p) => {
      try {
        const saved = localStorage.getItem(`dhruva_project_image_${p.id}`);
        if (saved) images[p.id] = saved;
        const savedArch = localStorage.getItem(`dhruva_arch_image_${p.id}`);
        if (savedArch) archImages[p.id] = savedArch;
      } catch {
        // ignore
      }
    });
    setCustomProjectImages(images);
    setCustomArchImages(archImages);
  }, []);

  const handleUpdateDiagramImage = (projectId: string, imageUrl: string | null) => {
    setCustomArchImages((prev) => {
      const updated = { ...prev };
      if (imageUrl) {
        updated[projectId] = imageUrl;
        try {
          localStorage.setItem(`dhruva_arch_image_${projectId}`, imageUrl);
        } catch {
          // ignore
        }
      } else {
        delete updated[projectId];
        try {
          localStorage.removeItem(`dhruva_arch_image_${projectId}`);
        } catch {
          // ignore
        }
      }
      return updated;
    });
  };

  const filteredProjects = filterProjects(PROJECTS, selectedFilter);

  const toggleTab = (projectId: string, tab: 'preview' | 'architecture', e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveTabMap((prev) => ({ ...prev, [projectId]: tab }));
  };

  // Bespoke high-fidelity renders replicating the exact screenshots uploaded by the user
  const renderProjectVisual = (project: Project) => {
    const activeTab = activeTabMap[project.id] || 'preview';

    if (activeTab === 'preview' && customProjectImages[project.id]) {
      return (
        <div className="relative w-full aspect-[16/10] bg-neutral-950 rounded-2xl overflow-hidden border border-neutral-800 shadow-xl group/pic">
          <img
            src={customProjectImages[project.id]}
            alt={project.title}
            className="w-full h-full object-cover group-hover/pic:scale-[1.02] transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
            <span className="font-mono text-[11px] text-neutral-300 font-semibold">{project.title}</span>
            <span className="text-[10px] bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-white font-mono">
              Custom Snapshot
            </span>
          </div>
        </div>
      );
    }

    if (activeTab === 'architecture') {
      return (
        <GitDiagramArchitecture
          project={project}
          customDiagramImage={customArchImages[project.id]}
          onUpdateDiagramImage={handleUpdateDiagramImage}
        />
      );
    }

    switch (project.id) {
      case 'edge':
        return (
          // Replicating Edge - CRICMETRICS ANALYTICS STUDIO from screenshot 1
          <div className="relative w-full aspect-[16/10] bg-[#0a0a0c] rounded-2xl overflow-hidden p-3.5 sm:p-5 flex flex-col justify-between border border-neutral-800 shadow-xl text-white group-hover:scale-[1.01] transition-transform duration-500">
            {/* Top console bar */}
            <div className="flex items-center justify-between border-b border-neutral-800/80 pb-2 text-[10px] sm:text-[11px]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white tracking-tight">Edge</span>
                <span className="text-neutral-500 hidden sm:inline">•</span>
                <span className="text-emerald-400 font-mono text-[9px] uppercase tracking-wider">
                  SYSTEM CONSOLE
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-neutral-400 text-[10px] hidden sm:inline">Home / Decision Engine</span>
                <span className="bg-neutral-900 border border-neutral-700 text-neutral-300 px-2 py-0.5 rounded text-[9px]">
                  ▶ Replay Intro
                </span>
              </div>
            </div>

            {/* Headline */}
            <div className="pt-1">
              <div className="text-base sm:text-xl font-extrabold tracking-tight text-white uppercase font-sans">
                CRICMETRICS ANALYTICS STUDIO
              </div>
            </div>

            {/* 3 Metric Cards */}
            <div className="grid grid-cols-3 gap-2 py-1">
              <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-2 sm:p-2.5">
                <div className="text-[9px] uppercase tracking-wider text-neutral-400 font-medium truncate">
                  Matches Analyzed
                </div>
                <div className="text-sm sm:text-lg font-bold text-white font-mono mt-0.5">
                  14,729
                </div>
                <div className="flex gap-1.5 text-[8px] text-neutral-500 mt-1">
                  <span className="text-emerald-400">T20: 45%</span>
                  <span className="text-sky-400">ODI: 21%</span>
                </div>
              </div>

              <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-2 sm:p-2.5">
                <div className="text-[9px] uppercase tracking-wider text-neutral-400 font-medium truncate">
                  Ball-By-Ball Events
                </div>
                <div className="text-sm sm:text-lg font-bold text-white font-mono mt-0.5 truncate">
                  9,569,669
                </div>
                <div className="text-[8px] text-emerald-400 mt-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Realtime Index</span>
                </div>
              </div>

              <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-2 sm:p-2.5">
                <div className="text-[9px] uppercase tracking-wider text-neutral-400 font-medium truncate">
                  Player Profiles
                </div>
                <div className="text-sm sm:text-lg font-bold text-white font-mono mt-0.5">
                  11,985
                </div>
                <div className="text-[8px] text-neutral-500 mt-1 truncate">
                  4,104 photos mapped
                </div>
              </div>
            </div>

            {/* Match Center: RSA vs IND */}
            <div className="bg-neutral-950 rounded-xl p-2.5 border border-neutral-800/90">
              <div className="flex items-center justify-between text-[10px] mb-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  <span className="font-bold text-white text-[11px]">INTERNATIONAL MATCH CENTER</span>
                </div>
                <span className="bg-lime-500 text-black text-[9px] font-bold px-1.5 py-0.5 rounded">
                  RSA VS IND
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">South Africa</span>
                    <span className="font-mono text-neutral-300">172/6 (20 Ov)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white font-semibold">India</span>
                    <span className="font-mono text-white font-bold">175/4 (18.4 Ov)</span>
                  </div>
                </div>
                <div className="space-y-1 pl-2 border-l border-neutral-800">
                  <div className="text-[9px] text-neutral-400">At the Crease:</div>
                  <div className="text-[10px] text-white font-medium truncate">
                    Suryakumar Yadav 56* (34) · SR 164.7
                  </div>
                </div>
              </div>

              {/* Win Chance Bar */}
              <div className="mt-2 pt-1 border-t border-neutral-800/80 flex items-center justify-between text-[9px] font-mono">
                <span className="text-neutral-500">RSA Win: 0%</span>
                <span className="text-emerald-400 font-bold">IND Win: 100% [LOW RISK]</span>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="flex items-center justify-between text-[9px] text-neutral-500 pt-1">
              <span>Kingsmead, Durban · Result: India won by 6 wickets</span>
              <div className="flex gap-1">
                <span className="bg-lime-500 text-black px-1.5 py-0.2 rounded font-bold text-[8px]">T20</span>
                <span className="bg-neutral-800 text-neutral-400 px-1 py-0.2 rounded text-[8px]">ODI</span>
                <span className="bg-neutral-800 text-neutral-400 px-1 py-0.2 rounded text-[8px]">TEST</span>
              </div>
            </div>
          </div>
        );

      case 'vibeverse':
        return (
          // Replicating VibeVerse from screenshot 2
          <div className="relative w-full aspect-[16/10] bg-gradient-to-b from-[#0c081a] via-[#120c24] to-[#0a0614] rounded-2xl overflow-hidden p-3.5 sm:p-5 flex flex-col justify-between border border-purple-900/40 shadow-xl text-white group-hover:scale-[1.01] transition-transform duration-500">
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-purple-900/30 pb-2 text-[10px]">
              <span className="font-serif tracking-widest text-purple-300 font-bold text-xs uppercase">
                VIBE VERSE
              </span>
              <div className="flex items-center gap-1.5">
                <span className="bg-purple-950/80 text-purple-300 border border-purple-800/50 px-2 py-0.5 rounded-full text-[9px]">
                  🎯 Vibe Map
                </span>
                <span className="bg-purple-950/80 text-purple-300 border border-purple-800/50 px-2 py-0.5 rounded-full text-[9px] hidden sm:inline">
                  📖 Vibe Journal
                </span>
                <span className="bg-purple-900/60 text-purple-200 px-2 py-0.5 rounded-full text-[9px]">
                  🎨 Default
                </span>
              </div>
            </div>

            {/* Central Card */}
            <div className="my-auto py-1 text-center max-w-md mx-auto w-full">
              <h3 className="text-base sm:text-xl font-serif text-purple-200 tracking-wide font-normal mb-1">
                HOW ARE YOU FEELING TODAY?
              </h3>
              <p className="text-[10px] text-purple-400/80 mb-3">
                Describe your mood, and let us find your perfect cinematic match
              </p>

              {/* Search Bar */}
              <div className="bg-[#1a142e] border border-purple-700/40 rounded-xl p-1 flex items-center justify-between mb-3 text-left">
                <span className="text-[10px] text-purple-400 px-2.5 truncate">
                  Type your mood... (e.g., dreamy, adventurous, nostalgic)
                </span>
                <button className="bg-purple-600 text-white text-[10px] font-semibold px-3 py-1 rounded-lg">
                  Explore →
                </button>
              </div>

              {/* 8 Mood Pills in 2x4 grid */}
              <div className="grid grid-cols-4 gap-1.5 text-[9px]">
                <div className="bg-[#1b1430] border border-purple-800/40 rounded-lg p-1.5 text-center">
                  <div className="text-xs">😊</div>
                  <div className="font-bold text-purple-200">Happy</div>
                  <div className="text-[7px] text-purple-400 truncate">Uplifting</div>
                </div>
                <div className="bg-[#1b1430] border border-purple-800/40 rounded-lg p-1.5 text-center">
                  <div className="text-xs">😢</div>
                  <div className="font-bold text-purple-200">Sad</div>
                  <div className="text-[7px] text-purple-400 truncate">Melancholic</div>
                </div>
                <div className="bg-[#1b1430] border border-purple-800/40 rounded-lg p-1.5 text-center">
                  <div className="text-xs">😱</div>
                  <div className="font-bold text-purple-200">Thriller</div>
                  <div className="text-[7px] text-purple-400 truncate">Suspenseful</div>
                </div>
                <div className="bg-[#1b1430] border border-purple-800/40 rounded-lg p-1.5 text-center">
                  <div className="text-xs">💕</div>
                  <div className="font-bold text-purple-200">Romantic</div>
                  <div className="text-[7px] text-purple-400 truncate">Love & Passion</div>
                </div>
                <div className="bg-[#1b1430] border border-purple-800/40 rounded-lg p-1.5 text-center">
                  <div className="text-xs">💥</div>
                  <div className="font-bold text-purple-200">Action</div>
                  <div className="text-[7px] text-purple-400 truncate">Explosive</div>
                </div>
                <div className="bg-[#1b1430] border border-purple-800/40 rounded-lg p-1.5 text-center">
                  <div className="text-xs">😂</div>
                  <div className="font-bold text-purple-200">Comedy</div>
                  <div className="text-[7px] text-purple-400 truncate">Hilarious</div>
                </div>
                <div className="bg-[#1b1430] border border-purple-800/40 rounded-lg p-1.5 text-center">
                  <div className="text-xs">🕵️</div>
                  <div className="font-bold text-purple-200">Mystery</div>
                  <div className="text-[7px] text-purple-400 truncate">Puzzling</div>
                </div>
                <div className="bg-[#2a1c2a] border border-amber-500/40 rounded-lg p-1.5 text-center">
                  <div className="text-xs">🎲</div>
                  <div className="font-bold text-amber-200">Surprise Me!</div>
                  <div className="text-[7px] text-amber-400 truncate">Random magic</div>
                </div>
              </div>
            </div>

            {/* Bottom */}
            <div className="flex justify-center text-[8px] text-purple-400/60 pt-1">
              <span>☷ Advanced Mood Matching Options</span>
            </div>
          </div>
        );

      case 'garuda-x':
        return (
          // Replicating GARUDA from screenshot 3
          <div className="relative w-full aspect-[16/10] bg-[#030d17] rounded-2xl overflow-hidden p-3.5 sm:p-5 flex flex-col justify-between border-2 border-cyan-500/40 shadow-2xl text-cyan-400 group-hover:scale-[1.01] transition-transform duration-500">
            {/* Top Status Indicators */}
            <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono border-b border-cyan-900/60 pb-2">
              <div className="border border-cyan-500/50 px-2 py-1 rounded bg-cyan-950/40">
                <span className="text-cyan-300">SYSTEM STATUS: </span>
                <span className="text-emerald-400 font-bold">OPERATIONAL</span>
              </div>
              <div className="border border-yellow-500/50 px-2 py-1 rounded bg-yellow-950/40">
                <span className="text-neutral-300">THREAT LEVEL: </span>
                <span className="text-yellow-400 font-bold">MEDIUM</span>
              </div>
            </div>

            {/* Center Branding */}
            <div className="text-center py-1">
              <div className="flex items-center justify-center gap-2 text-xl sm:text-2xl font-black tracking-widest text-cyan-300 font-mono">
                <span className="text-blue-500">■</span>
                <span>GARUDA</span>
                <span className="text-cyan-400">■</span>
              </div>
              <div className="text-[9px] sm:text-[10px] font-mono tracking-widest text-cyan-500 uppercase mt-0.5">
                QUANTUM DEFENSE NETWORK ANALYSIS
              </div>
            </div>

            {/* Rescan Button */}
            <div className="flex justify-center">
              <div className="border border-cyan-400 bg-cyan-950/60 px-6 py-1.5 rounded text-[11px] font-mono font-bold text-cyan-300 tracking-wider shadow-sm shadow-cyan-500/30">
                ■ RESCAN NETWORK ■
              </div>
            </div>

            {/* 4 Metric Boxes */}
            <div className="grid grid-cols-4 gap-2 py-1 font-mono text-center">
              <div className="border border-cyan-500/40 bg-cyan-950/30 rounded p-1.5">
                <div className="text-sm sm:text-lg font-bold text-cyan-200">9</div>
                <div className="text-[7px] sm:text-[8px] text-cyan-400 uppercase tracking-tight">NODES DETECTED</div>
              </div>
              <div className="border border-cyan-500/40 bg-cyan-950/30 rounded p-1.5">
                <div className="text-sm sm:text-lg font-bold text-emerald-400 flex items-center justify-center gap-1">
                  <span>0</span>
                </div>
                <div className="text-[7px] sm:text-[8px] text-cyan-400 uppercase tracking-tight">THREATS FOUND</div>
              </div>
              <div className="border border-cyan-500/40 bg-cyan-950/30 rounded p-1.5">
                <div className="text-sm sm:text-lg font-bold text-cyan-200">254</div>
                <div className="text-[7px] sm:text-[8px] text-cyan-400 uppercase tracking-tight">ADDRESSES SCANNED</div>
              </div>
              <div className="border border-cyan-500/40 bg-cyan-950/30 rounded p-1.5">
                <div className="text-sm sm:text-lg font-bold text-cyan-200">1.3s</div>
                <div className="text-[7px] sm:text-[8px] text-cyan-400 uppercase tracking-tight">SCAN DURATION</div>
              </div>
            </div>

            {/* Network Topology section */}
            <div className="border-t border-cyan-800/60 pt-1 text-[9px] font-mono flex items-center justify-between">
              <span className="text-cyan-300 flex items-center gap-1">
                <span>■</span> NETWORK TOPOLOGY // GATEWAY ACTIVE
              </span>
              <span className="text-emerald-400">● 100% INLINE INSPECTION</span>
            </div>
          </div>
        );

      case 'teamforge-ai':
        return (
          // Replicating TeamForge.AI from screenshot 4
          <div className="relative w-full aspect-[16/10] bg-[#fafbfc] rounded-2xl overflow-hidden p-4 sm:p-6 flex flex-col justify-between border border-neutral-300 shadow-xl text-neutral-900 group-hover:scale-[1.01] transition-transform duration-500"
            style={{
              backgroundImage: 'radial-gradient(#d1d5db 1px, transparent 1px)',
              backgroundSize: '14px 14px'
            }}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b-2 border-neutral-900 pb-2 text-[11px] font-mono">
              <div className="font-bold text-neutral-900 flex items-center gap-1">
                <span>TeamForge.</span>
                <span className="text-rose-600">AI</span>
              </div>
              <div className="border border-rose-600 text-rose-600 px-2 py-0.5 text-[9px] font-mono font-bold tracking-wider">
                [ MISSION CONTROL ]
              </div>
            </div>

            {/* Central Hero Block */}
            <div className="my-auto py-2 text-center max-w-lg mx-auto">
              <div className="inline-block border border-dashed border-rose-500 text-rose-600 px-3 py-0.5 text-[9px] font-mono uppercase mb-2">
                &gt; SYSTEM INITIALIZED
              </div>

              {/* Retro Pixel Bold Title */}
              <h3 className="text-lg sm:text-2xl font-black tracking-tight leading-snug font-mono text-neutral-900">
                THE AI ENGINEER THAT ACTUALLY{' '}
                <span className="text-blue-600 underline decoration-rose-500 decoration-2">
                  BUILDS
                </span>{' '}
                WITH YOUR SQUAD.
              </h3>

              {/* Left-bordered description box */}
              <div className="mt-2.5 bg-white/90 border-l-4 border-blue-600 p-2 sm:p-2.5 text-[10px] text-neutral-700 font-mono text-left shadow-xs">
                Generate enterprise architecture, divide tasks, and get real-time integration help from an AI that knows your entire codebase. Powered by NVIDIA Nemotron.
              </div>

              {/* Blue Start Button */}
              <div className="mt-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-mono font-bold text-xs px-5 py-1.5 shadow-sm">
                  [ START MISSION ]
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center text-[9px] font-mono text-neutral-500 border-t border-neutral-200 pt-1">
              <span>NVIDIA Nemotron Engine</span>
              <span>Enterprise Software Playbooks</span>
            </div>
          </div>
        );

      case 'quickpitch':
        return (
          // Replicating QuickPitch AI v2.5 from screenshot 5
          <div className="relative w-full aspect-[16/10] bg-[#0c090d] rounded-2xl overflow-hidden p-3.5 sm:p-5 flex flex-col justify-between border border-neutral-800 shadow-xl text-white group-hover:scale-[1.01] transition-transform duration-500">
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-neutral-800/80 pb-2 text-[10px]">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-rose-600 flex items-center justify-center font-bold text-white text-[11px]">
                  ⚡
                </div>
                <span className="font-bold text-white text-xs">QuickPitch</span>
                <span className="bg-neutral-800 text-neutral-300 text-[8px] font-mono px-1.5 py-0.5 rounded">
                  AI V2.5
                </span>
                <span className="text-[9px] text-neutral-500 hidden sm:inline">
                  Presentation Intelligence & Slide Synthesis
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[9px] text-neutral-400 font-mono">
                <span className="text-emerald-400 font-bold">● Local GPU Ready (RTX 4060)</span>
                <span className="text-neutral-600">|</span>
                <span className="text-amber-400">~3.3s</span>
              </div>
            </div>

            {/* Central Content */}
            <div className="my-auto py-2 text-center max-w-lg mx-auto">
              <div className="inline-block bg-rose-950/80 text-rose-300 border border-rose-800/60 px-3 py-0.5 rounded-full text-[9px] font-medium mb-2">
                POWERED BY AI · Adaptive Multi-Layout Presentation Engine v2.5 →
              </div>

              <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-white leading-tight">
                Transform YouTube, Audio &amp; Text into{' '}
                <span className="text-rose-500">Executive-Grade Presentation Decks</span>
              </h3>

              <p className="text-[10px] text-neutral-400 mt-2 leading-relaxed max-w-md mx-auto hidden sm:block">
                Turn any video lecture, interview, or technical document into beautifully structured, natively styled .pptx PowerPoint files in seconds — completely free with local offline AI acceleration.
              </p>

              {/* 3 feature checklist pills */}
              <div className="flex flex-wrap justify-center gap-1.5 pt-3 text-[9px] font-mono">
                <span className="bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded text-neutral-300">
                  ✓ 8 Curated Executive Color Themes
                </span>
                <span className="bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded text-neutral-300">
                  ✓ Multilingual Indic &amp; Global Scripts
                </span>
                <span className="bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded text-neutral-300">
                  ✓ 100% Native PowerPoint (.pptx) Format
                </span>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="flex justify-between items-center text-[9px] text-neutral-500 border-t border-neutral-800 pt-1">
              <span>Local Offline Acceleration</span>
              <span>Fast Video-to-Deck Synthesizer</span>
            </div>
          </div>
        );

      case 'jansahayak':
        return (
          // Replicating JanSahayak Telegram Bot snapshots from screenshot 6
          <div className="relative w-full aspect-[16/10] bg-[#0d0d14] rounded-2xl overflow-hidden p-3 sm:p-4 flex flex-col justify-between border border-indigo-900/40 shadow-xl text-white group-hover:scale-[1.01] transition-transform duration-500">
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-indigo-950 pb-1.5 text-[10px]">
              <span className="font-bold text-indigo-300 text-xs">
                JanSahayak — Live Prototype Snapshots (Telegram Bot)
              </span>
              <span className="bg-indigo-950 text-indigo-400 border border-indigo-800 px-2 py-0.5 rounded text-[8px] font-mono">
                TELEGRAM BOT + RPA
              </span>
            </div>

            {/* 6-step Telegram Prototype Workflow Grid */}
            <div className="grid grid-cols-3 gap-1.5 my-auto py-1 text-[8px]">
              {/* Step 1 */}
              <div className="bg-[#121122] rounded-lg p-1.5 border border-indigo-900/30 flex flex-col justify-between">
                <div>
                  <div className="text-[7px] text-indigo-400 font-mono">1. Language Selection</div>
                  <div className="mt-1 space-y-0.5">
                    <span className="bg-purple-950 text-purple-200 px-1 py-0.2 rounded text-[7px] block">🇮🇳 Telugu / Hindi / English</span>
                  </div>
                </div>
                <div className="text-[6px] text-neutral-500 mt-1">Multi-vernacular</div>
              </div>

              {/* Step 2 */}
              <div className="bg-[#121122] rounded-lg p-1.5 border border-indigo-900/30 flex flex-col justify-between">
                <div>
                  <div className="text-[7px] text-indigo-400 font-mono">2. Scheme Selection</div>
                  <div className="mt-1 space-y-0.5">
                    <span className="bg-purple-950 text-purple-200 px-1 py-0.2 rounded text-[7px] block">PM-KISAN / Rythu Bandhu</span>
                  </div>
                </div>
                <div className="text-[6px] text-neutral-500 mt-1">Welfare catalog</div>
              </div>

              {/* Step 3 */}
              <div className="bg-[#121122] rounded-lg p-1.5 border border-indigo-900/30 flex flex-col justify-between">
                <div>
                  <div className="text-[7px] text-indigo-400 font-mono">3. Eligibility Interview</div>
                  <div className="mt-1 space-y-0.5">
                    <span className="bg-purple-950 text-emerald-300 px-1 py-0.2 rounded text-[7px] block">Criteria Checked: Yes / No</span>
                  </div>
                </div>
                <div className="text-[6px] text-neutral-500 mt-1">Interactive logic</div>
              </div>

              {/* Step 4 */}
              <div className="bg-[#121122] rounded-lg p-1.5 border border-indigo-900/30 flex flex-col justify-between">
                <div>
                  <div className="text-[7px] text-indigo-400 font-mono">4. Aadhaar OCR</div>
                  <div className="mt-1 space-y-0.5">
                    <span className="bg-purple-950 text-cyan-200 px-1 py-0.2 rounded text-[7px] block">OCR Extraction: Telangana ID</span>
                  </div>
                </div>
                <div className="text-[6px] text-neutral-500 mt-1">AWS Textract</div>
              </div>

              {/* Step 5 */}
              <div className="bg-[#121122] rounded-lg p-1.5 border border-indigo-900/30 flex flex-col justify-between">
                <div>
                  <div className="text-[7px] text-indigo-400 font-mono">5. App Submitted</div>
                  <div className="mt-1 space-y-0.5">
                    <span className="bg-emerald-950 text-emerald-300 px-1 py-0.2 rounded text-[7px] block">ID: JSCS18824 · SMS Sent</span>
                  </div>
                </div>
                <div className="text-[6px] text-neutral-500 mt-1">AWS S3 & DynamoDB</div>
              </div>

              {/* Step 6 */}
              <div className="bg-[#121122] rounded-lg p-1.5 border border-indigo-900/30 flex flex-col justify-between">
                <div>
                  <div className="text-[7px] text-indigo-400 font-mono">6. Form Filled by RPA</div>
                  <div className="mt-1 space-y-0.5">
                    <span className="bg-purple-950 text-sky-200 px-1 py-0.2 rounded text-[7px] block">Govt Portal Automation</span>
                  </div>
                </div>
                <div className="text-[6px] text-neutral-500 mt-1">Automated Filing</div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="flex justify-between items-center text-[8px] text-neutral-500 border-t border-indigo-950 pt-1 font-mono">
              <span>Full Citizen Onboarding Pipeline</span>
              <span className="text-indigo-400">AWS Cloud + RPA</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 pt-8 pb-24">
        {/* Hero Headline Section */}
        <section className="max-w-4xl mb-12 md:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-semibold">
              Selected Work · 6 Production Projects
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] leading-[1.12] font-bold tracking-tight text-neutral-950 dark:text-white transition-colors">
            Systems that solve real problems, challenge conventions, and ship to the world
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 mt-4 max-w-2xl transition-colors">
            Real production architectures and user interfaces built across AI/ML, agentic orchestration, cybersecurity intelligence, and automated public systems.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-6">
            {['All', 'AI & Agents', 'Cybersecurity', 'Generative AI', 'Full-Stack'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedFilter === filter
                    ? 'bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 shadow-xs'
                    : 'bg-neutral-200/70 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300/80 dark:hover:bg-neutral-700 hover:text-neutral-950 dark:hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </section>

        {/* Project Gallery Grid - Exactly ONE picture per project, sleek and clean */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {filteredProjects.map((project) => {
            const currentTab = activeTabMap[project.id] || 'preview';

            return (
              <article
                key={project.id}
                className="group cursor-pointer flex flex-col justify-between bg-neutral-200/50 dark:bg-[#12141c]/80 rounded-[32px] p-4 sm:p-6 border border-neutral-300/70 dark:border-white/10 hover:border-neutral-400 dark:hover:border-white/20 hover:shadow-sm transition-all"
                onClick={() => onOpenProject(project.id)}
              >
                {/* Header Switcher: UI Preview vs Architecture Diagram */}
                <div className="flex items-center justify-between pb-3 px-1">
                  <div className="flex items-center gap-1.5 bg-neutral-300/60 dark:bg-neutral-800/80 p-1 rounded-xl text-xs font-medium">
                    <button
                      onClick={(e) => toggleTab(project.id, 'preview', e)}
                      className={`px-2.5 py-1 rounded-lg transition-all ${
                        currentTab === 'preview'
                          ? 'bg-white dark:bg-neutral-700 text-neutral-950 dark:text-white shadow-2xs font-semibold'
                          : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                      }`}
                    >
                      UI Preview
                    </button>
                    <button
                      onClick={(e) => toggleTab(project.id, 'architecture', e)}
                      className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                        currentTab === 'architecture'
                          ? 'bg-white dark:bg-neutral-700 text-neutral-950 dark:text-white shadow-2xs font-semibold'
                          : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                      }`}
                    >
                      <GitBranch className="w-3 h-3 text-indigo-500" />
                      <span>Architecture</span>
                    </button>
                  </div>

                  <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 hidden sm:inline">
                    {project.number} / 06
                  </span>
                </div>

                {/* Single clean picture / visual container */}
                <div className="relative w-full rounded-[24px] overflow-hidden bg-neutral-900/10 dark:bg-black/40 p-2 sm:p-2.5 flex items-center justify-center transition-all group/media">
                  {renderProjectVisual(project)}
                </div>

                {/* Title, Category & Description Bar */}
                <div className="pt-5 px-1 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-normal mb-1.5">
                      <span className="font-semibold text-neutral-900 dark:text-neutral-200">{project.number}.</span>
                      <span className="truncate ml-2">{project.category}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 dark:text-white group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">
                        {project.title}
                      </h2>
                      <span className="w-8 h-8 rounded-full bg-white/80 dark:bg-neutral-800 group-hover:bg-neutral-950 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-neutral-950 flex items-center justify-center transition-all shadow-2xs border border-black/5 dark:border-white/10">
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mt-2.5 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Recruiter Key Tech Stack Badges */}
                    <div className="flex flex-wrap gap-1.5 mt-3.5 pt-1">
                      {project.techStack?.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium bg-neutral-300/70 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-black/5 dark:border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer action bar */}
                  <div className="pt-4 mt-4 border-t border-neutral-300/80 dark:border-white/10 flex items-center justify-between text-xs">
                    <span className="text-neutral-600 dark:text-neutral-400 font-mono text-[11px] truncate max-w-[200px]">
                      {project.metrics}
                    </span>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 font-semibold text-neutral-900 dark:text-white hover:text-black dark:hover:text-neutral-200 py-1 px-2.5 rounded-lg bg-white/80 dark:bg-neutral-800 hover:bg-white dark:hover:bg-neutral-700 border border-black/5 dark:border-white/10 transition-all shadow-2xs"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>View Project →</span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-neutral-300/80 pt-16 pb-16 px-4 sm:px-8 lg:px-12 max-w-[1400px] mx-auto text-[15px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <span className="text-xs text-neutral-500 block mb-1">Email</span>
            <a href={`mailto:${PERSONAL_INFO.email}`} className="text-base font-semibold text-neutral-900 dark:text-white hover:underline">
              {PERSONAL_INFO.email}
            </a>
          </div>
          <div>
            <span className="text-xs text-neutral-500 block mb-1">Phone</span>
            <a href={`tel:${PERSONAL_INFO.phone}`} className="text-base font-semibold text-neutral-900 dark:text-white hover:underline">
              {PERSONAL_INFO.formattedPhone}
            </a>
          </div>
          <div>
            <span className="text-xs text-neutral-500 block mb-1">GitHub</span>
            <a href={PERSONAL_INFO.githubUrl} target="_blank" rel="noopener noreferrer" className="text-base font-semibold text-neutral-900 dark:text-white hover:underline">
              github.com/DHRUVASAI
            </a>
          </div>
          <div>
            <span className="text-xs text-neutral-500 block mb-1">LinkedIn</span>
            <a href={PERSONAL_INFO.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-base font-semibold text-neutral-900 dark:text-white hover:underline">
              linkedin.com/in/vudatha-dhruva-sai
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-10 mt-10 border-t border-neutral-300/60 dark:border-white/10 text-xs text-neutral-500 dark:text-neutral-400">
          <div>© 2026 Dhruva Sai. Hyderabad, India.</div>
          <button
            onClick={() => onNavigate('contact')}
            className="text-neutral-900 dark:text-white font-semibold hover:underline"
          >
            Start a project together →
          </button>
        </div>
      </footer>
    </div>
  );
};
