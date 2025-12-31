import { useState, useEffect } from "react";
import { Terminal, Server, Database, Cloud, Cpu, Wifi, CheckCircle2, Zap, Loader2 } from "lucide-react";

interface BootStep {
  id: number;
  icon: React.ReactNode;
  label: string;
  status: "pending" | "loading" | "complete";
}

const initialSteps: BootStep[] = [
  { id: 1, icon: <Terminal className="w-4 h-4" />, label: "System Init", status: "pending" },
  { id: 2, icon: <Server className="w-4 h-4" />, label: "Server Connect", status: "pending" },
  { id: 3, icon: <Database className="w-4 h-4" />, label: "Data Fetch", status: "pending" },
  { id: 4, icon: <Cloud className="w-4 h-4" />, label: "Cloud Sync", status: "pending" },
  { id: 5, icon: <Cpu className="w-4 h-4" />, label: "Render UI", status: "pending" },
  { id: 6, icon: <Wifi className="w-4 h-4" />, label: "Go Live", status: "pending" },
];

interface BootingScreenProps {
  onComplete: () => void;
}

const BootingScreen = ({ onComplete }: BootingScreenProps) => {
  const [steps, setSteps] = useState<BootStep[]>(initialSteps);
  const [currentStep, setCurrentStep] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (currentStep < steps.length) {
      setSteps(prev => prev.map((step, idx) => 
        idx === currentStep ? { ...step, status: "loading" } : step
      ));

      const timer = setTimeout(() => {
        setSteps(prev => prev.map((step, idx) => 
          idx === currentStep ? { ...step, status: "complete" } : step
        ));
        setCurrentStep(prev => prev + 1);
      }, 150);

      return () => clearTimeout(timer);
    } else if (currentStep === steps.length && !showWelcome) {
      setShowWelcome(true);
      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(onComplete, 300);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentStep, steps.length, onComplete, showWelcome]);

  const progress = (currentStep / steps.length) * 100;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-300 ${isExiting ? 'opacity-0' : 'opacity-100'}`}
    >
      {/* Simple grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(45,212,191,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(45,212,191,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 w-full max-w-md px-6">
        {!showWelcome ? (
          <div className="relative">
            {/* Main card */}
            <div className="rounded-2xl border border-primary/20 bg-card shadow-lg overflow-hidden">
              {/* Header */}
              <div className="px-5 py-4 border-b border-primary/10 bg-primary/5">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="font-mono text-sm text-primary font-medium">portfolio.init</span>
                </div>
              </div>

              {/* Steps */}
              <div className="p-5 space-y-2">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className={`flex items-center gap-3 py-2 px-3 rounded-lg transition-colors duration-150 ${
                      step.status === "loading" 
                        ? "bg-primary/10" 
                        : step.status === "complete"
                        ? "bg-green-500/5"
                        : "opacity-40"
                    }`}
                  >
                    <span className={step.status === "complete" ? "text-green-400" : step.status === "loading" ? "text-primary" : "text-muted-foreground"}>
                      {step.icon}
                    </span>
                    <span className={`font-medium text-sm flex-1 ${step.status === "complete" ? "text-green-400" : step.status === "loading" ? "text-primary" : "text-muted-foreground"}`}>
                      {step.label}
                    </span>
                    <span className="w-5 flex justify-center">
                      {step.status === "loading" && (
                        <Loader2 className="w-4 h-4 text-primary animate-spin" />
                      )}
                      {step.status === "complete" && (
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                      )}
                    </span>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="px-5 pb-5">
                <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-150"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs font-mono">
                  <span className="text-muted-foreground">Initializing...</span>
                  <span className="text-primary font-bold">{Math.round(progress)}%</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border border-primary/40 mb-4">
              <Zap className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-primary">Ready!</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default BootingScreen;
