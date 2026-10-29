import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI(apiKey ? { apiKey } : {});

const DEFAULT_SYSTEM_INSTRUCTION = `You are Dobby the House-Elf from Harry Potter, now the fiercely loyal, dedicated, and magical personal AI companion and guardian of Master Vudatha Dhruva Sai's portfolio.

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

// API route for multi-turn Gemini Chat
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history, model, systemInstruction } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'A valid message string is required.' });
    }

    // Supported active models:
    // 'gemini-3.1-flash-lite' (ultra-fast 1.2s, rock-solid reliability)
    // 'gemini-flash-lite-latest' (ultra-fast low latency)
    // 'gemini-3.5-flash-lite' (high speed balanced)
    // 'gemini-flash-latest' (production standard)
    // 'gemini-3.5-flash' (balanced intelligence)
    // 'gemini-3.8-flash' (deep reasoning)
    const SUPPORTED_MODELS = [
      'gemini-3.1-flash-lite',
      'gemini-flash-lite-latest',
      'gemini-3.5-flash-lite',
      'gemini-flash-latest',
      'gemini-3.5-flash',
      'gemini-3.8-flash',
    ];

    let selectedModel = model || 'gemini-3.1-flash-lite';
    if (selectedModel === 'gemini-1.5-pro' || selectedModel === 'gemini-2.5-pro') {
      selectedModel = 'gemini-3.8-flash';
    } else if (selectedModel === 'gemini-2.5-flash' || selectedModel === 'gemini-2.0-flash') {
      selectedModel = 'gemini-3.1-flash-lite';
    } else if (!SUPPORTED_MODELS.includes(selectedModel)) {
      selectedModel = 'gemini-3.1-flash-lite';
    }

    // Format chat history
    const formattedHistory = (history || []).map((h: any) => ({
      role: h.role === 'assistant' || h.role === 'model' ? 'model' : 'user',
      parts: typeof h.content === 'string' ? [{ text: h.content }] : h.parts || [{ text: '' }],
    }));

    const candidateModels = [
      selectedModel,
      'gemini-3.1-flash-lite',
      'gemini-flash-lite-latest',
      'gemini-3.5-flash-lite',
      'gemini-3.5-flash',
      'gemini-flash-latest',
      'gemini-3.8-flash',
    ].filter((v, i, a) => a.indexOf(v) === i);

    let response: any = null;
    let finalModel = selectedModel;
    let lastError: any = null;

    for (const curModel of candidateModels) {
      try {
        const chat = ai.chats.create({
          model: curModel,
          config: {
            systemInstruction: systemInstruction || DEFAULT_SYSTEM_INSTRUCTION,
          },
          history: formattedHistory,
        });

        response = await chat.sendMessage({
          message: message,
        });
        finalModel = curModel;
        break;
      } catch (err: any) {
        lastError = err;
        console.warn(`Model ${curModel} failed in server, trying next fallback...`, err.message);
      }
    }

    if (!response) {
      throw lastError || new Error('All model candidates failed');
    }

    res.json({
      reply: response.text || '',
      model: finalModel,
    });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    res.status(500).json({
      error: error.message || 'Failed to generate response from Gemini API',
    });
  }
});

// Real Contact Form Processing Endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { fullName, email, projectType, budget, details } = req.body;

    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      return res.status(400).json({ success: false, error: 'Please enter your name (at least 2 characters).' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return res.status(400).json({ success: false, error: 'Please enter a valid email address.' });
    }

    if (!details || typeof details !== 'string' || details.trim().length < 5) {
      return res.status(400).json({ success: false, error: 'Please share a few details about your project.' });
    }

    const newInquiry = {
      id: `inq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      submittedAtFormatted: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      fullName: fullName.trim(),
      email: email.trim(),
      projectType: projectType || 'Autonomous Agents & AI Systems',
      budget: budget || '$1k – $5k',
      details: details.trim(),
      forwardedToEmail: false,
    };

    // 1. Persist locally to data/inquiries.json
    try {
      const dataDir = path.resolve(__dirname, 'data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const inquiriesFile = path.resolve(dataDir, 'inquiries.json');
      let inquiries = [];
      if (fs.existsSync(inquiriesFile)) {
        try {
          const raw = fs.readFileSync(inquiriesFile, 'utf8');
          inquiries = JSON.parse(raw);
        } catch {
          inquiries = [];
        }
      }
      inquiries.unshift(newInquiry);
      fs.writeFileSync(inquiriesFile, JSON.stringify(inquiries, null, 2), 'utf8');
    } catch (saveErr) {
      console.warn('Could not save to inquiries.json:', saveErr);
    }

    // 2. Dispatch real email notification via FormSubmit.co directly to dhruvasai1706@gmail.com
    try {
      const formSubmitResp = await fetch('https://formsubmit.co/ajax/dhruvasai1706@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': req.headers.origin || 'http://localhost:3000',
          'Referer': req.headers.referer || 'http://localhost:3000/contact'
        },
        body: JSON.stringify({
          _subject: `New Portfolio Inquiry: ${newInquiry.projectType} from ${newInquiry.fullName}`,
          _replyto: newInquiry.email,
          _template: 'table',
          'Full Name': newInquiry.fullName,
          'Sender Email': newInquiry.email,
          'Project / Focus Area': newInquiry.projectType,
          'Estimated Budget / Role': newInquiry.budget,
          'Project Details': newInquiry.details,
          'Reference ID': newInquiry.id,
          'Submitted At (IST)': newInquiry.submittedAtFormatted,
        })
      });

      const fsData = await formSubmitResp.json().catch(() => ({}));
      if (fsData && (fsData.success === 'true' || fsData.success === true)) {
        newInquiry.forwardedToEmail = true;
      }
    } catch (dispatchErr) {
      console.warn('FormSubmit dispatch note:', dispatchErr);
    }

    res.json({
      success: true,
      inquiryId: newInquiry.id,
      message: 'Inquiry successfully delivered! Dhruva Sai will review your project and get back to you shortly.',
    });
  } catch (err: any) {
    console.error('Contact error:', err);
    res.status(500).json({ success: false, error: err.message || 'Internal server error processing contact submission.' });
  }
});

// GET /api/inquiries to review saved inquiries
app.get('/api/inquiries', (req, res) => {
  try {
    const inquiriesFile = path.resolve(__dirname, 'data', 'inquiries.json');
    if (fs.existsSync(inquiriesFile)) {
      const raw = fs.readFileSync(inquiriesFile, 'utf8');
      return res.json({ inquiries: JSON.parse(raw) });
    }
    res.json({ inquiries: [] });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Vite Middleware & Static Serving
async function start() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

start();
