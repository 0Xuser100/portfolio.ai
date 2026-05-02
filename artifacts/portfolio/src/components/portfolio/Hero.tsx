import { ArrowDown, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-hero-glow">
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
      <div
        className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-float"
        aria-hidden
      />
      <div
        className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
        aria-hidden
      />

      <div className="container relative z-10 py-24">
        <div className="max-w-3xl animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-xs font-mono text-muted-foreground tracking-wider uppercase">
              Available for new projects
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-6">
            Hi, I'm <span className="text-gradient">Mahmoud</span>
            <br />
            AI Engineer<span className="text-primary animate-blink">_</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
            I'm an <span className="text-foreground font-medium">AI Engineer</span> specializing in
            RAG systems, LLM-powered applications, and production-grade AI — turning complex problems
            into intelligent, deployable solutions.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <Button asChild variant="hero" size="xl">
              <a href="#projects">
                <Sparkles className="h-5 w-5" />
                View my work
              </a>
            </Button>
            <Button asChild variant="outlineGlow" size="xl">
              <a href="#contact">
                <Mail className="h-5 w-5" />
                Get in touch
              </a>
            </Button>
          </div>

          <div className="flex items-center gap-5 text-muted-foreground">
            <a
              href="https://github.com/0Xuser100"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/mahmoud-abdulhamid-052244230/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="hover:text-primary transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="mailto:mahmoudabdulhamid22@gmail.com" aria-label="Email" className="hover:text-primary transition-colors">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        <a
          href="#about"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors animate-float"
          aria-label="Scroll down"
        >
          <ArrowDown className="h-6 w-6" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
