import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  X,
  RotateCcw,
  User,
  Loader2,
  Copy,
  Check,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { sendMessageToDobby } from '../services/geminiService';
import { DobbyAvatar, DobbyState } from './DobbyAvatar';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  modelUsed?: string;
}

const SUGGESTED_PROMPTS = [
  'Dobby, explain Master Dhruva\'s JanSahayak AWS stack',
  'How does GARUDA catch network intruders in 1.3s?',
  'Tell Dobby about Master Dhruva\'s 9.33 CGPA & awards',
  'Which technologies are in Master Dhruva\'s core stack?',
  'How does TeamForge.AI coordinate the agent squad?'
];

const renderInlineMarkdown = (text: string): React.ReactNode => {
  const tokenRegex = /(`[^`]+`|\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|\*[^*]+\*)/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, i) => {
    if (!part) return null;
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return (
        <code
          key={i}
          className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 font-mono text-[11px] text-emerald-600 dark:text-emerald-400"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith('***') && part.endsWith('***') && part.length > 6) {
      return (
        <strong key={i} className="font-semibold italic">
          {part.slice(3, -3)}
        </strong>
      );
    }
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return (
        <strong key={i} className="font-semibold text-neutral-950 dark:text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return (
        <em key={i} className="italic text-neutral-800 dark:text-neutral-200">
          {part.slice(1, -1)}
        </em>
      );
    }
    const cleanedText = part.replace(/\*\*\*/g, '');
    return <span key={i}>{cleanedText}</span>;
  });
};

const renderFormattedContent = (content: string) => {
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

    const lines = part.split('\n');
    return (
      <span key={index} className="break-words [overflow-wrap:anywhere]">
        {lines.map((line, lineIdx) => {
          const trimmed = line.trimStart();
          const isBullet = trimmed.startsWith('- ') || trimmed.startsWith('* ');
          const bulletContent = isBullet ? trimmed.slice(2) : line;

          return (
            <React.Fragment key={lineIdx}>
              {lineIdx > 0 && <br />}
              {isBullet ? (
                <span className="inline-flex items-start gap-1.5 pl-1 my-0.5">
                  <span className="text-emerald-500 font-bold leading-tight">•</span>
                  <span>{renderInlineMarkdown(bulletContent)}</span>
                </span>
              ) : (
                renderInlineMarkdown(bulletContent)
              )}
            </React.Fragment>
          );
        })}
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
        content: `👋 *Oh, hello kind visitor!* Dobby is most honored to welcome you to **Master Dhruva Sai's** portfolio!

Master Dhruva is the greatest wizard of engineering and code, yes he is! Dobby is guarding Master's 6 flagship creations (**JanSahayak, GARUDA, TeamForge.AI, EDGE, QuickPitch, VibeVerse**), his **9.33 CGPA** at KL University, and his core stack (**Python, Java, Cloud, DSA**)!

What may Dobby fetch or explain for you today? Ask Dobby anything, and Dobby shall answer with all his heart!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: 'gemini-flash-latest'
      }
    ];
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel] = useState('gemini-3.1-flash-lite');
  const [dobbyMood, setDobbyMood] = useState<DobbyState>('idle');
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
    setDobbyMood('working');

    try {
      const historyForApi = messages
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({
          role: m.role,
          content: m.content
        }));

      const data = await sendMessageToDobby(text, historyForApi, selectedModel);

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'Dobby is so sorry! Dobby received an empty whisper from the magic orb. Please ask Dobby again!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: data.model || selectedModel
      };

      setMessages((prev) => [...prev, botMessage]);
      setDobbyMood('celebrating');
      setTimeout(() => setDobbyMood('idle'), 3500);
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: `⚠️ *Dobby gasps!* Dobby had trouble reaching the magic network: ${err.message || 'Could not connect to Gemini service.'}\n\nPlease try asking Dobby again, or try switching models above!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMessage]);
      setDobbyMood('idle');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: `*Dobby has cleared the parchment!* Dobby is ready to serve you again! What would you like to know about Master Dhruva Sai's software systems or background?`,
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
      {/* Floating Toggle Launcher Button with Interactive Dobby Avatar */}
      <div className="fixed bottom-5 right-5 z-40 select-none">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-2.5 pl-2.5 pr-4 py-2 rounded-full bg-neutral-950/90 hover:bg-neutral-900 text-white dark:bg-neutral-900/95 dark:hover:bg-black dark:text-white shadow-[0_12px_36px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-all duration-300 hover:scale-105 border border-white/20 cursor-pointer ring-1 ring-emerald-500/30 hover:ring-emerald-400/70"
            title="Chat with Dobby (Master Dhruva's Personal Assistant)"
          >
            {/* Live Green Beacon */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>

            {/* Interactive Dobby Avatar (Tracks Cursor Realtime) */}
            <DobbyAvatar
              size="sm"
              isSpeaking={false}
              interactive={true}
              showStatusDot={false}
              className="pointer-events-none"
            />

            <div className="flex items-center gap-2">
              <span className="font-semibold text-xs sm:text-sm tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                Ask Dobby
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 dark:bg-white/15 text-neutral-300 border border-white/10 hidden sm:inline">
                Personal Assistant
              </span>
            </div>
          </button>
        )}
      </div>

      {/* Slide-out / Drawer Chat Modal */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 shadow-[0_25px_60px_rgba(0,0,0,0.5)] flex flex-col min-h-0 overflow-hidden bg-white dark:bg-[#0E1017] border border-neutral-300 dark:border-white/15 ${
            isExpanded
              ? 'inset-3 sm:inset-10 rounded-2xl sm:rounded-3xl'
              : 'bottom-3 right-3 left-3 sm:left-auto sm:bottom-6 sm:right-6 sm:w-[450px] h-[560px] sm:h-[620px] max-h-[calc(100dvh-24px)] sm:max-h-[86vh] rounded-2xl sm:rounded-3xl'
          }`}
        >
          {/* Header with Interactive Dobby Portrait */}
          <div className="px-4 py-3 bg-neutral-100/90 dark:bg-[#131620]/95 backdrop-blur-md border-b border-neutral-200 dark:border-white/10 flex items-center justify-between text-neutral-900 dark:text-white shrink-0">
            <div className="flex items-center gap-3">
              <DobbyAvatar
                size="md"
                state={dobbyMood}
                isLoading={isLoading}
                interactive={true}
                showStatusDot={true}
                shape="circle"
                statusPosition="bottom-right"
                title="Click Dobby to see him celebrate! 🧦"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-xs sm:text-sm text-neutral-950 dark:text-white flex items-center gap-1.5">
                    <span>Dobby</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                      House-Elf AI
                    </span>
                  </h3>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-mono text-neutral-500 dark:text-neutral-400">
                  {isLoading ? (
                    <span className="text-emerald-500 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      Dobby is crafting an answer...
                    </span>
                  ) : dobbyMood === 'celebrating' ? (
                    <span className="text-amber-500 dark:text-amber-400 font-semibold flex items-center gap-1">
                      <span>🎉</span>
                      Dobby found the answer!
                    </span>
                  ) : (
                    <span>Master Dhruva's Assistant</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Reset History */}
              <button
                onClick={handleResetChat}
                className="p-1.5 rounded-lg hover:bg-neutral-200 dark:hover:bg-white/10 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                title="Reset conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              {/* Expand/Collapse */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded-lg hover:bg-neutral-200 dark:hover:bg-white/10 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors hidden sm:inline-flex"
                title={isExpanded ? 'Collapse' : 'Expand'}
              >
                {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>

              {/* Close */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-neutral-200 dark:hover:bg-white/10 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
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
                  <DobbyAvatar
                    size="xs"
                    isSpeaking={false}
                    interactive={true}
                    showStatusDot={false}
                    className="shrink-0 mt-0.5"
                  />
                )}

                <div
                  className={`min-w-0 max-w-[85%] sm:max-w-[82%] rounded-2xl p-3 sm:p-3.5 relative group overflow-hidden ${
                    msg.role === 'user'
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-normal rounded-tr-xs shadow-sm'
                      : 'bg-neutral-100 dark:bg-[#151824] text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-white/10 rounded-tl-xs shadow-sm'
                  }`}
                >
                  <div className="whitespace-pre-wrap break-words [overflow-wrap:anywhere] leading-relaxed select-text font-sans">
                    {renderFormattedContent(msg.content)}
                  </div>

                  <div className="flex items-center justify-between gap-3 mt-2 pt-1 border-t border-black/5 dark:border-white/5 text-[10px] text-neutral-400 font-mono">
                    <span>{msg.timestamp}</span>
                    {msg.role === 'assistant' && (
                      <div className="flex items-center gap-2">
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

            {/* Dobby Active Thinking & Speaking State */}
            {isLoading && (
              <div className="flex gap-2.5 justify-start animate-in fade-in">
                <DobbyAvatar
                  size="sm"
                  isSpeaking={true}
                  isLoading={true}
                  interactive={true}
                  showStatusDot={true}
                  className="shrink-0 mt-0.5"
                />
                <div className="bg-neutral-100 dark:bg-[#151824] rounded-2xl rounded-tl-xs p-3.5 text-xs text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-white/10 shadow-sm flex flex-col gap-1.5 max-w-[85%]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400 font-mono text-[11px]">
                      Dobby is answering...
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 italic font-serif">
                    "Dobby is gathering Master Dhruva's scrolls and engineering blueprints..."
                  </p>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div className="px-3.5 py-2 border-t border-neutral-200 dark:border-white/10 bg-neutral-50/80 dark:bg-[#11131c] overflow-x-auto flex items-center gap-1.5 scrollbar-none shrink-0 max-w-full">
            <span className="text-[10px] font-mono text-neutral-400 uppercase shrink-0">Ask:</span>
            {SUGGESTED_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                disabled={isLoading}
                className="text-[11px] px-2.5 py-1 rounded-full bg-white dark:bg-white/5 hover:bg-neutral-200 dark:hover:bg-white/10 border border-neutral-200 dark:border-white/10 text-neutral-700 dark:text-neutral-300 whitespace-nowrap transition-colors shrink-0 cursor-pointer"
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
            className="p-3 bg-white dark:bg-[#0E1017] border-t border-neutral-200 dark:border-white/10 flex items-center gap-2 shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Dobby about Master Dhruva's systems, code, or background..."
              disabled={isLoading}
              className="min-w-0 flex-1 bg-neutral-100 dark:bg-[#161823] border border-neutral-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-emerald-500 transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2.5 rounded-xl bg-neutral-950 hover:bg-black text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-neutral-950 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shrink-0 cursor-pointer"
              title="Send to Dobby"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
