import About from "@/components/portfolio/About";
import Chatbot from "@/components/portfolio/Chatbot";
import Contact from "@/components/portfolio/Contact";
import Hero from "@/components/portfolio/Hero";
import Navbar from "@/components/portfolio/Navbar";
import Projects from "@/components/portfolio/Projects";
import Skills from "@/components/portfolio/Skills";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Chatbot />
    </div>
  );
};

export default Index;
