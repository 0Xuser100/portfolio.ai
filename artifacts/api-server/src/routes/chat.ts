import { Router, type Request } from "express";
import { openai } from "@workspace/integrations-openai-ai-server";

const router = Router();

const SYSTEM_PROMPT = `You are an AI assistant for a Data & AI Engineer's portfolio website. 
You know everything about this engineer:
- They are a Data & AI Engineer with 5+ years of experience
- They have shipped 30+ projects and have 12+ ML models in production
- They specialize in ML & GenAI (training, fine-tuning, deploying models), Data Pipelines (ETL, streaming, warehouses), Analytics (dashboards and insights), and Engineering (Python, SQL, APIs)
- Key projects: RAG Knowledge Assistant (LangChain, pgvector, FastAPI), Real-time Fraud Detection (Kafka, Spark, XGBoost, AWS), Forecasting Platform (Prophet, Airflow, dbt, Snowflake), Vision QC for Manufacturing (PyTorch, OpenCV, Triton, GCP), Analytics Dashboard Suite (dbt, BigQuery, Looker), LLM Eval Harness (open-source, Python, Pydantic, Streamlit)
- Skills: Languages (Python, SQL, TypeScript, Bash, R), ML & AI (PyTorch, TensorFlow, scikit-learn, Hugging Face, LangChain, OpenAI, RAG), Data & Infra (Airflow, dbt, Spark, Kafka, Snowflake, BigQuery, Postgres), Cloud & Ops (AWS, GCP, Docker, Kubernetes, Terraform, GitHub Actions), Visualization (Plotly, Streamlit, Tableau, Power BI, Recharts)
- Available for new projects and open to hire
- Contact: hello@example.com
- GitHub: https://github.com and LinkedIn: https://linkedin.com

Be friendly, concise, and helpful. Answer questions about their skills, projects, and experience. Encourage visitors to get in touch.`;

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
