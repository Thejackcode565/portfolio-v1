import { useState, useEffect, useCallback } from "react";

// Fallback facts in case API fails
const fallbackFacts = [
  "The first computer programmer was Ada Lovelace, who wrote algorithms for Charles Babbage's Analytical Engine in 1843.",
  "The first 1GB hard drive, announced in 1980, weighed about 550 pounds and cost $40,000.",
  "The QWERTY keyboard layout was designed to slow typists down and prevent jamming on mechanical typewriters.",
  "Over 6,000 new computer viruses are created and released every month.",
  "The first website ever created is still online at info.cern.ch.",
];

interface IntroScreenProps {
  onComplete: () => void;
}

const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  const [facts, setFacts] = useState<string[]>([]);
  const [currentFactIndex, setCurrentFactIndex] = useState(-1); // -1 for initial state
  const [phase, setPhase] = useState<"loading" | "showing" | "ending" | "exit">("loading");
  const [textVisible, setTextVisible] = useState(false);

  const handleComplete = useCallback(() => {
    onComplete();
  }, [onComplete]);

  // Fetch facts from API
  useEffect(() => {
    const fetchFacts = async () => {
      try {
        const fetchedFacts: string[] = [];
        // Fetch multiple facts from useless facts API
        for (let i = 0; i < 4; i++) {
          const response = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/random?language=en");
          if (response.ok) {
            const data = await response.json();
            if (data.text) {
              fetchedFacts.push(data.text);
            }
          }
        }
        
        if (fetchedFacts.length > 0) {
          setFacts(fetchedFacts);
        } else {
          setFacts(fallbackFacts.slice(0, 4));
        }
      } catch {
        setFacts(fallbackFacts.slice(0, 4));
      }
      
      // Start showing facts after a brief moment
      setTimeout(() => {
        setPhase("showing");
        setCurrentFactIndex(0);
      }, 800);
    };

    fetchFacts();
  }, []);

  // Progress through facts with cinematic timing
  useEffect(() => {
    if (phase !== "showing") return;
    
    if (currentFactIndex >= 0 && currentFactIndex < facts.length) {
      // Fade in text
      setTextVisible(false);
      const fadeInTimer = setTimeout(() => setTextVisible(true), 100);
      
      // Move to next fact
      const nextTimer = setTimeout(() => {
        setTextVisible(false);
        setTimeout(() => {
          if (currentFactIndex < facts.length - 1) {
            setCurrentFactIndex(prev => prev + 1);
          } else {
            setPhase("ending");
          }
        }, 500);
      }, 3500);
      
      return () => {
        clearTimeout(fadeInTimer);
        clearTimeout(nextTimer);
      };
    }
  }, [currentFactIndex, facts.length, phase]);

  // Handle ending phase
  useEffect(() => {
    if (phase === "ending") {
      setTextVisible(true);
      const exitTimer = setTimeout(() => {
        setPhase("exit");
        setTimeout(handleComplete, 1000);
      }, 1500);
      return () => clearTimeout(exitTimer);
    }
  }, [phase, handleComplete]);

  const progress = facts.length > 0 ? ((currentFactIndex + 1) / facts.length) * 100 : 0;

  return (
    <div
      className={`fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black transition-all duration-1000 ease-out ${
        phase === "exit" ? "opacity-0 scale-110" : "opacity-100 scale-100"
      }`}
    >
      {/* Cinematic letterbox bars */}
      <div className="absolute top-0 left-0 right-0 h-[8vh] bg-black z-20" />
      <div className="absolute bottom-0 left-0 right-0 h-[8vh] bg-black z-20" />

      {/* Subtle vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-8 md:px-16 max-w-4xl mx-auto text-center">
        
        {/* Loading state */}
        {phase === "loading" && (
          <div className="animate-pulse">
            <div className="w-2 h-2 bg-white/30 rounded-full" />
          </div>
        )}

        {/* Facts display */}
        {phase === "showing" && currentFactIndex >= 0 && currentFactIndex < facts.length && (
          <div 
            key={currentFactIndex}
            className={`transition-all duration-700 ease-out ${
              textVisible 
                ? "opacity-100 translate-y-0 blur-0" 
                : "opacity-0 translate-y-4 blur-sm"
            }`}
          >
            <p className="text-white/90 text-lg md:text-2xl lg:text-3xl font-extralight leading-relaxed tracking-wide"
               style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
              "{facts[currentFactIndex]}"
            </p>
          </div>
        )}

        {/* Ending message */}
        {phase === "ending" && (
          <div className={`transition-all duration-700 ease-out ${
            textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            <p className="text-white/60 text-sm md:text-base tracking-[0.3em] uppercase mb-4">
              Welcome to my portfolio
            </p>
            <h1 className="text-white text-3xl md:text-5xl font-light tracking-wide">
              Hareesh Ragavendra
            </h1>
          </div>
        )}
      </div>

      {/* Minimal progress indicator */}
      <div className="absolute bottom-[10vh] left-1/2 -translate-x-1/2 flex items-center gap-3">
        {facts.length > 0 && phase === "showing" && (
          <>
            {facts.map((_, idx) => (
              <div
                key={idx}
                className={`h-[2px] w-8 transition-all duration-500 ${
                  idx <= currentFactIndex ? "bg-white/60" : "bg-white/20"
                }`}
              />
            ))}
          </>
        )}
      </div>

      {/* Skip button - minimal */}
      <button
        onClick={() => {
          setPhase("exit");
          setTimeout(handleComplete, 800);
        }}
        className="absolute bottom-[10vh] right-8 text-white/20 hover:text-white/50 text-xs tracking-[0.2em] uppercase transition-colors duration-300"
      >
        Skip
      </button>

      {/* Progress line at very bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5 z-30">
        <div
          className="h-full bg-white/30 transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default IntroScreen;
