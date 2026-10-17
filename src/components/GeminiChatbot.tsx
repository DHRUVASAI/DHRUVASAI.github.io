import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  X,
  RotateCcw,
  Bot,
  User,
  ChevronDown,
  Loader2,
  Copy,
  Check,
  Cpu,
  Zap,
  Terminal,
  Maximize2,
  Minimize2,
  MessageSquare
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  modelUsed?: string;
}

const SUGGESTED_PROMPTS = [
  'Dobby, explain JanSahayak\'s RPA pipeline & AWS stack',
  'How does GARUDA detect network anomalies in 1.3s?',
  'What are Dhruva\'s verified CGPA & certifications?',
  'Which technologies are in Dhruva\'s core stack?',
  'How does TeamForge.AI coordinate the Nemotron agent swarm?'
];

const renderFormattedContent = (content: string) => {
  // Split on code blocks ```lang ... ```
  const parts = content.split(/(```[\s\S]*?```)/g);

  return parts.map((part, index) => {
    if (part.startsWith('```') && part.endsWith('```')) {
      const firstLineBreak = part.indexOf('\n');
      const lang = firstLineBreak !== -1 ? part.slice(3, firstLineBreak).trim() : '';
      const code = firstLineBreak !== -1 ? part.slice(firstLineBreak + 1, -3) : part.slice(3, -3);

      return (
        <div key={index} className="my-2 rounded-xl bg-neutral-950 text-neutral-100 border border-white/10 overflow-hidden max-w-full">
          {lang && (
            <div className="px-3 py-1 bg-white/5 border-b border-white/10 text-[10px] font-mono text-neutral-400 uppercase tracking-wider flex items-center justify-between">
              <span>{lang}</span>
            </div>
          )}
          <pre className="p-3 font-mono text-[11px] text-emerald-300 overflow-x-auto max-w-full whitespace-pre">
            <code>{code.trim()}</code>
          </pre>
        </div>
      );
    }

    return (
      <span key={index} className="break-words [overflow-wrap:anywhere]">
        {part}
      </span>
    );
  });
};

