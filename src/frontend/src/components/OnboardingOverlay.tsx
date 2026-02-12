import { useEffect, useRef, useState } from 'react';
import { X, ChevronRight, ChevronLeft, Shield, Eye, Activity, Scan, RotateCcw, BookOpen } from 'lucide-react';
import { Button } from './ui/button';

interface OnboardingOverlayProps {
  isOpen: boolean;
  onDismiss: () => void;
}

const steps = [
  {
    title: 'Welcome to the Keylogger Awareness Tool',
    icon: Shield,
    content: (
      <div className="space-y-4">
        <p className="text-lg">
          This is an <strong>educational simulation</strong> designed to help you understand how keyloggers work and how to protect yourself.
        </p>
        <div className="bg-[oklch(0.7_0.25_145)]/10 border border-[oklch(0.7_0.25_145)]/30 rounded-lg p-4 space-y-2">
          <h4 className="font-semibold text-[oklch(0.7_0.25_145)]">Important Privacy Notice:</h4>
          <ul className="space-y-1 text-sm">
            <li>✓ This simulation <strong>only captures keystrokes</strong> typed in the demo input area</li>
            <li>✓ <strong>No data is transmitted</strong> outside your browser</li>
            <li>✓ <strong>No typed input is stored</strong> permanently</li>
            <li>✓ Everything runs locally in your browser for educational purposes only</li>
          </ul>
        </div>
        <p className="text-sm text-muted-foreground">
          Let's take a quick tour of the dashboard modules to help you get started.
        </p>
      </div>
    ),
  },
  {
    title: 'Demo Input Area',
    icon: Activity,
    content: (
      <div className="space-y-4">
        <p>
          The <strong>Demo Input Area</strong> is where you type to simulate keystroke capture. This is the only place where your typing is monitored in this simulation.
        </p>
        <div className="bg-card/50 border border-border rounded-lg p-4">
          <p className="text-sm">
            Try typing different patterns like passwords, sensitive keywords, or rapid text to see how the risk detection responds.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: 'Attacker View Panel',
    icon: Eye,
    content: (
      <div className="space-y-4">
        <p>
          The <strong>Attacker View Panel</strong> shows what a malicious actor would see if a real keylogger was installed on your system.
        </p>
        <div className="bg-card/50 border border-border rounded-lg p-4 space-y-2">
          <p className="text-sm">
            <strong>Toggle visibility:</strong> Use the "Show Attacker View" switch in the header to show or hide this panel.
          </p>
          <p className="text-sm text-muted-foreground">
            Watch how keystrokes are captured in real-time and transmitted to a simulated attacker dashboard.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: 'AI Risk Detector & Antivirus Scanner',
    icon: Scan,
    content: (
      <div className="space-y-4">
        <p>
          The <strong>AI Risk Detector</strong> analyzes your typing patterns and detects potentially sensitive information like passwords or credentials.
        </p>
        <p>
          The <strong>Simulated Antivirus Scanner</strong> lets you scan for threats, quarantine, and remove detected keyloggers.
        </p>
        <div className="bg-card/50 border border-border rounded-lg p-4">
          <p className="text-sm">
            <strong>Try it:</strong> Type a password-like pattern (e.g., "MyPassword123!") and watch the risk level increase. Then use the AV scanner to detect and remove the threat.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: 'Keylogging Terms Glossary',
    icon: BookOpen,
    content: (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Understanding these terms will help you better grasp how keyloggers work and how to protect yourself:
        </p>
        <div className="grid grid-cols-1 gap-3 max-h-[280px] overflow-y-auto pr-2">
          <div className="bg-card/50 border border-border rounded-lg p-3">
            <h4 className="font-semibold text-sm text-[oklch(0.7_0.25_145)]">Keylogger</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Malicious software that secretly records every keystroke you type, including passwords and sensitive information.
            </p>
          </div>
          <div className="bg-card/50 border border-border rounded-lg p-3">
            <h4 className="font-semibold text-sm text-[oklch(0.7_0.25_145)]">Keystroke</h4>
            <p className="text-xs text-muted-foreground mt-1">
              A single press of a key on your keyboard, which can be captured and logged by keylogging software.
            </p>
          </div>
          <div className="bg-card/50 border border-border rounded-lg p-3">
            <h4 className="font-semibold text-sm text-[oklch(0.7_0.25_145)]">Capture</h4>
            <p className="text-xs text-muted-foreground mt-1">
              The process of recording keystrokes, mouse clicks, or other user input without the user's knowledge.
            </p>
          </div>
          <div className="bg-card/50 border border-border rounded-lg p-3">
            <h4 className="font-semibold text-sm text-[oklch(0.7_0.25_145)]">Exfiltration</h4>
            <p className="text-xs text-muted-foreground mt-1">
              The unauthorized transfer of captured data from your device to an attacker's server or location.
            </p>
          </div>
          <div className="bg-card/50 border border-border rounded-lg p-3">
            <h4 className="font-semibold text-sm text-[oklch(0.7_0.25_145)]">Attacker</h4>
            <p className="text-xs text-muted-foreground mt-1">
              A malicious individual or group who installs keyloggers to steal sensitive information for fraud or identity theft.
            </p>
          </div>
          <div className="bg-card/50 border border-border rounded-lg p-3">
            <h4 className="font-semibold text-sm text-[oklch(0.7_0.25_145)]">Antivirus Scan</h4>
            <p className="text-xs text-muted-foreground mt-1">
              A security process that checks your system for malicious software, including keyloggers, and alerts you to threats.
            </p>
          </div>
          <div className="bg-card/50 border border-border rounded-lg p-3">
            <h4 className="font-semibold text-sm text-[oklch(0.7_0.25_145)]">Quarantine</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Isolating detected malware in a secure area where it cannot harm your system or access your data.
            </p>
          </div>
          <div className="bg-card/50 border border-border rounded-lg p-3">
            <h4 className="font-semibold text-sm text-[oklch(0.7_0.25_145)]">False Positive</h4>
            <p className="text-xs text-muted-foreground mt-1">
              When security software incorrectly identifies safe software as malicious; rare but can happen with legitimate programs.
            </p>
          </div>
          <div className="bg-card/50 border border-border rounded-lg p-3">
            <h4 className="font-semibold text-sm text-[oklch(0.7_0.25_145)]">Credential</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Login information such as usernames and passwords that keyloggers specifically target to gain unauthorized access.
            </p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground italic">
          Note: This glossary is for educational purposes only to help you understand cybersecurity concepts.
        </p>
      </div>
    ),
  },
  {
    title: 'Reset & Test Scenarios',
    icon: RotateCcw,
    content: (
      <div className="space-y-4">
        <p>
          Use the <strong>Reset button</strong> in the header to clear all simulation data and start fresh at any time.
        </p>
        <p>
          The <strong>Test Scenarios panel</strong> provides pre-configured examples that demonstrate different risk levels and detection behaviors.
        </p>
        <div className="bg-[oklch(0.7_0.25_145)]/10 border border-[oklch(0.7_0.25_145)]/30 rounded-lg p-4">
          <p className="text-sm font-semibold">You're all set!</p>
          <p className="text-sm text-muted-foreground mt-1">
            Start exploring the dashboard to learn how keyloggers work and how to protect yourself. You can re-open this guide anytime using the Help button.
          </p>
        </div>
      </div>
    ),
  },
];

export default function OnboardingOverlay({ isOpen, onDismiss }: OnboardingOverlayProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const primaryButtonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      // Focus the primary button when opened
      setTimeout(() => {
        primaryButtonRef.current?.focus();
      }, 100);
      
      // Prevent background scroll
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onDismiss();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onDismiss]);

  if (!isOpen) return null;

  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;
  const CurrentIcon = steps[currentStep].icon;

  const handleNext = () => {
    if (isLastStep) {
      onDismiss();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === overlayRef.current) {
          onDismiss();
        }
      }}
    >
      <div className="relative w-full max-w-2xl bg-card border border-border rounded-xl shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onDismiss}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-accent transition-colors"
          aria-label="Close onboarding"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="p-8">
          {/* Icon and Title */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[oklch(0.7_0.25_145)] to-[oklch(0.5_0.25_145)] flex items-center justify-center flex-shrink-0">
              <CurrentIcon className="w-6 h-6 text-white" />
            </div>
            <h2 id="onboarding-title" className="text-2xl font-bold">
              {steps[currentStep].title}
            </h2>
          </div>

          {/* Step content */}
          <div className="mb-8 min-h-[200px]">
            {steps[currentStep].content}
          </div>

          {/* Progress indicators */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentStep
                    ? 'w-8 bg-[oklch(0.7_0.25_145)]'
                    : 'w-2 bg-muted hover:bg-muted-foreground/50'
                }`}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="outline"
              onClick={onDismiss}
              className="flex-1"
            >
              Skip
            </Button>

            <div className="flex gap-2 flex-1">
              {!isFirstStep && (
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  className="flex-1"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>
              )}
              <Button
                ref={primaryButtonRef}
                onClick={handleNext}
                className="flex-1 bg-[oklch(0.7_0.25_145)] hover:bg-[oklch(0.65_0.25_145)] text-white"
              >
                {isLastStep ? 'Start Demo' : 'Next'}
                {!isLastStep && <ChevronRight className="w-4 h-4 ml-1" />}
              </Button>
            </div>
          </div>

          {/* Step counter */}
          <p className="text-center text-sm text-muted-foreground mt-4">
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>
      </div>
    </div>
  );
}
