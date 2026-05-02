import { Brain, Code2, Database, LineChart } from "lucide-react";

const stats = [
  { value: "5+", label: "Years experience" },
  { value: "30+", label: "Projects shipped" },
  { value: "12+", label: "ML models in production" },
];

const highlights = [
  { icon: Brain, title: "ML & GenAI", desc: "Training, fine-tuning, and deploying models." },
  { icon: Database, title: "Data Pipelines", desc: "Reliable ETL, streaming, and warehouses." },
  { icon: LineChart, title: "Analytics", desc: "Dashboards and insights people actually use." },
  { icon: Code2, title: "Engineering", desc: "Production-grade Python, SQL, and APIs." },
];

const About = () => {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="font-mono text-sm text-primary uppercase tracking-widest mb-4">// about</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Turning raw data into <span className="text-gradient">products that think</span>.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              I work at the intersection of data engineering and applied AI. From batch pipelines
              to real-time inference, from classical ML to LLM-powered apps — I build systems that
              are fast, observable, and easy to evolve.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              When I'm not shipping models, I'm probably reading papers, tinkering with embeddings,
              or arguing about schema design.
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
