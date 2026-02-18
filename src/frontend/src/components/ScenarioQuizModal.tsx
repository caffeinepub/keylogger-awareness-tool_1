import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import ScenarioQuiz from './ScenarioQuiz';
import { getScenarioQuiz } from '../lib/scenarioQuizzes';

interface ScenarioQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  scenarioId: string;
  scenarioName: string;
}

export default function ScenarioQuizModal({
  isOpen,
  onClose,
  scenarioId,
  scenarioName,
}: ScenarioQuizModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);

      document.body.style.overflow = 'hidden';

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      
      const handleTab = (e: KeyboardEvent) => {
        if (e.key === 'Tab' && modalRef.current) {
          const focusableElements = modalRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      };

      document.addEventListener('keydown', handleEscape);
      document.addEventListener('keydown', handleTab);

      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.removeEventListener('keydown', handleTab);
        document.body.style.overflow = '';
      };
    } else {
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quiz = getScenarioQuiz(scenarioId);

  if (!quiz) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
        <div
          ref={modalRef}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background border border-border rounded-xl shadow-2xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby="quiz-modal-title"
          data-testid="scenario-quiz-modal"
        >
          <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-background border-b border-border">
            <h2 id="quiz-modal-title" className="text-xl font-bold">
              Quiz Not Available
            </h2>
            <Button
              ref={closeButtonRef}
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="rounded-full"
              aria-label="Close quiz"
              data-testid="quiz-modal-close"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <div className="p-6">
            <p className="text-muted-foreground">
              Quiz content for this scenario is not available.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background border border-border rounded-xl shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quiz-modal-title"
        data-testid="scenario-quiz-modal"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-background border-b border-border">
          <h2 id="quiz-modal-title" className="text-xl font-bold">
            {scenarioName} Quiz
          </h2>
          <Button
            ref={closeButtonRef}
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label="Close quiz"
            data-testid="quiz-modal-close"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6">
          <ScenarioQuiz
            quiz={quiz}
            onRetry={() => {
              // Quiz component handles its own retry state
            }}
            onClose={onClose}
          />
        </div>
      </div>
    </div>
  );
}
