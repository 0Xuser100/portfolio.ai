import { Brain, Code2, Database, Trophy } from "lucide-react";

const stats = [
  { value: "3+", label: "Years of experience" },
  { value: "40+", label: "GitHub repositories" },
  { value: "1000+", label: "Problems solved" },
];

const highlights = [
  { icon: Brain, title: "RAG & LLMs", desc: "Production RAG pipelines, LangChain, LangGraph, multi-agent systems, and LLM APIs." },
  { icon: Database, title: "Data Engineering", desc: "ETL pipelines, vector stores (Qdrant, FAISS, ChromaDB), SQL & NoSQL databases." },
  { icon: Code2, title: "MLOps & APIs", desc: "FastAPI, Flask, Docker, CI/CD with Azure Pipelines and Kubernetes." },
  { icon: Trophy, title: "Competitive Edge", desc: "Kaggle Expert · 1000+ problems on Codeforces & LeetCode · ECPC coach." },
];

const About = () => {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="font-mono text-sm text-primary uppercase tracking-widest mb-4">// about</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Building AI that <span className="text-gradient">works in production</span>.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              I'm Mahmoud Abdelhamid — an AI Engineer at ThinkTech, where I design and deploy
              production-grade RAG services that ingest PDFs, run OCR pipelines, and serve
              structured insights via FastAPI. I combine deep ML knowledge with engineering
              discipline to ship systems that are reliable, observable, and easy to evolve.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              B.S. Computer Science from Menoufia University — GPA 3.65/4.0, ranked 7th in the
              college. When I'm not shipping models, I'm coaching competitive programmers,
              contributing to open-source, or tinkering with the latest LLM research.
            </p>

            <div className="grid grid-cols-3 gap-4 mt-10">
              {stats.map((s) => (
                <div key={s.label} className="glass rounded-xl p-5">
                  <div className="font-display text-3xl md:text-4xl font-bold text-gradient">
                    {s.value}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {highlights.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group glass rounded-2xl p-6 hover:border-primary/50 transition-all hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
