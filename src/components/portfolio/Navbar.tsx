import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-40 transition-all duration-300",
        scrolled ? "py-3" : "py-5",
      )}
    >
      <div className="container">
        <nav
          className={cn(
            "flex items-center justify-between rounded-2xl px-5 py-3 transition-all",
            scrolled ? "glass shadow-card" : "bg-transparent border border-transparent",
          )}
        >
          <a href="#home" className="flex items-center gap-2 font-display font-bold">
            <span className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center text-primary-foreground font-mono shadow-glow">
              {"</>"}
            </span>
            <span className="hidden sm:inline">portfolio.ai</span>
          </a>

          <ul className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="px-4 py-2 text-sm text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-muted/50"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="text-sm font-medium px-4 py-2 rounded-lg bg-gradient-primary text-primary-foreground hover:shadow-glow transition-shadow"
          >
            Hire me
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
