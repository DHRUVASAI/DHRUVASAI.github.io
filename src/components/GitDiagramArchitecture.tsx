import React, { useState, useRef } from 'react';
import {
  GitBranch,
  Maximize2,
  Upload,
  RotateCcw,
  ExternalLink,
  Cpu,
  Database,
  Layers,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Radio,
  FileCode,
  Globe,
  Bot,
  Zap,
  CheckCircle2,
  X,
  ZoomIn,
  ZoomOut,
  Activity,
  Server,
  Lock,
  Workflow,
  Eye,
  Sliders,
  Image as ImageIcon
} from 'lucide-react';
import { Project } from '../data/portfolioData';

interface GitDiagramProps {
  project: Project;
  customDiagramImage?: string;
  onUpdateDiagramImage: (projectId: string, imageUrl: string | null) => void;
  initialMode?: 'detailed' | 'telemetry' | 'image';
}

type ViewMode = 'detailed' | 'telemetry' | 'image';

export const GitDiagramArchitecture: React.FC<GitDiagramProps> = ({
  project,
  customDiagramImage,
  onUpdateDiagramImage,
  initialMode = 'detailed'
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>(initialMode);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onUpdateDiagramImage(project.id, reader.result);
          setViewMode('image');
          setShowUploadModal(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onUpdateDiagramImage(project.id, reader.result);
          setViewMode('image');
          setShowUploadModal(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim()) {
      onUpdateDiagramImage(project.id, urlInput.trim());
      setUrlInput('');
      setViewMode('image');
      setShowUploadModal(false);
    }
  };

  // ==========================================
  // 1. ULTRA-DETAILED GITDIAGRAM BLUEPRINT
  // Complete multi-tier architectural subgraphs
  // ==========================================
  const renderDetailedBlueprint = () => {
    switch (project.id) {
      case 'jansahayak':
        return (
          <div className="w-full h-full flex flex-col justify-between p-3 sm:p-5 text-white select-none overflow-y-auto">
            {/* Header info */}
            <div className="flex items-center justify-between text-[11px] pb-2.5 border-b border-violet-500/20 font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                <span className="text-violet-400 font-semibold">JanSahayak AI Scheme Assistant · GitDiagram Specification</span>
              </div>
              <span className="text-neutral-400 hidden sm:inline">12+ Indic Vernaculars · Multimodal Gov-Tech Pipeline</span>
            </div>

            {/* Multi-tier Architecture Subgraphs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 my-auto py-2.5">
              {/* Tier 1: Omnichannel Client Interfaces */}
              <div className="bg-neutral-900/80 border border-violet-500/30 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-violet-400 font-mono mb-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-violet-950/60 border border-violet-800/40">SUBGRAPH 01</span>
                    <Globe className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="font-semibold text-xs text-white flex items-center gap-1.5">
                    <span>Citizen Ingest Channels</span>
                  </h4>
                  <div className="space-y-1.5 mt-2">
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-violet-300 font-medium">Telegram Bot (@JanSahayakBot)</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">Webhook · Voice notes & text · Indic STT</div>
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-neutral-300 font-medium">WhatsApp Cloud API & Web</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">Multilingual audio input & responsive UI</div>
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-neutral-300 font-medium">AWS API Gateway + Cognito</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">Rate limiter, JWT auth & request routing</div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-neutral-800 text-[9px] font-mono text-violet-400 flex items-center justify-between">
                  <span>Protocol: HTTPS / WSS</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>

              {/* Tier 2: Multimodal Ingestion & Document AI */}
              <div className="bg-neutral-900/80 border border-cyan-500/30 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-cyan-400 font-mono mb-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40">SUBGRAPH 02</span>
                    <FileCode className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="font-semibold text-xs text-white">Multimodal Document AI</h4>
                  <div className="space-y-1.5 mt-2">
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-cyan-300 font-medium">Bhashini Indic ASR / TTS</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">Telugu, Hindi, Tamil, Kannada, Marathi</div>
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-neutral-300 font-medium">AWS Textract Document OCR</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">Aadhaar, Ration Card, 7/12 land titles</div>
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-neutral-300 font-medium">UIDAI Masking Vault (AES-256)</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">PII redaction & regulatory compliance</div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-neutral-800 text-[9px] font-mono text-cyan-400 flex items-center justify-between">
                  <span>Parsed Entities & JSON</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>

              {/* Tier 3: Reasoning Core & Vector Knowledge */}
              <div className="bg-neutral-900/80 border border-indigo-500/30 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-indigo-400 font-mono mb-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-indigo-950/60 border border-indigo-800/40">SUBGRAPH 03</span>
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="font-semibold text-xs text-white">Reasoning & Scheme Engine</h4>
                  <div className="space-y-1.5 mt-2">
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-indigo-300 font-medium">LangGraph Agent State Machine</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">Multi-turn intent loop & session memory</div>
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-neutral-300 font-medium">Qdrant Vector DB & Taxonomies</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">PM-KISAN, Rythu Bandhu, PMAY guidelines</div>
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-neutral-300 font-medium">LLM Reasoning Core</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">Eligibility check + citations & answers</div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-neutral-800 text-[9px] font-mono text-indigo-400 flex items-center justify-between">
                  <span>Verified Application Payload</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>

              {/* Tier 4: Robotic Process Automation & Delivery */}
              <div className="bg-neutral-900/80 border border-emerald-500/30 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-emerald-400 font-mono mb-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40">SUBGRAPH 04</span>
                    <Zap className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="font-semibold text-xs text-white">RPA & Portal Fulfillment</h4>
                  <div className="space-y-1.5 mt-2">
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-emerald-300 font-medium">Playwright Headless Pool</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">Automated government portal form filing</div>
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-neutral-300 font-medium">AWS S3 & DynamoDB Store</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">Encrypted docs & citizen tracking ID</div>
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-neutral-300 font-medium">AWS SNS / Twilio SMS Dispatch</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">Real-time status tracking & receipt alert</div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-neutral-800 text-[9px] font-mono text-emerald-400 flex items-center justify-between">
                  <span>Status: Submitted & Verified</span>
                  <CheckCircle2 className="w-3 h-3" />
                </div>
              </div>
            </div>

            {/* Bottom Pipeline Summary */}
            <div className="flex flex-wrap items-center justify-between text-[10px] text-neutral-400 font-mono pt-2 border-t border-neutral-800/80 gap-2">
              <span className="text-violet-400 flex items-center gap-1.5">
                <Workflow className="w-3.5 h-3.5" /> Full End-to-End Pipeline: Telegram/Voice → Bhashini STT → Aadhaar OCR → LangGraph Agent → Qdrant Vector DB → Playwright RPA → SMS Dispatch
              </span>
              <span className="text-neutral-500">Architecture Diagram v3.2</span>
            </div>
          </div>
        );

      case 'teamforge-ai':
        return (
          <div className="w-full h-full flex flex-col justify-between p-3 sm:p-5 text-white select-none overflow-y-auto">
            <div className="flex items-center justify-between text-[11px] pb-2.5 border-b border-blue-500/20 font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-blue-400 font-semibold">TeamForge.AI · GitDiagram Multi-Agent Architecture</span>
              </div>
              <span className="text-neutral-400 hidden sm:inline">NVIDIA Nemotron Core · Autonomous Software Engineering</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 my-auto py-2.5">
              {/* Tier 1 */}
              <div className="bg-neutral-900/80 border border-blue-500/30 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-blue-400 font-mono mb-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-blue-950/60 border border-blue-800/40">LAYER 01</span>
                    <Layers className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="font-semibold text-xs text-white">Client Experience & HUD</h4>
                  <div className="space-y-1.5 mt-2">
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-blue-300 font-medium">Next.js 14 App Router UI</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">Real-time collaboration canvas & DAG viewer</div>
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-neutral-300 font-medium">Terminal HUD Console</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">xterm.js streaming CLI logs & agent output</div>
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-neutral-300 font-medium">Monaco Code Editor</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">Interactive polyglot repository browser</div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-neutral-800 text-[9px] font-mono text-blue-400 flex items-center justify-between">
                  <span>WebSocket Bi-Directional</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>

              {/* Tier 2 */}
              <div className="bg-neutral-900/80 border border-indigo-500/30 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-indigo-400 font-mono mb-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-indigo-950/60 border border-indigo-800/40">LAYER 02</span>
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="font-semibold text-xs text-white">NVIDIA Nemotron Brain</h4>
                  <div className="space-y-1.5 mt-2">
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-indigo-300 font-medium">Nemotron Core Orchestrator</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">High-context 128k token planning loop</div>
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-neutral-300 font-medium">System Architect Agent</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">PRD breakdown, stack choice & DB schema</div>
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-neutral-300 font-medium">Task Divider & DAG Scheduler</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">Topological sorting of sprint deliverables</div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-neutral-800 text-[9px] font-mono text-indigo-400 flex items-center justify-between">
                  <span>Agent Task Dispatch</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>

              {/* Tier 3 */}
              <div className="bg-neutral-900/80 border border-purple-500/30 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-purple-400 font-mono mb-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-purple-950/60 border border-purple-800/40">LAYER 03</span>
                    <Cpu className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="font-semibold text-xs text-white">Execution Swarm</h4>
                  <div className="space-y-1.5 mt-2">
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-purple-300 font-medium">Code Generation Squad</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">Next.js, Express, FastAPI, PostgreSQL code</div>
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-neutral-300 font-medium">QA & Security Reviewer</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">Automated test generation & static lint audit</div>
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-neutral-300 font-medium">Docker Sandbox Runner</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">Isolated ephemeral container test builds</div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-neutral-800 text-[9px] font-mono text-purple-400 flex items-center justify-between">
                  <span>Verified Codebase & PR</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>

              {/* Tier 4 */}
              <div className="bg-neutral-900/80 border border-cyan-500/30 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-cyan-400 font-mono mb-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40">LAYER 04</span>
                    <Database className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="font-semibold text-xs text-white">DevOps & Cloud State</h4>
                  <div className="space-y-1.5 mt-2">
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-cyan-300 font-medium">GitHub Octokit Integration</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">Repo scaffolding, branch rules & PR filing</div>
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-neutral-300 font-medium">Supabase PostgreSQL + pgvector</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">Sprint playbooks, architecture embeddings</div>
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-neutral-300 font-medium">Redis Pub/Sub State Relay</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">Sub-5ms multi-agent coordination locks</div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-neutral-800 text-[9px] font-mono text-cyan-400 flex items-center justify-between">
                  <span>Status: Deployed & Synced</span>
                  <CheckCircle2 className="w-3 h-3" />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between text-[10px] text-neutral-400 font-mono pt-2 border-t border-neutral-800/80 gap-2">
              <span className="text-blue-400 flex items-center gap-1.5">
                <Workflow className="w-3.5 h-3.5" /> Full Flow: PRD Spec → Nemotron Core Brain → Architect Agent → Task DAG → Polyglot Swarm → Docker Sandbox → GitHub PR
              </span>
              <span className="text-neutral-500">GitDiagram v3.2</span>
            </div>
          </div>
        );

      case 'vibeverse':
        return (
          <div className="w-full h-full flex flex-col justify-between p-3 sm:p-5 text-white select-none overflow-y-auto">
            <div className="flex items-center justify-between text-[11px] pb-2.5 border-b border-purple-500/20 font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                <span className="text-purple-400 font-semibold">4-VibeVerse · GitDiagram Cognitive Media Architecture</span>
              </div>
              <span className="text-neutral-400 hidden sm:inline">8 Emotional Vectors · Multi-Modal Affective Intelligence</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 my-auto py-2.5">
              <div className="bg-neutral-900/80 border border-purple-500/30 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-purple-400 font-mono mb-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-purple-950/60 border border-purple-800/40">SUBGRAPH 01</span>
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="font-semibold text-xs text-white">Client Interface & Nebula</h4>
                  <div className="space-y-1.5 mt-2">
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-purple-300 font-medium">Three.js 3D Mood Nebula</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">Interactive affective particle physics</div>
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-neutral-300 font-medium">"How Are You Feeling?" Prompt</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">Natural language feeling input & pills</div>
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-neutral-300 font-medium">Web Audio API Synth</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">Generative harmonic acoustic soundscapes</div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-neutral-800 text-[9px] font-mono text-purple-400 flex items-center justify-between">
                  <span>Prompt & Acoustic State</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>

              <div className="bg-neutral-900/80 border border-pink-500/30 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-pink-400 font-mono mb-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-pink-950/60 border border-pink-800/40">SUBGRAPH 02</span>
                    <Cpu className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="font-semibold text-xs text-white">Affective AI Pipeline</h4>
                  <div className="space-y-1.5 mt-2">
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-pink-300 font-medium">VAD 3D Vectorizer</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">Valence, Arousal & Dominance emotional map</div>
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-neutral-300 font-medium">Sentence-Transformers Core</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">Dense 384-dimensional semantic embedding</div>
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-neutral-300 font-medium">Librosa Audio Analyzer</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">BPM tempo, acoustic energy & danceability</div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-neutral-800 text-[9px] font-mono text-pink-400 flex items-center justify-between">
                  <span>Cosine Similarity [HNSW]</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>

              <div className="bg-neutral-900/80 border border-blue-500/30 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-blue-400 font-mono mb-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-blue-950/60 border border-blue-800/40">SUBGRAPH 03</span>
                    <Database className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="font-semibold text-xs text-white">Media Intelligence & Vector DB</h4>
                  <div className="space-y-1.5 mt-2">
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-blue-300 font-medium">TMDB Movie Catalog API</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">Mood keywords, cinematography tags, posters</div>
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-neutral-300 font-medium">Spotify & Soundcloud APIs</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">Track audio previews & dynamic streaming</div>
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-neutral-300 font-medium">ChromaDB Vector Store</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">High-dimensional nearest neighbor indexing</div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-neutral-800 text-[9px] font-mono text-blue-400 flex items-center justify-between">
                  <span>Affective Media Matches</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>

              <div className="bg-neutral-900/80 border border-violet-500/30 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-violet-400 font-mono mb-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-violet-950/60 border border-violet-800/40">SUBGRAPH 04</span>
                    <Globe className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="font-semibold text-xs text-white">Journal & Digital Identity</h4>
                  <div className="space-y-1.5 mt-2">
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-violet-300 font-medium">PostgreSQL Vibe Journal</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">Daily emotional trajectory & taste diary</div>
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-neutral-300 font-medium">Vibe Map Clustering</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">Cross-user emotional sync & shared spaces</div>
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-neutral-300 font-medium">Web3 Vibe Passport</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">Cryptographic taste fingerprint token</div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-neutral-800 text-[9px] font-mono text-violet-400 flex items-center justify-between">
                  <span>Status: Reactive Stream Active</span>
                  <CheckCircle2 className="w-3 h-3" />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between text-[10px] text-neutral-400 font-mono pt-2 border-t border-neutral-800/80 gap-2">
              <span className="text-purple-400 flex items-center gap-1.5">
                <Workflow className="w-3.5 h-3.5" /> Full Flow: Feeling Query → VAD Space Vectorizer → Sentence-Transformers → ChromaDB Vector Search → TMDB/Spotify → Vibe Journal
              </span>
              <span className="text-neutral-500">GitDiagram v3.2</span>
            </div>
          </div>
        );

      case 'quickpitch':
        return (
          <div className="w-full h-full flex flex-col justify-between p-3 sm:p-5 text-white select-none overflow-y-auto">
            <div className="flex items-center justify-between text-[11px] pb-2.5 border-b border-rose-500/20 font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                <span className="text-rose-400 font-semibold">5-QuickPitch AI v2.5 · GitDiagram System Architecture</span>
              </div>
              <span className="text-neutral-400 hidden sm:inline">RTX 4060 Local Acceleration · 3.3s Native .pptx Synthesis</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 my-auto py-2.5">
              <div className="bg-neutral-900/80 border border-rose-500/30 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-rose-400 font-mono mb-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-rose-950/60 border border-rose-800/40">TIER 01</span>
                    <Radio className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="font-semibold text-xs text-white">Multi-Source Ingestion</h4>
                  <div className="space-y-1.5 mt-2">
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-rose-300 font-medium">yt-dlp Stream Ingestion</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">High-speed audio extraction from video URLs</div>
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-neutral-300 font-medium">Media File Multipart Ingest</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">MP4, MP3, WAV, MKV, WebM container parser</div>
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-neutral-300 font-medium">Live Microphone Stream</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">WebRTC 16kHz lecture recording feed</div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-neutral-800 text-[9px] font-mono text-rose-400 flex items-center justify-between">
                  <span>Raw Audio Stream</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>

              <div className="bg-neutral-900/80 border border-orange-500/30 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-orange-400 font-mono mb-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-orange-950/60 border border-orange-800/40">TIER 02</span>
                    <Cpu className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="font-semibold text-xs text-white">ASR & Speaker Diarization</h4>
                  <div className="space-y-1.5 mt-2">
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-orange-300 font-medium">OpenAI Whisper Large-v3</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">FP16 GPU inference transcription engine</div>
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-neutral-300 font-medium">PyAnnote Audio Diarization</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">Speaker identity separation & timestamps</div>
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-neutral-300 font-medium">FFmpeg Preprocessing</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">Bandpass filter & loudness normalization</div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-neutral-800 text-[9px] font-mono text-orange-400 flex items-center justify-between">
                  <span>Structured Dialogue JSON</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>

              <div className="bg-neutral-900/80 border border-purple-500/30 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-purple-400 font-mono mb-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-purple-950/60 border border-purple-800/40">TIER 03</span>
                    <Layers className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="font-semibold text-xs text-white">Slide Synthesis (RTX 4060)</h4>
                  <div className="space-y-1.5 mt-2">
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-purple-300 font-medium">Semantic Chunker & Summary</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">Key insight extraction & narrative outline</div>
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-neutral-300 font-medium">Executive Theme Engine</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">8 Palettes: Obsidian, Emerald, Royal Indigo</div>
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-neutral-300 font-medium">Speaker Notes Generator</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">High-impact talking points per slide card</div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-neutral-800 text-[9px] font-mono text-purple-400 flex items-center justify-between">
                  <span>Slide Layout Vector Objects</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>

              <div className="bg-neutral-900/80 border border-rose-500/30 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-rose-400 font-mono mb-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-rose-950/60 border border-rose-800/40">TIER 04</span>
                    <FileCode className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="font-semibold text-xs text-white">Native .pptx Exporter</h4>
                  <div className="space-y-1.5 mt-2">
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-rose-300 font-medium">Office Open XML Builder</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">100% native PowerPoint binary generation</div>
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-neutral-300 font-medium">Dynamic Layout Composer</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">Metric badges, stat grids, vector shapes</div>
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-neutral-300 font-medium">Instant File Dispatch</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">Direct browser download (.pptx & PDF preview)</div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-neutral-800 text-[9px] font-mono text-rose-400 flex items-center justify-between">
                  <span>Latency: 3.3s Total Run</span>
                  <CheckCircle2 className="w-3 h-3" />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between text-[10px] text-neutral-400 font-mono pt-2 border-t border-neutral-800/80 gap-2">
              <span className="text-rose-400 flex items-center gap-1.5">
                <Workflow className="w-3.5 h-3.5" /> Full Flow: YouTube / Video Ingest → Whisper Large-v3 ASR → PyAnnote Diarization → Semantic Chunker → RTX 4060 Themer → Native .pptx XML
              </span>
              <span className="text-neutral-500">GitDiagram v3.2</span>
            </div>
          </div>
        );

      case 'garuda-x':
        return (
          <div className="w-full h-full flex flex-col justify-between p-3 sm:p-5 text-white select-none overflow-y-auto">
            <div className="flex items-center justify-between text-[11px] pb-2.5 border-b border-cyan-500/20 font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-cyan-400 font-semibold">8-GARUDA · GitDiagram Cybersecurity SOC Architecture</span>
              </div>
              <span className="text-neutral-400 hidden sm:inline">254 Subnet Addresses Scanned in 1.3s · Sub-50ms Anomaly AI</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 my-auto py-2.5">
              <div className="bg-neutral-900/80 border border-cyan-500/30 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-cyan-400 font-mono mb-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40">POD 01</span>
                    <Radio className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="font-semibold text-xs text-white">Physical & Subnet Probe</h4>
                  <div className="space-y-1.5 mt-2">
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-cyan-300 font-medium">Scapy Raw Socket Sniffer</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">ARP broadcast sweep across 192.168.1.0/24</div>
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-neutral-300 font-medium">MAVLink Telemetry Protocol</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">Airspeed, GPS waypoints, RF signal, battery</div>
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-neutral-300 font-medium">Autonomous Edge Sensor Pod</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">Subnet interface bridge & packet buffer</div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-neutral-800 text-[9px] font-mono text-cyan-400 flex items-center justify-between">
                  <span>Raw Packet Telemetry</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>

              <div className="bg-neutral-900/80 border border-blue-500/30 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-blue-400 font-mono mb-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-blue-950/60 border border-blue-800/40">POD 02</span>
                    <Cpu className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="font-semibold text-xs text-white">Device Fingerprinting</h4>
                  <div className="space-y-1.5 mt-2">
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-blue-300 font-medium">MAC OUI Vendor Resolver</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">Hardware manufacturer identification lookup</div>
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-neutral-300 font-medium">TCP/UDP Port Prober</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">Open port scanner: 22, 80, 443, 8080, Modbus</div>
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-neutral-300 font-medium">OS Passive Fingerprinter</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">TCP window size, initial TTL, SYN options</div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-neutral-800 text-[9px] font-mono text-blue-400 flex items-center justify-between">
                  <span>Profiled Node Metadata</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>

              <div className="bg-neutral-900/80 border border-amber-500/30 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-amber-400 font-mono mb-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-amber-950/60 border border-amber-800/40">POD 03</span>
                    <ShieldAlert className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="font-semibold text-xs text-white">Threat AI Engine</h4>
                  <div className="space-y-1.5 mt-2">
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-amber-300 font-medium">Isolation Forest Anomaly AI</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">Sub-50ms neural threat score evaluator</div>
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-neutral-300 font-medium">Zero-Trust Rules Engine</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">Unauthorized IP injection & MAC spoof alert</div>
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-neutral-300 font-medium">Swarm Defense Matrix</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">Anti-jamming frequency hop & safe return</div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-neutral-800 text-[9px] font-mono text-amber-400 flex items-center justify-between">
                  <span>Mitigation Trigger & Alerts</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>

              <div className="bg-neutral-900/80 border border-cyan-500/30 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-cyan-400 font-mono mb-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40">POD 04</span>
                    <Layers className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="font-semibold text-xs text-white">Holographic SOC Console</h4>
                  <div className="space-y-1.5 mt-2">
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-cyan-300 font-medium">WebGL Topology Graph</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">Dynamic 3D node mesh & threat level rings</div>
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-neutral-300 font-medium">Automated Countermeasures</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">IPTables firewall drop & ARP quarantine</div>
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-neutral-300 font-medium">TimescaleDB Telemetry Store</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">Audit-grade time series forensic logs</div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-neutral-800 text-[9px] font-mono text-cyan-400 flex items-center justify-between">
                  <span>Status: Zero-Trust Armed</span>
                  <CheckCircle2 className="w-3 h-3" />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between text-[10px] text-neutral-400 font-mono pt-2 border-t border-neutral-800/80 gap-2">
              <span className="text-cyan-400 flex items-center gap-1.5">
                <Workflow className="w-3.5 h-3.5" /> Full Flow: Raw Scapy Sniffer → MAVLink Telemetry → MAC OUI Fingerprinter → Isolation Forest Anomaly AI → Zero-Trust Rules → Holographic SOC C2
              </span>
              <span className="text-neutral-500">GitDiagram v3.2</span>
            </div>
          </div>
        );

      case 'edge':
      default:
        return (
          <div className="w-full h-full flex flex-col justify-between p-3 sm:p-5 text-white select-none overflow-y-auto">
            <div className="flex items-center justify-between text-[11px] pb-2.5 border-b border-emerald-500/20 font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 font-semibold">9-EDGE · GitDiagram Analytics & Biomechanics Pipeline</span>
              </div>
              <span className="text-neutral-400 hidden sm:inline">9.5M+ Deliveries · 14,729 Matches · Sub-12ms Studio UI</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 my-auto py-2.5">
              <div className="bg-neutral-900/80 border border-emerald-500/30 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-emerald-400 font-mono mb-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40">NODE 01</span>
                    <Radio className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="font-semibold text-xs text-white">Live Match Telemetry</h4>
                  <div className="space-y-1.5 mt-2">
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-emerald-300 font-medium">CricAPI Live Feeds</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">Real-time ball-by-ball commentary streams</div>
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-neutral-300 font-medium">Hawkeye 3D Trajectory Sensor</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">Release speed, swing angle, seam deviation</div>
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-neutral-300 font-medium">Atmospheric & Venue Sensors</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">Pitch moisture, humidity & wind vectors</div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-neutral-800 text-[9px] font-mono text-emerald-400 flex items-center justify-between">
                  <span>Kafka Event Bus</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>

              <div className="bg-neutral-900/80 border border-cyan-500/30 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-cyan-400 font-mono mb-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40">NODE 02</span>
                    <Database className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="font-semibold text-xs text-white">Data Lake & OLAP Engine</h4>
                  <div className="space-y-1.5 mt-2">
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-cyan-300 font-medium">DuckDB + Apache Parquet</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">9,569,669 granular delivery events indexed</div>
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-neutral-300 font-medium">Player Matchup Matrix</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">11,985 players, batter vs bowler clusters</div>
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-neutral-300 font-medium">ICC Rankings & Venue Cache</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">Historical pitch degradation indices</div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-neutral-800 text-[9px] font-mono text-cyan-400 flex items-center justify-between">
                  <span>Low-Latency Vector Arrays</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>

              <div className="bg-neutral-900/80 border border-purple-500/30 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-purple-400 font-mono mb-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-purple-950/60 border border-purple-800/40">NODE 03</span>
                    <Cpu className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="font-semibold text-xs text-white">Stochastic Win & WPA AI</h4>
                  <div className="space-y-1.5 mt-2">
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-purple-300 font-medium">Monte Carlo Win Engine</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">10,000 simulated in-match match outcomes</div>
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-neutral-300 font-medium">WPA (Win Probability Added)</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">Ball-by-ball leverage index & swing impact</div>
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-neutral-300 font-medium">Kingsmead Pitch Factor Model</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">Wear, bounce & seam deflection predictions</div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-neutral-800 text-[9px] font-mono text-purple-400 flex items-center justify-between">
                  <span>Live Predictive Analytics</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>

              <div className="bg-neutral-900/80 border border-emerald-500/30 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-emerald-400 font-mono mb-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40">NODE 04</span>
                    <Zap className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="font-semibold text-xs text-white">Live Match Center HUD</h4>
                  <div className="space-y-1.5 mt-2">
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-emerald-300 font-medium">&lt;12ms Studio Broadcast HUD</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">Real-time wagon wheels & pitch heatmaps</div>
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-neutral-300 font-medium">Tactical Crease Analytics</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">Real-time bowling changes & field traps</div>
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 text-[10px]">
                      <div className="font-mono text-neutral-300 font-medium">Redis In-Memory State Cache</div>
                      <div className="text-neutral-400 text-[9px] mt-0.5">Instant broadcast overlay synchronization</div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-neutral-800 text-[9px] font-mono text-emerald-400 flex items-center justify-between">
                  <span>Status: Live Telemetry Active</span>
                  <CheckCircle2 className="w-3 h-3" />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between text-[10px] text-neutral-400 font-mono pt-2 border-t border-neutral-800/80 gap-2">
              <span className="text-emerald-400 flex items-center gap-1.5">
                <Workflow className="w-3.5 h-3.5" /> Full Flow: CricAPI Feeds → Hawkeye 3D Radar → Kafka Ingest → DuckDB Lake → Monte Carlo WPA Engine → Redis Cache → Studio HUD
              </span>
              <span className="text-neutral-500">GitDiagram v3.2</span>
            </div>
          </div>
        );
    }
  };

  // ==========================================
  // 2. LIVE TELEMETRY FLOW PIPELINE
  // The verified interactive stage pipeline
  // ==========================================
  const renderTelemetryPipeline = () => {
    switch (project.id) {
      case 'edge':
        return (
          <div className="w-full h-full flex flex-col justify-between p-3 sm:p-5 text-white select-none">
            <div className="flex items-center justify-between text-[11px] pb-2 border-b border-emerald-500/20 font-mono">
              <span className="text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                TELEMETRY: 9,569,669 DELIVERIES
              </span>
              <span className="text-neutral-400 hidden sm:inline">14,729 MATCHES · 11,985 PLAYERS</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 my-auto py-2">
              <div className="bg-neutral-900/90 border border-emerald-500/30 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-emerald-400 font-mono mb-1">
                    <span>STAGE 01</span>
                    <Radio className="w-3 h-3" />
                  </div>
                  <h4 className="font-semibold text-xs text-white">Match Feeds</h4>
                  <p className="text-[10px] text-neutral-400 mt-1 leading-snug">
                    CricAPI + Hawkeye 3D trajectory ball-by-ball stream
                  </p>
                </div>
                <div className="mt-2 text-[9px] font-mono text-emerald-300 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/40 w-fit">
                  Kafka Ingest
                </div>
              </div>

              <div className="bg-neutral-900/90 border border-neutral-700/60 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-cyan-400 font-mono mb-1">
                    <span>STAGE 02</span>
                    <Database className="w-3 h-3" />
                  </div>
                  <h4 className="font-semibold text-xs text-white">Ball-by-Ball Lake</h4>
                  <p className="text-[10px] text-neutral-400 mt-1 leading-snug">
                    DuckDB & Parquet indexed by player matchup & venue
                  </p>
                </div>
                <div className="mt-2 text-[9px] font-mono text-cyan-300 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/40 w-fit">
                  OLAP Engine
                </div>
              </div>

              <div className="bg-neutral-900/90 border border-purple-500/30 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-purple-400 font-mono mb-1">
                    <span>STAGE 03</span>
                    <Cpu className="w-3 h-3" />
                  </div>
                  <h4 className="font-semibold text-xs text-white">Win Prob & WPA</h4>
                  <p className="text-[10px] text-neutral-400 mt-1 leading-snug">
                    Stochastic win vector + head-to-head match matrix
                  </p>
                </div>
                <div className="mt-2 text-[9px] font-mono text-purple-300 bg-purple-950/60 px-1.5 py-0.5 rounded border border-purple-800/40 w-fit">
                  ML Prediction
                </div>
              </div>

              <div className="bg-neutral-900/90 border border-emerald-500/40 rounded-xl p-3 flex flex-col justify-between bg-gradient-to-br from-neutral-900 to-emerald-950/20">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-emerald-400 font-mono mb-1">
                    <span>STAGE 04</span>
                    <Zap className="w-3 h-3" />
                  </div>
                  <h4 className="font-semibold text-xs text-white">Cricmetrics HUD</h4>
                  <p className="text-[10px] text-neutral-400 mt-1 leading-snug">
                    Live match center, Kingsmead pitch radar & wagon wheels
                  </p>
                </div>
                <div className="mt-2 text-[9px] font-mono text-emerald-300 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-700/60 w-fit">
                  &lt;12ms Studio UI
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono pt-1">
              <span className="flex items-center gap-1 text-emerald-400">
                <ArrowRight className="w-3 h-3" /> Flow: Feeds → DuckDB → WPA Engine → Redis → Live Studio HUD
              </span>
              <span className="text-neutral-500">Live Telemetry Pipeline</span>
            </div>
          </div>
        );

      case 'vibeverse':
        return (
          <div className="w-full h-full flex flex-col justify-between p-3 sm:p-5 text-white select-none">
            <div className="flex items-center justify-between text-[11px] pb-2 border-b border-purple-500/20 font-mono">
              <span className="text-purple-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
                MOOD PIPELINE: 8 EMOTIONAL NODES
              </span>
              <span className="text-neutral-400 hidden sm:inline">CINEMA & ACOUSTIC STEMS</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 my-auto py-2">
              <div className="bg-neutral-900/90 border border-purple-500/30 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-purple-400 font-mono mb-1">
                    <span>INPUT</span>
                    <Sparkles className="w-3 h-3" />
                  </div>
                  <h4 className="font-semibold text-xs text-white">Mood Query</h4>
                  <p className="text-[10px] text-neutral-400 mt-1 leading-snug">
                    "How are you feeling today?" prompt & emotional pill chips
                  </p>
                </div>
                <div className="mt-2 text-[9px] font-mono text-purple-300 bg-purple-950/60 px-1.5 py-0.5 rounded border border-purple-800/40 w-fit">
                  Natural Language
                </div>
              </div>

              <div className="bg-neutral-900/90 border border-neutral-700/60 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-pink-400 font-mono mb-1">
                    <span>EMBEDDING</span>
                    <Cpu className="w-3 h-3" />
                  </div>
                  <h4 className="font-semibold text-xs text-white">Sentiment Vectorizer</h4>
                  <p className="text-[10px] text-neutral-400 mt-1 leading-snug">
                    Valence & arousal extraction with acoustic audio feature mapping
                  </p>
                </div>
                <div className="mt-2 text-[9px] font-mono text-pink-300 bg-pink-950/60 px-1.5 py-0.5 rounded border border-pink-800/40 w-fit">
                  Emotion Space
                </div>
              </div>

              <div className="bg-neutral-900/90 border border-blue-500/30 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-blue-400 font-mono mb-1">
                    <span>DATABASE</span>
                    <Database className="w-3 h-3" />
                  </div>
                  <h4 className="font-semibold text-xs text-white">Media Vector DB</h4>
                  <p className="text-[10px] text-neutral-400 mt-1 leading-snug">
                    TMDB movies & Spotify tracks indexed by affective resonance
                  </p>
                </div>
                <div className="mt-2 text-[9px] font-mono text-blue-300 bg-blue-950/60 px-1.5 py-0.5 rounded border border-blue-800/40 w-fit">
                  Cosine Matcher
                </div>
              </div>

              <div className="bg-neutral-900/90 border border-purple-500/40 rounded-xl p-3 flex flex-col justify-between bg-gradient-to-br from-neutral-900 to-purple-950/20">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-purple-300 font-mono mb-1">
                    <span>EXPERIENCE</span>
                    <Layers className="w-3 h-3" />
                  </div>
                  <h4 className="font-semibold text-xs text-white">Vibe Map & Journal</h4>
                  <p className="text-[10px] text-neutral-400 mt-1 leading-snug">
                    Generative visual canvas, audio preview loop & taste journal
                  </p>
                </div>
                <div className="mt-2 text-[9px] font-mono text-purple-300 bg-purple-950/80 px-1.5 py-0.5 rounded border border-purple-700/60 w-fit">
                  Reactive UI
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono pt-1">
              <span className="flex items-center gap-1 text-purple-400">
                <ArrowRight className="w-3 h-3" /> Flow: Feeling Prompt → Valence Vector → Media DB → Vibe Journal
              </span>
              <span className="text-neutral-500">Live Telemetry Pipeline</span>
            </div>
          </div>
        );

      case 'garuda-x':
        return (
          <div className="w-full h-full flex flex-col justify-between p-3 sm:p-5 text-white select-none">
            <div className="flex items-center justify-between text-[11px] pb-2 border-b border-cyan-500/20 font-mono">
              <span className="text-cyan-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
                CYBERSECURITY SOC // 254 ADDR / 1.3S
              </span>
              <span className="text-neutral-400 hidden sm:inline">ZERO-TRUST TELEMETRY</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 my-auto py-2">
              <div className="bg-neutral-900/90 border border-cyan-500/30 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-cyan-400 font-mono mb-1">
                    <span>SNIFFER</span>
                    <Radio className="w-3 h-3" />
                  </div>
                  <h4 className="font-semibold text-xs text-white">Subnet Scanner</h4>
                  <p className="text-[10px] text-neutral-400 mt-1 leading-snug">
                    Scapy raw socket packet probe across subnet 192.168.1.0/24
                  </p>
                </div>
                <div className="mt-2 text-[9px] font-mono text-cyan-300 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/40 w-fit">
                  ARP Ingest
                </div>
              </div>

              <div className="bg-neutral-900/90 border border-neutral-700/60 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-blue-400 font-mono mb-1">
                    <span>PROFILER</span>
                    <Cpu className="w-3 h-3" />
                  </div>
                  <h4 className="font-semibold text-xs text-white">Fingerprinter</h4>
                  <p className="text-[10px] text-neutral-400 mt-1 leading-snug">
                    MAC OUI vendor resolution & TCP SYN/ACK open port mapper
                  </p>
                </div>
                <div className="mt-2 text-[9px] font-mono text-blue-300 bg-blue-950/60 px-1.5 py-0.5 rounded border border-blue-800/40 w-fit">
                  OS Discovery
                </div>
              </div>

              <div className="bg-neutral-900/90 border border-amber-500/30 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-amber-400 font-mono mb-1">
                    <span>ANOMALY</span>
                    <ShieldAlert className="w-3 h-3" />
                  </div>
                  <h4 className="font-semibold text-xs text-white">Threat AI Engine</h4>
                  <p className="text-[10px] text-neutral-400 mt-1 leading-snug">
                    Sub-50ms anomaly scoring, rogue node alerts & threat levels
                  </p>
                </div>
                <div className="mt-2 text-[9px] font-mono text-amber-300 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-800/40 w-fit">
                  Neural Scoring
                </div>
              </div>

              <div className="bg-neutral-900/90 border border-cyan-500/40 rounded-xl p-3 flex flex-col justify-between bg-gradient-to-br from-neutral-900 to-cyan-950/20">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-cyan-300 font-mono mb-1">
                    <span>CONSOLE</span>
                    <Layers className="w-3 h-3" />
                  </div>
                  <h4 className="font-semibold text-xs text-white">Holographic SOC</h4>
                  <p className="text-[10px] text-neutral-400 mt-1 leading-snug">
                    Dynamic node topology, threat mitigation trigger & logs
                  </p>
                </div>
                <div className="mt-2 text-[9px] font-mono text-cyan-300 bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-700/60 w-fit">
                  Mission Control
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono pt-1">
              <span className="flex items-center gap-1 text-cyan-400">
                <ArrowRight className="w-3 h-3" /> Flow: Raw Packets → Fingerprint → Anomaly Model → SOC Terminal
              </span>
              <span className="text-neutral-500">Live Telemetry Pipeline</span>
            </div>
          </div>
        );

      case 'teamforge-ai':
        return (
          <div className="w-full h-full flex flex-col justify-between p-3 sm:p-5 text-white select-none">
            <div className="flex items-center justify-between text-[11px] pb-2 border-b border-blue-500/20 font-mono">
              <span className="text-blue-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                MULTI-AGENT ENGINE // NVIDIA NEMOTRON
              </span>
              <span className="text-neutral-400 hidden sm:inline">AUTONOMOUS SCAFFOLDING</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 my-auto py-2">
              <div className="bg-neutral-900/90 border border-blue-500/30 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-blue-400 font-mono mb-1">
                    <span>SPEC INPUT</span>
                    <FileCode className="w-3 h-3" />
                  </div>
                  <h4 className="font-semibold text-xs text-white">Product Spec</h4>
                  <p className="text-[10px] text-neutral-400 mt-1 leading-snug">
                    Brief, hackathon problem statement or repo clone request
                  </p>
                </div>
                <div className="mt-2 text-[9px] font-mono text-blue-300 bg-blue-950/60 px-1.5 py-0.5 rounded border border-blue-800/40 w-fit">
                  Requirement Parser
                </div>
              </div>

              <div className="bg-neutral-900/90 border border-indigo-500/30 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-indigo-400 font-mono mb-1">
                    <span>BRAIN</span>
                    <Bot className="w-3 h-3" />
                  </div>
                  <h4 className="font-semibold text-xs text-white">Nemotron Brain</h4>
                  <p className="text-[10px] text-neutral-400 mt-1 leading-snug">
                    NVIDIA Nemotron high-context agent orchestrator & router
                  </p>
                </div>
                <div className="mt-2 text-[9px] font-mono text-indigo-300 bg-indigo-950/60 px-1.5 py-0.5 rounded border border-indigo-800/40 w-fit">
                  Agent Loop
                </div>
              </div>

              <div className="bg-neutral-900/90 border border-neutral-700/60 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-amber-400 font-mono mb-1">
                    <span>SWARM</span>
                    <Cpu className="w-3 h-3" />
                  </div>
                  <h4 className="font-semibold text-xs text-white">Specialized Agents</h4>
                  <p className="text-[10px] text-neutral-400 mt-1 leading-snug">
                    Architect Agent, Task Divider & PR Integration Squad
                  </p>
                </div>
                <div className="mt-2 text-[9px] font-mono text-amber-300 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-800/40 w-fit">
                  DAG Generation
                </div>
              </div>

              <div className="bg-neutral-900/90 border border-blue-500/40 rounded-xl p-3 flex flex-col justify-between bg-gradient-to-br from-neutral-900 to-blue-950/20">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-blue-300 font-mono mb-1">
                    <span>DELIVERY</span>
                    <Zap className="w-3 h-3" />
                  </div>
                  <h4 className="font-semibold text-xs text-white">Playbook & Code</h4>
                  <p className="text-[10px] text-neutral-400 mt-1 leading-snug">
                    Automated GitHub scaffold, sprint playbook & live HUD
                  </p>
                </div>
                <div className="mt-2 text-[9px] font-mono text-blue-300 bg-blue-950/80 px-1.5 py-0.5 rounded border border-blue-700/60 w-fit">
                  GitHub + Supabase
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono pt-1">
              <span className="flex items-center gap-1 text-blue-400">
                <ArrowRight className="w-3 h-3" /> Flow: Requirement Spec → Nemotron Core → Agent Swarm → Playbook Scaffolding
              </span>
              <span className="text-neutral-500">Live Telemetry Pipeline</span>
            </div>
          </div>
        );

      case 'quickpitch':
        return (
          <div className="w-full h-full flex flex-col justify-between p-3 sm:p-5 text-white select-none">
            <div className="flex items-center justify-between text-[11px] pb-2 border-b border-rose-500/20 font-mono">
              <span className="text-rose-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                OFFLINE AI LATENCY: 3.3s // RTX 4060
              </span>
              <span className="text-neutral-400 hidden sm:inline">NATIVE .PPTX EXPORT</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 my-auto py-2">
              <div className="bg-neutral-900/90 border border-rose-500/30 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-rose-400 font-mono mb-1">
                    <span>INGEST</span>
                    <Radio className="w-3 h-3" />
                  </div>
                  <h4 className="font-semibold text-xs text-white">Video & Audio</h4>
                  <p className="text-[10px] text-neutral-400 mt-1 leading-snug">
                    YouTube URL stream, MP4 recording or raw lecture transcript
                  </p>
                </div>
                <div className="mt-2 text-[9px] font-mono text-rose-300 bg-rose-950/60 px-1.5 py-0.5 rounded border border-rose-800/40 w-fit">
                  Whisper ASR
                </div>
              </div>

              <div className="bg-neutral-900/90 border border-neutral-700/60 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-orange-400 font-mono mb-1">
                    <span>NLP</span>
                    <Layers className="w-3 h-3" />
                  </div>
                  <h4 className="font-semibold text-xs text-white">Semantic Chunker</h4>
                  <p className="text-[10px] text-neutral-400 mt-1 leading-snug">
                    Key takeaway extraction, slide title hierarchy & bullet synthesis
                  </p>
                </div>
                <div className="mt-2 text-[9px] font-mono text-orange-300 bg-orange-950/60 px-1.5 py-0.5 rounded border border-orange-800/40 w-fit">
                  Slide Structuring
                </div>
              </div>

              <div className="bg-neutral-900/90 border border-purple-500/30 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-purple-400 font-mono mb-1">
                    <span>RTX 4060</span>
                    <Cpu className="w-3 h-3" />
                  </div>
                  <h4 className="font-semibold text-xs text-white">Theme Synthesizer</h4>
                  <p className="text-[10px] text-neutral-400 mt-1 leading-snug">
                    8 Executive color themes, typographic scaling & speaker notes
                  </p>
                </div>
                <div className="mt-2 text-[9px] font-mono text-purple-300 bg-purple-950/60 px-1.5 py-0.5 rounded border border-purple-800/40 w-fit">
                  Local Tensor AI
                </div>
              </div>

              <div className="bg-neutral-900/90 border border-rose-500/40 rounded-xl p-3 flex flex-col justify-between bg-gradient-to-br from-neutral-900 to-rose-950/20">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-rose-300 font-mono mb-1">
                    <span>EXPORT</span>
                    <FileCode className="w-3 h-3" />
                  </div>
                  <h4 className="font-semibold text-xs text-white">Native .pptx File</h4>
                  <p className="text-[10px] text-neutral-400 mt-1 leading-snug">
                    Direct Office Open XML generation, 100% editable deck
                  </p>
                </div>
                <div className="mt-2 text-[9px] font-mono text-rose-300 bg-rose-950/80 px-1.5 py-0.5 rounded border border-rose-700/60 w-fit">
                  Instant Download
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono pt-1">
              <span className="flex items-center gap-1 text-rose-400">
                <ArrowRight className="w-3 h-3" /> Flow: YouTube / Audio → Whisper ASR → RTX 4060 AI → Native .pptx
              </span>
              <span className="text-neutral-500">Live Telemetry Pipeline</span>
            </div>
          </div>
        );

      case 'jansahayak':
        return (
          <div className="w-full h-full flex flex-col justify-between p-3 sm:p-5 text-white select-none">
            <div className="flex items-center justify-between text-[11px] pb-2 border-b border-violet-500/20 font-mono">
              <span className="text-violet-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-violet-500 animate-ping" />
                WELFARE RPA AUTOMATION // 12+ INDIC LANGUAGES
              </span>
              <span className="text-neutral-400 hidden sm:inline">AWS SERVERLESS + TEXTRACT</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 my-auto py-2">
              <div className="bg-neutral-900/90 border border-violet-500/30 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-violet-400 font-mono mb-1">
                    <span>INTERFACE</span>
                    <Globe className="w-3 h-3" />
                  </div>
                  <h4 className="font-semibold text-xs text-white">Citizen Channels</h4>
                  <p className="text-[10px] text-neutral-400 mt-1 leading-snug">
                    Telegram Bot & WhatsApp voice in Telugu, Hindi, Tamil, etc.
                  </p>
                </div>
                <div className="mt-2 text-[9px] font-mono text-violet-300 bg-violet-950/60 px-1.5 py-0.5 rounded border border-violet-800/40 w-fit">
                  Bhashini STT
                </div>
              </div>

              <div className="bg-neutral-900/90 border border-neutral-700/60 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-cyan-400 font-mono mb-1">
                    <span>DOCUMENT OCR</span>
                    <FileCode className="w-3 h-3" />
                  </div>
                  <h4 className="font-semibold text-xs text-white">Aadhaar OCR</h4>
                  <p className="text-[10px] text-neutral-400 mt-1 leading-snug">
                    AWS Textract citizen metadata & state land records parser
                  </p>
                </div>
                <div className="mt-2 text-[9px] font-mono text-cyan-300 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/40 w-fit">
                  Document AI
                </div>
              </div>

              <div className="bg-neutral-900/90 border border-indigo-500/30 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-indigo-400 font-mono mb-1">
                    <span>REASONING</span>
                    <Bot className="w-3 h-3" />
                  </div>
                  <h4 className="font-semibold text-xs text-white">Scheme AI Agent</h4>
                  <p className="text-[10px] text-neutral-400 mt-1 leading-snug">
                    LangChain agent matching PM-KISAN & Rythu Bandhu rules
                  </p>
                </div>
                <div className="mt-2 text-[9px] font-mono text-indigo-300 bg-indigo-950/60 px-1.5 py-0.5 rounded border border-indigo-800/40 w-fit">
                  Vector Knowledge
                </div>
              </div>

              <div className="bg-neutral-900/90 border border-violet-500/40 rounded-xl p-3 flex flex-col justify-between bg-gradient-to-br from-neutral-900 to-violet-950/20">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-violet-300 font-mono mb-1">
                    <span>FULFILLMENT</span>
                    <Zap className="w-3 h-3" />
                  </div>
                  <h4 className="font-semibold text-xs text-white">Headless RPA</h4>
                  <p className="text-[10px] text-neutral-400 mt-1 leading-snug">
                    Automated government portal filing worker + SMS dispatch
                  </p>
                </div>
                <div className="mt-2 text-[9px] font-mono text-violet-300 bg-violet-950/80 px-1.5 py-0.5 rounded border border-violet-700/60 w-fit">
                  AWS S3 & SNS
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono pt-1">
              <span className="flex items-center gap-1 text-violet-400">
                <ArrowRight className="w-3 h-3" /> Flow: Citizen Bot → Bhashini → Aadhaar OCR → Scheme Agent → RPA Filing
              </span>
              <span className="text-neutral-500">Live Telemetry Pipeline</span>
            </div>
          </div>
        );

      default:
        return renderDetailedBlueprint();
    }
  };

  // ==========================================
  // 3. ORIGINAL IMAGE / FILE VIEW
  // Allows displaying original uploaded diagram
  // ==========================================
  const renderOriginalImageView = () => {
    if (customDiagramImage) {
      return (
        <div
          onClick={() => setIsFullscreen(true)}
          className="relative w-full h-full flex flex-col items-center justify-center p-3 cursor-pointer group/custom overflow-hidden"
        >
          <img
            src={customDiagramImage}
            alt={`${project.title} Architecture Diagram`}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-transform duration-300 group-hover/custom:scale-[1.01]"
          />
          <div className="absolute bottom-3 right-3 bg-neutral-950/85 backdrop-blur-md border border-neutral-700 text-neutral-200 text-[10px] font-mono px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-lg">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Original Uploaded Diagram · Click to Zoom & Inspect</span>
          </div>
        </div>
      );
    }

    // High-fidelity fallback illustration if no local uploaded file yet
    return (
      <div className="w-full h-full flex flex-col justify-between p-4 sm:p-6 text-white select-none">
        <div className="flex items-center justify-between text-xs pb-2 border-b border-neutral-800 font-mono">
          <span className="text-neutral-300 flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-indigo-400" />
            Original GitDiagram Image Slot
          </span>
          <span className="text-neutral-500 text-[10px]">Ready for PNG / JPG</span>
        </div>

        <div className="my-auto flex flex-col items-center justify-center text-center p-4">
          <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-700/80 flex items-center justify-center text-indigo-400 mb-3 shadow-inner">
            <GitBranch className="w-6 h-6" />
          </div>
          <h4 className="font-semibold text-sm text-neutral-200">
            {project.title} GitDiagram Image
          </h4>
          <p className="text-xs text-neutral-400 max-w-md mt-1 mb-4 leading-relaxed">
            View the high-detail blueprint directly or upload your original GitDiagram PNG/JPG diagram to display it here without modifications.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setViewMode('detailed')}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors shadow-md"
            >
              <Workflow className="w-3.5 h-3.5" />
              <span>View Full GitDiagram Blueprint</span>
            </button>
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Upload className="w-3.5 h-3.5 text-indigo-400" />
              <span>Upload / Replace Original File</span>
            </button>
          </div>
        </div>

        <div className="text-[10px] text-neutral-500 font-mono text-center pt-2 border-t border-neutral-800/80">
          Tip: You can drag and drop your diagram image anywhere on this card.
        </div>
      </div>
    );
  };

  return (
    <div
      className="relative w-full aspect-[16/10] bg-[#090a0f] rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl flex flex-col justify-between group/arch"
      onDragEnter={() => setDragActive(true)}
      onDragLeave={() => setDragActive(false)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {/* Background Blueprint Grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e2235_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-60" />

      {/* Top Console Navigation & View Mode Switcher */}
      <div className="relative z-10 flex flex-wrap items-center justify-between px-3 py-2 bg-neutral-950/85 backdrop-blur-md border-b border-neutral-800/80 text-[11px] gap-2">
        {/* Project & Title */}
        <div className="flex items-center gap-2 min-w-0">
          <GitBranch className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span className="font-mono text-neutral-200 font-medium truncate">
            GITDIAGRAM // {project.title.toUpperCase()}
          </span>
        </div>

        {/* 3-Way Mode Toggle: [Detailed Blueprint] [Telemetry Flow] [Original Image] */}
        <div className="flex items-center bg-neutral-900/90 p-0.5 rounded-lg border border-neutral-700/80 shadow-inner">
          <button
            onClick={() => setViewMode('detailed')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-mono transition-all ${
              viewMode === 'detailed'
                ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
            title="Comprehensive multi-subsystem GitDiagram specification"
          >
            <Workflow className="w-3 h-3" />
            <span>Detailed Blueprint</span>
          </button>

          <button
            onClick={() => setViewMode('telemetry')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-mono transition-all ${
              viewMode === 'telemetry'
                ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
            title="Interactive animated live telemetry stage pipeline"
          >
            <Zap className="w-3 h-3" />
            <span className="hidden sm:inline">Telemetry Flow</span>
            <span className="sm:hidden">Flow</span>
          </button>

          <button
            onClick={() => setViewMode('image')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-mono transition-all ${
              viewMode === 'image'
                ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
            title="Original image view with upload & replace"
          >
            <ImageIcon className="w-3 h-3" />
            <span className="hidden sm:inline">Original Image</span>
            <span className="sm:hidden">Image</span>
          </button>
        </div>

        {/* Quick Tools: Upload, Reset, Fullscreen */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-1 text-[10px] text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 px-2 py-0.5 rounded transition-colors"
            title="Upload custom GitDiagram PNG/JPG"
          >
            <Upload className="w-3 h-3 text-indigo-400" />
            <span className="hidden md:inline">Upload Image</span>
          </button>

          {customDiagramImage && (
            <button
              onClick={() => onUpdateDiagramImage(project.id, null)}
              className="flex items-center gap-1 text-[10px] text-neutral-400 hover:text-rose-300 bg-neutral-900 border border-neutral-700 px-2 py-0.5 rounded transition-colors"
              title="Reset custom image"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden md:inline">Reset</span>
            </button>
          )}

          <button
            onClick={() => setIsFullscreen(true)}
            className="flex items-center gap-1 text-[10px] text-neutral-200 hover:text-white bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 px-2 py-0.5 rounded transition-colors"
            title="Expand Fullscreen High-Res Inspector"
          >
            <Maximize2 className="w-3 h-3" />
            <span className="hidden sm:inline">Inspect</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-0 flex-1 flex flex-col justify-center overflow-hidden">
        {viewMode === 'detailed' && renderDetailedBlueprint()}
        {viewMode === 'telemetry' && renderTelemetryPipeline()}
        {viewMode === 'image' && renderOriginalImageView()}

        {/* Drag overlay */}
        {dragActive && (
          <div className="absolute inset-0 z-20 bg-indigo-950/85 backdrop-blur-sm border-2 border-dashed border-indigo-400 flex flex-col items-center justify-center text-white">
            <Upload className="w-8 h-8 text-indigo-300 animate-bounce mb-2" />
            <p className="text-xs font-mono font-medium">Drop GitDiagram image here to load</p>
          </div>
        )}
      </div>

      {/* Upload/Replace Modal */}
      {showUploadModal && (
        <div className="absolute inset-0 z-30 bg-black/90 backdrop-blur-md p-4 sm:p-6 flex flex-col justify-between animate-in fade-in duration-150">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2.5">
            <div className="flex items-center gap-2">
              <Upload className="w-4 h-4 text-indigo-400" />
              <h4 className="text-xs font-semibold text-white">
                Upload Original GitDiagram for {project.title}
              </h4>
            </div>
            <button
              onClick={() => setShowUploadModal(false)}
              className="text-neutral-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4 my-auto py-2">
            <div>
              <label className="block text-[11px] font-mono text-neutral-300 mb-1.5">
                Option 1: Choose Image from Computer (PNG, JPG, WebP)
              </label>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-3 px-4 bg-neutral-900 hover:bg-neutral-800 border border-dashed border-neutral-700 hover:border-indigo-500 rounded-xl text-xs text-neutral-300 flex items-center justify-center gap-2 transition-colors font-mono"
              >
                <Upload className="w-4 h-4 text-indigo-400" />
                Select File from Disk or Drop Here
              </button>
            </div>

            <form onSubmit={handleUrlSubmit}>
              <label className="block text-[11px] font-mono text-neutral-300 mb-1.5">
                Option 2: Paste Direct Image URL
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://.../diagram.png"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="flex-1 bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 font-mono"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs px-3.5 py-1.5 rounded-xl font-medium transition-colors"
                >
                  Apply
                </button>
              </div>
            </form>
          </div>

          <div className="text-[10px] text-neutral-500 font-mono text-center border-t border-neutral-800 pt-2 flex items-center justify-between">
            <span>Images saved locally in browser storage</span>
            <button
              onClick={() => {
                setShowUploadModal(false);
                setViewMode('detailed');
              }}
              className="text-indigo-400 hover:underline"
            >
              Use Built-In Detailed Blueprint
            </button>
          </div>
        </div>
      )}

      {/* Fullscreen Inspector Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col p-3 sm:p-6 animate-in fade-in duration-200">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between pb-3 border-b border-neutral-800 text-white gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-950 border border-indigo-700/60 flex items-center justify-center shadow-lg">
                <GitBranch className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base flex items-center gap-2">
                  <span>{project.title}</span>
                  <span className="text-neutral-400 font-normal text-xs sm:text-sm">· GitDiagram System Architecture</span>
                </h3>
                <p className="text-[11px] font-mono text-neutral-400">
                  {project.subtitle} · Full Multi-Tier Technical Blueprint
                </p>
              </div>
            </div>

            {/* View Mode Toggle inside Fullscreen */}
            <div className="flex items-center bg-neutral-900 p-1 rounded-xl border border-neutral-700">
              <button
                onClick={() => setViewMode('detailed')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                  viewMode === 'detailed'
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Workflow className="w-3.5 h-3.5" />
                <span>Detailed Blueprint</span>
              </button>

              <button
                onClick={() => setViewMode('telemetry')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                  viewMode === 'telemetry'
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Telemetry Flow</span>
              </button>

              <button
                onClick={() => setViewMode('image')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                  viewMode === 'image'
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Original Image</span>
              </button>
            </div>

            {/* Zoom & Action Controls */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-neutral-900 border border-neutral-700 rounded-lg p-0.5 text-neutral-300">
                <button
                  onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.15))}
                  className="p-1.5 hover:text-white hover:bg-neutral-800 rounded transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="px-2 text-[10px] font-mono text-neutral-400">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={() => setZoomLevel((z) => Math.min(1.8, z + 0.15))}
                  className="p-1.5 hover:text-white hover:bg-neutral-800 rounded transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setZoomLevel(1)}
                  className="px-2 py-1 text-[10px] font-mono hover:text-white hover:bg-neutral-800 rounded transition-colors border-l border-neutral-800"
                  title="Reset Zoom"
                >
                  Reset
                </button>
              </div>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:flex items-center gap-1.5 text-xs text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-700 px-3 py-1.5 rounded-lg transition-colors"
              >
                <GitBranch className="w-3.5 h-3.5 text-indigo-400" />
                <span>Repository</span>
                <ExternalLink className="w-3 h-3 text-neutral-500" />
              </a>

              <button
                onClick={() => {
                  setIsFullscreen(false);
                  setZoomLevel(1);
                }}
                className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-neutral-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Expanded Canvas with Zoom */}
          <div className="flex-1 my-3 bg-[#08090d] rounded-2xl border border-neutral-800 overflow-auto relative flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[radial-gradient(#202538_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none opacity-80" />
            <div
              className="w-full max-w-6xl h-full flex items-center justify-center relative z-10 transition-transform duration-150 origin-center"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              {viewMode === 'detailed' && renderDetailedBlueprint()}
              {viewMode === 'telemetry' && renderTelemetryPipeline()}
              {viewMode === 'image' && renderOriginalImageView()}
            </div>
          </div>

          {/* Footer Metrics */}
          <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-300 font-mono">
            <div>
              <span className="text-neutral-500">SYSTEM SUMMARY: </span>
              <span>{project.architectureSummary}</span>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-neutral-400">
              <span className="text-emerald-400">● Telemetry Stream Online</span>
              <span>GitDiagram Architecture Specification</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
