import { ArrowUpRight, Github } from "lucide-react";

type Project = {
  title: string;
  description: string;
  tags: string[];
  accent: "primary" | "accent" | "secondary";
  link?: string;
  repo?: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    title: "OrionIntel",
    description:
      "Enterprise AI platform for document intelligence — analyzes company files, finance reports, and books via a production-grade RAG pipeline. FastAPI backend, OCR ingestion, vector search, and Dockerized deployment.",
    tags: ["Python", "FastAPI", "LangChain", "RAG", "Docker", "OpenAI"],
    accent: "primary",
    repo: "https://github.com/0Xuser100/OrionIntel",
    featured: true,
  },
  {
    title: "Baseera",
    description:
      "AI-powered insight platform built with Nuxt.js and deployed on Cloudflare Workers. Full-stack TypeScript application with server-side AI integrations and a modern, production-ready architecture.",
    tags: ["TypeScript", "Nuxt.js", "Cloudflare Workers", "AI"],
    accent: "accent",
    repo: "https://github.com/0Xuser100/Baseera",
  },
  {
    title: "MOA Drug Mechanism Prediction",
    description:
      "Graduation project — full-stack ML web app predicting drug mechanisms of action (Kaggle Lish-MOA). Gene expression + cell viability data fed into autoencoder deep learning and ensemble models, served via Flask API with a Next.js frontend.",
    tags: ["Python", "TensorFlow", "XGBoost", "Scikit-learn", "Flask", "Next.js"],
    accent: "secondary",
    repo: "https://github.com/0Xuser100/Mechanism-Of-Action-Graduation-Project-",
  },
  {
    title: "Enterprise-Grade RAG Platform",
    description:
      "FastAPI-based RAG system for ingesting and validating TXT/PDF/XLSX files. Modular LangChain pipelines for chunking, async MongoDB persistence, and Dockerized deployment with full Postman test coverage.",
    tags: ["Python", "FastAPI", "LangChain", "MongoDB", "Docker"],
    accent: "primary",
    repo: "https://github.com/0Xuser100/Production-Ready-RAG-Application",
  },
  {
    title: "Medical RAG Chatbot",
    description:
      "Flask-based chatbot for clinical PDFs using LangChain retrieval and FAISS search. Conversational memory, hallucination control, Langfuse telemetry, and a responsive UI — deployed with Docker and Jenkins CI/CD.",
    tags: ["Python", "Flask", "FAISS", "LangChain", "OpenAI", "Langfuse"],
    accent: "accent",
    repo: "https://github.com/0Xuser100/medical-rag-chatbot",
  },
  {
    title: "Multi-Agent Financial Research Assistant",
    description:
      "Phidata-based multi-agent system where Groq LLMs coordinate web and finance agents. Delivers Markdown-formatted insights with tables, live news context, and real-time market analysis via YFinance.",
    tags: ["Python", "Phidata", "Groq", "YFinance", "DuckDuckGo"],
    accent: "secondary",
    repo: "https://github.com/0Xuser100/multi-agent-AI-assistant-built-with-the-Phidata-framework",
  },
  {
    title: "LangChain Chat with SQL DB",
    description:
      "Natural language interface to any SQL database powered by LangChain and Groq Cloud. Users query in plain English — the system translates dynamically to SQL and returns structured results via Streamlit.",
    tags: ["Python", "Streamlit", "LangChain", "SQLAlchemy", "Groq"],
    accent: "primary",
    repo: "https://github.com/0Xuser100/Build-a-Question-Answering-system-over-SQL-data",
  },
  {
    title: "Plant Disease CNN Classifier",
    description:
      "CNN model detecting plant diseases from leaf images with high accuracy. Delivered as an interactive Streamlit app for farmers and researchers — trained on TensorFlow/Keras with end-to-end deployment.",
    tags: ["Python", "TensorFlow", "Keras", "CNN", "Streamlit"],
    accent: "accent",
    repo: "https://github.com/0Xuser100/Streamlit-End-to-End-Plant_Disease_CNN_Image_Classifier",
  },
  {
    title: "AnimeGPT-LLMOps",
    description:
      "Retrieval-augmented anime recommender using ChromaDB and Groq LLMs with a Streamlit UI. Features Langfuse observability, Docker/Kubernetes deployment, and Grafana Cloud monitoring for a complete LLMOps stack.",
    tags: ["Python", "LangChain", "ChromaDB", "Groq", "Docker", "Kubernetes", "Grafana"],
    accent: "secondary",
    repo: "https://github.com/0Xuser100/AnimeGPT-LLMOps",
  },
];

const accentMap = {
  primary: "from-primary/20 to-transparent group-hover:shadow-glow",
  accent: "from-accent/20 to-transparent group-hover:shadow-glow-accent",
  secondary: "from-secondary/30 to-transparent",
} as const;

const Projects = () => {
  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <p className="font-mono text-sm text-primary uppercase tracking-widest mb-4">
              // projects
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
              Selected <span className="text-gradient">work</span>.
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md">
            Real projects shipped for clients and personal research. Ask the AI assistant for the deep dive.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <article
              key={p.title}
              className={`group relative overflow-hidden rounded-2xl border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 ${
                p.featured ? "border-primary/40 shadow-glow lg:col-span-1" : "border-border"
              }`}
            >
              {p.featured && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="text-xs font-mono px-2 py-1 rounded-md bg-primary/20 border border-primary/40 text-primary">
                    Featured
                  </span>
                </div>
              )}
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accentMap[p.accent]} opacity-60 transition-opacity`}
                aria-hidden
              />
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-10 w-10 rounded-lg bg-gradient-primary/30 border border-primary/30 flex items-center justify-center font-mono text-sm text-primary">
                    {p.title
                      .split(" ")
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {p.repo && (
                      <a
                        href={p.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg border border-border hover:border-primary hover:text-primary transition-colors"
                        aria-label="Repository"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    <a
                      href={p.repo ?? "https://github.com/0Xuser100"}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg border border-border hover:border-primary hover:text-primary transition-colors"
                      aria-label="Open project"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {p.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  {p.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono px-2 py-1 rounded-md bg-muted/70 border border-border text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
