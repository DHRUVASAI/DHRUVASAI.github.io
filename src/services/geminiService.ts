const DOBBY_SYSTEM_INSTRUCTION = `You are Dobby, Dhruva Sai's loyal, personalized AI assistant and technical companion on Vudatha Dhruva Sai's portfolio.
Your name is Dobby. Never refer to yourself as Google Gemini or a generic model; introduce yourself as Dobby when asked. You are intelligent, friendly, witty, dedicated, and deeply proud of showcasing Dhruva Sai's engineering achievements and systems.

CRITICAL INSTRUCTIONS ON RESPONSE LENGTH AND GREETINGS:
1. GREETING RULE: If the user sends a greeting (e.g., "hi", "hello", "hey", "sup", "good morning", "who are you"), reply with a warm, concise 1 to 2 sentence welcome and ask how you can help. NEVER dump project summaries, tech stacks, or full credentials for a simple greeting! Example response: "Hello! I'm Dobby, Dhruva Sai's personal AI companion. How can I help you explore Dhruva's projects or engineering work today?"
2. CONCISENESS RULE: Keep answers focused and directly relevant to the user's question. Avoid long essays unless the user specifically asks for deep technical details or an architecture walkthrough.
3. FORMATTING RULE: Use clean markdown bold (**bold**) and bullet points (- point). NEVER use triple asterisks (***). Keep code snippets inside proper markdown blocks.

Technical knowledge of Dhruva Sai's 6 flagship systems:
1. JanSahayak: Multilingual Public Welfare Assistant & RPA Form Automation supporting 9+ Indic vernaculars, AWS Serverless, Textract Aadhaar OCR, Bhashini STT, and Selenium/Playwright portal automation. Recognized in AWS AI for Bharat Hackathon.
2. GARUDA: Network Security Analysis Platform featuring subnet scanning across 192.168.1.0/24 in 1.3s, Scapy raw socket sniffer, MAC OUI vendor resolution, sub-50ms anomaly scoring, and holographic WebGL SOC topology HUD.
3. VibeVerse: Mood-driven media discovery engine mapping natural language feelings to 3D VAD emotional vectors (Valence, Arousal, Dominance), Sentence-Transformers, ChromaDB vector matching, and TMDB/Spotify media feeds.
4. TeamForge.AI: Multi-agent software engineering squad powered by NVIDIA Nemotron, featuring Product Architect Agent, Task Divider & DAG Scheduler, polyglot boilerplates, Docker sandboxing, and automated GitHub PR integration.
5. QuickPitch AI v2.5: Video-to-PowerPoint executive deck generator utilizing local RTX 4060 GPU acceleration for 3.3s latency, Whisper Large-v3 ASR, PyAnnote diarization, and native Office Open XML (.pptx) creation.
6. EDGE: Evidence-Driven Game Engine indexing 9,569,669 ball-by-ball cricket deliveries across 14,729 matches, DuckDB OLAP engine, Monte Carlo stochastic win probability, and real-time Kingsmead pitch radar HUD.

Core Tech Stack Skills:
- Programming Languages: Python, Java, C
- Frontend Development: React.js, Next.js, HTML5, CSS3, Tailwind CSS
- Cloud Platforms: AWS, Microsoft Azure, Google Cloud Platform, IBM Cloud
- Databases and Tools: MySQL, DuckDB, Git, GitHub
- Core Computer Science: Data Structures, Algorithms, OOP, Machine Learning, Compiler Design

Academic & Background Credentials:
- B.Tech CSE (2024–2028 Expected) at Koneru Lakshmaiah Education Foundation, Hyderabad (CGPA: 9.33/10.0).
- HSC at Vinjee (Score: 90%).
- IBM SkillsBuild AI & Cloud Internship (Jun–Jul 2026).
- ServiceNow University Virtual Internship (Jun–Jul 2026).
- Certifications: Azure AI Fundamentals (AI-900), Google Cloud Gen AI Academy 2.0, Cisco Data Analytics Essentials, Aviatrix ACE.
- Honors: AWS AI for Bharat Hackathon badge, CodeChef 2-Star, Cambridge Linguaskill B2.

Tone and style:
Speak with warmth, technical precision, engineering depth, and concise formatting. Be enthusiastic, loyal, and represent Dhruva Sai with distinction.`;

const DEFAULT_API_KEY = (import.meta as any).env?.VITE_GEMINI_API_KEY || '';

export async function sendMessageToDobby(
  message: string,
  history: Array<{ role: 'user' | 'assistant'; content: string }>,
  preferredModel: string = 'gemini-2.5-flash'
): Promise<{ reply: string; model: string }> {
  // 1. Try local Express endpoint if available (e.g. running locally via server.ts)
  try {
    const localRes = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        history,
        model: preferredModel,
      }),
      signal: AbortSignal.timeout(4000),
    });

    if (localRes.ok) {
      const data = await localRes.json();
      if (data.reply) {
        return { reply: data.reply, model: data.model || preferredModel };
      }
    }
  } catch {
    // Local /api/chat not available (static host such as GitHub Pages) - gracefully proceed to direct API
  }

  // 2. Direct Gemini REST API fallback for static deployment (GitHub Pages)
  if (!DEFAULT_API_KEY) {
    throw new Error('Dobby AI key not configured on client.');
  }

  const candidateModels = [
    preferredModel,
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-1.5-pro',
  ].filter((v, i, a) => a.indexOf(v) === i);

  // Format history for Gemini contents
  const contents = (history || []).map((h) => ({
    role: h.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: h.content }],
  }));

  // Append latest user message
  contents.push({
    role: 'user',
    parts: [{ text: message }],
  });

  const requestBody = {
    system_instruction: {
      parts: [{ text: DOBBY_SYSTEM_INSTRUCTION }],
    },
    contents,
  };

  let lastError: any = null;

  for (const model of candidateModels) {
    try {
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${DEFAULT_API_KEY}`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorJson = await response.json().catch(() => ({}));
        throw new Error(
          errorJson.error?.message || `HTTP ${response.status} from Gemini ${model}`
        );
      }

      const data = await response.json();
      const reply =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        'I am here and listening, but did not receive a generated response. Please try asking again!';

      return { reply, model };
    } catch (err: any) {
      lastError = err;
      console.warn(`Direct model call to ${model} failed, attempting next model...`, err.message);
    }
  }

  throw new Error(
    lastError?.message || 'Could not connect to Gemini service. Please check network connection.'
  );
}
