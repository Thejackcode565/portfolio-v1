import { useState, useEffect, useCallback, useRef } from "react";
import { ArrowRight } from "lucide-react";

const allMotivationalQuotes = [
  "Code is poetry.",
  "Build something meaningful.",
  "Every line of code tells a story.",
  "Simplicity is the ultimate sophistication.",
  "Innovation distinguishes leaders.",
  "Think different. Code better.",
];

const getRandomQuotes = () => {
  const shuffled = [...allMotivationalQuotes].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
};

const fallbackFacts = [
  "The first computer programmer was Ada Lovelace in 1843.",
  "The first 1GB hard drive weighed 550 pounds.",
  "The first website is still online at info.cern.ch.",
];

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Good Morning";
  if (hour >= 12 && hour < 17) return "Good Afternoon";
  if (hour >= 17 && hour < 21) return "Good Evening";
  return "Good Night";
};

const getISTTime = () => {
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istTime = new Date(now.getTime() + (istOffset + now.getTimezoneOffset() * 60 * 1000));
  return istTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false });
};

type Phase = "askName" | "welcome" | "motivation" | "facts" | "ready" | "exit";

interface IntroScreenProps {
  onComplete: () => void;
}

const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  const [userName, setUserName] = useState("");
  const [phase, setPhase] = useState<Phase>("askName");
  const [fact, setFact] = useState("");
  const [currentTime, setCurrentTime] = useState(getISTTime());
  const [textVisible, setTextVisible] = useState(false);
  const [motivationIndex, setMotivationIndex] = useState(0);
  const [motivationalQuotes] = useState(getRandomQuotes);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleComplete = useCallback(() => onComplete(), [onComplete]);

  useEffect(() => {
    if (phase === "askName" && inputRef.current) inputRef.current.focus();
  }, [phase]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(getISTTime()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchFact = async () => {
      try {
        const res = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/random?language=en");
        if (res.ok) {
          const data = await res.json();
          if (data.text && data.text.length < 150) {
            setFact(data.text);
            return;
          }
        }
        setFact(fallbackFacts[Math.floor(Math.random() * fallbackFacts.length)]);
      } catch {
        setFact(fallbackFacts[Math.floor(Math.random() * fallbackFacts.length)]);
      }
    };
    fetchFact();
  }, []);

  const handleNameSubmit = () => {
    if (userName.trim()) {
      setPhase("welcome");
      setTextVisible(true);
    }
  };

  useEffect(() => {
    if (phase === "welcome") {
      const timer = setTimeout(() => {
        setTextVisible(false);
        setTimeout(() => { setPhase("motivation"); setTextVisible(true); }, 500);
      }, 2500);
      return () => clearTimeout(timer);
    }
    if (phase === "motivation") {
      const timer = setTimeout(() => {
        if (motivationIndex < motivationalQuotes.length - 1) {
          setTextVisible(false);
          setTimeout(() => { setMotivationIndex(prev => prev + 1); setTextVisible(true); }, 400);
        } else {
          setTextVisible(false);
          setTimeout(() => { setPhase("facts"); setTextVisible(true); }, 500);
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
    if (phase === "facts") {
      const timer = setTimeout(() => {
        setTextVisible(false);
        setTimeout(() => { setPhase("ready"); setTextVisible(true); }, 500);
      }, 3000);
      return () => clearTimeout(timer);
    }
    if (phase === "ready") {
      const timer = setTimeout(() => {
        setPhase("exit");
        setTimeout(handleComplete, 1000);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [phase, motivationIndex, motivationalQuotes.length, handleComplete]);

  return (
    <div className={`fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black transition-all duration-1000 ${
      phase === "exit" ? "opacity-0" : "opacity-100"
    }`}>
      {/* Minimal ambient light */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-3xl" />
      </div>

      {/* Time - Top */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2">
        <p className="text-white/40 text-4xl md:text-5xl font-extralight tracking-[0.2em] font-mono">
          {currentTime}
        </p>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 max-w-xl mx-auto text-center min-h-[300px]">
        
        {/* Ask Name */}
        {phase === "askName" && (
          <div className="animate-fade-in space-y-10">
            <div>
              <p className="text-white/30 text-xs uppercase tracking-[0.4em] mb-4">Welcome</p>
              <h2 className="text-white text-3xl md:text-5xl font-extralight tracking-wide">
                {getGreeting()}
              </h2>
            </div>
            
            <div className="space-y-6">
              <input
                ref={inputRef}
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleNameSubmit()}
                placeholder="Enter your name"
                className="w-72 md:w-96 bg-transparent border-b border-white/20 focus:border-white/60 text-white text-center text-2xl font-extralight py-4 outline-none transition-all placeholder:text-white/20"
              />
              
              <div>
                <button
                  onClick={handleNameSubmit}
                  disabled={!userName.trim()}
                  className={`group inline-flex items-center gap-3 text-sm uppercase tracking-[0.3em] transition-all duration-300 ${
                    userName.trim() 
                      ? "text-white/60 hover:text-white" 
                      : "text-white/20 cursor-not-allowed"
                  }`}
                >
                  <span>Continue</span>
                  <ArrowRight className={`w-4 h-4 transition-transform ${userName.trim() ? "group-hover:translate-x-1" : ""}`} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Welcome */}
        {phase === "welcome" && (
          <div className={`transition-all duration-700 ease-out ${textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <p className="text-white/30 text-xs uppercase tracking-[0.4em] mb-6">Hello</p>
            <h1 className="text-white text-4xl md:text-6xl font-extralight tracking-wide">
              {userName}
            </h1>
          </div>
        )}

        {/* Motivation */}
        {phase === "motivation" && (
          <div className={`transition-all duration-500 ease-out ${textVisible ? "opacity-100" : "opacity-0"}`}>
            <p className="text-white/50 text-xl md:text-2xl font-extralight tracking-wide leading-relaxed">
              {motivationalQuotes[motivationIndex]}
            </p>
          </div>
        )}

        {/* Facts */}
        {phase === "facts" && fact && (
          <div className={`transition-all duration-700 ease-out ${textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <p className="text-white/20 text-xs uppercase tracking-[0.4em] mb-6">Did you know</p>
            <p className="text-white/40 text-lg md:text-xl font-extralight leading-relaxed max-w-md">
              {fact}
            </p>
          </div>
        )}

        {/* Ready */}
        {phase === "ready" && (
          <div className={`transition-all duration-700 ease-out ${textVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
            <p className="text-white/20 text-xs uppercase tracking-[0.4em] mb-6">Ready</p>
            <h1 className="text-white text-3xl md:text-5xl font-extralight tracking-wide">
              Entering Portfolio
            </h1>
            <div className="mt-8 flex justify-center">
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            </div>
          </div>
        )}
      </div>

      {/* Skip - Bottom right */}
      {phase !== "askName" && phase !== "exit" && (
        <button
          onClick={() => { setPhase("exit"); setTimeout(handleComplete, 800); }}
          className="absolute bottom-8 right-8 text-white/20 hover:text-white/50 text-xs uppercase tracking-[0.3em] transition-colors"
        >
          Skip
        </button>
      )}

      {/* Bottom line */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-8 h-[1px] bg-white/10" />
      </div>
    </div>
  );
};

export default IntroScreen;