export const GeminiChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return [
      {
        id: 'welcome',
        role: 'assistant',
        content: `👋 Hi! I'm **Dobby**, Dhruva Sai's personalized AI assistant & companion!

I know all about Dhruva's flagship engineering projects (*EDGE, GARUDA, TeamForge, JanSahayak, QuickPitch, VibeVerse*), his core stack (Python, Java, React, Cloud, DSA), his 9.33 CGPA at KLEF, and his hackathon awards.

Ask me anything about Dhruva's technical systems, architecture blueprints, or background!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: 'gemini-3.8-flash'
      }
    ];
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<'gemini-3.8-flash' | 'gemini-3.1-flash-lite' | 'gemini-4-argon'>('gemini-3.8-flash');
  const [showModelPicker, setShowModelPicker] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || input.trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      // Build history excluding welcome and system messages
      const historyForApi = messages
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({
          role: m.role,
          content: m.content
        }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: historyForApi,
          model: selectedModel
        })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP ${res.status}: Failed to reach Gemini API`);
      }

      const data = await res.json();
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'I received an empty response. Please try asking again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: data.model || selectedModel
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: `⚠️ **Connection Note**: ${err.message || 'Could not connect to Gemini service.'}\n\nPlease try again or switch model.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: `Conversation reset. I'm Dobby! Ask me anything about Dhruva Sai's software systems, code, or engineering experience!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: selectedModel
      }
    ]);
  };

  const handleCopyMessage = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <>
      {/* Floating Toggle Launcher Button */}
      <div className="fixed bottom-5 right-5 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-neutral-900 hover:bg-black text-white dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-950 shadow-2xl transition-all duration-300 hover:scale-105 border border-black/10 dark:border-white/20"
            title="Chat with Dobby (Dhruva's Personal Assistant)"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <Bot className="w-4 h-4 text-indigo-400 dark:text-indigo-600 transition-transform group-hover:scale-110" />
            <span className="font-semibold text-xs sm:text-sm tracking-tight">Ask Dobby</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-800 dark:bg-neutral-200 text-neutral-300 dark:text-neutral-700 hidden sm:inline">
              Personal Assistant
            </span>
          </button>
        )}
      </div>

      {/* Slide-out / Drawer Chat Modal */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 shadow-2xl flex flex-col min-h-0 overflow-hidden bg-white dark:bg-[#111319] border border-neutral-300 dark:border-neutral-800 ${
            isExpanded
              ? 'inset-3 sm:inset-10 rounded-2xl sm:rounded-3xl'
              : 'bottom-3 right-3 left-3 sm:left-auto sm:bottom-6 sm:right-6 sm:w-[440px] h-[540px] sm:h-[600px] max-h-[calc(100dvh-24px)] sm:max-h-[85vh] rounded-2xl sm:rounded-3xl'
          }`}
        >
          {/* Header */}
          <div className="px-4 py-3 bg-neutral-100/90 dark:bg-neutral-900/90 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-neutral-900 dark:text-white shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-xs sm:text-sm flex items-center gap-1.5">
                  <span>Dobby</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </h3>
                <div className="flex items-center gap-1 text-[10px] font-mono text-neutral-500 dark:text-neutral-400">
                  <span>Dhruva's Personal Assistant</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Model Picker Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowModelPicker(!showModelPicker)}
                  className="flex items-center gap-1 text-[10px] font-mono px-2 py-1 rounded-lg bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors"
                  title="Switch Gemini Model"
                >
                  <Cpu className="w-3 h-3 text-indigo-500" />
                  <span className="hidden sm:inline">
                    {selectedModel === 'gemini-3.8-flash' && '3.8 Flash'}
                    {selectedModel === 'gemini-3.1-flash-lite' && '3.1 Lite'}
                    {selectedModel === 'gemini-4-argon' && '4 Argon'}
                  </span>
                  <ChevronDown className="w-3 h-3 opacity-60" />
                </button>

                {showModelPicker && (
                  <div className="absolute right-0 top-full mt-1.5 w-52 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xl p-1.5 z-50 text-[11px] font-mono">
                    <div className="px-2 py-1 text-[9px] text-neutral-400 uppercase font-semibold">
                      Select Gemini Model
                    </div>
                    <button
                      onClick={() => {
                        setSelectedModel('gemini-3.8-flash');
                        setShowModelPicker(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between ${
                        selectedModel === 'gemini-3.8-flash'
                          ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold'
                          : 'hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                      }`}
                    >
                      <div>
                        <div>gemini-3.8-flash</div>
                        <div className="text-[9px] font-sans text-neutral-400 font-normal">Recommended · General</div>
                      </div>
                      {selectedModel === 'gemini-3.8-flash' && <Check className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={() => {
                        setSelectedModel('gemini-3.1-flash-lite');
                        setShowModelPicker(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between mt-1 ${
                        selectedModel === 'gemini-3.1-flash-lite'
                          ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold'
                          : 'hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                      }`}
                    >
                      <div>
                        <div>gemini-3.1-flash-lite</div>
                        <div className="text-[9px] font-sans text-neutral-400 font-normal">Fast response latency</div>
                      </div>
                      {selectedModel === 'gemini-3.1-flash-lite' && <Check className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={() => {
                        setSelectedModel('gemini-4-argon');
                        setShowModelPicker(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between mt-1 ${
                        selectedModel === 'gemini-4-argon'
                          ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold'
                          : 'hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                      }`}
                    >
                      <div>
                        <div>gemini-4-argon</div>
                        <div className="text-[9px] font-sans text-neutral-400 font-normal">Complex architecture math</div>
                      </div>
                      {selectedModel === 'gemini-4-argon' && <Check className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                )}
              </div>

              {/* Reset History */}
              <button
                onClick={handleResetChat}
                className="p-1.5 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                title="Reset conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              {/* Expand/Collapse */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors hidden sm:inline-flex"
                title={isExpanded ? 'Collapse' : 'Expand'}
              >
                {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>

              {/* Close */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                title="Close chatbot"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Thread (Scrollable) */}
          <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-3.5 sm:p-4 space-y-3.5 text-xs sm:text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 max-w-full min-w-0 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-lg bg-indigo-600/10 dark:bg-indigo-900/40 border border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`min-w-0 max-w-[85%] sm:max-w-[82%] rounded-2xl p-3 sm:p-3.5 relative group overflow-hidden ${
                    msg.role === 'user'
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-normal rounded-tr-xs'
                      : 'bg-neutral-100 dark:bg-neutral-900/80 text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-800 rounded-tl-xs'
                  }`}
                >
                  <div className="whitespace-pre-wrap break-words [overflow-wrap:anywhere] leading-relaxed select-text font-sans">
                    {renderFormattedContent(msg.content)}
                  </div>

                  <div className="flex items-center justify-between gap-3 mt-2 pt-1 border-t border-black/5 dark:border-white/5 text-[10px] text-neutral-400 font-mono">
                    <span>{msg.timestamp}</span>
                    {msg.role === 'assistant' && (
                      <div className="flex items-center gap-2">
                        {msg.modelUsed && (
                          <span className="opacity-75">{msg.modelUsed}</span>
                        )}
                        <button
                          onClick={() => handleCopyMessage(msg.id, msg.content)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-neutral-700 dark:hover:text-white cursor-pointer"
                          title="Copy response"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3 h-3 text-emerald-500" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {msg.role === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-neutral-700 dark:text-neutral-300 shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 justify-start animate-in fade-in">
                <div className="w-7 h-7 rounded-lg bg-indigo-600/10 dark:bg-indigo-900/40 border border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                </div>
                <div className="bg-neutral-100 dark:bg-neutral-900/80 rounded-2xl rounded-tl-xs p-3 text-xs text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                  <span>Thinking with {selectedModel}...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div className="px-3.5 py-2 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-900/40 overflow-x-auto flex items-center gap-1.5 scrollbar-none shrink-0 max-w-full">
            <span className="text-[10px] font-mono text-neutral-400 uppercase shrink-0">Try:</span>
            {SUGGESTED_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                disabled={isLoading}
                className="text-[11px] px-2.5 py-1 rounded-full bg-white dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 whitespace-nowrap transition-colors shrink-0 cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white dark:bg-[#111319] border-t border-neutral-200 dark:border-neutral-800 flex items-center gap-2 shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Dobby about Dhruva's systems, code, or background..."
              disabled={isLoading}
              className="min-w-0 flex-1 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2.5 rounded-xl bg-neutral-900 hover:bg-black text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-neutral-950 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shrink-0 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
