import { useState, useEffect, useCallback } from "react";

const steps = [
  "Initializing",
  "Loading modules",
  "Preparing interface",
  "Almost ready",
];

interface BootingScreenProps {
  onComplete: () => void;
}

const BootingScreen = ({ onComplete }: BootingScreenProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [phase, setPhase] = useState<"loading" | "ready" | "exit">("loading");

  const handleComplete = useCallback(() => onComplete(), [onComplete]);

  useEffect(() => {
    if (phase !== "loading") return;
    
    if (currentStep < steps.length) {
      const timer = setTimeout(() => setCurrentStep(prev => prev + 1), 400);
      return () => clearTimeout(timer);
    } else {
      setPhase("ready");
    }
  }, [currentStep, phase]);

  useEffect(() => {
    if (phase === "ready") {
      const timer = setTimeout(() => setPhase("exit"), 600);
      return () => clearTimeout(timer);
    }
    if (phase === "exit") {
      const timer = setTimeout(handleComplete, 500);
      return () => clearTimeout(timer);
    }
  }, [phase, handleComplete]);

  const progress = (currentStep / steps.length) * 100;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-all duration-500 ${
      phase === "exit" ? "opacity-0" : "opacity-100"
    }`}>
      {/* Minimal ambient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white/[0.015] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-xs px-6">
        {phase === "loading" ? (
          <div className="text-center">
            {/* Current step */}
            <p className="text-white/40 text-sm font-extralight tracking-[0.2em] uppercase mb-8">
              {steps[currentStep] || "Ready"}
            </p>

            {/* Progress bar */}
            <div className="h-[1px] bg-white/10 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-white/40 transition-all duration-400 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Percentage */}
            <p className="text-white/20 text-xs font-mono tracking-wider">
              {Math.round(progress)}%
            </p>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-white/60 text-lg font-extralight tracking-wide">
              Welcome back
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BootingScreen;
