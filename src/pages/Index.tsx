import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BootingScreen from "@/components/BootingScreen";
import IntroScreen from "@/components/IntroScreen";

type ScreenPhase = "intro" | "booting" | "main";

const Index = () => {
  const [phase, setPhase] = useState<ScreenPhase>("intro");
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  // Check if first visit using localStorage
  useEffect(() => {
    const hasVisited = localStorage.getItem("portfolio_visited");
    if (hasVisited) {
      setIsFirstVisit(false);
      setPhase("booting"); // Skip intro for returning visitors
    }
  }, []);

  const handleIntroComplete = () => {
    localStorage.setItem("portfolio_visited", "true");
    setPhase("booting");
  };

  const handleBootingComplete = () => {
    setPhase("main");
  };

  return (
    <>
      {/* Intro Screen - only on first visit */}
      {phase === "intro" && isFirstVisit && (
        <IntroScreen onComplete={handleIntroComplete} />
      )}

      {/* Booting Screen */}
      {phase === "booting" && (
        <BootingScreen onComplete={handleBootingComplete} />
      )}

      {/* Main Content */}
      {phase === "main" && (
        <div className="min-h-screen bg-background">
          <Navbar />
          <main>
            <Hero />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Index;
