import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft } from 'lucide-react';
import { PROJECTS, PERSONAL_INFO } from '../data/portfolioData.ts';
import {
  playTerminalBeep,
  playClickSound,
  setSoundEnabled,
  isSoundEnabled
} from '../utils/soundEffects.ts';
import { useTheme } from '../context/ThemeContext.tsx';

interface CommandTerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProject: (id: string) => void;
  onNavigate: (view: 'home' | 'about' | 'portfolio' | 'contact') => void;
  onOpenResume: () => void;
}

interface CommandHistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
}

export const CommandTerminalModal: React.FC<CommandTerminalModalProps> = ({
  isOpen,
  onClose,
  onOpenProject,
  onNavigate,
  onOpenResume
}) => {
  const { theme, setTheme } = useTheme();
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      id: 'welcome-0',
      command: 'sys.init',
      output: (
        <div className="space-y-1 text-xs">
          <div className="text-emerald-400 font-bold">
            VUDATHA DHRUVA SAI // SYSTEMS TERMINAL v2.6.4-prod
          </div>
          <div className="text-neutral-400">
            KL University CSE · 9.33 CGPA · AI Systems &amp; Security Engineer
          </div>
          <div className="text-neutral-300 mt-2">
            Type <span className="text-amber-400 font-bold">help</span> to view available system routines, or click any command below:
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            {['projects', 'about', 'stack', 'contact', 'resume', 'clear'].map((cmd) => (
              <span
                key={cmd}
                onClick={() => handleExecute(cmd)}
                className="px-2 py-0.5 rounded bg-white/10 hover:bg-emerald-500/20 text-emerald-300 hover:text-emerald-200 border border-emerald-500/30 cursor-pointer text-[11px] transition-colors"
              >
                {cmd}
              </span>
            ))}
          </div>
        </div>
      )
    }
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      playTerminalBeep();
    }
  }, [isOpen]);

  // Scroll to bottom on history change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Global key listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleExecute = (rawCmd: string) => {
    const trimmed = rawCmd.trim().toLowerCase();
    if (!trimmed) return;

    playTerminalBeep();

    let outputNode: React.ReactNode = null;

    switch (trimmed) {
      case 'help':
        outputNode = (
          <div className="space-y-1.5 text-xs text-neutral-300">
            <div className="text-neutral-400 font-semibold mb-1">Available Terminal Routines:</div>
            <div><span className="text-amber-400 font-bold w-24 inline-block">projects</span> - Inspect all 6 flagship production architectures</div>
            <div><span className="text-amber-400 font-bold w-24 inline-block">about</span> - Background, education, and research statement</div>
            <div><span className="text-amber-400 font-bold w-24 inline-block">stack</span> - Technical competencies and languages</div>
            <div><span className="text-amber-400 font-bold w-24 inline-block">contact</span> - Real-time communication channels</div>
            <div><span className="text-amber-400 font-bold w-24 inline-block">resume</span> - Open verified Curriculum Vitae (9.33 CGPA)</div>
            <div><span className="text-amber-400 font-bold w-24 inline-block">sound on/off</span> - Toggle native Web Audio synthesizer</div>
            <div><span className="text-amber-400 font-bold w-24 inline-block">theme dark/light</span> - Switch portfolio visual canvas</div>
            <div><span className="text-amber-400 font-bold w-24 inline-block">clear</span> - Flush terminal screen</div>
          </div>
        );
        break;

      case 'projects':
        outputNode = (
          <div className="space-y-2 text-xs">
            <div className="text-neutral-400 font-semibold">Flagship Production Systems:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {PROJECTS.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    playClickSound();
                    onClose();
                    onOpenProject(p.id);
                  }}
                  className="p-2.5 rounded-lg bg-neutral-900 border border-white/10 hover:border-emerald-500/50 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center justify-between text-emerald-400 font-bold group-hover:text-emerald-300">
                    <span>{p.title}</span>
                    <span className="text-[10px] font-mono text-neutral-400">Open ↗</span>
                  </div>
                  <div className="text-neutral-300 text-[11px] mt-0.5 line-clamp-1">{p.subtitle}</div>
                  <div className="text-[10px] font-mono text-neutral-500 mt-1">{p.metrics}</div>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'about':
        outputNode = (
          <div className="space-y-1.5 text-xs text-neutral-300">
            <div className="text-emerald-400 font-bold">Vudatha Dhruva Sai</div>
            <div>Student &amp; Systems Builder at Koneru Lakshmaiah Education Foundation, Hyderabad.</div>
            <div className="text-neutral-400 font-mono">B.Tech Computer Science (2024–2028 Expected) · Current CGPA: 9.33/10.0</div>
            <p className="mt-1 leading-relaxed">
              Fascinated by agentic systems, cybersecurity intelligence, high-throughput engines, and full-stack systems that solve genuine problems.
            </p>
          </div>
        );
        break;

      case 'stack':
        outputNode = (
          <div className="space-y-1.5 text-xs text-neutral-300">
            <div><span className="text-indigo-400 font-bold">Languages:</span> Python, Java, C</div>
            <div><span className="text-cyan-400 font-bold">Frontend:</span> React.js, Next.js, HTML5, CSS3, Tailwind CSS</div>
            <div><span className="text-amber-400 font-bold">Cloud Platforms:</span> AWS, Microsoft Azure, Google Cloud, IBM Cloud</div>
            <div><span className="text-emerald-400 font-bold">Databases &amp; Tools:</span> MySQL, Git, GitHub</div>
            <div><span className="text-purple-400 font-bold">Core CS:</span> Data Structures, Algorithms, OOP, Machine Learning, Compiler Design</div>
          </div>
        );
        break;

      case 'contact':
        outputNode = (
          <div className="space-y-1.5 text-xs text-neutral-300">
            <div><span className="text-neutral-400 font-mono">Email:</span> <a href={`mailto:${PERSONAL_INFO.email}`} className="text-indigo-400 hover:underline">{PERSONAL_INFO.email}</a></div>
            <div><span className="text-neutral-400 font-mono">Phone:</span> <a href={`tel:${PERSONAL_INFO.phone}`} className="text-emerald-400 hover:underline">{PERSONAL_INFO.formattedPhone}</a></div>
            <div><span className="text-neutral-400 font-mono">GitHub:</span> <a href={PERSONAL_INFO.githubUrl} target="_blank" rel="noreferrer" className="text-amber-400 hover:underline">github.com/DHRUVASAI</a></div>
            <div><span className="text-neutral-400 font-mono">LinkedIn:</span> <a href={PERSONAL_INFO.linkedinUrl} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">in/vudatha-dhruva-sai</a></div>
          </div>
        );
        break;

      case 'resume':
        outputNode = (
          <div className="text-xs text-emerald-400">
            Launching verified Curriculum Vitae document (KL University, 9.33 CGPA)...
          </div>
        );
        setTimeout(() => {
          onClose();
          onOpenResume();
        }, 300);
        break;

      case 'sound on':
        setSoundEnabled(true);
        outputNode = <div className="text-xs text-emerald-400">✓ Web Audio Synthesizer SFX ENABLED.</div>;
        break;

      case 'sound off':
        setSoundEnabled(false);
        outputNode = <div className="text-xs text-amber-400">✕ Web Audio Synthesizer SFX MUTED.</div>;
        break;

      case 'theme dark':
        setTheme('dark');
        outputNode = <div className="text-xs text-cyan-400">✓ Canvas switched to Deep Obsidian (#070A14).</div>;
        break;

      case 'theme light':
        setTheme('light');
        outputNode = <div className="text-xs text-cyan-400">✓ Canvas switched to Architectural Slate (#ECECEB).</div>;
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        outputNode = (
          <div className="text-xs text-rose-400">
            Unknown command: "{trimmed}". Type <span className="text-white font-bold underline cursor-pointer" onClick={() => handleExecute('help')}>help</span> for valid routines.
          </div>
        );
    }

    setHistory((prev) => [
      ...prev,
      {
        id: `cmd-${Date.now()}`,
        command: rawCmd,
        output: outputNode
      }
    ]);
    setInputVal('');
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Systems command terminal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-[fadeIn_0.15s_ease-out]"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-[#08090E] border border-white/20 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[85vh] font-mono text-neutral-200"
      >
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#10121C] border-b border-white/10 select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 cursor-pointer" onClick={onClose} title="Close" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <div className="flex items-center gap-2 ml-2 text-xs text-neutral-400 font-semibold">
              <TerminalIcon className="w-3.5 h-3.5 text-indigo-400" />
              <span>dhruva@portfolio:~ (systems-sh)</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-neutral-500 font-mono hidden sm:inline">ESC to exit</span>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-white/10 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-mono">
          {history.map((item) => (
            <div key={item.id} className="space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-400">
                <span className="text-neutral-500">dhruva@systems:~$</span>
                <span className="font-bold text-white">{item.command}</span>
              </div>
              <div className="pl-4 border-l border-white/10">{item.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Input Row */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleExecute(inputVal);
          }}
          className="flex items-center gap-2 px-4 py-3 bg-[#0C0E18] border-t border-white/10"
        >
          <span className="text-emerald-400 font-bold shrink-0">dhruva@systems:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="type a command (help, projects, stack)..."
            className="flex-1 bg-transparent text-white font-mono text-xs outline-none placeholder:text-neutral-600"
          />
          <button
            type="submit"
            className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white text-[11px] font-mono flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>Run</span>
            <CornerDownLeft className="w-3 h-3 text-neutral-400" />
          </button>
        </form>
      </div>
    </div>
  );
};
