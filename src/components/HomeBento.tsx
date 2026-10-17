import React, { useState } from 'react';
import { PERSONAL_INFO, PROJECTS } from '../data/portfolioData.ts';
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Phone,
  Copy,
  Check,
  FileText,
  Cpu,
  Shield,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { IdentityCard } from './IdentityCard.tsx';
import { TechStackWidget } from './TechStackWidget.tsx';
import { VisitorCounter } from './VisitorCounter.tsx';

interface HomeBentoProps {
  onNavigate: (view: 'home' | 'about' | 'portfolio' | 'contact') => void;
  onOpenProject: (projectId: string) => void;
  onOpenResume: () => void;
}

export const HomeBento: React.FC<HomeBentoProps> = ({
  onNavigate,
  onOpenProject,
  onOpenResume
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-12 pt-4 pb-16 flex-1 flex flex-col justify-start">
      {/* Hero Headline Section - Visible, Unobstructed, Crisp */}
      <section className="w-full pt-2 pb-6 md:pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-black/10 dark:border-white/10 transition-colors">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-semibold">
              Personal Portfolio & Systems Work
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[96px] font-bold tracking-tight text-neutral-950 dark:text-white leading-none transition-colors">
            {PERSONAL_INFO.name}
          </h1>
        </div>

        <div className="flex flex-col md:items-end text-neutral-600 dark:text-neutral-300 text-sm sm:text-base font-normal max-w-md transition-colors">
          <span className="font-semibold text-neutral-900 dark:text-white">{PERSONAL_INFO.role}</span>
          <span className="text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm">
            Hyderabad, India · CSE & AI Product Engineering
          </span>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 md:text-right italic">
            “Discovering what should exist next.”
          </p>
        </div>
      </section>

      {/* Bento Grid: Refined height, perfectly visible text, filled with substance */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 w-full pt-6 md:pt-8">
        
        {/* WIDGET 1: About Card (col-span-12 md:col-span-5 lg:col-span-4) */}
        <div
          onClick={() => onNavigate('about')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('about'); }}
          className="col-span-12 md:col-span-5 lg:col-span-4 frosted-glass group rounded-3xl p-6 md:p-7 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1 relative overflow-hidden min-h-[240px] md:min-h-[270px]"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300" />
                <span>About / Story</span>
              </span>
              <span className="w-8 h-8 rounded-full bg-neutral-900/5 dark:bg-white/10 group-hover:bg-neutral-950 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-neutral-950 flex items-center justify-center transition-all text-neutral-800 dark:text-neutral-200">
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-neutral-950 dark:text-white mb-2 transition-colors">
              Engineering with Purpose
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed line-clamp-3">
              Computer science student & builder exploring the intersection of AI, agentic systems, cybersecurity, and thoughtful product design.
            </p>
          </div>

          <div className="pt-4 border-t border-black/5 dark:border-white/10 mt-3 flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-neutral-900/5 dark:bg-white/10 text-neutral-700 dark:text-neutral-300">
                Agentic Systems
              </span>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-neutral-900/5 dark:bg-white/10 text-neutral-700 dark:text-neutral-300">
                Cybersecurity
              </span>
            </div>
            <span className="text-xs font-semibold text-neutral-900 dark:text-neutral-200 group-hover:underline">
              Read more →
            </span>
          </div>
        </div>

        {/* WIDGET 2: Portfolio / Selected Work Card (col-span-12 md:col-span-7 lg:col-span-8) */}
        <div
          onClick={() => onNavigate('portfolio')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('portfolio'); }}
          className="col-span-12 md:col-span-7 lg:col-span-8 frosted-glass group rounded-3xl p-6 md:p-7 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1 relative overflow-hidden min-h-[240px] md:min-h-[270px]"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300" />
                  <span>Selected Work</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 font-medium">
                  6 Featured
                </span>
              </div>
              <span className="w-8 h-8 rounded-full bg-neutral-900/5 dark:bg-white/10 group-hover:bg-neutral-950 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-neutral-950 flex items-center justify-center transition-all text-neutral-800 dark:text-neutral-200">
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-3">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-neutral-950 dark:text-white transition-colors">
                Selected Work & Systems
              </h2>
              <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                AI · Security · Full-Stack Products
              </span>
            </div>

            {/* Mini Project Pill Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              <div
                onClick={(e) => { e.stopPropagation(); onOpenProject('garuda-x'); }}
                className="bg-white/80 dark:bg-neutral-800/90 hover:bg-white dark:hover:bg-neutral-700/90 rounded-xl p-2.5 border border-black/5 dark:border-white/10 transition-all text-left group/item"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400">02</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                </div>
                <div className="font-semibold text-xs text-neutral-900 dark:text-white group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400 transition-colors">
                  GARUDA
                </div>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate font-mono">Python · Scapy · SOC HUD</p>
              </div>

              <div
                onClick={(e) => { e.stopPropagation(); onOpenProject('edge'); }}
                className="bg-white/80 dark:bg-neutral-800/90 hover:bg-white dark:hover:bg-neutral-700/90 rounded-xl p-2.5 border border-black/5 dark:border-white/10 transition-all text-left group/item"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400">01</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                </div>
                <div className="font-semibold text-xs text-neutral-900 dark:text-white group-hover/item:text-emerald-600 dark:group-hover/item:text-emerald-400 transition-colors">
                  EDGE Engine
                </div>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate font-mono">DuckDB · Monte Carlo</p>
              </div>

              <div
                onClick={(e) => { e.stopPropagation(); onOpenProject('teamforge-ai'); }}
                className="bg-white/80 dark:bg-neutral-800/90 hover:bg-white dark:hover:bg-neutral-700/90 rounded-xl p-2.5 border border-black/5 dark:border-white/10 transition-all text-left group/item"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400">03</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                </div>
                <div className="font-semibold text-xs text-neutral-900 dark:text-white group-hover/item:text-amber-600 dark:group-hover/item:text-amber-400 transition-colors">
                  TeamForge AI
                </div>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate font-mono">Nemotron · Swarm DAG</p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-black/5 dark:border-white/10 mt-3 flex items-center justify-between text-xs">
            <span className="text-neutral-500 dark:text-neutral-400 hidden sm:inline">
              + JanSahayak, QuickPitch & VibeVerse
            </span>
            <span className="font-semibold text-neutral-950 dark:text-neutral-200 group-hover:underline">
              Explore all projects & code →
            </span>
          </div>
        </div>

        {/* WIDGET 3: Identity / Portrait Card (col-span-12 md:col-span-5 lg:col-span-4) */}
        <IdentityCard
          variant="bento"
          className="col-span-12 md:col-span-5 lg:col-span-4 min-h-[320px] md:min-h-[360px]"
        />

        {/* WIDGET 4: Core Stack Card with Brand Symbols & Categories (col-span-12 md:col-span-7 lg:col-span-8) */}
        <div className="col-span-12 md:col-span-7 lg:col-span-8 min-h-[320px] md:min-h-[360px]">
          <TechStackWidget />
        </div>

        {/* WIDGET 5: Enriched "Let's Connect" Card (col-span-12 md:col-span-6 lg:col-span-6) */}
        <div
          onClick={() => onNavigate('contact')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('contact'); }}
          className="col-span-12 md:col-span-6 lg:col-span-6 frosted-glass group rounded-3xl p-6 md:p-7 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1 relative"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5 font-mono">
                <Mail className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300" />
                <span>Let's Connect</span>
              </span>
              <span className="w-8 h-8 rounded-full bg-neutral-900/5 dark:bg-white/10 group-hover:bg-neutral-950 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-neutral-950 flex items-center justify-center transition-all text-neutral-800 dark:text-neutral-200">
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-medium text-emerald-800 dark:text-emerald-400">
                Open for high-impact engineering roles &amp; collaborations
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-neutral-950 dark:text-white mb-4 transition-colors">
              Have an ambitious idea or engineering opportunity?
            </h2>

            {/* Email & Phone Interactive Tiles */}
            <div className="space-y-2 mb-4">
              {/* Email row */}
              <div className="flex items-center justify-between text-xs bg-white/80 dark:bg-neutral-800/80 rounded-xl px-3.5 py-2.5 border border-black/5 dark:border-white/10">
                <div className="flex items-center gap-2 truncate mr-2">
                  <Mail className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400 shrink-0" />
                  <span className="text-neutral-900 dark:text-white font-medium truncate">{PERSONAL_INFO.email}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                    title="Send Email"
                  >
                    <span>Write</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-neutral-200/60 dark:bg-neutral-700"
                    title="Copy email"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-emerald-700 dark:text-emerald-300">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Direct Phone & WhatsApp row */}
              <div className="flex items-center justify-between text-xs bg-white/80 dark:bg-neutral-800/80 rounded-xl px-3.5 py-2.5 border border-black/5 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400 shrink-0" />
                  <span className="text-neutral-900 dark:text-white font-semibold">{PERSONAL_INFO.formattedPhone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/918074142645?text=Hi%20Dhruva,%20saw%20your%20portfolio`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <span>WhatsApp</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href={`tel:${PERSONAL_INFO.phone}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-[11px] font-semibold text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white px-2 py-0.5 rounded bg-neutral-200/60 dark:bg-neutral-700"
                  >
                    Direct Call
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Badges: Location, Timezone, Response time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 text-[11px] font-mono text-neutral-600 dark:text-neutral-400">
              <div className="bg-neutral-100/80 dark:bg-neutral-900/60 rounded-lg p-2 border border-black/5 dark:border-white/5">
                <span className="block text-[9px] text-neutral-400 uppercase">Location</span>
                <span className="font-semibold text-neutral-800 dark:text-neutral-200 truncate block">Hyderabad, IN</span>
              </div>
              <div className="bg-neutral-100/80 dark:bg-neutral-900/60 rounded-lg p-2 border border-black/5 dark:border-white/5">
                <span className="block text-[9px] text-neutral-400 uppercase">Timezone</span>
                <span className="font-semibold text-neutral-800 dark:text-neutral-200 truncate block">IST (UTC+5:30)</span>
              </div>
              <div className="col-span-1 sm:col-span-2 xl:col-span-1 bg-neutral-100/80 dark:bg-neutral-900/60 rounded-lg p-2 border border-black/5 dark:border-white/5">
                <span className="block text-[9px] text-neutral-400 uppercase">Response</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 truncate block">⚡ Under 2 hrs</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-black/5 dark:border-white/10 mt-4 flex items-center justify-between text-xs">
            <span className="text-neutral-500 dark:text-neutral-400">Ready to build or hire</span>
            <span className="font-semibold text-neutral-900 dark:text-neutral-200 group-hover:underline flex items-center gap-1">
              <span>Open contact form</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* WIDGET 6: Official Resume, LinkedIn & GitHub Card (col-span-12 md:col-span-6 lg:col-span-6) */}
        <div className="col-span-12 md:col-span-6 lg:col-span-6 frosted-glass group rounded-3xl p-6 md:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 relative">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5 font-mono">
                <FileText className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300" />
                <span>Verified Credentials &amp; Profiles</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                Verified
              </span>
            </div>

            {/* Official Resume Action Banner */}
            <div className="bg-white/80 dark:bg-neutral-800/80 rounded-2xl p-4 border border-black/5 dark:border-white/10 mb-4 flex flex-col xl:flex-row xl:items-center justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-sm text-neutral-950 dark:text-white">
                    Official Curriculum Vitae
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 px-2 py-0.5 rounded-full">
                    9.33 CGPA
                  </span>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  B.Tech Computer Science · KL University Hyderabad
                </p>
              </div>

              <button
                onClick={onOpenResume}
                className="bg-neutral-950 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-100 text-white dark:text-neutral-950 rounded-xl px-4 py-2 flex items-center justify-center gap-2 text-xs font-bold shadow-xs transition-all shrink-0 cursor-pointer w-full xl:w-auto"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Resume</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Profiles: GitHub & LinkedIn Double Tile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-white/70 dark:bg-neutral-800/60 hover:bg-white dark:hover:bg-neutral-700 border border-black/5 dark:border-white/10 flex items-center justify-between group/link transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 flex items-center justify-center shrink-0">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-neutral-900 dark:text-white group-hover/link:text-indigo-600 dark:group-hover/link:text-indigo-400 transition-colors">
                      GitHub
                    </div>
                    <div className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400">
                      @DHRUVASAI
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover/link:text-black dark:group-hover/link:text-white transition-colors" />
              </a>

              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-white/70 dark:bg-neutral-800/60 hover:bg-white dark:hover:bg-neutral-700 border border-black/5 dark:border-white/10 flex items-center justify-between group/link transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#0077B5] text-white flex items-center justify-center shrink-0">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-neutral-900 dark:text-white group-hover/link:text-indigo-600 dark:group-hover/link:text-indigo-400 transition-colors">
                      LinkedIn
                    </div>
                    <div className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400">
                      in/vudatha-dhruva-sai
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover/link:text-black dark:group-hover/link:text-white transition-colors" />
              </a>
            </div>

            {/* Verified Certifications & Honors Pills */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                AWS AI for Bharat Badge
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20">
                Azure AI Fundamentals (AI-900)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                Google Cloud Gen AI
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-500/20">
                CodeChef 2-Star
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-black/5 dark:border-white/10 mt-4 flex items-center justify-between text-xs">
            <span className="text-neutral-500 dark:text-neutral-400">Verified Credentials</span>
            <button
              onClick={onOpenResume}
              className="font-semibold text-neutral-900 dark:text-neutral-200 group-hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View full resume</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar with Live Visitor Counter */}
      <footer className="w-full pt-12 mt-8 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 dark:text-neutral-400">
        <div>
          © 2026 {PERSONAL_INFO.name}. Built with precision and clarity.
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <VisitorCounter />
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-200 text-xs font-medium border border-neutral-300 dark:border-white/10 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Open to Opportunities</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
