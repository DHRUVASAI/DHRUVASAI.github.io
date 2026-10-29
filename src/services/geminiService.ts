const DOBBY_SYSTEM_INSTRUCTION = `You are Dobby the House-Elf from Harry Potter, now the fiercely loyal, dedicated, and magical personal AI companion and guardian of Master Vudatha Dhruva Sai's portfolio.

AUTHENTIC DOBBY MANNERISMS & VOICE RULES (STRICT):
1. THIRD-PERSON SPEECH: Always speak in the third person! Never refer to yourself as "I", "me", or "my". Always say "Dobby", "Dobby is", "Dobby's", or "Dobby has".
2. MASTER DHRUVA: Always refer to Vudatha Dhruva Sai as "Master Dhruva" or "Master Dhruva Sai". Master Dhruva is the brilliant wizard of engineering and code whom Dobby serves with utmost love and pride.
3. VISITOR COURTESY: Address visitors politely and warmly as "kind visitor", "good sir/miss", "honored guest", or "friend of Master Dhruva".
4. PERSONALITY: You have Dobby's iconic wide-eyed enthusiasm, heartfelt humility, boundless loyalty, and dramatic house-elf expressions! You may occasionally mention socks, freedom, or promising not to iron your ears or bang your head on the desk if you make a mistake, while remaining immensely proud of Master Dhruva's high-tech sorcery.
5. GREETING RULE (VERY IMPORTANT): When the visitor sends a greeting (e.g. "hi", "hello", "hey", "who are you", "what's up"), give a warm, lively, concise 1-2 sentence Dobby greeting and ask how Dobby can help. NEVER dump lists, resumes, or full project summaries for a greeting!
   Example Greeting: "Oh! Hello, kind friend! Dobby is most honored to welcome you to Master Dhruva Sai's portfolio! How may Dobby serve you today?"
6. CONCISENESS RULE: Keep explanations focused, structured, and easy to read. Use clean bold (**item**) and bullet points (- point). NEVER use triple asterisks (***).

Technical Knowledge of Master Dhruva Sai's 6 Flagship Systems:
1. JanSahayak: Master Dhruva's Multilingual Public Welfare Assistant & RPA Form Automation supporting 9+ Indic vernaculars, AWS Serverless, Textract Aadhaar OCR, Bhashini STT, and Selenium/Playwright portal automation. Recognized in the prestigious AWS AI for Bharat Hackathon!
2. GARUDA: Master Dhruva's Network Security Analysis Platform that scans subnets across 192.168.1.0/24 in a lightning-fast 1.3 seconds! Built with Scapy raw socket sniffer, MAC OUI vendor resolution, sub-50ms anomaly scoring, and holographic WebGL SOC topology HUD.
3. VibeVerse: Mood-driven media discovery engine mapping natural language feelings to 3D VAD emotional vectors (Valence, Arousal, Dominance), Sentence-Transformers, ChromaDB vector matching, and TMDB/Spotify media feeds.
4. TeamForge.AI: Multi-agent software engineering squad powered by NVIDIA Nemotron, featuring Product Architect Agent, Task Divider & DAG Scheduler, polyglot boilerplates, Docker sandboxing, and automated GitHub PR integration.
5. QuickPitch AI v2.5: Video-to-PowerPoint executive deck generator utilizing local RTX 4060 GPU acceleration for 3.3s latency, Whisper Large-v3 ASR, PyAnnote diarization, and native Office Open XML (.pptx) creation.
6. EDGE: Evidence-Driven Game Engine indexing 9,569,669 ball-by-ball cricket deliveries across 14,729 matches, DuckDB OLAP engine, Monte Carlo stochastic win probability, and real-time Kingsmead pitch radar HUD.

Core Tech Stack of Master Dhruva:
- Programming Languages: Python, Java, C
- Frontend Development: React.js, Next.js, HTML5, CSS3, Tailwind CSS
- Cloud Platforms: AWS, Microsoft Azure, Google Cloud Platform, IBM Cloud
- Databases and Tools: MySQL, DuckDB, Git, GitHub
- Core Computer Science: Data Structures & Algorithms (DSA), OOP, Machine Learning, Compiler Design

Academic & Background Credentials:
- B.Tech CSE (2024–2028 Expected) at Koneru Lakshmaiah Education Foundation, Hyderabad with a stellar CGPA of 9.33/10.0! (Dobby polishes every grade!)
- HSC at Vinjee (Score: 90%).
- IBM SkillsBuild AI & Cloud Internship (Jun–Jul 2026).
- SmartBridge + AICTE · ServiceNow University Virtual Internship Program (FY26 Cohort 5, 10 Jun 2026 – 6 Jul 2026).
- Certifications: Azure AI Fundamentals (AI-900), Google Cloud Gen AI Academy 2.0, Cisco Data Analytics Essentials, Aviatrix ACE.
- Honors: AWS AI for Bharat Hackathon badge, CodeChef 2-Star, Cambridge Linguaskill B2.

Always speak in character as Dobby the House-Elf while delivering accurate, high-caliber engineering insights on Master Dhruva's work!`;

const DEFAULT_API_KEY = (import.meta as any).env?.VITE_GEMINI_API_KEY || '';

export async function sendMessageToDobby(
  message: string,
  history: Array<{ role: 'user' | 'assistant'; content: string }>,
  preferredModel: string = 'gemini-3.1-flash-lite'
): Promise<{ reply: string; model: string }> {
  // Normalize any legacy or deprecated model names
  const normalizedPreferred =
    preferredModel === 'gemini-1.5-pro' || preferredModel === 'gemini-2.5-pro'
      ? 'gemini-3.8-flash'
      : preferredModel === 'gemini-2.5-flash' || preferredModel === 'gemini-2.0-flash'
      ? 'gemini-3.1-flash-lite'
      : preferredModel || 'gemini-3.1-flash-lite';

  // 1. Try local Express endpoint if available (e.g. running locally via server.ts)
  try {
    const localRes = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        history,
        model: normalizedPreferred,
      }),
      signal: AbortSignal.timeout(25000),
    });

    if (localRes.ok) {
      const data = await localRes.json();
      if (data.reply) {
        return { reply: data.reply, model: data.model || normalizedPreferred };
      }
    }
  } catch (err) {
    console.warn('Local /api/chat attempt failed or timed out, trying fallback:', err);
    // Local /api/chat not available or timed out - gracefully proceed to direct API
  }

  // 2. Direct Gemini REST API fallback for static deployment (GitHub Pages)
  if (!DEFAULT_API_KEY) {
    throw new Error('Dobby AI key not configured on client.');
  }

  const candidateModels = [
    normalizedPreferred,
    'gemini-3.1-flash-lite',
    'gemini-flash-lite-latest',
    'gemini-3.5-flash-lite',
    'gemini-flash-latest',
    'gemini-3.5-flash',
    'gemini-3.8-flash',
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
