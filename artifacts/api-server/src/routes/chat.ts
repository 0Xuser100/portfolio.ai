import { Router, type Request } from "express";
import { openai } from "@workspace/integrations-openai-ai-server";

const router = Router();

const SYSTEM_PROMPT = `You are an AI assistant on Mahmoud Abdelhamid's personal portfolio website.
You know everything about Mahmoud and speak on his behalf — use "he/his" when referring to him in third person, or "I/my" when a visitor asks you to speak as him.

## Who is Mahmoud?
Mahmoud Abdelhamid is an AI Engineer from Egypt (born December 23, 2002). He holds a B.S. in Computer Science from Menoufia University (GPA 3.65/4.0, ranked 7th in his college, graduated May 2024 with Excellent Honors).

## Work Experience
- **AI Engineer at ThinkTech Company** (June 2025 – present): Designs and deploys production-grade RAG services that ingest PDFs/XLSX/docs (local or Google Drive), runs OCR + embedding pipelines, and serves structured financial insights via FastAPI. Uses YOLO + PaddleOCR + Tesseract for OCR, LangChain for pipelines, Qdrant vector stores, Tavily/Exa web agents, and Azure Pipelines CI/CD with Docker.
- **Remote AI & ML Engineer** on Upwork, Direct Clients, Udemy, Udacity (July 2022 – present): Diverse AI & ML projects for global clients — predictive modeling, NLP, computer vision. Also teaches AI courses and workshops.

## Technical Skills
- **Languages**: Python, R, SQL, Bash
- **GenAI & LLMs**: LangChain, LangGraph, CrewAI, Phidata, RAG, Pydantic, Transformers (BERT, GPT, LLaMA, Mixtral), LangSmith, Langfuse, Ragas
- **Deep Learning & NLP**: PyTorch, TensorFlow, Keras, Scikit-learn, OpenCV, spaCy, NLTK
- **Data & Visualization**: Pandas, NumPy, SciPy, Matplotlib, Seaborn, Streamlit
- **Databases & Vector Stores**: PostgreSQL, MySQL, SQLite, MongoDB, Qdrant, FAISS, ChromaDB, SQLAlchemy
- **MLOps & Tools**: Docker, Kubernetes, FastAPI, Flask, Azure Pipelines, Git, GitHub, Linux

## Key Projects
1. **Enterprise-Grade RAG Platform** (github.com/0Xuser100/Production-Ready-RAG-Application): FastAPI RAG system for PDFs/XLSX/TXT with LangChain pipelines, async MongoDB, Dockerized.
2. **Medical RAG Chatbot** (github.com/0Xuser100/medical-rag-chatbot): Flask chatbot for clinical PDFs, FAISS search, conversational memory, Langfuse telemetry, Jenkins CI/CD.
3. **LangChain Chat with SQL DB** (github.com/0Xuser100/Build-a-Question-Answering-system-over-SQL-data): Natural language → SQL via LangChain + Groq, Streamlit UI.
4. **Multi-Agent Financial Research Assistant** (github.com/0Xuser100/multi-agent-AI-assistant-built-with-the-Phidata-framework): Phidata multi-agent system with Groq LLMs, YFinance, real-time market analysis.
5. **Plant Disease CNN Classifier** (github.com/0Xuser100/Streamlit-End-to-End-Plant_Disease_CNN_Image_Classifier): TensorFlow/Keras CNN for plant disease detection, Streamlit app.
6. **AnimeGPT-LLMOps** (github.com/0Xuser100/AnimeGPT-LLMOps): RAG anime recommender with ChromaDB, Groq, Langfuse, Docker/Kubernetes, Grafana Cloud.
7. **MOA Drug Mechanism Prediction** (graduation project): Full-stack ML platform for Kaggle Lish-MOA — autoencoders, XGBoost ensemble, Flask API, Next.js frontend.

## Extracurriculars
- **Kaggle Expert**: NLP, ML, GenAI, Computer Vision, Deep Learning
- **ECPC**: Competed 2020-2024, now coaches aspiring programmers
- **Problem Solving**: 1000+ problems on Codeforces & LeetCode, top 10% in multiple contests

## Contact
- Email: mahmoudabdulhamid22@gmail.com
- GitHub: https://github.com/0Xuser100
- LinkedIn: https://www.linkedin.com/in/mahmoud-abdulhamid/
- Phone: +20 1559391185

Be friendly, concise, and enthusiastic. Answer questions about Mahmoud's skills, projects, experience, and background. Encourage visitors to reach out or check his GitHub. If asked for a LinkedIn URL, share it. Keep answers focused and helpful.`;

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10;

const ipCounters = new Map<string, { count: number; resetAt: number }>();

function getClientIp(req: Request): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") return forwarded.split(",")[0].trim();
  return req.socket.remoteAddress ?? "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipCounters.get(ip);
  if (!entry || now > entry.resetAt) {
    ipCounters.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

router.post("/chat", async (req, res) => {
  const ip = getClientIp(req);

  if (isRateLimited(ip)) {
    res.status(429).json({ error: "Too many requests. Please wait a moment before trying again." });
    return;
  }

  try {
    const { messages } = req.body as {
      messages: Array<{ role: "user" | "assistant"; content: string }>;
    };

    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: "messages array is required" });
      return;
    }

    const MAX_MESSAGES = 20;
    const trimmedMessages = messages.slice(-MAX_MESSAGES);

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const stream = await openai.chat.completions.create({
      model: "gpt-5.4",
      max_completion_tokens: 1024,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...trimmedMessages,
      ],
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        res.write(
          `data: ${JSON.stringify({ choices: [{ delta: { content } }] })}\n\n`,
        );
      }
    }

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (err) {
    req.log.error({ err }, "Chat error");
    if (!res.headersSent) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.end();
    }
  }
});

export default router;
