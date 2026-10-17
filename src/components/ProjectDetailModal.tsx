import React, { useState } from 'react';
import { Project } from '../data/portfolioData.ts';
import { X, Github, ExternalLink, CheckCircle2, Shield, Cpu, Sparkles, Activity, GitBranch, Copy, Check } from 'lucide-react';
import { GitDiagramArchitecture } from './GitDiagramArchitecture.tsx';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture'>('overview');
  const [copiedDiagram, setCopiedDiagram] = useState<boolean>(false);

  if (!project) return null;

  const handleCopyDiagram = () => {
    if (project.architectureDiagram) {
      navigator.clipboard.writeText(project.architectureDiagram);
      setCopiedDiagram(true);
      setTimeout(() => setCopiedDiagram(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-[#ECECEB] dark:bg-[#12141c] border border-neutral-300 dark:border-white/10 rounded-[32px] w-full max-w-3xl max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-neutral-900/5 dark:bg-white/10 hover:bg-neutral-950 dark:hover:bg-white hover:text-white dark:hover:text-neutral-950 flex items-center justify-center transition-colors text-neutral-700 dark:text-neutral-300"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6 pr-10">
          <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
            <span>Project {project.number}</span>
            <span>•</span>
            <span>{project.category}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white transition-colors">
            {project.title}
          </h2>
          <p className="text-base sm:text-lg font-medium text-neutral-700 dark:text-neutral-300 mt-1 transition-colors">
            {project.subtitle}
          </p>
        </div>

        {/* Tab Switcher: Overview vs GitDiagram Architecture */}
        <div className="flex items-center gap-2 mb-6 border-b border-neutral-300 dark:border-white/10 pb-3">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'overview'
                ? 'bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 shadow-xs'
                : 'bg-white/80 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-700'
            }`}
          >
            Project Overview
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'architecture'
                ? 'bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 shadow-xs'
                : 'bg-white/80 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-700'
            }`}
          >
            <GitBranch className="w-4 h-4 text-indigo-400" />
            <span>GitDiagram Architecture</span>
          </button>
        </div>

        {activeTab === 'overview' ? (
          <>
            {/* Metrics Badge */}
            <div className="bg-neutral-900 dark:bg-[#181b26] text-white border border-transparent dark:border-white/10 rounded-2xl p-4 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-xs sm:text-sm font-mono tracking-tight">{project.metrics}</span>
              </div>
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest hidden sm:inline">
                PRODUCTION METRIC
              </span>
            </div>

            {/* Project Description */}
            <div className="space-y-4 mb-6 text-neutral-800 dark:text-neutral-200 text-sm sm:text-base leading-relaxed">
              <p>{project.description}</p>
            </div>

            {/* Key Features & Architecture */}
            <div className="mb-6">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-neutral-500 dark:text-neutral-400 mb-3">
                Key Features & Capabilities
              </h3>
              <div className="space-y-2.5">
                {project.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-white/80 dark:bg-neutral-800/80 border border-neutral-300/60 dark:border-white/10 text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 shadow-2xs"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="mb-8">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-neutral-500 dark:text-neutral-400 mb-2">
                Technologies & Focus
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-neutral-300/60 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Architecture / GitDiagram view */
          <div className="space-y-6 mb-8">
            <div className="rounded-2xl overflow-hidden border border-neutral-300 dark:border-white/10 shadow-md">
              <GitDiagramArchitecture
                project={project}
                customDiagramImage={
                  typeof window !== 'undefined'
                    ? localStorage.getItem(`dhruva_arch_image_${project.id}`) || undefined
                    : undefined
                }
                onUpdateDiagramImage={(pId, url) => {
                  try {
                    if (url) {
                      localStorage.setItem(`dhruva_arch_image_${pId}`, url);
                    } else {
                      localStorage.removeItem(`dhruva_arch_image_${pId}`);
                    }
                  } catch {
                    // ignore
                  }
                }}
              />
            </div>

            <div className="p-4 rounded-2xl bg-neutral-900 dark:bg-[#181b26] border border-transparent dark:border-white/10 text-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-indigo-300 uppercase tracking-wider">
                  Architecture Overview
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                  GitDiagram Blueprint
                </span>
              </div>
              <p className="text-sm text-neutral-300 leading-relaxed font-mono">
                {project.architectureSummary}
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-800/90 rounded-2xl p-4 sm:p-5 border border-neutral-300 dark:border-white/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-300 uppercase tracking-wider">
                  Flowchart / System Topology (Mermaid)
                </span>
                <button
                  onClick={handleCopyDiagram}
                  className="px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 text-xs font-mono flex items-center gap-1 text-neutral-700 dark:text-neutral-200 transition-colors"
                  title="Copy diagram code"
                >
                  {copiedDiagram ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-emerald-700 dark:text-emerald-300">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Mermaid</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="bg-neutral-900 text-emerald-400 p-4 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed border border-neutral-800">
                {project.architectureDiagram}
              </pre>

              <div className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">
                Tip: Share your updated GitDiagram or architecture schema to update this diagram dynamically.
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-neutral-300/80 dark:border-white/10">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-neutral-950 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-100 text-white dark:text-neutral-950 py-3 px-6 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-xs"
          >
            <Github className="w-4 h-4" />
            <span>Open GitHub Repository</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-70" />
          </a>
          <button
            onClick={onClose}
            className="py-3 px-6 rounded-xl border border-neutral-300 dark:border-white/10 bg-white/80 dark:bg-neutral-800 hover:bg-white dark:hover:bg-neutral-700 text-neutral-900 dark:text-white font-semibold text-sm transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
