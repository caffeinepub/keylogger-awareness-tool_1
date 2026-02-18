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
            <strong>Try it:</strong> Type a password-like pattern (e.g., "MyPassword123!") and watch the risk level increase.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: 'Test Scenarios & Reset',
    icon: RotateCcw,
    content: (
      <div className="space-y-4">
        <p>
          The <strong>Test Scenarios</strong> section provides prebuilt examples demonstrating different risk levels and detection behaviors.
        </p>
        <p>
          Each scenario includes educational content and a quiz to test your knowledge about keylogger threats and prevention.
        </p>
        <div className="bg-card/50 border border-border rounded-lg p-4">
          <p className="text-sm">
            <strong>Reset button:</strong> Use the Reset button in the header to clear all simulation state and start fresh.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: 'Glossary: Key Terms',
    icon: BookOpen,
    content: (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground mb-4">
          Understanding these terms will help you navigate the simulation and learn about keylogger threats:
        </p>
        <div className="grid gap-3 max-h-[400px] overflow-y-auto pr-2">
          <div className="bg-card/50 border border-border rounded-lg p-3">
            <h4 className="font-semibold text-sm mb-1">Keylogger</h4>
            <p className="text-xs text-muted-foreground">Software or hardware that records keystrokes to capture sensitive information.</p>
          </div>
          <div className="bg-card/50 border border-border rounded-lg p-3">
            <h4 className="font-semibold text-sm mb-1">Risk Detection</h4>
            <p className="text-xs text-muted-foreground">AI-powered analysis that identifies potentially sensitive patterns in typed text.</p>
          </div>
          <div className="bg-card/50 border border-border rounded-lg p-3">
            <h4 className="font-semibold text-sm mb-1">Quarantine</h4>
            <p className="text-xs text-muted-foreground">Isolating detected threats to prevent them from causing harm.</p>
          </div>
          <div className="bg-card/50 border border-border rounded-lg p-3">
            <h4 className="font-semibold text-sm mb-1">Auto-Blocking</h4>
            <p className="text-xs text-muted-foreground">Automatic prevention of high-risk actions to protect user data.</p>
          </div>
          <div className="bg-card/50 border border-border rounded-lg p-3">
            <h4 className="font-semibold text-sm mb-1">Attack Timeline</h4>
            <p className="text-xs text-muted-foreground">Visual representation of the stages in a keylogger attack lifecycle.</p>
          </div>
          <div className="bg-card/50 border border-border rounded-lg p-3">
            <h4 className="font-semibold text-sm mb-1">Reconstructed Text</h4>
            <p className="text-xs text-muted-foreground">Captured keystrokes assembled into readable text by the attacker.</p>
          </div>
          <div className="bg-card/50 border border-border rounded-lg p-3">
            <h4 className="font-semibold text-sm mb-1">Two-Factor Authentication (2FA)</h4>
            <p className="text-xs text-muted-foreground">Security method requiring two forms of verification to access accounts.</p>
          </div>
          <div className="bg-card/50 border border-border rounded-lg p-3">
            <h4 className="font-semibold text-sm mb-1">Malware</h4>
            <p className="text-xs text-muted-foreground">Malicious software designed to harm, exploit, or gain unauthorized access to systems.</p>
          </div>
          <div className="bg-card/50 border border-border rounded-lg p-3">
            <h4 className="font-semibold text-sm mb-1">Phishing</h4>
            <p className="text-xs text-muted-foreground">Fraudulent attempts to obtain sensitive information by disguising as trustworthy entities.</p>
          </div>
        </div>
      </div>
    ),
  },
];

export default function OnboardingOverlay({ isOpen, onDismiss }: OnboardingOverlayProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);

      document.body.style.overflow = 'hidden';

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onDismiss();
        }
      };
      
      const handleArrowKeys = (e: KeyboardEvent) => {
        if (e.key === 'ArrowRight' && currentStep < steps.length - 1) {
          setCurrentStep(prev => prev + 1);
        } else if (e.key === 'ArrowLeft' && currentStep > 0) {
          setCurrentStep(prev => prev - 1);
        }
      };

      document.addEventListener('keydown', handleEscape);
      document.addEventListener('keydown', handleArrowKeys);

      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.removeEventListener('keydown', handleArrowKeys);
        document.body.style.overflow = '';
      };
    }
  }, [isOpen, onDismiss, currentStep]);

  if (!isOpen) return null;

  const currentStepData = steps[currentStep];
  const Icon = currentStepData.icon;
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleFinish = () => {
    setCurrentStep(0);
    onDismiss();
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-title"
      data-testid="onboarding-overlay"
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background border border-border rounded-xl shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-background border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyber-accent/10 flex items-center justify-center">
              <Icon className="w-6 h-6 text-cyber-accent" />
            </div>
            <h2 id="onboarding-title" className="text-xl font-bold">
              {currentStepData.title}
            </h2>
          </div>
          <Button
            ref={closeButtonRef}
            onClick={onDismiss}
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label="Close onboarding"
            data-testid="onboarding-close"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6" role="region" aria-live="polite">
          {currentStepData.content}
        </div>

        <div className="sticky bottom-0 z-10 flex items-center justify-between p-6 bg-background border-t border-border">
          <div className="flex items-center gap-2" role="navigation" aria-label="Onboarding progress">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentStep
                    ? 'w-8 bg-cyber-accent'
                    : 'w-2 bg-muted'
                }`}
                aria-label={`Step ${index + 1}${index === currentStep ? ' (current)' : ''}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {!isFirstStep && (
              <Button
                onClick={handlePrevious}
                variant="outline"
                size="sm"
                data-testid="onboarding-previous"
                aria-label="Previous step"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
            )}
            {!isLastStep ? (
              <Button
                onClick={handleNext}
                size="sm"
                className="bg-cyber-accent hover:bg-cyber-accent-dark"
                data-testid="onboarding-next"
                aria-label="Next step"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button
                onClick={handleFinish}
                size="sm"
                className="bg-cyber-accent hover:bg-cyber-accent-dark"
                data-testid="onboarding-finish"
                aria-label="Finish onboarding"
              >
                Get Started
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
