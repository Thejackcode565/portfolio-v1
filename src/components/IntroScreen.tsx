import { useState, useEffect, useCallback, useRef } from "react";
import { ArrowRight } from "lucide-react";

const getPersonalizedQuotes = (name: string) => [
  `${name}, you are made of stardust and infinite possibilities.`,
  `The universe conspired to bring you here, ${name}.`,
  `${name}, your potential stretches beyond the galaxies.`,
  `Like stars, ${name}, you were born to shine.`,
  `${name}, explore the cosmos within you.`,
  `Every great journey begins with a single step, ${name}.`,
  `${name}, you are the author of your own constellation.`,
  `Dream beyond horizons, ${name}. The universe is listening.`,
];

const cosmicFacts = [
  "There are more stars in the universe than grains of sand on Earth.",
  "The Milky Way is on a collision course with Andromeda in 4 billion years.",
  "A day on Venus is longer than its year.",
  "Neutron stars can spin 600 times per second.",
  "The observable universe is 93 billion light-years in diameter.",
  "You are literally made of star matter - we are all cosmic beings.",
];

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Good Morning";
  if (hour >= 12 && hour < 17) return "Good Afternoon";
  if (hour >= 17 && hour < 21) return "Good Evening";
  return "Good Night";
};

type Phase = "askName" | "welcome" | "journey" | "motivation" | "cosmic" | "warp" | "exit";

interface IntroScreenProps {
  onComplete: () => void;
}

