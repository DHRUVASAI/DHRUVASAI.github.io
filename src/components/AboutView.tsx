import React from 'react';
import { PERSONAL_INFO, FOCUS_AREAS, PROJECTS } from '../data/portfolioData.ts';
import { ArrowUpRight, Github, Linkedin, Mail, Phone, ExternalLink } from 'lucide-react';
import { IdentityCard } from './IdentityCard.tsx';
import { TechStackWidget } from './TechStackWidget.tsx';

interface AboutViewProps {
  onNavigate: (view: 'home' | 'about' | 'portfolio' | 'contact') => void;
  onOpenProject: (projectId: string) => void;
  onOpenResume?: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate, onOpenProject, onOpenResume }) => {
  const garudaProject = PROJECTS.find((p) => p.id === 'garuda-x');
  const vibeProject = PROJECTS.find((p) => p.id === 'vibeverse');

  return (
    <div className="w-full">
      <main className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 pt-8 pb-20">
        {/* Title Section */}
        <section className="mb-12 md:mb-16">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-neutral-950 dark:text-white transition-colors">
            About
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-300 font-medium tracking-tight mt-3 transition-colors">
            {PERSONAL_INFO.role} · {PERSONAL_INFO.location}
          </p>
        </section>

        {/* Intro Bio & Portrait Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-24 md:mb-32">
          {/* Bio Statement Paragraphs */}
          <div className="lg:col-span-7 pr-0 lg:pr-6 space-y-6">
            <p className="text-base sm:text-lg md:text-xl font-normal leading-relaxed text-neutral-900 dark:text-neutral-200 transition-colors">
              I'm Dhruva Sai — a computer science student and builder fascinated by the space where artificial intelligence, engineering, and thoughtful product design meet. I enjoy taking complex ideas and turning them into systems that are not only technically interesting, but genuinely useful.
            </p>
            <p className="text-base sm:text-lg md:text-xl font-normal leading-relaxed text-neutral-900 dark:text-neutral-200 transition-colors">
              My work spans AI/ML, agentic systems, cybersecurity, cloud computing, and full-stack development. From building <strong className="font-semibold text-neutral-950 dark:text-white">GARUDA-X</strong>, a context-aware network defense platform, to exploring AI-powered social experiences with <strong className="font-semibold text-neutral-950 dark:text-white">VibeVerse</strong>, I'm drawn to problems that demand more than a standard solution. I care about how a system thinks, how it behaves in the real world, and how people experience using it.
            </p>
            <p className="text-base sm:text-lg md:text-xl font-normal leading-relaxed text-neutral-900 dark:text-neutral-200 transition-colors">
              I believe good engineering goes beyond making something work. It's about understanding the problem deeply, questioning familiar approaches, and paying attention to the details that make a product reliable, intuitive, and meaningful. I enjoy working across the entire process — from the first idea and system architecture to implementation, experimentation, and deployment.
            </p>
            <p className="text-base sm:text-lg md:text-xl font-normal leading-relaxed text-neutral-900 dark:text-neutral-200 transition-colors">
              I'm continuously exploring new technologies, building ambitious projects, and learning by shipping. My goal is simple: to create things that solve real problems, challenge conventional thinking, and make technology feel a little more powerful and human.
            </p>
          </div>

          {/* Dhruva's Portrait / Identity Card */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end gap-3">
            <IdentityCard
              variant="about"
              className="w-full max-w-[420px] aspect-[4/5] min-h-[380px]"
            />
            {onOpenResume && (
              <button
                onClick={onOpenResume}
                className="w-full max-w-[420px] py-2.5 px-4 rounded-2xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 hover:bg-black dark:hover:bg-neutral-100 text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <span>View Full Curriculum Vitae / Resume</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </section>

        {/* Verified Education & Experience Section (From Resume) */}
        <section className="mb-24 md:mb-32 border-t border-neutral-300 dark:border-white/10 pt-16 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-semibold block mb-2">
                Verified Background
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
                Education & Experience
              </h2>
            </div>
            {onOpenResume && (
              <button
                onClick={onOpenResume}
                className="text-xs font-semibold px-4 py-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 hover:bg-black dark:hover:bg-neutral-100 transition-colors self-start sm:self-auto shadow-xs"
              >
                Open Official Resume PDF ↗
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Education Card */}
            <div className="p-8 rounded-3xl bg-neutral-200/60 dark:bg-[#12141c]/80 border border-neutral-300/70 dark:border-white/10 flex flex-col justify-between transition-colors">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-3">
                  Academic Credentials
                </span>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-bold text-base text-neutral-950 dark:text-white">
                        B.Tech – Computer Science and Engineering
                      </h4>
                      <span className="text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-800/20 px-2 py-0.5 rounded-full shrink-0">
                        CGPA: 9.33/10.0
                      </span>
                    </div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                      Koneru Lakshmaiah Education Foundation, Hyderabad, Telangana · 2024 – 2028 (Expected)
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-300/60 dark:border-white/10">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-bold text-sm text-neutral-950 dark:text-white">
                        Higher Secondary Certification (HSC)
                      </h4>
                      <span className="text-xs font-mono font-bold text-neutral-800 dark:text-neutral-200 bg-neutral-300/80 dark:bg-neutral-800 px-2 py-0.5 rounded-full shrink-0">
                        Score: 90%
                      </span>
                    </div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                      Vinjee, Hyderabad, Telangana · 2024
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-neutral-300/70 dark:border-white/10 flex flex-wrap gap-1.5 text-[11px] font-mono text-neutral-700 dark:text-neutral-300">
                <span className="bg-white/80 dark:bg-neutral-800 px-2 py-0.5 rounded border border-black/5 dark:border-white/10">Data Structures</span>
                <span className="bg-white/80 dark:bg-neutral-800 px-2 py-0.5 rounded border border-black/5 dark:border-white/10">Algorithms</span>
                <span className="bg-white/80 dark:bg-neutral-800 px-2 py-0.5 rounded border border-black/5 dark:border-white/10">OOP</span>
                <span className="bg-white/80 dark:bg-neutral-800 px-2 py-0.5 rounded border border-black/5 dark:border-white/10">Machine Learning</span>
              </div>
            </div>

            {/* Experience Card */}
            <div className="p-8 rounded-3xl bg-neutral-200/60 dark:bg-[#12141c]/80 border border-neutral-300/70 dark:border-white/10 flex flex-col justify-between transition-colors">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-3">
                  Professional Internships
                </span>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-bold text-base text-neutral-950 dark:text-white">
                        IBM SkillsBuild – AI & Cloud Internship
                      </h4>
                      <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 shrink-0">
                        Virtual, Jun – Jul 2026
                      </span>
                    </div>
                    <p className="text-xs text-neutral-700 dark:text-neutral-300 mt-1 leading-relaxed">
                      Completed hands-on training in AI and Cloud Computing; built an AI-based project applying machine learning and cloud concepts through mentor-guided sessions.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-300/60 dark:border-white/10">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-bold text-sm text-neutral-950 dark:text-white">
                        ServiceNow University – Virtual Internship Program
                      </h4>
                      <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 shrink-0">
                        Jun – Jul 2026
                      </span>
                    </div>
                    <p className="text-xs text-neutral-700 dark:text-neutral-300 mt-1 leading-relaxed">
                      Completed hands-on learning on the ServiceNow platform (ITSM, Service Catalog, Workflow Studio, Platform Analytics) and enterprise automation use cases.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-neutral-300/70 dark:border-white/10 flex flex-wrap gap-1.5 text-[11px] font-mono text-neutral-700 dark:text-neutral-300">
                <span className="bg-white/80 dark:bg-neutral-800 px-2 py-0.5 rounded border border-black/5 dark:border-white/10">AWS Cloud</span>
                <span className="bg-white/80 dark:bg-neutral-800 px-2 py-0.5 rounded border border-black/5 dark:border-white/10">Azure</span>
                <span className="bg-white/80 dark:bg-neutral-800 px-2 py-0.5 rounded border border-black/5 dark:border-white/10">GCP</span>
                <span className="bg-white/80 dark:bg-neutral-800 px-2 py-0.5 rounded border border-black/5 dark:border-white/10">IBM Cloud</span>
              </div>
            </div>
          </div>

          {/* Achievements & Certifications Pill Bar */}
          <div className="mt-6 p-6 rounded-3xl bg-neutral-900 dark:bg-[#181b26] border border-transparent dark:border-white/10 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-colors">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                Key Honors & Certifications
              </span>
              <p className="text-xs text-neutral-300">
                AWS AI for Bharat Shortlist & Badge · Azure AI-900 · CodeChef 2-Star · Cambridge English B2 · Google Cloud GenAI 2.0
              </p>
            </div>
            {onOpenResume && (
              <button
                onClick={onOpenResume}
                className="px-4 py-2 rounded-xl bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-700 text-xs font-semibold transition-colors shrink-0 shadow-xs"
              >
                View Full Details
              </button>
            )}
          </div>
        </section>

        {/* Core Stack & Technical Repertoire */}
        <section className="mb-24 md:mb-32 border-t border-neutral-300 dark:border-white/10 pt-16 transition-colors">
          <div className="mb-8">
            <span className="text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-semibold block mb-2 font-mono">
              Core Technical Stack
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
              Tools, Languages &amp; Computer Science
            </h2>
          </div>
          <TechStackWidget />
        </section>

        {/* Focus Areas Section */}
        <section className="mb-24 md:mb-32 border-t border-neutral-300 dark:border-white/10 pt-16 transition-colors">
          <div className="mb-8">
            <span className="text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-semibold block mb-2">
              Core Competencies
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
              What I Focus On
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {FOCUS_AREAS.map((focus) => (
              <div
                key={focus.number}
                className={`p-6 rounded-2xl bg-neutral-200/60 dark:bg-[#12141c]/80 border border-neutral-300/70 dark:border-white/10 hover:border-neutral-400 dark:hover:border-white/20 transition-all ${
                  focus.number === '05' ? 'sm:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mb-2">{focus.number}</div>
                <h3 className="text-base md:text-lg font-semibold text-neutral-950 dark:text-white mb-2">
                  {focus.title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {focus.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Selected Projects Mini Showcase */}
        <section className="mb-24 md:mb-32 border-t border-neutral-300 dark:border-white/10 pt-16 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-semibold block mb-2">
                Work
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
                Selected Projects
              </h2>
            </div>
            <button
              onClick={() => onNavigate('portfolio')}
              className="text-sm font-semibold text-neutral-900 dark:text-neutral-200 hover:text-black dark:hover:text-white flex items-center gap-1 group self-start sm:self-auto transition-colors"
            >
              <span>View all 6 projects</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Project 1: GARUDA-X */}
            <div
              onClick={() => onOpenProject('garuda-x')}
              className="p-8 rounded-3xl bg-neutral-200/60 dark:bg-[#12141c]/80 border border-neutral-300/70 dark:border-white/10 hover:border-neutral-400 dark:hover:border-white/20 hover:shadow-xs transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    Cybersecurity Platform
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-medium">
                    Active
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-neutral-950 dark:text-white mb-3 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors flex items-center justify-between">
                  <span>GARUDA-X</span>
                  <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  Building a context-aware cybersecurity platform that turns network activity into explainable threat intelligence.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-neutral-300/70 dark:border-white/10 flex flex-wrap gap-2">
                <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-neutral-300/60 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
                  Network Defense
                </span>
                <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-neutral-300/60 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
                  Threat Intelligence
                </span>
                <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-neutral-300/60 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
                  AI / ML
                </span>
              </div>
            </div>

            {/* Project 2: VibeVerse */}
            <div
              onClick={() => onOpenProject('vibeverse')}
              className="p-8 rounded-3xl bg-neutral-200/60 dark:bg-[#12141c]/80 border border-neutral-300/70 dark:border-white/10 hover:border-neutral-400 dark:hover:border-white/20 hover:shadow-xs transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    AI & Social Web
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-medium">
                    Exploration
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-neutral-950 dark:text-white mb-3 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors flex items-center justify-between">
                  <span>VibeVerse</span>
                  <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  Exploring the intersection of AI, social entertainment, and user-owned digital identity.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-neutral-300/70 dark:border-white/10 flex flex-wrap gap-2">
                <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-neutral-300/60 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
                  Social AI
                </span>
                <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-neutral-300/60 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
                  Digital Identity
                </span>
                <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-neutral-300/60 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
                  Next-Gen UX
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Currently & Thought I Build By Section */}
        <section className="mb-24 md:mb-32 border-t border-neutral-300 dark:border-white/10 pt-16 transition-colors">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Currently Card */}
            <div className="lg:col-span-5 p-8 rounded-3xl bg-neutral-200/60 dark:bg-[#12141c]/80 border border-neutral-300/70 dark:border-white/10 flex flex-col justify-between transition-colors">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-semibold">
                    Currently
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-neutral-950 dark:text-white mb-4">
                  Building & Learning
                </h3>
                <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {PERSONAL_INFO.currently}
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-neutral-300/60 dark:border-white/10 text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                Open to ambitious collaborations, engineering roles & research
              </div>
            </div>

            {/* A Thought I Build By Quote Card */}
            <div className="lg:col-span-7 p-8 md:p-10 rounded-3xl bg-neutral-950 dark:bg-[#181b26] text-white border border-transparent dark:border-white/10 flex flex-col justify-between shadow-sm transition-colors">
              <div>
                <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-4">
                  A Thought I Build By
                </span>
                <blockquote className="text-2xl sm:text-3xl md:text-4xl font-medium leading-snug tracking-tight text-neutral-100">
                  {PERSONAL_INFO.quote}
                </blockquote>
              </div>
              <div className="pt-8 mt-6 flex items-center justify-between border-t border-neutral-800 dark:border-white/10 text-xs text-neutral-400">
                <span>Dhruva Sai</span>
                <span>Design & Systems Philosophy</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Infinite Marquee Ticker */}
      <section className="w-full overflow-hidden border-y border-neutral-300 dark:border-white/10 py-6 mb-16 select-none bg-neutral-200/50 dark:bg-[#0c0d12] transition-colors">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-neutral-950 dark:text-white">
          <span>Artificial Intelligence — Agentic Systems — Cybersecurity — Product Engineering —</span>
          <span>Artificial Intelligence — Agentic Systems — Cybersecurity — Product Engineering —</span>
          <span>Artificial Intelligence — Agentic Systems — Cybersecurity — Product Engineering —</span>
        </div>
      </section>

      {/* Contact Footer Section */}
      <footer className="w-full px-4 sm:px-8 lg:px-12 pb-12 max-w-[1400px] mx-auto transition-colors">
        <div className="mb-8">
          <span className="text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-semibold block mb-1">
            Let's Connect
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Get in touch
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pt-4 pb-16 border-t border-neutral-300 dark:border-white/10">
          {/* Email */}
          <div className="space-y-1">
            <span className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block">Email</span>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="text-base md:text-lg font-medium text-neutral-950 dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors break-words"
            >
              {PERSONAL_INFO.email}
            </a>
          </div>

          {/* GitHub */}
          <div className="space-y-1">
            <span className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block">GitHub</span>
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base md:text-lg font-medium text-neutral-950 dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors flex items-center gap-1.5"
            >
              <span>github.com/DHRUVASAI</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
            </a>
          </div>

          {/* LinkedIn */}
          <div className="space-y-1">
            <span className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block">LinkedIn</span>
            <a
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base md:text-lg font-medium text-neutral-950 dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors flex items-center gap-1.5"
            >
              <span>Dhruva Sai</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
            </a>
          </div>

          {/* Location / Phone */}
          <div className="space-y-1">
            <span className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block">Phone & Location</span>
            <a
              href={`tel:${PERSONAL_INFO.phone}`}
              className="text-base md:text-lg font-medium text-neutral-950 dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors block"
            >
              {PERSONAL_INFO.formattedPhone}
            </a>
            <span className="text-xs text-neutral-500 dark:text-neutral-400 block">{PERSONAL_INFO.location}</span>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-neutral-300/60 dark:border-white/10">
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            © 2026 Dhruva Sai. Built with precision and clarity.
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('contact')}
              className="text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors shadow-xs"
            >
              Contact Dhruva
            </button>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-200 text-xs font-medium border border-neutral-300 dark:border-white/10 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Open to Opportunities</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
