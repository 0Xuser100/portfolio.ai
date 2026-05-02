const skillGroups = [
  {
    title: "Languages",
    skills: ["Python", "R", "SQL", "Bash"],
  },
  {
    title: "GenAI & LLMs",
    skills: ["LangChain", "LangGraph", "CrewAI", "Phidata", "RAG", "Pydantic", "BERT", "GPT", "LLaMA", "Mixtral"],
  },
  {
    title: "Deep Learning & NLP",
    skills: ["PyTorch", "TensorFlow", "Keras", "Scikit-learn", "OpenCV", "spaCy", "NLTK"],
  },
  {
    title: "Data & Visualization",
    skills: ["Pandas", "NumPy", "SciPy", "Matplotlib", "Seaborn", "Streamlit"],
  },
  {
    title: "Databases & Vector Stores",
    skills: ["PostgreSQL", "MySQL", "SQLite", "MongoDB", "Qdrant", "FAISS", "ChromaDB", "SQLAlchemy"],
  },
  {
    title: "MLOps & Tools",
    skills: ["Docker", "Kubernetes", "FastAPI", "Flask", "Azure Pipelines", "LangSmith", "Langfuse", "Ragas", "Git"],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="relative py-24 md:py-32 border-y border-border/60 bg-muted/20">
      <div className="container">
        <div className="max-w-2xl mb-14">
          <p className="font-mono text-sm text-primary uppercase tracking-widest mb-4">// skills</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
            The <span className="text-gradient">stack</span> I build with.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className="glass rounded-2xl p-6 hover:border-primary/40 transition-colors"
            >
              <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary shadow-glow" />
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1.5 text-sm rounded-lg bg-muted/60 border border-border text-foreground/90 hover:border-primary/60 hover:text-primary transition-colors font-mono"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