const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  const [userName, setUserName] = useState("");
  const [phase, setPhase] = useState<Phase>("askName");
  const [cosmicFact, setCosmicFact] = useState("");
  const [textVisible, setTextVisible] = useState(false);
  const [motivationIndex, setMotivationIndex] = useState(0);
  const [personalizedQuotes, setPersonalizedQuotes] = useState<string[]>([]);
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleComplete = useCallback(() => onComplete(), [onComplete]);

  // Generate stars on mount
  useEffect(() => {
    const generatedStars = Array.from({ length: 150 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 3,
    }));
    setStars(generatedStars);
    setCosmicFact(cosmicFacts[Math.floor(Math.random() * cosmicFacts.length)]);
  }, []);

  useEffect(() => {
    if (phase === "askName" && inputRef.current) inputRef.current.focus();
  }, [phase]);

  const handleNameSubmit = () => {
    if (userName.trim()) {
      const quotes = getPersonalizedQuotes(userName.trim());
      const shuffled = quotes.sort(() => Math.random() - 0.5).slice(0, 3);
      setPersonalizedQuotes(shuffled);
      setPhase("welcome");
      setTextVisible(true);
    }
  };

  useEffect(() => {
    if (phase === "welcome") {
      const timer = setTimeout(() => {
        setTextVisible(false);
        setTimeout(() => { setPhase("journey"); setTextVisible(true); }, 800);
      }, 2500);
      return () => clearTimeout(timer);
    }
    if (phase === "journey") {
      const timer = setTimeout(() => {
        setTextVisible(false);
        setTimeout(() => { setPhase("motivation"); setTextVisible(true); }, 800);
      }, 3000);
      return () => clearTimeout(timer);
    }
    if (phase === "motivation") {
      const timer = setTimeout(() => {
        if (motivationIndex < personalizedQuotes.length - 1) {
          setTextVisible(false);
          setTimeout(() => { setMotivationIndex(prev => prev + 1); setTextVisible(true); }, 600);
        } else {
          setTextVisible(false);
          setTimeout(() => { setPhase("cosmic"); setTextVisible(true); }, 800);
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
    if (phase === "cosmic") {
      const timer = setTimeout(() => {
        setTextVisible(false);
        setTimeout(() => { setPhase("warp"); setTextVisible(true); }, 800);
      }, 3500);
      return () => clearTimeout(timer);
    }
    if (phase === "warp") {
      const timer = setTimeout(() => {
        setPhase("exit");
        setTimeout(handleComplete, 1500);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [phase, motivationIndex, personalizedQuotes.length, handleComplete]);

  return (
    <div className={`fixed inset-0 z-[60] flex flex-col items-center justify-center overflow-hidden transition-all duration-1000 ${
      phase === "exit" ? "opacity-0" : "opacity-100"
    }`}>
      {/* Deep space background */}
      <div className="absolute inset-0 bg-black">
        {/* Nebula gradients */}
        <div className={`absolute inset-0 transition-opacity duration-2000 ${phase !== "askName" ? "opacity-100" : "opacity-0"}`}>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20" />
          <div className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-gradient-to-tl from-indigo-900/30 via-transparent to-transparent blur-3xl" />
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-radial from-violet-500/10 to-transparent blur-3xl" />
        </div>

        {/* Stars */}
        <div className="absolute inset-0">
          {stars.map((star) => (
            <div
              key={star.id}
              className="absolute rounded-full bg-white star-twinkle"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDelay: `${star.delay}s`,
                opacity: phase === "warp" ? 0 : 1,
              }}
            />
          ))}
        </div>

        {/* Shooting stars */}
        {phase !== "askName" && phase !== "exit" && (
          <>
            <div className="shooting-star" style={{ top: '20%', left: '10%', animationDelay: '0s' }} />
            <div className="shooting-star" style={{ top: '40%', left: '60%', animationDelay: '2s' }} />
            <div className="shooting-star" style={{ top: '70%', left: '30%', animationDelay: '4s' }} />
          </>
        )}

        {/* Warp speed effect */}
        {phase === "warp" && (
          <div className="absolute inset-0 warp-speed">
            {Array.from({ length: 100 }).map((_, i) => (
              <div
                key={i}
                className="warp-line"
                style={{
                  left: `${50 + (Math.random() - 0.5) * 100}%`,
                  top: `${50 + (Math.random() - 0.5) * 100}%`,
                  animationDelay: `${Math.random() * 0.5}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Central glow */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ${
          phase === "warp" ? "w-[200vw] h-[200vh] bg-white/80" : "w-[600px] h-[600px] bg-purple-500/5"
        } rounded-full blur-3xl`} />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 max-w-2xl mx-auto text-center min-h-[400px]">
        
        {/* Ask Name */}
        {phase === "askName" && (
          <div className="space-y-10 animate-fadeIn">
            <div>
              <div className="inline-flex items-center gap-3 text-purple-400/60 text-xs uppercase tracking-[0.5em] mb-8">
                <span className="w-8 h-px bg-purple-400/30" />
                <span>Welcome, Traveler</span>
                <span className="w-8 h-px bg-purple-400/30" />
              </div>
              <h2 className="text-white text-4xl md:text-6xl font-extralight tracking-wide">
                {getGreeting()}
              </h2>
            </div>
            
            <div className="space-y-8">
              <input
                ref={inputRef}
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleNameSubmit()}
                placeholder="What shall I call you?"
                className="w-72 md:w-96 bg-transparent border-b border-white/20 focus:border-purple-400/60 text-white text-center text-2xl font-extralight py-4 outline-none transition-all duration-500 placeholder:text-white/20"
              />
              
              <div>
                <button
                  onClick={handleNameSubmit}
                  disabled={!userName.trim()}
                  className={`group inline-flex items-center gap-3 px-10 py-4 rounded-full transition-all duration-500 ${
                    userName.trim() 
                      ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-400/30 text-white hover:from-purple-500/30 hover:to-blue-500/30 hover:border-purple-400/50" 
                      : "bg-white/5 border border-white/10 text-white/30 cursor-not-allowed"
                  }`}
                >
                  <span className="text-sm uppercase tracking-[0.3em]">Begin Journey</span>
                  <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${userName.trim() ? "group-hover:translate-x-2" : ""}`} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Welcome */}
        {phase === "welcome" && (
          <div className={`transition-all duration-1000 ease-out ${textVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"}`}>
            <div className="mb-8">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-500/30 to-blue-500/30 border border-purple-400/30 flex items-center justify-center">
                <span className="text-3xl font-light text-white">{userName.charAt(0).toUpperCase()}</span>
              </div>
            </div>
            <p className="text-purple-400/60 text-xs uppercase tracking-[0.5em] mb-4">Greetings</p>
            <h1 className="text-5xl md:text-7xl font-extralight tracking-wider text-white mb-4">
              {userName}
            </h1>
            <p className="text-white/40 text-lg font-extralight">Welcome to my universe</p>
          </div>
        )}

        {/* Journey begins */}
        {phase === "journey" && (
          <div className={`transition-all duration-1000 ease-out ${textVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
            <div className="text-6xl mb-8 animate-pulse">✧</div>
            <p className="text-2xl md:text-3xl font-extralight text-white/80 leading-relaxed">
              Prepare for a journey<br/>
              <span className="text-purple-400">through the cosmos</span>
            </p>
          </div>
        )}

        {/* Motivation - Personalized Cosmic */}
        {phase === "motivation" && personalizedQuotes[motivationIndex] && (
          <div className={`transition-all duration-1000 ease-out ${textVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
            <div className="mb-8 text-purple-400/40 text-4xl">✦</div>
            <p className="text-xl md:text-2xl font-extralight leading-relaxed max-w-lg">
              {personalizedQuotes[motivationIndex].split(userName).map((part, idx, arr) => (
                <span key={idx}>
                  <span className="text-white/70">{part}</span>
                  {idx < arr.length - 1 && <span className="text-purple-400 font-light">{userName}</span>}
                </span>
              ))}
            </p>
            <div className="flex justify-center gap-3 mt-10">
              {personalizedQuotes.map((_, idx) => (
                <div
                  key={idx}
                  className={`rounded-full transition-all duration-500 ${
                    idx === motivationIndex 
                      ? "w-10 h-1.5 bg-gradient-to-r from-purple-500 to-blue-500" 
                      : "w-1.5 h-1.5 bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Cosmic Fact */}
        {phase === "cosmic" && (
          <div className={`transition-all duration-1000 ease-out ${textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="inline-flex items-center gap-3 text-blue-400/50 text-xs uppercase tracking-[0.4em] mb-8">
              <span className="w-6 h-px bg-blue-400/30" />
              <span>Cosmic Wonder</span>
              <span className="w-6 h-px bg-blue-400/30" />
            </div>
            <p className="text-white/60 text-lg md:text-xl font-extralight leading-relaxed max-w-md">
              {cosmicFact}
            </p>
          </div>
        )}

        {/* Warp / Ready */}
        {phase === "warp" && (
          <div className={`transition-all duration-1000 ease-out ${textVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
            <h1 className="text-4xl md:text-6xl font-extralight tracking-wider text-white mb-4">
              Entering Portfolio
            </h1>
            <p className="text-white/50 text-lg font-extralight">
              Hold on, <span className="text-purple-400">{userName}</span>...
            </p>
          </div>
        )}
      </div>

      {/* Skip */}
      {phase !== "askName" && phase !== "exit" && phase !== "warp" && (
        <button
          onClick={() => { setPhase("exit"); setTimeout(handleComplete, 800); }}
          className="absolute bottom-8 right-8 text-white/20 hover:text-purple-400/60 text-xs uppercase tracking-[0.3em] transition-colors duration-300"
        >
          Skip
        </button>
      )}

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        .star-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
        
        @keyframes shoot {
          0% { transform: translateX(0) translateY(0); opacity: 1; }
          100% { transform: translateX(300px) translateY(300px); opacity: 0; }
        }
        
        .shooting-star {
          position: absolute;
          width: 100px;
          height: 2px;
          background: linear-gradient(90deg, white, transparent);
          transform: rotate(-45deg);
          animation: shoot 3s ease-out infinite;
        }
        
        @keyframes warpLine {
          0% { transform: scale(0) translateZ(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: scale(50) translateZ(500px); opacity: 0; }
        }
        
        .warp-line {
          position: absolute;
          width: 2px;
          height: 2px;
          background: white;
          border-radius: 50%;
          animation: warpLine 1.5s ease-in forwards;
        }
      `}</style>
    </div>
  );
};

export default IntroScreen;
