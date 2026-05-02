import { Github, Linkedin, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"
        aria-hidden
      />
      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center glass rounded-3xl p-10 md:p-16 shadow-elevated">
          <p className="font-mono text-sm text-primary uppercase tracking-widest mb-4">// contact</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6">
            Let's build something <span className="text-gradient">smart</span>.
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
            Have a project in mind, a role to fill, or just want to chat about AI and LLMs? My
            inbox is open — or ask my AI assistant first.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Button asChild variant="hero" size="xl">
              <a href="mailto:mahmoudabdulhamid22@gmail.com">
                <Mail className="h-5 w-5" />
                mahmoudabdulhamid22@gmail.com
              </a>
            </Button>
            <Button variant="outlineGlow" size="xl" onClick={() => window.dispatchEvent(new Event("open-chatbot"))}>
              <MessageSquare className="h-5 w-5" />
              Ask the AI
            </Button>
          </div>

          <div className="flex items-center justify-center gap-4 text-muted-foreground">
            <a
              href="https://github.com/0Xuser100"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="p-3 rounded-xl border border-border hover:border-primary hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/mahmoud-abdulhamid-052244230/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="p-3 rounded-xl border border-border hover:border-primary hover:text-primary transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-12 font-mono">
          © {new Date().getFullYear()} Mahmoud Abdelhamid — Built with passion &amp; a lot of coffee.
        </p>
      </div>
    </section>
  );
};

export default Contact;
