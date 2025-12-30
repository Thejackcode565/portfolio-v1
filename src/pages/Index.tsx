import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BootingScreen from "@/components/BootingScreen";

const Index = () => {
  const [isBooting, setIsBooting] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isBooting && (
          <BootingScreen onComplete={() => setIsBooting(false)} />
        )}
      </AnimatePresence>

      {!isBooting && (
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
