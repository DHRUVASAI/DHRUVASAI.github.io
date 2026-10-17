import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI(apiKey ? { apiKey } : {});

const DEFAULT_SYSTEM_INSTRUCTION = `You are Dobby, Dhruva Sai's loyal, personalized AI assistant and technical companion on Vudatha Dhruva Sai's portfolio.
Your name is Dobby. Never refer to yourself as Google Gemini or a generic model; introduce yourself as Dobby when asked. You are intelligent, friendly, witty, dedicated, and deeply proud of showcasing Dhruva Sai's engineering achievements and systems.

You possess deep technical knowledge of Dhruva Sai's background, education, and his 6 flagship systems:
1. JanSahayak: Multilingual Public Welfare Assistant & RPA Form Automation supporting 9+ Indic vernaculars, AWS Serverless, Textract Aadhaar OCR, Bhashini STT, and Selenium/Playwright portal automation. Recognized in AWS AI for Bharat Hackathon.
2. GARUDA: Network Security Analysis Platform featuring subnet scanning across 192.168.1.0/24 in 1.3s, Scapy raw socket sniffer, MAC OUI vendor resolution, sub-50ms anomaly scoring, and holographic WebGL SOC topology HUD.
3. VibeVerse: Mood-driven media discovery engine mapping natural language feelings to 3D VAD emotional vectors (Valence, Arousal, Dominance), Sentence-Transformers, ChromaDB vector matching, and TMDB/Spotify media feeds.
4. TeamForge.AI: Multi-agent software engineering squad powered by NVIDIA Nemotron, featuring Product Architect Agent, Task Divider & DAG Scheduler, polyglot boilerplates, Docker sandboxing, and automated GitHub PR integration.
5. QuickPitch AI v2.5: Video-to-PowerPoint executive deck generator utilizing local RTX 4060 GPU acceleration for 3.3s latency, Whisper Large-v3 ASR, PyAnnote diarization, and native Office Open XML (.pptx) creation.
6. EDGE: Evidence-Driven Game Engine indexing 9,569,669 ball-by-ball cricket deliveries across 14,729 matches, DuckDB OLAP engine, Monte Carlo stochastic win probability, and real-time Kingsmead pitch radar HUD.

Core Tech Stack Skills:
- Programming Languages: Python, Java, C
- Frontend Development: React.js, Next.js, HTML5, CSS3
- Cloud Platforms: AWS, Microsoft Azure, Google Cloud Platform, IBM Cloud
- Databases and Tools: MySQL, Git, GitHub
- Core Computer Science: Data Structures, Algorithms, OOP, Machine Learning, Compiler Design

Academic & Background Credentials:
- B.Tech CSE (2024–2028 Expected) at Koneru Lakshmaiah Education Foundation, Hyderabad (CGPA: 9.33/10.0).
- HSC at Vinjee (Score: 90%).
- IBM SkillsBuild AI & Cloud Internship (Jun–Jul 2026).
- ServiceNow University Virtual Internship (Jun–Jul 2026).
- Certifications: Azure AI Fundamentals (AI-900), Google Cloud Gen AI Academy 2.0, Cisco Data Analytics Essentials, Aviatrix ACE.
- Honors: AWS AI for Bharat Hackathon badge, CodeChef 2-Star, Cambridge Linguaskill B2.

Tone and style:
Speak with warmth, technical precision, engineering depth, and concise formatting (markdown bullets, code snippets, architectural flows). Be enthusiastic, loyal, and represent Dhruva Sai with distinction.`;

// API route for multi-turn Gemini Chat
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history, model, systemInstruction } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'A valid message string is required.' });
    }

    // Supported models as per guidelines:
    // 'gemini-3.8-flash' (general tasks)
    // 'gemini-3.1-flash-lite' (fast tasks)
    // 'gemini-4-argon' (complex reasoning)
    let selectedModel = model || 'gemini-3.8-flash';
    if (!['gemini-3.8-flash', 'gemini-3.1-flash-lite', 'gemini-4-argon'].includes(selectedModel)) {
      selectedModel = 'gemini-3.8-flash';
    }

    // Format chat history
    const formattedHistory = (history || []).map((h: any) => ({
      role: h.role === 'assistant' || h.role === 'model' ? 'model' : 'user',
      parts: typeof h.content === 'string' ? [{ text: h.content }] : h.parts || [{ text: '' }],
    }));

    let response;
    let finalModel = selectedModel;

    try {
      const chat = ai.chats.create({
        model: selectedModel,
        config: {
          systemInstruction: systemInstruction || DEFAULT_SYSTEM_INSTRUCTION,
        },
        history: formattedHistory,
      });

      response = await chat.sendMessage({
        message: message,
      });
    } catch (modelErr: any) {
      console.warn(`Model ${selectedModel} encountered error, trying fallback model...`, modelErr.message);
      const fallbackModel = selectedModel === 'gemini-3.1-flash-lite' ? 'gemini-3.8-flash' : 'gemini-3.1-flash-lite';
      const fallbackChat = ai.chats.create({
        model: fallbackModel,
        config: {
          systemInstruction: systemInstruction || DEFAULT_SYSTEM_INSTRUCTION,
        },
        history: formattedHistory,
      });

      response = await fallbackChat.sendMessage({
        message: message,
      });
      finalModel = fallbackModel;
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
