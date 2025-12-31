import { useState, useEffect, useCallback } from "react";
import { Sparkles } from "lucide-react";

const facts = [
  { text: "Did you know? The first computer bug was an actual insect!", emoji: "🐛" },
  { text: "Hello, I'm Hareesh Ragavendra, and I love coding!", emoji: "👋" },
  { text: "Fun fact: The first computer weighed over 30 tons!", emoji: "💻" },
  { text: "Tech Fact: The first website ever created is still online today!", emoji: "🌐" },
  { text: "Did you know? There are over 700 programming languages!", emoji: "🚀" },
];

interface IntroScreenProps {
  onComplete: () => void;
}

const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  const handleComplete = useCallback(() => {
    onComplete();
  }, [onComplete]);

  // Progress through facts
  useEffect(() => {
    if (currentFactIndex < facts.length) {
      const timer = setTimeout(() => {
        setCurrentFactIndex(prev => prev + 1);
      }, 2500);
      return () => clearTimeout(timer);
    } else {
      // All facts shown, start exit
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(handleComplete, 500);
      }, 1000);
      return () => clearTimeout(exitTimer);
    }
  }, [currentFactIndex, handleComplete]);

  const progress = ((currentFactIndex) / facts.length) * 100;

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black transition-opacity duration-500 ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Subtle animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[150px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: "1s" }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 max-w-2xl mx-auto text-center min-h-[200px]">
        {/* Logo/Icon */}
        <div className="mb-8">
          <Sparkles className="w-12 h-12 text-primary animate-pulse" />
        </div>

        {/* Facts display */}
        <div className="min-h-[120px] flex items-center justify-center">
          {currentFactIndex < facts.length ? (
            <div 
              key={currentFactIndex}
              className="animate-fact-in"
            >
              <span className="text-4xl mb-4 block">{facts[currentFactIndex].emoji}</span>
              <p className="text-white text-xl md:text-2xl font-light leading-relaxed">
                {facts[currentFactIndex].text}
              </p>
            </div>
          ) : (
            <div className="animate-fact-in">
              <p className="text-primary text-2xl font-medium">Let's begin...</p>
            </div>
          )}
        </div>

        {/* Fact counter */}
        <div className="mt-8 text-white/40 text-sm font-mono">
          {currentFactIndex < facts.length ? (
            <span>{currentFactIndex + 1} / {facts.length}</span>
          ) : (
            <span>Ready</span>
          )}
        </div>
      </div>

      {/* Progress bar at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
        <div
          className="h-full bg-gradient-to-r from-primary to-purple-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Skip button */}
      <button
        onClick={() => {
          setIsExiting(true);
          setTimeout(handleComplete, 500);
        }}
        className="absolute bottom-8 right-8 text-white/30 hover:text-white/60 text-sm font-mono transition-colors duration-200"
      >
        Skip →
      </button>
    </div>
  );
};

export default IntroScreen;
