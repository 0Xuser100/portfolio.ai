import { ArrowUpRight, Github } from "lucide-react";

type Project = {
  title: string;
  description: string;
  tags: string[];
  accent: "primary" | "accent" | "secondary";
  link?: string;
  repo?: string;
};

const projects: Project[] = [
  {
    title: "RAG Knowledge Assistant",
    description:
      "A retrieval-augmented chatbot over 50k+ internal documents. Hybrid search, citations, and streaming responses.",
    tags: ["Python", "LangChain", "pgvector", "FastAPI"],
    accent: "primary",
  },
  {
    title: "Real-time Fraud Detection",
    description:
      "Streaming ML pipeline scoring transactions in <100ms. Reduced false positives by 38% with feature store + XGBoost.",
    tags: ["Kafka", "Spark", "XGBoost", "AWS"],
    accent: "accent",
  },
  {
    title: "Forecasting Platform",
    description:
      "Multi-tenant time-series forecasting service. Trains 200+ models nightly with backtesting and drift alerts.",
    tags: ["Prophet", "Airflow", "dbt", "Snowflake"],
    accent: "secondary",
  },
  {
    title: "Vision QC for Manufacturing",
    description:
      "Defect detection on factory line cameras. Custom CNN + active learning loop reaching 99.2% recall.",
    tags: ["PyTorch", "OpenCV", "Triton", "GCP"],
    accent: "primary",
  },
  {
    title: "Analytics Dashboard Suite",
    description:
      "End-to-end analytics for a B2B SaaS — from event ingestion to executive dashboards used by 300+ users daily.",
    tags: ["dbt", "BigQuery", "Looker", "TypeScript"],
    accent: "accent",
  },
  {
    title: "LLM Eval Harness",
    description:
      "Open-source toolkit for evaluating LLM outputs with rubric-based scoring, regression tests, and dashboards.",
    tags: ["Python", "Pydantic", "Streamlit"],
    accent: "secondary",
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
            A few things I've built recently. Ask the assistant in the corner for the deep dive.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <article
              key={p.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40"
            >
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
                      href={p.link ?? "#"}
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
